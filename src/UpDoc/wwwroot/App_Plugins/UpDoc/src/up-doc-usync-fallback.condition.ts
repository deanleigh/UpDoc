import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type {
	UmbConditionConfigBase,
	UmbConditionControllerArguments,
	UmbExtensionCondition,
} from '@umbraco-cms/backoffice/extension-api';
import { UmbConditionBase, umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

/**
 * Condition that permits when uSync is NOT installed.
 * Used to show UpDoc's own sidebar group as a fallback
 * when uSync's "Synchronisation" group isn't available.
 */
export class UpDocUsyncFallbackCondition
	extends UmbConditionBase<UmbConditionConfigBase>
	implements UmbExtensionCondition
{
	constructor(host: UmbControllerHost, args: UmbConditionControllerArguments<UmbConditionConfigBase>) {
		super(host, args);

		this.observe(
			umbExtensionsRegistry.byType('menu'),
			(menus) => {
				const hasUsync = menus.some((m) => m.alias === 'usync.menu');
				this.permitted = !hasUsync;
			},
			'upDocUsyncCheck',
		);
	}
}

export { UpDocUsyncFallbackCondition as api };
