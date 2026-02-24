# Plan: Workflow Folder Restructure + Name/Alias Separation

## Status: PLANNED — Not yet started. Branch: `feature/workflow-restructure` (to be created from `main`)

## Context

Workflow folders currently store all JSON files flat — `source.json`, `destination.json`, `map.json`, `sample-extraction.json`, etc. — making it unclear which files are authored vs derived. Workflows also lack a friendly display name: the collection view shows kebab-case folder names (`group-tour-pdf`) and document type aliases (`groupTour`) instead of human-readable names.

This refactoring introduces:
1. **Subfolder structure** — `source/`, `destination/`, `map/` grouping related files
2. **`workflow.json`** — new identity file with name, alias, document type, blueprint, source type
3. **Name/alias separation** — friendly names in the UI, kebab-case aliases for file paths/URLs

### Target structure

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

## Scope & Risk

**Low risk** — architecture is well-centralised:
- **Only `WorkflowService.cs` touches the filesystem** — all `Path.Combine()` calls are here
- **API contract unchanged** — endpoints return same JSON shapes, frontend unaffected
- **No production users** — test site only
- **Data unchanged** — same JSON content, just reorganised

### Files that MUST change

| File | Change |
|------|--------|
| `WorkflowService.cs` | All file path construction + new workflow.json read/write |
| `WorkflowSummary` (in WorkflowService.cs) | Add `displayName` and `documentTypeName` fields |
| `WorkflowController.cs` | Pass `displayName` through create endpoint, resolve doc type names |
| `workflow.types.ts` | Add `displayName`/`documentTypeName` to `WorkflowSummary` interface |
| `up-doc-workflows-view.element.ts` | Show displayName in Workflow column, documentTypeName in Doc Type column |
| `up-doc-workflow-workspace.context.ts` | Load name from API instead of client-side title-casing |
| `create-workflow-sidebar.element.ts` | Add separate Name + Alias fields |
| New: `Models/WorkflowIdentity.cs` | C# model for workflow.json |

### Files that DO NOT change

- All other TypeScript files (use API, don't know about file paths)
- `DestinationConfig.cs`, `SourceConfig.cs`, `MapConfig.cs` (model shapes unchanged)
- Extraction services, transform services (don't know paths)

---

## Implementation Steps

### Step 1: New C# model — `WorkflowIdentity`

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

### Step 2: Update `WorkflowService.cs` — path construction

Add helper methods and update all file I/O to use subfolder paths.

### Step 3: Update `CreateWorkflow()` — write workflow.json + subfolders

New parameter: `displayName`. Identity metadata moves from `source.json`/`destination.json` to `workflow.json`.

### Step 4: Update `GetAllWorkflowSummaries()` — read workflow.json

Three-tier format detection: `workflow.json` → new subfolders, root `source.json` → current flat, neither → old prefixed.

### Step 5: Update `LoadDocumentTypeConfig()` — new folder structure

### Step 6: Update `WorkflowController.cs`

Accept `displayName` in create endpoint. Resolve `documentTypeName` via `IContentTypeService`.

### Step 7-10: Frontend updates

- TypeScript types, collection view, workspace header, create sidebar
- Name format: `"{BlueprintName} - {SourceType}"` e.g. "Group Tour - PDF"
- Create sidebar: separate Name (friendly) + Alias (kebab-case) fields

### Step 11: Migration for existing workflows

C# startup migration: detect flat-structure, create subfolders, move files, generate `workflow.json`.

### Step 12: Drop old format backward compatibility

---

## Verification

1. `dotnet build UpDoc.sln` — no compile errors
2. Frontend build
3. Start site — check migration ran
4. Collection view: friendly names, doc type names (not aliases)
5. Workspace header: friendly name
6. Create workflow: Name + Alias fields
7. File structure on disk: subfolders correct
8. Full Create from Source flow still works
9. E2E tests pass
