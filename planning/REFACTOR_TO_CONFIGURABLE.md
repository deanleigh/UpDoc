> **Note:** This document uses the old "CreateFromPdf" naming. The project has been renamed to **UpDoc**. File paths, namespaces, API routes, and Umbraco aliases have all been updated. See `CLAUDE.md` for current naming conventions.

# Refactor Plan: Convert to Configurable Generic Package

## Document Purpose
This document guides the refactoring of the "Create Document from PDF" Umbraco extension into a configurable, multi-source generic package called **"Create Document from Source"**. This serves as the implementation roadmap for Claude Code and documents architectural decisions.

---

## Architecture Decision: Single Package

**Decision:** Keep as one configurable package rather than splitting into generic + client-specific packages.

**Rationale:**
- Client gets improvements automatically when the package is updated
- Real-world client usage feeds back into improving the generic package
- No code duplication or version drift between two repos
- Config files (and eventually a dashboard) provide the customisation boundary

**The boundary:** The package code is generic. The config files (and later, dashboard-managed database settings) are client-specific.

---

## Architecture Decision: Map Files

### What is a Map File?

A **Map File** defines how content is extracted from a source document (PDF, web page, or Word document) and how that extracted content is mapped to properties on an Umbraco document. Each map file is self-contained — it describes both the **extraction rules** (what to look for in the source) and the **property mappings** (where to put it in the destination). A site may have multiple map files, one for each document type or blueprint that can be created from a source.

### Naming

Map files are named after the **document type** they target, using kebab-case with a `-map` suffix:

- `group-tour-map.json`
- `product-map.json`
- `service-map.json`
- `blog-post-map.json`

Named by document type (not blueprint GUID) because:
- Human-readable and immediately clear what each file is for
- Survives the future transition to blueprint-optional (a GUID filename would be meaningless without a blueprint)
- Consistent with the project's kebab-case file naming convention

### One Map File Per Document Type / Blueprint

**Decision:** Each map file contains BOTH extraction rules AND property mappings. No shared/global config. No separation of extraction from mapping.

**Rationale:**
- A site may have many document types (Product, Service, Group Tour, Blog Post, etc.), each with completely different extraction rules and property mappings
- Extraction rules and property mappings are tightly coupled to the destination — "what to extract" depends on "where to put it"
- Separating extraction from mapping creates a management problem: naming profiles, referencing between files, keeping them in sync
- If two document types genuinely need identical extraction rules, duplicating the extraction section is a minor cost compared to the complexity of an indirection layer
- Each map file is self-contained and independently understandable

### File Location

**Decision:** `updoc/maps/` at the site root (follows the uSync pattern).

**Rationale:**
- Map files are **site-specific** — they must not live inside the RCL package or they'd be overwritten on package updates
- They must be committed to git and travel with the site across deployments
- The `updoc/` root folder follows the established Umbraco ecosystem pattern (uSync uses `uSync/` at the site root for its serialized content files)
- Clear separation from the package code (`src/UpDoc/`) and from Umbraco runtime data (`umbraco/Data/`)
- The path is configurable via `appsettings.json` for sites that need a different location

**For the test site:** `src/UpDoc.TestSite/updoc/maps/`

### Map File Structure

```json
{
  "$schema": "https://updoc.dev/schemas/map.schema.json",
  "name": "Group Tour Page",
  "documentTypeAlias": "groupTour",
  "blueprintId": "b33c0169-ddd7-40c9-b75f-0fa116455ea9",
  "sourceTypes": {
    "pdf": {
      "enabled": true,
      "extraction": {
        "columnDetection": { "enabled": true, "thresholdPercent": 0.35 },
        "titleDetection": { "fontSizeThreshold": 0.85 },
        "descriptionPattern": "\\d+\\s*days?\\s+from\\s+£\\d+",
        "content": {
          "startPattern": "^Day\\s+\\d+",
          "stopPatterns": ["terms", "conditions", "booking", "contact us", "telephone", "email:", "www.", "http", "nb:", "nb:-", "please note", "reserve the right"],
          "headingLevel": "h2"
        }
      }
    }
  },
  "propertyMappings": [
    {
      "from": { "sectionType": "title" },
      "to": { "property": "pageTitle", "alsoMapTo": ["pageTitleShort"] }
    },
    {
      "from": { "sectionType": "description" },
      "to": { "property": "pageDescription" }
    },
    {
      "from": { "sectionType": "content" },
      "to": {
        "blockGrid": "contentGrid",
        "blockSearch": { "property": "featurePropertyFeatureTitle", "value": "Suggested Itinerary" },
        "targetProperty": "richTextContent",
        "convertMarkdown": true
      }
    }
  ]
}
```

**Key fields:**
- `documentTypeAlias` — the Umbraco document type alias (used as the primary lookup key)
- `blueprintId` — optional, links to a specific blueprint (required for this iteration, optional in future)
- `sourceTypes` — extraction rules per source type (only `pdf` is functional now)
- `propertyMappings` — maps extracted sections to Umbraco document properties

### How It Works

1. User selects a blueprint in the picker
2. UpDoc resolves the blueprint's document type alias
3. UpDoc scans `updoc/maps/` for a map file matching that document type (reads `documentTypeAlias` from each file)
4. If no map file exists, UpDoc shows a message explaining that a map file needs to be created
5. The map file tells the backend how to extract content AND the frontend how to map it
6. Map files are cached after first load

### Resilience

- Map files should cause **no failures** if the referenced document type or blueprint is deleted from Umbraco — orphaned map files are simply ignored
- Missing map files do not break the UpDoc entity action — the user sees a helpful message instead of an error

### Phase 1 Status: COMPLETED (Superseded by Phase 2)

Phase 1 (single map file per document type) was implemented on the `feature/map-file-config` branch. It has been superseded by Phase 2.

### Phase 2 Status: COMPLETED

Phase 2 (three-file architecture) is implemented. The folder structure is:

```
updoc/maps/group-tour/
  source-pdf.json           # Extraction rules with named sections and strategies
  destination-blueprint.json # Available target fields in the document type
  map.json                   # Wiring: source sections → destination fields
```

**Note:** File naming was updated in Phase 3 to indicate source type (`source-pdf.json`) and destination type (`destination-blueprint.json`).

**Key changes from the original Phase 2 design:**
- Combined `extract-pdf.json`, `extract-web.json`, etc. into a single `source.json` with a `sourceTypes` array
- Added `destination.json` as a separate file (not in original design) to explicitly document available import targets
- ~~The extraction **algorithm** is still hardcoded, but now uses a compatibility layer that converts `source.json` sections to legacy `PdfExtractionRules`~~ **COMPLETE**: Extraction is now truly strategy-driven

**Completed:**
- ✅ Refactored `PdfPagePropertiesService` to be strategy-driven via `ExtractSectionsFromConfig()`
- ✅ Each section in `source-pdf.json` is extracted according to its `strategy` property
- ✅ Implemented strategies: `largestFont`, `regex`, `betweenPatterns`
- ✅ Sections are returned keyed by their `key` property (title, description, itinerary, features, accommodation)

