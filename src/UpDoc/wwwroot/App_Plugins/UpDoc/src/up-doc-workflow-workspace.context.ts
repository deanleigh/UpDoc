import { UmbWorkspaceRouteManager, UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UmbObjectState } from '@umbraco-cms/backoffice/observable-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbContextBase } from '@umbraco-cms/backoffice/class-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { html, css, state } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { UmbInputWithAliasElement } from '@umbraco-cms/backoffice/components';

@customElement('up-doc-workflow-workspace-editor')
class UpDocWorkflowWorkspaceEditorElement extends UmbLitElement {
	@state() private _name = '';
	@state() private _alias = '';
	@state() private _isNew = false;
	#ctx: UpDocWorkflowWorkspaceContext | null = null;

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			this.#ctx = context as UpDocWorkflowWorkspaceContext;
			this.observe(this.#ctx.name, (name: string) => {
				this._name = name || 'Workflow';
			});
			this.observe(this.#ctx.alias, (alias: string | undefined) => {
				this._alias = alias || '';
			});
			this.observe(this.#ctx.unique, (unique: string | undefined) => {
				if (unique) {
					this.#fetchIdentity(decodeURIComponent(unique));
				}
			});
		});
	}

	async #fetchIdentity(workflowAlias: string) {
		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			const response = await fetch('/umbraco/management/api/v1/updoc/workflows', {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.ok) {
				const summaries: Array<{ name: string; alias: string }> = await response.json();
				const match = summaries.find((s) => s.alias === workflowAlias);
				if (match) {
					this.#ctx?.setIdentity(match.name, match.alias);
				}
			}
		} catch {
			// Fallback: keep alias as display name
		}
	}

	async #onNameAndAliasChange(e: Event) {
		const target = e.target as UmbInputWithAliasElement;
		const newName = target.value as string;
		const newAlias = target.alias;

		if (!newName.trim() || !newAlias.trim()) return;
		if (newName === this._name && newAlias === this._alias) return;

		const currentAlias = this._alias;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			const response = await fetch(
				`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(currentAlias)}/identity`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ name: newName.trim(), alias: newAlias.trim() }),
				},
			);

			if (!response.ok) {
				const error = await response.json();
				console.error('Failed to update workflow identity:', error);
				return;
			}

			const result: { name: string; alias: string } = await response.json();
			this.#ctx?.setIdentity(result.name, result.alias);

			// If alias changed, redirect to new URL
			if (result.alias !== currentAlias) {
				const newUrl = `section/settings/workspace/updoc-workflow/edit/${encodeURIComponent(result.alias)}`;
				window.history.replaceState({}, '', newUrl);
			}
		} catch (err) {
			console.error('Failed to update workflow identity:', err);
		}
	}

	override render() {
		return html`
			<umb-workspace-editor>
				<div id="header" slot="header">
					<umb-input-with-alias
						id="name"
						label="Workflow name"
						.value=${this._name}
						.alias=${this._alias}
						?auto-generate-alias=${this._isNew}
						@change=${this.#onNameAndAliasChange}>
					</umb-input-with-alias>
				</div>
			</umb-workspace-editor>
		`;
	}

	static override styles = css`
		:host {
			display: contents;
		}

		#header {
			display: flex;
			align-items: center;
			gap: var(--uui-size-space-4);
			width: 100%;
		}

		#name {
			flex: 1;
		}
	`;
}

interface UpDocWorkflowData {
	unique: string;
	name?: string;
	alias?: string;
}

export class UpDocWorkflowWorkspaceContext extends UmbContextBase {
	public readonly workspaceAlias = 'UpDoc.WorkflowWorkspace';

	#data = new UmbObjectState<UpDocWorkflowData | undefined>(undefined);
	readonly data = this.#data.asObservable();
	readonly unique = this.#data.asObservablePart((data) => data?.unique);
	readonly name = this.#data.asObservablePart((data) => data?.name);
	readonly alias = this.#data.asObservablePart((data) => data?.alias);

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

	load(unique: string) {
		const workflowAlias = decodeURIComponent(unique);
		this.#data.setValue({ unique, name: workflowAlias, alias: workflowAlias });
	}

	/** Update the display name and alias (called by the workspace editor after fetching/saving). */
	setIdentity(name: string, alias: string) {
		const current = this.#data.getValue();
		if (current) {
			this.#data.setValue({ ...current, name, alias, unique: alias });
		}
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
