var N = (o) => {
  throw TypeError(o);
};
var F = (o, n, t) => n.has(o) || N("Cannot " + t);
var d = (o, n, t) => (F(o, n, "read from private field"), t ? t.call(o) : n.get(o)), m = (o, n, t) => n.has(o) ? N("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(o) : n.set(o, t);
import { UmbModalToken as M, umbOpenModal as _ } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as v } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as P } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as $ } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as j } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as z } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as G } from "@umbraco-cms/backoffice/document";
const L = new M(
  "CreateFromPdf.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var p, f, g;
class ee extends v {
  constructor(t, a) {
    super(t, a);
    m(this, p, new j(this));
    m(this, f, new z(this));
    m(this, g, new G(this));
  }
  async execute() {
    var A;
    const t = await this.getContext(P), a = this.args.unique ?? null;
    let C;
    try {
      C = await _(this, L, {
        data: { unique: a }
      });
    } catch {
      return;
    }
    const { name: u, mediaUnique: S, pageTitle: U, pageTitleShort: D, pageDescription: k } = C;
    if (!(!S || !u)) {
      console.log("Creating document with:", { name: u, pageTitle: U, pageTitleShort: D, pageDescription: k });
      try {
        let i = null;
        if (a) {
          console.log("Getting parent document info for:", a);
          const { data: e } = await d(this, g).requestItems([a]);
          console.log("Parent items:", e), e != null && e.length && (i = e[0].documentType.unique, console.log("Parent document type unique:", i));
        }
        console.log("Getting allowed children for docType:", i, "parent:", a);
        const O = await d(this, p).requestAllowedChildrenOf(
          i,
          a
        );
        console.log("Full result from requestAllowedChildrenOf:", O);
        const r = O.data;
        if (console.log("Allowed types data:", r), !((A = r == null ? void 0 : r.items) != null && A.length)) {
          console.log("No allowed types found, items:", r == null ? void 0 : r.items), t.peek("danger", {
            data: { message: "No document types are allowed as children of this page." }
          });
          return;
        }
        console.log("Allowed document types:", r.items);
        let l = null, h = null;
        for (const e of r.items) {
          const { data: s } = await d(this, f).requestItemsByDocumentType(e.unique);
          if (s != null && s.length) {
            l = s[0], h = e.unique;
            break;
          }
        }
        if (!l) {
          t.peek("danger", {
            data: { message: "No blueprint found for allowed document types. Please create a blueprint first." }
          });
          return;
        }
        console.log("Using blueprint:", l.name, l.unique), console.log("Document type:", h);
        const R = await (await this.getContext($)).getLatestToken(), y = await fetch(
          `/umbraco/management/api/v1/document-blueprint/${l.unique}/scaffold`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${R}`
            }
          }
        );
        if (!y.ok) {
          const e = await y.json();
          console.error("Scaffold failed:", e), t.peek("danger", {
            data: { message: `Failed to scaffold from blueprint: ${e.title || "Unknown error"}` }
          });
          return;
        }
        const c = await y.json();
        console.log("Scaffold response:", c);
        const w = c.values ? [...c.values] : [], T = (e, s) => {
          const I = w.find((E) => E.alias === e);
          I ? I.value = s : w.push({ alias: e, value: s });
        };
        T("pageTitle", U), T("pageTitleShort", D), T("pageDescription", k);
        const x = {
          parent: a ? { id: a } : null,
          documentType: { id: h },
          template: c.template ? { id: c.template.id } : null,
          values: w,
          variants: [
            {
              name: u,
              culture: null,
              segment: null
            }
          ]
        };
        console.log("Create request:", JSON.stringify(x, null, 2));
        const q = await fetch("/umbraco/management/api/v1/document", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${R}`
          },
          body: JSON.stringify(x)
        });
        if (!q.ok) {
          const e = await q.json();
          console.error("Document creation failed:", e), t.peek("danger", {
            data: { message: `Failed to create document: ${e.title || e.detail || "Unknown error"}` }
          });
          return;
        }
        const b = q.headers.get("Location"), B = b == null ? void 0 : b.split("/").pop();
        console.log("Document created successfully! ID:", B), t.peek("positive", {
          data: { message: `Document "${u}" created successfully!` }
        }), window.location.reload();
      } catch (i) {
        console.error("Error creating document:", i), t.peek("danger", {
          data: { message: "An unexpected error occurred while creating the document." }
        });
      }
    }
  }
}
p = new WeakMap(), f = new WeakMap(), g = new WeakMap();
export {
  ee as CreateFromPdfEntityAction,
  ee as default
};
//# sourceMappingURL=create-from-pdf-action-BvQbksSh.js.map
