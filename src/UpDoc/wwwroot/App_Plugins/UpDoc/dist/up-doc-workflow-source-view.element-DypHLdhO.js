import { d as me, g as F, b as ve, h as _e, i as be, j as xe, k as $e, l as we, s as ye, m as ze, n as ke, u as Ce } from "./workflow.service-T0TEyrPt.js";
import { m as Me, n as Pe } from "./transforms-deUehta3.js";
import { UmbModalToken as Z, UMB_MODAL_MANAGER_CONTEXT as N } from "@umbraco-cms/backoffice/modal";
import { html as c, nothing as h, css as Ee, state as f, customElement as Se } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as De } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Te } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as K } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Ie } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as Ae } from "@umbraco-cms/backoffice/media";
const Ne = new Z("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
}), Re = new Z(
  "UpDoc.ZoneEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "full"
    }
  }
);
var Le = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, W = (e) => {
  throw TypeError(e);
}, g = (e, t, a, s) => {
  for (var n = s > 1 ? void 0 : s ? Ve(t, a) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (n = (s ? r(t, a, n) : r(n)) || n);
  return s && n && Le(t, a, n), n;
}, R = (e, t, a) => t.has(e) || W("Cannot " + a), _ = (e, t, a) => (R(e, t, "read from private field"), a ? a.call(e) : t.get(e)), B = (e, t, a) => t.has(e) ? W("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), Oe = (e, t, a, s) => (R(e, t, "write to private field"), t.set(e, a), a), o = (e, t, a) => (R(e, t, "access private method"), a), m, i, G, x, b, X, j, q, z, J, Q, M, L, w, k, Y, ee, P, S, V, O, y, $, te, D, T, C, ae, ie, I, U, H, se, oe, ne, le, re, ce, ue, pe, de, A, he, ge, fe;
let p = class extends De {
  constructor() {
    super(...arguments), B(this, i), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._zoneTemplate = null, B(this, m, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Ie, (e) => {
      e && (e.setSaveHandler(() => o(this, i, V).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, i, G).call(this));
      }));
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
				${e ? o(this, i, ue).call(this) : h}
				${e && this._viewMode === "elements" ? o(this, i, pe).call(this) : h}
				${this._successMessage ? c`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : h}
				${e ? o(this, i, de).call(this) : o(this, i, fe).call(this)}
			</umb-body-layout>
		`;
  }
};
m = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
G = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(K);
      Oe(this, m, await e.getLatestToken());
      const [t, a, s, n, l, r] = await Promise.all([
        me(this._workflowName, _(this, m)),
        F(this._workflowName, _(this, m)),
        ve(this._workflowName, _(this, m)),
        _e(this._workflowName, _(this, m)),
        be(this._workflowName, _(this, m)),
        xe(this._workflowName, _(this, m))
      ]);
      this._extraction = t, this._zoneDetection = a, this._config = s, this._transformResult = n, this._sourceConfig = l, this._zoneTemplate = r, l?.pages && Array.isArray(l.pages) && l.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, i, b).call(this, l.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
x = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e.split(",")) {
    const s = a.trim();
    if (!s) continue;
    const n = s.split("-").map((l) => parseInt(l.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      t.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let l = n[0]; l <= n[1]; l++)
        t.add(l);
  }
  return [...t].sort((a, s) => a - s);
};
b = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((l, r) => l - r), a = [];
  let s = t[0], n = t[0];
  for (let l = 1; l < t.length; l++)
    t[l] === n + 1 || (a.push(s === n ? `${s}` : `${s}-${n}`), s = t[l]), n = t[l];
  return a.push(s === n ? `${s}` : `${s}-${n}`), a.join(", ");
};
X = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, i, x).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
j = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, i, x).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
q = function(e) {
  const t = this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t !== 0) {
    if (this._pageMode === "all") {
      const s = Array.from({ length: t }, (n, l) => l + 1).filter((n) => n !== e);
      this._pageMode = "custom", this._pageInputValue = o(this, i, b).call(this, s);
    } else {
      const a = o(this, i, x).call(this, this._pageInputValue);
      if (a.includes(e)) {
        const s = a.filter((n) => n !== e);
        this._pageInputValue = o(this, i, b).call(this, s), s.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const s = [...a, e].sort((n, l) => n - l);
        this._pageInputValue = o(this, i, b).call(this, s);
      }
      o(this, i, x).call(this, this._pageInputValue).length === t && (this._pageMode = "all", this._pageInputValue = "");
    }
    o(this, i, M).call(this);
  }
};
z = async function(e) {
  this._pageMode = e, e === "all" && (this._pageInputValue = ""), await o(this, i, M).call(this);
};
J = async function(e) {
  const t = e.target;
  this._pageInputValue = t.value;
};
Q = async function() {
  const e = o(this, i, x).call(this, this._pageInputValue);
  e.length > 0 ? (this._pageInputValue = o(this, i, b).call(this, e), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await o(this, i, M).call(this);
};
M = async function() {
  if (!this._workflowName) return;
  const e = o(this, i, X).call(this);
  await ze(this._workflowName, e, _(this, m));
};
L = function(e) {
  if (!this._zoneDetection) return [];
  const t = [];
  for (const a of this._zoneDetection.pages) {
    const s = a.page;
    e === "pages" && t.push(`page-${s}`), e === "areas" && (a.zones.forEach((n, l) => t.push(`area-p${s}-a${l}`)), a.unzonedContent && t.push(`area-p${s}-undefined`)), e === "sections" && (a.zones.forEach((n, l) => {
      n.sections.forEach((r, u) => t.push(`p${s}-a${l}-s${u}`));
    }), a.unzonedContent && a.unzonedContent.sections.forEach((n, l) => t.push(`p${s}-undefined-s${l}`)));
  }
  return t;
};
w = function(e) {
  const t = o(this, i, L).call(this, e);
  return t.length > 0 && t.every((a) => this._collapsed.has(a));
};
k = function(e) {
  const t = o(this, i, L).call(this, e), a = o(this, i, w).call(this, e), s = new Set(this._collapsed);
  for (const n of t)
    a ? s.delete(n) : s.add(n);
  this._collapsed = s;
};
Y = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
ee = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
P = async function() {
  if (!this._workflowName) return;
  const a = await (await this.getContext(N)).open(this, Ae, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const s = a.selection[0];
  s && await o(this, i, O).call(this, s);
};
S = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(N)).open(this, Re, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._zoneTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const a = await t.onSubmit();
    if (a?.template) {
      const s = await ye(this._workflowName, a.template, _(this, m));
      s && (this._zoneTemplate = s, await o(this, i, V).call(this));
    }
  } catch {
  }
};
V = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, i, P).call(this);
  await o(this, i, O).call(this, e);
};
O = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const a = await (await this.getContext(K)).getLatestToken(), [s, n] = await Promise.all([
        $e(this._workflowName, e, a),
        we(this._workflowName, e, a)
      ]);
      if (s && (this._extraction = s), n) {
        this._transformResult = n;
        const l = await F(this._workflowName, a);
        this._zoneDetection = l;
        const r = n.diagnostics;
        this._successMessage = `Content extracted — ${r.totalSections} sections (${r.bulletListSections} bullet, ${r.paragraphSections} paragraph, ${r.subHeadedSections} sub-headed)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else s ? (this._successMessage = `Content extracted — ${s.elements.length} elements (transform unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Extraction failed", console.error("Extraction failed:", t);
    } finally {
      this._extracting = !1;
    }
  }
};
y = function(e) {
  return this._collapsed.has(e);
};
$ = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
te = function(e) {
  return this._transformResult ? this._transformResult.sections.find((a) => a.id === e)?.included ?? !0 : !0;
};
D = async function(e, t) {
  if (!this._workflowName) return;
  const a = await Ce(this._workflowName, e, t, _(this, m));
  a && (this._transformResult = a);
};
T = async function(e) {
  if (!this._config?.destination || !this._workflowName) return;
  const s = await (await this.getContext(N)).open(this, Ne, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!s?.selectedTargets?.length) return;
  const n = [...this._config.map?.mappings ?? []], l = n.findIndex((v) => v.source === e), r = {
    source: e,
    destinations: s.selectedTargets.map((v) => ({ target: v.target, blockKey: v.blockKey })),
    enabled: !0
  };
  l >= 0 ? n[l] = r : n.push(r);
  const u = { ...this._config.map, version: this._config.map?.version ?? "1.0", mappings: n };
  await ke(this._workflowName, u, _(this, m)) && (this._config = { ...this._config, map: u });
};
C = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const a of this._config.map.mappings)
    if (a.source === e && a.enabled)
      for (const s of a.destinations)
        t.push(s);
  return t;
};
ae = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const s = a.blocks.find((n) => n.key === e.blockKey);
      if (s) {
        const n = s.properties?.find((l) => l.alias === e.target);
        return `${s.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((a) => a.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const s of a.blocks) {
        const n = s.properties?.find((l) => l.alias === e.target);
        if (n) return `${s.label} > ${n.label || n.alias}`;
      }
  return e.target;
};
ie = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
I = function(e) {
  const t = o(this, i, ie).call(this, e.text);
  return c`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${t}">${t === "list" ? "List" : "Paragraph"}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
					</div>
				</div>
			</div>
		`;
};
U = function(e, t, a, s) {
  const n = o(this, i, y).call(this, t), l = e.heading ? Pe(e.heading.text) : s >= 0 ? `preamble-p${a}-z${s}` : `preamble-p${a}-unzoned`, r = o(this, i, te).call(this, l);
  if (!e.heading)
    return c`
				<div class="zone-section ${r ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, i, $).call(this, t)}>
						<span class="heading-text preamble-label">Content</span>
						<span class="header-spacer"></span>
						<span class="group-count">${e.children.length} text${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${r ? "Included" : "Excluded"}"
							?checked=${r}
							@click=${(d) => d.stopPropagation()}
							@change=${(d) => o(this, i, D).call(this, l, d.target.checked)}>
						</uui-toggle>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
					${r && !n ? c`
						${e.children.map((d) => o(this, i, I).call(this, d))}
					` : h}
				</div>
			`;
  const u = e.heading;
  return c`
			<div class="zone-section ${r ? "" : "excluded"}">
				<div class="section-heading" @click=${() => o(this, i, $).call(this, t)}>
					<div class="heading-content">
						<div class="heading-text">${u.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${u.fontSize}pt</span>
							<span class="meta-badge font-name">${u.fontName}</span>
						</div>
					</div>
					<span class="group-count">${e.children.length} text${e.children.length !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${r ? "Included" : "Excluded"}"
						?checked=${r}
						@click=${(d) => d.stopPropagation()}
						@change=${(d) => o(this, i, D).call(this, l, d.target.checked)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${!n && r ? c`
					<div class="section-children">
						${e.children.map((d) => o(this, i, I).call(this, d))}
					</div>
				` : h}
			</div>
		`;
};
H = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
se = function(e, t, a) {
  const s = `area-p${t}-a${a}`, n = o(this, i, y).call(this, s), l = !this._excludedAreas.has(s), r = e.sections.length;
  return c`
			<div class="zone-area ${l ? "" : "area-excluded"}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => o(this, i, $).call(this, s)}>
					<span class="area-name">${e.name || `Area ${a + 1}`}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(u) => u.stopPropagation()}
						@change=${() => o(this, i, H).call(this, s)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${n ? h : c`
					${e.sections.map(
    (u, d) => o(this, i, U).call(this, u, `p${t}-a${a}-s${d}`, t, a)
  )}
				`}
			</div>
		`;
};
oe = function(e, t) {
  if (e.totalElements === 0) return h;
  const a = `area-p${t}-undefined`, s = o(this, i, y).call(this, a), n = !this._excludedAreas.has(a), l = e.sections.length;
  return c`
			<div class="zone-area undefined ${n ? "" : "area-excluded"}" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => o(this, i, $).call(this, a)}>
					<span class="area-name undefined-name">Undefined</span>
					<span class="header-spacer"></span>
					<span class="group-count">${l} section${l !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${n ? "Included" : "Excluded"}"
						?checked=${n}
						@click=${(r) => r.stopPropagation()}
						@change=${() => o(this, i, H).call(this, a)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${s ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${s ? h : c`
					${e.sections.map(
    (r, u) => o(this, i, U).call(this, r, `p${t}-undefined-s${u}`, t, -1)
  )}
				`}
			</div>
		`;
};
ne = function(e, t, a) {
  const s = `page-${e}`, n = o(this, i, y).call(this, s), l = a && a.totalElements > 0, r = t.length + (l ? 1 : 0), u = t.reduce((v, E) => v + E.sections.length, 0) + (a?.sections.length ?? 0), d = o(this, i, j).call(this, e);
  return c`
			<uui-box headline="Page ${e}" class="page-box ${d ? "" : "page-excluded"}">
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${u} section${u !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${d ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${d}
						@click=${(v) => v.stopPropagation()}
						@change=${() => o(this, i, q).call(this, e)}>
					</uui-toggle>
					<div class="collapse-trigger" @click=${() => o(this, i, $).call(this, s)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
				</div>
				${n ? h : c`
					${t.map((v, E) => o(this, i, se).call(this, v, e, E))}
					${l ? o(this, i, oe).call(this, a, e) : h}
				`}
			</uui-box>
		`;
};
le = function() {
  return this._zoneDetection ? c`
			${this._zoneDetection.pages.map(
    (e) => o(this, i, ne).call(this, e.page, e.zones, e.unzonedContent)
  )}
		` : h;
};
re = function() {
  return this._zoneDetection ? this._zoneDetection.pages.reduce((e, t) => e + t.zones.reduce((a, s) => a + s.sections.length, 0) + (t.unzonedContent?.sections.length ?? 0), 0) : 0;
};
ce = function() {
  return (this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0) === 0 ? h : c`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === "all"}
					@change=${() => o(this, i, z).call(this, "all")} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === "custom"}
					@change=${() => o(this, i, z).call(this, "custom")} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${o(this, i, J)}
				@blur=${o(this, i, Q)}
				@focus=${() => {
    this._pageMode === "all" && o(this, i, z).call(this, "custom");
  }}
				?disabled=${this._pageMode === "all"} />
		`;
};
ue = function() {
  return c`
			<div slot="header" class="source-header">
				<uui-tab-group dropdown-content-direction="vertical">
					<uui-tab label="Extracted" ?active=${this._viewMode === "elements"} @click=${() => {
    this._viewMode = "elements";
  }}>Extracted</uui-tab>
					<uui-tab label="Transformed" ?active=${this._viewMode === "transformed"} @click=${() => {
    this._viewMode = "transformed";
  }} ?disabled=${!this._transformResult}>Transformed</uui-tab>
				</uui-tab-group>
			</div>
		`;
};
pe = function() {
  const e = this._zoneDetection !== null, t = this._extraction !== null;
  if (!e && !t) return h;
  const a = this._zoneDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), s = e ? this._zoneDetection.pages.length : a, l = s < a ? `${s} of ${a}` : `${a}`, r = e ? this._zoneDetection.diagnostics.zonesDetected : 0, u = e ? o(this, i, re).call(this) : 0, d = t ? this._extraction.source.fileName : "", v = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return c`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${d}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${v}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, i, P)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${l}</span>
						<div class="page-selection">
							${o(this, i, ce).call(this)}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${this._zoneTemplate ? this._zoneTemplate.zones.length : r}</span>
						<div class="box-buttons">
							${this._zoneTemplate ? c`<uui-button look="primary" color="positive" label="Edit Areas" @click=${o(this, i, S)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : c`<uui-button look="primary" color="positive" label="Define Areas" @click=${o(this, i, S)}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${u}</span>
					</div>
				</uui-box>
			</div>

			${e ? c`
				<div class="collapse-row">
					<uui-button
						look="outline"
						compact
						label="Collapse"
						popovertarget="collapse-level-popover">
						Collapse
						<uui-symbol-expand .open=${this._collapsePopoverOpen}></uui-symbol-expand>
					</uui-button>
					<uui-popover-container
						id="collapse-level-popover"
						placement="bottom-start"
						@toggle=${o(this, i, ee)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, i, Y).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, i, w).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, i, k).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, i, w).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, i, k).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, i, w).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, i, k).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : h}
		`;
};
de = function() {
  const e = this._zoneDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, i, le).call(this) : h : o(this, i, ge).call(this);
};
A = function(e) {
  const t = o(this, i, C).call(this, e);
  return t.length === 0 ? c`<uui-button look="secondary" compact label="Map" @click=${() => o(this, i, T).call(this, e)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : c`${t.map(
    (a) => c`<span class="meta-badge mapped-target" @click=${() => o(this, i, T).call(this, e)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${o(this, i, ae).call(this, a)}
			</span>`
  )}`;
};
he = function(e) {
  const t = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, a = `${e.id}.heading`, s = `${e.id}.content`, n = o(this, i, C).call(this, a).length > 0, l = o(this, i, C).call(this, s).length > 0, r = n || l, u = e.heading ?? "Content";
  return c`
			<uui-box headline=${u} class="transformed-section ${r ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${e.pattern}">${t[e.pattern] ?? e.pattern}</span>
					<span class="meta-badge">p${e.page}</span>
					${e.zoneColor ? c`<span class="area-color-swatch" style="background: ${e.zoneColor};"></span>` : h}
					<span class="meta-badge">${e.childCount} item${e.childCount !== 1 ? "s" : ""}</span>
					${e.heading ? o(this, i, A).call(this, a) : h}
				</div>
				<div class="transformed-content" .innerHTML=${Me(e.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${o(this, i, A).call(this, s)}
				</div>
			</uui-box>
		`;
};
ge = function() {
  if (!this._transformResult)
    return c`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = this._transformResult.sections.filter((a) => a.included), t = this._transformResult.sections.length;
  return c`
			${e.map((a) => o(this, i, he).call(this, a))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? c`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : h}
			</div>
		`;
};
fe = function() {
  return c`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${o(this, i, P)} ?disabled=${this._extracting}>
					${this._extracting ? c`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
p.styles = [
  Te,
  Ee`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
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

			/* Header: tabs only */
			.source-header {
				display: flex;
				align-items: center;
				width: 100%;
			}

			.source-header uui-tab-group {
				flex: 1;
			}

			/* Info boxes row (uSync-inspired) */
			.info-boxes {
				display: flex;
				gap: var(--uui-size-space-4);
				flex-wrap: wrap;
				padding: var(--uui-size-space-4);
			}

			.info-box-item {
				flex-grow: 1;
			}

			.box-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: var(--uui-size-space-2);
			}

			.box-icon {
				font-size: 32px;
				color: var(--uui-color-text-alt);
			}

			.box-title {
				font-size: var(--uui-type-default-size);
				font-weight: 600;
				margin: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100%;
			}

			.box-subtitle {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.box-buttons {
				display: flex;
				gap: var(--uui-size-space-2);
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-stat {
				font-size: var(--uui-type-h3-size);
				font-weight: 700;
				color: var(--uui-color-text);
			}


			/* Collapse row below boxes */
			.collapse-row {
				display: flex;
				justify-content: flex-end;
				padding: 0 var(--uui-size-space-4) var(--uui-size-space-2);
			}

			/* Page selection (stacked inside box) */
			.page-selection {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
				font-size: var(--uui-type-small-size);
				margin-top: var(--uui-size-space-1);
			}

			.page-radio {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
				cursor: pointer;
				white-space: nowrap;
				color: var(--uui-color-text);
			}

			.page-radio input[type="radio"] {
				margin: 0;
				cursor: pointer;
			}

			.page-input {
				width: 100%;
				padding: 2px 8px;
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				font-family: inherit;
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.page-input:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			.page-input:disabled {
				opacity: 0.4;
				cursor: not-allowed;
			}

			/* Page box include toggle */
			.page-header-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.page-box.page-excluded {
				opacity: 0.4;
			}

			.header-spacer {
				flex: 1;
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			/* Consistent collapse chevron across all levels */
			.collapse-chevron {
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
				font-size: 12px;
			}

			.collapse-trigger {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				cursor: pointer;
			}

			.collapse-trigger:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			/* Zone areas (Level 2) */
			.zone-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-4) 0;
				margin-left: var(--uui-size-space-3);
			}

			.zone-area.undefined {
				opacity: 0.75;
			}

			.zone-area.area-excluded {
				opacity: 0.4;
			}

			.area-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
			}

			.area-header:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.area-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.area-color-swatch {
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 2px;
				border: 1px solid var(--uui-color-border);
			}

			.area-color-swatch.undefined-swatch {
				background: var(--uui-color-border-standalone);
			}

			.area-name {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.undefined-name {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Sections within areas (Level 3) */
			.zone-section {
				margin-left: var(--uui-size-space-3);
			}

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

			.section-heading:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.heading-content {
				flex: 1;
				min-width: 0;
			}

			.heading-text {
				font-weight: 600;
				margin-bottom: var(--uui-size-space-1);
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

			/* Excluded sections */
			.zone-section.excluded {
				opacity: 0.4;
			}

			.preamble-label {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Element items */
			.element-item {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.element-item:last-child {
				border-bottom: none;
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

			.meta-badge.text-type {
				font-weight: 500;
				text-transform: uppercase;
				font-size: 10px;
				letter-spacing: 0.5px;
			}

			.meta-badge.text-type.list {
				color: var(--uui-color-positive);
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

			/* Transformed sections */
			.transformed-section {
				margin: var(--uui-size-space-4);
			}

			.transformed-section.section-mapped {
				border-left: 3px solid var(--uui-color-positive);
			}

			.section-mapping-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
			}

			.mapping-label {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
				color: var(--uui-color-text-alt);
			}

			.transformed-header-badges {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.pattern-badge {
				font-size: 11px;
				padding: 1px 8px;
				border-radius: 10px;
				font-weight: 500;
			}

			.pattern-badge.bulletList {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
			}

			.pattern-badge.paragraph {
				background: var(--uui-color-warning-emphasis);
				color: var(--uui-color-warning-contrast);
			}

			.pattern-badge.subHeaded {
				background: var(--uui-color-default-emphasis);
				color: var(--uui-color-default-contrast);
			}

			.pattern-badge.preamble {
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
				border: 1px solid var(--uui-color-border);
			}

			.transformed-content {
				padding: var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				line-height: 1.6;
			}

			.transformed-content ul,
			.transformed-content ol {
				padding-left: var(--uui-size-space-5);
				margin: var(--uui-size-space-2) 0;
			}

			.transformed-content p {
				margin: var(--uui-size-space-2) 0;
			}

			.transformed-content h2 {
				font-size: var(--uui-type-default-size);
				margin: var(--uui-size-space-3) 0 var(--uui-size-space-2);
			}
		`
];
g([
  f()
], p.prototype, "_extraction", 2);
g([
  f()
], p.prototype, "_zoneDetection", 2);
g([
  f()
], p.prototype, "_config", 2);
g([
  f()
], p.prototype, "_workflowName", 2);
g([
  f()
], p.prototype, "_loading", 2);
g([
  f()
], p.prototype, "_extracting", 2);
g([
  f()
], p.prototype, "_error", 2);
g([
  f()
], p.prototype, "_successMessage", 2);
g([
  f()
], p.prototype, "_collapsed", 2);
g([
  f()
], p.prototype, "_transformResult", 2);
g([
  f()
], p.prototype, "_viewMode", 2);
g([
  f()
], p.prototype, "_sourceConfig", 2);
g([
  f()
], p.prototype, "_pageMode", 2);
g([
  f()
], p.prototype, "_pageInputValue", 2);
g([
  f()
], p.prototype, "_collapsePopoverOpen", 2);
g([
  f()
], p.prototype, "_excludedAreas", 2);
g([
  f()
], p.prototype, "_zoneTemplate", 2);
p = g([
  Se("up-doc-workflow-source-view")
], p);
const je = p;
export {
  p as UpDocWorkflowSourceViewElement,
  je as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-DypHLdhO.js.map
