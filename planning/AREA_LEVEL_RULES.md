# Plan: Area-Level Rules & Structural Separation

## Status: PLANNING — Design decisions captured, implementation not started

---

## Summary

This document captures a fundamental architectural insight: **structural labels and content are separate concerns.** The current UI conflates them — a heading like "FEATURES" serves both as the collapsible section header AND as content from the PDF. This prevents headings from getting role badges and makes the grouping rules invisible.

The fix: apply rules at the **area level** to control how elements within each area are structured. The area is the unit of rule application. If content needs different rules, split it into different areas.

---

## The Problem

### Headings doing double duty

Currently, when zone detection finds a heading (largest font in the area), it becomes the collapsible section header in the UI:

```
v  FEATURES                        7 texts  [toggle]
     • 4* central Liverpool hotel  LIST  8.5pt  HelveticaNeue  #16549D
     • Three dinners included      LIST  8.5pt  HelveticaNeue  #16549D
```

"FEATURES" is simultaneously:
- **Structural**: the collapsible row that groups the list items
- **Content**: actual text from the PDF that will be mapped somewhere

Because it's used as structure, it can't have a `HEADING` badge — it's not rendered as a regular element. Its role is implied by position, not stated. Meanwhile child elements get explicit role badges (`LIST`, `PARAGRAPH`).

### Invisible rules

The zone detection algorithm silently decides "FEATURES is a heading because it has the largest font size in this area." This decision is invisible to the user. They see `12pt Clarendon #16549D UPPERCASE` but have to infer WHY it was classified as a heading.

In the Page Header area, the same algorithm creates false hierarchy — "The Arts Society of Kingston Presents" gets shoved into a "Content" group under an imaginary heading, when it's actually a standalone line.

---

## The Solution: Area-Level Rules

### Core principle

Each area gets rules that control how its elements are structured. Rules are defined in the Edit Areas editor alongside the area's spatial boundaries and name.

### The area IS the unit of rule application

- Rules are per-area, not per-document or per-section
- If content within an area needs different rules, split it into two areas
- This keeps things simple and avoids the "mixed mode" problem

### Three behaviours (determined by rules)

| Behaviour | When to use | Mappable units | Example |
|-----------|-------------|----------------|---------|
| **Each element** | Every element maps to a different destination field | Individual elements | Page Header (3 fields), Organiser Info (5 fields) |
| **Heading-delimited sections** | Heading pattern creates separately-mappable groups | Groups of elements | Tour Details (Features, What We Will See, Accommodation) |
| **Whole area** | Entire area goes to one destination field | The area as one block | Itinerary (all days → one rich text field) |

These aren't rigid "modes" — they emerge from what heading rule (if any) is defined for the area:
- **No heading rule** → every element is a peer (flat)
- **Heading rule defined** → matching elements create section boundaries
- **No heading rule + map entire area** → whole area is one block

### Heading rule = the only variable

An area's heading rule is a set of conditions (using the same metadata vocabulary as section rules): font size, font name, color, uppercase, etc. If an element matches the heading rule, it starts a new section. If no heading rule is defined, all elements are peers.

---

## UI Changes

### Section rendering (Extracted view)

**Before:** Heading text IS the collapsible section header.

**After:** Section gets a structural label derived from the heading text. Heading becomes a child element with a `HEADING` badge.

```
Tour details                                           4 sections
  Section - Features                                   7 elements
    FEATURES          HEADING  12pt  Clarendon  #16549D  UPPERCASE
    • 4* central Liverpool hotel     LIST  8.5pt  HelveticaNeue  #16549D
    • Three dinners included         LIST  8.5pt  HelveticaNeue  #16549D
    ...
  Section - What We Will See                           5 elements
    WHAT WE WILL SEE  HEADING  12pt  Clarendon  #16549D  UPPERCASE
    • Liverpool Cathedral            LIST  8.5pt  HelveticaNeue  #16549D
    ...
```

For areas with no heading rule (flat):

```
Page Header                                            3 elements
  The Arts Society of Kingston Presents   PARAGRAPH  9pt  HelveticaNeue  #FFFFFF
  The Art & History of Liverpool          PARAGRAPH  20pt  Clarendon  #FFD200
  5 days from £814 Departing...           PARAGRAPH  14.4pt  HelveticaNeue-Medium  #FFD200
```

