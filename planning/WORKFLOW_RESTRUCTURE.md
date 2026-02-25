# Plan: Workflow Folder Restructure + Name/Alias Separation

## Status: PLANNED — Not yet started

## Context

Workflow folders currently store all JSON files flat — `source.json`, `destination.json`, `map.json`, `sample-extraction.json`, etc. — making it unclear which files are authored vs derived. Workflows also lack a friendly display name: the collection view shows kebab-case folder names (`group-tour-pdf`) and document type aliases (`groupTour`) instead of human-readable names.

This refactoring introduces:
1. **`workflow.json`** — new identity file with name, alias, document type, blueprint, source type
2. **Name/alias separation** — friendly names in the UI, kebab-case aliases for file paths/URLs
3. **Subfolder structure** — `source/`, `destination/`, `map/` grouping related files

### Target structure (after all sprints)

```
group-tour-pdf/
  workflow.json                    ← NEW: identity (name, alias, docType, blueprint, sourceType)
  source/
    source.json                    ← MOVED from root (authored: rules, page selection)
    sample-extraction.json         ← MOVED from root (derived)
    area-detection.json            ← MOVED from root (derived)
    area-template.json             ← MOVED from root (derived)
    transform.json                 ← MOVED from root (derived)
  destination/
    destination.json               ← MOVED from root (derived: blueprint structure)
  map/
    map.json                       ← MOVED from root (authored: mappings)
```

### Data categories

| Category | Files | Lifecycle |
|----------|-------|-----------|
| **Identity** | `workflow.json` | Set at creation, rarely changed |
| **Authored** | `source/source.json`, `map/map.json` | User builds/edits |
| **Derived** | Everything else | Regeneratable from source + blueprint |

---

## Current state (before any sprints)

- **Metadata spread across files:** Blueprint info in `destination.json`, source type in `source.json`, no single source of truth
- **No display name:** Folder name is the only identifier. Frontend fakes a display name by title-casing the kebab-case folder name
- **No document type name:** Only the alias (`groupTour`) is stored, not the display name (`Group Tour`)
- **All files flat** in the workflow folder root
- **Only `WorkflowService.cs` touches the filesystem** — all `Path.Combine()` calls are here. This is the key enabler for safe refactoring.
- **5 existing workflows on disk:** `group-tour-pdf`, `group-tour-web-page`, `tailored-tour-pdf`, `Test Basic Markdown`, `Test Basic Web Page`

---

## Scope & Risk

**Low risk** — architecture is well-centralised:
- **Only `WorkflowService.cs` touches the filesystem** — all `Path.Combine()` calls are here
- **API contract gets new optional fields** — nothing removed, frontend unaffected until Sprint 2
- **No production users** — test site only
- **Data unchanged** — same JSON content, just reorganised

---

## Sprint 1: `workflow.json` Identity File (Backend Only)

**Branch:** `feature/workflow-identity`
**Depends on:** nothing (first sprint)
**Goal:** Add a `workflow.json` identity file to every workflow. Single source of truth for name, alias, document type, blueprint, source type. No frontend changes.

### What changes

| File | Change |
|------|--------|
| New: `Models/WorkflowIdentity.cs` | C# model for `workflow.json` |
| `WorkflowService.cs` | Write `workflow.json` on create, read it on list, migration for existing workflows |
| `WorkflowSummary` (in WorkflowService.cs) | Add `DisplayName` and `DocumentTypeName` fields |
| `WorkflowController.cs` | Accept `displayName` in create endpoint, resolve doc type name via `IContentTypeService`, return new fields |

### What does NOT change

