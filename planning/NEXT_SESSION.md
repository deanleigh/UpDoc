# Next Session Prompt

## Current State

Branch: `feature/destination-picker-fixes` — uncommitted changes on `ContentTransformService.cs`.

## What's Done

### Section Grouping Fix (uncommitted, verified working)
Action-driven mode added to `TransformAreaWithRules` in `ContentTransformService.cs`. Tour Details now shows 5 grouped sections instead of 23+ individual rows. Build passes cleanly on `src/UpDoc/UpDoc.csproj`.

## What's Planned (NOT started)

### Rules & Actions v2
Full planning doc written: `planning/RULES_AND_ACTIONS_V2.md`

Key decisions:
1. **Outlook-inspired two-level actions**: Action dropdown (Section Title / Section Content / Exclude) + conditional Format dropdown (Paragraph, H1, H2, H3, Bullet List, Numbered List)
2. **Collapse Extracted + Transformed tabs** into one unified view
3. **"Area: " and "Section: " prefixes** for clarity
4. **Option C hybrid sections** — collapsed by default, expand to map heading/content separately
5. **`addAsHeading` concept** → now `sectionContent` with `format: heading2` (for Day 1, Day 2 in Itinerary)
6. **Auto-numbering** for numbered list items
7. **User-defined role names** (not a fixed list)

## Next Steps (in order)

1. **Commit the section grouping fix** on current branch
2. **Merge `feature/destination-picker-fixes` to main**
3. **Create new feature branch** from main for Rules & Actions v2
4. **Follow phases in `RULES_AND_ACTIONS_V2.md`**: Data model → Transform pipeline → Rules editor UI → Collapse tabs → Backward compatibility

## Key Files

- `planning/RULES_AND_ACTIONS_V2.md` — The plan (READ THIS FIRST)
- `planning/SECTION_BUILDER.md` — Superseded by v2 but has useful context
- `src/UpDoc/Services/ContentTransformService.cs` — Transform service (has uncommitted fix)
- `src/UpDoc/Models/SectionRules.cs` — Rule model (needs Format property)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/section-rules-editor-modal.element.ts` — Rules editor UI
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Source tab (collapse tabs here)

## Screenshots

User shared Outlook Rules screenshots during planning session showing the conditions/actions pattern. Save to `planning/images/` if not already done.
