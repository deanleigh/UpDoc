// ============================================================================
// Source Config Types (source.json)
// ============================================================================

export interface SourceConfig {
	version: string;
	sourceTypes: string[];
	globals?: SourceGlobals;
	sections: SourceSection[];
}

export interface SourceGlobals {
	columnDetection?: ColumnDetectionConfig;
	pageRange?: PageRangeConfig;
}

export interface ColumnDetectionConfig {
	enabled: boolean;
	thresholdPercent: number;
}

export interface PageRangeConfig {
	start: number;
	end: number | 'last';
}

export interface SourceSection {
	key: string;
	label: string;
	description?: string;
	strategy: ExtractionStrategy;
	outputFormat: 'text' | 'markdown' | 'html';
	required?: boolean;
	pages?: number[] | 'all';
	columnFilter?: boolean;
	occurrence?: 'first' | 'last' | 'all';
	strategyParams?: StrategyParams;
}

export type ExtractionStrategy =
	| 'largestFont'
	| 'regex'
	| 'betweenPatterns'
	| 'region'
	| 'afterLabel'
	| 'cssSelector'
	| 'xpath';

export interface StrategyParams {
	// largestFont
	fontSizeThreshold?: number;

	// regex
	pattern?: string;
	flags?: string;
	captureGroup?: number;

	// betweenPatterns
	startPattern?: string;
	stopPatterns?: string[];
	includeStartLine?: boolean;
	headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	// region
	region?: RegionConfig;

	// afterLabel
	label?: string;
	labelPattern?: string;
	extractMode?: 'sameLine' | 'nextLine' | 'untilBlank';

	// cssSelector (web)
	selector?: string;
	attribute?: string;

	// xpath (web/Word)
	xpath?: string;
}

export interface RegionConfig {
	x?: { min?: number; max?: number };
	y?: { min?: number; max?: number };
	unit?: 'percent' | 'points';
}

// ============================================================================
// Destination Config Types (destination.json)
// ============================================================================

export interface DestinationConfig {
	version: string;
	documentTypeAlias: string;
	documentTypeName?: string;
	blueprintId?: string;
	blueprintName?: string;
	fields: DestinationField[];
	blockGrids?: DestinationBlockGrid[];
}

export interface DestinationField {
	key: string;
	alias: string;
	label: string;
	description?: string;
	type: FieldType;
	tab?: string;
	mandatory?: boolean;
	acceptsFormats?: ContentFormat[];
}

export type FieldType =
	| 'text'
	| 'textArea'
	| 'richText'
	| 'number'
	| 'date'
	| 'boolean'
	| 'mediaPicker'
	| 'contentPicker'
	| 'blockGrid'
	| 'blockList';

export type ContentFormat = 'text' | 'markdown' | 'html';

export interface DestinationBlockGrid {
	key: string;
	alias: string;
	label: string;
	description?: string;
	blocks: DestinationBlock[];
}

export interface DestinationBlock {
	key: string;
	contentTypeAlias: string;
	contentTypeKey?: string;
	label: string;
	description?: string;
	identifyBy?: BlockIdentifier;
	properties?: BlockProperty[];
}

export interface BlockIdentifier {
	property: string;
	value: string;
}

export interface BlockProperty {
	key: string;
	alias: string;
	label?: string;
	type: FieldType;
	acceptsFormats?: ContentFormat[];
}

// ============================================================================
// Map Config Types (map.json)
// ============================================================================

export interface MapConfig {
	version: string;
	name?: string;
	description?: string;
	mappings: SectionMapping[];
}

export interface SectionMapping {
	source: string;
	destinations: MappingDestination[];
	enabled?: boolean;
	comment?: string;
}

export interface MappingDestination {
	target: string;
	transforms?: MappingTransform[];
}

export interface MappingTransform {
	type: TransformType;
	params?: TransformParams;
}

export type TransformType =
	| 'convertMarkdownToHtml'
	| 'convertHtmlToMarkdown'
	| 'truncate'
	| 'template'
	| 'regex'
	| 'trim'
	| 'uppercase'
	| 'lowercase'
	| 'stripHtml';

export interface TransformParams {
	maxLength?: number;
	suffix?: string;
	template?: string;
	pattern?: string;
	replacement?: string;
}

// ============================================================================
// Combined Document Type Config
// ============================================================================

export interface DocumentTypeConfig {
	folderPath: string;
	documentTypeAlias: string;
	source: SourceConfig;
	destination: DestinationConfig;
	map: MapConfig;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ExtractSectionsResponse {
	sections: Record<string, string>;
	config: DocumentTypeConfig;
	propertyMappings: PropertyMapping[];
}

// ============================================================================
// Legacy PropertyMapping Types (for action compatibility)
// ============================================================================

/**
 * Legacy mapping format used by up-doc-action.ts to apply extracted content.
 * Derived from the three-file config structure at runtime.
 */
export interface PropertyMapping {
	from: {
		sectionType: string;
	};
	to: {
		property?: string;
		blockGrid?: string;
		blockSearch?: {
			property: string;
			value: string;
		};
		targetProperty?: string;
		convertMarkdown?: boolean;
	};
}

/**
 * Converts the new three-file config structure to legacy PropertyMapping array.
 * This bridges the gap between the new config architecture and existing action code.
 */
export function convertConfigToPropertyMappings(config: DocumentTypeConfig): PropertyMapping[] {
	const mappings: PropertyMapping[] = [];

	for (const mapping of config.map.mappings) {
		if (mapping.enabled === false) continue;

		for (const dest of mapping.destinations) {
			const propertyMapping: PropertyMapping = {
				from: { sectionType: mapping.source },
				to: {},
			};

			// Parse the target path to determine if it's a simple field or block path
			const pathParts = dest.target.split('.');

			if (pathParts.length === 1) {
				// Simple field: "pageTitle"
				propertyMapping.to.property = pathParts[0];
			} else if (pathParts.length === 3) {
				// Block path: "contentGrid.itineraryBlock.richTextContent"
				const [gridKey, blockKey, propertyKey] = pathParts;

				// Find the block grid and block in destination config
				const blockGrid = config.destination.blockGrids?.find((g) => g.key === gridKey);
				const block = blockGrid?.blocks.find((b) => b.key === blockKey);

				if (blockGrid && block) {
					propertyMapping.to.blockGrid = blockGrid.alias;
					propertyMapping.to.targetProperty = block.properties?.find((p) => p.key === propertyKey)?.alias ?? propertyKey;

					// Get block identification from destination.json
					if (block.identifyBy) {
						propertyMapping.to.blockSearch = {
							property: block.identifyBy.property,
							value: block.identifyBy.value,
						};
					}
				}
			}

			// Check for markdown conversion transform
			if (dest.transforms?.some((t) => t.type === 'convertMarkdownToHtml')) {
				propertyMapping.to.convertMarkdown = true;
			}

			mappings.push(propertyMapping);
		}
	}

	return mappings;
}
