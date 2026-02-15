import "./up-doc-pdf-thumbnail.element-N7K7a6d1.js";
import { html as d, css as w, state as f, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as z } from "@umbraco-cms/backoffice/modal";
import { UmbTextStyles as A } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as D } from "@umbraco-cms/backoffice/auth";
var E = Object.defineProperty, U = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, _ = (e, t, s, o) => {
  for (var l = o > 1 ? void 0 : o ? U(t, s) : t, u = e.length - 1, h; u >= 0; u--)
    (h = e[u]) && (l = (o ? h(t, s, l) : h(l)) || l);
  return o && l && E(t, s, l), l;
}, g = (e, t, s) => t.has(e) || m("Cannot " + s), i = (e, t, s) => (g(e, t, "read from private field"), s ? s.call(e) : t.get(e)), M = (e, t, s) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), n = (e, t, s) => (g(e, t, "access private method"), s), a, c, p, v, b, y, $, P, S, k, C;
let r = class extends z {
  constructor() {
    super(...arguments), M(this, a), this._selected = /* @__PURE__ */ new Set(), this._token = "";
  }
  async firstUpdated() {
    const e = await this.getContext(D);
    this._token = await e.getLatestToken();
    const t = this.data?.totalPages ?? 0, s = this.data?.selectedPages;
    s && s.length > 0 ? this._selected = new Set(s) : this._selected = new Set(Array.from({ length: t }, (o, l) => l + 1));
  }
  render() {
    const e = Array.from({ length: i(this, a, c) }, (s, o) => o + 1), t = this._selected.size;
    return d`
			<umb-body-layout headline="Select pages to include">
				<div slot="header" class="toolbar">
					<span class="selection-count">${t} of ${i(this, a, c)} pages selected</span>
					<span class="toolbar-spacer"></span>
					${i(this, a, p) ? d`<uui-button look="outline" compact label="Deselect all" @click=${n(this, a, P)}>Deselect all</uui-button>` : d`<uui-button look="outline" compact label="Select all" @click=${n(this, a, $)}>Select all</uui-button>`}
				</div>

				<div class="page-grid">
					${e.map((s) => n(this, a, C).call(this, s))}
				</div>

				<div slot="actions">
					<uui-button label="Cancel" @click=${n(this, a, k)}>Cancel</uui-button>
					<uui-button
						look="primary"
						color="positive"
						label="Confirm"
						@click=${n(this, a, S)}
						?disabled=${i(this, a, v)}>
						${i(this, a, p) ? "Include all pages" : `Include ${t} page${t !== 1 ? "s" : ""}`}
					</uui-button>
				</div>
			</umb-body-layout>
		`;
  }
};
a = /* @__PURE__ */ new WeakSet();
c = function() {
  return this.data?.totalPages ?? 0;
};
p = function() {
  return this._selected.size === i(this, a, c);
};
v = function() {
  return this._selected.size === 0;
};
b = function(e) {
  const t = new Set(this._selected);
  t.add(e), this._selected = t;
};
y = function(e) {
  const t = new Set(this._selected);
  t.delete(e), this._selected = t;
};
$ = function() {
  this._selected = new Set(Array.from({ length: i(this, a, c) }, (e, t) => t + 1));
};
P = function() {
  this._selected = /* @__PURE__ */ new Set();
};
S = function() {
  const e = [...this._selected].sort((t, s) => t - s);
  this.value = {
    selectedPages: e.length === i(this, a, c) ? null : e
  }, this.modalContext?.submit();
};
k = function() {
  this.modalContext?.reject();
};
C = function(e) {
  const t = this._selected.has(e);
  return d`
			<uui-card-media
				name="Page ${e}"
				selectable
				select-only
				?selected=${t}
				@selected=${() => n(this, a, b).call(this, e)}
				@deselected=${() => n(this, a, y).call(this, e)}>
				<up-doc-pdf-thumbnail
					mediaKey=${this.data?.mediaKey ?? ""}
					page=${e}
					width=${200}
					token=${this._token}>
				</up-doc-pdf-thumbnail>
			</uui-card-media>
		`;
};
r.styles = [
  A,
  w`
			:host {
				display: block;
				height: 100%;
			}

			.toolbar {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-5);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.toolbar-spacer {
				flex: 1;
			}

			.selection-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.page-grid {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-5);
			}
		`
];
_([
  f()
], r.prototype, "_selected", 2);
_([
  f()
], r.prototype, "_token", 2);
r = _([
  x("up-doc-page-picker-modal")
], r);
const W = r;
export {
  r as UpDocPagePickerModalElement,
  W as default
};
//# sourceMappingURL=page-picker-modal.element-Frt23MRc.js.map
