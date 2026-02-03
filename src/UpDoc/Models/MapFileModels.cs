using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// Extraction rules for PDF source type. Controls how content is parsed from the PDF.
/// Used by PdfPagePropertiesService.ExtractSections() for backward compatibility.
/// TODO: Refactor extraction service to be strategy-driven based on SourceConfig.
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

/// <summary>
/// Column detection settings for multi-column PDFs (legacy extraction).
/// </summary>
public class ColumnDetectionConfig
{
    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; } = true;

    [JsonPropertyName("thresholdPercent")]
    public double ThresholdPercent { get; set; } = 0.35;
}

/// <summary>
/// Title detection settings (legacy extraction).
/// </summary>
public class TitleDetectionConfig
{
    [JsonPropertyName("fontSizeThreshold")]
    public double FontSizeThreshold { get; set; } = 0.85;
}

/// <summary>
/// Content extraction settings (legacy extraction).
/// </summary>
public class ContentExtractionConfig
{
    [JsonPropertyName("startPattern")]
    public string? StartPattern { get; set; }

    [JsonPropertyName("stopPatterns")]
    public List<string> StopPatterns { get; set; } = new();

    [JsonPropertyName("headingLevel")]
    public string HeadingLevel { get; set; } = "h2";
}
