# Section Builder: Rules + Actions for Composing Sections

> Status: Phase 1 COMPLETE (commit `384133c`). Phases 2-5 planned.
> Supersedes the implicit "one rule = one section" behaviour from the area rules pipeline.

---

## The Insight: Three Separate Concerns

Working through the area rules implementation revealed that three distinct concerns were being conflated in the rules editor:

| Concern | What it does | Example |
|---------|-------------|---------|
| **Markup** | Defines semantic structure — what the content *is* | "This text is a heading." "These items are a list." |
| **Role** | Defines content identity — what the content *means* | "This heading is the tour title." "This list is the features." |
| **Mapping** | Wires content to CMS fields | "Tour title goes into pageTitle." |

The current rules editor conflates Markup and Role: clicking "Create rule" on an element simultaneously names it (Role) and implicitly marks it as standalone content (Markup). There is no way to say "this element is a heading" separately from "this element is the tour title."

Adding an **action** to each rule separates these: the action defines the markup (what the element *is*), the name defines the role (what it *means*).

---

## Current State (What Exists)

### Data model (`SectionRule` in C# and TypeScript)

```typescript
interface SectionRule {
    role: string;           // Section name (e.g., "tour-title")
    conditions: RuleCondition[];  // IF: font size, color, position, etc.
}
```

### Current behaviour

- Each rule with matching conditions creates a standalone section
- The section's `Id` = kebab-case of role name
- The section's `Heading` = role name (label only, not content)
- The section's `Content` = matched element's text
- Implicit action: always "create section"

### Known bug (to fix separately)

For role sections, `sectionLookup["{id}.heading"]` resolves to the role name (e.g., "Tour Title") instead of the actual document text. This is because `Heading` was set to `rule.Role` for display purposes, but the bridge code uses it as content. The heading/content split doesn't make sense for role sections that have no natural heading — they only have content.

---

## Proposed Design: Rules with Actions

### New data model

```typescript
interface SectionRule {
    role: string;                    // Section name (e.g., "tour-title")
    action: RuleAction;              // THEN: what to do with matched elements
    conditions: RuleCondition[];     // IF: font size, color, position, etc.
}

type RuleAction = 'createSection' | 'setAsHeading' | 'addAsContent' | 'addAsList' | 'exclude';
```

C# equivalent:

```csharp
public class SectionRule
{
    [JsonPropertyName("role")]
    public string Role { get; set; } = string.Empty;

    [JsonPropertyName("action")]
    public string Action { get; set; } = "createSection";

    [JsonPropertyName("conditions")]
    public List<RuleCondition> Conditions { get; set; } = new();
}
```

### Action types

| Action | What it does | When to use |
|--------|-------------|-------------|
| **createSection** | Element becomes its own individually-mappable section. Content = element text. No heading. | Page Header elements (each maps to a different destination) |
| **setAsHeading** | Element becomes a `## heading` within the section it starts. Text is treated as both a heading label AND content. | Itinerary day headings (Day 1, Day 2) that are the same font size as body but different font |
| **addAsContent** | Element is appended as paragraph content to the section started by the preceding heading or to a named section | Body text following a heading |
| **addAsList** | Element is appended as a bullet list item to the current section | Feature bullet points |
| **exclude** | Element is removed from output entirely | Boilerplate, decorative text, page numbers |

### Default action

When auto-populating from a clicked element, the default action is `createSection` (current behaviour). This preserves backward compatibility — existing rules without an `action` field are treated as `createSection`.

---

## How Actions Compose Sections

The key insight: actions don't just operate on individual elements — they **compose** elements into sections. Multiple rules can contribute to the same section.

### Flat areas (Page Header)

All elements get `createSection` — each becomes its own section:

```
Rule 1: IF font=10.8, position=first  THEN createSection "Organisation"
Rule 2: IF font=30, Clarendon         THEN createSection "Tour Title"
Rule 3: IF font=14.4, position=last   THEN createSection "Tour Description"
```

Result: 3 sections, each with content only (no heading).

### Heading-delimited areas (Tour Details)

A heading rule creates section boundaries, content rules fill them:

```
Rule 1: IF font=12, Clarendon, UPPERCASE  THEN setAsHeading
Rule 2: IF starts with bullet              THEN addAsList
Rule 3: (default)                          THEN addAsContent
```

Result: N sections (Features, What We Will See, Accommodation, etc.), each with a heading + list/paragraph content.

### Heading-delimited areas with failed auto-detection (Itinerary)

