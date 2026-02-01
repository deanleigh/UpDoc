using System.Text.RegularExpressions;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

namespace UpDoc.Services;

public interface IPdfPagePropertiesService
{
    PdfPageProperties ExtractFromFile(string filePath);
    PdfPageProperties ExtractFromStream(Stream stream);
    PdfSectionResult ExtractSectionByHeading(string filePath, string headingText);
    PdfMarkdownResult ExtractAsMarkdown(string filePath);
}

/// <summary>
/// Represents the full PDF content extracted as Markdown.
/// </summary>
public class PdfMarkdownResult
{
    /// <summary>
    /// The document title (H1).
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// The document subtitle/description (e.g., "5 days from £889").
    /// </summary>
    public string Subtitle { get; set; } = string.Empty;

    /// <summary>
    /// The full content as Markdown, excluding title and subtitle.
    /// Includes Day headings as ## and body text as paragraphs.
    /// </summary>
    public string Markdown { get; set; } = string.Empty;

    /// <summary>
    /// The full raw text for debugging.
    /// </summary>
    public string RawText { get; set; } = string.Empty;

    public string? Error { get; set; }
}

/// <summary>
/// Represents a section of text extracted from a PDF by heading.
/// </summary>
public class PdfSectionResult
{
    /// <summary>
    /// The heading that was found.
    /// </summary>
    public string Heading { get; set; } = string.Empty;

    /// <summary>
    /// The content text extracted from under the heading.
    /// </summary>
    public string Content { get; set; } = string.Empty;

    public string? Error { get; set; }
}

/// <summary>
/// Represents page properties extracted from a PDF document.
/// Title → Page Title, Page Title Short (and node name)
/// Description → Page Description
/// </summary>
public class PdfPageProperties
{
    /// <summary>
    /// The document title, extracted from the largest font text at the top of the first page.
    /// Used for: Page Title, Page Title Short, and node name.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// The document description, extracted from the text below the title.
    /// Used for: Page Description.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    public string? Error { get; set; }
}

public class PdfPagePropertiesService : IPdfPagePropertiesService
{
    public PdfPageProperties ExtractFromFile(string filePath)
    {
        try
        {
            using var document = PdfDocument.Open(filePath);
            return ExtractFromDocument(document);
        }
        catch (Exception ex)
        {
            return new PdfPageProperties
            {
                Error = $"Failed to extract PDF page properties: {ex.Message}"
            };
        }
    }

    public PdfPageProperties ExtractFromStream(Stream stream)
    {
        try
        {
            using var document = PdfDocument.Open(stream);
            return ExtractFromDocument(document);
        }
        catch (Exception ex)
        {
            return new PdfPageProperties
            {
                Error = $"Failed to extract PDF page properties: {ex.Message}"
            };
        }
    }

    public PdfSectionResult ExtractSectionByHeading(string filePath, string headingText)
    {
        try
        {
            using var document = PdfDocument.Open(filePath);
            return ExtractSectionFromDocument(document, headingText);
        }
        catch (Exception ex)
        {
            return new PdfSectionResult
            {
                Error = $"Failed to extract PDF section: {ex.Message}"
            };
        }
    }

    public PdfMarkdownResult ExtractAsMarkdown(string filePath)
    {
        try
        {
            using var document = PdfDocument.Open(filePath);
            return ExtractMarkdownFromDocument(document);
        }
        catch (Exception ex)
        {
            return new PdfMarkdownResult
            {
                Error = $"Failed to extract PDF as Markdown: {ex.Message}"
            };
        }
    }

