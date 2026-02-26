# Plan: Jump List / In-Page Index Feature

## Status: PLANNING

---

## Overview

Tour pages are getting long. Visitors need a way to jump to specific sections (Itinerary, Accommodation, Sights, etc.) without scrolling through the entire page. This is an in-page table of contents — anchor links that scroll to feature blocks.

This is a **test site front-end feature** with equal weight to the UpDoc package work. The tour pages are the reason the package exists.

---

## Scope: Two Projects

### Phase 1 (fragment IDs) belongs in Umbootstrap, not just the test site.

Adding `id` attributes to feature block headings is a **foundational front-end concern** — any site using block grid features with headings benefits from anchor-linkable sections. This should be implemented in the Umbootstrap starter kit so every project gets it automatically.

The test site inherits Umbootstrap's `_Layout_Features.cshtml`. Changes there propagate here.

### Phases 2-3 (Include in Index setting, Jump List block) are test-site-specific for now.

The `FeatureSettings` composition and the jump list block type are content model decisions that belong to each project individually. They may move to Umbootstrap later if the pattern proves universal.

### Quick win: manual jump list via rich text

Before building a dedicated jump list block (Phase 3), a content editor can create a jump list manually using a rich text editor block — just an ordered list of anchor links (`<a href="#accommodation">Accommodation</a>`). This works as soon as Phase 1 (fragment IDs) is complete. Phase 3 automates what the editor would otherwise do by hand.

---

## Key Design Decisions

### 1. Fragment IDs on feature sections

Every feature block rendered by `_Layout_Features.cshtml` gets an `id` attribute on its **`<section>` element** (not the `<h2>` heading), making it linkable via `#fragment`.

**Why `<section>`, not `<h2>`?** When the browser jumps to an anchor, it scrolls that element to the top of the viewport. Anchoring on the `<section>` means the user sees the full feature context — background colour, header, description — rather than landing right at the heading text with the section top cut off. The extra space above the heading makes the jump feel natural.

**ID strategy: slugified title, short GUID suffix for duplicates.**

- Default: slugify the `featureTitle` — `"Accommodation"` becomes `id="accommodation"`
- If a duplicate slug exists on the page, append the first 8 chars of the block's GUID — `id="accommodation-7a3f2b1c"`
- If no title exists, use the full short GUID — `id="feature-7a3f2b1c"`

**Why not full GUIDs?** They work but create ugly, meaningless URLs when shared or bookmarked. `#accommodation` is human-readable and stable in the common case.

**Why not pure slugs?** Duplicate titles are possible (rare but real). The short GUID suffix handles this without position-dependence — reordering blocks doesn't change their IDs.

**Implementation:** Razor generates the IDs in `_Layout_Features.cshtml`. A duplicate check runs across all feature blocks on the page during rendering. This requires collecting all feature slugs before rendering (or a two-pass approach / tracking dictionary in ViewData).

**Hover hash link on headings:** A clickable `#` icon (or link icon) appears on hover over the `<h2>` heading text. Clicking it updates the URL hash to `#section-slug` so the user can copy/share a direct link to that section. The link targets the `<section>` anchor, not the heading itself. This is the same pattern used by GitHub README headings and MkDocs paragraph links. Implementation is CSS (show on hover) + a small `<a>` element inside or adjacent to the `<h2>`. Could be done in Phase 1 alongside the `id` attributes, or added separately.

### 2. "Include in Index" setting on FeatureSettings

A new boolean property on the `FeatureSettings` composition:

| Property | Details |
|----------|---------|
| Alias | `featureSettingsIncludeInIndex` |
| Type | `Umbraco.TrueFalse` (toggle) |
| Tab | "Feature Display" (existing tab, alongside `featureSettingsHideDisplay`) |
| Default | `true` |
| Description | "Include this feature in the page jump list / index" |

**Why on FeatureSettings (the settings panel) and not on content?** Because it's a display/layout concern, not a content concern. It sits alongside "Hide Display" and "Colour Picker" — all presentation settings.

**Why a composition?** `FeatureSettings` is already a composition applied to all feature element types. Adding a property to one of its sub-compositions (or adding a new one) propagates to every feature automatically.

**Blueprint defaults:** In the blueprint, set `includeInIndex = true` for content sections (Itinerary, Accommodation, Sights) and `false` for decorative/structural blocks (images, spacers). When a content editor creates a new tour, each block inherits the blueprint's default. They can override per-document.

### 3. Jump List block type

A new feature block type that renders the in-page section index.

| Property | Details |
|----------|---------|
| Element type alias | `featureJumpList` (or `featurePageIndex`) |
| Compositions | `featureComponentNoConfiguration` (same pattern as `featureNavigationDescendants`) |
| Content properties | None — the Razor view does all the work |
| Layout | Does NOT use `_Layout_Features.cshtml` — renders its own markup |

#### Placement: block grid layout decision (not code)

