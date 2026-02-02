import { html as c, nothing as d, css as $, state as p, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as C } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as z } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as N } from "@umbraco-cms/backoffice/auth";
async function D(t, i, e) {
  const r = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${t}&blueprintId=${i}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  if (!r.ok) {
    const o = await r.json();
    return console.error("Extract sections failed:", o), null;
  }
  return r.json();
}
var q = Object.defineProperty, k = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, l = (t, i, e, r) => {
  for (var o = r > 1 ? void 0 : r ? k(i, e) : i, u = t.length - 1, h; u >= 0; u--)
    (h = t[u]) && (o = (r ? h(i, e, o) : h(o)) || o);
  return r && o && q(i, e, o), o;
}, P = (t, i, e) => i.has(t) || m("Cannot " + e), W = (t, i, e) => i.has(t) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), s = (t, i, e) => (P(t, i, "access private method"), e), a, _, v, b, f, g, y, x, E, w, U, M, S;
let n = class extends z {
  constructor() {
    super(...arguments), W(this, a), this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._propertyMappings = [], this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._propertyMappings = [];
  }
  render() {
    var i;
    const t = s(this, a, S).call(this);
    return c`
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
								@change=${s(this, a, _)}>
							</uui-select>
						</div>
					</umb-property-layout>

					${s(this, a, y).call(this)}
				</uui-box>

				${s(this, a, M).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${s(this, a, g)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${s(this, a, f)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
_ = function(t) {
  const e = t.target.value;
  e !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._propertyMappings = [], this._extractionError = null), this._sourceType = e;
};
v = async function(t) {
  const e = t.target.selection;
  this._selectedMediaUnique = e.length > 0 ? e[0] : null, this._selectedMediaUnique ? await s(this, a, b).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._propertyMappings = [], this._documentName = "", this._extractionError = null);
};
b = async function(t) {
  var i;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const e = (i = this.data) == null ? void 0 : i.blueprintId;
    if (!e) {
      this._extractionError = "No blueprint ID available";
      return;
    }
    const o = await (await this.getContext(N)).getLatestToken(), u = await D(t, e, o);
    if (!u) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    this._extractedSections = u.sections, this._propertyMappings = u.propertyMappings, u.sections.title && !this._documentName && (this._documentName = u.sections.title);
  } catch (e) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", e);
  } finally {
    this._isExtracting = !1;
  }
};
f = function() {
  this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    extractedSections: this._extractedSections,
    propertyMappings: this._propertyMappings
  }, this._submitModal();
};
g = function() {
  this._rejectModal();
};
y = function() {
  switch (this._sourceType) {
    case "pdf":
      return s(this, a, x).call(this);
    case "web":
      return s(this, a, E).call(this);
    case "doc":
      return s(this, a, w).call(this);
    default:
      return d;
  }
};
x = function() {
  return c`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${s(this, a, v)}>
					</umb-input-media>
					${s(this, a, U).call(this)}
				</div>
			</umb-property-layout>
		`;
};
E = function() {
  return c`
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
w = function() {
  return c`
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
U = function() {
  return this._isExtracting ? c`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? c`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((i) => i.length > 0) ? c`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : d;
};
M = function() {
  const t = this._extractedSections;
  return Object.values(t).some((e) => e.length > 0) ? c`
			<uui-box headline="Extracted Content" class="preview-box">
				${Object.entries(t).map(([e, r]) => {
    if (!r) return d;
    const o = r.length > 200 ? `${r.substring(0, 200)}...` : r;
    return c`
						<div class="preview-item">
							<strong>${e}:</strong>
							<div class="preview-value">${o}</div>
						</div>
					`;
  })}
			</uui-box>
		` : d;
};
S = function() {
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
n.styles = [
  C,
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

			.preview-value {
				margin-top: var(--uui-size-space-1);
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
l([
  p()
], n.prototype, "_documentName", 2);
l([
  p()
], n.prototype, "_sourceType", 2);
l([
  p()
], n.prototype, "_sourceUrl", 2);
l([
  p()
], n.prototype, "_selectedMediaUnique", 2);
l([
  p()
], n.prototype, "_extractedSections", 2);
l([
  p()
], n.prototype, "_propertyMappings", 2);
l([
  p()
], n.prototype, "_isExtracting", 2);
l([
  p()
], n.prototype, "_extractionError", 2);
n = l([
  T("up-doc-modal")
], n);
const B = n;
export {
  n as UpDocModalElement,
  B as default
};
//# sourceMappingURL=up-doc-modal.element-C4SoocEQ.js.map
