import { e as J } from "./workflow.service-T0TEyrPt.js";
import { css as C, property as b, state as l, customElement as x, html as o, nothing as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as M } from "@umbraco-cms/backoffice/lit-element";
import { _ as Q, a as ee } from "./pdf-CwFtZUSJ.js";
import { UMB_MODAL_MANAGER_CONTEXT as te, UmbModalBaseElement as ie } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as ae } from "@umbraco-cms/backoffice/media";
import { UMB_AUTH_CONTEXT as D } from "@umbraco-cms/backoffice/auth";
import { UmbTextStyles as ne } from "@umbraco-cms/backoffice/style";
var re = Object.defineProperty, se = Object.getOwnPropertyDescriptor, E = (e) => {
  throw TypeError(e);
}, h = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? se(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (n ? c(t, i, a) : c(a)) || a);
  return n && a && re(t, i, a), a;
}, oe = (e, t, i) => t.has(e) || E("Cannot " + i), ue = (e, t, i) => t.has(e) ? E("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), S = (e, t, i) => (oe(e, t, "access private method"), i), y, K, N;
Q.workerSrc = "/App_Plugins/UpDoc/dist/pdf.worker.min.mjs";
const U = /* @__PURE__ */ new Map();
let p = class extends M {
  constructor() {
    super(...arguments), ue(this, y), this.mediaKey = "", this.page = 1, this.width = 300, this.token = "", this._loading = !0, this._error = "", this._imageUrl = "", this._currentRenderTask = null, this._rendering = !1;
  }
  updated(e) {
    super.updated(e), (e.has("mediaKey") || e.has("page") || e.has("token")) && S(this, y, K).call(this);
  }
  render() {
    return this._error ? o`<div class="error"><umb-icon name="icon-alert"></umb-icon> ${this._error}</div>` : this._loading ? o`<uui-loader-bar></uui-loader-bar>` : o`<img src=${this._imageUrl} alt="PDF page ${this.page}" />`;
  }
};
y = /* @__PURE__ */ new WeakSet();
K = async function() {
  if (!(!this.mediaKey || !this.token) && (this._currentRenderTask && (this._currentRenderTask.cancel(), this._currentRenderTask = null), !this._rendering)) {
    this._rendering = !0, this._loading = !0, this._error = "";
    try {
      const e = await S(this, y, N).call(this);
      if (!e) {
        this._rendering = !1;
        return;
      }
      if (this.page < 1 || this.page > e.numPages) {
        this._error = `Page ${this.page} out of range (1-${e.numPages})`, this._loading = !1, this._rendering = !1;
        return;
      }
      const t = await e.getPage(this.page), i = t.getViewport({ scale: 1 }), n = this.width / i.width, a = t.getViewport({ scale: n }), s = document.createElement("canvas");
      s.width = a.width, s.height = a.height;
      const c = s.getContext("2d");
      if (!c) {
        this._rendering = !1;
        return;
      }
      this._currentRenderTask = t.render({ canvasContext: c, viewport: a }), await this._currentRenderTask.promise, this._currentRenderTask = null, this._imageUrl = s.toDataURL("image/png");
    } catch (e) {
      e instanceof Error && e.message?.includes("cancelled") || (this._error = "Failed to render PDF page", console.error("PDF thumbnail render error:", e));
    } finally {
      this._loading = !1, this._rendering = !1;
    }
  }
};
N = async function() {
  const e = U.get(this.mediaKey);
  if (e) return e;
  try {
    const t = await fetch(
      `/umbraco/management/api/v1/updoc/workflows/media-pdf?mediaKey=${this.mediaKey}`,
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    if (!t.ok)
      return this._error = "Could not load PDF", null;
    const i = await t.arrayBuffer(), a = await ee({ data: i }).promise;
    return U.set(this.mediaKey, a), a;
  } catch {
    return this._error = "Could not load PDF", null;
  }
};
p.styles = [
  C`
			:host {
				display: block;
			}

			img {
				display: block;
				width: 100%;
				height: auto;
				border-radius: var(--uui-border-radius);
			}

			.error {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				color: var(--uui-color-danger);
				font-size: var(--uui-type-small-size);
			}
		`
];
h([
  b({ type: String })
], p.prototype, "mediaKey", 2);
h([
  b({ type: Number })
], p.prototype, "page", 2);
h([
  b({ type: Number })
], p.prototype, "width", 2);
h([
  b({ type: String })
], p.prototype, "token", 2);
h([
  l()
], p.prototype, "_loading", 2);
h([
  l()
], p.prototype, "_error", 2);
h([
  l()
], p.prototype, "_imageUrl", 2);
p = h([
  x("up-doc-pdf-thumbnail")
], p);
var ce = Object.defineProperty, le = Object.getOwnPropertyDescriptor, O = (e) => {
  throw TypeError(e);
}, g = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? le(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (n ? c(t, i, a) : c(a)) || a);
  return n && a && ce(t, i, a), a;
}, de = (e, t, i) => t.has(e) || O("Cannot " + i), pe = (e, t, i) => t.has(e) ? O("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), v = (e, t, i) => (de(e, t, "access private method"), i), f, k, z, R;
let _ = class extends M {
  constructor() {
    super(...arguments), pe(this, f), this.label = "", this._mediaKey = null, this._mediaName = "", this._token = "";
  }
  async connectedCallback() {
    super.connectedCallback();
    const e = await this.getContext(D);
    this._token = await e.getLatestToken();
  }
  render() {
    return this._mediaKey ? o`
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
						@click=${v(this, f, R)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
					<uui-button
						label="Change"
						look="secondary"
						compact
						@click=${v(this, f, k)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</uui-card-media>
		` : o`
				<uui-button
					id="btn-add"
					look="placeholder"
					@click=${v(this, f, k)}
					label="Choose">
					<uui-icon name="icon-add"></uui-icon>
					Choose
				</uui-button>
			`;
  }
};
f = /* @__PURE__ */ new WeakSet();
k = async function() {
  const i = await (await this.getContext(te)).open(this, ae, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const n = i.selection[0];
  n && (this._mediaKey = n, this._mediaName = await v(this, f, z).call(this, n), this.dispatchEvent(
    new CustomEvent("change", {
      detail: { mediaKey: n },
      bubbles: !0,
      composed: !0
    })
  ));
};
z = async function(e) {
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
R = function() {
  this._mediaKey = null, this._mediaName = "", this.dispatchEvent(
    new CustomEvent("change", {
      detail: { mediaKey: null },
      bubbles: !0,
      composed: !0
    })
  );
};
_.styles = [
  C`
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
g([
  b({ type: String })
], _.prototype, "label", 2);
g([
  l()
], _.prototype, "_mediaKey", 2);
g([
  l()
], _.prototype, "_mediaName", 2);
g([
  l()
], _.prototype, "_token", 2);
_ = g([
  x("up-doc-pdf-picker")
], _);
var he = Object.defineProperty, me = Object.getOwnPropertyDescriptor, W = (e) => {
  throw TypeError(e);
}, m = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? me(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (n ? c(t, i, a) : c(a)) || a);
  return n && a && he(t, i, a), a;
}, A = (e, t, i) => t.has(e) || W("Cannot " + i), F = (e, t, i) => (A(e, t, "read from private field"), i ? i.call(e) : t.get(e)), _e = (e, t, i) => t.has(e) ? W("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), u = (e, t, i) => (A(e, t, "access private method"), i), r, q, L, B, $, I, T, P, G, V, X, j, H, Y, Z;
const fe = [
  { value: "pdf", name: "PDF Document" },
  { value: "markdown", name: "Markdown" },
  { value: "web", name: "Web Page" },
  { value: "doc", name: "Word Document" }
];
let d = class extends ie {
  constructor() {
    super(...arguments), _e(this, r), this._activeTab = "source", this._name = "", this._sourceType = "", this._selectedMediaUnique = null, this._sourceUrl = "", this._extracting = !1, this._successMessage = null, this._nameManuallyEdited = !1;
  }
  render() {
    return o`
			<umb-body-layout headline="Create Workflow">
				${u(this, r, X).call(this)}

				<div class="tab-content">
					${u(this, r, Z).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${u(this, r, V)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!F(this, r, P)}
					@click="${u(this, r, G)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
r = /* @__PURE__ */ new WeakSet();
q = function(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
L = function(e) {
  const i = e.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._successMessage = null), this._sourceType = i, !this._nameManuallyEdited && this.data?.blueprintName && this._sourceType && (this._name = `${u(this, r, q).call(this, this.data.blueprintName)}-${this._sourceType}`), this.requestUpdate();
};
B = async function(e) {
  const t = e.detail;
  if (this._selectedMediaUnique = t?.mediaKey ?? null, this._successMessage = null, this._selectedMediaUnique) {
    this._extracting = !0;
    try {
      const n = await (await this.getContext(D)).getLatestToken(), a = await J(this._selectedMediaUnique, n);
      a && (this._successMessage = `Content extracted successfully — ${a.elements.length} elements from ${a.source.totalPages} pages`);
    } catch {
    } finally {
      this._extracting = !1;
    }
  }
};
$ = async function(e) {
  const i = e.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._successMessage = null;
};
I = function(e) {
  this._name = e.target.value, this._nameManuallyEdited = !0;
};
T = function(e) {
  this._activeTab = e;
};
P = function() {
  return this._name.trim().length > 0 && this._sourceType.length > 0;
};
G = function() {
  F(this, r, P) && (this.value = {
    name: this._name.trim(),
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    documentTypeAlias: this.data.documentTypeAlias,
    blueprintId: this.data.blueprintUnique,
    blueprintName: this.data.blueprintName
  }, this._submitModal());
};
V = function() {
  this._rejectModal();
};
X = function() {
  return o`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => u(this, r, T).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => u(this, r, T).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
j = function() {
  switch (this._sourceType) {
    case "pdf":
      return o`
					<umb-property-layout label="Sample PDF" description="Choose a representative PDF to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<up-doc-pdf-picker @change=${u(this, r, B)}></up-doc-pdf-picker>
						</div>
					</umb-property-layout>
				`;
    case "markdown":
      return o`
					<umb-property-layout label="Sample Markdown File" description="Choose a representative Markdown file to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${u(this, r, $)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    case "web":
      return o`
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
      return o`
					<umb-property-layout label="Sample Word Document" description="Choose a representative Word document to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${u(this, r, $)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    default:
      return w;
  }
};
H = function() {
  return o`
			<uui-box headline="Workflow Name">
				<p>A unique name for this workflow. Used as the folder name on disk.</p>
				<uui-input
					id="name"
					label="name"
					placeholder="e.g. group-tour-pdf"
					.value=${this._name}
					@input=${u(this, r, I)}>
				</uui-input>
			</uui-box>

			<uui-box headline="Source">
				<umb-property-layout label="Source Type" orientation="vertical">
					<div slot="editor">
						<uui-select
							label="Select source type"
							.options=${[
    { name: "Choose a source...", value: "", selected: this._sourceType === "" },
    ...fe.map((e) => ({
      ...e,
      selected: this._sourceType === e.value
    }))
  ]}
							@change=${u(this, r, L)}>
						</uui-select>
					</div>
				</umb-property-layout>

				${u(this, r, j).call(this)}
				${this._extracting ? o`<uui-loader-bar></uui-loader-bar>` : w}
				${this._successMessage ? o`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : w}
			</uui-box>
		`;
};
Y = function() {
  return o`
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
Z = function() {
  switch (this._activeTab) {
    case "source":
      return u(this, r, H).call(this);
    case "destination":
      return u(this, r, Y).call(this);
  }
};
d.styles = [
  ne,
  C`
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
m([
  l()
], d.prototype, "_activeTab", 2);
m([
  l()
], d.prototype, "_name", 2);
m([
  l()
], d.prototype, "_sourceType", 2);
m([
  l()
], d.prototype, "_selectedMediaUnique", 2);
m([
  l()
], d.prototype, "_sourceUrl", 2);
m([
  l()
], d.prototype, "_extracting", 2);
m([
  l()
], d.prototype, "_successMessage", 2);
d = m([
  x("create-workflow-sidebar")
], d);
const Ce = d;
export {
  d as CreateWorkflowSidebarElement,
  Ce as default
};
//# sourceMappingURL=create-workflow-sidebar.element-XPCSn6Rq.js.map
