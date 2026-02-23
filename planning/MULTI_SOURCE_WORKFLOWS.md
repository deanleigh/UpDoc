# Plan: Multi-Source Workflows

## Status: NEXT UP

## Purpose

Validate UpDoc's architecture across multiple source types (Markdown, Web, PDF) and identify shared vs source-specific functionality. The PDF workflow is 80% complete. Before polishing it further, we build Markdown and Web workflows to discover what's truly common.

---

## The Source Difficulty Spectrum

From `CORE_CONCEPT.md` — all sources end up as Markdown, but differ in extraction effort:

| Source | Difficulty | Why |
|--------|-----------|-----|
| **Markdown** | None | Already Markdown. Nothing to convert. |
| **Word** | Low | Styles carry structure. Heading 1 = `#`, Heading 2 = `##`. |
| **Web page** | Medium | HTML is semi-structured. `<h2>` = `##`, `<p>` = paragraph. Needs cleaning (nav, ads, footers). |
| **PDF** | Hard | No structure at all. Raw positioned text with font metadata. Rules reconstruct structure. |

---

## Strategy: Build Simplest First

| Phase | Source | What we learn |
|-------|--------|---------------|
| **Phase 1** | Markdown | Validates shared pipeline (transform → map → create) with zero extraction complexity |
| **Phase 2** | Web (HTML) | Second real use case. Reveals what's shared vs source-specific in the UI and backend |
| **Phase 3** | Polish PDF | Apply shared patterns discovered in Phases 1-2 back to the PDF workflow |

**Rationale:** Building across source types will naturally surface common functionality. The PDF workflow was built first so everything is entangled — building Markdown and Web workflows forces separation.

---

## Phase 1: Markdown Workflow

### What already exists

- **`MarkdownExtractionService.cs`** — C# service that extracts sections from Markdown files using heading-based splitting. Tested and working.
- **Pipeline code** — the Extract → Shape → Map pipeline is source-agnostic in principle
- **No workflow folder** — there's no `updoc/workflows/markdown-*` folder with config files yet

### What needs doing

1. **Create a simple blueprint** — a standard Content Page in the Umbraco test site (not the complex tour document types). Something with: Page Title, Page Description, and a Rich Text content area.

2. **Create workflow folder** — `updoc/workflows/content-page-markdown/` with:
   - `source.json` — source type: markdown, media picker config
   - `destination.json` — auto-populated from the Content Page blueprint
   - `map.json` — section-to-field mappings
   - `transform.json` — minimal (Markdown already has structure)

3. **Wire up the UI** — the "Create from Source" flow should detect source type from the workflow config and offer Markdown-specific options (file picker instead of PDF picker, no page selection needed, no area editor needed)

4. **Test end-to-end** — upload a `.md` file, extract sections, map to blueprint fields, create document

### What we expect to discover

- Which UI components are truly source-agnostic vs PDF-specific
- Whether the transform layer (rules) is needed at all for structured sources
- Whether `destination.json` and `map.json` formats work unchanged across source types
- Whether the bridge code needs source-type branching or is already generic

---

## Phase 2: Web (HTML) Workflow

### Context

Group Tours on the Tailored Travels site come from the OLD website (~20 years). These need importing via web page extraction. The web page has structured HTML that can be scraped with AngleSharp.

### What already exists

- **AngleSharp** — chosen as the HTML parsing library (not Playwright for extraction)
- **No extraction service yet** — `WebExtractionService.cs` doesn't exist
- **No workflow folder** — no `updoc/workflows/group-tour-web/`

### What needs doing

1. **Create `WebExtractionService.cs`** — AngleSharp-based HTML extraction
   - Accept a URL or HTML content
   - Extract sections based on CSS selectors or heading structure
   - Return the same `ExtractionResult` format as PDF and Markdown

2. **Create workflow folder** — `updoc/workflows/group-tour-web/` with:
   - `source.json` — source type: web, URL input config
   - `destination.json` — same Group Tour blueprint structure
   - `map.json` — section-to-field mappings (same destination, different source)
   - `transform.json` — web-specific transforms if needed

3. **Design the UI** — URL input instead of media picker, page preview showing fetched content, section extraction preview

4. **Identify shared components** — what can be shared with PDF workflow:
   - Blueprint picker (identical)
   - Destination tab (identical)
   - Map tab (identical)
   - Transform/rules (may differ — web has structure, PDF doesn't)
   - Source tab (source-specific)

### What we expect to discover

- How much of the source tab is source-specific vs generic
- Whether web extraction needs rules at all (HTML has structure)
- What shared components can be extracted as reusable elements
- The right abstraction boundary between source-specific and shared code

---

## Phase 3: Polish PDF with Shared Patterns

After Phases 1-2 reveal the common functionality:

1. **Refactor shared components** — extract anything used by 2+ source types into shared modules
2. **Simplify PDF workflow** — remove PDF-specific hacks that should be handled by shared infrastructure
3. **Update the bordered-box layout** — apply learnings from how Markdown and Web content renders
4. **Fix remaining Tailored Tours issues** — the 20% that's not working

---

## Common Functionality (To Identify)

This section will be updated as we build Phases 1-2. Initial hypotheses:

### Likely shared (same across all source types)

- Blueprint picker modal
- Destination tab (shows blueprint structure)
- Map tab (shows source → destination mappings)
- `destination.json` format
- `map.json` format
- Document creation (scaffold from blueprint, populate fields)
- `stripMarkdown()` for text/textArea fields

### Likely source-specific

- Source tab UI (media picker vs URL input vs file picker)
- Extraction services (PDF/Markdown/Web each have their own)
- `source.json` format (different config per source type)
- Transform rules (PDF needs them, Markdown and Web may not)
- Area editor (PDF only)
- Page picker (PDF only)

### Unknown until tested

- Transform tab — needed for all source types or just PDF?
- Section rules editor — needed for all or just PDF?
- How the Extracted tab renders across source types
- Whether the config toolbar (Source, Pages, Areas, Sections cards) adapts or needs source-specific versions

---

## Architecture Validation

From `REFACTOR_TO_CONFIGURABLE.md`:

> **Do not finalize the schema structure until at least one additional source type is implemented.**

This validation step was planned from the beginning. We're now doing it. The current JSON schemas (`source.json`, `destination.json`, `map.json`) may need revision once we see how they hold up across Markdown and Web source types.

Key question from the original planning:

> **Validation needed:** Implement additional source types (Word, Markdown, Web) to stress-test the architecture and discover:
> - What's truly common across all sources
> - What's source-specific
> - Where the schema is too rigid
> - Where it's too loose

---

## References

- [CORE_CONCEPT.md](CORE_CONCEPT.md) — "Any Source → Markdown → Pick Pieces → Map to CMS Fields"
- [REFACTOR_TO_CONFIGURABLE.md](REFACTOR_TO_CONFIGURABLE.md) — original multi-source architecture plan
- [DESTINATION_DRIVEN_MAPPING.md](DESTINATION_DRIVEN_MAPPING.md) — bidirectional mapping workspace
- `MarkdownExtractionService.cs` — existing Markdown extraction service
