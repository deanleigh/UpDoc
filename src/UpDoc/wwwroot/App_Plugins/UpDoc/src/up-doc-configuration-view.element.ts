import { html, css, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';

@customElement('up-doc-configuration-view')
export class UpDocConfigurationViewElement extends UmbLitElement {
	override render() {
		return html`
			<uui-box headline="Configuration">
				<p>Global configuration options for UpDoc will appear here in a future update.</p>
				<p>
					Workflow-specific settings (source extraction rules, property mappings) are configured
					per-workflow on the Workflows tab.
				</p>
			</uui-box>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`,
	];
}

export default UpDocConfigurationViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-configuration-view': UpDocConfigurationViewElement;
	}
}
