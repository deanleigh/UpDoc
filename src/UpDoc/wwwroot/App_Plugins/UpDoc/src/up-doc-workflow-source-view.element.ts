import type { RichExtractionResult, DocumentTypeConfig, MappingDestination, AreaDetectionResult, DetectedArea, DetectedSection, AreaElement, TransformResult, TransformedSection, SourceConfig, AreaTemplate, AreaRules, InferSectionPatternResponse, MapConfig, SectionMapping } from './workflow.types.js';
import { fetchSampleExtraction, triggerSampleExtraction, fetchWorkflowByName, fetchAreaDetection, triggerTransform, fetchTransformResult, updateSectionInclusion, savePageSelection, fetchSourceConfig, fetchAreaTemplate, saveAreaTemplate, saveAreaRules, inferSectionPattern, saveMapConfig } from './workflow.service.js';
import { normalizeToKebabCase, markdownToHtml } from './transforms.js';
import { UMB_AREA_EDITOR_MODAL } from './pdf-area-editor-modal.token.js';
import { UMB_PAGE_PICKER_MODAL } from './page-picker-modal.token.js';
import { UMB_SECTION_RULES_EDITOR_MODAL } from './section-rules-editor-modal.token.js';
import { html, css, state, nothing, unsafeHTML } from '@umbraco-cms/backoffice/external/lit';
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
	@state() private _areaDetection: AreaDetectionResult | null = null;
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
	@state() private _collapsePopoverOpen = false;
	@state() private _excludedAreas = new Set<string>();
	@state() private _areaTemplate: AreaTemplate | null = null;
	@state() private _sectionPickerOpen = false;
	/** Area index currently in teach mode (null = not teaching). */
	@state() private _teachingAreaIndex: number | null = null;
	/** Inference result from clicking an element in teach mode. */
	@state() private _inferenceResult: InferSectionPatternResponse | null = null;
	/** Whether an inference API call is in progress. */
	@state() private _inferring = false;
	#token = '';

	override connectedCallback() {
		super.connectedCallback();
		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			if (!context) return;
			// Register save handler so the workspace Save button triggers re-extraction
			(context as any).setSaveHandler(() => this.#onReExtract());
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
			const [extraction, areaDetection, config, transformResult, sourceConfig, areaTemplate] = await Promise.all([
				fetchSampleExtraction(this._workflowName, this.#token),
				fetchAreaDetection(this._workflowName, this.#token),
				fetchWorkflowByName(this._workflowName, this.#token),
				fetchTransformResult(this._workflowName, this.#token),
				fetchSourceConfig(this._workflowName, this.#token),
				fetchAreaTemplate(this._workflowName, this.#token),
			]);
			this._extraction = extraction;
			this._areaDetection = areaDetection;
			this._config = config;
			this._transformResult = transformResult;
			this._sourceConfig = sourceConfig;
			this._areaTemplate = areaTemplate;

			// Always re-trigger transform on load to ensure fresh data
			// (handles code changes, stale transform.json, etc.)
			const mediaKey = extraction?.source.mediaKey;
			if (mediaKey && areaDetection) {
				const freshTransform = await triggerTransform(this._workflowName, mediaKey, this.#token);
				if (freshTransform) {
					this._transformResult = freshTransform;
				}
			}

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



	async #savePageSelection() {
		if (!this._workflowName) return;
		const pages = this.#getSelectedPages();
		await savePageSelection(this._workflowName, pages, this.#token);
	}

	/** Get all collapse keys for a given level. */
	#getKeysForLevel(level: 'pages' | 'areas' | 'sections'): string[] {
		if (!this._areaDetection) return [];
		const keys: string[] = [];
		for (const page of this._areaDetection.pages) {
			const pageNum = page.page;
			if (level === 'pages') {
				keys.push(`page-${pageNum}`);
			}
			if (level === 'areas') {
				page.areas.forEach((_z, aIdx) => keys.push(`area-p${pageNum}-a${aIdx}`));
			}
			if (level === 'sections') {
				// Raw section keys
				page.areas.forEach((_z, aIdx) => {
					_z.sections.forEach((_s, sIdx) => keys.push(`p${pageNum}-a${aIdx}-s${sIdx}`));
				});
				// Composed section keys (from transform rules)
				page.areas.forEach((area) => {
					const composed = this.#getTransformSectionsForArea(area, pageNum);
					composed.forEach((s) => keys.push(`composed-${s.id}`));
				});
			}
		}
		return keys;
	}

	/** Check if all items at a level are currently collapsed. */
	#isLevelCollapsed(level: 'pages' | 'areas' | 'sections'): boolean {
		const keys = this.#getKeysForLevel(level);
		return keys.length > 0 && keys.every((k) => this._collapsed.has(k));
	}

	/** Toggle all items at a given level. */
	#toggleLevel(level: 'pages' | 'areas' | 'sections') {
		const keys = this.#getKeysForLevel(level);
		const allCollapsed = this.#isLevelCollapsed(level);
		const next = new Set(this._collapsed);
		for (const key of keys) {
			if (allCollapsed) {
				next.delete(key);
			} else {
				next.add(key);
			}
		}
		this._collapsed = next;
	}

	/** Expand everything. */
	#expandAll() {
		this._collapsed = new Set<string>();
	}

	#onCollapsePopoverToggle(event: ToggleEvent) {
		this._collapsePopoverOpen = event.newState === 'open';
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

	/** Opens the area editor modal to define/edit extraction areas. */
	async #onEditAreas() {
		if (!this._workflowName) return;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_AREA_EDITOR_MODAL, {
			data: {
				workflowName: this._workflowName,
				existingTemplate: this._areaTemplate,
				selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages)
					? this._sourceConfig.pages
					: null,
			},
		});

		try {
			const result = await modal.onSubmit();
			if (result?.template) {
				// Save the area template
				const saved = await saveAreaTemplate(this._workflowName, result.template, this.#token);
				if (saved) {
					this._areaTemplate = saved;
					// Re-extract with the new area template applied
					await this.#onReExtract();
				}
			}
		} catch {
			// Modal was cancelled — do nothing
		}
	}

	/** Builds a list of areas for the rules editor dropdown. */
	#getAreasForRulesEditor(): Array<{ areaKey: string; areaName: string; elements: AreaElement[]; hasRules: boolean }> {
		if (!this._areaDetection) return [];

		const result: Array<{ areaKey: string; areaName: string; elements: AreaElement[]; hasRules: boolean }> = [];
		const seenKeys = new Set<string>();

		for (const page of this._areaDetection.pages) {
			for (const area of page.areas) {
				const areaName = area.name || `Area`;
				const areaKey = normalizeToKebabCase(areaName);
				if (seenKeys.has(areaKey)) continue; // Deduplicate (same area on multiple pages)
				seenKeys.add(areaKey);

				const elements = this.#getAreaElements(area);
				const ar = this._sourceConfig?.areaRules?.[areaKey];
				const hasRules = !!ar && ((ar.groups?.length ?? 0) > 0 || (ar.rules?.length ?? 0) > 0);
				result.push({ areaKey, areaName, elements, hasRules });
			}
		}
		return result;
	}

	#onSectionPickerToggle(event: ToggleEvent) {
		this._sectionPickerOpen = event.newState === 'open';
	}

	/** Saves area rules for a specific area key and re-triggers transform. */
	async #saveAreaRulesForKey(areaKey: string, rules: AreaRules) {
		if (!this._workflowName) return;

		const allRules: Record<string, AreaRules> = {
			...(this._sourceConfig?.areaRules ?? {}),
		};

		const hasAnyRules = rules.groups.length > 0 || rules.rules.length > 0;
		if (hasAnyRules) {
			allRules[areaKey] = rules;
		} else {
			delete allRules[areaKey];
		}

		const saved = await saveAreaRules(this._workflowName, allRules, this.#token);
		if (saved && this._sourceConfig) {
			this._sourceConfig = { ...this._sourceConfig, areaRules: saved };
		}

		// Re-trigger transform so the Extracted view reflects composed sections
		const mediaKey = this._extraction?.source.mediaKey;
		if (mediaKey) {
			const updatedTransform = await triggerTransform(this._workflowName, mediaKey, this.#token);
			if (updatedTransform) {
				this._transformResult = updatedTransform;
			}
		}
	}

	/** Opens the rules editor modal for a specific area. */
	async #onEditAreaRules(areaKey: string, areaName: string, elements: AreaElement[]) {
		if (!this._workflowName) return;

		const existingRules = this._sourceConfig?.areaRules?.[areaKey] ?? null;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_SECTION_RULES_EDITOR_MODAL, {
			data: {
				workflowName: this._workflowName,
				sectionId: areaKey,
				sectionHeading: areaName,
				elements,
				existingRules,
				onSave: async (rules: AreaRules) => {
					await this.#saveAreaRulesForKey(areaKey, rules);
				},
			},
		});

		try {
			const result = await modal.onSubmit();
			if (result?.rules) {
				await this.#saveAreaRulesForKey(areaKey, result.rules);
			}
		} catch {
			// Modal cancelled
		}
	}

	/** Opens the page picker modal with PDF thumbnails. */
	async #onOpenPagePicker() {
		const mediaKey = this._extraction?.source.mediaKey;
		if (!mediaKey) return;

		const totalPages = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
		if (totalPages === 0) return;

		const selectedPages = this.#getSelectedPages();

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_PAGE_PICKER_MODAL, {
			data: { mediaKey, totalPages, selectedPages },
		});

		const result = await modal.onSubmit().catch(() => null);
		if (result === null) return; // cancelled

		// Update local state from the modal result
		if (result.selectedPages === null) {
			this._pageMode = 'all';
			this._pageInputValue = '';
		} else {
			this._pageMode = 'custom';
			this._pageInputValue = this.#pagesToRangeString(result.selectedPages);
		}
		await this.#savePageSelection();
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

			// Trigger sample extraction and transform (which includes area detection) in parallel
			const [extraction, transformResult] = await Promise.all([
				triggerSampleExtraction(this._workflowName, mediaKey, token),
				triggerTransform(this._workflowName, mediaKey, token),
			]);

			if (extraction) {
				this._extraction = extraction;
			}
			if (transformResult) {
				this._transformResult = transformResult;
				// Transform endpoint also saved area detection — fetch it
				const areaDetection = await fetchAreaDetection(this._workflowName, token);
				this._areaDetection = areaDetection;
				const d = transformResult.diagnostics;
				const rolePart = d.roleSections > 0 ? `, ${d.roleSections} role` : '';
				this._successMessage = `Content extracted — ${d.totalSections} sections (${d.bulletListSections} bullet, ${d.paragraphSections} paragraph, ${d.subHeadedSections} sub-headed${rolePart})`;
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

	// --- Teach-by-example helpers ---

	/** Compute a flat global area index from page number and local area index. */
	#getGlobalAreaIndex(pageNum: number, localAreaIndex: number): number {
		if (!this._areaDetection) return localAreaIndex;
		let globalIdx = 0;
		for (const page of this._areaDetection.pages) {
			if (page.page === pageNum) return globalIdx + localAreaIndex;
			globalIdx += page.areas.length;
		}
		return globalIdx + localAreaIndex;
	}

	/** Get all elements from an area, flattened from sections. */
	#getAreaElements(area: DetectedArea): AreaElement[] {
		const elements: AreaElement[] = [];
		for (const section of area.sections) {
			if (section.heading) elements.push(section.heading);
			elements.push(...section.children);
		}
		return elements;
	}

	/** Enter teach mode for a specific area. */
	#onDefineStructure(globalAreaIdx: number, areaKey: string) {
		this._teachingAreaIndex = globalAreaIdx;
		this._inferenceResult = null;
		this._inferring = false;
		// Ensure the area is expanded
		if (this._collapsed.has(areaKey)) {
			const next = new Set(this._collapsed);
			next.delete(areaKey);
			this._collapsed = next;
		}
	}

	/** User clicked an element in teach mode. Call the inference API. */
	async #onTeachElementClick(elementId: string) {
		if (this._teachingAreaIndex === null || !this._workflowName || this._inferring) return;

		this._inferring = true;
		this._inferenceResult = null;

		try {
			const result = await inferSectionPattern(
				this._workflowName,
				this._teachingAreaIndex,
				elementId,
				this.#token,
			);
			this._inferenceResult = result;
		} catch (err) {
			console.error('Inference failed:', err);
			this._error = 'Failed to infer section pattern';
		} finally {
			this._inferring = false;
		}
	}

	/** Confirm the inferred pattern — save to area template and re-extract. */
	async #onConfirmPattern() {
		if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;

		const idx = this._teachingAreaIndex;
		if (idx < 0 || idx >= this._areaTemplate.areas.length) return;

		// Update the area template with the new section pattern
		const updatedAreas = [...this._areaTemplate.areas];
		updatedAreas[idx] = { ...updatedAreas[idx], sectionPattern: this._inferenceResult.pattern };
		const updatedTemplate: AreaTemplate = { ...this._areaTemplate, areas: updatedAreas };

		const saved = await saveAreaTemplate(this._workflowName, updatedTemplate, this.#token);
		if (saved) {
			this._areaTemplate = saved;
			// Exit teach mode
			this._teachingAreaIndex = null;
			this._inferenceResult = null;
			// Re-extract with the updated area template
			await this.#onReExtract();
		}
	}

	/** Save empty conditions (no section headings) for the current teach area. */
	async #onNoSections() {
		if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;

		const idx = this._teachingAreaIndex;
		if (idx < 0 || idx >= this._areaTemplate.areas.length) return;

		// Save empty conditions = one flat section
		const updatedAreas = [...this._areaTemplate.areas];
		updatedAreas[idx] = { ...updatedAreas[idx], sectionPattern: { conditions: [] } };
		const updatedTemplate: AreaTemplate = { ...this._areaTemplate, areas: updatedAreas };

		const saved = await saveAreaTemplate(this._workflowName, updatedTemplate, this.#token);
		if (saved) {
			this._areaTemplate = saved;
			this._teachingAreaIndex = null;
			this._inferenceResult = null;
			await this.#onReExtract();
		}
	}

	/** Cancel teach mode without saving. */
	#onCancelTeach() {
		this._teachingAreaIndex = null;
		this._inferenceResult = null;
		this._inferring = false;
	}

	// --- Composed section helpers (Phase 1b) ---

	/** Check if an area has rules defined in source config. */
	#getAreaRulesKey(area: DetectedArea): string {
		return normalizeToKebabCase(area.name || '');
	}

	#hasAreaRules(area: DetectedArea): boolean {
		const key = this.#getAreaRulesKey(area);
		const areaRules = this._sourceConfig?.areaRules?.[key];
		if (!areaRules) return false;
		return (areaRules.groups?.length ?? 0) > 0 || (areaRules.rules?.length ?? 0) > 0;
	}

	/** Get transform sections that belong to a specific area (matched by color + page). */
	#getTransformSectionsForArea(area: DetectedArea, pageNum: number): TransformedSection[] {
		if (!this._transformResult) return [];
		return this._transformResult.sections.filter(
			(s) => s.areaColor === area.color && s.page === pageNum,
		);
	}

	async #onMapSection(section: TransformedSection, partSuffix: string = 'content') {
		if (!this._workflowName || !this._config?.destination) return;

		const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
		const modal = modalManager.open(this, UMB_DESTINATION_PICKER_MODAL, {
			data: {
				destination: this._config.destination,
				existingMappings: this._config.map?.mappings ?? [],
			},
		});

		let result;
		try {
			result = await modal.onSubmit();
		} catch {
			return; // cancelled
		}

		if (!result?.selectedTargets?.length) return;

		const sourceKey = `${section.id}.${partSuffix}`;
		const existingMappings = this._config.map?.mappings ?? [];

		const newMapping: SectionMapping = {
			source: sourceKey,
			destinations: result.selectedTargets.map((t) => ({ target: t.target, blockKey: t.blockKey })),
			enabled: true,
		};

		const existingIndex = existingMappings.findIndex((m) => m.source === sourceKey);
		const updatedMappings = existingIndex >= 0
			? existingMappings.map((m, i) => i === existingIndex ? newMapping : m)
			: [...existingMappings, newMapping];

		const updatedMap: MapConfig = {
			...(this._config.map ?? { version: '1.0', mappings: [] }),
			mappings: updatedMappings,
		};

		const saved = await saveMapConfig(this._workflowName, updatedMap, this.#token);
		if (saved) {
			this._config = { ...this._config, map: saved };
		}
	}

	/** Remove a specific mapping destination from a source key. */
	async #onUnmap(sourceKey: string, dest: MappingDestination) {
		if (!this._workflowName || !this._config?.map) return;

		const existingMappings = this._config.map.mappings;
		const mappingIndex = existingMappings.findIndex((m) => m.source === sourceKey);
		if (mappingIndex < 0) return;

		const mapping = existingMappings[mappingIndex];
		const remainingDests = mapping.destinations.filter(
			(d) => !(d.target === dest.target && d.blockKey === dest.blockKey),
		);

		let updatedMappings: SectionMapping[];
		if (remainingDests.length === 0) {
			// No destinations left — remove the entire mapping
			updatedMappings = existingMappings.filter((_, i) => i !== mappingIndex);
		} else {
			updatedMappings = existingMappings.map((m, i) =>
				i === mappingIndex ? { ...m, destinations: remainingDests } : m,
			);
		}

		const updatedMap: MapConfig = { ...this._config.map, mappings: updatedMappings };
		const saved = await saveMapConfig(this._workflowName, updatedMap, this.#token);
		if (saved) {
			this._config = { ...this._config, map: saved };
		}
	}

	#renderComposedSectionRow(section: TransformedSection) {
		// Check all possible source key suffixes for mapping status
		const suffixes = ['content', 'heading', 'title', 'description', 'summary'];
		const hasMappings = suffixes.some((s) => this.#getMappedTargets(`${section.id}.${s}`).length > 0);

		const collapseKey = `composed-${section.id}`;
		const isCollapsed = this.#isCollapsed(collapseKey);

		return html`
			<div class="composed-section-row">
				<div class="composed-section-header" @click=${() => this.#toggleCollapse(collapseKey)}>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="composed-role">${(section.heading ?? 'Content').replace(/^#+\s*/, '')}</span>
					<span class="header-spacer"></span>
					${hasMappings
						? suffixes.map((s) => this.#renderPartBadges(`${section.id}.${s}`))
						: nothing}
				</div>
				${!isCollapsed && section.content ? html`
					<div class="composed-section-content">${unsafeHTML(markdownToHtml(section.content))}</div>
				` : nothing}
			</div>
		`;
	}

	// --- Area-based rendering ---

	#classifyText(text: string): 'list' | 'paragraph' {
		const trimmed = text.trimStart();
		if (/^[•\-\*▪▸▶►●○◦‣⁃]/.test(trimmed)) return 'list';
		if (/^\d+[\.\)]\s/.test(trimmed)) return 'list';
		return 'paragraph';
	}

	#renderAreaElement(element: AreaElement, role?: 'heading') {
		const textType = role === 'heading' ? 'heading' : this.#classifyText(element.text);
		const badgeLabel = textType === 'heading' ? 'Heading' : textType === 'list' ? 'List Item' : 'Paragraph';
		return html`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${element.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${textType}">${badgeLabel}</span>
						<span class="meta-badge font-size">${element.fontSize}pt</span>
						<span class="meta-badge font-name">${element.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${element.color};">${element.color}</span>
						${element.text === element.text.toUpperCase() && element.text !== element.text.toLowerCase() ? html`<span class="meta-badge text-case">UPPERCASE</span>` : nothing}
					</div>
				</div>
			</div>
		`;
	}

	#renderSection(section: DetectedSection, sectionKey: string, pageNum: number, areaIndex: number) {
		const isCollapsed = this.#isCollapsed(sectionKey);

		// Compute the section ID matching transform.json
		const sectionId = section.heading
			? normalizeToKebabCase(section.heading.text)
			: `preamble-p${pageNum}-a${areaIndex}`;
		const isIncluded = this.#isSectionIncluded(sectionId);

		if (!section.heading) {
			// No-heading section — render with toggle
			return html`
				<div class="area-section ${!isIncluded ? 'excluded' : ''}">
					<div class="section-heading preamble" @click=${() => this.#toggleCollapse(sectionKey)}>
						<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${section.children.length} element${section.children.length !== 1 ? 's' : ''}</span>
						<uui-toggle
							label="${isIncluded ? 'Included' : 'Excluded'}"
							?checked=${isIncluded}
							@click=${(e: Event) => e.stopPropagation()}
							@change=${(e: Event) => this.#onToggleInclusion(sectionId, (e.target as any).checked)}>
						</uui-toggle>
					</div>
					${isIncluded && !isCollapsed ? html`
						${section.children.map((el) => this.#renderAreaElement(el))}
					` : nothing}
				</div>
			`;
		}

		const heading = section.heading;
		const elementCount = section.children.length;
		const hasChildren = elementCount > 0;

		return html`
			<div class="area-section ${!isIncluded ? 'excluded' : ''}">
				<div class="section-heading" @click=${hasChildren ? () => this.#toggleCollapse(sectionKey) : nothing}>
					${hasChildren
						? html`<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>`
						: html`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="heading-text" title="${heading.text}">${heading.text}</span>
					${hasChildren ? html`<span class="group-count">${elementCount} element${elementCount !== 1 ? 's' : ''}</span>` : nothing}
					<uui-toggle
						label="${isIncluded ? 'Included' : 'Excluded'}"
						?checked=${isIncluded}
						@click=${(e: Event) => e.stopPropagation()}
						@change=${(e: Event) => this.#onToggleInclusion(sectionId, (e.target as any).checked)}>
					</uui-toggle>
				</div>
				${hasChildren && !isCollapsed && isIncluded ? html`
					<div class="section-children">
						${section.children.map((el) => this.#renderAreaElement(el))}
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

	#renderTeachElement(element: AreaElement) {
		const isClicked = this._inferenceResult?.clickedElementId === element.id;
		const isMatching = this._inferenceResult?.matchingElementIds?.includes(element.id) ?? false;
		const textType = this.#classifyText(element.text);
		const badgeLabel = textType === 'list' ? 'List Item' : 'Paragraph';
		return html`
			<div class="element-item teach-element ${isClicked ? 'teach-clicked' : ''} ${isMatching ? 'teach-matched' : ''}"
				@click=${() => this.#onTeachElementClick(element.id)}>
				<div class="element-content">
					<div class="element-text">${element.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${textType}">${badgeLabel}</span>
						<span class="meta-badge font-size">${element.fontSize}pt</span>
						<span class="meta-badge font-name">${element.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${element.color};">${element.color}</span>
						${element.text === element.text.toUpperCase() && element.text !== element.text.toLowerCase() ? html`<span class="meta-badge text-case">UPPERCASE</span>` : nothing}
					</div>
				</div>
			</div>
		`;
	}

	#renderTeachToolbar() {
		if (this._inferenceResult) {
			const matchCount = this._inferenceResult.matchingElementIds.length;
			const conditionSummary = this._inferenceResult.pattern.conditions
				.map((c) => `${c.type}: ${c.value}`)
				.join(', ');
			return html`
				<div class="teach-confirmation">
					<div class="teach-confirmation-info">
						<uui-icon name="icon-check" style="color: var(--uui-color-positive);"></uui-icon>
						<span>Found <strong>${matchCount}</strong> matching element${matchCount !== 1 ? 's' : ''}</span>
						<span class="teach-condition-summary">${conditionSummary}</span>
					</div>
					<div class="teach-confirmation-actions">
						<uui-button look="primary" color="default" label="Confirm" @click=${() => this.#onConfirmPattern()}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => this.#onCancelTeach()}>Cancel</uui-button>
					</div>
				</div>
			`;
		}

		return html`
			<div class="teach-toolbar">
				<span class="teach-instruction">
					${this._inferring
						? html`<uui-loader-bar></uui-loader-bar> Analysing...`
						: html`Click a section heading, or <strong>No Sections</strong> if this area has no repeating structure`}
				</span>
				<div class="teach-toolbar-actions">
					<uui-button look="secondary" compact label="No Sections" @click=${() => this.#onNoSections()}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => this.#onCancelTeach()}>Cancel</uui-button>
				</div>
			</div>
		`;
	}

	#renderArea(area: DetectedArea, pageNum: number, areaIndex: number) {
		const areaKey = `area-p${pageNum}-a${areaIndex}`;
		const globalIdx = this.#getGlobalAreaIndex(pageNum, areaIndex);
		const isTeaching = this._teachingAreaIndex === globalIdx;
		const isCollapsed = isTeaching ? false : this.#isCollapsed(areaKey);
		const isIncluded = !this._excludedAreas.has(areaKey);

		// Check if area has rules defined (from section rules editor)
		const rulesAreaKey = this.#getAreaRulesKey(area);
		const hasRules = this.#hasAreaRules(area);

		// When rules exist and transform is available, use composed sections from transform
		const composedSections = hasRules && this._transformResult
			? this.#getTransformSectionsForArea(area, pageNum)
			: [];
		const useComposed = hasRules && composedSections.length > 0;

		const sectionCount = useComposed ? composedSections.length : area.sections.length;

		// Check if area has a configured section pattern
		const hasPattern = area.sectionPattern != null;
		const patternLabel = hasPattern
			? (area.sectionPattern!.conditions.length > 0 ? 'Configured' : 'Flat')
			: null;

		const areaRulesObj = this._sourceConfig?.areaRules?.[rulesAreaKey];
		const ruleCount = (areaRulesObj?.rules?.length ?? 0) + (areaRulesObj?.groups?.reduce((sum, g) => sum + g.rules.length, 0) ?? 0);

		return html`
			<div class="detected-area ${!isIncluded ? 'area-excluded' : ''} ${isTeaching ? 'area-teaching' : ''}" style="border-left-color: ${area.color};">
				<div class="area-header" @click=${() => !isTeaching && this.#toggleCollapse(areaKey)}>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					<uui-icon class="level-icon" name="icon-grid"></uui-icon>
					<span class="area-name">${area.name || `${areaIndex + 1}`}</span>
					${hasRules
						? html`<span class="meta-badge rules-badge">${ruleCount} rule${ruleCount !== 1 ? 's' : ''}</span>`
						: patternLabel ? html`<span class="meta-badge structure-badge">${patternLabel}</span>` : nothing}
					<span class="header-spacer"></span>
					<span class="group-count">${sectionCount} section${sectionCount !== 1 ? 's' : ''}</span>
					${!isTeaching ? html`
						${hasRules ? html`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${(e: Event) => { e.stopPropagation(); this.#onEditAreaRules(rulesAreaKey, area.name || '', this.#getAreaElements(area)); }}
								?disabled=${this._teachingAreaIndex !== null}>
								<uui-icon name="icon-settings"></uui-icon>
								Edit Rules
							</uui-button>
						` : html`
							<uui-button
								look="outline"
								compact
								label="${hasPattern ? 'Redefine Structure' : 'Define Structure'}"
								@click=${(e: Event) => { e.stopPropagation(); this.#onDefineStructure(globalIdx, areaKey); }}
								?disabled=${this._teachingAreaIndex !== null && !isTeaching}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${hasPattern ? 'Redefine' : 'Define Structure'}
							</uui-button>
						`}
					` : nothing}
					${!hasRules ? html`
						<uui-toggle
							label="${isIncluded ? 'Included' : 'Excluded'}"
							?checked=${isIncluded}
							@click=${(e: Event) => e.stopPropagation()}
							@change=${() => this.#toggleAreaExclusion(areaKey)}>
						</uui-toggle>
					` : nothing}
				</div>
				${!isCollapsed ? html`
					${isTeaching ? html`
						${this.#renderTeachToolbar()}
						<div class="teach-elements">
							${this.#getAreaElements(area).map((el) => this.#renderTeachElement(el))}
						</div>
					` : useComposed ? html`
						<div class="composed-sections">
							${composedSections.map((section) => this.#renderComposedSectionRow(section))}
						</div>
					` : html`
						${area.sections.map((section, sIdx) =>
							this.#renderSection(section, `p${pageNum}-a${areaIndex}-s${sIdx}`, pageNum, areaIndex)
						)}
					`}
				` : nothing}
			</div>
		`;
	}

	#renderAreaPage(pageNum: number, areas: DetectedArea[]) {
		const pageKey = `page-${pageNum}`;
		const isCollapsed = this.#isCollapsed(pageKey);
		const areaCount = areas.length;
		const sectionCount = areas.reduce((sum, a) => sum + a.sections.length, 0);
		const isIncluded = this.#isPageIncluded(pageNum);
		return html`
			<uui-box class="page-box ${!isIncluded ? 'page-excluded' : ''}">
				<div slot="header" class="tree-header" @click=${() => this.#toggleCollapse(pageKey)}>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${pageNum}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${sectionCount} section${sectionCount !== 1 ? 's' : ''}, ${areaCount} area${areaCount !== 1 ? 's' : ''}</span>
				</div>
				${!isCollapsed ? html`
					${areas.map((area, idx) => this.#renderArea(area, pageNum, idx))}
				` : nothing}
			</uui-box>
		`;
	}

	#renderAreaDetection() {
		if (!this._areaDetection) return nothing;

		return html`
			${this._areaDetection.pages.map((page) =>
				this.#renderAreaPage(page.page, page.areas)
			)}
		`;
	}

	#computeSectionCount(): number {
		if (!this._areaDetection) return 0;
		return this._areaDetection.pages.reduce((sum, page) =>
			sum + page.areas.reduce((aSum, area) => aSum + area.sections.length, 0), 0);
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
		const hasAreas = this._areaDetection !== null;
		const hasExtraction = this._extraction !== null;

		if (!hasAreas && !hasExtraction) return nothing;

		const totalPages = this._areaDetection?.totalPages ?? (hasExtraction ? this._extraction!.source.totalPages : 0);
		const extractedPageCount = hasAreas ? this._areaDetection!.pages.length : totalPages;
		const isFiltered = extractedPageCount < totalPages;
		const pagesLabel = isFiltered ? `${extractedPageCount} of ${totalPages}` : `${totalPages}`;
		const areas = hasAreas ? this._areaDetection!.diagnostics.areasDetected : 0;
		const sections = hasAreas ? this.#computeSectionCount() : 0;
		const fileName = hasExtraction ? this._extraction!.source.fileName : '';
		const extractedDate = hasExtraction
			? new Date(this._extraction!.source.extractedDate).toLocaleString()
			: '';

		return html`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${extractedDate}</span>
					</div>
					<div class="box-content">
						<uui-icon name="icon-page-add" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${fileName}">${fileName}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${this.#onPickMedia} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-stat">${pagesLabel}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${this.#onOpenPagePicker}>
								<uui-icon name="icon-document"></uui-icon>
								Choose Pages
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-grid" class="box-icon"></uui-icon>
						<span class="box-stat">${this._areaTemplate ? this._areaTemplate.areas.length : areas}</span>
						<div class="box-buttons">
							${this._areaTemplate
								? html`<uui-button look="primary" color="default" label="Edit Areas" @click=${this.#onEditAreas}>
									<uui-icon name="icon-grid"></uui-icon>
									Edit Areas
								</uui-button>`
								: html`<uui-button look="primary" color="default" label="Define Areas" @click=${this.#onEditAreas}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-thumbnail-list" class="box-icon"></uui-icon>
						<span class="box-stat">${sections}</span>
						${this._transformResult && this._areaDetection ? html`
							<div class="box-buttons">
								<uui-button
									look="primary"
									color="default"
									label="Edit Sections"
									popovertarget="section-picker-popover">
									<uui-icon name="icon-thumbnail-list"></uui-icon>
									Edit Sections
									<uui-symbol-expand .open=${this._sectionPickerOpen}></uui-symbol-expand>
								</uui-button>
								<uui-popover-container
									id="section-picker-popover"
									placement="bottom-end"
									@toggle=${this.#onSectionPickerToggle}>
									<umb-popover-layout>
										${this.#getAreasForRulesEditor().map((a) => html`
											<uui-menu-item
												label="${a.areaName}"
												@click=${() => this.#onEditAreaRules(a.areaKey, a.areaName, a.elements)}>
												<uui-icon slot="icon" name="${a.hasRules ? 'icon-check' : 'icon-thumbnail-list'}"></uui-icon>
												<span slot="badge" class="section-picker-meta">${a.elements.length} el</span>
											</uui-menu-item>
										`)}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : nothing}
					</div>
				</uui-box>
			</div>

			${hasAreas ? html`
				<div class="collapse-row">
					<uui-button
						look="outline"
						compact
						label="Collapse"
						popovertarget="collapse-level-popover">
						Collapse
						<uui-symbol-expand .open=${this._collapsePopoverOpen}></uui-symbol-expand>
					</uui-button>
					<uui-popover-container
						id="collapse-level-popover"
						placement="bottom-start"
						@toggle=${this.#onCollapsePopoverToggle}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => this.#expandAll()}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${this.#isLevelCollapsed('pages') ? 'Expand' : 'Collapse'} Pages"
								@click=${() => this.#toggleLevel('pages')}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${this.#isLevelCollapsed('areas') ? 'Expand' : 'Collapse'} Areas"
								@click=${() => this.#toggleLevel('areas')}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${this.#isLevelCollapsed('sections') ? 'Expand' : 'Collapse'} Sections"
								@click=${() => this.#toggleLevel('sections')}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : nothing}
		`;
	}

	#renderExtractionContent() {
		const hasAreas = this._areaDetection !== null;
		return this._viewMode === 'elements'
			? (hasAreas ? this.#renderAreaDetection() : nothing)
			: this.#renderTransformed();
	}

	/** Build full Markdown for all included sections, concatenated as one document. */
	#buildFullMarkdown(): string {
		if (!this._transformResult) return '';

		const includedSections = this._transformResult.sections.filter((s) => s.included);
		const parts: string[] = [];

		for (const section of includedSections) {
			// Add heading if present
			if (section.heading) {
				parts.push(`## ${section.heading}`);
			}
			// Add content
			if (section.content) {
				parts.push(section.content);
			}
			// Add description if present
			if (section.description) {
				parts.push(section.description);
			}
			// Add summary if present
			if (section.summary) {
				parts.push(section.summary);
			}
			// Blank line between sections
			parts.push('');
		}

		return parts.join('\n');
	}

	#renderTransformed() {
		if (!this._transformResult) {
			return html`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
		}

		const includedSections = this._transformResult.sections.filter((s) => s.included);
		const totalSections = this._transformResult.sections.length;

		// Group sections by page, then by area within each page
		const pageMap = new Map<number, Map<string, TransformedSection[]>>();
		for (const section of includedSections) {
			if (!pageMap.has(section.page)) pageMap.set(section.page, new Map());
			const areaMap = pageMap.get(section.page)!;
			const areaKey = section.areaName || 'Uncategorized';
			if (!areaMap.has(areaKey)) areaMap.set(areaKey, []);
			areaMap.get(areaKey)!.push(section);
		}

		const pages = [...pageMap.entries()].sort((a, b) => a[0] - b[0]);

		return html`
			${pages.map(([pageNum, areaMap]) => this.#renderTransformedPage(pageNum, areaMap))}
			<div class="diagnostics">
				<span class="meta-badge">${includedSections.length}/${totalSections} sections included</span>
			</div>
		`;
	}

	#renderTransformedPage(pageNum: number, areaMap: Map<string, TransformedSection[]>) {
		const pageKey = `tx-page-${pageNum}`;
		const isCollapsed = this.#isCollapsed(pageKey);
		const sectionCount = [...areaMap.values()].reduce((sum, sections) => sum + sections.length, 0);
		const areaCount = areaMap.size;

		return html`
			<uui-box class="page-box">
				<div slot="header" class="tree-header" @click=${() => this.#toggleCollapse(pageKey)}>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${pageNum}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${sectionCount} section${sectionCount !== 1 ? 's' : ''}, ${areaCount} area${areaCount !== 1 ? 's' : ''}</span>
				</div>
				${!isCollapsed ? html`
					${[...areaMap.entries()].map(([areaName, sections]) =>
						this.#renderTransformedArea(areaName, sections, pageNum)
					)}
				` : nothing}
			</uui-box>
		`;
	}

	#renderTransformedArea(areaName: string, sections: TransformedSection[], pageNum: number) {
		const areaKey = `tx-area-${pageNum}-${areaName}`;
		const isCollapsed = this.#isCollapsed(areaKey);
		const areaColor = sections[0]?.areaColor || 'var(--uui-color-border)';

		return html`
			<div class="detected-area" style="border-left-color: ${areaColor};">
				<div class="area-header" @click=${() => this.#toggleCollapse(areaKey)}>
					<uui-icon class="collapse-chevron" name="${isCollapsed ? 'icon-navigation-right' : 'icon-navigation-down'}"></uui-icon>
					<span class="area-name">${areaName}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${sections.length} section${sections.length !== 1 ? 's' : ''}</span>
				</div>
				${!isCollapsed ? html`
					<div class="tx-area-sections">
						${sections.map((section) => this.#renderMarkdownSection(section))}
					</div>
				` : nothing}
			</div>
		`;
	}

	/** Render mapping badges for a given source key, with an "x" to unmap. */
	#renderPartBadges(sourceKey: string) {
		const targets = this.#getMappedTargets(sourceKey);
		if (targets.length === 0) return nothing;
		return targets.map((dest) => html`<uui-tag color="positive" look="primary" class="mapped-tag" title="${this.#resolveTargetLabel(dest)}">
			${this.#resolveTargetLabel(dest)}
			<button class="unmap-x" title="Remove mapping" @click=${(e: Event) => { e.stopPropagation(); this.#onUnmap(sourceKey, dest); }}>&times;</button>
		</uui-tag>`);
	}

	#renderMarkdownSection(section: TransformedSection) {
		const isGrouped = !!section.groupName;
		const hasDescription = !!section.description;
		const hasSummary = !!section.summary;

		const suffixes = ['content', 'heading', 'title', 'description', 'summary'];
		const isMapped = suffixes.some((s) => this.#getMappedTargets(`${section.id}.${s}`).length > 0);

		const contentHtml = section.content ? markdownToHtml(section.content) : '';
		const headingHtml = section.heading ? markdownToHtml(section.heading) : '';

		if (!isGrouped) {
			// Ungrouped: box title = role name (label), content = mappable data
			return html`
				<uui-box headline="${section.heading || 'Content'}" class="md-section-box ${isMapped ? 'mapped' : ''}">
					<div class="md-part-row">
						<div class="md-part-content">
							${contentHtml ? html`<div class="md-section-content">${unsafeHTML(contentHtml)}</div>` : nothing}
						</div>
						<div class="md-part-actions">
							${this.#renderPartBadges(`${section.id}.content`)}
							${this.#renderPartBadges(`${section.id}.heading`)}
							${this.#renderPartBadges(`${section.id}.title`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${() => this.#onMapSection(section, 'content')}>Map</uui-button>
						</div>
					</div>
				</uui-box>
			`;
		}

		// Grouped: box title = group name, sub-labeled parts stacked vertically
		return html`
			<uui-box headline="${section.groupName}" class="md-section-box ${isMapped ? 'mapped' : ''}">
				${section.heading ? html`
					<div class="md-part-block">
						<div class="md-part-header">
							<span class="section-label">${section.groupName} Title</span>
							<div class="md-part-actions">
								${this.#renderPartBadges(`${section.id}.title`)}
								${this.#renderPartBadges(`${section.id}.heading`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(e: Event) => { e.stopPropagation(); this.#onMapSection(section, 'title'); }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${unsafeHTML(headingHtml)}</div>
						</div>
					</div>
				` : nothing}
				${contentHtml ? html`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${section.groupName} Content</span>
							<div class="md-part-actions">
								${this.#renderPartBadges(`${section.id}.content`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(e: Event) => { e.stopPropagation(); this.#onMapSection(section, 'content'); }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${unsafeHTML(contentHtml)}</div>
						</div>
					</div>
				` : nothing}
				${hasDescription ? html`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${section.groupName} Description</span>
							<div class="md-part-actions">
								${this.#renderPartBadges(`${section.id}.description`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(e: Event) => { e.stopPropagation(); this.#onMapSection(section, 'description'); }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${unsafeHTML(markdownToHtml(section.description!))}</div>
						</div>
					</div>
				` : nothing}
				${hasSummary ? html`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${section.groupName} Summary</span>
							<div class="md-part-actions">
								${this.#renderPartBadges(`${section.id}.summary`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(e: Event) => { e.stopPropagation(); this.#onMapSection(section, 'summary'); }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${unsafeHTML(markdownToHtml(section.summary!))}</div>
						</div>
					</div>
				` : nothing}
			</uui-box>
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

		const hasContent = this._areaDetection !== null || this._extraction !== null;

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
				overflow-x: hidden;
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
				flex: 1;
			}

			.box-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: var(--uui-size-space-2);
				min-height: 180px;
			}

			.box-buttons {
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-icon {
				font-size: 48px;
				color: var(--uui-color-text-alt);
				margin-top: var(--uui-size-space-3);
			}

			.box-headline-row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
			}

			.box-headline-meta {
				font-size: var(--uui-type-small-size);
				font-weight: 400;
				color: var(--uui-color-text-alt);
			}

			.box-filename {
				font-weight: 600;
				font-size: var(--uui-type-default-size) !important;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100%;
			}

			.box-buttons {
				display: flex;
				gap: var(--uui-size-space-2);
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-stat {
				font-size: var(--uui-type-h4-size);
				font-weight: 700;
				color: var(--uui-color-text);
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}


			/* Collapse row below boxes */
			.collapse-row {
				display: flex;
				justify-content: flex-end;
				padding: 0 var(--uui-size-space-4) var(--uui-size-space-2);
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

			/* Tree-style header for page boxes */
			.tree-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				cursor: pointer;
			}

			.tree-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.page-title {
				font-size: var(--uui-type-default-size);
			}

			/* Consistent collapse chevron across all levels */
			.collapse-chevron {
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
				font-size: 12px;
			}

			.level-icon {
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
				font-size: 12px;
			}

			/* Detected areas (Level 2) */
			.detected-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-4) 0;
				margin-left: var(--uui-size-space-3);
			}

			.detected-area.area-excluded {
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

			.area-name {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			/* Sections within detected areas (Level 3) */
			.area-section {
				margin-left: var(--uui-size-space-3);
			}

			.area-section + .area-section {
				border-top: 1px solid var(--uui-color-border);
			}

			.section-heading {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				cursor: pointer;
				overflow: hidden;
			}

			.section-heading:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.section-heading:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.heading-text {
				font-weight: 600;
				flex: 1;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.collapse-chevron.placeholder {
				opacity: 0;
				pointer-events: none;
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
			.area-section.excluded {
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
				overflow-wrap: break-word;
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

			.meta-badge.text-type.heading {
				color: var(--uui-color-current);
			}

			.meta-badge.text-type.list {
				color: var(--uui-color-positive);
			}

			.meta-badge.font-size {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.meta-badge.text-case {
				font-weight: 500;
				text-transform: uppercase;
				font-size: 10px;
				letter-spacing: 0.5px;
				color: var(--uui-color-text-alt);
			}

			.mapped-tag {
				font-size: 12px;
			}

			.unmap-x {
				all: unset;
				cursor: pointer;
				font-size: 14px;
				line-height: 1;
				padding: 0 2px;
				margin-left: 4px;
				opacity: 0.7;
				font-weight: 700;
			}

			.unmap-x:hover {
				opacity: 1;
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

			.pattern-badge.role {
				background: var(--uui-color-current-emphasis);
				color: var(--uui-color-current-contrast);
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

			/* Section picker popover */
			.section-picker-meta {
				font-size: 11px;
				font-family: monospace;
				color: var(--uui-color-text-alt);
			}

			/* Structure badge on area header */
			.structure-badge {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-weight: 500;
			}

			/* Rules badge on area header */
			.rules-badge {
				background: var(--uui-color-default-emphasis);
				color: var(--uui-color-default-contrast);
				font-weight: 500;
			}

			/* Composed sections (Phase 1b — areas with rules) */
			.composed-sections {
				margin-left: var(--uui-size-space-3);
			}

			.composed-section-row {
				display: flex;
				flex-direction: column;
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.composed-section-row:last-child {
				border-bottom: none;
			}

			.composed-section-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
			}

			.composed-section-header:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.composed-section-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.composed-role {
				font-weight: 600;
				color: var(--uui-color-text);
				flex-shrink: 0;
			}

			.composed-section-content {
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text-alt);
				padding: var(--uui-size-space-2) var(--uui-size-space-3) var(--uui-size-space-3);
				padding-left: calc(var(--uui-size-space-3) + 12px + var(--uui-size-space-2));
			}

			.composed-unmapped {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-style: italic;
				white-space: nowrap;
			}

			/* Teach-by-example mode */
			.area-teaching {
				border-left-width: 4px;
				border-left-style: solid;
				box-shadow: 0 0 0 1px var(--uui-color-focus);
				border-radius: var(--uui-border-radius);
			}

			.teach-toolbar {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.teach-instruction {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.teach-toolbar-actions {
				display: flex;
				gap: var(--uui-size-space-2);
			}

			.teach-confirmation {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.teach-confirmation-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				font-size: var(--uui-type-small-size);
			}

			.teach-condition-summary {
				font-family: monospace;
				font-size: 11px;
				opacity: 0.8;
			}

			.teach-confirmation-actions {
				display: flex;
				gap: var(--uui-size-space-2);
			}

			.teach-elements {
				padding-left: var(--uui-size-space-3);
			}

			.teach-element {
				cursor: pointer;
				transition: background-color 0.15s;
			}

			.teach-element:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.teach-element.teach-clicked {
				background: color-mix(in srgb, var(--uui-color-focus) 15%, transparent);
				border-left: 3px solid var(--uui-color-focus);
			}

			.teach-element.teach-matched {
				background: color-mix(in srgb, var(--uui-color-positive) 10%, transparent);
				border-left: 3px solid var(--uui-color-positive);
			}

			.teach-element.teach-clicked.teach-matched {
				background: color-mix(in srgb, var(--uui-color-focus) 15%, transparent);
				border-left: 3px solid var(--uui-color-focus);
			}

			/* Transformed area section container */
			.tx-area-sections {
				padding: 0 var(--uui-size-space-3);
			}

			/* Section boxes */
			.md-section-box {
				margin-bottom: var(--uui-size-space-3);
			}

			/* Part rows within section boxes (ungrouped: horizontal layout) */
			.md-part-row {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-3) 0;
			}

			.md-part-row-bordered {
				border-top: 1px solid var(--uui-color-border);
			}

			/* Part blocks within grouped section boxes (vertical layout: label row above content) */
			.md-part-block {
				padding: var(--uui-size-space-4) 0;
			}

			.md-part-block:first-child {
				padding-top: 0;
			}

			.md-part-block-bordered {
				border-top: 1px solid var(--uui-color-border);
			}

			.md-part-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: var(--uui-size-space-2);
			}

			.md-part-content {
				flex: 1;
				min-width: 0;
				max-width: 75ch;
			}

			.md-part-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				flex-shrink: 0;
				margin-left: auto;
			}

			/* Map button — hidden by default, shown on box hover */
			.md-map-btn {
				opacity: 0;
				transition: opacity 0.15s;
			}

			.md-section-box:hover .md-map-btn {
				opacity: 1;
			}

			.md-section-content {
				line-height: 1.75;
				color: var(--uui-color-text);
				font-size: 15px;
			}

			/* Headings */
			.md-section-content h1 {
				font-size: 2em;
				font-weight: 700;
				margin: 0.67em 0 0.4em;
				line-height: 1.25;
				color: var(--uui-color-text);
			}

			.md-section-content h2 {
				font-size: 1.5em;
				font-weight: 600;
				margin: 1em 0 0.4em;
				padding-bottom: 0.3em;
				border-bottom: 1px solid var(--uui-color-border);
				line-height: 1.3;
				color: var(--uui-color-text);
			}

			.md-section-content h3 {
				font-size: 1.25em;
				font-weight: 600;
				margin: 0.8em 0 0.3em;
				line-height: 1.35;
				color: var(--uui-color-text);
			}

			.md-section-content h4 {
				font-size: 1.1em;
				font-weight: 600;
				margin: 0.6em 0 0.25em;
				color: var(--uui-color-text);
			}

			.md-section-content h5,
			.md-section-content h6 {
				font-size: 1em;
				font-weight: 600;
				margin: 0.5em 0 0.2em;
				color: var(--uui-color-text-alt);
			}

			/* Paragraphs */
			.md-section-content p {
				margin: 0.5em 0;
			}

			/* Lists */
			.md-section-content ul,
			.md-section-content ol {
				padding-left: 1.75em;
				margin: 0.5em 0;
			}

			.md-section-content li {
				margin: 0.2em 0;
			}

			.md-section-content ul li::marker {
				color: var(--uui-color-text-alt);
			}

			/* Blockquotes */
			.md-section-content blockquote {
				margin: 0.5em 0;
				padding: 0.25em 1em;
				border-left: 3px solid var(--uui-color-current);
				color: var(--uui-color-text-alt);
				background: color-mix(in srgb, var(--uui-color-current) 5%, transparent);
				border-radius: 0 var(--uui-border-radius) var(--uui-border-radius) 0;
			}

			.md-section-content blockquote p {
				margin: 0.25em 0;
			}

			/* Inline styles */
			.md-section-content strong {
				font-weight: 700;
				color: var(--uui-color-text);
			}

			.md-section-content em {
				font-style: italic;
			}

			.md-section-content code {
				font-family: monospace;
				font-size: 0.9em;
				padding: 0.1em 0.35em;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-danger);
			}

			.md-section-content mark {
				background: color-mix(in srgb, var(--uui-color-warning) 30%, transparent);
				padding: 0.1em 0.2em;
				border-radius: 2px;
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
