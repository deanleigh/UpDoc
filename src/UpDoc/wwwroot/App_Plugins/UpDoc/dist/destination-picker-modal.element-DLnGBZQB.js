import { html as o, nothing as h, css as w, state as g, customElement as P } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as D } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as S } from "@umbraco-cms/backoffice/style";
var E = Object.defineProperty, G = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, v = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? G(t, i) : t, d = e.length - 1, p; d >= 0; d--)
    (p = e[d]) && (r = (s ? p(t, i, r) : p(r)) || r);
  return s && r && E(t, i, r), r;
}, k = (e, t, i) => t.has(e) || m("Cannot " + i), n = (e, t, i) => (k(e, t, "read from private field"), i ? i.call(e) : t.get(e)), M = (e, t, i) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), l = (e, t, i) => (k(e, t, "access private method"), i), a, c, f, b, _, y, $, x, z, T, C;
let u = class extends D {
  constructor() {
    super(...arguments), M(this, a), this._activeTab = "", this._selectedTargets = /* @__PURE__ */ new Set();
  }
  connectedCallback() {
    super.connectedCallback();
    const e = l(this, a, f).call(this);
    e.length > 0 && (this._activeTab = e[0].id);
  }
  render() {
    const e = l(this, a, f).call(this);
    return o`
			<umb-body-layout headline="Pick destination field(s)">
				<uui-tab-group slot="header" dropdown-content-direction="vertical">
					${e.map(
      (t) => o`
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
					${l(this, a, C).call(this)}
				</uui-box>

				<div slot="actions">
					<uui-button label="Cancel" @click=${l(this, a, y)}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						?disabled=${this._selectedTargets.size === 0}
						@click=${l(this, a, _)}>
						Map to ${this._selectedTargets.size} field${this._selectedTargets.size !== 1 ? "s" : ""}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
c = function() {
  var e;
  return (e = this.data) == null ? void 0 : e.destination;
};
f = function() {
  var i;
  if (!n(this, a, c)) return [];
  const e = [], t = new Set(n(this, a, c).fields.map((s) => s.tab).filter(Boolean));
  for (const s of t)
    e.push({
      id: s.toLowerCase().replace(/\s+/g, "-"),
      label: s
    });
  return (i = n(this, a, c).blockGrids) != null && i.length && (t.has("Page Content") || e.push({ id: "page-content", label: "Page Content" })), e;
};
b = function(e) {
  const t = new Set(this._selectedTargets);
  t.has(e) ? t.delete(e) : t.add(e), this._selectedTargets = t;
};
_ = function() {
  var e;
  this.value = { selectedTargets: Array.from(this._selectedTargets) }, (e = this.modalContext) == null || e.submit();
};
y = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
};
$ = function(e) {
  const t = this._selectedTargets.has(e.alias);
  return o`
			<div class="field-item ${t ? "field-selected" : ""}" @click=${() => l(this, a, b).call(this, e.alias)}>
				<uui-checkbox
					label="Select ${e.label}"
					?checked=${t}
					@click=${(i) => i.stopPropagation()}
					@change=${() => l(this, a, b).call(this, e.alias)}>
				</uui-checkbox>
				<div class="field-info">
					<span class="field-label">${e.label}</span>
					<span class="field-type">${e.type}</span>
				</div>
			</div>
		`;
};
x = function(e) {
  if (!n(this, a, c)) return h;
  const t = n(this, a, c).fields.filter((i) => i.tab === e);
  return t.length === 0 ? o`<p class="empty-message">No fields in this tab.</p>` : o`
			<div class="field-list">
				${t.map((i) => l(this, a, $).call(this, i))}
			</div>
		`;
};
z = function() {
  var e, t;
  return (t = (e = n(this, a, c)) == null ? void 0 : e.blockGrids) != null && t.length ? o`
			${n(this, a, c).blockGrids.map((i) => l(this, a, T).call(this, i))}
		` : o`<p class="empty-message">No block grids configured.</p>`;
};
T = function(e) {
  return o`
			<div class="block-grid">
				<div class="block-grid-header">
					<span class="block-grid-label">${e.label}</span>
				</div>
				<div class="block-list">
					${e.blocks.map(
    (t) => {
      var i;
      return o`
							<div class="block-item">
								<div class="block-header">
									<umb-icon name="icon-box"></umb-icon>
									<span class="block-label">${t.label}</span>
								</div>
								${(i = t.properties) != null && i.length ? o`
										<div class="block-properties">
											${t.properties.map((s) => {
        const r = s.alias, d = this._selectedTargets.has(r);
        return o`
													<div class="block-property ${d ? "field-selected" : ""}" @click=${() => l(this, a, b).call(this, r)}>
														<uui-checkbox
															label="Select ${s.label || s.alias}"
															?checked=${d}
															@click=${(p) => p.stopPropagation()}
															@change=${() => l(this, a, b).call(this, r)}>
														</uui-checkbox>
														<span class="block-property-label">${s.label || s.alias}</span>
														<span class="field-type">${s.type}</span>
													</div>
												`;
      })}
										</div>
									` : h}
							</div>
						`;
    }
  )}
				</div>
			</div>
		`;
};
C = function() {
  var t;
  if (!n(this, a, c)) return h;
  if (this._activeTab === "page-content")
    return l(this, a, z).call(this);
  const e = (t = n(this, a, c).fields.find(
    (i) => i.tab && i.tab.toLowerCase().replace(/\s+/g, "-") === this._activeTab
  )) == null ? void 0 : t.tab;
  return e ? l(this, a, x).call(this, e) : h;
};
u.styles = [
  S,
  w`
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
  g()
], u.prototype, "_activeTab", 2);
v([
  g()
], u.prototype, "_selectedTargets", 2);
u = v([
  P("up-doc-destination-picker-modal")
], u);
const O = u;
export {
  u as UpDocDestinationPickerModalElement,
  O as default
};
//# sourceMappingURL=destination-picker-modal.element-DLnGBZQB.js.map
