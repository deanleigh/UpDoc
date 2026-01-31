# manifest.ts

Defines all extension manifests that get registered with Umbraco's extension registry.

## What it does

Exports an array of `UmbExtensionManifest` objects that tell Umbraco about our custom extensions:
1. An **entity action** that adds "Create Document from Source" to document context menus
2. A **modal** component for the source selection sidebar

## Extension 1: Entity Action

```typescript
{
    type: 'entityAction',
    kind: 'default',
    alias: 'CreateFromPdf.EntityAction',
    name: 'Create from PDF Entity Action',
    weight: 1100,
    api: () => import('./create-from-pdf-action.js'),
    forEntityTypes: ['document'],
    meta: {
        icon: 'icon-document',
        label: 'Create Document from Source',
    },
}
```

**Key properties:**
- `type: 'entityAction'` - Adds an action to entity context menus
- `forEntityTypes: ['document']` - Only shows on document nodes
- `weight: 1100` - Controls menu item position (higher = higher in list)
- `api` - Lazy loads the action class when needed

## Extension 2: Modal

```typescript
{
    type: 'modal',
    alias: 'CreateFromPdf.Modal',
    name: 'Create from PDF Modal',
    element: () => import('./create-from-pdf-modal.element.js'),
}
```

**Key properties:**
- `type: 'modal'` - Registers a modal dialog
- `alias` - Must match the token alias in `create-from-pdf-modal.token.ts`
- `element` - Lazy loads the Lit component

## Important notes

- All imports use `.js` extension (TypeScript compiles to JS)
- Lazy loading (`() => import()`) improves initial load performance
- The `alias` values must be unique and match corresponding tokens
