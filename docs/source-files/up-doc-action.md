# up-doc-action.ts

The entity action class that handles the "Create Document from Source" menu click.

## What it does

When a user clicks "Create Document from Source" in the document tree context menu, this action:

1. Gets the parent document's document type
2. Discovers allowed child document types and their blueprints (grouped by document type)
3. Fetches active workflows and **filters blueprints** to only those with complete workflows
4. Opens the **blueprint picker dialog** -- user selects a document type, then a blueprint
5. Opens the **source sidebar modal** -- passes the selected `blueprintId` so the modal can fetch the config and extract sections
6. Receives `extractedSections` and `config` from the modal return value
7. Scaffolds from the selected blueprint to get default values
8. Loops over `config.map.mappings` to apply each mapping using path-based targeting
9. Creates a new document via the Management API
10. Saves the document to properly persist it and trigger cache updates
11. Shows success/error notifications
12. Navigates to the newly created document

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

### Destructuring modal return value

The modal returns `extractedSections` (a `Record<string, string>`) and `config` (the full `DocumentTypeConfig`):

```typescript
const { name, mediaUnique, extractedSections, config } = modalValue;

if (!mediaUnique || !name || !config) {
    return;
}
```

### Blueprint filtering via active workflows

Before opening the blueprint picker, the action fetches the list of active workflows and filters out blueprints that don't have complete workflows:

```typescript
const authContext = await this.getContext(UMB_AUTH_CONTEXT);
const token = await authContext.getLatestToken();

const activeWorkflows = await fetchActiveWorkflows(token);
const activeBlueprintIds = new Set(activeWorkflows.blueprintIds);

// Only include blueprints that have complete workflows
const workflowBlueprints = blueprints.filter((bp) => activeBlueprintIds.has(bp.unique));
```

This means editors only see blueprints where an admin has fully configured the workflow (destination + map + at least one source). If no workflows match any allowed child type, a warning notification is shown and the action exits early.

### Config-driven mapping loop

The action loops over `config.map.mappings` and applies each mapping:

```typescript
for (const mapping of config.map.mappings) {
    if (mapping.enabled === false) continue;

    const sectionValue = extractedSections[mapping.source];
    if (!sectionValue) continue;

    for (const dest of mapping.destinations) {
        this.#applyDestinationMapping(values, dest, sectionValue, config);
    }
}
```

### Path-based destination mapping

The `#applyDestinationMapping` method handles both simple fields and block grid targets:

```typescript
#applyDestinationMapping(
    values: Array<{ alias: string; value: unknown }>,
    dest: MappingDestination,
    sectionValue: string,
    config: DocumentTypeConfig
) {
    const pathParts = dest.target.split('.');

    if (pathParts.length === 1) {
        // Simple field mapping: "pageTitle"
        const alias = pathParts[0];
        const existing = values.find((v) => v.alias === alias);
        if (existing) {
            existing.value = sectionValue;
        } else {
            values.push({ alias, value: sectionValue });
        }
    } else if (pathParts.length === 3) {
        // Block grid mapping: "contentGrid.itineraryBlock.richTextContent"
        const [gridKey, blockKey, propertyKey] = pathParts;

        // Look up block info from destination config
        const blockGrid = config.destination.blockGrids?.find((g) => g.key === gridKey);
        const block = blockGrid?.blocks.find((b) => b.key === blockKey);

        if (!blockGrid || !block) return;

        const gridAlias = blockGrid.alias;
        const targetProperty = block.properties?.find((p) => p.key === propertyKey)?.alias ?? propertyKey;
        const blockSearch = block.identifyBy;

        this.#applyBlockGridValue(values, gridAlias, blockSearch, targetProperty, sectionValue, shouldConvertMarkdown);
    }
}
```

### Target path syntax

| Pattern | Example | Meaning |
|---------|---------|---------|
| Simple field | `"pageTitle"` | Direct property on document |
| Block property | `"contentGrid.itineraryBlock.richTextContent"` | blockGridKey.blockKey.propertyKey |

The `key` values in the path are looked up in `config.destination.blockGrids` and `config.destination.blocks` to resolve the actual Umbraco aliases.

### Block grid value application

The `#applyBlockGridValue` method finds a block within a block grid by searching for a property value match, then writes the extracted content:

```typescript
#applyBlockGridValue(
    values: Array<{ alias: string; value: unknown }>,
    gridAlias: string,
    blockSearch: { property: string; value: string },
    targetProperty: string,
    value: string,
    convertMarkdown: boolean | undefined
) {
    const contentGridValue = values.find((v) => v.alias === gridAlias);
    const contentGrid = JSON.parse(contentGridValue.value as string);

    for (const block of contentGrid.contentData) {
        const searchValue = block.values?.find((v) => v.alias === blockSearch.property);
        if (searchValue?.value?.toLowerCase().includes(blockSearch.value.toLowerCase())) {
            const targetValue = block.values?.find((v) => v.alias === targetProperty);
            if (convertMarkdown) {
                const htmlContent = markdownToHtml(value);
                targetValue.value = buildRteValue(htmlContent);
            } else {
                targetValue.value = value;
            }
            break;
        }
    }

    contentGridValue.value = JSON.stringify(contentGrid);
}
```

### Markdown to HTML conversion

When the mapping has `convertMarkdownToHtml` transform, content is converted using `markdownToHtml` and `buildRteValue` from `transforms.ts`:

```typescript
const shouldConvertMarkdown = dest.transforms?.some((t) => t.type === 'convertMarkdownToHtml');

if (shouldConvertMarkdown) {
    const htmlContent = markdownToHtml(value);
    targetValue.value = buildRteValue(htmlContent);
}
```

### Scaffolding from blueprint

The scaffold endpoint returns the blueprint's default values including pre-populated block grids:

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

## Imports

```typescript
import { UMB_UP_DOC_MODAL } from './up-doc-modal.token.js';
import { UMB_BLUEPRINT_PICKER_MODAL } from './blueprint-picker-modal.token.js';
import type { DocumentTypeOption } from './blueprint-picker-modal.token.js';
import type { DocumentTypeConfig, MappingDestination } from './workflow.types.js';
import { fetchActiveWorkflows } from './workflow.service.js';
import { markdownToHtml, buildRteValue } from './transforms.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';
```

## Data flow

1. `this.args.unique` -- Parent document ID (where user right-clicked)
2. Action fetches parent document to get its document type unique
3. Action discovers allowed child document types and their blueprints
4. Fetches active workflows, filters blueprints to only those with complete workflows
5. Blueprint picker dialog returns `{ blueprintUnique, documentTypeUnique }`
6. Source sidebar modal receives `{ unique, blueprintName, blueprintId }` and returns `{ name, mediaUnique, extractedSections, config }`
7. Scaffolds from selected blueprint to get default values
8. Loops over `config.map.mappings`, applying each to scaffold values
9. POSTs to create document API
10. Fetches and saves the document to properly persist it
11. Shows notification and navigates to the new document

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