**Remaining work:**
- Implement additional extraction strategies (`region`, `afterLabel`, etc.)
- Add web and Word document extractors

---

## Phase 3: File Naming & Multi-Source Support

### Status: COMPLETED (File Naming)

File naming convention has been implemented:
- ✅ Renamed `source.json` → `source-pdf.json`
- ✅ Renamed `destination.json` → `destination-blueprint.json`
- ✅ Updated `MapFileService` to look for new file names

Multi-source support (web, Word) is future work.

### File Naming Convention

Config files should be named to indicate their source type or destination type:

```
updoc/maps/group-tour/
  source-pdf.json           # PDF extraction rules
  source-web.json           # Web scraping rules (future)
  source-word.json          # Word document extraction (future)
  destination-blueprint.json # Maps to a blueprint (current)
  destination-doctype.json   # Maps directly to doc type (future)
  map.json                   # Wiring between source sections and destination fields
```

**Rationale:**
- `source.json` doesn't indicate what kind of source (PDF vs Web vs Word)
- Different source types have fundamentally different extraction strategies
- `destination-blueprint.json` vs `destination-doctype.json` supports future flexibility (blueprint-optional)

**Migration:**
- Rename `source.json` → `source-pdf.json`
- Rename `destination.json` → `destination-blueprint.json`
- Update `MapFileService` to look for these new names

### Architectural Concern: Schema Prescriptiveness

**READ THIS DURING PLANNING**

The current JSON Schema files (`source.schema.json`, `destination.schema.json`, `map.schema.json`) contain explicit enums and hardcoded strategy names:

```json
"strategy": {
  "enum": ["largestFont", "regex", "betweenPatterns", "region", "afterLabel", "cssSelector", "xpath"]
}
```

If we add a new strategy, we must update:
- The schema
- The C# models
- The TypeScript types
- The extraction service

This is tight coupling disguised as configuration. The schema may be too prescriptive.

**Validation needed:** Implement additional source types (Word, Markdown, Web) to stress-test the architecture and discover:
- What's truly common across all sources
- What's source-specific
- Where the schema is too rigid
- Where it's too loose

### Next Steps: Validate Architecture with Multiple Source Types

| Source | Complexity | What We Learn |
|--------|------------|---------------|
| Markdown | Trivial | Already structured, validates the "easy path" |
| Word | Easy | Heading-based extraction, similar to PDF |
| Web | Medium | CSS selectors, XPath - completely different paradigm |

Implementing these will reveal whether our separation of concerns actually holds, or whether we've just moved coupling into JSON files.

**Do not finalize the schema structure until at least one additional source type is implemented.**

---

## Architecture Decision: Multi-File Extraction (Phase 2)

> **Supersedes** the single map file approach for extraction rules. The `propertyMappings` concept from Phase 1 carries forward into the new `map.json`.

### Problem

The single map file conflates three concerns:
1. **Source extraction** — how to pull structured sections out of a PDF/web page/Word doc
2. **Destination mapping** — which Umbraco properties/blocks receive the extracted data
3. The extraction algorithm is baked into C# rather than driven by config

Different PDFs have completely different layouts. Some have the title positioned by coordinates, others by font size. Some are single-column, others multi-column. The map file must be able to express *how* to extract, not just tweak parameters of a fixed algorithm.

### Folder-per-Document-Type Structure

**Original design (not implemented):**
```
updoc/maps/group-tour/
  extract-pdf.json       # How to extract named sections from a PDF
  extract-web.json       # How to extract named sections from a web page (future)
  extract-word.json      # How to extract named sections from a Word doc (future)
  map.json               # Routes named sections → Umbraco properties/blocks
```

**Actual implementation:**
```
updoc/maps/group-tour/
  source.json            # Combined extraction rules for all source types
  destination.json       # Available target fields (NEW - not in original design)
  map.json               # Wiring: source sections → destination fields
```

The `source.json` file includes a `sourceTypes` array (e.g., `["pdf"]`) and sections with extraction strategies. This avoids duplicating section definitions across multiple extract files when they would be identical.

Each folder represents one document type. The folder name is the document type alias in kebab-case.

### Separation of Concerns

**Extraction files** (`extract-*.json`) define HOW to get data from a specific source type. Each produces a common vocabulary of **named sections** (e.g., `title`, `description`, `itinerary`, `features`, `accommodation`). The extraction strategy is per-section and fully config-driven.

**Map file** (`map.json`) defines WHERE extracted sections go in Umbraco. It consumes the named sections without knowing or caring whether they came from a PDF, web page, or Word doc. This is the `propertyMappings` concept from Phase 1, but decoupled from extraction.

**Key benefit:** Adding a new source type (web, Word) means adding a new `extract-*.json` file and a new C# extractor — the `map.json` stays the same. Different PDF layouts for the same document type = different `extract-pdf.json`, same `map.json`.

### Config-Driven Extraction Strategies

Instead of a fixed algorithm with tweakable parameters, each section in an extraction file declares its own **strategy**:

| Strategy | What it does | Example use |
|----------|-------------|-------------|
| `largestFont` | Text at/above a font size threshold | Title detection |
| `regex` | Match a pattern against line text | "5 days from £1,199" |
| `region` | Extract from a bounding box (x/y coordinates) | Precisely positioned content |
| `betweenPatterns` | Capture everything between start/stop markers | Itinerary body (Day 1... Day 5) |
| `afterLabel` | Text following a known label | "Departing: 30th Sept" |

Each section rule carries optional **modifiers**:
- `pages` — which page(s) to search (default: all)
- `columnFilter` — whether to apply column detection (default: false)
- `region` — optional bounding box constraint `{ x: [min, max], y: [min, max] }`
- `joinLines` — how to combine multi-line matches (`space`, `newline`, `markdown`)
- `outputFormat` — `text`, `markdown`, `html`

### Example: extract-pdf.json

```json
{
  "$schema": "../../schemas/extract-pdf.schema.json",
  "sections": [
    {
      "name": "title",
      "strategy": "largestFont",
      "pages": [1],
      "fontSizeThreshold": 0.85,
      "columnFilter": false,
      "joinLines": "space"
    },
    {
      "name": "description",
      "strategy": "regex",
      "pages": [1],
      "pattern": "\\d+\\s*days?\\s+from\\s+£[\\d,]+.*",
      "columnFilter": false
    },
    {
      "name": "itinerary",
      "strategy": "betweenPatterns",
      "pages": "all",
      "startPattern": "^Day\\s+\\d+",
      "stopPatterns": ["terms", "conditions", "booking", "contact us"],
      "columnFilter": true,
      "headingLevel": "h2",
      "outputFormat": "markdown"
    }
  ]
}
```

### Example: map.json

