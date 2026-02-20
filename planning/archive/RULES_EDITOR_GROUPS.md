# Plan: Rules Editor with Visual Groups

## Status: AGREED — Ready for Implementation

---

## Summary

Redesign the rules editor to support explicit grouping using visual containers with drag-and-drop — the same pattern Umbraco uses for property groups in the Document Type designer. Rules outside a group are single properties. Rules inside a named group are grouped parts. The group is the mapping unit.

This replaces the implicit `action` prefix convention (`sectionTitle`, `sectionContent`, etc.) with structural grouping that is visible, robust, and familiar to Umbraco users.

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

The dropdown+value pair pattern in the UI is a structured way to author these sentences. The same data can be generated from drag-and-drop, from an AI prompt, or from manual rule authoring.

---

## Rules Editor Layout

### Overview (Collapsed View)

Rules are displayed in a flat list within their area, organized into ungrouped rules (single properties) and named groups:

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

For a mixed area like Page Header:

```
── Page Header area ── 10 elements, 3 rules, 3 matched ──

  Ungrouped (Single Properties)
  ┌─────────────────────────────────────────────────┐
  │ ⠿ 1  Organisation        ✓ matched 1×          │
  │ ⠿ 2  Tour Title          ✓ matched 1×          │
  │ ⠿ 3  Tour Description    ✓ matched 1×          │
  │                         + Add rule              │
  └─────────────────────────────────────────────────┘

                            + Add group
```

For an area with only grouped rules (Itinerary):

```
── Itinerary area ── 10 elements, 2 rules, 10 matched ──

  Itinerary                                  [rename] 🗑
  ┌─────────────────────────────────────────────────┐
  │ ⠿ 1  Day Number          ✓ matched 5×          │
  │ ⠿ 2  Day Description     ✓ matched 5×          │
  │                         + Add rule              │
  └─────────────────────────────────────────────────┘

                            + Add group
```

### Detail View (Expanded Rule)

Clicking a rule row expands it to show full details, following the Outlook pattern:

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

### Key UI Changes from Current

| Current | New |
|---------|-----|
| ACTION dropdown (Single Property, Section Title, Section Content, etc.) | **PART** dropdown (Title, Content, Description, Summary) |
| No explicit grouping — implicit via "section" prefix | **Visual group containers** with drag-and-drop |
| All rules in a flat list | Rules organized into **ungrouped** (single properties) and **named groups** |
| Role name at top serves as both label and rule identifier | Role name is the **rule description** (display only) |
| Group membership inferred from action names | Group membership determined by **which container the rule is in** |

---

## Part Dropdown

Replaces the current ACTION dropdown. Options:

| Part | Meaning | When used |
|------|---------|-----------|
| **Title** | Section heading, triggers boundaries in grouped sections | Grouped: heading text that creates new instances (e.g., "FEATURES", "ACCOMMODATION") |
| **Content** | Main body content | Both: body text, bullet lists, paragraphs |
| **Description** | Secondary descriptive text | Grouped: supplementary text within a section |
| **Summary** | Summary or abstract text | Grouped: brief overview text |
| **Exclude** | Skip this element entirely | Both: explicitly ignore matched elements |

For **ungrouped rules** (single properties): Part is always "Content" — the rule identifies a single value. The Part dropdown could be hidden or defaulted for ungrouped rules.

For **grouped rules**: Part determines which slot the matched element fills within the group. "Title" triggers section boundaries (flush current instance, start new one).

---

## Drag-and-Drop Behavior

### Creating a Group
1. Click "+ Add group" at the bottom of the area
2. A new empty group container appears with an editable name field
3. Type the group name (e.g., "Tour Detail")
4. Drag existing rules from the ungrouped section into the new group
5. Or click "+ Add rule" inside the group to create a new rule directly in it

### Moving Rules
- **Ungrouped → Group**: drag rule card into a group container → rule gains `group` property in JSON
- **Group → Ungrouped**: drag rule card out of group back to ungrouped section → rule loses `group` property
- **Group → Group**: drag rule between groups → rule's `group` property changes
- **Reorder within group**: drag to change rule evaluation order

