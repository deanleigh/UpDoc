# Source View Improvements — COMPLETE

Small, incremental display improvements to the Source tab (Extracted view) to make the Page → Area → Section → Text hierarchy visually clear and honest, while aligning with standard UUI/Umbraco patterns.

**Branch:** `feature/extraction-hierarchy-docs`
**Primary file:** `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts`

---

## Completed Tasks

All tasks from the original plan have been completed, plus additional hierarchy improvements.

### UUI Alignment

- **Task 8** — Inner tab bar consistency. Source view tabs now match Destination view tabs exactly: `slot="header"` on `umb-body-layout`.
- **Task 7** — Stat boxes (Pages, Zones, Sections, Source) in scrollable content area. Re-extract button in header alongside tabs, following Document Type editor pattern.

### Hierarchy Display

- **Task 1** — Area-level counts show sections (not elements).
- **Task 2** — Redundant diagnostics footer removed (stat boxes cover it).
- **Task 3** — SKIPPED. User prefers "areas" terminology (used for destination groupings too).
- **Task 4** — Text type labels: each text element shows List or Paragraph badge.
- **Task 5** — Visual nesting improved: increased indentation at zone and section levels.
- **Task 6** — Section text counts say "N texts" (not "N items").

### Collapsible Hierarchy (additional work)

- **Pages** collapsible via chevron in `header-actions` slot of `uui-box`. Shows area count.
- **Areas** are now a proper named level: "Area 1", "Area 2", etc. Each has its own collapse toggle.
- **Undefined** bucket for unzoned content (replaces "Unzoned"). Italic, dimmed styling.
- **Sections** — chevron moved to rightmost position (after count). Consistent across all sections.
- **Preamble sections** now collapsible (weren't before).
- **Collapse state** unified: single `_collapsed` Set with key prefixes for all levels.
- **Consistent chevron** (`icon-navigation-right`/`icon-navigation-down`) used at every level.
- **Include/exclude toggle** uses `stopPropagation` to prevent also triggering collapse.
