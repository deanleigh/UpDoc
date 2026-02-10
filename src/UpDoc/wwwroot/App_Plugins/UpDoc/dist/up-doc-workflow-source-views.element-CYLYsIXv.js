var m = (o) => {
  throw TypeError(o);
};
var w = (o, r, e) => r.has(o) || m("Cannot " + e);
var b = (o, r, e) => r.has(o) ? m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(o) : r.set(o, e);
var p = (o, r, e) => (w(o, r, "access private method"), e);
import { b as C } from "./workflow.service-C-MBMeeJ.js";
import { nothing as n, html as t, css as $, state as g, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as k } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as T } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as P } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as E } from "@umbraco-cms/backoffice/workspace";
var D = Object.defineProperty, O = Object.getOwnPropertyDescriptor, c = (o, r, e, a) => {
  for (var s = a > 1 ? void 0 : a ? O(r, e) : r, i = o.length - 1, d; i >= 0; i--)
    (d = o[i]) && (s = (a ? d(r, e, s) : d(s)) || s);
  return a && s && D(r, e, s), s;
}, l, x, _, z;
const f = class f extends k {
  constructor() {
    super(...arguments);
    b(this, l);
    this.sourceType = "", this._sourceConfig = null, this._loading = !0, this._error = null;
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(E, (e) => {
      e && this.observe(e.unique, (a) => {
        a && p(this, l, x).call(this, decodeURIComponent(a));
      });
    });
  }
  render() {
    var e;
    return this._loading ? t`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? t`<p style="color: var(--uui-color-danger);">${this._error}</p>` : this._sourceConfig ? t`
			<umb-body-layout header-fit-height>
				<uui-box>
					${(e = this._sourceConfig.globals) != null && e.columnDetection ? t`
							<div class="source-globals">
								<span class="globals-label">Column Detection:</span>
								<span>${this._sourceConfig.globals.columnDetection.enabled ? "Enabled" : "Disabled"}
									${this._sourceConfig.globals.columnDetection.enabled ? `(threshold: ${(this._sourceConfig.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)` : ""}</span>
							</div>
						` : n}
					<div class="section-list">
						${this._sourceConfig.sections.map((a) => p(this, l, _).call(this, a))}
					</div>
				</uui-box>
			</umb-body-layout>
		` : t`<umb-body-layout header-fit-height>
				<p class="empty-message">No ${this.sourceType} source configured for this workflow.</p>
			</umb-body-layout>`;
  }
};
l = new WeakSet(), x = async function(e) {
  this._loading = !0, this._error = null;
  try {
    const s = await (await this.getContext(P)).getLatestToken(), i = await C(e, s);
    if (!i) {
      this._error = `Workflow "${e}" not found`;
      return;
    }
    this._sourceConfig = i.sources[this.sourceType] ?? null;
  } catch (a) {
    this._error = a instanceof Error ? a.message : "Failed to load workflow", console.error("Failed to load workflow config:", a);
  } finally {
    this._loading = !1;
  }
}, _ = function(e) {
  return t`
			<div class="section-item">
				<div class="section-header">
					<span class="section-label">${e.label}</span>
					<span class="section-strategy">${e.strategy}</span>
					${e.required ? t`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : n}
				</div>
				<div class="section-meta">
					<span class="field-alias">${e.key}</span>
					<span class="section-output">${e.outputFormat}</span>
					${e.pages ? t`<span class="section-pages">pages: ${Array.isArray(e.pages) ? e.pages.join(", ") : e.pages}</span>` : n}
				</div>
				${e.description ? t`<p class="section-description">${e.description}</p>` : n}
				${e.strategyParams ? p(this, l, z).call(this, e.strategyParams) : n}
			</div>
		`;
}, z = function(e) {
  const a = Object.entries(e).filter(([, s]) => s != null);
  return a.length === 0 ? n : t`
			<div class="strategy-params">
				${a.map(
    ([s, i]) => t`
						<span class="param">
							<span class="param-key">${s}:</span>
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
let u = f;
c([
  g()
], u.prototype, "_sourceConfig", 2);
c([
  g()
], u.prototype, "_loading", 2);
c([
  g()
], u.prototype, "_error", 2);
let v = class extends u {
  constructor() {
    super(...arguments), this.sourceType = "pdf";
  }
};
v = c([
  h("up-doc-workflow-pdf-view")
], v);
let y = class extends u {
  constructor() {
    super(...arguments), this.sourceType = "markdown";
  }
};
y = c([
  h("up-doc-workflow-markdown-view")
], y);
export {
  y as UpDocWorkflowMarkdownViewElement,
  v as UpDocWorkflowPdfViewElement
};
//# sourceMappingURL=up-doc-workflow-source-views.element-CYLYsIXv.js.map
