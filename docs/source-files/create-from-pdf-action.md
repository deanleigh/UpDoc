# create-from-pdf-action.ts

The entity action class that handles the "Create Document from PDF" menu click.

## What it does

When a user clicks "Create Document from Source" in the document tree context menu, this action:
1. Gets the parent document's document type
2. Discovers all available blueprints for allowed child document types
3. Opens the **blueprint picker dialog** — user selects which blueprint to use (or sees "create one first" message if none exist)
4. Opens the **source sidebar modal** — user selects source type and content
5. Scaffolds from the selected blueprint to get default values
6. Creates a new document with extracted properties (pageTitle, pageTitleShort, pageDescription)
7. Updates Block Grid contentGrid with itinerary content in the "Suggested Itinerary" RTE block
8. Saves the document to properly persist it and trigger cache updates
9. Shows success/error notifications
10. Navigates to the newly created document

## Class structure

```typescript
export class CreateFromPdfEntityAction extends UmbEntityActionBase<never> {
    #documentTypeStructureRepository = new UmbDocumentTypeStructureRepository(this);
    #blueprintItemRepository = new UmbDocumentBlueprintItemRepository(this);
    #documentItemRepository = new UmbDocumentItemRepository(this);

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

### Getting parent document type

The action first fetches the parent document to get its document type unique, which is required for looking up allowed children:

```typescript
// Step 1: Get the parent document's document type
let parentDocTypeUnique: string | null = null;

if (parentUnique) {
    const { data: parentItems } = await this.#documentItemRepository.requestItems([parentUnique]);
    if (parentItems?.length) {
        parentDocTypeUnique = parentItems[0].documentType.unique;
    }
}
```

### Blueprint discovery and picker dialog

The action discovers all available blueprints for allowed child document types, then opens a dialog for the user to choose:

```typescript
// Step 3: Discover all blueprints for allowed child types
const blueprintOptions: BlueprintOption[] = [];

for (const docType of allowedTypes.items) {
    const { data: blueprints } = await this.#blueprintItemRepository.requestItemsByDocumentType(docType.unique);
    if (blueprints?.length) {
        for (const bp of blueprints) {
            blueprintOptions.push({
                blueprintUnique: bp.unique,
                blueprintName: bp.name,
                documentTypeUnique: docType.unique,
                documentTypeName: docType.name,
            });
        }
    }
}

// Step 4: Open blueprint picker dialog
const blueprintSelection = await umbOpenModal(this, UMB_BLUEPRINT_PICKER_MODAL, {
    data: { blueprints: blueprintOptions },
});
```

The dialog always opens, even with one blueprint, for consistency and discoverability. If no blueprints exist, the dialog shows a message telling the user to create one first.

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

### Updating Block Grid with itinerary content

If the PDF contains a "Suggested Itinerary" section, the action updates the contentGrid property.

**Important:** The contentGrid value must be stringified back after modification if it was originally a JSON string. The API expects the same format as received from the scaffold.

```typescript
#updateContentGridWithItinerary(values, itineraryContent) {
    // Track if the value was originally a string
    const wasString = typeof contentGridValue.value === 'string';

    // Parse the contentGrid JSON
    const contentGrid = wasString
        ? JSON.parse(contentGridValue.value)
        : contentGridValue.value;

    // Find block with featurePropertyFeatureTitle = "Suggested Itinerary"
    for (const block of contentGrid.contentData) {
        const titleValue = block.values?.find(v => v.alias === 'featurePropertyFeatureTitle');
        if (titleValue?.value?.toLowerCase().includes('suggested itinerary')) {
            // Update richTextContent with HTML-wrapped content
            const rteValue = block.values?.find(v => v.alias === 'richTextContent');
            rteValue.value = {
                blocks: { contentData: [], settingsData: [], expose: [], Layout: {} },
                markup: htmlContent,
            };
        }
    }

    // Stringify back if it was originally a string
    contentGridValue.value = wasString ? JSON.stringify(contentGrid) : contentGrid;
}
```

### Block Grid structure

The `featureRichTextEditor` element type (Feature - Rich Text Editor) contains:
- `featurePropertyFeatureTitle` (Textstring) - The block's title, e.g., "Suggested Itinerary"
- `richTextContent` (Richtext editor) - The actual RTE content

These properties are inherited from composition element types:
- Feature Component - Feature Title
- Feature Component - Rich Text Editor

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
import { UMB_BLUEPRINT_PICKER_MODAL } from './blueprint-picker-modal.token.js';
import type { BlueprintOption } from './blueprint-picker-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';
import { marked } from 'marked';
```

Note: The `marked` library is used to convert Markdown content (from PDF extraction) to HTML for the rich text editor.

## Data flow

1. `this.args.unique` - Parent document ID (where user right-clicked)
2. Action fetches parent document to get its document type unique
3. Action discovers all blueprints for allowed child document types
4. Blueprint picker dialog returns `{ blueprintUnique, documentTypeUnique }`
5. Source sidebar modal returns `{ name, mediaUnique, pageTitle, pageTitleShort, pageDescription, itineraryContent }`
6. Scaffolds from selected blueprint to get default values
7. Merges extracted values into scaffold
8. Updates contentGrid with itinerary content if available
9. POSTs to create document API
10. Fetches and saves the document to properly persist it
11. Shows notification and navigates to the new document

### Navigation after creation

After successfully creating the document, the action navigates to the new document with a short delay. This allows Block Preview and other async components to settle before the navigation occurs:

```typescript
if (newDocumentId) {
    const newPath = `/umbraco/section/content/workspace/document/edit/${newDocumentId}`;
    setTimeout(() => {
        window.location.href = newPath;
    }, 150);
}
```

The delay helps avoid race condition errors with Block Preview that can occur during rapid navigation.

### Markdown to HTML conversion

The itinerary content is extracted as Markdown from the PDF and converted to HTML using the `marked` library:

```typescript
#convertToHtml(markdown: string): string {
    if (!markdown) return '';

    try {
        const html = marked.parse(markdown, {
            gfm: true,      // GitHub Flavored Markdown
            breaks: false,  // Don't convert \n to <br>
        });

        if (typeof html === 'string') {
            return html;
        }

        // Fallback for async (shouldn't happen with sync config)
        return `<p>${markdown}</p>`;
    } catch (error) {
        // Fallback: wrap in paragraph tags
        return `<p>${markdown.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
    }
}
```

## Default export

The class is exported both as named and default export - the default export is what the manifest's `api` loader expects.
