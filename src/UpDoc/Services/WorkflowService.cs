using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using UpDoc.Models;

namespace UpDoc.Services;

public interface IWorkflowService
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
    /// Gets all loaded document type configs (validated — only complete workflows).
    /// </summary>
    IReadOnlyList<DocumentTypeConfig> GetAllConfigs();

    /// <summary>
    /// Gets a workflow config by folder name, loading directly without validation.
    /// Used by workspace views that need to load partially-complete workflows.
    /// </summary>
    DocumentTypeConfig? GetConfigByName(string name);

    /// <summary>
    /// Validates cross-file references in a document type config.
    /// Returns a list of validation errors (empty if valid).
    /// </summary>
    List<string> ValidateConfig(DocumentTypeConfig config);

    /// <summary>
    /// Lists all workflow folders for the dashboard, including incomplete ones
    /// that don't have source files yet.
    /// </summary>
    IReadOnlyList<WorkflowSummary> GetAllWorkflowSummaries();

    /// <summary>
    /// Clears the cached configs so new workflows are discovered on next load.
    /// </summary>
    void ClearCache();

    /// <summary>
    /// Creates a new workflow folder with stub source, destination, and map files.
    /// </summary>
    void CreateWorkflow(string name, string documentTypeAlias, string sourceType, string? blueprintId, string? blueprintName);

    /// <summary>
    /// Deletes a workflow folder and all its files.
    /// </summary>
    void DeleteWorkflow(string name);

    /// <summary>
    /// Saves a DestinationConfig as destination.json in the workflow folder, replacing the existing file.
    /// </summary>
    void SaveDestinationConfig(string workflowName, DestinationConfig config);

    /// <summary>
    /// Saves a rich extraction result as sample-extraction.json in the workflow folder.
    /// </summary>
    void SaveSampleExtraction(string workflowName, RichExtractionResult extraction);

    /// <summary>
    /// Loads the stored sample-extraction.json from a workflow folder, if it exists.
    /// </summary>
    RichExtractionResult? GetSampleExtraction(string workflowName);

    /// <summary>
    /// Saves a MapConfig as map.json in the workflow folder, replacing the existing file.
    /// </summary>
    void SaveMapConfig(string workflowName, MapConfig config);
}

/// <summary>
/// Summary info for a workflow folder, used by the dashboard listing.
/// Includes incomplete workflows that don't have source files yet.
/// </summary>
public class WorkflowSummary
{
    public string Name { get; set; } = string.Empty;
    public string DocumentTypeAlias { get; set; } = string.Empty;
    public string? BlueprintId { get; set; }
    public string? BlueprintName { get; set; }
    public string[] SourceTypes { get; set; } = [];
    public int MappingCount { get; set; }
    public bool IsComplete { get; set; }
    public string[] ValidationWarnings { get; set; } = [];
}

