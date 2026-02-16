import { d as ze, g as Z, b as ke, h as Ce, i as Me, j as Pe, k as Se, l as Ee, s as De, m as Te, n as Ie, o as Re, u as Ae } from "./workflow.service-vjpy4ykG.js";
import { n as W, m as Ne } from "./transforms-deUehta3.js";
import { UmbModalToken as N, UMB_MODAL_MANAGER_CONTEXT as z } from "@umbraco-cms/backoffice/modal";
import { U as Oe } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as c, nothing as h, css as Le, state as f, customElement as Ue } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Ve } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Be } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as G } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as He } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as Fe } from "@umbraco-cms/backoffice/media";
const Ke = new N("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
}), Ze = new N(
  "UpDoc.ZoneEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "full"
    }
  }
), We = new N(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var Ge = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, X = (e) => {
  throw TypeError(e);
}, g = (e, t, i, a) => {
  for (var n = a > 1 ? void 0 : a ? Xe(t, i) : t, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (n = (a ? r(t, i, n) : r(n)) || n);
  return a && n && Ge(t, i, n), n;
}, O = (e, t, i) => t.has(e) || X("Cannot " + i), v = (e, t, i) => (O(e, t, "read from private field"), i ? i.call(e) : t.get(e)), K = (e, t, i) => t.has(e) ? X("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), je = (e, t, i, a) => (O(e, t, "write to private field"), t.set(e, i), i), o = (e, t, i) => (O(e, t, "access private method"), i), _, s, j, $, x, L, q, J, M, Q, Y, k, U, y, P, ee, te, D, T, ie, ae, se, oe, ne, le, V, B, C, w, re, I, R, E, ce, ue, S, H, F, pe, de, he, ge, fe, me, _e, ve, be, A, xe, $e, we;
let d = class extends Ve {
  constructor() {
    super(...arguments), K(this, s), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._zoneTemplate = null, this._sectionPickerOpen = !1, K(this, _, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(He, (e) => {
      e && (e.setSaveHandler(() => o(this, s, V).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, s, j).call(this));
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
				${e ? o(this, s, _e).call(this) : h}
				${e && this._viewMode === "elements" ? o(this, s, ve).call(this) : h}
				${this._successMessage ? c`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : h}
				${e ? o(this, s, be).call(this) : o(this, s, we).call(this)}
			</umb-body-layout>
		`;
  }
};
_ = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
j = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(G);
      je(this, _, await e.getLatestToken());
      const [t, i, a, n, l, r] = await Promise.all([
        ze(this._workflowName, v(this, _)),
        Z(this._workflowName, v(this, _)),
        ke(this._workflowName, v(this, _)),
        Ce(this._workflowName, v(this, _)),
        Me(this._workflowName, v(this, _)),
        Pe(this._workflowName, v(this, _))
      ]);
      this._extraction = t, this._zoneDetection = i, this._config = a, this._transformResult = n, this._sourceConfig = l, this._zoneTemplate = r, l?.pages && Array.isArray(l.pages) && l.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, s, x).call(this, l.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
$ = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.split(",")) {
    const a = i.trim();
    if (!a) continue;
    const n = a.split("-").map((l) => parseInt(l.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      t.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let l = n[0]; l <= n[1]; l++)
        t.add(l);
  }
  return [...t].sort((i, a) => i - a);
};
x = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((l, r) => l - r), i = [];
  let a = t[0], n = t[0];
  for (let l = 1; l < t.length; l++)
    t[l] === n + 1 || (i.push(a === n ? `${a}` : `${a}-${n}`), a = t[l]), n = t[l];
  return i.push(a === n ? `${a}` : `${a}-${n}`), i.join(", ");
};
L = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, s, $).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
q = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, s, $).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
J = function(e) {
  const t = this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t !== 0) {
    if (this._pageMode === "all") {
      const a = Array.from({ length: t }, (n, l) => l + 1).filter((n) => n !== e);
      this._pageMode = "custom", this._pageInputValue = o(this, s, x).call(this, a);
    } else {
      const i = o(this, s, $).call(this, this._pageInputValue);
      if (i.includes(e)) {
        const a = i.filter((n) => n !== e);
        this._pageInputValue = o(this, s, x).call(this, a), a.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const a = [...i, e].sort((n, l) => n - l);
        this._pageInputValue = o(this, s, x).call(this, a);
      }
      o(this, s, $).call(this, this._pageInputValue).length === t && (this._pageMode = "all", this._pageInputValue = "");
    }
    o(this, s, k).call(this);
  }
};
M = async function(e) {
  this._pageMode = e, e === "all" && (this._pageInputValue = ""), await o(this, s, k).call(this);
};
Q = async function(e) {
  const t = e.target;
  this._pageInputValue = t.value;
};
Y = async function() {
  const e = o(this, s, $).call(this, this._pageInputValue);
  e.length > 0 ? (this._pageInputValue = o(this, s, x).call(this, e), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await o(this, s, k).call(this);
};
k = async function() {
  if (!this._workflowName) return;
  const e = o(this, s, L).call(this);
  await Ie(this._workflowName, e, v(this, _));
};
U = function(e) {
  if (!this._zoneDetection) return [];
  const t = [];
  for (const i of this._zoneDetection.pages) {
    const a = i.page;
    e === "pages" && t.push(`page-${a}`), e === "areas" && (i.zones.forEach((n, l) => t.push(`area-p${a}-a${l}`)), i.unzonedContent && t.push(`area-p${a}-undefined`)), e === "sections" && (i.zones.forEach((n, l) => {
      n.sections.forEach((r, u) => t.push(`p${a}-a${l}-s${u}`));
    }), i.unzonedContent && i.unzonedContent.sections.forEach((n, l) => t.push(`p${a}-undefined-s${l}`)));
  }
  return t;
};
y = function(e) {
  const t = o(this, s, U).call(this, e);
  return t.length > 0 && t.every((i) => this._collapsed.has(i));
};
P = function(e) {
  const t = o(this, s, U).call(this, e), i = o(this, s, y).call(this, e), a = new Set(this._collapsed);
  for (const n of t)
    i ? a.delete(n) : a.add(n);
  this._collapsed = a;
};
ee = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
te = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
D = async function() {
  if (!this._workflowName) return;
  const i = await (await this.getContext(z)).open(this, Fe, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const a = i.selection[0];
  a && await o(this, s, B).call(this, a);
};
T = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(z)).open(this, Ze, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._zoneTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const i = await t.onSubmit();
    if (i?.template) {
      const a = await De(this._workflowName, i.template, v(this, _));
      a && (this._zoneTemplate = a, await o(this, s, V).call(this));
    }
  } catch {
  }
};
ie = function() {
  if (!this._transformResult || !this._zoneDetection) return [];
  const e = [];
  for (const t of this._transformResult.sections) {
    if (!t.included) continue;
    const i = o(this, s, ae).call(this, t);
    e.push({
      id: t.id,
      heading: t.heading ?? "Content",
      elements: i
    });
  }
  return e;
};
ae = function(e) {
  if (!this._zoneDetection) return [];
  for (const t of this._zoneDetection.pages) {
    if (t.page !== e.page) continue;
    const i = [...t.zones, ...t.unzonedContent ? [t.unzonedContent] : []];
    for (const a of i)
      for (const n of a.sections)
        if ((n.heading ? W(n.heading.text) : o(this, s, se).call(this, t.page, a, t)) === e.id) {
          const r = [];
          return n.heading && r.push(n.heading), r.push(...n.children), r;
        }
  }
  return [];
};
se = function(e, t, i) {
  const a = i.zones.indexOf(t);
  return a >= 0 ? `preamble-p${e}-z${a}` : `preamble-p${e}-unzoned`;
};
oe = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
ne = async function(e, t, i) {
  if (!this._workflowName) return;
  const a = this._sourceConfig?.sectionRules?.[e] ?? null, l = (await this.getContext(z)).open(this, We, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: i,
      existingRules: a
    }
  });
  try {
    const r = await l.onSubmit();
    if (r?.rules) {
      const u = {
        ...this._sourceConfig?.sectionRules ?? {}
      };
      r.rules.rules.length > 0 ? u[e] = r.rules : delete u[e];
      const m = await Te(this._workflowName, u, v(this, _));
      m && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, sectionRules: m });
    }
  } catch {
  }
};
le = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const i = o(this, s, L).call(this), l = await (await this.getContext(z)).open(this, Oe, {
    data: { mediaKey: e, totalPages: t, selectedPages: i }
  }).onSubmit().catch(() => null);
  l !== null && (l.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = o(this, s, x).call(this, l.selectedPages)), await o(this, s, k).call(this));
};
V = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, s, D).call(this);
  await o(this, s, B).call(this, e);
};
B = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(G)).getLatestToken(), [a, n] = await Promise.all([
        Se(this._workflowName, e, i),
        Ee(this._workflowName, e, i)
      ]);
      if (a && (this._extraction = a), n) {
        this._transformResult = n;
        const l = await Z(this._workflowName, i);
        this._zoneDetection = l;
        const r = n.diagnostics;
        this._successMessage = `Content extracted — ${r.totalSections} sections (${r.bulletListSections} bullet, ${r.paragraphSections} paragraph, ${r.subHeadedSections} sub-headed)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else a ? (this._successMessage = `Content extracted — ${a.elements.length} elements (transform unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Extraction failed", console.error("Extraction failed:", t);
    } finally {
      this._extracting = !1;
    }
  }
};
C = function(e) {
  return this._collapsed.has(e);
};
w = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
re = function(e) {
  return this._transformResult ? this._transformResult.sections.find((i) => i.id === e)?.included ?? !0 : !0;
};
I = async function(e, t) {
  if (!this._workflowName) return;
  const i = await Ae(this._workflowName, e, t, v(this, _));
  i && (this._transformResult = i);
};
R = async function(e) {
  if (!this._config?.destination || !this._workflowName) return;
  const a = await (await this.getContext(z)).open(this, Ke, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!a?.selectedTargets?.length) return;
  const n = [...this._config.map?.mappings ?? []], l = n.findIndex((p) => p.source === e), r = {
    source: e,
    destinations: a.selectedTargets.map((p) => ({ target: p.target, blockKey: p.blockKey })),
    enabled: !0
  };
  l >= 0 ? n[l] = r : n.push(r);
  const u = { ...this._config.map, version: this._config.map?.version ?? "1.0", mappings: n };
  await Re(this._workflowName, u, v(this, _)) && (this._config = { ...this._config, map: u });
};
E = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const i of this._config.map.mappings)
    if (i.source === e && i.enabled)
      for (const a of i.destinations)
        t.push(a);
  return t;
};
ce = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids) {
      const a = i.blocks.find((n) => n.key === e.blockKey);
      if (a) {
        const n = a.properties?.find((l) => l.alias === e.target);
        return `${a.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((i) => i.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids)
      for (const a of i.blocks) {
        const n = a.properties?.find((l) => l.alias === e.target);
        if (n) return `${a.label} > ${n.label || n.alias}`;
      }
  return e.target;
};
ue = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
S = function(e, t) {
  const i = t === "heading" ? "heading" : o(this, s, ue).call(this, e.text), a = i === "heading" ? "Heading" : i === "list" ? "List Item" : "Paragraph";
  return c`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${i}">${a}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? c`<span class="meta-badge text-case">UPPERCASE</span>` : h}
					</div>
				</div>
			</div>
		`;
};
H = function(e, t, i, a) {
  const n = o(this, s, C).call(this, t), l = e.heading ? W(e.heading.text) : a >= 0 ? `preamble-p${i}-z${a}` : `preamble-p${i}-unzoned`, r = o(this, s, re).call(this, l);
  if (!e.heading)
    return c`
				<div class="zone-section ${r ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, s, w).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="header-spacer"></span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${r ? "Included" : "Excluded"}"
							?checked=${r}
							@click=${(p) => p.stopPropagation()}
							@change=${(p) => o(this, s, I).call(this, l, p.target.checked)}>
						</uui-toggle>
					</div>
					${r && !n ? c`
						${e.children.map((p) => o(this, s, S).call(this, p))}
					` : h}
				</div>
			`;
  const u = e.heading, m = e.children.length + 1;
  return c`
			<div class="zone-section ${r ? "" : "excluded"}">
				<div class="section-heading" @click=${() => o(this, s, w).call(this, t)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="section-label">Section</span>
					<span class="section-separator">–</span>
					<span class="heading-text">${u.text}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${m} element${m !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${r ? "Included" : "Excluded"}"
						?checked=${r}
						@click=${(p) => p.stopPropagation()}
						@change=${(p) => o(this, s, I).call(this, l, p.target.checked)}>
					</uui-toggle>
				</div>
				${!n && r ? c`
					<div class="section-children">
						${o(this, s, S).call(this, u, "heading")}
						${e.children.map((p) => o(this, s, S).call(this, p))}
					</div>
				` : h}
			</div>
		`;
};
F = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
pe = function(e, t, i) {
  const a = `area-p${t}-a${i}`, n = o(this, s, C).call(this, a), l = !this._excludedAreas.has(a), r = e.sections.length;
  return c`
			<div class="zone-area ${l ? "" : "area-excluded"}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => o(this, s, w).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e.name || `Area ${i + 1}`}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(u) => u.stopPropagation()}
						@change=${() => o(this, s, F).call(this, a)}>
					</uui-toggle>
				</div>
				${n ? h : c`
					${e.sections.map(
    (u, m) => o(this, s, H).call(this, u, `p${t}-a${i}-s${m}`, t, i)
  )}
				`}
			</div>
		`;
};
de = function(e, t) {
  if (e.totalElements === 0) return h;
  const i = `area-p${t}-undefined`, a = o(this, s, C).call(this, i), n = !this._excludedAreas.has(i), l = e.sections.length;
  return c`
			<div class="zone-area undefined ${n ? "" : "area-excluded"}" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => o(this, s, w).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${a ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name undefined-name">Undefined</span>
					<span class="header-spacer"></span>
					<span class="group-count">${l} section${l !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${n ? "Included" : "Excluded"}"
						?checked=${n}
						@click=${(r) => r.stopPropagation()}
						@change=${() => o(this, s, F).call(this, i)}>
					</uui-toggle>
				</div>
				${a ? h : c`
					${e.sections.map(
    (r, u) => o(this, s, H).call(this, r, `p${t}-undefined-s${u}`, t, -1)
  )}
				`}
			</div>
		`;
};
he = function(e, t, i) {
  const a = `page-${e}`, n = o(this, s, C).call(this, a), l = i && i.totalElements > 0, r = t.length + (l ? 1 : 0), u = t.reduce((p, b) => p + b.sections.length, 0) + (i?.sections.length ?? 0), m = o(this, s, q).call(this, e);
  return c`
			<uui-box class="page-box ${m ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => o(this, s, w).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${u} section${u !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${m ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${m}
						@click=${(p) => p.stopPropagation()}
						@change=${() => o(this, s, J).call(this, e)}>
					</uui-toggle>
				</div>
				${n ? h : c`
					${t.map((p, b) => o(this, s, pe).call(this, p, e, b))}
					${l ? o(this, s, de).call(this, i, e) : h}
				`}
			</uui-box>
		`;
};
ge = function() {
  return this._zoneDetection ? c`
			${this._zoneDetection.pages.map(
    (e) => o(this, s, he).call(this, e.page, e.zones, e.unzonedContent)
  )}
		` : h;
};
fe = function() {
  return this._zoneDetection ? this._zoneDetection.pages.reduce((e, t) => e + t.zones.reduce((i, a) => i + a.sections.length, 0) + (t.unzonedContent?.sections.length ?? 0), 0) : 0;
};
me = function() {
  return (this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0) === 0 ? h : c`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === "all"}
					@change=${() => o(this, s, M).call(this, "all")} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === "custom"}
					@change=${() => o(this, s, M).call(this, "custom")} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${o(this, s, Q)}
				@blur=${o(this, s, Y)}
				@focus=${() => {
    this._pageMode === "all" && o(this, s, M).call(this, "custom");
  }}
				?disabled=${this._pageMode === "all"} />
		`;
};
_e = function() {
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
ve = function() {
  const e = this._zoneDetection !== null, t = this._extraction !== null;
  if (!e && !t) return h;
  const i = this._zoneDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), a = e ? this._zoneDetection.pages.length : i, l = a < i ? `${a} of ${i}` : `${i}`, r = e ? this._zoneDetection.diagnostics.zonesDetected : 0, u = e ? o(this, s, fe).call(this) : 0, m = t ? this._extraction.source.fileName : "", p = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return c`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${m}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${p}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, s, D)} ?disabled=${this._extracting}>
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
							${o(this, s, me).call(this)}
						</div>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${o(this, s, le)}>
								<uui-icon name="icon-thumbnails-small"></uui-icon>
								Choose Pages
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${this._zoneTemplate ? this._zoneTemplate.zones.length : r}</span>
						<div class="box-buttons">
							${this._zoneTemplate ? c`<uui-button look="primary" color="positive" label="Edit Areas" @click=${o(this, s, T)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : c`<uui-button look="primary" color="positive" label="Define Areas" @click=${o(this, s, T)}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${u}</span>
						${this._transformResult && this._zoneDetection ? c`
							<div class="box-buttons">
								<uui-button
									look="primary"
									color="positive"
									label="Edit Sections"
									popovertarget="section-picker-popover">
									<uui-icon name="icon-settings"></uui-icon>
									Edit Sections
									<uui-symbol-expand .open=${this._sectionPickerOpen}></uui-symbol-expand>
								</uui-button>
								<uui-popover-container
									id="section-picker-popover"
									placement="bottom-end"
									@toggle=${o(this, s, oe)}>
									<umb-popover-layout>
										${o(this, s, ie).call(this).map((b) => {
    const ye = !!this._sourceConfig?.sectionRules?.[b.id]?.rules?.length;
    return c`
												<uui-menu-item
													label="${b.heading}"
													@click=${() => o(this, s, ne).call(this, b.id, b.heading, b.elements)}>
													<uui-icon slot="icon" name="${ye ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
													<span slot="badge" class="section-picker-meta">${b.elements.length} el</span>
												</uui-menu-item>
											`;
  })}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : h}
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
						@toggle=${o(this, s, te)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, s, ee).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, y).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, s, P).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, y).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, s, P).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, y).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, s, P).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : h}
		`;
};
be = function() {
  const e = this._zoneDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, s, ge).call(this) : h : o(this, s, $e).call(this);
};
A = function(e) {
  const t = o(this, s, E).call(this, e);
  return t.length === 0 ? c`<uui-button look="secondary" compact label="Map" @click=${() => o(this, s, R).call(this, e)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : c`${t.map(
    (i) => c`<span class="meta-badge mapped-target" @click=${() => o(this, s, R).call(this, e)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${o(this, s, ce).call(this, i)}
			</span>`
  )}`;
};
xe = function(e) {
  const t = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, i = `${e.id}.heading`, a = `${e.id}.content`, n = o(this, s, E).call(this, i).length > 0, l = o(this, s, E).call(this, a).length > 0, r = n || l, u = e.heading ?? "Content";
  return c`
			<uui-box headline=${u} class="transformed-section ${r ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${e.pattern}">${t[e.pattern] ?? e.pattern}</span>
					<span class="meta-badge">p${e.page}</span>
					${e.zoneColor ? c`<span class="area-color-swatch" style="background: ${e.zoneColor};"></span>` : h}
					<span class="meta-badge">${e.childCount} item${e.childCount !== 1 ? "s" : ""}</span>
					${e.heading ? o(this, s, A).call(this, i) : h}
				</div>
				<div class="transformed-content" .innerHTML=${Ne(e.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${o(this, s, A).call(this, a)}
				</div>
			</uui-box>
		`;
};
$e = function() {
  if (!this._transformResult)
    return c`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = this._transformResult.sections.filter((i) => i.included), t = this._transformResult.sections.length;
  return c`
			${e.map((i) => o(this, s, xe).call(this, i))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? c`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : h}
			</div>
		`;
};
we = function() {
  return c`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${o(this, s, D)} ?disabled=${this._extracting}>
					${this._extracting ? c`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
d.styles = [
  Be,
  Le`
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

			/* Tree-style header for page boxes */
			.tree-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				cursor: pointer;
			}

			.tree-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.page-title {
				font-size: var(--uui-type-default-size);
			}

			/* Consistent collapse chevron across all levels */
			.collapse-chevron {
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
				font-size: 12px;
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
				cursor: pointer;
			}

			.section-heading:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.section-heading:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.section-label {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				text-transform: uppercase;
				letter-spacing: 0.5px;
				font-weight: 500;
			}

			.section-separator {
				color: var(--uui-color-text-alt);
			}

			.heading-text {
				font-weight: 600;
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

			.meta-badge.text-type.heading {
				color: var(--uui-color-current);
			}

			.meta-badge.text-type.list {
				color: var(--uui-color-positive);
			}

			.meta-badge.font-size {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.meta-badge.text-case {
				font-weight: 500;
				text-transform: uppercase;
				font-size: 10px;
				letter-spacing: 0.5px;
				color: var(--uui-color-text-alt);
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

			/* Section picker popover */
			.section-picker-meta {
				font-size: 11px;
				font-family: monospace;
				color: var(--uui-color-text-alt);
			}
		`
];
g([
  f()
], d.prototype, "_extraction", 2);
g([
  f()
], d.prototype, "_zoneDetection", 2);
g([
  f()
], d.prototype, "_config", 2);
g([
  f()
], d.prototype, "_workflowName", 2);
g([
  f()
], d.prototype, "_loading", 2);
g([
  f()
], d.prototype, "_extracting", 2);
g([
  f()
], d.prototype, "_error", 2);
g([
  f()
], d.prototype, "_successMessage", 2);
g([
  f()
], d.prototype, "_collapsed", 2);
g([
  f()
], d.prototype, "_transformResult", 2);
g([
  f()
], d.prototype, "_viewMode", 2);
g([
  f()
], d.prototype, "_sourceConfig", 2);
g([
  f()
], d.prototype, "_pageMode", 2);
g([
  f()
], d.prototype, "_pageInputValue", 2);
g([
  f()
], d.prototype, "_collapsePopoverOpen", 2);
g([
  f()
], d.prototype, "_excludedAreas", 2);
g([
  f()
], d.prototype, "_zoneTemplate", 2);
g([
  f()
], d.prototype, "_sectionPickerOpen", 2);
d = g([
  Ue("up-doc-workflow-source-view")
], d);
const nt = d;
export {
  d as UpDocWorkflowSourceViewElement,
  nt as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-8r92oT2y.js.map
