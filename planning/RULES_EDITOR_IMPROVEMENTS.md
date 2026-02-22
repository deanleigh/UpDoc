# Rules Editor Improvements

## Phase 1: Collapsed inner sections (COMPLETE)

When the rules editor modal opens and a rule is expanded, its inner sections (Conditions, Exceptions, Part, Format, Find & Replace) are collapsed by default. The user clicks section headers to expand whichever they need.

This keeps expanded rules compact and scannable, especially with many fields.

**Commit:** `98b0866` on `feature/rules-editor-improvements`

---

## Phase 2: Find & Replace text cleanup (COMPLETE)

Adds a "Find & Replace" section to each rule in the rules editor. Allows workflow authors to clean up matched element text before it enters the transform output.

**UI design — condition-type dropdown pattern:**

Each Find & Replace entry consists of two rows:
- **Find row:** dropdown (Text begins with / Text ends with / Text contains) + text input + delete button
- **Replace row:** label (Replace with / Replace all with) + text input

The find type determines replacement behavior:
- `textBeginsWith` — replaces only at the start of the text, label shows "Replace with"
- `textEndsWith` — replaces only at the end of the text, label shows "Replace with"
- `textContains` — replaces all occurrences, label shows "Replace all with"

Clicking "+ Add find & replace" creates one paired entry. Multiple entries per rule are supported and applied in order.

**Backend:** `textReplacements` array on `SectionRule` in `SectionRules.cs`. Each entry has `findType`, `find`, `replaceType`, `replace`.

**C# engine:** `ApplyTextReplacements()` in `ContentTransformService.cs`, applied after rule matching and before output formatting. Case-insensitive matching. Auto-trims whitespace after all replacements.

**Rationale:** Text cleanup belongs in the Shape layer (rules/transform), not the Map layer. Clean once at the rule level; everything downstream gets clean values.

**Example — Organiser Telephone rule:**
- Find: Text begins with "Tel:"
- Replace with: (empty)
- Result: "Tel: 01803 732173" → "01803 732173"

**Example — Organiser Email rule:**
- Find: Text ends with "............"
- Replace with: (empty)
- Result: "john@example.com ............" → "john@example.com"

**Commit:** on `feature/rules-editor-improvements` branch
