import { UMB_UP_DOC_MODAL } from './up-doc-modal.token.js';
import { UMB_BLUEPRINT_PICKER_MODAL } from './blueprint-picker-modal.token.js';
import type { DocumentTypeOption } from './blueprint-picker-modal.token.js';
import type { PropertyMapping } from './map-file.types.js';
import { markdownToHtml, buildRteValue } from './transforms.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';

export class UpDocEntityAction extends UmbEntityActionBase<never> {
	#documentTypeStructureRepository = new UmbDocumentTypeStructureRepository(this);
	#blueprintItemRepository = new UmbDocumentBlueprintItemRepository(this);
	#documentItemRepository = new UmbDocumentItemRepository(this);

	constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
		super(host, args);
	}

	override async execute() {
		const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);
		const parentUnique = this.args.unique ?? null;

		try {
			// Step 1: Get the parent document's document type
			let parentDocTypeUnique: string | null = null;

			if (parentUnique) {
				const { data: parentItems } = await this.#documentItemRepository.requestItems([parentUnique]);
				if (parentItems?.length) {
					parentDocTypeUnique = parentItems[0].documentType.unique;
				}
			}

			// Step 2: Get allowed child document types
			const result = await this.#documentTypeStructureRepository.requestAllowedChildrenOf(
				parentDocTypeUnique,
				parentUnique
			);
			const allowedTypes = result.data;

			if (!allowedTypes?.items?.length) {
				notificationContext.peek('danger', {
					data: { message: 'No document types are allowed as children of this page.' },
				});
				return;
			}

			// Step 3: Discover blueprints for allowed child types, grouped by document type
			const documentTypeOptions: DocumentTypeOption[] = [];

			for (const docType of allowedTypes.items) {
				const { data: blueprints } = await this.#blueprintItemRepository.requestItemsByDocumentType(docType.unique);
				if (blueprints?.length) {
					documentTypeOptions.push({
						documentTypeUnique: docType.unique,
						documentTypeName: docType.name,
						documentTypeIcon: (docType as { icon?: string }).icon ?? null,
						blueprints: blueprints.map((bp) => ({
							blueprintUnique: bp.unique,
							blueprintName: bp.name,
						})),
					});
				}
			}

			// Step 4: Open blueprint picker dialog (doc type → blueprint selection)
			let blueprintSelection;
			try {
				blueprintSelection = await umbOpenModal(this, UMB_BLUEPRINT_PICKER_MODAL, {
					data: { documentTypes: documentTypeOptions },
				});
			} catch {
				// Dialog was cancelled
				return;
			}

			const { blueprintUnique, documentTypeUnique } = blueprintSelection;
			const selectedDocType = documentTypeOptions.find((dt) => dt.documentTypeUnique === documentTypeUnique);
			const selectedBlueprint = selectedDocType?.blueprints.find((bp) => bp.blueprintUnique === blueprintUnique);

			console.log('Selected blueprint:', blueprintUnique, 'Document type:', documentTypeUnique);

			// Step 5: Open source sidebar modal (passes blueprintId for map file lookup)
			let modalValue;
			try {
				modalValue = await umbOpenModal(this, UMB_UP_DOC_MODAL, {
					data: {
						unique: parentUnique,
						blueprintName: selectedBlueprint?.blueprintName ?? '',
						blueprintId: blueprintUnique,
					},
				});
			} catch {
				// Modal was cancelled
				return;
			}

			const { name, mediaUnique, extractedSections, propertyMappings } = modalValue;

			if (!mediaUnique || !name) {
				return;
			}

			console.log('Creating document with:', { name, sections: Object.keys(extractedSections) });

			// Step 6: Scaffold from the selected blueprint
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			const scaffoldResponse = await fetch(
				`/umbraco/management/api/v1/document-blueprint/${blueprintUnique}/scaffold`,
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

			// Step 7: Apply property mappings from the map file
			const values = scaffold.values ? [...scaffold.values] : [];

			const setValue = (alias: string, value: string) => {
				const existing = values.find((v: { alias: string }) => v.alias === alias);
				if (existing) {
					existing.value = value;
				} else {
					values.push({ alias, value });
				}
			};

			// Apply each mapping from the map file
			for (const mapping of propertyMappings) {
				const sectionValue = extractedSections[mapping.from.sectionType];
				if (!sectionValue) continue;

				if (mapping.to.blockGrid) {
					// Block grid mapping
					this.#applyBlockMapping(values, mapping, sectionValue);
				} else if (mapping.to.property) {
					// Simple property mapping
					setValue(mapping.to.property, sectionValue);

					// Also map to additional properties
					if (mapping.to.alsoMapTo) {
						for (const alias of mapping.to.alsoMapTo) {
							setValue(alias, sectionValue);
						}
					}
				}
			}

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

			// Step 8: Create the document
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

			// Step 9: Save the document to properly persist it and trigger cache updates
			if (newDocumentId) {
				const getResponse = await fetch(`/umbraco/management/api/v1/document/${newDocumentId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (getResponse.ok) {
					const documentData = await getResponse.json();
					console.log('Fetched document for save:', documentData);

					const saveResponse = await fetch(`/umbraco/management/api/v1/document/${newDocumentId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(documentData),
					});

					if (saveResponse.ok) {
						console.log('Document saved successfully');
					} else {
						console.warn('Document save failed, but document was created:', await saveResponse.text());
					}
				} else {
					console.warn('Could not fetch document for save:', await getResponse.text());
				}
			}

			notificationContext.peek('positive', {
				data: { message: `Document "${name}" created successfully!` },
			});

			// Navigate to the new document after a short delay
			if (newDocumentId) {
				const newPath = `/umbraco/section/content/workspace/document/edit/${newDocumentId}`;
				setTimeout(() => {
					window.location.href = newPath;
				}, 150);
			}

		} catch (error) {
			console.error('Error creating document:', error);
			notificationContext.peek('danger', {
				data: { message: 'An unexpected error occurred while creating the document.' },
			});
		}
	}

	/**
	 * Applies a block grid mapping from a map file property mapping definition.
	 * Finds a block within the grid by searching for a property value match,
	 * then writes the extracted content to the target property within that block.
	 */
	#applyBlockMapping(
		values: Array<{ alias: string; value: unknown }>,
		mapping: PropertyMapping,
		sectionValue: string
	) {
		const gridAlias = mapping.to.blockGrid;
		const blockSearch = mapping.to.blockSearch;
		const targetProperty = mapping.to.targetProperty;

		if (!gridAlias || !blockSearch || !targetProperty) return;

		const contentGridValue = values.find((v) => v.alias === gridAlias);
		if (!contentGridValue || !contentGridValue.value) {
			console.log(`No ${gridAlias} found in scaffold values`);
			return;
		}

		try {
			const wasString = typeof contentGridValue.value === 'string';
			const contentGrid = wasString
				? JSON.parse(contentGridValue.value as string)
				: contentGridValue.value;

			const contentData = contentGrid.contentData as Array<{
				contentTypeKey: string;
				key: string;
				values: Array<{ alias: string; value: unknown }>;
			}>;

			if (!contentData) {
				console.log(`No contentData in ${gridAlias}`);
				return;
			}

			// Search for the matching block
			let foundBlock = false;
			for (const block of contentData) {
				const searchValue = block.values?.find((v) => v.alias === blockSearch.property);

				if (searchValue && typeof searchValue.value === 'string' &&
					searchValue.value.toLowerCase().includes(blockSearch.value.toLowerCase())) {

					console.log(`Found matching block for "${blockSearch.value}":`, block.key);
					foundBlock = true;

					const targetValue = block.values?.find((v) => v.alias === targetProperty);
					if (targetValue) {
						if (mapping.to.convertMarkdown) {
							const htmlContent = markdownToHtml(sectionValue);
							targetValue.value = buildRteValue(htmlContent);
						} else {
							targetValue.value = sectionValue;
						}
						console.log(`Updated ${targetProperty} in block`);
					}
					break;
				}
			}

			if (!foundBlock) {
				console.log(`WARNING: Did not find a block matching ${blockSearch.property} = "${blockSearch.value}"`);
			}

			contentGridValue.value = wasString ? JSON.stringify(contentGrid) : contentGrid;
		} catch (error) {
			console.error(`Failed to apply block mapping to ${gridAlias}:`, error);
		}
	}
}

export default UpDocEntityAction;
