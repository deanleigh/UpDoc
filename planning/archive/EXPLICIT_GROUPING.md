# Plan: Explicit Grouping for Area Rules

## Problem

Area rules currently use an implicit grouping convention: the `action` field prefix "section" indicates elements that belong together (`sectionTitle`, `sectionContent`, `sectionDescription`, `sectionSummary`), while `singleProperty` indicates standalone elements. Section boundaries are triggered by `sectionTitle` — there is no other way to create a boundary.

This causes several problems:

1. **Grouping is invisible.** There is no explicit declaration of "these rules belong together." The system infers grouping from action names and the order of elements in the flattened list.
2. **Boundaries require a title.** If a section has no title element (e.g., itinerary with Day headings as content, not titles), there is no way to split it into multiple sections.
3. **The naming convention is fragile.** Whether an element is standalone or grouped depends on which `action` value you choose. Picking the wrong one (e.g., `sectionContent` when you meant `singleProperty`) silently produces wrong output.
4. **The UI labels are derived, not declared.** Section names in the Transformed view come from heading text or auto-generated preamble IDs, not from explicit user-defined names.

---

## Real-World Examples

### Page Header — Single Properties
Each element is a standalone value: Organisation, Tour Title, Tour Description.
- Current: Three rules, each with `action: "singleProperty"` (or legacy `createSection`)
- Each produces its own section in the transform output
- Each maps to a single destination property

### Tour Details — Grouped Sections
Four sections (Features, What We Will See, Accommodation, Extras To Your Tour), each with a title heading and body content.
- Current: Two rules — `sectionTitle` (matches heading font) and `sectionContent` (matches body font)
- `sectionTitle` creates boundaries: each heading starts a new section
- The heading text becomes the section name in the Transformed view
- Each section maps to a block grid item (title → featureTitle, content → featureContent)

### Itinerary — Single Section, Multiple Content Types
One section containing all Day 1-5 as formatted content. Day numbers are heading3-formatted content, not titles.
- Current: Two rules — both `sectionContent` (Day Number with heading3, Day Description with auto)
- No `sectionTitle` → no boundaries → everything accumulates into one section
- The section has no heading (becomes a "preamble" section)
- The entire section maps to one rich text destination field

---

## Proposed Solution: `group` + `part`

Replace the implicit `action` prefix convention with an explicit `group` field and a `part` field.

### Rule Schema (v3)

```json
{
  "role": "string",           // Human label for this rule (display only)
  "group": "string | null",   // Group name. null = single property.
  "part": "string",           // Which slot: "title", "content", "description", "summary"
  "format": "string | null",  // Markdown format: "auto", "paragraph", "heading3", etc.
  "conditions": [...],
  "exclude": false            // Optional: skip this element entirely
}
```

### How It Works

**No `group`** → single property. The `role` name is the section heading. The element text is the content. One rule = one section.

**With `group`** → grouped section. All rules sharing the same `group` value contribute to the same section(s). The `part` field determines which slot the element fills:
- `title` — becomes the section heading AND triggers a section boundary (flush + new section)
- `content` — accumulates into the section's content body
- `description` — accumulates into the section's description
- `summary` — accumulates into the section's summary

**Section boundaries** are triggered when:
- A `title` part element is encountered → flush current section, start new one
- The group name becomes the section label when there is no title

### Migration from Current Actions

| Current Action | New Equivalent |
|---------------|----------------|
| `singleProperty` | No `group`, `part: "content"` |
| `sectionTitle` | `group: "X"`, `part: "title"` |
| `sectionContent` | `group: "X"`, `part: "content"` |
| `sectionDescription` | `group: "X"`, `part: "description"` |
| `sectionSummary` | `group: "X"`, `part: "summary"` |
| `exclude` | `exclude: true` |

### Examples Rewritten

**Page Header — Single Properties:**
```json
{
  "rules": [
    { "role": "Organisation",    "part": "content", "conditions": [...] },
    { "role": "Tour Title",      "part": "content", "conditions": [...] },
    { "role": "Tour Description", "part": "content", "conditions": [...] }
  ]
}
```
No `group` on any rule → each is a standalone single property.

**Tour Details — Grouped Sections:**
```json
{
  "rules": [
    { "role": "Title",   "group": "Tour Detail", "part": "title",   "conditions": [...] },
    { "role": "Content", "group": "Tour Detail", "part": "content", "format": "auto", "conditions": [...] }
  ]
}
```
Both rules share `group: "Tour Detail"`. The `title` part creates boundaries. Result: Features, What We Will See, Accommodation, Extras — each as a separate section with title + content.

**Itinerary — Single Section Content:**
```json
{
  "rules": [
    { "role": "Day Number",      "group": "Itinerary", "part": "content", "format": "heading3", "conditions": [...] },
    { "role": "Day Description", "group": "Itinerary", "part": "content", "format": "auto",     "conditions": [...] }
  ]
}
```
Both rules share `group: "Itinerary"`, both are `part: "content"`. No `title` part → no boundaries → one section. The group name "Itinerary" becomes the section label.

