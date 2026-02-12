import type { RichExtractionResult, DocumentTypeConfig, MappingDestination, ZoneDetectionResult, DetectedZone, DetectedSection, ZoneElement } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, saveMapConfig, fetchZoneDetection, triggerZoneDetection } from './workflow.service.js';
import { html, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_MEDIA_PICKER_MODAL } from '@umbraco-cms/backoffice/media';
import { UMB_DESTINATION_PICKER_MODAL } from './destination-picker-modal.token.js';

@customElement('up-doc-workflow-source-view')
export class UpDocWorkflowSourceViewElement extends UmbLitElement {
	@state() private _extraction: RichExtractionResult | null = null;
	@state() private _zoneDetection: ZoneDetectionResult | null = null;
	@state() private _config: DocumentTypeConfig | null = null;
	@state() private _workflowName: string | null = null;
	@state() private _loading = true;
	@state() private _extracting = false;
	@state() private _error: string | null = null;
	@state() private _successMessage: string | null = null;
	@state() private _selectedElements = new Set<string>();
	@state() private _collapsedSections = new Set<string>();
	#token = '';

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			this.observe((context as any).unique, (unique: string | null) => {
				if (unique) {
					this._workflowName = decodeURIComponent(unique);
					this.#loadData();
				}
			});
		});
	}

	async #loadData() {
		if (!this._workflowName) return;

		this._loading = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			this.#token = await authContext.getLatestToken();
			const [extraction, zoneDetection, config] = await Promise.all([
				fetchSampleExtraction(this._workflowName, this.#token),
				fetchZoneDetection(this._workflowName, this.#token),
				fetchWorkflowByName(this._workflowName, this.#token),
			]);
			this._extraction = extraction;
			this._zoneDetection = zoneDetection;
			this._config = config;
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load data';
			console.error('Failed to load source data:', err);
		} finally {
			this._loading = false;
		}
	}

	async #onPickMedia() {
		if (!this._workflowName) return;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_MEDIA_PICKER_MODAL, {
			data: {
				multiple: false,
			},
		});

		const result = await modal.onSubmit().catch(() => null);
		if (!result?.selection?.length) return;

		const mediaKey = result.selection[0];
		if (!mediaKey) return;

		this._extracting = true;
		this._error = null;

		try {
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			// Trigger both sample extraction and zone detection
			const [extraction, zoneDetection] = await Promise.all([
				triggerSampleExtraction(this._workflowName, mediaKey, token),
				triggerZoneDetection(this._workflowName, mediaKey, token),
			]);

			if (extraction) {
				this._extraction = extraction;
			}
			if (zoneDetection) {
				this._zoneDetection = zoneDetection;
				const totalElements = zoneDetection.diagnostics.elementsZoned + zoneDetection.diagnostics.elementsUnzoned;
				this._successMessage = `Content extracted — ${zoneDetection.diagnostics.zonesDetected} areas, ${totalElements} elements`;
				setTimeout(() => { this._successMessage = null; }, 5000);
			} else if (extraction) {
				this._successMessage = `Content extracted — ${extraction.elements.length} elements (zone detection unavailable)`;
				setTimeout(() => { this._successMessage = null; }, 5000);
			} else {
				this._error = 'Extraction failed. Check that the selected media item is a PDF.';
			}
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Extraction failed';
			console.error('Extraction failed:', err);
		} finally {
			this._extracting = false;
		}
	}

	#toggleSelection(id: string) {
		const next = new Set(this._selectedElements);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		this._selectedElements = next;
	}

	#clearSelection() {
		this._selectedElements = new Set();
	}

	#toggleSectionCollapse(sectionKey: string) {
		const next = new Set(this._collapsedSections);
		if (next.has(sectionKey)) {
			next.delete(sectionKey);
		} else {
			next.add(sectionKey);
		}
		this._collapsedSections = next;
	}

	async #onMapTo() {
		if (!this._config || this._selectedElements.size === 0) return;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_DESTINATION_PICKER_MODAL, {
			data: {
				destination: this._config.destination,
			},
		});

		const result = await modal.onSubmit().catch(() => null);
		if (!result?.selectedTargets?.length || !this._workflowName) return;

		const existingMappings = this._config.map.mappings ?? [];
		const newMappings = [...existingMappings];
		const addedCount = this._selectedElements.size;
		for (const sourceId of this._selectedElements) {
			newMappings.push({
				source: sourceId,
				destinations: result.selectedTargets.map((t: { target: string; blockKey?: string }) => ({
					target: t.target,
					...(t.blockKey ? { blockKey: t.blockKey } : {}),
				})),
				enabled: true,
			});
		}

		const updatedMap = { ...this._config.map, mappings: newMappings };
		const saved = await saveMapConfig(this._workflowName, updatedMap, this.#token);
		if (saved) {
			this._config = { ...this._config, map: updatedMap };
			this._selectedElements = new Set();
			this._successMessage = `${addedCount} mapping${addedCount !== 1 ? 's' : ''} created`;
			setTimeout(() => { this._successMessage = null; }, 3000);
		}
	}

	#renderToolbar() {
		const count = this._selectedElements.size;
		if (count === 0) return nothing;

		return html`
			<div class="selection-toolbar">
				<span class="selection-count">${count} selected</span>
				<uui-button look="primary" compact label="Map to..." @click=${this.#onMapTo}>
					<uui-icon name="icon-nodes"></uui-icon>
					Map to...
				</uui-button>
				<uui-button look="secondary" compact label="Clear" @click=${this.#clearSelection}>
					Clear
				</uui-button>
			</div>
		`;
	}

	#getMappedTargets(elementId: string): MappingDestination[] {
		if (!this._config?.map?.mappings) return [];
		const targets: MappingDestination[] = [];
		for (const mapping of this._config.map.mappings) {
			if (mapping.source === elementId && mapping.enabled) {
				for (const dest of mapping.destinations) {
					targets.push(dest);
				}
			}
		}
		return targets;
	}

	#resolveTargetLabel(dest: MappingDestination): string {
		if (!this._config?.destination) return dest.target;

		if (dest.blockKey && this._config.destination.blockGrids) {
			for (const grid of this._config.destination.blockGrids) {
				const block = grid.blocks.find((b) => b.key === dest.blockKey);
				if (block) {
					const prop = block.properties?.find((p) => p.alias === dest.target);
					return `${block.label} > ${prop?.label || dest.target}`;
				}
			}
		}

		const field = this._config.destination.fields.find((f) => f.alias === dest.target);
		if (field) return field.label;

		if (this._config.destination.blockGrids) {
			for (const grid of this._config.destination.blockGrids) {
				for (const block of grid.blocks) {
					const prop = block.properties?.find((p) => p.alias === dest.target);
					if (prop) return `${block.label} > ${prop.label || prop.alias}`;
				}
			}
		}

		return dest.target;
	}

	// --- Zone-based rendering ---

	#renderZoneElement(element: ZoneElement) {
		const checked = this._selectedElements.has(element.id);
		const mappedTargets = this.#getMappedTargets(element.id);
		const isMapped = mappedTargets.length > 0;
		return html`
			<div class="element-item ${checked ? 'element-selected' : ''} ${isMapped ? 'element-mapped' : ''}">
				<uui-checkbox
					label="Select for mapping"
					?checked=${checked}
					@change=${() => this.#toggleSelection(element.id)}
					class="element-checkbox">
				</uui-checkbox>
				<div class="element-content" @click=${() => this.#toggleSelection(element.id)}>
					<div class="element-text">${element.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${element.fontSize}pt</span>
						<span class="meta-badge font-name">${element.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${element.color};">${element.color}</span>
						${mappedTargets.map((t) => html`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${this.#resolveTargetLabel(t)}</span>`)}
					</div>
				</div>
			</div>
		`;
	}

	#renderSection(section: DetectedSection, sectionKey: string) {
		const isCollapsed = this._collapsedSections.has(sectionKey);

		if (!section.heading) {
			// Preamble section (no heading) — render children directly
			return html`
				<div class="zone-section">
					${section.children.map((el) => this.#renderZoneElement(el))}
				</div>
			`;
		}

		const heading = section.heading;
		const checked = this._selectedElements.has(heading.id);
		const mappedTargets = this.#getMappedTargets(heading.id);
		const isMapped = mappedTargets.length > 0;

		return html`
			<div class="zone-section">
				<div class="section-heading ${checked ? 'element-selected' : ''} ${isMapped ? 'element-mapped' : ''}">
					<uui-checkbox
						label="Select ${heading.text}"
						?checked=${checked}
						@change=${() => this.#toggleSelection(heading.id)}
						class="element-checkbox">
					</uui-checkbox>
					<div class="heading-content" @click=${() => this.#toggleSectionCollapse(sectionKey)}>
						<div class="heading-text">${heading.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${heading.fontSize}pt</span>
							<span class="meta-badge font-name">${heading.fontName}</span>
							${mappedTargets.map((t) => html`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${this.#resolveTargetLabel(t)}</span>`)}
						</div>
					</div>
					<button class="collapse-toggle" @click=${() => this.#toggleSectionCollapse(sectionKey)} title="${isCollapsed ? 'Expand' : 'Collapse'}">
						<uui-icon name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					</button>
					<span class="group-count">${section.children.length} item${section.children.length !== 1 ? 's' : ''}</span>
				</div>
				${!isCollapsed ? html`
					<div class="section-children">
						${section.children.map((el) => this.#renderZoneElement(el))}
					</div>
				` : nothing}
			</div>
		`;
	}

	#renderArea(zone: DetectedZone, pageNum: number, areaIndex: number) {
		const elementCount = zone.totalElements;
		return html`
			<div class="zone-area" style="border-left-color: ${zone.color};">
				<div class="area-header">
					<span class="area-color-swatch" style="background: ${zone.color};"></span>
					<span class="area-element-count">${elementCount} element${elementCount !== 1 ? 's' : ''}</span>
				</div>
				${zone.sections.map((section, sIdx) =>
					this.#renderSection(section, `p${pageNum}-a${areaIndex}-s${sIdx}`)
				)}
			</div>
		`;
	}

	#renderUnzonedContent(zone: DetectedZone, pageNum: number) {
		if (zone.totalElements === 0) return nothing;
		return html`
			<div class="zone-area unzoned" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header">
					<span class="area-color-swatch unzoned-swatch"></span>
					<span class="area-element-count">Unzoned — ${zone.totalElements} element${zone.totalElements !== 1 ? 's' : ''}</span>
				</div>
				${zone.sections.map((section, sIdx) =>
					this.#renderSection(section, `p${pageNum}-unzoned-s${sIdx}`)
				)}
			</div>
		`;
	}

	#renderZonePage(pageNum: number, zones: DetectedZone[], unzonedContent: DetectedZone | null) {
		return html`
			<uui-box headline="Page ${pageNum}" class="page-box">
				${zones.map((zone, idx) => this.#renderArea(zone, pageNum, idx))}
				${unzonedContent ? this.#renderUnzonedContent(unzonedContent, pageNum) : nothing}
			</uui-box>
		`;
	}

	#renderZoneDetection() {
		if (!this._zoneDetection) return nothing;

		return html`
			${this._zoneDetection.pages.map((page) =>
				this.#renderZonePage(page.page, page.zones, page.unzonedContent)
			)}
			<div class="diagnostics">
				<span class="meta-badge">${this._zoneDetection.diagnostics.zonesDetected} areas</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsZoned} zoned</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsUnzoned} unzoned</span>
			</div>
		`;
	}

	#renderExtraction() {
		const hasZones = this._zoneDetection !== null;
		const hasExtraction = this._extraction !== null;

		if (!hasZones && !hasExtraction) return nothing;

		// Use extraction for header info, zone detection for content
		const totalElements = hasZones
			? this._zoneDetection!.diagnostics.elementsZoned + this._zoneDetection!.diagnostics.elementsUnzoned
			: this._extraction!.elements.length;

		return html`
			<div class="extraction-header">
				${hasExtraction ? html`
					<div class="extraction-info">
						<span class="info-label">Source:</span>
						<span>${this._extraction!.source.fileName}</span>
					</div>
					<div class="extraction-info">
						<span class="info-label">Pages:</span>
						<span>${this._extraction!.source.totalPages}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Elements:</span>
						<span>${totalElements}</span>
						${hasZones ? html`
							<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
							<span>${this._zoneDetection!.diagnostics.zonesDetected}</span>
						` : nothing}
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Extracted:</span>
						<span>${new Date(this._extraction!.source.extractedDate).toLocaleString()}</span>
					</div>
				` : html`
					<div class="extraction-info">
						<span class="info-label">Elements:</span>
						<span>${totalElements}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
						<span>${this._zoneDetection!.diagnostics.zonesDetected}</span>
					</div>
				`}
				<uui-button look="secondary" label="Re-extract" @click=${this.#onPickMedia} ?disabled=${this._extracting}>
					<uui-icon name="icon-refresh"></uui-icon>
					Re-extract
				</uui-button>
			</div>

			${this.#renderToolbar()}
			${hasZones ? this.#renderZoneDetection() : nothing}
		`;
	}

	#renderEmpty() {
		return html`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${this.#onPickMedia} ?disabled=${this._extracting}>
					${this._extracting ? html`<uui-loader-bar></uui-loader-bar>` : 'Upload PDF'}
				</uui-button>
			</div>
		`;
	}

	override render() {
		if (this._loading) {
			return html`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
		}

		if (this._error) {
			return html`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
		}

		const hasContent = this._zoneDetection !== null || this._extraction !== null;

		return html`
			<umb-body-layout header-fit-height>
				${this._successMessage ? html`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : nothing}
				${hasContent ? this.#renderExtraction() : this.#renderEmpty()}
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				height: 100%;
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.success-banner {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-size: var(--uui-type-small-size);
			}

			/* Empty state */
			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: var(--uui-size-layout-2);
				gap: var(--uui-size-space-3);
				text-align: center;
				min-height: 300px;
			}

			.empty-state h3 {
				margin: 0;
				color: var(--uui-color-text);
			}

			.empty-state p {
				margin: 0;
				color: var(--uui-color-text-alt);
			}

			/* Extraction header */
			.extraction-header {
				padding: var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.extraction-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				font-size: var(--uui-type-small-size);
			}

			.info-label {
				font-weight: 600;
				color: var(--uui-color-text-alt);
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			/* Selection toolbar */
			.selection-toolbar {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-selected);
				border-bottom: 1px solid var(--uui-color-border);
				position: sticky;
				top: 0;
				z-index: 1;
			}

			.selection-count {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
			}

			/* Zone areas */
			.zone-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-3) 0;
				margin-left: var(--uui-size-space-2);
			}

			.zone-area.unzoned {
				opacity: 0.75;
			}

			.area-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.area-color-swatch {
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 2px;
				border: 1px solid var(--uui-color-border);
			}

			.area-color-swatch.unzoned-swatch {
				background: var(--uui-color-border-standalone);
			}

			.area-element-count {
				font-weight: 500;
			}

			/* Sections within areas */
			.zone-section + .zone-section {
				border-top: 1px solid var(--uui-color-border);
			}

			.section-heading {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.section-heading:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.section-heading.element-selected {
				background: var(--uui-color-selected);
			}

			.section-heading.element-mapped {
				border-left: 3px solid var(--uui-color-positive-standalone);
			}

			.heading-content {
				flex: 1;
				min-width: 0;
			}

			.heading-text {
				font-weight: 700;
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-1);
			}

			.collapse-toggle {
				background: none;
				border: none;
				cursor: pointer;
				padding: var(--uui-size-space-1);
				color: var(--uui-color-text-alt);
				display: flex;
				align-items: center;
			}

			.collapse-toggle:hover {
				color: var(--uui-color-text);
			}

			.group-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				white-space: nowrap;
			}

			.section-children {
				padding-left: var(--uui-size-space-5);
				border-left: 2px solid var(--uui-color-border);
				margin-left: var(--uui-size-space-4);
			}

			/* Element items */
			.element-item {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.element-item:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.element-item.element-selected {
				background: var(--uui-color-selected);
			}

			.element-item:last-child {
				border-bottom: none;
			}

			.element-item.element-mapped {
				border-left: 3px solid var(--uui-color-positive-standalone);
			}

			.element-checkbox {
				flex-shrink: 0;
				margin-top: 2px;
			}

			.element-content {
				flex: 1;
				min-width: 0;
			}

			.element-text {
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-2);
				word-break: break-word;
				white-space: pre-wrap;
			}

			.element-meta {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
			}

			.meta-badge {
				font-size: 11px;
				font-family: monospace;
				padding: 1px 6px;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}

			.meta-badge.font-size {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.meta-badge.mapped-target {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				display: inline-flex;
				align-items: center;
				gap: 3px;
			}

			.diagnostics {
				display: flex;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				justify-content: flex-end;
			}
		`,
	];
}

export default UpDocWorkflowSourceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-workflow-source-view': UpDocWorkflowSourceViewElement;
	}
}
