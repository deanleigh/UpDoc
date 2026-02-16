# Plan: Destination Preview Consistency

## Status: PLANNED

## Problem

Three views currently show mapped content in flat, unstructured lists:

1. **Create from Source sidebar (Content tab)** — flat scroll of all mapped fields (Features > Title, Accommodation > Rich Text, Page Title, Page Description, Suggested Itinerary > Rich Text, etc.) in no particular order
2. **Map tab** — mappings listed in insertion order, not grouped or ordered by destination structure
3. **Destination tab** — already correctly organised into Page Properties / Page Content tabs with fields in document order

The Destination tab and the actual Umbraco document editor both use the same tab structure (Page Properties, Page Content, and any custom tabs like "Organiser Details"). The other views should match this structure for a consistent mental model.

## Principle

**The destination document's tab structure is the universal organising principle.** Anywhere we show destination fields or mapped content, group and order them to match the tabs and field order the user will see when editing the document.

## What Changes

### 1. Create from Source Sidebar — Content Tab

**Current:** Flat list of all mapped field values in arbitrary order.

**After:** Inner tabs matching the document's property group tabs:
- **Page Properties** tab: Page Title, Page Title Short, Page Description (in document order)
- **Page Content** tab: Block Grid items grouped by block (Features, Suggested Itinerary, Accommodation), each showing their mapped fields (Title, Rich Text, etc.)
- **Custom tabs** (if any): e.g., "Organiser Details" — shown as additional tabs

The tab structure and field ordering comes from `destination.json`, which is already built from the blueprint and groups fields by property group/tab.

### 2. Map Tab

**Current:** Flat table of Source → Destination mappings in insertion order. 10 mappings shown as one long list.

**After:** Mappings grouped by destination tab, fields ordered by destination position:

```
Page Properties
  Source                                    →  Destination
  the-art-history-of-liverpool.heading      →  Page Title, Page Title Short
  5-days-from-814-departing-5th-oct....heading →  Page Description

Page Content — Suggested Itinerary
  Source                                    →  Destination
  6-days-from-994-departing....content      →  Rich Text

Page Content — Features
  Source                                    →  Destination
  features.heading                          →  Title
  features.content                          →  Rich Text

Page Content — Accommodation
  Source                                    →  Destination
  accommodation.heading                     →  Title
  accommodation.content                     →  Rich Text
```

Grouping and ordering derived from `destination.json`. Mappings for fields not found in destination (orphaned) shown in a separate "Unmapped" section at the bottom.

### 3. No Changes to Destination Tab

The Destination tab already uses the correct tab structure. No changes needed.

## Data Source

`destination.json` already contains the tab/group structure:
- Page Properties fields with their aliases and order
- Page Content block grid with blocks, each identified by their feature title
- Fields within each block in document order

Both the Create from Source sidebar and the Map tab can read this structure to determine grouping and ordering. The workflow workspace context already loads `destination.json`.

## Implementation Notes

- The Create from Source sidebar (`up-doc-collection-action.element.ts` and `up-doc-action.ts`) currently builds the content preview by iterating mappings. Needs to load destination structure and group by tab.
- The Map tab (`up-doc-workflow-map-view.element.ts`) currently renders a flat table. Needs section headers per destination tab/block and reordering.
- Both bridge files (`up-doc-action.ts` and `up-doc-collection-action.element.ts`) must be updated in sync — see MEMORY.md critical lesson about keeping these in sync.
- Tab rendering can reuse `uui-tab-group` pattern already used on the Destination view.

## Out of Scope

- Changing the actual mapping data structure in `map.json` — this is purely a presentation change
- Destination-driven mapping UI (covered in `DESTINATION_DRIVEN_MAPPING.md`)
- Editable content in the preview (future feature)

---

## Pipeline Audit: Content Formatting & Area Filtering (Feb 2026)

### The Extraction Funnel (Intended Design)

The workflow author progressively refines what content flows through the pipeline. Each step narrows the surface area; the next step only operates on what survived.

```
Step 1: Choose source PDF
  └── Reference document representing the structure of all similar PDFs.
      Initial extraction reads the full document — no choice here,
      PdfPig needs to read it all.

Step 2: Choose pages
  └── First refinement. "Content I care about is on pages 1-2."
      Pages 3-4 (terms, booking forms) are discarded.
      Everything downstream only processes selected pages.

Step 3: Define areas
  └── Second refinement. Spatial areas drawn on the selected pages.
      "Main Content here, Organiser Info there, Page Header here."
      Content outside ALL defined areas is noise and should be
      DISCARDED ENTIRELY.

Step 4: Sections (automatic)
  └── Within each area, PdfPig groups content by heading structure.
      Font size changes define section boundaries. General rules
      (heading threshold) guide this, but it's automatic based on
      the PDF's own typographic structure.
```

