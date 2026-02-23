# Web Area Detection

## Status: AGREED (Feb 2026)

## Problem

Web extraction (AngleSharp) produces a flat list of elements from the entire page. The Norfolk test page extracted 170 elements including navigation, sidebar CTAs, footer links, and cookie notices. There's no way to filter noise — users see everything.

## Decision: Auto-Detect HTML Areas

Apply the same Page > Area > Section > Element hierarchy used for PDF to web sources. Areas are detected from DOM structure instead of spatial bounding boxes.

### Hierarchy (same as PDF)

```
Page (always 1 for web — still shown for consistency)
  └─ Area (auto-detected from HTML containers)
       └─ Section (heading-based grouping within each area)
            └─ Element (individual text items with badges)
```

### Area Detection Strategy

Two-tier detection since many sites predate HTML5 semantic elements:

**Tier 1 — Semantic elements:**
`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<article>`, `<section>`

**Tier 2 — Class/ID pattern matching (legacy sites):**
Any `<div>` or `<table>` whose `class` or `id` contains: "header", "nav", "navigation", "menu", "sidebar", "aside", "footer", "content", "main"

**Fallback:** Elements not inside any detected area go into an "Ungrouped" area (similar to PDF's "Undefined" area).

**Detection happens during extraction** — `HtmlExtractionService.ExtractElements()` passes the current area name down through its recursive DOM walk. Each `ExtractionElement` gets tagged with its area.

### Info Boxes (3 for web, not 4)

| Box | Content |
|-----|---------|
| **Source** | URL + extraction date + Re-extract button |
| **Areas** | Count + include/exclude summary + Edit Areas button |
| **Sections** | Count + Edit Sections button |

No Pages box needed (web = single page).

### UI Behaviour

- **Extracted tab**: Same collapsible hierarchy as PDF screenshot — Page box at top, areas with colour-coded left borders, sections with headings, elements with badges. Include/exclude toggles on areas and sections.
- **Transformed tab**: Only includes sections from *included* areas. Same heading-grouped HTML rendering as current.
- **Areas auto-detected on first extraction**, user can toggle them on/off. Excluded areas persist in source.json.

### What the Norfolk page would look like

```
Page
  ├─ Header (auto-detected: <div class="header"> or similar)
  │    └─ 12 elements (logo, phone, nav links) — EXCLUDED
  ├─ Main Content (auto-detected)
  │    ├─ Section: The History & Heritage Houses of Norfolk
  │    ├─ Section: Day 2 — Norwich & Oxburgh Hall
  │    ├─ Section: Day 3 — Sandringham Estate & Holkham Hall
  │    ├─ Section: Featuring
  │    └─ Section: Hotel
  ├─ Sidebar (auto-detected: <div class="sidebar"> or similar)
  │    └─ 15 elements (CTAs, phone box) — EXCLUDED
  └─ Footer (auto-detected)
       └─ 30 elements (links, addresses) — EXCLUDED
```

User excludes Header, Sidebar, Footer → clean main content with heading-based sections.

## Backend Changes

### 1. New metadata field on ExtractionElement

Add `htmlArea` to `ElementMetadata` in `RichExtractionResult.cs`:

```csharp
[JsonPropertyName("htmlArea")]
public string HtmlArea { get; set; } = string.Empty;
```

### 2. HtmlExtractionService — area tracking during extraction

Modify `ExtractElements()` to accept and pass down a `currentArea` parameter:

```csharp
private void ExtractElements(IElement element, List<ExtractionElement> elements,
    ref int index, string currentArea)
{
    // Check if this element IS an area boundary
    var detectedArea = DetectArea(element);
    if (detectedArea != null)
        currentArea = detectedArea;

    // Tag extracted elements with currentArea
    // ... existing extraction logic ...
    metadata.HtmlArea = currentArea;
}
```

New method `DetectArea(IElement)`:
- Checks semantic tag name (header, nav, main, aside, footer, article, section)
- Checks class/id for common patterns (header, nav, sidebar, footer, content, main, menu)
- Returns human-readable name like "Header", "Navigation", "Main Content", "Sidebar", "Footer"
- Returns null if not an area boundary

### 3. Remove FindContentRoot() body fallback extraction

Currently `FindContentRoot()` finds a content root and extracts only from there. With area detection, we extract from `<body>` always (to capture all areas) but TAG each element with its area. The filtering happens in the UI via include/exclude toggles, not at extraction time.

Keep `IsSkippableElement()` for truly non-content elements (script, style, svg, iframe, form inputs).

### 4. Auto-generate area detection result for web

After extraction, build an `AreaDetectionResult`-compatible structure from the `htmlArea` tags:
- Group elements by `htmlArea` value
- Create one "page" (page 1)
- Create one area per unique `htmlArea` value
- Within each area, group into sections by headings (existing logic)

This feeds into the same `ConvertStructuredToTransformResult` pipeline — the transform only processes included areas.

## Frontend Changes

### 1. Update non-PDF Extracted tab

Replace `#renderSimpleElements()` flat list with the existing PDF hierarchy renderer (`#renderAreaPage()` → `#renderArea()` → `#renderSection()` → `#renderAreaElement()`). These methods are already built — they just need the area detection data.

### 2. Update info boxes

Replace 4 placeholder boxes with 3 functional boxes (Source, Areas, Sections). Wire up area/section counts and Edit buttons.

### 3. Area include/exclude persistence

Store excluded areas in `source.json` (same pattern as PDF page exclusion). When user toggles an area off, save to source.json. On transform, filter out excluded areas before processing.

## Files to Modify

| File | Change |
|------|--------|
| `src/UpDoc/Models/RichExtractionResult.cs` | Add `HtmlArea` to `ElementMetadata` |
| `src/UpDoc/Services/HtmlExtractionService.cs` | Area detection during extraction, remove content root restriction |
| `src/UpDoc/Controllers/WorkflowController.cs` | Build area detection result from web extraction, save alongside sample extraction |
| `src/UpDoc/wwwroot/.../up-doc-workflow-source-view.element.ts` | Use hierarchy renderer for web, 3 info boxes, area toggles |
| `src/UpDoc/wwwroot/.../workflow.types.ts` | Add `htmlArea` to frontend types if needed |

## Out of Scope (for now)

- **CSS selector configuration** — manual selector override for edge cases. Future enhancement.
- **Visual DOM inspector** — click-to-select areas in rendered page. Future aspirational UX.
- **Markdown areas** — markdown doesn't have container structure, stays heading-only.
- **PDF-to-web conversion** — interesting escape hatch, not needed now.
- **Repeating content detection** — tour card lists on index pages. Different problem.

## Key Principle

Same UX pattern across all source types. The user learns one interaction model (Page > Area > Section > Element with include/exclude toggles) and it works regardless of whether the source is a PDF, web page, or markdown file. The detection mechanism differs per source type but is invisible to the user.
