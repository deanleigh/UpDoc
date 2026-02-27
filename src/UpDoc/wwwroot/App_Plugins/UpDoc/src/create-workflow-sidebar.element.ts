import type { CreateWorkflowSidebarData, CreateWorkflowSidebarValue } from './create-workflow-sidebar.token.js';
import { UMB_PAGE_PICKER_MODAL } from './page-picker-modal.token.js';
import { extractRich } from './workflow.service.js';
import './up-doc-pdf-picker.element.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement, UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';
import { generateAlias } from '@umbraco-cms/backoffice/utils';
import type { UmbInputWithAliasElement } from '@umbraco-cms/backoffice/components';

const SOURCE_TYPE_OPTIONS = [
	{ value: 'pdf', name: 'PDF Document' },
	{ value: 'markdown', name: 'Markdown' },
	{ value: 'web', name: 'Web Page' },
	{ value: 'doc', name: 'Word Document' },
];

const SOURCE_TYPE_LABELS: Record<string, string> = {
	pdf: 'PDF',
	markdown: 'Markdown',
	web: 'Web Page',
	doc: 'Word Document',
};

type TabType = 'source' | 'destination';

@customElement('create-workflow-sidebar')
export class CreateWorkflowSidebarElement extends UmbModalBaseElement<
	CreateWorkflowSidebarData,
	CreateWorkflowSidebarValue
