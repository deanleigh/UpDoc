---
title: "MappingApplicationService.cs"
---


Applies a workflow's `map.json` to a document's property values.

This is the middle of the pipeline. Extraction has produced sections, the blueprint has produced a set of properties, and the map says which section text belongs in which field.

## What it does

Nothing here reads a source or writes to Umbraco. It works on values in memory and leaves persisting to the caller.

```csharp
IReadOnlySet<string> Apply(
    IDictionary<string, object?> values,
    SectionLookups lookups,
    MapConfig map,
    DestinationConfig destination,
    Guid? mediaKey);
```

It returns the set of fields it wrote, which is where `mappedValueCount` comes from.

## A port, not a reimplementation

This is a direct port of `create-from-source.ts`, the TypeScript that has run every import to date. The two must agree: the same `map.json` is applied in the browser when an editor clicks Create, and here when the API is called.

Porting rather than rewriting was deliberate. The original carried reasoning that would have been lost in a fresh implementation, and that reasoning came across with the code.

## Rules worth knowing

**Blocks match on `contentTypeKey`, not instance key.** Umbraco regenerates block instance keys when creating a document from a blueprint, so the element type GUID is the only stable identifier. Matching on anything else works until the first import and then quietly stops.

**First write replaces, later writes concatenate.** A field written once takes the blueprint's place. Written again by a second mapping, the values join. That is how a title split across two source elements ends up in one field.

**An absent block property is created, not skipped.** Absent is not the same as empty: a property only appears in a block's `contentData` once a value has been saved against it, so two blocks that look identical in the backoffice can differ in the underlying JSON depending on the blueprint's editing history.

**Import facts resolve from the request.** A mapping source beginning `$` describes the import rather than naming content within it — `$sourceFile` is the media item that was imported. Those resolve from the request, not from the extracted sections.

**Type conversion runs last.** Concatenation happens on raw strings first, and only then is each value converted to the shape its property editor expects. Doing it the other way round would try to join two HTML fragments.

## Two things C# does differently

Both bit during the port, and both are worth knowing if you touch this code.

**Block grid values arrive as objects, not strings.** The Management API hands the browser a JSON string it must parse. Server-side, the scaffold has already parsed it. The code handles both.

**`JsonNode`'s indexer throws.** Where JavaScript returns `undefined` for a missing property, C# raises `InvalidOperationException` if the node is not an object. A media picker holding an array reached the block-container code and took the whole import down until the type was checked first.

## Related

- [ValueCoercion.cs](./value-coercion.md) — numbers and dates
- [MarkdownStripper.cs](./markdown-stripper.md) — plain-text fields
- [MarkdownConversionService.cs](./markdown-conversion-service.md) — rich text fields
- [create-from-source.ts](./create-from-source-ts.md) — the browser's copy
