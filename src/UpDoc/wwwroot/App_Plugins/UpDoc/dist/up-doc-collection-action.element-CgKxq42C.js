import { U as X, a as H, m as Q, b as Y } from "./transforms-DQCctQX1.js";
import { f as V } from "./workflow.service-BHEUOVK1.js";
import { html as R, css as Z, state as W, customElement as tt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as et } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as nt } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as j } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as ot } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as L } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as at } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as it } from "@umbraco-cms/backoffice/document-blueprint";
var st = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, G = (t) => {
  throw TypeError(t);
}, N = (t, e, n, r) => {
  for (var a = r > 1 ? void 0 : r ? rt(e, n) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (a = (r ? i(e, n, a) : i(a)) || a);
  return r && a && st(e, n, a), a;
}, J = (t, e, n) => e.has(t) || G("Cannot " + n), O = (t, e, n) => (J(t, e, "read from private field"), n ? n.call(t) : e.get(t)), M = (t, e, n) => e.has(t) ? G("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), k = (t, e, n) => (J(t, e, "access private method"), n), S, D, g, P, x, K, z;
let v = class extends et {
  constructor() {
    super(), M(this, g), M(this, S, new at(this)), M(this, D, new it(this)), this._hasWorkflows = !1, this.consumeContext(nt, (t) => {
      this.observe(t == null ? void 0 : t.unique, (e) => {
        this._documentUnique = e, k(this, g, P).call(this);
      }), this.observe(t == null ? void 0 : t.contentTypeUnique, (e) => {
        this._documentTypeUnique = e, k(this, g, P).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? R`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${k(this, g, x)}>
				Create from Source
			</uui-button>
		` : R``;
  }
};
S = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakSet();
P = async function() {
  var t;
  if (this._documentTypeUnique)
    try {
      const n = await (await this.getContext(j)).getLatestToken(), r = await V(n), a = new Set(r.blueprintIds), { data: s } = await O(this, S).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!((t = s == null ? void 0 : s.items) != null && t.length)) return;
      for (const i of s.items) {
        const { data: c } = await O(this, D).requestItemsByDocumentType(i.unique);
        if (c != null && c.some((l) => a.has(l.unique))) {
          this._hasWorkflows = !0;
          return;
        }
      }
    } catch {
    }
};
x = async function() {
  var a;
  if (!this._documentTypeUnique) return;
  const t = await this.getContext(ot), n = await (await this.getContext(j)).getLatestToken(), r = this._documentUnique ?? null;
  try {
    const s = await V(n), i = new Set(s.blueprintIds), { data: c } = await O(this, S).requestAllowedChildrenOf(
      this._documentTypeUnique,
      r
    );
    if (!((a = c == null ? void 0 : c.items) != null && a.length)) {
      t.peek("danger", {
        data: { message: "No document types are allowed as children of this page." }
      });
      return;
    }
    const l = [];
    for (const o of c.items) {
      const { data: _ } = await O(this, D).requestItemsByDocumentType(o.unique);
      if (_ != null && _.length) {
        const q = _.filter((C) => i.has(C.unique));
        q.length && l.push({
          documentTypeUnique: o.unique,
          documentTypeName: o.name,
          documentTypeIcon: o.icon ?? null,
          blueprints: q.map((C) => ({
            blueprintUnique: C.unique,
            blueprintName: C.name
          }))
        });
      }
    }
    if (!l.length) {
      t.peek("warning", {
        data: { message: "No workflows are configured for the document types allowed here." }
      });
      return;
    }
    let p;
    try {
      p = await L(this, X, {
        data: { documentTypes: l }
      });
    } catch {
      return;
    }
    const { blueprintUnique: y, documentTypeUnique: m } = p, f = l.find((o) => o.documentTypeUnique === m), d = f == null ? void 0 : f.blueprints.find((o) => o.blueprintUnique === y);
    let u;
    try {
      u = await L(this, H, {
        data: {
          unique: r,
          blueprintName: (d == null ? void 0 : d.blueprintName) ?? "",
          blueprintId: y
        }
      });
    } catch {
      return;
    }
    const { name: h, mediaUnique: A, extractedSections: B, config: T } = u;
    if (!A || !h || !T) return;
    const w = await fetch(
      `/umbraco/management/api/v1/document-blueprint/${y}/scaffold`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        }
      }
    );
    if (!w.ok) {
      const o = await w.json();
      t.peek("danger", {
        data: { message: `Failed to scaffold from blueprint: ${o.title || "Unknown error"}` }
      });
      return;
    }
    const b = await w.json(), $ = b.values ? JSON.parse(JSON.stringify(b.values)) : [];
    for (const o of T.map.mappings) {
      if (o.enabled === !1) continue;
      const _ = B[o.source];
      if (_)
        for (const q of o.destinations)
          k(this, g, K).call(this, $, q, _, T);
    }
    const F = {
      parent: r ? { id: r } : null,
      documentType: { id: m },
      template: b.template ? { id: b.template.id } : null,
      values: $,
      variants: [{ name: h, culture: null, segment: null }]
    }, E = await fetch("/umbraco/management/api/v1/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify(F)
    });
    if (!E.ok) {
      const o = await E.json();
      t.peek("danger", {
        data: { message: `Failed to create document: ${o.title || o.detail || "Unknown error"}` }
      });
      return;
    }
    const I = E.headers.get("Location"), U = I == null ? void 0 : I.split("/").pop();
    if (U) {
      const o = await fetch(`/umbraco/management/api/v1/document/${U}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${n}` }
      });
      if (o.ok) {
        const _ = await o.json();
        await fetch(`/umbraco/management/api/v1/document/${U}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${n}` },
          body: JSON.stringify(_)
        });
      }
    }
    if (t.peek("positive", {
      data: { message: `Document "${h}" created successfully!` }
    }), U) {
      const o = `/umbraco/section/content/workspace/document/edit/${U}`;
      setTimeout(() => {
        window.location.href = o;
      }, 150);
    }
  } catch (s) {
    console.error("Error creating document:", s), t.peek("danger", {
      data: { message: "An unexpected error occurred while creating the document." }
    });
  }
};
K = function(t, e, n, r) {
  var c, l, p, y;
  let a = n;
  const s = (c = e.transforms) == null ? void 0 : c.some((m) => m.type === "convertMarkdownToHtml"), i = e.target.split(".");
  if (i.length === 1) {
    const m = i[0], f = t.find((d) => d.alias === m);
    f ? f.value = a : t.push({ alias: m, value: a });
  } else if (i.length === 3) {
    const [m, f, d] = i, u = (l = r.destination.blockGrids) == null ? void 0 : l.find((w) => w.key === m), h = u == null ? void 0 : u.blocks.find((w) => w.key === f);
    if (!u || !h) return;
    const A = u.alias, B = ((y = (p = h.properties) == null ? void 0 : p.find((w) => w.key === d)) == null ? void 0 : y.alias) ?? d, T = h.identifyBy;
    if (!T) return;
    k(this, g, z).call(this, t, A, T, B, a, s);
  }
};
z = function(t, e, n, r, a, s) {
  var c, l;
  const i = t.find((p) => p.alias === e);
  if (!(!i || !i.value))
    try {
      const p = typeof i.value == "string", y = p ? JSON.parse(i.value) : i.value, m = y.contentData;
      if (!m) return;
      for (const f of m) {
        const d = (c = f.values) == null ? void 0 : c.find((u) => u.alias === n.property);
        if (d && typeof d.value == "string" && d.value.toLowerCase().includes(n.value.toLowerCase())) {
          const u = (l = f.values) == null ? void 0 : l.find((h) => h.alias === r);
          if (u)
            if (s) {
              const h = Q(a);
              u.value = Y(h);
            } else
              u.value = a;
          break;
        }
      }
      i.value = p ? JSON.stringify(y) : y;
    } catch (p) {
      console.error(`Failed to apply block mapping to ${e}:`, p);
    }
};
v.styles = [
  Z`
			:host {
				display: contents;
			}
		`
];
N([
  W()
], v.prototype, "_documentUnique", 2);
N([
  W()
], v.prototype, "_documentTypeUnique", 2);
N([
  W()
], v.prototype, "_hasWorkflows", 2);
v = N([
  tt("up-doc-collection-action")
], v);
const _t = v;
export {
  v as UpDocCollectionActionElement,
  _t as default
};
//# sourceMappingURL=up-doc-collection-action.element-CgKxq42C.js.map
