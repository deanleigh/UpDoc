# map-file.types.ts

TypeScript interfaces that mirror the C# `MapFileModels.cs` for type-safe map file handling on the frontend.

## What it does

Defines the TypeScript shape of map file JSON, used by the map file service and the entity action to work with extraction configuration and property mappings in a type-safe way.

## Interfaces

```typescript
export interface MapFile {
    name: string;
    documentTypeAlias: string;
    blueprintId?: string;
    sourceTypes: SourceTypes;
    propertyMappings: PropertyMapping[];
}

export interface SourceTypes {
    pdf?: SourceTypeConfig;
    web?: SourceTypeConfig;
    word?: SourceTypeConfig;
}

export interface SourceTypeConfig {
    enabled: boolean;
    extraction?: PdfExtractionRules;
}

export interface PdfExtractionRules {
    columnDetection?: {
        enabled: boolean;
        thresholdPercent: number;
    };
    titleDetection?: {
        fontSizeThreshold: number;
    };
    descriptionPattern?: string;
    content?: {
        startPattern?: string;
        stopPatterns?: string[];
        headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
    };
}
```

### Property mapping types

```typescript
export interface PropertyMapping {
    from: MappingSource;
    to: MappingTarget;
}

export interface MappingSource {
    sectionType: string;   // e.g. "title", "description", "content"
}

export interface MappingTarget {
    property?: string;          // Simple property alias
    alsoMapTo?: string[];       // Additional properties receiving same value
    blockGrid?: string;         // Block grid property alias
    blockSearch?: BlockSearchConfig;
    targetProperty?: string;    // Property within the found block
    convertMarkdown?: boolean;  // Convert Markdown to HTML before writing
}

export interface BlockSearchConfig {
    property: string;    // Property alias to search within blocks
    value: string;       // Value to match (case-insensitive contains)
}
```

### API response type

```typescript
export interface ExtractSectionsResponse {
    sections: Record<string, string>;       // Extracted sections keyed by type (title, description, content)
    propertyMappings: PropertyMapping[];    // Mappings from the map file to apply client-side
}
```

The `ExtractSectionsResponse` is returned by the `/updoc/extract-sections` endpoint and consumed by the modal element. It bundles the extracted section values with the property mappings so the action knows how to apply each section to the document.

## Key concepts

### Mirror of C# models

These interfaces match the C# `MapFileModels.cs` classes one-to-one. The camelCase property names here correspond to the `[JsonPropertyName]` attributes on the C# side.

### Used by

- `map-file.service.ts` -- return types for `fetchMapFile()` and `extractSections()`
- `up-doc-modal.token.ts` -- `PropertyMapping` is part of `UmbUpDocModalValue`
- `up-doc-action.ts` -- `PropertyMapping` is imported for the mapping loop
- `up-doc-modal.element.ts` -- `PropertyMapping` array stored as state

## Imports

This file has no imports -- it defines only interfaces.
