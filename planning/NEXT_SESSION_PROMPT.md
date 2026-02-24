# Next Session: Block Grid Separation + Organiser Block List

## Where We Are

Branch `feature/organiser-block-list` — mockup committed. Main is up to date with consistent source tabs merged.

## Priority 1: Split Shared Block Grid Data Type

**Problem:** Both "Group Tour - Content" and "Tailored Tour - Content" compositions use the same Block Grid data type (`Block Grid - Group Tour`, alias `contentGridTour`). As the two tour types diverge, they need different allowed blocks — e.g., Tailored Tours will need an Organiser block that Group Tours don't.

**Steps:**
1. Duplicate `Block Grid - Group Tour` → `Block Grid - Tailored Tour` (new data type)
2. Update "Tailored Tour - Content" composition to use the new data type
3. Verify existing Tailored Tour content still renders correctly

This is a manual task in the Umbraco backoffice (Settings > Data Types), not a code change.

## Priority 2: Organiser Block List on Tour Properties

**Design decided (see mockup `mockups/tour-properties-organiser.html` and Figma file `ZE8800trGvmQldnKeDq1Hy` node `30:2`):**

- **Repeatable Block List** on Tour Properties tab (replacing current flat fields)
- Each block has 5 fields: Organisation (text, required), Contact Name (text, optional), Telephone (text, optional), Email (email with validation, optional), Address (textarea, optional)
- Block title shows org name + contact name when present
- **Red icon** when contact name is missing (validation indicator — designed in Figma)
- Single organiser extracted from PDF automatically; editor manually adds second for ~2% multi-organiser edge case
- Template handles "Organiser" vs "Organisers" heading based on block count

**Steps:**
1. Create Organiser element type with the 5 fields
2. Remove the old flat fields from Tour Properties composition
3. Add Block List property using the Organiser element type
4. Re-enter the one test document's data into the new block

## Also Note

- Some PDF transform rules (Tel:/Email: text replacements on organiser fields) were lost during a git merge — may need re-creating in the rules editor
- The `source.json` file contains the rules (`areaRules` property) — be careful with git operations overwriting browser-saved rule changes

## Parked Items

- Persist area exclusions to source.json (web sources)
- Web-specific rules (parent container context, heading-scoped content)
- Button label consistency, Transformed heading cleanup, strategy badge contrast
- Destination-driven mapping (Phases 2-5) — see `planning/DESTINATION_DRIVEN_MAPPING.md`
