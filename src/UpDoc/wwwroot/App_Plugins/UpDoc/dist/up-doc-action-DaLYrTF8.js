import { U as R } from "./up-doc-modal.token-DHoS03yR.js";
import { U as A } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as L } from "./workflow.service-CWGlGq_3.js";
import { s as C, b as O, m as q } from "./transforms-BkZeboOX.js";
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
      let f = null;
      if (s) {
        const { data: i } = await this.#o.requestItems([s]);
        i?.length && (f = i[0].documentType.unique);
      }
      const r = (await this.#t.requestAllowedChildrenOf(
        f,
        s
      )).data;
      if (!r?.items?.length) {
        l.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const e = await (await this.getContext(E)).getLatestToken(), t = await L(e), c = new Set(t.blueprintIds), n = [];
      for (const i of r.items) {
        const { data: k } = await this.#n.requestItemsByDocumentType(i.unique);
        if (k?.length) {
          const v = k.filter((U) => c.has(U.unique));
          v.length && n.push({
            documentTypeUnique: i.unique,
            documentTypeName: i.name,
            documentTypeIcon: i.icon ?? null,
            blueprints: v.map((U) => ({
              blueprintUnique: U.unique,
              blueprintName: U.name
            }))
          });
        }
      }
      if (!n.length) {
        l.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let p;
      try {
        p = await S(this, A, {
          data: { documentTypes: n }
        });
      } catch {
        return;
      }
      const { blueprintUnique: u, documentTypeUnique: a } = p, m = n.find((i) => i.documentTypeUnique === a), d = m?.blueprints.find((i) => i.blueprintUnique === u);
      let h;
      try {
        h = await S(this, R, {
          data: {
            unique: s,
            documentTypeName: m?.documentTypeName ?? "",
            blueprintName: d?.blueprintName ?? "",
            blueprintId: u
          }
        });
      } catch {
        return;
      }
      const { name: g, mediaUnique: x, sourceUrl: I, sectionLookup: V, config: w } = h;
      if (!g || !w || !x && !I)
        return;
      const $ = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${u}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${e}`
          }
        }
      );
      if (!$.ok) {
        const i = await $.json();
        console.error("Scaffold failed:", i), l.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${i.title || "Unknown error"}` }
        });
        return;
      }
      const T = await $.json(), D = T.values ? JSON.parse(JSON.stringify(T.values)) : [], N = /* @__PURE__ */ new Set();
      for (const i of w.map.mappings) {
        if (i.enabled === !1) continue;
        const k = V[i.source];
        if (k)
          for (const v of i.destinations)
            this.#a(D, v, k, w, N);
      }
      this.#s(D, w, N);
      const K = {
        parent: s ? { id: s } : null,
        documentType: { id: a },
        template: T.template ? { id: T.template.id } : null,
        values: D,
        variants: [
          {
            name: g,
            culture: null,
            segment: null
          }
        ]
      }, B = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        },
        body: JSON.stringify(K)
      });
      if (!B.ok) {
        const i = await B.json();
        console.error("Document creation failed:", i), l.peek("danger", {
          data: { message: `Failed to create document: ${i.title || i.detail || "Unknown error"}` }
        });
        return;
      }
      const b = B.headers.get("Location")?.split("/").pop();
      if (b) {
        const i = await fetch(`/umbraco/management/api/v1/document/${b}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${e}`
          }
        });
        if (i.ok) {
          const k = await i.json(), v = await fetch(`/umbraco/management/api/v1/document/${b}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${e}`
            },
            body: JSON.stringify(k)
          });
          v.ok || console.warn("Document save failed, but document was created:", await v.text());
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
    } catch (f) {
      console.error("Error creating document:", f), l.peek("danger", {
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
  #a(l, s, f, y, r) {
    const o = f;
    if (s.blockKey) {
      for (const t of [...y.destination.blockGrids ?? [], ...y.destination.blockLists ?? []]) {
        const c = t.blocks.find((n) => n.key === s.blockKey);
        if (c) {
          const n = c.contentTypeKey;
          n ? this.#i(l, t.alias, n, s.target, o, r) : c.identifyBy && this.#e(l, t.alias, c.identifyBy, s.target, o, r);
          return;
        }
      }
      console.log(`Block ${s.blockKey} not found in destination config`);
      return;
    }
    const e = s.target.split(".");
    if (e.length === 1) {
      const t = e[0], c = l.find((n) => n.alias === t);
      if (c)
        if (r.has(t)) {
          const n = typeof c.value == "string" ? c.value : "";
          c.value = `${n} ${o}`;
        } else
          c.value = o;
      else
        l.push({ alias: t, value: o });
      r.add(t);
    } else if (e.length === 3) {
      const [t, c, n] = e, u = [...y.destination.blockGrids ?? [], ...y.destination.blockLists ?? []].find((g) => g.key === t), a = u?.blocks.find((g) => g.key === c);
      if (!u || !a) return;
      const m = u.alias, d = a.properties?.find((g) => g.key === n)?.alias ?? n, h = a.identifyBy;
      if (!h) return;
      this.#e(l, m, h, d, o, r);
    }
  }
  /**
   * Applies a value to a property within a block grid.
   * Finds the block by searching for a property value match.
   * mappedFields tracks writes — first replaces blueprint default, subsequent concatenate.
   */
  #e(l, s, f, y, r, o) {
    const e = l.find((t) => t.alias === s);
    if (!(!e || !e.value))
      try {
        const t = typeof e.value == "string", c = t ? JSON.parse(e.value) : e.value, n = c.contentData;
        if (!n) return;
        for (const p of n) {
          const u = p.values?.find((a) => a.alias === f.property);
          if (u && typeof u.value == "string" && u.value.toLowerCase().includes(f.value.toLowerCase())) {
            const a = p.values?.find((m) => m.alias === y);
            if (a) {
              const m = `${p.key}:${y}`;
              if (o.has(m)) {
                const d = typeof a.value == "string" ? a.value : "";
                a.value = `${d}
${r}`;
              } else
                a.value = r;
              o.add(m);
            }
            break;
          }
        }
        e.value = t ? JSON.stringify(c) : c;
      } catch (t) {
        console.error(`Failed to apply block mapping to ${s}:`, t);
      }
  }
  /**
   * Applies a value to a block property by matching the block's contentTypeKey in contentData.
   * Umbraco regenerates block instance keys when creating documents from blueprints,
   * so we match by element type GUID (contentTypeKey) which is stable across all documents.
   */
  #i(l, s, f, y, r, o) {
    const e = l.find((t) => t.alias === s);
    if (!(!e || !e.value))
      try {
        const t = typeof e.value == "string", c = t ? JSON.parse(e.value) : e.value, n = c.contentData;
        if (!n) return;
        const p = n.find((a) => a.contentTypeKey === f);
        if (!p) return;
        const u = p.values?.find((a) => a.alias === y);
        if (u) {
          const a = `${p.key}:${y}`;
          if (o.has(a)) {
            const m = typeof u.value == "string" ? u.value : "";
            u.value = `${m}
${r}`;
          } else
            u.value = r;
          o.add(a);
        }
        e.value = t ? JSON.stringify(c) : c;
      } catch (t) {
        console.error(`Failed to apply block mapping by content type to ${s}:`, t);
      }
  }
  /**
   * Post-mapping pass: strips markdown from plain text fields and converts richText fields
   * from markdown to HTML + RTE value object.
   * Uses destination.json field types to auto-detect which fields need conversion.
   * Only converts fields that were written by our mappings (tracked by mappedFields).
   */
  #s(l, s, f) {
    for (const r of s.destination.fields)
      if ((r.type === "text" || r.type === "textArea") && f.has(r.alias)) {
        const o = l.find((e) => e.alias === r.alias);
        o && typeof o.value == "string" && (o.value = C(o.value));
      }
    for (const r of s.destination.fields)
      if (r.type === "richText" && f.has(r.alias)) {
        const o = l.find((e) => e.alias === r.alias);
        o && typeof o.value == "string" && (o.value = O(q(o.value)));
      }
    const y = [...s.destination.blockGrids ?? [], ...s.destination.blockLists ?? []];
    for (const r of y) {
      const o = l.find((n) => n.alias === r.alias);
      if (!o?.value) continue;
      const e = typeof o.value == "string", t = e ? JSON.parse(o.value) : o.value, c = t.contentData;
      if (c) {
        for (const n of c)
          for (const p of r.blocks)
            if (p.contentTypeKey ? n.contentTypeKey === p.contentTypeKey : n.key === p.key) {
              for (const a of p.properties ?? []) {
                const m = `${n.key}:${a.alias}`;
                if ((a.type === "text" || a.type === "textArea") && f.has(m)) {
                  const d = n.values?.find((h) => h.alias === a.alias);
                  d && typeof d.value == "string" && (d.value = C(d.value));
                }
                if (a.type === "richText" && f.has(m)) {
                  const d = n.values?.find((h) => h.alias === a.alias);
                  d && typeof d.value == "string" && (d.value = O(q(d.value)));
                }
              }
              break;
            }
        o.value = e ? JSON.stringify(t) : t;
      }
    }
  }
}
export {
  ae as UpDocEntityAction,
  ae as default
};
//# sourceMappingURL=up-doc-action-DaLYrTF8.js.map