public class WorkflowService : IWorkflowService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ILogger<WorkflowService> _logger;
    private List<DocumentTypeConfig>? _cache;
    private readonly object _lock = new();

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        ReadCommentHandling = JsonCommentHandling.Skip,
        AllowTrailingCommas = true,
    };

    public WorkflowService(IWebHostEnvironment webHostEnvironment, ILogger<WorkflowService> logger)
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

        // Get valid destination aliases (fields + block property aliases)
        var validDestinationKeys = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        // Add simple field aliases
        foreach (var field in config.Destination.Fields)
        {
            validDestinationKeys.Add(field.Alias);
        }

        // Add block property aliases
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
                            validDestinationKeys.Add(prop.Alias);
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

    public IReadOnlyList<WorkflowSummary> GetAllWorkflowSummaries()
    {
        var summaries = new List<WorkflowSummary>();
        var workflowsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows");

        if (!Directory.Exists(workflowsDirectory))
        {
            return summaries.AsReadOnly();
        }

        foreach (var folderPath in Directory.GetDirectories(workflowsDirectory))
        {
            var folderName = Path.GetFileName(folderPath);
            var summary = new WorkflowSummary { Name = folderName };

            // Format detection: source.json exists → new format, else → old prefixed format
            var isNewFormat = File.Exists(Path.Combine(folderPath, "source.json"));

            string destinationFile;
            string mapFile;

            if (isNewFormat)
            {
                destinationFile = Path.Combine(folderPath, "destination.json");
                mapFile = Path.Combine(folderPath, "map.json");

                // Read source types from source.json
                var sourceFile = Path.Combine(folderPath, "source.json");
                try
                {
                    var json = File.ReadAllText(sourceFile);
                    var source = JsonSerializer.Deserialize<SourceConfig>(json, JsonOptions);
                    if (source?.SourceTypes.Count > 0)
                    {
                        summary.SourceTypes = source.SourceTypes.ToArray();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to read source config for {Folder}", folderName);
                }
            }
            else
            {
                destinationFile = Path.Combine(folderPath, $"{folderName}-destination-blueprint.json");
                mapFile = Path.Combine(folderPath, $"{folderName}-map.json");

                // Discover source types from prefixed source files
                var sourcePattern = $"{folderName}-source-*.json";
                var sourceFiles = Directory.GetFiles(folderPath, sourcePattern);
                var sourceTypes = new List<string>();
                foreach (var sf in sourceFiles)
                {
                    var fileName = Path.GetFileNameWithoutExtension(sf);
                    var prefix = $"{folderName}-source-";
                    if (fileName.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                    {
                        sourceTypes.Add(fileName[prefix.Length..]);
                    }
                }
                summary.SourceTypes = sourceTypes.ToArray();
            }

            // Read destination config for metadata
            if (File.Exists(destinationFile))
            {
                try
                {
                    var json = File.ReadAllText(destinationFile);
                    var dest = JsonSerializer.Deserialize<DestinationConfig>(json, JsonOptions);
                    if (dest != null)
                    {
                        summary.DocumentTypeAlias = dest.DocumentTypeAlias;
                        summary.BlueprintId = dest.BlueprintId;
                        summary.BlueprintName = dest.BlueprintName;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to read destination config for {Folder}", folderName);
                }
            }

            // Read map config for mapping count
            if (File.Exists(mapFile))
            {
                try
                {
                    var json = File.ReadAllText(mapFile);
                    var map = JsonSerializer.Deserialize<MapConfig>(json, JsonOptions);
                    if (map != null)
                    {
                        summary.MappingCount = map.Mappings.Count(m => m.Enabled);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to read map config for {Folder}", folderName);
                }
            }

            // A workflow is complete when it has destination + map + at least one source
            summary.IsComplete = File.Exists(destinationFile)
                && File.Exists(mapFile)
                && summary.SourceTypes.Length > 0;

            // Get validation warnings for complete workflows
            if (summary.IsComplete)
            {
                var config = LoadConfigs().FirstOrDefault(c =>
                    Path.GetFileName(c.FolderPath).Equals(folderName, StringComparison.OrdinalIgnoreCase));
                if (config != null)
                {
                    summary.ValidationWarnings = ValidateConfig(config)
                        .Where(e => e.StartsWith("WARN:"))
                        .ToArray();
                }
            }

            summaries.Add(summary);
        }

        return summaries.AsReadOnly();
    }

    public void ClearCache()
    {
        lock (_lock)
        {
            _cache = null;
        }
    }

    public void CreateWorkflow(string name, string documentTypeAlias, string sourceType, string? blueprintId, string? blueprintName)
    {
        var workflowsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows");
        var folderPath = Path.Combine(workflowsDirectory, name);

        if (Directory.Exists(folderPath))
        {
            throw new InvalidOperationException($"Workflow folder '{name}' already exists.");
        }

        Directory.CreateDirectory(folderPath);

        var writeOptions = new JsonSerializerOptions { WriteIndented = true };

        // Create stub source.json (new simple naming convention)
        var source = new
        {
            version = "1.0",
            sourceTypes = new[] { sourceType },
            sections = Array.Empty<object>()
        };
        var sourceJson = JsonSerializer.Serialize(source, writeOptions);
        File.WriteAllText(Path.Combine(folderPath, "source.json"), sourceJson);

        // Create stub destination.json (new simple naming convention)
        var destination = new
        {
            version = "1.0",
            documentTypeAlias,
            blueprintId,
            blueprintName,
            fields = Array.Empty<object>(),
            blockGrids = Array.Empty<object>()
        };
        var destinationJson = JsonSerializer.Serialize(destination, writeOptions);
        File.WriteAllText(Path.Combine(folderPath, "destination.json"), destinationJson);

        // Create stub map.json (new simple naming convention)
        var map = new
        {
            version = "1.0",
            name = $"{name} Mapping",
            description = $"Mapping configuration for {name}",
            mappings = Array.Empty<object>()
        };
        var mapJson = JsonSerializer.Serialize(map, writeOptions);
        File.WriteAllText(Path.Combine(folderPath, "map.json"), mapJson);

        _logger.LogInformation("Created workflow folder: {Name} (docType: {DocType}, sourceType: {SourceType}, blueprint: {Blueprint})",
            name, documentTypeAlias, sourceType, blueprintId ?? "none");

        ClearCache();
    }

    public void DeleteWorkflow(string name)
    {
        var workflowsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows");
        var folderPath = Path.Combine(workflowsDirectory, name);

        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{name}' does not exist.");
        }

        // Safety: ensure the folder is actually inside the workflows directory
        var fullFolderPath = Path.GetFullPath(folderPath);
        var fullWorkflowsPath = Path.GetFullPath(workflowsDirectory);
        if (!fullFolderPath.StartsWith(fullWorkflowsPath, StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("Invalid workflow path.");
        }

        Directory.Delete(folderPath, recursive: true);

        _logger.LogInformation("Deleted workflow folder: {Name}", name);

        ClearCache();
    }

    public void SaveSampleExtraction(string workflowName, RichExtractionResult extraction)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{workflowName}' does not exist.");
        }

        var filePath = Path.Combine(folderPath, "sample-extraction.json");
        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(extraction, writeOptions);
        File.WriteAllText(filePath, json);

        _logger.LogInformation("Saved sample extraction to {Path} ({Count} elements)",
            filePath, extraction.Elements.Count);
    }

    public void SaveDestinationConfig(string workflowName, DestinationConfig config)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{workflowName}' does not exist.");
        }

        var filePath = Path.Combine(folderPath, "destination.json");
        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(config, writeOptions);
        File.WriteAllText(filePath, json);

        _logger.LogInformation("Saved destination config to {Path} ({FieldCount} fields, {BlockCount} block grids)",
            filePath, config.Fields.Count, config.BlockGrids?.Count ?? 0);

        ClearCache();
    }

    public void SaveMapConfig(string workflowName, MapConfig config)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{workflowName}' does not exist.");
        }

        var filePath = Path.Combine(folderPath, "map.json");
        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(config, writeOptions);
        File.WriteAllText(filePath, json);

        _logger.LogInformation("Saved map config to {Path} ({Count} mappings)",
            filePath, config.Mappings.Count);

        ClearCache();
    }

    public DocumentTypeConfig? GetConfigByName(string name)
    {
        var folderPath = GetWorkflowFolderPath(name);
        if (!Directory.Exists(folderPath))
            return null;

        try
        {
            return LoadDocumentTypeConfig(folderPath);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to load config for workflow '{Name}'", name);
            return null;
        }
    }

    public RichExtractionResult? GetSampleExtraction(string workflowName)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        var filePath = Path.Combine(folderPath, "sample-extraction.json");

        if (!File.Exists(filePath))
            return null;

        var json = File.ReadAllText(filePath);
        return JsonSerializer.Deserialize<RichExtractionResult>(json, JsonOptions);
    }

    private string GetWorkflowFolderPath(string workflowName)
    {
        return Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows", workflowName);
    }

    private List<DocumentTypeConfig> LoadConfigs()
    {
        if (_cache != null) return _cache;

        lock (_lock)
        {
            if (_cache != null) return _cache;

            var configs = new List<DocumentTypeConfig>();
            var workflowsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows");

            if (!Directory.Exists(workflowsDirectory))
            {
                _logger.LogInformation("UpDoc workflows directory not found at {Path}. No configs loaded.", workflowsDirectory);
                _cache = configs;
                return _cache;
            }

            // Look for subdirectories (each is a document type)
            var docTypeFolders = Directory.GetDirectories(workflowsDirectory);
            _logger.LogInformation("Found {Count} document type folder(s) in {Path}", docTypeFolders.Length, workflowsDirectory);

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

        // Format detection: source.json exists → new format, else → old prefixed format
        var isNewFormat = File.Exists(Path.Combine(folderPath, "source.json"));

        string destinationFile;
        string mapFile;

        if (isNewFormat)
        {
            destinationFile = Path.Combine(folderPath, "destination.json");
            mapFile = Path.Combine(folderPath, "map.json");
        }
        else
        {
            destinationFile = Path.Combine(folderPath, $"{folderName}-destination-blueprint.json");
            mapFile = Path.Combine(folderPath, $"{folderName}-map.json");
        }

        if (!File.Exists(destinationFile))
        {
            _logger.LogWarning("Config folder {Folder} missing destination file, skipping.", folderName);
            return null;
        }

        if (!File.Exists(mapFile))
        {
            _logger.LogWarning("Config folder {Folder} missing map file, skipping.", folderName);
            return null;
        }

        // Load source configs
        var sources = new Dictionary<string, SourceConfig>(StringComparer.OrdinalIgnoreCase);

        if (isNewFormat)
        {
            // New format: single source.json with sourceTypes array
            var sourceFile = Path.Combine(folderPath, "source.json");
            var sourceJson = File.ReadAllText(sourceFile);
            var source = JsonSerializer.Deserialize<SourceConfig>(sourceJson, JsonOptions);
            if (source != null && source.SourceTypes.Count > 0)
            {
                sources[source.SourceTypes[0]] = source;
                _logger.LogInformation("  Loaded source config: {SourceType} from source.json", source.SourceTypes[0]);
            }
        }
        else
        {
            // Old format: discover {folderName}-source-*.json files
            var sourcePattern = $"{folderName}-source-*.json";
            var sourceFiles = Directory.GetFiles(folderPath, sourcePattern);

            if (sourceFiles.Length == 0)
            {
                _logger.LogWarning("Config folder {Folder} has no source files matching {Pattern}, skipping.", folderName, sourcePattern);
                return null;
            }

            foreach (var sourceFile in sourceFiles)
            {
                var fileName = Path.GetFileNameWithoutExtension(sourceFile);
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
