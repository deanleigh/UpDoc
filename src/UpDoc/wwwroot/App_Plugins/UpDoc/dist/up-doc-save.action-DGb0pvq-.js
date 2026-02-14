import { UmbWorkspaceActionBase as o, UMB_WORKSPACE_CONTEXT as a } from "@umbraco-cms/backoffice/workspace";
class r extends o {
  #t;
  #e;
  constructor(t, e) {
    super(t, e), this.#t = this.consumeContext(a, (s) => {
      this.#e = s;
    }).asPromise();
  }
  async execute() {
    await this.#t, await this.#e?.save();
  }
}
export {
  r as UpDocSaveAction,
  r as api
};
//# sourceMappingURL=up-doc-save.action-DGb0pvq-.js.map
