var q = (t) => {
  throw TypeError(t);
};
var w = (t, i, e) => i.has(t) || q("Cannot " + e);
var s = (t, i, e) => (w(t, i, "read from private field"), e ? e.call(t) : i.get(t)), n = (t, i, e) => i.has(t) ? q("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), I = (t, i, e, o) => (w(t, i, "write to private field"), o ? o.call(t, e) : i.set(t, e), e), p = (t, i, e) => (w(t, i, "access private method"), e);
import { UmbConditionBase as R } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_AUTH_CONTEXT as k } from "@umbraco-cms/backoffice/auth";
import { UMB_ENTITY_CONTEXT as g } from "@umbraco-cms/backoffice/entity";
import { UmbDocumentTypeStructureRepository as x } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as E } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as _ } from "@umbraco-cms/backoffice/document";
import { f as A } from "./workflow.service-BWNI6sBi.js";
var l, f, d, a, c, u, v, C;
class j extends R {
  // undefined = not yet received
  constructor(e, o) {
    super(e, o);
    n(this, u);
    n(this, l, new x(this));
    n(this, f, new E(this));
    n(this, d, new _(this));
    n(this, a, null);
    n(this, c);
    this.consumeContext(k, (r) => {
      I(this, a, r), p(this, u, v).call(this);
    }), this.consumeContext(g, (r) => {
      r && this.observe(r.unique, (y) => {
        I(this, c, y ?? null), p(this, u, v).call(this);
      });
    });
  }
}
l = new WeakMap(), f = new WeakMap(), d = new WeakMap(), a = new WeakMap(), c = new WeakMap(), u = new WeakSet(), v = function() {
  s(this, a) && s(this, c) !== void 0 && p(this, u, C).call(this, s(this, a), s(this, c));
}, C = async function(e, o) {
  var r;
  try {
    const y = await e.getLatestToken(), U = await A(y);
    if (!U.blueprintIds.length) {
      this.permitted = !1;
      return;
    }
    const B = new Set(U.blueprintIds);
    let b = null;
    if (o) {
      const { data: m } = await s(this, d).requestItems([o]);
      m != null && m.length && (b = m[0].documentType.unique);
    }
    const h = (await s(this, l).requestAllowedChildrenOf(
      b,
      o
    )).data;
    if (!((r = h == null ? void 0 : h.items) != null && r.length)) {
      this.permitted = !1;
      return;
    }
    for (const m of h.items) {
      const { data: T } = await s(this, f).requestItemsByDocumentType(m.unique);
      if (T != null && T.some((D) => B.has(D.unique))) {
        this.permitted = !0;
        return;
      }
    }
    this.permitted = !1;
  } catch {
    this.permitted = !1;
  }
};
export {
  j as UpDocHasWorkflowsCondition,
  j as default
};
//# sourceMappingURL=up-doc-has-workflows.condition-Dnwum_6q.js.map
