# PDF Formatting Rules Architecture Exploration

## Context

During implementation of strategy-driven extraction, we encountered a formatting issue: bullet characters (`•`, `●`, etc.) from PDFs were not being converted to markdown lists. The fix was to add a `FlushParagraphWithBullets` method that splits on bullet characters and converts to markdown list items (`- item`).

This raises an architectural question: **Where should PDF-specific formatting rules live?**

---

## Current State

### What's Hardcoded in the RCL

In `PdfPagePropertiesService.cs` (lines 526, 586-611):

```csharp
// Hardcoded bullet character list
var bulletChars = new[] { '•', '●', '○', '■', '□', '▪', '▫', '◆', '◇', '►', '▸' };

// Hardcoded conversion logic
private static string FlushParagraphWithBullets(string text, char[] bulletChars)
{
    if (!bulletChars.Any(b => text.Contains(b)))
        return text;

    var parts = text.Split(bulletChars, StringSplitOptions.RemoveEmptyEntries);
    // ...convert to markdown list items with "- "
}
```

### What's Configurable in source-pdf.json

Currently, extraction strategies have parameters but no formatting rules:

```json
{
  "key": "features",
  "strategy": "betweenPatterns",
  "outputFormat": "markdown",  // Only specifies OUTPUT format
  "strategyParams": {
    "startPattern": "^Features$",
    "stopPatterns": ["accommodation", "terms"],
    "includeStartLine": false
  }
  // No formatting/conversion rules
}
```

---

## The Problem

Different PDFs may have:
- Different bullet characters (some use `*`, `>`, or numbers)
- Different list separator conventions
- Content that shouldn't be converted to lists (even if it contains bullet chars)
- Different needs per section (itinerary as prose, features as list)

Hardcoding the conversion logic means:
1. No way to disable bullet conversion for a specific section
2. No way to add custom bullet characters for a specific PDF style
3. The RCL "knows" about specific PDF formatting conventions
4. Every PDF edge case requires an RCL code change

---

## Architectural Options

### Option A: Keep Hardcoded (Current)

**Where:** `PdfPagePropertiesService.cs` in the RCL

**Structure:**
```csharp
// Hardcoded in ExtractBetweenPatterns
var bulletChars = new[] { '•', '●', '○', '■', '□', '▪', '▫', '◆', '◇', '►', '▸' };
// Always converts bullet chars to markdown lists
```

**Pros:**
- Simple - works out of the box
- No additional config complexity
- Handles 90% of cases automatically

**Cons:**
- Cannot customize bullet characters per document type
- Cannot disable for specific sections (features = list, accommodation = prose)
- Every PDF edge case requires RCL update
- Tight coupling: RCL "knows" about PDF authoring conventions

---

### Option B: Configurable Per-Section in strategyParams

**Where:** `source-pdf.json` per section

**Structure:**
```json
{
  "key": "features",
  "strategy": "betweenPatterns",
  "outputFormat": "markdown",
  "strategyParams": {
    "startPattern": "^Features$",
    "stopPatterns": ["accommodation"],
    "formatting": {
      "convertBulletsToList": true,
      "bulletCharacters": ["•", "●", "○", "■", "*", ">"],
      "listStyle": "unordered"  // or "ordered", "none"
    }
  }
}
```

**Pros:**
- Per-section control (features = list, accommodation = prose)
- Custom bullet characters per document type
- No RCL changes for new bullet types
- Explicit - you can see what formatting will be applied

**Cons:**
- More verbose config
- Formatting mixed with extraction concerns
- Must repeat in every section that needs formatting
- `strategyParams` is already strategy-specific, adding formatting blurs the boundary

---

### Option C: Separate Formatting Config Per Source Type

**Where:** `source-pdf.schema.json` or `source-pdf.json` globals

