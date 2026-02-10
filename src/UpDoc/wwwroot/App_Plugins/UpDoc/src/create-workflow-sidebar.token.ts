import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface CreateWorkflowSidebarData {
	documentTypeUnique: string;
	documentTypeName: string;
	documentTypeAlias: string;
	blueprintUnique: string;
	blueprintName: string;
}

export interface CreateWorkflowSidebarValue {
	name: string;
	sourceType: string;
	mediaUnique: string | null;
	sourceUrl: string | null;
	documentTypeAlias: string;
	blueprintId: string;
	blueprintName: string;
}

export const UMB_CREATE_WORKFLOW_SIDEBAR = new UmbModalToken<CreateWorkflowSidebarData, CreateWorkflowSidebarValue>(
	'UpDoc.CreateWorkflowSidebar',
	{
		modal: {
			type: 'sidebar',
			size: 'small',
		},
	},
);
