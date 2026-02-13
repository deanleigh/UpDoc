import { html as r, nothing as b, css as P, state as m, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as M } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as E } from "@umbraco-cms/backoffice/style";
var G = Object.defineProperty, S = Object.getOwnPropertyDescriptor, k = (e) => {
  throw TypeError(e);
}, v = (e, t, i, l) => {
  for (var o = l > 1 ? void 0 : l ? S(t, i) : t, u = e.length - 1, h; u >= 0; u--)
    (h = e[u]) && (o = (l ? h(t, i, o) : h(o)) || o);
  return l && o && G(t, i, o), o;
}, _ = (e, t, i) => t.has(e) || k("Cannot " + i), n = (e, t, i) => (_(e, t, "read from private field"), i ? i.call(e) : t.get(e)), N = (e, t, i) => t.has(e) ? k("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), s = (e, t, i) => (_(e, t, "access private method"), i), a, c, f, g, p, y, $, x, z, T, C, w;
let d = class extends M {
  constructor() {
    super(...arguments), N(this, a), this._activeTab = "", this._selectedTargets = /* @__PURE__ */ new Map();
  }
  connectedCallback() {
    super.connectedCallback();
    const e = s(this, a, f).call(this);
    e.length > 0 && (this._activeTab = e[0].id);
  }
  render() {
    const e = s(this, a, f).call(this);
    return r`
			<umb-body-layout headline="Pick destination field(s)">
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
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

				<uui-box>
					${s(this, a, w).call(this)}
				</uui-box>

				<div slot="actions">
					<uui-button label="Cancel" @click=${s(this, a, $)}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						?disabled=${this._selectedTargets.size === 0}
						@click=${s(this, a, y)}>
						Map to ${this._selectedTargets.size} field${this._selectedTargets.size !== 1 ? "s" : ""}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
c = function() {
  return this.data?.destination;
};
f = function() {
  if (!n(this, a, c)) return [];
  const e = [], t = new Set(n(this, a, c).fields.map((i) => i.tab).filter(Boolean));
  for (const i of t)
    e.push({
      id: i.toLowerCase().replace(/\s+/g, "-"),
      label: i
    });
  return n(this, a, c).blockGrids?.length && (t.has("Page Content") || e.push({ id: "page-content", label: "Page Content" })), e;
};
g = function(e, t) {
  return t ? `${t}:${e}` : e;
};
p = function(e, t) {
  const i = s(this, a, g).call(this, e, t), l = new Map(this._selectedTargets);
  l.has(i) ? l.delete(i) : l.set(i, { target: e, blockKey: t }), this._selectedTargets = l;
};
y = function() {
  this.value = { selectedTargets: Array.from(this._selectedTargets.values()) }, this.modalContext?.submit();
};
$ = function() {
  this.modalContext?.reject();
};
x = function(e) {
  const t = this._selectedTargets.has(e.alias);
  return r`
			<div class="field-item ${t ? "field-selected" : ""}" @click=${() => s(this, a, p).call(this, e.alias)}>
				<uui-checkbox
					label="Select ${e.label}"
					?checked=${t}
					@click=${(i) => i.stopPropagation()}
					@change=${() => s(this, a, p).call(this, e.alias)}>
				</uui-checkbox>
				<div class="field-info">
					<span class="field-label">${e.label}</span>
					<span class="field-type">${e.type}</span>
				</div>
			</div>
		`;
};
z = function(e) {
  if (!n(this, a, c)) return b;
  const t = n(this, a, c).fields.filter((i) => i.tab === e);
  return t.length === 0 ? r`<p class="empty-message">No fields in this tab.</p>` : r`
			<div class="field-list">
				${t.map((i) => s(this, a, x).call(this, i))}
			</div>
		`;
};
T = function() {
  return n(this, a, c)?.blockGrids?.length ? r`
			${n(this, a, c).blockGrids.map((e) => s(this, a, C).call(this, e))}
		` : r`<p class="empty-message">No block grids configured.</p>`;
};
C = function(e) {
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
      const l = s(this, a, g).call(this, i.alias, t.key), o = this._selectedTargets.has(l);
      return r`
													<div class="block-property ${o ? "field-selected" : ""}" @click=${() => s(this, a, p).call(this, i.alias, t.key)}>
														<uui-checkbox
															label="Select ${i.label || i.alias}"
															?checked=${o}
															@click=${(u) => u.stopPropagation()}
															@change=${() => s(this, a, p).call(this, i.alias, t.key)}>
														</uui-checkbox>
														<span class="block-property-label">${i.label || i.alias}</span>
														<span class="field-type">${i.type}</span>
													</div>
												`;
    })}
										</div>
									` : b}
							</div>
						`
  )}
				</div>
			</div>
		`;
};
w = function() {
  if (!n(this, a, c)) return b;
  if (this._activeTab === "page-content")
    return s(this, a, T).call(this);
  const e = n(this, a, c).fields.find(
    (t) => t.tab && t.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )?.tab;
  return e ? s(this, a, z).call(this, e) : b;
};
d.styles = [
  E,
  P`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
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
v([
  m()
], d.prototype, "_activeTab", 2);
v([
  m()
], d.prototype, "_selectedTargets", 2);
d = v([
  D("up-doc-destination-picker-modal")
], d);
const F = d;
export {
  d as UpDocDestinationPickerModalElement,
  F as default
};
//# sourceMappingURL=destination-picker-modal.element-CEYzzXx9.js.map
