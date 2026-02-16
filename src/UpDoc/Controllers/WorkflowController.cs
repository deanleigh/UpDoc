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
    public async Task<IActionResult> GetByName(string name)
    {
        var config = _workflowService.GetConfigByName(name);

        if (config == null)
        {
            return NotFound(new { error = $"No workflow found with name '{name}'" });
        }

        // Always regenerate destination from blueprint to ensure it reflects
        // the current blueprint state (block ordering, property changes, etc.)
        if (!string.IsNullOrEmpty(config.DocumentTypeAlias)
            && !string.IsNullOrEmpty(config.Destination.BlueprintId))
        {
            try
            {
                var destinationConfig = await _destinationStructureService.BuildDestinationConfigAsync(
                    config.DocumentTypeAlias,
                    config.Destination.BlueprintId,
                    config.Destination.BlueprintName);
                _workflowService.SaveDestinationConfig(name, destinationConfig);
                config.Destination = destinationConfig;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to regenerate destination for workflow '{Name}', using cached version", name);
            }
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

        // Read page selection from source.json
        var sourceConfig = _workflowService.GetSourceConfig(name);
        var includePages = ResolveIncludePages(absolutePath, sourceConfig);

        var result = _pdfPagePropertiesService.ExtractRichDump(absolutePath, includePages);

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

    [HttpPost("detect-areas")]
    public IActionResult DetectAreas([FromBody] SampleExtractionRequest request)
    {
        var absolutePath = ResolveMediaFilePath(request.MediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        var result = _pdfPagePropertiesService.DetectAreas(absolutePath);

        _logger.LogInformation(
            "Area detection complete: {Areas} areas detected, {Elements} elements extracted",
            result.Diagnostics.AreasDetected,
            result.Diagnostics.ElementsInAreas);

        return Ok(result);
    }

    [HttpPost("{name}/area-detection")]
    public IActionResult ExtractAreaDetection(string name, [FromBody] SampleExtractionRequest request)
    {
        var absolutePath = ResolveMediaFilePath(request.MediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        // Read page selection and area template from workflow
        var sourceConfig = _workflowService.GetSourceConfig(name);
        var includePages = ResolveIncludePages(absolutePath, sourceConfig);
        var areaTemplate = _workflowService.GetAreaTemplate(name);

        var result = _pdfPagePropertiesService.DetectAreas(absolutePath, includePages, areaTemplate);

        try
        {
            _workflowService.SaveAreaDetection(name, result);
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }

        _logger.LogInformation("Area detection saved for workflow '{Name}': {Areas} areas, {Elements} elements extracted",
            name, result.Diagnostics.AreasDetected, result.Diagnostics.ElementsInAreas);

        return Ok(result);
    }

    [HttpGet("{name}/area-detection")]
    public IActionResult GetAreaDetection(string name)
    {
        var result = _workflowService.GetAreaDetection(name);
        if (result == null)
        {
            return NotFound(new { error = $"No area detection found for workflow '{name}'." });
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

        // Read page selection and area template from workflow
        var sourceConfig = _workflowService.GetSourceConfig(name);
        var includePages = ResolveIncludePages(absolutePath, sourceConfig);
        var areaTemplate = _workflowService.GetAreaTemplate(name);

        // Step 1: Run area detection (with page filtering and optional area template)
        var areaResult = _pdfPagePropertiesService.DetectAreas(absolutePath, includePages, areaTemplate);

        try
        {
            _workflowService.SaveAreaDetection(name, areaResult);
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }

        // Step 2: Run transform on area detection output, preserving existing include/exclude state
        var previousTransform = _workflowService.GetTransformResult(name);
        var transformResult = _contentTransformService.Transform(areaResult, previousTransform);
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

    [HttpPost("{name}/transform-adhoc")]
    public IActionResult TransformAdhoc(string name, [FromBody] SampleExtractionRequest request)
    {
        var absolutePath = ResolveMediaFilePath(request.MediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        try
        {
            // Read page selection and area template from workflow
            var sourceConfig = _workflowService.GetSourceConfig(name);
            var includePages = ResolveIncludePages(absolutePath, sourceConfig);
            var areaTemplate = _workflowService.GetAreaTemplate(name);

            var areaResult = _pdfPagePropertiesService.DetectAreas(absolutePath, includePages, areaTemplate);
            var previousTransform = _workflowService.GetTransformResult(name);
            var result = _contentTransformService.Transform(areaResult, previousTransform);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Transform-adhoc failed for workflow '{Name}' with media {MediaKey}", name, request.MediaKey);
            return StatusCode(500, new { error = ex.Message, stackTrace = ex.StackTrace });
        }
    }

    [HttpPatch("{name}/transform/sections/{sectionId}/included")]
    public IActionResult UpdateSectionInclusion(string name, string sectionId, [FromBody] SectionInclusionRequest request)
    {
        var result = _workflowService.UpdateSectionInclusion(name, sectionId, request.Included);
        if (result == null)
        {
            return NotFound(new { error = $"Workflow '{name}' or section '{sectionId}' not found." });
        }

        return Ok(result);
    }

    [HttpPut("{name}/pages")]
    public IActionResult UpdatePageSelection(string name, [FromBody] PageSelectionRequest request)
    {
        var sourceConfig = _workflowService.GetSourceConfig(name);
        if (sourceConfig == null)
        {
            return NotFound(new { error = $"Workflow '{name}' not found or has no source.json." });
        }

        // Update just the pages property
        if (request.Pages == null || request.Pages.Count == 0)
        {
            sourceConfig.Pages = new Pages { IsAll = true };
        }
        else
        {
            sourceConfig.Pages = new Pages { PageNumbers = request.Pages.OrderBy(p => p).ToList() };
        }

        _workflowService.SaveSourceConfig(name, sourceConfig);

        _logger.LogInformation("Updated page selection for workflow '{Name}': {Pages}",
            name, sourceConfig.Pages.IsAll ? "all" : string.Join(", ", sourceConfig.Pages.PageNumbers!));

        return Ok(new { pages = sourceConfig.Pages });
    }

    [HttpPut("{name}/section-rules")]
    public IActionResult UpdateSectionRules(string name, [FromBody] Dictionary<string, SectionRuleSet> sectionRules)
    {
        var sourceConfig = _workflowService.GetSourceConfig(name);
        if (sourceConfig == null)
        {
            return NotFound(new { error = $"Workflow '{name}' not found or has no source.json." });
        }

        sourceConfig.SectionRules = sectionRules;
        _workflowService.SaveSourceConfig(name, sourceConfig);

        _logger.LogInformation("Updated section rules for workflow '{Name}': {Count} sections with rules",
            name, sectionRules.Count);

        return Ok(sectionRules);
    }

    [HttpGet("{name}/source")]
    public IActionResult GetSource(string name)
    {
        var sourceConfig = _workflowService.GetSourceConfig(name);
        if (sourceConfig == null)
        {
            return NotFound(new { error = $"Workflow '{name}' not found or has no source.json." });
        }

        return Ok(sourceConfig);
    }

    [HttpPut("{name}/area-template")]
    public IActionResult UpdateAreaTemplate(string name, [FromBody] AreaTemplate template)
    {
        try
        {
            _workflowService.SaveAreaTemplate(name, template);
            return Ok(template);
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }
    }

    [HttpGet("{name}/area-template")]
    public IActionResult GetAreaTemplate(string name)
    {
        var template = _workflowService.GetAreaTemplate(name);
        if (template == null)
        {
            return NotFound(new { error = $"No area template found for workflow '{name}'." });
        }

        return Ok(template);
    }

    [HttpGet("media-pdf")]
    public IActionResult GetMediaPdf([FromQuery] Guid mediaKey)
    {
        if (mediaKey == Guid.Empty)
        {
            return BadRequest(new { error = "Media key is required." });
        }

        var absolutePath = ResolveMediaFilePath(mediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk." });
        }

        var fileStream = new FileStream(absolutePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        return File(fileStream, "application/pdf");
    }

    [HttpGet("{name}/pdf")]
    public IActionResult GetPdf(string name, [FromQuery] Guid? mediaKey = null)
    {
        // If mediaKey not provided, try to get it from the stored sample extraction
        if (mediaKey == null || mediaKey == Guid.Empty)
        {
            var extraction = _workflowService.GetSampleExtraction(name);
            if (extraction?.Source?.MediaKey == null || !Guid.TryParse(extraction.Source.MediaKey, out var parsedKey))
            {
                return BadRequest(new { error = "No media key provided and no sample extraction found." });
            }
            mediaKey = parsedKey;
        }

        var absolutePath = ResolveMediaFilePath(mediaKey.Value);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk." });
        }

        var fileStream = new FileStream(absolutePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        return File(fileStream, "application/pdf");
    }

    /// <summary>
    /// Infers a section pattern from a user-selected element.
    /// The user clicks one element as an example section heading, and the system
    /// finds the minimum distinguishing conditions that separate heading-like
    /// elements from non-heading elements in the same area.
    /// </summary>
    [HttpPost("{name}/infer-section-pattern")]
    public IActionResult InferSectionPattern(string name, [FromBody] InferSectionPatternRequest request)
    {
        try
        {
            // Load the area template to get area definitions
            var areaTemplate = _workflowService.GetAreaTemplate(name);
            if (areaTemplate == null)
                return NotFound(new { error = $"No area template found for workflow '{name}'." });

            if (request.AreaIndex < 0 || request.AreaIndex >= areaTemplate.Areas.Count)
                return BadRequest(new { error = $"Area index {request.AreaIndex} is out of range (0-{areaTemplate.Areas.Count - 1})." });

            // Get the source config for page selection
            var config = _workflowService.GetConfigByName(name);
            var sourceConfig = config?.Sources.Values.FirstOrDefault();

            // Get the PDF file path
            var extraction = _workflowService.GetSampleExtraction(name);
            if (extraction?.Source?.MediaKey == null || !Guid.TryParse(extraction.Source.MediaKey, out var mediaKey))
                return BadRequest(new { error = "No sample extraction found. Extract a PDF first." });

            var filePath = ResolveMediaFilePath(mediaKey);
            if (filePath == null)
                return NotFound(new { error = "PDF file not found on disk." });

            // Run area detection to get current elements
            var includePages = ResolveIncludePages(filePath, sourceConfig);
            var areaResult = _pdfPagePropertiesService.DetectAreas(filePath, includePages, areaTemplate);

            // Find the target area across all pages
            var targetAreaDef = areaTemplate.Areas[request.AreaIndex];
            DetectedArea? targetArea = null;
            foreach (var page in areaResult.Pages)
            {
                targetArea = page.Areas.FirstOrDefault(a => a.Name == targetAreaDef.Name && a.Page == targetAreaDef.Page);
                if (targetArea != null) break;
            }

            if (targetArea == null)
                return NotFound(new { error = $"Area '{targetAreaDef.Name}' not found in detection result." });

            // Find the clicked element
            var allElements = targetArea.Sections.SelectMany(s =>
            {
                var elems = new List<AreaElement>();
                if (s.Heading != null) elems.Add(s.Heading);
                elems.AddRange(s.Children);
                return elems;
            }).ToList();

            var clickedElement = allElements.FirstOrDefault(e => e.Id == request.ElementId);
            if (clickedElement == null)
                return NotFound(new { error = $"Element '{request.ElementId}' not found in area '{targetAreaDef.Name}'." });

            // Infer the minimum distinguishing conditions
            var otherElements = allElements.Where(e => e.Id != request.ElementId).ToList();
            var pattern = InferMinimumPattern(clickedElement, otherElements);

            // Find all elements matching the inferred pattern
            var matchingIds = allElements
                .Where(e => PdfPagePropertiesService.MatchesAllConditions(e, pattern.Conditions))
                .Select(e => e.Id)
                .ToList();

            return Ok(new InferSectionPatternResponse
            {
                Pattern = pattern,
                MatchingElementIds = matchingIds,
                ClickedElementId = request.ElementId,
                TotalElements = allElements.Count
            });
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new { error = $"Workflow '{name}' not found." });
        }
    }

    /// <summary>
    /// Infers the minimum set of conditions that distinguish the clicked element
    /// from other elements in the area. Tries each metadata dimension individually
    /// and returns the simplest pattern that uniquely identifies "heading-like" elements.
    /// </summary>
    private static SectionPattern InferMinimumPattern(AreaElement clicked, List<AreaElement> others)
    {
        // Try single-condition candidates in order of specificity (most useful first)
        var candidates = new List<RuleCondition>();

        // Font name — often the strongest signal (e.g., "Clarendon" vs "Helvetica")
        if (!string.IsNullOrEmpty(clicked.FontName))
        {
            // Extract the base font name (strip PDF subset prefix like "GHEALP+")
            var baseFontName = clicked.FontName.Contains('+')
                ? clicked.FontName.Substring(clicked.FontName.IndexOf('+') + 1)
                : clicked.FontName;

            candidates.Add(new RuleCondition { Type = "fontNameContains", Value = baseFontName });
        }

        // Font size — check if clicked element has a distinct font size
        var clickedSize = Math.Round(clicked.FontSize, 1);
        var otherSizes = others.Select(e => Math.Round(e.FontSize, 1)).Distinct().ToList();
        if (otherSizes.All(s => Math.Abs(s - clickedSize) >= 0.5))
        {
            candidates.Add(new RuleCondition { Type = "fontSizeEquals", Value = clickedSize });
        }
        if (otherSizes.Count > 0 && clickedSize > otherSizes.Max())
        {
            candidates.Add(new RuleCondition { Type = "fontSizeAbove", Value = otherSizes.Max() });
        }

        // Color — often useful when headings have a distinct color
        if (!string.IsNullOrEmpty(clicked.Color))
        {
            var otherColors = others.Select(e => e.Color).Distinct().ToList();
            if (!otherColors.Contains(clicked.Color, StringComparer.OrdinalIgnoreCase))
            {
                candidates.Add(new RuleCondition { Type = "colorEquals", Value = clicked.Color });
            }
        }

        // Try each single candidate — does it uniquely identify headings without false positives?
        foreach (var candidate in candidates)
        {
            var conditions = new List<RuleCondition> { candidate };
            var falsePositives = others.Count(e => PdfPagePropertiesService.MatchesAllConditions(e, conditions));
            if (falsePositives == 0)
            {
                // This single condition is sufficient
                return new SectionPattern { Conditions = conditions };
            }
        }

        // No single condition works — try pairs
        for (int i = 0; i < candidates.Count; i++)
        {
            for (int j = i + 1; j < candidates.Count; j++)
            {
                var conditions = new List<RuleCondition> { candidates[i], candidates[j] };
                var falsePositives = others.Count(e => PdfPagePropertiesService.MatchesAllConditions(e, conditions));
                if (falsePositives == 0)
                {
                    return new SectionPattern { Conditions = conditions };
                }
            }
        }

        // Fallback: use all non-empty candidates
        if (candidates.Count > 0)
        {
            return new SectionPattern { Conditions = candidates };
        }

        // Last resort: no distinguishing conditions found — use font size equals
        return new SectionPattern
        {
            Conditions = new List<RuleCondition>
            {
                new RuleCondition { Type = "fontSizeEquals", Value = Math.Round(clicked.FontSize, 1) }
            }
        };
    }

    /// <summary>
    /// Resolves page selection from source.json into a list of page numbers.
    /// Opens the PDF briefly to get the total page count for validation.
    /// Returns null if all pages should be included.
    /// </summary>
    private static List<int>? ResolveIncludePages(string filePath, SourceConfig? sourceConfig)
    {
        if (sourceConfig?.Pages == null || sourceConfig.Pages.IsAll)
            return null;

        if (sourceConfig.Pages.PageNumbers == null || sourceConfig.Pages.PageNumbers.Count == 0)
            return null;

        // We need the total page count to validate page numbers.
        // Open the PDF briefly just to get the count — PdfPig is fast for this.
        using var document = UglyToad.PdfPig.PdfDocument.Open(filePath);
        return sourceConfig.ResolveIncludedPages(document.NumberOfPages);
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

public class SectionInclusionRequest
{
    public bool Included { get; set; }
}

public class PageSelectionRequest
{
    /// <summary>
    /// List of page numbers to include in extraction. Null or empty = all pages.
    /// </summary>
    public List<int>? Pages { get; set; }
}

public class InferSectionPatternRequest
{
    /// <summary>
    /// Zero-based index of the area in the area template's Areas list.
    /// </summary>
    public int AreaIndex { get; set; }

    /// <summary>
    /// The element ID (e.g., "p1-e5") that the user clicked as a section heading example.
    /// </summary>
    public string ElementId { get; set; } = string.Empty;
}

public class InferSectionPatternResponse
{
    /// <summary>
    /// The inferred section pattern with minimum distinguishing conditions.
    /// </summary>
    public SectionPattern Pattern { get; set; } = new();

    /// <summary>
    /// IDs of all elements in the area that match the inferred pattern.
    /// These are the proposed section headings.
    /// </summary>
    public List<string> MatchingElementIds { get; set; } = new();

    /// <summary>
    /// The element ID the user originally clicked.
    /// </summary>
    public string ClickedElementId { get; set; } = string.Empty;

    /// <summary>
    /// Total number of elements in the area, for context.
    /// </summary>
    public int TotalElements { get; set; }
}
