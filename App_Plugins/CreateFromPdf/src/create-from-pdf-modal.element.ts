import type { UmbCreateFromPdfModalData, UmbCreateFromPdfModalValue } from './create-from-pdf-modal.token.js';
import { html, customElement, css, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';

@customElement('create-from-pdf-modal')
export class CreateFromPdfModalElement extends UmbModalBaseElement<
	UmbCreateFromPdfModalData,
	UmbCreateFromPdfModalValue
> {
	@state()
	private _documentName = '';

	@state()
	private _selectedMediaUnique: string | null = null;

	override firstUpdated() {
		// Initialize with empty values
		this._documentName = '';
		this._selectedMediaUnique = null;
	}

	#handleMediaChange(e: CustomEvent) {
		const target = e.target as UmbInputMediaElement;
		const selection = target.selection;
		this._selectedMediaUnique = selection.length > 0 ? selection[0] : null;
	}

	#handleSave() {
		this.value = { name: this._documentName, mediaUnique: this._selectedMediaUnique };
		this.modalContext?.submit();
	}

	#handleClose() {
		this.modalContext?.reject();
	}

	override render() {
		return html`
			<umb-body-layout headline="Create from PDF">
				<uui-box headline="Create a new document from PDF">
					<p>Select a PDF from the media library to extract content and create a new document.</p>

					<umb-property-layout label="Document Name" orientation="vertical">
						<div slot="editor">
							<uui-input
								id="name"
								label="name"
								placeholder="Enter document name"
								.value=${this._documentName}
								@input=${(e: UUIInputEvent) => (this._documentName = e.target.value as string)}>
							</uui-input>
						</div>
					</umb-property-layout>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<umb-input-media
								max="1"
								@change=${this.#handleMediaChange}>
							</umb-input-media>
						</div>
					</umb-property-layout>
				</uui-box>

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${this.#handleClose}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					@click="${this.#handleSave}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			uui-input {
				width: 100%;
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}
		`,
	];
}

export default CreateFromPdfModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'create-from-pdf-modal': CreateFromPdfModalElement;
	}
}
