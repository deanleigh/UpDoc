# create-from-pdf-modal.element.ts

The Lit component that renders the PDF selection modal dialog.

## What it does

Provides the UI for users to:
1. Enter a document name (or leave blank to auto-populate from PDF)
2. Select a PDF from the media library
3. Automatically extracts PDF properties (title, description) when selected
4. Extracts "Suggested Itinerary" section content if available
5. Pre-fills the document name with the extracted title (if not already entered)
6. Shows a preview of extracted properties and itinerary
7. Submit or cancel the operation

## Class structure

```typescript
@customElement('create-from-pdf-modal')
export class CreateFromPdfModalElement extends UmbModalBaseElement<
    UmbCreateFromPdfModalData,
    UmbCreateFromPdfModalValue
> {
    @state() private _documentName = '';
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
        `/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${mediaUnique}`,
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
        `/umbraco/management/api/v1/createfrompdf/extract-markdown?mediaKey=${mediaUnique}`,
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

### Modal context methods

```typescript
#handleSave() {
    this.value = {
        name: this._documentName,
        mediaUnique: this._selectedMediaUnique,
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

1. **Document Name box** - At the top, with explanatory text: "Enter a document name or let it be populated from the PDF. You can edit this later."
2. **Select PDF box** - Media picker for choosing a PDF from the media library
3. **Extracted Properties box** - Shows the extracted Page Title and Page Description after PDF selection

Uses Umbraco's UI components:
- `umb-body-layout` - Standard modal layout with headline and action slots
- `uui-box` - Content containers with headlines (Document Name, Select PDF, Extracted Properties)
- `umb-property-layout` - Form field wrapper with label
- `umb-input-media` - Media picker for selecting PDF from media library
- `uui-input` - Text input for document name (pre-filled from PDF if empty)
- `uui-loader-bar` - Loading indicator during extraction
- `uui-icon` - Status icons for success/error states
- `uui-button` - Action buttons (disabled until extraction complete)

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
        .extraction-status { ... }
        .extraction-status.extracting { ... }
        .extraction-status.error { ... }
        .extraction-status.success { ... }
        .preview-box { ... }
    `
];
```

## Global declaration

```typescript
declare global {
    interface HTMLElementTagNameMap {
        'create-from-pdf-modal': CreateFromPdfModalElement;
    }
}
```

This provides TypeScript support when using `document.createElement('create-from-pdf-modal')`.
