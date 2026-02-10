# create-workflow-sidebar.element.ts

Sidebar modal for creating a new UpDoc workflow. Part of a stepped flow: blueprint picker dialog (step 1) then this sidebar (step 2).

## What it does

Provides a sidebar with two tabs for configuring a new workflow:

1. **Source tab** (default) — Workflow name input + source type dropdown + conditional file picker for a sample document
2. **Destination tab** — Read-only display of the selected document type and blueprint

## How it works

1. Receives document type and blueprint details as modal data (passed from the blueprint picker dialog)
2. User selects a source type from the dropdown (PDF, Markdown, Web Page, Word Document)
3. Workflow name auto-generates as `{kebab-case-blueprint-name}-{sourceType}` (user can override)
4. Conditional source-specific UI appears below the dropdown:
   - **PDF** — `umb-input-media` picker for a sample PDF document
   - **Markdown** — `umb-input-media` picker for a sample Markdown file
   - **Web** — URL text input for a sample web page
   - **Word Document** — `umb-input-media` picker for a sample Word document
5. On submit, returns `CreateWorkflowSidebarValue` with name, sourceType, mediaUnique, sourceUrl, documentTypeAlias, blueprintId, and blueprintName

## UI states

- **Default**: Source tab active, workflow name empty, source type unselected, Create button disabled
- **Source selected**: Conditional picker appears below dropdown, workflow name auto-generated
- **Ready**: Name is non-empty and source type is selected — Create button enabled
- **Destination tab**: Read-only view of document type icon + name, blueprint icon + name

## Key behaviours

- Workflow name auto-generation uses `toKebabCase()` on the blueprint name plus the source type suffix
- Once the user manually edits the name, auto-generation stops (tracked by `_nameManuallyEdited` flag)
- Changing source type clears the media selection and URL (prevents stale references)
- File pickers use `umb-property-layout` with `description` attribute for hint text (native Umbraco pattern)
- Create button requires both name and source type; media/URL selection is optional

## Tabs

Uses `uui-tab-group` in the `navigation` slot of `umb-body-layout`:

- **Source** — `icon-page-add` icon
- **Destination** — `icon-document` icon

Text content must be placed inside the `<uui-tab>` element (not just the `label` attribute) for visible rendering inside `umb-body-layout`.

## Registered in

- `manifest.ts` — registered as a `modal` with alias `UpDoc.CreateWorkflowSidebar`

## Used by

- Opened from `up-doc-workflows-view.element.ts` as step 2 of the "Create Workflow" flow (after the blueprint picker dialog)
