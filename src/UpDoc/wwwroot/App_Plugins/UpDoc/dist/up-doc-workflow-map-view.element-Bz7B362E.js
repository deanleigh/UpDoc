import { b as M, c as D, s as S } from "./workflow.service-CD2_oFgA.js";
import { html as l, nothing as _, css as T, state as h, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as W } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as O } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as N } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as P } from "@umbraco-cms/backoffice/workspace";
var G = Object.defineProperty, A = Object.getOwnPropertyDescriptor, y = (t) => {
  throw TypeError(t);
}, d = (t, e, i, o) => {
  for (var a = o > 1 ? void 0 : o ? A(e, i) : e, f = t.length - 1, g; f >= 0; f--)
    (g = t[f]) && (a = (o ? g(e, i, a) : g(a)) || a);
  return o && a && G(e, i, a), a;
}, b = (t, e, i) => e.has(t) || y("Cannot " + i), s = (t, e, i) => (b(t, e, "read from private field"), i ? i.call(t) : e.get(t)), m = (t, e, i) => e.has(t) ? y("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), v = (t, e, i, o) => (b(t, e, "write to private field"), e.set(t, i), i), c = (t, e, i) => (b(t, e, "access private method"), i), u, p, n, x, w, k, $, z, C, E;
let r = class extends W {
  constructor() {
    super(...arguments), m(this, n), this._config = null, this._extraction = null, this._loading = !0, this._error = null, m(this, u, ""), m(this, p, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(P, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (v(this, u, decodeURIComponent(e)), c(this, n, x).call(this));
      });
    });
  }
  render() {
    return this._loading ? l`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? l`<p style="color: var(--uui-color-danger);">${this._error}</p>` : l`
			<umb-body-layout header-fit-height>
				<uui-box>
					${c(this, n, E).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
u = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
x = async function() {
  this._loading = !0, this._error = null;
  try {
    const t = await this.getContext(N);
    if (v(this, p, await t.getLatestToken()), this._config = await M(s(this, u), s(this, p)), !this._config) {
      this._error = `Workflow "${s(this, u)}" not found`;
      return;
    }
    this._extraction = await D(s(this, u), s(this, p));
  } catch (t) {
    this._error = t instanceof Error ? t.message : "Failed to load workflow", console.error("Failed to load workflow config:", t);
  } finally {
    this._loading = !1;
  }
};
w = function(t) {
  var e;
  if (!this._config) return t.target;
  if (t.blockKey && this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids) {
      const o = i.blocks.find((a) => a.key === t.blockKey);
      if (o) {
        const a = (e = o.properties) == null ? void 0 : e.find((f) => f.alias === t.target);
        return `${o.label} > ${(a == null ? void 0 : a.label) || t.target}`;
      }
    }
  for (const i of this._config.destination.fields)
    if (i.alias === t.target) return i.label;
  for (const i of this._config.destination.blockGrids ?? [])
    for (const o of i.blocks)
      for (const a of o.properties ?? [])
        if (a.alias === t.target)
          return `${o.label} > ${a.label || a.alias}`;
  return t.target;
};
k = function(t) {
  if (!this._extraction) return t;
  const e = this._extraction.elements.find((o) => o.id === t);
  return e ? e.text.length > 60 ? e.text.substring(0, 60) + "..." : e.text : t;
};
$ = async function(t) {
  if (!this._config) return;
  const e = {
    ...this._config.map,
    mappings: this._config.map.mappings.filter((o, a) => a !== t)
  };
  await S(s(this, u), e, s(this, p)) && (this._config = { ...this._config, map: e });
};
z = function() {
  return l`
			<div class="empty-state">
				<uui-icon name="icon-nodes" class="empty-icon"></uui-icon>
				<p class="empty-title">No mappings yet</p>
				<p class="empty-message">Use the Source tab to map extracted content to destination fields.</p>
			</div>
		`;
};
C = function(t, e) {
  return l`
			<uui-table-row>
				<uui-table-cell class="source-cell">
					<span class="source-id">${t.source}</span>
					<span class="source-text">${c(this, n, k).call(this, t.source)}</span>
				</uui-table-cell>
				<uui-table-cell class="arrow-cell">
					<uui-icon name="icon-arrow-right"></uui-icon>
				</uui-table-cell>
				<uui-table-cell class="destination-cell">
					${t.destinations.map(
    (i) => {
      var o;
      return l`
							<span class="destination-target">${c(this, n, w).call(this, i)}</span>
							${(o = i.transforms) != null && o.length ? l`<span class="transform-badge">${i.transforms.map((a) => a.type).join(", ")}</span>` : _}
						`;
    }
  )}
				</uui-table-cell>
				<uui-table-cell class="actions-cell">
					${t.enabled ? _ : l`<uui-tag look="secondary" class="disabled-badge">Disabled</uui-tag>`}
					<uui-button
						compact
						look="outline"
						color="danger"
						label="Delete"
						@click=${() => c(this, n, $).call(this, e)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-table-cell>
			</uui-table-row>
		`;
};
E = function() {
  if (!this._config) return _;
  const t = this._config.map.mappings;
  return t.length === 0 ? c(this, n, z).call(this) : l`
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
				${t.map((e, i) => c(this, n, C).call(this, e, i))}
			</uui-table>
		`;
};
r.styles = [
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
d([
  h()
], r.prototype, "_config", 2);
d([
  h()
], r.prototype, "_extraction", 2);
d([
  h()
], r.prototype, "_loading", 2);
d([
  h()
], r.prototype, "_error", 2);
r = d([
  U("up-doc-workflow-map-view")
], r);
const X = r;
export {
  r as UpDocWorkflowMapViewElement,
  X as default
};
//# sourceMappingURL=up-doc-workflow-map-view.element-Bz7B362E.js.map
