---
title: "MediaFilePathResolver.cs"
---


Finds the file behind a media item.

## Why

Extraction reads from disk, so every source import starts by turning a media key into an absolute path.

```csharp
string? Resolve(Guid mediaKey);
```

Returns null when the item does not exist, holds no file, or the file is missing from disk.

## The umbracoFile quirk

The `umbracoFile` property holds either a bare path or a JSON object, depending on the media type's property editor:

```
/media/abc123/brochure.pdf
```

```json
{ "src": "/media/abc123/brochure.pdf" }
```

Both are handled. The logic had been duplicated privately in more than one controller before it was extracted here.

## Related

- [DocumentCreationService.cs](./document-creation-service.md) — resolves the source file before extraction
