# Next Session Prompt

## Current State (19 Feb 2026)

Branch: `feature/rules-actions-v2` — v2a working code + incremental UI redesign in progress.

**IMPORTANT: The v2b big-bang refactor was attempted and REVERTED.** Do NOT try to change all four files at once again. Work incrementally — one UI change at a time, build, test, confirm.

## What's Working

The v2a implementation is working correctly:
- Itinerary = 1 section mapped to "Suggested Itinerary > Rich Text"
- Rules editor has all four sections collapsible (Conditions, Exceptions, Action, Format)
- All existing rules in source.json (v1 + v2a formats) load and work
- Exclude visual feedback: Format section hidden + red "Excluded" match preview with block icon

## Commits This Branch

- `5edb35d` — Collapsible sections (Conditions, Exceptions, Action, Format) + Format as independent section
- `af66d99` — Exclude visual feedback (hide Format when Action=exclude, red match preview)

## Incremental UI Redesign — Progress

Steps completed:
1. ~~Add Conditions header~~ DONE
2. ~~Add Exceptions section (UI + type)~~ DONE
3. ~~Make Conditions & Exceptions collapsible~~ DONE (all four sections collapsible)
4. ~~Add Action section header~~ DONE (kept name "Action", not renamed to "Structure")
5. ~~Make Action + Format separate collapsible sections~~ DONE
6. ~~Exclude visual feedback~~ DONE (Format hidden, red "Excluded" match preview with icon-block)

### Next Step: Format + Style Rows

**AGREED but not yet confirmed to implement** — user said "have a think about this" then later showed Obsidian screenshots and agreed to the approach, but didn't explicitly say "go ahead and implement".

Replace the single Format dropdown with **condition-row-pattern rows** (same pattern as Conditions):

**Two row types under the Format section:**
- **Format** (block-level): Paragraph, Heading 1-6, Bullet List, Numbered List, Quote
- **Style** (inline): Bold, Italic, Strikethrough, Code, Highlight

**Each row:** type dropdown (Format/Style) + value dropdown + trash button
**"+ Add format"** button to add rows

**TypeScript type change needed:**
- Current: `format?: RuleContentFormat` (single string)
- New: array of format entries, each with `type` ('format' | 'style') and `value`

### Later: Update C# Transform

Deferred until UI model is fully settled. Will need:
- Exceptions evaluation (UNLESS logic)
- Independent format processing
- Inline style wrapping (bold, italic, etc.)

## Design Decisions (AGREED, do not re-debate)

- **Exclude stays in Action dropdown** (not separate toggle) — cleaner IF/UNLESS/THEN model
- **Keep "Action" as name** (not "Structure") — we're not only concerned with structure
- **Four collapsible sections:** Conditions, Exceptions, Action, Format — all with chevron + count/label
- **Format hidden when Action = Exclude** — irrelevant for excluded content
- **Match preview states:** green "Matched" (icon-check) / red "Excluded" (icon-block) / amber "No match" (icon-alert)
- **Format + Style split (Obsidian model):** Format = block-level (Paragraph, Heading 1-6, Bullet, Numbered, Quote), Style = inline (Bold, Italic, Strikethrough, Code, Highlight)
- **Row pattern for Format entries:** Same pattern as condition rows (type dropdown + value dropdown + trash)
- **Markdown pipeline confirmed:** Rules → C# Transform → Markdown → HTML → Umbraco Rich Text Editor (Tiptap)
- **Exceptions in same block as Conditions:** Both are matching logic (IF/UNLESS). Separate from what-to-do-with-matches.
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
