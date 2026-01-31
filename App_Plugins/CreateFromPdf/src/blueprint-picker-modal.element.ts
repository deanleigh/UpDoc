import type { BlueprintPickerModalData, BlueprintPickerModalValue } from './blueprint-picker-modal.token.js';
import { html, customElement, css } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';

@customElement('blueprint-picker-modal')
export class BlueprintPickerModalElement extends UmbModalBaseElement<
	BlueprintPickerModalData,
	BlueprintPickerModalValue
> {
	#handleBlueprintSelect(blueprintUnique: string, documentTypeUnique: string) {
		this.value = { blueprintUnique, documentTypeUnique };
		this.modalContext?.submit();
	}

	#handleClose() {
		this.modalContext?.reject();
	}

	#renderNoBlueprints() {
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

	#renderBlueprintList() {
		const blueprints = this.data?.blueprints ?? [];
		return html`
			${blueprints.map(
				(bp) => html`
					<uui-menu-item
						label=${bp.blueprintName}
						@click=${() => this.#handleBlueprintSelect(bp.blueprintUnique, bp.documentTypeUnique)}>
						<umb-icon slot="icon" name="icon-blueprint"></umb-icon>
						<span class="doc-type-hint">${bp.documentTypeName}</span>
					</uui-menu-item>
				`,
			)}
		`;
	}

	override render() {
		const hasBlueprints = (this.data?.blueprints?.length ?? 0) > 0;

		return html`
			<umb-body-layout headline="Choose a Blueprint">
				${hasBlueprints ? this.#renderBlueprintList() : this.#renderNoBlueprints()}
				<uui-button
					slot="actions"
					label="Close"
					@click=${this.#handleClose}>
					Close
				</uui-button>
			</umb-body-layout>
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

			.doc-type-hint {
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
