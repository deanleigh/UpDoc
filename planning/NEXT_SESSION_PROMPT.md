# Next Session

## Where We Are

All on `main`. Pipeline complete end-to-end. Test site now doubling as client dev environment.

### Recently Completed

- **Organiser Block Grid Item** (`25a684d`) — "Feature - Page - Organisers" element type for Tailored Tour block grid. Groups by organisation, Contact/Tel/Email/Address display. No configuration — template reads from parent document's Block List via `ITourProperties`.
- **uSync Migration Docs** (`b0b4666`) — Planning doc + GitHub Pages deployment section covering full import workflow, blueprint considerations, multi-site setup.
- **Test Content** (`be6cf94`) — Multiple tailored tour pages created via UpDoc extraction, blueprint updated with `[Page Title]` placeholder convention.
- **Workflow Folder Restructure** (Sprints 1-3) — `workflow.json` identity, name/alias separation, `source/`/`destination/`/`map/` subfolders, legacy cleanup.
- **Block Grid Separation** (`eff7402`) — per-document-type block grids.

## Current Focus: Client Site Portability

Test site content is being prepared for deployment to the client's real site via uSync. Key findings:
- uSync import works but requires correct order: .cshtml files first, then single-pass import
- Blueprints are fragile — GUID clashes on partial imports
- Blueprint Block Preview doesn't resolve parent document properties (Umbraco limitation)
- `[Placeholder]` convention adopted for blueprint default text

A separate prototype site (`tailored-travel-prototype-02`) has been set up to test imports. See `planning/USYNC_MIGRATION.md`.

## Next: Choose Direction

1. **Destination-driven mapping UI** (Phase 4 Destination tab) — click a destination field to pick source content. Completes the bidirectional mapping story. See `planning/DESTINATION_DRIVEN_MAPPING.md`.
2. **HTML/Web source improvements** — not urgent.
3. **Blueprint placeholder cleanup** — replace real content in blueprints with `[Placeholder]` text so extracted content is clearly distinguishable.

## Known Bugs

- **ValidateConfig warnings** — startup WARN messages about map.json sources not found in source.json. Cosmetic only, pre-existing. See `memory/known-bugs.md`.
- **PDF transform rules lost** — Tel:/Email: text replacements on organiser fields lost during a git merge.

## Parked Items

- Persist area exclusions to source.json (web sources)
- Web-specific rules (parent container context, heading-scoped content)
- Button label consistency, Transformed heading cleanup, strategy badge contrast
- Two-way data binding between document properties and block grid element properties (explored but parked)
