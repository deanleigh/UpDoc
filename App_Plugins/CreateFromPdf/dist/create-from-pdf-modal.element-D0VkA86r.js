var Q = Object.create;
var D = Object.defineProperty;
var V = Object.getOwnPropertyDescriptor;
var q = (t, i) => (i = Symbol[t]) ? i : Symbol.for("Symbol." + t), m = (t) => {
  throw TypeError(t);
};
var W = (t, i, e) => i in t ? D(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var $ = (t, i) => D(t, "name", { value: i, configurable: !0 });
var z = (t) => [, , , Q((t == null ? void 0 : t[q("metadata")]) ?? null)], F = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], x = (t) => t !== void 0 && typeof t != "function" ? m("Function expected") : t, Y = (t, i, e, s, o) => ({ kind: F[t], name: i, metadata: s, addInitializer: (r) => e._ ? m("Already initialized") : o.push(x(r || null)) }), Z = (t, i) => W(i, q("metadata"), t[3]), M = (t, i, e, s) => {
  for (var o = 0, r = t[i >> 1], n = r && r.length; o < n; o++) i & 1 ? r[o].call(e) : s = r[o].call(e, s);
  return s;
}, A = (t, i, e, s, o, r) => {
  var n, c, P, _, b, a = i & 7, f = !!(i & 8), d = !!(i & 16), y = a > 3 ? t.length + 1 : a ? f ? 1 : 2 : 0, U = F[a + 5], S = a > 3 && (t[y - 1] = []), J = t[y] || (t[y] = []), p = a && (!d && !f && (o = o.prototype), a < 5 && (a > 3 || !d) && V(a < 4 ? o : { get [e]() {
    return C(this, r);
  }, set [e](u) {
    return k(this, r, u);
  } }, e));
  a ? d && a < 4 && $(r, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : $(o, e);
  for (var T = s.length - 1; T >= 0; T--)
    _ = Y(a, e, P = {}, t[3], J), a && (_.static = f, _.private = d, b = _.access = { has: d ? (u) => tt(o, u) : (u) => e in u }, a ^ 3 && (b.get = d ? (u) => (a ^ 1 ? C : h)(u, o, a ^ 4 ? r : p.get) : (u) => u[e]), a > 2 && (b.set = d ? (u, E) => k(u, o, E, a ^ 4 ? r : p.set) : (u, E) => u[e] = E)), c = (0, s[T])(a ? a < 4 ? d ? r : p[U] : a > 4 ? void 0 : { get: p.get, set: p.set } : o, _), P._ = 1, a ^ 4 || c === void 0 ? x(c) && (a > 4 ? S.unshift(c) : a ? d ? r = c : p[U] = c : o = c) : typeof c != "object" || c === null ? m("Object expected") : (x(n = c.get) && (p.get = n), x(n = c.set) && (p.set = n), x(n = c.init) && S.unshift(n));
  return a || Z(t, o), p && D(o, e, p), d ? a ^ 4 ? r : p : o;
};
var N = (t, i, e) => i.has(t) || m("Cannot " + e), tt = (t, i) => Object(i) !== i ? m('Cannot use the "in" operator on this value') : t.has(i), C = (t, i, e) => (N(t, i, "read from private field"), e ? e.call(t) : i.get(t)), j = (t, i, e) => i.has(t) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), k = (t, i, e, s) => (N(t, i, "write to private field"), s ? s.call(t, e) : i.set(t, e), e), h = (t, i, e) => (N(t, i, "access private method"), e);
import { html as v, nothing as B, css as et, customElement as it } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as at } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ot } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as rt } from "@umbraco-cms/backoffice/auth";
var I, l, R, H, K, L, O, X, w, st;
I = [it("create-from-pdf-modal")];
let g = class g extends (st = ot) {
  constructor() {
    super(...arguments);
    j(this, l);
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
				<uui-box headline="Create a new document from PDF">
					<p>Select a PDF from the media library to extract content and create a new document.</p>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<umb-input-media
								max="1"
								@change=${h(this, l, R)}>
							</umb-input-media>
							${h(this, l, O).call(this)}
						</div>
					</umb-property-layout>

					<umb-property-layout label="Document Name" orientation="vertical">
						<div slot="editor">
							<uui-input
								id="name"
								label="name"
								placeholder="Enter document name"
								.value=${this._documentName}
								@input=${(s) => this._documentName = s.target.value}>
							</uui-input>
						</div>
					</umb-property-layout>
				</uui-box>

				${h(this, l, X).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${h(this, l, L)}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!e}
					@click="${h(this, l, K)}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
  }
};
w = z(st), l = new WeakSet(), R = async function(e) {
  console.log("Media change event fired", e);
  const o = e.target.selection;
  console.log("Selection:", o), this._selectedMediaUnique = o.length > 0 ? o[0] : null, console.log("Selected media unique:", this._selectedMediaUnique), this._selectedMediaUnique ? await h(this, l, H).call(this, this._selectedMediaUnique) : (this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._documentName = "", this._extractionError = null);
}, H = async function(e) {
  console.log("Starting PDF extraction for:", e), this._isExtracting = !0, this._extractionError = null;
  try {
    console.log("Getting auth context...");
    const o = await (await this.getContext(rt)).getLatestToken();
    console.log("Got token, calling API...");
    const r = await fetch(
      `/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${o}`
        }
      }
    );
    if (console.log("API response status:", r.status), !r.ok) {
      const c = await r.json();
      console.error("API error:", c), this._extractionError = c.error || "Failed to extract PDF properties";
      return;
    }
    const n = await r.json();
    console.log("Extraction result:", n), this._pageTitle = n.title || "", this._pageTitleShort = n.title || "", this._pageDescription = n.description || "", console.log("Set values - title:", this._pageTitle, "description:", this._pageDescription), n.title && !this._documentName && (this._documentName = n.title, console.log("Pre-filled document name:", this._documentName));
  } catch (s) {
    this._extractionError = "Failed to connect to PDF extraction service", console.error("PDF extraction error:", s);
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
}, g = A(w, 0, "CreateFromPdfModalElement", I, g), g.styles = [
  at,
  et`
			uui-input {
				width: 100%;
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
], M(w, 1, g);
let G = g;
export {
  G as CreateFromPdfModalElement,
  G as default
};
//# sourceMappingURL=create-from-pdf-modal.element-D0VkA86r.js.map
