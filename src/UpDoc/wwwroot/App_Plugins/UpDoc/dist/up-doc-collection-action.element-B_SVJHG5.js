import { U as H } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { U as Q } from "./up-doc-modal.token-CsTR3cxa.js";
import { f as V } from "./workflow.service-DYhRHB0r.js";
import { html as K, css as Y, state as P, customElement as Z } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as tt } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as et } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as G } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as nt } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as L } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as ot } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as it } from "@umbraco-cms/backoffice/document-blueprint";
var at = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, j = (t) => {
  throw TypeError(t);
}, $ = (t, e, n, u) => {
  for (var i = u > 1 ? void 0 : u ? rt(e, n) : e, s = t.length - 1, p; s >= 0; s--)
    (p = t[s]) && (i = (u ? p(e, n, i) : p(i)) || i);
  return u && i && at(e, n, i), i;
}, J = (t, e, n) => e.has(t) || j("Cannot " + n), S = (t, e, n) => (J(t, e, "read from private field"), n ? n.call(t) : e.get(t)), I = (t, e, n) => e.has(t) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), U = (t, e, n) => (J(t, e, "access private method"), n), N, D, _, M, x, z, W;
let T = class extends tt {
  constructor() {
    super(), I(this, _), I(this, N, new ot(this)), I(this, D, new it(this)), this._hasWorkflows = !1, this.consumeContext(et, (t) => {
      this.observe(t == null ? void 0 : t.unique, (e) => {
        this._documentUnique = e, U(this, _, M).call(this);
      }), this.observe(t == null ? void 0 : t.contentTypeUnique, (e) => {
        this._documentTypeUnique = e, U(this, _, M).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? K`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${U(this, _, x)}>
				Create from Source
			</uui-button>
		` : K``;
  }
};
N = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakSet();
M = async function() {
  var t;
  if (this._documentTypeUnique)
    try {
      const n = await (await this.getContext(G)).getLatestToken(), u = await V(n), i = new Set(u.blueprintIds), { data: s } = await S(this, N).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!((t = s == null ? void 0 : s.items) != null && t.length)) return;
      for (const p of s.items) {
        const { data: a } = await S(this, D).requestItemsByDocumentType(p.unique);
        if (a != null && a.some((m) => i.has(m.unique))) {
          this._hasWorkflows = !0;
          return;
        }
      }
    } catch {
    }
};
x = async function() {
  var i;
  if (!this._documentTypeUnique) return;
  const t = await this.getContext(nt), n = await (await this.getContext(G)).getLatestToken(), u = this._documentUnique ?? null;
  try {
    const s = await V(n), p = new Set(s.blueprintIds), { data: a } = await S(this, N).requestAllowedChildrenOf(
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
      const { data: w } = await S(this, D).requestItemsByDocumentType(o.unique);
      if (w != null && w.length) {
        const O = w.filter((B) => p.has(B.unique));
        O.length && m.push({
          documentTypeUnique: o.unique,
          documentTypeName: o.name,
          documentTypeIcon: o.icon ?? null,
          blueprints: O.map((B) => ({
            blueprintUnique: B.unique,
            blueprintName: B.name
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
      v = await L(this, H, {
        data: { documentTypes: m }
      });
    } catch {
      return;
    }
    const { blueprintUnique: d, documentTypeUnique: g } = v, c = m.find((o) => o.documentTypeUnique === g), r = c == null ? void 0 : c.blueprints.find((o) => o.blueprintUnique === d);
    let f;
    try {
      f = await L(this, Q, {
        data: {
          unique: u,
          blueprintName: (r == null ? void 0 : r.blueprintName) ?? "",
          blueprintId: d
        }
      });
    } catch {
      return;
    }
    const { name: l, mediaUnique: h, extractedSections: b, config: q } = f;
    if (!h || !l || !q) return;
    const k = await fetch(
      `/umbraco/management/api/v1/document-blueprint/${d}/scaffold`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        }
      }
    );
    if (!k.ok) {
      const o = await k.json();
      t.peek("danger", {
        data: { message: `Failed to scaffold from blueprint: ${o.title || "Unknown error"}` }
      });
      return;
    }
    const y = await k.json(), R = y.values ? JSON.parse(JSON.stringify(y.values)) : [], X = /* @__PURE__ */ new Set();
    for (const o of q.map.mappings) {
      if (o.enabled === !1) continue;
      const w = b[o.source];
      if (w)
        for (const O of o.destinations)
          U(this, _, z).call(this, R, O, w, q, X);
    }
    const F = {
      parent: u ? { id: u } : null,
      documentType: { id: g },
      template: y.template ? { id: y.template.id } : null,
      values: R,
      variants: [{ name: l, culture: null, segment: null }]
    }, A = await fetch("/umbraco/management/api/v1/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify(F)
    });
    if (!A.ok) {
      const o = await A.json();
      t.peek("danger", {
        data: { message: `Failed to create document: ${o.title || o.detail || "Unknown error"}` }
      });
      return;
    }
    const E = A.headers.get("Location"), C = E == null ? void 0 : E.split("/").pop();
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
z = function(t, e, n, u, i) {
  var m, v, d, g;
  let s = n;
  const p = (m = e.transforms) == null ? void 0 : m.some((c) => c.type === "convertMarkdownToHtml");
  if (e.blockKey) {
    for (const c of u.destination.blockGrids ?? []) {
      const r = c.blocks.find((f) => f.key === e.blockKey);
      if (r != null && r.identifyBy) {
        U(this, _, W).call(this, t, c.alias, r.identifyBy, e.target, s, p, i);
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
    const [c, r, f] = a, l = (v = u.destination.blockGrids) == null ? void 0 : v.find((y) => y.key === c), h = l == null ? void 0 : l.blocks.find((y) => y.key === r);
    if (!l || !h) return;
    const b = l.alias, q = ((g = (d = h.properties) == null ? void 0 : d.find((y) => y.key === f)) == null ? void 0 : g.alias) ?? f, k = h.identifyBy;
    if (!k) return;
    U(this, _, W).call(this, t, b, k, q, s, p, i);
  }
};
W = function(t, e, n, u, i, s, p) {
  var m, v;
  const a = t.find((d) => d.alias === e);
  if (!(!a || !a.value))
    try {
      const d = typeof a.value == "string", g = d ? JSON.parse(a.value) : a.value, c = g.contentData;
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
      a.value = d ? JSON.stringify(g) : g;
    } catch (d) {
      console.error(`Failed to apply block mapping to ${e}:`, d);
    }
};
T.styles = [
  Y`
			:host {
				display: contents;
			}
		`
];
$([
  P()
], T.prototype, "_documentUnique", 2);
$([
  P()
], T.prototype, "_documentTypeUnique", 2);
$([
  P()
], T.prototype, "_hasWorkflows", 2);
T = $([
  Z("up-doc-collection-action")
], T);
const wt = T;
export {
  T as UpDocCollectionActionElement,
  wt as default
};
//# sourceMappingURL=up-doc-collection-action.element-B_SVJHG5.js.map
