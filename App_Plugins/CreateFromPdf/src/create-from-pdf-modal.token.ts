import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export type SourceType = 'pdf' | 'web' | 'doc';

export interface UmbCreateFromPdfModalData {
	unique: string | null;
}

export interface UmbCreateFromPdfModalValue {
	name: string;
	sourceType: SourceType;
	mediaUnique: string | null;
	sourceUrl: string | null;
	pageTitle: string;
	pageTitleShort: string;
	pageDescription: string;
	itineraryContent: string;
}

export const UMB_CREATE_FROM_PDF_MODAL = new UmbModalToken<UmbCreateFromPdfModalData, UmbCreateFromPdfModalValue>(
	'CreateFromPdf.Modal',
	{
		modal: {
			type: 'sidebar',
			size: 'small',
		},
	},
);
