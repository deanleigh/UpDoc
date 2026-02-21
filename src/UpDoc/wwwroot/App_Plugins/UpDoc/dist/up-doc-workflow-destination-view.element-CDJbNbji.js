import { b as z } from "./workflow.service-8lXLgP5U.js";
import { g as x } from "./destination-utils-CEQ5Lbpg.js";
import { html as a, nothing as o, css as $, state as d, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as T } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as C } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as E } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as D } from "@umbraco-cms/backoffice/workspace";
var U = Object.defineProperty, W = Object.getOwnPropertyDescriptor, v = (i) => {
  throw TypeError(i);
}, u = (i, e, t, n) => {
  for (var c = n > 1 ? void 0 : n ? W(e, t) : e, p = i.length - 1, f; p >= 0; p--)
    (f = i[p]) && (c = (n ? f(e, t, c) : f(c)) || c);
  return n && c && U(e, t, c), c;
}, B = (i, e, t) => e.has(i) || v("Cannot " + t), F = (i, e, t) => e.has(i) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), r = (i, e, t) => (B(i, e, "access private method"), t), s, m, b, h, g, _, y, k;
let l = class extends T {
  constructor() {
    super(...arguments), F(this, s), this._config = null, this._loading = !0, this._error = null, this._activeTab = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(D, (i) => {
      i && this.observe(i.unique, (e) => {
        e && r(this, s, m).call(this, decodeURIComponent(e));
      });
    });
  }
  render() {
    if (this._loading)
      return a`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return a`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
    const i = r(this, s, b).call(this);
    return a`
			<umb-body-layout header-fit-height>
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${i.map(
      (e) => a`
							<uui-tab
								label=${e.label}
								?active=${this._activeTab === e.id}
								@click=${() => {
        this._activeTab = e.id;
      }}>
								${e.label}
							</uui-tab>
						`
    )}
				</uui-tab-group>
				<uui-box>
					${r(this, s, k).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
m = async function(i) {
  this._loading = !0, this._error = null;
  try {
    const t = await (await this.getContext(E)).getLatestToken();
    if (this._config = await z(i, t), !this._config) {
      this._error = `Workflow "${i}" not found`;
      return;
    }
    const n = r(this, s, b).call(this);
    n.length > 0 && (this._activeTab = n[0].id);
  } catch (e) {
    this._error = e instanceof Error ? e.message : "Failed to load workflow", console.error("Failed to load workflow config:", e);
  } finally {
    this._loading = !1;
  }
};
b = function() {
  return this._config ? x(this._config.destination) : [];
};
h = function(i) {
  if (!this._config) return o;
  const e = this._config.destination.fields.filter((t) => t.tab === i);
  return e.length === 0 ? a`<p class="empty-message">No fields in this tab.</p>` : a`
			<div class="field-list">
				${e.map((t) => r(this, s, g).call(this, t))}
			</div>
		`;
};
g = function(i) {
  return a`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${i.label}</span>
					<span class="field-type">${i.type}</span>
					${i.mandatory ? a`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : o}
					<uui-button compact look="outline" label="Map" class="map-button" disabled>
						<uui-icon name="icon-nodes"></uui-icon>
					</uui-button>
				</div>
				<div class="field-meta">
					<span class="field-alias">${i.alias}</span>
					${i.description ? a`<span class="field-description">${i.description}</span>` : o}
				</div>
			</div>
		`;
};
_ = function() {
  return this._config?.destination.blockGrids?.length ? a`
			${this._config.destination.blockGrids.map((i) => r(this, s, y).call(this, i))}
		` : a`<p class="empty-message">No block grids configured.</p>`;
};
y = function(i) {
  return a`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${i.label}</span>
					<span class="field-alias">${i.alias}</span>
				</div>
				${i.description ? a`<p class="block-grid-description">${i.description}</p>` : o}
				<div class="block-list">
					${i.blocks.map(
    (e) => a`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${e.label}</span>
									${e.identifyBy ? a`<span class="block-identify">identified by: "${e.identifyBy.value}"</span>` : o}
								</div>
								${e.properties?.length ? a`
										<div class="block-properties">
											${e.properties.map(
      (t) => a`
													<div class="block-property">
														<span class="block-property-label">${t.label || t.alias}</span>
														<span class="field-type">${t.type}</span>
														${t.acceptsFormats?.length ? a`<span class="accepts-formats">${t.acceptsFormats.join(", ")}</span>` : o}
														<uui-button compact look="outline" label="Map" class="map-button" disabled>
															<uui-icon name="icon-nodes"></uui-icon>
														</uui-button>
													</div>
												`
    )}
										</div>
									` : o}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
k = function() {
  if (!this._config) return o;
  if (this._activeTab === "page-content")
    return r(this, s, _).call(this);
  const i = this._config.destination.fields.find(
    (e) => e.tab && e.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab;
  return i ? r(this, s, h).call(this, i) : o;
};
l.styles = [
  C,
  $`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.empty-message {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			.field-list {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
			}

			.field-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.field-item:last-child {
				border-bottom: none;
			}

			.field-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.field-label {
				font-weight: 600;
			}

			.field-type {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.field-badge {
				font-size: 11px;
			}

			.field-meta {
				display: flex;
				gap: var(--uui-size-space-3);
				margin-top: var(--uui-size-space-1);
			}

			.field-alias {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-family: monospace;
			}

			.field-description {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.block-grid {
				margin-bottom: var(--uui-size-space-5);
			}

			.block-grid-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-grid-label {
				font-weight: 600;
			}

			.block-grid-description {
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				margin: 0;
			}

			.block-list {
				display: flex;
				flex-direction: column;
			}

			.block-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				padding-left: var(--uui-size-space-6);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-item:last-child {
				border-bottom: none;
			}

			.block-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.block-label {
				font-weight: 600;
			}

			.block-identify {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			.block-properties {
				margin-top: var(--uui-size-space-2);
				padding-left: var(--uui-size-space-5);
			}

			.block-property {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-1) 0;
			}

			.block-property-label {
				font-size: var(--uui-type-small-size);
			}

			.accepts-formats {
				font-size: 11px;
				color: var(--uui-color-text-alt);
			}

			.map-button {
				margin-left: auto;
				--uui-button-font-size: var(--uui-type-small-size);
			}
		`
];
u([
  d()
], l.prototype, "_config", 2);
u([
  d()
], l.prototype, "_loading", 2);
u([
  d()
], l.prototype, "_error", 2);
u([
  d()
], l.prototype, "_activeTab", 2);
l = u([
  w("up-doc-workflow-destination-view")
], l);
const L = l;
export {
  l as UpDocWorkflowDestinationViewElement,
  L as default
};
//# sourceMappingURL=up-doc-workflow-destination-view.element-CDJbNbji.js.map
