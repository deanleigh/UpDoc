import { UmbWorkspaceRouteManager, UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UmbObjectState } from '@umbraco-cms/backoffice/observable-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextBase } from '@umbraco-cms/backoffice/class-api';
import { LitElement, html } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UPDOC_ENTITY_TYPE } from './up-doc-tree.repository.js';

@customElement('up-doc-workspace-editor')
class UpDocWorkspaceEditorElement extends LitElement {
	override render() {
		return html`<umb-workspace-editor></umb-workspace-editor>`;
	}
}

interface UpDocWorkspaceData {
	unique: string;
	name?: string;
}

export class UpDocWorkspaceContext extends UmbContextBase {
	public readonly workspaceAlias = 'UpDoc.Workspace';

	#data = new UmbObjectState<UpDocWorkspaceData | undefined>(undefined);
	readonly data = this.#data.asObservable();
	readonly unique = this.#data.asObservablePart((data) => data?.unique);
	readonly name = this.#data.asObservablePart((data) => data?.name);

	readonly routes = new UmbWorkspaceRouteManager(this);

	constructor(host: UmbControllerHost) {
		super(host, UMB_WORKSPACE_CONTEXT);

		this.routes.setRoutes([
			{
				path: 'edit/:unique',
				component: UpDocWorkspaceEditorElement,
				setup: (_component: HTMLElement, info: any) => {
					const unique = info.match.params.unique;
					this.load(unique);
				},
			},
		]);
	}

	async load(unique: string) {
		this.#data.setValue({ unique, name: 'UpDoc' });
	}

	getUnique() {
		return this.#data.getValue()?.unique;
	}

	getEntityType() {
		return UPDOC_ENTITY_TYPE;
	}

	public override destroy(): void {
		this.#data.destroy();
		super.destroy();
	}
}

export { UpDocWorkspaceContext as api };
