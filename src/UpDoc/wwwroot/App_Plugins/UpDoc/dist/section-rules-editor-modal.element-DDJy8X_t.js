import { g as Re, a as Ne } from "./workflow.types-BgUyfmVM.js";
import { UmbSorterController as Le } from "@umbraco-cms/backoffice/sorter";
import { css as L, property as O, state as g, customElement as B, nothing as d, repeat as Oe, html as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Ae } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalBaseElement as Te } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as Pe } from "@umbraco-cms/backoffice/style";
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
var Me = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, G = (e) => {
  throw TypeError(e);
}, x = (e, t, i, a) => {
  for (var o = a > 1 ? void 0 : a ? Fe(t, i) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (o = (a ? l(t, i, o) : l(o)) || o);
  return a && o && Me(t, i, o), o;
}, Ve = (e, t, i) => t.has(e) || G("Cannot " + i), Be = (e, t, i) => (Ve(e, t, "read from private field"), i ? i.call(e) : t.get(e)), qe = (e, t, i) => t.has(e) ? G("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), k;
let m = class extends Ae {
  constructor() {
    super(...arguments), qe(this, k, new Le(this, {
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
    this._rules = e, Be(this, k).setModel(e);
  }
  get rules() {
    return this._rules;
  }
  render() {
    return this._rules.length === 0 && !this.renderItem ? d : u`
			<div class="rules-container">
				${Oe(
      this._rules,
      (e) => e._id,
      (e) => u`
						<div class="sortable-rule"
							data-sort-id=${e._id}
							?data-expanded=${this.expandedIds.has(e._id)}>
							${this.renderItem?.(e) ?? u`<span>${e._id}</span>`}
						</div>
					`
    )}
			</div>
		`;
  }
};
k = /* @__PURE__ */ new WeakMap();
m.styles = [
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
x([
  O({ attribute: !1 })
], m.prototype, "rules", 1);
x([
  g()
], m.prototype, "_rules", 2);
x([
  O({ attribute: !1 })
], m.prototype, "expandedIds", 2);
x([
  O({ attribute: !1 })
], m.prototype, "renderItem", 2);
m = x([
  B("updoc-sortable-rules")
], m);
var Ge = Object.defineProperty, De = Object.getOwnPropertyDescriptor, D = (e) => {
  throw TypeError(e);
}, b = (e, t, i, a) => {
  for (var o = a > 1 ? void 0 : a ? De(t, i) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (o = (a ? l(t, i, o) : l(o)) || o);
  return a && o && Ge(t, i, o), o;
}, U = (e, t, i) => t.has(e) || D("Cannot " + i), f = (e, t, i) => (U(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Ue = (e, t, i) => t.has(e) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), n = (e, t, i) => (U(e, t, "access private method"), i), s, h, _, W, $, A, S, v, I, H, Y, K, T, Q, c, E, P, J, X, Z, j, ee, te, y, C, ie, R, oe, ae, se, re, ne, ue, le, ce, de, pe, he, fe, N, M, ve, me, ge, be, _e, xe, $e, ye, we, F, ze, ke;
let We = 0;
function V() {
  return `r-${++We}`;
}
const Se = {
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
}, w = ["positionFirst", "positionLast"], Ee = [
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
], Ce = {
  title: "Title",
  content: "Content",
  description: "Description",
  summary: "Summary"
}, Ie = ["title", "content", "description", "summary"], He = {
  block: "Block",
  style: "Style"
}, Ye = ["block", "style"], Ke = {
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
}, Qe = [
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
], Je = {
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  code: "Code",
  highlight: "Highlight"
}, Xe = ["bold", "italic", "strikethrough", "code", "highlight"];
let p = class extends Te {
  constructor() {
    super(...arguments), Ue(this, s), this._rules = [], this._groupOrder = [], this._expandedSections = /* @__PURE__ */ new Set(), this._expandedRules = /* @__PURE__ */ new Set(), this._renamingGroup = null, this._renameValue = "";
  }
  firstUpdated() {
    const e = this.data?.existingRules;
    if (!e) return;
    const t = [], i = [];
    for (const a of e.groups ?? []) {
      i.push(a.name);
      for (const o of a.rules)
        t.push(n(this, s, S).call(this, o, a.name));
    }
    for (const a of e.rules ?? [])
      t.push(n(this, s, S).call(this, a, null));
    this._rules = t, this._groupOrder = i;
  }
  render() {
    const e = n(this, s, Y).call(this), t = /* @__PURE__ */ new Map();
    for (const [a, o] of e) {
      const r = f(this, s, v).find((l) => l.id === a);
      if (r) {
        const l = t.get(o) ?? [];
        l.push(r), t.set(o, l);
      }
    }
    const i = f(this, s, H);
    return u`
			<umb-body-layout headline="Edit Sections: ${f(this, s, I)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${f(this, s, v).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${f(this, s, v).length - e.size} unmatched</span>
						${this._groupOrder.length > 0 ? u`<span class="meta-badge">${this._groupOrder.length} group${this._groupOrder.length !== 1 ? "s" : ""}</span>` : d}
					</div>

					${i.map((a) => {
      const o = (r) => n(this, s, $e).call(this, r, t.get(r._id) ?? []);
      return a.group !== null ? u`
								<div class="group-container">
									${n(this, s, ze).call(this, a.group)}
									<div class="group-rules">
										<updoc-sortable-rules
											.rules=${a.rules}
											.expandedIds=${this._expandedRules}
											.renderItem=${o}
											@sort-change=${(r) => n(this, s, R).call(this, a.group, r)}
										></updoc-sortable-rules>
										<uui-button
											look="placeholder"
											label="Add rule to ${a.group}"
											@click=${() => n(this, s, E).call(this, a.group)}>
											+ Add rule
										</uui-button>
									</div>
								</div>
							` : u`
							${this._groupOrder.length > 0 ? u`
								<div class="ungrouped-label">Ungrouped</div>
							` : d}
							<updoc-sortable-rules
								.rules=${a.rules}
								.expandedIds=${this._expandedRules}
								.renderItem=${o}
								@sort-change=${(r) => n(this, s, R).call(this, null, r)}
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
						@click=${() => n(this, s, ee).call(this)}>
						<uui-icon name="icon-add"></uui-icon>
						Add group
					</uui-button>

					${n(this, s, ke).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${n(this, s, ge)}>Close</uui-button>
					<uui-button
						label="Save"
						look="secondary"
						@click=${n(this, s, ve)}>
						Save
					</uui-button>
					<uui-button
						label="Save and Close"
						look="primary"
						color="positive"
						@click=${n(this, s, me)}>
						Save and Close
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
h = function(e, t) {
  return this._expandedSections.has(`${e}-${t}`);
};
_ = function(e, t) {
  const i = `${e}-${t}`, a = new Set(this._expandedSections);
  a.has(i) ? a.delete(i) : a.add(i), this._expandedSections = a;
};
W = function(e) {
  return this._expandedRules.has(e);
};
$ = function(e) {
  const t = new Set(this._expandedRules);
  t.has(e) ? t.delete(e) : t.add(e), this._expandedRules = t;
};
A = function(e) {
  if (!this._expandedRules.has(e)) {
    const t = new Set(this._expandedRules);
    t.add(e), this._expandedRules = t;
  }
};
S = function(e, t) {
  let i = e.part, a = e.exclude ?? !1;
  if (!i && !a) {
    const r = Re(e);
    r === "exclude" ? a = !0 : i = r;
  }
  let o = e.formats;
  return (!o || o.length === 0) && (o = [{ type: "block", value: e.format ?? Ne(e) }]), {
    ...e,
    part: i,
    exclude: a,
    formats: o,
    _id: V(),
    _groupName: t
  };
};
v = function() {
  return this.data?.elements ?? [];
};
I = function() {
  return this.data?.sectionHeading ?? "Section";
};
H = function() {
  const e = [];
  for (const t of this._groupOrder)
    e.push({
      group: t,
      rules: this._rules.filter((i) => i._groupName === t)
    });
  return e.push({
    group: null,
    rules: this._rules.filter((t) => t._groupName === null)
  }), e;
};
Y = function() {
  const e = /* @__PURE__ */ new Map(), t = f(this, s, v);
  for (const i of this._rules)
    if (i.conditions.length !== 0)
      for (let a = 0; a < t.length; a++) {
        const o = t[a];
        if (!e.has(o.id) && n(this, s, K).call(this, o, i.conditions, a, t.length)) {
          if (i.exceptions?.length && i.exceptions.some(
            (l) => n(this, s, T).call(this, o, l, a, t.length)
          ))
            continue;
          e.set(o.id, i._id);
        }
      }
  return e;
};
K = function(e, t, i, a) {
  return t.every((o) => n(this, s, T).call(this, e, o, i, a));
};
T = function(e, t, i, a) {
  const o = String(t.value ?? ""), r = Number(t.value);
  switch (t.type) {
    case "textBeginsWith":
      return e.text.toLowerCase().startsWith(o.toLowerCase());
    case "textEndsWith":
      return e.text.toLowerCase().endsWith(o.toLowerCase());
    case "textContains":
      return e.text.toLowerCase().includes(o.toLowerCase());
    case "textMatchesPattern":
      try {
        return new RegExp(o, "i").test(e.text);
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
      return e.fontName.toLowerCase().includes(o.toLowerCase());
    case "colorEquals":
      return e.color.toLowerCase() === o.toLowerCase();
    case "positionFirst":
      return i === 0;
    case "positionLast":
      return i === a - 1;
    default:
      return !1;
  }
};
Q = function(e, t, i) {
  const a = [];
  a.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName && a.push({ type: "fontNameContains", value: e.fontName }), e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && a.push({ type: "colorEquals", value: e.color });
  const o = e.text.indexOf(":");
  return o > 0 && o < 30 && a.push({ type: "textBeginsWith", value: e.text.substring(0, o + 1) }), t === 0 ? a.push({ type: "positionFirst" }) : t === i - 1 && a.push({ type: "positionLast" }), a;
};
c = function(e, t) {
  this._rules = this._rules.map((i) => i._id === e ? t(i) : i);
};
E = function(e = null) {
  const t = V();
  this._rules = [...this._rules, {
    role: "",
    part: "content",
    conditions: [],
    formats: [{ type: "block", value: "auto" }],
    _id: t,
    _groupName: e
  }], n(this, s, A).call(this, t);
};
P = function(e) {
  this._rules = this._rules.filter((t) => t._id !== e);
};
J = function(e, t) {
  const i = n(this, s, Q).call(this, e, t, f(this, s, v).length), a = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, ""), o = V();
  this._rules = [...this._rules, {
    role: a,
    part: "content",
    conditions: i,
    formats: [{ type: "block", value: "auto" }],
    _id: o,
    _groupName: null
  }], n(this, s, A).call(this, o);
};
X = function(e, t) {
  n(this, s, c).call(this, e, (i) => ({ ...i, role: t }));
};
Z = function(e, t) {
  n(this, s, c).call(this, e, (i) => ({ ...i, part: t }));
};
j = function(e, t) {
  n(this, s, c).call(this, e, (i) => ({ ...i, exclude: t }));
};
ee = function() {
  let e = "New Group", t = 1;
  for (; this._groupOrder.includes(e); )
    e = `New Group ${++t}`;
  this._groupOrder = [...this._groupOrder, e], this._renamingGroup = e, this._renameValue = e;
};
te = function(e) {
  this._renamingGroup = e, this._renameValue = e;
};
y = function() {
  if (!this._renamingGroup || !this._renameValue.trim()) return;
  const e = this._renamingGroup, t = this._renameValue.trim();
  e !== t && (this._groupOrder = this._groupOrder.map((i) => i === e ? t : i), this._rules = this._rules.map(
    (i) => i._groupName === e ? { ...i, _groupName: t } : i
  )), this._renamingGroup = null, this._renameValue = "";
};
C = function() {
  this._renamingGroup = null, this._renameValue = "";
};
ie = function(e) {
  this._rules = this._rules.map(
    (t) => t._groupName === e ? { ...t, _groupName: null } : t
  ), this._groupOrder = this._groupOrder.filter((t) => t !== e);
};
R = function(e, t) {
  const i = t.detail.rules, a = new Set(i.map((r) => r._id)), o = [];
  for (const r of this._groupOrder)
    r === e ? o.push(...i.map((l) => ({ ...l, _groupName: r }))) : o.push(...this._rules.filter((l) => l._groupName === r && !a.has(l._id)));
  e === null ? o.push(...i.map((r) => ({ ...r, _groupName: null }))) : o.push(...this._rules.filter((r) => r._groupName === null && !a.has(r._id))), this._rules = o;
};
oe = function(e) {
  n(this, s, c).call(this, e, (t) => ({
    ...t,
    formats: [...t.formats ?? [], { type: "block", value: "auto" }]
  }));
};
ae = function(e, t) {
  n(this, s, c).call(this, e, (i) => ({
    ...i,
    formats: (i.formats ?? []).filter((a, o) => o !== t)
  }));
};
se = function(e, t, i) {
  const a = i === "block" ? "auto" : "bold";
  n(this, s, c).call(this, e, (o) => {
    const r = [...o.formats ?? []];
    return r[t] = { type: i, value: a }, { ...o, formats: r };
  });
};
re = function(e, t, i) {
  n(this, s, c).call(this, e, (a) => {
    const o = [...a.formats ?? []];
    return o[t] = { ...o[t], value: i }, { ...a, formats: o };
  });
};
ne = function(e) {
  n(this, s, c).call(this, e, (t) => ({
    ...t,
    conditions: [...t.conditions, { type: "textBeginsWith", value: "" }]
  }));
};
ue = function(e, t) {
  n(this, s, c).call(this, e, (i) => ({
    ...i,
    conditions: i.conditions.filter((a, o) => o !== t)
  }));
};
le = function(e, t, i) {
  n(this, s, c).call(this, e, (a) => {
    const o = [...a.conditions];
    return o[t] = {
      type: i,
      value: w.includes(i) ? void 0 : o[t].value
    }, { ...a, conditions: o };
  });
};
ce = function(e, t, i) {
  n(this, s, c).call(this, e, (a) => {
    const o = [...a.conditions], r = o[t], l = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
    return o[t] = { ...r, value: l && !isNaN(Number(i)) ? Number(i) : i }, { ...a, conditions: o };
  });
};
de = function(e) {
  n(this, s, c).call(this, e, (t) => ({
    ...t,
    exceptions: [...t.exceptions ?? [], { type: "textContains", value: "" }]
  }));
};
pe = function(e, t) {
  n(this, s, c).call(this, e, (i) => ({
    ...i,
    exceptions: (i.exceptions ?? []).filter((a, o) => o !== t)
  }));
};
he = function(e, t, i) {
  n(this, s, c).call(this, e, (a) => {
    const o = [...a.exceptions ?? []];
    return o[t] = {
      type: i,
      value: w.includes(i) ? void 0 : o[t].value
    }, { ...a, exceptions: o };
  });
};
fe = function(e, t, i) {
  n(this, s, c).call(this, e, (a) => {
    const o = [...a.exceptions ?? []], r = o[t], l = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
    return o[t] = { ...r, value: l && !isNaN(Number(i)) ? Number(i) : i }, { ...a, exceptions: o };
  });
};
N = function(e) {
  const t = (e.formats ?? []).find((l) => l.type === "block"), { _id: i, _groupName: a, action: o, ...r } = e;
  return {
    ...r,
    format: t?.value ?? "auto"
  };
};
M = function() {
  this._renamingGroup && n(this, s, y).call(this);
  const e = [];
  for (const i of this._groupOrder) {
    const a = this._rules.filter((o) => o._groupName === i).map((o) => n(this, s, N).call(this, o));
    e.push({ name: i, rules: a });
  }
  const t = this._rules.filter((i) => i._groupName === null).map((i) => n(this, s, N).call(this, i));
  return { groups: e, rules: t };
};
ve = async function() {
  const e = n(this, s, M).call(this);
  this.data?.onSave && await this.data.onSave(e);
};
me = function() {
  const e = n(this, s, M).call(this);
  this.value = { rules: e }, this.modalContext?.submit();
};
ge = function() {
  this.modalContext?.reject();
};
be = function(e, t, i) {
  const a = w.includes(i.type);
  return u`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(o) => n(this, s, le).call(this, e, t, o.target.value)}>
					${Ee.map((o) => u`
						<option value=${o} ?selected=${o === i.type}>${Se[o]}</option>
					`)}
				</select>
				${a ? d : u`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(o) => n(this, s, ce).call(this, e, t, o.target.value)} />
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
_e = function(e, t, i) {
  const a = w.includes(i.type);
  return u`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(o) => n(this, s, he).call(this, e, t, o.target.value)}>
					${Ee.map((o) => u`
						<option value=${o} ?selected=${o === i.type}>${Se[o]}</option>
					`)}
				</select>
				${a ? d : u`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(o) => n(this, s, fe).call(this, e, t, o.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => n(this, s, pe).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
xe = function(e, t, i) {
  const a = i.type === "block" ? Qe : Xe, o = i.type === "block" ? Ke : Je;
  return u`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${i.type}
					@change=${(r) => n(this, s, se).call(this, e, t, r.target.value)}>
					${Ye.map((r) => u`
						<option value=${r} ?selected=${r === i.type}>${He[r]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${i.value}
					@change=${(r) => n(this, s, re).call(this, e, t, r.target.value)}>
					${a.map((r) => u`
						<option value=${r} ?selected=${r === i.value}>${o[r]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => n(this, s, ae).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
$e = function(e, t) {
  return n(this, s, W).call(this, e._id) ? n(this, s, we).call(this, e, t) : n(this, s, ye).call(this, e, t);
};
ye = function(e, t) {
  const i = e.exclude, a = e.part ?? "content", o = i ? "Exclude" : Ce[a] ?? a, r = t.length, l = e.role || "(unnamed rule)";
  return u`
			<div class="rule-row" @click=${() => n(this, s, $).call(this, e._id)}>
				<span class="rule-grip" title="Drag to reorder" @click=${(z) => z.stopPropagation()}>⠿</span>
				<span class="rule-row-name">${l}</span>
				<span class="rule-row-part ${i ? "excluded" : ""}">${o}</span>
				${r > 0 ? u`<span class="rule-row-match ${i ? "excluded" : "matched"}">${r}&times;</span>` : u`<span class="rule-row-match no-match">0</span>`}
				<uui-action-bar class="rule-row-actions"
					@click=${(z) => z.stopPropagation()}>
					<uui-button pristine look="primary" label="Edit rule"
						@click=${() => n(this, s, $).call(this, e._id)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete rule"
						@click=${() => n(this, s, P).call(this, e._id)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
we = function(e, t) {
  const i = e.exclude, a = e.part ?? "content", o = e._id;
  return u`
			<div class="rule-card">
				<div class="rule-header">
					<uui-icon class="rule-row-chevron expanded" name="icon-navigation-down"
						@click=${() => n(this, s, $).call(this, o)}
						style="cursor:pointer"></uui-icon>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(r) => n(this, s, X).call(this, o, r.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => n(this, s, P).call(this, o)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => n(this, s, _).call(this, "conditions", o)}>
						<uui-icon name=${n(this, s, h).call(this, "conditions", o) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${n(this, s, h).call(this, "conditions", o) ? u`
						${e.conditions.map((r, l) => n(this, s, be).call(this, o, l, r))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => n(this, s, ne).call(this, o)}>
							+ Add condition
						</uui-button>
					` : d}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => n(this, s, _).call(this, "exceptions", o)}>
						<uui-icon name=${n(this, s, h).call(this, "exceptions", o) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${n(this, s, h).call(this, "exceptions", o) ? u`
						${(e.exceptions ?? []).map((r, l) => n(this, s, _e).call(this, o, l, r))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => n(this, s, de).call(this, o)}>
							+ Add exception
						</uui-button>
					` : d}
				</div>

				<div class="part-area">
					<div class="section-header collapsible" @click=${() => n(this, s, _).call(this, "part", o)}>
						<uui-icon name=${n(this, s, h).call(this, "part", o) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Part
					</div>
					${n(this, s, h).call(this, "part", o) ? u`
						<div class="part-controls">
							<select
								class="part-select"
								.value=${a}
								?disabled=${i}
								@change=${(r) => n(this, s, Z).call(this, o, r.target.value)}>
								${Ie.map((r) => u`
									<option value=${r} ?selected=${r === a}>${Ce[r]}</option>
								`)}
							</select>
							<label class="exclude-label">
								<input
									type="checkbox"
									.checked=${i}
									@change=${(r) => n(this, s, j).call(this, o, r.target.checked)} />
								Exclude
							</label>
						</div>
					` : d}
				</div>

				${i ? d : u`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => n(this, s, _).call(this, "format", o)}>
						<uui-icon name=${n(this, s, h).call(this, "format", o) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Format${(e.formats ?? []).length > 0 ? ` (${(e.formats ?? []).length})` : ""}
					</div>
					${n(this, s, h).call(this, "format", o) ? u`
						${(e.formats ?? []).map((r, l) => n(this, s, xe).call(this, o, l, r))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => n(this, s, oe).call(this, o)}>
							+ Add format
						</uui-button>
					` : d}
				</div>
				`}

				<div class="match-preview ${t.length > 0 ? i ? "excluded" : "matched" : "no-match"}">
					${t.length > 0 ? u`<uui-icon name=${i ? "icon-block" : "icon-check"}></uui-icon> ${i ? "Excluded" : "Matched"} <strong>${t.length}&times;</strong>${t.length <= 5 ? u`: ${t.map((r, l) => u`${l > 0 ? u`, ` : d}<strong>${n(this, s, F).call(this, r.text, 40)}</strong>`)}` : d}` : u`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
F = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
ze = function(e) {
  return this._renamingGroup === e ? u`
				<div class="group-header">
					<input
						type="text"
						class="group-rename-input"
						.value=${this._renameValue}
						@input=${(t) => {
    this._renameValue = t.target.value;
  }}
						@keydown=${(t) => {
    t.key === "Enter" && n(this, s, y).call(this), t.key === "Escape" && n(this, s, C).call(this);
  }} />
					<uui-button compact look="primary" label="Confirm" @click=${() => n(this, s, y).call(this)}>
						<uui-icon name="icon-check"></uui-icon>
					</uui-button>
					<uui-button compact look="secondary" label="Cancel" @click=${() => n(this, s, C).call(this)}>
						<uui-icon name="icon-wrong"></uui-icon>
					</uui-button>
				</div>
			` : u`
			<div class="group-header">
				<strong class="group-name">${e}</strong>
				<span class="header-spacer"></span>
				<uui-action-bar class="group-header-actions">
					<uui-button pristine look="primary" label="Rename" @click=${() => n(this, s, te).call(this, e)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete group"
						title="Delete group (rules move to ungrouped)"
						@click=${() => n(this, s, ie).call(this, e)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
ke = function(e) {
  const t = f(this, s, v), i = t.filter((a) => !e.has(a.id));
  return i.length === 0 ? d : u`
			<div class="unmatched-section">
				<h4>Unmatched elements (${i.length})</h4>
				${i.map((a) => {
    const o = t.indexOf(a);
    return u`
						<div class="unmatched-element">
							<div class="unmatched-text">${n(this, s, F).call(this, a.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${a.fontSize}pt</span>
								<span class="meta-badge">${a.fontName}</span>
								${a.color !== "#000000" ? u`<span class="meta-badge" style="border-left: 3px solid ${a.color};">${a.color}</span>` : d}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => n(this, s, J).call(this, a, o)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
p.styles = [
  Pe,
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
], p.prototype, "_rules", 2);
b([
  g()
], p.prototype, "_groupOrder", 2);
b([
  g()
], p.prototype, "_expandedSections", 2);
b([
  g()
], p.prototype, "_expandedRules", 2);
b([
  g()
], p.prototype, "_renamingGroup", 2);
b([
  g()
], p.prototype, "_renameValue", 2);
p = b([
  B("up-doc-section-rules-editor-modal")
], p);
const at = p;
export {
  p as UpDocSectionRulesEditorModalElement,
  at as default
};
//# sourceMappingURL=section-rules-editor-modal.element-DDJy8X_t.js.map
