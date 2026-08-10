---
title: "SectionLookupBuilder.cs"
---


Turns transform sections into the lookups `map.json` addresses.

## Why

A mapping's source is a section id and a part — `features.content`, `accommodation.summary` — so the transform output has to be flattened into that shape before mappings can resolve against it.

## What it produces

```csharp
public record SectionLookups(
    Dictionary<string, string> SectionLookup,
    Dictionary<string, string> StableKeyLookup);
```

| Key | Value |
|-----|-------|
| `features.content` | The section's assembled content |
| `features.heading` | Its heading text |
| `features.title` | The same — `.title` is canonical, `.heading` kept for existing maps |
| `features.description` | Its description, if it has one |
| `features.summary` | Its summary, if it has one |

`StableKeyLookup` maps a rule's stable GUID to the current section id, so a mapping still resolves when a section id shifts because an area was renamed or restructured.

## Two behaviours worth knowing

**Excluded sections are skipped.** Anything switched off in the Transformed view stays out of the created document.

**Role sections resolve differently.** On a role section the heading is a label — "Tour Title" — rather than document text, so both `.heading` and `.title` resolve to the section's content instead.

## A port

Mirrors `buildSectionLookups` in `create-from-source.ts`. The backoffice builds these in the browser, this builds them on the server, and the same `map.json` has to resolve either way.

## Related

- [DocumentCreationService.cs](./document-creation-service.md) — calls this between transform and mapping
- [create-from-source.ts](./create-from-source-ts.md) — the browser's copy
