import type { UmbWorkflowDetailModalData, UmbWorkflowDetailModalValue } from './up-doc-workflow-detail-modal.token.js';
import type { DocumentTypeConfig, DestinationField, DestinationBlockGrid, SourceConfig, SourceSection } from './workflow.types.js';
import { fetchWorkflowByName } from './workflow.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

@customElement('up-doc-workflow-detail-modal')
export class UpDocWorkflowDetailModalElement extends UmbModalBaseElement<
	UmbWorkflowDetailModalData,
	UmbWorkflowDetailModalValue
> {
	@state() private _config: DocumentTypeConfig | null = null;
	@state() private _loading = true;
	@state() private _error: string | null = null;
	@state() private _activeTab = 'destination';
	@state() private _activeDestinationTab = 'page-properties';

	override async firstUpdated() {
		await this.#loadConfig();
	}

	async #loadConfig() {
		this._loading = true;
		this._error = null;

		try {
			const workflowName = this.data?.workflowName;
			if (!workflowName) {
				this._error = 'No workflow name provided';
				return;
			}

			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			this._config = await fetchWorkflowByName(workflowName, token);

			if (!this._config) {
				this._error = `Workflow "${workflowName}" not found`;
				return;
			}

			// Select first top-level tab
			const tabs = this.#getTopTabs();
			if (tabs.length > 0) {
				this._activeTab = tabs[0].id;
			}

			// Select first inner destination tab
			const destTabs = this.#getDestinationTabs();
			if (destTabs.length > 0) {
				this._activeDestinationTab = destTabs[0].id;
			}
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load workflow';
			console.error('Failed to load workflow config:', err);
		} finally {
			this._loading = false;
		}
	}

	/** Top-level tabs: Destination + one per source type */
	#getTopTabs(): Array<{ id: string; label: string; icon: string }> {
		if (!this._config) return [];

		const tabs: Array<{ id: string; label: string; icon: string }> = [
			{ id: 'destination', label: 'Destination', icon: 'icon-blueprint' },
		];

		for (const sourceType of Object.keys(this._config.sources)) {
			tabs.push({
				id: `source-${sourceType}`,
				label: sourceType.charAt(0).toUpperCase() + sourceType.slice(1),
				icon: sourceType === 'pdf' ? 'icon-document' : sourceType === 'markdown' ? 'icon-code' : 'icon-globe',
			});
		}

		return tabs;
	}

	/** Inner tabs within the Destination top tab, derived from the document type's tab groupings */
	#getDestinationTabs(): Array<{ id: string; label: string }> {
		if (!this._config) return [];

		const tabs: Array<{ id: string; label: string }> = [];
		const tabNames = new Set(this._config.destination.fields.map((f) => f.tab).filter(Boolean));

		for (const tabName of tabNames) {
			tabs.push({
				id: tabName!.toLowerCase().replace(/\s+/g, '-'),
				label: tabName!,
			});
		}

		if (this._config.destination.blockGrids?.length) {
			if (!tabNames.has('Page Content')) {
				tabs.push({ id: 'page-content', label: 'Page Content' });
			}
		}

		return tabs;
	}

	#handleClose() {
		this._rejectModal();
	}

	// =========================================================================
	// Destination rendering — Page Properties
	// =========================================================================

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
				</div>
				<div class="field-meta">
					<span class="field-alias">${field.alias}</span>
					${field.description ? html`<span class="field-description">${field.description}</span>` : nothing}
				</div>
			</div>
		`;
	}

	// =========================================================================
	// Destination rendering — Page Content (Block Grids)
	// =========================================================================

	#renderBlockGrids() {
		if (!this._config?.destination.blockGrids?.length) {
			return html`<p class="empty-message">No block grids configured.</p>`;
		}

		return html`
			${this._config.destination.blockGrids.map((grid) => this.#renderBlockGrid(grid))}
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
	// Source rendering
	// =========================================================================

	#renderSourceSections(sourceConfig: SourceConfig) {
		if (!sourceConfig.sections.length) {
			return html`<p class="empty-message">No extraction sections configured.</p>`;
		}

		return html`
			${sourceConfig.globals?.columnDetection
				? html`
					<div class="source-globals">
						<span class="globals-label">Column Detection:</span>
						<span>${sourceConfig.globals.columnDetection.enabled ? 'Enabled' : 'Disabled'}
							${sourceConfig.globals.columnDetection.enabled
								? `(threshold: ${(sourceConfig.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)`
								: ''}</span>
					</div>
				`
				: nothing}
			<div class="section-list">
				${sourceConfig.sections.map((section) => this.#renderSourceSection(section))}
			</div>
		`;
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
				${section.strategyParams ? this.#renderStrategyParams(section.strategy, section.strategyParams) : nothing}
			</div>
		`;
	}

	#renderStrategyParams(strategy: string, params: Record<string, unknown>) {
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

	// =========================================================================
	// Tab content routing
	// =========================================================================

	#renderTabContent() {
		if (!this._config) return nothing;

		// Destination tab — render inner tabs
		if (this._activeTab === 'destination') {
			return this.#renderDestinationContent();
		}

		// Source tabs
		if (this._activeTab.startsWith('source-')) {
			const sourceType = this._activeTab.replace('source-', '');
			const sourceConfig = this._config.sources[sourceType];
			if (sourceConfig) {
				return this.#renderSourceSections(sourceConfig);
			}
		}

		return html`<p class="empty-message">Select a tab to view its contents.</p>`;
	}

	#renderDestinationContent() {
		const innerTabs = this.#getDestinationTabs();

		return html`
			<div class="inner-tab-group">
				${innerTabs.map(
					(tab) => html`
						<button
							class="inner-tab ${this._activeDestinationTab === tab.id ? 'active' : ''}"
							@click=${() => { this._activeDestinationTab = tab.id; }}>
							${tab.label}
						</button>
					`
				)}
			</div>
			<div class="inner-tab-content">
				${this.#renderDestinationTabContent()}
			</div>
		`;
	}

	#renderDestinationTabContent() {
		if (!this._config) return nothing;

		// Block grids tab
		if (this._activeDestinationTab === 'page-content') {
			return this.#renderBlockGrids();
		}

		// Field tabs — find the original tab name from the ID
		const tabName = this._config.destination.fields.find(
			(f) => f.tab && f.tab.toLowerCase().replace(/\s+/g, '-') === this._activeDestinationTab
		)?.tab;

		if (tabName) {
			return this.#renderFieldsForTab(tabName);
		}

		return nothing;
	}

	// =========================================================================
	// Main render
	// =========================================================================

	override render() {
		if (this._loading) {
			return html`
				<umb-body-layout headline=${this.data?.workflowName ?? 'Workflow'}>
					<div class="loading"><uui-loader-bar></uui-loader-bar></div>
				</umb-body-layout>
			`;
		}

		if (this._error) {
			return html`
				<umb-body-layout headline=${this.data?.workflowName ?? 'Workflow'}>
					<p style="color: var(--uui-color-danger);">${this._error}</p>
					<div slot="actions">
						<uui-button label="Close" @click=${this.#handleClose}></uui-button>
					</div>
				</umb-body-layout>
			`;
		}

		const tabs = this.#getTopTabs();

		return html`
			<umb-body-layout headline=${this.data?.workflowName ?? 'Workflow'}>
				<uui-tab-group slot="navigation">
					${tabs.map(
						(tab) => html`
							<uui-tab
								label=${tab.label}
								?active=${this._activeTab === tab.id}
								@click=${() => { this._activeTab = tab.id; }}>
								<uui-icon slot="icon" name=${tab.icon}></uui-icon>
								${tab.label}
							</uui-tab>
						`
					)}
				</uui-tab-group>

				<div class="tab-content">
					${this.#renderTabContent()}
				</div>

				<uui-button
					slot="actions"
					label="Close"
					@click=${this.#handleClose}></uui-button>
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			/* Tab content area */
			.tab-content {
				padding: var(--uui-size-space-1) 0;
			}

			/* Inner destination tabs (content-area style) */
			.inner-tab-group {
				display: flex;
				gap: 0;
				border-bottom: 1px solid var(--uui-color-border);
				margin-bottom: var(--uui-size-space-4);
			}

			.inner-tab {
				all: unset;
				padding: var(--uui-size-space-3) var(--uui-size-space-5);
				cursor: pointer;
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text-alt);
				border-bottom: 2px solid transparent;
				transition: color 120ms, border-color 120ms;
			}

			.inner-tab:hover {
				color: var(--uui-color-text);
			}

			.inner-tab.active {
				color: var(--uui-color-text);
				border-bottom-color: var(--uui-color-current);
				font-weight: 600;
			}

			.inner-tab-content {
				min-height: 100px;
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.empty-message {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Field list (Page Properties) */
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

			/* Block grid (Page Content) */
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

			/* Source sections */
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

export default UpDocWorkflowDetailModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-workflow-detail-modal': UpDocWorkflowDetailModalElement;
	}
}
