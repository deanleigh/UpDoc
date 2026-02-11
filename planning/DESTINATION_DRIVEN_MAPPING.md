# Plan: Rich Extraction Format & Bidirectional Mapping

## Context

Before building further UI for the workflow editor, we identified a fundamental limitation in the data architecture: extraction currently produces flat strings (text or markdown), which discards all metadata (font size, position, color, heading level). This prevents building a visual rule builder, makes mapping to compound destinations (blocks with multiple fields) clumsy, and forces markdown conversion too early in the pipeline.

This plan captures architectural decisions from brainstorming sessions and outlines the implementation sequence. The goal is to enable **bidirectional mapping** where the workflow author can create mappings from whichever direction feels natural — starting from the destination ("I need to fill this field"), starting from the source ("I have this content, where does it go?"), or editing the map directly.

---

## Key Architectural Decisions

### 1. Workflows are per-source-type (not per-blueprint)

**Change from current:** The collection view currently shows one workflow per blueprint with source type tabs (Destination, Markdown, PDF). This changes to separate workflows per source type.

**New collection view:**

| Workflow | Document Type | Blueprint | Source | Mappings | Status |
|----------|--------------|-----------|--------|----------|--------|
| Group Tour from PDF | groupTour | Group Tour | pdf | 5 | Ready |
| Group Tour from Markdown | groupTour | Group Tour | markdown | 5 | Ready |
| Group Tour from Web | groupTour | Group Tour | web | 0 | Incomplete |

**Rationale:** This is a UX decision, not a technical one. Per-source-type workflows eliminate ambiguity during destination-driven mapping — the workflow author always knows which source type's conditions they're defining. No mode switching, no confusion.

**Storage:** Folder structure can stay as-is or adapt — this is a UI presentation decision. The three-file separation (source config, destination config, map) is preserved.

### 2. Bidirectional mapping via three-tab workspace

**Change from current:** The current UI shows source sections on separate tabs (PDF, Markdown) and destination fields on the Destination tab, with mapping wiring in a separate map.json. The workflow author must mentally connect these.

**Previous plan:** Destination-driven only — click destination field, pick source content. This was one of three approaches considered (destination-driven, source-driven, split-pane). None was chosen.

**New approach (Feb 2026):** All approaches work together. The workflow workspace has **three tabs** — Destination, Map, Source — and all three are views over the same underlying `map.json`. The workflow author can create and edit mappings from whichever direction feels natural for what they're doing at that moment.

**UX rationale:** Different workflow authors think differently. Some think "I need to fill this field" (destination-first), others think "I have this content, where does it go?" (source-first). Forcing one direction adds friction for the other mental model. Letting the user work from either direction removes the question entirely.

#### Three-tab model

**Destination tab** — Shows the blueprint structure (fields + blocks). Each field shows its mapping status (mapped/unmapped). Click a field to pick source content and create a mapping.
- Authoring direction: "I need to fill this field, where does the content come from?"
- Flow: Click destination field → picker shows source content from sample extraction → select source element(s) → conditions auto-populate → mapping created

**Source tab** — Shows the extracted sample content with metadata. Each element shows its mapping status. Click an element to pick a destination field and create a mapping.
- Authoring direction: "I have this content, where does it go?"
- Flow: Click source element → picker shows available destination fields → select destination → mapping created

**Map tab** — Shows all mappings directly as a flat list/table. Full overview of every source→destination wiring. Edit, delete, reorder mappings. The single source of truth made visible and directly editable.
- Authoring direction: "Let me see and manage all the wiring at once"

All three tabs read from and write to `map.json`. Creating a mapping from the Destination or Source tab updates the other views. The Map tab is always current.

#### Multi-element-to-one-field mapping

The case where multiple source elements map to a single destination field (e.g., a title split across two lines in the PDF) works naturally from either direction:
- **From destination:** Click the destination field, pick multiple source elements
- **From source:** Both source elements point to the same destination field (visible in Map tab)
- **From map:** Edit the mapping to add/remove source elements

**Destination structure** is auto-populated from the blueprint content — not the full document type. Only fields populated in the blueprint and text-mappable (text, textarea, richText) are shown. Only block instances actually placed in the blueprint's block grid are shown. See Decision #11 for details.

