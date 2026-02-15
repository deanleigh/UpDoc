import { e as F } from "./workflow.service-T0TEyrPt.js";
import "./up-doc-pdf-thumbnail.element-N7K7a6d1.js";
import { css as $, property as B, state as c, customElement as k, html as r, nothing as v } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
import { UMB_MODAL_MANAGER_CONTEXT as G, UmbModalBaseElement as X } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as H } from "@umbraco-cms/backoffice/media";
import { UMB_AUTH_CONTEXT as C } from "@umbraco-cms/backoffice/auth";
import { UmbTextStyles as Y } from "@umbraco-cms/backoffice/style";
var Z = Object.defineProperty, j = Object.getOwnPropertyDescriptor, T = (e) => {
  throw TypeError(e);
}, _ = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? j(t, i) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (a = (s ? p(t, i, a) : p(a)) || a);
  return s && a && Z(t, i, a), a;
}, J = (e, t, i) => t.has(e) || T("Cannot " + i), Q = (e, t, i) => t.has(e) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), b = (e, t, i) => (J(e, t, "access private method"), i), m, f, M, x;
let h = class extends I {
  constructor() {
    super(...arguments), Q(this, m), this.label = "", this._mediaKey = null, this._mediaName = "", this._token = "";
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
						@click=${b(this, m, x)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
					<uui-button
						label="Change"
						look="secondary"
						compact
						@click=${b(this, m, f)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</uui-card-media>
		` : r`
				<uui-button
					id="btn-add"
					look="placeholder"
					@click=${b(this, m, f)}
					label="Choose">
					<uui-icon name="icon-add"></uui-icon>
					Choose
				</uui-button>
			`;
  }
};
m = /* @__PURE__ */ new WeakSet();
f = async function() {
  const i = await (await this.getContext(G)).open(this, H, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const s = i.selection[0];
  s && (this._mediaKey = s, this._mediaName = await b(this, m, M).call(this, s), this.dispatchEvent(
    new CustomEvent("change", {
      detail: { mediaKey: s },
      bubbles: !0,
      composed: !0
    })
  ));
};
M = async function(e) {
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
  $`
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
  B({ type: String })
], h.prototype, "label", 2);
_([
  c()
], h.prototype, "_mediaKey", 2);
_([
  c()
], h.prototype, "_mediaName", 2);
_([
  c()
], h.prototype, "_token", 2);
h = _([
  k("up-doc-pdf-picker")
], h);
var V = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, U = (e) => {
  throw TypeError(e);
}, l = (e, t, i, s) => {
  for (var a = s > 1 ? void 0 : s ? ee(t, i) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (a = (s ? p(t, i, a) : p(a)) || a);
  return s && a && V(t, i, a), a;
}, P = (e, t, i) => t.has(e) || U("Cannot " + i), E = (e, t, i) => (P(e, t, "read from private field"), i ? i.call(e) : t.get(e)), te = (e, t, i) => t.has(e) ? U("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), o = (e, t, i) => (P(e, t, "access private method"), i), n, S, D, N, y, O, g, w, z, W, A, q, K, L, R;
const ie = [
  { value: "pdf", name: "PDF Document" },
  { value: "markdown", name: "Markdown" },
  { value: "web", name: "Web Page" },
  { value: "doc", name: "Word Document" }
];
let u = class extends X {
  constructor() {
    super(...arguments), te(this, n), this._activeTab = "source", this._name = "", this._sourceType = "", this._selectedMediaUnique = null, this._sourceUrl = "", this._extracting = !1, this._successMessage = null, this._nameManuallyEdited = !1;
  }
  render() {
    return r`
			<umb-body-layout headline="Create Workflow">
				${o(this, n, A).call(this)}

				<div class="tab-content">
					${o(this, n, R).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${o(this, n, W)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!E(this, n, w)}
					@click="${o(this, n, z)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
S = function(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
D = function(e) {
  const i = e.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._successMessage = null), this._sourceType = i, !this._nameManuallyEdited && this.data?.blueprintName && this._sourceType && (this._name = `${o(this, n, S).call(this, this.data.blueprintName)}-${this._sourceType}`), this.requestUpdate();
};
N = async function(e) {
  const t = e.detail;
  if (this._selectedMediaUnique = t?.mediaKey ?? null, this._successMessage = null, this._selectedMediaUnique) {
    this._extracting = !0;
    try {
      const s = await (await this.getContext(C)).getLatestToken(), a = await F(this._selectedMediaUnique, s);
      a && (this._successMessage = `Content extracted successfully — ${a.elements.length} elements from ${a.source.totalPages} pages`);
    } catch {
    } finally {
      this._extracting = !1;
    }
  }
};
y = async function(e) {
  const i = e.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._successMessage = null;
};
O = function(e) {
  this._name = e.target.value, this._nameManuallyEdited = !0;
};
g = function(e) {
  this._activeTab = e;
};
w = function() {
  return this._name.trim().length > 0 && this._sourceType.length > 0;
};
z = function() {
  E(this, n, w) && (this.value = {
    name: this._name.trim(),
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    documentTypeAlias: this.data.documentTypeAlias,
    blueprintId: this.data.blueprintUnique,
    blueprintName: this.data.blueprintName
  }, this._submitModal());
};
W = function() {
  this._rejectModal();
};
A = function() {
  return r`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => o(this, n, g).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => o(this, n, g).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
q = function() {
  switch (this._sourceType) {
    case "pdf":
      return r`
					<umb-property-layout label="Sample PDF" description="Choose a representative PDF to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<up-doc-pdf-picker @change=${o(this, n, N)}></up-doc-pdf-picker>
						</div>
					</umb-property-layout>
				`;
    case "markdown":
      return r`
					<umb-property-layout label="Sample Markdown File" description="Choose a representative Markdown file to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${o(this, n, y)}></umb-input-media>
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
							<umb-input-media max="1" @change=${o(this, n, y)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    default:
      return v;
  }
};
K = function() {
  return r`
			<uui-box headline="Workflow Name">
				<p>A unique name for this workflow. Used as the folder name on disk.</p>
				<uui-input
					id="name"
					label="name"
					placeholder="e.g. group-tour-pdf"
					.value=${this._name}
					@input=${o(this, n, O)}>
				</uui-input>
			</uui-box>

			<uui-box headline="Source">
				<umb-property-layout label="Source Type" orientation="vertical">
					<div slot="editor">
						<uui-select
							label="Select source type"
							.options=${[
    { name: "Choose a source...", value: "", selected: this._sourceType === "" },
    ...ie.map((e) => ({
      ...e,
      selected: this._sourceType === e.value
    }))
  ]}
							@change=${o(this, n, D)}>
						</uui-select>
					</div>
				</umb-property-layout>

				${o(this, n, q).call(this)}
				${this._extracting ? r`<uui-loader-bar></uui-loader-bar>` : v}
				${this._successMessage ? r`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : v}
			</uui-box>
		`;
};
L = function() {
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
R = function() {
  switch (this._activeTab) {
    case "source":
      return o(this, n, K).call(this);
    case "destination":
      return o(this, n, L).call(this);
  }
};
u.styles = [
  Y,
  $`
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
l([
  c()
], u.prototype, "_activeTab", 2);
l([
  c()
], u.prototype, "_name", 2);
l([
  c()
], u.prototype, "_sourceType", 2);
l([
  c()
], u.prototype, "_selectedMediaUnique", 2);
l([
  c()
], u.prototype, "_sourceUrl", 2);
l([
  c()
], u.prototype, "_extracting", 2);
l([
  c()
], u.prototype, "_successMessage", 2);
u = l([
  k("create-workflow-sidebar")
], u);
const de = u;
export {
  u as CreateWorkflowSidebarElement,
  de as default
};
//# sourceMappingURL=create-workflow-sidebar.element-DWlVaHFe.js.map
