# up-doc-action.ts

The entity action class that handles the "Create Document from Source" menu click.

## What it does

When a user clicks "Create Document from Source" in the document tree context menu, this action:
1. Gets the parent document's document type
2. Discovers allowed child document types and their blueprints (grouped by document type)
3. Opens the **blueprint picker dialog** -- user selects a document type, then a blueprint for that type (or sees "create one first" message if no blueprints exist)
4. Opens the **source sidebar modal** -- passes the selected `blueprintId` so the modal can look up the map file and extract sections accordingly
5. Destructures `extractedSections` and `propertyMappings` from the modal return value
6. Scaffolds from the selected blueprint to get default values
7. Loops over `propertyMappings` to dynamically apply each mapping (simple property or block grid)
8. Creates a new document via the Management API
9. Saves the document to properly persist it and trigger cache updates
10. Shows success/error notifications
11. Navigates to the newly created document

## Class structure

```typescript
export class UpDocEntityAction extends UmbEntityActionBase<never> {
    #documentTypeStructureRepository = new UmbDocumentTypeStructureRepository(this);
    #blueprintItemRepository = new UmbDocumentBlueprintItemRepository(this);
    #documentItemRepository = new UmbDocumentItemRepository(this);

    constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
        super(host, args);
    }

    override async execute() {
        // Opens modals, discovers blueprints, creates document
    }
}
```

## Key concepts

### Modal handling with cancellation

The modal can be cancelled (clicking outside or Close button), which throws an error. This is handled gracefully:

```typescript
let modalValue;
try {
    modalValue = await umbOpenModal(this, UMB_UP_DOC_MODAL, {
        data: {
            unique: parentUnique,
            blueprintName: selectedBlueprint?.blueprintName ?? '',
            blueprintId: blueprintUnique,
        },
    });
} catch {
    // Modal was cancelled
    return;
}
```

Note that `blueprintId` is passed in the modal data so the modal can use it to fetch the map file and extract sections.

### Getting parent document type

The action first fetches the parent document to get its document type unique, which is required for looking up allowed children:

```typescript
let parentDocTypeUnique: string | null = null;

if (parentUnique) {
    const { data: parentItems } = await this.#documentItemRepository.requestItems([parentUnique]);
    if (parentItems?.length) {
        parentDocTypeUnique = parentItems[0].documentType.unique;
    }
}
```

### Blueprint discovery and picker dialog

The action discovers blueprints for allowed child document types, grouped by document type. Only document types that have at least one blueprint are included:

```typescript
const documentTypeOptions: DocumentTypeOption[] = [];

for (const docType of allowedTypes.items) {
    const { data: blueprints } = await this.#blueprintItemRepository.requestItemsByDocumentType(docType.unique);
    if (blueprints?.length) {
        documentTypeOptions.push({
            documentTypeUnique: docType.unique,
            documentTypeName: docType.name,
            documentTypeIcon: docType.icon ?? null,
            blueprints: blueprints.map((bp) => ({
                blueprintUnique: bp.unique,
                blueprintName: bp.name,
            })),
        });
    }
}

const blueprintSelection = await umbOpenModal(this, UMB_BLUEPRINT_PICKER_MODAL, {
    data: { documentTypes: documentTypeOptions },
});
```

### Destructuring modal return value

The modal now returns `extractedSections` (a `Record<string, string>`) and `propertyMappings` (a `PropertyMapping[]`) instead of individual fields like `pageTitle`, `pageTitleShort`, etc.:

```typescript
const { name, mediaUnique, extractedSections, propertyMappings } = modalValue;
```

### Dynamic property mapping

Instead of hardcoded `setValue` calls, the action loops over `propertyMappings` from the map file and applies each one:

```typescript
for (const mapping of propertyMappings) {
    const sectionValue = extractedSections[mapping.from.sectionType];
    if (!sectionValue) continue;

    if (mapping.to.blockGrid) {
        // Block grid mapping
        this.#applyBlockMapping(values, mapping, sectionValue);
    } else if (mapping.to.property) {
        // Simple property mapping
        setValue(mapping.to.property, sectionValue);

        // Also map to additional properties
        if (mapping.to.alsoMapTo) {
            for (const alias of mapping.to.alsoMapTo) {
                setValue(alias, sectionValue);
            }
        }
    }
}
```

