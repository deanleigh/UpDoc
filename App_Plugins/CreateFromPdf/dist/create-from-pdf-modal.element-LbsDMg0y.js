var Q = Object.create;
var E = Object.defineProperty;
var V = Object.getOwnPropertyDescriptor;
var M = (t, i) => (i = Symbol[t]) ? i : Symbol.for("Symbol." + t), g = (t) => {
  throw TypeError(t);
};
var W = (t, i, e) => i in t ? E(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var P = (t, i) => E(t, "name", { value: i, configurable: !0 });
var F = (t) => [, , , Q((t == null ? void 0 : t[M("metadata")]) ?? null)], q = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], v = (t) => t !== void 0 && typeof t != "function" ? g("Function expected") : t, Z = (t, i, e, n, r) => ({ kind: q[t], name: i, metadata: n, addInitializer: (o) => e._ ? g("Already initialized") : r.push(v(o || null)) }), tt = (t, i) => W(i, M("metadata"), t[3]), j = (t, i, e, n) => {
  for (var r = 0, o = t[i >> 1], s = o && o.length; r < s; r++) i & 1 ? o[r].call(e) : n = o[r].call(e, n);
  return n;
}, A = (t, i, e, n, r, o) => {
  var s, l, S, x, b, a = i & 7, y = !!(i & 8), d = !!(i & 16), f = a > 3 ? t.length + 1 : a ? y ? 1 : 2 : 0, $ = q[a + 5], N = a > 3 && (t[f - 1] = []), J = t[f] || (t[f] = []), p = a && (!d && !y && (r = r.prototype), a < 5 && (a > 3 || !d) && V(a < 4 ? r : { get [e]() {
    return z(this, o);
  }, set [e](u) {
    return U(this, o, u);
  } }, e));
  a ? d && a < 4 && P(o, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : P(r, e);
  for (var w = n.length - 1; w >= 0; w--)
    x = Z(a, e, S = {}, t[3], J), a && (x.static = y, x.private = d, b = x.access = { has: d ? (u) => et(r, u) : (u) => e in u }, a ^ 3 && (b.get = d ? (u) => (a ^ 1 ? z : h)(u, r, a ^ 4 ? o : p.get) : (u) => u[e]), a > 2 && (b.set = d ? (u, T) => U(u, r, T, a ^ 4 ? o : p.set) : (u, T) => u[e] = T)), l = (0, n[w])(a ? a < 4 ? d ? o : p[$] : a > 4 ? void 0 : { get: p.get, set: p.set } : r, x), S._ = 1, a ^ 4 || l === void 0 ? v(l) && (a > 4 ? N.unshift(l) : a ? d ? o = l : p[$] = l : r = l) : typeof l != "object" || l === null ? g("Object expected") : (v(s = l.get) && (p.get = s), v(s = l.set) && (p.set = s), v(s = l.init) && N.unshift(s));
  return a || tt(t, r), p && E(r, e, p), d ? a ^ 4 ? o : p : r;
};
var C = (t, i, e) => i.has(t) || g("Cannot " + e), et = (t, i) => Object(i) !== i ? g('Cannot use the "in" operator on this value') : t.has(i), z = (t, i, e) => (C(t, i, "read from private field"), e ? e.call(t) : i.get(t)), I = (t, i, e) => i.has(t) ? g("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), U = (t, i, e, n) => (C(t, i, "write to private field"), n ? n.call(t, e) : i.set(t, e), e), h = (t, i, e) => (C(t, i, "access private method"), e);
import { html as m, nothing as D, css as it, customElement as rt } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as at } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ot } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as st } from "@umbraco-cms/backoffice/auth";
var G, c, K, R, H, L, O, X, Y, k, nt;
G = [rt("create-from-pdf-modal")];
let _ = class _ extends (nt = ot) {
  constructor() {
    super(...arguments);
    I(this, c);
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
						@input=${(n) => this._documentName = n.target.value}>
					</uui-input>
				</uui-box>

				<uui-box headline="Select PDF">
					<p>Select a PDF from the media library to extract content and create a new document.</p>

					<umb-property-layout label="PDF File" orientation="vertical">
						<div slot="editor">
							<umb-input-media
								max="1"
								@change=${h(this, c, K)}>
							</umb-input-media>
							${h(this, c, X).call(this)}
						</div>
					</umb-property-layout>
				</uui-box>

				${h(this, c, Y).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${h(this, c, O)}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!e}
					@click="${h(this, c, L)}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
  }
};
k = F(nt), c = new WeakSet(), K = async function(e) {
  console.log("Media change event fired", e);
  const r = e.target.selection;
  console.log("Selection:", r), this._selectedMediaUnique = r.length > 0 ? r[0] : null, console.log("Selected media unique:", this._selectedMediaUnique), this._selectedMediaUnique ? await h(this, c, R).call(this, this._selectedMediaUnique) : (this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._documentName = "", this._extractionError = null);
}, R = async function(e) {
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
      const l = await o.json();
      console.error("API error:", l), this._extractionError = l.error || "Failed to extract PDF properties";
      return;
    }
    const s = await o.json();
    console.log("Extraction result:", s), this._pageTitle = s.title || "", this._pageTitleShort = s.title || "", this._pageDescription = s.description || "", console.log("Set values - title:", this._pageTitle, "description:", this._pageDescription), s.title && !this._documentName && (this._documentName = s.title, console.log("Pre-filled document name:", this._documentName)), await h(this, c, H).call(this, e, r);
  } catch (n) {
    this._extractionError = "Failed to connect to PDF extraction service", console.error("PDF extraction error:", n);
  } finally {
    this._isExtracting = !1, console.log("Extraction complete, isExtracting:", this._isExtracting), this.requestUpdate();
  }
}, H = async function(e, n) {
  var r;
  try {
    console.log("Extracting PDF as Markdown...");
    const o = await fetch(
      `/umbraco/management/api/v1/createfrompdf/extract-markdown?mediaKey=${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        }
      }
    );
    if (o.ok) {
      const s = await o.json();
      console.log("Markdown extraction result:", s), console.log("Title:", s.title), console.log("Subtitle:", s.subtitle), console.log("Markdown preview:", (r = s.markdown) == null ? void 0 : r.substring(0, 500)), this._itineraryContent = s.markdown || "";
    } else {
      const s = await o.json();
      console.log("Markdown extraction failed:", s), this._itineraryContent = "";
    }
  } catch (o) {
    console.error("Failed to extract Markdown:", o), this._itineraryContent = "";
  }
}, L = function() {
  var e;
  this.value = {
    name: this._documentName,
    mediaUnique: this._selectedMediaUnique,
    pageTitle: this._pageTitle,
    pageTitleShort: this._pageTitleShort,
    pageDescription: this._pageDescription,
    itineraryContent: this._itineraryContent
  }, (e = this.modalContext) == null || e.submit();
}, O = function() {
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
			</div>` : D;
}, Y = function() {
  return !this._pageTitle && !this._pageDescription && !this._itineraryContent ? D : m`
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
						</div>` : D}
			</uui-box>
		`;
}, _ = A(k, 0, "CreateFromPdfModalElement", G, _), _.styles = [
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
], j(k, 1, _);
let B = _;
export {
  B as CreateFromPdfModalElement,
  B as default
};
//# sourceMappingURL=create-from-pdf-modal.element-LbsDMg0y.js.map
