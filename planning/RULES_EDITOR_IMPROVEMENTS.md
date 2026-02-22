# Rules Editor Improvements

## Phase 1: Collapsed rules by default (NEXT)

When the rules editor modal opens, all rules should be collapsed — showing only the role name, part badge, and match count. The user expands whichever rule they need to edit.

This keeps the list compact and scannable, especially with 4+ rules.

**Branch:** create from `feature/bordered-box-layout` (current working branch)

---

## Phase 2: Text cleanup actions (PLANNED, not started)

Add an "Actions" section to each rule in the rules editor. Actions clean up matched element text before it enters the transform output.

**User-facing action types (dropdown):**
- Remove prefix — strips a user-specified string from the start (e.g., "Tel:", "Email:")
- Remove suffix — strips a user-specified string from the end
- Remove trailing dots — strips trailing `.` characters (no value needed)
- Replace — find string → replace with string

**Backend:** `textReplacements` array on `SectionRule` — regex pattern + replacement pairs. The UI translates friendly action types into regex automatically; the user never writes regex.

**C# engine:** `ApplyTextReplacements()` in `ContentTransformService`, applied to element text before `FormatContentLine()`.

**Design decision:** Actions sit inside the rule detail (alongside Conditions, Exceptions, Part, Format). With Phase 1 (collapsed by default), the additional section isn't visually overwhelming — users only see it when they expand a rule.

**Rationale:** Text cleanup belongs in the Shape layer (rules/transform), not the Map layer. Clean once at the rule level; everything downstream gets clean values.

**Example — Organiser Telephone rule:**
- Action: Remove prefix → "Tel:"
- Result: "Tel: 01803 732173" → "01803 732173"

**Example — Organiser Email rule:**
- Action 1: Remove prefix → "Email:"
- Action 2: Remove trailing dots
- Result: "Email: john@example.com ............" → "john@example.com"
