---
title: "MarkdownStripper.cs"
---


Removes markdown syntax from text destined for a plain-text property.

## Why

Extraction assembles content as markdown, which is right for a rich text property and wrong for a title or a description. Without stripping, a page title would read `# The Castles of Kent` with the hash visible to the reader.

## What it removes

Heading prefixes, bold, italic, strikethrough, inline code, bullet and numbered list prefixes, and blockquote markers.

Mid-string heading prefixes are handled as well as line-start ones, because two headings concatenated into a single field leave a `#` in the middle rather than at the start.

## A port

Ported from `stripMarkdown` in `transforms.ts`, pattern for pattern, so the browser and the server produce the same text.

## Related

- [MappingApplicationService.cs](./mapping-application-service.md) — calls this for text and textArea fields
- [transforms.ts](./transforms.md) — the browser's copy
