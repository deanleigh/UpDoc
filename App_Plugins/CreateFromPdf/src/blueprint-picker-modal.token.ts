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
}

export interface BlueprintPickerModalValue {
	blueprintUnique: string;
	documentTypeUnique: string;
}

export const UMB_BLUEPRINT_PICKER_MODAL = new UmbModalToken<BlueprintPickerModalData, BlueprintPickerModalValue>(
	'CreateFromPdf.BlueprintPickerModal',
	{
		modal: {
			type: 'dialog',
			size: 'small',
		},
	},
);
