const o = [
  // =====================================================================
  // Entity Action — "Create from Source" on content nodes
  // =====================================================================
  {
    type: "entityAction",
    kind: "default",
    alias: "UpDoc.EntityAction",
    name: "UpDoc Entity Action",
    weight: 1100,
    api: () => import("./up-doc-action-DbqY4gN-.js"),
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
    api: () => import("./up-doc-has-workflows.condition-iCg4Ca98.js")
  },
  // =====================================================================
  // Collection Action — "Create from Source" button in collection toolbar
  // =====================================================================
  {
    type: "collectionAction",
    kind: "button",
    alias: "UpDoc.CollectionAction",
    name: "UpDoc Collection Action",
    element: () => import("./up-doc-collection-action.element-DVKsOGU6.js"),
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
    element: () => import("./up-doc-modal.element-FWdF0CLB.js")
  },
  {
    type: "modal",
    alias: "UpDoc.BlueprintPickerModal",
    name: "Blueprint Picker Modal",
    element: () => import("./blueprint-picker-modal.element-B7k6RmK5.js")
  },
  {
    type: "modal",
    alias: "UpDoc.CreateWorkflowSidebar",
    name: "Create Workflow Sidebar",
    element: () => import("./create-workflow-sidebar.element-v83pQY9F.js")
  },
  {
    type: "modal",
    alias: "UpDoc.WorkflowDetailModal",
    name: "Workflow Detail Modal",
    element: () => import("./up-doc-workflow-detail-modal.element-enP3fI3p.js")
  },
  {
    type: "modal",
    alias: "UpDoc.DestinationPickerModal",
    name: "Destination Picker Modal",
    element: () => import("./destination-picker-modal.element-CEYzzXx9.js")
  },
  {
    type: "modal",
    alias: "UpDoc.ZoneEditorModal",
    name: "Zone Editor Modal",
    element: () => import("./pdf-zone-editor-modal.element-B92kq8rK.js")
  },
  // =====================================================================
  // Workflow Workspace — full page for editing individual workflows
  // =====================================================================
  {
    type: "workspace",
    kind: "routable",
    alias: "UpDoc.WorkflowWorkspace",
    name: "UpDoc Workflow Workspace",
    api: () => import("./up-doc-workflow-workspace.context-Bj1gxX1X.js"),
    meta: {
      entityType: "updoc-workflow"
    }
  },
  {
    type: "workspaceView",
    alias: "UpDoc.WorkflowWorkspaceView.Destination",
    name: "Destination",
    element: () => import("./up-doc-workflow-destination-view.element-8B1FfwgT.js"),
    weight: 300,
    meta: {
      label: "Destination",
      pathname: "destination",
      icon: "icon-blueprint"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "UpDoc.WorkflowWorkspace"
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "UpDoc.WorkflowWorkspaceView.Source",
    name: "UpDoc Workflow Source View",
    element: () => import("./up-doc-workflow-source-view.element-Bgm4yBCq.js"),
    weight: 200,
    meta: {
      label: "Source",
      pathname: "source",
      icon: "icon-page-add"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "UpDoc.WorkflowWorkspace"
      }
    ]
  },
  {
    type: "workspaceView",
    alias: "UpDoc.WorkflowWorkspaceView.Map",
    name: "UpDoc Workflow Map View",
    element: () => import("./up-doc-workflow-map-view.element-CF6V1Rwk.js"),
    weight: 100,
    meta: {
      label: "Map",
      pathname: "map",
      icon: "icon-nodes"
    },
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "UpDoc.WorkflowWorkspace"
      }
    ]
  },
  // =====================================================================
  // Settings sidebar — UpDoc under uSync's "Synchronisation" group,
  // with fallback to its own group when uSync is not installed
  // =====================================================================
  {
    type: "condition",
    alias: "UpDoc.Condition.UsyncNotInstalled",
    name: "uSync Not Installed",
    api: () => import("./up-doc-usync-fallback.condition-CRxSTHGz.js")
  },
  {
    type: "menuItem",
    kind: "tree",
    alias: "UpDoc.MenuItem.Tree",
    name: "UpDoc Menu Item",
    meta: {
      treeAlias: "UpDoc.Tree",
      menus: ["usync.menu", "UpDoc.Menu"],
      hideTreeRoot: !0
    }
  },
  // Fallback: own sidebar group when uSync is not installed
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "UpDoc.SidebarApp",
    name: "UpDoc Sidebar",
    weight: 15,
    meta: {
      label: "Synchronisation",
      menu: "UpDoc.Menu"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Settings"
      },
      {
        alias: "UpDoc.Condition.UsyncNotInstalled"
      }
    ]
  },
  {
    type: "menu",
    alias: "UpDoc.Menu",
    name: "UpDoc Menu"
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
    api: () => import("./up-doc-workspace.context-D43zX7lf.js"),
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
    element: () => import("./up-doc-workflows-view.element-K510efBz.js"),
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
  o as manifests
};
//# sourceMappingURL=updoc.js.map
