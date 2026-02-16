import { c as W } from "./workflow.service-vjpy4ykG.js";
import { html as f, nothing as z, css as B, state as p, customElement as q } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as G } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as X } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as j } from "@umbraco-cms/backoffice/auth";
import { _ as V, a as Y } from "./pdf-CwFtZUSJ.js";
var J = Object.defineProperty, K = Object.getOwnPropertyDescriptor, D = (s) => {
  throw TypeError(s);
}, u = (s, t, e, o) => {
  for (var n = o > 1 ? void 0 : o ? K(t, e) : t, l = s.length - 1, r; l >= 0; l--)
    (r = s[l]) && (n = (o ? r(t, e, n) : r(n)) || n);
  return o && n && J(t, e, n), n;
}, C = (s, t, e) => t.has(s) || D("Cannot " + e), v = (s, t, e) => (C(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Q = (s, t, e) => t.has(s) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), a = (s, t, e) => (C(s, t, "access private method"), e), i, I, R, m, g, S, d, w, Z, $, T, A, E, M, F, O, H, L, N, U, P, b, k;
V.workerSrc = "/App_Plugins/UpDoc/dist/pdf.worker.min.mjs";
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
let h = class extends X {
  constructor() {
    super(...arguments), Q(this, i), this._pdfDoc = null, this._currentPage = 1, this._totalPages = 0, this._availablePages = [], this._scale = 1, this._loading = !0, this._error = "", this._zones = [], this._selectedZoneId = null, this._mode = "draw", this._pageWidth = 0, this._pageHeight = 0, this._isDrawing = !1, this._drawStart = { x: 0, y: 0 }, this._drawCurrent = { x: 0, y: 0 }, this._isDragging = !1, this._isResizing = !1, this._resizeHandle = "", this._dragStart = { x: 0, y: 0 }, this._dragZoneStart = { x: 0, y: 0, w: 0, h: 0 }, this._canvas = null, this._overlay = null, this._nextId = 1;
  }
  async firstUpdated() {
    await a(this, i, R).call(this);
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
								<uui-button compact label="Zoom out" @click=${a(this, i, O)}>&minus;</uui-button>
								<span class="zoom-info">${Math.round(this._scale * 100)}%</span>
								<uui-button compact label="Zoom in" @click=${a(this, i, F)}>+</uui-button>
							</div>
						</div>

						<div class="canvas-container">
							<canvas id="pdf-canvas"></canvas>
							<canvas id="overlay-canvas"
								@mousedown=${a(this, i, T)}
								@mousemove=${a(this, i, A)}
								@mouseup=${a(this, i, E)}
								style="cursor: ${this._mode === "draw" ? "crosshair" : "default"}">
							</canvas>
						</div>
					</div>

					<!-- Right: Pages + Areas -->
					<div class="zone-panel">
						${this._availablePages.length > 1 ? f`
							<uui-box headline="Pages">
								${this._availablePages.map((s) => {
      const t = this._zones.filter((o) => o.page === s).length, e = s === this._currentPage;
      return f`
										<div class="page-item ${e ? "active" : ""}"
											@click=${() => a(this, i, M).call(this, s)}>
											<span class="page-item-label">Page ${s}</span>
											${t > 0 ? f`
												<span class="page-item-count">${t} area${t !== 1 ? "s" : ""}</span>
											` : z}
										</div>
									`;
    })}
							</uui-box>
						` : z}

						<uui-box headline="Areas on this page" style="${this._availablePages.length > 1 ? "margin-top: var(--uui-size-space-4)" : ""}">
							${v(this, i, k).length === 0 ? f`<p class="empty-hint">Draw an area on the PDF to get started.</p>` : v(this, i, k).map((s) => f`
									<div class="zone-item ${s.id === this._selectedZoneId ? "selected" : ""}"
										@click=${() => a(this, i, H).call(this, s.id)}>
										<span class="zone-color" style="background: ${s.color}"></span>
										<span class="zone-name">${s.name || "Unnamed"}</span>
										<uui-button compact look="secondary" label="Delete"
											@click=${(t) => {
      t.stopPropagation(), a(this, i, L).call(this, s.id);
    }}>
											<uui-icon name="icon-trash"></uui-icon>
										</uui-button>
									</div>
								`)}
						</uui-box>

						${v(this, i, b) ? f`
							<uui-box headline="Edit Area" style="margin-top: var(--uui-size-space-4)">
								<div class="edit-form">
									<label>Name</label>
									<uui-input
										.value=${v(this, i, b).name}
										@change=${(s) => {
      a(this, i, N).call(this, this._selectedZoneId, s.target.value);
    }}>
									</uui-input>

									<label>Color</label>
									<div class="color-swatches">
										${y.map((s) => f`
											<button
												class="color-swatch ${s === v(this, i, b).color ? "active" : ""}"
												style="background: ${s}"
												@click=${() => {
      const t = this._zones.find((e) => e.id === this._selectedZoneId);
      t && (t.color = s, this._zones = [...this._zones], a(this, i, d).call(this));
    }}>
											</button>
										`)}
									</div>
								</div>
							</uui-box>
						` : z}
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
I = async function() {
  return (await this.getContext(j)).getLatestToken();
};
R = async function() {
  const s = this.data?.workflowName;
  if (!s) {
    this._error = "No workflow name provided.", this._loading = !1;
    return;
  }
  try {
    const t = await a(this, i, I).call(this), e = await W(s, t);
    if (!e) {
      this._error = "Could not load PDF file.", this._loading = !1;
      return;
    }
    const o = await e.arrayBuffer(), n = Y({ data: o });
    this._pdfDoc = await n.promise, this._totalPages = this._pdfDoc.numPages;
    const l = this.data?.selectedPages;
    l && l.length > 0 ? this._availablePages = l.filter((r) => r >= 1 && r <= this._totalPages).sort((r, c) => r - c) : this._availablePages = Array.from({ length: this._totalPages }, (r, c) => c + 1), this._currentPage = this._availablePages[0] ?? 1, this.data?.existingTemplate?.zones?.length && (this._zones = this.data.existingTemplate.zones.map((r, c) => ({
      id: `zone-${c + 1}`,
      name: r.name,
      property: r.property,
      page: r.page,
      type: r.type,
      x: r.bounds.x,
      y: r.bounds.y,
      w: r.bounds.width,
      h: r.bounds.height,
      color: r.color || y[c % y.length],
      headingFont: r.headingFont,
      expectedSections: r.expectedSections,
      notes: r.notes
    })), this._nextId = this._zones.length + 1), this._loading = !1, await this.updateComplete, await a(this, i, m).call(this);
  } catch (t) {
    this._error = `Failed to load PDF: ${t}`, this._loading = !1;
  }
};
m = async function() {
  if (!this._pdfDoc) return;
  const s = await this._pdfDoc.getPage(this._currentPage), t = s.getViewport({ scale: this._scale });
  if (this._pageWidth = t.width, this._pageHeight = t.height, this._canvas = this.renderRoot.querySelector("#pdf-canvas"), this._overlay = this.renderRoot.querySelector("#overlay-canvas"), !this._canvas || !this._overlay) return;
  this._canvas.width = t.width, this._canvas.height = t.height, this._overlay.width = t.width, this._overlay.height = t.height;
  const e = this._canvas.getContext("2d");
  await s.render({ canvasContext: e, viewport: t }).promise, a(this, i, d).call(this);
};
g = function(s, t) {
  const e = s * this._scale, o = (this._pageHeight / this._scale - t) * this._scale;
  return { cx: e, cy: o };
};
S = function(s, t) {
  const e = s / this._scale, o = this._pageHeight / this._scale - t / this._scale;
  return { px: e, py: o };
};
d = function() {
  if (!this._overlay) return;
  const s = this._overlay.getContext("2d");
  s.clearRect(0, 0, this._overlay.width, this._overlay.height);
  for (const t of this._zones) {
    if (t.page !== this._currentPage) continue;
    const e = a(this, i, g).call(this, t.x, t.y + t.h), o = a(this, i, g).call(this, t.x + t.w, t.y), n = o.cx - e.cx, l = o.cy - e.cy;
    if (s.fillStyle = t.color + "30", s.fillRect(e.cx, e.cy, n, l), s.strokeStyle = t.color, s.lineWidth = t.id === this._selectedZoneId ? 3 : 2, s.strokeRect(e.cx, e.cy, n, l), s.fillStyle = t.color, s.font = "bold 12px sans-serif", s.fillText(t.name || "Unnamed", e.cx + 4, e.cy + 14), t.id === this._selectedZoneId) {
      const c = [
        { x: e.cx, y: e.cy },
        // top-left
        { x: e.cx + n, y: e.cy },
        // top-right
        { x: e.cx, y: e.cy + l },
        // bottom-left
        { x: e.cx + n, y: e.cy + l }
        // bottom-right
      ];
      s.fillStyle = t.color;
      for (const _ of c)
        s.fillRect(_.x - 8 / 2, _.y - 8 / 2, 8, 8);
    }
  }
  if (this._isDrawing) {
    const t = Math.min(this._drawStart.x, this._drawCurrent.x), e = Math.min(this._drawStart.y, this._drawCurrent.y), o = Math.abs(this._drawCurrent.x - this._drawStart.x), n = Math.abs(this._drawCurrent.y - this._drawStart.y);
    s.strokeStyle = y[this._zones.length % y.length], s.lineWidth = 2, s.setLineDash([5, 5]), s.strokeRect(t, e, o, n), s.setLineDash([]);
  }
};
w = function(s) {
  if (!this._overlay) return { x: 0, y: 0 };
  const t = this._overlay.getBoundingClientRect();
  return { x: s.clientX - t.left, y: s.clientY - t.top };
};
Z = function(s, t) {
  for (const e of this._zones) {
    if (e.page !== this._currentPage) continue;
    const o = a(this, i, g).call(this, e.x, e.y + e.h), n = a(this, i, g).call(this, e.x + e.w, e.y);
    if (s >= o.cx && s <= n.cx && t >= o.cy && t <= n.cy)
      return e;
  }
  return null;
};
$ = function(s, t, e) {
  const o = a(this, i, g).call(this, s.x, s.y + s.h), n = a(this, i, g).call(this, s.x + s.w, s.y), l = 10, r = Math.abs(t - o.cx) < l, c = Math.abs(t - n.cx) < l, _ = Math.abs(e - o.cy) < l, x = Math.abs(e - n.cy) < l;
  return _ && r ? "tl" : _ && c ? "tr" : x && r ? "bl" : x && c ? "br" : "";
};
T = function(s) {
  const t = a(this, i, w).call(this, s);
  if (this._mode === "draw") {
    this._isDrawing = !0, this._drawStart = t, this._drawCurrent = t;
    return;
  }
  const e = a(this, i, Z).call(this, t.x, t.y);
  if (e) {
    this._selectedZoneId = e.id, a(this, i, d).call(this);
    const o = a(this, i, $).call(this, e, t.x, t.y);
    o ? (this._isResizing = !0, this._resizeHandle = o, this._dragStart = t, this._dragZoneStart = { x: e.x, y: e.y, w: e.w, h: e.h }) : (this._isDragging = !0, this._dragStart = t, this._dragZoneStart = { x: e.x, y: e.y, w: e.w, h: e.h });
  } else
    this._selectedZoneId = null, a(this, i, d).call(this);
};
A = function(s) {
  const t = a(this, i, w).call(this, s);
  if (this._isDrawing) {
    this._drawCurrent = t, a(this, i, d).call(this);
    return;
  }
  if (this._isDragging && this._selectedZoneId) {
    const e = this._zones.find((l) => l.id === this._selectedZoneId);
    if (!e) return;
    const o = (t.x - this._dragStart.x) / this._scale, n = -(t.y - this._dragStart.y) / this._scale;
    e.x = this._dragZoneStart.x + o, e.y = this._dragZoneStart.y + n, this._zones = [...this._zones], a(this, i, d).call(this);
    return;
  }
  if (this._isResizing && this._selectedZoneId) {
    const e = this._zones.find((x) => x.id === this._selectedZoneId);
    if (!e) return;
    const o = (t.x - this._dragStart.x) / this._scale, n = -(t.y - this._dragStart.y) / this._scale, { x: l, y: r, w: c, h: _ } = this._dragZoneStart;
    switch (this._resizeHandle) {
      case "br":
        e.w = Math.max(20, c + o), e.y = r + n, e.h = Math.max(20, _ - n);
        break;
      case "bl":
        e.x = l + o, e.w = Math.max(20, c - o), e.y = r + n, e.h = Math.max(20, _ - n);
        break;
      case "tr":
        e.w = Math.max(20, c + o), e.h = Math.max(20, _ + n);
        break;
      case "tl":
        e.x = l + o, e.w = Math.max(20, c - o), e.h = Math.max(20, _ + n);
        break;
    }
    this._zones = [...this._zones], a(this, i, d).call(this);
    return;
  }
  if (this._mode === "select" && this._overlay) {
    const e = a(this, i, Z).call(this, t.x, t.y);
    if (e && this._selectedZoneId === e.id) {
      const o = a(this, i, $).call(this, e, t.x, t.y);
      o === "tl" || o === "br" ? this._overlay.style.cursor = "nwse-resize" : o === "tr" || o === "bl" ? this._overlay.style.cursor = "nesw-resize" : this._overlay.style.cursor = "move";
    } else e ? this._overlay.style.cursor = "pointer" : this._overlay.style.cursor = "default";
  }
};
E = function(s) {
  if (this._isDrawing) {
    this._isDrawing = !1;
    const t = a(this, i, w).call(this, s), e = Math.abs(t.x - this._drawStart.x), o = Math.abs(t.y - this._drawStart.y);
    if (e > 10 && o > 10) {
      const n = a(this, i, S).call(this, Math.min(this._drawStart.x, t.x), Math.min(this._drawStart.y, t.y)), l = a(this, i, S).call(this, Math.max(this._drawStart.x, t.x), Math.max(this._drawStart.y, t.y)), r = {
        id: `zone-${this._nextId++}`,
        name: `Area ${this._zones.filter((c) => c.page === this._currentPage).length + 1}`,
        property: "",
        page: this._currentPage,
        type: "",
        x: n.px,
        y: l.py,
        w: l.px - n.px,
        h: n.py - l.py,
        color: y[this._zones.length % y.length],
        headingFont: "",
        expectedSections: [],
        notes: ""
      };
      this._zones = [...this._zones, r], this._selectedZoneId = r.id, this._mode = "select";
    }
    a(this, i, d).call(this);
    return;
  }
  this._isDragging = !1, this._isResizing = !1;
};
M = async function(s) {
  this._availablePages.includes(s) && (this._currentPage = s, this._selectedZoneId = null, await this.updateComplete, await a(this, i, m).call(this));
};
F = function() {
  this._scale = Math.min(3, this._scale + 0.25), a(this, i, m).call(this);
};
O = function() {
  this._scale = Math.max(0.5, this._scale - 0.25), a(this, i, m).call(this);
};
H = function(s) {
  this._selectedZoneId = s, this._mode = "select";
  const t = this._zones.find((e) => e.id === s);
  t && t.page !== this._currentPage ? a(this, i, M).call(this, t.page) : a(this, i, d).call(this);
};
L = function(s) {
  this._zones = this._zones.filter((t) => t.id !== s), this._selectedZoneId === s && (this._selectedZoneId = null), a(this, i, d).call(this);
};
N = function(s, t) {
  const e = this._zones.find((o) => o.id === s);
  e && (e.name = t, this._zones = [...this._zones], a(this, i, d).call(this));
};
U = function() {
  const s = {
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
  this.value = { template: s }, this._submitModal();
};
P = function() {
  this._rejectModal();
};
b = function() {
  return this._zones.find((s) => s.id === this._selectedZoneId) ?? null;
};
k = function() {
  return this._zones.filter((s) => s.page === this._currentPage);
};
h.styles = [
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

			.zoom-info {
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

			.page-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				cursor: pointer;
				border-radius: var(--uui-border-radius);
				border: 1px solid transparent;
			}

			.page-item:hover {
				background: var(--uui-color-surface-alt);
			}

			.page-item.active {
				background: var(--uui-color-surface-emphasis);
				border-left: 3px solid var(--uui-color-current);
				font-weight: 600;
			}

			.page-item-label {
				flex: 1;
			}

			.page-item-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
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
u([
  p()
], h.prototype, "_pdfDoc", 2);
u([
  p()
], h.prototype, "_currentPage", 2);
u([
  p()
], h.prototype, "_totalPages", 2);
u([
  p()
], h.prototype, "_scale", 2);
u([
  p()
], h.prototype, "_loading", 2);
u([
  p()
], h.prototype, "_error", 2);
u([
  p()
], h.prototype, "_zones", 2);
u([
  p()
], h.prototype, "_selectedZoneId", 2);
u([
  p()
], h.prototype, "_mode", 2);
u([
  p()
], h.prototype, "_pageWidth", 2);
u([
  p()
], h.prototype, "_pageHeight", 2);
h = u([
  q("pdf-zone-editor-modal")
], h);
const nt = h;
export {
  h as PdfZoneEditorModalElement,
  nt as default
};
//# sourceMappingURL=pdf-zone-editor-modal.element-CKMRr8SU.js.map
