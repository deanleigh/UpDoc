import { UMB_UP_DOC_MODAL } from './up-doc-modal.token.js';
import { UMB_BLUEPRINT_PICKER_MODAL } from './blueprint-picker-modal.token.js';
import type { DocumentTypeOption } from './blueprint-picker-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';
import { marked } from 'marked';

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

			// Step 5: Open source sidebar modal
			let modalValue;
			try {
				modalValue = await umbOpenModal(this, UMB_UP_DOC_MODAL, {
					data: { unique: parentUnique, blueprintName: selectedBlueprint?.blueprintName ?? '' },
				});
			} catch {
				// Modal was cancelled
				return;
			}

			const { name, mediaUnique, pageTitle, pageTitleShort, pageDescription, itineraryContent } = modalValue;

			if (!mediaUnique || !name) {
				return;
			}

			console.log('Creating document with:', { name, pageTitle, pageTitleShort, pageDescription, itineraryContent: itineraryContent?.substring(0, 100) });

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

			// Step 7: Build the document creation request
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

			// Update contentGrid if we have itinerary content
			if (itineraryContent) {
				this.#updateContentGridWithItinerary(values, itineraryContent);
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
				// First, fetch the document to get its current state
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

					// Save the document
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
	 * Updates the contentGrid value to replace the "Suggested Itinerary" RTE content
	 */
	#updateContentGridWithItinerary(values: Array<{ alias: string; value: unknown }>, itineraryContent: string) {
		const contentGridValue = values.find((v) => v.alias === 'contentGrid');
		if (!contentGridValue || !contentGridValue.value) {
			console.log('No contentGrid found in scaffold values');
			return;
		}

		try {
			// Track if the value was originally a string (need to stringify back)
			const wasString = typeof contentGridValue.value === 'string';
			console.log('contentGrid original type:', wasString ? 'string' : 'object');

			// Parse the contentGrid JSON
			const contentGrid = wasString
				? JSON.parse(contentGridValue.value as string)
				: contentGridValue.value;

			console.log('Parsed contentGrid:', contentGrid);
			console.log('contentData length:', contentGrid.contentData?.length);

			// Find the content block with "Suggested Itinerary" as the feature title
			const contentData = contentGrid.contentData as Array<{
				contentTypeKey: string;
				key: string;
				values: Array<{ alias: string; value: unknown }>;
			}>;

			if (!contentData) {
				console.log('No contentData in contentGrid');
				return;
			}

			// Look for a block that has featurePropertyFeatureTitle = "Suggested Itinerary"
			let foundBlock = false;
			for (const block of contentData) {
				console.log('Checking block:', block.key, 'contentTypeKey:', block.contentTypeKey);
				console.log('Block values:', block.values?.map((v) => ({ alias: v.alias, value: typeof v.value === 'object' ? '[object]' : v.value })));

				const titleValue = block.values?.find((v) => v.alias === 'featurePropertyFeatureTitle');
				console.log('Title value for block:', titleValue?.value);

				if (titleValue && typeof titleValue.value === 'string' &&
					titleValue.value.toLowerCase().includes('suggested itinerary')) {

					console.log('Found Suggested Itinerary block:', block.key);
					foundBlock = true;

					// Find and update the richTextContent
					const rteValue = block.values?.find((v) => v.alias === 'richTextContent');
					if (rteValue) {
						// Convert plain text to HTML paragraphs
						const htmlContent = this.#convertToHtml(itineraryContent);
						rteValue.value = {
							blocks: {
								contentData: [],
								settingsData: [],
								expose: [],
								Layout: {},
							},
							markup: htmlContent,
						};
						console.log('Updated richTextContent with itinerary');
					}
					break;
				}
			}

			if (!foundBlock) {
				console.log('WARNING: Did not find a block with featurePropertyFeatureTitle containing "suggested itinerary"');
			}

			// Update the contentGrid value - stringify back if it was originally a string
			contentGridValue.value = wasString ? JSON.stringify(contentGrid) : contentGrid;
			console.log('ContentGrid updated successfully (stringified:', wasString, ')');

		} catch (error) {
			console.error('Failed to update contentGrid:', error);
		}
	}

	/**
	 * Converts Markdown to HTML using marked library
	 */
	#convertToHtml(markdown: string): string {
		if (!markdown) return '';

		try {
			// Configure marked for clean output
			const html = marked.parse(markdown, {
				gfm: true, // GitHub Flavored Markdown
				breaks: false, // Don't convert \n to <br>
			});

			// marked.parse can return string or Promise<string>
			if (typeof html === 'string') {
				console.log('Converted Markdown to HTML:', html.substring(0, 200));
				return html;
			}

			// Fallback for async (shouldn't happen with sync config)
			console.warn('marked returned Promise, using fallback');
			return `<p>${markdown}</p>`;
		} catch (error) {
			console.error('Markdown conversion failed:', error);
			// Fallback: wrap in paragraph tags
			return `<p>${markdown.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
		}
	}
}

export default UpDocEntityAction;
