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
/// </summary>
public class SectionRule
{
    [JsonPropertyName("role")]
    public string Role { get; set; } = string.Empty;

    [JsonPropertyName("action")]
    public string Action { get; set; } = "createSection";

    [JsonPropertyName("conditions")]
    public List<RuleCondition> Conditions { get; set; } = new();
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
