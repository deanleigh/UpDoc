# create-from-pdf-modal.element.ts

The Lit component that renders the PDF selection modal dialog.

## What it does

Provides the UI for users to:
1. Select a PDF from the media library
2. Automatically extracts PDF properties (title, description) when selected
3. Pre-fills the document name with the extracted title
4. Allows user to edit the document name if needed
5. Shows a preview of extracted properties
6. Submit or cancel the operation

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
}
```

### Modal context methods

```typescript
#handleSave() {
    this.value = {
        name: this._documentName,
        mediaUnique: this._selectedMediaUnique,
        pageTitle: this._pageTitle,
        pageTitleShort: this._pageTitleShort,
        pageDescription: this._pageDescription,
    };
    this.modalContext?.submit();  // Closes modal and returns value
}

#handleClose() {
    this.modalContext?.reject();  // Closes modal without returning
}
```

## Template structure

Uses Umbraco's UI components:
- `umb-body-layout` - Standard modal layout with headline and action slots
- `uui-box` - Content container with optional headline
- `umb-property-layout` - Form field wrapper with label
- `umb-input-media` - Media picker for selecting PDF from media library
- `uui-input` - Text input for document name (pre-filled from PDF)
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

## Styles

```typescript
static override styles = [
    UmbTextStyles,  // Umbraco's base text styles
    css`
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