No sections, no grouping — just elements listed directly under the area.

### Element role badges

Every element gets a role badge as the first badge:
- `HEADING` — element matches the area's heading rule
- `LIST` — element text starts with a bullet character (existing logic)
- `PARAGRAPH` — everything else

The `HEADING` badge is new. `LIST` and `PARAGRAPH` already exist but are now consistently applied to ALL elements including headings.

### Area header (future)

Each area header could show the active heading rule (if any) as a subtle label or badge. The Edit Areas editor is where you define/modify it. Detail deferred to implementation.

---

## Relationship to Existing Features

### Section Rules Editor (SECTION_RULES_EDITOR.md)

Section rules operate WITHIN a section — they assign roles to individual elements (e.g., "organiser-name", "telephone", "email"). Area-level rules operate ABOVE sections — they control how elements get grouped into sections in the first place.

```
Area rules  →  "How are elements grouped into sections?"
Section rules  →  "Within a section, what role does each element play?"
```

Both use the same condition vocabulary (font size, color, text patterns, etc.). Both are defined using the Outlook rules pattern. They just operate at different levels.

### Edit Areas (ZONE_EDITOR.md)

Currently, Edit Areas defines spatial boundaries and names. Area-level rules extend this: alongside "where is this area?" and "what's it called?", you also define "how should elements within it be structured?"

### Transform Layer

The current transform layer uses the hard-coded "largest font = heading" heuristic. Area-level rules replace this with a configurable heading pattern per area. The transform service accepts the rules as parameters instead of using the built-in heuristic.

---

## Concrete Example: The Group Tour PDF

### Page 1

| Area | Heading Rule | Result |
|------|-------------|--------|
| **Page Header** | None (flat) | 3 peer elements: society name, tour title, description |
| **Organiser Info** | None (flat) | 6 peer elements: intro line, name, tel, email, separator, address |
| **Tour Details** | 12pt + Clarendon + UPPERCASE + #16549D | 4 sections: Features, What We Will See, Accommodation, Extras |

### Page 2

| Area | Heading Rule | Result |
|------|-------------|--------|
| **Itinerary** | None (whole area) | All elements concatenated → one rich text field. Day headings become `<h2>` formatting. |

---

## What This Does NOT Change

- **Areas are still spatial** — defined by position on the page
- **Section rules still work within sections** — for breaking sections into individually-mappable roles
- **Map tab still wires sections to destinations** — no change to mapping
- **The metadata badges are still the vocabulary** — font size, font name, color, uppercase, text patterns

---

## Open Questions

1. **Where exactly in Edit Areas does the heading rule go?** The editor currently has boundary definition + name. Adding a heading rule section needs design thought. Could be a simple dropdown ("No grouping" / "Group by heading pattern") with a condition builder underneath.

2. **How does "whole area" differ from "no heading rule"?** In both cases there are no section boundaries. The distinction is in mapping: "no heading rule" means each element maps independently; "whole area" means everything concatenates into one field. This might be a mapping concern, not a structure concern — in which case the area only needs "has heading rule" or "no heading rule", and "whole vs individual" is decided at map time.

3. **Storage location?** Area-level rules could live in:
   - Zone detection config (alongside area boundaries) — natural fit
   - Source config (alongside section rules) — keeps all rules together
   - Need to check what structure `zone-detection.json` currently has

4. **Re-extraction behaviour?** When rules change for an area, does the Extracted view update immediately (client-side re-grouping) or require a server-side re-extract? Since zone detection is server-side, rule changes probably trigger a re-detect call.

---

## Relationship to Other Planning Docs

- **SECTION_RULES_EDITOR.md** — Section rules (within-section roles). Operates one level below area rules.
- **THREE_LAYER_PIPELINE.md** — Extract → Shape → Map. Area rules are part of the Shape layer.
- **ZONE_EDITOR.md** — Edit Areas defines area boundaries. Area rules extend this.
- **DESTINATION_DRIVEN_MAPPING.md** — Bidirectional mapping. Area rules don't change mapping — they change what the mappable units are.
