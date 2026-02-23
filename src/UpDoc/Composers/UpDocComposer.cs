using UpDoc.Services;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

namespace UpDoc.Composers;

public class UpDocComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddScoped<IPdfExtractionService, PdfExtractionService>();
        builder.Services.AddScoped<IPdfPagePropertiesService, PdfPagePropertiesService>();
        builder.Services.AddScoped<IMarkdownExtractionService, MarkdownExtractionService>();
        builder.Services.AddScoped<IHtmlExtractionService, HtmlExtractionService>();
        builder.Services.AddHttpClient("UpDocHtml", client =>
        {
            client.DefaultRequestHeaders.Add("User-Agent", "UpDoc/1.0 (Umbraco CMS Extension)");
            client.Timeout = TimeSpan.FromSeconds(30);
        });
        builder.Services.AddSingleton<IWorkflowService, WorkflowService>();
        builder.Services.AddScoped<IDestinationStructureService, DestinationStructureService>();
        builder.Services.AddSingleton<IContentTransformService, ContentTransformService>();
    }
}
