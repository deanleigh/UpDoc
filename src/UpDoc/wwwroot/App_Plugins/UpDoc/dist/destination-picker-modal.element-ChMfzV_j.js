import { g as m } from "./destination-utils-DUfOJy5W.js";
import { html as o, nothing as d, css as D, state as y, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as L } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as U } from "@umbraco-cms/backoffice/style";
var B = Object.defineProperty, N = Object.getOwnPropertyDescriptor, $ = (t) => {
  throw TypeError(t);
}, k = (t, a, e, s) => {
  for (var n = s > 1 ? void 0 : s ? N(a, e) : a, u = t.length - 1, b; u >= 0; u--)
    (b = t[u]) && (n = (s ? b(a, e, n) : b(n)) || n);
  return s && n && B(a, e, n), n;
}, x = (t, a, e) => a.has(t) || $("Cannot " + e), r = (t, a, e) => (x(t, a, "read from private field"), e ? e.call(t) : a.get(t)), A = (t, a, e) => a.has(t) ? $("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), l = (t, a, e) => (x(t, a, "access private method"), e), i, c, _, h, g, v, f, T, z, C, w, M, P, S;
let p = class extends L {
  constructor() {
    super(...arguments), A(this, i), this._activeTab = "", this._selectedTargets = /* @__PURE__ */ new Map();
  }
  connectedCallback() {
    super.connectedCallback();
    const t = l(this, i, g).call(this);
    t.length > 0 && (this._activeTab = t[0].id);
  }
  render() {
    const t = l(this, i, g).call(this);
    return o`
			<umb-body-layout headline="Pick destination field(s)">
				<div class="tab-content">
					<uui-tab-group class="content-inner-tabs" dropdown-content-direction="vertical">
						${t.map(
      (a) => o`
								<uui-tab
									label=${a.label}
									?active=${this._activeTab === a.id}
									@click=${() => {
        this._activeTab = a.id;
      }}>
									${a.label}
								</uui-tab>
							`
    )}
					</uui-tab-group>

					${l(this, i, S).call(this)}
				</div>

				<div slot="actions">
					<uui-button label="Cancel" @click=${l(this, i, z)}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						?disabled=${this._selectedTargets.size === 0}
						@click=${l(this, i, T)}>
						Map to ${this._selectedTargets.size} field${this._selectedTargets.size !== 1 ? "s" : ""}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
c = function() {
  return this.data?.destination;
};
_ = function() {
  const t = /* @__PURE__ */ new Map();
  for (const a of this.data?.existingMappings ?? [])
    if (a.enabled !== !1)
      for (const e of a.destinations)
        t.set(l(this, i, v).call(this, e.target, e.blockKey), a.source);
  return t;
};
h = function(t) {
  return t.replace(/\.(content|heading)$/, "").split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
};
g = function() {
  if (!r(this, i, c)) return [];
  const t = [], a = new Set(r(this, i, c).fields.map((e) => e.tab).filter(Boolean));
  for (const e of a)
    t.push({
      id: e.toLowerCase().replace(/\s+/g, "-"),
      label: e
    });
  for (const e of m(r(this, i, c))) {
    const s = e.tab ?? "Page Content";
    a.has(s) || (a.add(s), t.push({
      id: s.toLowerCase().replace(/\s+/g, "-"),
      label: s
    }));
  }
  return t;
};
v = function(t, a) {
  return a ? `${a}:${t}` : t;
};
f = function(t, a) {
  const e = l(this, i, v).call(this, t, a), s = new Map(this._selectedTargets);
  s.has(e) ? s.delete(e) : s.set(e, { target: t, blockKey: a }), this._selectedTargets = s;
};
T = function() {
  this.value = { selectedTargets: Array.from(this._selectedTargets.values()) }, this.modalContext?.submit();
};
z = function() {
  this.modalContext?.reject();
};
C = function(t) {
  const a = this._selectedTargets.has(t.alias), e = r(this, i, _).get(t.alias);
  return o`
			<div class="field-item ${a ? "field-selected" : ""}" @click=${() => l(this, i, f).call(this, t.alias)}>
				<uui-checkbox
					label="Select ${t.label}"
					?checked=${a}
					@click=${(s) => s.stopPropagation()}
					@change=${() => l(this, i, f).call(this, t.alias)}>
				</uui-checkbox>
				<div class="field-info">
					<span class="field-label">${t.label}</span>
					${e ? o`<span class="field-mapped" title="Mapped from: ${l(this, i, h).call(this, e)}">${l(this, i, h).call(this, e)}</span>` : d}
					<span class="field-type">${t.type}</span>
				</div>
			</div>
		`;
};
w = function(t) {
  if (!r(this, i, c)) return d;
  const a = r(this, i, c).fields.filter((e) => e.tab === t);
  return a.length === 0 ? o`<p class="empty-message">No fields in this tab.</p>` : o`
			<div class="field-list">
				${a.map((e) => l(this, i, C).call(this, e))}
			</div>
		`;
};
M = function(t) {
  if (!r(this, i, c)) return d;
  const a = m(r(this, i, c)).filter((e) => (e.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === t);
  return a.length ? o`
			${a.map((e) => l(this, i, P).call(this, e))}
		` : o`<p class="empty-message">No blocks configured.</p>`;
};
P = function(t) {
  return o`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${t.label}</span>
				</div>
				<div class="block-list">
					${t.blocks.map(
    (a) => o`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${a.label}</span>
								</div>
								${a.properties?.length ? o`
										<div class="block-properties">
											${a.properties.map((e) => {
      const s = l(this, i, v).call(this, e.alias, a.key), n = this._selectedTargets.has(s), u = r(this, i, _).get(s);
      return o`
													<div class="block-property ${n ? "field-selected" : ""}" @click=${() => l(this, i, f).call(this, e.alias, a.key)}>
														<uui-checkbox
															label="Select ${e.label || e.alias}"
															?checked=${n}
															@click=${(b) => b.stopPropagation()}
															@change=${() => l(this, i, f).call(this, e.alias, a.key)}>
														</uui-checkbox>
														<span class="block-property-label">${e.label || e.alias}</span>
														${u ? o`<span class="field-mapped" title="Mapped from: ${l(this, i, h).call(this, u)}">${l(this, i, h).call(this, u)}</span>` : d}
														<span class="field-type">${e.type}</span>
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
S = function() {
  if (!r(this, i, c)) return d;
  const t = r(this, i, c).fields.find(
    (e) => e.tab && e.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab, a = m(r(this, i, c)).some((e) => (e.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-") === this._activeTab);
  return o`
			${t ? l(this, i, w).call(this, t) : d}
			${a ? l(this, i, M).call(this, this._activeTab) : d}
		`;
};
p.styles = [
  U,
  D`
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
k([
  y()
], p.prototype, "_activeTab", 2);
k([
  y()
], p.prototype, "_selectedTargets", 2);
p = k([
  E("up-doc-destination-picker-modal")
], p);
const W = p;
export {
  p as UpDocDestinationPickerModalElement,
  W as default
};
//# sourceMappingURL=destination-picker-modal.element-ChMfzV_j.js.map