    private static PdfMarkdownResult ExtractMarkdownFromDocument(PdfDocument document)
    {
        if (document.NumberOfPages == 0)
        {
            return new PdfMarkdownResult { Error = "PDF has no pages" };
        }

        // Collect text lines from all pages, filtering to main column only (excludes sidebar)
        var allLines = new List<TextLine>();
        for (int pageNum = 1; pageNum <= document.NumberOfPages; pageNum++)
        {
            var page = document.GetPage(pageNum);
            var pageLines = ExtractTextLines(page, filterToMainColumn: true);
            allLines.AddRange(pageLines);
        }

        if (allLines.Count == 0)
        {
            return new PdfMarkdownResult { Error = "No text found in PDF" };
        }

        // Build raw text for debugging
        var rawText = string.Join("\n", allLines.Select(l => $"[{l.AverageFontSize:F1}] {l.Text}"));

        // Determine font size thresholds
        var fontSizes = allLines.Where(l => !string.IsNullOrWhiteSpace(l.Text))
                                .Select(l => l.AverageFontSize)
                                .OrderByDescending(s => s)
                                .ToList();

        if (fontSizes.Count == 0)
        {
            return new PdfMarkdownResult { Error = "No text with measurable font found" };
        }

        var maxFontSize = fontSizes.First();
        var h1Threshold = maxFontSize * 0.85;  // Title (largest)
        var h2Threshold = maxFontSize * 0.60;  // Subheadings (Day N, etc.)

        // Patterns
        var dayPattern = new Regex(@"^Day\s+\d+", RegexOptions.IgnoreCase);
        var descriptionPattern = new Regex(@"\d+\s*days?\s+from\s+£\d+", RegexOptions.IgnoreCase);
        var stopPatterns = new[] { "terms", "conditions", "booking", "contact us", "telephone", "email:", "www.", "http", "nb:", "nb:-", "please note", "reserve the right" };

        // Extract title, subtitle, and itinerary content
        string title = string.Empty;
        string subtitle = string.Empty;
        var markdown = new System.Text.StringBuilder();
        var currentParagraph = new System.Text.StringBuilder();
        bool foundTitle = false;
        bool foundSubtitle = false;
        bool foundFirstDay = false;  // Only start capturing content from Day 1

        foreach (var line in allLines)
        {
            var text = line.Text.Trim();
            if (string.IsNullOrWhiteSpace(text))
                continue;

            var textLower = text.ToLowerInvariant();

            // Check for stop patterns (footer/disclaimer) - only after we've found Day 1
            if (foundFirstDay && stopPatterns.Any(p => textLower.Contains(p)))
                break;

            // Extract title (largest font at top)
            if (!foundTitle && line.AverageFontSize >= h1Threshold)
            {
                title = string.IsNullOrEmpty(title) ? text : $"{title} {text}";
                continue;
            }
            else if (!string.IsNullOrEmpty(title) && !foundTitle)
            {
                foundTitle = true;
            }

            // Extract subtitle (description pattern like "5 days from £889")
            if (!foundSubtitle && descriptionPattern.IsMatch(text))
            {
                subtitle = text;
                foundSubtitle = true;
                continue;
            }

            // Check if this is a Day heading - this starts the itinerary content
            if (dayPattern.IsMatch(text))
            {
                foundFirstDay = true;

                // Flush current paragraph
                if (currentParagraph.Length > 0)
                {
                    markdown.AppendLine(currentParagraph.ToString().Trim());
                    markdown.AppendLine();
                    currentParagraph.Clear();
                }

                // Add Day as H2 heading
                markdown.AppendLine($"## {text}");
                markdown.AppendLine();
            }
            else if (foundFirstDay)
            {
                // Only capture content AFTER we've found Day 1
                // Regular body text - accumulate into paragraph
                if (currentParagraph.Length > 0)
                    currentParagraph.Append(' ');
                currentParagraph.Append(text);
            }
            // Skip all other content before Day 1 (features, highlights, accommodation, etc.)
        }

        // Flush final paragraph
        if (currentParagraph.Length > 0)
        {
            markdown.AppendLine(currentParagraph.ToString().Trim());
        }

        return new PdfMarkdownResult
        {
            Title = title,
            Subtitle = subtitle,
            Markdown = markdown.ToString().Trim(),
            RawText = rawText
        };
    }

