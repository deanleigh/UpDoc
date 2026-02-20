# Rules & Definitions v2: Outlook-Inspired Conditions + Composable Definitions

> **Status:** IN PROGRESS — initial v2a implementation on `feature/rules-actions-v2` branch (data model, transform pipeline, rules editor UI). Refining to v2b (three-property model) based on testing feedback.
> **Supersedes:** `SECTION_BUILDER.md` (which defined the original action types).
> **Branch:** `feature/rules-actions-v2` (created from `main`).

---

## Summary

Redesign the rules editor and transform pipeline using the Outlook Rules pattern:
- **Conditions** = IF (font size, color, position, text matching)
- **Format** = block-level Markdown format (Paragraph, Heading 1-6, Bullet, Numbered, Quote) + optional inline formatting (Bold, Italic)
- **Starts section** = does this element begin a new section boundary? (checkbox, independent of format)
- **Exceptions** = UNLESS (negative conditions using the same vocabulary as conditions)
- **Exclude** = skip element entirely (overrides format and section)

Also: collapse Extracted + Transformed tabs into one rendered Markdown view (Obsidian reading mode style), unify "Define Structure" and "Edit Rules" buttons.

See also: `CORE_CONCEPT.md` — the foundational principle that everything becomes Markdown, and rules are Markdown conversion instructions.

---

## The Outlook Rules Model

The rules editor follows Outlook's Rules pattern. A rule in Outlook has four parts, and ours maps directly:

### The Four Layers

| # | Outlook | UpDoc Equivalent |
|---|---------|-----------------|
| 1 | **Rule name** — "For all messages from PayPal" | **Role name** — "Tour Title", "Day Heading", "Section Body" |
| 2 | **Conditions** (IF) — "Sender address includes paypal.com" | **Conditions** (IF) — font size equals 28, font name contains Clarendon, color equals #FFFFFF |
| 3 | **Definition** (THEN) — "Categorise → Finance" | **Definition** (THEN) — three independent properties: Format + Starts Section + Exclude |
| 4 | **Exceptions** (UNLESS) — "Unless subject includes newsletter" | **Exceptions** (UNLESS) — Unless text contains "Terms and Conditions" |

Plus two controls:
- **Stop processing more rules** → our first-match-wins behaviour (element claimed by one rule is excluded from later rules)
- **Run rule now** → our "re-run transform" / preview

### Why "Definition" Not "Action"

In Outlook, "action" fits because the system literally *does* something: moves an email, categorises it, forwards it. Those are operations.

In UpDoc, you're not telling the system to do something — you're telling it what the element **is**. "This IS a heading 3." "This IS paragraph content." "This IS a section boundary." It's declarative, not imperative.

**"Definition"** fits better than "action". And it naturally supports composability — an element can be defined as more than one thing simultaneously (e.g., both a Heading 3 AND a section boundary). The old "action" model forced a single choice.

### Conditions Are Pre-existing, Not User-Created

In Outlook, conditions come from a predefined categorized list — you pick from what the system knows about (People, Subject, Keywords, Message size, etc.). You don't invent your own condition types.

In UpDoc, the same applies. Conditions come from **what the source provides**:

| Source | Available Conditions | Richness |
|--------|---------------------|----------|
| **PDF** | Font size, font name, color, position (x/y), page number, bounding box | Richest — PdfPig extracts all visual metadata |
| **Word** | Style name (Heading 1, Normal, etc.), font properties | Medium — styles carry structure |
| **Web** | CSS selector, HTML element type, class name | Medium — DOM provides structure |
| **Markdown** | Heading level, code block, list type | Simplest — structure is already explicit |

The harder the source, the more conditions the user needs to define. The easier the source, the fewer conditions (possibly none).

### The Categorized Dropdown

Outlook groups conditions into categories with styled section headers:

```
Font                          (category header)
  Font size equals            (condition)
  Font size above
  Font size below
  Font name contains
  Font name equals
Color                         (category header)
  Color equals
Text                          (category header)
  Text begins with
  Text ends with
  Text contains
  Text matches pattern
Position                      (category header)
  Position is first
  Position is last
```

This grouped dropdown is visually clean. Implementation in Umbraco may require modern CSS (`<optgroup>` or CSS-styled dropdown). Worth investigating but not a blocker — a flat list works as a fallback.

### Key UX Insight: Rules Already Exist Before the User Starts

When PdfPig extracts a PDF, every element arrives with its metadata — font size, color, font name, position. Those metadata values ARE the conditions. **The rule already partially exists.** It just doesn't have a name or an action yet.

