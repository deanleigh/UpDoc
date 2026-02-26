# uSync Content Migration: UpDoc Test Site to Client Site

## Context

The UpDoc test site (`src/UpDoc.TestSite/`) serves as the dev environment for both the UpDoc package and the client's actual site. Document types, templates, block grids, blueprints, and content built here are the same ones deployed to the client's production site via uSync.

## Validated Workflow (Feb 2026)

Successfully tested full import from UpDoc test site into a fresh UmBootstrap-based site.

### Import Order (Critical)

1. **Copy .cshtml files first** — templates, partial views, stylesheets, scripts into `Views/` folder. uSync only exports template database records, not physical files. Must be in place before first boot or template imports fail, which cascades to dependent content types.
2. **Copy media files** — `wwwroot/media/` folder. uSync exports metadata only.
3. **Run first boot** — complete Umbraco install wizard on clean database.
4. **Single-pass uSync import** — import everything in one shot. Do NOT do partial imports.

### Blueprint Issue

Blueprints proved problematic during import. Importing in multiple passes causes `UNIQUE constraint failed: umbracoNode.uniqueId` errors — blueprint GUIDs clash with orphaned database records from failed/partial imports. Must be a clean single-pass import.

**UpDoc implication:** Workflow `destination.json` references `blueprintId` (GUID). If a blueprint gets a different GUID on the target site, the workflow points to the wrong blueprint. As long as the import is a clean single-pass from the same source, GUIDs are preserved.

### Starting Over After Failed Import

1. Stop the site
2. Delete SQLite database from `umbraco/Data/`
3. Remove connection string from `appsettings.json`
4. Restart — Umbraco returns to Install mode
5. Re-run wizard and reimport

### Running Multiple Sites Simultaneously

Umbraco auth cookies share the same name (`UMB_UCONTEXT`) by default. Running two sites on different localhost ports causes login conflicts.

**Fix:** Set unique cookie names in each site's `appsettings.json`:

```json
{
  "Umbraco": {
    "CMS": {
      "Security": {
        "AuthCookieName": "UMB_UCONTEXT_UPDOC"
      }
    }
  }
}
```

## What Transfers via uSync

| Item | uSync Exports | Manual Copy Needed |
|------|:---:|:---:|
| Document types / compositions | Yes | - |
| Data types (Block Grid configs) | Yes | - |
| Element types | Yes | - |
| Content nodes | Yes | - |
| Blueprints | Yes (fragile) | - |
| Template definitions | Yes | .cshtml files |
| Partial views | No | .cshtml files |
| Media metadata | Yes | Physical files |
| Stylesheets / scripts | No | Yes |

## What Does NOT Transfer

- **UpDoc workflow files** (`updoc/workflows/`) — these are custom JSON files outside Umbraco's content system. Must be copied manually or version-controlled.
- **UpDoc package itself** — add as NuGet/project reference separately.
