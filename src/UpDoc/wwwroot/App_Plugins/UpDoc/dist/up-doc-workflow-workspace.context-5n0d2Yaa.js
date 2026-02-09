var c = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || c("Cannot " + t);
var a = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), l = (e, o, t) => o.has(e) ? c("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), h = (e, o, t, s) => (u(e, o, "write to private field"), s ? s.call(e, t) : o.set(e, t), t);
import { UMB_WORKSPACE_CONTEXT as f, UmbWorkspaceRouteManager as b } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as d } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextBase as k } from "@umbraco-cms/backoffice/class-api";
import { html as _, state as v, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
var O = Object.defineProperty, W = Object.getOwnPropertyDescriptor, w = (e, o, t, s) => {
  for (var r = s > 1 ? void 0 : s ? W(o, t) : o, i = e.length - 1, m; i >= 0; i--)
    (m = e[i]) && (r = (s ? m(o, t, r) : m(r)) || r);
  return s && r && O(o, t, r), r;
};
let p = class extends C {
  constructor() {
    super(...arguments), this._name = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(f, (e) => {
      e && this.observe(e.name, (o) => {
        this._name = o || "Workflow";
      });
    });
  }
  render() {
    return _`<umb-workspace-editor headline=${this._name}></umb-workspace-editor>`;
  }
};
w([
  v()
], p.prototype, "_name", 2);
p = w([
  U("up-doc-workflow-workspace-editor")
], p);
var n;
class D extends k {
  constructor(t) {
    super(t, f);
    l(this, n);
    this.workspaceAlias = "UpDoc.WorkflowWorkspace", h(this, n, new d(void 0)), this.data = a(this, n).asObservable(), this.unique = a(this, n).asObservablePart((s) => s == null ? void 0 : s.unique), this.name = a(this, n).asObservablePart((s) => s == null ? void 0 : s.name), this.routes = new b(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: p,
        setup: (s, r) => {
          const i = r.match.params.unique;
          this.load(i);
        }
      }
    ]);
  }
  async load(t) {
    const r = decodeURIComponent(t).split("-").map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(" ");
    a(this, n).setValue({ unique: t, name: r });
  }
  getUnique() {
    var t;
    return (t = a(this, n).getValue()) == null ? void 0 : t.unique;
  }
  getEntityType() {
    return "updoc-workflow";
  }
  destroy() {
    a(this, n).destroy(), super.destroy();
  }
}
n = new WeakMap();
export {
  D as UpDocWorkflowWorkspaceContext,
  D as api
};
//# sourceMappingURL=up-doc-workflow-workspace.context-5n0d2Yaa.js.map
