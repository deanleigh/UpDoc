import { b } from "./workflow.service-C-MBMeeJ.js";
import { html as t, nothing as l, css as _, state as p, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as z } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as C } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as k } from "@umbraco-cms/backoffice/workspace";
var $ = Object.defineProperty, T = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, u = (e, a, o, r) => {
  for (var s = r > 1 ? void 0 : r ? T(a, o) : a, d = e.length - 1, f; d >= 0; d--)
    (f = e[d]) && (s = (r ? f(a, o, s) : f(s)) || s);
  return r && s && $(a, o, s), s;
}, S = (e, a, o) => a.has(e) || g("Cannot " + o), D = (e, a, o) => a.has(e) ? g("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, o), c = (e, a, o) => (S(e, a, "access private method"), o), n, m, h, v, y;
let i = class extends w {
  constructor() {
    super(...arguments), D(this, n), this._sourceConfig = null, this._sourceType = null, this._loading = !0, this._error = null;
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(k, (e) => {
      e && this.observe(e.unique, (a) => {
        a && c(this, n, m).call(this, decodeURIComponent(a));
      });
    });
  }
  render() {
    var e;
    return this._loading ? t`<div class="loading"><uui-loader-bar></uui-loader-bar></div>` : this._error ? t`<p style="color: var(--uui-color-danger);">${this._error}</p>` : !this._sourceConfig || !this._sourceType ? t`<umb-body-layout header-fit-height>
				<p class="empty-message">No source configured for this workflow.</p>
			</umb-body-layout>` : t`
			<umb-body-layout header-fit-height>
				<uui-box headline="Source: ${c(this, n, h).call(this, this._sourceType)}">
					${(e = this._sourceConfig.globals) != null && e.columnDetection ? t`
							<div class="source-globals">
								<span class="globals-label">Column Detection:</span>
								<span>${this._sourceConfig.globals.columnDetection.enabled ? "Enabled" : "Disabled"}
									${this._sourceConfig.globals.columnDetection.enabled ? `(threshold: ${(this._sourceConfig.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)` : ""}</span>
							</div>
						` : l}
					<div class="section-list">
						${this._sourceConfig.sections.map((a) => c(this, n, v).call(this, a))}
					</div>
				</uui-box>
			</umb-body-layout>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
m = async function(e) {
  this._loading = !0, this._error = null;
  try {
    const o = await (await this.getContext(C)).getLatestToken(), r = await b(e, o);
    if (!r) {
      this._error = `Workflow "${e}" not found`;
      return;
    }
    const s = Object.keys(r.sources);
    s.length > 0 ? (this._sourceType = s[0], this._sourceConfig = r.sources[s[0]] ?? null) : (this._sourceType = null, this._sourceConfig = null);
  } catch (a) {
    this._error = a instanceof Error ? a.message : "Failed to load workflow", console.error("Failed to load workflow config:", a);
  } finally {
    this._loading = !1;
  }
};
h = function(e) {
  return { pdf: "PDF", markdown: "Markdown", web: "Web", doc: "Word" }[e] ?? e;
};
v = function(e) {
  return t`
			<div class="section-item">
				<div class="section-header">
					<span class="section-label">${e.label}</span>
					<span class="section-strategy">${e.strategy}</span>
					${e.required ? t`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : l}
				</div>
				<div class="section-meta">
					<span class="field-alias">${e.key}</span>
					<span class="section-output">${e.outputFormat}</span>
					${e.pages ? t`<span class="section-pages">pages: ${Array.isArray(e.pages) ? e.pages.join(", ") : e.pages}</span>` : l}
				</div>
				${e.description ? t`<p class="section-description">${e.description}</p>` : l}
				${e.strategyParams ? c(this, n, y).call(this, e.strategyParams) : l}
			</div>
		`;
};
y = function(e) {
  const a = Object.entries(e).filter(([, o]) => o != null);
  return a.length === 0 ? l : t`
			<div class="strategy-params">
				${a.map(
    ([o, r]) => t`
						<span class="param">
							<span class="param-key">${o}:</span>
							<span class="param-value">${Array.isArray(r) ? r.join(", ") : String(r)}</span>
						</span>
					`
  )}
			</div>
		`;
};
i.styles = [
  z,
  _`
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
u([
  p()
], i.prototype, "_sourceConfig", 2);
u([
  p()
], i.prototype, "_sourceType", 2);
u([
  p()
], i.prototype, "_loading", 2);
u([
  p()
], i.prototype, "_error", 2);
i = u([
  x("up-doc-workflow-source-view")
], i);
const F = i;
export {
  i as UpDocWorkflowSourceViewElement,
  F as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-CrYEoMLy.js.map