Where Day 1, Day 2 etc. are the same font size as body text but different font:

```
Rule 1: IF fontName=Clarendon, font=10  THEN setAsHeading
Rule 2: (default)                       THEN addAsContent
```

Result: 5 sections (Day 1 through Day 5), each with heading + body paragraphs.

### Mixed areas

Rules can be combined freely:

```
Rule 1: IF font=14, bold           THEN setAsHeading
Rule 2: IF starts with bullet      THEN addAsList
Rule 3: IF font=8, italic          THEN exclude      (footnotes)
Rule 4: (default)                  THEN addAsContent
```

---

## Section Assembly Logic (Transform Layer)

The transform layer processes elements in document order. A state machine tracks the "current section":

1. Start with no current section
2. For each element, evaluate rules (first-match-wins):
   - **createSection**: Close any current section. Create new section with Id=role, Content=element.text. No heading.
   - **setAsHeading**: Close any current section. Start new section with Id=kebab(element.text), Heading=element.text. The section name comes from the heading text (auto-generated), not the rule's role name.
   - **addAsContent**: Append element.text as paragraph to current section. If no current section, create an unnamed preamble section.
   - **addAsList**: Append element.text as bullet item (`- text`) to current section. If no current section, create unnamed preamble.
   - **exclude**: Skip element entirely.
3. After all elements processed, close any open section.

### setAsHeading and the role name

For `setAsHeading`, the **role name is not the section name**. The section name comes from the heading text itself (e.g., "Features", "Day 1"). The role name on a `setAsHeading` rule is a category label — it describes what KIND of heading this is, not the heading's text.

For example, `role: "day-heading"` with `action: setAsHeading` means "elements matching these conditions are day headings." Each matched element creates a section named after its text ("Day 1", "Day 2", etc.), not after the role.

This differs from `createSection`, where the role name IS the section name.

### Default rule (no conditions)

A rule with no conditions and an action like `addAsContent` serves as the default — it catches all unmatched elements. Currently, rules with empty conditions are skipped (the vacuous truth fix). With actions, a default rule becomes intentional:

```
Rule 3: IF (no conditions)  THEN addAsContent   // default: everything else is body text
```

The vacuous truth fix should only skip rules with `createSection` action and no conditions (which would incorrectly claim everything as a standalone section). For `addAsContent` or `addAsList`, matching everything is the desired behaviour.

---

## Mapping Implications

### createSection sections

Only have `.content` as a mappable source. No `.heading` since the heading IS the role label, not document text.

```json
{ "source": "tour-title.content", "destinations": [{ "target": "pageTitle" }] }
```

This fixes the current bug where `tour-title.heading` resolves to "Tour Title" (the role name) instead of the actual text.

### setAsHeading sections

Have both `.heading` and `.content` as mappable sources. The heading is actual document text.

```json
{ "source": "features.heading", "destinations": [{ "target": "featureTitle", "blockKey": "..." }] },
{ "source": "features.content", "destinations": [{ "target": "richTextContent", "blockKey": "..." }] }
```

### Backward compatibility

Existing rules without an `action` field default to `createSection`. Existing map.json entries using `.heading` for role sections will need updating to `.content` (one-time migration or handle gracefully in the bridge).

---

## UI Changes

### Rules editor modal

Add an action dropdown after the conditions section:

```
┌──────────────────────────────────────────────────────┐
│ 1  [Tour Title                    ]          [trash] │
│                                                      │
│  Font size equals    [30                   ] [trash] │
│  Font name contains  [GHEALP+Clarendon     ] [trash] │
│  Color equals        [#FFFFFF              ] [trash] │
│  + Add condition                                     │
│                                                      │
│  Action: [Create section      v]                     │
│                                                      │
│  Matched: The Art & History of Liverpool             │
└──────────────────────────────────────────────────────┘
```

Action options:
- **Create section** — standalone mappable section (default)
- **Set as heading** — starts a new section, element becomes `## heading`
- **Add as content** — paragraph text in current section
- **Add as list item** — bullet item in current section
- **Exclude** — remove from output

### Extracted tab update

After rules are saved and extraction re-runs, the Extracted view should reflect the result:

**Before (flat area, no rules):**
```
Page Header  [Flat]  [1 section, 3 elements]  [Redefine]
  └── Content
        The Arts Society Kingston presents
        The Art & History of Liverpool
        5 days from £814...
```

