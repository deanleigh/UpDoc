var B = (o) => {
  throw TypeError(o);
};
var S = (o, n, t) => n.has(o) || B("Cannot " + t);
var f = (o, n, t) => (S(o, n, "read from private field"), t ? t.call(o) : n.get(o)), g = (o, n, t) => n.has(o) ? B("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(o) : n.set(o, t);
import { UmbModalToken as E, umbOpenModal as F } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as P } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as j } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as M } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as _ } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as z } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as G } from "@umbraco-cms/backoffice/document";
const J = new E(
  "CreateFromPdf.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var h, w, y;
class ee extends P {
  constructor(t, a) {
    super(t, a);
    g(this, h, new _(this));
    g(this, w, new z(this));
    g(this, y, new G(this));
  }
  async execute() {
    var R;
    const t = await this.getContext(j), a = this.args.unique ?? null;
    let U;
    try {
      U = await F(this, J, {
        data: { unique: a }
      });
    } catch {
      return;
    }
    const { name: d, mediaUnique: I, pageTitle: A, pageTitleShort: v, pageDescription: O } = U;
    if (!(!I || !d)) {
      console.log("Creating document with:", { name: d, pageTitle: A, pageTitleShort: v, pageDescription: O });
      try {
        let i = null;
        if (a) {
          console.log("Getting parent document info for:", a);
          const { data: e } = await f(this, y).requestItems([a]);
          console.log("Parent items:", e), e != null && e.length && (i = e[0].documentType.unique, console.log("Parent document type unique:", i));
        }
        console.log("Getting allowed children for docType:", i, "parent:", a);
        const x = await f(this, h).requestAllowedChildrenOf(
          i,
          a
        );
        console.log("Full result from requestAllowedChildrenOf:", x);
        const r = x.data;
        if (console.log("Allowed types data:", r), !((R = r == null ? void 0 : r.items) != null && R.length)) {
          console.log("No allowed types found, items:", r == null ? void 0 : r.items), t.peek("danger", {
            data: { message: "No document types are allowed as children of this page." }
          });
          return;
        }
        console.log("Allowed document types:", r.items);
        let l = null, T = null;
        for (const e of r.items) {
          const { data: s } = await f(this, w).requestItemsByDocumentType(e.unique);
          if (s != null && s.length) {
            l = s[0], T = e.unique;
            break;
          }
        }
        if (!l) {
          t.peek("danger", {
            data: { message: "No blueprint found for allowed document types. Please create a blueprint first." }
          });
          return;
        }
        console.log("Using blueprint:", l.name, l.unique), console.log("Document type:", T);
        const p = await (await this.getContext(M)).getLatestToken(), b = await fetch(
          `/umbraco/management/api/v1/document-blueprint/${l.unique}/scaffold`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${p}`
            }
          }
        );
        if (!b.ok) {
          const e = await b.json();
          console.error("Scaffold failed:", e), t.peek("danger", {
            data: { message: `Failed to scaffold from blueprint: ${e.title || "Unknown error"}` }
          });
          return;
        }
        const u = await b.json();
        console.log("Scaffold response:", u);
        const C = u.values ? [...u.values] : [], q = (e, s) => {
          const m = C.find((N) => N.alias === e);
          m ? m.value = s : C.push({ alias: e, value: s });
        };
        q("pageTitle", A), q("pageTitleShort", v), q("pageDescription", O);
        const $ = {
          parent: a ? { id: a } : null,
          documentType: { id: T },
          template: u.template ? { id: u.template.id } : null,
          values: C,
          variants: [
            {
              name: d,
              culture: null,
              segment: null
            }
          ]
        };
        console.log("Create request:", JSON.stringify($, null, 2));
        const D = await fetch("/umbraco/management/api/v1/document", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${p}`
          },
          body: JSON.stringify($)
        });
        if (!D.ok) {
          const e = await D.json();
          console.error("Document creation failed:", e), t.peek("danger", {
            data: { message: `Failed to create document: ${e.title || e.detail || "Unknown error"}` }
          });
          return;
        }
        const k = D.headers.get("Location"), c = k == null ? void 0 : k.split("/").pop();
        if (console.log("Document created successfully! ID:", c), c) {
          const e = await fetch(`/umbraco/management/api/v1/document/${c}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${p}`
            }
          });
          if (e.ok) {
            const s = await e.json();
            console.log("Fetched document for save:", s);
            const m = await fetch(`/umbraco/management/api/v1/document/${c}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${p}`
              },
              body: JSON.stringify(s)
            });
            m.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await m.text());
          } else
            console.warn("Could not fetch document for save:", await e.text());
        }
        if (t.peek("positive", {
          data: { message: `Document "${d}" created successfully!` }
        }), c) {
          const e = `/umbraco/section/content/workspace/document/edit/${c}`;
          setTimeout(() => {
            window.location.href = e;
          }, 150);
        }
      } catch (i) {
        console.error("Error creating document:", i), t.peek("danger", {
          data: { message: "An unexpected error occurred while creating the document." }
        });
      }
    }
  }
}
h = new WeakMap(), w = new WeakMap(), y = new WeakMap();
export {
  ee as CreateFromPdfEntityAction,
  ee as default
};
//# sourceMappingURL=create-from-pdf-action-aI-eu2Sg.js.map
