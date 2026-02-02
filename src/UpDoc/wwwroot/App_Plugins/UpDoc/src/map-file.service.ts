import type { MapFile, ExtractSectionsResponse } from './map-file.types.js';

const mapFileCache = new Map<string, MapFile>();

export async function fetchMapFile(blueprintId: string, token: string): Promise<MapFile | null> {
	const cached = mapFileCache.get(blueprintId);
	if (cached) return cached;

	const response = await fetch(
		`/umbraco/management/api/v1/updoc/maps/${blueprintId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		console.warn(`No map file found for blueprint ${blueprintId}`);
		return null;
	}

	const mapFile: MapFile = await response.json();
	mapFileCache.set(blueprintId, mapFile);
	return mapFile;
}

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

	return response.json();
}