### 3. Rich extraction format (metadata preserved)

**Change from current:** Extraction produces `Dictionary<string, string>` — section key to content string. All metadata (font size, position, color) is lost after extraction.

**New format:** Extraction produces structured elements with full metadata:

```json
{
  "elements": [
    {
      "text": "Accommodation",
      "type": "heading",
      "metadata": {
        "fontSize": 18,
        "fontName": "Helvetica-Bold",
        "position": { "x": 50, "y": 420 },
        "page": 1,
        "color": "#000000"
      }
    },
    {
      "text": "We stay four nights at the 4* Bridgewood Manor...",
      "type": "body",
      "metadata": {
        "fontSize": 12,
        "fontName": "Helvetica",
        "position": { "x": 50, "y": 440 },
        "page": 1,
        "color": "#333333"
      }
    }
  ]
}
```

**Rationale:** The metadata is what powers the rule builder. Without it, conditions can't auto-populate and the workflow author would have to manually build rules from memory.

### 4. Sample extraction stored in workflow folder

**New file** in the workflow folder: a persisted rich extraction from a reference document.

When the workflow author uploads a sample PDF (or markdown, or web page) during workflow setup, the rich extraction output is saved. This serves as:
- The reference for the content picker (what the workflow author browses when mapping)
- The test fixture for refining conditions
- The source of auto-populated conditions

The sample extraction persists between sessions so the workflow author can return and refine rules without re-extracting.

### 5. Conditions auto-populate from metadata

**Inspired by Outlook rules:** When you create a rule from a selected email, Outlook pre-fills "From = This Dot". Similarly, when the workflow author picks a text element from the sample extraction, UpDoc pre-fills conditions from its metadata.

For PDF: font size, position, color, page number
For Markdown: heading level, syntax patterns
For Word: document styles (Heading 1, Heading 2, Normal)
For Web: CSS selectors, HTML element types

Common condition across all sources: **content text matching** (contains, equals, regex).

The workflow author confirms the auto-populated conditions and adds more if needed (e.g., disambiguating between two elements with the same text but different colors).

### 6. Unified rule builder UI across source types

The rule builder looks and behaves the same regardless of source type. Same layout, same interaction pattern. What changes is the **condition vocabulary** — the dropdowns offer different metadata fields depending on source type.

- PDF: Font size, Position, Color, Page, Font name
- Markdown: Heading level, Contains text
- Word: Style name, Contains text
- Web: CSS selector, Element type, Class name

### 7. Markdown as late-stage transform (not extraction output)

**Change from current:** Extraction converts content to markdown during extraction. Once it's markdown, metadata is lost.

**New approach:** Extraction produces rich structured data. Markdown conversion happens as a **transform during mapping** — when writing to a destination field that needs it. Markdown becomes a cleanup/normalization step applied at the point of writing, not at the point of reading.

This means:
- Extracted data stays queryable and re-processable
- Different destination fields can receive different formats from the same source content (plain text for Title, HTML-via-markdown for Rich Text)
- The destination field type informs which transform to apply

### 8. Sections are groups, not flat strings

**Change from current:** A section like "accommodation" produces one concatenated string containing heading + body.

**New approach:** Sections are **groups of related elements**, individually addressable:

```json
{
  "key": "accommodation",
  "elements": [
    { "type": "heading", "content": "Accommodation", "metadata": {...} },
    { "type": "body", "content": "We stay four nights...", "metadata": {...} }
  ]
}
```

This enables mapping individual elements within a section to different block properties:
- `accommodation` heading → Block Title field
- `accommodation` body → Block Rich Text field

No combining then re-splitting.

### 9. Separation of concerns preserved

Conditions (how to find content) and actions (where to put it) remain separate concerns, separately editable, stored in separate files. This matters because:
- AI might generate the rules — users need to edit them independently
- Source configs and map configs have different lifecycles
- The three-file architecture enables different authoring modes (manual, AI-assisted, hybrid)

The UI presents a unified experience, but the underlying storage maintains separation.

### 10. Scope boundaries

- **No images** — not extracting images from any source type at this stage
- **No tables** — too complex to extract reliably, especially from PDFs
- **Text content only** — headings and body text, organised into sections
- **Two user roles:** Workflow author (Settings section, admin) and Content editor (Content section, uses workflows without seeing configuration)

