# Plan: PDF Page Selection / Exclusion

## Status: COMPLETE

## Problem

PDF extraction currently processes ALL pages. For the Tailored Travels PDFs:
- **Pages 1-2**: Tour content (title, description, features, accommodation, itinerary)
- **Page 3**: Booking form — rotated text produces ~80 garbled single-letter sections
- **Page 4**: Booking conditions T&Cs — long legal text, never useful

Result: 143 sections extracted, only ~8 are useful. The Source tab is flooded with noise, making mapping nearly impossible.

## Evidence (updoc-test-02.pdf — Suffolk)

Transform.json analysis:
- Page 1: 12 sections (features, what-we-will-see, accommodation, extras, title, description + contact info)
- Page 2: 5 sections (itinerary Day 1-6, repeated sidebar, repeated header)
- Page 3: ~80 sections — ALL garbage (single-letter headings: "r o", "D", "e", "b")
- Page 4: ~20 sections — T&Cs text

The booking form (page 3) is particularly destructive because PdfPig extracts rotated form field text character-by-character, producing garbled output like `"e g\n\na t t\n\no C"`.

## Design

### Where page selection lives

**In `source.json`** — it's a source-level extraction config, not a mapping concern.

```json
{
  "version": "1.0",
  "sourceTypes": ["pdf"],
  "pages": {
    "include": [1, 2]
  },
  "sections": []
}
```

Or exclusion-based:
```json
{
  "pages": {
    "exclude": [3, 4]
  }
}
```

**Include wins over exclude** — if `include` is specified, only those pages are processed. If only `exclude` is specified, all pages except those are processed. If neither is specified (or empty), all pages are processed (backwards compatible).

### UI: Where the user sets page selection

**Option A — Source config in workflow workspace (recommended for now):**
Add a "Pages" field to the Source tab header area, next to the "Re-extract" button. Simple text input accepting a page range like `1-2` or `1,2,4`. On re-extract, only those pages are processed.

**Option B — During sample extraction upload:**
When uploading a sample PDF, show a page count and let the user pick pages before extraction runs. More discoverable but requires more UI work.

**Recommendation:** Option A for Phase 1. It's the simplest change — add a page input to the Source tab, persist to source.json, pass to extraction API.

### Backend changes

**`PdfPagePropertiesService.cs`** — all three extraction methods need page filtering:

1. `ExtractRichDump()` — filter `document.GetPages()` by page numbers
2. `DetectAreas()` — filter pages before area detection
3. `ExtractRichTextLines()` — already receives page data, filter at call sites

The filtering should happen at the earliest possible point — before any text extraction runs on a page. This avoids wasting CPU on pages that will be discarded.

**`WorkflowController.cs`** — the `/workflows/{name}/sample-extraction` and `/workflows/{name}/transform` endpoints should read page selection from `source.json` and pass it to the extraction service.

### API changes

The extraction endpoints should accept optional page parameters:

```
POST /updoc/workflows/{name}/sample-extraction?pages=1,2
POST /updoc/workflows/{name}/transform?pages=1,2
```

But the primary source should be the workflow's `source.json` — the query parameter is an override for testing.

### Frontend changes

1. **Source tab header**: Add page range input (e.g., `uui-input` with placeholder "All pages" or "1-2")
2. **Re-extract button**: Reads page selection, saves to source.json, then triggers extraction
3. **Stats display**: Already shows "4 Pages" — could show "2 of 4 Pages" when filtered

### C# model changes

**`SourceConfig` model** — add Pages property:

```csharp
public class SourceConfig
{
    public string Version { get; set; } = "1.0";
    public List<string> SourceTypes { get; set; } = new();
    public PageSelection? Pages { get; set; }
    public List<object> Sections { get; set; } = new();
}

public class PageSelection
{
    public List<int>? Include { get; set; }
    public List<int>? Exclude { get; set; }
}
```

### What this fixes

- Suffolk PDF: 143 → ~17 sections (pages 1-2 only)
- Dresden PDF: Similar reduction
- Garbled booking form text eliminated entirely
- T&Cs text eliminated entirely
- Source tab becomes usable for mapping

### What this does NOT fix

- The character-by-character garbled text on page 1 under the description section (that's a separate PdfPig extraction bug in the image/footer region)
- The "Aldeburgh" image caption leaking into "Extras to Your Tour"
- Duplicate sections between page 1 and page 2 (title, description, what-we-will-see repeated)

Those are separate issues to address after page selection is working.

## Implementation Steps — ALL COMPLETE

### Step 1: Backend — Add page filtering to extraction ✅
- Added `Pages` property to `SourceConfig` model (simple `List<int>?`)
- `WorkflowController` reads page selection from `source.json` and passes to extraction
- `PdfPagePropertiesService` filters pages at the earliest point (before text processing)
- `PUT /updoc/workflows/{name}/pages` endpoint to save page selection

### Step 2: Backend — Update source.json read/write ✅
- `MapFileService` reads/writes `pages` array from source.json
- Simplified from include/exclude design to a simple page number array (empty/null = all pages)

### Step 3: Frontend — Page input on Source tab ✅
- Page selection controls in the Pages info box: All/Choose radio + range text input
- Per-page toggles on each Page box in the hierarchy
- Range string parsing ("1-3, 5" ↔ `[1, 2, 3, 5]`) with normalisation on blur
- Immediate save on change, applied on next re-extract
- Stats show "2 of 4" when filtered, with warning colour

### Step 4: UI polish ✅
- Info boxes refactored to uSync-inspired `<uui-box>` pattern with equal `flex-grow: 1`
- Source box: h2 filename, icon, date, green Re-extract + blue Change PDF buttons
- Collapse All moved to its own row below boxes, right-aligned

## Export to Markdown (secondary feature)

While working on page selection, also add an "Export to Markdown" button on the Source tab. This concatenates all transformed sections (heading + content) into a single `.md` file for download. Useful for:
- Sharing extraction results for review
- Comparing across PDFs
- Debugging extraction issues

Implementation: Simple client-side concatenation of transform sections, triggered by a button. No backend changes needed — the data is already in the transform result.

## Relationship to Three-Layer Pipeline

Page selection fits cleanly into Layer 1 (Extract):
```
Extract (raw output + page gating) → Shape (sections) → Map (destination wiring)
```

It's a gating mechanism — which pages to include — applied before any section detection runs. This aligns with the planning doc `THREE_LAYER_PIPELINE.md` where Extract includes "include/exclude gating".

## Branch

```
feature/page-selection
```
