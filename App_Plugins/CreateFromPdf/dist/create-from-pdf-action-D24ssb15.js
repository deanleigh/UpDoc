import { UmbModalToken as s, umbOpenModal as c } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as l } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as i } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as u } from "@umbraco-cms/backoffice/auth";
const d = new s(
  "CreateFromPdf.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
class P extends l {
  constructor(t, e) {
    super(t, e);
  }
  async execute() {
    let t;
    try {
      t = await c(this, d, {
        data: { unique: this.args.unique ?? null }
      });
    } catch {
      return;
    }
    console.log("Modal returned value:", t);
    const { mediaUnique: e } = t;
    if (console.log("MediaUnique:", e), !e) {
      console.log("Returning early - no PDF selected");
      return;
    }
    const r = await (await this.getContext(u)).getLatestToken(), o = await fetch(
      `/umbraco/management/api/v1/createfrompdf/page-properties?mediaKey=${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${r}`
        }
      }
    );
    if (!o.ok) {
      const a = await o.json();
      console.error("PDF extraction failed:", a), (await this.getContext(i)).peek("danger", {
        data: { message: `PDF extraction failed: ${a.error || "Unknown error"}` }
      });
      return;
    }
    const n = await o.json();
    console.log("=== PDF Page Properties ==="), console.log("Title → Page Title, Page Title Short:", n.title), console.log("Description → Page Description:", n.description), console.log("==========================="), (await this.getContext(i)).peek("positive", {
      data: { message: `Extracted: "${n.title}"` }
    }), console.log("Parent unique:", this.args.unique);
  }
}
export {
  P as CreateFromPdfEntityAction,
  P as default
};
//# sourceMappingURL=create-from-pdf-action-D24ssb15.js.map
