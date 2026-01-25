var O = Object.create;
var U = Object.defineProperty;
var P = Object.getOwnPropertyDescriptor;
var F = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t), p = (t) => {
  throw TypeError(t);
};
var Q = (t, e, i) => e in t ? U(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var j = (t, e) => U(t, "name", { value: e, configurable: !0 });
var T = (t) => [, , , O((t == null ? void 0 : t[F("metadata")]) ?? null)], _ = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], y = (t) => t !== void 0 && typeof t != "function" ? p("Function expected") : t, R = (t, e, i, s, o) => ({ kind: _[t], name: e, metadata: s, addInitializer: (a) => i._ ? p("Already initialized") : o.push(y(a || null)) }), V = (t, e) => Q(e, F("metadata"), t[3]), q = (t, e, i, s) => {
  for (var o = 0, a = t[e >> 1], c = a && a.length; o < c; o++) e & 1 ? a[o].call(i) : s = a[o].call(i, s);
  return s;
}, A = (t, e, i, s, o, a) => {
  var c, n, k, h, f, u = e & 7, x = !!(e & 8), m = !!(e & 16), D = u > 3 ? t.length + 1 : u ? x ? 1 : 2 : 0, w = _[u + 5], S = u > 3 && (t[D - 1] = []), L = t[D] || (t[D] = []), r = u && (!m && !x && (o = o.prototype), u < 5 && (u > 3 || !m) && P(u < 4 ? o : { get [i]() {
    return z(this, a);
  }, set [i](l) {
    return B(this, a, l);
  } }, i));
  u ? m && u < 4 && j(a, (u > 2 ? "set " : u > 1 ? "get " : "") + i) : j(o, i);
  for (var N = s.length - 1; N >= 0; N--)
    h = R(u, i, k = {}, t[3], L), u && (h.static = x, h.private = m, f = h.access = { has: m ? (l) => W(o, l) : (l) => i in l }, u ^ 3 && (f.get = m ? (l) => (u ^ 1 ? z : v)(l, o, u ^ 4 ? a : r.get) : (l) => l[i]), u > 2 && (f.set = m ? (l, C) => B(l, o, C, u ^ 4 ? a : r.set) : (l, C) => l[i] = C)), n = (0, s[N])(u ? u < 4 ? m ? a : r[w] : u > 4 ? void 0 : { get: r.get, set: r.set } : o, h), k._ = 1, u ^ 4 || n === void 0 ? y(n) && (u > 4 ? S.unshift(n) : u ? m ? a = n : r[w] = n : o = n) : typeof n != "object" || n === null ? p("Object expected") : (y(c = n.get) && (r.get = c), y(c = n.set) && (r.set = c), y(c = n.init) && S.unshift(c));
  return u || V(t, o), r && U(o, i, r), m ? u ^ 4 ? a : r : o;
};
var $ = (t, e, i) => e.has(t) || p("Cannot " + i), W = (t, e) => Object(e) !== e ? p('Cannot use the "in" operator on this value') : t.has(e), z = (t, e, i) => ($(t, e, "read from private field"), i ? i.call(t) : e.get(t)), G = (t, e, i) => e.has(t) ? p("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), B = (t, e, i, s) => ($(t, e, "write to private field"), s ? s.call(t, i) : e.set(t, i), i), v = (t, e, i) => ($(t, e, "access private method"), i);
import { html as X, css as Y, customElement as Z } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as M } from "@umbraco-cms/backoffice/modal";
var I, b, J, K, g, tt;
I = [Z("create-from-pdf-modal")];
let d = class d extends (tt = M) {
  constructor() {
    super(...arguments);
    G(this, b);
    this._documentName = "";
  }
  firstUpdated() {
    this._documentName = "";
  }
  render() {
    return X`
			<umb-body-layout headline="Create from PDF">
				<uui-box headline="Create a new document from PDF">
					<p>Upload a PDF file to extract content and create a new document.</p>

					<umb-property-layout label="Document Name" orientation="vertical">
						<div slot="editor">
							<uui-input
								id="name"
								label="name"
								placeholder="Enter document name"
								.value=${this._documentName}
								@input=${(i) => this._documentName = i.target.value}>
							</uui-input>
						</div>
					</umb-property-layout>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<uui-input
								type="file"
								accept=".pdf"
								label="Select PDF file">
							</uui-input>
						</div>
					</umb-property-layout>
				</uui-box>

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${v(this, b, K)}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					@click="${v(this, b, J)}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
  }
};
g = T(tt), b = new WeakSet(), J = function() {
  var i;
  this.value = { name: this._documentName }, (i = this.modalContext) == null || i.submit();
}, K = function() {
  var i;
  (i = this.modalContext) == null || i.reject();
}, d = A(g, 0, "CreateFromPdfModalElement", I, d), d.styles = [
  E,
  Y`
			uui-input {
				width: 100%;
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}
		`
], q(g, 1, d);
let H = d;
export {
  H as CreateFromPdfModalElement,
  H as default
};
//# sourceMappingURL=create-from-pdf-modal.element-ajuF1g69.js.map
