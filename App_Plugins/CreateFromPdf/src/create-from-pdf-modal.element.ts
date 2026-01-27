import type { UmbCreateFromPdfModalData, UmbCreateFromPdfModalValue } from './create-from-pdf-modal.token.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

@customElement('create-from-pdf-modal')
export class CreateFromPdfModalElement extends UmbModalBaseElement<
	UmbCreateFromPdfModalData,
	UmbCreateFromPdfModalValue
> {
	@state()
	private _documentName = '';

	@state()
	private _selectedMediaUnique: string | null = null;

	@state()
	private _pageTitle = '';

	@state()
	private _pageTitleShort = '';

	@state()
	private _pageDescription = '';

	@state()
	private _isExtracting = false;

	@state()
	private _extractionError: string | null = null;

	override firstUpdated() {
		this._documentName = '';
		this._selectedMediaUnique = null;
		this._pageTitle = '';
		this._pageTitleShort = '';
		this._pageDescription = '';
	}

	async #handleMediaChange(e: CustomEvent) {
		console.log('Media change event fired', e);
		const target = e.target as UmbInputMediaElement;
		const selection = target.selection;
		console.log('Selection:', selection);
		this._selectedMediaUnique = selection.length > 0 ? selection[0] : null;
		console.log('Selected media unique:', this._selectedMediaUnique);

		if (this._selectedMediaUnique) {
			await this.#extractPdfProperties(this._selectedMediaUnique);
		} else {
			// Clear extracted values if no media selected
			this._pageTitle = '';
			this._pageTitleShort = '';
			this._pageDescription = '';
			this._documentName = '';
			this._extractionError = null;
		}
	}

	async #extractPdfProperties(mediaUnique: string) {
		console.log('Starting PDF extraction for:', mediaUnique);
		this._isExtracting = true;
		this._extractionError = null;

		try {
			console.log('Getting auth context...');
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			console.log('Got token, calling API...');

			const response = await fetch(
				`/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${mediaUnique}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log('API response status:', response.status);

			if (!response.ok) {
				const error = await response.json();
				console.error('API error:', error);
				this._extractionError = error.error || 'Failed to extract PDF properties';
				return;
			}

			const result = await response.json();
			console.log('Extraction result:', result);

			// Set extracted values
			this._pageTitle = result.title || '';
			this._pageTitleShort = result.title || '';
			this._pageDescription = result.description || '';

			console.log('Set values - title:', this._pageTitle, 'description:', this._pageDescription);

			// Pre-fill document name with extracted title
			if (result.title && !this._documentName) {
				this._documentName = result.title;
				console.log('Pre-filled document name:', this._documentName);
			}
		} catch (error) {
			this._extractionError = 'Failed to connect to PDF extraction service';
			console.error('PDF extraction error:', error);
		} finally {
			this._isExtracting = false;
			console.log('Extraction complete, isExtracting:', this._isExtracting);
			// Force re-render to ensure UI updates
			this.requestUpdate();
		}
	}

	#handleSave() {
		this.value = {
			name: this._documentName,
			mediaUnique: this._selectedMediaUnique,
			pageTitle: this._pageTitle,
			pageTitleShort: this._pageTitleShort,
			pageDescription: this._pageDescription,
		};
		this.modalContext?.submit();
	}

	#handleClose() {
		this.modalContext?.reject();
	}

	#renderExtractionStatus() {
		if (this._isExtracting) {
			return html`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting PDF properties...</span>
			</div>`;
		}

		if (this._extractionError) {
			return html`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>`;
		}

		if (this._pageTitle) {
			return html`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>PDF properties extracted successfully</span>
			</div>`;
		}

		return nothing;
	}

	#renderExtractedPreview() {
		if (!this._pageTitle && !this._pageDescription) {
			return nothing;
		}

		return html`
			<uui-box headline="Extracted Properties" class="preview-box">
				<div class="preview-item">
					<strong>Page Title:</strong> ${this._pageTitle || '(empty)'}
				</div>
				<div class="preview-item">
					<strong>Page Description:</strong> ${this._pageDescription || '(empty)'}
				</div>
			</uui-box>
		`;
	}

	override render() {
		console.log('RENDER called - documentName:', this._documentName, 'pageTitle:', this._pageTitle);
		const canCreate = this._documentName && this._selectedMediaUnique && !this._isExtracting;
		console.log('canCreate:', canCreate, 'docName:', !!this._documentName, 'media:', !!this._selectedMediaUnique, 'extracting:', this._isExtracting);

		return html`
			<umb-body-layout headline="Create from PDF">
				<uui-box headline="Document Name">
					<p>Enter a document name or let it be populated from the PDF. You can edit this later.</p>
					<uui-input
						id="name"
						label="name"
						placeholder="Enter document name"
						.value=${this._documentName}
						@input=${(e: UUIInputEvent) => (this._documentName = e.target.value as string)}>
					</uui-input>
				</uui-box>

				<uui-box headline="Select PDF">
					<p>Select a PDF from the media library to extract content and create a new document.</p>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<umb-input-media
								max="1"
								@change=${this.#handleMediaChange}>
							</umb-input-media>
							${this.#renderExtractionStatus()}
						</div>
					</umb-property-layout>
				</uui-box>

				${this.#renderExtractedPreview()}

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
					?disabled=${!canCreate}
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

			uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}

			.extraction-status {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
			}

			.extraction-status.extracting {
				background-color: var(--uui-color-surface-alt);
			}

			.extraction-status.error {
				background-color: var(--uui-color-danger-emphasis);
				color: var(--uui-color-danger-contrast);
			}

			.extraction-status.success {
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
			}

			.preview-box {
				margin-top: var(--uui-size-space-4);
			}

			.preview-item {
				margin-bottom: var(--uui-size-space-2);
			}

			.preview-item:last-child {
				margin-bottom: 0;
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
