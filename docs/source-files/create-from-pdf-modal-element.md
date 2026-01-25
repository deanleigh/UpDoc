# create-from-pdf-modal.element.ts

The Lit component that renders the PDF selection modal dialog.

## What it does

Provides the UI for users to:
1. Enter a document name
2. Select a PDF from the media library
3. Submit or cancel the operation

## Class structure

```typescript
@customElement('create-from-pdf-modal')
export class CreateFromPdfModalElement extends UmbModalBaseElement<
    UmbCreateFromPdfModalData,
    UmbCreateFromPdfModalValue
> {
    @state()
    private _documentName = '';

    @state()
    private _selectedMediaUnique: string | null = null;

    // ... methods and render
}
```

## Key concepts

### Extending UmbModalBaseElement

All Umbraco modals extend `UmbModalBaseElement<TData, TValue>`:
- `TData` - The data passed TO the modal when opening
- `TValue` - The data returned FROM the modal when submitted

### Lit decorators

- `@customElement('create-from-pdf-modal')` - Registers the web component
- `@state()` - Reactive property that triggers re-render when changed

### Modal context methods

```typescript
#handleMediaChange(e: CustomEvent) {
    const target = e.target as UmbInputMediaElement;
    const selection = target.selection;
    this._selectedMediaUnique = selection.length > 0 ? selection[0] : null;
}

#handleSave() {
    this.value = { name: this._documentName, mediaUnique: this._selectedMediaUnique };
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
- `uui-input` - Text input for document name
- `umb-input-media` - Media picker for selecting PDF from media library
- `uui-button` - Action buttons

## Styles

```typescript
static override styles = [
    UmbTextStyles,  // Umbraco's base text styles
    css`...`        // Component-specific styles
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
