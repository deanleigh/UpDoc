# WorkflowService.cs

Service that loads and caches workflow config JSON from the `updoc/workflows/` directory at the site root.

## What it does

Scans the `updoc/workflows/` directory for workflow folders containing config files (source, destination, map), deserializes them into `DocumentTypeConfig` objects, and provides lookup methods by blueprint ID or document type alias. Configs are loaded once on first access and cached for the application lifetime (registered as singleton).

Supports multiple source types per workflow folder — discovers all `{folderName}-source-*.json` files and loads them into a `Sources` dictionary keyed by type (e.g. `"pdf"`, `"markdown"`).

## Interface

```csharp
public interface IWorkflowService
{
    Workflow? GetMapForBlueprint(Guid blueprintId);
    Workflow? GetMapForDocumentType(string alias);
    IReadOnlyList<Workflow> GetAllMaps();
}
```

| Method | Description |
|--------|-------------|
| `GetMapForBlueprint` | Returns the workflow whose `BlueprintId` matches the given GUID (case-insensitive). Returns `null` if not found. |
| `GetMapForDocumentType` | Returns the workflow whose `DocumentTypeAlias` matches the given alias (case-insensitive). Returns `null` if not found. |
| `GetAllMaps` | Returns all loaded workflows as a read-only list. |

## Implementation

```csharp
public class WorkflowService : IWorkflowService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<WorkflowService> _logger;
    private List<Workflow>? _cache;
    private readonly object _lock = new();

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        ReadCommentHandling = JsonCommentHandling.Skip,
        AllowTrailingCommas = true,
    };
}
```

## Key concepts

### File discovery

Workflows are discovered by scanning `{ContentRootPath}/updoc/workflows/` for files matching the `*-map.json` glob pattern:

```csharp
var workflowsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows");
var mapFiles = Directory.GetFiles(workflowsDirectory, "*-map.json");
```

### Lazy loading with thread-safe cache

The `LoadMaps()` method uses double-checked locking to ensure workflows are loaded only once:

```csharp
private List<Workflow> LoadMaps()
{
    if (_cache != null) return _cache;

    lock (_lock)
    {
        if (_cache != null) return _cache;
        // ... load from disk
        _cache = maps;
        return _cache;
    }
}
```

### Graceful handling

- If the `updoc/workflows/` directory does not exist, an empty list is cached and an informational log message is written
- If a workflow fails to deserialize, the error is logged and that file is skipped
- Workflows missing a `documentTypeAlias` are skipped with a warning

### JSON options

The deserializer is configured to be lenient:
- `PropertyNameCaseInsensitive = true` -- accepts any casing
- `ReadCommentHandling = JsonCommentHandling.Skip` -- allows comments in JSON
- `AllowTrailingCommas = true` -- allows trailing commas

## Registration

Registered as a singleton via `UpDocComposer`:

```csharp
builder.Services.AddSingleton<IWorkflowService, WorkflowService>();
```

`AddSingleton` is appropriate here because the service caches workflows in memory for the entire application lifetime, and the data is read-only after initial load.

## Dependencies

- `IWebHostEnvironment` -- for `ContentRootPath` to locate the workflows directory
- `ILogger<WorkflowService>` -- for logging load status and errors

## Namespace

```csharp
namespace UpDoc.Services;
```
