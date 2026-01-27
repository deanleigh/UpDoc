var J = Object.create;
var D = Object.defineProperty;
var Q = Object.getOwnPropertyDescriptor;
var C = (t, i) => (i = Symbol[t]) ? i : Symbol.for("Symbol." + t), m = (t) => {
  throw TypeError(t);
};
var V = (t, i, e) => i in t ? D(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var $ = (t, i) => D(t, "name", { value: i, configurable: !0 });
var z = (t) => [, , , J((t == null ? void 0 : t[C("metadata")]) ?? null)], F = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], _ = (t) => t !== void 0 && typeof t != "function" ? m("Function expected") : t, W = (t, i, e, r, o) => ({ kind: F[t], name: i, metadata: r, addInitializer: (s) => e._ ? m("Already initialized") : o.push(_(s || null)) }), Z = (t, i) => V(i, C("metadata"), t[3]), M = (t, i, e, r) => {
  for (var o = 0, s = t[i >> 1], n = s && s.length; o < n; o++) i & 1 ? s[o].call(e) : r = s[o].call(e, r);
  return r;
}, A = (t, i, e, r, o, s) => {
  var n, c, w, x, b, a = i & 7, f = !!(i & 8), d = !!(i & 16), T = a > 3 ? t.length + 1 : a ? f ? 1 : 2 : 0, S = F[a + 5], U = a > 3 && (t[T - 1] = []), Y = t[T] || (t[T] = []), p = a && (!d && !f && (o = o.prototype), a < 5 && (a > 3 || !d) && Q(a < 4 ? o : { get [e]() {
    return k(this, s);
  }, set [e](l) {
    return q(this, s, l);
  } }, e));
  a ? d && a < 4 && $(s, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : $(o, e);
  for (var E = r.length - 1; E >= 0; E--)
    x = W(a, e, w = {}, t[3], Y), a && (x.static = f, x.private = d, b = x.access = { has: d ? (l) => tt(o, l) : (l) => e in l }, a ^ 3 && (b.get = d ? (l) => (a ^ 1 ? k : h)(l, o, a ^ 4 ? s : p.get) : (l) => l[e]), a > 2 && (b.set = d ? (l, y) => q(l, o, y, a ^ 4 ? s : p.set) : (l, y) => l[e] = y)), c = (0, r[E])(a ? a < 4 ? d ? s : p[S] : a > 4 ? void 0 : { get: p.get, set: p.set } : o, x), w._ = 1, a ^ 4 || c === void 0 ? _(c) && (a > 4 ? U.unshift(c) : a ? d ? s = c : p[S] = c : o = c) : typeof c != "object" || c === null ? m("Object expected") : (_(n = c.get) && (p.get = n), _(n = c.set) && (p.set = n), _(n = c.init) && U.unshift(n));
  return a || Z(t, o), p && D(o, e, p), d ? a ^ 4 ? s : p : o;
};
var N = (t, i, e) => i.has(t) || m("Cannot " + e), tt = (t, i) => Object(i) !== i ? m('Cannot use the "in" operator on this value') : t.has(i), k = (t, i, e) => (N(t, i, "read from private field"), e ? e.call(t) : i.get(t)), j = (t, i, e) => i.has(t) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), q = (t, i, e, r) => (N(t, i, "write to private field"), r ? r.call(t, e) : i.set(t, e), e), h = (t, i, e) => (N(t, i, "access private method"), e);
import { html as v, nothing as B, css as et, customElement as it } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as at } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ot } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as st } from "@umbraco-cms/backoffice/auth";
var I, u, R, H, K, L, O, X, P, rt;
I = [it("create-from-pdf-modal")];
let g = class g extends (rt = ot) {
  constructor() {
    super(...arguments);
    j(this, u);
    this._documentName = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "";
  }
  render() {
    console.log("RENDER called - documentName:", this._documentName, "pageTitle:", this._pageTitle);
    const e = this._documentName && this._selectedMediaUnique && !this._isExtracting;
    return console.log("canCreate:", e, "docName:", !!this._documentName, "media:", !!this._selectedMediaUnique, "extracting:", this._isExtracting), v`
			<umb-body-layout headline="Create from PDF">
				<uui-box headline="Document Name">
					<p>Enter a document name or let it be populated from the PDF. You can edit this later.</p>
					<uui-input
						id="name"
						label="name"
						placeholder="Enter document name"
						.value=${this._documentName}
						@input=${(r) => this._documentName = r.target.value}>
					</uui-input>
				</uui-box>

				<uui-box headline="Select PDF">
					<p>Select a PDF from the media library to extract content and create a new document.</p>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<umb-input-media
								max="1"
								@change=${h(this, u, R)}>
							</umb-input-media>
							${h(this, u, O).call(this)}
						</div>
					</umb-property-layout>
				</uui-box>

				${h(this, u, X).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${h(this, u, L)}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!e}
					@click="${h(this, u, K)}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
  }
};
P = z(rt), u = new WeakSet(), R = async function(e) {
  console.log("Media change event fired", e);
  const o = e.target.selection;
  console.log("Selection:", o), this._selectedMediaUnique = o.length > 0 ? o[0] : null, console.log("Selected media unique:", this._selectedMediaUnique), this._selectedMediaUnique ? await h(this, u, H).call(this, this._selectedMediaUnique) : (this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._documentName = "", this._extractionError = null);
}, H = async function(e) {
  console.log("Starting PDF extraction for:", e), this._isExtracting = !0, this._extractionError = null;
  try {
    console.log("Getting auth context...");
    const o = await (await this.getContext(st)).getLatestToken();
    console.log("Got token, calling API...");
    const s = await fetch(
      `/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${o}`
        }
      }
    );
    if (console.log("API response status:", s.status), !s.ok) {
      const c = await s.json();
      console.error("API error:", c), this._extractionError = c.error || "Failed to extract PDF properties";
      return;
    }
    const n = await s.json();
    console.log("Extraction result:", n), this._pageTitle = n.title || "", this._pageTitleShort = n.title || "", this._pageDescription = n.description || "", console.log("Set values - title:", this._pageTitle, "description:", this._pageDescription), n.title && !this._documentName && (this._documentName = n.title, console.log("Pre-filled document name:", this._documentName));
  } catch (r) {
    this._extractionError = "Failed to connect to PDF extraction service", console.error("PDF extraction error:", r);
  } finally {
    this._isExtracting = !1, console.log("Extraction complete, isExtracting:", this._isExtracting), this.requestUpdate();
  }
}, K = function() {
  var e;
  this.value = {
    name: this._documentName,
    mediaUnique: this._selectedMediaUnique,
    pageTitle: this._pageTitle,
    pageTitleShort: this._pageTitleShort,
    pageDescription: this._pageDescription
  }, (e = this.modalContext) == null || e.submit();
}, L = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
}, O = function() {
  return this._isExtracting ? v`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting PDF properties...</span>
			</div>` : this._extractionError ? v`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : this._pageTitle ? v`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>PDF properties extracted successfully</span>
			</div>` : B;
}, X = function() {
  return !this._pageTitle && !this._pageDescription ? B : v`
			<uui-box headline="Extracted Properties" class="preview-box">
				<div class="preview-item">
					<strong>Page Title:</strong> ${this._pageTitle || "(empty)"}
				</div>
				<div class="preview-item">
					<strong>Page Description:</strong> ${this._pageDescription || "(empty)"}
				</div>
			</uui-box>
		`;
}, g = A(P, 0, "CreateFromPdfModalElement", I, g), g.styles = [
  at,
  et`
			uui-input {
				width: 100%;
			}

			uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}

			.extraction-status {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
			}

			.extraction-status.extracting {
				background-color: var(--uui-color-surface-alt);
			}

			.extraction-status.error {
				background-color: var(--uui-color-danger-emphasis);
				color: var(--uui-color-danger-contrast);
			}

			.extraction-status.success {
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
			}

			.preview-box {
				margin-top: var(--uui-size-space-4);
			}

			.preview-item {
				margin-bottom: var(--uui-size-space-2);
			}

			.preview-item:last-child {
				margin-bottom: 0;
			}
		`
], M(P, 1, g);
let G = g;
export {
  G as CreateFromPdfModalElement,
  G as default
};
//# sourceMappingURL=create-from-pdf-modal.element-DbpCd5cI.js.map
