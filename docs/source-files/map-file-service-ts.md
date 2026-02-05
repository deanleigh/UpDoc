# map-file.service.ts

Frontend service for fetching config and extracting sections from the UpDoc backend API.

## What it does

Provides exported async functions that communicate with the backend API:

1. `fetchConfig` -- retrieves the combined config (source, destination, map) for a blueprint
2. `extractSections` -- extracts structured sections from a media item using the config's extraction rules
3. `clearConfigCache` -- clears the in-memory cache

Both `fetchConfig` and `extractSections` require a bearer token for Umbraco Management API authentication.

## Functions

### fetchConfig

```typescript
export async function fetchConfig(
    blueprintId: string,
    token: string
): Promise<DocumentTypeConfig | null>
```

Fetches the combined config for a blueprint from `GET /umbraco/management/api/v1/updoc/config/{blueprintId}`.

- Uses an in-memory `Map<string, DocumentTypeConfig>` cache to avoid repeated network requests
- Returns `null` and logs a warning if no config exists for the blueprint (404 response)
- Returns the cached config on subsequent calls with the same `blueprintId`

### extractSections

```typescript
export async function extractSections(
    mediaKey: string,
    blueprintId: string,
    token: string
): Promise<ExtractSectionsResponse | null>
```

Calls `GET /umbraco/management/api/v1/updoc/extract-sections?mediaKey={mediaKey}&blueprintId={blueprintId}` to extract content from a media item using the config's extraction rules.

- Returns an `ExtractSectionsResponse` containing:
  - `sections` -- a `Record<string, string>` of extracted values keyed by section key
  - `config` -- the full `DocumentTypeConfig` for property mapping
- Returns `null` and logs the error if the request fails
- Does not cache results (each media item extraction is unique)

### clearConfigCache

```typescript
export function clearConfigCache(): void
```

Clears the in-memory config cache. Useful when configs have been modified and need to be reloaded.

## Key concepts

### In-memory cache

The config cache is a module-level `Map` that persists for the browser session:

```typescript
const configCache = new Map<string, DocumentTypeConfig>();
```

This avoids re-fetching the same config when the modal or action needs it multiple times.

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
- `fetchConfig` returns `null` with a `console.warn`
- `extractSections` parses the error body and logs it with `console.error`, then returns `null`

### API response passthrough

The `extractSections` function passes through the API response directly:

```typescript
// API returns { sections, config } - pass through directly
return response.json();
```

This keeps the service simple -- all extraction and config loading happens on the backend.

## Imports

```typescript
import type { DocumentTypeConfig, ExtractSectionsResponse } from './map-file.types.js';
```

## Used by

- `up-doc-modal.element.ts` -- calls `extractSections` when a PDF is selected
- `up-doc-action.ts` -- uses the config from the modal value to apply mappings
