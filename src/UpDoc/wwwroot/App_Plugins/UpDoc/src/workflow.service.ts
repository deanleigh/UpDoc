import type { DocumentTypeConfig, ExtractSectionsResponse, MapConfig, RichExtractionResult, TransformResult, ZoneDetectionResult } from './workflow.types.js';

const configCache = new Map<string, DocumentTypeConfig>();

export interface ActiveWorkflows {
	documentTypeAliases: string[];
	blueprintIds: string[];
}

let activeWorkflowsCache: ActiveWorkflows | null = null;
let activeWorkflowsPromise: Promise<ActiveWorkflows> | null = null;

/**
 * Fetches the list of document type aliases and blueprint IDs
 * that have complete workflows configured. Cached globally.
 */
export async function fetchActiveWorkflows(token: string): Promise<ActiveWorkflows> {
	if (activeWorkflowsCache) return activeWorkflowsCache;

	if (!activeWorkflowsPromise) {
		activeWorkflowsPromise = (async () => {
			try {
				const response = await fetch('/umbraco/management/api/v1/updoc/workflows/active', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					activeWorkflowsCache = await response.json();
				} else {
					activeWorkflowsCache = { documentTypeAliases: [], blueprintIds: [] };
				}
			} catch {
				activeWorkflowsCache = { documentTypeAliases: [], blueprintIds: [] };
			}
			activeWorkflowsPromise = null;
			return activeWorkflowsCache!;
		})();
	}

	return activeWorkflowsPromise;
}

/**
 * Fetches the document type config for a given blueprint ID.
 * The config contains source.json, destination.json, and map.json data.
 */
export async function fetchConfig(blueprintId: string, token: string): Promise<DocumentTypeConfig | null> {
	const cached = configCache.get(blueprintId);
	if (cached) return cached;

	const response = await fetch(
		`/umbraco/management/api/v1/updoc/config/${blueprintId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		console.warn(`No config found for blueprint ${blueprintId}`);
		return null;
	}

	const config: DocumentTypeConfig = await response.json();
	configCache.set(blueprintId, config);
	return config;
}

/**
 * Extracts sections from a source document using the config for the given blueprint.
 * Returns extracted sections and the full config for property mapping.
 */
export async function extractSections(
	mediaKey: string,
	blueprintId: string,
	token: string,
	sourceType: string = 'pdf'
): Promise<ExtractSectionsResponse | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${mediaKey}&blueprintId=${blueprintId}&sourceType=${sourceType}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error('Extract sections failed:', error);
		return null;
	}

	// API returns { sections, config } - pass through directly
	return response.json();
}

/**
 * Fetches the full config for a workflow by its folder name.
 * Returns source, destination, and map configs.
 */
export async function fetchWorkflowByName(name: string, token: string): Promise<DocumentTypeConfig | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(name)}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		console.warn(`No workflow found with name "${name}"`);
		return null;
	}

	return response.json();
}

/**
 * Fetches the sample extraction for a workflow, if it exists.
 */
export async function fetchSampleExtraction(
	workflowName: string,
	token: string
): Promise<RichExtractionResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/sample-extraction`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) return null;
	return response.json();
}

/**
 * Triggers a sample extraction for a workflow from a media item (PDF).
 * The extraction is saved to sample-extraction.json in the workflow folder.
 */
export async function triggerSampleExtraction(
	workflowName: string,
	mediaKey: string,
	token: string
): Promise<RichExtractionResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/sample-extraction`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ mediaKey }),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error('Sample extraction failed:', error);
		return null;
	}

	return response.json();
}

/**
 * Runs a standalone rich extraction from a media item (PDF) without saving to a workflow.
 * Used for validation/preview before the workflow folder exists.
 */
export async function extractRich(
	mediaKey: string,
	token: string
): Promise<RichExtractionResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/extract-rich?mediaKey=${mediaKey}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) return null;
	return response.json();
}

/**
 * Fetches the zone detection result for a workflow, if it exists.
 */
export async function fetchZoneDetection(
	workflowName: string,
	token: string
): Promise<ZoneDetectionResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/zone-detection`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) return null;
	return response.json();
}

/**
 * Triggers zone detection for a workflow from a media item (PDF).
 * The result is saved to zone-detection.json in the workflow folder.
 */
export async function triggerZoneDetection(
	workflowName: string,
	mediaKey: string,
	token: string
): Promise<ZoneDetectionResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/zone-detection`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ mediaKey }),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error('Zone detection failed:', error);
		return null;
	}

	return response.json();
}

/**
 * Fetches the transform result for a workflow, if it exists.
 */
export async function fetchTransformResult(
	workflowName: string,
	token: string
): Promise<TransformResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/transform`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) return null;
	return response.json();
}

/**
 * Triggers zone detection + transform for a workflow from a media item (PDF).
 * The result is saved to transform.json (and zone-detection.json) in the workflow folder.
 */
export async function triggerTransform(
	workflowName: string,
	mediaKey: string,
	token: string
): Promise<TransformResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/transform`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ mediaKey }),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error('Transform failed:', error);
		return null;
	}

	return response.json();
}

/**
 * Runs zone detection + transform on a media item without saving to disk.
 * Returns a TransformResult with include/exclude state from the stored transform.
 */
export async function transformAdhoc(
	workflowName: string,
	mediaKey: string,
	token: string
): Promise<TransformResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/transform-adhoc`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ mediaKey }),
		}
	);

	if (!response.ok) return null;
	return response.json();
}

/**
 * Updates the include/exclude state for a single section in transform.json.
 */
export async function updateSectionInclusion(
	workflowName: string,
	sectionId: string,
	included: boolean,
	token: string
): Promise<TransformResult | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/transform/sections/${encodeURIComponent(sectionId)}/included`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ included }),
		}
	);

	if (!response.ok) return null;
	return response.json();
}

/**
 * Saves the map config for a workflow.
 */
export async function saveMapConfig(
	workflowName: string,
	config: MapConfig,
	token: string
): Promise<MapConfig | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/map`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(config),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error('Save map config failed:', error);
		return null;
	}

	clearConfigCache();
	return response.json();
}

/**
 * Saves page selection for a workflow. Pass null or empty array for "all pages".
 */
export async function savePageSelection(
	workflowName: string,
	pages: number[] | null,
	token: string
): Promise<boolean> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/pages`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ pages }),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		console.error('Save page selection failed:', error);
		return false;
	}

	clearConfigCache();
	return true;
}

/**
 * Fetches the source config for a workflow.
 */
export async function fetchSourceConfig(
	workflowName: string,
	token: string
): Promise<import('./workflow.types.js').SourceConfig | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(workflowName)}/source`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) return null;
	return response.json();
}

/**
 * Clears all caches. Useful when configs have been modified.
 */
export function clearConfigCache(): void {
	configCache.clear();
	activeWorkflowsCache = null;
	activeWorkflowsPromise = null;
}
