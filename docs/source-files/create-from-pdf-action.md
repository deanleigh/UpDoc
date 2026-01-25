# create-from-pdf-action.ts

The entity action class that handles the "Create from PDF" menu click.

## What it does

When a user clicks "Create from PDF" in the document tree context menu, this action:
1. Opens the PDF upload modal
2. Waits for the user to submit
3. Processes the result (document name)

## Class structure

```typescript
export class CreateFromPdfEntityAction extends UmbEntityActionBase<never> {
    constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
        super(host, args);
    }

    override async execute() {
        // Opens modal and handles result
    }
}

export default CreateFromPdfEntityAction;
```

## Key concepts

### Extending UmbEntityActionBase

All entity actions must extend `UmbEntityActionBase<T>` where `T` is the repository type (or `never` if not using a repository).

### The execute() method

This is called when the user clicks the menu item:

```typescript
override async execute() {
    const value = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
        data: { unique: this.args.unique ?? null },
    });

    const { name } = value;
    if (!name) return;

    // TODO: Process PDF and create document
}
```

### Modal data flow

- `this.args.unique` - The unique ID of the parent document (where user right-clicked)
- `value` - The modal's return value containing the document name

## Imports

```typescript
import { UMB_CREATE_FROM_PDF_MODAL } from './create-from-pdf-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
```

## Default export

The class is exported both as named and default export - the default export is what the manifest's `api` loader expects.
