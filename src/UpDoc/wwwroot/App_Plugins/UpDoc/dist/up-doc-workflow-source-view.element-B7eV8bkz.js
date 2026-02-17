import { d as Le, g as te, b as Oe, h as Ue, i as Fe, j as He, k as Ke, l as ae, s as O, m as Be, n as Ve, o as Ge, u as We, p as je } from "./workflow.service-D_fkSdCh.js";
import { n as U, m as Xe } from "./transforms-deUehta3.js";
import { UmbModalToken as F, UMB_MODAL_MANAGER_CONTEXT as k } from "@umbraco-cms/backoffice/modal";
import { U as qe } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as l, nothing as f, css as Je, state as g, customElement as Qe } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Ye } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Ze } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as ie } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as et } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as tt } from "@umbraco-cms/backoffice/media";
const at = new F("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "medium"
  }
}), it = new F(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), st = new F(
  "UpDoc.SectionRulesEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var ot = Object.defineProperty, nt = Object.getOwnPropertyDescriptor, se = (e) => {
  throw TypeError(e);
}, h = (e, t, a, s) => {
  for (var n = s > 1 ? void 0 : s ? nt(t, a) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (n = (s ? c(t, a, n) : c(n)) || n);
  return s && n && ot(t, a, n), n;
}, H = (e, t, a) => t.has(e) || se("Cannot " + a), _ = (e, t, a) => (H(e, t, "read from private field"), a ? a.call(e) : t.get(e)), ee = (e, t, a) => t.has(e) ? se("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), rt = (e, t, a, s) => (H(e, t, "write to private field"), t.set(e, a), a), o = (e, t, a) => (H(e, t, "access private method"), a), m, i, oe, K, B, V, ne, re, G, $, C, le, ce, T, M, ue, pe, W, de, z, j, A, y, he, D, N, w, R, fe, P, ge, me, ve, _e, I, X, be, xe, we, q, S, $e, ye, ke, ze, Ce, Se, Re, Pe, Te, Ae, Ee, L, Me, De, Ne;
let d = class extends Ye {
  constructor() {
    super(...arguments), ee(this, i), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1, ee(this, m, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(et, (e) => {
      e && (e.setSaveHandler(() => o(this, i, z).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, i, oe).call(this));
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
				${e ? o(this, i, Te).call(this) : f}
				${e && this._viewMode === "elements" ? o(this, i, Ae).call(this) : f}
				${this._successMessage ? l`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : f}
				${e ? o(this, i, Ee).call(this) : o(this, i, Ne).call(this)}
			</umb-body-layout>
		`;
  }
};
m = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
oe = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(ie);
      rt(this, m, await e.getLatestToken());
      const [t, a, s, n, r, c] = await Promise.all([
        Le(this._workflowName, _(this, m)),
        te(this._workflowName, _(this, m)),
        Oe(this._workflowName, _(this, m)),
        Ue(this._workflowName, _(this, m)),
        Fe(this._workflowName, _(this, m)),
        He(this._workflowName, _(this, m))
      ]);
      this._extraction = t, this._areaDetection = a, this._config = s, this._transformResult = n, this._sourceConfig = r, this._areaTemplate = c, r?.pages && Array.isArray(r.pages) && r.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, i, B).call(this, r.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Failed to load data", console.error("Failed to load source data:", e);
    } finally {
      this._loading = !1;
    }
  }
};
K = function(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e.split(",")) {
    const s = a.trim();
    if (!s) continue;
    const n = s.split("-").map((r) => parseInt(r.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      t.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let r = n[0]; r <= n[1]; r++)
        t.add(r);
  }
  return [...t].sort((a, s) => a - s);
};
B = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, c) => r - c), a = [];
  let s = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (a.push(s === n ? `${s}` : `${s}-${n}`), s = t[r]), n = t[r];
  return a.push(s === n ? `${s}` : `${s}-${n}`), a.join(", ");
};
V = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, i, K).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
ne = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, i, K).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
re = async function() {
  if (!this._workflowName) return;
  const e = o(this, i, V).call(this);
  await Ve(this._workflowName, e, _(this, m));
};
G = function(e) {
  if (!this._areaDetection) return [];
  const t = [];
  for (const a of this._areaDetection.pages) {
    const s = a.page;
    e === "pages" && t.push(`page-${s}`), e === "areas" && a.areas.forEach((n, r) => t.push(`area-p${s}-a${r}`)), e === "sections" && a.areas.forEach((n, r) => {
      n.sections.forEach((c, u) => t.push(`p${s}-a${r}-s${u}`));
    });
  }
  return t;
};
$ = function(e) {
  const t = o(this, i, G).call(this, e);
  return t.length > 0 && t.every((a) => this._collapsed.has(a));
};
C = function(e) {
  const t = o(this, i, G).call(this, e), a = o(this, i, $).call(this, e), s = new Set(this._collapsed);
  for (const n of t)
    a ? s.delete(n) : s.add(n);
  this._collapsed = s;
};
le = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
ce = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
T = async function() {
  if (!this._workflowName) return;
  const a = await (await this.getContext(k)).open(this, tt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const s = a.selection[0];
  s && await o(this, i, j).call(this, s);
};
M = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(k)).open(this, it, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const a = await t.onSubmit();
    if (a?.template) {
      const s = await O(this._workflowName, a.template, _(this, m));
      s && (this._areaTemplate = s, await o(this, i, z).call(this));
    }
  } catch {
  }
};
ue = function() {
  if (!this._areaDetection) return [];
  const e = [], t = /* @__PURE__ */ new Set();
  for (const a of this._areaDetection.pages)
    for (const s of a.areas) {
      const n = s.name || "Area", r = U(n);
      if (t.has(r)) continue;
      t.add(r);
      const c = o(this, i, P).call(this, s), u = !!this._sourceConfig?.areaRules?.[r]?.rules?.length;
      e.push({ areaKey: r, areaName: n, elements: c, hasRules: u });
    }
  return e;
};
pe = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
W = async function(e, t, a) {
  if (!this._workflowName) return;
  const s = this._sourceConfig?.areaRules?.[e] ?? null, r = (await this.getContext(k)).open(this, st, {
    data: {
      workflowName: this._workflowName,
      sectionId: e,
      sectionHeading: t,
      elements: a,
      existingRules: s
    }
  });
  try {
    const c = await r.onSubmit();
    if (c?.rules) {
      const u = {
        ...this._sourceConfig?.areaRules ?? {}
      };
      c.rules.rules.length > 0 ? u[e] = c.rules : delete u[e];
      const v = await Be(this._workflowName, u, _(this, m));
      v && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, areaRules: v });
      const p = this._extraction?.source.mediaKey;
      if (p) {
        const b = await ae(this._workflowName, p, _(this, m));
        b && (this._transformResult = b);
      }
    }
  } catch {
  }
};
de = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const a = o(this, i, V).call(this), r = await (await this.getContext(k)).open(this, qe, {
    data: { mediaKey: e, totalPages: t, selectedPages: a }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = o(this, i, B).call(this, r.selectedPages)), await o(this, i, re).call(this));
};
z = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, i, T).call(this);
  await o(this, i, j).call(this, e);
};
j = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const a = await (await this.getContext(ie)).getLatestToken(), [s, n] = await Promise.all([
        Ke(this._workflowName, e, a),
        ae(this._workflowName, e, a)
      ]);
      if (s && (this._extraction = s), n) {
        this._transformResult = n;
        const r = await te(this._workflowName, a);
        this._areaDetection = r;
        const c = n.diagnostics, u = c.roleSections > 0 ? `, ${c.roleSections} role` : "";
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
A = function(e) {
  return this._collapsed.has(e);
};
y = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
he = function(e) {
  return this._transformResult ? this._transformResult.sections.find((a) => a.id === e)?.included ?? !0 : !0;
};
D = async function(e, t) {
  if (!this._workflowName) return;
  const a = await We(this._workflowName, e, t, _(this, m));
  a && (this._transformResult = a);
};
N = async function(e) {
  if (!this._config?.destination || !this._workflowName) return;
  const s = await (await this.getContext(k)).open(this, at, {
    data: {
      destination: this._config.destination,
      existingMappings: this._config.map?.mappings
    }
  }).onSubmit().catch(() => null);
  if (!s?.selectedTargets?.length) return;
  const n = [...this._config.map?.mappings ?? []], r = n.findIndex((p) => p.source === e), c = {
    source: e,
    destinations: s.selectedTargets.map((p) => ({ target: p.target, blockKey: p.blockKey })),
    enabled: !0
  };
  r >= 0 ? n[r] = c : n.push(c);
  const u = { ...this._config.map, version: this._config.map?.version ?? "1.0", mappings: n };
  await Ge(this._workflowName, u, _(this, m)) && (this._config = { ...this._config, map: u });
};
w = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const a of this._config.map.mappings)
    if (a.source === e && a.enabled)
      for (const s of a.destinations)
        t.push(s);
  return t;
};
R = function(e) {
  if (!this._config?.destination) return e.target;
  if (e.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const s = a.blocks.find((n) => n.key === e.blockKey);
      if (s) {
        const n = s.properties?.find((r) => r.alias === e.target);
        return `${s.label} > ${n?.label || e.target}`;
      }
    }
  const t = this._config.destination.fields.find((a) => a.alias === e.target);
  if (t) return t.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const s of a.blocks) {
        const n = s.properties?.find((r) => r.alias === e.target);
        if (n) return `${s.label} > ${n.label || n.alias}`;
      }
  return e.target;
};
fe = function(e, t) {
  if (!this._areaDetection) return t;
  let a = 0;
  for (const s of this._areaDetection.pages) {
    if (s.page === e) return a + t;
    a += s.areas.length;
  }
  return a + t;
};
P = function(e) {
  const t = [];
  for (const a of e.sections)
    a.heading && t.push(a.heading), t.push(...a.children);
  return t;
};
ge = function(e, t) {
  if (this._teachingAreaIndex = e, this._inferenceResult = null, this._inferring = !1, this._collapsed.has(t)) {
    const a = new Set(this._collapsed);
    a.delete(t), this._collapsed = a;
  }
};
me = async function(e) {
  if (!(this._teachingAreaIndex === null || !this._workflowName || this._inferring)) {
    this._inferring = !0, this._inferenceResult = null;
    try {
      const t = await je(
        this._workflowName,
        this._teachingAreaIndex,
        e,
        _(this, m)
      );
      this._inferenceResult = t;
    } catch (t) {
      console.error("Inference failed:", t), this._error = "Failed to infer section pattern";
    } finally {
      this._inferring = !1;
    }
  }
};
ve = async function() {
  if (this._teachingAreaIndex === null || !this._inferenceResult || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: this._inferenceResult.pattern };
  const a = { ...this._areaTemplate, areas: t }, s = await O(this._workflowName, a, _(this, m));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, i, z).call(this));
};
_e = async function() {
  if (this._teachingAreaIndex === null || !this._workflowName || !this._areaTemplate) return;
  const e = this._teachingAreaIndex;
  if (e < 0 || e >= this._areaTemplate.areas.length) return;
  const t = [...this._areaTemplate.areas];
  t[e] = { ...t[e], sectionPattern: { conditions: [] } };
  const a = { ...this._areaTemplate, areas: t }, s = await O(this._workflowName, a, _(this, m));
  s && (this._areaTemplate = s, this._teachingAreaIndex = null, this._inferenceResult = null, await o(this, i, z).call(this));
};
I = function() {
  this._teachingAreaIndex = null, this._inferenceResult = null, this._inferring = !1;
};
X = function(e) {
  return U(e.name || "");
};
be = function(e) {
  const t = o(this, i, X).call(this, e);
  return !!this._sourceConfig?.areaRules?.[t]?.rules?.length;
};
xe = function(e, t) {
  return this._transformResult ? this._transformResult.sections.filter(
    (a) => a.areaColor === e.color && a.page === t
  ) : [];
};
we = function(e) {
  const t = e.content.length > 100 ? e.content.substring(0, 100).replace(/\r?\n/g, " ") + "…" : e.content.replace(/\r?\n/g, " "), a = o(this, i, w).call(this, `${e.id}.content`), s = o(this, i, w).call(this, `${e.id}.heading`), n = [...a, ...s], r = n.length > 0;
  return l`
			<div class="composed-section-row">
				<span class="composed-role">${e.heading ?? "Content"}</span>
				<span class="composed-preview">${t}</span>
				<span class="header-spacer"></span>
				${r ? n.map((c) => l`<span class="meta-badge mapped-target" title="${o(this, i, R).call(this, c)}">
						<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${o(this, i, R).call(this, c)}
					</span>`) : l`<span class="composed-unmapped">unmapped</span>`}
			</div>
		`;
};
q = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
S = function(e, t) {
  const a = t === "heading" ? "heading" : o(this, i, q).call(this, e.text), s = a === "heading" ? "Heading" : a === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${a}">${s}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : f}
					</div>
				</div>
			</div>
		`;
};
$e = function(e, t, a, s) {
  const n = o(this, i, A).call(this, t), r = e.heading ? U(e.heading.text) : `preamble-p${a}-a${s}`, c = o(this, i, he).call(this, r);
  if (!e.heading)
    return l`
				<div class="area-section ${c ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, i, y).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="header-spacer"></span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${c ? "Included" : "Excluded"}"
							?checked=${c}
							@click=${(p) => p.stopPropagation()}
							@change=${(p) => o(this, i, D).call(this, r, p.target.checked)}>
						</uui-toggle>
					</div>
					${c && !n ? l`
						${e.children.map((p) => o(this, i, S).call(this, p))}
					` : f}
				</div>
			`;
  const u = e.heading, v = e.children.length + 1;
  return l`
			<div class="area-section ${c ? "" : "excluded"}">
				<div class="section-heading" @click=${() => o(this, i, y).call(this, t)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="section-label">Section</span>
					<span class="section-separator">–</span>
					<span class="heading-text">${u.text}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${v} element${v !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${c ? "Included" : "Excluded"}"
						?checked=${c}
						@click=${(p) => p.stopPropagation()}
						@change=${(p) => o(this, i, D).call(this, r, p.target.checked)}>
					</uui-toggle>
				</div>
				${!n && c ? l`
					<div class="section-children">
						${o(this, i, S).call(this, u, "heading")}
						${e.children.map((p) => o(this, i, S).call(this, p))}
					</div>
				` : f}
			</div>
		`;
};
ye = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
ke = function(e) {
  const t = this._inferenceResult?.clickedElementId === e.id, a = this._inferenceResult?.matchingElementIds?.includes(e.id) ?? !1, s = o(this, i, q).call(this, e.text), n = s === "list" ? "List Item" : "Paragraph";
  return l`
			<div class="element-item teach-element ${t ? "teach-clicked" : ""} ${a ? "teach-matched" : ""}"
				@click=${() => o(this, i, me).call(this, e.id)}>
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${s}">${n}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? l`<span class="meta-badge text-case">UPPERCASE</span>` : f}
					</div>
				</div>
			</div>
		`;
};
ze = function() {
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
						<uui-button look="primary" color="default" label="Confirm" @click=${() => o(this, i, ve).call(this)}>
							<uui-icon name="icon-check"></uui-icon> Confirm
						</uui-button>
						<uui-button look="secondary" label="Cancel" @click=${() => o(this, i, I).call(this)}>Cancel</uui-button>
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
					<uui-button look="secondary" compact label="No Sections" @click=${() => o(this, i, _e).call(this)}
						title="This area has no repeating section structure">
						No Sections
					</uui-button>
					<uui-button look="default" compact label="Cancel" @click=${() => o(this, i, I).call(this)}>Cancel</uui-button>
				</div>
			</div>
		`;
};
Ce = function(e, t, a) {
  const s = `area-p${t}-a${a}`, n = o(this, i, fe).call(this, t, a), r = this._teachingAreaIndex === n, c = r ? !1 : o(this, i, A).call(this, s), u = !this._excludedAreas.has(s), v = o(this, i, X).call(this, e), p = o(this, i, be).call(this, e), b = p && this._transformResult ? o(this, i, xe).call(this, e, t) : [], J = p && b.length > 0, Q = J ? b.length : e.sections.length, E = e.sectionPattern != null, Y = E ? e.sectionPattern.conditions.length > 0 ? "Configured" : "Flat" : null, Z = this._sourceConfig?.areaRules?.[v]?.rules?.length ?? 0;
  return l`
			<div class="detected-area ${u ? "" : "area-excluded"} ${r ? "area-teaching" : ""}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => !r && o(this, i, y).call(this, s)}>
					<uui-icon class="collapse-chevron" name="${c ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e.name || `Area ${a + 1}`}</span>
					${p ? l`<span class="meta-badge rules-badge">${Z} rule${Z !== 1 ? "s" : ""}</span>` : Y ? l`<span class="meta-badge structure-badge">${Y}</span>` : f}
					<span class="header-spacer"></span>
					<span class="group-count">${Q} section${Q !== 1 ? "s" : ""}</span>
					${r ? f : l`
						${p ? l`
							<uui-button
								look="outline"
								compact
								label="Edit Rules"
								@click=${(x) => {
    x.stopPropagation(), o(this, i, W).call(this, v, e.name || "", o(this, i, P).call(this, e));
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
								@click=${(x) => {
    x.stopPropagation(), o(this, i, ge).call(this, n, s);
  }}
								?disabled=${this._teachingAreaIndex !== null && !r}>
								<uui-icon name="icon-axis-rotation"></uui-icon>
								${E ? "Redefine" : "Define Structure"}
							</uui-button>
						`}
					`}
					${p ? f : l`
						<uui-toggle
							label="${u ? "Included" : "Excluded"}"
							?checked=${u}
							@click=${(x) => x.stopPropagation()}
							@change=${() => o(this, i, ye).call(this, s)}>
						</uui-toggle>
					`}
				</div>
				${c ? f : l`
					${r ? l`
						${o(this, i, ze).call(this)}
						<div class="teach-elements">
							${o(this, i, P).call(this, e).map((x) => o(this, i, ke).call(this, x))}
						</div>
					` : J ? l`
						<div class="composed-sections">
							${b.map((x) => o(this, i, we).call(this, x))}
						</div>
					` : l`
						${e.sections.map(
    (x, Ie) => o(this, i, $e).call(this, x, `p${t}-a${a}-s${Ie}`, t, a)
  )}
					`}
				`}
			</div>
		`;
};
Se = function(e, t) {
  const a = `page-${e}`, s = o(this, i, A).call(this, a), n = t.length, r = t.reduce((u, v) => u + v.sections.length, 0), c = o(this, i, ne).call(this, e);
  return l`
			<uui-box class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => o(this, i, y).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${s ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
				</div>
				${s ? f : l`
					${t.map((u, v) => o(this, i, Ce).call(this, u, e, v))}
				`}
			</uui-box>
		`;
};
Re = function() {
  return this._areaDetection ? l`
			${this._areaDetection.pages.map(
    (e) => o(this, i, Se).call(this, e.page, e.areas)
  )}
		` : f;
};
Pe = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((a, s) => a + s.sections.length, 0), 0) : 0;
};
Te = function() {
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
Ae = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return f;
  const a = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), s = e ? this._areaDetection.pages.length : a, r = s < a ? `${s} of ${a}` : `${a}`, c = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? o(this, i, Pe).call(this) : 0, v = t ? this._extraction.source.fileName : "", p = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return l`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${v}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${p}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, i, T)} ?disabled=${this._extracting}>
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
							<uui-button look="primary" color="default" label="Choose Pages" @click=${o(this, i, de)}>
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
							${this._areaTemplate ? l`<uui-button look="primary" color="default" label="Edit Areas" @click=${o(this, i, M)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : l`<uui-button look="primary" color="default" label="Define Areas" @click=${o(this, i, M)}>
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
									@toggle=${o(this, i, pe)}>
									<umb-popover-layout>
										${o(this, i, ue).call(this).map((b) => l`
											<uui-menu-item
												label="${b.areaName}"
												@click=${() => o(this, i, W).call(this, b.areaKey, b.areaName, b.elements)}>
												<uui-icon slot="icon" name="${b.hasRules ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
												<span slot="badge" class="section-picker-meta">${b.elements.length} el</span>
											</uui-menu-item>
										`)}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : f}
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
						@toggle=${o(this, i, ce)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, i, le).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, i, $).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, i, C).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, i, $).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, i, C).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, i, $).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, i, C).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : f}
		`;
};
Ee = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, i, Re).call(this) : f : o(this, i, De).call(this);
};
L = function(e) {
  const t = o(this, i, w).call(this, e);
  return t.length === 0 ? l`<uui-button look="secondary" compact label="Map" @click=${() => o(this, i, N).call(this, e)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : l`${t.map(
    (a) => l`<span class="meta-badge mapped-target" @click=${() => o(this, i, N).call(this, e)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${o(this, i, R).call(this, a)}
			</span>`
  )}`;
};
Me = function(e) {
  const t = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed",
    role: "Role"
  }, a = `${e.id}.heading`, s = `${e.id}.content`, n = o(this, i, w).call(this, a).length > 0, r = o(this, i, w).call(this, s).length > 0, c = n || r, u = e.heading ?? "Content";
  return l`
			<uui-box headline=${u} class="transformed-section ${c ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${e.pattern}">${t[e.pattern] ?? e.pattern}</span>
					<span class="meta-badge">p${e.page}</span>
					${e.areaColor ? l`<span class="area-color-swatch" style="background: ${e.areaColor};"></span>` : f}
					<span class="meta-badge">${e.childCount} item${e.childCount !== 1 ? "s" : ""}</span>
					${e.heading ? o(this, i, L).call(this, a) : f}
				</div>
				<div class="transformed-content" .innerHTML=${Xe(e.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${o(this, i, L).call(this, s)}
				</div>
			</uui-box>
		`;
};
De = function() {
  if (!this._transformResult)
    return l`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const e = this._transformResult.sections.filter((a) => a.included), t = this._transformResult.sections.length;
  return l`
			${e.map((a) => o(this, i, Me).call(this, a))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? l`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : f}
				${this._transformResult.diagnostics.roleSections > 0 ? l`<span class="meta-badge">${this._transformResult.diagnostics.roleSections} role</span>` : f}
			</div>
		`;
};
Ne = function() {
  return l`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${o(this, i, T)} ?disabled=${this._extracting}>
					${this._extracting ? l`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
d.styles = [
  Ze,
  Je`
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
				white-space: nowrap;
				min-width: 0;
				flex-shrink: 0;
			}

			.composed-preview {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				min-width: 0;
				flex: 1;
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
h([
  g()
], d.prototype, "_extraction", 2);
h([
  g()
], d.prototype, "_areaDetection", 2);
h([
  g()
], d.prototype, "_config", 2);
h([
  g()
], d.prototype, "_workflowName", 2);
h([
  g()
], d.prototype, "_loading", 2);
h([
  g()
], d.prototype, "_extracting", 2);
h([
  g()
], d.prototype, "_error", 2);
h([
  g()
], d.prototype, "_successMessage", 2);
h([
  g()
], d.prototype, "_collapsed", 2);
h([
  g()
], d.prototype, "_transformResult", 2);
h([
  g()
], d.prototype, "_viewMode", 2);
h([
  g()
], d.prototype, "_sourceConfig", 2);
h([
  g()
], d.prototype, "_pageMode", 2);
h([
  g()
], d.prototype, "_pageInputValue", 2);
h([
  g()
], d.prototype, "_collapsePopoverOpen", 2);
h([
  g()
], d.prototype, "_excludedAreas", 2);
h([
  g()
], d.prototype, "_areaTemplate", 2);
h([
  g()
], d.prototype, "_sectionPickerOpen", 2);
h([
  g()
], d.prototype, "_teachingAreaIndex", 2);
h([
  g()
], d.prototype, "_inferenceResult", 2);
h([
  g()
], d.prototype, "_inferring", 2);
d = h([
  Qe("up-doc-workflow-source-view")
], d);
const _t = d;
export {
  d as UpDocWorkflowSourceViewElement,
  _t as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-B7eV8bkz.js.map
