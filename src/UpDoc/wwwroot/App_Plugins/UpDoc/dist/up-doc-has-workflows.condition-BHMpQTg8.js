var b = (t) => {
  throw TypeError(t);
};
var w = (t, i, e) => i.has(t) || b("Cannot " + e);
var s = (t, i, e) => (w(t, i, "read from private field"), e ? e.call(t) : i.get(t)), r = (t, i, e) => i.has(t) ? b("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), I = (t, i, e, o) => (w(t, i, "write to private field"), o ? o.call(t, e) : i.set(t, e), e), p = (t, i, e) => (w(t, i, "access private method"), e);
import { UmbConditionBase as R } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_AUTH_CONTEXT as k } from "@umbraco-cms/backoffice/auth";
import { UMB_ENTITY_CONTEXT as x } from "@umbraco-cms/backoffice/entity";
import { UmbDocumentTypeStructureRepository as g } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as E } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as _ } from "@umbraco-cms/backoffice/document";
import { f as A } from "./workflow.service-BHEUOVK1.js";
var l, f, d, a, c, n, v, q;
class j extends R {
  // undefined = not yet received
  constructor(e, o) {
    super(e, o);
    r(this, n);
    r(this, l, new g(this));
    r(this, f, new E(this));
    r(this, d, new _(this));
    r(this, a, null);
    r(this, c);
    this.consumeContext(k, (u) => {
      I(this, a, u), p(this, n, v).call(this);
    }), this.consumeContext(x, (u) => {
      this.observe(u.unique, (y) => {
        I(this, c, y ?? null), p(this, n, v).call(this);
      });
    });
  }
}
l = new WeakMap(), f = new WeakMap(), d = new WeakMap(), a = new WeakMap(), c = new WeakMap(), n = new WeakSet(), v = function() {
  s(this, a) && s(this, c) !== void 0 && p(this, n, q).call(this, s(this, a), s(this, c));
}, q = async function(e, o) {
  var u;
  try {
    const y = await e.getLatestToken(), C = await A(y);
    if (!C.blueprintIds.length) {
      this.permitted = !1;
      return;
    }
    const B = new Set(C.blueprintIds);
    let U = null;
    if (o) {
      const { data: m } = await s(this, d).requestItems([o]);
      m != null && m.length && (U = m[0].documentType.unique);
    }
    const h = (await s(this, l).requestAllowedChildrenOf(
      U,
      o
    )).data;
    if (!((u = h == null ? void 0 : h.items) != null && u.length)) {
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
//# sourceMappingURL=up-doc-has-workflows.condition-BHMpQTg8.js.map