### Deleting a Group
- Delete button on group header
- Rules inside the group are moved back to ungrouped (not deleted)
- Confirmation dialog: "Move 2 rules to ungrouped and delete 'Tour Detail' group?"

### Implementation Reference
Umbraco uses `UmbSorterController` for drag-and-drop in the Document Type designer. Check the Umbraco CMS source at:
- `Umbraco-CMS/src/Umbraco.Web.UI.Client/src/packages/core/sorter/`
- The `umbraco-sorter` skill documents the API

---

## JSON Schema

### Rule Schema (v3)

```json
{
  "role": "string",           // Human label for this rule (display only)
  "group": "string | null",   // Group name. null/absent = single property.
  "part": "string",           // Which slot: "title", "content", "description", "summary"
  "format": "string | null",  // Markdown format: "auto", "paragraph", "heading3", etc.
  "conditions": [...],
  "exceptions": [...],        // Optional: elements to exclude even if conditions match
  "exclude": false            // Optional: skip this element entirely
}
```

### Area Rules Schema (v3)

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

**Key structural change**: Area rules now have two top-level arrays:
- `groups[]` — named group containers, each with their own `rules[]`
- `rules[]` — ungrouped rules (single properties)

This mirrors the visual layout: groups are containers, ungrouped rules are standalone.

### Migration from Current Schema

| Current | New |
|---------|-----|
| `"action": "singleProperty"` or `"action": "createSection"` | No `group`, `"part": "content"` in top-level `rules[]` |
| `"action": "sectionTitle"` | `"part": "title"` inside a group |
| `"action": "sectionContent"` | `"part": "content"` inside a group |
| `"action": "sectionDescription"` | `"part": "description"` inside a group |
| `"action": "sectionSummary"` | `"part": "summary"` inside a group |
| `"action": "exclude"` | `"exclude": true` (either grouped or ungrouped) |

Backwards compatibility: if `source.json` has the old flat `rules[]` array with `action` fields, normalize on load using the migration table above. Rules with `sectionX` actions that share the same implicit group go into a group container.

---

## Mapping Keys

### Group-Level Mapping

Mapping happens at the **group level**, not the instance level.

When you map Tour Details, you create ONE mapping for the group:
- `tour-detail.title` → `featureTitle` (block property)
- `tour-detail.content` → `featureContent` (block property)

This mapping applies to **every instance** (Features, What We Will See, Accommodation, Extras). Each instance creates a new block grid item at import time.

### Single Property Mapping

For ungrouped rules, mapping uses the role name:
- `organisation.content` → `pageOrganiser`
- `tour-title.content` → `pageTitle`

### Map Tab Display

| Source | Part | Destination |
|--------|------|-------------|
| Tour Detail | title | Feature Title (block) |
| Tour Detail | content | Feature Content (block) |
| Itinerary | content | Itinerary Body (block) |
| Organisation | content | Page Organiser |
| Tour Title | content | Page Title |
| Tour Description | content | Page Description |

Clean, 6 rows. No instance-level noise.

### Item Labels (Display Only)

Item labels ("Features", "What We Will See") come from extracted title text at runtime. They appear in:
- **Transformed view**: inside the group box, as sub-section headings
- **Create from Source preview**: showing what was extracted per instance
- **NOT in mapping keys**: mapping is group-level, not instance-level

---

## Transformed View Layout

### Grouped Sections — One Box Per Group

```
┌─ Tour Detail ───────────────────────────────┐
│                                             │
│  ▸ Features                                 │
│    - 4* central Liverpool hotel             │
│    - Three dinners included                 │
│    ...                                      │
│                                             │
│  ▸ What We Will See                         │
│    - Little Moreton Hall                    │
│    - Liverpool – guided tour                │
│    ...                                      │
│                                             │
│  ▸ Accommodation                            │
│    We stay four nights at the centrally...  │
│                                             │
│  ▸ Extras To Your Tour                      │
│    - Insurance (including Covid cover) £38  │
│    ...                                      │
│                                             │
│              [Map title] [Map content]      │
└─────────────────────────────────────────────┘
```

