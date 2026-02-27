import { when as p, html as c, repeat as d, css as g, state as $, customElement as B } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as U } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as k } from "@umbraco-cms/backoffice/modal";
var q = Object.defineProperty, C = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, h = (e, t, n, s) => {
  for (var o = s > 1 ? void 0 : s ? C(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (s ? r(t, n, o) : r(o)) || o);
  return s && o && q(t, n, o), o;
}, S = (e, t, n) => t.has(e) || m("Cannot " + n), z = (e, t, n) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), l = (e, t, n) => (S(e, t, "access private method"), n), i, y, _, f, T, b, v, D;
let u = class extends k {
  constructor() {
    super(...arguments), z(this, i), this._selectedDocType = null;
  }
  connectedCallback() {
    if (super.connectedCallback(), this.data?.preSelectedDocTypeUnique) {
      const e = this.data.documentTypes.find(
        (t) => t.documentTypeUnique === this.data.preSelectedDocTypeUnique
      );
      e && (this._selectedDocType = e);
    }
  }
  render() {
    const e = (this.data?.documentTypes?.length ?? 0) > 0, t = this._selectedDocType !== null, n = t ? this.localize.term("blueprints_selectBlueprint") : "Choose a Document Type";
    return c`
			<uui-dialog-layout headline=${n}>
				${p(
      !e,
      () => l(this, i, b).call(this),
      () => p(
        t,
        () => l(this, i, D).call(this),
        () => l(this, i, v).call(this)
      )
    )}
				${p(
      t && !this.data?.preSelectedDocTypeUnique,
      () => c`
						<uui-button
							slot="actions"
							label="Back"
							@click=${l(this, i, f)}></uui-button>
					`
    )}
				<uui-button
					slot="actions"
					id="cancel"
					label=${this.localize.term("general_cancel")}
					@click=${l(this, i, T)}></uui-button>
			</uui-dialog-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
y = function(e) {
  this._selectedDocType = e;
};
_ = function(e) {
  this._selectedDocType && (this.value = {
    blueprintUnique: e,
    documentTypeUnique: this._selectedDocType.documentTypeUnique
  }, this._submitModal());
};
f = function() {
  this._selectedDocType = null;
};
T = function() {
  this._rejectModal();
};
b = function() {
  return c`
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
  return c`
			${d(
    e,
    (t) => t.documentTypeUnique,
    (t) => c`
					<uui-menu-item
						label=${t.documentTypeName}
						@click=${() => l(this, i, y).call(this, t)}>
						<umb-icon slot="icon" name=${t.documentTypeIcon || "icon-document"}></umb-icon>
					</uui-menu-item>
				`
  )}
		`;
};
D = function() {
  return this._selectedDocType ? c`
			${d(
    this._selectedDocType.blueprints,
    (e) => e.blueprintUnique,
    (e) => c`
					<uui-menu-item
						label=${e.blueprintName}
						@click=${() => l(this, i, _).call(this, e.blueprintUnique)}>
						<umb-icon slot="icon" name="icon-blueprint"></umb-icon>
					</uui-menu-item>
				`
  )}
		` : c``;
};
u.styles = [
  U,
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
], u.prototype, "_selectedDocType", 2);
u = h([
  B("blueprint-picker-modal")
], u);
const M = u;
export {
  u as BlueprintPickerModalElement,
  M as default
};
//# sourceMappingURL=blueprint-picker-modal.element-B53buJuY.js.map
