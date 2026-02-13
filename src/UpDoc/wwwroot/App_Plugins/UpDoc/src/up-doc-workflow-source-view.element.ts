import type { RichExtractionResult, DocumentTypeConfig, MappingDestination, ZoneDetectionResult, DetectedZone, DetectedSection, ZoneElement, TransformResult, TransformedSection, SourceConfig } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, fetchZoneDetection, triggerTransform, fetchTransformResult, updateSectionInclusion, saveMapConfig, savePageSelection, fetchSourceConfig } from './workflow.service.js';
import { markdownToHtml, normalizeToKebabCase } from './transforms.js';
import { UMB_DESTINATION_PICKER_MODAL } from './destination-picker-modal.token.js';
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
	@state() private _collapsed = new Set<string>();
	@state() private _transformResult: TransformResult | null = null;
	@state() private _viewMode: 'elements' | 'transformed' = 'elements';
	@state() private _sourceConfig: SourceConfig | null = null;
	@state() private _pageMode: 'all' | 'custom' = 'all';
	@state() private _pageInputValue = '';
	@state() private _allCollapsed = false;
	@state() private _excludedAreas = new Set<string>();
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
			const [extraction, zoneDetection, config, transformResult, sourceConfig] = await Promise.all([
				fetchSampleExtraction(this._workflowName, this.#token),
				fetchZoneDetection(this._workflowName, this.#token),
				fetchWorkflowByName(this._workflowName, this.#token),
				fetchTransformResult(this._workflowName, this.#token),
				fetchSourceConfig(this._workflowName, this.#token),
			]);
			this._extraction = extraction;
			this._zoneDetection = zoneDetection;
			this._config = config;
			this._transformResult = transformResult;
			this._sourceConfig = sourceConfig;

			// Initialize page selection state from source config
			if (sourceConfig?.pages && Array.isArray(sourceConfig.pages) && sourceConfig.pages.length > 0) {
				this._pageMode = 'custom';
				this._pageInputValue = this.#pagesToRangeString(sourceConfig.pages);
			} else {
				this._pageMode = 'all';
				this._pageInputValue = '';
			}
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load data';
			console.error('Failed to load source data:', err);
		} finally {
			this._loading = false;
		}
	}

	/** Convert "1-3, 5, 7-9" → [1, 2, 3, 5, 7, 8, 9] */
	#parsePageRange(input: string): number[] {
		const pages = new Set<number>();
		for (const part of input.split(',')) {
			const trimmed = part.trim();
			if (!trimmed) continue;
			const rangeParts = trimmed.split('-').map((s) => parseInt(s.trim(), 10));
			if (rangeParts.length === 1 && !isNaN(rangeParts[0])) {
				pages.add(rangeParts[0]);
			} else if (rangeParts.length === 2 && !isNaN(rangeParts[0]) && !isNaN(rangeParts[1])) {
				for (let i = rangeParts[0]; i <= rangeParts[1]; i++) {
					pages.add(i);
				}
			}
		}
		return [...pages].sort((a, b) => a - b);
	}

	/** Convert [1, 2, 3, 5, 7, 8, 9] → "1-3, 5, 7-9" */
	#pagesToRangeString(pages: number[]): string {
		if (!pages.length) return '';
		const sorted = [...pages].sort((a, b) => a - b);
		const ranges: string[] = [];
		let start = sorted[0];
		let end = sorted[0];
		for (let i = 1; i < sorted.length; i++) {
			if (sorted[i] === end + 1) {
				end = sorted[i];
			} else {
				ranges.push(start === end ? `${start}` : `${start}-${end}`);
				start = sorted[i];
				end = sorted[i];
			}
		}
		ranges.push(start === end ? `${start}` : `${start}-${end}`);
		return ranges.join(', ');
	}

	/** Get the currently selected page numbers, or null for "all". */
	#getSelectedPages(): number[] | null {
		if (this._pageMode === 'all') return null;
		const pages = this.#parsePageRange(this._pageInputValue);
		return pages.length > 0 ? pages : null;
	}

	/** Check whether a specific page number is included in the current selection. */
	#isPageIncluded(pageNum: number): boolean {
		if (this._pageMode === 'all') return true;
		const pages = this.#parsePageRange(this._pageInputValue);
		return pages.length === 0 || pages.includes(pageNum);
	}

	/** Toggle a page on/off and update the text input. */
	#togglePage(pageNum: number) {
		const totalPages = this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
		if (totalPages === 0) return;

		if (this._pageMode === 'all') {
			// Switching from "all" to "custom" by toggling one page off
			const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
			const remaining = allPages.filter((p) => p !== pageNum);
			this._pageMode = 'custom';
			this._pageInputValue = this.#pagesToRangeString(remaining);
		} else {
			const current = this.#parsePageRange(this._pageInputValue);
			if (current.includes(pageNum)) {
				const remaining = current.filter((p) => p !== pageNum);
				this._pageInputValue = this.#pagesToRangeString(remaining);
				// If all removed, switch back to "all" mode
				if (remaining.length === 0) {
					this._pageMode = 'all';
					this._pageInputValue = '';
				}
			} else {
				const updated = [...current, pageNum].sort((a, b) => a - b);
				this._pageInputValue = this.#pagesToRangeString(updated);
			}
			// If all pages are now selected, switch back to "all"
			if (this.#parsePageRange(this._pageInputValue).length === totalPages) {
				this._pageMode = 'all';
				this._pageInputValue = '';
			}
		}
		this.#savePageSelection();
	}

	async #onPageModeChange(mode: 'all' | 'custom') {
		this._pageMode = mode;
		if (mode === 'all') {
			this._pageInputValue = '';
		}
		await this.#savePageSelection();
	}

	async #onPageInputChange(e: Event) {
		const input = e.target as HTMLInputElement;
		this._pageInputValue = input.value;
	}

	async #onPageInputBlur() {
		// Normalize the input and save
		const pages = this.#parsePageRange(this._pageInputValue);
		if (pages.length > 0) {
			this._pageInputValue = this.#pagesToRangeString(pages);
			this._pageMode = 'custom';
		} else {
			this._pageMode = 'all';
			this._pageInputValue = '';
		}
		await this.#savePageSelection();
	}

	async #savePageSelection() {
		if (!this._workflowName) return;
		const pages = this.#getSelectedPages();
		await savePageSelection(this._workflowName, pages, this.#token);
	}

	#toggleCollapseAll() {
		if (!this._zoneDetection) return;
		this._allCollapsed = !this._allCollapsed;
		const next = new Set<string>();
		if (this._allCollapsed) {
			for (const page of this._zoneDetection.pages) {
				next.add(`page-${page.page}`);
			}
		}
		this._collapsed = next;
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

		await this.#runExtraction(mediaKey);
	}

	/** Re-extract using the previously stored media key (after page selection change). */
	async #onReExtract() {
		const mediaKey = this._extraction?.source.mediaKey;
		if (!mediaKey) {
			// No prior extraction — fall back to media picker
			return this.#onPickMedia();
		}
		await this.#runExtraction(mediaKey);
	}

	async #runExtraction(mediaKey: string) {
		if (!this._workflowName) return;

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

	#isCollapsed(key: string): boolean {
		return this._collapsed.has(key);
	}

	#toggleCollapse(key: string) {
		const next = new Set(this._collapsed);
		if (next.has(key)) {
			next.delete(key);
		} else {
			next.add(key);
		}
		this._collapsed = next;
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

	async #onMapSection(sourceKey: string) {
		if (!this._config?.destination || !this._workflowName) return;
		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_DESTINATION_PICKER_MODAL, {
			data: { destination: this._config.destination },
		});
		const result = await modal.onSubmit().catch(() => null);
		if (!result?.selectedTargets?.length) return;

		const mappings = [...(this._config.map?.mappings ?? [])];
		const existingIdx = mappings.findIndex((m) => m.source === sourceKey);
		const newMapping = {
			source: sourceKey,
			destinations: result.selectedTargets.map((t: { target: string; blockKey?: string }) => ({ target: t.target, blockKey: t.blockKey })),
			enabled: true,
		};
		if (existingIdx >= 0) mappings[existingIdx] = newMapping;
		else mappings.push(newMapping);

		const updatedMap = { ...this._config.map, version: this._config.map?.version ?? '1.0', mappings };
		const saved = await saveMapConfig(this._workflowName, updatedMap, this.#token);
		if (saved) this._config = { ...this._config, map: updatedMap };
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

	#classifyText(text: string): 'list' | 'paragraph' {
		const trimmed = text.trimStart();
		if (/^[•\-\*▪▸▶►●○◦‣⁃]/.test(trimmed)) return 'list';
		if (/^\d+[\.\)]\s/.test(trimmed)) return 'list';
		return 'paragraph';
	}

	#renderZoneElement(element: ZoneElement) {
		const textType = this.#classifyText(element.text);
		return html`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${element.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${textType}">${textType === 'list' ? 'List' : 'Paragraph'}</span>
						<span class="meta-badge font-size">${element.fontSize}pt</span>
						<span class="meta-badge font-name">${element.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${element.color};">${element.color}</span>
					</div>
				</div>
			</div>
		`;
	}

	#renderSection(section: DetectedSection, sectionKey: string, pageNum: number, zoneIndex: number) {
		const isCollapsed = this.#isCollapsed(sectionKey);

		// Compute the section ID matching transform.json
		const sectionId = section.heading
			? normalizeToKebabCase(section.heading.text)
			: (zoneIndex >= 0 ? `preamble-p${pageNum}-z${zoneIndex}` : `preamble-p${pageNum}-unzoned`);
		const isIncluded = this.#isSectionIncluded(sectionId);

		if (!section.heading) {
			// Preamble section (no heading) — render with toggle
			return html`
				<div class="zone-section ${!isIncluded ? 'excluded' : ''}">
					<div class="section-heading preamble" @click=${() => this.#toggleCollapse(sectionKey)}>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="header-spacer"></span>
						<span class="group-count">${section.children.length} text${section.children.length !== 1 ? 's' : ''}</span>
						<uui-toggle
							label="${isIncluded ? 'Included' : 'Excluded'}"
							?checked=${isIncluded}
							@click=${(e: Event) => e.stopPropagation()}
							@change=${(e: Event) => this.#onToggleInclusion(sectionId, (e.target as any).checked)}>
						</uui-toggle>
						<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					</div>
					${isIncluded && !isCollapsed ? html`
						${section.children.map((el) => this.#renderZoneElement(el))}
					` : nothing}
				</div>
			`;
		}

		const heading = section.heading;

		return html`
			<div class="zone-section ${!isIncluded ? 'excluded' : ''}">
				<div class="section-heading" @click=${() => this.#toggleCollapse(sectionKey)}>
					<div class="heading-content">
						<div class="heading-text">${heading.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${heading.fontSize}pt</span>
							<span class="meta-badge font-name">${heading.fontName}</span>
						</div>
					</div>
					<span class="group-count">${section.children.length} text${section.children.length !== 1 ? 's' : ''}</span>
					<uui-toggle
						label="${isIncluded ? 'Included' : 'Excluded'}"
						?checked=${isIncluded}
						@click=${(e: Event) => e.stopPropagation()}
						@change=${(e: Event) => this.#onToggleInclusion(sectionId, (e.target as any).checked)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
				</div>
				${!isCollapsed && isIncluded ? html`
					<div class="section-children">
						${section.children.map((el) => this.#renderZoneElement(el))}
					</div>
				` : nothing}
			</div>
		`;
	}

	#toggleAreaExclusion(areaKey: string) {
		const next = new Set(this._excludedAreas);
		if (next.has(areaKey)) {
			next.delete(areaKey);
		} else {
			next.add(areaKey);
		}
		this._excludedAreas = next;
	}

	#renderArea(zone: DetectedZone, pageNum: number, areaIndex: number) {
		const areaKey = `area-p${pageNum}-a${areaIndex}`;
		const isCollapsed = this.#isCollapsed(areaKey);
		const isIncluded = !this._excludedAreas.has(areaKey);
		const sectionCount = zone.sections.length;
		return html`
			<div class="zone-area ${!isIncluded ? 'area-excluded' : ''}" style="border-left-color: ${zone.color};">
				<div class="area-header" @click=${() => this.#toggleCollapse(areaKey)}>
					<span class="area-name">Area ${areaIndex + 1}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${sectionCount} section${sectionCount !== 1 ? 's' : ''}</span>
					<uui-toggle
						label="${isIncluded ? 'Included' : 'Excluded'}"
						?checked=${isIncluded}
						@click=${(e: Event) => e.stopPropagation()}
						@change=${() => this.#toggleAreaExclusion(areaKey)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
				</div>
				${!isCollapsed ? html`
					${zone.sections.map((section, sIdx) =>
						this.#renderSection(section, `p${pageNum}-a${areaIndex}-s${sIdx}`, pageNum, areaIndex)
					)}
				` : nothing}
			</div>
		`;
	}

	#renderUnzonedContent(zone: DetectedZone, pageNum: number) {
		if (zone.totalElements === 0) return nothing;
		const areaKey = `area-p${pageNum}-undefined`;
		const isCollapsed = this.#isCollapsed(areaKey);
		const isIncluded = !this._excludedAreas.has(areaKey);
		const sectionCount = zone.sections.length;
		return html`
			<div class="zone-area undefined ${!isIncluded ? 'area-excluded' : ''}" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => this.#toggleCollapse(areaKey)}>
					<span class="area-name undefined-name">Undefined</span>
					<span class="header-spacer"></span>
					<span class="group-count">${sectionCount} section${sectionCount !== 1 ? 's' : ''}</span>
					<uui-toggle
						label="${isIncluded ? 'Included' : 'Excluded'}"
						?checked=${isIncluded}
						@click=${(e: Event) => e.stopPropagation()}
						@change=${() => this.#toggleAreaExclusion(areaKey)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
				</div>
				${!isCollapsed ? html`
					${zone.sections.map((section, sIdx) =>
						this.#renderSection(section, `p${pageNum}-undefined-s${sIdx}`, pageNum, -1)
					)}
				` : nothing}
			</div>
		`;
	}

	#renderZonePage(pageNum: number, zones: DetectedZone[], unzonedContent: DetectedZone | null) {
		const pageKey = `page-${pageNum}`;
		const isCollapsed = this.#isCollapsed(pageKey);
		const hasUnzoned = unzonedContent && unzonedContent.totalElements > 0;
		const areaCount = zones.length + (hasUnzoned ? 1 : 0);
		const sectionCount = zones.reduce((sum, z) => sum + z.sections.length, 0) + (unzonedContent?.sections.length ?? 0);
		const isIncluded = this.#isPageIncluded(pageNum);
		return html`
			<uui-box headline="Page ${pageNum}" class="page-box ${!isIncluded ? 'page-excluded' : ''}">
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${sectionCount} section${sectionCount !== 1 ? 's' : ''}, ${areaCount} area${areaCount !== 1 ? 's' : ''}</span>
					<uui-toggle
						label="${isIncluded ? 'Included in extraction' : 'Excluded from extraction'}"
						?checked=${isIncluded}
						@click=${(e: Event) => e.stopPropagation()}
						@change=${() => this.#togglePage(pageNum)}>
					</uui-toggle>
					<div class="collapse-trigger" @click=${() => this.#toggleCollapse(pageKey)}>
						<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					</div>
				</div>
				${!isCollapsed ? html`
					${zones.map((zone, idx) => this.#renderArea(zone, pageNum, idx))}
					${hasUnzoned ? this.#renderUnzonedContent(unzonedContent!, pageNum) : nothing}
				` : nothing}
			</uui-box>
		`;
	}

	#renderZoneDetection() {
		if (!this._zoneDetection) return nothing;

		return html`
			${this._zoneDetection.pages.map((page) =>
				this.#renderZonePage(page.page, page.zones, page.unzonedContent)
			)}
		`;
	}

	#computeSectionCount(): number {
		if (!this._zoneDetection) return 0;
		return this._zoneDetection.pages.reduce((sum, page) =>
			sum + page.zones.reduce((zSum, zone) => zSum + zone.sections.length, 0)
			+ (page.unzonedContent?.sections.length ?? 0), 0);
	}

	#renderPageSelection() {
		const totalPages = this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
		if (totalPages === 0) return nothing;

		return html`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === 'all'}
					@change=${() => this.#onPageModeChange('all')} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === 'custom'}
					@change=${() => this.#onPageModeChange('custom')} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${this.#onPageInputChange}
				@blur=${this.#onPageInputBlur}
				@focus=${() => { if (this._pageMode === 'all') this.#onPageModeChange('custom'); }}
				?disabled=${this._pageMode === 'all'} />
		`;
	}

	#renderExtractionHeader() {
		return html`
			<div slot="header" class="source-header">
				<uui-tab-group dropdown-content-direction="vertical">
					<uui-tab label="Extracted" ?active=${this._viewMode === 'elements'} @click=${() => { this._viewMode = 'elements'; }}>Extracted</uui-tab>
					<uui-tab label="Transformed" ?active=${this._viewMode === 'transformed'} @click=${() => { this._viewMode = 'transformed'; }} ?disabled=${!this._transformResult}>Transformed</uui-tab>
				</uui-tab-group>
			</div>
		`;
	}

	#renderInfoBoxes() {
		const hasZones = this._zoneDetection !== null;
		const hasExtraction = this._extraction !== null;

		if (!hasZones && !hasExtraction) return nothing;

		const totalPages = this._zoneDetection?.totalPages ?? (hasExtraction ? this._extraction!.source.totalPages : 0);
		const extractedPageCount = hasZones ? this._zoneDetection!.pages.length : totalPages;
		const isFiltered = extractedPageCount < totalPages;
		const pagesLabel = isFiltered ? `${extractedPageCount} of ${totalPages}` : `${totalPages}`;
		const areas = hasZones ? this._zoneDetection!.diagnostics.zonesDetected : 0;
		const sections = hasZones ? this.#computeSectionCount() : 0;
		const fileName = hasExtraction ? this._extraction!.source.fileName : '';
		const extractedDate = hasExtraction
			? new Date(this._extraction!.source.extractedDate).toLocaleString()
			: '';

		return html`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${fileName}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${extractedDate}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="positive" label="Re-extract" @click=${this.#onReExtract} ?disabled=${this._extracting}>
								<uui-icon name="icon-refresh"></uui-icon>
								Re-extract
							</uui-button>
							<uui-button look="primary" color="default" label="Change PDF" @click=${this.#onPickMedia} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${pagesLabel}</span>
						<div class="page-selection">
							${this.#renderPageSelection()}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${areas}</span>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${sections}</span>
					</div>
				</uui-box>
			</div>

			${hasZones ? html`
				<div class="collapse-row">
					<uui-button look="outline" compact label="${this._allCollapsed ? 'Expand All' : 'Collapse All'}" @click=${this.#toggleCollapseAll}>
						<uui-icon name="${this._allCollapsed ? 'icon-navigation-down' : 'icon-navigation-right'}"></uui-icon>
						${this._allCollapsed ? 'Expand All' : 'Collapse All'}
					</uui-button>
				</div>
			` : nothing}
		`;
	}

	#renderExtractionContent() {
		const hasZones = this._zoneDetection !== null;
		return this._viewMode === 'elements'
			? (hasZones ? this.#renderZoneDetection() : nothing)
			: this.#renderTransformed();
	}

	#renderMappingBadges(sourceKey: string) {
		const targets = this.#getMappedTargets(sourceKey);
		if (targets.length === 0) {
			return html`<uui-button look="secondary" compact label="Map" @click=${() => this.#onMapSection(sourceKey)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>`;
		}
		return html`${targets.map(
			(dest) => html`<span class="meta-badge mapped-target" @click=${() => this.#onMapSection(sourceKey)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${this.#resolveTargetLabel(dest)}
			</span>`,
		)}`;
	}

	#renderTransformedSection(section: TransformedSection) {
		const patternLabels: Record<string, string> = {
			bulletList: 'Bullet List',
			paragraph: 'Paragraph',
			subHeaded: 'Sub-Headed',
			preamble: 'Preamble',
			mixed: 'Mixed',
		};

		const headingKey = `${section.id}.heading`;
		const contentKey = `${section.id}.content`;
		const hasHeadingMapping = this.#getMappedTargets(headingKey).length > 0;
		const hasContentMapping = this.#getMappedTargets(contentKey).length > 0;
		const isMapped = hasHeadingMapping || hasContentMapping;

		const headline = section.heading ?? 'Preamble';
		return html`
			<uui-box headline=${headline} class="transformed-section ${isMapped ? 'section-mapped' : ''}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${section.pattern}">${patternLabels[section.pattern] ?? section.pattern}</span>
					<span class="meta-badge">p${section.page}</span>
					${section.zoneColor ? html`<span class="area-color-swatch" style="background: ${section.zoneColor};"></span>` : nothing}
					<span class="meta-badge">${section.childCount} item${section.childCount !== 1 ? 's' : ''}</span>
					${section.heading ? this.#renderMappingBadges(headingKey) : nothing}
				</div>
				<div class="transformed-content" .innerHTML=${markdownToHtml(section.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${this.#renderMappingBadges(contentKey)}
				</div>
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
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${this.#onPickMedia} ?disabled=${this._extracting}>
					${this._extracting ? html`<uui-loader-bar></uui-loader-bar>` : 'Choose PDF...'}
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
				${hasContent ? this.#renderExtractionHeader() : nothing}
				${hasContent && this._viewMode === 'elements' ? this.#renderInfoBoxes() : nothing}
				${this._successMessage ? html`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : nothing}
				${hasContent ? this.#renderExtractionContent() : this.#renderEmpty()}
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

			/* Header: tabs only */
			.source-header {
				display: flex;
				align-items: center;
				width: 100%;
			}

			.source-header uui-tab-group {
				flex: 1;
			}

			/* Info boxes row (uSync-inspired) */
			.info-boxes {
				display: flex;
				gap: var(--uui-size-space-4);
				flex-wrap: wrap;
				padding: var(--uui-size-space-4);
			}

			.info-box-item {
				flex-grow: 1;
			}

			.box-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: var(--uui-size-space-2);
			}

			.box-icon {
				font-size: 32px;
				color: var(--uui-color-text-alt);
			}

			.box-title {
				font-size: var(--uui-type-default-size);
				font-weight: 600;
				margin: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100%;
			}

			.box-subtitle {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.box-buttons {
				display: flex;
				gap: var(--uui-size-space-2);
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-stat {
				font-size: var(--uui-type-h3-size);
				font-weight: 700;
				color: var(--uui-color-text);
			}


			/* Collapse row below boxes */
			.collapse-row {
				display: flex;
				justify-content: flex-end;
				padding: 0 var(--uui-size-space-4) var(--uui-size-space-2);
			}

			/* Page selection (stacked inside box) */
			.page-selection {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
				font-size: var(--uui-type-small-size);
				margin-top: var(--uui-size-space-1);
			}

			.page-radio {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
				cursor: pointer;
				white-space: nowrap;
				color: var(--uui-color-text);
			}

			.page-radio input[type="radio"] {
				margin: 0;
				cursor: pointer;
			}

			.page-input {
				width: 100%;
				padding: 2px 8px;
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				font-family: inherit;
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.page-input:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			.page-input:disabled {
				opacity: 0.4;
				cursor: not-allowed;
			}

			/* Page box include toggle */
			.page-header-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.page-box.page-excluded {
				opacity: 0.4;
			}

			.header-spacer {
				flex: 1;
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			/* Consistent collapse chevron across all levels */
			.collapse-chevron {
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
				font-size: 12px;
			}

			.collapse-trigger {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				cursor: pointer;
			}

			.collapse-trigger:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			/* Zone areas (Level 2) */
			.zone-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-4) 0;
				margin-left: var(--uui-size-space-3);
			}

			.zone-area.undefined {
				opacity: 0.75;
			}

			.zone-area.area-excluded {
				opacity: 0.4;
			}

			.area-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
			}

			.area-header:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.area-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.area-color-swatch {
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 2px;
				border: 1px solid var(--uui-color-border);
			}

			.area-color-swatch.undefined-swatch {
				background: var(--uui-color-border-standalone);
			}

			.area-name {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.undefined-name {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Sections within areas (Level 3) */
			.zone-section {
				margin-left: var(--uui-size-space-3);
			}

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

			.section-heading:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.heading-content {
				flex: 1;
				min-width: 0;
			}

			.heading-text {
				font-weight: 600;
				margin-bottom: var(--uui-size-space-1);
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

			.meta-badge.text-type {
				font-weight: 500;
				text-transform: uppercase;
				font-size: 10px;
				letter-spacing: 0.5px;
			}

			.meta-badge.text-type.list {
				color: var(--uui-color-positive);
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

			/* Transformed sections */
			.transformed-section {
				margin: var(--uui-size-space-4);
			}

			.transformed-section.section-mapped {
				border-left: 3px solid var(--uui-color-positive);
			}

			.section-mapping-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
			}

			.mapping-label {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
				color: var(--uui-color-text-alt);
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
