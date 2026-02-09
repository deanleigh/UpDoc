# manifest.ts

Defines all extension manifests that get registered with Umbraco's extension registry.

## What it does

Exports an array of `UmbExtensionManifest` objects that tell Umbraco about our custom extensions:

1. An **entity action** that adds "Create Document from Source" to document context menus
2. A **condition** that controls when the entity action is visible
3. **Modals** for the source selection sidebar, blueprint picker, and workflow creation
4. A **settings sidebar** with tree and workspace for the UpDoc dashboard

## Entity Action

```typescript
{
    type: 'entityAction',
    kind: 'default',
    alias: 'UpDoc.EntityAction',
    name: 'UpDoc Entity Action',
    weight: 1100,
    api: () => import('./up-doc-action.js'),
    forEntityTypes: ['document'],
    meta: {
        icon: 'icon-document',
        label: 'Create Document from Source',
    },
    conditions: [
        {
            alias: 'Umb.Condition.EntityIsNotTrashed',
        },
        {
            alias: 'UpDoc.Condition.HasAvailableWorkflows',
        },
    ],
}
```

**Key properties:**
- `type: 'entityAction'` - Adds an action to entity context menus
- `forEntityTypes: ['document']` - Only shows on document nodes
- `weight: 1100` - Controls menu item position (higher = higher in list)
- `api` - Lazy loads the action class when needed
- `conditions` - Two conditions must both pass (AND logic):
    - `Umb.Condition.EntityIsNotTrashed` - hides the action for documents in the recycle bin
    - `UpDoc.Condition.HasAvailableWorkflows` - per-node check: hides the action unless the node's allowed child types have blueprints with complete workflows

## Condition: HasAvailableWorkflows

```typescript
{
    type: 'condition',
    alias: 'UpDoc.Condition.HasAvailableWorkflows',
    name: 'Has Available Workflows',
    api: () => import('./up-doc-has-workflows.condition.js'),
}
```

Registers the custom condition class. This is a **per-node check** -- it uses `UMB_ENTITY_CONTEXT` to get the current node, looks up its allowed child types, and checks whether any of them have blueprints with complete workflows. The entity action only appears on nodes where "Create Document from Source" would actually work.

See [up-doc-has-workflows.condition.ts](up-doc-has-workflows-condition.md) for implementation details.

## Modals

```typescript
{
    type: 'modal',
    alias: 'UpDoc.Modal',
    name: 'UpDoc Modal',
    element: () => import('./up-doc-modal.element.js'),
}
```

```typescript
{
    type: 'modal',
    alias: 'UpDoc.BlueprintPickerModal',
    name: 'Blueprint Picker Modal',
    element: () => import('./blueprint-picker-modal.element.js'),
}
```

```typescript
{
    type: 'modal',
    alias: 'UpDoc.CreateWorkflowModal',
    name: 'Create Workflow Modal',
    element: () => import('./create-workflow-modal.element.js'),
}
```

**Key properties:**
- `type: 'modal'` - Registers a modal dialog
- `alias` - Must match the token alias in the corresponding `.token.ts` file
- `element` - Lazy loads the Lit component

## Settings Sidebar, Tree, and Workspace

The remaining manifests register the UpDoc dashboard in the Settings section:

- **`sectionSidebarApp`** - Adds "UpDoc" menu to the Settings sidebar
- **`menu`** + **`menuItem`** - Tree-based menu with `hideTreeRoot: true`
- **`repository`** + **`tree`** + **`treeItem`** - Data source for workflow tree items
- **`workspace`** (`kind: 'routable'`) - Right panel with tabs for editing workflows
- **`workspaceView`** (x3) - Tabs: Workflows, Configuration, About

## Important notes

- All imports use `.js` extension (TypeScript compiles to JS)
- Lazy loading (`() => import()`) improves initial load performance
- The `alias` values must be unique and match corresponding tokens
- Conditions use AND logic — all must pass for the extension to appear