This means "Create Rule" is misleading. The user isn't creating a rule from nothing — they're **completing** a rule by:
1. Giving it a **name** (role) — "Tour Title"
2. Choosing a **format** — Heading 3, Paragraph, Bullet List Item
3. Optionally checking **starts section** — does this begin a new group?
4. Optionally adding **exceptions** — Unless text contains "NB:"

The conditions were already there the moment the content was extracted. The button should reflect this — something like "Define Rule" or "Assign Role" rather than "Create Rule".

### Exceptions (UNLESS)

Exceptions use the same condition vocabulary as conditions but act as negative filters. They enable single-rule expressions for cases we currently handle with separate `exclude` rules:

**Without exceptions (current):**
```
Rule 1: IF font=10, Helvetica, Black → THEN sectionContent
Rule 2: IF text contains "Terms and Conditions" → THEN exclude
Rule 3: IF text contains "NB:" → THEN exclude
```

**With exceptions:**
```
Rule 1: IF font=10, Helvetica, Black → THEN sectionContent
         UNLESS text contains "Terms and Conditions"
         UNLESS text contains "NB:"
```

Exceptions are a future enhancement — they simplify rule authoring but aren't required for the core pipeline to work. The current approach (separate exclude rules) achieves the same result.

---

## Naming Conventions (REVISED — Feb 2026)

Adopts Outlook's structural terminology for rules and conditions. Replaces "action" with "definition" — three independent, composable properties per rule.

### Structural Terms

| Term | Definition | Outlook Equivalent |
|------|-----------|-------------------|
| **Rule** | A complete instruction: name + conditions + definition (format + starts section + exclude) + optional exceptions | Rule |
| **Condition** | An IF clause — matches element metadata (font size, color, text content) | Condition |
| **Definition** | The THEN clause — three composable properties that define what this element is | Action (but declarative, not imperative) |
| **Format** | Which Markdown syntax this element produces — block-level (Heading, Paragraph, Bullet) and inline (Bold, Italic) | N/A — UpDoc-specific |
| **Starts section** | Whether this element begins a new section boundary (checkbox) | N/A — UpDoc-specific |
| **Exclude** | Skip element entirely — overrides format and section | N/A |
| **Exception** | An UNLESS clause — negative filter on conditions | Exception |

### The Three-Property Definition Model

**Previous model (v2a):** Single "Action" dropdown (Section Title / Section Content / Exclude) with a conditional Format sub-dropdown. This forced a choice — an element could start a section OR have a format, but not both.

**New model (v2b):** Three independent properties. An element can be defined as multiple things simultaneously.

| Property | UI Control | Default | Purpose |
|----------|-----------|---------|---------|
| **Format** | Dropdown (always visible) | Paragraph | What block-level Markdown does this produce? |
| **Starts section** | Checkbox | Off | Does this element begin a new section group? |
| **Exclude** | Checkbox | Off | Skip this element entirely (overrides format + section) |

**Why separated:** In the v2a model, "Day 1" in an itinerary couldn't be both a section boundary AND a Heading 3 — the user had to pick Section Title (grouping, no format) or Section Content (format, no grouping). With separation, both are expressible:

```
Rule: "Day Heading"
  Format: Heading 3       ← produces ### Day 1
  Starts section: ✓       ← each day is its own mappable section
```

### Block Format Values

Block format controls the Markdown block structure. Follows the same vocabulary as Obsidian's **Paragraph** menu and Word's **Format** toolbar.

| JSON Value | UI Label | Markdown Output | Example Use |
|-----------|----------|----------------|-------------|
| `paragraph` | Paragraph | `text` (plain) | Body text, descriptions |
| `heading1` | Heading 1 | `# text` | Page-level headings |
| `heading2` | Heading 2 | `## text` | Major content headings |
| `heading3` | Heading 3 | `### text` | Day headings, sub-headings |
| `heading4` | Heading 4 | `#### text` | Minor sub-headings |
| `heading5` | Heading 5 | `##### text` | Deep nesting (rare) |
| `heading6` | Heading 6 | `###### text` | Deepest nesting (rare) |
| `bulletListItem` | Bullet List | `- text` | Feature bullet points |
| `numberedListItem` | Numbered List | `1. text` (auto-numbered) | Step-by-step instructions |
| `quote` | Quote | `> text` | Callouts, disclaimers, testimonials |

Default format: `paragraph` (backward compatible with existing rules).

### Inline Format Values (Composable — Multiple Can Apply)

Inline formatting wraps the text with Markdown inline syntax. Multiple can be applied to the same element (e.g., Bold + Italic = `***text***`).

| JSON Value | UI Label | Markdown Output | Auto-Detect From |
|-----------|----------|----------------|-----------------|
| `bold` | Bold | `**text**` | Font name contains "Bold" |
| `italic` | Italic | `*text*` | Font name contains "Italic" or "Oblique" |
| `strikethrough` | Strikethrough | `~~text~~` | Manual only |
| `code` | Code | `` `text` `` | Font name contains "Mono" or "Courier" |

