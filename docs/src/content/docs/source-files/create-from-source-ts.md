---
title: "create-from-source.ts"
---


The browser's copy of creating a document from an extracted source: scaffold from the blueprint, apply the mappings, create the document, save it.

## Why it exists

"Create from Source" has two entry points — the collection toolbar button and the tree's actions menu — and each carried its own copy of this logic. They had already drifted: one passed the document type name to the modal and the other did not, so the Destination tab showed an empty box depending on which route you took.

One copy, two callers.

## What it exports

```typescript
createDocumentFromSource(request): Promise<CreateFromSourceResult>
applyMappings(values, options): void
buildSectionLookups(sections): SectionLookups
```

## No browser APIs

Nothing here touches `window`, `document`, Umbraco contexts or repositories. `fetch` and the auth token are passed in.

That was deliberate, and it is what let the same logic be ported to C# with confidence — the browser-specific parts were already separated out, so what remained was the actual work.

## What stays with each caller

The UI: discovering allowed child types, opening the pickers, notifications, navigating to the new document. Only the work is shared.

## Related

- [up-doc-action.ts](./up-doc-action.md) — the tree's actions menu
- [up-doc-collection-action.element.ts](./up-doc-collection-action-element.md) — the collection toolbar button
- [MappingApplicationService.cs](./mapping-application-service.md) — the C# port
