# up-doc-workflow-source-views.element.ts

Workspace views for source type tabs (Pdf, Markdown). Uses a base class pattern to share rendering logic across source types.

## What it does

Displays the source extraction configuration for a specific source type within a workflow. Each source type (pdf, markdown) gets its own workspace view tab that shows the extraction sections, strategies, and parameters defined in the workflow's source config.

## How it works

### Base class: `UpDocWorkflowSourceViewBase`

A shared base class (not exported as a custom element) that:

1. On `connectedCallback`, consumes `UMB_WORKSPACE_CONTEXT` and observes the `unique` value
2. Loads the full workflow config via `fetchWorkflowByName()`
3. Extracts the source config for its `sourceType` from `config.sources[this.sourceType]`
4. Renders the source sections with strategy badges, output format, pages, and strategy parameters

### Subclasses

Two concrete custom elements extend the base class, each overriding `sourceType`:

```typescript
@customElement('up-doc-workflow-pdf-view')
export class UpDocWorkflowPdfViewElement extends UpDocWorkflowSourceViewBase {
    override sourceType = 'pdf';
}

@customElement('up-doc-workflow-markdown-view')
export class UpDocWorkflowMarkdownViewElement extends UpDocWorkflowSourceViewBase {
    override sourceType = 'markdown';
}
```

### Section rendering

Each source section displays:

- **Label** (bold) + **strategy badge** + **Required** tag if applicable
- **Key** (monospace alias) + **output format** + **pages** (if specified)
- **Description** (if present)
- **Strategy parameters** in a monospace code-style block (key: value pairs)

### Global settings

If the source config has `globals.columnDetection`, it's rendered as a header bar showing the detection status and threshold percentage.

## Key concepts

### js + elementName manifest pattern

Because two custom elements are defined in a single module, the manifest uses `js` + `elementName` instead of `element`:

```typescript
{
    type: 'workspaceView',
    js: () => import('./up-doc-workflow-source-views.element.js'),
    elementName: 'up-doc-workflow-markdown-view',
}
```

This tells Umbraco to load the module (which registers both elements) and then use the specified element name.

### Source type as workspace view

Each source type configured in a workflow gets its own top-level workspace view tab (alongside "Destination"). This means a workflow with both pdf and markdown sources will show three tabs: Destination, Markdown, Pdf.

## Imports

```typescript
import type { DocumentTypeConfig, SourceConfig, SourceSection } from './workflow.types.js';
import { fetchWorkflowByName } from './workflow.service.js';
import { html, css, state, nothing, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
```

## Registered in

- `manifest.ts` — two `workspaceView` registrations:
    - `UpDoc.WorkflowWorkspaceView.Markdown` (weight 200, icon `icon-code`)
    - `UpDoc.WorkflowWorkspaceView.Pdf` (weight 100, icon `icon-document`)
- Both conditioned on `Umb.Condition.WorkspaceAlias` matching `UpDoc.WorkflowWorkspace`

## Used by

- Displayed as source type tabs when viewing an individual workflow in the workflow workspace
