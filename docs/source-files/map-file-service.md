# MapFileService.cs

Service that loads and caches map file JSON from the `updoc/maps/` directory at the site root.

## What it does

Scans the `updoc/maps/` directory for `*-map.json` files, deserializes them into `MapFile` objects, and provides lookup methods by blueprint ID or document type alias. Map files are loaded once on first access and cached for the application lifetime (registered as singleton).

## Interface

```csharp
public interface IMapFileService
{
    MapFile? GetMapForBlueprint(Guid blueprintId);
    MapFile? GetMapForDocumentType(string alias);
    IReadOnlyList<MapFile> GetAllMaps();
}
```

| Method | Description |
|--------|-------------|
| `GetMapForBlueprint` | Returns the map file whose `BlueprintId` matches the given GUID (case-insensitive). Returns `null` if not found. |
| `GetMapForDocumentType` | Returns the map file whose `DocumentTypeAlias` matches the given alias (case-insensitive). Returns `null` if not found. |
| `GetAllMaps` | Returns all loaded map files as a read-only list. |

## Implementation

```csharp
public class MapFileService : IMapFileService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<MapFileService> _logger;
    private List<MapFile>? _cache;
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

Map files are discovered by scanning `{ContentRootPath}/updoc/maps/` for files matching the `*-map.json` glob pattern:

```csharp
var mapsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "maps");
var mapFiles = Directory.GetFiles(mapsDirectory, "*-map.json");
```

### Lazy loading with thread-safe cache

The `LoadMaps()` method uses double-checked locking to ensure map files are loaded only once:

```csharp
private List<MapFile> LoadMaps()
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

- If the `updoc/maps/` directory does not exist, an empty list is cached and an informational log message is written
- If a map file fails to deserialize, the error is logged and that file is skipped
- Map files missing a `documentTypeAlias` are skipped with a warning

### JSON options

The deserializer is configured to be lenient:
- `PropertyNameCaseInsensitive = true` -- accepts any casing
- `ReadCommentHandling = JsonCommentHandling.Skip` -- allows comments in JSON
- `AllowTrailingCommas = true` -- allows trailing commas

## Registration

Registered as a singleton via `UpDocComposer`:

```csharp
builder.Services.AddSingleton<IMapFileService, MapFileService>();
```

`AddSingleton` is appropriate here because the service caches map files in memory for the entire application lifetime, and the data is read-only after initial load.

## Dependencies

- `IWebHostEnvironment` -- for `ContentRootPath` to locate the maps directory
- `ILogger<MapFileService>` -- for logging load status and errors

## Namespace

```csharp
namespace UpDoc.Services;
```
