import { a as Z, e as tt, t as et } from "./workflow.service-T0TEyrPt.js";
import { r as it, a as ot, g as at } from "./destination-utils-CEQ5Lbpg.js";
import { html as r, css as nt, state as h, customElement as st, nothing as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as rt } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ct } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as L } from "@umbraco-cms/backoffice/auth";
var ut = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, M = (t) => {
  throw TypeError(t);
}, d = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? lt(e, i) : e, b = t.length - 1, p; b >= 0; b--)
    (p = t[b]) && (s = (n ? p(e, i, s) : p(s)) || s);
  return n && s && ut(e, i, s), s;
}, dt = (t, e, i) => e.has(t) || M("Cannot " + i), pt = (t, e, i) => e.has(t) ? M("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), a = (t, e, i) => (dt(t, e, "access private method"), i), o, D, N, C, A, I, O, P, K, q, F, R, W, E, T, z, j, B, G, $, S, Y, H, X, J, Q;
const ht = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let u = class extends ct {
  constructor() {
    super(...arguments), pt(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._contentActiveTab = "", this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._sectionLookup = {}, this._config = null, this._contentActiveTab = "", a(this, o, D).call(this);
  }
  render() {
    const t = a(this, o, J).call(this);
    return r`
			<umb-body-layout headline="Create from Source">
				${a(this, o, j).call(this)}

				<div class="tab-content">
					${a(this, o, Q).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${a(this, o, P)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${a(this, o, O)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
D = async function() {
  this._loadingSourceTypes = !0;
  try {
    const t = this.data?.blueprintId;
    if (!t) return;
    const i = await (await this.getContext(L)).getLatestToken(), n = await Z(t, i);
    n && (this._config = n, n.sources && (this._availableSourceTypes = Object.keys(n.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0])));
  } catch (t) {
    console.error("Failed to load available source types:", t);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
N = function(t) {
  const i = t.target.value;
  i !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._sectionLookup = {}, this._extractionError = null, this._contentActiveTab = ""), this._sourceType = i;
};
C = async function(t) {
  const i = t.target.selection;
  this._selectedMediaUnique = i.length > 0 ? i[0] : null, this._selectedMediaUnique ? await a(this, o, A).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._sectionLookup = {}, this._documentName = "", this._extractionError = null);
};
A = async function(t) {
  this._isExtracting = !0, this._extractionError = null;
  try {
    const i = await (await this.getContext(L)).getLatestToken(), n = await tt(t, i);
    if (!n?.elements?.length) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const s = {};
    for (const p of n.elements)
      s[p.id] = p.text;
    if (this._extractedSections = s, this._config?.folderPath) {
      const p = this._config.folderPath.replace(/\\/g, "/").split("/").pop() ?? "";
      if (p) {
        const g = await et(p, t, i);
        if (g?.sections) {
          const c = {};
          for (const l of g.sections)
            l.included && (l.heading && (c[`${l.id}.heading`] = l.heading), c[`${l.id}.content`] = l.content);
          this._sectionLookup = c;
        }
      }
    }
    const b = { ...s, ...this._sectionLookup };
    !this._documentName && this._config && a(this, o, I).call(this, b);
  } catch (e) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", e);
  } finally {
    this._isExtracting = !1;
  }
};
I = function(t) {
  if (!this._config?.map?.mappings?.length) return;
  let e = null;
  for (const n of this._config.map.mappings) {
    if (n.enabled === !1) continue;
    const s = n.destinations.find((b) => !b.blockKey);
    if (s) {
      e = s.target;
      break;
    }
  }
  if (!e) return;
  const i = [];
  for (const n of this._config.map.mappings) {
    if (n.enabled === !1) continue;
    n.destinations.some((b) => b.target === e && !b.blockKey) && t[n.source] && i.push(t[n.source]);
  }
  i.length > 0 && (this._documentName = i.join(" "));
};
O = function() {
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
P = function() {
  this._rejectModal();
};
K = function() {
  switch (this._sourceType) {
    case "pdf":
      return a(this, o, q).call(this);
    case "markdown":
      return a(this, o, F).call(this);
    case "web":
      return a(this, o, R).call(this);
    case "doc":
      return a(this, o, W).call(this);
    default:
      return U;
  }
};
q = function() {
  return r`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, o, C)}>
					</umb-input-media>
					${a(this, o, z).call(this)}
				</div>
			</umb-property-layout>
		`;
};
F = function() {
  return r`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${a(this, o, C)}>
					</umb-input-media>
					${a(this, o, z).call(this)}
				</div>
			</umb-property-layout>
		`;
};
R = function() {
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
W = function() {
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
E = function() {
  return Object.keys(this._extractedSections).length > 0;
};
T = function(t) {
  t === "content" && !a(this, o, E).call(this) || (this._activeTab = t);
};
z = function() {
  return this._isExtracting ? r`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? r`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((e) => e.length > 0) ? r`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : U;
};
j = function() {
  const t = a(this, o, E).call(this);
  return r`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => a(this, o, T).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => a(this, o, T).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => a(this, o, T).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
B = function() {
  return r`
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
				${this._loadingSourceTypes ? r`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? r`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : r`
							<umb-property-layout label="Source Type" orientation="vertical">
								<div slot="editor">
									<uui-select
										label="Select source type"
										.options=${[
    ...this._availableSourceTypes.length > 1 ? [{ name: "Choose a source...", value: "", selected: this._sourceType === "" }] : [],
    ...this._availableSourceTypes.map((t) => ({
      name: ht[t] || t,
      value: t,
      selected: this._sourceType === t
    }))
  ]}
										@change=${a(this, o, N)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${a(this, o, K).call(this)}
						`}
			</uui-box>
		`;
};
G = function() {
  if (!this._config?.map?.mappings?.length || !this._config?.destination) return [];
  const t = this._config.destination, e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const c of this._config.map.mappings) {
    if (c.enabled === !1) continue;
    const l = this._sectionLookup[c.source] ?? this._extractedSections[c.source];
    if (l)
      for (const f of c.destinations) {
        const m = f.blockKey ? `${f.blockKey}:${f.target}` : f.target, v = e.get(m) ?? [];
        v.push(l), e.set(m, v), i.has(m) || i.set(m, { alias: f.target, blockKey: f.blockKey });
      }
  }
  const n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const [c, l] of e.entries()) {
    const f = i.get(c), m = f?.alias ?? c, v = f?.blockKey, k = it(
      { target: m, blockKey: v },
      t
    ) ?? "other";
    n.has(k) || n.set(k, []);
    let w = m;
    if (v && t.blockGrids)
      for (const y of t.blockGrids) {
        const x = y.blocks.find((_) => _.key === v);
        if (x) {
          const _ = x.properties?.find((V) => V.alias === m);
          _ && (w = _.label || _.alias);
          break;
        }
      }
    else {
      const y = t.fields.find((x) => x.alias === m);
      y && (w = y.label);
    }
    n.get(k).push({
      label: w,
      value: l.join(" "),
      blockLabel: v ? ot(v, t) ?? void 0 : void 0
    });
  }
  const b = at(t), p = [];
  for (const c of b) {
    const l = n.get(c.id);
    l?.length && (s.set(c.id, c.label), p.push({ tabId: c.id, tabLabel: c.label, items: l }));
  }
  const g = n.get("other");
  return g?.length && p.push({ tabId: "other", tabLabel: "Other", items: g }), p;
};
$ = function(t, e) {
  return r`
			<div class="section-card">
				<div class="section-card-header">
					<span class="section-card-label">${t}</span>
				</div>
				<div class="section-card-body">
					<uui-action-bar class="section-card-actions">
						<uui-button
							compact
							title="Copy"
							label="Copy ${t}"
							@click=${() => a(this, o, X).call(this, t, e)}>
							<uui-icon name="icon-documents"></uui-icon>
						</uui-button>
					</uui-action-bar>
					<div class="section-card-content">${e}</div>
				</div>
			</div>
		`;
};
S = function(t) {
  if (t.tabId === "page-content") {
    const e = /* @__PURE__ */ new Map();
    for (const i of t.items) {
      const n = i.blockLabel ?? "Other", s = e.get(n) ?? [];
      s.push(i), e.set(n, s);
    }
    return r`
				${Array.from(e.entries()).map(([i, n]) => r`
					<div class="block-group-header">
						<umb-icon name="icon-box"></umb-icon>
						<span>${i}</span>
					</div>
					${n.map((s) => a(this, o, $).call(this, s.label, s.value))}
				`)}
			`;
  }
  return r`
			${t.items.map((e) => a(this, o, $).call(this, e.label, e.value))}
		`;
};
Y = function() {
  const t = a(this, o, G).call(this);
  if (t.length === 0)
    return r`
				<div class="content-editor">
					<p class="content-editor-intro">No mapped content to preview. Create mappings in the workflow editor first.</p>
				</div>
			`;
  (!this._contentActiveTab || !t.find((i) => i.tabId === this._contentActiveTab)) && (this._contentActiveTab = t[0].tabId);
  const e = t.find((i) => i.tabId === this._contentActiveTab) ?? t[0];
  return t.length === 1 ? r`
				<div class="content-editor">
					<p class="content-editor-intro">
						Review the content that will be mapped to the document.
					</p>
					${a(this, o, S).call(this, e)}
				</div>
			` : r`
			<div class="content-editor">
				<p class="content-editor-intro">
					Review the content that will be mapped to the document.
				</p>
				<uui-tab-group class="content-inner-tabs">
					${t.map((i) => r`
						<uui-tab
							label=${i.tabLabel}
							?active=${this._contentActiveTab === i.tabId}
							@click=${() => {
    this._contentActiveTab = i.tabId;
  }}>
							${i.tabLabel}
						</uui-tab>
					`)}
				</uui-tab-group>
				${a(this, o, S).call(this, e)}
			</div>
		`;
};
H = function() {
  return r`
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
X = async function(t, e) {
  try {
    await navigator.clipboard.writeText(e), console.log("Copied to clipboard:", t);
  } catch (i) {
    console.error("Failed to copy:", i);
  }
};
J = function() {
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
Q = function() {
  switch (this._activeTab) {
    case "source":
      return a(this, o, B).call(this);
    case "content":
      return a(this, o, Y).call(this);
    case "destination":
      return a(this, o, H).call(this);
  }
};
u.styles = [
  rt,
  nt`
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

			/* Content tab inner tabs */
			.content-inner-tabs {
				margin-bottom: var(--uui-size-space-4);
				--uui-tab-background: var(--uui-color-surface);
			}

			.block-group-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius) var(--uui-border-radius) 0 0;
				font-weight: 600;
				font-size: var(--uui-type-small-size);
				margin-top: var(--uui-size-space-4);
			}

			.block-group-header:first-child {
				margin-top: 0;
			}

			.block-group-header + .section-card {
				border-top: none;
				border-radius: 0 0 var(--uui-border-radius) var(--uui-border-radius);
			}

			.block-group-header + .section-card .section-card-header {
				border-radius: 0;
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
  h()
], u.prototype, "_activeTab", 2);
d([
  h()
], u.prototype, "_documentName", 2);
d([
  h()
], u.prototype, "_sourceType", 2);
d([
  h()
], u.prototype, "_sourceUrl", 2);
d([
  h()
], u.prototype, "_selectedMediaUnique", 2);
d([
  h()
], u.prototype, "_extractedSections", 2);
d([
  h()
], u.prototype, "_sectionLookup", 2);
d([
  h()
], u.prototype, "_config", 2);
d([
  h()
], u.prototype, "_isExtracting", 2);
d([
  h()
], u.prototype, "_extractionError", 2);
d([
  h()
], u.prototype, "_contentActiveTab", 2);
d([
  h()
], u.prototype, "_availableSourceTypes", 2);
d([
  h()
], u.prototype, "_loadingSourceTypes", 2);
u = d([
  st("up-doc-modal")
], u);
const yt = u;
export {
  u as UpDocModalElement,
  yt as default
};
//# sourceMappingURL=up-doc-modal.element-C4dTmSMs.js.map
