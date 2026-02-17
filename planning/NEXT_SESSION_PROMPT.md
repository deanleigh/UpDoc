# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — UI Fixes + Section Builder Phase 1b

### Where we left off

Branch `main` (commit `08fa857`). Tailored Tour document type, blueprint, and workflow are complete. User testing session identified several UX issues now tracked in `planning/TODO.md`.

### Quick wins to do first

#### 1. Destination picker: tabs on wrong row (5 min fix)

In `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/destination-picker-modal.element.ts`, line 181:

```html
<uui-tab-group slot="header" dropdown-content-direction="vertical">
```

The `slot="header"` puts tabs inline with the headline in `umb-body-layout`. **Fix:** Remove `slot="header"` so tabs render in the main content area below the headline. Build and test.

#### 2. Destination picker: missing Tour Properties tab

`DestinationStructureService` only includes properties **populated** in the blueprint. Tour Properties fields (organiserName, organiserTelephone, organiserEmail, organiserAddress, organiserOrganisation) are empty in the blueprint because they're meant to be filled from the source.

**Fix:** Change `DestinationStructureService` to include ALL text-mappable property fields from the document type (not just populated ones). The "populated only" rule should still apply to block grid content (only show blocks actually placed in the blueprint), but simple property fields should all appear as mapping targets. Remember: use `CompositionPropertyGroups` and `CompositionPropertyTypes`, NEVER the non-Composition variants.

### Section Builder Phase 1b (Extracted Tab Reflection)

Branch `feature/section-builder` (commit `384133c`). Phase 1 of the Section Builder is complete:

- **Action dropdown** added to the rules editor modal — Create section, Set as heading, Add as content, Add as list item, Exclude
- **Backward compatible** — rules without `action` field default to `"createSection"` in C# and TypeScript
- `planning/SECTION_BUILDER.md` is the single active planning doc for this feature

**Goal:** After rules are saved, the Extracted view should show composed sections within each area (not just raw element lists).

### Workflow testing context

Two workflows exist:
- `group-tour-pdf` — original test workflow (Liverpool PDF)
- `tailored-tour-pdf` — NEW (Andalucia PDF, updoc-test-03.pdf). Has organiser rules defined (Name, Telephone, Email, Address as createSection rules in Organiser Information area)

### Full TODO list

See `planning/TODO.md` for all tracked items including:
- Separate Extract button from Save (UX)
- Page selection not persisted from creation phase (Bug)
- Destination picker tab layout (Bug)
- Missing Tour Properties in destination picker (Bug)
- Transformed tab redesign (UX)
- Remove "Define Structure" button (Simplification)
- Force explicit action selection in rules editor (UX)

### Required reading

Before starting work, read these planning files (per CLAUDE.md session startup):
1. `planning/REFACTOR_TO_CONFIGURABLE.md`
2. `planning/CREATE_FROM_SOURCE_SIDEBAR.md`
3. `planning/CREATE_FROM_SOURCE_UI.md`
4. `planning/DESTINATION_DRIVEN_MAPPING.md`

And the key planning documents:
5. `planning/SECTION_BUILDER.md` — action-based section composition
6. `planning/TODO.md` — all tracked issues

### First action

Start with the two quick wins (destination picker tab fix + Tour Properties tab), then continue with Section Builder Phase 1b.
