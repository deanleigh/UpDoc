import { U as x } from "./up-doc-modal.token-CsTR3cxa.js";
import { U as R } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as j } from "./workflow.service-T0TEyrPt.js";
import { UmbEntityActionBase as A } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as C } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as M } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as E } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as V } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as _ } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as G } from "@umbraco-cms/backoffice/document";
class ee extends A {
  #t = new V(this);
  #o = new _(this);
  #n = new G(this);
  constructor(a, t) {
    super(a, t);
  }
  async execute() {
    const a = await this.getContext(M), t = this.args.unique ?? null;
    try {
      let c = null;
      if (t) {
        const { data: e } = await this.#n.requestItems([t]);
        e?.length && (c = e[0].documentType.unique);
      }
      const m = (await this.#t.requestAllowedChildrenOf(
        c,
        t
      )).data;
      if (!m?.items?.length) {
        a.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const p = await (await this.getContext(E)).getLatestToken(), i = await j(p), o = new Set(i.blueprintIds), n = [];
      for (const e of m.items) {
        const { data: r } = await this.#o.requestItemsByDocumentType(e.unique);
        if (r?.length) {
          const b = r.filter(($) => o.has($.unique));
          b.length && n.push({
            documentTypeUnique: e.unique,
            documentTypeName: e.name,
            documentTypeIcon: e.icon ?? null,
            blueprints: b.map(($) => ({
              blueprintUnique: $.unique,
              blueprintName: $.name
            }))
          });
        }
      }
      if (!n.length) {
        a.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let s;
      try {
        s = await C(this, R, {
          data: { documentTypes: n }
        });
      } catch {
        return;
      }
      const { blueprintUnique: d, documentTypeUnique: l } = s, h = n.find((e) => e.documentTypeUnique === l), f = h?.blueprints.find((e) => e.blueprintUnique === d);
      console.log("Selected blueprint:", d, "Document type:", l);
      let g;
      try {
        g = await C(this, x, {
          data: {
            unique: t,
            documentTypeName: h?.documentTypeName ?? "",
            blueprintName: f?.blueprintName ?? "",
            blueprintId: d
          }
        });
      } catch {
        return;
      }
      const { name: u, mediaUnique: O, extractedSections: U, sectionLookup: I, config: T } = g;
      if (!O || !u || !T)
        return;
      console.log("Creating document with:", { name: u, sections: Object.keys(U) });
      const N = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${d}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${p}`
          }
        }
      );
      if (!N.ok) {
        const e = await N.json();
        console.error("Scaffold failed:", e), a.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${e.title || "Unknown error"}` }
        });
        return;
      }
      const k = await N.json();
      console.log("Scaffold response:", k), console.log("Scaffold values aliases:", k.values?.map((e) => e.alias));
      const D = k.values ? JSON.parse(JSON.stringify(k.values)) : [];
      console.log("Extracted sections available:", Object.keys(U).length, "elements"), console.log("Mappings to apply:", T.map.mappings.map((e) => `${e.source} -> ${e.destinations.map((r) => r.target).join(", ")}`));
      const S = /* @__PURE__ */ new Set();
      for (const e of T.map.mappings) {
        if (e.enabled === !1) {
          console.log(`Skipping disabled mapping for source: ${e.source}`);
          continue;
        }
        const r = I?.[e.source] ?? U[e.source];
        if (!r) {
          console.log(`No extracted value for source: "${e.source}"`);
          continue;
        }
        console.log(`Applying mapping for "${e.source}" (${r.length} chars)`);
        for (const b of e.destinations)
          this.#a(D, b, r, T, S);
      }
      console.log("Values after all mappings applied:");
      for (const e of D) {
        const r = typeof e.value == "string" ? e.value.substring(0, 60) : typeof e.value == "object" ? "[object]" : e.value;
        console.log(`  ${e.alias}: ${r}`);
      }
      const q = {
        parent: t ? { id: t } : null,
        documentType: { id: l },
        template: k.template ? { id: k.template.id } : null,
        values: D,
        variants: [
          {
            name: u,
            culture: null,
            segment: null
          }
        ]
      };
      console.log("Create request:", JSON.stringify(q, null, 2));
      const B = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${p}`
        },
        body: JSON.stringify(q)
      });
      if (!B.ok) {
        const e = await B.json();
        console.error("Document creation failed:", e), a.peek("danger", {
          data: { message: `Failed to create document: ${e.title || e.detail || "Unknown error"}` }
        });
        return;
      }
      const v = B.headers.get("Location")?.split("/").pop();
      if (console.log("Document created successfully! ID:", v), v) {
        const e = await fetch(`/umbraco/management/api/v1/document/${v}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${p}`
          }
        });
        if (e.ok) {
          const r = await e.json();
          console.log("Fetched document for save:", r);
          const b = await fetch(`/umbraco/management/api/v1/document/${v}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${p}`
            },
            body: JSON.stringify(r)
          });
          b.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await b.text());
        } else
          console.warn("Could not fetch document for save:", await e.text());
      }
      if (a.peek("positive", {
        data: { message: `Document "${u}" created successfully!` }
      }), v) {
        const e = `/umbraco/section/content/workspace/document/edit/${v}`;
        setTimeout(() => {
          window.location.href = e;
        }, 150);
      }
    } catch (c) {
      console.error("Error creating document:", c), a.peek("danger", {
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
  #a(a, t, c, w, m) {
    let y = c;
    const p = t.transforms?.some((o) => o.type === "convertMarkdownToHtml");
    if (t.blockKey) {
      for (const o of w.destination.blockGrids ?? []) {
        const n = o.blocks.find((s) => s.key === t.blockKey);
        if (n?.identifyBy) {
          this.#e(a, o.alias, n.identifyBy, t.target, y, p, m);
          return;
        }
      }
      console.log(`Block ${t.blockKey} not found in destination config`);
      return;
    }
    const i = t.target.split(".");
    if (i.length === 1) {
      const o = i[0], n = a.find((s) => s.alias === o);
      if (n)
        if (m.has(o)) {
          const s = typeof n.value == "string" ? n.value : "";
          n.value = `${s} ${y}`;
        } else
          n.value = y;
      else
        a.push({ alias: o, value: y });
      m.add(o), console.log(`Set ${o} = "${String(n?.value ?? y).substring(0, 80)}"`);
    } else if (i.length === 3) {
      const [o, n, s] = i, d = w.destination.blockGrids?.find((u) => u.key === o), l = d?.blocks.find((u) => u.key === n);
      if (!d || !l) {
        console.log(`Block path ${t.target} not found in destination config`);
        return;
      }
      const h = d.alias, f = l.properties?.find((u) => u.key === s)?.alias ?? s, g = l.identifyBy;
      if (!g) {
        console.log(`No identifyBy for block ${n}`);
        return;
      }
      this.#e(a, h, g, f, y, p, m);
    }
  }
  /**
   * Applies a value to a property within a block grid.
   * Finds the block by searching for a property value match.
   * mappedFields tracks writes — first replaces blueprint default, subsequent concatenate.
   */
  #e(a, t, c, w, m, y, p) {
    const i = a.find((o) => o.alias === t);
    if (!i || !i.value) {
      console.log(`No ${t} found in scaffold values`);
      return;
    }
    try {
      const o = typeof i.value == "string", n = o ? JSON.parse(i.value) : i.value, s = n.contentData;
      if (!s) {
        console.log(`No contentData in ${t}`);
        return;
      }
      let d = !1;
      for (const l of s) {
        const h = l.values?.find((f) => f.alias === c.property);
        if (h && typeof h.value == "string" && h.value.toLowerCase().includes(c.value.toLowerCase())) {
          console.log(`Found matching block for "${c.value}":`, l.key), d = !0;
          const f = l.values?.find((g) => g.alias === w);
          if (f) {
            const g = `${l.key}:${w}`;
            if (p.has(g)) {
              const u = typeof f.value == "string" ? f.value : "";
              f.value = `${u}
${m}`;
            } else
              f.value = m;
            p.add(g), console.log(`Updated ${w} in block`);
          }
          break;
        }
      }
      d || console.log(`WARNING: Did not find a block matching ${c.property} = "${c.value}"`), i.value = o ? JSON.stringify(n) : n;
    } catch (o) {
      console.error(`Failed to apply block mapping to ${t}:`, o);
    }
  }
}
export {
  ee as UpDocEntityAction,
  ee as default
};
//# sourceMappingURL=up-doc-action-DbqY4gN-.js.map
