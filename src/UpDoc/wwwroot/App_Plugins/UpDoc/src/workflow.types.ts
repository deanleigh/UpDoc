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
	| 'firstHeading'
	| 'firstParagraph'
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

	// firstHeading (markdown)
	level?: number;

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
	blockKey?: string;
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
	sources: Record<string, SourceConfig>;
	destination: DestinationConfig;
	map: MapConfig;
}

// ============================================================================
// Rich Extraction Types (sample-extraction.json)
// ============================================================================

export interface RichExtractionResult {
	version: string;
	sourceType: string;
	source: ExtractionSource;
	elements: ExtractionElement[];
}

export interface ExtractionSource {
	fileName: string;
	mediaKey: string;
	extractedDate: string;
	totalPages: number;
}

export interface ExtractionElement {
	id: string;
	page: number;
	text: string;
	metadata: ElementMetadata;
}

export interface ElementMetadata {
	fontSize: number;
	fontName: string;
	position: { x: number; y: number };
	boundingBox: { left: number; top: number; width: number; height: number };
	color: string;
}

// ============================================================================
// Visual Grouping Types (frontend-only, computed from extraction metadata)
// ============================================================================

export interface VisualGroup {
	heading: ExtractionElement | null;
	children: ExtractionElement[];
}

// ============================================================================
// Zone Detection Types (zone-detection.json — area-based hierarchical extraction)
// ============================================================================

export interface ZoneDetectionResult {
	pages: PageZones[];
	diagnostics: ZoneDiagnosticInfo;
}

export interface PageZones {
	page: number;
	zones: DetectedZone[];
	unzonedContent: DetectedZone | null;
}

export interface DetectedZone {
	color: string;
	boundingBox: { left: number; top: number; width: number; height: number };
	page: number;
	sections: DetectedSection[];
	totalElements: number;
}

export interface DetectedSection {
	heading: ZoneElement | null;
	children: ZoneElement[];
}

export interface ZoneElement {
	id: string;
	text: string;
	fontSize: number;
	fontName: string;
	color: string;
	boundingBox: { left: number; top: number; width: number; height: number };
}

export interface ZoneDiagnosticInfo {
	totalPathsFound: number;
	pathsAfterFiltering: number;
	zonesDetected: number;
	elementsZoned: number;
	elementsUnzoned: number;
}

// ============================================================================
// Transform Result Types (transform.json — assembled Markdown per section)
// ============================================================================

export interface TransformResult {
	version: string;
	sections: TransformedSection[];
	diagnostics: TransformDiagnostics;
}

export interface TransformedSection {
	id: string;
	originalHeading: string | null;
	heading: string | null;
	content: string;
	pattern: 'bulletList' | 'paragraph' | 'subHeaded' | 'preamble' | 'mixed';
	page: number;
	zoneColor: string | null;
	childCount: number;
	included: boolean;
}

export interface TransformDiagnostics {
	totalSections: number;
	bulletListSections: number;
	paragraphSections: number;
	subHeadedSections: number;
	preambleSections: number;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ExtractSectionsResponse {
	sections: Record<string, string>;
	config: DocumentTypeConfig;
}
