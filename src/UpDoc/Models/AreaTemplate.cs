using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// A user-defined area template for PDF extraction. Users draw rectangular areas
/// on the PDF, name them, and save them. Extraction then runs only within these areas.
/// Stored as area-template.json in the workflow folder.
/// </summary>
public class AreaTemplate
{
    [JsonPropertyName("templateName")]
    public string TemplateName { get; set; } = string.Empty;

    [JsonPropertyName("sourceFile")]
    public string SourceFile { get; set; } = string.Empty;

    [JsonPropertyName("pageSize")]
    public PageSizeInfo PageSize { get; set; } = new();

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }

    [JsonPropertyName("areas")]
    public List<AreaDefinition> Areas { get; set; } = new();
}

/// <summary>
/// A single user-defined area on a PDF page. Bounds are in PDF point space
/// (origin bottom-left, Y increases upward) — same coordinate system as PdfPig.
/// </summary>
public class AreaDefinition
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("property")]
    public string Property { get; set; } = string.Empty;

    [JsonPropertyName("page")]
    public int Page { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("bounds")]
    public AreaBounds Bounds { get; set; } = new();

    [JsonPropertyName("color")]
    public string Color { get; set; } = string.Empty;

    /// <summary>
    /// User-defined pattern for identifying section heading elements in this area.
    /// Null = not yet configured (auto-detect with bodySize * 1.15 for backwards compatibility).
    /// Empty conditions = explicitly no section headings (one flat section).
    /// Populated conditions = user-defined from teach-by-example.
    /// </summary>
    [JsonPropertyName("sectionPattern")]
    public SectionPattern? SectionPattern { get; set; }

    [JsonPropertyName("expectedSections")]
    public List<string> ExpectedSections { get; set; } = new();

    [JsonPropertyName("notes")]
    public string Notes { get; set; } = string.Empty;
}

/// <summary>
/// Rectangle bounds in PDF point space (origin bottom-left, Y increases upward).
/// </summary>
public class AreaBounds
{
    [JsonPropertyName("x")]
    public double X { get; set; }

    [JsonPropertyName("y")]
    public double Y { get; set; }

    [JsonPropertyName("width")]
    public double Width { get; set; }

    [JsonPropertyName("height")]
    public double Height { get; set; }
}

/// <summary>
/// Page dimensions in PDF points.
/// </summary>
public class PageSizeInfo
{
    [JsonPropertyName("width")]
    public double Width { get; set; }

    [JsonPropertyName("height")]
    public double Height { get; set; }
}
