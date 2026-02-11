import { c as N } from "./workflow.service-BWNI6sBi.js";
import { html as t, nothing as n, css as P, state as p, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as E } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as F } from "@umbraco-cms/backoffice/auth";
var B = Object.defineProperty, U = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, d = (e, a, i, s) => {
  for (var o = s > 1 ? void 0 : s ? U(a, i) : a, u = e.length - 1, f; u >= 0; u--)
    (f = e[u]) && (o = (s ? f(a, i, o) : f(o)) || o);
  return s && o && B(a, i, o), o;
}, A = (e, a, i) => a.has(e) || m("Cannot " + i), M = (e, a, i) => a.has(e) ? m("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, i), l = (e, a, i) => (A(e, a, "access private method"), i), r, h, v, g, b, y, _, k, z, $, x, w, T, D, C;
let c = class extends E {
  constructor() {
    super(...arguments), M(this, r), this._config = null, this._loading = !0, this._error = null, this._activeTab = "destination", this._activeDestinationTab = "page-properties";
  }
  async firstUpdated() {
    await l(this, r, h).call(this);
  }
  // =========================================================================
  // Main render
  // =========================================================================
  render() {
    var a, i, s;
    if (this._loading)
      return t`
				<umb-body-layout headline=${((a = this.data) == null ? void 0 : a.workflowName) ?? "Workflow"}>
					<div class="loading"><uui-loader-bar></uui-loader-bar></div>
				</umb-body-layout>
			`;
    if (this._error)
      return t`
				<umb-body-layout headline=${((i = this.data) == null ? void 0 : i.workflowName) ?? "Workflow"}>
					<p style="color: var(--uui-color-danger);">${this._error}</p>
					<div slot="actions">
						<uui-button label="Close" @click=${l(this, r, b)}></uui-button>
					</div>
				</umb-body-layout>
			`;
    const e = l(this, r, v).call(this);
    return t`
			<umb-body-layout headline=${((s = this.data) == null ? void 0 : s.workflowName) ?? "Workflow"}>
				<uui-tab-group slot="navigation">
					${e.map(
      (o) => t`
							<uui-tab
								label=${o.label}
								?active=${this._activeTab === o.id}
								@click=${() => {
        this._activeTab = o.id;
      }}>
								<uui-icon slot="icon" name=${o.icon}></uui-icon>
								${o.label}
							</uui-tab>
						`
    )}
				</uui-tab-group>

				<div class="tab-content">
					${l(this, r, T).call(this)}
				</div>

				<uui-button
					slot="actions"
					label="Close"
					@click=${l(this, r, b)}></uui-button>
			</umb-body-layout>
		`;
  }
};
r = /* @__PURE__ */ new WeakSet();
h = async function() {
  var e;
  this._loading = !0, this._error = null;
  try {
    const a = (e = this.data) == null ? void 0 : e.workflowName;
    if (!a) {
      this._error = "No workflow name provided";
      return;
    }
    const s = await (await this.getContext(F)).getLatestToken();
    if (this._config = await N(a, s), !this._config) {
      this._error = `Workflow "${a}" not found`;
      return;
    }
    const o = l(this, r, v).call(this);
    o.length > 0 && (this._activeTab = o[0].id);
    const u = l(this, r, g).call(this);
    u.length > 0 && (this._activeDestinationTab = u[0].id);
  } catch (a) {
    this._error = a instanceof Error ? a.message : "Failed to load workflow", console.error("Failed to load workflow config:", a);
  } finally {
    this._loading = !1;
  }
};
v = function() {
  if (!this._config) return [];
  const e = [
    { id: "destination", label: "Destination", icon: "icon-blueprint" }
  ];
  for (const a of Object.keys(this._config.sources))
    e.push({
      id: `source-${a}`,
      label: a.charAt(0).toUpperCase() + a.slice(1),
      icon: a === "pdf" ? "icon-document" : a === "markdown" ? "icon-code" : "icon-globe"
    });
  return e;
};
g = function() {
  var i;
  if (!this._config) return [];
  const e = [], a = new Set(this._config.destination.fields.map((s) => s.tab).filter(Boolean));
  for (const s of a)
    e.push({
      id: s.toLowerCase().replace(/\s+/g, "-"),
      label: s
    });
  return (i = this._config.destination.blockGrids) != null && i.length && (a.has("Page Content") || e.push({ id: "page-content", label: "Page Content" })), e;
};
b = function() {
  this._rejectModal();
};
y = function(e) {
  if (!this._config) return n;
  const a = this._config.destination.fields.filter((i) => i.tab === e);
  return a.length === 0 ? t`<p class="empty-message">No fields in this tab.</p>` : t`
			<div class="field-list">
				${a.map((i) => l(this, r, _).call(this, i))}
			</div>
		`;
};
_ = function(e) {
  return t`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${e.label}</span>
					<span class="field-type">${e.type}</span>
					${e.mandatory ? t`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : n}
				</div>
				<div class="field-meta">
					<span class="field-alias">${e.alias}</span>
					${e.description ? t`<span class="field-description">${e.description}</span>` : n}
				</div>
			</div>
		`;
};
k = function() {
  var e, a;
  return (a = (e = this._config) == null ? void 0 : e.destination.blockGrids) != null && a.length ? t`
			${this._config.destination.blockGrids.map((i) => l(this, r, z).call(this, i))}
		` : t`<p class="empty-message">No block grids configured.</p>`;
};
z = function(e) {
  return t`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${e.label}</span>
					<span class="field-alias">${e.alias}</span>
				</div>
				${e.description ? t`<p class="block-grid-description">${e.description}</p>` : n}
				<div class="block-list">
					${e.blocks.map(
    (a) => {
      var i;
      return t`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${a.label}</span>
									${a.identifyBy ? t`<span class="block-identify">identified by: "${a.identifyBy.value}"</span>` : n}
								</div>
								${(i = a.properties) != null && i.length ? t`
										<div class="block-properties">
											${a.properties.map(
        (s) => {
          var o;
          return t`
													<div class="block-property">
														<span class="block-property-label">${s.label || s.alias}</span>
														<span class="field-type">${s.type}</span>
														${(o = s.acceptsFormats) != null && o.length ? t`<span class="accepts-formats">${s.acceptsFormats.join(", ")}</span>` : n}
													</div>
												`;
        }
      )}
										</div>
									` : n}
							</div>
						`;
    }
  )}
				</div>
			</div>
		`;
};
$ = function(e) {
  var a;
  return e.sections.length ? t`
			${(a = e.globals) != null && a.columnDetection ? t`
					<div class="source-globals">
						<span class="globals-label">Column Detection:</span>
						<span>${e.globals.columnDetection.enabled ? "Enabled" : "Disabled"}
							${e.globals.columnDetection.enabled ? `(threshold: ${(e.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)` : ""}</span>
					</div>
				` : n}
			<div class="section-list">
				${e.sections.map((i) => l(this, r, x).call(this, i))}
			</div>
		` : t`<p class="empty-message">No extraction sections configured.</p>`;
};
x = function(e) {
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
				${e.strategyParams ? l(this, r, w).call(this, e.strategy, e.strategyParams) : n}
			</div>
		`;
};
w = function(e, a) {
  const i = Object.entries(a).filter(([, s]) => s != null);
  return i.length === 0 ? n : t`
			<div class="strategy-params">
				${i.map(
    ([s, o]) => t`
						<span class="param">
							<span class="param-key">${s}:</span>
							<span class="param-value">${Array.isArray(o) ? o.join(", ") : String(o)}</span>
						</span>
					`
  )}
			</div>
		`;
};
T = function() {
  if (!this._config) return n;
  if (this._activeTab === "destination")
    return l(this, r, D).call(this);
  if (this._activeTab.startsWith("source-")) {
    const e = this._activeTab.replace("source-", ""), a = this._config.sources[e];
    if (a)
      return l(this, r, $).call(this, a);
  }
  return t`<p class="empty-message">Select a tab to view its contents.</p>`;
};
D = function() {
  const e = l(this, r, g).call(this);
  return t`
			<div class="inner-tab-group">
				${e.map(
    (a) => t`
						<button
							class="inner-tab ${this._activeDestinationTab === a.id ? "active" : ""}"
							@click=${() => {
      this._activeDestinationTab = a.id;
    }}>
							${a.label}
						</button>
					`
  )}
			</div>
			<div class="inner-tab-content">
				${l(this, r, C).call(this)}
			</div>
		`;
};
C = function() {
  var a;
  if (!this._config) return n;
  if (this._activeDestinationTab === "page-content")
    return l(this, r, k).call(this);
  const e = (a = this._config.destination.fields.find(
    (i) => i.tab && i.tab.toLowerCase().replace(/\s+/g, "-") === this._activeDestinationTab
  )) == null ? void 0 : a.tab;
  return e ? l(this, r, y).call(this, e) : n;
};
c.styles = [
  W,
  P`
			/* Tab content area */
			.tab-content {
				padding: var(--uui-size-space-1) 0;
			}

			/* Inner destination tabs (content-area style) */
			.inner-tab-group {
				display: flex;
				gap: 0;
				border-bottom: 1px solid var(--uui-color-border);
				margin-bottom: var(--uui-size-space-4);
			}

			.inner-tab {
				all: unset;
				padding: var(--uui-size-space-3) var(--uui-size-space-5);
				cursor: pointer;
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text-alt);
				border-bottom: 2px solid transparent;
				transition: color 120ms, border-color 120ms;
			}

			.inner-tab:hover {
				color: var(--uui-color-text);
			}

			.inner-tab.active {
				color: var(--uui-color-text);
				border-bottom-color: var(--uui-color-current);
				font-weight: 600;
			}

			.inner-tab-content {
				min-height: 100px;
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.empty-message {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Field list (Page Properties) */
			.field-list {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
			}

			.field-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.field-item:last-child {
				border-bottom: none;
			}

			.field-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.field-label {
				font-weight: 600;
			}

			.field-type {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.field-badge {
				font-size: 11px;
			}

			.field-meta {
				display: flex;
				gap: var(--uui-size-space-3);
				margin-top: var(--uui-size-space-1);
			}

			.field-alias {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-family: monospace;
			}

			.field-description {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			/* Block grid (Page Content) */
			.block-grid {
				margin-bottom: var(--uui-size-space-5);
			}

			.block-grid-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-grid-label {
				font-weight: 600;
			}

			.block-grid-description {
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				margin: 0;
			}

			.block-list {
				display: flex;
				flex-direction: column;
			}

			.block-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				padding-left: var(--uui-size-space-6);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-item:last-child {
				border-bottom: none;
			}

			.block-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.block-label {
				font-weight: 600;
			}

			.block-identify {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			.block-properties {
				margin-top: var(--uui-size-space-2);
				padding-left: var(--uui-size-space-5);
			}

			.block-property {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-1) 0;
			}

			.block-property-label {
				font-size: var(--uui-type-small-size);
			}

			.accepts-formats {
				font-size: 11px;
				color: var(--uui-color-text-alt);
			}

			/* Source sections */
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
d([
  p()
], c.prototype, "_config", 2);
d([
  p()
], c.prototype, "_loading", 2);
d([
  p()
], c.prototype, "_error", 2);
d([
  p()
], c.prototype, "_activeTab", 2);
d([
  p()
], c.prototype, "_activeDestinationTab", 2);
c = d([
  S("up-doc-workflow-detail-modal")
], c);
const R = c;
export {
  c as UpDocWorkflowDetailModalElement,
  R as default
};
//# sourceMappingURL=up-doc-workflow-detail-modal.element-B5aYiNGz.js.map
