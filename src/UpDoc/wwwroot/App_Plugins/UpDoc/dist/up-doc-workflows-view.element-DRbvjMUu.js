import { html as h, css as O, state as _, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as D } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as R } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as g } from "@umbraco-cms/backoffice/auth";
import { UmbModalToken as B, umbOpenModal as x, UMB_MODAL_MANAGER_CONTEXT as I, UMB_CONFIRM_MODAL as L } from "@umbraco-cms/backoffice/modal";
import { U as F } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { c as P } from "./workflow.service-C-MBMeeJ.js";
const j = new B(
  "UpDoc.CreateWorkflowSidebar",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var z = Object.defineProperty, q = Object.getOwnPropertyDescriptor, U = (e) => {
  throw TypeError(e);
}, f = (e, t, o, l) => {
  for (var a = l > 1 ? void 0 : l ? q(t, o) : t, u = e.length - 1, c; u >= 0; u--)
    (c = e[u]) && (a = (l ? c(t, o, a) : c(a)) || a);
  return l && a && z(t, o, a), a;
}, V = (e, t, o) => t.has(e) || U("Cannot " + o), G = (e, t, o) => t.has(e) ? U("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), i = (e, t, o) => (V(e, t, "access private method"), o), r, m, C, $, W, N, A, M;
let s = class extends D {
  constructor() {
    super(...arguments), G(this, r), this._workflows = [], this._loading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await i(this, r, m).call(this);
  }
  render() {
    return this._loading ? h`<uui-loader-bar></uui-loader-bar>` : this._error ? h`
				<uui-box>
					<p style="color: var(--uui-color-danger);">Error: ${this._error}</p>
					<uui-button look="secondary" @click=${() => i(this, r, m).call(this)}>Retry</uui-button>
				</uui-box>
			` : this._workflows.length === 0 ? i(this, r, A).call(this) : i(this, r, M).call(this);
  }
};
r = /* @__PURE__ */ new WeakSet();
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
    for (const n of l) {
      const T = await fetch(
        `/umbraco/management/api/v1/updoc/document-types/${encodeURIComponent(n.alias)}/blueprints`,
        { headers: { Authorization: `Bearer ${t}` } }
      );
      if (!T.ok) continue;
      const v = await T.json();
      v.length > 0 && a.push({
        documentTypeUnique: n.id,
        documentTypeName: n.name,
        documentTypeIcon: n.icon ?? null,
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
    let u;
    try {
      u = await x(this, F, {
        data: { documentTypes: a }
      });
    } catch {
      return;
    }
    const { blueprintUnique: c, documentTypeUnique: w } = u, d = a.find((n) => n.documentTypeUnique === w), b = d == null ? void 0 : d.blueprints.find((n) => n.blueprintUnique === c), k = l.find((n) => n.id === w);
    let p;
    try {
      p = await x(this, j, {
        data: {
          documentTypeUnique: w,
          documentTypeName: (d == null ? void 0 : d.documentTypeName) ?? "",
          documentTypeAlias: (k == null ? void 0 : k.alias) ?? "",
          blueprintUnique: c,
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
        name: p.name,
        documentTypeAlias: p.documentTypeAlias,
        sourceType: p.sourceType,
        blueprintId: p.blueprintId,
        blueprintName: p.blueprintName
      })
    });
    if (!y.ok) {
      const n = await y.json();
      throw new Error(n.error || `Failed to create workflow: ${y.statusText}`);
    }
    await i(this, r, m).call(this);
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
      const u = await a.json();
      throw new Error(u.error || `Failed to delete workflow: ${a.statusText}`);
    }
    P(), await i(this, r, m).call(this);
  } catch (o) {
    this._error = o instanceof Error ? o.message : "Unknown error", console.error("Failed to delete workflow:", o);
  }
};
N = function(e) {
  if (!e.length) return "—";
  const t = { pdf: "PDF", markdown: "Markdown", web: "Web", doc: "Word" };
  return e.map((o) => t[o] ?? o).join(", ");
};
A = function() {
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
					@click=${i(this, r, C)}></uui-button>
			</uui-box>
		`;
};
M = function() {
  return h`
			<div class="header">
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${i(this, r, C)}></uui-button>
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
							<uui-table-row class="clickable-row" @click=${() => i(this, r, $).call(this, e)}>
								<uui-table-cell>${e.name}</uui-table-cell>
								<uui-table-cell>${e.documentTypeAlias}</uui-table-cell>
								<uui-table-cell>${e.blueprintName ?? e.blueprintId ?? "—"}</uui-table-cell>
								<uui-table-cell>${i(this, r, N).call(this, e.sourceTypes)}</uui-table-cell>
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
      t.stopPropagation(), i(this, r, W).call(this, e);
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
  R,
  O`
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
], s.prototype, "_workflows", 2);
f([
  _()
], s.prototype, "_loading", 2);
f([
  _()
], s.prototype, "_error", 2);
s = f([
  S("up-doc-workflows-view")
], s);
const ee = s;
export {
  s as UpDocWorkflowsViewElement,
  ee as default
};
//# sourceMappingURL=up-doc-workflows-view.element-DRbvjMUu.js.map
