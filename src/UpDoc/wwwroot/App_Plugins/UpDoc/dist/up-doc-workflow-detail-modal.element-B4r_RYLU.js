import { b as S } from "./workflow.service-CWGlGq_3.js";
import { g as p } from "./destination-utils-DUfOJy5W.js";
import { html as a, nothing as n, css as W, state as d, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as N } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as U } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as M } from "@umbraco-cms/backoffice/auth";
var O = Object.defineProperty, j = Object.getOwnPropertyDescriptor, h = (i) => {
  throw TypeError(i);
}, u = (i, e, t, r) => {
  for (var l = r > 1 ? void 0 : r ? j(e, t) : e, f = i.length - 1, b; f >= 0; f--)
    (b = i[f]) && (l = (r ? b(e, t, l) : b(l)) || l);
  return r && l && O(e, t, l), l;
}, L = (i, e, t) => e.has(i) || h("Cannot " + t), q = (i, e, t) => e.has(i) ? h("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), o = (i, e, t) => (L(i, e, "access private method"), t), s, y, g, m, v, x, _, z, $, k, w, T, D, C, A, B, P, F;
let c = class extends U {
  constructor() {
    super(...arguments), q(this, s), this._config = null, this._loading = !0, this._error = null, this._activeTab = "destination", this._activeDestinationTab = "page-properties";
  }
  async firstUpdated() {
    await o(this, s, y).call(this);
  }
  // =========================================================================
  // Main render
  // =========================================================================
  render() {
    if (this._loading)
      return a`
				<umb-body-layout headline=${this.data?.workflowAlias ?? "Workflow"}>
					<div class="loading"><uui-loader-bar></uui-loader-bar></div>
				</umb-body-layout>
			`;
    if (this._error)
      return a`
				<umb-body-layout headline=${this.data?.workflowAlias ?? "Workflow"}>
					<p style="color: var(--uui-color-danger);">${this._error}</p>
					<div slot="actions">
						<uui-button label="Close" @click=${o(this, s, v)}></uui-button>
					</div>
				</umb-body-layout>
			`;
    const i = o(this, s, g).call(this);
    return a`
			<umb-body-layout headline=${this.data?.workflowAlias ?? "Workflow"}>
				<uui-tab-group slot="navigation">
					${i.map(
      (e) => a`
							<uui-tab
								label=${e.label}
								?active=${this._activeTab === e.id}
								@click=${() => {
        this._activeTab = e.id;
      }}>
								<uui-icon slot="icon" name=${e.icon}></uui-icon>
								${e.label}
							</uui-tab>
						`
    )}
				</uui-tab-group>

				<div class="tab-content">
					${o(this, s, B).call(this)}
				</div>

				<uui-button
					slot="actions"
					label="Close"
					@click=${o(this, s, v)}></uui-button>
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
y = async function() {
  this._loading = !0, this._error = null;
  try {
    const i = this.data?.workflowAlias;
    if (!i) {
      this._error = "No workflow name provided";
      return;
    }
    const t = await (await this.getContext(M)).getLatestToken();
    if (this._config = await S(i, t), !this._config) {
      this._error = `Workflow "${i}" not found`;
      return;
    }
    const r = o(this, s, g).call(this);
    r.length > 0 && (this._activeTab = r[0].id);
    const l = o(this, s, m).call(this);
    l.length > 0 && (this._activeDestinationTab = l[0].id);
  } catch (i) {
    this._error = i instanceof Error ? i.message : "Failed to load workflow", console.error("Failed to load workflow config:", i);
  } finally {
    this._loading = !1;
  }
};
g = function() {
  if (!this._config) return [];
  const i = [
    { id: "destination", label: "Destination", icon: "icon-blueprint" }
  ];
  for (const e of Object.keys(this._config.sources))
    i.push({
      id: `source-${e}`,
      label: e.charAt(0).toUpperCase() + e.slice(1),
      icon: e === "pdf" ? "icon-document" : e === "markdown" ? "icon-code" : "icon-globe"
    });
  return i;
};
m = function() {
  if (!this._config) return [];
  const i = [], e = new Set(this._config.destination.fields.map((t) => t.tab).filter(Boolean));
  for (const t of e)
    i.push({
      id: t.toLowerCase().replace(/\s+/g, "-"),
      label: t
    });
  for (const t of p(this._config.destination)) {
    const r = t.tab ?? "Page Content";
    e.has(r) || (e.add(r), i.push({
      id: r.toLowerCase().replace(/\s+/g, "-"),
      label: r
    }));
  }
  return i;
};
v = function() {
  this._rejectModal();
};
x = function() {
  return this._config ? this._config.destination.fields.length : 0;
};
_ = function() {
  return this._config ? p(this._config.destination).reduce((i, e) => i + e.blocks.length, 0) : 0;
};
z = function() {
  if (!this._config) return n;
  const i = this._config.destination;
  return a`
			<div class="dest-info-boxes">
				<div class="dest-info-box">
					<div class="dest-info-box-header">Blueprint</div>
					<umb-icon class="dest-info-box-icon" name="icon-blueprint"></umb-icon>
					<div class="dest-info-box-value">${i.blueprintName ?? "—"}</div>
					<div class="dest-info-box-sub">&nbsp;</div>
				</div>
				<div class="dest-info-box">
					<div class="dest-info-box-header">Document Type</div>
					<umb-icon class="dest-info-box-icon" name="icon-document-dashed-line"></umb-icon>
					<div class="dest-info-box-value">${i.documentTypeName ?? i.documentTypeAlias}</div>
					<div class="dest-info-box-sub">${i.documentTypeAlias}</div>
				</div>
				<div class="dest-info-box">
					<div class="dest-info-box-header">Fields</div>
					<umb-icon class="dest-info-box-icon" name="icon-layers"></umb-icon>
					<div class="dest-info-box-number">${o(this, s, x).call(this)}</div>
					<div class="dest-info-box-sub">text-mappable</div>
				</div>
				<div class="dest-info-box">
					<div class="dest-info-box-header">Blocks</div>
					<umb-icon class="dest-info-box-icon" name="icon-box"></umb-icon>
					<div class="dest-info-box-number">${o(this, s, _).call(this)}</div>
					<div class="dest-info-box-sub">in blueprint</div>
				</div>
			</div>
		`;
};
$ = function(i) {
  if (!this._config) return n;
  const e = this._config.destination.fields.filter((t) => t.tab === i);
  return e.length === 0 ? a`<p class="empty-message">No fields in this tab.</p>` : a`
			<div class="field-list">
				${e.map((t) => o(this, s, k).call(this, t))}
			</div>
		`;
};
k = function(i) {
  return a`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${i.label}</span>
					<span class="field-type">${i.type}</span>
					${i.mandatory ? a`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : n}
				</div>
				<div class="field-meta">
					<span class="field-alias">${i.alias}</span>
					${i.description ? a`<span class="field-description">${i.description}</span>` : n}
				</div>
			</div>
		`;
};
w = function(i) {
  if (!this._config) return n;
  const e = p(this._config.destination).filter((t) => (t.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === i);
  return e.length ? a`
			${e.map((t) => o(this, s, T).call(this, t))}
		` : a`<p class="empty-message">No blocks configured.</p>`;
};
T = function(i) {
  return a`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${i.label}</span>
					<span class="field-alias">${i.alias}</span>
				</div>
				${i.description ? a`<p class="block-grid-description">${i.description}</p>` : n}
				<div class="block-list">
					${i.blocks.map(
    (e) => a`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${e.label}</span>
									${e.identifyBy ? a`<span class="block-identify">identified by: "${e.identifyBy.value}"</span>` : n}
								</div>
								${e.properties?.length ? a`
										<div class="block-properties">
											${e.properties.map(
      (t) => a`
													<div class="block-property">
														<span class="block-property-label">${t.label || t.alias}</span>
														<span class="field-type">${t.type}</span>
														${t.acceptsFormats?.length ? a`<span class="accepts-formats">${t.acceptsFormats.join(", ")}</span>` : n}
													</div>
												`
    )}
										</div>
									` : n}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
D = function(i) {
  return i.sections.length ? a`
			${i.globals?.columnDetection ? a`
					<div class="source-globals">
						<span class="globals-label">Column Detection:</span>
						<span>${i.globals.columnDetection.enabled ? "Enabled" : "Disabled"}
							${i.globals.columnDetection.enabled ? `(threshold: ${(i.globals.columnDetection.thresholdPercent * 100).toFixed(0)}%)` : ""}</span>
					</div>
				` : n}
			<div class="section-list">
				${i.sections.map((e) => o(this, s, C).call(this, e))}
			</div>
		` : a`<p class="empty-message">No extraction sections configured.</p>`;
};
C = function(i) {
  return a`
			<div class="section-item">
				<div class="section-header">
					<span class="section-label">${i.label}</span>
					<span class="section-strategy">${i.strategy}</span>
					${i.required ? a`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : n}
				</div>
				<div class="section-meta">
					<span class="field-alias">${i.key}</span>
					<span class="section-output">${i.outputFormat}</span>
					${i.pages ? a`<span class="section-pages">pages: ${Array.isArray(i.pages) ? i.pages.join(", ") : i.pages}</span>` : n}
				</div>
				${i.description ? a`<p class="section-description">${i.description}</p>` : n}
				${i.strategyParams ? o(this, s, A).call(this, i.strategy, i.strategyParams) : n}
			</div>
		`;
};
A = function(i, e) {
  const t = Object.entries(e).filter(([, r]) => r != null);
  return t.length === 0 ? n : a`
			<div class="strategy-params">
				${t.map(
    ([r, l]) => a`
						<span class="param">
							<span class="param-key">${r}:</span>
							<span class="param-value">${Array.isArray(l) ? l.join(", ") : String(l)}</span>
						</span>
					`
  )}
			</div>
		`;
};
B = function() {
  if (!this._config) return n;
  if (this._activeTab === "destination")
    return o(this, s, P).call(this);
  if (this._activeTab.startsWith("source-")) {
    const i = this._activeTab.replace("source-", ""), e = this._config.sources[i];
    if (e)
      return o(this, s, D).call(this, e);
  }
  return a`<p class="empty-message">Select a tab to view its contents.</p>`;
};
P = function() {
  const i = o(this, s, m).call(this);
  return a`
			<div class="inner-tab-group">
				${i.map(
    (e) => a`
						<button
							class="inner-tab ${this._activeDestinationTab === e.id ? "active" : ""}"
							@click=${() => {
      this._activeDestinationTab = e.id;
    }}>
							${e.label}
						</button>
					`
  )}
			</div>
			${o(this, s, z).call(this)}
			<div class="inner-tab-content">
				${o(this, s, F).call(this)}
			</div>
		`;
};
F = function() {
  if (!this._config) return n;
  const i = this._config.destination.fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeDestinationTab
  )?.tab, e = p(this._config.destination).some((t) => (t.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === this._activeDestinationTab);
  return a`
			${i ? o(this, s, $).call(this, i) : n}
			${e ? o(this, s, w).call(this, this._activeDestinationTab) : n}
		`;
};
c.styles = [
  N,
  W`
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

			/* Destination info boxes */
			.dest-info-boxes {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				margin: var(--uui-size-space-4);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				overflow: hidden;
			}

			.dest-info-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: var(--uui-size-space-5) var(--uui-size-space-4) var(--uui-size-space-4);
				border-right: 1px solid var(--uui-color-border);
			}

			.dest-info-box:last-child {
				border-right: none;
			}

			.dest-info-box-header {
				font-size: 11px;
				font-weight: 600;
				color: var(--uui-color-text-alt);
				text-transform: uppercase;
				letter-spacing: 0.5px;
				margin-bottom: var(--uui-size-space-3);
				align-self: flex-start;
			}

			.dest-info-box-icon {
				font-size: 32px;
				color: var(--uui-color-border-emphasis);
				margin-bottom: var(--uui-size-space-3);
			}

			.dest-info-box-value {
				font-size: var(--uui-type-default-size);
				font-weight: 600;
				color: var(--uui-color-text);
				text-align: center;
			}

			.dest-info-box-number {
				font-size: 28px;
				font-weight: 700;
				color: var(--uui-color-text);
			}

			.dest-info-box-sub {
				font-size: 11px;
				color: var(--uui-color-text-alt);
				margin-top: var(--uui-size-space-1);
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
  E("up-doc-workflow-detail-modal")
], c);
const K = c;
export {
  c as UpDocWorkflowDetailModalElement,
  K as default
};
//# sourceMappingURL=up-doc-workflow-detail-modal.element-B4r_RYLU.js.map
