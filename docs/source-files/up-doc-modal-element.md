# up-doc-modal.element.ts

The Lit component that renders the "Create from Source" sidebar modal.

## What it does

Provides the UI for users to:
1. See which blueprint was selected (displayed at the top)
2. Enter a document name (or leave blank to auto-populate from source)
3. Choose a source type (PDF Document, Web Page, or Word Document)
4. Configure the source (pick a media item, paste a URL, etc.)
5. For PDF sources: automatically extracts sections using the map file's extraction rules when a media item is selected
6. Pre-fills the document name with the extracted title (if not already entered)
7. Shows a dynamic preview of all extracted sections
8. Submit or cancel the operation

Currently only the PDF source type is fully functional. Web Page and Word Document source types show their respective UI (URL input and media picker) but display "not yet available" messages and the Create button remains disabled.

## Class structure

```typescript
@customElement('up-doc-modal')
export class UpDocModalElement extends UmbModalBaseElement<
    UmbUpDocModalData,
    UmbUpDocModalValue
> {
    @state() private _documentName = '';
    @state() private _sourceType: SourceType | '' = '';
    @state() private _sourceUrl = '';
    @state() private _selectedMediaUnique: string | null = null;
    @state() private _extractedSections: Record<string, string> = {};
    @state() private _propertyMappings: PropertyMapping[] = [];
    @state() private _isExtracting = false;
    @state() private _extractionError: string | null = null;

    // ... methods and render
}
```

The previous individual property state fields (`_pageTitle`, `_pageTitleShort`, `_pageDescription`, `_itineraryContent`) have been replaced by:
- `_extractedSections` -- a `Record<string, string>` holding all extracted values keyed by section type (e.g., "title", "description", "content")
- `_propertyMappings` -- a `PropertyMapping[]` from the map file, passed through to the action

## Key concepts

### Extending UmbModalBaseElement

All Umbraco modals extend `UmbModalBaseElement<TData, TValue>`:
- `TData` -- The data passed TO the modal when opening
- `TValue` -- The data returned FROM the modal when submitted

### Unified extraction via #extractFromSource

The previous `#extractPdfProperties` and `#extractItinerarySection` methods have been replaced by a single `#extractFromSource` method that calls the `extractSections` function from `map-file.service.ts`:

```typescript
async #extractFromSource(mediaUnique: string) {
    this._isExtracting = true;
    this._extractionError = null;

    try {
        const blueprintId = this.data?.blueprintId;
        if (!blueprintId) {
            this._extractionError = 'No blueprint ID available';
            return;
        }

        const authContext = await this.getContext(UMB_AUTH_CONTEXT);
        const token = await authContext.getLatestToken();

        const result = await extractSections(mediaUnique, blueprintId, token);

        if (!result) {
            this._extractionError = 'Failed to extract content from source';
            return;
        }

        this._extractedSections = result.sections;
        this._propertyMappings = result.propertyMappings;

        // Pre-fill document name with extracted title
        if (result.sections['title'] && !this._documentName) {
            this._documentName = result.sections['title'];
        }
    } catch (error) {
        this._extractionError = 'Failed to connect to extraction service';
    } finally {
        this._isExtracting = false;
    }
}
```

This method delegates all extraction logic to the backend, which uses the map file's `PdfExtractionRules` to determine how to parse the PDF.

### Dynamic extracted content preview

The preview section now renders all extracted sections dynamically using `Object.entries`:

```typescript
#renderExtractedPreview() {
    const sections = this._extractedSections;
    const hasContent = Object.values(sections).some((v) => v.length > 0);
    if (!hasContent) return nothing;

    return html`
        <uui-box headline="Extracted Content" class="preview-box">
            ${Object.entries(sections).map(([key, value]) => {
                if (!value) return nothing;
                const truncated = value.length > 200 ? `${value.substring(0, 200)}...` : value;
                return html`
                    <div class="preview-item">
                        <strong>${key}:</strong>
                        <div class="preview-value">${truncated}</div>
                    </div>
                `;
            })}
        </uui-box>
    `;
}
```

