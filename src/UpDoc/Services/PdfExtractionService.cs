using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

namespace UpDoc.Services;

public interface IPdfExtractionService
{
    PdfExtractionResult ExtractFromFile(string filePath);
    PdfExtractionResult ExtractFromStream(Stream stream);
}

public class PdfExtractionResult
{
    public string RawText { get; set; } = string.Empty;
    public int PageCount { get; set; }
    public string? Error { get; set; }
}

public class PdfExtractionService : IPdfExtractionService
{
    public PdfExtractionResult ExtractFromFile(string filePath)
    {
        try
        {
            using var document = PdfDocument.Open(filePath);
            return ExtractFromDocument(document);
        }
        catch (Exception ex)
        {
            return new PdfExtractionResult
            {
                Error = $"Failed to extract PDF: {ex.Message}"
            };
        }
    }

    public PdfExtractionResult ExtractFromStream(Stream stream)
    {
        try
        {
            using var document = PdfDocument.Open(stream);
            return ExtractFromDocument(document);
        }
        catch (Exception ex)
        {
            return new PdfExtractionResult
            {
                Error = $"Failed to extract PDF: {ex.Message}"
            };
        }
    }

    private static PdfExtractionResult ExtractFromDocument(PdfDocument document)
    {
        var textLines = new List<string>();

        foreach (Page page in document.GetPages())
        {
            var pageText = page.Text;
            if (!string.IsNullOrWhiteSpace(pageText))
            {
                textLines.Add(pageText);
            }
        }

        return new PdfExtractionResult
        {
            RawText = string.Join("\n\n--- Page Break ---\n\n", textLines),
            PageCount = document.NumberOfPages
        };
    }
}
