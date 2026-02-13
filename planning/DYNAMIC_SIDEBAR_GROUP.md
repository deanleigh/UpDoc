# Dynamic Sidebar Group Detection

## Status: Future Improvement

## Current Implementation

UpDoc hardcodes `usync.menu` as the target menu alias to appear under uSync's "Synchronisation" group in the Settings sidebar. A fallback condition (`UpDoc.Condition.UsyncNotInstalled`) creates UpDoc's own "Synchronisation" group when uSync is not installed.

**Files:**
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/manifest.ts` — menuItem with `menus: ['usync.menu', 'UpDoc.Menu']`
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-usync-fallback.condition.ts` — condition checking for `usync.menu`

## Problem

The current approach couples UpDoc to uSync's specific menu alias. This breaks if:
- uSync changes their alias in a future version
- Another package (not uSync) creates the "Synchronisation" group
- Multiple packages want to share the same group without knowing each other's aliases

## Proposed Solution

Instead of hardcoding `usync.menu`, dynamically discover any existing "Synchronisation" sidebar group at runtime.

### Approach: Programmatic Registration in Entry Point

Move sidebar registration from static manifests to the entry point (`index.ts`), using the extension registry:

1. Observe all `sectionSidebarApp` extensions in the registry
2. Find one with `meta.label === 'Synchronisation'` (or its localization key)
3. Read its `meta.menu` alias (could be `usync.menu`, `someOtherPackage.menu`, anything)
4. Dynamically register UpDoc's `menuItem` targeting the discovered menu alias
5. If no "Synchronisation" group found, register UpDoc's own `sectionSidebarApp` + `menu` + `menuItem`

### Considerations

- **Timing**: Other packages' manifests need to be registered before UpDoc queries the registry. Entry points all run during boot, so order isn't guaranteed. Using an observable subscription handles this — when the "Synchronisation" sidebarApp appears, we react.
- **Dynamic registration**: `umbExtensionsRegistry.register()` and `umbExtensionsRegistry.unregister()` would be needed to swap between "joined" and "standalone" modes.
- **Localization**: The label might be a localization key (e.g., `#general_synchronisation`) rather than a plain string. Need to handle both.
- **Multiple matches**: If two packages both create a "Synchronisation" group, which one do we join? First one found? Highest weight?

### Sketch

```typescript
// In index.ts or entry point
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

let registeredAlias: string | null = null;

umbExtensionsRegistry.byType('sectionSidebarApp').subscribe((apps) => {
    const syncApp = apps.find(a =>
        a.alias !== 'UpDoc.SidebarApp' &&
        (a.meta?.label === 'Synchronisation' || a.meta?.label === '#general_synchronisation')
    );

    if (syncApp?.meta?.menu && !registeredAlias) {
        // Join existing group
        registeredAlias = syncApp.meta.menu;
        umbExtensionsRegistry.register({
            type: 'menuItem',
            kind: 'tree',
            alias: 'UpDoc.MenuItem.Tree',
            name: 'UpDoc Menu Item',
            meta: {
                treeAlias: 'UpDoc.Tree',
                menus: [registeredAlias],
                hideTreeRoot: true,
            },
        });
    } else if (!syncApp && !registeredAlias) {
        // Create own group
        registeredAlias = 'UpDoc.Menu';
        umbExtensionsRegistry.register(/* own sectionSidebarApp + menu + menuItem */);
    }
});
```

## Priority

Low — the hardcoded `usync.menu` approach works for all current use cases. This becomes relevant if:
- UpDoc is distributed as a standalone NuGet package (without uSync dependency)
- Other Umbraco packages adopt a shared "Synchronisation" group convention
- uSync changes their internal alias
