import { UMB_CREATE_FROM_PDF_MODAL } from './create-from-pdf-modal.token.js';
import { UmbEntityActionBase } from '@umbraco-cms/backoffice/entity-action';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbEntityActionArgs } from '@umbraco-cms/backoffice/entity-action';

export class CreateFromPdfEntityAction extends UmbEntityActionBase<never> {
	constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
		super(host, args);
	}

	override async execute() {
		const value = await umbOpenModal(this, UMB_CREATE_FROM_PDF_MODAL, {
			data: { unique: this.args.unique ?? null },
		});

		const { name } = value;
		if (!name) return;

		// TODO: Implement PDF processing and document creation
		console.log('Create from PDF:', name);
	}
}

export default CreateFromPdfEntityAction;
