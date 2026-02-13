# up-doc-workflow-source-view.element.ts

Workspace view for the Source tab in the workflow workspace. Displays the four-level extraction hierarchy (Page > Area > Section > Text) and the transformed content view.

## What it does

Displays the sample extraction for a workflow in two modes:

- **Extracted** — zone detection hierarchy showing pages, areas (colour-coded), sections (with headings), and individual text elements with metadata
- **Transformed** — assembled sections with pattern detection (bullet list, paragraph, sub-headed, preamble) and mapping controls

Users can include/exclude sections (via toggle), include/exclude pages, map sections to destination fields, collapse/expand any level, and re-extract from a different source PDF.

## How it works

### Layout pattern

Uses `umb-body-layout header-fit-height` with a single `slot="header"` div containing `uui-tab-group` for view switching (Extracted / Transformed). Info boxes and content are in the scrollable area below.

```html
<umb-body-layout header-fit-height>
    <div slot="header" class="source-header">
        <uui-tab-group><!-- Extracted / Transformed --></uui-tab-group>
    </div>
    <div class="info-boxes"><!-- uui-box cards: Source, Pages, Zones, Sections --></div>
    <div class="collapse-row"><!-- Collapse All button, right-aligned --></div>
    <!-- scrollable content -->
</umb-body-layout>
```

### Info boxes (uSync-inspired)

Four equal-width `<uui-box>` cards in a flex row with `flex-grow: 1`, following the uSync dashboard pattern:

1. **Source** — h2 filename, document icon, extraction date, Re-extract (green) and Change PDF (blue) buttons
2. **Pages** — stat number (e.g., "2 of 4"), label, page selection controls (All/Choose radio + range input)
3. **Zones** — stat number, label
4. **Sections** — stat number, label

The Collapse All / Expand All button sits in its own row below the boxes, right-aligned.

### Page selection

Users can filter which PDF pages are extracted. Stored in `source.json` as a `pages` array of page numbers.

- **All mode** — all pages processed (default, no `pages` in source.json)
- **Custom mode** — user enters a range string (e.g., "1-2, 5") parsed into individual page numbers
- **Per-page toggles** — each Page box in the hierarchy has an include/exclude toggle that updates the range
- Selecting all pages automatically switches back to "All" mode
- Page selection is saved immediately on change and applied on next re-extract

### Data loading

On load, the component:

1. Consumes `UMB_WORKSPACE_CONTEXT` and observes the `unique` value (workflow name)
2. Loads in parallel: sample extraction, zone detection, workflow config, transform result, source config
3. Initialises page selection state from source config
4. Stores all in state for rendering

### Extracted mode (zone detection hierarchy)

Elements are displayed in a four-level collapsible hierarchy:

1. **Page** — `uui-box` with "Page N" headline, section/area counts, page include toggle, and collapse chevron in `header-actions` slot. Excluded pages are dimmed.
2. **Area** — colour-coded left border with "Area N" label, colour swatch, section count, and collapse chevron. Areas without a detected zone are labelled "Undefined" (italic, dimmed).
3. **Section** — heading row with include/exclude toggle, heading text + meta badges, child count, and collapse chevron. Preamble sections (no heading) have the same collapse behaviour.
4. **Text** — individual elements with text type badge (List/Paragraph), font size, font name, and colour badges.

### Collapse behaviour

All four levels are collapsible via a consistent chevron icon (`icon-navigation-right` when collapsed, `icon-navigation-down` when expanded). The chevron is always the rightmost element in each row.

State is managed by a single `_collapsed` Set with key prefixes:
- Pages: `page-${pageNum}`
- Areas: `area-p${pageNum}-a${areaIndex}` or `area-p${pageNum}-undefined`
- Sections: `p${pageNum}-a${areaIndex}-s${sIdx}`

A global Collapse All / Expand All button toggles all pages at once. The include/exclude toggle uses `@click stopPropagation` to prevent also triggering collapse.

### Transformed mode

Shows assembled sections from the transform pipeline with:

- Pattern badges (Bullet List, Paragraph, Sub-Headed, Preamble)
- Page and zone indicators
- Mapping controls: "Map" button for unmapped sections, green badges for mapped ones
- Markdown content rendered as HTML

### Mapping

From the Transformed view, users can map section headings and content to destination fields. `#onMapSection(sourceKey)` opens the `UMB_DESTINATION_PICKER_MODAL` and saves results to `map.json`. Mapped sections show green badges and a green left border.

### Empty state

When no sample extraction exists, shows a centered prompt with "Choose PDF" button.

## Key methods

| Method | Purpose |
|--------|---------|
| `#loadData()` | Loads extraction, zone detection, config, transform, source config in parallel |
| `#parsePageRange(input)` | Converts "1-3, 5" to `[1, 2, 3, 5]` |
| `#pagesToRangeString(pages)` | Converts `[1, 2, 3, 5]` to "1-3, 5" |
| `#togglePage(pageNum)` | Toggles a page on/off and updates the range input |
| `#savePageSelection()` | Persists page selection to source.json |
| `#onReExtract()` | Re-extracts using previously stored media key |
| `#onPickMedia()` | Opens media picker, runs extraction on selected PDF |
| `#isCollapsed(key)` | Checks if a page/area/section is collapsed |
| `#toggleCollapse(key)` | Toggles collapse state for any level |
| `#toggleCollapseAll()` | Collapses or expands all pages at once |
| `#renderExtractionHeader()` | Tab group slotted into header |
| `#renderInfoBoxes()` | Four equal-width uui-box cards (Source, Pages, Zones, Sections) |
| `#renderPageSelection()` | Radio buttons (All/Choose) + range text input |
| `#renderExtractionContent()` | Dispatches to zone detection or transformed view |
| `#renderZonePage()` | Renders a page with toggle, area count, and collapse |
| `#renderArea()` | Renders "Area N" with sections and collapse |
| `#renderUnzonedContent()` | Renders "Undefined" area for unclassified content |
| `#renderSection()` | Renders a section with toggle, heading, children, collapse |
| `#renderZoneElement()` | Renders individual text element with type + metadata badges |
| `#classifyText()` | Classifies text as 'list' or 'paragraph' by leading pattern |
| `#renderTransformedSection()` | Renders an assembled section with pattern badge and mapping |
| `#renderMappingBadges()` | Shows Map button or green mapped-target badges |

## Imports

```typescript
import type { RichExtractionResult, DocumentTypeConfig, MappingDestination, ZoneDetectionResult, DetectedZone, DetectedSection, ZoneElement, TransformResult, TransformedSection, SourceConfig } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, fetchZoneDetection, triggerTransform, fetchTransformResult, updateSectionInclusion, saveMapConfig, savePageSelection, fetchSourceConfig } from './workflow.service.js';
import { markdownToHtml, normalizeToKebabCase } from './transforms.js';
import { UMB_DESTINATION_PICKER_MODAL } from './destination-picker-modal.token.js';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_MEDIA_PICKER_MODAL } from '@umbraco-cms/backoffice/media';
```

## Registered in

- `manifest.ts` — single `workspaceView` registration:
    - `UpDoc.WorkflowWorkspaceView.Source` (weight 200, icon `icon-page-add`)
- Conditioned on `Umb.Condition.WorkspaceAlias` matching `UpDoc.WorkflowWorkspace`

## Used by

- Displayed as the Source tab when viewing an individual workflow in the workflow workspace
