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
			label: 'Create Document from Source',
		},
		conditions: [
			{
				alias: 'Umb.Condition.EntityIsNotTrashed',
			},
		],
	},
	{
		type: 'modal',
		alias: 'CreateFromPdf.Modal',
		name: 'Create from PDF Modal',
		element: () => import('./create-from-pdf-modal.element.js'),
	},
];
