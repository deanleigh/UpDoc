import { a as F, e as j } from "./workflow.service-BWNI6sBi.js";
import { html as n, css as W, state as l, customElement as B, nothing as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as R } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as X } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as y } from "@umbraco-cms/backoffice/auth";
var Y = Object.defineProperty, G = Object.getOwnPropertyDescriptor, x = (t) => {
  throw TypeError(t);
}, u = (t, e, o, p) => {
  for (var c = p > 1 ? void 0 : p ? G(e, o) : e, s = t.length - 1, d; s >= 0; s--)
    (d = t[s]) && (c = (p ? d(e, o, c) : d(c)) || c);
  return p && c && Y(e, o, c), c;
}, H = (t, e, o) => e.has(t) || x("Cannot " + o), K = (t, e, o) => e.has(t) ? x("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), a = (t, e, o) => (H(t, e, "access private method"), o), i, T, S, f, E, C, $, w, U, z, D, N, m, v, b, g, M, k, O, A, P, q, I, L;
const J = {
  title: "Page Title",
  description: "Description",
  itinerary: "Itinerary",
  features: "Features",
  accommodation: "Accommodation"
}, Q = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let r = class extends X {
  constructor() {
    super(...arguments), K(this, i), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, a(this, i, T).call(this);
  }
  render() {
    const t = a(this, i, I).call(this);
    return n`
			<umb-body-layout headline="Create from Source">
				${a(this, i, M).call(this)}

				<div class="tab-content">
					${a(this, i, L).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${a(this, i, $)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${a(this, i, C)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
T = async function() {
  var t;
  this._loadingSourceTypes = !0;
  try {
    const e = (t = this.data) == null ? void 0 : t.blueprintId;
    if (!e) return;
    const p = await (await this.getContext(y)).getLatestToken(), c = await F(e, p);
    c != null && c.sources && (this._availableSourceTypes = Object.keys(c.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0]));
  } catch (e) {
    console.error("Failed to load available source types:", e);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
S = function(t) {
  const o = t.target.value;
  o !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._config = null, this._extractionError = null), this._sourceType = o;
};
f = async function(t) {
  const o = t.target.selection;
  this._selectedMediaUnique = o.length > 0 ? o[0] : null, this._selectedMediaUnique ? await a(this, i, E).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._config = null, this._documentName = "", this._extractionError = null);
};
E = async function(t) {
  var e;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const o = (e = this.data) == null ? void 0 : e.blueprintId;
    if (!o) {
      this._extractionError = "No blueprint ID available";
      return;
    }
    const c = await (await this.getContext(y)).getLatestToken(), s = await j(t, o, c, this._sourceType || "pdf");
    if (!s) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    this._extractedSections = s.sections, this._config = s.config, console.log("=== EXTRACTION COMPLETE ==="), console.log("Extracted sections:");
    for (const [d, h] of Object.entries(s.sections))
      console.log(`  ${d}: ${h ? `${h.length} chars - "${h.substring(0, 80)}..."` : "(empty)"}`);
    console.log("Config loaded:", s.config ? "yes" : "no"), s.config && (console.log("  Document type:", s.config.destination.documentTypeAlias), console.log("  Blueprint:", s.config.destination.blueprintName), console.log("  Mappings:", s.config.map.mappings.map((d) => `${d.source} -> ${d.destinations.map((h) => h.target).join(", ")}`))), console.log("=== END EXTRACTION ==="), s.sections.title && !this._documentName && (this._documentName = s.sections.title);
  } catch (o) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", o);
  } finally {
    this._isExtracting = !1;
  }
};
C = function() {
  console.log("=== CREATE BUTTON CLICKED ==="), console.log("Document name:", this._documentName), console.log("Extracted sections being passed:");
  for (const [t, e] of Object.entries(this._extractedSections))
    console.log(`  ${t}: ${e ? `${e.length} chars` : "(empty)"}`);
  console.log("Config being passed:", this._config ? "yes" : "no"), console.log("=== END CREATE DEBUG ==="), this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    extractedSections: this._extractedSections,
    config: this._config
  }, this._submitModal();
};
$ = function() {
  this._rejectModal();
};
w = function() {
  switch (this._sourceType) {
    case "pdf":
      return a(this, i, U).call(this);
    case "markdown":
      return a(this, i, z).call(this);
    case "web":
      return a(this, i, D).call(this);
    case "doc":
      return a(this, i, N).call(this);
    default:
      return _;
  }
};
U = function() {
  return n`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, i, f)}>
					</umb-input-media>
					${a(this, i, g).call(this)}
				</div>
			</umb-property-layout>
		`;
};
z = function() {
  return n`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, i, f)}>
					</umb-input-media>
					${a(this, i, g).call(this)}
				</div>
			</umb-property-layout>
		`;
};
D = function() {
  return n`
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
N = function() {
  return n`
			<umb-property-layout label="Word Document" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${(t) => {
    const o = t.target.selection;
    this._selectedMediaUnique = o.length > 0 ? o[0] : null;
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
m = function(t) {
  return J[t] || t.charAt(0).toUpperCase() + t.slice(1);
};
v = function() {
  return Object.values(this._extractedSections).some((t) => t.length > 0);
};
b = function(t) {
  t === "content" && !a(this, i, v).call(this) || (this._activeTab = t);
};
g = function() {
  return this._isExtracting ? n`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? n`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? n`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : _;
};
M = function() {
  const t = a(this, i, v).call(this);
  return n`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => a(this, i, b).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => a(this, i, b).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => a(this, i, b).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
k = function() {
  return n`
			<uui-box headline="Document Name">
				<p>Enter a document name or let it be populated from the source. You can edit this later.</p>
				<uui-input
					id="name"
					label="name"
					placeholder="Enter document name"
					.value=${this._documentName}
					@input=${(t) => this._documentName = t.target.value}>
				</uui-input>
			</uui-box>

			<uui-box headline="Source">
				${this._loadingSourceTypes ? n`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? n`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : n`
							<umb-property-layout label="Source Type" orientation="vertical">
								<div slot="editor">
									<uui-select
										label="Select source type"
										.options=${[
    ...this._availableSourceTypes.length > 1 ? [{ name: "Choose a source...", value: "", selected: this._sourceType === "" }] : [],
    ...this._availableSourceTypes.map((t) => ({
      name: Q[t] || t,
      value: t,
      selected: this._sourceType === t
    }))
  ]}
										@change=${a(this, i, S)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${a(this, i, w).call(this)}
						`}
			</uui-box>
		`;
};
O = function() {
  const t = this._extractedSections;
  return n`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the extracted content before creating the document.
				</p>
				${Object.entries(t).map(([e, o]) => o ? n`
						<div class="section-card">
							<div class="section-card-header">
								<span class="section-card-label">${a(this, i, m).call(this, e)}</span>
							</div>
							<div class="section-card-body">
								<uui-action-bar class="section-card-actions">
									<uui-button
										compact
										title="Edit"
										label="Edit ${a(this, i, m).call(this, e)}"
										@click=${() => a(this, i, P).call(this, e)}>
										<uui-icon name="icon-edit"></uui-icon>
									</uui-button>
									<uui-button
										compact
										title="Copy"
										label="Copy ${a(this, i, m).call(this, e)}"
										@click=${() => a(this, i, q).call(this, e, o)}>
										<uui-icon name="icon-documents"></uui-icon>
									</uui-button>
								</uui-action-bar>
								<div class="section-card-content">${o}</div>
							</div>
						</div>
					` : _)}
			</div>
		`;
};
A = function() {
  var t, e;
  return n`
			<uui-box headline="Document Type">
				<div class="destination-value">
					<umb-icon name="icon-document-dashed-line"></umb-icon>
					<span>${(t = this.data) == null ? void 0 : t.documentTypeName}</span>
				</div>
			</uui-box>

			<uui-box headline="Blueprint">
				<div class="destination-value">
					<umb-icon name="icon-blueprint"></umb-icon>
					<span>${(e = this.data) == null ? void 0 : e.blueprintName}</span>
				</div>
			</uui-box>
		`;
};
P = function(t) {
  console.log("Edit section:", t);
};
q = async function(t, e) {
  try {
    await navigator.clipboard.writeText(e), console.log("Copied to clipboard:", t);
  } catch (o) {
    console.error("Failed to copy:", o);
  }
};
I = function() {
  if (!this._documentName || this._isExtracting) return !1;
  switch (this._sourceType) {
    case "pdf":
    case "markdown":
      return !!this._selectedMediaUnique;
    case "web":
    case "doc":
      return !1;
    default:
      return !1;
  }
};
L = function() {
  switch (this._activeTab) {
    case "source":
      return a(this, i, k).call(this);
    case "content":
      return a(this, i, O).call(this);
    case "destination":
      return a(this, i, A).call(this);
  }
};
r.styles = [
  R,
  W`
			/* Navigation tabs */
			uui-tab[disabled] {
				opacity: 0.5;
				cursor: not-allowed;
			}

			/* Tab content */
			.tab-content {
				display: flex;
				flex-direction: column;
			}

			/* Content editor tab */
			.content-editor {
				display: flex;
				flex-direction: column;
			}

			.content-editor uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			.content-editor-intro {
				margin: 0 0 var(--uui-size-space-4) 0;
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
			}

			.section-card {
				position: relative;
				background: var(--uui-color-surface);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				margin-bottom: var(--uui-size-space-4);
			}

			.section-card-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				background: var(--uui-color-surface-alt);
			}

			.section-card-label {
				font-weight: 600;
			}

			.section-card-body {
				position: relative;
			}

			.section-card-actions {
				position: absolute;
				top: var(--uui-size-space-2);
				right: var(--uui-size-space-2);
				opacity: 0;
				transition: opacity 120ms ease;
			}

			.section-card:hover .section-card-actions {
				opacity: 1;
			}

			.section-card-content {
				padding: var(--uui-size-space-4);
				white-space: pre-wrap;
				font-size: var(--uui-type-small-size);
				max-height: 300px;
				overflow-y: auto;
			}

			/* Destination tab */
			.destination-value {
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
u([
  l()
], r.prototype, "_activeTab", 2);
u([
  l()
], r.prototype, "_documentName", 2);
u([
  l()
], r.prototype, "_sourceType", 2);
u([
  l()
], r.prototype, "_sourceUrl", 2);
u([
  l()
], r.prototype, "_selectedMediaUnique", 2);
u([
  l()
], r.prototype, "_extractedSections", 2);
u([
  l()
], r.prototype, "_config", 2);
u([
  l()
], r.prototype, "_isExtracting", 2);
u([
  l()
], r.prototype, "_extractionError", 2);
u([
  l()
], r.prototype, "_availableSourceTypes", 2);
u([
  l()
], r.prototype, "_loadingSourceTypes", 2);
r = u([
  B("up-doc-modal")
], r);
const ot = r;
export {
  r as UpDocModalElement,
  ot as default
};
//# sourceMappingURL=up-doc-modal.element-BjEBZUyv.js.map
