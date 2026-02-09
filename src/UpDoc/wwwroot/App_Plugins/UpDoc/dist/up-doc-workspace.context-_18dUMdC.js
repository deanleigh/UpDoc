var m = (e) => {
  throw TypeError(e);
};
var c = (e, s, t) => s.has(e) || m("Cannot " + t);
var i = (e, s, t) => (c(e, s, "read from private field"), t ? t.call(e) : s.get(e)), h = (e, s, t) => s.has(e) ? m("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(e) : s.set(e, t), l = (e, s, t, r) => (c(e, s, "write to private field"), r ? r.call(e, t) : s.set(e, t), t);
import { UMB_WORKSPACE_CONTEXT as b, UmbWorkspaceRouteManager as O } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as U } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextBase as v } from "@umbraco-cms/backoffice/class-api";
import { LitElement as E, html as _, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UPDOC_ENTITY_TYPE as w } from "./up-doc-tree.repository--8lbcPY9.js";
var f = Object.getOwnPropertyDescriptor, k = (e, s, t, r) => {
  for (var n = r > 1 ? void 0 : r ? f(s, t) : s, u = e.length - 1, a; u >= 0; u--)
    (a = e[u]) && (n = a(n) || n);
  return n;
};
let p = class extends E {
  render() {
    return _`<umb-workspace-editor></umb-workspace-editor>`;
  }
};
p = k([
  d("up-doc-workspace-editor")
], p);
var o;
class T extends v {
  constructor(t) {
    super(t, b);
    h(this, o);
    this.workspaceAlias = "UpDoc.Workspace", l(this, o, new U(void 0)), this.data = i(this, o).asObservable(), this.unique = i(this, o).asObservablePart((r) => r == null ? void 0 : r.unique), this.name = i(this, o).asObservablePart((r) => r == null ? void 0 : r.name), this.routes = new O(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: p,
        setup: (r, n) => {
          const u = n.match.params.unique;
          this.load(u);
        }
      }
    ]);
  }
  async load(t) {
    i(this, o).setValue({ unique: t, name: "UpDoc" });
  }
  getUnique() {
    var t;
    return (t = i(this, o).getValue()) == null ? void 0 : t.unique;
  }
  getEntityType() {
    return w;
  }
  destroy() {
    i(this, o).destroy(), super.destroy();
  }
}
o = new WeakMap();
export {
  T as UpDocWorkspaceContext,
  T as api
};
//# sourceMappingURL=up-doc-workspace.context-_18dUMdC.js.map
