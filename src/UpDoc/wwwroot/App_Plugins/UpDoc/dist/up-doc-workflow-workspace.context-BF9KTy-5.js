import { UMB_WORKSPACE_CONTEXT as k, UmbWorkspaceRouteManager as U } from "@umbraco-cms/backoffice/workspace";
import { UmbObjectState as W } from "@umbraco-cms/backoffice/observable-api";
import { UmbContextBase as x } from "@umbraco-cms/backoffice/class-api";
import { UMB_AUTH_CONTEXT as y } from "@umbraco-cms/backoffice/auth";
import { html as O, css as E, state as w, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as T } from "@umbraco-cms/backoffice/lit-element";
var P = Object.defineProperty, I = Object.getOwnPropertyDescriptor, C = (a) => {
  throw TypeError(a);
}, u = (a, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? I(t, e) : t, o = a.length - 1, n; o >= 0; o--)
    (n = a[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && P(t, e, i), i;
}, f = (a, t, e) => t.has(a) || C("Cannot " + e), l = (a, t, e) => (f(a, t, "read from private field"), e ? e.call(a) : t.get(a)), _ = (a, t, e) => t.has(a) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(a) : t.set(a, e), N = (a, t, e, s) => (f(a, t, "write to private field"), t.set(a, e), e), v = (a, t, e) => (f(a, t, "access private method"), e), r, p, g, b;
let c = class extends T {
  constructor() {
    super(...arguments), _(this, p), this._name = "", this._alias = "", this._isNew = !1, _(this, r, null);
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(k, (a) => {
      a && (N(this, r, a), this.observe(l(this, r).name, (t) => {
        this._name = t || "Workflow";
      }), this.observe(l(this, r).alias, (t) => {
        this._alias = t || "";
      }), this.observe(l(this, r).unique, (t) => {
        t && v(this, p, g).call(this, decodeURIComponent(t));
      }));
    });
  }
  render() {
    return O`
			<umb-workspace-editor>
				<div id="header" slot="header">
					<umb-input-with-alias
						id="name"
						label="Workflow name"
						.value=${this._name}
						.alias=${this._alias}
						?auto-generate-alias=${this._isNew}
						@change=${v(this, p, b)}>
					</umb-input-with-alias>
				</div>
			</umb-workspace-editor>
		`;
  }
};
r = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
g = async function(a) {
  try {
    const e = await (await this.getContext(y)).getLatestToken(), s = await fetch("/umbraco/management/api/v1/updoc/workflows", {
      headers: { Authorization: `Bearer ${e}` }
    });
    if (s.ok) {
      const o = (await s.json()).find((n) => n.alias === a);
      o && l(this, r)?.setIdentity(o.name, o.alias);
    }
  } catch {
  }
};
b = async function(a) {
  const t = a.target, e = t.value, s = t.alias;
  if (!e.trim() || !s.trim() || e === this._name && s === this._alias) return;
  const i = this._alias;
  try {
    const n = await (await this.getContext(y)).getLatestToken(), d = await fetch(
      `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(i)}/identity`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        },
        body: JSON.stringify({ name: e.trim(), alias: s.trim() })
      }
    );
    if (!d.ok) {
      const m = await d.json();
      console.error("Failed to update workflow identity:", m);
      return;
    }
    const h = await d.json();
    if (l(this, r)?.setIdentity(h.name, h.alias), h.alias !== i) {
      const m = `section/settings/workspace/updoc-workflow/edit/${encodeURIComponent(h.alias)}`;
      window.history.replaceState({}, "", m);
    }
  } catch (o) {
    console.error("Failed to update workflow identity:", o);
  }
};
c.styles = E`
		:host {
			display: contents;
		}

		#header {
			display: flex;
			align-items: center;
			gap: var(--uui-size-space-4);
			width: 100%;
		}

		#name {
			flex: 1;
		}
	`;
u([
  w()
], c.prototype, "_name", 2);
u([
  w()
], c.prototype, "_alias", 2);
u([
  w()
], c.prototype, "_isNew", 2);
c = u([
  A("up-doc-workflow-workspace-editor")
], c);
class H extends x {
  constructor(t) {
    super(t, k), this.workspaceAlias = "UpDoc.WorkflowWorkspace", this.#t = new W(void 0), this.data = this.#t.asObservable(), this.unique = this.#t.asObservablePart((e) => e?.unique), this.name = this.#t.asObservablePart((e) => e?.name), this.alias = this.#t.asObservablePart((e) => e?.alias), this.#e = null, this.#a = null, this.routes = new U(this), this.routes.setRoutes([
      {
        path: "edit/:unique",
        component: c,
        setup: (e, s) => {
          const i = s.match.params.unique;
          this.load(i);
        }
      }
    ]);
  }
  #t;
  #e;
  #a;
  /** Register a save handler (called by workspace views like Source). */
  setSaveHandler(t) {
    this.#e = t;
  }
  /** Register a refresh handler for re-extraction (called by workspace views like Source). */
  setRefreshHandler(t) {
    this.#a = t;
  }
  /** Called by the workspace action (Save button). Delegates to the registered handler. */
  async save() {
    this.#e && await this.#e();
  }
  /** Called by the Refresh workspace action. Triggers re-extraction. */
  async refresh() {
    this.#a && await this.#a();
  }
  load(t) {
    const e = decodeURIComponent(t);
    this.#t.setValue({ unique: t, name: e, alias: e });
  }
  /** Update the display name and alias (called by the workspace editor after fetching/saving). */
  setIdentity(t, e) {
    const s = this.#t.getValue();
    s && this.#t.setValue({ ...s, name: t, alias: e, unique: e });
  }
  getUnique() {
    return this.#t.getValue()?.unique;
  }
  getEntityType() {
    return "updoc-workflow";
  }
  destroy() {
    this.#t.destroy(), super.destroy();
  }
}
export {
  H as UpDocWorkflowWorkspaceContext,
  H as api
};
//# sourceMappingURL=up-doc-workflow-workspace.context-BF9KTy-5.js.map
