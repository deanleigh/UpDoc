import { css as y, property as l, state as p, customElement as w, html as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
import { _ as k, a as b } from "./pdf-CwFtZUSJ.js";
var P = Object.defineProperty, D = Object.getOwnPropertyDescriptor, _ = (e) => {
  throw TypeError(e);
}, n = (e, t, a, o) => {
  for (var r = o > 1 ? void 0 : o ? D(t, a) : t, s = e.length - 1, d; s >= 0; s--)
    (d = e[s]) && (r = (o ? d(t, a, r) : d(r)) || r);
  return o && r && P(t, a, r), r;
}, T = (e, t, a) => t.has(e) || _("Cannot " + a), C = (e, t, a) => t.has(e) ? _("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), f = (e, t, a) => (T(e, t, "access private method"), a), h, g, m;
k.workerSrc = "/App_Plugins/UpDoc/dist/pdf.worker.min.mjs";
const u = /* @__PURE__ */ new Map();
let i = class extends v {
  constructor() {
    super(...arguments), C(this, h), this.mediaKey = "", this.page = 1, this.width = 300, this.token = "", this._loading = !0, this._error = "", this._imageUrl = "", this._currentRenderTask = null, this._rendering = !1;
  }
  updated(e) {
    super.updated(e), (e.has("mediaKey") || e.has("page") || e.has("token")) && f(this, h, g).call(this);
  }
  render() {
    return this._error ? c`<div class="error"><umb-icon name="icon-alert"></umb-icon> ${this._error}</div>` : this._loading ? c`<uui-loader-bar></uui-loader-bar>` : c`<img src=${this._imageUrl} alt="PDF page ${this.page}" />`;
  }
};
h = /* @__PURE__ */ new WeakSet();
g = async function() {
  if (!(!this.mediaKey || !this.token) && (this._currentRenderTask && (this._currentRenderTask.cancel(), this._currentRenderTask = null), !this._rendering)) {
    this._rendering = !0, this._loading = !0, this._error = "";
    try {
      const e = await f(this, h, m).call(this);
      if (!e) {
        this._rendering = !1;
        return;
      }
      if (this.page < 1 || this.page > e.numPages) {
        this._error = `Page ${this.page} out of range (1-${e.numPages})`, this._loading = !1, this._rendering = !1;
        return;
      }
      const t = await e.getPage(this.page), a = t.getViewport({ scale: 1 }), o = this.width / a.width, r = t.getViewport({ scale: o }), s = document.createElement("canvas");
      s.width = r.width, s.height = r.height;
      const d = s.getContext("2d");
      if (!d) {
        this._rendering = !1;
        return;
      }
      this._currentRenderTask = t.render({ canvasContext: d, viewport: r }), await this._currentRenderTask.promise, this._currentRenderTask = null, this._imageUrl = s.toDataURL("image/png");
    } catch (e) {
      e instanceof Error && e.message?.includes("cancelled") || (this._error = "Failed to render PDF page", console.error("PDF thumbnail render error:", e));
    } finally {
      this._loading = !1, this._rendering = !1;
    }
  }
};
m = async function() {
  const e = u.get(this.mediaKey);
  if (e) return e;
  try {
    const t = await fetch(
      `/umbraco/management/api/v1/updoc/workflows/media-pdf?mediaKey=${this.mediaKey}`,
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    if (!t.ok)
      return this._error = "Could not load PDF", null;
    const a = await t.arrayBuffer(), r = await b({ data: a }).promise;
    return u.set(this.mediaKey, r), r;
  } catch {
    return this._error = "Could not load PDF", null;
  }
};
i.styles = [
  y`
			:host {
				display: block;
			}

			img {
				display: block;
				width: 100%;
				height: auto;
				border-radius: var(--uui-border-radius);
			}

			.error {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				color: var(--uui-color-danger);
				font-size: var(--uui-type-small-size);
			}
		`
];
n([
  l({ type: String })
], i.prototype, "mediaKey", 2);
n([
  l({ type: Number })
], i.prototype, "page", 2);
n([
  l({ type: Number })
], i.prototype, "width", 2);
n([
  l({ type: String })
], i.prototype, "token", 2);
n([
  p()
], i.prototype, "_loading", 2);
n([
  p()
], i.prototype, "_error", 2);
n([
  p()
], i.prototype, "_imageUrl", 2);
i = n([
  w("up-doc-pdf-thumbnail")
], i);
//# sourceMappingURL=up-doc-pdf-thumbnail.element-N7K7a6d1.js.map
