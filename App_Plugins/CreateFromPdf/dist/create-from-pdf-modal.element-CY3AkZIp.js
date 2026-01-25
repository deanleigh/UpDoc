var O = Object.create;
var q = Object.defineProperty;
var Q = Object.getOwnPropertyDescriptor;
var z = (e, i) => (i = Symbol[e]) ? i : Symbol.for("Symbol." + e), h = (e) => {
  throw TypeError(e);
};
var R = (e, i, t) => i in e ? q(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var w = (e, i) => q(e, "name", { value: i, configurable: !0 });
var B = (e) => [, , , O((e == null ? void 0 : e[z("metadata")]) ?? null)], M = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], y = (e) => e !== void 0 && typeof e != "function" ? h("Function expected") : e, V = (e, i, t, l, u) => ({ kind: M[e], name: i, metadata: l, addInitializer: (o) => t._ ? h("Already initialized") : u.push(y(o || null)) }), W = (e, i) => R(i, z("metadata"), e[3]), T = (e, i, t, l) => {
  for (var u = 0, o = e[i >> 1], c = o && o.length; u < c; u++) i & 1 ? o[u].call(t) : l = o[u].call(t, l);
  return l;
}, A = (e, i, t, l, u, o) => {
  var c, s, _, b, g, a = i & 7, x = !!(i & 8), r = !!(i & 16), U = a > 3 ? e.length + 1 : a ? x ? 1 : 2 : 0, $ = M[a + 5], k = a > 3 && (e[U - 1] = []), L = e[U] || (e[U] = []), m = a && (!r && !x && (u = u.prototype), a < 5 && (a > 3 || !r) && Q(a < 4 ? u : { get [t]() {
    return S(this, o);
  }, set [t](n) {
    return j(this, o, n);
  } }, t));
  a ? r && a < 4 && w(o, (a > 2 ? "set " : a > 1 ? "get " : "") + t) : w(u, t);
  for (var N = l.length - 1; N >= 0; N--)
    b = V(a, t, _ = {}, e[3], L), a && (b.static = x, b.private = r, g = b.access = { has: r ? (n) => X(u, n) : (n) => t in n }, a ^ 3 && (g.get = r ? (n) => (a ^ 1 ? S : v)(n, u, a ^ 4 ? o : m.get) : (n) => n[t]), a > 2 && (g.set = r ? (n, f) => j(n, u, f, a ^ 4 ? o : m.set) : (n, f) => n[t] = f)), s = (0, l[N])(a ? a < 4 ? r ? o : m[$] : a > 4 ? void 0 : { get: m.get, set: m.set } : u, b), _._ = 1, a ^ 4 || s === void 0 ? y(s) && (a > 4 ? k.unshift(s) : a ? r ? o = s : m[$] = s : u = s) : typeof s != "object" || s === null ? h("Object expected") : (y(c = s.get) && (m.get = c), y(c = s.set) && (m.set = c), y(c = s.init) && k.unshift(c));
  return a || W(e, u), m && q(u, t, m), r ? a ^ 4 ? o : m : u;
};
var C = (e, i, t) => i.has(e) || h("Cannot " + t), X = (e, i) => Object(i) !== i ? h('Cannot use the "in" operator on this value') : e.has(i), S = (e, i, t) => (C(e, i, "read from private field"), t ? t.call(e) : i.get(e)), F = (e, i, t) => i.has(e) ? h("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), j = (e, i, t, l) => (C(e, i, "write to private field"), l ? l.call(e, t) : i.set(e, t), t), v = (e, i, t) => (C(e, i, "access private method"), t);
import { html as Y, css as Z, customElement as P } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ee } from "@umbraco-cms/backoffice/modal";
var H, d, I, J, K, D, te;
H = [P("create-from-pdf-modal")];
let p = class p extends (te = ee) {
  constructor() {
    super(...arguments);
    F(this, d);
    this._documentName = "", this._selectedMediaUnique = null;
  }
  firstUpdated() {
    this._documentName = "", this._selectedMediaUnique = null;
  }
  render() {
    return Y`
			<umb-body-layout headline="Create from PDF">
				<uui-box headline="Create a new document from PDF">
					<p>Select a PDF from the media library to extract content and create a new document.</p>

					<umb-property-layout label="Document Name" orientation="vertical">
						<div slot="editor">
							<uui-input
								id="name"
								label="name"
								placeholder="Enter document name"
								.value=${this._documentName}
								@input=${(t) => this._documentName = t.target.value}>
							</uui-input>
						</div>
					</umb-property-layout>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<umb-input-media
								max="1"
								@change=${v(this, d, I)}>
							</umb-input-media>
						</div>
					</umb-property-layout>
				</uui-box>

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${v(this, d, K)}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					@click="${v(this, d, J)}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
  }
};
D = B(te), d = new WeakSet(), I = function(t) {
  const u = t.target.selection;
  this._selectedMediaUnique = u.length > 0 ? u[0] : null;
}, J = function() {
  var t;
  this.value = { name: this._documentName, mediaUnique: this._selectedMediaUnique }, (t = this.modalContext) == null || t.submit();
}, K = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
}, p = A(D, 0, "CreateFromPdfModalElement", H, p), p.styles = [
  E,
  Z`
			uui-input {
				width: 100%;
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}
		`
], T(D, 1, p);
let G = p;
export {
  G as CreateFromPdfModalElement,
  G as default
};
//# sourceMappingURL=create-from-pdf-modal.element-CY3AkZIp.js.map
