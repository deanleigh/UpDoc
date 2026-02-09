# up-doc-workflows-view.element.ts

Dashboard view element that lists and manages UpDoc workflows. Displayed in the Settings section under the UpDoc tree.

## What it does

Provides a table-based UI for viewing all configured workflows, creating new ones, and deleting existing ones. Each workflow represents a complete pipeline from source extraction to document creation.

## How it works

1. On `connectedCallback`, fetches all workflows from the `/umbraco/management/api/v1/updoc/workflows` API
2. Renders workflows in a `uui-table` with columns for name, document type, blueprint, sources, mappings, and status
3. Shows an empty state with explanation text when no workflows exist
4. "Create Workflow" button opens `UMB_CREATE_WORKFLOW_MODAL` and POSTs the result to the API
5. Clicking a workflow row navigates to the workflow workspace page via `history.pushState`
6. "Delete" button shows a `UMB_CONFIRM_MODAL` confirmation dialog, then DELETEs the workflow and clears the client-side config cache

## UI states

- **Loading**: Shows `uui-loader-bar`
- **Error**: Shows error message with "Retry" button
- **Empty**: Shows explanatory text and "Create Workflow" button
- **Populated**: Shows workflow table with "Create Workflow" button above

## Key concepts

### WorkflowSummary interface

The component consumes a `WorkflowSummary` interface from the API:

```typescript
interface WorkflowSummary {
    name: string;
    documentTypeAlias: string;
    blueprintId: string | null;
    blueprintName: string | null;
    sourceTypes: string[];
    mappingCount: number;
    isComplete: boolean;
    validationWarnings: string[];
}
```

### Workflow navigation

Clicking a workflow row navigates to the workflow workspace page using client-side routing:

```typescript
#handleViewWorkflow(workflow: WorkflowSummary) {
    const encodedName = encodeURIComponent(workflow.name);
    window.history.pushState({}, '', `section/settings/workspace/updoc-workflow/edit/${encodedName}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
}
```

The URL follows Umbraco's routable workspace pattern: `section/{section}/workspace/{entityType}/edit/{unique}`. The `popstate` event triggers Umbraco's router to handle the navigation.

### Cache invalidation on delete

After deleting a workflow, calls `clearConfigCache()` from `workflow.service.ts` to ensure the `UpDoc.Condition.HasAvailableWorkflows` condition re-evaluates. Without this, the entity action would remain visible for nodes whose workflows were just deleted.

### Authentication

All API calls use `UMB_AUTH_CONTEXT` to obtain a bearer token for the Management API.

## Imports

```typescript
import { html, css, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_MODAL_MANAGER_CONTEXT, UMB_CONFIRM_MODAL } from '@umbraco-cms/backoffice/modal';
import { UMB_CREATE_WORKFLOW_MODAL } from './create-workflow-modal.token.js';
import { clearConfigCache } from './workflow.service.js';
```

## Registered in

- `manifest.ts` -- registered as a `sectionView` with alias `UpDoc.SectionView.Workflows`

## Used by

- Displayed in the UpDoc settings section when navigating to the Workflows view
