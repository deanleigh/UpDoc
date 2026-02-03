import { html as u, nothing as p, css as T, state as d, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as z } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as M } from "@umbraco-cms/backoffice/modal";
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
    const a = await r.json();
    return console.error("Extract sections failed:", a), null;
  }
  return r.json();
}
var q = Object.defineProperty, k = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, l = (t, i, e, r) => {
  for (var a = r > 1 ? void 0 : r ? k(i, e) : i, c = t.length - 1, h; c >= 0; c--)
    (h = t[c]) && (a = (r ? h(i, e, a) : h(a)) || a);
  return r && a && q(i, e, a), a;
}, P = (t, i, e) => i.has(t) || m("Cannot " + e), W = (t, i, e) => i.has(t) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), s = (t, i, e) => (P(t, i, "access private method"), e), o, _, v, f, b, g, x, y, E, w, U, S, $;
let n = class extends M {
  constructor() {
    super(...arguments), W(this, o), this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null;
  }
  render() {
    var i;
    const t = s(this, o, $).call(this);
    return u`
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
								@change=${s(this, o, _)}>
							</uui-select>
						</div>
					</umb-property-layout>

					${s(this, o, x).call(this)}
				</uui-box>

				${s(this, o, S).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${s(this, o, g)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${s(this, o, b)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
_ = function(t) {
  const e = t.target.value;
  e !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._config = null, this._extractionError = null), this._sourceType = e;
};
v = async function(t) {
  const e = t.target.selection;
  this._selectedMediaUnique = e.length > 0 ? e[0] : null, this._selectedMediaUnique ? await s(this, o, f).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._config = null, this._documentName = "", this._extractionError = null);
};
f = async function(t) {
  var i;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const e = (i = this.data) == null ? void 0 : i.blueprintId;
    if (!e) {
      this._extractionError = "No blueprint ID available";
      return;
    }
    const a = await (await this.getContext(N)).getLatestToken(), c = await D(t, e, a);
    if (!c) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    this._extractedSections = c.sections, this._config = c.config, c.sections.title && !this._documentName && (this._documentName = c.sections.title);
  } catch (e) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", e);
  } finally {
    this._isExtracting = !1;
  }
};
b = function() {
  this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    extractedSections: this._extractedSections,
    config: this._config
  }, this._submitModal();
};
g = function() {
  this._rejectModal();
};
x = function() {
  switch (this._sourceType) {
    case "pdf":
      return s(this, o, y).call(this);
    case "web":
      return s(this, o, E).call(this);
    case "doc":
      return s(this, o, w).call(this);
    default:
      return p;
  }
};
y = function() {
  return u`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${s(this, o, v)}>
					</umb-input-media>
					${s(this, o, U).call(this)}
				</div>
			</umb-property-layout>
		`;
};
E = function() {
  return u`
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
  return u`
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
  return this._isExtracting ? u`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? u`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((i) => i.length > 0) ? u`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : p;
};
S = function() {
  const t = this._extractedSections;
  return Object.values(t).some((e) => e.length > 0) ? u`
			<uui-box headline="Extracted Content" class="preview-box">
				${Object.entries(t).map(([e, r]) => {
    if (!r) return p;
    const a = r.length > 200 ? `${r.substring(0, 200)}...` : r;
    return u`
						<div class="preview-item">
							<strong>${e}:</strong>
							<div class="preview-value">${a}</div>
						</div>
					`;
  })}
			</uui-box>
		` : p;
};
$ = function() {
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
  z,
  T`
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
  d()
], n.prototype, "_documentName", 2);
l([
  d()
], n.prototype, "_sourceType", 2);
l([
  d()
], n.prototype, "_sourceUrl", 2);
l([
  d()
], n.prototype, "_selectedMediaUnique", 2);
l([
  d()
], n.prototype, "_extractedSections", 2);
l([
  d()
], n.prototype, "_config", 2);
l([
  d()
], n.prototype, "_isExtracting", 2);
l([
  d()
], n.prototype, "_extractionError", 2);
n = l([
  C("up-doc-modal")
], n);
const B = n;
export {
  n as UpDocModalElement,
  B as default
};
//# sourceMappingURL=up-doc-modal.element-BAfcZzrz.js.map
