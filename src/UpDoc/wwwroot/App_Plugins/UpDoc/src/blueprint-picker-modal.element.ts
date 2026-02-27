import type { DocumentTypeOption, BlueprintPickerModalData, BlueprintPickerModalValue } from './blueprint-picker-modal.token.js';
import { html, customElement, css, state, repeat, when } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';

@customElement('blueprint-picker-modal')
export class BlueprintPickerModalElement extends UmbModalBaseElement<
	BlueprintPickerModalData,
	BlueprintPickerModalValue
> {
	@state()
	private _selectedDocType: DocumentTypeOption | null = null;

	override connectedCallback() {
		super.connectedCallback();
		// Auto-select doc type if preSelectedDocTypeUnique is provided
		if (this.data?.preSelectedDocTypeUnique) {
			const preSelected = this.data.documentTypes.find(
				(dt) => dt.documentTypeUnique === this.data!.preSelectedDocTypeUnique,
			);
			if (preSelected) {
				this._selectedDocType = preSelected;
			}
		}
	}

	#handleDocTypeSelect(docType: DocumentTypeOption) {
		this._selectedDocType = docType;
	}

	#handleBlueprintSelect(blueprintUnique: string) {
		if (!this._selectedDocType) return;
		this.value = {
			blueprintUnique,
			documentTypeUnique: this._selectedDocType.documentTypeUnique,
		};
		this._submitModal();
	}

	#handleBack() {
		this._selectedDocType = null;
	}

	#handleClose() {
		this._rejectModal();
	}

	#renderNoDocumentTypes() {
		return html`
			<div class="no-blueprints">
				<uui-icon name="icon-alert"></uui-icon>
				<p>
					To create a document from a source, you first need to create a
					<strong>Document Blueprint</strong>.
				</p>
				<p class="hint">
					Use the <strong>Create Document Blueprint</strong> option from
					the document actions menu.
				</p>
			</div>
		`;
	}

	#renderDocumentTypeList() {
		const documentTypes = this.data?.documentTypes ?? [];
		return html`
			${repeat(
				documentTypes,
				(dt) => dt.documentTypeUnique,
				(dt) => html`
					<uui-menu-item
						label=${dt.documentTypeName}
						@click=${() => this.#handleDocTypeSelect(dt)}>
						<umb-icon slot="icon" name=${dt.documentTypeIcon || 'icon-document'}></umb-icon>
					</uui-menu-item>
				`,
			)}
		`;
	}

	#renderBlueprintList() {
		if (!this._selectedDocType) return html``;
		return html`
			${repeat(
				this._selectedDocType.blueprints,
				(bp) => bp.blueprintUnique,
				(bp) => html`
					<uui-menu-item
						label=${bp.blueprintName}
						@click=${() => this.#handleBlueprintSelect(bp.blueprintUnique)}>
						<umb-icon slot="icon" name="icon-blueprint"></umb-icon>
					</uui-menu-item>
				`,
			)}
		`;
	}

	override render() {
		const hasDocumentTypes = (this.data?.documentTypes?.length ?? 0) > 0;
		const showBlueprints = this._selectedDocType !== null;
		const headline = showBlueprints
			? this.localize.term('blueprints_selectBlueprint')
			: 'Choose a Document Type';

		return html`
			<uui-dialog-layout headline=${headline}>
				${when(
					!hasDocumentTypes,
					() => this.#renderNoDocumentTypes(),
					() => when(
						showBlueprints,
						() => this.#renderBlueprintList(),
						() => this.#renderDocumentTypeList(),
					),
				)}
				${when(
					showBlueprints && !this.data?.preSelectedDocTypeUnique,
					() => html`
						<uui-button
							slot="actions"
							label="Back"
							@click=${this.#handleBack}></uui-button>
					`,
				)}
				<uui-button
					slot="actions"
					id="cancel"
					label=${this.localize.term('general_cancel')}
					@click=${this.#handleClose}></uui-button>
			</uui-dialog-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			.no-blueprints {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				padding: var(--uui-size-space-5);
				gap: var(--uui-size-space-2);
			}

			.no-blueprints > uui-icon {
				font-size: var(--uui-size-8);
				color: var(--uui-color-warning);
			}

			.no-blueprints p {
				margin: 0;
			}

			.no-blueprints .hint {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

		`,
	];
}

export default BlueprintPickerModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'blueprint-picker-modal': BlueprintPickerModalElement;
	}
}
