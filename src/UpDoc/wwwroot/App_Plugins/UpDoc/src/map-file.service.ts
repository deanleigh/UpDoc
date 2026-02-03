import type { DocumentTypeConfig, ExtractSectionsResponse } from './map-file.types.js';
import { convertConfigToPropertyMappings } from './map-file.types.js';

const configCache = new Map<string, DocumentTypeConfig>();

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
	token: string
): Promise<ExtractSectionsResponse | null> {
	const response = await fetch(
		`/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${mediaKey}&blueprintId=${blueprintId}`,
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

	// API returns { sections, config } - we add propertyMappings derived from config
	const apiResponse: { sections: Record<string, string>; config: DocumentTypeConfig } = await response.json();

	return {
		sections: apiResponse.sections,
		config: apiResponse.config,
		propertyMappings: convertConfigToPropertyMappings(apiResponse.config),
	};
}

/**
 * Clears the config cache. Useful when configs have been modified.
 */
export function clearConfigCache(): void {
	configCache.clear();
}