### 11. Destination auto-populate from blueprint content (not document type)

**Bug discovered (Feb 2026):** The `DestinationStructureService` was building destination structure from the full document type (all compositions, all property groups, all allowed block types). This showed every field and every possible block — not what the blueprint actually contains.

**Correct behaviour:** The destination must reflect the **actual blueprint content**, not the document type definition. The blueprint is the content blueprint — it defines the specific arrangement of fields and blocks for this workflow.

**Filtering rules:**
- **Properties:** Include only properties that (a) have a value populated in the blueprint AND (b) have a text-mappable property editor (text, textarea, richText). Excludes media pickers, image croppers, etc. even if populated.
- **Page Settings tab:** Exclude entirely. Nothing from source documents maps to page settings.
- **Blocks:** Read the blueprint's actual block grid content value. Only include block instances that are placed in the blueprint's grid — not all block types the editor allows. Each block's text-mappable inner properties are listed.
- **Block labels:** Pull a human-readable identifier from each block instance (e.g., its title property value) for display in the UI.

**Implementation:** Load the actual blueprint content via `IContentService.GetById(blueprintId)` instead of just reading the document type definition.

### 12. Conditions location in three-tab model

**Conditions** (extraction rules — how to find content in a source) are fundamentally a **source-side concern**. They are stored in `source.json` and describe how to locate specific content in a source document.

**Auto-population varies by source type:**
- **PDF:** Richest metadata — PdfPig provides font size, position, color, page number. Conditions auto-populate when the workflow author picks content from the sample extraction.
- **Markdown:** Some auto-population possible — heading levels, code blocks, syntax patterns.
- **Web:** Largely manual — CSS selectors, element types. User defines conditions.
- **Word:** Some auto-population — document style names (Heading 1, Normal).

**Where conditions surface in the UI** — to be decided. Options:
1. **Source tab only:** Conditions edited alongside source content. Keeps separation of concerns clean.
2. **Inline during mapping flow:** When mapping from the Destination tab, conditions appear after selecting source content for review/tweaking, but "live" on the Source tab.
3. **Map tab:** Each mapping row shows source + conditions + destination for a complete picture.
4. **Combination:** Conditions auto-populate during mapping (from either direction), are visible on the Map tab, and are fully editable on the Source tab.

This decision is **parked for now** — the right answer will become clearer once the three-tab structure is built and we can test the flows.

---

## Implementation Phases

### Phase 1: Planning document
Capture all decisions. Done.

### Phase 2: Create Workflow refactoring — stepped flow + per-source-type workflows — COMPLETE

Synchronise the "Create Workflow" flow (Settings) with the "Create from Source" flow (Content). Both use the same stepped pattern: **blueprint picker dialog → sidebar modal**. The only difference is what "Create" does — one creates a document, the other creates a workflow folder on disk.

This is a UX and storage refactoring. **Does not require rich extraction yet.**

#### Design decisions

