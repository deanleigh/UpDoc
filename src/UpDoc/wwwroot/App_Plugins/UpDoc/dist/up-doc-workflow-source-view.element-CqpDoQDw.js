import { c as W, b as B, t as I, s as R } from "./workflow.service-Cy8WOA0g.js";
import { html as u, nothing as _, css as F, state as d, customElement as G } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as K } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as V } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as w } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as X } from "@umbraco-cms/backoffice/workspace";
import { UmbModalToken as H, UMB_MODAL_MANAGER_CONTEXT as k } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as q } from "@umbraco-cms/backoffice/media";
const J = new H("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var Q = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, z = (e) => {
  throw TypeError(e);
}, p = (e, t, i, a) => {
  for (var s = a > 1 ? void 0 : a ? Y(t, i) : t, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (s = (a ? l(t, i, s) : l(s)) || s);
  return a && s && Q(t, i, s), s;
}, x = (e, t, i) => t.has(e) || z("Cannot " + i), h = (e, t, i) => (x(e, t, "read from private field"), i ? i.call(e) : t.get(e)), y = (e, t, i) => t.has(e) ? z("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Z = (e, t, i, a) => (x(e, t, "write to private field"), t.set(e, i), i), r = (e, t, i) => (x(e, t, "access private method"), i), f, n, $, v, E, g, M, C, S, T, P, N, D, U, O;
let c = class extends K {
  constructor() {
    super(...arguments), y(this, n), this._extraction = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._selectedElements = /* @__PURE__ */ new Set(), y(this, f, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(X, (e) => {
      e && this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), r(this, n, $).call(this));
      });
    });
  }
  render() {
    return this._loading ? u`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? u`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>` : u`
			<umb-body-layout header-fit-height>
				${this._successMessage ? u`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : _}
				${this._extraction ? r(this, n, U).call(this) : r(this, n, O).call(this)}
			</umb-body-layout>
		`;
  }
};
f = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
$ = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(w);
      Z(this, f, await e.getLatestToken());
      const [t, i] = await Promise.all([
        W(this._workflowName, h(this, f)),
        B(this._workflowName, h(this, f))
      ]);
      this._extraction = t, this._config = i;
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load sample extraction", console.error("Failed to load sample extraction:", e);
    } finally {
      this._loading = !1;
    }
  }
};
v = async function() {
  var s;
  if (!this._workflowName) return;
  const i = await (await this.getContext(k)).open(this, q, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((s = i == null ? void 0 : i.selection) != null && s.length)) return;
  const a = i.selection[0];
  if (a) {
    this._extracting = !0, this._error = null;
    try {
      const l = await (await this.getContext(w)).getLatestToken(), m = await I(this._workflowName, a, l);
      m ? (this._extraction = m, this._successMessage = `Content extracted successfully — ${m.elements.length} elements from ${m.source.totalPages} pages`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (o) {
      this._error = o instanceof Error ? o.message : "Extraction failed", console.error("Sample extraction failed:", o);
    } finally {
      this._extracting = !1;
    }
  }
};
E = function(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e) {
    const a = t.get(i.page);
    a ? a.push(i) : t.set(i.page, [i]);
  }
  return t;
};
g = function(e) {
  const t = new Set(this._selectedElements);
  t.has(e) ? t.delete(e) : t.add(e), this._selectedElements = t;
};
M = function() {
  this._selectedElements = /* @__PURE__ */ new Set();
};
C = async function() {
  var b;
  if (!this._config || this._selectedElements.size === 0) return;
  const i = await (await this.getContext(k)).open(this, J, {
    data: {
      destination: this._config.destination
    }
  }).onSubmit().catch(() => null);
  if (!((b = i == null ? void 0 : i.selectedTargets) != null && b.length) || !this._workflowName) return;
  const s = [...this._config.map.mappings ?? []], o = this._selectedElements.size;
  for (const A of this._selectedElements)
    s.push({
      source: A,
      destinations: i.selectedTargets.map((L) => ({ target: L })),
      enabled: !0
    });
  const l = { ...this._config.map, mappings: s };
  await R(this._workflowName, l, h(this, f)) && (this._config = { ...this._config, map: l }, this._selectedElements = /* @__PURE__ */ new Set(), this._successMessage = `${o} mapping${o !== 1 ? "s" : ""} created`, setTimeout(() => {
    this._successMessage = null;
  }, 3e3));
};
S = function() {
  const e = this._selectedElements.size;
  return e === 0 ? _ : u`
			<div class="selection-toolbar">
				<span class="selection-count">${e} selected</span>
				<uui-button look="primary" compact label="Map to..." @click=${r(this, n, C)}>
					<uui-icon name="icon-nodes"></uui-icon>
					Map to...
				</uui-button>
				<uui-button look="secondary" compact label="Clear" @click=${r(this, n, M)}>
					Clear
				</uui-button>
			</div>
		`;
};
T = function(e) {
  var i, a;
  if (!((a = (i = this._config) == null ? void 0 : i.map) != null && a.mappings)) return [];
  const t = [];
  for (const s of this._config.map.mappings)
    if (s.source === e && s.enabled)
      for (const o of s.destinations)
        t.push(o.target);
  return t;
};
P = function(e) {
  var i, a;
  if (!((i = this._config) != null && i.destination)) return e;
  const t = this._config.destination.fields.find((s) => s.alias === e);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const s of this._config.destination.blockGrids)
      for (const o of s.blocks) {
        const l = (a = o.properties) == null ? void 0 : a.find((m) => m.alias === e);
        if (l) return `${o.label} > ${l.label || l.alias}`;
      }
  return e;
};
N = function(e) {
  const t = e.metadata, i = this._selectedElements.has(e.id), a = r(this, n, T).call(this, e.id), s = a.length > 0;
  return u`
			<div class="element-item ${i ? "element-selected" : ""} ${s ? "element-mapped" : ""}">
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
						${a.map((o) => u`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${r(this, n, P).call(this, o)}</span>`)}
					</div>
				</div>
			</div>
		`;
};
D = function(e, t) {
  return u`
			<uui-box headline="Page ${e}" class="page-box">
				<div class="element-list">
					${t.map((i) => r(this, n, N).call(this, i))}
				</div>
				<div class="page-summary">${t.length} element${t.length !== 1 ? "s" : ""}</div>
			</uui-box>
		`;
};
U = function() {
  if (!this._extraction) return _;
  const e = r(this, n, E).call(this, this._extraction.elements), t = Array.from(e.entries()).sort(([i], [a]) => i - a);
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
				<uui-button look="secondary" label="Re-extract" @click=${r(this, n, v)} ?disabled=${this._extracting}>
					<uui-icon name="icon-refresh"></uui-icon>
					Re-extract
				</uui-button>
			</div>

			${r(this, n, S).call(this)}
			${t.map(([i, a]) => r(this, n, D).call(this, i, a))}
		`;
};
O = function() {
  return u`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${r(this, n, v)} ?disabled=${this._extracting}>
					${this._extracting ? u`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
c.styles = [
  V,
  F`
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
		`
];
p([
  d()
], c.prototype, "_extraction", 2);
p([
  d()
], c.prototype, "_config", 2);
p([
  d()
], c.prototype, "_workflowName", 2);
p([
  d()
], c.prototype, "_loading", 2);
p([
  d()
], c.prototype, "_extracting", 2);
p([
  d()
], c.prototype, "_error", 2);
p([
  d()
], c.prototype, "_successMessage", 2);
p([
  d()
], c.prototype, "_selectedElements", 2);
c = p([
  G("up-doc-workflow-source-view")
], c);
const re = c;
export {
  c as UpDocWorkflowSourceViewElement,
  re as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-CqpDoQDw.js.map
