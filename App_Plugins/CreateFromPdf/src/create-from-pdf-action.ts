import { UMB_CREATE_FROM_PDF_MODAL } from './create-from-pdf-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';

export class CreateFromPdfEntityAction extends UmbEntityActionBase<never> {
	constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
		super(host, args);
	}

	override async execute() {
		const value = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
			data: { unique: this.args.unique ?? null },
		});

		console.log('Modal returned value:', value);
		const { name, mediaUnique } = value;
		console.log('Name:', name, 'MediaUnique:', mediaUnique);
		if (!name || !mediaUnique) {
			console.log('Returning early - name or mediaUnique is empty');
			return;
		}

		// Get auth token for API call
		const authContext = await this.getContext(UMB_AUTH_CONTEXT);
		const token = await authContext.getLatestToken();

		// Call the PDF extraction API (Umbraco 17 Management API)
		const response = await fetch(
			`/umbraco/management/api/v1/createfrompdf/extract?mediaKey=${mediaUnique}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			const error = await response.json();
			console.error('PDF extraction failed:', error);

			// Show notification
			const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);
			notificationContext.peek('danger', {
				data: { message: `PDF extraction failed: ${error.error || 'Unknown error'}` },
			});
			return;
		}

		const result = await response.json();
		console.log('PDF extraction result:', result);
		console.log('Extracted text:', result.text);
		console.log('Page count:', result.pageCount);

		// Show success notification
		const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);
		notificationContext.peek('positive', {
			data: { message: `Successfully extracted ${result.pageCount} page(s) from PDF` },
		});

		// TODO: Create document with extracted content
		console.log('Document name:', name);
	}
}

export default CreateFromPdfEntityAction;
