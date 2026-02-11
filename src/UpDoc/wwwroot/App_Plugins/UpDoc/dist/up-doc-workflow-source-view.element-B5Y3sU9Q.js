import { d as E, t as k } from "./workflow.service-BWNI6sBi.js";
import { html as n, nothing as f, css as $, state as p, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as M } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as P } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as g } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as S } from "@umbraco-cms/backoffice/workspace";
import { UMB_MODAL_MANAGER_CONTEXT as D } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as N } from "@umbraco-cms/backoffice/media";
var U = Object.defineProperty, T = Object.getOwnPropertyDescriptor, x = (t) => {
  throw TypeError(t);
}, u = (t, e, a, i) => {
  for (var o = i > 1 ? void 0 : i ? T(e, a) : e, l = t.length - 1, d; l >= 0; l--)
    (d = t[l]) && (o = (i ? d(e, a, o) : d(o)) || o);
  return i && o && U(e, a, o), o;
}, O = (t, e, a) => e.has(t) || x("Cannot " + a), A = (t, e, a) => e.has(t) ? x("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), c = (t, e, a) => (O(t, e, "access private method"), a), s, _, h, v, y, b, w, z;
let r = class extends M {
  constructor() {
    super(...arguments), A(this, s), this._extraction = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null;
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(S, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), c(this, s, _).call(this));
      });
    });
  }
  render() {
    return this._loading ? n`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? n`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>` : n`
			<umb-body-layout header-fit-height>
				${this._successMessage ? n`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : f}
				${this._extraction ? c(this, s, w).call(this) : c(this, s, z).call(this)}
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
_ = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await (await this.getContext(g)).getLatestToken();
      this._extraction = await E(this._workflowName, e);
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to load sample extraction", console.error("Failed to load sample extraction:", t);
    } finally {
      this._loading = !1;
    }
  }
};
h = async function() {
  var o;
  if (!this._workflowName) return;
  const a = await (await this.getContext(D)).open(this, N, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((o = a == null ? void 0 : a.selection) != null && o.length)) return;
  const i = a.selection[0];
  if (i) {
    this._extracting = !0, this._error = null;
    try {
      const d = await (await this.getContext(g)).getLatestToken(), m = await k(this._workflowName, i, d);
      m ? (this._extraction = m, this._successMessage = `Content extracted successfully — ${m.elements.length} elements from ${m.source.totalPages} pages`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (l) {
      this._error = l instanceof Error ? l.message : "Extraction failed", console.error("Sample extraction failed:", l);
    } finally {
      this._extracting = !1;
    }
  }
};
v = function(t) {
  const e = /* @__PURE__ */ new Map();
  for (const a of t) {
    const i = e.get(a.page);
    i ? i.push(a) : e.set(a.page, [a]);
  }
  return e;
};
y = function(t) {
  const e = t.metadata;
  return n`
			<div class="element-item">
				<div class="element-text">${t.text}</div>
				<div class="element-meta">
					<span class="meta-badge font-size">${e.fontSize}pt</span>
					<span class="meta-badge font-name">${e.fontName}</span>
					<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
					<span class="meta-badge position">x:${e.position.x} y:${e.position.y}</span>
				</div>
			</div>
		`;
};
b = function(t, e) {
  return n`
			<uui-box headline="Page ${t}" class="page-box">
				<div class="element-list">
					${e.map((a) => c(this, s, y).call(this, a))}
				</div>
				<div class="page-summary">${e.length} element${e.length !== 1 ? "s" : ""}</div>
			</uui-box>
		`;
};
w = function() {
  if (!this._extraction) return f;
  const t = c(this, s, v).call(this, this._extraction.elements), e = Array.from(t.entries()).sort(([a], [i]) => a - i);
  return n`
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
				<uui-button look="secondary" label="Re-extract" @click=${c(this, s, h)} ?disabled=${this._extracting}>
					<uui-icon name="icon-refresh"></uui-icon>
					Re-extract
				</uui-button>
			</div>

			${e.map(([a, i]) => c(this, s, b).call(this, a, i))}
		`;
};
z = function() {
  return n`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${c(this, s, h)} ?disabled=${this._extracting}>
					${this._extracting ? n`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
r.styles = [
  P,
  $`
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

			.element-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.element-item:last-child {
				border-bottom: none;
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

			.page-summary {
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				text-align: right;
			}
		`
];
u([
  p()
], r.prototype, "_extraction", 2);
u([
  p()
], r.prototype, "_workflowName", 2);
u([
  p()
], r.prototype, "_loading", 2);
u([
  p()
], r.prototype, "_extracting", 2);
u([
  p()
], r.prototype, "_error", 2);
u([
  p()
], r.prototype, "_successMessage", 2);
r = u([
  C("up-doc-workflow-source-view")
], r);
const X = r;
export {
  r as UpDocWorkflowSourceViewElement,
  X as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-B5Y3sU9Q.js.map
