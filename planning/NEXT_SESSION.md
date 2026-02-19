# Next Session Prompt

## Current State

Branch: `feature/rules-actions-v2` — has v2a implementation (Action + Format model). Uncommitted changes to `planning/RULES_AND_ACTIONS_V2.md` with the v2b refinement.

**First task:** Commit planning changes, then begin Phase 2 (v2b refactor).

## What's Done (19 Feb 2026)

### v2a Implementation (COMPLETE on `feature/rules-actions-v2`)

Phase 1 of the original plan is implemented and tested:
- C# `SectionRule`: `Action` + `Format` properties, `GetNormalizedAction()` for backward compatibility
- TypeScript: `RuleAction`, `RuleContentFormat`, `normalizeAction()` function
- `ContentTransformService.cs`: normalized v2 actions, `FormatContentLine()` with heading/bullet/numbered output
- Rules editor UI: Action dropdown (Section Title / Section Content / Exclude), conditional Format dropdown
- Legacy action names normalized on load
- Builds pass (TypeScript + .NET)
- **Tested in browser:** Itinerary area with 2 rules (Day=Heading 3, Body=Paragraph), 12/14 matched, transform produces `### Day 1` correctly

### Design Decisions from Testing (documented in `RULES_AND_ACTIONS_V2.md`)

Testing revealed the v2a model's limitation: an element can't be both a section boundary AND have a Markdown format. Led to the **v2b three-property definition model**:

1. **Format** (dropdown, always visible) — Paragraph, Heading 1-6, Bullet, Numbered, Quote
2. **Starts section** (checkbox) — independent of format
3. **Exclude** (checkbox) — overrides format + section
4. **Inline formats** (multi-select) — Bold, Italic, Strikethrough, Code
5. **Exceptions** (UNLESS conditions) — promoted from future to current

Also decided:
- "Definition" not "Action" — declarative, not imperative
- Rendered Markdown view (Obsidian reading mode) replaces data table
- Unify "Define Structure" and "Edit Rules" into one button
- Block format expanded to Heading 1-6 + Quote (was Heading 1-3)

## What's Next: Phase 2 (v2b Refactor)

Follow the implementation plan in `planning/RULES_AND_ACTIONS_V2.md` (Phase 2 onwards):

### Phase 2: Data Model Refactor (v2a → v2b)

**C# — `SectionRules.cs`:**
- Replace `Action` property with `Format` (string, default "paragraph"), `StartsSection` (bool), `Exclude` (bool)
- Add `InlineFormats` (List<string>?, optional)
- Add `Exceptions` (List<RuleCondition>?, optional)
- Rename `GetNormalizedAction()` → `GetNormalizedDefinition()` — handle v1, v2a, and v2b JSON
- Keep `Action` property for backward compat deserialization

**TypeScript — `workflow.types.ts`:**
- Replace `RuleAction` with `BlockFormat` and `InlineFormat` types
- Update `SectionRule`: `format`, `inlineFormats?`, `startsSection?`, `exclude?`, `exceptions?`
- Replace `normalizeAction()` with `normalizeDefinition()` — three-generation normalization

**C# — `ContentTransformService.cs`:**
- Replace action-driven switch with definition-driven logic
- If `StartsSection`: flush + start new section
- If `Exclude`: skip
- Always apply `Format` (not conditional on action)
- Apply `InlineFormats` wrapping
- Check `Exceptions` before applying rule
- Add `heading4`-`heading6`, `quote` formats

### Phase 3: Rules Editor UI (v2b)

**`section-rules-editor-modal.element.ts`:**
- Replace Action dropdown + conditional Format with:
  - Format dropdown (always visible)
  - Inline format checkboxes (Bold, Italic, Strikethrough, Code)
  - "Starts section" checkbox
  - "Exclude" checkbox
- Add Exceptions section: "+ Add exception" (same condition UI)

### Phase 4: Rendered Markdown View

Replace Transformed tab data table with rendered Markdown (Obsidian style). Use `marked` or `markdown-it`.

### Phase 5: Unify Define Structure / Edit Rules

Remove old teach-by-example "Define Structure" button. All areas show "Edit Rules" consistently.

## Key Files

- `planning/RULES_AND_ACTIONS_V2.md` — **THE implementation plan** (READ THIS FIRST — it has everything: model, types, UI mockup, migration tables, examples)
- `planning/CORE_CONCEPT.md` — Foundational: "Any Source → Markdown → Pick Pieces → Map to CMS Fields"
- `src/UpDoc/Models/SectionRules.cs` — C# rule model (needs v2b properties)
- `src/UpDoc/Services/ContentTransformService.cs` — Transform pipeline (needs definition-driven logic)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` — TS types (needs BlockFormat + InlineFormat)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/section-rules-editor-modal.element.ts` — Rules editor (needs v2b UI)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Source tab (rendered Markdown + button unification)

## Backlog Items (Not This Session)

- Multi-action per rule (Section Title + Heading format simultaneously) — solved by v2b model
- Page picker for PDF page selection
- Strategy badge contrast (pink-on-pink fix)
- CS8602 warning at PdfPagePropertiesService.cs:1166
