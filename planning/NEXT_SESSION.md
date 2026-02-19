# Next Session Prompt

## Current State (19 Feb 2026)

Branch: `feature/rules-actions-v2` — v2a working code + incremental UI redesign in progress.

**IMPORTANT: The v2b big-bang refactor was attempted and REVERTED.** Do NOT try to change all four files at once again. Work incrementally — one UI change at a time, build, test, confirm.

## What's Working

The v2a implementation is working correctly:
- Itinerary = 1 section mapped to "Suggested Itinerary > Rich Text"
- Rules editor has Action dropdown (Section Title / Section Content / Exclude) + conditional Format dropdown
- All existing rules in source.json (v1 + v2a formats) load and work

## Incremental UI Redesign — AGREED PLAN

We agreed to redesign the rules editor one block at a time. Each rule card has **four sections** (in this order):

### 1. Conditions & Exceptions (the matching block)
- **CONDITIONS** header (collapsible, shows count) — IF conditions
- **EXCEPTIONS** header (collapsible, shows count) — UNLESS conditions (same dropdown vocabulary)
- Together they form the complete IF/UNLESS matching logic
- Both default to expanded, click header to collapse
- **STATUS: Conditions header DONE. Exceptions section DONE. Collapsible: IN PROGRESS.**

### 2. Include / Exclude (the gate)
- Toggle (not checkbox): ON = "Include" (green), OFF = "Exclude"
- When excluded: Structure + Format sections are HIDDEN (not dimmed — completely gone)
- An excluded rule card collapses to just: Name + Conditions/Exceptions + Exclude toggle
- **STATUS: NOT STARTED**

### 3. Structure (the role)
- Dropdown: Section Title / Section Content (same values as current Action dropdown, renamed)
- Has its own section header "STRUCTURE" on its own line, dropdown below
- **STATUS: NOT STARTED** (will rename Action → Structure)

### 4. Format (the styling)
- Dropdown: Paragraph, Heading 1-6, Bullet, Numbered, Quote (always visible, not conditional on Structure)
- Inline format checkboxes: Bold, Italic, Strikethrough, Code
- Has its own section header "FORMAT" on its own line
- **STATUS: NOT STARTED** (currently conditional on action=sectionContent, needs to be always visible)

### Incremental Steps Remaining

1. ~~Add Conditions header~~ DONE
2. ~~Add Exceptions section (UI + type)~~ DONE
3. Make Conditions & Exceptions collapsible — IN PROGRESS
4. Add Include/Exclude toggle
5. Rename Action → Structure (header on own line, dropdown below)
6. Make Format always visible and independent of Structure
7. Update C# transform to handle the new model (exceptions evaluation, separated structure + format)

## Design Decisions (AGREED, do not re-debate)

- **Three sections per rule:** Conditions & Exceptions → Include/Exclude → Structure → Format
- **Order rationale:** Identity before presentation. Structure (what it IS) before Format (how it LOOKS)
- **Exclude as toggle, not dropdown option:** More discoverable, quick to toggle, hides irrelevant controls
- **Include/Exclude toggle (not checkbox):** Both states labeled. Toggle ON = "Include", Toggle OFF = "Exclude". Matches the metaphor of toggling content visibility below.
- **Exceptions in same block as Conditions:** Both are matching logic (IF/UNLESS). Separate from what-to-do-with-matches.
- **Collapsible Conditions & Exceptions:** Show count in header, click to expand/collapse. Reduces vertical space once set up.
- **v2b big-bang approach FAILED:** Changed all 4 files, broke the itinerary (12 sections instead of 1). Lesson: one file/feature at a time.

## Key Files

- `planning/RULES_AND_ACTIONS_V2.md` — Full design doc (v2b model, examples, migration tables)
- `src/UpDoc/Models/SectionRules.cs` — C# rule model (v2a, needs v2b additions later)
- `src/UpDoc/Services/ContentTransformService.cs` — Transform pipeline (v2a, working)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` — TS types (v2a + exceptions field added)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/section-rules-editor-modal.element.ts` — Rules editor (incremental changes in progress)

## Backlog (Not Now)

- Rendered Markdown view (Obsidian style) replacing Transformed tab
- Unify "Define Structure" / "Edit Rules" buttons
- Page picker for PDF page selection
- Strategy badge contrast fix
- CS8602 warning at PdfPagePropertiesService.cs:1166
