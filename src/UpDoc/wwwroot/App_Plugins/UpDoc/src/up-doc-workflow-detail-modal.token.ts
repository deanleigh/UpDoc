import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface UmbWorkflowDetailModalData {
	workflowName: string;
}

export type UmbWorkflowDetailModalValue = undefined;

export const UMB_WORKFLOW_DETAIL_MODAL = new UmbModalToken<UmbWorkflowDetailModalData, UmbWorkflowDetailModalValue>(
	'UpDoc.WorkflowDetailModal',
	{
		modal: {
			type: 'sidebar',
			size: 'medium',
		},
	},
);
