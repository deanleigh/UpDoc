import { UmbModalToken } from '@umbraco-cms/backoffice/modal';
import type { AreaTemplate } from './workflow.types.js';

export interface AreaEditorModalData {
	workflowAlias: string;
	existingTemplate?: AreaTemplate | null;
	selectedPages?: number[] | null;
}

export interface AreaEditorModalValue {
	template: AreaTemplate;
}

export const UMB_AREA_EDITOR_MODAL = new UmbModalToken<AreaEditorModalData, AreaEditorModalValue>(
	'UpDoc.AreaEditorModal',
	{
		modal: {
			type: 'sidebar',
			size: 'large',
		},
	},
);
