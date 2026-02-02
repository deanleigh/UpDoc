using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using UpDoc.Models;

namespace UpDoc.Services;

public interface IMapFileService
{
    /// <summary>
    /// Gets the map file for a given blueprint ID.
    /// </summary>
    MapFile? GetMapForBlueprint(Guid blueprintId);

    /// <summary>
    /// Gets the map file for a given document type alias.
    /// </summary>
    MapFile? GetMapForDocumentType(string alias);

    /// <summary>
    /// Gets all loaded map files.
    /// </summary>
    IReadOnlyList<MapFile> GetAllMaps();
}

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

    public MapFileService(IWebHostEnvironment webHostEnvironment, ILogger<MapFileService> logger)
    {
        _webHostEnvironment = webHostEnvironment;
        _logger = logger;
    }

    public MapFile? GetMapForBlueprint(Guid blueprintId)
    {
        var maps = LoadMaps();
        var idString = blueprintId.ToString();
        return maps.FirstOrDefault(m =>
            !string.IsNullOrEmpty(m.BlueprintId) &&
            m.BlueprintId.Equals(idString, StringComparison.OrdinalIgnoreCase));
    }

    public MapFile? GetMapForDocumentType(string alias)
    {
        var maps = LoadMaps();
        return maps.FirstOrDefault(m =>
            m.DocumentTypeAlias.Equals(alias, StringComparison.OrdinalIgnoreCase));
    }

    public IReadOnlyList<MapFile> GetAllMaps()
    {
        return LoadMaps().AsReadOnly();
    }

    private List<MapFile> LoadMaps()
    {
        if (_cache != null) return _cache;

        lock (_lock)
        {
            if (_cache != null) return _cache;

            var maps = new List<MapFile>();
            var mapsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "maps");

            if (!Directory.Exists(mapsDirectory))
            {
                _logger.LogInformation("UpDoc maps directory not found at {Path}. No map files loaded.", mapsDirectory);
                _cache = maps;
                return _cache;
            }

            var mapFiles = Directory.GetFiles(mapsDirectory, "*-map.json");
            _logger.LogInformation("Found {Count} map file(s) in {Path}", mapFiles.Length, mapsDirectory);

            foreach (var filePath in mapFiles)
            {
                try
                {
                    var json = File.ReadAllText(filePath);
                    var mapFile = JsonSerializer.Deserialize<MapFile>(json, JsonOptions);

                    if (mapFile != null)
                    {
                        if (string.IsNullOrEmpty(mapFile.DocumentTypeAlias))
                        {
                            _logger.LogWarning("Map file {File} has no documentTypeAlias, skipping.", Path.GetFileName(filePath));
                            continue;
                        }

                        maps.Add(mapFile);
                        _logger.LogInformation("Loaded map file: {Name} (docType: {Alias}, blueprint: {Blueprint})",
                            mapFile.Name, mapFile.DocumentTypeAlias, mapFile.BlueprintId ?? "none");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to load map file: {File}", Path.GetFileName(filePath));
                }
            }

            _cache = maps;
            return _cache;
        }
    }
}
