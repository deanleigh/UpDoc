using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using UpDoc.Models;

namespace UpDoc.Services;

/// <summary>
/// Transforms area detection output into assembled Markdown sections.
/// Pure function: AreaDetectionResult → TransformResult.
/// </summary>
public interface IContentTransformService
{
    TransformResult Transform(AreaDetectionResult areaDetection, Dictionary<string, SectionRuleSet>? areaRules = null, TransformResult? previous = null);
}

public class ContentTransformService : IContentTransformService
{
    private static readonly HashSet<char> BulletChars = new()
    {
        '•', '●', '○', '■', '□', '▪', '▫', '◆', '◇', '►', '▸', '\u2022'
    };

    public TransformResult Transform(AreaDetectionResult areaDetection, Dictionary<string, SectionRuleSet>? areaRules = null, TransformResult? previous = null)
    {
        var result = new TransformResult();
        var diagnostics = new TransformDiagnostics();

        // Track seen IDs to deduplicate (same heading in multiple areas → same kebab ID)
        var seenIds = new Dictionary<string, int>();

        foreach (var page in areaDetection.Pages)
        {
            for (int areaIndex = 0; areaIndex < page.Areas.Count; areaIndex++)
            {
                var area = page.Areas[areaIndex];

                // Check if this area has rules that should produce individual sections
                var areaKey = !string.IsNullOrEmpty(area.Name) ? NormalizeToKebabCase(area.Name) : null;
                SectionRuleSet? ruleSet = null;
                if (areaKey != null && areaRules != null)
                {
                    areaRules.TryGetValue(areaKey, out ruleSet);
                }

                // For flat areas with rules, produce individual sections per role
                if (ruleSet != null && ruleSet.Rules.Count > 0 && IsFlatArea(area))
                {
                    var roleSections = TransformFlatAreaWithRules(
                        area, ruleSet, page.Page, areaIndex, seenIds, diagnostics);
                    result.Sections.AddRange(roleSections);
                }
                else
                {
                    // Normal processing: transform each detected section
                    foreach (var section in area.Sections)
                    {
                        var transformed = TransformSection(section, page.Page, area.Color, area.Name, areaIndex);
                        DeduplicateId(transformed, seenIds);
                        result.Sections.Add(transformed);
                        UpdateDiagnostics(diagnostics, transformed.Pattern);
                    }
                }
            }
        }

        // Preserve include/exclude state from previous transform
        if (previous != null)
        {
            var previousInclusion = new Dictionary<string, bool>();
            foreach (var s in previous.Sections)
            {
                previousInclusion.TryAdd(s.Id, s.Included);
            }

            foreach (var section in result.Sections)
            {
                if (previousInclusion.TryGetValue(section.Id, out var included))
                {
                    section.Included = included;
                }
            }
        }

        diagnostics.TotalSections = result.Sections.Count;
        result.Diagnostics = diagnostics;
        return result;
    }

    private static TransformedSection TransformSection(
        DetectedSection section, int page, string? areaColor, string? areaName, int areaIndex)
    {
        var heading = section.Heading;
        var children = section.Children;

        // Generate section ID
        string id;
        string? originalHeading = null;
        string? titleCasedHeading = null;

        if (heading != null)
        {
            originalHeading = heading.Text;
            titleCasedHeading = ToTitleCaseIfAllCaps(heading.Text);
            id = NormalizeToKebabCase(heading.Text);
        }
        else
        {
            id = $"preamble-p{page}-z{areaIndex}";
        }

        // Detect pattern and assemble Markdown
        var pattern = DetectPattern(children);
        var content = AssembleMarkdown(children, pattern);

        return new TransformedSection
        {
            Id = id,
            OriginalHeading = originalHeading,
            Heading = titleCasedHeading,
            Content = content,
            Pattern = pattern,
            Page = page,
            AreaColor = string.IsNullOrEmpty(areaColor) ? null : areaColor,
            AreaName = areaName,
            ChildCount = children.Count,
        };
    }

    /// <summary>
    /// Returns true if the area is "flat" — a single section with no heading.
    /// Flat areas are candidates for role-based splitting via area rules.
    /// </summary>
    private static bool IsFlatArea(DetectedArea area)
    {
        return area.Sections.Count == 1 && area.Sections[0].Heading == null;
    }

