# Plan: Section-Based Extraction & Mapping

## Status: NOT STARTED — depends on Playwright testing setup (Phase 0)

---

## Context: Why this change is needed

The current mapping system is **fragile**. It stores mappings as static wires from specific element IDs (e.g., `p1-e17`) to destination fields. Element IDs are positional — `p{page}-e{index}` — so if a different PDF has fewer elements before a section (shorter title, missing description line), every ID shifts and mappings pull wrong content or find nothing.

**Example of the problem:** A workflow author maps 8 bullet items under the FEATURES heading (IDs `p1-e15` through `p1-e22`) to the Features block's Rich Text field. A different tour PDF has only 6 bullets under FEATURES. The element IDs are different because content above shifted positions. The mappings either miss content entirely or grab wrong text.

This means the current system only works reliably when every PDF has an identical structure to the sample. That's not how real-world PDFs work — different tours have different numbers of bullets, different section lengths, different content.

**Real-world failure (tested Feb 2026):** Uploading the "Magical Andalucía" PDF (different from the "Flemish Masters" sample) produced a Features block containing: the actual feature bullets, THEN the "WHAT WE WILL SEE" heading, THEN all the sightseeing bullets — all concatenated into one field. The element-ID mappings from the sample spanned across what should be two separate sections in this PDF. There was no "stop at the next heading" boundary — the static IDs just grabbed whatever happened to be at those positions in the new document.

**Important:** Element IDs are not being removed. They are still needed for fine-grained control — moving a specific element out of a section, remapping an individual item to a different destination, or handling exceptions. Section-based rules become the **primary** mapping mechanism; element IDs remain available for per-element overrides and fine-tuning.

---

## What we have now (working but fragile)

**Rich extraction** (`PdfPagePropertiesService.ExtractRichDumpFromDocument`): Extracts every text line from the PDF as a flat list of elements with full metadata (fontSize, fontName, position, boundingBox, color). Element IDs are generated as `p{page}-e{index}`. Stored in `sample-extraction.json`.

**Source tab** (`up-doc-workflow-source-view.element.ts`): Displays elements with a visual heading hierarchy — `visual-grouping.ts` already detects headings (elements with fontSize > mode fontSize) and groups children under them. User selects individual elements via checkboxes, clicks "Map to...", picks a destination field. Each selected element becomes a separate mapping entry.

**Map tab** (`up-doc-workflow-map-view.element.ts`): Table showing each mapping as "element ID → destination field". Delete button per row.

**map.json format**: Array of `SectionMapping` objects, each with `source` (element ID string) and `destinations` (array of target aliases + optional blockKey).

**Bridge code** (`up-doc-collection-action.element.ts`): When creating a document, calls `extractRich()` on the new PDF, builds an `elementLookup: Record<string, string>` (ID → text), then walks map.json looking up each source ID. First write to a field replaces blueprint default; subsequent writes concatenate.

**Destination tab**: Shows blueprint structure (fields + blocks filtered to text-mappable populated fields). Works well, doesn't need major changes.

---

## The solution: Section-based grouping during extraction

Instead of mapping individual elements by ID, we need to:

1. **Group elements into sections during extraction** (server-side) — using font metadata to identify headings and collect everything below each heading until the next heading
2. **Map at the section level** — "FEATURES section → Features block" rather than 8 individual element mappings
3. **Use metadata-based rules** for matching — "elements with fontSize 9, fontName HelveticaNeue, below heading matching 'FEATURES'" rather than element IDs

This is the same concept as the old `betweenPatterns` extraction strategy, but driven by font characteristics instead of text regex patterns. Font characteristics are consistent across PDFs from the same template (all headings are 12pt Clarendon, all body is 9pt HelveticaNeue), so the rules work regardless of how many bullets or paragraphs appear under each heading.

**Key insight already in the codebase:** `visual-grouping.ts` already does heading detection client-side using font size mode. This same logic needs to move server-side into the extraction service so sections arrive pre-grouped.

---

## What the source tab should look like after

