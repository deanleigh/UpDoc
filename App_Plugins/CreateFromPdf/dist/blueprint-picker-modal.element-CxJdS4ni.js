import { when as p, html as u, repeat as m, css as g, state as $, customElement as B } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as k } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as z } from "@umbraco-cms/backoffice/modal";
var U = Object.defineProperty, w = Object.getOwnPropertyDescriptor, d = (e) => {
  throw TypeError(e);
}, h = (e, t, n, c) => {
  for (var i = c > 1 ? void 0 : c ? w(t, n) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (i = (c ? a(t, n, i) : a(i)) || i);
  return c && i && U(t, n, i), i;
}, x = (e, t, n) => t.has(e) || d("Cannot " + n), C = (e, t, n) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), l = (e, t, n) => (x(e, t, "access private method"), n), o, _, f, y, T, b, v, D;
let s = class extends z {
  constructor() {
    super(...arguments), C(this, o), this._selectedDocType = null;
  }
  render() {
    var c, i;
    const e = (((i = (c = this.data) == null ? void 0 : c.documentTypes) == null ? void 0 : i.length) ?? 0) > 0, t = this._selectedDocType !== null, n = t ? this.localize.term("blueprints_selectBlueprint") : "Choose a Document Type";
    return u`
			<uui-dialog-layout headline=${n}>
				${p(
      !e,
      () => l(this, o, b).call(this),
      () => p(
        t,
        () => l(this, o, D).call(this),
        () => l(this, o, v).call(this)
      )
    )}
				${p(
      t,
      () => u`
						<uui-button
							slot="actions"
							label="Back"
							@click=${l(this, o, y)}></uui-button>
					`
    )}
				<uui-button
					slot="actions"
					id="cancel"
					label=${this.localize.term("general_cancel")}
					@click=${l(this, o, T)}></uui-button>
			</uui-dialog-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
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
  return u`
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
  var t;
  const e = ((t = this.data) == null ? void 0 : t.documentTypes) ?? [];
  return u`
			${m(
    e,
    (n) => n.documentTypeUnique,
    (n) => u`
					<uui-menu-item
						label=${n.documentTypeName}
						@click=${() => l(this, o, _).call(this, n)}>
						<umb-icon slot="icon" name=${n.documentTypeIcon || "icon-document"}></umb-icon>
					</uui-menu-item>
				`
  )}
		`;
};
D = function() {
  return this._selectedDocType ? u`
			${m(
    this._selectedDocType.blueprints,
    (e) => e.blueprintUnique,
    (e) => u`
					<uui-menu-item
						label=${e.blueprintName}
						@click=${() => l(this, o, f).call(this, e.blueprintUnique)}>
						<umb-icon slot="icon" name="icon-blueprint"></umb-icon>
					</uui-menu-item>
				`
  )}
		` : u``;
};
s.styles = [
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
], s.prototype, "_selectedDocType", 2);
s = h([
  B("blueprint-picker-modal")
], s);
const q = s;
export {
  s as BlueprintPickerModalElement,
  q as default
};
//# sourceMappingURL=blueprint-picker-modal.element-CxJdS4ni.js.map
