import { d as Ge, g as re, b as je, h as We, i as qe, j as Xe, k as V, l as Je, s as G, m as ce, n as Qe, o as Ye, u as Ze, p as et } from "./workflow.service-CCTLt2Zy.js";
import { m as A, n as j } from "./transforms-deUehta3.js";
import { UmbModalToken as W, UMB_MODAL_MANAGER_CONTEXT as R } from "@umbraco-cms/backoffice/modal";
import { U as tt } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as l, nothing as p, unsafeHTML as M, css as at, state as v, customElement as it } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as st } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ot } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as le } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as nt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as rt } from "@umbraco-cms/backoffice/media";
const ct = new W(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), lt = new W(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), ut = new W("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "medium"
  }
});
var dt = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, ue = (e) => {
  throw TypeError(e);
}, g = (e, t, a, o) => {
  for (var n = o > 1 ? void 0 : o ? pt(t, a) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (n = (o ? c(t, a, n) : c(n)) || n);
  return o && n && dt(t, a, n), n;
}, q = (e, t, a) => t.has(e) || ue("Cannot " + a), _ = (e, t, a) => (q(e, t, "read from private field"), a ? a.call(e) : t.get(e)), ne = (e, t, a) => t.has(e) ? ue("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), ht = (e, t, a, o) => (q(e, t, "write to private field"), t.set(e, a), a), s = (e, t, a) => (q(e, t, "access private method"), a), b, i, de, X, J, Q, pe, he, Y, S, E, me, fe, N, O, ge, ve, U, Z, be, T, ee, k, y, _e, K, I, F, xe, D, $e, we, ye, ke, H, te, ze, Ce, z, Pe, Me, ae, B, Se, Re, Te, Ae, Ee, De, Ne, Ie, Le, Oe, Ue, Ke, Fe, He, $, Be, Ve;
let m = class extends st {
  constructor() {
    super(...arguments), ne(this, i), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, ne(this, b, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(nt, (e) => {
      e && (e.setSaveHandler(() => s(this, i, T).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), s(this, i, de).call(this));
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
				${e ? s(this, i, Le).call(this) : p}
				${e && this._viewMode === "elements" ? s(this, i, Oe).call(this) : p}
				${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : p}
				${e ? s(this, i, Ue).call(this) : s(this, i, Ve).call(this)}
			</umb-body-layout>
		`;
  }
};
b = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
de = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(le);
      ht(this, b, await e.getLatestToken());
      const [t, a, o, n, r, c] = await Promise.all([
        Ge(this._workflowName, _(this, b)),
        re(this._workflowName, _(this, b)),
        je(this._workflowName, _(this, b)),
        We(this._workflowName, _(this, b)),
        qe(this._workflowName, _(this, b)),
        Xe(this._workflowName, _(this, b))
      ]);
      this._extraction = t, this._areaDetection = a, this._config = o, this._transformResult = n, this._sourceConfig = r, this._areaTemplate = c;
      const u = t?.source.mediaKey;
      if (u && a) {
        const d = await V(this._workflowName, u, _(this, b));
        d && (this._transformResult = d);
      }
      r?.pages && Array.isArray(r.pages) && r.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = s(this, i, J).call(this, r.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
X = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e.split(",")) {
    const o = a.trim();
    if (!o) continue;
    const n = o.split("-").map((r) => parseInt(r.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      t.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let r = n[0]; r <= n[1]; r++)
        t.add(r);
  }
  return [...t].sort((a, o) => a - o);
};
J = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, c) => r - c), a = [];
  let o = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (a.push(o === n ? `${o}` : `${o}-${n}`), o = t[r]), n = t[r];
  return a.push(o === n ? `${o}` : `${o}-${n}`), a.join(", ");
};
Q = function() {
  if (this._pageMode === "all") return null;
  const e = s(this, i, X).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
pe = function(e) {
  if (this._pageMode === "all") return !0;
  const t = s(this, i, X).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
he = async function() {
  if (!this._workflowName) return;
  const e = s(this, i, Q).call(this);
  await Qe(this._workflowName, e, _(this, b));
};
Y = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const a of this._areaDetection.pages) {
    const o = a.page;
    e === "pages" && t.push(`page-${o}`), e === "areas" && a.areas.forEach((n, r) => t.push(`area-p${o}-a${r}`)), e === "sections" && a.areas.forEach((n, r) => {
      n.sections.forEach((c, u) => t.push(`p${o}-a${r}-s${u}`));
    });
  }
  return t;
};
S = function(e) {
  const t = s(this, i, Y).call(this, e);
  return t.length > 0 && t.every((a) => this._collapsed.has(a));
};
E = function(e) {
  const t = s(this, i, Y).call(this, e), a = s(this, i, S).call(this, e), o = new Set(this._collapsed);
  for (const n of t)
    a ? o.delete(n) : o.add(n);
  this._collapsed = o;
};
me = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
fe = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
N = async function() {
  if (!this._workflowName) return;
  const a = await (await this.getContext(R)).open(this, rt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const o = a.selection[0];
  o && await s(this, i, ee).call(this, o);
};
O = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(R)).open(this, ct, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const a = await t.onSubmit();
    if (a?.template) {
      const o = await G(this._workflowName, a.template, _(this, b));
      o && (this._areaTemplate = o, await s(this, i, T).call(this));
    }
  } catch {
  }
};
ge = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const a of this._areaDetection.pages)
    for (const o of a.areas) {
      const n = o.name || "Area", r = j(n);
      if (t.has(r)) continue;
      t.add(r);
      const c = s(this, i, D).call(this, o), u = this._sourceConfig?.areaRules?.[r], d = !!u && ((u.groups?.length ?? 0) > 0 || (u.rules?.length ?? 0) > 0);
      e.push({ areaKey: r, areaName: n, elements: c, hasRules: d });
    }
  return e;
};
ve = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
U = async function(e, t) {
  if (!this._workflowName) return;
  const a = {
    ...this._sourceConfig?.areaRules ?? {}
  };
  t.groups.length > 0 || t.rules.length > 0 ? a[e] = t : delete a[e];
  const n = await Ye(this._workflowName, a, _(this, b));
  n && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: n });
  const r = this._extraction?.source.mediaKey;
  if (r) {
    const c = await V(this._workflowName, r, _(this, b));
    c && (this._transformResult = c);
  }
};
Z = async function(e, t, a) {
  if (!this._workflowName) return;
  const o = this._sourceConfig?.areaRules?.[e] ?? null, r = (await this.getContext(R)).open(this, lt, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: a,
      existingRules: o,
      onSave: async (c) => {
        await s(this, i, U).call(this, e, c);
      }
    }
  });
  try {
    const c = await r.onSubmit();
    c?.rules && await s(this, i, U).call(this, e, c.rules);
  } catch {
  }
};
be = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const a = s(this, i, Q).call(this), r = await (await this.getContext(R)).open(this, tt, {
    data: { mediaKey: e, totalPages: t, selectedPages: a }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = s(this, i, J).call(this, r.selectedPages)), await s(this, i, he).call(this));
};
T = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return s(this, i, N).call(this);
  await s(this, i, ee).call(this, e);
};
ee = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const a = await (await this.getContext(le)).getLatestToken(), [o, n] = await Promise.all([
        Je(this._workflowName, e, a),
        V(this._workflowName, e, a)
      ]);
      if (o && (this._extraction = o), n) {
        this._transformResult = n;
        const r = await re(this._workflowName, a);
        this._areaDetection = r;
        const c = n.diagnostics, u = c.roleSections > 0 ? `, ${c.roleSections} role` : "";
        this._successMessage = `Content extracted — ${c.totalSections} sections (${c.bulletListSections} bullet, ${c.paragraphSections} paragraph, ${c.subHeadedSections} sub-headed${u})`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else o ? (this._successMessage = `Content extracted — ${o.elements.length} elements (transform unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Extraction failed", console.error("Extraction failed:", t);
    } finally {
      this._extracting = !1;
    }
  }
};
k = function(e) {
  return this._collapsed.has(e);
};
y = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
_e = function(e) {
  return this._transformResult ? this._transformResult.sections.find((a) => a.id === e)?.included ?? !0 : !0;
};
K = async function(e, t) {
  if (!this._workflowName) return;
  const a = await Ze(this._workflowName, e, t, _(this, b));
  a && (this._transformResult = a);
};
I = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const a of this._config.map.mappings)
    if (a.source === e && a.enabled)
      for (const o of a.destinations)
        t.push(o);
  return t;
};
F = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const o = a.blocks.find((n) => n.key === e.blockKey);
      if (o) {
        const n = o.properties?.find((r) => r.alias === e.target);
        return `${o.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((a) => a.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const o of a.blocks) {
        const n = o.properties?.find((r) => r.alias === e.target);
        if (n) return `${o.label} > ${n.label || n.alias}`;
      }
  return e.target;
};
xe = function(e, t) {
  if (!this._areaDetection) return t;
  let a = 0;
  for (const o of this._areaDetection.pages) {
    if (o.page === e) return a + t;
    a += o.areas.length;
  }
  return a + t;
};
D = function(e) {
  const t = [];
  for (const a of e.sections)
    a.heading && t.push(a.heading), t.push(...a.children);
  return t;
};
$e = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const a = new Set(this._collapsed);
    a.delete(t), this._collapsed = a;
  }
};
we = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await et(
        this._workflowName,
        this._teachingAreaIndex,
        e,
        _(this, b)
      );
      this._inferenceResult = t;
    } catch (t) {
      console.error("Inference failed:", t), this._error = "Failed to infer section pattern";
    } finally {
      this._inferring = !1;
    }
  }
};
ye = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const a = { ...this._areaTemplate, areas: t }, o = await G(this._workflowName, a, _(this, b));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, i, T).call(this));
};
ke = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const a = { ...this._areaTemplate, areas: t }, o = await G(this._workflowName, a, _(this, b));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, i, T).call(this));
};
H = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
te = function(e) {
  return j(e.name || "");
};
ze = function(e) {
  const t = s(this, i, te).call(this, e), a = this._sourceConfig?.areaRules?.[t];
  return a ? (a.groups?.length ?? 0) > 0 || (a.rules?.length ?? 0) > 0 : !1;
};
Ce = function(e, t) {
  return this._transformResult ? this._transformResult.sections.filter(
    (a) => a.areaColor === e.color && a.page === t
  ) : [];
};
z = async function(e, t = "content") {
  if (!this._workflowName || !this._config?.destination) return;
  const o = (await this.getContext(R)).open(this, ut, {
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
    destinations: n.selectedTargets.map((w) => ({ target: w.target, blockKey: w.blockKey })),
    enabled: !0
  }, d = c.findIndex((w) => w.source === r), f = d >= 0 ? c.map((w, P) => P === d ? u : w) : [...c, u], h = {
    ...this._config.map ?? { version: "1.0", mappings: [] },
    mappings: f
  }, C = await ce(this._workflowName, h, _(this, b));
  C && (this._config = { ...this._config, map: C });
};
Pe = async function(e, t) {
  if (!this._workflowName || !this._config?.map) return;
  const a = this._config.map.mappings, o = a.findIndex((f) => f.source === e);
  if (o < 0) return;
  const r = a[o].destinations.filter(
    (f) => !(f.target === t.target && f.blockKey === t.blockKey)
  );
  let c;
  r.length === 0 ? c = a.filter((f, h) => h !== o) : c = a.map(
    (f, h) => h === o ? { ...f, destinations: r } : f
  );
  const u = { ...this._config.map, mappings: c }, d = await ce(this._workflowName, u, _(this, b));
  d && (this._config = { ...this._config, map: d });
};
Me = function(e) {
  const t = ["content", "heading", "title", "description", "summary"], a = t.some((r) => s(this, i, I).call(this, `${e.id}.${r}`).length > 0), o = `composed-${e.id}`, n = s(this, i, k).call(this, o);
  return l`
			<div class="composed-section-row">
				<div class="composed-section-header" @click=${() => s(this, i, y).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="composed-role">Section – ${e.heading ?? "Content"}</span>
					<span class="header-spacer"></span>
					${a ? t.map((r) => s(this, i, $).call(this, `${e.id}.${r}`)) : p}
				</div>
				${n ? p : l`
					<div class="composed-section-content">${e.content}</div>
				`}
			</div>
		`;
};
ae = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
B = function(e, t) {
  const a = t === "heading" ? "heading" : s(this, i, ae).call(this, e.text), o = a === "heading" ? "Heading" : a === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${a}">${o}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : p}
					</div>
				</div>
			</div>
		`;
};
Se = function(e, t, a, o) {
  const n = s(this, i, k).call(this, t), r = e.heading ? j(e.heading.text) : `preamble-p${a}-a${o}`, c = s(this, i, _e).call(this, r);
  if (!e.heading)
    return l`
				<div class="area-section ${c ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => s(this, i, y).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${c ? "Included" : "Excluded"}"
							?checked=${c}
							@click=${(h) => h.stopPropagation()}
							@change=${(h) => s(this, i, K).call(this, r, h.target.checked)}>
						</uui-toggle>
					</div>
					${c && !n ? l`
						${e.children.map((h) => s(this, i, B).call(this, h))}
					` : p}
				</div>
			`;
  const u = e.heading, d = e.children.length, f = d > 0;
  return l`
			<div class="area-section ${c ? "" : "excluded"}">
				<div class="section-heading" @click=${f ? () => s(this, i, y).call(this, t) : p}>
					${f ? l`<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>` : l`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<span class="section-label">Section</span>
					<span class="section-separator">–</span>
					<span class="heading-text" title="${u.text}">${u.text}</span>
					${f ? l`<span class="group-count">${d} element${d !== 1 ? "s" : ""}</span>` : p}
					<uui-toggle
						label="${c ? "Included" : "Excluded"}"
						?checked=${c}
						@click=${(h) => h.stopPropagation()}
						@change=${(h) => s(this, i, K).call(this, r, h.target.checked)}>
					</uui-toggle>
				</div>
				${f && !n && c ? l`
					<div class="section-children">
						${e.children.map((h) => s(this, i, B).call(this, h))}
					</div>
				` : p}
			</div>
		`;
};
Re = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
Te = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, a = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, o = s(this, i, ae).call(this, e.text), n = o === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${a ? "teach-matched" : ""}"
				@click=${() => s(this, i, we).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${o}">${n}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : p}
					</div>
				</div>
			</div>
		`;
};
Ae = function() {
  if (this._inferenceResult) {
    const e = this._inferenceResult.matchingElementIds.length, t = this._inferenceResult.pattern.conditions.map((a) => `${a.type}: ${a.value}`).join(", ");
    return l`
				<div class="teach-confirmation">
					<div class="teach-confirmation-info">
						<uui-icon name="icon-check" style="color: var(--uui-color-positive);"></uui-icon>
						<span>Found <strong>${e}</strong> matching element${e !== 1 ? "s" : ""}</span>
						<span class="teach-condition-summary">${t}</span>
					</div>
					<div class="teach-confirmation-actions">
						<uui-button look="primary" color="default" label="Confirm" @click=${() => s(this, i, ye).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => s(this, i, H).call(this)}>Cancel</uui-button>
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
					<uui-button look="secondary" compact label="No Sections" @click=${() => s(this, i, ke).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => s(this, i, H).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
Ee = function(e, t, a) {
  const o = `area-p${t}-a${a}`, n = s(this, i, xe).call(this, t, a), r = this._teachingAreaIndex === n, c = r ? !1 : s(this, i, k).call(this, o), u = !this._excludedAreas.has(o), d = s(this, i, te).call(this, e), f = s(this, i, ze).call(this, e), h = f && this._transformResult ? s(this, i, Ce).call(this, e, t) : [], C = f && h.length > 0, w = C ? h.length : e.sections.length, P = e.sectionPattern != null, ie = P ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, se = this._sourceConfig?.areaRules?.[d], oe = (se?.rules?.length ?? 0) + (se?.groups?.reduce((x, L) => x + L.rules.length, 0) ?? 0);
  return l`
			<div class="detected-area ${u ? "" : "area-excluded"} ${r ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !r && s(this, i, y).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${c ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">Area – ${e.name || `${a + 1}`}</span>
					${f ? l`<span class="meta-badge rules-badge">${oe} rule${oe !== 1 ? "s" : ""}</span>` : ie ? l`<span class="meta-badge structure-badge">${ie}</span>` : p}
					<span class="header-spacer"></span>
					<span class="group-count">${w} section${w !== 1 ? "s" : ""}</span>
					${r ? p : l`
						${f ? l`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${(x) => {
    x.stopPropagation(), s(this, i, Z).call(this, d, e.name || "", s(this, i, D).call(this, e));
  }}
								?disabled=${this._teachingAreaIndex !== null}>
								<uui-icon name="icon-settings"></uui-icon>
								Edit Rules
							</uui-button>
						` : l`
							<uui-button
								look="outline"
								compact
								label="${P ? "Redefine Structure" : "Define Structure"}"
								@click=${(x) => {
    x.stopPropagation(), s(this, i, $e).call(this, n, o);
  }}
								?disabled=${this._teachingAreaIndex !== null && !r}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${P ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${f ? p : l`
						<uui-toggle
							label="${u ? "Included" : "Excluded"}"
							?checked=${u}
							@click=${(x) => x.stopPropagation()}
							@change=${() => s(this, i, Re).call(this, o)}>
						</uui-toggle>
					`}
				</div>
				${c ? p : l`
					${r ? l`
						${s(this, i, Ae).call(this)}
						<div class="teach-elements">
							${s(this, i, D).call(this, e).map((x) => s(this, i, Te).call(this, x))}
						</div>
					` : C ? l`
						<div class="composed-sections">
							${h.map((x) => s(this, i, Me).call(this, x))}
						</div>
					` : l`
						${e.sections.map(
    (x, L) => s(this, i, Se).call(this, x, `p${t}-a${a}-s${L}`, t, a)
  )}
					`}
				`}
			</div>
		`;
};
De = function(e, t) {
  const a = `page-${e}`, o = s(this, i, k).call(this, a), n = t.length, r = t.reduce((u, d) => u + d.sections.length, 0), c = s(this, i, pe).call(this, e);
  return l`
			<uui-box class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => s(this, i, y).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${o ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
				</div>
				${o ? p : l`
					${t.map((u, d) => s(this, i, Ee).call(this, u, e, d))}
				`}
			</uui-box>
		`;
};
Ne = function() {
  return this._areaDetection ? l`
			${this._areaDetection.pages.map(
    (e) => s(this, i, De).call(this, e.page, e.areas)
  )}
		` : p;
};
Ie = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((a, o) => a + o.sections.length, 0), 0) : 0;
};
Le = function() {
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
Oe = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return p;
  const a = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), o = e ? this._areaDetection.pages.length : a, r = o < a ? `${o} of ${a}` : `${a}`, c = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? s(this, i, Ie).call(this) : 0, d = t ? this._extraction.source.fileName : "", f = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return l`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${d}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${f}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${s(this, i, N)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${r}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${s(this, i, be)}>
								<uui-icon name="icon-thumbnails-small"></uui-icon>
								Choose Pages
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${this._areaTemplate ? this._areaTemplate.areas.length : c}</span>
						<div class="box-buttons">
							${this._areaTemplate ? l`<uui-button look="primary" color="default" label="Edit Areas" @click=${s(this, i, O)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : l`<uui-button look="primary" color="default" label="Define Areas" @click=${s(this, i, O)}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${u}</span>
						${this._transformResult && this._areaDetection ? l`
							<div class="box-buttons">
								<uui-button
									look="primary"
									color="default"
									label="Edit Sections"
									popovertarget="section-picker-popover">
									<uui-icon name="icon-settings"></uui-icon>
									Edit Sections
									<uui-symbol-expand .open=${this._sectionPickerOpen}></uui-symbol-expand>
								</uui-button>
								<uui-popover-container
									id="section-picker-popover"
									placement="bottom-end"
									@toggle=${s(this, i, ve)}>
									<umb-popover-layout>
										${s(this, i, ge).call(this).map((h) => l`
											<uui-menu-item
												label="${h.areaName}"
												@click=${() => s(this, i, Z).call(this, h.areaKey, h.areaName, h.elements)}>
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
						@toggle=${s(this, i, fe)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => s(this, i, me).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, i, S).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => s(this, i, E).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, i, S).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => s(this, i, E).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, i, S).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => s(this, i, E).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : p}
		`;
};
Ue = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? s(this, i, Ne).call(this) : p : s(this, i, Ke).call(this);
};
Ke = function() {
  if (!this._transformResult)
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = this._transformResult.sections.filter((n) => n.included), t = this._transformResult.sections.length, a = /* @__PURE__ */ new Map();
  for (const n of e) {
    a.has(n.page) || a.set(n.page, /* @__PURE__ */ new Map());
    const r = a.get(n.page), c = n.areaName || "Uncategorized";
    r.has(c) || r.set(c, []), r.get(c).push(n);
  }
  const o = [...a.entries()].sort((n, r) => n[0] - r[0]);
  return l`
			${o.map(([n, r]) => s(this, i, Fe).call(this, n, r))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
			</div>
		`;
};
Fe = function(e, t) {
  const a = `tx-page-${e}`, o = s(this, i, k).call(this, a), n = [...t.values()].reduce((c, u) => c + u.length, 0), r = t.size;
  return l`
			<uui-box class="page-box">
				<div slot="header" class="tree-header" @click=${() => s(this, i, y).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${o ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${n} section${n !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
				</div>
				${o ? p : l`
					${[...t.entries()].map(
    ([c, u]) => s(this, i, He).call(this, c, u, e)
  )}
				`}
			</uui-box>
		`;
};
He = function(e, t, a) {
  const o = `tx-area-${a}-${e}`, n = s(this, i, k).call(this, o), r = t[0]?.areaColor || "var(--uui-color-border)";
  return l`
			<div class="detected-area" style="border-left-color: ${r};">
				<div class="area-header" @click=${() => s(this, i, y).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${t.length} section${t.length !== 1 ? "s" : ""}</span>
				</div>
				${n ? p : l`
					<div class="tx-area-sections">
						${t.map((c) => s(this, i, Be).call(this, c))}
					</div>
				`}
			</div>
		`;
};
$ = function(e) {
  const t = s(this, i, I).call(this, e);
  return t.length === 0 ? p : t.map((a) => l`<uui-tag color="positive" look="primary" class="mapped-tag" title="${s(this, i, F).call(this, a)}">
			${s(this, i, F).call(this, a)}
			<button class="unmap-x" title="Remove mapping" @click=${(o) => {
    o.stopPropagation(), s(this, i, Pe).call(this, e, a);
  }}>&times;</button>
		</uui-tag>`);
};
Be = function(e) {
  const t = !!e.groupName, a = !!e.description, o = !!e.summary, r = ["content", "heading", "title", "description", "summary"].some((d) => s(this, i, I).call(this, `${e.id}.${d}`).length > 0), c = e.content ? A(e.content) : "", u = e.heading ? A(e.heading) : "";
  return t ? l`
			<uui-box headline="${e.groupName}" class="md-section-box ${r ? "mapped" : ""}">
				${e.heading ? l`
					<div class="md-part-block">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Title</span>
							<div class="md-part-actions">
								${s(this, i, $).call(this, `${e.id}.title`)}
								${s(this, i, $).call(this, `${e.id}.heading`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, i, z).call(this, e, "title");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${M(u)}</div>
						</div>
					</div>
				` : p}
				${c ? l`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Content</span>
							<div class="md-part-actions">
								${s(this, i, $).call(this, `${e.id}.content`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, i, z).call(this, e, "content");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${M(c)}</div>
						</div>
					</div>
				` : p}
				${a ? l`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Description</span>
							<div class="md-part-actions">
								${s(this, i, $).call(this, `${e.id}.description`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, i, z).call(this, e, "description");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${M(A(e.description))}</div>
						</div>
					</div>
				` : p}
				${o ? l`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Summary</span>
							<div class="md-part-actions">
								${s(this, i, $).call(this, `${e.id}.summary`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, i, z).call(this, e, "summary");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${M(A(e.summary))}</div>
						</div>
					</div>
				` : p}
			</uui-box>
		` : l`
				<uui-box headline="${e.heading || "Content"}" class="md-section-box ${r ? "mapped" : ""}">
					<div class="md-part-row">
						<div class="md-part-content">
							${c ? l`<div class="md-section-content">${M(c)}</div>` : p}
						</div>
						<div class="md-part-actions">
							${s(this, i, $).call(this, `${e.id}.content`)}
							${s(this, i, $).call(this, `${e.id}.heading`)}
							${s(this, i, $).call(this, `${e.id}.title`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${() => s(this, i, z).call(this, e, "content")}>Map</uui-button>
						</div>
					</div>
				</uui-box>
			`;
};
Ve = function() {
  return l`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${s(this, i, N)} ?disabled=${this._extracting}>
					${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
m.styles = [
  ot,
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

			.section-label {
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text);
				font-weight: 700;
			}

			.section-separator {
				color: var(--uui-color-text-alt);
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

			/* Composed sections (Phase 1b — areas with rules) */
			.composed-sections {
				margin-left: var(--uui-size-space-3);
			}

			.composed-section-row {
				display: flex;
				flex-direction: column;
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.composed-section-row:last-child {
				border-bottom: none;
			}

			.composed-section-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
			}

			.composed-section-header:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.composed-section-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.composed-role {
				font-weight: 600;
				color: var(--uui-color-text);
				flex-shrink: 0;
			}

			.composed-section-content {
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text-alt);
				padding: var(--uui-size-space-2) var(--uui-size-space-3) var(--uui-size-space-3);
				padding-left: calc(var(--uui-size-space-3) + 12px + var(--uui-size-space-2));
				white-space: pre-line;
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

			.md-section-box:hover .md-map-btn {
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
], m.prototype, "_extraction", 2);
g([
  v()
], m.prototype, "_areaDetection", 2);
g([
  v()
], m.prototype, "_config", 2);
g([
  v()
], m.prototype, "_workflowName", 2);
g([
  v()
], m.prototype, "_loading", 2);
g([
  v()
], m.prototype, "_extracting", 2);
g([
  v()
], m.prototype, "_error", 2);
g([
  v()
], m.prototype, "_successMessage", 2);
g([
  v()
], m.prototype, "_collapsed", 2);
g([
  v()
], m.prototype, "_transformResult", 2);
g([
  v()
], m.prototype, "_viewMode", 2);
g([
  v()
], m.prototype, "_sourceConfig", 2);
g([
  v()
], m.prototype, "_pageMode", 2);
g([
  v()
], m.prototype, "_pageInputValue", 2);
g([
  v()
], m.prototype, "_collapsePopoverOpen", 2);
g([
  v()
], m.prototype, "_excludedAreas", 2);
g([
  v()
], m.prototype, "_areaTemplate", 2);
g([
  v()
], m.prototype, "_sectionPickerOpen", 2);
g([
  v()
], m.prototype, "_teachingAreaIndex", 2);
g([
  v()
], m.prototype, "_inferenceResult", 2);
g([
  v()
], m.prototype, "_inferring", 2);
m = g([
  it("up-doc-workflow-source-view")
], m);
const kt = m;
export {
  m as UpDocWorkflowSourceViewElement,
  kt as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-C2oaVbWK.js.map
