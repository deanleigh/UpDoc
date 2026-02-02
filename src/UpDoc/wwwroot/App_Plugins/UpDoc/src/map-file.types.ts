export interface MapFile {
	name: string;
	documentTypeAlias: string;
	blueprintId?: string;
	sourceTypes: SourceTypes;
	propertyMappings: PropertyMapping[];
}

export interface SourceTypes {
	pdf?: SourceTypeConfig;
	web?: SourceTypeConfig;
	word?: SourceTypeConfig;
}

export interface SourceTypeConfig {
	enabled: boolean;
	extraction?: PdfExtractionRules;
}

export interface PdfExtractionRules {
	columnDetection?: {
		enabled: boolean;
		thresholdPercent: number;
	};
	titleDetection?: {
		fontSizeThreshold: number;
	};
	descriptionPattern?: string;
	content?: {
		startPattern?: string;
		stopPatterns?: string[];
		headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
	};
}

export interface PropertyMapping {
	from: MappingSource;
	to: MappingTarget;
}

export interface MappingSource {
	sectionType: string;
}

export interface MappingTarget {
	property?: string;
	alsoMapTo?: string[];
	blockGrid?: string;
	blockSearch?: BlockSearchConfig;
	targetProperty?: string;
	convertMarkdown?: boolean;
}

export interface BlockSearchConfig {
	property: string;
	value: string;
}

export interface ExtractSectionsResponse {
	sections: Record<string, string>;
	propertyMappings: PropertyMapping[];
}