Where the jump list sits on the page is a **blueprint layout decision**, not a development concern. The block is placement-agnostic — it renders correctly wherever it's placed in the block grid. The content editor (or blueprint author) decides where it goes.

**Current preferred direction: full-width bar after page title/description.**

```
┌──────────────────────────────────────────────┐
│ [Hero Image]                                 │
├──────────────────────────────────────────────┤
│ Tour Title                                   │
│ Description                                  │
├──────────────────────────────────────────────┤
│ Itinerary | Accommodation | Sights | ...  🔗 │  ← jump bar
├──────────────────────────────────────────────┤
│ [Feature sections below]                     │
└──────────────────────────────────────────────┘
```

**Why full-width bar (not sidebar)?** Placing it in a sidebar column creates mobile reordering problems — left columns go to top, right columns go to bottom, and other blocks (organisers, page nav) compete for those column positions. A full-width bar immediately after the title avoids all column reordering issues and works identically on desktop and mobile.

**Share button:** The right side of the bar could include a native share button — a natural companion to the section navigation.

**Sidebar is still an option.** The Sprott-style collapsible sidebar (see Visual Reference) works well for content-heavy pages. The block can be placed in a sidebar area if a specific page needs that layout. The code is the same — only the blueprint placement changes.

**Layout implications for tour pages:**
- Organisers, page nav, and the jump list are all just blocks in the block grid
- Moving them between columns, full-width rows, or different areas is drag-and-drop in the blueprint
- No template or code changes needed for different placements

#### Visual pattern: collapsible `<details>`/`<summary>`

Based on a proven pattern built for a previous client project (Sprott Physical Gold Trust):

```html
<details class="jump-list">
    <summary>Page Menu - {Tour Name}</summary>
    <ol>
        <li><a href="#itinerary">Itinerary</a></li>
        <li><a href="#accommodation">Accommodation</a></li>
        <li><a href="#sights">Sights</a></li>
        ...
    </ol>
</details>
```

**Why `<details>`/`<summary>`?**
- Native HTML, no JavaScript needed for open/close
- Collapsed by default on mobile — saves vertical space, just shows "Page Menu" as a single line
- Can be open by default on desktop via CSS or the `open` attribute
- Progressive enhancement — works without JS, screenreader accessible
- Sticky positioning (`position: sticky; top: ...`) keeps it visible as the user scrolls

**Sticky behaviour:** The jump list stays visible at the top of the viewport as the user scrolls down the page. When scrolled back to the top, it returns to its natural position. Works for both full-width bar and sidebar placements.

**Full-width bar rendering:** When placed full-width, the `<details>` could render as an inline horizontal list (links side by side) on desktop and collapse to the vertical `<details>`/`<summary>` on mobile. Or it could always be a horizontal bar with overflow scrolling. This is a CSS concern, not a Razor concern — the same HTML structure adapts.

#### How it works

1. The jump list block is placed in the block grid by the content editor (placement is flexible — full-width row, sidebar, anywhere)
2. The Razor view accesses the current page via `Umbraco.AssignedContentItem`
3. It reads the block grid content value and iterates all block instances
4. For each block that has `featureSettingsIncludeInIndex == true` (and `featureSettingsHideDisplay != false`), it adds an entry to the list
5. It renders a `<details>` element with an `<ol>` of anchor links using the same slug logic as `_Layout_Features.cshtml`

**Scope: all features on the page.** Reads all features from the page's block grid regardless of which area they're in. Area-scoping could be added later if needed (the jump list block would need a property to specify which area alias to filter by).

### 4. Numbering

The jump list renders a numbered `<ol>` list. The numbers come from the HTML ordered list itself — no CSS counters, no programmatic numbering on the headings.

**Headings do NOT get numbers.** The jump list shows "1. Itinerary", "2. Accommodation", etc., but the actual `<h2>` headings on the page remain unnumbered. This keeps the headings clean and avoids the CSS counter print issues.

If numbered headings are wanted later, that's a separate decision — it could be done programmatically in `_Layout_Features.cshtml` by tracking a counter in `ViewData`, which would work for both screen and print.

---

## Current State

- `_Layout_Features.cshtml` renders all feature blocks. No `id` attributes on `<section>` or `<h2>`.
- `FeatureSettings` has two properties via compositions: `featureSettingsHideDisplay` (toggle) and `featureSettingsColourPicker` (colour picker).
- `featureNavigationDescendants` is a reference pattern — a zero-property block that builds navigation from page structure in Razor.
- Block grid areas expose `Model.Alias` in Razor views.
- No existing jump list, table of contents, or anchor functionality anywhere in the views.

---

## Implementation Phases

### Phase 1: Fragment IDs on feature blocks (Umbootstrap)

**Project:** Umbootstrap starter kit (not this repo)

**Changes:**
- `_Layout_Features.cshtml` — add `id` attribute to the `<section>` element
- Slug generation: lowercase, replace spaces with hyphens, strip special characters
- Duplicate detection: use `ViewData` dictionary to track slugs already used on the page; append short GUID on collision

