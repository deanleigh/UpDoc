using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using UpDoc.Models;

namespace UpDoc.Services;

/// <summary>
/// Transforms zone detection output into assembled Markdown sections.
/// Pure function: ZoneDetectionResult → TransformResult.
/// </summary>
public interface IContentTransformService
{
    TransformResult Transform(ZoneDetectionResult zoneDetection, TransformResult? previous = null);
}

public class ContentTransformService : IContentTransformService
{
    private static readonly HashSet<char> BulletChars = new()
    {
        '•', '●', '○', '■', '□', '▪', '▫', '◆', '◇', '►', '▸', '\u2022'
    };

    public TransformResult Transform(ZoneDetectionResult zoneDetection, TransformResult? previous = null)
    {
        var result = new TransformResult();
        var diagnostics = new TransformDiagnostics();

        // Track seen IDs to deduplicate (same heading in multiple zones → same kebab ID)
        var seenIds = new Dictionary<string, int>();

        foreach (var page in zoneDetection.Pages)
        {
            for (int zoneIndex = 0; zoneIndex < page.Zones.Count; zoneIndex++)
            {
                var zone = page.Zones[zoneIndex];
                foreach (var section in zone.Sections)
                {
                    var transformed = TransformSection(section, page.Page, zone.Color, zoneIndex);
                    DeduplicateId(transformed, seenIds);
                    result.Sections.Add(transformed);
                    UpdateDiagnostics(diagnostics, transformed.Pattern);
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
        DetectedSection section, int page, string? zoneColor, int zoneIndex)
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
            id = $"preamble-p{page}-z{zoneIndex}";
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
            ZoneColor = string.IsNullOrEmpty(zoneColor) ? null : zoneColor,
            ChildCount = children.Count,
        };
    }

    /// <summary>
    /// Detects which assembly pattern best fits the section children.
    /// </summary>
    private static string DetectPattern(List<ZoneElement> children)
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
    private static bool HasSubHeadings(List<ZoneElement> children)
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
    private static string AssembleMarkdown(List<ZoneElement> children, string pattern)
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
    private static string AssembleBulletList(List<ZoneElement> children)
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
    private static string AssembleSubHeaded(List<ZoneElement> children)
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
    private static string AssembleParagraph(List<ZoneElement> children)
    {
        return string.Join("\n\n", children.Select(c => c.Text));
    }

    /// <summary>
    /// Preamble: joins children with single newlines.
    /// </summary>
    private static string AssemblePreamble(List<ZoneElement> children)
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
        }
    }
}
