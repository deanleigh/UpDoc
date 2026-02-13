using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// A user-defined zone template for PDF extraction. Users draw rectangular zones
/// on the PDF, name them, and save them. Extraction then runs only within these zones.
/// Stored as zone-template.json in the workflow folder.
/// </summary>
public class ZoneTemplate
{
    [JsonPropertyName("templateName")]
    public string TemplateName { get; set; } = string.Empty;

    [JsonPropertyName("sourceFile")]
    public string SourceFile { get; set; } = string.Empty;

    [JsonPropertyName("pageSize")]
    public PageSizeInfo PageSize { get; set; } = new();

    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }

    [JsonPropertyName("zones")]
    public List<ZoneDefinition> Zones { get; set; } = new();
}

/// <summary>
/// A single user-defined zone on a PDF page. Bounds are in PDF point space
/// (origin bottom-left, Y increases upward) — same coordinate system as PdfPig.
/// </summary>
public class ZoneDefinition
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
    public ZoneBounds Bounds { get; set; } = new();

    [JsonPropertyName("color")]
    public string Color { get; set; } = string.Empty;

    [JsonPropertyName("headingFont")]
    public string HeadingFont { get; set; } = string.Empty;

    [JsonPropertyName("expectedSections")]
    public List<string> ExpectedSections { get; set; } = new();

    [JsonPropertyName("notes")]
    public string Notes { get; set; } = string.Empty;
}

/// <summary>
/// Rectangle bounds in PDF point space (origin bottom-left, Y increases upward).
/// </summary>
public class ZoneBounds
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
