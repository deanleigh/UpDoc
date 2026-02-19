import { html as r, nothing as l, css as K, state as _, customElement as Q } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as X } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as Z } from "@umbraco-cms/backoffice/style";
function I(e, t) {
  switch (e) {
    case "createSection":
    case "setAsHeading":
      return ["sectionTitle", void 0];
    case "addAsContent":
      return ["sectionContent", t ?? "paragraph"];
    case "addAsList":
      return ["sectionContent", t ?? "bulletListItem"];
    case "sectionTitle":
      return ["sectionTitle", void 0];
    case "sectionContent":
      return ["sectionContent", t ?? "paragraph"];
    case "exclude":
      return ["exclude", void 0];
    default:
      return ["sectionContent", t ?? "paragraph"];
  }
}
var ee = Object.defineProperty, te = Object.getOwnPropertyDescriptor, x = (e) => {
  throw TypeError(e);
}, g = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? te(t, i) : t, c = e.length - 1, d; c >= 0; c--)
    (d = e[c]) && (s = (o ? d(t, i, s) : d(s)) || s);
  return o && s && ee(t, i, s), s;
}, $ = (e, t, i) => t.has(e) || x("Cannot " + i), p = (e, t, i) => ($(e, t, "read from private field"), i ? i.call(e) : t.get(e)), ie = (e, t, i) => t.has(e) ? x("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), a = (e, t, i) => ($(e, t, "access private method"), i), n, u, f, h, z, y, w, C, S, E, L, N, k, A, T, R, q, M, O, F, B, P, W, D, U, V, H, J, b, j;
const G = {
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
}, m = ["positionFirst", "positionLast"], Y = [
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
], oe = {
  sectionTitle: "Section Title",
  sectionContent: "Section Content",
  exclude: "Exclude"
}, se = ["sectionTitle", "sectionContent", "exclude"], ne = {
  paragraph: "Paragraph",
  heading1: "Heading 1",
  heading2: "Heading 2",
  heading3: "Heading 3",
  bulletListItem: "Bullet List",
  numberedListItem: "Numbered List"
}, ae = ["paragraph", "heading1", "heading2", "heading3", "bulletListItem", "numberedListItem"];
let v = class extends X {
  constructor() {
    super(...arguments), ie(this, n), this._rules = [], this._collapsed = /* @__PURE__ */ new Set();
  }
  firstUpdated() {
    if (this.data?.existingRules?.rules?.length) {
      const e = JSON.parse(JSON.stringify(this.data.existingRules.rules));
      this._rules = e.map((t) => {
        const [i, o] = I(t.action, t.format);
        return { ...t, action: i, format: o };
      });
    }
  }
  render() {
    const e = a(this, n, y).call(this), t = /* @__PURE__ */ new Map();
    for (const [i, o] of e) {
      const s = p(this, n, h).find((c) => c.id === i);
      if (s) {
        const c = t.get(o) ?? [];
        c.push(s), t.set(o, c);
      }
    }
    return r`
			<umb-body-layout headline="Edit Sections: ${p(this, n, z)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${p(this, n, h).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${p(this, n, h).length - e.size} unmatched</span>
					</div>

					${this._rules.map((i, o) => a(this, n, J).call(this, i, o, t.get(o) ?? []))}

					<uui-button
						look="placeholder"
						label="Add rule"
						@click=${a(this, n, E)}>
						+ Add another rule
					</uui-button>

					${a(this, n, j).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${a(this, n, U)}>Close</uui-button>
					<uui-button
						label="Save"
						look="primary"
						color="positive"
						@click=${a(this, n, D)}>
						Save
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
u = function(e, t) {
  return this._collapsed.has(`${e}-${t}`);
};
f = function(e, t) {
  const i = `${e}-${t}`, o = new Set(this._collapsed);
  o.has(i) ? o.delete(i) : o.add(i), this._collapsed = o;
};
h = function() {
  return this.data?.elements ?? [];
};
z = function() {
  return this.data?.sectionHeading ?? "Section";
};
y = function() {
  const e = /* @__PURE__ */ new Map(), t = p(this, n, h);
  for (let i = 0; i < this._rules.length; i++) {
    const o = this._rules[i];
    if (o.conditions.length !== 0)
      for (let s = 0; s < t.length; s++) {
        const c = t[s];
        e.has(c.id) || a(this, n, w).call(this, c, o.conditions, s, t.length) && e.set(c.id, i);
      }
  }
  return e;
};
w = function(e, t, i, o) {
  return t.every((s) => a(this, n, C).call(this, e, s, i, o));
};
C = function(e, t, i, o) {
  const s = String(t.value ?? ""), c = Number(t.value);
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
      return !isNaN(c) && Math.abs(e.fontSize - c) < 0.5;
    case "fontSizeAbove":
      return !isNaN(c) && e.fontSize > c;
    case "fontSizeBelow":
      return !isNaN(c) && e.fontSize < c;
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
S = function(e, t, i) {
  const o = [];
  o.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName && o.push({ type: "fontNameContains", value: e.fontName }), e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && o.push({ type: "colorEquals", value: e.color });
  const s = e.text.indexOf(":");
  return s > 0 && s < 30 && o.push({ type: "textBeginsWith", value: e.text.substring(0, s + 1) }), t === 0 ? o.push({ type: "positionFirst" }) : t === i - 1 && o.push({ type: "positionLast" }), o;
};
E = function() {
  this._rules = [...this._rules, { role: "", action: "sectionTitle", conditions: [] }];
};
L = function(e) {
  this._rules = this._rules.filter((t, i) => i !== e);
};
N = function(e, t) {
  const i = a(this, n, S).call(this, e, t, p(this, n, h).length), o = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "");
  this._rules = [...this._rules, { role: o, action: "sectionTitle", conditions: i }];
};
k = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], role: t }, this._rules = i;
};
A = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], action: t, format: i[e].format ?? "paragraph" }, this._rules = i;
};
T = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], format: t }, this._rules = i;
};
R = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.conditions = [...i.conditions, { type: "textBeginsWith", value: "" }], t[e] = i, this._rules = t;
};
q = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.conditions = o.conditions.filter((s, c) => c !== t), i[e] = o, this._rules = i;
};
M = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions], s.conditions[t] = {
    type: i,
    value: m.includes(i) ? void 0 : s.conditions[t].value
  }, o[e] = s, this._rules = o;
};
O = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions];
  const c = s.conditions[t], d = c.type === "fontSizeEquals" || c.type === "fontSizeAbove" || c.type === "fontSizeBelow";
  s.conditions[t] = { ...c, value: d && !isNaN(Number(i)) ? Number(i) : i }, o[e] = s, this._rules = o;
};
F = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.exceptions = [...i.exceptions ?? [], { type: "textContains", value: "" }], t[e] = i, this._rules = t;
};
B = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.exceptions = (o.exceptions ?? []).filter((s, c) => c !== t), i[e] = o, this._rules = i;
};
P = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.exceptions = [...s.exceptions ?? []], s.exceptions[t] = {
    type: i,
    value: m.includes(i) ? void 0 : s.exceptions[t].value
  }, o[e] = s, this._rules = o;
};
W = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.exceptions = [...s.exceptions ?? []];
  const c = s.exceptions[t], d = c.type === "fontSizeEquals" || c.type === "fontSizeAbove" || c.type === "fontSizeBelow";
  s.exceptions[t] = { ...c, value: d && !isNaN(Number(i)) ? Number(i) : i }, o[e] = s, this._rules = o;
};
D = function() {
  this.value = { rules: { rules: this._rules } }, this.modalContext?.submit();
};
U = function() {
  this.modalContext?.reject();
};
V = function(e, t, i) {
  const o = m.includes(i.type);
  return r`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(s) => a(this, n, M).call(this, e, t, s.target.value)}>
					${Y.map((s) => r`
						<option value=${s} ?selected=${s === i.type}>${G[s]}</option>
					`)}
				</select>
				${o ? l : r`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(s) => a(this, n, O).call(this, e, t, s.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => a(this, n, q).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
H = function(e, t, i) {
  const o = m.includes(i.type);
  return r`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(s) => a(this, n, P).call(this, e, t, s.target.value)}>
					${Y.map((s) => r`
						<option value=${s} ?selected=${s === i.type}>${G[s]}</option>
					`)}
				</select>
				${o ? l : r`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(s) => a(this, n, W).call(this, e, t, s.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => a(this, n, B).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
J = function(e, t, i) {
  return r`
			<div class="rule-card">
				<div class="rule-header">
					<span class="rule-number">${t + 1}</span>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(o) => a(this, n, k).call(this, t, o.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => a(this, n, L).call(this, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => a(this, n, f).call(this, "conditions", t)}>
						<uui-icon name=${a(this, n, u).call(this, "conditions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${a(this, n, u).call(this, "conditions", t) ? l : r`
						${e.conditions.map((o, s) => a(this, n, V).call(this, t, s, o))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => a(this, n, R).call(this, t)}>
							+ Add condition
						</uui-button>
					`}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => a(this, n, f).call(this, "exceptions", t)}>
						<uui-icon name=${a(this, n, u).call(this, "exceptions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${a(this, n, u).call(this, "exceptions", t) ? l : r`
						${(e.exceptions ?? []).map((o, s) => a(this, n, H).call(this, t, s, o))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => a(this, n, F).call(this, t)}>
							+ Add exception
						</uui-button>
					`}
				</div>

				<div class="action-area">
					<div class="section-header collapsible" @click=${() => a(this, n, f).call(this, "action", t)}>
						<uui-icon name=${a(this, n, u).call(this, "action", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Action
					</div>
					${a(this, n, u).call(this, "action", t) ? l : r`
						<select
							class="action-select"
							.value=${e.action ?? "sectionTitle"}
							@change=${(o) => a(this, n, A).call(this, t, o.target.value)}>
							${se.map((o) => r`
								<option value=${o} ?selected=${o === (e.action ?? "sectionTitle")}>${oe[o]}</option>
							`)}
						</select>
					`}
				</div>

				<div class="format-area">
					<div class="section-header collapsible" @click=${() => a(this, n, f).call(this, "format", t)}>
						<uui-icon name=${a(this, n, u).call(this, "format", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Format
					</div>
					${a(this, n, u).call(this, "format", t) ? l : r`
						<select
							class="action-select"
							.value=${e.format ?? "paragraph"}
							@change=${(o) => a(this, n, T).call(this, t, o.target.value)}>
							${ae.map((o) => r`
								<option value=${o} ?selected=${o === (e.format ?? "paragraph")}>${ne[o]}</option>
							`)}
						</select>
					`}
				</div>

				<div class="match-preview ${i.length > 0 ? "matched" : "no-match"}">
					${i.length > 0 ? r`<uui-icon name="icon-check"></uui-icon> Matched <strong>${i.length}&times;</strong>${i.length <= 5 ? r`: ${i.map((o, s) => r`${s > 0 ? r`, ` : l}<strong>${a(this, n, b).call(this, o.text, 40)}</strong>`)}` : l}` : r`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
b = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
j = function(e) {
  const t = p(this, n, h), i = t.filter((o) => !e.has(o.id));
  return i.length === 0 ? l : r`
			<div class="unmatched-section">
				<h4>Unmatched elements (${i.length})</h4>
				${i.map((o) => {
    const s = t.indexOf(o);
    return r`
						<div class="unmatched-element">
							<div class="unmatched-text">${a(this, n, b).call(this, o.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${o.fontSize}pt</span>
								<span class="meta-badge">${o.fontName}</span>
								${o.color !== "#000000" ? r`<span class="meta-badge" style="border-left: 3px solid ${o.color};">${o.color}</span>` : l}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => a(this, n, N).call(this, o, s)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
v.styles = [
  Z,
  K`
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

			/* Action area */
			.action-area {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
			}

			/* Format area */
			.format-area {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
			}

			.action-select {
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.action-select:focus {
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
g([
  _()
], v.prototype, "_rules", 2);
g([
  _()
], v.prototype, "_collapsed", 2);
v = g([
  Q("up-doc-section-rules-editor-modal")
], v);
const ue = v;
export {
  v as UpDocSectionRulesEditorModalElement,
  ue as default
};
//# sourceMappingURL=section-rules-editor-modal.element-CPNZ1fKu.js.map
