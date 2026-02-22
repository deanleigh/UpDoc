import { g as Pe, b as Be } from "./workflow.types-sXs8a86t.js";
import { UmbSorterController as Me } from "@umbraco-cms/backoffice/sorter";
import { css as L, property as A, state as g, customElement as W, nothing as d, repeat as Ve, html as l } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as We } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalBaseElement as qe } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as Ge } from "@umbraco-cms/backoffice/style";
const q = L`
	/* Collapsed rule row */
	.rule-row {
		display: flex;
		align-items: center;
		gap: var(--uui-size-space-3);
		padding: var(--uui-size-space-2) var(--uui-size-space-4);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		cursor: pointer;
		user-select: none;
		background: var(--uui-color-surface);
		transition: background 120ms ease;
	}

	.rule-row:hover {
		background: var(--uui-color-surface-alt);
	}

	.rule-row-name {
		flex: 1;
		font-size: var(--uui-type-default-size);
		font-weight: 600;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.rule-row-part {
		font-size: 11px;
		font-weight: 600;
		padding: 1px 8px;
		border-radius: var(--uui-border-radius);
		background: var(--uui-color-surface-alt);
		color: var(--uui-color-text-alt);
		flex-shrink: 0;
	}

	.rule-row-part.excluded {
		background: color-mix(in srgb, var(--uui-color-danger) 15%, transparent);
		color: var(--uui-color-danger-standalone);
	}

	.rule-row-match {
		font-size: 11px;
		font-weight: 700;
		padding: 1px 6px;
		border-radius: var(--uui-border-radius);
		flex-shrink: 0;
	}

	.rule-row-match.matched {
		background: color-mix(in srgb, var(--uui-color-positive) 15%, transparent);
		color: var(--uui-color-positive-standalone);
	}

	.rule-row-match.excluded {
		background: color-mix(in srgb, var(--uui-color-danger) 15%, transparent);
		color: var(--uui-color-danger-standalone);
	}

	.rule-row-match.no-match {
		background: color-mix(in srgb, var(--uui-color-warning) 15%, transparent);
		color: var(--uui-color-warning-standalone);
	}

	.rule-row-chevron {
		font-size: 12px;
		color: var(--uui-color-text-alt);
		flex-shrink: 0;
		transition: transform 120ms ease;
	}

	/* Action bar: hidden by default, appears on hover */
	.rule-row-actions {
		flex-shrink: 0;
		opacity: 0;
		transition: opacity 120ms ease;
	}

	.rule-row:hover .rule-row-actions {
		opacity: 1;
	}

	/* Rule cards (expanded) */
	.rule-card {
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		overflow: hidden;
	}

	.rule-header {
		display: flex;
		align-items: center;
		gap: var(--uui-size-space-3);
		padding: var(--uui-size-space-3) var(--uui-size-space-4);
		background: var(--uui-color-surface-alt);
		border-bottom: 1px solid var(--uui-color-border);
	}

	.rule-grip {
		cursor: grab;
		color: var(--uui-color-text-alt);
		font-size: 14px;
		user-select: none;
		flex-shrink: 0;
	}

	.rule-grip:active {
		cursor: grabbing;
	}

	.role-name-input {
		flex: 1;
		padding: var(--uui-size-space-1) var(--uui-size-space-2);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		font-size: var(--uui-type-default-size);
		font-family: monospace;
		background: var(--uui-color-surface);
		color: var(--uui-color-text);
	}

	.role-name-input:focus {
		outline: none;
		border-color: var(--uui-color-focus);
	}

	/* Section headers within rule cards */
	.section-header {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--uui-color-text-alt);
		margin-bottom: var(--uui-size-space-1);
	}

	.section-header.collapsible {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--uui-size-space-1);
		user-select: none;
	}

	.section-header.collapsible:hover {
		color: var(--uui-color-text);
	}

	.section-header.collapsible uui-icon {
		font-size: 10px;
	}

	/* Conditions */
	.conditions-area {
		padding: var(--uui-size-space-3) var(--uui-size-space-4);
		display: flex;
		flex-direction: column;
		gap: var(--uui-size-space-2);
	}

	/* Exceptions */
	.exceptions-area {
		padding: var(--uui-size-space-3) var(--uui-size-space-4);
		display: flex;
		flex-direction: column;
		gap: var(--uui-size-space-2);
		border-top: 1px solid var(--uui-color-border);
	}

	.condition-row {
		display: flex;
		align-items: center;
		gap: var(--uui-size-space-2);
	}

	.condition-type-select {
		min-width: 180px;
		padding: var(--uui-size-space-1) var(--uui-size-space-2);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		font-size: var(--uui-type-small-size);
		background: var(--uui-color-surface);
		color: var(--uui-color-text);
	}

	.condition-type-select:focus {
		outline: none;
		border-color: var(--uui-color-focus);
	}

	.condition-value-input {
		flex: 1;
		padding: var(--uui-size-space-1) var(--uui-size-space-2);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		font-size: var(--uui-type-small-size);
		font-family: monospace;
		background: var(--uui-color-surface);
		color: var(--uui-color-text);
	}

	.condition-value-input:focus {
		outline: none;
		border-color: var(--uui-color-focus);
	}

	/* Format row selects */
	.format-type-select {
		min-width: 100px;
		padding: var(--uui-size-space-1) var(--uui-size-space-2);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		font-size: var(--uui-type-small-size);
		background: var(--uui-color-surface);
		color: var(--uui-color-text);
	}

	.format-type-select:focus {
		outline: none;
		border-color: var(--uui-color-focus);
	}

	.format-value-select {
		flex: 1;
		padding: var(--uui-size-space-1) var(--uui-size-space-2);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		font-size: var(--uui-type-small-size);
		background: var(--uui-color-surface);
		color: var(--uui-color-text);
	}

	.format-value-select:focus {
		outline: none;
		border-color: var(--uui-color-focus);
	}

	/* Part area */
	.part-area {
		display: flex;
		flex-direction: column;
		gap: var(--uui-size-space-2);
		padding: var(--uui-size-space-3) var(--uui-size-space-4);
		border-top: 1px solid var(--uui-color-border);
	}

	.part-controls {
		display: flex;
		align-items: center;
		gap: var(--uui-size-space-3);
	}

	.part-select {
		padding: var(--uui-size-space-1) var(--uui-size-space-2);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		font-size: var(--uui-type-small-size);
		background: var(--uui-color-surface);
		color: var(--uui-color-text);
	}

	.part-select:focus {
		outline: none;
		border-color: var(--uui-color-focus);
	}

	.part-select:disabled {
		opacity: 0.5;
	}

	.exclude-label {
		display: flex;
		align-items: center;
		gap: var(--uui-size-space-1);
		font-size: var(--uui-type-small-size);
		color: var(--uui-color-text-alt);
		cursor: pointer;
		user-select: none;
	}

	/* Format area */
	.format-area {
		display: flex;
		flex-direction: column;
		gap: var(--uui-size-space-2);
		padding: var(--uui-size-space-3) var(--uui-size-space-4);
		border-top: 1px solid var(--uui-color-border);
	}

	/* Find & Replace entries */
	.find-replace-entry {
		display: flex;
		flex-direction: column;
		gap: var(--uui-size-space-1);
		padding: var(--uui-size-space-2);
		border: 1px solid var(--uui-color-border);
		border-radius: var(--uui-border-radius);
		background: var(--uui-color-surface);
	}

	.replace-label {
		min-width: 180px;
		padding: var(--uui-size-space-1) var(--uui-size-space-2);
		font-size: var(--uui-type-small-size);
		color: var(--uui-color-text-alt);
		font-weight: 600;
	}

	/* Match preview */
	.match-preview {
		display: flex;
		align-items: center;
		gap: var(--uui-size-space-2);
		padding: var(--uui-size-space-2) var(--uui-size-space-4);
		font-size: var(--uui-type-small-size);
		border-top: 1px solid var(--uui-color-border);
	}

	.match-preview.matched {
		background: color-mix(in srgb, var(--uui-color-positive) 10%, transparent);
		color: var(--uui-color-positive-standalone);
	}

	.match-preview.excluded {
		background: color-mix(in srgb, var(--uui-color-danger) 10%, transparent);
		color: var(--uui-color-danger-standalone);
	}

	.match-preview.no-match {
		background: color-mix(in srgb, var(--uui-color-warning) 10%, transparent);
		color: var(--uui-color-warning-standalone);
	}

	.match-preview strong {
		font-weight: 600;
	}
`;
var De = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, G = (e) => {
  throw TypeError(e);
}, _ = (e, t, o, a) => {
  for (var i = a > 1 ? void 0 : a ? Ue(t, o) : t, r = e.length - 1, u; r >= 0; r--)
    (u = e[r]) && (i = (a ? u(t, o, i) : u(i)) || i);
  return a && i && De(t, o, i), i;
}, He = (e, t, o) => t.has(e) || G("Cannot " + o), Ye = (e, t, o) => (He(e, t, "read from private field"), o ? o.call(e) : t.get(e)), Ie = (e, t, o) => t.has(e) ? G("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), k;
let v = class extends We {
  constructor() {
    super(...arguments), Ie(this, k, new Me(this, {
      getUniqueOfElement: (e) => e.dataset.sortId ?? "",
      getUniqueOfModel: (e) => e._id,
      identifier: "updoc-rules-sorter",
      itemSelector: ".sortable-rule",
      containerSelector: ".rules-container",
      handleSelector: ".rule-grip",
      disabledItemSelector: "[data-expanded]",
      placeholderAttr: "drag-placeholder",
      onChange: ({ model: e }) => {
        this._rules = e, this.dispatchEvent(new CustomEvent("sort-change", {
          detail: { rules: e },
          bubbles: !0,
          composed: !0
        }));
      }
    })), this._rules = [], this.expandedIds = /* @__PURE__ */ new Set();
  }
  set rules(e) {
    this._rules = e, Ye(this, k).setModel(e);
  }
  get rules() {
    return this._rules;
  }
  render() {
    return this._rules.length === 0 && !this.renderItem ? d : l`
			<div class="rules-container">
				${Ve(
      this._rules,
      (e) => e._id,
      (e) => l`
						<div class="sortable-rule"
							data-sort-id=${e._id}
							?data-expanded=${this.expandedIds.has(e._id)}>
							${this.renderItem?.(e) ?? l`<span>${e._id}</span>`}
						</div>
					`
    )}
			</div>
		`;
  }
};
k = /* @__PURE__ */ new WeakMap();
v.styles = [
  q,
  L`
			:host {
				display: block;
			}

			.rules-container {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3, 12px);
				min-height: 8px;
			}

			.sortable-rule[drag-placeholder] {
				opacity: 0.2;
			}
		`
];
_([
  A({ attribute: !1 })
], v.prototype, "rules", 1);
_([
  g()
], v.prototype, "_rules", 2);
_([
  A({ attribute: !1 })
], v.prototype, "expandedIds", 2);
_([
  A({ attribute: !1 })
], v.prototype, "renderItem", 2);
v = _([
  W("updoc-sortable-rules")
], v);
var Ke = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, D = (e) => {
  throw TypeError(e);
}, b = (e, t, o, a) => {
  for (var i = a > 1 ? void 0 : a ? Qe(t, o) : t, r = e.length - 1, u; r >= 0; r--)
    (u = e[r]) && (i = (a ? u(t, o, i) : u(i)) || i);
  return a && i && Ke(t, o, i), i;
}, U = (e, t, o) => t.has(e) || D("Cannot " + o), f = (e, t, o) => (U(e, t, "read from private field"), o ? o.call(e) : t.get(e)), Je = (e, t, o) => t.has(e) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), n = (e, t, o) => (U(e, t, "access private method"), o), s, p, x, H, $, T, R, m, Y, I, K, Q, O, J, c, E, F, X, Z, j, ee, te, ie, y, S, oe, C, ae, se, ne, re, le, ue, ce, de, pe, he, fe, me, ve, ge, be, xe, _e, N, P, $e, ye, we, ze, ke, Re, Ee, Se, Ce, Ne, B, Le, Ae;
let Xe = 0;
function M() {
  return `r-${++Xe}`;
}
const Te = {
  textBeginsWith: "Text begins with",
  textEndsWith: "Text ends with",
  textContains: "Text contains",
  textEquals: "Text equals",
  textMatchesPattern: "Text matches pattern",
  fontSizeEquals: "Font size equals",
  fontSizeAbove: "Font size above",
  fontSizeBelow: "Font size below",
  fontNameContains: "Font name contains",
  fontNameEquals: "Font name equals",
  colorEquals: "Color equals",
  positionFirst: "Position: first",
  positionLast: "Position: last"
}, w = ["positionFirst", "positionLast"], Oe = [
  "textBeginsWith",
  "textEndsWith",
  "textContains",
  "textEquals",
  "textMatchesPattern",
  "fontSizeEquals",
  "fontSizeAbove",
  "fontSizeBelow",
  "fontNameContains",
  "fontNameEquals",
  "colorEquals",
  "positionFirst",
  "positionLast"
], Fe = {
  title: "Title",
  content: "Content",
  description: "Description",
  summary: "Summary"
}, Ze = ["title", "content", "description", "summary"], je = {
  block: "Block",
  style: "Style"
}, et = ["block", "style"], tt = {
  auto: "Auto",
  paragraph: "Paragraph",
  heading1: "Heading 1",
  heading2: "Heading 2",
  heading3: "Heading 3",
  heading4: "Heading 4",
  heading5: "Heading 5",
  heading6: "Heading 6",
  bulletListItem: "Bullet List",
  numberedListItem: "Numbered List",
  quote: "Quote"
}, it = [
  "auto",
  "paragraph",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
  "bulletListItem",
  "numberedListItem",
  "quote"
], ot = {
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  code: "Code",
  highlight: "Highlight"
}, at = ["bold", "italic", "strikethrough", "code", "highlight"], st = {
  textBeginsWith: "Text begins with",
  textEndsWith: "Text ends with",
  textContains: "Text contains"
}, nt = ["textBeginsWith", "textEndsWith", "textContains"], V = {
  replaceWith: "Replace with",
  replaceAll: "Replace all with"
};
let h = class extends qe {
  constructor() {
    super(...arguments), Je(this, s), this._rules = [], this._groupOrder = [], this._expandedSections = /* @__PURE__ */ new Set(), this._expandedRules = /* @__PURE__ */ new Set(), this._renamingGroup = null, this._renameValue = "";
  }
  firstUpdated() {
    const e = this.data?.existingRules;
    if (!e) return;
    const t = [], o = [];
    for (const a of e.groups ?? []) {
      o.push(a.name);
      for (const i of a.rules)
        t.push(n(this, s, R).call(this, i, a.name));
    }
    for (const a of e.rules ?? [])
      t.push(n(this, s, R).call(this, a, null));
    this._rules = t, this._groupOrder = o;
  }
  render() {
    const e = n(this, s, K).call(this), t = /* @__PURE__ */ new Map();
    for (const [a, i] of e) {
      const r = f(this, s, m).find((u) => u.id === a);
      if (r) {
        const u = t.get(i) ?? [];
        u.push(r), t.set(i, u);
      }
    }
    const o = f(this, s, I);
    return l`
			<umb-body-layout headline="Edit Sections: ${f(this, s, Y)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${f(this, s, m).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${f(this, s, m).length - e.size} unmatched</span>
						${this._groupOrder.length > 0 ? l`<span class="meta-badge">${this._groupOrder.length} group${this._groupOrder.length !== 1 ? "s" : ""}</span>` : d}
					</div>

					${o.map((a) => {
      const i = (r) => n(this, s, Se).call(this, r, t.get(r._id) ?? []);
      return a.group !== null ? l`
								<div class="group-container">
									${n(this, s, Le).call(this, a.group)}
									<div class="group-rules">
										<updoc-sortable-rules
											.rules=${a.rules}
											.expandedIds=${this._expandedRules}
											.renderItem=${i}
											@sort-change=${(r) => n(this, s, C).call(this, a.group, r)}
										></updoc-sortable-rules>
										<uui-button
											look="placeholder"
											label="Add rule to ${a.group}"
											@click=${() => n(this, s, E).call(this, a.group)}>
											+ Add rule
										</uui-button>
									</div>
								</div>
							` : l`
							${this._groupOrder.length > 0 ? l`
								<div class="ungrouped-label">Ungrouped</div>
							` : d}
							<updoc-sortable-rules
								.rules=${a.rules}
								.expandedIds=${this._expandedRules}
								.renderItem=${i}
								@sort-change=${(r) => n(this, s, C).call(this, null, r)}
							></updoc-sortable-rules>
							<uui-button
								look="placeholder"
								label="Add rule"
								@click=${() => n(this, s, E).call(this, null)}>
								+ Add rule
							</uui-button>
						`;
    })}

					<uui-button
						look="outline"
						label="Add group"
						@click=${() => n(this, s, te).call(this)}>
						<uui-icon name="icon-add"></uui-icon>
						Add group
					</uui-button>

					${n(this, s, Ae).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${n(this, s, we)}>Close</uui-button>
					<uui-button
						label="Save"
						look="secondary"
						@click=${n(this, s, $e)}>
						Save
					</uui-button>
					<uui-button
						label="Save and Close"
						look="primary"
						color="positive"
						@click=${n(this, s, ye)}>
						Save and Close
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
p = function(e, t) {
  return this._expandedSections.has(`${e}-${t}`);
};
x = function(e, t) {
  const o = `${e}-${t}`, a = new Set(this._expandedSections);
  a.has(o) ? a.delete(o) : a.add(o), this._expandedSections = a;
};
H = function(e) {
  return this._expandedRules.has(e);
};
$ = function(e) {
  const t = new Set(this._expandedRules);
  t.has(e) ? t.delete(e) : t.add(e), this._expandedRules = t;
};
T = function(e) {
  if (!this._expandedRules.has(e)) {
    const t = new Set(this._expandedRules);
    t.add(e), this._expandedRules = t;
  }
};
R = function(e, t) {
  let o = e.part, a = e.exclude ?? !1;
  if (!o && !a) {
    const r = Pe(e);
    r === "exclude" ? a = !0 : o = r;
  }
  let i = e.formats;
  return (!i || i.length === 0) && (i = [{ type: "block", value: e.format ?? Be(e) }]), {
    ...e,
    part: o,
    exclude: a,
    formats: i,
    _id: M(),
    _groupName: t
  };
};
m = function() {
  return this.data?.elements ?? [];
};
Y = function() {
  return this.data?.sectionHeading ?? "Section";
};
I = function() {
  const e = [];
  for (const t of this._groupOrder)
    e.push({
      group: t,
      rules: this._rules.filter((o) => o._groupName === t)
    });
  return e.push({
    group: null,
    rules: this._rules.filter((t) => t._groupName === null)
  }), e;
};
K = function() {
  const e = /* @__PURE__ */ new Map(), t = f(this, s, m);
  for (const o of this._rules)
    if (o.conditions.length !== 0)
      for (let a = 0; a < t.length; a++) {
        const i = t[a];
        if (!e.has(i.id) && n(this, s, Q).call(this, i, o.conditions, a, t.length)) {
          if (o.exceptions?.length && o.exceptions.some(
            (u) => n(this, s, O).call(this, i, u, a, t.length)
          ))
            continue;
          e.set(i.id, o._id);
        }
      }
  return e;
};
Q = function(e, t, o, a) {
  return t.every((i) => n(this, s, O).call(this, e, i, o, a));
};
O = function(e, t, o, a) {
  const i = String(t.value ?? ""), r = Number(t.value);
  switch (t.type) {
    case "textBeginsWith":
      return e.text.toLowerCase().startsWith(i.toLowerCase());
    case "textEndsWith":
      return e.text.toLowerCase().endsWith(i.toLowerCase());
    case "textContains":
      return e.text.toLowerCase().includes(i.toLowerCase());
    case "textMatchesPattern":
      try {
        return new RegExp(i, "i").test(e.text);
      } catch {
        return !1;
      }
    case "fontSizeEquals":
      return !isNaN(r) && Math.abs(e.fontSize - r) < 0.5;
    case "fontSizeAbove":
      return !isNaN(r) && e.fontSize > r;
    case "fontSizeBelow":
      return !isNaN(r) && e.fontSize < r;
    case "fontNameContains":
      return e.fontName.toLowerCase().includes(i.toLowerCase());
    case "colorEquals":
      return e.color.toLowerCase() === i.toLowerCase();
    case "positionFirst":
      return o === 0;
    case "positionLast":
      return o === a - 1;
    default:
      return !1;
  }
};
J = function(e, t, o) {
  const a = [];
  if (a.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName) {
    const r = e.fontName.includes("+") ? e.fontName.substring(e.fontName.indexOf("+") + 1) : e.fontName;
    a.push({ type: "fontNameContains", value: r });
  }
  e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && a.push({ type: "colorEquals", value: e.color });
  const i = e.text.indexOf(":");
  return i > 0 && i < 30 && a.push({ type: "textBeginsWith", value: e.text.substring(0, i + 1) }), t === 0 ? a.push({ type: "positionFirst" }) : t === o - 1 && a.push({ type: "positionLast" }), a;
};
c = function(e, t) {
  this._rules = this._rules.map((o) => o._id === e ? t(o) : o);
};
E = function(e = null) {
  const t = M();
  this._rules = [...this._rules, {
    role: "",
    part: "content",
    conditions: [],
    formats: [{ type: "block", value: "auto" }],
    _id: t,
    _groupName: e
  }], n(this, s, T).call(this, t);
};
F = function(e) {
  this._rules = this._rules.filter((t) => t._id !== e);
};
X = function(e, t) {
  const o = n(this, s, J).call(this, e, t, f(this, s, m).length), a = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, ""), i = M();
  this._rules = [...this._rules, {
    role: a,
    part: "content",
    conditions: o,
    formats: [{ type: "block", value: "auto" }],
    _id: i,
    _groupName: null
  }], n(this, s, T).call(this, i);
};
Z = function(e, t) {
  n(this, s, c).call(this, e, (o) => ({ ...o, role: t }));
};
j = function(e, t) {
  n(this, s, c).call(this, e, (o) => ({ ...o, part: t }));
};
ee = function(e, t) {
  n(this, s, c).call(this, e, (o) => ({ ...o, exclude: t }));
};
te = function() {
  let e = "New Group", t = 1;
  for (; this._groupOrder.includes(e); )
    e = `New Group ${++t}`;
  this._groupOrder = [...this._groupOrder, e], this._renamingGroup = e, this._renameValue = e;
};
ie = function(e) {
  this._renamingGroup = e, this._renameValue = e;
};
y = function() {
  if (!this._renamingGroup || !this._renameValue.trim()) return;
  const e = this._renamingGroup, t = this._renameValue.trim();
  e !== t && (this._groupOrder = this._groupOrder.map((o) => o === e ? t : o), this._rules = this._rules.map(
    (o) => o._groupName === e ? { ...o, _groupName: t } : o
  )), this._renamingGroup = null, this._renameValue = "";
};
S = function() {
  this._renamingGroup = null, this._renameValue = "";
};
oe = function(e) {
  this._rules = this._rules.map(
    (t) => t._groupName === e ? { ...t, _groupName: null } : t
  ), this._groupOrder = this._groupOrder.filter((t) => t !== e);
};
C = function(e, t) {
  const o = t.detail.rules, a = new Set(o.map((r) => r._id)), i = [];
  for (const r of this._groupOrder)
    r === e ? i.push(...o.map((u) => ({ ...u, _groupName: r }))) : i.push(...this._rules.filter((u) => u._groupName === r && !a.has(u._id)));
  e === null ? i.push(...o.map((r) => ({ ...r, _groupName: null }))) : i.push(...this._rules.filter((r) => r._groupName === null && !a.has(r._id))), this._rules = i;
};
ae = function(e) {
  n(this, s, c).call(this, e, (t) => ({
    ...t,
    formats: [...t.formats ?? [], { type: "block", value: "auto" }]
  }));
};
se = function(e, t) {
  n(this, s, c).call(this, e, (o) => ({
    ...o,
    formats: (o.formats ?? []).filter((a, i) => i !== t)
  }));
};
ne = function(e, t, o) {
  const a = o === "block" ? "auto" : "bold";
  n(this, s, c).call(this, e, (i) => {
    const r = [...i.formats ?? []];
    return r[t] = { type: o, value: a }, { ...i, formats: r };
  });
};
re = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.formats ?? []];
    return i[t] = { ...i[t], value: o }, { ...a, formats: i };
  });
};
le = function(e) {
  n(this, s, c).call(this, e, (t) => ({
    ...t,
    conditions: [...t.conditions, { type: "textBeginsWith", value: "" }]
  }));
};
ue = function(e, t) {
  n(this, s, c).call(this, e, (o) => ({
    ...o,
    conditions: o.conditions.filter((a, i) => i !== t)
  }));
};
ce = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.conditions];
    return i[t] = {
      type: o,
      value: w.includes(o) ? void 0 : i[t].value
    }, { ...a, conditions: i };
  });
};
de = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.conditions], r = i[t], u = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
    return i[t] = { ...r, value: u && !isNaN(Number(o)) ? Number(o) : o }, { ...a, conditions: i };
  });
};
pe = function(e) {
  n(this, s, c).call(this, e, (t) => ({
    ...t,
    exceptions: [...t.exceptions ?? [], { type: "textContains", value: "" }]
  }));
};
he = function(e, t) {
  n(this, s, c).call(this, e, (o) => ({
    ...o,
    exceptions: (o.exceptions ?? []).filter((a, i) => i !== t)
  }));
};
fe = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.exceptions ?? []];
    return i[t] = {
      type: o,
      value: w.includes(o) ? void 0 : i[t].value
    }, { ...a, exceptions: i };
  });
};
me = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.exceptions ?? []], r = i[t], u = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
    return i[t] = { ...r, value: u && !isNaN(Number(o)) ? Number(o) : o }, { ...a, exceptions: i };
  });
};
ve = function(e) {
  n(this, s, c).call(this, e, (t) => ({
    ...t,
    textReplacements: [...t.textReplacements ?? [], { findType: "textBeginsWith", find: "", replaceType: "replaceWith", replace: "" }]
  }));
};
ge = function(e, t) {
  n(this, s, c).call(this, e, (o) => ({
    ...o,
    textReplacements: (o.textReplacements ?? []).filter((a, i) => i !== t)
  }));
};
be = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.textReplacements ?? []], r = o === "textContains" ? "replaceAll" : "replaceWith";
    return i[t] = { ...i[t], findType: o, replaceType: r }, { ...a, textReplacements: i };
  });
};
xe = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.textReplacements ?? []];
    return i[t] = { ...i[t], find: o }, { ...a, textReplacements: i };
  });
};
_e = function(e, t, o) {
  n(this, s, c).call(this, e, (a) => {
    const i = [...a.textReplacements ?? []];
    return i[t] = { ...i[t], replace: o }, { ...a, textReplacements: i };
  });
};
N = function(e) {
  const t = (e.formats ?? []).find((u) => u.type === "block"), { _id: o, _groupName: a, action: i, ...r } = e;
  return {
    ...r,
    format: t?.value ?? "auto"
  };
};
P = function() {
  this._renamingGroup && n(this, s, y).call(this);
  const e = [];
  for (const o of this._groupOrder) {
    const a = this._rules.filter((i) => i._groupName === o).map((i) => n(this, s, N).call(this, i));
    e.push({ name: o, rules: a });
  }
  const t = this._rules.filter((o) => o._groupName === null).map((o) => n(this, s, N).call(this, o));
  return { groups: e, rules: t };
};
$e = async function() {
  const e = n(this, s, P).call(this);
  this.data?.onSave && await this.data.onSave(e);
};
ye = function() {
  const e = n(this, s, P).call(this);
  this.value = { rules: e }, this.modalContext?.submit();
};
we = function() {
  this.modalContext?.reject();
};
ze = function(e, t, o) {
  const a = w.includes(o.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${o.type}
					@change=${(i) => n(this, s, ce).call(this, e, t, i.target.value)}>
					${Oe.map((i) => l`
						<option value=${i} ?selected=${i === o.type}>${Te[i]}</option>
					`)}
				</select>
				${a ? d : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(o.value ?? "")}
						@input=${(i) => n(this, s, de).call(this, e, t, i.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => n(this, s, ue).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
ke = function(e, t, o) {
  const a = w.includes(o.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${o.type}
					@change=${(i) => n(this, s, fe).call(this, e, t, i.target.value)}>
					${Oe.map((i) => l`
						<option value=${i} ?selected=${i === o.type}>${Te[i]}</option>
					`)}
				</select>
				${a ? d : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(o.value ?? "")}
						@input=${(i) => n(this, s, me).call(this, e, t, i.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => n(this, s, he).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
Re = function(e, t, o) {
  const a = o.type === "block" ? it : at, i = o.type === "block" ? tt : ot;
  return l`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${o.type}
					@change=${(r) => n(this, s, ne).call(this, e, t, r.target.value)}>
					${et.map((r) => l`
						<option value=${r} ?selected=${r === o.type}>${je[r]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${o.value}
					@change=${(r) => n(this, s, re).call(this, e, t, r.target.value)}>
					${a.map((r) => l`
						<option value=${r} ?selected=${r === o.value}>${i[r]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => n(this, s, se).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
Ee = function(e, t, o) {
  const a = o.findType === "textContains" ? V.replaceAll : V.replaceWith;
  return l`
			<div class="find-replace-entry">
				<div class="condition-row">
					<select
						class="condition-type-select"
						.value=${o.findType}
						@change=${(i) => n(this, s, be).call(this, e, t, i.target.value)}>
						${nt.map((i) => l`
							<option value=${i} ?selected=${i === o.findType}>${st[i]}</option>
						`)}
					</select>
					<input
						type="text"
						class="condition-value-input"
						placeholder="Find..."
						.value=${o.find}
						@input=${(i) => n(this, s, xe).call(this, e, t, i.target.value)} />
					<uui-button
						compact
						look="secondary"
						label="Remove replacement"
						@click=${() => n(this, s, ge).call(this, e, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>
				<div class="condition-row">
					<span class="replace-label">${a}</span>
					<input
						type="text"
						class="condition-value-input"
						placeholder="(empty = remove)"
						.value=${o.replace}
						@input=${(i) => n(this, s, _e).call(this, e, t, i.target.value)} />
				</div>
			</div>
		`;
};
Se = function(e, t) {
  return n(this, s, H).call(this, e._id) ? n(this, s, Ne).call(this, e, t) : n(this, s, Ce).call(this, e, t);
};
Ce = function(e, t) {
  const o = e.exclude, a = e.part ?? "content", i = o ? "Exclude" : Fe[a] ?? a, r = t.length, u = e.role || "(unnamed rule)";
  return l`
			<div class="rule-row" @click=${() => n(this, s, $).call(this, e._id)}>
				<span class="rule-grip" title="Drag to reorder" @click=${(z) => z.stopPropagation()}>⠿</span>
				<span class="rule-row-name">${u}</span>
				<span class="rule-row-part ${o ? "excluded" : ""}">${i}</span>
				${r > 0 ? l`<span class="rule-row-match ${o ? "excluded" : "matched"}">${r}&times;</span>` : l`<span class="rule-row-match no-match">0</span>`}
				<uui-action-bar class="rule-row-actions"
					@click=${(z) => z.stopPropagation()}>
					<uui-button pristine look="primary" label="Edit rule"
						@click=${() => n(this, s, $).call(this, e._id)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete rule"
						@click=${() => n(this, s, F).call(this, e._id)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
Ne = function(e, t) {
  const o = e.exclude, a = e.part ?? "content", i = e._id;
  return l`
			<div class="rule-card">
				<div class="rule-header">
					<uui-icon class="rule-row-chevron expanded" name="icon-navigation-down"
						@click=${() => n(this, s, $).call(this, i)}
						style="cursor:pointer"></uui-icon>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(r) => n(this, s, Z).call(this, i, r.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => n(this, s, F).call(this, i)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => n(this, s, x).call(this, "conditions", i)}>
						<uui-icon name=${n(this, s, p).call(this, "conditions", i) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${n(this, s, p).call(this, "conditions", i) ? l`
						${e.conditions.map((r, u) => n(this, s, ze).call(this, i, u, r))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => n(this, s, le).call(this, i)}>
							+ Add condition
						</uui-button>
					` : d}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => n(this, s, x).call(this, "exceptions", i)}>
						<uui-icon name=${n(this, s, p).call(this, "exceptions", i) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${n(this, s, p).call(this, "exceptions", i) ? l`
						${(e.exceptions ?? []).map((r, u) => n(this, s, ke).call(this, i, u, r))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => n(this, s, pe).call(this, i)}>
							+ Add exception
						</uui-button>
					` : d}
				</div>

				<div class="part-area">
					<div class="section-header collapsible" @click=${() => n(this, s, x).call(this, "part", i)}>
						<uui-icon name=${n(this, s, p).call(this, "part", i) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Part
					</div>
					${n(this, s, p).call(this, "part", i) ? l`
						<div class="part-controls">
							<select
								class="part-select"
								.value=${a}
								?disabled=${o}
								@change=${(r) => n(this, s, j).call(this, i, r.target.value)}>
								${Ze.map((r) => l`
									<option value=${r} ?selected=${r === a}>${Fe[r]}</option>
								`)}
							</select>
							<label class="exclude-label">
								<input
									type="checkbox"
									.checked=${o}
									@change=${(r) => n(this, s, ee).call(this, i, r.target.checked)} />
								Exclude
							</label>
						</div>
					` : d}
				</div>

				${o ? d : l`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => n(this, s, x).call(this, "format", i)}>
						<uui-icon name=${n(this, s, p).call(this, "format", i) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Format${(e.formats ?? []).length > 0 ? ` (${(e.formats ?? []).length})` : ""}
					</div>
					${n(this, s, p).call(this, "format", i) ? l`
						${(e.formats ?? []).map((r, u) => n(this, s, Re).call(this, i, u, r))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => n(this, s, ae).call(this, i)}>
							+ Add format
						</uui-button>
					` : d}
				</div>
				`}

				${o ? d : l`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => n(this, s, x).call(this, "findReplace", i)}>
						<uui-icon name=${n(this, s, p).call(this, "findReplace", i) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Find &amp; Replace${(e.textReplacements ?? []).length > 0 ? ` (${(e.textReplacements ?? []).length})` : ""}
					</div>
					${n(this, s, p).call(this, "findReplace", i) ? l`
						${(e.textReplacements ?? []).map((r, u) => n(this, s, Ee).call(this, i, u, r))}
						<uui-button
							compact
							look="placeholder"
							label="Add find & replace"
							@click=${() => n(this, s, ve).call(this, i)}>
							+ Add find &amp; replace
						</uui-button>
					` : d}
				</div>
				`}

				<div class="match-preview ${t.length > 0 ? o ? "excluded" : "matched" : "no-match"}">
					${t.length > 0 ? l`<uui-icon name=${o ? "icon-block" : "icon-check"}></uui-icon> ${o ? "Excluded" : "Matched"} <strong>${t.length}&times;</strong>${t.length <= 5 ? l`: ${t.map((r, u) => l`${u > 0 ? l`, ` : d}<strong>${n(this, s, B).call(this, r.text, 40)}</strong>`)}` : d}` : l`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
B = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
Le = function(e) {
  return this._renamingGroup === e ? l`
				<div class="group-header">
					<input
						type="text"
						class="group-rename-input"
						.value=${this._renameValue}
						@input=${(t) => {
    this._renameValue = t.target.value;
  }}
						@keydown=${(t) => {
    t.key === "Enter" && n(this, s, y).call(this), t.key === "Escape" && n(this, s, S).call(this);
  }} />
					<uui-button compact look="primary" label="Confirm" @click=${() => n(this, s, y).call(this)}>
						<uui-icon name="icon-check"></uui-icon>
					</uui-button>
					<uui-button compact look="secondary" label="Cancel" @click=${() => n(this, s, S).call(this)}>
						<uui-icon name="icon-wrong"></uui-icon>
					</uui-button>
				</div>
			` : l`
			<div class="group-header">
				<strong class="group-name">${e}</strong>
				<span class="header-spacer"></span>
				<uui-action-bar class="group-header-actions">
					<uui-button pristine look="primary" label="Rename" @click=${() => n(this, s, ie).call(this, e)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete group"
						title="Delete group (rules move to ungrouped)"
						@click=${() => n(this, s, oe).call(this, e)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
Ae = function(e) {
  const t = f(this, s, m), o = t.filter((a) => !e.has(a.id));
  return o.length === 0 ? d : l`
			<div class="unmatched-section">
				<h4>Unmatched elements (${o.length})</h4>
				${o.map((a) => {
    const i = t.indexOf(a);
    return l`
						<div class="unmatched-element">
							<div class="unmatched-text">${n(this, s, B).call(this, a.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${a.fontSize}pt</span>
								<span class="meta-badge">${a.fontName}</span>
								${a.color !== "#000000" ? l`<span class="meta-badge" style="border-left: 3px solid ${a.color};">${a.color}</span>` : d}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => n(this, s, X).call(this, a, i)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
h.styles = [
  Ge,
  q,
  L`
			:host {
				display: block;
				height: 100%;
			}

			#main {
				padding: var(--uui-size-space-4);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-4);
			}

			.section-info {
				display: flex;
				gap: var(--uui-size-space-2);
				flex-wrap: wrap;
			}

			.meta-badge {
				font-size: 11px;
				font-family: monospace;
				padding: 1px 6px;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}

			/* Group containers */
			.group-container {
				border: 2px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				overflow: hidden;
			}

			.group-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.group-name {
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text);
			}

			.group-header-actions {
				opacity: 0;
				transition: opacity 120ms ease;
			}

			.group-header:hover .group-header-actions {
				opacity: 1;
			}

			.group-rename-input {
				flex: 1;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-focus);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-default-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.group-rename-input:focus {
				outline: none;
			}

			.header-spacer {
				flex: 1;
			}

			.group-rules {
				padding: var(--uui-size-space-3);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}

			.ungrouped-label {
				font-size: 11px;
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: var(--uui-color-text-alt);
				padding-top: var(--uui-size-space-2);
			}

			/* Unmatched elements */
			.unmatched-section {
				border: 1px dashed var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
			}

			.unmatched-section h4 {
				margin: 0 0 var(--uui-size-space-3);
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
				text-transform: uppercase;
				letter-spacing: 0.5px;
			}

			.unmatched-element {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-2) 0;
				border-bottom: 1px solid var(--uui-color-border);
			}

			.unmatched-element:last-child {
				border-bottom: none;
			}

			.unmatched-text {
				flex: 1;
				font-size: var(--uui-type-small-size);
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.unmatched-meta {
				display: flex;
				gap: var(--uui-size-space-1);
				flex-shrink: 0;
			}
		`
];
b([
  g()
], h.prototype, "_rules", 2);
b([
  g()
], h.prototype, "_groupOrder", 2);
b([
  g()
], h.prototype, "_expandedSections", 2);
b([
  g()
], h.prototype, "_expandedRules", 2);
b([
  g()
], h.prototype, "_renamingGroup", 2);
b([
  g()
], h.prototype, "_renameValue", 2);
h = b([
  W("up-doc-section-rules-editor-modal")
], h);
const ht = h;
export {
  h as UpDocSectionRulesEditorModalElement,
  ht as default
};
//# sourceMappingURL=section-rules-editor-modal.element-D8Lfse4j.js.map
