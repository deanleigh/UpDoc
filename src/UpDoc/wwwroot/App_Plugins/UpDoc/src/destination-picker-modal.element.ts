import type { DestinationConfig, DestinationField, DestinationBlockGrid } from './workflow.types.js';
import { getAllBlockContainers } from './destination-utils.js';
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
	@state() private _selectedTargets = new Map<string, { target: string; blockKey?: string; contentTypeKey?: string }>();

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

	/** Build a Map of compound keys (blockKey:alias or alias) → source section ID for already-mapped fields */
	get #alreadyMapped(): Map<string, string> {
		const mapped = new Map<string, string>();
		for (const mapping of this.data?.existingMappings ?? []) {
			if (mapping.enabled === false) continue;
			for (const dest of mapping.destinations) {
				mapped.set(this.#makeKey(dest.target, dest.blockKey), mapping.source);
			}
		}
		return mapped;
	}

	/** Convert source key to readable label: "tour-title.content" → "Tour Title" */
	#formatSourceLabel(sourceKey: string): string {
		// Strip .content / .heading suffix — these are internal conventions, not user-facing
		const sectionId = sourceKey.replace(/\.(content|heading)$/, '');
		return sectionId
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
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

		for (const container of getAllBlockContainers(this.#destination)) {
			const containerTab = container.tab ?? 'Page Content';
			if (!tabNames.has(containerTab)) {
				tabNames.add(containerTab);
				tabs.push({
					id: containerTab.toLowerCase().replace(/\s+/g, '-'),
					label: containerTab,
				});
			}
		}

		return tabs;
	}

	#makeKey(alias: string, blockKey?: string): string {
		return blockKey ? `${blockKey}:${alias}` : alias;
	}

	#toggleTarget(alias: string, blockKey?: string, contentTypeKey?: string) {
		const key = this.#makeKey(alias, blockKey);
		const next = new Map(this._selectedTargets);
		if (next.has(key)) {
			next.delete(key);
		} else {
			next.set(key, { target: alias, blockKey, contentTypeKey });
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
		const mappedSource = this.#alreadyMapped.get(field.alias);
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
					${mappedSource ? html`<span class="field-mapped" title="Mapped from: ${this.#formatSourceLabel(mappedSource)}">${this.#formatSourceLabel(mappedSource)}</span>` : nothing}
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

	#renderBlockContainersForTab(tabId: string) {
		if (!this.#destination) return nothing;

		const containers = getAllBlockContainers(this.#destination).filter((c) => {
			const cTab = c.tab ?? 'Page Content';
			return cTab.toLowerCase().replace(/\s+/g, '-') === tabId;
		});

		if (!containers.length) {
			return html`<p class="empty-message">No blocks configured.</p>`;
		}

		return html`
			${containers.map((container) => this.#renderBlockGrid(container))}
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
												const mappedSource = this.#alreadyMapped.get(compoundKey);
												return html`
													<div class="block-property ${checked ? 'field-selected' : ''}" @click=${() => this.#toggleTarget(prop.alias, block.key, block.contentTypeKey)}>
														<uui-checkbox
															label="Select ${prop.label || prop.alias}"
															?checked=${checked}
															@click=${(e: Event) => e.stopPropagation()}
															@change=${() => this.#toggleTarget(prop.alias, block.key, block.contentTypeKey)}>
														</uui-checkbox>
														<span class="block-property-label">${prop.label || prop.alias}</span>
														${mappedSource ? html`<span class="field-mapped" title="Mapped from: ${this.#formatSourceLabel(mappedSource)}">${this.#formatSourceLabel(mappedSource)}</span>` : nothing}
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

		// Check if this tab has fields
		const tabName = this.#destination.fields.find(
			(f) => f.tab && f.tab.toLowerCase().replace(/\s+/g, '-') === this._activeTab
		)?.tab;

		// Check if this tab has block containers
		const hasContainers = getAllBlockContainers(this.#destination).some((c) => {
			const cTab = c.tab ?? 'Page Content';
			return cTab.toLowerCase().replace(/\s+/g, '-') === this._activeTab;
		});

		return html`
			${tabName ? this.#renderFieldsForTab(tabName) : nothing}
			${hasContainers ? this.#renderBlockContainersForTab(this._activeTab) : nothing}
		`;
	}

	override render() {
		const tabs = this.#getTabs();

		return html`
			<umb-body-layout headline="Pick destination field(s)">
				<div class="tab-content">
					<uui-tab-group class="content-inner-tabs" dropdown-content-direction="vertical">
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

					${this.#renderTabContent()}
				</div>

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

			.tab-content {
				display: flex;
				flex-direction: column;
			}

			/* Inner tabs — bleed edge-to-edge past body layout padding */
			.content-inner-tabs {
				margin: calc(var(--uui-size-layout-1) * -1);
				margin-bottom: var(--uui-size-space-4);
				background: var(--uui-color-surface);
				--uui-tab-background: var(--uui-color-surface);
				border-bottom: 1px solid var(--uui-color-border);
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

			.field-mapped {
				font-size: var(--uui-type-small-size);
				color: #fff;
				background: var(--uui-color-positive-standalone);
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
