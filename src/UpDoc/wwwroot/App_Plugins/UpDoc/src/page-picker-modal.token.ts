import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface PagePickerModalData {
	/** Umbraco media item GUID for the PDF */
	mediaKey: string;
	/** Total number of pages in the PDF */
	totalPages: number;
	/** Currently selected pages, or null for "all" */
	selectedPages: number[] | null;
}

export interface PagePickerModalValue {
	/** Selected page numbers (1-based) */
	selectedPages: number[] | null;
}

export const UMB_PAGE_PICKER_MODAL = new UmbModalToken<PagePickerModalData, PagePickerModalValue>(
	'UpDoc.PagePickerModal',
	{
		modal: {
			type: 'sidebar',
			size: 'medium',
		},
	},
);