Inline formats are optional — if none are specified, the text is plain within its block format. When combined with a block format: `### **Day 1**` (Heading 3 + Bold).

**Auto-detection:** For PDF sources, inline formatting can be inferred from font metadata. The conditions already capture this information. Auto-detection is a convenience — the user can override.

### Condition Values

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

### UI Button Labels

| Current Label | New Label | Rationale |
|---|---|---|
| "Create Rule" | "Define Rule" | Conditions already exist from extraction. User is completing a rule, not creating from scratch. |
| "Edit Rules" | "Edit Rules" | No change — still correct when editing existing rules. |

### C# Property Names (v2b)

```csharp
public class SectionRule
{
    public string Role { get; set; }                    // User-defined name: "Tour Title"
    public string Format { get; set; } = "paragraph";   // Block format: "paragraph" | "heading1" | ... | "quote"
    public List<string>? InlineFormats { get; set; }     // Inline: ["bold"], ["italic"], ["bold", "italic"]
    public bool StartsSection { get; set; }              // Does this element begin a new section?
    public bool Exclude { get; set; }                    // Skip element entirely (overrides format + section)
    public List<RuleCondition> Conditions { get; set; }
    public List<RuleCondition>? Exceptions { get; set; }

    // Backward compatibility: old Action property still accepted on deserialization
    // "sectionTitle" → StartsSection=true, "sectionContent" → StartsSection=false,
    // "exclude" → Exclude=true. See GetNormalizedDefinition().
    public string? Action { get; set; }  // Legacy — ignored when Format/StartsSection are present
}
```

### TypeScript Types (v2b)

```typescript
export type BlockFormat =
    | 'paragraph'
    | 'heading1' | 'heading2' | 'heading3'
    | 'heading4' | 'heading5' | 'heading6'
    | 'bulletListItem'
    | 'numberedListItem'
    | 'quote';

export type InlineFormat = 'bold' | 'italic' | 'strikethrough' | 'code';

export interface SectionRule {
    role: string;
    format: BlockFormat;                // Always present, default "paragraph"
    inlineFormats?: InlineFormat[];     // Optional, multiple can apply
    startsSection?: boolean;            // Does this begin a new section?
    exclude?: boolean;                  // Skip element entirely
    conditions: RuleCondition[];
    exceptions?: RuleCondition[];

    // Legacy — still accepted from old source.json files
    action?: string;  // "sectionTitle" | "sectionContent" | "exclude"
}
```

### Backward Compatibility (v2a → v2b)

The v2a model used a single `action` property. The v2b model replaces it with `format` + `startsSection` + `exclude`. Old JSON is normalized on load:

| Old `action` value | Old `format` | v2b `format` | v2b `startsSection` | v2b `exclude` |
|---|---|---|---|---|
| `sectionTitle` | (ignored) | `paragraph` | `true` | `false` |
| `sectionContent` | `paragraph` | `paragraph` | `false` | `false` |
| `sectionContent` | `heading3` | `heading3` | `false` | `false` |
| `sectionContent` | `bulletListItem` | `bulletListItem` | `false` | `false` |
| `exclude` | (ignored) | `paragraph` | `false` | `true` |
| `createSection` (legacy v1) | (none) | `paragraph` | `true` | `false` |
| `addAsContent` (legacy v1) | (none) | `paragraph` | `false` | `false` |
| `addAsList` (legacy v1) | (none) | `bulletListItem` | `false` | `false` |

---

## Source Tab UI Vision: Rendered Markdown with Map Buttons

