var j = (n) => {
  throw TypeError(n);
};
var B = (n, i, e) => i.has(n) || j("Cannot " + e);
var A = (n, i, e) => (B(n, i, "read from private field"), e ? e.call(n) : i.get(n)), k = (n, i, e) => i.has(n) ? j("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(n) : i.set(n, e);
var C = (n, i, e) => (B(n, i, "access private method"), e);
import { UmbModalToken as _, umbOpenModal as z } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as J } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as L } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as V } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as H } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as K } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as W } from "@umbraco-cms/backoffice/document";
const X = new _(
  "CreateFromPdf.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var N, G, O, m, P, E, I;
class se extends J {
  constructor(e, r) {
    super(e, r);
    k(this, m);
    k(this, N, new H(this));
    k(this, G, new K(this));
    k(this, O, new W(this));
  }
  async execute() {
    var T;
    const e = await this.getContext(L), r = this.args.unique ?? null;
    let s;
    try {
      s = await z(this, X, {
        data: { unique: r }
      });
    } catch {
      return;
    }
    const { name: g, mediaUnique: D, pageTitle: y, pageTitleShort: w, pageDescription: l, itineraryContent: c } = s;
    if (!(!D || !g)) {
      console.log("Creating document with:", { name: g, pageTitle: y, pageTitleShort: w, pageDescription: l, itineraryContent: c == null ? void 0 : c.substring(0, 100) });
      try {
        let d = null;
        if (r) {
          console.log("Getting parent document info for:", r);
          const { data: t } = await A(this, O).requestItems([r]);
          console.log("Parent items:", t), t != null && t.length && (d = t[0].documentType.unique, console.log("Parent document type unique:", d));
        }
        console.log("Getting allowed children for docType:", d, "parent:", r);
        const p = await A(this, N).requestAllowedChildrenOf(
          d,
          r
        );
        console.log("Full result from requestAllowedChildrenOf:", p);
        const o = p.data;
        if (console.log("Allowed types data:", o), !((T = o == null ? void 0 : o.items) != null && T.length)) {
          console.log("No allowed types found, items:", o == null ? void 0 : o.items), e.peek("danger", {
            data: { message: "No document types are allowed as children of this page." }
          });
          return;
        }
        console.log("Allowed document types:", o.items);
        let a = null, f = null;
        for (const t of o.items) {
          const { data: u } = await A(this, G).requestItemsByDocumentType(t.unique);
          if (u != null && u.length) {
            a = u[0], f = t.unique;
            break;
          }
        }
        if (!a) {
          e.peek("danger", {
            data: { message: "No blueprint found for allowed document types. Please create a blueprint first." }
          });
          return;
        }
        console.log("Using blueprint:", a.name, a.unique), console.log("Document type:", f);
        const q = await (await this.getContext(V)).getLatestToken(), R = await fetch(
          `/umbraco/management/api/v1/document-blueprint/${a.unique}/scaffold`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${q}`
            }
          }
        );
        if (!R.ok) {
          const t = await R.json();
          console.error("Scaffold failed:", t), e.peek("danger", {
            data: { message: `Failed to scaffold from blueprint: ${t.title || "Unknown error"}` }
          });
          return;
        }
        const b = await R.json();
        console.log("Scaffold response:", b);
        const U = b.values ? [...b.values] : [], S = (t, u) => {
          const v = U.find((M) => M.alias === t);
          v ? v.value = u : U.push({ alias: t, value: u });
        };
        S("pageTitle", y), S("pageTitleShort", w), S("pageDescription", l), c && C(this, m, P).call(this, U, c);
        const $ = {
          parent: r ? { id: r } : null,
          documentType: { id: f },
          template: b.template ? { id: b.template.id } : null,
          values: U,
          variants: [
            {
              name: g,
              culture: null,
              segment: null
            }
          ]
        };
        console.log("Create request:", JSON.stringify($, null, 2));
        const x = await fetch("/umbraco/management/api/v1/document", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${q}`
          },
          body: JSON.stringify($)
        });
        if (!x.ok) {
          const t = await x.json();
          console.error("Document creation failed:", t), e.peek("danger", {
            data: { message: `Failed to create document: ${t.title || t.detail || "Unknown error"}` }
          });
          return;
        }
        const F = x.headers.get("Location"), h = F == null ? void 0 : F.split("/").pop();
        if (console.log("Document created successfully! ID:", h), h) {
          const t = await fetch(`/umbraco/management/api/v1/document/${h}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${q}`
            }
          });
          if (t.ok) {
            const u = await t.json();
            console.log("Fetched document for save:", u);
            const v = await fetch(`/umbraco/management/api/v1/document/${h}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${q}`
              },
              body: JSON.stringify(u)
            });
            v.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await v.text());
          } else
            console.warn("Could not fetch document for save:", await t.text());
        }
        if (e.peek("positive", {
          data: { message: `Document "${g}" created successfully!` }
        }), h) {
          const t = `/umbraco/section/content/workspace/document/edit/${h}`;
          setTimeout(() => {
            window.location.href = t;
          }, 150);
        }
      } catch (d) {
        console.error("Error creating document:", d), e.peek("danger", {
          data: { message: "An unexpected error occurred while creating the document." }
        });
      }
    }
  }
}
N = new WeakMap(), G = new WeakMap(), O = new WeakMap(), m = new WeakSet(), /**
 * Updates the contentGrid value to replace the "Suggested Itinerary" RTE content
 */
