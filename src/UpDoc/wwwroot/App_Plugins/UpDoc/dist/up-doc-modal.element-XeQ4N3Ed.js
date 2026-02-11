import { a as B, e as G } from "./workflow.service-Cy8WOA0g.js";
import { html as u, css as X, state as p, customElement as H, nothing as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as Y } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as K } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as x } from "@umbraco-cms/backoffice/auth";
var J = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, T = (t) => {
  throw TypeError(t);
}, d = (t, e, i, c) => {
  for (var o = c > 1 ? void 0 : c ? Q(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (c ? s(e, i, o) : s(o)) || o);
  return c && o && J(e, i, o), o;
}, V = (t, e, i) => e.has(t) || T("Cannot " + i), Z = (t, e, i) => e.has(t) ? T("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), a = (t, e, i) => (V(t, e, "access private method"), i), n, S, C, b, E, w, $, U, k, z, M, D, N, g, f, _, O, P, q, R, j, A, F, L, W;
const tt = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let l = class extends K {
  constructor() {
    super(...arguments), Z(this, n), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, a(this, n, S).call(this);
  }
  render() {
    const t = a(this, n, L).call(this);
    return u`
			<umb-body-layout headline="Create from Source">
				${a(this, n, O).call(this)}

				<div class="tab-content">
					${a(this, n, W).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${a(this, n, U)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${a(this, n, $)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
S = async function() {
  var t;
  this._loadingSourceTypes = !0;
  try {
    const e = (t = this.data) == null ? void 0 : t.blueprintId;
    if (!e) return;
    const c = await (await this.getContext(x)).getLatestToken(), o = await B(e, c);
    o && (this._config = o, o.sources && (this._availableSourceTypes = Object.keys(o.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0])));
  } catch (e) {
    console.error("Failed to load available source types:", e);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
C = function(t) {
  const i = t.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._extractionError = null), this._sourceType = i;
};
b = async function(t) {
  const i = t.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._selectedMediaUnique ? await a(this, n, E).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._documentName = "", this._extractionError = null);
};
E = async function(t) {
  var e;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const c = await (await this.getContext(x)).getLatestToken(), o = await G(t, c);
    if (!((e = o == null ? void 0 : o.elements) != null && e.length)) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const r = {};
    for (const s of o.elements)
      r[s.id] = s.text;
    this._extractedSections = r, console.log("=== RICH EXTRACTION COMPLETE ==="), console.log(`Extracted ${o.elements.length} elements from ${o.source.totalPages} pages`), console.log("Config loaded:", this._config ? "yes" : "no"), this._config && console.log("  Mappings:", this._config.map.mappings.map((s) => `${s.source} -> ${s.destinations.map((h) => h.target).join(", ")}`)), console.log("=== END EXTRACTION ==="), !this._documentName && this._config && a(this, n, w).call(this, r);
  } catch (i) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", i);
  } finally {
    this._isExtracting = !1;
  }
};
w = function(t) {
  var c, o, r, s, h, v;
  if (!((r = (o = (c = this._config) == null ? void 0 : c.map) == null ? void 0 : o.mappings) != null && r.length)) return;
  const e = (v = (h = (s = this._config.map.mappings[0]) == null ? void 0 : s.destinations) == null ? void 0 : h[0]) == null ? void 0 : v.target;
  if (!e) return;
  const i = [];
  for (const m of this._config.map.mappings) {
    if (m.enabled === !1) continue;
    m.destinations.some((I) => I.target === e) && t[m.source] && i.push(t[m.source]);
  }
  i.length > 0 && (this._documentName = i.join(" "));
};
$ = function() {
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
U = function() {
  this._rejectModal();
};
k = function() {
  switch (this._sourceType) {
    case "pdf":
      return a(this, n, z).call(this);
    case "markdown":
      return a(this, n, M).call(this);
    case "web":
      return a(this, n, D).call(this);
    case "doc":
      return a(this, n, N).call(this);
    default:
      return y;
  }
};
z = function() {
  return u`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, n, b)}>
					</umb-input-media>
					${a(this, n, _).call(this)}
				</div>
			</umb-property-layout>
		`;
};
M = function() {
  return u`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, n, b)}>
					</umb-input-media>
					${a(this, n, _).call(this)}
				</div>
			</umb-property-layout>
		`;
};
D = function() {
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
N = function() {
  return u`
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
g = function() {
  return Object.keys(this._extractedSections).length > 0;
};
f = function(t) {
  t === "content" && !a(this, n, g).call(this) || (this._activeTab = t);
};
_ = function() {
  return this._isExtracting ? u`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? u`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? u`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : y;
};
O = function() {
  const t = a(this, n, g).call(this);
  return u`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => a(this, n, f).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => a(this, n, f).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => a(this, n, f).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
P = function() {
  return u`
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
				${this._loadingSourceTypes ? u`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? u`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : u`
							<umb-property-layout label="Source Type" orientation="vertical">
								<div slot="editor">
									<uui-select
										label="Select source type"
										.options=${[
    ...this._availableSourceTypes.length > 1 ? [{ name: "Choose a source...", value: "", selected: this._sourceType === "" }] : [],
    ...this._availableSourceTypes.map((t) => ({
      name: tt[t] || t,
      value: t,
      selected: this._sourceType === t
    }))
  ]}
										@change=${a(this, n, C)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${a(this, n, k).call(this)}
						`}
			</uui-box>
		`;
};
q = function() {
  var e, i, c;
  if (!((c = (i = (e = this._config) == null ? void 0 : e.map) == null ? void 0 : i.mappings) != null && c.length)) return [];
  const t = /* @__PURE__ */ new Map();
  for (const o of this._config.map.mappings) {
    if (o.enabled === !1) continue;
    const r = this._extractedSections[o.source];
    if (r)
      for (const s of o.destinations) {
        const h = t.get(s.target) ?? [];
        h.push(r), t.set(s.target, h);
      }
  }
  return Array.from(t.entries()).map(([o, r]) => ({
    label: a(this, n, R).call(this, o),
    value: r.join(" ")
  }));
};
R = function(t) {
  var i, c;
  if (!((i = this._config) != null && i.destination)) return t;
  const e = this._config.destination.fields.find((o) => o.alias === t);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const o of this._config.destination.blockGrids)
      for (const r of o.blocks) {
        const s = (c = r.properties) == null ? void 0 : c.find((h) => h.alias === t);
        if (s) return `${r.label} > ${s.label || s.alias}`;
      }
  return t;
};
j = function() {
  const t = a(this, n, q).call(this);
  return t.length === 0 ? u`
				<div class="content-editor">
					<p class="content-editor-intro">No mapped content to preview. Create mappings in the workflow editor first.</p>
				</div>
			` : u`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the content that will be mapped to the document.
				</p>
				${t.map(({ label: e, value: i }) => u`
					<div class="section-card">
						<div class="section-card-header">
							<span class="section-card-label">${e}</span>
						</div>
						<div class="section-card-body">
							<uui-action-bar class="section-card-actions">
								<uui-button
									compact
									title="Copy"
									label="Copy ${e}"
									@click=${() => a(this, n, F).call(this, e, i)}>
									<uui-icon name="icon-documents"></uui-icon>
								</uui-button>
							</uui-action-bar>
							<div class="section-card-content">${i}</div>
						</div>
					</div>
				`)}
			</div>
		`;
};
A = function() {
  var t, e;
  return u`
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
F = async function(t, e) {
  try {
    await navigator.clipboard.writeText(e), console.log("Copied to clipboard:", t);
  } catch (i) {
    console.error("Failed to copy:", i);
  }
};
L = function() {
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
W = function() {
  switch (this._activeTab) {
    case "source":
      return a(this, n, P).call(this);
    case "content":
      return a(this, n, j).call(this);
    case "destination":
      return a(this, n, A).call(this);
  }
};
l.styles = [
  Y,
  X`
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
d([
  p()
], l.prototype, "_activeTab", 2);
d([
  p()
], l.prototype, "_documentName", 2);
d([
  p()
], l.prototype, "_sourceType", 2);
d([
  p()
], l.prototype, "_sourceUrl", 2);
d([
  p()
], l.prototype, "_selectedMediaUnique", 2);
d([
  p()
], l.prototype, "_extractedSections", 2);
d([
  p()
], l.prototype, "_config", 2);
d([
  p()
], l.prototype, "_isExtracting", 2);
d([
  p()
], l.prototype, "_extractionError", 2);
d([
  p()
], l.prototype, "_availableSourceTypes", 2);
d([
  p()
], l.prototype, "_loadingSourceTypes", 2);
l = d([
  H("up-doc-modal")
], l);
const rt = l;
export {
  l as UpDocModalElement,
  rt as default
};
//# sourceMappingURL=up-doc-modal.element-XeQ4N3Ed.js.map
