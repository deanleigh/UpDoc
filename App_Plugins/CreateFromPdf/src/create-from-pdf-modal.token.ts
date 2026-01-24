import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface UmbCreateFromPdfModalData {
	unique: string | null;
}

export interface UmbCreateFromPdfModalValue {
	name: string;
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
