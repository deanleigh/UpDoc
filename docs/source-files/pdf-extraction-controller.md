# PdfExtractionController.cs

API controller that exposes PDF extraction functionality to the Umbraco backoffice.

## What it does

Provides Management API endpoints for extracting content from PDFs:
1. Accepts a media item's unique ID (GUID)
2. Retrieves the media item from Umbraco
3. Gets the file path from the media properties
4. Calls the PDF extraction service
5. Returns the extracted text and page count

## Endpoint

```
GET /umbraco/management/api/v1/createfrompdf/extract?mediaKey={guid}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| mediaKey | Guid | The unique identifier of the media item |

### Response

```json
{
    "text": "Extracted text content...",
    "pageCount": 4
}
```

### Error responses

- `404 Not Found` - Media item not found or file not on disk
- `400 Bad Request` - Media has no file or extraction failed

## Section extraction endpoint

```
GET /umbraco/management/api/v1/createfrompdf/page-section?mediaKey={guid}&heading={text}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| mediaKey | Guid | The unique identifier of the media item |
| heading | string | The heading text to search for (case-insensitive) |

### Response

```json
{
    "heading": "Suggested Itinerary",
    "content": "Day 1: Arrive in...\nDay 2: Visit..."
}
```

### Error responses

- `404 Not Found` - Media item not found or file not on disk
- `400 Bad Request` - Heading not found or extraction failed

## Markdown extraction endpoint

```
GET /umbraco/management/api/v1/createfrompdf/extract-markdown?mediaKey={guid}
```

Extracts the full PDF content as Markdown with column detection for multi-column layouts.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| mediaKey | Guid | The unique identifier of the media item |

### Response

```json
{
    "title": "The Castles and Gardens of Kent",
    "subtitle": "5 days from £889",
    "markdown": "## Day 1\n\nArrive at...\n\n## Day 2\n\nVisit...",
    "rawText": "Full raw text for debugging"
}
```

### Error responses

- `404 Not Found` - Media item not found or file not on disk
- `400 Bad Request` - Extraction failed

## Key concepts

### Umbraco 17 Management API

Uses the new Management API pattern introduced in Umbraco 14+:
- `[ApiVersion("1.0")]` - API versioning
- `[MapToApi("createfrompdf")]` - API grouping for Swagger
- `[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]` - Backoffice auth
- `[JsonOptionsName("UmbracoManagementApi")]` - Umbraco JSON serialization

### Media file path resolution

The `umbracoFile` property can be stored as:
- Simple path: `/media/xxx/file.pdf`
- JSON object: `{"src":"/media/xxx/file.pdf"}`

The controller handles both formats.

## Dependencies

- `IMediaService` - Umbraco media service
- `IPdfExtractionService` - PDF extraction service
- `IWebHostEnvironment` - For resolving file paths

## Frontend usage

```typescript
const response = await fetch(
    `/umbraco/management/api/v1/createfrompdf/extract?mediaKey=${mediaUnique}`,
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
);
```
