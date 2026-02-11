import type { DestinationConfig, DestinationField, DestinationBlockGrid } from './workflow.types.js';
import type { DestinationPickerModalData, DestinationPickerModalValue } from './destination-picker-modal.token.js';
import { html, css, state, nothing, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';

@customElement('up-doc-destination-picker-modal')
export class UpDocDestinationPickerModalElement extends UmbModalBaseElement<
	DestinationPickerModalData,
	DestinationPickerModalValue
> {
	@state() private _activeTab = '';
	@state() private _selectedTargets = new Map<string, { target: string; blockKey?: string }>();

	override connectedCallback() {
		super.connectedCallback();
		const tabs = this.#getTabs();
		if (tabs.length > 0) {
			this._activeTab = tabs[0].id;
		}
	}

	get #destination(): DestinationConfig | undefined {
		return this.data?.destination;
	}

	#getTabs(): Array<{ id: string; label: string }> {
		if (!this.#destination) return [];

		const tabs: Array<{ id: string; label: string }> = [];
		const tabNames = new Set(this.#destination.fields.map((f) => f.tab).filter(Boolean));

		for (const tabName of tabNames) {
			tabs.push({
				id: tabName!.toLowerCase().replace(/\s+/g, '-'),
				label: tabName!,
			});
		}

		if (this.#destination.blockGrids?.length) {
			if (!tabNames.has('Page Content')) {
				tabs.push({ id: 'page-content', label: 'Page Content' });
			}
		}

		return tabs;
	}

	#makeKey(alias: string, blockKey?: string): string {
		return blockKey ? `${blockKey}:${alias}` : alias;
	}

	#toggleTarget(alias: string, blockKey?: string) {
		const key = this.#makeKey(alias, blockKey);
		const next = new Map(this._selectedTargets);
		if (next.has(key)) {
			next.delete(key);
		} else {
			next.set(key, { target: alias, blockKey });
		}
		this._selectedTargets = next;
	}

	#onConfirm() {
		this.value = { selectedTargets: Array.from(this._selectedTargets.values()) };
		this.modalContext?.submit();
	}

	#onCancel() {
		this.modalContext?.reject();
	}

	#renderField(field: DestinationField) {
		const checked = this._selectedTargets.has(field.alias);
		return html`
			<div class="field-item ${checked ? 'field-selected' : ''}" @click=${() => this.#toggleTarget(field.alias)}>
				<uui-checkbox
					label="Select ${field.label}"
					?checked=${checked}
					@click=${(e: Event) => e.stopPropagation()}
					@change=${() => this.#toggleTarget(field.alias)}>
				</uui-checkbox>
				<div class="field-info">
					<span class="field-label">${field.label}</span>
					<span class="field-type">${field.type}</span>
				</div>
			</div>
		`;
	}

	#renderFieldsForTab(tabName: string) {
		if (!this.#destination) return nothing;

		const fields = this.#destination.fields.filter((f) => f.tab === tabName);
		if (fields.length === 0) return html`<p class="empty-message">No fields in this tab.</p>`;

		return html`
			<div class="field-list">
				${fields.map((field) => this.#renderField(field))}
			</div>
		`;
	}

	#renderBlockGrids() {
		if (!this.#destination?.blockGrids?.length) {
			return html`<p class="empty-message">No block grids configured.</p>`;
		}

		return html`
			${this.#destination.blockGrids.map((grid) => this.#renderBlockGrid(grid))}
		`;
	}

	#renderBlockGrid(grid: DestinationBlockGrid) {
		return html`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${grid.label}</span>
				</div>
				<div class="block-list">
					${grid.blocks.map(
						(block) => html`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${block.label}</span>
								</div>
								${block.properties?.length
									? html`
										<div class="block-properties">
											${block.properties.map((prop) => {
												const compoundKey = this.#makeKey(prop.alias, block.key);
												const checked = this._selectedTargets.has(compoundKey);
												return html`
													<div class="block-property ${checked ? 'field-selected' : ''}" @click=${() => this.#toggleTarget(prop.alias, block.key)}>
														<uui-checkbox
															label="Select ${prop.label || prop.alias}"
															?checked=${checked}
															@click=${(e: Event) => e.stopPropagation()}
															@change=${() => this.#toggleTarget(prop.alias, block.key)}>
														</uui-checkbox>
														<span class="block-property-label">${prop.label || prop.alias}</span>
														<span class="field-type">${prop.type}</span>
													</div>
												`;
											})}
										</div>
									`
									: nothing}
							</div>
						`
					)}
				</div>
			</div>
		`;
	}

	#renderTabContent() {
		if (!this.#destination) return nothing;

		if (this._activeTab === 'page-content') {
			return this.#renderBlockGrids();
		}

		const tabName = this.#destination.fields.find(
			(f) => f.tab && f.tab.toLowerCase().replace(/\s+/g, '-') === this._activeTab
		)?.tab;

		if (tabName) {
			return this.#renderFieldsForTab(tabName);
		}

		return nothing;
	}

	override render() {
		const tabs = this.#getTabs();

		return html`
			<umb-body-layout headline="Pick destination field(s)">
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${tabs.map(
						(tab) => html`
							<uui-tab
								label=${tab.label}
								?active=${this._activeTab === tab.id}
								@click=${() => { this._activeTab = tab.id; }}>
								${tab.label}
							</uui-tab>
						`
					)}
				</uui-tab-group>

				<uui-box>
					${this.#renderTabContent()}
				</uui-box>

				<div slot="actions">
					<uui-button label="Cancel" @click=${this.#onCancel}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						?disabled=${this._selectedTargets.size === 0}
						@click=${this.#onConfirm}>
						Map to ${this._selectedTargets.size} field${this._selectedTargets.size !== 1 ? 's' : ''}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}

			.empty-message {
				color: var(--uui-color-text-alt);
				font-style: italic;
				padding: var(--uui-size-space-4);
			}

			.field-list {
				display: flex;
				flex-direction: column;
			}

			.field-item {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.field-item:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.field-item.field-selected {
				background: var(--uui-color-selected);
			}

			.field-item:last-child {
				border-bottom: none;
			}

			.field-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				flex: 1;
			}

			.field-label {
				font-weight: 600;
			}

			.field-type {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.block-grid {
				margin-bottom: var(--uui-size-space-3);
			}

			.block-grid-header {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-grid-label {
				font-weight: 600;
			}

			.block-list {
				display: flex;
				flex-direction: column;
			}

			.block-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				padding-left: var(--uui-size-space-6);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-item:last-child {
				border-bottom: none;
			}

			.block-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-bottom: var(--uui-size-space-2);
			}

			.block-label {
				font-weight: 600;
			}

			.block-properties {
				padding-left: var(--uui-size-space-5);
			}

			.block-property {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
				border-radius: var(--uui-border-radius);
			}

			.block-property:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.block-property.field-selected {
				background: var(--uui-color-selected);
			}

			.block-property-label {
				font-size: var(--uui-type-small-size);
			}
		`,
	];
}

export default UpDocDestinationPickerModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-destination-picker-modal': UpDocDestinationPickerModalElement;
	}
}
