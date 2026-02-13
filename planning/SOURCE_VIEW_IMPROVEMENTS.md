# Source View Improvements

Small, incremental display improvements to the Source tab (Extracted view) to make the Page → Zone → Section → Text hierarchy visually clear and honest, while aligning with standard UUI/Umbraco patterns.

**Branch:** `feature/extraction-hierarchy-docs` (all work on same branch)
**Primary file:** `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts`

---

## Suggested Order

Work through tasks in this order. Each is a small, self-contained change that can be committed independently. Tasks 7 and 8 (UUI alignment) should be done first as they establish the layout structure that the other tasks build within.

1. **Task 8** — Inner tab bar consistency (establishes the layout pattern)
2. **Task 7** — Extraction summary stat boxes (replaces the header area)
3. **Task 3** — Rename "areas" to "zones" (vocabulary cleanup before display changes)
4. **Task 1** — Fix zone-level counts (sections not elements)
5. **Task 2** — Fix page-level summary (zones and sections per page)
6. **Task 6** — Fix section text counts (vocabulary alignment)
7. **Task 4** — Add text type labels (Heading, List, Paragraph)
8. **Task 5** — Improve visual nesting (final polish)

---

## Hierarchy Display Tasks

### 1. Fix zone-level counts
**Current:** Zone header shows "27 elements" (total raw text items).
**Target:** Show section count instead — sections are the meaningful unit of mapping.
**Method:** `#renderArea()` around line 313.

### 2. Fix page-level summary
**Current:** Extraction header shows total element count.
**Target:** Show zones and sections per page, matching the documented hierarchy.
**Method:** `#renderExtraction()` around line 384.

### 3. Rename "areas" to "zones" throughout
**Current:** Code and UI uses "areas" in many places (CSS classes, method names, labels).
**Target:** Use "zones" consistently — matches the documented vocabulary (Page → Zone → Section → Text).
**Scope:** CSS classes (`zone-area` → `zone`, `area-header` → `zone-header`, etc.), method names (`#renderArea` → `#renderZone`, `#getAreaSectionKeys` → `#getZoneSectionKeys`, etc.), UI labels ("27 elements" → "X sections"), diagnostics badges.

### 4. Add text type labels
**Current:** Individual text items within sections have no classification — they all look the same.
**Target:** Label each text item as Heading, List, or Paragraph per the documented types in `docs/user-journeys.md`.
**Method:** `#renderZoneElement()`. Classification logic: heading = already identified by section structure, list = leading bullet/numeric pattern, paragraph = everything else.

### 5. Improve visual nesting
**Current:** The four hierarchy levels aren't visually distinct enough.
**Target:** Clear indentation and styling so Page → Zone → Section → Text is immediately obvious. Each level should have a distinct visual treatment.
**Scope:** CSS styles — indentation, borders, backgrounds for each hierarchy level.

### 6. Fix section text counts
**Current:** Section header says "X items".
**Target:** Say "X text items" or similar to match the hierarchy vocabulary.
**Method:** `#renderSection()` around line 252.

---

## UUI Alignment Tasks

### 7. Extraction summary stat boxes
**Current:** Extraction header is custom inline text: "Source: updoc-test-01.pdf / Pages: 4 / Elements: 544 / Areas: 9 / Extracted: 12/02/2026, 17:27:20". Does not follow standard Umbraco/UUI patterns.
**Target:** Replace with `uui-box` stat boxes in a horizontal row, following the pattern used by Merchello (Orders dashboard) and uSync (Settings/Content/Everything boxes). Each box shows one stat with a large number and label:

| Box | Stat |
|-----|------|
| Pages | Number of pages extracted |
| Zones | Number of zones detected |
| Sections | Number of sections identified |
| Source | File name + extracted date |

Re-extract button moves to top-right corner alongside the boxes (like Merchello's Export/Create order buttons).

**References:** UUI Storybook (`uui-box`), Umbraco API Docs Storybook for composed patterns. Screenshots from Merchello and uSync provided as design reference.
**Method:** `#renderExtraction()` and associated CSS.

### 8. Inner tab bar consistency
**Current:** The "Extracted / Transformed" tab row on the Source view uses `uui-tab-group` but doesn't visually match the inner tab row on the Destination view ("Page Properties / Page Content"). The two should use the same component, same styling, same position within the layout.
**Target:** Make the Source inner tabs match the Destination inner tabs exactly — same `uui-tab-group` pattern, same positioning relative to the content area. Both are content-area-level tabs within a workspace view, so they should look identical.
**References:** Destination view implementation (`up-doc-workflow-destination-view.element.ts`) for the reference pattern. UUI Storybook (`uui-tab`, `uui-tab-group`).
**Method:** `.view-tabs` section and CSS.

---

## Documentation Updates

As each task is completed:

1. Update `docs/ui/uui-components.md` or `docs/ui/custom-components.md` if new components or patterns are introduced
2. Update `docs/source-files/up-doc-workflow-source-view-element.md` per CLAUDE.md documentation requirements
3. Create `planning/UI_PATTERNS.md` as a living cookbook — seeded from the first task, updated with each subsequent task
