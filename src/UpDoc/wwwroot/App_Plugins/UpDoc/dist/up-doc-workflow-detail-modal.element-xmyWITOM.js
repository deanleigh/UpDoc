import { b as N } from "./workflow.service-CCTLt2Zy.js";
import { html as i, nothing as r, css as P, state as d, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as E } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as F } from "@umbraco-cms/backoffice/auth";
var B = Object.defineProperty, U = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, u = (e, a, t, n) => {
  for (var l = n > 1 ? void 0 : n ? U(a, t) : a, p = e.length - 1, f; p >= 0; p--)
    (f = e[p]) && (l = (n ? f(a, t, l) : f(l)) || l);
  return n && l && B(a, t, l), l;
}, A = (e, a, t) => a.has(e) || m("Cannot " + t), M = (e, a, t) => a.has(e) ? m("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, t), o = (e, a, t) => (A(e, a, "access private method"), t), s, h, v, g, b, y, _, k, z, $, x, w, T, D, C;
let c = class extends E {
  constructor() {
    super(...arguments), M(this, s), this._config = null, this._loading = !0, this._error = null, this._activeTab = "destination", this._activeDestinationTab = "page-properties";
  }
  async firstUpdated() {
    await o(this, s, h).call(this);
  }
  // =========================================================================
  // Main render
  // =========================================================================
  render() {
    if (this._loading)
      return i`
				<umb-body-layout headline=${this.data?.workflowName ?? "Workflow"}>
					<div class="loading"><uui-loader-bar></uui-loader-bar></div>
				</umb-body-layout>
			`;
    if (this._error)
      return i`
				<umb-body-layout headline=${this.data?.workflowName ?? "Workflow"}>
					<p style="color: var(--uui-color-danger);">${this._error}</p>
					<div slot="actions">
						<uui-button label="Close" @click=${o(this, s, b)}></uui-button>
					</div>
				</umb-body-layout>
			`;
    const e = o(this, s, v).call(this);
    return i`
			<umb-body-layout headline=${this.data?.workflowName ?? "Workflow"}>
				<uui-tab-group slot="navigation">
					${e.map(
      (a) => i`
							<uui-tab
								label=${a.label}
								?active=${this._activeTab === a.id}
								@click=${() => {
        this._activeTab = a.id;
      }}>
								<uui-icon slot="icon" name=${a.icon}></uui-icon>
								${a.label}
							</uui-tab>
						`
    )}
				</uui-tab-group>

				<div class="tab-content">
					${o(this, s, T).call(this)}
				</div>

				<uui-button
					slot="actions"
					label="Close"
					@click=${o(this, s, b)}></uui-button>
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
h = async function() {
  this._loading = !0, this._error = null;
  try {
    const e = this.data?.workflowName;
    if (!e) {
      this._error = "No workflow name provided";
      return;
    }
    const t = await (await this.getContext(F)).getLatestToken();
    if (this._config = await N(e, t), !this._config) {
      this._error = `Workflow "${e}" not found`;
      return;
    }
    const n = o(this, s, v).call(this);
    n.length > 0 && (this._activeTab = n[0].id);
    const l = o(this, s, g).call(this);
    l.length > 0 && (this._activeDestinationTab = l[0].id);
  } catch (e) {
    this._error = e instanceof Error ? e.message : "Failed to load workflow", console.error("Failed to load workflow config:", e);
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
  if (!this._config) return [];
  const e = [], a = new Set(this._config.destination.fields.map((t) => t.tab).filter(Boolean));
  for (const t of a)
    e.push({
      id: t.toLowerCase().replace(/\s+/g, "-"),
      label: t
    });
  return this._config.destination.blockGrids?.length && (a.has("Page Content") || e.push({ id: "page-content", label: "Page Content" })), e;
};
b = function() {
  this._rejectModal();
};
y = function(e) {
  if (!this._config) return r;
  const a = this._config.destination.fields.filter((t) => t.tab === e);
  return a.length === 0 ? i`<p class="empty-message">No fields in this tab.</p>` : i`
			<div class="field-list">
				${a.map((t) => o(this, s, _).call(this, t))}
			</div>
		`;
};
_ = function(e) {
  return i`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${e.label}</span>
					<span class="field-type">${e.type}</span>
					${e.mandatory ? i`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : r}
				</div>
				<div class="field-meta">
					<span class="field-alias">${e.alias}</span>
					${e.description ? i`<span class="field-description">${e.description}</span>` : r}
				</div>
			</div>
		`;
};
k = function() {
  return this._config?.destination.blockGrids?.length ? i`
			${this._config.destination.blockGrids.map((e) => o(this, s, z).call(this, e))}
		` : i`<p class="empty-message">No block grids configured.</p>`;
};
z = function(e) {
  return i`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${e.label}</span>
					<span class="field-alias">${e.alias}</span>
				</div>
				${e.description ? i`<p class="block-grid-description">${e.description}</p>` : r}
				<div class="block-list">
					${e.blocks.map(
    (a) => i`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${a.label}</span>
									${a.identifyBy ? i`<span class="block-identify">identified by: "${a.identifyBy.value}"</span>` : r}
								</div>
								${a.properties?.length ? i`
										<div class="block-properties">
											${a.properties.map(
      (t) => i`
													<div class="block-property">
														<span class="block-property-label">${t.label || t.alias}</span>
														<span class="field-type">${t.type}</span>
														${t.acceptsFormats?.length ? i`<span class="accepts-formats">${t.acceptsFormats.join(", ")}</span>` : r}
													</div>
												`
    )}
										</div>
									` : r}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
$ = function(e) {
  return e.sections.length ? i`
			${e.globals?.columnDetection ? i`
					<div class="source-globals">
						<span class="globals-label">Column Detection:</span>
						<span>${e.globals.columnDetection.enabled ? "Enabled" : "Disabled"}
							${e.globals.columnDetection.enabled ? `(threshold: ${(e.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)` : ""}</span>
					</div>
				` : r}
			<div class="section-list">
				${e.sections.map((a) => o(this, s, x).call(this, a))}
			</div>
		` : i`<p class="empty-message">No extraction sections configured.</p>`;
};
x = function(e) {
  return i`
			<div class="section-item">
				<div class="section-header">
					<span class="section-label">${e.label}</span>
					<span class="section-strategy">${e.strategy}</span>
					${e.required ? i`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : r}
				</div>
				<div class="section-meta">
					<span class="field-alias">${e.key}</span>
					<span class="section-output">${e.outputFormat}</span>
					${e.pages ? i`<span class="section-pages">pages: ${Array.isArray(e.pages) ? e.pages.join(", ") : e.pages}</span>` : r}
				</div>
				${e.description ? i`<p class="section-description">${e.description}</p>` : r}
				${e.strategyParams ? o(this, s, w).call(this, e.strategy, e.strategyParams) : r}
			</div>
		`;
};
w = function(e, a) {
  const t = Object.entries(a).filter(([, n]) => n != null);
  return t.length === 0 ? r : i`
			<div class="strategy-params">
				${t.map(
    ([n, l]) => i`
						<span class="param">
							<span class="param-key">${n}:</span>
							<span class="param-value">${Array.isArray(l) ? l.join(", ") : String(l)}</span>
						</span>
					`
  )}
			</div>
		`;
};
T = function() {
  if (!this._config) return r;
  if (this._activeTab === "destination")
    return o(this, s, D).call(this);
  if (this._activeTab.startsWith("source-")) {
    const e = this._activeTab.replace("source-", ""), a = this._config.sources[e];
    if (a)
      return o(this, s, $).call(this, a);
  }
  return i`<p class="empty-message">Select a tab to view its contents.</p>`;
};
D = function() {
  const e = o(this, s, g).call(this);
  return i`
			<div class="inner-tab-group">
				${e.map(
    (a) => i`
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
				${o(this, s, C).call(this)}
			</div>
		`;
};
C = function() {
  if (!this._config) return r;
  if (this._activeDestinationTab === "page-content")
    return o(this, s, k).call(this);
  const e = this._config.destination.fields.find(
    (a) => a.tab && a.tab.toLowerCase().replace(/\s+/g, "-") === this._activeDestinationTab
  )?.tab;
  return e ? o(this, s, y).call(this, e) : r;
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
u([
  d()
], c.prototype, "_config", 2);
u([
  d()
], c.prototype, "_loading", 2);
u([
  d()
], c.prototype, "_error", 2);
u([
  d()
], c.prototype, "_activeTab", 2);
u([
  d()
], c.prototype, "_activeDestinationTab", 2);
c = u([
  S("up-doc-workflow-detail-modal")
], c);
const R = c;
export {
  c as UpDocWorkflowDetailModalElement,
  R as default
};
//# sourceMappingURL=up-doc-workflow-detail-modal.element-xmyWITOM.js.map
