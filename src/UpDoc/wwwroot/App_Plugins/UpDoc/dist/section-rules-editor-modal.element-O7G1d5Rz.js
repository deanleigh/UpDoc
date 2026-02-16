import { html as u, nothing as h, css as B, state as P, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as F } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as U } from "@umbraco-cms/backoffice/style";
var D = Object.defineProperty, V = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, m = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? V(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (s = (o ? d(t, i, s) : d(s)) || s);
  return o && s && D(t, i, s), s;
}, b = (e, t, i) => t.has(e) || v("Cannot " + i), l = (e, t, i) => (b(e, t, "read from private field"), i ? i.call(e) : t.get(e)), H = (e, t, i) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), r = (e, t, i) => (b(e, t, "access private method"), i), n, c, g, _, x, z, y, w, C, S, $, N, E, k, L, M, R, A, O, f, W;
const J = {
  textBeginsWith: "Text begins with",
  textEndsWith: "Text ends with",
  textContains: "Text contains",
  textMatchesPattern: "Text matches pattern",
  fontSizeEquals: "Font size equals",
  fontSizeAbove: "Font size above",
  fontSizeBelow: "Font size below",
  fontNameContains: "Font name contains",
  colorEquals: "Color equals",
  positionFirst: "Position: first",
  positionLast: "Position: last"
}, q = ["positionFirst", "positionLast"], j = [
  "textBeginsWith",
  "textEndsWith",
  "textContains",
  "textMatchesPattern",
  "fontSizeEquals",
  "fontSizeAbove",
  "fontSizeBelow",
  "fontNameContains",
  "colorEquals",
  "positionFirst",
  "positionLast"
];
let p = class extends F {
  constructor() {
    super(...arguments), H(this, n), this._rules = [];
  }
  firstUpdated() {
    this.data?.existingRules?.rules?.length && (this._rules = JSON.parse(JSON.stringify(this.data.existingRules.rules)));
  }
  render() {
    const e = r(this, n, _).call(this), t = /* @__PURE__ */ new Map();
    for (const [i, o] of e)
      if (!t.has(o)) {
        const s = l(this, n, c).find((a) => a.id === i);
        s && t.set(o, s);
      }
    return u`
			<umb-body-layout headline="Edit Sections: ${l(this, n, g)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${l(this, n, c).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${l(this, n, c).length - e.size} unmatched</span>
					</div>

					${this._rules.map((i, o) => r(this, n, O).call(this, i, o, t.get(o) ?? null))}

					<uui-button
						look="placeholder"
						label="Add rule"
						@click=${r(this, n, w)}>
						+ Add another rule
					</uui-button>

					${r(this, n, W).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${r(this, n, R)}>Close</uui-button>
					<uui-button
						label="Save"
						look="primary"
						color="positive"
						@click=${r(this, n, M)}>
						Save
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
c = function() {
  return this.data?.elements ?? [];
};
g = function() {
  return this.data?.sectionHeading ?? "Section";
};
_ = function() {
  const e = /* @__PURE__ */ new Map(), t = l(this, n, c);
  for (let i = 0; i < this._rules.length; i++) {
    const o = this._rules[i];
    if (o.conditions.length !== 0)
      for (let s = 0; s < t.length; s++) {
        const a = t[s];
        if (!e.has(a.id) && r(this, n, x).call(this, a, o.conditions, s, t.length)) {
          e.set(a.id, i);
          break;
        }
      }
  }
  return e;
};
x = function(e, t, i, o) {
  return t.every((s) => r(this, n, z).call(this, e, s, i, o));
};
z = function(e, t, i, o) {
  const s = String(t.value ?? ""), a = Number(t.value);
  switch (t.type) {
    case "textBeginsWith":
      return e.text.toLowerCase().startsWith(s.toLowerCase());
    case "textEndsWith":
      return e.text.toLowerCase().endsWith(s.toLowerCase());
    case "textContains":
      return e.text.toLowerCase().includes(s.toLowerCase());
    case "textMatchesPattern":
      try {
        return new RegExp(s, "i").test(e.text);
      } catch {
        return !1;
      }
    case "fontSizeEquals":
      return !isNaN(a) && Math.abs(e.fontSize - a) < 0.5;
    case "fontSizeAbove":
      return !isNaN(a) && e.fontSize > a;
    case "fontSizeBelow":
      return !isNaN(a) && e.fontSize < a;
    case "fontNameContains":
      return e.fontName.toLowerCase().includes(s.toLowerCase());
    case "colorEquals":
      return e.color.toLowerCase() === s.toLowerCase();
    case "positionFirst":
      return i === 0;
    case "positionLast":
      return i === o - 1;
    default:
      return !1;
  }
};
y = function(e, t, i) {
  const o = [];
  o.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName && o.push({ type: "fontNameContains", value: e.fontName }), e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && o.push({ type: "colorEquals", value: e.color });
  const s = e.text.indexOf(":");
  return s > 0 && s < 30 && o.push({ type: "textBeginsWith", value: e.text.substring(0, s + 1) }), t === 0 ? o.push({ type: "positionFirst" }) : t === i - 1 && o.push({ type: "positionLast" }), o;
};
w = function() {
  this._rules = [...this._rules, { role: "", conditions: [] }];
};
C = function(e) {
  this._rules = this._rules.filter((t, i) => i !== e);
};
S = function(e, t) {
  const i = r(this, n, y).call(this, e, t, l(this, n, c).length), o = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "");
  this._rules = [...this._rules, { role: o, conditions: i }];
};
$ = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], role: t }, this._rules = i;
};
N = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.conditions = [...i.conditions, { type: "textBeginsWith", value: "" }], t[e] = i, this._rules = t;
};
E = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.conditions = o.conditions.filter((s, a) => a !== t), i[e] = o, this._rules = i;
};
k = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions], s.conditions[t] = {
    type: i,
    value: q.includes(i) ? void 0 : s.conditions[t].value
  }, o[e] = s, this._rules = o;
};
L = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions];
  const a = s.conditions[t], d = a.type === "fontSizeEquals" || a.type === "fontSizeAbove" || a.type === "fontSizeBelow";
  s.conditions[t] = { ...a, value: d && !isNaN(Number(i)) ? Number(i) : i }, o[e] = s, this._rules = o;
};
M = function() {
  this.value = { rules: { rules: this._rules } }, this.modalContext?.submit();
};
R = function() {
  this.modalContext?.reject();
};
A = function(e, t, i) {
  const o = q.includes(i.type);
  return u`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(s) => r(this, n, k).call(this, e, t, s.target.value)}>
					${j.map((s) => u`
						<option value=${s} ?selected=${s === i.type}>${J[s]}</option>
					`)}
				</select>
				${o ? h : u`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(s) => r(this, n, L).call(this, e, t, s.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => r(this, n, E).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
O = function(e, t, i) {
  return u`
			<div class="rule-card">
				<div class="rule-header">
					<span class="rule-number">${t + 1}</span>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(o) => r(this, n, $).call(this, t, o.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => r(this, n, C).call(this, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					${e.conditions.map((o, s) => r(this, n, A).call(this, t, s, o))}
					<uui-button
						compact
						look="placeholder"
						label="Add condition"
						@click=${() => r(this, n, N).call(this, t)}>
						+ Add condition
					</uui-button>
				</div>

				<div class="match-preview ${i ? "matched" : "no-match"}">
					${i ? u`<uui-icon name="icon-check"></uui-icon> Matched: <strong>${r(this, n, f).call(this, i.text, 60)}</strong>` : u`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
f = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
W = function(e) {
  const t = l(this, n, c), i = t.filter((o) => !e.has(o.id));
  return i.length === 0 ? h : u`
			<div class="unmatched-section">
				<h4>Unmatched elements (${i.length})</h4>
				${i.map((o) => {
    const s = t.indexOf(o);
    return u`
						<div class="unmatched-element">
							<div class="unmatched-text">${r(this, n, f).call(this, o.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${o.fontSize}pt</span>
								<span class="meta-badge">${o.fontName}</span>
								${o.color !== "#000000" ? u`<span class="meta-badge" style="border-left: 3px solid ${o.color};">${o.color}</span>` : h}
							</div>
							<uui-button
								compact
								look="outline"
								label="Create rule from this"
								@click=${() => r(this, n, S).call(this, o, s)}>
								Create rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
p.styles = [
  U,
  B`
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

			/* Rule cards */
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

			.rule-number {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 24px;
				height: 24px;
				border-radius: 50%;
				background: var(--uui-color-default-emphasis);
				color: var(--uui-color-default-contrast);
				font-size: 12px;
				font-weight: 700;
				flex-shrink: 0;
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

			/* Conditions */
			.conditions-area {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
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

			.match-preview.no-match {
				background: color-mix(in srgb, var(--uui-color-warning) 10%, transparent);
				color: var(--uui-color-warning-standalone);
			}

			.match-preview strong {
				font-weight: 600;
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
m([
  P()
], p.prototype, "_rules", 2);
p = m([
  T("up-doc-section-rules-editor-modal")
], p);
const Q = p;
export {
  p as UpDocSectionRulesEditorModalElement,
  Q as default
};
//# sourceMappingURL=section-rules-editor-modal.element-O7G1d5Rz.js.map
