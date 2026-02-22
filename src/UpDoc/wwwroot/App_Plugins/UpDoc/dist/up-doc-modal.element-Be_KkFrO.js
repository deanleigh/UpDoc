import { a as Z } from "./workflow.types-sXs8a86t.js";
import { a as ee, t as te } from "./workflow.service-8lXLgP5U.js";
import { r as ie, a as oe, g as ae } from "./destination-utils-CEQ5Lbpg.js";
import { html as c, css as ne, state as b, customElement as se, nothing as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as re } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as ce } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as E } from "@umbraco-cms/backoffice/auth";
var ue = Object.defineProperty, le = Object.getOwnPropertyDescriptor, M = (e) => {
  throw TypeError(e);
}, h = (e, i, t, n) => {
  for (var r = n > 1 ? void 0 : n ? le(i, t) : i, p = e.length - 1, u; p >= 0; p--)
    (u = e[p]) && (r = (n ? u(i, t, r) : u(r)) || r);
  return n && r && ue(i, t, r), r;
}, de = (e, i, t) => i.has(e) || M("Cannot " + t), pe = (e, i, t) => i.has(e) ? M("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), s = (e, i, t) => (de(e, i, "access private method"), t), o, L, D, S, N, A, q, I, O, P, K, W, j, C, k, U, F, G, B, w, R, Y, H, X, J, Q;
const he = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let d = class extends ce {
  constructor() {
    super(...arguments), pe(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._sectionLookup = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._contentActiveTab = "", this._availableSourceTypes = [], this._loadingSourceTypes = !0;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._sectionLookup = {}, this._config = null, this._contentActiveTab = "", s(this, o, L).call(this);
  }
  render() {
    const e = s(this, o, J).call(this);
    return c`
			<umb-body-layout headline="Create from Source">
				${s(this, o, F).call(this)}

				<div class="tab-content">
					${s(this, o, Q).call(this)}
				</div>

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${s(this, o, I)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!e}
					@click="${s(this, o, q)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
o = /* @__PURE__ */ new WeakSet();
L = async function() {
  this._loadingSourceTypes = !0;
  try {
    const e = this.data?.blueprintId;
    if (!e) return;
    const t = await (await this.getContext(E)).getLatestToken(), n = await ee(e, t);
    n && (this._config = n, n.sources && (this._availableSourceTypes = Object.keys(n.sources), this._availableSourceTypes.length === 1 && (this._sourceType = this._availableSourceTypes[0])));
  } catch (e) {
    console.error("Failed to load available source types:", e);
  } finally {
    this._loadingSourceTypes = !1;
  }
};
D = function(e) {
  const t = e.target.value;
  t !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._sectionLookup = {}, this._extractionError = null, this._contentActiveTab = ""), this._sourceType = t;
};
S = async function(e) {
  const t = e.target.selection;
  this._selectedMediaUnique = t.length > 0 ? t[0] : null, this._selectedMediaUnique ? await s(this, o, N).call(this, this._selectedMediaUnique) : (this._sectionLookup = {}, this._documentName = "", this._extractionError = null);
};
N = async function(e) {
  this._isExtracting = !0, this._extractionError = null;
  try {
    const t = await (await this.getContext(E)).getLatestToken();
    if (!this._config?.folderPath) {
      this._extractionError = "No workflow configured for this blueprint";
      return;
    }
    const n = this._config.folderPath.replace(/\\/g, "/").split("/").pop() ?? "";
    if (!n) {
      this._extractionError = "Could not determine workflow name";
      return;
    }
    const r = await te(n, e, t);
    console.log("[UpDoc] transformAdhoc result:", r), r && console.log(
      "[UpDoc] Areas:",
      r.areas?.length ?? 0,
      r.areas?.map((a) => `${a.name} (groups: ${a.groups?.length ?? 0}, sections: ${a.sections?.length ?? 0})`)
    );
    const p = Z(r);
    if (console.log(
      "[UpDoc] allSections:",
      p.length,
      p.map((a) => `${a.id} [${a.pattern}] included=${a.included}`)
    ), !p.length) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const u = {};
    for (const a of p)
      a.included && (a.heading && (u[`${a.id}.heading`] = a.pattern === "role" ? a.content : a.heading, u[`${a.id}.title`] = a.pattern === "role" ? a.content : a.heading), u[`${a.id}.content`] = a.content, a.description && (u[`${a.id}.description`] = a.description), a.summary && (u[`${a.id}.summary`] = a.summary));
    if (this._sectionLookup = u, console.log("[UpDoc] sectionLookup keys:", Object.keys(u)), this._config?.map?.mappings) {
      const a = this._config.map.mappings.filter((l) => l.enabled !== !1 && !u[l.source]).map((l) => l.source);
      a.length && console.warn("[UpDoc] Map sources NOT found in sectionLookup:", a);
    }
    !this._documentName && this._config && s(this, o, A).call(this, u);
  } catch (i) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", i);
  } finally {
    this._isExtracting = !1;
  }
};
A = function(e) {
  if (this._config?.map?.mappings?.length) {
    let i = null;
    for (const t of this._config.map.mappings) {
      if (t.enabled === !1) continue;
      const n = t.destinations.find((r) => !r.blockKey);
      if (n) {
        i = n.target;
        break;
      }
    }
    if (i) {
      const t = [];
      for (const n of this._config.map.mappings) {
        if (n.enabled === !1) continue;
        n.destinations.some(
          (p) => p.target === i && !p.blockKey
        ) && e[n.source] && t.push(e[n.source]);
      }
      if (t.length > 0) {
        this._documentName = t.join(" ");
        return;
      }
    }
  }
  for (const [i, t] of Object.entries(e))
    if (i.endsWith(".heading") && t) {
      this._documentName = t;
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
O = function() {
  switch (this._sourceType) {
    case "pdf":
      return s(this, o, P).call(this);
    case "markdown":
      return s(this, o, K).call(this);
    case "web":
      return s(this, o, W).call(this);
    case "doc":
      return s(this, o, j).call(this);
    default:
      return z;
  }
};
P = function() {
  return c`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						.selection=${this._selectedMediaUnique ? [this._selectedMediaUnique] : []}
						@change=${s(this, o, S)}>
					</umb-input-media>
					${s(this, o, U).call(this)}
				</div>
			</umb-property-layout>
		`;
};
K = function() {
  return c`
			<umb-property-layout label="Markdown File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						.selection=${this._selectedMediaUnique ? [this._selectedMediaUnique] : []}
						@change=${s(this, o, S)}>
					</umb-input-media>
					${s(this, o, U).call(this)}
				</div>
			</umb-property-layout>
		`;
};
W = function() {
  return c`
			<umb-property-layout label="Web Page URL" orientation="vertical">
				<div slot="editor">
					<uui-input
						label="URL"
						placeholder="https://example.com/page"
						.value=${this._sourceUrl}
						@input=${(e) => this._sourceUrl = e.target.value}>
					</uui-input>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Web page extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
};
j = function() {
  return c`
			<umb-property-layout label="Word Document" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${(e) => {
    const t = e.target.selection;
    this._selectedMediaUnique = t.length > 0 ? t[0] : null;
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
C = function() {
  return Object.keys(this._sectionLookup).length > 0;
};
k = function(e) {
  e === "content" && !s(this, o, C).call(this) || (this._activeTab = e);
};
U = function() {
  return this._isExtracting ? c`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? c`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._sectionLookup).some((i) => i.length > 0) ? c`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : z;
};
F = function() {
  const e = s(this, o, C).call(this);
  return c`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => s(this, o, k).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!e}
					@click=${() => s(this, o, k).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => s(this, o, k).call(this, "destination")}>
					<uui-icon slot="icon" name="icon-document"></uui-icon>
					Destination
				</uui-tab>
			</uui-tab-group>
		`;
};
G = function() {
  return c`
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
				${this._loadingSourceTypes ? c`<uui-loader-bar></uui-loader-bar>` : this._availableSourceTypes.length === 0 ? c`<p style="color: var(--uui-color-danger);">No source types configured for this workflow.</p>` : c`
							<umb-property-layout label="Source Type" orientation="vertical">
								<div slot="editor">
									<uui-select
										label="Select source type"
										.options=${[
    ...this._availableSourceTypes.length > 1 ? [{ name: "Choose a source...", value: "", selected: this._sourceType === "" }] : [],
    ...this._availableSourceTypes.map((e) => ({
      name: he[e] || e,
      value: e,
      selected: this._sourceType === e
    }))
  ]}
										@change=${s(this, o, D)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${s(this, o, O).call(this)}
						`}
			</uui-box>
		`;
};
B = function() {
  if (!this._config?.map?.mappings?.length || !this._config?.destination) return [];
  const e = this._config.destination, i = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  for (const l of this._config.map.mappings) {
    if (l.enabled === !1) continue;
    const v = this._sectionLookup[l.source];
    if (v)
      for (const f of l.destinations) {
        const m = f.blockKey ? `${f.blockKey}:${f.target}` : f.target, g = i.get(m) ?? [];
        g.push(v), i.set(m, g), t.has(m) || t.set(m, { alias: f.target, blockKey: f.blockKey });
      }
  }
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const [l, v] of i.entries()) {
    const f = t.get(l), m = f?.alias ?? l, g = f?.blockKey, T = ie(
      { target: m, blockKey: g },
      e
    ) ?? "other";
    n.has(T) || n.set(T, []);
    let $ = m;
    if (g && e.blockGrids)
      for (const y of e.blockGrids) {
        const x = y.blocks.find((_) => _.key === g);
        if (x) {
          const _ = x.properties?.find((V) => V.alias === m);
          _ && ($ = _.label || _.alias);
          break;
        }
      }
    else {
      const y = e.fields.find((x) => x.alias === m);
      y && ($ = y.label);
    }
    n.get(T).push({
      label: $,
      value: v.join(" "),
      blockLabel: g ? oe(g, e) ?? void 0 : void 0
    });
  }
  const p = ae(e), u = [];
  for (const l of p) {
    const v = n.get(l.id);
    v?.length && (r.set(l.id, l.label), u.push({ tabId: l.id, tabLabel: l.label, items: v }));
  }
  const a = n.get("other");
  return a?.length && u.push({ tabId: "other", tabLabel: "Other", items: a }), u;
};
w = function(e, i) {
  return c`
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
							@click=${() => s(this, o, X).call(this, e, i)}>
							<uui-icon name="icon-documents"></uui-icon>
						</uui-button>
					</uui-action-bar>
					<div class="section-card-content">${i}</div>
				</div>
			</div>
		`;
};
R = function(e) {
  if (e.tabId === "page-content") {
    const i = /* @__PURE__ */ new Map();
    for (const t of e.items) {
      const n = t.blockLabel ?? "Other", r = i.get(n) ?? [];
      r.push(t), i.set(n, r);
    }
    return c`
				${Array.from(i.entries()).map(([t, n]) => c`
					<div class="block-group-header">
						<umb-icon name="icon-box"></umb-icon>
						<span>${t}</span>
					</div>
					${n.map((r) => s(this, o, w).call(this, r.label, r.value))}
				`)}
			`;
  }
  return c`
			${e.items.map((i) => s(this, o, w).call(this, i.label, i.value))}
		`;
};
Y = function() {
  const e = s(this, o, B).call(this);
  if (e.length === 0)
    return c`
				<div class="content-editor">
					<p class="content-editor-intro">No mapped content to preview. Create mappings in the workflow editor first.</p>
				</div>
			`;
  (!this._contentActiveTab || !e.find((t) => t.tabId === this._contentActiveTab)) && (this._contentActiveTab = e[0].tabId);
  const i = e.find((t) => t.tabId === this._contentActiveTab) ?? e[0];
  return c`
			<uui-tab-group class="content-inner-tabs">
				${e.map((t) => c`
					<uui-tab
						label=${t.tabLabel}
						?active=${this._contentActiveTab === t.tabId}
						@click=${() => {
    this._contentActiveTab = t.tabId;
  }}>
						${t.tabLabel}
					</uui-tab>
				`)}
			</uui-tab-group>
			${s(this, o, R).call(this, i)}
		`;
};
H = function() {
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
X = async function(e, i) {
  try {
    await navigator.clipboard.writeText(i), console.log("Copied to clipboard:", e);
  } catch (t) {
    console.error("Failed to copy:", t);
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
      return s(this, o, G).call(this);
    case "content":
      return s(this, o, Y).call(this);
    case "destination":
      return s(this, o, H).call(this);
  }
};
d.styles = [
  re,
  ne`
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
h([
  b()
], d.prototype, "_activeTab", 2);
h([
  b()
], d.prototype, "_documentName", 2);
h([
  b()
], d.prototype, "_sourceType", 2);
h([
  b()
], d.prototype, "_sourceUrl", 2);
h([
  b()
], d.prototype, "_selectedMediaUnique", 2);
h([
  b()
], d.prototype, "_sectionLookup", 2);
h([
  b()
], d.prototype, "_config", 2);
h([
  b()
], d.prototype, "_isExtracting", 2);
h([
  b()
], d.prototype, "_extractionError", 2);
h([
  b()
], d.prototype, "_contentActiveTab", 2);
h([
  b()
], d.prototype, "_availableSourceTypes", 2);
h([
  b()
], d.prototype, "_loadingSourceTypes", 2);
d = h([
  se("up-doc-modal")
], d);
const xe = d;
export {
  d as UpDocModalElement,
  xe as default
};
//# sourceMappingURL=up-doc-modal.element-Be_KkFrO.js.map
