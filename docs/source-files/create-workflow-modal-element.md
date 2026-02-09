# create-workflow-modal.element.ts

Dialog modal for creating a new UpDoc workflow. Replaces the previous manual text input form with document type and blueprint pickers.

## What it does

Provides a three-step form for creating a workflow:

1. **Document Type** picker — `<uui-select>` dropdown populated from the UpDoc API, listing all non-element document types
2. **Blueprint** picker — `<uui-select>` dropdown filtered to blueprints for the selected document type
3. **Workflow Name** — text input, auto-generated as kebab-case from the blueprint name, user can override

## How it works

1. On `connectedCallback`, fetches all document types from `GET /umbraco/management/api/v1/updoc/document-types`
2. When a document type is selected, fetches its blueprints from `GET /umbraco/management/api/v1/updoc/document-types/{alias}/blueprints`
3. When a blueprint is selected, auto-generates workflow name from blueprint name (e.g. "Group Tour" → "group-tour")
4. On submit, returns `CreateWorkflowModalValue` with name, documentTypeAlias, blueprintId, and blueprintName

## UI states

- **Loading doc types**: Shows `uui-loader-bar`
- **No doc types**: Shows error message
- **Blueprint disabled**: Shows "Select a document type first..." placeholder
- **Loading blueprints**: Shows `uui-loader-bar`
- **No blueprints**: Shows disabled select with warning to create a blueprint first
- **Ready**: All three fields populated, Create button enabled

## Key behaviours

- Changing document type clears the blueprint selection and reloads blueprint options
- Blueprint ID is captured behind the scenes, not shown to the user
- Create button requires all three fields: document type, blueprint, and workflow name
- Workflow name auto-generation can be overridden; once manually edited, it stays manual

## Authentication

All API calls use `UMB_AUTH_CONTEXT` to obtain a bearer token for the Management API.

## Registered in

- `manifest.ts` — registered as a `modal` with alias `UpDoc.CreateWorkflowModal`

## Used by

- Opened from `up-doc-workflows-view.element.ts` via the "Create Workflow" button
