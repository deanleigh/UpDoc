import type { DocumentTypeConfig, SectionMapping, MappingDestination, DestinationField, BlockProperty, RichExtractionResult, ExtractionElement } from './workflow.types.js';
import { fetchWorkflowByName, fetchSampleExtraction, saveMapConfig } from './workflow.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';

@customElement('up-doc-workflow-map-view')
export class UpDocWorkflowMapViewElement extends UmbLitElement {
	@state() private _config: DocumentTypeConfig | null = null;
	@state() private _extraction: RichExtractionResult | null = null;
	@state() private _loading = true;
	@state() private _error: string | null = null;
	#workflowName = '';
	#token = '';

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			this.observe((context as any).unique, (unique: string | null) => {
				if (unique) {
					this.#workflowName = decodeURIComponent(unique);
					this.#loadData();
				}
			});
		});
	}

	async #loadData() {
		this._loading = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			this.#token = await authContext.getLatestToken();
			this._config = await fetchWorkflowByName(this.#workflowName, this.#token);

			if (!this._config) {
				this._error = `Workflow "${this.#workflowName}" not found`;
				return;
			}

			this._extraction = await fetchSampleExtraction(this.#workflowName, this.#token);
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load workflow';
			console.error('Failed to load workflow config:', err);
		} finally {
			this._loading = false;
		}
	}

	#resolveDestinationLabel(dest: MappingDestination): string {
		if (!this._config) return dest.target;

		// If blockKey present, find the specific block
		if (dest.blockKey && this._config.destination.blockGrids) {
			for (const grid of this._config.destination.blockGrids) {
				const block = grid.blocks.find((b) => b.key === dest.blockKey);
				if (block) {
					const prop = block.properties?.find((p) => p.alias === dest.target);
					return `${block.label} > ${prop?.label || dest.target}`;
				}
			}
		}

		// Top-level field
		for (const field of this._config.destination.fields) {
			if (field.alias === dest.target) return field.label;
		}

		// Fall back: first block match (backwards compat for old mappings without blockKey)
		for (const grid of this._config.destination.blockGrids ?? []) {
			for (const block of grid.blocks) {
				for (const prop of block.properties ?? []) {
					if (prop.alias === dest.target) {
						return `${block.label} > ${prop.label || prop.alias}`;
					}
				}
			}
		}

		return dest.target;
	}

	#resolveSourceText(sourceId: string): string {
		if (!this._extraction) return sourceId;

		const element = this._extraction.elements.find((e) => e.id === sourceId);
		if (!element) return sourceId;

		const text = element.text.length > 60 ? element.text.substring(0, 60) + '...' : element.text;
		return text;
	}

	async #deleteMapping(index: number) {
		if (!this._config) return;

		const updatedMap = {
			...this._config.map,
			mappings: this._config.map.mappings.filter((_, i) => i !== index),
		};

		const result = await saveMapConfig(this.#workflowName, updatedMap, this.#token);
		if (result) {
			this._config = { ...this._config, map: updatedMap };
		}
	}

	#renderEmptyState() {
		return html`
			<div class="empty-state">
				<uui-icon name="icon-nodes" class="empty-icon"></uui-icon>
				<p class="empty-title">No mappings yet</p>
				<p class="empty-message">Use the Source tab to map extracted content to destination fields.</p>
			</div>
		`;
	}

	#renderMappingRow(mapping: SectionMapping, index: number) {
		return html`
			<uui-table-row>
				<uui-table-cell class="source-cell">
					<span class="source-id">${mapping.source}</span>
					<span class="source-text">${this.#resolveSourceText(mapping.source)}</span>
				</uui-table-cell>
				<uui-table-cell class="arrow-cell">
					<uui-icon name="icon-arrow-right"></uui-icon>
				</uui-table-cell>
				<uui-table-cell class="destination-cell">
					${mapping.destinations.map(
						(dest) => html`
							<span class="destination-target">${this.#resolveDestinationLabel(dest)}</span>
							${dest.transforms?.length
								? html`<span class="transform-badge">${dest.transforms.map((t) => t.type).join(', ')}</span>`
								: nothing}
						`
					)}
				</uui-table-cell>
				<uui-table-cell class="actions-cell">
					${!mapping.enabled ? html`<uui-tag look="secondary" class="disabled-badge">Disabled</uui-tag>` : nothing}
					<uui-button
						compact
						look="outline"
						color="danger"
						label="Delete"
						@click=${() => this.#deleteMapping(index)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-table-cell>
			</uui-table-row>
		`;
	}

	#renderMappingsTable() {
		if (!this._config) return nothing;

		const mappings = this._config.map.mappings;
		if (mappings.length === 0) return this.#renderEmptyState();

		return html`
			<div class="mappings-header">
				<span class="mapping-count">${mappings.length} mapping${mappings.length !== 1 ? 's' : ''}</span>
			</div>
			<uui-table>
				<uui-table-head>
					<uui-table-head-cell>Source</uui-table-head-cell>
					<uui-table-head-cell style="width: 40px;"></uui-table-head-cell>
					<uui-table-head-cell>Destination</uui-table-head-cell>
					<uui-table-head-cell style="width: 100px;"></uui-table-head-cell>
				</uui-table-head>
				${mappings.map((mapping, index) => this.#renderMappingRow(mapping, index))}
			</uui-table>
		`;
	}

	override render() {
		if (this._loading) {
			return html`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
		}

		if (this._error) {
			return html`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
		}

		return html`
			<umb-body-layout header-fit-height>
				<uui-box>
					${this.#renderMappingsTable()}
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
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: var(--uui-size-layout-3) var(--uui-size-layout-1);
				color: var(--uui-color-text-alt);
			}

			.empty-icon {
				font-size: 3rem;
				margin-bottom: var(--uui-size-space-4);
				opacity: 0.4;
			}

			.empty-title {
				font-size: var(--uui-type-h5-size);
				font-weight: 600;
				margin: 0 0 var(--uui-size-space-2);
			}

			.empty-message {
				margin: 0;
				font-style: italic;
			}

			.mappings-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: var(--uui-size-space-4);
			}

			.mapping-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.source-cell {
				display: flex;
				flex-direction: column;
				gap: 2px;
			}

			.source-id {
				font-size: 11px;
				font-family: monospace;
				color: var(--uui-color-text-alt);
			}

			.source-text {
				font-size: var(--uui-type-small-size);
			}

			.arrow-cell {
				text-align: center;
				color: var(--uui-color-text-alt);
			}

			.destination-cell {
				display: flex;
				flex-direction: column;
				gap: 4px;
			}

			.destination-target {
				font-weight: 600;
			}

			.transform-badge {
				font-size: 11px;
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
				width: fit-content;
			}

			.disabled-badge {
				font-size: 11px;
			}

			.actions-cell {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				justify-content: flex-end;
			}
		`,
	];
}

export default UpDocWorkflowMapViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-workflow-map-view': UpDocWorkflowMapViewElement;
	}
}