P = function(e, r) {
  var g, D, y, w;
  const s = e.find((l) => l.alias === "contentGrid");
  if (!s || !s.value) {
    console.log("No contentGrid found in scaffold values");
    return;
  }
  try {
    const l = typeof s.value == "string";
    console.log("contentGrid original type:", l ? "string" : "object");
    const c = l ? JSON.parse(s.value) : s.value;
    console.log("Parsed contentGrid:", c), console.log("contentData length:", (g = c.contentData) == null ? void 0 : g.length);
    const T = c.contentData;
    if (!T) {
      console.log("No contentData in contentGrid");
      return;
    }
    let d = !1;
    for (const p of T) {
      console.log("Checking block:", p.key, "contentTypeKey:", p.contentTypeKey), console.log("Block values:", (D = p.values) == null ? void 0 : D.map((a) => ({ alias: a.alias, value: typeof a.value == "object" ? "[object]" : a.value })));
      const o = (y = p.values) == null ? void 0 : y.find((a) => a.alias === "featurePropertyFeatureTitle");
      if (console.log("Title value for block:", o == null ? void 0 : o.value), o && typeof o.value == "string" && o.value.toLowerCase().includes("suggested itinerary")) {
        console.log("Found Suggested Itinerary block:", p.key), d = !0;
        const a = (w = p.values) == null ? void 0 : w.find((f) => f.alias === "richTextContent");
        if (a) {
          const f = C(this, m, E).call(this, r);
          a.value = {
            blocks: {
              contentData: [],
              settingsData: [],
              expose: [],
              Layout: {}
            },
            markup: f
          }, console.log("Updated richTextContent with itinerary");
        }
        break;
      }
    }
    d || console.log('WARNING: Did not find a block with featurePropertyFeatureTitle containing "suggested itinerary"'), s.value = l ? JSON.stringify(c) : c, console.log("ContentGrid updated successfully (stringified:", l, ")");
  } catch (l) {
    console.error("Failed to update contentGrid:", l);
  }
}, /**
 * Converts plain text to HTML with paragraph tags
 */
E = function(e) {
  return e ? e.split(/\n+/).filter((s) => s.trim()).map((s) => `<p>${C(this, m, I).call(this, s.trim())}</p>`).join(`
`) || `<p>${C(this, m, I).call(this, e)}</p>` : "";
}, /**
 * Escapes HTML special characters
 */
I = function(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};
export {
  se as CreateFromPdfEntityAction,
  se as default
};
//# sourceMappingURL=create-from-pdf-action-rSrhSCno.js.map
