# Next Session: Source Tab Polish and Noise Filtering

## Where We Are

All three source types (PDF, Markdown, Web) now have a **consistent Source tab interface**:
- **Extracted/Transformed sub-tabs** for all three types
- **Info boxes row**: Source box (functional), 3 placeholder boxes
- **Transformed tab** shows real HTML-rendered content via `ConvertStructuredToTransformResult`
- Backend auto-generates `transform.json` during markdown/web extraction
- PDF render path unchanged

This was implemented on branch `feature/consistent-source-tabs`, commit `8d8bc9d`.

## What's Working Well

- **Markdown Transformed view** — clean, well-structured HTML. Heading-based grouping works naturally.
- **Web Transformed view** — real content visible (headings, itinerary, hotel info), but includes nav/footer noise from DOM extraction.
- **Consistent layout** — all three source types now share the same visual structure (tabs, boxes, content area).

## What Needs Attention Next

### 1. Web noise filtering (high priority)
The Norfolk web extraction has 170 elements including nav links, footer content, etc. The `HtmlExtractionService` already has content root detection (`<main>`, `<article>`, `.content`), but for this particular site it falls back to `<body>`.

Options to explore:
- **CSS selector config** — let the workflow author specify a content container selector in source config
- **Automatic noise detection** — filter elements that appear in nav/header/footer (AngleSharp already skips these tags, but some sites have non-semantic markup)
- **Manual element exclusion** — let the workflow author exclude ranges of elements from the Extracted view

### 2. Info box content (medium priority)
Three placeholder boxes need real content. Candidates:
- **Elements** — count of raw extracted elements
- **Sections** — count from transform diagnostics
- **Headings** — count of heading elements
- Source-specific metrics (pages for PDF, word count, etc.)

### 3. Button label consistency (low priority)
Currently: "Change PDF" (PDF), "Change file" (markdown), "Re-extract" (web). Should be consistent across types — probably "Change Source" or similar.

### 4. Transformed view cleanup (medium priority)
The current Transformed view shows `## heading` markdown syntax in the rendered HTML for PDF (screenshot showed raw `##` markers). All three types need clean HTML rendering without markdown artifacts.

### 5. Bordered-box layout for Extracted tab (parked)
Branch `feature/bordered-box-layout` has bordered boxes for PDF sections but was never merged. The Extracted tab for all three types would benefit from this treatment. Parked — address after noise filtering.

## Bigger Picture: Destination-Driven Mapping

The consistent Source tab was a prerequisite for the bidirectional mapping UI (Phases 2-5 in `DESTINATION_DRIVEN_MAPPING.md`). With all three types now showing the same structure, the destination-driven mapping flow can be built once and work across all source types.

## Open Questions

- Should the web source type have a "content selector" field in its source config (e.g., `main .article-content`)? This would be the web equivalent of PDF page selection.
- Should heading-based grouping be configurable for markdown/web (e.g., "group by h2" vs "group by h3")?
- The Transformed view renders all sections as `## heading` — should non-PDF sources use the actual heading level from extraction (h1, h2, h3) instead of forcing everything to h2?
