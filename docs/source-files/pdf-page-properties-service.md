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
    PdfSectionResult ExtractSectionByHeading(string filePath, string headingText);
    PdfMarkdownResult ExtractAsMarkdown(string filePath);
}
```

## Result classes

```csharp
public class PdfPageProperties
{
    public string Title { get; set; }        // Document title from largest font
    public string Description { get; set; }  // Description from text below title
    public string? Error { get; set; }       // Error message if extraction failed
}

public class PdfSectionResult
{
    public string Heading { get; set; }      // The heading that was found
    public string Content { get; set; }      // The content text extracted under the heading
    public string? Error { get; set; }       // Error message if extraction failed
}

public class PdfMarkdownResult
{
    public string Title { get; set; }        // Document title (H1)
    public string Subtitle { get; set; }     // Document subtitle/description
    public string Markdown { get; set; }     // Full content as Markdown
    public string RawText { get; set; }      // Raw text for debugging
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

### Section extraction by heading

The `ExtractSectionByHeading` method extracts content from a specific section:
1. Searches all pages for a line containing the heading text (case-insensitive)
2. Captures all text lines below the heading
3. Stops when it encounters another heading (similar or larger font size)
4. Returns the heading found and the content as plain text

**Special handling for itinerary extraction:**
When the heading matches a "Day N" pattern (e.g., "Day 1"), the extraction continues through all subsequent "Day N" headings (Day 2, Day 3, etc.) until a non-Day heading is encountered. This allows extracting complete itineraries that span multiple days.

```csharp
// Example: Extract full itinerary by searching for "Day 1"
var result = _pagePropertiesService.ExtractSectionByHeading(path, "Day 1");
// Result.Content will contain Day 1, Day 2, Day 3... until end of itinerary
```

### Markdown extraction with column detection

The `ExtractAsMarkdown` method extracts the full PDF content as Markdown, with intelligent column detection for multi-column layouts common in travel brochures and itineraries:

1. Analyzes word positions to detect column boundaries
2. Merges multi-column content into a single flow
3. Identifies headings by font size and applies Markdown heading levels
4. Preserves paragraph structure with proper spacing

```csharp
// Example: Extract full PDF as Markdown
var result = _pagePropertiesService.ExtractAsMarkdown(path);
// Result.Title = "The Castles and Gardens of Kent"
// Result.Subtitle = "5 days from £889"
// Result.Markdown = "## Day 1\n\nArrive at...\n\n## Day 2\n\nVisit..."
```

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
