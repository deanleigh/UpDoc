# PdfPagePropertiesService.cs

Service that extracts page properties (title and description) from PDF files using font size and position analysis.

## What it does

Analyzes the first page of a PDF to extract structured page properties:
1. Opens PDF files from file path or stream
2. Extracts text with position and font size data
3. Groups words into lines by Y-coordinate
4. Identifies title from largest font text at top of page
5. Identifies description from next text block below title

## Interface

```csharp
public interface IPdfPagePropertiesService
{
    PdfPageProperties ExtractFromFile(string filePath);
    PdfPageProperties ExtractFromStream(Stream stream);
}
```

## Result class

```csharp
public class PdfPageProperties
{
    public string Title { get; set; }        // Document title from largest font
    public string Description { get; set; }  // Description from text below title
    public string? Error { get; set; }       // Error message if extraction failed
}
```

## Property mapping

The extracted properties map to Umbraco page fields:

| Extracted Property | Umbraco Field(s) |
|-------------------|------------------|
| Title | Page Title, Page Title Short, Node Name |
| Description | Page Description |

## Key concepts

### Title extraction

1. Groups words into lines by Y-coordinate proximity
2. Calculates average font size per line
3. Identifies largest font size in document
4. Collects consecutive lines from top with similar large font
5. Combines into single title string

### Description extraction

1. Finds first non-title line with content
2. Collects lines with similar font size (15% tolerance)
3. Limits to 3 lines maximum
4. Combines into description string

### Font size estimation

Uses word bounding box height as a proxy for font size since PDF Pig's `GetWords()` provides reliable bounding boxes.

## Usage

```csharp
public class MyController : ControllerBase
{
    private readonly IPdfPagePropertiesService _pagePropertiesService;

    public MyController(IPdfPagePropertiesService pagePropertiesService)
    {
        _pagePropertiesService = pagePropertiesService;
    }

    public IActionResult GetPageProperties(string path)
    {
        var result = _pagePropertiesService.ExtractFromFile(path);

        if (!string.IsNullOrEmpty(result.Error))
            return BadRequest(result.Error);

        return Ok(new
        {
            title = result.Title,
            description = result.Description
        });
    }
}
```

## Registration

Registered via `CreateFromPdfComposer` as a scoped service.
