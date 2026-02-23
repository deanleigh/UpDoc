import { U as F } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { U as ee } from "./up-doc-modal.token-DHoS03yR.js";
import { f as G } from "./workflow.service-DSRz0gSB.js";
import { s as V, b as R, m as W } from "./transforms-BkZeboOX.js";
import { html as L, css as te, state as I, customElement as ne } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as oe } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as ae } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as K } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as ie } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as P } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as se } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as re } from "@umbraco-cms/backoffice/document-blueprint";
var ce = Object.defineProperty, le = Object.getOwnPropertyDescriptor, J = (e) => {
  throw TypeError(e);
}, O = (e, n, o, a) => {
  for (var t = a > 1 ? void 0 : a ? le(n, o) : n, c = e.length - 1, s; c >= 0; c--)
    (s = e[c]) && (t = (a ? s(n, o, t) : s(t)) || t);
  return a && t && ce(n, o, t), t;
}, j = (e, n, o) => n.has(e) || J("Cannot " + o), q = (e, n, o) => (j(e, n, "read from private field"), o ? o.call(e) : n.get(e)), x = (e, n, o) => n.has(e) ? J("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, o), g = (e, n, o) => (j(e, n, "access private method"), o), B, D, y, A, z, H, E, X;
let k = class extends oe {
  constructor() {
    super(), x(this, y), x(this, B, new se(this)), x(this, D, new re(this)), this._hasWorkflows = !1, this.consumeContext(ae, (e) => {
      this.observe(e?.unique, (n) => {
        this._documentUnique = n, g(this, y, A).call(this);
      }), this.observe(e?.contentTypeUnique, (n) => {
        this._documentTypeUnique = n, g(this, y, A).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? L`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${g(this, y, z)}>
				Create from Source
			</uui-button>
		` : L``;
  }
};
B = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakSet();
A = async function() {
  if (this._documentTypeUnique)
    try {
      const n = await (await this.getContext(K)).getLatestToken(), o = await G(n), a = new Set(o.blueprintIds), { data: t } = await q(this, B).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!t?.items?.length) return;
      for (const c of t.items) {
        const { data: s } = await q(this, D).requestItemsByDocumentType(c.unique);
        if (s?.some((i) => a.has(i.unique))) {
          this._hasWorkflows = !0;
          return;
        }
      }
    } catch {
    }
};
z = async function() {
  if (!this._documentTypeUnique) return;
  const e = await this.getContext(ie), o = await (await this.getContext(K)).getLatestToken(), a = this._documentUnique ?? null;
  try {
    const t = await G(o), c = new Set(t.blueprintIds), { data: s } = await q(this, B).requestAllowedChildrenOf(
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
    for (const l of s.items) {
      const { data: w } = await q(this, D).requestItemsByDocumentType(l.unique);
      if (w?.length) {
        const U = w.filter((C) => c.has(C.unique));
        U.length && i.push({
          documentTypeUnique: l.unique,
          documentTypeName: l.name,
          documentTypeIcon: l.icon ?? null,
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
      r = await P(this, F, {
        data: { documentTypes: i }
      });
    } catch {
      return;
    }
    const { blueprintUnique: u, documentTypeUnique: d } = r, m = i.find((l) => l.documentTypeUnique === d)?.blueprints.find((l) => l.blueprintUnique === u);
    let f;
    try {
      f = await P(this, ee, {
        data: {
          unique: a,
          blueprintName: m?.blueprintName ?? "",
          blueprintId: u
        }
      });
    } catch {
      return;
    }
    const { name: h, mediaUnique: v, sourceUrl: Q, sectionLookup: Y, config: T } = f;
    if (!h || !T || !v && !Q) return;
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
      const l = await S.json();
      e.peek("danger", {
        data: { message: `Failed to scaffold from blueprint: ${l.title || "Unknown error"}` }
      });
      return;
    }
    const b = await S.json(), $ = b.values ? JSON.parse(JSON.stringify(b.values)) : [], M = /* @__PURE__ */ new Set();
    for (const l of T.map.mappings) {
      if (l.enabled === !1) continue;
      const w = Y[l.source];
      if (w)
        for (const U of l.destinations)
          g(this, y, H).call(this, $, U, w, T, M);
    }
    g(this, y, X).call(this, $, T, M);
    const Z = {
      parent: a ? { id: a } : null,
      documentType: { id: d },
      template: b.template ? { id: b.template.id } : null,
      values: $,
      variants: [{ name: h, culture: null, segment: null }]
    }, N = await fetch("/umbraco/management/api/v1/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify(Z)
    });
    if (!N.ok) {
      const l = await N.json();
      e.peek("danger", {
        data: { message: `Failed to create document: ${l.title || l.detail || "Unknown error"}` }
      });
      return;
    }
    const _ = N.headers.get("Location")?.split("/").pop();
    if (_) {
      const l = await fetch(`/umbraco/management/api/v1/document/${_}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${o}` }
      });
      if (l.ok) {
        const w = await l.json();
        await fetch(`/umbraco/management/api/v1/document/${_}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${o}` },
          body: JSON.stringify(w)
        });
      }
    }
    if (e.peek("positive", {
      data: { message: `Document "${h}" created successfully!` }
    }), _) {
      const l = `/umbraco/section/content/workspace/document/edit/${_}`;
      setTimeout(() => {
        window.location.href = l;
      }, 150);
    }
  } catch (t) {
    console.error("Error creating document:", t), e.peek("danger", {
      data: { message: "An unexpected error occurred while creating the document." }
    });
  }
};
H = function(e, n, o, a, t) {
  const c = o;
  if (n.blockKey) {
    for (const i of a.destination.blockGrids ?? []) {
      const r = i.blocks.find((u) => u.key === n.blockKey);
      if (r?.identifyBy) {
        g(this, y, E).call(this, e, i.alias, r.identifyBy, n.target, c, t);
        return;
      }
    }
    console.log(`Block ${n.blockKey} not found in destination config`);
    return;
  }
  const s = n.target.split(".");
  if (s.length === 1) {
    const i = s[0], r = e.find((u) => u.alias === i);
    if (r)
      if (t.has(i)) {
        const u = typeof r.value == "string" ? r.value : "";
        r.value = `${u} ${c}`;
      } else
        r.value = c;
    else
      e.push({ alias: i, value: c });
    t.add(i);
  } else if (s.length === 3) {
    const [i, r, u] = s, d = a.destination.blockGrids?.find((v) => v.key === i), p = d?.blocks.find((v) => v.key === r);
    if (!d || !p) return;
    const m = d.alias, f = p.properties?.find((v) => v.key === u)?.alias ?? u, h = p.identifyBy;
    if (!h) return;
    g(this, y, E).call(this, e, m, h, f, c, t);
  }
};
E = function(e, n, o, a, t, c) {
  const s = e.find((i) => i.alias === n);
  if (!(!s || !s.value))
    try {
      const i = typeof s.value == "string", r = i ? JSON.parse(s.value) : s.value, u = r.contentData;
      if (!u) return;
      for (const d of u) {
        const p = d.values?.find((m) => m.alias === o.property);
        if (p && typeof p.value == "string" && p.value.toLowerCase().includes(o.value.toLowerCase())) {
          const m = d.values?.find((f) => f.alias === a);
          if (m) {
            const f = `${d.key}:${a}`;
            if (c.has(f)) {
              const h = typeof m.value == "string" ? m.value : "";
              m.value = `${h}
${t}`;
            } else
              m.value = t;
            c.add(f);
          }
          break;
        }
      }
      s.value = i ? JSON.stringify(r) : r;
    } catch (i) {
      console.error(`Failed to apply block mapping to ${n}:`, i);
    }
};
X = function(e, n, o) {
  for (const a of n.destination.fields)
    if ((a.type === "text" || a.type === "textArea") && o.has(a.alias)) {
      const t = e.find((c) => c.alias === a.alias);
      t && typeof t.value == "string" && (t.value = V(t.value));
    }
  for (const a of n.destination.fields)
    if (a.type === "richText" && o.has(a.alias)) {
      const t = e.find((c) => c.alias === a.alias);
      t && typeof t.value == "string" && (t.value = R(W(t.value)));
    }
  for (const a of n.destination.blockGrids ?? []) {
    const t = e.find((r) => r.alias === a.alias);
    if (!t?.value) continue;
    const c = typeof t.value == "string", s = c ? JSON.parse(t.value) : t.value, i = s.contentData;
    if (i) {
      for (const r of i)
        for (const u of a.blocks) {
          if (!u.identifyBy) continue;
          const d = r.values?.find((p) => p.alias === u.identifyBy.property);
          if (d && typeof d.value == "string" && d.value.toLowerCase().includes(u.identifyBy.value.toLowerCase())) {
            for (const p of u.properties ?? []) {
              const m = `${r.key}:${p.alias}`;
              if ((p.type === "text" || p.type === "textArea") && o.has(m)) {
                const f = r.values?.find((h) => h.alias === p.alias);
                f && typeof f.value == "string" && (f.value = V(f.value));
              }
              if (p.type === "richText" && o.has(m)) {
                const f = r.values?.find((h) => h.alias === p.alias);
                f && typeof f.value == "string" && (f.value = R(W(f.value)));
              }
            }
            break;
          }
        }
      t.value = c ? JSON.stringify(s) : s;
    }
  }
};
k.styles = [
  te`
			:host {
				display: contents;
			}
		`
];
O([
  I()
], k.prototype, "_documentUnique", 2);
O([
  I()
], k.prototype, "_documentTypeUnique", 2);
O([
  I()
], k.prototype, "_hasWorkflows", 2);
k = O([
  ne("up-doc-collection-action")
], k);
const be = k;
export {
  k as UpDocCollectionActionElement,
  be as default
};
//# sourceMappingURL=up-doc-collection-action.element-BPz9vL1C.js.map
