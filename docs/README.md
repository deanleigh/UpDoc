# Create Document from PDF - Umbraco Extension

## Intro

- **What it does**: Allows editors to create Umbraco content documents by uploading a PDF and extracting its content
- **The problem it solves**: Manual copy/paste from PDFs into Umbraco is tedious and error-prone
- **How it works**: Adds a "Create from PDF" option to the content tree context menu, opens a sidebar panel, processes the PDF, and creates a new document
- **Target users**: Umbraco content editors
- **Tech stack**: Umbraco 14+, Lit components, backend API for PDF processing

## Troubleshooting

### Distributed cache error on startup

If you see `DISTRIBUTED CACHE IS NOT UPDATED. Failed to execute instructions` in the Umbraco log on startup, clear the stale cache instructions from the SQLite database:

```sql
DELETE FROM umbracoCacheInstruction;
```

Open `umbraco/Data/Umbraco.sqlite.db` in DB Browser for SQLite, run the query under **Execute SQL**, then click **Write Changes**. Restart the site.

This happens when the site is stopped while cache instructions are still being processed (common during development). It's harmless on a single-instance dev setup but will log errors on every startup until cleared.