**Structure:**
```json
{
  "$schema": "https://updoc.dev/schemas/source-pdf.schema.json",
  "version": "1.0",
  "sourceTypes": ["pdf"],
  "globals": {
    "columnDetection": { "enabled": true },
    "formatting": {
      "bulletToList": {
        "enabled": true,
        "characters": ["•", "●", "○", "■", "□", "▪", "▫", "◆", "◇", "►", "▸"],
        "outputStyle": "markdown-unordered"
      },
      "paragraphJoining": {
        "mode": "space",
        "preserveLineBreaksAfter": ["^Day\\s+\\d+"]
      },
      "whitespace": {
        "trimLines": true,
        "collapseMultipleSpaces": true
      }
    }
  },
  "sections": [
    {
      "key": "features",
      "strategy": "betweenPatterns",
      "formatting": {
        "bulletToList": { "enabled": true }  // Override if needed
      }
    },
    {
      "key": "accommodation",
      "strategy": "betweenPatterns",
      "formatting": {
        "bulletToList": { "enabled": false }  // Disable for this section
      }
    }
  ]
}
```

**Pros:**
- Clear separation: globals set defaults, sections can override
- Extensible - add new formatting rules without changing schema
- All PDF-specific formatting in one place
- RCL becomes a generic "rule executor"

**Cons:**
- Most complex schema structure
- Overkill if only bullet conversion matters
- Formatting rules need validation ("what's a valid character?")
- Schema becomes prescriptive (same concern as strategy enums)

---

### Option D: Formatting Schema Per Source Type (User's Suggestion)

**Where:** Separate `pdf-formatting.schema.json` file

**Structure:**
```
updoc/schemas/
  source.schema.json         # Extraction structure
  destination.schema.json    # Destination structure
  map.schema.json           # Mapping structure
  pdf-formatting.schema.json # PDF-specific formatting rules
```

**pdf-formatting.schema.json:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PDF Formatting Rules",
  "type": "object",
  "properties": {
    "bulletConversion": {
      "type": "object",
      "properties": {
        "enabled": { "type": "boolean", "default": true },
        "characters": {
          "type": "array",
          "items": { "type": "string", "maxLength": 1 },
          "default": ["•", "●", "○", "■", "□", "▪", "▫", "◆", "◇", "►", "▸"]
        },
        "outputFormat": {
          "enum": ["markdown-unordered", "markdown-ordered", "html-ul", "html-ol", "none"],
          "default": "markdown-unordered"
        }
      }
    },
    "lineJoining": {
      "type": "object",
      "properties": {
        "mode": { "enum": ["space", "newline", "smart"], "default": "space" },
        "headingPatterns": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Regex patterns that mark line breaks before headings"
        }
      }
    },
    "whitespace": {
      "type": "object",
      "properties": {
        "trimLines": { "type": "boolean", "default": true },
        "collapseSpaces": { "type": "boolean", "default": true },
        "normalizeQuotes": { "type": "boolean", "default": false }
      }
    }
  }
}
```

**Usage in source-pdf.json:**
```json
{
  "$schema": "https://updoc.dev/schemas/source.schema.json",
  "formatting": {
    "$ref": "./pdf-formatting-defaults.json"  // Or inline
  },
  "sections": [...]
}
```

**Pros:**
- Fully declarative - no hardcoded formatting in RCL
- Reusable across all PDFs (pdf-formatting-defaults.json)
- Can have different formatting files for different PDF styles
- Schema provides validation and IDE autocompletion
- Future web/Word extractors get their own formatting schemas

**Cons:**
- Additional file to manage
- Adds complexity for simple use cases
- Cross-file reference validation needed
- May be premature optimization if bullet conversion is the only rule

---

## Recommendation

### Short-term: Option B (strategyParams)

Add formatting config to `strategyParams` for sections that produce markdown output:

```json
{
  "key": "features",
  "strategy": "betweenPatterns",
  "outputFormat": "markdown",
  "strategyParams": {
    "startPattern": "^Features$",
    "bulletToList": {
      "enabled": true,
      "characters": ["•", "●", "○"]
    }
  }
}
```

**Why:**
- Minimal schema change
- Works today
- Per-section control where it matters
- Doesn't require new files/structure

### Long-term: Option C or D (After More Source Types)

Once we implement web and Word extraction, we'll have better data on:
- What formatting rules are truly common vs source-specific
- Whether a separate formatting schema is justified
- What the right abstraction level is

**Decision point:** After implementing at least one additional source type (web or Word), revisit this architecture.

---

## Implementation for Option B (Short-term)

### Schema Change

Add to `source.schema.json`:

```json
"strategyParams": {
  "type": "object",
  "properties": {
    "bulletToList": {
      "type": "object",
      "properties": {
        "enabled": { "type": "boolean", "default": true },
        "characters": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    }
  }
}
```

### C# Model Change

In `SourceConfig.cs`:

```csharp
public class StrategyParams
{
    // Existing properties...

    [JsonPropertyName("bulletToList")]
    public BulletToListConfig? BulletToList { get; set; }
}

public class BulletToListConfig
{
    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; } = true;

    [JsonPropertyName("characters")]
    public List<string>? Characters { get; set; }
}
```

### Service Change

In `PdfPagePropertiesService.ExtractBetweenPatterns`:

```csharp
// Use config or defaults
var bulletConfig = section.StrategyParams?.BulletToList;
var bulletEnabled = bulletConfig?.Enabled ?? true;
var bulletChars = bulletConfig?.Characters?.SelectMany(s => s.ToCharArray()).ToArray()
    ?? new[] { '•', '●', '○', '■', '□', '▪', '▫', '◆', '◇', '►', '▸' };

