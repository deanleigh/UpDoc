import { d as Ae, g as X, b as Ie, h as Re, i as De, j as Ne, k as Le, l as Oe, s as U, m as Ue, n as Ve, o as Fe, u as He, p as Be } from "./workflow.service-D_fkSdCh.js";
import { n as q, m as Ke } from "./transforms-deUehta3.js";
import { UmbModalToken as V, UMB_MODAL_MANAGER_CONTEXT as z } from "@umbraco-cms/backoffice/modal";
import { U as Ge } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as c, nothing as g, css as We, state as f, customElement as je } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Xe } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as qe } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as J } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Je } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as Qe } from "@umbraco-cms/backoffice/media";
const Ye = new V("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
}), Ze = new V(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), et = new V(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var tt = Object.defineProperty, at = Object.getOwnPropertyDescriptor, Q = (e) => {
  throw TypeError(e);
}, h = (e, t, a, o) => {
  for (var n = o > 1 ? void 0 : o ? at(t, a) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (n = (o ? l(t, a, n) : l(n)) || n);
  return o && n && tt(t, a, n), n;
}, F = (e, t, a) => t.has(e) || Q("Cannot " + a), v = (e, t, a) => (F(e, t, "read from private field"), a ? a.call(e) : t.get(e)), j = (e, t, a) => t.has(e) ? Q("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), it = (e, t, a, o) => (F(e, t, "write to private field"), t.set(e, a), a), s = (e, t, a) => (F(e, t, "access private method"), a), m, i, Y, w, $, H, Z, ee, S, te, ae, C, B, y, M, ie, se, A, R, oe, ne, re, le, P, K, I, k, ce, D, N, T, ue, pe, G, de, he, ge, fe, L, W, E, me, _e, ve, be, xe, $e, we, ye, ke, ze, Ce, Pe, O, Se, Me, Ee;
let p = class extends Xe {
  constructor() {
    super(...arguments), j(this, i), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, j(this, m, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Je, (e) => {
      e && (e.setSaveHandler(() => s(this, i, P).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), s(this, i, Y).call(this));
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
    const e = this._areaDetection !== null || this._extraction !== null;
    return c`
			<umb-body-layout header-fit-height>
				${e ? s(this, i, ze).call(this) : g}
				${e && this._viewMode === "elements" ? s(this, i, Ce).call(this) : g}
				${this._successMessage ? c`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : g}
				${e ? s(this, i, Pe).call(this) : s(this, i, Ee).call(this)}
			</umb-body-layout>
		`;
  }
};
m = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
Y = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(J);
      it(this, m, await e.getLatestToken());
      const [t, a, o, n, r, l] = await Promise.all([
        Ae(this._workflowName, v(this, m)),
        X(this._workflowName, v(this, m)),
        Ie(this._workflowName, v(this, m)),
        Re(this._workflowName, v(this, m)),
        De(this._workflowName, v(this, m)),
        Ne(this._workflowName, v(this, m))
      ]);
      this._extraction = t, this._areaDetection = a, this._config = o, this._transformResult = n, this._sourceConfig = r, this._areaTemplate = l, r?.pages && Array.isArray(r.pages) && r.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = s(this, i, $).call(this, r.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
w = function(e) {
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
$ = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, l) => r - l), a = [];
  let o = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (a.push(o === n ? `${o}` : `${o}-${n}`), o = t[r]), n = t[r];
  return a.push(o === n ? `${o}` : `${o}-${n}`), a.join(", ");
};
H = function() {
  if (this._pageMode === "all") return null;
  const e = s(this, i, w).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
Z = function(e) {
  if (this._pageMode === "all") return !0;
  const t = s(this, i, w).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
ee = function(e) {
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t !== 0) {
    if (this._pageMode === "all") {
      const o = Array.from({ length: t }, (n, r) => r + 1).filter((n) => n !== e);
      this._pageMode = "custom", this._pageInputValue = s(this, i, $).call(this, o);
    } else {
      const a = s(this, i, w).call(this, this._pageInputValue);
      if (a.includes(e)) {
        const o = a.filter((n) => n !== e);
        this._pageInputValue = s(this, i, $).call(this, o), o.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const o = [...a, e].sort((n, r) => n - r);
        this._pageInputValue = s(this, i, $).call(this, o);
      }
      s(this, i, w).call(this, this._pageInputValue).length === t && (this._pageMode = "all", this._pageInputValue = "");
    }
    s(this, i, C).call(this);
  }
};
S = async function(e) {
  this._pageMode = e, e === "all" && (this._pageInputValue = ""), await s(this, i, C).call(this);
};
te = async function(e) {
  const t = e.target;
  this._pageInputValue = t.value;
};
ae = async function() {
  const e = s(this, i, w).call(this, this._pageInputValue);
  e.length > 0 ? (this._pageInputValue = s(this, i, $).call(this, e), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await s(this, i, C).call(this);
};
C = async function() {
  if (!this._workflowName) return;
  const e = s(this, i, H).call(this);
  await Ve(this._workflowName, e, v(this, m));
};
B = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const a of this._areaDetection.pages) {
    const o = a.page;
    e === "pages" && t.push(`page-${o}`), e === "areas" && a.areas.forEach((n, r) => t.push(`area-p${o}-a${r}`)), e === "sections" && a.areas.forEach((n, r) => {
      n.sections.forEach((l, u) => t.push(`p${o}-a${r}-s${u}`));
    });
  }
  return t;
};
y = function(e) {
  const t = s(this, i, B).call(this, e);
  return t.length > 0 && t.every((a) => this._collapsed.has(a));
};
M = function(e) {
  const t = s(this, i, B).call(this, e), a = s(this, i, y).call(this, e), o = new Set(this._collapsed);
  for (const n of t)
    a ? o.delete(n) : o.add(n);
  this._collapsed = o;
};
ie = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
se = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
A = async function() {
  if (!this._workflowName) return;
  const a = await (await this.getContext(z)).open(this, Qe, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const o = a.selection[0];
  o && await s(this, i, K).call(this, o);
};
R = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(z)).open(this, Ze, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const a = await t.onSubmit();
    if (a?.template) {
      const o = await U(this._workflowName, a.template, v(this, m));
      o && (this._areaTemplate = o, await s(this, i, P).call(this));
    }
  } catch {
  }
};
oe = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const a of this._areaDetection.pages)
    for (const o of a.areas) {
      const n = o.name || "Area", r = q(n);
      if (t.has(r)) continue;
      t.add(r);
      const l = s(this, i, G).call(this, o), u = !!this._sourceConfig?.areaRules?.[r]?.rules?.length;
      e.push({ areaKey: r, areaName: n, elements: l, hasRules: u });
    }
  return e;
};
ne = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
re = async function(e, t, a) {
  if (!this._workflowName) return;
  const o = this._sourceConfig?.areaRules?.[e] ?? null, r = (await this.getContext(z)).open(this, et, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: a,
      existingRules: o
    }
  });
  try {
    const l = await r.onSubmit();
    if (l?.rules) {
      const u = {
        ...this._sourceConfig?.areaRules ?? {}
      };
      l.rules.rules.length > 0 ? u[e] = l.rules : delete u[e];
      const _ = await Ue(this._workflowName, u, v(this, m));
      _ && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: _ });
    }
  } catch {
  }
};
le = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const a = s(this, i, H).call(this), r = await (await this.getContext(z)).open(this, Ge, {
    data: { mediaKey: e, totalPages: t, selectedPages: a }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = s(this, i, $).call(this, r.selectedPages)), await s(this, i, C).call(this));
};
P = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return s(this, i, A).call(this);
  await s(this, i, K).call(this, e);
};
K = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const a = await (await this.getContext(J)).getLatestToken(), [o, n] = await Promise.all([
        Le(this._workflowName, e, a),
        Oe(this._workflowName, e, a)
      ]);
      if (o && (this._extraction = o), n) {
        this._transformResult = n;
        const r = await X(this._workflowName, a);
        this._areaDetection = r;
        const l = n.diagnostics, u = l.roleSections > 0 ? `, ${l.roleSections} role` : "";
        this._successMessage = `Content extracted — ${l.totalSections} sections (${l.bulletListSections} bullet, ${l.paragraphSections} paragraph, ${l.subHeadedSections} sub-headed${u})`, setTimeout(() => {
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
I = function(e) {
  return this._collapsed.has(e);
};
k = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
ce = function(e) {
  return this._transformResult ? this._transformResult.sections.find((a) => a.id === e)?.included ?? !0 : !0;
};
D = async function(e, t) {
  if (!this._workflowName) return;
  const a = await He(this._workflowName, e, t, v(this, m));
  a && (this._transformResult = a);
};
N = async function(e) {
  if (!this._config?.destination || !this._workflowName) return;
  const o = await (await this.getContext(z)).open(this, Ye, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!o?.selectedTargets?.length) return;
  const n = [...this._config.map?.mappings ?? []], r = n.findIndex((d) => d.source === e), l = {
    source: e,
    destinations: o.selectedTargets.map((d) => ({ target: d.target, blockKey: d.blockKey })),
    enabled: !0
  };
  r >= 0 ? n[r] = l : n.push(l);
  const u = { ...this._config.map, version: this._config.map?.version ?? "1.0", mappings: n };
  await Fe(this._workflowName, u, v(this, m)) && (this._config = { ...this._config, map: u });
};
T = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const a of this._config.map.mappings)
    if (a.source === e && a.enabled)
      for (const o of a.destinations)
        t.push(o);
  return t;
};
ue = function(e) {
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
pe = function(e, t) {
  if (!this._areaDetection) return t;
  let a = 0;
  for (const o of this._areaDetection.pages) {
    if (o.page === e) return a + t;
    a += o.areas.length;
  }
  return a + t;
};
G = function(e) {
  const t = [];
  for (const a of e.sections)
    a.heading && t.push(a.heading), t.push(...a.children);
  return t;
};
de = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const a = new Set(this._collapsed);
    a.delete(t), this._collapsed = a;
  }
};
he = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await Be(
        this._workflowName,
        this._teachingAreaIndex,
        e,
        v(this, m)
      );
      this._inferenceResult = t;
    } catch (t) {
      console.error("Inference failed:", t), this._error = "Failed to infer section pattern";
    } finally {
      this._inferring = !1;
    }
  }
};
ge = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const a = { ...this._areaTemplate, areas: t }, o = await U(this._workflowName, a, v(this, m));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, i, P).call(this));
};
fe = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const a = { ...this._areaTemplate, areas: t }, o = await U(this._workflowName, a, v(this, m));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, i, P).call(this));
};
L = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
W = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
E = function(e, t) {
  const a = t === "heading" ? "heading" : s(this, i, W).call(this, e.text), o = a === "heading" ? "Heading" : a === "list" ? "List Item" : "Paragraph";
  return c`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${a}">${o}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? c`<span class="meta-badge text-case">UPPERCASE</span>` : g}
					</div>
				</div>
			</div>
		`;
};
me = function(e, t, a, o) {
  const n = s(this, i, I).call(this, t), r = e.heading ? q(e.heading.text) : `preamble-p${a}-a${o}`, l = s(this, i, ce).call(this, r);
  if (!e.heading)
    return c`
				<div class="area-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => s(this, i, k).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="header-spacer"></span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@click=${(d) => d.stopPropagation()}
							@change=${(d) => s(this, i, D).call(this, r, d.target.checked)}>
						</uui-toggle>
					</div>
					${l && !n ? c`
						${e.children.map((d) => s(this, i, E).call(this, d))}
					` : g}
				</div>
			`;
  const u = e.heading, _ = e.children.length + 1;
  return c`
			<div class="area-section ${l ? "" : "excluded"}">
				<div class="section-heading" @click=${() => s(this, i, k).call(this, t)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="section-label">Section</span>
					<span class="section-separator">–</span>
					<span class="heading-text">${u.text}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${_} element${_ !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(d) => d.stopPropagation()}
						@change=${(d) => s(this, i, D).call(this, r, d.target.checked)}>
					</uui-toggle>
				</div>
				${!n && l ? c`
					<div class="section-children">
						${s(this, i, E).call(this, u, "heading")}
						${e.children.map((d) => s(this, i, E).call(this, d))}
					</div>
				` : g}
			</div>
		`;
};
_e = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
ve = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, a = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, o = s(this, i, W).call(this, e.text), n = o === "list" ? "List Item" : "Paragraph";
  return c`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${a ? "teach-matched" : ""}"
				@click=${() => s(this, i, he).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${o}">${n}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? c`<span class="meta-badge text-case">UPPERCASE</span>` : g}
					</div>
				</div>
			</div>
		`;
};
be = function() {
  if (this._inferenceResult) {
    const e = this._inferenceResult.matchingElementIds.length, t = this._inferenceResult.pattern.conditions.map((a) => `${a.type}: ${a.value}`).join(", ");
    return c`
				<div class="teach-confirmation">
					<div class="teach-confirmation-info">
						<uui-icon name="icon-check" style="color: var(--uui-color-positive);"></uui-icon>
						<span>Found <strong>${e}</strong> matching element${e !== 1 ? "s" : ""}</span>
						<span class="teach-condition-summary">${t}</span>
					</div>
					<div class="teach-confirmation-actions">
						<uui-button look="primary" color="positive" label="Confirm" @click=${() => s(this, i, ge).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => s(this, i, L).call(this)}>Cancel</uui-button>
					</div>
				</div>
			`;
  }
  return c`
			<div class="teach-toolbar">
				<span class="teach-instruction">
					${this._inferring ? c`<uui-loader-bar></uui-loader-bar> Analysing...` : c`Click a section heading, or <strong>No Sections</strong> if this area has no repeating structure`}
				</span>
				<div class="teach-toolbar-actions">
					<uui-button look="secondary" compact label="No Sections" @click=${() => s(this, i, fe).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => s(this, i, L).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
xe = function(e, t, a) {
  const o = `area-p${t}-a${a}`, n = s(this, i, pe).call(this, t, a), r = this._teachingAreaIndex === n, l = r ? !1 : s(this, i, I).call(this, o), u = !this._excludedAreas.has(o), _ = e.sections.length, d = e.sectionPattern != null, b = d ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null;
  return c`
			<div class="detected-area ${u ? "" : "area-excluded"} ${r ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !r && s(this, i, k).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${l ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e.name || `Area ${a + 1}`}</span>
					${b ? c`<span class="meta-badge structure-badge">${b}</span>` : g}
					<span class="header-spacer"></span>
					<span class="group-count">${_} section${_ !== 1 ? "s" : ""}</span>
					${r ? g : c`
						<uui-button
							look="outline"
							compact
							label="${d ? "Redefine Structure" : "Define Structure"}"
							@click=${(x) => {
    x.stopPropagation(), s(this, i, de).call(this, n, o);
  }}
							?disabled=${this._teachingAreaIndex !== null && !r}>
							<uui-icon name="icon-axis-rotation"></uui-icon>
							${d ? "Redefine" : "Define Structure"}
						</uui-button>
					`}
					<uui-toggle
						label="${u ? "Included" : "Excluded"}"
						?checked=${u}
						@click=${(x) => x.stopPropagation()}
						@change=${() => s(this, i, _e).call(this, o)}>
					</uui-toggle>
				</div>
				${l ? g : c`
					${r ? c`
						${s(this, i, be).call(this)}
						<div class="teach-elements">
							${s(this, i, G).call(this, e).map((x) => s(this, i, ve).call(this, x))}
						</div>
					` : c`
						${e.sections.map(
    (x, Te) => s(this, i, me).call(this, x, `p${t}-a${a}-s${Te}`, t, a)
  )}
					`}
				`}
			</div>
		`;
};
$e = function(e, t) {
  const a = `page-${e}`, o = s(this, i, I).call(this, a), n = t.length, r = t.reduce((u, _) => u + _.sections.length, 0), l = s(this, i, Z).call(this, e);
  return c`
			<uui-box class="page-box ${l ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => s(this, i, k).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${o ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${l}
						@click=${(u) => u.stopPropagation()}
						@change=${() => s(this, i, ee).call(this, e)}>
					</uui-toggle>
				</div>
				${o ? g : c`
					${t.map((u, _) => s(this, i, xe).call(this, u, e, _))}
				`}
			</uui-box>
		`;
};
we = function() {
  return this._areaDetection ? c`
			${this._areaDetection.pages.map(
    (e) => s(this, i, $e).call(this, e.page, e.areas)
  )}
		` : g;
};
ye = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((a, o) => a + o.sections.length, 0), 0) : 0;
};
ke = function() {
  return (this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0) === 0 ? g : c`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === "all"}
					@change=${() => s(this, i, S).call(this, "all")} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === "custom"}
					@change=${() => s(this, i, S).call(this, "custom")} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${s(this, i, te)}
				@blur=${s(this, i, ae)}
				@focus=${() => {
    this._pageMode === "all" && s(this, i, S).call(this, "custom");
  }}
				?disabled=${this._pageMode === "all"} />
		`;
};
ze = function() {
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
Ce = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return g;
  const a = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), o = e ? this._areaDetection.pages.length : a, r = o < a ? `${o} of ${a}` : `${a}`, l = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? s(this, i, ye).call(this) : 0, _ = t ? this._extraction.source.fileName : "", d = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return c`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${_}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${d}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${s(this, i, A)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${r}</span>
						<div class="page-selection">
							${s(this, i, ke).call(this)}
						</div>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${s(this, i, le)}>
								<uui-icon name="icon-thumbnails-small"></uui-icon>
								Choose Pages
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${this._areaTemplate ? this._areaTemplate.areas.length : l}</span>
						<div class="box-buttons">
							${this._areaTemplate ? c`<uui-button look="primary" color="positive" label="Edit Areas" @click=${s(this, i, R)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : c`<uui-button look="primary" color="positive" label="Define Areas" @click=${s(this, i, R)}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${u}</span>
						${this._transformResult && this._areaDetection ? c`
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
									@toggle=${s(this, i, ne)}>
									<umb-popover-layout>
										${s(this, i, oe).call(this).map((b) => c`
											<uui-menu-item
												label="${b.areaName}"
												@click=${() => s(this, i, re).call(this, b.areaKey, b.areaName, b.elements)}>
												<uui-icon slot="icon" name="${b.hasRules ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
												<span slot="badge" class="section-picker-meta">${b.elements.length} el</span>
											</uui-menu-item>
										`)}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : g}
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
						@toggle=${s(this, i, se)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => s(this, i, ie).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, i, y).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => s(this, i, M).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, i, y).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => s(this, i, M).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, i, y).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => s(this, i, M).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : g}
		`;
};
Pe = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? s(this, i, we).call(this) : g : s(this, i, Me).call(this);
};
O = function(e) {
  const t = s(this, i, T).call(this, e);
  return t.length === 0 ? c`<uui-button look="secondary" compact label="Map" @click=${() => s(this, i, N).call(this, e)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : c`${t.map(
    (a) => c`<span class="meta-badge mapped-target" @click=${() => s(this, i, N).call(this, e)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${s(this, i, ue).call(this, a)}
			</span>`
  )}`;
};
Se = function(e) {
  const t = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed",
    role: "Role"
  }, a = `${e.id}.heading`, o = `${e.id}.content`, n = s(this, i, T).call(this, a).length > 0, r = s(this, i, T).call(this, o).length > 0, l = n || r, u = e.heading ?? "Content";
  return c`
			<uui-box headline=${u} class="transformed-section ${l ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${e.pattern}">${t[e.pattern] ?? e.pattern}</span>
					<span class="meta-badge">p${e.page}</span>
					${e.areaColor ? c`<span class="area-color-swatch" style="background: ${e.areaColor};"></span>` : g}
					<span class="meta-badge">${e.childCount} item${e.childCount !== 1 ? "s" : ""}</span>
					${e.heading ? s(this, i, O).call(this, a) : g}
				</div>
				<div class="transformed-content" .innerHTML=${Ke(e.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${s(this, i, O).call(this, o)}
				</div>
			</uui-box>
		`;
};
Me = function() {
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
			${e.map((a) => s(this, i, Se).call(this, a))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? c`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : g}
				${this._transformResult.diagnostics.roleSections > 0 ? c`<span class="meta-badge">${this._transformResult.diagnostics.roleSections} role</span>` : g}
			</div>
		`;
};
Ee = function() {
  return c`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${s(this, i, A)} ?disabled=${this._extracting}>
					${this._extracting ? c`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
p.styles = [
  qe,
  We`
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
		`
];
h([
  f()
], p.prototype, "_extraction", 2);
h([
  f()
], p.prototype, "_areaDetection", 2);
h([
  f()
], p.prototype, "_config", 2);
h([
  f()
], p.prototype, "_workflowName", 2);
h([
  f()
], p.prototype, "_loading", 2);
h([
  f()
], p.prototype, "_extracting", 2);
h([
  f()
], p.prototype, "_error", 2);
h([
  f()
], p.prototype, "_successMessage", 2);
h([
  f()
], p.prototype, "_collapsed", 2);
h([
  f()
], p.prototype, "_transformResult", 2);
h([
  f()
], p.prototype, "_viewMode", 2);
h([
  f()
], p.prototype, "_sourceConfig", 2);
h([
  f()
], p.prototype, "_pageMode", 2);
h([
  f()
], p.prototype, "_pageInputValue", 2);
h([
  f()
], p.prototype, "_collapsePopoverOpen", 2);
h([
  f()
], p.prototype, "_excludedAreas", 2);
h([
  f()
], p.prototype, "_areaTemplate", 2);
h([
  f()
], p.prototype, "_sectionPickerOpen", 2);
h([
  f()
], p.prototype, "_teachingAreaIndex", 2);
h([
  f()
], p.prototype, "_inferenceResult", 2);
h([
  f()
], p.prototype, "_inferring", 2);
p = h([
  je("up-doc-workflow-source-view")
], p);
const gt = p;
export {
  p as UpDocWorkflowSourceViewElement,
  gt as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-ou_ZZT6_.js.map
