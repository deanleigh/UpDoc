# up-doc-workflow-source-view.element.ts

Generic workspace view for the Source tab in the workflow workspace. Dynamically detects the source type from the workflow config.

## What it does

Displays the source extraction configuration for a workflow. The source type (PDF, Markdown, etc.) is detected automatically from the workflow's config rather than being hardcoded per tab. Every workflow workspace shows exactly two tabs: **Source** and **Destination**.

## How it works

### Dynamic source type detection

On load, the component:

1. Consumes `UMB_WORKSPACE_CONTEXT` and observes the `unique` value (workflow name)
2. Loads the full workflow config via `fetchWorkflowByName()`
3. Gets the source type from `Object.keys(config.sources)[0]` — per-source-type workflows have exactly one entry
4. Stores both the source type and source config in state

```typescript
const sourceTypes = Object.keys(config.sources);
if (sourceTypes.length > 0) {
    this._sourceType = sourceTypes[0];
    this._sourceConfig = config.sources[sourceTypes[0]] ?? null;
}
```

### Section rendering

Each source section displays:

- **Label** (bold) + **strategy badge** + **Required** tag if applicable
- **Key** (monospace alias) + **output format** + **pages** (if specified)
- **Description** (if present)
- **Strategy parameters** in a monospace code-style block (key: value pairs)

### Layout pattern

The view wraps all content in `<umb-body-layout header-fit-height>` + `<uui-box headline="Source: PDF">`, matching the destination view pattern. The headline shows the detected source type formatted as a human-readable label (pdf → PDF, markdown → Markdown).

### Global settings

If the source config has `globals.columnDetection`, it's rendered inside the `<uui-box>` as a header bar showing the detection status and threshold percentage.

## Key concepts

### Replaced per-source-type tabs

Previously, each source type had its own workspace view tab (Markdown, Pdf) registered via the `js` + `elementName` manifest pattern. This was replaced with a single generic Source tab because:

- Per-source-type workflows have exactly one source type, making separate tabs redundant
- The Markdown tab was irrelevant when viewing a PDF-only workflow
- A single dynamic component is simpler to maintain

### Old multi-source workflows

For legacy folders with multiple source types (e.g., `group-tour` with both `pdf` and `markdown`), the view shows the first source type. These folders will eventually be migrated to per-source-type format.

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

- `manifest.ts` — single `workspaceView` registration:
    - `UpDoc.WorkflowWorkspaceView.Source` (weight 200, icon `icon-page-add`)
- Conditioned on `Umb.Condition.WorkspaceAlias` matching `UpDoc.WorkflowWorkspace`

## Used by

- Displayed as the Source tab when viewing an individual workflow in the workflow workspace
