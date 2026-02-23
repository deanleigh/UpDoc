import { UmbWorkspaceRouteManager, UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UmbObjectState } from '@umbraco-cms/backoffice/observable-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextBase } from '@umbraco-cms/backoffice/class-api';
import { html, state } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

@customElement('up-doc-workflow-workspace-editor')
class UpDocWorkflowWorkspaceEditorElement extends UmbLitElement {
	@state() private _name = '';

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			this.observe((context as any).name, (name: string) => {
				this._name = name || 'Workflow';
			});
		});
	}

	override render() {
		return html`<umb-workspace-editor headline=${this._name}></umb-workspace-editor>`;
	}
}

interface UpDocWorkflowData {
	unique: string;
	name?: string;
}

export class UpDocWorkflowWorkspaceContext extends UmbContextBase {
	public readonly workspaceAlias = 'UpDoc.WorkflowWorkspace';

	#data = new UmbObjectState<UpDocWorkflowData | undefined>(undefined);
	readonly data = this.#data.asObservable();
	readonly unique = this.#data.asObservablePart((data) => data?.unique);
	readonly name = this.#data.asObservablePart((data) => data?.name);

	/** Callback registered by the active workspace view to handle save. */
	#saveHandler: (() => Promise<void>) | null = null;

	/** Callback registered by the active workspace view to handle refresh/re-extract. */
	#refreshHandler: (() => Promise<void>) | null = null;

	/** Register a save handler (called by workspace views like Source). */
	setSaveHandler(handler: (() => Promise<void>) | null) {
		this.#saveHandler = handler;
	}

	/** Register a refresh handler for re-extraction (called by workspace views like Source). */
	setRefreshHandler(handler: (() => Promise<void>) | null) {
		this.#refreshHandler = handler;
	}

	/** Called by the workspace action (Save button). Delegates to the registered handler. */
	async save(): Promise<void> {
		if (this.#saveHandler) {
			await this.#saveHandler();
		}
	}

	/** Called by the Refresh workspace action. Triggers re-extraction. */
	async refresh(): Promise<void> {
		if (this.#refreshHandler) {
			await this.#refreshHandler();
		}
	}

	readonly routes = new UmbWorkspaceRouteManager(this);

	constructor(host: UmbControllerHost) {
		super(host, UMB_WORKSPACE_CONTEXT);

		this.routes.setRoutes([
			{
				path: 'edit/:unique',
				component: UpDocWorkflowWorkspaceEditorElement,
				setup: (_component: HTMLElement, info: any) => {
					const unique = info.match.params.unique;
					this.load(unique);
				},
			},
		]);
	}

	async load(unique: string) {
		const workflowName = decodeURIComponent(unique);
		// Format "group-tour" → "Group Tour" for display
		const displayName = workflowName
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		this.#data.setValue({ unique, name: displayName });
	}

	getUnique() {
		return this.#data.getValue()?.unique;
	}

	getEntityType() {
		return 'updoc-workflow';
	}

	public override destroy(): void {
		this.#data.destroy();
		super.destroy();
	}
}

export { UpDocWorkflowWorkspaceContext as api };
