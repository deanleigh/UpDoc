# PDF Preview Component — Plan

## Context

The project needs PDF page thumbnails in multiple places. Currently, Umbraco's `umb-imaging-thumbnail` falls back to a generic icon for PDFs — no visual preview. We already have PDF.js available (used for the PdfPig spike tool). A reusable component that renders PDF pages as thumbnails solves this across the board.

---

## The Component

**Name:** `up-doc-pdf-thumbnail`

A Lit web component that renders a single PDF page as a thumbnail using PDF.js.

**Inputs:**
- `mediaKey` — Umbraco media item GUID (to fetch the PDF via API)
- `page` — page number to render (default: 1)
- `width` — thumbnail width in pixels (default: 300)

**Output:** An `<img>` element with a data URL (PNG). Rendered via offscreen canvas + `toDataURL()`, so it works inside any standard component.

**Caching:** Once a page is rendered, cache the canvas data so re-renders don't re-fetch the PDF.

---

## Where It Gets Used

### 1. Create Workflow sidebar — Sample PDF preview

**Current:** `umb-input-media` shows a `uui-card-media` with the generic PDF icon after selection.

**Change:** Replace `umb-input-media` with our own component that:
- Opens Umbraco's standard media picker modal for browsing/selecting
- Renders a `uui-card-media` with `up-doc-pdf-thumbnail` in the slot instead of `umb-imaging-thumbnail`
- Shows the first page of the selected PDF as a real thumbnail

### 2. Page picker sidebar — Choose which pages to include

**New sidebar modal** opened from the Source tab (or during Create Workflow after extraction):
- Scrollable list of all pages in the PDF
- Each page shown as an `up-doc-pdf-thumbnail` with a checkbox
- All pages checked by default
- User unticks pages they don't want (e.g., terms and conditions)
- Selection saved to workflow config

This sidebar replaces the current page toggles in the extracted content view. Same component used both during workflow creation and in the workspace Source tab.

### 3. Media library — PDF collection view (future, bonus)

**Not essential for Phase A.** A custom collection view for the Media section that renders PDF thumbnails instead of generic icons. Would use the same `up-doc-pdf-thumbnail` component inside `uui-card-media`.

---

## PDF.js Integration

PDF.js is a Mozilla library for rendering PDFs in the browser.

**How it works:**
1. Fetch PDF bytes from Umbraco's media API (`/umbraco/management/api/v1/media/...` or the existing `/updoc/workflows/{name}/pdf` endpoint)
2. Load into PDF.js: `pdfjsLib.getDocument(pdfData)`
3. Get page: `pdf.getPage(pageNumber)`
4. Render to canvas at desired scale: `page.render({ canvasContext, viewport })`

**Bundle consideration:** PDF.js is ~500KB. Options:
- Include in UpDoc's npm bundle (simplest)
- Lazy-load only when a PDF preview is needed (better for initial page load)

**Recommendation:** Lazy-load. The component imports PDF.js on first use, not at app startup.

---

## Implementation Sequence

### Step 1: POC — `up-doc-pdf-thumbnail` component — COMPLETE

Standalone Lit component. Given a media key and page number, renders the page as an image thumbnail.

**Key technique:** Renders to an offscreen canvas via PDF.js, then converts to a PNG data URL with `canvas.toDataURL('image/png')`. The result is a standard `<img>` that works inside any component (`uui-card-media`, etc.) — no canvas in the DOM, no shadow DOM hacking.

**Concurrency fix:** PDF.js throws if `pdfPage.render()` is called while another render is in progress. Fixed with `_currentRenderTask` tracking (cancel before re-render) and `_rendering` boolean guard.

### Step 2: Custom media picker with preview — COMPLETE

New component `up-doc-pdf-picker` that:
- Uses `<uui-button look="placeholder">` for the empty state (matches Umbraco's standard media picker)
- Opens `UMB_MEDIA_PICKER_MODAL` for browsing/selecting
- After selection, renders a `uui-card-media` with `up-doc-pdf-thumbnail` page 1 preview
- Fetches media item name via management API (shows file name, not GUID)
- Remove/Change buttons in `<uui-action-bar slot="actions">`

Replaced `umb-input-media` in the Create Workflow sidebar for the PDF source type.

### Step 3: Page picker sidebar

New sidebar modal `up-doc-page-picker-modal`:
- Receives media key (or PDF URL) and total page count
- Renders a scrollable grid/list of `up-doc-pdf-thumbnail` for each page
- Checkbox per page, all checked by default
- Returns selected page numbers on submit

Wire into Create Workflow flow (after extraction) and workspace Source tab.

### Step 4: Pipeline integration

When pages are selected:
- Save page selection to workflow config (already supported in source.json)
- Re-extract only selected pages (or filter extraction results to selected pages)
- This feeds into concern #1 from the Section Rules Editor plan — extraction happens once, page filtering is applied to the existing data

---

## Relationship to Pipeline Refactor

This component work naturally leads into the pipeline refactor (Section Rules Editor pre-implementation note #1):

1. PDF chosen → **full extraction** runs (all pages, all elements, all metadata)
2. Page picker shows thumbnails → user selects pages
3. Area detection **consumes the existing extraction** (filtered to selected pages) — no re-extraction
4. Transform consumes area detection → sections assembled
5. Section rules editor works on those sections

The `up-doc-pdf-thumbnail` component is UI-only — it doesn't affect the data pipeline. But the page picker's "save and re-filter" behaviour connects to the pipeline refactor.

---

## Critical Files

| File | Action | Step |
|------|--------|------|
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-pdf-thumbnail.element.ts` | NEW | 1 |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-pdf-picker.element.ts` | NEW | 2 |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/create-workflow-sidebar.element.ts` | MODIFY (swap umb-input-media for up-doc-pdf-picker) | 2 |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/page-picker-modal.element.ts` | NEW | 3 |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/page-picker-modal.token.ts` | NEW | 3 |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/manifest.ts` | MODIFY (register page picker modal) | 3 |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` | MODIFY (wire page picker into Source tab) | 3 |
| `package.json` | MODIFY (add pdfjs-dist dependency) | 1 |

---

## Verification

### Step 1 (POC)
- Render `up-doc-pdf-thumbnail` with a known PDF media key
- Verify first page appears as a canvas thumbnail at correct aspect ratio
- Verify different page numbers render different pages

### Step 2 (Picker)
- Open Create Workflow → select PDF Document → click Choose
- Media picker modal opens (standard Umbraco)
- Select a PDF → card shows with real page 1 thumbnail (not generic icon)
- Remove and re-select works

### Step 3 (Page picker)
- After extraction ("700 elements from 4 pages"), page picker opens or is available
- All 4 pages shown as thumbnails with checkboxes
- Untick page 4 → save → page selection persisted
- Same page picker available in workspace Source tab
