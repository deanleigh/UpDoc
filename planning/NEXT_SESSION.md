# Next Session Prompt

## Current State (19 Feb 2026)

Branch: `feature/rules-actions-v2` — rules editor UI redesign complete, ready for rendered Markdown view.

## What's Done (This Branch)

All commits on `feature/rules-actions-v2`:
- `5edb35d` — Collapsible sections (Conditions, Exceptions, Action, Format)
- `af66d99` — Exclude visual feedback (hide Format, red match preview)
- `2d65b3a` — Format Block/Style rows, expanded Action options, Heading 4-6/Quote

### Rules Editor UI — COMPLETE
- **Conditions** — collapsible, count in header, condition-row pattern (type dropdown + value input + trash)
- **Exceptions** — same pattern as conditions (UNLESS logic)
- **Action** — collapsible, dropdown: Section Title / Section Content / Section Description / Section Summary / Exclude
- **Format** — collapsible, Block + Style row pattern (type dropdown + value dropdown + trash). Block: Paragraph, Heading 1-6, Bullet List, Numbered List, Quote. Style: Bold, Italic, Strikethrough, Code, Highlight
- **Exclude visual** — Format hidden when Action=Exclude, red "Excluded" match preview with block icon
- **Backward compat** — old `format` field synced on save from first Block entry, C# transform still works

## Next Task: Rendered Markdown View (Obsidian Reading Mode)

The user wants to review and redesign the **Transformed tab** on the Source workspace page. Currently it shows a data table with section names, row counts, and pattern badges. The user wants it to look like **Obsidian's reading mode** — rendered Markdown flowing like a real document.

### What the User Said
- "I really would just like it to look like a page in Obsidian"
- "Transformed, markdown"
- "I'm not even sure if we need the coloured bars down the side"

### Key Decisions (from RULES_AND_ACTIONS_V2.md)
- Replace both Extracted and Transformed views with a single **rendered Markdown view**
- Use a Markdown-to-HTML library (`marked` or `markdown-it`) to render the transform output
- Content is **reviewable, not editable** — editing happens in Umbraco after document creation
- Area colour bars may or may not be needed — discuss with user
- Map buttons sit in the right margin next to each section
- Mapping status badges (green when mapped)
- Section boundaries with visual separators

### Reference: Current Transformed Tab
The current Transformed view is in `up-doc-workflow-source-view.element.ts`. It shows:
- Toggle: Elements | Transformed
- Area colour bars on the left
- Section names, content previews, pattern badges (bulletList, paragraph, etc.)
- "Edit Rules" buttons per area

### What to Discuss with User
1. Do we still want the Elements/Transformed toggle, or just show rendered Markdown?
2. Do the coloured area bars add value in the rendered view?
3. Where do the "Edit Rules" buttons go in the rendered view? (Per-area? In a toolbar?)
4. Map buttons — margin? Inline? Hover?
5. Should the C# transform be updated first (to honour Format Block/Style + Action types), or work with the current transform output?

## Also Pending

- **C# transform update** — handle new Action types (sectionDescription, sectionSummary treated as content), Format Block/Style rows, exceptions evaluation, inline style wrapping. Should do this before or alongside the rendered view so the Markdown output is correct.
- Merge `feature/rules-actions-v2` to `main` when ready

## Key Files

- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Source tab with Elements/Transformed toggle
- `src/UpDoc/Services/ContentTransformService.cs` — C# transform pipeline
- `src/UpDoc/Models/SectionRules.cs` — C# rule model
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` — TS types
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/section-rules-editor-modal.element.ts` — Rules editor
- `planning/RULES_AND_ACTIONS_V2.md` — Full design doc including rendered Markdown vision

## Backlog (Not Now)

- Unify "Define Structure" / "Edit Rules" buttons
- Page picker for PDF page selection
- Strategy badge contrast fix
- CS8602 warning at PdfPagePropertiesService.cs:1166
