# Plan: Unified "Create from Source" Sidebar Modal

## Status: DESIGN FINALISED — Ready for implementation

---

## Finalised Design

### Workflow: Destination-first, source chosen in sidebar

1. User is on a parent content node (e.g., "Group Tours")
2. Clicks **"Create from Source"** entity action — document type is already determined by allowed children
3. **Sidebar modal** opens with:
   - **Document name** input (editable, pre-filled from extracted content)
   - **Blueprint picker** (always visible, pre-selected if only one — user can see/change which blueprint is used)
   - **Source type dropdown** (`<select>`, Content Picker Start Node pattern — populated from config)
   - **Conditional source UI** below dropdown (media picker for PDF, URL input for web, etc.)
   - **Extracted content preview/editor** (Markdown Editor for review and editing before creation)
   - **Create button**
4. Content is extracted from chosen source → mapped to the selected blueprint's fields
5. Document is created with mapped values

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Modal type | Sidebar (not dialog) | Avoids confusion with Umbraco's native "Create an item under..." dialog |
| Source type selection | `<select>` dropdown in sidebar | Content Picker Start Node pattern — compact, native, conditional UI below |
| Blueprint picker | Always visible, pre-selected if only one | User always sees which blueprint is being used; consistent UI regardless of blueprint count |
| Destination vs source first | Destination first | Blueprint defines the target structure; source is just "where content comes from" |
| Blueprint vs source relationship | Orthogonal | Same blueprint can accept content from PDF, web, or Word — source type is chosen at creation time, not tied to blueprint |
| Field mapping tolerance | Tolerant/null-safe | Extra extracted fields silently ignored; missing fields keep blueprint defaults |
| Content preview | Editable Markdown Editor | Users can review and fix extraction errors before document creation |
| Config boundary | Config file (dashboard later) | Maps allowed source types and field mappings per document type |
| Cancel behaviour | Closes everything | No "back to picker" flow |

### Field Mapping Strategy

- Blueprint defines what fields exist (e.g., 5 fields or 20 fields)
- Source extraction produces a set of key-value pairs
- Config maps extracted keys → document field aliases
- Fields in extracted data but not in blueprint → silently discarded
- Fields in blueprint but not in extracted data → keep blueprint/scaffold defaults
- The `setValue` helper already handles this pattern

### Source Type Dropdown (Content Picker Start Node Pattern)

Following Umbraco's Content Picker Start Node UI pattern:
- Native `<select>` dropdown for source type selection
- Options populated from config: "PDF", "Web Page", "Word Document", etc.
- Selecting an option reveals source-specific UI below:
  - **PDF** → `umb-input-media` picker
  - **Web Page** → URL input field
  - **Word Document** → file picker (future)
- Compact, single-select, clearly different from all picker dialogs

---

## Architecture

- **Single package** — not split into generic + client-specific
- **Config file** as customisation boundary (dashboard planned for later)
- **Source type is a workflow property** — a document is created from ONE source (PDF, web, etc.), not mixed
- **Blueprint and source type are orthogonal** — the same blueprint can accept content from any configured source type

---

## Previous State (for reference)

### Revert completed

Source picker dialog changes were reverted on `feature/create-from-source-entry-point` branch:
- `source-picker-modal.token.ts` and `source-picker-modal.element.ts` deleted
- `manifest.ts` and `create-from-pdf-action.ts` restored to original state
- Action currently opens PDF modal directly (original behaviour)

### Branch: `main` (reverted changes, feature branch merged/deleted)

---

## Implementation Steps

### Phase 1: Unified sidebar modal (replaces current PDF-only modal)

1. Create new sidebar modal element with the finalised layout:
   - Document name input
   - Blueprint picker (fetch available blueprints for the parent's allowed child doc types)
   - Source type `<select>` dropdown
   - Conditional source-specific UI (start with PDF media picker only)
   - Extraction status and preview area
   - Editable Markdown Editor for extracted content
2. Update modal token with new data/value interfaces
3. Update entity action to pass parent context to the new modal
4. Move document creation logic (scaffold, setValue, create API call) — keep in action or modal as appropriate
5. Update manifest
6. Build and test

### Phase 2: Config file for source types and field mappings

1. Define config file schema
2. Sidebar reads config to populate source type dropdown options
3. Field mapping driven by config rather than hardcoded aliases
4. Build and test

### Phase 3: Additional source types

1. Web page source: URL input + server-side extraction
2. Word document source: file picker + server-side extraction
3. Each source type is a new extraction pipeline, same mapping strategy

---

## Notes

- **Markdown Editor**: Umbraco has a built-in Markdown Editor property editor. Extracted Markdown content should be displayed in an editable Markdown Editor (not read-only textarea) so users can review and fix extraction errors before creating the document.
- **UUI Storybook reference**: https://uui.umbraco.com/ — `uui-popover` is deprecated, `uui-popover-container` is its replacement
- **Weight issue**: Entity action `weight: 1100` may cause our action to appear on the + button for some pages (observed on Home page). May need to lower weight or add conditions.

---

## Umbraco Native Patterns Reviewed

| Pattern | Location | Type | Fit? |
|---------|----------|------|------|
| Compositions | Document Type sidebar | Multi-select tree | No — multi-select |
| Templates | Document Type Templates tab | Choose button picker | No — multi-select |
| Media start node | User settings | Card grid | No — multi-select |
| Granular permissions | User group → Choose Document Type | Tree browser | No — hierarchy navigation |
| Create dialog | Content tree + button / context menu | `uui-dialog-layout` + `uui-ref-node-document-type` | No — too similar to ours |
| Blueprint selection | Create dialog step 2 | `uui-menu-item` list | Possible — but for a different purpose |
| Content Picker Start Node | Property editor config | Native `<select>` dropdown with conditional UI below | **YES — best fit for source type** |

### Design Evolution

- **Model A** (dropdown in sidebar): Source type chosen at creation time via dropdown — **ADOPTED** for source type selection
- **Model B** (source type per blueprint): Rejected — same blueprint can serve multiple source types, would cause duplication
- **Model C** (different blueprints per source): Rejected — blueprints define document structure, not source origin; would duplicate blueprints unnecessarily
- **Final model**: Destination-first with orthogonal blueprint + source type selection, both in a single sidebar modal
