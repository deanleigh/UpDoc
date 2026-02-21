import { d as je, g as ce, b as Ge, h as We, i as qe, j as Xe, k as V, l as Je, s as j, m as le, n as Qe, o as Ye, u as Ze, p as et } from "./workflow.service-CCTLt2Zy.js";
import { m as z, n as G } from "./transforms-deUehta3.js";
import { UmbModalToken as W, UMB_MODAL_MANAGER_CONTEXT as R } from "@umbraco-cms/backoffice/modal";
import { U as tt } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as l, nothing as p, unsafeHTML as y, css as it, state as v, customElement as at } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as st } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ot } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as ue } from "@umbraco-cms/backoffice/auth";
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
var dt = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, de = (e) => {
  throw TypeError(e);
}, f = (e, t, i, o) => {
  for (var n = o > 1 ? void 0 : o ? pt(t, i) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (n = (o ? c(t, i, n) : c(n)) || n);
  return o && n && dt(t, i, n), n;
}, q = (e, t, i) => t.has(e) || de("Cannot " + i), x = (e, t, i) => (q(e, t, "read from private field"), i ? i.call(e) : t.get(e)), re = (e, t, i) => t.has(e) ? de("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), ht = (e, t, i, o) => (q(e, t, "write to private field"), t.set(e, i), i), s = (e, t, i) => (q(e, t, "access private method"), i), b, a, pe, X, J, Q, he, me, Y, T, E, ge, fe, D, O, ve, be, U, Z, xe, A, ee, C, k, _e, K, I, F, $e, N, we, ye, ke, ze, H, te, Ce, ie, P, Pe, Me, ae, B, Se, Te, Re, Ae, Ee, Ne, De, Ie, Le, Oe, Ue, Ke, Fe, He, _, Be, Ve;
let m = class extends st {
  constructor() {
    super(...arguments), re(this, a), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, re(this, b, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(nt, (e) => {
      e && (e.setSaveHandler(() => s(this, a, A).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), s(this, a, pe).call(this));
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
				${e ? s(this, a, Le).call(this) : p}
				${e && this._viewMode === "elements" ? s(this, a, Oe).call(this) : p}
				${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : p}
				${e ? s(this, a, Ue).call(this) : s(this, a, Ve).call(this)}
			</umb-body-layout>
		`;
  }
};
b = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
pe = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(ue);
      ht(this, b, await e.getLatestToken());
      const [t, i, o, n, r, c] = await Promise.all([
        je(this._workflowName, x(this, b)),
        ce(this._workflowName, x(this, b)),
        Ge(this._workflowName, x(this, b)),
        We(this._workflowName, x(this, b)),
        qe(this._workflowName, x(this, b)),
        Xe(this._workflowName, x(this, b))
      ]);
      this._extraction = t, this._areaDetection = i, this._config = o, this._transformResult = n, this._sourceConfig = r, this._areaTemplate = c;
      const u = t?.source.mediaKey;
      if (u && i) {
        const d = await V(this._workflowName, u, x(this, b));
        d && (this._transformResult = d);
      }
      r?.pages && Array.isArray(r.pages) && r.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = s(this, a, J).call(this, r.pages)) : (this._pageMode = "all", this._pageInputValue = "");
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
J = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, c) => r - c), i = [];
  let o = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (i.push(o === n ? `${o}` : `${o}-${n}`), o = t[r]), n = t[r];
  return i.push(o === n ? `${o}` : `${o}-${n}`), i.join(", ");
};
Q = function() {
  if (this._pageMode === "all") return null;
  const e = s(this, a, X).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
he = function(e) {
  if (this._pageMode === "all") return !0;
  const t = s(this, a, X).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
me = async function() {
  if (!this._workflowName) return;
  const e = s(this, a, Q).call(this);
  await Qe(this._workflowName, e, x(this, b));
};
Y = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const i of this._areaDetection.pages) {
    const o = i.page;
    e === "pages" && t.push(`page-${o}`), e === "areas" && i.areas.forEach((n, r) => t.push(`area-p${o}-a${r}`)), e === "sections" && (i.areas.forEach((n, r) => {
      n.sections.forEach((c, u) => t.push(`p${o}-a${r}-s${u}`));
    }), i.areas.forEach((n) => {
      s(this, a, ie).call(this, n, o).forEach((c) => t.push(`composed-${c.id}`));
    }));
  }
  return t;
};
T = function(e) {
  const t = s(this, a, Y).call(this, e);
  return t.length > 0 && t.every((i) => this._collapsed.has(i));
};
E = function(e) {
  const t = s(this, a, Y).call(this, e), i = s(this, a, T).call(this, e), o = new Set(this._collapsed);
  for (const n of t)
    i ? o.delete(n) : o.add(n);
  this._collapsed = o;
};
ge = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
fe = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
D = async function() {
  if (!this._workflowName) return;
  const i = await (await this.getContext(R)).open(this, rt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const o = i.selection[0];
  o && await s(this, a, ee).call(this, o);
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
    const i = await t.onSubmit();
    if (i?.template) {
      const o = await j(this._workflowName, i.template, x(this, b));
      o && (this._areaTemplate = o, await s(this, a, A).call(this));
    }
  } catch {
  }
};
ve = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const i of this._areaDetection.pages)
    for (const o of i.areas) {
      const n = o.name || "Area", r = G(n);
      if (t.has(r)) continue;
      t.add(r);
      const c = s(this, a, N).call(this, o), u = this._sourceConfig?.areaRules?.[r], d = !!u && ((u.groups?.length ?? 0) > 0 || (u.rules?.length ?? 0) > 0);
      e.push({ areaKey: r, areaName: n, elements: c, hasRules: d });
    }
  return e;
};
be = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
U = async function(e, t) {
  if (!this._workflowName) return;
  const i = {
    ...this._sourceConfig?.areaRules ?? {}
  };
  t.groups.length > 0 || t.rules.length > 0 ? i[e] = t : delete i[e];
  const n = await Ye(this._workflowName, i, x(this, b));
  n && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: n });
  const r = this._extraction?.source.mediaKey;
  if (r) {
    const c = await V(this._workflowName, r, x(this, b));
    c && (this._transformResult = c);
  }
};
Z = async function(e, t, i) {
  if (!this._workflowName) return;
  const o = this._sourceConfig?.areaRules?.[e] ?? null, r = (await this.getContext(R)).open(this, lt, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: i,
      existingRules: o,
      onSave: async (c) => {
        await s(this, a, U).call(this, e, c);
      }
    }
  });
  try {
    const c = await r.onSubmit();
    c?.rules && await s(this, a, U).call(this, e, c.rules);
  } catch {
  }
};
xe = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const i = s(this, a, Q).call(this), r = await (await this.getContext(R)).open(this, tt, {
    data: { mediaKey: e, totalPages: t, selectedPages: i }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = s(this, a, J).call(this, r.selectedPages)), await s(this, a, me).call(this));
};
A = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return s(this, a, D).call(this);
  await s(this, a, ee).call(this, e);
};
ee = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(ue)).getLatestToken(), [o, n] = await Promise.all([
        Je(this._workflowName, e, i),
        V(this._workflowName, e, i)
      ]);
      if (o && (this._extraction = o), n) {
        this._transformResult = n;
        const r = await ce(this._workflowName, i);
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
C = function(e) {
  return this._collapsed.has(e);
};
k = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
_e = function(e) {
  return this._transformResult ? this._transformResult.sections.find((i) => i.id === e)?.included ?? !0 : !0;
};
K = async function(e, t) {
  if (!this._workflowName) return;
  const i = await Ze(this._workflowName, e, t, x(this, b));
  i && (this._transformResult = i);
};
I = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const i of this._config.map.mappings)
    if (i.source === e && i.enabled)
      for (const o of i.destinations)
        t.push(o);
  return t;
};
F = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids) {
      const o = i.blocks.find((n) => n.key === e.blockKey);
      if (o) {
        const n = o.properties?.find((r) => r.alias === e.target);
        return `${o.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((i) => i.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const i of this._config.destination.blockGrids)
      for (const o of i.blocks) {
        const n = o.properties?.find((r) => r.alias === e.target);
        if (n) return `${o.label} > ${n.label || n.alias}`;
      }
  return e.target;
};
$e = function(e, t) {
  if (!this._areaDetection) return t;
  let i = 0;
  for (const o of this._areaDetection.pages) {
    if (o.page === e) return i + t;
    i += o.areas.length;
  }
  return i + t;
};
N = function(e) {
  const t = [];
  for (const i of e.sections)
    i.heading && t.push(i.heading), t.push(...i.children);
  return t;
};
we = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const i = new Set(this._collapsed);
    i.delete(t), this._collapsed = i;
  }
};
ye = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await et(
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
ke = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const i = { ...this._areaTemplate, areas: t }, o = await j(this._workflowName, i, x(this, b));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, a, A).call(this));
};
ze = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const i = { ...this._areaTemplate, areas: t }, o = await j(this._workflowName, i, x(this, b));
  o && (this._areaTemplate = o, this._teachingAreaIndex = null, this._inferenceResult = null, await s(this, a, A).call(this));
};
H = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
te = function(e) {
  return G(e.name || "");
};
Ce = function(e) {
  const t = s(this, a, te).call(this, e), i = this._sourceConfig?.areaRules?.[t];
  return i ? (i.groups?.length ?? 0) > 0 || (i.rules?.length ?? 0) > 0 : !1;
};
ie = function(e, t) {
  return this._transformResult ? this._transformResult.sections.filter(
    (i) => i.areaColor === e.color && i.page === t
  ) : [];
};
P = async function(e, t = "content") {
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
  }, d = c.findIndex((w) => w.source === r), g = d >= 0 ? c.map((w, S) => S === d ? u : w) : [...c, u], h = {
    ...this._config.map ?? { version: "1.0", mappings: [] },
    mappings: g
  }, M = await le(this._workflowName, h, x(this, b));
  M && (this._config = { ...this._config, map: M });
};
Pe = async function(e, t) {
  if (!this._workflowName || !this._config?.map) return;
  const i = this._config.map.mappings, o = i.findIndex((g) => g.source === e);
  if (o < 0) return;
  const r = i[o].destinations.filter(
    (g) => !(g.target === t.target && g.blockKey === t.blockKey)
  );
  let c;
  r.length === 0 ? c = i.filter((g, h) => h !== o) : c = i.map(
    (g, h) => h === o ? { ...g, destinations: r } : g
  );
  const u = { ...this._config.map, mappings: c }, d = await le(this._workflowName, u, x(this, b));
  d && (this._config = { ...this._config, map: d });
};
Me = function(e) {
  const t = ["content", "heading", "title", "description", "summary"], i = t.some((u) => s(this, a, I).call(this, `${e.id}.${u}`).length > 0), o = `composed-${e.id}`, n = s(this, a, C).call(this, o), r = e.groupName ?? e.ruleName ?? (e.areaName ? `${e.areaName} - Section` : "Section"), c = !!e.groupName;
  return l`
			<div class="composed-section-row">
				<div class="composed-section-header" @click=${() => s(this, a, k).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="composed-role">${r}</span>
					<span class="header-spacer"></span>
					${i && n ? t.map((u) => s(this, a, _).call(this, `${e.id}.${u}`)) : p}
				</div>
				${n ? p : l`
					${c ? l`
						${e.heading ? l`
							<div class="composed-part-block">
								<div class="composed-part-header">
									<span class="section-label">${r} Title</span>
									<div class="composed-part-actions">
										${s(this, a, _).call(this, `${e.id}.title`)}
										${s(this, a, _).call(this, `${e.id}.heading`)}
									</div>
								</div>
								<div class="composed-section-content">${y(z(e.heading))}</div>
							</div>
						` : p}
						${e.content ? l`
							<div class="composed-part-block composed-part-block-bordered">
								<div class="composed-part-header">
									<span class="section-label">${r} Content</span>
									<div class="composed-part-actions">
										${s(this, a, _).call(this, `${e.id}.content`)}
									</div>
								</div>
								<div class="composed-section-content">${y(z(e.content))}</div>
							</div>
						` : p}
					` : l`
						<div class="composed-part-block">
							<div class="composed-part-header">
								<span class="header-spacer"></span>
								<div class="composed-part-actions">
									${t.map((u) => s(this, a, _).call(this, `${e.id}.${u}`))}
								</div>
							</div>
							<div class="composed-section-content">
								${e.content ? y(z(e.content)) : p}
							</div>
						</div>
					`}
				`}
			</div>
		`;
};
ae = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
B = function(e, t) {
  const i = t === "heading" ? "heading" : s(this, a, ae).call(this, e.text), o = i === "heading" ? "Heading" : i === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${i}">${o}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : p}
					</div>
				</div>
			</div>
		`;
};
Se = function(e, t, i, o) {
  const n = s(this, a, C).call(this, t), r = e.heading ? G(e.heading.text) : `preamble-p${i}-a${o}`, c = s(this, a, _e).call(this, r);
  if (!e.heading)
    return l`
				<div class="area-section ${c ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => s(this, a, k).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${c ? "Included" : "Excluded"}"
							?checked=${c}
							@click=${(h) => h.stopPropagation()}
							@change=${(h) => s(this, a, K).call(this, r, h.target.checked)}>
						</uui-toggle>
					</div>
					${c && !n ? l`
						${e.children.map((h) => s(this, a, B).call(this, h))}
					` : p}
				</div>
			`;
  const u = e.heading, d = e.children.length, g = d > 0;
  return l`
			<div class="area-section ${c ? "" : "excluded"}">
				<div class="section-heading" @click=${g ? () => s(this, a, k).call(this, t) : p}>
					${g ? l`<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>` : l`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<uui-icon class="level-icon" name="icon-thumbnail-list"></uui-icon>
					<span class="heading-text" title="${u.text}">${u.text}</span>
					${g ? l`<span class="group-count">${d} element${d !== 1 ? "s" : ""}</span>` : p}
					<uui-toggle
						label="${c ? "Included" : "Excluded"}"
						?checked=${c}
						@click=${(h) => h.stopPropagation()}
						@change=${(h) => s(this, a, K).call(this, r, h.target.checked)}>
					</uui-toggle>
				</div>
				${g && !n && c ? l`
					<div class="section-children">
						${e.children.map((h) => s(this, a, B).call(this, h))}
					</div>
				` : p}
			</div>
		`;
};
Te = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
Re = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, i = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, o = s(this, a, ae).call(this, e.text), n = o === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${i ? "teach-matched" : ""}"
				@click=${() => s(this, a, ye).call(this, e.id)}>
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
    const e = this._inferenceResult.matchingElementIds.length, t = this._inferenceResult.pattern.conditions.map((i) => `${i.type}: ${i.value}`).join(", ");
    return l`
				<div class="teach-confirmation">
					<div class="teach-confirmation-info">
						<uui-icon name="icon-check" style="color: var(--uui-color-positive);"></uui-icon>
						<span>Found <strong>${e}</strong> matching element${e !== 1 ? "s" : ""}</span>
						<span class="teach-condition-summary">${t}</span>
					</div>
					<div class="teach-confirmation-actions">
						<uui-button look="primary" color="default" label="Confirm" @click=${() => s(this, a, ke).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => s(this, a, H).call(this)}>Cancel</uui-button>
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
					<uui-button look="secondary" compact label="No Sections" @click=${() => s(this, a, ze).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => s(this, a, H).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
Ee = function(e, t, i) {
  const o = `area-p${t}-a${i}`, n = s(this, a, $e).call(this, t, i), r = this._teachingAreaIndex === n, c = r ? !1 : s(this, a, C).call(this, o), u = !this._excludedAreas.has(o), d = s(this, a, te).call(this, e), g = s(this, a, Ce).call(this, e), h = g && this._transformResult ? s(this, a, ie).call(this, e, t) : [], M = g && h.length > 0, w = M ? h.length : e.sections.length, S = e.sectionPattern != null, se = S ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, oe = this._sourceConfig?.areaRules?.[d], ne = (oe?.rules?.length ?? 0) + (oe?.groups?.reduce(($, L) => $ + L.rules.length, 0) ?? 0);
  return l`
			<div class="detected-area ${u ? "" : "area-excluded"} ${r ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !r && s(this, a, k).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${c ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-grid"></uui-icon>
					<span class="area-name">${e.name || `${i + 1}`}</span>
					${g ? l`<span class="meta-badge rules-badge">${ne} rule${ne !== 1 ? "s" : ""}</span>` : se ? l`<span class="meta-badge structure-badge">${se}</span>` : p}
					<span class="header-spacer"></span>
					<span class="group-count">${w} section${w !== 1 ? "s" : ""}</span>
					${r ? p : l`
						${g ? l`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${($) => {
    $.stopPropagation(), s(this, a, Z).call(this, d, e.name || "", s(this, a, N).call(this, e));
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
    $.stopPropagation(), s(this, a, we).call(this, n, o);
  }}
								?disabled=${this._teachingAreaIndex !== null && !r}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${S ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${g ? p : l`
						<uui-toggle
							label="${u ? "Included" : "Excluded"}"
							?checked=${u}
							@click=${($) => $.stopPropagation()}
							@change=${() => s(this, a, Te).call(this, o)}>
						</uui-toggle>
					`}
				</div>
				${c ? p : l`
					${r ? l`
						${s(this, a, Ae).call(this)}
						<div class="teach-elements">
							${s(this, a, N).call(this, e).map(($) => s(this, a, Re).call(this, $))}
						</div>
					` : M ? l`
						<div class="composed-sections">
							${h.map(($) => s(this, a, Me).call(this, $))}
						</div>
					` : l`
						${e.sections.map(
    ($, L) => s(this, a, Se).call(this, $, `p${t}-a${i}-s${L}`, t, i)
  )}
					`}
				`}
			</div>
		`;
};
Ne = function(e, t) {
  const i = `page-${e}`, o = s(this, a, C).call(this, i), n = t.length, r = t.reduce((u, d) => u + d.sections.length, 0), c = s(this, a, he).call(this, e);
  return l`
			<uui-box class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => s(this, a, k).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${o ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
				</div>
				${o ? p : l`
					${t.map((u, d) => s(this, a, Ee).call(this, u, e, d))}
				`}
			</uui-box>
		`;
};
De = function() {
  return this._areaDetection ? l`
			${this._areaDetection.pages.map(
    (e) => s(this, a, Ne).call(this, e.page, e.areas)
  )}
		` : p;
};
Ie = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((i, o) => i + o.sections.length, 0), 0) : 0;
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
  const i = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), o = e ? this._areaDetection.pages.length : i, r = o < i ? `${o} of ${i}` : `${i}`, c = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? s(this, a, Ie).call(this) : 0, d = t ? this._extraction.source.fileName : "", g = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return l`
			<div class="info-boxes">
				<uui-box class="info-box-item">
					<div slot="headline" class="box-headline-row">
						<span>Source</span>
						<span class="box-headline-meta">${g}</span>
					</div>
					<div class="box-content">
						<uui-icon name="icon-page-add" class="box-icon"></uui-icon>
						<span class="box-stat box-filename" title="${d}">${d}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${s(this, a, D)} ?disabled=${this._extracting}>
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
							<uui-button look="primary" color="default" label="Choose Pages" @click=${s(this, a, xe)}>
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
							${this._areaTemplate ? l`<uui-button look="primary" color="default" label="Edit Areas" @click=${s(this, a, O)}>
									<uui-icon name="icon-grid"></uui-icon>
									Edit Areas
								</uui-button>` : l`<uui-button look="primary" color="default" label="Define Areas" @click=${s(this, a, O)}>
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
									@toggle=${s(this, a, be)}>
									<umb-popover-layout>
										${s(this, a, ve).call(this).map((h) => l`
											<uui-menu-item
												label="${h.areaName}"
												@click=${() => s(this, a, Z).call(this, h.areaKey, h.areaName, h.elements)}>
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
						@toggle=${s(this, a, fe)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => s(this, a, ge).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, a, T).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => s(this, a, E).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, a, T).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => s(this, a, E).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${s(this, a, T).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => s(this, a, E).call(this, "sections")}>
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
  return this._viewMode === "elements" ? e ? s(this, a, De).call(this) : p : s(this, a, Ke).call(this);
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
  const e = this._transformResult.sections.filter((n) => n.included), t = this._transformResult.sections.length, i = /* @__PURE__ */ new Map();
  for (const n of e) {
    i.has(n.page) || i.set(n.page, /* @__PURE__ */ new Map());
    const r = i.get(n.page), c = n.areaName || "Uncategorized";
    r.has(c) || r.set(c, []), r.get(c).push(n);
  }
  const o = [...i.entries()].sort((n, r) => n[0] - r[0]);
  return l`
			${o.map(([n, r]) => s(this, a, Fe).call(this, n, r))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
			</div>
		`;
};
Fe = function(e, t) {
  const i = `tx-page-${e}`, o = s(this, a, C).call(this, i), n = [...t.values()].reduce((c, u) => c + u.length, 0), r = t.size;
  return l`
			<uui-box class="page-box">
				<div slot="header" class="tree-header" @click=${() => s(this, a, k).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${o ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<uui-icon class="level-icon" name="icon-document"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${n} section${n !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
				</div>
				${o ? p : l`
					${[...t.entries()].map(
    ([c, u]) => s(this, a, He).call(this, c, u, e)
  )}
				`}
			</uui-box>
		`;
};
He = function(e, t, i) {
  const o = `tx-area-${i}-${e}`, n = s(this, a, C).call(this, o), r = t[0]?.areaColor || "var(--uui-color-border)";
  return l`
			<div class="detected-area" style="border-left-color: ${r};">
				<div class="area-header" @click=${() => s(this, a, k).call(this, o)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${t.length} section${t.length !== 1 ? "s" : ""}</span>
				</div>
				${n ? p : l`
					<div class="tx-area-sections">
						${t.map((c) => s(this, a, Be).call(this, c))}
					</div>
				`}
			</div>
		`;
};
_ = function(e) {
  const t = s(this, a, I).call(this, e);
  return t.length === 0 ? p : t.map((i) => l`<uui-tag color="positive" look="primary" class="mapped-tag" title="${s(this, a, F).call(this, i)}">
			${s(this, a, F).call(this, i)}
			<button class="unmap-x" title="Remove mapping" @click=${(o) => {
    o.stopPropagation(), s(this, a, Pe).call(this, e, i);
  }}>&times;</button>
		</uui-tag>`);
};
Be = function(e) {
  const t = !!e.groupName, i = !!e.description, o = !!e.summary, r = ["content", "heading", "title", "description", "summary"].some((d) => s(this, a, I).call(this, `${e.id}.${d}`).length > 0), c = e.content ? z(e.content) : "", u = e.heading ? z(e.heading) : "";
  return t ? l`
			<uui-box headline="${e.groupName}" class="md-section-box ${r ? "mapped" : ""}">
				${e.heading ? l`
					<div class="md-part-block">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Title</span>
							<div class="md-part-actions">
								${s(this, a, _).call(this, `${e.id}.title`)}
								${s(this, a, _).call(this, `${e.id}.heading`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, a, P).call(this, e, "title");
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
								${s(this, a, _).call(this, `${e.id}.content`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, a, P).call(this, e, "content");
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
								${s(this, a, _).call(this, `${e.id}.description`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, a, P).call(this, e, "description");
  }}>Map</uui-button>
							</div>
						</div>
						<div class="md-part-content">
							<div class="md-section-content">${y(z(e.description))}</div>
						</div>
					</div>
				` : p}
				${o ? l`
					<div class="md-part-block md-part-block-bordered">
						<div class="md-part-header">
							<span class="section-label">${e.groupName} Summary</span>
							<div class="md-part-actions">
								${s(this, a, _).call(this, `${e.id}.summary`)}
								<uui-button class="md-map-btn" look="outline" compact label="Map"
									@click=${(d) => {
    d.stopPropagation(), s(this, a, P).call(this, e, "summary");
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
				<uui-box headline="${e.ruleName || e.heading || "Content"}" class="md-section-box ${r ? "mapped" : ""}">
					<div class="md-part-row">
						<div class="md-part-content">
							${c ? l`<div class="md-section-content">${y(c)}</div>` : p}
						</div>
						<div class="md-part-actions">
							${s(this, a, _).call(this, `${e.id}.content`)}
							${s(this, a, _).call(this, `${e.id}.heading`)}
							${s(this, a, _).call(this, `${e.id}.title`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${() => s(this, a, P).call(this, e, "content")}>Map</uui-button>
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
				<uui-button look="primary" label="Choose PDF" @click=${s(this, a, D)} ?disabled=${this._extracting}>
					${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
m.styles = [
  ot,
  it`
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
			}

			.composed-part-block {
				padding: var(--uui-size-space-4) 0;
				padding-left: calc(var(--uui-size-space-3) + 12px + var(--uui-size-space-2));
			}

			.composed-part-block:first-child {
				padding-top: 0;
			}

			.composed-part-block-bordered {
				border-top: 1px solid var(--uui-color-border);
			}

			.composed-part-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: var(--uui-size-space-2);
			}

			.composed-part-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				flex-shrink: 0;
				margin-left: auto;
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
f([
  v()
], m.prototype, "_extraction", 2);
f([
  v()
], m.prototype, "_areaDetection", 2);
f([
  v()
], m.prototype, "_config", 2);
f([
  v()
], m.prototype, "_workflowName", 2);
f([
  v()
], m.prototype, "_loading", 2);
f([
  v()
], m.prototype, "_extracting", 2);
f([
  v()
], m.prototype, "_error", 2);
f([
  v()
], m.prototype, "_successMessage", 2);
f([
  v()
], m.prototype, "_collapsed", 2);
f([
  v()
], m.prototype, "_transformResult", 2);
f([
  v()
], m.prototype, "_viewMode", 2);
f([
  v()
], m.prototype, "_sourceConfig", 2);
f([
  v()
], m.prototype, "_pageMode", 2);
f([
  v()
], m.prototype, "_pageInputValue", 2);
f([
  v()
], m.prototype, "_collapsePopoverOpen", 2);
f([
  v()
], m.prototype, "_excludedAreas", 2);
f([
  v()
], m.prototype, "_areaTemplate", 2);
f([
  v()
], m.prototype, "_sectionPickerOpen", 2);
f([
  v()
], m.prototype, "_teachingAreaIndex", 2);
f([
  v()
], m.prototype, "_inferenceResult", 2);
f([
  v()
], m.prototype, "_inferring", 2);
m = f([
  at("up-doc-workflow-source-view")
], m);
const kt = m;
export {
  m as UpDocWorkflowSourceViewElement,
  kt as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-BZODSXJo.js.map