> {
	@state() private _activeTab: TabType = 'source';
	@state() private _name = '';
	@state() private _alias = '';
	@state() private _aliasLocked = true;
	#nameManuallyEdited = false;
	@state() private _sourceType = '';
	@state() private _selectedMediaUnique: string | null = null;
	@state() private _sourceUrl = '';
	@state() private _extracting = false;
	@state() private _totalPages = 0;
	@state() private _elementCount = 0;
	@state() private _fileName = '';
	@state() private _selectedPages: number[] | null = null;

	#handleSourceTypeChange(e: Event) {
		const target = e.target as Element & { value: string };
		const newSourceType = target.value;

		if (newSourceType !== this._sourceType) {
			this._selectedMediaUnique = null;
			this._sourceUrl = '';
		}

		this._sourceType = newSourceType;

		// Auto-generate name and alias when source type changes (only if user hasn't typed a custom name)
		if (!this.#nameManuallyEdited && this.data?.blueprintName && this._sourceType) {
			const sourceLabel = SOURCE_TYPE_LABELS[this._sourceType] ?? this._sourceType;
			this._name = `${this.data.blueprintName} - ${sourceLabel}`;
			this._alias = generateAlias(this._name);
		}

		this.requestUpdate();
	}

	async #handlePdfPickerChange(e: CustomEvent) {
		const detail = e.detail as { mediaKey: string | null };
		this._selectedMediaUnique = detail?.mediaKey ?? null;
		this._totalPages = 0;
		this._elementCount = 0;
		this._fileName = '';
		this._selectedPages = null;

		if (this._selectedMediaUnique) {
			this._extracting = true;
			try {
				const authContext = await this.getContext(UMB_AUTH_CONTEXT);
				const token = await authContext.getLatestToken();
				const result = await extractRich(this._selectedMediaUnique, token);
				if (result) {
					this._totalPages = result.source.totalPages;
					this._elementCount = result.elements.length;
					this._fileName = result.source.fileName;
				}
			} catch {
				// Extraction preview failed — not critical, will retry on Create
			} finally {
				this._extracting = false;
			}
		}
	}

	async #onOpenPagePicker() {
		if (!this._selectedMediaUnique || this._totalPages === 0) return;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_PAGE_PICKER_MODAL, {
			data: {
				mediaKey: this._selectedMediaUnique,
				totalPages: this._totalPages,
				selectedPages: this._selectedPages,
			},
		});

		const result = await modal.onSubmit().catch(() => null);
		if (result === null) return; // cancelled

		this._selectedPages = result.selectedPages;
	}

	async #handleMediaChange(e: CustomEvent) {
		const target = e.target as UmbInputMediaElement;
		const selection = target.selection;
		this._selectedMediaUnique = selection.length > 0 ? selection[0] : null;
	}

	#handleNameAliasChange(e: Event) {
		const target = e.target as UmbInputWithAliasElement;
		this._name = target.value as string;
		this._alias = target.alias;
		this._aliasLocked = target.autoGenerateAlias ?? false;
		// Once the user types anything in the name, don't overwrite it on format change
		if (this._name.trim().length > 0) {
			this.#nameManuallyEdited = true;
		}
	}

	#handleTabClick(tab: TabType) {
		this._activeTab = tab;
	}

	get #canCreate(): boolean {
		return this._name.trim().length > 0 && this._alias.trim().length > 0 && this._sourceType.length > 0;
	}

	#handleSave() {
		if (!this.#canCreate) return;

		this.value = {
			name: this._name.trim(),
			alias: this._alias.trim(),
			sourceType: this._sourceType,
			mediaUnique: this._selectedMediaUnique,
			sourceUrl: this._sourceUrl || null,
			documentTypeAlias: this.data!.documentTypeAlias,
			blueprintId: this.data!.blueprintUnique,
			blueprintName: this.data!.blueprintName,
			selectedPages: this._selectedPages,
		};
		this._submitModal();
	}

	#handleClose() {
		this._rejectModal();
	}

	#renderTabs() {
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

	#renderExtractionStats() {
		if (!this._fileName) return nothing;

		return html`
			<div class="extraction-stats">
				<span class="extraction-filename">${this._fileName}</span>
				<div class="extraction-meta">
					<span><uui-icon name="icon-thumbnails-small"></uui-icon> ${this._totalPages} pages</span>
					<span><uui-icon name="icon-list"></uui-icon> ${this._elementCount} elements</span>
				</div>
			</div>
		`;
	}

	#renderDocumentBox() {
		switch (this._sourceType) {
			case 'pdf':
				return html`
					<uui-box headline="Sample Document">
						<up-doc-pdf-picker @change=${this.#handlePdfPickerChange}></up-doc-pdf-picker>
						${this._extracting ? html`<uui-loader-bar></uui-loader-bar>` : nothing}
						${this.#renderExtractionStats()}
					</uui-box>
				`;
			case 'markdown':
				return html`
					<uui-box headline="Sample File">
						<umb-input-media max="1" @change=${this.#handleMediaChange}></umb-input-media>
					</uui-box>
				`;
			case 'web':
				return html`
					<uui-box headline="Sample URL">
						<uui-input
							label="URL"
							placeholder="https://example.com/page"
							.value=${this._sourceUrl}
							@input=${(e: UUIInputEvent) => (this._sourceUrl = e.target.value as string)}>
						</uui-input>
					</uui-box>
				`;
			case 'doc':
				return html`
					<uui-box headline="Sample Document">
						<umb-input-media max="1" @change=${this.#handleMediaChange}></umb-input-media>
					</uui-box>
				`;
			default:
				return nothing;
		}
	}

	#renderPagesBox() {
		if (this._totalPages === 0) return nothing;

		const label = this._selectedPages
			? `${this._selectedPages.length} of ${this._totalPages} pages`
			: `All ${this._totalPages} pages`;

		return html`
			<uui-box headline="Pages">
				<span class="page-selection-label">${label}</span>
				<uui-button
					look="outline"
					label="Choose Pages"
					@click=${this.#onOpenPagePicker}
					class="full-width-button">
					<uui-icon name="icon-thumbnails-small"></uui-icon>
					Choose Pages
				</uui-button>
			</uui-box>
		`;
	}

	#renderSourceTab() {
		return html`
			<uui-box headline="Workflow Name">
				<umb-input-with-alias
					label="Workflow name"
					.value=${this._name}
					.alias=${this._alias}
					?auto-generate-alias=${this._aliasLocked}
					@change=${this.#handleNameAliasChange}>
				</umb-input-with-alias>
			</uui-box>

			<uui-box headline="Format">
				<uui-select
					label="Select source format"
					.options=${[
						{ name: 'Choose a format...', value: '', selected: this._sourceType === '' },
						...SOURCE_TYPE_OPTIONS.map((st) => ({
							...st,
							selected: this._sourceType === st.value,
						})),
					]}
					@change=${this.#handleSourceTypeChange}>
				</uui-select>
			</uui-box>

			${this.#renderDocumentBox()}
			${this.#renderPagesBox()}
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

	#renderTabContent() {
		switch (this._activeTab) {
			case 'source':
				return this.#renderSourceTab();
			case 'destination':
				return this.#renderDestinationTab();
		}
	}

	override render() {
		return html`
			<umb-body-layout headline="Create Workflow">
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
					?disabled=${!this.#canCreate}
					@click="${this.#handleSave}"></uui-button>
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			.destination-value {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			uui-input,
			umb-input-with-alias {
				width: 100%;
			}

			uui-select {
				width: 100%;
			}

			uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			.tab-content {
				display: flex;
				flex-direction: column;
			}

			.extraction-stats {
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-3);
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
			}

			.extraction-filename {
				display: block;
				font-weight: 600;
				font-size: var(--uui-type-small-size);
				margin-bottom: var(--uui-size-space-2);
				word-break: break-all;
			}

			.extraction-meta {
				display: flex;
				gap: var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.extraction-meta span {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
			}

			.page-selection-label {
				display: block;
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				margin-bottom: var(--uui-size-space-3);
			}

			.full-width-button {
				width: 100%;
			}

		`,
	];
}

export default CreateWorkflowSidebarElement;

declare global {
	interface HTMLElementTagNameMap {
		'create-workflow-sidebar': CreateWorkflowSidebarElement;
	}
}
