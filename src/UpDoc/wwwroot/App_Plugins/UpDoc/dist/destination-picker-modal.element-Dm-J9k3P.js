import { html as r, nothing as u, css as S, state as _, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as E } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as G } from "@umbraco-cms/backoffice/style";
var U = Object.defineProperty, N = Object.getOwnPropertyDescriptor, y = (e) => {
  throw TypeError(e);
}, m = (e, t, i, l) => {
  for (var c = l > 1 ? void 0 : l ? N(t, i) : t, d = e.length - 1, b; d >= 0; d--)
    (b = e[d]) && (c = (l ? b(t, i, c) : b(c)) || c);
  return l && c && U(t, i, c), c;
}, $ = (e, t, i) => t.has(e) || y("Cannot " + i), o = (e, t, i) => ($(e, t, "read from private field"), i ? i.call(e) : t.get(e)), B = (e, t, i) => t.has(e) ? y("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), s = (e, t, i) => ($(e, t, "access private method"), i), a, n, k, h, g, v, f, x, z, T, C, w, M, P;
let p = class extends E {
  constructor() {
    super(...arguments), B(this, a), this._activeTab = "", this._selectedTargets = /* @__PURE__ */ new Map();
  }
  connectedCallback() {
    super.connectedCallback();
    const e = s(this, a, g).call(this);
    e.length > 0 && (this._activeTab = e[0].id);
  }
  render() {
    const e = s(this, a, g).call(this);
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

					${s(this, a, P).call(this)}
				</div>

				<div slot="actions">
					<uui-button label="Cancel" @click=${s(this, a, z)}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						?disabled=${this._selectedTargets.size === 0}
						@click=${s(this, a, x)}>
						Map to ${this._selectedTargets.size} field${this._selectedTargets.size !== 1 ? "s" : ""}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
n = function() {
  return this.data?.destination;
};
k = function() {
  const e = /* @__PURE__ */ new Map();
  for (const t of this.data?.existingMappings ?? [])
    if (t.enabled !== !1)
      for (const i of t.destinations)
        e.set(s(this, a, v).call(this, i.target, i.blockKey), t.source);
  return e;
};
h = function(e) {
  return e.replace(/\.(content|heading)$/, "").split("-").map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(" ");
};
g = function() {
  if (!o(this, a, n)) return [];
  const e = [], t = new Set(o(this, a, n).fields.map((i) => i.tab).filter(Boolean));
  for (const i of t)
    e.push({
      id: i.toLowerCase().replace(/\s+/g, "-"),
      label: i
    });
  return o(this, a, n).blockGrids?.length && (t.has("Page Content") || e.push({ id: "page-content", label: "Page Content" })), e;
};
v = function(e, t) {
  return t ? `${t}:${e}` : e;
};
f = function(e, t) {
  const i = s(this, a, v).call(this, e, t), l = new Map(this._selectedTargets);
  l.has(i) ? l.delete(i) : l.set(i, { target: e, blockKey: t }), this._selectedTargets = l;
};
x = function() {
  this.value = { selectedTargets: Array.from(this._selectedTargets.values()) }, this.modalContext?.submit();
};
z = function() {
  this.modalContext?.reject();
};
T = function(e) {
  const t = this._selectedTargets.has(e.alias), i = o(this, a, k).get(e.alias);
  return r`
			<div class="field-item ${t ? "field-selected" : ""}" @click=${() => s(this, a, f).call(this, e.alias)}>
				<uui-checkbox
					label="Select ${e.label}"
					?checked=${t}
					@click=${(l) => l.stopPropagation()}
					@change=${() => s(this, a, f).call(this, e.alias)}>
				</uui-checkbox>
				<div class="field-info">
					<span class="field-label">${e.label}</span>
					${i ? r`<span class="field-mapped" title="Mapped from: ${s(this, a, h).call(this, i)}">${s(this, a, h).call(this, i)}</span>` : u}
					<span class="field-type">${e.type}</span>
				</div>
			</div>
		`;
};
C = function(e) {
  if (!o(this, a, n)) return u;
  const t = o(this, a, n).fields.filter((i) => i.tab === e);
  return t.length === 0 ? r`<p class="empty-message">No fields in this tab.</p>` : r`
			<div class="field-list">
				${t.map((i) => s(this, a, T).call(this, i))}
			</div>
		`;
};
w = function() {
  return o(this, a, n)?.blockGrids?.length ? r`
			${o(this, a, n).blockGrids.map((e) => s(this, a, M).call(this, e))}
		` : r`<p class="empty-message">No block grids configured.</p>`;
};
M = function(e) {
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
											${t.properties.map((i) => {
      const l = s(this, a, v).call(this, i.alias, t.key), c = this._selectedTargets.has(l), d = o(this, a, k).get(l);
      return r`
													<div class="block-property ${c ? "field-selected" : ""}" @click=${() => s(this, a, f).call(this, i.alias, t.key)}>
														<uui-checkbox
															label="Select ${i.label || i.alias}"
															?checked=${c}
															@click=${(b) => b.stopPropagation()}
															@change=${() => s(this, a, f).call(this, i.alias, t.key)}>
														</uui-checkbox>
														<span class="block-property-label">${i.label || i.alias}</span>
														${d ? r`<span class="field-mapped" title="Mapped from: ${s(this, a, h).call(this, d)}">${s(this, a, h).call(this, d)}</span>` : u}
														<span class="field-type">${i.type}</span>
													</div>
												`;
    })}
										</div>
									` : u}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
P = function() {
  if (!o(this, a, n)) return u;
  if (this._activeTab === "page-content")
    return s(this, a, w).call(this);
  const e = o(this, a, n).fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab;
  return e ? s(this, a, C).call(this, e) : u;
};
p.styles = [
  G,
  S`
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
				color: #fff;
				background: var(--uui-color-positive-standalone);
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
m([
  _()
], p.prototype, "_activeTab", 2);
m([
  _()
], p.prototype, "_selectedTargets", 2);
p = m([
  D("up-doc-destination-picker-modal")
], p);
const I = p;
export {
  p as UpDocDestinationPickerModalElement,
  I as default
};
//# sourceMappingURL=destination-picker-modal.element-Dm-J9k3P.js.map
