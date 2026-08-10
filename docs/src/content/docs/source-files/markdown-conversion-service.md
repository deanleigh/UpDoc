---
title: "MarkdownConversionService.cs"
---


Converts extracted markdown into the HTML a rich text property stores.

Extraction assembles content as markdown — headings, bullet lists, paragraphs — and a rich text property needs HTML. This is the last step before a value is written.

## What it does

```csharp
string ToHtml(string? markdown);
object BuildRichTextValue(string? markdown);
```

`BuildRichTextValue` wraps the HTML in the object Umbraco's rich text editor persists. The editor stores blocks alongside markup even when there are none, so the empty collections are required rather than decorative.

## It matches the backoffice exactly

The backoffice uses [marked](https://marked.js.org/), a JavaScript library. This uses [Markdig](https://github.com/xoofx/markdig). Two different markdown engines writing to the same properties is the sort of thing that produces documents which differ subtly depending on how they were created.

So it was measured rather than assumed. For the shapes UpDoc actually produces, Markdig's **default pipeline** and marked emit byte-identical HTML:

| Input | Output |
|-------|--------|
| Bullet list | `<ul>` / `<li>` items, newline separated |
| `###` headings and paragraphs | `<h3>Day 1</h3>` then `<p>…</p>` |
| Paragraph | `<p>…</p>` |
| Mixed | Heading, list and paragraph in order |

Including newline placement and the trailing newline.

**Do not add pipeline extensions without re-checking that.** Markdig's defaults are what match; advanced extensions change the output.

## Related

- [MappingApplicationService.cs](./mapping-application-service.md) — calls this for richText fields
- [transforms.ts](./transforms.md) — the browser's equivalent, using marked
