import { U as G } from "./page-picker-modal.token-B0CgP9f1.js";
import { e as X } from "./workflow.service-T0TEyrPt.js";
import "./up-doc-pdf-thumbnail.element-N7K7a6d1.js";
import { css as w, property as j, state as l, customElement as $, html as r, nothing as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as H } from "@umbraco-cms/backoffice/lit-element";
import { UMB_MODAL_MANAGER_CONTEXT as k, UmbModalBaseElement as Y } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as Z } from "@umbraco-cms/backoffice/media";
import { UMB_AUTH_CONTEXT as C } from "@umbraco-cms/backoffice/auth";
import { UmbTextStyles as J } from "@umbraco-cms/backoffice/style";
var Q = Object.defineProperty, V = Object.getOwnPropertyDescriptor, M = (e) => {
  throw TypeError(e);
}, _ = (e, t, a, o) => {
  for (var s = o > 1 ? void 0 : o ? V(t, a) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (s = (o ? p(t, a, s) : p(s)) || s);
  return o && s && Q(t, a, s), s;
}, ee = (e, t, a) => t.has(e) || M("Cannot " + a), te = (e, t, a) => t.has(e) ? M("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), g = (e, t, a) => (ee(e, t, "access private method"), a), m, f, T, x;
let h = class extends H {
  constructor() {
    super(...arguments), te(this, m), this.label = "", this._mediaKey = null, this._mediaName = "", this._token = "";
  }
  async connectedCallback() {
    super.connectedCallback();
    const e = await this.getContext(C);
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
						@click=${g(this, m, x)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
					<uui-button
						label="Change"
						look="secondary"
						compact
						@click=${g(this, m, f)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</uui-card-media>
		` : r`
				<uui-button
					id="btn-add"
					look="placeholder"
					@click=${g(this, m, f)}
					label="Choose">
					<uui-icon name="icon-add"></uui-icon>
					Choose
				</uui-button>
			`;
  }
};
m = /* @__PURE__ */ new WeakSet();
f = async function() {
  const a = await (await this.getContext(k)).open(this, Z, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const o = a.selection[0];
  o && (this._mediaKey = o, this._mediaName = await g(this, m, T).call(this, o), this.dispatchEvent(
    new CustomEvent("change", {
      detail: { mediaKey: o },
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
x = function() {
  this._mediaKey = null, this._mediaName = "", this.dispatchEvent(
    new CustomEvent("change", {
      detail: { mediaKey: null },
      bubbles: !0,
      composed: !0
    })
  );
};
h.styles = [
  w`
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
  j({ type: String })
], h.prototype, "label", 2);
_([
  l()
], h.prototype, "_mediaKey", 2);
_([
  l()
], h.prototype, "_mediaName", 2);
_([
  l()
], h.prototype, "_token", 2);
h = _([
  $("up-doc-pdf-picker")
], h);
var ae = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, U = (e) => {
  throw TypeError(e);
}, c = (e, t, a, o) => {
  for (var s = o > 1 ? void 0 : o ? ie(t, a) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (s = (o ? p(t, a, s) : p(s)) || s);
  return o && s && ae(t, a, s), s;
}, E = (e, t, a) => t.has(e) || U("Cannot " + a), S = (e, t, a) => (E(e, t, "read from private field"), a ? a.call(e) : t.get(e)), se = (e, t, a) => t.has(e) ? U("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), n = (e, t, a) => (E(e, t, "access private method"), a), i, D, z, N, O, v, A, y, P, q, K, W, L, R, F, B, I;
const ne = [
  { value: "pdf", name: "PDF Document" },
  { value: "markdown", name: "Markdown" },
  { value: "web", name: "Web Page" },
  { value: "doc", name: "Word Document" }
];
let u = class extends Y {
  constructor() {
    super(...arguments), se(this, i), this._activeTab = "source", this._name = "", this._sourceType = "", this._selectedMediaUnique = null, this._sourceUrl = "", this._extracting = !1, this._successMessage = null, this._totalPages = 0, this._selectedPages = null, this._nameManuallyEdited = !1;
  }
  render() {
    return r`
			<umb-body-layout headline="Create Workflow">
				${n(this, i, W).call(this)}

				<div class="tab-content">
					${n(this, i, I).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${n(this, i, K)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!S(this, i, P)}
					@click="${n(this, i, q)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
D = function(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
z = function(e) {
  const a = e.target.value;
  a !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._successMessage = null), this._sourceType = a, !this._nameManuallyEdited && this.data?.blueprintName && this._sourceType && (this._name = `${n(this, i, D).call(this, this.data.blueprintName)}-${this._sourceType}`), this.requestUpdate();
};
N = async function(e) {
  const t = e.detail;
  if (this._selectedMediaUnique = t?.mediaKey ?? null, this._successMessage = null, this._totalPages = 0, this._selectedPages = null, this._selectedMediaUnique) {
    this._extracting = !0;
    try {
      const o = await (await this.getContext(C)).getLatestToken(), s = await X(this._selectedMediaUnique, o);
      s && (this._totalPages = s.source.totalPages, this._successMessage = `Content extracted — ${s.elements.length} elements from ${s.source.totalPages} pages`);
    } catch {
    } finally {
      this._extracting = !1;
    }
  }
};
O = async function() {
  if (!this._selectedMediaUnique || this._totalPages === 0) return;
  const a = await (await this.getContext(k)).open(this, G, {
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
  this._selectedMediaUnique = a.length > 0 ? a[0] : null, this._successMessage = null;
};
A = function(e) {
  this._name = e.target.value, this._nameManuallyEdited = !0;
};
y = function(e) {
  this._activeTab = e;
};
P = function() {
  return this._name.trim().length > 0 && this._sourceType.length > 0;
};
q = function() {
  S(this, i, P) && (this.value = {
    name: this._name.trim(),
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    documentTypeAlias: this.data.documentTypeAlias,
    blueprintId: this.data.blueprintUnique,
    blueprintName: this.data.blueprintName,
    selectedPages: this._selectedPages
  }, this._submitModal());
};
K = function() {
  this._rejectModal();
};
W = function() {
  return r`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => n(this, i, y).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => n(this, i, y).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
L = function() {
  switch (this._sourceType) {
    case "pdf":
      return r`
					<umb-property-layout label="Sample PDF" description="Choose a representative PDF to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<up-doc-pdf-picker @change=${n(this, i, N)}></up-doc-pdf-picker>
						</div>
					</umb-property-layout>
				`;
    case "markdown":
      return r`
					<umb-property-layout label="Sample Markdown File" description="Choose a representative Markdown file to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${n(this, i, v)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    case "web":
      return r`
					<umb-property-layout label="Sample Web Page URL" description="Enter a representative URL to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<uui-input
								label="URL"
								placeholder="https://example.com/page"
								.value=${this._sourceUrl}
								@input=${(e) => this._sourceUrl = e.target.value}>
							</uui-input>
						</div>
					</umb-property-layout>
				`;
    case "doc":
      return r`
					<umb-property-layout label="Sample Word Document" description="Choose a representative Word document to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${n(this, i, v)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    default:
      return b;
  }
};
R = function() {
  const e = this._selectedPages ? `${this._selectedPages.length} of ${this._totalPages} pages` : `All ${this._totalPages} pages`;
  return r`
			<div class="page-selection-row">
				<div class="page-selection-info">
					<uui-icon name="icon-thumbnails-small"></uui-icon>
					<span class="page-selection-label">${e}</span>
				</div>
				<uui-button look="outline" compact label="Choose Pages" @click=${n(this, i, O)}>
					Choose Pages
				</uui-button>
			</div>
		`;
};
F = function() {
  return r`
			<uui-box headline="Workflow Name">
				<p>A unique name for this workflow. Used as the folder name on disk.</p>
				<uui-input
					id="name"
					label="name"
					placeholder="e.g. group-tour-pdf"
					.value=${this._name}
					@input=${n(this, i, A)}>
				</uui-input>
			</uui-box>

			<uui-box headline="Source">
				<umb-property-layout label="Source Type" orientation="vertical">
					<div slot="editor">
						<uui-select
							label="Select source type"
							.options=${[
    { name: "Choose a source...", value: "", selected: this._sourceType === "" },
    ...ne.map((e) => ({
      ...e,
      selected: this._sourceType === e.value
    }))
  ]}
							@change=${n(this, i, z)}>
						</uui-select>
					</div>
				</umb-property-layout>

				${n(this, i, L).call(this)}
				${this._extracting ? r`<uui-loader-bar></uui-loader-bar>` : b}
				${this._successMessage ? r`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : b}
				${this._totalPages > 0 ? n(this, i, R).call(this) : b}
			</uui-box>
		`;
};
B = function() {
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
      return n(this, i, F).call(this);
    case "destination":
      return n(this, i, B).call(this);
  }
};
u.styles = [
  J,
  w`
			.destination-value {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			uui-input {
				width: 100%;
			}

			uui-select {
				width: 100%;
			}

			uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}

			.tab-content {
				display: flex;
				flex-direction: column;
			}

			.page-selection-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-3);
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
			}

			.page-selection-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.page-selection-label {
				font-size: var(--uui-type-small-size);
				font-weight: 500;
			}

			.success-banner {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-size: var(--uui-type-small-size);
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
], u.prototype, "_successMessage", 2);
c([
  l()
], u.prototype, "_totalPages", 2);
c([
  l()
], u.prototype, "_selectedPages", 2);
u = c([
  $("create-workflow-sidebar")
], u);
const _e = u;
export {
  u as CreateWorkflowSidebarElement,
  _e as default
};
//# sourceMappingURL=create-workflow-sidebar.element-C1lwaBNk.js.map
