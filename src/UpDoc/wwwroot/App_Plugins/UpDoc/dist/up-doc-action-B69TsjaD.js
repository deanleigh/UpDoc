import { U as A } from "./up-doc-modal.token-DHoS03yR.js";
import { U as K } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as L } from "./workflow.service-DSRz0gSB.js";
import { s as N, b as O, m as q } from "./transforms-BkZeboOX.js";
import { UmbEntityActionBase as J } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as S } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as _ } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as E } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as G } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as M } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as j } from "@umbraco-cms/backoffice/document";
class ae extends J {
  #t = new G(this);
  #n = new M(this);
  #o = new j(this);
  constructor(l, s) {
    super(l, s);
  }
  async execute() {
    const l = await this.getContext(_), s = this.args.unique ?? null;
    try {
      let p = null;
      if (s) {
        const { data: i } = await this.#o.requestItems([s]);
        i?.length && (p = i[0].documentType.unique);
      }
      const r = (await this.#t.requestAllowedChildrenOf(
        p,
        s
      )).data;
      if (!r?.items?.length) {
        l.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const t = await (await this.getContext(E)).getLatestToken(), n = await L(t), c = new Set(n.blueprintIds), o = [];
      for (const i of r.items) {
        const { data: v } = await this.#n.requestItemsByDocumentType(i.unique);
        if (v?.length) {
          const k = v.filter((U) => c.has(U.unique));
          k.length && o.push({
            documentTypeUnique: i.unique,
            documentTypeName: i.name,
            documentTypeIcon: i.icon ?? null,
            blueprints: k.map((U) => ({
              blueprintUnique: U.unique,
              blueprintName: U.name
            }))
          });
        }
      }
      if (!o.length) {
        l.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let f;
      try {
        f = await S(this, K, {
          data: { documentTypes: o }
        });
      } catch {
        return;
      }
      const { blueprintUnique: u, documentTypeUnique: e } = f, d = o.find((i) => i.documentTypeUnique === e), m = d?.blueprints.find((i) => i.blueprintUnique === u);
      let h;
      try {
        h = await S(this, A, {
          data: {
            unique: s,
            documentTypeName: d?.documentTypeName ?? "",
            blueprintName: m?.blueprintName ?? "",
            blueprintId: u
          }
        });
      } catch {
        return;
      }
      const { name: g, mediaUnique: x, sourceUrl: V, sectionLookup: I, config: w } = h;
      if (!g || !w || !x && !V)
        return;
      const B = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${u}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`
          }
        }
      );
      if (!B.ok) {
        const i = await B.json();
        console.error("Scaffold failed:", i), l.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${i.title || "Unknown error"}` }
        });
        return;
      }
      const T = await B.json(), $ = T.values ? JSON.parse(JSON.stringify(T.values)) : [], D = /* @__PURE__ */ new Set();
      for (const i of w.map.mappings) {
        if (i.enabled === !1) continue;
        const v = I[i.source];
        if (v)
          for (const k of i.destinations)
            this.#a($, k, v, w, D);
      }
      this.#s($, w, D);
      const R = {
        parent: s ? { id: s } : null,
        documentType: { id: e },
        template: T.template ? { id: T.template.id } : null,
        values: $,
        variants: [
          {
            name: g,
            culture: null,
            segment: null
          }
        ]
      }, C = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${t}`
        },
        body: JSON.stringify(R)
      });
      if (!C.ok) {
        const i = await C.json();
        console.error("Document creation failed:", i), l.peek("danger", {
          data: { message: `Failed to create document: ${i.title || i.detail || "Unknown error"}` }
        });
        return;
      }
      const b = C.headers.get("Location")?.split("/").pop();
      if (b) {
        const i = await fetch(`/umbraco/management/api/v1/document/${b}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`
          }
        });
        if (i.ok) {
          const v = await i.json(), k = await fetch(`/umbraco/management/api/v1/document/${b}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${t}`
            },
            body: JSON.stringify(v)
          });
          k.ok || console.warn("Document save failed, but document was created:", await k.text());
        } else
          console.warn("Could not fetch document for save:", await i.text());
      }
      if (l.peek("positive", {
        data: { message: `Document "${g}" created successfully!` }
      }), b) {
        const i = `/umbraco/section/content/workspace/document/edit/${b}`;
        setTimeout(() => {
          window.location.href = i;
        }, 150);
      }
    } catch (p) {
      console.error("Error creating document:", p), l.peek("danger", {
        data: { message: "An unexpected error occurred while creating the document." }
      });
    }
  }
  /**
   * Applies a single destination mapping from the config.
   * Handles both simple field mappings and block grid mappings.
   * mappedFields tracks which fields have been written by our mappings —
   * first write replaces the blueprint default, subsequent writes concatenate.
   */
  #a(l, s, p, y, r) {
    const a = p;
    if (s.blockKey) {
      for (const n of [...y.destination.blockGrids ?? [], ...y.destination.blockLists ?? []]) {
        const c = n.blocks.find((o) => o.key === s.blockKey);
        if (c) {
          const o = c.contentTypeKey;
          o ? this.#i(l, n.alias, o, s.target, a, r) : c.identifyBy && this.#e(l, n.alias, c.identifyBy, s.target, a, r);
          return;
        }
      }
      console.log(`Block ${s.blockKey} not found in destination config`);
      return;
    }
    const t = s.target.split(".");
    if (t.length === 1) {
      const n = t[0], c = l.find((o) => o.alias === n);
      if (c)
        if (r.has(n)) {
          const o = typeof c.value == "string" ? c.value : "";
          c.value = `${o} ${a}`;
        } else
          c.value = a;
      else
        l.push({ alias: n, value: a });
      r.add(n);
    } else if (t.length === 3) {
      const [n, c, o] = t, u = [...y.destination.blockGrids ?? [], ...y.destination.blockLists ?? []].find((g) => g.key === n), e = u?.blocks.find((g) => g.key === c);
      if (!u || !e) return;
      const d = u.alias, m = e.properties?.find((g) => g.key === o)?.alias ?? o, h = e.identifyBy;
      if (!h) return;
      this.#e(l, d, h, m, a, r);
    }
  }
  /**
   * Applies a value to a property within a block grid.
   * Finds the block by searching for a property value match.
   * mappedFields tracks writes — first replaces blueprint default, subsequent concatenate.
   */
  #e(l, s, p, y, r, a) {
    const t = l.find((n) => n.alias === s);
    if (!(!t || !t.value))
      try {
        const n = typeof t.value == "string", c = n ? JSON.parse(t.value) : t.value, o = c.contentData;
        if (!o) return;
        for (const f of o) {
          const u = f.values?.find((e) => e.alias === p.property);
          if (u && typeof u.value == "string" && u.value.toLowerCase().includes(p.value.toLowerCase())) {
            const e = f.values?.find((d) => d.alias === y);
            if (e) {
              const d = `${f.key}:${y}`;
              if (a.has(d)) {
                const m = typeof e.value == "string" ? e.value : "";
                e.value = `${m}
