# Rules Editor

## Status: AGREED — Ready for Implementation

---

## Summary

The rules editor lets workflow authors define how PDF elements become structured content. Each area in a PDF has its own set of rules. Rules are organized into **visual group containers** (for multi-part sections like Tour Details) and **ungrouped rules** (for single properties like Tour Title).

The editor follows two design patterns:
- **Outlook Rules** for structure: collapsed summaries, expandable detail views, conditions + exceptions
- **Umbraco Document Type Designer** for grouping: named containers with drag-and-drop

---

## Design Influences

### Outlook Rules (Structure)
- **List view**: collapsed rule summaries, orderable, toggle-able
- **Detail view**: expand a rule to see conditions (dropdown + value pairs), actions, exceptions
- **Natural language**: each rule reads as a sentence — "For all messages from Vodafone → Categorise as Suppliers and Services"

### Umbraco Document Type Designer (Grouping)
- **Named groups**: click "+ Add group", give it a name, it becomes a visual container
- **Drag-and-drop**: properties can be dragged between groups or into/out of groups
- **Familiar pattern**: every Umbraco user already knows how this works

### AI Prompt Readability (Future-Proofing)
Every rule should read as a natural language sentence:
> "Match 12pt Clarendon blue text and include it in the 'Tour Detail' group as the title."

This is simultaneously:
1. A human-readable description
2. A valid AI prompt that could generate the rule
3. A summary of what the JSON stores

---

## Data Model (v3)

### Rule Schema

```json
{
  "role": "string",           // Human label for this rule (display only)
  "part": "string",           // Which slot: "title", "content", "description", "summary"
  "format": "string | null",  // Markdown format: "auto", "paragraph", "heading3", etc.
  "conditions": [...],
  "exceptions": [...],        // Optional: negative conditions
  "exclude": false            // Optional: skip this element entirely
}
```

### Area Rules Schema

Area rules have two top-level arrays — groups contain their own rules, ungrouped rules are standalone:

```json
{
  "groups": [
    {
      "name": "Tour Detail",
      "rules": [
        { "role": "Title", "part": "title", "format": "paragraph", "conditions": [...] },
        { "role": "Content", "part": "content", "format": "auto", "conditions": [...] }
      ]
    }
  ],
  "rules": [
    { "role": "Organisation", "part": "content", "conditions": [...] },
    { "role": "Tour Title", "part": "content", "conditions": [...] }
  ]
}
```

### C# Model

```csharp
public class SectionRule
{
    public string Role { get; set; }                    // Display label: "Tour Title"
    public string Part { get; set; } = "content";       // "title" | "content" | "description" | "summary"
    public string Format { get; set; } = "auto";        // Block format: "auto" | "paragraph" | "heading1" | ...
    public List<string>? InlineFormats { get; set; }     // ["bold"], ["italic"], etc.
    public bool Exclude { get; set; }                    // Skip element entirely
    public List<RuleCondition> Conditions { get; set; }
    public List<RuleCondition>? Exceptions { get; set; }

    // Legacy — accepted on deserialization, normalized to Part/Format
    public string? Action { get; set; }
}

public class AreaRules
{
    public List<RuleGroup> Groups { get; set; } = new();
    public List<SectionRule> Rules { get; set; } = new();  // Ungrouped rules
}

public class RuleGroup
{
    public string Name { get; set; }
    public List<SectionRule> Rules { get; set; } = new();
}
```

### TypeScript Types

```typescript
export type BlockFormat =
    | 'auto'
    | 'paragraph'
    | 'heading1' | 'heading2' | 'heading3'
    | 'heading4' | 'heading5' | 'heading6'
    | 'bulletListItem'
    | 'numberedListItem'
    | 'quote';

export type InlineFormat = 'bold' | 'italic' | 'strikethrough' | 'code';

export type RulePart = 'title' | 'content' | 'description' | 'summary';

export interface SectionRule {
    role: string;
    part: RulePart;
    format: BlockFormat;
    inlineFormats?: InlineFormat[];
    exclude?: boolean;
    conditions: RuleCondition[];
    exceptions?: RuleCondition[];
}

export interface RuleGroup {
    name: string;
    rules: SectionRule[];
}

export interface AreaRules {
    groups: RuleGroup[];
    rules: SectionRule[];  // Ungrouped
}
```

---

## Part Dropdown

Replaces the current ACTION dropdown.

