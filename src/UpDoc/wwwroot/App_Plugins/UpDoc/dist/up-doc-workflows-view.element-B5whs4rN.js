import { html as u, css as y, state as p, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as x } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as v } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as f } from "@umbraco-cms/backoffice/auth";
import { UmbModalToken as T, UMB_MODAL_MANAGER_CONTEXT as m, UMB_CONFIRM_MODAL as E } from "@umbraco-cms/backoffice/modal";
import { c as $ } from "./workflow.service-BHEUOVK1.js";
const M = new T(
  "UpDoc.CreateWorkflowModal",
  {
    modal: {
      type: "dialog",
      size: "small"
    }
  }
);
var D = Object.defineProperty, U = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, h = (e, o, t, n) => {
  for (var a = n > 1 ? void 0 : n ? U(o, t) : o, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (a = (n ? c(o, t, a) : c(a)) || a);
  return n && a && D(o, t, a), a;
}, W = (e, o, t) => o.has(e) || b("Cannot " + t), O = (e, o, t) => o.has(e) ? b("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), i = (e, o, t) => (W(e, o, "access private method"), t), r, d, w, k, _, g;
let s = class extends x {
  constructor() {
    super(...arguments), O(this, r), this._workflows = [], this._loading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await i(this, r, d).call(this);
  }
  render() {
    return this._loading ? u`<uui-loader-bar></uui-loader-bar>` : this._error ? u`
				<uui-box>
					<p style="color: var(--uui-color-danger);">Error: ${this._error}</p>
					<uui-button look="secondary" @click=${() => i(this, r, d).call(this)}>Retry</uui-button>
				</uui-box>
			` : this._workflows.length === 0 ? i(this, r, _).call(this) : i(this, r, g).call(this);
  }
};
r = /* @__PURE__ */ new WeakSet();
d = async function() {
  this._loading = !0, this._error = null;
  try {
    const o = await (await this.getContext(f)).getLatestToken(), t = await fetch("/umbraco/management/api/v1/updoc/workflows", {
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
w = async function() {
  const o = (await this.getContext(m)).open(this, M, { data: {} });
  try {
    const t = await o.onSubmit(), a = await (await this.getContext(f)).getLatestToken(), l = await fetch("/umbraco/management/api/v1/updoc/workflows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify(t)
    });
    if (!l.ok) {
      const c = await l.json();
      throw new Error(c.error || `Failed to create workflow: ${l.statusText}`);
    }
    await i(this, r, d).call(this);
  } catch (t) {
    t instanceof Error && t.message !== "Modal was rejected" && (this._error = t.message, console.error("Failed to create workflow:", t));
  }
};
k = async function(e) {
  const o = await this.getContext(m);
  try {
    await o.open(this, E, {
      data: {
        headline: `Delete "${e.name}"?`,
        content: u`<p>This will permanently delete the workflow folder and all its configuration files (destination, map, and source configs).</p>
						<p>This action cannot be undone.</p>`,
        confirmLabel: "Delete",
        color: "danger"
      }
    }).onSubmit();
  } catch {
    return;
  }
  try {
    const n = await (await this.getContext(f)).getLatestToken(), a = await fetch(`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e.name)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${n}`
      }
    });
    if (!a.ok) {
      const l = await a.json();
      throw new Error(l.error || `Failed to delete workflow: ${a.statusText}`);
    }
    $(), await i(this, r, d).call(this);
  } catch (t) {
    this._error = t instanceof Error ? t.message : "Unknown error", console.error("Failed to delete workflow:", t);
  }
};
_ = function() {
  return u`
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
					@click=${i(this, r, w)}></uui-button>
			</uui-box>
		`;
};
g = function() {
  return u`
			<div class="header">
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${i(this, r, w)}></uui-button>
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
						<uui-table-head-cell style="width: 1px;"></uui-table-head-cell>
					</uui-table-head>
					${this._workflows.map(
    (e) => u`
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
								<uui-table-cell>
									<uui-button
										look="default"
										color="danger"
										label="Delete"
										compact
										@click=${() => i(this, r, k).call(this, e)}>
										<uui-icon name="icon-trash"></uui-icon>
									</uui-button>
								</uui-table-cell>
							</uui-table-row>
						`
  )}
				</uui-table>
			</uui-box>
		`;
};
s.styles = [
  v,
  y`
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
h([
  p()
], s.prototype, "_workflows", 2);
h([
  p()
], s.prototype, "_loading", 2);
h([
  p()
], s.prototype, "_error", 2);
s = h([
  C("up-doc-workflows-view")
], s);
const N = s;
export {
  s as UpDocWorkflowsViewElement,
  N as default
};
//# sourceMappingURL=up-doc-workflows-view.element-B5whs4rN.js.map