The Source tab should present the shaped content as **rendered Markdown** (like Obsidian's reading view), not as a data table or list of editors.

### Why Rendered Markdown

- The user's mental model is "I'm looking at a document" — headings, paragraphs, bullet lists flowing naturally
- The current Transformed view is a data table (section names, row counts, badges) — useful for administration but not how content authors think
- Rendered Markdown makes it immediately obvious what's a heading, what's body text, what's a bulleted list
- Map buttons sit in the margin next to each section — pick a section, map it to a CMS field
- **With inline formatting**, the rendered view shows bold, italic, and code styling — the user sees a properly formatted document

### Obsidian as Reference

Obsidian's reading mode is the target aesthetic:
- Headings are visually large (H1 > H2 > H3)
- Bold and italic text renders inline
- Bullet lists and numbered lists are properly indented
- Blockquotes have a left border and muted styling
- Content flows like a real document, not a data table

Obsidian's context menu provides the vocabulary reference:
- **Format** menu = inline styling (Bold, Italic, Strikethrough, Code) — our inline formats
- **Paragraph** menu = block structure (Heading 1-6, Body, Bullet list, Numbered list, Quote) — our block format dropdown

### Implementation

Use a Markdown-to-HTML library (e.g., `marked`, `markdown-it`) to render the transform output. The rendered HTML sits inside a styled container with:
- Area colour bars on the left (existing visual)
- Map buttons in the right margin next to each section
- Mapping status badges (green when mapped)
- Section boundaries visually separated (subtle divider or spacing)

### Not Editable

Content is **reviewable, not editable** in the mapping view. Content editing happens in Umbraco after the document is created. UpDoc's job is extraction and mapping, not editing.

Considered putting content into Umbraco Markdown editors for inline editing — rejected because it would be a page full of separate editors with Map buttons, which is confusing. A rendered document view with Map buttons in the margin is cleaner.

### Areas Still Useful

The area groupings (Page Header, Organiser Information, Tour Details, Itinerary) with their colored bars are still useful as visual context. They provide the "where in the document am I?" framing around the rendered Markdown sections. Areas are the container; rendered Markdown is the content within.

---

## Key Decisions (Feb 2026 Sessions)

### 1. Three-Property Definition Model (Replaces Two-Level Action Model)

**Previous (v2a):** Single "Action" dropdown (Section Title / Section Content / Exclude) with a conditional Format dropdown. Forced a choice — Section Title had no format option, Section Content couldn't start a section.

**Problem discovered during testing:** In the Itinerary area, "Day 1" needed to be both a Heading 3 (Markdown format) AND a section boundary (grouping). The v2a model couldn't express this — you had to pick one role or the other.

**New (v2b):** Three independent, composable properties:

| Property | UI Control | Always Visible? | Purpose |
|----------|-----------|----------------|---------|
| **Format** | Dropdown | Yes | Block-level Markdown: Paragraph, Heading 1-6, Bullet, Numbered, Quote |
| **Starts section** | Checkbox | Yes | Does this element begin a new section boundary? |
| **Exclude** | Checkbox | Yes | Skip entirely (disables format + section when checked) |

Plus optional **inline formatting** (Bold, Italic, Strikethrough, Code) as multi-select checkboxes.

**Why this is better:**
- Format is always relevant for every non-excluded element — no conditional visibility
- Section boundary is an independent structural concern — not tied to format
- "Exclude" is a clear override, not a dropdown option alongside unrelated concepts
- Composable: `Heading 3 + Starts Section` is now expressible

### 2. JSON Schema (v2b)

```json
{
  "role": "Day Heading",
  "format": "heading3",
  "startsSection": true,
  "conditions": [
    { "type": "fontSizeEquals", "value": 10 },
    { "type": "fontNameContains", "value": "HelveticaNeue-Medium" },
    { "type": "colorEquals", "value": "#16549D" }
  ]
}
```

```json
{
  "role": "Tour Title",
  "format": "paragraph",
  "startsSection": true,
  "conditions": [
    { "type": "fontSizeEquals", "value": 28 },
    { "type": "fontNameContains", "value": "Clarendon" }
  ]
}
```

```json
{
  "role": "Section Body",
  "format": "paragraph",
  "inlineFormats": ["bold"],
  "conditions": [
    { "type": "fontSizeEquals", "value": 8.5 },
    { "type": "fontNameContains", "value": "HelveticaNeue-Bold" }
  ]
}
```

### 3. UI Layout for Rule Definition

```
┌──────────────────────────────────────────────────┐
│  1  [Day Heading                            ] 🗑  │
│                                                    │
│  Font size equals      [10                    ] 🗑  │
│  Font name contains    [HelveticaNeue-Medium  ] 🗑  │
│  Color equals          [#16549D               ] 🗑  │
│                  + Add condition                    │
│                                                    │
│  Format: [Heading 3 ▾]    Inline: ☐Bold ☐Italic   │
│  ☑ Starts section          ☐ Exclude               │
│                                                    │
│  Exceptions:                                       │
│                  + Add exception                    │
│                                                    │
│  ✓ Matched 6×                                      │
└──────────────────────────────────────────────────┘
```

### 4. Collapse Extracted + Transformed Tabs → Rendered Markdown

**Decision:** Replace both the Extracted (data table) and Transformed (data table) views with a single rendered Markdown view. The shaped output is rendered as a formatted document (Obsidian reading mode), not a table.

**Rationale:**
- The user's mental model is "I'm looking at a document" — not rows and columns
- Rendered Markdown makes headings, bullets, bold, and structure immediately visible
- The Three-Layer Pipeline (Extract → Shape → Map) is still three conceptual layers, but the UI shows one formatted output
- Area colour bars provide document-position context around the rendered content
- Map buttons sit in the margin — the document view IS the mapping workspace

### 5. UI Hierarchy and Labelling

```
Page 1                                         2 sections, 3 areas
  Area: Page Header          [2 rules]    3 sections    [Edit Rules]
    Section: Organisation      "Art Fund Devon"                [Map]
    Section: Tour Title        "The Moorish Treasures..."      [Map]
    Section: Tour Description  "6 days from £1,649..."         [Map]

  Area: Tour Details         [2 rules]    5 sections    [Edit Rules]
    > Section: Features        • 4* hotels throughout...   [mapped badges] [expand]
    > Section: What We Will See  • Granada orientation...                  [expand]
    > Section: Optional          • Flamenco evening                        [expand]
    > Section: Accommodation     We stay two nights...                     [expand]
    > Section: Extras To Your Tour  • Single room supplement...            [expand]

  Area: Itinerary            [3 rules]    1 section     [Edit Rules]
    Section: Itinerary         ## Day 1 / We meet at...                    [Map]
```

**Prefixes:**
- "Area: {name}" — makes it clear this is an area grouping (yellow bar)
- "Section: {name}" — makes it clear this is a section within the area

### 6. Section Card Layout (uui-box per section) — IMPLEMENTED

Each section is rendered as a `uui-box` card:

**Simple sections** (Organisation, Tour Description, etc.): Box with headline, one body row showing content on the left and badge + Map button on the right.

**Multi-part sections** (Features, What We Will See, etc.): Box with headline, separate rows for title and content within the box. Each row has content on the left and its own badge + Map button on the right. Rows are separated by horizontal border lines.

- Map buttons appear on box hover (hidden by default), following the block grid editor pattern
- Mapped sections show a green left border on the box
- Green `uui-tag` badges with "x" button for inline unmapping
- Multi-part detection: `hasMultipleParts` checks for heading + complex content (multi-line), or description/summary fields

### 7. Auto-Numbering for Numbered Lists

When format = `numberedListItem`, maintain a running counter:
- Increment for each consecutive `numberedListItem`
- Reset to 0 when any other format is encountered
- Output: `1. text`, `2. text`, `3. text`, etc.

### 8. User-Defined Role Names

Role names are user-defined, not a fixed list. "Organisation", "Tour Title", "Tour Description" are Tailored Travels concepts. Other sites would have completely different names.

The role name serves as:
- A label in the rules editor (identify which rule is which)
- When `startsSection` is true: the section name/heading when displayed and mapped
- When `startsSection` is false: a category label in the rules editor only

### 9. Unify "Define Structure" and "Edit Rules" Buttons

**Problem:** The Source tab shows two different buttons depending on area state:
- Areas WITH rules → "Edit Rules" (opens rules editor modal)
- Areas WITHOUT rules → "Define Structure" (enters old teach-by-example mode)

"Define Structure" is the original teach-by-example mechanism that predates the rules editor. The user clicks an element, UpDoc infers a `sectionPattern` based on font size, and uses that to split the area. It's a simpler, more limited version of what the rules editor does.

**Decision:** Remove "Define Structure". All areas show one consistent button that opens the rules editor modal. The teach-by-example inference could become a feature within the rules editor in the future (e.g., "Suggest rules from sample" button inside the modal).

### 10. Exceptions (UNLESS) — Promoted from Future to Current

**Previously:** Exceptions were marked as a "future enhancement". Testing revealed they're needed now — the NB disclaimer in the Itinerary requires either a separate `exclude` rule or an exception on the body text rule.

**Exceptions are cleaner:**
```
Rule: "Day Body"
  FORMAT paragraph
  IF font=10, HelveticaNeue, #221F1F
  UNLESS text contains "NB:"
  UNLESS text contains "Please note"
```

vs. separate exclude rules (current approach):
```
Rule 1: Day Body → FORMAT paragraph, IF font=10, HelveticaNeue, #221F1F
Rule 2: Exclude NB → EXCLUDE, IF text contains "NB:"
Rule 3: Exclude Please note → EXCLUDE, IF text contains "Please note"
```

Exceptions use the same condition vocabulary as conditions. Same dropdown, same value types. The only difference is the logic is inverted — if any exception matches, the rule doesn't apply to that element.

---

## Real-World Examples (v2b Model)

### Page Header (standalone sections, each maps to a different property)

```
Rule 1: IF font=11.4, HelveticaNeue-Medium, #FFD200, positionFirst
         FORMAT paragraph, STARTS SECTION, role="Organisation"

Rule 2: IF font=28, Clarendon, #FFFFFF
         FORMAT paragraph, STARTS SECTION, role="Tour Title"

Rule 3: IF font=14.4, HelveticaNeue-Medium, #FFD200, positionLast
         FORMAT paragraph, STARTS SECTION, role="Tour Description"
```

Result: 3 standalone sections. Each has one Map button → maps to a document property. Format is "paragraph" because the destination field is plain text — the Markdown heading level isn't needed here.

### Tour Details (title + content sections, each maps to block fields)

```
Rule 1: IF font=12, Clarendon, #16549D
         FORMAT paragraph, STARTS SECTION, role="Section Title"

Rule 2: IF font=8.5, HelveticaNeue, #16549D
         FORMAT paragraph, role="Section Body"
```

Result: 5 sections (Features, What We Will See, Optional, Accommodation, Extras). Each expands to show title + content separately mappable.

### Itinerary — One Section (all days in one rich text field)

```
Rule 1: IF font=10, HelveticaNeue-Medium, #16549D
         FORMAT heading3, role="Day"

Rule 2: IF font=10, HelveticaNeue, #221F1F
         FORMAT paragraph, role="Day Body"
         UNLESS text contains "NB:"
         UNLESS text contains "Please note"
```

Result: 1 section with `### Day 1` headings + paragraph body text, all accumulating together. Maps as one block to Suggested Itinerary rich text. NB disclaimer excluded via exceptions.

### Itinerary — Separate Sections (each day individually mappable)

```
Rule 1: IF font=10, HelveticaNeue-Medium, #16549D
         FORMAT heading3, STARTS SECTION, role="Day"

Rule 2: IF font=10, HelveticaNeue, #221F1F
         FORMAT paragraph, role="Day Body"
         UNLESS text contains "NB:"
```

Result: 6 separate sections (Day 1, Day 2, ... Day 6), each starting with `### Day N` heading. Each can be mapped individually or all to the same field. **This was impossible with the v2a model** — `sectionTitle` had no format option, so days couldn't be both section boundaries AND headings.

---

## Implementation Plan

### Phase 1: Data Model + Transform + Rules Editor UI — COMPLETE (v2a)

**Branch:** `feature/rules-actions-v2`

Implemented the initial v2a model (Action + conditional Format):
- ✅ C# `SectionRule`: `Action` + `Format` properties, `GetNormalizedAction()` for backward compatibility
- ✅ TypeScript: `RuleAction`, `RuleContentFormat`, `normalizeAction()` function
- ✅ `ContentTransformService.cs`: normalized v2 actions, `FormatContentLine()` with heading/bullet/numbered output
- ✅ Rules editor UI: Action dropdown (Section Title / Section Content / Exclude), conditional Format dropdown
- ✅ Legacy action names (`createSection`, `addAsContent`, `addAsList`) normalized on load
- ✅ Both TypeScript and .NET builds pass

### Phase 2: Refactor to Three-Property Model (v2b) — NOT STARTED

Refactor from Action+Format to Format+StartsSection+Exclude:

**C# — `SectionRules.cs`:**
- Replace `Action` with `Format` (string, default "paragraph"), `StartsSection` (bool), `Exclude` (bool)
- Add `InlineFormats` (List<string>?, optional)
- Add `Exceptions` (List<RuleCondition>?, optional)
- Update `GetNormalizedAction()` → `GetNormalizedDefinition()` for backward compatibility with v2a and v1 JSON
- Expand format values: add `heading4`-`heading6`, `quote`

**TypeScript — `workflow.types.ts`:**
- Replace `RuleAction` with `BlockFormat` and `InlineFormat` types
- Update `SectionRule` interface: `format`, `inlineFormats?`, `startsSection?`, `exclude?`, `exceptions?`
- Update `normalizeAction()` → `normalizeDefinition()` to handle v1 → v2a → v2b

**`ContentTransformService.cs`:**
- Replace action-driven switch with definition-driven logic:
  - If `StartsSection`: flush current section, start new one with this element's text as heading
  - If `Exclude`: skip element
  - Apply `Format` to produce Markdown (always, not conditional on action type)
  - Apply `InlineFormats` wrapping (`**text**`, `*text*`, etc.)
  - Check `Exceptions` before applying rule (same condition evaluation, inverted result)
- Expand `FormatContentLine()`: add `heading4`-`heading6`, `quote` (`> text`)

### Phase 3: Rules Editor UI (v2b) — NOT STARTED

**`section-rules-editor-modal.element.ts`:**
- Replace Action dropdown with:
  - Format dropdown (always visible): Paragraph, Heading 1-6, Bullet, Numbered, Quote
  - Inline format checkboxes: Bold, Italic, Strikethrough, Code
  - "Starts section" checkbox
  - "Exclude" checkbox (disables format + section when checked)
- Add Exceptions section: "+ Add exception" with same condition dropdown/value as conditions
- Match the UI layout in "Key Decisions > 3. UI Layout for Rule Definition"

### Phase 4: Rendered Markdown View — COMPLETE

**`up-doc-workflow-source-view.element.ts`:**
- ✅ Replaced Transformed tab data table with `uui-box` card layout
- ✅ Each section is a `uui-box` with heading as headline
- ✅ Simple sections: one body row (content left, badge + Map right)
- ✅ Multi-part sections: separate rows for title + content, each with badge + Map, separated by border lines
- ✅ Markdown rendered as HTML via `markdownToHtml()` (uses `marked` library)
- ✅ Map buttons hidden by default, appear on box hover (block grid editor pattern)
- ✅ Mapped sections show green left border + green `uui-tag` badges with inline unmap
- Note: Area colour bars as containers around rendered content not yet implemented (sections are shown flat, not grouped by area)

### Phase 5: Unify "Define Structure" and "Edit Rules" — NOT STARTED

**`up-doc-workflow-source-view.element.ts`:**
- Remove the old "Define Structure" teach-by-example button
- All areas show "Edit Rules" (or "Define Rules") consistently
- Opens the rules editor modal regardless of whether rules exist yet
- The teach-by-example inference could become a feature within the rules editor (future)

### Phase 6: Backward Compatibility — ONGOING

- v1 JSON (`createSection`/`addAsContent`/`addAsList`) still works → normalized to v2b on load
- v2a JSON (`action`/`format`) still works → normalized to v2b on load
- No migration tool needed — old values work, new UI writes new v2b values
- Existing `map.json` entries continue to work

---

## Files to Modify (v2b)

| File | Changes |
|------|---------|
| `src/UpDoc/Models/SectionRules.cs` | Replace `Action` with `Format`+`StartsSection`+`Exclude`+`InlineFormats`+`Exceptions` |
| `src/UpDoc/Services/ContentTransformService.cs` | Definition-driven loop, inline format wrapping, exception evaluation, expanded formats |
| `src/UpDoc/wwwroot/.../workflow.types.ts` | `BlockFormat`+`InlineFormat` types, updated `SectionRule` interface, `normalizeDefinition()` |
| `src/UpDoc/wwwroot/.../section-rules-editor-modal.element.ts` | Format dropdown (always visible), inline checkboxes, Starts Section checkbox, Exclude checkbox, Exceptions section |
| `src/UpDoc/wwwroot/.../up-doc-workflow-source-view.element.ts` | Rendered Markdown view (replace data table), remove "Define Structure" button, unify to "Edit Rules" |

---

## Migration Path (Three Generations)

Rules have gone through three JSON formats. All are supported via normalization on load:

### v1 → v2b (original action names)

| v1 value | v2b `format` | v2b `startsSection` | v2b `exclude` |
|---|---|---|---|
| `createSection` | `paragraph` | `true` | `false` |
| `setAsHeading` | `paragraph` | `true` | `false` |
| `addAsContent` | `paragraph` | `false` | `false` |
| `addAsList` | `bulletListItem` | `false` | `false` |
| `exclude` | `paragraph` | `false` | `true` |

### v2a → v2b (action + conditional format)

| v2a `action` | v2a `format` | v2b `format` | v2b `startsSection` | v2b `exclude` |
|---|---|---|---|---|
| `sectionTitle` | (any) | `paragraph` | `true` | `false` |
| `sectionContent` | `heading3` | `heading3` | `false` | `false` |
| `sectionContent` | `paragraph` | `paragraph` | `false` | `false` |
| `sectionContent` | `bulletListItem` | `bulletListItem` | `false` | `false` |
| `exclude` | (any) | `paragraph` | `false` | `true` |

**Note:** When migrating `sectionTitle` from v2a, the `format` from v2a is discarded because v2a Section Titles had no format option — it was always implied. In v2b, Section Titles can have any format.

---

## Relationship to Other Planning Docs

| Document | Relationship |
|----------|-------------|
| `SECTION_BUILDER.md` | **Superseded by this doc.** Original action types replaced with three-property definition model. |
| `CORE_CONCEPT.md` | Foundational. "Any Source → Markdown → Pick Pieces → Map to CMS Fields." Rules are Markdown conversion instructions. |
| `THREE_LAYER_PIPELINE.md` | Pipeline unchanged conceptually (Extract → Shape → Map). UI collapses to rendered Markdown view but the layers still exist in the data flow. |
| `DESTINATION_DRIVEN_MAPPING.md` | Mapping direction unchanged. Sections (defined by `startsSection` boundaries) are the mappable units. |
| `EXTRACTED_TAB_UX_REVIEW.md` | Many issues resolved by this redesign (consistent labelling, rendered Markdown, unified buttons). |

---

## Screenshots

### Conditions dropdown with grouped categories
![Outlook Rules — conditions dropdown](images/outlook-rules-conditions.png)

Shows the "Add a condition" dropdown with categorised condition types (People, Subject, Keywords, Marked with, Message size, Received, etc.). Our equivalent: font size, font name, color, position conditions grouped by type.

### Conditional second dropdown (Categorise → pick category)
![Outlook Rules — conditional action dropdown](images/outlook-rules-conditional-dropdown.png)

Shows the composable property pattern: choosing "Categorise" as the action reveals a second dropdown to pick which category. Our equivalent: the Format dropdown is always visible (Paragraph, H1-H6, Bullet, Numbered, Quote), with independent checkboxes for Starts Section and inline formats.

---

## Text Transforms — PLANNED (Feb 2026)

Rules currently match elements and assign actions/formats, but pass the raw PDF text through as-is. Real-world PDFs contain artifacts that need cleaning before the content reaches the CMS:

### Observed Cases

| Issue | Raw Text | Desired Output |
|-------|---------|---------------|
| **Label prefix** | `Tel: 01803 732173` | `01803 732173` |
| **Label prefix** | `Email: john@frogmorecottage.org.uk` | `john@frogmorecottage.org.uk` |
| **Dot leaders** | `john@frogmorecottage.org.uk ........` | `john@frogmorecottage.org.uk` |
| **ALL CAPS** | `FROGMORE COTTAGE, ASHPRINGTON` | Already handled by `ToTitleCaseIfAllCaps()` for headings, but not for content |

More cases will emerge as more PDFs are processed. The transform system needs a way to clean up text at the rule level.

### Proposed: `textTransforms` Array on Rules

Each rule can optionally specify text transforms that clean the matched element's text before it enters the section:

```json
{
  "role": "organiser-telephone",
  "action": "singleProperty",
  "conditions": [{ "type": "textBeginsWith", "value": "Tel:" }],
  "textTransforms": [
    { "type": "stripPrefix", "value": "Tel:" },
    { "type": "trim" }
  ]
}
```

```json
{
  "role": "organiser-email",
  "action": "singleProperty",
  "conditions": [{ "type": "textBeginsWith", "value": "Email:" }],
  "textTransforms": [
    { "type": "stripPrefix", "value": "Email:" },
    { "type": "trimTrailingDots" },
    { "type": "trim" }
  ]
}
```

### Transform Types (Initial Set)

| Type | Value | Effect |
|------|-------|--------|
| `stripPrefix` | String to strip | Removes prefix if present (case-insensitive) |
| `stripSuffix` | String to strip | Removes suffix if present |
| `trim` | — | Trims leading/trailing whitespace |
| `trimTrailingDots` | — | Removes trailing `.` characters and whitespace |
| `regexReplace` | `{ pattern, replacement }` | General-purpose regex cleanup |
| `lowercase` | — | Convert to lowercase |
| `uppercase` | — | Convert to uppercase |
| `titleCase` | — | Convert to Title Case |

### Smart Prefix Stripping

Since conditions already know the prefix (e.g., `textBeginsWith: "Tel:"`), we could auto-suggest or auto-apply prefix stripping when `singleProperty` + `textBeginsWith` are combined. The condition tells us what the prefix IS — no need to type it twice.

### Implementation Notes

- Transforms apply AFTER the element is matched by conditions but BEFORE the text enters `FormatContentLine()` or the section content
- C#: `ContentTransformService` applies transforms in order (pipeline)
- TypeScript: Rules editor shows "Text Cleanup" section within each rule card, same add/remove pattern as conditions
- Backward compatible: rules without `textTransforms` work exactly as before

### Scope

This is a future enhancement — parked until the current rules rework (v2b three-property model) is complete. The observed cases are noted here so they don't get lost.

---

## Open Questions

1. **Default rule (no conditions):** Should a rule with no conditions be allowed as a catch-all for unmatched elements? Useful as "everything else is a paragraph".

2. **Sub-heading nesting:** If both H2 and H3 format rules exist in the same area, should H3 elements nest under H2 sections? For now: no nesting, all content is flat within the section.

3. **Inline format auto-detection:** Should the rules editor auto-suggest inline formats based on font metadata? e.g., if font name contains "Bold", pre-check the Bold inline format. This is a convenience, not a requirement.

4. **Markdown rendering library:** `marked` vs `markdown-it` vs other? `marked` is simpler; `markdown-it` is more extensible. Either works for our needs. Need to check bundle size impact.

5. ~~**Role name visibility**~~ RESOLVED: Role name is always visible in the rules editor. When `startsSection` is true, it also appears as the section heading in the rendered view.

6. ~~**Exceptions as future enhancement**~~ RESOLVED: Promoted to current. Exceptions are needed now for NB/disclaimer handling.