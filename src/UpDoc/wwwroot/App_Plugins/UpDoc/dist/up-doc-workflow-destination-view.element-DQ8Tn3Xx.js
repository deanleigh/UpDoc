import { b as I, d as C } from "./workflow.service-8opy21oM.js";
import { b as S, g as _ } from "./destination-utils-DUfOJy5W.js";
import { html as a, nothing as c, css as V, state as v, customElement as j } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as G } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as K } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as k } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as X } from "@umbraco-cms/backoffice/workspace";
import { umbOpenModal as U } from "@umbraco-cms/backoffice/modal";
import { U as B } from "./blueprint-picker-modal.token-mXZoRNwG.js";
var H = Object.defineProperty, J = Object.getOwnPropertyDescriptor, D = (e) => {
  throw TypeError(e);
}, g = (e, t, i, n) => {
  for (var l = n > 1 ? void 0 : n ? J(t, i) : t, r = e.length - 1, u; r >= 0; r--)
    (u = e[r]) && (l = (n ? u(t, i, l) : u(l)) || l);
  return n && l && H(t, i, l), l;
}, w = (e, t, i) => t.has(e) || D("Cannot " + i), m = (e, t, i) => (w(e, t, "read from private field"), t.get(e)), $ = (e, t, i) => t.has(e) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Q = (e, t, i, n) => (w(e, t, "write to private field"), t.set(e, i), i), s = (e, t, i) => (w(e, t, "access private method"), i), d, o, y, T, N, M, z, q, A, E, R, F, O, W, L;
let h = class extends G {
  constructor() {
    super(...arguments), $(this, o), this._config = null, this._loading = !0, this._error = null, this._activeTab = "", $(this, d, null);
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(X, (e) => {
      e && this.observe(e.unique, (t) => {
        t && (Q(this, d, decodeURIComponent(t)), s(this, o, y).call(this, m(this, d)));
      });
    });
  }
  render() {
    if (this._loading)
      return a`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return a`<p style="color: var(--uui-color-danger);">${this._error}</p>`;
    const e = s(this, o, z).call(this);
    return a`
			<umb-body-layout header-fit-height>
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${e.map(
      (t) => a`
							<uui-tab
								label=${t.label}
								?active=${this._activeTab === t.id}
								@click=${() => {
        this._activeTab = t.id;
      }}>
								${t.label}
							</uui-tab>
						`
    )}
				</uui-tab-group>
				${s(this, o, W).call(this)}
				<uui-box class="page-box">
					${s(this, o, L).call(this)}
				</uui-box>
			</umb-body-layout>
		`;
  }
};
d = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
y = async function(e) {
  this._loading = !0, this._error = null;
  try {
    const i = await (await this.getContext(k)).getLatestToken();
    if (this._config = await I(e, i), !this._config) {
      this._error = `Workflow "${e}" not found`;
      return;
    }
    const n = s(this, o, z).call(this);
    n.length > 0 && (this._activeTab = n[0].id);
  } catch (t) {
    this._error = t instanceof Error ? t.message : "Failed to load workflow", console.error("Failed to load workflow config:", t);
  } finally {
    this._loading = !1;
  }
};
T = async function(e) {
  const t = await fetch("/umbraco/management/api/v1/updoc/document-types", {
    headers: { Authorization: `Bearer ${e}` }
  });
  if (!t.ok) return { options: [], aliasMap: /* @__PURE__ */ new Map() };
  const i = await t.json(), n = [], l = /* @__PURE__ */ new Map();
  for (const r of i) {
    l.set(r.id, r.alias);
    const u = await fetch(
      `/umbraco/management/api/v1/updoc/document-types/${encodeURIComponent(r.alias)}/blueprints`,
      { headers: { Authorization: `Bearer ${e}` } }
    );
    if (!u.ok) continue;
    const p = await u.json();
    p.length > 0 && n.push({
      documentTypeUnique: r.id,
      documentTypeName: r.name,
      documentTypeIcon: r.icon ?? null,
      blueprints: p.map((b) => ({
        blueprintUnique: b.id,
        blueprintName: b.name
      }))
    });
  }
  return { options: n, aliasMap: l };
};
N = async function() {
  if (!m(this, d)) return;
  const t = await (await this.getContext(k)).getLatestToken(), { options: i, aliasMap: n } = await s(this, o, T).call(this, t);
  if (!i.length) return;
  let l;
  try {
    l = await U(this, B, {
      data: { documentTypes: i }
    });
  } catch {
    return;
  }
  const { blueprintUnique: r, documentTypeUnique: u } = l, p = i.find((f) => f.documentTypeUnique === u), b = p?.blueprints.find((f) => f.blueprintUnique === r), x = n.get(u) ?? "";
  await C(
    m(this, d),
    x,
    p?.documentTypeName ?? null,
    r,
    b?.blueprintName ?? null,
    t
  ) && await s(this, o, y).call(this, m(this, d));
};
M = async function() {
  if (!m(this, d) || !this._config) return;
  const t = await (await this.getContext(k)).getLatestToken(), i = this._config.destination, n = i.documentTypeAlias, { options: l, aliasMap: r } = await s(this, o, T).call(this, t), u = [...r.entries()].find(([, f]) => f === n)?.[0], p = l.find((f) => f.documentTypeUnique === u);
  if (!p) return;
  let b;
  try {
    b = await U(this, B, {
      data: {
        documentTypes: [p],
        preSelectedDocTypeUnique: p.documentTypeUnique
      }
    });
  } catch {
    return;
  }
  const x = p.blueprints.find(
    (f) => f.blueprintUnique === b.blueprintUnique
  );
  await C(
    m(this, d),
    n,
    i.documentTypeName ?? null,
    b.blueprintUnique,
    x?.blueprintName ?? null,
    t
  ) && await s(this, o, y).call(this, m(this, d));
};
z = function() {
  return this._config ? S(this._config.destination) : [];
};
q = function(e) {
  if (!this._config) return c;
  const t = this._config.destination.fields.filter((i) => i.tab === e);
  return t.length === 0 ? a`<p class="empty-message">No fields in this tab.</p>` : a`
			<div class="field-list">
				${t.map((i) => s(this, o, A).call(this, i))}
			</div>
		`;
};
A = function(e) {
  return a`
			<div class="field-item">
				<div class="field-header">
					<span class="field-label">${e.label}</span>
					<span class="field-type">${e.type}</span>
					${e.mandatory ? a`<uui-tag look="primary" color="danger" class="field-badge">Required</uui-tag>` : c}
					<uui-button compact look="outline" label="Map" class="map-button" disabled>
						<uui-icon name="icon-nodes"></uui-icon>
					</uui-button>
				</div>
				<div class="field-meta">
					<span class="field-alias">${e.alias}</span>
					${e.description ? a`<span class="field-description">${e.description}</span>` : c}
				</div>
			</div>
		`;
};
E = function(e) {
  if (!this._config) return c;
  const t = _(this._config.destination).filter((i) => (i.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === e);
  return t.length ? a`
			${t.map((i) => s(this, o, R).call(this, i))}
		` : a`<p class="empty-message">No blocks configured.</p>`;
};
R = function(e) {
  return a`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${e.label}</span>
					<span class="field-alias">${e.alias}</span>
				</div>
				${e.description ? a`<p class="block-grid-description">${e.description}</p>` : c}
				<div class="block-list">
					${e.blocks.map(
    (t) => a`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${t.label}</span>
									${t.identifyBy ? a`<span class="block-identify">identified by: "${t.identifyBy.value}"</span>` : c}
								</div>
								${t.properties?.length ? a`
										<div class="block-properties">
											${t.properties.map(
      (i) => a`
													<div class="block-property">
														<span class="block-property-label">${i.label || i.alias}</span>
														<span class="field-type">${i.type}</span>
														${i.acceptsFormats?.length ? a`<span class="accepts-formats">${i.acceptsFormats.join(", ")}</span>` : c}
														<uui-button compact look="outline" label="Map" class="map-button" disabled>
															<uui-icon name="icon-nodes"></uui-icon>
														</uui-button>
													</div>
												`
    )}
										</div>
									` : c}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
F = function() {
  return this._config ? this._config.destination.fields.length : 0;
};
O = function() {
  return this._config ? _(this._config.destination).reduce((e, t) => e + t.blocks.length, 0) : 0;
};
W = function() {
  if (!this._config) return c;
  const e = this._config.destination;
  return a`
			<div class="info-boxes">
				<uui-box headline="Document Type" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-document-dashed-line" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${e.documentTypeName ?? e.documentTypeAlias}">${e.documentTypeName ?? e.documentTypeAlias}</span>
						<span class="box-sub">${e.documentTypeAlias}</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Change" @click=${s(this, o, N)}>Change</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Blueprint" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-blueprint" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${e.blueprintName ?? "—"}">${e.blueprintName ?? "—"}</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Change" @click=${s(this, o, M)}>Change</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Fields" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-layers" class="box-icon"></uui-icon>
						<span class="box-stat">${s(this, o, F).call(this)}</span>
						<span class="box-sub">text-mappable</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Regenerate" disabled title="Coming soon">Regenerate</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Blocks" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-box" class="box-icon"></uui-icon>
						<span class="box-stat">${s(this, o, O).call(this)}</span>
						<span class="box-sub">in blueprint</span>
						<div class="box-buttons">
							<uui-button look="secondary" label="Regenerate" disabled title="Coming soon">Regenerate</uui-button>
						</div>
					</div>
				</uui-box>
			</div>
		`;
};
L = function() {
  if (!this._config) return c;
  const e = this._config.destination.fields.find(
    (i) => i.tab && i.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab, t = _(this._config.destination).some((i) => (i.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === this._activeTab);
  return a`
			${e ? s(this, o, q).call(this, e) : c}
			${t ? s(this, o, E).call(this, this._activeTab) : c}
		`;
};
h.styles = [
  K,
  V`
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

			.page-box {
				margin: var(--uui-size-space-4);
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
g([
  v()
], h.prototype, "_config", 2);
g([
  v()
], h.prototype, "_loading", 2);
g([
  v()
], h.prototype, "_error", 2);
g([
  v()
], h.prototype, "_activeTab", 2);
h = g([
  j("up-doc-workflow-destination-view")
], h);
const le = h;
export {
  h as UpDocWorkflowDestinationViewElement,
  le as default
};
//# sourceMappingURL=up-doc-workflow-destination-view.element-DQ8Tn3Xx.js.map
