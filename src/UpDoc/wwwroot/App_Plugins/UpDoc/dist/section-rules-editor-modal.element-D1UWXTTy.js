import { html as c, nothing as l, css as I, state as _, customElement as ee } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as te } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as ie } from "@umbraco-cms/backoffice/style";
function oe(e, t) {
  switch (e) {
    case "createSection":
    case "setAsHeading":
      return ["sectionTitle", void 0];
    case "addAsContent":
      return ["sectionContent", t ?? "paragraph"];
    case "addAsList":
      return ["sectionContent", t ?? "bulletListItem"];
    case "singleProperty":
    case "sectionProperty":
      return ["singleProperty", t ?? "paragraph"];
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
var se = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, $ = (e) => {
  throw TypeError(e);
}, g = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? ae(t, i) : t, n = e.length - 1, d; n >= 0; n--)
    (d = e[n]) && (s = (o ? d(t, i, s) : d(s)) || s);
  return o && s && se(t, i, s), s;
}, y = (e, t, i) => t.has(e) || $("Cannot " + i), p = (e, t, i) => (y(e, t, "read from private field"), i ? i.call(e) : t.get(e)), ne = (e, t, i) => t.has(e) ? $("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), r = (e, t, i) => (y(e, t, "access private method"), i), a, u, f, h, x, z, w, S, C, k, E, L, A, N, T, R, F, O, M, B, q, P, D, W, V, H, U, Y, J, K, j, G, b, Q;
const X = {
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
}, m = ["positionFirst", "positionLast"], Z = [
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
], re = {
  singleProperty: "Single Property",
  sectionTitle: "Section Title",
  sectionContent: "Section Content",
  sectionDescription: "Section Description",
  sectionSummary: "Section Summary",
  exclude: "Exclude"
}, ce = ["singleProperty", "sectionTitle", "sectionContent", "sectionDescription", "sectionSummary", "exclude"], le = {
  block: "Block",
  style: "Style"
}, ue = ["block", "style"], de = {
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
}, pe = [
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
], he = {
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  code: "Code",
  highlight: "Highlight"
}, ve = ["bold", "italic", "strikethrough", "code", "highlight"];
let v = class extends te {
  constructor() {
    super(...arguments), ne(this, a), this._rules = [], this._collapsed = /* @__PURE__ */ new Set();
  }
  firstUpdated() {
    if (this.data?.existingRules?.rules?.length) {
      const e = JSON.parse(JSON.stringify(this.data.existingRules.rules));
      this._rules = e.map((t) => {
        const [i, o] = oe(t.action, t.format);
        let s = t.formats;
        return (!s || s.length === 0) && (s = [{ type: "block", value: o ?? "paragraph" }]), { ...t, action: i, format: o, formats: s };
      });
    }
  }
  render() {
    const e = r(this, a, z).call(this), t = /* @__PURE__ */ new Map();
    for (const [i, o] of e) {
      const s = p(this, a, h).find((n) => n.id === i);
      if (s) {
        const n = t.get(o) ?? [];
        n.push(s), t.set(o, n);
      }
    }
    return c`
			<umb-body-layout headline="Edit Sections: ${p(this, a, x)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${p(this, a, h).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${p(this, a, h).length - e.size} unmatched</span>
					</div>

					${this._rules.map((i, o) => r(this, a, G).call(this, i, o, t.get(o) ?? []))}

					<uui-button
						look="placeholder"
						label="Add rule"
						@click=${r(this, a, k)}>
						+ Add another rule
					</uui-button>

					${r(this, a, Q).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${r(this, a, Y)}>Close</uui-button>
					<uui-button
						label="Save"
						look="primary"
						color="positive"
						@click=${r(this, a, U)}>
						Save
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
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
x = function() {
  return this.data?.sectionHeading ?? "Section";
};
z = function() {
  const e = /* @__PURE__ */ new Map(), t = p(this, a, h);
  for (let i = 0; i < this._rules.length; i++) {
    const o = this._rules[i];
    if (o.conditions.length !== 0)
      for (let s = 0; s < t.length; s++) {
        const n = t[s];
        e.has(n.id) || r(this, a, w).call(this, n, o.conditions, s, t.length) && e.set(n.id, i);
      }
  }
  return e;
};
w = function(e, t, i, o) {
  return t.every((s) => r(this, a, S).call(this, e, s, i, o));
};
S = function(e, t, i, o) {
  const s = String(t.value ?? ""), n = Number(t.value);
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
      return !isNaN(n) && Math.abs(e.fontSize - n) < 0.5;
    case "fontSizeAbove":
      return !isNaN(n) && e.fontSize > n;
    case "fontSizeBelow":
      return !isNaN(n) && e.fontSize < n;
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
C = function(e, t, i) {
  const o = [];
  o.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName && o.push({ type: "fontNameContains", value: e.fontName }), e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && o.push({ type: "colorEquals", value: e.color });
  const s = e.text.indexOf(":");
  return s > 0 && s < 30 && o.push({ type: "textBeginsWith", value: e.text.substring(0, s + 1) }), t === 0 ? o.push({ type: "positionFirst" }) : t === i - 1 && o.push({ type: "positionLast" }), o;
};
k = function() {
  this._rules = [...this._rules, {
    role: "",
    action: "sectionTitle",
    conditions: [],
    formats: [{ type: "block", value: "paragraph" }]
  }];
};
E = function(e) {
  this._rules = this._rules.filter((t, i) => i !== e);
};
L = function(e, t) {
  const i = r(this, a, C).call(this, e, t, p(this, a, h).length), o = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "");
  this._rules = [...this._rules, {
    role: o,
    action: "sectionTitle",
    conditions: i,
    formats: [{ type: "block", value: "paragraph" }]
  }];
};
A = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], role: t }, this._rules = i;
};
N = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], action: t, format: i[e].format ?? "paragraph" }, this._rules = i;
};
T = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.formats = [...i.formats ?? [], { type: "block", value: "paragraph" }], t[e] = i, this._rules = t;
};
R = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.formats = (o.formats ?? []).filter((s, n) => n !== t), i[e] = o, this._rules = i;
};
F = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.formats = [...s.formats ?? []];
  const n = i === "block" ? "paragraph" : "bold";
  s.formats[t] = { type: i, value: n }, o[e] = s, this._rules = o;
};
O = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.formats = [...s.formats ?? []], s.formats[t] = { ...s.formats[t], value: i }, o[e] = s, this._rules = o;
};
M = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.conditions = [...i.conditions, { type: "textBeginsWith", value: "" }], t[e] = i, this._rules = t;
};
B = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.conditions = o.conditions.filter((s, n) => n !== t), i[e] = o, this._rules = i;
};
q = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions], s.conditions[t] = {
    type: i,
    value: m.includes(i) ? void 0 : s.conditions[t].value
  }, o[e] = s, this._rules = o;
};
P = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions];
  const n = s.conditions[t], d = n.type === "fontSizeEquals" || n.type === "fontSizeAbove" || n.type === "fontSizeBelow";
  s.conditions[t] = { ...n, value: d && !isNaN(Number(i)) ? Number(i) : i }, o[e] = s, this._rules = o;
};
D = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.exceptions = [...i.exceptions ?? [], { type: "textContains", value: "" }], t[e] = i, this._rules = t;
};
W = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.exceptions = (o.exceptions ?? []).filter((s, n) => n !== t), i[e] = o, this._rules = i;
};
V = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.exceptions = [...s.exceptions ?? []], s.exceptions[t] = {
    type: i,
    value: m.includes(i) ? void 0 : s.exceptions[t].value
  }, o[e] = s, this._rules = o;
};
H = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.exceptions = [...s.exceptions ?? []];
  const n = s.exceptions[t], d = n.type === "fontSizeEquals" || n.type === "fontSizeAbove" || n.type === "fontSizeBelow";
  s.exceptions[t] = { ...n, value: d && !isNaN(Number(i)) ? Number(i) : i }, o[e] = s, this._rules = o;
};
U = function() {
  const e = this._rules.map((t) => {
    const i = (t.formats ?? []).find((o) => o.type === "block");
    return {
      ...t,
      format: i?.value ?? "paragraph"
    };
  });
  this.value = { rules: { rules: e } }, this.modalContext?.submit();
};
Y = function() {
  this.modalContext?.reject();
};
J = function(e, t, i) {
  const o = m.includes(i.type);
  return c`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(s) => r(this, a, q).call(this, e, t, s.target.value)}>
					${Z.map((s) => c`
						<option value=${s} ?selected=${s === i.type}>${X[s]}</option>
					`)}
				</select>
				${o ? l : c`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(s) => r(this, a, P).call(this, e, t, s.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => r(this, a, B).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
K = function(e, t, i) {
  const o = m.includes(i.type);
  return c`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(s) => r(this, a, V).call(this, e, t, s.target.value)}>
					${Z.map((s) => c`
						<option value=${s} ?selected=${s === i.type}>${X[s]}</option>
					`)}
				</select>
				${o ? l : c`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(s) => r(this, a, H).call(this, e, t, s.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => r(this, a, W).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
j = function(e, t, i) {
  const o = i.type === "block" ? pe : ve, s = i.type === "block" ? de : he;
  return c`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${i.type}
					@change=${(n) => r(this, a, F).call(this, e, t, n.target.value)}>
					${ue.map((n) => c`
						<option value=${n} ?selected=${n === i.type}>${le[n]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${i.value}
					@change=${(n) => r(this, a, O).call(this, e, t, n.target.value)}>
					${o.map((n) => c`
						<option value=${n} ?selected=${n === i.value}>${s[n]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => r(this, a, R).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
G = function(e, t, i) {
  return c`
			<div class="rule-card">
				<div class="rule-header">
					<span class="rule-number">${t + 1}</span>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(o) => r(this, a, A).call(this, t, o.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => r(this, a, E).call(this, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => r(this, a, f).call(this, "conditions", t)}>
						<uui-icon name=${r(this, a, u).call(this, "conditions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${r(this, a, u).call(this, "conditions", t) ? l : c`
						${e.conditions.map((o, s) => r(this, a, J).call(this, t, s, o))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => r(this, a, M).call(this, t)}>
							+ Add condition
						</uui-button>
					`}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => r(this, a, f).call(this, "exceptions", t)}>
						<uui-icon name=${r(this, a, u).call(this, "exceptions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${r(this, a, u).call(this, "exceptions", t) ? l : c`
						${(e.exceptions ?? []).map((o, s) => r(this, a, K).call(this, t, s, o))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => r(this, a, D).call(this, t)}>
							+ Add exception
						</uui-button>
					`}
				</div>

				<div class="action-area">
					<div class="section-header collapsible" @click=${() => r(this, a, f).call(this, "action", t)}>
						<uui-icon name=${r(this, a, u).call(this, "action", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Action
					</div>
					${r(this, a, u).call(this, "action", t) ? l : c`
						<select
							class="action-select"
							.value=${e.action ?? "sectionTitle"}
							@change=${(o) => r(this, a, N).call(this, t, o.target.value)}>
							${ce.map((o) => c`
								<option value=${o} ?selected=${o === (e.action ?? "sectionTitle")}>${re[o]}</option>
							`)}
						</select>
					`}
				</div>

				${e.action !== "exclude" ? c`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => r(this, a, f).call(this, "format", t)}>
						<uui-icon name=${r(this, a, u).call(this, "format", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Format${(e.formats ?? []).length > 0 ? ` (${(e.formats ?? []).length})` : ""}
					</div>
					${r(this, a, u).call(this, "format", t) ? l : c`
						${(e.formats ?? []).map((o, s) => r(this, a, j).call(this, t, s, o))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => r(this, a, T).call(this, t)}>
							+ Add format
						</uui-button>
					`}
				</div>
				` : l}

				<div class="match-preview ${i.length > 0 ? e.action === "exclude" ? "excluded" : "matched" : "no-match"}">
					${i.length > 0 ? c`<uui-icon name=${e.action === "exclude" ? "icon-block" : "icon-check"}></uui-icon> ${e.action === "exclude" ? "Excluded" : "Matched"} <strong>${i.length}&times;</strong>${i.length <= 5 ? c`: ${i.map((o, s) => c`${s > 0 ? c`, ` : l}<strong>${r(this, a, b).call(this, o.text, 40)}</strong>`)}` : l}` : c`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
b = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
Q = function(e) {
  const t = p(this, a, h), i = t.filter((o) => !e.has(o.id));
  return i.length === 0 ? l : c`
			<div class="unmatched-section">
				<h4>Unmatched elements (${i.length})</h4>
				${i.map((o) => {
    const s = t.indexOf(o);
    return c`
						<div class="unmatched-element">
							<div class="unmatched-text">${r(this, a, b).call(this, o.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${o.fontSize}pt</span>
								<span class="meta-badge">${o.fontName}</span>
								${o.color !== "#000000" ? c`<span class="meta-badge" style="border-left: 3px solid ${o.color};">${o.color}</span>` : l}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => r(this, a, L).call(this, o, s)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
v.styles = [
  ie,
  I`
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
  ee("up-doc-section-rules-editor-modal")
], v);
const be = v;
export {
  v as UpDocSectionRulesEditorModalElement,
  be as default
};
//# sourceMappingURL=section-rules-editor-modal.element-D1UWXTTy.js.map
