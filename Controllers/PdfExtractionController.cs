using Asp.Versioning;
using CreateDocumentFromPdf.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Web.Common.Authorization;

namespace CreateDocumentFromPdf.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("umbraco/management/api/v{version:apiVersion}/createfrompdf")]
[MapToApi("createfrompdf")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[JsonOptionsName("UmbracoManagementApi")]
public class PdfExtractionController : ControllerBase
{
    private readonly IMediaService _mediaService;
    private readonly IPdfExtractionService _pdfExtractionService;
    private readonly IPdfPagePropertiesService _pdfPagePropertiesService;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<PdfExtractionController> _logger;

    public PdfExtractionController(
        IMediaService mediaService,
        IPdfExtractionService pdfExtractionService,
        IPdfPagePropertiesService pdfPagePropertiesService,
        IWebHostEnvironment webHostEnvironment,
        ILogger<PdfExtractionController> logger)
    {
        _mediaService = mediaService;
        _pdfExtractionService = pdfExtractionService;
        _pdfPagePropertiesService = pdfPagePropertiesService;
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
}
