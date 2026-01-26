# create-from-pdf-action.ts

The entity action class that handles the "Create Document from PDF" menu click.

## What it does

When a user clicks "Create Document from PDF" in the document tree context menu, this action:
1. Opens the PDF selection modal
2. Modal extracts PDF properties and returns document name + extracted values
3. Auto-detects available blueprints for allowed child document types
4. Scaffolds from the blueprint to get default values
5. Creates a new document with PDF-extracted properties (pageTitle, pageTitleShort, pageDescription)
6. Shows success/error notifications
7. Refreshes the page to show the new document

## Class structure

```typescript
export class CreateFromPdfEntityAction extends UmbEntityActionBase<never> {
    #documentTypeStructureRepository = new UmbDocumentTypeStructureRepository(this);
    #blueprintItemRepository = new UmbDocumentBlueprintItemRepository(this);

    constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
        super(host, args);
    }

    override async execute() {
        // Opens modal, finds blueprint, creates document
    }
}
```

## Key concepts

### Modal handling with cancellation

The modal can be cancelled (clicking outside or Close button), which throws an error. This is handled gracefully:

```typescript
let modalValue;
try {
    modalValue = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
        data: { unique: parentUnique },
    });
} catch {
    // Modal was cancelled
    return;
}
```

### Auto-detecting blueprints

The action automatically finds the appropriate blueprint based on allowed child document types:

```typescript
// Get allowed child document types for the parent
const { data: allowedTypes } = await this.#documentTypeStructureRepository.requestAllowedChildrenOf(
    null,
    parentUnique
);

// Find blueprints for allowed document types
for (const docType of allowedTypes.items) {
    const { data: blueprints } = await this.#blueprintItemRepository.requestItemsByDocumentType(docType.unique);
    if (blueprints?.length) {
        blueprint = blueprints[0];
        documentTypeUnique = docType.unique;
        break;
    }
}
```

### Scaffolding from blueprint

The scaffold endpoint returns the blueprint's default values:

```typescript
const scaffoldResponse = await fetch(
    `/umbraco/management/api/v1/document-blueprint/${blueprint.unique}/scaffold`,
    { headers: { Authorization: `Bearer ${token}` } }
);
const scaffold = await scaffoldResponse.json();
```

### Creating the document

The document is created with merged values (scaffold defaults + PDF-extracted):

```typescript
const createRequest = {
    parent: { id: parentUnique },
    documentType: { id: documentTypeUnique },
    template: scaffold.template ? { id: scaffold.template.id } : null,
    values: [
        // Scaffold values + overridden with:
        { alias: 'pageTitle', value: pageTitle },
        { alias: 'pageTitleShort', value: pageTitleShort },
        { alias: 'pageDescription', value: pageDescription },
    ],
    variants: [{ name, culture: null, segment: null }],
};

await fetch('/umbraco/management/api/v1/document', {
    method: 'POST',
    body: JSON.stringify(createRequest),
});
```

### Authentication for API calls

Umbraco uses bearer token authentication for Management API calls:

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
    data: { message: `Document "${name}" created successfully!` },
});
```

## Imports

```typescript
import { UMB_CREATE_FROM_PDF_MODAL } from './create-from-pdf-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
```

## Data flow

1. `this.args.unique` - Parent document ID (where user right-clicked)
2. Modal returns `{ name, mediaUnique, pageTitle, pageTitleShort, pageDescription }`
3. Action finds blueprint for allowed child document types
4. Scaffolds from blueprint to get default values
5. Merges PDF-extracted values into scaffold
6. POSTs to create document API
7. Shows notification and refreshes page

## Default export

The class is exported both as named and default export - the default export is what the manifest's `api` loader expects.
