# UpDocComposer.cs

Umbraco composer that registers services for the UpDoc extension.

## What it does

Registers the PDF extraction services with Umbraco's dependency injection container during application startup.

## Code

```csharp
public class UpDocComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddScoped<IPdfExtractionService, PdfExtractionService>();
        builder.Services.AddScoped<IPdfPagePropertiesService, PdfPagePropertiesService>();
    }
}
```

## Key concepts

### IComposer

Umbraco's composition pattern for registering services:
- Automatically discovered at startup
- Runs before the application starts
- Used for DI registration, event subscriptions, etc.

### Service lifetime

`AddScoped` means:
- One instance per HTTP request
- Disposed at the end of the request
- Appropriate for services that may hold request-specific state

### Alternatives

- `AddSingleton` - One instance for entire application lifetime
- `AddTransient` - New instance every time it's requested

## When to use composers

Use composers when you need to:
- Register custom services
- Subscribe to Umbraco events
- Configure Umbraco features
- Add middleware or filters
