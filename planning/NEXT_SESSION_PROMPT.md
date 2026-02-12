# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — Playwright Testing & Section-Based Mapping

### Where we left off

Main branch is up to date (commit `f0cdf3a`). Block property disambiguation is complete. The full end-to-end flow works with the sample PDF (Flemish Masters), but **fails with different PDFs** due to element-ID-based mappings being positional and fragile.

### The problem we're solving

The current mapping system stores static wires from specific element IDs (`p1-e17`) to destination fields. When a different PDF is uploaded, element IDs shift and mappings pull wrong content — or worse, content from one section bleeds into another. Tested with the "Magical Andalucía" PDF: the FEATURES block contained its own bullets PLUS the "WHAT WE WILL SEE" heading and all its bullets concatenated in.

The fix is **section-based grouping** — extraction identifies sections (heading + children) using font metadata, and mapping operates at the section level instead of individual elements. Full architecture documented in `planning/SECTION_BASED_MAPPING.md`.

### Two tracks, in order

#### Track 1: Playwright E2E Testing (do this first)

Set up Playwright browser automation to test the Create from Source workflow automatically. This replaces the manual click-through testing that has been consuming significant time.

**Why first:** The section-based mapping refactor is a large change. Having automated tests before we start means we can verify each step without manual testing. Tests will also document the current cross-PDF bug before we fix it.

**Full plan:** `planning/PLAYWRIGHT_TESTING.md`

**Branch:** `feature/playwright-testing`

#### Track 2: Section-Based Mapping (the main architectural work)

Replace element-ID mappings with section-based rules. Server-side extraction groups elements into sections using font metadata. Mapping operates at section level. Individual element IDs still available for fine-grained overrides.

**Phases:**
0. Playwright testing (Track 1)
1. Bridge refactor — extract shared logic into `document-creation.service.ts`
2. Server-side section grouping in `PdfPagePropertiesService`
3. Source tab & map tab UI updates
4. map.json schema & bridge update
5. Transforms (titleCase, bullet conversion, markdown-to-HTML)

**Full plan:** `planning/SECTION_BASED_MAPPING.md`

**Branch:** `feature/section-based-mapping` (with possible sub-branches per phase)

### Required reading

Before starting work, read these planning files (per CLAUDE.md session startup):
1. `planning/REFACTOR_TO_CONFIGURABLE.md`
2. `planning/CREATE_FROM_SOURCE_SIDEBAR.md`
3. `planning/CREATE_FROM_SOURCE_UI.md`
4. `planning/DESTINATION_DRIVEN_MAPPING.md`

And the two new planning documents:
5. `planning/PLAYWRIGHT_TESTING.md`
6. `planning/SECTION_BASED_MAPPING.md`

### First action

Start with Track 1: create branch `feature/playwright-testing` from `main` and set up Playwright E2E testing using the Umbraco testing skills.
