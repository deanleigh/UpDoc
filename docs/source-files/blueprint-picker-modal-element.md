# blueprint-picker-modal.element.ts

The UI component for the blueprint picker dialog.

## What it does

Renders a centered dialog that either:
- Lists available blueprints as clickable menu items (when one or more exist)
- Shows an informational message telling the user to create a blueprint first (when none exist)

This dialog opens as an interstitial step before the source sidebar modal, mirroring Umbraco's native Create flow where the user selects a document type and then a blueprint.

## Class structure

```typescript
@customElement('blueprint-picker-modal')
export class BlueprintPickerModalElement extends UmbModalBaseElement<
    BlueprintPickerModalData,
    BlueprintPickerModalValue
> {
    #handleBlueprintSelect(blueprintUnique, documentTypeUnique) { ... }
    #handleClose() { ... }
    #renderNoBlueprints() { ... }
    #renderBlueprintList() { ... }
    render() { ... }
}
```

## Rendering states

### Blueprints available

Each blueprint is rendered as a `uui-menu-item` with a blueprint icon and the document type name as a hint:

```html
<uui-menu-item label="Tour Page Blueprint">
    <umb-icon slot="icon" name="icon-blueprint"></umb-icon>
    <span class="doc-type-hint">Web Page</span>
</uui-menu-item>
```

This follows the same pattern Umbraco uses in its native Create dialog for blueprint selection.

### No blueprints

Shows a warning icon and message:
- Main message: "To create a document from a source, you first need to create a Document Blueprint."
- Hint: "Use the Create Document Blueprint option from the document actions menu."

The user can only close the dialog in this state; there is no submit action.

## Key patterns

### Modal submission

When a blueprint is selected, the value is set and the modal is submitted immediately (no separate confirmation button):

```typescript
#handleBlueprintSelect(blueprintUnique: string, documentTypeUnique: string) {
    this.value = { blueprintUnique, documentTypeUnique };
    this.modalContext?.submit();
}
```

### Modal cancellation

Closing the dialog (via Close button or clicking outside) rejects the modal, which the entity action catches to abort the workflow:

```typescript
#handleClose() {
    this.modalContext?.reject();
}
```

## Styles

- Uses `UmbTextStyles` for Umbraco base styles
- `.no-blueprints` - Centered column layout with warning icon, message, and hint text
- `.doc-type-hint` - Small, muted text showing the document type name next to each blueprint

## Design decisions

- **Always shown, even with one blueprint** - For consistency and discoverability. Users learn that blueprints are part of the workflow, so adding a second blueprint later is not surprising.
- **Dialog type, not sidebar** - This is a quick selection step, not a workspace. Centered dialogs are appropriate for simple choices.
- **No "Blank" option** - Unlike Umbraco's native Create flow, there is no "blank" option because the Create from Source feature requires a blueprint to define the target field structure.