    /// <summary>
    /// Transforms a flat area using area rules to produce individual sections per role.
    /// Each rule matches elements (first-match-wins per element), and each role that
    /// has matched elements becomes its own TransformedSection.
    /// Unmatched elements are grouped into a remaining preamble section.
    /// </summary>
    private static List<TransformedSection> TransformFlatAreaWithRules(
        DetectedArea area, SectionRuleSet ruleSet, int page, int areaIndex,
        Dictionary<string, int> seenIds, TransformDiagnostics diagnostics)
    {
        var sections = new List<TransformedSection>();
        var flatSection = area.Sections[0];
        var elements = flatSection.Children;
        var total = elements.Count;

        // For each element, determine which rule (if any) claims it (first-match-wins)
        var elementRoles = new string?[elements.Count];
        for (int i = 0; i < elements.Count; i++)
        {
            foreach (var rule in ruleSet.Rules)
            {
                // Skip rules with no conditions — empty conditions match everything (vacuous truth)
                if (rule.Conditions.Count == 0)
                    continue;

                if (PdfPagePropertiesService.MatchesAllConditions(elements[i], rule.Conditions, i, total))
                {
                    elementRoles[i] = rule.Role;
                    break; // first-match-wins: move to next element
                }
            }
        }

        // Group claimed elements by role (preserving element order within each role)
        var roleElements = new Dictionary<string, List<AreaElement>>();
        var unclaimed = new List<AreaElement>();
        for (int i = 0; i < elements.Count; i++)
        {
            if (elementRoles[i] != null)
            {
                var role = elementRoles[i]!;
                if (!roleElements.ContainsKey(role))
                    roleElements[role] = new List<AreaElement>();
                roleElements[role].Add(elements[i]);
            }
            else
            {
                unclaimed.Add(elements[i]);
            }
        }

        // Create one section per role (in rule order, not element order)
        foreach (var rule in ruleSet.Rules)
        {
            if (roleElements.TryGetValue(rule.Role, out var roleEls) && roleEls.Count > 0)
            {
                var content = string.Join("\n\n", roleEls.Select(e => e.Text));
                var section = new TransformedSection
                {
                    Id = NormalizeToKebabCase(rule.Role),
                    Heading = rule.Role,
                    OriginalHeading = rule.Role,
                    Content = content,
                    Pattern = "role",
                    Page = page,
                    AreaColor = string.IsNullOrEmpty(area.Color) ? null : area.Color,
                    AreaName = area.Name,
                    ChildCount = roleEls.Count,
                };
                DeduplicateId(section, seenIds);
                sections.Add(section);
                UpdateDiagnostics(diagnostics, section.Pattern);
            }
        }

        // Unmatched elements: group into a remaining preamble section
        if (unclaimed.Count > 0)
        {
            var pattern = DetectPattern(unclaimed);
            var content = AssembleMarkdown(unclaimed, pattern);
            var remainingSection = new TransformedSection
            {
                Id = $"preamble-p{page}-z{areaIndex}",
                Heading = null,
                OriginalHeading = null,
                Content = content,
                Pattern = pattern,
                Page = page,
                AreaColor = string.IsNullOrEmpty(area.Color) ? null : area.Color,
                AreaName = area.Name,
                ChildCount = unclaimed.Count,
            };
            DeduplicateId(remainingSection, seenIds);
            sections.Add(remainingSection);
            UpdateDiagnostics(diagnostics, remainingSection.Pattern);
        }

        return sections;
    }

    /// <summary>
    /// Detects which assembly pattern best fits the section children.
    /// </summary>
    private static string DetectPattern(List<AreaElement> children)
    {
        if (children.Count == 0)
            return "preamble";

        // Count bullet children
        int bulletCount = 0;
        foreach (var child in children)
        {
            var trimmed = child.Text.TrimStart();
            if (trimmed.Length > 0 && BulletChars.Contains(trimmed[0]))
                bulletCount++;
        }

        // If >50% are bullets, it's a bullet list
        if (bulletCount > children.Count / 2)
            return "bulletList";

        // Check for sub-headings (children with fontSize > mode of section children)
        if (children.Count >= 2 && HasSubHeadings(children))
            return "subHeaded";

        return "paragraph";
    }

    /// <summary>
    /// Checks whether children contain sub-headings (e.g., Day 1, Day 2...).
    /// Uses the same mode font size algorithm as GroupIntoSections.
    /// </summary>
    private static bool HasSubHeadings(List<AreaElement> children)
    {
        var fontSizeCounts = new Dictionary<double, int>();
        foreach (var el in children)
        {
            var size = Math.Round(el.FontSize, 1);
            fontSizeCounts[size] = fontSizeCounts.GetValueOrDefault(size) + 1;
        }

        var bodySize = fontSizeCounts.OrderByDescending(kvp => kvp.Value).First().Key;

        // Count children with font size > mode
        int subHeadingCount = 0;
        foreach (var el in children)
        {
            if (Math.Round(el.FontSize, 1) > bodySize)
                subHeadingCount++;
        }

        // Need at least 2 sub-headings and they shouldn't be the majority
        return subHeadingCount >= 2 && subHeadingCount < children.Count;
    }

    /// <summary>
    /// Assembles Markdown from section children based on the detected pattern.
    /// </summary>
    private static string AssembleMarkdown(List<AreaElement> children, string pattern)
    {
        if (children.Count == 0)
            return string.Empty;

        return pattern switch
        {
            "bulletList" => AssembleBulletList(children),
            "subHeaded" => AssembleSubHeaded(children),
            "paragraph" => AssembleParagraph(children),
            _ => AssemblePreamble(children),
        };
    }

