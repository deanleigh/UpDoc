import { when as p, html as o, repeat as m, css as g, state as $, customElement as B } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as k } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as z } from "@umbraco-cms/backoffice/modal";
var U = Object.defineProperty, w = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, h = (e, t, n, s) => {
  for (var u = s > 1 ? void 0 : s ? w(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (u = (s ? a(t, n, u) : a(u)) || u);
  return s && u && U(t, n, u), u;
}, x = (e, t, n) => t.has(e) || d("Cannot " + n), C = (e, t, n) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), c = (e, t, n) => (x(e, t, "access private method"), n), i, _, f, y, T, b, v, D;
let l = class extends z {
  constructor() {
    super(...arguments), C(this, i), this._selectedDocType = null;
  }
  render() {
    const e = (this.data?.documentTypes?.length ?? 0) > 0, t = this._selectedDocType !== null, n = t ? this.localize.term("blueprints_selectBlueprint") : "Choose a Document Type";
    return o`
			<uui-dialog-layout headline=${n}>
				${p(
      !e,
      () => c(this, i, b).call(this),
      () => p(
        t,
        () => c(this, i, D).call(this),
        () => c(this, i, v).call(this)
      )
    )}
				${p(
      t,
      () => o`
						<uui-button
							slot="actions"
							label="Back"
							@click=${c(this, i, y)}></uui-button>
					`
    )}
				<uui-button
					slot="actions"
					id="cancel"
					label=${this.localize.term("general_cancel")}
					@click=${c(this, i, T)}></uui-button>
			</uui-dialog-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
_ = function(e) {
  this._selectedDocType = e;
};
f = function(e) {
  this._selectedDocType && (this.value = {
    blueprintUnique: e,
    documentTypeUnique: this._selectedDocType.documentTypeUnique
  }, this._submitModal());
};
y = function() {
  this._selectedDocType = null;
};
T = function() {
  this._rejectModal();
};
b = function() {
  return o`
			<div class="no-blueprints">
				<uui-icon name="icon-alert"></uui-icon>
				<p>
					To create a document from a source, you first need to create a
					<strong>Document Blueprint</strong>.
				</p>
				<p class="hint">
					Use the <strong>Create Document Blueprint</strong> option from
					the document actions menu.
				</p>
			</div>
		`;
};
v = function() {
  const e = this.data?.documentTypes ?? [];
  return o`
			${m(
    e,
    (t) => t.documentTypeUnique,
    (t) => o`
					<uui-menu-item
						label=${t.documentTypeName}
						@click=${() => c(this, i, _).call(this, t)}>
						<umb-icon slot="icon" name=${t.documentTypeIcon || "icon-document"}></umb-icon>
					</uui-menu-item>
				`
  )}
		`;
};
D = function() {
  return this._selectedDocType ? o`
			${m(
    this._selectedDocType.blueprints,
    (e) => e.blueprintUnique,
    (e) => o`
					<uui-menu-item
						label=${e.blueprintName}
						@click=${() => c(this, i, f).call(this, e.blueprintUnique)}>
						<umb-icon slot="icon" name="icon-blueprint"></umb-icon>
					</uui-menu-item>
				`
  )}
		` : o``;
};
l.styles = [
  k,
  g`
			.no-blueprints {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				padding: var(--uui-size-space-5);
				gap: var(--uui-size-space-2);
			}

			.no-blueprints > uui-icon {
				font-size: var(--uui-size-8);
				color: var(--uui-color-warning);
			}

			.no-blueprints p {
				margin: 0;
			}

			.no-blueprints .hint {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

		`
];
h([
  $()
], l.prototype, "_selectedDocType", 2);
l = h([
  B("blueprint-picker-modal")
], l);
const q = l;
export {
  l as BlueprintPickerModalElement,
  q as default
};
//# sourceMappingURL=blueprint-picker-modal.element-B7k6RmK5.js.map
