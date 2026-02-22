import { a as Z } from "./workflow.types-sXs8a86t.js";
import { a as tt, t as et } from "./workflow.service-8lXLgP5U.js";
import { r as it, a as ot, g as at } from "./destination-utils-CEQ5Lbpg.js";
import { html as s, css as nt, state as h, customElement as rt, nothing as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as st } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ct } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as E } from "@umbraco-cms/backoffice/auth";
var ut = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, M = (t) => {
  throw TypeError(t);
}, d = (t, i, e, a) => {
  for (var c = a > 1 ? void 0 : a ? lt(i, e) : i, b = t.length - 1, l; b >= 0; b--)
    (l = t[b]) && (c = (a ? l(i, e, c) : l(c)) || c);
  return a && c && ut(i, e, c), c;
}, dt = (t, i, e) => i.has(t) || M("Cannot " + e), pt = (t, i, e) => i.has(t) ? M("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), n = (t, i, e) => (dt(t, i, "access private method"), e), o, L, D, C, N, A, q, I, P, O, K, W, F, S, T, z, j, G, B, $, R, Y, H, X, J, Q;
const ht = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let u = class extends ct {
  constructor() {
    super(...arguments), pt(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._sectionLookup = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._contentActiveTab = "", this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._sectionLookup = {}, this._config = null, this._contentActiveTab = "", n(this, o, L).call(this);
  }
  render() {
    const t = n(this, o, J).call(this);
    return s`
			<umb-body-layout headline="Create from Source">
				${n(this, o, j).call(this)}

				<div class="tab-content">
					${n(this, o, Q).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${n(this, o, I)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${n(this, o, q)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
L = async function() {
  this._loadingSourceTypes = !0;
  try {
    const t = this.data?.blueprintId;
    if (!t) return;
    const e = await (await this.getContext(E)).getLatestToken(), a = await tt(t, e);
    a && (this._config = a, a.sources && (this._availableSourceTypes = Object.keys(a.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0])));
  } catch (t) {
    console.error("Failed to load available source types:", t);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
D = function(t) {
  const e = t.target.value;
  e !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._sectionLookup = {}, this._extractionError = null, this._contentActiveTab = ""), this._sourceType = e;
};
C = async function(t) {
  const e = t.target.selection;
  this._selectedMediaUnique = e.length > 0 ? e[0] : null, this._selectedMediaUnique ? await n(this, o, N).call(this, this._selectedMediaUnique) : (this._sectionLookup = {}, this._documentName = "", this._extractionError = null);
};
N = async function(t) {
  this._isExtracting = !0, this._extractionError = null;
  try {
    const e = await (await this.getContext(E)).getLatestToken();
    if (!this._config?.folderPath) {
      this._extractionError = "No workflow configured for this blueprint";
      return;
    }
    const a = this._config.folderPath.replace(/\\/g, "/").split("/").pop() ?? "";
    if (!a) {
      this._extractionError = "Could not determine workflow name";
      return;
    }
    const c = await et(a, t, e), b = Z(c);
    if (!b.length) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const l = {};
    for (const r of b)
      r.included && (r.heading && (l[`${r.id}.heading`] = r.pattern === "role" ? r.content : r.heading, l[`${r.id}.title`] = r.pattern === "role" ? r.content : r.heading), l[`${r.id}.content`] = r.content, r.description && (l[`${r.id}.description`] = r.description), r.summary && (l[`${r.id}.summary`] = r.summary));
    this._sectionLookup = l, !this._documentName && this._config && n(this, o, A).call(this, l);
  } catch (i) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", i);
  } finally {
    this._isExtracting = !1;
  }
};
A = function(t) {
  if (this._config?.map?.mappings?.length) {
    let i = null;
    for (const e of this._config.map.mappings) {
      if (e.enabled === !1) continue;
      const a = e.destinations.find((c) => !c.blockKey);
      if (a) {
        i = a.target;
        break;
      }
    }
    if (i) {
      const e = [];
      for (const a of this._config.map.mappings) {
        if (a.enabled === !1) continue;
        a.destinations.some(
          (b) => b.target === i && !b.blockKey
        ) && t[a.source] && e.push(t[a.source]);
      }
      if (e.length > 0) {
        this._documentName = e.join(" ");
        return;
      }
    }
  }
  for (const [i, e] of Object.entries(t))
    if (i.endsWith(".heading") && e) {
      this._documentName = e;
      return;
    }
};
q = function() {
  this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    sectionLookup: this._sectionLookup,
    config: this._config
  }, this._submitModal();
};
I = function() {
  this._rejectModal();
};
P = function() {
  switch (this._sourceType) {
    case "pdf":
      return n(this, o, O).call(this);
    case "markdown":
      return n(this, o, K).call(this);
    case "web":
      return n(this, o, W).call(this);
    case "doc":
      return n(this, o, F).call(this);
    default:
      return U;
  }
};
O = function() {
  return s`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						.selection=${this._selectedMediaUnique ? [this._selectedMediaUnique] : []}
						@change=${n(this, o, C)}>
					</umb-input-media>
					${n(this, o, z).call(this)}
				</div>
			</umb-property-layout>
		`;
};
K = function() {
  return s`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						.selection=${this._selectedMediaUnique ? [this._selectedMediaUnique] : []}
						@change=${n(this, o, C)}>
					</umb-input-media>
					${n(this, o, z).call(this)}
				</div>
			</umb-property-layout>
		`;
};
W = function() {
  return s`
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
F = function() {
  return s`
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
S = function() {
  return Object.keys(this._sectionLookup).length > 0;
};
T = function(t) {
  t === "content" && !n(this, o, S).call(this) || (this._activeTab = t);
};
z = function() {
  return this._isExtracting ? s`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? s`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._sectionLookup).some((i) => i.length > 0) ? s`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : U;
};
j = function() {
  const t = n(this, o, S).call(this);
  return s`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => n(this, o, T).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => n(this, o, T).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => n(this, o, T).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
G = function() {
  return s`
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
				${this._loadingSourceTypes ? s`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? s`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : s`
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
										@change=${n(this, o, D)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${n(this, o, P).call(this)}
						`}
			</uui-box>
		`;
};
B = function() {
  if (!this._config?.map?.mappings?.length || !this._config?.destination) return [];
  const t = this._config.destination, i = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  for (const p of this._config.map.mappings) {
    if (p.enabled === !1) continue;
    const g = this._sectionLookup[p.source];
    if (g)
      for (const f of p.destinations) {
        const m = f.blockKey ? `${f.blockKey}:${f.target}` : f.target, v = i.get(m) ?? [];
        v.push(g), i.set(m, v), e.has(m) || e.set(m, { alias: f.target, blockKey: f.blockKey });
      }
  }
  const a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  for (const [p, g] of i.entries()) {
    const f = e.get(p), m = f?.alias ?? p, v = f?.blockKey, k = it(
      { target: m, blockKey: v },
      t
    ) ?? "other";
    a.has(k) || a.set(k, []);
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
    a.get(k).push({
      label: w,
      value: g.join(" "),
      blockLabel: v ? ot(v, t) ?? void 0 : void 0
    });
  }
  const b = at(t), l = [];
  for (const p of b) {
    const g = a.get(p.id);
    g?.length && (c.set(p.id, p.label), l.push({ tabId: p.id, tabLabel: p.label, items: g }));
  }
  const r = a.get("other");
  return r?.length && l.push({ tabId: "other", tabLabel: "Other", items: r }), l;
};
$ = function(t, i) {
  return s`
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
							@click=${() => n(this, o, X).call(this, t, i)}>
							<uui-icon name="icon-documents"></uui-icon>
						</uui-button>
					</uui-action-bar>
					<div class="section-card-content">${i}</div>
				</div>
			</div>
		`;
};
R = function(t) {
  if (t.tabId === "page-content") {
    const i = /* @__PURE__ */ new Map();
    for (const e of t.items) {
      const a = e.blockLabel ?? "Other", c = i.get(a) ?? [];
      c.push(e), i.set(a, c);
    }
    return s`
				${Array.from(i.entries()).map(([e, a]) => s`
					<div class="block-group-header">
						<umb-icon name="icon-box"></umb-icon>
						<span>${e}</span>
					</div>
					${a.map((c) => n(this, o, $).call(this, c.label, c.value))}
				`)}
			`;
  }
  return s`
			${t.items.map((i) => n(this, o, $).call(this, i.label, i.value))}
		`;
};
Y = function() {
  const t = n(this, o, B).call(this);
  if (t.length === 0)
    return s`
				<div class="content-editor">
					<p class="content-editor-intro">No mapped content to preview. Create mappings in the workflow editor first.</p>
				</div>
			`;
  (!this._contentActiveTab || !t.find((e) => e.tabId === this._contentActiveTab)) && (this._contentActiveTab = t[0].tabId);
  const i = t.find((e) => e.tabId === this._contentActiveTab) ?? t[0];
  return s`
			<uui-tab-group class="content-inner-tabs">
				${t.map((e) => s`
					<uui-tab
						label=${e.tabLabel}
						?active=${this._contentActiveTab === e.tabId}
						@click=${() => {
    this._contentActiveTab = e.tabId;
  }}>
						${e.tabLabel}
					</uui-tab>
				`)}
			</uui-tab-group>
			${n(this, o, R).call(this, i)}
		`;
};
H = function() {
  return s`
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
X = async function(t, i) {
  try {
    await navigator.clipboard.writeText(i), console.log("Copied to clipboard:", t);
  } catch (e) {
    console.error("Failed to copy:", e);
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
      return n(this, o, G).call(this);
    case "content":
      return n(this, o, Y).call(this);
    case "destination":
      return n(this, o, H).call(this);
  }
};
u.styles = [
  st,
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

			/* Content tab inner tabs — bleed edge-to-edge past outer body layout padding */
			.content-inner-tabs {
				margin: calc(var(--uui-size-layout-1) * -1);
				margin-bottom: var(--uui-size-space-4);
				background: var(--uui-color-surface);
				--uui-tab-background: var(--uui-color-surface);
				border-bottom: 1px solid var(--uui-color-border);
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
  rt("up-doc-modal")
], u);
const xt = u;
export {
  u as UpDocModalElement,
  xt as default
};
//# sourceMappingURL=up-doc-modal.element-ByFpD0Z8.js.map
