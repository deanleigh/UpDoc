# up-doc-workflow-map-view.element.ts

Workspace view for the Map tab of a workflow. Displays all source-to-destination mappings from `map.json` in a table format.

## What it does

Renders the current mapping configuration — showing which source extraction elements are wired to which destination fields. Provides a visual overview of all mappings and allows deletion of individual mappings.

## How it works

1. On `connectedCallback`, consumes `UMB_WORKSPACE_CONTEXT` and observes the `unique` value
2. When `unique` changes, calls `fetchWorkflowByName()` to load the workflow configuration (includes map.json)
3. Also loads the sample extraction via `fetchSampleExtraction()` to resolve source element IDs to text previews
4. Renders mappings as table rows with source, arrow, destination, and actions columns
5. Delete button removes a mapping and saves via `saveMapConfig()` PUT endpoint

### Empty state

When no mappings exist, shows a centred message: "No mappings yet. Use the Source tab to map extracted content to destination fields."

### Mapping row rendering

Each row displays:

- **Source**: Element ID (monospace) + text preview (truncated to 60 chars)
- **Arrow**: Visual indicator
- **Destination**: Resolved field label (from destination.json), with block path for block properties
- **Actions**: Disabled badge (if mapping disabled) + delete button

### Label resolution

- **Destination labels**: Resolved from `destination.json` — checks top-level fields first, then block properties (displayed as "Block Label > Property Label")
- **Source text**: Resolved from `sample-extraction.json` by matching element ID

## Imports

```typescript
import type { DocumentTypeConfig, SectionMapping, DestinationField, BlockProperty, RichExtractionResult, ExtractionElement } from './workflow.types.js';
import { fetchWorkflowByName, fetchSampleExtraction, saveMapConfig } from './workflow.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
```

## Registered in

- `manifest.ts` — registered as a `workspaceView` with alias `UpDoc.WorkflowWorkspaceView.Map`, weight 100 (rightmost tab)
- Conditioned on `Umb.Condition.WorkspaceAlias` matching `UpDoc.WorkflowWorkspace`

## Used by

- Displayed as the "Map" tab when viewing an individual workflow in the workflow workspace