Instead of a flat list of ~40 individual elements with checkboxes, the source tab shows **grouped sections**:

```
FEATURES                          [12pt, Clarendon, #16549D]
  ├── 4* central Bruges hotel     [9pt, HelveticaNeue, #16549D]
  ├── Welcome dinner included     [9pt, HelveticaNeue, #16549D]
  ├── All excursions, entrance... [9pt, HelveticaNeue, #16549D]
  ├── guided tours included       [9pt, HelveticaNeue, #16549D]
  ├── Canal cruise on Day 2...    [9pt, HelveticaNeue, #16549D]
  ├── Tour manager throughout     [9pt, HelveticaNeue, #16549D]
  ├── Eurotunnel crossings        [9pt, HelveticaNeue, #16549D]
  └── Executive coach throughout  [9pt, HelveticaNeue, #16549D]

ACCOMMODATION                     [12pt, Clarendon, #16549D]
  ├── We stay four nights at...   [9pt, HelveticaNeue, #16549D]
  └── ...                         [9pt, HelveticaNeue, #16549D]
```

The workflow author maps at the **section level**: click FEATURES section → "Map to..." → pick "Features > Rich Text" for the body and "Features > Title" for the heading. One mapping rule covers however many bullets appear in that section of any PDF.

---

## What a mapping rule should look like in map.json (new format)

Instead of:
```json
{ "source": "p1-e15", "destinations": [{ "target": "richTextContent", "blockKey": "..." }] }
{ "source": "p1-e16", "destinations": [{ "target": "richTextContent", "blockKey": "..." }] }
// ... 6 more identical entries for each bullet
```

Something like:
```json
{
  "source": {
    "type": "section",
    "headingMatch": { "text": "FEATURES" },
    "childrenMatch": { "fontSize": 9, "fontName": "HelveticaNeue" }
  },
  "destinations": [
    { "part": "heading", "target": "featurePropertyFeatureTitle", "blockKey": "..." },
    { "part": "children", "target": "richTextContent", "blockKey": "..." }
  ]
}
```

The exact schema needs design work — this is illustrative. The key change is: **source is a rule (match by metadata), not an element ID**.

---

## What needs to change