This replaces the previous hardcoded `pageTitle`, `pageTitleShort`, `pageDescription` assignments and the `#updateContentGridWithItinerary` method.

### Block grid mapping via #applyBlockMapping

The generic `#applyBlockMapping` method replaces the former `#updateContentGridWithItinerary`. It finds a block within a block grid by searching for a property value match, then writes the extracted content to the target property:

```typescript
#applyBlockMapping(
    values: Array<{ alias: string; value: unknown }>,
    mapping: PropertyMapping,
    sectionValue: string
) {
    const gridAlias = mapping.to.blockGrid;
    const blockSearch = mapping.to.blockSearch;
    const targetProperty = mapping.to.targetProperty;

    // Find the grid in scaffold values, parse if stringified
    const contentGrid = wasString
        ? JSON.parse(contentGridValue.value as string)
        : contentGridValue.value;

    // Search contentData for matching block
    for (const block of contentData) {
        const searchValue = block.values?.find((v) => v.alias === blockSearch.property);
        if (searchValue?.value?.toLowerCase().includes(blockSearch.value.toLowerCase())) {
            const targetValue = block.values?.find((v) => v.alias === targetProperty);
            if (mapping.to.convertMarkdown) {
                const htmlContent = markdownToHtml(sectionValue);
                targetValue.value = buildRteValue(htmlContent);
            } else {
                targetValue.value = sectionValue;
            }
            break;
        }
    }

    // Stringify back if it was originally a string
    contentGridValue.value = wasString ? JSON.stringify(contentGrid) : contentGrid;
}
```

When `convertMarkdown` is true, the method uses `markdownToHtml` and `buildRteValue` from `transforms.ts` to convert the Markdown content into the Umbraco RTE value structure.

### Scaffolding from blueprint

The scaffold endpoint returns the blueprint's default values:

```typescript
const scaffoldResponse = await fetch(
    `/umbraco/management/api/v1/document-blueprint/${blueprintUnique}/scaffold`,
    { headers: { Authorization: `Bearer ${token}` } }
);
const scaffold = await scaffoldResponse.json();
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
import { UMB_UP_DOC_MODAL } from './up-doc-modal.token.js';
import { UMB_BLUEPRINT_PICKER_MODAL } from './blueprint-picker-modal.token.js';
import type { DocumentTypeOption } from './blueprint-picker-modal.token.js';
import type { PropertyMapping } from './map-file.types.js';
import { markdownToHtml, buildRteValue } from './transforms.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';
```

Note: The `marked` library is no longer imported directly. Markdown conversion is now handled via `transforms.ts`.

## Data flow

1. `this.args.unique` -- Parent document ID (where user right-clicked)
2. Action fetches parent document to get its document type unique
3. Action discovers allowed child document types and their blueprints (grouped by doc type)
4. Blueprint picker dialog returns `{ blueprintUnique, documentTypeUnique }` after two-step selection
5. Source sidebar modal receives `{ unique, blueprintName, blueprintId }` and returns `{ name, mediaUnique, extractedSections, propertyMappings }`
6. Scaffolds from selected blueprint to get default values
7. Loops over `propertyMappings`, applying each mapping to scaffold values
8. POSTs to create document API
9. Fetches and saves the document to properly persist it
10. Shows notification and navigates to the new document

### Navigation after creation

After successfully creating the document, the action navigates to the new document with a short delay:

```typescript
if (newDocumentId) {
    const newPath = `/umbraco/section/content/workspace/document/edit/${newDocumentId}`;
    setTimeout(() => {
        window.location.href = newPath;
    }, 150);
}
```

The delay helps avoid race condition errors with Block Preview that can occur during rapid navigation.

## Default export

The class is exported both as named and default export -- the default export is what the manifest's `api` loader expects.
