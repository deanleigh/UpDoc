# up-doc-workflow-source-view.element.ts

Workspace view for the Source tab in the workflow workspace. Displays the four-level extraction hierarchy (Page > Area > Section > Text) and the transformed content view.

## What it does

Displays the sample extraction for a workflow in two modes:

- **Extracted** — zone detection hierarchy showing pages, areas (colour-coded), sections (with headings), and individual text elements with metadata
- **Transformed** — assembled sections with pattern detection (bullet list, paragraph, sub-headed, preamble) and mapping controls

Users can include/exclude sections (via toggle), map sections to destination fields, collapse/expand any level, and re-extract from a different source PDF.

## How it works

### Layout pattern

Uses `umb-body-layout header-fit-height` with a single `slot="header"` div containing `uui-tab-group` (left) and Re-extract button (right), following the Document Type editor pattern. Stat boxes are in the scrollable content area.

```html
<umb-body-layout header-fit-height>
    <div slot="header" class="source-header">
        <uui-tab-group><!-- Extracted / Transformed --></uui-tab-group>
        <div class="header-actions"><!-- Re-extract button --></div>
    </div>
    <div class="stat-boxes"><!-- Pages, Zones, Sections, Source --></div>
    <!-- scrollable content -->
</umb-body-layout>
```

### Data loading

On load, the component:

1. Consumes `UMB_WORKSPACE_CONTEXT` and observes the `unique` value (workflow name)
2. Loads in parallel: sample extraction, zone detection, workflow config, transform result
3. Stores all in state for rendering

### Extracted mode (zone detection hierarchy)

Elements are displayed in a four-level collapsible hierarchy:

1. **Page** — `uui-box` with "Page N" headline and area count in `header-actions` slot. Chevron toggles collapse.
2. **Area** — colour-coded left border with "Area N" label, colour swatch, section count, and collapse chevron. Areas without a detected zone are labelled "Undefined" (italic, dimmed).
3. **Section** — heading row with include/exclude toggle, heading text + meta badges, child count, and collapse chevron. Preamble sections (no heading) have the same collapse behaviour.
4. **Text** — individual elements with text type badge (List/Paragraph), font size, font name, and colour badges.

### Collapse behaviour

All four levels are collapsible via a consistent chevron icon (`icon-navigation-right` when collapsed, `icon-navigation-down` when expanded). The chevron is always the rightmost element in each row.

State is managed by a single `_collapsed` Set with key prefixes:
- Pages: `page-${pageNum}`
- Areas: `area-p${pageNum}-a${areaIndex}` or `area-p${pageNum}-undefined`
- Sections: `p${pageNum}-a${areaIndex}-s${sIdx}`

The include/exclude toggle uses `@click stopPropagation` to prevent also triggering collapse.

### Transformed mode

Shows assembled sections from the transform pipeline with:

- Pattern badges (Bullet List, Paragraph, Sub-Headed, Preamble)
- Page and zone indicators
- Mapping controls: "Map" button for unmapped sections, green badges for mapped ones
- Markdown content rendered as HTML

### Mapping

From the Transformed view, users can map section headings and content to destination fields. `#onMapSection(sourceKey)` opens the `UMB_DESTINATION_PICKER_MODAL` and saves results to `map.json`. Mapped sections show green badges and a green left border.

### Empty state

When no sample extraction exists, shows a centered prompt with "Upload PDF" button.

## Key methods

| Method | Purpose |
|--------|---------|
| `#isCollapsed(key)` | Checks if a page/area/section is collapsed |
| `#toggleCollapse(key)` | Toggles collapse state for any level |
| `#renderExtractionHeader()` | Tab group + Re-extract button (slotted into header) |
| `#renderStatBoxes()` | Pages, Zones, Sections, Source stat boxes |
| `#renderExtractionContent()` | Dispatches to zone detection or transformed view |
| `#renderZonePage()` | Renders a page with area count and collapse |
| `#renderArea()` | Renders "Area N" with sections and collapse |
| `#renderUnzonedContent()` | Renders "Undefined" area for unclassified content |
| `#renderSection()` | Renders a section with toggle, heading, children, collapse |
| `#renderZoneElement()` | Renders individual text element with type + metadata badges |
| `#classifyText()` | Classifies text as 'list' or 'paragraph' by leading pattern |
| `#renderTransformedSection()` | Renders an assembled section with pattern badge and mapping |
| `#renderMappingBadges()` | Shows Map button or green mapped-target badges |

## Imports

```typescript
import type { RichExtractionResult, DocumentTypeConfig, MappingDestination, ZoneDetectionResult, DetectedZone, DetectedSection, ZoneElement, TransformResult, TransformedSection } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, fetchZoneDetection, triggerTransform, fetchTransformResult, updateSectionInclusion, saveMapConfig } from './workflow.service.js';
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
