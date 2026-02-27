# Next Work: Destination Tab Mapping

## Context

The Change Destination feature is complete and merged to main (`feature/change-destination`). This gave us:
- Change Document Type and Change Blueprint buttons on Destination tab
- Destination regeneration with blockKey reconciliation
- Orphan detection working end-to-end (Source tab warning badges, Map tab orphaned tags)
- Test 02 workflow committed with deliberate orphaned Features mappings as a test harness

The Source tab already supports source-to-destination mapping (select elements, click "Map to...", pick a destination field). The **Destination tab** currently shows the blueprint structure (fields + blocks) with Change buttons — but no mapping interaction.

## What We Want

**Destination-driven mapping** on the Destination tab: click a destination field or block property, pick source content from the sample extraction, and create a mapping. This is the "I need to fill this field — where does the content come from?" direction.

Each destination field/property should show:
- **Mapped status** — green indicator when mapped, with source label
- **Unmapped status** — neutral indicator, clickable to create a mapping
- **Orphaned status** — warning indicator when the mapping's source no longer exists

## Test Harness

Test 02 workflow (`src/UpDoc.TestSite/updoc/workflows/test02/`) provides:
- 9 mappings in `map.json` (fields + block properties)
- 2 orphaned mappings (Features block removed from blueprint)
- Real PDF extraction with 4 areas, rules, transforms
- Complete `destination.json` reflecting current blueprint state

## Planning Documents to Read

1. `planning/DESTINATION_DRIVEN_MAPPING.md` — Phase 4 remaining work (Section 4c: Destination tab)
2. `planning/REFACTOR_TO_CONFIGURABLE.md` — overall architecture
3. `planning/CHANGE_DESTINATION.md` — what was just completed

## Current State of the Three Tabs

| Tab | Status | What It Does |
|-----|--------|-------------|
| **Destination** | Change buttons work, read-only structure | Shows info boxes (doc type, blueprint with Change buttons) + fields + block properties. No mapping interaction yet. |
| **Map** | Basic | Shows all mappings grouped by destination, delete button, "Orphaned" tag for stale mappings |
| **Source** | Complete | Shows extracted content, "Map to..." button opens destination picker, mapping badges (green/orange for orphaned) |

## Key Files

- `up-doc-workflow-destination-view.element.ts` — Destination tab component (needs mapping UI)
- `up-doc-workflow-source-view.element.ts` — Source tab (has the working mapping flow to reference)
- `destination-picker-modal.element.ts` — Destination picker sidebar (used by Source tab)
- `up-doc-workflow-map-view.element.ts` — Map tab
- `workflow.types.ts` — All TypeScript interfaces
- `workflow.service.ts` — API service layer
- `destination-utils.ts` — Helper functions for destination structure

## Approach

The Destination tab needs a **source picker** — the inverse of the destination picker used by the Source tab. When the user clicks a destination field, a picker shows the sample extraction content (transformed sections) so they can select which source element(s) map to that field.

This could be:
- A new `source-picker-modal` sidebar (mirrors `destination-picker-modal`)
- Inline expansion on the destination field (click to expand, show source elements)
- Reuse the existing extraction element list from the Source tab

The approach should be discussed and planned before implementation.

## Parked Items (do not include in this sprint)

- Map/Remap/Unmap button UX consolidation — user wants to think through button design separately
- Map tab improvements (edit mappings, reorder) — separate sprint
- Condition refinement / rule builder — Phase 5

## Branch

```bash
git checkout main
git pull
git checkout -b feature/destination-tab-mapping
```
