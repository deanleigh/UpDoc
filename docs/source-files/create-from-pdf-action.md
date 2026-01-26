# create-from-pdf-action.ts

The entity action class that handles the "Create Document from PDF" menu click.

## What it does

When a user clicks "Create Document from PDF" in the document tree context menu, this action:
1. Opens the PDF selection modal
2. Gets the document name and selected media item
3. Calls the backend API to extract PDF text
4. Shows success/error notifications
5. (TODO) Creates a document with the extracted content

## Class structure

```typescript
export class CreateFromPdfEntityAction extends UmbEntityActionBase<never> {
    constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
        super(host, args);
    }

    override async execute() {
        // Opens modal, calls API, handles result
    }
}

export default CreateFromPdfEntityAction;
```

## Key concepts

### Modal handling with cancellation

The modal can be cancelled (clicking outside or Close button), which throws an error. This is handled gracefully:

```typescript
let value;
try {
    value = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
        data: { unique: this.args.unique ?? null },
    });
} catch {
    // Modal was cancelled
    return;
}
```

### Authentication for API calls

Umbraco 17 uses bearer token authentication for Management API calls:

```typescript
const authContext = await this.getContext(UMB_AUTH_CONTEXT);
const token = await authContext.getLatestToken();

const response = await fetch(url, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
```

### Notifications

Success and error notifications are shown using Umbraco's notification context:

```typescript
const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);
notificationContext.peek('positive', {
    data: { message: 'Success message' },
});
```

## Imports

```typescript
import { UMB_CREATE_FROM_PDF_MODAL } from './create-from-pdf-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
```

## Data flow

1. `this.args.unique` - Parent document ID (where user right-clicked)
2. Modal returns `{ name, mediaUnique }` - Document name and selected PDF
3. API called with `mediaUnique` to extract PDF text
4. API returns `{ text, pageCount }` - Extracted content

## Default export

The class is exported both as named and default export - the default export is what the manifest's `api` loader expects.
