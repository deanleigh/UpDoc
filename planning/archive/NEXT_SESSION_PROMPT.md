# Next Session: Markdown Workflow (Phase 1)

## What we're doing

Building the first non-PDF workflow to validate UpDoc's multi-source architecture. See `planning/MULTI_SOURCE_WORKFLOWS.md` for the full plan.

## Immediate task

Create a minimal "Article" or "Content Page" document type and blueprint in the Umbraco test site, then wire up the markdown workflow end-to-end.

### Step 1: Create the document type + blueprint (manual, in Umbraco)

The user needs to create a simple document type in the test site with:
- Page Title (textstring)
- Page Description (textarea)
- Body content (rich text editor or block grid with one rich text block)

Then create a **blueprint** from it with sample content populated.

### Step 2: Create workflow folder

`updoc/workflows/article-markdown/` (or whatever the doc type ends up being called) with:
- `source.json` — source type: markdown
- `destination.json` — auto-populated from the blueprint
- `map.json` — section-to-field mappings

### Step 3: Wire up the UI

The "Create from Source" flow needs to handle markdown source type:
- File picker instead of PDF media picker
- No page selection (markdown has no pages)
- No area editor (markdown has no areas)
- Extraction preview should still work

### Step 4: Test end-to-end

Upload a `.md` file → extract sections → map to blueprint fields → create document.

## Key files to read at session start

Per CLAUDE.md mandatory startup:
1. `planning/REFACTOR_TO_CONFIGURABLE.md`
2. `planning/CREATE_FROM_SOURCE_SIDEBAR.md`
3. `planning/CREATE_FROM_SOURCE_UI.md`
4. `planning/DESTINATION_DRIVEN_MAPPING.md`

Plus:
5. `planning/MULTI_SOURCE_WORKFLOWS.md` — the plan for this work

## What was accomplished this session

- MkDocs nav: removed `navigation.expand` and `navigation.sections` for collapsible sidebar
- Created Tooling docs section (10 pages): Figma, Claude, Playwright, Umbraco Skills
- Figma MCP investigation: bidirectional = page capture not element editing, validated targeted node screenshots (node `16:1141`), identified `claude-talk-to-figma-mcp` for future element-level editing
- Created `planning/MULTI_SOURCE_WORKFLOWS.md` — Markdown → Web → Polish PDF sequence
- Archived 4 completed planning docs (RULE_MATCHING_TOLERANCE, PLAYWRIGHT_TESTING, RECURSIVE_XY_CUT_PLAN, PDFPIG_DLA_SPIKE_RESULTS)

## Branch

Work on `main` or create `feature/markdown-workflow` — ask the user.
