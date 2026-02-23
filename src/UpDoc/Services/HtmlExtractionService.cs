using AngleSharp;
using AngleSharp.Dom;
using Microsoft.Extensions.Logging;
using UpDoc.Models;

namespace UpDoc.Services;

public interface IHtmlExtractionService
{
    Task<RichExtractionResult> ExtractRichFromUrl(string url);
    RichExtractionResult ExtractRichFromFile(string filePath);
}

public class HtmlExtractionService : IHtmlExtractionService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<HtmlExtractionService> _logger;

    public HtmlExtractionService(
        IHttpClientFactory httpClientFactory,
        ILogger<HtmlExtractionService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    /// <summary>
    /// Fetches HTML from a URL and extracts structured content.
    /// </summary>
    public async Task<RichExtractionResult> ExtractRichFromUrl(string url)
    {
        try
        {
            var client = _httpClientFactory.CreateClient("UpDocHtml");
            var html = await client.GetStringAsync(url);

            return await ExtractRichFromHtml(html, url);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch HTML from URL: {Url}", url);
            return new RichExtractionResult
            {
                SourceType = "web",
                Error = $"Failed to fetch URL: {ex.Message}"
            };
        }
    }

    /// <summary>
    /// Reads an HTML file from disk and extracts structured content.
    /// Fallback for when URL-based fetching doesn't work (scraping protection, etc.)
    /// </summary>
    public RichExtractionResult ExtractRichFromFile(string filePath)
    {
        try
        {
            var html = File.ReadAllText(filePath);
            return ExtractRichFromHtml(html, filePath).GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to extract from HTML file: {FilePath}", filePath);
            return new RichExtractionResult
            {
                SourceType = "web",
                Error = $"Failed to read HTML file: {ex.Message}"
            };
        }
    }

    private async Task<RichExtractionResult> ExtractRichFromHtml(string html, string source)
    {
        var config = Configuration.Default;
        var context = BrowsingContext.New(config);
        var document = await context.OpenAsync(req => req.Content(html));

        // Extract from the full body — area detection tags each element with its container area.
        // Previous approach used FindContentRoot() which discarded header/footer/sidebar content.
        // Now we keep everything and let the UI's include/exclude toggles handle filtering.
        var body = document.Body ?? document.DocumentElement;

        var elements = new List<ExtractionElement>();
        var elementIndex = 0;

        ExtractElements(body, elements, ref elementIndex, "Ungrouped");

        // Strip empty elements
        elements = elements.Where(e => !string.IsNullOrWhiteSpace(e.Text)).ToList();

        _logger.LogInformation("Extracted {Count} elements from HTML: {Source}",
            elements.Count, source);

        // Log area distribution
        var areaGroups = elements.GroupBy(e => e.Metadata.HtmlArea).OrderByDescending(g => g.Count());
        foreach (var group in areaGroups)
        {
            _logger.LogDebug("  Area '{Area}': {Count} elements", group.Key, group.Count());
        }

        return new RichExtractionResult
        {
            SourceType = "web",
            Source = new ExtractionSource
            {
                ExtractedDate = DateTime.UtcNow,
                TotalPages = 1,
                FileName = source,
            },
            Elements = elements
        };
    }

    /// <summary>
    /// Recursively walks the DOM tree extracting headings, paragraphs, and list items.
    /// Each element is tagged with its containing HTML area (header, nav, main, sidebar, footer, etc.).
    /// Skips script, style, svg, iframe, form inputs, and other non-content elements.
    /// </summary>
    private static void ExtractElements(IElement root, List<ExtractionElement> elements,
        ref int elementIndex, string currentArea)
    {
        foreach (var node in root.Children)
        {
            var tagName = node.TagName.ToLowerInvariant();

            // Skip non-content elements (script, style, svg, iframe, form inputs)
            if (IsSkippableElement(tagName))
                continue;

            // Check if this element IS an area boundary
            var detectedArea = DetectArea(node);
            var areaForChildren = detectedArea ?? currentArea;

            // Headings
            if (tagName is "h1" or "h2" or "h3" or "h4" or "h5" or "h6")
            {
                var level = tagName[1] - '0';
                var text = CleanText(node.TextContent);
                if (!string.IsNullOrWhiteSpace(text))
                {
                    elements.Add(new ExtractionElement
                    {
                        Id = $"html-{elementIndex++}",
                        Page = 1,
                        Text = text,
                        Metadata = new ElementMetadata
                        {
                            FontSize = level switch
                            {
                                1 => 24,
                                2 => 20,
                                3 => 16,
                                4 => 14,
                                5 => 12,
                                _ => 10
                            },
                            FontName = $"heading-{level}",
                            HtmlArea = areaForChildren
                        }
                    });
                }
                continue; // Don't recurse into headings
            }

            // Paragraphs
            if (tagName == "p")
            {
                var text = CleanText(node.TextContent);
                if (!string.IsNullOrWhiteSpace(text))
                {
                    elements.Add(new ExtractionElement
                    {
                        Id = $"html-{elementIndex++}",
                        Page = 1,
                        Text = text,
                        Metadata = new ElementMetadata
                        {
                            FontName = "p",
                            HtmlArea = areaForChildren
                        }
                    });
                }
                continue;
            }

            // List items
            if (tagName == "li")
            {
                var text = CleanText(node.TextContent);
                if (!string.IsNullOrWhiteSpace(text))
                {
                    elements.Add(new ExtractionElement
                    {
                        Id = $"html-{elementIndex++}",
                        Page = 1,
                        Text = $"- {text}",
                        Metadata = new ElementMetadata
                        {
                            FontName = "li",
                            HtmlArea = areaForChildren
                        }
                    });
                }
                continue;
            }

            // Table cells — extract as body text
            if (tagName is "td" or "th")
            {
                var text = CleanText(node.TextContent);
                if (!string.IsNullOrWhiteSpace(text))
                {
                    elements.Add(new ExtractionElement
                    {
                        Id = $"html-{elementIndex++}",
                        Page = 1,
                        Text = text,
                        Metadata = new ElementMetadata
                        {
                            FontName = tagName,
                            HtmlArea = areaForChildren
                        }
                    });
                }
                continue;
            }

            // For container elements (div, section, article, etc.), recurse
            ExtractElements(node, elements, ref elementIndex, areaForChildren);
        }
    }

    /// <summary>
    /// Two-tier area detection: semantic HTML5 elements + class/ID pattern matching.
    /// Returns a human-readable area name, or null if this element is not an area boundary.
    /// </summary>
    private static string? DetectArea(IElement element)
    {
        var tagName = element.TagName.ToLowerInvariant();

        // Tier 1: Semantic HTML5 elements
        switch (tagName)
        {
            case "header":
                return "Header";
            case "nav":
                return "Navigation";
            case "main":
                return "Main Content";
            case "aside":
                return "Sidebar";
            case "footer":
                return "Footer";
            case "article":
                return "Article";
            case "section":
                // <section> is too generic on its own — only treat as area if it has a
                // class/id that suggests a distinct region. Otherwise fall through to Tier 2.
                break;
        }

        // Tier 2: Class/ID pattern matching for legacy sites (div, table, section, etc.)
        if (tagName is "div" or "table" or "section" or "td")
        {
            var classAttr = element.GetAttribute("class")?.ToLowerInvariant() ?? "";
            var idAttr = element.GetAttribute("id")?.ToLowerInvariant() ?? "";
            var roleAttr = element.GetAttribute("role")?.ToLowerInvariant() ?? "";

            // Check role attribute first
            if (roleAttr == "banner" || roleAttr == "navigation" || roleAttr == "main"
                || roleAttr == "complementary" || roleAttr == "contentinfo")
            {
                return roleAttr switch
                {
                    "banner" => "Header",
                    "navigation" => "Navigation",
                    "main" => "Main Content",
                    "complementary" => "Sidebar",
                    "contentinfo" => "Footer",
                    _ => null
                };
            }

            // Check class and id patterns
            var combined = $"{classAttr} {idAttr}";

            // Order matters — check more specific patterns first
            if (ContainsPattern(combined, "nav", "navigation", "menu"))
                return "Navigation";
            if (ContainsPattern(combined, "header", "masthead", "site-header", "page-header"))
                return "Header";
            if (ContainsPattern(combined, "footer", "site-footer", "page-footer"))
                return "Footer";
            if (ContainsPattern(combined, "sidebar", "aside", "side-bar", "widget-area"))
                return "Sidebar";
            if (ContainsPattern(combined, "main-content", "page-content", "content-area",
                "main-body", "primary-content"))
                return "Main Content";
            // "content" alone is a weaker signal — only match if it's a standalone word
            // to avoid false positives on things like "content-type", "disclaimer-content"
            if (ContainsStandaloneWord(combined, "main") || ContainsStandaloneWord(combined, "content"))
                return "Main Content";
        }

        return null;
    }

    /// <summary>
    /// Checks if the combined class/id string contains any of the given patterns as substrings.
    /// </summary>
    private static bool ContainsPattern(string combined, params string[] patterns)
    {
        foreach (var pattern in patterns)
        {
            if (combined.Contains(pattern, StringComparison.Ordinal))
                return true;
        }
        return false;
    }

    /// <summary>
    /// Checks if a word appears as a standalone token in a space-separated string.
    /// "content" matches "content wrapper" but not "disclaimer-content".
    /// </summary>
    private static bool ContainsStandaloneWord(string combined, string word)
    {
        var tokens = combined.Split(new[] { ' ', '-', '_' }, StringSplitOptions.RemoveEmptyEntries);
        return tokens.Any(t => t.Equals(word, StringComparison.Ordinal));
    }

    /// <summary>
    /// Determines if an element should be completely skipped during extraction.
    /// These are elements that never contain useful text content.
    /// Note: nav, header, footer are NOT skipped — they are extracted but tagged with their area.
    /// </summary>
    private static bool IsSkippableElement(string tagName)
    {
        return tagName is "script" or "style" or "noscript" or "svg" or "iframe"
            or "form" or "button" or "input" or "select" or "textarea"
            or "meta" or "link" or "head";
    }

    /// <summary>
    /// Cleans extracted text: collapses whitespace, trims.
    /// </summary>
    private static string CleanText(string text)
    {
        if (string.IsNullOrEmpty(text)) return string.Empty;

        // Collapse all whitespace (including newlines) to single spaces
        var cleaned = System.Text.RegularExpressions.Regex.Replace(text, @"\s+", " ");
        return cleaned.Trim();
    }
}
