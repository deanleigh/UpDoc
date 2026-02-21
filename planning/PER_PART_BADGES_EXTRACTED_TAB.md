# Plan: Per-Part Badges and Map Buttons on Extracted Tab

## Status: PLANNING — Do not implement until approved

---

## Problem Statement

On the Extracted tab, composed section rows (sections from areas with rules) dump ALL mapping badges on a single header row. Example:

- **"## Features"** row shows both `Features > Rich Text` AND `Features > Title` badges
- **"## Accommodation"** row shows both `Accommodation > Rich Text` AND `Accommodation > Title` badges

But the title ("Features") and the content (bullet list) are **different parts** that map to **different destinations**. The badges should appear next to their respective content, not all piled on the header.

### What works well (DO NOT BREAK)

- **Single items** (Organiser Telephone, Email, Address) — one badge per row, perfectly placed
- **Area headers** (Tour Details) — "2 rules" badge, "5 sections" count, "Edit Rules" button
- **Expand/collapse** — chevrons on composed sections work well
- **Level icons** — grid/section icons distinguish area vs section levels
- **The overall Extracted tab layout** — clean, scannable, well-tested

### What the Transformed tab does right

The Transformed tab separates parts into distinct rows:
- "Tour Details - Section Title" → badge: `Features > Title`
- "Tour Details - Section Content" → badge: `Features > Rich Text`

Each part gets its own row, its own badge, and its own Map button target.

### What the Transformed tab does wrong

Three levels of nesting (area > section > part) creates excessive depth:
1. "Tour Details" (area — collapsible)
2. "Tour Details - Section" (section — uui-box container)
3. "Tour Details - Section Title" / "Tour Details - Section Content" (parts — inside the box)

The "Tour Details - Section" wrapper is visually heavy and the labels are verbose/repetitive.

---

## Reference: Umbraco Block Grid Editor Patterns

Studied the block grid editor's UI at multiple interaction levels (Feb 2026 screenshots):

### Preview Mode (default)
- **Layout container**: Header bar with grid icon + "Layout - 12" label. Settings/copy/delete icons appear on hover (right side)
- **Feature blocks**: Content rendered as rich preview inside the layout container
- **Hover on feature block**: Blue dashed border appears around the specific block, with its own action bar (pencil/edit + settings + copy + delete)

### Sort Mode (collapsed)
- **Layout container**: "Layout - 12" label, no preview
- **Feature blocks**: Simple icon + label rows inside bordered cards ("Feature - Page - Title and Description", "Feature - Rich Text Editor - Itinery", etc.)
- **No content visible** — just the block type name
- **Hover**: Block label becomes a clickable link (blue underline)
- **Two levels only**: Layout container > Feature blocks (flat list within container)

### Tree Node Actions
- Same pattern: item label on left, action icons (`...` + `+`) on right, shown on hover

### Key Insight: Two-Level Pattern
The block grid consistently uses **two levels**: container and items. Not three. The layout block is the container; feature blocks are the items. Each item has its own action bar. This keeps the hierarchy scannable.

---

## Current Code: Composed Section Row

The `#renderComposedSectionRow` method (in `up-doc-workflow-source-view.element.ts`) currently:

1. **Header row**: chevron + level icon + heading text + ALL badges for ALL parts
2. **Expanded content**: plain text content below the header

The badges come from `#renderPartBadges(sourceKey)` which collects all mappings for all part suffixes (`.title`, `.content`, `.description`, `.summary`) and renders them all together.

---

## Design Approaches

### Approach A: Sub-Rows Within Expanded Content (Transformed-style)

When a composed section is expanded, show each part as a distinct sub-row:

```
v ## Features                                    [5 sections] [Edit Rules]
  |  Title: Features                             [Features > Title x]  [Map]
  |  Content:                                    [Features > Rich Text x]  [Map]
  |    - 4* hotels throughout
  |    - 2 dinners included
  |    - ...
```

**Pros**: Each part clearly separated, badges next to their content, Map button per part
**Cons**: Adds visual depth, may feel heavy for sections with only one part

