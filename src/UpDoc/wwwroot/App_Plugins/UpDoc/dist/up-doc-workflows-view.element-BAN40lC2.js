import { html as u, css as v, state as p, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as T } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as f } from "@umbraco-cms/backoffice/auth";
import { UmbModalToken as b, UMB_MODAL_MANAGER_CONTEXT as w, UMB_CONFIRM_MODAL as $ } from "@umbraco-cms/backoffice/modal";
import { c as M } from "./workflow.service-C-MBMeeJ.js";
const D = new b(
  "UpDoc.CreateWorkflowModal",
  {
    modal: {
      type: "dialog",
      size: "small"
    }
  }
), W = new b(
  "UpDoc.WorkflowDetailModal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var U = Object.defineProperty, O = Object.getOwnPropertyDescriptor, k = (e) => {
  throw TypeError(e);
}, h = (e, o, t, n) => {
  for (var a = n > 1 ? void 0 : n ? O(o, t) : o, i = e.length - 1, c; i >= 0; i--)
    (c = e[i]) && (a = (n ? c(o, t, a) : c(a)) || a);
  return n && a && U(o, t, a), a;
}, A = (e, o, t) => o.has(e) || k("Cannot " + t), L = (e, o, t) => o.has(e) ? k("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), l = (e, o, t) => (A(e, o, "access private method"), t), r, d, m, _, g, y, C;
let s = class extends T {
  constructor() {
    super(...arguments), L(this, r), this._workflows = [], this._loading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await l(this, r, d).call(this);
  }
  render() {
    return this._loading ? u`<uui-loader-bar></uui-loader-bar>` : this._error ? u`
				<uui-box>
					<p style="color: var(--uui-color-danger);">Error: ${this._error}</p>
					<uui-button look="secondary" @click=${() => l(this, r, d).call(this)}>Retry</uui-button>
				</uui-box>
			` : this._workflows.length === 0 ? l(this, r, y).call(this) : l(this, r, C).call(this);
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
m = async function() {
  const o = (await this.getContext(w)).open(this, D, { data: {} });
  try {
    const t = await o.onSubmit(), a = await (await this.getContext(f)).getLatestToken(), i = await fetch("/umbraco/management/api/v1/updoc/workflows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify(t)
    });
    if (!i.ok) {
      const c = await i.json();
      throw new Error(c.error || `Failed to create workflow: ${i.statusText}`);
    }
    await l(this, r, d).call(this);
  } catch (t) {
    t instanceof Error && t.message !== "Modal was rejected" && (this._error = t.message, console.error("Failed to create workflow:", t));
  }
};
_ = async function(e) {
  (await this.getContext(w)).open(this, W, {
    data: { workflowName: e.name }
  });
};
g = async function(e) {
  const o = await this.getContext(w);
  try {
    await o.open(this, $, {
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
      const i = await a.json();
      throw new Error(i.error || `Failed to delete workflow: ${a.statusText}`);
    }
    M(), await l(this, r, d).call(this);
  } catch (t) {
    this._error = t instanceof Error ? t.message : "Unknown error", console.error("Failed to delete workflow:", t);
  }
};
y = function() {
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
					@click=${l(this, r, m)}></uui-button>
			</uui-box>
		`;
};
C = function() {
  return u`
			<div class="header">
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${l(this, r, m)}></uui-button>
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
							<uui-table-row class="clickable-row" @click=${() => l(this, r, _).call(this, e)}>
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
										@click=${(o) => {
      o.stopPropagation(), l(this, r, g).call(this, e);
    }}>
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
  E,
  v`
			:host {
				display: block;
				padding: var(--uui-size-layout-1);
			}

			.header {
				display: flex;
				justify-content: flex-end;
				margin-bottom: var(--uui-size-space-4);
			}

			.clickable-row {
				cursor: pointer;
			}

			.clickable-row:hover {
				background: var(--uui-color-surface-alt);
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
  x("up-doc-workflows-view")
], s);
const z = s;
export {
  s as UpDocWorkflowsViewElement,
  z as default
};
//# sourceMappingURL=up-doc-workflows-view.element-BAN40lC2.js.map
