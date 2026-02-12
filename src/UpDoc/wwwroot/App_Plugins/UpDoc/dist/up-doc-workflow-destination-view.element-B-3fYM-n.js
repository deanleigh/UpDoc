import { b as z } from "./workflow.service-C9FepPiJ.js";
import { html as s, nothing as r, css as x, state as d, customElement as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as C } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as T } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as E } from "@umbraco-cms/backoffice/workspace";
var U = Object.defineProperty, B = Object.getOwnPropertyDescriptor, v = (i) => {
  throw TypeError(i);
}, u = (i, e, t, a) => {
  for (var o = a > 1 ? void 0 : a ? B(e, t) : e, p = i.length - 1, f; p >= 0; p--)
    (f = i[p]) && (o = (a ? f(e, t, o) : f(o)) || o);
  return a && o && U(e, t, o), o;
}, D = (i, e, t) => e.has(i) || v("Cannot " + t), W = (i, e, t) => e.has(i) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), n = (i, e, t) => (D(i, e, "access private method"), t), l, h, b, m, g, _, y, k;
let c = class extends w {
  constructor() {
    super(...arguments), W(this, l), this._config = null, this._loading = !0, this._error = null, this._activeTab = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(E, (i) => {
      i && this.observe(i.unique, (e) => {
        e && n(this, l, h).call(this, decodeURIComponent(e));
      });
    });
  }
  render() {
    if (this._loading)
      return s`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return s`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
    const i = n(this, l, b).call(this);
    return s`
			<umb-body-layout header-fit-height>
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${i.map(
      (e) => s`
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
					${n(this, l, k).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
l = /* @__PURE__ */ new WeakSet();
h = async function(i) {
  this._loading = !0, this._error = null;
  try {
    const t = await (await this.getContext(T)).getLatestToken();
    if (this._config = await z(i, t), !this._config) {
      this._error = `Workflow "${i}" not found`;
      return;
    }
    const a = n(this, l, b).call(this);
    a.length > 0 && (this._activeTab = a[0].id);
  } catch (e) {
    this._error = e instanceof Error ? e.message : "Failed to load workflow", console.error("Failed to load workflow config:", e);
  } finally {
    this._loading = !1;
  }
};
b = function() {
  var t;
  if (!this._config) return [];
  const i = [], e = new Set(this._config.destination.fields.map((a) => a.tab).filter(Boolean));
  for (const a of e)
    i.push({
      id: a.toLowerCase().replace(/\s+/g, "-"),
      label: a
    });
  return (t = this._config.destination.blockGrids) != null && t.length && (e.has("Page Content") || i.push({ id: "page-content", label: "Page Content" })), i;
};
m = function(i) {
  if (!this._config) return r;
  const e = this._config.destination.fields.filter((t) => t.tab === i);
  return e.length === 0 ? s`<p class="empty-message">No fields in this tab.</p>` : s`
			<div class="field-list">
				${e.map((t) => n(this, l, g).call(this, t))}
			</div>
		`;
};
g = function(i) {
  return s`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${i.label}</span>
					<span class="field-type">${i.type}</span>
					${i.mandatory ? s`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : r}
					<uui-button compact look="outline" label="Map" class="map-button" disabled>
						<uui-icon name="icon-nodes"></uui-icon>
					</uui-button>
				</div>
				<div class="field-meta">
					<span class="field-alias">${i.alias}</span>
					${i.description ? s`<span class="field-description">${i.description}</span>` : r}
				</div>
			</div>
		`;
};
_ = function() {
  var i, e;
  return (e = (i = this._config) == null ? void 0 : i.destination.blockGrids) != null && e.length ? s`
			${this._config.destination.blockGrids.map((t) => n(this, l, y).call(this, t))}
		` : s`<p class="empty-message">No block grids configured.</p>`;
};
y = function(i) {
  return s`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${i.label}</span>
					<span class="field-alias">${i.alias}</span>
				</div>
				${i.description ? s`<p class="block-grid-description">${i.description}</p>` : r}
				<div class="block-list">
					${i.blocks.map(
    (e) => {
      var t;
      return s`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${e.label}</span>
									${e.identifyBy ? s`<span class="block-identify">identified by: "${e.identifyBy.value}"</span>` : r}
								</div>
								${(t = e.properties) != null && t.length ? s`
										<div class="block-properties">
											${e.properties.map(
        (a) => {
          var o;
          return s`
													<div class="block-property">
														<span class="block-property-label">${a.label || a.alias}</span>
														<span class="field-type">${a.type}</span>
														${(o = a.acceptsFormats) != null && o.length ? s`<span class="accepts-formats">${a.acceptsFormats.join(", ")}</span>` : r}
														<uui-button compact look="outline" label="Map" class="map-button" disabled>
															<uui-icon name="icon-nodes"></uui-icon>
														</uui-button>
													</div>
												`;
        }
      )}
										</div>
									` : r}
							</div>
						`;
    }
  )}
				</div>
			</div>
		`;
};
k = function() {
  var e;
  if (!this._config) return r;
  if (this._activeTab === "page-content")
    return n(this, l, _).call(this);
  const i = (e = this._config.destination.fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )) == null ? void 0 : e.tab;
  return i ? n(this, l, m).call(this, i) : r;
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

			.map-button {
				margin-left: auto;
				--uui-button-font-size: var(--uui-type-small-size);
			}
		`
];
u([
  d()
], c.prototype, "_config", 2);
u([
  d()
], c.prototype, "_loading", 2);
u([
  d()
], c.prototype, "_error", 2);
u([
  d()
], c.prototype, "_activeTab", 2);
c = u([
  $("up-doc-workflow-destination-view")
], c);
const S = c;
export {
  c as UpDocWorkflowDestinationViewElement,
  S as default
};
//# sourceMappingURL=up-doc-workflow-destination-view.element-B-3fYM-n.js.map
