# Plan: Multi-Source Workflows

## Status: Phase 1 COMPLETE, Phase 2 NEXT

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

## Phase 1: Markdown Workflow — COMPLETE

**Branch:** `feature/markdown-workflow` → merged to main (commit `3a8d216`, Feb 2026)

### What was built

- **`MarkdownExtractionService.ExtractRich()`** — parses markdown into `RichExtractionResult` with heading/body elements and synthetic font metadata (`heading-1`, `heading-2`, etc.)
- **Source-type-aware `TransformAdhoc` endpoint** — checks `sourceConfig.SourceTypes` and routes to markdown or PDF extraction accordingly
- **`ConvertMarkdownToTransformResult()`** — groups elements by heading into `TransformedSection` objects with kebab-case IDs
- **Simplified Source tab** — non-PDF workflows get a streamlined view (no areas, pages, or transform UI)
- **Test workflow** — `updoc/workflows/Test Basic Markdown/` with source.json, destination.json, map.json, sample-extraction.json
- **Blueprint** — "Test Basic Markdown" under existing Web Page document type

### What we discovered

- **Source tab is ~70% source-specific**: PDF needs areas, pages, rules, transform preview. Markdown/HTML just need element list + file picker. The `#sourceType` getter cleanly branches rendering.
- **Transform layer not needed for structured sources**: Markdown's heading-based grouping is sufficient — no rules editor required. The `ConvertMarkdownToTransformResult()` helper produces the same `TransformResult` shape that PDF's full pipeline does.
- **`destination.json` and `map.json` formats work unchanged**: Same document type (Web Page) works for both PDF and markdown workflows. Zero format changes needed.
- **Bridge code is already generic**: `up-doc-modal.element.ts`, `up-doc-collection-action.element.ts`, and `up-doc-action.ts` all work unchanged — they consume `TransformResult` and don't care about source type.
- **Frontend needed zero changes for Create from Source flow**: Only the Source tab (workflow editor in Settings) needed source-type branching. The Content section modal was already source-agnostic.
- **Mapping rules still needed even for structured sources**: "Put everything under this heading until the next heading into this field" is the same conceptual rule pattern as PDF. Parked for after all three source types are built.

---

## Phase 2: Web (HTML) Workflow — NEXT

### Context

Group Tours on the Tailored Travels site come from the OLD website (~20 years). These need importing via web page extraction. The web page has structured HTML that can be scraped with AngleSharp.

### Validation (Feb 2026)

Tested https://www.tailored-travel.co.uk/norfolk — **all tab content is in raw HTML**. The site uses JavaScript show/hide tabs, but content is in the DOM from page load. AngleSharp will see everything:
- Tour title: "The History & Heritage Houses of Norfolk"
- Price/duration: "5 days from £779"
- All 6 tabs: Suggested itinerary (Day 1-5), Featuring, Hotel, Extras, Tailor-make, Reviews (14 testimonials)

**No scraping protection** on this site. Both file-based (save HTML → upload) and URL-based fetch would work.

### v1 Approach: File-based (same as PDF/markdown)

User saves web page as HTML, uploads to Umbraco media. AngleSharp parses the file. This:
- Avoids all scraping protection issues (Cloudflare, bot detection, CAPTCHAs)
- Uses existing media picker pattern (consistent with PDF and markdown)
- Works for 100% of sites
- URL-based fetch can be added later as an enhancement

### What needs doing

1. **Install AngleSharp** — NuGet package for `src/UpDoc/UpDoc.csproj`

2. **Create `HtmlExtractionService.cs`** — AngleSharp-based HTML extraction
   - `IHtmlExtractionService` with `ExtractRich(string filePath)` — same pattern as markdown
   - Parse HTML, extract headings (`h1`-`h6`), paragraphs, list items
   - Return `RichExtractionResult` with synthetic font metadata (tag names as fontName, heading sizes as fontSize)
   - Handle Tailored Travels tab pattern: extract content from tab divs by section

3. **Wire up `WorkflowController.cs`** — add "web" source type routing (same pattern as markdown)
   - `SampleExtraction` + `TransformAdhoc` endpoints detect source type and route
   - `ConvertHtmlToTransformResult()` helper (heading-based grouping like markdown)

4. **Backoffice setup** (user does manually):
   - Create "Test Basic HTML" blueprint under Web Page document type
   - Create workflow via Settings > UpDoc > Workflows

5. **Test with Norfolk page** — save HTML, upload, extract, verify all tab content visible

### What we expect to discover

- Whether heading-based grouping works for HTML or if CSS selector rules are needed
- How to handle HTML-specific structure (tabs, sidebars, nav) — strip or extract?
- The right abstraction for "content area" detection across source types
- Whether the Source tab simplified view needs HTML-specific additions

---

## Phase 3: Polish PDF with Shared Patterns

After Phases 1-2 reveal the common functionality:

1. **Refactor shared components** — extract anything used by 2+ source types into shared modules
2. **Simplify PDF workflow** — remove PDF-specific hacks that should be handled by shared infrastructure
3. **Update the bordered-box layout** — apply learnings from how Markdown and Web content renders
4. **Fix remaining Tailored Tours issues** — the 20% that's not working

---

## Common Functionality (Updated After Phase 1)

### Confirmed shared (same across all source types)

- Blueprint picker modal — identical, no changes needed
- Destination tab — identical, shows blueprint structure
- Map tab — identical, shows source → destination mappings
- `destination.json` format — unchanged, same doc type works for multiple sources
- `map.json` format — unchanged
- Document creation pipeline — `up-doc-modal.element.ts`, `up-doc-collection-action.element.ts`, `up-doc-action.ts` all work unchanged
- `TransformResult` shape — both PDF pipeline and markdown's `ConvertMarkdownToTransformResult()` produce the same shape
- `stripMarkdown()` for text/textArea fields

### Confirmed source-specific

- Extraction services — each source type has its own (`PdfPagePropertiesService`, `MarkdownExtractionService`, `HtmlExtractionService` pending)
- Source tab rendering — PDF: areas/pages/rules/transform toolbar. Non-PDF: simplified element list with file picker
- Area detection + area editor — PDF only
- Page selection — PDF only
- Rules editor — PDF only (for now; may be needed for all once mapping is built)
- `source.json` config — different per source type

### Resolved

- **Transform tab**: Not needed for structured sources. Markdown uses heading-based grouping (`ConvertMarkdownToTransformResult`) instead of the full Extract → Area Detect → Transform pipeline.
- **Section rules editor**: Not needed for markdown extraction. But grouping rules ARE needed for mapping (deciding which sections go to which destination fields). This is a mapping concern, not an extraction concern.
- **Source tab**: Branched via `#sourceType` getter. PDF gets full toolbar; non-PDF gets simplified view. Clean separation.

### Still unknown (test with HTML)

- Whether HTML needs more than heading-based grouping (tab sections, CSS-defined content areas?)
- How to strip navigation/sidebar/footer noise from HTML pages
- Whether the "simplified view" needs HTML-specific additions (e.g., showing tab names)

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