This replaces the previous hardcoded preview that showed only Page Title, Page Description, and Suggested Itinerary.

### Source type selection

The `uui-select` dropdown uses the `placeholder` attribute to show "Choose a source..." when no source type is selected. When the user changes the source type, all source-specific state is reset (selected media, URL, extracted sections, property mappings). This ensures a clean slate when switching between source types.

### Conditional source UI rendering

Each source type renders its own UI via `#renderSourceUI()`:
- **PDF** (`#renderPdfSource()`) -- Media picker + extraction status (fully functional)
- **Web** (`#renderWebSource()`) -- URL input + "not yet available" message
- **Doc** (`#renderDocSource()`) -- Media picker + "not yet available" message

### Create button enablement

The `#getCanCreate()` method controls when the Create button is enabled:
- Requires a document name and no active extraction
- For PDF: also requires a selected media item
- For Web and Doc: always returns false (not yet functional)

### Modal context methods

```typescript
#handleSave() {
    this.value = {
        name: this._documentName,
        sourceType: this._sourceType as SourceType,
        mediaUnique: this._selectedMediaUnique,
        sourceUrl: this._sourceUrl || null,
        extractedSections: this._extractedSections,
        propertyMappings: this._propertyMappings,
    };
    this._submitModal();
}

#handleClose() {
    this._rejectModal();
}
```

The `#handleSave` method now returns `extractedSections` and `propertyMappings` instead of the previous individual fields.

## Template structure

The modal is organized into four main sections:

1. **Blueprint box** -- Shows the selected blueprint name with an icon
2. **Document Name box** -- Text input with explanatory text: "Enter a document name or let it be populated from the source. You can edit this later."
3. **Source box** -- Contains a source type dropdown (`uui-select`) and conditional source-specific UI below it
4. **Extracted Content box** -- Dynamically renders all extracted sections after source processing

Uses Umbraco's UI components:
- `umb-body-layout` -- Standard modal layout with headline "Create from Source" and action slots
- `uui-box` -- Content containers with headlines (Blueprint, Document Name, Source, Extracted Content)
- `uui-select` -- Dropdown for choosing source type (PDF Document, Web Page, Word Document)
- `umb-property-layout` -- Form field wrapper with label
- `umb-input-media` -- Media picker for selecting PDF/Doc from media library
- `uui-input` -- Text input for document name and web page URL
- `uui-loader-bar` -- Loading indicator during extraction
- `uui-icon` -- Status icons for success/error/info states
- `uui-button` -- Action buttons (disabled until source configured and extraction complete)

## Extraction status display

The modal shows visual feedback during and after extraction:
- **Extracting**: Loading bar with "Extracting content from source..." message
- **Error**: Red box with error message
- **Success**: Green box with "Content extracted successfully"

## Styles

```typescript
static override styles = [
    UmbTextStyles,  // Umbraco's base text styles
    css`
        .blueprint-display { display: flex; align-items: center; gap: ...; }
        uui-input { width: 100%; }
        uui-box { margin-bottom: var(--uui-size-space-4); }
        .extraction-status { ... }
        .extraction-status.extracting { ... }
        .extraction-status.error { ... }
        .extraction-status.success { ... }
        .preview-box { ... }
        .preview-item { ... }
        .preview-value { ... white-space: pre-wrap; max-height: 100px; overflow-y: auto; }
        .source-coming-soon { ... }
    `
];
```

## Imports

```typescript
import type { UmbUpDocModalData, UmbUpDocModalValue, SourceType } from './up-doc-modal.token.js';
import type { PropertyMapping } from './map-file.types.js';
import { extractSections } from './map-file.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
```

Note: The modal now imports `extractSections` from `map-file.service.js` and `PropertyMapping` from `map-file.types.js` instead of making direct fetch calls to individual endpoints.

## Global declaration

```typescript
declare global {
    interface HTMLElementTagNameMap {
        'up-doc-modal': UpDocModalElement;
    }
}
```

This provides TypeScript support when using `document.createElement('up-doc-modal')`.
