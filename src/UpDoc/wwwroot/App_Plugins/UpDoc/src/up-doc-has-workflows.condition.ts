import { UmbConditionBase } from '@umbraco-cms/backoffice/extension-registry';
import type {
	UmbConditionConfigBase,
	UmbConditionControllerArguments,
	UmbExtensionCondition,
} from '@umbraco-cms/backoffice/extension-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UMB_ENTITY_CONTEXT } from '@umbraco-cms/backoffice/entity';
import { UmbDocumentTypeStructureRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbDocumentBlueprintItemRepository } from '@umbraco-cms/backoffice/document-blueprint';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';
import { fetchActiveWorkflows } from './workflow.service.js';

export type UpDocHasWorkflowsConditionConfig =
	UmbConditionConfigBase<'UpDoc.Condition.HasAvailableWorkflows'>;

/**
 * Custom condition that checks whether the current content node has any
 * allowed child document types with complete UpDoc workflows.
 *
 * This is a per-node check: the "Create Document from Source" entity action
 * only appears on nodes where at least one allowed child type has a blueprint
 * with a complete workflow (destination + map + source).
 */
export class UpDocHasWorkflowsCondition
	extends UmbConditionBase<UpDocHasWorkflowsConditionConfig>
	implements UmbExtensionCondition
{
	#documentTypeStructureRepository = new UmbDocumentTypeStructureRepository(this);
	#blueprintItemRepository = new UmbDocumentBlueprintItemRepository(this);
	#documentItemRepository = new UmbDocumentItemRepository(this);

	#authContext: typeof UMB_AUTH_CONTEXT.TYPE | null = null;
	#entityUnique: string | null | undefined = undefined; // undefined = not yet received

	constructor(
		host: UmbControllerHost,
		args: UmbConditionControllerArguments<UpDocHasWorkflowsConditionConfig>
	) {
		super(host, args);

		this.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
			this.#authContext = authContext;
			this.#tryEvaluate();
		});

		this.consumeContext(UMB_ENTITY_CONTEXT, (entityContext) => {
			if (!entityContext) return;
			this.observe(entityContext.unique, (unique) => {
				this.#entityUnique = unique ?? null;
				this.#tryEvaluate();
			});
		});
	}

	#tryEvaluate() {
		if (this.#authContext && this.#entityUnique !== undefined) {
			this.#evaluate(this.#authContext, this.#entityUnique);
		}
	}

	async #evaluate(authContext: typeof UMB_AUTH_CONTEXT.TYPE, entityUnique: string | null) {
		try {
			const token = await authContext.getLatestToken();
			const activeWorkflows = await fetchActiveWorkflows(token);

			// Quick exit: no complete workflows anywhere
			if (!activeWorkflows.blueprintIds.length) {
				this.permitted = false;
				return;
			}

			const activeBlueprintIds = new Set(activeWorkflows.blueprintIds);

			// Get the entity's document type
			let parentDocTypeUnique: string | null = null;
			if (entityUnique) {
				const { data: parentItems } = await this.#documentItemRepository.requestItems([entityUnique]);
				if (parentItems?.length) {
					parentDocTypeUnique = parentItems[0].documentType.unique;
				}
			}

			// Get allowed child document types for this node
			const result = await this.#documentTypeStructureRepository.requestAllowedChildrenOf(
				parentDocTypeUnique,
				entityUnique
			);
			const allowedTypes = result.data;

			if (!allowedTypes?.items?.length) {
				this.permitted = false;
				return;
			}

			// Check if any allowed child type has a blueprint with a complete workflow
			for (const docType of allowedTypes.items) {
				const { data: blueprints } = await this.#blueprintItemRepository.requestItemsByDocumentType(docType.unique);
				if (blueprints?.some((bp) => activeBlueprintIds.has(bp.unique))) {
					this.permitted = true;
					return;
				}
			}

			this.permitted = false;
		} catch {
			this.permitted = false;
		}
	}
}

export default UpDocHasWorkflowsCondition;

declare global {
	interface UmbExtensionConditionConfigMap {
		UpDocHasWorkflowsConditionConfig: UpDocHasWorkflowsConditionConfig;
	}
}
