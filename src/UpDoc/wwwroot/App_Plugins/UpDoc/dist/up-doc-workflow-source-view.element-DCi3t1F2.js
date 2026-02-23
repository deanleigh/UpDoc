import { a as ge } from "./workflow.types-sXs8a86t.js";
import { d as Ye, b as Ze, g as et, h as be, i as I, j as tt, k as X, l as F, s as J, m as it, n as at, o as ve, u as ot, p as st } from "./workflow.service-DSRz0gSB.js";
import { m as k, n as Q } from "./transforms-BkZeboOX.js";
import { UmbModalToken as Y, UMB_MODAL_MANAGER_CONTEXT as E } from "@umbraco-cms/backoffice/modal";
import { U as nt } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as l, nothing as d, unsafeHTML as z, css as rt, state as v, customElement as lt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as ct } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ut } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as Z } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as dt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as pt } from "@umbraco-cms/backoffice/media";
const ht = new Y(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), ft = new Y(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), mt = new Y("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "medium"
  }
});
var gt = Object.defineProperty, bt = Object.getOwnPropertyDescriptor, xe = (e) => {
  throw TypeError(e);
}, b = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? bt(t, i) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (n = (s ? c(t, i, n) : c(n)) || n);
  return s && n && gt(t, i, n), n;
}, ee = (e, t, i) => t.has(e) || xe("Cannot " + i), g = (e, t, i) => (ee(e, t, "read from private field"), i ? i.call(e) : t.get(e)), me = (e, t, i) => t.has(e) ? xe("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), vt = (e, t, i, s) => (ee(e, t, "write to private field"), t.set(e, i), i), o = (e, t, i) => (ee(e, t, "access private method"), i), x, a, $, _e, te, ie, ae, we, ye, oe, S, D, $e, ke, T, K, ze, Ce, B, se, Pe, N, ne, A, P, Me, H, re, j, Re, U, Se, Ee, Te, Ne, V, le, Ae, ce, C, De, Ie, ue, W, Ue, Le, Oe, Fe, Ke, Be, He, je, G, Ve, We, Ge, de, y, qe, Xe, Je, q, Qe, L;
let m = class extends ct {
  constructor() {
    super(...arguments), me(this, a), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, this._sampleUrl = "", me(this, x, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(dt, (e) => {
      e && (e.setSaveHandler(() => o(this, a, N).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, a, _e).call(this));
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
    const e = g(this, a, $) === "pdf", t = this._areaDetection !== null || this._extraction !== null;
    return e ? l`
			<umb-body-layout header-fit-height>
				${t ? o(this, a, G).call(this) : d}
				${t && this._viewMode === "elements" ? o(this, a, Ve).call(this) : d}
				${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : d}
				${t ? o(this, a, We).call(this) : o(this, a, q).call(this)}
			</umb-body-layout>
		` : l`
				<umb-body-layout header-fit-height>
					${t ? o(this, a, G).call(this) : d}
					${t && this._viewMode === "elements" ? o(this, a, qe).call(this) : d}
					${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : d}
					${t ? o(this, a, Xe).call(this) : o(this, a, q).call(this)}
				</umb-body-layout>
			`;
  }
};
x = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
$ = function() {
  return this._sourceConfig?.sourceTypes?.[0] ?? "pdf";
};
_e = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(Z);
      vt(this, x, await e.getLatestToken());
      const [t, i, s] = await Promise.all([
        Ye(this._workflowName, g(this, x)),
        Ze(this._workflowName, g(this, x)),
        et(this._workflowName, g(this, x))
      ]);
      if (this._extraction = t, this._config = i, this._sourceConfig = s, (s?.sourceTypes?.[0] ?? "pdf") === "pdf") {
        const [r, c, u] = await Promise.all([
          be(this._workflowName, g(this, x)),
          I(this._workflowName, g(this, x)),
          tt(this._workflowName, g(this, x))
        ]);
        this._areaDetection = r, this._transformResult = c, this._areaTemplate = u;
        const h = t?.source.mediaKey;
        if (h && r) {
          const f = await X(this._workflowName, h, g(this, x));
          f && (this._transformResult = f);
        }
        s?.pages && Array.isArray(s.pages) && s.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, a, ie).call(this, s.pages)) : (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const r = await I(this._workflowName, g(this, x));
        this._transformResult = r;
      }
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
te = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.split(",")) {
    const s = i.trim();
    if (!s) continue;
    const n = s.split("-").map((r) => parseInt(r.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      t.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let r = n[0]; r <= n[1]; r++)
        t.add(r);
  }
  return [...t].sort((i, s) => i - s);
};
ie = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, c) => r - c), i = [];
  let s = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (i.push(s === n ? `${s}` : `${s}-${n}`), s = t[r]), n = t[r];
  return i.push(s === n ? `${s}` : `${s}-${n}`), i.join(", ");
};
ae = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, a, te).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
we = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, a, te).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
ye = async function() {
  if (!this._workflowName) return;
  const e = o(this, a, ae).call(this);
  await it(this._workflowName, e, g(this, x));
};
oe = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const i of this._areaDetection.pages) {
    const s = i.page;
    e === "pages" && t.push(`page-${s}`), e === "areas" && i.areas.forEach((n, r) => t.push(`area-p${s}-a${r}`)), e === "sections" && (i.areas.forEach((n, r) => {
      n.sections.forEach((c, u) => t.push(`p${s}-a${r}-s${u}`));
    }), i.areas.forEach((n) => {
      o(this, a, ce).call(this, n, s).forEach((c) => t.push(`composed-${c.id}`));
    }));
  }
  return t;
};
S = function(e) {
  const t = o(this, a, oe).call(this, e);
  return t.length > 0 && t.every((i) => this._collapsed.has(i));
};
D = function(e) {
  const t = o(this, a, oe).call(this, e), i = o(this, a, S).call(this, e), s = new Set(this._collapsed);
  for (const n of t)
    i ? s.delete(n) : s.add(n);
  this._collapsed = s;
};
$e = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
ke = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
T = async function() {
  if (!this._workflowName) return;
  const i = await (await this.getContext(E)).open(this, pt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const s = i.selection[0];
  s && await o(this, a, ne).call(this, s);
};
K = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(E)).open(this, ht, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const i = await t.onSubmit();
    if (i?.template) {
      const s = await J(this._workflowName, i.template, g(this, x));
      s && (this._areaTemplate = s, await o(this, a, N).call(this));
    }
  } catch {
  }
};
ze = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const i of this._areaDetection.pages)
    for (const s of i.areas) {
      const n = s.name || "Area", r = Q(n);
      if (t.has(r)) continue;
      t.add(r);
      const c = o(this, a, U).call(this, s), u = this._sourceConfig?.areaRules?.[r], h = !!u && ((u.groups?.length ?? 0) > 0 || (u.rules?.length ?? 0) > 0);
      e.push({ areaKey: r, areaName: n, elements: c, hasRules: h });
    }
  return e;
};
Ce = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
B = async function(e, t) {
  if (!this._workflowName) return;
  const i = {
    ...this._sourceConfig?.areaRules ?? {}
  };
  t.groups.length > 0 || t.rules.length > 0 ? i[e] = t : delete i[e];
  const n = await at(this._workflowName, i, g(this, x));
  n && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: n });
  const r = this._extraction?.source.mediaKey;
  if (r) {
    const c = await X(this._workflowName, r, g(this, x));
    c && (this._transformResult = c);
  }
};
se = async function(e, t, i) {
  if (!this._workflowName) return;
  const s = this._sourceConfig?.areaRules?.[e] ?? null, r = (await this.getContext(E)).open(this, ft, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: i,
      existingRules: s,
      onSave: async (c) => {
        await o(this, a, B).call(this, e, c);
      }
    }
  });
  try {
    const c = await r.onSubmit();
    c?.rules && await o(this, a, B).call(this, e, c.rules);
  } catch {
  }
};
Pe = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const i = o(this, a, ae).call(this), r = await (await this.getContext(E)).open(this, nt, {
    data: { mediaKey: e, totalPages: t, selectedPages: i }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = o(this, a, ie).call(this, r.selectedPages)), await o(this, a, ye).call(this));
};
N = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, a, T).call(this);
  await o(this, a, ne).call(this, e);
};
ne = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(Z)).getLatestToken();
      if (g(this, a, $) === "pdf") {
        const [n, r] = await Promise.all([
          F(this._workflowName, e, i),
          X(this._workflowName, e, i)
        ]);
        if (n && (this._extraction = n), r) {
          this._transformResult = r;
          const c = await be(this._workflowName, i);
          this._areaDetection = c;
          const u = r.diagnostics, h = u.roleSections > 0 ? `, ${u.roleSections} role` : "";
          this._successMessage = `Content extracted — ${u.totalSections} sections (${u.bulletListSections} bullet, ${u.paragraphSections} paragraph, ${u.subHeadedSections} sub-headed${h})`, setTimeout(() => {
            this._successMessage = null;
          }, 5e3);
        } else n ? (this._successMessage = `Content extracted — ${n.elements.length} elements (transform unavailable)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
      } else {
        const n = await F(this._workflowName, e, i);
        if (n) {
          this._extraction = n;
          const r = await I(this._workflowName, i);
          this._transformResult = r, this._successMessage = `Content extracted — ${n.elements.length} elements`, setTimeout(() => {
            this._successMessage = null;
          }, 5e3);
        } else
          this._error = `Extraction failed. Check that the selected media item is a valid ${g(this, a, $)} file.`;
      }
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Extraction failed", console.error("Extraction failed:", t);
    } finally {
      this._extracting = !1;
    }
  }
};
A = function(e) {
  return this._collapsed.has(e);
};
P = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
Me = function(e) {
  return this._transformResult ? ge(this._transformResult).find((i) => i.id === e)?.included ?? !0 : !0;
};
H = async function(e, t) {
  if (!this._workflowName) return;
  const i = await ot(this._workflowName, e, t, g(this, x));
  i && (this._transformResult = i);
};
re = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const i of this._config.map.mappings)
    if (i.source === e && i.enabled)
      for (const s of i.destinations)
        t.push(s);
  return t;
};
j = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids) {
      const s = i.blocks.find((n) => n.key === e.blockKey);
      if (s) {
        const n = s.properties?.find((r) => r.alias === e.target);
        return `${s.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((i) => i.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids)
      for (const s of i.blocks) {
        const n = s.properties?.find((r) => r.alias === e.target);
        if (n) return `${s.label} > ${n.label || n.alias}`;
      }
  return e.target;
};
Re = function(e, t) {
  if (!this._areaDetection) return t;
  let i = 0;
  for (const s of this._areaDetection.pages) {
    if (s.page === e) return i + t;
    i += s.areas.length;
  }
  return i + t;
};
U = function(e) {
  const t = [];
  for (const i of e.sections)
    i.heading && t.push(i.heading), t.push(...i.children);
  return t;
};
Se = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const i = new Set(this._collapsed);
    i.delete(t), this._collapsed = i;
  }
};
Ee = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await st(
        this._workflowName,
        this._teachingAreaIndex,
        e,
        g(this, x)
      );
      this._inferenceResult = t;
    } catch (t) {
      console.error("Inference failed:", t), this._error = "Failed to infer section pattern";
    } finally {
      this._inferring = !1;
    }
  }
};
Te = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const i = { ...this._areaTemplate, areas: t }, s = await J(this._workflowName, i, g(this, x));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, a, N).call(this));
};
Ne = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const i = { ...this._areaTemplate, areas: t }, s = await J(this._workflowName, i, g(this, x));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, a, N).call(this));
};
V = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
le = function(e) {
  return Q(e.name || "");
};
Ae = function(e) {
  const t = o(this, a, le).call(this, e), i = this._sourceConfig?.areaRules?.[t];
  return i ? (i.groups?.length ?? 0) > 0 || (i.rules?.length ?? 0) > 0 : !1;
};
ce = function(e, t) {
  if (!this._transformResult) return [];
  const i = this._transformResult.areas.find(
    (n) => n.color === e.color && n.page === t
  );
  if (!i) return [];
  const s = [];
  for (const n of i.groups)
    s.push(...n.sections);
  return s.push(...i.sections), s;
};
C = async function(e, t = "content") {
  if (!this._workflowName || !this._config?.destination) return;
  const s = (await this.getContext(E)).open(this, mt, {
    data: {
      destination: this._config.destination,
      existingMappings: this._config.map?.mappings ?? []
    }
  });
  let n;
  try {
    n = await s.onSubmit();
  } catch {
    return;
  }
  if (!n?.selectedTargets?.length) return;
  const r = `${e.id}.${t}`, c = this._config.map?.mappings ?? [], u = {
    source: r,
    destinations: n.selectedTargets.map((w) => ({ target: w.target, blockKey: w.blockKey })),
    enabled: !0
  }, h = c.findIndex((w) => w.source === r), f = h >= 0 ? c.map((w, R) => R === h ? u : w) : [...c, u], p = {
    ...this._config.map ?? { version: "1.0", mappings: [] },
    mappings: f
  }, M = await ve(this._workflowName, p, g(this, x));
  M && (this._config = { ...this._config, map: M });
};
De = async function(e, t) {
  if (!this._workflowName || !this._config?.map) return;
  const i = this._config.map.mappings, s = i.findIndex((f) => f.source === e);
  if (s < 0) return;
  const r = i[s].destinations.filter(
    (f) => !(f.target === t.target && f.blockKey === t.blockKey)
  );
  let c;
  r.length === 0 ? c = i.filter((f, p) => p !== s) : c = i.map(
    (f, p) => p === s ? { ...f, destinations: r } : f
  );
  const u = { ...this._config.map, mappings: c }, h = await ve(this._workflowName, u, g(this, x));
  h && (this._config = { ...this._config, map: h });
};
Ie = function(e) {
  const t = ["content", "heading", "title", "description", "summary"], i = t.some((u) => o(this, a, re).call(this, `${e.id}.${u}`).length > 0), s = `composed-${e.id}`, n = o(this, a, A).call(this, s), r = e.groupName ?? e.ruleName ?? (e.areaName ? `${e.areaName} - Section` : "Section"), c = !!e.groupName;
  return l`
			<div class="section-box">
				<div class="section-box-header" @click=${() => o(this, a, P).call(this, s)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="section-box-label">${r}</span>
					<span class="header-spacer"></span>
					${i && n ? t.map((u) => o(this, a, y).call(this, `${e.id}.${u}`)) : d}
				</div>
				${n ? d : l`
					<div class="section-box-content">
						${c ? l`
							${e.heading ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Title</span>
										<div class="part-box-content">${z(k(e.heading))}</div>
										<div class="part-box-actions">
											${o(this, a, y).call(this, `${e.id}.title`)}
											${o(this, a, y).call(this, `${e.id}.heading`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, C).call(this, e, "title");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
							${e.content ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Content</span>
										<div class="part-box-content">${z(k(e.content))}</div>
										<div class="part-box-actions">
											${o(this, a, y).call(this, `${e.id}.content`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, C).call(this, e, "content");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
							${e.description ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Description</span>
										<div class="part-box-content">${z(k(e.description))}</div>
										<div class="part-box-actions">
											${o(this, a, y).call(this, `${e.id}.description`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, C).call(this, e, "description");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
							${e.summary ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Summary</span>
										<div class="part-box-content">${z(k(e.summary))}</div>
										<div class="part-box-actions">
											${o(this, a, y).call(this, `${e.id}.summary`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, C).call(this, e, "summary");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : d}
						` : l`
							${e.content ? l`
								<div class="part-box-row">
									<div class="part-box-content">${z(k(e.content))}</div>
									<div class="part-box-actions">
										${t.map((u) => o(this, a, y).call(this, `${e.id}.${u}`))}
										<uui-button class="md-map-btn" look="outline" compact label="Map"
											@click=${(u) => {
    u.stopPropagation(), o(this, a, C).call(this, e, "content");
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
ue = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
W = function(e, t) {
  const i = t === "heading" ? "heading" : o(this, a, ue).call(this, e.text), s = i === "heading" ? "Heading" : i === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${i}">${s}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : d}
					</div>
				</div>
			</div>
		`;
};
Ue = function(e, t, i, s) {
  const n = o(this, a, A).call(this, t), r = e.heading ? Q(e.heading.text) : `preamble-p${i}-a${s}`, c = o(this, a, Me).call(this, r);
  if (!e.heading)
    return l`
				<div class="area-section ${c ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, a, P).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${c ? "Included" : "Excluded"}"
							?checked=${c}
							@click=${(p) => p.stopPropagation()}
							@change=${(p) => o(this, a, H).call(this, r, p.target.checked)}>
						</uui-toggle>
					</div>
					${c && !n ? l`
						${e.children.map((p) => o(this, a, W).call(this, p))}
					` : d}
				</div>
			`;
  const u = e.heading, h = e.children.length, f = h > 0;
  return l`
			<div class="area-section ${c ? "" : "excluded"}">
				<div class="section-heading" @click=${f ? () => o(this, a, P).call(this, t) : d}>
					${f ? l`<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>` : l`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="heading-text" title="${u.text}">${u.text}</span>
					${f ? l`<span class="group-count">${h} element${h !== 1 ? "s" : ""}</span>` : d}
					<uui-toggle
						label="${c ? "Included" : "Excluded"}"
						?checked=${c}
						@click=${(p) => p.stopPropagation()}
						@change=${(p) => o(this, a, H).call(this, r, p.target.checked)}>
					</uui-toggle>
				</div>
				${f && !n && c ? l`
					<div class="section-children">
						${e.children.map((p) => o(this, a, W).call(this, p))}
					</div>
				` : d}
			</div>
		`;
};
Le = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
Oe = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, i = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, s = o(this, a, ue).call(this, e.text), n = s === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${i ? "teach-matched" : ""}"
				@click=${() => o(this, a, Ee).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${s}">${n}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : d}
					</div>
				</div>
			</div>
		`;
};
Fe = function() {
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
						<uui-button look="primary" color="default" label="Confirm" @click=${() => o(this, a, Te).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => o(this, a, V).call(this)}>Cancel</uui-button>
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
					<uui-button look="secondary" compact label="No Sections" @click=${() => o(this, a, Ne).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => o(this, a, V).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
Ke = function(e, t, i) {
  const s = `area-p${t}-a${i}`, n = o(this, a, Re).call(this, t, i), r = this._teachingAreaIndex === n, c = r ? !1 : o(this, a, A).call(this, s), u = !this._excludedAreas.has(s), h = o(this, a, le).call(this, e), f = o(this, a, Ae).call(this, e), p = f && this._transformResult ? o(this, a, ce).call(this, e, t) : [], M = f && p.length > 0, w = M ? p.length : e.sections.length, R = e.sectionPattern != null, pe = R ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, he = this._sourceConfig?.areaRules?.[h], fe = (he?.rules?.length ?? 0) + (he?.groups?.reduce((_, O) => _ + O.rules.length, 0) ?? 0);
  return l`
			<div class="detected-area ${u ? "" : "area-excluded"} ${r ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !r && o(this, a, P).call(this, s)}>
					<uui-icon class="collapse-chevron" name="${c ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-grid"></uui-icon>
					<span class="area-name">${e.name || `${i + 1}`}</span>
					${f ? l`<span class="meta-badge rules-badge">${fe} rule${fe !== 1 ? "s" : ""}</span>` : pe ? l`<span class="meta-badge structure-badge">${pe}</span>` : d}
					<span class="header-spacer"></span>
					<span class="group-count">${w} section${w !== 1 ? "s" : ""}</span>
					${r ? d : l`
						${f ? l`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${(_) => {
    _.stopPropagation(), o(this, a, se).call(this, h, e.name || "", o(this, a, U).call(this, e));
  }}
								?disabled=${this._teachingAreaIndex !== null}>
								<uui-icon name="icon-settings"></uui-icon>
								Edit Rules
							</uui-button>
						` : l`
							<uui-button
								look="outline"
								compact
								label="${R ? "Redefine Structure" : "Define Structure"}"
								@click=${(_) => {
    _.stopPropagation(), o(this, a, Se).call(this, n, s);
  }}
								?disabled=${this._teachingAreaIndex !== null && !r}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${R ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${f ? d : l`
						<uui-toggle
							label="${u ? "Included" : "Excluded"}"
							?checked=${u}
							@click=${(_) => _.stopPropagation()}
							@change=${() => o(this, a, Le).call(this, s)}>
						</uui-toggle>
					`}
				</div>
				${c ? d : l`
					${r ? l`
						${o(this, a, Fe).call(this)}
						<div class="teach-elements">
							${o(this, a, U).call(this, e).map((_) => o(this, a, Oe).call(this, _))}
						</div>
					` : M ? l`
						<div class="composed-sections">
							${p.map((_) => o(this, a, Ie).call(this, _))}
						</div>
					` : l`
						${e.sections.map(
    (_, O) => o(this, a, Ue).call(this, _, `p${t}-a${i}-s${O}`, t, i)
  )}
					`}
				`}
			</div>
		`;
};
Be = function(e, t) {
  const i = `page-${e}`, s = o(this, a, A).call(this, i), n = t.length, r = t.reduce((u, h) => u + h.sections.length, 0), c = o(this, a, we).call(this, e);
  return l`
			<uui-box class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => o(this, a, P).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${s ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
				</div>
				${s ? d : l`
					${t.map((u, h) => o(this, a, Ke).call(this, u, e, h))}
				`}
			</uui-box>
		`;
};
He = function() {
  return this._areaDetection ? l`
			${this._areaDetection.pages.map(
    (e) => o(this, a, Be).call(this, e.page, e.areas)
  )}
		` : d;
};
je = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((i, s) => i + s.sections.length, 0), 0) : 0;
};
G = function() {
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
Ve = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return d;
  const i = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), s = e ? this._areaDetection.pages.length : i, r = s < i ? `${s} of ${i}` : `${i}`, c = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? o(this, a, je).call(this) : 0, h = t ? this._extraction.source.fileName : "", f = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return l`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${f}</span>
					</div>
					<div class="box-content">
						<uui-icon name="icon-page-add" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${h}">${h}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, a, T)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-stat">${r}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${o(this, a, Pe)}>
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
							${this._areaTemplate ? l`<uui-button look="primary" color="default" label="Edit Areas" @click=${o(this, a, K)}>
									<uui-icon name="icon-grid"></uui-icon>
									Edit Areas
								</uui-button>` : l`<uui-button look="primary" color="default" label="Define Areas" @click=${o(this, a, K)}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
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
									label="Edit Sections"
									popovertarget="section-picker-popover">
									<uui-icon name="icon-thumbnail-list"></uui-icon>
									Edit Sections
									<uui-symbol-expand .open=${this._sectionPickerOpen}></uui-symbol-expand>
								</uui-button>
								<uui-popover-container
									id="section-picker-popover"
									placement="bottom-end"
									@toggle=${o(this, a, Ce)}>
									<umb-popover-layout>
										${o(this, a, ze).call(this).map((p) => l`
											<uui-menu-item
												label="${p.areaName}"
												@click=${() => o(this, a, se).call(this, p.areaKey, p.areaName, p.elements)}>
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
						@toggle=${o(this, a, ke)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, a, $e).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, S).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, a, D).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, S).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, a, D).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, S).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, a, D).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : d}
		`;
};
We = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, a, He).call(this) : d : o(this, a, de).call(this);
};
Ge = function() {
  if (!this._transformResult) return "";
  const e = ge(this._transformResult).filter((i) => i.included), t = [];
  for (const i of e)
    i.heading && i.pattern !== "role" && (t.push(`## ${i.heading}`), t.push("")), i.content && t.push(i.content), i.description && t.push(i.description), i.summary && t.push(i.summary), t.length > 0 && t.push("");
  return t.join(`
`);
};
de = function() {
  if (!this._transformResult)
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = o(this, a, Ge).call(this);
  if (!e.trim())
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No content</h3>
					<p>All sections are excluded. Include at least one section to see the preview.</p>
				</div>
			`;
  const t = k(e);
  return l`
			<div class="transformed-preview">
				<div class="md-section-content">${z(t)}</div>
			</div>
		`;
};
y = function(e) {
  const t = o(this, a, re).call(this, e);
  return t.length === 0 ? d : t.map((i) => l`<uui-tag color="positive" look="primary" class="mapped-tag" title="${o(this, a, j).call(this, i)}">
			${o(this, a, j).call(this, i)}
			<button class="unmap-x" title="Remove mapping" @click=${(s) => {
    s.stopPropagation(), o(this, a, De).call(this, e, i);
  }}>&times;</button>
		</uui-tag>`);
};
qe = function() {
  if (!this._extraction) return d;
  const e = g(this, a, $) === "web", t = this._extraction.source.fileName ?? "", i = new Date(this._extraction.source.extractedDate).toLocaleString();
  return l`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${i}</span>
					</div>
					<div class="box-content">
						<uui-icon name="${e ? "icon-globe" : "icon-document"}" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${t}">${t}</span>
						<div class="box-buttons">
							${e ? l`<uui-button look="primary" color="default" label="Re-extract"
									@click=${() => o(this, a, L).call(this, t)} ?disabled=${this._extracting}>
									<uui-icon name="icon-globe"></uui-icon> Re-extract
								</uui-button>` : l`<uui-button look="primary" color="default" label="Change file"
									@click=${o(this, a, T)} ?disabled=${this._extracting}>
									<uui-icon name="icon-document"></uui-icon> Change file
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Box 1" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-lab" class="box-icon"></uui-icon>
					</div>
				</uui-box>

				<uui-box headline="Box 2" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-lab" class="box-icon"></uui-icon>
					</div>
				</uui-box>

				<uui-box headline="Box 3" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-lab" class="box-icon"></uui-icon>
					</div>
				</uui-box>
			</div>
		`;
};
Xe = function() {
  return this._viewMode === "elements" ? o(this, a, Je).call(this) : o(this, a, de).call(this);
};
Je = function() {
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
								${o(this, a, y).call(this, e.id)}
							</div>
						</div>
					`;
  })}
			</div>
		` : l`<p style="padding: var(--uui-size-layout-1); color: var(--uui-color-text-alt);">No elements extracted.</p>`;
};
q = function() {
  if (g(this, a, $) === "web")
    return o(this, a, Qe).call(this);
  const e = g(this, a, $) === "pdf", t = e ? "Choose PDF..." : "Choose file...", i = e ? "Choose a PDF from the media library to extract text elements with their metadata." : `Choose a ${g(this, a, $)} file from the media library to extract content.`;
  return l`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>${i}</p>
				<uui-button look="primary" label="${t}" @click=${o(this, a, T)} ?disabled=${this._extracting}>
					${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : t}
				</uui-button>
			</div>
		`;
};
Qe = function() {
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
    e.key === "Enter" && this._sampleUrl && o(this, a, L).call(this, this._sampleUrl);
  }}>
					</uui-input>
					<uui-button
						look="primary"
						label="Extract"
						?disabled=${!this._sampleUrl || this._extracting}
						@click=${() => o(this, a, L).call(this, this._sampleUrl)}>
						${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : "Extract"}
					</uui-button>
				</div>
			</div>
		`;
};
L = async function(e) {
  if (!(!this._workflowName || !e)) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(Z)).getLatestToken(), s = await F(this._workflowName, "", i, e);
      if (s) {
        this._extraction = s;
        const n = await I(this._workflowName, i);
        this._transformResult = n, this._successMessage = `Content extracted — ${s.elements.length} elements`, setTimeout(() => {
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
  ut,
  rt`
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
b([
  v()
], m.prototype, "_extraction", 2);
b([
  v()
], m.prototype, "_areaDetection", 2);
b([
  v()
], m.prototype, "_config", 2);
b([
  v()
], m.prototype, "_workflowName", 2);
b([
  v()
], m.prototype, "_loading", 2);
b([
  v()
], m.prototype, "_extracting", 2);
b([
  v()
], m.prototype, "_error", 2);
b([
  v()
], m.prototype, "_successMessage", 2);
b([
  v()
], m.prototype, "_collapsed", 2);
b([
  v()
], m.prototype, "_transformResult", 2);
b([
  v()
], m.prototype, "_viewMode", 2);
b([
  v()
], m.prototype, "_sourceConfig", 2);
b([
  v()
], m.prototype, "_pageMode", 2);
b([
  v()
], m.prototype, "_pageInputValue", 2);
b([
  v()
], m.prototype, "_collapsePopoverOpen", 2);
b([
  v()
], m.prototype, "_excludedAreas", 2);
b([
  v()
], m.prototype, "_areaTemplate", 2);
b([
  v()
], m.prototype, "_sectionPickerOpen", 2);
b([
  v()
], m.prototype, "_teachingAreaIndex", 2);
b([
  v()
], m.prototype, "_inferenceResult", 2);
b([
  v()
], m.prototype, "_inferring", 2);
b([
  v()
], m.prototype, "_sampleUrl", 2);
m = b([
  lt("up-doc-workflow-source-view")
], m);
const St = m;
export {
  m as UpDocWorkflowSourceViewElement,
  St as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-DCi3t1F2.js.map