```json
{
  "$schema": "../../schemas/map.schema.json",
  "documentTypeAlias": "groupTour",
  "blueprintId": "b33c0169-ddd7-40c9-b75f-0fa116455ea9",
  "mappings": [
    {
      "section": "title",
      "targets": [
        { "property": "pageTitle" },
        { "property": "pageTitleShort" }
      ]
    },
    {
      "section": "description",
      "targets": [
        { "property": "pageDescription" }
      ]
    },
    {
      "section": "itinerary",
      "targets": [
        {
          "blockGrid": "contentGrid",
          "blockSearch": { "property": "sectionTitle", "value": "Suggested Itinerary" },
          "targetProperty": "content",
          "convertMarkdown": true
        }
      ]
    }
  ]
}
```

### What Stays in C#

The C# service becomes a **generic rule executor**:
- PdfPig infrastructure: word extraction, line grouping, font size calculation, column detection
- A strategy dispatcher: given a section rule, execute the named strategy and return text
- No hardcoded assumptions about what "title" or "description" means

### Open Questions

- How does the API discover which folder to use? Scan all `map.json` files for matching `blueprintId`?
- Should extraction files reference a shared "column detection" config or is it per-section?
- Sections that appear multiple times in the PDF (e.g., title on both pages) — support `occurrence: "first"` / `"last"` / `"all"`?
- Should `map.json` hold `documentTypeAlias` and `blueprintId`, or should there be a top-level `config.json` in the folder?

---

## Executive Summary (Original — Partially Superseded)

**Current State:** Working POC with hardcoded client-specific extraction rules for PDF only
**Target State:** Configurable multi-source package ("Create Document from Source") supporting PDF, Web, and Word extraction
**Approach:** Single entity action → source type picker → source-specific extraction → shared document creation
**Blueprint-based:** The package requires blueprints - users design their document type, create a blueprint, and the package scaffolds from it
**Configuration:** Initially via `config.json` files, later replaced by a visual dashboard
**Benefit to Client:** They get ongoing improvements from the generic package while keeping their custom configuration
**Effort:** Approximately 80% of code is already generic - only Stage 4 (classification rules) needs refactoring

---

## Current Architecture

### Data Flow Pipeline

```
Stage 1-3: Generic PDF Processing
├─ PdfPig extracts raw words (text + position + font size)
├─ Column detection filters sidebar content
└─ Line grouping creates TextLine[] with font metadata

Stage 4: Client-Specific Classification ⚠️ HARDCODED
├─ Title detection: fontSize >= 85% of max
├─ Description: regex "X days from £XXX"
├─ Content start: "Day \d+" pattern
└─ Content stop: ["nb:", "terms", "conditions"]

Stage 5-7: Generic Output Processing
├─ Markdown string assembly
├─ HTTP API response
├─ Frontend: Markdown → HTML conversion
└─ Block grid insertion
```

### Current Hardcoded Values

**In `PdfPagePropertiesService.cs` (Lines ~150-260):**

```csharp
// Title detection
var h1Threshold = maxFontSize * 0.85;  // ← CONFIG NEEDED

// Description pattern
var descriptionPattern = @"\d+\s*days?\s*from\s*£\d+";  // ← CONFIG NEEDED

// Content boundaries
var dayPattern = @"Day\s+\d+";  // ← CONFIG NEEDED
var stopPatterns = new[] { "terms", "conditions", "please note", "nb:" };  // ← CONFIG NEEDED

// Column detection
var columnThreshold = pageWidth * 0.35;  // ← CONFIG NEEDED
```

**In `create-from-pdf-action.ts` (Lines ~200-250):**

```typescript
// Property mappings
const properties = {
  title: 'pageTitle',           // ← CONFIG NEEDED
  titleShort: 'pageTitleShort', // ← CONFIG NEEDED
  description: 'pageDescription' // ← CONFIG NEEDED
};

// Block grid search
const blockSearchProperty = 'featurePropertyFeatureTitle';  // ← CONFIG NEEDED
const blockSearchValue = 'Suggested Itinerary';             // ← CONFIG NEEDED
const targetProperty = 'richTextContent';                   // ← CONFIG NEEDED
```

---

## Target Architecture

### User Flow: Single Entry Point

The package registers one entity action: **"Create Document from Source"**. This replaces the current "Create Document from PDF" action.

```
Context menu: "Create Document from Source"
        ↓
Step 1: Choose Document Source Type
        ┌──────────────────┐
        │  📄 PDF           │
        │  🌐 Web Page      │  (future)
        │  📝 Word Document │  (future)
        └──────────────────┘
        ↓
Step 2: Source-specific workflow
        (media picker for PDF/Word, URL input for Web)
        ↓
Step 3: Preview extracted sections
        ↓
Step 4: Create document from blueprint
```

This scales cleanly - adding a new source type means registering it with the package, not creating a new entity action. The context menu stays clean with a single entry point.

### Separation of Concerns

Each Document Source Type has its own extraction service, but all share the same document creation pipeline:

```
Backend Services:
├── IExtractionService.cs              (common interface)
│   ├── PdfExtractionService.cs        (PDF-specific: PdfPig, column detection)
│   ├── WebExtractionService.cs        (Web-specific: HTML parsing)  [future]
│   └── WordExtractionService.cs       (Word-specific: Open XML)     [future]
│
├── IDocumentCreationService.cs        (shared pipeline)
│   └── Takes extracted sections → scaffolds from blueprint → creates document
│
└── IConfigurationService.cs           (reads config / dashboard settings)
    └── Provides extraction rules + property mappings per source type
```

Common interface:

```csharp
public interface IExtractionService
{
    string SourceType { get; }  // "pdf", "web", "word"
    ExtractionResult Extract(SourceReference source);
}
```

The entity action resolves the correct service based on what the user picked:
- User picks "PDF" → resolve `IExtractionService` where `SourceType == "pdf"`
- User picks "Web" → resolve `IExtractionService` where `SourceType == "web"`

The document creation service doesn't care where the sections came from.

### Config-Driven Extraction

```
Config File (config.json) — temporary, replaced by dashboard later
    ↓
┌──────────────────────────────────────┐
│  Stage 1-3: Generic Processing       │  ← No changes needed
│  (per source type extraction)        │
└──────────────────────────────────────┘
    ↓ TextLine[] / parsed content
┌──────────────────────────────────────┐
│  Stage 4: Configurable Classification│  ← REFACTOR THIS
│  Reads rules from config/dashboard   │
└──────────────────────────────────────┘
    ↓ Identified sections JSON
┌──────────────────────────────────────┐
│  Stage 5-7: Generic Output           │  ← No changes needed
│  (Markdown → HTML → Block Grid)      │
└──────────────────────────────────────┘
```

### Config Schema (Temporary — replaced by dashboard in later phase)

Config files are the interim mechanism for customisation. They will be replaced by a visual dashboard that stores mappings in the Umbraco database. The `IConfigurationService` interface abstracts this — the extraction services don't care whether config comes from a JSON file or a database.

> **SUPERSEDED:** The original design used a single `config.json` containing all blueprints and a shared extraction config. This has been replaced by **Map Files** — one per document type, stored in `updoc/maps/` at the site root. See "Architecture Decision: Map Files" above for the full design.

### Extracted Data Format (Intermediate JSON)

