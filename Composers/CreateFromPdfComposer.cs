using CreateDocumentFromPdf.Services;
using Umbraco.Cms.Core.Composing;

namespace CreateDocumentFromPdf.Composers;

public class CreateFromPdfComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddScoped<IPdfExtractionService, PdfExtractionService>();
        builder.Services.AddScoped<IPdfPagePropertiesService, PdfPagePropertiesService>();
    }
}
