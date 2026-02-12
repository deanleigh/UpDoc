import { a as G, e as Y, t as H } from "./workflow.service-CD2_oFgA.js";
import { html as u, css as K, state as p, customElement as X, nothing as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as J } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as Q } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as S } from "@umbraco-cms/backoffice/auth";
var V = Object.defineProperty, Z = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, d = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Z(e, i) : e, s = t.length - 1, c; s >= 0; s--)
    (c = t[s]) && (n = (r ? c(e, i, n) : c(n)) || n);
  return r && n && V(e, i, n), n;
}, tt = (t, e, i) => e.has(t) || w("Cannot " + i), et = (t, e, i) => e.has(t) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), a = (t, e, i) => (tt(t, e, "access private method"), i), o, k, $, v, C, E, U, z, M, D, N, L, P, y, g, x, O, q, F, W, j, A, B, R, I;
const it = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let l = class extends Q {
  constructor() {
    super(...arguments), et(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, a(this, o, k).call(this);
  }
  render() {
    const t = a(this, o, R).call(this);
    return u`
			<umb-body-layout headline="Create from Source">
				${a(this, o, O).call(this)}

				<div class="tab-content">
					${a(this, o, I).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${a(this, o, z)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${a(this, o, U)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
k = async function() {
  var t;
  this._loadingSourceTypes = !0;
  try {
    const e = (t = this.data) == null ? void 0 : t.blueprintId;
    if (!e) return;
    const r = await (await this.getContext(S)).getLatestToken(), n = await G(e, r);
    n && (this._config = n, n.sources && (this._availableSourceTypes = Object.keys(n.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0])));
  } catch (e) {
    console.error("Failed to load available source types:", e);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
$ = function(t) {
  const i = t.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._sectionLookup = {}, this._extractionError = null), this._sourceType = i;
};
v = async function(t) {
  const i = t.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._selectedMediaUnique ? await a(this, o, C).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._sectionLookup = {}, this._documentName = "", this._extractionError = null);
};
C = async function(t) {
  var e, i;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const n = await (await this.getContext(S)).getLatestToken(), s = await Y(t, n);
    if (!((e = s == null ? void 0 : s.elements) != null && e.length)) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const c = {};
    for (const m of s.elements)
      c[m.id] = m.text;
    if (this._extractedSections = c, (i = this._config) != null && i.folderPath) {
      const m = this._config.folderPath.replace(/\\/g, "/").split("/").pop() ?? "";
      if (m) {
        const f = await H(m, t, n);
        if (f != null && f.sections) {
          const _ = {};
          for (const b of f.sections)
            b.included && (b.heading && (_[`${b.id}.heading`] = b.heading), _[`${b.id}.content`] = b.content);
          this._sectionLookup = _;
        }
      }
    }
    const h = { ...c, ...this._sectionLookup };
    !this._documentName && this._config && a(this, o, E).call(this, h);
  } catch (r) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", r);
  } finally {
    this._isExtracting = !1;
  }
};
E = function(t) {
  var r, n, s, c, h, m;
  if (!((s = (n = (r = this._config) == null ? void 0 : r.map) == null ? void 0 : n.mappings) != null && s.length)) return;
  const e = (m = (h = (c = this._config.map.mappings[0]) == null ? void 0 : c.destinations) == null ? void 0 : h[0]) == null ? void 0 : m.target;
  if (!e) return;
  const i = [];
  for (const f of this._config.map.mappings) {
    if (f.enabled === !1) continue;
    f.destinations.some((b) => b.target === e) && t[f.source] && i.push(t[f.source]);
  }
  i.length > 0 && (this._documentName = i.join(" "));
};
U = function() {
  console.log("=== CREATE BUTTON CLICKED ==="), console.log("Document name:", this._documentName), console.log("Extracted sections being passed:");
  for (const [t, e] of Object.entries(this._extractedSections))
    console.log(`  ${t}: ${e ? `${e.length} chars` : "(empty)"}`);
  console.log("Config being passed:", this._config ? "yes" : "no"), console.log("=== END CREATE DEBUG ==="), this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    extractedSections: this._extractedSections,
    sectionLookup: this._sectionLookup,
    config: this._config
  }, this._submitModal();
};
z = function() {
  this._rejectModal();
};
M = function() {
  switch (this._sourceType) {
    case "pdf":
      return a(this, o, D).call(this);
    case "markdown":
      return a(this, o, N).call(this);
    case "web":
      return a(this, o, L).call(this);
    case "doc":
      return a(this, o, P).call(this);
    default:
      return T;
  }
};
D = function() {
  return u`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, o, v)}>
					</umb-input-media>
					${a(this, o, x).call(this)}
				</div>
			</umb-property-layout>
		`;
};
N = function() {
  return u`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, o, v)}>
					</umb-input-media>
					${a(this, o, x).call(this)}
				</div>
			</umb-property-layout>
		`;
};
L = function() {
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
P = function() {
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
y = function() {
  return Object.keys(this._extractedSections).length > 0;
};
g = function(t) {
  t === "content" && !a(this, o, y).call(this) || (this._activeTab = t);
};
x = function() {
  return this._isExtracting ? u`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? u`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? u`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : T;
};
O = function() {
  const t = a(this, o, y).call(this);
  return u`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => a(this, o, g).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => a(this, o, g).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => a(this, o, g).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
q = function() {
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
      name: it[t] || t,
      value: t,
      selected: this._sourceType === t
    }))
  ]}
										@change=${a(this, o, $)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${a(this, o, M).call(this)}
						`}
			</uui-box>
		`;
};
F = function() {
  var e, i, r;
  if (!((r = (i = (e = this._config) == null ? void 0 : e.map) == null ? void 0 : i.mappings) != null && r.length)) return [];
  const t = /* @__PURE__ */ new Map();
  for (const n of this._config.map.mappings) {
    if (n.enabled === !1) continue;
    const s = this._sectionLookup[n.source] ?? this._extractedSections[n.source];
    if (s)
      for (const c of n.destinations) {
        const h = t.get(c.target) ?? [];
        h.push(s), t.set(c.target, h);
      }
  }
  return Array.from(t.entries()).map(([n, s]) => ({
    label: a(this, o, W).call(this, n),
    value: s.join(" ")
  }));
};
W = function(t) {
  var i, r;
  if (!((i = this._config) != null && i.destination)) return t;
  const e = this._config.destination.fields.find((n) => n.alias === t);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const n of this._config.destination.blockGrids)
      for (const s of n.blocks) {
        const c = (r = s.properties) == null ? void 0 : r.find((h) => h.alias === t);
        if (c) return `${s.label} > ${c.label || c.alias}`;
      }
  return t;
};
j = function() {
  const t = a(this, o, F).call(this);
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
									@click=${() => a(this, o, B).call(this, e, i)}>
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
B = async function(t, e) {
  try {
    await navigator.clipboard.writeText(e), console.log("Copied to clipboard:", t);
  } catch (i) {
    console.error("Failed to copy:", i);
  }
};
R = function() {
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
I = function() {
  switch (this._activeTab) {
    case "source":
      return a(this, o, q).call(this);
    case "content":
      return a(this, o, j).call(this);
    case "destination":
      return a(this, o, A).call(this);
  }
};
l.styles = [
  J,
  K`
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
], l.prototype, "_sectionLookup", 2);
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
  X("up-doc-modal")
], l);
const ct = l;
export {
  l as UpDocModalElement,
  ct as default
};
//# sourceMappingURL=up-doc-modal.element-Wb7j0VOn.js.map
