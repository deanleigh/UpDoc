using System.Text.Json.Serialization;

namespace UpDoc.Models;

/// <summary>
/// A set of rules for breaking a transform section into individually-mappable roles.
/// Keyed by transform section ID in source.json's sectionRules dictionary.
/// </summary>
public class SectionRuleSet
{
    [JsonPropertyName("rules")]
    public List<SectionRule> Rules { get; set; } = new();
}

/// <summary>
/// A single rule that assigns a role name to elements matching all conditions.
/// Rules are evaluated first-match-wins: an element claimed by one rule is excluded from later rules.
///
/// Action values (v2): sectionTitle, sectionContent, exclude
/// Legacy values still accepted: createSection → sectionTitle, setAsHeading → sectionTitle,
///   addAsContent → sectionContent (format=paragraph), addAsList → sectionContent (format=bulletListItem)
///
/// Format values (only when Action = sectionContent):
///   paragraph, heading1, heading2, heading3, bulletListItem, numberedListItem
/// </summary>
public class SectionRule
{
    [JsonPropertyName("role")]
    public string Role { get; set; } = string.Empty;

    [JsonPropertyName("action")]
    public string Action { get; set; } = "sectionTitle";

    /// <summary>
    /// Markdown format for sectionContent: paragraph, heading1, heading2, heading3, bulletListItem, numberedListItem.
    /// Null when Action is sectionTitle or exclude.
    /// </summary>
    [JsonPropertyName("format")]
    public string? Format { get; set; }

    [JsonPropertyName("conditions")]
    public List<RuleCondition> Conditions { get; set; } = new();

    /// <summary>
    /// Normalizes legacy action names to v2 names and infers format where applicable.
    /// Returns (normalizedAction, effectiveFormat).
    /// </summary>
    public (string Action, string? Format) GetNormalizedAction()
    {
        return Action switch
        {
            // Legacy → v2 mappings
            "createSection" => ("sectionTitle", null),
            "setAsHeading" => ("sectionTitle", null),
            "addAsContent" => ("sectionContent", Format ?? "paragraph"),
            "addAsList" => ("sectionContent", Format ?? "bulletListItem"),
            // v2 names pass through
            "sectionTitle" => ("sectionTitle", null),
            "sectionContent" => ("sectionContent", Format ?? "paragraph"),
            "exclude" => ("exclude", null),
            // Unknown → treat as sectionContent paragraph
            _ => ("sectionContent", Format ?? "paragraph"),
        };
    }
}

/// <summary>
/// A single condition within a rule. All conditions in a rule must match (AND logic).
/// </summary>
public class RuleCondition
{
    /// <summary>
    /// Condition type: textBeginsWith, textEndsWith, textContains, textMatchesPattern,
    /// fontSizeEquals, fontSizeAbove, fontSizeBelow, fontNameContains, colorEquals,
    /// positionFirst, positionLast
    /// </summary>
    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    /// <summary>
    /// The value to match against. Type depends on condition:
    /// string for text/font/color conditions, number (as string) for font size.
    /// Not used for positionFirst/positionLast.
    /// </summary>
    [JsonPropertyName("value")]
    public object? Value { get; set; }
}
