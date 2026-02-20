import { nothing as c, html as l, css as be, state as g, customElement as _e } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as xe } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as $e } from "@umbraco-cms/backoffice/style";
function ze(e) {
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
function ye(e) {
  return e.format ? e.format : e.action === "addAsList" ? "bulletListItem" : "auto";
}
var we = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, L = (e) => {
  throw TypeError(e);
}, m = (e, t, o, i) => {
  for (var a = i > 1 ? void 0 : i ? ke(t, o) : t, r = e.length - 1, u; r >= 0; r--)
    (u = e[r]) && (a = (i ? u(t, o, a) : u(a)) || a);
  return i && a && we(t, o, a), a;
}, A = (e, t, o) => t.has(e) || L("Cannot " + o), v = (e, t, o) => (A(e, t, "read from private field"), o ? o.call(e) : t.get(e)), Ee = (e, t, o) => t.has(e) ? L("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), n = (e, t, o) => (A(e, t, "access private method"), o), s, h, b, O, E, S, $, f, T, F, M, P, C, V, z, G, B, q, D, U, W, H, _, y, Y, K, Q, j, J, X, Z, I, ee, te, oe, ie, ae, se, w, re, ne, ue, le, ce, k, de, pe, N, he, ve;
let Se = 0;
function R() {
  return `r-${++Se}`;
}
const fe = {
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
}, x = ["positionFirst", "positionLast"], me = [
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
], ge = {
  title: "Title",
  content: "Content",
  description: "Description",
  summary: "Summary"
}, Ce = ["title", "content", "description", "summary"], Ne = {
  block: "Block",
  style: "Style"
}, Re = ["block", "style"], Le = {
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
}, Ae = [
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
], Oe = {
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  code: "Code",
  highlight: "Highlight"
}, Te = ["bold", "italic", "strikethrough", "code", "highlight"];
let p = class extends xe {
  constructor() {
    super(...arguments), Ee(this, s), this._rules = [], this._groupOrder = [], this._collapsed = /* @__PURE__ */ new Set(), this._expandedRules = /* @__PURE__ */ new Set(), this._renamingGroup = null, this._renameValue = "";
  }
  firstUpdated() {
    const e = this.data?.existingRules;
    if (!e) return;
    const t = [], o = [];
    for (const i of e.groups ?? []) {
      o.push(i.name);
      for (const a of i.rules)
        t.push(n(this, s, $).call(this, a, i.name));
    }
    for (const i of e.rules ?? [])
      t.push(n(this, s, $).call(this, i, null));
    this._rules = t, this._groupOrder = o;
  }
  render() {
    const e = n(this, s, M).call(this), t = /* @__PURE__ */ new Map();
    for (const [i, a] of e) {
      const r = v(this, s, f).find((u) => u.id === i);
      if (r) {
        const u = t.get(a) ?? [];
        u.push(r), t.set(a, u);
      }
    }
    const o = v(this, s, F);
    return l`
			<umb-body-layout headline="Edit Sections: ${v(this, s, T)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${v(this, s, f).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${v(this, s, f).length - e.size} unmatched</span>
						${this._groupOrder.length > 0 ? l`<span class="meta-badge">${this._groupOrder.length} group${this._groupOrder.length !== 1 ? "s" : ""}</span>` : c}
					</div>

					${o.map((i) => i.group !== null ? l`
								<div class="group-container">
									${n(this, s, he).call(this, i.group)}
									<div class="group-rules">
										${i.rules.map(
      ({ rule: a, flatIndex: r }) => n(this, s, k).call(this, a, r, t.get(r) ?? [])
    )}
										<uui-button
											look="placeholder"
											label="Add rule to ${i.group}"
											@click=${() => n(this, s, z).call(this, i.group)}>
											+ Add rule
										</uui-button>
									</div>
								</div>
							` : l`
							${this._groupOrder.length > 0 ? l`
								<div class="ungrouped-label">Ungrouped</div>
							` : c}
							${i.rules.map(
      ({ rule: a, flatIndex: r }) => n(this, s, k).call(this, a, r, t.get(r) ?? [])
    )}
							<uui-button
								look="placeholder"
								label="Add rule"
								@click=${() => n(this, s, z).call(this, null)}>
								+ Add rule
							</uui-button>
						`)}

					<uui-button
						look="outline"
						label="Add group"
						@click=${() => n(this, s, W).call(this)}>
						<uui-icon name="icon-add"></uui-icon>
						Add group
					</uui-button>

					${n(this, s, ve).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${n(this, s, ne)}>Close</uui-button>
					<uui-button
						label="Save"
						look="primary"
						color="positive"
						@click=${n(this, s, re)}>
						Save
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
  const o = `${e}-${t}`, i = new Set(this._collapsed);
  i.has(o) ? i.delete(o) : i.add(o), this._collapsed = i;
};
O = function(e) {
  return this._expandedRules.has(e);
};
E = function(e) {
  const t = new Set(this._expandedRules);
  t.has(e) ? t.delete(e) : t.add(e), this._expandedRules = t;
};
S = function(e) {
  if (!this._expandedRules.has(e)) {
    const t = new Set(this._expandedRules);
    t.add(e), this._expandedRules = t;
  }
};
$ = function(e, t) {
  let o = e.part, i = e.exclude ?? !1;
  if (!o && !i) {
    const r = ze(e);
    r === "exclude" ? i = !0 : o = r;
  }
  let a = e.formats;
  return (!a || a.length === 0) && (a = [{ type: "block", value: e.format ?? ye(e) }]), {
    ...e,
    part: o,
    exclude: i,
    formats: a,
    _id: R(),
    _groupName: t
  };
};
f = function() {
  return this.data?.elements ?? [];
};
T = function() {
  return this.data?.sectionHeading ?? "Section";
};
F = function() {
  const e = [];
  for (const o of this._groupOrder) {
    const i = [];
    this._rules.forEach((a, r) => {
      a._groupName === o && i.push({ rule: a, flatIndex: r });
    }), e.push({ group: o, rules: i });
  }
  const t = [];
  return this._rules.forEach((o, i) => {
    o._groupName === null && t.push({ rule: o, flatIndex: i });
  }), e.push({ group: null, rules: t }), e;
};
M = function() {
  const e = /* @__PURE__ */ new Map(), t = v(this, s, f);
  for (let o = 0; o < this._rules.length; o++) {
    const i = this._rules[o];
    if (i.conditions.length !== 0)
      for (let a = 0; a < t.length; a++) {
        const r = t[a];
        if (!e.has(r.id) && n(this, s, P).call(this, r, i.conditions, a, t.length)) {
          if (i.exceptions?.length && i.exceptions.some(
            (d) => n(this, s, C).call(this, r, d, a, t.length)
          ))
            continue;
          e.set(r.id, o);
        }
      }
  }
  return e;
};
P = function(e, t, o, i) {
  return t.every((a) => n(this, s, C).call(this, e, a, o, i));
};
C = function(e, t, o, i) {
  const a = String(t.value ?? ""), r = Number(t.value);
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
      return !isNaN(r) && Math.abs(e.fontSize - r) < 0.5;
    case "fontSizeAbove":
      return !isNaN(r) && e.fontSize > r;
    case "fontSizeBelow":
      return !isNaN(r) && e.fontSize < r;
    case "fontNameContains":
      return e.fontName.toLowerCase().includes(a.toLowerCase());
    case "colorEquals":
      return e.color.toLowerCase() === a.toLowerCase();
    case "positionFirst":
      return o === 0;
    case "positionLast":
      return o === i - 1;
    default:
      return !1;
  }
};
V = function(e, t, o) {
  const i = [];
  i.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName && i.push({ type: "fontNameContains", value: e.fontName }), e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && i.push({ type: "colorEquals", value: e.color });
  const a = e.text.indexOf(":");
  return a > 0 && a < 30 && i.push({ type: "textBeginsWith", value: e.text.substring(0, a + 1) }), t === 0 ? i.push({ type: "positionFirst" }) : t === o - 1 && i.push({ type: "positionLast" }), i;
};
z = function(e = null) {
  const t = R();
  this._rules = [...this._rules, {
    role: "",
    part: "content",
    conditions: [],
    formats: [{ type: "block", value: "auto" }],
    _id: t,
    _groupName: e
  }], n(this, s, S).call(this, t);
};
G = function(e) {
  this._rules = this._rules.filter((t, o) => o !== e);
};
B = function(e, t) {
  const o = n(this, s, V).call(this, e, t, v(this, s, f).length), i = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, ""), a = R();
  this._rules = [...this._rules, {
    role: i,
    part: "content",
    conditions: o,
    formats: [{ type: "block", value: "auto" }],
    _id: a,
    _groupName: null
  }], n(this, s, S).call(this, a);
};
q = function(e, t) {
  const o = [...this._rules];
  o[e] = { ...o[e], role: t }, this._rules = o;
};
D = function(e, t) {
  const o = [...this._rules];
  o[e] = { ...o[e], part: t }, this._rules = o;
};
U = function(e, t) {
  const o = [...this._rules];
  o[e] = { ...o[e], exclude: t }, this._rules = o;
};
W = function() {
  let e = "New Group", t = 1;
  for (; this._groupOrder.includes(e); )
    e = `New Group ${++t}`;
  this._groupOrder = [...this._groupOrder, e], this._renamingGroup = e, this._renameValue = e;
};
H = function(e) {
  this._renamingGroup = e, this._renameValue = e;
};
_ = function() {
  if (!this._renamingGroup || !this._renameValue.trim()) return;
  const e = this._renamingGroup, t = this._renameValue.trim();
  e !== t && (this._groupOrder = this._groupOrder.map((o) => o === e ? t : o), this._rules = this._rules.map(
    (o) => o._groupName === e ? { ...o, _groupName: t } : o
  )), this._renamingGroup = null, this._renameValue = "";
};
y = function() {
  this._renamingGroup = null, this._renameValue = "";
};
Y = function(e) {
  this._rules = this._rules.map(
    (t) => t._groupName === e ? { ...t, _groupName: null } : t
  ), this._groupOrder = this._groupOrder.filter((t) => t !== e);
};
K = function(e, t) {
  const o = [...this._rules];
  o[e] = { ...o[e], _groupName: t }, this._rules = o;
};
Q = function(e) {
  const t = [...this._rules], o = { ...t[e] };
  o.formats = [...o.formats ?? [], { type: "block", value: "auto" }], t[e] = o, this._rules = t;
};
j = function(e, t) {
  const o = [...this._rules], i = { ...o[e] };
  i.formats = (i.formats ?? []).filter((a, r) => r !== t), o[e] = i, this._rules = o;
};
J = function(e, t, o) {
  const i = [...this._rules], a = { ...i[e] };
  a.formats = [...a.formats ?? []];
  const r = o === "block" ? "auto" : "bold";
  a.formats[t] = { type: o, value: r }, i[e] = a, this._rules = i;
};
X = function(e, t, o) {
  const i = [...this._rules], a = { ...i[e] };
  a.formats = [...a.formats ?? []], a.formats[t] = { ...a.formats[t], value: o }, i[e] = a, this._rules = i;
};
Z = function(e) {
  const t = [...this._rules], o = { ...t[e] };
  o.conditions = [...o.conditions, { type: "textBeginsWith", value: "" }], t[e] = o, this._rules = t;
};
I = function(e, t) {
  const o = [...this._rules], i = { ...o[e] };
  i.conditions = i.conditions.filter((a, r) => r !== t), o[e] = i, this._rules = o;
};
ee = function(e, t, o) {
  const i = [...this._rules], a = { ...i[e] };
  a.conditions = [...a.conditions], a.conditions[t] = {
    type: o,
    value: x.includes(o) ? void 0 : a.conditions[t].value
  }, i[e] = a, this._rules = i;
};
te = function(e, t, o) {
  const i = [...this._rules], a = { ...i[e] };
  a.conditions = [...a.conditions];
  const r = a.conditions[t], u = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
  a.conditions[t] = { ...r, value: u && !isNaN(Number(o)) ? Number(o) : o }, i[e] = a, this._rules = i;
};
oe = function(e) {
  const t = [...this._rules], o = { ...t[e] };
  o.exceptions = [...o.exceptions ?? [], { type: "textContains", value: "" }], t[e] = o, this._rules = t;
};
ie = function(e, t) {
  const o = [...this._rules], i = { ...o[e] };
  i.exceptions = (i.exceptions ?? []).filter((a, r) => r !== t), o[e] = i, this._rules = o;
};
ae = function(e, t, o) {
  const i = [...this._rules], a = { ...i[e] };
  a.exceptions = [...a.exceptions ?? []], a.exceptions[t] = {
    type: o,
    value: x.includes(o) ? void 0 : a.exceptions[t].value
  }, i[e] = a, this._rules = i;
};
se = function(e, t, o) {
  const i = [...this._rules], a = { ...i[e] };
  a.exceptions = [...a.exceptions ?? []];
  const r = a.exceptions[t], u = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
  a.exceptions[t] = { ...r, value: u && !isNaN(Number(o)) ? Number(o) : o }, i[e] = a, this._rules = i;
};
w = function(e) {
  const t = (e.formats ?? []).find((u) => u.type === "block"), { _id: o, _groupName: i, action: a, ...r } = e;
  return {
    ...r,
    format: t?.value ?? "auto"
  };
};
re = function() {
  this._renamingGroup && n(this, s, _).call(this);
  const e = [];
  for (const o of this._groupOrder) {
    const i = this._rules.filter((a) => a._groupName === o).map((a) => n(this, s, w).call(this, a));
    e.push({ name: o, rules: i });
  }
  const t = this._rules.filter((o) => o._groupName === null).map((o) => n(this, s, w).call(this, o));
  this.value = { rules: { groups: e, rules: t } }, this.modalContext?.submit();
};
ne = function() {
  this.modalContext?.reject();
};
ue = function(e, t, o) {
  const i = x.includes(o.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${o.type}
					@change=${(a) => n(this, s, ee).call(this, e, t, a.target.value)}>
					${me.map((a) => l`
						<option value=${a} ?selected=${a === o.type}>${fe[a]}</option>
					`)}
				</select>
				${i ? c : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(o.value ?? "")}
						@input=${(a) => n(this, s, te).call(this, e, t, a.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => n(this, s, I).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
le = function(e, t, o) {
  const i = x.includes(o.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${o.type}
					@change=${(a) => n(this, s, ae).call(this, e, t, a.target.value)}>
					${me.map((a) => l`
						<option value=${a} ?selected=${a === o.type}>${fe[a]}</option>
					`)}
				</select>
				${i ? c : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(o.value ?? "")}
						@input=${(a) => n(this, s, se).call(this, e, t, a.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => n(this, s, ie).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
ce = function(e, t, o) {
  const i = o.type === "block" ? Ae : Te, a = o.type === "block" ? Le : Oe;
  return l`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${o.type}
					@change=${(r) => n(this, s, J).call(this, e, t, r.target.value)}>
					${Re.map((r) => l`
						<option value=${r} ?selected=${r === o.type}>${Ne[r]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${o.value}
					@change=${(r) => n(this, s, X).call(this, e, t, r.target.value)}>
					${i.map((r) => l`
						<option value=${r} ?selected=${r === o.value}>${a[r]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => n(this, s, j).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
k = function(e, t, o) {
  return n(this, s, O).call(this, e._id) ? n(this, s, pe).call(this, e, t, o) : n(this, s, de).call(this, e, t, o);
};
de = function(e, t, o) {
  const i = e.exclude, a = e.part ?? "content", r = i ? "Exclude" : ge[a] ?? a, u = o.length, d = e.role || "(unnamed rule)";
  return l`
			<div class="rule-row" @click=${() => n(this, s, E).call(this, e._id)}>
				<span class="rule-grip" title="Drag to reorder">⠿</span>
				<span class="rule-row-name">${d}</span>
				<span class="rule-row-part ${i ? "excluded" : ""}">${r}</span>
				${u > 0 ? l`<span class="rule-row-match ${i ? "excluded" : "matched"}">${u}&times;</span>` : l`<span class="rule-row-match no-match">0</span>`}
				<uui-icon class="rule-row-chevron" name="icon-navigation-down"></uui-icon>
			</div>
		`;
};
pe = function(e, t, o) {
  const i = e.exclude, a = e.part ?? "content", r = [
    { label: "Ungrouped", value: null },
    ...this._groupOrder.map((u) => ({ label: u, value: u }))
  ];
  return l`
			<div class="rule-card">
				<div class="rule-header">
					<span class="rule-grip" title="Drag to reorder">⠿</span>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${e.role}
						@input=${(u) => n(this, s, q).call(this, t, u.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => n(this, s, G).call(this, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
					<uui-button
						compact
						look="secondary"
						label="Collapse"
						@click=${() => n(this, s, E).call(this, e._id)}>
						<uui-icon name="icon-navigation-up"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => n(this, s, b).call(this, "conditions", t)}>
						<uui-icon name=${n(this, s, h).call(this, "conditions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${n(this, s, h).call(this, "conditions", t) ? c : l`
						${e.conditions.map((u, d) => n(this, s, ue).call(this, t, d, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => n(this, s, Z).call(this, t)}>
							+ Add condition
						</uui-button>
					`}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => n(this, s, b).call(this, "exceptions", t)}>
						<uui-icon name=${n(this, s, h).call(this, "exceptions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${n(this, s, h).call(this, "exceptions", t) ? c : l`
						${(e.exceptions ?? []).map((u, d) => n(this, s, le).call(this, t, d, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => n(this, s, oe).call(this, t)}>
							+ Add exception
						</uui-button>
					`}
				</div>

				<div class="part-area">
					<div class="section-header collapsible" @click=${() => n(this, s, b).call(this, "part", t)}>
						<uui-icon name=${n(this, s, h).call(this, "part", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Part
					</div>
					${n(this, s, h).call(this, "part", t) ? c : l`
						<div class="part-controls">
							<select
								class="part-select"
								.value=${a}
								?disabled=${i}
								@change=${(u) => n(this, s, D).call(this, t, u.target.value)}>
								${Ce.map((u) => l`
									<option value=${u} ?selected=${u === a}>${ge[u]}</option>
								`)}
							</select>
							<label class="exclude-label">
								<input
									type="checkbox"
									.checked=${i}
									@change=${(u) => n(this, s, U).call(this, t, u.target.checked)} />
								Exclude
							</label>
						</div>
						${r.length > 1 ? l`
							<div class="move-to-group">
								<span class="move-label">Group:</span>
								<select
									class="group-select"
									.value=${e._groupName ?? ""}
									@change=${(u) => {
    const d = u.target.value;
    n(this, s, K).call(this, t, d || null);
  }}>
									${r.map((u) => l`
										<option value=${u.value ?? ""} ?selected=${(u.value ?? "") === (e._groupName ?? "")}>${u.label}</option>
									`)}
								</select>
							</div>
						` : c}
					`}
				</div>

				${i ? c : l`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => n(this, s, b).call(this, "format", t)}>
						<uui-icon name=${n(this, s, h).call(this, "format", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Format${(e.formats ?? []).length > 0 ? ` (${(e.formats ?? []).length})` : ""}
					</div>
					${n(this, s, h).call(this, "format", t) ? c : l`
						${(e.formats ?? []).map((u, d) => n(this, s, ce).call(this, t, d, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => n(this, s, Q).call(this, t)}>
							+ Add format
						</uui-button>
					`}
				</div>
				`}

				<div class="match-preview ${o.length > 0 ? i ? "excluded" : "matched" : "no-match"}">
					${o.length > 0 ? l`<uui-icon name=${i ? "icon-block" : "icon-check"}></uui-icon> ${i ? "Excluded" : "Matched"} <strong>${o.length}&times;</strong>${o.length <= 5 ? l`: ${o.map((u, d) => l`${d > 0 ? l`, ` : c}<strong>${n(this, s, N).call(this, u.text, 40)}</strong>`)}` : c}` : l`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
N = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
he = function(e) {
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
    t.key === "Enter" && n(this, s, _).call(this), t.key === "Escape" && n(this, s, y).call(this);
  }} />
					<uui-button compact look="primary" label="Confirm" @click=${() => n(this, s, _).call(this)}>
						<uui-icon name="icon-check"></uui-icon>
					</uui-button>
					<uui-button compact look="secondary" label="Cancel" @click=${() => n(this, s, y).call(this)}>
						<uui-icon name="icon-wrong"></uui-icon>
					</uui-button>
				</div>
			` : l`
			<div class="group-header">
				<strong class="group-name">${e}</strong>
				<span class="header-spacer"></span>
				<uui-button compact look="outline" label="Rename" @click=${() => n(this, s, H).call(this, e)}>
					<uui-icon name="icon-edit"></uui-icon>
				</uui-button>
				<uui-button compact look="outline" color="danger" label="Delete group"
					title="Delete group (rules move to ungrouped)"
					@click=${() => n(this, s, Y).call(this, e)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
ve = function(e) {
  const t = v(this, s, f), o = t.filter((i) => !e.has(i.id));
  return o.length === 0 ? c : l`
			<div class="unmatched-section">
				<h4>Unmatched elements (${o.length})</h4>
				${o.map((i) => {
    const a = t.indexOf(i);
    return l`
						<div class="unmatched-element">
							<div class="unmatched-text">${n(this, s, N).call(this, i.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${i.fontSize}pt</span>
								<span class="meta-badge">${i.fontName}</span>
								${i.color !== "#000000" ? l`<span class="meta-badge" style="border-left: 3px solid ${i.color};">${i.color}</span>` : c}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => n(this, s, B).call(this, i, a)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
p.styles = [
  $e,
  be`
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
m([
  g()
], p.prototype, "_rules", 2);
m([
  g()
], p.prototype, "_groupOrder", 2);
m([
  g()
], p.prototype, "_collapsed", 2);
m([
  g()
], p.prototype, "_expandedRules", 2);
m([
  g()
], p.prototype, "_renamingGroup", 2);
m([
  g()
], p.prototype, "_renameValue", 2);
p = m([
  _e("up-doc-section-rules-editor-modal")
], p);
const Ve = p;
export {
  p as UpDocSectionRulesEditorModalElement,
  Ve as default
};
//# sourceMappingURL=section-rules-editor-modal.element-Dl9GF7In.js.map
