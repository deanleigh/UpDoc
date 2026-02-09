import { html, css, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_MODAL_MANAGER_CONTEXT, UMB_CONFIRM_MODAL } from '@umbraco-cms/backoffice/modal';
import { UMB_CREATE_WORKFLOW_MODAL } from './create-workflow-modal.token.js';
import { clearConfigCache } from './workflow.service.js';

interface WorkflowSummary {
	name: string;
	documentTypeAlias: string;
	blueprintId: string | null;
	blueprintName: string | null;
	sourceTypes: string[];
	mappingCount: number;
	isComplete: boolean;
	validationWarnings: string[];
}

@customElement('up-doc-workflows-view')
export class UpDocWorkflowsViewElement extends UmbLitElement {
	@state() private _workflows: WorkflowSummary[] = [];
	@state() private _loading = true;
	@state() private _error: string | null = null;

	override async connectedCallback() {
		super.connectedCallback();
		await this.#loadWorkflows();
	}

	async #loadWorkflows() {
		this._loading = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			const response = await fetch('/umbraco/management/api/v1/updoc/workflows', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to load workflows: ${response.statusText}`);
			}

			this._workflows = await response.json();
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Unknown error';
			console.error('Failed to load workflows:', err);
		} finally {
			this._loading = false;
		}
	}

	async #handleCreateWorkflow() {
		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_CREATE_WORKFLOW_MODAL, { data: {} });

		try {
			const result = await modal.onSubmit();

			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			const response = await fetch('/umbraco/management/api/v1/updoc/workflows', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(result),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || `Failed to create workflow: ${response.statusText}`);
			}

			// Refresh the list
			await this.#loadWorkflows();
		} catch (err) {
			// Modal was rejected (cancelled) — do nothing
			if (err instanceof Error && err.message !== 'Modal was rejected') {
				this._error = err.message;
				console.error('Failed to create workflow:', err);
			}
		}
	}

	async #handleDeleteWorkflow(workflow: WorkflowSummary) {
		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);

		try {
			await modalManager.open(this, UMB_CONFIRM_MODAL, {
				data: {
					headline: `Delete "${workflow.name}"?`,
					content: html`<p>This will permanently delete the workflow folder and all its configuration files (destination, map, and source configs).</p>
						<p>This action cannot be undone.</p>`,
					confirmLabel: 'Delete',
					color: 'danger',
				},
			}).onSubmit();
		} catch {
			// Cancelled
			return;
		}

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			const response = await fetch(`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflow.name)}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || `Failed to delete workflow: ${response.statusText}`);
			}

			// Clear the client-side cache so the condition re-evaluates
			clearConfigCache();

			// Refresh the list
			await this.#loadWorkflows();
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Unknown error';
			console.error('Failed to delete workflow:', err);
		}
	}

	override render() {
		if (this._loading) {
			return html`<uui-loader-bar></uui-loader-bar>`;
		}

		if (this._error) {
			return html`
				<uui-box>
					<p style="color: var(--uui-color-danger);">Error: ${this._error}</p>
					<uui-button look="secondary" @click=${() => this.#loadWorkflows()}>Retry</uui-button>
				</uui-box>
			`;
		}

		if (this._workflows.length === 0) {
			return this.#renderEmptyState();
		}

		return this.#renderWorkflowList();
	}

	#renderEmptyState() {
		return html`
			<uui-box headline="No workflows configured">
				<p>
					Workflows define how content is extracted from external sources (PDFs, web pages, documents)
					and mapped to Umbraco document properties.
				</p>
				<p>
					Create a workflow to enable the <strong>"Create from Source"</strong> action
					for a document type.
				</p>
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${this.#handleCreateWorkflow}></uui-button>
			</uui-box>
		`;
	}

	#renderWorkflowList() {
		return html`
			<div class="header">
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${this.#handleCreateWorkflow}></uui-button>
			</div>
			<uui-box>
				<uui-table>
					<uui-table-head>
						<uui-table-head-cell>Workflow</uui-table-head-cell>
						<uui-table-head-cell>Document Type</uui-table-head-cell>
						<uui-table-head-cell>Blueprint</uui-table-head-cell>
						<uui-table-head-cell>Sources</uui-table-head-cell>
						<uui-table-head-cell>Mappings</uui-table-head-cell>
						<uui-table-head-cell>Status</uui-table-head-cell>
						<uui-table-head-cell style="width: 1px;"></uui-table-head-cell>
					</uui-table-head>
					${this._workflows.map(
						(w) => html`
							<uui-table-row>
								<uui-table-cell>${w.name}</uui-table-cell>
								<uui-table-cell>${w.documentTypeAlias}</uui-table-cell>
								<uui-table-cell>${w.blueprintName ?? w.blueprintId ?? '—'}</uui-table-cell>
								<uui-table-cell>${w.sourceTypes.join(', ') || '—'}</uui-table-cell>
								<uui-table-cell>${w.mappingCount}</uui-table-cell>
								<uui-table-cell>
									<uui-tag
										look=${w.isComplete ? 'primary' : 'secondary'}
										color=${w.isComplete ? 'positive' : 'warning'}>
										${w.isComplete ? 'Ready' : 'Incomplete'}
									</uui-tag>
								</uui-table-cell>
								<uui-table-cell>
									<uui-button
										look="default"
										color="danger"
										label="Delete"
										compact
										@click=${() => this.#handleDeleteWorkflow(w)}>
										<uui-icon name="icon-trash"></uui-icon>
									</uui-button>
								</uui-table-cell>
							</uui-table-row>
						`
					)}
				</uui-table>
			</uui-box>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.header {
				display: flex;
				justify-content: flex-end;
				margin-bottom: var(--uui-size-space-4);
			}
		`,
	];
}

export default UpDocWorkflowsViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-workflows-view': UpDocWorkflowsViewElement;
	}
}
