# UpDoc

An Umbraco extension for creating content documents by extracting content from source files (PDF, Web Page, Word Document).

[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://deanleigh.github.io/UpDoc/)

## What it does

- Adds a "Create Document from Source" option to the content tree context menu
- Opens a blueprint picker dialog, then a sidebar panel
- User selects a source, processes the content, and creates a new document
- Eliminates manual copy/paste from source documents into Umbraco

## Installation

```bash
dotnet add package UpDoc
```

## Documentation

Full documentation available at **[deanleigh.github.io/UpDoc](https://deanleigh.github.io/UpDoc/)**

## Project Structure

- `src/UpDoc/` — The Razor Class Library (the installable NuGet package)
- `src/UpDoc.TestSite/` — Development/testing host site
- `docs/` — Documentation source (MkDocs)

## Requirements

- Umbraco 17+

## License

MIT
