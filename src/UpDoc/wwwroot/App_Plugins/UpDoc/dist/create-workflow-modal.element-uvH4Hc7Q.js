import { html as I, css as N, state as s, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as C } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as $ } from "@umbraco-cms/backoffice/modal";
var E = Object.defineProperty, M = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, n = (e, t, i, o) => {
  for (var u = o > 1 ? void 0 : o ? M(t, i) : t, p = e.length - 1, d; p >= 0; p--)
    (d = e[p]) && (u = (o ? d(t, i, u) : d(u)) || u);
  return o && u && E(t, i, u), u;
}, h = (e, t, i) => t.has(e) || m("Cannot " + i), _ = (e, t, i) => (h(e, t, "read from private field"), i ? i.call(e) : t.get(e)), k = (e, t, i) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), r = (e, t, i) => (h(e, t, "access private method"), i), a, f, v, b, y, g, c, w, T;
let l = class extends $ {
  constructor() {
    super(...arguments), k(this, a), this._name = "", this._documentTypeAlias = "", this._blueprintId = "", this._blueprintName = "", this._nameManuallyEdited = !1;
  }
  render() {
    return I`
			<uui-dialog-layout headline="Create Workflow">
				<div class="form">
					<uui-label for="docTypeAlias" required>Document Type Alias</uui-label>
					<uui-input
						id="docTypeAlias"
						placeholder="e.g. groupTour"
						.value=${this._documentTypeAlias}
						@input=${r(this, a, v)}>
					</uui-input>

					<uui-label for="workflowName" required>Workflow Name</uui-label>
					<uui-input
						id="workflowName"
						placeholder="e.g. group-tour"
						.value=${this._name}
						@input=${r(this, a, b)}>
					</uui-input>
					<small class="hint">Used as the folder name. Auto-generated from document type alias.</small>

					<uui-label for="blueprintId">Blueprint ID</uui-label>
					<uui-input
						id="blueprintId"
						placeholder="e.g. a6e0e5b8-a022-4534-ac7f-1929dbe9fb6c"
						.value=${this._blueprintId}
						@input=${r(this, a, y)}>
					</uui-input>

					<uui-label for="blueprintName">Blueprint Name</uui-label>
					<uui-input
						id="blueprintName"
						placeholder="e.g. Group Tour"
						.value=${this._blueprintName}
						@input=${r(this, a, g)}>
					</uui-input>
				</div>

				<uui-button
					slot="actions"
					label="Cancel"
					@click=${r(this, a, T)}></uui-button>
				<uui-button
					slot="actions"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!_(this, a, c)}
					@click=${r(this, a, w)}></uui-button>
			</uui-dialog-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
f = function(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
v = function(e) {
  const t = e.target;
  this._documentTypeAlias = t.value, this._nameManuallyEdited || (this._name = r(this, a, f).call(this, t.value));
};
b = function(e) {
  const t = e.target;
  this._name = t.value, this._nameManuallyEdited = !0;
};
y = function(e) {
  const t = e.target;
  this._blueprintId = t.value;
};
g = function(e) {
  const t = e.target;
  this._blueprintName = t.value;
};
c = function() {
  return this._name.trim().length > 0 && this._documentTypeAlias.trim().length > 0;
};
w = function() {
  _(this, a, c) && (this.value = {
    name: this._name.trim(),
    documentTypeAlias: this._documentTypeAlias.trim(),
    blueprintId: this._blueprintId.trim() || void 0,
    blueprintName: this._blueprintName.trim() || void 0
  }, this._submitModal());
};
T = function() {
  this._rejectModal();
};
l.styles = [
  C,
  N`
			.form {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}

			.hint {
				color: var(--uui-color-text-alt);
				margin-top: calc(var(--uui-size-space-1) * -1);
			}

			uui-input {
				width: 100%;
			}
		`
];
n([
  s()
], l.prototype, "_name", 2);
n([
  s()
], l.prototype, "_documentTypeAlias", 2);
n([
  s()
], l.prototype, "_blueprintId", 2);
n([
  s()
], l.prototype, "_blueprintName", 2);
l = n([
  A("create-workflow-modal")
], l);
const D = l;
export {
  l as CreateWorkflowModalElement,
  D as default
};
//# sourceMappingURL=create-workflow-modal.element-uvH4Hc7Q.js.map
