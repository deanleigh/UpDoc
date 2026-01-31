var X = Object.create;
var U = Object.defineProperty;
var Y = Object.getOwnPropertyDescriptor;
var L = (t, i) => (i = Symbol[t]) ? i : Symbol.for("Symbol." + t), d = (t) => {
  throw TypeError(t);
};
var Z = (t, i, e) => i in t ? U(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var S = (t, i) => U(t, "name", { value: i, configurable: !0 });
var A = (t) => [, , , X((t == null ? void 0 : t[L("metadata")]) ?? null)], F = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], f = (t) => t !== void 0 && typeof t != "function" ? d("Function expected") : t, k = (t, i, e, s, n) => ({ kind: F[t], name: i, metadata: s, addInitializer: (u) => e._ ? d("Already initialized") : n.push(f(u || null)) }), E = (t, i) => Z(i, L("metadata"), t[3]), G = (t, i, e, s) => {
  for (var n = 0, u = t[i >> 1], p = u && u.length; n < p; n++) i & 1 ? u[n].call(e) : s = u[n].call(e, s);
  return s;
}, H = (t, i, e, s, n, u) => {
  var p, a, N, y, v, o = i & 7, x = !!(i & 8), c = !!(i & 16), z = o > 3 ? t.length + 1 : o ? x ? 1 : 2 : 0, q = F[o + 5], D = o > 3 && (t[z - 1] = []), W = t[z] || (t[z] = []), l = o && (!c && !x && (n = n.prototype), o < 5 && (o > 3 || !c) && Y(o < 4 ? n : { get [e]() {
    return j(this, u);
  }, set [e](r) {
    return w(this, u, r);
  } }, e));
  o ? c && o < 4 && S(u, (o > 2 ? "set " : o > 1 ? "get " : "") + e) : S(n, e);
  for (var C = s.length - 1; C >= 0; C--)
    y = k(o, e, N = {}, t[3], W), o && (y.static = x, y.private = c, v = y.access = { has: c ? (r) => M(n, r) : (r) => e in r }, o ^ 3 && (v.get = c ? (r) => (o ^ 1 ? j : h)(r, n, o ^ 4 ? u : l.get) : (r) => r[e]), o > 2 && (v.set = c ? (r, $) => w(r, n, $, o ^ 4 ? u : l.set) : (r, $) => r[e] = $)), a = (0, s[C])(o ? o < 4 ? c ? u : l[q] : o > 4 ? void 0 : { get: l.get, set: l.set } : n, y), N._ = 1, o ^ 4 || a === void 0 ? f(a) && (o > 4 ? D.unshift(a) : o ? c ? u = a : l[q] = a : n = a) : typeof a != "object" || a === null ? d("Object expected") : (f(p = a.get) && (l.get = p), f(p = a.set) && (l.set = p), f(p = a.init) && D.unshift(p));
  return o || E(t, n), l && U(n, e, l), c ? o ^ 4 ? u : l : n;
};
var T = (t, i, e) => i.has(t) || d("Cannot " + e), M = (t, i) => Object(i) !== i ? d('Cannot use the "in" operator on this value') : t.has(i), j = (t, i, e) => (T(t, i, "read from private field"), e ? e.call(t) : i.get(t)), I = (t, i, e) => i.has(t) ? d("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), w = (t, i, e, s) => (T(t, i, "write to private field"), s ? s.call(t, e) : i.set(t, e), e), h = (t, i, e) => (T(t, i, "access private method"), e);
import { html as g, css as _, customElement as P } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as tt } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as et } from "@umbraco-cms/backoffice/modal";
var K, m, O, Q, R, V, B, it;
K = [P("blueprint-picker-modal")];
let b = class b extends (it = et) {
  constructor() {
    super(...arguments);
    I(this, m);
  }
  render() {
    var s, n;
    const e = (((n = (s = this.data) == null ? void 0 : s.blueprints) == null ? void 0 : n.length) ?? 0) > 0;
    return g`
			<umb-body-layout headline="Choose a Blueprint">
				${e ? h(this, m, V).call(this) : h(this, m, R).call(this)}
				<uui-button
					slot="actions"
					label="Close"
					@click=${h(this, m, Q)}>
					Close
				</uui-button>
			</umb-body-layout>
		`;
  }
};
B = A(it), m = new WeakSet(), O = function(e, s) {
  var n;
  this.value = { blueprintUnique: e, documentTypeUnique: s }, (n = this.modalContext) == null || n.submit();
}, Q = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
}, R = function() {
  return g`
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
}, V = function() {
  var s;
  const e = ((s = this.data) == null ? void 0 : s.blueprints) ?? [];
  return g`
			${e.map(
    (n) => g`
					<uui-menu-item
						label=${n.blueprintName}
						@click=${() => h(this, m, O).call(this, n.blueprintUnique, n.documentTypeUnique)}>
						<umb-icon slot="icon" name="icon-blueprint"></umb-icon>
						<span class="doc-type-hint">${n.documentTypeName}</span>
					</uui-menu-item>
				`
  )}
		`;
}, b = H(B, 0, "BlueprintPickerModalElement", K, b), b.styles = [
  tt,
  _`
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

			.doc-type-hint {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}
		`
], G(B, 1, b);
let J = b;
export {
  J as BlueprintPickerModalElement,
  J as default
};
//# sourceMappingURL=blueprint-picker-modal.element-DGJxWxKE.js.map
