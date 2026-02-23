using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using UpDoc.Models;

namespace UpDoc.Services;

public interface IMarkdownExtractionService
{
    ExtractionResult ExtractSectionsFromConfig(string filePath, SourceConfig sourceConfig);
    RichExtractionResult ExtractRich(string filePath);
}

public class MarkdownExtractionService : IMarkdownExtractionService
{
    private readonly ILogger<MarkdownExtractionService> _logger;

    public MarkdownExtractionService(ILogger<MarkdownExtractionService> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Parse a markdown file into RichExtractionResult format — each heading and body
    /// paragraph becomes an ExtractionElement. This enables the Source tab to display
    /// markdown content with the same element-based UI as PDF extractions.
    /// </summary>
    public RichExtractionResult ExtractRich(string filePath)
    {
        try
        {
            var rawText = File.ReadAllText(filePath);
            var lines = rawText.Split('\n').Select(l => l.TrimEnd('\r')).ToArray();
            var elements = new List<ExtractionElement>();
            var elementIndex = 0;

            var bodyLines = new List<string>();

            for (var i = 0; i < lines.Length; i++)
            {
                var line = lines[i];

                // Detect heading lines
                if (line.StartsWith('#'))
                {
                    // Flush any accumulated body text first
                    if (bodyLines.Count > 0)
                    {
                        var bodyText = string.Join("\n", bodyLines).Trim();
                        if (!string.IsNullOrWhiteSpace(bodyText))
                        {
                            elements.Add(new ExtractionElement
                            {
                                Id = $"md-{elementIndex++}",
                                Page = 1,
                                Text = bodyText,
                                Metadata = new ElementMetadata()
                            });
                        }
                        bodyLines.Clear();
                    }

                    // Count heading level
                    var level = 0;
                    while (level < line.Length && line[level] == '#') level++;
                    var headingText = line[level..].Trim();

                    if (!string.IsNullOrWhiteSpace(headingText))
                    {
                        elements.Add(new ExtractionElement
                        {
                            Id = $"md-{elementIndex++}",
                            Page = 1,
                            Text = headingText,
                            Metadata = new ElementMetadata
                            {
                                // Use fontSize as a proxy for heading level (larger = higher level)
                                FontSize = level switch
                                {
                                    1 => 24,
                                    2 => 20,
                                    3 => 16,
                                    4 => 14,
                                    5 => 12,
                                    _ => 10
                                },
                                FontName = $"heading-{level}"
                            }
                        });
                    }
                }
                else if (string.IsNullOrWhiteSpace(line))
                {
                    // Blank line — flush accumulated body text as one element
                    if (bodyLines.Count > 0)
                    {
                        var bodyText = string.Join("\n", bodyLines).Trim();
                        if (!string.IsNullOrWhiteSpace(bodyText))
                        {
                            elements.Add(new ExtractionElement
                            {
                                Id = $"md-{elementIndex++}",
                                Page = 1,
                                Text = bodyText,
                                Metadata = new ElementMetadata()
                            });
                        }
                        bodyLines.Clear();
                    }
                }
                else
                {
                    bodyLines.Add(line);
                }
            }

            // Flush any remaining body text
            if (bodyLines.Count > 0)
            {
                var bodyText = string.Join("\n", bodyLines).Trim();
                if (!string.IsNullOrWhiteSpace(bodyText))
                {
                    elements.Add(new ExtractionElement
                    {
                        Id = $"md-{elementIndex++}",
                        Page = 1,
                        Text = bodyText,
                        Metadata = new ElementMetadata()
                    });
                }
            }

            _logger.LogInformation("Extracted {Count} elements from markdown file: {FilePath}",
                elements.Count, filePath);

            return new RichExtractionResult
            {
                SourceType = "markdown",
                Source = new ExtractionSource
                {
                    ExtractedDate = DateTime.UtcNow,
                    TotalPages = 1,
                },
                Elements = elements
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to extract rich elements from markdown file: {FilePath}", filePath);
            return new RichExtractionResult
            {
                SourceType = "markdown",
                Error = $"Failed to read markdown file: {ex.Message}"
            };
        }
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
