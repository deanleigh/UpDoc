import { U as Q } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { U as Y } from "./up-doc-modal.token-CsTR3cxa.js";
import { f as P } from "./workflow.service-D_fkSdCh.js";
import { b as R, m as V } from "./transforms-deUehta3.js";
import { html as W, css as Z, state as x, customElement as ee } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as te } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as ne } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as G } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as oe } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as L } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as ie } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as ae } from "@umbraco-cms/backoffice/document-blueprint";
var se = Object.defineProperty, re = Object.getOwnPropertyDescriptor, K = (e) => {
  throw TypeError(e);
}, O = (e, t, o, a) => {
  for (var n = a > 1 ? void 0 : a ? re(t, o) : t, l = e.length - 1, s; l >= 0; l--)
    (s = e[l]) && (n = (a ? s(t, o, n) : s(n)) || n);
  return a && n && se(t, o, n), n;
}, J = (e, t, o) => t.has(e) || K("Cannot " + o), q = (e, t, o) => (J(e, t, "read from private field"), o ? o.call(e) : t.get(e)), A = (e, t, o) => t.has(e) ? K("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), g = (e, t, o) => (J(e, t, "access private method"), o), B, D, h, E, j, z, I, H;
let k = class extends te {
  constructor() {
    super(), A(this, h), A(this, B, new ie(this)), A(this, D, new ae(this)), this._hasWorkflows = !1, this.consumeContext(ne, (e) => {
      this.observe(e?.unique, (t) => {
        this._documentUnique = t, g(this, h, E).call(this);
      }), this.observe(e?.contentTypeUnique, (t) => {
        this._documentTypeUnique = t, g(this, h, E).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? W`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${g(this, h, j)}>
				Create from Source
			</uui-button>
		` : W``;
  }
};
B = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
E = async function() {
  if (this._documentTypeUnique)
    try {
      const t = await (await this.getContext(G)).getLatestToken(), o = await P(t), a = new Set(o.blueprintIds), { data: n } = await q(this, B).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!n?.items?.length) return;
      for (const l of n.items) {
        const { data: s } = await q(this, D).requestItemsByDocumentType(l.unique);
        if (s?.some((i) => a.has(i.unique))) {
          this._hasWorkflows = !0;
          return;
        }
      }
    } catch {
    }
};
j = async function() {
  if (!this._documentTypeUnique) return;
  const e = await this.getContext(oe), o = await (await this.getContext(G)).getLatestToken(), a = this._documentUnique ?? null;
  try {
    const n = await P(o), l = new Set(n.blueprintIds), { data: s } = await q(this, B).requestAllowedChildrenOf(
      this._documentTypeUnique,
      a
    );
    if (!s?.items?.length) {
      e.peek("danger", {
        data: { message: "No document types are allowed as children of this page." }
      });
      return;
    }
    const i = [];
    for (const c of s.items) {
      const { data: w } = await q(this, D).requestItemsByDocumentType(c.unique);
      if (w?.length) {
        const U = w.filter((C) => l.has(C.unique));
        U.length && i.push({
          documentTypeUnique: c.unique,
          documentTypeName: c.name,
          documentTypeIcon: c.icon ?? null,
          blueprints: U.map((C) => ({
            blueprintUnique: C.unique,
            blueprintName: C.name
          }))
        });
      }
    }
    if (!i.length) {
      e.peek("warning", {
        data: { message: "No workflows are configured for the document types allowed here." }
      });
      return;
    }
    let r;
    try {
      r = await L(this, Q, {
        data: { documentTypes: i }
      });
    } catch {
      return;
    }
    const { blueprintUnique: u, documentTypeUnique: p } = r, f = i.find((c) => c.documentTypeUnique === p)?.blueprints.find((c) => c.blueprintUnique === u);
    let m;
    try {
      m = await L(this, Y, {
        data: {
          unique: a,
          blueprintName: f?.blueprintName ?? "",
          blueprintId: u
        }
      });
    } catch {
      return;
    }
    const { name: y, mediaUnique: v, sectionLookup: X, config: T } = m;
    if (!v || !y || !T) return;
    const S = await fetch(
      `/umbraco/management/api/v1/document-blueprint/${u}/scaffold`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${o}`
        }
      }
    );
    if (!S.ok) {
      const c = await S.json();
      e.peek("danger", {
        data: { message: `Failed to scaffold from blueprint: ${c.title || "Unknown error"}` }
      });
      return;
    }
    const b = await S.json(), $ = b.values ? JSON.parse(JSON.stringify(b.values)) : [], M = /* @__PURE__ */ new Set();
    for (const c of T.map.mappings) {
      if (c.enabled === !1) continue;
      const w = X[c.source];
      if (w)
        for (const U of c.destinations)
          g(this, h, z).call(this, $, U, w, T, M);
    }
    g(this, h, H).call(this, $, T, M);
    const F = {
      parent: a ? { id: a } : null,
      documentType: { id: p },
      template: b.template ? { id: b.template.id } : null,
      values: $,
      variants: [{ name: y, culture: null, segment: null }]
    }, N = await fetch("/umbraco/management/api/v1/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify(F)
    });
    if (!N.ok) {
      const c = await N.json();
      e.peek("danger", {
        data: { message: `Failed to create document: ${c.title || c.detail || "Unknown error"}` }
      });
      return;
    }
    const _ = N.headers.get("Location")?.split("/").pop();
    if (_) {
      const c = await fetch(`/umbraco/management/api/v1/document/${_}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${o}` }
      });
      if (c.ok) {
        const w = await c.json();
        await fetch(`/umbraco/management/api/v1/document/${_}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${o}` },
          body: JSON.stringify(w)
        });
      }
    }
    if (e.peek("positive", {
      data: { message: `Document "${y}" created successfully!` }
    }), _) {
      const c = `/umbraco/section/content/workspace/document/edit/${_}`;
      setTimeout(() => {
        window.location.href = c;
      }, 150);
    }
  } catch (n) {
    console.error("Error creating document:", n), e.peek("danger", {
      data: { message: "An unexpected error occurred while creating the document." }
    });
  }
};
z = function(e, t, o, a, n) {
  const l = o;
  if (t.blockKey) {
    for (const i of a.destination.blockGrids ?? []) {
      const r = i.blocks.find((u) => u.key === t.blockKey);
      if (r?.identifyBy) {
        g(this, h, I).call(this, e, i.alias, r.identifyBy, t.target, l, n);
        return;
      }
    }
    console.log(`Block ${t.blockKey} not found in destination config`);
    return;
  }
  const s = t.target.split(".");
  if (s.length === 1) {
    const i = s[0], r = e.find((u) => u.alias === i);
    if (r)
      if (n.has(i)) {
        const u = typeof r.value == "string" ? r.value : "";
        r.value = `${u} ${l}`;
      } else
        r.value = l;
    else
      e.push({ alias: i, value: l });
    n.add(i);
  } else if (s.length === 3) {
    const [i, r, u] = s, p = a.destination.blockGrids?.find((v) => v.key === i), d = p?.blocks.find((v) => v.key === r);
    if (!p || !d) return;
    const f = p.alias, m = d.properties?.find((v) => v.key === u)?.alias ?? u, y = d.identifyBy;
    if (!y) return;
    g(this, h, I).call(this, e, f, y, m, l, n);
  }
};
I = function(e, t, o, a, n, l) {
  const s = e.find((i) => i.alias === t);
  if (!(!s || !s.value))
    try {
      const i = typeof s.value == "string", r = i ? JSON.parse(s.value) : s.value, u = r.contentData;
      if (!u) return;
      for (const p of u) {
        const d = p.values?.find((f) => f.alias === o.property);
        if (d && typeof d.value == "string" && d.value.toLowerCase().includes(o.value.toLowerCase())) {
          const f = p.values?.find((m) => m.alias === a);
          if (f) {
            const m = `${p.key}:${a}`;
            if (l.has(m)) {
              const y = typeof f.value == "string" ? f.value : "";
              f.value = `${y}
${n}`;
            } else
              f.value = n;
            l.add(m);
          }
          break;
        }
      }
      s.value = i ? JSON.stringify(r) : r;
    } catch (i) {
      console.error(`Failed to apply block mapping to ${t}:`, i);
    }
};
H = function(e, t, o) {
  for (const a of t.destination.fields)
    if (a.type === "richText" && o.has(a.alias)) {
      const n = e.find((l) => l.alias === a.alias);
      n && typeof n.value == "string" && (n.value = R(V(n.value)));
    }
  for (const a of t.destination.blockGrids ?? []) {
    const n = e.find((r) => r.alias === a.alias);
    if (!n?.value) continue;
    const l = typeof n.value == "string", s = l ? JSON.parse(n.value) : n.value, i = s.contentData;
    if (i) {
      for (const r of i)
        for (const u of a.blocks) {
          if (!u.identifyBy) continue;
          const p = r.values?.find((d) => d.alias === u.identifyBy.property);
          if (p && typeof p.value == "string" && p.value.toLowerCase().includes(u.identifyBy.value.toLowerCase())) {
            for (const d of u.properties ?? [])
              if (d.type === "richText" && o.has(`${r.key}:${d.alias}`)) {
                const f = r.values?.find((m) => m.alias === d.alias);
                f && typeof f.value == "string" && (f.value = R(V(f.value)));
              }
            break;
          }
        }
      n.value = l ? JSON.stringify(s) : s;
    }
  }
};
k.styles = [
  Z`
			:host {
				display: contents;
			}
		`
];
O([
  x()
], k.prototype, "_documentUnique", 2);
O([
  x()
], k.prototype, "_documentTypeUnique", 2);
O([
  x()
], k.prototype, "_hasWorkflows", 2);
k = O([
  ee("up-doc-collection-action")
], k);
const _e = k;
export {
  k as UpDocCollectionActionElement,
  _e as default
};
//# sourceMappingURL=up-doc-collection-action.element-CGu80fzN.js.map
