# Phase 4b: Source-to-Destination Mapping UI

## Context

Phase 4a (Map tab) is COMPLETE — the workflow workspace now has three tabs (Destination, Source, Map). The Map tab renders mappings from map.json with empty state, table view, and delete functionality.

Next: Enable creating mappings from the Source tab. The proof-of-concept target is mapping the split page title ("Flemish Masters –" + "Bruges, Antwerp & Ghent") to the Page Title field.

## Design Decisions (from discussion)

### Source-first mapping flow

1. Source tab shows extraction elements (already working — 400+ items with metadata badges)
2. Each element gets a **checkbox** for selection
3. When items are checked, a **toolbar** appears at the top of the element list showing selection count and a "Map to..." button
4. Clicking "Map to..." opens a **side panel** that slides out showing the destination structure — same Page Properties / Page Content tabs and block layout as the Destination tab, but with **checkboxes** on each field/property
5. User ticks destination field(s) → confirms → mapping created in map.json → visible on Map tab

### Why source-first (not destination-first)

- The **picker shows the short list**: ~6-8 destination fields vs 400+ source elements
- Destination-first means browsing 400 elements in a picker — harder UX, deferred to later
- The split title is a natural test case for multi-element-to-one-field mapping

### Toolbar pattern (not floating button)

- Toolbar at top of source element list (like Umbraco Users section: "Create >" / "Invite..." bar)
- Shows: selection count + "Map to..." action
- Greyed out when nothing selected, active when items are checked
- Avoids "remap everything" confusion that a bottom button would create
- Could later hold search/filter controls on the right side

### Side panel for destination picker

- Not a dropdown — reuses the same visual structure as the Destination tab
- Page Properties / Page Content inner tabs with checkboxes
- Familiar to the user — they already know this view
- Works bidirectionally later: same panel pattern for source picker from Destination tab

### Multi-element-to-one-field (split title)

When two source elements map to the same destination field:
- Default join: space-separated ("Flemish Masters – Bruges, Antwerp & Ghent")
- Schema supports a `join` property on the mapping for future configurability
- Map tab shows both elements pointing to the same field

## Implementation Steps

### Step 1: Add checkboxes to source elements

**File:** `up-doc-workflow-source-view.element.ts`

- Add `@state() _selectedElements: Set<string>` to track checked element IDs
- Add `<uui-checkbox>` to each element row
- Toggle element ID in/out of the set on change

### Step 2: Add toolbar to source view

**File:** `up-doc-workflow-source-view.element.ts`

- Render toolbar bar above the element list when `_selectedElements.size > 0`
- Shows: "{N} selected — Map to..."
- "Map to..." button opens the destination picker panel
- "Clear" button to deselect all

### Step 3: Create destination picker side panel

**New file:** Destination picker component (could be a modal or inline panel)

- Shows destination structure from `_config.destination` (fields + block grids)
- Same inner tab layout as Destination view (Page Properties / Page Content)
- Each field/property has a checkbox instead of the disabled "Map" button
- Confirm button creates the mapping

**Decision needed:** Should this be an Umbraco modal (sidebar) or an inline panel within the source view? Sidebar is cleaner and follows existing patterns. Inline panel avoids modal stacking.

### Step 4: Create mapping on confirm

When the user confirms in the destination picker:
1. For each selected destination field, create a `SectionMapping` entry in map.json
2. Source = element ID(s) from the source selection
3. Destination = field alias from the destination picker
4. Call `saveMapConfig()` to persist
5. Clear source selection
6. Map tab immediately shows the new mapping

### Step 5: Wire up the Map tab refresh

When mappings are created from the Source tab, the Map tab should reflect changes when the user switches to it. Since both views load from the API independently, this should work naturally (each tab loads fresh data). May need to clear the config cache.

## Proof of Concept Target

Map the split title from the Bruges/Antwerp/Ghent PDF:
1. Open `group-tour-pdf` workflow → Source tab
2. Check "Flemish Masters –" (p1-e2) and "Bruges, Antwerp & Ghent" (p1-e3)
3. Toolbar shows "2 selected — Map to..."
4. Click "Map to..." → side panel opens with destination structure
5. Check "Page Title" → confirm
6. Switch to Map tab → see two rows: p1-e2 → pageTitle, p1-e3 → pageTitle
7. (Optional) Also check "Page Title Short" → both elements map to both fields

## Map.json Schema for Element Mappings

Current schema has `source: string` (section key). For element-level mapping, this becomes the element ID from sample-extraction.json:

```json
{
  "mappings": [
    {
      "source": "p1-e2",
      "destinations": [{ "target": "pageTitle" }],
      "enabled": true
    },
    {
      "source": "p1-e3",
      "destinations": [{ "target": "pageTitle" }],
      "enabled": true
    }
  ]
}
```

This is compatible with the existing `SectionMapping` schema — `source` was already a string. Element IDs from sample-extraction.json are just a more granular source identifier.

## Files to Modify

| File | Change |
|------|--------|
| `up-doc-workflow-source-view.element.ts` | Add checkboxes, selection state, toolbar |
| NEW: destination picker component | Side panel with destination structure + checkboxes |
| `workflow.service.ts` | May need helper to add mapping to existing config |
| `manifest.ts` | Register picker modal if using Umbraco modal approach |

## Not in Scope

- Destination-first mapping (clicking Map on destination fields to browse source elements)
- Condition auto-population from metadata
- Transform configuration during mapping
- Search/filter in source element list
- Drag-and-drop reordering of mappings
