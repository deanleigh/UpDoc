const t = [
  {
    type: "entityAction",
    kind: "default",
    alias: "UpDoc.EntityAction",
    name: "UpDoc Entity Action",
    weight: 1100,
    api: () => import("./up-doc-action-BcM3AAF9.js"),
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
    alias: "UpDoc.Modal",
    name: "UpDoc Modal",
    element: () => import("./up-doc-modal.element-w_AgZg1R.js")
  },
  {
    type: "modal",
    alias: "UpDoc.BlueprintPickerModal",
    name: "Blueprint Picker Modal",
    element: () => import("./blueprint-picker-modal.element-CxJdS4ni.js")
  }
];
export {
  t as manifests
};
//# sourceMappingURL=updoc.js.map
