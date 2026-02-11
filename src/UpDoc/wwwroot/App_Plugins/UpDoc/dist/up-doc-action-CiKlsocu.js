var L = (r) => {
  throw TypeError(r);
};
var P = (r, u, t) => u.has(r) || L("Cannot " + t);
var I = (r, u, t) => (P(r, u, "read from private field"), t ? t.call(r) : u.get(r)), C = (r, u, t) => u.has(r) ? L("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(r) : u.set(r, t);
var V = (r, u, t) => (P(r, u, "access private method"), t);
import { U as K, m as W, b as H } from "./transforms-DnejYoqT.js";
import { U as X } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { f as Q } from "./workflow.service-BLucYv1b.js";
import { UmbEntityActionBase as Y } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as F } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as Z } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as ee } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as te } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as oe } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as ne } from "@umbraco-cms/backoffice/document";
var S, x, R, N, G, z;
class ge extends Y {
  constructor(t, o) {
    super(t, o);
    C(this, N);
    C(this, S, new te(this));
    C(this, x, new oe(this));
    C(this, R, new ne(this));
  }
  async execute() {
    var g, w;
    const t = await this.getContext(Z), o = this.args.unique ?? null;
    try {
      let p = null;
      if (o) {
        const { data: e } = await I(this, R).requestItems([o]);
        e != null && e.length && (p = e[0].documentType.unique);
      }
      const n = (await I(this, S).requestAllowedChildrenOf(
        p,
        o
      )).data;
      if (!((g = n == null ? void 0 : n.items) != null && g.length)) {
        t.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const m = await (await this.getContext(ee)).getLatestToken(), d = await Q(m), h = new Set(d.blueprintIds), s = [];
      for (const e of n.items) {
        const { data: i } = await I(this, x).requestItemsByDocumentType(e.unique);
        if (i != null && i.length) {
          const k = i.filter((B) => h.has(B.unique));
          k.length && s.push({
            documentTypeUnique: e.unique,
            documentTypeName: e.name,
            documentTypeIcon: e.icon ?? null,
            blueprints: k.map((B) => ({
              blueprintUnique: B.unique,
              blueprintName: B.name
            }))
          });
        }
      }
      if (!s.length) {
        t.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let f;
      try {
        f = await F(this, X, {
          data: { documentTypes: s }
        });
      } catch {
        return;
      }
      const { blueprintUnique: c, documentTypeUnique: l } = f, a = s.find((e) => e.documentTypeUnique === l), y = a == null ? void 0 : a.blueprints.find((e) => e.blueprintUnique === c);
      console.log("Selected blueprint:", c, "Document type:", l);
      let D;
      try {
        D = await F(this, K, {
          data: {
            unique: o,
            documentTypeName: (a == null ? void 0 : a.documentTypeName) ?? "",
            blueprintName: (y == null ? void 0 : y.blueprintName) ?? "",
            blueprintId: c
          }
        });
      } catch {
        return;
      }
      const { name: b, mediaUnique: v, extractedSections: j, config: O } = D;
      if (!v || !b || !O)
        return;
      console.log("Creating document with:", { name: b, sections: Object.keys(j) });
      const A = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${c}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${m}`
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
      const $ = await A.json();
      console.log("Scaffold response:", $), console.log("Scaffold values aliases:", (w = $.values) == null ? void 0 : w.map((e) => e.alias));
      const M = $.values ? JSON.parse(JSON.stringify($.values)) : [];
      console.log("Extracted sections available:", Object.keys(j)), console.log("Mappings to apply:", O.map.mappings.map((e) => `${e.source} -> ${e.destinations.map((i) => i.target).join(", ")}`));
      for (const e of O.map.mappings) {
        if (e.enabled === !1) {
          console.log(`Skipping disabled mapping for source: ${e.source}`);
          continue;
        }
        const i = j[e.source];
        if (!i) {
          console.log(`No extracted value for source: "${e.source}"`);
          continue;
        }
        console.log(`Applying mapping for "${e.source}" (${i.length} chars)`);
        for (const k of e.destinations)
          V(this, N, G).call(this, M, k, i, O);
      }
      console.log("Values after all mappings applied:");
      for (const e of M) {
        const i = typeof e.value == "string" ? e.value.substring(0, 60) : typeof e.value == "object" ? "[object]" : e.value;
        console.log(`  ${e.alias}: ${i}`);
      }
      const J = {
        parent: o ? { id: o } : null,
        documentType: { id: l },
        template: $.template ? { id: $.template.id } : null,
        values: M,
        variants: [
          {
            name: b,
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
          Authorization: `Bearer ${m}`
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
      const _ = E.headers.get("Location"), U = _ == null ? void 0 : _.split("/").pop();
      if (console.log("Document created successfully! ID:", U), U) {
        const e = await fetch(`/umbraco/management/api/v1/document/${U}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${m}`
          }
        });
        if (e.ok) {
          const i = await e.json();
          console.log("Fetched document for save:", i);
          const k = await fetch(`/umbraco/management/api/v1/document/${U}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${m}`
            },
            body: JSON.stringify(i)
          });
          k.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await k.text());
        } else
          console.warn("Could not fetch document for save:", await e.text());
      }
      if (t.peek("positive", {
        data: { message: `Document "${b}" created successfully!` }
      }), U) {
        const e = `/umbraco/section/content/workspace/document/edit/${U}`;
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
S = new WeakMap(), x = new WeakMap(), R = new WeakMap(), N = new WeakSet(), /**
 * Applies a single destination mapping from the config.
 * Handles both simple field mappings and block grid mappings.
 */
G = function(t, o, g, w) {
  var T, m, d, h;
  let p = g;
  const q = (T = o.transforms) == null ? void 0 : T.some((s) => s.type === "convertMarkdownToHtml"), n = o.target.split(".");
  if (n.length === 1) {
    const s = n[0], f = t.find((c) => c.alias === s);
    f ? f.value = p : t.push({ alias: s, value: p }), console.log(`Set ${s} = "${p.substring(0, 50)}..."`);
  } else if (n.length === 3) {
    const [s, f, c] = n, l = (m = w.destination.blockGrids) == null ? void 0 : m.find((v) => v.key === s), a = l == null ? void 0 : l.blocks.find((v) => v.key === f);
    if (!l || !a) {
      console.log(`Block path ${o.target} not found in destination config`);
      return;
    }
    const y = l.alias, D = ((h = (d = a.properties) == null ? void 0 : d.find((v) => v.key === c)) == null ? void 0 : h.alias) ?? c, b = a.identifyBy;
    if (!b) {
      console.log(`No identifyBy for block ${f}`);
      return;
    }
    V(this, N, z).call(this, t, y, b, D, p, q);
  }
}, /**
 * Applies a value to a property within a block grid.
 * Finds the block by searching for a property value match.
 */
z = function(t, o, g, w, p, q) {
  var T, m;
  const n = t.find((d) => d.alias === o);
  if (!n || !n.value) {
    console.log(`No ${o} found in scaffold values`);
    return;
  }
  try {
    const d = typeof n.value == "string", h = d ? JSON.parse(n.value) : n.value, s = h.contentData;
    if (!s) {
      console.log(`No contentData in ${o}`);
      return;
    }
    let f = !1;
    for (const c of s) {
      const l = (T = c.values) == null ? void 0 : T.find((a) => a.alias === g.property);
      if (l && typeof l.value == "string" && l.value.toLowerCase().includes(g.value.toLowerCase())) {
        console.log(`Found matching block for "${g.value}":`, c.key), f = !0;
        const a = (m = c.values) == null ? void 0 : m.find((y) => y.alias === w);
        if (a) {
          if (q) {
            const y = W(p);
            a.value = H(y);
          } else
            a.value = p;
          console.log(`Updated ${w} in block`);
        }
        break;
      }
    }
    f || console.log(`WARNING: Did not find a block matching ${g.property} = "${g.value}"`), n.value = d ? JSON.stringify(h) : h;
  } catch (d) {
    console.error(`Failed to apply block mapping to ${o}:`, d);
  }
};
export {
  ge as UpDocEntityAction,
  ge as default
};
//# sourceMappingURL=up-doc-action-CiKlsocu.js.map
