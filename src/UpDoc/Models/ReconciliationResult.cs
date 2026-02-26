using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// Result of reconciling map.json blockKeys after destination.json regeneration.
/// </summary>
public class ReconciliationResult
{
    [JsonPropertyName("updated")]
    public int Updated { get; set; }

    [JsonPropertyName("orphaned")]
    public int Orphaned { get; set; }

    [JsonPropertyName("details")]
    public List<ReconciliationDetail> Details { get; set; } = new();
}

/// <summary>
/// Detail of a single blockKey reconciliation action.
/// </summary>
public class ReconciliationDetail
{
    [JsonPropertyName("contentTypeKey")]
    public string ContentTypeKey { get; set; } = string.Empty;

    [JsonPropertyName("contentTypeAlias")]
    public string? ContentTypeAlias { get; set; }

    [JsonPropertyName("oldBlockKey")]
    public string OldBlockKey { get; set; } = string.Empty;

    [JsonPropertyName("newBlockKey")]
    public string? NewBlockKey { get; set; }

    [JsonPropertyName("action")]
    public string Action { get; set; } = string.Empty; // "updated" or "orphaned"
}

/// <summary>
/// Response from the regenerate-destination endpoint, including reconciliation info.
/// </summary>
public class RegenerateDestinationResponse
{
    [JsonPropertyName("destination")]
    public DestinationConfig Destination { get; set; } = new();

    [JsonPropertyName("reconciliation")]
    public ReconciliationResult Reconciliation { get; set; } = new();
}
