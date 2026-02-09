import type { CreateWorkflowModalData, CreateWorkflowModalValue } from './create-workflow-modal.token.js';
import { html, customElement, css, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

interface DocumentTypeOption {
	alias: string;
	name: string;
	icon: string;
	id: string;
}

interface BlueprintOption {
	id: string;
	name: string;
}

@customElement('create-workflow-modal')
export class CreateWorkflowModalElement extends UmbModalBaseElement<
	CreateWorkflowModalData,
	CreateWorkflowModalValue
> {
	@state() private _name = '';
	@state() private _documentTypeAlias = '';
	@state() private _blueprintId = '';
	@state() private _blueprintName = '';

	@state() private _documentTypes: DocumentTypeOption[] = [];
	@state() private _blueprints: BlueprintOption[] = [];
	@state() private _loadingDocTypes = true;
	@state() private _loadingBlueprints = false;

	private _nameManuallyEdited = false;

	override async connectedCallback() {
		super.connectedCallback();
		await this.#loadDocumentTypes();
	}

	async #getToken(): Promise<string> {
		const authContext = await this.getContext(UMB_AUTH_CONTEXT);
		return await authContext.getLatestToken();
	}

	async #loadDocumentTypes() {
		this._loadingDocTypes = true;
		try {
			const token = await this.#getToken();
			const response = await fetch('/umbraco/management/api/v1/updoc/document-types', {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.ok) {
				this._documentTypes = await response.json();
			}
		} catch {
			// Leave empty — user sees "No document types found"
		}
		this._loadingDocTypes = false;
	}

	async #loadBlueprints(alias: string) {
		this._loadingBlueprints = true;
		this._blueprints = [];
		this._blueprintId = '';
		this._blueprintName = '';
		try {
			const token = await this.#getToken();
			const response = await fetch(
				`/umbraco/management/api/v1/updoc/document-types/${encodeURIComponent(alias)}/blueprints`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			if (response.ok) {
				this._blueprints = await response.json();
			}
		} catch {
			// Leave empty
		}
		this._loadingBlueprints = false;
	}

	#toKebabCase(value: string): string {
		return value
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}

	#handleDocTypeChange(e: Event) {
		const alias = (e.target as HTMLSelectElement).value;
		this._documentTypeAlias = alias;
		this._blueprintId = '';
		this._blueprintName = '';
		if (!this._nameManuallyEdited) {
			this._name = '';
		}

		if (alias) {
			this.#loadBlueprints(alias);
		} else {
			this._blueprints = [];
		}

		this.requestUpdate();
	}

	#handleBlueprintChange(e: Event) {
		const blueprintId = (e.target as HTMLSelectElement).value;
		this._blueprintId = blueprintId;

		const blueprint = this._blueprints.find((b) => b.id === blueprintId);
		this._blueprintName = blueprint?.name ?? '';

		if (!this._nameManuallyEdited && blueprint?.name) {
			this._name = this.#toKebabCase(blueprint.name);
		}

		this.requestUpdate();
	}

	#handleNameInput(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		this._name = target.value;
		this._nameManuallyEdited = true;
	}

	get #isValid(): boolean {
		return (
			this._name.trim().length > 0 &&
			this._documentTypeAlias.trim().length > 0 &&
			this._blueprintId.trim().length > 0
		);
	}

	#handleSubmit() {
		if (!this.#isValid) return;

		this.value = {
			name: this._name.trim(),
			documentTypeAlias: this._documentTypeAlias.trim(),
			blueprintId: this._blueprintId.trim(),
			blueprintName: this._blueprintName.trim() || undefined,
		};
		this._submitModal();
	}

	#handleClose() {
		this._rejectModal();
	}

	#renderDocTypeSelect() {
		if (this._loadingDocTypes) {
			return html`<uui-loader-bar></uui-loader-bar>`;
		}

		if (this._documentTypes.length === 0) {
			return html`<small class="hint" style="color: var(--uui-color-danger);">No document types found.</small>`;
		}

		return html`
			<uui-select
				label="Select document type"
				.options=${[
					{ name: 'Choose a document type...', value: '', selected: this._documentTypeAlias === '' },
					...this._documentTypes.map((dt) => ({
						name: dt.name ?? dt.alias,
						value: dt.alias,
						selected: this._documentTypeAlias === dt.alias,
					})),
				]}
				@change=${this.#handleDocTypeChange}>
			</uui-select>
		`;
	}

	#renderBlueprintSelect() {
		if (!this._documentTypeAlias) {
			return html`<uui-select label="Select blueprint" disabled
				.options=${[{ name: 'Select a document type first...', value: '', selected: true }]}>
			</uui-select>`;
		}

		if (this._loadingBlueprints) {
			return html`<uui-loader-bar></uui-loader-bar>`;
		}

		if (this._blueprints.length === 0) {
			return html`
				<uui-select label="No blueprints" disabled
					.options=${[{ name: 'No blueprints available', value: '', selected: true }]}>
				</uui-select>
				<small class="hint" style="color: var(--uui-color-warning-standalone);">
					No blueprints exist for this document type. Create a Document Blueprint first.
				</small>
			`;
		}

		return html`
			<uui-select
				label="Select blueprint"
				.options=${[
					{ name: 'Choose a blueprint...', value: '', selected: this._blueprintId === '' },
					...this._blueprints.map((bp) => ({
						name: bp.name,
						value: bp.id,
						selected: this._blueprintId === bp.id,
					})),
				]}
				@change=${this.#handleBlueprintChange}>
			</uui-select>
		`;
	}

	override render() {
		return html`
			<uui-dialog-layout headline="Create Workflow">
				<div class="form">
					<uui-label for="workflowName" required>Workflow Name</uui-label>
					<uui-input
						id="workflowName"
						placeholder="e.g. group-tour"
						.value=${this._name}
						@input=${this.#handleNameInput}>
					</uui-input>
					<small class="hint">Used as the folder name. Enter your own or leave blank to auto-generate from the blueprint.</small>

					<uui-label required>Document Type</uui-label>
					${this.#renderDocTypeSelect()}

					<uui-label required>Blueprint</uui-label>
					${this.#renderBlueprintSelect()}
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

			uui-input, uui-select {
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
