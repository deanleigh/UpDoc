import { html as r, css as M, state as c, customElement as E, nothing as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as P } from "@umbraco-cms/backoffice/modal";
var q = Object.defineProperty, N = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, l = (e, t, a, u) => {
  for (var s = u > 1 ? void 0 : u ? N(t, a) : t, p = e.length - 1, h; p >= 0; p--)
    (h = e[p]) && (s = (u ? h(t, a, s) : h(s)) || s);
  return u && s && q(t, a, s), s;
}, v = (e, t, a) => t.has(e) || _("Cannot " + a), f = (e, t, a) => (v(e, t, "read from private field"), a ? a.call(e) : t.get(e)), z = (e, t, a) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), n = (e, t, a) => (v(e, t, "access private method"), a), i, y, g, d, T, m, b, w, $, U, S, C, x, k;
const O = [
  { value: "pdf", name: "PDF Document" },
  { value: "markdown", name: "Markdown" },
  { value: "web", name: "Web Page" },
  { value: "doc", name: "Word Document" }
];
let o = class extends P {
  constructor() {
    super(...arguments), z(this, i), this._activeTab = "source", this._name = "", this._sourceType = "", this._selectedMediaUnique = null, this._sourceUrl = "", this._nameManuallyEdited = !1;
  }
  render() {
    return r`
			<umb-body-layout headline="Create Workflow">
				${n(this, i, U).call(this)}

				<div class="tab-content">
					${n(this, i, k).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${n(this, i, $)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!f(this, i, b)}
					@click="${n(this, i, w)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
y = function(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
g = function(e) {
  var u;
  const a = e.target.value;
  a !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = ""), this._sourceType = a, !this._nameManuallyEdited && ((u = this.data) != null && u.blueprintName) && this._sourceType && (this._name = `${n(this, i, y).call(this, this.data.blueprintName)}-${this._sourceType}`), this.requestUpdate();
};
d = function(e) {
  const a = e.target.selection;
  this._selectedMediaUnique = a.length > 0 ? a[0] : null;
};
T = function(e) {
  this._name = e.target.value, this._nameManuallyEdited = !0;
};
m = function(e) {
  this._activeTab = e;
};
b = function() {
  return this._name.trim().length > 0 && this._sourceType.length > 0;
};
w = function() {
  f(this, i, b) && (this.value = {
    name: this._name.trim(),
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    documentTypeAlias: this.data.documentTypeAlias,
    blueprintId: this.data.blueprintUnique,
    blueprintName: this.data.blueprintName
  }, this._submitModal());
};
$ = function() {
  this._rejectModal();
};
U = function() {
  return r`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => n(this, i, m).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => n(this, i, m).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
S = function() {
  switch (this._sourceType) {
    case "pdf":
      return r`
					<umb-property-layout label="Sample PDF" description="Choose a representative PDF to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${n(this, i, d)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    case "markdown":
      return r`
					<umb-property-layout label="Sample Markdown File" description="Choose a representative Markdown file to use as a reference when building mapping rules." orientation="vertical">
						<div slot="editor">
							<umb-input-media max="1" @change=${n(this, i, d)}></umb-input-media>
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
							<umb-input-media max="1" @change=${n(this, i, d)}></umb-input-media>
						</div>
					</umb-property-layout>
				`;
    default:
      return D;
  }
};
C = function() {
  return r`
			<uui-box headline="Workflow Name">
				<p>A unique name for this workflow. Used as the folder name on disk.</p>
				<uui-input
					id="name"
					label="name"
					placeholder="e.g. group-tour-pdf"
					.value=${this._name}
					@input=${n(this, i, T)}>
				</uui-input>
			</uui-box>

			<uui-box headline="Source">
				<umb-property-layout label="Source Type" orientation="vertical">
					<div slot="editor">
						<uui-select
							label="Select source type"
							.options=${[
    { name: "Choose a source...", value: "", selected: this._sourceType === "" },
    ...O.map((e) => ({
      ...e,
      selected: this._sourceType === e.value
    }))
  ]}
							@change=${n(this, i, g)}>
						</uui-select>
					</div>
				</umb-property-layout>

				${n(this, i, S).call(this)}
			</uui-box>
		`;
};
x = function() {
  var e, t;
  return r`
			<uui-box headline="Document Type">
				<div class="destination-value">
					<umb-icon name="icon-document-dashed-line"></umb-icon>
					<span>${(e = this.data) == null ? void 0 : e.documentTypeName}</span>
				</div>
			</uui-box>

			<uui-box headline="Blueprint">
				<div class="destination-value">
					<umb-icon name="icon-blueprint"></umb-icon>
					<span>${(t = this.data) == null ? void 0 : t.blueprintName}</span>
				</div>
			</uui-box>
		`;
};
k = function() {
  switch (this._activeTab) {
    case "source":
      return n(this, i, C).call(this);
    case "destination":
      return n(this, i, x).call(this);
  }
};
o.styles = [
  W,
  M`
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
		`
];
l([
  c()
], o.prototype, "_activeTab", 2);
l([
  c()
], o.prototype, "_name", 2);
l([
  c()
], o.prototype, "_sourceType", 2);
l([
  c()
], o.prototype, "_selectedMediaUnique", 2);
l([
  c()
], o.prototype, "_sourceUrl", 2);
o = l([
  E("create-workflow-sidebar")
], o);
const L = o;
export {
  o as CreateWorkflowSidebarElement,
  L as default
};
//# sourceMappingURL=create-workflow-sidebar.element-D2LwLsG-.js.map
