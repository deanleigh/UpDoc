import { UMB_WORKSPACE_CONTEXT as p, UmbWorkspaceRouteManager as c } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as m } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextBase as u } from "@umbraco-cms/backoffice/class-api";
import { html as h, state as d, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
var b = Object.defineProperty, v = Object.getOwnPropertyDescriptor, l = (o, e, s, r) => {
  for (var t = r > 1 ? void 0 : r ? v(e, s) : e, n = o.length - 1, i; n >= 0; n--)
    (i = o[n]) && (t = (r ? i(e, s, t) : i(t)) || t);
  return r && t && b(e, s, t), t;
};
let a = class extends w {
  constructor() {
    super(...arguments), this._name = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(p, (o) => {
      o && this.observe(o.name, (e) => {
        this._name = e || "Workflow";
      });
    });
  }
  render() {
    return h`<umb-workspace-editor headline=${this._name}></umb-workspace-editor>`;
  }
};
l([
  d()
], a.prototype, "_name", 2);
a = l([
  f("up-doc-workflow-workspace-editor")
], a);
class O extends u {
  constructor(e) {
    super(e, p), this.workspaceAlias = "UpDoc.WorkflowWorkspace", this.#e = new m(void 0), this.data = this.#e.asObservable(), this.unique = this.#e.asObservablePart((s) => s?.unique), this.name = this.#e.asObservablePart((s) => s?.name), this.#t = null, this.#s = null, this.routes = new c(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: a,
        setup: (s, r) => {
          const t = r.match.params.unique;
          this.load(t);
        }
      }
    ]);
  }
  #e;
  #t;
  #s;
  /** Register a save handler (called by workspace views like Source). */
  setSaveHandler(e) {
    this.#t = e;
  }
  /** Register a refresh handler for re-extraction (called by workspace views like Source). */
  setRefreshHandler(e) {
    this.#s = e;
  }
  /** Called by the workspace action (Save button). Delegates to the registered handler. */
  async save() {
    this.#t && await this.#t();
  }
  /** Called by the Refresh workspace action. Triggers re-extraction. */
  async refresh() {
    this.#s && await this.#s();
  }
  async load(e) {
    const r = decodeURIComponent(e).split("-").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
    this.#e.setValue({ unique: e, name: r });
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
  O as UpDocWorkflowWorkspaceContext,
  O as api
};
//# sourceMappingURL=up-doc-workflow-workspace.context-DEIkp1I8.js.map
