# Claude Instructions

## Documentation Requirements

When modifying any file in `App_Plugins/CreateFromPdf/src/`, update the corresponding documentation in `docs/source-files/`:

| Source File | Documentation File |
|-------------|-------------------|
| index.ts | docs/source-files/index.md |
| manifest.ts | docs/source-files/manifest.md |
| create-from-pdf-action.ts | docs/source-files/create-from-pdf-action.md |
| create-from-pdf-modal.element.ts | docs/source-files/create-from-pdf-modal-element.md |
| create-from-pdf-modal.token.ts | docs/source-files/create-from-pdf-modal-token.md |

If adding a new source file:
1. Create corresponding `.md` file in `docs/source-files/`
2. Add entry to `docs/SUMMARY.md`

## GitBook

Documentation is synced to GitBook from the `docs/` folder. Changes to docs require push to trigger sync.

## Build

After changing TypeScript files, rebuild with:
```
cd App_Plugins/CreateFromPdf && npm run build
```
