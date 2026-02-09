import { b as z } from "./workflow.service-C-MBMeeJ.js";
import { html as s, nothing as l, css as x, state as u, customElement as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as C } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as T } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as E } from "@umbraco-cms/backoffice/workspace";
var U = Object.defineProperty, B = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, d = (e, i, t, a) => {
  for (var o = a > 1 ? void 0 : a ? B(i, t) : i, p = e.length - 1, f; p >= 0; p--)
    (f = e[p]) && (o = (a ? f(i, t, o) : f(o)) || o);
  return a && o && U(i, t, o), o;
}, D = (e, i, t) => i.has(e) || v("Cannot " + t), W = (e, i, t) => i.has(e) ? v("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), n = (e, i, t) => (D(e, i, "access private method"), t), r, h, b, g, m, _, y, k;
let c = class extends w {
  constructor() {
    super(...arguments), W(this, r), this._config = null, this._loading = !0, this._error = null, this._activeTab = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(E, (e) => {
      e && this.observe(e.unique, (i) => {
        i && n(this, r, h).call(this, decodeURIComponent(i));
      });
    });
  }
  render() {
    if (this._loading)
      return s`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return s`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
    const e = n(this, r, b).call(this);
    return s`
			<umb-body-layout header-fit-height>
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${e.map(
      (i) => s`
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
					${n(this, r, k).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
r = /* @__PURE__ */ new WeakSet();
h = async function(e) {
  this._loading = !0, this._error = null;
  try {
    const t = await (await this.getContext(T)).getLatestToken();
    if (this._config = await z(e, t), !this._config) {
      this._error = `Workflow "${e}" not found`;
      return;
    }
    const a = n(this, r, b).call(this);
    a.length > 0 && (this._activeTab = a[0].id);
  } catch (i) {
    this._error = i instanceof Error ? i.message : "Failed to load workflow", console.error("Failed to load workflow config:", i);
  } finally {
    this._loading = !1;
  }
};
b = function() {
  var t;
  if (!this._config) return [];
  const e = [], i = new Set(this._config.destination.fields.map((a) => a.tab).filter(Boolean));
  for (const a of i)
    e.push({
      id: a.toLowerCase().replace(/\s+/g, "-"),
      label: a
    });
  return (t = this._config.destination.blockGrids) != null && t.length && (i.has("Page Content") || e.push({ id: "page-content", label: "Page Content" })), e;
};
g = function(e) {
  if (!this._config) return l;
  const i = this._config.destination.fields.filter((t) => t.tab === e);
  return i.length === 0 ? s`<p class="empty-message">No fields in this tab.</p>` : s`
			<div class="field-list">
				${i.map((t) => n(this, r, m).call(this, t))}
			</div>
		`;
};
m = function(e) {
  return s`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${e.label}</span>
					<span class="field-type">${e.type}</span>
					${e.mandatory ? s`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : l}
				</div>
				<div class="field-meta">
					<span class="field-alias">${e.alias}</span>
					${e.description ? s`<span class="field-description">${e.description}</span>` : l}
				</div>
			</div>
		`;
};
_ = function() {
  var e, i;
  return (i = (e = this._config) == null ? void 0 : e.destination.blockGrids) != null && i.length ? s`
			${this._config.destination.blockGrids.map((t) => n(this, r, y).call(this, t))}
		` : s`<p class="empty-message">No block grids configured.</p>`;
};
y = function(e) {
  return s`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${e.label}</span>
					<span class="field-alias">${e.alias}</span>
				</div>
				${e.description ? s`<p class="block-grid-description">${e.description}</p>` : l}
				<div class="block-list">
					${e.blocks.map(
    (i) => {
      var t;
      return s`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${i.label}</span>
									${i.identifyBy ? s`<span class="block-identify">identified by: "${i.identifyBy.value}"</span>` : l}
								</div>
								${(t = i.properties) != null && t.length ? s`
										<div class="block-properties">
											${i.properties.map(
        (a) => {
          var o;
          return s`
													<div class="block-property">
														<span class="block-property-label">${a.label || a.alias}</span>
														<span class="field-type">${a.type}</span>
														${(o = a.acceptsFormats) != null && o.length ? s`<span class="accepts-formats">${a.acceptsFormats.join(", ")}</span>` : l}
													</div>
												`;
        }
      )}
										</div>
									` : l}
							</div>
						`;
    }
  )}
				</div>
			</div>
		`;
};
k = function() {
  var i;
  if (!this._config) return l;
  if (this._activeTab === "page-content")
    return n(this, r, _).call(this);
  const e = (i = this._config.destination.fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )) == null ? void 0 : i.tab;
  return e ? n(this, r, g).call(this, e) : l;
};
c.styles = [
  C,
  x`
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
		`
];
d([
  u()
], c.prototype, "_config", 2);
d([
  u()
], c.prototype, "_loading", 2);
d([
  u()
], c.prototype, "_error", 2);
d([
  u()
], c.prototype, "_activeTab", 2);
c = d([
  $("up-doc-workflow-destination-view")
], c);
const L = c;
export {
  c as UpDocWorkflowDestinationViewElement,
  L as default
};
//# sourceMappingURL=up-doc-workflow-destination-view.element-PnXq6XBd.js.map
