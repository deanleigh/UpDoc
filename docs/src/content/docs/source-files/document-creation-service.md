---
title: "DocumentCreationService.cs"
---


Creates a document from a source file, start to finish. This is what the backoffice does when an editor clicks Create, expressed as one server-side operation.

## Why it exists

Until this service, creating a document from a source existed only as browser TypeScript. That meant a browser was the only way to run an import — no scheduled job, no deployment step, no AI assistant, no other site.

Having it here is what lets [the API](../api/) offer `create-from-source`, and what lets [the MCP server](../mcp/) wrap it.

## What it does

Five steps, in order:

1. **Resolve the workflow** from the blueprint id. A workflow folder exists per blueprint per source type, so the blueprint is enough to say how to read the source and where its content belongs.
2. **Extract and transform** the source, producing the same sections the backoffice shows on its Transformed tab.
3. **Scaffold from the blueprint** via `IContentBlueprintEditingService.GetScaffoldedAsync`. The scaffold carries the blueprint's own content, so any field the mappings do not touch keeps its default.
4. **Apply the mappings** through [`MappingApplicationService`](./mapping-application-service.md).
5. **Create the document** via `IContentEditingService.CreateAsync`.

## Interface

```csharp
public interface IDocumentCreationService
{
    Task<CreateFromSourceResult> CreateAsync(CreateFromSourceRequest request, Guid userKey);
}
```

## Notes

**The document is created as a draft.** Publishing is the caller's decision, deliberately. An import that publishes itself gives nobody a chance to check it.

**The workflow alias comes from the folder name.** `DocumentTypeConfig` has no alias property — the folder on disk is the identifier, and `Path.GetFileName(config.FolderPath)` is how it is read.

**PDF only, currently.** Markdown and web sources return a message pointing at the backoffice rather than failing silently.

**`mappedValueCount` is returned** so the caller can compare it against the workflow's mapping count without reading the created document. A lower number means a section did not resolve.

## Related

- [MappingApplicationService.cs](./mapping-application-service.md) — applies map.json
- [SectionLookupBuilder.cs](./section-lookup-builder.md) — flattens transform output into the keys mappings address
- [CreateFromSourceController.cs](./create-from-source-controller.md) — the endpoint
