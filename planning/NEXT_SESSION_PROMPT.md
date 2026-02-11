# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — Improve Mapping Interface

### Where we left off

Branch `feature/bridge-extraction` (commit `be2caa7`) bridges workflow authoring to content creation. The end-to-end flow now works:

1. **Workflow author** (Settings) creates mappings using the Source tab — selects PDF elements and maps them to destination fields. Mappings stored in `map.json` with element IDs like `p1-e2`.
2. **Content editor** (Content section) clicks "Create from Source" → picks blueprint → picks PDF → UpDoc extracts content using rich extraction, looks up element IDs from `map.json`, populates the scaffold, creates the document.
3. **Verified:** Title split across two PDF lines ("Flemish Masters –" + "Bruges, Antwerp & Ghent") correctly concatenated. Page Description correctly populated. Blueprint defaults replaced (not prepended).

### Current state

- `feature/bridge-extraction` is pushed but NOT merged to `main` yet
- The old `group-tour` workflow (5 mappings, section-key format) is kept for reference — it doesn't interfere
- The `group-tour-pdf` workflow (3 element-ID mappings) is the active one

### What needs doing next

The mapping interface needs improvement. Read `planning/DESTINATION_DRIVEN_MAPPING.md` (Phase 4c section) for the full spec. Remaining work:

1. **Destination tab — destination-to-source mapping flow**
   - The Destination tab currently shows fields and blocks but has NO mapping indicators
   - Need: green/mapped vs grey/unmapped visual status per field
   - Need: click a field → picker shows source elements from sample extraction → select element(s) → mapping created
   - This is the reverse direction of what Phase 4b built (source-to-destination)

2. **Map tab layout improvements**
   - Current layout is awkward and won't scale with many mappings
   - Needs better table/grid layout
   - Edit mappings (not just delete)
   - Reorder mappings

3. **Mapping status indicators**
   - Destination tab: show which fields are mapped vs unmapped
   - Source tab: mapping indicators exist but need polish

### Known issues / polish items
- Strategy badge contrast: `.section-strategy` pink-on-pink, unreadable
- PDF page selection: currently extracts all pages, needs page picker
- Block Preview bug in blueprints ("Insufficient data for block preview")
- Unmapped fields keep blueprint defaults during Create from Source — decide later whether to clear them

### Key files to understand
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Source tab with mapping
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-destination-view.element.ts` — Destination tab (needs mapping additions)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-map-view.element.ts` — Map tab
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/destination-picker-modal.element.ts` — Destination picker sidebar
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-action.ts` — Create from Source action (bridge complete)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-modal.element.ts` — Create from Source modal (now uses rich extraction)

### First action
Merge `feature/bridge-extraction` to `main`, then create a new feature branch for whatever we tackle next.
