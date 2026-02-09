import { html as l, css as s, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as f } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as c } from "@umbraco-cms/backoffice/style";
var m = Object.getOwnPropertyDescriptor, g = (r, i, a, n) => {
  for (var e = n > 1 ? void 0 : n ? m(i, a) : i, t = r.length - 1, p; t >= 0; t--)
    (p = r[t]) && (e = p(e) || e);
  return e;
};
let o = class extends f {
  render() {
    return l`
			<uui-box headline="Configuration">
				<p>Global configuration options for UpDoc will appear here in a future update.</p>
				<p>
					Workflow-specific settings (source extraction rules, property mappings) are configured
					per-workflow on the Workflows tab.
				</p>
			</uui-box>
		`;
  }
};
o.styles = [
  c,
  s`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}
		`
];
o = g([
  u("up-doc-configuration-view")
], o);
const v = o;
export {
  o as UpDocConfigurationViewElement,
  v as default
};
//# sourceMappingURL=up-doc-configuration-view.element-Cqyu2QXk.js.map
