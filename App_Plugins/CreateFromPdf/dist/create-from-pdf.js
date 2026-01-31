const e = [
  {
    type: "entityAction",
    kind: "default",
    alias: "CreateFromPdf.EntityAction",
    name: "Create from PDF Entity Action",
    weight: 1100,
    api: () => import("./create-from-pdf-action-2yttgcvR.js"),
    forEntityTypes: ["document"],
    meta: {
      icon: "icon-document",
      label: "Create Document from Source"
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed"
      }
    ]
  },
  {
    type: "modal",
    alias: "CreateFromPdf.Modal",
    name: "Create from PDF Modal",
    element: () => import("./create-from-pdf-modal.element-DqY0LxK7.js")
  },
  {
    type: "modal",
    alias: "CreateFromPdf.BlueprintPickerModal",
    name: "Blueprint Picker Modal",
    element: () => import("./blueprint-picker-modal.element-DGJxWxKE.js")
  }
];
export {
  e as manifests
};
//# sourceMappingURL=create-from-pdf.js.map
