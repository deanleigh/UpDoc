import { U as X } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { U as F } from "./up-doc-modal.token-CsTR3cxa.js";
import { f as R } from "./workflow.service-T0TEyrPt.js";
import { html as W, css as Q, state as M, customElement as Y } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Z } from "@umbraco-cms/backoffice/lit-element";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as ee } from "@umbraco-cms/backoffice/document";
import { UMB_AUTH_CONTEXT as L } from "@umbraco-cms/backoffice/auth";
import { UMB_NOTIFICATION_CONTEXT as te } from "@umbraco-cms/backoffice/notification";
import { umbOpenModal as P } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentTypeStructureRepository as ne } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as oe } from "@umbraco-cms/backoffice/document-blueprint";
var ae = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, G = (e) => {
  throw TypeError(e);
}, O = (e, t, n, c) => {
  for (var a = c > 1 ? void 0 : c ? ie(t, n) : t, u = e.length - 1, l; u >= 0; u--)
    (l = e[u]) && (a = (c ? l(t, n, a) : l(a)) || a);
  return c && a && ae(t, n, a), a;
}, K = (e, t, n) => t.has(e) || G("Cannot " + n), q = (e, t, n) => (K(e, t, "read from private field"), n ? n.call(e) : t.get(e)), A = (e, t, n) => t.has(e) ? G("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), _ = (e, t, n) => (K(e, t, "access private method"), n), B, D, y, E, V, j, I;
let k = class extends Z {
  constructor() {
    super(), A(this, y), A(this, B, new ne(this)), A(this, D, new oe(this)), this._hasWorkflows = !1, this.consumeContext(ee, (e) => {
      this.observe(e?.unique, (t) => {
        this._documentUnique = t, _(this, y, E).call(this);
      }), this.observe(e?.contentTypeUnique, (t) => {
        this._documentTypeUnique = t, _(this, y, E).call(this);
      });
    });
  }
  render() {
    return this._hasWorkflows ? W`
			<uui-button
				color="default"
				look="outline"
				label="Create from Source"
				@click=${_(this, y, V)}>
				Create from Source
			</uui-button>
		` : W``;
  }
};
B = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakSet();
E = async function() {
  if (this._documentTypeUnique)
    try {
      const t = await (await this.getContext(L)).getLatestToken(), n = await R(t), c = new Set(n.blueprintIds), { data: a } = await q(this, B).requestAllowedChildrenOf(
        this._documentTypeUnique,
        this._documentUnique || null
      );
      if (!a?.items?.length) return;
      for (const u of a.items) {
        const { data: l } = await q(this, D).requestItemsByDocumentType(u.unique);
        if (l?.some((r) => c.has(r.unique))) {
          this._hasWorkflows = !0;
          return;
        }
      }
    } catch {
    }
};
V = async function() {
  if (!this._documentTypeUnique) return;
  const e = await this.getContext(te), n = await (await this.getContext(L)).getLatestToken(), c = this._documentUnique ?? null;
  try {
    const a = await R(n), u = new Set(a.blueprintIds), { data: l } = await q(this, B).requestAllowedChildrenOf(
      this._documentTypeUnique,
      c
    );
    if (!l?.items?.length) {
      e.peek("danger", {
        data: { message: "No document types are allowed as children of this page." }
      });
      return;
    }
    const r = [];
    for (const o of l.items) {
      const { data: g } = await q(this, D).requestItemsByDocumentType(o.unique);
      if (g?.length) {
        const U = g.filter((C) => u.has(C.unique));
        U.length && r.push({
          documentTypeUnique: o.unique,
          documentTypeName: o.name,
          documentTypeIcon: o.icon ?? null,
          blueprints: U.map((C) => ({
            blueprintUnique: C.unique,
            blueprintName: C.name
          }))
        });
      }
    }
    if (!r.length) {
      e.peek("warning", {
        data: { message: "No workflows are configured for the document types allowed here." }
      });
      return;
    }
    let i;
    try {
      i = await P(this, X, {
        data: { documentTypes: r }
      });
    } catch {
      return;
    }
    const { blueprintUnique: s, documentTypeUnique: p } = i, m = r.find((o) => o.documentTypeUnique === p)?.blueprints.find((o) => o.blueprintUnique === s);
    let d;
    try {
      d = await P(this, F, {
        data: {
          unique: c,
          blueprintName: m?.blueprintName ?? "",
          blueprintId: s
        }
      });
    } catch {
      return;
    }
    const { name: f, mediaUnique: v, extractedSections: w, sectionLookup: J, config: S } = d;
    if (!v || !f || !S) return;
    const $ = await fetch(
      `/umbraco/management/api/v1/document-blueprint/${s}/scaffold`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        }
      }
    );
    if (!$.ok) {
      const o = await $.json();
      e.peek("danger", {
        data: { message: `Failed to scaffold from blueprint: ${o.title || "Unknown error"}` }
      });
      return;
    }
    const b = await $.json(), x = b.values ? JSON.parse(JSON.stringify(b.values)) : [], z = /* @__PURE__ */ new Set();
    for (const o of S.map.mappings) {
      if (o.enabled === !1) continue;
      const g = J?.[o.source] ?? w[o.source];
      if (g)
        for (const U of o.destinations)
          _(this, y, j).call(this, x, U, g, S, z);
    }
    const H = {
      parent: c ? { id: c } : null,
      documentType: { id: p },
      template: b.template ? { id: b.template.id } : null,
      values: x,
      variants: [{ name: f, culture: null, segment: null }]
    }, N = await fetch("/umbraco/management/api/v1/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify(H)
    });
    if (!N.ok) {
      const o = await N.json();
      e.peek("danger", {
        data: { message: `Failed to create document: ${o.title || o.detail || "Unknown error"}` }
      });
      return;
    }
    const T = N.headers.get("Location")?.split("/").pop();
    if (T) {
      const o = await fetch(`/umbraco/management/api/v1/document/${T}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${n}` }
      });
      if (o.ok) {
        const g = await o.json();
        await fetch(`/umbraco/management/api/v1/document/${T}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${n}` },
          body: JSON.stringify(g)
        });
      }
    }
    if (e.peek("positive", {
      data: { message: `Document "${f}" created successfully!` }
    }), T) {
      const o = `/umbraco/section/content/workspace/document/edit/${T}`;
      setTimeout(() => {
        window.location.href = o;
      }, 150);
    }
  } catch (a) {
    console.error("Error creating document:", a), e.peek("danger", {
      data: { message: "An unexpected error occurred while creating the document." }
    });
  }
};
j = function(e, t, n, c, a) {
  let u = n;
  const l = t.transforms?.some((i) => i.type === "convertMarkdownToHtml");
  if (t.blockKey) {
    for (const i of c.destination.blockGrids ?? []) {
      const s = i.blocks.find((p) => p.key === t.blockKey);
      if (s?.identifyBy) {
        _(this, y, I).call(this, e, i.alias, s.identifyBy, t.target, u, l, a);
        return;
      }
    }
    console.log(`Block ${t.blockKey} not found in destination config`);
    return;
  }
  const r = t.target.split(".");
  if (r.length === 1) {
    const i = r[0], s = e.find((p) => p.alias === i);
    if (s)
      if (a.has(i)) {
        const p = typeof s.value == "string" ? s.value : "";
        s.value = `${p} ${u}`;
      } else
        s.value = u;
    else
      e.push({ alias: i, value: u });
    a.add(i);
  } else if (r.length === 3) {
    const [i, s, p] = r, h = c.destination.blockGrids?.find((w) => w.key === i), m = h?.blocks.find((w) => w.key === s);
    if (!h || !m) return;
    const d = h.alias, f = m.properties?.find((w) => w.key === p)?.alias ?? p, v = m.identifyBy;
    if (!v) return;
    _(this, y, I).call(this, e, d, v, f, u, l, a);
  }
};
I = function(e, t, n, c, a, u, l) {
  const r = e.find((i) => i.alias === t);
  if (!(!r || !r.value))
    try {
      const i = typeof r.value == "string", s = i ? JSON.parse(r.value) : r.value, p = s.contentData;
      if (!p) return;
      for (const h of p) {
        const m = h.values?.find((d) => d.alias === n.property);
        if (m && typeof m.value == "string" && m.value.toLowerCase().includes(n.value.toLowerCase())) {
          const d = h.values?.find((f) => f.alias === c);
          if (d) {
            const f = `${h.key}:${c}`;
            if (l.has(f)) {
              const v = typeof d.value == "string" ? d.value : "";
              d.value = `${v}
${a}`;
            } else
              d.value = a;
            l.add(f);
          }
          break;
        }
      }
      r.value = i ? JSON.stringify(s) : s;
    } catch (i) {
      console.error(`Failed to apply block mapping to ${t}:`, i);
    }
};
k.styles = [
  Q`
			:host {
				display: contents;
			}
		`
];
O([
  M()
], k.prototype, "_documentUnique", 2);
O([
  M()
], k.prototype, "_documentTypeUnique", 2);
O([
  M()
], k.prototype, "_hasWorkflows", 2);
k = O([
  Y("up-doc-collection-action")
], k);
const ge = k;
export {
  k as UpDocCollectionActionElement,
  ge as default
};
//# sourceMappingURL=up-doc-collection-action.element-DVKsOGU6.js.map