    private static PdfSectionResult ExtractSectionFromDocument(PdfDocument document, string headingText)
    {
        if (document.NumberOfPages == 0)
        {
            return new PdfSectionResult
            {
                Error = "PDF has no pages"
            };
        }

        // Collect text lines from all pages
        var allLines = new List<TextLine>();
        for (int pageNum = 1; pageNum <= document.NumberOfPages; pageNum++)
        {
            var page = document.GetPage(pageNum);
            var pageLines = ExtractTextLines(page);
            allLines.AddRange(pageLines);
        }

        if (allLines.Count == 0)
        {
            return new PdfSectionResult
            {
                Error = "No text found in PDF"
            };
        }

        // Find the line containing the heading (case-insensitive)
        var headingLineIndex = -1;
        double headingFontSize = 0;

        for (int i = 0; i < allLines.Count; i++)
        {
            if (allLines[i].Text.Contains(headingText, StringComparison.OrdinalIgnoreCase))
            {
                headingLineIndex = i;
                headingFontSize = allLines[i].AverageFontSize;
                break;
            }
        }

        if (headingLineIndex == -1)
        {
            return new PdfSectionResult
            {
                Error = $"Heading '{headingText}' not found in PDF"
            };
        }

        // Check if we're searching for a "Day N" pattern (itinerary extraction)
        var dayPattern = new Regex(@"^Day\s+\d+", RegexOptions.IgnoreCase);
        var isSearchingForDay = dayPattern.IsMatch(headingText.Trim());

        // Collect content lines - include the heading line itself for Day patterns
        var contentLines = new List<string>();

        // Include the first Day heading line
        contentLines.Add(allLines[headingLineIndex].Text.Trim());

        var fontSizeThreshold = headingFontSize * 0.95; // Headings are typically 95%+ of this heading's size

        // Patterns that indicate end of itinerary content (footer sections, disclaimers)
        var stopPatterns = new[] { "terms", "conditions", "booking", "contact us", "telephone", "email:", "www.", "http", "nb:", "nb:-", "please note", "reserve the right" };

        for (int i = headingLineIndex + 1; i < allLines.Count; i++)
        {
            var line = allLines[i];

            if (string.IsNullOrWhiteSpace(line.Text))
                continue;

            var lineText = line.Text.Trim();
            var lineTextLower = lineText.ToLowerInvariant();

            // Check if this line is a "Day N" heading (part of the itinerary)
            var isDayHeading = dayPattern.IsMatch(lineText);

            // For Day pattern searches, use different stop logic
            if (isSearchingForDay)
            {
                // Stop if we hit a footer/non-itinerary section
                if (stopPatterns.Any(p => lineTextLower.Contains(p)))
                {
                    break;
                }

                // Continue collecting all content (Day headings and descriptions)
                contentLines.Add(lineText);
            }
            else
            {
                // Standard heading-based extraction: stop at similar/larger font
                if (line.AverageFontSize >= fontSizeThreshold)
                {
                    break;
                }

                contentLines.Add(lineText);
            }
        }

        // For Day pattern content, join intelligently:
        // - Add paragraph breaks before Day headings
        // - Join other lines with spaces to form flowing paragraphs
        string finalContent;
        if (isSearchingForDay && contentLines.Count > 0)
        {
            var result = new System.Text.StringBuilder();
            for (int j = 0; j < contentLines.Count; j++)
            {
                var line = contentLines[j];
                var isDay = dayPattern.IsMatch(line);

                if (j == 0)
                {
                    result.Append(line);
                }
                else if (isDay)
                {
                    // Add double line break before Day headings for paragraph separation
                    result.Append("\n\n").Append(line);
                }
                else
                {
                    // Join regular lines with space to form flowing text
                    result.Append(' ').Append(line);
                }
            }
            finalContent = result.ToString();
        }
        else
        {
            finalContent = string.Join("\n", contentLines);
        }

        return new PdfSectionResult
        {
            Heading = allLines[headingLineIndex].Text.Trim(),
            Content = finalContent
        };
    }

    private static PdfPageProperties ExtractFromDocument(PdfDocument document)
    {
        if (document.NumberOfPages == 0)
        {
            return new PdfPageProperties
            {
                Error = "PDF has no pages"
            };
        }

        var firstPage = document.GetPage(1);
        var textLines = ExtractTextLines(firstPage);

        if (textLines.Count == 0)
        {
            return new PdfPageProperties
            {
                Error = "No text found on first page"
            };
        }

        var (title, description) = ExtractTitleAndDescription(textLines);

        return new PdfPageProperties
        {
            Title = title,
            Description = description
        };
    }

