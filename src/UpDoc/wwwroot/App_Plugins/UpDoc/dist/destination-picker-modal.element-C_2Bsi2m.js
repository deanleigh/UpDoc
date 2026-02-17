import { html as r, nothing as d, css as M, state as k, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as E } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as S } from "@umbraco-cms/backoffice/style";
var G = Object.defineProperty, N = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, g = (e, t, a, l) => {
  for (var c = l > 1 ? void 0 : l ? N(t, a) : t, p = e.length - 1, b; p >= 0; p--)
    (b = e[p]) && (c = (l ? b(t, a, c) : b(c)) || c);
  return l && c && G(t, a, c), c;
}, y = (e, t, a) => t.has(e) || _("Cannot " + a), o = (e, t, a) => (y(e, t, "read from private field"), a ? a.call(e) : t.get(e)), U = (e, t, a) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), s = (e, t, a) => (y(e, t, "access private method"), a), i, n, m, v, f, h, $, x, z, T, C, w, P;
let u = class extends E {
  constructor() {
    super(...arguments), U(this, i), this._activeTab = "", this._selectedTargets = /* @__PURE__ */ new Map();
  }
  connectedCallback() {
    super.connectedCallback();
    const e = s(this, i, v).call(this);
    e.length > 0 && (this._activeTab = e[0].id);
  }
  render() {
    const e = s(this, i, v).call(this);
    return r`
			<umb-body-layout headline="Pick destination field(s)">
				<div class="tab-content">
					<uui-tab-group class="content-inner-tabs" dropdown-content-direction="vertical">
						${e.map(
      (t) => r`
								<uui-tab
									label=${t.label}
									?active=${this._activeTab === t.id}
									@click=${() => {
        this._activeTab = t.id;
      }}>
									${t.label}
								</uui-tab>
							`
    )}
					</uui-tab-group>

					${s(this, i, P).call(this)}
				</div>

				<div slot="actions">
					<uui-button label="Cancel" @click=${s(this, i, x)}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						?disabled=${this._selectedTargets.size === 0}
						@click=${s(this, i, $)}>
						Map to ${this._selectedTargets.size} field${this._selectedTargets.size !== 1 ? "s" : ""}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
n = function() {
  return this.data?.destination;
};
m = function() {
  const e = /* @__PURE__ */ new Set();
  for (const t of this.data?.existingMappings ?? [])
    if (t.enabled !== !1)
      for (const a of t.destinations)
        e.add(s(this, i, f).call(this, a.target, a.blockKey));
  return e;
};
v = function() {
  if (!o(this, i, n)) return [];
  const e = [], t = new Set(o(this, i, n).fields.map((a) => a.tab).filter(Boolean));
  for (const a of t)
    e.push({
      id: a.toLowerCase().replace(/\s+/g, "-"),
      label: a
    });
  return o(this, i, n).blockGrids?.length && (t.has("Page Content") || e.push({ id: "page-content", label: "Page Content" })), e;
};
f = function(e, t) {
  return t ? `${t}:${e}` : e;
};
h = function(e, t) {
  const a = s(this, i, f).call(this, e, t), l = new Map(this._selectedTargets);
  l.has(a) ? l.delete(a) : l.set(a, { target: e, blockKey: t }), this._selectedTargets = l;
};
$ = function() {
  this.value = { selectedTargets: Array.from(this._selectedTargets.values()) }, this.modalContext?.submit();
};
x = function() {
  this.modalContext?.reject();
};
z = function(e) {
  const t = this._selectedTargets.has(e.alias), a = o(this, i, m).has(e.alias);
  return r`
			<div class="field-item ${t ? "field-selected" : ""}" @click=${() => s(this, i, h).call(this, e.alias)}>
				<uui-checkbox
					label="Select ${e.label}"
					?checked=${t}
					@click=${(l) => l.stopPropagation()}
					@change=${() => s(this, i, h).call(this, e.alias)}>
				</uui-checkbox>
				<div class="field-info">
					<span class="field-label">${e.label}</span>
					${a ? r`<span class="field-mapped">mapped</span>` : d}
					<span class="field-type">${e.type}</span>
				</div>
			</div>
		`;
};
T = function(e) {
  if (!o(this, i, n)) return d;
  const t = o(this, i, n).fields.filter((a) => a.tab === e);
  return t.length === 0 ? r`<p class="empty-message">No fields in this tab.</p>` : r`
			<div class="field-list">
				${t.map((a) => s(this, i, z).call(this, a))}
			</div>
		`;
};
C = function() {
  return o(this, i, n)?.blockGrids?.length ? r`
			${o(this, i, n).blockGrids.map((e) => s(this, i, w).call(this, e))}
		` : r`<p class="empty-message">No block grids configured.</p>`;
};
w = function(e) {
  return r`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${e.label}</span>
				</div>
				<div class="block-list">
					${e.blocks.map(
    (t) => r`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${t.label}</span>
								</div>
								${t.properties?.length ? r`
										<div class="block-properties">
											${t.properties.map((a) => {
      const l = s(this, i, f).call(this, a.alias, t.key), c = this._selectedTargets.has(l), p = o(this, i, m).has(l);
      return r`
													<div class="block-property ${c ? "field-selected" : ""}" @click=${() => s(this, i, h).call(this, a.alias, t.key)}>
														<uui-checkbox
															label="Select ${a.label || a.alias}"
															?checked=${c}
															@click=${(b) => b.stopPropagation()}
															@change=${() => s(this, i, h).call(this, a.alias, t.key)}>
														</uui-checkbox>
														<span class="block-property-label">${a.label || a.alias}</span>
														${p ? r`<span class="field-mapped">mapped</span>` : d}
														<span class="field-type">${a.type}</span>
													</div>
												`;
    })}
										</div>
									` : d}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
P = function() {
  if (!o(this, i, n)) return d;
  if (this._activeTab === "page-content")
    return s(this, i, C).call(this);
  const e = o(this, i, n).fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab;
  return e ? s(this, i, T).call(this, e) : d;
};
u.styles = [
  S,
  M`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
			}

			.tab-content {
				display: flex;
				flex-direction: column;
			}

			/* Inner tabs — bleed edge-to-edge past body layout padding */
			.content-inner-tabs {
				margin: calc(var(--uui-size-layout-1) * -1);
				margin-bottom: var(--uui-size-space-4);
				background: var(--uui-color-surface);
				--uui-tab-background: var(--uui-color-surface);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.empty-message {
				color: var(--uui-color-text-alt);
				font-style: italic;
				padding: var(--uui-size-space-4);
			}

			.field-list {
				display: flex;
				flex-direction: column;
			}

			.field-item {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.field-item:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.field-item.field-selected {
				background: var(--uui-color-selected);
			}

			.field-item:last-child {
				border-bottom: none;
			}

			.field-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				flex: 1;
			}

			.field-label {
				font-weight: 600;
			}

			.field-type {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				background: var(--uui-color-surface-alt);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.field-mapped {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-positive-standalone);
				background: var(--uui-color-positive-emphasis);
				padding: 2px 8px;
				border-radius: var(--uui-border-radius);
			}

			.block-grid {
				margin-bottom: var(--uui-size-space-3);
			}

			.block-grid-header {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-grid-label {
				font-weight: 600;
			}

			.block-list {
				display: flex;
				flex-direction: column;
			}

			.block-item {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				padding-left: var(--uui-size-space-6);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.block-item:last-child {
				border-bottom: none;
			}

			.block-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-bottom: var(--uui-size-space-2);
			}

			.block-label {
				font-weight: 600;
			}

			.block-properties {
				padding-left: var(--uui-size-space-5);
			}

			.block-property {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
				border-radius: var(--uui-border-radius);
			}

			.block-property:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.block-property.field-selected {
				background: var(--uui-color-selected);
			}

			.block-property-label {
				font-size: var(--uui-type-small-size);
			}
		`
];
g([
  k()
], u.prototype, "_activeTab", 2);
g([
  k()
], u.prototype, "_selectedTargets", 2);
u = g([
  D("up-doc-destination-picker-modal")
], u);
const A = u;
export {
  u as UpDocDestinationPickerModalElement,
  A as default
};
//# sourceMappingURL=destination-picker-modal.element-C_2Bsi2m.js.map
