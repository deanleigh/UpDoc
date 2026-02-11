import type { DocumentTypeConfig, ExtractSectionsResponse, MapConfig, RichExtractionResult } from './workflow.types.js';

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
 * Clears all caches. Useful when configs have been modified.
 */
export function clearConfigCache(): void {
	configCache.clear();
	activeWorkflowsCache = null;
	activeWorkflowsPromise = null;
}
