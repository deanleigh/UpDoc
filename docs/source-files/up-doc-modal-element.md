# up-doc-modal.element.ts

The Lit component that renders the "Create from Source" sidebar modal.

## What it does

Provides the UI for users to:
1. Enter a document name (or leave blank to auto-populate from source)
2. Choose a source type (PDF Document, Web Page, or Word Document)
3. Configure the source (pick a media item, paste a URL, etc.)
4. For PDF sources: automatically extracts PDF properties (title, description) when selected
5. Extracts "Suggested Itinerary" section content if available (PDF only)
6. Pre-fills the document name with the extracted title (if not already entered)
7. Shows a preview of extracted properties and itinerary
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
    @state() private _pageTitle = '';
    @state() private _pageTitleShort = '';
    @state() private _pageDescription = '';
    @state() private _itineraryContent = '';
    @state() private _isExtracting = false;
    @state() private _extractionError: string | null = null;

    // ... methods and render
}
```

## Key concepts

### Extending UmbModalBaseElement

All Umbraco modals extend `UmbModalBaseElement<TData, TValue>`:
- `TData` - The data passed TO the modal when opening
- `TValue` - The data returned FROM the modal when submitted

### Automatic PDF extraction

When a PDF is selected, the modal automatically calls the backend API to extract properties:

```typescript
async #extractPdfProperties(mediaUnique: string) {
    this._isExtracting = true;

    const authContext = await this.getContext(UMB_AUTH_CONTEXT);
    const token = await authContext.getLatestToken();

    const response = await fetch(
        `/umbraco/management/api/v1/updoc/page-properties?mediaKey=${mediaUnique}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    const result = await response.json();
    this._pageTitle = result.title || '';
    this._pageTitleShort = result.title || '';
    this._pageDescription = result.description || '';

    // Pre-fill document name with extracted title
    if (result.title && !this._documentName) {
        this._documentName = result.title;
    }

    // Force re-render to ensure UI updates
    this.requestUpdate();
}
```

Note: The `requestUpdate()` call is necessary to ensure Lit re-renders after async state updates.

### Itinerary section extraction (Markdown)

After extracting page properties, the modal extracts the full PDF content as Markdown using the `extract-markdown` endpoint. This Markdown is then converted to HTML in the action when updating the Block Grid:

```typescript
async #extractItinerarySection(mediaUnique: string, token: string) {
    const response = await fetch(
        `/umbraco/management/api/v1/updoc/extract-markdown?mediaKey=${mediaUnique}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.ok) {
        const result = await response.json();
        // Store the Markdown content (will be converted to HTML in the action)
        this._itineraryContent = result.markdown || '';
    }
}
```

The Markdown extraction uses column detection to identify and merge multi-column PDF layouts (common in travel itineraries) into a single flow of content with proper heading hierarchy.

### Source type selection

The `uui-select` dropdown uses the `placeholder` attribute to show "Choose a source..." when no source type is selected. When the user changes the source type, all source-specific state is reset (selected media, URL, extracted properties). This ensures a clean slate when switching between source types.

Note: An explicit `requestUpdate()` call is required after setting `_sourceType` to ensure Lit re-renders the conditional source UI. This is necessary due to how `uui-select` dispatches change events within shadow DOM.

```typescript
#handleSourceTypeChange(e: Event) {
    const target = e.target as Element & { value: string };
    const newSourceType = target.value as SourceType | '';
    // Reset source-specific state when changing source type
    if (newSourceType !== this._sourceType) {
        this._selectedMediaUnique = null;
        this._sourceUrl = '';
        // ... reset extracted properties
    }
    this._sourceType = newSourceType;
    this.requestUpdate();
}
```

### Conditional source UI rendering

Each source type renders its own UI via `#renderSourceUI()`:
- **PDF** (`#renderPdfSource()`) - Media picker + extraction status (fully functional)
- **Web** (`#renderWebSource()`) - URL input + "not yet available" message
- **Doc** (`#renderDocSource()`) - Media picker + "not yet available" message

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
        pageTitle: this._pageTitle,
        pageTitleShort: this._pageTitleShort,
        pageDescription: this._pageDescription,
        itineraryContent: this._itineraryContent,
    };
    this.modalContext?.submit();  // Closes modal and returns value
}

#handleClose() {
    this.modalContext?.reject();  // Closes modal without returning
}
```

## Template structure

The modal is organized into three main sections:

1. **Document Name box** - At the top, with explanatory text: "Enter a document name or let it be populated from the source. You can edit this later."
2. **Source box** - Contains a source type dropdown (`uui-select`) and conditional source-specific UI below it
3. **Extracted Properties box** - Shows the extracted Page Title and Page Description after source processing

Uses Umbraco's UI components:
- `umb-body-layout` - Standard modal layout with headline "Create from Source" and action slots
- `uui-box` - Content containers with headlines (Document Name, Source, Extracted Properties)
- `uui-select` - Dropdown for choosing source type (PDF Document, Web Page, Word Document)
- `umb-property-layout` - Form field wrapper with label
- `umb-input-media` - Media picker for selecting PDF/Doc from media library
- `uui-input` - Text input for document name and web page URL
- `uui-loader-bar` - Loading indicator during extraction
- `uui-icon` - Status icons for success/error/info states
- `uui-button` - Action buttons (disabled until source configured and extraction complete)

## Extraction status display

The modal shows visual feedback during and after extraction:
- **Extracting**: Loading bar with "Extracting PDF properties..." message
- **Error**: Red box with error message
- **Success**: Green box with "PDF properties extracted successfully"

## Extracted properties preview

After successful extraction, shows a preview box with:
- Page Title
- Page Description
- Suggested Itinerary (truncated preview if available)

## Styles

```typescript
static override styles = [
    UmbTextStyles,  // Umbraco's base text styles
    css`
        uui-box { margin-bottom: var(--uui-size-space-4); }
        uui-select { width: 100%; }
        .extraction-status { ... }
        .extraction-status.extracting { ... }
        .extraction-status.error { ... }
        .extraction-status.success { ... }
        .source-coming-soon { ... }  // Info message for non-functional sources
        .preview-box { ... }
    `
];
```

## Global declaration

```typescript
declare global {
    interface HTMLElementTagNameMap {
        'up-doc-modal': UpDocModalElement;
    }
}
```

This provides TypeScript support when using `document.createElement('up-doc-modal')`.
