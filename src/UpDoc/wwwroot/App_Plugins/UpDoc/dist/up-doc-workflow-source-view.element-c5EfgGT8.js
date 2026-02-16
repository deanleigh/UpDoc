import { d as ye, g as F, b as ke, h as ze, i as Ce, j as Me, k as Pe, l as Se, s as Ee, m as De, n as Te, o as Ae, u as Ie } from "./workflow.service-CZ6YzcAN.js";
import { n as K, m as Re } from "./transforms-deUehta3.js";
import { UmbModalToken as N, UMB_MODAL_MANAGER_CONTEXT as k } from "@umbraco-cms/backoffice/modal";
import { U as Ne } from "./page-picker-modal.token-B0CgP9f1.js";
import { html as c, nothing as f, css as Le, state as g, customElement as Oe } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Ve } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Ue } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as W } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Be } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as He } from "@umbraco-cms/backoffice/media";
const Fe = new N("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
}), Ke = new N(
  "UpDoc.AreaEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "large"
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
var Ge = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, G = (e) => {
  throw TypeError(e);
}, d = (e, t, a, i) => {
  for (var n = i > 1 ? void 0 : i ? Xe(t, a) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (n = (i ? l(t, a, n) : l(n)) || n);
  return i && n && Ge(t, a, n), n;
}, L = (e, t, a) => t.has(e) || G("Cannot " + a), v = (e, t, a) => (L(e, t, "read from private field"), a ? a.call(e) : t.get(e)), H = (e, t, a) => t.has(e) ? G("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), je = (e, t, a, i) => (L(e, t, "write to private field"), t.set(e, a), a), o = (e, t, a) => (L(e, t, "access private method"), a), _, s, X, w, b, O, j, q, C, J, Q, z, V, $, M, Y, Z, E, T, ee, te, ae, ie, se, oe, U, B, D, y, ne, A, I, S, re, le, P, ce, ue, pe, de, he, ge, fe, me, _e, ve, R, be, xe, we;
let p = class extends Ve {
  constructor() {
    super(...arguments), H(this, s), this._extraction = null, this._areaDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._areaTemplate = null, this._sectionPickerOpen = !1, H(this, _, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Be, (e) => {
      e && (e.setSaveHandler(() => o(this, s, U).call(this)), this.observe(e.unique, (t) => {
        t && (this._workflowName = decodeURIComponent(t), o(this, s, X).call(this));
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
				${e ? o(this, s, me).call(this) : f}
				${e && this._viewMode === "elements" ? o(this, s, _e).call(this) : f}
				${this._successMessage ? c`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : f}
				${e ? o(this, s, ve).call(this) : o(this, s, we).call(this)}
			</umb-body-layout>
		`;
  }
};
_ = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
X = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const e = await this.getContext(W);
      je(this, _, await e.getLatestToken());
      const [t, a, i, n, r, l] = await Promise.all([
        ye(this._workflowName, v(this, _)),
        F(this._workflowName, v(this, _)),
        ke(this._workflowName, v(this, _)),
        ze(this._workflowName, v(this, _)),
        Ce(this._workflowName, v(this, _)),
        Me(this._workflowName, v(this, _))
      ]);
      this._extraction = t, this._areaDetection = a, this._config = i, this._transformResult = n, this._sourceConfig = r, this._areaTemplate = l, r?.pages && Array.isArray(r.pages) && r.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = o(this, s, b).call(this, r.pages)) : (this._pageMode = "all", this._pageInputValue = "");
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
b = function(e) {
  if (!e.length) return "";
  const t = [...e].sort((r, l) => r - l), a = [];
  let i = t[0], n = t[0];
  for (let r = 1; r < t.length; r++)
    t[r] === n + 1 || (a.push(i === n ? `${i}` : `${i}-${n}`), i = t[r]), n = t[r];
  return a.push(i === n ? `${i}` : `${i}-${n}`), a.join(", ");
};
O = function() {
  if (this._pageMode === "all") return null;
  const e = o(this, s, w).call(this, this._pageInputValue);
  return e.length > 0 ? e : null;
};
j = function(e) {
  if (this._pageMode === "all") return !0;
  const t = o(this, s, w).call(this, this._pageInputValue);
  return t.length === 0 || t.includes(e);
};
q = function(e) {
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t !== 0) {
    if (this._pageMode === "all") {
      const i = Array.from({ length: t }, (n, r) => r + 1).filter((n) => n !== e);
      this._pageMode = "custom", this._pageInputValue = o(this, s, b).call(this, i);
    } else {
      const a = o(this, s, w).call(this, this._pageInputValue);
      if (a.includes(e)) {
        const i = a.filter((n) => n !== e);
        this._pageInputValue = o(this, s, b).call(this, i), i.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const i = [...a, e].sort((n, r) => n - r);
        this._pageInputValue = o(this, s, b).call(this, i);
      }
      o(this, s, w).call(this, this._pageInputValue).length === t && (this._pageMode = "all", this._pageInputValue = "");
    }
    o(this, s, z).call(this);
  }
};
C = async function(e) {
  this._pageMode = e, e === "all" && (this._pageInputValue = ""), await o(this, s, z).call(this);
};
J = async function(e) {
  const t = e.target;
  this._pageInputValue = t.value;
};
Q = async function() {
  const e = o(this, s, w).call(this, this._pageInputValue);
  e.length > 0 ? (this._pageInputValue = o(this, s, b).call(this, e), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await o(this, s, z).call(this);
};
z = async function() {
  if (!this._workflowName) return;
  const e = o(this, s, O).call(this);
  await Te(this._workflowName, e, v(this, _));
};
V = function(e) {
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
  const t = o(this, s, V).call(this, e);
  return t.length > 0 && t.every((a) => this._collapsed.has(a));
};
M = function(e) {
  const t = o(this, s, V).call(this, e), a = o(this, s, $).call(this, e), i = new Set(this._collapsed);
  for (const n of t)
    a ? i.delete(n) : i.add(n);
  this._collapsed = i;
};
Y = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
Z = function(e) {
  this._collapsePopoverOpen = e.newState === "open";
};
E = async function() {
  if (!this._workflowName) return;
  const a = await (await this.getContext(k)).open(this, He, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!a?.selection?.length) return;
  const i = a.selection[0];
  i && await o(this, s, B).call(this, i);
};
T = async function() {
  if (!this._workflowName) return;
  const t = (await this.getContext(k)).open(this, Ke, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._areaTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const a = await t.onSubmit();
    if (a?.template) {
      const i = await Ee(this._workflowName, a.template, v(this, _));
      i && (this._areaTemplate = i, await o(this, s, U).call(this));
    }
  } catch {
  }
};
ee = function() {
  if (!this._transformResult || !this._areaDetection) return [];
  const e = [];
  for (const t of this._transformResult.sections) {
    if (!t.included) continue;
    const a = o(this, s, te).call(this, t);
    e.push({
      id: t.id,
      heading: t.heading ?? "Content",
      elements: a
    });
  }
  return e;
};
te = function(e) {
  if (!this._areaDetection) return [];
  for (const t of this._areaDetection.pages)
    if (t.page === e.page) {
      for (const a of t.areas)
        for (const i of a.sections)
          if ((i.heading ? K(i.heading.text) : o(this, s, ae).call(this, t.page, a, t)) === e.id) {
            const r = [];
            return i.heading && r.push(i.heading), r.push(...i.children), r;
          }
    }
  return [];
};
ae = function(e, t, a) {
  const i = a.areas.indexOf(t);
  return `preamble-p${e}-z${i}`;
};
ie = function(e) {
  this._sectionPickerOpen = e.newState === "open";
};
se = async function(e, t, a) {
  if (!this._workflowName) return;
  const i = this._sourceConfig?.sectionRules?.[e] ?? null, r = (await this.getContext(k)).open(this, We, {
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
        ...this._sourceConfig?.sectionRules ?? {}
      };
      l.rules.rules.length > 0 ? u[e] = l.rules : delete u[e];
      const m = await De(this._workflowName, u, v(this, _));
      m && this._sourceConfig && (this._sourceConfig = { ...this._sourceConfig, sectionRules: m });
    }
  } catch {
  }
};
oe = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e) return;
  const t = this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (t === 0) return;
  const a = o(this, s, O).call(this), r = await (await this.getContext(k)).open(this, Ne, {
    data: { mediaKey: e, totalPages: t, selectedPages: a }
  }).onSubmit().catch(() => null);
  r !== null && (r.selectedPages === null ? (this._pageMode = "all", this._pageInputValue = "") : (this._pageMode = "custom", this._pageInputValue = o(this, s, b).call(this, r.selectedPages)), await o(this, s, z).call(this));
};
U = async function() {
  const e = this._extraction?.source.mediaKey;
  if (!e)
    return o(this, s, E).call(this);
  await o(this, s, B).call(this, e);
};
B = async function(e) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const a = await (await this.getContext(W)).getLatestToken(), [i, n] = await Promise.all([
        Pe(this._workflowName, e, a),
        Se(this._workflowName, e, a)
      ]);
      if (i && (this._extraction = i), n) {
        this._transformResult = n;
        const r = await F(this._workflowName, a);
        this._areaDetection = r;
        const l = n.diagnostics;
        this._successMessage = `Content extracted — ${l.totalSections} sections (${l.bulletListSections} bullet, ${l.paragraphSections} paragraph, ${l.subHeadedSections} sub-headed)`, setTimeout(() => {
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
D = function(e) {
  return this._collapsed.has(e);
};
y = function(e) {
  const t = new Set(this._collapsed);
  t.has(e) ? t.delete(e) : t.add(e), this._collapsed = t;
};
ne = function(e) {
  return this._transformResult ? this._transformResult.sections.find((a) => a.id === e)?.included ?? !0 : !0;
};
A = async function(e, t) {
  if (!this._workflowName) return;
  const a = await Ie(this._workflowName, e, t, v(this, _));
  a && (this._transformResult = a);
};
I = async function(e) {
  if (!this._config?.destination || !this._workflowName) return;
  const i = await (await this.getContext(k)).open(this, Fe, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!i?.selectedTargets?.length) return;
  const n = [...this._config.map?.mappings ?? []], r = n.findIndex((h) => h.source === e), l = {
    source: e,
    destinations: i.selectedTargets.map((h) => ({ target: h.target, blockKey: h.blockKey })),
    enabled: !0
  };
  r >= 0 ? n[r] = l : n.push(l);
  const u = { ...this._config.map, version: this._config.map?.version ?? "1.0", mappings: n };
  await Ae(this._workflowName, u, v(this, _)) && (this._config = { ...this._config, map: u });
};
S = function(e) {
  if (!this._config?.map?.mappings) return [];
  const t = [];
  for (const a of this._config.map.mappings)
    if (a.source === e && a.enabled)
      for (const i of a.destinations)
        t.push(i);
  return t;
};
re = function(e) {
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
le = function(e) {
  const t = e.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(t) || /^\d+[\.\)]\s/.test(t) ? "list" : "paragraph";
};
P = function(e, t) {
  const a = t === "heading" ? "heading" : o(this, s, le).call(this, e.text), i = a === "heading" ? "Heading" : a === "list" ? "List Item" : "Paragraph";
  return c`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${e.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${a}">${i}</span>
						<span class="meta-badge font-size">${e.fontSize}pt</span>
						<span class="meta-badge font-name">${e.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${e.color};">${e.color}</span>
						${e.text === e.text.toUpperCase() && e.text !== e.text.toLowerCase() ? c`<span class="meta-badge text-case">UPPERCASE</span>` : f}
					</div>
				</div>
			</div>
		`;
};
ce = function(e, t, a, i) {
  const n = o(this, s, D).call(this, t), r = e.heading ? K(e.heading.text) : `preamble-p${a}-a${i}`, l = o(this, s, ne).call(this, r);
  if (!e.heading)
    return c`
				<div class="area-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => o(this, s, y).call(this, t)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
						<span class="heading-text preamble-label">Content</span>
						<span class="header-spacer"></span>
						<span class="group-count">${e.children.length} element${e.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@click=${(h) => h.stopPropagation()}
							@change=${(h) => o(this, s, A).call(this, r, h.target.checked)}>
						</uui-toggle>
					</div>
					${l && !n ? c`
						${e.children.map((h) => o(this, s, P).call(this, h))}
					` : f}
				</div>
			`;
  const u = e.heading, m = e.children.length + 1;
  return c`
			<div class="area-section ${l ? "" : "excluded"}">
				<div class="section-heading" @click=${() => o(this, s, y).call(this, t)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="section-label">Section</span>
					<span class="section-separator">–</span>
					<span class="heading-text">${u.text}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${m} element${m !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(h) => h.stopPropagation()}
						@change=${(h) => o(this, s, A).call(this, r, h.target.checked)}>
					</uui-toggle>
				</div>
				${!n && l ? c`
					<div class="section-children">
						${o(this, s, P).call(this, u, "heading")}
						${e.children.map((h) => o(this, s, P).call(this, h))}
					</div>
				` : f}
			</div>
		`;
};
ue = function(e) {
  const t = new Set(this._excludedAreas);
  t.has(e) ? t.delete(e) : t.add(e), this._excludedAreas = t;
};
pe = function(e, t, a) {
  const i = `area-p${t}-a${a}`, n = o(this, s, D).call(this, i), r = !this._excludedAreas.has(i), l = e.sections.length;
  return c`
			<div class="detected-area ${r ? "" : "area-excluded"}" style="border-left-color: ${e.color};">
				<div class="area-header" @click=${() => o(this, s, y).call(this, i)}>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<span class="area-name">${e.name || `Area ${a + 1}`}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${l} section${l !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${r ? "Included" : "Excluded"}"
						?checked=${r}
						@click=${(u) => u.stopPropagation()}
						@change=${() => o(this, s, ue).call(this, i)}>
					</uui-toggle>
				</div>
				${n ? f : c`
					${e.sections.map(
    (u, m) => o(this, s, ce).call(this, u, `p${t}-a${a}-s${m}`, t, a)
  )}
				`}
			</div>
		`;
};
de = function(e, t) {
  const a = `page-${e}`, i = o(this, s, D).call(this, a), n = t.length, r = t.reduce((u, m) => u + m.sections.length, 0), l = o(this, s, j).call(this, e);
  return c`
			<uui-box class="page-box ${l ? "" : "page-excluded"}">
				<div slot="header" class="tree-header" @click=${() => o(this, s, y).call(this, a)}>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					<strong class="page-title">Page ${e}</strong>
				</div>
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${n} area${n !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${l}
						@click=${(u) => u.stopPropagation()}
						@change=${() => o(this, s, q).call(this, e)}>
					</uui-toggle>
				</div>
				${i ? f : c`
					${t.map((u, m) => o(this, s, pe).call(this, u, e, m))}
				`}
			</uui-box>
		`;
};
he = function() {
  return this._areaDetection ? c`
			${this._areaDetection.pages.map(
    (e) => o(this, s, de).call(this, e.page, e.areas)
  )}
		` : f;
};
ge = function() {
  return this._areaDetection ? this._areaDetection.pages.reduce((e, t) => e + t.areas.reduce((a, i) => a + i.sections.length, 0), 0) : 0;
};
fe = function() {
  return (this._areaDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0) === 0 ? f : c`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === "all"}
					@change=${() => o(this, s, C).call(this, "all")} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === "custom"}
					@change=${() => o(this, s, C).call(this, "custom")} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${o(this, s, J)}
				@blur=${o(this, s, Q)}
				@focus=${() => {
    this._pageMode === "all" && o(this, s, C).call(this, "custom");
  }}
				?disabled=${this._pageMode === "all"} />
		`;
};
me = function() {
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
_e = function() {
  const e = this._areaDetection !== null, t = this._extraction !== null;
  if (!e && !t) return f;
  const a = this._areaDetection?.totalPages ?? (t ? this._extraction.source.totalPages : 0), i = e ? this._areaDetection.pages.length : a, r = i < a ? `${i} of ${a}` : `${a}`, l = e ? this._areaDetection.diagnostics.areasDetected : 0, u = e ? o(this, s, ge).call(this) : 0, m = t ? this._extraction.source.fileName : "", h = t ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return c`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${m}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${h}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${o(this, s, E)} ?disabled=${this._extracting}>
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
							${o(this, s, fe).call(this)}
						</div>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Choose Pages" @click=${o(this, s, oe)}>
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
							${this._areaTemplate ? c`<uui-button look="primary" color="positive" label="Edit Areas" @click=${o(this, s, T)}>
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
									@toggle=${o(this, s, ie)}>
									<umb-popover-layout>
										${o(this, s, ee).call(this).map((x) => {
    const $e = !!this._sourceConfig?.sectionRules?.[x.id]?.rules?.length;
    return c`
												<uui-menu-item
													label="${x.heading}"
													@click=${() => o(this, s, se).call(this, x.id, x.heading, x.elements)}>
													<uui-icon slot="icon" name="${$e ? "icon-check" : "icon-thumbnail-list"}"></uui-icon>
													<span slot="badge" class="section-picker-meta">${x.elements.length} el</span>
												</uui-menu-item>
											`;
  })}
									</umb-popover-layout>
								</uui-popover-container>
							</div>
						` : f}
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
						@toggle=${o(this, s, Z)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => o(this, s, Y).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, $).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => o(this, s, M).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, $).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => o(this, s, M).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${o(this, s, $).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => o(this, s, M).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : f}
		`;
};
ve = function() {
  const e = this._areaDetection !== null;
  return this._viewMode === "elements" ? e ? o(this, s, he).call(this) : f : o(this, s, xe).call(this);
};
R = function(e) {
  const t = o(this, s, S).call(this, e);
  return t.length === 0 ? c`<uui-button look="secondary" compact label="Map" @click=${() => o(this, s, I).call(this, e)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : c`${t.map(
    (a) => c`<span class="meta-badge mapped-target" @click=${() => o(this, s, I).call(this, e)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${o(this, s, re).call(this, a)}
			</span>`
  )}`;
};
be = function(e) {
  const t = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, a = `${e.id}.heading`, i = `${e.id}.content`, n = o(this, s, S).call(this, a).length > 0, r = o(this, s, S).call(this, i).length > 0, l = n || r, u = e.heading ?? "Content";
  return c`
			<uui-box headline=${u} class="transformed-section ${l ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${e.pattern}">${t[e.pattern] ?? e.pattern}</span>
					<span class="meta-badge">p${e.page}</span>
					${e.areaColor ? c`<span class="area-color-swatch" style="background: ${e.areaColor};"></span>` : f}
					<span class="meta-badge">${e.childCount} item${e.childCount !== 1 ? "s" : ""}</span>
					${e.heading ? o(this, s, R).call(this, a) : f}
				</div>
				<div class="transformed-content" .innerHTML=${Re(e.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${o(this, s, R).call(this, i)}
				</div>
			</uui-box>
		`;
};
xe = function() {
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
			${e.map((a) => o(this, s, be).call(this, a))}
			<div class="diagnostics">
				<span class="meta-badge">${e.length}/${t} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? c`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : f}
			</div>
		`;
};
we = function() {
  return c`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${o(this, s, E)} ?disabled=${this._extracting}>
					${this._extracting ? c`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
p.styles = [
  Ue,
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
d([
  g()
], p.prototype, "_extraction", 2);
d([
  g()
], p.prototype, "_areaDetection", 2);
d([
  g()
], p.prototype, "_config", 2);
d([
  g()
], p.prototype, "_workflowName", 2);
d([
  g()
], p.prototype, "_loading", 2);
d([
  g()
], p.prototype, "_extracting", 2);
d([
  g()
], p.prototype, "_error", 2);
d([
  g()
], p.prototype, "_successMessage", 2);
d([
  g()
], p.prototype, "_collapsed", 2);
d([
  g()
], p.prototype, "_transformResult", 2);
d([
  g()
], p.prototype, "_viewMode", 2);
d([
  g()
], p.prototype, "_sourceConfig", 2);
d([
  g()
], p.prototype, "_pageMode", 2);
d([
  g()
], p.prototype, "_pageInputValue", 2);
d([
  g()
], p.prototype, "_collapsePopoverOpen", 2);
d([
  g()
], p.prototype, "_excludedAreas", 2);
d([
  g()
], p.prototype, "_areaTemplate", 2);
d([
  g()
], p.prototype, "_sectionPickerOpen", 2);
p = d([
  Oe("up-doc-workflow-source-view")
], p);
const ot = p;
export {
  p as UpDocWorkflowSourceViewElement,
  ot as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-c5EfgGT8.js.map