### Approach B: Block Grid Sort Mode Pattern (Flat Cards)

Treat the area as the layout container and each part as a "feature block" card:

```
v Tour Details                                   [2 rules] [5 sections] [Edit Rules]
  ┌─────────────────────────────────────────────────────────────────────┐
  │ Features - Title                              [Features > Title x]  │
  │ Features                                                            │
  ├─────────────────────────────────────────────────────────────────────┤
  │ Features - Content                         [Features > Rich Text x] │
  │ - 4* hotels throughout                                              │
  │ - 2 dinners included                                                │
  │ - ...                                                               │
  └─────────────────────────────────────────────────────────────────────┘
```

**Pros**: Two levels only (area > parts), each part is a standalone card, matches block grid mental model
**Cons**: Loses the section grouping (title + content aren't visually grouped as one "Features" section), may be too flat

### Approach C: Hybrid — Collapsed Header + Expand to See Parts

Keep the current collapsed row as-is (no badges on header), but when expanded show parts:

```
Collapsed:
  v ## Features                                  [2 parts mapped]

Expanded:
  v ## Features                                  [2 parts mapped]
    Title: Features                              [Features > Title x]  [Map]
    Content:                                     [Features > Rich Text x]  [Map]
      - 4* hotels throughout
      - 2 dinners included
```

**Pros**: Clean collapsed state, badges only visible when expanded, minimal visual change to current layout
**Cons**: Badges hidden when collapsed (user can't scan mapped status without expanding)

### Approach D: Keep Badges on Header + Add Map Buttons in Expanded

Current header badges stay (showing what's mapped at a glance), but expanded content adds per-part rows with their own Map buttons:

```
Collapsed:
  v ## Features                    [Features > Rich Text x] [Features > Title x]

Expanded:
  v ## Features                    [Features > Rich Text x] [Features > Title x]
    Title: Features                              [Features > Title x]  [Map]
    Content:                                     [Features > Rich Text x]  [Map]
      - 4* hotels throughout
      - 2 dinners included
```

**Pros**: Scanning works collapsed (see what's mapped), editing works expanded (Map button per part)
**Cons**: Badges appear twice (header and expanded), potentially confusing

---

## Comparison with Block Grid

| Aspect | Block Grid | Our Extracted Tab |
|--------|-----------|-------------------|
| Levels | 2 (layout > feature) | 2 (area > section) currently, want per-part |
| Collapsed | Label only | Heading text + badges |
| Expanded/Preview | Full content | Content text |
| Actions | Hover → action bar (right) | Badges + Map button |
| Nesting indicator | Visual containment (bordered cards) | Left border + indentation |

---

## Questions to Decide

1. **Should badges be visible when collapsed, or only when expanded?** (Scanning vs. clean layout)
2. **Should the section level (grouping title + content) exist, or should parts be flat within the area?** (Grouped vs. flat)
3. ~~Should we aim for consistency between Extracted and Transformed tabs?~~ **DECIDED: No.** The Transformed tab is preview-only — no badges, no Map buttons, no interaction. It just shows a markdown preview of what the transform rules produce. All mapping interaction (badges, Map buttons) lives exclusively on the Extracted tab.
4. **For ungrouped sections (single part), does anything change?** (Organiser Address is already perfect)
5. ~~Do we want the Extracted and Transformed tabs to eventually merge?~~ **DECIDED: No.** Transformed is a read-only markdown preview, Extracted is the interactive mapping workspace. Different purposes, no merge needed.

---

## What NOT to Change

- Single-item sections (Organiser Telephone, Email, Address) — working perfectly
- Area headers (Tour Details) — working well
- The expand/collapse chevron behavior
- Level icons (grid vs section)
- The overall Extracted tab structure and CSS

---

## Next Steps

1. User to review approaches A-D and discuss preferences
2. Decide on badge visibility (collapsed vs expanded only)
3. Decide on nesting depth (2 levels vs 3 levels)
4. Build a minimal prototype of chosen approach for ONE composed section
5. Verify it doesn't break single items or area headers
6. If prototype works, extend to all composed sections
