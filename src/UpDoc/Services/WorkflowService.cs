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
    void CreateWorkflow(string name, string documentTypeAlias, string sourceType, string? blueprintId, string? blueprintName, string? documentTypeName = null);

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

    /// <summary>
    /// Saves an area detection result as area-detection.json in the workflow folder.
    /// </summary>
    void SaveAreaDetection(string workflowName, AreaDetectionResult result);

    /// <summary>
    /// Loads the stored area-detection.json from a workflow folder, if it exists.
    /// Falls back to zone-detection.json for backwards compatibility.
    /// </summary>
    AreaDetectionResult? GetAreaDetection(string workflowName);

    /// <summary>
    /// Saves a transform result as transform.json in the workflow folder.
    /// </summary>
    void SaveTransformResult(string workflowName, TransformResult result);

    /// <summary>
    /// Loads the stored transform.json from a workflow folder, if it exists.
    /// </summary>
    TransformResult? GetTransformResult(string workflowName);

    /// <summary>
    /// Updates the Included flag for a single section in transform.json.
    /// Returns the updated TransformResult, or null if the workflow or section was not found.
    /// </summary>
    TransformResult? UpdateSectionInclusion(string workflowName, string sectionId, bool included);

    /// <summary>
    /// Loads the source.json from a workflow folder.
    /// </summary>
    SourceConfig? GetSourceConfig(string workflowName);

    /// <summary>
    /// Saves a SourceConfig as source.json in the workflow folder, replacing the existing file.
    /// </summary>
    void SaveSourceConfig(string workflowName, SourceConfig config);

    /// <summary>
    /// Saves an area template as area-template.json in the workflow folder.
    /// </summary>
    void SaveAreaTemplate(string workflowName, AreaTemplate template);

    /// <summary>
    /// Loads the stored area-template.json from a workflow folder, if it exists.
    /// Falls back to zone-template.json for backwards compatibility.
    /// </summary>
    AreaTemplate? GetAreaTemplate(string workflowName);
}

/// <summary>
/// Summary info for a workflow folder, used by the dashboard listing.
/// Includes incomplete workflows that don't have source files yet.
/// </summary>
public class WorkflowSummary
{
    public string Name { get; set; } = string.Empty;
    public string? DisplayName { get; set; }
    public string DocumentTypeAlias { get; set; } = string.Empty;
    public string? DocumentTypeName { get; set; }
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

        // Migrate existing workflows that don't have workflow.json yet
        MigrateExistingWorkflows();
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

        // Add block property aliases (Block Grids + Block Lists)
        foreach (var container in (config.Destination.BlockGrids ?? Enumerable.Empty<DestinationBlockGrid>())
            .Concat(config.Destination.BlockLists ?? Enumerable.Empty<DestinationBlockGrid>()))
        {
            foreach (var block in container.Blocks)
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

            // Try workflow.json first (new identity file)
            var identity = ReadWorkflowIdentity(folderPath);
            if (identity != null)
            {
                summary.DisplayName = identity.Name;
                summary.DocumentTypeAlias = identity.DocumentTypeAlias;
                summary.DocumentTypeName = identity.DocumentTypeName;
                summary.BlueprintId = identity.BlueprintId;
                summary.BlueprintName = identity.BlueprintName;
                if (!string.IsNullOrEmpty(identity.SourceType))
                {
                    summary.SourceTypes = [identity.SourceType];
                }
            }

            // Format detection: source.json exists → new format, else → old prefixed format
            var isNewFormat = File.Exists(Path.Combine(folderPath, "source.json"));

            string destinationFile;
            string mapFile;

            if (isNewFormat)
            {
                destinationFile = Path.Combine(folderPath, "destination.json");
                mapFile = Path.Combine(folderPath, "map.json");

                // Read source types from source.json (if not already set from workflow.json)
                if (summary.SourceTypes.Length == 0)
                {
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

            // Read destination config for metadata (fills in anything workflow.json didn't provide)
            if (string.IsNullOrEmpty(summary.DocumentTypeAlias) && File.Exists(destinationFile))
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

    public void CreateWorkflow(string name, string documentTypeAlias, string sourceType, string? blueprintId, string? blueprintName, string? documentTypeName = null)
    {
        var workflowsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows");
        var folderPath = Path.Combine(workflowsDirectory, name);

        if (Directory.Exists(folderPath))
        {
            throw new InvalidOperationException($"Workflow folder '{name}' already exists.");
        }

        Directory.CreateDirectory(folderPath);

        var writeOptions = new JsonSerializerOptions { WriteIndented = true };

        // Create workflow.json identity file
        var displayName = GenerateDisplayName(blueprintName, sourceType);
        var identity = new WorkflowIdentity
        {
            Name = displayName,
            Alias = name,
            DocumentTypeAlias = documentTypeAlias,
            DocumentTypeName = documentTypeName,
            BlueprintId = blueprintId,
            BlueprintName = blueprintName,
            SourceType = sourceType,
        };
        var identityJson = JsonSerializer.Serialize(identity, writeOptions);
        File.WriteAllText(Path.Combine(folderPath, "workflow.json"), identityJson);

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

        _logger.LogInformation("Created workflow folder: {Name} (displayName: {DisplayName}, docType: {DocType}, sourceType: {SourceType}, blueprint: {Blueprint})",
            name, displayName, documentTypeAlias, sourceType, blueprintId ?? "none");

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

    public void SaveAreaDetection(string workflowName, AreaDetectionResult result)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{workflowName}' does not exist.");
        }

        var filePath = Path.Combine(folderPath, "area-detection.json");
        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(result, writeOptions);
        File.WriteAllText(filePath, json);

        _logger.LogInformation("Saved area detection to {Path} ({Areas} areas, {Elements} elements)",
            filePath, result.Diagnostics.AreasDetected, result.Diagnostics.ElementsInAreas);
    }

    public AreaDetectionResult? GetAreaDetection(string workflowName)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        var filePath = Path.Combine(folderPath, "area-detection.json");

        if (!File.Exists(filePath))
        {
            // Backwards compatibility: try old filename
            var legacyPath = Path.Combine(folderPath, "zone-detection.json");
            if (!File.Exists(legacyPath))
                return null;

            var legacyJson = File.ReadAllText(legacyPath);
            return JsonSerializer.Deserialize<AreaDetectionResult>(legacyJson, JsonOptions);
        }

        var json = File.ReadAllText(filePath);
        return JsonSerializer.Deserialize<AreaDetectionResult>(json, JsonOptions);
    }

    public void SaveTransformResult(string workflowName, TransformResult result)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{workflowName}' does not exist.");
        }

