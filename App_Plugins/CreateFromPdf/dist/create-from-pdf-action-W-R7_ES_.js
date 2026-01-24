import { UmbModalToken as o, umbOpenModal as a } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as n } from "@umbraco-cms/backoffice/entity-action";
const r = new o(
  "CreateFromPdf.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
class m extends n {
  constructor(t, e) {
    super(t, e);
  }
  async execute() {
    const t = await a(this, r, {
      data: { unique: this.args.unique ?? null }
    }), { name: e } = t;
    e && console.log("Create from PDF:", e);
  }
}
export {
  m as CreateFromPdfEntityAction,
  m as default
};
//# sourceMappingURL=create-from-pdf-action-W-R7_ES_.js.map
