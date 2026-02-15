import './up-doc-pdf-thumbnail.element.js';
import { html, customElement, css, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_MEDIA_PICKER_MODAL } from '@umbraco-cms/backoffice/media';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

/**
 * PDF media picker with first-page thumbnail preview inside a uui-card-media.
 *
 * Opens Umbraco's standard media picker modal for browsing/selecting.
 * After selection, renders a uui-card-media with a PDF.js-rendered
 * thumbnail image of page 1 — matching the media library card style.
 *
 * Fires a 'change' CustomEvent with { mediaKey } when selection changes.
 *
 * Usage:
 *   <up-doc-pdf-picker @change=${this.#handlePdfChange}></up-doc-pdf-picker>
 */
@customElement('up-doc-pdf-picker')
export class UpDocPdfPickerElement extends UmbLitElement {
	/** Optional label text shown on the card */
	@property({ type: String }) label = '';

	@state() private _mediaKey: string | null = null;
	@state() private _mediaName = '';
	@state() private _token = '';

	override async connectedCallback() {
		super.connectedCallback();
		const authContext = await this.getContext(UMB_AUTH_CONTEXT);
		this._token = await authContext.getLatestToken();
	}

	async #openPicker() {
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

		this._mediaKey = mediaKey;
		this._mediaName = await this.#fetchMediaName(mediaKey);

		this.dispatchEvent(
			new CustomEvent('change', {
				detail: { mediaKey },
				bubbles: true,
				composed: true,
			})
		);
	}

	async #fetchMediaName(mediaKey: string): Promise<string> {
		try {
			const response = await fetch(
				`/umbraco/management/api/v1/media/item?id=${mediaKey}`,
				{ headers: { Authorization: `Bearer ${this._token}` } }
			);
			if (!response.ok) return 'PDF';
			const items = await response.json();
			return items?.[0]?.name ?? 'PDF';
		} catch {
			return 'PDF';
		}
	}

	#handleRemove() {
		this._mediaKey = null;
		this._mediaName = '';

		this.dispatchEvent(
			new CustomEvent('change', {
				detail: { mediaKey: null },
				bubbles: true,
				composed: true,
			})
		);
	}

	override render() {
		if (!this._mediaKey) {
			return html`
				<uui-button
					id="btn-add"
					look="placeholder"
					@click=${this.#openPicker}
					label="Choose">
					<uui-icon name="icon-add"></uui-icon>
					Choose
				</uui-button>
			`;
		}

		return html`
			<uui-card-media name=${this._mediaName || 'PDF'}>
				<up-doc-pdf-thumbnail
					mediaKey=${this._mediaKey}
					page="1"
					width="300"
					token=${this._token}>
				</up-doc-pdf-thumbnail>
				<uui-action-bar slot="actions">
					<uui-button
						label="Remove"
						look="secondary"
						compact
						@click=${this.#handleRemove}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
					<uui-button
						label="Change"
						look="secondary"
						compact
						@click=${this.#openPicker}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</uui-card-media>
		`;
	}

	static override styles = [
		css`
			:host {
				display: block;
			}

			#btn-add {
				text-align: center;
				width: 200px;
				height: 200px;
			}

			uui-icon {
				display: block;
				margin: 0 auto;
			}

			uui-card-media {
				width: 200px;
			}
		`,
	];
}

export default UpDocPdfPickerElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-pdf-picker': UpDocPdfPickerElement;
	}
}
