# Next Session: Web Area Detection

## Where We Are

Branch `feature/consistent-source-tabs` has 3 commits:
- `8d8bc9d` — Consistent Extracted/Transformed tabs + info boxes for markdown and web
- `8a4f405` — Doc updates and test site configs
- `dd446a8` — Web area detection planning document

All three source types now share the same tab structure and info box layout. The next step is **web area detection** — bringing the PDF's Page > Area > Section > Element hierarchy to web sources.

## What To Build

Read `planning/WEB_AREA_DETECTION.md` for the full agreed design. Summary:

### Goal
Auto-detect HTML container areas (header, nav, main, sidebar, footer) during web extraction so users can include/exclude them — eliminating navigation and footer noise without manual CSS selectors.

### Key Decisions Already Made
- **Same hierarchy as PDF**: Page (always 1 for web) > Area > Section > Element
- **Two-tier area detection**: Semantic HTML elements (`<header>`, `<nav>`, `<main>`, etc.) AND class/ID pattern matching for legacy sites (`<div class="header">`, `<div id="footer">`)
- **3 info boxes** for web (not 4): Source, Areas, Sections — no Pages box needed
- **Reuse existing PDF hierarchy renderer** (`#renderAreaPage()`, `#renderArea()`, `#renderSection()`, `#renderAreaElement()`) for the web Extracted tab
- **Area include/exclude persists** in source.json, same pattern as PDF page exclusion
- **Transform only processes included areas**

### Implementation Steps

**Backend (C#):**
1. Add `htmlArea` field to `ElementMetadata` in `RichExtractionResult.cs`
2. Modify `HtmlExtractionService.ExtractElements()` to track current area during DOM walk — pass area name down through recursion
3. New `DetectArea(IElement)` method — checks semantic tags + class/ID patterns, returns human-readable area name
4. Remove `FindContentRoot()` body-only restriction — extract from full body, let area tagging + UI toggles handle filtering
5. After extraction, build `AreaDetectionResult`-compatible structure by grouping elements by `htmlArea` value
6. Keep `IsSkippableElement()` for non-content elements (script, style, svg, iframe, form inputs)

**Frontend (TypeScript):**
1. Replace `#renderSimpleElements()` flat list with existing hierarchy renderer for web sources
2. Replace 4 placeholder boxes with 3 functional boxes (Source, Areas, Sections)
3. Wire area include/exclude toggles to source.json persistence
4. Pass only included areas into transform pipeline

### Test Case
Norfolk tour page (https://www.tailored-travel.co.uk/norfolk) — currently 170 elements. After area detection, should split into Header, Main Content, Sidebar, Footer areas. User excludes all except Main Content → clean sections: Suggested Itinerary (with Day 1-6), Featuring, Hotel.

### Important Context
- The Norfolk site is ~20 years old, predates HTML5 semantic elements — will need class/ID pattern matching, not just semantic tag detection
- AngleSharp is MIT licensed (same as PdfPig)
- `HtmlExtractionService.cs` already has `FindContentRoot()` with selector priority list and `IsSkippableElement()` for noise tags
- Stay on `feature/consistent-source-tabs` branch

## Files to Modify
- `src/UpDoc/Models/RichExtractionResult.cs`
- `src/UpDoc/Services/HtmlExtractionService.cs`
- `src/UpDoc/Controllers/WorkflowController.cs`
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts`
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` (if needed)
