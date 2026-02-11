import { UMB_UP_DOC_MODAL } from './up-doc-modal.token.js';
import { UMB_BLUEPRINT_PICKER_MODAL } from './blueprint-picker-modal.token.js';
import type { DocumentTypeOption } from './blueprint-picker-modal.token.js';
import type { DocumentTypeConfig, MappingDestination } from './workflow.types.js';
import { fetchActiveWorkflows } from './workflow.service.js';
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
			const authContext = await this.getContext(UMB_AUTH_CONTEXT);
			const token = await authContext.getLatestToken();

			// Fetch active workflows to filter blueprints
			const activeWorkflows = await fetchActiveWorkflows(token);
			const activeBlueprintIds = new Set(activeWorkflows.blueprintIds);

			const documentTypeOptions: DocumentTypeOption[] = [];

			for (const docType of allowedTypes.items) {
				const { data: blueprints } = await this.#blueprintItemRepository.requestItemsByDocumentType(docType.unique);
				if (blueprints?.length) {
					// Only include blueprints that have complete workflows
					const workflowBlueprints = blueprints.filter((bp) => activeBlueprintIds.has(bp.unique));
					if (workflowBlueprints.length) {
						documentTypeOptions.push({
							documentTypeUnique: docType.unique,
							documentTypeName: docType.name,
							documentTypeIcon: (docType as { icon?: string }).icon ?? null,
							blueprints: workflowBlueprints.map((bp) => ({
								blueprintUnique: bp.unique,
								blueprintName: bp.name,
							})),
						});
					}
				}
			}

			if (!documentTypeOptions.length) {
				notificationContext.peek('warning', {
					data: { message: 'No workflows are configured for the document types allowed here.' },
				});
				return;
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
						documentTypeName: selectedDocType?.documentTypeName ?? '',
						blueprintName: selectedBlueprint?.blueprintName ?? '',
						blueprintId: blueprintUnique,
					},
				});
			} catch {
				// Modal was cancelled
				return;
			}

			const { name, mediaUnique, extractedSections, config } = modalValue;

			if (!mediaUnique || !name || !config) {
				return;
			}

			console.log('Creating document with:', { name, sections: Object.keys(extractedSections) });

			// Step 6: Scaffold from the selected blueprint
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
			console.log('Scaffold values aliases:', scaffold.values?.map((v: { alias: string }) => v.alias));

			// Step 7: Apply property mappings from the map file
			// Deep clone to avoid modifying the original scaffold
			const values: Array<{ alias: string; value: unknown }> = scaffold.values
				? JSON.parse(JSON.stringify(scaffold.values))
				: [];

			console.log('Extracted sections available:', Object.keys(extractedSections).length, 'elements');
			console.log('Mappings to apply:', config.map.mappings.map(m => `${m.source} -> ${m.destinations.map(d => d.target).join(', ')}`));

			// Track which fields have been written by our mappings.
			// First write replaces the blueprint default; subsequent writes concatenate.
			const mappedFields = new Set<string>();

			// Apply each mapping from the config
			for (const mapping of config.map.mappings) {
				if (mapping.enabled === false) {
					console.log(`Skipping disabled mapping for source: ${mapping.source}`);
					continue;
				}

				const sectionValue = extractedSections[mapping.source];
				if (!sectionValue) {
					console.log(`No extracted value for source: "${mapping.source}"`);
					continue;
				}

				console.log(`Applying mapping for "${mapping.source}" (${sectionValue.length} chars)`);

				for (const dest of mapping.destinations) {
					this.#applyDestinationMapping(values, dest, sectionValue, config, mappedFields);
				}
			}

			console.log('Values after all mappings applied:');
			for (const v of values) {
				const preview = typeof v.value === 'string'
					? v.value.substring(0, 60)
					: typeof v.value === 'object' ? '[object]' : v.value;
				console.log(`  ${v.alias}: ${preview}`);
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
	 * Applies a single destination mapping from the config.
	 * Handles both simple field mappings and block grid mappings.
	 * mappedFields tracks which fields have been written by our mappings —
	 * first write replaces the blueprint default, subsequent writes concatenate.
	 */
	#applyDestinationMapping(
		values: Array<{ alias: string; value: unknown }>,
		dest: MappingDestination,
		sectionValue: string,
		config: DocumentTypeConfig,
		mappedFields: Set<string>
	) {
		// Apply transforms to the value
		let transformedValue = sectionValue;
		const shouldConvertMarkdown = dest.transforms?.some((t) => t.type === 'convertMarkdownToHtml');

		// Block property with blockKey — find the specific block instance
		if (dest.blockKey) {
			for (const grid of config.destination.blockGrids ?? []) {
				const block = grid.blocks.find((b) => b.key === dest.blockKey);
				if (block?.identifyBy) {
					this.#applyBlockGridValue(values, grid.alias, block.identifyBy, dest.target, transformedValue, shouldConvertMarkdown, mappedFields);
					return;
				}
			}
			console.log(`Block ${dest.blockKey} not found in destination config`);
			return;
		}

		// Parse the target path
		const pathParts = dest.target.split('.');

		if (pathParts.length === 1) {
			// Simple field mapping: "pageTitle"
			const alias = pathParts[0];
			const existing = values.find((v) => v.alias === alias);

			if (existing) {
				if (mappedFields.has(alias)) {
					// Already written by a previous mapping — concatenate (e.g., title split across two lines)
					const currentValue = typeof existing.value === 'string' ? existing.value : '';
					existing.value = `${currentValue} ${transformedValue}`;
				} else {
					// First write — replace the blueprint default
					existing.value = transformedValue;
				}
			} else {
				values.push({ alias, value: transformedValue });
			}
			mappedFields.add(alias);
			console.log(`Set ${alias} = "${String(existing?.value ?? transformedValue).substring(0, 80)}"`);
		} else if (pathParts.length === 3) {
			// Block grid mapping: "contentGrid.itineraryBlock.richTextContent"
			const [gridKey, blockKey, propertyKey] = pathParts;

			// Look up block info from destination config
			const blockGrid = config.destination.blockGrids?.find((g) => g.key === gridKey);
			const block = blockGrid?.blocks.find((b) => b.key === blockKey);

			if (!blockGrid || !block) {
				console.log(`Block path ${dest.target} not found in destination config`);
				return;
			}

			const gridAlias = blockGrid.alias;
			const targetProperty = block.properties?.find((p) => p.key === propertyKey)?.alias ?? propertyKey;
			const blockSearch = block.identifyBy;

			if (!blockSearch) {
				console.log(`No identifyBy for block ${blockKey}`);
				return;
			}

			this.#applyBlockGridValue(values, gridAlias, blockSearch, targetProperty, transformedValue, shouldConvertMarkdown, mappedFields);
		}
	}

	/**
	 * Applies a value to a property within a block grid.
	 * Finds the block by searching for a property value match.
	 * mappedFields tracks writes — first replaces blueprint default, subsequent concatenate.
	 */
	#applyBlockGridValue(
		values: Array<{ alias: string; value: unknown }>,
		gridAlias: string,
		blockSearch: { property: string; value: string },
		targetProperty: string,
		value: string,
		convertMarkdown: boolean | undefined,
		mappedFields: Set<string>
	) {
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
						// Use compound key for block property tracking
						const fieldKey = `${block.key}:${targetProperty}`;

						if (mappedFields.has(fieldKey)) {
							// Already written — concatenate with newline
							const currentValue = typeof targetValue.value === 'string' ? targetValue.value : '';
							targetValue.value = `${currentValue}\n${value}`;
						} else {
							// First write — replace the blueprint default
							targetValue.value = value;
						}
						mappedFields.add(fieldKey);
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
