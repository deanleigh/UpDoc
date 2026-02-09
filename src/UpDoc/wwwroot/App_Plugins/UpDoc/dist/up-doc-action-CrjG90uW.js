var L = (i) => {
  throw TypeError(i);
};
var P = (i, u, t) => u.has(i) || L("Cannot " + t);
var I = (i, u, t) => (P(i, u, "read from private field"), t ? t.call(i) : u.get(i)), C = (i, u, t) => u.has(i) ? L("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(i) : u.set(i, t);
var V = (i, u, t) => (P(i, u, "access private method"), t);
import { U as K, a as W, m as H, b as X } from "./transforms-DQCctQX1.js";
import { f as Q } from "./workflow.service-C-MBMeeJ.js";
import { UmbEntityActionBase as Y } from "@umbraco-cms/backoffice/entity-action";
import { umbOpenModal as F } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as Z } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as ee } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as te } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as oe } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as ne } from "@umbraco-cms/backoffice/document";
var S, x, R, N, G, z;
class fe extends Y {
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
      const d = await (await this.getContext(ee)).getLatestToken(), m = await Q(d), h = new Set(m.blueprintIds), a = [];
      for (const e of n.items) {
        const { data: s } = await I(this, x).requestItemsByDocumentType(e.unique);
        if (s != null && s.length) {
          const k = s.filter((B) => h.has(B.unique));
          k.length && a.push({
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
      if (!a.length) {
        t.peek("warning", {
          data: { message: "No workflows are configured for the document types allowed here." }
        });
        return;
      }
      let f;
      try {
        f = await F(this, K, {
          data: { documentTypes: a }
        });
      } catch {
        return;
      }
      const { blueprintUnique: r, documentTypeUnique: c } = f, l = a.find((e) => e.documentTypeUnique === c), y = l == null ? void 0 : l.blueprints.find((e) => e.blueprintUnique === r);
      console.log("Selected blueprint:", r, "Document type:", c);
      let q;
      try {
        q = await F(this, W, {
          data: {
            unique: o,
            blueprintName: (y == null ? void 0 : y.blueprintName) ?? "",
            blueprintId: r
          }
        });
      } catch {
        return;
      }
      const { name: b, mediaUnique: v, extractedSections: j, config: O } = q;
      if (!v || !b || !O)
        return;
      console.log("Creating document with:", { name: b, sections: Object.keys(j) });
      const A = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${r}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${d}`
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
      console.log("Extracted sections available:", Object.keys(j)), console.log("Mappings to apply:", O.map.mappings.map((e) => `${e.source} -> ${e.destinations.map((s) => s.target).join(", ")}`));
      for (const e of O.map.mappings) {
        if (e.enabled === !1) {
          console.log(`Skipping disabled mapping for source: ${e.source}`);
          continue;
        }
        const s = j[e.source];
        if (!s) {
          console.log(`No extracted value for source: "${e.source}"`);
          continue;
        }
        console.log(`Applying mapping for "${e.source}" (${s.length} chars)`);
        for (const k of e.destinations)
          V(this, N, G).call(this, M, k, s, O);
      }
      console.log("Values after all mappings applied:");
      for (const e of M) {
        const s = typeof e.value == "string" ? e.value.substring(0, 60) : typeof e.value == "object" ? "[object]" : e.value;
        console.log(`  ${e.alias}: ${s}`);
      }
      const J = {
        parent: o ? { id: o } : null,
        documentType: { id: c },
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
          Authorization: `Bearer ${d}`
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
            Authorization: `Bearer ${d}`
          }
        });
        if (e.ok) {
          const s = await e.json();
          console.log("Fetched document for save:", s);
          const k = await fetch(`/umbraco/management/api/v1/document/${U}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${d}`
            },
            body: JSON.stringify(s)
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
  var T, d, m, h;
  let p = g;
  const D = (T = o.transforms) == null ? void 0 : T.some((a) => a.type === "convertMarkdownToHtml"), n = o.target.split(".");
  if (n.length === 1) {
    const a = n[0], f = t.find((r) => r.alias === a);
    f ? f.value = p : t.push({ alias: a, value: p }), console.log(`Set ${a} = "${p.substring(0, 50)}..."`);
  } else if (n.length === 3) {
    const [a, f, r] = n, c = (d = w.destination.blockGrids) == null ? void 0 : d.find((v) => v.key === a), l = c == null ? void 0 : c.blocks.find((v) => v.key === f);
    if (!c || !l) {
      console.log(`Block path ${o.target} not found in destination config`);
      return;
    }
    const y = c.alias, q = ((h = (m = l.properties) == null ? void 0 : m.find((v) => v.key === r)) == null ? void 0 : h.alias) ?? r, b = l.identifyBy;
    if (!b) {
      console.log(`No identifyBy for block ${f}`);
      return;
    }
    V(this, N, z).call(this, t, y, b, q, p, D);
  }
}, /**
 * Applies a value to a property within a block grid.
 * Finds the block by searching for a property value match.
 */
z = function(t, o, g, w, p, D) {
  var T, d;
  const n = t.find((m) => m.alias === o);
  if (!n || !n.value) {
    console.log(`No ${o} found in scaffold values`);
    return;
  }
  try {
    const m = typeof n.value == "string", h = m ? JSON.parse(n.value) : n.value, a = h.contentData;
    if (!a) {
      console.log(`No contentData in ${o}`);
      return;
    }
    let f = !1;
    for (const r of a) {
      const c = (T = r.values) == null ? void 0 : T.find((l) => l.alias === g.property);
      if (c && typeof c.value == "string" && c.value.toLowerCase().includes(g.value.toLowerCase())) {
        console.log(`Found matching block for "${g.value}":`, r.key), f = !0;
        const l = (d = r.values) == null ? void 0 : d.find((y) => y.alias === w);
        if (l) {
          if (D) {
            const y = H(p);
            l.value = X(y);
          } else
            l.value = p;
          console.log(`Updated ${w} in block`);
        }
        break;
      }
    }
    f || console.log(`WARNING: Did not find a block matching ${g.property} = "${g.value}"`), n.value = m ? JSON.stringify(h) : h;
  } catch (m) {
    console.error(`Failed to apply block mapping to ${o}:`, m);
  }
};
export {
  fe as UpDocEntityAction,
  fe as default
};
//# sourceMappingURL=up-doc-action-CrjG90uW.js.map