**Verification:** View a tour page source, confirm each feature section has a unique `id`. Navigate to `page-url#accommodation` and confirm it scrolls to the right section.

**Immediate benefit:** Once IDs exist, content editors can create manual jump lists using any rich text editor block — just anchor links to `#section-name`. No new block types needed.

### Phase 2: "Include in Index" setting (Test Site)

**Project:** UpDoc test site

**Changes:**
- Create new composition element type `featureSettingsComponentIncludeInIndex` with the boolean property
- Add it as a composition on `featureSettings`
- Update blueprints to set appropriate defaults per block

**Verification:** Edit a tour in the backoffice, open a feature block's settings tab, confirm "Include in Index" toggle appears. Verify blueprint defaults carry through to new documents.

### Phase 3: Jump List block (Test Site)

**Project:** UpDoc test site

**Changes:**
- Create `featureJumpList` element type (compositions: `featureComponentNoConfiguration`)
- Allow it in the block grid data type(s)
- Create `featureJumpList.cshtml` partial view
- Razor view reads page's block grid, filters by `includeInIndex`, renders collapsible `<details>`/`<summary>` with `<ol>` of anchor links
- CSS for sticky positioning and responsive layout (horizontal bar on desktop, collapsible on mobile)
- Place block in tour blueprints (full-width row after page title, or sidebar — layout decision made at blueprint level)

**Verification:**
- Add the jump list block to a tour page
- Confirm it renders a collapsible "Page Menu" with feature titles as anchor links
- Click a link, confirm it scrolls to the correct section
- Toggle "Include in Index" off on a feature, confirm it disappears from the list
- Scroll down on desktop — confirm the jump list stays sticky/visible
- Test on mobile viewport — confirm it collapses cleanly

### Phase 4 (Future): Enhancements

- **Area-scoping** — optional property on the jump list block to filter by area alias
- **Numbered headings** — optional programmatic numbering on the `<h2>` elements
- **Icons per item** — optional icons alongside section names (as in the Sprott reference)
- **Smooth scrolling** — CSS `scroll-behavior: smooth` or JS for offset handling (fixed headers)
- **Active state** — highlight the current section in the jump list as the user scrolls (Intersection Observer)
- **Print styling** — ensure the jump list either prints nicely or is hidden in print
- **Promote to Umbootstrap** — if the Include in Index setting and Jump List block prove universal, move them from the test site to Umbootstrap

---

## Affected Files

### Umbootstrap (Phase 1)

| File | Change |
|------|--------|
| `_Layout_Features.cshtml` | Add `id` attribute with slug generation |

### UpDoc Test Site (Phases 2-3)

| File | Change |
|------|--------|
| `featureSettings` composition | Add new sub-composition for "Include in Index" |
| `featureJumpList.cshtml` | New file — jump list Razor partial |
| `featureJumpList` element type | New — created in Umbraco backoffice |
| Block grid data types | Allow `featureJumpList` block |
| Tour blueprints | Set `includeInIndex` defaults per block |

---

## Relationship to UpDoc Package

This feature does not affect the UpDoc RCL package code. However, it interacts with UpDoc in one important way: when UpDoc creates a document from source using a blueprint, the `includeInIndex` settings on each block carry through automatically from the blueprint. No mapping configuration needed — it's a block setting, not mapped content.

## Relationship to Umbootstrap

Phase 1 (fragment IDs) is a change to Umbootstrap's `_Layout_Features.cshtml`. This is the right place for it because:
- Every Umbootstrap-based site benefits from anchor-linkable feature sections
- The test site inherits this layout, so the change propagates automatically
- It's a zero-cost addition — an `id` attribute on a `<section>` has no visual or behavioural impact unless something links to it

---

## Visual Reference

**Sprott Physical Gold Trust** — previous client project with a working jump list implementation:
- Collapsible `<details class="details-nav">` with `<summary>` header ("Page Menu - PHYS")
- Collapsed: single teal bar at top of section, minimal footprint
- Expanded: full list with icons per section (Pricing, Overview, Performance, Commentary, etc.)
- Sticky: stays at top of viewport when scrolling, visible in third screenshot at "Commentary" section
- Native HTML `<details>`/`<summary>`, no JavaScript for open/close

Screenshots captured Feb 2026 showing collapsed state, expanded state, and sticky behaviour while scrolled.

---

## Open Questions

1. **Naming:** `featureJumpList` vs `featurePageIndex` vs `featureTableOfContents`? "Jump List" is the working name but "Page Index" might be clearer to content editors.

2. **Scroll offset:** If the site has a fixed/sticky header, anchor links will scroll the heading behind the header. This needs a CSS `scroll-margin-top` on the feature sections, or JS offset calculation. Worth handling in Phase 1 or deferring to Phase 4?

3. **Block grid traversal depth:** Tour pages use layout blocks (e.g., `layout12`) that contain areas, which contain feature blocks. The jump list needs to walk this hierarchy. How deep can it nest in practice? Is it always layout → area → features, or can features be nested deeper?
