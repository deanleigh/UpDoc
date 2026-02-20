# Transformed View

## Status: AGREED — Ready for Implementation

---

## Summary

The Transformed view shows the shaped output of the extraction pipeline — curated sections assembled from PDF elements by the rules engine. It is the primary workspace for mapping source content to destination fields.

This document covers the three-layer pipeline, how rules produce sections, the visual layout, mapping keys, and display concerns.

---

## Three-Layer Pipeline: Extract → Shape → Map

```
Extract (raw dough)  →  Shape (proof)  →  Map (bake)
```

### Layer 1: Extract (Elements Tab)

**What:** Server-side extraction produces raw elements with full metadata (font size, position, color, page). Area detection groups elements into spatial areas.

**UI:** Source tab → **Elements** inner tab. Read-only view of raw extraction. Used for debugging and understanding extraction output.

**What the author does here:** Include/exclude areas. Open the rules editor to define how elements become sections. No mapping happens here.

### Layer 2: Shape (Transformed Tab)

**What:** Rules engine processes extracted elements, applies conditions, and assembles them into structured sections with stable IDs. Each section has typed parts (title, content, description, summary).

**UI:** Source tab → **Transformed** inner tab. Shows rendered sections as `uui-box` cards with Map buttons.

**What the author does here:** Maps sections to destination fields (source-driven direction). Reviews how rules shaped the content. Adjusts rules if the output is wrong.

### Layer 3: Map (Destination Tab + Map Tab)

**What:** The wiring between shaped sections and destination fields/blocks.

**UI — three entry points:**
1. **Transformed tab** (source-driven): Click Map button on a section → pick destination field
2. **Destination tab** (destination-driven): Click a field → picker shows available sections
3. **Map tab**: Summary of all wires. View, edit, delete, reorder.

All three read/write the same `map.json`.

---

## How Rules Produce Sections

### Ungrouped Rules (Single Properties)

Each ungrouped rule produces one standalone section. The role name becomes the section ID. The matched element text becomes the content.

```
Rule: role="Organisation", part=content
Element: "The Arts Society Kingston presents"
→ Section: id="organisation", content="The Arts Society Kingston presents"
```

### Grouped Rules (Multi-Part Sections)

Rules inside a group work together. The `title` part triggers section boundaries:

```
Group "Tour Detail":
  Rule: part=title, conditions=[font=12, Clarendon]
  Rule: part=content, conditions=[font=8.5, HelveticaNeue]

Elements processed in order:
  "FEATURES" (matches title) → new instance, title="Features"
  "4* central Liverpool hotel" (matches content) → append to current instance
  "Three dinners included" (matches content) → append to current instance
  "WHAT WE WILL SEE" (matches title) → flush previous, new instance, title="What We Will See"
  ...
```

Result: 4 instances of the "Tour Detail" group, each with title + content.

### Groups Without Title Part (Single Instance)

When a group has no `title` part rule, all content accumulates into one instance. The group name becomes the section label.

```
Group "Itinerary":
  Rule: part=content, format=heading3, conditions=[font=10, Medium]
  Rule: part=content, format=auto, conditions=[font=10, Regular]

→ One section with all Day 1-5 as formatted content
```

### Format Application

The `format` field on each rule controls how matched text becomes Markdown:
- `auto` — system decides (pattern detection: bullet list, paragraph, etc.)
- `heading3` → `### text`
- `bulletListItem` → `- text`
- `paragraph` → plain text

The `auto` format is the default and handles most cases. It examines content patterns (>50% bullet children = bullet list, children with larger font = sub-headed, etc.).

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

- **Box headline** = group name ("Tour Detail") — the label, not content
- **Sub-sections** = item labels from extracted title text ("Features", etc.) — these are content
- **Map buttons** = one per part type (title, content), maps at group level
- Title duplication solved: headline is group name, item labels appear inside as content

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

### Content Rendering