- No file moves (that's Sprint 3)
- No frontend changes (that's Sprint 2)
- No subfolder restructure
- `DestinationConfig.cs`, `SourceConfig.cs`, `MapConfig.cs` model shapes unchanged
- Extraction services, transform services unchanged
- All TypeScript files unchanged

### Steps

#### 1.1 New model — `WorkflowIdentity`

Create `src/UpDoc/Models/WorkflowIdentity.cs`:

```csharp
public class WorkflowIdentity
{
    public string Name { get; set; } = string.Empty;        // "Group Tour - PDF"
    public string Alias { get; set; } = string.Empty;       // "group-tour-pdf" (= folder name)
    public string DocumentTypeAlias { get; set; } = string.Empty;
    public string? DocumentTypeName { get; set; }
    public string? BlueprintId { get; set; }
    public string? BlueprintName { get; set; }
    public string SourceType { get; set; } = string.Empty;  // "pdf", "markdown", "web"
    public string Version { get; set; } = "1.0";
}
```

#### 1.2 Update `WorkflowSummary`

Add two new fields:

```csharp
public string? DisplayName { get; set; }        // "Group Tour - PDF"
public string? DocumentTypeName { get; set; }    // "Group Tour"
```

These are nullable so existing API consumers don't break.

#### 1.3 Update `CreateWorkflow()`

- Accept optional `displayName` parameter
- Auto-generate as `"{BlueprintName} - {SourceType}"` if not provided (e.g. "Group Tour - PDF")
- Write `workflow.json` alongside the existing 3 stub files
- Populate from the parameters already available (documentTypeAlias, blueprintId, blueprintName, sourceType)
- Resolve `DocumentTypeName` from `IContentTypeService`

#### 1.4 Update `GetAllWorkflowSummaries()`

- Check for `workflow.json` first — if present, read identity from there
- Fall back to current `destination.json` + `source.json` reading for old workflows (without `workflow.json`)
- Populate `DisplayName` and `DocumentTypeName` on the summary

#### 1.5 Update `WorkflowController.cs`

- Create endpoint accepts optional `displayName` in request body
- Pass through to `CreateWorkflow()`
- Resolve `DocumentTypeName` via `IContentTypeService` if not already available

#### 1.6 Startup migration for existing workflows

On application startup, scan workflow folders:
- If `workflow.json` missing but `destination.json` + `source.json` exist → generate `workflow.json`
- Read `BlueprintId`, `BlueprintName`, `DocumentTypeAlias` from `destination.json`
- Read `SourceType` from `source.json` (first entry in `sourceTypes` array)
- Resolve `DocumentTypeName` from `IContentTypeService`
- Auto-generate `Name` as `"{BlueprintName} - {SourceType}"` (title-case source type)
- Set `Alias` to folder name
- Write `workflow.json`
- Log migration activity

### Verification

1. `dotnet build UpDoc.sln` — no compile errors
2. Start site — migration runs, check logs for migration messages
3. Check each workflow folder on disk has a `workflow.json` with correct content:
   - `group-tour-pdf/workflow.json` → Name: "Group Tour - PDF", Alias: "group-tour-pdf"
   - `group-tour-web-page/workflow.json` → Name: "Group Tour - Web Page", Alias: "group-tour-web-page"
   - `tailored-tour-pdf/workflow.json` → Name: "Tailored Tour - PDF", Alias: "tailored-tour-pdf"
   - Test workflows get reasonable names too
4. API: `GET /updoc/workflows` returns summaries with `displayName` and `documentTypeName` populated
5. Create a new workflow via API or UI — `workflow.json` is written alongside the other files
6. **Frontend unchanged** — collection view still works (just ignores new fields for now)
7. Full Create from Source flow still works end-to-end (create a document from PDF)
8. E2E tests pass (if applicable)

---

## Sprint 2: Friendly Names in the UI (Frontend)

**Branch:** `feature/workflow-friendly-names`
**Depends on:** Sprint 1 (reads `displayName` / `documentTypeName` from API)
**Goal:** Show friendly names everywhere in the UI instead of kebab-case aliases.

### What changes

| File | Change |
|------|--------|
| `workflow.types.ts` | Add `displayName` / `documentTypeName` to `WorkflowSummary` interface |
| `up-doc-workflows-view.element.ts` | Show `displayName` in Workflow column, `documentTypeName` in Doc Type column |
| `up-doc-workflow-workspace.context.ts` | Load name from API instead of client-side title-casing |
| `create-workflow-sidebar.element.ts` | Add separate Name + Alias fields; Name auto-generates Alias |

### What does NOT change

- No file moves (that's Sprint 3)
- No backend changes (Sprint 1 already provides the data)
- No model changes

### Steps

#### 2.1 Update TypeScript types

Add to `WorkflowSummary` interface in `workflow.types.ts`:

```typescript
displayName?: string;        // "Group Tour - PDF"
documentTypeName?: string;   // "Group Tour"
```

#### 2.2 Update collection view

In `up-doc-workflows-view.element.ts`:
- Workflow column: show `displayName` (fall back to title-cased `name` for backward compat)
- Doc Type column: show `documentTypeName` (fall back to `documentTypeAlias`)

#### 2.3 Update workspace header

In `up-doc-workflow-workspace.context.ts`:
- Read `displayName` from API response
- Remove client-side title-casing logic
- Workspace header shows "Group Tour - PDF" instead of "Group Tour Pdf"

#### 2.4 Update create sidebar

In `create-workflow-sidebar.element.ts`:
- Add a **Name** field (editable, auto-generated as `"{BlueprintName} - {SourceType}"`)
- Add an **Alias** field (editable, auto-generated from Name as kebab-case)
- Name field drives Alias field (like Umbraco's own document type creation)
- Send both `name` (display) and `alias` (folder name) to the API

### Verification

1. Frontend build: `cd src/UpDoc/wwwroot/App_Plugins/UpDoc && npm run build`
2. Start site
3. **Collection view:** Workflow column shows "Group Tour - PDF" (not "group-tour-pdf"), Doc Type column shows "Group Tour" (not "groupTour")
4. **Workspace header:** Shows "Group Tour - PDF" when opening a workflow
5. **Create workflow sidebar:** Name field pre-fills as "Group Tour - PDF", Alias field pre-fills as "group-tour-pdf". Editing Name updates Alias. Both editable.
6. Create a new workflow — verify name and alias are saved correctly in `workflow.json`
7. Full Create from Source flow still works end-to-end
8. E2E tests pass

---

## Sprint 3: Subfolder Restructure (Backend)

**Branch:** `feature/workflow-subfolders`
**Depends on:** Sprint 1 (`workflow.json` must exist). Independent of Sprint 2 (can run in parallel if needed, but sequential is safer).
**Goal:** Move files from flat layout into `source/`, `destination/`, `map/` subfolders. Pure file reorganisation — API contract unchanged, frontend unaffected.

### What changes

| File | Change |
|------|--------|
| `WorkflowService.cs` | All `Path.Combine()` calls updated to use subfolder paths; new helper methods for subfolder paths |

### What does NOT change

- `workflow.json` stays at folder root (not in a subfolder)
- API contract unchanged — endpoints return same JSON shapes
- All TypeScript files unchanged (they use API, don't know about file paths)
- Model shapes unchanged

### Steps

#### 3.1 Add subfolder path helpers

In `WorkflowService.cs`, add helper methods:

```csharp
private string GetSourceFolderPath(string workflowFolder) => Path.Combine(workflowFolder, "source");
private string GetDestinationFolderPath(string workflowFolder) => Path.Combine(workflowFolder, "destination");
private string GetMapFolderPath(string workflowFolder) => Path.Combine(workflowFolder, "map");
```

#### 3.2 Update all file I/O methods

Every method that reads/writes `source.json`, `destination.json`, `map.json`, `sample-extraction.json`, `area-detection.json`, `area-template.json`, `transform.json` gets updated to use subfolder paths.

#### 3.3 Update `CreateWorkflow()`

- Create `source/`, `destination/`, `map/` subfolders
- Write files into subfolders instead of root

#### 3.4 Update file reading with format detection

When reading, check subfolder path first, fall back to root path:
- `source/source.json` → `source.json`
- `destination/destination.json` → `destination.json`
- `map/map.json` → `map.json`

This provides backward compatibility during migration.

#### 3.5 Startup migration for existing flat-layout workflows

On application startup, scan workflow folders:
- If `workflow.json` exists (Sprint 1) but files are at root (no `source/` subfolder) → migrate
- Create subfolders
- Move files into correct subfolders
- Log migration activity

#### 3.6 Update `GetAllWorkflowSummaries()` completeness check

Adjust `File.Exists()` checks to look in subfolders (with root fallback).

### Verification

1. `dotnet build UpDoc.sln` — no compile errors
2. Start site — migration runs, check logs
3. Check disk structure for each workflow:
   ```
   group-tour-pdf/
     workflow.json              ← at root (from Sprint 1)
     source/source.json         ← moved
     source/sample-extraction.json
     source/area-detection.json
     source/area-template.json
     source/transform.json
     destination/destination.json  ← moved
     map/map.json               ← moved
   ```
4. No files left at flat root (except `workflow.json`)
5. API: `GET /updoc/workflows` returns same data as before
6. Open a workflow workspace — all tabs load correctly (Source, Destination, Map)
7. Upload a PDF for sample extraction — saves to `source/sample-extraction.json`
8. Save a mapping — saves to `map/map.json`
9. Full Create from Source flow still works end-to-end
10. E2E tests pass

---

## Sprint 4: Cleanup

**Branch:** `feature/workflow-restructure-cleanup`
**Depends on:** Sprints 1, 2, and 3 all merged
**Goal:** Remove backward compatibility code and old-format support. Final verification.

### What changes

| File | Change |
|------|--------|
| `WorkflowService.cs` | Remove old-format detection (prefixed files), remove root-path fallbacks, remove migration code |

### Steps

#### 4.1 Remove old prefixed-file format support

The `GetAllWorkflowSummaries()` method currently handles an "old format" with prefixed files like `{folderName}-source-pdf.json`. This can be removed — all workflows should be on the new format after migrations.

#### 4.2 Remove root-path fallbacks

File reading no longer needs to check both `source/source.json` and `source.json`. Only subfolder paths.

#### 4.3 Optionally remove migration code

Decision: keep migration code (safe — runs once, no cost) or remove it (cleaner). User's choice.

#### 4.4 Code review pass

Review `WorkflowService.cs` for any remaining references to old paths or formats.

### Verification

1. `dotnet build UpDoc.sln` — no compile errors
2. Frontend build
3. Start site
4. Collection view: friendly names, doc type names
5. Workspace header: friendly name
6. Create workflow: Name + Alias fields work
7. File structure on disk: subfolders correct, no flat files
8. Full Create from Source flow still works end-to-end
9. E2E tests pass
10. **Delete a workflow and recreate it** — verify new format is used throughout

---

## Sprint dependency graph

```
Sprint 1 (backend: workflow.json)
    ├── Sprint 2 (frontend: friendly names)  ── depends on Sprint 1
    ├── Sprint 3 (backend: subfolders)        ── depends on Sprint 1
    └── Sprint 4 (cleanup)                    ── depends on Sprints 1 + 2 + 3
```

Sprint 2 and Sprint 3 are independent of each other (both only depend on Sprint 1), but running them sequentially is safer to avoid merge conflicts in `WorkflowService.cs`.

---

## Files affected (full list across all sprints)

### Must change

| File | Sprint |
|------|--------|
| New: `Models/WorkflowIdentity.cs` | 1 |
| `WorkflowService.cs` | 1, 3, 4 |
| `WorkflowSummary` (in WorkflowService.cs) | 1 |
| `WorkflowController.cs` | 1 |
| `workflow.types.ts` | 2 |
| `up-doc-workflows-view.element.ts` | 2 |
| `up-doc-workflow-workspace.context.ts` | 2 |
| `create-workflow-sidebar.element.ts` | 2 |

### Do NOT change

- All other TypeScript files (use API, don't know about file paths)
- `DestinationConfig.cs`, `SourceConfig.cs`, `MapConfig.cs` (model shapes unchanged)
- Extraction services, transform services (don't know paths)
