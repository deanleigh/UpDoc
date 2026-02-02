import type { UmbUpDocModalData, UmbUpDocModalValue, SourceType } from './up-doc-modal.token.js';
import type { PropertyMapping } from './map-file.types.js';
import { extractSections } from './map-file.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

@customElement('up-doc-modal')
export class UpDocModalElement extends UmbModalBaseElement<
	UmbUpDocModalData,
	UmbUpDocModalValue
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
	private _extractedSections: Record<string, string> = {};

	@state()
	private _propertyMappings: PropertyMapping[] = [];

	@state()
	private _isExtracting = false;

	@state()
	private _extractionError: string | null = null;

	override firstUpdated() {
		this._documentName = '';
		this._sourceType = '';
		this._sourceUrl = '';
		this._selectedMediaUnique = null;
		this._extractedSections = {};
		this._propertyMappings = [];
	}

	#handleSourceTypeChange(e: Event) {
		const target = e.target as Element & { value: string };
		const newSourceType = target.value as SourceType | '';

		if (newSourceType !== this._sourceType) {
			this._selectedMediaUnique = null;
			this._sourceUrl = '';
			this._extractedSections = {};
			this._propertyMappings = [];
			this._extractionError = null;
		}

		this._sourceType = newSourceType;
	}

	async #handleMediaChange(e: CustomEvent) {
		const target = e.target as UmbInputMediaElement;
		const selection = target.selection;
		this._selectedMediaUnique = selection.length > 0 ? selection[0] : null;

		if (this._selectedMediaUnique) {
			await this.#extractFromSource(this._selectedMediaUnique);
		} else {
			this._extractedSections = {};
			this._propertyMappings = [];
			this._documentName = '';
			this._extractionError = null;
		}
	}

	async #extractFromSource(mediaUnique: string) {
		this._isExtracting = true;
		this._extractionError = null;

		try {
			const blueprintId = this.data?.blueprintId;
			if (!blueprintId) {
				this._extractionError = 'No blueprint ID available';
				return;
			}

			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			const result = await extractSections(mediaUnique, blueprintId, token);

			if (!result) {
				this._extractionError = 'Failed to extract content from source';
				return;
			}

			this._extractedSections = result.sections;
			this._propertyMappings = result.propertyMappings;

			// Pre-fill document name with extracted title
			if (result.sections['title'] && !this._documentName) {
				this._documentName = result.sections['title'];
			}
		} catch (error) {
			this._extractionError = 'Failed to connect to extraction service';
			console.error('Extraction error:', error);
		} finally {
			this._isExtracting = false;
		}
	}

	#handleSave() {
		this.value = {
			name: this._documentName,
			sourceType: this._sourceType as SourceType,
			mediaUnique: this._selectedMediaUnique,
			sourceUrl: this._sourceUrl || null,
			extractedSections: this._extractedSections,
			propertyMappings: this._propertyMappings,
		};
		this._submitModal();
	}

	#handleClose() {
		this._rejectModal();
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
				<span>Extracting content from source...</span>
			</div>`;
		}

		if (this._extractionError) {
			return html`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>`;
		}

		const hasContent = Object.values(this._extractedSections).some((v) => v.length > 0);
		if (hasContent) {
			return html`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>`;
		}

		return nothing;
	}

	#renderExtractedPreview() {
		const sections = this._extractedSections;
		const hasContent = Object.values(sections).some((v) => v.length > 0);
		if (!hasContent) {
			return nothing;
		}

		return html`
			<uui-box headline="Extracted Content" class="preview-box">
				${Object.entries(sections).map(([key, value]) => {
					if (!value) return nothing;
					const truncated = value.length > 200 ? `${value.substring(0, 200)}...` : value;
					return html`
						<div class="preview-item">
							<strong>${key}:</strong>
							<div class="preview-value">${truncated}</div>
						</div>
					`;
				})}
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
				return false;
			default:
				return false;
		}
	}

	override render() {
		const canCreate = this.#getCanCreate();

		return html`
			<umb-body-layout headline="Create from Source">
				<uui-box headline="Blueprint">
					<div class="blueprint-display">
						<umb-icon name="icon-blueprint"></umb-icon>
						<span>${this.data?.blueprintName}</span>
					</div>
				</uui-box>

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
								.options=${[
									{ name: 'Choose a source...', value: '', selected: this._sourceType === '' },
									{ name: 'PDF Document', value: 'pdf', selected: this._sourceType === 'pdf' },
									{ name: 'Web Page', value: 'web', selected: this._sourceType === 'web' },
									{ name: 'Word Document', value: 'doc', selected: this._sourceType === 'doc' },
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
					label=${this.localize.term('general_close')}
					@click="${this.#handleClose}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term('general_create')}
					?disabled=${!canCreate}
					@click="${this.#handleSave}"></uui-button>
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			.blueprint-display {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

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

			.preview-value {
				margin-top: var(--uui-size-space-1);
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

export default UpDocModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-modal': UpDocModalElement;
	}
}
