# Next Session

## Where We Are

Branch `feature/workflow-friendly-names` — Sprint 2 (Friendly Names + Alias Handling) committed (`ee86c54`). Workflows now have Umbraco-style name/alias separation: friendly display names in collection view, camelCase aliases as identifiers, editable name/alias in workspace header via `umb-input-with-alias`, startup migration renames folders from kebab-case to camelCase.

### Recently Completed

- **Organiser Block List** (`0752794` on main) — repeatable Block List on Tour Properties tab, full pipeline support
- **Block Grid Separation** (`eff7402`) — per-document-type block grids
- **Sprint 1: workflow.json identity files** (`3857bd6`) — identity metadata in each workflow folder
- **Sprint 2: Name/Alias separation** (`ee86c54`) — friendly names, camelCase aliases, editable header, alias column, migration

### Branch Status

`feature/workflow-friendly-names` needs merging to `main`. The `.generated.cs` model files have unstaged changes (Umbraco model builder regeneration) — these are test site files, not UpDoc code.

## Next: Workflow Folder Restructure

**Full plan:** `planning/WORKFLOW_RESTRUCTURE.md`.

Restructures flat workflow files into `source/`, `destination/`, `map/` subfolders:

```
groupTourPdf/
  workflow.json
  source/source.json, sample-extraction.json, area-detection.json, transform.json, area-template.json
  destination/destination.json
  map/map.json
```

Only `WorkflowService.cs` needs path changes — all file I/O is centralised there. Low risk, well-contained. API contract unchanged — frontend mostly unaffected.

## Parked Items

- Delete "Block Grid - Group Tour [Old]" data type from backoffice (safe, fully unreferenced)
- Some PDF transform rules (Tel:/Email: text replacements on organiser fields) were lost during a git merge — may need re-creating in the rules editor
- Persist area exclusions to source.json (web sources)
- Web-specific rules (parent container context, heading-scoped content)
- Button label consistency, Transformed heading cleanup, strategy badge contrast
- Destination-driven mapping (Phases 2-5) — see `planning/DESTINATION_DRIVEN_MAPPING.md`
