import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface BlueprintOption {
	blueprintUnique: string;
	blueprintName: string;
	documentTypeUnique: string;
	documentTypeName: string;
}

export interface BlueprintPickerModalData {
	blueprints: BlueprintOption[];
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
