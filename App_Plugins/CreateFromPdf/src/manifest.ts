export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'entityAction',
		kind: 'default',
		alias: 'CreateFromPdf.EntityAction',
		name: 'Create from PDF Entity Action',
		weight: 1100,
		api: () => import('./create-from-pdf-action.js'),
		forEntityTypes: ['document'],
		meta: {
			icon: 'icon-document',
			label: 'Create from PDF',
		},
	},
	{
		type: 'modal',
		alias: 'CreateFromPdf.Modal',
		name: 'Create from PDF Modal',
		element: () => import('./create-from-pdf-modal.element.js'),
	},
];
