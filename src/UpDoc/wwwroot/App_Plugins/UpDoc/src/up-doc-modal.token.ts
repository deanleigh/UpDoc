import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export type SourceType = 'pdf' | 'web' | 'doc';

export interface UmbUpDocModalData {
	unique: string | null;
	blueprintName: string;
}

export interface UmbUpDocModalValue {
	name: string;
	sourceType: SourceType;
	mediaUnique: string | null;
	sourceUrl: string | null;
	pageTitle: string;
	pageTitleShort: string;
	pageDescription: string;
	itineraryContent: string;
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
