import { c as B, d as F, b as G, t as K, g as V, s as X } from "./workflow.service-DJ0lDdZu.js";
import { html as c, nothing as f, css as H, state as m, customElement as q } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as J } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Q } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as S } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Y } from "@umbraco-cms/backoffice/workspace";
import { UmbModalToken as j, UMB_MODAL_MANAGER_CONTEXT as C } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as ee } from "@umbraco-cms/backoffice/media";
const te = new j("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var ae = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, T = (e) => {
  throw TypeError(e);
}, h = (e, t, a, i) => {
  for (var s = i > 1 ? void 0 : i ? ie(t, a) : t, r = e.length - 1, u; r >= 0; r--)
    (u = e[r]) && (s = (i ? u(t, a, s) : u(s)) || s);
  return i && s && ae(t, a, s), s;
}, y = (e, t, a) => t.has(e) || T("Cannot " + a), v = (e, t, a) => (y(e, t, "read from private field"), a ? a.call(e) : t.get(e)), M = (e, t, a) => t.has(e) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), se = (e, t, a, i) => (y(e, t, "write to private field"), t.set(e, a), a), n = (e, t, a) => (y(e, t, "access private method"), a), g, o, U, $, _, N, z, P, A, k, E, w, D, O, Z, L, W, I, R;
let d = class extends J {
  constructor() {
    super(...arguments), M(this, o), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._selectedElements = /* @__PURE__ */ new Set(), this._collapsedSections = /* @__PURE__ */ new Set(), M(this, g, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Y, (e) => {
      e && this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), n(this, o, U).call(this));
      });
    });
  }
  render() {
    if (this._loading)
      return c`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return c`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
    const e = this._zoneDetection !== null || this._extraction !== null;
    return c`
			<umb-body-layout header-fit-height>
				${this._successMessage ? c`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : f}
				${e ? n(this, o, I).call(this) : n(this, o, R).call(this)}
			</umb-body-layout>
		`;
  }
};
g = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
U = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(S);
      se(this, g, await e.getLatestToken());
      const [t, a, i] = await Promise.all([
        B(this._workflowName, v(this, g)),
        F(this._workflowName, v(this, g)),
        G(this._workflowName, v(this, g))
      ]);
      this._extraction = t, this._zoneDetection = a, this._config = i;
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
$ = async function() {
  var s;
  if (!this._workflowName) return;
  const a = await (await this.getContext(C)).open(this, ee, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((s = a == null ? void 0 : a.selection) != null && s.length)) return;
  const i = a.selection[0];
  if (i) {
    this._extracting = !0, this._error = null;
    try {
      const u = await (await this.getContext(S)).getLatestToken(), [l, p] = await Promise.all([
        K(this._workflowName, i, u),
        V(this._workflowName, i, u)
      ]);
      if (l && (this._extraction = l), p) {
        this._zoneDetection = p;
        const b = p.diagnostics.elementsZoned + p.diagnostics.elementsUnzoned;
        this._successMessage = `Content extracted — ${p.diagnostics.zonesDetected} areas, ${b} elements`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else l ? (this._successMessage = `Content extracted — ${l.elements.length} elements (zone detection unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (r) {
      this._error = r instanceof Error ? r.message : "Extraction failed", console.error("Extraction failed:", r);
    } finally {
      this._extracting = !1;
    }
  }
};
_ = function(e) {
  const t = new Set(this._selectedElements);
  t.has(e) ? t.delete(e) : t.add(e), this._selectedElements = t;
};
N = function() {
  this._selectedElements = /* @__PURE__ */ new Set();
};
z = function(e) {
  const t = new Set(this._collapsedSections);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsedSections = t;
};
P = async function() {
  var p;
  if (!this._config || this._selectedElements.size === 0) return;
  const a = await (await this.getContext(C)).open(this, te, {
    data: {
      destination: this._config.destination
    }
  }).onSubmit().catch(() => null);
  if (!((p = a == null ? void 0 : a.selectedTargets) != null && p.length) || !this._workflowName) return;
  const s = [...this._config.map.mappings ?? []], r = this._selectedElements.size;
  for (const b of this._selectedElements)
    s.push({
      source: b,
      destinations: a.selectedTargets.map((x) => ({
        target: x.target,
        ...x.blockKey ? { blockKey: x.blockKey } : {}
      })),
      enabled: !0
    });
  const u = { ...this._config.map, mappings: s };
  await X(this._workflowName, u, v(this, g)) && (this._config = { ...this._config, map: u }, this._selectedElements = /* @__PURE__ */ new Set(), this._successMessage = `${r} mapping${r !== 1 ? "s" : ""} created`, setTimeout(() => {
    this._successMessage = null;
  }, 3e3));
};
A = function() {
  const e = this._selectedElements.size;
  return e === 0 ? f : c`
			<div class="selection-toolbar">
				<span class="selection-count">${e} selected</span>
				<uui-button look="primary" compact label="Map to..." @click=${n(this, o, P)}>
					<uui-icon name="icon-nodes"></uui-icon>
					Map to...
				</uui-button>
				<uui-button look="secondary" compact label="Clear" @click=${n(this, o, N)}>
					Clear
				</uui-button>
			</div>
		`;
};
k = function(e) {
  var a, i;
  if (!((i = (a = this._config) == null ? void 0 : a.map) != null && i.mappings)) return [];
  const t = [];
  for (const s of this._config.map.mappings)
    if (s.source === e && s.enabled)
      for (const r of s.destinations)
        t.push(r);
  return t;
};
E = function(e) {
  var a, i, s;
  if (!((a = this._config) != null && a.destination)) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const r of this._config.destination.blockGrids) {
      const u = r.blocks.find((l) => l.key === e.blockKey);
      if (u) {
        const l = (i = u.properties) == null ? void 0 : i.find((p) => p.alias === e.target);
        return `${u.label} > ${(l == null ? void 0 : l.label) || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((r) => r.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const r of this._config.destination.blockGrids)
      for (const u of r.blocks) {
        const l = (s = u.properties) == null ? void 0 : s.find((p) => p.alias === e.target);
        if (l) return `${u.label} > ${l.label || l.alias}`;
      }
  return e.target;
};
w = function(e) {
  const t = this._selectedElements.has(e.id), a = n(this, o, k).call(this, e.id), i = a.length > 0;
  return c`
			<div class="element-item ${t ? "element-selected" : ""} ${i ? "element-mapped" : ""}">
				<uui-checkbox
					label="Select for mapping"
					?checked=${t}
					@change=${() => n(this, o, _).call(this, e.id)}
					class="element-checkbox">
				</uui-checkbox>
				<div class="element-content" @click=${() => n(this, o, _).call(this, e.id)}>
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${a.map((s) => c`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${n(this, o, E).call(this, s)}</span>`)}
					</div>
				</div>
			</div>
		`;
};
D = function(e, t) {
  const a = this._collapsedSections.has(t);
  if (!e.heading)
    return c`
				<div class="zone-section">
					${e.children.map((l) => n(this, o, w).call(this, l))}
				</div>
			`;
  const i = e.heading, s = this._selectedElements.has(i.id), r = n(this, o, k).call(this, i.id), u = r.length > 0;
  return c`
			<div class="zone-section">
				<div class="section-heading ${s ? "element-selected" : ""} ${u ? "element-mapped" : ""}">
					<uui-checkbox
						label="Select ${i.text}"
						?checked=${s}
						@change=${() => n(this, o, _).call(this, i.id)}
						class="element-checkbox">
					</uui-checkbox>
					<div class="heading-content" @click=${() => n(this, o, z).call(this, t)}>
						<div class="heading-text">${i.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${i.fontSize}pt</span>
							<span class="meta-badge font-name">${i.fontName}</span>
							${r.map((l) => c`<span class="meta-badge mapped-target"><uui-icon name="icon-arrow-right" style="font-size: 10px;"></uui-icon> ${n(this, o, E).call(this, l)}</span>`)}
						</div>
					</div>
					<button class="collapse-toggle" @click=${() => n(this, o, z).call(this, t)} title="${a ? "Expand" : "Collapse"}">
						<uui-icon name="${a ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</button>
					<span class="group-count">${e.children.length} item${e.children.length !== 1 ? "s" : ""}</span>
				</div>
				${a ? f : c`
					<div class="section-children">
						${e.children.map((l) => n(this, o, w).call(this, l))}
					</div>
				`}
			</div>
		`;
};
O = function(e, t, a) {
  const i = e.totalElements;
  return c`
			<div class="zone-area" style="border-left-color: ${e.color};">
				<div class="area-header">
					<span class="area-color-swatch" style="background: ${e.color};"></span>
					<span class="area-element-count">${i} element${i !== 1 ? "s" : ""}</span>
				</div>
				${e.sections.map(
    (s, r) => n(this, o, D).call(this, s, `p${t}-a${a}-s${r}`)
  )}
			</div>
		`;
};
Z = function(e, t) {
  return e.totalElements === 0 ? f : c`
			<div class="zone-area unzoned" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header">
					<span class="area-color-swatch unzoned-swatch"></span>
					<span class="area-element-count">Unzoned — ${e.totalElements} element${e.totalElements !== 1 ? "s" : ""}</span>
				</div>
				${e.sections.map(
    (a, i) => n(this, o, D).call(this, a, `p${t}-unzoned-s${i}`)
  )}
			</div>
		`;
};
L = function(e, t, a) {
  return c`
			<uui-box headline="Page ${e}" class="page-box">
				${t.map((i, s) => n(this, o, O).call(this, i, e, s))}
				${a ? n(this, o, Z).call(this, a, e) : f}
			</uui-box>
		`;
};
W = function() {
  return this._zoneDetection ? c`
			${this._zoneDetection.pages.map(
    (e) => n(this, o, L).call(this, e.page, e.zones, e.unzonedContent)
  )}
			<div class="diagnostics">
				<span class="meta-badge">${this._zoneDetection.diagnostics.zonesDetected} areas</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsZoned} zoned</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsUnzoned} unzoned</span>
			</div>
		` : f;
};
I = function() {
  const e = this._zoneDetection !== null, t = this._extraction !== null;
  if (!e && !t) return f;
  const a = e ? this._zoneDetection.diagnostics.elementsZoned + this._zoneDetection.diagnostics.elementsUnzoned : this._extraction.elements.length;
  return c`
			<div class="extraction-header">
				${t ? c`
					<div class="extraction-info">
						<span class="info-label">Source:</span>
						<span>${this._extraction.source.fileName}</span>
					</div>
					<div class="extraction-info">
						<span class="info-label">Pages:</span>
						<span>${this._extraction.source.totalPages}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Elements:</span>
						<span>${a}</span>
						${e ? c`
							<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
							<span>${this._zoneDetection.diagnostics.zonesDetected}</span>
						` : f}
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Extracted:</span>
						<span>${new Date(this._extraction.source.extractedDate).toLocaleString()}</span>
					</div>
				` : c`
					<div class="extraction-info">
						<span class="info-label">Elements:</span>
						<span>${a}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
						<span>${this._zoneDetection.diagnostics.zonesDetected}</span>
					</div>
				`}
				<uui-button look="secondary" label="Re-extract" @click=${n(this, o, $)} ?disabled=${this._extracting}>
					<uui-icon name="icon-refresh"></uui-icon>
					Re-extract
				</uui-button>
			</div>

			${n(this, o, A).call(this)}
			${e ? n(this, o, W).call(this) : f}
		`;
};
R = function() {
  return c`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${n(this, o, $)} ?disabled=${this._extracting}>
					${this._extracting ? c`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
d.styles = [
  Q,
  H`
			:host {
				display: block;
				height: 100%;
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.success-banner {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-size: var(--uui-type-small-size);
			}

			/* Empty state */
			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: var(--uui-size-layout-2);
				gap: var(--uui-size-space-3);
				text-align: center;
				min-height: 300px;
			}

			.empty-state h3 {
				margin: 0;
				color: var(--uui-color-text);
			}

			.empty-state p {
				margin: 0;
				color: var(--uui-color-text-alt);
			}

			/* Extraction header */
			.extraction-header {
				padding: var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.extraction-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				font-size: var(--uui-type-small-size);
			}

			.info-label {
				font-weight: 600;
				color: var(--uui-color-text-alt);
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			/* Selection toolbar */
			.selection-toolbar {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-selected);
				border-bottom: 1px solid var(--uui-color-border);
				position: sticky;
				top: 0;
				z-index: 1;
			}

			.selection-count {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
			}

			/* Zone areas */
			.zone-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-3) 0;
				margin-left: var(--uui-size-space-2);
			}

			.zone-area.unzoned {
				opacity: 0.75;
			}

			.area-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.area-color-swatch {
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 2px;
				border: 1px solid var(--uui-color-border);
			}

			.area-color-swatch.unzoned-swatch {
				background: var(--uui-color-border-standalone);
			}

			.area-element-count {
				font-weight: 500;
			}

			/* Sections within areas */
			.zone-section + .zone-section {
				border-top: 1px solid var(--uui-color-border);
			}

			.section-heading {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.section-heading:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.section-heading.element-selected {
				background: var(--uui-color-selected);
			}

			.section-heading.element-mapped {
				border-left: 3px solid var(--uui-color-positive-standalone);
			}

			.heading-content {
				flex: 1;
				min-width: 0;
			}

			.heading-text {
				font-weight: 700;
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-1);
			}

			.collapse-toggle {
				background: none;
				border: none;
				cursor: pointer;
				padding: var(--uui-size-space-1);
				color: var(--uui-color-text-alt);
				display: flex;
				align-items: center;
			}

			.collapse-toggle:hover {
				color: var(--uui-color-text);
			}

			.group-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				white-space: nowrap;
			}

			.section-children {
				padding-left: var(--uui-size-space-5);
				border-left: 2px solid var(--uui-color-border);
				margin-left: var(--uui-size-space-4);
			}

			/* Element items */
			.element-item {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.element-item:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.element-item.element-selected {
				background: var(--uui-color-selected);
			}

			.element-item:last-child {
				border-bottom: none;
			}

			.element-item.element-mapped {
				border-left: 3px solid var(--uui-color-positive-standalone);
			}

			.element-checkbox {
				flex-shrink: 0;
				margin-top: 2px;
			}

			.element-content {
				flex: 1;
				min-width: 0;
			}

			.element-text {
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-2);
				word-break: break-word;
				white-space: pre-wrap;
			}

			.element-meta {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
			}

			.meta-badge {
				font-size: 11px;
				font-family: monospace;
				padding: 1px 6px;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}

			.meta-badge.font-size {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.meta-badge.mapped-target {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				display: inline-flex;
				align-items: center;
				gap: 3px;
			}

			.diagnostics {
				display: flex;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				justify-content: flex-end;
			}
		`
];
h([
  m()
], d.prototype, "_extraction", 2);
h([
  m()
], d.prototype, "_zoneDetection", 2);
h([
  m()
], d.prototype, "_config", 2);
h([
  m()
], d.prototype, "_workflowName", 2);
h([
  m()
], d.prototype, "_loading", 2);
h([
  m()
], d.prototype, "_extracting", 2);
h([
  m()
], d.prototype, "_error", 2);
h([
  m()
], d.prototype, "_successMessage", 2);
h([
  m()
], d.prototype, "_selectedElements", 2);
h([
  m()
], d.prototype, "_collapsedSections", 2);
d = h([
  q("up-doc-workflow-source-view")
], d);
const he = d;
export {
  d as UpDocWorkflowSourceViewElement,
  he as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-DZBzDU6F.js.map
