import { UmbTreeRepositoryBase as a, UmbTreeServerDataSourceBase as n } from "@umbraco-cms/backoffice/tree";
const c = "updoc", s = "updoc-root";
class u extends n {
  constructor(e) {
    super(e, {
      getRootItems: async (t) => {
        const r = [
          {
            unique: "updoc-settings",
            parent: { unique: null, entityType: s },
            entityType: c,
            name: "UpDoc",
            hasChildren: !1,
            isFolder: !1,
            icon: "icon-nodes"
          }
        ];
        return { data: { items: r, total: r.length } };
      },
      getChildrenOf: async (t) => ({ data: { items: [], total: 0 } }),
      getAncestorsOf: async (t) => ({ data: [] }),
      mapper: (t) => t
    });
  }
}
class p extends a {
  constructor(e) {
    super(e, u);
  }
  async requestTreeRoot() {
    return { data: {
      unique: null,
      entityType: s,
      name: "UpDoc",
      hasChildren: !0,
      isFolder: !0
    } };
  }
}
export {
  c as UPDOC_ENTITY_TYPE,
  s as UPDOC_ROOT_ENTITY_TYPE,
  p as UpDocTreeRepository,
  p as api
};
//# sourceMappingURL=up-doc-tree.repository--8lbcPY9.js.map
