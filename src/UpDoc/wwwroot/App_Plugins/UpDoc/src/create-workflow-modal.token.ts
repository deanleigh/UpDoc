import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface CreateWorkflowModalData {}

export interface CreateWorkflowModalValue {
	name: string;
	documentTypeAlias: string;
	blueprintId?: string;
	blueprintName?: string;
}

export const UMB_CREATE_WORKFLOW_MODAL = new UmbModalToken<CreateWorkflowModalData, CreateWorkflowModalValue>(
	'UpDoc.CreateWorkflowModal',
	{
		modal: {
			type: 'dialog',
			size: 'small',
		},
	},
);
