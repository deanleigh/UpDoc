import { d as Fe, g as oe, b as He, h as Be, i as Ve, j as Ge, k as H, l as We, s as B, m as je, n as se, o as qe, u as Xe, p as Je } from "./workflow.service-3oGM70O-.js";
import { m as I, n as V } from "./transforms-deUehta3.js";
import { UmbModalToken as G, UMB_MODAL_MANAGER_CONTEXT as P } from "@umbraco-cms/backoffice/modal";
import { U as Qe } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as l, nothing as m, unsafeHTML as A, css as Ye, state as v, customElement as Ze } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as et } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as tt } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as ne } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as it } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as at } from "@umbraco-cms/backoffice/media";
const ot = new G(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), st = new G(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), nt = new G("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "medium"
  }
});
var rt = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, re = (e) => {
  throw TypeError(e);
}, g = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? lt(t, i) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (r = (s ? c(t, i, r) : c(r)) || r);
  return s && r && rt(t, i, r), r;
}, W = (e, t, i) => t.has(e) || re("Cannot " + i), _ = (e, t, i) => (W(e, t, "read from private field"), i ? i.call(e) : t.get(e)), ae = (e, t, i) => t.has(e) ? re("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), ct = (e, t, i, s) => (W(e, t, "write to private field"), t.set(e, i), i), o = (e, t, i) => (W(e, t, "access private method"), i), b, a, le, j, q, X, ce, ue, J, C, T, de, pe, R, L, he, me, Q, fe, S, Y, D, M, ge, O, N, U, ve, E, be, _e, xe, we, K, Z, $e, ye, y, ke, ze, ee, F, Ce, Me, Pe, Se, Ae, Te, Ee, Re, De, Ne, Ie, Le, w, Oe, Ue;
let f = class extends et {
  constructor() {
    super(...arguments), ae(this, a), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, ae(this, b, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(it, (e) => {
      e && (e.setSaveHandler(() => o(this, a, S).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, a, le).call(this));
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
				${e ? o(this, a, De).call(this) : m}
				${e && this._viewMode === "elements" ? o(this, a, Ne).call(this) : m}
				${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : m}
				${e ? o(this, a, Ie).call(this) : o(this, a, Ue).call(this)}
			</umb-body-layout>
		`;
  }
};
b = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
le = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(ne);
      ct(this, b, await e.getLatestToken());
      const [t, i, s, r, n, c] = await Promise.all([
        Fe(this._workflowName, _(this, b)),
        oe(this._workflowName, _(this, b)),
        He(this._workflowName, _(this, b)),
        Be(this._workflowName, _(this, b)),
        Ve(this._workflowName, _(this, b)),
        Ge(this._workflowName, _(this, b))
      ]);
      this._extraction = t, this._areaDetection = i, this._config = s, this._transformResult = r, this._sourceConfig = n, this._areaTemplate = c;
      const d = t?.source.mediaKey;
      if (d && i) {
        const h = await H(this._workflowName, d, _(this, b));
        h && (this._transformResult = h);
      }
      n?.pages && Array.isArray(n.pages) && n.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, a, q).call(this, n.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
j = function(e) {
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
q = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((n, c) => n - c), i = [];
  let s = t[0], r = t[0];
  for (let n = 1; n < t.length; n++)
    t[n] === r + 1 || (i.push(s === r ? `${s}` : `${s}-${r}`), s = t[n]), r = t[n];
  return i.push(s === r ? `${s}` : `${s}-${r}`), i.join(", ");
};
X = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, a, j).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
ce = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, a, j).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
ue = async function() {
  if (!this._workflowName) return;
  const e = o(this, a, X).call(this);
  await qe(this._workflowName, e, _(this, b));
};
J = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const i of this._areaDetection.pages) {
    const s = i.page;
    e === "pages" && t.push(`page-${s}`), e === "areas" && i.areas.forEach((r, n) => t.push(`area-p${s}-a${n}`)), e === "sections" && i.areas.forEach((r, n) => {
      r.sections.forEach((c, d) => t.push(`p${s}-a${n}-s${d}`));
    });
  }
  return t;
};
C = function(e) {
  const t = o(this, a, J).call(this, e);
  return t.length > 0 && t.every((i) => this._collapsed.has(i));
};
T = function(e) {
  const t = o(this, a, J).call(this, e), i = o(this, a, C).call(this, e), s = new Set(this._collapsed);
  for (const r of t)
    i ? s.delete(r) : s.add(r);
  this._collapsed = s;
};
de = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
pe = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
R = async function() {
  if (!this._workflowName) return;
  const i = await (await this.getContext(P)).open(this, at, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!i?.selection?.length) return;
  const s = i.selection[0];
  s && await o(this, a, Y).call(this, s);
};
L = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(P)).open(this, ot, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const i = await t.onSubmit();
    if (i?.template) {
      const s = await B(this._workflowName, i.template, _(this, b));
      s && (this._areaTemplate = s, await o(this, a, S).call(this));
    }
  } catch {
  }
};
he = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const i of this._areaDetection.pages)
    for (const s of i.areas) {
      const r = s.name || "Area", n = V(r);
      if (t.has(n)) continue;
      t.add(n);
      const c = o(this, a, E).call(this, s), d = !!this._sourceConfig?.areaRules?.[n]?.rules?.length;
      e.push({ areaKey: n, areaName: r, elements: c, hasRules: d });
    }
  return e;
};
me = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
Q = async function(e, t, i) {
  if (!this._workflowName) return;
  const s = this._sourceConfig?.areaRules?.[e] ?? null, n = (await this.getContext(P)).open(this, st, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: i,
      existingRules: s
    }
  });
  try {
    const c = await n.onSubmit();
    if (c?.rules) {
      const d = {
        ...this._sourceConfig?.areaRules ?? {}
      };
      c.rules.rules.length > 0 ? d[e] = c.rules : delete d[e];
      const h = await je(this._workflowName, d, _(this, b));
      h && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: h });
      const u = this._extraction?.source.mediaKey;
      if (u) {
        const p = await H(this._workflowName, u, _(this, b));
        p && (this._transformResult = p);
      }
    }
  } catch {
  }
};
fe = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const i = o(this, a, X).call(this), n = await (await this.getContext(P)).open(this, Qe, {
    data: { mediaKey: e, totalPages: t, selectedPages: i }
  }).onSubmit().catch(() => null);
  n !== null && (n.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = o(this, a, q).call(this, n.selectedPages)), await o(this, a, ue).call(this));
};
S = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, a, R).call(this);
  await o(this, a, Y).call(this, e);
};
Y = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const i = await (await this.getContext(ne)).getLatestToken(), [s, r] = await Promise.all([
        We(this._workflowName, e, i),
        H(this._workflowName, e, i)
      ]);
      if (s && (this._extraction = s), r) {
        this._transformResult = r;
        const n = await oe(this._workflowName, i);
        this._areaDetection = n;
        const c = r.diagnostics, d = c.roleSections > 0 ? `, ${c.roleSections} role` : "";
        this._successMessage = `Content extracted — ${c.totalSections} sections (${c.bulletListSections} bullet, ${c.paragraphSections} paragraph, ${c.subHeadedSections} sub-headed${d})`, setTimeout(() => {
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
D = function(e) {
  return this._collapsed.has(e);
};
M = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
ge = function(e) {
  return this._transformResult ? this._transformResult.sections.find((i) => i.id === e)?.included ?? !0 : !0;
};
O = async function(e, t) {
  if (!this._workflowName) return;
  const i = await Xe(this._workflowName, e, t, _(this, b));
  i && (this._transformResult = i);
};
N = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const i of this._config.map.mappings)
    if (i.source === e && i.enabled)
      for (const s of i.destinations)
        t.push(s);
  return t;
};
U = function(e) {
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
ve = function(e, t) {
  if (!this._areaDetection) return t;
  let i = 0;
  for (const s of this._areaDetection.pages) {
    if (s.page === e) return i + t;
    i += s.areas.length;
  }
  return i + t;
};
E = function(e) {
  const t = [];
  for (const i of e.sections)
    i.heading && t.push(i.heading), t.push(...i.children);
  return t;
};
be = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const i = new Set(this._collapsed);
    i.delete(t), this._collapsed = i;
  }
};
_e = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await Je(
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
xe = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const i = { ...this._areaTemplate, areas: t }, s = await B(this._workflowName, i, _(this, b));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, a, S).call(this));
};
we = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const i = { ...this._areaTemplate, areas: t }, s = await B(this._workflowName, i, _(this, b));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, a, S).call(this));
};
K = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
Z = function(e) {
  return V(e.name || "");
};
$e = function(e) {
  const t = o(this, a, Z).call(this, e);
  return !!this._sourceConfig?.areaRules?.[t]?.rules?.length;
};
ye = function(e, t) {
  return this._transformResult ? this._transformResult.sections.filter(
    (i) => i.areaColor === e.color && i.page === t
  ) : [];
};
y = async function(e, t = "content") {
  if (!this._workflowName || !this._config?.destination) return;
  const s = (await this.getContext(P)).open(this, nt, {
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
  const n = `${e.id}.${t}`, c = this._config.map?.mappings ?? [], d = {
    source: n,
    destinations: r.selectedTargets.map(($) => ({ target: $.target, blockKey: $.blockKey })),
    enabled: !0
  }, h = c.findIndex(($) => $.source === n), u = h >= 0 ? c.map(($, z) => z === h ? d : $) : [...c, d], p = {
    ...this._config.map ?? { version: "1.0", mappings: [] },
    mappings: u
  }, k = await se(this._workflowName, p, _(this, b));
  k && (this._config = { ...this._config, map: k });
};
ke = async function(e, t) {
  if (!this._workflowName || !this._config?.map) return;
  const i = this._config.map.mappings, s = i.findIndex((u) => u.source === e);
  if (s < 0) return;
  const n = i[s].destinations.filter(
    (u) => !(u.target === t.target && u.blockKey === t.blockKey)
  );
  let c;
  n.length === 0 ? c = i.filter((u, p) => p !== s) : c = i.map(
    (u, p) => p === s ? { ...u, destinations: n } : u
  );
  const d = { ...this._config.map, mappings: c }, h = await se(this._workflowName, d, _(this, b));
  h && (this._config = { ...this._config, map: h });
};
ze = function(e, t = !0) {
  const i = e.content.length > 100 ? e.content.substring(0, 100).replace(/\r?\n/g, " ") + "…" : e.content.replace(/\r?\n/g, " "), s = ["content", "heading", "title", "description", "summary"], r = s.some((n) => o(this, a, N).call(this, `${e.id}.${n}`).length > 0);
  return l`
			<div class="composed-section-row">
				<span class="composed-role">${e.heading ?? "Content"}</span>
				<span class="composed-preview">${i}</span>
				${r ? s.map((n) => o(this, a, w).call(this, `${e.id}.${n}`)) : m}
				${t ? l`
					<uui-button
						look="outline"
						compact
						label="Map"
						@click=${(n) => {
    n.stopPropagation(), o(this, a, y).call(this, e);
  }}>
						Map
					</uui-button>
				` : m}
			</div>
		`;
};
ee = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
F = function(e, t) {
  const i = t === "heading" ? "heading" : o(this, a, ee).call(this, e.text), s = i === "heading" ? "Heading" : i === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${i}">${s}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : m}
					</div>
				</div>
			</div>
		`;
};
Ce = function(e, t, i, s) {
  const r = o(this, a, D).call(this, t), n = e.heading ? V(e.heading.text) : `preamble-p${i}-a${s}`, c = o(this, a, ge).call(this, n);
  if (!e.heading)
    return l`
				<div class="area-section ${c ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, a, M).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${c ? "Included" : "Excluded"}"
							?checked=${c}
							@click=${(p) => p.stopPropagation()}
							@change=${(p) => o(this, a, O).call(this, n, p.target.checked)}>
						</uui-toggle>
					</div>
					${c && !r ? l`
						${e.children.map((p) => o(this, a, F).call(this, p))}
					` : m}
				</div>
			`;
  const d = e.heading, h = e.children.length, u = h > 0;
  return l`
			<div class="area-section ${c ? "" : "excluded"}">
				<div class="section-heading" @click=${u ? () => o(this, a, M).call(this, t) : m}>
					${u ? l`<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>` : l`<uui-icon class="collapse-chevron placeholder"></uui-icon>`}
					<span class="section-label">Section</span>
					<span class="section-separator">–</span>
					<span class="heading-text" title="${d.text}">${d.text}</span>
					${u ? l`<span class="group-count">${h} element${h !== 1 ? "s" : ""}</span>` : m}
					<uui-toggle
						label="${c ? "Included" : "Excluded"}"
						?checked=${c}
						@click=${(p) => p.stopPropagation()}
						@change=${(p) => o(this, a, O).call(this, n, p.target.checked)}>
					</uui-toggle>
				</div>
				${u && !r && c ? l`
					<div class="section-children">
						${e.children.map((p) => o(this, a, F).call(this, p))}
					</div>
				` : m}
			</div>
		`;
};
Me = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
Pe = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, i = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, s = o(this, a, ee).call(this, e.text), r = s === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${i ? "teach-matched" : ""}"
				@click=${() => o(this, a, _e).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${s}">${r}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : m}
					</div>
				</div>
			</div>
		`;
};
Se = function() {
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
						<uui-button look="primary" color="default" label="Confirm" @click=${() => o(this, a, xe).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => o(this, a, K).call(this)}>Cancel</uui-button>
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
					<uui-button look="secondary" compact label="No Sections" @click=${() => o(this, a, we).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => o(this, a, K).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
Ae = function(e, t, i) {
  const s = `area-p${t}-a${i}`, r = o(this, a, ve).call(this, t, i), n = this._teachingAreaIndex === r, c = n ? !1 : o(this, a, D).call(this, s), d = !this._excludedAreas.has(s), h = o(this, a, Z).call(this, e), u = o(this, a, $e).call(this, e), p = u && this._transformResult ? o(this, a, ye).call(this, e, t) : [], k = u && p.length > 0, $ = k ? p.length : e.sections.length, z = e.sectionPattern != null, te = z ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, ie = this._sourceConfig?.areaRules?.[h]?.rules?.length ?? 0;
  return l`
			<div class="detected-area ${d ? "" : "area-excluded"} ${n ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !n && o(this, a, M).call(this, s)}>
					<uui-icon class="collapse-chevron" name="${c ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e.name || `Area ${i + 1}`}</span>
					${u ? l`<span class="meta-badge rules-badge">${ie} rule${ie !== 1 ? "s" : ""}</span>` : te ? l`<span class="meta-badge structure-badge">${te}</span>` : m}
					<span class="header-spacer"></span>
					<span class="group-count">${$} section${$ !== 1 ? "s" : ""}</span>
					${n ? m : l`
						${u ? l`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${(x) => {
    x.stopPropagation(), o(this, a, Q).call(this, h, e.name || "", o(this, a, E).call(this, e));
  }}
								?disabled=${this._teachingAreaIndex !== null}>
								<uui-icon name="icon-settings"></uui-icon>
								Edit Rules
							</uui-button>
						` : l`
							<uui-button
								look="outline"
								compact
								label="${z ? "Redefine Structure" : "Define Structure"}"
								@click=${(x) => {
    x.stopPropagation(), o(this, a, be).call(this, r, s);
  }}
								?disabled=${this._teachingAreaIndex !== null && !n}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${z ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${u ? m : l`
						<uui-toggle
							label="${d ? "Included" : "Excluded"}"
							?checked=${d}
							@click=${(x) => x.stopPropagation()}
							@change=${() => o(this, a, Me).call(this, s)}>
						</uui-toggle>
					`}
				</div>
				${c ? m : l`
					${n ? l`
						${o(this, a, Se).call(this)}
						<div class="teach-elements">
							${o(this, a, E).call(this, e).map((x) => o(this, a, Pe).call(this, x))}
						</div>
					` : k ? l`
						<div class="composed-sections">
							${p.map((x) => o(this, a, ze).call(this, x, !1))}
						</div>
					` : l`
						${e.sections.map(
    (x, Ke) => o(this, a, Ce).call(this, x, `p${t}-a${i}-s${Ke}`, t, i)
  )}
					`}
				`}
			</div>
		`;
};
Te = function(e, t) {
  const i = `page-${e}`, s = o(this, a, D).call(this, i), r = t.length, n = t.reduce((d, h) => d + h.sections.length, 0), c = o(this, a, ce).call(this, e);
  return l`
			<uui-box class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => o(this, a, M).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${s ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${n} section${n !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
				</div>
				${s ? m : l`
					${t.map((d, h) => o(this, a, Ae).call(this, d, e, h))}
				`}
			</uui-box>
		`;
};
Ee = function() {
  return this._areaDetection ? l`
			${this._areaDetection.pages.map(
    (e) => o(this, a, Te).call(this, e.page, e.areas)
  )}
		` : m;
};
Re = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((i, s) => i + s.sections.length, 0), 0) : 0;
};
De = function() {
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
Ne = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return m;
  const i = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), s = e ? this._areaDetection.pages.length : i, n = s < i ? `${s} of ${i}` : `${i}`, c = e ? this._areaDetection.diagnostics.areasDetected : 0, d = e ? o(this, a, Re).call(this) : 0, h = t ? this._extraction.source.fileName : "", u = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return l`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${h}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${u}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, a, R)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${n}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${o(this, a, fe)}>
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
							${this._areaTemplate ? l`<uui-button look="primary" color="default" label="Edit Areas" @click=${o(this, a, L)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : l`<uui-button look="primary" color="default" label="Define Areas" @click=${o(this, a, L)}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${d}</span>
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
									@toggle=${o(this, a, me)}>
									<umb-popover-layout>
										${o(this, a, he).call(this).map((p) => l`
											<uui-menu-item
												label="${p.areaName}"
												@click=${() => o(this, a, Q).call(this, p.areaKey, p.areaName, p.elements)}>
												<uui-icon slot="icon" name="${p.hasRules ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
												<span slot="badge" class="section-picker-meta">${p.elements.length} el</span>
											</uui-menu-item>
										`)}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : m}
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
						@toggle=${o(this, a, pe)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, a, de).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, C).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, a, T).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, C).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, a, T).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, a, C).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, a, T).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : m}
		`;
};
Ie = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, a, Ee).call(this) : m : o(this, a, Le).call(this);
};
Le = function() {
  if (!this._transformResult)
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = this._transformResult.sections.filter((i) => i.included), t = this._transformResult.sections.length;
  return l`
				${e.map((i) => o(this, a, Oe).call(this, i))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
			</div>
		`;
};
w = function(e) {
  const t = o(this, a, N).call(this, e);
  return t.length === 0 ? m : t.map((i) => l`<uui-tag color="positive" look="primary" class="mapped-tag" title="${o(this, a, U).call(this, i)}">
			${o(this, a, U).call(this, i)}
			<button class="unmap-x" title="Remove mapping" @click=${(s) => {
    s.stopPropagation(), o(this, a, ke).call(this, e, i);
  }}>&times;</button>
		</uui-tag>`);
};
Oe = function(e) {
  const t = e.heading && e.content && e.heading.trim() === e.content.trim(), i = !!e.description, s = !!e.summary, n = !!e.heading && !!e.content && !t || i || s, d = ["content", "heading", "title", "description", "summary"].some((u) => o(this, a, N).call(this, `${e.id}.${u}`).length > 0), h = e.content && !t ? I(e.content) : "";
  return n ? l`
			<uui-box headline="${e.heading || "Content"}" class="md-section-box ${d ? "mapped" : ""}">
				${e.heading ? l`
					<div class="md-part-row">
						<div class="md-part-content">
							<span>${e.heading}</span>
						</div>
						<div class="md-part-actions">
							${o(this, a, w).call(this, `${e.id}.title`)}
							${o(this, a, w).call(this, `${e.id}.heading`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${(u) => {
    u.stopPropagation(), o(this, a, y).call(this, e, "title");
  }}>Map</uui-button>
						</div>
					</div>
				` : m}
				${h ? l`
					<div class="md-part-row md-part-row-bordered">
						<div class="md-part-content">
							<div class="md-section-content">${A(h)}</div>
						</div>
						<div class="md-part-actions">
							${o(this, a, w).call(this, `${e.id}.content`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${(u) => {
    u.stopPropagation(), o(this, a, y).call(this, e, "content");
  }}>Map</uui-button>
						</div>
					</div>
				` : m}
				${i ? l`
					<div class="md-part-row md-part-row-bordered">
						<div class="md-part-content">
							<div class="md-section-content">${A(I(e.description))}</div>
						</div>
						<div class="md-part-actions">
							${o(this, a, w).call(this, `${e.id}.description`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${(u) => {
    u.stopPropagation(), o(this, a, y).call(this, e, "description");
  }}>Map</uui-button>
						</div>
					</div>
				` : m}
				${s ? l`
					<div class="md-part-row md-part-row-bordered">
						<div class="md-part-content">
							<div class="md-section-content">${A(I(e.summary))}</div>
						</div>
						<div class="md-part-actions">
							${o(this, a, w).call(this, `${e.id}.summary`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${(u) => {
    u.stopPropagation(), o(this, a, y).call(this, e, "summary");
  }}>Map</uui-button>
						</div>
					</div>
				` : m}
			</uui-box>
		` : l`
				<uui-box headline="${e.heading || "Content"}" class="md-section-box ${d ? "mapped" : ""}">
					<div class="md-part-row">
						<div class="md-part-content">
							${h ? l`<div class="md-section-content">${A(h)}</div>` : m}
						</div>
						<div class="md-part-actions">
							${o(this, a, w).call(this, `${e.id}.content`)}
							${o(this, a, w).call(this, `${e.id}.heading`)}
							${o(this, a, w).call(this, `${e.id}.title`)}
							<uui-button class="md-map-btn" look="outline" compact label="Map"
								@click=${() => o(this, a, y).call(this, e, "content")}>Map</uui-button>
						</div>
					</div>
				</uui-box>
			`;
};
Ue = function() {
  return l`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${o(this, a, R)} ?disabled=${this._extracting}>
					${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
f.styles = [
  tt,
  Ye`
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

			/* Section boxes */
			.md-section-box {
				margin-bottom: var(--uui-size-space-3);
			}

			.md-section-box.mapped {
				border-left: 3px solid var(--uui-color-positive);
			}

			/* Part rows within section boxes */
			.md-part-row {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-3) 0;
			}

			.md-part-row-bordered {
				border-top: 1px solid var(--uui-color-border);
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
  Ze("up-doc-workflow-source-view")
], f);
const xt = f;
export {
  f as UpDocWorkflowSourceViewElement,
  xt as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-Dik1G0Rv.js.map
