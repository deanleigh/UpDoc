# create-from-pdf-modal.token.ts

Defines the modal token and TypeScript interfaces for type-safe modal communication.

## What it does

Creates a unique identifier (token) for the modal that:
1. Links the modal manifest to the modal element
2. Defines the data types for input and output
3. Configures modal appearance (sidebar vs dialog, size)

## The interfaces

```typescript
export interface UmbCreateFromPdfModalData {
    unique: string | null;  // Parent document ID
}

export interface UmbCreateFromPdfModalValue {
    name: string;              // The document name entered by user
    mediaUnique: string | null; // The selected media item's unique ID
}
```

## The token

```typescript
export const UMB_CREATE_FROM_PDF_MODAL = new UmbModalToken<
    UmbCreateFromPdfModalData,
    UmbCreateFromPdfModalValue
>(
    'CreateFromPdf.Modal',  // Must match manifest alias
    {
        modal: {
            type: 'sidebar',  // Opens as sidebar panel
            size: 'small',    // Sidebar width
        },
    },
);
```

## Key concepts

### UmbModalToken

A generic class that provides:
- Type safety for `umbOpenModal()` calls
- Configuration for how the modal appears
- A unique string alias linking manifest to component

### Modal types

- `'sidebar'` - Slides in from the right (used here)
- `'dialog'` - Centered overlay dialog

### Sidebar sizes

- `'small'` - Narrow sidebar (used here)
- `'medium'` - Standard width
- `'large'` - Wide sidebar
- `'full'` - Full width

## Usage

When opening the modal:

```typescript
import { UMB_CREATE_FROM_PDF_MODAL } from './create-from-pdf-modal.token.js';

const value = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
    data: { unique: parentId },  // TypeScript knows this must be UmbCreateFromPdfModalData
});
// value is typed as UmbCreateFromPdfModalValue
```
