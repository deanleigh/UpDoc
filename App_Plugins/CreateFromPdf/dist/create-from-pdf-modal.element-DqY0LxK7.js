var ie = Object.create;
var C = Object.defineProperty;
var re = Object.getOwnPropertyDescriptor;
var N = (t, i) => (i = Symbol[t]) ? i : Symbol.for("Symbol." + t), m = (t) => {
  throw TypeError(t);
};
var oe = (t, i, e) => i in t ? C(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var z = (t, i) => C(t, "name", { value: i, configurable: !0 });
var q = (t) => [, , , ie((t == null ? void 0 : t[N("metadata")]) ?? null)], F = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], y = (t) => t !== void 0 && typeof t != "function" ? m("Function expected") : t, ae = (t, i, e, n, r) => ({ kind: F[t], name: i, metadata: n, addInitializer: (s) => e._ ? m("Already initialized") : r.push(y(s || null)) }), se = (t, i) => oe(i, N("metadata"), t[3]), j = (t, i, e, n) => {
  for (var r = 0, s = t[i >> 1], u = s && s.length; r < u; r++) i & 1 ? s[r].call(e) : n = s[r].call(e, n);
  return n;
}, W = (t, i, e, n, r, s) => {
  var u, c, $, _, x, a = i & 7, f = !!(i & 8), h = !!(i & 16), T = a > 3 ? t.length + 1 : a ? f ? 1 : 2 : 0, E = F[a + 5], k = a > 3 && (t[T - 1] = []), te = t[T] || (t[T] = []), d = a && (!h && !f && (r = r.prototype), a < 5 && (a > 3 || !h) && re(a < 4 ? r : { get [e]() {
    return P(this, s);
  }, set [e](p) {
    return M(this, s, p);
  } }, e));
  a ? h && a < 4 && z(s, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : z(r, e);
  for (var w = n.length - 1; w >= 0; w--)
    _ = ae(a, e, $ = {}, t[3], te), a && (_.static = f, _.private = h, x = _.access = { has: h ? (p) => ne(r, p) : (p) => e in p }, a ^ 3 && (x.get = h ? (p) => (a ^ 1 ? P : l)(p, r, a ^ 4 ? s : d.get) : (p) => p[e]), a > 2 && (x.set = h ? (p, S) => M(p, r, S, a ^ 4 ? s : d.set) : (p, S) => p[e] = S)), c = (0, n[w])(a ? a < 4 ? h ? s : d[E] : a > 4 ? void 0 : { get: d.get, set: d.set } : r, _), $._ = 1, a ^ 4 || c === void 0 ? y(c) && (a > 4 ? k.unshift(c) : a ? h ? s = c : d[E] = c : r = c) : typeof c != "object" || c === null ? m("Object expected") : (y(u = c.get) && (d.get = u), y(u = c.set) && (d.set = u), y(u = c.init) && k.unshift(u));
  return a || se(t, r), d && C(r, e, d), h ? a ^ 4 ? s : d : r;
};
var U = (t, i, e) => i.has(t) || m("Cannot " + e), ne = (t, i) => Object(i) !== i ? m('Cannot use the "in" operator on this value') : t.has(i), P = (t, i, e) => (U(t, i, "read from private field"), e ? e.call(t) : i.get(t)), A = (t, i, e) => i.has(t) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), M = (t, i, e, n) => (U(t, i, "write to private field"), n ? n.call(t, e) : i.set(t, e), e), l = (t, i, e) => (U(t, i, "access private method"), e);
import { nothing as b, html as g, css as ue, customElement as ce } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as le } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as pe } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as de } from "@umbraco-cms/backoffice/auth";
var B, o, G, L, K, R, H, O, X, Y, J, Q, V, Z, ee, D, he;
B = [ce("create-from-pdf-modal")];
let v = class v extends (he = pe) {
  constructor() {
    super(...arguments);
    A(this, o);
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "";
  }
  render() {
    const e = l(this, o, ee).call(this);
    return g`
			<umb-body-layout headline="Create from Source">
				<uui-box headline="Document Name">
					<p>Enter a document name or let it be populated from the source. You can edit this later.</p>
					<uui-input
						id="name"
						label="name"
						placeholder="Enter document name"
						.value=${this._documentName}
						@input=${(n) => this._documentName = n.target.value}>
					</uui-input>
				</uui-box>

				<uui-box headline="Source">
					<umb-property-layout label="Source Type" orientation="vertical">
						<div slot="editor">
							<uui-select
								label="Select source type"
								placeholder="Choose a source..."
								.value=${this._sourceType}
								.options=${[
      { name: "PDF Document", value: "pdf" },
      { name: "Web Page", value: "web" },
      { name: "Word Document", value: "doc" }
    ]}
								@change=${l(this, o, G)}>
							</uui-select>
						</div>
					</umb-property-layout>

					${l(this, o, X).call(this)}
				</uui-box>

				${l(this, o, Z).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label="Close"
					@click="${l(this, o, O)}">
					Close
				</uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label="Create"
					?disabled=${!e}
					@click="${l(this, o, H)}">
					Create
				</uui-button>
			</umb-body-layout>
		`;
  }
};
D = q(he), o = new WeakSet(), G = function(e) {
  const n = e.target, r = n.value;
  console.log("Source type change event:", e.type, "value:", r, "target:", n.tagName), r !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._extractionError = null), this._sourceType = r, console.log("Source type set to:", this._sourceType), this.requestUpdate();
}, L = async function(e) {
  console.log("Media change event fired", e);
  const r = e.target.selection;
  console.log("Selection:", r), this._selectedMediaUnique = r.length > 0 ? r[0] : null, console.log("Selected media unique:", this._selectedMediaUnique), this._selectedMediaUnique ? await l(this, o, K).call(this, this._selectedMediaUnique) : (this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._documentName = "", this._extractionError = null);
}, K = async function(e) {
  console.log("Starting PDF extraction for:", e), this._isExtracting = !0, this._extractionError = null;
  try {
    console.log("Getting auth context...");
    const r = await (await this.getContext(de)).getLatestToken();
    console.log("Got token, calling API...");
    const s = await fetch(
      `/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${r}`
        }
      }
    );
    if (console.log("API response status:", s.status), !s.ok) {
      const c = await s.json();
      console.error("API error:", c), this._extractionError = c.error || "Failed to extract PDF properties";
      return;
    }
    const u = await s.json();
    console.log("Extraction result:", u), this._pageTitle = u.title || "", this._pageTitleShort = u.title || "", this._pageDescription = u.description || "", console.log("Set values - title:", this._pageTitle, "description:", this._pageDescription), u.title && !this._documentName && (this._documentName = u.title, console.log("Pre-filled document name:", this._documentName)), await l(this, o, R).call(this, e, r);
  } catch (n) {
    this._extractionError = "Failed to connect to PDF extraction service", console.error("PDF extraction error:", n);
  } finally {
    this._isExtracting = !1, console.log("Extraction complete, isExtracting:", this._isExtracting), this.requestUpdate();
  }
}, R = async function(e, n) {
  var r;
  try {
    console.log("Extracting PDF as Markdown...");
    const s = await fetch(
      `/umbraco/management/api/v1/createfrompdf/extract-markdown?mediaKey=${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        }
      }
    );
    if (s.ok) {
      const u = await s.json();
      console.log("Markdown extraction result:", u), console.log("Title:", u.title), console.log("Subtitle:", u.subtitle), console.log("Markdown preview:", (r = u.markdown) == null ? void 0 : r.substring(0, 500)), this._itineraryContent = u.markdown || "";
    } else {
      const u = await s.json();
      console.log("Markdown extraction failed:", u), this._itineraryContent = "";
    }
  } catch (s) {
    console.error("Failed to extract Markdown:", s), this._itineraryContent = "";
  }
}, H = function() {
  var e;
  this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    pageTitle: this._pageTitle,
    pageTitleShort: this._pageTitleShort,
    pageDescription: this._pageDescription,
    itineraryContent: this._itineraryContent
  }, (e = this.modalContext) == null || e.submit();
}, O = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
}, X = function() {
  switch (this._sourceType) {
    case "pdf":
      return l(this, o, Y).call(this);
    case "web":
      return l(this, o, J).call(this);
    case "doc":
      return l(this, o, Q).call(this);
    default:
      return b;
  }
}, Y = function() {
  return g`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${l(this, o, L)}>
					</umb-input-media>
					${l(this, o, V).call(this)}
				</div>
			</umb-property-layout>
		`;
}, J = function() {
  return g`
			<umb-property-layout label="Web Page URL" orientation="vertical">
				<div slot="editor">
					<uui-input
						label="URL"
						placeholder="https://example.com/page"
						.value=${this._sourceUrl}
						@input=${(e) => this._sourceUrl = e.target.value}>
					</uui-input>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Web page extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
}, Q = function() {
  return g`
			<umb-property-layout label="Word Document" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${(e) => {
    const r = e.target.selection;
    this._selectedMediaUnique = r.length > 0 ? r[0] : null;
  }}>
					</umb-input-media>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Word document extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
}, V = function() {
  return this._isExtracting ? g`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting PDF properties...</span>
			</div>` : this._extractionError ? g`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : this._pageTitle ? g`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>PDF properties extracted successfully</span>
			</div>` : b;
}, Z = function() {
  return !this._pageTitle && !this._pageDescription && !this._itineraryContent ? b : g`
			<uui-box headline="Extracted Properties" class="preview-box">
				<div class="preview-item">
					<strong>Page Title:</strong> ${this._pageTitle || "(empty)"}
				</div>
				<div class="preview-item">
					<strong>Page Description:</strong> ${this._pageDescription || "(empty)"}
				</div>
				${this._itineraryContent ? g`<div class="preview-item itinerary-preview">
							<strong>Suggested Itinerary:</strong>
							<div class="itinerary-content">${this._itineraryContent.substring(0, 200)}${this._itineraryContent.length > 200 ? "..." : ""}</div>
						</div>` : b}
			</uui-box>
		`;
}, ee = function() {
  if (!this._documentName || this._isExtracting) return !1;
  switch (this._sourceType) {
    case "pdf":
      return !!this._selectedMediaUnique;
    case "web":
    case "doc":
      return !1;
    default:
      return !1;
  }
}, v = W(D, 0, "CreateFromPdfModalElement", B, v), v.styles = [
  le,
  ue`
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

			uui-select {
				width: 100%;
			}

			.source-coming-soon {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background-color: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}
		`
], j(D, 1, v);
let I = v;
export {
  I as CreateFromPdfModalElement,
  I as default
};
//# sourceMappingURL=create-from-pdf-modal.element-DqY0LxK7.js.map
