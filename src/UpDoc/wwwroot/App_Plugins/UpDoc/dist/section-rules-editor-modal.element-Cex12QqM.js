import { nothing as c, html as l, css as de, state as b, customElement as he } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as ve } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as me } from "@umbraco-cms/backoffice/style";
function fe(e) {
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
function ge(e) {
  return e.format ? e.format : e.action === "addAsList" ? "bulletListItem" : "auto";
}
var be = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, f = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? _e(t, i) : t, r = e.length - 1, u; r >= 0; r--)
    (u = e[r]) && (s = (o ? u(t, i, s) : u(s)) || s);
  return o && s && be(t, i, s), s;
}, L = (e, t, i) => t.has(e) || C("Cannot " + i), v = (e, t, i) => (L(e, t, "read from private field"), i ? i.call(e) : t.get(e)), $e = (e, t, i) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), n = (e, t, i) => (L(e, t, "access private method"), i), a, d, g, $, m, A, R, O, T, E, F, x, M, V, P, B, G, q, D, z, y, U, W, H, Y, K, Q, j, J, X, Z, I, ee, te, ie, k, oe, se, ae, re, ne, w, S, ue, le;
let xe = 0;
function N() {
  return `r-${++xe}`;
}
const ce = {
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
}, _ = ["positionFirst", "positionLast"], pe = [
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
], ze = {
  title: "Title",
  content: "Content",
  description: "Description",
  summary: "Summary"
}, ye = ["title", "content", "description", "summary"], ke = {
  block: "Block",
  style: "Style"
}, we = ["block", "style"], Ee = {
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
}, Se = [
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
], Ne = {
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  code: "Code",
  highlight: "Highlight"
}, Ce = ["bold", "italic", "strikethrough", "code", "highlight"];
let h = class extends ve {
  constructor() {
    super(...arguments), $e(this, a), this._rules = [], this._groupOrder = [], this._collapsed = /* @__PURE__ */ new Set(), this._renamingGroup = null, this._renameValue = "";
  }
  firstUpdated() {
    const e = this.data?.existingRules;
    if (!e) return;
    const t = [], i = [];
    for (const o of e.groups ?? []) {
      i.push(o.name);
      for (const s of o.rules)
        t.push(n(this, a, $).call(this, s, o.name));
    }
    for (const o of e.rules ?? [])
      t.push(n(this, a, $).call(this, o, null));
    this._rules = t, this._groupOrder = i;
  }
  render() {
    const e = n(this, a, O).call(this), t = /* @__PURE__ */ new Map();
    for (const [o, s] of e) {
      const r = v(this, a, m).find((u) => u.id === o);
      if (r) {
        const u = t.get(s) ?? [];
        u.push(r), t.set(s, u);
      }
    }
    const i = v(this, a, R);
    return l`
			<umb-body-layout headline="Edit Sections: ${v(this, a, A)}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${v(this, a, m).length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${e.size} matched</span>
						<span class="meta-badge">${v(this, a, m).length - e.size} unmatched</span>
						${this._groupOrder.length > 0 ? l`<span class="meta-badge">${this._groupOrder.length} group${this._groupOrder.length !== 1 ? "s" : ""}</span>` : c}
					</div>

					${i.map((o) => o.group !== null ? l`
								<div class="group-container">
									${n(this, a, ue).call(this, o.group)}
									<div class="group-rules">
										${o.rules.map(
      ({ rule: s, flatIndex: r }) => n(this, a, w).call(this, s, r, t.get(r) ?? [])
    )}
										<uui-button
											look="placeholder"
											label="Add rule to ${o.group}"
											@click=${() => n(this, a, x).call(this, o.group)}>
											+ Add rule
										</uui-button>
									</div>
								</div>
							` : l`
							${this._groupOrder.length > 0 ? l`
								<div class="ungrouped-label">Ungrouped</div>
							` : c}
							${o.rules.map(
      ({ rule: s, flatIndex: r }) => n(this, a, w).call(this, s, r, t.get(r) ?? [])
    )}
							<uui-button
								look="placeholder"
								label="Add rule"
								@click=${() => n(this, a, x).call(this, null)}>
								+ Add rule
							</uui-button>
						`)}

					<uui-button
						look="outline"
						label="Add group"
						@click=${() => n(this, a, q).call(this)}>
						<uui-icon name="icon-add"></uui-icon>
						Add group
					</uui-button>

					${n(this, a, le).call(this, e)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${n(this, a, se)}>Close</uui-button>
					<uui-button
						label="Save"
						look="primary"
						color="positive"
						@click=${n(this, a, oe)}>
						Save
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
d = function(e, t) {
  return this._collapsed.has(`${e}-${t}`);
};
g = function(e, t) {
  const i = `${e}-${t}`, o = new Set(this._collapsed);
  o.has(i) ? o.delete(i) : o.add(i), this._collapsed = o;
};
$ = function(e, t) {
  let i = e.part, o = e.exclude ?? !1;
  if (!i && !o) {
    const r = fe(e);
    r === "exclude" ? o = !0 : i = r;
  }
  let s = e.formats;
  return (!s || s.length === 0) && (s = [{ type: "block", value: e.format ?? ge(e) }]), {
    ...e,
    part: i,
    exclude: o,
    formats: s,
    _id: N(),
    _groupName: t
  };
};
m = function() {
  return this.data?.elements ?? [];
};
A = function() {
  return this.data?.sectionHeading ?? "Section";
};
R = function() {
  const e = [];
  for (const i of this._groupOrder) {
    const o = [];
    this._rules.forEach((s, r) => {
      s._groupName === i && o.push({ rule: s, flatIndex: r });
    }), e.push({ group: i, rules: o });
  }
  const t = [];
  return this._rules.forEach((i, o) => {
    i._groupName === null && t.push({ rule: i, flatIndex: o });
  }), e.push({ group: null, rules: t }), e;
};
O = function() {
  const e = /* @__PURE__ */ new Map(), t = v(this, a, m);
  for (let i = 0; i < this._rules.length; i++) {
    const o = this._rules[i];
    if (o.conditions.length !== 0)
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        if (!e.has(r.id) && n(this, a, T).call(this, r, o.conditions, s, t.length)) {
          if (o.exceptions?.length && o.exceptions.some(
            (p) => n(this, a, E).call(this, r, p, s, t.length)
          ))
            continue;
          e.set(r.id, i);
        }
      }
  }
  return e;
};
T = function(e, t, i, o) {
  return t.every((s) => n(this, a, E).call(this, e, s, i, o));
};
E = function(e, t, i, o) {
  const s = String(t.value ?? ""), r = Number(t.value);
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
      return !isNaN(r) && Math.abs(e.fontSize - r) < 0.5;
    case "fontSizeAbove":
      return !isNaN(r) && e.fontSize > r;
    case "fontSizeBelow":
      return !isNaN(r) && e.fontSize < r;
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
F = function(e, t, i) {
  const o = [];
  o.push({ type: "fontSizeEquals", value: e.fontSize }), e.fontName && o.push({ type: "fontNameContains", value: e.fontName }), e.color && e.color.toLowerCase() !== "#000000" && e.color.toLowerCase() !== "#000" && o.push({ type: "colorEquals", value: e.color });
  const s = e.text.indexOf(":");
  return s > 0 && s < 30 && o.push({ type: "textBeginsWith", value: e.text.substring(0, s + 1) }), t === 0 ? o.push({ type: "positionFirst" }) : t === i - 1 && o.push({ type: "positionLast" }), o;
};
x = function(e = null) {
  this._rules = [...this._rules, {
    role: "",
    part: "content",
    conditions: [],
    formats: [{ type: "block", value: "auto" }],
    _id: N(),
    _groupName: e
  }];
};
M = function(e) {
  this._rules = this._rules.filter((t, i) => i !== e);
};
V = function(e, t) {
  const i = n(this, a, F).call(this, e, t, v(this, a, m).length), o = e.text.split(/[\s:,]+/).slice(0, 3).join("-").toLowerCase().replace(/[^a-z0-9-]/g, "");
  this._rules = [...this._rules, {
    role: o,
    part: "content",
    conditions: i,
    formats: [{ type: "block", value: "auto" }],
    _id: N(),
    _groupName: null
  }];
};
P = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], role: t }, this._rules = i;
};
B = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], part: t }, this._rules = i;
};
G = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], exclude: t }, this._rules = i;
};
q = function() {
  let e = "New Group", t = 1;
  for (; this._groupOrder.includes(e); )
    e = `New Group ${++t}`;
  this._groupOrder = [...this._groupOrder, e], this._renamingGroup = e, this._renameValue = e;
};
D = function(e) {
  this._renamingGroup = e, this._renameValue = e;
};
z = function() {
  if (!this._renamingGroup || !this._renameValue.trim()) return;
  const e = this._renamingGroup, t = this._renameValue.trim();
  e !== t && (this._groupOrder = this._groupOrder.map((i) => i === e ? t : i), this._rules = this._rules.map(
    (i) => i._groupName === e ? { ...i, _groupName: t } : i
  )), this._renamingGroup = null, this._renameValue = "";
};
y = function() {
  this._renamingGroup = null, this._renameValue = "";
};
U = function(e) {
  this._rules = this._rules.map(
    (t) => t._groupName === e ? { ...t, _groupName: null } : t
  ), this._groupOrder = this._groupOrder.filter((t) => t !== e);
};
W = function(e, t) {
  const i = [...this._rules];
  i[e] = { ...i[e], _groupName: t }, this._rules = i;
};
H = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.formats = [...i.formats ?? [], { type: "block", value: "auto" }], t[e] = i, this._rules = t;
};
Y = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.formats = (o.formats ?? []).filter((s, r) => r !== t), i[e] = o, this._rules = i;
};
K = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.formats = [...s.formats ?? []];
  const r = i === "block" ? "auto" : "bold";
  s.formats[t] = { type: i, value: r }, o[e] = s, this._rules = o;
};
Q = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.formats = [...s.formats ?? []], s.formats[t] = { ...s.formats[t], value: i }, o[e] = s, this._rules = o;
};
j = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.conditions = [...i.conditions, { type: "textBeginsWith", value: "" }], t[e] = i, this._rules = t;
};
J = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.conditions = o.conditions.filter((s, r) => r !== t), i[e] = o, this._rules = i;
};
X = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions], s.conditions[t] = {
    type: i,
    value: _.includes(i) ? void 0 : s.conditions[t].value
  }, o[e] = s, this._rules = o;
};
Z = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.conditions = [...s.conditions];
  const r = s.conditions[t], u = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
  s.conditions[t] = { ...r, value: u && !isNaN(Number(i)) ? Number(i) : i }, o[e] = s, this._rules = o;
};
I = function(e) {
  const t = [...this._rules], i = { ...t[e] };
  i.exceptions = [...i.exceptions ?? [], { type: "textContains", value: "" }], t[e] = i, this._rules = t;
};
ee = function(e, t) {
  const i = [...this._rules], o = { ...i[e] };
  o.exceptions = (o.exceptions ?? []).filter((s, r) => r !== t), i[e] = o, this._rules = i;
};
te = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.exceptions = [...s.exceptions ?? []], s.exceptions[t] = {
    type: i,
    value: _.includes(i) ? void 0 : s.exceptions[t].value
  }, o[e] = s, this._rules = o;
};
ie = function(e, t, i) {
  const o = [...this._rules], s = { ...o[e] };
  s.exceptions = [...s.exceptions ?? []];
  const r = s.exceptions[t], u = r.type === "fontSizeEquals" || r.type === "fontSizeAbove" || r.type === "fontSizeBelow";
  s.exceptions[t] = { ...r, value: u && !isNaN(Number(i)) ? Number(i) : i }, o[e] = s, this._rules = o;
};
k = function(e) {
  const t = (e.formats ?? []).find((u) => u.type === "block"), { _id: i, _groupName: o, action: s, ...r } = e;
  return {
    ...r,
    format: t?.value ?? "auto"
  };
};
oe = function() {
  const e = [];
  for (const i of this._groupOrder) {
    const o = this._rules.filter((s) => s._groupName === i).map((s) => n(this, a, k).call(this, s));
    e.push({ name: i, rules: o });
  }
  const t = this._rules.filter((i) => i._groupName === null).map((i) => n(this, a, k).call(this, i));
  this.value = { rules: { groups: e, rules: t } }, this.modalContext?.submit();
};
se = function() {
  this.modalContext?.reject();
};
ae = function(e, t, i) {
  const o = _.includes(i.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(s) => n(this, a, X).call(this, e, t, s.target.value)}>
					${pe.map((s) => l`
						<option value=${s} ?selected=${s === i.type}>${ce[s]}</option>
					`)}
				</select>
				${o ? c : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(s) => n(this, a, Z).call(this, e, t, s.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => n(this, a, J).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
re = function(e, t, i) {
  const o = _.includes(i.type);
  return l`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${i.type}
					@change=${(s) => n(this, a, te).call(this, e, t, s.target.value)}>
					${pe.map((s) => l`
						<option value=${s} ?selected=${s === i.type}>${ce[s]}</option>
					`)}
				</select>
				${o ? c : l`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(i.value ?? "")}
						@input=${(s) => n(this, a, ie).call(this, e, t, s.target.value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => n(this, a, ee).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
ne = function(e, t, i) {
  const o = i.type === "block" ? Se : Ce, s = i.type === "block" ? Ee : Ne;
  return l`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${i.type}
					@change=${(r) => n(this, a, K).call(this, e, t, r.target.value)}>
					${we.map((r) => l`
						<option value=${r} ?selected=${r === i.type}>${ke[r]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${i.value}
					@change=${(r) => n(this, a, Q).call(this, e, t, r.target.value)}>
					${o.map((r) => l`
						<option value=${r} ?selected=${r === i.value}>${s[r]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => n(this, a, Y).call(this, e, t)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
w = function(e, t, i) {
  const o = e.exclude, s = e.part ?? "content", r = [
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
						@input=${(u) => n(this, a, P).call(this, t, u.target.value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => n(this, a, M).call(this, t)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => n(this, a, g).call(this, "conditions", t)}>
						<uui-icon name=${n(this, a, d).call(this, "conditions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Conditions${e.conditions.length > 0 ? ` (${e.conditions.length})` : ""}
					</div>
					${n(this, a, d).call(this, "conditions", t) ? c : l`
						${e.conditions.map((u, p) => n(this, a, ae).call(this, t, p, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => n(this, a, j).call(this, t)}>
							+ Add condition
						</uui-button>
					`}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => n(this, a, g).call(this, "exceptions", t)}>
						<uui-icon name=${n(this, a, d).call(this, "exceptions", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Exceptions${(e.exceptions ?? []).length > 0 ? ` (${(e.exceptions ?? []).length})` : ""}
					</div>
					${n(this, a, d).call(this, "exceptions", t) ? c : l`
						${(e.exceptions ?? []).map((u, p) => n(this, a, re).call(this, t, p, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => n(this, a, I).call(this, t)}>
							+ Add exception
						</uui-button>
					`}
				</div>

				<div class="part-area">
					<div class="section-header collapsible" @click=${() => n(this, a, g).call(this, "part", t)}>
						<uui-icon name=${n(this, a, d).call(this, "part", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Part
					</div>
					${n(this, a, d).call(this, "part", t) ? c : l`
						<div class="part-controls">
							<select
								class="part-select"
								.value=${s}
								?disabled=${o}
								@change=${(u) => n(this, a, B).call(this, t, u.target.value)}>
								${ye.map((u) => l`
									<option value=${u} ?selected=${u === s}>${ze[u]}</option>
								`)}
							</select>
							<label class="exclude-label">
								<input
									type="checkbox"
									.checked=${o}
									@change=${(u) => n(this, a, G).call(this, t, u.target.checked)} />
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
    const p = u.target.value;
    n(this, a, W).call(this, t, p || null);
  }}>
									${r.map((u) => l`
										<option value=${u.value ?? ""} ?selected=${(u.value ?? "") === (e._groupName ?? "")}>${u.label}</option>
									`)}
								</select>
							</div>
						` : c}
					`}
				</div>

				${o ? c : l`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => n(this, a, g).call(this, "format", t)}>
						<uui-icon name=${n(this, a, d).call(this, "format", t) ? "icon-navigation-right" : "icon-navigation-down"}></uui-icon>
						Format${(e.formats ?? []).length > 0 ? ` (${(e.formats ?? []).length})` : ""}
					</div>
					${n(this, a, d).call(this, "format", t) ? c : l`
						${(e.formats ?? []).map((u, p) => n(this, a, ne).call(this, t, p, u))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => n(this, a, H).call(this, t)}>
							+ Add format
						</uui-button>
					`}
				</div>
				`}

				<div class="match-preview ${i.length > 0 ? o ? "excluded" : "matched" : "no-match"}">
					${i.length > 0 ? l`<uui-icon name=${o ? "icon-block" : "icon-check"}></uui-icon> ${o ? "Excluded" : "Matched"} <strong>${i.length}&times;</strong>${i.length <= 5 ? l`: ${i.map((u, p) => l`${p > 0 ? l`, ` : c}<strong>${n(this, a, S).call(this, u.text, 40)}</strong>`)}` : c}` : l`<uui-icon name="icon-alert"></uui-icon> ${e.conditions.length === 0 ? "Add conditions to match elements" : "No match"}`}
				</div>
			</div>
		`;
};
S = function(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
};
ue = function(e) {
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
    t.key === "Enter" && n(this, a, z).call(this), t.key === "Escape" && n(this, a, y).call(this);
  }} />
					<uui-button compact look="primary" label="Confirm" @click=${() => n(this, a, z).call(this)}>
						<uui-icon name="icon-check"></uui-icon>
					</uui-button>
					<uui-button compact look="secondary" label="Cancel" @click=${() => n(this, a, y).call(this)}>
						<uui-icon name="icon-wrong"></uui-icon>
					</uui-button>
				</div>
			` : l`
			<div class="group-header">
				<strong class="group-name">${e}</strong>
				<span class="header-spacer"></span>
				<uui-button compact look="outline" label="Rename" @click=${() => n(this, a, D).call(this, e)}>
					<uui-icon name="icon-edit"></uui-icon>
				</uui-button>
				<uui-button compact look="outline" color="danger" label="Delete group"
					title="Delete group (rules move to ungrouped)"
					@click=${() => n(this, a, U).call(this, e)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
};
le = function(e) {
  const t = v(this, a, m), i = t.filter((o) => !e.has(o.id));
  return i.length === 0 ? c : l`
			<div class="unmatched-section">
				<h4>Unmatched elements (${i.length})</h4>
				${i.map((o) => {
    const s = t.indexOf(o);
    return l`
						<div class="unmatched-element">
							<div class="unmatched-text">${n(this, a, S).call(this, o.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${o.fontSize}pt</span>
								<span class="meta-badge">${o.fontName}</span>
								${o.color !== "#000000" ? l`<span class="meta-badge" style="border-left: 3px solid ${o.color};">${o.color}</span>` : c}
							</div>
							<uui-button
								compact
								look="outline"
								label="Define rule from this"
								@click=${() => n(this, a, V).call(this, o, s)}>
								Define rule
							</uui-button>
						</div>
					`;
  })}
			</div>
		`;
};
h.styles = [
  me,
  de`
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
f([
  b()
], h.prototype, "_rules", 2);
f([
  b()
], h.prototype, "_groupOrder", 2);
f([
  b()
], h.prototype, "_collapsed", 2);
f([
  b()
], h.prototype, "_renamingGroup", 2);
f([
  b()
], h.prototype, "_renameValue", 2);
h = f([
  he("up-doc-section-rules-editor-modal")
], h);
const Oe = h;
export {
  h as UpDocSectionRulesEditorModalElement,
  Oe as default
};
//# sourceMappingURL=section-rules-editor-modal.element-Cex12QqM.js.map
