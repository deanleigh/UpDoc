import { html as o, css as B, state as r, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as I } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as D } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as M } from "@umbraco-cms/backoffice/auth";
var x = Object.defineProperty, S = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, s = (e, t, i, c) => {
  for (var u = c > 1 ? void 0 : c ? S(t, i) : t, p = e.length - 1, d; p >= 0; p--)
    (d = e[p]) && (u = (c ? d(t, i, u) : d(u)) || u);
  return c && u && x(t, i, u), u;
}, f = (e, t, i) => t.has(e) || _("Cannot " + i), b = (e, t, i) => (f(e, t, "read from private field"), i ? i.call(e) : t.get(e)), U = (e, t, i) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), n = (e, t, i) => (f(e, t, "access private method"), i), a, h, y, v, g, T, w, C, m, k, $, N, A;
let l = class extends D {
  constructor() {
    super(...arguments), U(this, a), this._name = "", this._documentTypeAlias = "", this._blueprintId = "", this._blueprintName = "", this._documentTypes = [], this._blueprints = [], this._loadingDocTypes = !0, this._loadingBlueprints = !1, this._nameManuallyEdited = !1;
  }
  async connectedCallback() {
    super.connectedCallback(), await n(this, a, y).call(this);
  }
  render() {
    return o`
			<uui-dialog-layout headline="Create Workflow">
				<div class="form">
					<uui-label for="workflowName" required>Workflow Name</uui-label>
					<uui-input
						id="workflowName"
						placeholder="e.g. group-tour"
						.value=${this._name}
						@input=${n(this, a, C)}>
					</uui-input>
					<small class="hint">Used as the folder name. Enter your own or leave blank to auto-generate from the blueprint.</small>

					<uui-label required>Document Type</uui-label>
					${n(this, a, N).call(this)}

					<uui-label required>Blueprint</uui-label>
					${n(this, a, A).call(this)}
				</div>

				<uui-button
					slot="actions"
					label="Cancel"
					@click=${n(this, a, $)}></uui-button>
				<uui-button
					slot="actions"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!b(this, a, m)}
					@click=${n(this, a, k)}></uui-button>
			</uui-dialog-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
h = async function() {
  return await (await this.getContext(M)).getLatestToken();
};
y = async function() {
  this._loadingDocTypes = !0;
  try {
    const e = await n(this, a, h).call(this), t = await fetch("/umbraco/management/api/v1/updoc/document-types", {
      headers: { Authorization: `Bearer ${e}` }
    });
    t.ok && (this._documentTypes = await t.json());
  } catch {
  }
  this._loadingDocTypes = !1;
};
v = async function(e) {
  this._loadingBlueprints = !0, this._blueprints = [], this._blueprintId = "", this._blueprintName = "";
  try {
    const t = await n(this, a, h).call(this), i = await fetch(
      `/umbraco/management/api/v1/updoc/document-types/${encodeURIComponent(e)}/blueprints`,
      { headers: { Authorization: `Bearer ${t}` } }
    );
    i.ok && (this._blueprints = await i.json());
  } catch {
  }
  this._loadingBlueprints = !1;
};
g = function(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
T = function(e) {
  const t = e.target.value;
  this._documentTypeAlias = t, this._blueprintId = "", this._blueprintName = "", this._nameManuallyEdited || (this._name = ""), t ? n(this, a, v).call(this, t) : this._blueprints = [], this.requestUpdate();
};
w = function(e) {
  const t = e.target.value;
  this._blueprintId = t;
  const i = this._blueprints.find((c) => c.id === t);
  this._blueprintName = (i == null ? void 0 : i.name) ?? "", !this._nameManuallyEdited && (i != null && i.name) && (this._name = n(this, a, g).call(this, i.name)), this.requestUpdate();
};
C = function(e) {
  const t = e.target;
  this._name = t.value, this._nameManuallyEdited = !0;
};
m = function() {
  return this._name.trim().length > 0 && this._documentTypeAlias.trim().length > 0 && this._blueprintId.trim().length > 0;
};
k = function() {
  b(this, a, m) && (this.value = {
    name: this._name.trim(),
    documentTypeAlias: this._documentTypeAlias.trim(),
    blueprintId: this._blueprintId.trim(),
    blueprintName: this._blueprintName.trim() || void 0
  }, this._submitModal());
};
$ = function() {
  this._rejectModal();
};
N = function() {
  return this._loadingDocTypes ? o`<uui-loader-bar></uui-loader-bar>` : this._documentTypes.length === 0 ? o`<small class="hint" style="color: var(--uui-color-danger);">No document types found.</small>` : o`
			<uui-select
				label="Select document type"
				.options=${[
    { name: "Choose a document type...", value: "", selected: this._documentTypeAlias === "" },
    ...this._documentTypes.map((e) => ({
      name: e.name ?? e.alias,
      value: e.alias,
      selected: this._documentTypeAlias === e.alias
    }))
  ]}
				@change=${n(this, a, T)}>
			</uui-select>
		`;
};
A = function() {
  return this._documentTypeAlias ? this._loadingBlueprints ? o`<uui-loader-bar></uui-loader-bar>` : this._blueprints.length === 0 ? o`
				<uui-select label="No blueprints" disabled
					.options=${[{ name: "No blueprints available", value: "", selected: !0 }]}>
				</uui-select>
				<small class="hint" style="color: var(--uui-color-warning-standalone);">
					No blueprints exist for this document type. Create a Document Blueprint first.
				</small>
			` : o`
			<uui-select
				label="Select blueprint"
				.options=${[
    { name: "Choose a blueprint...", value: "", selected: this._blueprintId === "" },
    ...this._blueprints.map((e) => ({
      name: e.name,
      value: e.id,
      selected: this._blueprintId === e.id
    }))
  ]}
				@change=${n(this, a, w)}>
			</uui-select>
		` : o`<uui-select label="Select blueprint" disabled
				.options=${[{ name: "Select a document type first...", value: "", selected: !0 }]}>
			</uui-select>`;
};
l.styles = [
  I,
  B`
			.form {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}

			.hint {
				color: var(--uui-color-text-alt);
				margin-top: calc(var(--uui-size-space-1) * -1);
			}

			uui-input, uui-select {
				width: 100%;
			}
		`
];
s([
  r()
], l.prototype, "_name", 2);
s([
  r()
], l.prototype, "_documentTypeAlias", 2);
s([
  r()
], l.prototype, "_blueprintId", 2);
s([
  r()
], l.prototype, "_blueprintName", 2);
s([
  r()
], l.prototype, "_documentTypes", 2);
s([
  r()
], l.prototype, "_blueprints", 2);
s([
  r()
], l.prototype, "_loadingDocTypes", 2);
s([
  r()
], l.prototype, "_loadingBlueprints", 2);
l = s([
  E("create-workflow-modal")
], l);
const P = l;
export {
  l as CreateWorkflowModalElement,
  P as default
};
//# sourceMappingURL=create-workflow-modal.element-BK2SVi3a.js.map
