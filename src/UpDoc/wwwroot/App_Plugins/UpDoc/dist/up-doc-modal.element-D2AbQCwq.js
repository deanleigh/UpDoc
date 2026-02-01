import { html as l, nothing as d, css as $, state as c, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as z } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as P } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as M } from "@umbraco-cms/backoffice/auth";
var k = Object.defineProperty, N = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, n = (t, i, e, u) => {
  for (var o = u > 1 ? void 0 : u ? N(i, e) : i, p = t.length - 1, h; p >= 0; p--)
    (h = t[p]) && (o = (u ? h(i, e, o) : h(o)) || o);
  return u && o && k(i, e, o), o;
}, F = (t, i, e) => i.has(t) || m("Cannot " + e), q = (t, i, e) => i.has(t) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), s = (t, i, e) => (F(t, i, "access private method"), e), r, _, g, v, y, f, b, x, T, w, C, E, U, D;
let a = class extends P {
  constructor() {
    super(...arguments), q(this, r), this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "";
  }
  render() {
    var i;
    const t = s(this, r, D).call(this);
    return l`
			<umb-body-layout headline="Create from Source">
				<uui-box headline="Blueprint">
					<div class="blueprint-display">
						<umb-icon name="icon-blueprint"></umb-icon>
						<span>${(i = this.data) == null ? void 0 : i.blueprintName}</span>
					</div>
				</uui-box>

				<uui-box headline="Document Name">
					<p>Enter a document name or let it be populated from the source. You can edit this later.</p>
					<uui-input
						id="name"
						label="name"
						placeholder="Enter document name"
						.value=${this._documentName}
						@input=${(e) => this._documentName = e.target.value}>
					</uui-input>
				</uui-box>

				<uui-box headline="Source">
					<umb-property-layout label="Source Type" orientation="vertical">
						<div slot="editor">
							<uui-select
								label="Select source type"
								.options=${[
      { name: "Choose a source...", value: "", selected: this._sourceType === "" },
      { name: "PDF Document", value: "pdf", selected: this._sourceType === "pdf" },
      { name: "Web Page", value: "web", selected: this._sourceType === "web" },
      { name: "Word Document", value: "doc", selected: this._sourceType === "doc" }
    ]}
								@change=${s(this, r, _)}>
							</uui-select>
						</div>
					</umb-property-layout>

					${s(this, r, x).call(this)}
				</uui-box>

				${s(this, r, U).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${s(this, r, b)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${s(this, r, f)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
r = /* @__PURE__ */ new WeakSet();
_ = function(t) {
  const e = t.target.value;
  e !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._extractionError = null), this._sourceType = e;
};
g = async function(t) {
  const e = t.target.selection;
  this._selectedMediaUnique = e.length > 0 ? e[0] : null, this._selectedMediaUnique ? await s(this, r, v).call(this, this._selectedMediaUnique) : (this._pageTitle = "", this._pageTitleShort = "", this._pageDescription = "", this._itineraryContent = "", this._documentName = "", this._extractionError = null);
};
v = async function(t) {
  this._isExtracting = !0, this._extractionError = null;
  try {
    const e = await (await this.getContext(M)).getLatestToken(), u = await fetch(
      `/umbraco/management/api/v1/updoc/page-properties?mediaKey=${t}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      }
    );
    if (!u.ok) {
      const p = await u.json();
      console.error("API error:", p), this._extractionError = p.error || "Failed to extract PDF properties";
      return;
    }
    const o = await u.json();
    this._pageTitle = o.title || "", this._pageTitleShort = o.title || "", this._pageDescription = o.description || "", o.title && !this._documentName && (this._documentName = o.title), await s(this, r, y).call(this, t, e);
  } catch (i) {
    this._extractionError = "Failed to connect to PDF extraction service", console.error("PDF extraction error:", i);
  } finally {
    this._isExtracting = !1;
  }
};
y = async function(t, i) {
  try {
    const e = await fetch(
      `/umbraco/management/api/v1/updoc/extract-markdown?mediaKey=${t}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${i}`
        }
      }
    );
    if (e.ok) {
      const u = await e.json();
      this._itineraryContent = u.markdown || "";
    } else
      this._itineraryContent = "";
  } catch (e) {
    console.error("Failed to extract Markdown:", e), this._itineraryContent = "";
  }
};
f = function() {
  this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    pageTitle: this._pageTitle,
    pageTitleShort: this._pageTitleShort,
    pageDescription: this._pageDescription,
    itineraryContent: this._itineraryContent
  }, this._submitModal();
};
b = function() {
  this._rejectModal();
};
x = function() {
  switch (this._sourceType) {
    case "pdf":
      return s(this, r, T).call(this);
    case "web":
      return s(this, r, w).call(this);
    case "doc":
      return s(this, r, C).call(this);
    default:
      return d;
  }
};
T = function() {
  return l`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${s(this, r, g)}>
					</umb-input-media>
					${s(this, r, E).call(this)}
				</div>
			</umb-property-layout>
		`;
};
w = function() {
  return l`
			<umb-property-layout label="Web Page URL" orientation="vertical">
				<div slot="editor">
					<uui-input
						label="URL"
						placeholder="https://example.com/page"
						.value=${this._sourceUrl}
						@input=${(t) => this._sourceUrl = t.target.value}>
					</uui-input>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Web page extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
};
C = function() {
  return l`
			<umb-property-layout label="Word Document" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${(t) => {
    const e = t.target.selection;
    this._selectedMediaUnique = e.length > 0 ? e[0] : null;
  }}>
					</umb-input-media>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Word document extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
};
E = function() {
  return this._isExtracting ? l`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting PDF properties...</span>
			</div>` : this._extractionError ? l`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : this._pageTitle ? l`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>PDF properties extracted successfully</span>
			</div>` : d;
};
U = function() {
  return !this._pageTitle && !this._pageDescription && !this._itineraryContent ? d : l`
			<uui-box headline="Extracted Properties" class="preview-box">
				<div class="preview-item">
					<strong>Page Title:</strong> ${this._pageTitle || "(empty)"}
				</div>
				<div class="preview-item">
					<strong>Page Description:</strong> ${this._pageDescription || "(empty)"}
				</div>
				${this._itineraryContent ? l`<div class="preview-item itinerary-preview">
							<strong>Suggested Itinerary:</strong>
							<div class="itinerary-content">${this._itineraryContent.substring(0, 200)}${this._itineraryContent.length > 200 ? "..." : ""}</div>
						</div>` : d}
			</uui-box>
		`;
};
D = function() {
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
};
a.styles = [
  z,
  $`
			.blueprint-display {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

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
];
n([
  c()
], a.prototype, "_documentName", 2);
n([
  c()
], a.prototype, "_sourceType", 2);
n([
  c()
], a.prototype, "_sourceUrl", 2);
n([
  c()
], a.prototype, "_selectedMediaUnique", 2);
n([
  c()
], a.prototype, "_pageTitle", 2);
n([
  c()
], a.prototype, "_pageTitleShort", 2);
n([
  c()
], a.prototype, "_pageDescription", 2);
n([
  c()
], a.prototype, "_itineraryContent", 2);
n([
  c()
], a.prototype, "_isExtracting", 2);
n([
  c()
], a.prototype, "_extractionError", 2);
a = n([
  S("up-doc-modal")
], a);
const O = a;
export {
  a as UpDocModalElement,
  O as default
};
//# sourceMappingURL=up-doc-modal.element-D2AbQCwq.js.map
