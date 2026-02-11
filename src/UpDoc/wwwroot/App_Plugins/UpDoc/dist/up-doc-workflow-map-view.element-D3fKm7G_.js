import { b as M, c as D, s as S } from "./workflow.service-Cy8WOA0g.js";
import { html as s, nothing as _, css as T, state as d, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as W } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as O } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as N } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as P } from "@umbraco-cms/backoffice/workspace";
var A = Object.defineProperty, B = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, f = (t, e, i, a) => {
  for (var o = a > 1 ? void 0 : a ? B(e, i) : e, h = t.length - 1, m; h >= 0; h--)
    (m = t[h]) && (o = (a ? m(e, i, o) : m(o)) || o);
  return a && o && A(e, i, o), o;
}, b = (t, e, i) => e.has(t) || v("Cannot " + i), r = (t, e, i) => (b(t, e, "read from private field"), i ? i.call(t) : e.get(t)), g = (t, e, i) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), y = (t, e, i, a) => (b(t, e, "write to private field"), e.set(t, i), i), c = (t, e, i) => (b(t, e, "access private method"), i), u, p, l, x, w, k, z, $, C, E;
let n = class extends W {
  constructor() {
    super(...arguments), g(this, l), this._config = null, this._extraction = null, this._loading = !0, this._error = null, g(this, u, ""), g(this, p, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(P, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (y(this, u, decodeURIComponent(e)), c(this, l, x).call(this));
      });
    });
  }
  render() {
    return this._loading ? s`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? s`<p style="color: var(--uui-color-danger);">${this._error}</p>` : s`
			<umb-body-layout header-fit-height>
				<uui-box>
					${c(this, l, E).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
u = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
x = async function() {
  this._loading = !0, this._error = null;
  try {
    const t = await this.getContext(N);
    if (y(this, p, await t.getLatestToken()), this._config = await M(r(this, u), r(this, p)), !this._config) {
      this._error = `Workflow "${r(this, u)}" not found`;
      return;
    }
    this._extraction = await D(r(this, u), r(this, p));
  } catch (t) {
    this._error = t instanceof Error ? t.message : "Failed to load workflow", console.error("Failed to load workflow config:", t);
  } finally {
    this._loading = !1;
  }
};
w = function(t) {
  if (!this._config) return t;
  for (const e of this._config.destination.fields)
    if (e.alias === t) return e.label;
  for (const e of this._config.destination.blockGrids ?? [])
    for (const i of e.blocks)
      for (const a of i.properties ?? [])
        if (a.alias === t)
          return `${i.label} > ${a.label || a.alias}`;
  return t;
};
k = function(t) {
  if (!this._extraction) return t;
  const e = this._extraction.elements.find((a) => a.id === t);
  return e ? e.text.length > 60 ? e.text.substring(0, 60) + "..." : e.text : t;
};
z = async function(t) {
  if (!this._config) return;
  const e = {
    ...this._config.map,
    mappings: this._config.map.mappings.filter((a, o) => o !== t)
  };
  await S(r(this, u), e, r(this, p)) && (this._config = { ...this._config, map: e });
};
$ = function() {
  return s`
			<div class="empty-state">
				<uui-icon name="icon-nodes" class="empty-icon"></uui-icon>
				<p class="empty-title">No mappings yet</p>
				<p class="empty-message">Use the Source tab to map extracted content to destination fields.</p>
			</div>
		`;
};
C = function(t, e) {
  return s`
			<uui-table-row>
				<uui-table-cell class="source-cell">
					<span class="source-id">${t.source}</span>
					<span class="source-text">${c(this, l, k).call(this, t.source)}</span>
				</uui-table-cell>
				<uui-table-cell class="arrow-cell">
					<uui-icon name="icon-arrow-right"></uui-icon>
				</uui-table-cell>
				<uui-table-cell class="destination-cell">
					${t.destinations.map(
    (i) => {
      var a;
      return s`
							<span class="destination-target">${c(this, l, w).call(this, i.target)}</span>
							${(a = i.transforms) != null && a.length ? s`<span class="transform-badge">${i.transforms.map((o) => o.type).join(", ")}</span>` : _}
						`;
    }
  )}
				</uui-table-cell>
				<uui-table-cell class="actions-cell">
					${t.enabled ? _ : s`<uui-tag look="secondary" class="disabled-badge">Disabled</uui-tag>`}
					<uui-button
						compact
						look="outline"
						color="danger"
						label="Delete"
						@click=${() => c(this, l, z).call(this, e)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-table-cell>
			</uui-table-row>
		`;
};
E = function() {
  if (!this._config) return _;
  const t = this._config.map.mappings;
  return t.length === 0 ? c(this, l, $).call(this) : s`
			<div class="mappings-header">
				<span class="mapping-count">${t.length} mapping${t.length !== 1 ? "s" : ""}</span>
			</div>
			<uui-table>
				<uui-table-head>
					<uui-table-head-cell>Source</uui-table-head-cell>
					<uui-table-head-cell style="width: 40px;"></uui-table-head-cell>
					<uui-table-head-cell>Destination</uui-table-head-cell>
					<uui-table-head-cell style="width: 100px;"></uui-table-head-cell>
				</uui-table-head>
				${t.map((e, i) => c(this, l, C).call(this, e, i))}
			</uui-table>
		`;
};
n.styles = [
  O,
  T`
			:host {
				display: block;
				height: 100%;
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: var(--uui-size-layout-3) var(--uui-size-layout-1);
				color: var(--uui-color-text-alt);
			}

			.empty-icon {
				font-size: 3rem;
				margin-bottom: var(--uui-size-space-4);
				opacity: 0.4;
			}

			.empty-title {
				font-size: var(--uui-type-h5-size);
				font-weight: 600;
				margin: 0 0 var(--uui-size-space-2);
			}

			.empty-message {
				margin: 0;
				font-style: italic;
			}

			.mappings-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: var(--uui-size-space-4);
			}

			.mapping-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.source-cell {
				display: flex;
				flex-direction: column;
				gap: 2px;
			}

			.source-id {
				font-size: 11px;
				font-family: monospace;
				color: var(--uui-color-text-alt);
			}

			.source-text {
				font-size: var(--uui-type-small-size);
			}

			.arrow-cell {
				text-align: center;
				color: var(--uui-color-text-alt);
			}

			.destination-cell {
				display: flex;
				flex-direction: column;
				gap: 4px;
			}

			.destination-target {
				font-weight: 600;
			}

			.transform-badge {
				font-size: 11px;
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
				width: fit-content;
			}

			.disabled-badge {
				font-size: 11px;
			}

			.actions-cell {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				justify-content: flex-end;
			}
		`
];
f([
  d()
], n.prototype, "_config", 2);
f([
  d()
], n.prototype, "_extraction", 2);
f([
  d()
], n.prototype, "_loading", 2);
f([
  d()
], n.prototype, "_error", 2);
n = f([
  U("up-doc-workflow-map-view")
], n);
const H = n;
export {
  n as UpDocWorkflowMapViewElement,
  H as default
};
//# sourceMappingURL=up-doc-workflow-map-view.element-D3fKm7G_.js.map
