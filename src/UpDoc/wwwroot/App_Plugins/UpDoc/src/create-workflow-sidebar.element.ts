import type { CreateWorkflowSidebarData, CreateWorkflowSidebarValue } from './create-workflow-sidebar.token.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';

const SOURCE_TYPE_OPTIONS = [
	{ value: 'pdf', name: 'PDF Document' },
	{ value: 'markdown', name: 'Markdown' },
	{ value: 'web', name: 'Web Page' },
	{ value: 'doc', name: 'Word Document' },
];

type TabType = 'source' | 'destination';

@customElement('create-workflow-sidebar')
export class CreateWorkflowSidebarElement extends UmbModalBaseElement<
	CreateWorkflowSidebarData,
	CreateWorkflowSidebarValue
> {
	@state() private _activeTab: TabType = 'source';
	@state() private _name = '';
	@state() private _sourceType = '';
	@state() private _selectedMediaUnique: string | null = null;
	@state() private _sourceUrl = '';
	private _nameManuallyEdited = false;

	#toKebabCase(value: string): string {
		return value
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}

	#handleSourceTypeChange(e: Event) {
		const target = e.target as Element & { value: string };
		const newSourceType = target.value;

		if (newSourceType !== this._sourceType) {
			this._selectedMediaUnique = null;
			this._sourceUrl = '';
		}

		this._sourceType = newSourceType;

		// Auto-generate name if not manually edited
		if (!this._nameManuallyEdited && this.data?.blueprintName && this._sourceType) {
			this._name = `${this.#toKebabCase(this.data.blueprintName)}-${this._sourceType}`;
		}

		this.requestUpdate();
	}

	#handleMediaChange(e: CustomEvent) {
		const target = e.target as UmbInputMediaElement;
		const selection = target.selection;
		this._selectedMediaUnique = selection.length > 0 ? selection[0] : null;
	}

	#handleNameInput(e: UUIInputEvent) {
		this._name = e.target.value as string;
		this._nameManuallyEdited = true;
	}

	#handleTabClick(tab: TabType) {
		this._activeTab = tab;
	}

	get #canCreate(): boolean {
		return this._name.trim().length > 0 && this._sourceType.length > 0;
	}

	#handleSave() {
		if (!this.#canCreate) return;

		this.value = {
			name: this._name.trim(),
			sourceType: this._sourceType,
			mediaUnique: this._selectedMediaUnique,
			sourceUrl: this._sourceUrl || null,
			documentTypeAlias: this.data!.documentTypeAlias,
			blueprintId: this.data!.blueprintUnique,
			blueprintName: this.data!.blueprintName,
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

	#renderSourceUI() {
		switch (this._sourceType) {
			case 'pdf':
				return html`
					<umb-property-layout label="Sample PDF" description="Choose a representative PDF to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${this.#handleMediaChange}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
			case 'markdown':
				return html`
					<umb-property-layout label="Sample Markdown File" description="Choose a representative Markdown file to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${this.#handleMediaChange}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
			case 'web':
				return html`
					<umb-property-layout label="Sample Web Page URL" description="Enter a representative URL to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<uui-input
								label="URL"
								placeholder="https://example.com/page"
								.value=${this._sourceUrl}
								@input=${(e: UUIInputEvent) => (this._sourceUrl = e.target.value as string)}>
							</uui-input>
						</div>
					</umb-property-layout>
				`;
			case 'doc':
				return html`
					<umb-property-layout label="Sample Word Document" description="Choose a representative Word document to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${this.#handleMediaChange}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
			default:
				return nothing;
		}
	}

	#renderSourceTab() {
		return html`
			<uui-box headline="Workflow Name">
				<p>A unique name for this workflow. Used as the folder name on disk.</p>
				<uui-input
					id="name"
					label="name"
					placeholder="e.g. group-tour-pdf"
					.value=${this._name}
					@input=${this.#handleNameInput}>
				</uui-input>
			</uui-box>

			<uui-box headline="Source">
				<umb-property-layout label="Source Type" orientation="vertical">
					<div slot="editor">
						<uui-select
							label="Select source type"
							.options=${[
								{ name: 'Choose a source...', value: '', selected: this._sourceType === '' },
								...SOURCE_TYPE_OPTIONS.map((st) => ({
									...st,
									selected: this._sourceType === st.value,
								})),
							]}
							@change=${this.#handleSourceTypeChange}>
						</uui-select>
					</div>
				</umb-property-layout>

				${this.#renderSourceUI()}
			</uui-box>
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

			uui-input {
				width: 100%;
			}

			uui-select {
				width: 100%;
			}

			uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}

			.tab-content {
				display: flex;
				flex-direction: column;
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
