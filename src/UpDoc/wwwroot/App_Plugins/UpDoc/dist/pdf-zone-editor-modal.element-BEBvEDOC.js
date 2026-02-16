import { c as W } from "./workflow.service-vjpy4ykG.js";
import { html as f, nothing as D, css as B, state as p, customElement as q } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as G } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as X } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as V } from "@umbraco-cms/backoffice/auth";
import { _ as Y, a as j } from "./pdf-CwFtZUSJ.js";
var J = Object.defineProperty, K = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, d = (e, t, s, o) => {
  for (var n = o > 1 ? void 0 : o ? K(t, s) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (n = (o ? l(t, s, n) : l(n)) || n);
  return o && n && J(t, s, n), n;
}, I = (e, t, s) => t.has(e) || C("Cannot " + s), m = (e, t, s) => (I(e, t, "read from private field"), s ? s.call(e) : t.get(e)), Q = (e, t, s) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), a = (e, t, s) => (I(e, t, "access private method"), s), i, R, T, x, g, S, h, z, $, M, E, F, O, w, H, L, k, N, A, U, P, b, Z;
Y.workerSrc = "/App_Plugins/UpDoc/dist/pdf.worker.min.mjs";
const y = [
  "#e84855",
  "#f9dc5c",
  "#3185fc",
  "#5bba6f",
  "#e56399",
  "#8338ec",
  "#ff6d00",
  "#06d6a0",
  "#118ab2",
  "#ef476f"
];
let c = class extends X {
  constructor() {
    super(...arguments), Q(this, i), this._pdfDoc = null, this._currentPage = 1, this._totalPages = 0, this._scale = 1, this._loading = !0, this._error = "", this._zones = [], this._selectedZoneId = null, this._mode = "draw", this._pageWidth = 0, this._pageHeight = 0, this._isDrawing = !1, this._drawStart = { x: 0, y: 0 }, this._drawCurrent = { x: 0, y: 0 }, this._isDragging = !1, this._isResizing = !1, this._resizeHandle = "", this._dragStart = { x: 0, y: 0 }, this._dragZoneStart = { x: 0, y: 0, w: 0, h: 0 }, this._canvas = null, this._overlay = null, this._nextId = 1;
  }
  async firstUpdated() {
    await a(this, i, T).call(this);
  }
  render() {
    return this._loading ? f`
				<umb-body-layout headline="Define Areas">
					<div class="loading">
						<uui-loader></uui-loader>
						<span>Loading PDF...</span>
					</div>
				</umb-body-layout>
			` : this._error ? f`
				<umb-body-layout headline="Define Areas">
					<div class="error">${this._error}</div>
					<uui-button slot="actions" label="Close" @click=${a(this, i, P)}></uui-button>
				</umb-body-layout>
			` : f`
			<umb-body-layout headline="Define Areas">
				<div class="editor-layout">
					<!-- Left: PDF + canvas -->
					<div class="pdf-panel">
						<div class="toolbar">
							<div class="toolbar-group">
								<uui-button
									compact
									look=${this._mode === "draw" ? "primary" : "secondary"}
									label="Draw"
									@click=${() => {
      this._mode = "draw";
    }}>
									Draw
								</uui-button>
								<uui-button
									compact
									look=${this._mode === "select" ? "primary" : "secondary"}
									label="Select"
									@click=${() => {
      this._mode = "select";
    }}>
									Select
								</uui-button>
							</div>

							<div class="toolbar-group">
								<uui-button compact label="Previous page" ?disabled=${this._currentPage <= 1}
									@click=${() => a(this, i, w).call(this, this._currentPage - 1)}>
									&laquo;
								</uui-button>
								<span class="page-info">Page ${this._currentPage} / ${this._totalPages}</span>
								<uui-button compact label="Next page" ?disabled=${this._currentPage >= this._totalPages}
									@click=${() => a(this, i, w).call(this, this._currentPage + 1)}>
									&raquo;
								</uui-button>
							</div>

							<div class="toolbar-group">
								<uui-button compact label="Zoom out" @click=${a(this, i, L)}>&minus;</uui-button>
								<span class="zoom-info">${Math.round(this._scale * 100)}%</span>
								<uui-button compact label="Zoom in" @click=${a(this, i, H)}>+</uui-button>
							</div>
						</div>

						<div class="canvas-container">
							<canvas id="pdf-canvas"></canvas>
							<canvas id="overlay-canvas"
								@mousedown=${a(this, i, E)}
								@mousemove=${a(this, i, F)}
								@mouseup=${a(this, i, O)}
								style="cursor: ${this._mode === "draw" ? "crosshair" : "default"}">
							</canvas>
						</div>
					</div>

					<!-- Right: Zone list + edit -->
					<div class="zone-panel">
						<uui-box headline="Zones on this page">
							${m(this, i, Z).length === 0 ? f`<p class="empty-hint">Draw a zone on the PDF to get started.</p>` : m(this, i, Z).map((e) => f`
									<div class="zone-item ${e.id === this._selectedZoneId ? "selected" : ""}"
										@click=${() => a(this, i, k).call(this, e.id)}>
										<span class="zone-color" style="background: ${e.color}"></span>
										<span class="zone-name">${e.name || "Unnamed"}</span>
										<uui-button compact look="secondary" label="Delete"
											@click=${(t) => {
      t.stopPropagation(), a(this, i, N).call(this, e.id);
    }}>
											<uui-icon name="icon-trash"></uui-icon>
										</uui-button>
									</div>
								`)}
						</uui-box>

						${m(this, i, b) ? f`
							<uui-box headline="Edit Zone" style="margin-top: var(--uui-size-space-4)">
								<div class="edit-form">
									<label>Name</label>
									<uui-input
										.value=${m(this, i, b).name}
										@change=${(e) => {
      a(this, i, A).call(this, this._selectedZoneId, e.target.value);
    }}>
									</uui-input>

									<label>Color</label>
									<div class="color-swatches">
										${y.map((e) => f`
											<button
												class="color-swatch ${e === m(this, i, b).color ? "active" : ""}"
												style="background: ${e}"
												@click=${() => {
      const t = this._zones.find((s) => s.id === this._selectedZoneId);
      t && (t.color = e, this._zones = [...this._zones], a(this, i, h).call(this));
    }}>
											</button>
										`)}
									</div>
								</div>
							</uui-box>
						` : D}

						${this._zones.length > 0 && this._zones.some((e) => e.page !== this._currentPage) ? f`
							<uui-box headline="All zones" style="margin-top: var(--uui-size-space-4)">
								${this._zones.map((e) => f`
									<div class="zone-item ${e.id === this._selectedZoneId ? "selected" : ""}"
										@click=${() => a(this, i, k).call(this, e.id)}>
										<span class="zone-color" style="background: ${e.color}"></span>
										<span class="zone-name">${e.name || "Unnamed"}</span>
										<span class="zone-page">p${e.page}</span>
									</div>
								`)}
							</uui-box>
						` : D}
					</div>
				</div>

				<uui-button
					slot="actions"
					look="primary"
					color="positive"
					label="Save"
					?disabled=${this._zones.length === 0}
					@click=${a(this, i, U)}>
					Save
				</uui-button>
				<uui-button
					slot="actions"
					label="Cancel"
					@click=${a(this, i, P)}>
					Cancel
				</uui-button>
			</umb-body-layout>
		`;
  }
};
i = /* @__PURE__ */ new WeakSet();
R = async function() {
  return (await this.getContext(V)).getLatestToken();
};
T = async function() {
  const e = this.data?.workflowName;
  if (!e) {
    this._error = "No workflow name provided.", this._loading = !1;
    return;
  }
  try {
    const t = await a(this, i, R).call(this), s = await W(e, t);
    if (!s) {
      this._error = "Could not load PDF file.", this._loading = !1;
      return;
    }
    const o = await s.arrayBuffer(), n = j({ data: o });
    this._pdfDoc = await n.promise, this._totalPages = this._pdfDoc.numPages, this.data?.existingTemplate?.zones?.length && (this._zones = this.data.existingTemplate.zones.map((r, l) => ({
      id: `zone-${l + 1}`,
      name: r.name,
      property: r.property,
      page: r.page,
      type: r.type,
      x: r.bounds.x,
      y: r.bounds.y,
      w: r.bounds.width,
      h: r.bounds.height,
      color: r.color || y[l % y.length],
      headingFont: r.headingFont,
      expectedSections: r.expectedSections,
      notes: r.notes
    })), this._nextId = this._zones.length + 1), this._loading = !1, await this.updateComplete, await a(this, i, x).call(this);
  } catch (t) {
    this._error = `Failed to load PDF: ${t}`, this._loading = !1;
  }
};
x = async function() {
  if (!this._pdfDoc) return;
  const e = await this._pdfDoc.getPage(this._currentPage), t = e.getViewport({ scale: this._scale });
  if (this._pageWidth = t.width, this._pageHeight = t.height, this._canvas = this.renderRoot.querySelector("#pdf-canvas"), this._overlay = this.renderRoot.querySelector("#overlay-canvas"), !this._canvas || !this._overlay) return;
  this._canvas.width = t.width, this._canvas.height = t.height, this._overlay.width = t.width, this._overlay.height = t.height;
  const s = this._canvas.getContext("2d");
  await e.render({ canvasContext: s, viewport: t }).promise, a(this, i, h).call(this);
};
g = function(e, t) {
  const s = e * this._scale, o = (this._pageHeight / this._scale - t) * this._scale;
  return { cx: s, cy: o };
};
S = function(e, t) {
  const s = e / this._scale, o = this._pageHeight / this._scale - t / this._scale;
  return { px: s, py: o };
};
h = function() {
  if (!this._overlay) return;
  const e = this._overlay.getContext("2d");
  e.clearRect(0, 0, this._overlay.width, this._overlay.height);
  for (const t of this._zones) {
    if (t.page !== this._currentPage) continue;
    const s = a(this, i, g).call(this, t.x, t.y + t.h), o = a(this, i, g).call(this, t.x + t.w, t.y), n = o.cx - s.cx, r = o.cy - s.cy;
    if (e.fillStyle = t.color + "30", e.fillRect(s.cx, s.cy, n, r), e.strokeStyle = t.color, e.lineWidth = t.id === this._selectedZoneId ? 3 : 2, e.strokeRect(s.cx, s.cy, n, r), e.fillStyle = t.color, e.font = "bold 12px sans-serif", e.fillText(t.name || "Unnamed", s.cx + 4, s.cy + 14), t.id === this._selectedZoneId) {
      const u = [
        { x: s.cx, y: s.cy },
        // top-left
        { x: s.cx + n, y: s.cy },
        // top-right
        { x: s.cx, y: s.cy + r },
        // bottom-left
        { x: s.cx + n, y: s.cy + r }
        // bottom-right
      ];
      e.fillStyle = t.color;
      for (const _ of u)
        e.fillRect(_.x - 8 / 2, _.y - 8 / 2, 8, 8);
    }
  }
  if (this._isDrawing) {
    const t = Math.min(this._drawStart.x, this._drawCurrent.x), s = Math.min(this._drawStart.y, this._drawCurrent.y), o = Math.abs(this._drawCurrent.x - this._drawStart.x), n = Math.abs(this._drawCurrent.y - this._drawStart.y);
    e.strokeStyle = y[this._zones.length % y.length], e.lineWidth = 2, e.setLineDash([5, 5]), e.strokeRect(t, s, o, n), e.setLineDash([]);
  }
};
z = function(e) {
  if (!this._overlay) return { x: 0, y: 0 };
  const t = this._overlay.getBoundingClientRect();
  return { x: e.clientX - t.left, y: e.clientY - t.top };
};
$ = function(e, t) {
  for (const s of this._zones) {
    if (s.page !== this._currentPage) continue;
    const o = a(this, i, g).call(this, s.x, s.y + s.h), n = a(this, i, g).call(this, s.x + s.w, s.y);
    if (e >= o.cx && e <= n.cx && t >= o.cy && t <= n.cy)
      return s;
  }
  return null;
};
M = function(e, t, s) {
  const o = a(this, i, g).call(this, e.x, e.y + e.h), n = a(this, i, g).call(this, e.x + e.w, e.y), r = 10, l = Math.abs(t - o.cx) < r, u = Math.abs(t - n.cx) < r, _ = Math.abs(s - o.cy) < r, v = Math.abs(s - n.cy) < r;
  return _ && l ? "tl" : _ && u ? "tr" : v && l ? "bl" : v && u ? "br" : "";
};
E = function(e) {
  const t = a(this, i, z).call(this, e);
  if (this._mode === "draw") {
    this._isDrawing = !0, this._drawStart = t, this._drawCurrent = t;
    return;
  }
  const s = a(this, i, $).call(this, t.x, t.y);
  if (s) {
    this._selectedZoneId = s.id, a(this, i, h).call(this);
    const o = a(this, i, M).call(this, s, t.x, t.y);
    o ? (this._isResizing = !0, this._resizeHandle = o, this._dragStart = t, this._dragZoneStart = { x: s.x, y: s.y, w: s.w, h: s.h }) : (this._isDragging = !0, this._dragStart = t, this._dragZoneStart = { x: s.x, y: s.y, w: s.w, h: s.h });
  } else
    this._selectedZoneId = null, a(this, i, h).call(this);
};
F = function(e) {
  const t = a(this, i, z).call(this, e);
  if (this._isDrawing) {
    this._drawCurrent = t, a(this, i, h).call(this);
    return;
  }
  if (this._isDragging && this._selectedZoneId) {
    const s = this._zones.find((r) => r.id === this._selectedZoneId);
    if (!s) return;
    const o = (t.x - this._dragStart.x) / this._scale, n = -(t.y - this._dragStart.y) / this._scale;
    s.x = this._dragZoneStart.x + o, s.y = this._dragZoneStart.y + n, this._zones = [...this._zones], a(this, i, h).call(this);
    return;
  }
  if (this._isResizing && this._selectedZoneId) {
    const s = this._zones.find((v) => v.id === this._selectedZoneId);
    if (!s) return;
    const o = (t.x - this._dragStart.x) / this._scale, n = -(t.y - this._dragStart.y) / this._scale, { x: r, y: l, w: u, h: _ } = this._dragZoneStart;
    switch (this._resizeHandle) {
      case "br":
        s.w = Math.max(20, u + o), s.y = l + n, s.h = Math.max(20, _ - n);
        break;
      case "bl":
        s.x = r + o, s.w = Math.max(20, u - o), s.y = l + n, s.h = Math.max(20, _ - n);
        break;
      case "tr":
        s.w = Math.max(20, u + o), s.h = Math.max(20, _ + n);
        break;
      case "tl":
        s.x = r + o, s.w = Math.max(20, u - o), s.h = Math.max(20, _ + n);
        break;
    }
    this._zones = [...this._zones], a(this, i, h).call(this);
    return;
  }
  if (this._mode === "select" && this._overlay) {
    const s = a(this, i, $).call(this, t.x, t.y);
    if (s && this._selectedZoneId === s.id) {
      const o = a(this, i, M).call(this, s, t.x, t.y);
      o === "tl" || o === "br" ? this._overlay.style.cursor = "nwse-resize" : o === "tr" || o === "bl" ? this._overlay.style.cursor = "nesw-resize" : this._overlay.style.cursor = "move";
    } else s ? this._overlay.style.cursor = "pointer" : this._overlay.style.cursor = "default";
  }
};
O = function(e) {
  if (this._isDrawing) {
    this._isDrawing = !1;
    const t = a(this, i, z).call(this, e), s = Math.abs(t.x - this._drawStart.x), o = Math.abs(t.y - this._drawStart.y);
    if (s > 10 && o > 10) {
      const n = a(this, i, S).call(this, Math.min(this._drawStart.x, t.x), Math.min(this._drawStart.y, t.y)), r = a(this, i, S).call(this, Math.max(this._drawStart.x, t.x), Math.max(this._drawStart.y, t.y)), l = {
        id: `zone-${this._nextId++}`,
        name: `Zone ${this._zones.filter((u) => u.page === this._currentPage).length + 1}`,
        property: "",
        page: this._currentPage,
        type: "",
        x: n.px,
        y: r.py,
        w: r.px - n.px,
        h: n.py - r.py,
        color: y[this._zones.length % y.length],
        headingFont: "",
        expectedSections: [],
        notes: ""
      };
      this._zones = [...this._zones, l], this._selectedZoneId = l.id, this._mode = "select";
    }
    a(this, i, h).call(this);
    return;
  }
  this._isDragging = !1, this._isResizing = !1;
};
w = async function(e) {
  e < 1 || e > this._totalPages || (this._currentPage = e, this._selectedZoneId = null, await this.updateComplete, await a(this, i, x).call(this));
};
H = function() {
  this._scale = Math.min(3, this._scale + 0.25), a(this, i, x).call(this);
};
L = function() {
  this._scale = Math.max(0.5, this._scale - 0.25), a(this, i, x).call(this);
};
k = function(e) {
  this._selectedZoneId = e, this._mode = "select";
  const t = this._zones.find((s) => s.id === e);
  t && t.page !== this._currentPage ? a(this, i, w).call(this, t.page) : a(this, i, h).call(this);
};
N = function(e) {
  this._zones = this._zones.filter((t) => t.id !== e), this._selectedZoneId === e && (this._selectedZoneId = null), a(this, i, h).call(this);
};
A = function(e, t) {
  const s = this._zones.find((o) => o.id === e);
  s && (s.name = t, this._zones = [...this._zones], a(this, i, h).call(this));
};
U = function() {
  const e = {
    templateName: this.data?.existingTemplate?.templateName || this.data?.workflowName || "Zone Template",
    sourceFile: this.data?.existingTemplate?.sourceFile || "",
    pageSize: {
      width: this._pageWidth / this._scale,
      height: this._pageHeight / this._scale
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    zones: this._zones.map((t) => ({
      name: t.name,
      property: t.property,
      page: t.page,
      type: t.type,
      bounds: {
        x: Math.round(t.x * 10) / 10,
        y: Math.round(t.y * 10) / 10,
        width: Math.round(t.w * 10) / 10,
        height: Math.round(t.h * 10) / 10
      },
      color: t.color,
      headingFont: t.headingFont,
      expectedSections: t.expectedSections,
      notes: t.notes
    }))
  };
  this.value = { template: e }, this._submitModal();
};
P = function() {
  this._rejectModal();
};
b = function() {
  return this._zones.find((e) => e.id === this._selectedZoneId) ?? null;
};
Z = function() {
  return this._zones.filter((e) => e.page === this._currentPage);
};
c.styles = [
  G,
  B`
			:host {
				display: block;
				height: 100%;
			}

			.loading {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-6);
			}

			.error {
				padding: var(--uui-size-space-4);
				color: var(--uui-color-danger);
			}

			.editor-layout {
				display: flex;
				gap: var(--uui-size-space-4);
				height: 100%;
				min-height: 0;
			}

			.pdf-panel {
				flex: 1;
				display: flex;
				flex-direction: column;
				min-width: 0;
			}

			.toolbar {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-4);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
				flex-shrink: 0;
			}

			.toolbar-group {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.page-info, .zoom-info {
				font-size: var(--uui-type-small-size);
				white-space: nowrap;
			}

			.canvas-container {
				flex: 1;
				overflow: auto;
				position: relative;
				background: var(--uui-color-surface-alt);
			}

			.canvas-container canvas {
				display: block;
			}

			#overlay-canvas {
				position: absolute;
				top: 0;
				left: 0;
			}

			.zone-panel {
				width: 300px;
				flex-shrink: 0;
				overflow-y: auto;
				padding-right: var(--uui-size-space-2);
			}

			.zone-item {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
				border-radius: var(--uui-border-radius);
				border: 1px solid transparent;
			}

			.zone-item:hover {
				background: var(--uui-color-surface-alt);
			}

			.zone-item.selected {
				background: var(--uui-color-selected);
				border-color: var(--uui-color-selected-emphasis);
			}

			.zone-color {
				width: 14px;
				height: 14px;
				border-radius: 3px;
				flex-shrink: 0;
			}

			.zone-name {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.zone-page {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.empty-hint {
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
				text-align: center;
				padding: var(--uui-size-space-4);
			}

			.edit-form {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}

			.edit-form label {
				font-size: var(--uui-type-small-size);
				font-weight: bold;
			}

			.color-swatches {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
			}

			.color-swatch {
				width: 24px;
				height: 24px;
				border-radius: 4px;
				border: 2px solid transparent;
				cursor: pointer;
				padding: 0;
			}

			.color-swatch:hover {
				opacity: 0.8;
			}

			.color-swatch.active {
				border-color: var(--uui-color-text);
				box-shadow: 0 0 0 2px var(--uui-color-surface);
			}
		`
];
d([
  p()
], c.prototype, "_pdfDoc", 2);
d([
  p()
], c.prototype, "_currentPage", 2);
d([
  p()
], c.prototype, "_totalPages", 2);
d([
  p()
], c.prototype, "_scale", 2);
d([
  p()
], c.prototype, "_loading", 2);
d([
  p()
], c.prototype, "_error", 2);
d([
  p()
], c.prototype, "_zones", 2);
d([
  p()
], c.prototype, "_selectedZoneId", 2);
d([
  p()
], c.prototype, "_mode", 2);
d([
  p()
], c.prototype, "_pageWidth", 2);
d([
  p()
], c.prototype, "_pageHeight", 2);
c = d([
  q("pdf-zone-editor-modal")
], c);
const nt = c;
export {
  c as PdfZoneEditorModalElement,
  nt as default
};
//# sourceMappingURL=pdf-zone-editor-modal.element-BEBvEDOC.js.map
