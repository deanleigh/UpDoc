export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'entityAction',
		kind: 'default',
		alias: 'UpDoc.EntityAction',
		name: 'UpDoc Entity Action',
		weight: 1100,
		api: () => import('./up-doc-action.js'),
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
		alias: 'UpDoc.Modal',
		name: 'UpDoc Modal',
		element: () => import('./up-doc-modal.element.js'),
	},
	{
		type: 'modal',
		alias: 'UpDoc.BlueprintPickerModal',
		name: 'Blueprint Picker Modal',
		element: () => import('./blueprint-picker-modal.element.js'),
	},
];
