import type { DestinationConfig, SectionMapping } from './workflow.types.js';
import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface DestinationPickerModalData {
	destination: DestinationConfig;
	/** Existing mappings so the picker can show which fields are already mapped */
	existingMappings?: SectionMapping[];
}

export interface DestinationPickerModalValue {
	selectedTargets: Array<{ target: string; blockKey?: string; contentTypeKey?: string }>;
}

export const UMB_DESTINATION_PICKER_MODAL = new UmbModalToken<
	DestinationPickerModalData,
	DestinationPickerModalValue
>('UpDoc.DestinationPickerModal', {
	modal: {
		type: 'sidebar',
		size: 'medium',
	},
});