### Area Extraction Accuracy

PdfPig's spatial filtering is precise — PDFs store exact glyph coordinates (points, 1/72 inch). The area check computes each word's center point and tests whether it falls inside the area rectangle. This is geometry, not heuristics.

- **Words filtered before line grouping** — each area gets independent line extraction, preventing cross-area text merging (e.g., sidebar words can't merge with main column words)
- **Center-point test** — a word straddling an area boundary is included/excluded based on where its center falls. Rarely an issue in practice since text sits well inside areas.
- **First-claim assignment** — a word can only belong to one area. If areas overlap, first area (left-to-right order) wins.

The accuracy bottleneck is NOT PdfPig's spatial extraction — it's the downstream steps (section grouping, markdown assembly, and writing to Umbraco).

### Problem 1: Content Outside Areas Leaks Through

**Rule violation:** After areas are defined, nothing outside those areas should exist in the pipeline.

**Current behaviour:** `ContentTransformService.Transform()` processes `page.UnzonedContent` unconditionally — content outside all defined areas gets transformed into sections, defaults to `Included = true`, and becomes available for mapping.

**Where it happens:**
- `ContentTransformService.cs` lines 46-55: processes `page.UnzonedContent` identically to area content
- `TransformedSection.Included` defaults to `true` — new sections from a different PDF that don't match the stored `transform.json` silently pass through

**Fix:** When an area template exists, skip `page.UnzonedContent` entirely. Only area content should enter the transform.

### Problem 2: Redundant Full Extraction in Create from Source

**Current behaviour:** The Create from Source modal runs TWO extractions:
1. `extractRich()` — full raw dump of every element on every page, no area filtering (~544 elements). Stored as `_extractedSections` keyed by positional element IDs (`p1-e17`).
2. `transformAdhoc()` — area-aware extraction using the workflow's area template and page selection. Stored as `_sectionLookup` keyed by section IDs (`features.content`).

The first extraction is entirely redundant. All mappings in `map.json` now use section IDs, so `_extractedSections` is never matched. It exists only as a fallback for legacy element-ID mappings that no longer exist.

**Fix:** Remove the `extractRich()` call from the Create from Source path. Only `transformAdhoc()` is needed.

### Problem 3: Markdown Not Converted to HTML for Rich Text Fields

**Current behaviour:** The transform layer correctly produces markdown:
- Bullets: `"- 4* central Liverpool hotel"`
- Sub-headings: `"## Day 1"`
- Paragraphs joined with `\n\n`

But the bridge code writes this raw markdown directly into Umbraco properties without conversion:
- `richTextContent` fields receive plain markdown strings instead of HTML wrapped in an RTE value object (`{blocks: {...}, markup: '<html>'}`)
- `markdownToHtml()` and `buildRteValue()` exist in `transforms.ts` but are never called
- The `shouldConvertMarkdown` flag is computed from `dest.transforms` but (a) all transforms are `null` in map.json, and (b) the flag is never acted on even when true

**What the user sees:** Wall-of-text in the created document. Bullets render as `- item` inline text. Headings render as `## Day 1` plain text. No HTML structure.

**Fix:** The bridge code should auto-convert based on destination field type from `destination.json`:
- `type: "richText"` → `markdownToHtml()` → `buildRteValue()` → set as RTE object
- `type: "textArea"` or `type: "text"` → keep as plain string

This is generic/package-appropriate — it uses the field type metadata that `destination.json` already provides. No site-specific rules needed. No explicit `transforms` in `map.json` required.

**Affected files (both must be updated in sync):**
- `up-doc-collection-action.element.ts` — collection action (primary Create from Source path)
- `up-doc-action.ts` — entity action (tree context menu path)

### Summary of Fixes Required

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | Content outside areas leaks through | `ContentTransformService.cs` | Wrong content available for mapping |
| 2 | Redundant `extractRich()` call | `up-doc-modal.element.ts` | Wasted processing, legacy fallback no longer needed |
| 3 | Markdown not converted to HTML | `up-doc-collection-action.element.ts`, `up-doc-action.ts` | Broken formatting in created documents |

All three are pipeline correctness issues, not UI/presentation. They should be fixed before any further UI work (destination preview consistency, map tab grouping, etc.).
