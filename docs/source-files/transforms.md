# transforms.ts

Utility functions for converting extracted content into formats suitable for Umbraco document properties.

## What it does

Provides two exported functions extracted from the entity action's former `#convertToHtml` method:

1. `markdownToHtml` -- converts Markdown text to HTML using the `marked` library
2. `buildRteValue` -- wraps HTML content in the Umbraco Rich Text Editor (RTE) value structure

## Functions

### markdownToHtml

```typescript
export function markdownToHtml(markdown: string): string
```

Converts a Markdown string to HTML using the `marked` library with GitHub Flavored Markdown (GFM) enabled:

```typescript
const html = marked.parse(markdown, {
    gfm: true,      // GitHub Flavored Markdown
    breaks: false,   // Don't convert \n to <br>
});
```

**Fallback handling:**
- Returns an empty string if the input is falsy
- If `marked.parse` returns a Promise (unexpected with sync config), falls back to wrapping in `<p>` tags
- If an exception occurs, falls back to manual conversion: double newlines become `</p><p>`, single newlines become `<br>`

### buildRteValue

```typescript
export function buildRteValue(htmlContent: string)
```

Builds the value object expected by Umbraco's Rich Text Editor property:

```typescript
return {
    blocks: {
        contentData: [],
        settingsData: [],
        expose: [],
        Layout: {},
    },
    markup: htmlContent,
};
```

The `blocks` structure is required by Umbraco's RTE even when no blocks are used. The `markup` field contains the actual HTML content.

## Key concepts

### Extracted from action

These functions were originally the `#convertToHtml` private method on `UpDocEntityAction`. They were extracted to a separate module so both the action's `#applyBlockMapping` method and any future consumers can reuse them.

### Used together

The typical usage pattern is to pipe content through both functions:

```typescript
const htmlContent = markdownToHtml(sectionValue);
targetValue.value = buildRteValue(htmlContent);
```

This converts extracted Markdown content into the full RTE value structure expected by Umbraco's Management API.

## Imports

```typescript
import { marked } from 'marked';
```

The `marked` library is a dependency of the UpDoc npm package.

## Used by

- `up-doc-action.ts` -- in `#applyBlockMapping` when `mapping.to.convertMarkdown` is true
