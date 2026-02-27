import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface BlueprintOption {
	blueprintUnique: string;
	blueprintName: string;
}

export interface DocumentTypeOption {
	documentTypeUnique: string;
	documentTypeName: string;
	documentTypeIcon: string | null;
	blueprints: BlueprintOption[];
}

export interface BlueprintPickerModalData {
	documentTypes: DocumentTypeOption[];
	/** When provided, auto-selects this doc type on open, skipping straight to the blueprint list. */
	preSelectedDocTypeUnique?: string;
}

export interface BlueprintPickerModalValue {
	blueprintUnique: string;
	documentTypeUnique: string;
}

export const UMB_BLUEPRINT_PICKER_MODAL = new UmbModalToken<BlueprintPickerModalData, BlueprintPickerModalValue>(
	'UpDoc.BlueprintPickerModal',
	{
		modal: {
			type: 'dialog',
			size: 'small',
		},
	},
);