        var filePath = Path.Combine(folderPath, "transform.json");
        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(result, writeOptions);
        File.WriteAllText(filePath, json);

        _logger.LogInformation("Saved transform result to {Path} ({Sections} sections)",
            filePath, result.AllSections.Count());
    }

    public TransformResult? GetTransformResult(string workflowName)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        var filePath = Path.Combine(folderPath, "transform.json");

        if (!File.Exists(filePath))
            return null;

        var json = File.ReadAllText(filePath);
        var result = JsonSerializer.Deserialize<TransformResult>(json, JsonOptions);

        // v1.0 files have flat "sections" array, no "areas". Return null to force re-transform.
        if (result != null && result.Areas.Count == 0 && result.Version != "2.0")
        {
            _logger.LogInformation("Transform result for '{Name}' is v1.0 format, needs re-transform", workflowName);
            return null;
        }

        return result;
    }

    public TransformResult? UpdateSectionInclusion(string workflowName, string sectionId, bool included)
    {
        var result = GetTransformResult(workflowName);
        if (result == null) return null;

        var section = result.AllSections.FirstOrDefault(s =>
            string.Equals(s.Id, sectionId, StringComparison.OrdinalIgnoreCase));
        if (section == null) return null;

        section.Included = included;
        SaveTransformResult(workflowName, result);

        _logger.LogInformation("Updated section '{SectionId}' in workflow '{Name}' to Included={Included}",
            sectionId, workflowName, included);

        return result;
    }

    public SourceConfig? GetSourceConfig(string workflowName)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        var filePath = Path.Combine(folderPath, "source.json");

        if (!File.Exists(filePath))
            return null;

        var json = File.ReadAllText(filePath);
        var config = JsonSerializer.Deserialize<SourceConfig>(json, JsonOptions);

        // Normalize legacy flat rules into groups for backward compatibility.
        // Old source.json files have sectionTitle/sectionContent as flat rules —
        // these need to be grouped so ContentTransformService treats them correctly.
        if (config?.AreaRules != null)
        {
            foreach (var (areaKey, areaRules) in config.AreaRules)
            {
                areaRules.NormalizeLegacyRules(areaKey);
            }
        }

        return config;
    }

    public void SaveSourceConfig(string workflowName, SourceConfig config)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{workflowName}' does not exist.");
        }

        var filePath = Path.Combine(folderPath, "source.json");
        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(config, writeOptions);
        File.WriteAllText(filePath, json);

        _logger.LogInformation("Saved source config to {Path}", filePath);

        ClearCache();
    }

    public void SaveAreaTemplate(string workflowName, AreaTemplate template)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        if (!Directory.Exists(folderPath))
        {
            throw new DirectoryNotFoundException($"Workflow folder '{workflowName}' does not exist.");
        }

        var filePath = Path.Combine(folderPath, "area-template.json");
        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var json = JsonSerializer.Serialize(template, writeOptions);
        File.WriteAllText(filePath, json);

        _logger.LogInformation("Saved area template to {Path} ({Count} areas)",
            filePath, template.Areas.Count);
    }

    public AreaTemplate? GetAreaTemplate(string workflowName)
    {
        var folderPath = GetWorkflowFolderPath(workflowName);
        var filePath = Path.Combine(folderPath, "area-template.json");

        if (!File.Exists(filePath))
        {
            // Backwards compatibility: try old filename
            var legacyPath = Path.Combine(folderPath, "zone-template.json");
            if (!File.Exists(legacyPath))
                return null;

            var legacyJson = File.ReadAllText(legacyPath);
            return JsonSerializer.Deserialize<AreaTemplate>(legacyJson, JsonOptions);
        }

        var json = File.ReadAllText(filePath);
        return JsonSerializer.Deserialize<AreaTemplate>(json, JsonOptions);
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

    /// <summary>
    /// Reads workflow.json from a workflow folder, if it exists.
    /// </summary>
    private WorkflowIdentity? ReadWorkflowIdentity(string folderPath)
    {
        var identityFile = Path.Combine(folderPath, "workflow.json");
        if (!File.Exists(identityFile))
            return null;

        try
        {
            var json = File.ReadAllText(identityFile);
            return JsonSerializer.Deserialize<WorkflowIdentity>(json, JsonOptions);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to read workflow.json in {Folder}", Path.GetFileName(folderPath));
            return null;
        }
    }

    /// <summary>
    /// Generates a display name from blueprint name and source type.
    /// e.g. "Group Tour" + "pdf" → "Group Tour - PDF"
    /// </summary>
    internal static string GenerateDisplayName(string? blueprintName, string sourceType)
    {
        var sourceLabel = FormatSourceTypeLabel(sourceType);
        return string.IsNullOrEmpty(blueprintName)
            ? sourceLabel
            : $"{blueprintName} - {sourceLabel}";
    }

    /// <summary>
    /// Formats a source type key into a human-readable label.
    /// "pdf" → "PDF", "web" → "Web Page", "markdown" → "Markdown"
    /// </summary>
    private static string FormatSourceTypeLabel(string sourceType)
    {
        return sourceType.ToLowerInvariant() switch
        {
            "pdf" => "PDF",
            "web" => "Web Page",
            "web page" => "Web Page",
            "markdown" => "Markdown",
            "doc" => "Word Document",
            _ => System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(sourceType)
        };
    }

    /// <summary>
    /// Scans all workflow folders and generates workflow.json for any that don't have one.
    /// Called on first access to ensure existing workflows are migrated.
    /// </summary>
    internal void MigrateExistingWorkflows()
    {
        var workflowsDirectory = Path.Combine(_webHostEnvironment.ContentRootPath, "updoc", "workflows");
        if (!Directory.Exists(workflowsDirectory))
            return;

        var writeOptions = new JsonSerializerOptions { WriteIndented = true };
        var migrated = 0;

        foreach (var folderPath in Directory.GetDirectories(workflowsDirectory))
        {
            var identityFile = Path.Combine(folderPath, "workflow.json");
            if (File.Exists(identityFile))
                continue;

            var folderName = Path.GetFileName(folderPath);

            // Read metadata from existing files
            string? documentTypeAlias = null;
            string? blueprintId = null;
            string? blueprintName = null;
            string? sourceType = null;

            // Try destination.json for blueprint/doctype info
            var destinationFile = Path.Combine(folderPath, "destination.json");
            if (File.Exists(destinationFile))
            {
                try
                {
                    var json = File.ReadAllText(destinationFile);
                    var dest = JsonSerializer.Deserialize<DestinationConfig>(json, JsonOptions);
                    if (dest != null)
                    {
                        documentTypeAlias = dest.DocumentTypeAlias;
                        blueprintId = dest.BlueprintId;
                        blueprintName = dest.BlueprintName;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Migration: failed to read destination.json in {Folder}", folderName);
                }
            }

            // Try source.json for source type
            var sourceFile = Path.Combine(folderPath, "source.json");
            if (File.Exists(sourceFile))
            {
                try
                {
                    var json = File.ReadAllText(sourceFile);
                    var source = JsonSerializer.Deserialize<SourceConfig>(json, JsonOptions);
                    sourceType = source?.SourceTypes?.FirstOrDefault();
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Migration: failed to read source.json in {Folder}", folderName);
                }
            }

            // Generate identity
            var identity = new WorkflowIdentity
            {
                Name = GenerateDisplayName(blueprintName, sourceType ?? "unknown"),
                Alias = folderName,
                DocumentTypeAlias = documentTypeAlias ?? string.Empty,
                DocumentTypeName = null, // Resolved at API level via IContentTypeService
                BlueprintId = blueprintId,
                BlueprintName = blueprintName,
                SourceType = sourceType ?? string.Empty,
            };

            try
            {
                var identityJson = JsonSerializer.Serialize(identity, writeOptions);
                File.WriteAllText(identityFile, identityJson);
                migrated++;
                _logger.LogInformation("Migration: generated workflow.json for '{Folder}' (name: {Name})",
                    folderName, identity.Name);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Migration: failed to write workflow.json for '{Folder}'", folderName);
            }
        }

        if (migrated > 0)
        {
            _logger.LogInformation("Migration: generated workflow.json for {Count} existing workflow(s)", migrated);
        }
    }
}
