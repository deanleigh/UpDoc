import type { DocumentTypeConfig, SourceConfig, SourceSection } from './workflow.types.js';
import { fetchWorkflowByName } from './workflow.service.js';
import { html, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';

@customElement('up-doc-workflow-source-view')
export class UpDocWorkflowSourceViewElement extends UmbLitElement {
	@state() private _sourceConfig: SourceConfig | null = null;
	@state() private _sourceType: string | null = null;
	@state() private _loading = true;
	@state() private _error: string | null = null;

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			this.observe((context as any).unique, (unique: string | null) => {
				if (unique) {
					this.#loadConfig(decodeURIComponent(unique));
				}
			});
		});
	}

	async #loadConfig(workflowName: string) {
		this._loading = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			const config: DocumentTypeConfig | null = await fetchWorkflowByName(workflowName, token);

			if (!config) {
				this._error = `Workflow "${workflowName}" not found`;
				return;
			}

			// Detect source type dynamically from the workflow config
			const sourceTypes = Object.keys(config.sources);
			if (sourceTypes.length > 0) {
				this._sourceType = sourceTypes[0];
				this._sourceConfig = config.sources[sourceTypes[0]] ?? null;
			} else {
				this._sourceType = null;
				this._sourceConfig = null;
			}
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load workflow';
			console.error('Failed to load workflow config:', err);
		} finally {
			this._loading = false;
		}
	}

	#formatSourceType(type: string): string {
		const labels: Record<string, string> = { pdf: 'PDF', markdown: 'Markdown', web: 'Web', doc: 'Word' };
		return labels[type] ?? type;
	}

	#renderSourceSection(section: SourceSection) {
		return html`
			<div class="section-item">
				<div class="section-header">
					<span class="section-label">${section.label}</span>
					<span class="section-strategy">${section.strategy}</span>
					${section.required ? html`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : nothing}
				</div>
				<div class="section-meta">
					<span class="field-alias">${section.key}</span>
					<span class="section-output">${section.outputFormat}</span>
					${section.pages ? html`<span class="section-pages">pages: ${Array.isArray(section.pages) ? section.pages.join(', ') : section.pages}</span>` : nothing}
				</div>
				${section.description ? html`<p class="section-description">${section.description}</p>` : nothing}
				${section.strategyParams ? this.#renderStrategyParams(section.strategyParams) : nothing}
			</div>
		`;
	}

	#renderStrategyParams(params: Record<string, unknown>) {
		const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null);
		if (entries.length === 0) return nothing;

		return html`
			<div class="strategy-params">
				${entries.map(
					([key, value]) => html`
						<span class="param">
							<span class="param-key">${key}:</span>
							<span class="param-value">${Array.isArray(value) ? value.join(', ') : String(value)}</span>
						</span>
					`
				)}
			</div>
		`;
	}

	override render() {
		if (this._loading) {
			return html`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
		}

		if (this._error) {
			return html`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
		}

		if (!this._sourceConfig || !this._sourceType) {
			return html`<umb-body-layout header-fit-height>
				<p class="empty-message">No source configured for this workflow.</p>
			</umb-body-layout>`;
		}

		return html`
			<umb-body-layout header-fit-height>
				<uui-box headline="Source: ${this.#formatSourceType(this._sourceType)}">
					${this._sourceConfig.globals?.columnDetection
						? html`
							<div class="source-globals">
								<span class="globals-label">Column Detection:</span>
								<span>${this._sourceConfig.globals.columnDetection.enabled ? 'Enabled' : 'Disabled'}
									${this._sourceConfig.globals.columnDetection.enabled
										? `(threshold: ${(this._sourceConfig.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)`
										: ''}</span>
							</div>
						`
						: nothing}
					<div class="section-list">
						${this._sourceConfig.sections.map((section) => this.#renderSourceSection(section))}
					</div>
				</uui-box>
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.empty-message {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			.field-badge {
				font-size: 11px;
			}

			.source-globals {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
				font-size: var(--uui-type-small-size);
				display: flex;
				gap: var(--uui-size-space-2);
			}

			.globals-label {
				font-weight: 600;
			}

			.section-list {
				display: flex;
				flex-direction: column;
			}

			.section-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.section-item:last-child {
				border-bottom: none;
			}

			.section-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.section-label {
				font-weight: 600;
			}

			.section-strategy {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.section-meta {
				display: flex;
				gap: var(--uui-size-space-3);
				margin-top: var(--uui-size-space-1);
			}

			.field-alias {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-family: monospace;
			}

			.section-output {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.section-pages {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.section-description {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				margin: var(--uui-size-space-1) 0 0 0;
			}

			.strategy-params {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				background: var(--uui-color-surface-alt);
				border-radius: var(--uui-border-radius);
				font-size: 12px;
				font-family: monospace;
			}

			.param {
				display: inline-flex;
				gap: 4px;
			}

			.param-key {
				color: var(--uui-color-text-alt);
			}

			.param-value {
				color: var(--uui-color-text);
				word-break: break-all;
			}
		`,
	];
}

export default UpDocWorkflowSourceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-workflow-source-view': UpDocWorkflowSourceViewElement;
	}
}
