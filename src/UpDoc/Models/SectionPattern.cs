using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// A pattern that identifies section heading elements within an area.
/// Elements matching ALL conditions become section boundaries.
/// Each heading + following non-heading elements = one section.
///
/// Stored per area in area-template.json via AreaDefinition.SectionPattern.
///
/// Null pattern = area not yet configured (use auto-detect for backwards compatibility).
/// Empty conditions = explicitly no section headings (one flat section).
/// Populated conditions = user-defined pattern from teach-by-example.
/// </summary>
public class SectionPattern
{
    /// <summary>
    /// Conditions that identify section heading elements.
    /// All conditions must match (AND logic) for an element to be a section heading.
    /// Reuses the existing RuleCondition type from SectionRules.cs.
    /// </summary>
    [JsonPropertyName("conditions")]
    public List<RuleCondition> Conditions { get; set; } = new();
}