Content within boxes is rendered as HTML from Markdown (Obsidian reading-mode style):
- Headings are visually large (H1 > H2 > H3)
- Bold and italic render inline
- Bullet and numbered lists are properly indented
- Blockquotes have a left border
- Content flows like a real document, not a data table

Map buttons appear on box hover (hidden by default), following the Umbraco block grid editor pattern. Mapped sections show a green left border + green `uui-tag` badges with inline unmap.

---

## Mapping Keys

### Group-Level Mapping

Mapping happens at the **group level**, not the instance level.

When you map Tour Details, you create ONE mapping:
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

## Configurable Extraction Defaults

The extraction pipeline has generic PDF parameters that are currently hardcoded. These will move to `source.json` globals:

```json
{
  "globals": {
    "pdf": {
      "yTolerance": 5.0,
      "fontSizeTolerance": 0.5,
      "xAlignmentTolerance": 10.0,
      "columnGapFallback": 40.0,
      "columnMinGap": 8.0,
      "marginExclusionPercent": 0.05,
      "maxColumnBoundaries": 3
    },
    "transform": {
      "bulletListThreshold": 0.5,
      "minSubHeadings": 2,
      "titleCaseAllCaps": true
    }
  }
}
```

All values have sensible defaults matching current hardcoded values. Most workflows will never touch these. This is independent work — not blocked by the rules editor redesign.

---

## UX Polish Items

Identified during testing (Feb 2026). Not blocking — address in a future polish pass.

1. **Two counts confusion**: "4 rules" badge vs "4 sections" text can look like the same thing. Differentiate or remove one.
2. **Consistent action button**: Always "Edit Rules" — not "Define Structure" for unconfigured areas and "Edit Rules" for configured.
3. **Element counts**: Remove from area/section header row. Too much extraction detail at the wrong level.
4. **Section header style**: Consistent formatting whether area has rules or not.

---

## Implementation Phases

### Phase 1: Layout Update
- Grouped sections render as one `uui-box` per group (not per instance)
- Group name as box headline
- Item labels as sub-section headings inside the box
- Single properties render as one box per role (unchanged)

### Phase 2: Map Buttons
- Map buttons per part type on groups (Map title, Map content)
- Map buttons per role on single properties (Map content)
- Mapping creates group-level keys: `{group-name}.{part}`

### Phase 3: Bridge Update
- Update bridge code to resolve group-level sources from transform output
- Each group instance creates a new block grid item
- Concatenation for single-instance groups (Itinerary)

### Phase 4: Map Tab Update
- Show group-level mappings (6 rows, not 17+)
- Delete/edit at group level

---

## Dead Code Cleanup (Background Task)

Legacy extraction methods confirmed dead (zero frontend callers):
- `ExtractAsMarkdown()`, `ExtractMarkdownFromDocument()`, `ExtractSectionFromDocument()`
- `ExtractTitleAndDescription()`, `DetectMainColumnStart()`
- `ExtractSections(string, PdfExtractionRules)` (marked `[Obsolete]`)
- `PdfExtractionRules` model

Active pipeline: `DetectAreas()` → `GroupIntoSections()` → `ContentTransformService.Transform()`.

Dead code scheduled for deletion after rules editor redesign is stable.

---

## Supersedes

This document consolidates and replaces:
- `THREE_LAYER_PIPELINE.md` — Extract → Shape → Map pipeline
- `CONFIGURABLE_EXTRACTION_PIPELINE.md` — teach-by-example approach, globals
- `PDF_FORMATTING_RULES_EXPLORATION.md` — formatting rules architecture
- `EXTRACTED_TAB_UX_REVIEW.md` — UX polish items

All moved to `planning/archive/`.

---

## Related Documents

- **`RULES_EDITOR.md`** — Rules authoring UI and data model (the input to this pipeline)
- **`DESTINATION_DRIVEN_MAPPING.md`** — Destination-driven mapping direction and Map tab design
- **`AREA_EDITOR.md`** — PDF area editor for defining spatial zones
- **`CORE_CONCEPT.md`** — Foundational principle: Any Source → Markdown → Pick Pieces → Map to CMS Fields
