import type { RichExtractionResult, DocumentTypeConfig, MappingDestination, ZoneDetectionResult, DetectedZone, DetectedSection, ZoneElement, TransformResult, TransformedSection } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, fetchZoneDetection, triggerTransform, fetchTransformResult, updateSectionInclusion } from './workflow.service.js';
import { markdownToHtml, normalizeToKebabCase } from './transforms.js';
import { html, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';
import { UMB_MEDIA_PICKER_MODAL } from '@umbraco-cms/backoffice/media';

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
	@state() private _collapsedSections = new Set<string>();
	@state() private _transformResult: TransformResult | null = null;
	@state() private _viewMode: 'elements' | 'transformed' = 'elements';
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
			const [extraction, zoneDetection, config, transformResult] = await Promise.all([
				fetchSampleExtraction(this._workflowName, this.#token),
				fetchZoneDetection(this._workflowName, this.#token),
				fetchWorkflowByName(this._workflowName, this.#token),
				fetchTransformResult(this._workflowName, this.#token),
			]);
			this._extraction = extraction;
			this._zoneDetection = zoneDetection;
			this._config = config;
			this._transformResult = transformResult;
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

			// Trigger sample extraction and transform (which includes zone detection) in parallel
			const [extraction, transformResult] = await Promise.all([
				triggerSampleExtraction(this._workflowName, mediaKey, token),
				triggerTransform(this._workflowName, mediaKey, token),
			]);

			if (extraction) {
				this._extraction = extraction;
			}
			if (transformResult) {
				this._transformResult = transformResult;
				// Transform endpoint also saved zone detection — fetch it
				const zoneDetection = await fetchZoneDetection(this._workflowName, token);
				this._zoneDetection = zoneDetection;
				const d = transformResult.diagnostics;
				this._successMessage = `Content extracted — ${d.totalSections} sections (${d.bulletListSections} bullet, ${d.paragraphSections} paragraph, ${d.subHeadedSections} sub-headed)`;
				setTimeout(() => { this._successMessage = null; }, 5000);
			} else if (extraction) {
				this._successMessage = `Content extracted — ${extraction.elements.length} elements (transform unavailable)`;
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

	#toggleSectionCollapse(sectionKey: string) {
		const next = new Set(this._collapsedSections);
		if (next.has(sectionKey)) {
			next.delete(sectionKey);
		} else {
			next.add(sectionKey);
		}
		this._collapsedSections = next;
	}

	#getAreaSectionKeys(pageNum: number, areaPrefix: string, sectionCount: number): string[] {
		const keys: string[] = [];
		for (let sIdx = 0; sIdx < sectionCount; sIdx++) {
			keys.push(`p${pageNum}-${areaPrefix}-s${sIdx}`);
		}
		return keys;
	}

	#isAreaAllCollapsed(keys: string[]): boolean {
		return keys.length > 0 && keys.every((k) => this._collapsedSections.has(k));
	}

	#toggleAreaCollapse(keys: string[]) {
		const next = new Set(this._collapsedSections);
		const allCollapsed = keys.every((k) => next.has(k));
		if (allCollapsed) {
			for (const k of keys) next.delete(k);
		} else {
			for (const k of keys) next.add(k);
		}
		this._collapsedSections = next;
	}

	#isSectionIncluded(sectionId: string): boolean {
		if (!this._transformResult) return true;
		const section = this._transformResult.sections.find((s) => s.id === sectionId);
		return section?.included ?? true;
	}

	async #onToggleInclusion(sectionId: string, included: boolean) {
		if (!this._workflowName) return;
		const result = await updateSectionInclusion(this._workflowName, sectionId, included, this.#token);
		if (result) {
			this._transformResult = result;
		}
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
		return html`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${element.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${element.fontSize}pt</span>
						<span class="meta-badge font-name">${element.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${element.color};">${element.color}</span>
					</div>
				</div>
			</div>
		`;
	}

	#renderSection(section: DetectedSection, sectionKey: string, pageNum: number, zoneIndex: number) {
		const isCollapsed = this._collapsedSections.has(sectionKey);

		// Compute the section ID matching transform.json
		const sectionId = section.heading
			? normalizeToKebabCase(section.heading.text)
			: (zoneIndex >= 0 ? `preamble-p${pageNum}-z${zoneIndex}` : `preamble-p${pageNum}-unzoned`);
		const isIncluded = this.#isSectionIncluded(sectionId);

		if (!section.heading) {
			// Preamble section (no heading) — render with toggle
			return html`
				<div class="zone-section ${!isIncluded ? 'excluded' : ''}">
					<div class="section-heading preamble">
						<uui-toggle
							label="${isIncluded ? 'Included' : 'Excluded'}"
							?checked=${isIncluded}
							@change=${(e: Event) => this.#onToggleInclusion(sectionId, (e.target as any).checked)}>
						</uui-toggle>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="group-count">${section.children.length} item${section.children.length !== 1 ? 's' : ''}</span>
					</div>
					${isIncluded ? html`
						${section.children.map((el) => this.#renderZoneElement(el))}
					` : nothing}
				</div>
			`;
		}

		const heading = section.heading;

		return html`
			<div class="zone-section ${!isIncluded ? 'excluded' : ''}">
				<div class="section-heading">
					<uui-toggle
						label="${isIncluded ? 'Included' : 'Excluded'}"
						?checked=${isIncluded}
						@change=${(e: Event) => this.#onToggleInclusion(sectionId, (e.target as any).checked)}>
					</uui-toggle>
					<div class="heading-content" @click=${() => this.#toggleSectionCollapse(sectionKey)}>
						<div class="heading-text">${heading.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${heading.fontSize}pt</span>
							<span class="meta-badge font-name">${heading.fontName}</span>
						</div>
					</div>
					<button class="collapse-toggle" @click=${() => this.#toggleSectionCollapse(sectionKey)} title="${isCollapsed ? 'Expand' : 'Collapse'}">
						<uui-icon name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					</button>
					<span class="group-count">${section.children.length} item${section.children.length !== 1 ? 's' : ''}</span>
				</div>
				${!isCollapsed && isIncluded ? html`
					<div class="section-children">
						${section.children.map((el) => this.#renderZoneElement(el))}
					</div>
				` : nothing}
			</div>
		`;
	}

	#renderArea(zone: DetectedZone, pageNum: number, areaIndex: number) {
		const elementCount = zone.totalElements;
		const areaKeys = this.#getAreaSectionKeys(pageNum, `a${areaIndex}`, zone.sections.length);
		const allCollapsed = this.#isAreaAllCollapsed(areaKeys);
		return html`
			<div class="zone-area" style="border-left-color: ${zone.color};">
				<div class="area-header">
					<span class="area-color-swatch" style="background: ${zone.color};"></span>
					<span class="area-element-count">${elementCount} element${elementCount !== 1 ? 's' : ''}</span>
					${zone.sections.length > 1 ? html`
						<button class="area-collapse-toggle" @click=${() => this.#toggleAreaCollapse(areaKeys)}
							title="${allCollapsed ? 'Expand all sections' : 'Collapse all sections'}">
							<uui-icon name="${allCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
							${allCollapsed ? 'Expand' : 'Collapse'}
						</button>
					` : nothing}
				</div>
				${zone.sections.map((section, sIdx) =>
					this.#renderSection(section, `p${pageNum}-a${areaIndex}-s${sIdx}`, pageNum, areaIndex)
				)}
			</div>
		`;
	}

	#renderUnzonedContent(zone: DetectedZone, pageNum: number) {
		if (zone.totalElements === 0) return nothing;
		const areaKeys = this.#getAreaSectionKeys(pageNum, 'unzoned', zone.sections.length);
		const allCollapsed = this.#isAreaAllCollapsed(areaKeys);
		return html`
			<div class="zone-area unzoned" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header">
					<span class="area-color-swatch unzoned-swatch"></span>
					<span class="area-element-count">Unzoned — ${zone.totalElements} element${zone.totalElements !== 1 ? 's' : ''}</span>
					${zone.sections.length > 1 ? html`
						<button class="area-collapse-toggle" @click=${() => this.#toggleAreaCollapse(areaKeys)}
							title="${allCollapsed ? 'Expand all sections' : 'Collapse all sections'}">
							<uui-icon name="${allCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
							${allCollapsed ? 'Expand' : 'Collapse'}
						</button>
					` : nothing}
				</div>
				${zone.sections.map((section, sIdx) =>
					this.#renderSection(section, `p${pageNum}-unzoned-s${sIdx}`, pageNum, -1)
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

			<div class="view-tabs">
				<uui-tab-group>
					<uui-tab label="Extracted" ?active=${this._viewMode === 'elements'} @click=${() => { this._viewMode = 'elements'; }}>Extracted</uui-tab>
					<uui-tab label="Transformed" ?active=${this._viewMode === 'transformed'} @click=${() => { this._viewMode = 'transformed'; }} ?disabled=${!this._transformResult}>Transformed</uui-tab>
				</uui-tab-group>
			</div>

			${this._viewMode === 'elements'
				? (hasZones ? this.#renderZoneDetection() : nothing)
				: this.#renderTransformed()}
		`;
	}

	#renderTransformedSection(section: TransformedSection) {
		const patternLabels: Record<string, string> = {
			bulletList: 'Bullet List',
			paragraph: 'Paragraph',
			subHeaded: 'Sub-Headed',
			preamble: 'Preamble',
			mixed: 'Mixed',
		};

		const headline = section.heading ?? 'Preamble';
		return html`
			<uui-box headline=${headline} class="transformed-section">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${section.pattern}">${patternLabels[section.pattern] ?? section.pattern}</span>
					<span class="meta-badge">p${section.page}</span>
					${section.zoneColor ? html`<span class="area-color-swatch" style="background: ${section.zoneColor};"></span>` : nothing}
					<span class="meta-badge">${section.childCount} item${section.childCount !== 1 ? 's' : ''}</span>
				</div>
				<div class="transformed-content" .innerHTML=${markdownToHtml(section.content)}></div>
			</uui-box>
		`;
	}

	#renderTransformed() {
		if (!this._transformResult) {
			return html`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Re-extract content to generate the transformed view.</p>
				</div>
			`;
		}

		const includedSections = this._transformResult.sections.filter((s) => s.included);
		const totalSections = this._transformResult.sections.length;

		return html`
			${includedSections.map((section) => this.#renderTransformedSection(section))}
			<div class="diagnostics">
				<span class="meta-badge">${includedSections.length}/${totalSections} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0
					? html`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>`
					: nothing}
			</div>
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

			.area-collapse-toggle {
				margin-left: auto;
				background: none;
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				cursor: pointer;
				padding: 2px 8px;
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
			}

			.area-collapse-toggle:hover {
				color: var(--uui-color-text);
				background: var(--uui-color-surface-emphasis);
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

			/* Excluded sections */
			.zone-section.excluded {
				opacity: 0.4;
			}

			.preamble-label {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Element items */
			.element-item {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.element-item:last-child {
				border-bottom: none;
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

			/* View mode tabs */
			.view-tabs {
				padding: 0 var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			/* Transformed sections */
			.transformed-section {
				margin: var(--uui-size-space-4);
			}

			.transformed-header-badges {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.pattern-badge {
				font-size: 11px;
				padding: 1px 8px;
				border-radius: 10px;
				font-weight: 500;
			}

			.pattern-badge.bulletList {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
			}

			.pattern-badge.paragraph {
				background: var(--uui-color-warning-emphasis);
				color: var(--uui-color-warning-contrast);
			}

			.pattern-badge.subHeaded {
				background: var(--uui-color-default-emphasis);
				color: var(--uui-color-default-contrast);
			}

			.pattern-badge.preamble {
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
				border: 1px solid var(--uui-color-border);
			}

			.transformed-content {
				padding: var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				line-height: 1.6;
			}

			.transformed-content ul,
			.transformed-content ol {
				padding-left: var(--uui-size-space-5);
				margin: var(--uui-size-space-2) 0;
			}

			.transformed-content p {
				margin: var(--uui-size-space-2) 0;
			}

			.transformed-content h2 {
				font-size: var(--uui-type-default-size);
				margin: var(--uui-size-space-3) 0 var(--uui-size-space-2);
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
