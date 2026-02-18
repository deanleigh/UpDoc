# Rules & Actions v2: Outlook-Inspired Conditions + Actions

> **Status:** PLANNED — no code written yet.
> **Supersedes:** `SECTION_BUILDER.md` (which defined the original action types).
> **Branch:** TBD — create from `main` after merging `feature/destination-picker-fixes`.

---

## Summary

Redesign the rules editor and transform pipeline using the Outlook Rules pattern:
- **Conditions** = IF (font size, color, position, text matching)
- **Action** = THEN (Section Title / Section Content / Exclude)
- **Format** = conditional sub-option when Action = Section Content (Paragraph, H1, H2, H3, Bullet List, Numbered List)

Also: collapse Extracted + Transformed tabs into one unified view, add "Area:" and "Section:" prefixes, and implement Option C (collapsed sections, expand-to-map heading/content separately).

---

## Key Decisions (Feb 2026 Session)

### 1. Two-Level Action Model (Outlook Pattern)

Inspired by Outlook's "Add a condition" / "Add an action" pattern where choosing an action like "Categorise" reveals a conditional second dropdown (pick which category).

**Level 1 — Action (what role does this element play?):**
| Action | What it does |
|--------|-------------|
| **Section Title** | Starts a new section. This element's text becomes the section title. Flushes any open section. |
| **Section Content** | Accumulates within the current open section. Reveals format dropdown. |
| **Exclude** | Skip element entirely. |

**Level 2 — Format (only when Action = Section Content):**
| Format | Markdown output | Example use |
|--------|----------------|-------------|
| Paragraph | `text` (plain) | Body text, descriptions |
| Heading 1 | `# text` | Major content headings |
| Heading 2 | `## text` | Day headings (Day 1, Day 2) |
| Heading 3 | `### text` | Sub-headings within content |
| Bullet List Item | `- text` | Feature bullet points |
| Numbered List Item | `1. text` (auto-numbered) | Step-by-step instructions |

**Default format:** Paragraph (backward compatible with existing `addAsContent` rules).

### 2. Renamed Actions (Old → New)

| Old action value | New action value | New UI label |
|-----------------|-----------------|--------------|
| `createSection` | `sectionTitle` | Section Title |
| `setAsHeading` | `sectionTitle` | Section Title (merged, was always the same) |
| `addAsContent` | `sectionContent` | Section Content |
| `addAsList` | `sectionContent` (format=`bulletListItem`) | Section Content → Bullet List Item |
| `exclude` | `exclude` | Exclude |

**New in code:** `format` property on `SectionRule` (optional, only meaningful when action = `sectionContent`).

### 3. JSON Schema Change

```json
{
  "role": "Day Heading",
  "action": "sectionContent",
  "format": "heading2",
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
  "action": "sectionTitle",
  "conditions": [
    { "type": "fontSizeEquals", "value": 28 },
    { "type": "fontNameContains", "value": "Clarendon" }
  ]
}
```

Format values: `paragraph` (default), `heading1`, `heading2`, `heading3`, `bulletListItem`, `numberedListItem`.

### 4. Collapse Extracted + Transformed Tabs

**Decision:** Remove the Transformed tab. The Extracted tab's Composed Sections view IS the shaped output. Mapping happens directly from the Extracted tab.

**Rationale:**
- The action-driven grouping fix made the Composed Sections view show the same grouped sections as the Transformed tab
- Two tabs showing nearly the same data confuses users
- The Extracted view has richer data (area context, metadata, rule match info)
- The Three-Layer Pipeline (Extract → Shape → Map) is still three conceptual layers, but doesn't need three separate UI views

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

### 6. Section Expand-to-Map (Option C Hybrid)

For sections that have both a title and content (Tour Details pattern):

**Collapsed (default):** Single row showing section name + content preview + mapping badges for both heading and content.

**Expanded (click chevron):** Reveals two separately-mappable sub-rows:
- **Section Title**: "Features" — [Map button]
- **Section Content**: "4* hotels throughout, 2 dinners included..." — [Map button]

Mapping badges on the collapsed row show at-a-glance status without expanding (e.g., `Features > Title` and `Features > Rich Text`).

For sections that are standalone (Page Header pattern — just content, no title/content split): Single row with one Map button. No expand needed.

### 7. Auto-Numbering for Numbered Lists

When format = `numberedListItem`, maintain a running counter:
- Increment for each consecutive `numberedListItem`
- Reset to 0 when any other format is encountered
- Output: `1. text`, `2. text`, `3. text`, etc.

### 8. User-Defined Role Names

Role names are user-defined, not a fixed list. "Organisation", "Tour Title", "Tour Description" are Tailored Travels concepts. Other sites would have completely different names.

The role name serves as:
- A label in the rules editor (identify which rule is which)
- For `sectionTitle`: the section name when mapped
- For `sectionContent`: a category label describing what kind of content this is

---

## Real-World Examples

### Page Header (standalone sections, each maps to a different property)

```
Rule 1: IF font=11.4, HelveticaNeue-Medium, #FFD200, positionFirst
         THEN action=sectionTitle, role="Organisation"

Rule 2: IF font=28, Clarendon, #FFFFFF
         THEN action=sectionTitle, role="Tour Title"

Rule 3: IF font=14.4, HelveticaNeue-Medium, #FFD200, positionLast
         THEN action=sectionTitle, role="Tour Description"
```

Result: 3 standalone sections. Each has one Map button → maps to a document property.

### Tour Details (title + content sections, each maps to block fields)

```
Rule 1: IF font=12, Clarendon, #16549D
         THEN action=sectionTitle, role="Section Title"

Rule 2: IF font=8.5, HelveticaNeue, #16549D
         THEN action=sectionContent, format=paragraph, role="Section Body"
```