    private static List<TextLine> ExtractTextLines(Page page, bool filterToMainColumn = false)
    {
        var words = page.GetWords().ToList();
        if (words.Count == 0)
            return new List<TextLine>();

        // Detect column boundary if filtering is requested
        double mainColumnMinX = 0;
        if (filterToMainColumn)
        {
            mainColumnMinX = DetectMainColumnStart(words, page.Width);
        }

        // Filter words to main column if requested
        var filteredWords = filterToMainColumn
            ? words.Where(w => w.BoundingBox.Left >= mainColumnMinX).ToList()
            : words;

        if (filteredWords.Count == 0)
            return new List<TextLine>();

        // Group words into lines by Y-coordinate (with tolerance for slight variations)
        var lines = new List<TextLine>();
        var sortedWords = filteredWords.OrderByDescending(w => w.BoundingBox.Bottom).ToList();

        const double yTolerance = 5.0; // pixels tolerance for same line

        foreach (var word in sortedWords)
        {
            var existingLine = lines.FirstOrDefault(l =>
                Math.Abs(l.Y - word.BoundingBox.Bottom) < yTolerance);

            if (existingLine != null)
            {
                existingLine.Words.Add(word);
            }
            else
            {
                lines.Add(new TextLine
                {
                    Y = word.BoundingBox.Bottom,
                    Words = new List<Word> { word }
                });
            }
        }

        // Sort words within each line by X position (left to right)
        foreach (var line in lines)
        {
            line.Words = line.Words.OrderBy(w => w.BoundingBox.Left).ToList();
            line.Text = string.Join(" ", line.Words.Select(w => w.Text));
            line.AverageFontSize = CalculateAverageFontSize(line.Words);
        }

        // Sort lines by Y position (top to bottom - higher Y is top in PDF coordinates)
        return lines.OrderByDescending(l => l.Y).ToList();
    }

    /// <summary>
    /// Detects the X-coordinate where the main content column starts by finding gaps between columns.
    /// </summary>
    private static double DetectMainColumnStart(List<Word> words, double pageWidth)
    {
        if (words.Count == 0)
            return 0;

        // Get all unique X positions (left edge of words), rounded to reduce noise
        var xPositions = words
            .Select(w => Math.Round(w.BoundingBox.Left / 10) * 10) // Round to nearest 10
            .Distinct()
            .OrderBy(x => x)
            .ToList();

        if (xPositions.Count < 2)
            return 0;

        // Find the largest gap in X positions (indicates column boundary)
        double largestGap = 0;
        double gapStart = 0;

        for (int i = 1; i < xPositions.Count; i++)
        {
            var gap = xPositions[i] - xPositions[i - 1];
            if (gap > largestGap && gap > 30) // Minimum 30 pixels gap to be considered a column break
            {
                largestGap = gap;
                gapStart = xPositions[i - 1];
            }
        }

        // If we found a significant gap, use the right side of the gap as the main column start
        // Add a small buffer to ensure we're past the sidebar
        if (largestGap > 30)
        {
            return gapStart + (largestGap * 0.5); // Start at middle of gap
        }

        // No clear column detected, use page center as fallback
        return pageWidth * 0.35; // Assume sidebar is less than 35% of page width
    }

    private static double CalculateAverageFontSize(List<Word> words)
    {
        if (words.Count == 0)
            return 0;

        // Estimate font size from word height
        var heights = words.Select(w => w.BoundingBox.Height).ToList();
        return heights.Average();
    }

    private static (string title, string description) ExtractTitleAndDescription(List<TextLine> lines)
    {
        if (lines.Count == 0)
            return (string.Empty, string.Empty);

        // Find the largest font size (likely the title)
        var maxFontSize = lines.Max(l => l.AverageFontSize);
        var fontSizeThreshold = maxFontSize * 0.85; // Allow 15% tolerance

        // Collect title lines (largest font, consecutive from top)
        var titleLines = new List<TextLine>();
        var foundTitleEnd = false;

        foreach (var line in lines)
        {
            if (string.IsNullOrWhiteSpace(line.Text))
                continue;

            if (!foundTitleEnd && line.AverageFontSize >= fontSizeThreshold)
            {
                titleLines.Add(line);
            }
            else if (titleLines.Count > 0)
            {
                foundTitleEnd = true;
            }
        }

        // Find description: look for line with "X days from £XXX" pattern
        var descriptionPattern = new Regex(@"\d+\s*days?\s+from\s+£\d+", RegexOptions.IgnoreCase);
        var description = string.Empty;

        foreach (var line in lines)
        {
            if (string.IsNullOrWhiteSpace(line.Text))
                continue;

            if (descriptionPattern.IsMatch(line.Text))
            {
                description = line.Text.Trim();
                break;
            }
        }

        var title = string.Join(" ", titleLines.Select(l => l.Text)).Trim();

        return (title, description);
    }

    private class TextLine
    {
        public double Y { get; set; }
        public List<Word> Words { get; set; } = new();
        public string Text { get; set; } = string.Empty;
        public double AverageFontSize { get; set; }
    }
}
