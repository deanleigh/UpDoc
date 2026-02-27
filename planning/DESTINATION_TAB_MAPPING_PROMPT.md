# Next Work: Destination Tab Mapping

## Context

The blockKey reconciliation feature (Sprints 1-8) is complete and merged to main. This gave us:
- `contentTypeKey` on all map.json destinations (resilient block matching)
- Auto-reconciliation when destination.json is regenerated
- Validation warnings for orphaned mappings
- Visual indicators on both Map tab ("Orphaned" tag) and Source tab (warning-colour badges)
- 20/20 E2E tests passing

The Source tab already supports source-to-destination mapping (select elements, click "Map to...", pick a destination field). The **Destination tab** currently only shows the blueprint structure (fields + blocks) as a read-only view — no mapping interaction.

## What We Want

**Destination-driven mapping** on the Destination tab: click a destination field or block property, pick source content from the sample extraction, and create a mapping. This is the "I need to fill this field — where does the content come from?" direction.

## Planning Documents to Read

1. `planning/DESTINATION_DRIVEN_MAPPING.md` — the original design doc with the Outlook-rules-inspired approach
2. `planning/REFACTOR_TO_CONFIGURABLE.md` — overall architecture
3. The three-tab model is described in `planning/DESTINATION_DRIVEN_MAPPING.md` (Decision #2: Bidirectional mapping)

## Current State of the Three Tabs

| Tab | Status | What It Does |
|-----|--------|-------------|
| **Source** | Complete | Shows extracted content, "Map to..." button opens destination picker, mapping badges (green/orange) |
| **Map** | Basic | Shows all mappings grouped by destination, delete button, "Orphaned" tag for stale mappings |
| **Destination** | Read-only | Shows blueprint structure (info boxes + fields + block properties), no mapping interaction |

## Key Files

- `up-doc-workflow-destination-view.element.ts` — Destination tab component (read-only currently)
- `up-doc-workflow-source-view.element.ts` — Source tab (has the working mapping flow to reference)
- `destination-picker-modal.element.ts` — Destination picker sidebar (used by Source tab)
- `up-doc-workflow-map-view.element.ts` — Map tab
- `workflow.types.ts` — All TypeScript interfaces
- `workflow.service.ts` — API service layer

## Approach

The Destination tab needs a **source picker** — the inverse of the destination picker used by the Source tab. When the user clicks a destination field, a picker shows the sample extraction content so they can select which source element(s) map to that field.

This could be:
- A new `source-picker-modal` sidebar (mirrors `destination-picker-modal`)
- Inline expansion on the destination field (click to expand, show source elements)
- Reuse the existing extraction element list from the Source tab

The approach should be discussed and planned before implementation.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/destination-tab-mapping
```
