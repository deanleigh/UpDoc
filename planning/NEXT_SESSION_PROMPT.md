# Next Session: Persist Area Exclusions + Polish

## Where We Are

Branch `feature/consistent-source-tabs` — web area detection complete, Refresh button added, ready to commit and merge.

All three source types have consistent UI: Extracted/Transformed tabs, hierarchy rendering, info boxes, include/exclude toggles, and a dedicated Refresh button in the bottom bar.

## Priority: Persist Area Exclusions to source.json

**Problem:** Area include/exclude toggles are currently browser-only state (`_excludedAreas` Set in the TypeScript component). When the user excludes Navigation/Footer/Sidebar areas, those exclusions are lost on page reload. This makes the toggles feel broken.

**Solution:** Save excluded areas to `source.json` (same pattern as PDF page exclusion). When user toggles an area off:
1. Persist to `source.json` via API call
2. On page load, read exclusions from `source.json` and populate `_excludedAreas`
3. Transform pipeline should respect exclusions (only process included areas)

**Applies to:** Web sources (area exclusion) and potentially PDF sources (if not already persisted).

## Other Items

### Web-Specific Rules (planning notes in `WEB_AREA_DETECTION.md`)
- **Parent container class/ID as metadata** — capture `featuring_col1` / `featuring_col2` so rules can distinguish elements by container context
- **Heading-scoped content rules** — "all paragraphs after this heading, before the next heading"
- See `planning/WEB_AREA_DETECTION.md` > "Future: Web-Specific Rules" for details

### Polish
- Button label consistency across source types
- Transformed heading cleanup
- Strategy badge contrast (pink-on-pink)

### Destination-Driven Mapping (Phases 2-5)
- See `planning/DESTINATION_DRIVEN_MAPPING.md`
- Destination tab: click field → pick source content → mapping created
- Remaining Phase 4 work

## Key Files
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — `_excludedAreas` Set needs persistence
- `src/UpDoc/Controllers/WorkflowController.cs` — needs endpoint for saving/reading area exclusions
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.service.ts` — needs API call for exclusion persistence