| Part | Meaning | When used |
|------|---------|-----------|
| **Title** | Section heading, triggers boundaries in grouped sections | Grouped: heading text that creates new instances (e.g., "FEATURES", "ACCOMMODATION") |
| **Content** | Main body content | Both: body text, bullet lists, paragraphs |
| **Description** | Secondary descriptive text | Grouped: supplementary text within a section |
| **Summary** | Summary or abstract text | Grouped: brief overview text |
| **Exclude** | Skip this element entirely | Both: explicitly ignore matched elements |

For **ungrouped rules** (single properties): Part is always "Content". The dropdown can be hidden or defaulted.

For **grouped rules**: Part determines which slot the matched element fills. "Title" triggers section boundaries (flush current instance, start new one).

---

## Conditions

Conditions follow Outlook's descriptive phrase style. Grouped by category in the dropdown.

| JSON Value | UI Label | Category |
|-----------|----------|----------|
| `fontSizeEquals` | Font size equals | Font |
| `fontSizeAbove` | Font size above | Font |
| `fontSizeBelow` | Font size below | Font |
| `fontNameContains` | Font name contains | Font |
| `fontNameEquals` | Font name equals | Font |
| `colorEquals` | Color equals | Color |
| `textBeginsWith` | Text begins with | Text |
| `textEndsWith` | Text ends with | Text |
| `textContains` | Text contains | Text |
| `textEquals` | Text equals | Text |
| `textMatchesPattern` | Text matches pattern | Text |
| `positionFirst` | Position is first | Position |
| `positionLast` | Position is last | Position |

**Key insight:** Conditions are pre-existing, not user-created. When PdfPig extracts a PDF, every element arrives with metadata (font size, color, font name, position). The rule partially exists already. The user completes it by giving it a name, part, and format.

**Source-specific condition richness:**

| Source | Available Conditions |
|--------|---------------------|
| **PDF** | Font size, font name, color, position, page number — richest |
| **Word** | Style name, font properties — medium |
| **Web** | CSS selector, HTML element, class — medium |
| **Markdown** | Heading level, code block, list type — simplest |

---

## Format Options

### Block Format

Controls the Markdown block structure. Default: `auto` (pattern detection decides).

| JSON Value | UI Label | Markdown Output |
|-----------|----------|----------------|
| `auto` | Auto | System decides based on content patterns |
| `paragraph` | Paragraph | `text` (plain) |
| `heading1` | Heading 1 | `# text` |
| `heading2` | Heading 2 | `## text` |
| `heading3` | Heading 3 | `### text` |
| `heading4` | Heading 4 | `#### text` |
| `heading5` | Heading 5 | `##### text` |
| `heading6` | Heading 6 | `###### text` |
| `bulletListItem` | Bullet List | `- text` |
| `numberedListItem` | Numbered List | `1. text` (auto-numbered) |
| `quote` | Quote | `> text` |

### Inline Format (Composable)

Multiple can apply simultaneously (e.g., Bold + Italic = `***text***`).

| JSON Value | UI Label | Markdown Output | Auto-Detect From |
|-----------|----------|----------------|-----------------|
| `bold` | Bold | `**text**` | Font name contains "Bold" |
| `italic` | Italic | `*text*` | Font name contains "Italic" or "Oblique" |
| `strikethrough` | Strikethrough | `~~text~~` | Manual only |
| `code` | Code | `` `text` `` | Font name contains "Mono" or "Courier" |

---

## Exceptions (UNLESS)

Exceptions use the same condition vocabulary as conditions but act as negative filters. If any exception matches, the rule doesn't apply to that element.

```
Rule: "Day Body"
  FORMAT paragraph
  IF font=10, HelveticaNeue, #221F1F
  UNLESS text contains "NB:"
  UNLESS text contains "Please note"
```

vs. the alternative of separate exclude rules:
```
Rule 1: Day Body → FORMAT paragraph, IF font=10, HelveticaNeue, #221F1F
Rule 2: Exclude NB → EXCLUDE, IF text contains "NB:"
Rule 3: Exclude note → EXCLUDE, IF text contains "Please note"
```

---

## Visual Groups & Drag-and-Drop

### Creating a Group
1. Click "+ Add group" at the bottom of the area
2. A new empty group container appears with an editable name field
3. Type the group name (e.g., "Tour Detail")
4. Drag existing rules from ungrouped into the group, or add new rules inside it

### Moving Rules
- **Ungrouped → Group**: drag rule into group container
- **Group → Ungrouped**: drag rule out of group
- **Group → Group**: drag rule between groups
- **Reorder within group**: drag to change evaluation order

