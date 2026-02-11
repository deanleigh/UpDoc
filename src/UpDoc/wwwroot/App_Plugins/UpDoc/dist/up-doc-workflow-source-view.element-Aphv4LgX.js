import { c as W, b as F, t as R, s as V } from "./workflow.service-Cy8WOA0g.js";
import { html as c, nothing as g, css as K, state as m, customElement as H } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as X } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as q } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as $ } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as J } from "@umbraco-cms/backoffice/workspace";
import { UmbModalToken as Q, UMB_MODAL_MANAGER_CONTEXT as E } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as Y } from "@umbraco-cms/backoffice/media";
function Z(e) {
  const t = /* @__PURE__ */ new Map();
  for (const s of e) {
    const o = Math.round(s.metadata.fontSize * 10) / 10;
    t.set(o, (t.get(o) ?? 0) + 1);
  }
  let i = 0, a = 0;
  for (const [s, o] of t)
    o > i && (i = o, a = s);
  return a;
}
function j(e) {
  if (e.length === 0) return [];
  const t = Z(e);
  if (e.every((o) => Math.round(o.metadata.fontSize * 10) / 10 === t))
    return [{ heading: null, children: [...e] }];
  const a = [];
  let s = { heading: null, children: [] };
  for (const o of e)
    Math.round(o.metadata.fontSize * 10) / 10 > t ? ((s.heading || s.children.length > 0) && a.push(s), s = { heading: o, children: [] }) : s.children.push(o);
  return (s.heading || s.children.length > 0) && a.push(s), a;
}
const ee = new Q("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var te = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, M = (e) => {
  throw TypeError(e);
}, h = (e, t, i, a) => {
  for (var s = a > 1 ? void 0 : a ? ie(t, i) : t, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (s = (a ? l(t, i, s) : l(s)) || s);
  return a && s && te(t, i, s), s;
}, b = (e, t, i) => t.has(e) || M("Cannot " + i), v = (e, t, i) => (b(e, t, "read from private field"), i ? i.call(e) : t.get(e)), k = (e, t, i) => t.has(e) ? M("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), ae = (e, t, i, a) => (b(e, t, "write to private field"), t.set(e, i), i), r = (e, t, i) => (b(e, t, "access private method"), i), f, n, S, y, C, _, T, N, P, w, z, D, x, U, O, A, I, B;
let u = class extends X {
  constructor() {
    super(...arguments), k(this, n), this._extraction = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._selectedElements = /* @__PURE__ */ new Set(), k(this, f, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(J, (e) => {
      e && this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), r(this, n, S).call(this));
      });
    });
  }
  render() {
    return this._loading ? c`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? c`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>` : c`
			<umb-body-layout header-fit-height>
				${this._successMessage ? c`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : g}
				${this._extraction ? r(this, n, I).call(this) : r(this, n, B).call(this)}
			</umb-body-layout>
		`;
  }
};
f = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
S = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext($);
      ae(this, f, await e.getLatestToken());
      const [t, i] = await Promise.all([
        W(this._workflowName, v(this, f)),
        F(this._workflowName, v(this, f))
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
  var s;
  if (!this._workflowName) return;
  const i = await (await this.getContext(E)).open(this, Y, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((s = i == null ? void 0 : i.selection) != null && s.length)) return;
  const a = i.selection[0];
  if (a) {
    this._extracting = !0, this._error = null;
    try {
      const l = await (await this.getContext($)).getLatestToken(), p = await R(this._workflowName, a, l);
      p ? (this._extraction = p, this._successMessage = `Content extracted successfully — ${p.elements.length} elements from ${p.source.totalPages} pages`, setTimeout(() => {
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
    const a = t.get(i.page);
    a ? a.push(i) : t.set(i.page, [i]);
  }
  return t;
};
_ = function(e) {
  const t = new Set(this._selectedElements);
  t.has(e) ? t.delete(e) : t.add(e), this._selectedElements = t;
};
T = function() {
  this._selectedElements = /* @__PURE__ */ new Set();
};
N = async function() {
  var d;
  if (!this._config || this._selectedElements.size === 0) return;
  const i = await (await this.getContext(E)).open(this, ee, {
    data: {
      destination: this._config.destination
    }
  }).onSubmit().catch(() => null);
  if (!((d = i == null ? void 0 : i.selectedTargets) != null && d.length) || !this._workflowName) return;
  const s = [...this._config.map.mappings ?? []], o = this._selectedElements.size;
  for (const G of this._selectedElements)
    s.push({
      source: G,
      destinations: i.selectedTargets.map((L) => ({ target: L })),
      enabled: !0
    });
  const l = { ...this._config.map, mappings: s };
  await V(this._workflowName, l, v(this, f)) && (this._config = { ...this._config, map: l }, this._selectedElements = /* @__PURE__ */ new Set(), this._successMessage = `${o} mapping${o !== 1 ? "s" : ""} created`, setTimeout(() => {
    this._successMessage = null;
  }, 3e3));
};
P = function() {
  const e = this._selectedElements.size;
  return e === 0 ? g : c`
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
w = function(e) {
  var i, a;
  if (!((a = (i = this._config) == null ? void 0 : i.map) != null && a.mappings)) return [];
  const t = [];
  for (const s of this._config.map.mappings)
    if (s.source === e && s.enabled)
      for (const o of s.destinations)
        t.push(o.target);
  return t;
};
z = function(e) {
  var i, a;
  if (!((i = this._config) != null && i.destination)) return e;
  const t = this._config.destination.fields.find((s) => s.alias === e);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const s of this._config.destination.blockGrids)
      for (const o of s.blocks) {
        const l = (a = o.properties) == null ? void 0 : a.find((p) => p.alias === e);
        if (l) return `${o.label} > ${l.label || l.alias}`;
      }
  return e;
};
D = function(e) {
  const t = e.metadata, i = this._selectedElements.has(e.id), a = r(this, n, w).call(this, e.id), s = a.length > 0;
  return c`
			<div class="element-item ${i ? "element-selected" : ""} ${s ? "element-mapped" : ""}">
				<uui-checkbox
					label="Select for mapping"
					?checked=${i}
					@change=${() => r(this, n, _).call(this, e.id)}
					class="element-checkbox">
				</uui-checkbox>
				<div class="element-content" @click=${() => r(this, n, _).call(this, e.id)}>
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${t.fontSize}pt</span>
						<span class="meta-badge font-name">${t.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${t.color};">${t.color}</span>
						<span class="meta-badge position">x:${t.position.x} y:${t.position.y}</span>
						${a.map((o) => c`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${r(this, n, z).call(this, o)}</span>`)}
					</div>
				</div>
			</div>
		`;
};
x = function(e, t) {
  const i = new Set(this._selectedElements), a = [e.id, ...t.map((o) => o.id)];
  if (a.every((o) => i.has(o)))
    for (const o of a) i.delete(o);
  else
    for (const o of a) i.add(o);
  this._selectedElements = i;
};
U = function(e, t) {
  const i = e.metadata, a = [e.id, ...t.map((d) => d.id)], s = a.every((d) => this._selectedElements.has(d)), o = a.some((d) => this._selectedElements.has(d)), l = r(this, n, w).call(this, e.id), p = l.length > 0;
  return c`
			<div class="group-heading ${p ? "element-mapped" : ""}">
				<uui-checkbox
					label="Select ${e.text} and all items in this group"
					?checked=${s}
					.indeterminate=${o && !s}
					@change=${() => r(this, n, x).call(this, e, t)}
					class="element-checkbox">
				</uui-checkbox>
				<div class="heading-content" @click=${() => r(this, n, x).call(this, e, t)}>
					<div class="heading-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${i.fontSize}pt</span>
						<span class="meta-badge font-name">${i.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${i.color};">${i.color}</span>
						${l.map((d) => c`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${r(this, n, z).call(this, d)}</span>`)}
					</div>
				</div>
				<span class="group-count">${t.length} item${t.length !== 1 ? "s" : ""}</span>
			</div>
		`;
};
O = function(e) {
  return c`
			<div class="visual-group">
				${e.heading ? r(this, n, U).call(this, e.heading, e.children) : g}
				<div class="group-children ${e.heading ? "indented" : ""}">
					${e.children.map((t) => r(this, n, D).call(this, t))}
				</div>
			</div>
		`;
};
A = function(e, t) {
  const i = j(t);
  return c`
			<uui-box headline="Page ${e}" class="page-box">
				${i.map((a) => r(this, n, O).call(this, a))}
				<div class="page-summary">${t.length} element${t.length !== 1 ? "s" : ""}</div>
			</uui-box>
		`;
};
I = function() {
  if (!this._extraction) return g;
  const e = r(this, n, C).call(this, this._extraction.elements), t = Array.from(e.entries()).sort(([i], [a]) => i - a);
  return c`
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
			${t.map(([i, a]) => r(this, n, A).call(this, i, a))}
		`;
};
B = function() {
  return c`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${r(this, n, y)} ?disabled=${this._extracting}>
					${this._extracting ? c`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
u.styles = [
  q,
  K`
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
h([
  m()
], u.prototype, "_extraction", 2);
h([
  m()
], u.prototype, "_config", 2);
h([
  m()
], u.prototype, "_workflowName", 2);
h([
  m()
], u.prototype, "_loading", 2);
h([
  m()
], u.prototype, "_extracting", 2);
h([
  m()
], u.prototype, "_error", 2);
h([
  m()
], u.prototype, "_successMessage", 2);
h([
  m()
], u.prototype, "_selectedElements", 2);
u = h([
  H("up-doc-workflow-source-view")
], u);
const pe = u;
export {
  u as UpDocWorkflowSourceViewElement,
  pe as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-Aphv4LgX.js.map
