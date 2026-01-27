var Q = Object.create;
var E = Object.defineProperty;
var V = Object.getOwnPropertyDescriptor;
var F = (t, i) => (i = Symbol[t]) ? i : Symbol.for("Symbol." + t), g = (t) => {
  throw TypeError(t);
};
var W = (t, i, e) => i in t ? E(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var z = (t, i) => E(t, "name", { value: i, configurable: !0 });
var q = (t) => [, , , Q((t == null ? void 0 : t[F("metadata")]) ?? null)], I = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], v = (t) => t !== void 0 && typeof t != "function" ? g("Function expected") : t, Z = (t, i, e, s, r) => ({ kind: I[t], name: i, metadata: s, addInitializer: (o) => e._ ? g("Already initialized") : r.push(v(o || null)) }), tt = (t, i) => W(i, F("metadata"), t[3]), M = (t, i, e, s) => {
  for (var r = 0, o = t[i >> 1], c = o && o.length; r < c; r++) i & 1 ? o[r].call(e) : s = o[r].call(e, s);
  return s;
}, j = (t, i, e, s, r, o) => {
  var c, u, N, x, y, a = i & 7, b = !!(i & 8), h = !!(i & 16), f = a > 3 ? t.length + 1 : a ? b ? 1 : 2 : 0, P = I[a + 5], S = a > 3 && (t[f - 1] = []), J = t[f] || (t[f] = []), p = a && (!h && !b && (r = r.prototype), a < 5 && (a > 3 || !h) && V(a < 4 ? r : { get [e]() {
    return U(this, o);
  }, set [e](l) {
    return k(this, o, l);
  } }, e));
  a ? h && a < 4 && z(o, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : z(r, e);
  for (var T = s.length - 1; T >= 0; T--)
    x = Z(a, e, N = {}, t[3], J), a && (x.static = b, x.private = h, y = x.access = { has: h ? (l) => et(r, l) : (l) => e in l }, a ^ 3 && (y.get = h ? (l) => (a ^ 1 ? U : d)(l, r, a ^ 4 ? o : p.get) : (l) => l[e]), a > 2 && (y.set = h ? (l, D) => k(l, r, D, a ^ 4 ? o : p.set) : (l, D) => l[e] = D)), u = (0, s[T])(a ? a < 4 ? h ? o : p[P] : a > 4 ? void 0 : { get: p.get, set: p.set } : r, x), N._ = 1, a ^ 4 || u === void 0 ? v(u) && (a > 4 ? S.unshift(u) : a ? h ? o = u : p[P] = u : r = u) : typeof u != "object" || u === null ? g("Object expected") : (v(c = u.get) && (p.get = c), v(c = u.set) && (p.set = c), v(c = u.init) && S.unshift(c));
  return a || tt(t, r), p && E(r, e, p), h ? a ^ 4 ? o : p : r;
};
var C = (t, i, e) => i.has(t) || g("Cannot " + e), et = (t, i) => Object(i) !== i ? g('Cannot use the "in" operator on this value') : t.has(i), U = (t, i, e) => (C(t, i, "read from private field"), e ? e.call(t) : i.get(t)), A = (t, i, e) => i.has(t) ? g("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), k = (t, i, e, s) => (C(t, i, "write to private field"), s ? s.call(t, e) : i.set(t, e), e), d = (t, i, e) => (C(t, i, "access private method"), e);
import { html as m, nothing as w, css as it, customElement as rt } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as at } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ot } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as st } from "@umbraco-cms/backoffice/auth";
var B, n, G, K, O, H, L, X, Y, $, nt;
B = [rt("create-from-pdf-modal")];
let _ = class _ extends (nt = ot) {
  constructor() {
    super(...arguments);
    A(this, n);
    this._documentName = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "";
  }
  render() {
    console.log("RENDER called - documentName:", this._documentName, "pageTitle:", this._pageTitle);
    const e = this._documentName && this._selectedMediaUnique && !this._isExtracting;
    return console.log("canCreate:", e, "docName:", !!this._documentName, "media:", !!this._selectedMediaUnique, "extracting:", this._isExtracting), m`
			<umb-body-layout headline="Create from PDF">
				<uui-box headline="Document Name">
					<p>Enter a document name or let it be populated from the PDF. You can edit this later.</p>
					<uui-input
						id="name"
						label="name"
						placeholder="Enter document name"
						.value=${this._documentName}
						@input=${(s) => this._documentName = s.target.value}>
					</uui-input>
				</uui-box>

				<uui-box headline="Select PDF">
					<p>Select a PDF from the media library to extract content and create a new document.</p>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<umb-input-media
								max="1"
								@change=${d(this, n, G)}>
							</umb-input-media>
							${d(this, n, X).call(this)}
						</div>
					</umb-property-layout>
				</uui-box>

				${d(this, n, Y).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${d(this, n, L)}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!e}
					@click="${d(this, n, H)}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
  }
};
$ = q(nt), n = new WeakSet(), G = async function(e) {
  console.log("Media change event fired", e);
  const r = e.target.selection;
  console.log("Selection:", r), this._selectedMediaUnique = r.length > 0 ? r[0] : null, console.log("Selected media unique:", this._selectedMediaUnique), this._selectedMediaUnique ? await d(this, n, K).call(this, this._selectedMediaUnique) : (this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._documentName = "", this._extractionError = null);
}, K = async function(e) {
  console.log("Starting PDF extraction for:", e), this._isExtracting = !0, this._extractionError = null;
  try {
    console.log("Getting auth context...");
    const r = await (await this.getContext(st)).getLatestToken();
    console.log("Got token, calling API...");
    const o = await fetch(
      `/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${r}`
        }
      }
    );
    if (console.log("API response status:", o.status), !o.ok) {
      const u = await o.json();
      console.error("API error:", u), this._extractionError = u.error || "Failed to extract PDF properties";
      return;
    }
    const c = await o.json();
    console.log("Extraction result:", c), this._pageTitle = c.title || "", this._pageTitleShort = c.title || "", this._pageDescription = c.description || "", console.log("Set values - title:", this._pageTitle, "description:", this._pageDescription), c.title && !this._documentName && (this._documentName = c.title, console.log("Pre-filled document name:", this._documentName)), await d(this, n, O).call(this, e, r);
  } catch (s) {
    this._extractionError = "Failed to connect to PDF extraction service", console.error("PDF extraction error:", s);
  } finally {
    this._isExtracting = !1, console.log("Extraction complete, isExtracting:", this._isExtracting), this.requestUpdate();
  }
}, O = async function(e, s) {
  try {
    console.log("Extracting itinerary section (searching for Day 1)...");
    const r = await fetch(
      `/umbraco/management/api/v1/createfrompdf/page-section?mediaKey=${e}&heading=${encodeURIComponent("Day 1")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${s}`
        }
      }
    );
    if (r.ok) {
      const o = await r.json();
      console.log("Itinerary section result:", o), this._itineraryContent = o.content || "";
    } else
      console.log("Itinerary section not found (this is OK for PDFs without itinerary)"), this._itineraryContent = "";
  } catch (r) {
    console.error("Failed to extract itinerary section:", r), this._itineraryContent = "";
  }
}, H = function() {
  var e;
  this.value = {
    name: this._documentName,
    mediaUnique: this._selectedMediaUnique,
    pageTitle: this._pageTitle,
    pageTitleShort: this._pageTitleShort,
    pageDescription: this._pageDescription,
    itineraryContent: this._itineraryContent
  }, (e = this.modalContext) == null || e.submit();
}, L = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
}, X = function() {
  return this._isExtracting ? m`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting PDF properties...</span>
			</div>` : this._extractionError ? m`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : this._pageTitle ? m`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>PDF properties extracted successfully</span>
			</div>` : w;
}, Y = function() {
  return !this._pageTitle && !this._pageDescription && !this._itineraryContent ? w : m`
			<uui-box headline="Extracted Properties" class="preview-box">
				<div class="preview-item">
					<strong>Page Title:</strong> ${this._pageTitle || "(empty)"}
				</div>
				<div class="preview-item">
					<strong>Page Description:</strong> ${this._pageDescription || "(empty)"}
				</div>
				${this._itineraryContent ? m`<div class="preview-item itinerary-preview">
							<strong>Suggested Itinerary:</strong>
							<div class="itinerary-content">${this._itineraryContent.substring(0, 200)}${this._itineraryContent.length > 200 ? "..." : ""}</div>
						</div>` : w}
			</uui-box>
		`;
}, _ = j($, 0, "CreateFromPdfModalElement", B, _), _.styles = [
  at,
  it`
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

			.itinerary-content {
				margin-top: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				background-color: var(--uui-color-surface-alt);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				white-space: pre-wrap;
				max-height: 100px;
				overflow-y: auto;
			}
		`
], M($, 1, _);
let R = _;
export {
  R as CreateFromPdfModalElement,
  R as default
};
//# sourceMappingURL=create-from-pdf-modal.element-DG3lRnnj.js.map