**Server-side (C#):**
- `PdfPagePropertiesService` — add section grouping to rich extraction. Elements grouped under detected headings. Use font size threshold (heading = fontSize > mode fontSize, same logic as `visual-grouping.ts`)
- New or updated models for grouped extraction output (sections with heading + children, each element retaining full metadata)
- Extraction API response format changes

**Frontend — Source tab:**
- Update to render sections as collapsible/expandable groups with section-level mapping actions
- "Map section" interaction: select a section, map heading → one destination, children → another destination
- Possibly keep individual element display within sections for review, but mapping operates at section level

**Frontend — Map tab:**
- Display rule-based mappings instead of element-ID mappings
- Show the rule summary (e.g., "Section 'FEATURES' heading → Features > Title, body → Features > Rich Text")

**Frontend — Bridge code (`up-doc-collection-action.element.ts` AND `up-doc-action.ts`):**
- When creating a document, extract fresh, group into sections using same rules, then apply section-level mappings
- Replace element ID lookup with section matching logic
- **CRITICAL: Both bridge files must be updated.** Previous sessions hit bugs from only updating one. Consider extracting shared logic into a service module first (the refactor from the previous next session prompt).

**map.json schema:**
- New `SectionMapping` format with rule-based source matching instead of element IDs
- Backwards compatibility with existing element-ID mappings during transition (or migrate existing map.json files)

---

## What stays the same

- **Destination tab** — blueprint structure display, field/block listing. No changes needed.
- **Destination picker modal** — still picks target fields, works the same
- **`destination.json`** — auto-populated from blueprint, unchanged
- **`source.json`** — extraction config file, unchanged (section grouping is inferred from font metadata, not configured per-section)
- **Rich extraction metadata** — fontSize, fontName, position, color all still extracted and stored. The metadata is what powers the grouping rules.
- **Three-file architecture** — source config, destination config, map still separate files per workflow

---

## Design questions to resolve

1. **Grouping algorithm details:** The client-side `visual-grouping.ts` uses mode fontSize as the heading threshold. Should the server-side version use the same approach? What about multi-level headings (12pt section heading vs 10pt sub-heading)?

2. **Section matching in map.json:** How prescriptive should the rule be? Just heading text match? Or also font characteristics? The heading text ("FEATURES") is the most reliable anchor across PDFs. Font characteristics help disambiguate if two headings have the same text.

3. **Bridge refactor:** Should we extract the shared mapping/bridge logic into a service module first (as the previous session prompt suggested) before changing the mapping format? This prevents the dual-file sync problem during a complex change.

4. **Migration:** Existing `map.json` files have element-ID mappings. Migrate automatically or require re-mapping?

5. **Children matching flexibility:** Not all children under a heading may belong to the mapping. How flexible should the children matching be? Accept all children by default, with optional exclusion rules?

---

## Future: AI-assisted mapping

The programmatic section-based rules handle ~90% of cases — structural pattern recognition based on font metadata. AI adds value for the remaining ~10% where **meaning** matters:

- Semantic matching when PDF heading text doesn't exactly match destination field names (e.g., "FEATURES" → "Key Highlights")
- Auto-suggesting initial mappings for new workflows
- Handling messy PDFs with inconsistent formatting

**Approach:** Build the programmatic rules first as a solid foundation. AI becomes a smart assistant layer on top, integrated via Umbraco.AI when ready. This keeps the system reliable and predictable, with AI enhancing rather than replacing the core logic.

---

## Key files

| File | Purpose |
|------|---------|
| `src/UpDoc/Services/PdfPagePropertiesService.cs` | Rich extraction — needs section grouping |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/visual-grouping.ts` | Client-side heading detection — reference algorithm |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` | Source tab — needs section-level mapping UI |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-map-view.element.ts` | Map tab — needs rule-based display |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-collection-action.element.ts` | Bridge — primary code path, needs section matching |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-action.ts` | Bridge — secondary code path, must stay in sync |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` | TypeScript types — SectionMapping needs new format |
| `src/UpDoc.TestSite/updoc/workflows/group-tour-pdf/map.json` | Current element-ID mappings — needs migration |
| `src/UpDoc.TestSite/updoc/workflows/group-tour-pdf/sample-extraction.json` | Current flat extraction — needs grouped format |

---

## Implementation phases

### Phase 0: Playwright E2E testing (see `planning/PLAYWRIGHT_TESTING.md`)
Set up automated tests for the current system before refactoring. Establishes baseline, documents the cross-PDF bug, enables rapid verification during refactoring.

### Phase 1: Bridge refactor
Extract shared mapping logic from both `up-doc-collection-action.element.ts` and `up-doc-action.ts` into a `document-creation.service.ts`. Eliminates the dual-file sync problem before making complex changes.

### Phase 2: Server-side section grouping
Extend `PdfPagePropertiesService` to group elements into sections (heading + children) using font size mode threshold. Update the extraction response format. Keep individual element metadata within sections.

### Phase 3: Source tab & map tab UI
Update source tab to render grouped sections with section-level mapping actions. Update map tab to display rule-based mappings.

### Phase 4: map.json schema & bridge update
New rule-based source matching in map.json. Update bridge code to use section matching during document creation.

### Phase 5: Transforms
The titleCase, bullet conversion, and markdown-to-HTML transforms (from the previous next session prompt) are still needed and can be built on top of the section-based system.

---

## Branch strategy

```bash
git checkout main && git pull && git checkout -b feature/section-based-mapping
```

Consider splitting into sub-branches if scope is large:
- `feature/bridge-refactor` — extract shared service (Phase 1)
- `feature/section-grouping` — server-side extraction grouping (Phase 2)
- `feature/section-mapping-ui` — source tab and map tab changes (Phase 3)
- `feature/section-bridge` — bridge code to use section rules (Phase 4)
