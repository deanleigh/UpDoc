import type { UmbCreateFromPdfModalData, UmbCreateFromPdfModalValue } from './create-from-pdf-modal.token.js';
import { html, customElement, css, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';

@customElement('create-from-pdf-modal')
export class CreateFromPdfModalElement extends UmbModalBaseElement<
	UmbCreateFromPdfModalData,
	UmbCreateFromPdfModalValue
> {
	@state()
	private _documentName = '';

	override firstUpdated() {
		// Initialize with empty name, user will fill in
		this._documentName = '';
	}

	#handleSave() {
		this.value = { name: this._documentName };
		this.modalContext?.submit();
	}

	#handleClose() {
		this.modalContext?.reject();
	}

	override render() {
		return html`
			<umb-body-layout headline="Create from PDF">
				<uui-box headline="Create a new document from PDF">
					<p>Upload a PDF file to extract content and create a new document.</p>

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
							<uui-input
								type="file"
								accept=".pdf"
								label="Select PDF file">
							</uui-input>
						</div>
					</umb-property-layout>
				</uui-box>

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${this.#handleClose}">
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					@click="${this.#handleSave}">
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
