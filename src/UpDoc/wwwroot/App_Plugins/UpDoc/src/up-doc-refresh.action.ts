import { UmbWorkspaceActionBase, UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbWorkspaceActionArgs } from '@umbraco-cms/backoffice/workspace';
import type { UpDocWorkflowWorkspaceContext } from './up-doc-workflow-workspace.context.js';

export class UpDocRefreshAction extends UmbWorkspaceActionBase {
	#retrieveContext: Promise<unknown>;
	#workspaceContext?: UpDocWorkflowWorkspaceContext;

	constructor(host: UmbControllerHost, args: UmbWorkspaceActionArgs) {
		super(host, args);
		this.#retrieveContext = this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			this.#workspaceContext = context as UpDocWorkflowWorkspaceContext;
		}).asPromise();
	}

	override async execute() {
		await this.#retrieveContext;
		await this.#workspaceContext?.refresh();
	}
}

export { UpDocRefreshAction as api };
