import type { DestinationConfig } from './workflow.types.js';
import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface DestinationPickerModalData {
	destination: DestinationConfig;
}

export interface DestinationPickerModalValue {
	selectedTargets: Array<{ target: string; blockKey?: string }>;
}

export const UMB_DESTINATION_PICKER_MODAL = new UmbModalToken<
	DestinationPickerModalData,
	DestinationPickerModalValue
>('UpDoc.DestinationPickerModal', {
	modal: {
		type: 'sidebar',
		size: 'small',
	},
});
