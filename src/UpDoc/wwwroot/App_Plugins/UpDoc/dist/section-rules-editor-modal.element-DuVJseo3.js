import { g as Be, b as Ve } from "./workflow.types-sXs8a86t.js";
import { UmbSorterController as We } from "@umbraco-cms/backoffice/sorter";
import { css as A, property as T, state as g, customElement as q, nothing as d, repeat as qe, html as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Ge } from "@umbraco-cms/backoffice/lit-element";
import { UmbModalBaseElement as De } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as Ue } from "@umbraco-cms/backoffice/style";
const G = A`
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

	.condition-value-input.range-input {
		max-width: 80px;
		flex: 0 0 auto;
	}

	.range-separator {
		font-size: var(--uui-type-small-size);
		color: var(--uui-color-text-alt);
		align-self: center;
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
var He = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, D = (e) => {
  throw TypeError(e);
}, $ = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? Ye(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (a = (o ? l(t, i, a) : l(a)) || a);
  return o && a && He(t, i, a), a;
}, Ke = (e, t, i) => t.has(e) || D("Cannot " + i), je = (e, t, i) => (Ke(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Ie = (e, t, i) => t.has(e) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), k;
let v = class extends Ge {
  constructor() {
    super(...arguments), Ie(this, k, new We(this, {
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
    this._rules = e, je(this, k).setModel(e);
  }
  get rules() {
    return this._rules;
  }
  render() {
    return this._rules.length === 0 && !this.renderItem ? d : u`
			<div class="rules-container">
				${qe(
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
v.styles = [
  G,
  A`
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
$([
  T({ attribute: !1 })
], v.prototype, "rules", 1);
$([
  g()
], v.prototype, "_rules", 2);
$([
  T({ attribute: !1 })
], v.prototype, "expandedIds", 2);
$([
  T({ attribute: !1 })
], v.prototype, "renderItem", 2);
v = $([
  q("updoc-sortable-rules")
], v);
var Qe = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, U = (e) => {
  throw TypeError(e);
}, b = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? Je(t, i) : t, s = e.length - 1, l; s >= 0; s--)
    (l = e[s]) && (a = (o ? l(t, i, a) : l(a)) || a);
  return o && a && Qe(t, i, a), a;
}, H = (e, t, i) => t.has(e) || U("Cannot " + i), f = (e, t, i) => (H(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Xe = (e, t, i) => t.has(e) ? U("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), r = (e, t, i) => (H(e, t, "access private method"), i), n, p, x, Y, y, O, R, m, K, j, I, Q, F, J, c, S, P, X, Z, ee, te, ie, ae, z, E, oe, C, ne, se, re, le, ue, ce, de, pe, N, he, fe, me, ve, ge, be, xe, _e, $e, L, M, ye, ze, we, ke, Re, Se, Ee, Ce, Ne, Le, B, Ae, Te;
let Ze = 0;
function V() {
  return `r-${++Ze}`;
}
const Oe = {
  textBeginsWith: "Text begins with",
  textEndsWith: "Text ends with",
  textContains: "Text contains",
  textEquals: "Text equals",
  textMatchesPattern: "Text matches pattern",
  fontSizeEquals: "Font size equals",
  fontSizeAbove: "Font size above",
  fontSizeBelow: "Font size below",
  fontSizeRange: "Font size between",
  fontNameContains: "Font name contains",
  fontNameEquals: "Font name equals",
  colorEquals: "Color equals",
  positionFirst: "Position: first",
  positionLast: "Position: last"
}, w = ["positionFirst", "positionLast"], Fe = [
  "textBeginsWith",
  "textEndsWith",
  "textContains",
  "textEquals",
  "textMatchesPattern",
  "fontSizeEquals",
  "fontSizeAbove",
  "fontSizeBelow",
  "fontSizeRange",
  "fontNameContains",
  "fontNameEquals",
  "colorEquals",
  "positionFirst",
  "positionLast"
], Pe = {
  title: "Title",
  content: "Content",
  description: "Description",
  summary: "Summary"
}, et = ["title", "content", "description", "summary"], tt = {
  block: "Block",
  style: "Style"
}, it = ["block", "style"], at = {
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
}, ot = [
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
], nt = {
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  code: "Code",
  highlight: "Highlight"
}, st = ["bold", "italic", "strikethrough", "code", "highlight"], rt = {
  textBeginsWith: "Text begins with",
  textEndsWith: "Text ends with",
  textContains: "Text contains"
}, lt = ["textBeginsWith", "textEndsWith", "textContains"], W = {
  replaceWith: "Replace with",
  replaceAll: "Replace all with"
};
let h = class extends De {
  constructor() {
    super(...arguments), Xe(this, n), this._rules = [], this._groupOrder = [], this._expandedSections = /* @__PURE__ */ new Set(), this._expandedRules = /* @__PURE__ */ new Set(), this._renamingGroup = null, this._renameValue = "";
  }
  firstUpdated() {
    const e = this.data?.existingRules;
    if (!e) return;
    const t = [], i = [];
    for (const o of e.groups ?? []) {
      i.push(o.name);
      for (const a of o.rules)
        t.push(r(this, n, R).call(this, a, o.name));
    }
    for (const o of e.rules ?? [])
      t.push(r(this, n, R).call(this, o, null));
    this._rules = t, this._groupOrder = i;
  }
  render() {
    const e = r(this, n, I).call(this), t = /* @__PURE__ */ new Map();
    for (const [o, a] of e) {
      const s = f(this, n, m).find((l) => l.id === o);
      if (s) {
        const l = t.get(a) ?? [];
        l.push(s), t.set(a, l);
      }
    }
    const i = f(this, n, j);
    return u`
			<umb-body-layout headline="Edit Sections: ${f(this, n, K)}">
				<div id="main">
					<div class="section-info">
						${this.data?.sectionCount != null ? u`<span class="meta-badge">${this.data.sectionCount} section${this.data.sectionCount !== 1 ? "s" : ""}</span>` : d}
						<span class="meta-badge">${f(this, n, m).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${f(this, n, m).length - e.size} unmatched</span>
						${this._groupOrder.length > 0 ? u`<span class="meta-badge">${this._groupOrder.length} group${this._groupOrder.length !== 1 ? "s" : ""}</span>` : d}
					</div>

					${i.map((o) => {
      const a = (s) => r(this, n, Ce).call(this, s, t.get(s._id) ?? []);
      return o.group !== null ? u`
								<div class="group-container">
									${r(this, n, Ae).call(this, o.group)}
									<div class="group-rules">
										<updoc-sortable-rules
											.rules=${o.rules}
											.expandedIds=${this._expandedRules}
											.renderItem=${a}
											@sort-change=${(s) => r(this, n, C).call(this, o.group, s)}
										></updoc-sortable-rules>
										<uui-button
											look="placeholder"
											label="Add rule to ${o.group}"
											@click=${() => r(this, n, S).call(this, o.group)}>
											+ Add rule
										</uui-button>
									</div>
								</div>
							` : u`
							${this._groupOrder.length > 0 ? u`
								<div class="ungrouped-label">Ungrouped</div>
							` : d}
							<updoc-sortable-rules
								.rules=${o.rules}
								.expandedIds=${this._expandedRules}
								.renderItem=${a}
								@sort-change=${(s) => r(this, n, C).call(this, null, s)}
							></updoc-sortable-rules>
							<uui-button
								look="placeholder"
								label="Add rule"
								@click=${() => r(this, n, S).call(this, null)}>
								+ Add rule
							</uui-button>
						`;
    })}

					<uui-button
						look="outline"
						label="Add group"
						@click=${() => r(this, n, ie).call(this)}>
						<uui-icon name="icon-add"></uui-icon>
						Add group
					</uui-button>

					${r(this, n, Te).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${r(this, n, we)}>Close</uui-button>
					<uui-button
						label="Save"
						look="secondary"
						@click=${r(this, n, ye)}>
						Save
					</uui-button>
					<uui-button
						label="Save and Close"
						look="primary"
						color="positive"
						@click=${r(this, n, ze)}>
						Save and Close
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
p = function(e, t) {
  return this._expandedSections.has(`${e}-${t}`);
};
x = function(e, t) {
  const i = `${e}-${t}`, o = new Set(this._expandedSections);
  o.has(i) ? o.delete(i) : o.add(i), this._expandedSections = o;
};
Y = function(e) {
  return this._expandedRules.has(e);
};
y = function(e) {
  const t = new Set(this._expandedRules);
  t.has(e) ? t.delete(e) : t.add(e), this._expandedRules = t;
};
O = function(e) {
  if (!this._expandedRules.has(e)) {
    const t = new Set(this._expandedRules);
    t.add(e), this._expandedRules = t;
  }
};
R = function(e, t) {
  let i = e.part, o = e.exclude ?? !1;
  if (!i && !o) {
    const s = Be(e);
    s === "exclude" ? o = !0 : i = s;
  }
  let a = e.formats;
  return (!a || a.length === 0) && (a = [{ type: "block", value: e.format ?? Ve(e) }]), {
    ...e,
    part: i,
    exclude: o,
    formats: a,
    _id: V(),
    _groupName: t
  };
};
m = function() {
  return this.data?.elements ?? [];
};
K = function() {
  return this.data?.sectionHeading ?? "Section";
};
j = function() {
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
I = function() {
  const e = /* @__PURE__ */ new Map(), t = f(this, n, m);
  for (const i of this._rules)
    if (i.conditions.length !== 0)
      for (let o = 0; o < t.length; o++) {
        const a = t[o];
        if (!e.has(a.id) && r(this, n, Q).call(this, a, i.conditions, o, t.length)) {
          if (i.exceptions?.length && i.exceptions.some(
            (l) => r(this, n, F).call(this, a, l, o, t.length)
          ))
            continue;
          e.set(a.id, i._id);
        }
      }
  return e;
};
Q = function(e, t, i, o) {
  return t.every((a) => r(this, n, F).call(this, e, a, i, o));
};
F = function(e, t, i, o) {
  const a = String(t.value ?? ""), s = Number(t.value);
  switch (t.type) {
    case "textBeginsWith":
      return e.text.toLowerCase().startsWith(a.toLowerCase());
    case "textEndsWith":
      return e.text.toLowerCase().endsWith(a.toLowerCase());
    case "textContains":
      return e.text.toLowerCase().includes(a.toLowerCase());
    case "textMatchesPattern":
      try {
        return new RegExp(a, "i").test(e.text);
      } catch {
        return !1;
      }
    case "fontSizeEquals":
      return !isNaN(s) && Math.abs(e.fontSize - s) <= 0.5;
    case "fontSizeAbove":
      return !isNaN(s) && e.fontSize > s;
    case "fontSizeBelow":
      return !isNaN(s) && e.fontSize < s;
    case "fontSizeRange": {
      const l = t.value && typeof t.value == "object" ? t.value : null;
      return l !== null && e.fontSize >= l.min && e.fontSize <= l.max;
    }
    case "fontNameContains":
      return e.fontName.toLowerCase().includes(a.toLowerCase());
    case "colorEquals":
      return e.color.toLowerCase() === a.toLowerCase();
    case "positionFirst":
      return i === 0;
    case "positionLast":
      return i === o - 1;
    default:
      return !1;
  }
};
J = function(e, t, i) {
  const o = [];
  if (o.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName) {
    const s = e.fontName.includes("+") ? e.fontName.substring(e.fontName.indexOf("+") + 1) : e.fontName;
    o.push({ type: "fontNameContains", value: s });
  }
  e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && o.push({ type: "colorEquals", value: e.color });
  const a = e.text.indexOf(":");
  return a > 0 && a < 30 && o.push({ type: "textBeginsWith", value: e.text.substring(0, a + 1) }), t === 0 ? o.push({ type: "positionFirst" }) : t === i - 1 && o.push({ type: "positionLast" }), o;
};
c = function(e, t) {
  this._rules = this._rules.map((i) => i._id === e ? t(i) : i);
};
S = function(e = null) {
  const t = V();
  this._rules = [...this._rules, {
    role: "",
    part: "content",
    conditions: [],
    formats: [{ type: "block", value: "auto" }],
    _id: t,
    _groupName: e
  }], r(this, n, O).call(this, t);
};
P = function(e) {
  this._rules = this._rules.filter((t) => t._id !== e);
};
X = function(e, t) {
  const i = r(this, n, J).call(this, e, t, f(this, n, m).length), o = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, ""), a = V();
  this._rules = [...this._rules, {
    role: o,
    part: "content",
    conditions: i,
    formats: [{ type: "block", value: "auto" }],
    _id: a,
    _groupName: null
  }], r(this, n, O).call(this, a);
};
Z = function(e, t) {
  r(this, n, c).call(this, e, (i) => ({ ...i, role: t }));
};
ee = function(e, t) {
  r(this, n, c).call(this, e, (i) => ({ ...i, part: t }));
};
te = function(e, t) {
  r(this, n, c).call(this, e, (i) => ({ ...i, exclude: t }));
};
ie = function() {
  let e = "New Group", t = 1;
  for (; this._groupOrder.includes(e); )
    e = `New Group ${++t}`;
  this._groupOrder = [...this._groupOrder, e], this._renamingGroup = e, this._renameValue = e;
};
ae = function(e) {
  this._renamingGroup = e, this._renameValue = e;
};
z = function() {
  if (!this._renamingGroup || !this._renameValue.trim()) return;
  const e = this._renamingGroup, t = this._renameValue.trim();
  e !== t && (this._groupOrder = this._groupOrder.map((i) => i === e ? t : i), this._rules = this._rules.map(
    (i) => i._groupName === e ? { ...i, _groupName: t } : i
  )), this._renamingGroup = null, this._renameValue = "";
};
E = function() {
  this._renamingGroup = null, this._renameValue = "";
};
oe = function(e) {
  this._rules = this._rules.map(
    (t) => t._groupName === e ? { ...t, _groupName: null } : t
  ), this._groupOrder = this._groupOrder.filter((t) => t !== e);
};
C = function(e, t) {
  const i = t.detail.rules, o = new Set(i.map((s) => s._id)), a = [];
  for (const s of this._groupOrder)
    s === e ? a.push(...i.map((l) => ({ ...l, _groupName: s }))) : a.push(...this._rules.filter((l) => l._groupName === s && !o.has(l._id)));
  e === null ? a.push(...i.map((s) => ({ ...s, _groupName: null }))) : a.push(...this._rules.filter((s) => s._groupName === null && !o.has(s._id))), this._rules = a;
};
ne = function(e) {
  r(this, n, c).call(this, e, (t) => ({
    ...t,
    formats: [...t.formats ?? [], { type: "block", value: "auto" }]
  }));
};
se = function(e, t) {
  r(this, n, c).call(this, e, (i) => ({
    ...i,
    formats: (i.formats ?? []).filter((o, a) => a !== t)
  }));
};
re = function(e, t, i) {
  const o = i === "block" ? "auto" : "bold";
  r(this, n, c).call(this, e, (a) => {
    const s = [...a.formats ?? []];
    return s[t] = { type: i, value: o }, { ...a, formats: s };
  });
};
le = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.formats ?? []];
    return a[t] = { ...a[t], value: i }, { ...o, formats: a };
  });
};
ue = function(e) {
  r(this, n, c).call(this, e, (t) => ({
    ...t,
    conditions: [...t.conditions, { type: "textBeginsWith", value: "" }]
  }));
};
ce = function(e, t) {
  r(this, n, c).call(this, e, (i) => ({
    ...i,
    conditions: i.conditions.filter((o, a) => a !== t)
  }));
};
de = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.conditions];
    let s;
    return w.includes(i) ? s = void 0 : i === "fontSizeRange" ? s = { min: 0, max: 100 } : s = a[t].value, a[t] = { type: i, value: s }, { ...o, conditions: a };
  });
};
pe = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.conditions], s = a[t], l = s.type === "fontSizeEquals" || s.type === "fontSizeAbove" || s.type === "fontSizeBelow";
    return a[t] = { ...s, value: l && !isNaN(Number(i)) ? Number(i) : i }, { ...o, conditions: a };
  });
};
N = function(e, t, i, o) {
  r(this, n, c).call(this, e, (a) => {
    const s = [...a.conditions], l = s[t], _ = l.value && typeof l.value == "object" ? l.value : { min: 0, max: 100 }, Me = isNaN(Number(o)) ? 0 : Number(o);
    return s[t] = { ...l, value: { ..._, [i]: Me } }, { ...a, conditions: s };
  });
};
he = function(e) {
  r(this, n, c).call(this, e, (t) => ({
    ...t,
    exceptions: [...t.exceptions ?? [], { type: "textContains", value: "" }]
  }));
};
fe = function(e, t) {
  r(this, n, c).call(this, e, (i) => ({
    ...i,
    exceptions: (i.exceptions ?? []).filter((o, a) => a !== t)
  }));
};
me = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.exceptions ?? []];
    return a[t] = {
      type: i,
      value: w.includes(i) ? void 0 : a[t].value
    }, { ...o, exceptions: a };
  });
};
ve = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.exceptions ?? []], s = a[t], l = s.type === "fontSizeEquals" || s.type === "fontSizeAbove" || s.type === "fontSizeBelow";
    return a[t] = { ...s, value: l && !isNaN(Number(i)) ? Number(i) : i }, { ...o, exceptions: a };
  });
};
ge = function(e) {
  r(this, n, c).call(this, e, (t) => ({
    ...t,
    textReplacements: [...t.textReplacements ?? [], { findType: "textBeginsWith", find: "", replaceType: "replaceWith", replace: "" }]
  }));
};
be = function(e, t) {
  r(this, n, c).call(this, e, (i) => ({
    ...i,
    textReplacements: (i.textReplacements ?? []).filter((o, a) => a !== t)
  }));
};
xe = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.textReplacements ?? []], s = i === "textContains" ? "replaceAll" : "replaceWith";
    return a[t] = { ...a[t], findType: i, replaceType: s }, { ...o, textReplacements: a };
  });
};
_e = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.textReplacements ?? []];
    return a[t] = { ...a[t], find: i }, { ...o, textReplacements: a };
  });
};
$e = function(e, t, i) {
  r(this, n, c).call(this, e, (o) => {
    const a = [...o.textReplacements ?? []];
    return a[t] = { ...a[t], replace: i }, { ...o, textReplacements: a };
  });
};
L = function(e) {
  const t = (e.formats ?? []).find((l) => l.type === "block"), { _id: i, _groupName: o, action: a, ...s } = e;
  return {
    ...s,
    format: t?.value ?? "auto"
  };
};
M = function() {
  this._renamingGroup && r(this, n, z).call(this);
  const e = [];
  for (const i of this._groupOrder) {
    const o = this._rules.filter((a) => a._groupName === i).map((a) => r(this, n, L).call(this, a));
    e.push({ name: i, rules: o });
  }
  const t = this._rules.filter((i) => i._groupName === null).map((i) => r(this, n, L).call(this, i));
  return { groups: e, rules: t };
};
ye = async function() {
  const e = r(this, n, M).call(this);
  this.data?.onSave && await this.data.onSave(e);
};
ze = function() {
  const e = r(this, n, M).call(this);
  this.value = { rules: e }, this.modalContext?.submit();
};
we = function() {
  this.modalContext?.reject();
};
ke = function(e, t, i) {
  const o = w.includes(i.type), a = i.type === "fontSizeRange", s = a && i.value && typeof i.value == "object" ? i.value : { min: 0, max: 100 };
  return u`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(l) => r(this, n, de).call(this, e, t, l.target.value)}>
					${Fe.map((l) => u`
						<option value=${l} ?selected=${l === i.type}>${Oe[l]}</option>
					`)}
				</select>
				${a ? u`
					<input
						type="number"
						class="condition-value-input range-input"
						placeholder="Min"
						.value=${String(s.min)}
						@input=${(l) => r(this, n, N).call(this, e, t, "min", l.target.value)} />
					<span class="range-separator">–</span>
					<input
						type="number"
						class="condition-value-input range-input"
						placeholder="Max"
						.value=${String(s.max)}
						@input=${(l) => r(this, n, N).call(this, e, t, "max", l.target.value)} />
				` : o ? d : u`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(l) => r(this, n, pe).call(this, e, t, l.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => r(this, n, ce).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
Re = function(e, t, i) {
  const o = w.includes(i.type);
  return u`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(a) => r(this, n, me).call(this, e, t, a.target.value)}>
					${Fe.map((a) => u`
						<option value=${a} ?selected=${a === i.type}>${Oe[a]}</option>
					`)}
				</select>
				${o ? d : u`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(a) => r(this, n, ve).call(this, e, t, a.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => r(this, n, fe).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
Se = function(e, t, i) {
  const o = i.type === "block" ? ot : st, a = i.type === "block" ? at : nt;
  return u`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${i.type}
					@change=${(s) => r(this, n, re).call(this, e, t, s.target.value)}>
					${it.map((s) => u`
						<option value=${s} ?selected=${s === i.type}>${tt[s]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${i.value}
					@change=${(s) => r(this, n, le).call(this, e, t, s.target.value)}>
					${o.map((s) => u`
						<option value=${s} ?selected=${s === i.value}>${a[s]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => r(this, n, se).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
Ee = function(e, t, i) {
  const o = i.findType === "textContains" ? W.replaceAll : W.replaceWith;
  return u`
			<div class="find-replace-entry">
				<div class="condition-row">
					<select
						class="condition-type-select"
						.value=${i.findType}
						@change=${(a) => r(this, n, xe).call(this, e, t, a.target.value)}>
						${lt.map((a) => u`
							<option value=${a} ?selected=${a === i.findType}>${rt[a]}</option>
						`)}
					</select>
					<input
						type="text"
						class="condition-value-input"
						placeholder="Find..."
						.value=${i.find}
						@input=${(a) => r(this, n, _e).call(this, e, t, a.target.value)} />
					<uui-button
						compact
						look="secondary"
						label="Remove replacement"
						@click=${() => r(this, n, be).call(this, e, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>
				<div class="condition-row">
					<span class="replace-label">${o}</span>
					<input
						type="text"
						class="condition-value-input"
						placeholder="(empty = remove)"
						.value=${i.replace}
						@input=${(a) => r(this, n, $e).call(this, e, t, a.target.value)} />
				</div>
			</div>
		`;
};
Ce = function(e, t) {
  return r(this, n, Y).call(this, e._id) ? r(this, n, Le).call(this, e, t) : r(this, n, Ne).call(this, e, t);
};
Ne = function(e, t) {
  const i = e.exclude, o = e.part ?? "content", a = i ? "Exclude" : Pe[o] ?? o, s = t.length, l = e.role || "(unnamed rule)";
  return u`
			<div class="rule-row" @click=${() => r(this, n, y).call(this, e._id)}>
				<span class="rule-grip" title="Drag to reorder" @click=${(_) => _.stopPropagation()}>⠿</span>
				<span class="rule-row-name">${l}</span>
				<span class="rule-row-part ${i ? "excluded" : ""}">${a}</span>
				${s > 0 ? u`<span class="rule-row-match ${i ? "excluded" : "matched"}">${s}&times;</span>` : u`<span class="rule-row-match no-match">0</span>`}
				<uui-action-bar class="rule-row-actions"
					@click=${(_) => _.stopPropagation()}>
					<uui-button pristine look="primary" label="Edit rule"
						@click=${() => r(this, n, y).call(this, e._id)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete rule"
						@click=${() => r(this, n, P).call(this, e._id)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
Le = function(e, t) {
  const i = e.exclude, o = e.part ?? "content", a = e._id;
  return u`
			<div class="rule-card">
				<div class="rule-header">
					<uui-icon class="rule-row-chevron expanded" name="icon-navigation-down"
						@click=${() => r(this, n, y).call(this, a)}
						style="cursor:pointer"></uui-icon>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(s) => r(this, n, Z).call(this, a, s.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => r(this, n, P).call(this, a)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => r(this, n, x).call(this, "conditions", a)}>
						<uui-icon name=${r(this, n, p).call(this, "conditions", a) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${r(this, n, p).call(this, "conditions", a) ? u`
						${e.conditions.map((s, l) => r(this, n, ke).call(this, a, l, s))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => r(this, n, ue).call(this, a)}>
							+ Add condition
						</uui-button>
					` : d}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => r(this, n, x).call(this, "exceptions", a)}>
						<uui-icon name=${r(this, n, p).call(this, "exceptions", a) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${r(this, n, p).call(this, "exceptions", a) ? u`
						${(e.exceptions ?? []).map((s, l) => r(this, n, Re).call(this, a, l, s))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => r(this, n, he).call(this, a)}>
							+ Add exception
						</uui-button>
					` : d}
				</div>

				<div class="part-area">
					<div class="section-header collapsible" @click=${() => r(this, n, x).call(this, "part", a)}>
						<uui-icon name=${r(this, n, p).call(this, "part", a) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Part
					</div>
					${r(this, n, p).call(this, "part", a) ? u`
						<div class="part-controls">
							<select
								class="part-select"
								.value=${o}
								?disabled=${i}
								@change=${(s) => r(this, n, ee).call(this, a, s.target.value)}>
								${et.map((s) => u`
									<option value=${s} ?selected=${s === o}>${Pe[s]}</option>
								`)}
							</select>
							<label class="exclude-label">
								<input
									type="checkbox"
									.checked=${i}
									@change=${(s) => r(this, n, te).call(this, a, s.target.checked)} />
								Exclude
							</label>
						</div>
					` : d}
				</div>

				${i ? d : u`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => r(this, n, x).call(this, "format", a)}>
						<uui-icon name=${r(this, n, p).call(this, "format", a) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Format${(e.formats ?? []).length > 0 ? ` (${(e.formats ?? []).length})` : ""}
					</div>
					${r(this, n, p).call(this, "format", a) ? u`
						${(e.formats ?? []).map((s, l) => r(this, n, Se).call(this, a, l, s))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => r(this, n, ne).call(this, a)}>
							+ Add format
						</uui-button>
					` : d}
				</div>
				`}

				${i ? d : u`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => r(this, n, x).call(this, "findReplace", a)}>
						<uui-icon name=${r(this, n, p).call(this, "findReplace", a) ? "icon-navigation-down" : "icon-navigation-right"}></uui-icon>
						Find &amp; Replace${(e.textReplacements ?? []).length > 0 ? ` (${(e.textReplacements ?? []).length})` : ""}
					</div>
					${r(this, n, p).call(this, "findReplace", a) ? u`
						${(e.textReplacements ?? []).map((s, l) => r(this, n, Ee).call(this, a, l, s))}
						<uui-button
							compact
							look="placeholder"
							label="Add find & replace"
							@click=${() => r(this, n, ge).call(this, a)}>
							+ Add find &amp; replace
						</uui-button>
					` : d}
				</div>
				`}

				<div class="match-preview ${t.length > 0 ? i ? "excluded" : "matched" : "no-match"}">
					${t.length > 0 ? u`<uui-icon name=${i ? "icon-block" : "icon-check"}></uui-icon> ${i ? "Excluded" : "Matched"} <strong>${t.length}&times;</strong>${t.length <= 5 ? u`: ${t.map((s, l) => u`${l > 0 ? u`, ` : d}<strong>${r(this, n, B).call(this, s.text, 40)}</strong>`)}` : d}` : u`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
B = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
Ae = function(e) {
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
    t.key === "Enter" && r(this, n, z).call(this), t.key === "Escape" && r(this, n, E).call(this);
  }} />
					<uui-button compact look="primary" label="Confirm" @click=${() => r(this, n, z).call(this)}>
						<uui-icon name="icon-check"></uui-icon>
					</uui-button>
					<uui-button compact look="secondary" label="Cancel" @click=${() => r(this, n, E).call(this)}>
						<uui-icon name="icon-wrong"></uui-icon>
					</uui-button>
				</div>
			` : u`
			<div class="group-header">
				<strong class="group-name">${e}</strong>
				<span class="header-spacer"></span>
				<uui-action-bar class="group-header-actions">
					<uui-button pristine look="primary" label="Rename" @click=${() => r(this, n, ae).call(this, e)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete group"
						title="Delete group (rules move to ungrouped)"
						@click=${() => r(this, n, oe).call(this, e)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
Te = function(e) {
  const t = f(this, n, m), i = t.filter((o) => !e.has(o.id));
  return i.length === 0 ? d : u`
			<div class="unmatched-section">
				<h4>Unmatched elements (${i.length})</h4>
				${i.map((o) => {
    const a = t.indexOf(o);
    return u`
						<div class="unmatched-element">
							<div class="unmatched-text">${r(this, n, B).call(this, o.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${o.fontSize}pt</span>
								<span class="meta-badge">${o.fontName}</span>
								${o.color !== "#000000" ? u`<span class="meta-badge" style="border-left: 3px solid ${o.color};">${o.color}</span>` : d}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => r(this, n, X).call(this, o, a)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
h.styles = [
  Ue,
  G,
  A`
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
  q("up-doc-section-rules-editor-modal")
], h);
const mt = h;
export {
  h as UpDocSectionRulesEditorModalElement,
  mt as default
};
//# sourceMappingURL=section-rules-editor-modal.element-DuVJseo3.js.map