**What `ExtractAsMarkdown()` should return after refactoring:**

```json
{
  "source": {
    "type": "pdf",
    "mediaKey": "guid-here",
    "extractedDate": "2026-01-30T12:00:00Z"
  },
  "sections": [
    {
      "type": "title",
      "content": "The Castles & Gardens of Kent",
      "metadata": {
        "fontSize": 24.5,
        "confidence": "high",
        "position": "top"
      }
    },
    {
      "type": "description",
      "content": "5 days from £889 Departing 15th October 2026",
      "metadata": {
        "pattern": "price-days",
        "confidence": "high"
      }
    },
    {
      "type": "content",
      "markdown": "## Day 1\n\nWe board our private...\n\n## Day 2\n\nWith our Blue Badge...",
      "metadata": {
        "dayCount": 5,
        "startPattern": "Day 1",
        "stopPattern": "nb:",
        "confidence": "high"
      }
    }
  ],
  "rawText": "[24.5] The Castles & Gardens of Kent\n[12.0] 5 days from £889..."
}
```

---

## Implementation Plan

### Phase 1: Backend Refactoring (C#)

#### Task 1.1: Create Configuration Models

**File:** `/Models/ExtractionConfig.cs` (NEW)

```csharp
namespace CreateFromPdf.Models
{
    public class ExtractionConfig
    {
        public string Version { get; set; } = "1.0";
        public ExtractionRules Extraction { get; set; } = new();
        public List<MappingConfig> Mappings { get; set; } = new();
    }

    public class ExtractionRules
    {
        public PdfExtractionRules Pdf { get; set; } = new();
        // Future: WebExtractionRules Web { get; set; }
        // Future: DocumentExtractionRules Document { get; set; }
    }

    public class PdfExtractionRules
    {
        public ColumnDetectionConfig ColumnDetection { get; set; } = new();
        public TitleDetectionConfig TitleDetection { get; set; } = new();
        public string DescriptionPattern { get; set; } = @"\d+\s*days?\s*from\s*£\d+";
        public ContentExtractionConfig Content { get; set; } = new();
    }

    public class ColumnDetectionConfig
    {
        public bool Enabled { get; set; } = true;
        public double ThresholdPercent { get; set; } = 0.35;
    }

    public class TitleDetectionConfig
    {
        public double FontSizeThreshold { get; set; } = 0.85;
    }

    public class ContentExtractionConfig
    {
        public string StartPattern { get; set; } = @"Day\s+\d+";
        public List<string> StopPatterns { get; set; } = new() { "terms", "conditions", "please note", "nb:" };
        public string HeadingLevel { get; set; } = "h2";
    }

    public class MappingConfig
    {
        public Guid BlueprintId { get; set; }
        public string Comment { get; set; } = "";
        public List<PropertyMapping> PropertyMappings { get; set; } = new();
    }

    public class PropertyMapping
    {
        public MappingSource From { get; set; } = new();
        public MappingTarget To { get; set; } = new();
    }

    public class MappingSource
    {
        public string SectionType { get; set; } = "";
    }

    public class MappingTarget
    {
        public string? Property { get; set; }
        public List<string>? AlsoMapTo { get; set; }
        public string? BlockGrid { get; set; }
        public BlockSearchConfig? BlockSearch { get; set; }
        public string? TargetProperty { get; set; }
        public bool ConvertMarkdown { get; set; } = false;
    }

    public class BlockSearchConfig
    {
        public string Property { get; set; } = "";
        public string Value { get; set; } = "";
    }
}
```

#### Task 1.2: Create Configuration Service

**File:** `/Services/IConfigurationService.cs` (NEW)

```csharp
using CreateFromPdf.Models;

namespace CreateFromPdf.Services
{
    public interface IConfigurationService
    {
        ExtractionConfig GetConfig();
        PdfExtractionRules GetPdfRules();
        MappingConfig? GetMappingForBlueprint(Guid blueprintId);
    }
}
```

**File:** `/Services/ConfigurationService.cs` (NEW)

```csharp
using CreateFromPdf.Models;
using Microsoft.Extensions.Hosting;
using System.Text.Json;

namespace CreateFromPdf.Services
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly IHostEnvironment _hostEnvironment;
        private ExtractionConfig? _cachedConfig;
        private readonly object _lock = new();

        public ConfigurationService(IHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        public ExtractionConfig GetConfig()
        {
            if (_cachedConfig != null) return _cachedConfig;

            lock (_lock)
            {
                if (_cachedConfig != null) return _cachedConfig;

                var configPath = Path.Combine(
                    _hostEnvironment.ContentRootPath,
                    "App_Plugins",
                    "CreateFromPdf",
                    "config.json"
                );

                if (!File.Exists(configPath))
                {
                    throw new FileNotFoundException($"Configuration file not found: {configPath}");
                }

                var json = File.ReadAllText(configPath);
                _cachedConfig = JsonSerializer.Deserialize<ExtractionConfig>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    ReadCommentHandling = JsonCommentHandling.Skip
                });

                return _cachedConfig ?? throw new InvalidOperationException("Failed to deserialize config");
            }
        }

        public PdfExtractionRules GetPdfRules()
        {
            return GetConfig().Extraction.Pdf;
        }

        public MappingConfig? GetMappingForBlueprint(Guid blueprintId)
        {
            return GetConfig().Mappings.FirstOrDefault(m => m.BlueprintId == blueprintId);
        }
    }
}
```

#### Task 1.3: Register Configuration Service

**File:** `/Startup.cs` or `/Composers/CreateFromPdfComposer.cs` (MODIFY)

```csharp
using CreateFromPdf.Services;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace CreateFromPdf.Composers
{
    public class CreateFromPdfComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            // Register existing services
            builder.Services.AddScoped<IPdfExtractionService, PdfExtractionService>();
            
            // ADD THIS:
            builder.Services.AddSingleton<IConfigurationService, ConfigurationService>();
        }
    }
}
```

#### Task 1.4: Refactor PdfPagePropertiesService

**File:** `/Services/PdfPagePropertiesService.cs` (MODIFY)

**Changes needed:**

1. Inject `IConfigurationService` via constructor
2. Replace all hardcoded values with config lookups
3. Return structured sections instead of just markdown

**Before (Lines ~150-180):**
```csharp
public class PdfPagePropertiesService
{
    private readonly IMediaService _mediaService;
    
    public PdfPagePropertiesService(IMediaService mediaService)
    {
        _mediaService = mediaService;
    }
    
    public async Task<PdfExtractionResult> ExtractAsMarkdown(Guid mediaKey)
    {
        // ... get PDF bytes ...
        
        var h1Threshold = maxFontSize * 0.85;  // HARDCODED
        var descriptionPattern = @"\d+\s*days?\s*from\s*£\d+";  // HARDCODED
        
        // ... extraction logic ...
    }
}
```

