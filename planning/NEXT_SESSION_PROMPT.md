# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — Testing and Next Steps

### Where we left off

Branch `main` (merged from `feature/rules-actions-v2`). The Transformed tab on the Source workspace has been significantly redesigned with a card-based layout using `uui-box` components.

### What was completed on the `feature/rules-actions-v2` branch

1. **uui-box card layout for Transformed sections**: Each section is a `uui-box` card with the section heading as the headline. Simple sections have one body row (content left, badge + Map right). Multi-part sections (heading + complex content) have separate rows for title and content, each with their own badge + Map button, separated by horizontal lines.

2. **Map button hover behaviour**: Map buttons are hidden by default and appear when hovering over a section box, following the Umbraco block grid editor pattern.

3. **Per-part mapping**: Sections with both a heading and content (e.g., "Features") show separate Map buttons for the title part and content part. Source keys use `${sectionId}.${partSuffix}` convention.

4. **Inline unmap from badges**: Green `uui-tag` badges have an "x" button to remove mappings directly from the Transformed view.

5. **Section rules editor**: Collapsible rule cards with Conditions, Exceptions, Action, and Format sections. Match preview shows matched elements.

6. **Format options**: Block format (Paragraph, Heading 1-6, Bullet List, Numbered List, Quote) and Style (Bold, Italic, Strikethrough, Code).

### What the user wants to do next

**Test the system end-to-end.** The user said: "I think really what we need to be checking is how well it works at the moment." Focus on:
- Does Create from Source correctly use mapped sections to populate Umbraco documents?
- Do the rules correctly shape PDF content into sections?
- Does the mapping flow (Transformed view → Map → Create from Source) work correctly?

### Known issues and planned work

1. **Map tab Save hanging** — User reported clicking Save on the Map tab seemed to hang. After page refresh everything was fine. Not yet investigated.

2. **v2b three-property model** — Planned in `planning/RULES_AND_ACTIONS_V2.md` Phase 2-3 but NOT started. Replaces the current Action+Format model with Format+StartsSection+Exclude. Awaiting user direction.

3. **Unify "Define Structure" and "Edit Rules"** — Phase 5 in RULES_AND_ACTIONS_V2.md. Remove old teach-by-example, all areas use rules editor. Not started.

### Key files

- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Main source view (Extracted + Transformed tabs)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-collection-action.element.ts` — Create from Source button (primary code path)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-action.ts` — Entity action (tree context menu path)
- `src/UpDoc/Services/ContentTransformService.cs` — Transform pipeline
- `src/UpDoc/Models/SectionRules.cs` — Rule models

### Critical reminder: Two bridge code files

Changes to mapping/bridge logic MUST be applied to BOTH:
- `up-doc-action.ts` — entity action (tree context menu path)
- `up-doc-collection-action.element.ts` — collection action (Create from Source button, **primary code path users actually use**)

### Workflow testing context

Two workflows exist:
- `group-tour-pdf` — original test workflow (Liverpool PDF)
- `tailored-tour-pdf` — Andalucia PDF (updoc-test-03.pdf), has organiser rules, section rules, area rules defined

### Required reading

Before starting work, read these planning files (per CLAUDE.md session startup):
1. `planning/REFACTOR_TO_CONFIGURABLE.md`
2. `planning/CREATE_FROM_SOURCE_SIDEBAR.md`
3. `planning/CREATE_FROM_SOURCE_UI.md`
4. `planning/DESTINATION_DRIVEN_MAPPING.md`

And the active planning document:
5. `planning/RULES_AND_ACTIONS_V2.md` — Current rules redesign plan (v2a complete, Phase 4 complete, v2b planned)

### First action

Ask the user what they'd like to test first, or what issues they've found during their testing.
