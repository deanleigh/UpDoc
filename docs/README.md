# UpDoc - Umbraco Extension

## Intro

- **What it does**: Allows editors to create Umbraco content documents by extracting content from source files (PDF, Web Page, Word Document)
- **The problem it solves**: Manual copy/paste from source documents into Umbraco is tedious and error-prone
- **How it works**: Adds a "Create Document from Source" option to the content tree context menu, opens a blueprint picker dialog, then a sidebar panel where the user selects a source, processes the content, and creates a new document
- **Target users**: Umbraco content editors
- **Tech stack**: Umbraco 17+, Lit components, backend API for content extraction
- **Package type**: Razor Class Library (RCL) — installable via NuGet in any Umbraco project

## Project Structure

- `src/UpDoc/` — The Razor Class Library (the installable package)
- `src/UpDoc.TestSite/` — Development/testing host site

## Troubleshooting

### Distributed cache error on startup

If you see `DISTRIBUTED CACHE IS NOT UPDATED. Failed to execute instructions` in the Umbraco log on startup, clear the stale cache instructions from the SQLite database:

```sql
DELETE FROM umbracoCacheInstruction;
```

Open `umbraco/Data/Umbraco.sqlite.db` in DB Browser for SQLite, run the query under **Execute SQL**, then click **Write Changes**. Restart the site.

This happens when the site is stopped while cache instructions are still being processed (common during development). It's harmless on a single-instance dev setup but will log errors on every startup until cleared.
