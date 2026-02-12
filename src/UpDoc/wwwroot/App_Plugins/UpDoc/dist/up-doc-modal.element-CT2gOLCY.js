import { a as I, e as G, t as Y } from "./workflow.service-CD2_oFgA.js";
import { html as d, css as H, state as f, customElement as X, nothing as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as J } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as Q } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as k } from "@umbraco-cms/backoffice/auth";
var V = Object.defineProperty, Z = Object.getOwnPropertyDescriptor, S = (t) => {
  throw TypeError(t);
}, h = (t, e, i, u) => {
  for (var r = u > 1 ? void 0 : u ? Z(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (r = (u ? s(e, i, r) : s(r)) || r);
  return u && r && V(e, i, r), r;
}, tt = (t, e, i) => e.has(t) || S("Cannot " + i), et = (t, e, i) => e.has(t) ? S("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), n = (t, e, i) => (tt(t, e, "access private method"), i), o, w, $, v, C, E, U, z, M, D, N, L, P, y, _, x, O, q, F, W, j, A, B, K, R;
const it = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let p = class extends Q {
  constructor() {
    super(...arguments), et(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, n(this, o, w).call(this);
  }
  render() {
    const t = n(this, o, K).call(this);
    return d`
			<umb-body-layout headline="Create from Source">
				${n(this, o, O).call(this)}

				<div class="tab-content">
					${n(this, o, R).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${n(this, o, z)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${n(this, o, U)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
w = async function() {
  var t;
  this._loadingSourceTypes = !0;
  try {
    const e = (t = this.data) == null ? void 0 : t.blueprintId;
    if (!e) return;
    const u = await (await this.getContext(k)).getLatestToken(), r = await I(e, u);
    r && (this._config = r, r.sources && (this._availableSourceTypes = Object.keys(r.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0])));
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
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._selectedMediaUnique ? await n(this, o, C).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._sectionLookup = {}, this._documentName = "", this._extractionError = null);
};
C = async function(t) {
  var e, i;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const r = await (await this.getContext(k)).getLatestToken(), a = await G(t, r);
    if (!((e = a == null ? void 0 : a.elements) != null && e.length)) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const s = {};
    for (const l of a.elements)
      s[l.id] = l.text;
    if (this._extractedSections = s, (i = this._config) != null && i.folderPath) {
      const l = this._config.folderPath.replace(/\\/g, "/").split("/").pop() ?? "";
      if (l) {
        const m = await Y(l, t, r);
        if (m != null && m.sections) {
          const g = {};
          for (const b of m.sections)
            b.included && (b.heading && (g[`${b.id}.heading`] = b.heading), g[`${b.id}.content`] = b.content);
          this._sectionLookup = g;
        }
      }
    }
    const c = { ...s, ...this._sectionLookup };
    !this._documentName && this._config && n(this, o, E).call(this, c);
  } catch (u) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", u);
  } finally {
    this._isExtracting = !1;
  }
};
E = function(t) {
  var u, r, a;
  if (!((a = (r = (u = this._config) == null ? void 0 : u.map) == null ? void 0 : r.mappings) != null && a.length)) return;
  let e = null;
  for (const s of this._config.map.mappings) {
    if (s.enabled === !1) continue;
    const c = s.destinations.find((l) => !l.blockKey);
    if (c) {
      e = c.target;
      break;
    }
  }
  if (!e) return;
  const i = [];
  for (const s of this._config.map.mappings) {
    if (s.enabled === !1) continue;
    s.destinations.some((l) => l.target === e && !l.blockKey) && t[s.source] && i.push(t[s.source]);
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
      return n(this, o, D).call(this);
    case "markdown":
      return n(this, o, N).call(this);
    case "web":
      return n(this, o, L).call(this);
    case "doc":
      return n(this, o, P).call(this);
    default:
      return T;
  }
};
D = function() {
  return d`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${n(this, o, v)}>
					</umb-input-media>
					${n(this, o, x).call(this)}
				</div>
			</umb-property-layout>
		`;
};
N = function() {
  return d`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${n(this, o, v)}>
					</umb-input-media>
					${n(this, o, x).call(this)}
				</div>
			</umb-property-layout>
		`;
};
L = function() {
  return d`
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
  return d`
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
_ = function(t) {
  t === "content" && !n(this, o, y).call(this) || (this._activeTab = t);
};
x = function() {
  return this._isExtracting ? d`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? d`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? d`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : T;
};
O = function() {
  const t = n(this, o, y).call(this);
  return d`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => n(this, o, _).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => n(this, o, _).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => n(this, o, _).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
q = function() {
  return d`
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
				${this._loadingSourceTypes ? d`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? d`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : d`
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
										@change=${n(this, o, $)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${n(this, o, M).call(this)}
						`}
			</uui-box>
		`;
};
F = function() {
  var i, u, r;
  if (!((r = (u = (i = this._config) == null ? void 0 : i.map) == null ? void 0 : u.mappings) != null && r.length)) return [];
  const t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  for (const a of this._config.map.mappings) {
    if (a.enabled === !1) continue;
    const s = this._sectionLookup[a.source] ?? this._extractedSections[a.source];
    if (s)
      for (const c of a.destinations) {
        const l = c.blockKey ? `${c.blockKey}:${c.target}` : c.target, m = t.get(l) ?? [];
        m.push(s), t.set(l, m), e.has(l) || e.set(l, { alias: c.target, blockKey: c.blockKey });
      }
  }
  return Array.from(t.entries()).map(([a, s]) => {
    const c = e.get(a);
    return {
      label: n(this, o, W).call(this, (c == null ? void 0 : c.alias) ?? a, c == null ? void 0 : c.blockKey),
      value: s.join(" ")
    };
  });
};
W = function(t, e) {
  var u, r;
  if (!((u = this._config) != null && u.destination)) return t;
  if (!e) {
    const a = this._config.destination.fields.find((s) => s.alias === t);
    if (a) return a.label;
  }
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const s of a.blocks) {
        if (e && s.key !== e) continue;
        const c = (r = s.properties) == null ? void 0 : r.find((l) => l.alias === t);
        if (c) return `${s.label} > ${c.label || c.alias}`;
      }
  const i = this._config.destination.fields.find((a) => a.alias === t);
  return (i == null ? void 0 : i.label) ?? t;
};
j = function() {
  const t = n(this, o, F).call(this);
  return t.length === 0 ? d`
				<div class="content-editor">
					<p class="content-editor-intro">No mapped content to preview. Create mappings in the workflow editor first.</p>
				</div>
			` : d`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the content that will be mapped to the document.
				</p>
				${t.map(({ label: e, value: i }) => d`
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
									@click=${() => n(this, o, B).call(this, e, i)}>
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
  return d`
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
K = function() {
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
R = function() {
  switch (this._activeTab) {
    case "source":
      return n(this, o, q).call(this);
    case "content":
      return n(this, o, j).call(this);
    case "destination":
      return n(this, o, A).call(this);
  }
};
p.styles = [
  J,
  H`
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
h([
  f()
], p.prototype, "_activeTab", 2);
h([
  f()
], p.prototype, "_documentName", 2);
h([
  f()
], p.prototype, "_sourceType", 2);
h([
  f()
], p.prototype, "_sourceUrl", 2);
h([
  f()
], p.prototype, "_selectedMediaUnique", 2);
h([
  f()
], p.prototype, "_extractedSections", 2);
h([
  f()
], p.prototype, "_sectionLookup", 2);
h([
  f()
], p.prototype, "_config", 2);
h([
  f()
], p.prototype, "_isExtracting", 2);
h([
  f()
], p.prototype, "_extractionError", 2);
h([
  f()
], p.prototype, "_availableSourceTypes", 2);
h([
  f()
], p.prototype, "_loadingSourceTypes", 2);
p = h([
  X("up-doc-modal")
], p);
const ct = p;
export {
  p as UpDocModalElement,
  ct as default
};
//# sourceMappingURL=up-doc-modal.element-CT2gOLCY.js.map
