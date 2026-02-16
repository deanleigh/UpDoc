import { UmbModalToken } from '@umbraco-cms/backoffice/modal';
import type { ZoneTemplate } from './workflow.types.js';

export interface ZoneEditorModalData {
	workflowName: string;
	existingTemplate?: ZoneTemplate | null;
	selectedPages?: number[] | null;
}

export interface ZoneEditorModalValue {
	template: ZoneTemplate;
}

export const UMB_ZONE_EDITOR_MODAL = new UmbModalToken<ZoneEditorModalData, ZoneEditorModalValue>(
	'UpDoc.ZoneEditorModal',
	{
		modal: {
			type: 'sidebar',
			size: 'large',
		},
	},
);
