using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// Rich extraction result containing every text element with full metadata.
/// This is the foundational data contract for UpDoc — it defines the shape of data
/// that flows between extraction services, sample storage, API transport,
/// the content picker UI, and the condition auto-population system.
/// </summary>
public class RichExtractionResult
{
    [JsonPropertyName("version")]
    public string Version { get; set; } = "1.0";

    [JsonPropertyName("sourceType")]
    public string SourceType { get; set; } = "pdf";

    [JsonPropertyName("source")]
    public ExtractionSource Source { get; set; } = new();

    [JsonPropertyName("elements")]
    public List<ExtractionElement> Elements { get; set; } = new();

    [JsonIgnore]
    public string? Error { get; set; }
}

/// <summary>
/// Metadata about the source document that was extracted.
/// </summary>
public class ExtractionSource
{
    [JsonPropertyName("fileName")]
    public string FileName { get; set; } = string.Empty;

    [JsonPropertyName("mediaKey")]
    public string MediaKey { get; set; } = string.Empty;

    [JsonPropertyName("extractedDate")]
    public DateTime ExtractedDate { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("totalPages")]
    public int TotalPages { get; set; }

    /// <summary>
    /// Which pages were actually extracted. Null means all pages were included.
    /// </summary>
    [JsonPropertyName("extractedPages")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<int>? ExtractedPages { get; set; }
}

/// <summary>
/// A single text element extracted from a PDF, with full metadata.
/// Elements are grouped words on the same line (same Y coordinate).
/// The metadata is the condition vocabulary — every property here
/// becomes a potential condition field in the rule builder.
/// </summary>
public class ExtractionElement
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("page")]
    public int Page { get; set; }

    [JsonPropertyName("text")]
    public string Text { get; set; } = string.Empty;

    [JsonPropertyName("metadata")]
    public ElementMetadata Metadata { get; set; } = new();
}

/// <summary>
/// Rich metadata for a text element — derived from PdfPig's Word and Letter properties.
/// This is the condition vocabulary for the rule builder.
/// </summary>
public class ElementMetadata
{
    /// <summary>
    /// Font size in points (from Letter.PointSize).
    /// </summary>
    [JsonPropertyName("fontSize")]
    public double FontSize { get; set; }

    /// <summary>
    /// Font name (from Word.FontName or Letter.FontName).
    /// </summary>
    [JsonPropertyName("fontName")]
    public string FontName { get; set; } = string.Empty;

    /// <summary>
    /// Position of the element on the page (top-left corner of bounding box).
    /// </summary>
    [JsonPropertyName("position")]
    public ElementPosition Position { get; set; } = new();

    /// <summary>
    /// Bounding box enclosing all words in this element.
    /// </summary>
    [JsonPropertyName("boundingBox")]
    public ElementBoundingBox BoundingBox { get; set; } = new();

    /// <summary>
    /// Text color as hex string (e.g., "#1A3C6E").
    /// Derived from Letter.Color (FillColor or StrokeColor depending on RenderingMode).
    /// </summary>
    [JsonPropertyName("color")]
    public string Color { get; set; } = "#000000";

    /// <summary>
    /// For web sources: the auto-detected HTML area this element belongs to
    /// (e.g., "Header", "Main Content", "Footer", "Sidebar").
    /// Empty string for PDF/markdown sources or elements not in a detected area.
    /// </summary>
    [JsonPropertyName("htmlArea")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public string HtmlArea { get; set; } = string.Empty;
}

/// <summary>
/// Position coordinates on the page.
/// </summary>
public class ElementPosition
{
    [JsonPropertyName("x")]
    public double X { get; set; }

    [JsonPropertyName("y")]
    public double Y { get; set; }
}

/// <summary>
/// Bounding box dimensions for a text element.
/// </summary>
public class ElementBoundingBox
{
    [JsonPropertyName("left")]
    public double Left { get; set; }

    [JsonPropertyName("top")]
    public double Top { get; set; }

    [JsonPropertyName("width")]
    public double Width { get; set; }

    [JsonPropertyName("height")]
    public double Height { get; set; }
}
