import { c as L, b as W, t as F, s as I } from "./workflow.service-Cy8WOA0g.js";
import { html as u, nothing as v, css as R, state as h, customElement as V } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as H } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as X } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as $ } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as q } from "@umbraco-cms/backoffice/workspace";
import { UmbModalToken as J, UMB_MODAL_MANAGER_CONTEXT as M } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as Q } from "@umbraco-cms/backoffice/media";
function Y(e) {
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = Math.round(a.metadata.fontSize * 10) / 10;
    t.set(o, (t.get(o) ?? 0) + 1);
  }
  let i = 0, s = 0;
  for (const [a, o] of t)
    o > i && (i = o, s = a);
  return s;
}
function Z(e) {
  if (e.length === 0) return [];
  const t = Y(e);
  if (e.every((o) => Math.round(o.metadata.fontSize * 10) / 10 === t))
    return [{ heading: null, children: [...e] }];
  const s = [];
  let a = { heading: null, children: [] };
  for (const o of e)
    Math.round(o.metadata.fontSize * 10) / 10 > t ? ((a.heading || a.children.length > 0) && s.push(a), a = { heading: o, children: [] }) : a.children.push(o);
  return (a.heading || a.children.length > 0) && s.push(a), s;
}
const j = new J("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var ee = Object.defineProperty, te = Object.getOwnPropertyDescriptor, E = (e) => {
  throw TypeError(e);
}, p = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? te(t, i) : t, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (a = (s ? l(t, i, a) : l(a)) || a);
  return s && a && ee(t, i, a), a;
}, x = (e, t, i) => t.has(e) || E("Cannot " + i), b = (e, t, i) => (x(e, t, "read from private field"), i ? i.call(e) : t.get(e)), z = (e, t, i) => t.has(e) ? E("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), ie = (e, t, i, s) => (x(e, t, "write to private field"), t.set(e, i), i), r = (e, t, i) => (x(e, t, "access private method"), i), m, n, S, y, C, g, T, N, P, k, w, D, U, O, A, G, K;
let d = class extends H {
  constructor() {
    super(...arguments), z(this, n), this._extraction = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._selectedElements = /* @__PURE__ */ new Set(), z(this, m, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(q, (e) => {
      e && this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), r(this, n, S).call(this));
      });
    });
  }
  render() {
    return this._loading ? u`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? u`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>` : u`
			<umb-body-layout header-fit-height>
				${this._successMessage ? u`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : v}
				${this._extraction ? r(this, n, G).call(this) : r(this, n, K).call(this)}
			</umb-body-layout>
		`;
  }
};
m = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
S = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext($);
      ie(this, m, await e.getLatestToken());
      const [t, i] = await Promise.all([
        L(this._workflowName, b(this, m)),
        W(this._workflowName, b(this, m))
      ]);
      this._extraction = t, this._config = i;
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load sample extraction", console.error("Failed to load sample extraction:", e);
    } finally {
      this._loading = !1;
    }
  }
};
y = async function() {
  var a;
  if (!this._workflowName) return;
  const i = await (await this.getContext(M)).open(this, Q, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((a = i == null ? void 0 : i.selection) != null && a.length)) return;
  const s = i.selection[0];
  if (s) {
    this._extracting = !0, this._error = null;
    try {
      const l = await (await this.getContext($)).getLatestToken(), c = await F(this._workflowName, s, l);
      c ? (this._extraction = c, this._successMessage = `Content extracted successfully — ${c.elements.length} elements from ${c.source.totalPages} pages`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (o) {
      this._error = o instanceof Error ? o.message : "Extraction failed", console.error("Sample extraction failed:", o);
    } finally {
      this._extracting = !1;
    }
  }
};
C = function(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e) {
    const s = t.get(i.page);
    s ? s.push(i) : t.set(i.page, [i]);
  }
  return t;
};
g = function(e) {
  const t = new Set(this._selectedElements);
  t.has(e) ? t.delete(e) : t.add(e), this._selectedElements = t;
};
T = function() {
  this._selectedElements = /* @__PURE__ */ new Set();
};
N = async function() {
  var f;
  if (!this._config || this._selectedElements.size === 0) return;
  const i = await (await this.getContext(M)).open(this, j, {
    data: {
      destination: this._config.destination
    }
  }).onSubmit().catch(() => null);
  if (!((f = i == null ? void 0 : i.selectedTargets) != null && f.length) || !this._workflowName) return;
  const a = [...this._config.map.mappings ?? []], o = this._selectedElements.size;
  for (const B of this._selectedElements)
    a.push({
      source: B,
      destinations: i.selectedTargets.map((_) => ({
        target: _.target,
        ..._.blockKey ? { blockKey: _.blockKey } : {}
      })),
      enabled: !0
    });
  const l = { ...this._config.map, mappings: a };
  await I(this._workflowName, l, b(this, m)) && (this._config = { ...this._config, map: l }, this._selectedElements = /* @__PURE__ */ new Set(), this._successMessage = `${o} mapping${o !== 1 ? "s" : ""} created`, setTimeout(() => {
    this._successMessage = null;
  }, 3e3));
};
P = function() {
  const e = this._selectedElements.size;
  return e === 0 ? v : u`
			<div class="selection-toolbar">
				<span class="selection-count">${e} selected</span>
				<uui-button look="primary" compact label="Map to..." @click=${r(this, n, N)}>
					<uui-icon name="icon-nodes"></uui-icon>
					Map to...
				</uui-button>
				<uui-button look="secondary" compact label="Clear" @click=${r(this, n, T)}>
					Clear
				</uui-button>
			</div>
		`;
};
k = function(e) {
  var i, s;
  if (!((s = (i = this._config) == null ? void 0 : i.map) != null && s.mappings)) return [];
  const t = [];
  for (const a of this._config.map.mappings)
    if (a.source === e && a.enabled)
      for (const o of a.destinations)
        t.push(o);
  return t;
};
w = function(e) {
  var i, s, a;
  if (!((i = this._config) != null && i.destination)) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const o of this._config.destination.blockGrids) {
      const l = o.blocks.find((c) => c.key === e.blockKey);
      if (l) {
        const c = (s = l.properties) == null ? void 0 : s.find((f) => f.alias === e.target);
        return `${l.label} > ${(c == null ? void 0 : c.label) || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((o) => o.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const o of this._config.destination.blockGrids)
      for (const l of o.blocks) {
        const c = (a = l.properties) == null ? void 0 : a.find((f) => f.alias === e.target);
        if (c) return `${l.label} > ${c.label || c.alias}`;
      }
  return e.target;
};
D = function(e) {
  const t = e.metadata, i = this._selectedElements.has(e.id), s = r(this, n, k).call(this, e.id), a = s.length > 0;
  return u`
			<div class="element-item ${i ? "element-selected" : ""} ${a ? "element-mapped" : ""}">
				<uui-checkbox
					label="Select for mapping"
					?checked=${i}
					@change=${() => r(this, n, g).call(this, e.id)}
					class="element-checkbox">
				</uui-checkbox>
				<div class="element-content" @click=${() => r(this, n, g).call(this, e.id)}>
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${t.fontSize}pt</span>
						<span class="meta-badge font-name">${t.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${t.color};">${t.color}</span>
						<span class="meta-badge position">x:${t.position.x} y:${t.position.y}</span>
						${s.map((o) => u`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${r(this, n, w).call(this, o)}</span>`)}
					</div>
				</div>
			</div>
		`;
};
U = function(e, t) {
  const i = e.metadata, s = this._selectedElements.has(e.id), a = r(this, n, k).call(this, e.id), o = a.length > 0;
  return u`
			<div class="group-heading ${s ? "element-selected" : ""} ${o ? "element-mapped" : ""}">
				<uui-checkbox
					label="Select ${e.text}"
					?checked=${s}
					@change=${() => r(this, n, g).call(this, e.id)}
					class="element-checkbox">
				</uui-checkbox>
				<div class="heading-content" @click=${() => r(this, n, g).call(this, e.id)}>
					<div class="heading-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${i.fontSize}pt</span>
						<span class="meta-badge font-name">${i.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${i.color};">${i.color}</span>
						${a.map((l) => u`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${r(this, n, w).call(this, l)}</span>`)}
					</div>
				</div>
				<span class="group-count">${t.length} item${t.length !== 1 ? "s" : ""}</span>
			</div>
		`;
};
O = function(e) {
  return u`
			<div class="visual-group">
				${e.heading ? r(this, n, U).call(this, e.heading, e.children) : v}
				<div class="group-children ${e.heading ? "indented" : ""}">
					${e.children.map((t) => r(this, n, D).call(this, t))}
				</div>
			</div>
		`;
};
A = function(e, t) {
  const i = Z(t);
  return u`
			<uui-box headline="Page ${e}" class="page-box">
				${i.map((s) => r(this, n, O).call(this, s))}
				<div class="page-summary">${t.length} element${t.length !== 1 ? "s" : ""}</div>
			</uui-box>
		`;
};
G = function() {
  if (!this._extraction) return v;
  const e = r(this, n, C).call(this, this._extraction.elements), t = Array.from(e.entries()).sort(([i], [s]) => i - s);
  return u`
			<div class="extraction-header">
				<div class="extraction-info">
					<span class="info-label">Source:</span>
					<span>${this._extraction.source.fileName}</span>
				</div>
				<div class="extraction-info">
					<span class="info-label">Pages:</span>
					<span>${this._extraction.source.totalPages}</span>
					<span class="info-label" style="margin-left: var(--uui-size-space-4);">Elements:</span>
					<span>${this._extraction.elements.length}</span>
					<span class="info-label" style="margin-left: var(--uui-size-space-4);">Extracted:</span>
					<span>${new Date(this._extraction.source.extractedDate).toLocaleString()}</span>
				</div>
				<uui-button look="secondary" label="Re-extract" @click=${r(this, n, y)} ?disabled=${this._extracting}>
					<uui-icon name="icon-refresh"></uui-icon>
					Re-extract
				</uui-button>
			</div>

			${r(this, n, P).call(this)}
			${t.map(([i, s]) => r(this, n, A).call(this, i, s))}
		`;
};
K = function() {
  return u`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${r(this, n, y)} ?disabled=${this._extracting}>
					${this._extracting ? u`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
d.styles = [
  X,
  R`
			:host {
				display: block;
				height: 100%;
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.success-banner {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-size: var(--uui-type-small-size);
			}

			/* Empty state */
			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: var(--uui-size-layout-2);
				gap: var(--uui-size-space-3);
				text-align: center;
				min-height: 300px;
			}

			.empty-state h3 {
				margin: 0;
				color: var(--uui-color-text);
			}

			.empty-state p {
				margin: 0;
				color: var(--uui-color-text-alt);
			}

			/* Extraction header */
			.extraction-header {
				padding: var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.extraction-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				font-size: var(--uui-type-small-size);
			}

			.info-label {
				font-weight: 600;
				color: var(--uui-color-text-alt);
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			.element-list {
				display: flex;
				flex-direction: column;
			}

			/* Selection toolbar */
			.selection-toolbar {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-selected);
				border-bottom: 1px solid var(--uui-color-border);
				position: sticky;
				top: 0;
				z-index: 1;
			}

			.selection-count {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
			}

			.element-item {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.element-item:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.element-item.element-selected {
				background: var(--uui-color-selected);
			}

			.element-item:last-child {
				border-bottom: none;
			}

			.element-checkbox {
				flex-shrink: 0;
				margin-top: 2px;
			}

			.element-content {
				flex: 1;
				min-width: 0;
			}

			.element-text {
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-2);
				word-break: break-word;
				white-space: pre-wrap;
			}

			.element-meta {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
			}

			.meta-badge {
				font-size: 11px;
				font-family: monospace;
				padding: 1px 6px;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}

			.meta-badge.font-size {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.meta-badge.mapped-target {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				display: inline-flex;
				align-items: center;
				gap: 3px;
			}

			.element-item.element-mapped {
				border-left: 3px solid var(--uui-color-positive-standalone);
			}

			.page-summary {
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				text-align: right;
			}

			/* Visual grouping */
			.visual-group + .visual-group {
				border-top: 2px solid var(--uui-color-border);
				margin-top: var(--uui-size-space-2);
			}

			.group-heading {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.group-heading:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.group-heading.element-selected {
				background: var(--uui-color-selected);
			}

			.group-heading.element-mapped {
				border-left: 3px solid var(--uui-color-positive-standalone);
			}

			.heading-content {
				flex: 1;
				min-width: 0;
			}

			.heading-text {
				font-weight: 700;
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-1);
			}

			.group-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				white-space: nowrap;
			}

			.group-children.indented {
				padding-left: var(--uui-size-space-5);
				border-left: 2px solid var(--uui-color-border);
				margin-left: var(--uui-size-space-4);
			}
		`
];
p([
  h()
], d.prototype, "_extraction", 2);
p([
  h()
], d.prototype, "_config", 2);
p([
  h()
], d.prototype, "_workflowName", 2);
p([
  h()
], d.prototype, "_loading", 2);
p([
  h()
], d.prototype, "_extracting", 2);
p([
  h()
], d.prototype, "_error", 2);
p([
  h()
], d.prototype, "_successMessage", 2);
p([
  h()
], d.prototype, "_selectedElements", 2);
d = p([
  V("up-doc-workflow-source-view")
], d);
const de = d;
export {
  d as UpDocWorkflowSourceViewElement,
  de as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-CLywuELm.js.map
