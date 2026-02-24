import { b as x } from "./workflow.service-DSRz0gSB.js";
import { b as $, g as v } from "./destination-utils-DUfOJy5W.js";
import { html as a, nothing as s, css as w, state as d, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as D } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as U } from "@umbraco-cms/backoffice/workspace";
var B = Object.defineProperty, F = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, u = (e, i, t, r) => {
  for (var c = r > 1 ? void 0 : r ? F(i, t) : i, p = e.length - 1, f; p >= 0; p--)
    (f = e[p]) && (c = (r ? f(i, t, c) : f(c)) || c);
  return r && c && B(i, t, c), c;
}, W = (e, i, t) => i.has(e) || m("Cannot " + t), O = (e, i, t) => i.has(e) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), l = (e, i, t) => (W(e, i, "access private method"), t), o, g, b, h, _, y, k, z;
let n = class extends C {
  constructor() {
    super(...arguments), O(this, o), this._config = null, this._loading = !0, this._error = null, this._activeTab = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(U, (e) => {
      e && this.observe(e.unique, (i) => {
        i && l(this, o, g).call(this, decodeURIComponent(i));
      });
    });
  }
  render() {
    if (this._loading)
      return a`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return a`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
    const e = l(this, o, b).call(this);
    return a`
			<umb-body-layout header-fit-height>
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${e.map(
      (i) => a`
							<uui-tab
								label=${i.label}
								?active=${this._activeTab === i.id}
								@click=${() => {
        this._activeTab = i.id;
      }}>
								${i.label}
							</uui-tab>
						`
    )}
				</uui-tab-group>
				<uui-box>
					${l(this, o, z).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
g = async function(e) {
  this._loading = !0, this._error = null;
  try {
    const t = await (await this.getContext(D)).getLatestToken();
    if (this._config = await x(e, t), !this._config) {
      this._error = `Workflow "${e}" not found`;
      return;
    }
    const r = l(this, o, b).call(this);
    r.length > 0 && (this._activeTab = r[0].id);
  } catch (i) {
    this._error = i instanceof Error ? i.message : "Failed to load workflow", console.error("Failed to load workflow config:", i);
  } finally {
    this._loading = !1;
  }
};
b = function() {
  return this._config ? $(this._config.destination) : [];
};
h = function(e) {
  if (!this._config) return s;
  const i = this._config.destination.fields.filter((t) => t.tab === e);
  return i.length === 0 ? a`<p class="empty-message">No fields in this tab.</p>` : a`
			<div class="field-list">
				${i.map((t) => l(this, o, _).call(this, t))}
			</div>
		`;
};
_ = function(e) {
  return a`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${e.label}</span>
					<span class="field-type">${e.type}</span>
					${e.mandatory ? a`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : s}
					<uui-button compact look="outline" label="Map" class="map-button" disabled>
						<uui-icon name="icon-nodes"></uui-icon>
					</uui-button>
				</div>
				<div class="field-meta">
					<span class="field-alias">${e.alias}</span>
					${e.description ? a`<span class="field-description">${e.description}</span>` : s}
				</div>
			</div>
		`;
};
y = function(e) {
  if (!this._config) return s;
  const i = v(this._config.destination).filter((t) => (t.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === e);
  return i.length ? a`
			${i.map((t) => l(this, o, k).call(this, t))}
		` : a`<p class="empty-message">No blocks configured.</p>`;
};
k = function(e) {
  return a`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${e.label}</span>
					<span class="field-alias">${e.alias}</span>
				</div>
				${e.description ? a`<p class="block-grid-description">${e.description}</p>` : s}
				<div class="block-list">
					${e.blocks.map(
    (i) => a`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${i.label}</span>
									${i.identifyBy ? a`<span class="block-identify">identified by: "${i.identifyBy.value}"</span>` : s}
								</div>
								${i.properties?.length ? a`
										<div class="block-properties">
											${i.properties.map(
      (t) => a`
													<div class="block-property">
														<span class="block-property-label">${t.label || t.alias}</span>
														<span class="field-type">${t.type}</span>
														${t.acceptsFormats?.length ? a`<span class="accepts-formats">${t.acceptsFormats.join(", ")}</span>` : s}
														<uui-button compact look="outline" label="Map" class="map-button" disabled>
															<uui-icon name="icon-nodes"></uui-icon>
														</uui-button>
													</div>
												`
    )}
										</div>
									` : s}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
z = function() {
  if (!this._config) return s;
  const e = this._config.destination.fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab, i = v(this._config.destination).some((t) => (t.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === this._activeTab);
  return a`
			${e ? l(this, o, h).call(this, e) : s}
			${i ? l(this, o, y).call(this, this._activeTab) : s}
		`;
};
n.styles = [
  E,
  w`
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
], n.prototype, "_config", 2);
u([
  d()
], n.prototype, "_loading", 2);
u([
  d()
], n.prototype, "_error", 2);
u([
  d()
], n.prototype, "_activeTab", 2);
n = u([
  T("up-doc-workflow-destination-view")
], n);
const V = n;
export {
  n as UpDocWorkflowDestinationViewElement,
  V as default
};
//# sourceMappingURL=up-doc-workflow-destination-view.element-DfYyP6mR.js.map
