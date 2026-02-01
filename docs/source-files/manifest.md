# manifest.ts

Defines all extension manifests that get registered with Umbraco's extension registry.

## What it does

Exports an array of `UmbExtensionManifest` objects that tell Umbraco about our custom extensions:
1. An **entity action** that adds "Create Document from Source" to document context menus
2. A **modal** component for the source selection sidebar
3. A **modal** component for the blueprint picker dialog (interstitial before the sidebar)

## Extension 1: Entity Action

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
    ],
}
```

**Key properties:**
- `type: 'entityAction'` - Adds an action to entity context menus
- `forEntityTypes: ['document']` - Only shows on document nodes
- `weight: 1100` - Controls menu item position (higher = higher in list)
- `api` - Lazy loads the action class when needed
- `conditions` - `Umb.Condition.EntityIsNotTrashed` hides the action for documents in the recycle bin

## Extension 2: Modal

```typescript
{
    type: 'modal',
    alias: 'UpDoc.Modal',
    name: 'UpDoc Modal',
    element: () => import('./up-doc-modal.element.js'),
}
```

**Key properties:**
- `type: 'modal'` - Registers a modal dialog
- `alias` - Must match the token alias in `up-doc-modal.token.ts`
- `element` - Lazy loads the Lit component

## Extension 3: Blueprint Picker Modal

```typescript
{
    type: 'modal',
    alias: 'UpDoc.BlueprintPickerModal',
    name: 'Blueprint Picker Modal',
    element: () => import('./blueprint-picker-modal.element.js'),
}
```

**Key properties:**
- `type: 'modal'` - Registers a modal dialog
- `alias` - Must match the token alias in `blueprint-picker-modal.token.ts`
- `element` - Lazy loads the Lit component
- This is a centered dialog (not a sidebar) that opens before the source sidebar

## Important notes

- All imports use `.js` extension (TypeScript compiles to JS)
- Lazy loading (`() => import()`) improves initial load performance
- The `alias` values must be unique and match corresponding tokens