- **Separate components, not shared**: `create-workflow-sidebar` is a new component that *mirrors* `up-doc-modal` visually but is purpose-built for workflow creation. No mode switching, no shared base class.
- **Blueprint picker reused unchanged**: The existing `UMB_BLUEPRINT_PICKER_MODAL` works for both flows — it takes `DocumentTypeOption[]` and returns `{ blueprintUnique, documentTypeUnique }`. For Create Workflow, the document type options come from `/updoc/document-types` + `/updoc/document-types/{alias}/blueprints` (existing endpoints), NOT from allowed-children filtering (that's Content section logic).
- **Source type chosen during creation**: The sidebar includes a source type dropdown. Source type becomes part of the folder name (`group-tour-pdf`, `group-tour-markdown`). This supersedes the earlier plan to choose source type inside the workflow after creation.
- **Static source type list**: Since no workflow config exists yet during creation, source types come from a hardcoded list (`pdf`, `markdown`, `web`, `doc`) — same as the current `up-doc-modal` approach.
- **No extraction during creation**: The sidebar has a source type dropdown and conditional file picker (same visual as Create from Source), but extraction does not run. The file picker is **not shown** in Phase 2 — it has no purpose until sample extraction is implemented (Phase 3). Only the source type dropdown is needed.
- **Workflow name auto-generated**: `{kebab-case-blueprint-name}-{sourceType}` (e.g. `group-tour-pdf`). Editable by the user.

#### Feature branches

This is a large refactoring. Split into sequential branches:

1. **`feature/create-workflow-sidebar`** — Steps 1-3, 6-7: New sidebar + blueprint picker reuse + delete old modal. Backend unchanged (sourceType not sent yet, backwards compatible). **STATUS: COMPLETE** (merged to main, commit `252c100`)
2. **`feature/workflow-source-type`** — Steps 4-5, 8: Backend sourceType support, new file naming, backwards compat, collection view source column. **STATUS: COMPLETE** (merged to main, commit `9cfb230`)
3. **`feature/remove-source-tabs`** — Step 9: Replace per-source-type workspace views with generic Source tab. **STATUS: COMPLETE** (merged to main, commit `5e03711`)

#### Step-by-step details

**Steps 1-3, 6-7** (Branch 1 — COMPLETE): New sidebar token, sidebar element, collection view refactored to use stepped blueprint picker → sidebar flow, manifest updated, old modal files deleted.

**Steps 4-5, 8** (Branch 2 — COMPLETE): Backend accepts sourceType, creates simple-named files, backwards-compatible reading of both formats, collection view Source column with capitalized labels.

**Step 9** (Branch 3 — COMPLETE): Replaced hardcoded Markdown/Pdf workspace views with a single generic "Source" tab. Source type detected dynamically from workflow config. Every workflow shows two tabs: Source + Destination.

### Phase 3: Rich extraction data model — COMPLETE

- ~~Design JSON schema for metadata-rich extraction output~~ — Done (commit `e222d64`)
- ~~Modify `PdfPagePropertiesService` to produce rich format (PDF has richest metadata)~~ — Done (commit `8737fa3`)
- ~~Store sample extraction as new file in workflow folder~~ — Done (API saves to `sample-extraction.json`)
- ~~API endpoint changes to return rich format~~ — Done (`POST /workflows/{name}/sample-extraction`, `GET /workflows/{name}/sample-extraction`)
- Validate with markdown extraction service — **Deferred** (markdown source type not yet prioritised)

**Destination auto-populate:** `DestinationStructureService` builds `destination.json` from actual blueprint content. Initial implementation commit `c2feb20`, bug fix commit `b826817` (used `CompositionPropertyTypes` for element types in block grids).

**Key files:**
- `src/UpDoc/Services/PdfPagePropertiesService.cs`
- `src/UpDoc/Services/DestinationStructureService.cs`
- `src/UpDoc/Models/` — `RichExtractionResult`, `DestinationConfig`, etc.
- `src/UpDoc/Controllers/WorkflowController.cs` — sample extraction + regenerate-destination endpoints

### Phase 4: Bidirectional mapping UI (three-tab workspace) — IN PROGRESS

Rebuild the workflow workspace to support bidirectional mapping via three tabs.

#### Phase 4a: Map tab + save endpoint — COMPLETE (commit `5d93d23`)

- Map workspace view showing all mappings from map.json
- Delete individual mappings
- `PUT /workflows/{name}/map` endpoint to save map.json

#### Phase 4b: Source-to-destination mapping POC — COMPLETE (branch `feature/source-mapping-poc`)

**Source tab** (source-to-destination direction):
- ~~Show sample extraction content with metadata~~ Done
- ~~Each element shows mapping status (green badge with destination label, green left border)~~ Done
- ~~Multi-select elements with checkboxes~~ Done
- ~~"Map to..." button opens destination picker sidebar~~ Done
- ~~Destination picker shows fields + block properties organised by tabs~~ Done
- ~~Mapping saved to map.json via PUT endpoint~~ Done
- ~~Checkbox accessibility labels~~ Done

**Bug fixes in this branch:**
- `GetByName` endpoint used `GetAllConfigs()` which validated and rejected partially-complete workflows. Added `GetConfigByName()` that loads directly without validation.
- `ValidateConfig` used `field.Key` (GUIDs) but map.json targets use `field.Alias` ("pageTitle"). Fixed to use aliases.

**New files:**
- `destination-picker-modal.element.ts` — sidebar modal for picking destination fields
- `destination-picker-modal.token.ts` — modal token

#### Phase 4c: Bridge + remaining mapping work — BRIDGE COMPLETE

**Bridge between workflow authoring and content creation — COMPLETE (Feb 2026):**
Branch `feature/bridge-extraction`, commit `be2caa7`. Switched Create from Source modal to use `extractRich()` instead of `extractSections()`, building an element ID → text lookup that matches map.json source keys. Added `mappedFields` tracking so first write replaces blueprint defaults, subsequent writes concatenate (for multi-element fields like split titles). Content tab now shows destination field labels with assembled values from the mapping. Verified end-to-end: Page Title = "Flemish Masters – Bruges, Antwerp & Ghent" (two elements concatenated), Page Description = "5 days from £1,199 Departing 30th September 2026".

**Destination tab** (destination-to-source direction) — NOT STARTED:
- Show blueprint structure: fields + blocks (filtered per Decision #11)
- Visual indicators for mapped vs unmapped fields
- Click field → picker shows sample extraction content → select source element(s) → mapping created

**Map tab improvements — NOT STARTED:**
- Table layout needs work (currently weird spacing for many items)
- Edit mappings (not just delete)
- Reorder mappings

**Mapping status indicators on Destination and Source tabs — NOT STARTED:**
- Destination tab: show which fields are mapped (green) vs unmapped
- Source tab: mapping indicators already exist but need polish

### Phase 5: Condition refinement
- Rule builder UI for editing auto-populated conditions
- Add/remove conditions (Outlook-style rows)
- Source-type-specific condition dropdowns
- Test/preview: run extraction against sample, show what matches

---

## Verification

Each phase should be testable independently:

- **Phase 2:** Click "Create Workflow" in Settings → UpDoc → Workflows. Verify blueprint picker dialog opens (doc type → blueprint). Verify sidebar opens with workflow name (auto-generated as `{blueprint}-{sourceType}`) and source type dropdown. Select PDF, click Create. Verify workflow folder created on disk with `source.json`, `destination.json`, `map.json`. Verify collection view shows new workflow with Source column. Verify old `group-tour` folder still loads correctly (backwards compatibility). Verify Markdown/Pdf tabs no longer appear on workflow workspace.
- **Phase 3:** ~~Extract a PDF via API, verify response includes full metadata per text element. Check sample extraction file is created in workflow folder.~~ VERIFIED — sample extraction works end-to-end including persistence. Destination auto-populate verified with both Page Properties fields (3) and Page Content block grid (3 blocks with text-mappable properties).
- **Phase 4:** Open a workflow, verify three tabs (Destination, Map, Source). On Destination tab: see filtered fields/blocks from blueprint with map icons; click map icon, see sample content in picker; select content, verify mapping created in map.json. On Source tab: see sample extraction elements with metadata; click element, see destination field picker; select field, verify mapping created. On Map tab: see all mappings; edit/delete a mapping; verify changes reflected on other tabs.
- **Phase 5:** Edit conditions in rule builder. Re-extract sample, verify matching reflects changes.

---

## Open Questions (for future sessions)

1. **~~Map file per source type?~~** RESOLVED: Separate folders per workflow (Option B). Each folder is self-contained with simple file names (source.json, destination.json, map.json, sample-extraction.json). Destination file is auto-generated from blueprint and regenerated when blueprint changes.

2. **~~Create Workflow modal changes:~~** RESOLVED (updated): The all-in-one dialog is replaced with a **stepped flow mirroring Create from Source**: blueprint picker dialog → sidebar modal. Source type is chosen DURING creation in the sidebar (not inside the workflow after creation). The sidebar collects workflow name + source type. Folder name incorporates source type (e.g. `group-tour-pdf`). See Phase 2 for full implementation details.

3. **~~Folder structure:~~** RESOLVED: One folder per workflow (per-source-type). Example: `group-tour-pdf/`, `group-tour-markdown/`. Each self-contained with `source.json`, `destination.json`, `map.json`, `sample-extraction.json`.

4. **Sample extraction lifecycle:** When does a sample get re-extracted? Only on manual trigger? When source config changes? What if the sample PDF is deleted from media?

5. **Transforms vocabulary:** "Convert to markdown" is one transform. What others are needed? Strip HTML? Truncate? Regex replace? These are the "actions" in the Outlook analogy.
