import { UMB_WORKSPACE_CONTEXT as u, UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as m } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextBase as c } from "@umbraco-cms/backoffice/class-api";
import { LitElement as h, html as l, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UPDOC_ENTITY_TYPE as b } from "./up-doc-tree.repository--8lbcPY9.js";
var O = Object.getOwnPropertyDescriptor, U = (o, e, t, r) => {
  for (var s = r > 1 ? void 0 : r ? O(e, t) : e, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (s = n(s) || s);
  return s;
};
let i = class extends h {
  render() {
    return l`<umb-workspace-editor></umb-workspace-editor>`;
  }
};
i = U([
  d("up-doc-workspace-editor")
], i);
class k extends c {
  constructor(e) {
    super(e, u), this.workspaceAlias = "UpDoc.Workspace", this.#e = new m(void 0), this.data = this.#e.asObservable(), this.unique = this.#e.asObservablePart((t) => t?.unique), this.name = this.#e.asObservablePart((t) => t?.name), this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: i,
        setup: (t, r) => {
          const s = r.match.params.unique;
          this.load(s);
        }
      }
    ]);
  }
  #e;
  async load(e) {
    this.#e.setValue({ unique: e, name: "UpDoc" });
  }
  getUnique() {
    return this.#e.getValue()?.unique;
  }
  getEntityType() {
    return b;
  }
  destroy() {
    this.#e.destroy(), super.destroy();
  }
}
export {
  k as UpDocWorkspaceContext,
  k as api
};
//# sourceMappingURL=up-doc-workspace.context-D43zX7lf.js.map
