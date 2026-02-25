import { U as tt } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { U as et } from "./up-doc-modal.token-DHoS03yR.js";
import { f as G } from "./workflow.service-CWGlGq_3.js";
import { s as K, b as M, m as R } from "./transforms-BkZeboOX.js";
import { html as W, css as nt, state as I, customElement as ot } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as at } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as it } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as J } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as st } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as P } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as rt } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as ct } from "@umbraco-cms/backoffice/document-blueprint";
var lt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, j = (t) => {
  throw TypeError(t);
}, B = (t, e, s, u) => {
  for (var n = u > 1 ? void 0 : u ? ut(e, s) : e, o = t.length - 1, i; o >= 0; o--)
    (i = t[o]) && (n = (u ? i(e, s, n) : i(n)) || n);
  return u && n && lt(e, s, n), n;
}, z = (t, e, s) => e.has(t) || j("Cannot " + s), O = (t, e, s) => (z(t, e, "read from private field"), s ? s.call(t) : e.get(t)), A = (t, e, s) => e.has(t) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), k = (t, e, s) => (z(t, e, "access private method"), s), D, $, m, V, H, X, E, Q, Y;
let b = class extends at {
  constructor() {
    super(), A(this, m), A(this, D, new rt(this)), A(this, $, new ct(this)), this._hasWorkflows = !1, this.consumeContext(it, (t) => {
      this.observe(t?.unique, (e) => {
        this._documentUnique = e, k(this, m, V).call(this);
      }), this.observe(t?.contentTypeUnique, (e) => {
        this._documentTypeUnique = e, k(this, m, V).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? W`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${k(this, m, H)}>
				Create from Source
			</uui-button>
		` : W``;
  }
};
D = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakSet();
V = async function() {
  if (this._documentTypeUnique)
    try {
      const e = await (await this.getContext(J)).getLatestToken(), s = await G(e), u = new Set(s.blueprintIds), { data: n } = await O(this, D).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!n?.items?.length) return;
      for (const o of n.items) {
        const { data: i } = await O(this, $).requestItemsByDocumentType(o.unique);
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
    const n = await G(s), o = new Set(n.blueprintIds), { data: i } = await O(this, D).requestAllowedChildrenOf(
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
      const { data: g } = await O(this, $).requestItemsByDocumentType(f.unique);
      if (g?.length) {
        const U = g.filter((q) => o.has(q.unique));
        U.length && a.push({
          documentTypeUnique: f.unique,
          documentTypeName: f.name,
          documentTypeIcon: f.icon ?? null,
          blueprints: U.map((q) => ({
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
    const { blueprintUnique: c, documentTypeUnique: p } = l, r = a.find((f) => f.documentTypeUnique === p)?.blueprints.find((f) => f.blueprintUnique === c);
    let y;
    try {
      y = await P(this, et, {
        data: {
          unique: u,
          blueprintName: r?.blueprintName ?? "",
          blueprintId: c
        }
      });
    } catch {
      return;
    }
    const { name: d, mediaUnique: v, sourceUrl: w, sectionLookup: Z, config: _ } = y;
    if (!d || !_ || !v && !w) return;
    const S = await fetch(
      `/umbraco/management/api/v1/document-blueprint/${c}/scaffold`,
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
    const C = await S.json(), N = C.values ? JSON.parse(JSON.stringify(C.values)) : [], L = /* @__PURE__ */ new Set();
    for (const f of _.map.mappings) {
      if (f.enabled === !1) continue;
      const g = Z[f.source];
      if (g)
        for (const U of f.destinations)
          k(this, m, X).call(this, N, U, g, _, L);
    }
    k(this, m, Y).call(this, N, _, L);
    const F = {
      parent: u ? { id: u } : null,
      documentType: { id: p },
      template: C.template ? { id: C.template.id } : null,
      values: N,
      variants: [{ name: d, culture: null, segment: null }]
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
    const T = x.headers.get("Location")?.split("/").pop();
    if (T) {
      const f = await fetch(`/umbraco/management/api/v1/document/${T}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${s}` }
      });
      if (f.ok) {
        const g = await f.json();
        await fetch(`/umbraco/management/api/v1/document/${T}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${s}` },
          body: JSON.stringify(g)
        });
      }
    }
    if (t.peek("positive", {
      data: { message: `Document "${d}" created successfully!` }
    }), T) {
      const f = `/umbraco/section/content/workspace/document/edit/${T}`;
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
      const l = a.blocks.find((c) => c.key === e.blockKey);
      if (l) {
        const c = l.contentTypeKey;
        c ? k(this, m, Q).call(this, t, a.alias, c, e.target, o, n) : l.identifyBy && k(this, m, E).call(this, t, a.alias, l.identifyBy, e.target, o, n);
        return;
      }
    }
    console.log(`Block ${e.blockKey} not found in destination config`);
    return;
  }
  const i = e.target.split(".");
  if (i.length === 1) {
    const a = i[0], l = t.find((c) => c.alias === a);
    if (l)
      if (n.has(a)) {
        const c = typeof l.value == "string" ? l.value : "";
        l.value = `${c} ${o}`;
      } else
        l.value = o;
    else
      t.push({ alias: a, value: o });
    n.add(a);
  } else if (i.length === 3) {
    const [a, l, c] = i, h = [...u.destination.blockGrids ?? [], ...u.destination.blockLists ?? []].find((w) => w.key === a), r = h?.blocks.find((w) => w.key === l);
    if (!h || !r) return;
    const y = h.alias, d = r.properties?.find((w) => w.key === c)?.alias ?? c, v = r.identifyBy;
    if (!v) return;
    k(this, m, E).call(this, t, y, v, d, o, n);
  }
};
E = function(t, e, s, u, n, o) {
  const i = t.find((a) => a.alias === e);
  if (!(!i || !i.value))
    try {
      const a = typeof i.value == "string", l = a ? JSON.parse(i.value) : i.value, c = l.contentData;
      if (!c) return;
      for (const p of c) {
        const h = p.values?.find((r) => r.alias === s.property);
        if (h && typeof h.value == "string" && h.value.toLowerCase().includes(s.value.toLowerCase())) {
          const r = p.values?.find((y) => y.alias === u);
          if (r) {
            const y = `${p.key}:${u}`;
            if (o.has(y)) {
              const d = typeof r.value == "string" ? r.value : "";
              r.value = `${d}
${n}`;
            } else
              r.value = n;
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
      const a = typeof i.value == "string", l = a ? JSON.parse(i.value) : i.value, c = l.contentData;
      if (!c) return;
      const p = c.find((r) => r.contentTypeKey === s);
      if (!p) return;
      const h = p.values?.find((r) => r.alias === u);
      if (h) {
        const r = `${p.key}:${u}`;
        if (o.has(r)) {
          const y = typeof h.value == "string" ? h.value : "";
          h.value = `${y}
${n}`;
        } else
          h.value = n;
        o.add(r);
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
      o && typeof o.value == "string" && (o.value = K(o.value));
    }
  for (const n of e.destination.fields)
    if (n.type === "richText" && s.has(n.alias)) {
      const o = t.find((i) => i.alias === n.alias);
      o && typeof o.value == "string" && (o.value = M(R(o.value)));
    }
  const u = [...e.destination.blockGrids ?? [], ...e.destination.blockLists ?? []];
  for (const n of u) {
    const o = t.find((c) => c.alias === n.alias);
    if (!o?.value) continue;
    const i = typeof o.value == "string", a = i ? JSON.parse(o.value) : o.value, l = a.contentData;
    if (l) {
      for (const c of l)
        for (const p of n.blocks)
          if (p.identifyBy ? (() => {
            const r = c.values?.find((y) => y.alias === p.identifyBy.property);
            return r && typeof r.value == "string" && r.value.toLowerCase().includes(p.identifyBy.value.toLowerCase());
          })() : c.key === p.key) {
            for (const r of p.properties ?? []) {
              const y = `${c.key}:${r.alias}`;
              if ((r.type === "text" || r.type === "textArea") && s.has(y)) {
                const d = c.values?.find((v) => v.alias === r.alias);
                d && typeof d.value == "string" && (d.value = K(d.value));
              }
              if (r.type === "richText" && s.has(y)) {
                const d = c.values?.find((v) => v.alias === r.alias);
                d && typeof d.value == "string" && (d.value = M(R(d.value)));
              }
            }
            break;
          }
      o.value = i ? JSON.stringify(a) : a;
    }
  }
};
b.styles = [
  nt`
			:host {
				display: contents;
			}
		`
];
B([
  I()
], b.prototype, "_documentUnique", 2);
B([
  I()
], b.prototype, "_documentTypeUnique", 2);
B([
  I()
], b.prototype, "_hasWorkflows", 2);
b = B([
  ot("up-doc-collection-action")
], b);
const Ct = b;
export {
  b as UpDocCollectionActionElement,
  Ct as default
};
//# sourceMappingURL=up-doc-collection-action.element-DmqUGNCj.js.map