**After:**
```csharp
public class PdfPagePropertiesService
{
    private readonly IMediaService _mediaService;
    private readonly IConfigurationService _configService;
    
    public PdfPagePropertiesService(
        IMediaService mediaService,
        IConfigurationService configService)
    {
        _mediaService = mediaService;
        _configService = configService;
    }
    
    public async Task<ExtractionResult> ExtractSections(Guid mediaKey)
    {
        var config = _configService.GetPdfRules();
        
        // ... get PDF bytes ...
        
        var h1Threshold = maxFontSize * config.TitleDetection.FontSizeThreshold;
        var descriptionPattern = config.DescriptionPattern;
        var dayPattern = config.Content.StartPattern;
        var stopPatterns = config.Content.StopPatterns;
        
        // Build sections array instead of just markdown
        var sections = new List<ExtractedSection>();
        
        // Title detection
        if (/* title found */)
        {
            sections.Add(new ExtractedSection
            {
                Type = "title",
                Content = titleText,
                Metadata = new Dictionary<string, object>
                {
                    ["fontSize"] = titleFontSize,
                    ["confidence"] = "high",
                    ["position"] = "top"
                }
            });
        }
        
        // Description detection
        if (Regex.IsMatch(line, descriptionPattern))
        {
            sections.Add(new ExtractedSection
            {
                Type = "description",
                Content = line,
                Metadata = new Dictionary<string, object>
                {
                    ["pattern"] = "price-days",
                    ["confidence"] = "high"
                }
            });
        }
        
        // Content extraction
        sections.Add(new ExtractedSection
        {
            Type = "content",
            Markdown = markdownBuilder.ToString(),
            Metadata = new Dictionary<string, object>
            {
                ["dayCount"] = dayCount,
                ["startPattern"] = config.Content.StartPattern,
                ["stopPattern"] = stopPatternUsed,
                ["confidence"] = "high"
            }
        });
        
        return new ExtractionResult
        {
            Source = new SourceInfo
            {
                Type = "pdf",
                MediaKey = mediaKey,
                ExtractedDate = DateTime.UtcNow
            },
            Sections = sections,
            RawText = rawTextBuilder.ToString()
        };
    }
}
```

#### Task 1.5: Update Return Models

**File:** `/Models/PdfExtractionResult.cs` (MODIFY/REPLACE)

```csharp
namespace CreateFromPdf.Models
{
    // OLD MODEL - Keep for backward compatibility if needed
    public class PdfExtractionResult
    {
        public bool Success { get; set; }
        public string? Title { get; set; }
        public string? Subtitle { get; set; }
        public string? Markdown { get; set; }
        public string? RawText { get; set; }
        public string? Error { get; set; }
    }
    
    // NEW MODEL - Structured extraction
    public class ExtractionResult
    {
        public SourceInfo Source { get; set; } = new();
        public List<ExtractedSection> Sections { get; set; } = new();
        public string RawText { get; set; } = "";
    }
    
    public class SourceInfo
    {
        public string Type { get; set; } = "pdf";  // pdf, web, document
        public Guid MediaKey { get; set; }
        public DateTime ExtractedDate { get; set; }
    }
    
    public class ExtractedSection
    {
        public string Type { get; set; } = "";  // title, description, content, etc.
        public string Content { get; set; } = "";  // For simple text sections
        public string? Markdown { get; set; }  // For content sections
        public Dictionary<string, object> Metadata { get; set; } = new();
    }
}
```

#### Task 1.6: Update Controller

**File:** `/Controllers/PdfExtractionController.cs` (MODIFY)

**Before:**
```csharp
[HttpGet("extract-markdown")]
public async Task<IActionResult> ExtractMarkdown([FromQuery] Guid pdfMediaKey)
{
    var result = await _pdfService.ExtractAsMarkdown(pdfMediaKey);
    return Ok(result);  // Returns { title, subtitle, markdown, rawText }
}
```

**After:**
```csharp
[HttpGet("extract-sections")]
public async Task<IActionResult> ExtractSections([FromQuery] Guid pdfMediaKey)
{
    var result = await _pdfService.ExtractSections(pdfMediaKey);
    return Ok(result);  // Returns structured sections
}

// Keep old endpoint for backward compatibility during transition
[HttpGet("extract-markdown")]
[Obsolete("Use extract-sections instead")]
public async Task<IActionResult> ExtractMarkdown([FromQuery] Guid pdfMediaKey)
{
    var result = await _pdfService.ExtractSections(pdfMediaKey);
    
    // Convert to old format
    var legacyResult = new PdfExtractionResult
    {
        Success = true,
        Title = result.Sections.FirstOrDefault(s => s.Type == "title")?.Content,
        Subtitle = result.Sections.FirstOrDefault(s => s.Type == "description")?.Content,
        Markdown = result.Sections.FirstOrDefault(s => s.Type == "content")?.Markdown,
        RawText = result.RawText
    };
    
    return Ok(legacyResult);
}
```

### Phase 2: Frontend Refactoring (TypeScript)

#### Task 2.1: Create Config Types

**File:** `/App_Plugins/CreateFromPdf/src/config.types.ts` (NEW)

```typescript
export interface ExtractionConfig {
  version: string;
  extraction: ExtractionRules;
  mappings: MappingConfig[];
}

export interface ExtractionRules {
  pdf: PdfExtractionRules;
}

export interface PdfExtractionRules {
  columnDetection: ColumnDetectionConfig;
  titleDetection: TitleDetectionConfig;
  descriptionPattern: string;
  content: ContentExtractionConfig;
}

export interface ColumnDetectionConfig {
  enabled: boolean;
  thresholdPercent: number;
}

export interface TitleDetectionConfig {
  fontSizeThreshold: number;
}

export interface ContentExtractionConfig {
  startPattern: string;
  stopPatterns: string[];
  headingLevel: string;
}

export interface MappingConfig {
  blueprintId: string;
  comment?: string;
  propertyMappings: PropertyMapping[];
}

export interface PropertyMapping {
  from: MappingSource;
  to: MappingTarget;
}

export interface MappingSource {
  sectionType: string;
}

export interface MappingTarget {
  property?: string;
  alsoMapTo?: string[];
  blockGrid?: string;
  blockSearch?: BlockSearchConfig;
  targetProperty?: string;
  convertMarkdown?: boolean;
}

export interface BlockSearchConfig {
  property: string;
  value: string;
}
```

#### Task 2.2: Create Config Service

**File:** `/App_Plugins/CreateFromPdf/src/config.service.ts` (NEW)

```typescript
import type { ExtractionConfig, MappingConfig } from '../types/config.js';

class ConfigService {
  private config: ExtractionConfig | null = null;

  async loadConfig(): Promise<ExtractionConfig> {
    if (this.config) return this.config;

    const response = await fetch('/App_Plugins/CreateFromPdf/config.json');
    if (!response.ok) {
      throw new Error('Failed to load configuration');
    }

    this.config = await response.json();
    return this.config;
  }

  async getMappingForBlueprint(blueprintId: string): Promise<MappingConfig | undefined> {
    const config = await this.loadConfig();
    return config.mappings.find(m => m.blueprintId === blueprintId);
  }
}

export const configService = new ConfigService();
```