    /// <summary>
    /// Strips bullet chars and produces a Markdown bulleted list.
    /// </summary>
    private static string AssembleBulletList(List<AreaElement> children)
    {
        var sb = new StringBuilder();
        foreach (var child in children)
        {
            var text = StripBulletPrefix(child.Text);
            sb.AppendLine($"- {text}");
        }
        return sb.ToString().TrimEnd();
    }

    /// <summary>
    /// Assembles sub-headed content with ## headings and paragraph body text.
    /// Children with fontSize > mode become ## sub-headings.
    /// </summary>
    private static string AssembleSubHeaded(List<AreaElement> children)
    {
        // Compute mode font size of children
        var fontSizeCounts = new Dictionary<double, int>();
        foreach (var el in children)
        {
            var size = Math.Round(el.FontSize, 1);
            fontSizeCounts[size] = fontSizeCounts.GetValueOrDefault(size) + 1;
        }
        var bodySize = fontSizeCounts.OrderByDescending(kvp => kvp.Value).First().Key;

        var sb = new StringBuilder();
        bool firstSection = true;

        foreach (var child in children)
        {
            var isSubHeading = Math.Round(child.FontSize, 1) > bodySize;

            if (isSubHeading)
            {
                if (!firstSection)
                    sb.AppendLine();
                sb.AppendLine($"## {child.Text}");
                firstSection = false;
            }
            else
            {
                // Body text — append as paragraph
                sb.AppendLine(child.Text);
            }
        }

        return sb.ToString().TrimEnd();
    }

    /// <summary>
    /// Joins children as paragraph text with double newlines between them.
    /// </summary>
    private static string AssembleParagraph(List<AreaElement> children)
    {
        return string.Join("\n\n", children.Select(c => c.Text));
    }

    /// <summary>
    /// Preamble: joins children with single newlines.
    /// </summary>
    private static string AssemblePreamble(List<AreaElement> children)
    {
        return string.Join("\n", children.Select(c => c.Text));
    }

    /// <summary>
    /// Strips leading bullet character and whitespace from text.
    /// "• 4* central Dresden hotel" → "4* central Dresden hotel"
    /// </summary>
    private static string StripBulletPrefix(string text)
    {
        var trimmed = text.TrimStart();
        if (trimmed.Length > 0 && BulletChars.Contains(trimmed[0]))
        {
            return trimmed[1..].TrimStart();
        }
        return text;
    }

    /// <summary>
    /// Converts ALL CAPS text to Title Case. Mixed case text is left as-is.
    /// "FEATURES" → "Features", "WHAT WE WILL SEE" → "What We Will See"
    /// "Day 1" → "Day 1" (already mixed case, unchanged)
    /// </summary>
    private static string ToTitleCaseIfAllCaps(string text)
    {
        // Check if all alphabetic characters are uppercase
        bool hasAlpha = false;
        bool allCaps = true;
        foreach (var c in text)
        {
            if (char.IsLetter(c))
            {
                hasAlpha = true;
                if (!char.IsUpper(c))
                {
                    allCaps = false;
                    break;
                }
            }
        }

        if (!hasAlpha || !allCaps)
            return text;

        return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(text.ToLower(CultureInfo.CurrentCulture));
    }

    /// <summary>
    /// Normalizes text to kebab-case for use as a section ID.
    /// "FEATURES" → "features", "WHAT WE WILL SEE" → "what-we-will-see"
    /// </summary>
    private static string NormalizeToKebabCase(string text)
    {
        // Lowercase, replace non-alphanumeric with hyphens, collapse multiples
        var lower = text.ToLower(CultureInfo.InvariantCulture).Trim();
        var kebab = Regex.Replace(lower, @"[^a-z0-9]+", "-");
        return kebab.Trim('-');
    }

    /// <summary>
    /// Ensures section IDs are unique by appending a numeric suffix for duplicates.
    /// "features" stays "features", second occurrence becomes "features-2", etc.
    /// </summary>
    private static void DeduplicateId(TransformedSection section, Dictionary<string, int> seenIds)
    {
        var baseId = section.Id;
        if (seenIds.TryGetValue(baseId, out var count))
        {
            seenIds[baseId] = count + 1;
            section.Id = $"{baseId}-{count + 1}";
        }
        else
        {
            seenIds[baseId] = 1;
        }
    }

    private static void UpdateDiagnostics(TransformDiagnostics diagnostics, string pattern)
    {
        switch (pattern)
        {
            case "bulletList": diagnostics.BulletListSections++; break;
            case "paragraph": diagnostics.ParagraphSections++; break;
            case "subHeaded": diagnostics.SubHeadedSections++; break;
            case "preamble": diagnostics.PreambleSections++; break;
            case "role": diagnostics.RoleSections++; break;
        }
    }
}
