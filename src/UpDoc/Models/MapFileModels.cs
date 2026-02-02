using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// Root model for a map file. One per document type, stored in updoc/maps/.
/// </summary>
public class MapFile
{
    [JsonPropertyName("$schema")]
    public string? Schema { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("documentTypeAlias")]
    public string DocumentTypeAlias { get; set; } = string.Empty;

    [JsonPropertyName("blueprintId")]
    public string? BlueprintId { get; set; }

    [JsonPropertyName("sourceTypes")]
    public SourceTypes SourceTypes { get; set; } = new();

    [JsonPropertyName("propertyMappings")]
    public List<PropertyMapping> PropertyMappings { get; set; } = new();
}

/// <summary>
/// Container for source type configurations. Each source type (pdf, web, word)
/// has its own extraction rules.
/// </summary>
public class SourceTypes
{
    [JsonPropertyName("pdf")]
    public SourceTypeConfig? Pdf { get; set; }

    [JsonPropertyName("web")]
    public SourceTypeConfig? Web { get; set; }

    [JsonPropertyName("word")]
    public SourceTypeConfig? Word { get; set; }
}

/// <summary>
/// Configuration for a single source type.
/// </summary>
public class SourceTypeConfig
{
    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; }

    [JsonPropertyName("extraction")]
    public PdfExtractionRules? Extraction { get; set; }
}

/// <summary>
/// Extraction rules for PDF source type. Controls how content is parsed from the PDF.
/// </summary>
public class PdfExtractionRules
{
    [JsonPropertyName("columnDetection")]
    public ColumnDetectionConfig? ColumnDetection { get; set; }

    [JsonPropertyName("titleDetection")]
    public TitleDetectionConfig? TitleDetection { get; set; }

    [JsonPropertyName("descriptionPattern")]
    public string? DescriptionPattern { get; set; }

    [JsonPropertyName("content")]
    public ContentExtractionConfig? Content { get; set; }
}

public class ColumnDetectionConfig
{
    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; } = true;

    [JsonPropertyName("thresholdPercent")]
    public double ThresholdPercent { get; set; } = 0.35;
}

public class TitleDetectionConfig
{
    [JsonPropertyName("fontSizeThreshold")]
    public double FontSizeThreshold { get; set; } = 0.85;
}

public class ContentExtractionConfig
{
    [JsonPropertyName("startPattern")]
    public string? StartPattern { get; set; }

    [JsonPropertyName("stopPatterns")]
    public List<string> StopPatterns { get; set; } = new();

    [JsonPropertyName("headingLevel")]
    public string HeadingLevel { get; set; } = "h2";
}

/// <summary>
/// Maps an extracted section to one or more Umbraco document properties.
/// </summary>
public class PropertyMapping
{
    [JsonPropertyName("from")]
    public MappingSource From { get; set; } = new();

    [JsonPropertyName("to")]
    public MappingTarget To { get; set; } = new();
}

/// <summary>
/// Identifies which extracted section to use as the source value.
/// </summary>
public class MappingSource
{
    [JsonPropertyName("sectionType")]
    public string SectionType { get; set; } = string.Empty;
}

/// <summary>
/// Identifies the target Umbraco property (or block grid location) for the extracted value.
/// </summary>
public class MappingTarget
{
    /// <summary>
    /// Simple property alias (e.g. "pageTitle"). Null when targeting a block grid.
    /// </summary>
    [JsonPropertyName("property")]
    public string? Property { get; set; }

    /// <summary>
    /// Additional simple properties to receive the same value (e.g. ["pageTitleShort"]).
    /// </summary>
    [JsonPropertyName("alsoMapTo")]
    public List<string>? AlsoMapTo { get; set; }

    /// <summary>
    /// Block grid property alias (e.g. "contentGrid"). When set, the mapping targets a block within this grid.
    /// </summary>
    [JsonPropertyName("blockGrid")]
    public string? BlockGrid { get; set; }

    /// <summary>
    /// How to find the target block within the block grid.
    /// </summary>
    [JsonPropertyName("blockSearch")]
    public BlockSearchConfig? BlockSearch { get; set; }

    /// <summary>
    /// The property alias within the found block to write to (e.g. "richTextContent").
    /// </summary>
    [JsonPropertyName("targetProperty")]
    public string? TargetProperty { get; set; }

    /// <summary>
    /// Whether to convert the extracted Markdown to HTML before writing.
    /// </summary>
    [JsonPropertyName("convertMarkdown")]
    public bool ConvertMarkdown { get; set; }
}

/// <summary>
/// Defines how to locate a specific block within a block grid by searching for a property value.
/// </summary>
public class BlockSearchConfig
{
    [JsonPropertyName("property")]
    public string Property { get; set; } = string.Empty;

    [JsonPropertyName("value")]
    public string Value { get; set; } = string.Empty;
}
