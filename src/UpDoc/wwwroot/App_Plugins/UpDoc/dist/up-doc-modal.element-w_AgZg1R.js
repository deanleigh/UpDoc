import { html as c, nothing as f, css as j, state as d, customElement as q } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as A } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as P } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as I } from "@umbraco-cms/backoffice/auth";
async function W(t, e, i) {
  const l = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${t}&blueprintId=${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${i}`
      }
    }
  );
  if (!l.ok) {
    const s = await l.json();
    return console.error("Extract sections failed:", s), null;
  }
  return l.json();
}
var B = Object.defineProperty, F = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, u = (t, e, i, l) => {
  for (var s = l > 1 ? void 0 : l ? F(e, i) : e, a = t.length - 1, p; a >= 0; a--)
    (p = t[a]) && (s = (l ? p(e, i, s) : p(s)) || s);
  return l && s && B(e, i, s), s;
}, L = (t, e, i) => e.has(t) || _("Cannot " + i), R = (t, e, i) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), n = (t, e, i) => (L(t, e, "access private method"), i), o, g, y, x, E, T, $, C, S, U, m, v, b, z, w, N, M, D, O, k;
const X = {
  title: "Page Title",
  description: "Description",
  itinerary: "Itinerary",
  features: "Features",
  accommodation: "Accommodation"
};
let r = class extends P {
  constructor() {
    super(...arguments), R(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null;
  }
  render() {
    const t = n(this, o, k).call(this);
    return c`
			<umb-body-layout headline="Create from Source">
				${n(this, o, w).call(this)}

				<div class="tab-content">
					${this._activeTab === "source" ? n(this, o, N).call(this) : n(this, o, M).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${n(this, o, T)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${n(this, o, E)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
g = function(t) {
  const i = t.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._config = null, this._extractionError = null), this._sourceType = i;
};
y = async function(t) {
  const i = t.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._selectedMediaUnique ? await n(this, o, x).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._config = null, this._documentName = "", this._extractionError = null);
};
x = async function(t) {
  var e;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const i = (e = this.data) == null ? void 0 : e.blueprintId;
    if (!i) {
      this._extractionError = "No blueprint ID available";
      return;
    }
    const s = await (await this.getContext(I)).getLatestToken(), a = await W(t, i, s);
    if (!a) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    this._extractedSections = a.sections, this._config = a.config, console.log("=== EXTRACTION COMPLETE ==="), console.log("Extracted sections:");
    for (const [p, h] of Object.entries(a.sections))
      console.log(`  ${p}: ${h ? `${h.length} chars - "${h.substring(0, 80)}..."` : "(empty)"}`);
    console.log("Config loaded:", a.config ? "yes" : "no"), a.config && (console.log("  Document type:", a.config.destination.documentTypeAlias), console.log("  Blueprint:", a.config.destination.blueprintName), console.log("  Mappings:", a.config.map.mappings.map((p) => `${p.source} -> ${p.destinations.map((h) => h.target).join(", ")}`))), console.log("=== END EXTRACTION ==="), a.sections.title && !this._documentName && (this._documentName = a.sections.title);
  } catch (i) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", i);
  } finally {
    this._isExtracting = !1;
  }
};
E = function() {
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
T = function() {
  this._rejectModal();
};
$ = function() {
  switch (this._sourceType) {
    case "pdf":
      return n(this, o, C).call(this);
    case "web":
      return n(this, o, S).call(this);
    case "doc":
      return n(this, o, U).call(this);
    default:
      return f;
  }
};
C = function() {
  return c`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${n(this, o, y)}>
					</umb-input-media>
					${n(this, o, z).call(this)}
				</div>
			</umb-property-layout>
		`;
};
S = function() {
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
U = function() {
  return c`
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
  return X[t] || t.charAt(0).toUpperCase() + t.slice(1);
};
v = function() {
  return Object.values(this._extractedSections).some((t) => t.length > 0);
};
b = function(t) {
  t === "content" && !n(this, o, v).call(this) || (this._activeTab = t);
};
z = function() {
  return this._isExtracting ? c`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? c`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? c`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : f;
};
w = function() {
  const t = n(this, o, v).call(this);
  return c`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => n(this, o, b).call(this, "source")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => n(this, o, b).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
			</uui-tab-group>
		`;
};
N = function() {
  var t;
  return c`
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
							@change=${n(this, o, g)}>
						</uui-select>
					</div>
				</umb-property-layout>

				${n(this, o, $).call(this)}
			</uui-box>
		`;
};
M = function() {
  const t = this._extractedSections;
  return c`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the extracted content before creating the document.
				</p>
				${Object.entries(t).map(([e, i]) => i ? c`
						<div class="section-card">
							<div class="section-card-header">
								<span class="section-card-label">${n(this, o, m).call(this, e)}</span>
							</div>
							<div class="section-card-body">
								<uui-action-bar class="section-card-actions">
									<uui-button
										compact
										title="Edit"
										label="Edit ${n(this, o, m).call(this, e)}"
										@click=${() => n(this, o, D).call(this, e)}>
										<uui-icon name="icon-edit"></uui-icon>
									</uui-button>
									<uui-button
										compact
										title="Copy"
										label="Copy ${n(this, o, m).call(this, e)}"
										@click=${() => n(this, o, O).call(this, e, i)}>
										<uui-icon name="icon-documents"></uui-icon>
									</uui-button>
								</uui-action-bar>
								<div class="section-card-content">${i}</div>
							</div>
						</div>
					` : f)}
			</div>
		`;
};
D = function(t) {
  console.log("Edit section:", t);
};
O = async function(t, e) {
  try {
    await navigator.clipboard.writeText(e), console.log("Copied to clipboard:", t);
  } catch (i) {
    console.error("Failed to copy:", i);
  }
};
k = function() {
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
r.styles = [
  A,
  j`
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
  d()
], r.prototype, "_activeTab", 2);
u([
  d()
], r.prototype, "_documentName", 2);
u([
  d()
], r.prototype, "_sourceType", 2);
u([
  d()
], r.prototype, "_sourceUrl", 2);
u([
  d()
], r.prototype, "_selectedMediaUnique", 2);
u([
  d()
], r.prototype, "_extractedSections", 2);
u([
  d()
], r.prototype, "_config", 2);
u([
  d()
], r.prototype, "_isExtracting", 2);
u([
  d()
], r.prototype, "_extractionError", 2);
r = u([
  q("up-doc-modal")
], r);
const J = r;
export {
  r as UpDocModalElement,
  J as default
};
//# sourceMappingURL=up-doc-modal.element-w_AgZg1R.js.map
