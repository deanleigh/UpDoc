import type { UmbCreateFromPdfModalData, UmbCreateFromPdfModalValue, SourceType } from './create-from-pdf-modal.token.js';
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
	private _sourceType: SourceType | '' = '';

	@state()
	private _sourceUrl = '';

	@state()
	private _selectedMediaUnique: string | null = null;

	@state()
	private _pageTitle = '';

	@state()
	private _pageTitleShort = '';

	@state()
	private _pageDescription = '';

	@state()
	private _itineraryContent = '';

	@state()
	private _isExtracting = false;

	@state()
	private _extractionError: string | null = null;

	override firstUpdated() {
		this._documentName = '';
		this._sourceType = '';
		this._sourceUrl = '';
		this._selectedMediaUnique = null;
		this._pageTitle = '';
		this._pageTitleShort = '';
		this._pageDescription = '';
		this._itineraryContent = '';
	}

	#handleSourceTypeChange(e: Event) {
		const target = e.target as Element & { value: string };
		const newSourceType = target.value as SourceType | '';
		console.log('Source type change event:', e.type, 'value:', newSourceType, 'target:', target.tagName);

		// Reset source-specific state when changing source type
		if (newSourceType !== this._sourceType) {
			this._selectedMediaUnique = null;
			this._sourceUrl = '';
			this._pageTitle = '';
			this._pageTitleShort = '';
			this._pageDescription = '';
			this._itineraryContent = '';
			this._extractionError = null;
		}

		this._sourceType = newSourceType;
		console.log('Source type set to:', this._sourceType);
		this.requestUpdate();
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
			this._itineraryContent = '';
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

			// Extract Suggested Itinerary section
			await this.#extractItinerarySection(mediaUnique, token);
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

	async #extractItinerarySection(mediaUnique: string, token: string) {
		try {
			console.log('Extracting PDF as Markdown...');
			const response = await fetch(
				`/umbraco/management/api/v1/createfrompdf/extract-markdown?mediaKey=${mediaUnique}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				console.log('Markdown extraction result:', result);
				console.log('Title:', result.title);
				console.log('Subtitle:', result.subtitle);
				console.log('Markdown preview:', result.markdown?.substring(0, 500));

				// Store the Markdown content (will be converted to HTML in the action)
				this._itineraryContent = result.markdown || '';
			} else {
				const error = await response.json();
				console.log('Markdown extraction failed:', error);
				this._itineraryContent = '';
			}
		} catch (error) {
			console.error('Failed to extract Markdown:', error);
			this._itineraryContent = '';
		}
	}

	#handleSave() {
		this.value = {
			name: this._documentName,
			sourceType: this._sourceType as SourceType,
			mediaUnique: this._selectedMediaUnique,
			sourceUrl: this._sourceUrl || null,
			pageTitle: this._pageTitle,
			pageTitleShort: this._pageTitleShort,
			pageDescription: this._pageDescription,
			itineraryContent: this._itineraryContent,
		};
		this.modalContext?.submit();
	}

	#handleClose() {
		this.modalContext?.reject();
	}

	#renderSourceUI() {
		switch (this._sourceType) {
			case 'pdf':
				return this.#renderPdfSource();
			case 'web':
				return this.#renderWebSource();
			case 'doc':
				return this.#renderDocSource();
			default:
				return nothing;
		}
	}

	#renderPdfSource() {
		return html`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${this.#handleMediaChange}>
					</umb-input-media>
					${this.#renderExtractionStatus()}
				</div>
			</umb-property-layout>
		`;
	}

	#renderWebSource() {
		return html`
			<umb-property-layout label="Web Page URL" orientation="vertical">
				<div slot="editor">
					<uui-input
						label="URL"
						placeholder="https://example.com/page"
						.value=${this._sourceUrl}
						@input=${(e: UUIInputEvent) => (this._sourceUrl = e.target.value as string)}>
					</uui-input>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Web page extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
	}

	#renderDocSource() {
		return html`
			<umb-property-layout label="Word Document" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${(e: CustomEvent) => {
							const target = e.target as UmbInputMediaElement;
							const selection = target.selection;
							this._selectedMediaUnique = selection.length > 0 ? selection[0] : null;
						}}>
					</umb-input-media>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Word document extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
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
		if (!this._pageTitle && !this._pageDescription && !this._itineraryContent) {
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
				${this._itineraryContent
					? html`<div class="preview-item itinerary-preview">
							<strong>Suggested Itinerary:</strong>
							<div class="itinerary-content">${this._itineraryContent.substring(0, 200)}${this._itineraryContent.length > 200 ? '...' : ''}</div>
						</div>`
					: nothing}
			</uui-box>
		`;
	}

	#getCanCreate(): boolean {
		if (!this._documentName || this._isExtracting) return false;

		switch (this._sourceType) {
			case 'pdf':
				return !!this._selectedMediaUnique;
			case 'web':
			case 'doc':
				// Not yet functional
				return false;
			default:
				return false;
		}
	}

	override render() {
		const canCreate = this.#getCanCreate();

		return html`
			<umb-body-layout headline="Create from Source">
				<uui-box headline="Document Name">
					<p>Enter a document name or let it be populated from the source. You can edit this later.</p>
					<uui-input
						id="name"
						label="name"
						placeholder="Enter document name"
						.value=${this._documentName}
						@input=${(e: UUIInputEvent) => (this._documentName = e.target.value as string)}>
					</uui-input>
				</uui-box>

				<uui-box headline="Source">
					<umb-property-layout label="Source Type" orientation="vertical">
						<div slot="editor">
							<uui-select
								label="Select source type"
								placeholder="Choose a source..."
								.value=${this._sourceType}
								.options=${[
									{ name: 'PDF Document', value: 'pdf' },
									{ name: 'Web Page', value: 'web' },
									{ name: 'Word Document', value: 'doc' },
								]}
								@change=${this.#handleSourceTypeChange}>
							</uui-select>
						</div>
					</umb-property-layout>

					${this.#renderSourceUI()}
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

			.itinerary-content {
				margin-top: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				background-color: var(--uui-color-surface-alt);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				white-space: pre-wrap;
				max-height: 100px;
				overflow-y: auto;
			}

			uui-select {
				width: 100%;
			}

			.source-coming-soon {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background-color: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
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
