import { html as c, css as k, state as h, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as C } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as w } from "@umbraco-cms/backoffice/auth";
import { UmbModalToken as v, UMB_MODAL_MANAGER_CONTEXT as x } from "@umbraco-cms/backoffice/modal";
const T = new v(
  "UpDoc.CreateWorkflowModal",
  {
    modal: {
      type: "dialog",
      size: "small"
    }
  }
);
var E = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, p = (e, o, t, u) => {
  for (var a = u > 1 ? void 0 : u ? $(o, t) : o, l = e.length - 1, s; l >= 0; l--)
    (s = e[l]) && (a = (u ? s(o, t, a) : s(a)) || a);
  return u && a && E(o, t, a), a;
}, W = (e, o, t) => o.has(e) || b("Cannot " + t), M = (e, o, t) => o.has(e) ? b("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), i = (e, o, t) => (W(e, o, "access private method"), t), r, d, f, m, _;
let n = class extends g {
  constructor() {
    super(...arguments), M(this, r), this._workflows = [], this._loading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await i(this, r, d).call(this);
  }
  render() {
    return this._loading ? c`<uui-loader-bar></uui-loader-bar>` : this._error ? c`
				<uui-box>
					<p style="color: var(--uui-color-danger);">Error: ${this._error}</p>
					<uui-button look="secondary" @click=${() => i(this, r, d).call(this)}>Retry</uui-button>
				</uui-box>
			` : this._workflows.length === 0 ? i(this, r, m).call(this) : i(this, r, _).call(this);
  }
};
r = /* @__PURE__ */ new WeakSet();
d = async function() {
  this._loading = !0, this._error = null;
  try {
    const o = await (await this.getContext(w)).getLatestToken(), t = await fetch("/umbraco/management/api/v1/updoc/workflows", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    });
    if (!t.ok)
      throw new Error(`Failed to load workflows: ${t.statusText}`);
    this._workflows = await t.json();
  } catch (e) {
    this._error = e instanceof Error ? e.message : "Unknown error", console.error("Failed to load workflows:", e);
  } finally {
    this._loading = !1;
  }
};
f = async function() {
  const o = (await this.getContext(x)).open(this, T, { data: {} });
  try {
    const t = await o.onSubmit(), a = await (await this.getContext(w)).getLatestToken(), l = await fetch("/umbraco/management/api/v1/updoc/workflows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify(t)
    });
    if (!l.ok) {
      const s = await l.json();
      throw new Error(s.error || `Failed to create workflow: ${l.statusText}`);
    }
    await i(this, r, d).call(this);
  } catch (t) {
    t instanceof Error && t.message !== "Modal was rejected" && (this._error = t.message, console.error("Failed to create workflow:", t));
  }
};
m = function() {
  return c`
			<uui-box headline="No workflows configured">
				<p>
					Workflows define how content is extracted from external sources (PDFs, web pages, documents)
					and mapped to Umbraco document properties.
				</p>
				<p>
					Create a workflow to enable the <strong>"Create from Source"</strong> action
					for a document type.
				</p>
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${i(this, r, f)}></uui-button>
			</uui-box>
		`;
};
_ = function() {
  return c`
			<div class="header">
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${i(this, r, f)}></uui-button>
			</div>
			<uui-box>
				<uui-table>
					<uui-table-head>
						<uui-table-head-cell>Workflow</uui-table-head-cell>
						<uui-table-head-cell>Document Type</uui-table-head-cell>
						<uui-table-head-cell>Blueprint</uui-table-head-cell>
						<uui-table-head-cell>Sources</uui-table-head-cell>
						<uui-table-head-cell>Mappings</uui-table-head-cell>
						<uui-table-head-cell>Status</uui-table-head-cell>
					</uui-table-head>
					${this._workflows.map(
    (e) => c`
							<uui-table-row>
								<uui-table-cell>${e.name}</uui-table-cell>
								<uui-table-cell>${e.documentTypeAlias}</uui-table-cell>
								<uui-table-cell>${e.blueprintName ?? e.blueprintId ?? "—"}</uui-table-cell>
								<uui-table-cell>${e.sourceTypes.join(", ") || "—"}</uui-table-cell>
								<uui-table-cell>${e.mappingCount}</uui-table-cell>
								<uui-table-cell>
									<uui-tag
										look=${e.isComplete ? "primary" : "secondary"}
										color=${e.isComplete ? "positive" : "warning"}>
										${e.isComplete ? "Ready" : "Incomplete"}
									</uui-tag>
								</uui-table-cell>
							</uui-table-row>
						`
  )}
				</uui-table>
			</uui-box>
		`;
};
n.styles = [
  C,
  k`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.header {
				display: flex;
				justify-content: flex-end;
				margin-bottom: var(--uui-size-space-4);
			}
		`
];
p([
  h()
], n.prototype, "_workflows", 2);
p([
  h()
], n.prototype, "_loading", 2);
p([
  h()
], n.prototype, "_error", 2);
n = p([
  y("up-doc-workflows-view")
], n);
const j = n;
export {
  n as UpDocWorkflowsViewElement,
  j as default
};
//# sourceMappingURL=up-doc-workflows-view.element-BRJqXdMT.js.map
