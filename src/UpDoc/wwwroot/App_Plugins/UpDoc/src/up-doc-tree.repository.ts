import { UmbTreeRepositoryBase, UmbTreeServerDataSourceBase } from '@umbraco-cms/backoffice/tree';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbApi } from '@umbraco-cms/backoffice/extension-api';
import type { UmbTreeRootModel, UmbTreeChildrenOfRequestArgs, UmbTreeAncestorsOfRequestArgs, UmbTreeRootItemsRequestArgs } from '@umbraco-cms/backoffice/tree';

export const UPDOC_ENTITY_TYPE = 'updoc';
export const UPDOC_ROOT_ENTITY_TYPE = 'updoc-root';

export interface UpDocTreeItemModel {
	unique: string;
	parent: { unique: string | null; entityType: string };
	entityType: string;
	name: string;
	hasChildren: boolean;
	isFolder: boolean;
	icon: string;
}

class UpDocTreeDataSource extends UmbTreeServerDataSourceBase<any, UpDocTreeItemModel> {
	constructor(host: UmbControllerHost) {
		super(host, {
			getRootItems: async (_args: UmbTreeRootItemsRequestArgs) => {
				// Single item: "UpDoc" — this appears in the sidebar when hideTreeRoot is true
				const items: UpDocTreeItemModel[] = [
					{
						unique: 'updoc-settings',
						parent: { unique: null, entityType: UPDOC_ROOT_ENTITY_TYPE },
						entityType: UPDOC_ENTITY_TYPE,
						name: 'UpDoc',
						hasChildren: false,
						isFolder: false,
						icon: 'icon-nodes',
					},
				];
				return { data: { items, total: items.length } };
			},
			getChildrenOf: async (_args: UmbTreeChildrenOfRequestArgs) => {
				return { data: { items: [], total: 0 } };
			},
			getAncestorsOf: async (_args: UmbTreeAncestorsOfRequestArgs) => {
				return { data: [] };
			},
			mapper: (item: any) => item,
		});
	}
}

export class UpDocTreeRepository
	extends UmbTreeRepositoryBase<UpDocTreeItemModel, UmbTreeRootModel>
	implements UmbApi
{
	constructor(host: UmbControllerHost) {
		super(host, UpDocTreeDataSource);
	}

	async requestTreeRoot() {
		const data: UmbTreeRootModel = {
			unique: null,
			entityType: UPDOC_ROOT_ENTITY_TYPE,
			name: 'UpDoc',
			hasChildren: true,
			isFolder: true,
		};
		return { data };
	}
}

export { UpDocTreeRepository as api };
