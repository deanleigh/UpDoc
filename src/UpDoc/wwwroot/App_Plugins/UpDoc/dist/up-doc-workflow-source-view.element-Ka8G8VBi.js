import { d as Ne, g as te, b as Ie, h as Le, i as Oe, j as Ue, k as O, l as Ke, s as U, m as Fe, n as Ve, o as Be, u as Ge, p as He } from "./workflow.service-B_tImYWQ.js";
import { n as K } from "./transforms-deUehta3.js";
import { UmbModalToken as F, UMB_MODAL_MANAGER_CONTEXT as k } from "@umbraco-cms/backoffice/modal";
import { U as We } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as c, nothing as m, css as je, state as v, customElement as Xe } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as qe } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Je } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as ae } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Qe } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as Ye } from "@umbraco-cms/backoffice/media";
const Ze = new F(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), et = new F(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), tt = new F("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "medium"
  }
});
var at = Object.defineProperty, it = Object.getOwnPropertyDescriptor, ie = (e) => {
  throw TypeError(e);
}, f = (e, t, a, i) => {
  for (var n = i > 1 ? void 0 : i ? it(t, a) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (n = (i ? l(t, a, n) : l(n)) || n);
  return i && n && at(t, a, n), n;
}, V = (e, t, a) => t.has(e) || ie("Cannot " + a), b = (e, t, a) => (V(e, t, "read from private field"), a ? a.call(e) : t.get(e)), ee = (e, t, a) => t.has(e) ? ie("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), st = (e, t, a, i) => (V(e, t, "write to private field"), t.set(e, a), a), o = (e, t, a) => (V(e, t, "access private method"), a), _, s, se, B, G, H, oe, ne, W, $, P, re, le, T, R, ce, ue, j, pe, z, X, A, y, de, M, D, N, he, S, fe, ge, me, ve, I, q, _e, be, xe, J, Q, L, we, $e, ye, ke, ze, Ce, Pe, Se, Te, Ae, Ee, Re, Me;
let h = class extends qe {
  constructor() {
    super(...arguments), ee(this, s), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, ee(this, _, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Qe, (e) => {
      e && (e.setSaveHandler(() => o(this, s, z).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, s, se).call(this));
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
				${e ? o(this, s, Te).call(this) : m}
				${e && this._viewMode === "elements" ? o(this, s, Ae).call(this) : m}
				${this._successMessage ? c`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : m}
				${e ? o(this, s, Ee).call(this) : o(this, s, Me).call(this)}
			</umb-body-layout>
		`;
  }
};
_ = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
se = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(ae);
      st(this, _, await e.getLatestToken());
      const [t, a, i, n, r, l] = await Promise.all([
        Ne(this._workflowName, b(this, _)),
        te(this._workflowName, b(this, _)),
        Ie(this._workflowName, b(this, _)),
        Le(this._workflowName, b(this, _)),
        Oe(this._workflowName, b(this, _)),
        Ue(this._workflowName, b(this, _))
      ]);
      this._extraction = t, this._areaDetection = a, this._config = i, this._transformResult = n, this._sourceConfig = r, this._areaTemplate = l;
      const u = t?.source.mediaKey;
      if (u && a) {
        const p = await O(this._workflowName, u, b(this, _));
        p && (this._transformResult = p);
      }
      r?.pages && Array.isArray(r.pages) && r.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, s, G).call(this, r.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
B = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e.split(",")) {
    const i = a.trim();
    if (!i) continue;
    const n = i.split("-").map((r) => parseInt(r.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      t.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let r = n[0]; r <= n[1]; r++)
        t.add(r);
  }
  return [...t].sort((a, i) => a - i);
};
G = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, l) => r - l), a = [];
  let i = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (a.push(i === n ? `${i}` : `${i}-${n}`), i = t[r]), n = t[r];
  return a.push(i === n ? `${i}` : `${i}-${n}`), a.join(", ");
};
H = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, s, B).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
oe = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, s, B).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
ne = async function() {
  if (!this._workflowName) return;
  const e = o(this, s, H).call(this);
  await Ve(this._workflowName, e, b(this, _));
};
W = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const a of this._areaDetection.pages) {
    const i = a.page;
    e === "pages" && t.push(`page-${i}`), e === "areas" && a.areas.forEach((n, r) => t.push(`area-p${i}-a${r}`)), e === "sections" && a.areas.forEach((n, r) => {
      n.sections.forEach((l, u) => t.push(`p${i}-a${r}-s${u}`));
    });
  }
  return t;
};
$ = function(e) {
  const t = o(this, s, W).call(this, e);
  return t.length > 0 && t.every((a) => this._collapsed.has(a));
};
P = function(e) {
  const t = o(this, s, W).call(this, e), a = o(this, s, $).call(this, e), i = new Set(this._collapsed);
  for (const n of t)
    a ? i.delete(n) : i.add(n);
  this._collapsed = i;
};
re = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
le = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
T = async function() {
  if (!this._workflowName) return;
  const a = await (await this.getContext(k)).open(this, Ye, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const i = a.selection[0];
  i && await o(this, s, X).call(this, i);
};
R = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(k)).open(this, Ze, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const a = await t.onSubmit();
    if (a?.template) {
      const i = await U(this._workflowName, a.template, b(this, _));
      i && (this._areaTemplate = i, await o(this, s, z).call(this));
    }
  } catch {
  }
};
ce = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const a of this._areaDetection.pages)
    for (const i of a.areas) {
      const n = i.name || "Area", r = K(n);
      if (t.has(r)) continue;
      t.add(r);
      const l = o(this, s, S).call(this, i), u = !!this._sourceConfig?.areaRules?.[r]?.rules?.length;
      e.push({ areaKey: r, areaName: n, elements: l, hasRules: u });
    }
  return e;
};
ue = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
j = async function(e, t, a) {
  if (!this._workflowName) return;
  const i = this._sourceConfig?.areaRules?.[e] ?? null, r = (await this.getContext(k)).open(this, et, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: a,
      existingRules: i
    }
  });
  try {
    const l = await r.onSubmit();
    if (l?.rules) {
      const u = {
        ...this._sourceConfig?.areaRules ?? {}
      };
      l.rules.rules.length > 0 ? u[e] = l.rules : delete u[e];
      const p = await Fe(this._workflowName, u, b(this, _));
      p && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: p });
      const g = this._extraction?.source.mediaKey;
      if (g) {
        const d = await O(this._workflowName, g, b(this, _));
        d && (this._transformResult = d);
      }
    }
  } catch {
  }
};
pe = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const a = o(this, s, H).call(this), r = await (await this.getContext(k)).open(this, We, {
    data: { mediaKey: e, totalPages: t, selectedPages: a }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = o(this, s, G).call(this, r.selectedPages)), await o(this, s, ne).call(this));
};
z = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, s, T).call(this);
  await o(this, s, X).call(this, e);
};
X = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const a = await (await this.getContext(ae)).getLatestToken(), [i, n] = await Promise.all([
        Ke(this._workflowName, e, a),
        O(this._workflowName, e, a)
      ]);
      if (i && (this._extraction = i), n) {
        this._transformResult = n;
        const r = await te(this._workflowName, a);
        this._areaDetection = r;
        const l = n.diagnostics, u = l.roleSections > 0 ? `, ${l.roleSections} role` : "";
        this._successMessage = `Content extracted — ${l.totalSections} sections (${l.bulletListSections} bullet, ${l.paragraphSections} paragraph, ${l.subHeadedSections} sub-headed${u})`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else i ? (this._successMessage = `Content extracted — ${i.elements.length} elements (transform unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
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
y = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
de = function(e) {
  return this._transformResult ? this._transformResult.sections.find((a) => a.id === e)?.included ?? !0 : !0;
};
M = async function(e, t) {
  if (!this._workflowName) return;
  const a = await Ge(this._workflowName, e, t, b(this, _));
  a && (this._transformResult = a);
};
D = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const a of this._config.map.mappings)
    if (a.source === e && a.enabled)
      for (const i of a.destinations)
        t.push(i);
  return t;
};
N = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const i = a.blocks.find((n) => n.key === e.blockKey);
      if (i) {
        const n = i.properties?.find((r) => r.alias === e.target);
        return `${i.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((a) => a.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const i of a.blocks) {
        const n = i.properties?.find((r) => r.alias === e.target);
        if (n) return `${i.label} > ${n.label || n.alias}`;
      }
  return e.target;
};
he = function(e, t) {
  if (!this._areaDetection) return t;
  let a = 0;
  for (const i of this._areaDetection.pages) {
    if (i.page === e) return a + t;
    a += i.areas.length;
  }
  return a + t;
};
S = function(e) {
  const t = [];
  for (const a of e.sections)
    a.heading && t.push(a.heading), t.push(...a.children);
  return t;
};
fe = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const a = new Set(this._collapsed);
    a.delete(t), this._collapsed = a;
  }
};
ge = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await He(
        this._workflowName,
        this._teachingAreaIndex,
        e,
        b(this, _)
      );
      this._inferenceResult = t;
    } catch (t) {
      console.error("Inference failed:", t), this._error = "Failed to infer section pattern";
    } finally {
      this._inferring = !1;
    }
  }
};
me = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const a = { ...this._areaTemplate, areas: t }, i = await U(this._workflowName, a, b(this, _));
  i && (this._areaTemplate = i, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, s, z).call(this));
};
ve = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const a = { ...this._areaTemplate, areas: t }, i = await U(this._workflowName, a, b(this, _));
  i && (this._areaTemplate = i, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, s, z).call(this));
};
I = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
q = function(e) {
  return K(e.name || "");
};
_e = function(e) {
  const t = o(this, s, q).call(this, e);
  return !!this._sourceConfig?.areaRules?.[t]?.rules?.length;
};
be = function(e, t) {
  return this._transformResult ? this._transformResult.sections.filter(
    (a) => a.areaColor === e.color && a.page === t
  ) : [];
};
xe = async function(e) {
  if (!this._workflowName || !this._config?.destination) return;
  const a = (await this.getContext(k)).open(this, tt, {
    data: {
      destination: this._config.destination,
      existingMappings: this._config.map?.mappings ?? []
    }
  });
  let i;
  try {
    i = await a.onSubmit();
  } catch {
    return;
  }
  if (!i?.selectedTargets?.length) return;
  const n = `${e.id}.content`, r = this._config.map?.mappings ?? [], l = {
    source: n,
    destinations: i.selectedTargets.map((w) => ({ target: w.target, blockKey: w.blockKey })),
    enabled: !0
  }, u = r.findIndex((w) => w.source === n), p = u >= 0 ? r.map((w, C) => C === u ? l : w) : [...r, l], g = {
    ...this._config.map ?? { version: "1.0", mappings: [] },
    mappings: p
  }, d = await Be(this._workflowName, g, b(this, _));
  d && (this._config = { ...this._config, map: d });
};
J = function(e, t = !0) {
  const a = e.content.length > 100 ? e.content.substring(0, 100).replace(/\r?\n/g, " ") + "…" : e.content.replace(/\r?\n/g, " "), i = o(this, s, D).call(this, `${e.id}.content`), n = o(this, s, D).call(this, `${e.id}.heading`), r = [...i, ...n], l = r.length > 0;
  return c`
			<div class="composed-section-row">
				<span class="composed-role">${e.heading ?? "Content"}</span>
				<span class="composed-preview">${a}</span>
				${l ? r.map((u) => c`<span class="meta-badge mapped-target" title="${o(this, s, N).call(this, u)}">
						<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${o(this, s, N).call(this, u)}
					</span>`) : m}
				${t ? c`
					<uui-button
						look="outline"
						compact
						label="Map"
						@click=${(u) => {
    u.stopPropagation(), o(this, s, xe).call(this, e);
  }}>
						Map
					</uui-button>
				` : m}
			</div>
		`;
};
Q = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
L = function(e, t) {
  const a = t === "heading" ? "heading" : o(this, s, Q).call(this, e.text), i = a === "heading" ? "Heading" : a === "list" ? "List Item" : "Paragraph";
  return c`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${a}">${i}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? c`<span class="meta-badge text-case">UPPERCASE</span>` : m}
					</div>
				</div>
			</div>
		`;
};
we = function(e, t, a, i) {
  const n = o(this, s, A).call(this, t), r = e.heading ? K(e.heading.text) : `preamble-p${a}-a${i}`, l = o(this, s, de).call(this, r);
  if (!e.heading)
    return c`
				<div class="area-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, s, y).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@click=${(d) => d.stopPropagation()}
							@change=${(d) => o(this, s, M).call(this, r, d.target.checked)}>
						</uui-toggle>
					</div>
					${l && !n ? c`
						${e.children.map((d) => o(this, s, L).call(this, d))}
					` : m}
				</div>
			`;
  const u = e.heading, p = e.children.length, g = p > 0;
  return c`
			<div class="area-section ${l ? "" : "excluded"}">
				<div class="section-heading" @click=${g ? () => o(this, s, y).call(this, t) : m}>
					${g ? c`<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>` : c`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<span class="section-label">Section</span>
					<span class="section-separator">–</span>
					<span class="heading-text" title="${u.text}">${u.text}</span>
					${g ? c`<span class="group-count">${p} element${p !== 1 ? "s" : ""}</span>` : m}
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(d) => d.stopPropagation()}
						@change=${(d) => o(this, s, M).call(this, r, d.target.checked)}>
					</uui-toggle>
				</div>
				${g && !n && l ? c`
					<div class="section-children">
						${e.children.map((d) => o(this, s, L).call(this, d))}
					</div>
				` : m}
			</div>
		`;
};
$e = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
ye = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, a = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, i = o(this, s, Q).call(this, e.text), n = i === "list" ? "List Item" : "Paragraph";
  return c`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${a ? "teach-matched" : ""}"
				@click=${() => o(this, s, ge).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${i}">${n}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? c`<span class="meta-badge text-case">UPPERCASE</span>` : m}
					</div>
				</div>
			</div>
		`;
};
ke = function() {
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
						<uui-button look="primary" color="default" label="Confirm" @click=${() => o(this, s, me).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => o(this, s, I).call(this)}>Cancel</uui-button>
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
					<uui-button look="secondary" compact label="No Sections" @click=${() => o(this, s, ve).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => o(this, s, I).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
ze = function(e, t, a) {
  const i = `area-p${t}-a${a}`, n = o(this, s, he).call(this, t, a), r = this._teachingAreaIndex === n, l = r ? !1 : o(this, s, A).call(this, i), u = !this._excludedAreas.has(i), p = o(this, s, q).call(this, e), g = o(this, s, _e).call(this, e), d = g && this._transformResult ? o(this, s, be).call(this, e, t) : [], w = g && d.length > 0, C = w ? d.length : e.sections.length, E = e.sectionPattern != null, Y = E ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, Z = this._sourceConfig?.areaRules?.[p]?.rules?.length ?? 0;
  return c`
			<div class="detected-area ${u ? "" : "area-excluded"} ${r ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !r && o(this, s, y).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${l ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e.name || `Area ${a + 1}`}</span>
					${g ? c`<span class="meta-badge rules-badge">${Z} rule${Z !== 1 ? "s" : ""}</span>` : Y ? c`<span class="meta-badge structure-badge">${Y}</span>` : m}
					<span class="header-spacer"></span>
					<span class="group-count">${C} section${C !== 1 ? "s" : ""}</span>
					${r ? m : c`
						${g ? c`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${(x) => {
    x.stopPropagation(), o(this, s, j).call(this, p, e.name || "", o(this, s, S).call(this, e));
  }}
								?disabled=${this._teachingAreaIndex !== null}>
								<uui-icon name="icon-settings"></uui-icon>
								Edit Rules
							</uui-button>
						` : c`
							<uui-button
								look="outline"
								compact
								label="${E ? "Redefine Structure" : "Define Structure"}"
								@click=${(x) => {
    x.stopPropagation(), o(this, s, fe).call(this, n, i);
  }}
								?disabled=${this._teachingAreaIndex !== null && !r}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${E ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${g ? m : c`
						<uui-toggle
							label="${u ? "Included" : "Excluded"}"
							?checked=${u}
							@click=${(x) => x.stopPropagation()}
							@change=${() => o(this, s, $e).call(this, i)}>
						</uui-toggle>
					`}
				</div>
				${l ? m : c`
					${r ? c`
						${o(this, s, ke).call(this)}
						<div class="teach-elements">
							${o(this, s, S).call(this, e).map((x) => o(this, s, ye).call(this, x))}
						</div>
					` : w ? c`
						<div class="composed-sections">
							${d.map((x) => o(this, s, J).call(this, x, !1))}
						</div>
					` : c`
						${e.sections.map(
    (x, De) => o(this, s, we).call(this, x, `p${t}-a${a}-s${De}`, t, a)
  )}
					`}
				`}
			</div>
		`;
};
Ce = function(e, t) {
  const a = `page-${e}`, i = o(this, s, A).call(this, a), n = t.length, r = t.reduce((u, p) => u + p.sections.length, 0), l = o(this, s, oe).call(this, e);
  return c`
			<uui-box class="page-box ${l ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => o(this, s, y).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
				</div>
				${i ? m : c`
					${t.map((u, p) => o(this, s, ze).call(this, u, e, p))}
				`}
			</uui-box>
		`;
};
Pe = function() {
  return this._areaDetection ? c`
			${this._areaDetection.pages.map(
    (e) => o(this, s, Ce).call(this, e.page, e.areas)
  )}
		` : m;
};
Se = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((a, i) => a + i.sections.length, 0), 0) : 0;
};
Te = function() {
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
Ae = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return m;
  const a = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), i = e ? this._areaDetection.pages.length : a, r = i < a ? `${i} of ${a}` : `${a}`, l = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? o(this, s, Se).call(this) : 0, p = t ? this._extraction.source.fileName : "", g = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return c`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${p}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${g}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, s, T)} ?disabled=${this._extracting}>
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
							<uui-button look="primary" color="default" label="Choose Pages" @click=${o(this, s, pe)}>
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
							${this._areaTemplate ? c`<uui-button look="primary" color="default" label="Edit Areas" @click=${o(this, s, R)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : c`<uui-button look="primary" color="default" label="Define Areas" @click=${o(this, s, R)}>
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
									@toggle=${o(this, s, ue)}>
									<umb-popover-layout>
										${o(this, s, ce).call(this).map((d) => c`
											<uui-menu-item
												label="${d.areaName}"
												@click=${() => o(this, s, j).call(this, d.areaKey, d.areaName, d.elements)}>
												<uui-icon slot="icon" name="${d.hasRules ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
												<span slot="badge" class="section-picker-meta">${d.elements.length} el</span>
											</uui-menu-item>
										`)}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : m}
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
						@toggle=${o(this, s, le)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, s, re).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, $).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, s, P).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, $).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, s, P).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, $).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, s, P).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : m}
		`;
};
Ee = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, s, Pe).call(this) : m : o(this, s, Re).call(this);
};
Re = function() {
  if (!this._transformResult)
    return c`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = this._transformResult.sections.filter((n) => n.included), t = this._transformResult.sections.length, a = /* @__PURE__ */ new Map();
  for (const n of e) {
    a.has(n.page) || a.set(n.page, /* @__PURE__ */ new Map());
    const r = a.get(n.page), l = n.areaName ?? n.areaColor ?? "unknown";
    r.has(l) || r.set(l, {
      name: n.areaName ?? "Ungrouped",
      color: n.areaColor,
      sections: []
    }), r.get(l).sections.push(n);
  }
  const i = [...a.entries()].sort((n, r) => n[0] - r[0]);
  return c`
			${i.map(([n, r]) => {
    const l = [...r.values()], u = l.reduce((p, g) => p + g.sections.length, 0);
    return c`
					<uui-box class="page-box">
						<div slot="header" class="tree-header">
							<strong class="page-title">Page ${n}</strong>
						</div>
						<div slot="header-actions" class="page-header-actions">
							<span class="group-count">${u} section${u !== 1 ? "s" : ""}, ${l.length} area${l.length !== 1 ? "s" : ""}</span>
						</div>
						${l.map((p) => c`
							<div class="detected-area" style="border-left-color: ${p.color ?? "var(--uui-color-divider)"};">
								<div class="area-header">
									<span class="area-name">${p.name}</span>
									<span class="header-spacer"></span>
									<span class="group-count">${p.sections.length} section${p.sections.length !== 1 ? "s" : ""}</span>
								</div>
								<div class="composed-sections">
									${p.sections.map((g) => o(this, s, J).call(this, g))}
								</div>
							</div>
						`)}
					</uui-box>
				`;
  })}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
			</div>
		`;
};
Me = function() {
  return c`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${o(this, s, T)} ?disabled=${this._extracting}>
					${this._extracting ? c`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
h.styles = [
  Je,
  je`
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

			.meta-badge.mapped-target {
				background: var(--uui-color-positive);
				color: #ffffff;
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
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.composed-section-row:last-child {
				border-bottom: none;
			}

			.composed-role {
				font-weight: 600;
				color: var(--uui-color-text);
				flex-shrink: 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				max-width: 200px;
			}

			.composed-preview {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				min-width: 0;
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
		`
];
f([
  v()
], h.prototype, "_extraction", 2);
f([
  v()
], h.prototype, "_areaDetection", 2);
f([
  v()
], h.prototype, "_config", 2);
f([
  v()
], h.prototype, "_workflowName", 2);
f([
  v()
], h.prototype, "_loading", 2);
f([
  v()
], h.prototype, "_extracting", 2);
f([
  v()
], h.prototype, "_error", 2);
f([
  v()
], h.prototype, "_successMessage", 2);
f([
  v()
], h.prototype, "_collapsed", 2);
f([
  v()
], h.prototype, "_transformResult", 2);
f([
  v()
], h.prototype, "_viewMode", 2);
f([
  v()
], h.prototype, "_sourceConfig", 2);
f([
  v()
], h.prototype, "_pageMode", 2);
f([
  v()
], h.prototype, "_pageInputValue", 2);
f([
  v()
], h.prototype, "_collapsePopoverOpen", 2);
f([
  v()
], h.prototype, "_excludedAreas", 2);
f([
  v()
], h.prototype, "_areaTemplate", 2);
f([
  v()
], h.prototype, "_sectionPickerOpen", 2);
f([
  v()
], h.prototype, "_teachingAreaIndex", 2);
f([
  v()
], h.prototype, "_inferenceResult", 2);
f([
  v()
], h.prototype, "_inferring", 2);
h = f([
  Xe("up-doc-workflow-source-view")
], h);
const gt = h;
export {
  h as UpDocWorkflowSourceViewElement,
  gt as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-Ka8G8VBi.js.map
