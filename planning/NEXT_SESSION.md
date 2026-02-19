# Next Session Prompt

## Current State

Branch: `main` — clean. `feature/destination-picker-fixes` merged in commit `ce1239f`.

## What's Done This Session (18 Feb 2026)

### Planning Documents Written/Updated

1. **`planning/CORE_CONCEPT.md`** (NEW) — Foundational doc: "Any Source → Markdown → Pick Pieces → Map to CMS Fields". Covers source difficulty spectrum, why rules exist (PDF has no structure), why Markdown is always the intermediate format (one source → many destinations, no information loss, human-readable preview, future storage options).

2. **`planning/RULES_AND_ACTIONS_V2.md`** (UPDATED) — Major additions:
   - **The Outlook Rules Model** section — four layers (Rule, Condition, Action, Exception), pre-existing conditions, categorized dropdown, UX insight about "Define Rule" vs "Create Rule", exceptions as future enhancement
   - **Naming Conventions (DECIDED)** section — complete reference for all JSON values, UI labels, C# properties, TypeScript types
   - **Source Tab UI Vision** section — rendered Markdown with Map buttons (Obsidian-style reading view, not data table, not editable)

### Naming Conventions Finalized

- **Structural terms**: Rule, Condition, Action, Format, Exception (Outlook naming adopted directly)
- **Actions**: `sectionTitle` / `sectionContent` / `exclude` (nouns — role declarations)
- **Formats**: `paragraph` / `heading1` / `heading2` / `heading3` / `bulletListItem` / `numberedListItem`
- **Conditions**: unchanged from current (`fontSizeEquals`, `colorEquals`, `textContains`, etc.)
- **Button label**: "Define Rule" instead of "Create Rule"

## What's Planned (NOT started)

### Rules & Actions v2 Implementation

Create new feature branch from `main` and follow the phases in `RULES_AND_ACTIONS_V2.md`:

1. **Phase 1: Data Model Changes** — Add `Format` property to `SectionRule` (C# + TS), rename action values
2. **Phase 2: Transform Pipeline Update** — New action names + format handling in `ContentTransformService.cs`
3. **Phase 3: Rules Editor UI** — Two-level dropdown (Action → conditional Format)
4. **Phase 4: Collapse Tabs + Unified View** — Rendered Markdown view with Map buttons
5. **Phase 5: Backward Compatibility** — Old action names still work

## Key Files

- `planning/CORE_CONCEPT.md` — Foundational concept (READ THIS)
- `planning/RULES_AND_ACTIONS_V2.md` — The implementation plan with naming conventions (READ THIS)
- `src/UpDoc/Models/SectionRules.cs` — Rule model (needs Format property)
- `src/UpDoc/Services/ContentTransformService.cs` — Transform service (new action names + format handling)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` — TS types (new RuleAction + ContentFormat)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/section-rules-editor-modal.element.ts` — Rules editor UI (two-level dropdown)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Source tab (collapse tabs, rendered Markdown view)
