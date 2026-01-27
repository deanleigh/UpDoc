# Claude Instructions

## Umbraco Skills Marketplace

This project uses the Umbraco Skills Marketplace for Claude Code. When working on Umbraco backoffice customizations, use the available skills for guidance on extension types, patterns, and testing.

**Required plugins:**
- `umbraco-cms-backoffice-skills` - 57 skills for backoffice extensions
- `umbraco-cms-backoffice-testing-skills` - 8 skills for testing

**To install (if not already installed):**
```bash
/plugin marketplace add umbraco/Umbraco-CMS-Backoffice-Skills
/plugin install umbraco-cms-backoffice-skills@umbraco-backoffice-marketplace
/plugin install umbraco-cms-backoffice-testing-skills@umbraco-backoffice-marketplace
```

**When to use skills:**
- Before implementing any Umbraco backoffice extension, invoke the relevant skill (e.g., `/umbraco-entity-actions`, `/umbraco-modals`, `/umbraco-dashboard`)
- For testing, use `/umbraco-testing` to choose the right testing approach
- Skills provide official docs, patterns, and working examples

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