Result: 5 sections (Features, What We Will See, Optional, Accommodation, Extras). Each expands to show title + content separately mappable.

### Itinerary (heading-within-content, all maps to one rich text field)

```
Rule 1: IF font=10, HelveticaNeue-Medium, #16549D
         THEN action=sectionContent, format=heading2, role="Day Heading"

Rule 2: IF font=10, HelveticaNeue, #221F1F
         THEN action=sectionContent, format=paragraph, role="Day Body"

Rule 3: IF font=8, HelveticaNeue-Medium, #16549D
         THEN action=sectionTitle, role="Notes"
```

Result: 1 section for itinerary content (## Day 1 + paragraphs + ## Day 2 + paragraphs...) plus 1 separate "Notes" section for the NB disclaimer. The itinerary section maps as one block to Suggested Itinerary rich text.

---

## Implementation Plan

### Phase 1: Data Model Changes

**C# — `SectionRules.cs`:**
- Add `Format` property to `SectionRule` (optional string, default null)
- Rename action values: `createSection` → `sectionTitle`, `addAsContent` → `sectionContent`, etc.
- Keep backward-compatible reading (old values still work)

**TypeScript — `workflow.types.ts`:**
- Update `RuleAction` type: `'sectionTitle' | 'sectionContent' | 'exclude'`
- Add `ContentFormat` type: `'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'bulletListItem' | 'numberedListItem'`
- Add `format?: ContentFormat` to rule interface

### Phase 2: Transform Pipeline Update

**`ContentTransformService.cs` — action-driven loop:**
- Replace `createSection`/`setAsHeading` with `sectionTitle`
- Replace `addAsContent` with `sectionContent` + format handling
- Replace `addAsList` with `sectionContent` format=`bulletListItem`
- Add `heading1`/`heading2`/`heading3` → `#`/`##`/`###` prefix
- Add `numberedListItem` with auto-numbering counter
- Keep legacy mode for backward compatibility with old action names

### Phase 3: Rules Editor UI

**`section-rules-editor-modal.element.ts`:**
- Rename action dropdown labels to "Section Title" / "Section Content" / "Exclude"
- Add conditional format dropdown (only visible when action = Section Content)
- Format options: Paragraph, Heading 1, Heading 2, Heading 3, Bullet List Item, Numbered List Item

### Phase 4: Collapse Tabs + Unified View

**`up-doc-workflow-source-view.element.ts`:**
- Remove the Elements/Transformed toggle
- Show composed sections view as the default (and only) view
- Add "Area: " prefix to area headers
- Add "Section: " prefix to section rows
- Implement Option C: collapsible sections with expand-to-map
- Move Map buttons into the section rows
- Remove the Transformed tab rendering code

### Phase 5: Backward Compatibility Migration

- Old `source.json` files with `createSection`/`addAsContent`/`addAsList` still work
- Transform pipeline accepts both old and new action names
- No migration tool needed — old values work, new UI writes new values
- Existing `map.json` entries continue to work

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/UpDoc/Models/SectionRules.cs` | Add `Format` property, update comments |
| `src/UpDoc/Services/ContentTransformService.cs` | New action names + format handling in action-driven loop |
| `src/UpDoc/wwwroot/.../workflow.types.ts` | Updated action types + format type |
| `src/UpDoc/wwwroot/.../section-rules-editor-modal.element.ts` | Two-level dropdown UI |
| `src/UpDoc/wwwroot/.../up-doc-workflow-source-view.element.ts` | Collapse tabs, prefixes, Option C expand-to-map |

---

## Migration from Old Action Names

| Old value in JSON | Interpreted as | Notes |
|---|---|---|
| `createSection` | `sectionTitle` | Direct rename |
| `setAsHeading` | `sectionTitle` | Was always the same behaviour |
| `addAsContent` | `sectionContent` format=`paragraph` | Default format |
| `addAsList` | `sectionContent` format=`bulletListItem` | Explicit format |
| `exclude` | `exclude` | No change |

---

## Relationship to Other Planning Docs

| Document | Relationship |
|----------|-------------|
| `SECTION_BUILDER.md` | **Superseded by this doc.** Original action types replaced with two-level model. |
| `THREE_LAYER_PIPELINE.md` | Pipeline unchanged conceptually (Extract → Shape → Map). UI collapses to fewer tabs but the layers still exist in the data flow. |
| `DESTINATION_DRIVEN_MAPPING.md` | Mapping direction unchanged. Section Title and Section Content become the two mappable parts (replacing heading/content). |
| `EXTRACTED_TAB_UX_REVIEW.md` | Many issues resolved by this redesign (consistent labelling, action labels, element counts). |

---

## Screenshots

Outlook Rules UI screenshots from the planning session should be saved to `planning/images/` for reference:
- `outlook-rules-conditions.png` — condition dropdown with grouped categories
- `outlook-rules-actions.png` — action dropdown with grouped options
- `outlook-rules-conditional-dropdown.png` — conditional second dropdown (Categorise → pick category)

---

## Open Questions

1. **Default rule (no conditions):** Should a rule with no conditions and action=`sectionContent` be allowed as a catch-all? (SECTION_BUILDER.md said yes for content actions, no for sectionTitle.)

2. **Sub-heading nesting:** If both H2 and H3 format rules exist in the same area, should H3 elements nest under H2 sections? For now: no nesting, all content is flat within the section.

3. **Role name visibility:** For `sectionTitle`, the role appears as the section name in the UI. For `sectionContent`, the role is a label in the rules editor only (not shown in the main view). Is this clear enough?

4. **Standalone sections (Page Header) expand behaviour:** These have no title/content split — just content. Should they still have a Map button, or should clicking the row itself open the destination picker?
