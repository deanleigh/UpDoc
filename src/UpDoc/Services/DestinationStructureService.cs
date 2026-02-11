using Microsoft.Extensions.Logging;
using UpDoc.Models;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;

namespace UpDoc.Services;

public interface IDestinationStructureService
{
    /// <summary>
    /// Builds a DestinationConfig by introspecting the Umbraco document type.
    /// Walks property groups (tabs), maps property editor aliases to UpDoc field types,
    /// and resolves block grid configurations including element type properties.
    /// </summary>
    Task<DestinationConfig> BuildDestinationConfigAsync(
        string documentTypeAlias,
        string? blueprintId,
        string? blueprintName);
}

public class DestinationStructureService : IDestinationStructureService
{
    private readonly IContentTypeService _contentTypeService;
    private readonly IDataTypeService _dataTypeService;
    private readonly ILogger<DestinationStructureService> _logger;

    public DestinationStructureService(
        IContentTypeService contentTypeService,
        IDataTypeService dataTypeService,
        ILogger<DestinationStructureService> logger)
    {
        _contentTypeService = contentTypeService;
        _dataTypeService = dataTypeService;
        _logger = logger;
    }

    public async Task<DestinationConfig> BuildDestinationConfigAsync(
        string documentTypeAlias,
        string? blueprintId,
        string? blueprintName)
    {
        var contentType = _contentTypeService.Get(documentTypeAlias);
        if (contentType == null)
        {
            throw new InvalidOperationException($"Document type '{documentTypeAlias}' not found.");
        }

        var config = new DestinationConfig
        {
            Version = "1.0",
            DocumentTypeAlias = documentTypeAlias,
            DocumentTypeName = contentType.Name,
            BlueprintId = blueprintId,
            BlueprintName = blueprintName,
            Fields = new List<DestinationField>(),
            BlockGrids = new List<DestinationBlockGrid>()
        };

        // Walk property groups (tabs) and their properties — use CompositionPropertyGroups
        // to include properties from compositions, not just directly-defined ones
        var groupedPropertyAliases = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        foreach (var group in contentType.CompositionPropertyGroups.OrderBy(g => g.SortOrder))
        {
            var tabName = group.Name ?? "General";

            foreach (var propertyType in group.PropertyTypes?.OrderBy(p => p.SortOrder) ?? Enumerable.Empty<IPropertyType>())
            {
                groupedPropertyAliases.Add(propertyType.Alias);

                if (propertyType.PropertyEditorAlias == "Umbraco.BlockGrid")
                {
                    var blockGrid = await BuildBlockGridAsync(propertyType, tabName);
                    if (blockGrid != null)
                    {
                        config.BlockGrids!.Add(blockGrid);
                    }
                }
                else
                {
                    config.Fields.Add(BuildField(propertyType, tabName));
                }
            }
        }

        // Handle ungrouped composition properties (not in any group)
        foreach (var propertyType in contentType.CompositionPropertyTypes
            .Where(p => !groupedPropertyAliases.Contains(p.Alias))
            .OrderBy(p => p.SortOrder))
        {
            if (propertyType.PropertyEditorAlias == "Umbraco.BlockGrid")
            {
                var blockGrid = await BuildBlockGridAsync(propertyType, "General");
                if (blockGrid != null)
                {
                    config.BlockGrids!.Add(blockGrid);
                }
            }
            else
            {
                config.Fields.Add(BuildField(propertyType, "General"));
            }
        }

        _logger.LogInformation(
            "Built destination config for '{Alias}': {FieldCount} fields, {BlockGridCount} block grids",
            documentTypeAlias, config.Fields.Count, config.BlockGrids?.Count ?? 0);

        return config;
    }

    private DestinationField BuildField(IPropertyType propertyType, string tabName)
    {
        var fieldType = MapEditorAlias(propertyType.PropertyEditorAlias);

        return new DestinationField
        {
            Key = propertyType.Key.ToString(),
            Alias = propertyType.Alias,
            Label = propertyType.Name ?? propertyType.Alias,
            Description = propertyType.Description,
            Type = fieldType,
            Tab = tabName,
            Mandatory = propertyType.Mandatory,
            AcceptsFormats = GetAcceptsFormats(fieldType)
        };
    }

    private async Task<DestinationBlockGrid?> BuildBlockGridAsync(IPropertyType propertyType, string tabName)
    {
        var dataType = await _dataTypeService.GetAsync(propertyType.DataTypeKey);
        if (dataType?.ConfigurationObject is not BlockGridConfiguration blockGridConfig)
        {
            _logger.LogWarning(
                "Could not read BlockGrid configuration for property '{Alias}' (DataTypeKey: {Key})",
                propertyType.Alias, propertyType.DataTypeKey);
            return null;
        }

        var blockGrid = new DestinationBlockGrid
        {
            Key = propertyType.Key.ToString(),
            Alias = propertyType.Alias,
            Label = propertyType.Name ?? propertyType.Alias,
            Description = propertyType.Description,
            Blocks = new List<DestinationBlock>()
        };

        foreach (var blockConfig in blockGridConfig.Blocks ?? Array.Empty<BlockGridConfiguration.BlockGridBlockConfiguration>())
        {
            var elementType = _contentTypeService.Get(blockConfig.ContentElementTypeKey);
            if (elementType == null)
            {
                _logger.LogWarning(
                    "Element type not found for ContentElementTypeKey '{Key}' in block grid '{Alias}'",
                    blockConfig.ContentElementTypeKey, propertyType.Alias);
                continue;
            }

            var block = new DestinationBlock
            {
                Key = blockConfig.ContentElementTypeKey.ToString(),
                ContentTypeAlias = elementType.Alias,
                ContentTypeKey = blockConfig.ContentElementTypeKey.ToString(),
                Label = elementType.Name ?? elementType.Alias,
                Description = elementType.Description,
                Properties = new List<BlockProperty>()
            };

            // Walk element type properties
            foreach (var elementProp in elementType.PropertyTypes.OrderBy(p => p.SortOrder))
            {
                var propType = MapEditorAlias(elementProp.PropertyEditorAlias);
                block.Properties.Add(new BlockProperty
                {
                    Key = elementProp.Key.ToString(),
                    Alias = elementProp.Alias,
                    Label = elementProp.Name,
                    Type = propType,
                    AcceptsFormats = GetAcceptsFormats(propType)
                });
            }

            blockGrid.Blocks.Add(block);
        }

        return blockGrid;
    }

    private static string MapEditorAlias(string editorAlias) => editorAlias switch
    {
        "Umbraco.TextBox" => "text",
        "Umbraco.TextArea" => "textArea",
        "Umbraco.RichText" or "Umbraco.TinyMCE" => "richText",
        "Umbraco.Integer" or "Umbraco.Decimal" => "number",
        "Umbraco.DateTime" => "date",
        "Umbraco.TrueFalse" => "boolean",
        "Umbraco.MediaPicker3" => "mediaPicker",
        "Umbraco.ContentPicker" or "Umbraco.MultiNodeTreePicker" => "contentPicker",
        "Umbraco.BlockList" => "blockList",
        _ => "text"
    };

    private static List<string> GetAcceptsFormats(string fieldType) => fieldType switch
    {
        "richText" => new List<string> { "html", "markdown", "text" },
        "textArea" => new List<string> { "text", "markdown" },
        _ => new List<string> { "text" }
    };
}
