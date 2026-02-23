import { UmbWorkspaceActionBase as o, UMB_WORKSPACE_CONTEXT as r } from "@umbraco-cms/backoffice/workspace";
class c extends o {
  #e;
  #t;
  constructor(e, t) {
    super(e, t), this.#e = this.consumeContext(r, (s) => {
      this.#t = s;
    }).asPromise();
  }
  async execute() {
    await this.#e, await this.#t?.refresh();
  }
}
export {
  c as UpDocRefreshAction,
  c as api
};
//# sourceMappingURL=up-doc-refresh.action-DBewFGwT.js.map
