import { U as G } from "./page-picker-modal.token-B0CgP9f1.js";
import { e as X } from "./workflow.service-8opy21oM.js";
import "./up-doc-pdf-thumbnail.element-N7K7a6d1.js";
import { css as P, property as Y, state as l, customElement as k, html as r, nothing as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as H } from "@umbraco-cms/backoffice/lit-element";
import { UMB_MODAL_MANAGER_CONTEXT as w, UmbModalBaseElement as j } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as J } from "@umbraco-cms/backoffice/media";
import { UMB_AUTH_CONTEXT as $ } from "@umbraco-cms/backoffice/auth";
import { UmbTextStyles as Q } from "@umbraco-cms/backoffice/style";
import { generateAlias as V } from "@umbraco-cms/backoffice/utils";
var Z = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, _ = (e, t, a, s) => {
  for (var n = s > 1 ? void 0 : s ? ee(t, a) : t, h = e.length - 1, d; h >= 0; h--)
    (d = e[h]) && (n = (s ? d(t, a, n) : d(n)) || n);
  return s && n && Z(t, a, n), n;
}, te = (e, t, a) => t.has(e) || C("Cannot " + a), ae = (e, t, a) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), b = (e, t, a) => (te(e, t, "access private method"), a), p, g, T, U;
let m = class extends H {
  constructor() {
    super(...arguments), ae(this, p), this.label = "", this._mediaKey = null, this._mediaName = "", this._token = "";
  }
  async connectedCallback() {
    super.connectedCallback();
    const e = await this.getContext($);
    this._token = await e.getLatestToken();
  }
  render() {
    return this._mediaKey ? r`
			<uui-card-media name=${this._mediaName || "PDF"}>
				<up-doc-pdf-thumbnail
					mediaKey=${this._mediaKey}
					page="1"
					width="300"
					token=${this._token}>
				</up-doc-pdf-thumbnail>
				<uui-action-bar slot="actions">
					<uui-button
						label="Remove"
						look="secondary"
						compact
						@click=${b(this, p, U)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
					<uui-button
						label="Change"
						look="secondary"
						compact
						@click=${b(this, p, g)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</uui-card-media>
		` : r`
				<uui-button
					id="btn-add"
					look="placeholder"
					@click=${b(this, p, g)}
					label="Choose">
					<uui-icon name="icon-add"></uui-icon>
					Choose
				</uui-button>
			`;
  }
};
p = /* @__PURE__ */ new WeakSet();
g = async function() {
  const a = await (await this.getContext(w)).open(this, J, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const s = a.selection[0];
  s && (this._mediaKey = s, this._mediaName = await b(this, p, T).call(this, s), this.dispatchEvent(
    new CustomEvent("change", {
      detail: { mediaKey: s },
      bubbles: !0,
      composed: !0
    })
  ));
};
T = async function(e) {
  try {
    const t = await fetch(
      `/umbraco/management/api/v1/media/item?id=${e}`,
      { headers: { Authorization: `Bearer ${this._token}` } }
    );
    return t.ok ? (await t.json())?.[0]?.name ?? "PDF" : "PDF";
  } catch {
    return "PDF";
  }
};
U = function() {
  this._mediaKey = null, this._mediaName = "", this.dispatchEvent(
    new CustomEvent("change", {
      detail: { mediaKey: null },
      bubbles: !0,
      composed: !0
    })
  );
};
m.styles = [
  P`
			:host {
				display: block;
			}

			#btn-add {
				text-align: center;
				width: 200px;
				height: 200px;
			}

			uui-icon {
				display: block;
				margin: 0 auto;
			}

			uui-card-media {
				width: 200px;
			}
		`
];
_([
  Y({ type: String })
], m.prototype, "label", 2);
_([
  l()
], m.prototype, "_mediaKey", 2);
_([
  l()
], m.prototype, "_mediaName", 2);
_([
  l()
], m.prototype, "_token", 2);
m = _([
  k("up-doc-pdf-picker")
], m);
var ie = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, M = (e) => {
  throw TypeError(e);
}, c = (e, t, a, s) => {
  for (var n = s > 1 ? void 0 : s ? ne(t, a) : t, h = e.length - 1, d; h >= 0; h--)
    (d = e[h]) && (n = (s ? d(t, a, n) : d(n)) || n);
  return s && n && ie(t, a, n), n;
}, E = (e, t, a) => t.has(e) || M("Cannot " + a), S = (e, t, a) => (E(e, t, "read from private field"), a ? a.call(e) : t.get(e)), se = (e, t, a) => t.has(e) ? M("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), o = (e, t, a) => (E(e, t, "access private method"), a), i, D, N, z, v, A, y, x, O, L, W, q, K, B, R, F, I;
const oe = [
  { value: "pdf", name: "PDF Document" },
  { value: "markdown", name: "Markdown" },
  { value: "web", name: "Web Page" },
  { value: "doc", name: "Word Document" }
], ue = {
  pdf: "PDF",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let u = class extends j {
  constructor() {
    super(...arguments), se(this, i), this._activeTab = "source", this._name = "", this._alias = "", this._aliasLocked = !0, this._sourceType = "", this._selectedMediaUnique = null, this._sourceUrl = "", this._extracting = !1, this._totalPages = 0, this._elementCount = 0, this._fileName = "", this._selectedPages = null;
  }
  render() {
    return r`
			<umb-body-layout headline="Create Workflow">
				${o(this, i, W).call(this)}

				<div class="tab-content">
					${o(this, i, I).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${o(this, i, L)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!S(this, i, x)}
					@click="${o(this, i, O)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
D = function(e) {
  const a = e.target.value;
  if (a !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = ""), this._sourceType = a, this._aliasLocked && this.data?.blueprintName && this._sourceType) {
    const s = ue[this._sourceType] ?? this._sourceType;
    this._name = `${this.data.blueprintName} - ${s}`, this._alias = V(this._name);
  }
  this.requestUpdate();
};
N = async function(e) {
  const t = e.detail;
  if (this._selectedMediaUnique = t?.mediaKey ?? null, this._totalPages = 0, this._elementCount = 0, this._fileName = "", this._selectedPages = null, this._selectedMediaUnique) {
    this._extracting = !0;
    try {
      const s = await (await this.getContext($)).getLatestToken(), n = await X(this._selectedMediaUnique, s);
      n && (this._totalPages = n.source.totalPages, this._elementCount = n.elements.length, this._fileName = n.source.fileName);
    } catch {
    } finally {
      this._extracting = !1;
    }
  }
};
z = async function() {
  if (!this._selectedMediaUnique || this._totalPages === 0) return;
  const a = await (await this.getContext(w)).open(this, G, {
    data: {
      mediaKey: this._selectedMediaUnique,
      totalPages: this._totalPages,
      selectedPages: this._selectedPages
    }
  }).onSubmit().catch(() => null);
  a !== null && (this._selectedPages = a.selectedPages);
};
v = async function(e) {
  const a = e.target.selection;
  this._selectedMediaUnique = a.length > 0 ? a[0] : null;
};
A = function(e) {
  const t = e.target;
  this._name = t.value, this._alias = t.alias, this._aliasLocked = t.autoGenerateAlias ?? !1;
};
y = function(e) {
  this._activeTab = e;
};
x = function() {
  return this._name.trim().length > 0 && this._alias.trim().length > 0 && this._sourceType.length > 0;
};
O = function() {
  S(this, i, x) && (this.value = {
    name: this._name.trim(),
    alias: this._alias.trim(),
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    documentTypeAlias: this.data.documentTypeAlias,
    blueprintId: this.data.blueprintUnique,
    blueprintName: this.data.blueprintName,
    selectedPages: this._selectedPages
  }, this._submitModal());
};
L = function() {
  this._rejectModal();
};
W = function() {
  return r`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => o(this, i, y).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => o(this, i, y).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
q = function() {
  return this._fileName ? r`
			<div class="extraction-stats">
				<span class="extraction-filename">${this._fileName}</span>
				<div class="extraction-meta">
					<span><uui-icon name="icon-thumbnails-small"></uui-icon> ${this._totalPages} pages</span>
					<span><uui-icon name="icon-list"></uui-icon> ${this._elementCount} elements</span>
				</div>
			</div>
		` : f;
};
K = function() {
  switch (this._sourceType) {
    case "pdf":
      return r`
					<uui-box headline="Sample Document">
						<up-doc-pdf-picker @change=${o(this, i, N)}></up-doc-pdf-picker>
						${this._extracting ? r`<uui-loader-bar></uui-loader-bar>` : f}
						${o(this, i, q).call(this)}
					</uui-box>
				`;
    case "markdown":
      return r`
					<uui-box headline="Sample File">
						<umb-input-media max="1" @change=${o(this, i, v)}></umb-input-media>
					</uui-box>
				`;
    case "web":
      return r`
					<uui-box headline="Sample URL">
						<uui-input
							label="URL"
							placeholder="https://example.com/page"
							.value=${this._sourceUrl}
							@input=${(e) => this._sourceUrl = e.target.value}>
						</uui-input>
					</uui-box>
				`;
    case "doc":
      return r`
					<uui-box headline="Sample Document">
						<umb-input-media max="1" @change=${o(this, i, v)}></umb-input-media>
					</uui-box>
				`;
    default:
      return f;
  }
};
B = function() {
  if (this._totalPages === 0) return f;
  const e = this._selectedPages ? `${this._selectedPages.length} of ${this._totalPages} pages` : `All ${this._totalPages} pages`;
  return r`
			<uui-box headline="Pages">
				<span class="page-selection-label">${e}</span>
				<uui-button
					look="outline"
					label="Choose Pages"
					@click=${o(this, i, z)}
					class="full-width-button">
					<uui-icon name="icon-thumbnails-small"></uui-icon>
					Choose Pages
				</uui-button>
			</uui-box>
		`;
};
R = function() {
  return r`
			<uui-box headline="Workflow Name">
				<umb-input-with-alias
					label="Workflow name"
					.value=${this._name}
					.alias=${this._alias}
					?auto-generate-alias=${this._aliasLocked}
					@change=${o(this, i, A)}>
				</umb-input-with-alias>
			</uui-box>

			<uui-box headline="Format">
				<uui-select
					label="Select source format"
					.options=${[
    { name: "Choose a format...", value: "", selected: this._sourceType === "" },
    ...oe.map((e) => ({
      ...e,
      selected: this._sourceType === e.value
    }))
  ]}
					@change=${o(this, i, D)}>
				</uui-select>
			</uui-box>

			${o(this, i, K).call(this)}
			${o(this, i, B).call(this)}
		`;
};
F = function() {
  return r`
			<uui-box headline="Document Type">
				<div class="destination-value">
					<umb-icon name="icon-document-dashed-line"></umb-icon>
					<span>${this.data?.documentTypeName}</span>
				</div>
			</uui-box>

			<uui-box headline="Blueprint">
				<div class="destination-value">
					<umb-icon name="icon-blueprint"></umb-icon>
					<span>${this.data?.blueprintName}</span>
				</div>
			</uui-box>
		`;
};
I = function() {
  switch (this._activeTab) {
    case "source":
      return o(this, i, R).call(this);
    case "destination":
      return o(this, i, F).call(this);
  }
};
u.styles = [
  Q,
  P`
			.destination-value {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			uui-input,
			umb-input-with-alias {
				width: 100%;
			}

			uui-select {
				width: 100%;
			}

			uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			.tab-content {
				display: flex;
				flex-direction: column;
			}

			.extraction-stats {
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-3);
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
			}

			.extraction-filename {
				display: block;
				font-weight: 600;
				font-size: var(--uui-type-small-size);
				margin-bottom: var(--uui-size-space-2);
				word-break: break-all;
			}

			.extraction-meta {
				display: flex;
				gap: var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.extraction-meta span {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
			}

			.page-selection-label {
				display: block;
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				margin-bottom: var(--uui-size-space-3);
			}

			.full-width-button {
				width: 100%;
			}

		`
];
c([
  l()
], u.prototype, "_activeTab", 2);
c([
  l()
], u.prototype, "_name", 2);
c([
  l()
], u.prototype, "_alias", 2);
c([
  l()
], u.prototype, "_aliasLocked", 2);
c([
  l()
], u.prototype, "_sourceType", 2);
c([
  l()
], u.prototype, "_selectedMediaUnique", 2);
c([
  l()
], u.prototype, "_sourceUrl", 2);
c([
  l()
], u.prototype, "_extracting", 2);
c([
  l()
], u.prototype, "_totalPages", 2);
c([
  l()
], u.prototype, "_elementCount", 2);
c([
  l()
], u.prototype, "_fileName", 2);
c([
  l()
], u.prototype, "_selectedPages", 2);
u = c([
  k("create-workflow-sidebar")
], u);
const ge = u;
export {
  u as CreateWorkflowSidebarElement,
  ge as default
};
//# sourceMappingURL=create-workflow-sidebar.element-9JxykYPY.js.map
