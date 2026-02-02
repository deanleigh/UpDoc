import { UmbModalToken } from '@umbraco-cms/backoffice/modal';
import type { PropertyMapping } from './map-file.types.js';

export type SourceType = 'pdf' | 'web' | 'doc';

export interface UmbUpDocModalData {
	unique: string | null;
	blueprintName: string;
	blueprintId: string;
}

export interface UmbUpDocModalValue {
	name: string;
	sourceType: SourceType;
	mediaUnique: string | null;
	sourceUrl: string | null;
	extractedSections: Record<string, string>;
	propertyMappings: PropertyMapping[];
}

export const UMB_UP_DOC_MODAL = new UmbModalToken<UmbUpDocModalData, UmbUpDocModalValue>(
	'UpDoc.Modal',
	{
		modal: {
			type: 'sidebar',
			size: 'small',
		},
	},
);