- **Box headline** = group name ("Tour Detail") — this is the label, not content
- **Sub-sections** = item labels from extracted title text ("Features", etc.) — these are content
- **Map buttons** = one per part type (title, content), maps at group level
- Title duplication is solved: headline is the group name, item labels appear inside as content

### Single Properties — One Box Per Role

```
┌─ Organisation ──────────────────────────────┐
│  The Arts Society Kingston presents         │
│                              [Map content]  │
└─────────────────────────────────────────────┘
```

- **Box headline** = role name ("Organisation")
- **Content** = extracted text
- **Map button** = maps this single value

### Itinerary — Grouped, Single Instance

```
┌─ Itinerary ─────────────────────────────────┐
│  ### Day 1                                  │
│  We depart in our private executive...      │
│  ### Day 2                                  │
│  With our Blue Badge guide we tour...       │
│  ...                                        │
│                              [Map content]  │
└─────────────────────────────────────────────┘
```

- **Box headline** = group name ("Itinerary")
- **Content** = all days as one formatted content block
- No title part → no sub-sections → one instance
- Maps to one rich text destination field

---

## Implementation Phases

### Phase 1: Data Model
- Add `group` and `part` fields to C# `SectionRule` model
- Add `groups` array to area rules schema
- TypeScript types updated to match
- `ContentTransformService` reads `group`/`part` instead of action names
- Migration: `GetNormalizedAction()` converts old `action` values
- Backwards compatible: old format auto-migrates on load

### Phase 2: Rules Editor UI — Groups
- Replace ACTION section with PART dropdown
- Add group containers to rules editor (named, collapsible)
- "+ Add group" button creates a new named container
- Rules render inside their group container or in ungrouped section
- Drag-and-drop rules between groups (using UmbSorterController pattern)
- Group name editable (rename)
- Delete group → moves rules to ungrouped

### Phase 3: Transformed View
- Grouped sections render as one `uui-box` per group
- Group name as box headline
- Item labels (from title text) as sub-section headings inside the box
- Single properties render as one box per role (unchanged)
- Map buttons per part type on groups, per role on single properties

### Phase 4: Mapping Keys
- Update source key generation: `{group-name}.{part}` for grouped, `{role-name}.content` for ungrouped
- Update Map tab to show group-level mappings
- Update destination picker to show group-based source options

---

## Open Questions (Resolved)

| # | Question | Resolution |
|---|----------|------------|
| 1 | Group scope | Scoped to area — groups don't cross area boundaries |
| 2 | Multiple groups per area | Yes — an area can have multiple groups and ungrouped rules |
| 3 | Group ordering | Follows element order in the source document |
| 4 | Naming collisions | Prevented in UI — group names and role names must be unique within an area |
| 5 | Label hierarchy | Group name = box headline. Item labels = content inside box. No compound labels. |
| 6 | Single property labels | Role name = box headline. Same visual treatment as groups but without sub-sections. |
| 7 | Grouping mechanism | Visual containers with drag-and-drop, not shared strings. Umbraco Document Type pattern. |
| 8 | Fragility of shared strings | Eliminated — grouping is structural (rule lives inside container), not by convention. |

---

## Relationship to Other Planning Documents

- **`EXPLICIT_GROUPING.md`** — Original `group` + `part` data model proposal. This document supersedes the UI design sections but the data model decisions still apply.
- **`DESTINATION_DRIVEN_MAPPING.md`** — Mapping keys and Map tab design. Updated by Phase 4 of this plan.
- **`THREE_LAYER_PIPELINE.md`** — Extract → Shape → Map pipeline. The "Shape" layer (Transformed view) is updated by Phase 3.
- **`REFACTOR_TO_CONFIGURABLE.md`** — Overall architecture. Rules editor is a core part of the config-driven extraction system.
