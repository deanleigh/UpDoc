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

        // Find the main content area — try common patterns
        var contentRoot = FindContentRoot(document);

        var elements = new List<ExtractionElement>();
        var elementIndex = 0;

        ExtractElements(contentRoot, elements, ref elementIndex);

        // Strip empty elements
        elements = elements.Where(e => !string.IsNullOrWhiteSpace(e.Text)).ToList();

        _logger.LogInformation("Extracted {Count} elements from HTML: {Source}",
            elements.Count, source);

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
    /// Finds the best content root element, skipping nav, header, footer, sidebar noise.
    /// Falls back to body if no specific content area found.
    /// </summary>
    private static IElement FindContentRoot(IDocument document)
    {
        // Try common content container selectors in order of specificity
        var selectors = new[]
        {
            "main",
            "[role='main']",
            "article",
            ".content",
            "#content",
            ".main-content",
            "#main-content",
            ".page-content",
            "#page-content",
        };

        foreach (var selector in selectors)
        {
            var element = document.QuerySelector(selector);
            if (element != null && element.TextContent.Trim().Length > 100)
            {
                return element;
            }
        }

        // Fallback: use body
        return document.Body ?? document.DocumentElement;
    }

    /// <summary>
    /// Recursively walks the DOM tree extracting headings, paragraphs, and list items.
    /// Skips nav, header, footer, script, style, and other non-content elements.
    /// </summary>
    private static void ExtractElements(IElement root, List<ExtractionElement> elements, ref int elementIndex)
    {
        foreach (var node in root.Children)
        {
            var tagName = node.TagName.ToLowerInvariant();

            // Skip non-content elements
            if (IsSkippableElement(tagName))
                continue;

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
                            FontName = $"heading-{level}"
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
                            FontName = "p"
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
                            FontName = "li"
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
                            FontName = tagName
                        }
                    });
                }
                continue;
            }

            // For container elements (div, section, etc.), recurse
            ExtractElements(node, elements, ref elementIndex);
        }
    }

    private static bool IsSkippableElement(string tagName)
    {
        return tagName is "nav" or "header" or "footer" or "script" or "style"
            or "noscript" or "svg" or "iframe" or "form" or "button" or "input"
            or "select" or "textarea" or "meta" or "link" or "head";
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
