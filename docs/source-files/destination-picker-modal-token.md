# destination-picker-modal.token.ts

Modal token for the destination field picker sidebar.

## What it does

Defines the `UmbModalToken` that configures the destination picker modal — a sidebar modal used when mapping source elements to destination fields.

## Token

```typescript
export const UMB_DESTINATION_PICKER_MODAL = new UmbModalToken<
    DestinationPickerModalData,
    DestinationPickerModalValue
>('UpDoc.DestinationPickerModal', {
    modal: {
        type: 'sidebar',
        size: 'small',
    },
});
```

## Data interface (input)

```typescript
export interface DestinationPickerModalData {
    destination: DestinationConfig;
}
```

- `destination` — the full destination config from the workflow, containing fields and block grids

## Value interface (output)

```typescript
export interface DestinationPickerModalValue {
    selectedTargets: string[];
}
```

- `selectedTargets` — array of field/property aliases selected by the user

## Used by

- `up-doc-workflow-source-view.element.ts` — imports the token to open the modal
- `destination-picker-modal.element.ts` — implements the modal UI
- `manifest.ts` — registers the modal with alias `UpDoc.DestinationPickerModal`
