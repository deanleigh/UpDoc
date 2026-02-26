import type { DocumentTypeConfig, DestinationField, DestinationBlockGrid } from './workflow.types.js';
import { fetchWorkflowByAlias } from './workflow.service.js';
import { getDestinationTabs, getAllBlockContainers } from './destination-utils.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';

@customElement('up-doc-workflow-destination-view')
export class UpDocWorkflowDestinationViewElement extends UmbLitElement {
	@state() private _config: DocumentTypeConfig | null = null;
	@state() private _loading = true;
	@state() private _error: string | null = null;
	@state() private _activeTab = '';

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

	async #loadConfig(workflowAlias: string) {
		this._loading = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			this._config = await fetchWorkflowByAlias(workflowAlias, token);

			if (!this._config) {
				this._error = `Workflow "${workflowAlias}" not found`;
				return;
			}

			const tabs = this.#getTabs();
			if (tabs.length > 0) {
				this._activeTab = tabs[0].id;
			}
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load workflow';
			console.error('Failed to load workflow config:', err);
		} finally {
			this._loading = false;
		}
	}

	#getTabs() {
		if (!this._config) return [];
		return getDestinationTabs(this._config.destination);
	}

	#renderFieldsForTab(tabName: string) {
		if (!this._config) return nothing;

		const fields = this._config.destination.fields.filter((f) => f.tab === tabName);
		if (fields.length === 0) return html`<p class="empty-message">No fields in this tab.</p>`;

		return html`
			<div class="field-list">
				${fields.map((field) => this.#renderField(field))}
			</div>
		`;
	}

	#renderField(field: DestinationField) {
		return html`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${field.label}</span>
					<span class="field-type">${field.type}</span>
					${field.mandatory ? html`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : nothing}
					<uui-button compact look="outline" label="Map" class="map-button" disabled>
						<uui-icon name="icon-nodes"></uui-icon>
					</uui-button>
				</div>
				<div class="field-meta">
					<span class="field-alias">${field.alias}</span>
					${field.description ? html`<span class="field-description">${field.description}</span>` : nothing}
				</div>
			</div>
		`;
	}

	#renderBlockContainersForTab(tabId: string) {
		if (!this._config) return nothing;

		const containers = getAllBlockContainers(this._config.destination).filter((c) => {
			const cTab = c.tab ?? 'Page Content';
			return cTab.toLowerCase().replace(/\s+/g, '-') === tabId;
		});

		if (!containers.length) {
			return html`<p class="empty-message">No blocks configured.</p>`;
		}

		return html`
			${containers.map((container) => this.#renderBlockGrid(container))}
		`;
	}

	#renderBlockGrid(grid: DestinationBlockGrid) {
		return html`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${grid.label}</span>
					<span class="field-alias">${grid.alias}</span>
				</div>
				${grid.description ? html`<p class="block-grid-description">${grid.description}</p>` : nothing}
				<div class="block-list">
					${grid.blocks.map(
						(block) => html`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${block.label}</span>
									${block.identifyBy
										? html`<span class="block-identify">identified by: "${block.identifyBy.value}"</span>`
										: nothing}
								</div>
								${block.properties?.length
									? html`
										<div class="block-properties">
											${block.properties.map(
												(prop) => html`
													<div class="block-property">
														<span class="block-property-label">${prop.label || prop.alias}</span>
														<span class="field-type">${prop.type}</span>
														${prop.acceptsFormats?.length
															? html`<span class="accepts-formats">${prop.acceptsFormats.join(', ')}</span>`
															: nothing}
														<uui-button compact look="outline" label="Map" class="map-button" disabled>
															<uui-icon name="icon-nodes"></uui-icon>
														</uui-button>
													</div>
												`
											)}
										</div>
									`
									: nothing}
							</div>
						`
					)}
				</div>
			</div>
		`;
	}

	// =========================================================================
	// Info Boxes
	// =========================================================================

	#getFieldsCount(): number {
		if (!this._config) return 0;
		return this._config.destination.fields.length;
	}

	#getBlocksCount(): number {
		if (!this._config) return 0;
		return getAllBlockContainers(this._config.destination)
			.reduce((sum, container) => sum + container.blocks.length, 0);
	}

	#renderInfoBoxes() {
		if (!this._config) return nothing;
		const dest = this._config.destination;

		return html`
			<div class="info-boxes">
				<uui-box headline="Document Type" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-document-dashed-line" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${dest.documentTypeName ?? dest.documentTypeAlias}">${dest.documentTypeName ?? dest.documentTypeAlias}</span>
						<span class="box-sub">${dest.documentTypeAlias}</span>
						<div class="box-buttons"></div>
					</div>
				</uui-box>

				<uui-box headline="Blueprint" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-blueprint" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${dest.blueprintName ?? '—'}">${dest.blueprintName ?? '—'}</span>
						<div class="box-buttons"></div>
					</div>
				</uui-box>

				<uui-box headline="Fields" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-layers" class="box-icon"></uui-icon>
						<span class="box-stat">${this.#getFieldsCount()}</span>
						<span class="box-sub">text-mappable</span>
						<div class="box-buttons"></div>
					</div>
				</uui-box>

				<uui-box headline="Blocks" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-box" class="box-icon"></uui-icon>
						<span class="box-stat">${this.#getBlocksCount()}</span>
						<span class="box-sub">in blueprint</span>
						<div class="box-buttons"></div>
					</div>
				</uui-box>
			</div>
		`;
	}

	#renderTabContent() {
		if (!this._config) return nothing;

		const tabName = this._config.destination.fields.find(
			(f) => f.tab && f.tab.toLowerCase().replace(/\s+/g, '-') === this._activeTab
		)?.tab;

		const hasContainers = getAllBlockContainers(this._config.destination).some((c) => {
			const cTab = c.tab ?? 'Page Content';
			return cTab.toLowerCase().replace(/\s+/g, '-') === this._activeTab;
		});

		return html`
			${tabName ? this.#renderFieldsForTab(tabName) : nothing}
			${hasContainers ? this.#renderBlockContainersForTab(this._activeTab) : nothing}
		`;
	}

	override render() {
		if (this._loading) {
			return html`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
		}

		if (this._error) {
			return html`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
		}

		const tabs = this.#getTabs();

		return html`
			<umb-body-layout header-fit-height>
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${tabs.map(
						(tab) => html`
							<uui-tab
								label=${tab.label}
								?active=${this._activeTab === tab.id}
								@click=${() => { this._activeTab = tab.id; }}>
								${tab.label}
							</uui-tab>
						`
					)}
				</uui-tab-group>
				${this.#renderInfoBoxes()}
				<uui-box>
					${this.#renderTabContent()}
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

			.field-list {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
			}

			.field-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.field-item:last-child {
				border-bottom: none;
			}

			.field-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.field-label {
				font-weight: 600;
			}

			.field-type {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.field-badge {
				font-size: 11px;
			}

			.field-meta {
				display: flex;
				gap: var(--uui-size-space-3);
				margin-top: var(--uui-size-space-1);
			}

			.field-alias {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-family: monospace;
			}

			.field-description {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.block-grid {
				margin-bottom: var(--uui-size-space-5);
			}

			.block-grid-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-grid-label {
				font-weight: 600;
			}

			.block-grid-description {
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				margin: 0;
			}

			.block-list {
				display: flex;
				flex-direction: column;
			}

			.block-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				padding-left: var(--uui-size-space-6);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-item:last-child {
				border-bottom: none;
			}

			.block-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.block-label {
				font-weight: 600;
			}

			.block-identify {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			.block-properties {
				margin-top: var(--uui-size-space-2);
				padding-left: var(--uui-size-space-5);
			}

			.block-property {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-1) 0;
			}

			.block-property-label {
				font-size: var(--uui-type-small-size);
			}

			.accepts-formats {
				font-size: 11px;
				color: var(--uui-color-text-alt);
			}

			.map-button {
				margin-left: auto;
				--uui-button-font-size: var(--uui-type-small-size);
			}

			/* Info boxes row (matching Source tab pattern) */
			.info-boxes {
				display: flex;
				gap: var(--uui-size-space-4);
				flex-wrap: wrap;
				padding: var(--uui-size-space-4);
			}

			.info-box-item {
				flex: 1;
			}

			.box-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: var(--uui-size-space-2);
				min-height: 180px;
			}

			.box-buttons {
				display: flex;
				gap: var(--uui-size-space-2);
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-icon {
				font-size: 48px;
				color: var(--uui-color-text-alt);
				margin-top: var(--uui-size-space-3);
			}

			.box-stat {
				font-size: var(--uui-type-h4-size);
				font-weight: 700;
				color: var(--uui-color-text);
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.box-filename {
				font-weight: 600;
				font-size: var(--uui-type-default-size) !important;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100%;
			}

			.box-sub {
				font-size: 11px;
				color: var(--uui-color-text-alt);
			}
		`,
	];
}

export default UpDocWorkflowDestinationViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-workflow-destination-view': UpDocWorkflowDestinationViewElement;
	}
}
