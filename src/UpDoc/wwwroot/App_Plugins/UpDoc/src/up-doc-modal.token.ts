import { UmbModalToken } from '@umbraco-cms/backoffice/modal';
import type { DocumentTypeConfig } from './map-file.types.js';

export type SourceType = 'pdf' | 'markdown' | 'web' | 'doc';

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
	config: DocumentTypeConfig | null;
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
