import { UmbConditionBase as c, umbExtensionsRegistry as i } from "@umbraco-cms/backoffice/extension-registry";
class m extends c {
  constructor(s, e) {
    super(s, e), this.observe(
      i.byType("menu"),
      (n) => {
        const o = n.some((t) => t.alias === "usync.menu");
        this.permitted = !o;
      },
      "upDocUsyncCheck"
    );
  }
}
export {
  m as UpDocUsyncFallbackCondition,
  m as api
};
//# sourceMappingURL=up-doc-usync-fallback.condition-CRxSTHGz.js.map
