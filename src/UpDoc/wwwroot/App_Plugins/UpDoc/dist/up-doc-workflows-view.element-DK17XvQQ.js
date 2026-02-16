import { html as p, css as S, state as b, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as O } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as B } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as y } from "@umbraco-cms/backoffice/auth";
import { UmbModalToken as R, umbOpenModal as v, UMB_MODAL_MANAGER_CONTEXT as I, UMB_CONFIRM_MODAL as L } from "@umbraco-cms/backoffice/modal";
import { U as F } from "./blueprint-picker-modal.token-mXZoRNwG.js";
import { k as P, q as j } from "./workflow.service-D_fkSdCh.js";
const q = new R(
  "UpDoc.CreateWorkflowSidebar",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var z = Object.defineProperty, V = Object.getOwnPropertyDescriptor, E = (e) => {
  throw TypeError(e);
}, m = (e, t, o, l) => {
  for (var a = l > 1 ? void 0 : l ? V(t, o) : t, s = e.length - 1, d; s >= 0; s--)
    (d = e[s]) && (a = (l ? d(t, o, a) : d(a)) || a);
  return l && a && z(t, o, a), a;
}, G = (e, t, o) => t.has(e) || E("Cannot " + o), K = (e, t, o) => t.has(e) ? E("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), i = (e, t, o) => (G(e, t, "access private method"), o), n, h, k, x, U, $, D, A;
let c = class extends O {
  constructor() {
    super(...arguments), K(this, n), this._workflows = [], this._loading = !0, this._error = null;
  }
  async connectedCallback() {
    super.connectedCallback(), await i(this, n, h).call(this);
  }
  render() {
    return this._loading ? p`<uui-loader-bar></uui-loader-bar>` : this._error ? p`
				<uui-box>
					<p style="color: var(--uui-color-danger);">Error: ${this._error}</p>
					<uui-button look="secondary" @click=${() => i(this, n, h).call(this)}>Retry</uui-button>
				</uui-box>
			` : this._workflows.length === 0 ? i(this, n, D).call(this) : i(this, n, A).call(this);
  }
};
n = /* @__PURE__ */ new WeakSet();
h = async function() {
  this._loading = !0, this._error = null;
  try {
    const t = await (await this.getContext(y)).getLatestToken(), o = await fetch("/umbraco/management/api/v1/updoc/workflows", {
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
k = async function() {
  try {
    const t = await (await this.getContext(y)).getLatestToken(), o = await fetch("/umbraco/management/api/v1/updoc/document-types", {
      headers: { Authorization: `Bearer ${t}` }
    });
    if (!o.ok)
      throw new Error("Failed to load document types");
    const l = await o.json(), a = [];
    for (const r of l) {
      const g = await fetch(
        `/umbraco/management/api/v1/updoc/document-types/${encodeURIComponent(r.alias)}/blueprints`,
        { headers: { Authorization: `Bearer ${t}` } }
      );
      if (!g.ok) continue;
      const T = await g.json();
      T.length > 0 && a.push({
        documentTypeUnique: r.id,
        documentTypeName: r.name,
        documentTypeIcon: r.icon ?? null,
        blueprints: T.map((C) => ({
          blueprintUnique: C.id,
          blueprintName: C.name
        }))
      });
    }
    if (!a.length) {
      this._error = "No document types with blueprints found. Create a Document Blueprint first.";
      return;
    }
    let s;
    try {
      s = await v(this, F, {
        data: { documentTypes: a }
      });
    } catch {
      return;
    }
    const { blueprintUnique: d, documentTypeUnique: f } = s, _ = a.find((r) => r.documentTypeUnique === f), W = _?.blueprints.find((r) => r.blueprintUnique === d), N = l.find((r) => r.id === f);
    let u;
    try {
      u = await v(this, q, {
        data: {
          documentTypeUnique: f,
          documentTypeName: _?.documentTypeName ?? "",
          documentTypeAlias: N?.alias ?? "",
          blueprintUnique: d,
          blueprintName: W?.blueprintName ?? ""
        }
      });
    } catch {
      return;
    }
    const w = await fetch("/umbraco/management/api/v1/updoc/workflows", {
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
    if (!w.ok) {
      const r = await w.json();
      throw new Error(r.error || `Failed to create workflow: ${w.statusText}`);
    }
    if (u.mediaUnique)
      try {
        await P(u.name, u.mediaUnique, t);
      } catch (r) {
        console.warn("Sample extraction during workflow creation failed:", r);
      }
    await i(this, n, h).call(this);
  } catch (e) {
    e instanceof Error && (this._error = e.message, console.error("Failed to create workflow:", e));
  }
};
x = function(e) {
  const t = encodeURIComponent(e.name);
  window.history.pushState({}, "", `section/settings/workspace/updoc-workflow/edit/${t}`), window.dispatchEvent(new PopStateEvent("popstate"));
};
U = async function(e) {
  const t = await this.getContext(I);
  try {
    await t.open(this, L, {
      data: {
        headline: `Delete "${e.name}"?`,
        content: p`<p>This will permanently delete the workflow folder and all its configuration files (destination, map, and source configs).</p>
						<p>This action cannot be undone.</p>`,
        confirmLabel: "Delete",
        color: "danger"
      }
    }).onSubmit();
  } catch {
    return;
  }
  try {
    const l = await (await this.getContext(y)).getLatestToken(), a = await fetch(`/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e.name)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${l}`
      }
    });
    if (!a.ok) {
      const s = await a.json();
      throw new Error(s.error || `Failed to delete workflow: ${a.statusText}`);
    }
    j(), await i(this, n, h).call(this);
  } catch (o) {
    this._error = o instanceof Error ? o.message : "Unknown error", console.error("Failed to delete workflow:", o);
  }
};
$ = function(e) {
  if (!e.length) return "—";
  const t = { pdf: "PDF", markdown: "Markdown", web: "Web", doc: "Word" };
  return e.map((o) => t[o] ?? o).join(", ");
};
D = function() {
  return p`
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
					@click=${i(this, n, k)}></uui-button>
			</uui-box>
		`;
};
A = function() {
  return p`
			<div class="header">
				<uui-button
					look="primary"
					color="positive"
					label="Create Workflow"
					@click=${i(this, n, k)}></uui-button>
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
    (e) => p`
							<uui-table-row class="clickable-row" @click=${() => i(this, n, x).call(this, e)}>
								<uui-table-cell>${e.name}</uui-table-cell>
								<uui-table-cell>${e.documentTypeAlias}</uui-table-cell>
								<uui-table-cell>${e.blueprintName ?? e.blueprintId ?? "—"}</uui-table-cell>
								<uui-table-cell>${i(this, n, $).call(this, e.sourceTypes)}</uui-table-cell>
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
      t.stopPropagation(), i(this, n, U).call(this, e);
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
  B,
  S`
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
m([
  b()
], c.prototype, "_workflows", 2);
m([
  b()
], c.prototype, "_loading", 2);
m([
  b()
], c.prototype, "_error", 2);
c = m([
  M("up-doc-workflows-view")
], c);
const te = c;
export {
  c as UpDocWorkflowsViewElement,
  te as default
};
//# sourceMappingURL=up-doc-workflows-view.element-DK17XvQQ.js.map
