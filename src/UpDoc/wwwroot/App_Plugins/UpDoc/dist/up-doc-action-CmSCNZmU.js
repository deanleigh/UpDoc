import { U as V } from "./up-doc-modal.token-DHoS03yR.js";
import { U as G } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as L } from "./workflow.service-DSRz0gSB.js";
import { s as C, b as O, m as x } from "./transforms-BkZeboOX.js";
import { UmbEntityActionBase as _ } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as I } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as E } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as J } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as K } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as M } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as j } from "@umbraco-cms/backoffice/document";
class ae extends _ {
  #t = new K(this);
  #o = new M(this);
  #n = new j(this);
  constructor(c, o) {
    super(c, o);
  }
  async execute() {
    const c = await this.getContext(E), o = this.args.unique ?? null;
    try {
      let f = null;
      if (o) {
        const { data: e } = await this.#n.requestItems([o]);
        e?.length && (f = e[0].documentType.unique);
      }
      const t = (await this.#t.requestAllowedChildrenOf(
        f,
        o
      )).data;
      if (!t?.items?.length) {
        c.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const s = await (await this.getContext(J)).getLatestToken(), r = await L(s), n = new Set(r.blueprintIds), l = [];
      for (const e of t.items) {
        const { data: h } = await this.#o.requestItemsByDocumentType(e.unique);
        if (h?.length) {
          const v = h.filter((T) => n.has(T.unique));
          v.length && l.push({
            documentTypeUnique: e.unique,
            documentTypeName: e.name,
            documentTypeIcon: e.icon ?? null,
            blueprints: v.map((T) => ({
              blueprintUnique: T.unique,
              blueprintName: T.name
            }))
          });
        }
      }
      if (!l.length) {
        c.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let p;
      try {
        p = await I(this, G, {
          data: { documentTypes: l }
        });
      } catch {
        return;
      }
      const { blueprintUnique: a, documentTypeUnique: y } = p, i = l.find((e) => e.documentTypeUnique === y), m = i?.blueprints.find((e) => e.blueprintUnique === a);
      console.log("Selected blueprint:", a, "Document type:", y);
      let g;
      try {
        g = await I(this, V, {
          data: {
            unique: o,
            documentTypeName: i?.documentTypeName ?? "",
            blueprintName: m?.blueprintName ?? "",
            blueprintId: a
          }
        });
      } catch {
        return;
      }
      const { name: U, mediaUnique: S, sourceUrl: R, sectionLookup: A, config: b } = g;
      if (!U || !b || !S && !R)
        return;
      const D = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${a}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${s}`
          }
        }
      );
      if (!D.ok) {
        const e = await D.json();
        console.error("Scaffold failed:", e), c.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${e.title || "Unknown error"}` }
        });
        return;
      }
      const w = await D.json();
      console.log("Scaffold response:", w), console.log("Scaffold values aliases:", w.values?.map((e) => e.alias));
      const $ = w.values ? JSON.parse(JSON.stringify(w.values)) : [], B = /* @__PURE__ */ new Set();
      for (const e of b.map.mappings) {
        if (e.enabled === !1) continue;
        const h = A[e.source];
        if (h)
          for (const v of e.destinations)
            this.#a($, v, h, b, B);
      }
      this.#i($, b, B);
      const q = {
        parent: o ? { id: o } : null,
        documentType: { id: y },
        template: w.template ? { id: w.template.id } : null,
        values: $,
        variants: [
          {
            name: U,
            culture: null,
            segment: null
          }
        ]
      };
      console.log("Create request:", JSON.stringify(q, null, 2));
      const N = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${s}`
        },
        body: JSON.stringify(q)
      });
      if (!N.ok) {
        const e = await N.json();
        console.error("Document creation failed:", e), c.peek("danger", {
          data: { message: `Failed to create document: ${e.title || e.detail || "Unknown error"}` }
        });
        return;
      }
      const k = N.headers.get("Location")?.split("/").pop();
      if (console.log("Document created successfully! ID:", k), k) {
        const e = await fetch(`/umbraco/management/api/v1/document/${k}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${s}`
          }
        });
        if (e.ok) {
          const h = await e.json();
          console.log("Fetched document for save:", h);
          const v = await fetch(`/umbraco/management/api/v1/document/${k}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${s}`
            },
            body: JSON.stringify(h)
          });
          v.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await v.text());
        } else
          console.warn("Could not fetch document for save:", await e.text());
      }
      if (c.peek("positive", {
        data: { message: `Document "${U}" created successfully!` }
      }), k) {
        const e = `/umbraco/section/content/workspace/document/edit/${k}`;
        setTimeout(() => {
          window.location.href = e;
        }, 150);
      }
    } catch (f) {
      console.error("Error creating document:", f), c.peek("danger", {
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
  #a(c, o, f, u, t) {
    const d = f;
    if (o.blockKey) {
      for (const r of u.destination.blockGrids ?? []) {
        const n = r.blocks.find((l) => l.key === o.blockKey);
        if (n?.identifyBy) {
          this.#e(c, r.alias, n.identifyBy, o.target, d, t);
          return;
        }
      }
      console.log(`Block ${o.blockKey} not found in destination config`);
      return;
    }
    const s = o.target.split(".");
    if (s.length === 1) {
      const r = s[0], n = c.find((l) => l.alias === r);
      if (n)
        if (t.has(r)) {
          const l = typeof n.value == "string" ? n.value : "";
          n.value = `${l} ${d}`;
        } else
          n.value = d;
      else
        c.push({ alias: r, value: d });
      t.add(r);
    } else if (s.length === 3) {
      const [r, n, l] = s, p = u.destination.blockGrids?.find((g) => g.key === r), a = p?.blocks.find((g) => g.key === n);
      if (!p || !a) return;
      const y = p.alias, i = a.properties?.find((g) => g.key === l)?.alias ?? l, m = a.identifyBy;
      if (!m) return;
      this.#e(c, y, m, i, d, t);
    }
  }
  /**
   * Applies a value to a property within a block grid.
   * Finds the block by searching for a property value match.
   * mappedFields tracks writes — first replaces blueprint default, subsequent concatenate.
   */
  #e(c, o, f, u, t, d) {
    const s = c.find((r) => r.alias === o);
    if (!s || !s.value) {
      console.log(`No ${o} found in scaffold values`);
      return;
    }
    try {
      const r = typeof s.value == "string", n = r ? JSON.parse(s.value) : s.value, l = n.contentData;
      if (!l) {
        console.log(`No contentData in ${o}`);
        return;
      }
      let p = !1;
      for (const a of l) {
        const y = a.values?.find((i) => i.alias === f.property);
        if (y && typeof y.value == "string" && y.value.toLowerCase().includes(f.value.toLowerCase())) {
          console.log(`Found matching block for "${f.value}":`, a.key), p = !0;
          const i = a.values?.find((m) => m.alias === u);
          if (i) {
            const m = `${a.key}:${u}`;
            if (d.has(m)) {
              const g = typeof i.value == "string" ? i.value : "";
              i.value = `${g}
