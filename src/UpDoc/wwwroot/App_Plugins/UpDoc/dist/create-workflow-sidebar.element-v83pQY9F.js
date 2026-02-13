import { e as E } from "./workflow.service-T0TEyrPt.js";
import { html as o, css as z, state as c, customElement as D, nothing as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as P } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as W } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as q } from "@umbraco-cms/backoffice/auth";
var N = Object.defineProperty, O = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, u = (e, i, a, d) => {
  for (var r = d > 1 ? void 0 : d ? O(i, a) : i, l = e.length - 1, h; l >= 0; l--)
    (h = e[l]) && (r = (d ? h(i, a, r) : h(r)) || r);
  return d && r && N(i, a, r), r;
}, f = (e, i, a) => i.has(e) || v("Cannot " + a), y = (e, i, a) => (f(e, i, "read from private field"), a ? a.call(e) : i.get(e)), A = (e, i, a) => i.has(e) ? v("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, a), s = (e, i, a) => (f(e, i, "access private method"), a), t, g, T, p, w, b, _, $, x, U, C, M, S, k;
const L = [
  { value: "pdf", name: "PDF Document" },
  { value: "markdown", name: "Markdown" },
  { value: "web", name: "Web Page" },
  { value: "doc", name: "Word Document" }
];
let n = class extends W {
  constructor() {
    super(...arguments), A(this, t), this._activeTab = "source", this._name = "", this._sourceType = "", this._selectedMediaUnique = null, this._sourceUrl = "", this._extracting = !1, this._successMessage = null, this._nameManuallyEdited = !1;
  }
  render() {
    return o`
			<umb-body-layout headline="Create Workflow">
				${s(this, t, U).call(this)}

				<div class="tab-content">
					${s(this, t, k).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${s(this, t, x)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!y(this, t, _)}
					@click="${s(this, t, $)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
t = /* @__PURE__ */ new WeakSet();
g = function(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
T = function(e) {
  const a = e.target.value;
  a !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._successMessage = null), this._sourceType = a, !this._nameManuallyEdited && this.data?.blueprintName && this._sourceType && (this._name = `${s(this, t, g).call(this, this.data.blueprintName)}-${this._sourceType}`), this.requestUpdate();
};
p = async function(e) {
  const a = e.target.selection;
  if (this._selectedMediaUnique = a.length > 0 ? a[0] : null, this._successMessage = null, this._selectedMediaUnique && this._sourceType === "pdf") {
    this._extracting = !0;
    try {
      const r = await (await this.getContext(q)).getLatestToken(), l = await E(this._selectedMediaUnique, r);
      l && (this._successMessage = `Content extracted successfully — ${l.elements.length} elements from ${l.source.totalPages} pages`);
    } catch {
    } finally {
      this._extracting = !1;
    }
  }
};
w = function(e) {
  this._name = e.target.value, this._nameManuallyEdited = !0;
};
b = function(e) {
  this._activeTab = e;
};
_ = function() {
  return this._name.trim().length > 0 && this._sourceType.length > 0;
};
$ = function() {
  y(this, t, _) && (this.value = {
    name: this._name.trim(),
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    documentTypeAlias: this.data.documentTypeAlias,
    blueprintId: this.data.blueprintUnique,
    blueprintName: this.data.blueprintName
  }, this._submitModal());
};
x = function() {
  this._rejectModal();
};
U = function() {
  return o`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => s(this, t, b).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => s(this, t, b).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
C = function() {
  switch (this._sourceType) {
    case "pdf":
      return o`
					<umb-property-layout label="Sample PDF" description="Choose a representative PDF to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${s(this, t, p)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    case "markdown":
      return o`
					<umb-property-layout label="Sample Markdown File" description="Choose a representative Markdown file to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${s(this, t, p)}></umb-input-media>
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
							<umb-input-media max="1" @change=${s(this, t, p)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    default:
      return m;
  }
};
M = function() {
  return o`
			<uui-box headline="Workflow Name">
				<p>A unique name for this workflow. Used as the folder name on disk.</p>
				<uui-input
					id="name"
					label="name"
					placeholder="e.g. group-tour-pdf"
					.value=${this._name}
					@input=${s(this, t, w)}>
				</uui-input>
			</uui-box>

			<uui-box headline="Source">
				<umb-property-layout label="Source Type" orientation="vertical">
					<div slot="editor">
						<uui-select
							label="Select source type"
							.options=${[
    { name: "Choose a source...", value: "", selected: this._sourceType === "" },
    ...L.map((e) => ({
      ...e,
      selected: this._sourceType === e.value
    }))
  ]}
							@change=${s(this, t, T)}>
						</uui-select>
					</div>
				</umb-property-layout>

				${s(this, t, C).call(this)}
				${this._extracting ? o`<uui-loader-bar></uui-loader-bar>` : m}
				${this._successMessage ? o`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : m}
			</uui-box>
		`;
};
S = function() {
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
k = function() {
  switch (this._activeTab) {
    case "source":
      return s(this, t, M).call(this);
    case "destination":
      return s(this, t, S).call(this);
  }
};
n.styles = [
  P,
  z`
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
u([
  c()
], n.prototype, "_activeTab", 2);
u([
  c()
], n.prototype, "_name", 2);
u([
  c()
], n.prototype, "_sourceType", 2);
u([
  c()
], n.prototype, "_selectedMediaUnique", 2);
u([
  c()
], n.prototype, "_sourceUrl", 2);
u([
  c()
], n.prototype, "_extracting", 2);
u([
  c()
], n.prototype, "_successMessage", 2);
n = u([
  D("create-workflow-sidebar")
], n);
const H = n;
export {
  n as CreateWorkflowSidebarElement,
  H as default
};
//# sourceMappingURL=create-workflow-sidebar.element-v83pQY9F.js.map
