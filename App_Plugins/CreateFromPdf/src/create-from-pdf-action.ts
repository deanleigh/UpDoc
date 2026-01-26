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
		let value;
		try {
			value = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
				data: { unique: this.args.unique ?? null },
			});
		} catch {
			// Modal was cancelled
			return;
		}

		console.log('Modal returned value:', value);
		const { mediaUnique } = value;
		console.log('MediaUnique:', mediaUnique);
		if (!mediaUnique) {
			console.log('Returning early - no PDF selected');
			return;
		}

		// Get auth token for API call
		const authContext = await this.getContext(UMB_AUTH_CONTEXT);
		const token = await authContext.getLatestToken();

		// Call the PDF page properties API
		const response = await fetch(
			`/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${mediaUnique}`,
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

		// Log page properties to console
		console.log('=== PDF Page Properties ===');
		console.log('Title → Page Title, Page Title Short:', result.title);
		console.log('Description → Page Description:', result.description);
		console.log('===========================');

		// Show success notification with extracted title
		const notificationContext = await this.getContext(UMB_NOTIFICATION_CONTEXT);
		notificationContext.peek('positive', {
			data: { message: `Extracted: "${result.title}"` },
		});

		// TODO: Create document with extracted content
		console.log('Parent unique:', this.args.unique);
	}
}

export default CreateFromPdfEntityAction;
