const t = [
  {
    type: "entityAction",
    kind: "default",
    alias: "CreateFromPdf.EntityAction",
    name: "Create from PDF Entity Action",
    weight: 1100,
    api: () => import("./create-from-pdf-action-D8bL6p0C.js"),
    forEntityTypes: ["document"],
    meta: {
      icon: "icon-document",
      label: "Create Document from Source"
    }
  },
  {
    type: "modal",
    alias: "CreateFromPdf.Modal",
    name: "Create from PDF Modal",
    element: () => import("./create-from-pdf-modal.element-DqY0LxK7.js")
  }
];
export {
  t as manifests
};
//# sourceMappingURL=create-from-pdf.js.map