${t}`;
            } else
              i.value = t;
            d.add(m), console.log(`Updated ${u} in block`);
          }
          break;
        }
      }
      p || console.log(`WARNING: Did not find a block matching ${f.property} = "${f.value}"`), s.value = r ? JSON.stringify(n) : n;
    } catch (r) {
      console.error(`Failed to apply block mapping to ${o}:`, r);
    }
  }
  /**
   * Post-mapping pass: strips markdown from plain text fields and converts richText fields
   * from markdown to HTML + RTE value object.
   * Uses destination.json field types to auto-detect which fields need conversion.
   * Only converts fields that were written by our mappings (tracked by mappedFields).
   */
  #i(c, o, f) {
    for (const u of o.destination.fields)
      if ((u.type === "text" || u.type === "textArea") && f.has(u.alias)) {
        const t = c.find((d) => d.alias === u.alias);
        t && typeof t.value == "string" && (t.value = C(t.value));
      }
    for (const u of o.destination.fields)
      if (u.type === "richText" && f.has(u.alias)) {
        const t = c.find((d) => d.alias === u.alias);
        t && typeof t.value == "string" && (t.value = O(x(t.value)));
      }
    for (const u of o.destination.blockGrids ?? []) {
      const t = c.find((n) => n.alias === u.alias);
      if (!t?.value) continue;
      const d = typeof t.value == "string", s = d ? JSON.parse(t.value) : t.value, r = s.contentData;
      if (r) {
        for (const n of r)
          for (const l of u.blocks) {
            if (!l.identifyBy) continue;
            const p = n.values?.find((a) => a.alias === l.identifyBy.property);
            if (p && typeof p.value == "string" && p.value.toLowerCase().includes(l.identifyBy.value.toLowerCase())) {
              for (const a of l.properties ?? []) {
                const y = `${n.key}:${a.alias}`;
                if ((a.type === "text" || a.type === "textArea") && f.has(y)) {
                  const i = n.values?.find((m) => m.alias === a.alias);
                  i && typeof i.value == "string" && (i.value = C(i.value));
                }
                if (a.type === "richText" && f.has(y)) {
                  const i = n.values?.find((m) => m.alias === a.alias);
                  i && typeof i.value == "string" && (i.value = O(x(i.value)));
                }
              }
              break;
            }
          }
        t.value = d ? JSON.stringify(s) : s;
      }
    }
  }
}
export {
  ae as UpDocEntityAction,
  ae as default
};
//# sourceMappingURL=up-doc-action-CmSCNZmU.js.map
