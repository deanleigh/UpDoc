# create-workflow-modal.token.ts

Modal token definition for the Create Workflow dialog.

## What it does

Defines the data and return value types for the Create Workflow modal, and exports the modal token used to open it.

## Interfaces

### CreateWorkflowModalData

Empty interface — the modal requires no input data.

### CreateWorkflowModalValue

```typescript
interface CreateWorkflowModalValue {
    name: string;              // Workflow folder name (kebab-case)
    documentTypeAlias: string; // Umbraco document type alias
    blueprintId?: string;      // Blueprint GUID
    blueprintName?: string;    // Blueprint display name
}
```

## Token

```typescript
export const UMB_CREATE_WORKFLOW_MODAL = new UmbModalToken<CreateWorkflowModalData, CreateWorkflowModalValue>(
    'UpDoc.CreateWorkflowModal',
    { modal: { type: 'dialog', size: 'small' } },
);
```

## Used by

- `up-doc-workflows-view.element.ts` — opens the modal and handles the return value
- `create-workflow-modal.element.ts` — implements the modal UI
