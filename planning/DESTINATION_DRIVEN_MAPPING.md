# Plan: Rich Extraction Format & Destination-Driven Mapping

## Context

Before building further UI for the workflow editor, we identified a fundamental limitation in the data architecture: extraction currently produces flat strings (text or markdown), which discards all metadata (font size, position, color, heading level). This prevents building a visual rule builder, makes mapping to compound destinations (blocks with multiple fields) clumsy, and forces markdown conversion too early in the pipeline.

This plan captures architectural decisions from a brainstorming session and outlines the implementation sequence. The goal is to enable **destination-driven mapping** where the workflow author sees the destination structure, clicks on a field, picks content from a sample extraction, and conditions auto-populate from metadata.

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

### 2. Destination-driven mapping

**Change from current:** The current UI shows source sections on separate tabs (PDF, Markdown) and destination fields on the Destination tab, with mapping wiring in a separate map.json. The workflow author must mentally connect these.

**New approach:** The workflow editor shows the **destination structure** (document type fields and blocks), and the workflow author maps from destination to source. They click on a destination field, pick content from the sample extraction, and conditions auto-populate.

**Flow:**
1. Open "Group Tour from PDF"
2. See destination structure: Page Properties (fields) + Page Content (blocks)
3. Click on a destination field (e.g., Accommodation > Title)
4. Side panel opens showing extracted sample content with metadata
5. Pick the right content element — conditions auto-populate from its metadata
6. Refine conditions if needed (e.g., disambiguate between two "Accommodation" occurrences)
7. Visual indicator shows mapped vs unmapped fields

**Destination structure** is auto-populated from the document type/blueprint — not manually entered. The blocks are listed as they appear in the editor, expandable to show their inner fields. Each field has a "map" action icon.

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

---

## Implementation Phases

### Phase 1: Planning document
Capture all decisions. Done.

### Phase 2: Create Workflow refactoring — stepped flow + per-source-type workflows

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
2. **`feature/workflow-source-type`** — Steps 4-5, 8: Backend sourceType support, new file naming, backwards compat, collection view source column. **STATUS: IN PROGRESS**
3. **`feature/remove-source-tabs`** — Step 9: Remove per-source-type workspace views from workflow editor. **STATUS: NOT STARTED**

#### Step-by-step details

**Steps 1-3, 6-7** (Branch 1 — COMPLETE): New sidebar token, sidebar element, collection view refactored to use stepped blueprint picker → sidebar flow, manifest updated, old modal files deleted.

**Steps 4-5, 8** (Branch 2 — IN PROGRESS): See separate plan file for detailed implementation.

**Step 9** (Branch 3 — NOT STARTED): Remove `UpDoc.WorkflowWorkspaceView.Markdown` and `UpDoc.WorkflowWorkspaceView.Pdf` from manifest. The workflow workspace shows Destination view only (the source configuration will be handled differently in Phase 4's destination-driven mapping UI). Delete or repurpose `up-doc-workflow-source-views.element.ts`.

### Phase 3: Rich extraction data model
- Design JSON schema for metadata-rich extraction output
- Modify `PdfPagePropertiesService` to produce rich format (PDF has richest metadata)
- Store sample extraction as new file in workflow folder
- API endpoint changes to return rich format
- Validate with markdown extraction service too

**Key files:**
- `src/UpDoc/Services/PdfPagePropertiesService.cs`
- `src/UpDoc/Services/MarkdownExtractionService.cs`
- `src/UpDoc/Models/` — new/modified models
- `src/UpDoc/Controllers/` — API changes

### Phase 4: Destination-driven mapping UI
- Rebuild workflow editor to show destination structure (fields + blocks)
- Blocks expandable to show inner properties
- "Map" icon on each field
- Side panel with sample extraction content picker
- Auto-populate conditions from selected element's metadata
- Visual indicators for mapped/unmapped fields
- Save conditions back to source config JSON, save mapping back to map JSON

**Key files:**
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/` — new workspace views
- Destination structure rendered from destination-blueprint.json
- Content picker panel (new component)
- Condition editor (new component)

### Phase 5: Condition refinement
- Rule builder UI for editing auto-populated conditions
- Add/remove conditions (Outlook-style rows)
- Source-type-specific condition dropdowns
- Test/preview: run extraction against sample, show what matches

---

## Verification

Each phase should be testable independently:

- **Phase 2:** Click "Create Workflow" in Settings → UpDoc → Workflows. Verify blueprint picker dialog opens (doc type → blueprint). Verify sidebar opens with workflow name (auto-generated as `{blueprint}-{sourceType}`) and source type dropdown. Select PDF, click Create. Verify workflow folder created on disk with `source.json`, `destination.json`, `map.json`. Verify collection view shows new workflow with Source column. Verify old `group-tour` folder still loads correctly (backwards compatibility). Verify Markdown/Pdf tabs no longer appear on workflow workspace.
- **Phase 3:** Extract a PDF via API, verify response includes full metadata per text element. Check sample extraction file is created in workflow folder.
- **Phase 4:** Open a workflow, see destination fields with map icons. Click map icon, see sample content in picker. Select content, verify conditions auto-populate. Save and verify JSON files updated.
- **Phase 5:** Edit conditions in rule builder. Re-extract sample, verify matching reflects changes.

---

## Open Questions (for future sessions)

1. **~~Map file per source type?~~** RESOLVED: Separate folders per workflow (Option B). Each folder is self-contained with simple file names (source.json, destination.json, map.json, sample-extraction.json). Destination file is auto-generated from blueprint and regenerated when blueprint changes.

2. **~~Create Workflow modal changes:~~** RESOLVED (updated): The all-in-one dialog is replaced with a **stepped flow mirroring Create from Source**: blueprint picker dialog → sidebar modal. Source type is chosen DURING creation in the sidebar (not inside the workflow after creation). The sidebar collects workflow name + source type. Folder name incorporates source type (e.g. `group-tour-pdf`). See Phase 2 for full implementation details.

3. **~~Folder structure:~~** RESOLVED: One folder per workflow (per-source-type). Example: `group-tour-pdf/`, `group-tour-markdown/`. Each self-contained with `source.json`, `destination.json`, `map.json`, `sample-extraction.json`.

4. **Sample extraction lifecycle:** When does a sample get re-extracted? Only on manual trigger? When source config changes? What if the sample PDF is deleted from media?

5. **Transforms vocabulary:** "Convert to markdown" is one transform. What others are needed? Strip HTML? Truncate? Regex replace? These are the "actions" in the Outlook analogy.
