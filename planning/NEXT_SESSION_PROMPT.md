# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — Section Builder Phase 1b (Extracted Tab Reflection)

### Where we left off

Branch `feature/section-builder` (commit `384133c`). Phase 1 of the Section Builder is complete:

- **Action dropdown** added to the rules editor modal — Create section, Set as heading, Add as content, Add as list item, Exclude
- **Backward compatible** — rules without `action` field default to `"createSection"` in C# and TypeScript
- **Planning docs consolidated** — 6 completed/superseded docs archived to `planning/archive/`
- `planning/SECTION_BUILDER.md` is the single active planning doc for this feature

### Current state of the group-tour-pdf workflow

The workflow has area rules defined for two areas:

**Page Header** (3 role rules → 3 createSection sections):
- Organisation ("The Arts Society Kingston presents")
- Tour Title ("The Art & History of Liverpool")
- Tour Description ("5 days from £814...")

**Organiser Info** (4 role rules → 4 createSection sections):
- Organiser Name ("Robin Linnecar")
- Organiser Telephone ("Tel: 020 8942 1558")
- Organiser Email ("Email: linnecar@btinternet.com")
- Organiser Address ("81 Alric Avenue, New Malden KT3 4JP")

All 7 role sections appear correctly in the Transformed view. The remaining sections (Features, What We Will See, Accommodation, etc.) come from the auto-detect pipeline (heading detection by font size).

### What to do next

#### Phase 1b: Extracted tab reflection

The Source tab has two inner views: **Elements** (raw extraction) and **Transformed** (assembled sections). Currently the Elements view shows areas with raw element counts but doesn't reflect the rules that have been defined.

**Goal:** After rules are saved and the transform re-runs, the Elements view should show the composed sections within each area, not just raw element lists.

**Before (current — flat area, no rules reflected):**
```
Page Header  [Flat]  [1 section, 3 elements]  [Redefine]
  └── Content
        The Arts Society Kingston presents
        The Art & History of Liverpool
        5 days from £814...
```

**After (with createSection rules reflected):**
```
Page Header  [3 sections]  [Redefine]
  ├── Organisation          "The Arts Society Kingston presents"
  ├── Tour Title            "The Art & History of Liverpool"
  └── Tour Description      "5 days from £814..."
```

**After (heading-delimited area, with setAsHeading rule — future Phase 3):**
```
Tour Details  [4 sections]  [Define Structure]
  ├── Features              HEADING + 7 items
  ├── What We Will See      HEADING + 5 items
  ├── Accommodation         HEADING + 3 items
  └── Extras                HEADING + 2 items
```

This is purely a UI change to the Elements view within the Source tab. No backend changes needed — the transform.json already has the section data.

#### Phase 2: Fix createSection mapping semantics

- Role sections (from createSection rules) only expose `.content` as a mappable source, not `.heading`
- The `.heading` for role sections currently resolves to the role name (e.g., "Tour Title") instead of the actual document text — this is a known bug
- Bridge code: for role sections, `sectionLookup["{id}.content"]` = element text
- Update existing map.json entries that use `.heading` for role sections
- Vacuous truth: only skip empty-condition rules with `createSection` action

#### Phase 3: setAsHeading support (solves itinerary heading detection)

- Transform layer: `setAsHeading` starts a new section, element text becomes heading
- `addAsContent`/`addAsList` append to current section
- State machine assembly logic in `ContentTransformService`
- This solves the itinerary problem: Day 1-5 headings are same font size as body but different font

### Required reading

Before starting work, read these planning files (per CLAUDE.md session startup):
1. `planning/REFACTOR_TO_CONFIGURABLE.md`
2. `planning/CREATE_FROM_SOURCE_SIDEBAR.md`
3. `planning/CREATE_FROM_SOURCE_UI.md`
4. `planning/DESTINATION_DRIVEN_MAPPING.md`

And the key planning document for this work:
5. `planning/SECTION_BUILDER.md` — the three-concern model and action-based section composition

### Key source files for Phase 1b

- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Source tab (Elements + Transformed inner views)
- `src/UpDoc.TestSite/updoc/workflows/group-tour-pdf/transform.json` — current transform output with sections
- `src/UpDoc.TestSite/updoc/workflows/group-tour-pdf/source.json` — area rules with role definitions

### Known issues (non-blocking)

- Umbraco "object cache is corrupt" on document delete — Umbraco core issue, restart fixes
- CS8602 warning in PdfPagePropertiesService.cs — nullable dereference
- Strategy badge contrast — pink on pink
- uSync content files from test runs (`5-days-from-814...`, `6-days-from-994...`) — test artifacts, untracked

### First action

Continue on branch `feature/section-builder` and implement Phase 1b (extracted tab reflection showing composed sections from rules).