${r}`;
              } else
                e.value = r;
              a.add(d);
            }
            break;
          }
        }
        t.value = n ? JSON.stringify(c) : c;
      } catch (n) {
        console.error(`Failed to apply block mapping to ${s}:`, n);
      }
  }
  /**
   * Applies a value to a block property by matching the block's contentTypeKey in contentData.
   * Umbraco regenerates block instance keys when creating documents from blueprints,
   * so we match by element type GUID (contentTypeKey) which is stable across all documents.
   */
  #i(l, s, p, y, r, a) {
    const t = l.find((n) => n.alias === s);
    if (!(!t || !t.value))
      try {
        const n = typeof t.value == "string", c = n ? JSON.parse(t.value) : t.value, o = c.contentData;
        if (!o) return;
        const f = o.find((e) => e.contentTypeKey === p);
        if (!f) return;
        const u = f.values?.find((e) => e.alias === y);
        if (u) {
          const e = `${f.key}:${y}`;
          if (a.has(e)) {
            const d = typeof u.value == "string" ? u.value : "";
            u.value = `${d}
${r}`;
          } else
            u.value = r;
          a.add(e);
        }
        t.value = n ? JSON.stringify(c) : c;
      } catch (n) {
        console.error(`Failed to apply block mapping by content type to ${s}:`, n);
      }
  }
  /**
   * Post-mapping pass: strips markdown from plain text fields and converts richText fields
   * from markdown to HTML + RTE value object.
   * Uses destination.json field types to auto-detect which fields need conversion.
   * Only converts fields that were written by our mappings (tracked by mappedFields).
   */
  #s(l, s, p) {
    for (const r of s.destination.fields)
      if ((r.type === "text" || r.type === "textArea") && p.has(r.alias)) {
        const a = l.find((t) => t.alias === r.alias);
        a && typeof a.value == "string" && (a.value = N(a.value));
      }
    for (const r of s.destination.fields)
      if (r.type === "richText" && p.has(r.alias)) {
        const a = l.find((t) => t.alias === r.alias);
        a && typeof a.value == "string" && (a.value = O(q(a.value)));
      }
    const y = [...s.destination.blockGrids ?? [], ...s.destination.blockLists ?? []];
    for (const r of y) {
      const a = l.find((o) => o.alias === r.alias);
      if (!a?.value) continue;
      const t = typeof a.value == "string", n = t ? JSON.parse(a.value) : a.value, c = n.contentData;
      if (c) {
        for (const o of c)
          for (const f of r.blocks)
            if (f.identifyBy ? (() => {
              const e = o.values?.find((d) => d.alias === f.identifyBy.property);
              return e && typeof e.value == "string" && e.value.toLowerCase().includes(f.identifyBy.value.toLowerCase());
            })() : o.key === f.key) {
              for (const e of f.properties ?? []) {
                const d = `${o.key}:${e.alias}`;
                if ((e.type === "text" || e.type === "textArea") && p.has(d)) {
                  const m = o.values?.find((h) => h.alias === e.alias);
                  m && typeof m.value == "string" && (m.value = N(m.value));
                }
                if (e.type === "richText" && p.has(d)) {
                  const m = o.values?.find((h) => h.alias === e.alias);
                  m && typeof m.value == "string" && (m.value = O(q(m.value)));
                }
              }
              break;
            }
        a.value = t ? JSON.stringify(n) : n;
      }
    }
  }
}
export {
  ae as UpDocEntityAction,
  ae as default
};
//# sourceMappingURL=up-doc-action-B69TsjaD.js.map