#### Task 2.3: Update Extraction Response Types

**File:** `/App_Plugins/CreateFromPdf/src/extraction.types.ts` (MODIFY)

```typescript
// Add new structured types
export interface ExtractionResult {
  source: SourceInfo;
  sections: ExtractedSection[];
  rawText: string;
}

export interface SourceInfo {
  type: string;
  mediaKey: string;
  extractedDate: string;
}

export interface ExtractedSection {
  type: string;
  content?: string;
  markdown?: string;
  metadata: Record<string, any>;
}

// Keep old types for backward compatibility
export interface PdfExtractionResult {
  success: boolean;
  title?: string;
  subtitle?: string;
  markdown?: string;
  rawText?: string;
  error?: string;
}
```

#### Task 2.4: Refactor Action to Use Config

**File:** `/App_Plugins/CreateFromPdf/src/create-from-pdf-action.ts` (MODIFY)

**Key changes:**

1. Load config at action start
2. Use config to find blueprint
3. Use config mappings instead of hardcoded property names
4. Use config for block grid search

**Before (pseudo-code of current approach):**
```typescript
async execute() {
  // Hardcoded property mapping
  const titleProp = 'pageTitle';
  const descProp = 'pageDescription';
  
  // Hardcoded block search
  const blockSearchProp = 'featurePropertyFeatureTitle';
  const blockSearchValue = 'Suggested Itinerary';
  
  // ... rest of logic
}
```

**After:**
```typescript
import { configService } from '../services/config.service.js';

async execute() {
  // Load config
  const config = await configService.loadConfig();
  
  // Get blueprint ID from first mapping (for now - could be smarter)
  const blueprintId = config.mappings[0]?.blueprintId;
  if (!blueprintId) {
    throw new Error('No blueprint configured');
  }
  
  // Get mapping for this blueprint
  const mapping = await configService.getMappingForBlueprint(blueprintId);
  if (!mapping) {
    throw new Error('No mapping found for blueprint');
  }
  
  // Fetch extraction (new endpoint)
  const extractResponse = await fetch(
    `/umbraco/api/pdfextraction/extract-sections?pdfMediaKey=${this._selectedPdfKey}`
  );
  const extraction: ExtractionResult = await extractResponse.json();
  
  // Scaffold from blueprint
  const scaffoldResponse = await fetch(
    `/umbraco/backoffice/api/document-blueprint/${blueprintId}/scaffold`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  const scaffold = await scaffoldResponse.json();
  
  // Apply mappings from config
  for (const propMapping of mapping.propertyMappings) {
    const section = extraction.sections.find(s => s.type === propMapping.from.sectionType);
    if (!section) continue;
    
    // Simple property mapping
    if (propMapping.to.property) {
      this.#setPropertyValue(
        scaffold,
        propMapping.to.property,
        section.content || section.markdown
      );
      
      // Also map to additional properties
      if (propMapping.to.alsoMapTo) {
        for (const alsoProp of propMapping.to.alsoMapTo) {
          this.#setPropertyValue(scaffold, alsoProp, section.content || section.markdown);
        }
      }
    }
    
    // Block grid mapping
    if (propMapping.to.blockGrid && propMapping.to.blockSearch) {
      await this.#updateBlockGrid(
        scaffold,
        propMapping.to.blockGrid,
        propMapping.to.blockSearch,
        propMapping.to.targetProperty!,
        section.markdown || section.content,
        propMapping.to.convertMarkdown ?? false
      );
    }
  }
  
  // Create document
  // ... rest of logic
}

#setPropertyValue(scaffold: any, propertyAlias: string, value: string) {
  const prop = scaffold.values.find((v: any) => v.alias === propertyAlias);
  if (prop) {
    prop.value = value;
  }
}

async #updateBlockGrid(
  scaffold: any,
  gridAlias: string,
  blockSearch: BlockSearchConfig,
  targetProperty: string,
  content: string,
  convertMarkdown: boolean
) {
  const gridProp = scaffold.values.find((v: any) => v.alias === gridAlias);
  if (!gridProp) return;
  
  const gridValue = typeof gridProp.value === 'string' 
    ? JSON.parse(gridProp.value) 
    : gridProp.value;
  
  // Find block matching search criteria
  const block = gridValue.contentData.find((b: any) => {
    const searchValue = b.values?.find((v: any) => v.alias === blockSearch.property);
    return searchValue?.value?.includes(blockSearch.value);
  });
  
  if (!block) {
    console.warn(`Block not found with ${blockSearch.property} = ${blockSearch.value}`);
    return;
  }
  
  // Convert markdown to HTML if needed
  const finalContent = convertMarkdown 
    ? await this.#convertToHtml(content)
    : content;
  
  // Update target property
  const targetProp = block.values.find((v: any) => v.alias === targetProperty);
  if (targetProp) {
    targetProp.value = {
      blocks: { contentData: [], settingsData: [], expose: [], Layout: {} },
      markup: finalContent
    };
  }
  
  gridProp.value = gridValue;
}
```

### Phase 3: Create Client Configuration

#### Task 3.1: Create config.json

**File:** `/App_Plugins/CreateFromPdf/config.json` (NEW)

```json
{
  "$schema": "./config.schema.json",
  "version": "1.0",
  
  "extraction": {
    "pdf": {
      "columnDetection": {
        "enabled": true,
        "thresholdPercent": 0.35
      },
      "titleDetection": {
        "fontSizeThreshold": 0.85
      },
      "descriptionPattern": "\\d+\\s*days?\\s*from\\s*£\\d+",
      "content": {
        "startPattern": "Day\\s+\\d+",
        "stopPatterns": ["terms", "conditions", "please note", "nb:"],
        "headingLevel": "h2"
      }
    }
  },
  
  "mappings": [
    {
      "blueprintId": "b33c0169-ddd7-40c9-b75f-0fa116455ea9",
      "comment": "Example Group Tour blueprint - Tailored Travels specific",
      "propertyMappings": [
        {
          "from": { "sectionType": "title" },
          "to": { 
            "property": "pageTitle",
            "alsoMapTo": ["pageTitleShort"]
          }
        },
        {
          "from": { "sectionType": "description" },
          "to": { "property": "pageDescription" }
        },
        {
          "from": { "sectionType": "content" },
          "to": { 
            "blockGrid": "contentGrid",
            "blockSearch": {
              "property": "featurePropertyFeatureTitle",
              "value": "Suggested Itinerary"
            },
            "targetProperty": "richTextContent",
            "convertMarkdown": true
          }
        }
      ]
    }
  ]
}
```

#### Task 3.2: Create JSON Schema (Optional but Helpful)

