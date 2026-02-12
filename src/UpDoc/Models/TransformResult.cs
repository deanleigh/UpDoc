using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// Result of transforming zone detection output into assembled Markdown sections.
/// Each detected section's children are assembled into a single Markdown string
/// using the appropriate pattern (bullet list, paragraph, sub-headed content).
/// </summary>
public class TransformResult
{
    public string Version { get; set; } = "1.0";
    public List<TransformedSection> Sections { get; set; } = new();
    public TransformDiagnostics Diagnostics { get; set; } = new();
}

/// <summary>
/// A section whose children have been assembled into Markdown content.
/// </summary>
public class TransformedSection
{
    /// <summary>
    /// Semantic ID derived from heading text: "features", "what-we-will-see".
    /// For preamble sections (no heading): "preamble-p{page}-z{zoneIndex}".
    /// </summary>
    public string Id { get; set; } = string.Empty;

    /// <summary>Original heading text as extracted (e.g., "FEATURES").</summary>
    public string? OriginalHeading { get; set; }

    /// <summary>Title-cased heading (e.g., "Features"). Null for preamble sections.</summary>
    public string? Heading { get; set; }

    /// <summary>Assembled Markdown content from section children.</summary>
    public string Content { get; set; } = string.Empty;

    /// <summary>Which assembly pattern was applied: bulletList, paragraph, subHeaded, preamble.</summary>
    public string Pattern { get; set; } = "paragraph";

    /// <summary>Source page number.</summary>
    public int Page { get; set; }

    /// <summary>Hex color of the zone this section belongs to. Null for unzoned content.</summary>
    public string? ZoneColor { get; set; }

    /// <summary>Number of children that were assembled.</summary>
    public int ChildCount { get; set; }
}

/// <summary>
/// Diagnostic counts for the transform result.
/// </summary>
public class TransformDiagnostics
{
    public int TotalSections { get; set; }
    public int BulletListSections { get; set; }
    public int ParagraphSections { get; set; }
    public int SubHeadedSections { get; set; }
    public int PreambleSections { get; set; }
}
