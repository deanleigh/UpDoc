import { U as Q } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { U as Y } from "./up-doc-modal.token-CsTR3cxa.js";
import { f as G } from "./workflow.service-CD2_oFgA.js";
import { html as V, css as Z, state as R, customElement as tt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as et } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as nt } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as j } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as ot } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as L } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as it } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as at } from "@umbraco-cms/backoffice/document-blueprint";
var rt = Object.defineProperty, st = Object.getOwnPropertyDescriptor, J = (t) => {
  throw TypeError(t);
}, N = (t, e, n, u) => {
  for (var i = u > 1 ? void 0 : u ? st(e, n) : e, s = t.length - 1, p; s >= 0; s--)
    (p = t[s]) && (i = (u ? p(e, n, i) : p(i)) || i);
  return u && i && rt(e, n, i), i;
}, x = (t, e, n) => e.has(t) || J("Cannot " + n), $ = (t, e, n) => (x(t, e, "read from private field"), n ? n.call(t) : e.get(t)), M = (t, e, n) => e.has(t) ? J("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), U = (t, e, n) => (x(t, e, "access private method"), n), D, A, _, W, z, X, P;
let T = class extends et {
  constructor() {
    super(), M(this, _), M(this, D, new it(this)), M(this, A, new at(this)), this._hasWorkflows = !1, this.consumeContext(nt, (t) => {
      this.observe(t == null ? void 0 : t.unique, (e) => {
        this._documentUnique = e, U(this, _, W).call(this);
      }), this.observe(t == null ? void 0 : t.contentTypeUnique, (e) => {
        this._documentTypeUnique = e, U(this, _, W).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? V`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${U(this, _, z)}>
				Create from Source
			</uui-button>
		` : V``;
  }
};
D = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakSet();
W = async function() {
  var t;
  if (this._documentTypeUnique)
    try {
      const n = await (await this.getContext(j)).getLatestToken(), u = await G(n), i = new Set(u.blueprintIds), { data: s } = await $(this, D).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!((t = s == null ? void 0 : s.items) != null && t.length)) return;
      for (const p of s.items) {
        const { data: a } = await $(this, A).requestItemsByDocumentType(p.unique);
        if (a != null && a.some((m) => i.has(m.unique))) {
          this._hasWorkflows = !0;
          return;
        }
      }
    } catch {
    }
};
z = async function() {
  var i;
  if (!this._documentTypeUnique) return;
  const t = await this.getContext(ot), n = await (await this.getContext(j)).getLatestToken(), u = this._documentUnique ?? null;
  try {
    const s = await G(n), p = new Set(s.blueprintIds), { data: a } = await $(this, D).requestAllowedChildrenOf(
      this._documentTypeUnique,
      u
    );
    if (!((i = a == null ? void 0 : a.items) != null && i.length)) {
      t.peek("danger", {
        data: { message: "No document types are allowed as children of this page." }
      });
      return;
    }
    const m = [];
    for (const o of a.items) {
      const { data: w } = await $(this, A).requestItemsByDocumentType(o.unique);
      if (w != null && w.length) {
        const B = w.filter((S) => p.has(S.unique));
        B.length && m.push({
          documentTypeUnique: o.unique,
          documentTypeName: o.name,
          documentTypeIcon: o.icon ?? null,
          blueprints: B.map((S) => ({
            blueprintUnique: S.unique,
            blueprintName: S.name
          }))
        });
      }
    }
    if (!m.length) {
      t.peek("warning", {
        data: { message: "No workflows are configured for the document types allowed here." }
      });
      return;
    }
    let v;
    try {
      v = await L(this, Q, {
        data: { documentTypes: m }
      });
    } catch {
      return;
    }
    const { blueprintUnique: d, documentTypeUnique: y } = v, c = m.find((o) => o.documentTypeUnique === y), r = c == null ? void 0 : c.blueprints.find((o) => o.blueprintUnique === d);
    let f;
    try {
      f = await L(this, Y, {
        data: {
          unique: u,
          blueprintName: (r == null ? void 0 : r.blueprintName) ?? "",
          blueprintId: d
        }
      });
    } catch {
      return;
    }
    const { name: l, mediaUnique: h, extractedSections: b, sectionLookup: q, config: k } = f;
    if (!h || !l || !k) return;
    const g = await fetch(
      `/umbraco/management/api/v1/document-blueprint/${d}/scaffold`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        }
      }
    );
    if (!g.ok) {
      const o = await g.json();
      t.peek("danger", {
        data: { message: `Failed to scaffold from blueprint: ${o.title || "Unknown error"}` }
      });
      return;
    }
    const O = await g.json(), K = O.values ? JSON.parse(JSON.stringify(O.values)) : [], F = /* @__PURE__ */ new Set();
    for (const o of k.map.mappings) {
      if (o.enabled === !1) continue;
      const w = (q == null ? void 0 : q[o.source]) ?? b[o.source];
      if (w)
        for (const B of o.destinations)
          U(this, _, X).call(this, K, B, w, k, F);
    }
    const H = {
      parent: u ? { id: u } : null,
      documentType: { id: y },
      template: O.template ? { id: O.template.id } : null,
      values: K,
      variants: [{ name: l, culture: null, segment: null }]
    }, E = await fetch("/umbraco/management/api/v1/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify(H)
    });
    if (!E.ok) {
      const o = await E.json();
      t.peek("danger", {
        data: { message: `Failed to create document: ${o.title || o.detail || "Unknown error"}` }
      });
      return;
    }
    const I = E.headers.get("Location"), C = I == null ? void 0 : I.split("/").pop();
    if (C) {
      const o = await fetch(`/umbraco/management/api/v1/document/${C}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${n}` }
      });
      if (o.ok) {
        const w = await o.json();
        await fetch(`/umbraco/management/api/v1/document/${C}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${n}` },
          body: JSON.stringify(w)
        });
      }
    }
    if (t.peek("positive", {
      data: { message: `Document "${l}" created successfully!` }
    }), C) {
      const o = `/umbraco/section/content/workspace/document/edit/${C}`;
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
X = function(t, e, n, u, i) {
  var m, v, d, y;
  let s = n;
  const p = (m = e.transforms) == null ? void 0 : m.some((c) => c.type === "convertMarkdownToHtml");
  if (e.blockKey) {
    for (const c of u.destination.blockGrids ?? []) {
      const r = c.blocks.find((f) => f.key === e.blockKey);
      if (r != null && r.identifyBy) {
        U(this, _, P).call(this, t, c.alias, r.identifyBy, e.target, s, p, i);
        return;
      }
    }
    console.log(`Block ${e.blockKey} not found in destination config`);
    return;
  }
  const a = e.target.split(".");
  if (a.length === 1) {
    const c = a[0], r = t.find((f) => f.alias === c);
    if (r)
      if (i.has(c)) {
        const f = typeof r.value == "string" ? r.value : "";
        r.value = `${f} ${s}`;
      } else
        r.value = s;
    else
      t.push({ alias: c, value: s });
    i.add(c);
  } else if (a.length === 3) {
    const [c, r, f] = a, l = (v = u.destination.blockGrids) == null ? void 0 : v.find((g) => g.key === c), h = l == null ? void 0 : l.blocks.find((g) => g.key === r);
    if (!l || !h) return;
    const b = l.alias, q = ((y = (d = h.properties) == null ? void 0 : d.find((g) => g.key === f)) == null ? void 0 : y.alias) ?? f, k = h.identifyBy;
    if (!k) return;
    U(this, _, P).call(this, t, b, k, q, s, p, i);
  }
};
P = function(t, e, n, u, i, s, p) {
  var m, v;
  const a = t.find((d) => d.alias === e);
  if (!(!a || !a.value))
    try {
      const d = typeof a.value == "string", y = d ? JSON.parse(a.value) : a.value, c = y.contentData;
      if (!c) return;
      for (const r of c) {
        const f = (m = r.values) == null ? void 0 : m.find((l) => l.alias === n.property);
        if (f && typeof f.value == "string" && f.value.toLowerCase().includes(n.value.toLowerCase())) {
          const l = (v = r.values) == null ? void 0 : v.find((h) => h.alias === u);
          if (l) {
            const h = `${r.key}:${u}`;
            if (p.has(h)) {
              const b = typeof l.value == "string" ? l.value : "";
              l.value = `${b}
${i}`;
            } else
              l.value = i;
            p.add(h);
          }
          break;
        }
      }
      a.value = d ? JSON.stringify(y) : y;
    } catch (d) {
      console.error(`Failed to apply block mapping to ${e}:`, d);
    }
};
T.styles = [
  Z`
			:host {
				display: contents;
			}
		`
];
N([
  R()
], T.prototype, "_documentUnique", 2);
N([
  R()
], T.prototype, "_documentTypeUnique", 2);
N([
  R()
], T.prototype, "_hasWorkflows", 2);
T = N([
  tt("up-doc-collection-action")
], T);
const vt = T;
export {
  T as UpDocCollectionActionElement,
  vt as default
};
//# sourceMappingURL=up-doc-collection-action.element-D-OfPM3Q.js.map
