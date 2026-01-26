import { UmbModalToken as c, umbOpenModal as l } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as m } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as r } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as u } from "@umbraco-cms/backoffice/auth";
const d = new c(
  "CreateFromPdf.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
class y extends m {
  constructor(t, e) {
    super(t, e);
  }
  async execute() {
    let t;
    try {
      t = await l(this, d, {
        data: { unique: this.args.unique ?? null }
      });
    } catch {
      return;
    }
    console.log("Modal returned value:", t);
    const { name: e, mediaUnique: n } = t;
    if (console.log("Name:", e, "MediaUnique:", n), !e || !n) {
      console.log("Returning early - name or mediaUnique is empty");
      return;
    }
    const s = await (await this.getContext(u)).getLatestToken(), a = await fetch(
      `/umbraco/management/api/v1/createfrompdf/extract?mediaKey=${n}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${s}`
        }
      }
    );
    if (!a.ok) {
      const i = await a.json();
      console.error("PDF extraction failed:", i), (await this.getContext(r)).peek("danger", {
        data: { message: `PDF extraction failed: ${i.error || "Unknown error"}` }
      });
      return;
    }
    const o = await a.json();
    console.log("PDF extraction result:", o), console.log("Extracted text:", o.text), console.log("Page count:", o.pageCount), (await this.getContext(r)).peek("positive", {
      data: { message: `Successfully extracted ${o.pageCount} page(s) from PDF` }
    }), console.log("Document name:", e);
  }
}
export {
  y as CreateFromPdfEntityAction,
  y as default
};
//# sourceMappingURL=create-from-pdf-action-YFbsQA5I.js.map
