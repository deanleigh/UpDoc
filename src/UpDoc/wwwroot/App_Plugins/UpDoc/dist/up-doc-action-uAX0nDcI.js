import { U as x } from "./up-doc-modal.token-DHoS03yR.js";
import { U as V } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as A } from "./workflow.service-CkB4ycNR.js";
import { b as C, m as O } from "./transforms-deUehta3.js";
import { UmbEntityActionBase as G } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as I } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as L } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as _ } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as E } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as J } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as j } from "@umbraco-cms/backoffice/document";
class oe extends G {
  #t = new E(this);
  #o = new J(this);
  #n = new j(this);
  constructor(c, t) {
    super(c, t);
  }
  async execute() {
    const c = await this.getContext(L), t = this.args.unique ?? null;
    try {
      let l = null;
      if (t) {
        const { data: e } = await this.#n.requestItems([t]);
        e?.length && (l = e[0].documentType.unique);
      }
      const n = (await this.#t.requestAllowedChildrenOf(
        l,
        t
      )).data;
      if (!n?.items?.length) {
        c.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const a = await (await this.getContext(_)).getLatestToken(), i = await A(a), o = new Set(i.blueprintIds), s = [];
      for (const e of n.items) {
        const { data: h } = await this.#o.requestItemsByDocumentType(e.unique);
        if (h?.length) {
          const v = h.filter((T) => o.has(T.unique));
          v.length && s.push({
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
      if (!s.length) {
        c.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let m;
      try {
        m = await I(this, V, {
          data: { documentTypes: s }
        });
      } catch {
        return;
      }
      const { blueprintUnique: r, documentTypeUnique: d } = m, p = s.find((e) => e.documentTypeUnique === d), g = p?.blueprints.find((e) => e.blueprintUnique === r);
      console.log("Selected blueprint:", r, "Document type:", d);
      let y;
      try {
        y = await I(this, x, {
          data: {
            unique: t,
            documentTypeName: p?.documentTypeName ?? "",
            blueprintName: g?.blueprintName ?? "",
            blueprintId: r
          }
        });
      } catch {
        return;
      }
      const { name: D, mediaUnique: S, sectionLookup: R, config: b } = y;
      if (!S || !D || !b)
        return;
      const U = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${r}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${a}`
          }
        }
      );
      if (!U.ok) {
        const e = await U.json();
        console.error("Scaffold failed:", e), c.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${e.title || "Unknown error"}` }
        });
        return;
      }
      const w = await U.json();
      console.log("Scaffold response:", w), console.log("Scaffold values aliases:", w.values?.map((e) => e.alias));
      const $ = w.values ? JSON.parse(JSON.stringify(w.values)) : [], B = /* @__PURE__ */ new Set();
      for (const e of b.map.mappings) {
        if (e.enabled === !1) continue;
        const h = R[e.source];
        if (h)
          for (const v of e.destinations)
            this.#a($, v, h, b, B);
      }
      this.#i($, b, B);
      const q = {
        parent: t ? { id: t } : null,
        documentType: { id: d },
        template: w.template ? { id: w.template.id } : null,
        values: $,
        variants: [
          {
            name: D,
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
          Authorization: `Bearer ${a}`
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
            Authorization: `Bearer ${a}`
          }
        });
        if (e.ok) {
          const h = await e.json();
          console.log("Fetched document for save:", h);
          const v = await fetch(`/umbraco/management/api/v1/document/${k}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${a}`
            },
            body: JSON.stringify(h)
          });
          v.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await v.text());
        } else
          console.warn("Could not fetch document for save:", await e.text());
      }
      if (c.peek("positive", {
        data: { message: `Document "${D}" created successfully!` }
      }), k) {
        const e = `/umbraco/section/content/workspace/document/edit/${k}`;
        setTimeout(() => {
          window.location.href = e;
        }, 150);
      }
    } catch (l) {
      console.error("Error creating document:", l), c.peek("danger", {
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
  #a(c, t, l, u, n) {
    const f = l;
    if (t.blockKey) {
      for (const i of u.destination.blockGrids ?? []) {
        const o = i.blocks.find((s) => s.key === t.blockKey);
        if (o?.identifyBy) {
          this.#e(c, i.alias, o.identifyBy, t.target, f, n);
          return;
        }
      }
      console.log(`Block ${t.blockKey} not found in destination config`);
      return;
    }
    const a = t.target.split(".");
    if (a.length === 1) {
      const i = a[0], o = c.find((s) => s.alias === i);
      if (o)
        if (n.has(i)) {
          const s = typeof o.value == "string" ? o.value : "";
          o.value = `${s} ${f}`;
        } else
          o.value = f;
      else
        c.push({ alias: i, value: f });
      n.add(i);
    } else if (a.length === 3) {
      const [i, o, s] = a, m = u.destination.blockGrids?.find((y) => y.key === i), r = m?.blocks.find((y) => y.key === o);
      if (!m || !r) return;
      const d = m.alias, p = r.properties?.find((y) => y.key === s)?.alias ?? s, g = r.identifyBy;
      if (!g) return;
      this.#e(c, d, g, p, f, n);
    }
  }
  /**
   * Applies a value to a property within a block grid.
   * Finds the block by searching for a property value match.
   * mappedFields tracks writes — first replaces blueprint default, subsequent concatenate.
   */
  #e(c, t, l, u, n, f) {
    const a = c.find((i) => i.alias === t);
    if (!a || !a.value) {
      console.log(`No ${t} found in scaffold values`);
      return;
    }
    try {
      const i = typeof a.value == "string", o = i ? JSON.parse(a.value) : a.value, s = o.contentData;
      if (!s) {
        console.log(`No contentData in ${t}`);
        return;
      }
      let m = !1;
      for (const r of s) {
        const d = r.values?.find((p) => p.alias === l.property);
        if (d && typeof d.value == "string" && d.value.toLowerCase().includes(l.value.toLowerCase())) {
          console.log(`Found matching block for "${l.value}":`, r.key), m = !0;
          const p = r.values?.find((g) => g.alias === u);
          if (p) {
            const g = `${r.key}:${u}`;
            if (f.has(g)) {
              const y = typeof p.value == "string" ? p.value : "";
              p.value = `${y}
${n}`;
            } else
              p.value = n;
            f.add(g), console.log(`Updated ${u} in block`);
          }
          break;
        }
      }
      m || console.log(`WARNING: Did not find a block matching ${l.property} = "${l.value}"`), a.value = i ? JSON.stringify(o) : o;
    } catch (i) {
      console.error(`Failed to apply block mapping to ${t}:`, i);
    }
  }
  /**
   * Post-mapping pass: converts richText fields from markdown to HTML + RTE value object.
   * Uses destination.json field types to auto-detect which fields need conversion.
   * Only converts fields that were written by our mappings (tracked by mappedFields).
   */
  #i(c, t, l) {
    for (const u of t.destination.fields)
      if (u.type === "richText" && l.has(u.alias)) {
        const n = c.find((f) => f.alias === u.alias);
        n && typeof n.value == "string" && (n.value = C(O(n.value)));
      }
    for (const u of t.destination.blockGrids ?? []) {
      const n = c.find((o) => o.alias === u.alias);
      if (!n?.value) continue;
      const f = typeof n.value == "string", a = f ? JSON.parse(n.value) : n.value, i = a.contentData;
      if (i) {
        for (const o of i)
          for (const s of u.blocks) {
            if (!s.identifyBy) continue;
            const m = o.values?.find((r) => r.alias === s.identifyBy.property);
            if (m && typeof m.value == "string" && m.value.toLowerCase().includes(s.identifyBy.value.toLowerCase())) {
              for (const r of s.properties ?? [])
                if (r.type === "richText" && l.has(`${o.key}:${r.alias}`)) {
                  const d = o.values?.find((p) => p.alias === r.alias);
                  d && typeof d.value == "string" && (d.value = C(O(d.value)));
                }
              break;
            }
          }
        n.value = f ? JSON.stringify(a) : a;
      }
    }
  }
}
export {
  oe as UpDocEntityAction,
  oe as default
};
//# sourceMappingURL=up-doc-action-uAX0nDcI.js.map
