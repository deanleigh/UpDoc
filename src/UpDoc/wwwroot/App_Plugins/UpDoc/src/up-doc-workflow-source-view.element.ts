import type { ExtractionElement, RichExtractionResult } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction } from './workflow.service.js';
import { html, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_MEDIA_PICKER_MODAL } from '@umbraco-cms/backoffice/media';

@customElement('up-doc-workflow-source-view')
export class UpDocWorkflowSourceViewElement extends UmbLitElement {
	@state() private _extraction: RichExtractionResult | null = null;
	@state() private _workflowName: string | null = null;
	@state() private _loading = true;
	@state() private _extracting = false;
	@state() private _error: string | null = null;
	@state() private _successMessage: string | null = null;

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			this.observe((context as any).unique, (unique: string | null) => {
				if (unique) {
					this._workflowName = decodeURIComponent(unique);
					this.#loadSampleExtraction();
				}
			});
		});
	}

	async #loadSampleExtraction() {
		if (!this._workflowName) return;

		this._loading = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			this._extraction = await fetchSampleExtraction(this._workflowName, token);
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

	#renderElement(element: ExtractionElement) {
		const meta = element.metadata;
		return html`
			<div class="element-item">
				<div class="element-text">${element.text}</div>
				<div class="element-meta">
					<span class="meta-badge font-size">${meta.fontSize}pt</span>
					<span class="meta-badge font-name">${meta.fontName}</span>
					<span class="meta-badge color" style="border-left: 3px solid ${meta.color};">${meta.color}</span>
					<span class="meta-badge position">x:${meta.position.x} y:${meta.position.y}</span>
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

			.element-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.element-item:last-child {
				border-bottom: none;
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
