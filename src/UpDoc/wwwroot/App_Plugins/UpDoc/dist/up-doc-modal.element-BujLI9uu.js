import { html as u, nothing as y, css as W, state as p, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as j } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as B } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as F } from "@umbraco-cms/backoffice/auth";
function I(t) {
  var e, o, r, a;
  const i = [];
  for (const d of t.map.mappings)
    if (d.enabled !== !1)
      for (const b of d.destinations) {
        const h = {
          from: { sectionType: d.source },
          to: {}
        }, v = b.target.split(".");
        if (v.length === 1)
          h.to.property = v[0];
        else if (v.length === 3) {
          const [g, q, x] = v, m = (e = t.destination.blockGrids) == null ? void 0 : e.find((f) => f.key === g), _ = m == null ? void 0 : m.blocks.find((f) => f.key === q);
          m && _ && (h.to.blockGrid = m.alias, h.to.targetProperty = ((r = (o = _.properties) == null ? void 0 : o.find((f) => f.key === x)) == null ? void 0 : r.alias) ?? x, _.identifyBy && (h.to.blockSearch = {
            property: _.identifyBy.property,
            value: _.identifyBy.value
          }));
        }
        (a = b.transforms) != null && a.some((g) => g.type === "convertMarkdownToHtml") && (h.to.convertMarkdown = !0), i.push(h);
      }
  return i;
}
async function K(t, i, e) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${t}&blueprintId=${i}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  if (!o.ok) {
    const a = await o.json();
    return console.error("Extract sections failed:", a), null;
  }
  const r = await o.json();
  return {
    sections: r.sections,
    config: r.config,
    propertyMappings: I(r.config)
  };
}
var A = Object.defineProperty, L = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, l = (t, i, e, o) => {
  for (var r = o > 1 ? void 0 : o ? L(i, e) : i, a = t.length - 1, d; a >= 0; a--)
    (d = t[a]) && (r = (o ? d(i, e, r) : d(r)) || r);
  return o && r && A(i, e, r), r;
}, R = (t, i, e) => i.has(t) || w("Cannot " + e), G = (t, i, e) => i.has(t) ? w("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), n = (t, i, e) => (R(t, i, "access private method"), e), s, E, M, U, S, T, $, C, z, k, N, D, P;
let c = class extends B {
  constructor() {
    super(...arguments), G(this, s), this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._propertyMappings = [], this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._propertyMappings = [];
  }
  render() {
    var i;
    const t = n(this, s, P).call(this);
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
								@change=${n(this, s, E)}>
							</uui-select>
						</div>
					</umb-property-layout>

					${n(this, s, $).call(this)}
				</uui-box>

				${n(this, s, D).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${n(this, s, T)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${n(this, s, S)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
E = function(t) {
  const e = t.target.value;
  e !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._propertyMappings = [], this._extractionError = null), this._sourceType = e;
};
M = async function(t) {
  const e = t.target.selection;
  this._selectedMediaUnique = e.length > 0 ? e[0] : null, this._selectedMediaUnique ? await n(this, s, U).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._propertyMappings = [], this._documentName = "", this._extractionError = null);
};
U = async function(t) {
  var i;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const e = (i = this.data) == null ? void 0 : i.blueprintId;
    if (!e) {
      this._extractionError = "No blueprint ID available";
      return;
    }
    const r = await (await this.getContext(F)).getLatestToken(), a = await K(t, e, r);
    if (!a) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    this._extractedSections = a.sections, this._propertyMappings = a.propertyMappings, a.sections.title && !this._documentName && (this._documentName = a.sections.title);
  } catch (e) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", e);
  } finally {
    this._isExtracting = !1;
  }
};
S = function() {
  this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    extractedSections: this._extractedSections,
    propertyMappings: this._propertyMappings
  }, this._submitModal();
};
T = function() {
  this._rejectModal();
};
$ = function() {
  switch (this._sourceType) {
    case "pdf":
      return n(this, s, C).call(this);
    case "web":
      return n(this, s, z).call(this);
    case "doc":
      return n(this, s, k).call(this);
    default:
      return y;
  }
};
C = function() {
  return u`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${n(this, s, M)}>
					</umb-input-media>
					${n(this, s, N).call(this)}
				</div>
			</umb-property-layout>
		`;
};
z = function() {
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
k = function() {
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
N = function() {
  return this._isExtracting ? u`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? u`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((i) => i.length > 0) ? u`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : y;
};
D = function() {
  const t = this._extractedSections;
  return Object.values(t).some((e) => e.length > 0) ? u`
			<uui-box headline="Extracted Content" class="preview-box">
				${Object.entries(t).map(([e, o]) => {
    if (!o) return y;
    const r = o.length > 200 ? `${o.substring(0, 200)}...` : o;
    return u`
						<div class="preview-item">
							<strong>${e}:</strong>
							<div class="preview-value">${r}</div>
						</div>
					`;
  })}
			</uui-box>
		` : y;
};
P = function() {
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
c.styles = [
  j,
  W`
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
], c.prototype, "_documentName", 2);
l([
  p()
], c.prototype, "_sourceType", 2);
l([
  p()
], c.prototype, "_sourceUrl", 2);
l([
  p()
], c.prototype, "_selectedMediaUnique", 2);
l([
  p()
], c.prototype, "_extractedSections", 2);
l([
  p()
], c.prototype, "_propertyMappings", 2);
l([
  p()
], c.prototype, "_isExtracting", 2);
l([
  p()
], c.prototype, "_extractionError", 2);
c = l([
  O("up-doc-modal")
], c);
const Q = c;
export {
  c as UpDocModalElement,
  Q as default
};
//# sourceMappingURL=up-doc-modal.element-BujLI9uu.js.map
