using Asp.Versioning;
using UpDoc.Models;
using UpDoc.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Web.Common.Authorization;

namespace UpDoc.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("umbraco/management/api/v{version:apiVersion}/updoc")]
[MapToApi("updoc")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[JsonOptionsName("UmbracoManagementApi")]
public class PdfExtractionController : ControllerBase
{
    private readonly IMediaService _mediaService;
    private readonly IPdfExtractionService _pdfExtractionService;
    private readonly IPdfPagePropertiesService _pdfPagePropertiesService;
    private readonly IMapFileService _mapFileService;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<PdfExtractionController> _logger;

    public PdfExtractionController(
        IMediaService mediaService,
        IPdfExtractionService pdfExtractionService,
        IPdfPagePropertiesService pdfPagePropertiesService,
        IMapFileService mapFileService,
        IWebHostEnvironment webHostEnvironment,
        ILogger<PdfExtractionController> logger)
    {
        _mediaService = mediaService;
        _pdfExtractionService = pdfExtractionService;
        _pdfPagePropertiesService = pdfPagePropertiesService;
        _mapFileService = mapFileService;
        _webHostEnvironment = webHostEnvironment;
        _logger = logger;
    }

    [HttpGet("extract")]
    public IActionResult Extract(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        if (media == null)
        {
            return NotFound(new { error = "Media item not found" });
        }

        var umbracoFile = media.GetValue<string>("umbracoFile");
        if (string.IsNullOrEmpty(umbracoFile))
        {
            return BadRequest(new { error = "Media item has no file" });
        }

        // The umbracoFile value can be JSON or a simple path
        string filePath;
        if (umbracoFile.StartsWith("{"))
        {
            // JSON format: {"src":"/media/xxx/file.pdf"}
            var json = System.Text.Json.JsonDocument.Parse(umbracoFile);
            filePath = json.RootElement.GetProperty("src").GetString() ?? string.Empty;
        }
        else
        {
            filePath = umbracoFile;
        }

        if (string.IsNullOrEmpty(filePath))
        {
            return BadRequest(new { error = "Could not determine file path" });
        }

        // Convert relative path to absolute file system path
        var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

        if (!System.IO.File.Exists(absolutePath))
        {
            return NotFound(new { error = $"File not found on disk: {filePath}" });
        }

        var result = _pdfExtractionService.ExtractFromFile(absolutePath);

        if (!string.IsNullOrEmpty(result.Error))
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new
        {
            text = result.RawText,
            pageCount = result.PageCount
        });
    }

    [HttpGet("page-properties")]
    public IActionResult GetPageProperties(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        if (media == null)
        {
            return NotFound(new { error = "Media item not found" });
        }

        var umbracoFile = media.GetValue<string>("umbracoFile");
        if (string.IsNullOrEmpty(umbracoFile))
        {
            return BadRequest(new { error = "Media item has no file" });
        }

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

        if (string.IsNullOrEmpty(filePath))
        {
            return BadRequest(new { error = "Could not determine file path" });
        }

        var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

        if (!System.IO.File.Exists(absolutePath))
        {
            return NotFound(new { error = $"File not found on disk: {filePath}" });
        }

        var result = _pdfPagePropertiesService.ExtractFromFile(absolutePath);

        if (!string.IsNullOrEmpty(result.Error))
        {
            return BadRequest(new { error = result.Error });
        }

        // Log to console for testing
        _logger.LogInformation("=== PDF Page Properties ===");
        _logger.LogInformation("Title → Page Title, Page Title Short: {Title}", result.Title);
        _logger.LogInformation("Description → Page Description: {Description}", result.Description);
        _logger.LogInformation("===========================");

        return Ok(new
        {
            title = result.Title,
            description = result.Description
        });
    }

    [HttpGet("page-section")]
    public IActionResult GetPageSection(Guid mediaKey, string heading)
    {
        if (string.IsNullOrWhiteSpace(heading))
        {
            return BadRequest(new { error = "Heading parameter is required" });
        }

        var media = _mediaService.GetById(mediaKey);
        if (media == null)
        {
            return NotFound(new { error = "Media item not found" });
        }

        var umbracoFile = media.GetValue<string>("umbracoFile");
        if (string.IsNullOrEmpty(umbracoFile))
        {
            return BadRequest(new { error = "Media item has no file" });
        }

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

        if (string.IsNullOrEmpty(filePath))
        {
            return BadRequest(new { error = "Could not determine file path" });
        }

        var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

        if (!System.IO.File.Exists(absolutePath))
        {
            return NotFound(new { error = $"File not found on disk: {filePath}" });
        }

        var result = _pdfPagePropertiesService.ExtractSectionByHeading(absolutePath, heading);

        if (!string.IsNullOrEmpty(result.Error))
        {
            return BadRequest(new { error = result.Error });
        }

        _logger.LogInformation("=== PDF Section Extraction ===");
        _logger.LogInformation("Heading found: {Heading}", result.Heading);
        _logger.LogInformation("Content length: {Length} chars", result.Content.Length);
        _logger.LogInformation("==============================");

        return Ok(new
        {
            heading = result.Heading,
            content = result.Content
        });
    }

    [HttpGet("extract-markdown")]
    public IActionResult ExtractMarkdown(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        if (media == null)
        {
            return NotFound(new { error = "Media item not found" });
        }

        var umbracoFile = media.GetValue<string>("umbracoFile");
        if (string.IsNullOrEmpty(umbracoFile))
        {
            return BadRequest(new { error = "Media item has no file" });
        }

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

        if (string.IsNullOrEmpty(filePath))
        {
            return BadRequest(new { error = "Could not determine file path" });
        }

        var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

        if (!System.IO.File.Exists(absolutePath))
        {
            return NotFound(new { error = $"File not found on disk: {filePath}" });
        }

        var result = _pdfPagePropertiesService.ExtractAsMarkdown(absolutePath);

        if (!string.IsNullOrEmpty(result.Error))
        {
            return BadRequest(new { error = result.Error });
        }

        _logger.LogInformation("=== PDF Markdown Extraction ===");
        _logger.LogInformation("Title: {Title}", result.Title);
        _logger.LogInformation("Subtitle: {Subtitle}", result.Subtitle);
        _logger.LogInformation("Markdown length: {Length} chars", result.Markdown.Length);
        _logger.LogInformation("================================");

        return Ok(new
        {
            title = result.Title,
            subtitle = result.Subtitle,
            markdown = result.Markdown,
            rawText = result.RawText
        });
    }

    [HttpGet("maps/{blueprintId}")]
    public IActionResult GetMapForBlueprint(Guid blueprintId)
    {
        var mapFile = _mapFileService.GetMapForBlueprint(blueprintId);
        if (mapFile == null)
        {
            return NotFound(new { error = $"No map file found for blueprint {blueprintId}" });
        }

        return Ok(mapFile);
    }

    [HttpGet("extract-sections")]
    public IActionResult ExtractSections(Guid mediaKey, Guid blueprintId)
    {
        var mapFile = _mapFileService.GetMapForBlueprint(blueprintId);
        if (mapFile == null)
        {
            return NotFound(new { error = $"No map file found for blueprint {blueprintId}" });
        }

        var pdfConfig = mapFile.SourceTypes.Pdf;
        if (pdfConfig?.Extraction == null)
        {
            return BadRequest(new { error = "Map file has no PDF extraction rules configured" });
        }

        var absolutePath = ResolveMediaFilePath(mediaKey);
        if (absolutePath == null)
        {
            return NotFound(new { error = "Media item not found or file not on disk" });
        }

        var result = _pdfPagePropertiesService.ExtractSections(absolutePath, pdfConfig.Extraction);

        if (!string.IsNullOrEmpty(result.Error))
        {
            return BadRequest(new { error = result.Error });
        }

        _logger.LogInformation("=== PDF Section Extraction (Map-driven) ===");
        foreach (var section in result.Sections)
        {
            _logger.LogInformation("{Key}: {Length} chars", section.Key, section.Value.Length);
        }
        _logger.LogInformation("=============================================");

        return Ok(new
        {
            sections = result.Sections,
            propertyMappings = mapFile.PropertyMappings,
        });
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
