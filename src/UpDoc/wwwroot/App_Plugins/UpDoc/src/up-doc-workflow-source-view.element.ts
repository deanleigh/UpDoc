import type { ExtractionElement, RichExtractionResult, DocumentTypeConfig } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, saveMapConfig } from './workflow.service.js';
import { html, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_MEDIA_PICKER_MODAL } from '@umbraco-cms/backoffice/media';
import { UMB_DESTINATION_PICKER_MODAL } from './destination-picker-modal.token.js';

@customElement('up-doc-workflow-source-view')
export class UpDocWorkflowSourceViewElement extends UmbLitElement {
	@state() private _extraction: RichExtractionResult | null = null;
	@state() private _config: DocumentTypeConfig | null = null;
	@state() private _workflowName: string | null = null;
	@state() private _loading = true;
	@state() private _extracting = false;
	@state() private _error: string | null = null;
	@state() private _successMessage: string | null = null;
	@state() private _selectedElements = new Set<string>();
	#token = '';

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			this.observe((context as any).unique, (unique: string | null) => {
				if (unique) {
					this._workflowName = decodeURIComponent(unique);
					this.#loadData();
				}
			});
		});
	}

	async #loadData() {
		if (!this._workflowName) return;

		this._loading = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			this.#token = await authContext.getLatestToken();
			const [extraction, config] = await Promise.all([
				fetchSampleExtraction(this._workflowName, this.#token),
				fetchWorkflowByName(this._workflowName, this.#token),
			]);
			this._extraction = extraction;
			this._config = config;
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load sample extraction';
			console.error('Failed to load sample extraction:', err);
		} finally {
			this._loading = false;
		}
	}

	async #onPickMedia() {
		if (!this._workflowName) return;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_MEDIA_PICKER_MODAL, {
			data: {
				multiple: false,
			},
		});

		const result = await modal.onSubmit().catch(() => null);
		if (!result?.selection?.length) return;

		const mediaKey = result.selection[0];
		if (!mediaKey) return;

		this._extracting = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			const extraction = await triggerSampleExtraction(this._workflowName, mediaKey, token);

			if (extraction) {
				this._extraction = extraction;
				this._successMessage = `Content extracted successfully — ${extraction.elements.length} elements from ${extraction.source.totalPages} pages`;
				setTimeout(() => { this._successMessage = null; }, 5000);
			} else {
				this._error = 'Extraction failed. Check that the selected media item is a PDF.';
			}
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Extraction failed';
			console.error('Sample extraction failed:', err);
		} finally {
			this._extracting = false;
		}
	}

	#groupByPage(elements: ExtractionElement[]): Map<number, ExtractionElement[]> {
		const groups = new Map<number, ExtractionElement[]>();
		for (const el of elements) {
			const existing = groups.get(el.page);
			if (existing) {
				existing.push(el);
			} else {
				groups.set(el.page, [el]);
			}
		}
		return groups;
	}

	#toggleSelection(id: string) {
		const next = new Set(this._selectedElements);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		this._selectedElements = next;
	}

	#clearSelection() {
		this._selectedElements = new Set();
	}

	async #onMapTo() {
		if (!this._config || this._selectedElements.size === 0) return;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_DESTINATION_PICKER_MODAL, {
			data: {
				destination: this._config.destination,
			},
		});

		const result = await modal.onSubmit().catch(() => null);
		if (!result?.selectedTargets?.length || !this._workflowName) return;

		// Create a mapping for each selected source element
		const existingMappings = this._config.map.mappings ?? [];
		const newMappings = [...existingMappings];
		const addedCount = this._selectedElements.size;
		for (const sourceId of this._selectedElements) {
			newMappings.push({
				source: sourceId,
				destinations: result.selectedTargets.map((target: string) => ({ target })),
				enabled: true,
			});
		}

		const updatedMap = { ...this._config.map, mappings: newMappings };
		const saved = await saveMapConfig(this._workflowName, updatedMap, this.#token);
		if (saved) {
			this._config = { ...this._config, map: updatedMap };
			this._selectedElements = new Set();
			this._successMessage = `${addedCount} mapping${addedCount !== 1 ? 's' : ''} created`;
			setTimeout(() => { this._successMessage = null; }, 3000);
		}
	}

	#renderToolbar() {
		const count = this._selectedElements.size;
		if (count === 0) return nothing;

		return html`
			<div class="selection-toolbar">
				<span class="selection-count">${count} selected</span>
				<uui-button look="primary" compact label="Map to..." @click=${this.#onMapTo}>
					<uui-icon name="icon-nodes"></uui-icon>
					Map to...
				</uui-button>
				<uui-button look="secondary" compact label="Clear" @click=${this.#clearSelection}>
					Clear
				</uui-button>
			</div>
		`;
	}

	#getMappedTargets(elementId: string): string[] {
		if (!this._config?.map?.mappings) return [];
		const targets: string[] = [];
		for (const mapping of this._config.map.mappings) {
			if (mapping.source === elementId && mapping.enabled) {
				for (const dest of mapping.destinations) {
					targets.push(dest.target);
				}
			}
		}
		return targets;
	}

	#resolveTargetLabel(alias: string): string {
		if (!this._config?.destination) return alias;
		const field = this._config.destination.fields.find((f: any) => f.alias === alias);
		if (field) return field.label;
		if (this._config.destination.blockGrids) {
			for (const grid of this._config.destination.blockGrids) {
				for (const block of grid.blocks) {
					const prop = block.properties?.find((p: any) => p.alias === alias);
					if (prop) return `${block.label} > ${prop.label || prop.alias}`;
				}
			}
		}
		return alias;
	}

	#renderElement(element: ExtractionElement) {
		const meta = element.metadata;
		const checked = this._selectedElements.has(element.id);
		const mappedTargets = this.#getMappedTargets(element.id);
		const isMapped = mappedTargets.length > 0;
		return html`
			<div class="element-item ${checked ? 'element-selected' : ''} ${isMapped ? 'element-mapped' : ''}">
				<uui-checkbox
					label="Select for mapping"
					?checked=${checked}
					@change=${() => this.#toggleSelection(element.id)}
					class="element-checkbox">
				</uui-checkbox>
				<div class="element-content" @click=${() => this.#toggleSelection(element.id)}>
					<div class="element-text">${element.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${meta.fontSize}pt</span>
						<span class="meta-badge font-name">${meta.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${meta.color};">${meta.color}</span>
						<span class="meta-badge position">x:${meta.position.x} y:${meta.position.y}</span>
						${mappedTargets.map((t) => html`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${this.#resolveTargetLabel(t)}</span>`)}
					</div>
				</div>
			</div>
		`;
	}

	#renderPageGroup(pageNum: number, elements: ExtractionElement[]) {
		return html`
			<uui-box headline="Page ${pageNum}" class="page-box">
				<div class="element-list">
					${elements.map((el) => this.#renderElement(el))}
				</div>
				<div class="page-summary">${elements.length} element${elements.length !== 1 ? 's' : ''}</div>
			</uui-box>
		`;
	}

	#renderExtraction() {
		if (!this._extraction) return nothing;

		const grouped = this.#groupByPage(this._extraction.elements);
		const pages = Array.from(grouped.entries()).sort(([a], [b]) => a - b);

		return html`
			<div class="extraction-header">
				<div class="extraction-info">
					<span class="info-label">Source:</span>
					<span>${this._extraction.source.fileName}</span>
				</div>
				<div class="extraction-info">
					<span class="info-label">Pages:</span>
					<span>${this._extraction.source.totalPages}</span>
					<span class="info-label" style="margin-left: var(--uui-size-space-4);">Elements:</span>
					<span>${this._extraction.elements.length}</span>
					<span class="info-label" style="margin-left: var(--uui-size-space-4);">Extracted:</span>
					<span>${new Date(this._extraction.source.extractedDate).toLocaleString()}</span>
				</div>
				<uui-button look="secondary" label="Re-extract" @click=${this.#onPickMedia} ?disabled=${this._extracting}>
					<uui-icon name="icon-refresh"></uui-icon>
					Re-extract
				</uui-button>
			</div>

			${this.#renderToolbar()}
			${pages.map(([pageNum, elements]) => this.#renderPageGroup(pageNum, elements))}
		`;
	}

	#renderEmpty() {
		return html`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${this.#onPickMedia} ?disabled=${this._extracting}>
					${this._extracting ? html`<uui-loader-bar></uui-loader-bar>` : 'Upload PDF'}
				</uui-button>
			</div>
		`;
	}

	override render() {
		if (this._loading) {
			return html`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
		}

		if (this._error) {
			return html`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
		}

		return html`
			<umb-body-layout header-fit-height>
				${this._successMessage ? html`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : nothing}
				${this._extraction ? this.#renderExtraction() : this.#renderEmpty()}
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

			.success-banner {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-size: var(--uui-type-small-size);
			}

			/* Empty state */
			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: var(--uui-size-layout-2);
				gap: var(--uui-size-space-3);
				text-align: center;
				min-height: 300px;
			}

			.empty-state h3 {
				margin: 0;
				color: var(--uui-color-text);
			}

			.empty-state p {
				margin: 0;
				color: var(--uui-color-text-alt);
			}

			/* Extraction header */
			.extraction-header {
				padding: var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.extraction-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				font-size: var(--uui-type-small-size);
			}

			.info-label {
				font-weight: 600;
				color: var(--uui-color-text-alt);
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			.element-list {
				display: flex;
				flex-direction: column;
			}

			/* Selection toolbar */
			.selection-toolbar {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-selected);
				border-bottom: 1px solid var(--uui-color-border);
				position: sticky;
				top: 0;
				z-index: 1;
			}

			.selection-count {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
			}

			.element-item {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.element-item:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.element-item.element-selected {
				background: var(--uui-color-selected);
			}

			.element-item:last-child {
				border-bottom: none;
			}

			.element-checkbox {
				flex-shrink: 0;
				margin-top: 2px;
			}

			.element-content {
				flex: 1;
				min-width: 0;
			}

			.element-text {
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-2);
				word-break: break-word;
				white-space: pre-wrap;
			}

			.element-meta {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
			}

			.meta-badge {
				font-size: 11px;
				font-family: monospace;
				padding: 1px 6px;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}

			.meta-badge.font-size {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.meta-badge.mapped-target {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				display: inline-flex;
				align-items: center;
				gap: 3px;
			}

			.element-item.element-mapped {
				border-left: 3px solid var(--uui-color-positive-standalone);
			}

			.page-summary {
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				text-align: right;
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