### Deleting a Group
- Delete button on group header
- Rules inside are moved to ungrouped (not deleted)
- Confirmation: "Move 2 rules to ungrouped and delete 'Tour Detail' group?"

### Implementation
Umbraco uses `UmbSorterController` for drag-and-drop in the Document Type designer:
- `Umbraco-CMS/src/Umbraco.Web.UI.Client/src/packages/core/sorter/`
- The `umbraco-sorter` skill documents the API

---

## Rules Editor Layout

### Collapsed View

```
── Tour details area ── 33 elements, 2 rules, 32 matched ──

  Ungrouped (Single Properties)
  ┌─────────────────────────────────────────────────┐
  │ (none — all rules in this area are grouped)     │
  └─────────────────────────────────────────────────┘

  Tour Detail                                [rename] 🗑
  ┌─────────────────────────────────────────────────┐
  │ ⠿ 1  Title rule          ✓ matched 4×          │
  │ ⠿ 2  Content rule        ✓ matched 28×         │
  │                         + Add rule              │
  └─────────────────────────────────────────────────┘

                            + Add group
```

### Expanded Rule

```
┌─ 1 ─────────────────────────────────────────────────┐
│  Title rule                                      🗑  │
│                                                      │
│  ▼ CONDITIONS (3)                                    │
│  ┌──────────────────┬────────────────────────────┬─┐ │
│  │ Font size equals │ 12                         │🗑│ │
│  ├──────────────────┼────────────────────────────┼─┤ │
│  │ Font name contns │ GHEALP+Clarendon           │🗑│ │
│  ├──────────────────┼────────────────────────────┼─┤ │
│  │ Color equals     │ #16549D                    │🗑│ │
│  └──────────────────┴────────────────────────────┴─┘ │
│                    + Add condition                    │
│                                                      │
│  ▼ EXCEPTIONS                                        │
│                    + Add exception                    │
│                                                      │
│  ▼ PART                                              │
│  ┌──────────────────────────────────────────────┐    │
│  │ Title                                      ▾ │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ▼ FORMAT (1)                                        │
│  ┌──────────┬───────────────────────────────────┬─┐  │
│  │ Block  ▾ │ Paragraph                       ▾ │🗑│  │
│  └──────────┴───────────────────────────────────┴─┘  │
│                    + Add format                       │
│                                                      │
│  ✓ Matched 4×: FEATURES, WHAT WE WILL SEE,          │
│    ACCOMMODATION, EXTRAS TO YOUR TOUR                │
└──────────────────────────────────────────────────────┘
```

---

## Text Transforms (Planned)

Rules can optionally specify text transforms that clean matched text before it enters the section:

```json
{
  "role": "organiser-telephone",
  "part": "content",
  "conditions": [{ "type": "textBeginsWith", "value": "Tel:" }],
  "textTransforms": [
    { "type": "stripPrefix", "value": "Tel:" },
    { "type": "trim" }
  ]
}
```

| Type | Value | Effect |
|------|-------|--------|
| `stripPrefix` | String | Removes prefix if present (case-insensitive) |
| `stripSuffix` | String | Removes suffix if present |
| `trim` | — | Trims leading/trailing whitespace |
| `trimTrailingDots` | — | Removes trailing `.` characters and whitespace |
| `regexReplace` | `{ pattern, replacement }` | General-purpose regex cleanup |
| `titleCase` | — | Convert to Title Case |

Transforms apply AFTER condition matching, BEFORE the text enters the section content. Smart prefix stripping: when `textBeginsWith` condition exists, the system can auto-suggest stripping that prefix.

---

## Backward Compatibility

Rules have gone through four JSON formats. All are supported via normalization on load.

### v1 (original action names)

| v1 value | v3 `part` | v3 `format` | v3 `exclude` |
|---|---|---|---|
| `createSection` | `content` | `paragraph` | `false` |
| `setAsHeading` | `title` | `paragraph` | `false` |
| `addAsContent` | `content` | `paragraph` | `false` |
| `addAsList` | `content` | `bulletListItem` | `false` |
| `exclude` | — | — | `true` |

### v2a (action + conditional format)

| v2a `action` | v2a `format` | v3 `part` | v3 `format` | v3 `exclude` |
|---|---|---|---|---|
| `singleProperty` | (any) | `content` (ungrouped) | `paragraph` | `false` |
| `sectionTitle` | (any) | `title` (grouped) | `paragraph` | `false` |
| `sectionContent` | `heading3` | `content` (grouped) | `heading3` | `false` |
| `sectionContent` | `paragraph` | `content` (grouped) | `paragraph` | `false` |
| `sectionDescription` | (any) | `description` (grouped) | `paragraph` | `false` |
| `sectionSummary` | (any) | `summary` (grouped) | `paragraph` | `false` |
| `exclude` | (any) | — | — | `true` |

