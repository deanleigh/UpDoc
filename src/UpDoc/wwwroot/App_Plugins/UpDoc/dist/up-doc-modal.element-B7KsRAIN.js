import { a as Z, t as tt } from "./workflow.service-vjpy4ykG.js";
import { r as et, a as it, g as ot } from "./destination-utils-CEQ5Lbpg.js";
import { html as s, css as at, state as h, customElement as nt, nothing as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as rt } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as st } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as U } from "@umbraco-cms/backoffice/auth";
var ct = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, M = (t) => {
  throw TypeError(t);
}, d = (t, i, e, a) => {
  for (var r = a > 1 ? void 0 : a ? ut(i, e) : i, u = t.length - 1, l; u >= 0; u--)
    (l = t[u]) && (r = (a ? l(i, e, r) : l(r)) || r);
  return a && r && ct(i, e, r), r;
}, lt = (t, i, e) => i.has(t) || M("Cannot " + e), dt = (t, i, e) => i.has(t) ? M("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), n = (t, i, e) => (lt(t, i, "access private method"), e), o, L, D, $, N, A, I, P, q, O, K, F, W, C, x, z, j, G, B, w, R, Y, H, X, J, Q;
const pt = {
  pdf: "PDF Document",
  markdown: "Markdown",
  web: "Web Page",
  doc: "Word Document"
};
let c = class extends st {
  constructor() {
    super(...arguments), dt(this, o), this._activeTab = "source", this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._sectionLookup = {}, this._config = null, this._isExtracting = !1, this._extractionError = null, this._contentActiveTab = "", this._availableSourceTypes = [], this._loadingSourceTypes = !0;
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
					@click="${n(this, o, P)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!t}
					@click="${n(this, o, I)}"></uui-button>
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
    const e = await (await this.getContext(U)).getLatestToken(), a = await Z(t, e);
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
$ = async function(t) {
  const e = t.target.selection;
  this._selectedMediaUnique = e.length > 0 ? e[0] : null, this._selectedMediaUnique ? await n(this, o, N).call(this, this._selectedMediaUnique) : (this._sectionLookup = {}, this._documentName = "", this._extractionError = null);
};
N = async function(t) {
  this._isExtracting = !0, this._extractionError = null;
  try {
    const e = await (await this.getContext(U)).getLatestToken();
    if (!this._config?.folderPath) {
      this._extractionError = "No workflow configured for this blueprint";
      return;
    }
    const a = this._config.folderPath.replace(/\\/g, "/").split("/").pop() ?? "";
    if (!a) {
      this._extractionError = "Could not determine workflow name";
      return;
    }
    const r = await tt(a, t, e);
    if (!r?.sections?.length) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    const u = {};
    for (const l of r.sections)
      l.included && (l.heading && (u[`${l.id}.heading`] = l.heading), u[`${l.id}.content`] = l.content);
    this._sectionLookup = u, !this._documentName && this._config && n(this, o, A).call(this, u);
  } catch (i) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", i);
  } finally {
    this._isExtracting = !1;
  }
};
A = function(t) {
  if (!this._config?.map?.mappings?.length) return;
  let i = null;
  for (const a of this._config.map.mappings) {
    if (a.enabled === !1) continue;
    const r = a.destinations.find((u) => !u.blockKey);
    if (r) {
      i = r.target;
      break;
    }
  }
  if (!i) return;
  const e = [];
  for (const a of this._config.map.mappings) {
    if (a.enabled === !1) continue;
    a.destinations.some((u) => u.target === i && !u.blockKey) && t[a.source] && e.push(t[a.source]);
  }
  e.length > 0 && (this._documentName = e.join(" "));
};
I = function() {
  this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    sectionLookup: this._sectionLookup,
    config: this._config
  }, this._submitModal();
};
P = function() {
  this._rejectModal();
};
q = function() {
  switch (this._sourceType) {
    case "pdf":
      return n(this, o, O).call(this);
    case "markdown":
      return n(this, o, K).call(this);
    case "web":
      return n(this, o, F).call(this);
    case "doc":
      return n(this, o, W).call(this);
    default:
      return E;
  }
};
O = function() {
  return s`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${n(this, o, $)}>
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
						@change=${n(this, o, $)}>
					</umb-input-media>
					${n(this, o, z).call(this)}
				</div>
			</umb-property-layout>
		`;
};
F = function() {
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
W = function() {
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
C = function() {
  return Object.keys(this._sectionLookup).length > 0;
};
x = function(t) {
  t === "content" && !n(this, o, C).call(this) || (this._activeTab = t);
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
			</div>` : E;
};
j = function() {
  const t = n(this, o, C).call(this);
  return s`
			<uui-tab-group slot="navigation">
				<uui-tab
					label="Source"
					?active=${this._activeTab === "source"}
					orientation="horizontal"
					@click=${() => n(this, o, x).call(this, "source")}>
					<uui-icon slot="icon" name="icon-page-add"></uui-icon>
					Source
				</uui-tab>
				<uui-tab
					label="Content"
					?active=${this._activeTab === "content"}
					orientation="horizontal"
					?disabled=${!t}
					@click=${() => n(this, o, x).call(this, "content")}>
					<uui-icon slot="icon" name="icon-edit"></uui-icon>
					Content
				</uui-tab>
				<uui-tab
					label="Destination"
					?active=${this._activeTab === "destination"}
					orientation="horizontal"
					@click=${() => n(this, o, x).call(this, "destination")}>
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
      name: pt[t] || t,
      value: t,
      selected: this._sourceType === t
    }))
  ]}
										@change=${n(this, o, D)}>
									</uui-select>
								</div>
							</umb-property-layout>

							${n(this, o, q).call(this)}
						`}
			</uui-box>
		`;
};
B = function() {
  if (!this._config?.map?.mappings?.length || !this._config?.destination) return [];
  const t = this._config.destination, i = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  for (const p of this._config.map.mappings) {
    if (p.enabled === !1) continue;
    const v = this._sectionLookup[p.source];
    if (v)
      for (const b of p.destinations) {
        const f = b.blockKey ? `${b.blockKey}:${b.target}` : b.target, m = i.get(f) ?? [];
        m.push(v), i.set(f, m), e.has(f) || e.set(f, { alias: b.target, blockKey: b.blockKey });
      }
  }
  const a = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const [p, v] of i.entries()) {
    const b = e.get(p), f = b?.alias ?? p, m = b?.blockKey, T = et(
      { target: f, blockKey: m },
      t
    ) ?? "other";
    a.has(T) || a.set(T, []);
    let k = f;
    if (m && t.blockGrids)
      for (const _ of t.blockGrids) {
        const y = _.blocks.find((g) => g.key === m);
        if (y) {
          const g = y.properties?.find((V) => V.alias === f);
          g && (k = g.label || g.alias);
          break;
        }
      }
    else {
      const _ = t.fields.find((y) => y.alias === f);
      _ && (k = _.label);
    }
    a.get(T).push({
      label: k,
      value: v.join(" "),
      blockLabel: m ? it(m, t) ?? void 0 : void 0
    });
  }
  const u = ot(t), l = [];
  for (const p of u) {
    const v = a.get(p.id);
    v?.length && (r.set(p.id, p.label), l.push({ tabId: p.id, tabLabel: p.label, items: v }));
  }
  const S = a.get("other");
  return S?.length && l.push({ tabId: "other", tabLabel: "Other", items: S }), l;
};
w = function(t, i) {
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
      const a = e.blockLabel ?? "Other", r = i.get(a) ?? [];
      r.push(e), i.set(a, r);
    }
    return s`
				${Array.from(i.entries()).map(([e, a]) => s`
					<div class="block-group-header">
						<umb-icon name="icon-box"></umb-icon>
						<span>${e}</span>
					</div>
					${a.map((r) => n(this, o, w).call(this, r.label, r.value))}
				`)}
			`;
  }
  return s`
			${t.items.map((i) => n(this, o, w).call(this, i.label, i.value))}
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
c.styles = [
  rt,
  at`
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
], c.prototype, "_activeTab", 2);
d([
  h()
], c.prototype, "_documentName", 2);
d([
  h()
], c.prototype, "_sourceType", 2);
d([
  h()
], c.prototype, "_sourceUrl", 2);
d([
  h()
], c.prototype, "_selectedMediaUnique", 2);
d([
  h()
], c.prototype, "_sectionLookup", 2);
d([
  h()
], c.prototype, "_config", 2);
d([
  h()
], c.prototype, "_isExtracting", 2);
d([
  h()
], c.prototype, "_extractionError", 2);
d([
  h()
], c.prototype, "_contentActiveTab", 2);
d([
  h()
], c.prototype, "_availableSourceTypes", 2);
d([
  h()
], c.prototype, "_loadingSourceTypes", 2);
c = d([
  nt("up-doc-modal")
], c);
const _t = c;
export {
  c as UpDocModalElement,
  _t as default
};
//# sourceMappingURL=up-doc-modal.element-B7KsRAIN.js.map
