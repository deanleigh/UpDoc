import type { PagePickerModalData, PagePickerModalValue } from './page-picker-modal.token.js';
import './up-doc-pdf-thumbnail.element.js';
import { html, css, state } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

@customElement('up-doc-page-picker-modal')
export class UpDocPagePickerModalElement extends UmbModalBaseElement<PagePickerModalData, PagePickerModalValue> {
	@state() private _selected = new Set<number>();
	@state() private _token = '';

	override async firstUpdated() {
		// Get auth token for PDF thumbnail rendering
		const authContext = await this.getContext(UMB_AUTH_CONTEXT);
		this._token = await authContext.getLatestToken();

		// Initialize selection: if selectedPages is null, all pages are selected
		const totalPages = this.data?.totalPages ?? 0;
		const selectedPages = this.data?.selectedPages;

		if (selectedPages && selectedPages.length > 0) {
			this._selected = new Set(selectedPages);
		} else {
			// All pages selected
			this._selected = new Set(Array.from({ length: totalPages }, (_, i) => i + 1));
		}
	}

	get #totalPages(): number {
		return this.data?.totalPages ?? 0;
	}

	get #allSelected(): boolean {
		return this._selected.size === this.#totalPages;
	}

	get #noneSelected(): boolean {
		return this._selected.size === 0;
	}

	#onSelected(page: number) {
		const next = new Set(this._selected);
		next.add(page);
		this._selected = next;
	}

	#onDeselected(page: number) {
		const next = new Set(this._selected);
		next.delete(page);
		this._selected = next;
	}

	#selectAll() {
		this._selected = new Set(Array.from({ length: this.#totalPages }, (_, i) => i + 1));
	}

	#deselectAll() {
		this._selected = new Set();
	}

	#onConfirm() {
		// If all pages selected, return null (meaning "all")
		const selectedArray = [...this._selected].sort((a, b) => a - b);
		this.value = {
			selectedPages: selectedArray.length === this.#totalPages ? null : selectedArray,
		};
		this.modalContext?.submit();
	}

	#onCancel() {
		this.modalContext?.reject();
	}

	#renderPageCard(page: number) {
		const isSelected = this._selected.has(page);
		return html`
			<uui-card-media
				name="Page ${page}"
				selectable
				select-only
				?selected=${isSelected}
				@selected=${() => this.#onSelected(page)}
				@deselected=${() => this.#onDeselected(page)}>
				<up-doc-pdf-thumbnail
					mediaKey=${this.data?.mediaKey ?? ''}
					page=${page}
					width=${200}
					token=${this._token}>
				</up-doc-pdf-thumbnail>
			</uui-card-media>
		`;
	}

	override render() {
		const pages = Array.from({ length: this.#totalPages }, (_, i) => i + 1);
		const selectedCount = this._selected.size;

		return html`
			<umb-body-layout headline="Select pages to include">
				<div slot="header" class="toolbar">
					<span class="selection-count">${selectedCount} of ${this.#totalPages} pages selected</span>
					<span class="toolbar-spacer"></span>
					${this.#allSelected
						? html`<uui-button look="outline" compact label="Deselect all" @click=${this.#deselectAll}>Deselect all</uui-button>`
						: html`<uui-button look="outline" compact label="Select all" @click=${this.#selectAll}>Select all</uui-button>`}
				</div>

				<div class="page-grid">
					${pages.map((page) => this.#renderPageCard(page))}
				</div>

				<div slot="actions">
					<uui-button label="Cancel" @click=${this.#onCancel}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						@click=${this.#onConfirm}
						?disabled=${this.#noneSelected}>
						${this.#allSelected
							? 'Include all pages'
							: `Include ${selectedCount} page${selectedCount !== 1 ? 's' : ''}`}
					</uui-button>
				</div>
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

			.toolbar {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-5);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.toolbar-spacer {
				flex: 1;
			}

			.selection-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.page-grid {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-5);
			}
		`,
	];
}

export default UpDocPagePickerModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-page-picker-modal': UpDocPagePickerModalElement;
	}
}
