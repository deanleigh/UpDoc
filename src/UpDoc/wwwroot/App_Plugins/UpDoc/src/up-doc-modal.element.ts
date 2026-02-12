import type { UmbUpDocModalData, UmbUpDocModalValue, SourceType } from './up-doc-modal.token.js';
import type { DocumentTypeConfig } from './workflow.types.js';
import { extractRich, fetchConfig, transformAdhoc } from './workflow.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

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
	private _sectionLookup: Record<string, string> = {};

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
		this._sectionLookup = {};
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

			if (config) {
				this._config = config;

				if (config.sources) {
					this._availableSourceTypes = Object.keys(config.sources);

					// Auto-select if only one source type is available
					if (this._availableSourceTypes.length === 1) {
						this._sourceType = this._availableSourceTypes[0] as SourceType;
					}
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
			this._sectionLookup = {};
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
			this._sectionLookup = {};
			this._documentName = '';
			this._extractionError = null;
		}
	}

	async #extractFromSource(mediaUnique: string) {
		this._isExtracting = true;
		this._extractionError = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			// Use rich extraction — returns elements with IDs matching map.json
			const extraction = await extractRich(mediaUnique, token);

			if (!extraction?.elements?.length) {
				this._extractionError = 'Failed to extract content from source';
				return;
			}

			// Build element ID → text lookup (same key format as map.json sources)
			const elementLookup: Record<string, string> = {};
			for (const element of extraction.elements) {
				elementLookup[element.id] = element.text;
			}

			this._extractedSections = elementLookup;

			// Run adhoc transform to build section-based lookup
			if (this._config?.folderPath) {
				const workflowName = this._config.folderPath.replace(/\\/g, '/').split('/').pop() ?? '';
				if (workflowName) {
					const transformResult = await transformAdhoc(workflowName, mediaUnique, token);
					if (transformResult?.sections) {
						const sectionLookup: Record<string, string> = {};
						for (const section of transformResult.sections) {
							if (!section.included) continue;
							if (section.heading) {
								sectionLookup[`${section.id}.heading`] = section.heading;
							}
							sectionLookup[`${section.id}.content`] = section.content;
						}
						this._sectionLookup = sectionLookup;
					}
				}
			}

			// Pre-fill document name from mapped title elements
			// Try section lookup first, fall back to element lookup
			const combinedLookup = { ...elementLookup, ...this._sectionLookup };
			if (!this._documentName && this._config) {
				this.#prefillDocumentName(combinedLookup);
			}
		} catch (error) {
			this._extractionError = 'Failed to connect to extraction service';
			console.error('Extraction error:', error);
		} finally {
			this._isExtracting = false;
		}
	}

	/**
	 * Pre-fills the document name by finding elements mapped to a top-level field
	 * (no blockKey — i.e., a document property like pageTitle, not a block property).
	 * Concatenates multiple elements with a space (e.g., title split across two lines).
	 */
	#prefillDocumentName(elementLookup: Record<string, string>) {
		if (!this._config?.map?.mappings?.length) return;

		// Find the first mapping that targets a top-level field (no blockKey)
		let titleTarget: string | null = null;
		for (const mapping of this._config.map.mappings) {
			if (mapping.enabled === false) continue;
			const topLevelDest = mapping.destinations.find((d) => !d.blockKey);
			if (topLevelDest) {
				titleTarget = topLevelDest.target;
				break;
			}
		}

		if (!titleTarget) return;

		// Collect text from all elements mapped to this top-level target
		const parts: string[] = [];
		for (const mapping of this._config.map.mappings) {
			if (mapping.enabled === false) continue;
			const mapsToTarget = mapping.destinations.some((d) => d.target === titleTarget && !d.blockKey);
			if (mapsToTarget && elementLookup[mapping.source]) {
				parts.push(elementLookup[mapping.source]);
			}
		}

		if (parts.length > 0) {
			this._documentName = parts.join(' ');
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
			sectionLookup: this._sectionLookup,
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

	#hasExtractedContent(): boolean {
		return Object.keys(this._extractedSections).length > 0;
	}

	#handleTabClick(tab: TabType) {
		if (tab === 'content' && !this.#hasExtractedContent()) {
			return; // Don't switch to content tab if no content
		}
		this._activeTab = tab;
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

	/**
	 * Builds a preview of what the mapped values will look like.
	 * Groups by compound key (blockKey:alias) so block properties with the same
	 * alias across different blocks are kept separate.
	 */
	#buildMappedPreview(): Array<{ label: string; value: string }> {
		if (!this._config?.map?.mappings?.length) return [];

		const preview = new Map<string, string[]>();
		const keyMeta = new Map<string, { alias: string; blockKey?: string }>();

		for (const mapping of this._config.map.mappings) {
			if (mapping.enabled === false) continue;
			const text = this._sectionLookup[mapping.source] ?? this._extractedSections[mapping.source];
			if (!text) continue;
			for (const dest of mapping.destinations) {
				const compoundKey = dest.blockKey ? `${dest.blockKey}:${dest.target}` : dest.target;
				const existing = preview.get(compoundKey) ?? [];
				existing.push(text);
				preview.set(compoundKey, existing);
				if (!keyMeta.has(compoundKey)) {
					keyMeta.set(compoundKey, { alias: dest.target, blockKey: dest.blockKey });
				}
			}
		}

		return Array.from(preview.entries()).map(([compoundKey, parts]) => {
			const meta = keyMeta.get(compoundKey);
			return {
				label: this.#resolveDestinationLabel(meta?.alias ?? compoundKey, meta?.blockKey),
				value: parts.join(' '),
			};
		});
	}

	#resolveDestinationLabel(alias: string, blockKey?: string): string {
		if (!this._config?.destination) return alias;

		// Check top-level fields first (only when no blockKey)
		if (!blockKey) {
			const field = this._config.destination.fields.find((f) => f.alias === alias);
			if (field) return field.label;
		}

		// Check block properties — use blockKey to find the specific block
		if (this._config.destination.blockGrids) {
			for (const grid of this._config.destination.blockGrids) {
				for (const block of grid.blocks) {
					if (blockKey && block.key !== blockKey) continue;
					const prop = block.properties?.find((p) => p.alias === alias);
					if (prop) return `${block.label} > ${prop.label || prop.alias}`;
				}
			}
		}

		// Fallback: check top-level fields even with blockKey (shouldn't happen but safe)
		const field = this._config.destination.fields.find((f) => f.alias === alias);
		return field?.label ?? alias;
	}

	#renderContentTab() {
		const mapped = this.#buildMappedPreview();

		if (mapped.length === 0) {
			return html`
				<div class="content-editor">
					<p class="content-editor-intro">No mapped content to preview. Create mappings in the workflow editor first.</p>
				</div>
			`;
		}

		return html`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the content that will be mapped to the document.
				</p>
				${mapped.map(({ label, value }) => html`
					<div class="section-card">
						<div class="section-card-header">
							<span class="section-card-label">${label}</span>
						</div>
						<div class="section-card-body">
							<uui-action-bar class="section-card-actions">
								<uui-button
									compact
									title="Copy"
									label="Copy ${label}"
									@click=${() => this.#copySection(label, value)}>
									<uui-icon name="icon-documents"></uui-icon>
								</uui-button>
							</uui-action-bar>
							<div class="section-card-content">${value}</div>
						</div>
					</div>
				`)}
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
