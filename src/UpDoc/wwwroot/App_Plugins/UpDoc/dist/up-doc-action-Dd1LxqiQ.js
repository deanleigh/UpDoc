var L = (l) => {
  throw TypeError(l);
};
var P = (l, u, t) => u.has(l) || L("Cannot " + t);
var I = (l, u, t) => (P(l, u, "read from private field"), t ? t.call(l) : u.get(l)), C = (l, u, t) => u.has(l) ? L("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(l) : u.set(l, t);
var R = (l, u, t) => (P(l, u, "access private method"), t);
import { U as X } from "./up-doc-modal.token-CsTR3cxa.js";
import { U as H } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as Q } from "./workflow.service-CD2_oFgA.js";
import { UmbEntityActionBase as Y } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as z } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as Z } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as ee } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as te } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as oe } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as ne } from "@umbraco-cms/backoffice/document";
var j, x, A, N, F, G;
class ge extends Y {
  constructor(t, n) {
    super(t, n);
    C(this, N);
    C(this, j, new te(this));
    C(this, x, new oe(this));
    C(this, A, new ne(this));
  }
  async execute() {
    var y, w;
    const t = await this.getContext(Z), n = this.args.unique ?? null;
    try {
      let p = null;
      if (n) {
        const { data: e } = await I(this, A).requestItems([n]);
        e != null && e.length && (p = e[0].documentType.unique);
      }
      const h = (await I(this, j).requestAllowedChildrenOf(
        p,
        n
      )).data;
      if (!((y = h == null ? void 0 : h.items) != null && y.length)) {
        t.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const d = await (await this.getContext(ee)).getLatestToken(), T = await Q(d), m = new Set(T.blueprintIds), g = [];
      for (const e of h.items) {
        const { data: c } = await I(this, x).requestItemsByDocumentType(e.unique);
        if (c != null && c.length) {
          const U = c.filter((S) => m.has(S.unique));
          U.length && g.push({
            documentTypeUnique: e.unique,
            documentTypeName: e.name,
            documentTypeIcon: e.icon ?? null,
            blueprints: U.map((S) => ({
              blueprintUnique: S.unique,
              blueprintName: S.name
            }))
          });
        }
      }
      if (!g.length) {
        t.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let a;
      try {
        a = await z(this, H, {
          data: { documentTypes: g }
        });
      } catch {
        return;
      }
      const { blueprintUnique: o, documentTypeUnique: s } = a, i = g.find((e) => e.documentTypeUnique === s), r = i == null ? void 0 : i.blueprints.find((e) => e.blueprintUnique === o);
      console.log("Selected blueprint:", o, "Document type:", s);
      let v;
      try {
        v = await z(this, X, {
          data: {
            unique: n,
            documentTypeName: (i == null ? void 0 : i.documentTypeName) ?? "",
            blueprintName: (r == null ? void 0 : r.blueprintName) ?? "",
            blueprintId: o
          }
        });
      } catch {
        return;
      }
      const { name: $, mediaUnique: D, extractedSections: b, sectionLookup: M, config: O } = v;
      if (!D || !$ || !O)
        return;
      console.log("Creating document with:", { name: $, sections: Object.keys(b) });
      const E = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${o}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${d}`
          }
        }
      );
      if (!E.ok) {
        const e = await E.json();
        console.error("Scaffold failed:", e), t.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${e.title || "Unknown error"}` }
        });
        return;
      }
      const q = await E.json();
      console.log("Scaffold response:", q), console.log("Scaffold values aliases:", (w = q.values) == null ? void 0 : w.map((e) => e.alias));
      const V = q.values ? JSON.parse(JSON.stringify(q.values)) : [];
      console.log("Extracted sections available:", Object.keys(b).length, "elements"), console.log("Mappings to apply:", O.map.mappings.map((e) => `${e.source} -> ${e.destinations.map((c) => c.target).join(", ")}`));
      const W = /* @__PURE__ */ new Set();
      for (const e of O.map.mappings) {
        if (e.enabled === !1) {
          console.log(`Skipping disabled mapping for source: ${e.source}`);
          continue;
        }
        const c = (M == null ? void 0 : M[e.source]) ?? b[e.source];
        if (!c) {
          console.log(`No extracted value for source: "${e.source}"`);
          continue;
        }
        console.log(`Applying mapping for "${e.source}" (${c.length} chars)`);
        for (const U of e.destinations)
          R(this, N, F).call(this, V, U, c, O, W);
      }
      console.log("Values after all mappings applied:");
      for (const e of V) {
        const c = typeof e.value == "string" ? e.value.substring(0, 60) : typeof e.value == "object" ? "[object]" : e.value;
        console.log(`  ${e.alias}: ${c}`);
      }
      const J = {
        parent: n ? { id: n } : null,
        documentType: { id: s },
        template: q.template ? { id: q.template.id } : null,
        values: V,
        variants: [
          {
            name: $,
            culture: null,
            segment: null
          }
        ]
      };
      console.log("Create request:", JSON.stringify(J, null, 2));
      const _ = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${d}`
        },
        body: JSON.stringify(J)
      });
      if (!_.ok) {
        const e = await _.json();
        console.error("Document creation failed:", e), t.peek("danger", {
          data: { message: `Failed to create document: ${e.title || e.detail || "Unknown error"}` }
        });
        return;
      }
      const K = _.headers.get("Location"), B = K == null ? void 0 : K.split("/").pop();
      if (console.log("Document created successfully! ID:", B), B) {
        const e = await fetch(`/umbraco/management/api/v1/document/${B}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${d}`
          }
        });
        if (e.ok) {
          const c = await e.json();
          console.log("Fetched document for save:", c);
          const U = await fetch(`/umbraco/management/api/v1/document/${B}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${d}`
            },
            body: JSON.stringify(c)
          });
          U.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await U.text());
        } else
          console.warn("Could not fetch document for save:", await e.text());
      }
      if (t.peek("positive", {
        data: { message: `Document "${$}" created successfully!` }
      }), B) {
        const e = `/umbraco/section/content/workspace/document/edit/${B}`;
        setTimeout(() => {
          window.location.href = e;
        }, 150);
      }
    } catch (p) {
      console.error("Error creating document:", p), t.peek("danger", {
        data: { message: "An unexpected error occurred while creating the document." }
      });
    }
  }
}
j = new WeakMap(), x = new WeakMap(), A = new WeakMap(), N = new WeakSet(), /**
 * Applies a single destination mapping from the config.
 * Handles both simple field mappings and block grid mappings.
 * mappedFields tracks which fields have been written by our mappings —
 * first write replaces the blueprint default, subsequent writes concatenate.
 */
F = function(t, n, y, w, p) {
  var d, T, m, g;
  let k = y;
  const h = (d = n.transforms) == null ? void 0 : d.some((a) => a.type === "convertMarkdownToHtml");
  if (n.blockKey) {
    for (const a of w.destination.blockGrids ?? []) {
      const o = a.blocks.find((s) => s.key === n.blockKey);
      if (o != null && o.identifyBy) {
        R(this, N, G).call(this, t, a.alias, o.identifyBy, n.target, k, h, p);
        return;
      }
    }
    console.log(`Block ${n.blockKey} not found in destination config`);
    return;
  }
  const f = n.target.split(".");
  if (f.length === 1) {
    const a = f[0], o = t.find((s) => s.alias === a);
    if (o)
      if (p.has(a)) {
        const s = typeof o.value == "string" ? o.value : "";
        o.value = `${s} ${k}`;
      } else
        o.value = k;
    else
      t.push({ alias: a, value: k });
    p.add(a), console.log(`Set ${a} = "${String((o == null ? void 0 : o.value) ?? k).substring(0, 80)}"`);
  } else if (f.length === 3) {
    const [a, o, s] = f, i = (T = w.destination.blockGrids) == null ? void 0 : T.find((b) => b.key === a), r = i == null ? void 0 : i.blocks.find((b) => b.key === o);
    if (!i || !r) {
      console.log(`Block path ${n.target} not found in destination config`);
      return;
    }
    const v = i.alias, $ = ((g = (m = r.properties) == null ? void 0 : m.find((b) => b.key === s)) == null ? void 0 : g.alias) ?? s, D = r.identifyBy;
    if (!D) {
      console.log(`No identifyBy for block ${o}`);
      return;
    }
    R(this, N, G).call(this, t, v, D, $, k, h, p);
  }
}, /**
 * Applies a value to a property within a block grid.
 * Finds the block by searching for a property value match.
 * mappedFields tracks writes — first replaces blueprint default, subsequent concatenate.
 */
G = function(t, n, y, w, p, k, h) {
  var d, T;
  const f = t.find((m) => m.alias === n);
  if (!f || !f.value) {
    console.log(`No ${n} found in scaffold values`);
    return;
  }
  try {
    const m = typeof f.value == "string", g = m ? JSON.parse(f.value) : f.value, a = g.contentData;
    if (!a) {
      console.log(`No contentData in ${n}`);
      return;
    }
    let o = !1;
    for (const s of a) {
      const i = (d = s.values) == null ? void 0 : d.find((r) => r.alias === y.property);
      if (i && typeof i.value == "string" && i.value.toLowerCase().includes(y.value.toLowerCase())) {
        console.log(`Found matching block for "${y.value}":`, s.key), o = !0;
        const r = (T = s.values) == null ? void 0 : T.find((v) => v.alias === w);
        if (r) {
          const v = `${s.key}:${w}`;
          if (h.has(v)) {
            const $ = typeof r.value == "string" ? r.value : "";
            r.value = `${$}
${p}`;
          } else
            r.value = p;
          h.add(v), console.log(`Updated ${w} in block`);
        }
        break;
      }
    }
    o || console.log(`WARNING: Did not find a block matching ${y.property} = "${y.value}"`), f.value = m ? JSON.stringify(g) : g;
  } catch (m) {
    console.error(`Failed to apply block mapping to ${n}:`, m);
  }
};
export {
  ge as UpDocEntityAction,
  ge as default
};
//# sourceMappingURL=up-doc-action-Dd1LxqiQ.js.map
