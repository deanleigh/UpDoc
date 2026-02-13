# Plan: PDF Zone Editor Integration

## Status: IMPLEMENTED on `feature/zone-editor` branch

---

## Context

UpDoc's PDF extraction currently auto-detects "areas" from filled coloured rectangles in the PDF, then extracts content within those areas. This works for some PDFs but produces noise, misses content, or extracts chrome for others. Rather than refining auto-detection heuristics, we're replacing it with **user-defined zones** — the user draws rectangular zones on the PDF using a visual editor, names them, and saves a zone template. Extraction then runs only within those zones.

A standalone HTML/JS zone editor prototype exists (~800 lines). It renders PDFs with PDF.js, lets users draw/edit/delete zones, and exports coordinates as JSON in PDF point space. This needs to be refactored into a Lit component for the Umbraco backoffice.

**This replaces the RecursiveXYCut plan** as the priority. Zone editor solves the extraction problem more directly by letting users define where to look, rather than relying on algorithms.

---

## User Journey

**Source → Pages → Areas → Sections** (left-to-right, each unlocks the next)

1. **Source** — Upload PDF via media picker. Stores media key.
2. **Pages** — Select which pages to include (All / Choose). Already implemented.
3. **Areas** — "Define Areas" button opens zone editor modal. User draws and names zones on the PDF. Saves zone template to workflow folder.
4. **Sections** — Extraction runs within defined zones on selected pages. Sections populate.

No auto-detection. Always user-defined zones. Refinable at any step.

---

## Branch

```
feature/zone-editor
```

---

## Implementation Phases

### Phase 1: Backend — Zone Template Model + Storage

**New file: `src/UpDoc/Models/ZoneTemplate.cs`**

Zone template model matching the prototype's JSON schema:
- `ZoneTemplate` — templateName, sourceFile, pageSize, createdAt, zones list
- `ZoneDefinition` — name, property, page, type, bounds, color, headingFont, expectedSections, notes
- `ZoneBounds` — x, y, width, height (PDF point coordinates, bottom-left origin)

**Modified: `src/UpDoc/Services/WorkflowService.cs`**
- Add `SaveZoneTemplate(workflowName, template)` — saves `zone-template.json`
- Add `GetZoneTemplate(workflowName)` — loads `zone-template.json`, returns null if not found
- Follow existing `SaveSampleExtraction()` pattern

**Modified: `src/UpDoc/Controllers/WorkflowController.cs`**
- `PUT /workflows/{name}/zone-template` — saves zone template
- `GET /workflows/{name}/zone-template` — loads zone template (404 if not found)
- `GET /workflows/{name}/pdf` — streams PDF file bytes for frontend rendering (reads stored media key from sample extraction, resolves file path via IMediaService)

### Phase 2: Backend — Zone-Filtered Extraction

**Modified: `src/UpDoc/Services/PdfPagePropertiesService.cs`**

Change `DetectZonesFromDocument()` to accept an optional `ZoneTemplate` parameter:

- **If template provided:** Build `DetectedZone` objects from template bounds instead of calling `DetectPageFilledRects()`
- **If no template:** Keep existing auto-detect behaviour as fallback (backward compat during transition)
- The containment test stays identical — just uses template zones instead of auto-detected ones
- `GroupIntoSections()` stays unchanged
- Everything downstream unchanged

**Modified: `WorkflowController.cs`**
- Update zone-detection, transform, and transform-adhoc endpoints to load zone template and pass to extraction

### Phase 3: Frontend — PDF.js Dependency

**Modified: `src/UpDoc/wwwroot/App_Plugins/UpDoc/package.json`**
- Add `"pdfjs-dist": "^4.2.67"` to dependencies

**Modified: `vite.config.ts`**
- Add `target: 'es2022'` — needed because pdfjs-dist uses top-level await

**Worker file handling:**
- Copy `pdf.worker.min.mjs` to `dist/` in build step (added `copy:pdfworker` script to package.json)
- Set `pdfjsLib.GlobalWorkerOptions.workerSrc = '/App_Plugins/UpDoc/dist/pdf.worker.min.mjs'`

### Phase 4: Frontend — Zone Editor Modal

**New: `src/.../src/pdf-zone-editor-modal.token.ts`**
- `ZoneEditorModalData` — workflowName, existingTemplate?, selectedPages?
- `ZoneEditorModalValue` — template (the saved zone template)

**New: `src/.../src/pdf-zone-editor-modal.element.ts`** (~500 lines)

