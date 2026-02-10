import type { UmbUpDocModalData, UmbUpDocModalValue, SourceType } from './up-doc-modal.token.js';
import type { DocumentTypeConfig } from './workflow.types.js';
import { extractSections, fetchConfig } from './workflow.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

// Human-readable labels for extracted section keys
const SECTION_LABELS: Record<string, string> = {
	title: 'Page Title',
	description: 'Description',
	itinerary: 'Itinerary',
	features: 'Features',
	accommodation: 'Accommodation',
};

// Human-readable labels for source type keys
const SOURCE_TYPE_LABELS: Record<string, string> = {
	pdf: 'PDF Document',
	markdown: 'Markdown',
	web: 'Web Page',
	doc: 'Word Document',
};

type TabType = 'source' | 'content' | 'destination';

@customElement('up-doc-modal')
export class UpDocModalElement extends UmbModalBaseElement<
	UmbUpDocModalData,
	UmbUpDocModalValue
> {
	@state()
	private _activeTab: TabType = 'source';

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
	private _config: DocumentTypeConfig | null = null;

	@state()
	private _isExtracting = false;

	@state()
	private _extractionError: string | null = null;

	@state()
	private _availableSourceTypes: string[] = [];

	@state()
	private _loadingSourceTypes = true;

	override firstUpdated() {
		this._documentName = '';
		this._sourceType = '';
		this._sourceUrl = '';
		this._selectedMediaUnique = null;
		this._extractedSections = {};
		this._config = null;
		this.#loadAvailableSourceTypes();
	}

	async #loadAvailableSourceTypes() {
		this._loadingSourceTypes = true;
		try {
			const blueprintId = this.data?.blueprintId;
			if (!blueprintId) return;

			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();
			const config = await fetchConfig(blueprintId, token);

			if (config?.sources) {
				this._availableSourceTypes = Object.keys(config.sources);

				// Auto-select if only one source type is available
				if (this._availableSourceTypes.length === 1) {
					this._sourceType = this._availableSourceTypes[0] as SourceType;
				}
			}
		} catch (err) {
			console.error('Failed to load available source types:', err);
		} finally {
			this._loadingSourceTypes = false;
		}
	}

	#handleSourceTypeChange(e: Event) {
		const target = e.target as Element & { value: string };
		const newSourceType = target.value as SourceType | '';

		if (newSourceType !== this._sourceType) {
			this._selectedMediaUnique = null;
			this._sourceUrl = '';
			this._extractedSections = {};
			this._config = null;
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
			this._config = null;
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

			const result = await extractSections(mediaUnique, blueprintId, token, this._sourceType || 'pdf');

			if (!result) {
				this._extractionError = 'Failed to extract content from source';
				return;
			}

			this._extractedSections = result.sections;
			this._config = result.config;

			// === DEBUG: Log extracted sections ===
			console.log('=== EXTRACTION COMPLETE ===');
			console.log('Extracted sections:');
			for (const [key, value] of Object.entries(result.sections)) {
				console.log(`  ${key}: ${value ? `${value.length} chars - "${value.substring(0, 80)}..."` : '(empty)'}`);
			}
			console.log('Config loaded:', result.config ? 'yes' : 'no');
			if (result.config) {
				console.log('  Document type:', result.config.destination.documentTypeAlias);
				console.log('  Blueprint:', result.config.destination.blueprintName);
				console.log('  Mappings:', result.config.map.mappings.map(m => `${m.source} -> ${m.destinations.map(d => d.target).join(', ')}`));
			}
			console.log('=== END EXTRACTION ===');

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
		// === DEBUG: Log what we're passing to the action ===
		console.log('=== CREATE BUTTON CLICKED ===');
		console.log('Document name:', this._documentName);
		console.log('Extracted sections being passed:');
		for (const [key, value] of Object.entries(this._extractedSections)) {
			console.log(`  ${key}: ${value ? `${value.length} chars` : '(empty)'}`);
		}
		console.log('Config being passed:', this._config ? 'yes' : 'no');
		console.log('=== END CREATE DEBUG ===');

		this.value = {
			name: this._documentName,
			sourceType: this._sourceType as SourceType,
			mediaUnique: this._selectedMediaUnique,
			sourceUrl: this._sourceUrl || null,
			extractedSections: this._extractedSections,
			config: this._config,
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
			case 'markdown':
				return this.#renderMarkdownSource();
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

	#renderMarkdownSource() {
		return html`
			<umb-property-layout label="Markdown File" orientation="vertical">
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

	#getSectionLabel(key: string): string {
		return SECTION_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
	}

	#hasExtractedContent(): boolean {
		return Object.values(this._extractedSections).some((v) => v.length > 0);
	}

	#handleTabClick(tab: TabType) {
		if (tab === 'content' && !this.#hasExtractedContent()) {
			return; // Don't switch to content tab if no content
		}
		this._activeTab = tab;
	}

	#updateSection(key: string, value: string) {
		this._extractedSections = {
			...this._extractedSections,
			[key]: value,
		};
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

	#renderTabs() {
		const hasContent = this.#hasExtractedContent();
		return html`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === 'source'}
					orientation="horizontal"
					@click=${() => this.#handleTabClick('source')}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === 'content'}
					orientation="horizontal"
					?disabled=${!hasContent}
					@click=${() => this.#handleTabClick('content')}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === 'destination'}
					orientation="horizontal"
					@click=${() => this.#handleTabClick('destination')}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
	}

	#renderSourceTab() {
		return html`
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
				${this._loadingSourceTypes
					? html`<uui-loader-bar></uui-loader-bar>`
					: this._availableSourceTypes.length === 0
						? html`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>`
						: html`
							<umb-property-layout label="Source Type" orientation="vertical">
								<div slot="editor">
									<uui-select
										label="Select source type"
										.options=${[
											...(this._availableSourceTypes.length > 1
												? [{ name: 'Choose a source...', value: '', selected: this._sourceType === '' }]
												: []),
											...this._availableSourceTypes.map((st) => ({
												name: SOURCE_TYPE_LABELS[st] || st,
												value: st,
												selected: this._sourceType === st,
											})),
										]}
										@change=${this.#handleSourceTypeChange}>
									</uui-select>
								</div>
							</umb-property-layout>

							${this.#renderSourceUI()}
						`}
			</uui-box>
		`;
	}

	#renderContentTab() {
		const sections = this._extractedSections;

		return html`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the extracted content before creating the document.
				</p>
				${Object.entries(sections).map(([key, value]) => {
					if (!value) return nothing;
					return html`
						<div class="section-card">
							<div class="section-card-header">
								<span class="section-card-label">${this.#getSectionLabel(key)}</span>
							</div>
							<div class="section-card-body">
								<uui-action-bar class="section-card-actions">
									<uui-button
										compact
										title="Edit"
										label="Edit ${this.#getSectionLabel(key)}"
										@click=${() => this.#openSectionEditor(key)}>
										<uui-icon name="icon-edit"></uui-icon>
									</uui-button>
									<uui-button
										compact
										title="Copy"
										label="Copy ${this.#getSectionLabel(key)}"
										@click=${() => this.#copySection(key, value)}>
										<uui-icon name="icon-documents"></uui-icon>
									</uui-button>
								</uui-action-bar>
								<div class="section-card-content">${value}</div>
							</div>
						</div>
					`;
				})}
			</div>
		`;
	}

	#renderDestinationTab() {
		return html`
			<uui-box headline="Document Type">
				<div class="destination-value">
					<umb-icon name="icon-document-dashed-line"></umb-icon>
					<span>${this.data?.documentTypeName}</span>
				</div>
			</uui-box>

			<uui-box headline="Blueprint">
				<div class="destination-value">
					<umb-icon name="icon-blueprint"></umb-icon>
					<span>${this.data?.blueprintName}</span>
				</div>
			</uui-box>
		`;
	}

	#openSectionEditor(key: string) {
		// TODO: Open editor modal for this section
		console.log('Edit section:', key);
	}

	async #copySection(key: string, value: string) {
		try {
			await navigator.clipboard.writeText(value);
			// TODO: Show toast notification "Copied to clipboard"
			console.log('Copied to clipboard:', key);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	#getCanCreate(): boolean {
		if (!this._documentName || this._isExtracting) return false;

		switch (this._sourceType) {
			case 'pdf':
			case 'markdown':
				return !!this._selectedMediaUnique;
			case 'web':
			case 'doc':
				return false;
			default:
				return false;
		}
	}

	#renderTabContent() {
		switch (this._activeTab) {
			case 'source':
				return this.#renderSourceTab();
			case 'content':
				return this.#renderContentTab();
			case 'destination':
				return this.#renderDestinationTab();
		}
	}

	override render() {
		const canCreate = this.#getCanCreate();

		return html`
			<umb-body-layout headline="Create from Source">
				${this.#renderTabs()}

				<div class="tab-content">
					${this.#renderTabContent()}
				</div>

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
			/* Navigation tabs */
			uui-tab[disabled] {
				opacity: 0.5;
				cursor: not-allowed;
			}

			/* Tab content */
			.tab-content {
				display: flex;
				flex-direction: column;
			}

			/* Content editor tab */
			.content-editor {
				display: flex;
				flex-direction: column;
			}

			.content-editor uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			.content-editor-intro {
				margin: 0 0 var(--uui-size-space-4) 0;
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
			}

			.section-card {
				position: relative;
				background: var(--uui-color-surface);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				margin-bottom: var(--uui-size-space-4);
			}

			.section-card-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				background: var(--uui-color-surface-alt);
			}

			.section-card-label {
				font-weight: 600;
			}

			.section-card-body {
				position: relative;
			}

			.section-card-actions {
				position: absolute;
				top: var(--uui-size-space-2);
				right: var(--uui-size-space-2);
				opacity: 0;
				transition: opacity 120ms ease;
			}

			.section-card:hover .section-card-actions {
				opacity: 1;
			}

			.section-card-content {
				padding: var(--uui-size-space-4);
				white-space: pre-wrap;
				font-size: var(--uui-type-small-size);
				max-height: 300px;
				overflow-y: auto;
			}

			/* Destination tab */
			.destination-value {
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
