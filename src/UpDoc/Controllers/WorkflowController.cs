using Asp.Versioning;
using UpDoc.Models;
using UpDoc.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;

namespace UpDoc.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("umbraco/management/api/v{version:apiVersion}/updoc/workflows")]
[MapToApi("updoc")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[JsonOptionsName("UmbracoManagementApi")]
public class WorkflowController : ControllerBase
{
    private readonly IWorkflowService _workflowService;
    private readonly IDestinationStructureService _destinationStructureService;
    private readonly IPdfPagePropertiesService _pdfPagePropertiesService;
    private readonly IContentTransformService _contentTransformService;
    private readonly IMediaService _mediaService;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<WorkflowController> _logger;

    public WorkflowController(
        IWorkflowService workflowService,
        IDestinationStructureService destinationStructureService,
        IPdfPagePropertiesService pdfPagePropertiesService,
        IContentTransformService contentTransformService,
        IMediaService mediaService,
        IWebHostEnvironment webHostEnvironment,
        ILogger<WorkflowController> logger)
    {
        _workflowService = workflowService;
        _destinationStructureService = destinationStructureService;
        _pdfPagePropertiesService = pdfPagePropertiesService;
        _contentTransformService = contentTransformService;
        _mediaService = mediaService;
        _webHostEnvironment = webHostEnvironment;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var summaries = _workflowService.GetAllWorkflowSummaries();
        return Ok(summaries);
    }

    [HttpGet("active")]
    public IActionResult GetActive()
    {
        var summaries = _workflowService.GetAllWorkflowSummaries();
        var complete = summaries.Where(s => s.IsComplete).ToList();

        return Ok(new
        {
            documentTypeAliases = complete
                .Select(s => s.DocumentTypeAlias)
                .Where(a => !string.IsNullOrEmpty(a))
                .Distinct()
                .ToArray(),
            blueprintIds = complete
                .Select(s => s.BlueprintId)
                .Where(id => !string.IsNullOrEmpty(id))
                .Distinct()
                .ToArray(),
        });
    }

    [HttpGet("{name}")]
    public IActionResult GetByName(string name)
    {
        var config = _workflowService.GetConfigByName(name);

        if (config == null)
        {
            return NotFound(new { error = $"No workflow found with name '{name}'" });
        }

        return Ok(config);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateWorkflowRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { error = "Workflow name is required." });
        }

        if (string.IsNullOrWhiteSpace(request.DocumentTypeAlias))
        {
            return BadRequest(new { error = "Document type alias is required." });
        }

        if (string.IsNullOrWhiteSpace(request.SourceType))
        {
            return BadRequest(new { error = "Source type is required." });
        }

        try
        {
            _workflowService.CreateWorkflow(
                request.Name,
                request.DocumentTypeAlias,
                request.SourceType,
                request.BlueprintId,
                request.BlueprintName);

            // Auto-populate destination.json from document type structure
            try
            {
                var destinationConfig = await _destinationStructureService.BuildDestinationConfigAsync(
                    request.DocumentTypeAlias,
                    request.BlueprintId,
                    request.BlueprintName);
                _workflowService.SaveDestinationConfig(request.Name, destinationConfig);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to auto-populate destination for workflow '{Name}'. Empty stub will be used.", request.Name);
            }

            return Created(
                $"/umbraco/management/api/v1/updoc/workflows/{request.Name}",
                new { name = request.Name });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });
        }
    }

    [HttpDelete("{name}")]
    public IActionResult Delete(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest(new { error = "Workflow name is required." });
        }

        try
        {
            _workflowService.DeleteWorkflow(name);
            return NoContent();
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("{name}/sample-extraction")]
    public IActionResult ExtractSample(string name, [FromBody] SampleExtractionRequest request)
    {
        var absolutePath = ResolveMediaFilePath(request.MediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        var media = _mediaService.GetById(request.MediaKey);
        var fileName = media?.Name ?? Path.GetFileName(absolutePath);

        var result = _pdfPagePropertiesService.ExtractRichDump(absolutePath);

        if (!string.IsNullOrEmpty(result.Error))
        {
            return BadRequest(new { error = result.Error });
        }

        // Populate source metadata
        result.Source.FileName = fileName;
        result.Source.MediaKey = request.MediaKey.ToString();

        try
        {
            _workflowService.SaveSampleExtraction(name, result);
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }

        _logger.LogInformation("Extracted and saved sample for workflow '{Name}': {Count} elements from {FileName}",
            name, result.Elements.Count, fileName);

        return Ok(result);
    }

    [HttpPost("{name}/regenerate-destination")]
    public async Task<IActionResult> RegenerateDestination(string name)
    {
        var configs = _workflowService.GetAllConfigs();
        var config = configs.FirstOrDefault(c =>
            Path.GetFileName(c.FolderPath).Equals(name, StringComparison.OrdinalIgnoreCase));

        if (config == null)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }

        try
        {
            var destinationConfig = await _destinationStructureService.BuildDestinationConfigAsync(
                config.DocumentTypeAlias,
                config.Destination.BlueprintId,
                config.Destination.BlueprintName);
            _workflowService.SaveDestinationConfig(name, destinationConfig);

            return Ok(destinationConfig);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPut("{name}/map")]
    public IActionResult UpdateMap(string name, [FromBody] MapConfig config)
    {
        try
        {
            _workflowService.SaveMapConfig(name, config);
            return Ok(config);
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }
    }

    [HttpGet("{name}/sample-extraction")]
    public IActionResult GetSampleExtraction(string name)
    {
        var result = _workflowService.GetSampleExtraction(name);
        if (result == null)
        {
            return NotFound(new { error = $"No sample extraction found for workflow '{name}'." });
        }

        return Ok(result);
    }

    [HttpPost("detect-zones")]
    public IActionResult DetectZones([FromBody] SampleExtractionRequest request)
    {
        var absolutePath = ResolveMediaFilePath(request.MediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        var result = _pdfPagePropertiesService.DetectZones(absolutePath);

        _logger.LogInformation(
            "Zone detection complete: {Zones} zones detected, {Zoned} elements in zones, {Unzoned} unzoned",
            result.Diagnostics.ZonesDetected,
            result.Diagnostics.ElementsZoned,
            result.Diagnostics.ElementsUnzoned);

        return Ok(result);
    }

    [HttpPost("{name}/zone-detection")]
    public IActionResult ExtractZoneDetection(string name, [FromBody] SampleExtractionRequest request)
    {
        var absolutePath = ResolveMediaFilePath(request.MediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        var result = _pdfPagePropertiesService.DetectZones(absolutePath);

        try
        {
            _workflowService.SaveZoneDetection(name, result);
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }

        _logger.LogInformation("Zone detection saved for workflow '{Name}': {Zones} zones, {Zoned} zoned, {Unzoned} unzoned",
            name, result.Diagnostics.ZonesDetected, result.Diagnostics.ElementsZoned, result.Diagnostics.ElementsUnzoned);

        return Ok(result);
    }

    [HttpGet("{name}/zone-detection")]
    public IActionResult GetZoneDetection(string name)
    {
        var result = _workflowService.GetZoneDetection(name);
        if (result == null)
        {
            return NotFound(new { error = $"No zone detection found for workflow '{name}'." });
        }

        return Ok(result);
    }

    [HttpPost("{name}/transform")]
    public IActionResult ExtractTransform(string name, [FromBody] SampleExtractionRequest request)
    {
        var absolutePath = ResolveMediaFilePath(request.MediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        // Step 1: Run zone detection
        var zoneResult = _pdfPagePropertiesService.DetectZones(absolutePath);

        try
        {
            _workflowService.SaveZoneDetection(name, zoneResult);
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }

        // Step 2: Run transform on zone detection output
        var transformResult = _contentTransformService.Transform(zoneResult);
        _workflowService.SaveTransformResult(name, transformResult);

        _logger.LogInformation(
            "Transform saved for workflow '{Name}': {Sections} sections ({Bullets} bullet, {Paragraphs} paragraph, {SubHeaded} sub-headed, {Preambles} preamble)",
            name, transformResult.Diagnostics.TotalSections,
            transformResult.Diagnostics.BulletListSections,
            transformResult.Diagnostics.ParagraphSections,
            transformResult.Diagnostics.SubHeadedSections,
            transformResult.Diagnostics.PreambleSections);

        return Ok(transformResult);
    }

    [HttpGet("{name}/transform")]
    public IActionResult GetTransform(string name)
    {
        var result = _workflowService.GetTransformResult(name);
        if (result == null)
        {
            return NotFound(new { error = $"No transform result found for workflow '{name}'." });
        }

        return Ok(result);
    }

    private string? ResolveMediaFilePath(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        if (media == null) return null;

        var umbracoFile = media.GetValue<string>("umbracoFile");
        if (string.IsNullOrEmpty(umbracoFile)) return null;

        string filePath;
        if (umbracoFile.StartsWith("{"))
        {
            var json = System.Text.Json.JsonDocument.Parse(umbracoFile);
            filePath = json.RootElement.GetProperty("src").GetString() ?? string.Empty;
        }
        else
        {
            filePath = umbracoFile;
        }

        if (string.IsNullOrEmpty(filePath)) return null;

        var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
        return System.IO.File.Exists(absolutePath) ? absolutePath : null;
    }
}

public class SampleExtractionRequest
{
    public Guid MediaKey { get; set; }
}

public class CreateWorkflowRequest
{
    public string Name { get; set; } = string.Empty;
    public string DocumentTypeAlias { get; set; } = string.Empty;
    public string SourceType { get; set; } = string.Empty;
    public string? BlueprintId { get; set; }
    public string? BlueprintName { get; set; }
}
