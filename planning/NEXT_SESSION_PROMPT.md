# Next Session

## Where We Are

All on `main`. Workflow restructure complete — the entire workflow pipeline is now clean:
- `workflow.json` identity files (Sprint 1)
- Umbraco-style name/alias separation (Sprint 2)
- `source/`, `destination/`, `map/` subfolder structure (Sprint 3)
- Legacy prefixed-file format and zone fallbacks removed
- E2E test fix for `transformed-view.spec.ts` (testhelpers `.settings` → `.content`)

### Recently Completed

- **Sprint 3: Subfolder restructure** (`320e368`) — files organised into source/destination/map subfolders, legacy code removed, migration Pass 3
- **Sprint 2: Name/Alias separation** (`ee86c54`) — friendly names, camelCase aliases, editable header, alias column, migration
- **Sprint 1: workflow.json identity files** (`3857bd6`) — identity metadata in each workflow folder
- **Organiser Block List** (`0752794`) — repeatable Block List on Tour Properties tab, full pipeline support
- **Block Grid Separation** (`eff7402`) — per-document-type block grids

## Next: Surface Organiser as Block Grid

The Organiser Block List backend is complete (extraction, mapping, content creation). Next step is surfacing organiser details in the destination/mapping UI — likely as a block grid representation so the workflow author can see and map organiser fields.

## Parked Items

- Some PDF transform rules (Tel:/Email: text replacements on organiser fields) were lost during a git merge — may need re-creating in the rules editor
- Persist area exclusions to source.json (web sources)
- Web-specific rules (parent container context, heading-scoped content)
- Button label consistency, Transformed heading cleanup, strategy badge contrast
- Destination-driven mapping (Phase 4 remaining + Phase 5) — see `planning/DESTINATION_DRIVEN_MAPPING.md`
