import { a as ye } from "./workflow.types-sXs8a86t.js";
import { d as it, b as at, g as st, h as T, i as D, j as ot, k as Z, l as V, s as ee, m as nt, n as rt, o as ke, u as lt, p as ct } from "./workflow.service-CWGlGq_3.js";
import { m as z, n as te } from "./transforms-BkZeboOX.js";
import { g as we } from "./destination-utils-DUfOJy5W.js";
import { UmbModalToken as ie, UMB_MODAL_MANAGER_CONTEXT as I } from "@umbraco-cms/backoffice/modal";
import { U as ut } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as l, nothing as d, unsafeHTML as C, css as dt, state as x, customElement as pt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as ht } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ft } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as ae } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as mt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as gt } from "@umbraco-cms/backoffice/media";
const bt = new ie(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), vt = new ie(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), xt = new ie("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "medium"
  }
});
var _t = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, ze = (e) => {
  throw TypeError(e);
}, v = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? wt(t, i) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (n = (o ? c(t, i, n) : c(n)) || n);
  return o && n && _t(t, i, n), n;
}, se = (e, t, i) => t.has(e) || ze("Cannot " + i), h = (e, t, i) => (se(e, t, "read from private field"), i ? i.call(e) : t.get(e)), $e = (e, t, i) => t.has(e) ? ze("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), $t = (e, t, i, o) => (se(e, t, "write to private field"), t.set(e, i), i), s = (e, t, i) => (se(e, t, "access private method"), i), b, a, w, Ce, oe, ne, re, Ae, Se, le, k, S, ce, ue, G, U, Me, Re, Pe, q, de, Ee, L, pe, N, M, Te, X, he, J, De, F, Ie, Ue, Le, Ne, Q, fe, Oe, me, A, Ke, Fe, ge, Y, Be, He, We, je, Ve, Ge, B, H, O, qe, Xe, Je, W, y, Qe, Ye, Ze, et, be, K, tt, R;
let m = class extends ht {
  constructor() {
    super(...arguments), $e(this, a), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowAlias = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, this._sampleUrl = "", $e(this, b, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(mt, (e) => {
      e && (e.setRefreshHandler(() => s(this, a, L).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowAlias = decodeURIComponent(t), s(this, a, Ce).call(this));
      }));
    });
  }
  render() {
    if (this._loading)
      return l`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return l`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
    h(this, a, w);
    const e = h(this, a, w) === "web", t = h(this, a, w) === "markdown", i = this._areaDetection !== null || this._extraction !== null;
    return t ? l`
				<umb-body-layout header-fit-height>
					${i ? s(this, a, O).call(this) : d}
					${i && this._viewMode === "elements" ? s(this, a, Qe).call(this) : d}
					${s(this, a, G).call(this)}
					${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : d}
					${i ? s(this, a, Ye).call(this) : s(this, a, K).call(this)}
				</umb-body-layout>
			` : e ? l`
				<umb-body-layout header-fit-height>
					${i ? s(this, a, O).call(this) : d}
					${i && this._viewMode === "elements" ? s(this, a, Ze).call(this) : d}
					${s(this, a, G).call(this)}
					${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : d}
					${i ? s(this, a, et).call(this) : s(this, a, K).call(this)}
				</umb-body-layout>
			` : l`
			<umb-body-layout header-fit-height>
				${i ? s(this, a, O).call(this) : d}
				${i && this._viewMode === "elements" ? s(this, a, qe).call(this) : d}
				${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : d}
				${i ? s(this, a, Xe).call(this) : s(this, a, K).call(this)}
			</umb-body-layout>
		`;
  }
};
b = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
w = function() {
  return this._sourceConfig?.sourceTypes?.[0] ?? "pdf";
};
Ce = async function() {
  if (this._workflowAlias) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(ae);
      $t(this, b, await e.getLatestToken());
      const [t, i, o] = await Promise.all([
        it(this._workflowAlias, h(this, b)),
        at(this._workflowAlias, h(this, b)),
        st(this._workflowAlias, h(this, b))
      ]);
      this._extraction = t, this._config = i, this._sourceConfig = o;
      const n = (o?.sourceTypes?.[0] ?? "pdf") === "pdf", r = o?.sourceTypes?.[0] === "web";
      if (n) {
        const [c, u, g] = await Promise.all([
          T(this._workflowAlias, h(this, b)),
          D(this._workflowAlias, h(this, b)),
          ot(this._workflowAlias, h(this, b))
        ]);
        this._areaDetection = c, this._transformResult = u, this._areaTemplate = g;
        const f = t?.source.mediaKey;
        if (f && c) {
          const p = await Z(this._workflowAlias, f, h(this, b));
          p && (this._transformResult = p);
        }
        o?.pages && Array.isArray(o.pages) && o.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = s(this, a, ne).call(this, o.pages)) : (this._pageMode = "all", this._pageInputValue = "");
      } else if (r) {
        const [c, u] = await Promise.all([
          T(this._workflowAlias, h(this, b)),
          D(this._workflowAlias, h(this, b))
        ]);
        this._areaDetection = c, this._transformResult = u;
      } else {
        const [c, u] = await Promise.all([
          T(this._workflowAlias, h(this, b)),
          D(this._workflowAlias, h(this, b))
        ]);
        this._areaDetection = c, this._transformResult = u;
      }
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
oe = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.split(",")) {
    const o = i.trim();
    if (!o) continue;
    const n = o.split("-").map((r) => parseInt(r.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      t.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let r = n[0]; r <= n[1]; r++)
        t.add(r);
  }
  return [...t].sort((i, o) => i - o);
};
ne = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, c) => r - c), i = [];
  let o = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (i.push(o === n ? `${o}` : `${o}-${n}`), o = t[r]), n = t[r];
  return i.push(o === n ? `${o}` : `${o}-${n}`), i.join(", ");
};
re = function() {
  if (this._pageMode === "all") return null;
  const e = s(this, a, oe).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
Ae = function(e) {
  if (this._pageMode === "all") return !0;
  const t = s(this, a, oe).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
Se = async function() {
  if (!this._workflowAlias) return;
  const e = s(this, a, re).call(this);
  await nt(this._workflowAlias, e, h(this, b));
};
le = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const i of this._areaDetection.pages) {
    const o = i.page;
    e === "pages" && t.push(`page-${o}`), e === "areas" && i.areas.forEach((n, r) => t.push(`area-p${o}-a${r}`)), e === "sections" && (i.areas.forEach((n, r) => {
      n.sections.forEach((c, u) => t.push(`p${o}-a${r}-s${u}`));
    }), i.areas.forEach((n) => {
      s(this, a, me).call(this, n, o).forEach((c) => t.push(`composed-${c.id}`));
    }));
  }
  return t;
};
k = function(e) {
  const t = s(this, a, le).call(this, e);
  return t.length > 0 && t.every((i) => this._collapsed.has(i));
};
S = function(e) {
  const t = s(this, a, le).call(this, e), i = s(this, a, k).call(this, e), o = new Set(this._collapsed);
  for (const n of t)
    i ? o.delete(n) : o.add(n);
  this._collapsed = o;
};
ce = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
ue = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
G = function() {
  return !this._areaDetection || this._viewMode !== "elements" ? d : l`
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
					@toggle=${s(this, a, ue)}>
					<umb-popover-layout>
						<uui-menu-item
							label="Expand All"
							@click=${() => s(this, a, ce).call(this)}>
							<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
						</uui-menu-item>
						<uui-menu-item
							label="${s(this, a, k).call(this, "areas") ? "Expand" : "Collapse"} Areas"
							@click=${() => s(this, a, S).call(this, "areas")}>
							<uui-icon slot="icon" name="icon-grid"></uui-icon>
						</uui-menu-item>
						<uui-menu-item
							label="${s(this, a, k).call(this, "sections") ? "Expand" : "Collapse"} Sections"
							@click=${() => s(this, a, S).call(this, "sections")}>
							<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
						</uui-menu-item>
					</umb-popover-layout>
				</uui-popover-container>
			</div>
		`;
};
U = async function() {
  if (!this._workflowAlias) return;
  const i = await (await this.getContext(I)).open(this, gt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const o = i.selection[0];
  o && await s(this, a, pe).call(this, o);
};
Me = async function() {
  if (!this._workflowAlias) return;
  const t = (await this.getContext(I)).open(this, bt, {
    data: {
      workflowAlias: this._workflowAlias,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const i = await t.onSubmit();
    if (i?.template) {
      const o = await ee(this._workflowAlias, i.template, h(this, b));
      o && (this._areaTemplate = o, await s(this, a, L).call(this));
    }
  } catch {
  }
};
Re = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const i of this._areaDetection.pages)
    for (const o of i.areas) {
      const n = o.name || "Area", r = te(n);
      if (t.has(r)) continue;
      t.add(r);
      const c = s(this, a, F).call(this, o), u = this._sourceConfig?.areaRules?.[r], g = !!u && ((u.groups?.length ?? 0) > 0 || (u.rules?.length ?? 0) > 0);
      e.push({ areaKey: r, areaName: n, elements: c, hasRules: g });
    }
  return e;
};
Pe = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
q = async function(e, t) {
  if (!this._workflowAlias) return;
  const i = {
    ...this._sourceConfig?.areaRules ?? {}
  };
  t.groups.length > 0 || t.rules.length > 0 ? i[e] = t : delete i[e];
  const n = await rt(this._workflowAlias, i, h(this, b));
  n && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: n });
  const r = this._extraction?.source.mediaKey;
  if (r) {
    const c = await Z(this._workflowAlias, r, h(this, b));
    c && (this._transformResult = c);
  }
};
de = async function(e, t, i) {
  if (!this._workflowAlias) return;
  const o = this._sourceConfig?.areaRules?.[e] ?? null, r = (await this.getContext(I)).open(this, vt, {
    data: {
      workflowAlias: this._workflowAlias,
      sectionId: e,
      sectionHeading: t,
      elements: i,
      existingRules: o,
      onSave: async (c) => {
        await s(this, a, q).call(this, e, c);
      }
    }
  });
  try {
    const c = await r.onSubmit();
    c?.rules && await s(this, a, q).call(this, e, c.rules);
  } catch {
  }
};
Ee = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const i = s(this, a, re).call(this), r = await (await this.getContext(I)).open(this, ut, {
    data: { mediaKey: e, totalPages: t, selectedPages: i }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = s(this, a, ne).call(this, r.selectedPages)), await s(this, a, Se).call(this));
};
L = async function() {
  if (h(this, a, w) === "web") {
    const t = this._extraction?.source.fileName;
    return t ? s(this, a, R).call(this, t) : void 0;
  }
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return s(this, a, U).call(this);
  await s(this, a, pe).call(this, e);
};
pe = async function(e) {
  if (this._workflowAlias) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(ae)).getLatestToken();
      if (h(this, a, w) === "pdf") {
        const [n, r] = await Promise.all([
          V(this._workflowAlias, e, i),
          Z(this._workflowAlias, e, i)
        ]);
        if (n && (this._extraction = n), r) {
          this._transformResult = r;
          const c = await T(this._workflowAlias, i);
          this._areaDetection = c;
          const u = r.diagnostics, g = u.roleSections > 0 ? `, ${u.roleSections} role` : "";
          this._successMessage = `Content extracted — ${u.totalSections} sections (${u.bulletListSections} bullet, ${u.paragraphSections} paragraph, ${u.subHeadedSections} sub-headed${g})`, setTimeout(() => {
            this._successMessage = null;
          }, 5e3);
        } else n ? (this._successMessage = `Content extracted — ${n.elements.length} elements (transform unavailable)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
      } else {
        const n = await V(this._workflowAlias, e, i);
        if (n) {
          this._extraction = n;
          const r = await D(this._workflowAlias, i);
          this._transformResult = r, this._successMessage = `Content extracted — ${n.elements.length} elements`, setTimeout(() => {
            this._successMessage = null;
          }, 5e3);
        } else
          this._error = `Extraction failed. Check that the selected media item is a valid ${h(this, a, w)} file.`;
      }
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Extraction failed", console.error("Extraction failed:", t);
    } finally {
      this._extracting = !1;
    }
  }
};
N = function(e) {
  return this._collapsed.has(e);
};
M = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
Te = function(e) {
  return this._transformResult ? ye(this._transformResult).find((i) => i.id === e)?.included ?? !0 : !0;
};
X = async function(e, t) {
  if (!this._workflowAlias) return;
  const i = await lt(this._workflowAlias, e, t, h(this, b));
  i && (this._transformResult = i);
};
he = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const i of this._config.map.mappings)
    if (i.source === e && i.enabled)
      for (const o of i.destinations)
        t.push(o);
  return t;
};
J = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey)
    for (const i of we(this._config.destination)) {
      const o = i.blocks.find((n) => n.key === e.blockKey);
      if (o) {
        const n = o.properties?.find((r) => r.alias === e.target);
        return `${o.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((i) => i.alias === e.target);
  if (t) return t.label;
  for (const i of we(this._config.destination))
    for (const o of i.blocks) {
      const n = o.properties?.find((r) => r.alias === e.target);
      if (n) return `${o.label} > ${n.label || n.alias}`;
    }
  return e.target;
};
De = function(e, t) {
  if (!this._areaDetection) return t;
  let i = 0;
  for (const o of this._areaDetection.pages) {
    if (o.page === e) return i + t;
    i += o.areas.length;
  }
  return i + t;
};
F = function(e) {
  const t = [];
  for (const i of e.sections)
    i.heading && t.push(i.heading), t.push(...i.children);
  return t;
};
Ie = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const i = new Set(this._collapsed);
    i.delete(t), this._collapsed = i;
  }
};
Ue = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowAlias || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await ct(
        this._workflowAlias,
        this._teachingAreaIndex,
        e,
        h(this, b)
      );
      this._inferenceResult = t;
    } catch (t) {
      console.error("Inference failed:", t), this._error = "Failed to infer section pattern";
    } finally {
      this._inferring = !1;
    }
  }
};
Le = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowAlias || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const i = { ...this._areaTemplate, areas: t }, o = await ee(this._workflowAlias, i, h(this, b));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, a, L).call(this));
};
Ne = async function() {
  if (this._teachingAreaIndex === null || !this._workflowAlias || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const i = { ...this._areaTemplate, areas: t }, o = await ee(this._workflowAlias, i, h(this, b));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, a, L).call(this));
};
Q = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
fe = function(e) {
  return te(e.name || "");
};
Oe = function(e) {
  const t = s(this, a, fe).call(this, e), i = this._sourceConfig?.areaRules?.[t];
  return i ? (i.groups?.length ?? 0) > 0 || (i.rules?.length ?? 0) > 0 : !1;
};
me = function(e, t) {
  if (!this._transformResult) return [];
  const i = this._transformResult.areas.find(
    (n) => n.color === e.color && n.page === t
  );
  if (!i) return [];
  const o = [];
  for (const n of i.groups)
    o.push(...n.sections);
  return o.push(...i.sections), o;
};
A = async function(e, t = "content") {
  if (!this._workflowAlias || !this._config?.destination) return;
  const o = (await this.getContext(I)).open(this, xt, {
    data: {
      destination: this._config.destination,
      existingMappings: this._config.map?.mappings ?? []
    }
  });
  let n;
  try {
    n = await o.onSubmit();
  } catch {
    return;
  }
  if (!n?.selectedTargets?.length) return;
  const r = `${e.id}.${t}`, c = this._config.map?.mappings ?? [], u = {
    source: r,
    destinations: n.selectedTargets.map(($) => ({ target: $.target, blockKey: $.blockKey })),
    enabled: !0
  }, g = c.findIndex(($) => $.source === r), f = g >= 0 ? c.map(($, E) => E === g ? u : $) : [...c, u], p = {
    ...this._config.map ?? { version: "1.0", mappings: [] },
    mappings: f
  }, P = await ke(this._workflowAlias, p, h(this, b));
  P && (this._config = { ...this._config, map: P });
};
Ke = async function(e, t) {
  if (!this._workflowAlias || !this._config?.map) return;
  const i = this._config.map.mappings, o = i.findIndex((f) => f.source === e);
  if (o < 0) return;
  const r = i[o].destinations.filter(
    (f) => !(f.target === t.target && f.blockKey === t.blockKey)
  );
  let c;
  r.length === 0 ? c = i.filter((f, p) => p !== o) : c = i.map(
    (f, p) => p === o ? { ...f, destinations: r } : f
  );
  const u = { ...this._config.map, mappings: c }, g = await ke(this._workflowAlias, u, h(this, b));
  g && (this._config = { ...this._config, map: g });
};
Fe = function(e) {
  const t = ["content", "heading", "title", "description", "summary"], i = t.some((u) => s(this, a, he).call(this, `${e.id}.${u}`).length > 0), o = `composed-${e.id}`, n = s(this, a, N).call(this, o), r = e.groupName ?? e.ruleName ?? (e.areaName ? `${e.areaName} - Section` : "Section"), c = !!e.groupName;
  return l`
			<div class="section-box">
				<div class="section-box-header" @click=${() => s(this, a, M).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="section-box-label">${r}</span>
					<span class="header-spacer"></span>
					${i && n ? t.map((u) => s(this, a, y).call(this, `${e.id}.${u}`)) : d}
				</div>
				${n ? d : l`
					<div class="section-box-content">
						${c ? l`
							${e.heading ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Title</span>
										<div class="part-box-content">${C(z(e.heading))}</div>
										<div class="part-box-actions">
											${s(this, a, y).call(this, `${e.id}.title`)}
											${s(this, a, y).call(this, `${e.id}.heading`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), s(this, a, A).call(this, e, "title");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
							${e.content ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Content</span>
										<div class="part-box-content">${C(z(e.content))}</div>
										<div class="part-box-actions">
											${s(this, a, y).call(this, `${e.id}.content`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), s(this, a, A).call(this, e, "content");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
							${e.description ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Description</span>
										<div class="part-box-content">${C(z(e.description))}</div>
										<div class="part-box-actions">
											${s(this, a, y).call(this, `${e.id}.description`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), s(this, a, A).call(this, e, "description");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
							${e.summary ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Summary</span>
										<div class="part-box-content">${C(z(e.summary))}</div>
										<div class="part-box-actions">
											${s(this, a, y).call(this, `${e.id}.summary`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), s(this, a, A).call(this, e, "summary");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
						` : l`
							${e.content ? l`
								<div class="part-box-row">
									<div class="part-box-content">${C(z(e.content))}</div>
									<div class="part-box-actions">
										${t.map((u) => s(this, a, y).call(this, `${e.id}.${u}`))}
										<uui-button class="md-map-btn" look="outline" compact label="Map"
											@click=${(u) => {
    u.stopPropagation(), s(this, a, A).call(this, e, "content");
  }}>Map</uui-button>
									</div>
								</div>
							` : d}
						`}
					</div>
				`}
			</div>
		`;
};
ge = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
Y = function(e, t) {
  const i = t === "heading" ? "heading" : s(this, a, ge).call(this, e.text), o = i === "heading" ? "Heading" : i === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${i}">${o}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : d}
					</div>
				</div>
			</div>
		`;
};
Be = function(e, t, i, o) {
  const n = s(this, a, N).call(this, t), r = e.heading ? te(e.heading.text) : `preamble-p${i}-a${o}`, c = s(this, a, Te).call(this, r);
  if (!e.heading)
    return l`
				<div class="area-section ${c ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => s(this, a, M).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${c ? "Included" : "Excluded"}"
							?checked=${c}
							@click=${(p) => p.stopPropagation()}
							@change=${(p) => s(this, a, X).call(this, r, p.target.checked)}>
						</uui-toggle>
					</div>
					${c && !n ? l`
						${e.children.map((p) => s(this, a, Y).call(this, p))}
					` : d}
				</div>
			`;
  const u = e.heading, g = e.children.length, f = g > 0;
  return l`
			<div class="area-section ${c ? "" : "excluded"}">
				<div class="section-heading" @click=${f ? () => s(this, a, M).call(this, t) : d}>
					${f ? l`<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>` : l`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="heading-text" title="${u.text}">${u.text}</span>
					${f ? l`<span class="group-count">${g} element${g !== 1 ? "s" : ""}</span>` : d}
					<uui-toggle
						label="${c ? "Included" : "Excluded"}"
						?checked=${c}
						@click=${(p) => p.stopPropagation()}
						@change=${(p) => s(this, a, X).call(this, r, p.target.checked)}>
					</uui-toggle>
				</div>
				${f && !n && c ? l`
					<div class="section-children">
						${e.children.map((p) => s(this, a, Y).call(this, p))}
					</div>
				` : d}
			</div>
		`;
};
He = function(e) {
  const t = new Set(this._excludedAreas);
  if (t.has(e))
    t.delete(e);
  else {
    t.add(e);
    const i = new Set(this._collapsed);
    i.add(e), this._collapsed = i;
  }
  this._excludedAreas = t;
};
We = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, i = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, o = s(this, a, ge).call(this, e.text), n = o === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${i ? "teach-matched" : ""}"
				@click=${() => s(this, a, Ue).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${o}">${n}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : d}
					</div>
				</div>
			</div>
		`;
};
je = function() {
  if (this._inferenceResult) {
    const e = this._inferenceResult.matchingElementIds.length, t = this._inferenceResult.pattern.conditions.map((i) => `${i.type}: ${i.value}`).join(", ");
    return l`
				<div class="teach-confirmation">
					<div class="teach-confirmation-info">
						<uui-icon name="icon-check" style="color: var(--uui-color-positive);"></uui-icon>
						<span>Found <strong>${e}</strong> matching element${e !== 1 ? "s" : ""}</span>
						<span class="teach-condition-summary">${t}</span>
					</div>
					<div class="teach-confirmation-actions">
						<uui-button look="primary" color="default" label="Confirm" @click=${() => s(this, a, Le).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => s(this, a, Q).call(this)}>Cancel</uui-button>
					</div>
				</div>
			`;
  }
  return l`
			<div class="teach-toolbar">
				<span class="teach-instruction">
					${this._inferring ? l`<uui-loader-bar></uui-loader-bar> Analysing...` : l`Click a section heading, or <strong>No Sections</strong> if this area has no repeating structure`}
				</span>
				<div class="teach-toolbar-actions">
					<uui-button look="secondary" compact label="No Sections" @click=${() => s(this, a, Ne).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => s(this, a, Q).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
Ve = function(e, t, i) {
  const o = `area-p${t}-a${i}`, n = s(this, a, De).call(this, t, i), r = this._teachingAreaIndex === n, c = r ? !1 : s(this, a, N).call(this, o), u = !this._excludedAreas.has(o), g = s(this, a, fe).call(this, e), f = s(this, a, Oe).call(this, e), p = f && this._transformResult ? s(this, a, me).call(this, e, t) : [], P = f && p.length > 0, $ = P ? p.length : e.sections.length, E = e.sectionPattern != null, ve = E ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, xe = this._sourceConfig?.areaRules?.[g], _e = (xe?.rules?.length ?? 0) + (xe?.groups?.reduce((_, j) => _ + j.rules.length, 0) ?? 0);
  return l`
			<div class="detected-area ${u ? "" : "area-excluded"} ${r ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !r && s(this, a, M).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${c ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-grid"></uui-icon>
					<span class="area-name">${e.name || `${i + 1}`}</span>
					${f ? l`<span class="meta-badge rules-badge">${_e} rule${_e !== 1 ? "s" : ""}</span>` : ve ? l`<span class="meta-badge structure-badge">${ve}</span>` : d}
					<span class="header-spacer"></span>
					<span class="group-count">${$} section${$ !== 1 ? "s" : ""}</span>
					${r ? d : l`
						${f ? l`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${(_) => {
    _.stopPropagation(), s(this, a, de).call(this, g, e.name || "", s(this, a, F).call(this, e));
  }}
								?disabled=${this._teachingAreaIndex !== null}>
								<uui-icon name="icon-settings"></uui-icon>
								Edit Rules
							</uui-button>
						` : l`
							<uui-button
								look="outline"
								compact
								label="${E ? "Redefine Structure" : "Define Structure"}"
								@click=${(_) => {
    _.stopPropagation(), s(this, a, Ie).call(this, n, o);
  }}
								?disabled=${this._teachingAreaIndex !== null && !r}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${E ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${f ? d : l`
						<uui-toggle
							label="${u ? "Included" : "Excluded"}"
							?checked=${u}
							@click=${(_) => _.stopPropagation()}
							@change=${() => s(this, a, He).call(this, o)}>
						</uui-toggle>
					`}
				</div>
				${c ? d : l`
					${r ? l`
						${s(this, a, je).call(this)}
						<div class="teach-elements">
							${s(this, a, F).call(this, e).map((_) => s(this, a, We).call(this, _))}
						</div>
					` : P ? l`
						<div class="composed-sections">
							${p.map((_) => s(this, a, Fe).call(this, _))}
						</div>
					` : l`
						${e.sections.map(
    (_, j) => s(this, a, Be).call(this, _, `p${t}-a${i}-s${j}`, t, i)
  )}
					`}
				`}
			</div>
		`;
};
Ge = function(e, t) {
  const i = `page-${e}`, o = s(this, a, N).call(this, i), n = t.length, r = t.reduce((u, g) => u + g.sections.length, 0), c = s(this, a, Ae).call(this, e);
  return l`
			<uui-box class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => s(this, a, M).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${o ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
				</div>
				${o ? d : l`
					${t.map((u, g) => s(this, a, Ve).call(this, u, e, g))}
				`}
			</uui-box>
		`;
};
B = function() {
  return this._areaDetection ? l`
			${this._areaDetection.pages.map(
    (e) => s(this, a, Ge).call(this, e.page, e.areas)
  )}
		` : d;
};
H = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((i, o) => i + o.sections.length, 0), 0) : 0;
};
O = function() {
  return l`
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
qe = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return d;
  const i = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), o = e ? this._areaDetection.pages.length : i, r = o < i ? `${o} of ${i}` : `${i}`, c = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? s(this, a, H).call(this) : 0, g = t ? this._extraction.source.fileName : "", f = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return l`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${f}</span>
					</div>
					<div class="box-content">
						<uui-icon name="icon-page-add" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${g}">${g}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Source" @click=${s(this, a, U)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Choose Source
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-stat">${r}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${s(this, a, Ee)}>
								<uui-icon name="icon-document"></uui-icon>
								Choose Pages
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-grid" class="box-icon"></uui-icon>
						<span class="box-stat">${this._areaTemplate ? this._areaTemplate.areas.length : c}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Areas" @click=${s(this, a, Me)}>
								<uui-icon name="icon-grid"></uui-icon>
								Choose Areas
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-thumbnail-list" class="box-icon"></uui-icon>
						<span class="box-stat">${u}</span>
						${this._transformResult && this._areaDetection ? l`
							<div class="box-buttons">
								<uui-button
									look="primary"
									color="default"
									label="Choose Sections"
									popovertarget="section-picker-popover">
									<uui-icon name="icon-thumbnail-list"></uui-icon>
									Choose Sections
									<uui-symbol-expand .open=${this._sectionPickerOpen}></uui-symbol-expand>
								</uui-button>
								<uui-popover-container
									id="section-picker-popover"
									placement="bottom-end"
									@toggle=${s(this, a, Pe)}>
									<umb-popover-layout>
										${s(this, a, Re).call(this).map((p) => l`
											<uui-menu-item
												label="${p.areaName}"
												@click=${() => s(this, a, de).call(this, p.areaKey, p.areaName, p.elements)}>
												<uui-icon slot="icon" name="${p.hasRules ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
												<span slot="badge" class="section-picker-meta">${p.elements.length} el</span>
											</uui-menu-item>
										`)}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : d}
					</div>
				</uui-box>
			</div>

			${e ? l`
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
						@toggle=${s(this, a, ue)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => s(this, a, ce).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, a, k).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => s(this, a, S).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, a, k).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => s(this, a, S).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, a, k).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => s(this, a, S).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : d}
		`;
};
Xe = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? s(this, a, B).call(this) : d : s(this, a, W).call(this);
};
Je = function() {
  if (!this._transformResult) return "";
  const e = ye(this._transformResult).filter((i) => i.included), t = [];
  for (const i of e)
    i.heading && i.pattern !== "role" && (t.push(`## ${i.heading}`), t.push("")), i.content && t.push(i.content), i.description && t.push(i.description), i.summary && t.push(i.summary), t.length > 0 && t.push("");
  return t.join(`
`);
};
W = function() {
  if (!this._transformResult)
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = s(this, a, Je).call(this);
  if (!e.trim())
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No content</h3>
					<p>All sections are excluded. Include at least one section to see the preview.</p>
				</div>
			`;
  const t = z(e);
  return l`
			<div class="transformed-preview">
				<div class="md-section-content">${C(t)}</div>
			</div>
		`;
};
y = function(e) {
  const t = s(this, a, he).call(this, e);
  return t.length === 0 ? d : t.map((i) => l`<uui-tag color="positive" look="primary" class="mapped-tag" title="${s(this, a, J).call(this, i)}">
			${s(this, a, J).call(this, i)}
			<button class="unmap-x" title="Remove mapping" @click=${(o) => {
    o.stopPropagation(), s(this, a, Ke).call(this, e, i);
  }}>&times;</button>
		</uui-tag>`);
};
Qe = function() {
  if (!this._extraction) return d;
  const e = this._extraction.source.fileName ?? "", t = new Date(this._extraction.source.extractedDate).toLocaleString(), i = this._areaDetection !== null, o = i ? this._areaDetection.diagnostics.areasDetected : 0, n = i ? s(this, a, H).call(this) : 0;
  return l`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${t}</span>
					</div>
					<div class="box-content">
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${e}">${e}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Source"
								@click=${s(this, a, U)} ?disabled=${this._extracting}>
								<uui-icon name="icon-document"></uui-icon> Choose Source
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-grid" class="box-icon"></uui-icon>
						<span class="box-stat">${o}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Areas" disabled>
								<uui-icon name="icon-grid"></uui-icon> Choose Areas
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-thumbnail-list" class="box-icon"></uui-icon>
						<span class="box-stat">${n}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Sections" disabled>
								<uui-icon name="icon-thumbnail-list"></uui-icon> Choose Sections
							</uui-button>
						</div>
					</div>
				</uui-box>
			</div>
		`;
};
Ye = function() {
  return this._viewMode === "transformed" ? s(this, a, W).call(this) : this._areaDetection ? s(this, a, B).call(this) : s(this, a, be).call(this);
};
Ze = function() {
  if (!this._extraction) return d;
  const e = this._extraction.source.fileName ?? "", t = new Date(this._extraction.source.extractedDate).toLocaleString(), i = this._areaDetection !== null, o = i ? this._areaDetection.diagnostics.areasDetected : 0, n = i ? s(this, a, H).call(this) : 0;
  return l`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${t}</span>
					</div>
					<div class="box-content">
						<uui-icon name="icon-globe" class="box-icon"></uui-icon>
						<uui-input
							label="URL"
							placeholder="https://example.com/page"
							class="box-url-input"
							.value=${this._sampleUrl || e}
							@input=${(r) => {
    this._sampleUrl = r.target.value;
  }}
							@keydown=${(r) => {
    r.key === "Enter" && this._sampleUrl && s(this, a, R).call(this, this._sampleUrl);
  }}>
						</uui-input>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Source"
								@click=${() => s(this, a, R).call(this, this._sampleUrl || e)}
								?disabled=${this._extracting}>
								<uui-icon name="icon-globe"></uui-icon> Choose Source
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-grid" class="box-icon"></uui-icon>
						<span class="box-stat">${o}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Areas" disabled>
								<uui-icon name="icon-grid"></uui-icon> Choose Areas
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-thumbnail-list" class="box-icon"></uui-icon>
						<span class="box-stat">${n}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Sections" disabled>
								<uui-icon name="icon-thumbnail-list"></uui-icon> Choose Sections
							</uui-button>
						</div>
					</div>
				</uui-box>
			</div>
		`;
};
et = function() {
  return this._viewMode === "transformed" ? s(this, a, W).call(this) : this._areaDetection ? s(this, a, B).call(this) : s(this, a, be).call(this);
};
be = function() {
  return this._extraction?.elements?.length ? l`
			<div class="simple-elements">
				${this._extraction.elements.map((e) => {
    const t = e.metadata?.fontName?.startsWith("heading-"), i = t ? parseInt(e.metadata.fontName.replace("heading-", ""), 10) : 0;
    return l`
						<div class="simple-element ${t ? "simple-element-heading" : ""}">
							<div class="simple-element-text" style="${t ? `font-size: ${24 - (i - 1) * 2}px; font-weight: bold;` : ""}">
								${e.text}
							</div>
							<div class="simple-element-actions">
								${s(this, a, y).call(this, e.id)}
							</div>
						</div>
					`;
  })}
			</div>
		` : l`<p style="padding: var(--uui-size-layout-1); color: var(--uui-color-text-alt);">No elements extracted.</p>`;
};
K = function() {
  if (h(this, a, w) === "web")
    return s(this, a, tt).call(this);
  const e = h(this, a, w) === "pdf", t = "Choose Source...", i = e ? "Choose a PDF from the media library to extract text elements with their metadata." : `Choose a ${h(this, a, w)} file from the media library to extract content.`;
  return l`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>${i}</p>
				<uui-button look="primary" label="${t}" @click=${s(this, a, U)} ?disabled=${this._extracting}>
					${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : t}
				</uui-button>
			</div>
		`;
};
tt = function() {
  return l`
			<div class="empty-state">
				<uui-icon name="icon-globe" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Enter a web page URL to extract content.</p>
				<div style="display: flex; gap: 8px; align-items: center; width: 100%; max-width: 500px;">
					<uui-input
						label="URL"
						placeholder="https://example.com/page"
						style="flex: 1;"
						.value=${this._sampleUrl}
						@input=${(e) => {
    this._sampleUrl = e.target.value;
  }}
						@keydown=${(e) => {
    e.key === "Enter" && this._sampleUrl && s(this, a, R).call(this, this._sampleUrl);
  }}>
					</uui-input>
					<uui-button
						look="primary"
						label="Extract"
						?disabled=${!this._sampleUrl || this._extracting}
						@click=${() => s(this, a, R).call(this, this._sampleUrl)}>
						${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : "Extract"}
					</uui-button>
				</div>
			</div>
		`;
};
R = async function(e) {
  if (!(!this._workflowAlias || !e)) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(ae)).getLatestToken(), o = await V(this._workflowAlias, "", i, e);
      if (o) {
        this._extraction = o;
        const [n, r] = await Promise.all([
          T(this._workflowAlias, i),
          D(this._workflowAlias, i)
        ]);
        this._areaDetection = n, this._transformResult = r;
        const c = n?.diagnostics?.areasDetected ?? 0;
        this._successMessage = `Content extracted — ${o.elements.length} elements in ${c} areas`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else
        this._error = "Extraction failed. Check that the URL is accessible.";
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to extract from URL", console.error("URL extraction failed:", t);
    } finally {
      this._extracting = !1;
    }
  }
};
m.styles = [
  ft,
  dt`
			:host {
				display: block;
				height: 100%;
				overflow-x: hidden;
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

			/* Simple view (non-PDF) */
			.simple-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: var(--uui-size-space-4) var(--uui-size-layout-1);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.simple-header-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.simple-elements {
				padding: var(--uui-size-layout-1);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.simple-element {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface);
			}

			.simple-element-heading {
				background: var(--uui-color-surface-alt);
			}

			.simple-element-text {
				flex: 1;
				white-space: pre-wrap;
				word-break: break-word;
				max-width: 75ch;
			}

			.simple-element-actions {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-1);
				flex-shrink: 0;
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
				flex: 1;
			}

			.box-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: var(--uui-size-space-2);
				min-height: 180px;
			}

			.box-buttons {
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-icon {
				font-size: 48px;
				color: var(--uui-color-text-alt);
				margin-top: var(--uui-size-space-3);
			}

			.box-headline-row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
			}

			.box-headline-meta {
				font-size: var(--uui-type-small-size);
				font-weight: 400;
				color: var(--uui-color-text-alt);
			}

			.box-filename {
				font-weight: 600;
				font-size: var(--uui-type-default-size) !important;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100%;
			}

			.box-url-input {
				width: 100%;
				flex: 1;
				display: flex;
				align-items: center;
				font-weight: 600;
				font-size: var(--uui-type-default-size);
				text-align: center;
				--uui-input-border-color: transparent;
				--uui-input-border-color-hover: var(--uui-color-border-emphasis);
				--uui-input-border-color-focus: var(--uui-color-focus);
			}

			.box-buttons {
				display: flex;
				gap: var(--uui-size-space-2);
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-stat {
				font-size: var(--uui-type-h4-size);
				font-weight: 700;
				color: var(--uui-color-text);
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}


			/* Collapse row below boxes */
			.collapse-row {
				display: flex;
				justify-content: flex-end;
				padding: 0 var(--uui-size-space-4) var(--uui-size-space-2);
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

			.level-icon {
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
				font-size: 12px;
			}

			/* Detected areas (Level 2) */
			.detected-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-4) 0;
				margin-left: var(--uui-size-space-3);
			}

			.detected-area.area-excluded {
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

			.area-name {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			/* Sections within detected areas (Level 3) */
			.area-section {
				margin-left: var(--uui-size-space-3);
			}

			.area-section + .area-section {
				border-top: 1px solid var(--uui-color-border);
			}

			.section-heading {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				cursor: pointer;
				overflow: hidden;
			}

			.section-heading:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.section-heading:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.heading-text {
				font-weight: 600;
				flex: 1;
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.collapse-chevron.placeholder {
				opacity: 0;
				pointer-events: none;
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
			.area-section.excluded {
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
				overflow-wrap: break-word;
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

			.mapped-tag {
				font-size: 12px;
			}

			.unmap-x {
				all: unset;
				cursor: pointer;
				font-size: 14px;
				line-height: 1;
				padding: 0 2px;
				margin-left: 4px;
				opacity: 0.7;
				font-weight: 700;
			}

			.unmap-x:hover {
				opacity: 1;
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

			.pattern-badge.role {
				background: var(--uui-color-current-emphasis);
				color: var(--uui-color-current-contrast);
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

			/* Structure badge on area header */
			.structure-badge {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-weight: 500;
			}

			/* Rules badge on area header */
			.rules-badge {
				background: var(--uui-color-default-emphasis);
				color: var(--uui-color-default-contrast);
				font-weight: 500;
			}

			/* Section boxes — bordered containers for each section */
			.composed-sections {
				margin-left: var(--uui-size-space-3);
			}

			.section-box {
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				margin: var(--uui-size-space-3) 0;
			}

			.section-box:first-child {
				margin-top: 0;
			}

			.section-box-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				cursor: pointer;
			}

			.section-box-header:hover {
				background: var(--uui-color-surface-emphasis);
				border-radius: var(--uui-border-radius);
			}

			.section-box-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.section-box-label {
				font-weight: 600;
				color: var(--uui-color-text);
				flex-shrink: 0;
			}

			.section-box-content {
				padding: 0 var(--uui-size-space-4) var(--uui-size-space-4);
			}

			/* Part boxes — nested bordered containers for grouped parts */
			.part-box {
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				margin-bottom: var(--uui-size-space-3);
			}

			.part-box:last-child {
				margin-bottom: 0;
			}

			/* Part row — flex layout for label + content + actions */
			.part-box-row {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
			}

			.part-box-label {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				min-width: 80px;
				flex-shrink: 0;
				padding-top: 2px;
			}

			.part-box-content {
				flex: 1;
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text);
				min-width: 0;
			}

			/* Headings inside part content render as plain bold text */
			.part-box-content h1,
			.part-box-content h2,
			.part-box-content h3,
			.part-box-content h4,
			.part-box-content h5,
			.part-box-content h6 {
				font-size: inherit;
				font-weight: 600;
				margin: 0.75em 0 0.25em;
				line-height: 1.4;
			}

			.part-box-content h1:first-child,
			.part-box-content h2:first-child,
			.part-box-content h3:first-child,
			.part-box-content h4:first-child,
			.part-box-content h5:first-child,
			.part-box-content h6:first-child {
				margin-top: 0;
			}

			.part-box-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				flex-shrink: 0;
				padding-top: 2px;
			}

			.composed-unmapped {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				font-style: italic;
				white-space: nowrap;
			}

			/* Teach-by-example mode */
			.area-teaching {
				border-left-width: 4px;
				border-left-style: solid;
				box-shadow: 0 0 0 1px var(--uui-color-focus);
				border-radius: var(--uui-border-radius);
			}

			.teach-toolbar {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.teach-instruction {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.teach-toolbar-actions {
				display: flex;
				gap: var(--uui-size-space-2);
			}

			.teach-confirmation {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.teach-confirmation-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				font-size: var(--uui-type-small-size);
			}

			.teach-condition-summary {
				font-family: monospace;
				font-size: 11px;
				opacity: 0.8;
			}

			.teach-confirmation-actions {
				display: flex;
				gap: var(--uui-size-space-2);
			}

			.teach-elements {
				padding-left: var(--uui-size-space-3);
			}

			.teach-element {
				cursor: pointer;
				transition: background-color 0.15s;
			}

			.teach-element:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.teach-element.teach-clicked {
				background: color-mix(in srgb, var(--uui-color-focus) 15%, transparent);
				border-left: 3px solid var(--uui-color-focus);
			}

			.teach-element.teach-matched {
				background: color-mix(in srgb, var(--uui-color-positive) 10%, transparent);
				border-left: 3px solid var(--uui-color-positive);
			}

			.teach-element.teach-clicked.teach-matched {
				background: color-mix(in srgb, var(--uui-color-focus) 15%, transparent);
				border-left: 3px solid var(--uui-color-focus);
			}

			/* Transformed tab — read-only markdown preview */
			.transformed-preview {
				padding: var(--uui-size-space-5);
				max-width: 75ch;
			}

			/* Map button — hidden by default, shown on box hover */
			.md-map-btn {
				opacity: 0;
				transition: opacity 0.15s;
			}

			.part-box:hover .md-map-btn,
			.part-box-row:hover .md-map-btn {
				opacity: 1;
			}

			.md-section-content {
				line-height: 1.75;
				color: var(--uui-color-text);
				font-size: 15px;
			}

			/* Headings */
			.md-section-content h1 {
				font-size: 2em;
				font-weight: 700;
				margin: 0.67em 0 0.4em;
				line-height: 1.25;
				color: var(--uui-color-text);
			}

			.md-section-content h2 {
				font-size: 1.5em;
				font-weight: 600;
				margin: 1em 0 0.4em;
				padding-bottom: 0.3em;
				border-bottom: 1px solid var(--uui-color-border);
				line-height: 1.3;
				color: var(--uui-color-text);
			}

			.md-section-content h3 {
				font-size: 1.25em;
				font-weight: 600;
				margin: 0.8em 0 0.3em;
				line-height: 1.35;
				color: var(--uui-color-text);
			}

			.md-section-content h4 {
				font-size: 1.1em;
				font-weight: 600;
				margin: 0.6em 0 0.25em;
				color: var(--uui-color-text);
			}

			.md-section-content h5,
			.md-section-content h6 {
				font-size: 1em;
				font-weight: 600;
				margin: 0.5em 0 0.2em;
				color: var(--uui-color-text-alt);
			}

			/* Paragraphs */
			.md-section-content p {
				margin: 0.5em 0;
			}

			/* Lists */
			.md-section-content ul,
			.md-section-content ol {
				padding-left: 1.75em;
				margin: 0.5em 0;
			}

			.md-section-content li {
				margin: 0.2em 0;
			}

			.md-section-content ul li::marker {
				color: var(--uui-color-text-alt);
			}

			/* Blockquotes */
			.md-section-content blockquote {
				margin: 0.5em 0;
				padding: 0.25em 1em;
				border-left: 3px solid var(--uui-color-current);
				color: var(--uui-color-text-alt);
				background: color-mix(in srgb, var(--uui-color-current) 5%, transparent);
				border-radius: 0 var(--uui-border-radius) var(--uui-border-radius) 0;
			}

			.md-section-content blockquote p {
				margin: 0.25em 0;
			}

			/* Inline styles */
			.md-section-content strong {
				font-weight: 700;
				color: var(--uui-color-text);
			}

			.md-section-content em {
				font-style: italic;
			}

			.md-section-content code {
				font-family: monospace;
				font-size: 0.9em;
				padding: 0.1em 0.35em;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-danger);
			}

			.md-section-content mark {
				background: color-mix(in srgb, var(--uui-color-warning) 30%, transparent);
				padding: 0.1em 0.2em;
				border-radius: 2px;
			}


		`
];
v([
  x()
], m.prototype, "_extraction", 2);
v([
  x()
], m.prototype, "_areaDetection", 2);
v([
  x()
], m.prototype, "_config", 2);
v([
  x()
], m.prototype, "_workflowAlias", 2);
v([
  x()
], m.prototype, "_loading", 2);
v([
  x()
], m.prototype, "_extracting", 2);
v([
  x()
], m.prototype, "_error", 2);
v([
  x()
], m.prototype, "_successMessage", 2);
v([
  x()
], m.prototype, "_collapsed", 2);
v([
  x()
], m.prototype, "_transformResult", 2);
v([
  x()
], m.prototype, "_viewMode", 2);
v([
  x()
], m.prototype, "_sourceConfig", 2);
v([
  x()
], m.prototype, "_pageMode", 2);
v([
  x()
], m.prototype, "_pageInputValue", 2);
v([
  x()
], m.prototype, "_collapsePopoverOpen", 2);
v([
  x()
], m.prototype, "_excludedAreas", 2);
v([
  x()
], m.prototype, "_areaTemplate", 2);
v([
  x()
], m.prototype, "_sectionPickerOpen", 2);
v([
  x()
], m.prototype, "_teachingAreaIndex", 2);
v([
  x()
], m.prototype, "_inferenceResult", 2);
v([
  x()
], m.prototype, "_inferring", 2);
v([
  x()
], m.prototype, "_sampleUrl", 2);
m = v([
  pt("up-doc-workflow-source-view")
], m);
const It = m;
export {
  m as UpDocWorkflowSourceViewElement,
  It as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-CRsOzyIH.js.map
