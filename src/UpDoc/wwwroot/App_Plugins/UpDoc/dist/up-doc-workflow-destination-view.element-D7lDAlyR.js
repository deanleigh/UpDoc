import { b as C } from "./workflow.service-CWGlGq_3.js";
import { b as T, g as f } from "./destination-utils-DUfOJy5W.js";
import { html as a, nothing as s, css as B, state as d, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as D } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as F } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as N } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as U } from "@umbraco-cms/backoffice/workspace";
var W = Object.defineProperty, A = Object.getOwnPropertyDescriptor, v = (i) => {
  throw TypeError(i);
}, u = (i, e, t, l) => {
  for (var c = l > 1 ? void 0 : l ? A(e, t) : e, p = i.length - 1, b; p >= 0; p--)
    (b = i[p]) && (c = (l ? b(e, t, c) : b(c)) || c);
  return l && c && W(e, t, c), c;
}, O = (i, e, t) => e.has(i) || v("Cannot " + t), P = (i, e, t) => e.has(i) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), n = (i, e, t) => (O(i, e, "access private method"), t), o, g, m, h, x, y, _, k, z, $, w;
let r = class extends D {
  constructor() {
    super(...arguments), P(this, o), this._config = null, this._loading = !0, this._error = null, this._activeTab = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(U, (i) => {
      i && this.observe(i.unique, (e) => {
        e && n(this, o, g).call(this, decodeURIComponent(e));
      });
    });
  }
  render() {
    if (this._loading)
      return a`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return a`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
    const i = n(this, o, m).call(this);
    return a`
			<umb-body-layout header-fit-height>
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${i.map(
      (e) => a`
							<uui-tab
								label=${e.label}
								?active=${this._activeTab === e.id}
								@click=${() => {
        this._activeTab = e.id;
      }}>
								${e.label}
							</uui-tab>
						`
    )}
				</uui-tab-group>
				${n(this, o, $).call(this)}
				<uui-box>
					${n(this, o, w).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
g = async function(i) {
  this._loading = !0, this._error = null;
  try {
    const t = await (await this.getContext(N)).getLatestToken();
    if (this._config = await C(i, t), !this._config) {
      this._error = `Workflow "${i}" not found`;
      return;
    }
    const l = n(this, o, m).call(this);
    l.length > 0 && (this._activeTab = l[0].id);
  } catch (e) {
    this._error = e instanceof Error ? e.message : "Failed to load workflow", console.error("Failed to load workflow config:", e);
  } finally {
    this._loading = !1;
  }
};
m = function() {
  return this._config ? T(this._config.destination) : [];
};
h = function(i) {
  if (!this._config) return s;
  const e = this._config.destination.fields.filter((t) => t.tab === i);
  return e.length === 0 ? a`<p class="empty-message">No fields in this tab.</p>` : a`
			<div class="field-list">
				${e.map((t) => n(this, o, x).call(this, t))}
			</div>
		`;
};
x = function(i) {
  return a`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${i.label}</span>
					<span class="field-type">${i.type}</span>
					${i.mandatory ? a`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : s}
					<uui-button compact look="outline" label="Map" class="map-button" disabled>
						<uui-icon name="icon-nodes"></uui-icon>
					</uui-button>
				</div>
				<div class="field-meta">
					<span class="field-alias">${i.alias}</span>
					${i.description ? a`<span class="field-description">${i.description}</span>` : s}
				</div>
			</div>
		`;
};
y = function(i) {
  if (!this._config) return s;
  const e = f(this._config.destination).filter((t) => (t.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === i);
  return e.length ? a`
			${e.map((t) => n(this, o, _).call(this, t))}
		` : a`<p class="empty-message">No blocks configured.</p>`;
};
_ = function(i) {
  return a`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${i.label}</span>
					<span class="field-alias">${i.alias}</span>
				</div>
				${i.description ? a`<p class="block-grid-description">${i.description}</p>` : s}
				<div class="block-list">
					${i.blocks.map(
    (e) => a`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${e.label}</span>
									${e.identifyBy ? a`<span class="block-identify">identified by: "${e.identifyBy.value}"</span>` : s}
								</div>
								${e.properties?.length ? a`
										<div class="block-properties">
											${e.properties.map(
      (t) => a`
													<div class="block-property">
														<span class="block-property-label">${t.label || t.alias}</span>
														<span class="field-type">${t.type}</span>
														${t.acceptsFormats?.length ? a`<span class="accepts-formats">${t.acceptsFormats.join(", ")}</span>` : s}
														<uui-button compact look="outline" label="Map" class="map-button" disabled>
															<uui-icon name="icon-nodes"></uui-icon>
														</uui-button>
													</div>
												`
    )}
										</div>
									` : s}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
k = function() {
  return this._config ? this._config.destination.fields.length : 0;
};
z = function() {
  return this._config ? f(this._config.destination).reduce((i, e) => i + e.blocks.length, 0) : 0;
};
$ = function() {
  if (!this._config) return s;
  const i = this._config.destination;
  return a`
			<div class="info-boxes">
				<uui-box headline="Document Type" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-document-dashed-line" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${i.documentTypeName ?? i.documentTypeAlias}">${i.documentTypeName ?? i.documentTypeAlias}</span>
						<span class="box-sub">${i.documentTypeAlias}</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Change" disabled title="Coming soon">Change</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Blueprint" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-blueprint" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${i.blueprintName ?? "—"}">${i.blueprintName ?? "—"}</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Change" disabled title="Coming soon">Change</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Fields" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-layers" class="box-icon"></uui-icon>
						<span class="box-stat">${n(this, o, k).call(this)}</span>
						<span class="box-sub">text-mappable</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Regenerate" disabled title="Coming soon">Regenerate</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Blocks" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-box" class="box-icon"></uui-icon>
						<span class="box-stat">${n(this, o, z).call(this)}</span>
						<span class="box-sub">in blueprint</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Regenerate" disabled title="Coming soon">Regenerate</uui-button>
						</div>
					</div>
				</uui-box>
			</div>
		`;
};
w = function() {
  if (!this._config) return s;
  const i = this._config.destination.fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab, e = f(this._config.destination).some((t) => (t.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === this._activeTab);
  return a`
			${i ? n(this, o, h).call(this, i) : s}
			${e ? n(this, o, y).call(this, this._activeTab) : s}
		`;
};
r.styles = [
  F,
  B`
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

			.map-button {
				margin-left: auto;
				--uui-button-font-size: var(--uui-type-small-size);
			}

			/* Info boxes row (matching Source tab pattern) */
			.info-boxes {
				display: flex;
				gap: var(--uui-size-space-4);
				flex-wrap: wrap;
				padding: var(--uui-size-space-4);
			}

			.info-box-item {
				flex: 1;
			}

			.box-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: var(--uui-size-space-2);
				min-height: 180px;
			}

			.box-buttons {
				display: flex;
				gap: var(--uui-size-space-2);
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-icon {
				font-size: 48px;
				color: var(--uui-color-text-alt);
				margin-top: var(--uui-size-space-3);
			}

			.box-stat {
				font-size: var(--uui-type-h4-size);
				font-weight: 700;
				color: var(--uui-color-text);
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.box-filename {
				font-weight: 600;
				font-size: var(--uui-type-default-size) !important;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100%;
			}

			.box-sub {
				font-size: 11px;
				color: var(--uui-color-text-alt);
			}
		`
];
u([
  d()
], r.prototype, "_config", 2);
u([
  d()
], r.prototype, "_loading", 2);
u([
  d()
], r.prototype, "_error", 2);
u([
  d()
], r.prototype, "_activeTab", 2);
r = u([
  E("up-doc-workflow-destination-view")
], r);
const X = r;
export {
  r as UpDocWorkflowDestinationViewElement,
  X as default
};
//# sourceMappingURL=up-doc-workflow-destination-view.element-D7lDAlyR.js.map
