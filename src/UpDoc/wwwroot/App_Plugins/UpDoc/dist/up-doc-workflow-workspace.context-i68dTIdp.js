import { UMB_WORKSPACE_CONTEXT as p, UmbWorkspaceRouteManager as m } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as l } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextBase as u } from "@umbraco-cms/backoffice/class-api";
import { html as h, state as d, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
var b = Object.defineProperty, v = Object.getOwnPropertyDescriptor, c = (r, e, s, o) => {
  for (var t = o > 1 ? void 0 : o ? v(e, s) : e, n = r.length - 1, i; n >= 0; n--)
    (i = r[n]) && (t = (o ? i(e, s, t) : i(t)) || t);
  return o && t && b(e, s, t), t;
};
let a = class extends w {
  constructor() {
    super(...arguments), this._name = "";
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(p, (r) => {
      r && this.observe(r.name, (e) => {
        this._name = e || "Workflow";
      });
    });
  }
  render() {
    return h`<umb-workspace-editor headline=${this._name}></umb-workspace-editor>`;
  }
};
c([
  d()
], a.prototype, "_name", 2);
a = c([
  f("up-doc-workflow-workspace-editor")
], a);
class y extends u {
  constructor(e) {
    super(e, p), this.workspaceAlias = "UpDoc.WorkflowWorkspace", this.#e = new l(void 0), this.data = this.#e.asObservable(), this.unique = this.#e.asObservablePart((s) => s?.unique), this.name = this.#e.asObservablePart((s) => s?.name), this.#t = null, this.routes = new m(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: a,
        setup: (s, o) => {
          const t = o.match.params.unique;
          this.load(t);
        }
      }
    ]);
  }
  #e;
  #t;
  /** Register a save handler (called by workspace views like Source). */
  setSaveHandler(e) {
    this.#t = e;
  }
  /** Called by the workspace action (Save button). Delegates to the registered handler. */
  async save() {
    this.#t && await this.#t();
  }
  async load(e) {
    const o = decodeURIComponent(e).split("-").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
    this.#e.setValue({ unique: e, name: o });
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
  y as UpDocWorkflowWorkspaceContext,
  y as api
};
//# sourceMappingURL=up-doc-workflow-workspace.context-i68dTIdp.js.map
