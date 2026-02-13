using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// Result of zone detection from a PDF. Contains the full hierarchy:
/// Pages → Zones → Sections → Elements.
/// Zone detection is destination-agnostic — it produces a complete structural
/// representation of the source PDF regardless of mapping configuration.
/// </summary>
public class ZoneDetectionResult
{
    [JsonPropertyName("totalPages")]
    public int TotalPages { get; set; }

    [JsonPropertyName("pages")]
    public List<PageZones> Pages { get; set; } = new();

    [JsonPropertyName("diagnostics")]
    public ZoneDiagnosticInfo Diagnostics { get; set; } = new();
}

/// <summary>
/// All detected zones for a single page, plus any unzoned content.
/// </summary>
public class PageZones
{
    [JsonPropertyName("page")]
    public int Page { get; set; }

    [JsonPropertyName("zones")]
    public List<DetectedZone> Zones { get; set; } = new();

    /// <summary>
    /// Elements that don't fall within any detected zone, still grouped into sections.
    /// Null if all elements are in zones.
    /// </summary>
    [JsonPropertyName("unzonedContent")]
    public DetectedZone? UnzonedContent { get; set; }
}

/// <summary>
/// A spatial zone detected from a filled rectangle in the PDF.
/// Contains sections (heading groups) within the zone.
/// </summary>
public class DetectedZone
{
    [JsonPropertyName("color")]
    public string Color { get; set; } = string.Empty;

    [JsonPropertyName("boundingBox")]
    public ElementBoundingBox BoundingBox { get; set; } = new();

    [JsonPropertyName("page")]
    public int Page { get; set; }

    [JsonPropertyName("sections")]
    public List<DetectedSection> Sections { get; set; } = new();

    [JsonPropertyName("totalElements")]
    public int TotalElements { get; set; }
}

/// <summary>
/// A section within a zone, defined by a heading and its children.
/// Heading is null for preamble content (elements before the first heading).
/// </summary>
public class DetectedSection
{
    [JsonPropertyName("heading")]
    public ZoneElement? Heading { get; set; }

    [JsonPropertyName("children")]
    public List<ZoneElement> Children { get; set; } = new();
}

/// <summary>
/// A text element within a zone, carrying enough metadata to understand
/// the element in its hierarchical context without cross-referencing.
/// </summary>
public class ZoneElement
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("text")]
    public string Text { get; set; } = string.Empty;

    [JsonPropertyName("fontSize")]
    public double FontSize { get; set; }

    [JsonPropertyName("fontName")]
    public string FontName { get; set; } = string.Empty;

    [JsonPropertyName("color")]
    public string Color { get; set; } = string.Empty;

    [JsonPropertyName("boundingBox")]
    public ElementBoundingBox BoundingBox { get; set; } = new();
}

/// <summary>
/// Diagnostic information about the zone detection process.
/// Useful for debugging and understanding what the detector found.
/// </summary>
public class ZoneDiagnosticInfo
{
    [JsonPropertyName("totalPathsFound")]
    public int TotalPathsFound { get; set; }

    [JsonPropertyName("pathsAfterFiltering")]
    public int PathsAfterFiltering { get; set; }

    [JsonPropertyName("zonesDetected")]
    public int ZonesDetected { get; set; }

    [JsonPropertyName("elementsZoned")]
    public int ElementsZoned { get; set; }

    [JsonPropertyName("elementsUnzoned")]
    public int ElementsUnzoned { get; set; }
}
