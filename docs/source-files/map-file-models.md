# MapFileModels.cs

Strongly-typed C# classes for deserializing map file JSON. Each map file defines how content is extracted from a source (e.g., PDF) and mapped to Umbraco document properties.

## What it does

Provides the object model for `*-map.json` files stored in `updoc/maps/` at the site root. These files configure:
1. Which document type and blueprint the map applies to
2. Source type extraction rules (column detection, title detection, content boundaries)
3. Property mappings from extracted sections to Umbraco document properties (including block grid targets)

All properties use `System.Text.Json.Serialization.JsonPropertyName` attributes for camelCase JSON serialization.

## Root model

```csharp
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
```

## Source type configuration

```csharp
public class SourceTypes
{
    [JsonPropertyName("pdf")]
    public SourceTypeConfig? Pdf { get; set; }

    [JsonPropertyName("web")]
    public SourceTypeConfig? Web { get; set; }

    [JsonPropertyName("word")]
    public SourceTypeConfig? Word { get; set; }
}

public class SourceTypeConfig
{
    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; }

    [JsonPropertyName("extraction")]
    public PdfExtractionRules? Extraction { get; set; }
}
```

Each source type (pdf, web, word) can be independently enabled and configured with its own extraction rules.

## PDF extraction rules

```csharp
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
```

| Sub-config | Purpose | Defaults |
|-----------|---------|----------|
| `ColumnDetectionConfig` | Enable/disable column filtering; set threshold percent for gap detection | `Enabled = true`, `ThresholdPercent = 0.35` |
| `TitleDetectionConfig` | Font size threshold ratio for identifying title text | `FontSizeThreshold = 0.85` |
| `ContentExtractionConfig` | Regex start/stop patterns for content boundaries; heading level for extracted headings | `HeadingLevel = "h2"` |

The `DescriptionPattern` is a regex matched against lines to identify the description (e.g., `\\d+\\s*days?\\s+from\\s+` for travel brochures).

## Property mappings

```csharp
public class PropertyMapping
{
    [JsonPropertyName("from")]
    public MappingSource From { get; set; } = new();

    [JsonPropertyName("to")]
    public MappingTarget To { get; set; } = new();
}

public class MappingSource
{
    [JsonPropertyName("sectionType")]
    public string SectionType { get; set; } = string.Empty;  // e.g. "title", "description", "content"
}
```

### MappingTarget

```csharp
public class MappingTarget
{
    [JsonPropertyName("property")]
    public string? Property { get; set; }           // Simple property alias (e.g. "pageTitle")

    [JsonPropertyName("alsoMapTo")]
    public List<string>? AlsoMapTo { get; set; }    // Additional properties receiving same value

    [JsonPropertyName("blockGrid")]
    public string? BlockGrid { get; set; }           // Block grid property alias (e.g. "contentGrid")

    [JsonPropertyName("blockSearch")]
    public BlockSearchConfig? BlockSearch { get; set; }  // How to find the target block

    [JsonPropertyName("targetProperty")]
    public string? TargetProperty { get; set; }      // Property within the found block

    [JsonPropertyName("convertMarkdown")]
    public bool ConvertMarkdown { get; set; }        // Convert Markdown to HTML before writing
}
```

There are two mapping modes:
- **Simple property**: Set `Property` (and optionally `AlsoMapTo`) to write directly to document properties
- **Block grid**: Set `BlockGrid`, `BlockSearch`, and `TargetProperty` to write into a specific block within a block grid

### BlockSearchConfig

```csharp
public class BlockSearchConfig
{
    [JsonPropertyName("property")]
    public string Property { get; set; } = string.Empty;  // Property alias to search (e.g. "featurePropertyFeatureTitle")

    [JsonPropertyName("value")]
    public string Value { get; set; } = string.Empty;      // Value to match (case-insensitive contains)
}
```

Locates a block within a block grid by searching `contentData` for a block whose specified property contains the given value.

## Key concepts

### Two mapping modes

A property mapping either targets a simple document property or a block within a block grid. The action checks for `blockGrid` first; if absent, it falls back to simple property assignment.

### JSON attribute convention

All properties use `[JsonPropertyName("camelCase")]` so the C# PascalCase properties serialize to the camelCase keys expected in the JSON map files.

## Namespace

```csharp
namespace UpDoc.Models;
```