**After (flat area, with createSection rules):**
```
Page Header  [3 sections]  [Redefine]
  ├── Organisation          "The Arts Society Kingston presents"
  ├── Tour Title            "The Art & History of Liverpool"
  └── Tour Description      "5 days from £814..."
```

**After (heading-delimited area, with setAsHeading rule):**
```
Tour Details  [4 sections]  [Define Structure]
  ├── Features              HEADING + 7 items
  ├── What We Will See      HEADING + 5 items
  ├── Accommodation         HEADING + 3 items
  └── Extras                HEADING + 2 items
```

---

## Relationship to Existing Planning Docs

| Document | Relationship |
|----------|-------------|
| **AREA_LEVEL_RULES.md** | This doc extends that design. Area-level rules described "heading rule" as the only variable — Section Builder generalises this to multiple action types. The three behaviours (each element, heading-delimited, whole area) map to action combinations. |
| **THREE_LAYER_PIPELINE.md** | Section Builder operates in Layer 2 (Shape). It changes HOW sections are assembled from elements, but doesn't change the Extract → Shape → Map flow. |
| **SECTION_RULES_EDITOR.md** | The existing section rules editor becomes the Section Builder editor. Same modal, extended with action dropdown. |
| **DESTINATION_DRIVEN_MAPPING.md** | No change to mapping direction or UI. The mappable units (sections with heading/content parts) remain the same — Section Builder just gives users more control over how those sections are composed. |

---

## Implementation Phases

### Phase 1: Add action field + dropdown (minimal) — COMPLETE

Commit `384133c` on `feature/section-builder` branch.

**What was done:**
- Added `action` field to `SectionRule` in C# (`Models/SectionRules.cs`) with default `"createSection"`
- Added `RuleAction` type and `action` field to TypeScript (`workflow.types.ts`)
- Added action dropdown to rules editor modal (`section-rules-editor-modal.element.ts`)
- Fixed missing `textEquals` and `fontNameEquals` entries in `CONDITION_LABELS` and `ALL_CONDITION_TYPES`
- Fixed `#addRule()` and `#createRuleFromElement()` to include `action` property
- No backend behaviour change — all actions behave as `createSection` for now
- Backward compatible — rules without `action` field default to `"createSection"` in both C# and TypeScript

### Phase 2: Fix mapping bug + createSection semantics

- Role sections only expose `.content`, not `.heading`
- Bridge code: for role sections, `sectionLookup["{id}.content"]` = element text
- Update existing map.json entries that use `.heading` for role sections
- Vacuous truth: only skip empty-condition rules with `createSection` action

### Phase 3: setAsHeading support

- Transform layer: `setAsHeading` starts a new section, element text becomes both `Heading` and the section boundary
- Section Id derived from heading text (kebab-case), not role name
- `addAsContent` and `addAsList` append to current section
- `exclude` skips element
- State machine assembly logic

### Phase 4: Extracted tab reflection

- After rules are applied, the Extracted view shows the composed sections
- Areas with rules show named sections instead of raw element lists
- Feedback loop: save rules → re-extract → see result without switching tabs

### Phase 5: Default rule support

- Allow a rule with no conditions as a catch-all
- Only valid for `addAsContent`, `addAsList`, `exclude` (not `createSection` or `setAsHeading`)
- UI: "Default" badge on the rule card, conditions section hidden

---

## Open Questions

1. **Role name for setAsHeading:** Currently the role name field says "Section name." For `setAsHeading`, the section name comes from the heading text, not the role. Should the role input be hidden/disabled for `setAsHeading`? Or repurposed as a "rule label" for identification in the editor?

2. **Ordering within addAsList:** Should multiple `addAsList` elements within one section be rendered as a single Markdown list, or as individual bullet items with blank lines between them? Probably a single contiguous list.

3. **Mixed actions in one section:** What happens if a section started by `setAsHeading` has both `addAsContent` and `addAsList` elements? The content should appear in document order — paragraphs as paragraphs, bullets as bullets. The assembly logic needs to track "are we currently in a list?" to produce clean Markdown.

4. **Multiple heading rules:** If two `setAsHeading` rules exist (e.g., one for main headings, one for sub-headings), should sub-headings create nested sections or just `### sub-heading` within the parent section? For now, probably treat all `setAsHeading` equally — each starts a new section. Sub-heading support is a future enhancement.

5. **"Whole area" mapping:** AREA_LEVEL_RULES.md described a "whole area" behaviour where everything concatenates into one field. With actions, this could be: one `setAsHeading` rule for the area name + one default `addAsContent` rule. Or it might need a dedicated action. Park for later.
