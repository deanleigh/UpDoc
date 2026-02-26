import { U as tt } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { U as et } from "./up-doc-modal.token-DHoS03yR.js";
import { f as G } from "./workflow.service-CWGlGq_3.js";
import { s as M, b as L, m as R } from "./transforms-BkZeboOX.js";
import { html as W, css as nt, state as V, customElement as ot } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as at } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as it } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as J } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as st } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as P } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as rt } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as ct } from "@umbraco-cms/backoffice/document-blueprint";
var lt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, j = (t) => {
  throw TypeError(t);
}, D = (t, e, s, u) => {
  for (var n = u > 1 ? void 0 : u ? ut(e, s) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (n = (u ? i(e, s, n) : i(n)) || n);
  return u && n && lt(e, s, n), n;
}, z = (t, e, s) => e.has(t) || j("Cannot " + s), O = (t, e, s) => (z(t, e, "read from private field"), s ? s.call(t) : e.get(t)), A = (t, e, s) => e.has(t) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), k = (t, e, s) => (z(t, e, "access private method"), s), $, B, h, E, H, X, K, Q, Y;
let T = class extends at {
  constructor() {
    super(), A(this, h), A(this, $, new rt(this)), A(this, B, new ct(this)), this._hasWorkflows = !1, this.consumeContext(it, (t) => {
      this.observe(t?.unique, (e) => {
        this._documentUnique = e, k(this, h, E).call(this);
      }), this.observe(t?.contentTypeUnique, (e) => {
        this._documentTypeUnique = e, k(this, h, E).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? W`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${k(this, h, H)}>
				Create from Source
			</uui-button>
		` : W``;
  }
};
$ = /* @__PURE__ */ new WeakMap();
B = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
E = async function() {
  if (this._documentTypeUnique)
    try {
      const e = await (await this.getContext(J)).getLatestToken(), s = await G(e), u = new Set(s.blueprintIds), { data: n } = await O(this, $).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!n?.items?.length) return;
      for (const o of n.items) {
        const { data: i } = await O(this, B).requestItemsByDocumentType(o.unique);
        if (i?.some((a) => u.has(a.unique))) {
          this._hasWorkflows = !0;
          return;
        }
      }
    } catch {
    }
};
H = async function() {
  if (!this._documentTypeUnique) return;
  const t = await this.getContext(st), s = await (await this.getContext(J)).getLatestToken(), u = this._documentUnique ?? null;
  try {
    const n = await G(s), o = new Set(n.blueprintIds), { data: i } = await O(this, $).requestAllowedChildrenOf(
      this._documentTypeUnique,
      u
    );
    if (!i?.items?.length) {
      t.peek("danger", {
        data: { message: "No document types are allowed as children of this page." }
      });
      return;
    }
    const a = [];
    for (const f of i.items) {
      const { data: g } = await O(this, B).requestItemsByDocumentType(f.unique);
      if (g?.length) {
        const C = g.filter((q) => o.has(q.unique));
        C.length && a.push({
          documentTypeUnique: f.unique,
          documentTypeName: f.name,
          documentTypeIcon: f.icon ?? null,
          blueprints: C.map((q) => ({
            blueprintUnique: q.unique,
            blueprintName: q.name
          }))
        });
      }
    }
    if (!a.length) {
      t.peek("warning", {
        data: { message: "No workflows are configured for the document types allowed here." }
      });
      return;
    }
    let l;
    try {
      l = await P(this, tt, {
        data: { documentTypes: a }
      });
    } catch {
      return;
    }
    const { blueprintUnique: r, documentTypeUnique: d } = l, c = a.find((f) => f.documentTypeUnique === d)?.blueprints.find((f) => f.blueprintUnique === r);
    let y;
    try {
      y = await P(this, et, {
        data: {
          unique: u,
          blueprintName: c?.blueprintName ?? "",
          blueprintId: r
        }
      });
    } catch {
      return;
    }
    const { name: p, mediaUnique: v, sourceUrl: w, sectionLookup: Z, config: _ } = y;
    if (!p || !_ || !v && !w) return;
    const S = await fetch(
      `/umbraco/management/api/v1/document-blueprint/${r}/scaffold`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${s}`
        }
      }
    );
    if (!S.ok) {
      const f = await S.json();
      t.peek("danger", {
        data: { message: `Failed to scaffold from blueprint: ${f.title || "Unknown error"}` }
      });
      return;
    }
    const U = await S.json(), N = U.values ? JSON.parse(JSON.stringify(U.values)) : [], I = /* @__PURE__ */ new Set();
    for (const f of _.map.mappings) {
      if (f.enabled === !1) continue;
      const g = Z[f.source];
      if (g)
        for (const C of f.destinations)
          k(this, h, X).call(this, N, C, g, _, I);
    }
    k(this, h, Y).call(this, N, _, I);
    const F = {
      parent: u ? { id: u } : null,
      documentType: { id: d },
      template: U.template ? { id: U.template.id } : null,
      values: N,
      variants: [{ name: p, culture: null, segment: null }]
    }, x = await fetch("/umbraco/management/api/v1/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${s}`
      },
      body: JSON.stringify(F)
    });
    if (!x.ok) {
      const f = await x.json();
      t.peek("danger", {
        data: { message: `Failed to create document: ${f.title || f.detail || "Unknown error"}` }
      });
      return;
    }
    const b = x.headers.get("Location")?.split("/").pop();
    if (b) {
      const f = await fetch(`/umbraco/management/api/v1/document/${b}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${s}` }
      });
      if (f.ok) {
        const g = await f.json();
        await fetch(`/umbraco/management/api/v1/document/${b}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${s}` },
          body: JSON.stringify(g)
        });
      }
    }
    if (t.peek("positive", {
      data: { message: `Document "${p}" created successfully!` }
    }), b) {
      const f = `/umbraco/section/content/workspace/document/edit/${b}`;
      setTimeout(() => {
        window.location.href = f;
      }, 150);
    }
  } catch (n) {
    console.error("Error creating document:", n), t.peek("danger", {
      data: { message: "An unexpected error occurred while creating the document." }
    });
  }
};
X = function(t, e, s, u, n) {
  const o = s;
  if (e.blockKey) {
    for (const a of [...u.destination.blockGrids ?? [], ...u.destination.blockLists ?? []]) {
      const l = a.blocks.find((r) => r.key === e.blockKey);
      if (l) {
        const r = l.contentTypeKey;
        r ? k(this, h, Q).call(this, t, a.alias, r, e.target, o, n) : l.identifyBy && k(this, h, K).call(this, t, a.alias, l.identifyBy, e.target, o, n);
        return;
      }
    }
    console.log(`Block ${e.blockKey} not found in destination config`);
    return;
  }
  const i = e.target.split(".");
  if (i.length === 1) {
    const a = i[0], l = t.find((r) => r.alias === a);
    if (l)
      if (n.has(a)) {
        const r = typeof l.value == "string" ? l.value : "";
        l.value = `${r} ${o}`;
      } else
        l.value = o;
    else
      t.push({ alias: a, value: o });
    n.add(a);
  } else if (i.length === 3) {
    const [a, l, r] = i, m = [...u.destination.blockGrids ?? [], ...u.destination.blockLists ?? []].find((w) => w.key === a), c = m?.blocks.find((w) => w.key === l);
    if (!m || !c) return;
    const y = m.alias, p = c.properties?.find((w) => w.key === r)?.alias ?? r, v = c.identifyBy;
    if (!v) return;
    k(this, h, K).call(this, t, y, v, p, o, n);
  }
};
K = function(t, e, s, u, n, o) {
  const i = t.find((a) => a.alias === e);
  if (!(!i || !i.value))
    try {
      const a = typeof i.value == "string", l = a ? JSON.parse(i.value) : i.value, r = l.contentData;
      if (!r) return;
      for (const d of r) {
        const m = d.values?.find((c) => c.alias === s.property);
        if (m && typeof m.value == "string" && m.value.toLowerCase().includes(s.value.toLowerCase())) {
          const c = d.values?.find((y) => y.alias === u);
          if (c) {
            const y = `${d.key}:${u}`;
            if (o.has(y)) {
              const p = typeof c.value == "string" ? c.value : "";
              c.value = `${p}
${n}`;
            } else
              c.value = n;
            o.add(y);
          }
          break;
        }
      }
      i.value = a ? JSON.stringify(l) : l;
    } catch (a) {
      console.error(`Failed to apply block mapping to ${e}:`, a);
    }
};
Q = function(t, e, s, u, n, o) {
  const i = t.find((a) => a.alias === e);
  if (!(!i || !i.value))
    try {
      const a = typeof i.value == "string", l = a ? JSON.parse(i.value) : i.value, r = l.contentData;
      if (!r) return;
      const d = r.find((c) => c.contentTypeKey === s);
      if (!d) return;
      const m = d.values?.find((c) => c.alias === u);
      if (m) {
        const c = `${d.key}:${u}`;
        if (o.has(c)) {
          const y = typeof m.value == "string" ? m.value : "";
          m.value = `${y}
${n}`;
        } else
          m.value = n;
        o.add(c);
      }
      i.value = a ? JSON.stringify(l) : l;
    } catch (a) {
      console.error(`Failed to apply block mapping by content type to ${e}:`, a);
    }
};
Y = function(t, e, s) {
  for (const n of e.destination.fields)
    if ((n.type === "text" || n.type === "textArea") && s.has(n.alias)) {
      const o = t.find((i) => i.alias === n.alias);
      o && typeof o.value == "string" && (o.value = M(o.value));
    }
  for (const n of e.destination.fields)
    if (n.type === "richText" && s.has(n.alias)) {
      const o = t.find((i) => i.alias === n.alias);
      o && typeof o.value == "string" && (o.value = L(R(o.value)));
    }
  const u = [...e.destination.blockGrids ?? [], ...e.destination.blockLists ?? []];
  for (const n of u) {
    const o = t.find((r) => r.alias === n.alias);
    if (!o?.value) continue;
    const i = typeof o.value == "string", a = i ? JSON.parse(o.value) : o.value, l = a.contentData;
    if (l) {
      for (const r of l)
        for (const d of n.blocks)
          if (d.contentTypeKey ? r.contentTypeKey === d.contentTypeKey : r.key === d.key) {
            for (const c of d.properties ?? []) {
              const y = `${r.key}:${c.alias}`;
              if ((c.type === "text" || c.type === "textArea") && s.has(y)) {
                const p = r.values?.find((v) => v.alias === c.alias);
                p && typeof p.value == "string" && (p.value = M(p.value));
              }
              if (c.type === "richText" && s.has(y)) {
                const p = r.values?.find((v) => v.alias === c.alias);
                p && typeof p.value == "string" && (p.value = L(R(p.value)));
              }
            }
            break;
          }
      o.value = i ? JSON.stringify(a) : a;
    }
  }
};
T.styles = [
  nt`
			:host {
				display: contents;
			}
		`
];
D([
  V()
], T.prototype, "_documentUnique", 2);
D([
  V()
], T.prototype, "_documentTypeUnique", 2);
D([
  V()
], T.prototype, "_hasWorkflows", 2);
T = D([
  ot("up-doc-collection-action")
], T);
const Ut = T;
export {
  T as UpDocCollectionActionElement,
  Ut as default
};
//# sourceMappingURL=up-doc-collection-action.element-3LrVvysj.js.map
