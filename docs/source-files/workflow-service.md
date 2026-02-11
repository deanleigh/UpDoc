# WorkflowService.cs

Service that manages workflow config JSON files in the `updoc/workflows/` directory at the site root.

## What it does

Provides CRUD operations for workflow folders and their config files (source.json, destination.json, map.json, sample-extraction.json). Loads configs from disk, validates them, and supports both batch loading (all workflows) and direct single-workflow loading.

## Interface

```csharp
public interface IWorkflowService
{
    IReadOnlyList<WorkflowSummary> GetAllWorkflowSummaries();
    IReadOnlyList<DocumentTypeConfig> GetAllConfigs();
    DocumentTypeConfig? GetConfigByName(string name);
    void CreateWorkflow(string name, string documentTypeAlias, string sourceType, string? blueprintId, string? blueprintName);
    void DeleteWorkflow(string name);
    void SaveDestinationConfig(string name, DestinationConfig config);
    void SaveMapConfig(string name, MapConfig config);
    void SaveSampleExtraction(string name, RichExtractionResult extraction);
    RichExtractionResult? GetSampleExtraction(string name);
}
```

| Method | Description |
|--------|-------------|
| `GetAllWorkflowSummaries` | Returns lightweight summaries for the collection view |
| `GetAllConfigs` | Loads all workflows with full validation |
| `GetConfigByName` | Loads a single workflow directly from disk **without validation** — for workspace editing |
| `CreateWorkflow` | Creates a workflow folder with stub JSON files |
| `DeleteWorkflow` | Deletes a workflow folder |
| `SaveDestinationConfig` | Writes destination.json |
| `SaveMapConfig` | Writes map.json |
| `SaveSampleExtraction` | Writes sample-extraction.json |
| `GetSampleExtraction` | Reads sample-extraction.json |

## Key concepts

### GetConfigByName vs GetAllConfigs

`GetAllConfigs()` runs `ValidateConfig()` which checks that all map.json targets exist in destination.json. Workflows that fail validation are skipped — this is correct for the collection view (only show complete workflows).

`GetConfigByName(name)` loads directly from disk without validation — the workflow workspace needs to edit partially-complete workflows where mappings may reference targets that haven't been fully validated yet.

### Validation fix

`ValidateConfig` uses `field.Alias` (human-readable like "pageTitle") to build the set of valid destination keys, not `field.Key` (GUIDs). The frontend writes aliases to map.json targets, so validation must match against aliases.

## Registration

Registered as a singleton via `UpDocComposer`:

```csharp
builder.Services.AddSingleton<IWorkflowService, WorkflowService>();
```

## Dependencies

- `IWebHostEnvironment` — for `ContentRootPath` to locate the workflows directory
- `ILogger<WorkflowService>` — for logging load status and errors

## Namespace

```csharp
namespace UpDoc.Services;
```
