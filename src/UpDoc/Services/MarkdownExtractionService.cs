using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using UpDoc.Models;

namespace UpDoc.Services;

public interface IMarkdownExtractionService
{
    ExtractionResult ExtractSectionsFromConfig(string filePath, SourceConfig sourceConfig);
}

public class MarkdownExtractionService : IMarkdownExtractionService
{
    private readonly ILogger<MarkdownExtractionService> _logger;

    public MarkdownExtractionService(ILogger<MarkdownExtractionService> logger)
    {
        _logger = logger;
    }

    public ExtractionResult ExtractSectionsFromConfig(string filePath, SourceConfig sourceConfig)
    {
        try
        {
            var rawText = File.ReadAllText(filePath);
            var lines = rawText.Split('\n').Select(l => l.TrimEnd('\r')).ToArray();

            var sections = new Dictionary<string, string>();

            foreach (var section in sourceConfig.Sections)
            {
                var extracted = section.Strategy switch
                {
                    "firstHeading" => ExtractFirstHeading(lines, section),
                    "firstParagraph" => ExtractFirstParagraph(lines, section),
                    "betweenPatterns" => ExtractBetweenPatterns(lines, section),
                    "regex" => ExtractByRegex(lines, section),
                    _ => null
                };

                if (extracted != null)
                {
                    sections[section.Key] = extracted;
                    _logger.LogInformation("  {Key} ({Strategy}): {Length} chars",
                        section.Key, section.Strategy, extracted.Length);
                }
                else if (section.Required)
                {
                    _logger.LogWarning("  {Key} ({Strategy}): MISSING (required)", section.Key, section.Strategy);
                }
            }

            return new ExtractionResult
            {
                Sections = sections,
                RawText = rawText,
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to extract sections from markdown file: {FilePath}", filePath);
            return new ExtractionResult { Error = $"Failed to read markdown file: {ex.Message}" };
        }
    }

    private static string? ExtractFirstHeading(string[] lines, SourceSection section)
    {
        var level = section.StrategyParams?.Level ?? 1;
        var prefix = new string('#', level) + " ";

        foreach (var line in lines)
        {
            if (line.StartsWith(prefix) && (line.Length == level + 1 || line[level + 1] != '#'))
            {
                return line[prefix.Length..].Trim();
            }
        }

        return null;
    }

    private static string? ExtractFirstParagraph(string[] lines, SourceSection section)
    {
        // Find the first non-empty, non-heading line
        var foundHeading = false;

        foreach (var line in lines)
        {
            // Skip until we've passed the first heading
            if (line.StartsWith('#'))
            {
                foundHeading = true;
                continue;
            }

            // Skip empty lines
            if (string.IsNullOrWhiteSpace(line))
                continue;

            // If we've passed a heading, take the first paragraph
            if (foundHeading)
                return line.Trim();
        }

        return null;
    }

    private static string? ExtractBetweenPatterns(string[] lines, SourceSection section)
    {
        var startPattern = section.StrategyParams?.StartPattern;
        if (string.IsNullOrEmpty(startPattern)) return null;

        var stopPatterns = section.StrategyParams?.StopPatterns ?? new List<string>();
        var includeStartLine = section.StrategyParams?.IncludeStartLine ?? true;

        var capturing = false;
        var result = new List<string>();

        foreach (var line in lines)
        {
            // Check for stop patterns
            if (capturing && stopPatterns.Count > 0)
            {
                var shouldStop = stopPatterns.Any(sp =>
                    Regex.IsMatch(line, sp, RegexOptions.IgnoreCase));
                if (shouldStop) break;
            }

            // Check for start pattern
            if (Regex.IsMatch(line, startPattern, RegexOptions.IgnoreCase))
            {
                capturing = true;

                if (includeStartLine)
                {
                    result.Add(line);
                }
                continue;
            }

            if (capturing)
            {
                result.Add(line);
            }
        }

        if (result.Count == 0) return null;

        // Trim leading/trailing blank lines
        var text = string.Join("\n", result).Trim();
        return string.IsNullOrWhiteSpace(text) ? null : text;
    }

    private static string? ExtractByRegex(string[] lines, SourceSection section)
    {
        var pattern = section.StrategyParams?.Pattern;
        if (string.IsNullOrEmpty(pattern)) return null;

        var flags = section.StrategyParams?.Flags ?? "";
        var options = flags.Contains('i') ? RegexOptions.IgnoreCase : RegexOptions.None;

        foreach (var line in lines)
        {
            var match = Regex.Match(line, pattern, options);
            if (match.Success)
            {
                var captureGroup = section.StrategyParams?.CaptureGroup ?? 0;
                return match.Groups.Count > captureGroup
                    ? match.Groups[captureGroup].Value.Trim()
                    : match.Value.Trim();
            }
        }

        return null;
    }
}
