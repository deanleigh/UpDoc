const t = [
  {
    type: "entityAction",
    kind: "default",
    alias: "CreateFromPdf.EntityAction",
    name: "Create from PDF Entity Action",
    weight: 1100,
    api: () => import("./create-from-pdf-action-rSrhSCno.js"),
    forEntityTypes: ["document"],
    meta: {
      icon: "icon-document",
      label: "Create Document from PDF"
    }
  },
  {
    type: "modal",
    alias: "CreateFromPdf.Modal",
    name: "Create from PDF Modal",
    element: () => import("./create-from-pdf-modal.element-DG3lRnnj.js")
  }
];
export {
  t as manifests
};
//# sourceMappingURL=create-from-pdf.js.map
