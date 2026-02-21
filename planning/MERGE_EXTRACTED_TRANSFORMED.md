# Plan: Merge Extracted and Transformed Views

## Status: PLANNING — Incremental approach agreed

---

## Context

The Extracted and Transformed tabs on the Source workspace view have converged. The Transformed tab wraps the same content in UUI boxes with mapping badges, but adds little beyond what the Extracted tab already shows. Both tabs now display mapping badges. The decision is to combine rules authoring and mapping onto the Extracted tab, keeping the Transformed tab untouched as a read-only proof view until the work is complete.

---

## UI Structure Observations

### Nesting Hierarchy (both tabs)

1. **Page** — collapsible UUI box showing page number. Relates to Choose Pages. Collapsible individually or via Collapse button.
2. **Area** — nested within Page. Named (Page Header, Organiser Information, Tour Details). Relates to Edit Areas. Collapsible via chevron or Collapse button.
3. **Section** — where the two tabs currently diverge (see below).

### UUI Box Nesting

UUI boxes can be nested. Observed in the Transformed tab where sections are nested within area containers within page containers. This pattern can be reused on the Extracted tab.

### Current Divergence at Section Level

- **Extracted tab**: section label + content on one line (compact, good for quick scanning). Mapping badge at end of row. Badge comes from rules.
- **Transformed tab**: section label as a nested UUI box, content rendered underneath with formatting (headings, bullet lists, links). Mapping badge next to the content — correctly placed on the content, not the label.

---

## Decision: Combine onto Extracted Tab

**Rules authoring** and **mapping** will both live on the Extracted tab. This works because:

- Rules editing already happens in a slide-out modal (Edit Rules button)
- Mapping already happens in a slide-out modal (destination picker)
- The Extracted tab just shows results (badges, formatted content) and entry points (buttons)
- Rules operate at area level, mapping operates at content level — they don't compete

### Length Concern

Moving Transformed-style layout (multi-line rendered content) to the Extracted tab makes the page long.

**Mitigation**: Collapsible sections. The Collapse button already supports Pages and Areas. Adding Sections as a third level follows the same pattern. Sections default to collapsed (compact one-liner), expand to reveal full rendered content for mapping.

---

## Process Rules

1. **One change at a time.** Describe back what will change and which files are touched before writing any code. User confirms before implementation.
2. **Do not touch the Transformed tab** until the Extracted tab work is complete. It stays as the working reference and proof view throughout.

---

## Incremental Steps

_To be defined as we work through the changes._

---

## Observations Log

_Running notes captured during planning and implementation._

1. UUI boxes can be nested (Feb 2026)
