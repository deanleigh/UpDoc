var m = (o) => {
  throw TypeError(o);
};
var w = (o, r, e) => r.has(o) || m("Cannot " + e);
var v = (o, r, e) => r.has(o) ? m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(o) : r.set(o, e);
var p = (o, r, e) => (w(o, r, "access private method"), e);
import { b as C } from "./workflow.service-C-MBMeeJ.js";
import { nothing as u, html as t, css as $, state as g, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as k } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as T } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as P } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as E } from "@umbraco-cms/backoffice/workspace";
var D = Object.defineProperty, O = Object.getOwnPropertyDescriptor, c = (o, r, e, s) => {
  for (var a = s > 1 ? void 0 : s ? O(r, e) : r, i = o.length - 1, d; i >= 0; i--)
    (d = o[i]) && (a = (s ? d(r, e, a) : d(a)) || a);
  return s && a && D(r, e, a), a;
}, l, x, _, z;
const f = class f extends k {
  constructor() {
    super(...arguments);
    v(this, l);
    this.sourceType = "", this._sourceConfig = null, this._loading = !0, this._error = null;
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(E, (e) => {
      e && this.observe(e.unique, (s) => {
        s && p(this, l, x).call(this, decodeURIComponent(s));
      });
    });
  }
  render() {
    var e;
    return this._loading ? t`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? t`<p style="color: var(--uui-color-danger);">${this._error}</p>` : this._sourceConfig ? t`
			${(e = this._sourceConfig.globals) != null && e.columnDetection ? t`
					<div class="source-globals">
						<span class="globals-label">Column Detection:</span>
						<span>${this._sourceConfig.globals.columnDetection.enabled ? "Enabled" : "Disabled"}
							${this._sourceConfig.globals.columnDetection.enabled ? `(threshold: ${(this._sourceConfig.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)` : ""}</span>
					</div>
				` : u}
			<div class="section-list">
				${this._sourceConfig.sections.map((s) => p(this, l, _).call(this, s))}
			</div>
		` : t`<p class="empty-message">No ${this.sourceType} source configured for this workflow.</p>`;
  }
};
l = new WeakSet(), x = async function(e) {
  this._loading = !0, this._error = null;
  try {
    const a = await (await this.getContext(P)).getLatestToken(), i = await C(e, a);
    if (!i) {
      this._error = `Workflow "${e}" not found`;
      return;
    }
    this._sourceConfig = i.sources[this.sourceType] ?? null;
  } catch (s) {
    this._error = s instanceof Error ? s.message : "Failed to load workflow", console.error("Failed to load workflow config:", s);
  } finally {
    this._loading = !1;
  }
}, _ = function(e) {
  return t`
			<div class="section-item">
				<div class="section-header">
					<span class="section-label">${e.label}</span>
					<span class="section-strategy">${e.strategy}</span>
					${e.required ? t`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : u}
				</div>
				<div class="section-meta">
					<span class="field-alias">${e.key}</span>
					<span class="section-output">${e.outputFormat}</span>
					${e.pages ? t`<span class="section-pages">pages: ${Array.isArray(e.pages) ? e.pages.join(", ") : e.pages}</span>` : u}
				</div>
				${e.description ? t`<p class="section-description">${e.description}</p>` : u}
				${e.strategyParams ? p(this, l, z).call(this, e.strategyParams) : u}
			</div>
		`;
}, z = function(e) {
  const s = Object.entries(e).filter(([, a]) => a != null);
  return s.length === 0 ? u : t`
			<div class="strategy-params">
				${s.map(
    ([a, i]) => t`
						<span class="param">
							<span class="param-key">${a}:</span>
							<span class="param-value">${Array.isArray(i) ? i.join(", ") : String(i)}</span>
						</span>
					`
  )}
			</div>
		`;
}, f.styles = [
  T,
  $`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.empty-message {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			.field-badge {
				font-size: 11px;
			}

			.source-globals {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
				font-size: var(--uui-type-small-size);
				display: flex;
				gap: var(--uui-size-space-2);
			}

			.globals-label {
				font-weight: 600;
			}

			.section-list {
				display: flex;
				flex-direction: column;
			}

			.section-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.section-item:last-child {
				border-bottom: none;
			}

			.section-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.section-label {
				font-weight: 600;
			}

			.section-strategy {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.section-meta {
				display: flex;
				gap: var(--uui-size-space-3);
				margin-top: var(--uui-size-space-1);
			}

			.field-alias {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-family: monospace;
			}

			.section-output {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.section-pages {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.section-description {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				margin: var(--uui-size-space-1) 0 0 0;
			}

			.strategy-params {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				background: var(--uui-color-surface-alt);
				border-radius: var(--uui-border-radius);
				font-size: 12px;
				font-family: monospace;
			}

			.param {
				display: inline-flex;
				gap: 4px;
			}

			.param-key {
				color: var(--uui-color-text-alt);
			}

			.param-value {
				color: var(--uui-color-text);
				word-break: break-all;
			}
		`
];
let n = f;
c([
  g()
], n.prototype, "_sourceConfig", 2);
c([
  g()
], n.prototype, "_loading", 2);
c([
  g()
], n.prototype, "_error", 2);
let y = class extends n {
  constructor() {
    super(...arguments), this.sourceType = "pdf";
  }
};
y = c([
  b("up-doc-workflow-pdf-view")
], y);
let h = class extends n {
  constructor() {
    super(...arguments), this.sourceType = "markdown";
  }
};
h = c([
  b("up-doc-workflow-markdown-view")
], h);
export {
  h as UpDocWorkflowMarkdownViewElement,
  y as UpDocWorkflowPdfViewElement
};
//# sourceMappingURL=up-doc-workflow-source-views.element-Dk5jDSSF.js.map
