import { b as G, d as N, o as R } from "./workflow.service-CWGlGq_3.js";
import { b as V, r as F, a as I, g as z } from "./destination-utils-DUfOJy5W.js";
import { html as s, nothing as M, css as X, state as x, customElement as j } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as H } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as q } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as J } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Q } from "@umbraco-cms/backoffice/workspace";
var Y = Object.defineProperty, Z = Object.getOwnPropertyDescriptor, D = (t) => {
  throw TypeError(t);
}, y = (t, e, i, a) => {
  for (var o = a > 1 ? void 0 : a ? Z(e, i) : e, _ = t.length - 1, h; _ >= 0; _--)
    (h = t[_]) && (o = (a ? h(e, i, o) : h(o)) || o);
  return a && o && Y(e, i, o), o;
}, C = (t, e, i) => e.has(t) || D("Cannot " + i), d = (t, e, i) => (C(t, e, "read from private field"), i ? i.call(t) : e.get(t)), $ = (t, e, i) => e.has(t) ? D("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), E = (t, e, i, a) => (C(t, e, "write to private field"), e.set(t, i), i), c = (t, e, i) => (C(t, e, "access private method"), i), g, b, n, T, L, U, K, S, W, A, B, O;
let u = class extends H {
  constructor() {
    super(...arguments), $(this, n), this._config = null, this._extraction = null, this._loading = !0, this._error = null, $(this, g, ""), $(this, b, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Q, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (E(this, g, decodeURIComponent(e)), c(this, n, T).call(this));
      });
    });
  }
  render() {
    return this._loading ? s`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? s`<p style="color: var(--uui-color-danger);">${this._error}</p>` : s`
			<umb-body-layout header-fit-height>
				<uui-box>
					${c(this, n, O).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
g = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
T = async function() {
  this._loading = !0, this._error = null;
  try {
    const t = await this.getContext(J);
    if (E(this, b, await t.getLatestToken()), this._config = await G(d(this, g), d(this, b)), !this._config) {
      this._error = `Workflow "${d(this, g)}" not found`;
      return;
    }
    this._extraction = await N(d(this, g), d(this, b));
  } catch (t) {
    this._error = t instanceof Error ? t.message : "Failed to load workflow", console.error("Failed to load workflow config:", t);
  } finally {
    this._loading = !1;
  }
};
L = function(t) {
  if (!this._config) return t.target;
  if (t.blockKey)
    for (const e of z(this._config.destination)) {
      const i = e.blocks.find((a) => a.key === t.blockKey);
      if (i) {
        const a = i.properties?.find((o) => o.alias === t.target);
        return `${i.label} > ${a?.label || t.target}`;
      }
    }
  for (const e of this._config.destination.fields)
    if (e.alias === t.target) return e.label;
  for (const e of z(this._config.destination))
    for (const i of e.blocks)
      for (const a of i.properties ?? [])
        if (a.alias === t.target)
          return `${i.label} > ${a.label || a.alias}`;
  return t.target;
};
U = function(t) {
  if (!this._extraction) return t;
  const e = this._extraction.elements.find((a) => a.id === t);
  return e ? e.text.length > 60 ? e.text.substring(0, 60) + "..." : e.text : t;
};
K = async function(t) {
  if (!this._config) return;
  const e = {
    ...this._config.map,
    mappings: this._config.map.mappings.filter((a, o) => o !== t)
  };
  await R(d(this, g), e, d(this, b)) && (this._config = { ...this._config, map: e });
};
S = function() {
  return s`
			<div class="empty-state">
				<uui-icon name="icon-nodes" class="empty-icon"></uui-icon>
				<p class="empty-title">No mappings yet</p>
				<p class="empty-message">Use the Source tab to map extracted content to destination fields.</p>
			</div>
		`;
};
W = function(t, e) {
  return s`
			<uui-table-row>
				<uui-table-cell class="source-cell">
					<span class="source-id">${t.source}</span>
					<span class="source-text">${c(this, n, U).call(this, t.source)}</span>
				</uui-table-cell>
				<uui-table-cell class="arrow-cell">
					<uui-icon name="icon-arrow-right"></uui-icon>
				</uui-table-cell>
				<uui-table-cell class="destination-cell">
					${t.destinations.map(
    (i) => s`
							<span class="destination-target">${c(this, n, L).call(this, i)}</span>
							${i.transforms?.length ? s`<span class="transform-badge">${i.transforms.map((a) => a.type).join(", ")}</span>` : M}
						`
  )}
				</uui-table-cell>
				<uui-table-cell class="actions-cell">
					${t.enabled ? M : s`<uui-tag look="secondary" class="disabled-badge">Disabled</uui-tag>`}
					<uui-button
						compact
						look="outline"
						color="danger"
						label="Delete"
						@click=${() => c(this, n, K).call(this, e)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-table-cell>
			</uui-table-row>
		`;
};
A = function() {
  if (!this._config?.destination) return [];
  const t = this._config.destination, e = V(t), i = /* @__PURE__ */ new Map();
  for (let r = 0; r < this._config.map.mappings.length; r++) {
    const p = this._config.map.mappings[r], v = p.destinations[0];
    if (!v) continue;
    const l = F(v, t) ?? "unmapped", m = e.find((P) => P.id === l)?.label ?? "Unmapped", f = v.blockKey, k = f ? I(f, t) : void 0, w = f ? `${l}:${f}` : l;
    i.has(w) || i.set(w, {
      tabId: l,
      tabLabel: m,
      blockKey: f ?? void 0,
      blockLabel: k ?? void 0,
      mappings: []
    }), i.get(w).mappings.push({ mapping: p, index: r });
  }
  const a = [], o = /* @__PURE__ */ new Map();
  let _ = 0;
  for (const r of z(t))
    for (const p of r.blocks)
      o.set(p.key, _++);
  for (const r of e) {
    const p = i.get(r.id);
    p && a.push(p);
    const v = Array.from(i.entries()).filter(([l, m]) => m.tabId === r.id && m.blockKey).sort(([, l], [, m]) => {
      const f = o.get(l.blockKey) ?? 999, k = o.get(m.blockKey) ?? 999;
      return f - k;
    }).map(([, l]) => l);
    a.push(...v);
  }
  const h = i.get("unmapped");
  return h && a.push(h), a;
};
B = function(t) {
  const e = t.blockLabel ? `${t.tabLabel} — ${t.blockLabel}` : t.tabLabel;
  return s`
			<div class="mapping-group">
				<div class="mapping-group-header">
					<span class="mapping-group-label">${e}</span>
					<span class="mapping-group-count">${t.mappings.length}</span>
				</div>
				<uui-table>
					<uui-table-head>
						<uui-table-head-cell>Source</uui-table-head-cell>
						<uui-table-head-cell style="width: 40px;"></uui-table-head-cell>
						<uui-table-head-cell>Destination</uui-table-head-cell>
						<uui-table-head-cell style="width: 100px;"></uui-table-head-cell>
					</uui-table-head>
					${t.mappings.map(
    ({ mapping: i, index: a }) => c(this, n, W).call(this, i, a)
  )}
				</uui-table>
			</div>
		`;
};
O = function() {
  if (!this._config) return M;
  const t = this._config.map.mappings;
  if (t.length === 0) return c(this, n, S).call(this);
  const e = c(this, n, A).call(this);
  return s`
			<div class="mappings-header">
				<span class="mapping-count">${t.length} mapping${t.length !== 1 ? "s" : ""}</span>
			</div>
			${e.map((i) => c(this, n, B).call(this, i))}
		`;
};
u.styles = [
  q,
  X`
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

			.mapping-group {
				margin-bottom: var(--uui-size-space-5);
			}

			.mapping-group:last-child {
				margin-bottom: 0;
			}

			.mapping-group-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.mapping-group-label {
				font-weight: 600;
			}

			.mapping-group-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface);
				padding: 1px 8px;
				border-radius: var(--uui-border-radius);
				border: 1px solid var(--uui-color-border);
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
y([
  x()
], u.prototype, "_config", 2);
y([
  x()
], u.prototype, "_extraction", 2);
y([
  x()
], u.prototype, "_loading", 2);
y([
  x()
], u.prototype, "_error", 2);
u = y([
  j("up-doc-workflow-map-view")
], u);
const rt = u;
export {
  u as UpDocWorkflowMapViewElement,
  rt as default
};
//# sourceMappingURL=up-doc-workflow-map-view.element-DzCcdSha.js.map
