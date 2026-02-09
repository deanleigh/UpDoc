import { a as I, e as L } from "./workflow.service-BHEUOVK1.js";
import { html as r, nothing as _, css as F, state as l, customElement as j } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as W } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as B } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as y } from "@umbraco-cms/backoffice/auth";
var R = Object.defineProperty, X = Object.getOwnPropertyDescriptor, x = (t) => {
  throw TypeError(t);
}, u = (t, e, i, p) => {
  for (var c = p > 1 ? void 0 : p ? X(e, i) : e, n = t.length - 1, d; n >= 0; n--)
    (d = t[n]) && (c = (p ? d(e, i, c) : d(c)) || c);
  return p && c && R(e, i, c), c;
}, Y = (t, e, i) => e.has(t) || x("Cannot " + i), G = (t, e, i) => e.has(t) ? x("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), a = (t, e, i) => (Y(t, e, "access private method"), i), o, T, S, f, E, C, $, w, U, z, M, N, m, v, b, g, k, D, O, A, P, q;
const H = {
  title: "Page Title",
  description: "Description",
  itinerary: "Itinerary",
  features: "Features",
  accommodation: "Accommodation"
}, K = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let s = class extends B {
  constructor() {
    super(...arguments), G(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, a(this, o, T).call(this);
  }
  render() {
    const t = a(this, o, q).call(this);
    return r`
			<umb-body-layout headline="Create from Source">
				${a(this, o, k).call(this)}

				<div class="tab-content">
					${this._activeTab === "source" ? a(this, o, D).call(this) : a(this, o, O).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${a(this, o, $)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${a(this, o, C)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
T = async function() {
  var t;
  this._loadingSourceTypes = !0;
  try {
    const e = (t = this.data) == null ? void 0 : t.blueprintId;
    if (!e) return;
    const p = await (await this.getContext(y)).getLatestToken(), c = await I(e, p);
    c != null && c.sources && (this._availableSourceTypes = Object.keys(c.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0]));
  } catch (e) {
    console.error("Failed to load available source types:", e);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
S = function(t) {
  const i = t.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._config = null, this._extractionError = null), this._sourceType = i;
};
f = async function(t) {
  const i = t.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._selectedMediaUnique ? await a(this, o, E).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._config = null, this._documentName = "", this._extractionError = null);
};
E = async function(t) {
  var e;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const i = (e = this.data) == null ? void 0 : e.blueprintId;
    if (!i) {
      this._extractionError = "No blueprint ID available";
      return;
    }
    const c = await (await this.getContext(y)).getLatestToken(), n = await L(t, i, c, this._sourceType || "pdf");
    if (!n) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    this._extractedSections = n.sections, this._config = n.config, console.log("=== EXTRACTION COMPLETE ==="), console.log("Extracted sections:");
    for (const [d, h] of Object.entries(n.sections))
      console.log(`  ${d}: ${h ? `${h.length} chars - "${h.substring(0, 80)}..."` : "(empty)"}`);
    console.log("Config loaded:", n.config ? "yes" : "no"), n.config && (console.log("  Document type:", n.config.destination.documentTypeAlias), console.log("  Blueprint:", n.config.destination.blueprintName), console.log("  Mappings:", n.config.map.mappings.map((d) => `${d.source} -> ${d.destinations.map((h) => h.target).join(", ")}`))), console.log("=== END EXTRACTION ==="), n.sections.title && !this._documentName && (this._documentName = n.sections.title);
  } catch (i) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", i);
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
      return a(this, o, U).call(this);
    case "markdown":
      return a(this, o, z).call(this);
    case "web":
      return a(this, o, M).call(this);
    case "doc":
      return a(this, o, N).call(this);
    default:
      return _;
  }
};
U = function() {
  return r`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, o, f)}>
					</umb-input-media>
					${a(this, o, g).call(this)}
				</div>
			</umb-property-layout>
		`;
};
z = function() {
  return r`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, o, f)}>
					</umb-input-media>
					${a(this, o, g).call(this)}
				</div>
			</umb-property-layout>
		`;
};
M = function() {
  return r`
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
  return r`
			<umb-property-layout label="Word Document" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${(t) => {
    const i = t.target.selection;
    this._selectedMediaUnique = i.length > 0 ? i[0] : null;
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
  return H[t] || t.charAt(0).toUpperCase() + t.slice(1);
};
v = function() {
  return Object.values(this._extractedSections).some((t) => t.length > 0);
};
b = function(t) {
  t === "content" && !a(this, o, v).call(this) || (this._activeTab = t);
};
g = function() {
  return this._isExtracting ? r`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? r`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? r`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : _;
};
k = function() {
  const t = a(this, o, v).call(this);
  return r`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => a(this, o, b).call(this, "source")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => a(this, o, b).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
			</uui-tab-group>
		`;
};
D = function() {
  var t;
  return r`
			<uui-box headline="Blueprint">
				<div class="blueprint-display">
					<umb-icon name="icon-blueprint"></umb-icon>
					<span>${(t = this.data) == null ? void 0 : t.blueprintName}</span>
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
				${this._loadingSourceTypes ? r`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? r`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : r`
							<umb-property-layout label="Source Type" orientation="vertical">
								<div slot="editor">
									<uui-select
										label="Select source type"
										.options=${[
    ...this._availableSourceTypes.length > 1 ? [{ name: "Choose a source...", value: "", selected: this._sourceType === "" }] : [],
    ...this._availableSourceTypes.map((e) => ({
      name: K[e] || e,
      value: e,
      selected: this._sourceType === e
    }))
  ]}
										@change=${a(this, o, S)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${a(this, o, w).call(this)}
						`}
			</uui-box>
		`;
};
O = function() {
  const t = this._extractedSections;
  return r`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the extracted content before creating the document.
				</p>
				${Object.entries(t).map(([e, i]) => i ? r`
						<div class="section-card">
							<div class="section-card-header">
								<span class="section-card-label">${a(this, o, m).call(this, e)}</span>
							</div>
							<div class="section-card-body">
								<uui-action-bar class="section-card-actions">
									<uui-button
										compact
										title="Edit"
										label="Edit ${a(this, o, m).call(this, e)}"
										@click=${() => a(this, o, A).call(this, e)}>
										<uui-icon name="icon-edit"></uui-icon>
									</uui-button>
									<uui-button
										compact
										title="Copy"
										label="Copy ${a(this, o, m).call(this, e)}"
										@click=${() => a(this, o, P).call(this, e, i)}>
										<uui-icon name="icon-documents"></uui-icon>
									</uui-button>
								</uui-action-bar>
								<div class="section-card-content">${i}</div>
							</div>
						</div>
					` : _)}
			</div>
		`;
};
A = function(t) {
  console.log("Edit section:", t);
};
P = async function(t, e) {
  try {
    await navigator.clipboard.writeText(e), console.log("Copied to clipboard:", t);
  } catch (i) {
    console.error("Failed to copy:", i);
  }
};
q = function() {
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
s.styles = [
  W,
  F`
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

			/* Source tab */
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
], s.prototype, "_activeTab", 2);
u([
  l()
], s.prototype, "_documentName", 2);
u([
  l()
], s.prototype, "_sourceType", 2);
u([
  l()
], s.prototype, "_sourceUrl", 2);
u([
  l()
], s.prototype, "_selectedMediaUnique", 2);
u([
  l()
], s.prototype, "_extractedSections", 2);
u([
  l()
], s.prototype, "_config", 2);
u([
  l()
], s.prototype, "_isExtracting", 2);
u([
  l()
], s.prototype, "_extractionError", 2);
u([
  l()
], s.prototype, "_availableSourceTypes", 2);
u([
  l()
], s.prototype, "_loadingSourceTypes", 2);
s = u([
  j("up-doc-modal")
], s);
const et = s;
export {
  s as UpDocModalElement,
  et as default
};
//# sourceMappingURL=up-doc-modal.element-JgfXxNRN.js.map
