# Plan: Destination Preview Consistency

## Status: PLANNED

## Problem

Three views currently show mapped content in flat, unstructured lists:

1. **Create from Source sidebar (Content tab)** — flat scroll of all mapped fields (Features > Title, Accommodation > Rich Text, Page Title, Page Description, Suggested Itinerary > Rich Text, etc.) in no particular order
2. **Map tab** — mappings listed in insertion order, not grouped or ordered by destination structure
3. **Destination tab** — already correctly organised into Page Properties / Page Content tabs with fields in document order

The Destination tab and the actual Umbraco document editor both use the same tab structure (Page Properties, Page Content, and any custom tabs like "Organiser Details"). The other views should match this structure for a consistent mental model.

## Principle

**The destination document's tab structure is the universal organising principle.** Anywhere we show destination fields or mapped content, group and order them to match the tabs and field order the user will see when editing the document.

## What Changes

### 1. Create from Source Sidebar — Content Tab

**Current:** Flat list of all mapped field values in arbitrary order.

**After:** Inner tabs matching the document's property group tabs:
- **Page Properties** tab: Page Title, Page Title Short, Page Description (in document order)
- **Page Content** tab: Block Grid items grouped by block (Features, Suggested Itinerary, Accommodation), each showing their mapped fields (Title, Rich Text, etc.)
- **Custom tabs** (if any): e.g., "Organiser Details" — shown as additional tabs

The tab structure and field ordering comes from `destination.json`, which is already built from the blueprint and groups fields by property group/tab.

### 2. Map Tab

**Current:** Flat table of Source → Destination mappings in insertion order. 10 mappings shown as one long list.

**After:** Mappings grouped by destination tab, fields ordered by destination position:

```
Page Properties
  Source                                    →  Destination
  the-art-history-of-liverpool.heading      →  Page Title, Page Title Short
  5-days-from-814-departing-5th-oct....heading →  Page Description

Page Content — Suggested Itinerary
  Source                                    →  Destination
  6-days-from-994-departing....content      →  Rich Text

Page Content — Features
  Source                                    →  Destination
  features.heading                          →  Title
  features.content                          →  Rich Text

Page Content — Accommodation
  Source                                    →  Destination
  accommodation.heading                     →  Title
  accommodation.content                     →  Rich Text
```

Grouping and ordering derived from `destination.json`. Mappings for fields not found in destination (orphaned) shown in a separate "Unmapped" section at the bottom.

### 3. No Changes to Destination Tab

The Destination tab already uses the correct tab structure. No changes needed.

## Data Source

`destination.json` already contains the tab/group structure:
- Page Properties fields with their aliases and order
- Page Content block grid with blocks, each identified by their feature title
- Fields within each block in document order

Both the Create from Source sidebar and the Map tab can read this structure to determine grouping and ordering. The workflow workspace context already loads `destination.json`.

## Implementation Notes

- The Create from Source sidebar (`up-doc-collection-action.element.ts` and `up-doc-action.ts`) currently builds the content preview by iterating mappings. Needs to load destination structure and group by tab.
- The Map tab (`up-doc-workflow-map-view.element.ts`) currently renders a flat table. Needs section headers per destination tab/block and reordering.
- Both bridge files (`up-doc-action.ts` and `up-doc-collection-action.element.ts`) must be updated in sync — see MEMORY.md critical lesson about keeping these in sync.
- Tab rendering can reuse `uui-tab-group` pattern already used on the Destination view.

## Out of Scope

- Changing the actual mapping data structure in `map.json` — this is purely a presentation change
- Destination-driven mapping UI (covered in `DESTINATION_DRIVEN_MAPPING.md`)
- Editable content in the preview (future feature)
