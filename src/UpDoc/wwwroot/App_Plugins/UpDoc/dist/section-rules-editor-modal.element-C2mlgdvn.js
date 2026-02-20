import { nothing as c, html as l, css as $e, state as m, customElement as ye } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as ze } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as we } from "@umbraco-cms/backoffice/style";
function ke(e) {
  if (e.exclude) return "exclude";
  if (e.part) return e.part;
  switch (e.action) {
    case "singleProperty":
    case "sectionProperty":
    case "sectionContent":
    case "addAsContent":
    case "addAsList":
      return "content";
    case "sectionTitle":
    case "createSection":
    case "setAsHeading":
      return "title";
    case "sectionDescription":
      return "description";
    case "sectionSummary":
      return "summary";
    case "exclude":
      return "exclude";
    default:
      return "content";
  }
}
function Ee(e) {
  return e.format ? e.format : e.action === "addAsList" ? "bulletListItem" : "auto";
}
var Se = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, T = (e) => {
  throw TypeError(e);
}, g = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? Ce(t, i) : t, n = e.length - 1, u; n >= 0; n--)
    (u = e[n]) && (a = (o ? u(t, i, a) : u(a)) || a);
  return o && a && Se(t, i, a), a;
}, F = (e, t, i) => t.has(e) || T("Cannot " + i), v = (e, t, i) => (F(e, t, "read from private field"), i ? i.call(e) : t.get(e)), Ne = (e, t, i) => t.has(e) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), r = (e, t, i) => (F(e, t, "access private method"), i), s, h, b, P, _, C, z, f, V, M, G, B, N, q, w, R, D, U, W, H, Y, K, x, k, Q, j, J, X, Z, I, ee, te, ie, oe, ae, se, re, ne, E, L, ue, le, ce, de, pe, he, S, ve, fe, A, ge, me;
let Re = 0;
function O() {
  return `r-${++Re}`;
}
const be = {
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
}, $ = ["positionFirst", "positionLast"], _e = [
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
], xe = {
  title: "Title",
  content: "Content",
  description: "Description",
  summary: "Summary"
}, Le = ["title", "content", "description", "summary"], Ae = {
  block: "Block",
  style: "Style"
}, Oe = ["block", "style"], Te = {
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
}, Fe = [
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
], Pe = {
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  code: "Code",
  highlight: "Highlight"
}, Ve = ["bold", "italic", "strikethrough", "code", "highlight"];
let p = class extends ze {
  constructor() {
    super(...arguments), Ne(this, s), this._rules = [], this._groupOrder = [], this._collapsed = /* @__PURE__ */ new Set(), this._expandedRules = /* @__PURE__ */ new Set(), this._renamingGroup = null, this._renameValue = "";
  }
  firstUpdated() {
    const e = this.data?.existingRules;
    if (!e) return;
    const t = [], i = [];
    for (const o of e.groups ?? []) {
      i.push(o.name);
      for (const a of o.rules)
        t.push(r(this, s, z).call(this, a, o.name));
    }
    for (const o of e.rules ?? [])
      t.push(r(this, s, z).call(this, o, null));
    this._rules = t, this._groupOrder = i;
  }
  render() {
    const e = r(this, s, G).call(this), t = /* @__PURE__ */ new Map();
    for (const [o, a] of e) {
      const n = v(this, s, f).find((u) => u.id === o);
      if (n) {
        const u = t.get(a) ?? [];
        u.push(n), t.set(a, u);
      }
    }
    const i = v(this, s, M);
    return l`
			<umb-body-layout headline="Edit Sections: ${v(this, s, V)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${v(this, s, f).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${v(this, s, f).length - e.size} unmatched</span>
						${this._groupOrder.length > 0 ? l`<span class="meta-badge">${this._groupOrder.length} group${this._groupOrder.length !== 1 ? "s" : ""}</span>` : c}
					</div>

					${i.map((o) => o.group !== null ? l`
								<div class="group-container">
									${r(this, s, ge).call(this, o.group)}
									<div class="group-rules">
										${o.rules.map(
      ({ rule: a, flatIndex: n }) => r(this, s, S).call(this, a, n, t.get(n) ?? [])
    )}
										<uui-button
											look="placeholder"
											label="Add rule to ${o.group}"
											@click=${() => r(this, s, w).call(this, o.group)}>
											+ Add rule
										</uui-button>
									</div>
								</div>
							` : l`
							${this._groupOrder.length > 0 ? l`
								<div class="ungrouped-label">Ungrouped</div>
							` : c}
							${o.rules.map(
      ({ rule: a, flatIndex: n }) => r(this, s, S).call(this, a, n, t.get(n) ?? [])
    )}
							<uui-button
								look="placeholder"
								label="Add rule"
								@click=${() => r(this, s, w).call(this, null)}>
								+ Add rule
							</uui-button>
						`)}

					<uui-button
						look="outline"
						label="Add group"
						@click=${() => r(this, s, Y).call(this)}>
						<uui-icon name="icon-add"></uui-icon>
						Add group
					</uui-button>

					${r(this, s, me).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${r(this, s, ce)}>Close</uui-button>
					<uui-button
						label="Save"
						look="secondary"
						@click=${r(this, s, ue)}>
						Save
					</uui-button>
					<uui-button
						label="Save and Close"
						look="primary"
						color="positive"
						@click=${r(this, s, le)}>
						Save and Close
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
s = /* @__PURE__ */ new WeakSet();
h = function(e, t) {
  return this._collapsed.has(`${e}-${t}`);
};
b = function(e, t) {
  const i = `${e}-${t}`, o = new Set(this._collapsed);
  o.has(i) ? o.delete(i) : o.add(i), this._collapsed = o;
};
P = function(e) {
  return this._expandedRules.has(e);
};
_ = function(e) {
  const t = new Set(this._expandedRules);
  t.has(e) ? t.delete(e) : t.add(e), this._expandedRules = t;
};
C = function(e) {
  if (!this._expandedRules.has(e)) {
    const t = new Set(this._expandedRules);
    t.add(e), this._expandedRules = t;
  }
};
z = function(e, t) {
  let i = e.part, o = e.exclude ?? !1;
  if (!i && !o) {
    const n = ke(e);
    n === "exclude" ? o = !0 : i = n;
  }
  let a = e.formats;
  return (!a || a.length === 0) && (a = [{ type: "block", value: e.format ?? Ee(e) }]), {
    ...e,
    part: i,
    exclude: o,
    formats: a,
    _id: O(),
    _groupName: t
  };
};
f = function() {
  return this.data?.elements ?? [];
};
V = function() {
  return this.data?.sectionHeading ?? "Section";
};
M = function() {
  const e = [];
  for (const i of this._groupOrder) {
    const o = [];
    this._rules.forEach((a, n) => {
      a._groupName === i && o.push({ rule: a, flatIndex: n });
    }), e.push({ group: i, rules: o });
  }
  const t = [];
  return this._rules.forEach((i, o) => {
    i._groupName === null && t.push({ rule: i, flatIndex: o });
  }), e.push({ group: null, rules: t }), e;
};
G = function() {
  const e = /* @__PURE__ */ new Map(), t = v(this, s, f);
  for (let i = 0; i < this._rules.length; i++) {
    const o = this._rules[i];
    if (o.conditions.length !== 0)
      for (let a = 0; a < t.length; a++) {
        const n = t[a];
        if (!e.has(n.id) && r(this, s, B).call(this, n, o.conditions, a, t.length)) {
          if (o.exceptions?.length && o.exceptions.some(
            (d) => r(this, s, N).call(this, n, d, a, t.length)
          ))
            continue;
          e.set(n.id, i);
        }
      }
  }
  return e;
};
B = function(e, t, i, o) {
  return t.every((a) => r(this, s, N).call(this, e, a, i, o));
};
N = function(e, t, i, o) {
  const a = String(t.value ?? ""), n = Number(t.value);
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
      return !isNaN(n) && Math.abs(e.fontSize - n) < 0.5;
    case "fontSizeAbove":
      return !isNaN(n) && e.fontSize > n;
    case "fontSizeBelow":
      return !isNaN(n) && e.fontSize < n;
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
q = function(e, t, i) {
  const o = [];
  o.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName && o.push({ type: "fontNameContains", value: e.fontName }), e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && o.push({ type: "colorEquals", value: e.color });
  const a = e.text.indexOf(":");
  return a > 0 && a < 30 && o.push({ type: "textBeginsWith", value: e.text.substring(0, a + 1) }), t === 0 ? o.push({ type: "positionFirst" }) : t === i - 1 && o.push({ type: "positionLast" }), o;
};
w = function(e = null) {
  const t = O();
  this._rules = [...this._rules, {
    role: "",
    part: "content",
    conditions: [],
    formats: [{ type: "block", value: "auto" }],
    _id: t,
    _groupName: e
  }], r(this, s, C).call(this, t);
};
R = function(e) {
  this._rules = this._rules.filter((t, i) => i !== e);
};
D = function(e, t) {
  const i = r(this, s, q).call(this, e, t, v(this, s, f).length), o = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, ""), a = O();
  this._rules = [...this._rules, {
    role: o,
    part: "content",
    conditions: i,
    formats: [{ type: "block", value: "auto" }],
    _id: a,
    _groupName: null
  }], r(this, s, C).call(this, a);
};
U = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], role: t }, this._rules = i;
};
W = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], part: t }, this._rules = i;
};
H = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], exclude: t }, this._rules = i;
};
Y = function() {
  let e = "New Group", t = 1;
  for (; this._groupOrder.includes(e); )
    e = `New Group ${++t}`;
  this._groupOrder = [...this._groupOrder, e], this._renamingGroup = e, this._renameValue = e;
};
K = function(e) {
  this._renamingGroup = e, this._renameValue = e;
};
x = function() {
  if (!this._renamingGroup || !this._renameValue.trim()) return;
  const e = this._renamingGroup, t = this._renameValue.trim();
  e !== t && (this._groupOrder = this._groupOrder.map((i) => i === e ? t : i), this._rules = this._rules.map(
    (i) => i._groupName === e ? { ...i, _groupName: t } : i
  )), this._renamingGroup = null, this._renameValue = "";
};
k = function() {
  this._renamingGroup = null, this._renameValue = "";
};
Q = function(e) {
  this._rules = this._rules.map(
    (t) => t._groupName === e ? { ...t, _groupName: null } : t
  ), this._groupOrder = this._groupOrder.filter((t) => t !== e);
};
j = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], _groupName: t }, this._rules = i;
};
J = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.formats = [...i.formats ?? [], { type: "block", value: "auto" }], t[e] = i, this._rules = t;
};
X = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.formats = (o.formats ?? []).filter((a, n) => n !== t), i[e] = o, this._rules = i;
};
Z = function(e, t, i) {
  const o = [...this._rules], a = { ...o[e] };
  a.formats = [...a.formats ?? []];
  const n = i === "block" ? "auto" : "bold";
  a.formats[t] = { type: i, value: n }, o[e] = a, this._rules = o;
};
I = function(e, t, i) {
  const o = [...this._rules], a = { ...o[e] };
  a.formats = [...a.formats ?? []], a.formats[t] = { ...a.formats[t], value: i }, o[e] = a, this._rules = o;
};
ee = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.conditions = [...i.conditions, { type: "textBeginsWith", value: "" }], t[e] = i, this._rules = t;
};
te = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.conditions = o.conditions.filter((a, n) => n !== t), i[e] = o, this._rules = i;
};
ie = function(e, t, i) {
  const o = [...this._rules], a = { ...o[e] };
  a.conditions = [...a.conditions], a.conditions[t] = {
    type: i,
    value: $.includes(i) ? void 0 : a.conditions[t].value
  }, o[e] = a, this._rules = o;
};
oe = function(e, t, i) {
  const o = [...this._rules], a = { ...o[e] };
  a.conditions = [...a.conditions];
  const n = a.conditions[t], u = n.type === "fontSizeEquals" || n.type === "fontSizeAbove" || n.type === "fontSizeBelow";
  a.conditions[t] = { ...n, value: u && !isNaN(Number(i)) ? Number(i) : i }, o[e] = a, this._rules = o;
};
ae = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.exceptions = [...i.exceptions ?? [], { type: "textContains", value: "" }], t[e] = i, this._rules = t;
};
se = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.exceptions = (o.exceptions ?? []).filter((a, n) => n !== t), i[e] = o, this._rules = i;
};
re = function(e, t, i) {
  const o = [...this._rules], a = { ...o[e] };
  a.exceptions = [...a.exceptions ?? []], a.exceptions[t] = {
    type: i,
    value: $.includes(i) ? void 0 : a.exceptions[t].value
  }, o[e] = a, this._rules = o;
};
ne = function(e, t, i) {
  const o = [...this._rules], a = { ...o[e] };
  a.exceptions = [...a.exceptions ?? []];
  const n = a.exceptions[t], u = n.type === "fontSizeEquals" || n.type === "fontSizeAbove" || n.type === "fontSizeBelow";
  a.exceptions[t] = { ...n, value: u && !isNaN(Number(i)) ? Number(i) : i }, o[e] = a, this._rules = o;
};
E = function(e) {
  const t = (e.formats ?? []).find((u) => u.type === "block"), { _id: i, _groupName: o, action: a, ...n } = e;
  return {
    ...n,
    format: t?.value ?? "auto"
  };
};
L = function() {
  this._renamingGroup && r(this, s, x).call(this);
  const e = [];
  for (const i of this._groupOrder) {
    const o = this._rules.filter((a) => a._groupName === i).map((a) => r(this, s, E).call(this, a));
    e.push({ name: i, rules: o });
  }
  const t = this._rules.filter((i) => i._groupName === null).map((i) => r(this, s, E).call(this, i));
  return { groups: e, rules: t };
};
ue = async function() {
  const e = r(this, s, L).call(this);
  this.data?.onSave && await this.data.onSave(e);
};
le = function() {
  const e = r(this, s, L).call(this);
  this.value = { rules: e }, this.modalContext?.submit();
};
ce = function() {
  this.modalContext?.reject();
};
de = function(e, t, i) {
  const o = $.includes(i.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(a) => r(this, s, ie).call(this, e, t, a.target.value)}>
					${_e.map((a) => l`
						<option value=${a} ?selected=${a === i.type}>${be[a]}</option>
					`)}
				</select>
				${o ? c : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(a) => r(this, s, oe).call(this, e, t, a.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => r(this, s, te).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
pe = function(e, t, i) {
  const o = $.includes(i.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(a) => r(this, s, re).call(this, e, t, a.target.value)}>
					${_e.map((a) => l`
						<option value=${a} ?selected=${a === i.type}>${be[a]}</option>
					`)}
				</select>
				${o ? c : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(a) => r(this, s, ne).call(this, e, t, a.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => r(this, s, se).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
he = function(e, t, i) {
  const o = i.type === "block" ? Fe : Ve, a = i.type === "block" ? Te : Pe;
  return l`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${i.type}
					@change=${(n) => r(this, s, Z).call(this, e, t, n.target.value)}>
					${Oe.map((n) => l`
						<option value=${n} ?selected=${n === i.type}>${Ae[n]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${i.value}
					@change=${(n) => r(this, s, I).call(this, e, t, n.target.value)}>
					${o.map((n) => l`
						<option value=${n} ?selected=${n === i.value}>${a[n]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => r(this, s, X).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
S = function(e, t, i) {
  return r(this, s, P).call(this, e._id) ? r(this, s, fe).call(this, e, t, i) : r(this, s, ve).call(this, e, t, i);
};
ve = function(e, t, i) {
  const o = e.exclude, a = e.part ?? "content", n = o ? "Exclude" : xe[a] ?? a, u = i.length, d = e.role || "(unnamed rule)";
  return l`
			<div class="rule-row" @click=${() => r(this, s, _).call(this, e._id)}>
				<span class="rule-grip" title="Drag to reorder" @click=${(y) => y.stopPropagation()}>⠿</span>
				<uui-icon class="rule-row-chevron" name="icon-navigation-right"></uui-icon>
				<span class="rule-row-name">${d}</span>
				<span class="rule-row-part ${o ? "excluded" : ""}">${n}</span>
				${u > 0 ? l`<span class="rule-row-match ${o ? "excluded" : "matched"}">${u}&times;</span>` : l`<span class="rule-row-match no-match">0</span>`}
				<uui-action-bar class="rule-row-actions"
					@click=${(y) => y.stopPropagation()}>
					<uui-button pristine look="primary" label="Edit rule"
						@click=${() => r(this, s, _).call(this, e._id)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete rule"
						@click=${() => r(this, s, R).call(this, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
fe = function(e, t, i) {
  const o = e.exclude, a = e.part ?? "content", n = [
    { label: "Ungrouped", value: null },
    ...this._groupOrder.map((u) => ({ label: u, value: u }))
  ];
  return l`
			<div class="rule-card">
				<div class="rule-header">
					<span class="rule-grip disabled" title="Collapse to drag">⠿</span>
					<uui-icon class="rule-row-chevron expanded" name="icon-navigation-down"
						@click=${() => r(this, s, _).call(this, e._id)}
						style="cursor:pointer"></uui-icon>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(u) => r(this, s, U).call(this, t, u.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => r(this, s, R).call(this, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => r(this, s, b).call(this, "conditions", t)}>
						<uui-icon name=${r(this, s, h).call(this, "conditions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${r(this, s, h).call(this, "conditions", t) ? c : l`
						${e.conditions.map((u, d) => r(this, s, de).call(this, t, d, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => r(this, s, ee).call(this, t)}>
							+ Add condition
						</uui-button>
					`}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => r(this, s, b).call(this, "exceptions", t)}>
						<uui-icon name=${r(this, s, h).call(this, "exceptions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${r(this, s, h).call(this, "exceptions", t) ? c : l`
						${(e.exceptions ?? []).map((u, d) => r(this, s, pe).call(this, t, d, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => r(this, s, ae).call(this, t)}>
							+ Add exception
						</uui-button>
					`}
				</div>

				<div class="part-area">
					<div class="section-header collapsible" @click=${() => r(this, s, b).call(this, "part", t)}>
						<uui-icon name=${r(this, s, h).call(this, "part", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Part
					</div>
					${r(this, s, h).call(this, "part", t) ? c : l`
						<div class="part-controls">
							<select
								class="part-select"
								.value=${a}
								?disabled=${o}
								@change=${(u) => r(this, s, W).call(this, t, u.target.value)}>
								${Le.map((u) => l`
									<option value=${u} ?selected=${u === a}>${xe[u]}</option>
								`)}
							</select>
							<label class="exclude-label">
								<input
									type="checkbox"
									.checked=${o}
									@change=${(u) => r(this, s, H).call(this, t, u.target.checked)} />
								Exclude
							</label>
						</div>
						${n.length > 1 ? l`
							<div class="move-to-group">
								<span class="move-label">Group:</span>
								<select
									class="group-select"
									.value=${e._groupName ?? ""}
									@change=${(u) => {
    const d = u.target.value;
    r(this, s, j).call(this, t, d || null);
  }}>
									${n.map((u) => l`
										<option value=${u.value ?? ""} ?selected=${(u.value ?? "") === (e._groupName ?? "")}>${u.label}</option>
									`)}
								</select>
							</div>
						` : c}
					`}
				</div>

				${o ? c : l`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => r(this, s, b).call(this, "format", t)}>
						<uui-icon name=${r(this, s, h).call(this, "format", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Format${(e.formats ?? []).length > 0 ? ` (${(e.formats ?? []).length})` : ""}
					</div>
					${r(this, s, h).call(this, "format", t) ? c : l`
						${(e.formats ?? []).map((u, d) => r(this, s, he).call(this, t, d, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => r(this, s, J).call(this, t)}>
							+ Add format
						</uui-button>
					`}
				</div>
				`}

				<div class="match-preview ${i.length > 0 ? o ? "excluded" : "matched" : "no-match"}">
					${i.length > 0 ? l`<uui-icon name=${o ? "icon-block" : "icon-check"}></uui-icon> ${o ? "Excluded" : "Matched"} <strong>${i.length}&times;</strong>${i.length <= 5 ? l`: ${i.map((u, d) => l`${d > 0 ? l`, ` : c}<strong>${r(this, s, A).call(this, u.text, 40)}</strong>`)}` : c}` : l`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
A = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
ge = function(e) {
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
    t.key === "Enter" && r(this, s, x).call(this), t.key === "Escape" && r(this, s, k).call(this);
  }} />
					<uui-button compact look="primary" label="Confirm" @click=${() => r(this, s, x).call(this)}>
						<uui-icon name="icon-check"></uui-icon>
					</uui-button>
					<uui-button compact look="secondary" label="Cancel" @click=${() => r(this, s, k).call(this)}>
						<uui-icon name="icon-wrong"></uui-icon>
					</uui-button>
				</div>
			` : l`
			<div class="group-header">
				<strong class="group-name">${e}</strong>
				<span class="header-spacer"></span>
				<uui-action-bar class="group-header-actions">
					<uui-button pristine look="primary" label="Rename" @click=${() => r(this, s, K).call(this, e)}>
						<uui-icon name="icon-edit"></uui-icon>
					</uui-button>
					<uui-button pristine look="primary" label="Delete group"
						title="Delete group (rules move to ungrouped)"
						@click=${() => r(this, s, Q).call(this, e)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</uui-action-bar>
			</div>
		`;
};
me = function(e) {
  const t = v(this, s, f), i = t.filter((o) => !e.has(o.id));
  return i.length === 0 ? c : l`
			<div class="unmatched-section">
				<h4>Unmatched elements (${i.length})</h4>
				${i.map((o) => {
    const a = t.indexOf(o);
    return l`
						<div class="unmatched-element">
							<div class="unmatched-text">${r(this, s, A).call(this, o.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${o.fontSize}pt</span>
								<span class="meta-badge">${o.fontName}</span>
								${o.color !== "#000000" ? l`<span class="meta-badge" style="border-left: 3px solid ${o.color};">${o.color}</span>` : c}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => r(this, s, D).call(this, o, a)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
p.styles = [
  we,
  $e`
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

			.rule-grip.disabled {
				cursor: default;
				opacity: 0.3;
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

			/* Part area (replaces old action area) */
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

			.move-to-group {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-1);
			}

			.move-label {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.group-select {
				flex: 1;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.group-select:focus {
				outline: none;
				border-color: var(--uui-color-focus);
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
  m()
], p.prototype, "_rules", 2);
g([
  m()
], p.prototype, "_groupOrder", 2);
g([
  m()
], p.prototype, "_collapsed", 2);
g([
  m()
], p.prototype, "_expandedRules", 2);
g([
  m()
], p.prototype, "_renamingGroup", 2);
g([
  m()
], p.prototype, "_renameValue", 2);
p = g([
  ye("up-doc-section-rules-editor-modal")
], p);
const qe = p;
export {
  p as UpDocSectionRulesEditorModalElement,
  qe as default
};
//# sourceMappingURL=section-rules-editor-modal.element-C2mlgdvn.js.map
