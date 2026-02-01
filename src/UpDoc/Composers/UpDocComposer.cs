using UpDoc.Services;
using Umbraco.Cms.Core.Composing;

namespace UpDoc.Composers;

public class UpDocComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddScoped<IPdfExtractionService, PdfExtractionService>();
        builder.Services.AddScoped<IPdfPagePropertiesService, PdfPagePropertiesService>();
    }
}
