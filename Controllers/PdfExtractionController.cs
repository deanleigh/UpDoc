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
    private readonly IWebHostEnvironment _webHostEnvironment;

    public PdfExtractionController(
        IMediaService mediaService,
        IPdfExtractionService pdfExtractionService,
        IWebHostEnvironment webHostEnvironment)
    {
        _mediaService = mediaService;
        _pdfExtractionService = pdfExtractionService;
        _webHostEnvironment = webHostEnvironment;
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
}
