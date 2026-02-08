using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using UpDoc.Models;

namespace UpDoc.Services;

public interface IMapFileService
{
    /// <summary>
    /// Gets the document type config for a given blueprint ID.
    /// </summary>
    DocumentTypeConfig? GetConfigForBlueprint(Guid blueprintId);

    /// <summary>
    /// Gets the document type config for a given document type alias.
    /// </summary>
    DocumentTypeConfig? GetConfigForDocumentType(string alias);

    /// <summary>
    /// Gets all loaded document type configs.
    /// </summary>
    IReadOnlyList<DocumentTypeConfig> GetAllConfigs();

    /// <summary>
    /// Validates cross-file references in a document type config.
    /// Returns a list of validation errors (empty if valid).
    /// </summary>
    List<string> ValidateConfig(DocumentTypeConfig config);
}

public class MapFileService : IMapFileService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<MapFileService> _logger;
    private List<DocumentTypeConfig>? _cache;
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

    public DocumentTypeConfig? GetConfigForBlueprint(Guid blueprintId)
    {
        var configs = LoadConfigs();
        var idString = blueprintId.ToString();
        return configs.FirstOrDefault(c =>
            !string.IsNullOrEmpty(c.Destination.BlueprintId) &&
            c.Destination.BlueprintId.Equals(idString, StringComparison.OrdinalIgnoreCase));
    }

    public DocumentTypeConfig? GetConfigForDocumentType(string alias)
    {
        var configs = LoadConfigs();
        return configs.FirstOrDefault(c =>
            c.DocumentTypeAlias.Equals(alias, StringComparison.OrdinalIgnoreCase));
    }

    public IReadOnlyList<DocumentTypeConfig> GetAllConfigs()
    {
        return LoadConfigs().AsReadOnly();
    }

    public List<string> ValidateConfig(DocumentTypeConfig config)
    {
        var errors = new List<string>();

        // Get valid destination keys (fields + block paths)
        var validDestinationKeys = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        // Add simple fields
        foreach (var field in config.Destination.Fields)
        {
            validDestinationKeys.Add(field.Key);
        }

        // Add block grid paths
        if (config.Destination.BlockGrids != null)
        {
            foreach (var grid in config.Destination.BlockGrids)
            {
                foreach (var block in grid.Blocks)
                {
                    if (block.Properties != null)
                    {
                        foreach (var prop in block.Properties)
                        {
                            // Add full path: gridKey.blockKey.propertyKey
                            validDestinationKeys.Add($"{grid.Key}.{block.Key}.{prop.Key}");
                        }
                    }
                }
            }
        }

        // Validate mappings against each source config
        foreach (var (sourceType, sourceConfig) in config.Sources)
        {
            var validSourceKeys = sourceConfig.Sections
                .Select(s => s.Key)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            foreach (var mapping in config.Map.Mappings)
            {
                if (!mapping.Enabled) continue;

                // Check source exists in this source config
                // This is a warning, not an error — map.json is a superset across all source types
                // A source type may not extract all sections (e.g., markdown may not have accommodation)
                if (!validSourceKeys.Contains(mapping.Source))
                {
                    errors.Add($"WARN: map.json source '{mapping.Source}' not found in source-{sourceType}.json (will be skipped for this source type)");
                }

                // Check each destination exists
                foreach (var dest in mapping.Destinations)
                {
                    if (!validDestinationKeys.Contains(dest.Target))
                    {
                        errors.Add($"map.json: target '{dest.Target}' not found in destination-blueprint.json");
                    }
                }
            }

            // Warn about unmapped required sections
            var mappedSources = config.Map.Mappings
                .Where(m => m.Enabled)
                .Select(m => m.Source)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            foreach (var section in sourceConfig.Sections.Where(s => s.Required))
            {
                if (!mappedSources.Contains(section.Key))
                {
                    errors.Add($"WARN: source-{sourceType}.json section '{section.Key}' (required: true) has no mapping");
                }
            }
        }

        return errors;
    }

    private List<DocumentTypeConfig> LoadConfigs()
    {
        if (_cache != null) return _cache;

        lock (_lock)
        {
            if (_cache != null) return _cache;

            var configs = new List<DocumentTypeConfig>();
            var mapsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "maps");

            if (!Directory.Exists(mapsDirectory))
            {
                _logger.LogInformation("UpDoc maps directory not found at {Path}. No configs loaded.", mapsDirectory);
                _cache = configs;
                return _cache;
            }

            // Look for subdirectories (each is a document type)
            var docTypeFolders = Directory.GetDirectories(mapsDirectory);
            _logger.LogInformation("Found {Count} document type folder(s) in {Path}", docTypeFolders.Length, mapsDirectory);

            foreach (var folderPath in docTypeFolders)
            {
                try
                {
                    var config = LoadDocumentTypeConfig(folderPath);
                    if (config != null)
                    {
                        // Validate cross-file references
                        var validationErrors = ValidateConfig(config);
                        if (validationErrors.Any(e => !e.StartsWith("WARN:")))
                        {
                            _logger.LogError("Config validation failed for {Folder}: {Errors}",
                                Path.GetFileName(folderPath), string.Join("; ", validationErrors));
                            continue;
                        }

                        // Log warnings
                        foreach (var warning in validationErrors.Where(e => e.StartsWith("WARN:")))
                        {
                            _logger.LogWarning("{Warning}", warning);
                        }

                        configs.Add(config);
                        _logger.LogInformation("Loaded config: {DocType} (blueprint: {Blueprint})",
                            config.DocumentTypeAlias, config.Destination.BlueprintId ?? "none");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to load config from folder: {Folder}", Path.GetFileName(folderPath));
                }
            }

            _cache = configs;
            return _cache;
        }
    }

    private DocumentTypeConfig? LoadDocumentTypeConfig(string folderPath)
    {
        var folderName = Path.GetFileName(folderPath);

        // File names are prefixed with folder name for clarity when multiple files are open
        var destinationFile = Path.Combine(folderPath, $"{folderName}-destination-blueprint.json");
        var mapFile = Path.Combine(folderPath, $"{folderName}-map.json");

        // Discover all source-*.json files
        var sourcePattern = $"{folderName}-source-*.json";
        var sourceFiles = Directory.GetFiles(folderPath, sourcePattern);

        if (sourceFiles.Length == 0)
        {
            _logger.LogWarning("Config folder {Folder} has no source files matching {Pattern}, skipping.", folderName, sourcePattern);
            return null;
        }

        if (!File.Exists(destinationFile))
        {
            _logger.LogWarning("Config folder {Folder} missing {FileName}, skipping.", folderName, $"{folderName}-destination-blueprint.json");
            return null;
        }

        if (!File.Exists(mapFile))
        {
            _logger.LogWarning("Config folder {Folder} missing {FileName}, skipping.", folderName, $"{folderName}-map.json");
            return null;
        }

        // Load source configs — extract source type from filename
        var sources = new Dictionary<string, SourceConfig>(StringComparer.OrdinalIgnoreCase);
        foreach (var sourceFile in sourceFiles)
        {
            var fileName = Path.GetFileNameWithoutExtension(sourceFile);
            // "{folderName}-source-{type}" → extract type
            var prefix = $"{folderName}-source-";
            if (!fileName.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)) continue;
            var sourceType = fileName[prefix.Length..];

            var sourceJson = File.ReadAllText(sourceFile);
            var source = JsonSerializer.Deserialize<SourceConfig>(sourceJson, JsonOptions);
            if (source != null)
            {
                sources[sourceType] = source;
                _logger.LogInformation("  Loaded source config: {SourceType} from {FileName}", sourceType, Path.GetFileName(sourceFile));
            }
        }

        if (sources.Count == 0)
        {
            _logger.LogWarning("Config folder {Folder} had source files but none deserialized, skipping.", folderName);
            return null;
        }

        // Load destination and map
        var destinationJson = File.ReadAllText(destinationFile);
        var destination = JsonSerializer.Deserialize<DestinationConfig>(destinationJson, JsonOptions);

        var mapJson = File.ReadAllText(mapFile);
        var map = JsonSerializer.Deserialize<MapConfig>(mapJson, JsonOptions);

        if (destination == null || map == null)
        {
            _logger.LogWarning("Failed to deserialize destination or map config in {Folder}.", folderName);
            return null;
        }

        if (string.IsNullOrEmpty(destination.DocumentTypeAlias))
        {
            _logger.LogWarning("Config folder {Folder} has no documentTypeAlias in destination.json, skipping.", folderName);
            return null;
        }

        return new DocumentTypeConfig
        {
            FolderPath = folderPath,
            DocumentTypeAlias = destination.DocumentTypeAlias,
            Sources = sources,
            Destination = destination,
            Map = map
        };
    }
}
