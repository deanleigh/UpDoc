import type { CreateWorkflowModalData, CreateWorkflowModalValue } from './create-workflow-modal.token.js';
import { html, customElement, css, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';

@customElement('create-workflow-modal')
export class CreateWorkflowModalElement extends UmbModalBaseElement<
	CreateWorkflowModalData,
	CreateWorkflowModalValue
> {
	@state() private _name = '';
	@state() private _documentTypeAlias = '';
	@state() private _blueprintId = '';
	@state() private _blueprintName = '';

	#toKebabCase(value: string): string {
		return value
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}

	#handleDocTypeInput(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		this._documentTypeAlias = target.value;
		// Auto-generate name from alias if name hasn't been manually edited
		if (!this._nameManuallyEdited) {
			this._name = this.#toKebabCase(target.value);
		}
	}

	private _nameManuallyEdited = false;

	#handleNameInput(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		this._name = target.value;
		this._nameManuallyEdited = true;
	}

	#handleBlueprintIdInput(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		this._blueprintId = target.value;
	}

	#handleBlueprintNameInput(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		this._blueprintName = target.value;
	}

	get #isValid(): boolean {
		return this._name.trim().length > 0 && this._documentTypeAlias.trim().length > 0;
	}

	#handleSubmit() {
		if (!this.#isValid) return;

		this.value = {
			name: this._name.trim(),
			documentTypeAlias: this._documentTypeAlias.trim(),
			blueprintId: this._blueprintId.trim() || undefined,
			blueprintName: this._blueprintName.trim() || undefined,
		};
		this._submitModal();
	}

	#handleClose() {
		this._rejectModal();
	}

	override render() {
		return html`
			<uui-dialog-layout headline="Create Workflow">
				<div class="form">
					<uui-label for="docTypeAlias" required>Document Type Alias</uui-label>
					<uui-input
						id="docTypeAlias"
						placeholder="e.g. groupTour"
						.value=${this._documentTypeAlias}
						@input=${this.#handleDocTypeInput}>
					</uui-input>

					<uui-label for="workflowName" required>Workflow Name</uui-label>
					<uui-input
						id="workflowName"
						placeholder="e.g. group-tour"
						.value=${this._name}
						@input=${this.#handleNameInput}>
					</uui-input>
					<small class="hint">Used as the folder name. Auto-generated from document type alias.</small>

					<uui-label for="blueprintId">Blueprint ID</uui-label>
					<uui-input
						id="blueprintId"
						placeholder="e.g. a6e0e5b8-a022-4534-ac7f-1929dbe9fb6c"
						.value=${this._blueprintId}
						@input=${this.#handleBlueprintIdInput}>
					</uui-input>

					<uui-label for="blueprintName">Blueprint Name</uui-label>
					<uui-input
						id="blueprintName"
						placeholder="e.g. Group Tour"
						.value=${this._blueprintName}
						@input=${this.#handleBlueprintNameInput}>
					</uui-input>
				</div>

				<uui-button
					slot="actions"
					label="Cancel"
					@click=${this.#handleClose}></uui-button>
				<uui-button
					slot="actions"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!this.#isValid}
					@click=${this.#handleSubmit}></uui-button>
			</uui-dialog-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			.form {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}

			.hint {
				color: var(--uui-color-text-alt);
				margin-top: calc(var(--uui-size-space-1) * -1);
			}

			uui-input {
				width: 100%;
			}
		`,
	];
}

export default CreateWorkflowModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'create-workflow-modal': CreateWorkflowModalElement;
	}
}
