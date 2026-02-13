import { UMB_WORKSPACE_CONTEXT as p, UmbWorkspaceRouteManager as c } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as u } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextBase as l } from "@umbraco-cms/backoffice/class-api";
import { html as h, state as d, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
var b = Object.defineProperty, k = Object.getOwnPropertyDescriptor, m = (r, t, o, s) => {
  for (var e = s > 1 ? void 0 : s ? k(t, o) : t, n = r.length - 1, i; n >= 0; n--)
    (i = r[n]) && (e = (s ? i(t, o, e) : i(e)) || e);
  return s && e && b(t, o, e), e;
};
let a = class extends w {
  constructor() {
    super(...arguments), this._name = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(p, (r) => {
      r && this.observe(r.name, (t) => {
        this._name = t || "Workflow";
      });
    });
  }
  render() {
    return h`<umb-workspace-editor headline=${this._name}></umb-workspace-editor>`;
  }
};
m([
  d()
], a.prototype, "_name", 2);
a = m([
  f("up-doc-workflow-workspace-editor")
], a);
class W extends l {
  constructor(t) {
    super(t, p), this.workspaceAlias = "UpDoc.WorkflowWorkspace", this.#e = new u(void 0), this.data = this.#e.asObservable(), this.unique = this.#e.asObservablePart((o) => o?.unique), this.name = this.#e.asObservablePart((o) => o?.name), this.routes = new c(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: a,
        setup: (o, s) => {
          const e = s.match.params.unique;
          this.load(e);
        }
      }
    ]);
  }
  #e;
  async load(t) {
    const s = decodeURIComponent(t).split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
    this.#e.setValue({ unique: t, name: s });
  }
  getUnique() {
    return this.#e.getValue()?.unique;
  }
  getEntityType() {
    return "updoc-workflow";
  }
  destroy() {
    this.#e.destroy(), super.destroy();
  }
}
export {
  W as UpDocWorkflowWorkspaceContext,
  W as api
};
//# sourceMappingURL=up-doc-workflow-workspace.context-Bj1gxX1X.js.map
