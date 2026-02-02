# map-file.service.ts

Frontend service for fetching map files and extracting sections from the UpDoc backend API.

## What it does

Provides two exported async functions that communicate with the backend API:
1. `fetchMapFile` -- retrieves a map file configuration for a given blueprint
2. `extractSections` -- extracts structured sections from a media item using the map file's extraction rules

Both functions require a bearer token for Umbraco Management API authentication.

## Functions

### fetchMapFile

```typescript
export async function fetchMapFile(
    blueprintId: string,
    token: string
): Promise<MapFile | null>
```

Fetches the map file for a blueprint from `GET /umbraco/management/api/v1/updoc/maps/{blueprintId}`.

- Uses an in-memory `Map<string, MapFile>` cache to avoid repeated network requests for the same blueprint
- Returns `null` and logs a warning if no map file exists for the blueprint (404 response)
- Returns the cached `MapFile` on subsequent calls with the same `blueprintId`

### extractSections

```typescript
export async function extractSections(
    mediaKey: string,
    blueprintId: string,
    token: string
): Promise<ExtractSectionsResponse | null>
```

Calls `GET /umbraco/management/api/v1/updoc/extract-sections?mediaKey={mediaKey}&blueprintId={blueprintId}` to extract content from a media item using the map file's PDF extraction rules.

- Returns an `ExtractSectionsResponse` containing `sections` (a `Record<string, string>` of extracted values) and `propertyMappings` (the mapping definitions from the map file)
- Returns `null` and logs the error if the request fails
- Does not cache results (each media item extraction is unique)

## Key concepts

### In-memory cache

The map file cache is a module-level `Map` that persists for the browser session:

```typescript
const mapFileCache = new Map<string, MapFile>();
```

This avoids re-fetching the same map file when the modal or action needs it multiple times.

### Authentication

Both functions pass the bearer token in the `Authorization` header:

```typescript
headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
}
```

The token is obtained from `UMB_AUTH_CONTEXT` by the calling code.

### Error handling

Both functions handle non-OK responses gracefully:
- `fetchMapFile` returns `null` with a `console.warn`
- `extractSections` parses the error body and logs it with `console.error`, then returns `null`

## Imports

```typescript
import type { MapFile, ExtractSectionsResponse } from './map-file.types.js';
```

## Used by

- `up-doc-modal.element.ts` -- calls `extractSections` when a PDF is selected
- `up-doc-action.ts` -- indirectly, through the modal value which contains the extraction results
