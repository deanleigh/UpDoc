# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — Section Builder Phase 1

### Where we left off

Main branch is up to date (commit `0237608`). The area rules pipeline is complete and verified end-to-end:

- **Define Areas** on PDF pages (spatial boundaries + names)
- **Define Structure** within areas — rules match elements by conditions and assign role names
- **Transform** produces individually-mappable sections from matched elements
- **Map** sections to destination fields (source-driven mapping)
- **Create from Source** correctly populates Page Title, Description, block content

The group-tour-pdf workflow has 3 area rules for Page Header (Organisation, Tour Title, Tour Description) with mappings to destination fields. Liverpool PDF tested successfully.

### Key insight: three concerns

Three separate concerns were being conflated in the rules editor:
- **Markup** — semantic structure (heading, list, paragraph)
- **Role** — content identity (tour title, features)
- **Mapping** — CMS field wiring (pageTitle, richTextContent)

Adding an **action** to each rule separates these. Full design in `planning/SECTION_BUILDER.md`.

### What to do next

#### Phase 1: Add action dropdown (minimal, no behaviour change)

1. Add `action` field to `SectionRule` (C# + TS), default `"createSection"`, backward compatible
2. Add action dropdown to rules editor modal — below conditions section
3. Options: Create section (default), Set as heading, Add as content, Add as list item, Exclude
4. No backend behaviour change — all actions still behave as `createSection`

This makes the rule structure complete (IF conditions THEN action) without breaking anything.

#### Phase 1b: UI improvements

5. Extracted tab should reflect rules — show composed sections instead of raw elements
6. Remove "+ Add another rule" button (prevents blank rules with no conditions)

#### Phase 2: Fix createSection mapping semantics

7. Role sections only expose `.content` in the Transformed view Map buttons (no `.heading` button)
8. Existing `.heading` mappings for role sections already handled (bridge redirects to content)

#### Phase 3: setAsHeading support (solves itinerary heading detection)

9. Transform layer: `setAsHeading` starts a new section, element text becomes heading
10. `addAsContent`/`addAsList` append to current section
11. State machine assembly logic in `ContentTransformService`

### Required reading

Before starting work, read these planning files (per CLAUDE.md session startup):
1. `planning/REFACTOR_TO_CONFIGURABLE.md`
2. `planning/CREATE_FROM_SOURCE_SIDEBAR.md`
3. `planning/CREATE_FROM_SOURCE_UI.md`
4. `planning/DESTINATION_DRIVEN_MAPPING.md`

And the key planning document for this work:
5. `planning/SECTION_BUILDER.md` — the three-concern model and action-based section composition

### Known issues (non-blocking)

- Umbraco "object cache is corrupt" on document delete — Umbraco core issue, restart fixes
- CS8602 warning in PdfPagePropertiesService.cs — nullable dereference
- Strategy badge contrast — pink on pink

### First action

Create branch `feature/section-builder` from `main` and implement Phase 1 (add action field + dropdown to rules editor).
