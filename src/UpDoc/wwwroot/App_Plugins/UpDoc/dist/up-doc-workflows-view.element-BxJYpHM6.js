import { html as h, css as M, state as _, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as D } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as R } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as g } from "@umbraco-cms/backoffice/auth";
import { UmbModalToken as B, umbOpenModal as x, UMB_MODAL_MANAGER_CONTEXT as I, UMB_CONFIRM_MODAL as L } from "@umbraco-cms/backoffice/modal";
import { U as F } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { t as P, h as j } from "./workflow.service-DJ0lDdZu.js";
const q = new B(
  "UpDoc.CreateWorkflowSidebar",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var z = Object.defineProperty, V = Object.getOwnPropertyDescriptor, U = (e) => {
  throw TypeError(e);
}, f = (e, t, o, l) => {
  for (var a = l > 1 ? void 0 : l ? V(t, o) : t, s = e.length - 1, d; s >= 0; s--)
    (d = e[s]) && (a = (l ? d(t, o, a) : d(a)) || a);
  return l && a && z(t, o, a), a;
}, G = (e, t, o) => t.has(e) || U("Cannot " + o), K = (e, t, o) => t.has(e) ? U("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), i = (e, t, o) => (G(e, t, "access private method"), o), n, m, C, $, W, N, S, A;
let c = class extends D {
  constructor() {
    super(...arguments), K(this, n), this._workflows = [], this._loading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await i(this, n, m).call(this);
  }
  render() {
    return this._loading ? h`<uui-loader-bar></uui-loader-bar>` : this._error ? h`
				<uui-box>
					<p style="color: var(--uui-color-danger);">Error: ${this._error}</p>
					<uui-button look="secondary" @click=${() => i(this, n, m).call(this)}>Retry</uui-button>
				</uui-box>
			` : this._workflows.length === 0 ? i(this, n, S).call(this) : i(this, n, A).call(this);
  }
};
n = /* @__PURE__ */ new WeakSet();
m = async function() {
  this._loading = !0, this._error = null;
  try {
    const t = await (await this.getContext(g)).getLatestToken(), o = await fetch("/umbraco/management/api/v1/updoc/workflows", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      }
    });
    if (!o.ok)
      throw new Error(`Failed to load workflows: ${o.statusText}`);
    this._workflows = await o.json();
  } catch (e) {
    this._error = e instanceof Error ? e.message : "Unknown error", console.error("Failed to load workflows:", e);
  } finally {
    this._loading = !1;
  }
};
C = async function() {
  try {
    const t = await (await this.getContext(g)).getLatestToken(), o = await fetch("/umbraco/management/api/v1/updoc/document-types", {
      headers: { Authorization: `Bearer ${t}` }
    });
    if (!o.ok)
      throw new Error("Failed to load document types");
    const l = await o.json(), a = [];
    for (const r of l) {
      const T = await fetch(
        `/umbraco/management/api/v1/updoc/document-types/${encodeURIComponent(r.alias)}/blueprints`,
        { headers: { Authorization: `Bearer ${t}` } }
      );
      if (!T.ok) continue;
      const v = await T.json();
      v.length > 0 && a.push({
        documentTypeUnique: r.id,
        documentTypeName: r.name,
        documentTypeIcon: r.icon ?? null,
        blueprints: v.map((E) => ({
          blueprintUnique: E.id,
          blueprintName: E.name
        }))
      });
    }
    if (!a.length) {
      this._error = "No document types with blueprints found. Create a Document Blueprint first.";
      return;
    }
    let s;
    try {
      s = await x(this, F, {
        data: { documentTypes: a }
      });
    } catch {
      return;
    }
    const { blueprintUnique: d, documentTypeUnique: w } = s, p = a.find((r) => r.documentTypeUnique === w), b = p == null ? void 0 : p.blueprints.find((r) => r.blueprintUnique === d), k = l.find((r) => r.id === w);
    let u;
    try {
      u = await x(this, q, {
        data: {
          documentTypeUnique: w,
          documentTypeName: (p == null ? void 0 : p.documentTypeName) ?? "",
          documentTypeAlias: (k == null ? void 0 : k.alias) ?? "",
          blueprintUnique: d,
          blueprintName: (b == null ? void 0 : b.blueprintName) ?? ""
        }
      });
    } catch {
      return;
    }
    const y = await fetch("/umbraco/management/api/v1/updoc/workflows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify({
        name: u.name,
        documentTypeAlias: u.documentTypeAlias,
        sourceType: u.sourceType,
        blueprintId: u.blueprintId,
        blueprintName: u.blueprintName
      })
    });
    if (!y.ok) {
      const r = await y.json();
      throw new Error(r.error || `Failed to create workflow: ${y.statusText}`);
    }
    if (u.mediaUnique)
      try {
        await P(u.name, u.mediaUnique, t);
      } catch (r) {
        console.warn("Sample extraction during workflow creation failed:", r);
      }
    await i(this, n, m).call(this);
  } catch (e) {
    e instanceof Error && (this._error = e.message, console.error("Failed to create workflow:", e));
  }
};
$ = function(e) {
  const t = encodeURIComponent(e.name);
  window.history.pushState({}, "", `section/settings/workspace/updoc-workflow/edit/${t}`), window.dispatchEvent(new PopStateEvent("popstate"));
};
W = async function(e) {
  const t = await this.getContext(I);
  try {
    await t.open(this, L, {
      data: {
        headline: `Delete "${e.name}"?`,
        content: h`<p>This will permanently delete the workflow folder and all its configuration files (destination, map, and source configs).</p>
						<p>This action cannot be undone.</p>`,
        confirmLabel: "Delete",
        color: "danger"
      }
    }).onSubmit();
  } catch {
    return;
  }
  try {
    const l = await (await this.getContext(g)).getLatestToken(), a = await fetch(`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e.name)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${l}`
      }
    });
    if (!a.ok) {
      const s = await a.json();
      throw new Error(s.error || `Failed to delete workflow: ${a.statusText}`);
    }
    j(), await i(this, n, m).call(this);
  } catch (o) {
    this._error = o instanceof Error ? o.message : "Unknown error", console.error("Failed to delete workflow:", o);
  }
};
N = function(e) {
  if (!e.length) return "—";
  const t = { pdf: "PDF", markdown: "Markdown", web: "Web", doc: "Word" };
  return e.map((o) => t[o] ?? o).join(", ");
};
S = function() {
  return h`
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
					@click=${i(this, n, C)}></uui-button>
			</uui-box>
		`;
};
A = function() {
  return h`
			<div class="header">
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${i(this, n, C)}></uui-button>
			</div>
			<uui-box>
				<uui-table>
					<uui-table-head>
						<uui-table-head-cell>Workflow</uui-table-head-cell>
						<uui-table-head-cell>Document Type</uui-table-head-cell>
						<uui-table-head-cell>Blueprint</uui-table-head-cell>
						<uui-table-head-cell>Source</uui-table-head-cell>
						<uui-table-head-cell>Mappings</uui-table-head-cell>
						<uui-table-head-cell>Status</uui-table-head-cell>
						<uui-table-head-cell style="width: 1px;"></uui-table-head-cell>
					</uui-table-head>
					${this._workflows.map(
    (e) => h`
							<uui-table-row class="clickable-row" @click=${() => i(this, n, $).call(this, e)}>
								<uui-table-cell>${e.name}</uui-table-cell>
								<uui-table-cell>${e.documentTypeAlias}</uui-table-cell>
								<uui-table-cell>${e.blueprintName ?? e.blueprintId ?? "—"}</uui-table-cell>
								<uui-table-cell>${i(this, n, N).call(this, e.sourceTypes)}</uui-table-cell>
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
										@click=${(t) => {
      t.stopPropagation(), i(this, n, W).call(this, e);
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
c.styles = [
  R,
  M`
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
f([
  _()
], c.prototype, "_workflows", 2);
f([
  _()
], c.prototype, "_loading", 2);
f([
  _()
], c.prototype, "_error", 2);
c = f([
  O("up-doc-workflows-view")
], c);
const te = c;
export {
  c as UpDocWorkflowsViewElement,
  te as default
};
//# sourceMappingURL=up-doc-workflows-view.element-BxJYpHM6.js.map