### v2b (three-property: format + startsSection + exclude)

| v2b `startsSection` | v2b `format` | v3 `part` | v3 `format` |
|---|---|---|---|
| `true` | `heading3` | `title` | `heading3` |
| `false` | `paragraph` | `content` | `paragraph` |

### Grouped migration

Rules with `sectionTitle`/`sectionContent`/etc. actions from the same area are grouped together. The group name comes from the area's existing transform output (if available) or defaults to "Section".

---

## Real-World Examples

### Page Header (Single Properties)

```
Ungrouped:
  Rule 1: IF font=11.4, HelveticaNeue-Medium, #FFD200, positionFirst
          → role="Organisation", part=content, format=paragraph

  Rule 2: IF font=28, Clarendon, #FFFFFF
          → role="Tour Title", part=content, format=paragraph

  Rule 3: IF font=14.4, HelveticaNeue-Medium, #FFD200, positionLast
          → role="Tour Description", part=content, format=paragraph
```

Result: 3 single properties, each with one Map button.

### Tour Details (Grouped — Multiple Instances)

```
Group "Tour Detail":
  Rule 1: IF font=12, Clarendon, #16549D
          → role="Title", part=title, format=paragraph

  Rule 2: IF font=8.5, HelveticaNeue, #16549D
          → role="Content", part=content, format=auto
```

Result: 4 instances (Features, What We Will See, Accommodation, Extras). Each created by the title rule triggering a boundary. All share one mapping: `tour-detail.title` → block title, `tour-detail.content` → block content.

### Itinerary (Grouped — Single Instance)

```
Group "Itinerary":
  Rule 1: IF font=10, HelveticaNeue-Medium, #16549D
          → role="Day Number", part=content, format=heading3

  Rule 2: IF font=10, HelveticaNeue, #221F1F
          → role="Day Description", part=content, format=auto
          UNLESS text contains "NB:"
```

Result: 1 instance (no title part → no boundaries). All days accumulate as one content block with `### Day 1` headings. Maps to one rich text field.

---

## Implementation Phases

### Phase 1: Data Model
- Add `part` field and `RuleGroup`/`AreaRules` classes to C# models
- TypeScript types updated to match
- `ContentTransformService` reads `part` + group structure instead of action names
- Migration: normalize old `action` values to `part` + group placement
- Backwards compatible: old format auto-migrates on load

### Phase 2: Rules Editor UI — Groups
- Replace ACTION section with PART dropdown
- Add visual group containers (named, collapsible)
- "+ Add group" button creates a new named container
- Rules render inside their group container or in ungrouped section
- Drag-and-drop rules between groups (UmbSorterController)
- Group name editable (rename), delete moves rules to ungrouped

### Phase 3: Integration
- Update Transformed view to read new group structure
- Update mapping key generation: `{group-name}.{part}` for grouped, `{role-name}.content` for ungrouped
- Update bridge code for new key format

---

## Resolved Questions

| # | Question | Resolution |
|---|----------|------------|
| 1 | Group scope | Scoped to area — groups don't cross area boundaries |
| 2 | Multiple groups per area | Yes — an area can have multiple groups and ungrouped rules |
| 3 | Group ordering | Follows element order in the source document |
| 4 | Naming collisions | Prevented in UI — group names and role names must be unique within an area |
| 5 | Grouping mechanism | Visual containers with drag-and-drop, not shared strings |
| 6 | Fragility | Eliminated — grouping is structural (rule lives inside container), not by string convention |
| 7 | Default rule (no conditions) | Allowed as catch-all for unmatched elements (format/content only, not title) |

---

## Open Questions

1. **Inline format auto-detection:** Should the rules editor auto-suggest inline formats from font metadata? (Convenience, not blocker.)
2. **Sub-heading nesting:** If both H2 and H3 rules exist, should H3 nest under H2? (For now: no nesting, flat within section.)

---

## Supersedes

This document consolidates and replaces:
- `SECTION_BUILDER.md` — original action types
- `RULES_AND_ACTIONS_V2.md` — Outlook-inspired conditions, v2a/v2b model
- `EXPLICIT_GROUPING.md` — group + part data model proposal
- `RULES_EDITOR_GROUPS.md` — visual groups UI design

All moved to `planning/archive/`.
