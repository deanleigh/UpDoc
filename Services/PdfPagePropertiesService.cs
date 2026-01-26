using System.Text.RegularExpressions;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

namespace CreateDocumentFromPdf.Services;

public interface IPdfPagePropertiesService
{
    PdfPageProperties ExtractFromFile(string filePath);
    PdfPageProperties ExtractFromStream(Stream stream);
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

    private static List<TextLine> ExtractTextLines(Page page)
    {
        var words = page.GetWords().ToList();
        if (words.Count == 0)
            return new List<TextLine>();

        // Group words into lines by Y-coordinate (with tolerance for slight variations)
        var lines = new List<TextLine>();
        var sortedWords = words.OrderByDescending(w => w.BoundingBox.Bottom).ToList();

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
