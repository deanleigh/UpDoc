# blueprint-picker-modal.token.ts

Defines the modal token, data interface, and value interface for the blueprint picker dialog.

## What it does

Provides type-safe contracts for the blueprint picker dialog that opens as an interstitial step before the source sidebar modal. The dialog lets users choose which blueprint to use for the new document, or informs them if no blueprints are available.

## Interfaces

### BlueprintOption

Represents a single blueprint available for selection, including its parent document type:

```typescript
export interface BlueprintOption {
    blueprintUnique: string;
    blueprintName: string;
    documentTypeUnique: string;
    documentTypeName: string;
}
```

### BlueprintPickerModalData

Data passed into the modal when opening it:

```typescript
export interface BlueprintPickerModalData {
    blueprints: BlueprintOption[];
}
```

The `blueprints` array may be empty, in which case the dialog shows a "create a blueprint first" message instead of a selection list.

### BlueprintPickerModalValue

Data returned when the user selects a blueprint:

```typescript
export interface BlueprintPickerModalValue {
    blueprintUnique: string;
    documentTypeUnique: string;
}
```

## Modal token

```typescript
export const UMB_BLUEPRINT_PICKER_MODAL = new UmbModalToken<BlueprintPickerModalData, BlueprintPickerModalValue>(
    'CreateFromPdf.BlueprintPickerModal',
    {
        modal: {
            type: 'dialog',
            size: 'small',
        },
    },
);
```

- `type: 'dialog'` - Centered dialog (not a sidebar), matching Umbraco's native Create flow pattern
- `size: 'small'` - Compact dialog appropriate for a simple selection list
- The alias `CreateFromPdf.BlueprintPickerModal` must match the manifest registration

## Usage

```typescript
import { UMB_BLUEPRINT_PICKER_MODAL } from './blueprint-picker-modal.token.js';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';

const result = await umbOpenModal(this, UMB_BLUEPRINT_PICKER_MODAL, {
    data: { blueprints: blueprintOptions },
});
// result.blueprintUnique - selected blueprint ID
// result.documentTypeUnique - associated document type ID
```