// Only apply if enabled
if (bulletEnabled)
{
    markdown.AppendLine(FlushParagraphWithBullets(currentParagraph.ToString(), bulletChars));
}
else
{
    markdown.AppendLine(currentParagraph.ToString().Trim());
}
```

---

## Questions to Resolve

1. **Should bullet conversion be the ONLY formatting rule, or are there others we need?**
   - If only bullets, Option B is sufficient
   - If many rules, Option C/D may be better

2. **Do different sections in the same PDF need different formatting?**
   - If yes, Option B (per-section) is required
   - If no, globals (Option C) would suffice

3. **Will different PDFs from the same document type need different formatting?**
   - If yes, we need instance-level config (beyond map folder)
   - If no, folder-level config is sufficient

4. **What happens when we add web extraction?**
   - Web has its own formatting concerns (strip HTML, normalize whitespace)
   - Validates whether formatting should be source-type-specific

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-03 | Keep current hardcoded fix | Bullet conversion logic works, ships now |
| 2026-02-03 | Plan future externalization | See "Future Architecture" below |

---

## Future Architecture: Source Type Schema Files

**Intent:** Move all source-type-specific logic (PDF formatting rules, bullet characters, conversion patterns) from hardcoded C#/TypeScript into schema files that can be read by both languages.

**Goal:**
```
updoc/schemas/
  pdf-defaults.json      <- PDF-specific rules (bullet chars, formatting, thresholds)
  web-defaults.json      <- Web-specific rules (selector patterns, cleanup)
  word-defaults.json     <- Word-specific rules (style mappings)
  markdown-defaults.json <- Markdown-specific rules (minimal - mostly pass-through)
```

**Benefits:**
- Fixing source-type issues = JSON edit, not code change
- No RCL rebuild/redeploy for formatting fixes
- Rules visible and documented in config
- C# and TypeScript both read the same source of truth
- Adding a new source type = add a schema file + generic extractor

**What stays in code:**
- Generic execution logic (how to apply rules)
- File parsing (PdfPig, HTML parser, Open XML)
- The rule engine that reads and executes schema rules

**What moves to schema:**
- Character lists (bullet chars, quote chars, dash chars)
- Pattern definitions (what constitutes a heading, list, etc.)
- Thresholds and defaults (font size ratios, column detection %)
- Conversion mappings (this char → that markdown syntax)

**Timeline:** After PDF extraction is stable and we've validated the architecture with at least one additional source type.

---

## Related Documents

- [REFACTOR_TO_CONFIGURABLE.md](./REFACTOR_TO_CONFIGURABLE.md) - Overall config architecture
- [group-tour-source-pdf.json](../src/UpDoc.TestSite/updoc/maps/group-tour/group-tour-source-pdf.json) - Current extraction config