---

## What This Solves

1. **Explicit grouping.** Rules declare their group membership. No inference needed.
2. **Named groups.** The `group` value is the section label for the UI. No derivation from heading text.
3. **Boundaries without titles.** A future `boundary: true` flag on any rule could trigger section splits even without a `title` part — solving the "itinerary split into days" case if ever needed.
4. **Clear single vs grouped distinction.** `group` present = grouped. `group` absent = single property. No action-name conventions to learn.

---

## UI Impact

### Rules Editor
- Add a "Group" field (text input or dropdown of existing group names from other rules)
- Replace the "Action" dropdown with a "Part" dropdown: title, content, description, summary
- Single properties: leave Group blank
- Grouped rules: set Group to a shared name

### Transformed View
- Grouped sections use the `group` name as the `uui-box` headline (not the title element text)
- Single properties use the `role` name as the `uui-box` headline (unchanged)
- Title element text appears as the first row content within the box, not duplicated in the headline

### Map Tab / Destination Picker
- Source keys use `group` name for grouped sections: `tour-detail.title`, `tour-detail.content`
- Source keys use `role` name for single properties: `organisation.content`

---

## Future-Proofing

### Drag-and-Drop Mapping
Groups are natural drag sources and drop targets. Drag "Tour Detail" onto a block grid item → maps title, content, description, summary to the block's properties. Drag "Organisation" onto a property → maps the single value.

### AI Rule Generation
Explicit groups are easy to express in a prompt:
> "Create a group called 'Tour Detail' with a title part matching 12pt Clarendon blue headings and a content part matching 8.5pt HelveticaNeue blue body text."

vs the current implicit approach:
> "Create a sectionTitle rule matching... and a sectionContent rule matching... (they will be grouped because sectionTitle creates boundaries)"

### Combined Drag-and-Drop + AI
User drags elements from the Extracted view into a group bucket. The system generates conditions from the element metadata. The group structure is already defined — AI just fills in the conditions.

---

## Implementation Phases

### Phase 1: Data Model
- Add `group` and `part` fields to `SectionRule` C# model
- Add to TypeScript `SectionRule` type
- `GetNormalizedAction()` maps legacy `action` values to `group`/`part` equivalents
- `TransformAreaWithRules` reads `group`/`part` instead of action names
- Backwards compatible: rules without `group` treated as single properties

### Phase 2: Rules Editor UI
- Add Group field to the rules editor modal
- Replace Action dropdown with Part dropdown
- Auto-suggest group names from existing rules in the same area

### Phase 3: Transformed View
- Use `group` name as section headline for grouped sections
- Fixes the title duplication issue (headline shows group name, content shows actual title text)

### Phase 4: Mapping Keys
- Update source key generation to use `group` name
- Update destination picker to show group-based source options

---

## Status: AGREED IN PRINCIPLE — Labels Need Further Exploration

The `group` + `part` model is agreed. Before implementation, we need to explore the **label system** further:

### Two Levels of Labels

1. **Group label** — the name of the group itself (e.g., "Tour Detail", "Itinerary"). Appears as the `uui-box` headline in the Transformed view. This is a type label — it identifies WHAT KIND of content this is, not the content itself.

2. **Item labels** — the names of individual instances within a group. For Tour Details, the items are "Features", "What We Will See", "Accommodation", "Extras To Your Tour". These come from the extracted title text. For single properties, the item label is the role name ("Organisation", "Tour Title").

**Key question:** How do group labels and item labels coexist in the UI? When a group has a `title` part that creates multiple sections (Tour Details → 4 sections), each section needs BOTH:
- The group label (to identify the type: "Tour Detail")
- The item label (to identify the instance: "Features")

**Next session:** Continue exploring labels — how they render in Transformed view, how they appear in the Map tab, how they're used in mapping keys, and how they work for single properties vs grouped sections.

---

## Open Questions

1. **Group scope:** Is a group scoped to an area, or can rules in different areas share a group? (Recommendation: scoped to area — simplest, most intuitive)
2. **Multiple groups in one area:** Can an area have multiple groups? (Yes — Tour Details could theoretically have "Feature" and "Itinerary" groups in the same area)
3. **Group ordering:** Does the order of groups in the output matter? (Follows element order in the PDF — first group encountered appears first)
4. **Naming collisions:** What if a single property and a group share the same name? (Prevent in UI — group names and role names must be unique within an area)
5. **Label hierarchy:** How do group labels and item labels combine in the UI? Does the box headline show "Tour Detail: Features" or just "Tour Detail" with "Features" as content?
6. **Single property labels:** Do single properties need a different label treatment than grouped items?
