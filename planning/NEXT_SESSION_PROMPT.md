# Next Session: Organiser Block List

## Where We Are

Branch `feature/organiser-block-list` — block grid separation committed (`eff7402`). Each document type now has its own block grid property (`blockGridGroupTour`, `blockGridTailoredTour`). Old shared `contentGridTour` fully removed from code, uSync, workflows, and E2E tests. Old data type "Block Grid - Group Tour [Old]" still exists in backoffice database — delete it when ready.

## Priority 1: Organiser Block List on Tour Properties

**Design decided (see mockup `mockups/tour-properties-organiser.html` and Figma file `ZE8800trGvmQldnKeDq1Hy` node `30:2`):**

- **Repeatable Block List** on Tour Properties tab (replacing current flat fields)
- Each block has 5 fields: Organisation (text, required), Contact Name (text, optional), Telephone (text, optional), Email (email with validation, optional), Address (textarea, optional)
- Block title shows org name + contact name when present
- **Red icon** when contact name is missing (validation indicator — designed in Figma)
- Single organiser extracted from PDF automatically; editor manually adds second for ~2% multi-organiser edge case
- Template handles "Organiser" vs "Organisers" heading based on block count

**Steps:**
1. Create Organiser element type with the 5 fields
2. Create Block List data type using the Organiser element type
3. Remove the old flat fields from Tour Properties composition
4. Add Block List property to Tour Properties
5. Re-enter the one test document's data into the new block
6. Update Tailored Tour template to render Block List
7. uSync export

## Planned: Workflow Folder Restructure + Name/Alias Separation

**Full plan:** `planning/WORKFLOW_RESTRUCTURE.md`. Separate branch: `feature/workflow-restructure` (to be created from `main`).

Restructures flat workflow files into `source/`, `destination/`, `map/` subfolders. Adds `workflow.json` identity file with friendly name + alias. Fixes collection view showing aliases instead of display names. Only `WorkflowService.cs` needs path changes — low risk, well-contained.

## Also Note

- Some PDF transform rules (Tel:/Email: text replacements on organiser fields) were lost during a git merge — may need re-creating in the rules editor
- The `source.json` file contains the rules (`areaRules` property) — be careful with git operations overwriting browser-saved rule changes
- **Lesson learned this session:** When removing properties from document types, always migrate blueprint content to the new property FIRST, then delete the old one. We nearly lost blueprint block grid content.

## Parked Items

- Delete "Block Grid - Group Tour [Old]" data type from backoffice (safe, fully unreferenced)
- Persist area exclusions to source.json (web sources)
- Web-specific rules (parent container context, heading-scoped content)
- Button label consistency, Transformed heading cleanup, strategy badge contrast
- Destination-driven mapping (Phases 2-5) — see `planning/DESTINATION_DRIVEN_MAPPING.md`
