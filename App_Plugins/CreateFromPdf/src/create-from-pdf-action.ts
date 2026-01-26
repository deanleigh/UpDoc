import { UMB_CREATE_FROM_PDF_MODAL } from './create-from-pdf-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';

export class CreateFromPdfEntityAction extends UmbEntityActionBase<never> {
	#documentTypeStructureRepository = new UmbDocumentTypeStructureRepository(this);
	#blueprintItemRepository = new UmbDocumentBlueprintItemRepository(this);
	#documentItemRepository = new UmbDocumentItemRepository(this);

	constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
		super(host, args);
	}

	override async execute() {
		const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);
		const parentUnique = this.args.unique ?? null;

		// Open modal and get values (PDF extraction happens in modal)
		let modalValue;
		try {
			modalValue = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
				data: { unique: parentUnique },
			});
		} catch {
			// Modal was cancelled
			return;
		}

		const { name, mediaUnique, pageTitle, pageTitleShort, pageDescription } = modalValue;

		if (!mediaUnique || !name) {
			return;
		}

		console.log('Creating document with:', { name, pageTitle, pageTitleShort, pageDescription });

		try {
			// Step 1: Get the parent document's document type
			let parentDocTypeUnique: string | null = null;

			if (parentUnique) {
				console.log('Getting parent document info for:', parentUnique);
				const { data: parentItems } = await this.#documentItemRepository.requestItems([parentUnique]);
				console.log('Parent items:', parentItems);

				if (parentItems?.length) {
					parentDocTypeUnique = parentItems[0].documentType.unique;
					console.log('Parent document type unique:', parentDocTypeUnique);
				}
			}

			// Step 2: Get allowed child document types for the parent's document type
			console.log('Getting allowed children for docType:', parentDocTypeUnique, 'parent:', parentUnique);
			const result = await this.#documentTypeStructureRepository.requestAllowedChildrenOf(
				parentDocTypeUnique,
				parentUnique
			);
			console.log('Full result from requestAllowedChildrenOf:', result);
			const allowedTypes = result.data;
			console.log('Allowed types data:', allowedTypes);

			if (!allowedTypes?.items?.length) {
				console.log('No allowed types found, items:', allowedTypes?.items);
				notificationContext.peek('danger', {
					data: { message: 'No document types are allowed as children of this page.' },
				});
				return;
			}

			console.log('Allowed document types:', allowedTypes.items);

			// Step 2: Get blueprints for the allowed document types
			let blueprint = null;
			let documentTypeUnique = null;

			for (const docType of allowedTypes.items) {
				const { data: blueprints } = await this.#blueprintItemRepository.requestItemsByDocumentType(docType.unique);
				if (blueprints?.length) {
					blueprint = blueprints[0]; // Use first available blueprint
					documentTypeUnique = docType.unique;
					break;
				}
			}

			if (!blueprint) {
				notificationContext.peek('danger', {
					data: { message: 'No blueprint found for allowed document types. Please create a blueprint first.' },
				});
				return;
			}

			console.log('Using blueprint:', blueprint.name, blueprint.unique);
			console.log('Document type:', documentTypeUnique);

			// Step 3: Scaffold from the blueprint to get default values
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			const scaffoldResponse = await fetch(
				`/umbraco/management/api/v1/document-blueprint/${blueprint.unique}/scaffold`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!scaffoldResponse.ok) {
				const error = await scaffoldResponse.json();
				console.error('Scaffold failed:', error);
				notificationContext.peek('danger', {
					data: { message: `Failed to scaffold from blueprint: ${error.title || 'Unknown error'}` },
				});
				return;
			}

			const scaffold = await scaffoldResponse.json();
			console.log('Scaffold response:', scaffold);

			// Step 4: Build the document creation request
			// Start with scaffold values and override with PDF-extracted values
			const values = scaffold.values ? [...scaffold.values] : [];

			// Helper to set or update a value
			const setValue = (alias: string, value: string) => {
				const existing = values.find((v: { alias: string }) => v.alias === alias);
				if (existing) {
					existing.value = value;
				} else {
					values.push({ alias, value });
				}
			};

			// Set the PDF-extracted properties
			setValue('pageTitle', pageTitle);
			setValue('pageTitleShort', pageTitleShort);
			setValue('pageDescription', pageDescription);

			// Build the create request
			const createRequest = {
				parent: parentUnique ? { id: parentUnique } : null,
				documentType: { id: documentTypeUnique },
				template: scaffold.template ? { id: scaffold.template.id } : null,
				values,
				variants: [
					{
						name,
						culture: null,
						segment: null,
					},
				],
			};

			console.log('Create request:', JSON.stringify(createRequest, null, 2));

			// Step 5: Create the document
			const createResponse = await fetch('/umbraco/management/api/v1/document', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(createRequest),
			});

			if (!createResponse.ok) {
				const error = await createResponse.json();
				console.error('Document creation failed:', error);
				notificationContext.peek('danger', {
					data: { message: `Failed to create document: ${error.title || error.detail || 'Unknown error'}` },
				});
				return;
			}

			// Success!
			const locationHeader = createResponse.headers.get('Location');
			const newDocumentId = locationHeader?.split('/').pop();

			console.log('Document created successfully! ID:', newDocumentId);

			notificationContext.peek('positive', {
				data: { message: `Document "${name}" created successfully!` },
			});

			// Refresh the tree to show the new document
			// TODO: This could be improved to navigate to the new document
			window.location.reload();

		} catch (error) {
			console.error('Error creating document:', error);
			notificationContext.peek('danger', {
				data: { message: 'An unexpected error occurred while creating the document.' },
			});
		}
	}
}

export default CreateFromPdfEntityAction;
