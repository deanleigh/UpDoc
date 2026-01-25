const t = [
  {
    type: "entityAction",
    kind: "default",
    alias: "CreateFromPdf.EntityAction",
    name: "Create from PDF Entity Action",
    weight: 1100,
    api: () => import("./create-from-pdf-action-W-R7_ES_.js"),
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
    element: () => import("./create-from-pdf-modal.element-CDMLiQ6v.js")
  }
];
export {
  t as manifests
};
//# sourceMappingURL=create-from-pdf.js.map
