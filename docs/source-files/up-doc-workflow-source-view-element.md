# up-doc-workflow-source-view.element.ts

Workspace view for the Source tab in the workflow workspace. Displays rich extraction results and supports source-to-destination mapping.

## What it does

Displays the sample extraction for a workflow — all text elements extracted from a reference PDF with full metadata (font size, font name, color, position). Users can select elements and map them to destination fields, creating entries in `map.json`. Also shows mapping status on already-mapped elements.

## How it works

### Data loading

On load, the component:

1. Consumes `UMB_WORKSPACE_CONTEXT` and observes the `unique` value (workflow name)
2. Loads the full workflow config via `fetchWorkflowByName()` (includes destination + map data)
3. Loads the sample extraction via `fetchSampleExtraction()` (rich extraction with metadata)
4. Stores both in state for rendering

### Sample extraction display

When a sample extraction exists, elements are grouped by page number and displayed with:

- **Text content** — the extracted text
- **Metadata badges** — font size (pt), font name, color (with color swatch), position (x, y)
- **Mapping indicators** — green badges showing destination field names for mapped elements, green left border

### Extraction header

Shows source file name, page count, element count, extraction timestamp, and a "Re-extract" button that opens the media picker.

### Element selection and mapping

Users can:

1. Click checkboxes to select one or more elements
2. A sticky toolbar appears showing selection count with "Map to..." and "Clear" buttons
3. "Map to..." opens the `UMB_DESTINATION_PICKER_MODAL` sidebar showing destination fields/blocks
4. On confirm, new mappings are created in `map.json` via `saveMapConfig()` PUT endpoint
5. The UI updates immediately to show the new mapping indicators

### Mapped status indicators

For each element, `#getMappedTargets(elementId)` checks `map.json` mappings. If the element is mapped:

- A green badge with arrow icon and resolved destination label appears in the metadata row
- The element gets a green left border (`element-mapped` class)

Destination labels are resolved via `#resolveTargetLabel(alias)` — checks top-level fields first, then block properties (displayed as "Block Label > Property Label").

### Empty state

When no sample extraction exists, shows a centered prompt with "Upload PDF" button that opens the media picker and triggers extraction via `triggerSampleExtraction()`.

## Imports

```typescript
import type { ExtractionElement, RichExtractionResult, DocumentTypeConfig } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, saveMapConfig } from './workflow.service.js';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_MEDIA_PICKER_MODAL } from '@umbraco-cms/backoffice/media';
import { UMB_DESTINATION_PICKER_MODAL } from './destination-picker-modal.token.js';
```

## Registered in

- `manifest.ts` — single `workspaceView` registration:
    - `UpDoc.WorkflowWorkspaceView.Source` (weight 200, icon `icon-page-add`)
- Conditioned on `Umb.Condition.WorkspaceAlias` matching `UpDoc.WorkflowWorkspace`

## Used by

- Displayed as the Source tab when viewing an individual workflow in the workflow workspace
