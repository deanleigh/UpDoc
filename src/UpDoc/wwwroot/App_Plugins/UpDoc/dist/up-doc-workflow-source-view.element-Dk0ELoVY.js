import { b as ce } from "./workflow.types-BgUyfmVM.js";
import { d as je, g as le, b as We, h as qe, i as Xe, j as Je, k as V, l as Qe, s as G, m as ue, n as Ye, o as Ze, u as et, p as tt } from "./workflow.service-CCTLt2Zy.js";
import { m as z, n as j } from "./transforms-deUehta3.js";
import { UmbModalToken as W, UMB_MODAL_MANAGER_CONTEXT as A } from "@umbraco-cms/backoffice/modal";
import { U as it } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as l, nothing as p, unsafeHTML as y, css as at, state as v, customElement as ot } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as st } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as nt } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as de } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as rt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as ct } from "@umbraco-cms/backoffice/media";
const lt = new W(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), ut = new W(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), dt = new W("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "medium"
  }
});
var pt = Object.defineProperty, ht = Object.getOwnPropertyDescriptor, pe = (e) => {
  throw TypeError(e);
}, g = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ht(t, i) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (r = (s ? c(t, i, r) : c(r)) || r);
  return s && r && pt(t, i, r), r;
}, q = (e, t, i) => t.has(e) || pe("Cannot " + i), x = (e, t, i) => (q(e, t, "read from private field"), i ? i.call(e) : t.get(e)), re = (e, t, i) => t.has(e) ? pe("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), mt = (e, t, i, s) => (q(e, t, "write to private field"), t.set(e, i), i), o = (e, t, i) => (q(e, t, "access private method"), i), b, a, he, X, J, Q, me, fe, Y, T, E, ge, ve, D, O, be, xe, U, Z, _e, R, ee, M, C, $e, K, I, F, we, N, ye, ke, ze, Ce, H, te, Me, ie, w, Pe, Se, ae, B, Te, Ae, Re, Ee, Ne, De, Ie, Le, Oe, Ue, Ke, Fe, He, Be, _, Ve, Ge;
let f = class extends st {
  constructor() {
    super(...arguments), re(this, a), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, re(this, b, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(rt, (e) => {
      e && (e.setSaveHandler(() => o(this, a, R).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, a, he).call(this));
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
    const e = this._areaDetection !== null || this._extraction !== null;
    return l`
			<umb-body-layout header-fit-height>
				${e ? o(this, a, Oe).call(this) : p}
				${e && this._viewMode === "elements" ? o(this, a, Ue).call(this) : p}
				${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : p}
				${e ? o(this, a, Ke).call(this) : o(this, a, Ge).call(this)}
			</umb-body-layout>
		`;
  }
};
b = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
he = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(de);
      mt(this, b, await e.getLatestToken());
      const [t, i, s, r, n, c] = await Promise.all([
        je(this._workflowName, x(this, b)),
        le(this._workflowName, x(this, b)),
        We(this._workflowName, x(this, b)),
        qe(this._workflowName, x(this, b)),
        Xe(this._workflowName, x(this, b)),
        Je(this._workflowName, x(this, b))
      ]);
      this._extraction = t, this._areaDetection = i, this._config = s, this._transformResult = r, this._sourceConfig = n, this._areaTemplate = c;
      const u = t?.source.mediaKey;
      if (u && i) {
        const d = await V(this._workflowName, u, x(this, b));
        d && (this._transformResult = d);
      }
      n?.pages && Array.isArray(n.pages) && n.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, a, J).call(this, n.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
X = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.split(",")) {
    const s = i.trim();
    if (!s) continue;
    const r = s.split("-").map((n) => parseInt(n.trim(), 10));
    if (r.length === 1 && !isNaN(r[0]))
      t.add(r[0]);
    else if (r.length === 2 && !isNaN(r[0]) && !isNaN(r[1]))
      for (let n = r[0]; n <= r[1]; n++)
        t.add(n);
  }
  return [...t].sort((i, s) => i - s);
};
J = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((n, c) => n - c), i = [];
  let s = t[0], r = t[0];
  for (let n = 1; n < t.length; n++)
    t[n] === r + 1 || (i.push(s === r ? `${s}` : `${s}-${r}`), s = t[n]), r = t[n];
  return i.push(s === r ? `${s}` : `${s}-${r}`), i.join(", ");
};
Q = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, a, X).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
me = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, a, X).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
fe = async function() {
  if (!this._workflowName) return;
  const e = o(this, a, Q).call(this);
  await Ye(this._workflowName, e, x(this, b));
};
Y = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const i of this._areaDetection.pages) {
    const s = i.page;
    e === "pages" && t.push(`page-${s}`), e === "areas" && i.areas.forEach((r, n) => t.push(`area-p${s}-a${n}`)), e === "sections" && (i.areas.forEach((r, n) => {
      r.sections.forEach((c, u) => t.push(`p${s}-a${n}-s${u}`));
    }), i.areas.forEach((r) => {
      o(this, a, ie).call(this, r, s).forEach((c) => t.push(`composed-${c.id}`));
    }));
  }
  return t;
};
T = function(e) {
  const t = o(this, a, Y).call(this, e);
  return t.length > 0 && t.every((i) => this._collapsed.has(i));
};
E = function(e) {
  const t = o(this, a, Y).call(this, e), i = o(this, a, T).call(this, e), s = new Set(this._collapsed);
  for (const r of t)
    i ? s.delete(r) : s.add(r);
  this._collapsed = s;
};
ge = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
ve = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
D = async function() {
  if (!this._workflowName) return;
  const i = await (await this.getContext(A)).open(this, ct, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const s = i.selection[0];
  s && await o(this, a, ee).call(this, s);
};
O = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(A)).open(this, lt, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const i = await t.onSubmit();
    if (i?.template) {
      const s = await G(this._workflowName, i.template, x(this, b));
      s && (this._areaTemplate = s, await o(this, a, R).call(this));
    }
  } catch {
  }
};
be = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const i of this._areaDetection.pages)
    for (const s of i.areas) {
      const r = s.name || "Area", n = j(r);
      if (t.has(n)) continue;
      t.add(n);
      const c = o(this, a, N).call(this, s), u = this._sourceConfig?.areaRules?.[n], d = !!u && ((u.groups?.length ?? 0) > 0 || (u.rules?.length ?? 0) > 0);
      e.push({ areaKey: n, areaName: r, elements: c, hasRules: d });
    }
  return e;
};
xe = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
U = async function(e, t) {
  if (!this._workflowName) return;
  const i = {
    ...this._sourceConfig?.areaRules ?? {}
  };
  t.groups.length > 0 || t.rules.length > 0 ? i[e] = t : delete i[e];
  const r = await Ze(this._workflowName, i, x(this, b));
  r && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: r });
  const n = this._extraction?.source.mediaKey;
  if (n) {
    const c = await V(this._workflowName, n, x(this, b));
    c && (this._transformResult = c);
  }
};
Z = async function(e, t, i) {
  if (!this._workflowName) return;
  const s = this._sourceConfig?.areaRules?.[e] ?? null, n = (await this.getContext(A)).open(this, ut, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: i,
      existingRules: s,
      onSave: async (c) => {
        await o(this, a, U).call(this, e, c);
      }
    }
  });
  try {
    const c = await n.onSubmit();
    c?.rules && await o(this, a, U).call(this, e, c.rules);
  } catch {
  }
};
_e = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const i = o(this, a, Q).call(this), n = await (await this.getContext(A)).open(this, it, {
    data: { mediaKey: e, totalPages: t, selectedPages: i }
  }).onSubmit().catch(() => null);
  n !== null && (n.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = o(this, a, J).call(this, n.selectedPages)), await o(this, a, fe).call(this));
};
R = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, a, D).call(this);
  await o(this, a, ee).call(this, e);
};
ee = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(de)).getLatestToken(), [s, r] = await Promise.all([
        Qe(this._workflowName, e, i),
        V(this._workflowName, e, i)
      ]);
      if (s && (this._extraction = s), r) {
        this._transformResult = r;
        const n = await le(this._workflowName, i);
        this._areaDetection = n;
        const c = r.diagnostics, u = c.roleSections > 0 ? `, ${c.roleSections} role` : "";
        this._successMessage = `Content extracted — ${c.totalSections} sections (${c.bulletListSections} bullet, ${c.paragraphSections} paragraph, ${c.subHeadedSections} sub-headed${u})`, setTimeout(() => {
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
M = function(e) {
  return this._collapsed.has(e);
};
C = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
$e = function(e) {
  return this._transformResult ? ce(this._transformResult).find((i) => i.id === e)?.included ?? !0 : !0;
};
K = async function(e, t) {
  if (!this._workflowName) return;
  const i = await et(this._workflowName, e, t, x(this, b));
  i && (this._transformResult = i);
};
I = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const i of this._config.map.mappings)
    if (i.source === e && i.enabled)
      for (const s of i.destinations)
        t.push(s);
  return t;
};
F = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids) {
      const s = i.blocks.find((r) => r.key === e.blockKey);
      if (s) {
        const r = s.properties?.find((n) => n.alias === e.target);
        return `${s.label} > ${r?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((i) => i.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids)
      for (const s of i.blocks) {
        const r = s.properties?.find((n) => n.alias === e.target);
        if (r) return `${s.label} > ${r.label || r.alias}`;
      }
  return e.target;
};
we = function(e, t) {
  if (!this._areaDetection) return t;
  let i = 0;
  for (const s of this._areaDetection.pages) {
    if (s.page === e) return i + t;
    i += s.areas.length;
  }
  return i + t;
};
N = function(e) {
  const t = [];
  for (const i of e.sections)
    i.heading && t.push(i.heading), t.push(...i.children);
  return t;
};
ye = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const i = new Set(this._collapsed);
    i.delete(t), this._collapsed = i;
  }
};
ke = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await tt(
        this._workflowName,
        this._teachingAreaIndex,
        e,
        x(this, b)
      );
      this._inferenceResult = t;
    } catch (t) {
      console.error("Inference failed:", t), this._error = "Failed to infer section pattern";
    } finally {
      this._inferring = !1;
    }
  }
};
ze = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const i = { ...this._areaTemplate, areas: t }, s = await G(this._workflowName, i, x(this, b));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, a, R).call(this));
};
Ce = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const i = { ...this._areaTemplate, areas: t }, s = await G(this._workflowName, i, x(this, b));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, a, R).call(this));
};
H = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
te = function(e) {
  return j(e.name || "");
};
Me = function(e) {
  const t = o(this, a, te).call(this, e), i = this._sourceConfig?.areaRules?.[t];
  return i ? (i.groups?.length ?? 0) > 0 || (i.rules?.length ?? 0) > 0 : !1;
};
ie = function(e, t) {
  if (!this._transformResult) return [];
  const i = this._transformResult.areas.find(
    (r) => r.color === e.color && r.page === t
  );
  if (!i) return [];
  const s = [];
  for (const r of i.groups)
    s.push(...r.sections);
  return s.push(...i.sections), s;
};
w = async function(e, t = "content") {
  if (!this._workflowName || !this._config?.destination) return;
  const s = (await this.getContext(A)).open(this, dt, {
    data: {
      destination: this._config.destination,
      existingMappings: this._config.map?.mappings ?? []
    }
  });
  let r;
  try {
    r = await s.onSubmit();
  } catch {
    return;
  }
  if (!r?.selectedTargets?.length) return;
  const n = `${e.id}.${t}`, c = this._config.map?.mappings ?? [], u = {
    source: n,
    destinations: r.selectedTargets.map((k) => ({ target: k.target, blockKey: k.blockKey })),
    enabled: !0
  }, d = c.findIndex((k) => k.source === n), m = d >= 0 ? c.map((k, S) => S === d ? u : k) : [...c, u], h = {
    ...this._config.map ?? { version: "1.0", mappings: [] },
    mappings: m
  }, P = await ue(this._workflowName, h, x(this, b));
  P && (this._config = { ...this._config, map: P });
};
Pe = async function(e, t) {
  if (!this._workflowName || !this._config?.map) return;
  const i = this._config.map.mappings, s = i.findIndex((m) => m.source === e);
  if (s < 0) return;
  const n = i[s].destinations.filter(
    (m) => !(m.target === t.target && m.blockKey === t.blockKey)
  );
  let c;
  n.length === 0 ? c = i.filter((m, h) => h !== s) : c = i.map(
    (m, h) => h === s ? { ...m, destinations: n } : m
  );
  const u = { ...this._config.map, mappings: c }, d = await ue(this._workflowName, u, x(this, b));
  d && (this._config = { ...this._config, map: d });
};
Se = function(e) {
  const t = ["content", "heading", "title", "description", "summary"], i = t.some((u) => o(this, a, I).call(this, `${e.id}.${u}`).length > 0), s = `composed-${e.id}`, r = o(this, a, M).call(this, s), n = e.groupName ?? e.ruleName ?? (e.areaName ? `${e.areaName} - Section` : "Section"), c = !!e.groupName;
  return l`
			<div class="section-box">
				<div class="section-box-header" @click=${() => o(this, a, C).call(this, s)}>
					<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="section-box-label">${n}</span>
					<span class="header-spacer"></span>
					${i && r ? t.map((u) => o(this, a, _).call(this, `${e.id}.${u}`)) : p}
				</div>
				${r ? p : l`
					<div class="section-box-content">
						${c ? l`
							${e.heading ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Title</span>
										<div class="part-box-content">${y(z(e.heading))}</div>
										<div class="part-box-actions">
											${o(this, a, _).call(this, `${e.id}.title`)}
											${o(this, a, _).call(this, `${e.id}.heading`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, w).call(this, e, "title");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : p}
							${e.content ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Content</span>
										<div class="part-box-content">${y(z(e.content))}</div>
										<div class="part-box-actions">
											${o(this, a, _).call(this, `${e.id}.content`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, w).call(this, e, "content");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : p}
							${e.description ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Description</span>
										<div class="part-box-content">${y(z(e.description))}</div>
										<div class="part-box-actions">
											${o(this, a, _).call(this, `${e.id}.description`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, w).call(this, e, "description");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : p}
							${e.summary ? l`
								<div class="part-box">
									<div class="part-box-row">
										<span class="part-box-label">Summary</span>
										<div class="part-box-content">${y(z(e.summary))}</div>
										<div class="part-box-actions">
											${o(this, a, _).call(this, `${e.id}.summary`)}
											<uui-button class="md-map-btn" look="outline" compact label="Map"
												@click=${(u) => {
    u.stopPropagation(), o(this, a, w).call(this, e, "summary");
  }}>Map</uui-button>
										</div>
									</div>
								</div>
							` : p}
						` : l`
							${e.content ? l`
								<div class="part-box-row">
									<div class="part-box-content">${y(z(e.content))}</div>
									<div class="part-box-actions">
										${t.map((u) => o(this, a, _).call(this, `${e.id}.${u}`))}
										<uui-button class="md-map-btn" look="outline" compact label="Map"
											@click=${(u) => {
    u.stopPropagation(), o(this, a, w).call(this, e, "content");
  }}>Map</uui-button>
									</div>
								</div>
							` : p}
						`}
					</div>
				`}
			</div>
		`;
};
ae = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
B = function(e, t) {
  const i = t === "heading" ? "heading" : o(this, a, ae).call(this, e.text), s = i === "heading" ? "Heading" : i === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${i}">${s}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : p}
					</div>
				</div>
			</div>
		`;
};
Te = function(e, t, i, s) {
  const r = o(this, a, M).call(this, t), n = e.heading ? j(e.heading.text) : `preamble-p${i}-a${s}`, c = o(this, a, $e).call(this, n);
  if (!e.heading)
    return l`
				<div class="area-section ${c ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, a, C).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${c ? "Included" : "Excluded"}"
							?checked=${c}
							@click=${(h) => h.stopPropagation()}
							@change=${(h) => o(this, a, K).call(this, n, h.target.checked)}>
						</uui-toggle>
					</div>
					${c && !r ? l`
						${e.children.map((h) => o(this, a, B).call(this, h))}
					` : p}
				</div>
			`;
  const u = e.heading, d = e.children.length, m = d > 0;
  return l`
			<div class="area-section ${c ? "" : "excluded"}">
				<div class="section-heading" @click=${m ? () => o(this, a, C).call(this, t) : p}>
					${m ? l`<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>` : l`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="heading-text" title="${u.text}">${u.text}</span>
					${m ? l`<span class="group-count">${d} element${d !== 1 ? "s" : ""}</span>` : p}
					<uui-toggle
						label="${c ? "Included" : "Excluded"}"
						?checked=${c}
						@click=${(h) => h.stopPropagation()}
						@change=${(h) => o(this, a, K).call(this, n, h.target.checked)}>
					</uui-toggle>
				</div>
				${m && !r && c ? l`
					<div class="section-children">
						${e.children.map((h) => o(this, a, B).call(this, h))}
					</div>
				` : p}
			</div>
		`;
};
Ae = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
Re = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, i = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, s = o(this, a, ae).call(this, e.text), r = s === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${i ? "teach-matched" : ""}"
				@click=${() => o(this, a, ke).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${s}">${r}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : p}
					</div>
				</div>
			</div>
		`;
};
Ee = function() {
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
						<uui-button look="primary" color="default" label="Confirm" @click=${() => o(this, a, ze).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => o(this, a, H).call(this)}>Cancel</uui-button>
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
					<uui-button look="secondary" compact label="No Sections" @click=${() => o(this, a, Ce).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => o(this, a, H).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
Ne = function(e, t, i) {
  const s = `area-p${t}-a${i}`, r = o(this, a, we).call(this, t, i), n = this._teachingAreaIndex === r, c = n ? !1 : o(this, a, M).call(this, s), u = !this._excludedAreas.has(s), d = o(this, a, te).call(this, e), m = o(this, a, Me).call(this, e), h = m && this._transformResult ? o(this, a, ie).call(this, e, t) : [], P = m && h.length > 0, k = P ? h.length : e.sections.length, S = e.sectionPattern != null, oe = S ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, se = this._sourceConfig?.areaRules?.[d], ne = (se?.rules?.length ?? 0) + (se?.groups?.reduce(($, L) => $ + L.rules.length, 0) ?? 0);
  return l`
			<div class="detected-area ${u ? "" : "area-excluded"} ${n ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !n && o(this, a, C).call(this, s)}>
					<uui-icon class="collapse-chevron" name="${c ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-grid"></uui-icon>
					<span class="area-name">${e.name || `${i + 1}`}</span>
					${m ? l`<span class="meta-badge rules-badge">${ne} rule${ne !== 1 ? "s" : ""}</span>` : oe ? l`<span class="meta-badge structure-badge">${oe}</span>` : p}
					<span class="header-spacer"></span>
					<span class="group-count">${k} section${k !== 1 ? "s" : ""}</span>
					${n ? p : l`
						${m ? l`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${($) => {
    $.stopPropagation(), o(this, a, Z).call(this, d, e.name || "", o(this, a, N).call(this, e));
  }}
								?disabled=${this._teachingAreaIndex !== null}>
								<uui-icon name="icon-settings"></uui-icon>
								Edit Rules
							</uui-button>
						` : l`
							<uui-button
								look="outline"
								compact
								label="${S ? "Redefine Structure" : "Define Structure"}"
								@click=${($) => {
    $.stopPropagation(), o(this, a, ye).call(this, r, s);
  }}
								?disabled=${this._teachingAreaIndex !== null && !n}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${S ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${m ? p : l`
						<uui-toggle
							label="${u ? "Included" : "Excluded"}"
							?checked=${u}
							@click=${($) => $.stopPropagation()}
							@change=${() => o(this, a, Ae).call(this, s)}>
						</uui-toggle>
					`}
				</div>
				${c ? p : l`
					${n ? l`
						${o(this, a, Ee).call(this)}
						<div class="teach-elements">
							${o(this, a, N).call(this, e).map(($) => o(this, a, Re).call(this, $))}
						</div>
					` : P ? l`
						<div class="composed-sections">
							${h.map(($) => o(this, a, Se).call(this, $))}
						</div>
					` : l`
						${e.sections.map(
    ($, L) => o(this, a, Te).call(this, $, `p${t}-a${i}-s${L}`, t, i)
  )}
					`}
				`}
			</div>
		`;
};
De = function(e, t) {
  const i = `page-${e}`, s = o(this, a, M).call(this, i), r = t.length, n = t.reduce((u, d) => u + d.sections.length, 0), c = o(this, a, me).call(this, e);
  return l`
			<uui-box class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => o(this, a, C).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${s ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${n} section${n !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
				</div>
				${s ? p : l`
					${t.map((u, d) => o(this, a, Ne).call(this, u, e, d))}
				`}
			</uui-box>
		`;
};
Ie = function() {
  return this._areaDetection ? l`
			${this._areaDetection.pages.map(
    (e) => o(this, a, De).call(this, e.page, e.areas)
  )}
		` : p;
};
Le = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((i, s) => i + s.sections.length, 0), 0) : 0;
};
Oe = function() {
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
Ue = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return p;
  const i = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), s = e ? this._areaDetection.pages.length : i, n = s < i ? `${s} of ${i}` : `${i}`, c = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? o(this, a, Le).call(this) : 0, d = t ? this._extraction.source.fileName : "", m = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return l`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${m}</span>
					</div>
					<div class="box-content">
						<uui-icon name="icon-page-add" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${d}">${d}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, a, D)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-stat">${n}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${o(this, a, _e)}>
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
							${this._areaTemplate ? l`<uui-button look="primary" color="default" label="Edit Areas" @click=${o(this, a, O)}>
									<uui-icon name="icon-grid"></uui-icon>
									Edit Areas
								</uui-button>` : l`<uui-button look="primary" color="default" label="Define Areas" @click=${o(this, a, O)}>
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
									@toggle=${o(this, a, xe)}>
									<umb-popover-layout>
										${o(this, a, be).call(this).map((h) => l`
											<uui-menu-item
												label="${h.areaName}"
												@click=${() => o(this, a, Z).call(this, h.areaKey, h.areaName, h.elements)}>
												<uui-icon slot="icon" name="${h.hasRules ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
												<span slot="badge" class="section-picker-meta">${h.elements.length} el</span>
											</uui-menu-item>
										`)}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : p}
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
						@toggle=${o(this, a, ve)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, a, ge).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, T).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, a, E).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, T).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, a, E).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, T).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, a, E).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : p}
		`;
};
Ke = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, a, Ie).call(this) : p : o(this, a, Fe).call(this);
};
Fe = function() {
  if (!this._transformResult)
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = ce(this._transformResult), t = e.filter((n) => n.included), i = e.length, s = /* @__PURE__ */ new Map();
  for (const n of this._transformResult.areas) {
    const c = [];
    for (const u of n.groups) c.push(...u.sections);
    c.push(...n.sections), c.some((u) => u.included) && (s.has(n.page) || s.set(n.page, []), s.get(n.page).push(n));
  }
  const r = [...s.entries()].sort((n, c) => n[0] - c[0]);
  return l`
			${r.map(([n, c]) => o(this, a, He).call(this, n, c))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${i} sections included</span>
			</div>
		`;
};
He = function(e, t) {
  const i = `tx-page-${e}`, s = o(this, a, M).call(this, i), r = t.reduce((c, u) => {
    let d = u.sections.filter((m) => m.included).length;
    for (const m of u.groups) d += m.sections.filter((h) => h.included).length;
    return c + d;
  }, 0), n = t.length;
  return l`
			<uui-box class="page-box">
				<div slot="header" class="tree-header" @click=${() => o(this, a, C).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${s ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
				</div>
				${s ? p : l`
					${t.map((c) => o(this, a, Be).call(this, c))}
				`}
			</uui-box>
		`;
};
Be = function(e) {
  const t = `tx-area-${e.page}-${e.name}`, i = o(this, a, M).call(this, t), s = e.color || "var(--uui-color-border)", r = [];
  for (const n of e.groups) r.push(...n.sections.filter((c) => c.included));
  return r.push(...e.sections.filter((n) => n.included)), l`
			<div class="detected-area" style="border-left-color: ${s};">
				<div class="area-header" @click=${() => o(this, a, C).call(this, t)}>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e.name || "Uncategorized"}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${r.length} section${r.length !== 1 ? "s" : ""}</span>
				</div>
				${i ? p : l`
					<div class="tx-area-sections">
						${r.map((n) => o(this, a, Ve).call(this, n))}
					</div>
				`}
			</div>
		`;
};
_ = function(e) {
  const t = o(this, a, I).call(this, e);
  return t.length === 0 ? p : t.map((i) => l`<uui-tag color="positive" look="primary" class="mapped-tag" title="${o(this, a, F).call(this, i)}">
			${o(this, a, F).call(this, i)}
			<button class="unmap-x" title="Remove mapping" @click=${(s) => {
    s.stopPropagation(), o(this, a, Pe).call(this, e, i);
  }}>&times;</button>
		</uui-tag>`);
};
Ve = function(e) {
  const t = !!e.groupName, i = !!e.description, s = !!e.summary, n = ["content", "heading", "title", "description", "summary"].some((d) => o(this, a, I).call(this, `${e.id}.${d}`).length > 0), c = e.content ? z(e.content) : "", u = e.heading ? z(e.heading) : "";
  return t ? l`
			<uui-box headline="${e.groupName}" class="md-section-box ${n ? "mapped" : ""}">
				${e.heading ? l`
					<div class="md-part-block">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Title</span>
							<div class="md-part-actions">
								${o(this, a, _).call(this, `${e.id}.title`)}
								${o(this, a, _).call(this, `${e.id}.heading`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), o(this, a, w).call(this, e, "title");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${y(u)}</div>
						</div>
					</div>
				` : p}
				${c ? l`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Content</span>
							<div class="md-part-actions">
								${o(this, a, _).call(this, `${e.id}.content`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), o(this, a, w).call(this, e, "content");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${y(c)}</div>
						</div>
					</div>
				` : p}
				${i ? l`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Description</span>
							<div class="md-part-actions">
								${o(this, a, _).call(this, `${e.id}.description`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), o(this, a, w).call(this, e, "description");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${y(z(e.description))}</div>
						</div>
					</div>
				` : p}
				${s ? l`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Summary</span>
							<div class="md-part-actions">
								${o(this, a, _).call(this, `${e.id}.summary`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), o(this, a, w).call(this, e, "summary");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${y(z(e.summary))}</div>
						</div>
					</div>
				` : p}
			</uui-box>
		` : l`
				<uui-box headline="${e.ruleName || e.heading || "Content"}" class="md-section-box ${n ? "mapped" : ""}">
					<div class="md-part-row">
						<div class="md-part-content">
							${c ? l`<div class="md-section-content">${y(c)}</div>` : p}
						</div>
						<div class="md-part-actions">
							${o(this, a, _).call(this, `${e.id}.content`)}
							${o(this, a, _).call(this, `${e.id}.heading`)}
							${o(this, a, _).call(this, `${e.id}.title`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${() => o(this, a, w).call(this, e, "content")}>Map</uui-button>
						</div>
					</div>
				</uui-box>
			`;
};
Ge = function() {
  return l`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${o(this, a, D)} ?disabled=${this._extracting}>
					${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
f.styles = [
  nt,
  at`
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

			/* Transformed area section container */
			.tx-area-sections {
				padding: 0 var(--uui-size-space-3);
			}

			/* Section boxes */
			.md-section-box {
				margin-bottom: var(--uui-size-space-3);
			}

			/* Part rows within section boxes (ungrouped: horizontal layout) */
			.md-part-row {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-3) 0;
			}

			.md-part-row-bordered {
				border-top: 1px solid var(--uui-color-border);
			}

			/* Part blocks within grouped section boxes (vertical layout: label row above content) */
			.md-part-block {
				padding: var(--uui-size-space-4) 0;
			}

			.md-part-block:first-child {
				padding-top: 0;
			}

			.md-part-block-bordered {
				border-top: 1px solid var(--uui-color-border);
			}

			.md-part-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: var(--uui-size-space-2);
			}

			.md-part-content {
				flex: 1;
				min-width: 0;
				max-width: 75ch;
			}

			.md-part-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				flex-shrink: 0;
				margin-left: auto;
			}

			/* Map button — hidden by default, shown on box hover */
			.md-map-btn {
				opacity: 0;
				transition: opacity 0.15s;
			}

			.md-section-box:hover .md-map-btn,
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
g([
  v()
], f.prototype, "_extraction", 2);
g([
  v()
], f.prototype, "_areaDetection", 2);
g([
  v()
], f.prototype, "_config", 2);
g([
  v()
], f.prototype, "_workflowName", 2);
g([
  v()
], f.prototype, "_loading", 2);
g([
  v()
], f.prototype, "_extracting", 2);
g([
  v()
], f.prototype, "_error", 2);
g([
  v()
], f.prototype, "_successMessage", 2);
g([
  v()
], f.prototype, "_collapsed", 2);
g([
  v()
], f.prototype, "_transformResult", 2);
g([
  v()
], f.prototype, "_viewMode", 2);
g([
  v()
], f.prototype, "_sourceConfig", 2);
g([
  v()
], f.prototype, "_pageMode", 2);
g([
  v()
], f.prototype, "_pageInputValue", 2);
g([
  v()
], f.prototype, "_collapsePopoverOpen", 2);
g([
  v()
], f.prototype, "_excludedAreas", 2);
g([
  v()
], f.prototype, "_areaTemplate", 2);
g([
  v()
], f.prototype, "_sectionPickerOpen", 2);
g([
  v()
], f.prototype, "_teachingAreaIndex", 2);
g([
  v()
], f.prototype, "_inferenceResult", 2);
g([
  v()
], f.prototype, "_inferring", 2);
f = g([
  ot("up-doc-workflow-source-view")
], f);
const Ct = f;
export {
  f as UpDocWorkflowSourceViewElement,
  Ct as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-Dk0ELoVY.js.map