Lit component refactored from prototype:
- Extends `UmbModalBaseElement`
- Uses `umb-body-layout` for full-screen sidebar layout
- Left: Canvas area (PDF.js rendering + overlay for drawing zones)
- Right: Zone list panel + edit form (using UUI components: `uui-input`, `uui-button`, `uui-box`)
- Top toolbar: Draw/Select mode toggle, page navigation, zoom controls
- Save → `this._submitModal(value)` with zone template
- Cancel → `this._rejectModal()`

Key porting from prototype:
- `pdfToCanvas()` / `canvasToPdf()` coordinate conversion — direct port
- Drawing state machine (mousedown/mousemove/mouseup) — direct port
- Zone CRUD + state management — `@state()` decorators instead of plain JS
- Zone edit form — adapted to UUI components
- Drag and resize support in select mode

### Phase 5: Frontend — Source Tab Integration

**Modified: `src/.../src/up-doc-workflow-source-view.element.ts`**

1. **Areas info box** — added button:
   - No template: "Define Areas" button (primary, green)
   - Has template: zone count + "Edit Areas" button (outline)

2. **New state:** `@state() _zoneTemplate: ZoneTemplate | null = null`

3. **Load zone template in `#loadData()`** — added to existing `Promise.all()`

4. **`#onEditAreas()` handler** — opens zone editor modal, saves result via API, triggers re-extraction

**Modified: `src/.../src/workflow.service.ts`**
- Add `fetchZoneTemplate(workflowName, token)` — GET
- Add `saveZoneTemplate(workflowName, template, token)` — PUT
- Add `fetchPdfBlob(workflowName, token)` — GET (streams PDF bytes)

**Modified: `src/.../src/manifest.ts`** — register zone editor modal

**Modified: `src/.../src/workflow.types.ts`** — add ZoneTemplate, ZoneDefinition, ZoneBounds interfaces

---

## Files Summary

| File | Action | Phase |
|------|--------|-------|
| `src/UpDoc/Models/ZoneTemplate.cs` | **NEW** | 1 |
| `src/UpDoc/Services/WorkflowService.cs` | Modify | 1 |
| `src/UpDoc/Controllers/WorkflowController.cs` | Modify | 1, 2 |
| `src/UpDoc/Services/PdfPagePropertiesService.cs` | Modify | 2 |
| `App_Plugins/UpDoc/package.json` | Modify | 3 |
| `App_Plugins/UpDoc/vite.config.ts` | Modify | 3 |
| `App_Plugins/UpDoc/src/pdf-zone-editor-modal.token.ts` | **NEW** | 4 |
| `App_Plugins/UpDoc/src/pdf-zone-editor-modal.element.ts` | **NEW** (~500 lines) | 4 |
| `App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` | Modify | 5 |
| `App_Plugins/UpDoc/src/workflow.service.ts` | Modify | 5 |
| `App_Plugins/UpDoc/src/workflow.types.ts` | Modify | 5 |
| `App_Plugins/UpDoc/src/manifest.ts` | Modify | 5 |

---

## Coordinate System

Both PdfPig and the prototype use **PDF point space** (origin bottom-left, Y increases upward). The prototype's `canvasToPdf()` produces `y = pageHeight - (canvasY / scale)` — same coordinate system PdfPig uses. No conversion needed between template and extraction.

---

## What Does NOT Change

- `ContentTransformService.cs` — consumes `ZoneDetectionResult`, shape preserved
- `map.json` / `destination.json` — unchanged
- Frontend mapping UI (Map tab, Destination tab) — unchanged
- Create from Source flow (collection action) — unchanged
- Legacy extraction methods — unchanged

---

## Verification

1. Build: `dotnet build UpDoc.sln`
2. Frontend: `cd src/UpDoc/wwwroot/App_Plugins/UpDoc && npm install && npm run build`
3. Run: `dotnet run --project src/UpDoc.TestSite/UpDoc.TestSite.csproj`
4. Navigate to Settings > UpDoc > Workflows > Group Tour Pdf > Source tab
5. Verify existing extraction still works (backward compat — no zone template = auto-detect)
6. Click "Define Areas" on the Areas box
7. Zone editor opens, PDF renders correctly
8. Draw 2-3 zones on page 1 (header area, tour info, contact)
9. Name the zones, save
10. Extraction re-runs automatically
11. Verify sections only contain content from within defined zones
12. Click "Edit Areas" — zone editor reopens with existing zones
13. Modify a zone, save, verify re-extraction reflects changes

---

## Future (Not This Branch)

- **RecursiveXYCut within zones** — PdfPig DLA for micro-segmentation within user-defined zones
- **Sequential unlock UX** — disable extraction until zones defined, progressive info box states
- **Auto-detect as starting point** — optional button in zone editor to detect zones from background colours (prototype has this)
- **Zone names in mapping rules** — "content from zone 'Features'" as condition vocabulary