**File:** `/App_Plugins/CreateFromPdf/config.schema.json` (NEW)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Create Document from PDF Configuration",
  "type": "object",
  "required": ["version", "extraction", "mappings"],
  "properties": {
    "version": {
      "type": "string",
      "description": "Configuration schema version"
    },
    "extraction": {
      "type": "object",
      "properties": {
        "pdf": {
          "type": "object",
          "properties": {
            "columnDetection": {
              "type": "object",
              "properties": {
                "enabled": { "type": "boolean" },
                "thresholdPercent": { "type": "number", "minimum": 0, "maximum": 1 }
              }
            },
            "titleDetection": {
              "type": "object",
              "properties": {
                "fontSizeThreshold": { "type": "number", "minimum": 0, "maximum": 1 }
              }
            },
            "descriptionPattern": { "type": "string" },
            "content": {
              "type": "object",
              "properties": {
                "startPattern": { "type": "string" },
                "stopPatterns": { "type": "array", "items": { "type": "string" } },
                "headingLevel": { "type": "string", "enum": ["h1", "h2", "h3", "h4", "h5", "h6"] }
              }
            }
          }
        }
      }
    },
    "mappings": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["blueprintId", "propertyMappings"],
        "properties": {
          "blueprintId": { "type": "string", "format": "uuid" },
          "comment": { "type": "string" },
          "propertyMappings": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["from", "to"],
              "properties": {
                "from": {
                  "type": "object",
                  "required": ["sectionType"],
                  "properties": {
                    "sectionType": { "type": "string" }
                  }
                },
                "to": {
                  "type": "object",
                  "properties": {
                    "property": { "type": "string" },
                    "alsoMapTo": { "type": "array", "items": { "type": "string" } },
                    "blockGrid": { "type": "string" },
                    "blockSearch": {
                      "type": "object",
                      "required": ["property", "value"],
                      "properties": {
                        "property": { "type": "string" },
                        "value": { "type": "string" }
                      }
                    },
                    "targetProperty": { "type": "string" },
                    "convertMarkdown": { "type": "boolean" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Phase 4: Testing & Validation

#### Task 4.1: Test Checklist

**Backend Tests:**
- [ ] Config file loads correctly
- [ ] PDF extraction uses config values (not hardcoded)
- [ ] Title detection threshold works (try 0.80, 0.85, 0.90)
- [ ] Description pattern matches (test with different formats)
- [ ] Content start/stop patterns work correctly
- [ ] Column detection can be disabled
- [ ] Structured sections JSON returned correctly
- [ ] Old `/extract-markdown` endpoint still works (backward compatibility)

**Frontend Tests:**
- [ ] Config loads from JSON file
- [ ] Blueprint ID resolved from config
- [ ] Property mappings applied correctly
- [ ] `alsoMapTo` populates multiple properties
- [ ] Block grid search finds correct block
- [ ] Markdown → HTML conversion works
- [ ] Document created with correct values

**Integration Tests:**
- [ ] Full workflow: Upload PDF → Extract → Create Document
- [ ] Verify page title, description, content grid populated
- [ ] Test with different PDFs (different layouts, font sizes)
- [ ] Verify extracted sections match config rules

**Edge Cases:**
- [ ] PDF with no matching title (font size too small)
- [ ] PDF with no description pattern match
- [ ] PDF with no "Day N" pattern
- [ ] Empty or malformed config.json
- [ ] Invalid blueprint ID in config
- [ ] Block grid search property not found

#### Task 4.2: Validation Script

**File:** `/Scripts/validate-extraction.ps1` (NEW - Optional)

```powershell
# PowerShell script to test extraction with different configs

param(
    [string]$PdfPath = "D:\TestPdfs\sample-tour.pdf",
    [string]$MediaKey = "guid-here"
)

Write-Host "Testing PDF Extraction Configuration" -ForegroundColor Cyan

# Test 1: Load config
Write-Host "`n[Test 1] Loading config.json..." -ForegroundColor Yellow
$config = Get-Content "App_Plugins/CreateFromPdf/config.json" | ConvertFrom-Json
Write-Host "✓ Config loaded. Version: $($config.version)" -ForegroundColor Green

# Test 2: Validate schema
Write-Host "`n[Test 2] Validating config schema..." -ForegroundColor Yellow
if ($config.extraction.pdf.titleDetection.fontSizeThreshold -lt 0 -or $config.extraction.pdf.titleDetection.fontSizeThreshold -gt 1) {
    Write-Host "✗ titleDetection.fontSizeThreshold must be between 0 and 1" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Schema valid" -ForegroundColor Green

# Test 3: API endpoint
Write-Host "`n[Test 3] Testing extraction API..." -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "https://localhost:44331/umbraco/api/pdfextraction/extract-sections?pdfMediaKey=$MediaKey"
Write-Host "✓ API returned $($response.sections.Count) sections" -ForegroundColor Green

# Test 4: Verify sections
Write-Host "`n[Test 4] Verifying extracted sections..." -ForegroundColor Yellow
foreach ($section in $response.sections) {
    Write-Host "  - $($section.type): $($section.content ?? $section.markdown.Substring(0, [Math]::Min(50, $section.markdown.Length)))..." -ForegroundColor Gray
}
Write-Host "✓ Sections extracted" -ForegroundColor Green

Write-Host "`n✓ All tests passed!" -ForegroundColor Green
```

### Phase 5: Documentation

#### Task 5.1: Update README

**File:** `/App_Plugins/CreateFromPdf/README.md` (UPDATE)

Add sections:
- Configuration overview
- config.json structure
- How to customize for your site
- Troubleshooting guide

#### Task 5.2: Create Migration Guide

**File:** `/Docs/MIGRATION_FROM_HARDCODED.md` (NEW)

Document how existing POC users can migrate to config-based version.

---

## Implementation Sequence

**Phase 0: Single Entry Point UI** ← Do this first
- Rename entity action to "Create Document from Source"
- Add source type picker step (PDF enabled, Web/Word as disabled placeholders)
- Existing PDF workflow continues after selection
- This establishes the multi-source architecture before refactoring internals

**Phase 1: Backend — Config Models & Service**
- Tasks 1.1-1.3: Create config models, configuration service, register in composer
- Task 1.4: Refactor PdfPagePropertiesService to read config instead of hardcoded values
- Tasks 1.5-1.6: Update return models and controller

**Phase 2: Frontend — Config-Driven Mappings**
- Tasks 2.1-2.2: Config types and service (TypeScript)
- Tasks 2.3-2.4: Refactor action to use config for property mappings and block grid search
- Task 3.1: Create client config.json with current client's values

**Phase 3: Testing & Documentation**
- Task 4.1: Run through testing checklist
- Task 5.1-5.2: Update documentation

**Phase 4: Dashboard** (future, separate planning document)
- Replace config.json with database-backed settings
- Visual mapping UI

---

## Success Criteria

✅ **Functional Requirements:**
- [ ] Client project works with config.json (no hardcoded values)
- [ ] Same functionality as POC (create pages from PDFs)
- [ ] Config can be edited without touching code
- [ ] Multiple blueprints can be configured

✅ **Code Quality:**
- [ ] No hardcoded extraction rules in services
- [ ] Clean separation: extraction logic vs configuration
- [ ] Backward compatibility maintained during transition
- [ ] Comprehensive error handling for invalid configs

✅ **Documentation:**
- [ ] config.json structure documented
- [ ] JSON schema provided for IDE assistance
- [ ] Migration guide from hardcoded version
- [ ] Troubleshooting guide

✅ **Future-Proofing:**
- [ ] Architecture supports web/Word extraction (placeholders ready)
- [ ] UI mapping dashboard can be built on this foundation
- [ ] Community can customize without forking code

---

## Risk Mitigation

**Risk 1:** Config changes break existing functionality
- **Mitigation:** Keep old `/extract-markdown` endpoint during transition
- **Mitigation:** Comprehensive testing before deployment

**Risk 2:** Complex config JSON is error-prone
- **Mitigation:** Provide JSON schema for validation
- **Mitigation:** Config service validates on load with helpful errors
- **Mitigation:** Default config ships with package

**Risk 3:** Performance impact from config loading
- **Mitigation:** Config cached after first load (singleton service)
- **Mitigation:** Config loaded once at app startup, not per request

**Risk 4:** Client's custom config lost on package updates
- **Mitigation:** Document config.json as "user file" (exclude from package)
- **Mitigation:** Provide sample-config.json in package
- **Mitigation:** Add config validation on app startup

---

## Roadmap: Configuration Dashboard (Replaces config.json)

The config.json files are a temporary stepping stone. The end goal is a **backoffice dashboard** where users visually configure extraction and mapping rules. The dashboard stores settings in the Umbraco database.

**Why dashboard replaces config files:**
- No risk of config files being overwritten on package update
- Non-technical users can configure mappings without editing JSON
- Live preview: upload a test document, see extracted sections, map them visually
- The `IConfigurationService` interface stays the same — only the implementation changes from "read JSON" to "read database"

**Dashboard features:**
1. **Source Type Management** — enable/disable source types, configure extraction rules per type
2. **Blueprint Mapping** — select a blueprint, see its properties, drag extracted sections onto them
3. **Test & Preview** — upload a sample PDF/URL/Word file, see what gets extracted, verify mappings
4. **Export/Import** — export config as JSON for version control or sharing between environments

**Separate planning document:** The dashboard design will be documented in `planning/CONFIGURATION_DASHBOARD.md` when ready.

---

## TODO — Open Items

Items that need to be addressed during or after implementation:

- [ ] **Consider map file deletion workflow.** When a document type or blueprint is deleted from Umbraco, orphaned map files remain in `updoc/maps/`. Currently these are silently ignored (no failure), but over time they accumulate. Need to decide: should UpDoc detect orphaned map files and prompt the user to clean them up? Should there be a dashboard action to list/delete orphaned maps? Should deletion of a document type or blueprint trigger a notification that the associated map file can be removed? This also applies in reverse — if a map file is deleted but the document type/blueprint still exists, UpDoc should gracefully handle that (it already does: shows "no map file found" message). The key concern is lifecycle management: map files and Umbraco content types have independent lifecycles, and we need a strategy for keeping them in sync without creating hard dependencies.

- [ ] **Decide on map file path configurability.** Default is `updoc/maps/` at site root. Should this be configurable via `appsettings.json`? Likely yes, but defer until needed.

- [ ] **Discuss uSync integration with uSync maintainer.** Map files follow a similar pattern to uSync's serialized content files. Worth exploring whether uSync could be aware of UpDoc map files, or if there are conventions we should follow for compatibility.

- [ ] **Blueprint-optional support.** Currently `blueprintId` is required in map files. In a future iteration, map files should work with just `documentTypeAlias` (no blueprint). The map file schema already supports this — `blueprintId` just needs to become optional in the code.

---

## Future Enhancements (Post-Refactor)

1. **Web Page Extraction**
   - HTML parser service (HTML Agility Pack or AngleSharp)
   - CSS selector-based content extraction
   - Configurable heading detection
   - URL input in source-specific workflow step

2. **Word Document Extraction**
   - .docx parser service (Open XML SDK)
   - Style-based extraction (Heading 1 → title, Heading 2 → sections)
   - Table/image handling

3. **Advanced Features**
   - Image extraction from PDFs
   - Form field mapping
   - Custom property editors support
   - Batch processing (multiple documents at once)

---

## Questions for Claude Code

When implementing, if Claude Code needs clarification:

1. **Should the config be validated on app startup or first use?**
   - Recommendation: First use, with helpful error messages

2. **How should invalid regex patterns be handled?**
   - Recommendation: Try/catch with fallback to default patterns, log warning

3. **Should there be a UI for testing extraction rules?**
   - Phase 1: No (just use the modal)
   - Phase 2: Yes (dashboard)

4. **What happens if multiple sections match the same type?**
   - Recommendation: Take first match, log warning

5. **Should config support environment-specific overrides?**
   - Phase 1: No (single config.json)
   - Future: Yes (config.Development.json, config.Production.json)

---

## Appendix: Key Files Modified

**Backend (C#):**
- NEW: `/Models/ExtractionConfig.cs` — config model classes
- NEW: `/Services/IExtractionService.cs` — common extraction interface
- NEW: `/Services/IConfigurationService.cs` — config abstraction (JSON now, database later)
- NEW: `/Services/ConfigurationService.cs` — reads config.json
- NEW: `/Services/IDocumentCreationService.cs` — shared document creation pipeline
- MODIFY: `/Services/PdfPagePropertiesService.cs` — implements `IExtractionService`, reads config instead of hardcoded values
- MODIFY: `/Controllers/PdfExtractionController.cs` — new `/extract-sections` endpoint
- MODIFY: `/Composers/CreateFromPdfComposer.cs` — register new services

**Frontend (TypeScript):**
- NEW: `/App_Plugins/CreateFromPdf/src/config.types.ts` — TypeScript interfaces for config
- NEW: `/App_Plugins/CreateFromPdf/src/config.service.ts` — loads config.json, caches it
- NEW: `/App_Plugins/CreateFromPdf/src/extraction.types.ts` — structured extraction result types
- MODIFY: `/App_Plugins/CreateFromPdf/src/create-from-pdf-action.ts` — single entry point, source type picker, config-driven mappings
- MODIFY: `/App_Plugins/CreateFromPdf/src/create-from-pdf-modal.element.ts` — source type selection step
- MODIFY: `/App_Plugins/CreateFromPdf/src/manifest.ts` — rename action to "Create Document from Source"

**Configuration:**
- NEW: `/App_Plugins/CreateFromPdf/config.json` — client-specific extraction rules and property mappings
- NEW: `/App_Plugins/CreateFromPdf/config.schema.json` — JSON schema for IDE validation
- NEW: `/App_Plugins/CreateFromPdf/config.sample.json` — ships with package as example

**Planning & Documentation:**
- `/planning/REFACTOR_TO_CONFIGURABLE.md` — this document
- `/planning/CREATE_FROM_SOURCE_UI.md` — (future) single entry point UI design
- `/planning/CONFIGURATION_DASHBOARD.md` — (future) dashboard design
- `/docs/` — user-facing documentation (syncs to GitBook)

---

**End of Refactoring Plan**

*This document should be kept updated as implementation progresses. Mark tasks complete and note any deviations from the plan.*
