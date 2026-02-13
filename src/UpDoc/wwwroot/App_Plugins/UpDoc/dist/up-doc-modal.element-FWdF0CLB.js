import { a as B, e as K, t as I } from "./workflow.service-T0TEyrPt.js";
import { html as c, css as G, state as p, customElement as Y, nothing as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as H } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as X } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as x } from "@umbraco-cms/backoffice/auth";
var J = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, T = (t) => {
  throw TypeError(t);
}, d = (t, e, i, o) => {
  for (var n = o > 1 ? void 0 : o ? Q(e, i) : e, r = t.length - 1, l; r >= 0; r--)
    (l = t[r]) && (n = (o ? l(e, i, n) : l(n)) || n);
  return o && n && J(e, i, n), n;
}, V = (t, e, i) => e.has(t) || T("Cannot " + i), Z = (t, e, i) => e.has(t) ? T("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), s = (t, e, i) => (V(t, e, "access private method"), i), a, k, S, b, w, $, C, E, U, z, M, D, N, _, f, g, L, P, O, q, F, W, j, A, R;
const tt = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let u = class extends X {
  constructor() {
    super(...arguments), Z(this, a), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, s(this, a, k).call(this);
  }
  render() {
    const t = s(this, a, A).call(this);
    return c`
			<umb-body-layout headline="Create from Source">
				${s(this, a, L).call(this)}

				<div class="tab-content">
					${s(this, a, R).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${s(this, a, E)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${s(this, a, C)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
k = async function() {
  this._loadingSourceTypes = !0;
  try {
    const t = this.data?.blueprintId;
    if (!t) return;
    const i = await (await this.getContext(x)).getLatestToken(), o = await B(t, i);
    o && (this._config = o, o.sources && (this._availableSourceTypes = Object.keys(o.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0])));
  } catch (t) {
    console.error("Failed to load available source types:", t);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
S = function(t) {
  const i = t.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._sectionLookup = {}, this._extractionError = null), this._sourceType = i;
};
b = async function(t) {
  const i = t.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._selectedMediaUnique ? await s(this, a, w).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._sectionLookup = {}, this._documentName = "", this._extractionError = null);
};
w = async function(t) {
  this._isExtracting = !0, this._extractionError = null;
  try {
    const i = await (await this.getContext(x)).getLatestToken(), o = await K(t, i);
    if (!o?.elements?.length) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const n = {};
    for (const l of o.elements)
      n[l.id] = l.text;
    if (this._extractedSections = n, this._config?.folderPath) {
      const l = this._config.folderPath.replace(/\\/g, "/").split("/").pop() ?? "";
      if (l) {
        const v = await I(l, t, i);
        if (v?.sections) {
          const m = {};
          for (const h of v.sections)
            h.included && (h.heading && (m[`${h.id}.heading`] = h.heading), m[`${h.id}.content`] = h.content);
          this._sectionLookup = m;
        }
      }
    }
    const r = { ...n, ...this._sectionLookup };
    !this._documentName && this._config && s(this, a, $).call(this, r);
  } catch (e) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", e);
  } finally {
    this._isExtracting = !1;
  }
};
$ = function(t) {
  if (!this._config?.map?.mappings?.length) return;
  let e = null;
  for (const o of this._config.map.mappings) {
    if (o.enabled === !1) continue;
    const n = o.destinations.find((r) => !r.blockKey);
    if (n) {
      e = n.target;
      break;
    }
  }
  if (!e) return;
  const i = [];
  for (const o of this._config.map.mappings) {
    if (o.enabled === !1) continue;
    o.destinations.some((r) => r.target === e && !r.blockKey) && t[o.source] && i.push(t[o.source]);
  }
  i.length > 0 && (this._documentName = i.join(" "));
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
    sectionLookup: this._sectionLookup,
    config: this._config
  }, this._submitModal();
};
E = function() {
  this._rejectModal();
};
U = function() {
  switch (this._sourceType) {
    case "pdf":
      return s(this, a, z).call(this);
    case "markdown":
      return s(this, a, M).call(this);
    case "web":
      return s(this, a, D).call(this);
    case "doc":
      return s(this, a, N).call(this);
    default:
      return y;
  }
};
z = function() {
  return c`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${s(this, a, b)}>
					</umb-input-media>
					${s(this, a, g).call(this)}
				</div>
			</umb-property-layout>
		`;
};
M = function() {
  return c`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${s(this, a, b)}>
					</umb-input-media>
					${s(this, a, g).call(this)}
				</div>
			</umb-property-layout>
		`;
};
D = function() {
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
N = function() {
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
_ = function() {
  return Object.keys(this._extractedSections).length > 0;
};
f = function(t) {
  t === "content" && !s(this, a, _).call(this) || (this._activeTab = t);
};
g = function() {
  return this._isExtracting ? c`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? c`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? c`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : y;
};
L = function() {
  const t = s(this, a, _).call(this);
  return c`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => s(this, a, f).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => s(this, a, f).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => s(this, a, f).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
P = function() {
  return c`
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
				${this._loadingSourceTypes ? c`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? c`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : c`
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
										@change=${s(this, a, S)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${s(this, a, U).call(this)}
						`}
			</uui-box>
		`;
};
O = function() {
  if (!this._config?.map?.mappings?.length) return [];
  const t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  for (const i of this._config.map.mappings) {
    if (i.enabled === !1) continue;
    const o = this._sectionLookup[i.source] ?? this._extractedSections[i.source];
    if (o)
      for (const n of i.destinations) {
        const r = n.blockKey ? `${n.blockKey}:${n.target}` : n.target, l = t.get(r) ?? [];
        l.push(o), t.set(r, l), e.has(r) || e.set(r, { alias: n.target, blockKey: n.blockKey });
      }
  }
  return Array.from(t.entries()).map(([i, o]) => {
    const n = e.get(i);
    return {
      label: s(this, a, q).call(this, n?.alias ?? i, n?.blockKey),
      value: o.join(" ")
    };
  });
};
q = function(t, e) {
  if (!this._config?.destination) return t;
  if (!e) {
    const o = this._config.destination.fields.find((n) => n.alias === t);
    if (o) return o.label;
  }
  if (this._config.destination.blockGrids)
    for (const o of this._config.destination.blockGrids)
      for (const n of o.blocks) {
        if (e && n.key !== e) continue;
        const r = n.properties?.find((l) => l.alias === t);
        if (r) return `${n.label} > ${r.label || r.alias}`;
      }
  return this._config.destination.fields.find((o) => o.alias === t)?.label ?? t;
};
F = function() {
  const t = s(this, a, O).call(this);
  return t.length === 0 ? c`
				<div class="content-editor">
					<p class="content-editor-intro">No mapped content to preview. Create mappings in the workflow editor first.</p>
				</div>
			` : c`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the content that will be mapped to the document.
				</p>
				${t.map(({ label: e, value: i }) => c`
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
									@click=${() => s(this, a, j).call(this, e, i)}>
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
W = function() {
  return c`
			<uui-box headline="Document Type">
				<div class="destination-value">
					<umb-icon name="icon-document-dashed-line"></umb-icon>
					<span>${this.data?.documentTypeName}</span>
				</div>
			</uui-box>

			<uui-box headline="Blueprint">
				<div class="destination-value">
					<umb-icon name="icon-blueprint"></umb-icon>
					<span>${this.data?.blueprintName}</span>
				</div>
			</uui-box>
		`;
};
j = async function(t, e) {
  try {
    await navigator.clipboard.writeText(e), console.log("Copied to clipboard:", t);
  } catch (i) {
    console.error("Failed to copy:", i);
  }
};
A = function() {
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
      return s(this, a, P).call(this);
    case "content":
      return s(this, a, F).call(this);
    case "destination":
      return s(this, a, W).call(this);
  }
};
u.styles = [
  H,
  G`
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
], u.prototype, "_activeTab", 2);
d([
  p()
], u.prototype, "_documentName", 2);
d([
  p()
], u.prototype, "_sourceType", 2);
d([
  p()
], u.prototype, "_sourceUrl", 2);
d([
  p()
], u.prototype, "_selectedMediaUnique", 2);
d([
  p()
], u.prototype, "_extractedSections", 2);
d([
  p()
], u.prototype, "_sectionLookup", 2);
d([
  p()
], u.prototype, "_config", 2);
d([
  p()
], u.prototype, "_isExtracting", 2);
d([
  p()
], u.prototype, "_extractionError", 2);
d([
  p()
], u.prototype, "_availableSourceTypes", 2);
d([
  p()
], u.prototype, "_loadingSourceTypes", 2);
u = d([
  Y("up-doc-modal")
], u);
const st = u;
export {
  u as UpDocModalElement,
  st as default
};
//# sourceMappingURL=up-doc-modal.element-FWdF0CLB.js.map
