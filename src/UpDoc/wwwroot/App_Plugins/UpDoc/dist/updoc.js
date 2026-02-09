const e = [
  // =====================================================================
  // Entity Action — "Create from Source" on content nodes
  // =====================================================================
  {
    type: "entityAction",
    kind: "default",
    alias: "UpDoc.EntityAction",
    name: "UpDoc Entity Action",
    weight: 1100,
    api: () => import("./up-doc-action-NIxcYyzi.js"),
    forEntityTypes: ["document"],
    meta: {
      icon: "icon-document",
      label: "Create Document from Source"
    },
    conditions: [
      {
        alias: "Umb.Condition.EntityIsNotTrashed"
      },
      {
        alias: "UpDoc.Condition.HasAvailableWorkflows"
      }
    ]
  },
  // =====================================================================
  // Condition — only show entity action when workflows exist
  // =====================================================================
  {
    type: "condition",
    alias: "UpDoc.Condition.HasAvailableWorkflows",
    name: "Has Available Workflows",
    api: () => import("./up-doc-has-workflows.condition-BHMpQTg8.js")
  },
  // =====================================================================
  // Collection Action — "Create from Source" button in collection toolbar
  // =====================================================================
  {
    type: "collectionAction",
    kind: "button",
    alias: "UpDoc.CollectionAction",
    name: "UpDoc Collection Action",
    element: () => import("./up-doc-collection-action.element-CgKxq42C.js"),
    weight: 50,
    meta: {
      label: "Create from Source"
    },
    conditions: [
      {
        alias: "Umb.Condition.CollectionAlias",
        match: "Umb.Collection.Document"
      }
    ]
  },
  // =====================================================================
  // Modals — Blueprint picker + sidebar workflow
  // =====================================================================
  {
    type: "modal",
    alias: "UpDoc.Modal",
    name: "UpDoc Modal",
    element: () => import("./up-doc-modal.element-JgfXxNRN.js")
  },
  {
    type: "modal",
    alias: "UpDoc.BlueprintPickerModal",
    name: "Blueprint Picker Modal",
    element: () => import("./blueprint-picker-modal.element-CxJdS4ni.js")
  },
  {
    type: "modal",
    alias: "UpDoc.CreateWorkflowModal",
    name: "Create Workflow Modal",
    element: () => import("./create-workflow-modal.element-uvH4Hc7Q.js")
  },
  // =====================================================================
  // Settings sidebar — UpDoc appears in Settings section
  // =====================================================================
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "UpDoc.SidebarApp",
    name: "UpDoc Sidebar",
    weight: 15,
    meta: {
      label: "UpDoc",
      menu: "UpDoc.Menu"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Settings"
      }
    ]
  },
  {
    type: "menu",
    alias: "UpDoc.Menu",
    name: "UpDoc Menu"
  },
  {
    type: "menuItem",
    kind: "tree",
    alias: "UpDoc.MenuItem.Tree",
    name: "UpDoc Menu Item",
    meta: {
      treeAlias: "UpDoc.Tree",
      menus: ["UpDoc.Menu"],
      hideTreeRoot: !0
    }
  },
  // =====================================================================
  // Tree — data source for sidebar items
  // =====================================================================
  {
    type: "repository",
    alias: "UpDoc.Tree.Repository",
    name: "UpDoc Tree Repository",
    api: () => import("./up-doc-tree.repository--8lbcPY9.js")
  },
  {
    type: "tree",
    kind: "default",
    alias: "UpDoc.Tree",
    name: "UpDoc Tree",
    meta: {
      repositoryAlias: "UpDoc.Tree.Repository"
    }
  },
  {
    type: "treeItem",
    kind: "default",
    alias: "UpDoc.TreeItem",
    name: "UpDoc Tree Item",
    forEntityTypes: ["updoc"]
  },
  // =====================================================================
  // Workspace — right panel with tabs
  // =====================================================================
  {
    type: "workspace",
    kind: "routable",
    alias: "UpDoc.Workspace",
    name: "UpDoc Workspace",
    api: () => import("./up-doc-workspace.context-_18dUMdC.js"),
    meta: {
      entityType: "updoc"
    }
  },
  // =====================================================================
  // Workspace Views — tabs across the top
  // =====================================================================
  {
    type: "workspaceView",
    alias: "UpDoc.WorkspaceView.Workflows",
    name: "Workflows",
    element: () => import("./up-doc-workflows-view.element-B5whs4rN.js"),
    weight: 300,
    meta: {
      label: "Workflows",
      pathname: "workflows",
      icon: "icon-nodes"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "UpDoc.Workspace"
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "UpDoc.WorkspaceView.Configuration",
    name: "Configuration",
    element: () => import("./up-doc-configuration-view.element-Cqyu2QXk.js"),
    weight: 200,
    meta: {
      label: "Configuration",
      pathname: "configuration",
      icon: "icon-settings"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "UpDoc.Workspace"
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "UpDoc.WorkspaceView.About",
    name: "About",
    element: () => import("./up-doc-about-view.element--cBDybu3.js"),
    weight: 100,
    meta: {
      label: "About",
      pathname: "about",
      icon: "icon-info"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "UpDoc.Workspace"
      }
    ]
  }
];
export {
  e as manifests
};
//# sourceMappingURL=updoc.js.map
