namespace UpDoc.Models;

/// <summary>
/// Identity metadata for a workflow, stored as workflow.json in the workflow folder root.
/// Single source of truth for name, alias, document type, blueprint, and source type.
/// </summary>
public class WorkflowIdentity
{
    public string Name { get; set; } = string.Empty;
    public string Alias { get; set; } = string.Empty;
    public string DocumentTypeAlias { get; set; } = string.Empty;
    public string? DocumentTypeName { get; set; }
    public string? BlueprintId { get; set; }
    public string? BlueprintName { get; set; }
    public string SourceType { get; set; } = string.Empty;
    public string Version { get; set; } = "1.0";
}
