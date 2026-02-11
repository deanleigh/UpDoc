var L = (r) => {
  throw TypeError(r);
};
var P = (r, u, t) => u.has(r) || L("Cannot " + t);
var I = (r, u, t) => (P(r, u, "read from private field"), t ? t.call(r) : u.get(r)), q = (r, u, t) => u.has(r) ? L("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(r) : u.set(r, t);
var _ = (r, u, t) => (P(r, u, "access private method"), t);
import { U as W, m as H, b as X } from "./transforms-DnejYoqT.js";
import { U as Q } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as Y } from "./workflow.service-Cy8WOA0g.js";
import { UmbEntityActionBase as Z } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as F } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as ee } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as te } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as oe } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as ne } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as ae } from "@umbraco-cms/backoffice/document";
var R, j, x, C, G, z;
class ye extends Z {
  constructor(t, a) {
    super(t, a);
    q(this, C);
    q(this, R, new oe(this));
    q(this, j, new ne(this));
    q(this, x, new ae(this));
  }
  async execute() {
    var f, k;
    const t = await this.getContext(ee), a = this.args.unique ?? null;
    try {
      let g = null;
      if (a) {
        const { data: e } = await I(this, x).requestItems([a]);
        e != null && e.length && (g = e[0].documentType.unique);
      }
      const l = (await I(this, R).requestAllowedChildrenOf(
        g,
        a
      )).data;
      if (!((f = l == null ? void 0 : l.items) != null && f.length)) {
        t.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const p = await (await this.getContext(te)).getLatestToken(), d = await Y(p), b = new Set(d.blueprintIds), y = [];
      for (const e of l.items) {
        const { data: i } = await I(this, j).requestItemsByDocumentType(e.unique);
        if (i != null && i.length) {
          const T = i.filter((B) => b.has(B.unique));
          T.length && y.push({
            documentTypeUnique: e.unique,
            documentTypeName: e.name,
            documentTypeIcon: e.icon ?? null,
            blueprints: T.map((B) => ({
              blueprintUnique: B.unique,
              blueprintName: B.name
            }))
          });
        }
      }
      if (!y.length) {
        t.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let s;
      try {
        s = await F(this, Q, {
          data: { documentTypes: y }
        });
      } catch {
        return;
      }
      const { blueprintUnique: o, documentTypeUnique: c } = s, n = y.find((e) => e.documentTypeUnique === c), m = n == null ? void 0 : n.blueprints.find((e) => e.blueprintUnique === o);
      console.log("Selected blueprint:", o, "Document type:", c);
      let D;
      try {
        D = await F(this, W, {
          data: {
            unique: a,
            documentTypeName: (n == null ? void 0 : n.documentTypeName) ?? "",
            blueprintName: (m == null ? void 0 : m.blueprintName) ?? "",
            blueprintId: o
          }
        });
      } catch {
        return;
      }
      const { name: $, mediaUnique: O, extractedSections: h, config: S } = D;
      if (!O || !$ || !S)
        return;
      console.log("Creating document with:", { name: $, sections: Object.keys(h) });
      const A = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${o}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${p}`
          }
        }
      );
      if (!A.ok) {
        const e = await A.json();
        console.error("Scaffold failed:", e), t.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${e.title || "Unknown error"}` }
        });
        return;
      }
      const U = await A.json();
      console.log("Scaffold response:", U), console.log("Scaffold values aliases:", (k = U.values) == null ? void 0 : k.map((e) => e.alias));
      const M = U.values ? JSON.parse(JSON.stringify(U.values)) : [];
      console.log("Extracted sections available:", Object.keys(h).length, "elements"), console.log("Mappings to apply:", S.map.mappings.map((e) => `${e.source} -> ${e.destinations.map((i) => i.target).join(", ")}`));
      const K = /* @__PURE__ */ new Set();
      for (const e of S.map.mappings) {
        if (e.enabled === !1) {
          console.log(`Skipping disabled mapping for source: ${e.source}`);
          continue;
        }
        const i = h[e.source];
        if (!i) {
          console.log(`No extracted value for source: "${e.source}"`);
          continue;
        }
        console.log(`Applying mapping for "${e.source}" (${i.length} chars)`);
        for (const T of e.destinations)
          _(this, C, G).call(this, M, T, i, S, K);
      }
      console.log("Values after all mappings applied:");
      for (const e of M) {
        const i = typeof e.value == "string" ? e.value.substring(0, 60) : typeof e.value == "object" ? "[object]" : e.value;
        console.log(`  ${e.alias}: ${i}`);
      }
      const J = {
        parent: a ? { id: a } : null,
        documentType: { id: c },
        template: U.template ? { id: U.template.id } : null,
        values: M,
        variants: [
          {
            name: $,
            culture: null,
            segment: null
          }
        ]
      };
      console.log("Create request:", JSON.stringify(J, null, 2));
      const E = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${p}`
        },
        body: JSON.stringify(J)
      });
      if (!E.ok) {
        const e = await E.json();
        console.error("Document creation failed:", e), t.peek("danger", {
          data: { message: `Failed to create document: ${e.title || e.detail || "Unknown error"}` }
        });
        return;
      }
      const V = E.headers.get("Location"), N = V == null ? void 0 : V.split("/").pop();
      if (console.log("Document created successfully! ID:", N), N) {
        const e = await fetch(`/umbraco/management/api/v1/document/${N}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${p}`
          }
        });
        if (e.ok) {
          const i = await e.json();
          console.log("Fetched document for save:", i);
          const T = await fetch(`/umbraco/management/api/v1/document/${N}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${p}`
            },
            body: JSON.stringify(i)
          });
          T.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await T.text());
        } else
          console.warn("Could not fetch document for save:", await e.text());
      }
      if (t.peek("positive", {
        data: { message: `Document "${$}" created successfully!` }
      }), N) {
        const e = `/umbraco/section/content/workspace/document/edit/${N}`;
        setTimeout(() => {
          window.location.href = e;
        }, 150);
      }
    } catch (g) {
      console.error("Error creating document:", g), t.peek("danger", {
        data: { message: "An unexpected error occurred while creating the document." }
      });
    }
  }
}
R = new WeakMap(), j = new WeakMap(), x = new WeakMap(), C = new WeakSet(), /**
 * Applies a single destination mapping from the config.
 * Handles both simple field mappings and block grid mappings.
 * mappedFields tracks which fields have been written by our mappings —
 * first write replaces the blueprint default, subsequent writes concatenate.
 */
G = function(t, a, f, k, g) {
  var p, d, b, y;
  let w = f;
  const l = (p = a.transforms) == null ? void 0 : p.some((s) => s.type === "convertMarkdownToHtml"), v = a.target.split(".");
  if (v.length === 1) {
    const s = v[0], o = t.find((c) => c.alias === s);
    if (o)
      if (g.has(s)) {
        const c = typeof o.value == "string" ? o.value : "";
        o.value = `${c} ${w}`;
      } else
        o.value = w;
    else
      t.push({ alias: s, value: w });
    g.add(s), console.log(`Set ${s} = "${String((o == null ? void 0 : o.value) ?? w).substring(0, 80)}"`);
  } else if (v.length === 3) {
    const [s, o, c] = v, n = (d = k.destination.blockGrids) == null ? void 0 : d.find((h) => h.key === s), m = n == null ? void 0 : n.blocks.find((h) => h.key === o);
    if (!n || !m) {
      console.log(`Block path ${a.target} not found in destination config`);
      return;
    }
    const D = n.alias, $ = ((y = (b = m.properties) == null ? void 0 : b.find((h) => h.key === c)) == null ? void 0 : y.alias) ?? c, O = m.identifyBy;
    if (!O) {
      console.log(`No identifyBy for block ${o}`);
      return;
    }
    _(this, C, z).call(this, t, D, O, $, w, l);
  }
}, /**
 * Applies a value to a property within a block grid.
 * Finds the block by searching for a property value match.
 */
z = function(t, a, f, k, g, w) {
  var v, p;
  const l = t.find((d) => d.alias === a);
  if (!l || !l.value) {
    console.log(`No ${a} found in scaffold values`);
    return;
  }
  try {
    const d = typeof l.value == "string", b = d ? JSON.parse(l.value) : l.value, y = b.contentData;
    if (!y) {
      console.log(`No contentData in ${a}`);
      return;
    }
    let s = !1;
    for (const o of y) {
      const c = (v = o.values) == null ? void 0 : v.find((n) => n.alias === f.property);
      if (c && typeof c.value == "string" && c.value.toLowerCase().includes(f.value.toLowerCase())) {
        console.log(`Found matching block for "${f.value}":`, o.key), s = !0;
        const n = (p = o.values) == null ? void 0 : p.find((m) => m.alias === k);
        if (n) {
          if (w) {
            const m = H(g);
            n.value = X(m);
          } else
            n.value = g;
          console.log(`Updated ${k} in block`);
        }
        break;
      }
    }
    s || console.log(`WARNING: Did not find a block matching ${f.property} = "${f.value}"`), l.value = d ? JSON.stringify(b) : b;
  } catch (d) {
    console.error(`Failed to apply block mapping to ${a}:`, d);
  }
};
export {
  ye as UpDocEntityAction,
  ye as default
};
//# sourceMappingURL=up-doc-action-h0qLtZsD.js.map
