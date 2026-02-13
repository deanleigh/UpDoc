import { c as Se } from "./workflow.service-T0TEyrPt.js";
import { html as _t, nothing as oe, css as xe, state as Lt, customElement as Ee } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as Te } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as Ce } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as Re } from "@umbraco-cms/backoffice/auth";
var ke = {
  /***/
  976: (
    /***/
    (Y, $, I) => {
      I.d($, {
        AnnotationLayer: () => (
          /* binding */
          ft
        ),
        FreeTextAnnotationElement: () => (
          /* binding */
          U
        ),
        InkAnnotationElement: () => (
          /* binding */
          st
        ),
        StampAnnotationElement: () => (
          /* binding */
          ut
        )
      });
      var v = I(292), H = I(419), L = I(792);
      function G(it) {
        return Math.floor(Math.max(0, Math.min(1, it)) * 255).toString(16).padStart(2, "0");
      }
      function P(it) {
        return Math.max(0, Math.min(255, 255 * it));
      }
      class T {
        static CMYK_G([m, h, e, n]) {
          return ["G", 1 - Math.min(1, 0.3 * m + 0.59 * e + 0.11 * h + n)];
        }
        static G_CMYK([m]) {
          return ["CMYK", 0, 0, 0, 1 - m];
        }
        static G_RGB([m]) {
          return ["RGB", m, m, m];
        }
        static G_rgb([m]) {
          return m = P(m), [m, m, m];
        }
        static G_HTML([m]) {
          const h = G(m);
          return `#${h}${h}${h}`;
        }
        static RGB_G([m, h, e]) {
          return ["G", 0.3 * m + 0.59 * h + 0.11 * e];
        }
        static RGB_rgb(m) {
          return m.map(P);
        }
        static RGB_HTML(m) {
          return `#${m.map(G).join("")}`;
        }
        static T_HTML() {
          return "#00000000";
        }
        static T_rgb() {
          return [null];
        }
        static CMYK_RGB([m, h, e, n]) {
          return ["RGB", 1 - Math.min(1, m + n), 1 - Math.min(1, e + n), 1 - Math.min(1, h + n)];
        }
        static CMYK_rgb([m, h, e, n]) {
          return [P(1 - Math.min(1, m + n)), P(1 - Math.min(1, e + n)), P(1 - Math.min(1, h + n))];
        }
        static CMYK_HTML(m) {
          const h = this.CMYK_RGB(m).slice(1);
          return this.RGB_HTML(h);
        }
        static RGB_CMYK([m, h, e]) {
          const n = 1 - m, f = 1 - h, o = 1 - e, a = Math.min(n, f, o);
          return ["CMYK", n, f, o, a];
        }
      }
      var E = I(284);
      const y = 1e3, r = 9, c = /* @__PURE__ */ new WeakSet();
      function l(it) {
        return {
          width: it[2] - it[0],
          height: it[3] - it[1]
        };
      }
      class b {
        static create(m) {
          switch (m.data.annotationType) {
            case v.AnnotationType.LINK:
              return new g(m);
            case v.AnnotationType.TEXT:
              return new t(m);
            case v.AnnotationType.WIDGET:
              switch (m.data.fieldType) {
                case "Tx":
                  return new u(m);
                case "Btn":
                  return m.data.radioButton ? new S(m) : m.data.checkBox ? new w(m) : new M(m);
                case "Ch":
                  return new _(m);
                case "Sig":
                  return new p(m);
              }
              return new i(m);
            case v.AnnotationType.POPUP:
              return new O(m);
            case v.AnnotationType.FREETEXT:
              return new U(m);
            case v.AnnotationType.LINE:
              return new K(m);
            case v.AnnotationType.SQUARE:
              return new rt(m);
            case v.AnnotationType.CIRCLE:
              return new W(m);
            case v.AnnotationType.POLYLINE:
              return new z(m);
            case v.AnnotationType.CARET:
              return new q(m);
            case v.AnnotationType.INK:
              return new st(m);
            case v.AnnotationType.POLYGON:
              return new V(m);
            case v.AnnotationType.HIGHLIGHT:
              return new et(m);
            case v.AnnotationType.UNDERLINE:
              return new ot(m);
            case v.AnnotationType.SQUIGGLY:
              return new dt(m);
            case v.AnnotationType.STRIKEOUT:
              return new mt(m);
            case v.AnnotationType.STAMP:
              return new ut(m);
            case v.AnnotationType.FILEATTACHMENT:
              return new ht(m);
            default:
              return new s(m);
          }
        }
      }
      class s {
        #t = null;
        #e = !1;
        constructor(m, {
          isRenderable: h = !1,
          ignoreBorder: e = !1,
          createQuadrilaterals: n = !1
        } = {}) {
          this.isRenderable = h, this.data = m.data, this.layer = m.layer, this.linkService = m.linkService, this.downloadManager = m.downloadManager, this.imageResourcesPath = m.imageResourcesPath, this.renderForms = m.renderForms, this.svgFactory = m.svgFactory, this.annotationStorage = m.annotationStorage, this.enableScripting = m.enableScripting, this.hasJSActions = m.hasJSActions, this._fieldObjects = m.fieldObjects, this.parent = m.parent, h && (this.container = this._createContainer(e)), n && this._createQuadrilaterals();
        }
        static _hasPopupData({
          titleObj: m,
          contentsObj: h,
          richText: e
        }) {
          return !!(m?.str || h?.str || e?.str);
        }
        get hasPopupData() {
          return s._hasPopupData(this.data);
        }
        updateEdited(m) {
          if (!this.container)
            return;
          this.#t ||= {
            rect: this.data.rect.slice(0)
          };
          const {
            rect: h
          } = m;
          h && this.#s(h);
        }
        resetEdited() {
          this.#t && (this.#s(this.#t.rect), this.#t = null);
        }
        #s(m) {
          const {
            container: {
              style: h
            },
            data: {
              rect: e,
              rotation: n
            },
            parent: {
              viewport: {
                rawDims: {
                  pageWidth: f,
                  pageHeight: o,
                  pageX: a,
                  pageY: d
                }
              }
            }
          } = this;
          e?.splice(0, 4, ...m);
          const {
            width: A,
            height: x
          } = l(m);
          h.left = `${100 * (m[0] - a) / f}%`, h.top = `${100 * (o - m[3] + d) / o}%`, n === 0 ? (h.width = `${100 * A / f}%`, h.height = `${100 * x / o}%`) : this.setRotation(n);
        }
        _createContainer(m) {
          const {
            data: h,
            parent: {
              page: e,
              viewport: n
            }
          } = this, f = document.createElement("section");
          f.setAttribute("data-annotation-id", h.id), this instanceof i || (f.tabIndex = y);
          const {
            style: o
          } = f;
          if (o.zIndex = this.parent.zIndex++, h.popupRef && f.setAttribute("aria-haspopup", "dialog"), h.alternativeText && (f.title = h.alternativeText), h.noRotate && f.classList.add("norotate"), !h.rect || this instanceof O) {
            const {
              rotation: F
            } = h;
            return !h.hasOwnCanvas && F !== 0 && this.setRotation(F, f), f;
          }
          const {
            width: a,
            height: d
          } = l(h.rect);
          if (!m && h.borderStyle.width > 0) {
            o.borderWidth = `${h.borderStyle.width}px`;
            const F = h.borderStyle.horizontalCornerRadius, C = h.borderStyle.verticalCornerRadius;
            if (F > 0 || C > 0) {
              const Q = `calc(${F}px * var(--scale-factor)) / calc(${C}px * var(--scale-factor))`;
              o.borderRadius = Q;
            } else if (this instanceof S) {
              const Q = `calc(${a}px * var(--scale-factor)) / calc(${d}px * var(--scale-factor))`;
              o.borderRadius = Q;
            }
            switch (h.borderStyle.style) {
              case v.AnnotationBorderStyleType.SOLID:
                o.borderStyle = "solid";
                break;
              case v.AnnotationBorderStyleType.DASHED:
                o.borderStyle = "dashed";
                break;
              case v.AnnotationBorderStyleType.BEVELED:
                (0, v.warn)("Unimplemented border style: beveled");
                break;
              case v.AnnotationBorderStyleType.INSET:
                (0, v.warn)("Unimplemented border style: inset");
                break;
              case v.AnnotationBorderStyleType.UNDERLINE:
                o.borderBottomStyle = "solid";
                break;
            }
            const X = h.borderColor || null;
            X ? (this.#e = !0, o.borderColor = v.Util.makeHexColor(X[0] | 0, X[1] | 0, X[2] | 0)) : o.borderWidth = 0;
          }
          const A = v.Util.normalizeRect([h.rect[0], e.view[3] - h.rect[1] + e.view[1], h.rect[2], e.view[3] - h.rect[3] + e.view[1]]), {
            pageWidth: x,
            pageHeight: R,
            pageX: k,
            pageY: D
          } = n.rawDims;
          o.left = `${100 * (A[0] - k) / x}%`, o.top = `${100 * (A[1] - D) / R}%`;
          const {
            rotation: N
          } = h;
          return h.hasOwnCanvas || N === 0 ? (o.width = `${100 * a / x}%`, o.height = `${100 * d / R}%`) : this.setRotation(N, f), f;
        }
        setRotation(m, h = this.container) {
          if (!this.data.rect)
            return;
          const {
            pageWidth: e,
            pageHeight: n
          } = this.parent.viewport.rawDims, {
            width: f,
            height: o
          } = l(this.data.rect);
          let a, d;
          m % 180 === 0 ? (a = 100 * f / e, d = 100 * o / n) : (a = 100 * o / e, d = 100 * f / n), h.style.width = `${a}%`, h.style.height = `${d}%`, h.setAttribute("data-main-rotation", (360 - m) % 360);
        }
        get _commonActions() {
          const m = (h, e, n) => {
            const f = n.detail[h], o = f[0], a = f.slice(1);
            n.target.style[e] = T[`${o}_HTML`](a), this.annotationStorage.setValue(this.data.id, {
              [e]: T[`${o}_rgb`](a)
            });
          };
          return (0, v.shadow)(this, "_commonActions", {
            display: (h) => {
              const {
                display: e
              } = h.detail, n = e % 2 === 1;
              this.container.style.visibility = n ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
                noView: n,
                noPrint: e === 1 || e === 2
              });
            },
            print: (h) => {
              this.annotationStorage.setValue(this.data.id, {
                noPrint: !h.detail.print
              });
            },
            hidden: (h) => {
              const {
                hidden: e
              } = h.detail;
              this.container.style.visibility = e ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
                noPrint: e,
                noView: e
              });
            },
            focus: (h) => {
              setTimeout(() => h.target.focus({
                preventScroll: !1
              }), 0);
            },
            userName: (h) => {
              h.target.title = h.detail.userName;
            },
            readonly: (h) => {
              h.target.disabled = h.detail.readonly;
            },
            required: (h) => {
              this._setRequired(h.target, h.detail.required);
            },
            bgColor: (h) => {
              m("bgColor", "backgroundColor", h);
            },
            fillColor: (h) => {
              m("fillColor", "backgroundColor", h);
            },
            fgColor: (h) => {
              m("fgColor", "color", h);
            },
            textColor: (h) => {
              m("textColor", "color", h);
            },
            borderColor: (h) => {
              m("borderColor", "borderColor", h);
            },
            strokeColor: (h) => {
              m("strokeColor", "borderColor", h);
            },
            rotation: (h) => {
              const e = h.detail.rotation;
              this.setRotation(e), this.annotationStorage.setValue(this.data.id, {
                rotation: e
              });
            }
          });
        }
        _dispatchEventFromSandbox(m, h) {
          const e = this._commonActions;
          for (const n of Object.keys(h.detail))
            (m[n] || e[n])?.(h);
        }
        _setDefaultPropertiesFromJS(m) {
          if (!this.enableScripting)
            return;
          const h = this.annotationStorage.getRawValue(this.data.id);
          if (!h)
            return;
          const e = this._commonActions;
          for (const [n, f] of Object.entries(h)) {
            const o = e[n];
            if (o) {
              const a = {
                detail: {
                  [n]: f
                },
                target: m
              };
              o(a), delete h[n];
            }
          }
        }
        _createQuadrilaterals() {
          if (!this.container)
            return;
          const {
            quadPoints: m
          } = this.data;
          if (!m)
            return;
          const [h, e, n, f] = this.data.rect;
          if (m.length === 1) {
            const [, {
              x: F,
              y: C
            }, {
              x: X,
              y: Q
            }] = m[0];
            if (n === F && f === C && h === X && e === Q)
              return;
          }
          const {
            style: o
          } = this.container;
          let a;
          if (this.#e) {
            const {
              borderColor: F,
              borderWidth: C
            } = o;
            o.borderWidth = 0, a = ["url('data:image/svg+xml;utf8,", '<svg xmlns="http://www.w3.org/2000/svg"', ' preserveAspectRatio="none" viewBox="0 0 1 1">', `<g fill="transparent" stroke="${F}" stroke-width="${C}">`], this.container.classList.add("hasBorder");
          }
          const d = n - h, A = f - e, {
            svgFactory: x
          } = this, R = x.createElement("svg");
          R.classList.add("quadrilateralsContainer"), R.setAttribute("width", 0), R.setAttribute("height", 0);
          const k = x.createElement("defs");
          R.append(k);
          const D = x.createElement("clipPath"), N = `clippath_${this.data.id}`;
          D.setAttribute("id", N), D.setAttribute("clipPathUnits", "objectBoundingBox"), k.append(D);
          for (const [, {
            x: F,
            y: C
          }, {
            x: X,
            y: Q
          }] of m) {
            const j = x.createElement("rect"), Z = (X - h) / d, at = (f - C) / A, tt = (F - X) / d, J = (C - Q) / A;
            j.setAttribute("x", Z), j.setAttribute("y", at), j.setAttribute("width", tt), j.setAttribute("height", J), D.append(j), a?.push(`<rect vector-effect="non-scaling-stroke" x="${Z}" y="${at}" width="${tt}" height="${J}"/>`);
          }
          this.#e && (a.push("</g></svg>')"), o.backgroundImage = a.join("")), this.container.append(R), this.container.style.clipPath = `url(#${N})`;
        }
        _createPopup() {
          const {
            container: m,
            data: h
          } = this;
          m.setAttribute("aria-haspopup", "dialog");
          const e = new O({
            data: {
              color: h.color,
              titleObj: h.titleObj,
              modificationDate: h.modificationDate,
              contentsObj: h.contentsObj,
              richText: h.richText,
              parentRect: h.rect,
              borderStyle: 0,
              id: `popup_${h.id}`,
              rotation: h.rotation
            },
            parent: this.parent,
            elements: [this]
          });
          this.parent.div.append(e.render());
        }
        render() {
          (0, v.unreachable)("Abstract method `AnnotationElement.render` called");
        }
        _getElementsByName(m, h = null) {
          const e = [];
          if (this._fieldObjects) {
            const n = this._fieldObjects[m];
            if (n)
              for (const {
                page: f,
                id: o,
                exportValues: a
              } of n) {
                if (f === -1 || o === h)
                  continue;
                const d = typeof a == "string" ? a : null, A = document.querySelector(`[data-element-id="${o}"]`);
                if (A && !c.has(A)) {
                  (0, v.warn)(`_getElementsByName - element not allowed: ${o}`);
                  continue;
                }
                e.push({
                  id: o,
                  exportValue: d,
                  domElement: A
                });
              }
            return e;
          }
          for (const n of document.getElementsByName(m)) {
            const {
              exportValue: f
            } = n, o = n.getAttribute("data-element-id");
            o !== h && c.has(n) && e.push({
              id: o,
              exportValue: f,
              domElement: n
            });
          }
          return e;
        }
        show() {
          this.container && (this.container.hidden = !1), this.popup?.maybeShow();
        }
        hide() {
          this.container && (this.container.hidden = !0), this.popup?.forceHide();
        }
        getElementsToTriggerPopup() {
          return this.container;
        }
        addHighlightArea() {
          const m = this.getElementsToTriggerPopup();
          if (Array.isArray(m))
            for (const h of m)
              h.classList.add("highlightArea");
          else
            m.classList.add("highlightArea");
        }
        get _isEditable() {
          return !1;
        }
        _editOnDoubleClick() {
          if (!this._isEditable)
            return;
          const {
            annotationEditorType: m,
            data: {
              id: h
            }
          } = this;
          this.container.addEventListener("dblclick", () => {
            this.linkService.eventBus?.dispatch("switchannotationeditormode", {
              source: this,
              mode: m,
              editId: h
            });
          });
        }
      }
      class g extends s {
        constructor(m, h = null) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !!h?.ignoreBorder,
            createQuadrilaterals: !0
          }), this.isTooltipOnly = m.data.isTooltipOnly;
        }
        render() {
          const {
            data: m,
            linkService: h
          } = this, e = document.createElement("a");
          e.setAttribute("data-element-id", m.id);
          let n = !1;
          return m.url ? (h.addLinkAttributes(e, m.url, m.newWindow), n = !0) : m.action ? (this._bindNamedAction(e, m.action), n = !0) : m.attachment ? (this.#e(e, m.attachment, m.attachmentDest), n = !0) : m.setOCGState ? (this.#s(e, m.setOCGState), n = !0) : m.dest ? (this._bindLink(e, m.dest), n = !0) : (m.actions && (m.actions.Action || m.actions["Mouse Up"] || m.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions && (this._bindJSAction(e, m), n = !0), m.resetForm ? (this._bindResetFormAction(e, m.resetForm), n = !0) : this.isTooltipOnly && !n && (this._bindLink(e, ""), n = !0)), this.container.classList.add("linkAnnotation"), n && this.container.append(e), this.container;
        }
        #t() {
          this.container.setAttribute("data-internal-link", "");
        }
        _bindLink(m, h) {
          m.href = this.linkService.getDestinationHash(h), m.onclick = () => (h && this.linkService.goToDestination(h), !1), (h || h === "") && this.#t();
        }
        _bindNamedAction(m, h) {
          m.href = this.linkService.getAnchorUrl(""), m.onclick = () => (this.linkService.executeNamedAction(h), !1), this.#t();
        }
        #e(m, h, e = null) {
          m.href = this.linkService.getAnchorUrl(""), m.onclick = () => (this.downloadManager?.openOrDownloadData(h.content, h.filename, e), !1), this.#t();
        }
        #s(m, h) {
          m.href = this.linkService.getAnchorUrl(""), m.onclick = () => (this.linkService.executeSetOCGState(h), !1), this.#t();
        }
        _bindJSAction(m, h) {
          m.href = this.linkService.getAnchorUrl("");
          const e = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
          for (const n of Object.keys(h.actions)) {
            const f = e.get(n);
            f && (m[f] = () => (this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: h.id,
                name: n
              }
            }), !1));
          }
          m.onclick || (m.onclick = () => !1), this.#t();
        }
        _bindResetFormAction(m, h) {
          const e = m.onclick;
          if (e || (m.href = this.linkService.getAnchorUrl("")), this.#t(), !this._fieldObjects) {
            (0, v.warn)('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), e || (m.onclick = () => !1);
            return;
          }
          m.onclick = () => {
            e?.();
            const {
              fields: n,
              refs: f,
              include: o
            } = h, a = [];
            if (n.length !== 0 || f.length !== 0) {
              const x = new Set(f);
              for (const R of n) {
                const k = this._fieldObjects[R] || [];
                for (const {
                  id: D
                } of k)
                  x.add(D);
              }
              for (const R of Object.values(this._fieldObjects))
                for (const k of R)
                  x.has(k.id) === o && a.push(k);
            } else
              for (const x of Object.values(this._fieldObjects))
                a.push(...x);
            const d = this.annotationStorage, A = [];
            for (const x of a) {
              const {
                id: R
              } = x;
              switch (A.push(R), x.type) {
                case "text": {
                  const D = x.defaultValue || "";
                  d.setValue(R, {
                    value: D
                  });
                  break;
                }
                case "checkbox":
                case "radiobutton": {
                  const D = x.defaultValue === x.exportValues;
                  d.setValue(R, {
                    value: D
                  });
                  break;
                }
                case "combobox":
                case "listbox": {
                  const D = x.defaultValue || "";
                  d.setValue(R, {
                    value: D
                  });
                  break;
                }
                default:
                  continue;
              }
              const k = document.querySelector(`[data-element-id="${R}"]`);
              if (k) {
                if (!c.has(k)) {
                  (0, v.warn)(`_bindResetFormAction - element not allowed: ${R}`);
                  continue;
                }
              } else continue;
              k.dispatchEvent(new Event("resetform"));
            }
            return this.enableScripting && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: "app",
                ids: A,
                name: "ResetForm"
              }
            }), !1;
          };
        }
      }
      class t extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0
          });
        }
        render() {
          this.container.classList.add("textAnnotation");
          const m = document.createElement("img");
          return m.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", m.setAttribute("data-l10n-id", "pdfjs-text-annotation-type"), m.setAttribute("data-l10n-args", JSON.stringify({
            type: this.data.name
          })), !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.append(m), this.container;
        }
      }
      class i extends s {
        render() {
          return this.container;
        }
        showElementAndHideCanvas(m) {
          this.data.hasOwnCanvas && (m.previousSibling?.nodeName === "CANVAS" && (m.previousSibling.hidden = !0), m.hidden = !1);
        }
        _getKeyModifier(m) {
          return v.FeatureTest.platform.isMac ? m.metaKey : m.ctrlKey;
        }
        _setEventListener(m, h, e, n, f) {
          e.includes("mouse") ? m.addEventListener(e, (o) => {
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: this.data.id,
                name: n,
                value: f(o),
                shift: o.shiftKey,
                modifier: this._getKeyModifier(o)
              }
            });
          }) : m.addEventListener(e, (o) => {
            if (e === "blur") {
              if (!h.focused || !o.relatedTarget)
                return;
              h.focused = !1;
            } else if (e === "focus") {
              if (h.focused)
                return;
              h.focused = !0;
            }
            f && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: this.data.id,
                name: n,
                value: f(o)
              }
            });
          });
        }
        _setEventListeners(m, h, e, n) {
          for (const [f, o] of e)
            (o === "Action" || this.data.actions?.[o]) && ((o === "Focus" || o === "Blur") && (h ||= {
              focused: !1
            }), this._setEventListener(m, h, f, o, n), o === "Focus" && !this.data.actions?.Blur ? this._setEventListener(m, h, "blur", "Blur", null) : o === "Blur" && !this.data.actions?.Focus && this._setEventListener(m, h, "focus", "Focus", null));
        }
        _setBackgroundColor(m) {
          const h = this.data.backgroundColor || null;
          m.style.backgroundColor = h === null ? "transparent" : v.Util.makeHexColor(h[0], h[1], h[2]);
        }
        _setTextStyle(m) {
          const h = ["left", "center", "right"], {
            fontColor: e
          } = this.data.defaultAppearanceData, n = this.data.defaultAppearanceData.fontSize || r, f = m.style;
          let o;
          const a = 2, d = (A) => Math.round(10 * A) / 10;
          if (this.data.multiLine) {
            const A = Math.abs(this.data.rect[3] - this.data.rect[1] - a), x = Math.round(A / (v.LINE_FACTOR * n)) || 1, R = A / x;
            o = Math.min(n, d(R / v.LINE_FACTOR));
          } else {
            const A = Math.abs(this.data.rect[3] - this.data.rect[1] - a);
            o = Math.min(n, d(A / v.LINE_FACTOR));
          }
          f.fontSize = `calc(${o}px * var(--scale-factor))`, f.color = v.Util.makeHexColor(e[0], e[1], e[2]), this.data.textAlignment !== null && (f.textAlign = h[this.data.textAlignment]);
        }
        _setRequired(m, h) {
          h ? m.setAttribute("required", !0) : m.removeAttribute("required"), m.setAttribute("aria-required", h);
        }
      }
      class u extends i {
        constructor(m) {
          const h = m.renderForms || m.data.hasOwnCanvas || !m.data.hasAppearance && !!m.data.fieldValue;
          super(m, {
            isRenderable: h
          });
        }
        setPropertyOnSiblings(m, h, e, n) {
          const f = this.annotationStorage;
          for (const o of this._getElementsByName(m.name, m.id))
            o.domElement && (o.domElement[h] = e), f.setValue(o.id, {
              [n]: e
            });
        }
        render() {
          const m = this.annotationStorage, h = this.data.id;
          this.container.classList.add("textWidgetAnnotation");
          let e = null;
          if (this.renderForms) {
            const n = m.getValue(h, {
              value: this.data.fieldValue
            });
            let f = n.value || "";
            const o = m.getValue(h, {
              charLimit: this.data.maxLen
            }).charLimit;
            o && f.length > o && (f = f.slice(0, o));
            let a = n.formattedValue || this.data.textContent?.join(`
`) || null;
            a && this.data.comb && (a = a.replaceAll(/\s+/g, ""));
            const d = {
              userValue: f,
              formattedValue: a,
              lastCommittedValue: null,
              commitKey: 1,
              focused: !1
            };
            this.data.multiLine ? (e = document.createElement("textarea"), e.textContent = a ?? f, this.data.doNotScroll && (e.style.overflowY = "hidden")) : (e = document.createElement("input"), e.type = "text", e.setAttribute("value", a ?? f), this.data.doNotScroll && (e.style.overflowX = "hidden")), this.data.hasOwnCanvas && (e.hidden = !0), c.add(e), e.setAttribute("data-element-id", h), e.disabled = this.data.readOnly, e.name = this.data.fieldName, e.tabIndex = y, this._setRequired(e, this.data.required), o && (e.maxLength = o), e.addEventListener("input", (x) => {
              m.setValue(h, {
                value: x.target.value
              }), this.setPropertyOnSiblings(e, "value", x.target.value, "value"), d.formattedValue = null;
            }), e.addEventListener("resetform", (x) => {
              const R = this.data.defaultFieldValue ?? "";
              e.value = d.userValue = R, d.formattedValue = null;
            });
            let A = (x) => {
              const {
                formattedValue: R
              } = d;
              R != null && (x.target.value = R), x.target.scrollLeft = 0;
            };
            if (this.enableScripting && this.hasJSActions) {
              e.addEventListener("focus", (R) => {
                if (d.focused)
                  return;
                const {
                  target: k
                } = R;
                d.userValue && (k.value = d.userValue), d.lastCommittedValue = k.value, d.commitKey = 1, this.data.actions?.Focus || (d.focused = !0);
              }), e.addEventListener("updatefromsandbox", (R) => {
                this.showElementAndHideCanvas(R.target);
                const k = {
                  value(D) {
                    d.userValue = D.detail.value ?? "", m.setValue(h, {
                      value: d.userValue.toString()
                    }), D.target.value = d.userValue;
                  },
                  formattedValue(D) {
                    const {
                      formattedValue: N
                    } = D.detail;
                    d.formattedValue = N, N != null && D.target !== document.activeElement && (D.target.value = N), m.setValue(h, {
                      formattedValue: N
                    });
                  },
                  selRange(D) {
                    D.target.setSelectionRange(...D.detail.selRange);
                  },
                  charLimit: (D) => {
                    const {
                      charLimit: N
                    } = D.detail, {
                      target: F
                    } = D;
                    if (N === 0) {
                      F.removeAttribute("maxLength");
                      return;
                    }
                    F.setAttribute("maxLength", N);
                    let C = d.userValue;
                    !C || C.length <= N || (C = C.slice(0, N), F.value = d.userValue = C, m.setValue(h, {
                      value: C
                    }), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id: h,
                        name: "Keystroke",
                        value: C,
                        willCommit: !0,
                        commitKey: 1,
                        selStart: F.selectionStart,
                        selEnd: F.selectionEnd
                      }
                    }));
                  }
                };
                this._dispatchEventFromSandbox(k, R);
              }), e.addEventListener("keydown", (R) => {
                d.commitKey = 1;
                let k = -1;
                if (R.key === "Escape" ? k = 0 : R.key === "Enter" && !this.data.multiLine ? k = 2 : R.key === "Tab" && (d.commitKey = 3), k === -1)
                  return;
                const {
                  value: D
                } = R.target;
                d.lastCommittedValue !== D && (d.lastCommittedValue = D, d.userValue = D, this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: h,
                    name: "Keystroke",
                    value: D,
                    willCommit: !0,
                    commitKey: k,
                    selStart: R.target.selectionStart,
                    selEnd: R.target.selectionEnd
                  }
                }));
              });
              const x = A;
              A = null, e.addEventListener("blur", (R) => {
                if (!d.focused || !R.relatedTarget)
                  return;
                this.data.actions?.Blur || (d.focused = !1);
                const {
                  value: k
                } = R.target;
                d.userValue = k, d.lastCommittedValue !== k && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: h,
                    name: "Keystroke",
                    value: k,
                    willCommit: !0,
                    commitKey: d.commitKey,
                    selStart: R.target.selectionStart,
                    selEnd: R.target.selectionEnd
                  }
                }), x(R);
              }), this.data.actions?.Keystroke && e.addEventListener("beforeinput", (R) => {
                d.lastCommittedValue = null;
                const {
                  data: k,
                  target: D
                } = R, {
                  value: N,
                  selectionStart: F,
                  selectionEnd: C
                } = D;
                let X = F, Q = C;
                switch (R.inputType) {
                  case "deleteWordBackward": {
                    const j = N.substring(0, F).match(/\w*[^\w]*$/);
                    j && (X -= j[0].length);
                    break;
                  }
                  case "deleteWordForward": {
                    const j = N.substring(F).match(/^[^\w]*\w*/);
                    j && (Q += j[0].length);
                    break;
                  }
                  case "deleteContentBackward":
                    F === C && (X -= 1);
                    break;
                  case "deleteContentForward":
                    F === C && (Q += 1);
                    break;
                }
                R.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: h,
                    name: "Keystroke",
                    value: N,
                    change: k || "",
                    willCommit: !1,
                    selStart: X,
                    selEnd: Q
                  }
                });
              }), this._setEventListeners(e, d, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (R) => R.target.value);
            }
            if (A && e.addEventListener("blur", A), this.data.comb) {
              const R = (this.data.rect[2] - this.data.rect[0]) / o;
              e.classList.add("comb"), e.style.letterSpacing = `calc(${R}px * var(--scale-factor) - 1ch)`;
            }
          } else
            e = document.createElement("div"), e.textContent = this.data.fieldValue, e.style.verticalAlign = "middle", e.style.display = "table-cell", this.data.hasOwnCanvas && (e.hidden = !0);
          return this._setTextStyle(e), this._setBackgroundColor(e), this._setDefaultPropertiesFromJS(e), this.container.append(e), this.container;
        }
      }
      class p extends i {
        constructor(m) {
          super(m, {
            isRenderable: !!m.data.hasOwnCanvas
          });
        }
      }
      class w extends i {
        constructor(m) {
          super(m, {
            isRenderable: m.renderForms
          });
        }
        render() {
          const m = this.annotationStorage, h = this.data, e = h.id;
          let n = m.getValue(e, {
            value: h.exportValue === h.fieldValue
          }).value;
          typeof n == "string" && (n = n !== "Off", m.setValue(e, {
            value: n
          })), this.container.classList.add("buttonWidgetAnnotation", "checkBox");
          const f = document.createElement("input");
          return c.add(f), f.setAttribute("data-element-id", e), f.disabled = h.readOnly, this._setRequired(f, this.data.required), f.type = "checkbox", f.name = h.fieldName, n && f.setAttribute("checked", !0), f.setAttribute("exportValue", h.exportValue), f.tabIndex = y, f.addEventListener("change", (o) => {
            const {
              name: a,
              checked: d
            } = o.target;
            for (const A of this._getElementsByName(a, e)) {
              const x = d && A.exportValue === h.exportValue;
              A.domElement && (A.domElement.checked = x), m.setValue(A.id, {
                value: x
              });
            }
            m.setValue(e, {
              value: d
            });
          }), f.addEventListener("resetform", (o) => {
            const a = h.defaultFieldValue || "Off";
            o.target.checked = a === h.exportValue;
          }), this.enableScripting && this.hasJSActions && (f.addEventListener("updatefromsandbox", (o) => {
            const a = {
              value(d) {
                d.target.checked = d.detail.value !== "Off", m.setValue(e, {
                  value: d.target.checked
                });
              }
            };
            this._dispatchEventFromSandbox(a, o);
          }), this._setEventListeners(f, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (o) => o.target.checked)), this._setBackgroundColor(f), this._setDefaultPropertiesFromJS(f), this.container.append(f), this.container;
        }
      }
      class S extends i {
        constructor(m) {
          super(m, {
            isRenderable: m.renderForms
          });
        }
        render() {
          this.container.classList.add("buttonWidgetAnnotation", "radioButton");
          const m = this.annotationStorage, h = this.data, e = h.id;
          let n = m.getValue(e, {
            value: h.fieldValue === h.buttonValue
          }).value;
          if (typeof n == "string" && (n = n !== h.buttonValue, m.setValue(e, {
            value: n
          })), n)
            for (const o of this._getElementsByName(h.fieldName, e))
              m.setValue(o.id, {
                value: !1
              });
          const f = document.createElement("input");
          if (c.add(f), f.setAttribute("data-element-id", e), f.disabled = h.readOnly, this._setRequired(f, this.data.required), f.type = "radio", f.name = h.fieldName, n && f.setAttribute("checked", !0), f.tabIndex = y, f.addEventListener("change", (o) => {
            const {
              name: a,
              checked: d
            } = o.target;
            for (const A of this._getElementsByName(a, e))
              m.setValue(A.id, {
                value: !1
              });
            m.setValue(e, {
              value: d
            });
          }), f.addEventListener("resetform", (o) => {
            const a = h.defaultFieldValue;
            o.target.checked = a != null && a === h.buttonValue;
          }), this.enableScripting && this.hasJSActions) {
            const o = h.buttonValue;
            f.addEventListener("updatefromsandbox", (a) => {
              const d = {
                value: (A) => {
                  const x = o === A.detail.value;
                  for (const R of this._getElementsByName(A.target.name)) {
                    const k = x && R.id === e;
                    R.domElement && (R.domElement.checked = k), m.setValue(R.id, {
                      value: k
                    });
                  }
                }
              };
              this._dispatchEventFromSandbox(d, a);
            }), this._setEventListeners(f, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (a) => a.target.checked);
          }
          return this._setBackgroundColor(f), this._setDefaultPropertiesFromJS(f), this.container.append(f), this.container;
        }
      }
      class M extends g {
        constructor(m) {
          super(m, {
            ignoreBorder: m.data.hasAppearance
          });
        }
        render() {
          const m = super.render();
          m.classList.add("buttonWidgetAnnotation", "pushButton");
          const h = m.lastChild;
          return this.enableScripting && this.hasJSActions && h && (this._setDefaultPropertiesFromJS(h), h.addEventListener("updatefromsandbox", (e) => {
            this._dispatchEventFromSandbox({}, e);
          })), m;
        }
      }
      class _ extends i {
        constructor(m) {
          super(m, {
            isRenderable: m.renderForms
          });
        }
        render() {
          this.container.classList.add("choiceWidgetAnnotation");
          const m = this.annotationStorage, h = this.data.id, e = m.getValue(h, {
            value: this.data.fieldValue
          }), n = document.createElement("select");
          c.add(n), n.setAttribute("data-element-id", h), n.disabled = this.data.readOnly, this._setRequired(n, this.data.required), n.name = this.data.fieldName, n.tabIndex = y;
          let f = this.data.combo && this.data.options.length > 0;
          this.data.combo || (n.size = this.data.options.length, this.data.multiSelect && (n.multiple = !0)), n.addEventListener("resetform", (x) => {
            const R = this.data.defaultFieldValue;
            for (const k of n.options)
              k.selected = k.value === R;
          });
          for (const x of this.data.options) {
            const R = document.createElement("option");
            R.textContent = x.displayValue, R.value = x.exportValue, e.value.includes(x.exportValue) && (R.setAttribute("selected", !0), f = !1), n.append(R);
          }
          let o = null;
          if (f) {
            const x = document.createElement("option");
            x.value = " ", x.setAttribute("hidden", !0), x.setAttribute("selected", !0), n.prepend(x), o = () => {
              x.remove(), n.removeEventListener("input", o), o = null;
            }, n.addEventListener("input", o);
          }
          const a = (x) => {
            const R = x ? "value" : "textContent", {
              options: k,
              multiple: D
            } = n;
            return D ? Array.prototype.filter.call(k, (N) => N.selected).map((N) => N[R]) : k.selectedIndex === -1 ? null : k[k.selectedIndex][R];
          };
          let d = a(!1);
          const A = (x) => {
            const R = x.target.options;
            return Array.prototype.map.call(R, (k) => ({
              displayValue: k.textContent,
              exportValue: k.value
            }));
          };
          return this.enableScripting && this.hasJSActions ? (n.addEventListener("updatefromsandbox", (x) => {
            const R = {
              value(k) {
                o?.();
                const D = k.detail.value, N = new Set(Array.isArray(D) ? D : [D]);
                for (const F of n.options)
                  F.selected = N.has(F.value);
                m.setValue(h, {
                  value: a(!0)
                }), d = a(!1);
              },
              multipleSelection(k) {
                n.multiple = !0;
              },
              remove(k) {
                const D = n.options, N = k.detail.remove;
                D[N].selected = !1, n.remove(N), D.length > 0 && Array.prototype.findIndex.call(D, (C) => C.selected) === -1 && (D[0].selected = !0), m.setValue(h, {
                  value: a(!0),
                  items: A(k)
                }), d = a(!1);
              },
              clear(k) {
                for (; n.length !== 0; )
                  n.remove(0);
                m.setValue(h, {
                  value: null,
                  items: []
                }), d = a(!1);
              },
              insert(k) {
                const {
                  index: D,
                  displayValue: N,
                  exportValue: F
                } = k.detail.insert, C = n.children[D], X = document.createElement("option");
                X.textContent = N, X.value = F, C ? C.before(X) : n.append(X), m.setValue(h, {
                  value: a(!0),
                  items: A(k)
                }), d = a(!1);
              },
              items(k) {
                const {
                  items: D
                } = k.detail;
                for (; n.length !== 0; )
                  n.remove(0);
                for (const N of D) {
                  const {
                    displayValue: F,
                    exportValue: C
                  } = N, X = document.createElement("option");
                  X.textContent = F, X.value = C, n.append(X);
                }
                n.options.length > 0 && (n.options[0].selected = !0), m.setValue(h, {
                  value: a(!0),
                  items: A(k)
                }), d = a(!1);
              },
              indices(k) {
                const D = new Set(k.detail.indices);
                for (const N of k.target.options)
                  N.selected = D.has(N.index);
                m.setValue(h, {
                  value: a(!0)
                }), d = a(!1);
              },
              editable(k) {
                k.target.disabled = !k.detail.editable;
              }
            };
            this._dispatchEventFromSandbox(R, x);
          }), n.addEventListener("input", (x) => {
            const R = a(!0), k = a(!1);
            m.setValue(h, {
              value: R
            }), x.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: h,
                name: "Keystroke",
                value: d,
                change: k,
                changeEx: R,
                willCommit: !1,
                commitKey: 1,
                keyDown: !1
              }
            });
          }), this._setEventListeners(n, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], (x) => x.target.value)) : n.addEventListener("input", function(x) {
            m.setValue(h, {
              value: a(!0)
            });
          }), this.data.combo && this._setTextStyle(n), this._setBackgroundColor(n), this._setDefaultPropertiesFromJS(n), this.container.append(n), this.container;
        }
      }
      class O extends s {
        constructor(m) {
          const {
            data: h,
            elements: e
          } = m;
          super(m, {
            isRenderable: s._hasPopupData(h)
          }), this.elements = e;
        }
        render() {
          this.container.classList.add("popupAnnotation");
          const m = new B({
            container: this.container,
            color: this.data.color,
            titleObj: this.data.titleObj,
            modificationDate: this.data.modificationDate,
            contentsObj: this.data.contentsObj,
            richText: this.data.richText,
            rect: this.data.rect,
            parentRect: this.data.parentRect || null,
            parent: this.parent,
            elements: this.elements,
            open: this.data.open
          }), h = [];
          for (const e of this.elements)
            e.popup = m, h.push(e.data.id), e.addHighlightArea();
          return this.container.setAttribute("aria-controls", h.map((e) => `${v.AnnotationPrefix}${e}`).join(",")), this.container;
        }
      }
      class B {
        #t = this.#m.bind(this);
        #e = this.#C.bind(this);
        #s = this.#w.bind(this);
        #n = this.#A.bind(this);
        #r = null;
        #i = null;
        #a = null;
        #l = null;
        #h = null;
        #d = null;
        #u = null;
        #c = !1;
        #o = null;
        #p = null;
        #g = null;
        #f = null;
        #v = !1;
        constructor({
          container: m,
          color: h,
          elements: e,
          titleObj: n,
          modificationDate: f,
          contentsObj: o,
          richText: a,
          parent: d,
          rect: A,
          parentRect: x,
          open: R
        }) {
          this.#i = m, this.#f = n, this.#a = o, this.#g = a, this.#d = d, this.#r = h, this.#p = A, this.#u = x, this.#h = e, this.#l = H.PDFDateString.toDateObject(f), this.trigger = e.flatMap((k) => k.getElementsToTriggerPopup());
          for (const k of this.trigger)
            k.addEventListener("click", this.#n), k.addEventListener("mouseenter", this.#s), k.addEventListener("mouseleave", this.#e), k.classList.add("popupTriggerArea");
          for (const k of e)
            k.container?.addEventListener("keydown", this.#t);
          this.#i.hidden = !0, R && this.#A();
        }
        render() {
          if (this.#o)
            return;
          const {
            page: {
              view: m
            },
            viewport: {
              rawDims: {
                pageWidth: h,
                pageHeight: e,
                pageX: n,
                pageY: f
              }
            }
          } = this.#d, o = this.#o = document.createElement("div");
          if (o.className = "popup", this.#r) {
            const j = o.style.outlineColor = v.Util.makeHexColor(...this.#r);
            CSS.supports("background-color", "color-mix(in srgb, red 30%, white)") ? o.style.backgroundColor = `color-mix(in srgb, ${j} 30%, white)` : o.style.backgroundColor = v.Util.makeHexColor(...this.#r.map((at) => Math.floor(0.7 * (255 - at) + at)));
          }
          const a = document.createElement("span");
          a.className = "header";
          const d = document.createElement("h1");
          if (a.append(d), {
            dir: d.dir,
            str: d.textContent
          } = this.#f, o.append(a), this.#l) {
            const j = document.createElement("span");
            j.classList.add("popupDate"), j.setAttribute("data-l10n-id", "pdfjs-annotation-date-string"), j.setAttribute("data-l10n-args", JSON.stringify({
              date: this.#l.toLocaleDateString(),
              time: this.#l.toLocaleTimeString()
            })), a.append(j);
          }
          const A = this.#a, x = this.#g;
          if (x?.str && (!A?.str || A.str === x.str))
            E.XfaLayer.render({
              xfaHtml: x.html,
              intent: "richText",
              div: o
            }), o.lastChild.classList.add("richText", "popupContent");
          else {
            const j = this._formatContents(A);
            o.append(j);
          }
          let R = !!this.#u, k = R ? this.#u : this.#p;
          for (const j of this.#h)
            if (!k || v.Util.intersect(j.data.rect, k) !== null) {
              k = j.data.rect, R = !0;
              break;
            }
          const D = v.Util.normalizeRect([k[0], m[3] - k[1] + m[1], k[2], m[3] - k[3] + m[1]]), F = R ? k[2] - k[0] + 5 : 0, C = D[0] + F, X = D[1], {
            style: Q
          } = this.#i;
          Q.left = `${100 * (C - n) / h}%`, Q.top = `${100 * (X - f) / e}%`, this.#i.append(o);
        }
        _formatContents({
          str: m,
          dir: h
        }) {
          const e = document.createElement("p");
          e.classList.add("popupContent"), e.dir = h;
          const n = m.split(/(?:\r\n?|\n)/);
          for (let f = 0, o = n.length; f < o; ++f) {
            const a = n[f];
            e.append(document.createTextNode(a)), f < o - 1 && e.append(document.createElement("br"));
          }
          return e;
        }
        #m(m) {
          m.altKey || m.shiftKey || m.ctrlKey || m.metaKey || (m.key === "Enter" || m.key === "Escape" && this.#c) && this.#A();
        }
        #A() {
          this.#c = !this.#c, this.#c ? (this.#w(), this.#i.addEventListener("click", this.#n), this.#i.addEventListener("keydown", this.#t)) : (this.#C(), this.#i.removeEventListener("click", this.#n), this.#i.removeEventListener("keydown", this.#t));
        }
        #w() {
          this.#o || this.render(), this.isVisible ? this.#c && this.#i.classList.add("focused") : (this.#i.hidden = !1, this.#i.style.zIndex = parseInt(this.#i.style.zIndex) + 1e3);
        }
        #C() {
          this.#i.classList.remove("focused"), !(this.#c || !this.isVisible) && (this.#i.hidden = !0, this.#i.style.zIndex = parseInt(this.#i.style.zIndex) - 1e3);
        }
        forceHide() {
          this.#v = this.isVisible, this.#v && (this.#i.hidden = !0);
        }
        maybeShow() {
          this.#v && (this.#v = !1, this.#i.hidden = !1);
        }
        get isVisible() {
          return this.#i.hidden === !1;
        }
      }
      class U extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.textContent = m.data.textContent, this.textPosition = m.data.textPosition, this.annotationEditorType = v.AnnotationEditorType.FREETEXT;
        }
        render() {
          if (this.container.classList.add("freeTextAnnotation"), this.textContent) {
            const m = document.createElement("div");
            m.classList.add("annotationTextContent"), m.setAttribute("role", "comment");
            for (const h of this.textContent) {
              const e = document.createElement("span");
              e.textContent = h, m.append(e);
            }
            this.container.append(m);
          }
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this._editOnDoubleClick(), this.container;
        }
        get _isEditable() {
          return this.data.hasOwnCanvas;
        }
      }
      class K extends s {
        #t = null;
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          this.container.classList.add("lineAnnotation");
          const m = this.data, {
            width: h,
            height: e
          } = l(m.rect), n = this.svgFactory.create(h, e, !0), f = this.#t = this.svgFactory.createElement("svg:line");
          return f.setAttribute("x1", m.rect[2] - m.lineCoordinates[0]), f.setAttribute("y1", m.rect[3] - m.lineCoordinates[1]), f.setAttribute("x2", m.rect[2] - m.lineCoordinates[2]), f.setAttribute("y2", m.rect[3] - m.lineCoordinates[3]), f.setAttribute("stroke-width", m.borderStyle.width || 1), f.setAttribute("stroke", "transparent"), f.setAttribute("fill", "transparent"), n.append(f), this.container.append(n), !m.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class rt extends s {
        #t = null;
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          this.container.classList.add("squareAnnotation");
          const m = this.data, {
            width: h,
            height: e
          } = l(m.rect), n = this.svgFactory.create(h, e, !0), f = m.borderStyle.width, o = this.#t = this.svgFactory.createElement("svg:rect");
          return o.setAttribute("x", f / 2), o.setAttribute("y", f / 2), o.setAttribute("width", h - f), o.setAttribute("height", e - f), o.setAttribute("stroke-width", f || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), n.append(o), this.container.append(n), !m.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class W extends s {
        #t = null;
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          this.container.classList.add("circleAnnotation");
          const m = this.data, {
            width: h,
            height: e
          } = l(m.rect), n = this.svgFactory.create(h, e, !0), f = m.borderStyle.width, o = this.#t = this.svgFactory.createElement("svg:ellipse");
          return o.setAttribute("cx", h / 2), o.setAttribute("cy", e / 2), o.setAttribute("rx", h / 2 - f / 2), o.setAttribute("ry", e / 2 - f / 2), o.setAttribute("stroke-width", f || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), n.append(o), this.container.append(n), !m.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class z extends s {
        #t = null;
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.containerClassName = "polylineAnnotation", this.svgElementName = "svg:polyline";
        }
        render() {
          this.container.classList.add(this.containerClassName);
          const m = this.data, {
            width: h,
            height: e
          } = l(m.rect), n = this.svgFactory.create(h, e, !0);
          let f = [];
          for (const a of m.vertices) {
            const d = a.x - m.rect[0], A = m.rect[3] - a.y;
            f.push(d + "," + A);
          }
          f = f.join(" ");
          const o = this.#t = this.svgFactory.createElement(this.svgElementName);
          return o.setAttribute("points", f), o.setAttribute("stroke-width", m.borderStyle.width || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), n.append(o), this.container.append(n), !m.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class V extends z {
        constructor(m) {
          super(m), this.containerClassName = "polygonAnnotation", this.svgElementName = "svg:polygon";
        }
      }
      class q extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          return this.container.classList.add("caretAnnotation"), !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
      }
      class st extends s {
        #t = [];
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.containerClassName = "inkAnnotation", this.svgElementName = "svg:polyline", this.annotationEditorType = v.AnnotationEditorType.INK;
        }
        render() {
          this.container.classList.add(this.containerClassName);
          const m = this.data, {
            width: h,
            height: e
          } = l(m.rect), n = this.svgFactory.create(h, e, !0);
          for (const f of m.inkLists) {
            let o = [];
            for (const d of f) {
              const A = d.x - m.rect[0], x = m.rect[3] - d.y;
              o.push(`${A},${x}`);
            }
            o = o.join(" ");
            const a = this.svgFactory.createElement(this.svgElementName);
            this.#t.push(a), a.setAttribute("points", o), a.setAttribute("stroke-width", m.borderStyle.width || 1), a.setAttribute("stroke", "transparent"), a.setAttribute("fill", "transparent"), !m.popupRef && this.hasPopupData && this._createPopup(), n.append(a);
          }
          return this.container.append(n), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class et extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("highlightAnnotation"), this.container;
        }
      }
      class ot extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("underlineAnnotation"), this.container;
        }
      }
      class dt extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("squigglyAnnotation"), this.container;
        }
      }
      class mt extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("strikeoutAnnotation"), this.container;
        }
      }
      class ut extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          return this.container.classList.add("stampAnnotation"), !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
      }
      class ht extends s {
        #t = null;
        constructor(m) {
          super(m, {
            isRenderable: !0
          });
          const {
            filename: h,
            content: e
          } = this.data.file;
          this.filename = (0, H.getFilenameFromUrl)(h, !0), this.content = e, this.linkService.eventBus?.dispatch("fileattachmentannotation", {
            source: this,
            filename: h,
            content: e
          });
        }
        render() {
          this.container.classList.add("fileAttachmentAnnotation");
          const {
            container: m,
            data: h
          } = this;
          let e;
          h.hasAppearance || h.fillAlpha === 0 ? e = document.createElement("div") : (e = document.createElement("img"), e.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(h.name) ? "paperclip" : "pushpin"}.svg`, h.fillAlpha && h.fillAlpha < 1 && (e.style = `filter: opacity(${Math.round(h.fillAlpha * 100)}%);`)), e.addEventListener("dblclick", this.#e.bind(this)), this.#t = e;
          const {
            isMac: n
          } = v.FeatureTest.platform;
          return m.addEventListener("keydown", (f) => {
            f.key === "Enter" && (n ? f.metaKey : f.ctrlKey) && this.#e();
          }), !h.popupRef && this.hasPopupData ? this._createPopup() : e.classList.add("popupTriggerArea"), m.append(e), m;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
        #e() {
          this.downloadManager?.openOrDownloadData(this.content, this.filename);
        }
      }
      class ft {
        #t = null;
        #e = null;
        #s = /* @__PURE__ */ new Map();
        constructor({
          div: m,
          accessibilityManager: h,
          annotationCanvasMap: e,
          annotationEditorUIManager: n,
          page: f,
          viewport: o
        }) {
          this.div = m, this.#t = h, this.#e = e, this.page = f, this.viewport = o, this.zIndex = 0, this._annotationEditorUIManager = n;
        }
        #n(m, h) {
          const e = m.firstChild || m;
          e.id = `${v.AnnotationPrefix}${h}`, this.div.append(m), this.#t?.moveElementInDOM(this.div, m, e, !1);
        }
        async render(m) {
          const {
            annotations: h
          } = m, e = this.div;
          (0, H.setLayerDimensions)(e, this.viewport);
          const n = /* @__PURE__ */ new Map(), f = {
            data: null,
            layer: e,
            linkService: m.linkService,
            downloadManager: m.downloadManager,
            imageResourcesPath: m.imageResourcesPath || "",
            renderForms: m.renderForms !== !1,
            svgFactory: new H.DOMSVGFactory(),
            annotationStorage: m.annotationStorage || new L.AnnotationStorage(),
            enableScripting: m.enableScripting === !0,
            hasJSActions: m.hasJSActions,
            fieldObjects: m.fieldObjects,
            parent: this,
            elements: null
          };
          for (const o of h) {
            if (o.noHTML)
              continue;
            const a = o.annotationType === v.AnnotationType.POPUP;
            if (a) {
              const x = n.get(o.id);
              if (!x)
                continue;
              f.elements = x;
            } else {
              const {
                width: x,
                height: R
              } = l(o.rect);
              if (x <= 0 || R <= 0)
                continue;
            }
            f.data = o;
            const d = b.create(f);
            if (!d.isRenderable)
              continue;
            if (!a && o.popupRef) {
              const x = n.get(o.popupRef);
              x ? x.push(d) : n.set(o.popupRef, [d]);
            }
            const A = d.render();
            o.hidden && (A.style.visibility = "hidden"), this.#n(A, o.id), d.annotationEditorType > 0 && (this.#s.set(d.data.id, d), this._annotationEditorUIManager?.renderAnnotationElement(d));
          }
          this.#r();
        }
        update({
          viewport: m
        }) {
          const h = this.div;
          this.viewport = m, (0, H.setLayerDimensions)(h, {
            rotation: m.rotation
          }), this.#r(), h.hidden = !1;
        }
        #r() {
          if (!this.#e)
            return;
          const m = this.div;
          for (const [h, e] of this.#e) {
            const n = m.querySelector(`[data-annotation-id="${h}"]`);
            if (!n)
              continue;
            e.className = "annotationContent";
            const {
              firstChild: f
            } = n;
            f ? f.nodeName === "CANVAS" ? f.replaceWith(e) : f.classList.contains("annotationContent") ? f.after(e) : f.before(e) : n.append(e);
          }
          this.#e.clear();
        }
        getEditableAnnotations() {
          return Array.from(this.#s.values());
        }
        getEditableAnnotation(m) {
          return this.#s.get(m);
        }
      }
    }
  ),
  /***/
  792: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        AnnotationStorage: () => (
          /* binding */
          P
        ),
        /* harmony export */
        PrintAnnotationStorage: () => (
          /* binding */
          T
        ),
        /* harmony export */
        SerializableEmpty: () => (
          /* binding */
          G
        )
        /* harmony export */
      });
      var v = I(292), H = I(310), L = I(651);
      const G = Object.freeze({
        map: null,
        hash: "",
        transfer: void 0
      });
      class P {
        #t = !1;
        #e = /* @__PURE__ */ new Map();
        constructor() {
          this.onSetModified = null, this.onResetModified = null, this.onAnnotationEditor = null;
        }
        getValue(y, r) {
          const c = this.#e.get(y);
          return c === void 0 ? r : Object.assign(r, c);
        }
        getRawValue(y) {
          return this.#e.get(y);
        }
        remove(y) {
          if (this.#e.delete(y), this.#e.size === 0 && this.resetModified(), typeof this.onAnnotationEditor == "function") {
            for (const r of this.#e.values())
              if (r instanceof H.AnnotationEditor)
                return;
            this.onAnnotationEditor(null);
          }
        }
        setValue(y, r) {
          const c = this.#e.get(y);
          let l = !1;
          if (c !== void 0)
            for (const [b, s] of Object.entries(r))
              c[b] !== s && (l = !0, c[b] = s);
          else
            l = !0, this.#e.set(y, r);
          l && this.#s(), r instanceof H.AnnotationEditor && typeof this.onAnnotationEditor == "function" && this.onAnnotationEditor(r.constructor._type);
        }
        has(y) {
          return this.#e.has(y);
        }
        getAll() {
          return this.#e.size > 0 ? (0, v.objectFromMap)(this.#e) : null;
        }
        setAll(y) {
          for (const [r, c] of Object.entries(y))
            this.setValue(r, c);
        }
        get size() {
          return this.#e.size;
        }
        #s() {
          this.#t || (this.#t = !0, typeof this.onSetModified == "function" && this.onSetModified());
        }
        resetModified() {
          this.#t && (this.#t = !1, typeof this.onResetModified == "function" && this.onResetModified());
        }
        get print() {
          return new T(this);
        }
        get serializable() {
          if (this.#e.size === 0)
            return G;
          const y = /* @__PURE__ */ new Map(), r = new L.MurmurHash3_64(), c = [], l = /* @__PURE__ */ Object.create(null);
          let b = !1;
          for (const [s, g] of this.#e) {
            const t = g instanceof H.AnnotationEditor ? g.serialize(!1, l) : g;
            t && (y.set(s, t), r.update(`${s}:${JSON.stringify(t)}`), b ||= !!t.bitmap);
          }
          if (b)
            for (const s of y.values())
              s.bitmap && c.push(s.bitmap);
          return y.size > 0 ? {
            map: y,
            hash: r.hexdigest(),
            transfer: c
          } : G;
        }
        get editorStats() {
          let y = null;
          const r = /* @__PURE__ */ new Map();
          for (const c of this.#e.values()) {
            if (!(c instanceof H.AnnotationEditor))
              continue;
            const l = c.telemetryFinalData;
            if (!l)
              continue;
            const {
              type: b
            } = l;
            r.has(b) || r.set(b, Object.getPrototypeOf(c).constructor), y ||= /* @__PURE__ */ Object.create(null);
            const s = y[b] ||= /* @__PURE__ */ new Map();
            for (const [g, t] of Object.entries(l)) {
              if (g === "type")
                continue;
              let i = s.get(g);
              i || (i = /* @__PURE__ */ new Map(), s.set(g, i));
              const u = i.get(t) ?? 0;
              i.set(t, u + 1);
            }
          }
          for (const [c, l] of r)
            y[c] = l.computeTelemetryFinalData(y[c]);
          return y;
        }
      }
      class T extends P {
        #t;
        constructor(y) {
          super();
          const {
            map: r,
            hash: c,
            transfer: l
          } = y.serializable, b = structuredClone(r, l ? {
            transfer: l
          } : null);
          this.#t = {
            map: b,
            hash: c,
            transfer: l
          };
        }
        get print() {
          (0, v.unreachable)("Should not call PrintAnnotationStorage.print");
        }
        get serializable() {
          return this.#t;
        }
      }
    }
  ),
  /***/
  831: (
    /***/
    (Y, $, I) => {
      I.a(Y, async (v, H) => {
        try {
          let rt = function(o) {
            if (typeof o == "string" || o instanceof URL ? o = {
              url: o
            } : (o instanceof ArrayBuffer || ArrayBuffer.isView(o)) && (o = {
              data: o
            }), typeof o != "object")
              throw new Error("Invalid parameter in getDocument, need parameter object.");
            if (!o.url && !o.data && !o.range)
              throw new Error("Invalid parameter object: need either .data, .range or .url");
            const a = new st(), {
              docId: d
            } = a, A = o.url ? z(o.url) : null, x = o.data ? V(o.data) : null, R = o.httpHeaders || null, k = o.withCredentials === !0, D = o.password ?? null, N = o.range instanceof et ? o.range : null, F = Number.isInteger(o.rangeChunkSize) && o.rangeChunkSize > 0 ? o.rangeChunkSize : S;
            let C = o.worker instanceof ht ? o.worker : null;
            const X = o.verbosity, Q = typeof o.docBaseUrl == "string" && !(0, P.isDataScheme)(o.docBaseUrl) ? o.docBaseUrl : null, j = typeof o.cMapUrl == "string" ? o.cMapUrl : null, Z = o.cMapPacked !== !1, at = o.CMapReaderFactory || B, tt = typeof o.standardFontDataUrl == "string" ? o.standardFontDataUrl : null, J = o.StandardFontDataFactory || K, nt = o.stopAtErrors !== !0, lt = Number.isInteger(o.maxImageSize) && o.maxImageSize > -1 ? o.maxImageSize : -1, bt = o.isEvalSupported !== !1, At = typeof o.isOffscreenCanvasSupported == "boolean" ? o.isOffscreenCanvasSupported : !L.isNodeJS, yt = Number.isInteger(o.canvasMaxAreaInBytes) ? o.canvasMaxAreaInBytes : -1, vt = typeof o.disableFontFace == "boolean" ? o.disableFontFace : L.isNodeJS, Mt = o.fontExtraProperties === !0, Et = o.enableXfa === !0, kt = o.ownerDocument || globalThis.document, wt = o.disableRange === !0, Ct = o.disableStream === !0, It = o.disableAutoFetch === !0, zt = o.pdfBug === !0, Gt = N ? N.length : o.length ?? NaN, Wt = typeof o.useSystemFonts == "boolean" ? o.useSystemFonts : !L.isNodeJS && !vt, Bt = typeof o.useWorkerFetch == "boolean" ? o.useWorkerFetch : at === P.DOMCMapReaderFactory && J === P.DOMStandardFontDataFactory && j && tt && (0, P.isValidFetchUrl)(j, document.baseURI) && (0, P.isValidFetchUrl)(tt, document.baseURI), Rt = o.canvasFactory || new O({
              ownerDocument: kt
            }), xt = o.filterFactory || new U({
              docId: d,
              ownerDocument: kt
            }), qt = null;
            (0, L.setVerbosityLevel)(X);
            const Ut = {
              canvasFactory: Rt,
              filterFactory: xt
            };
            if (Bt || (Ut.cMapReaderFactory = new at({
              baseUrl: j,
              isCompressed: Z
            }), Ut.standardFontDataFactory = new J({
              baseUrl: tt
            })), !C) {
              const Vt = {
                verbosity: X,
                port: c.GlobalWorkerOptions.workerPort
              };
              C = Vt.port ? ht.fromPort(Vt) : new ht(Vt), a._worker = C;
            }
            const $t = {
              docId: d,
              apiVersion: "4.2.67",
              data: x,
              password: D,
              disableAutoFetch: It,
              rangeChunkSize: F,
              length: Gt,
              docBaseUrl: Q,
              enableXfa: Et,
              evaluatorOptions: {
                maxImageSize: lt,
                disableFontFace: vt,
                ignoreErrors: nt,
                isEvalSupported: bt,
                isOffscreenCanvasSupported: At,
                canvasMaxAreaInBytes: yt,
                fontExtraProperties: Mt,
                useSystemFonts: Wt,
                cMapUrl: Bt ? j : null,
                standardFontDataUrl: Bt ? tt : null
              }
            }, St = {
              ignoreErrors: nt,
              disableFontFace: vt,
              fontExtraProperties: Mt,
              enableXfa: Et,
              ownerDocument: kt,
              disableAutoFetch: It,
              pdfBug: zt,
              styleElement: qt
            };
            return C.promise.then(function() {
              if (a.destroyed)
                throw new Error("Loading aborted");
              const Vt = W(C, $t), we = new Promise(function(Jt) {
                let Xt;
                N ? Xt = new g.PDFDataTransportStream(N, {
                  disableRange: wt,
                  disableStream: Ct
                }) : x || (Xt = ((Nt) => L.isNodeJS ? function() {
                  return typeof fetch < "u" && typeof Response < "u" && "body" in Response.prototype;
                }() && (0, P.isValidFetchUrl)(Nt.url) ? new t.PDFFetchStream(Nt) : new u.PDFNodeStream(Nt) : (0, P.isValidFetchUrl)(Nt.url) ? new t.PDFFetchStream(Nt) : new i.PDFNetworkStream(Nt))({
                  url: A,
                  length: Gt,
                  httpHeaders: R,
                  withCredentials: k,
                  rangeChunkSize: F,
                  disableRange: wt,
                  disableStream: Ct
                })), Jt(Xt);
              });
              return Promise.all([Vt, we]).then(function([Jt, Xt]) {
                if (a.destroyed)
                  throw new Error("Loading aborted");
                const te = new l.MessageHandler(d, Jt, C.port), Nt = new ft(te, a, Xt, St, Ut);
                a._transport = Nt, te.send("Ready", null);
              });
            }).catch(a._capability.reject), a;
          }, z = function(o) {
            if (o instanceof URL)
              return o.href;
            try {
              return new URL(o, window.location).href;
            } catch {
              if (L.isNodeJS && typeof o == "string")
                return o;
            }
            throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
          }, V = function(o) {
            if (L.isNodeJS && typeof Buffer < "u" && o instanceof Buffer)
              throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
            if (o instanceof Uint8Array && o.byteLength === o.buffer.byteLength)
              return o;
            if (typeof o == "string")
              return (0, L.stringToBytes)(o);
            if (o instanceof ArrayBuffer || ArrayBuffer.isView(o) || typeof o == "object" && !isNaN(o?.length))
              return new Uint8Array(o);
            throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
          }, q = function(o) {
            return typeof o == "object" && Number.isInteger(o?.num) && o.num >= 0 && Number.isInteger(o?.gen) && o.gen >= 0;
          };
          I.d($, {
            /* harmony export */
            PDFDataRangeTransport: () => (
              /* binding */
              et
            ),
            /* harmony export */
            PDFWorker: () => (
              /* binding */
              ht
            ),
            /* harmony export */
            build: () => (
              /* binding */
              f
            ),
            /* harmony export */
            getDocument: () => (
              /* binding */
              rt
            ),
            /* harmony export */
            version: () => (
              /* binding */
              n
            )
            /* harmony export */
          });
          var L = I(292), G = I(792), P = I(419), T = I(10), E = I(573), y = I(923), r = I(814), c = I(164), l = I(178), b = I(62), s = I(626), g = I(585), t = I(94), i = I(457), u = I(786), p = I(50), w = v([E, u]);
          [E, u] = w.then ? (await w)() : w;
          const S = 65536, M = 100, _ = 5e3, O = L.isNodeJS ? E.NodeCanvasFactory : P.DOMCanvasFactory, B = L.isNodeJS ? E.NodeCMapReaderFactory : P.DOMCMapReaderFactory, U = L.isNodeJS ? E.NodeFilterFactory : P.DOMFilterFactory, K = L.isNodeJS ? E.NodeStandardFontDataFactory : P.DOMStandardFontDataFactory;
          async function W(o, a) {
            if (o.destroyed)
              throw new Error("Worker was destroyed");
            const d = await o.messageHandler.sendWithPromise("GetDocRequest", a, a.data ? [a.data.buffer] : null);
            if (o.destroyed)
              throw new Error("Worker was destroyed");
            return d;
          }
          class st {
            static #t = 0;
            constructor() {
              this._capability = Promise.withResolvers(), this._transport = null, this._worker = null, this.docId = `d${st.#t++}`, this.destroyed = !1, this.onPassword = null, this.onProgress = null;
            }
            get promise() {
              return this._capability.promise;
            }
            async destroy() {
              this.destroyed = !0;
              try {
                this._worker?.port && (this._worker._pendingDestroy = !0), await this._transport?.destroy();
              } catch (a) {
                throw this._worker?.port && delete this._worker._pendingDestroy, a;
              }
              this._transport = null, this._worker && (this._worker.destroy(), this._worker = null);
            }
          }
          class et {
            constructor(a, d, A = !1, x = null) {
              this.length = a, this.initialData = d, this.progressiveDone = A, this.contentDispositionFilename = x, this._rangeListeners = [], this._progressListeners = [], this._progressiveReadListeners = [], this._progressiveDoneListeners = [], this._readyCapability = Promise.withResolvers();
            }
            addRangeListener(a) {
              this._rangeListeners.push(a);
            }
            addProgressListener(a) {
              this._progressListeners.push(a);
            }
            addProgressiveReadListener(a) {
              this._progressiveReadListeners.push(a);
            }
            addProgressiveDoneListener(a) {
              this._progressiveDoneListeners.push(a);
            }
            onDataRange(a, d) {
              for (const A of this._rangeListeners)
                A(a, d);
            }
            onDataProgress(a, d) {
              this._readyCapability.promise.then(() => {
                for (const A of this._progressListeners)
                  A(a, d);
              });
            }
            onDataProgressiveRead(a) {
              this._readyCapability.promise.then(() => {
                for (const d of this._progressiveReadListeners)
                  d(a);
              });
            }
            onDataProgressiveDone() {
              this._readyCapability.promise.then(() => {
                for (const a of this._progressiveDoneListeners)
                  a();
              });
            }
            transportReady() {
              this._readyCapability.resolve();
            }
            requestDataRange(a, d) {
              (0, L.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
            }
            abort() {
            }
          }
          class ot {
            constructor(a, d) {
              this._pdfInfo = a, this._transport = d;
            }
            get annotationStorage() {
              return this._transport.annotationStorage;
            }
            get filterFactory() {
              return this._transport.filterFactory;
            }
            get numPages() {
              return this._pdfInfo.numPages;
            }
            get fingerprints() {
              return this._pdfInfo.fingerprints;
            }
            get isPureXfa() {
              return (0, L.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
            }
            get allXfaHtml() {
              return this._transport._htmlForXfa;
            }
            getPage(a) {
              return this._transport.getPage(a);
            }
            getPageIndex(a) {
              return this._transport.getPageIndex(a);
            }
            getDestinations() {
              return this._transport.getDestinations();
            }
            getDestination(a) {
              return this._transport.getDestination(a);
            }
            getPageLabels() {
              return this._transport.getPageLabels();
            }
            getPageLayout() {
              return this._transport.getPageLayout();
            }
            getPageMode() {
              return this._transport.getPageMode();
            }
            getViewerPreferences() {
              return this._transport.getViewerPreferences();
            }
            getOpenAction() {
              return this._transport.getOpenAction();
            }
            getAttachments() {
              return this._transport.getAttachments();
            }
            getJSActions() {
              return this._transport.getDocJSActions();
            }
            getOutline() {
              return this._transport.getOutline();
            }
            getOptionalContentConfig({
              intent: a = "display"
            } = {}) {
              const {
                renderingIntent: d
              } = this._transport.getRenderingIntent(a);
              return this._transport.getOptionalContentConfig(d);
            }
            getPermissions() {
              return this._transport.getPermissions();
            }
            getMetadata() {
              return this._transport.getMetadata();
            }
            getMarkInfo() {
              return this._transport.getMarkInfo();
            }
            getData() {
              return this._transport.getData();
            }
            saveDocument() {
              return this._transport.saveDocument();
            }
            getDownloadInfo() {
              return this._transport.downloadInfoCapability.promise;
            }
            cleanup(a = !1) {
              return this._transport.startCleanup(a || this.isPureXfa);
            }
            destroy() {
              return this.loadingTask.destroy();
            }
            cachedPageNumber(a) {
              return this._transport.cachedPageNumber(a);
            }
            get loadingParams() {
              return this._transport.loadingParams;
            }
            get loadingTask() {
              return this._transport.loadingTask;
            }
            getFieldObjects() {
              return this._transport.getFieldObjects();
            }
            hasJSActions() {
              return this._transport.hasJSActions();
            }
            getCalculationOrderIds() {
              return this._transport.getCalculationOrderIds();
            }
          }
          class dt {
            #t = null;
            #e = !1;
            constructor(a, d, A, x = !1) {
              this._pageIndex = a, this._pageInfo = d, this._transport = A, this._stats = x ? new P.StatTimer() : null, this._pdfBug = x, this.commonObjs = A.commonObjs, this.objs = new m(), this._maybeCleanupAfterRender = !1, this._intentStates = /* @__PURE__ */ new Map(), this.destroyed = !1;
            }
            get pageNumber() {
              return this._pageIndex + 1;
            }
            get rotate() {
              return this._pageInfo.rotate;
            }
            get ref() {
              return this._pageInfo.ref;
            }
            get userUnit() {
              return this._pageInfo.userUnit;
            }
            get view() {
              return this._pageInfo.view;
            }
            getViewport({
              scale: a,
              rotation: d = this.rotate,
              offsetX: A = 0,
              offsetY: x = 0,
              dontFlip: R = !1
            } = {}) {
              return new P.PageViewport({
                viewBox: this.view,
                scale: a,
                rotation: d,
                offsetX: A,
                offsetY: x,
                dontFlip: R
              });
            }
            getAnnotations({
              intent: a = "display"
            } = {}) {
              const {
                renderingIntent: d
              } = this._transport.getRenderingIntent(a);
              return this._transport.getAnnotations(this._pageIndex, d);
            }
            getJSActions() {
              return this._transport.getPageJSActions(this._pageIndex);
            }
            get filterFactory() {
              return this._transport.filterFactory;
            }
            get isPureXfa() {
              return (0, L.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
            }
            async getXfa() {
              return this._transport._htmlForXfa?.children[this._pageIndex] || null;
            }
            render({
              canvasContext: a,
              viewport: d,
              intent: A = "display",
              annotationMode: x = L.AnnotationMode.ENABLE,
              transform: R = null,
              background: k = null,
              optionalContentConfigPromise: D = null,
              annotationCanvasMap: N = null,
              pageColors: F = null,
              printAnnotationStorage: C = null
            }) {
              this._stats?.time("Overall");
              const X = this._transport.getRenderingIntent(A, x, C), {
                renderingIntent: Q,
                cacheKey: j
              } = X;
              this.#e = !1, this.#n(), D ||= this._transport.getOptionalContentConfig(Q);
              let Z = this._intentStates.get(j);
              Z || (Z = /* @__PURE__ */ Object.create(null), this._intentStates.set(j, Z)), Z.streamReaderCancelTimeout && (clearTimeout(Z.streamReaderCancelTimeout), Z.streamReaderCancelTimeout = null);
              const at = !!(Q & L.RenderingIntentFlag.PRINT);
              Z.displayReadyCapability || (Z.displayReadyCapability = Promise.withResolvers(), Z.operatorList = {
                fnArray: [],
                argsArray: [],
                lastChunk: !1,
                separateAnnots: null
              }, this._stats?.time("Page Request"), this._pumpOperatorList(X));
              const tt = (lt) => {
                Z.renderTasks.delete(J), (this._maybeCleanupAfterRender || at) && (this.#e = !0), this.#s(!at), lt ? (J.capability.reject(lt), this._abortOperatorList({
                  intentState: Z,
                  reason: lt instanceof Error ? lt : new Error(lt)
                })) : J.capability.resolve(), this._stats?.timeEnd("Rendering"), this._stats?.timeEnd("Overall");
              }, J = new e({
                callback: tt,
                params: {
                  canvasContext: a,
                  viewport: d,
                  transform: R,
                  background: k
                },
                objs: this.objs,
                commonObjs: this.commonObjs,
                annotationCanvasMap: N,
                operatorList: Z.operatorList,
                pageIndex: this._pageIndex,
                canvasFactory: this._transport.canvasFactory,
                filterFactory: this._transport.filterFactory,
                useRequestAnimationFrame: !at,
                pdfBug: this._pdfBug,
                pageColors: F
              });
              (Z.renderTasks ||= /* @__PURE__ */ new Set()).add(J);
              const nt = J.task;
              return Promise.all([Z.displayReadyCapability.promise, D]).then(([lt, bt]) => {
                if (this.destroyed) {
                  tt();
                  return;
                }
                if (this._stats?.time("Rendering"), !(bt.renderingIntent & Q))
                  throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.");
                J.initializeGraphics({
                  transparency: lt,
                  optionalContentConfig: bt
                }), J.operatorListChanged();
              }).catch(tt), nt;
            }
            getOperatorList({
              intent: a = "display",
              annotationMode: d = L.AnnotationMode.ENABLE,
              printAnnotationStorage: A = null
            } = {}) {
              function x() {
                k.operatorList.lastChunk && (k.opListReadCapability.resolve(k.operatorList), k.renderTasks.delete(D));
              }
              const R = this._transport.getRenderingIntent(a, d, A, !0);
              let k = this._intentStates.get(R.cacheKey);
              k || (k = /* @__PURE__ */ Object.create(null), this._intentStates.set(R.cacheKey, k));
              let D;
              return k.opListReadCapability || (D = /* @__PURE__ */ Object.create(null), D.operatorListChanged = x, k.opListReadCapability = Promise.withResolvers(), (k.renderTasks ||= /* @__PURE__ */ new Set()).add(D), k.operatorList = {
                fnArray: [],
                argsArray: [],
                lastChunk: !1,
                separateAnnots: null
              }, this._stats?.time("Page Request"), this._pumpOperatorList(R)), k.opListReadCapability.promise;
            }
            streamTextContent({
              includeMarkedContent: a = !1,
              disableNormalization: d = !1
            } = {}) {
              return this._transport.messageHandler.sendWithStream("GetTextContent", {
                pageIndex: this._pageIndex,
                includeMarkedContent: a === !0,
                disableNormalization: d === !0
              }, {
                highWaterMark: 100,
                size(x) {
                  return x.items.length;
                }
              });
            }
            getTextContent(a = {}) {
              if (this._transport._htmlForXfa)
                return this.getXfa().then((A) => p.XfaText.textContent(A));
              const d = this.streamTextContent(a);
              return new Promise(function(A, x) {
                function R() {
                  k.read().then(function({
                    value: N,
                    done: F
                  }) {
                    if (F) {
                      A(D);
                      return;
                    }
                    Object.assign(D.styles, N.styles), D.items.push(...N.items), R();
                  }, x);
                }
                const k = d.getReader(), D = {
                  items: [],
                  styles: /* @__PURE__ */ Object.create(null)
                };
                R();
              });
            }
            getStructTree() {
              return this._transport.getStructTree(this._pageIndex);
            }
            _destroy() {
              this.destroyed = !0;
              const a = [];
              for (const d of this._intentStates.values())
                if (this._abortOperatorList({
                  intentState: d,
                  reason: new Error("Page was destroyed."),
                  force: !0
                }), !d.opListReadCapability)
                  for (const A of d.renderTasks)
                    a.push(A.completed), A.cancel();
              return this.objs.clear(), this.#e = !1, this.#n(), Promise.all(a);
            }
            cleanup(a = !1) {
              this.#e = !0;
              const d = this.#s(!1);
              return a && d && (this._stats &&= new P.StatTimer()), d;
            }
            #s(a = !1) {
              if (this.#n(), !this.#e || this.destroyed)
                return !1;
              if (a)
                return this.#t = setTimeout(() => {
                  this.#t = null, this.#s(!1);
                }, _), !1;
              for (const {
                renderTasks: d,
                operatorList: A
              } of this._intentStates.values())
                if (d.size > 0 || !A.lastChunk)
                  return !1;
              return this._intentStates.clear(), this.objs.clear(), this.#e = !1, !0;
            }
            #n() {
              this.#t && (clearTimeout(this.#t), this.#t = null);
            }
            _startRenderPage(a, d) {
              const A = this._intentStates.get(d);
              A && (this._stats?.timeEnd("Page Request"), A.displayReadyCapability?.resolve(a));
            }
            _renderPageChunk(a, d) {
              for (let A = 0, x = a.length; A < x; A++)
                d.operatorList.fnArray.push(a.fnArray[A]), d.operatorList.argsArray.push(a.argsArray[A]);
              d.operatorList.lastChunk = a.lastChunk, d.operatorList.separateAnnots = a.separateAnnots;
              for (const A of d.renderTasks)
                A.operatorListChanged();
              a.lastChunk && this.#s(!0);
            }
            _pumpOperatorList({
              renderingIntent: a,
              cacheKey: d,
              annotationStorageSerializable: A
            }) {
              const {
                map: x,
                transfer: R
              } = A, D = this._transport.messageHandler.sendWithStream("GetOperatorList", {
                pageIndex: this._pageIndex,
                intent: a,
                cacheKey: d,
                annotationStorage: x
              }, R).getReader(), N = this._intentStates.get(d);
              N.streamReader = D;
              const F = () => {
                D.read().then(({
                  value: C,
                  done: X
                }) => {
                  if (X) {
                    N.streamReader = null;
                    return;
                  }
                  this._transport.destroyed || (this._renderPageChunk(C, N), F());
                }, (C) => {
                  if (N.streamReader = null, !this._transport.destroyed) {
                    if (N.operatorList) {
                      N.operatorList.lastChunk = !0;
                      for (const X of N.renderTasks)
                        X.operatorListChanged();
                      this.#s(!0);
                    }
                    if (N.displayReadyCapability)
                      N.displayReadyCapability.reject(C);
                    else if (N.opListReadCapability)
                      N.opListReadCapability.reject(C);
                    else
                      throw C;
                  }
                });
              };
              F();
            }
            _abortOperatorList({
              intentState: a,
              reason: d,
              force: A = !1
            }) {
              if (a.streamReader) {
                if (a.streamReaderCancelTimeout && (clearTimeout(a.streamReaderCancelTimeout), a.streamReaderCancelTimeout = null), !A) {
                  if (a.renderTasks.size > 0)
                    return;
                  if (d instanceof P.RenderingCancelledException) {
                    let x = M;
                    d.extraDelay > 0 && d.extraDelay < 1e3 && (x += d.extraDelay), a.streamReaderCancelTimeout = setTimeout(() => {
                      a.streamReaderCancelTimeout = null, this._abortOperatorList({
                        intentState: a,
                        reason: d,
                        force: !0
                      });
                    }, x);
                    return;
                  }
                }
                if (a.streamReader.cancel(new L.AbortException(d.message)).catch(() => {
                }), a.streamReader = null, !this._transport.destroyed) {
                  for (const [x, R] of this._intentStates)
                    if (R === a) {
                      this._intentStates.delete(x);
                      break;
                    }
                  this.cleanup();
                }
              }
            }
            get stats() {
              return this._stats;
            }
          }
          class mt {
            #t = /* @__PURE__ */ new Set();
            #e = Promise.resolve();
            postMessage(a, d) {
              const A = {
                data: structuredClone(a, d ? {
                  transfer: d
                } : null)
              };
              this.#e.then(() => {
                for (const x of this.#t)
                  x.call(this, A);
              });
            }
            addEventListener(a, d) {
              this.#t.add(d);
            }
            removeEventListener(a, d) {
              this.#t.delete(d);
            }
            terminate() {
              this.#t.clear();
            }
          }
          const ut = {
            isWorkerDisabled: !1,
            fakeWorkerId: 0
          };
          L.isNodeJS && (ut.isWorkerDisabled = !0, c.GlobalWorkerOptions.workerSrc ||= "./pdf.worker.mjs"), ut.isSameOrigin = function(o, a) {
            let d;
            try {
              if (d = new URL(o), !d.origin || d.origin === "null")
                return !1;
            } catch {
              return !1;
            }
            const A = new URL(a, d);
            return d.origin === A.origin;
          }, ut.createCDNWrapper = function(o) {
            const a = `await import("${o}");`;
            return URL.createObjectURL(new Blob([a], {
              type: "text/javascript"
            }));
          };
          class ht {
            static #t;
            constructor({
              name: a = null,
              port: d = null,
              verbosity: A = (0, L.getVerbosityLevel)()
            } = {}) {
              if (this.name = a, this.destroyed = !1, this.verbosity = A, this._readyCapability = Promise.withResolvers(), this._port = null, this._webWorker = null, this._messageHandler = null, d) {
                if (ht.#t?.has(d))
                  throw new Error("Cannot use more than one PDFWorker per port.");
                (ht.#t ||= /* @__PURE__ */ new WeakMap()).set(d, this), this._initializeFromPort(d);
                return;
              }
              this._initialize();
            }
            get promise() {
              return this._readyCapability.promise;
            }
            get port() {
              return this._port;
            }
            get messageHandler() {
              return this._messageHandler;
            }
            _initializeFromPort(a) {
              this._port = a, this._messageHandler = new l.MessageHandler("main", "worker", a), this._messageHandler.on("ready", function() {
              }), this._readyCapability.resolve(), this._messageHandler.send("configure", {
                verbosity: this.verbosity
              });
            }
            _initialize() {
              if (!ut.isWorkerDisabled && !ht.#e) {
                let {
                  workerSrc: a
                } = ht;
                try {
                  ut.isSameOrigin(window.location.href, a) || (a = ut.createCDNWrapper(new URL(a, window.location).href));
                  const d = new Worker(a, {
                    type: "module"
                  }), A = new l.MessageHandler("main", "worker", d), x = () => {
                    d.removeEventListener("error", R), A.destroy(), d.terminate(), this.destroyed ? this._readyCapability.reject(new Error("Worker was destroyed")) : this._setupFakeWorker();
                  }, R = () => {
                    this._webWorker || x();
                  };
                  d.addEventListener("error", R), A.on("test", (D) => {
                    if (d.removeEventListener("error", R), this.destroyed) {
                      x();
                      return;
                    }
                    D ? (this._messageHandler = A, this._port = d, this._webWorker = d, this._readyCapability.resolve(), A.send("configure", {
                      verbosity: this.verbosity
                    })) : (this._setupFakeWorker(), A.destroy(), d.terminate());
                  }), A.on("ready", (D) => {
                    if (d.removeEventListener("error", R), this.destroyed) {
                      x();
                      return;
                    }
                    try {
                      k();
                    } catch {
                      this._setupFakeWorker();
                    }
                  });
                  const k = () => {
                    const D = new Uint8Array();
                    A.send("test", D, [D.buffer]);
                  };
                  k();
                  return;
                } catch {
                  (0, L.info)("The worker has been disabled.");
                }
              }
              this._setupFakeWorker();
            }
            _setupFakeWorker() {
              ut.isWorkerDisabled || ((0, L.warn)("Setting up fake worker."), ut.isWorkerDisabled = !0), ht._setupFakeWorkerGlobal.then((a) => {
                if (this.destroyed) {
                  this._readyCapability.reject(new Error("Worker was destroyed"));
                  return;
                }
                const d = new mt();
                this._port = d;
                const A = `fake${ut.fakeWorkerId++}`, x = new l.MessageHandler(A + "_worker", A, d);
                a.setup(x, d);
                const R = new l.MessageHandler(A, A + "_worker", d);
                this._messageHandler = R, this._readyCapability.resolve(), R.send("configure", {
                  verbosity: this.verbosity
                });
              }).catch((a) => {
                this._readyCapability.reject(new Error(`Setting up fake worker failed: "${a.message}".`));
              });
            }
            destroy() {
              this.destroyed = !0, this._webWorker && (this._webWorker.terminate(), this._webWorker = null), ht.#t?.delete(this._port), this._port = null, this._messageHandler && (this._messageHandler.destroy(), this._messageHandler = null);
            }
            static fromPort(a) {
              if (!a?.port)
                throw new Error("PDFWorker.fromPort - invalid method signature.");
              const d = this.#t?.get(a.port);
              if (d) {
                if (d._pendingDestroy)
                  throw new Error("PDFWorker.fromPort - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.");
                return d;
              }
              return new ht(a);
            }
            static get workerSrc() {
              if (c.GlobalWorkerOptions.workerSrc)
                return c.GlobalWorkerOptions.workerSrc;
              throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
            }
            static get #e() {
              try {
                return globalThis.pdfjsWorker?.WorkerMessageHandler || null;
              } catch {
                return null;
              }
            }
            static get _setupFakeWorkerGlobal() {
              const a = async () => this.#e ? this.#e : (await import(
                /*webpackIgnore: true*/
                this.workerSrc
              )).WorkerMessageHandler;
              return (0, L.shadow)(this, "_setupFakeWorkerGlobal", a());
            }
          }
          class ft {
            #t = /* @__PURE__ */ new Map();
            #e = /* @__PURE__ */ new Map();
            #s = /* @__PURE__ */ new Map();
            #n = /* @__PURE__ */ new Map();
            #r = null;
            constructor(a, d, A, x, R) {
              this.messageHandler = a, this.loadingTask = d, this.commonObjs = new m(), this.fontLoader = new T.FontLoader({
                ownerDocument: x.ownerDocument,
                styleElement: x.styleElement
              }), this._params = x, this.canvasFactory = R.canvasFactory, this.filterFactory = R.filterFactory, this.cMapReaderFactory = R.cMapReaderFactory, this.standardFontDataFactory = R.standardFontDataFactory, this.destroyed = !1, this.destroyCapability = null, this._networkStream = A, this._fullReader = null, this._lastProgress = null, this.downloadInfoCapability = Promise.withResolvers(), this.setupMessageHandler();
            }
            #i(a, d = null) {
              const A = this.#t.get(a);
              if (A)
                return A;
              const x = this.messageHandler.sendWithPromise(a, d);
              return this.#t.set(a, x), x;
            }
            get annotationStorage() {
              return (0, L.shadow)(this, "annotationStorage", new G.AnnotationStorage());
            }
            getRenderingIntent(a, d = L.AnnotationMode.ENABLE, A = null, x = !1) {
              let R = L.RenderingIntentFlag.DISPLAY, k = G.SerializableEmpty;
              switch (a) {
                case "any":
                  R = L.RenderingIntentFlag.ANY;
                  break;
                case "display":
                  break;
                case "print":
                  R = L.RenderingIntentFlag.PRINT;
                  break;
                default:
                  (0, L.warn)(`getRenderingIntent - invalid intent: ${a}`);
              }
              switch (d) {
                case L.AnnotationMode.DISABLE:
                  R += L.RenderingIntentFlag.ANNOTATIONS_DISABLE;
                  break;
                case L.AnnotationMode.ENABLE:
                  break;
                case L.AnnotationMode.ENABLE_FORMS:
                  R += L.RenderingIntentFlag.ANNOTATIONS_FORMS;
                  break;
                case L.AnnotationMode.ENABLE_STORAGE:
                  R += L.RenderingIntentFlag.ANNOTATIONS_STORAGE, k = (R & L.RenderingIntentFlag.PRINT && A instanceof G.PrintAnnotationStorage ? A : this.annotationStorage).serializable;
                  break;
                default:
                  (0, L.warn)(`getRenderingIntent - invalid annotationMode: ${d}`);
              }
              return x && (R += L.RenderingIntentFlag.OPLIST), {
                renderingIntent: R,
                cacheKey: `${R}_${k.hash}`,
                annotationStorageSerializable: k
              };
            }
            destroy() {
              if (this.destroyCapability)
                return this.destroyCapability.promise;
              this.destroyed = !0, this.destroyCapability = Promise.withResolvers(), this.#r?.reject(new Error("Worker was destroyed during onPassword callback"));
              const a = [];
              for (const A of this.#e.values())
                a.push(A._destroy());
              this.#e.clear(), this.#s.clear(), this.#n.clear(), this.hasOwnProperty("annotationStorage") && this.annotationStorage.resetModified();
              const d = this.messageHandler.sendWithPromise("Terminate", null);
              return a.push(d), Promise.all(a).then(() => {
                this.commonObjs.clear(), this.fontLoader.clear(), this.#t.clear(), this.filterFactory.destroy(), (0, r.cleanupTextLayer)(), this._networkStream?.cancelAllRequests(new L.AbortException("Worker was terminated.")), this.messageHandler && (this.messageHandler.destroy(), this.messageHandler = null), this.destroyCapability.resolve();
              }, this.destroyCapability.reject), this.destroyCapability.promise;
            }
            setupMessageHandler() {
              const {
                messageHandler: a,
                loadingTask: d
              } = this;
              a.on("GetReader", (A, x) => {
                (0, L.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available."), this._fullReader = this._networkStream.getFullReader(), this._fullReader.onProgress = (R) => {
                  this._lastProgress = {
                    loaded: R.loaded,
                    total: R.total
                  };
                }, x.onPull = () => {
                  this._fullReader.read().then(function({
                    value: R,
                    done: k
                  }) {
                    if (k) {
                      x.close();
                      return;
                    }
                    (0, L.assert)(R instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."), x.enqueue(new Uint8Array(R), 1, [R]);
                  }).catch((R) => {
                    x.error(R);
                  });
                }, x.onCancel = (R) => {
                  this._fullReader.cancel(R), x.ready.catch((k) => {
                    if (!this.destroyed)
                      throw k;
                  });
                };
              }), a.on("ReaderHeadersReady", (A) => {
                const x = Promise.withResolvers(), R = this._fullReader;
                return R.headersReady.then(() => {
                  (!R.isStreamingSupported || !R.isRangeSupported) && (this._lastProgress && d.onProgress?.(this._lastProgress), R.onProgress = (k) => {
                    d.onProgress?.({
                      loaded: k.loaded,
                      total: k.total
                    });
                  }), x.resolve({
                    isStreamingSupported: R.isStreamingSupported,
                    isRangeSupported: R.isRangeSupported,
                    contentLength: R.contentLength
                  });
                }, x.reject), x.promise;
              }), a.on("GetRangeReader", (A, x) => {
                (0, L.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
                const R = this._networkStream.getRangeReader(A.begin, A.end);
                if (!R) {
                  x.close();
                  return;
                }
                x.onPull = () => {
                  R.read().then(function({
                    value: k,
                    done: D
                  }) {
                    if (D) {
                      x.close();
                      return;
                    }
                    (0, L.assert)(k instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."), x.enqueue(new Uint8Array(k), 1, [k]);
                  }).catch((k) => {
                    x.error(k);
                  });
                }, x.onCancel = (k) => {
                  R.cancel(k), x.ready.catch((D) => {
                    if (!this.destroyed)
                      throw D;
                  });
                };
              }), a.on("GetDoc", ({
                pdfInfo: A
              }) => {
                this._numPages = A.numPages, this._htmlForXfa = A.htmlForXfa, delete A.htmlForXfa, d._capability.resolve(new ot(A, this));
              }), a.on("DocException", function(A) {
                let x;
                switch (A.name) {
                  case "PasswordException":
                    x = new L.PasswordException(A.message, A.code);
                    break;
                  case "InvalidPDFException":
                    x = new L.InvalidPDFException(A.message);
                    break;
                  case "MissingPDFException":
                    x = new L.MissingPDFException(A.message);
                    break;
                  case "UnexpectedResponseException":
                    x = new L.UnexpectedResponseException(A.message, A.status);
                    break;
                  case "UnknownErrorException":
                    x = new L.UnknownErrorException(A.message, A.details);
                    break;
                  default:
                    (0, L.unreachable)("DocException - expected a valid Error.");
                }
                d._capability.reject(x);
              }), a.on("PasswordRequest", (A) => {
                if (this.#r = Promise.withResolvers(), d.onPassword) {
                  const x = (R) => {
                    R instanceof Error ? this.#r.reject(R) : this.#r.resolve({
                      password: R
                    });
                  };
                  try {
                    d.onPassword(x, A.code);
                  } catch (R) {
                    this.#r.reject(R);
                  }
                } else
                  this.#r.reject(new L.PasswordException(A.message, A.code));
                return this.#r.promise;
              }), a.on("DataLoaded", (A) => {
                d.onProgress?.({
                  loaded: A.length,
                  total: A.length
                }), this.downloadInfoCapability.resolve(A);
              }), a.on("StartRenderPage", (A) => {
                if (this.destroyed)
                  return;
                this.#e.get(A.pageIndex)._startRenderPage(A.transparency, A.cacheKey);
              }), a.on("commonobj", ([A, x, R]) => {
                if (this.destroyed || this.commonObjs.has(A))
                  return null;
                switch (x) {
                  case "Font":
                    const k = this._params;
                    if ("error" in R) {
                      const C = R.error;
                      (0, L.warn)(`Error during font loading: ${C}`), this.commonObjs.resolve(A, C);
                      break;
                    }
                    const D = k.pdfBug && globalThis.FontInspector?.enabled ? (C, X) => globalThis.FontInspector.fontAdded(C, X) : null, N = new T.FontFaceObject(R, {
                      disableFontFace: k.disableFontFace,
                      ignoreErrors: k.ignoreErrors,
                      inspectFont: D
                    });
                    this.fontLoader.bind(N).catch(() => a.sendWithPromise("FontFallback", {
                      id: A
                    })).finally(() => {
                      !k.fontExtraProperties && N.data && (N.data = null), this.commonObjs.resolve(A, N);
                    });
                    break;
                  case "CopyLocalImage":
                    const {
                      imageRef: F
                    } = R;
                    (0, L.assert)(F, "The imageRef must be defined.");
                    for (const C of this.#e.values())
                      for (const [, X] of C.objs)
                        if (X.ref === F)
                          return X.dataLen ? (this.commonObjs.resolve(A, structuredClone(X)), X.dataLen) : null;
                    break;
                  case "FontPath":
                  case "Image":
                  case "Pattern":
                    this.commonObjs.resolve(A, R);
                    break;
                  default:
                    throw new Error(`Got unknown common object type ${x}`);
                }
                return null;
              }), a.on("obj", ([A, x, R, k]) => {
                if (this.destroyed)
                  return;
                const D = this.#e.get(x);
                if (!D.objs.has(A)) {
                  if (D._intentStates.size === 0) {
                    k?.bitmap?.close();
                    return;
                  }
                  switch (R) {
                    case "Image":
                      D.objs.resolve(A, k), k?.dataLen > L.MAX_IMAGE_SIZE_TO_CACHE && (D._maybeCleanupAfterRender = !0);
                      break;
                    case "Pattern":
                      D.objs.resolve(A, k);
                      break;
                    default:
                      throw new Error(`Got unknown object type ${R}`);
                  }
                }
              }), a.on("DocProgress", (A) => {
                this.destroyed || d.onProgress?.({
                  loaded: A.loaded,
                  total: A.total
                });
              }), a.on("FetchBuiltInCMap", (A) => this.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : this.cMapReaderFactory ? this.cMapReaderFactory.fetch(A) : Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."))), a.on("FetchStandardFontData", (A) => this.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : this.standardFontDataFactory ? this.standardFontDataFactory.fetch(A) : Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter.")));
            }
            getData() {
              return this.messageHandler.sendWithPromise("GetData", null);
            }
            saveDocument() {
              this.annotationStorage.size <= 0 && (0, L.warn)("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
              const {
                map: a,
                transfer: d
              } = this.annotationStorage.serializable;
              return this.messageHandler.sendWithPromise("SaveDocument", {
                isPureXfa: !!this._htmlForXfa,
                numPages: this._numPages,
                annotationStorage: a,
                filename: this._fullReader?.filename ?? null
              }, d).finally(() => {
                this.annotationStorage.resetModified();
              });
            }
            getPage(a) {
              if (!Number.isInteger(a) || a <= 0 || a > this._numPages)
                return Promise.reject(new Error("Invalid page request."));
              const d = a - 1, A = this.#s.get(d);
              if (A)
                return A;
              const x = this.messageHandler.sendWithPromise("GetPage", {
                pageIndex: d
              }).then((R) => {
                if (this.destroyed)
                  throw new Error("Transport destroyed");
                R.refStr && this.#n.set(R.refStr, a);
                const k = new dt(d, R, this, this._params.pdfBug);
                return this.#e.set(d, k), k;
              });
              return this.#s.set(d, x), x;
            }
            getPageIndex(a) {
              return q(a) ? this.messageHandler.sendWithPromise("GetPageIndex", {
                num: a.num,
                gen: a.gen
              }) : Promise.reject(new Error("Invalid pageIndex request."));
            }
            getAnnotations(a, d) {
              return this.messageHandler.sendWithPromise("GetAnnotations", {
                pageIndex: a,
                intent: d
              });
            }
            getFieldObjects() {
              return this.#i("GetFieldObjects");
            }
            hasJSActions() {
              return this.#i("HasJSActions");
            }
            getCalculationOrderIds() {
              return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
            }
            getDestinations() {
              return this.messageHandler.sendWithPromise("GetDestinations", null);
            }
            getDestination(a) {
              return typeof a != "string" ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", {
                id: a
              });
            }
            getPageLabels() {
              return this.messageHandler.sendWithPromise("GetPageLabels", null);
            }
            getPageLayout() {
              return this.messageHandler.sendWithPromise("GetPageLayout", null);
            }
            getPageMode() {
              return this.messageHandler.sendWithPromise("GetPageMode", null);
            }
            getViewerPreferences() {
              return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
            }
            getOpenAction() {
              return this.messageHandler.sendWithPromise("GetOpenAction", null);
            }
            getAttachments() {
              return this.messageHandler.sendWithPromise("GetAttachments", null);
            }
            getDocJSActions() {
              return this.#i("GetDocJSActions");
            }
            getPageJSActions(a) {
              return this.messageHandler.sendWithPromise("GetPageJSActions", {
                pageIndex: a
              });
            }
            getStructTree(a) {
              return this.messageHandler.sendWithPromise("GetStructTree", {
                pageIndex: a
              });
            }
            getOutline() {
              return this.messageHandler.sendWithPromise("GetOutline", null);
            }
            getOptionalContentConfig(a) {
              return this.#i("GetOptionalContentConfig").then((d) => new s.OptionalContentConfig(d, a));
            }
            getPermissions() {
              return this.messageHandler.sendWithPromise("GetPermissions", null);
            }
            getMetadata() {
              const a = "GetMetadata", d = this.#t.get(a);
              if (d)
                return d;
              const A = this.messageHandler.sendWithPromise(a, null).then((x) => ({
                info: x[0],
                metadata: x[1] ? new b.Metadata(x[1]) : null,
                contentDispositionFilename: this._fullReader?.filename ?? null,
                contentLength: this._fullReader?.contentLength ?? null
              }));
              return this.#t.set(a, A), A;
            }
            getMarkInfo() {
              return this.messageHandler.sendWithPromise("GetMarkInfo", null);
            }
            async startCleanup(a = !1) {
              if (!this.destroyed) {
                await this.messageHandler.sendWithPromise("Cleanup", null);
                for (const d of this.#e.values())
                  if (!d.cleanup())
                    throw new Error(`startCleanup: Page ${d.pageNumber} is currently rendering.`);
                this.commonObjs.clear(), a || this.fontLoader.clear(), this.#t.clear(), this.filterFactory.destroy(!0), (0, r.cleanupTextLayer)();
              }
            }
            cachedPageNumber(a) {
              if (!q(a))
                return null;
              const d = a.gen === 0 ? `${a.num}R` : `${a.num}R${a.gen}`;
              return this.#n.get(d) ?? null;
            }
            get loadingParams() {
              const {
                disableAutoFetch: a,
                enableXfa: d
              } = this._params;
              return (0, L.shadow)(this, "loadingParams", {
                disableAutoFetch: a,
                enableXfa: d
              });
            }
          }
          const it = Symbol("INITIAL_DATA");
          class m {
            #t = /* @__PURE__ */ Object.create(null);
            #e(a) {
              return this.#t[a] ||= {
                ...Promise.withResolvers(),
                data: it
              };
            }
            get(a, d = null) {
              if (d) {
                const x = this.#e(a);
                return x.promise.then(() => d(x.data)), null;
              }
              const A = this.#t[a];
              if (!A || A.data === it)
                throw new Error(`Requesting object that isn't resolved yet ${a}.`);
              return A.data;
            }
            has(a) {
              const d = this.#t[a];
              return !!d && d.data !== it;
            }
            resolve(a, d = null) {
              const A = this.#e(a);
              A.data = d, A.resolve();
            }
            clear() {
              for (const a in this.#t) {
                const {
                  data: d
                } = this.#t[a];
                d?.bitmap?.close();
              }
              this.#t = /* @__PURE__ */ Object.create(null);
            }
            *[Symbol.iterator]() {
              for (const a in this.#t) {
                const {
                  data: d
                } = this.#t[a];
                d !== it && (yield [a, d]);
              }
            }
          }
          class h {
            #t = null;
            constructor(a) {
              this.#t = a, this.onContinue = null;
            }
            get promise() {
              return this.#t.capability.promise;
            }
            cancel(a = 0) {
              this.#t.cancel(null, a);
            }
            get separateAnnots() {
              const {
                separateAnnots: a
              } = this.#t.operatorList;
              if (!a)
                return !1;
              const {
                annotationCanvasMap: d
              } = this.#t;
              return a.form || a.canvas && d?.size > 0;
            }
          }
          class e {
            static #t = /* @__PURE__ */ new WeakSet();
            constructor({
              callback: a,
              params: d,
              objs: A,
              commonObjs: x,
              annotationCanvasMap: R,
              operatorList: k,
              pageIndex: D,
              canvasFactory: N,
              filterFactory: F,
              useRequestAnimationFrame: C = !1,
              pdfBug: X = !1,
              pageColors: Q = null
            }) {
              this.callback = a, this.params = d, this.objs = A, this.commonObjs = x, this.annotationCanvasMap = R, this.operatorListIdx = null, this.operatorList = k, this._pageIndex = D, this.canvasFactory = N, this.filterFactory = F, this._pdfBug = X, this.pageColors = Q, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = C === !0 && typeof window < "u", this.cancelled = !1, this.capability = Promise.withResolvers(), this.task = new h(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = d.canvasContext.canvas;
            }
            get completed() {
              return this.capability.promise.catch(function() {
              });
            }
            initializeGraphics({
              transparency: a = !1,
              optionalContentConfig: d
            }) {
              if (this.cancelled)
                return;
              if (this._canvas) {
                if (e.#t.has(this._canvas))
                  throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
                e.#t.add(this._canvas);
              }
              this._pdfBug && globalThis.StepperManager?.enabled && (this.stepper = globalThis.StepperManager.create(this._pageIndex), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
              const {
                canvasContext: A,
                viewport: x,
                transform: R,
                background: k
              } = this.params;
              this.gfx = new y.CanvasGraphics(A, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
                optionalContentConfig: d
              }, this.annotationCanvasMap, this.pageColors), this.gfx.beginDrawing({
                transform: R,
                viewport: x,
                transparency: a,
                background: k
              }), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback?.();
            }
            cancel(a = null, d = 0) {
              this.running = !1, this.cancelled = !0, this.gfx?.endDrawing(), e.#t.delete(this._canvas), this.callback(a || new P.RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, d));
            }
            operatorListChanged() {
              if (!this.graphicsReady) {
                this.graphicsReadyCallback ||= this._continueBound;
                return;
              }
              this.stepper?.updateOperatorList(this.operatorList), !this.running && this._continue();
            }
            _continue() {
              this.running = !0, !this.cancelled && (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
            }
            _scheduleNext() {
              this._useRequestAnimationFrame ? window.requestAnimationFrame(() => {
                this._nextBound().catch(this._cancelBound);
              }) : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
            }
            async _next() {
              this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), e.#t.delete(this._canvas), this.callback())));
            }
          }
          const n = "4.2.67", f = "49b388101";
          H();
        } catch (S) {
          H(S);
        }
      });
    }
  ),
  /***/
  583: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        BaseCMapReaderFactory: () => (
          /* binding */
          G
        ),
        /* harmony export */
        BaseCanvasFactory: () => (
          /* binding */
          L
        ),
        /* harmony export */
        BaseFilterFactory: () => (
          /* binding */
          H
        ),
        /* harmony export */
        BaseSVGFactory: () => (
          /* binding */
          T
        ),
        /* harmony export */
        BaseStandardFontDataFactory: () => (
          /* binding */
          P
        )
        /* harmony export */
      });
      var v = I(292);
      class H {
        constructor() {
          this.constructor === H && (0, v.unreachable)("Cannot initialize BaseFilterFactory.");
        }
        addFilter(y) {
          return "none";
        }
        addHCMFilter(y, r) {
          return "none";
        }
        addHighlightHCMFilter(y, r, c, l, b) {
          return "none";
        }
        destroy(y = !1) {
        }
      }
      class L {
        constructor() {
          this.constructor === L && (0, v.unreachable)("Cannot initialize BaseCanvasFactory.");
        }
        create(y, r) {
          if (y <= 0 || r <= 0)
            throw new Error("Invalid canvas size");
          const c = this._createCanvas(y, r);
          return {
            canvas: c,
            context: c.getContext("2d")
          };
        }
        reset(y, r, c) {
          if (!y.canvas)
            throw new Error("Canvas is not specified");
          if (r <= 0 || c <= 0)
            throw new Error("Invalid canvas size");
          y.canvas.width = r, y.canvas.height = c;
        }
        destroy(y) {
          if (!y.canvas)
            throw new Error("Canvas is not specified");
          y.canvas.width = 0, y.canvas.height = 0, y.canvas = null, y.context = null;
        }
        _createCanvas(y, r) {
          (0, v.unreachable)("Abstract method `_createCanvas` called.");
        }
      }
      class G {
        constructor({
          baseUrl: y = null,
          isCompressed: r = !0
        }) {
          this.constructor === G && (0, v.unreachable)("Cannot initialize BaseCMapReaderFactory."), this.baseUrl = y, this.isCompressed = r;
        }
        async fetch({
          name: y
        }) {
          if (!this.baseUrl)
            throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
          if (!y)
            throw new Error("CMap name must be specified.");
          const r = this.baseUrl + y + (this.isCompressed ? ".bcmap" : ""), c = this.isCompressed ? v.CMapCompressionType.BINARY : v.CMapCompressionType.NONE;
          return this._fetchData(r, c).catch((l) => {
            throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${r}`);
          });
        }
        _fetchData(y, r) {
          (0, v.unreachable)("Abstract method `_fetchData` called.");
        }
      }
      class P {
        constructor({
          baseUrl: y = null
        }) {
          this.constructor === P && (0, v.unreachable)("Cannot initialize BaseStandardFontDataFactory."), this.baseUrl = y;
        }
        async fetch({
          filename: y
        }) {
          if (!this.baseUrl)
            throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
          if (!y)
            throw new Error("Font filename must be specified.");
          const r = `${this.baseUrl}${y}`;
          return this._fetchData(r).catch((c) => {
            throw new Error(`Unable to load font data at: ${r}`);
          });
        }
        _fetchData(y) {
          (0, v.unreachable)("Abstract method `_fetchData` called.");
        }
      }
      class T {
        constructor() {
          this.constructor === T && (0, v.unreachable)("Cannot initialize BaseSVGFactory.");
        }
        create(y, r, c = !1) {
          if (y <= 0 || r <= 0)
            throw new Error("Invalid SVG dimensions");
          const l = this._createSVG("svg:svg");
          return l.setAttribute("version", "1.1"), c || (l.setAttribute("width", `${y}px`), l.setAttribute("height", `${r}px`)), l.setAttribute("preserveAspectRatio", "none"), l.setAttribute("viewBox", `0 0 ${y} ${r}`), l;
        }
        createElement(y) {
          if (typeof y != "string")
            throw new Error("Invalid SVG element type");
          return this._createSVG(y);
        }
        _createSVG(y) {
          (0, v.unreachable)("Abstract method `_createSVG` called.");
        }
      }
    }
  ),
  /***/
  923: (
    /***/
    (Y, $, I) => {
      I.d($, {
        CanvasGraphics: () => (
          /* binding */
          m
        )
      });
      var v = I(292), H = I(419);
      const L = {
        FILL: "Fill",
        STROKE: "Stroke",
        SHADING: "Shading"
      };
      function G(h, e) {
        if (!e)
          return;
        const n = e[2] - e[0], f = e[3] - e[1], o = new Path2D();
        o.rect(e[0], e[1], n, f), h.clip(o);
      }
      class P {
        constructor() {
          this.constructor === P && (0, v.unreachable)("Cannot initialize BaseShadingPattern.");
        }
        getPattern() {
          (0, v.unreachable)("Abstract method `getPattern` called.");
        }
      }
      class T extends P {
        constructor(e) {
          super(), this._type = e[1], this._bbox = e[2], this._colorStops = e[3], this._p0 = e[4], this._p1 = e[5], this._r0 = e[6], this._r1 = e[7], this.matrix = null;
        }
        _createGradient(e) {
          let n;
          this._type === "axial" ? n = e.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]) : this._type === "radial" && (n = e.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1));
          for (const f of this._colorStops)
            n.addColorStop(f[0], f[1]);
          return n;
        }
        getPattern(e, n, f, o) {
          let a;
          if (o === L.STROKE || o === L.FILL) {
            const d = n.current.getClippedPathBoundingBox(o, (0, H.getCurrentTransform)(e)) || [0, 0, 0, 0], A = Math.ceil(d[2] - d[0]) || 1, x = Math.ceil(d[3] - d[1]) || 1, R = n.cachedCanvases.getCanvas("pattern", A, x, !0), k = R.context;
            k.clearRect(0, 0, k.canvas.width, k.canvas.height), k.beginPath(), k.rect(0, 0, k.canvas.width, k.canvas.height), k.translate(-d[0], -d[1]), f = v.Util.transform(f, [1, 0, 0, 1, d[0], d[1]]), k.transform(...n.baseTransform), this.matrix && k.transform(...this.matrix), G(k, this._bbox), k.fillStyle = this._createGradient(k), k.fill(), a = e.createPattern(R.canvas, "no-repeat");
            const D = new DOMMatrix(f);
            a.setTransform(D);
          } else
            G(e, this._bbox), a = this._createGradient(e);
          return a;
        }
      }
      function E(h, e, n, f, o, a, d, A) {
        const x = e.coords, R = e.colors, k = h.data, D = h.width * 4;
        let N;
        x[n + 1] > x[f + 1] && (N = n, n = f, f = N, N = a, a = d, d = N), x[f + 1] > x[o + 1] && (N = f, f = o, o = N, N = d, d = A, A = N), x[n + 1] > x[f + 1] && (N = n, n = f, f = N, N = a, a = d, d = N);
        const F = (x[n] + e.offsetX) * e.scaleX, C = (x[n + 1] + e.offsetY) * e.scaleY, X = (x[f] + e.offsetX) * e.scaleX, Q = (x[f + 1] + e.offsetY) * e.scaleY, j = (x[o] + e.offsetX) * e.scaleX, Z = (x[o + 1] + e.offsetY) * e.scaleY;
        if (C >= Z)
          return;
        const at = R[a], tt = R[a + 1], J = R[a + 2], nt = R[d], lt = R[d + 1], bt = R[d + 2], At = R[A], yt = R[A + 1], vt = R[A + 2], Mt = Math.round(C), Et = Math.round(Z);
        let kt, wt, Ct, It, zt, Gt, Wt, Bt;
        for (let Rt = Mt; Rt <= Et; Rt++) {
          if (Rt < Q) {
            const St = Rt < C ? 0 : (C - Rt) / (C - Q);
            kt = F - (F - X) * St, wt = at - (at - nt) * St, Ct = tt - (tt - lt) * St, It = J - (J - bt) * St;
          } else {
            let St;
            Rt > Z ? St = 1 : Q === Z ? St = 0 : St = (Q - Rt) / (Q - Z), kt = X - (X - j) * St, wt = nt - (nt - At) * St, Ct = lt - (lt - yt) * St, It = bt - (bt - vt) * St;
          }
          let xt;
          Rt < C ? xt = 0 : Rt > Z ? xt = 1 : xt = (C - Rt) / (C - Z), zt = F - (F - j) * xt, Gt = at - (at - At) * xt, Wt = tt - (tt - yt) * xt, Bt = J - (J - vt) * xt;
          const qt = Math.round(Math.min(kt, zt)), Ut = Math.round(Math.max(kt, zt));
          let $t = D * Rt + qt * 4;
          for (let St = qt; St <= Ut; St++)
            xt = (kt - St) / (kt - zt), xt < 0 ? xt = 0 : xt > 1 && (xt = 1), k[$t++] = wt - (wt - Gt) * xt | 0, k[$t++] = Ct - (Ct - Wt) * xt | 0, k[$t++] = It - (It - Bt) * xt | 0, k[$t++] = 255;
        }
      }
      function y(h, e, n) {
        const f = e.coords, o = e.colors;
        let a, d;
        switch (e.type) {
          case "lattice":
            const A = e.verticesPerRow, x = Math.floor(f.length / A) - 1, R = A - 1;
            for (a = 0; a < x; a++) {
              let k = a * A;
              for (let D = 0; D < R; D++, k++)
                E(h, n, f[k], f[k + 1], f[k + A], o[k], o[k + 1], o[k + A]), E(h, n, f[k + A + 1], f[k + 1], f[k + A], o[k + A + 1], o[k + 1], o[k + A]);
            }
            break;
          case "triangles":
            for (a = 0, d = f.length; a < d; a += 3)
              E(h, n, f[a], f[a + 1], f[a + 2], o[a], o[a + 1], o[a + 2]);
            break;
          default:
            throw new Error("illegal figure");
        }
      }
      class r extends P {
        constructor(e) {
          super(), this._coords = e[2], this._colors = e[3], this._figures = e[4], this._bounds = e[5], this._bbox = e[7], this._background = e[8], this.matrix = null;
        }
        _createMeshCanvas(e, n, f) {
          const A = Math.floor(this._bounds[0]), x = Math.floor(this._bounds[1]), R = Math.ceil(this._bounds[2]) - A, k = Math.ceil(this._bounds[3]) - x, D = Math.min(Math.ceil(Math.abs(R * e[0] * 1.1)), 3e3), N = Math.min(Math.ceil(Math.abs(k * e[1] * 1.1)), 3e3), F = R / D, C = k / N, X = {
            coords: this._coords,
            colors: this._colors,
            offsetX: -A,
            offsetY: -x,
            scaleX: 1 / F,
            scaleY: 1 / C
          }, Q = D + 2 * 2, j = N + 2 * 2, Z = f.getCanvas("mesh", Q, j, !1), at = Z.context, tt = at.createImageData(D, N);
          if (n) {
            const nt = tt.data;
            for (let lt = 0, bt = nt.length; lt < bt; lt += 4)
              nt[lt] = n[0], nt[lt + 1] = n[1], nt[lt + 2] = n[2], nt[lt + 3] = 255;
          }
          for (const nt of this._figures)
            y(tt, nt, X);
          return at.putImageData(tt, 2, 2), {
            canvas: Z.canvas,
            offsetX: A - 2 * F,
            offsetY: x - 2 * C,
            scaleX: F,
            scaleY: C
          };
        }
        getPattern(e, n, f, o) {
          G(e, this._bbox);
          let a;
          if (o === L.SHADING)
            a = v.Util.singularValueDecompose2dScale((0, H.getCurrentTransform)(e));
          else if (a = v.Util.singularValueDecompose2dScale(n.baseTransform), this.matrix) {
            const A = v.Util.singularValueDecompose2dScale(this.matrix);
            a = [a[0] * A[0], a[1] * A[1]];
          }
          const d = this._createMeshCanvas(a, o === L.SHADING ? null : this._background, n.cachedCanvases);
          return o !== L.SHADING && (e.setTransform(...n.baseTransform), this.matrix && e.transform(...this.matrix)), e.translate(d.offsetX, d.offsetY), e.scale(d.scaleX, d.scaleY), e.createPattern(d.canvas, "no-repeat");
        }
      }
      class c extends P {
        getPattern() {
          return "hotpink";
        }
      }
      function l(h) {
        switch (h[0]) {
          case "RadialAxial":
            return new T(h);
          case "Mesh":
            return new r(h);
          case "Dummy":
            return new c();
        }
        throw new Error(`Unknown IR type: ${h[0]}`);
      }
      const b = {
        COLORED: 1,
        UNCOLORED: 2
      };
      class s {
        static MAX_PATTERN_SIZE = 3e3;
        constructor(e, n, f, o, a) {
          this.operatorList = e[2], this.matrix = e[3] || [1, 0, 0, 1, 0, 0], this.bbox = e[4], this.xstep = e[5], this.ystep = e[6], this.paintType = e[7], this.tilingType = e[8], this.color = n, this.ctx = f, this.canvasGraphicsFactory = o, this.baseTransform = a;
        }
        createPatternCanvas(e) {
          const n = this.operatorList, f = this.bbox, o = this.xstep, a = this.ystep, d = this.paintType, A = this.tilingType, x = this.color, R = this.canvasGraphicsFactory;
          (0, v.info)("TilingType: " + A);
          const k = f[0], D = f[1], N = f[2], F = f[3], C = v.Util.singularValueDecompose2dScale(this.matrix), X = v.Util.singularValueDecompose2dScale(this.baseTransform), Q = [C[0] * X[0], C[1] * X[1]], j = this.getSizeAndScale(o, this.ctx.canvas.width, Q[0]), Z = this.getSizeAndScale(a, this.ctx.canvas.height, Q[1]), at = e.cachedCanvases.getCanvas("pattern", j.size, Z.size, !0), tt = at.context, J = R.createCanvasGraphics(tt);
          J.groupLevel = e.groupLevel, this.setFillAndStrokeStyleToContext(J, d, x);
          let nt = k, lt = D, bt = N, At = F;
          return k < 0 && (nt = 0, bt += Math.abs(k)), D < 0 && (lt = 0, At += Math.abs(D)), tt.translate(-(j.scale * nt), -(Z.scale * lt)), J.transform(j.scale, 0, 0, Z.scale, 0, 0), tt.save(), this.clipBbox(J, nt, lt, bt, At), J.baseTransform = (0, H.getCurrentTransform)(J.ctx), J.executeOperatorList(n), J.endDrawing(), {
            canvas: at.canvas,
            scaleX: j.scale,
            scaleY: Z.scale,
            offsetX: nt,
            offsetY: lt
          };
        }
        getSizeAndScale(e, n, f) {
          e = Math.abs(e);
          const o = Math.max(s.MAX_PATTERN_SIZE, n);
          let a = Math.ceil(e * f);
          return a >= o ? a = o : f = a / e, {
            scale: f,
            size: a
          };
        }
        clipBbox(e, n, f, o, a) {
          const d = o - n, A = a - f;
          e.ctx.rect(n, f, d, A), e.current.updateRectMinMax((0, H.getCurrentTransform)(e.ctx), [n, f, o, a]), e.clip(), e.endPath();
        }
        setFillAndStrokeStyleToContext(e, n, f) {
          const o = e.ctx, a = e.current;
          switch (n) {
            case b.COLORED:
              const d = this.ctx;
              o.fillStyle = d.fillStyle, o.strokeStyle = d.strokeStyle, a.fillColor = d.fillStyle, a.strokeColor = d.strokeStyle;
              break;
            case b.UNCOLORED:
              const A = v.Util.makeHexColor(f[0], f[1], f[2]);
              o.fillStyle = A, o.strokeStyle = A, a.fillColor = A, a.strokeColor = A;
              break;
            default:
              throw new v.FormatError(`Unsupported paint type: ${n}`);
          }
        }
        getPattern(e, n, f, o) {
          let a = f;
          o !== L.SHADING && (a = v.Util.transform(a, n.baseTransform), this.matrix && (a = v.Util.transform(a, this.matrix)));
          const d = this.createPatternCanvas(n);
          let A = new DOMMatrix(a);
          A = A.translate(d.offsetX, d.offsetY), A = A.scale(1 / d.scaleX, 1 / d.scaleY);
          const x = e.createPattern(d.canvas, "repeat");
          return x.setTransform(A), x;
        }
      }
      function g({
        src: h,
        srcPos: e = 0,
        dest: n,
        width: f,
        height: o,
        nonBlackColor: a = 4294967295,
        inverseDecode: d = !1
      }) {
        const A = v.FeatureTest.isLittleEndian ? 4278190080 : 255, [x, R] = d ? [a, A] : [A, a], k = f >> 3, D = f & 7, N = h.length;
        n = new Uint32Array(n.buffer);
        let F = 0;
        for (let C = 0; C < o; C++) {
          for (const Q = e + k; e < Q; e++) {
            const j = e < N ? h[e] : 255;
            n[F++] = j & 128 ? R : x, n[F++] = j & 64 ? R : x, n[F++] = j & 32 ? R : x, n[F++] = j & 16 ? R : x, n[F++] = j & 8 ? R : x, n[F++] = j & 4 ? R : x, n[F++] = j & 2 ? R : x, n[F++] = j & 1 ? R : x;
          }
          if (D === 0)
            continue;
          const X = e < N ? h[e++] : 255;
          for (let Q = 0; Q < D; Q++)
            n[F++] = X & 1 << 7 - Q ? R : x;
        }
        return {
          srcPos: e,
          destPos: F
        };
      }
      const t = 16, i = 100, u = 4096, p = 15, w = 10, S = 1e3, M = 16;
      function _(h, e) {
        if (h._removeMirroring)
          throw new Error("Context is already forwarding operations.");
        h.__originalSave = h.save, h.__originalRestore = h.restore, h.__originalRotate = h.rotate, h.__originalScale = h.scale, h.__originalTranslate = h.translate, h.__originalTransform = h.transform, h.__originalSetTransform = h.setTransform, h.__originalResetTransform = h.resetTransform, h.__originalClip = h.clip, h.__originalMoveTo = h.moveTo, h.__originalLineTo = h.lineTo, h.__originalBezierCurveTo = h.bezierCurveTo, h.__originalRect = h.rect, h.__originalClosePath = h.closePath, h.__originalBeginPath = h.beginPath, h._removeMirroring = () => {
          h.save = h.__originalSave, h.restore = h.__originalRestore, h.rotate = h.__originalRotate, h.scale = h.__originalScale, h.translate = h.__originalTranslate, h.transform = h.__originalTransform, h.setTransform = h.__originalSetTransform, h.resetTransform = h.__originalResetTransform, h.clip = h.__originalClip, h.moveTo = h.__originalMoveTo, h.lineTo = h.__originalLineTo, h.bezierCurveTo = h.__originalBezierCurveTo, h.rect = h.__originalRect, h.closePath = h.__originalClosePath, h.beginPath = h.__originalBeginPath, delete h._removeMirroring;
        }, h.save = function() {
          e.save(), this.__originalSave();
        }, h.restore = function() {
          e.restore(), this.__originalRestore();
        }, h.translate = function(f, o) {
          e.translate(f, o), this.__originalTranslate(f, o);
        }, h.scale = function(f, o) {
          e.scale(f, o), this.__originalScale(f, o);
        }, h.transform = function(f, o, a, d, A, x) {
          e.transform(f, o, a, d, A, x), this.__originalTransform(f, o, a, d, A, x);
        }, h.setTransform = function(f, o, a, d, A, x) {
          e.setTransform(f, o, a, d, A, x), this.__originalSetTransform(f, o, a, d, A, x);
        }, h.resetTransform = function() {
          e.resetTransform(), this.__originalResetTransform();
        }, h.rotate = function(f) {
          e.rotate(f), this.__originalRotate(f);
        }, h.clip = function(f) {
          e.clip(f), this.__originalClip(f);
        }, h.moveTo = function(n, f) {
          e.moveTo(n, f), this.__originalMoveTo(n, f);
        }, h.lineTo = function(n, f) {
          e.lineTo(n, f), this.__originalLineTo(n, f);
        }, h.bezierCurveTo = function(n, f, o, a, d, A) {
          e.bezierCurveTo(n, f, o, a, d, A), this.__originalBezierCurveTo(n, f, o, a, d, A);
        }, h.rect = function(n, f, o, a) {
          e.rect(n, f, o, a), this.__originalRect(n, f, o, a);
        }, h.closePath = function() {
          e.closePath(), this.__originalClosePath();
        }, h.beginPath = function() {
          e.beginPath(), this.__originalBeginPath();
        };
      }
      class O {
        constructor(e) {
          this.canvasFactory = e, this.cache = /* @__PURE__ */ Object.create(null);
        }
        getCanvas(e, n, f) {
          let o;
          return this.cache[e] !== void 0 ? (o = this.cache[e], this.canvasFactory.reset(o, n, f)) : (o = this.canvasFactory.create(n, f), this.cache[e] = o), o;
        }
        delete(e) {
          delete this.cache[e];
        }
        clear() {
          for (const e in this.cache) {
            const n = this.cache[e];
            this.canvasFactory.destroy(n), delete this.cache[e];
          }
        }
      }
      function B(h, e, n, f, o, a, d, A, x, R) {
        const [k, D, N, F, C, X] = (0, H.getCurrentTransform)(h);
        if (D === 0 && N === 0) {
          const Z = d * k + C, at = Math.round(Z), tt = A * F + X, J = Math.round(tt), nt = (d + x) * k + C, lt = Math.abs(Math.round(nt) - at) || 1, bt = (A + R) * F + X, At = Math.abs(Math.round(bt) - J) || 1;
          return h.setTransform(Math.sign(k), 0, 0, Math.sign(F), at, J), h.drawImage(e, n, f, o, a, 0, 0, lt, At), h.setTransform(k, D, N, F, C, X), [lt, At];
        }
        if (k === 0 && F === 0) {
          const Z = A * N + C, at = Math.round(Z), tt = d * D + X, J = Math.round(tt), nt = (A + R) * N + C, lt = Math.abs(Math.round(nt) - at) || 1, bt = (d + x) * D + X, At = Math.abs(Math.round(bt) - J) || 1;
          return h.setTransform(0, Math.sign(D), Math.sign(N), 0, at, J), h.drawImage(e, n, f, o, a, 0, 0, At, lt), h.setTransform(k, D, N, F, C, X), [At, lt];
        }
        h.drawImage(e, n, f, o, a, d, A, x, R);
        const Q = Math.hypot(k, D), j = Math.hypot(N, F);
        return [Q * x, j * R];
      }
      function U(h) {
        const {
          width: e,
          height: n
        } = h;
        if (e > S || n > S)
          return null;
        const f = 1e3, o = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]), a = e + 1;
        let d = new Uint8Array(a * (n + 1)), A, x, R;
        const k = e + 7 & -8;
        let D = new Uint8Array(k * n), N = 0;
        for (const j of h.data) {
          let Z = 128;
          for (; Z > 0; )
            D[N++] = j & Z ? 0 : 255, Z >>= 1;
        }
        let F = 0;
        for (N = 0, D[N] !== 0 && (d[0] = 1, ++F), x = 1; x < e; x++)
          D[N] !== D[N + 1] && (d[x] = D[N] ? 2 : 1, ++F), N++;
        for (D[N] !== 0 && (d[x] = 2, ++F), A = 1; A < n; A++) {
          N = A * k, R = A * a, D[N - k] !== D[N] && (d[R] = D[N] ? 1 : 8, ++F);
          let j = (D[N] ? 4 : 0) + (D[N - k] ? 8 : 0);
          for (x = 1; x < e; x++)
            j = (j >> 2) + (D[N + 1] ? 4 : 0) + (D[N - k + 1] ? 8 : 0), o[j] && (d[R + x] = o[j], ++F), N++;
          if (D[N - k] !== D[N] && (d[R + x] = D[N] ? 2 : 4, ++F), F > f)
            return null;
        }
        for (N = k * (n - 1), R = A * a, D[N] !== 0 && (d[R] = 8, ++F), x = 1; x < e; x++)
          D[N] !== D[N + 1] && (d[R + x] = D[N] ? 4 : 8, ++F), N++;
        if (D[N] !== 0 && (d[R + x] = 4, ++F), F > f)
          return null;
        const C = new Int32Array([0, a, -1, 0, -a, 0, 0, 0, 1]), X = new Path2D();
        for (A = 0; F && A <= n; A++) {
          let j = A * a;
          const Z = j + e;
          for (; j < Z && !d[j]; )
            j++;
          if (j === Z)
            continue;
          X.moveTo(j % a, A);
          const at = j;
          let tt = d[j];
          do {
            const J = C[tt];
            do
              j += J;
            while (!d[j]);
            const nt = d[j];
            nt !== 5 && nt !== 10 ? (tt = nt, d[j] = 0) : (tt = nt & 51 * tt >> 4, d[j] &= tt >> 2 | tt << 2), X.lineTo(j % a, j / a | 0), d[j] || --F;
          } while (at !== j);
          --A;
        }
        return D = null, d = null, function(j) {
          j.save(), j.scale(1 / e, -1 / n), j.translate(0, -n), j.fill(X), j.beginPath(), j.restore();
        };
      }
      class K {
        constructor(e, n) {
          this.alphaIsShape = !1, this.fontSize = 0, this.fontSizeScale = 1, this.textMatrix = v.IDENTITY_MATRIX, this.textMatrixScale = 1, this.fontMatrix = v.FONT_IDENTITY_MATRIX, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRenderingMode = v.TextRenderingMode.FILL, this.textRise = 0, this.fillColor = "#000000", this.strokeColor = "#000000", this.patternFill = !1, this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.activeSMask = null, this.transferMaps = "none", this.startNewPathAndClipBox([0, 0, e, n]);
        }
        clone() {
          const e = Object.create(this);
          return e.clipBox = this.clipBox.slice(), e;
        }
        setCurrentPoint(e, n) {
          this.x = e, this.y = n;
        }
        updatePathMinMax(e, n, f) {
          [n, f] = v.Util.applyTransform([n, f], e), this.minX = Math.min(this.minX, n), this.minY = Math.min(this.minY, f), this.maxX = Math.max(this.maxX, n), this.maxY = Math.max(this.maxY, f);
        }
        updateRectMinMax(e, n) {
          const f = v.Util.applyTransform(n, e), o = v.Util.applyTransform(n.slice(2), e), a = v.Util.applyTransform([n[0], n[3]], e), d = v.Util.applyTransform([n[2], n[1]], e);
          this.minX = Math.min(this.minX, f[0], o[0], a[0], d[0]), this.minY = Math.min(this.minY, f[1], o[1], a[1], d[1]), this.maxX = Math.max(this.maxX, f[0], o[0], a[0], d[0]), this.maxY = Math.max(this.maxY, f[1], o[1], a[1], d[1]);
        }
        updateScalingPathMinMax(e, n) {
          v.Util.scaleMinMax(e, n), this.minX = Math.min(this.minX, n[0]), this.minY = Math.min(this.minY, n[1]), this.maxX = Math.max(this.maxX, n[2]), this.maxY = Math.max(this.maxY, n[3]);
        }
        updateCurvePathMinMax(e, n, f, o, a, d, A, x, R, k) {
          const D = v.Util.bezierBoundingBox(n, f, o, a, d, A, x, R, k);
          k || this.updateRectMinMax(e, D);
        }
        getPathBoundingBox(e = L.FILL, n = null) {
          const f = [this.minX, this.minY, this.maxX, this.maxY];
          if (e === L.STROKE) {
            n || (0, v.unreachable)("Stroke bounding box must include transform.");
            const o = v.Util.singularValueDecompose2dScale(n), a = o[0] * this.lineWidth / 2, d = o[1] * this.lineWidth / 2;
            f[0] -= a, f[1] -= d, f[2] += a, f[3] += d;
          }
          return f;
        }
        updateClipFromPath() {
          const e = v.Util.intersect(this.clipBox, this.getPathBoundingBox());
          this.startNewPathAndClipBox(e || [0, 0, 0, 0]);
        }
        isEmptyClip() {
          return this.minX === 1 / 0;
        }
        startNewPathAndClipBox(e) {
          this.clipBox = e, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = 0, this.maxY = 0;
        }
        getClippedPathBoundingBox(e = L.FILL, n = null) {
          return v.Util.intersect(this.clipBox, this.getPathBoundingBox(e, n));
        }
      }
      function rt(h, e) {
        if (typeof ImageData < "u" && e instanceof ImageData) {
          h.putImageData(e, 0, 0);
          return;
        }
        const n = e.height, f = e.width, o = n % M, a = (n - o) / M, d = o === 0 ? a : a + 1, A = h.createImageData(f, M);
        let x = 0, R;
        const k = e.data, D = A.data;
        let N, F, C, X;
        if (e.kind === v.ImageKind.GRAYSCALE_1BPP) {
          const Q = k.byteLength, j = new Uint32Array(D.buffer, 0, D.byteLength >> 2), Z = j.length, at = f + 7 >> 3, tt = 4294967295, J = v.FeatureTest.isLittleEndian ? 4278190080 : 255;
          for (N = 0; N < d; N++) {
            for (C = N < a ? M : o, R = 0, F = 0; F < C; F++) {
              const nt = Q - x;
              let lt = 0;
              const bt = nt > at ? f : nt * 8 - 7, At = bt & -8;
              let yt = 0, vt = 0;
              for (; lt < At; lt += 8)
                vt = k[x++], j[R++] = vt & 128 ? tt : J, j[R++] = vt & 64 ? tt : J, j[R++] = vt & 32 ? tt : J, j[R++] = vt & 16 ? tt : J, j[R++] = vt & 8 ? tt : J, j[R++] = vt & 4 ? tt : J, j[R++] = vt & 2 ? tt : J, j[R++] = vt & 1 ? tt : J;
              for (; lt < bt; lt++)
                yt === 0 && (vt = k[x++], yt = 128), j[R++] = vt & yt ? tt : J, yt >>= 1;
            }
            for (; R < Z; )
              j[R++] = 0;
            h.putImageData(A, 0, N * M);
          }
        } else if (e.kind === v.ImageKind.RGBA_32BPP) {
          for (F = 0, X = f * M * 4, N = 0; N < a; N++)
            D.set(k.subarray(x, x + X)), x += X, h.putImageData(A, 0, F), F += M;
          N < d && (X = f * o * 4, D.set(k.subarray(x, x + X)), h.putImageData(A, 0, F));
        } else if (e.kind === v.ImageKind.RGB_24BPP)
          for (C = M, X = f * C, N = 0; N < d; N++) {
            for (N >= a && (C = o, X = f * C), R = 0, F = X; F--; )
              D[R++] = k[x++], D[R++] = k[x++], D[R++] = k[x++], D[R++] = 255;
            h.putImageData(A, 0, N * M);
          }
        else
          throw new Error(`bad image kind: ${e.kind}`);
      }
      function W(h, e) {
        if (e.bitmap) {
          h.drawImage(e.bitmap, 0, 0);
          return;
        }
        const n = e.height, f = e.width, o = n % M, a = (n - o) / M, d = o === 0 ? a : a + 1, A = h.createImageData(f, M);
        let x = 0;
        const R = e.data, k = A.data;
        for (let D = 0; D < d; D++) {
          const N = D < a ? M : o;
          ({
            srcPos: x
          } = g({
            src: R,
            srcPos: x,
            dest: k,
            width: f,
            height: N,
            nonBlackColor: 0
          })), h.putImageData(A, 0, D * M);
        }
      }
      function z(h, e) {
        const n = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
        for (const f of n)
          h[f] !== void 0 && (e[f] = h[f]);
        h.setLineDash !== void 0 && (e.setLineDash(h.getLineDash()), e.lineDashOffset = h.lineDashOffset);
      }
      function V(h) {
        if (h.strokeStyle = h.fillStyle = "#000000", h.fillRule = "nonzero", h.globalAlpha = 1, h.lineWidth = 1, h.lineCap = "butt", h.lineJoin = "miter", h.miterLimit = 10, h.globalCompositeOperation = "source-over", h.font = "10px sans-serif", h.setLineDash !== void 0 && (h.setLineDash([]), h.lineDashOffset = 0), !v.isNodeJS) {
          const {
            filter: e
          } = h;
          e !== "none" && e !== "" && (h.filter = "none");
        }
      }
      function q(h, e, n, f) {
        const o = h.length;
        for (let a = 3; a < o; a += 4) {
          const d = h[a];
          if (d === 0)
            h[a - 3] = e, h[a - 2] = n, h[a - 1] = f;
          else if (d < 255) {
            const A = 255 - d;
            h[a - 3] = h[a - 3] * d + e * A >> 8, h[a - 2] = h[a - 2] * d + n * A >> 8, h[a - 1] = h[a - 1] * d + f * A >> 8;
          }
        }
      }
      function st(h, e, n) {
        const f = h.length, o = 1 / 255;
        for (let a = 3; a < f; a += 4) {
          const d = n ? n[h[a]] : h[a];
          e[a] = e[a] * d * o | 0;
        }
      }
      function et(h, e, n) {
        const f = h.length;
        for (let o = 3; o < f; o += 4) {
          const a = h[o - 3] * 77 + h[o - 2] * 152 + h[o - 1] * 28;
          e[o] = n ? e[o] * n[a >> 8] >> 8 : e[o] * a >> 16;
        }
      }
      function ot(h, e, n, f, o, a, d, A, x, R, k) {
        const D = !!a, N = D ? a[0] : 0, F = D ? a[1] : 0, C = D ? a[2] : 0, X = o === "Luminosity" ? et : st, j = Math.min(f, Math.ceil(1048576 / n));
        for (let Z = 0; Z < f; Z += j) {
          const at = Math.min(j, f - Z), tt = h.getImageData(A - R, Z + (x - k), n, at), J = e.getImageData(A, Z + x, n, at);
          D && q(tt.data, N, F, C), X(tt.data, J.data, d), e.putImageData(J, A, Z + x);
        }
      }
      function dt(h, e, n, f) {
        const o = f[0], a = f[1], d = f[2] - o, A = f[3] - a;
        d === 0 || A === 0 || (ot(e.context, n, d, A, e.subtype, e.backdrop, e.transferMap, o, a, e.offsetX, e.offsetY), h.save(), h.globalAlpha = 1, h.globalCompositeOperation = "source-over", h.setTransform(1, 0, 0, 1, 0, 0), h.drawImage(n.canvas, 0, 0), h.restore());
      }
      function mt(h, e) {
        if (e)
          return !0;
        const n = v.Util.singularValueDecompose2dScale(h);
        n[0] = Math.fround(n[0]), n[1] = Math.fround(n[1]);
        const f = Math.fround((globalThis.devicePixelRatio || 1) * H.PixelsPerInch.PDF_TO_CSS_UNITS);
        return n[0] <= f && n[1] <= f;
      }
      const ut = ["butt", "round", "square"], ht = ["miter", "round", "bevel"], ft = {}, it = {};
      class m {
        constructor(e, n, f, o, a, {
          optionalContentConfig: d,
          markedContentStack: A = null
        }, x, R) {
          this.ctx = e, this.current = new K(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.res = null, this.xobjs = null, this.commonObjs = n, this.objs = f, this.canvasFactory = o, this.filterFactory = a, this.groupStack = [], this.processingType3 = null, this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = A || [], this.optionalContentConfig = d, this.cachedCanvases = new O(this.canvasFactory), this.cachedPatterns = /* @__PURE__ */ new Map(), this.annotationCanvasMap = x, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, this.pageColors = R, this._cachedScaleForStroking = [-1, 0], this._cachedGetSinglePixelWidth = null, this._cachedBitmapsMap = /* @__PURE__ */ new Map();
        }
        getObject(e, n = null) {
          return typeof e == "string" ? e.startsWith("g_") ? this.commonObjs.get(e) : this.objs.get(e) : n;
        }
        beginDrawing({
          transform: e,
          viewport: n,
          transparency: f = !1,
          background: o = null
        }) {
          const a = this.ctx.canvas.width, d = this.ctx.canvas.height, A = this.ctx.fillStyle;
          if (this.ctx.fillStyle = o || "#ffffff", this.ctx.fillRect(0, 0, a, d), this.ctx.fillStyle = A, f) {
            const x = this.cachedCanvases.getCanvas("transparent", a, d);
            this.compositeCtx = this.ctx, this.transparentCanvas = x.canvas, this.ctx = x.context, this.ctx.save(), this.ctx.transform(...(0, H.getCurrentTransform)(this.compositeCtx));
          }
          this.ctx.save(), V(this.ctx), e && (this.ctx.transform(...e), this.outputScaleX = e[0], this.outputScaleY = e[0]), this.ctx.transform(...n.transform), this.viewportScale = n.scale, this.baseTransform = (0, H.getCurrentTransform)(this.ctx);
        }
        executeOperatorList(e, n, f, o) {
          const a = e.argsArray, d = e.fnArray;
          let A = n || 0;
          const x = a.length;
          if (x === A)
            return A;
          const R = x - A > w && typeof f == "function", k = R ? Date.now() + p : 0;
          let D = 0;
          const N = this.commonObjs, F = this.objs;
          let C;
          for (; ; ) {
            if (o !== void 0 && A === o.nextBreakPoint)
              return o.breakIt(A, f), A;
            if (C = d[A], C !== v.OPS.dependency)
              this[C].apply(this, a[A]);
            else
              for (const X of a[A]) {
                const Q = X.startsWith("g_") ? N : F;
                if (!Q.has(X))
                  return Q.get(X, f), A;
              }
            if (A++, A === x)
              return A;
            if (R && ++D > w) {
              if (Date.now() > k)
                return f(), A;
              D = 0;
            }
          }
        }
        #t() {
          for (; this.stateStack.length || this.inSMaskMode; )
            this.restore();
          this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.transparentCanvas = null);
        }
        endDrawing() {
          this.#t(), this.cachedCanvases.clear(), this.cachedPatterns.clear();
          for (const e of this._cachedBitmapsMap.values()) {
            for (const n of e.values())
              typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement && (n.width = n.height = 0);
            e.clear();
          }
          this._cachedBitmapsMap.clear(), this.#e();
        }
        #e() {
          if (this.pageColors) {
            const e = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
            if (e !== "none") {
              const n = this.ctx.filter;
              this.ctx.filter = e, this.ctx.drawImage(this.ctx.canvas, 0, 0), this.ctx.filter = n;
            }
          }
        }
        _scaleImage(e, n) {
          const f = e.width, o = e.height;
          let a = Math.max(Math.hypot(n[0], n[1]), 1), d = Math.max(Math.hypot(n[2], n[3]), 1), A = f, x = o, R = "prescale1", k, D;
          for (; a > 2 && A > 1 || d > 2 && x > 1; ) {
            let N = A, F = x;
            a > 2 && A > 1 && (N = A >= 16384 ? Math.floor(A / 2) - 1 || 1 : Math.ceil(A / 2), a /= A / N), d > 2 && x > 1 && (F = x >= 16384 ? Math.floor(x / 2) - 1 || 1 : Math.ceil(x) / 2, d /= x / F), k = this.cachedCanvases.getCanvas(R, N, F), D = k.context, D.clearRect(0, 0, N, F), D.drawImage(e, 0, 0, A, x, 0, 0, N, F), e = k.canvas, A = N, x = F, R = R === "prescale1" ? "prescale2" : "prescale1";
          }
          return {
            img: e,
            paintWidth: A,
            paintHeight: x
          };
        }
        _createMaskCanvas(e) {
          const n = this.ctx, {
            width: f,
            height: o
          } = e, a = this.current.fillColor, d = this.current.patternFill, A = (0, H.getCurrentTransform)(n);
          let x, R, k, D;
          if ((e.bitmap || e.data) && e.count > 1) {
            const bt = e.bitmap || e.data.buffer;
            R = JSON.stringify(d ? A : [A.slice(0, 4), a]), x = this._cachedBitmapsMap.get(bt), x || (x = /* @__PURE__ */ new Map(), this._cachedBitmapsMap.set(bt, x));
            const At = x.get(R);
            if (At && !d) {
              const yt = Math.round(Math.min(A[0], A[2]) + A[4]), vt = Math.round(Math.min(A[1], A[3]) + A[5]);
              return {
                canvas: At,
                offsetX: yt,
                offsetY: vt
              };
            }
            k = At;
          }
          k || (D = this.cachedCanvases.getCanvas("maskCanvas", f, o), W(D.context, e));
          let N = v.Util.transform(A, [1 / f, 0, 0, -1 / o, 0, 0]);
          N = v.Util.transform(N, [1, 0, 0, 1, 0, -o]);
          const [F, C, X, Q] = v.Util.getAxialAlignedBoundingBox([0, 0, f, o], N), j = Math.round(X - F) || 1, Z = Math.round(Q - C) || 1, at = this.cachedCanvases.getCanvas("fillCanvas", j, Z), tt = at.context, J = F, nt = C;
          tt.translate(-J, -nt), tt.transform(...N), k || (k = this._scaleImage(D.canvas, (0, H.getCurrentTransformInverse)(tt)), k = k.img, x && d && x.set(R, k)), tt.imageSmoothingEnabled = mt((0, H.getCurrentTransform)(tt), e.interpolate), B(tt, k, 0, 0, k.width, k.height, 0, 0, f, o), tt.globalCompositeOperation = "source-in";
          const lt = v.Util.transform((0, H.getCurrentTransformInverse)(tt), [1, 0, 0, 1, -J, -nt]);
          return tt.fillStyle = d ? a.getPattern(n, this, lt, L.FILL) : a, tt.fillRect(0, 0, f, o), x && !d && (this.cachedCanvases.delete("fillCanvas"), x.set(R, at.canvas)), {
            canvas: at.canvas,
            offsetX: Math.round(J),
            offsetY: Math.round(nt)
          };
        }
        setLineWidth(e) {
          e !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1), this.current.lineWidth = e, this.ctx.lineWidth = e;
        }
        setLineCap(e) {
          this.ctx.lineCap = ut[e];
        }
        setLineJoin(e) {
          this.ctx.lineJoin = ht[e];
        }
        setMiterLimit(e) {
          this.ctx.miterLimit = e;
        }
        setDash(e, n) {
          const f = this.ctx;
          f.setLineDash !== void 0 && (f.setLineDash(e), f.lineDashOffset = n);
        }
        setRenderingIntent(e) {
        }
        setFlatness(e) {
        }
        setGState(e) {
          for (const [n, f] of e)
            switch (n) {
              case "LW":
                this.setLineWidth(f);
                break;
              case "LC":
                this.setLineCap(f);
                break;
              case "LJ":
                this.setLineJoin(f);
                break;
              case "ML":
                this.setMiterLimit(f);
                break;
              case "D":
                this.setDash(f[0], f[1]);
                break;
              case "RI":
                this.setRenderingIntent(f);
                break;
              case "FL":
                this.setFlatness(f);
                break;
              case "Font":
                this.setFont(f[0], f[1]);
                break;
              case "CA":
                this.current.strokeAlpha = f;
                break;
              case "ca":
                this.current.fillAlpha = f, this.ctx.globalAlpha = f;
                break;
              case "BM":
                this.ctx.globalCompositeOperation = f;
                break;
              case "SMask":
                this.current.activeSMask = f ? this.tempSMask : null, this.tempSMask = null, this.checkSMaskState();
                break;
              case "TR":
                this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(f);
                break;
            }
        }
        get inSMaskMode() {
          return !!this.suspendedCtx;
        }
        checkSMaskState() {
          const e = this.inSMaskMode;
          this.current.activeSMask && !e ? this.beginSMaskMode() : !this.current.activeSMask && e && this.endSMaskMode();
        }
        beginSMaskMode() {
          if (this.inSMaskMode)
            throw new Error("beginSMaskMode called while already in smask mode");
          const e = this.ctx.canvas.width, n = this.ctx.canvas.height, f = "smaskGroupAt" + this.groupLevel, o = this.cachedCanvases.getCanvas(f, e, n);
          this.suspendedCtx = this.ctx, this.ctx = o.context;
          const a = this.ctx;
          a.setTransform(...(0, H.getCurrentTransform)(this.suspendedCtx)), z(this.suspendedCtx, a), _(a, this.suspendedCtx), this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
        }
        endSMaskMode() {
          if (!this.inSMaskMode)
            throw new Error("endSMaskMode called while not in smask mode");
          this.ctx._removeMirroring(), z(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.suspendedCtx = null;
        }
        compose(e) {
          if (!this.current.activeSMask)
            return;
          e ? (e[0] = Math.floor(e[0]), e[1] = Math.floor(e[1]), e[2] = Math.ceil(e[2]), e[3] = Math.ceil(e[3])) : e = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
          const n = this.current.activeSMask, f = this.suspendedCtx;
          dt(f, n, this.ctx, e), this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore();
        }
        save() {
          this.inSMaskMode ? (z(this.ctx, this.suspendedCtx), this.suspendedCtx.save()) : this.ctx.save();
          const e = this.current;
          this.stateStack.push(e), this.current = e.clone();
        }
        restore() {
          this.stateStack.length === 0 && this.inSMaskMode && this.endSMaskMode(), this.stateStack.length !== 0 && (this.current = this.stateStack.pop(), this.inSMaskMode ? (this.suspendedCtx.restore(), z(this.suspendedCtx, this.ctx)) : this.ctx.restore(), this.checkSMaskState(), this.pendingClip = null, this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null);
        }
        transform(e, n, f, o, a, d) {
          this.ctx.transform(e, n, f, o, a, d), this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
        }
        constructPath(e, n, f) {
          const o = this.ctx, a = this.current;
          let d = a.x, A = a.y, x, R;
          const k = (0, H.getCurrentTransform)(o), D = k[0] === 0 && k[3] === 0 || k[1] === 0 && k[2] === 0, N = D ? f.slice(0) : null;
          for (let F = 0, C = 0, X = e.length; F < X; F++)
            switch (e[F] | 0) {
              case v.OPS.rectangle:
                d = n[C++], A = n[C++];
                const Q = n[C++], j = n[C++], Z = d + Q, at = A + j;
                o.moveTo(d, A), Q === 0 || j === 0 ? o.lineTo(Z, at) : (o.lineTo(Z, A), o.lineTo(Z, at), o.lineTo(d, at)), D || a.updateRectMinMax(k, [d, A, Z, at]), o.closePath();
                break;
              case v.OPS.moveTo:
                d = n[C++], A = n[C++], o.moveTo(d, A), D || a.updatePathMinMax(k, d, A);
                break;
              case v.OPS.lineTo:
                d = n[C++], A = n[C++], o.lineTo(d, A), D || a.updatePathMinMax(k, d, A);
                break;
              case v.OPS.curveTo:
                x = d, R = A, d = n[C + 4], A = n[C + 5], o.bezierCurveTo(n[C], n[C + 1], n[C + 2], n[C + 3], d, A), a.updateCurvePathMinMax(k, x, R, n[C], n[C + 1], n[C + 2], n[C + 3], d, A, N), C += 6;
                break;
              case v.OPS.curveTo2:
                x = d, R = A, o.bezierCurveTo(d, A, n[C], n[C + 1], n[C + 2], n[C + 3]), a.updateCurvePathMinMax(k, x, R, d, A, n[C], n[C + 1], n[C + 2], n[C + 3], N), d = n[C + 2], A = n[C + 3], C += 4;
                break;
              case v.OPS.curveTo3:
                x = d, R = A, d = n[C + 2], A = n[C + 3], o.bezierCurveTo(n[C], n[C + 1], d, A, d, A), a.updateCurvePathMinMax(k, x, R, n[C], n[C + 1], d, A, d, A, N), C += 4;
                break;
              case v.OPS.closePath:
                o.closePath();
                break;
            }
          D && a.updateScalingPathMinMax(k, N), a.setCurrentPoint(d, A);
        }
        closePath() {
          this.ctx.closePath();
        }
        stroke(e = !0) {
          const n = this.ctx, f = this.current.strokeColor;
          n.globalAlpha = this.current.strokeAlpha, this.contentVisible && (typeof f == "object" && f?.getPattern ? (n.save(), n.strokeStyle = f.getPattern(n, this, (0, H.getCurrentTransformInverse)(n), L.STROKE), this.rescaleAndStroke(!1), n.restore()) : this.rescaleAndStroke(!0)), e && this.consumePath(this.current.getClippedPathBoundingBox()), n.globalAlpha = this.current.fillAlpha;
        }
        closeStroke() {
          this.closePath(), this.stroke();
        }
        fill(e = !0) {
          const n = this.ctx, f = this.current.fillColor, o = this.current.patternFill;
          let a = !1;
          o && (n.save(), n.fillStyle = f.getPattern(n, this, (0, H.getCurrentTransformInverse)(n), L.FILL), a = !0);
          const d = this.current.getClippedPathBoundingBox();
          this.contentVisible && d !== null && (this.pendingEOFill ? (n.fill("evenodd"), this.pendingEOFill = !1) : n.fill()), a && n.restore(), e && this.consumePath(d);
        }
        eoFill() {
          this.pendingEOFill = !0, this.fill();
        }
        fillStroke() {
          this.fill(!1), this.stroke(!1), this.consumePath();
        }
        eoFillStroke() {
          this.pendingEOFill = !0, this.fillStroke();
        }
        closeFillStroke() {
          this.closePath(), this.fillStroke();
        }
        closeEOFillStroke() {
          this.pendingEOFill = !0, this.closePath(), this.fillStroke();
        }
        endPath() {
          this.consumePath();
        }
        clip() {
          this.pendingClip = ft;
        }
        eoClip() {
          this.pendingClip = it;
        }
        beginText() {
          this.current.textMatrix = v.IDENTITY_MATRIX, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
        }
        endText() {
          const e = this.pendingTextPaths, n = this.ctx;
          if (e === void 0) {
            n.beginPath();
            return;
          }
          n.save(), n.beginPath();
          for (const f of e)
            n.setTransform(...f.transform), n.translate(f.x, f.y), f.addToPath(n, f.fontSize);
          n.restore(), n.clip(), n.beginPath(), delete this.pendingTextPaths;
        }
        setCharSpacing(e) {
          this.current.charSpacing = e;
        }
        setWordSpacing(e) {
          this.current.wordSpacing = e;
        }
        setHScale(e) {
          this.current.textHScale = e / 100;
        }
        setLeading(e) {
          this.current.leading = -e;
        }
        setFont(e, n) {
          const f = this.commonObjs.get(e), o = this.current;
          if (!f)
            throw new Error(`Can't find font for ${e}`);
          if (o.fontMatrix = f.fontMatrix || v.FONT_IDENTITY_MATRIX, (o.fontMatrix[0] === 0 || o.fontMatrix[3] === 0) && (0, v.warn)("Invalid font matrix for font " + e), n < 0 ? (n = -n, o.fontDirection = -1) : o.fontDirection = 1, this.current.font = f, this.current.fontSize = n, f.isType3Font)
            return;
          const a = f.loadedName || "sans-serif", d = f.systemFontInfo?.css || `"${a}", ${f.fallbackName}`;
          let A = "normal";
          f.black ? A = "900" : f.bold && (A = "bold");
          const x = f.italic ? "italic" : "normal";
          let R = n;
          n < t ? R = t : n > i && (R = i), this.current.fontSizeScale = n / R, this.ctx.font = `${x} ${A} ${R}px ${d}`;
        }
        setTextRenderingMode(e) {
          this.current.textRenderingMode = e;
        }
        setTextRise(e) {
          this.current.textRise = e;
        }
        moveText(e, n) {
          this.current.x = this.current.lineX += e, this.current.y = this.current.lineY += n;
        }
        setLeadingMoveText(e, n) {
          this.setLeading(-n), this.moveText(e, n);
        }
        setTextMatrix(e, n, f, o, a, d) {
          this.current.textMatrix = [e, n, f, o, a, d], this.current.textMatrixScale = Math.hypot(e, n), this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
        }
        nextLine() {
          this.moveText(0, this.current.leading);
        }
        paintChar(e, n, f, o) {
          const a = this.ctx, d = this.current, A = d.font, x = d.textRenderingMode, R = d.fontSize / d.fontSizeScale, k = x & v.TextRenderingMode.FILL_STROKE_MASK, D = !!(x & v.TextRenderingMode.ADD_TO_PATH_FLAG), N = d.patternFill && !A.missingFile;
          let F;
          (A.disableFontFace || D || N) && (F = A.getPathGenerator(this.commonObjs, e)), A.disableFontFace || N ? (a.save(), a.translate(n, f), a.beginPath(), F(a, R), o && a.setTransform(...o), (k === v.TextRenderingMode.FILL || k === v.TextRenderingMode.FILL_STROKE) && a.fill(), (k === v.TextRenderingMode.STROKE || k === v.TextRenderingMode.FILL_STROKE) && a.stroke(), a.restore()) : ((k === v.TextRenderingMode.FILL || k === v.TextRenderingMode.FILL_STROKE) && a.fillText(e, n, f), (k === v.TextRenderingMode.STROKE || k === v.TextRenderingMode.FILL_STROKE) && a.strokeText(e, n, f)), D && (this.pendingTextPaths ||= []).push({
            transform: (0, H.getCurrentTransform)(a),
            x: n,
            y: f,
            fontSize: R,
            addToPath: F
          });
        }
        get isFontSubpixelAAEnabled() {
          const {
            context: e
          } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10);
          e.scale(1.5, 1), e.fillText("I", 0, 10);
          const n = e.getImageData(0, 0, 10, 10).data;
          let f = !1;
          for (let o = 3; o < n.length; o += 4)
            if (n[o] > 0 && n[o] < 255) {
              f = !0;
              break;
            }
          return (0, v.shadow)(this, "isFontSubpixelAAEnabled", f);
        }
        showText(e) {
          const n = this.current, f = n.font;
          if (f.isType3Font)
            return this.showType3Text(e);
          const o = n.fontSize;
          if (o === 0)
            return;
          const a = this.ctx, d = n.fontSizeScale, A = n.charSpacing, x = n.wordSpacing, R = n.fontDirection, k = n.textHScale * R, D = e.length, N = f.vertical, F = N ? 1 : -1, C = f.defaultVMetrics, X = o * n.fontMatrix[0], Q = n.textRenderingMode === v.TextRenderingMode.FILL && !f.disableFontFace && !n.patternFill;
          a.save(), a.transform(...n.textMatrix), a.translate(n.x, n.y + n.textRise), R > 0 ? a.scale(k, -1) : a.scale(k, 1);
          let j;
          if (n.patternFill) {
            a.save();
            const nt = n.fillColor.getPattern(a, this, (0, H.getCurrentTransformInverse)(a), L.FILL);
            j = (0, H.getCurrentTransform)(a), a.restore(), a.fillStyle = nt;
          }
          let Z = n.lineWidth;
          const at = n.textMatrixScale;
          if (at === 0 || Z === 0) {
            const nt = n.textRenderingMode & v.TextRenderingMode.FILL_STROKE_MASK;
            (nt === v.TextRenderingMode.STROKE || nt === v.TextRenderingMode.FILL_STROKE) && (Z = this.getSinglePixelWidth());
          } else
            Z /= at;
          if (d !== 1 && (a.scale(d, d), Z /= d), a.lineWidth = Z, f.isInvalidPDFjsFont) {
            const nt = [];
            let lt = 0;
            for (const bt of e)
              nt.push(bt.unicode), lt += bt.width;
            a.fillText(nt.join(""), 0, 0), n.x += lt * X * k, a.restore(), this.compose();
            return;
          }
          let tt = 0, J;
          for (J = 0; J < D; ++J) {
            const nt = e[J];
            if (typeof nt == "number") {
              tt += F * nt * o / 1e3;
              continue;
            }
            let lt = !1;
            const bt = (nt.isSpace ? x : 0) + A, At = nt.fontChar, yt = nt.accent;
            let vt, Mt, Et = nt.width;
            if (N) {
              const wt = nt.vmetric || C, Ct = -(nt.vmetric ? wt[1] : Et * 0.5) * X, It = wt[2] * X;
              Et = wt ? -wt[0] : Et, vt = Ct / d, Mt = (tt + It) / d;
            } else
              vt = tt / d, Mt = 0;
            if (f.remeasure && Et > 0) {
              const wt = a.measureText(At).width * 1e3 / o * d;
              if (Et < wt && this.isFontSubpixelAAEnabled) {
                const Ct = Et / wt;
                lt = !0, a.save(), a.scale(Ct, 1), vt /= Ct;
              } else Et !== wt && (vt += (Et - wt) / 2e3 * o / d);
            }
            if (this.contentVisible && (nt.isInFont || f.missingFile)) {
              if (Q && !yt)
                a.fillText(At, vt, Mt);
              else if (this.paintChar(At, vt, Mt, j), yt) {
                const wt = vt + o * yt.offset.x / d, Ct = Mt - o * yt.offset.y / d;
                this.paintChar(yt.fontChar, wt, Ct, j);
              }
            }
            const kt = N ? Et * X - bt * R : Et * X + bt * R;
            tt += kt, lt && a.restore();
          }
          N ? n.y -= tt : n.x += tt * k, a.restore(), this.compose();
        }
        showType3Text(e) {
          const n = this.ctx, f = this.current, o = f.font, a = f.fontSize, d = f.fontDirection, A = o.vertical ? 1 : -1, x = f.charSpacing, R = f.wordSpacing, k = f.textHScale * d, D = f.fontMatrix || v.FONT_IDENTITY_MATRIX, N = e.length, F = f.textRenderingMode === v.TextRenderingMode.INVISIBLE;
          let C, X, Q, j;
          if (!(F || a === 0)) {
            for (this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null, n.save(), n.transform(...f.textMatrix), n.translate(f.x, f.y), n.scale(k, d), C = 0; C < N; ++C) {
              if (X = e[C], typeof X == "number") {
                j = A * X * a / 1e3, this.ctx.translate(j, 0), f.x += j * k;
                continue;
              }
              const Z = (X.isSpace ? R : 0) + x, at = o.charProcOperatorList[X.operatorListId];
              if (!at) {
                (0, v.warn)(`Type3 character "${X.operatorListId}" is not available.`);
                continue;
              }
              this.contentVisible && (this.processingType3 = X, this.save(), n.scale(a, a), n.transform(...D), this.executeOperatorList(at), this.restore()), Q = v.Util.applyTransform([X.width, 0], D)[0] * a + Z, n.translate(Q, 0), f.x += Q * k;
            }
            n.restore(), this.processingType3 = null;
          }
        }
        setCharWidth(e, n) {
        }
        setCharWidthAndBounds(e, n, f, o, a, d) {
          this.ctx.rect(f, o, a - f, d - o), this.ctx.clip(), this.endPath();
        }
        getColorN_Pattern(e) {
          let n;
          if (e[0] === "TilingPattern") {
            const f = e[1], o = this.baseTransform || (0, H.getCurrentTransform)(this.ctx), a = {
              createCanvasGraphics: (d) => new m(d, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
                optionalContentConfig: this.optionalContentConfig,
                markedContentStack: this.markedContentStack
              })
            };
            n = new s(e, f, this.ctx, a, o);
          } else
            n = this._getPattern(e[1], e[2]);
          return n;
        }
        setStrokeColorN() {
          this.current.strokeColor = this.getColorN_Pattern(arguments);
        }
        setFillColorN() {
          this.current.fillColor = this.getColorN_Pattern(arguments), this.current.patternFill = !0;
        }
        setStrokeRGBColor(e, n, f) {
          const o = v.Util.makeHexColor(e, n, f);
          this.ctx.strokeStyle = o, this.current.strokeColor = o;
        }
        setFillRGBColor(e, n, f) {
          const o = v.Util.makeHexColor(e, n, f);
          this.ctx.fillStyle = o, this.current.fillColor = o, this.current.patternFill = !1;
        }
        _getPattern(e, n = null) {
          let f;
          return this.cachedPatterns.has(e) ? f = this.cachedPatterns.get(e) : (f = l(this.getObject(e)), this.cachedPatterns.set(e, f)), n && (f.matrix = n), f;
        }
        shadingFill(e) {
          if (!this.contentVisible)
            return;
          const n = this.ctx;
          this.save();
          const f = this._getPattern(e);
          n.fillStyle = f.getPattern(n, this, (0, H.getCurrentTransformInverse)(n), L.SHADING);
          const o = (0, H.getCurrentTransformInverse)(n);
          if (o) {
            const {
              width: a,
              height: d
            } = n.canvas, [A, x, R, k] = v.Util.getAxialAlignedBoundingBox([0, 0, a, d], o);
            this.ctx.fillRect(A, x, R - A, k - x);
          } else
            this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
          this.compose(this.current.getClippedPathBoundingBox()), this.restore();
        }
        beginInlineImage() {
          (0, v.unreachable)("Should not call beginInlineImage");
        }
        beginImageData() {
          (0, v.unreachable)("Should not call beginImageData");
        }
        paintFormXObjectBegin(e, n) {
          if (this.contentVisible && (this.save(), this.baseTransformStack.push(this.baseTransform), Array.isArray(e) && e.length === 6 && this.transform(...e), this.baseTransform = (0, H.getCurrentTransform)(this.ctx), n)) {
            const f = n[2] - n[0], o = n[3] - n[1];
            this.ctx.rect(n[0], n[1], f, o), this.current.updateRectMinMax((0, H.getCurrentTransform)(this.ctx), n), this.clip(), this.endPath();
          }
        }
        paintFormXObjectEnd() {
          this.contentVisible && (this.restore(), this.baseTransform = this.baseTransformStack.pop());
        }
        beginGroup(e) {
          if (!this.contentVisible)
            return;
          this.save(), this.inSMaskMode && (this.endSMaskMode(), this.current.activeSMask = null);
          const n = this.ctx;
          e.isolated || (0, v.info)("TODO: Support non-isolated groups."), e.knockout && (0, v.warn)("Knockout groups not supported.");
          const f = (0, H.getCurrentTransform)(n);
          if (e.matrix && n.transform(...e.matrix), !e.bbox)
            throw new Error("Bounding box is required.");
          let o = v.Util.getAxialAlignedBoundingBox(e.bbox, (0, H.getCurrentTransform)(n));
          const a = [0, 0, n.canvas.width, n.canvas.height];
          o = v.Util.intersect(o, a) || [0, 0, 0, 0];
          const d = Math.floor(o[0]), A = Math.floor(o[1]);
          let x = Math.max(Math.ceil(o[2]) - d, 1), R = Math.max(Math.ceil(o[3]) - A, 1), k = 1, D = 1;
          x > u && (k = x / u, x = u), R > u && (D = R / u, R = u), this.current.startNewPathAndClipBox([0, 0, x, R]);
          let N = "groupAt" + this.groupLevel;
          e.smask && (N += "_smask_" + this.smaskCounter++ % 2);
          const F = this.cachedCanvases.getCanvas(N, x, R), C = F.context;
          C.scale(1 / k, 1 / D), C.translate(-d, -A), C.transform(...f), e.smask ? this.smaskStack.push({
            canvas: F.canvas,
            context: C,
            offsetX: d,
            offsetY: A,
            scaleX: k,
            scaleY: D,
            subtype: e.smask.subtype,
            backdrop: e.smask.backdrop,
            transferMap: e.smask.transferMap || null,
            startTransformInverse: null
          }) : (n.setTransform(1, 0, 0, 1, 0, 0), n.translate(d, A), n.scale(k, D), n.save()), z(n, C), this.ctx = C, this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]), this.groupStack.push(n), this.groupLevel++;
        }
        endGroup(e) {
          if (!this.contentVisible)
            return;
          this.groupLevel--;
          const n = this.ctx, f = this.groupStack.pop();
          if (this.ctx = f, this.ctx.imageSmoothingEnabled = !1, e.smask)
            this.tempSMask = this.smaskStack.pop(), this.restore();
          else {
            this.ctx.restore();
            const o = (0, H.getCurrentTransform)(this.ctx);
            this.restore(), this.ctx.save(), this.ctx.setTransform(...o);
            const a = v.Util.getAxialAlignedBoundingBox([0, 0, n.canvas.width, n.canvas.height], o);
            this.ctx.drawImage(n.canvas, 0, 0), this.ctx.restore(), this.compose(a);
          }
        }
        beginAnnotation(e, n, f, o, a) {
          if (this.#t(), V(this.ctx), this.ctx.save(), this.save(), this.baseTransform && this.ctx.setTransform(...this.baseTransform), Array.isArray(n) && n.length === 4) {
            const d = n[2] - n[0], A = n[3] - n[1];
            if (a && this.annotationCanvasMap) {
              f = f.slice(), f[4] -= n[0], f[5] -= n[1], n = n.slice(), n[0] = n[1] = 0, n[2] = d, n[3] = A;
              const [x, R] = v.Util.singularValueDecompose2dScale((0, H.getCurrentTransform)(this.ctx)), {
                viewportScale: k
              } = this, D = Math.ceil(d * this.outputScaleX * k), N = Math.ceil(A * this.outputScaleY * k);
              this.annotationCanvas = this.canvasFactory.create(D, N);
              const {
                canvas: F,
                context: C
              } = this.annotationCanvas;
              this.annotationCanvasMap.set(e, F), this.annotationCanvas.savedCtx = this.ctx, this.ctx = C, this.ctx.save(), this.ctx.setTransform(x, 0, 0, -R, 0, A * R), V(this.ctx);
            } else
              V(this.ctx), this.ctx.rect(n[0], n[1], d, A), this.ctx.clip(), this.endPath();
          }
          this.current = new K(this.ctx.canvas.width, this.ctx.canvas.height), this.transform(...f), this.transform(...o);
        }
        endAnnotation() {
          this.annotationCanvas && (this.ctx.restore(), this.#e(), this.ctx = this.annotationCanvas.savedCtx, delete this.annotationCanvas.savedCtx, delete this.annotationCanvas);
        }
        paintImageMaskXObject(e) {
          if (!this.contentVisible)
            return;
          const n = e.count;
          e = this.getObject(e.data, e), e.count = n;
          const f = this.ctx, o = this.processingType3;
          if (o && (o.compiled === void 0 && (o.compiled = U(e)), o.compiled)) {
            o.compiled(f);
            return;
          }
          const a = this._createMaskCanvas(e), d = a.canvas;
          f.save(), f.setTransform(1, 0, 0, 1, 0, 0), f.drawImage(d, a.offsetX, a.offsetY), f.restore(), this.compose();
        }
        paintImageMaskXObjectRepeat(e, n, f = 0, o = 0, a, d) {
          if (!this.contentVisible)
            return;
          e = this.getObject(e.data, e);
          const A = this.ctx;
          A.save();
          const x = (0, H.getCurrentTransform)(A);
          A.transform(n, f, o, a, 0, 0);
          const R = this._createMaskCanvas(e);
          A.setTransform(1, 0, 0, 1, R.offsetX - x[4], R.offsetY - x[5]);
          for (let k = 0, D = d.length; k < D; k += 2) {
            const N = v.Util.transform(x, [n, f, o, a, d[k], d[k + 1]]), [F, C] = v.Util.applyTransform([0, 0], N);
            A.drawImage(R.canvas, F, C);
          }
          A.restore(), this.compose();
        }
        paintImageMaskXObjectGroup(e) {
          if (!this.contentVisible)
            return;
          const n = this.ctx, f = this.current.fillColor, o = this.current.patternFill;
          for (const a of e) {
            const {
              data: d,
              width: A,
              height: x,
              transform: R
            } = a, k = this.cachedCanvases.getCanvas("maskCanvas", A, x), D = k.context;
            D.save();
            const N = this.getObject(d, a);
            W(D, N), D.globalCompositeOperation = "source-in", D.fillStyle = o ? f.getPattern(D, this, (0, H.getCurrentTransformInverse)(n), L.FILL) : f, D.fillRect(0, 0, A, x), D.restore(), n.save(), n.transform(...R), n.scale(1, -1), B(n, k.canvas, 0, 0, A, x, 0, -1, 1, 1), n.restore();
          }
          this.compose();
        }
        paintImageXObject(e) {
          if (!this.contentVisible)
            return;
          const n = this.getObject(e);
          if (!n) {
            (0, v.warn)("Dependent image isn't ready yet");
            return;
          }
          this.paintInlineImageXObject(n);
        }
        paintImageXObjectRepeat(e, n, f, o) {
          if (!this.contentVisible)
            return;
          const a = this.getObject(e);
          if (!a) {
            (0, v.warn)("Dependent image isn't ready yet");
            return;
          }
          const d = a.width, A = a.height, x = [];
          for (let R = 0, k = o.length; R < k; R += 2)
            x.push({
              transform: [n, 0, 0, f, o[R], o[R + 1]],
              x: 0,
              y: 0,
              w: d,
              h: A
            });
          this.paintInlineImageXObjectGroup(a, x);
        }
        applyTransferMapsToCanvas(e) {
          return this.current.transferMaps !== "none" && (e.filter = this.current.transferMaps, e.drawImage(e.canvas, 0, 0), e.filter = "none"), e.canvas;
        }
        applyTransferMapsToBitmap(e) {
          if (this.current.transferMaps === "none")
            return e.bitmap;
          const {
            bitmap: n,
            width: f,
            height: o
          } = e, a = this.cachedCanvases.getCanvas("inlineImage", f, o), d = a.context;
          return d.filter = this.current.transferMaps, d.drawImage(n, 0, 0), d.filter = "none", a.canvas;
        }
        paintInlineImageXObject(e) {
          if (!this.contentVisible)
            return;
          const n = e.width, f = e.height, o = this.ctx;
          if (this.save(), !v.isNodeJS) {
            const {
              filter: A
            } = o;
            A !== "none" && A !== "" && (o.filter = "none");
          }
          o.scale(1 / n, -1 / f);
          let a;
          if (e.bitmap)
            a = this.applyTransferMapsToBitmap(e);
          else if (typeof HTMLElement == "function" && e instanceof HTMLElement || !e.data)
            a = e;
          else {
            const x = this.cachedCanvases.getCanvas("inlineImage", n, f).context;
            rt(x, e), a = this.applyTransferMapsToCanvas(x);
          }
          const d = this._scaleImage(a, (0, H.getCurrentTransformInverse)(o));
          o.imageSmoothingEnabled = mt((0, H.getCurrentTransform)(o), e.interpolate), B(o, d.img, 0, 0, d.paintWidth, d.paintHeight, 0, -f, n, f), this.compose(), this.restore();
        }
        paintInlineImageXObjectGroup(e, n) {
          if (!this.contentVisible)
            return;
          const f = this.ctx;
          let o;
          if (e.bitmap)
            o = e.bitmap;
          else {
            const a = e.width, d = e.height, x = this.cachedCanvases.getCanvas("inlineImage", a, d).context;
            rt(x, e), o = this.applyTransferMapsToCanvas(x);
          }
          for (const a of n)
            f.save(), f.transform(...a.transform), f.scale(1, -1), B(f, o, a.x, a.y, a.w, a.h, 0, -1, 1, 1), f.restore();
          this.compose();
        }
        paintSolidColorImageMask() {
          this.contentVisible && (this.ctx.fillRect(0, 0, 1, 1), this.compose());
        }
        markPoint(e) {
        }
        markPointProps(e, n) {
        }
        beginMarkedContent(e) {
          this.markedContentStack.push({
            visible: !0
          });
        }
        beginMarkedContentProps(e, n) {
          e === "OC" ? this.markedContentStack.push({
            visible: this.optionalContentConfig.isVisible(n)
          }) : this.markedContentStack.push({
            visible: !0
          }), this.contentVisible = this.isContentVisible();
        }
        endMarkedContent() {
          this.markedContentStack.pop(), this.contentVisible = this.isContentVisible();
        }
        beginCompat() {
        }
        endCompat() {
        }
        consumePath(e) {
          const n = this.current.isEmptyClip();
          this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(e);
          const f = this.ctx;
          this.pendingClip && (n || (this.pendingClip === it ? f.clip("evenodd") : f.clip()), this.pendingClip = null), this.current.startNewPathAndClipBox(this.current.clipBox), f.beginPath();
        }
        getSinglePixelWidth() {
          if (!this._cachedGetSinglePixelWidth) {
            const e = (0, H.getCurrentTransform)(this.ctx);
            if (e[1] === 0 && e[2] === 0)
              this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(e[0]), Math.abs(e[3]));
            else {
              const n = Math.abs(e[0] * e[3] - e[2] * e[1]), f = Math.hypot(e[0], e[2]), o = Math.hypot(e[1], e[3]);
              this._cachedGetSinglePixelWidth = Math.max(f, o) / n;
            }
          }
          return this._cachedGetSinglePixelWidth;
        }
        getScaleForStroking() {
          if (this._cachedScaleForStroking[0] === -1) {
            const {
              lineWidth: e
            } = this.current, {
              a: n,
              b: f,
              c: o,
              d: a
            } = this.ctx.getTransform();
            let d, A;
            if (f === 0 && o === 0) {
              const x = Math.abs(n), R = Math.abs(a);
              if (x === R)
                if (e === 0)
                  d = A = 1 / x;
                else {
                  const k = x * e;
                  d = A = k < 1 ? 1 / k : 1;
                }
              else if (e === 0)
                d = 1 / x, A = 1 / R;
              else {
                const k = x * e, D = R * e;
                d = k < 1 ? 1 / k : 1, A = D < 1 ? 1 / D : 1;
              }
            } else {
              const x = Math.abs(n * a - f * o), R = Math.hypot(n, f), k = Math.hypot(o, a);
              if (e === 0)
                d = k / x, A = R / x;
              else {
                const D = e * x;
                d = k > D ? k / D : 1, A = R > D ? R / D : 1;
              }
            }
            this._cachedScaleForStroking[0] = d, this._cachedScaleForStroking[1] = A;
          }
          return this._cachedScaleForStroking;
        }
        rescaleAndStroke(e) {
          const {
            ctx: n
          } = this, {
            lineWidth: f
          } = this.current, [o, a] = this.getScaleForStroking();
          if (n.lineWidth = f || 1, o === 1 && a === 1) {
            n.stroke();
            return;
          }
          const d = n.getLineDash();
          if (e && n.save(), n.scale(o, a), d.length > 0) {
            const A = Math.max(o, a);
            n.setLineDash(d.map((x) => x / A)), n.lineDashOffset /= A;
          }
          n.stroke(), e && n.restore();
        }
        isContentVisible() {
          for (let e = this.markedContentStack.length - 1; e >= 0; e--)
            if (!this.markedContentStack[e].visible)
              return !1;
          return !0;
        }
      }
      for (const h in v.OPS)
        m.prototype[h] !== void 0 && (m.prototype[v.OPS[h]] = m.prototype[h]);
    }
  ),
  /***/
  419: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        DOMCMapReaderFactory: () => (
          /* binding */
          y
        ),
        /* harmony export */
        DOMCanvasFactory: () => (
          /* binding */
          T
        ),
        /* harmony export */
        DOMFilterFactory: () => (
          /* binding */
          P
        ),
        /* harmony export */
        DOMSVGFactory: () => (
          /* binding */
          c
        ),
        /* harmony export */
        DOMStandardFontDataFactory: () => (
          /* binding */
          r
        ),
        /* harmony export */
        PDFDateString: () => (
          /* binding */
          M
        ),
        /* harmony export */
        PageViewport: () => (
          /* binding */
          l
        ),
        /* harmony export */
        PixelsPerInch: () => (
          /* binding */
          G
        ),
        /* harmony export */
        RenderingCancelledException: () => (
          /* binding */
          b
        ),
        /* harmony export */
        StatTimer: () => (
          /* binding */
          u
        ),
        /* harmony export */
        fetchData: () => (
          /* binding */
          E
        ),
        /* harmony export */
        getColorValues: () => (
          /* binding */
          B
        ),
        /* harmony export */
        getCurrentTransform: () => (
          /* binding */
          U
        ),
        /* harmony export */
        getCurrentTransformInverse: () => (
          /* binding */
          K
        ),
        /* harmony export */
        getFilenameFromUrl: () => (
          /* binding */
          t
        ),
        /* harmony export */
        getPdfFilenameFromUrl: () => (
          /* binding */
          i
        ),
        /* harmony export */
        getRGB: () => (
          /* binding */
          O
        ),
        /* harmony export */
        getXfaPageViewport: () => (
          /* binding */
          _
        ),
        /* harmony export */
        isDataScheme: () => (
          /* binding */
          s
        ),
        /* harmony export */
        isPdfFile: () => (
          /* binding */
          g
        ),
        /* harmony export */
        isValidFetchUrl: () => (
          /* binding */
          p
        ),
        /* harmony export */
        noContextMenu: () => (
          /* binding */
          w
        ),
        /* harmony export */
        setLayerDimensions: () => (
          /* binding */
          rt
        )
        /* harmony export */
      });
      var v = I(583), H = I(292);
      const L = "http://www.w3.org/2000/svg";
      class G {
        static CSS = 96;
        static PDF = 72;
        static PDF_TO_CSS_UNITS = this.CSS / this.PDF;
      }
      class P extends v.BaseFilterFactory {
        #t;
        #e;
        #s;
        #n;
        #r;
        #i = 0;
        constructor({
          docId: z,
          ownerDocument: V = globalThis.document
        } = {}) {
          super(), this.#s = z, this.#n = V;
        }
        get #a() {
          return this.#t ||= /* @__PURE__ */ new Map();
        }
        get #l() {
          return this.#r ||= /* @__PURE__ */ new Map();
        }
        get #h() {
          if (!this.#e) {
            const z = this.#n.createElement("div"), {
              style: V
            } = z;
            V.visibility = "hidden", V.contain = "strict", V.width = V.height = 0, V.position = "absolute", V.top = V.left = 0, V.zIndex = -1;
            const q = this.#n.createElementNS(L, "svg");
            q.setAttribute("width", 0), q.setAttribute("height", 0), this.#e = this.#n.createElementNS(L, "defs"), z.append(q), q.append(this.#e), this.#n.body.append(z);
          }
          return this.#e;
        }
        addFilter(z) {
          if (!z)
            return "none";
          let V = this.#a.get(z);
          if (V)
            return V;
          let q, st, et, ot;
          if (z.length === 1) {
            const ht = z[0], ft = new Array(256);
            for (let it = 0; it < 256; it++)
              ft[it] = ht[it] / 255;
            ot = q = st = et = ft.join(",");
          } else {
            const [ht, ft, it] = z, m = new Array(256), h = new Array(256), e = new Array(256);
            for (let n = 0; n < 256; n++)
              m[n] = ht[n] / 255, h[n] = ft[n] / 255, e[n] = it[n] / 255;
            q = m.join(","), st = h.join(","), et = e.join(","), ot = `${q}${st}${et}`;
          }
          if (V = this.#a.get(ot), V)
            return this.#a.set(z, V), V;
          const dt = `g_${this.#s}_transfer_map_${this.#i++}`, mt = `url(#${dt})`;
          this.#a.set(z, mt), this.#a.set(ot, mt);
          const ut = this.#u(dt);
          return this.#o(q, st, et, ut), mt;
        }
        addHCMFilter(z, V) {
          const q = `${z}-${V}`, st = "base";
          let et = this.#l.get(st);
          if (et?.key === q || (et ? (et.filter?.remove(), et.key = q, et.url = "none", et.filter = null) : (et = {
            key: q,
            url: "none",
            filter: null
          }, this.#l.set(st, et)), !z || !V))
            return et.url;
          const ot = this.#p(z);
          z = H.Util.makeHexColor(...ot);
          const dt = this.#p(V);
          if (V = H.Util.makeHexColor(...dt), this.#h.style.color = "", z === "#000000" && V === "#ffffff" || z === V)
            return et.url;
          const mt = new Array(256);
          for (let m = 0; m <= 255; m++) {
            const h = m / 255;
            mt[m] = h <= 0.03928 ? h / 12.92 : ((h + 0.055) / 1.055) ** 2.4;
          }
          const ut = mt.join(","), ht = `g_${this.#s}_hcm_filter`, ft = et.filter = this.#u(ht);
          this.#o(ut, ut, ut, ft), this.#d(ft);
          const it = (m, h) => {
            const e = ot[m] / 255, n = dt[m] / 255, f = new Array(h + 1);
            for (let o = 0; o <= h; o++)
              f[o] = e + o / h * (n - e);
            return f.join(",");
          };
          return this.#o(it(0, 5), it(1, 5), it(2, 5), ft), et.url = `url(#${ht})`, et.url;
        }
        addHighlightHCMFilter(z, V, q, st, et) {
          const ot = `${V}-${q}-${st}-${et}`;
          let dt = this.#l.get(z);
          if (dt?.key === ot || (dt ? (dt.filter?.remove(), dt.key = ot, dt.url = "none", dt.filter = null) : (dt = {
            key: ot,
            url: "none",
            filter: null
          }, this.#l.set(z, dt)), !V || !q))
            return dt.url;
          const [mt, ut] = [V, q].map(this.#p.bind(this));
          let ht = Math.round(0.2126 * mt[0] + 0.7152 * mt[1] + 0.0722 * mt[2]), ft = Math.round(0.2126 * ut[0] + 0.7152 * ut[1] + 0.0722 * ut[2]), [it, m] = [st, et].map(this.#p.bind(this));
          ft < ht && ([ht, ft, it, m] = [ft, ht, m, it]), this.#h.style.color = "";
          const h = (f, o, a) => {
            const d = new Array(256), A = (ft - ht) / a, x = f / 255, R = (o - f) / (255 * a);
            let k = 0;
            for (let D = 0; D <= a; D++) {
              const N = Math.round(ht + D * A), F = x + D * R;
              for (let C = k; C <= N; C++)
                d[C] = F;
              k = N + 1;
            }
            for (let D = k; D < 256; D++)
              d[D] = d[k - 1];
            return d.join(",");
          }, e = `g_${this.#s}_hcm_${z}_filter`, n = dt.filter = this.#u(e);
          return this.#d(n), this.#o(h(it[0], m[0], 5), h(it[1], m[1], 5), h(it[2], m[2], 5), n), dt.url = `url(#${e})`, dt.url;
        }
        destroy(z = !1) {
          z && this.#l.size !== 0 || (this.#e && (this.#e.parentNode.parentNode.remove(), this.#e = null), this.#t && (this.#t.clear(), this.#t = null), this.#i = 0);
        }
        #d(z) {
          const V = this.#n.createElementNS(L, "feColorMatrix");
          V.setAttribute("type", "matrix"), V.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"), z.append(V);
        }
        #u(z) {
          const V = this.#n.createElementNS(L, "filter");
          return V.setAttribute("color-interpolation-filters", "sRGB"), V.setAttribute("id", z), this.#h.append(V), V;
        }
        #c(z, V, q) {
          const st = this.#n.createElementNS(L, V);
          st.setAttribute("type", "discrete"), st.setAttribute("tableValues", q), z.append(st);
        }
        #o(z, V, q, st) {
          const et = this.#n.createElementNS(L, "feComponentTransfer");
          st.append(et), this.#c(et, "feFuncR", z), this.#c(et, "feFuncG", V), this.#c(et, "feFuncB", q);
        }
        #p(z) {
          return this.#h.style.color = z, O(getComputedStyle(this.#h).getPropertyValue("color"));
        }
      }
      class T extends v.BaseCanvasFactory {
        constructor({
          ownerDocument: z = globalThis.document
        } = {}) {
          super(), this._document = z;
        }
        _createCanvas(z, V) {
          const q = this._document.createElement("canvas");
          return q.width = z, q.height = V, q;
        }
      }
      async function E(W, z = "text") {
        if (p(W, document.baseURI)) {
          const V = await fetch(W);
          if (!V.ok)
            throw new Error(V.statusText);
          switch (z) {
            case "arraybuffer":
              return V.arrayBuffer();
            case "blob":
              return V.blob();
            case "json":
              return V.json();
          }
          return V.text();
        }
        return new Promise((V, q) => {
          const st = new XMLHttpRequest();
          st.open("GET", W, !0), st.responseType = z, st.onreadystatechange = () => {
            if (st.readyState === XMLHttpRequest.DONE) {
              if (st.status === 200 || st.status === 0) {
                switch (z) {
                  case "arraybuffer":
                  case "blob":
                  case "json":
                    V(st.response);
                    return;
                }
                V(st.responseText);
                return;
              }
              q(new Error(st.statusText));
            }
          }, st.send(null);
        });
      }
      class y extends v.BaseCMapReaderFactory {
        _fetchData(z, V) {
          return E(z, this.isCompressed ? "arraybuffer" : "text").then((q) => ({
            cMapData: q instanceof ArrayBuffer ? new Uint8Array(q) : (0, H.stringToBytes)(q),
            compressionType: V
          }));
        }
      }
      class r extends v.BaseStandardFontDataFactory {
        _fetchData(z) {
          return E(z, "arraybuffer").then((V) => new Uint8Array(V));
        }
      }
      class c extends v.BaseSVGFactory {
        _createSVG(z) {
          return document.createElementNS(L, z);
        }
      }
      class l {
        constructor({
          viewBox: z,
          scale: V,
          rotation: q,
          offsetX: st = 0,
          offsetY: et = 0,
          dontFlip: ot = !1
        }) {
          this.viewBox = z, this.scale = V, this.rotation = q, this.offsetX = st, this.offsetY = et;
          const dt = (z[2] + z[0]) / 2, mt = (z[3] + z[1]) / 2;
          let ut, ht, ft, it;
          switch (q %= 360, q < 0 && (q += 360), q) {
            case 180:
              ut = -1, ht = 0, ft = 0, it = 1;
              break;
            case 90:
              ut = 0, ht = 1, ft = 1, it = 0;
              break;
            case 270:
              ut = 0, ht = -1, ft = -1, it = 0;
              break;
            case 0:
              ut = 1, ht = 0, ft = 0, it = -1;
              break;
            default:
              throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
          }
          ot && (ft = -ft, it = -it);
          let m, h, e, n;
          ut === 0 ? (m = Math.abs(mt - z[1]) * V + st, h = Math.abs(dt - z[0]) * V + et, e = (z[3] - z[1]) * V, n = (z[2] - z[0]) * V) : (m = Math.abs(dt - z[0]) * V + st, h = Math.abs(mt - z[1]) * V + et, e = (z[2] - z[0]) * V, n = (z[3] - z[1]) * V), this.transform = [ut * V, ht * V, ft * V, it * V, m - ut * V * dt - ft * V * mt, h - ht * V * dt - it * V * mt], this.width = e, this.height = n;
        }
        get rawDims() {
          const {
            viewBox: z
          } = this;
          return (0, H.shadow)(this, "rawDims", {
            pageWidth: z[2] - z[0],
            pageHeight: z[3] - z[1],
            pageX: z[0],
            pageY: z[1]
          });
        }
        clone({
          scale: z = this.scale,
          rotation: V = this.rotation,
          offsetX: q = this.offsetX,
          offsetY: st = this.offsetY,
          dontFlip: et = !1
        } = {}) {
          return new l({
            viewBox: this.viewBox.slice(),
            scale: z,
            rotation: V,
            offsetX: q,
            offsetY: st,
            dontFlip: et
          });
        }
        convertToViewportPoint(z, V) {
          return H.Util.applyTransform([z, V], this.transform);
        }
        convertToViewportRectangle(z) {
          const V = H.Util.applyTransform([z[0], z[1]], this.transform), q = H.Util.applyTransform([z[2], z[3]], this.transform);
          return [V[0], V[1], q[0], q[1]];
        }
        convertToPdfPoint(z, V) {
          return H.Util.applyInverseTransform([z, V], this.transform);
        }
      }
      class b extends H.BaseException {
        constructor(z, V = 0) {
          super(z, "RenderingCancelledException"), this.extraDelay = V;
        }
      }
      function s(W) {
        const z = W.length;
        let V = 0;
        for (; V < z && W[V].trim() === ""; )
          V++;
        return W.substring(V, V + 5).toLowerCase() === "data:";
      }
      function g(W) {
        return typeof W == "string" && /\.pdf$/i.test(W);
      }
      function t(W, z = !1) {
        return z || ([W] = W.split(/[#?]/, 1)), W.substring(W.lastIndexOf("/") + 1);
      }
      function i(W, z = "document.pdf") {
        if (typeof W != "string")
          return z;
        if (s(W))
          return (0, H.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), z;
        const V = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/, q = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i, st = V.exec(W);
        let et = q.exec(st[1]) || q.exec(st[2]) || q.exec(st[3]);
        if (et && (et = et[0], et.includes("%")))
          try {
            et = q.exec(decodeURIComponent(et))[0];
          } catch {
          }
        return et || z;
      }
      class u {
        started = /* @__PURE__ */ Object.create(null);
        times = [];
        time(z) {
          z in this.started && (0, H.warn)(`Timer is already running for ${z}`), this.started[z] = Date.now();
        }
        timeEnd(z) {
          z in this.started || (0, H.warn)(`Timer has not been started for ${z}`), this.times.push({
            name: z,
            start: this.started[z],
            end: Date.now()
          }), delete this.started[z];
        }
        toString() {
          const z = [];
          let V = 0;
          for (const {
            name: q
          } of this.times)
            V = Math.max(q.length, V);
          for (const {
            name: q,
            start: st,
            end: et
          } of this.times)
            z.push(`${q.padEnd(V)} ${et - st}ms
`);
          return z.join("");
        }
      }
      function p(W, z) {
        try {
          const {
            protocol: V
          } = z ? new URL(W, z) : new URL(W);
          return V === "http:" || V === "https:";
        } catch {
          return !1;
        }
      }
      function w(W) {
        W.preventDefault();
      }
      let S;
      class M {
        static toDateObject(z) {
          if (!z || typeof z != "string")
            return null;
          S ||= new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?");
          const V = S.exec(z);
          if (!V)
            return null;
          const q = parseInt(V[1], 10);
          let st = parseInt(V[2], 10);
          st = st >= 1 && st <= 12 ? st - 1 : 0;
          let et = parseInt(V[3], 10);
          et = et >= 1 && et <= 31 ? et : 1;
          let ot = parseInt(V[4], 10);
          ot = ot >= 0 && ot <= 23 ? ot : 0;
          let dt = parseInt(V[5], 10);
          dt = dt >= 0 && dt <= 59 ? dt : 0;
          let mt = parseInt(V[6], 10);
          mt = mt >= 0 && mt <= 59 ? mt : 0;
          const ut = V[7] || "Z";
          let ht = parseInt(V[8], 10);
          ht = ht >= 0 && ht <= 23 ? ht : 0;
          let ft = parseInt(V[9], 10) || 0;
          return ft = ft >= 0 && ft <= 59 ? ft : 0, ut === "-" ? (ot += ht, dt += ft) : ut === "+" && (ot -= ht, dt -= ft), new Date(Date.UTC(q, st, et, ot, dt, mt));
        }
      }
      function _(W, {
        scale: z = 1,
        rotation: V = 0
      }) {
        const {
          width: q,
          height: st
        } = W.attributes.style, et = [0, 0, parseInt(q), parseInt(st)];
        return new l({
          viewBox: et,
          scale: z,
          rotation: V
        });
      }
      function O(W) {
        if (W.startsWith("#")) {
          const z = parseInt(W.slice(1), 16);
          return [(z & 16711680) >> 16, (z & 65280) >> 8, z & 255];
        }
        return W.startsWith("rgb(") ? W.slice(4, -1).split(",").map((z) => parseInt(z)) : W.startsWith("rgba(") ? W.slice(5, -1).split(",").map((z) => parseInt(z)).slice(0, 3) : ((0, H.warn)(`Not a valid color format: "${W}"`), [0, 0, 0]);
      }
      function B(W) {
        const z = document.createElement("span");
        z.style.visibility = "hidden", document.body.append(z);
        for (const V of W.keys()) {
          z.style.color = V;
          const q = window.getComputedStyle(z).color;
          W.set(V, O(q));
        }
        z.remove();
      }
      function U(W) {
        const {
          a: z,
          b: V,
          c: q,
          d: st,
          e: et,
          f: ot
        } = W.getTransform();
        return [z, V, q, st, et, ot];
      }
      function K(W) {
        const {
          a: z,
          b: V,
          c: q,
          d: st,
          e: et,
          f: ot
        } = W.getTransform().invertSelf();
        return [z, V, q, st, et, ot];
      }
      function rt(W, z, V = !1, q = !0) {
        if (z instanceof l) {
          const {
            pageWidth: st,
            pageHeight: et
          } = z.rawDims, {
            style: ot
          } = W, dt = H.FeatureTest.isCSSRoundSupported, mt = `var(--scale-factor) * ${st}px`, ut = `var(--scale-factor) * ${et}px`, ht = dt ? `round(${mt}, 1px)` : `calc(${mt})`, ft = dt ? `round(${ut}, 1px)` : `calc(${ut})`;
          !V || z.rotation % 180 === 0 ? (ot.width = ht, ot.height = ft) : (ot.width = ft, ot.height = ht);
        }
        q && W.setAttribute("data-main-rotation", z.rotation);
      }
    }
  ),
  /***/
  47: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        DrawLayer: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var v = I(419), H = I(292);
      class L {
        #t = null;
        #e = 0;
        #s = /* @__PURE__ */ new Map();
        #n = /* @__PURE__ */ new Map();
        constructor({
          pageIndex: P
        }) {
          this.pageIndex = P;
        }
        setParent(P) {
          if (!this.#t) {
            this.#t = P;
            return;
          }
          if (this.#t !== P) {
            if (this.#s.size > 0)
              for (const T of this.#s.values())
                T.remove(), P.append(T);
            this.#t = P;
          }
        }
        static get _svgFactory() {
          return (0, H.shadow)(this, "_svgFactory", new v.DOMSVGFactory());
        }
        static #r(P, {
          x: T = 0,
          y: E = 0,
          width: y = 1,
          height: r = 1
        } = {}) {
          const {
            style: c
          } = P;
          c.top = `${100 * E}%`, c.left = `${100 * T}%`, c.width = `${100 * y}%`, c.height = `${100 * r}%`;
        }
        #i(P) {
          const T = L._svgFactory.create(1, 1, !0);
          return this.#t.append(T), T.setAttribute("aria-hidden", !0), L.#r(T, P), T;
        }
        #a(P, T) {
          const E = L._svgFactory.createElement("clipPath");
          P.append(E);
          const y = `clip_${T}`;
          E.setAttribute("id", y), E.setAttribute("clipPathUnits", "objectBoundingBox");
          const r = L._svgFactory.createElement("use");
          return E.append(r), r.setAttribute("href", `#${T}`), r.classList.add("clip"), y;
        }
        highlight(P, T, E, y = !1) {
          const r = this.#e++, c = this.#i(P.box);
          c.classList.add("highlight"), P.free && c.classList.add("free");
          const l = L._svgFactory.createElement("defs");
          c.append(l);
          const b = L._svgFactory.createElement("path");
          l.append(b);
          const s = `path_p${this.pageIndex}_${r}`;
          b.setAttribute("id", s), b.setAttribute("d", P.toSVGPath()), y && this.#n.set(r, b);
          const g = this.#a(l, s), t = L._svgFactory.createElement("use");
          return c.append(t), c.setAttribute("fill", T), c.setAttribute("fill-opacity", E), t.setAttribute("href", `#${s}`), this.#s.set(r, c), {
            id: r,
            clipPathId: `url(#${g})`
          };
        }
        highlightOutline(P) {
          const T = this.#e++, E = this.#i(P.box);
          E.classList.add("highlightOutline");
          const y = L._svgFactory.createElement("defs");
          E.append(y);
          const r = L._svgFactory.createElement("path");
          y.append(r);
          const c = `path_p${this.pageIndex}_${T}`;
          r.setAttribute("id", c), r.setAttribute("d", P.toSVGPath()), r.setAttribute("vector-effect", "non-scaling-stroke");
          let l;
          if (P.free) {
            E.classList.add("free");
            const g = L._svgFactory.createElement("mask");
            y.append(g), l = `mask_p${this.pageIndex}_${T}`, g.setAttribute("id", l), g.setAttribute("maskUnits", "objectBoundingBox");
            const t = L._svgFactory.createElement("rect");
            g.append(t), t.setAttribute("width", "1"), t.setAttribute("height", "1"), t.setAttribute("fill", "white");
            const i = L._svgFactory.createElement("use");
            g.append(i), i.setAttribute("href", `#${c}`), i.setAttribute("stroke", "none"), i.setAttribute("fill", "black"), i.setAttribute("fill-rule", "nonzero"), i.classList.add("mask");
          }
          const b = L._svgFactory.createElement("use");
          E.append(b), b.setAttribute("href", `#${c}`), l && b.setAttribute("mask", `url(#${l})`);
          const s = b.cloneNode();
          return E.append(s), b.classList.add("mainOutline"), s.classList.add("secondaryOutline"), this.#s.set(T, E), T;
        }
        finalizeLine(P, T) {
          const E = this.#n.get(P);
          this.#n.delete(P), this.updateBox(P, T.box), E.setAttribute("d", T.toSVGPath());
        }
        updateLine(P, T) {
          this.#s.get(P).firstChild.firstChild.setAttribute("d", T.toSVGPath());
        }
        removeFreeHighlight(P) {
          this.remove(P), this.#n.delete(P);
        }
        updatePath(P, T) {
          this.#n.get(P).setAttribute("d", T.toSVGPath());
        }
        updateBox(P, T) {
          L.#r(this.#s.get(P), T);
        }
        show(P, T) {
          this.#s.get(P).classList.toggle("hidden", !T);
        }
        rotate(P, T) {
          this.#s.get(P).setAttribute("data-main-rotation", T);
        }
        changeColor(P, T) {
          this.#s.get(P).setAttribute("fill", T);
        }
        changeOpacity(P, T) {
          this.#s.get(P).setAttribute("fill-opacity", T);
        }
        addClass(P, T) {
          this.#s.get(P).classList.add(T);
        }
        removeClass(P, T) {
          this.#s.get(P).classList.remove(T);
        }
        remove(P) {
          this.#t !== null && (this.#s.get(P).remove(), this.#s.delete(P));
        }
        destroy() {
          this.#t = null;
          for (const P of this.#s.values())
            P.remove();
          this.#s.clear();
        }
      }
    }
  ),
  /***/
  731: (
    /***/
    (Y, $, I) => {
      I.d($, {
        AnnotationEditorLayer: () => (
          /* binding */
          s
        )
      });
      var v = I(292), H = I(310), L = I(830), G = I(976);
      const P = /\r\n?|\n/g;
      class T extends H.AnnotationEditor {
        #t = this.editorDivBlur.bind(this);
        #e = this.editorDivFocus.bind(this);
        #s = this.editorDivInput.bind(this);
        #n = this.editorDivKeydown.bind(this);
        #r = this.editorDivPaste.bind(this);
        #i;
        #a = "";
        #l = `${this.id}-editor`;
        #h;
        #d = null;
        static _freeTextDefaultContent = "";
        static _internalPadding = 0;
        static _defaultColor = null;
        static _defaultFontSize = 10;
        static get _keyboardManager() {
          const t = T.prototype, i = (w) => w.isEmpty(), u = L.AnnotationEditorUIManager.TRANSLATE_SMALL, p = L.AnnotationEditorUIManager.TRANSLATE_BIG;
          return (0, v.shadow)(this, "_keyboardManager", new L.KeyboardManager([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], t.commitOrRemove, {
            bubbles: !0
          }], [["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], t.commitOrRemove], [["ArrowLeft", "mac+ArrowLeft"], t._translateEmpty, {
            args: [-u, 0],
            checker: i
          }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t._translateEmpty, {
            args: [-p, 0],
            checker: i
          }], [["ArrowRight", "mac+ArrowRight"], t._translateEmpty, {
            args: [u, 0],
            checker: i
          }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t._translateEmpty, {
            args: [p, 0],
            checker: i
          }], [["ArrowUp", "mac+ArrowUp"], t._translateEmpty, {
            args: [0, -u],
            checker: i
          }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t._translateEmpty, {
            args: [0, -p],
            checker: i
          }], [["ArrowDown", "mac+ArrowDown"], t._translateEmpty, {
            args: [0, u],
            checker: i
          }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t._translateEmpty, {
            args: [0, p],
            checker: i
          }]]));
        }
        static _type = "freetext";
        static _editorType = v.AnnotationEditorType.FREETEXT;
        constructor(t) {
          super({
            ...t,
            name: "freeTextEditor"
          }), this.#i = t.color || T._defaultColor || H.AnnotationEditor._defaultLineColor, this.#h = t.fontSize || T._defaultFontSize;
        }
        static initialize(t, i) {
          H.AnnotationEditor.initialize(t, i, {
            strings: ["pdfjs-free-text-default-content"]
          });
          const u = getComputedStyle(document.documentElement);
          this._internalPadding = parseFloat(u.getPropertyValue("--freetext-padding"));
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case v.AnnotationEditorParamsType.FREETEXT_SIZE:
              T._defaultFontSize = i;
              break;
            case v.AnnotationEditorParamsType.FREETEXT_COLOR:
              T._defaultColor = i;
              break;
          }
        }
        updateParams(t, i) {
          switch (t) {
            case v.AnnotationEditorParamsType.FREETEXT_SIZE:
              this.#u(i);
              break;
            case v.AnnotationEditorParamsType.FREETEXT_COLOR:
              this.#c(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[v.AnnotationEditorParamsType.FREETEXT_SIZE, T._defaultFontSize], [v.AnnotationEditorParamsType.FREETEXT_COLOR, T._defaultColor || H.AnnotationEditor._defaultLineColor]];
        }
        get propertiesToUpdate() {
          return [[v.AnnotationEditorParamsType.FREETEXT_SIZE, this.#h], [v.AnnotationEditorParamsType.FREETEXT_COLOR, this.#i]];
        }
        #u(t) {
          const i = (p) => {
            this.editorDiv.style.fontSize = `calc(${p}px * var(--scale-factor))`, this.translate(0, -(p - this.#h) * this.parentScale), this.#h = p, this.#p();
          }, u = this.#h;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: v.AnnotationEditorParamsType.FREETEXT_SIZE,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #c(t) {
          const i = (p) => {
            this.#i = this.editorDiv.style.color = p;
          }, u = this.#i;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: v.AnnotationEditorParamsType.FREETEXT_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        _translateEmpty(t, i) {
          this._uiManager.translateSelectedEditors(t, i, !0);
        }
        getInitialTranslation() {
          const t = this.parentScale;
          return [-T._internalPadding * t, -(T._internalPadding + this.#h) * t];
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this)));
        }
        enableEditMode() {
          this.isInEditMode() || (this.parent.setEditingState(!1), this.parent.updateToolbar(v.AnnotationEditorType.FREETEXT), super.enableEditMode(), this.overlayDiv.classList.remove("enabled"), this.editorDiv.contentEditable = !0, this._isDraggable = !1, this.div.removeAttribute("aria-activedescendant"), this.editorDiv.addEventListener("keydown", this.#n), this.editorDiv.addEventListener("focus", this.#e), this.editorDiv.addEventListener("blur", this.#t), this.editorDiv.addEventListener("input", this.#s), this.editorDiv.addEventListener("paste", this.#r));
        }
        disableEditMode() {
          this.isInEditMode() && (this.parent.setEditingState(!0), super.disableEditMode(), this.overlayDiv.classList.add("enabled"), this.editorDiv.contentEditable = !1, this.div.setAttribute("aria-activedescendant", this.#l), this._isDraggable = !0, this.editorDiv.removeEventListener("keydown", this.#n), this.editorDiv.removeEventListener("focus", this.#e), this.editorDiv.removeEventListener("blur", this.#t), this.editorDiv.removeEventListener("input", this.#s), this.editorDiv.removeEventListener("paste", this.#r), this.div.focus({
            preventScroll: !0
          }), this.isEditing = !1, this.parent.div.classList.add("freetextEditing"));
        }
        focusin(t) {
          this._focusEventsAllowed && (super.focusin(t), t.target !== this.editorDiv && this.editorDiv.focus());
        }
        onceAdded() {
          this.width || (this.enableEditMode(), this.editorDiv.focus(), this._initialOptions?.isCentered && this.center(), this._initialOptions = null);
        }
        isEmpty() {
          return !this.editorDiv || this.editorDiv.innerText.trim() === "";
        }
        remove() {
          this.isEditing = !1, this.parent && (this.parent.setEditingState(!0), this.parent.div.classList.add("freetextEditing")), super.remove();
        }
        #o() {
          const t = [];
          this.editorDiv.normalize();
          for (const i of this.editorDiv.childNodes)
            t.push(T.#g(i));
          return t.join(`
`);
        }
        #p() {
          const [t, i] = this.parentDimensions;
          let u;
          if (this.isAttachedToDOM)
            u = this.div.getBoundingClientRect();
          else {
            const {
              currentLayer: p,
              div: w
            } = this, S = w.style.display, M = w.classList.contains("hidden");
            w.classList.remove("hidden"), w.style.display = "hidden", p.div.append(this.div), u = w.getBoundingClientRect(), w.remove(), w.style.display = S, w.classList.toggle("hidden", M);
          }
          this.rotation % 180 === this.parentRotation % 180 ? (this.width = u.width / t, this.height = u.height / i) : (this.width = u.height / t, this.height = u.width / i), this.fixAndSetPosition();
        }
        commit() {
          if (!this.isInEditMode())
            return;
          super.commit(), this.disableEditMode();
          const t = this.#a, i = this.#a = this.#o().trimEnd();
          if (t === i)
            return;
          const u = (p) => {
            if (this.#a = p, !p) {
              this.remove();
              return;
            }
            this.#f(), this._uiManager.rebuild(this), this.#p();
          };
          this.addCommands({
            cmd: () => {
              u(i);
            },
            undo: () => {
              u(t);
            },
            mustExec: !1
          }), this.#p();
        }
        shouldGetKeyboardEvents() {
          return this.isInEditMode();
        }
        enterInEditMode() {
          this.enableEditMode(), this.editorDiv.focus();
        }
        dblclick(t) {
          this.enterInEditMode();
        }
        keydown(t) {
          t.target === this.div && t.key === "Enter" && (this.enterInEditMode(), t.preventDefault());
        }
        editorDivKeydown(t) {
          T._keyboardManager.exec(this, t);
        }
        editorDivFocus(t) {
          this.isEditing = !0;
        }
        editorDivBlur(t) {
          this.isEditing = !1;
        }
        editorDivInput(t) {
          this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
        }
        disableEditing() {
          this.editorDiv.setAttribute("role", "comment"), this.editorDiv.removeAttribute("aria-multiline");
        }
        enableEditing() {
          this.editorDiv.setAttribute("role", "textbox"), this.editorDiv.setAttribute("aria-multiline", !0);
        }
        render() {
          if (this.div)
            return this.div;
          let t, i;
          this.width && (t = this.x, i = this.y), super.render(), this.editorDiv = document.createElement("div"), this.editorDiv.className = "internal", this.editorDiv.setAttribute("id", this.#l), this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text"), this.enableEditing(), H.AnnotationEditor._l10nPromise.get("pdfjs-free-text-default-content").then((p) => this.editorDiv?.setAttribute("default-content", p)), this.editorDiv.contentEditable = !0;
          const {
            style: u
          } = this.editorDiv;
          if (u.fontSize = `calc(${this.#h}px * var(--scale-factor))`, u.color = this.#i, this.div.append(this.editorDiv), this.overlayDiv = document.createElement("div"), this.overlayDiv.classList.add("overlay", "enabled"), this.div.append(this.overlayDiv), (0, L.bindEvents)(this, this.div, ["dblclick", "keydown"]), this.width) {
            const [p, w] = this.parentDimensions;
            if (this.annotationElementId) {
              const {
                position: S
              } = this.#d;
              let [M, _] = this.getInitialTranslation();
              [M, _] = this.pageTranslationToScreen(M, _);
              const [O, B] = this.pageDimensions, [U, K] = this.pageTranslation;
              let rt, W;
              switch (this.rotation) {
                case 0:
                  rt = t + (S[0] - U) / O, W = i + this.height - (S[1] - K) / B;
                  break;
                case 90:
                  rt = t + (S[0] - U) / O, W = i - (S[1] - K) / B, [M, _] = [_, -M];
                  break;
                case 180:
                  rt = t - this.width + (S[0] - U) / O, W = i - (S[1] - K) / B, [M, _] = [-M, -_];
                  break;
                case 270:
                  rt = t + (S[0] - U - this.height * B) / O, W = i + (S[1] - K - this.width * O) / B, [M, _] = [-_, M];
                  break;
              }
              this.setAt(rt * p, W * w, M, _);
            } else
              this.setAt(t * p, i * w, this.width * p, this.height * w);
            this.#f(), this._isDraggable = !0, this.editorDiv.contentEditable = !1;
          } else
            this._isDraggable = !1, this.editorDiv.contentEditable = !0;
          return this.div;
        }
        static #g(t) {
          return (t.nodeType === Node.TEXT_NODE ? t.nodeValue : t.innerText).replaceAll(P, "");
        }
        editorDivPaste(t) {
          const i = t.clipboardData || window.clipboardData, {
            types: u
          } = i;
          if (u.length === 1 && u[0] === "text/plain")
            return;
          t.preventDefault();
          const p = T.#m(i.getData("text") || "").replaceAll(P, `
`);
          if (!p)
            return;
          const w = window.getSelection();
          if (!w.rangeCount)
            return;
          this.editorDiv.normalize(), w.deleteFromDocument();
          const S = w.getRangeAt(0);
          if (!p.includes(`
`)) {
            S.insertNode(document.createTextNode(p)), this.editorDiv.normalize(), w.collapseToStart();
            return;
          }
          const {
            startContainer: M,
            startOffset: _
          } = S, O = [], B = [];
          if (M.nodeType === Node.TEXT_NODE) {
            const rt = M.parentElement;
            if (B.push(M.nodeValue.slice(_).replaceAll(P, "")), rt !== this.editorDiv) {
              let W = O;
              for (const z of this.editorDiv.childNodes) {
                if (z === rt) {
                  W = B;
                  continue;
                }
                W.push(T.#g(z));
              }
            }
            O.push(M.nodeValue.slice(0, _).replaceAll(P, ""));
          } else if (M === this.editorDiv) {
            let rt = O, W = 0;
            for (const z of this.editorDiv.childNodes)
              W++ === _ && (rt = B), rt.push(T.#g(z));
          }
          this.#a = `${O.join(`
`)}${p}${B.join(`
`)}`, this.#f();
          const U = new Range();
          let K = O.reduce((rt, W) => rt + W.length, 0);
          for (const {
            firstChild: rt
          } of this.editorDiv.childNodes)
            if (rt.nodeType === Node.TEXT_NODE) {
              const W = rt.nodeValue.length;
              if (K <= W) {
                U.setStart(rt, K), U.setEnd(rt, K);
                break;
              }
              K -= W;
            }
          w.removeAllRanges(), w.addRange(U);
        }
        #f() {
          if (this.editorDiv.replaceChildren(), !!this.#a)
            for (const t of this.#a.split(`
`)) {
              const i = document.createElement("div");
              i.append(t ? document.createTextNode(t) : document.createElement("br")), this.editorDiv.append(i);
            }
        }
        #v() {
          return this.#a.replaceAll(" ", " ");
        }
        static #m(t) {
          return t.replaceAll(" ", " ");
        }
        get contentDiv() {
          return this.editorDiv;
        }
        static deserialize(t, i, u) {
          let p = null;
          if (t instanceof G.FreeTextAnnotationElement) {
            const {
              data: {
                defaultAppearanceData: {
                  fontSize: S,
                  fontColor: M
                },
                rect: _,
                rotation: O,
                id: B
              },
              textContent: U,
              textPosition: K,
              parent: {
                page: {
                  pageNumber: rt
                }
              }
            } = t;
            if (!U || U.length === 0)
              return null;
            p = t = {
              annotationType: v.AnnotationEditorType.FREETEXT,
              color: Array.from(M),
              fontSize: S,
              value: U.join(`
`),
              position: K,
              pageIndex: rt - 1,
              rect: _.slice(0),
              rotation: O,
              id: B,
              deleted: !1
            };
          }
          const w = super.deserialize(t, i, u);
          return w.#h = t.fontSize, w.#i = v.Util.makeHexColor(...t.color), w.#a = T.#m(t.value), w.annotationElementId = t.id || null, w.#d = p, w;
        }
        serialize(t = !1) {
          if (this.isEmpty())
            return null;
          if (this.deleted)
            return {
              pageIndex: this.pageIndex,
              id: this.annotationElementId,
              deleted: !0
            };
          const i = T._internalPadding * this.parentScale, u = this.getRect(i, i), p = H.AnnotationEditor._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.#i), w = {
            annotationType: v.AnnotationEditorType.FREETEXT,
            color: p,
            fontSize: this.#h,
            value: this.#v(),
            pageIndex: this.pageIndex,
            rect: u,
            rotation: this.rotation,
            structTreeParentId: this._structTreeParentId
          };
          return t ? w : this.annotationElementId && !this.#A(w) ? null : (w.id = this.annotationElementId, w);
        }
        #A(t) {
          const {
            value: i,
            fontSize: u,
            color: p,
            pageIndex: w
          } = this.#d;
          return this._hasBeenMoved || t.value !== i || t.fontSize !== u || t.color.some((S, M) => S !== p[M]) || t.pageIndex !== w;
        }
        renderAnnotationElement(t) {
          const i = super.renderAnnotationElement(t);
          if (this.deleted)
            return i;
          const {
            style: u
          } = i;
          u.fontSize = `calc(${this.#h}px * var(--scale-factor))`, u.color = this.#i, i.replaceChildren();
          for (const w of this.#a.split(`
`)) {
            const S = document.createElement("div");
            S.append(w ? document.createTextNode(w) : document.createElement("br")), i.append(S);
          }
          const p = T._internalPadding * this.parentScale;
          return t.updateEdited({
            rect: this.getRect(p, p)
          }), i;
        }
        resetAnnotationElement(t) {
          super.resetAnnotationElement(t), t.resetEdited();
        }
      }
      var E = I(61), y = I(259), r = I(419);
      class c extends H.AnnotationEditor {
        #t = null;
        #e = 0;
        #s;
        #n = null;
        #r = null;
        #i = null;
        #a = null;
        #l = 0;
        #h = null;
        #d = null;
        #u = null;
        #c = !1;
        #o = this.#x.bind(this);
        #p = null;
        #g;
        #f = null;
        #v = "";
        #m;
        #A = "";
        static _defaultColor = null;
        static _defaultOpacity = 1;
        static _defaultThickness = 12;
        static _l10nPromise;
        static _type = "highlight";
        static _editorType = v.AnnotationEditorType.HIGHLIGHT;
        static _freeHighlightId = -1;
        static _freeHighlight = null;
        static _freeHighlightClipId = "";
        static get _keyboardManager() {
          const t = c.prototype;
          return (0, v.shadow)(this, "_keyboardManager", new L.KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], t._moveCaret, {
            args: [0]
          }], [["ArrowRight", "mac+ArrowRight"], t._moveCaret, {
            args: [1]
          }], [["ArrowUp", "mac+ArrowUp"], t._moveCaret, {
            args: [2]
          }], [["ArrowDown", "mac+ArrowDown"], t._moveCaret, {
            args: [3]
          }]]));
        }
        constructor(t) {
          super({
            ...t,
            name: "highlightEditor"
          }), this.color = t.color || c._defaultColor, this.#m = t.thickness || c._defaultThickness, this.#g = t.opacity || c._defaultOpacity, this.#s = t.boxes || null, this.#A = t.methodOfCreation || "", this.#v = t.text || "", this._isDraggable = !1, t.highlightId > -1 ? (this.#c = !0, this.#C(t), this.#b()) : (this.#t = t.anchorNode, this.#e = t.anchorOffset, this.#a = t.focusNode, this.#l = t.focusOffset, this.#w(), this.#b(), this.rotate(this.rotation));
        }
        get telemetryInitialData() {
          return {
            action: "added",
            type: this.#c ? "free_highlight" : "highlight",
            color: this._uiManager.highlightColorNames.get(this.color),
            thickness: this.#m,
            methodOfCreation: this.#A
          };
        }
        get telemetryFinalData() {
          return {
            type: "highlight",
            color: this._uiManager.highlightColorNames.get(this.color)
          };
        }
        static computeTelemetryFinalData(t) {
          return {
            numberOfColors: t.get("color").size
          };
        }
        #w() {
          const t = new E.Outliner(this.#s, 1e-3);
          this.#d = t.getOutlines(), {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
          } = this.#d.box;
          const i = new E.Outliner(this.#s, 25e-4, 1e-3, this._uiManager.direction === "ltr");
          this.#i = i.getOutlines();
          const {
            lastPoint: u
          } = this.#i.box;
          this.#p = [(u[0] - this.x) / this.width, (u[1] - this.y) / this.height];
        }
        #C({
          highlightOutlines: t,
          highlightId: i,
          clipPathId: u
        }) {
          this.#d = t;
          const p = 1.5;
          if (this.#i = t.getNewOutline(this.#m / 2 + p, 25e-4), i >= 0)
            this.#u = i, this.#n = u, this.parent.drawLayer.finalizeLine(i, t), this.#f = this.parent.drawLayer.highlightOutline(this.#i);
          else if (this.parent) {
            const B = this.parent.viewport.rotation;
            this.parent.drawLayer.updateLine(this.#u, t), this.parent.drawLayer.updateBox(this.#u, c.#S(this.#d.box, (B - this.rotation + 360) % 360)), this.parent.drawLayer.updateLine(this.#f, this.#i), this.parent.drawLayer.updateBox(this.#f, c.#S(this.#i.box, B));
          }
          const {
            x: w,
            y: S,
            width: M,
            height: _
          } = t.box;
          switch (this.rotation) {
            case 0:
              this.x = w, this.y = S, this.width = M, this.height = _;
              break;
            case 90: {
              const [B, U] = this.parentDimensions;
              this.x = S, this.y = 1 - w, this.width = M * U / B, this.height = _ * B / U;
              break;
            }
            case 180:
              this.x = 1 - w, this.y = 1 - S, this.width = M, this.height = _;
              break;
            case 270: {
              const [B, U] = this.parentDimensions;
              this.x = 1 - S, this.y = w, this.width = M * U / B, this.height = _ * B / U;
              break;
            }
          }
          const {
            lastPoint: O
          } = this.#i.box;
          this.#p = [(O[0] - w) / M, (O[1] - S) / _];
        }
        static initialize(t, i) {
          H.AnnotationEditor.initialize(t, i), c._defaultColor ||= i.highlightColors?.values().next().value || "#fff066";
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case v.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
              c._defaultColor = i;
              break;
            case v.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
              c._defaultThickness = i;
              break;
          }
        }
        translateInPage(t, i) {
        }
        get toolbarPosition() {
          return this.#p;
        }
        updateParams(t, i) {
          switch (t) {
            case v.AnnotationEditorParamsType.HIGHLIGHT_COLOR:
              this.#R(i);
              break;
            case v.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
              this.#I(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[v.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR, c._defaultColor], [v.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, c._defaultThickness]];
        }
        get propertiesToUpdate() {
          return [[v.AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.color || c._defaultColor], [v.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, this.#m || c._defaultThickness], [v.AnnotationEditorParamsType.HIGHLIGHT_FREE, this.#c]];
        }
        #R(t) {
          const i = (p) => {
            this.color = p, this.parent?.drawLayer.changeColor(this.#u, p), this.#r?.updateColor(p);
          }, u = this.color;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: v.AnnotationEditorParamsType.HIGHLIGHT_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          }), this._reportTelemetry({
            action: "color_changed",
            color: this._uiManager.highlightColorNames.get(t)
          }, !0);
        }
        #I(t) {
          const i = this.#m, u = (p) => {
            this.#m = p, this.#L(p);
          };
          this.addCommands({
            cmd: u.bind(this, t),
            undo: u.bind(this, i),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: v.AnnotationEditorParamsType.INK_THICKNESS,
            overwriteIfSameType: !0,
            keepUndo: !0
          }), this._reportTelemetry({
            action: "thickness_changed",
            thickness: t
          }, !0);
        }
        async addEditToolbar() {
          const t = await super.addEditToolbar();
          return t ? (this._uiManager.highlightColors && (this.#r = new y.ColorPicker({
            editor: this
          }), t.addColorPicker(this.#r)), t) : null;
        }
        disableEditing() {
          super.disableEditing(), this.div.classList.toggle("disabled", !0);
        }
        enableEditing() {
          super.enableEditing(), this.div.classList.toggle("disabled", !1);
        }
        fixAndSetPosition() {
          return super.fixAndSetPosition(this.#T());
        }
        getBaseTranslation() {
          return [0, 0];
        }
        getRect(t, i) {
          return super.getRect(t, i, this.#T());
        }
        onceAdded() {
          this.parent.addUndoableEditor(this), this.div.focus();
        }
        remove() {
          this.#y(), this._reportTelemetry({
            action: "deleted"
          }), super.remove();
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.#b(), this.isAttachedToDOM || this.parent.add(this)));
        }
        setParent(t) {
          let i = !1;
          this.parent && !t ? this.#y() : t && (this.#b(t), i = !this.parent && this.div?.classList.contains("selectedEditor")), super.setParent(t), this.show(this._isVisible), i && this.select();
        }
        #L(t) {
          if (!this.#c)
            return;
          this.#C({
            highlightOutlines: this.#d.getNewOutline(t / 2)
          }), this.fixAndSetPosition();
          const [i, u] = this.parentDimensions;
          this.setDims(this.width * i, this.height * u);
        }
        #y() {
          this.#u === null || !this.parent || (this.parent.drawLayer.remove(this.#u), this.#u = null, this.parent.drawLayer.remove(this.#f), this.#f = null);
        }
        #b(t = this.parent) {
          this.#u === null && ({
            id: this.#u,
            clipPathId: this.#n
          } = t.drawLayer.highlight(this.#d, this.color, this.#g), this.#f = t.drawLayer.highlightOutline(this.#i), this.#h && (this.#h.style.clipPath = this.#n));
        }
        static #S({
          x: t,
          y: i,
          width: u,
          height: p
        }, w) {
          switch (w) {
            case 90:
              return {
                x: 1 - i - p,
                y: t,
                width: p,
                height: u
              };
            case 180:
              return {
                x: 1 - t - u,
                y: 1 - i - p,
                width: u,
                height: p
              };
            case 270:
              return {
                x: i,
                y: 1 - t - u,
                width: p,
                height: u
              };
          }
          return {
            x: t,
            y: i,
            width: u,
            height: p
          };
        }
        rotate(t) {
          const {
            drawLayer: i
          } = this.parent;
          let u;
          this.#c ? (t = (t - this.rotation + 360) % 360, u = c.#S(this.#d.box, t)) : u = c.#S(this, t), i.rotate(this.#u, t), i.rotate(this.#f, t), i.updateBox(this.#u, u), i.updateBox(this.#f, c.#S(this.#i.box, t));
        }
        render() {
          if (this.div)
            return this.div;
          const t = super.render();
          this.#v && (t.setAttribute("aria-label", this.#v), t.setAttribute("role", "mark")), this.#c ? t.classList.add("free") : this.div.addEventListener("keydown", this.#o);
          const i = this.#h = document.createElement("div");
          t.append(i), i.setAttribute("aria-hidden", "true"), i.className = "internal", i.style.clipPath = this.#n;
          const [u, p] = this.parentDimensions;
          return this.setDims(this.width * u, this.height * p), (0, L.bindEvents)(this, this.#h, ["pointerover", "pointerleave"]), this.enableEditing(), t;
        }
        pointerover() {
          this.parent.drawLayer.addClass(this.#f, "hovered");
        }
        pointerleave() {
          this.parent.drawLayer.removeClass(this.#f, "hovered");
        }
        #x(t) {
          c._keyboardManager.exec(this, t);
        }
        _moveCaret(t) {
          switch (this.parent.unselect(this), t) {
            case 0:
            case 2:
              this.#k(!0);
              break;
            case 1:
            case 3:
              this.#k(!1);
              break;
          }
        }
        #k(t) {
          if (!this.#t)
            return;
          const i = window.getSelection();
          t ? i.setPosition(this.#t, this.#e) : i.setPosition(this.#a, this.#l);
        }
        select() {
          super.select(), this.#f && (this.parent?.drawLayer.removeClass(this.#f, "hovered"), this.parent?.drawLayer.addClass(this.#f, "selected"));
        }
        unselect() {
          super.unselect(), this.#f && (this.parent?.drawLayer.removeClass(this.#f, "selected"), this.#c || this.#k(!1));
        }
        get _mustFixPosition() {
          return !this.#c;
        }
        show(t = this._isVisible) {
          super.show(t), this.parent && (this.parent.drawLayer.show(this.#u, t), this.parent.drawLayer.show(this.#f, t));
        }
        #T() {
          return this.#c ? this.rotation : 0;
        }
        #M() {
          if (this.#c)
            return null;
          const [t, i] = this.pageDimensions, u = this.#s, p = new Array(u.length * 8);
          let w = 0;
          for (const {
            x: S,
            y: M,
            width: _,
            height: O
          } of u) {
            const B = S * t, U = (1 - M - O) * i;
            p[w] = p[w + 4] = B, p[w + 1] = p[w + 3] = U, p[w + 2] = p[w + 6] = B + _ * t, p[w + 5] = p[w + 7] = U + O * i, w += 8;
          }
          return p;
        }
        #F(t) {
          return this.#d.serialize(t, this.#T());
        }
        static startHighlighting(t, i, {
          target: u,
          x: p,
          y: w
        }) {
          const {
            x: S,
            y: M,
            width: _,
            height: O
          } = u.getBoundingClientRect(), B = (W) => {
            this.#_(t, W);
          }, U = {
            capture: !0,
            passive: !1
          }, K = (W) => {
            W.preventDefault(), W.stopPropagation();
          }, rt = (W) => {
            u.removeEventListener("pointermove", B), window.removeEventListener("blur", rt), window.removeEventListener("pointerup", rt), window.removeEventListener("pointerdown", K, U), window.removeEventListener("contextmenu", r.noContextMenu), this.#P(t, W);
          };
          window.addEventListener("blur", rt), window.addEventListener("pointerup", rt), window.addEventListener("pointerdown", K, U), window.addEventListener("contextmenu", r.noContextMenu), u.addEventListener("pointermove", B), this._freeHighlight = new E.FreeOutliner({
            x: p,
            y: w
          }, [S, M, _, O], t.scale, this._defaultThickness / 2, i, 1e-3), {
            id: this._freeHighlightId,
            clipPathId: this._freeHighlightClipId
          } = t.drawLayer.highlight(this._freeHighlight, this._defaultColor, this._defaultOpacity, !0);
        }
        static #_(t, i) {
          this._freeHighlight.add(i) && t.drawLayer.updatePath(this._freeHighlightId, this._freeHighlight);
        }
        static #P(t, i) {
          this._freeHighlight.isEmpty() ? t.drawLayer.removeFreeHighlight(this._freeHighlightId) : t.createAndAddNewEditor(i, !1, {
            highlightId: this._freeHighlightId,
            highlightOutlines: this._freeHighlight.getOutlines(),
            clipPathId: this._freeHighlightClipId,
            methodOfCreation: "main_toolbar"
          }), this._freeHighlightId = -1, this._freeHighlight = null, this._freeHighlightClipId = "";
        }
        static deserialize(t, i, u) {
          const p = super.deserialize(t, i, u), {
            rect: [w, S, M, _],
            color: O,
            quadPoints: B
          } = t;
          p.color = v.Util.makeHexColor(...O), p.#g = t.opacity;
          const [U, K] = p.pageDimensions;
          p.width = (M - w) / U, p.height = (_ - S) / K;
          const rt = p.#s = [];
          for (let W = 0; W < B.length; W += 8)
            rt.push({
              x: (B[4] - M) / U,
              y: (_ - (1 - B[W + 5])) / K,
              width: (B[W + 2] - B[W]) / U,
              height: (B[W + 5] - B[W + 1]) / K
            });
          return p.#w(), p;
        }
        serialize(t = !1) {
          if (this.isEmpty() || t)
            return null;
          const i = this.getRect(0, 0), u = H.AnnotationEditor._colorManager.convert(this.color);
          return {
            annotationType: v.AnnotationEditorType.HIGHLIGHT,
            color: u,
            opacity: this.#g,
            thickness: this.#m,
            quadPoints: this.#M(),
            outlines: this.#F(i),
            pageIndex: this.pageIndex,
            rect: i,
            rotation: this.#T(),
            structTreeParentId: this._structTreeParentId
          };
        }
        static canCreateNewEmptyEditor() {
          return !1;
        }
      }
      class l extends H.AnnotationEditor {
        #t = 0;
        #e = 0;
        #s = this.canvasPointermove.bind(this);
        #n = this.canvasPointerleave.bind(this);
        #r = this.canvasPointerup.bind(this);
        #i = this.canvasPointerdown.bind(this);
        #a = null;
        #l = new Path2D();
        #h = !1;
        #d = !1;
        #u = !1;
        #c = null;
        #o = 0;
        #p = 0;
        #g = null;
        static _defaultColor = null;
        static _defaultOpacity = 1;
        static _defaultThickness = 1;
        static _type = "ink";
        static _editorType = v.AnnotationEditorType.INK;
        constructor(t) {
          super({
            ...t,
            name: "inkEditor"
          }), this.color = t.color || null, this.thickness = t.thickness || null, this.opacity = t.opacity || null, this.paths = [], this.bezierPath2D = [], this.allRawPaths = [], this.currentPath = [], this.scaleFactor = 1, this.translationX = this.translationY = 0, this.x = 0, this.y = 0, this._willKeepAspectRatio = !0;
        }
        static initialize(t, i) {
          H.AnnotationEditor.initialize(t, i);
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case v.AnnotationEditorParamsType.INK_THICKNESS:
              l._defaultThickness = i;
              break;
            case v.AnnotationEditorParamsType.INK_COLOR:
              l._defaultColor = i;
              break;
            case v.AnnotationEditorParamsType.INK_OPACITY:
              l._defaultOpacity = i / 100;
              break;
          }
        }
        updateParams(t, i) {
          switch (t) {
            case v.AnnotationEditorParamsType.INK_THICKNESS:
              this.#f(i);
              break;
            case v.AnnotationEditorParamsType.INK_COLOR:
              this.#v(i);
              break;
            case v.AnnotationEditorParamsType.INK_OPACITY:
              this.#m(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[v.AnnotationEditorParamsType.INK_THICKNESS, l._defaultThickness], [v.AnnotationEditorParamsType.INK_COLOR, l._defaultColor || H.AnnotationEditor._defaultLineColor], [v.AnnotationEditorParamsType.INK_OPACITY, Math.round(l._defaultOpacity * 100)]];
        }
        get propertiesToUpdate() {
          return [[v.AnnotationEditorParamsType.INK_THICKNESS, this.thickness || l._defaultThickness], [v.AnnotationEditorParamsType.INK_COLOR, this.color || l._defaultColor || H.AnnotationEditor._defaultLineColor], [v.AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * (this.opacity ?? l._defaultOpacity))]];
        }
        #f(t) {
          const i = (p) => {
            this.thickness = p, this.#D();
          }, u = this.thickness;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: v.AnnotationEditorParamsType.INK_THICKNESS,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #v(t) {
          const i = (p) => {
            this.color = p, this.#x();
          }, u = this.color;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: v.AnnotationEditorParamsType.INK_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #m(t) {
          const i = (p) => {
            this.opacity = p, this.#x();
          };
          t /= 100;
          const u = this.opacity;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: v.AnnotationEditorParamsType.INK_OPACITY,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.canvas || (this.#T(), this.#M()), this.isAttachedToDOM || (this.parent.add(this), this.#F()), this.#D()));
        }
        remove() {
          this.canvas !== null && (this.isEmpty() || this.commit(), this.canvas.width = this.canvas.height = 0, this.canvas.remove(), this.canvas = null, this.#a && (clearTimeout(this.#a), this.#a = null), this.#c.disconnect(), this.#c = null, super.remove());
        }
        setParent(t) {
          !this.parent && t ? this._uiManager.removeShouldRescale(this) : this.parent && t === null && this._uiManager.addShouldRescale(this), super.setParent(t);
        }
        onScaleChanging() {
          const [t, i] = this.parentDimensions, u = this.width * t, p = this.height * i;
          this.setDimensions(u, p);
        }
        enableEditMode() {
          this.#h || this.canvas === null || (super.enableEditMode(), this._isDraggable = !1, this.canvas.addEventListener("pointerdown", this.#i));
        }
        disableEditMode() {
          !this.isInEditMode() || this.canvas === null || (super.disableEditMode(), this._isDraggable = !this.isEmpty(), this.div.classList.remove("editing"), this.canvas.removeEventListener("pointerdown", this.#i));
        }
        onceAdded() {
          this._isDraggable = !this.isEmpty();
        }
        isEmpty() {
          return this.paths.length === 0 || this.paths.length === 1 && this.paths[0].length === 0;
        }
        #A() {
          const {
            parentRotation: t,
            parentDimensions: [i, u]
          } = this;
          switch (t) {
            case 90:
              return [0, u, u, i];
            case 180:
              return [i, u, i, u];
            case 270:
              return [i, 0, u, i];
            default:
              return [0, 0, i, u];
          }
        }
        #w() {
          const {
            ctx: t,
            color: i,
            opacity: u,
            thickness: p,
            parentScale: w,
            scaleFactor: S
          } = this;
          t.lineWidth = p * w / S, t.lineCap = "round", t.lineJoin = "round", t.miterLimit = 10, t.strokeStyle = `${i}${(0, L.opacityToHex)(u)}`;
        }
        #C(t, i) {
          this.canvas.addEventListener("contextmenu", r.noContextMenu), this.canvas.addEventListener("pointerleave", this.#n), this.canvas.addEventListener("pointermove", this.#s), this.canvas.addEventListener("pointerup", this.#r), this.canvas.removeEventListener("pointerdown", this.#i), this.isEditing = !0, this.#u || (this.#u = !0, this.#F(), this.thickness ||= l._defaultThickness, this.color ||= l._defaultColor || H.AnnotationEditor._defaultLineColor, this.opacity ??= l._defaultOpacity), this.currentPath.push([t, i]), this.#d = !1, this.#w(), this.#g = () => {
            this.#y(), this.#g && window.requestAnimationFrame(this.#g);
          }, window.requestAnimationFrame(this.#g);
        }
        #R(t, i) {
          const [u, p] = this.currentPath.at(-1);
          if (this.currentPath.length > 1 && t === u && i === p)
            return;
          const w = this.currentPath;
          let S = this.#l;
          if (w.push([t, i]), this.#d = !0, w.length <= 2) {
            S.moveTo(...w[0]), S.lineTo(t, i);
            return;
          }
          w.length === 3 && (this.#l = S = new Path2D(), S.moveTo(...w[0])), this.#b(S, ...w.at(-3), ...w.at(-2), t, i);
        }
        #I() {
          if (this.currentPath.length === 0)
            return;
          const t = this.currentPath.at(-1);
          this.#l.lineTo(...t);
        }
        #L(t, i) {
          this.#g = null, t = Math.min(Math.max(t, 0), this.canvas.width), i = Math.min(Math.max(i, 0), this.canvas.height), this.#R(t, i), this.#I();
          let u;
          if (this.currentPath.length !== 1)
            u = this.#S();
          else {
            const _ = [t, i];
            u = [[_, _.slice(), _.slice(), _]];
          }
          const p = this.#l, w = this.currentPath;
          this.currentPath = [], this.#l = new Path2D();
          const S = () => {
            this.allRawPaths.push(w), this.paths.push(u), this.bezierPath2D.push(p), this._uiManager.rebuild(this);
          }, M = () => {
            this.allRawPaths.pop(), this.paths.pop(), this.bezierPath2D.pop(), this.paths.length === 0 ? this.remove() : (this.canvas || (this.#T(), this.#M()), this.#D());
          };
          this.addCommands({
            cmd: S,
            undo: M,
            mustExec: !0
          });
        }
        #y() {
          if (!this.#d)
            return;
          this.#d = !1;
          const t = Math.ceil(this.thickness * this.parentScale), i = this.currentPath.slice(-3), u = i.map((S) => S[0]), p = i.map((S) => S[1]);
          Math.min(...u) - t, Math.max(...u) + t, Math.min(...p) - t, Math.max(...p) + t;
          const {
            ctx: w
          } = this;
          w.save(), w.clearRect(0, 0, this.canvas.width, this.canvas.height);
          for (const S of this.bezierPath2D)
            w.stroke(S);
          w.stroke(this.#l), w.restore();
        }
        #b(t, i, u, p, w, S, M) {
          const _ = (i + p) / 2, O = (u + w) / 2, B = (p + S) / 2, U = (w + M) / 2;
          t.bezierCurveTo(_ + 2 * (p - _) / 3, O + 2 * (w - O) / 3, B + 2 * (p - B) / 3, U + 2 * (w - U) / 3, B, U);
        }
        #S() {
          const t = this.currentPath;
          if (t.length <= 2)
            return [[t[0], t[0], t.at(-1), t.at(-1)]];
          const i = [];
          let u, [p, w] = t[0];
          for (u = 1; u < t.length - 2; u++) {
            const [K, rt] = t[u], [W, z] = t[u + 1], V = (K + W) / 2, q = (rt + z) / 2, st = [p + 2 * (K - p) / 3, w + 2 * (rt - w) / 3], et = [V + 2 * (K - V) / 3, q + 2 * (rt - q) / 3];
            i.push([[p, w], st, et, [V, q]]), [p, w] = [V, q];
          }
          const [S, M] = t[u], [_, O] = t[u + 1], B = [p + 2 * (S - p) / 3, w + 2 * (M - w) / 3], U = [_ + 2 * (S - _) / 3, O + 2 * (M - O) / 3];
          return i.push([[p, w], B, U, [_, O]]), i;
        }
        #x() {
          if (this.isEmpty()) {
            this.#P();
            return;
          }
          this.#w();
          const {
            canvas: t,
            ctx: i
          } = this;
          i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, t.width, t.height), this.#P();
          for (const u of this.bezierPath2D)
            i.stroke(u);
        }
        commit() {
          this.#h || (super.commit(), this.isEditing = !1, this.disableEditMode(), this.setInForeground(), this.#h = !0, this.div.classList.add("disabled"), this.#D(!0), this.select(), this.parent.addInkEditorIfNeeded(!0), this.moveInDOM(), this.div.focus({
            preventScroll: !0
          }));
        }
        focusin(t) {
          this._focusEventsAllowed && (super.focusin(t), this.enableEditMode());
        }
        canvasPointerdown(t) {
          t.button !== 0 || !this.isInEditMode() || this.#h || (this.setInForeground(), t.preventDefault(), this.div.contains(document.activeElement) || this.div.focus({
            preventScroll: !0
          }), this.#C(t.offsetX, t.offsetY));
        }
        canvasPointermove(t) {
          t.preventDefault(), this.#R(t.offsetX, t.offsetY);
        }
        canvasPointerup(t) {
          t.preventDefault(), this.#k(t);
        }
        canvasPointerleave(t) {
          this.#k(t);
        }
        #k(t) {
          this.canvas.removeEventListener("pointerleave", this.#n), this.canvas.removeEventListener("pointermove", this.#s), this.canvas.removeEventListener("pointerup", this.#r), this.canvas.addEventListener("pointerdown", this.#i), this.#a && clearTimeout(this.#a), this.#a = setTimeout(() => {
            this.#a = null, this.canvas.removeEventListener("contextmenu", r.noContextMenu);
          }, 10), this.#L(t.offsetX, t.offsetY), this.addToAnnotationStorage(), this.setInBackground();
        }
        #T() {
          this.canvas = document.createElement("canvas"), this.canvas.width = this.canvas.height = 0, this.canvas.className = "inkEditorCanvas", this.canvas.setAttribute("data-l10n-id", "pdfjs-ink-canvas"), this.div.append(this.canvas), this.ctx = this.canvas.getContext("2d");
        }
        #M() {
          this.#c = new ResizeObserver((t) => {
            const i = t[0].contentRect;
            i.width && i.height && this.setDimensions(i.width, i.height);
          }), this.#c.observe(this.div);
        }
        get isResizable() {
          return !this.isEmpty() && this.#h;
        }
        render() {
          if (this.div)
            return this.div;
          let t, i;
          this.width && (t = this.x, i = this.y), super.render(), this.div.setAttribute("data-l10n-id", "pdfjs-ink");
          const [u, p, w, S] = this.#A();
          if (this.setAt(u, p, 0, 0), this.setDims(w, S), this.#T(), this.width) {
            const [M, _] = this.parentDimensions;
            this.setAspectRatio(this.width * M, this.height * _), this.setAt(t * M, i * _, this.width * M, this.height * _), this.#u = !0, this.#F(), this.setDims(this.width * M, this.height * _), this.#x(), this.div.classList.add("disabled");
          } else
            this.div.classList.add("editing"), this.enableEditMode();
          return this.#M(), this.div;
        }
        #F() {
          if (!this.#u)
            return;
          const [t, i] = this.parentDimensions;
          this.canvas.width = Math.ceil(this.width * t), this.canvas.height = Math.ceil(this.height * i), this.#P();
        }
        setDimensions(t, i) {
          const u = Math.round(t), p = Math.round(i);
          if (this.#o === u && this.#p === p)
            return;
          this.#o = u, this.#p = p, this.canvas.style.visibility = "hidden";
          const [w, S] = this.parentDimensions;
          this.width = t / w, this.height = i / S, this.fixAndSetPosition(), this.#h && this.#_(t, i), this.#F(), this.#x(), this.canvas.style.visibility = "visible", this.fixDims();
        }
        #_(t, i) {
          const u = this.#z(), p = (t - u) / this.#e, w = (i - u) / this.#t;
          this.scaleFactor = Math.min(p, w);
        }
        #P() {
          const t = this.#z() / 2;
          this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.translationX * this.scaleFactor + t, this.translationY * this.scaleFactor + t);
        }
        static #N(t) {
          const i = new Path2D();
          for (let u = 0, p = t.length; u < p; u++) {
            const [w, S, M, _] = t[u];
            u === 0 && i.moveTo(...w), i.bezierCurveTo(S[0], S[1], M[0], M[1], _[0], _[1]);
          }
          return i;
        }
        static #$(t, i, u) {
          const [p, w, S, M] = i;
          switch (u) {
            case 0:
              for (let _ = 0, O = t.length; _ < O; _ += 2)
                t[_] += p, t[_ + 1] = M - t[_ + 1];
              break;
            case 90:
              for (let _ = 0, O = t.length; _ < O; _ += 2) {
                const B = t[_];
                t[_] = t[_ + 1] + p, t[_ + 1] = B + w;
              }
              break;
            case 180:
              for (let _ = 0, O = t.length; _ < O; _ += 2)
                t[_] = S - t[_], t[_ + 1] += w;
              break;
            case 270:
              for (let _ = 0, O = t.length; _ < O; _ += 2) {
                const B = t[_];
                t[_] = S - t[_ + 1], t[_ + 1] = M - B;
              }
              break;
            default:
              throw new Error("Invalid rotation");
          }
          return t;
        }
        static #V(t, i, u) {
          const [p, w, S, M] = i;
          switch (u) {
            case 0:
              for (let _ = 0, O = t.length; _ < O; _ += 2)
                t[_] -= p, t[_ + 1] = M - t[_ + 1];
              break;
            case 90:
              for (let _ = 0, O = t.length; _ < O; _ += 2) {
                const B = t[_];
                t[_] = t[_ + 1] - w, t[_ + 1] = B - p;
              }
              break;
            case 180:
              for (let _ = 0, O = t.length; _ < O; _ += 2)
                t[_] = S - t[_], t[_ + 1] -= w;
              break;
            case 270:
              for (let _ = 0, O = t.length; _ < O; _ += 2) {
                const B = t[_];
                t[_] = M - t[_ + 1], t[_ + 1] = S - B;
              }
              break;
            default:
              throw new Error("Invalid rotation");
          }
          return t;
        }
        #X(t, i, u, p) {
          const w = [], S = this.thickness / 2, M = t * i + S, _ = t * u + S;
          for (const O of this.paths) {
            const B = [], U = [];
            for (let K = 0, rt = O.length; K < rt; K++) {
              const [W, z, V, q] = O[K];
              if (W[0] === q[0] && W[1] === q[1] && rt === 1) {
                const it = t * W[0] + M, m = t * W[1] + _;
                B.push(it, m), U.push(it, m);
                break;
              }
              const st = t * W[0] + M, et = t * W[1] + _, ot = t * z[0] + M, dt = t * z[1] + _, mt = t * V[0] + M, ut = t * V[1] + _, ht = t * q[0] + M, ft = t * q[1] + _;
              K === 0 && (B.push(st, et), U.push(st, et)), B.push(ot, dt, mt, ut, ht, ft), U.push(ot, dt), K === rt - 1 && U.push(ht, ft);
            }
            w.push({
              bezier: l.#$(B, p, this.rotation),
              points: l.#$(U, p, this.rotation)
            });
          }
          return w;
        }
        #G() {
          let t = 1 / 0, i = -1 / 0, u = 1 / 0, p = -1 / 0;
          for (const w of this.paths)
            for (const [S, M, _, O] of w) {
              const B = v.Util.bezierBoundingBox(...S, ...M, ..._, ...O);
              t = Math.min(t, B[0]), u = Math.min(u, B[1]), i = Math.max(i, B[2]), p = Math.max(p, B[3]);
            }
          return [t, u, i, p];
        }
        #z() {
          return this.#h ? Math.ceil(this.thickness * this.parentScale) : 0;
        }
        #D(t = !1) {
          if (this.isEmpty())
            return;
          if (!this.#h) {
            this.#x();
            return;
          }
          const i = this.#G(), u = this.#z();
          this.#e = Math.max(H.AnnotationEditor.MIN_SIZE, i[2] - i[0]), this.#t = Math.max(H.AnnotationEditor.MIN_SIZE, i[3] - i[1]);
          const p = Math.ceil(u + this.#e * this.scaleFactor), w = Math.ceil(u + this.#t * this.scaleFactor), [S, M] = this.parentDimensions;
          this.width = p / S, this.height = w / M, this.setAspectRatio(p, w);
          const _ = this.translationX, O = this.translationY;
          this.translationX = -i[0], this.translationY = -i[1], this.#F(), this.#x(), this.#o = p, this.#p = w, this.setDims(p, w);
          const B = t ? u / this.scaleFactor / 2 : 0;
          this.translate(_ - this.translationX - B, O - this.translationY - B);
        }
        static deserialize(t, i, u) {
          if (t instanceof G.InkAnnotationElement)
            return null;
          const p = super.deserialize(t, i, u);
          p.thickness = t.thickness, p.color = v.Util.makeHexColor(...t.color), p.opacity = t.opacity;
          const [w, S] = p.pageDimensions, M = p.width * w, _ = p.height * S, O = p.parentScale, B = t.thickness / 2;
          p.#h = !0, p.#o = Math.round(M), p.#p = Math.round(_);
          const {
            paths: U,
            rect: K,
            rotation: rt
          } = t;
          for (let {
            bezier: z
          } of U) {
            z = l.#V(z, K, rt);
            const V = [];
            p.paths.push(V);
            let q = O * (z[0] - B), st = O * (z[1] - B);
            for (let ot = 2, dt = z.length; ot < dt; ot += 6) {
              const mt = O * (z[ot] - B), ut = O * (z[ot + 1] - B), ht = O * (z[ot + 2] - B), ft = O * (z[ot + 3] - B), it = O * (z[ot + 4] - B), m = O * (z[ot + 5] - B);
              V.push([[q, st], [mt, ut], [ht, ft], [it, m]]), q = it, st = m;
            }
            const et = this.#N(V);
            p.bezierPath2D.push(et);
          }
          const W = p.#G();
          return p.#e = Math.max(H.AnnotationEditor.MIN_SIZE, W[2] - W[0]), p.#t = Math.max(H.AnnotationEditor.MIN_SIZE, W[3] - W[1]), p.#_(M, _), p;
        }
        serialize() {
          if (this.isEmpty())
            return null;
          const t = this.getRect(0, 0), i = H.AnnotationEditor._colorManager.convert(this.ctx.strokeStyle);
          return {
            annotationType: v.AnnotationEditorType.INK,
            color: i,
            thickness: this.thickness,
            opacity: this.opacity,
            paths: this.#X(this.scaleFactor / this.parentScale, this.translationX, this.translationY, t),
            pageIndex: this.pageIndex,
            rect: t,
            rotation: this.rotation,
            structTreeParentId: this._structTreeParentId
          };
        }
      }
      class b extends H.AnnotationEditor {
        #t = null;
        #e = null;
        #s = null;
        #n = null;
        #r = null;
        #i = "";
        #a = null;
        #l = null;
        #h = null;
        #d = !1;
        #u = !1;
        static _type = "stamp";
        static _editorType = v.AnnotationEditorType.STAMP;
        constructor(t) {
          super({
            ...t,
            name: "stampEditor"
          }), this.#n = t.bitmapUrl, this.#r = t.bitmapFile;
        }
        static initialize(t, i) {
          H.AnnotationEditor.initialize(t, i);
        }
        static get supportedTypes() {
          const t = ["apng", "avif", "bmp", "gif", "jpeg", "png", "svg+xml", "webp", "x-icon"];
          return (0, v.shadow)(this, "supportedTypes", t.map((i) => `image/${i}`));
        }
        static get supportedTypesStr() {
          return (0, v.shadow)(this, "supportedTypesStr", this.supportedTypes.join(","));
        }
        static isHandlingMimeForPasting(t) {
          return this.supportedTypes.includes(t);
        }
        static paste(t, i) {
          i.pasteEditor(v.AnnotationEditorType.STAMP, {
            bitmapFile: t.getAsFile()
          });
        }
        #c(t, i = !1) {
          if (!t) {
            this.remove();
            return;
          }
          this.#t = t.bitmap, i || (this.#e = t.id, this.#d = t.isSvg), t.file && (this.#i = t.file.name), this.#g();
        }
        #o() {
          this.#s = null, this._uiManager.enableWaiting(!1), this.#a && this.div.focus();
        }
        #p() {
          if (this.#e) {
            this._uiManager.enableWaiting(!0), this._uiManager.imageManager.getFromId(this.#e).then((i) => this.#c(i, !0)).finally(() => this.#o());
            return;
          }
          if (this.#n) {
            const i = this.#n;
            this.#n = null, this._uiManager.enableWaiting(!0), this.#s = this._uiManager.imageManager.getFromUrl(i).then((u) => this.#c(u)).finally(() => this.#o());
            return;
          }
          if (this.#r) {
            const i = this.#r;
            this.#r = null, this._uiManager.enableWaiting(!0), this.#s = this._uiManager.imageManager.getFromFile(i).then((u) => this.#c(u)).finally(() => this.#o());
            return;
          }
          const t = document.createElement("input");
          t.type = "file", t.accept = b.supportedTypesStr, this.#s = new Promise((i) => {
            t.addEventListener("change", async () => {
              if (!t.files || t.files.length === 0)
                this.remove();
              else {
                this._uiManager.enableWaiting(!0);
                const u = await this._uiManager.imageManager.getFromFile(t.files[0]);
                this.#c(u);
              }
              i();
            }), t.addEventListener("cancel", () => {
              this.remove(), i();
            });
          }).finally(() => this.#o()), t.click();
        }
        remove() {
          this.#e && (this.#t = null, this._uiManager.imageManager.deleteId(this.#e), this.#a?.remove(), this.#a = null, this.#l?.disconnect(), this.#l = null, this.#h && (clearTimeout(this.#h), this.#h = null)), super.remove();
        }
        rebuild() {
          if (!this.parent) {
            this.#e && this.#p();
            return;
          }
          super.rebuild(), this.div !== null && (this.#e && this.#a === null && this.#p(), this.isAttachedToDOM || this.parent.add(this));
        }
        onceAdded() {
          this._isDraggable = !0, this.div.focus();
        }
        isEmpty() {
          return !(this.#s || this.#t || this.#n || this.#r || this.#e);
        }
        get isResizable() {
          return !0;
        }
        render() {
          if (this.div)
            return this.div;
          let t, i;
          if (this.width && (t = this.x, i = this.y), super.render(), this.div.hidden = !0, this.addAltTextButton(), this.#t ? this.#g() : this.#p(), this.width) {
            const [u, p] = this.parentDimensions;
            this.setAt(t * u, i * p, this.width * u, this.height * p);
          }
          return this.div;
        }
        #g() {
          const {
            div: t
          } = this;
          let {
            width: i,
            height: u
          } = this.#t;
          const [p, w] = this.pageDimensions, S = 0.75;
          if (this.width)
            i = this.width * p, u = this.height * w;
          else if (i > S * p || u > S * w) {
            const B = Math.min(S * p / i, S * w / u);
            i *= B, u *= B;
          }
          const [M, _] = this.parentDimensions;
          this.setDims(i * M / p, u * _ / w), this._uiManager.enableWaiting(!1);
          const O = this.#a = document.createElement("canvas");
          t.append(O), t.hidden = !1, this.#m(i, u), this.#w(), this.#u || (this.parent.addUndoableEditor(this), this.#u = !0), this._reportTelemetry({
            action: "inserted_image"
          }), this.#i && O.setAttribute("aria-label", this.#i);
        }
        #f(t, i) {
          const [u, p] = this.parentDimensions;
          this.width = t / u, this.height = i / p, this.setDims(t, i), this._initialOptions?.isCentered ? this.center() : this.fixAndSetPosition(), this._initialOptions = null, this.#h !== null && clearTimeout(this.#h);
          const w = 200;
          this.#h = setTimeout(() => {
            this.#h = null, this.#m(t, i);
          }, w);
        }
        #v(t, i) {
          const {
            width: u,
            height: p
          } = this.#t;
          let w = u, S = p, M = this.#t;
          for (; w > 2 * t || S > 2 * i; ) {
            const _ = w, O = S;
            w > 2 * t && (w = w >= 16384 ? Math.floor(w / 2) - 1 : Math.ceil(w / 2)), S > 2 * i && (S = S >= 16384 ? Math.floor(S / 2) - 1 : Math.ceil(S / 2));
            const B = new OffscreenCanvas(w, S);
            B.getContext("2d").drawImage(M, 0, 0, _, O, 0, 0, w, S), M = B.transferToImageBitmap();
          }
          return M;
        }
        #m(t, i) {
          t = Math.ceil(t), i = Math.ceil(i);
          const u = this.#a;
          if (!u || u.width === t && u.height === i)
            return;
          u.width = t, u.height = i;
          const p = this.#d ? this.#t : this.#v(t, i);
          if (this._uiManager.hasMLManager && !this.hasAltText()) {
            const S = new OffscreenCanvas(t, i);
            S.getContext("2d").drawImage(p, 0, 0, p.width, p.height, 0, 0, t, i), S.convertToBlob().then((_) => {
              const O = new FileReader();
              O.onload = () => {
                const B = O.result;
                this._uiManager.mlGuess({
                  service: "image-to-text",
                  request: {
                    imageData: B
                  }
                }).then((U) => {
                  const K = U?.output || "";
                  this.parent && K && !this.hasAltText() && (this.altTextData = {
                    altText: K,
                    decorative: !1
                  });
                });
              }, O.readAsDataURL(_);
            });
          }
          const w = u.getContext("2d");
          w.filter = this._uiManager.hcmFilter, w.drawImage(p, 0, 0, p.width, p.height, 0, 0, t, i);
        }
        getImageForAltText() {
          return this.#a;
        }
        #A(t) {
          if (t) {
            if (this.#d) {
              const p = this._uiManager.imageManager.getSvgUrl(this.#e);
              if (p)
                return p;
            }
            const i = document.createElement("canvas");
            return {
              width: i.width,
              height: i.height
            } = this.#t, i.getContext("2d").drawImage(this.#t, 0, 0), i.toDataURL();
          }
          if (this.#d) {
            const [i, u] = this.pageDimensions, p = Math.round(this.width * i * r.PixelsPerInch.PDF_TO_CSS_UNITS), w = Math.round(this.height * u * r.PixelsPerInch.PDF_TO_CSS_UNITS), S = new OffscreenCanvas(p, w);
            return S.getContext("2d").drawImage(this.#t, 0, 0, this.#t.width, this.#t.height, 0, 0, p, w), S.transferToImageBitmap();
          }
          return structuredClone(this.#t);
        }
        #w() {
          this.#l = new ResizeObserver((t) => {
            const i = t[0].contentRect;
            i.width && i.height && this.#f(i.width, i.height);
          }), this.#l.observe(this.div);
        }
        static deserialize(t, i, u) {
          if (t instanceof G.StampAnnotationElement)
            return null;
          const p = super.deserialize(t, i, u), {
            rect: w,
            bitmapUrl: S,
            bitmapId: M,
            isSvg: _,
            accessibilityData: O
          } = t;
          M && u.imageManager.isValidId(M) ? p.#e = M : p.#n = S, p.#d = _;
          const [B, U] = p.pageDimensions;
          return p.width = (w[2] - w[0]) / B, p.height = (w[3] - w[1]) / U, O && (p.altTextData = O), p;
        }
        serialize(t = !1, i = null) {
          if (this.isEmpty())
            return null;
          const u = {
            annotationType: v.AnnotationEditorType.STAMP,
            bitmapId: this.#e,
            pageIndex: this.pageIndex,
            rect: this.getRect(0, 0),
            rotation: this.rotation,
            isSvg: this.#d,
            structTreeParentId: this._structTreeParentId
          };
          if (t)
            return u.bitmapUrl = this.#A(!0), u.accessibilityData = this.altTextData, u;
          const {
            decorative: p,
            altText: w
          } = this.altTextData;
          if (!p && w && (u.accessibilityData = {
            type: "Figure",
            alt: w
          }), i === null)
            return u;
          i.stamps ||= /* @__PURE__ */ new Map();
          const S = this.#d ? (u.rect[2] - u.rect[0]) * (u.rect[3] - u.rect[1]) : null;
          if (!i.stamps.has(this.#e))
            i.stamps.set(this.#e, {
              area: S,
              serialized: u
            }), u.bitmap = this.#A(!1);
          else if (this.#d) {
            const M = i.stamps.get(this.#e);
            S > M.area && (M.area = S, M.serialized.bitmap.close(), M.serialized.bitmap = this.#A(!1));
          }
          return u;
        }
      }
      class s {
        #t;
        #e = !1;
        #s = null;
        #n = null;
        #r = null;
        #i = null;
        #a = null;
        #l = /* @__PURE__ */ new Map();
        #h = !1;
        #d = !1;
        #u = !1;
        #c = null;
        #o;
        static _initialized = !1;
        static #p = new Map([T, l, b, c].map((t) => [t._editorType, t]));
        constructor({
          uiManager: t,
          pageIndex: i,
          div: u,
          accessibilityManager: p,
          annotationLayer: w,
          drawLayer: S,
          textLayer: M,
          viewport: _,
          l10n: O
        }) {
          const B = [...s.#p.values()];
          if (!s._initialized) {
            s._initialized = !0;
            for (const U of B)
              U.initialize(O, t);
          }
          t.registerEditorTypes(B), this.#o = t, this.pageIndex = i, this.div = u, this.#t = p, this.#s = w, this.viewport = _, this.#c = M, this.drawLayer = S, this.#o.addLayer(this);
        }
        get isEmpty() {
          return this.#l.size === 0;
        }
        get isInvisible() {
          return this.isEmpty && this.#o.getMode() === v.AnnotationEditorType.NONE;
        }
        updateToolbar(t) {
          this.#o.updateToolbar(t);
        }
        updateMode(t = this.#o.getMode()) {
          switch (this.#A(), t) {
            case v.AnnotationEditorType.NONE:
              this.disableTextSelection(), this.togglePointerEvents(!1), this.toggleAnnotationLayerPointerEvents(!0), this.disableClick();
              return;
            case v.AnnotationEditorType.INK:
              this.addInkEditorIfNeeded(!1), this.disableTextSelection(), this.togglePointerEvents(!0), this.disableClick();
              break;
            case v.AnnotationEditorType.HIGHLIGHT:
              this.enableTextSelection(), this.togglePointerEvents(!1), this.disableClick();
              break;
            default:
              this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
          }
          this.toggleAnnotationLayerPointerEvents(!1);
          const {
            classList: i
          } = this.div;
          for (const u of s.#p.values())
            i.toggle(`${u._type}Editing`, t === u._editorType);
          this.div.hidden = !1;
        }
        hasTextLayer(t) {
          return t === this.#c?.div;
        }
        addInkEditorIfNeeded(t) {
          if (this.#o.getMode() !== v.AnnotationEditorType.INK)
            return;
          if (!t) {
            for (const u of this.#l.values())
              if (u.isEmpty()) {
                u.setInBackground();
                return;
              }
          }
          this.createAndAddNewEditor({
            offsetX: 0,
            offsetY: 0
          }, !1).setInBackground();
        }
        setEditingState(t) {
          this.#o.setEditingState(t);
        }
        addCommands(t) {
          this.#o.addCommands(t);
        }
        togglePointerEvents(t = !1) {
          this.div.classList.toggle("disabled", !t);
        }
        toggleAnnotationLayerPointerEvents(t = !1) {
          this.#s?.div.classList.toggle("disabled", !t);
        }
        enable() {
          this.div.tabIndex = 0, this.togglePointerEvents(!0);
          const t = /* @__PURE__ */ new Set();
          for (const u of this.#l.values())
            u.enableEditing(), u.show(!0), u.annotationElementId && (this.#o.removeChangedExistingAnnotation(u), t.add(u.annotationElementId));
          if (!this.#s)
            return;
          const i = this.#s.getEditableAnnotations();
          for (const u of i) {
            if (u.hide(), this.#o.isDeletedAnnotationElement(u.data.id) || t.has(u.data.id))
              continue;
            const p = this.deserialize(u);
            p && (this.addOrRebuild(p), p.enableEditing());
          }
        }
        disable() {
          this.#u = !0, this.div.tabIndex = -1, this.togglePointerEvents(!1);
          const t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
          for (const p of this.#l.values())
            if (p.disableEditing(), !!p.annotationElementId) {
              if (p.serialize() !== null) {
                t.set(p.annotationElementId, p);
                continue;
              } else
                i.set(p.annotationElementId, p);
              this.getEditableAnnotation(p.annotationElementId)?.show(), p.remove();
            }
          if (this.#s) {
            const p = this.#s.getEditableAnnotations();
            for (const w of p) {
              const {
                id: S
              } = w.data;
              if (this.#o.isDeletedAnnotationElement(S))
                continue;
              let M = i.get(S);
              if (M) {
                M.resetAnnotationElement(w), M.show(!1), w.show();
                continue;
              }
              M = t.get(S), M && (this.#o.addChangedExistingAnnotation(M), M.renderAnnotationElement(w), M.show(!1)), w.show();
            }
          }
          this.#A(), this.isEmpty && (this.div.hidden = !0);
          const {
            classList: u
          } = this.div;
          for (const p of s.#p.values())
            u.remove(`${p._type}Editing`);
          this.disableTextSelection(), this.toggleAnnotationLayerPointerEvents(!0), this.#u = !1;
        }
        getEditableAnnotation(t) {
          return this.#s?.getEditableAnnotation(t) || null;
        }
        setActiveEditor(t) {
          this.#o.getActive() !== t && this.#o.setActiveEditor(t);
        }
        enableTextSelection() {
          this.div.tabIndex = -1, this.#c?.div && !this.#i && (this.#i = this.#g.bind(this), this.#c.div.addEventListener("pointerdown", this.#i), this.#c.div.classList.add("highlighting"));
        }
        disableTextSelection() {
          this.div.tabIndex = 0, this.#c?.div && this.#i && (this.#c.div.removeEventListener("pointerdown", this.#i), this.#i = null, this.#c.div.classList.remove("highlighting"));
        }
        #g(t) {
          if (this.#o.unselectAll(), t.target === this.#c.div) {
            const {
              isMac: i
            } = v.FeatureTest.platform;
            if (t.button !== 0 || t.ctrlKey && i)
              return;
            this.#o.showAllEditors("highlight", !0, !0), this.#c.div.classList.add("free"), c.startHighlighting(this, this.#o.direction === "ltr", t), this.#c.div.addEventListener("pointerup", () => {
              this.#c.div.classList.remove("free");
            }, {
              once: !0
            }), t.preventDefault();
          }
        }
        enableClick() {
          this.#r || (this.#r = this.pointerdown.bind(this), this.#n = this.pointerup.bind(this), this.div.addEventListener("pointerdown", this.#r), this.div.addEventListener("pointerup", this.#n));
        }
        disableClick() {
          this.#r && (this.div.removeEventListener("pointerdown", this.#r), this.div.removeEventListener("pointerup", this.#n), this.#r = null, this.#n = null);
        }
        attach(t) {
          this.#l.set(t.id, t);
          const {
            annotationElementId: i
          } = t;
          i && this.#o.isDeletedAnnotationElement(i) && this.#o.removeDeletedAnnotationElement(t);
        }
        detach(t) {
          this.#l.delete(t.id), this.#t?.removePointerInTextLayer(t.contentDiv), !this.#u && t.annotationElementId && this.#o.addDeletedAnnotationElement(t);
        }
        remove(t) {
          this.detach(t), this.#o.removeEditor(t), t.div.remove(), t.isAttachedToDOM = !1, this.#d || this.addInkEditorIfNeeded(!1);
        }
        changeParent(t) {
          t.parent !== this && (t.parent && t.annotationElementId && (this.#o.addDeletedAnnotationElement(t.annotationElementId), H.AnnotationEditor.deleteAnnotationElement(t), t.annotationElementId = null), this.attach(t), t.parent?.detach(t), t.setParent(this), t.div && t.isAttachedToDOM && (t.div.remove(), this.div.append(t.div)));
        }
        add(t) {
          if (!(t.parent === this && t.isAttachedToDOM)) {
            if (this.changeParent(t), this.#o.addEditor(t), this.attach(t), !t.isAttachedToDOM) {
              const i = t.render();
              this.div.append(i), t.isAttachedToDOM = !0;
            }
            t.fixAndSetPosition(), t.onceAdded(), this.#o.addToAnnotationStorage(t), t._reportTelemetry(t.telemetryInitialData);
          }
        }
        moveEditorInDOM(t) {
          if (!t.isAttachedToDOM)
            return;
          const {
            activeElement: i
          } = document;
          t.div.contains(i) && !this.#a && (t._focusEventsAllowed = !1, this.#a = setTimeout(() => {
            this.#a = null, t.div.contains(document.activeElement) ? t._focusEventsAllowed = !0 : (t.div.addEventListener("focusin", () => {
              t._focusEventsAllowed = !0;
            }, {
              once: !0
            }), i.focus());
          }, 0)), t._structTreeParentId = this.#t?.moveElementInDOM(this.div, t.div, t.contentDiv, !0);
        }
        addOrRebuild(t) {
          t.needsToBeRebuilt() ? (t.parent ||= this, t.rebuild(), t.show()) : this.add(t);
        }
        addUndoableEditor(t) {
          const i = () => t._uiManager.rebuild(t), u = () => {
            t.remove();
          };
          this.addCommands({
            cmd: i,
            undo: u,
            mustExec: !1
          });
        }
        getNextId() {
          return this.#o.getId();
        }
        get #f() {
          return s.#p.get(this.#o.getMode());
        }
        #v(t) {
          const i = this.#f;
          return i ? new i.prototype.constructor(t) : null;
        }
        canCreateNewEmptyEditor() {
          return this.#f?.canCreateNewEmptyEditor();
        }
        pasteEditor(t, i) {
          this.#o.updateToolbar(t), this.#o.updateMode(t);
          const {
            offsetX: u,
            offsetY: p
          } = this.#m(), w = this.getNextId(), S = this.#v({
            parent: this,
            id: w,
            x: u,
            y: p,
            uiManager: this.#o,
            isCentered: !0,
            ...i
          });
          S && this.add(S);
        }
        deserialize(t) {
          return s.#p.get(t.annotationType ?? t.annotationEditorType)?.deserialize(t, this, this.#o) || null;
        }
        createAndAddNewEditor(t, i, u = {}) {
          const p = this.getNextId(), w = this.#v({
            parent: this,
            id: p,
            x: t.offsetX,
            y: t.offsetY,
            uiManager: this.#o,
            isCentered: i,
            ...u
          });
          return w && this.add(w), w;
        }
        #m() {
          const {
            x: t,
            y: i,
            width: u,
            height: p
          } = this.div.getBoundingClientRect(), w = Math.max(0, t), S = Math.max(0, i), M = Math.min(window.innerWidth, t + u), _ = Math.min(window.innerHeight, i + p), O = (w + M) / 2 - t, B = (S + _) / 2 - i, [U, K] = this.viewport.rotation % 180 === 0 ? [O, B] : [B, O];
          return {
            offsetX: U,
            offsetY: K
          };
        }
        addNewEditor() {
          this.createAndAddNewEditor(this.#m(), !0);
        }
        setSelected(t) {
          this.#o.setSelected(t);
        }
        toggleSelected(t) {
          this.#o.toggleSelected(t);
        }
        isSelected(t) {
          return this.#o.isSelected(t);
        }
        unselect(t) {
          this.#o.unselect(t);
        }
        pointerup(t) {
          const {
            isMac: i
          } = v.FeatureTest.platform;
          if (!(t.button !== 0 || t.ctrlKey && i) && t.target === this.div && this.#h) {
            if (this.#h = !1, !this.#e) {
              this.#e = !0;
              return;
            }
            if (this.#o.getMode() === v.AnnotationEditorType.STAMP) {
              this.#o.unselectAll();
              return;
            }
            this.createAndAddNewEditor(t, !1);
          }
        }
        pointerdown(t) {
          if (this.#o.getMode() === v.AnnotationEditorType.HIGHLIGHT && this.enableTextSelection(), this.#h) {
            this.#h = !1;
            return;
          }
          const {
            isMac: i
          } = v.FeatureTest.platform;
          if (t.button !== 0 || t.ctrlKey && i || t.target !== this.div)
            return;
          this.#h = !0;
          const u = this.#o.getActive();
          this.#e = !u || u.isEmpty();
        }
        findNewParent(t, i, u) {
          const p = this.#o.findParent(i, u);
          return p === null || p === this ? !1 : (p.changeParent(t), !0);
        }
        destroy() {
          this.#o.getActive()?.parent === this && (this.#o.commitOrRemove(), this.#o.setActiveEditor(null)), this.#a && (clearTimeout(this.#a), this.#a = null);
          for (const t of this.#l.values())
            this.#t?.removePointerInTextLayer(t.contentDiv), t.setParent(null), t.isAttachedToDOM = !1, t.div.remove();
          this.div = null, this.#l.clear(), this.#o.removeLayer(this);
        }
        #A() {
          this.#d = !0;
          for (const t of this.#l.values())
            t.isEmpty() && t.remove();
          this.#d = !1;
        }
        render({
          viewport: t
        }) {
          this.viewport = t, (0, r.setLayerDimensions)(this.div, t);
          for (const i of this.#o.getEditors(this.pageIndex))
            this.add(i), i.rebuild();
          this.updateMode();
        }
        update({
          viewport: t
        }) {
          this.#o.commitOrRemove(), this.#A();
          const i = this.viewport.rotation, u = t.rotation;
          if (this.viewport = t, (0, r.setLayerDimensions)(this.div, {
            rotation: u
          }), i !== u)
            for (const p of this.#l.values())
              p.rotate(u);
          this.addInkEditorIfNeeded(!1);
        }
        get pageDimensions() {
          const {
            pageWidth: t,
            pageHeight: i
          } = this.viewport.rawDims;
          return [t, i];
        }
        get scale() {
          return this.#o.viewParameters.realScale;
        }
      }
    }
  ),
  /***/
  259: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        ColorPicker: () => (
          /* binding */
          G
        )
        /* harmony export */
      });
      var v = I(292), H = I(830), L = I(419);
      class G {
        #t = this.#g.bind(this);
        #e = this.#v.bind(this);
        #s = null;
        #n = null;
        #r;
        #i = null;
        #a = !1;
        #l = !1;
        #h = null;
        #d;
        #u = null;
        #c;
        static get _keyboardManager() {
          return (0, v.shadow)(this, "_keyboardManager", new H.KeyboardManager([[["Escape", "mac+Escape"], G.prototype._hideDropdownFromKeyboard], [[" ", "mac+ "], G.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight", "mac+ArrowDown", "mac+ArrowRight"], G.prototype._moveToNext], [["ArrowUp", "ArrowLeft", "mac+ArrowUp", "mac+ArrowLeft"], G.prototype._moveToPrevious], [["Home", "mac+Home"], G.prototype._moveToBeginning], [["End", "mac+End"], G.prototype._moveToEnd]]));
        }
        constructor({
          editor: T = null,
          uiManager: E = null
        }) {
          T ? (this.#l = !1, this.#c = v.AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.#h = T) : (this.#l = !0, this.#c = v.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR), this.#u = T?._uiManager || E, this.#d = this.#u._eventBus, this.#r = T?.color || this.#u?.highlightColors.values().next().value || "#FFFF98";
        }
        renderButton() {
          const T = this.#s = document.createElement("button");
          T.className = "colorPicker", T.tabIndex = "0", T.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"), T.setAttribute("aria-haspopup", !0), T.addEventListener("click", this.#f.bind(this)), T.addEventListener("keydown", this.#t);
          const E = this.#n = document.createElement("span");
          return E.className = "swatch", E.setAttribute("aria-hidden", !0), E.style.backgroundColor = this.#r, T.append(E), T;
        }
        renderMainDropdown() {
          const T = this.#i = this.#o();
          return T.setAttribute("aria-orientation", "horizontal"), T.setAttribute("aria-labelledby", "highlightColorPickerLabel"), T;
        }
        #o() {
          const T = document.createElement("div");
          T.addEventListener("contextmenu", L.noContextMenu), T.className = "dropdown", T.role = "listbox", T.setAttribute("aria-multiselectable", !1), T.setAttribute("aria-orientation", "vertical"), T.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown");
          for (const [E, y] of this.#u.highlightColors) {
            const r = document.createElement("button");
            r.tabIndex = "0", r.role = "option", r.setAttribute("data-color", y), r.title = E, r.setAttribute("data-l10n-id", `pdfjs-editor-colorpicker-${E}`);
            const c = document.createElement("span");
            r.append(c), c.className = "swatch", c.style.backgroundColor = y, r.setAttribute("aria-selected", y === this.#r), r.addEventListener("click", this.#p.bind(this, y)), T.append(r);
          }
          return T.addEventListener("keydown", this.#t), T;
        }
        #p(T, E) {
          E.stopPropagation(), this.#d.dispatch("switchannotationeditorparams", {
            source: this,
            type: this.#c,
            value: T
          });
        }
        _colorSelectFromKeyboard(T) {
          if (T.target === this.#s) {
            this.#f(T);
            return;
          }
          const E = T.target.getAttribute("data-color");
          E && this.#p(E, T);
        }
        _moveToNext(T) {
          if (!this.#m) {
            this.#f(T);
            return;
          }
          if (T.target === this.#s) {
            this.#i.firstChild?.focus();
            return;
          }
          T.target.nextSibling?.focus();
        }
        _moveToPrevious(T) {
          if (T.target === this.#i?.firstChild || T.target === this.#s) {
            this.#m && this._hideDropdownFromKeyboard();
            return;
          }
          this.#m || this.#f(T), T.target.previousSibling?.focus();
        }
        _moveToBeginning(T) {
          if (!this.#m) {
            this.#f(T);
            return;
          }
          this.#i.firstChild?.focus();
        }
        _moveToEnd(T) {
          if (!this.#m) {
            this.#f(T);
            return;
          }
          this.#i.lastChild?.focus();
        }
        #g(T) {
          G._keyboardManager.exec(this, T);
        }
        #f(T) {
          if (this.#m) {
            this.hideDropdown();
            return;
          }
          if (this.#a = T.detail === 0, window.addEventListener("pointerdown", this.#e), this.#i) {
            this.#i.classList.remove("hidden");
            return;
          }
          const E = this.#i = this.#o();
          this.#s.append(E);
        }
        #v(T) {
          this.#i?.contains(T.target) || this.hideDropdown();
        }
        hideDropdown() {
          this.#i?.classList.add("hidden"), window.removeEventListener("pointerdown", this.#e);
        }
        get #m() {
          return this.#i && !this.#i.classList.contains("hidden");
        }
        _hideDropdownFromKeyboard() {
          if (!this.#l) {
            if (!this.#m) {
              this.#h?.unselect();
              return;
            }
            this.hideDropdown(), this.#s.focus({
              preventScroll: !0,
              focusVisible: this.#a
            });
          }
        }
        updateColor(T) {
          if (this.#n && (this.#n.style.backgroundColor = T), !this.#i)
            return;
          const E = this.#u.highlightColors.values();
          for (const y of this.#i.children)
            y.setAttribute("aria-selected", E.next().value === T);
        }
        destroy() {
          this.#s?.remove(), this.#s = null, this.#n = null, this.#i?.remove(), this.#i = null;
        }
      }
    }
  ),
  /***/
  310: (
    /***/
    (Y, $, I) => {
      I.d($, {
        AnnotationEditor: () => (
          /* binding */
          T
        )
      });
      var v = I(830), H = I(292), L = I(419);
      class G {
        #t = "";
        #e = !1;
        #s = null;
        #n = null;
        #r = null;
        #i = !1;
        #a = null;
        static _l10nPromise = null;
        constructor(r) {
          this.#a = r;
        }
        static initialize(r) {
          G._l10nPromise ||= r;
        }
        async render() {
          const r = this.#s = document.createElement("button");
          r.className = "altText";
          const c = await G._l10nPromise.get("pdfjs-editor-alt-text-button-label");
          r.textContent = c, r.setAttribute("aria-label", c), r.tabIndex = "0", r.addEventListener("contextmenu", L.noContextMenu), r.addEventListener("pointerdown", (b) => b.stopPropagation());
          const l = (b) => {
            b.preventDefault(), this.#a._uiManager.editAltText(this.#a);
          };
          return r.addEventListener("click", l, {
            capture: !0
          }), r.addEventListener("keydown", (b) => {
            b.target === r && b.key === "Enter" && (this.#i = !0, l(b));
          }), await this.#l(), r;
        }
        finish() {
          this.#s && (this.#s.focus({
            focusVisible: this.#i
          }), this.#i = !1);
        }
        isEmpty() {
          return !this.#t && !this.#e;
        }
        get data() {
          return {
            altText: this.#t,
            decorative: this.#e
          };
        }
        set data({
          altText: r,
          decorative: c
        }) {
          this.#t === r && this.#e === c || (this.#t = r, this.#e = c, this.#l());
        }
        toggle(r = !1) {
          this.#s && (!r && this.#r && (clearTimeout(this.#r), this.#r = null), this.#s.disabled = !r);
        }
        destroy() {
          this.#s?.remove(), this.#s = null, this.#n = null;
        }
        async #l() {
          const r = this.#s;
          if (!r)
            return;
          if (!this.#t && !this.#e) {
            r.classList.remove("done"), this.#n?.remove();
            return;
          }
          r.classList.add("done"), G._l10nPromise.get("pdfjs-editor-alt-text-edit-button-label").then((b) => {
            r.setAttribute("aria-label", b);
          });
          let c = this.#n;
          if (!c) {
            this.#n = c = document.createElement("span"), c.className = "tooltip", c.setAttribute("role", "tooltip");
            const b = c.id = `alt-text-tooltip-${this.#a.id}`;
            r.setAttribute("aria-describedby", b);
            const s = 100;
            r.addEventListener("mouseenter", () => {
              this.#r = setTimeout(() => {
                this.#r = null, this.#n.classList.add("show"), this.#a._reportTelemetry({
                  action: "alt_text_tooltip"
                });
              }, s);
            }), r.addEventListener("mouseleave", () => {
              this.#r && (clearTimeout(this.#r), this.#r = null), this.#n?.classList.remove("show");
            });
          }
          c.innerText = this.#e ? await G._l10nPromise.get("pdfjs-editor-alt-text-decorative-tooltip") : this.#t, c.parentNode || r.append(c), this.#a.getImageForAltText()?.setAttribute("aria-describedby", c.id);
        }
      }
      var P = I(362);
      class T {
        #t = null;
        #e = null;
        #s = !1;
        #n = !1;
        #r = null;
        #i = null;
        #a = this.focusin.bind(this);
        #l = this.focusout.bind(this);
        #h = null;
        #d = "";
        #u = !1;
        #c = null;
        #o = !1;
        #p = !1;
        #g = !1;
        #f = null;
        #v = 0;
        #m = 0;
        #A = null;
        _initialOptions = /* @__PURE__ */ Object.create(null);
        _isVisible = !0;
        _uiManager = null;
        _focusEventsAllowed = !0;
        _l10nPromise = null;
        #w = !1;
        #C = T._zIndex++;
        static _borderLineWidth = -1;
        static _colorManager = new v.ColorManager();
        static _zIndex = 1;
        static _telemetryTimeout = 1e3;
        static get _resizerKeyboardManager() {
          const r = T.prototype._resizeWithKeyboard, c = v.AnnotationEditorUIManager.TRANSLATE_SMALL, l = v.AnnotationEditorUIManager.TRANSLATE_BIG;
          return (0, H.shadow)(this, "_resizerKeyboardManager", new v.KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], r, {
            args: [-c, 0]
          }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], r, {
            args: [-l, 0]
          }], [["ArrowRight", "mac+ArrowRight"], r, {
            args: [c, 0]
          }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], r, {
            args: [l, 0]
          }], [["ArrowUp", "mac+ArrowUp"], r, {
            args: [0, -c]
          }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], r, {
            args: [0, -l]
          }], [["ArrowDown", "mac+ArrowDown"], r, {
            args: [0, c]
          }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], r, {
            args: [0, l]
          }], [["Escape", "mac+Escape"], T.prototype._stopResizingWithKeyboard]]));
        }
        constructor(r) {
          this.constructor === T && (0, H.unreachable)("Cannot initialize AnnotationEditor."), this.parent = r.parent, this.id = r.id, this.width = this.height = null, this.pageIndex = r.parent.pageIndex, this.name = r.name, this.div = null, this._uiManager = r.uiManager, this.annotationElementId = null, this._willKeepAspectRatio = !1, this._initialOptions.isCentered = r.isCentered, this._structTreeParentId = null;
          const {
            rotation: c,
            rawDims: {
              pageWidth: l,
              pageHeight: b,
              pageX: s,
              pageY: g
            }
          } = this.parent.viewport;
          this.rotation = c, this.pageRotation = (360 + c - this._uiManager.viewParameters.rotation) % 360, this.pageDimensions = [l, b], this.pageTranslation = [s, g];
          const [t, i] = this.parentDimensions;
          this.x = r.x / t, this.y = r.y / i, this.isAttachedToDOM = !1, this.deleted = !1;
        }
        get editorType() {
          return Object.getPrototypeOf(this).constructor._type;
        }
        static get _defaultLineColor() {
          return (0, H.shadow)(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
        }
        static deleteAnnotationElement(r) {
          const c = new E({
            id: r.parent.getNextId(),
            parent: r.parent,
            uiManager: r._uiManager
          });
          c.annotationElementId = r.annotationElementId, c.deleted = !0, c._uiManager.addToAnnotationStorage(c);
        }
        static initialize(r, c, l) {
          if (T._l10nPromise ||= new Map(["pdfjs-editor-alt-text-button-label", "pdfjs-editor-alt-text-edit-button-label", "pdfjs-editor-alt-text-decorative-tooltip", "pdfjs-editor-resizer-label-topLeft", "pdfjs-editor-resizer-label-topMiddle", "pdfjs-editor-resizer-label-topRight", "pdfjs-editor-resizer-label-middleRight", "pdfjs-editor-resizer-label-bottomRight", "pdfjs-editor-resizer-label-bottomMiddle", "pdfjs-editor-resizer-label-bottomLeft", "pdfjs-editor-resizer-label-middleLeft"].map((s) => [s, r.get(s.replaceAll(/([A-Z])/g, (g) => `-${g.toLowerCase()}`))])), l?.strings)
            for (const s of l.strings)
              T._l10nPromise.set(s, r.get(s));
          if (T._borderLineWidth !== -1)
            return;
          const b = getComputedStyle(document.documentElement);
          T._borderLineWidth = parseFloat(b.getPropertyValue("--outline-width")) || 0;
        }
        static updateDefaultParams(r, c) {
        }
        static get defaultPropertiesToUpdate() {
          return [];
        }
        static isHandlingMimeForPasting(r) {
          return !1;
        }
        static paste(r, c) {
          (0, H.unreachable)("Not implemented");
        }
        get propertiesToUpdate() {
          return [];
        }
        get _isDraggable() {
          return this.#w;
        }
        set _isDraggable(r) {
          this.#w = r, this.div?.classList.toggle("draggable", r);
        }
        get isEnterHandled() {
          return !0;
        }
        center() {
          const [r, c] = this.pageDimensions;
          switch (this.parentRotation) {
            case 90:
              this.x -= this.height * c / (r * 2), this.y += this.width * r / (c * 2);
              break;
            case 180:
              this.x += this.width / 2, this.y += this.height / 2;
              break;
            case 270:
              this.x += this.height * c / (r * 2), this.y -= this.width * r / (c * 2);
              break;
            default:
              this.x -= this.width / 2, this.y -= this.height / 2;
              break;
          }
          this.fixAndSetPosition();
        }
        addCommands(r) {
          this._uiManager.addCommands(r);
        }
        get currentLayer() {
          return this._uiManager.currentLayer;
        }
        setInBackground() {
          this.div.style.zIndex = 0;
        }
        setInForeground() {
          this.div.style.zIndex = this.#C;
        }
        setParent(r) {
          r !== null ? (this.pageIndex = r.pageIndex, this.pageDimensions = r.pageDimensions) : this.#N(), this.parent = r;
        }
        focusin(r) {
          this._focusEventsAllowed && (this.#u ? this.#u = !1 : this.parent.setSelected(this));
        }
        focusout(r) {
          !this._focusEventsAllowed || !this.isAttachedToDOM || r.relatedTarget?.closest(`#${this.id}`) || (r.preventDefault(), this.parent?.isMultipleSelection || this.commitOrRemove());
        }
        commitOrRemove() {
          this.isEmpty() ? this.remove() : this.commit();
        }
        commit() {
          this.addToAnnotationStorage();
        }
        addToAnnotationStorage() {
          this._uiManager.addToAnnotationStorage(this);
        }
        setAt(r, c, l, b) {
          const [s, g] = this.parentDimensions;
          [l, b] = this.screenToPageTranslation(l, b), this.x = (r + l) / s, this.y = (c + b) / g, this.fixAndSetPosition();
        }
        #R([r, c], l, b) {
          [l, b] = this.screenToPageTranslation(l, b), this.x += l / r, this.y += b / c, this.fixAndSetPosition();
        }
        translate(r, c) {
          this.#R(this.parentDimensions, r, c);
        }
        translateInPage(r, c) {
          this.#c ||= [this.x, this.y], this.#R(this.pageDimensions, r, c), this.div.scrollIntoView({
            block: "nearest"
          });
        }
        drag(r, c) {
          this.#c ||= [this.x, this.y];
          const [l, b] = this.parentDimensions;
          if (this.x += r / l, this.y += c / b, this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1)) {
            const {
              x: u,
              y: p
            } = this.div.getBoundingClientRect();
            this.parent.findNewParent(this, u, p) && (this.x -= Math.floor(this.x), this.y -= Math.floor(this.y));
          }
          let {
            x: s,
            y: g
          } = this;
          const [t, i] = this.getBaseTranslation();
          s += t, g += i, this.div.style.left = `${(100 * s).toFixed(2)}%`, this.div.style.top = `${(100 * g).toFixed(2)}%`, this.div.scrollIntoView({
            block: "nearest"
          });
        }
        get _hasBeenMoved() {
          return !!this.#c && (this.#c[0] !== this.x || this.#c[1] !== this.y);
        }
        getBaseTranslation() {
          const [r, c] = this.parentDimensions, {
            _borderLineWidth: l
          } = T, b = l / r, s = l / c;
          switch (this.rotation) {
            case 90:
              return [-b, s];
            case 180:
              return [b, s];
            case 270:
              return [b, -s];
            default:
              return [-b, -s];
          }
        }
        get _mustFixPosition() {
          return !0;
        }
        fixAndSetPosition(r = this.rotation) {
          const [c, l] = this.pageDimensions;
          let {
            x: b,
            y: s,
            width: g,
            height: t
          } = this;
          if (g *= c, t *= l, b *= c, s *= l, this._mustFixPosition)
            switch (r) {
              case 0:
                b = Math.max(0, Math.min(c - g, b)), s = Math.max(0, Math.min(l - t, s));
                break;
              case 90:
                b = Math.max(0, Math.min(c - t, b)), s = Math.min(l, Math.max(g, s));
                break;
              case 180:
                b = Math.min(c, Math.max(g, b)), s = Math.min(l, Math.max(t, s));
                break;
              case 270:
                b = Math.min(c, Math.max(t, b)), s = Math.max(0, Math.min(l - g, s));
                break;
            }
          this.x = b /= c, this.y = s /= l;
          const [i, u] = this.getBaseTranslation();
          b += i, s += u;
          const {
            style: p
          } = this.div;
          p.left = `${(100 * b).toFixed(2)}%`, p.top = `${(100 * s).toFixed(2)}%`, this.moveInDOM();
        }
        static #I(r, c, l) {
          switch (l) {
            case 90:
              return [c, -r];
            case 180:
              return [-r, -c];
            case 270:
              return [-c, r];
            default:
              return [r, c];
          }
        }
        screenToPageTranslation(r, c) {
          return T.#I(r, c, this.parentRotation);
        }
        pageTranslationToScreen(r, c) {
          return T.#I(r, c, 360 - this.parentRotation);
        }
        #L(r) {
          switch (r) {
            case 90: {
              const [c, l] = this.pageDimensions;
              return [0, -c / l, l / c, 0];
            }
            case 180:
              return [-1, 0, 0, -1];
            case 270: {
              const [c, l] = this.pageDimensions;
              return [0, c / l, -l / c, 0];
            }
            default:
              return [1, 0, 0, 1];
          }
        }
        get parentScale() {
          return this._uiManager.viewParameters.realScale;
        }
        get parentRotation() {
          return (this._uiManager.viewParameters.rotation + this.pageRotation) % 360;
        }
        get parentDimensions() {
          const {
            parentScale: r,
            pageDimensions: [c, l]
          } = this, b = c * r, s = l * r;
          return H.FeatureTest.isCSSRoundSupported ? [Math.round(b), Math.round(s)] : [b, s];
        }
        setDims(r, c) {
          const [l, b] = this.parentDimensions;
          this.div.style.width = `${(100 * r / l).toFixed(2)}%`, this.#n || (this.div.style.height = `${(100 * c / b).toFixed(2)}%`);
        }
        fixDims() {
          const {
            style: r
          } = this.div, {
            height: c,
            width: l
          } = r, b = l.endsWith("%"), s = !this.#n && c.endsWith("%");
          if (b && s)
            return;
          const [g, t] = this.parentDimensions;
          b || (r.width = `${(100 * parseFloat(l) / g).toFixed(2)}%`), !this.#n && !s && (r.height = `${(100 * parseFloat(c) / t).toFixed(2)}%`);
        }
        getInitialTranslation() {
          return [0, 0];
        }
        #y() {
          if (this.#r)
            return;
          this.#r = document.createElement("div"), this.#r.classList.add("resizers");
          const r = this._willKeepAspectRatio ? ["topLeft", "topRight", "bottomRight", "bottomLeft"] : ["topLeft", "topMiddle", "topRight", "middleRight", "bottomRight", "bottomMiddle", "bottomLeft", "middleLeft"];
          for (const c of r) {
            const l = document.createElement("div");
            this.#r.append(l), l.classList.add("resizer", c), l.setAttribute("data-resizer-name", c), l.addEventListener("pointerdown", this.#b.bind(this, c)), l.addEventListener("contextmenu", L.noContextMenu), l.tabIndex = -1;
          }
          this.div.prepend(this.#r);
        }
        #b(r, c) {
          c.preventDefault();
          const {
            isMac: l
          } = H.FeatureTest.platform;
          if (c.button !== 0 || c.ctrlKey && l)
            return;
          this.#e?.toggle(!1);
          const b = this.#x.bind(this, r), s = this._isDraggable;
          this._isDraggable = !1;
          const g = {
            passive: !0,
            capture: !0
          };
          this.parent.togglePointerEvents(!1), window.addEventListener("pointermove", b, g), window.addEventListener("contextmenu", L.noContextMenu);
          const t = this.x, i = this.y, u = this.width, p = this.height, w = this.parent.div.style.cursor, S = this.div.style.cursor;
          this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(c.target).cursor;
          const M = () => {
            this.parent.togglePointerEvents(!0), this.#e?.toggle(!0), this._isDraggable = s, window.removeEventListener("pointerup", M), window.removeEventListener("blur", M), window.removeEventListener("pointermove", b, g), window.removeEventListener("contextmenu", L.noContextMenu), this.parent.div.style.cursor = w, this.div.style.cursor = S, this.#S(t, i, u, p);
          };
          window.addEventListener("pointerup", M), window.addEventListener("blur", M);
        }
        #S(r, c, l, b) {
          const s = this.x, g = this.y, t = this.width, i = this.height;
          s === r && g === c && t === l && i === b || this.addCommands({
            cmd: () => {
              this.width = t, this.height = i, this.x = s, this.y = g;
              const [u, p] = this.parentDimensions;
              this.setDims(u * t, p * i), this.fixAndSetPosition();
            },
            undo: () => {
              this.width = l, this.height = b, this.x = r, this.y = c;
              const [u, p] = this.parentDimensions;
              this.setDims(u * l, p * b), this.fixAndSetPosition();
            },
            mustExec: !0
          });
        }
        #x(r, c) {
          const [l, b] = this.parentDimensions, s = this.x, g = this.y, t = this.width, i = this.height, u = T.MIN_SIZE / l, p = T.MIN_SIZE / b, w = (m) => Math.round(m * 1e4) / 1e4, S = this.#L(this.rotation), M = (m, h) => [S[0] * m + S[2] * h, S[1] * m + S[3] * h], _ = this.#L(360 - this.rotation), O = (m, h) => [_[0] * m + _[2] * h, _[1] * m + _[3] * h];
          let B, U, K = !1, rt = !1;
          switch (r) {
            case "topLeft":
              K = !0, B = (m, h) => [0, 0], U = (m, h) => [m, h];
              break;
            case "topMiddle":
              B = (m, h) => [m / 2, 0], U = (m, h) => [m / 2, h];
              break;
            case "topRight":
              K = !0, B = (m, h) => [m, 0], U = (m, h) => [0, h];
              break;
            case "middleRight":
              rt = !0, B = (m, h) => [m, h / 2], U = (m, h) => [0, h / 2];
              break;
            case "bottomRight":
              K = !0, B = (m, h) => [m, h], U = (m, h) => [0, 0];
              break;
            case "bottomMiddle":
              B = (m, h) => [m / 2, h], U = (m, h) => [m / 2, 0];
              break;
            case "bottomLeft":
              K = !0, B = (m, h) => [0, h], U = (m, h) => [m, 0];
              break;
            case "middleLeft":
              rt = !0, B = (m, h) => [0, h / 2], U = (m, h) => [m, h / 2];
              break;
          }
          const W = B(t, i), z = U(t, i);
          let V = M(...z);
          const q = w(s + V[0]), st = w(g + V[1]);
          let et = 1, ot = 1, [dt, mt] = this.screenToPageTranslation(c.movementX, c.movementY);
          if ([dt, mt] = O(dt / l, mt / b), K) {
            const m = Math.hypot(t, i);
            et = ot = Math.max(Math.min(Math.hypot(z[0] - W[0] - dt, z[1] - W[1] - mt) / m, 1 / t, 1 / i), u / t, p / i);
          } else rt ? et = Math.max(u, Math.min(1, Math.abs(z[0] - W[0] - dt))) / t : ot = Math.max(p, Math.min(1, Math.abs(z[1] - W[1] - mt))) / i;
          const ut = w(t * et), ht = w(i * ot);
          V = M(...U(ut, ht));
          const ft = q - V[0], it = st - V[1];
          this.width = ut, this.height = ht, this.x = ft, this.y = it, this.setDims(l * ut, b * ht), this.fixAndSetPosition();
        }
        altTextFinish() {
          this.#e?.finish();
        }
        async addEditToolbar() {
          return this.#h || this.#p ? this.#h : (this.#h = new P.EditorToolbar(this), this.div.append(this.#h.render()), this.#e && this.#h.addAltTextButton(await this.#e.render()), this.#h);
        }
        removeEditToolbar() {
          this.#h && (this.#h.remove(), this.#h = null, this.#e?.destroy());
        }
        getClientDimensions() {
          return this.div.getBoundingClientRect();
        }
        async addAltTextButton() {
          this.#e || (G.initialize(T._l10nPromise), this.#e = new G(this), await this.addEditToolbar());
        }
        get altTextData() {
          return this.#e?.data;
        }
        set altTextData(r) {
          this.#e && (this.#e.data = r);
        }
        hasAltText() {
          return !this.#e?.isEmpty();
        }
        render() {
          this.div = document.createElement("div"), this.div.setAttribute("data-editor-rotation", (360 - this.rotation) % 360), this.div.className = this.name, this.div.setAttribute("id", this.id), this.div.tabIndex = this.#s ? -1 : 0, this._isVisible || this.div.classList.add("hidden"), this.setInForeground(), this.div.addEventListener("focusin", this.#a), this.div.addEventListener("focusout", this.#l);
          const [r, c] = this.parentDimensions;
          this.parentRotation % 180 !== 0 && (this.div.style.maxWidth = `${(100 * c / r).toFixed(2)}%`, this.div.style.maxHeight = `${(100 * r / c).toFixed(2)}%`);
          const [l, b] = this.getInitialTranslation();
          return this.translate(l, b), (0, v.bindEvents)(this, this.div, ["pointerdown"]), this.div;
        }
        pointerdown(r) {
          const {
            isMac: c
          } = H.FeatureTest.platform;
          if (r.button !== 0 || r.ctrlKey && c) {
            r.preventDefault();
            return;
          }
          if (this.#u = !0, this._isDraggable) {
            this.#T(r);
            return;
          }
          this.#k(r);
        }
        #k(r) {
          const {
            isMac: c
          } = H.FeatureTest.platform;
          r.ctrlKey && !c || r.shiftKey || r.metaKey && c ? this.parent.toggleSelected(this) : this.parent.setSelected(this);
        }
        #T(r) {
          const c = this._uiManager.isSelected(this);
          this._uiManager.setUpDragSession();
          let l, b;
          c && (this.div.classList.add("moving"), l = {
            passive: !0,
            capture: !0
          }, this.#v = r.clientX, this.#m = r.clientY, b = (g) => {
            const {
              clientX: t,
              clientY: i
            } = g, [u, p] = this.screenToPageTranslation(t - this.#v, i - this.#m);
            this.#v = t, this.#m = i, this._uiManager.dragSelectedEditors(u, p);
          }, window.addEventListener("pointermove", b, l));
          const s = () => {
            window.removeEventListener("pointerup", s), window.removeEventListener("blur", s), c && (this.div.classList.remove("moving"), window.removeEventListener("pointermove", b, l)), this.#u = !1, this._uiManager.endDragSession() || this.#k(r);
          };
          window.addEventListener("pointerup", s), window.addEventListener("blur", s);
        }
        moveInDOM() {
          this.#f && clearTimeout(this.#f), this.#f = setTimeout(() => {
            this.#f = null, this.parent?.moveEditorInDOM(this);
          }, 0);
        }
        _setParentAndPosition(r, c, l) {
          r.changeParent(this), this.x = c, this.y = l, this.fixAndSetPosition();
        }
        getRect(r, c, l = this.rotation) {
          const b = this.parentScale, [s, g] = this.pageDimensions, [t, i] = this.pageTranslation, u = r / b, p = c / b, w = this.x * s, S = this.y * g, M = this.width * s, _ = this.height * g;
          switch (l) {
            case 0:
              return [w + u + t, g - S - p - _ + i, w + u + M + t, g - S - p + i];
            case 90:
              return [w + p + t, g - S + u + i, w + p + _ + t, g - S + u + M + i];
            case 180:
              return [w - u - M + t, g - S + p + i, w - u + t, g - S + p + _ + i];
            case 270:
              return [w - p - _ + t, g - S - u - M + i, w - p + t, g - S - u + i];
            default:
              throw new Error("Invalid rotation");
          }
        }
        getRectInCurrentCoords(r, c) {
          const [l, b, s, g] = r, t = s - l, i = g - b;
          switch (this.rotation) {
            case 0:
              return [l, c - g, t, i];
            case 90:
              return [l, c - b, i, t];
            case 180:
              return [s, c - b, t, i];
            case 270:
              return [s, c - g, i, t];
            default:
              throw new Error("Invalid rotation");
          }
        }
        onceAdded() {
        }
        isEmpty() {
          return !1;
        }
        enableEditMode() {
          this.#p = !0;
        }
        disableEditMode() {
          this.#p = !1;
        }
        isInEditMode() {
          return this.#p;
        }
        shouldGetKeyboardEvents() {
          return this.#g;
        }
        needsToBeRebuilt() {
          return this.div && !this.isAttachedToDOM;
        }
        rebuild() {
          this.div?.addEventListener("focusin", this.#a), this.div?.addEventListener("focusout", this.#l);
        }
        rotate(r) {
        }
        serialize(r = !1, c = null) {
          (0, H.unreachable)("An editor must be serializable");
        }
        static deserialize(r, c, l) {
          const b = new this.prototype.constructor({
            parent: c,
            id: c.getNextId(),
            uiManager: l
          });
          b.rotation = r.rotation;
          const [s, g] = b.pageDimensions, [t, i, u, p] = b.getRectInCurrentCoords(r.rect, g);
          return b.x = t / s, b.y = i / g, b.width = u / s, b.height = p / g, b;
        }
        get hasBeenModified() {
          return !!this.annotationElementId && (this.deleted || this.serialize() !== null);
        }
        remove() {
          if (this.div.removeEventListener("focusin", this.#a), this.div.removeEventListener("focusout", this.#l), this.isEmpty() || this.commit(), this.parent ? this.parent.remove(this) : this._uiManager.removeEditor(this), this.#f && (clearTimeout(this.#f), this.#f = null), this.#N(), this.removeEditToolbar(), this.#A) {
            for (const r of this.#A.values())
              clearTimeout(r);
            this.#A = null;
          }
          this.parent = null;
        }
        get isResizable() {
          return !1;
        }
        makeResizable() {
          this.isResizable && (this.#y(), this.#r.classList.remove("hidden"), (0, v.bindEvents)(this, this.div, ["keydown"]));
        }
        get toolbarPosition() {
          return null;
        }
        keydown(r) {
          if (!this.isResizable || r.target !== this.div || r.key !== "Enter")
            return;
          this._uiManager.setSelected(this), this.#i = {
            savedX: this.x,
            savedY: this.y,
            savedWidth: this.width,
            savedHeight: this.height
          };
          const c = this.#r.children;
          if (!this.#t) {
            this.#t = Array.from(c);
            const g = this.#M.bind(this), t = this.#F.bind(this);
            for (const i of this.#t) {
              const u = i.getAttribute("data-resizer-name");
              i.setAttribute("role", "spinbutton"), i.addEventListener("keydown", g), i.addEventListener("blur", t), i.addEventListener("focus", this.#_.bind(this, u)), T._l10nPromise.get(`pdfjs-editor-resizer-label-${u}`).then((p) => i.setAttribute("aria-label", p));
            }
          }
          const l = this.#t[0];
          let b = 0;
          for (const g of c) {
            if (g === l)
              break;
            b++;
          }
          const s = (360 - this.rotation + this.parentRotation) % 360 / 90 * (this.#t.length / 4);
          if (s !== b) {
            if (s < b)
              for (let t = 0; t < b - s; t++)
                this.#r.append(this.#r.firstChild);
            else if (s > b)
              for (let t = 0; t < s - b; t++)
                this.#r.firstChild.before(this.#r.lastChild);
            let g = 0;
            for (const t of c) {
              const u = this.#t[g++].getAttribute("data-resizer-name");
              T._l10nPromise.get(`pdfjs-editor-resizer-label-${u}`).then((p) => t.setAttribute("aria-label", p));
            }
          }
          this.#P(0), this.#g = !0, this.#r.firstChild.focus({
            focusVisible: !0
          }), r.preventDefault(), r.stopImmediatePropagation();
        }
        #M(r) {
          T._resizerKeyboardManager.exec(this, r);
        }
        #F(r) {
          this.#g && r.relatedTarget?.parentNode !== this.#r && this.#N();
        }
        #_(r) {
          this.#d = this.#g ? r : "";
        }
        #P(r) {
          if (this.#t)
            for (const c of this.#t)
              c.tabIndex = r;
        }
        _resizeWithKeyboard(r, c) {
          this.#g && this.#x(this.#d, {
            movementX: r,
            movementY: c
          });
        }
        #N() {
          if (this.#g = !1, this.#P(-1), this.#i) {
            const {
              savedX: r,
              savedY: c,
              savedWidth: l,
              savedHeight: b
            } = this.#i;
            this.#S(r, c, l, b), this.#i = null;
          }
        }
        _stopResizingWithKeyboard() {
          this.#N(), this.div.focus();
        }
        select() {
          if (this.makeResizable(), this.div?.classList.add("selectedEditor"), !this.#h) {
            this.addEditToolbar().then(() => {
              this.div?.classList.contains("selectedEditor") && this.#h?.show();
            });
            return;
          }
          this.#h?.show();
        }
        unselect() {
          this.#r?.classList.add("hidden"), this.div?.classList.remove("selectedEditor"), this.div?.contains(document.activeElement) && this._uiManager.currentLayer.div.focus({
            preventScroll: !0
          }), this.#h?.hide();
        }
        updateParams(r, c) {
        }
        disableEditing() {
        }
        enableEditing() {
        }
        enterInEditMode() {
        }
        getImageForAltText() {
          return null;
        }
        get contentDiv() {
          return this.div;
        }
        get isEditing() {
          return this.#o;
        }
        set isEditing(r) {
          this.#o = r, this.parent && (r ? (this.parent.setSelected(this), this.parent.setActiveEditor(this)) : this.parent.setActiveEditor(null));
        }
        setAspectRatio(r, c) {
          this.#n = !0;
          const l = r / c, {
            style: b
          } = this.div;
          b.aspectRatio = l, b.height = "auto";
        }
        static get MIN_SIZE() {
          return 16;
        }
        static canCreateNewEmptyEditor() {
          return !0;
        }
        get telemetryInitialData() {
          return {
            action: "added"
          };
        }
        get telemetryFinalData() {
          return null;
        }
        _reportTelemetry(r, c = !1) {
          if (c) {
            this.#A ||= /* @__PURE__ */ new Map();
            const {
              action: l
            } = r;
            let b = this.#A.get(l);
            b && clearTimeout(b), b = setTimeout(() => {
              this._reportTelemetry(r), this.#A.delete(l), this.#A.size === 0 && (this.#A = null);
            }, T._telemetryTimeout), this.#A.set(l, b);
            return;
          }
          r.type ||= this.editorType, this._uiManager._eventBus.dispatch("reporttelemetry", {
            source: this,
            details: {
              type: "editing",
              data: r
            }
          });
        }
        show(r = this._isVisible) {
          this.div.classList.toggle("hidden", !r), this._isVisible = r;
        }
        enable() {
          this.div && (this.div.tabIndex = 0), this.#s = !1;
        }
        disable() {
          this.div && (this.div.tabIndex = -1), this.#s = !0;
        }
        renderAnnotationElement(r) {
          let c = r.container.querySelector(".annotationContent");
          if (!c)
            c = document.createElement("div"), c.classList.add("annotationContent", this.editorType), r.container.prepend(c);
          else if (c.nodeName === "CANVAS") {
            const l = c;
            c = document.createElement("div"), c.classList.add("annotationContent", this.editorType), l.before(c);
          }
          return c;
        }
        resetAnnotationElement(r) {
          const {
            firstChild: c
          } = r.container;
          c.nodeName === "DIV" && c.classList.contains("annotationContent") && c.remove();
        }
      }
      class E extends T {
        constructor(r) {
          super(r), this.annotationElementId = r.annotationElementId, this.deleted = !0;
        }
        serialize() {
          return {
            id: this.annotationElementId,
            deleted: !0,
            pageIndex: this.pageIndex
          };
        }
      }
    }
  ),
  /***/
  61: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        FreeOutliner: () => (
          /* binding */
          P
        ),
        /* harmony export */
        Outliner: () => (
          /* binding */
          H
        )
        /* harmony export */
      });
      var v = I(292);
      class H {
        #t;
        #e = [];
        #s = [];
        constructor(y, r = 0, c = 0, l = !0) {
          let b = 1 / 0, s = -1 / 0, g = 1 / 0, t = -1 / 0;
          const i = 10 ** -4;
          for (const {
            x: O,
            y: B,
            width: U,
            height: K
          } of y) {
            const rt = Math.floor((O - r) / i) * i, W = Math.ceil((O + U + r) / i) * i, z = Math.floor((B - r) / i) * i, V = Math.ceil((B + K + r) / i) * i, q = [rt, z, V, !0], st = [W, z, V, !1];
            this.#e.push(q, st), b = Math.min(b, rt), s = Math.max(s, W), g = Math.min(g, z), t = Math.max(t, V);
          }
          const u = s - b + 2 * c, p = t - g + 2 * c, w = b - c, S = g - c, M = this.#e.at(l ? -1 : -2), _ = [M[0], M[2]];
          for (const O of this.#e) {
            const [B, U, K] = O;
            O[0] = (B - w) / u, O[1] = (U - S) / p, O[2] = (K - S) / p;
          }
          this.#t = {
            x: w,
            y: S,
            width: u,
            height: p,
            lastPoint: _
          };
        }
        getOutlines() {
          this.#e.sort((r, c) => r[0] - c[0] || r[1] - c[1] || r[2] - c[2]);
          const y = [];
          for (const r of this.#e)
            r[3] ? (y.push(...this.#l(r)), this.#i(r)) : (this.#a(r), y.push(...this.#l(r)));
          return this.#n(y);
        }
        #n(y) {
          const r = [], c = /* @__PURE__ */ new Set();
          for (const s of y) {
            const [g, t, i] = s;
            r.push([g, t, s], [g, i, s]);
          }
          r.sort((s, g) => s[1] - g[1] || s[0] - g[0]);
          for (let s = 0, g = r.length; s < g; s += 2) {
            const t = r[s][2], i = r[s + 1][2];
            t.push(i), i.push(t), c.add(t), c.add(i);
          }
          const l = [];
          let b;
          for (; c.size > 0; ) {
            const s = c.values().next().value;
            let [g, t, i, u, p] = s;
            c.delete(s);
            let w = g, S = t;
            for (b = [g, i], l.push(b); ; ) {
              let M;
              if (c.has(u))
                M = u;
              else if (c.has(p))
                M = p;
              else
                break;
              c.delete(M), [g, t, i, u, p] = M, w !== g && (b.push(w, S, g, S === t ? t : i), w = g), S = S === t ? i : t;
            }
            b.push(w, S);
          }
          return new G(l, this.#t);
        }
        #r(y) {
          const r = this.#s;
          let c = 0, l = r.length - 1;
          for (; c <= l; ) {
            const b = c + l >> 1, s = r[b][0];
            if (s === y)
              return b;
            s < y ? c = b + 1 : l = b - 1;
          }
          return l + 1;
        }
        #i([, y, r]) {
          const c = this.#r(y);
          this.#s.splice(c, 0, [y, r]);
        }
        #a([, y, r]) {
          const c = this.#r(y);
          for (let l = c; l < this.#s.length; l++) {
            const [b, s] = this.#s[l];
            if (b !== y)
              break;
            if (b === y && s === r) {
              this.#s.splice(l, 1);
              return;
            }
          }
          for (let l = c - 1; l >= 0; l--) {
            const [b, s] = this.#s[l];
            if (b !== y)
              break;
            if (b === y && s === r) {
              this.#s.splice(l, 1);
              return;
            }
          }
        }
        #l(y) {
          const [r, c, l] = y, b = [[r, c, l]], s = this.#r(l);
          for (let g = 0; g < s; g++) {
            const [t, i] = this.#s[g];
            for (let u = 0, p = b.length; u < p; u++) {
              const [, w, S] = b[u];
              if (!(i <= w || S <= t)) {
                if (w >= t) {
                  if (S > i)
                    b[u][1] = i;
                  else {
                    if (p === 1)
                      return [];
                    b.splice(u, 1), u--, p--;
                  }
                  continue;
                }
                b[u][2] = t, S > i && b.push([r, i, S]);
              }
            }
          }
          return b;
        }
      }
      class L {
        toSVGPath() {
          throw new Error("Abstract method `toSVGPath` must be implemented.");
        }
        get box() {
          throw new Error("Abstract getter `box` must be implemented.");
        }
        serialize(y, r) {
          throw new Error("Abstract method `serialize` must be implemented.");
        }
        get free() {
          return this instanceof T;
        }
      }
      class G extends L {
        #t;
        #e;
        constructor(y, r) {
          super(), this.#e = y, this.#t = r;
        }
        toSVGPath() {
          const y = [];
          for (const r of this.#e) {
            let [c, l] = r;
            y.push(`M${c} ${l}`);
            for (let b = 2; b < r.length; b += 2) {
              const s = r[b], g = r[b + 1];
              s === c ? (y.push(`V${g}`), l = g) : g === l && (y.push(`H${s}`), c = s);
            }
            y.push("Z");
          }
          return y.join(" ");
        }
        serialize([y, r, c, l], b) {
          const s = [], g = c - y, t = l - r;
          for (const i of this.#e) {
            const u = new Array(i.length);
            for (let p = 0; p < i.length; p += 2)
              u[p] = y + i[p] * g, u[p + 1] = l - i[p + 1] * t;
            s.push(u);
          }
          return s;
        }
        get box() {
          return this.#t;
        }
      }
      class P {
        #t;
        #e = [];
        #s;
        #n;
        #r = [];
        #i = new Float64Array(18);
        #a;
        #l;
        #h;
        #d;
        #u;
        #c;
        #o = [];
        static #p = 8;
        static #g = 2;
        static #f = P.#p + P.#g;
        constructor({
          x: y,
          y: r
        }, c, l, b, s, g = 0) {
          this.#t = c, this.#c = b * l, this.#n = s, this.#i.set([NaN, NaN, NaN, NaN, y, r], 6), this.#s = g, this.#d = P.#p * l, this.#h = P.#f * l, this.#u = l, this.#o.push(y, r);
        }
        get free() {
          return !0;
        }
        isEmpty() {
          return isNaN(this.#i[8]);
        }
        #v() {
          const y = this.#i.subarray(4, 6), r = this.#i.subarray(16, 18), [c, l, b, s] = this.#t;
          return [(this.#a + (y[0] - r[0]) / 2 - c) / b, (this.#l + (y[1] - r[1]) / 2 - l) / s, (this.#a + (r[0] - y[0]) / 2 - c) / b, (this.#l + (r[1] - y[1]) / 2 - l) / s];
        }
        add({
          x: y,
          y: r
        }) {
          this.#a = y, this.#l = r;
          const [c, l, b, s] = this.#t;
          let [g, t, i, u] = this.#i.subarray(8, 12);
          const p = y - i, w = r - u, S = Math.hypot(p, w);
          if (S < this.#h)
            return !1;
          const M = S - this.#d, _ = M / S, O = _ * p, B = _ * w;
          let U = g, K = t;
          g = i, t = u, i += O, u += B, this.#o?.push(y, r);
          const rt = -B / M, W = O / M, z = rt * this.#c, V = W * this.#c;
          return this.#i.set(this.#i.subarray(2, 8), 0), this.#i.set([i + z, u + V], 4), this.#i.set(this.#i.subarray(14, 18), 12), this.#i.set([i - z, u - V], 16), isNaN(this.#i[6]) ? (this.#r.length === 0 && (this.#i.set([g + z, t + V], 2), this.#r.push(NaN, NaN, NaN, NaN, (g + z - c) / b, (t + V - l) / s), this.#i.set([g - z, t - V], 14), this.#e.push(NaN, NaN, NaN, NaN, (g - z - c) / b, (t - V - l) / s)), this.#i.set([U, K, g, t, i, u], 6), !this.isEmpty()) : (this.#i.set([U, K, g, t, i, u], 6), Math.abs(Math.atan2(K - t, U - g) - Math.atan2(B, O)) < Math.PI / 2 ? ([g, t, i, u] = this.#i.subarray(2, 6), this.#r.push(NaN, NaN, NaN, NaN, ((g + i) / 2 - c) / b, ((t + u) / 2 - l) / s), [g, t, U, K] = this.#i.subarray(14, 18), this.#e.push(NaN, NaN, NaN, NaN, ((U + g) / 2 - c) / b, ((K + t) / 2 - l) / s), !0) : ([U, K, g, t, i, u] = this.#i.subarray(0, 6), this.#r.push(((U + 5 * g) / 6 - c) / b, ((K + 5 * t) / 6 - l) / s, ((5 * g + i) / 6 - c) / b, ((5 * t + u) / 6 - l) / s, ((g + i) / 2 - c) / b, ((t + u) / 2 - l) / s), [i, u, g, t, U, K] = this.#i.subarray(12, 18), this.#e.push(((U + 5 * g) / 6 - c) / b, ((K + 5 * t) / 6 - l) / s, ((5 * g + i) / 6 - c) / b, ((5 * t + u) / 6 - l) / s, ((g + i) / 2 - c) / b, ((t + u) / 2 - l) / s), !0));
        }
        toSVGPath() {
          if (this.isEmpty())
            return "";
          const y = this.#r, r = this.#e, c = this.#i.subarray(4, 6), l = this.#i.subarray(16, 18), [b, s, g, t] = this.#t, [i, u, p, w] = this.#v();
          if (isNaN(this.#i[6]) && !this.isEmpty())
            return `M${(this.#i[2] - b) / g} ${(this.#i[3] - s) / t} L${(this.#i[4] - b) / g} ${(this.#i[5] - s) / t} L${i} ${u} L${p} ${w} L${(this.#i[16] - b) / g} ${(this.#i[17] - s) / t} L${(this.#i[14] - b) / g} ${(this.#i[15] - s) / t} Z`;
          const S = [];
          S.push(`M${y[4]} ${y[5]}`);
          for (let M = 6; M < y.length; M += 6)
            isNaN(y[M]) ? S.push(`L${y[M + 4]} ${y[M + 5]}`) : S.push(`C${y[M]} ${y[M + 1]} ${y[M + 2]} ${y[M + 3]} ${y[M + 4]} ${y[M + 5]}`);
          S.push(`L${(c[0] - b) / g} ${(c[1] - s) / t} L${i} ${u} L${p} ${w} L${(l[0] - b) / g} ${(l[1] - s) / t}`);
          for (let M = r.length - 6; M >= 6; M -= 6)
            isNaN(r[M]) ? S.push(`L${r[M + 4]} ${r[M + 5]}`) : S.push(`C${r[M]} ${r[M + 1]} ${r[M + 2]} ${r[M + 3]} ${r[M + 4]} ${r[M + 5]}`);
          return S.push(`L${r[4]} ${r[5]} Z`), S.join(" ");
        }
        getOutlines() {
          const y = this.#r, r = this.#e, c = this.#i, l = c.subarray(4, 6), b = c.subarray(16, 18), [s, g, t, i] = this.#t, u = new Float64Array((this.#o?.length ?? 0) + 2);
          for (let B = 0, U = u.length - 2; B < U; B += 2)
            u[B] = (this.#o[B] - s) / t, u[B + 1] = (this.#o[B + 1] - g) / i;
          u[u.length - 2] = (this.#a - s) / t, u[u.length - 1] = (this.#l - g) / i;
          const [p, w, S, M] = this.#v();
          if (isNaN(c[6]) && !this.isEmpty()) {
            const B = new Float64Array(36);
            return B.set([NaN, NaN, NaN, NaN, (c[2] - s) / t, (c[3] - g) / i, NaN, NaN, NaN, NaN, (c[4] - s) / t, (c[5] - g) / i, NaN, NaN, NaN, NaN, p, w, NaN, NaN, NaN, NaN, S, M, NaN, NaN, NaN, NaN, (c[16] - s) / t, (c[17] - g) / i, NaN, NaN, NaN, NaN, (c[14] - s) / t, (c[15] - g) / i], 0), new T(B, u, this.#t, this.#u, this.#s, this.#n);
          }
          const _ = new Float64Array(this.#r.length + 24 + this.#e.length);
          let O = y.length;
          for (let B = 0; B < O; B += 2) {
            if (isNaN(y[B])) {
              _[B] = _[B + 1] = NaN;
              continue;
            }
            _[B] = y[B], _[B + 1] = y[B + 1];
          }
          _.set([NaN, NaN, NaN, NaN, (l[0] - s) / t, (l[1] - g) / i, NaN, NaN, NaN, NaN, p, w, NaN, NaN, NaN, NaN, S, M, NaN, NaN, NaN, NaN, (b[0] - s) / t, (b[1] - g) / i], O), O += 24;
          for (let B = r.length - 6; B >= 6; B -= 6)
            for (let U = 0; U < 6; U += 2) {
              if (isNaN(r[B + U])) {
                _[O] = _[O + 1] = NaN, O += 2;
                continue;
              }
              _[O] = r[B + U], _[O + 1] = r[B + U + 1], O += 2;
            }
          return _.set([NaN, NaN, NaN, NaN, r[4], r[5]], O), new T(_, u, this.#t, this.#u, this.#s, this.#n);
        }
      }
      class T extends L {
        #t;
        #e = null;
        #s;
        #n;
        #r;
        #i;
        #a;
        constructor(y, r, c, l, b, s) {
          super(), this.#a = y, this.#r = r, this.#t = c, this.#i = l, this.#s = b, this.#n = s, this.#d(s);
          const {
            x: g,
            y: t,
            width: i,
            height: u
          } = this.#e;
          for (let p = 0, w = y.length; p < w; p += 2)
            y[p] = (y[p] - g) / i, y[p + 1] = (y[p + 1] - t) / u;
          for (let p = 0, w = r.length; p < w; p += 2)
            r[p] = (r[p] - g) / i, r[p + 1] = (r[p + 1] - t) / u;
        }
        toSVGPath() {
          const y = [`M${this.#a[4]} ${this.#a[5]}`];
          for (let r = 6, c = this.#a.length; r < c; r += 6) {
            if (isNaN(this.#a[r])) {
              y.push(`L${this.#a[r + 4]} ${this.#a[r + 5]}`);
              continue;
            }
            y.push(`C${this.#a[r]} ${this.#a[r + 1]} ${this.#a[r + 2]} ${this.#a[r + 3]} ${this.#a[r + 4]} ${this.#a[r + 5]}`);
          }
          return y.push("Z"), y.join(" ");
        }
        serialize([y, r, c, l], b) {
          const s = c - y, g = l - r;
          let t, i;
          switch (b) {
            case 0:
              t = this.#l(this.#a, y, l, s, -g), i = this.#l(this.#r, y, l, s, -g);
              break;
            case 90:
              t = this.#h(this.#a, y, r, s, g), i = this.#h(this.#r, y, r, s, g);
              break;
            case 180:
              t = this.#l(this.#a, c, r, -s, g), i = this.#l(this.#r, c, r, -s, g);
              break;
            case 270:
              t = this.#h(this.#a, c, l, -s, -g), i = this.#h(this.#r, c, l, -s, -g);
              break;
          }
          return {
            outline: Array.from(t),
            points: [Array.from(i)]
          };
        }
        #l(y, r, c, l, b) {
          const s = new Float64Array(y.length);
          for (let g = 0, t = y.length; g < t; g += 2)
            s[g] = r + y[g] * l, s[g + 1] = c + y[g + 1] * b;
          return s;
        }
        #h(y, r, c, l, b) {
          const s = new Float64Array(y.length);
          for (let g = 0, t = y.length; g < t; g += 2)
            s[g] = r + y[g + 1] * l, s[g + 1] = c + y[g] * b;
          return s;
        }
        #d(y) {
          const r = this.#a;
          let c = r[4], l = r[5], b = c, s = l, g = c, t = l, i = c, u = l;
          const p = y ? Math.max : Math.min;
          for (let O = 6, B = r.length; O < B; O += 6) {
            if (isNaN(r[O]))
              b = Math.min(b, r[O + 4]), s = Math.min(s, r[O + 5]), g = Math.max(g, r[O + 4]), t = Math.max(t, r[O + 5]), u < r[O + 5] ? (i = r[O + 4], u = r[O + 5]) : u === r[O + 5] && (i = p(i, r[O + 4]));
            else {
              const U = v.Util.bezierBoundingBox(c, l, ...r.slice(O, O + 6));
              b = Math.min(b, U[0]), s = Math.min(s, U[1]), g = Math.max(g, U[2]), t = Math.max(t, U[3]), u < U[3] ? (i = U[2], u = U[3]) : u === U[3] && (i = p(i, U[2]));
            }
            c = r[O + 4], l = r[O + 5];
          }
          const w = b - this.#s, S = s - this.#s, M = g - b + 2 * this.#s, _ = t - s + 2 * this.#s;
          this.#e = {
            x: w,
            y: S,
            width: M,
            height: _,
            lastPoint: [i, u]
          };
        }
        get box() {
          return this.#e;
        }
        getNewOutline(y, r) {
          const {
            x: c,
            y: l,
            width: b,
            height: s
          } = this.#e, [g, t, i, u] = this.#t, p = b * i, w = s * u, S = c * i + g, M = l * u + t, _ = new P({
            x: this.#r[0] * p + S,
            y: this.#r[1] * w + M
          }, this.#t, this.#i, y, this.#n, r ?? this.#s);
          for (let O = 2; O < this.#r.length; O += 2)
            _.add({
              x: this.#r[O] * p + S,
              y: this.#r[O + 1] * w + M
            });
          return _.getOutlines();
        }
      }
    }
  ),
  /***/
  362: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        EditorToolbar: () => (
          /* binding */
          H
        ),
        /* harmony export */
        HighlightToolbar: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var v = I(419);
      class H {
        #t = null;
        #e = null;
        #s;
        #n = null;
        constructor(P) {
          this.#s = P;
        }
        render() {
          const P = this.#t = document.createElement("div");
          P.className = "editToolbar", P.setAttribute("role", "toolbar"), P.addEventListener("contextmenu", v.noContextMenu), P.addEventListener("pointerdown", H.#r);
          const T = this.#n = document.createElement("div");
          T.className = "buttons", P.append(T);
          const E = this.#s.toolbarPosition;
          if (E) {
            const {
              style: y
            } = P, r = this.#s._uiManager.direction === "ltr" ? 1 - E[0] : E[0];
            y.insetInlineEnd = `${100 * r}%`, y.top = `calc(${100 * E[1]}% + var(--editor-toolbar-vert-offset))`;
          }
          return this.#h(), P;
        }
        static #r(P) {
          P.stopPropagation();
        }
        #i(P) {
          this.#s._focusEventsAllowed = !1, P.preventDefault(), P.stopPropagation();
        }
        #a(P) {
          this.#s._focusEventsAllowed = !0, P.preventDefault(), P.stopPropagation();
        }
        #l(P) {
          P.addEventListener("focusin", this.#i.bind(this), {
            capture: !0
          }), P.addEventListener("focusout", this.#a.bind(this), {
            capture: !0
          }), P.addEventListener("contextmenu", v.noContextMenu);
        }
        hide() {
          this.#t.classList.add("hidden"), this.#e?.hideDropdown();
        }
        show() {
          this.#t.classList.remove("hidden");
        }
        #h() {
          const P = document.createElement("button");
          P.className = "delete", P.tabIndex = 0, P.setAttribute("data-l10n-id", `pdfjs-editor-remove-${this.#s.editorType}-button`), this.#l(P), P.addEventListener("click", (T) => {
            this.#s._uiManager.delete();
          }), this.#n.append(P);
        }
        get #d() {
          const P = document.createElement("div");
          return P.className = "divider", P;
        }
        addAltTextButton(P) {
          this.#l(P), this.#n.prepend(P, this.#d);
        }
        addColorPicker(P) {
          this.#e = P;
          const T = P.renderButton();
          this.#l(T), this.#n.prepend(T, this.#d);
        }
        remove() {
          this.#t.remove(), this.#e?.destroy(), this.#e = null;
        }
      }
      class L {
        #t = null;
        #e = null;
        #s;
        constructor(P) {
          this.#s = P;
        }
        #n() {
          const P = this.#e = document.createElement("div");
          P.className = "editToolbar", P.setAttribute("role", "toolbar"), P.addEventListener("contextmenu", v.noContextMenu);
          const T = this.#t = document.createElement("div");
          return T.className = "buttons", P.append(T), this.#i(), P;
        }
        #r(P, T) {
          let E = 0, y = 0;
          for (const r of P) {
            const c = r.y + r.height;
            if (c < E)
              continue;
            const l = r.x + (T ? r.width : 0);
            if (c > E) {
              y = l, E = c;
              continue;
            }
            T ? l > y && (y = l) : l < y && (y = l);
          }
          return [T ? 1 - y : y, E];
        }
        show(P, T, E) {
          const [y, r] = this.#r(T, E), {
            style: c
          } = this.#e ||= this.#n();
          P.append(this.#e), c.insetInlineEnd = `${100 * y}%`, c.top = `calc(${100 * r}% + var(--editor-toolbar-vert-offset))`;
        }
        hide() {
          this.#e.remove();
        }
        #i() {
          const P = document.createElement("button");
          P.className = "highlightButton", P.tabIndex = 0, P.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button1");
          const T = document.createElement("span");
          P.append(T), T.className = "visuallyHidden", T.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button-label"), P.addEventListener("contextmenu", v.noContextMenu), P.addEventListener("click", () => {
            this.#s.highlightSelection("floating_button");
          }), this.#t.append(P);
        }
      }
    }
  ),
  /***/
  830: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        AnnotationEditorUIManager: () => (
          /* binding */
          l
        ),
        /* harmony export */
        ColorManager: () => (
          /* binding */
          c
        ),
        /* harmony export */
        KeyboardManager: () => (
          /* binding */
          r
        ),
        /* harmony export */
        bindEvents: () => (
          /* binding */
          G
        ),
        /* harmony export */
        opacityToHex: () => (
          /* binding */
          P
        )
        /* harmony export */
      });
      var v = I(292), H = I(419), L = I(362);
      function G(b, s, g) {
        for (const t of g)
          s.addEventListener(t, b[t].bind(b));
      }
      function P(b) {
        return Math.round(Math.min(255, Math.max(1, 255 * b))).toString(16).padStart(2, "0");
      }
      class T {
        #t = 0;
        constructor() {
        }
        get id() {
          return `${v.AnnotationEditorPrefix}${this.#t++}`;
        }
      }
      class E {
        #t = (0, v.getUuid)();
        #e = 0;
        #s = null;
        static get _isSVGFittingCanvas() {
          const s = 'data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" style="fill:red;"/></svg>', t = new OffscreenCanvas(1, 3).getContext("2d"), i = new Image();
          i.src = s;
          const u = i.decode().then(() => (t.drawImage(i, 0, 0, 1, 1, 0, 0, 1, 3), new Uint32Array(t.getImageData(0, 0, 1, 1).data.buffer)[0] === 0));
          return (0, v.shadow)(this, "_isSVGFittingCanvas", u);
        }
        async #n(s, g) {
          this.#s ||= /* @__PURE__ */ new Map();
          let t = this.#s.get(s);
          if (t === null)
            return null;
          if (t?.bitmap)
            return t.refCounter += 1, t;
          try {
            t ||= {
              bitmap: null,
              id: `image_${this.#t}_${this.#e++}`,
              refCounter: 0,
              isSvg: !1
            };
            let i;
            if (typeof g == "string" ? (t.url = g, i = await (0, H.fetchData)(g, "blob")) : i = t.file = g, i.type === "image/svg+xml") {
              const u = E._isSVGFittingCanvas, p = new FileReader(), w = new Image(), S = new Promise((M, _) => {
                w.onload = () => {
                  t.bitmap = w, t.isSvg = !0, M();
                }, p.onload = async () => {
                  const O = t.svgUrl = p.result;
                  w.src = await u ? `${O}#svgView(preserveAspectRatio(none))` : O;
                }, w.onerror = p.onerror = _;
              });
              p.readAsDataURL(i), await S;
            } else
              t.bitmap = await createImageBitmap(i);
            t.refCounter = 1;
          } catch (i) {
            console.error(i), t = null;
          }
          return this.#s.set(s, t), t && this.#s.set(t.id, t), t;
        }
        async getFromFile(s) {
          const {
            lastModified: g,
            name: t,
            size: i,
            type: u
          } = s;
          return this.#n(`${g}_${t}_${i}_${u}`, s);
        }
        async getFromUrl(s) {
          return this.#n(s, s);
        }
        async getFromId(s) {
          this.#s ||= /* @__PURE__ */ new Map();
          const g = this.#s.get(s);
          return g ? g.bitmap ? (g.refCounter += 1, g) : g.file ? this.getFromFile(g.file) : this.getFromUrl(g.url) : null;
        }
        getSvgUrl(s) {
          const g = this.#s.get(s);
          return g?.isSvg ? g.svgUrl : null;
        }
        deleteId(s) {
          this.#s ||= /* @__PURE__ */ new Map();
          const g = this.#s.get(s);
          g && (g.refCounter -= 1, g.refCounter === 0 && (g.bitmap = null));
        }
        isValidId(s) {
          return s.startsWith(`image_${this.#t}_`);
        }
      }
      class y {
        #t = [];
        #e = !1;
        #s;
        #n = -1;
        constructor(s = 128) {
          this.#s = s;
        }
        add({
          cmd: s,
          undo: g,
          post: t,
          mustExec: i,
          type: u = NaN,
          overwriteIfSameType: p = !1,
          keepUndo: w = !1
        }) {
          if (i && s(), this.#e)
            return;
          const S = {
            cmd: s,
            undo: g,
            post: t,
            type: u
          };
          if (this.#n === -1) {
            this.#t.length > 0 && (this.#t.length = 0), this.#n = 0, this.#t.push(S);
            return;
          }
          if (p && this.#t[this.#n].type === u) {
            w && (S.undo = this.#t[this.#n].undo), this.#t[this.#n] = S;
            return;
          }
          const M = this.#n + 1;
          M === this.#s ? this.#t.splice(0, 1) : (this.#n = M, M < this.#t.length && this.#t.splice(M)), this.#t.push(S);
        }
        undo() {
          if (this.#n === -1)
            return;
          this.#e = !0;
          const {
            undo: s,
            post: g
          } = this.#t[this.#n];
          s(), g?.(), this.#e = !1, this.#n -= 1;
        }
        redo() {
          if (this.#n < this.#t.length - 1) {
            this.#n += 1, this.#e = !0;
            const {
              cmd: s,
              post: g
            } = this.#t[this.#n];
            s(), g?.(), this.#e = !1;
          }
        }
        hasSomethingToUndo() {
          return this.#n !== -1;
        }
        hasSomethingToRedo() {
          return this.#n < this.#t.length - 1;
        }
        destroy() {
          this.#t = null;
        }
      }
      class r {
        constructor(s) {
          this.buffer = [], this.callbacks = /* @__PURE__ */ new Map(), this.allKeys = /* @__PURE__ */ new Set();
          const {
            isMac: g
          } = v.FeatureTest.platform;
          for (const [t, i, u = {}] of s)
            for (const p of t) {
              const w = p.startsWith("mac+");
              g && w ? (this.callbacks.set(p.slice(4), {
                callback: i,
                options: u
              }), this.allKeys.add(p.split("+").at(-1))) : !g && !w && (this.callbacks.set(p, {
                callback: i,
                options: u
              }), this.allKeys.add(p.split("+").at(-1)));
            }
        }
        #t(s) {
          s.altKey && this.buffer.push("alt"), s.ctrlKey && this.buffer.push("ctrl"), s.metaKey && this.buffer.push("meta"), s.shiftKey && this.buffer.push("shift"), this.buffer.push(s.key);
          const g = this.buffer.join("+");
          return this.buffer.length = 0, g;
        }
        exec(s, g) {
          if (!this.allKeys.has(g.key))
            return;
          const t = this.callbacks.get(this.#t(g));
          if (!t)
            return;
          const {
            callback: i,
            options: {
              bubbles: u = !1,
              args: p = [],
              checker: w = null
            }
          } = t;
          w && !w(s, g) || (i.bind(s, ...p, g)(), u || (g.stopPropagation(), g.preventDefault()));
        }
      }
      class c {
        static _colorsMapping = /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]);
        get _colors() {
          const s = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
          return (0, H.getColorValues)(s), (0, v.shadow)(this, "_colors", s);
        }
        convert(s) {
          const g = (0, H.getRGB)(s);
          if (!window.matchMedia("(forced-colors: active)").matches)
            return g;
          for (const [t, i] of this._colors)
            if (i.every((u, p) => u === g[p]))
              return c._colorsMapping.get(t);
          return g;
        }
        getHexCode(s) {
          const g = this._colors.get(s);
          return g ? v.Util.makeHexColor(...g) : s;
        }
      }
      class l {
        #t = null;
        #e = /* @__PURE__ */ new Map();
        #s = /* @__PURE__ */ new Map();
        #n = null;
        #r = null;
        #i = null;
        #a = new y();
        #l = 0;
        #h = /* @__PURE__ */ new Set();
        #d = null;
        #u = null;
        #c = /* @__PURE__ */ new Set();
        #o = !1;
        #p = null;
        #g = null;
        #f = null;
        #v = !1;
        #m = null;
        #A = new T();
        #w = !1;
        #C = !1;
        #R = null;
        #I = null;
        #L = null;
        #y = v.AnnotationEditorType.NONE;
        #b = /* @__PURE__ */ new Set();
        #S = null;
        #x = null;
        #k = null;
        #T = this.blur.bind(this);
        #M = this.focus.bind(this);
        #F = this.copy.bind(this);
        #_ = this.cut.bind(this);
        #P = this.paste.bind(this);
        #N = this.keydown.bind(this);
        #$ = this.keyup.bind(this);
        #V = this.onEditingAction.bind(this);
        #X = this.onPageChanging.bind(this);
        #G = this.onScaleChanging.bind(this);
        #z = this.#rt.bind(this);
        #D = this.onRotationChanging.bind(this);
        #q = {
          isEditing: !1,
          isEmpty: !0,
          hasSomethingToUndo: !1,
          hasSomethingToRedo: !1,
          hasSelectedEditor: !1,
          hasSelectedText: !1
        };
        #U = [0, 0];
        #O = null;
        #B = null;
        #Z = null;
        static TRANSLATE_SMALL = 1;
        static TRANSLATE_BIG = 10;
        static get _keyboardManager() {
          const s = l.prototype, g = (p) => p.#B.contains(document.activeElement) && document.activeElement.tagName !== "BUTTON" && p.hasSomethingToControl(), t = (p, {
            target: w
          }) => {
            if (w instanceof HTMLInputElement) {
              const {
                type: S
              } = w;
              return S !== "text" && S !== "number";
            }
            return !0;
          }, i = this.TRANSLATE_SMALL, u = this.TRANSLATE_BIG;
          return (0, v.shadow)(this, "_keyboardManager", new r([[["ctrl+a", "mac+meta+a"], s.selectAll, {
            checker: t
          }], [["ctrl+z", "mac+meta+z"], s.undo, {
            checker: t
          }], [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], s.redo, {
            checker: t
          }], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"], s.delete, {
            checker: t
          }], [["Enter", "mac+Enter"], s.addNewEditorFromKeyboard, {
            checker: (p, {
              target: w
            }) => !(w instanceof HTMLButtonElement) && p.#B.contains(w) && !p.isEnterHandled
          }], [[" ", "mac+ "], s.addNewEditorFromKeyboard, {
            checker: (p, {
              target: w
            }) => !(w instanceof HTMLButtonElement) && p.#B.contains(document.activeElement)
          }], [["Escape", "mac+Escape"], s.unselectAll], [["ArrowLeft", "mac+ArrowLeft"], s.translateSelectedEditors, {
            args: [-i, 0],
            checker: g
          }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], s.translateSelectedEditors, {
            args: [-u, 0],
            checker: g
          }], [["ArrowRight", "mac+ArrowRight"], s.translateSelectedEditors, {
            args: [i, 0],
            checker: g
          }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], s.translateSelectedEditors, {
            args: [u, 0],
            checker: g
          }], [["ArrowUp", "mac+ArrowUp"], s.translateSelectedEditors, {
            args: [0, -i],
            checker: g
          }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], s.translateSelectedEditors, {
            args: [0, -u],
            checker: g
          }], [["ArrowDown", "mac+ArrowDown"], s.translateSelectedEditors, {
            args: [0, i],
            checker: g
          }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], s.translateSelectedEditors, {
            args: [0, u],
            checker: g
          }]]));
        }
        constructor(s, g, t, i, u, p, w, S, M) {
          this.#B = s, this.#Z = g, this.#n = t, this._eventBus = i, this._eventBus._on("editingaction", this.#V), this._eventBus._on("pagechanging", this.#X), this._eventBus._on("scalechanging", this.#G), this._eventBus._on("rotationchanging", this.#D), this.#at(), this.#Q(), this.#r = u.annotationStorage, this.#p = u.filterFactory, this.#x = p, this.#f = w || null, this.#o = S, this.#L = M || null, this.viewParameters = {
            realScale: H.PixelsPerInch.PDF_TO_CSS_UNITS,
            rotation: 0
          }, this.isShiftKeyDown = !1;
        }
        destroy() {
          this.#J(), this.#K(), this._eventBus._off("editingaction", this.#V), this._eventBus._off("pagechanging", this.#X), this._eventBus._off("scalechanging", this.#G), this._eventBus._off("rotationchanging", this.#D);
          for (const s of this.#s.values())
            s.destroy();
          this.#s.clear(), this.#e.clear(), this.#c.clear(), this.#t = null, this.#b.clear(), this.#a.destroy(), this.#n?.destroy(), this.#m?.hide(), this.#m = null, this.#g && (clearTimeout(this.#g), this.#g = null), this.#O && (clearTimeout(this.#O), this.#O = null), this.#ot();
        }
        async mlGuess(s) {
          return this.#L?.guess(s) || null;
        }
        get hasMLManager() {
          return !!this.#L;
        }
        get hcmFilter() {
          return (0, v.shadow)(this, "hcmFilter", this.#x ? this.#p.addHCMFilter(this.#x.foreground, this.#x.background) : "none");
        }
        get direction() {
          return (0, v.shadow)(this, "direction", getComputedStyle(this.#B).direction);
        }
        get highlightColors() {
          return (0, v.shadow)(this, "highlightColors", this.#f ? new Map(this.#f.split(",").map((s) => s.split("=").map((g) => g.trim()))) : null);
        }
        get highlightColorNames() {
          return (0, v.shadow)(this, "highlightColorNames", this.highlightColors ? new Map(Array.from(this.highlightColors, (s) => s.reverse())) : null);
        }
        setMainHighlightColorPicker(s) {
          this.#I = s;
        }
        editAltText(s) {
          this.#n?.editAltText(this, s);
        }
        onPageChanging({
          pageNumber: s
        }) {
          this.#l = s - 1;
        }
        focusMainContainer() {
          this.#B.focus();
        }
        findParent(s, g) {
          for (const t of this.#s.values()) {
            const {
              x: i,
              y: u,
              width: p,
              height: w
            } = t.div.getBoundingClientRect();
            if (s >= i && s <= i + p && g >= u && g <= u + w)
              return t;
          }
          return null;
        }
        disableUserSelect(s = !1) {
          this.#Z.classList.toggle("noUserSelect", s);
        }
        addShouldRescale(s) {
          this.#c.add(s);
        }
        removeShouldRescale(s) {
          this.#c.delete(s);
        }
        onScaleChanging({
          scale: s
        }) {
          this.commitOrRemove(), this.viewParameters.realScale = s * H.PixelsPerInch.PDF_TO_CSS_UNITS;
          for (const g of this.#c)
            g.onScaleChanging();
        }
        onRotationChanging({
          pagesRotation: s
        }) {
          this.commitOrRemove(), this.viewParameters.rotation = s;
        }
        #j({
          anchorNode: s
        }) {
          return s.nodeType === Node.TEXT_NODE ? s.parentElement : s;
        }
        highlightSelection(s = "") {
          const g = document.getSelection();
          if (!g || g.isCollapsed)
            return;
          const {
            anchorNode: t,
            anchorOffset: i,
            focusNode: u,
            focusOffset: p
          } = g, w = g.toString(), M = this.#j(g).closest(".textLayer"), _ = this.getSelectionBoxes(M);
          if (_) {
            g.empty(), this.#y === v.AnnotationEditorType.NONE && (this._eventBus.dispatch("showannotationeditorui", {
              source: this,
              mode: v.AnnotationEditorType.HIGHLIGHT
            }), this.showAllEditors("highlight", !0, !0));
            for (const O of this.#s.values())
              if (O.hasTextLayer(M)) {
                O.createAndAddNewEditor({
                  x: 0,
                  y: 0
                }, !1, {
                  methodOfCreation: s,
                  boxes: _,
                  anchorNode: t,
                  anchorOffset: i,
                  focusNode: u,
                  focusOffset: p,
                  text: w
                });
                break;
              }
          }
        }
        #nt() {
          const s = document.getSelection();
          if (!s || s.isCollapsed)
            return;
          const t = this.#j(s).closest(".textLayer"), i = this.getSelectionBoxes(t);
          i && (this.#m ||= new L.HighlightToolbar(this), this.#m.show(t, i, this.direction === "ltr"));
        }
        addToAnnotationStorage(s) {
          !s.isEmpty() && this.#r && !this.#r.has(s.id) && this.#r.setValue(s.id, s);
        }
        #rt() {
          const s = document.getSelection();
          if (!s || s.isCollapsed) {
            this.#S && (this.#m?.hide(), this.#S = null, this.#E({
              hasSelectedText: !1
            }));
            return;
          }
          const {
            anchorNode: g
          } = s;
          if (g === this.#S)
            return;
          if (!this.#j(s).closest(".textLayer")) {
            this.#S && (this.#m?.hide(), this.#S = null, this.#E({
              hasSelectedText: !1
            }));
            return;
          }
          if (this.#m?.hide(), this.#S = g, this.#E({
            hasSelectedText: !0
          }), !(this.#y !== v.AnnotationEditorType.HIGHLIGHT && this.#y !== v.AnnotationEditorType.NONE) && (this.#y === v.AnnotationEditorType.HIGHLIGHT && this.showAllEditors("highlight", !0, !0), this.#v = this.isShiftKeyDown, !this.isShiftKeyDown)) {
            const u = (p) => {
              p.type === "pointerup" && p.button !== 0 || (window.removeEventListener("pointerup", u), window.removeEventListener("blur", u), p.type === "pointerup" && this.#W("main_toolbar"));
            };
            window.addEventListener("pointerup", u), window.addEventListener("blur", u);
          }
        }
        #W(s = "") {
          this.#y === v.AnnotationEditorType.HIGHLIGHT ? this.highlightSelection(s) : this.#o && this.#nt();
        }
        #at() {
          document.addEventListener("selectionchange", this.#z);
        }
        #ot() {
          document.removeEventListener("selectionchange", this.#z);
        }
        #ht() {
          window.addEventListener("focus", this.#M), window.addEventListener("blur", this.#T);
        }
        #K() {
          window.removeEventListener("focus", this.#M), window.removeEventListener("blur", this.#T);
        }
        blur() {
          if (this.isShiftKeyDown = !1, this.#v && (this.#v = !1, this.#W("main_toolbar")), !this.hasSelection)
            return;
          const {
            activeElement: s
          } = document;
          for (const g of this.#b)
            if (g.div.contains(s)) {
              this.#R = [g, s], g._focusEventsAllowed = !1;
              break;
            }
        }
        focus() {
          if (!this.#R)
            return;
          const [s, g] = this.#R;
          this.#R = null, g.addEventListener("focusin", () => {
            s._focusEventsAllowed = !0;
          }, {
            once: !0
          }), g.focus();
        }
        #Q() {
          window.addEventListener("keydown", this.#N), window.addEventListener("keyup", this.#$);
        }
        #J() {
          window.removeEventListener("keydown", this.#N), window.removeEventListener("keyup", this.#$);
        }
        #tt() {
          document.addEventListener("copy", this.#F), document.addEventListener("cut", this.#_), document.addEventListener("paste", this.#P);
        }
        #et() {
          document.removeEventListener("copy", this.#F), document.removeEventListener("cut", this.#_), document.removeEventListener("paste", this.#P);
        }
        addEditListeners() {
          this.#Q(), this.#tt();
        }
        removeEditListeners() {
          this.#J(), this.#et();
        }
        copy(s) {
          if (s.preventDefault(), this.#t?.commitOrRemove(), !this.hasSelection)
            return;
          const g = [];
          for (const t of this.#b) {
            const i = t.serialize(!0);
            i && g.push(i);
          }
          g.length !== 0 && s.clipboardData.setData("application/pdfjs", JSON.stringify(g));
        }
        cut(s) {
          this.copy(s), this.delete();
        }
        paste(s) {
          s.preventDefault();
          const {
            clipboardData: g
          } = s;
          for (const u of g.items)
            for (const p of this.#u)
              if (p.isHandlingMimeForPasting(u.type)) {
                p.paste(u, this.currentLayer);
                return;
              }
          let t = g.getData("application/pdfjs");
          if (!t)
            return;
          try {
            t = JSON.parse(t);
          } catch (u) {
            (0, v.warn)(`paste: "${u.message}".`);
            return;
          }
          if (!Array.isArray(t))
            return;
          this.unselectAll();
          const i = this.currentLayer;
          try {
            const u = [];
            for (const S of t) {
              const M = i.deserialize(S);
              if (!M)
                return;
              u.push(M);
            }
            const p = () => {
              for (const S of u)
                this.#st(S);
              this.#it(u);
            }, w = () => {
              for (const S of u)
                S.remove();
            };
            this.addCommands({
              cmd: p,
              undo: w,
              mustExec: !0
            });
          } catch (u) {
            (0, v.warn)(`paste: "${u.message}".`);
          }
        }
        keydown(s) {
          !this.isShiftKeyDown && s.key === "Shift" && (this.isShiftKeyDown = !0), this.#y !== v.AnnotationEditorType.NONE && !this.isEditorHandlingKeyboard && l._keyboardManager.exec(this, s);
        }
        keyup(s) {
          this.isShiftKeyDown && s.key === "Shift" && (this.isShiftKeyDown = !1, this.#v && (this.#v = !1, this.#W("main_toolbar")));
        }
        onEditingAction({
          name: s
        }) {
          switch (s) {
            case "undo":
            case "redo":
            case "delete":
            case "selectAll":
              this[s]();
              break;
            case "highlightSelection":
              this.highlightSelection("context_menu");
              break;
          }
        }
        #E(s) {
          Object.entries(s).some(([t, i]) => this.#q[t] !== i) && (this._eventBus.dispatch("annotationeditorstateschanged", {
            source: this,
            details: Object.assign(this.#q, s)
          }), this.#y === v.AnnotationEditorType.HIGHLIGHT && s.hasSelectedEditor === !1 && this.#H([[v.AnnotationEditorParamsType.HIGHLIGHT_FREE, !0]]));
        }
        #H(s) {
          this._eventBus.dispatch("annotationeditorparamschanged", {
            source: this,
            details: s
          });
        }
        setEditingState(s) {
          s ? (this.#ht(), this.#tt(), this.#E({
            isEditing: this.#y !== v.AnnotationEditorType.NONE,
            isEmpty: this.#Y(),
            hasSomethingToUndo: this.#a.hasSomethingToUndo(),
            hasSomethingToRedo: this.#a.hasSomethingToRedo(),
            hasSelectedEditor: !1
          })) : (this.#K(), this.#et(), this.#E({
            isEditing: !1
          }), this.disableUserSelect(!1));
        }
        registerEditorTypes(s) {
          if (!this.#u) {
            this.#u = s;
            for (const g of this.#u)
              this.#H(g.defaultPropertiesToUpdate);
          }
        }
        getId() {
          return this.#A.id;
        }
        get currentLayer() {
          return this.#s.get(this.#l);
        }
        getLayer(s) {
          return this.#s.get(s);
        }
        get currentPageIndex() {
          return this.#l;
        }
        addLayer(s) {
          this.#s.set(s.pageIndex, s), this.#w ? s.enable() : s.disable();
        }
        removeLayer(s) {
          this.#s.delete(s.pageIndex);
        }
        updateMode(s, g = null, t = !1) {
          if (this.#y !== s) {
            if (this.#y = s, s === v.AnnotationEditorType.NONE) {
              this.setEditingState(!1), this.#ct();
              return;
            }
            this.setEditingState(!0), this.#lt(), this.unselectAll();
            for (const i of this.#s.values())
              i.updateMode(s);
            if (!g && t) {
              this.addNewEditorFromKeyboard();
              return;
            }
            if (g) {
              for (const i of this.#e.values())
                if (i.annotationElementId === g) {
                  this.setSelected(i), i.enterInEditMode();
                  break;
                }
            }
          }
        }
        addNewEditorFromKeyboard() {
          this.currentLayer.canCreateNewEmptyEditor() && this.currentLayer.addNewEditor();
        }
        updateToolbar(s) {
          s !== this.#y && this._eventBus.dispatch("switchannotationeditormode", {
            source: this,
            mode: s
          });
        }
        updateParams(s, g) {
          if (this.#u) {
            switch (s) {
              case v.AnnotationEditorParamsType.CREATE:
                this.currentLayer.addNewEditor();
                return;
              case v.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
                this.#I?.updateColor(g);
                break;
              case v.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL:
                this._eventBus.dispatch("reporttelemetry", {
                  source: this,
                  details: {
                    type: "editing",
                    data: {
                      type: "highlight",
                      action: "toggle_visibility"
                    }
                  }
                }), (this.#k ||= /* @__PURE__ */ new Map()).set(s, g), this.showAllEditors("highlight", g);
                break;
            }
            for (const t of this.#b)
              t.updateParams(s, g);
            for (const t of this.#u)
              t.updateDefaultParams(s, g);
          }
        }
        showAllEditors(s, g, t = !1) {
          for (const u of this.#e.values())
            u.editorType === s && u.show(g);
          (this.#k?.get(v.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL) ?? !0) !== g && this.#H([[v.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL, g]]);
        }
        enableWaiting(s = !1) {
          if (this.#C !== s) {
            this.#C = s;
            for (const g of this.#s.values())
              s ? g.disableClick() : g.enableClick(), g.div.classList.toggle("waiting", s);
          }
        }
        #lt() {
          if (!this.#w) {
            this.#w = !0;
            for (const s of this.#s.values())
              s.enable();
            for (const s of this.#e.values())
              s.enable();
          }
        }
        #ct() {
          if (this.unselectAll(), this.#w) {
            this.#w = !1;
            for (const s of this.#s.values())
              s.disable();
            for (const s of this.#e.values())
              s.disable();
          }
        }
        getEditors(s) {
          const g = [];
          for (const t of this.#e.values())
            t.pageIndex === s && g.push(t);
          return g;
        }
        getEditor(s) {
          return this.#e.get(s);
        }
        addEditor(s) {
          this.#e.set(s.id, s);
        }
        removeEditor(s) {
          s.div.contains(document.activeElement) && (this.#g && clearTimeout(this.#g), this.#g = setTimeout(() => {
            this.focusMainContainer(), this.#g = null;
          }, 0)), this.#e.delete(s.id), this.unselect(s), (!s.annotationElementId || !this.#h.has(s.annotationElementId)) && this.#r?.remove(s.id);
        }
        addDeletedAnnotationElement(s) {
          this.#h.add(s.annotationElementId), this.addChangedExistingAnnotation(s), s.deleted = !0;
        }
        isDeletedAnnotationElement(s) {
          return this.#h.has(s);
        }
        removeDeletedAnnotationElement(s) {
          this.#h.delete(s.annotationElementId), this.removeChangedExistingAnnotation(s), s.deleted = !1;
        }
        #st(s) {
          const g = this.#s.get(s.pageIndex);
          g ? g.addOrRebuild(s) : (this.addEditor(s), this.addToAnnotationStorage(s));
        }
        setActiveEditor(s) {
          this.#t !== s && (this.#t = s, s && this.#H(s.propertiesToUpdate));
        }
        get #dt() {
          let s = null;
          for (s of this.#b)
            ;
          return s;
        }
        updateUI(s) {
          this.#dt === s && this.#H(s.propertiesToUpdate);
        }
        toggleSelected(s) {
          if (this.#b.has(s)) {
            this.#b.delete(s), s.unselect(), this.#E({
              hasSelectedEditor: this.hasSelection
            });
            return;
          }
          this.#b.add(s), s.select(), this.#H(s.propertiesToUpdate), this.#E({
            hasSelectedEditor: !0
          });
        }
        setSelected(s) {
          for (const g of this.#b)
            g !== s && g.unselect();
          this.#b.clear(), this.#b.add(s), s.select(), this.#H(s.propertiesToUpdate), this.#E({
            hasSelectedEditor: !0
          });
        }
        isSelected(s) {
          return this.#b.has(s);
        }
        get firstSelectedEditor() {
          return this.#b.values().next().value;
        }
        unselect(s) {
          s.unselect(), this.#b.delete(s), this.#E({
            hasSelectedEditor: this.hasSelection
          });
        }
        get hasSelection() {
          return this.#b.size !== 0;
        }
        get isEnterHandled() {
          return this.#b.size === 1 && this.firstSelectedEditor.isEnterHandled;
        }
        undo() {
          this.#a.undo(), this.#E({
            hasSomethingToUndo: this.#a.hasSomethingToUndo(),
            hasSomethingToRedo: !0,
            isEmpty: this.#Y()
          });
        }
        redo() {
          this.#a.redo(), this.#E({
            hasSomethingToUndo: !0,
            hasSomethingToRedo: this.#a.hasSomethingToRedo(),
            isEmpty: this.#Y()
          });
        }
        addCommands(s) {
          this.#a.add(s), this.#E({
            hasSomethingToUndo: !0,
            hasSomethingToRedo: !1,
            isEmpty: this.#Y()
          });
        }
        #Y() {
          if (this.#e.size === 0)
            return !0;
          if (this.#e.size === 1)
            for (const s of this.#e.values())
              return s.isEmpty();
          return !1;
        }
        delete() {
          if (this.commitOrRemove(), !this.hasSelection)
            return;
          const s = [...this.#b], g = () => {
            for (const i of s)
              i.remove();
          }, t = () => {
            for (const i of s)
              this.#st(i);
          };
          this.addCommands({
            cmd: g,
            undo: t,
            mustExec: !0
          });
        }
        commitOrRemove() {
          this.#t?.commitOrRemove();
        }
        hasSomethingToControl() {
          return this.#t || this.hasSelection;
        }
        #it(s) {
          for (const g of this.#b)
            g.unselect();
          this.#b.clear();
          for (const g of s)
            g.isEmpty() || (this.#b.add(g), g.select());
          this.#E({
            hasSelectedEditor: this.hasSelection
          });
        }
        selectAll() {
          for (const s of this.#b)
            s.commit();
          this.#it(this.#e.values());
        }
        unselectAll() {
          if (!(this.#t && (this.#t.commitOrRemove(), this.#y !== v.AnnotationEditorType.NONE)) && this.hasSelection) {
            for (const s of this.#b)
              s.unselect();
            this.#b.clear(), this.#E({
              hasSelectedEditor: !1
            });
          }
        }
        translateSelectedEditors(s, g, t = !1) {
          if (t || this.commitOrRemove(), !this.hasSelection)
            return;
          this.#U[0] += s, this.#U[1] += g;
          const [i, u] = this.#U, p = [...this.#b], w = 1e3;
          this.#O && clearTimeout(this.#O), this.#O = setTimeout(() => {
            this.#O = null, this.#U[0] = this.#U[1] = 0, this.addCommands({
              cmd: () => {
                for (const S of p)
                  this.#e.has(S.id) && S.translateInPage(i, u);
              },
              undo: () => {
                for (const S of p)
                  this.#e.has(S.id) && S.translateInPage(-i, -u);
              },
              mustExec: !1
            });
          }, w);
          for (const S of p)
            S.translateInPage(s, g);
        }
        setUpDragSession() {
          if (this.hasSelection) {
            this.disableUserSelect(!0), this.#d = /* @__PURE__ */ new Map();
            for (const s of this.#b)
              this.#d.set(s, {
                savedX: s.x,
                savedY: s.y,
                savedPageIndex: s.pageIndex,
                newX: 0,
                newY: 0,
                newPageIndex: -1
              });
          }
        }
        endDragSession() {
          if (!this.#d)
            return !1;
          this.disableUserSelect(!1);
          const s = this.#d;
          this.#d = null;
          let g = !1;
          for (const [{
            x: i,
            y: u,
            pageIndex: p
          }, w] of s)
            w.newX = i, w.newY = u, w.newPageIndex = p, g ||= i !== w.savedX || u !== w.savedY || p !== w.savedPageIndex;
          if (!g)
            return !1;
          const t = (i, u, p, w) => {
            if (this.#e.has(i.id)) {
              const S = this.#s.get(w);
              S ? i._setParentAndPosition(S, u, p) : (i.pageIndex = w, i.x = u, i.y = p);
            }
          };
          return this.addCommands({
            cmd: () => {
              for (const [i, {
                newX: u,
                newY: p,
                newPageIndex: w
              }] of s)
                t(i, u, p, w);
            },
            undo: () => {
              for (const [i, {
                savedX: u,
                savedY: p,
                savedPageIndex: w
              }] of s)
                t(i, u, p, w);
            },
            mustExec: !0
          }), !0;
        }
        dragSelectedEditors(s, g) {
          if (this.#d)
            for (const t of this.#d.keys())
              t.drag(s, g);
        }
        rebuild(s) {
          if (s.parent === null) {
            const g = this.getLayer(s.pageIndex);
            g ? (g.changeParent(s), g.addOrRebuild(s)) : (this.addEditor(s), this.addToAnnotationStorage(s), s.rebuild());
          } else
            s.parent.addOrRebuild(s);
        }
        get isEditorHandlingKeyboard() {
          return this.getActive()?.shouldGetKeyboardEvents() || this.#b.size === 1 && this.firstSelectedEditor.shouldGetKeyboardEvents();
        }
        isActive(s) {
          return this.#t === s;
        }
        getActive() {
          return this.#t;
        }
        getMode() {
          return this.#y;
        }
        get imageManager() {
          return (0, v.shadow)(this, "imageManager", new E());
        }
        getSelectionBoxes(s) {
          if (!s)
            return null;
          const g = document.getSelection();
          for (let M = 0, _ = g.rangeCount; M < _; M++)
            if (!s.contains(g.getRangeAt(M).commonAncestorContainer))
              return null;
          const {
            x: t,
            y: i,
            width: u,
            height: p
          } = s.getBoundingClientRect();
          let w;
          switch (s.getAttribute("data-main-rotation")) {
            case "90":
              w = (M, _, O, B) => ({
                x: (_ - i) / p,
                y: 1 - (M + O - t) / u,
                width: B / p,
                height: O / u
              });
              break;
            case "180":
              w = (M, _, O, B) => ({
                x: 1 - (M + O - t) / u,
                y: 1 - (_ + B - i) / p,
                width: O / u,
                height: B / p
              });
              break;
            case "270":
              w = (M, _, O, B) => ({
                x: 1 - (_ + B - i) / p,
                y: (M - t) / u,
                width: B / p,
                height: O / u
              });
              break;
            default:
              w = (M, _, O, B) => ({
                x: (M - t) / u,
                y: (_ - i) / p,
                width: O / u,
                height: B / p
              });
              break;
          }
          const S = [];
          for (let M = 0, _ = g.rangeCount; M < _; M++) {
            const O = g.getRangeAt(M);
            if (!O.collapsed)
              for (const {
                x: B,
                y: U,
                width: K,
                height: rt
              } of O.getClientRects())
                K === 0 || rt === 0 || S.push(w(B, U, K, rt));
          }
          return S.length === 0 ? null : S;
        }
        addChangedExistingAnnotation({
          annotationElementId: s,
          id: g
        }) {
          (this.#i ||= /* @__PURE__ */ new Map()).set(s, g);
        }
        removeChangedExistingAnnotation({
          annotationElementId: s
        }) {
          this.#i?.delete(s);
        }
        renderAnnotationElement(s) {
          const g = this.#i?.get(s.data.id);
          if (!g)
            return;
          const t = this.#r.getRawValue(g);
          t && (this.#y === v.AnnotationEditorType.NONE && !t.hasBeenModified || t.renderAnnotationElement(s));
        }
      }
    }
  ),
  /***/
  94: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        PDFFetchStream: () => (
          /* binding */
          T
        )
        /* harmony export */
      });
      var v = I(292), H = I(490);
      function L(r, c, l) {
        return {
          method: "GET",
          headers: r,
          signal: l.signal,
          mode: "cors",
          credentials: c ? "include" : "same-origin",
          redirect: "follow"
        };
      }
      function G(r) {
        const c = new Headers();
        for (const l in r) {
          const b = r[l];
          b !== void 0 && c.append(l, b);
        }
        return c;
      }
      function P(r) {
        return r instanceof Uint8Array ? r.buffer : r instanceof ArrayBuffer ? r : ((0, v.warn)(`getArrayBuffer - unexpected data format: ${r}`), new Uint8Array(r).buffer);
      }
      class T {
        constructor(c) {
          this.source = c, this.isHttp = /^https?:/i.test(c.url), this.httpHeaders = this.isHttp && c.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
        }
        get _progressiveDataLength() {
          return this._fullRequestReader?._loaded ?? 0;
        }
        getFullReader() {
          return (0, v.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once."), this._fullRequestReader = new E(this), this._fullRequestReader;
        }
        getRangeReader(c, l) {
          if (l <= this._progressiveDataLength)
            return null;
          const b = new y(this, c, l);
          return this._rangeRequestReaders.push(b), b;
        }
        cancelAllRequests(c) {
          this._fullRequestReader?.cancel(c);
          for (const l of this._rangeRequestReaders.slice(0))
            l.cancel(c);
        }
      }
      class E {
        constructor(c) {
          this._stream = c, this._reader = null, this._loaded = 0, this._filename = null;
          const l = c.source;
          this._withCredentials = l.withCredentials || !1, this._contentLength = l.length, this._headersCapability = Promise.withResolvers(), this._disableRange = l.disableRange || !1, this._rangeChunkSize = l.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._abortController = new AbortController(), this._isStreamingSupported = !l.disableStream, this._isRangeSupported = !l.disableRange, this._headers = G(this._stream.httpHeaders);
          const b = l.url;
          fetch(b, L(this._headers, this._withCredentials, this._abortController)).then((s) => {
            if (!(0, H.validateResponseStatus)(s.status))
              throw (0, H.createResponseStatusError)(s.status, b);
            this._reader = s.body.getReader(), this._headersCapability.resolve();
            const g = (u) => s.headers.get(u), {
              allowRangeRequests: t,
              suggestedLength: i
            } = (0, H.validateRangeRequestCapabilities)({
              getResponseHeader: g,
              isHttp: this._stream.isHttp,
              rangeChunkSize: this._rangeChunkSize,
              disableRange: this._disableRange
            });
            this._isRangeSupported = t, this._contentLength = i || this._contentLength, this._filename = (0, H.extractFilenameFromHeader)(g), !this._isStreamingSupported && this._isRangeSupported && this.cancel(new v.AbortException("Streaming is disabled."));
          }).catch(this._headersCapability.reject), this.onProgress = null;
        }
        get headersReady() {
          return this._headersCapability.promise;
        }
        get filename() {
          return this._filename;
        }
        get contentLength() {
          return this._contentLength;
        }
        get isRangeSupported() {
          return this._isRangeSupported;
        }
        get isStreamingSupported() {
          return this._isStreamingSupported;
        }
        async read() {
          await this._headersCapability.promise;
          const {
            value: c,
            done: l
          } = await this._reader.read();
          return l ? {
            value: c,
            done: l
          } : (this._loaded += c.byteLength, this.onProgress?.({
            loaded: this._loaded,
            total: this._contentLength
          }), {
            value: P(c),
            done: !1
          });
        }
        cancel(c) {
          this._reader?.cancel(c), this._abortController.abort();
        }
      }
      class y {
        constructor(c, l, b) {
          this._stream = c, this._reader = null, this._loaded = 0;
          const s = c.source;
          this._withCredentials = s.withCredentials || !1, this._readCapability = Promise.withResolvers(), this._isStreamingSupported = !s.disableStream, this._abortController = new AbortController(), this._headers = G(this._stream.httpHeaders), this._headers.append("Range", `bytes=${l}-${b - 1}`);
          const g = s.url;
          fetch(g, L(this._headers, this._withCredentials, this._abortController)).then((t) => {
            if (!(0, H.validateResponseStatus)(t.status))
              throw (0, H.createResponseStatusError)(t.status, g);
            this._readCapability.resolve(), this._reader = t.body.getReader();
          }).catch(this._readCapability.reject), this.onProgress = null;
        }
        get isStreamingSupported() {
          return this._isStreamingSupported;
        }
        async read() {
          await this._readCapability.promise;
          const {
            value: c,
            done: l
          } = await this._reader.read();
          return l ? {
            value: c,
            done: l
          } : (this._loaded += c.byteLength, this.onProgress?.({
            loaded: this._loaded
          }), {
            value: P(c),
            done: !1
          });
        }
        cancel(c) {
          this._reader?.cancel(c), this._abortController.abort();
        }
      }
    }
  ),
  /***/
  10: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        FontFaceObject: () => (
          /* binding */
          L
        ),
        /* harmony export */
        FontLoader: () => (
          /* binding */
          H
        )
        /* harmony export */
      });
      var v = I(292);
      class H {
        #t = /* @__PURE__ */ new Set();
        constructor({
          ownerDocument: P = globalThis.document,
          styleElement: T = null
        }) {
          this._document = P, this.nativeFontFaces = /* @__PURE__ */ new Set(), this.styleElement = null, this.loadingRequests = [], this.loadTestFontId = 0;
        }
        addNativeFontFace(P) {
          this.nativeFontFaces.add(P), this._document.fonts.add(P);
        }
        removeNativeFontFace(P) {
          this.nativeFontFaces.delete(P), this._document.fonts.delete(P);
        }
        insertRule(P) {
          this.styleElement || (this.styleElement = this._document.createElement("style"), this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement));
          const T = this.styleElement.sheet;
          T.insertRule(P, T.cssRules.length);
        }
        clear() {
          for (const P of this.nativeFontFaces)
            this._document.fonts.delete(P);
          this.nativeFontFaces.clear(), this.#t.clear(), this.styleElement && (this.styleElement.remove(), this.styleElement = null);
        }
        async loadSystemFont({
          systemFontInfo: P,
          _inspectFont: T
        }) {
          if (!(!P || this.#t.has(P.loadedName))) {
            if ((0, v.assert)(!this.disableFontFace, "loadSystemFont shouldn't be called when `disableFontFace` is set."), this.isFontLoadingAPISupported) {
              const {
                loadedName: E,
                src: y,
                style: r
              } = P, c = new FontFace(E, y, r);
              this.addNativeFontFace(c);
              try {
                await c.load(), this.#t.add(E), T?.(P);
              } catch {
                (0, v.warn)(`Cannot load system font: ${P.baseFontName}, installing it could help to improve PDF rendering.`), this.removeNativeFontFace(c);
              }
              return;
            }
            (0, v.unreachable)("Not implemented: loadSystemFont without the Font Loading API.");
          }
        }
        async bind(P) {
          if (P.attached || P.missingFile && !P.systemFontInfo)
            return;
          if (P.attached = !0, P.systemFontInfo) {
            await this.loadSystemFont(P);
            return;
          }
          if (this.isFontLoadingAPISupported) {
            const E = P.createNativeFontFace();
            if (E) {
              this.addNativeFontFace(E);
              try {
                await E.loaded;
              } catch (y) {
                throw (0, v.warn)(`Failed to load font '${E.family}': '${y}'.`), P.disableFontFace = !0, y;
              }
            }
            return;
          }
          const T = P.createFontFaceRule();
          if (T) {
            if (this.insertRule(T), this.isSyncFontLoadingSupported)
              return;
            await new Promise((E) => {
              const y = this._queueLoadingCallback(E);
              this._prepareFontLoadEvent(P, y);
            });
          }
        }
        get isFontLoadingAPISupported() {
          const P = !!this._document?.fonts;
          return (0, v.shadow)(this, "isFontLoadingAPISupported", P);
        }
        get isSyncFontLoadingSupported() {
          let P = !1;
          return (v.isNodeJS || typeof navigator < "u" && typeof navigator?.userAgent == "string" && /Mozilla\/5.0.*?rv:\d+.*? Gecko/.test(navigator.userAgent)) && (P = !0), (0, v.shadow)(this, "isSyncFontLoadingSupported", P);
        }
        _queueLoadingCallback(P) {
          function T() {
            for ((0, v.assert)(!y.done, "completeRequest() cannot be called twice."), y.done = !0; E.length > 0 && E[0].done; ) {
              const r = E.shift();
              setTimeout(r.callback, 0);
            }
          }
          const {
            loadingRequests: E
          } = this, y = {
            done: !1,
            complete: T,
            callback: P
          };
          return E.push(y), y;
        }
        get _loadTestFont() {
          const P = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
          return (0, v.shadow)(this, "_loadTestFont", P);
        }
        _prepareFontLoadEvent(P, T) {
          function E(B, U) {
            return B.charCodeAt(U) << 24 | B.charCodeAt(U + 1) << 16 | B.charCodeAt(U + 2) << 8 | B.charCodeAt(U + 3) & 255;
          }
          function y(B, U, K, rt) {
            const W = B.substring(0, U), z = B.substring(U + K);
            return W + rt + z;
          }
          let r, c;
          const l = this._document.createElement("canvas");
          l.width = 1, l.height = 1;
          const b = l.getContext("2d");
          let s = 0;
          function g(B, U) {
            if (++s > 30) {
              (0, v.warn)("Load test font never loaded."), U();
              return;
            }
            if (b.font = "30px " + B, b.fillText(".", 0, 20), b.getImageData(0, 0, 1, 1).data[3] > 0) {
              U();
              return;
            }
            setTimeout(g.bind(null, B, U));
          }
          const t = `lt${Date.now()}${this.loadTestFontId++}`;
          let i = this._loadTestFont;
          i = y(i, 976, t.length, t);
          const p = 16, w = 1482184792;
          let S = E(i, p);
          for (r = 0, c = t.length - 3; r < c; r += 4)
            S = S - w + E(t, r) | 0;
          r < t.length && (S = S - w + E(t + "XXX", r) | 0), i = y(i, p, 4, (0, v.string32)(S));
          const M = `url(data:font/opentype;base64,${btoa(i)});`, _ = `@font-face {font-family:"${t}";src:${M}}`;
          this.insertRule(_);
          const O = this._document.createElement("div");
          O.style.visibility = "hidden", O.style.width = O.style.height = "10px", O.style.position = "absolute", O.style.top = O.style.left = "0px";
          for (const B of [P.loadedName, t]) {
            const U = this._document.createElement("span");
            U.textContent = "Hi", U.style.fontFamily = B, O.append(U);
          }
          this._document.body.append(O), g(t, () => {
            O.remove(), T.complete();
          });
        }
      }
      class L {
        constructor(P, {
          disableFontFace: T = !1,
          ignoreErrors: E = !1,
          inspectFont: y = null
        }) {
          this.compiledGlyphs = /* @__PURE__ */ Object.create(null);
          for (const r in P)
            this[r] = P[r];
          this.disableFontFace = T === !0, this.ignoreErrors = E === !0, this._inspectFont = y;
        }
        createNativeFontFace() {
          if (!this.data || this.disableFontFace)
            return null;
          let P;
          if (!this.cssFontInfo)
            P = new FontFace(this.loadedName, this.data, {});
          else {
            const T = {
              weight: this.cssFontInfo.fontWeight
            };
            this.cssFontInfo.italicAngle && (T.style = `oblique ${this.cssFontInfo.italicAngle}deg`), P = new FontFace(this.cssFontInfo.fontFamily, this.data, T);
          }
          return this._inspectFont?.(this), P;
        }
        createFontFaceRule() {
          if (!this.data || this.disableFontFace)
            return null;
          const P = (0, v.bytesToString)(this.data), T = `url(data:${this.mimetype};base64,${btoa(P)});`;
          let E;
          if (!this.cssFontInfo)
            E = `@font-face {font-family:"${this.loadedName}";src:${T}}`;
          else {
            let y = `font-weight: ${this.cssFontInfo.fontWeight};`;
            this.cssFontInfo.italicAngle && (y += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`), E = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${y}src:${T}}`;
          }
          return this._inspectFont?.(this, T), E;
        }
        getPathGenerator(P, T) {
          if (this.compiledGlyphs[T] !== void 0)
            return this.compiledGlyphs[T];
          let E;
          try {
            E = P.get(this.loadedName + "_path_" + T);
          } catch (r) {
            if (!this.ignoreErrors)
              throw r;
            (0, v.warn)(`getPathGenerator - ignoring character: "${r}".`);
          }
          if (!Array.isArray(E) || E.length === 0)
            return this.compiledGlyphs[T] = function(r, c) {
            };
          const y = [];
          for (let r = 0, c = E.length; r < c; )
            switch (E[r++]) {
              case v.FontRenderOps.BEZIER_CURVE_TO:
                {
                  const [l, b, s, g, t, i] = E.slice(r, r + 6);
                  y.push((u) => u.bezierCurveTo(l, b, s, g, t, i)), r += 6;
                }
                break;
              case v.FontRenderOps.MOVE_TO:
                {
                  const [l, b] = E.slice(r, r + 2);
                  y.push((s) => s.moveTo(l, b)), r += 2;
                }
                break;
              case v.FontRenderOps.LINE_TO:
                {
                  const [l, b] = E.slice(r, r + 2);
                  y.push((s) => s.lineTo(l, b)), r += 2;
                }
                break;
              case v.FontRenderOps.QUADRATIC_CURVE_TO:
                {
                  const [l, b, s, g] = E.slice(r, r + 4);
                  y.push((t) => t.quadraticCurveTo(l, b, s, g)), r += 4;
                }
                break;
              case v.FontRenderOps.RESTORE:
                y.push((l) => l.restore());
                break;
              case v.FontRenderOps.SAVE:
                y.push((l) => l.save());
                break;
              case v.FontRenderOps.SCALE:
                (0, v.assert)(y.length === 2, "Scale command is only valid at the third position.");
                break;
              case v.FontRenderOps.TRANSFORM:
                {
                  const [l, b, s, g, t, i] = E.slice(r, r + 6);
                  y.push((u) => u.transform(l, b, s, g, t, i)), r += 6;
                }
                break;
              case v.FontRenderOps.TRANSLATE:
                {
                  const [l, b] = E.slice(r, r + 2);
                  y.push((s) => s.translate(l, b)), r += 2;
                }
                break;
            }
          return this.compiledGlyphs[T] = function(c, l) {
            y[0](c), y[1](c), c.scale(l, -l);
            for (let b = 2, s = y.length; b < s; b++)
              y[b](c);
          };
        }
      }
    }
  ),
  /***/
  62: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        Metadata: () => (
          /* binding */
          H
        )
        /* harmony export */
      });
      var v = I(292);
      class H {
        #t;
        #e;
        constructor({
          parsedData: G,
          rawData: P
        }) {
          this.#t = G, this.#e = P;
        }
        getRaw() {
          return this.#e;
        }
        get(G) {
          return this.#t.get(G) ?? null;
        }
        getAll() {
          return (0, v.objectFromMap)(this.#t);
        }
        has(G) {
          return this.#t.has(G);
        }
      }
    }
  ),
  /***/
  457: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        PDFNetworkStream: () => (
          /* binding */
          E
        )
        /* harmony export */
      });
      var v = I(292), H = I(490);
      const L = 200, G = 206;
      function P(c) {
        const l = c.response;
        return typeof l != "string" ? l : (0, v.stringToBytes)(l).buffer;
      }
      class T {
        constructor(l, b = {}) {
          this.url = l, this.isHttp = /^https?:/i.test(l), this.httpHeaders = this.isHttp && b.httpHeaders || /* @__PURE__ */ Object.create(null), this.withCredentials = b.withCredentials || !1, this.currXhrId = 0, this.pendingRequests = /* @__PURE__ */ Object.create(null);
        }
        requestRange(l, b, s) {
          const g = {
            begin: l,
            end: b
          };
          for (const t in s)
            g[t] = s[t];
          return this.request(g);
        }
        requestFull(l) {
          return this.request(l);
        }
        request(l) {
          const b = new XMLHttpRequest(), s = this.currXhrId++, g = this.pendingRequests[s] = {
            xhr: b
          };
          b.open("GET", this.url), b.withCredentials = this.withCredentials;
          for (const t in this.httpHeaders) {
            const i = this.httpHeaders[t];
            i !== void 0 && b.setRequestHeader(t, i);
          }
          return this.isHttp && "begin" in l && "end" in l ? (b.setRequestHeader("Range", `bytes=${l.begin}-${l.end - 1}`), g.expectedStatus = G) : g.expectedStatus = L, b.responseType = "arraybuffer", l.onError && (b.onerror = function(t) {
            l.onError(b.status);
          }), b.onreadystatechange = this.onStateChange.bind(this, s), b.onprogress = this.onProgress.bind(this, s), g.onHeadersReceived = l.onHeadersReceived, g.onDone = l.onDone, g.onError = l.onError, g.onProgress = l.onProgress, b.send(null), s;
        }
        onProgress(l, b) {
          const s = this.pendingRequests[l];
          s && s.onProgress?.(b);
        }
        onStateChange(l, b) {
          const s = this.pendingRequests[l];
          if (!s)
            return;
          const g = s.xhr;
          if (g.readyState >= 2 && s.onHeadersReceived && (s.onHeadersReceived(), delete s.onHeadersReceived), g.readyState !== 4 || !(l in this.pendingRequests))
            return;
          if (delete this.pendingRequests[l], g.status === 0 && this.isHttp) {
            s.onError?.(g.status);
            return;
          }
          const t = g.status || L;
          if (!(t === L && s.expectedStatus === G) && t !== s.expectedStatus) {
            s.onError?.(g.status);
            return;
          }
          const u = P(g);
          if (t === G) {
            const p = g.getResponseHeader("Content-Range"), w = /bytes (\d+)-(\d+)\/(\d+)/.exec(p);
            s.onDone({
              begin: parseInt(w[1], 10),
              chunk: u
            });
          } else u ? s.onDone({
            begin: 0,
            chunk: u
          }) : s.onError?.(g.status);
        }
        getRequestXhr(l) {
          return this.pendingRequests[l].xhr;
        }
        isPendingRequest(l) {
          return l in this.pendingRequests;
        }
        abortRequest(l) {
          const b = this.pendingRequests[l].xhr;
          delete this.pendingRequests[l], b.abort();
        }
      }
      class E {
        constructor(l) {
          this._source = l, this._manager = new T(l.url, {
            httpHeaders: l.httpHeaders,
            withCredentials: l.withCredentials
          }), this._rangeChunkSize = l.rangeChunkSize, this._fullRequestReader = null, this._rangeRequestReaders = [];
        }
        _onRangeRequestReaderClosed(l) {
          const b = this._rangeRequestReaders.indexOf(l);
          b >= 0 && this._rangeRequestReaders.splice(b, 1);
        }
        getFullReader() {
          return (0, v.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once."), this._fullRequestReader = new y(this._manager, this._source), this._fullRequestReader;
        }
        getRangeReader(l, b) {
          const s = new r(this._manager, l, b);
          return s.onClosed = this._onRangeRequestReaderClosed.bind(this), this._rangeRequestReaders.push(s), s;
        }
        cancelAllRequests(l) {
          this._fullRequestReader?.cancel(l);
          for (const b of this._rangeRequestReaders.slice(0))
            b.cancel(l);
        }
      }
      class y {
        constructor(l, b) {
          this._manager = l;
          const s = {
            onHeadersReceived: this._onHeadersReceived.bind(this),
            onDone: this._onDone.bind(this),
            onError: this._onError.bind(this),
            onProgress: this._onProgress.bind(this)
          };
          this._url = b.url, this._fullRequestId = l.requestFull(s), this._headersReceivedCapability = Promise.withResolvers(), this._disableRange = b.disableRange || !1, this._contentLength = b.length, this._rangeChunkSize = b.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !1, this._isRangeSupported = !1, this._cachedChunks = [], this._requests = [], this._done = !1, this._storedError = void 0, this._filename = null, this.onProgress = null;
        }
        _onHeadersReceived() {
          const l = this._fullRequestId, b = this._manager.getRequestXhr(l), s = (i) => b.getResponseHeader(i), {
            allowRangeRequests: g,
            suggestedLength: t
          } = (0, H.validateRangeRequestCapabilities)({
            getResponseHeader: s,
            isHttp: this._manager.isHttp,
            rangeChunkSize: this._rangeChunkSize,
            disableRange: this._disableRange
          });
          g && (this._isRangeSupported = !0), this._contentLength = t || this._contentLength, this._filename = (0, H.extractFilenameFromHeader)(s), this._isRangeSupported && this._manager.abortRequest(l), this._headersReceivedCapability.resolve();
        }
        _onDone(l) {
          if (l && (this._requests.length > 0 ? this._requests.shift().resolve({
            value: l.chunk,
            done: !1
          }) : this._cachedChunks.push(l.chunk)), this._done = !0, !(this._cachedChunks.length > 0)) {
            for (const b of this._requests)
              b.resolve({
                value: void 0,
                done: !0
              });
            this._requests.length = 0;
          }
        }
        _onError(l) {
          this._storedError = (0, H.createResponseStatusError)(l, this._url), this._headersReceivedCapability.reject(this._storedError);
          for (const b of this._requests)
            b.reject(this._storedError);
          this._requests.length = 0, this._cachedChunks.length = 0;
        }
        _onProgress(l) {
          this.onProgress?.({
            loaded: l.loaded,
            total: l.lengthComputable ? l.total : this._contentLength
          });
        }
        get filename() {
          return this._filename;
        }
        get isRangeSupported() {
          return this._isRangeSupported;
        }
        get isStreamingSupported() {
          return this._isStreamingSupported;
        }
        get contentLength() {
          return this._contentLength;
        }
        get headersReady() {
          return this._headersReceivedCapability.promise;
        }
        async read() {
          if (this._storedError)
            throw this._storedError;
          if (this._cachedChunks.length > 0)
            return {
              value: this._cachedChunks.shift(),
              done: !1
            };
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const l = Promise.withResolvers();
          return this._requests.push(l), l.promise;
        }
        cancel(l) {
          this._done = !0, this._headersReceivedCapability.reject(l);
          for (const b of this._requests)
            b.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._manager.isPendingRequest(this._fullRequestId) && this._manager.abortRequest(this._fullRequestId), this._fullRequestReader = null;
        }
      }
      class r {
        constructor(l, b, s) {
          this._manager = l;
          const g = {
            onDone: this._onDone.bind(this),
            onError: this._onError.bind(this),
            onProgress: this._onProgress.bind(this)
          };
          this._url = l.url, this._requestId = l.requestRange(b, s, g), this._requests = [], this._queuedChunk = null, this._done = !1, this._storedError = void 0, this.onProgress = null, this.onClosed = null;
        }
        _close() {
          this.onClosed?.(this);
        }
        _onDone(l) {
          const b = l.chunk;
          this._requests.length > 0 ? this._requests.shift().resolve({
            value: b,
            done: !1
          }) : this._queuedChunk = b, this._done = !0;
          for (const s of this._requests)
            s.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._close();
        }
        _onError(l) {
          this._storedError = (0, H.createResponseStatusError)(l, this._url);
          for (const b of this._requests)
            b.reject(this._storedError);
          this._requests.length = 0, this._queuedChunk = null;
        }
        _onProgress(l) {
          this.isStreamingSupported || this.onProgress?.({
            loaded: l.loaded
          });
        }
        get isStreamingSupported() {
          return !1;
        }
        async read() {
          if (this._storedError)
            throw this._storedError;
          if (this._queuedChunk !== null) {
            const b = this._queuedChunk;
            return this._queuedChunk = null, {
              value: b,
              done: !1
            };
          }
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const l = Promise.withResolvers();
          return this._requests.push(l), l.promise;
        }
        cancel(l) {
          this._done = !0;
          for (const b of this._requests)
            b.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._manager.isPendingRequest(this._requestId) && this._manager.abortRequest(this._requestId), this._close();
        }
      }
    }
  ),
  /***/
  490: (
    /***/
    (Y, $, I) => {
      I.d($, {
        createResponseStatusError: () => (
          /* binding */
          T
        ),
        extractFilenameFromHeader: () => (
          /* binding */
          P
        ),
        validateRangeRequestCapabilities: () => (
          /* binding */
          G
        ),
        validateResponseStatus: () => (
          /* binding */
          E
        )
      });
      var v = I(292);
      function H(y) {
        let r = !0, c = l("filename\\*", "i").exec(y);
        if (c) {
          c = c[1];
          let p = t(c);
          return p = unescape(p), p = i(p), p = u(p), s(p);
        }
        if (c = g(y), c) {
          const p = u(c);
          return s(p);
        }
        if (c = l("filename", "i").exec(y), c) {
          c = c[1];
          let p = t(c);
          return p = u(p), s(p);
        }
        function l(p, w) {
          return new RegExp("(?:^|;)\\s*" + p + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', w);
        }
        function b(p, w) {
          if (p) {
            if (!/^[\x00-\xFF]+$/.test(w))
              return w;
            try {
              const S = new TextDecoder(p, {
                fatal: !0
              }), M = (0, v.stringToBytes)(w);
              w = S.decode(M), r = !1;
            } catch {
            }
          }
          return w;
        }
        function s(p) {
          return r && /[\x80-\xff]/.test(p) && (p = b("utf-8", p), r && (p = b("iso-8859-1", p))), p;
        }
        function g(p) {
          const w = [];
          let S;
          const M = l("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
          for (; (S = M.exec(p)) !== null; ) {
            let [, O, B, U] = S;
            if (O = parseInt(O, 10), O in w) {
              if (O === 0)
                break;
              continue;
            }
            w[O] = [B, U];
          }
          const _ = [];
          for (let O = 0; O < w.length && O in w; ++O) {
            let [B, U] = w[O];
            U = t(U), B && (U = unescape(U), O === 0 && (U = i(U))), _.push(U);
          }
          return _.join("");
        }
        function t(p) {
          if (p.startsWith('"')) {
            const w = p.slice(1).split('\\"');
            for (let S = 0; S < w.length; ++S) {
              const M = w[S].indexOf('"');
              M !== -1 && (w[S] = w[S].slice(0, M), w.length = S + 1), w[S] = w[S].replaceAll(/\\(.)/g, "$1");
            }
            p = w.join('"');
          }
          return p;
        }
        function i(p) {
          const w = p.indexOf("'");
          if (w === -1)
            return p;
          const S = p.slice(0, w), _ = p.slice(w + 1).replace(/^[^']*'/, "");
          return b(S, _);
        }
        function u(p) {
          return !p.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(p) ? p : p.replaceAll(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(w, S, M, _) {
            if (M === "q" || M === "Q")
              return _ = _.replaceAll("_", " "), _ = _.replaceAll(/=([0-9a-fA-F]{2})/g, function(O, B) {
                return String.fromCharCode(parseInt(B, 16));
              }), b(S, _);
            try {
              _ = atob(_);
            } catch {
            }
            return b(S, _);
          });
        }
        return "";
      }
      var L = I(419);
      function G({
        getResponseHeader: y,
        isHttp: r,
        rangeChunkSize: c,
        disableRange: l
      }) {
        const b = {
          allowRangeRequests: !1,
          suggestedLength: void 0
        }, s = parseInt(y("Content-Length"), 10);
        return !Number.isInteger(s) || (b.suggestedLength = s, s <= 2 * c) || l || !r || y("Accept-Ranges") !== "bytes" || (y("Content-Encoding") || "identity") !== "identity" || (b.allowRangeRequests = !0), b;
      }
      function P(y) {
        const r = y("Content-Disposition");
        if (r) {
          let c = H(r);
          if (c.includes("%"))
            try {
              c = decodeURIComponent(c);
            } catch {
            }
          if ((0, L.isPdfFile)(c))
            return c;
        }
        return null;
      }
      function T(y, r) {
        return y === 404 || y === 0 && r.startsWith("file:") ? new v.MissingPDFException('Missing PDF "' + r + '".') : new v.UnexpectedResponseException(`Unexpected server response (${y}) while retrieving PDF "${r}".`, y);
      }
      function E(y) {
        return y === 200 || y === 206;
      }
    }
  ),
  /***/
  786: (
    /***/
    (Y, $, I) => {
      I.a(Y, async (v, H) => {
        try {
          let c = function(w) {
            const S = y.parse(w);
            return S.protocol === "file:" || S.host ? S : /^[a-z]:[/\\]/i.test(w) ? y.parse(`file:///${w}`) : (S.host || (S.protocol = "file:"), S);
          }, g = function(w, S) {
            return {
              protocol: w.protocol,
              auth: w.auth,
              host: w.hostname,
              port: w.port,
              path: w.path,
              method: "GET",
              headers: S
            };
          };
          I.d($, {
            /* harmony export */
            PDFNodeStream: () => (
              /* binding */
              l
            )
            /* harmony export */
          });
          var L = I(292), G = I(490);
          let P, T, E, y;
          L.isNodeJS && (P = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), T = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), E = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), y = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ));
          const r = /^file:\/\/\/[a-zA-Z]:\//;
          class l {
            constructor(S) {
              this.source = S, this.url = c(S.url), this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:", this.isFsUrl = this.url.protocol === "file:", this.httpHeaders = this.isHttp && S.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
            }
            get _progressiveDataLength() {
              return this._fullRequestReader?._loaded ?? 0;
            }
            getFullReader() {
              return (0, L.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once."), this._fullRequestReader = this.isFsUrl ? new u(this) : new t(this), this._fullRequestReader;
            }
            getRangeReader(S, M) {
              if (M <= this._progressiveDataLength)
                return null;
              const _ = this.isFsUrl ? new p(this, S, M) : new i(this, S, M);
              return this._rangeRequestReaders.push(_), _;
            }
            cancelAllRequests(S) {
              this._fullRequestReader?.cancel(S);
              for (const M of this._rangeRequestReaders.slice(0))
                M.cancel(S);
            }
          }
          class b {
            constructor(S) {
              this._url = S.url, this._done = !1, this._storedError = null, this.onProgress = null;
              const M = S.source;
              this._contentLength = M.length, this._loaded = 0, this._filename = null, this._disableRange = M.disableRange || !1, this._rangeChunkSize = M.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !M.disableStream, this._isRangeSupported = !M.disableRange, this._readableStream = null, this._readCapability = Promise.withResolvers(), this._headersCapability = Promise.withResolvers();
            }
            get headersReady() {
              return this._headersCapability.promise;
            }
            get filename() {
              return this._filename;
            }
            get contentLength() {
              return this._contentLength;
            }
            get isRangeSupported() {
              return this._isRangeSupported;
            }
            get isStreamingSupported() {
              return this._isStreamingSupported;
            }
            async read() {
              if (await this._readCapability.promise, this._done)
                return {
                  value: void 0,
                  done: !0
                };
              if (this._storedError)
                throw this._storedError;
              const S = this._readableStream.read();
              return S === null ? (this._readCapability = Promise.withResolvers(), this.read()) : (this._loaded += S.length, this.onProgress?.({
                loaded: this._loaded,
                total: this._contentLength
              }), {
                value: new Uint8Array(S).buffer,
                done: !1
              });
            }
            cancel(S) {
              if (!this._readableStream) {
                this._error(S);
                return;
              }
              this._readableStream.destroy(S);
            }
            _error(S) {
              this._storedError = S, this._readCapability.resolve();
            }
            _setReadableStream(S) {
              this._readableStream = S, S.on("readable", () => {
                this._readCapability.resolve();
              }), S.on("end", () => {
                S.destroy(), this._done = !0, this._readCapability.resolve();
              }), S.on("error", (M) => {
                this._error(M);
              }), !this._isStreamingSupported && this._isRangeSupported && this._error(new L.AbortException("streaming is disabled")), this._storedError && this._readableStream.destroy(this._storedError);
            }
          }
          class s {
            constructor(S) {
              this._url = S.url, this._done = !1, this._storedError = null, this.onProgress = null, this._loaded = 0, this._readableStream = null, this._readCapability = Promise.withResolvers();
              const M = S.source;
              this._isStreamingSupported = !M.disableStream;
            }
            get isStreamingSupported() {
              return this._isStreamingSupported;
            }
            async read() {
              if (await this._readCapability.promise, this._done)
                return {
                  value: void 0,
                  done: !0
                };
              if (this._storedError)
                throw this._storedError;
              const S = this._readableStream.read();
              return S === null ? (this._readCapability = Promise.withResolvers(), this.read()) : (this._loaded += S.length, this.onProgress?.({
                loaded: this._loaded
              }), {
                value: new Uint8Array(S).buffer,
                done: !1
              });
            }
            cancel(S) {
              if (!this._readableStream) {
                this._error(S);
                return;
              }
              this._readableStream.destroy(S);
            }
            _error(S) {
              this._storedError = S, this._readCapability.resolve();
            }
            _setReadableStream(S) {
              this._readableStream = S, S.on("readable", () => {
                this._readCapability.resolve();
              }), S.on("end", () => {
                S.destroy(), this._done = !0, this._readCapability.resolve();
              }), S.on("error", (M) => {
                this._error(M);
              }), this._storedError && this._readableStream.destroy(this._storedError);
            }
          }
          class t extends b {
            constructor(S) {
              super(S);
              const M = (_) => {
                if (_.statusCode === 404) {
                  const K = new L.MissingPDFException(`Missing PDF "${this._url}".`);
                  this._storedError = K, this._headersCapability.reject(K);
                  return;
                }
                this._headersCapability.resolve(), this._setReadableStream(_);
                const O = (K) => this._readableStream.headers[K.toLowerCase()], {
                  allowRangeRequests: B,
                  suggestedLength: U
                } = (0, G.validateRangeRequestCapabilities)({
                  getResponseHeader: O,
                  isHttp: S.isHttp,
                  rangeChunkSize: this._rangeChunkSize,
                  disableRange: this._disableRange
                });
                this._isRangeSupported = B, this._contentLength = U || this._contentLength, this._filename = (0, G.extractFilenameFromHeader)(O);
              };
              this._request = null, this._url.protocol === "http:" ? this._request = T.request(g(this._url, S.httpHeaders), M) : this._request = E.request(g(this._url, S.httpHeaders), M), this._request.on("error", (_) => {
                this._storedError = _, this._headersCapability.reject(_);
              }), this._request.end();
            }
          }
          class i extends s {
            constructor(S, M, _) {
              super(S), this._httpHeaders = {};
              for (const B in S.httpHeaders) {
                const U = S.httpHeaders[B];
                U !== void 0 && (this._httpHeaders[B] = U);
              }
              this._httpHeaders.Range = `bytes=${M}-${_ - 1}`;
              const O = (B) => {
                if (B.statusCode === 404) {
                  const U = new L.MissingPDFException(`Missing PDF "${this._url}".`);
                  this._storedError = U;
                  return;
                }
                this._setReadableStream(B);
              };
              this._request = null, this._url.protocol === "http:" ? this._request = T.request(g(this._url, this._httpHeaders), O) : this._request = E.request(g(this._url, this._httpHeaders), O), this._request.on("error", (B) => {
                this._storedError = B;
              }), this._request.end();
            }
          }
          class u extends b {
            constructor(S) {
              super(S);
              let M = decodeURIComponent(this._url.path);
              r.test(this._url.href) && (M = M.replace(/^\//, "")), P.promises.lstat(M).then((_) => {
                this._contentLength = _.size, this._setReadableStream(P.createReadStream(M)), this._headersCapability.resolve();
              }, (_) => {
                _.code === "ENOENT" && (_ = new L.MissingPDFException(`Missing PDF "${M}".`)), this._storedError = _, this._headersCapability.reject(_);
              });
            }
          }
          class p extends s {
            constructor(S, M, _) {
              super(S);
              let O = decodeURIComponent(this._url.path);
              r.test(this._url.href) && (O = O.replace(/^\//, "")), this._setReadableStream(P.createReadStream(O, {
                start: M,
                end: _ - 1
              }));
            }
          }
          H();
        } catch (P) {
          H(P);
        }
      }, 1);
    }
  ),
  /***/
  573: (
    /***/
    (Y, $, I) => {
      I.a(Y, async (v, H) => {
        try {
          I.d($, {
            /* harmony export */
            NodeCMapReaderFactory: () => (
              /* binding */
              l
            ),
            /* harmony export */
            NodeCanvasFactory: () => (
              /* binding */
              c
            ),
            /* harmony export */
            NodeFilterFactory: () => (
              /* binding */
              r
            ),
            /* harmony export */
            NodeStandardFontDataFactory: () => (
              /* binding */
              b
            )
            /* harmony export */
          });
          var L = I(583), G = I(292);
          let P, T, E;
          if (G.isNodeJS) {
            P = await import(
              /*webpackIgnore: true*/
              "./__vite-browser-external-DYxpcVy9.js"
            );
            try {
              T = await import(
                /*webpackIgnore: true*/
                "./__vite-browser-external-DYxpcVy9.js"
              );
            } catch {
            }
            try {
              E = await import(
                /*webpackIgnore: true*/
                "./index-Dwr47WtL.js"
              );
            } catch {
            }
          }
          const y = function(s) {
            return P.promises.readFile(s).then((g) => new Uint8Array(g));
          };
          class r extends L.BaseFilterFactory {
          }
          class c extends L.BaseCanvasFactory {
            _createCanvas(g, t) {
              return T.createCanvas(g, t);
            }
          }
          class l extends L.BaseCMapReaderFactory {
            _fetchData(g, t) {
              return y(g).then((i) => ({
                cMapData: i,
                compressionType: t
              }));
            }
          }
          class b extends L.BaseStandardFontDataFactory {
            _fetchData(g) {
              return y(g);
            }
          }
          H();
        } catch (P) {
          H(P);
        }
      }, 1);
    }
  ),
  /***/
  626: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        OptionalContentConfig: () => (
          /* binding */
          P
        )
        /* harmony export */
      });
      var v = I(292), H = I(651);
      const L = Symbol("INTERNAL");
      class G {
        #t = !1;
        #e = !1;
        #s = !1;
        #n = !0;
        constructor(E, {
          name: y,
          intent: r,
          usage: c
        }) {
          this.#t = !!(E & v.RenderingIntentFlag.DISPLAY), this.#e = !!(E & v.RenderingIntentFlag.PRINT), this.name = y, this.intent = r, this.usage = c;
        }
        get visible() {
          if (this.#s)
            return this.#n;
          if (!this.#n)
            return !1;
          const {
            print: E,
            view: y
          } = this.usage;
          return this.#t ? y?.viewState !== "OFF" : this.#e ? E?.printState !== "OFF" : !0;
        }
        _setVisible(E, y, r = !1) {
          E !== L && (0, v.unreachable)("Internal method `_setVisible` called."), this.#s = r, this.#n = y;
        }
      }
      class P {
        #t = null;
        #e = /* @__PURE__ */ new Map();
        #s = null;
        #n = null;
        constructor(E, y = v.RenderingIntentFlag.DISPLAY) {
          if (this.renderingIntent = y, this.name = null, this.creator = null, E !== null) {
            this.name = E.name, this.creator = E.creator, this.#n = E.order;
            for (const r of E.groups)
              this.#e.set(r.id, new G(y, r));
            if (E.baseState === "OFF")
              for (const r of this.#e.values())
                r._setVisible(L, !1);
            for (const r of E.on)
              this.#e.get(r)._setVisible(L, !0);
            for (const r of E.off)
              this.#e.get(r)._setVisible(L, !1);
            this.#s = this.getHash();
          }
        }
        #r(E) {
          const y = E.length;
          if (y < 2)
            return !0;
          const r = E[0];
          for (let c = 1; c < y; c++) {
            const l = E[c];
            let b;
            if (Array.isArray(l))
              b = this.#r(l);
            else if (this.#e.has(l))
              b = this.#e.get(l).visible;
            else
              return (0, v.warn)(`Optional content group not found: ${l}`), !0;
            switch (r) {
              case "And":
                if (!b)
                  return !1;
                break;
              case "Or":
                if (b)
                  return !0;
                break;
              case "Not":
                return !b;
              default:
                return !0;
            }
          }
          return r === "And";
        }
        isVisible(E) {
          if (this.#e.size === 0)
            return !0;
          if (!E)
            return (0, v.info)("Optional content group not defined."), !0;
          if (E.type === "OCG")
            return this.#e.has(E.id) ? this.#e.get(E.id).visible : ((0, v.warn)(`Optional content group not found: ${E.id}`), !0);
          if (E.type === "OCMD") {
            if (E.expression)
              return this.#r(E.expression);
            if (!E.policy || E.policy === "AnyOn") {
              for (const y of E.ids) {
                if (!this.#e.has(y))
                  return (0, v.warn)(`Optional content group not found: ${y}`), !0;
                if (this.#e.get(y).visible)
                  return !0;
              }
              return !1;
            } else if (E.policy === "AllOn") {
              for (const y of E.ids) {
                if (!this.#e.has(y))
                  return (0, v.warn)(`Optional content group not found: ${y}`), !0;
                if (!this.#e.get(y).visible)
                  return !1;
              }
              return !0;
            } else if (E.policy === "AnyOff") {
              for (const y of E.ids) {
                if (!this.#e.has(y))
                  return (0, v.warn)(`Optional content group not found: ${y}`), !0;
                if (!this.#e.get(y).visible)
                  return !0;
              }
              return !1;
            } else if (E.policy === "AllOff") {
              for (const y of E.ids) {
                if (!this.#e.has(y))
                  return (0, v.warn)(`Optional content group not found: ${y}`), !0;
                if (this.#e.get(y).visible)
                  return !1;
              }
              return !0;
            }
            return (0, v.warn)(`Unknown optional content policy ${E.policy}.`), !0;
          }
          return (0, v.warn)(`Unknown group type ${E.type}.`), !0;
        }
        setVisibility(E, y = !0) {
          const r = this.#e.get(E);
          if (!r) {
            (0, v.warn)(`Optional content group not found: ${E}`);
            return;
          }
          r._setVisible(L, !!y, !0), this.#t = null;
        }
        setOCGState({
          state: E,
          preserveRB: y
        }) {
          let r;
          for (const c of E) {
            switch (c) {
              case "ON":
              case "OFF":
              case "Toggle":
                r = c;
                continue;
            }
            const l = this.#e.get(c);
            if (l)
              switch (r) {
                case "ON":
                  l._setVisible(L, !0);
                  break;
                case "OFF":
                  l._setVisible(L, !1);
                  break;
                case "Toggle":
                  l._setVisible(L, !l.visible);
                  break;
              }
          }
          this.#t = null;
        }
        get hasInitialVisibility() {
          return this.#s === null || this.getHash() === this.#s;
        }
        getOrder() {
          return this.#e.size ? this.#n ? this.#n.slice() : [...this.#e.keys()] : null;
        }
        getGroups() {
          return this.#e.size > 0 ? (0, v.objectFromMap)(this.#e) : null;
        }
        getGroup(E) {
          return this.#e.get(E) || null;
        }
        getHash() {
          if (this.#t !== null)
            return this.#t;
          const E = new H.MurmurHash3_64();
          for (const [y, r] of this.#e)
            E.update(`${y}:${r.visible}`);
          return this.#t = E.hexdigest();
        }
      }
    }
  ),
  /***/
  814: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        cleanupTextLayer: () => (
          /* binding */
          r
        ),
        /* harmony export */
        renderTextLayer: () => (
          /* binding */
          t
        ),
        /* harmony export */
        updateTextLayer: () => (
          /* binding */
          i
        )
        /* harmony export */
      });
      var v = I(292), H = I(419);
      const L = 1e5, G = 30, P = 0.8, T = /* @__PURE__ */ new Map();
      let E = null;
      function y() {
        if (!E) {
          const u = document.createElement("canvas");
          u.className = "hiddenCanvasElement", document.body.append(u), E = u.getContext("2d", {
            alpha: !1
          });
        }
        return E;
      }
      function r() {
        E?.canvas.remove(), E = null;
      }
      function c(u) {
        const p = T.get(u);
        if (p)
          return p;
        const w = y(), S = w.font;
        w.canvas.width = w.canvas.height = G, w.font = `${G}px ${u}`;
        const M = w.measureText("");
        let _ = M.fontBoundingBoxAscent, O = Math.abs(M.fontBoundingBoxDescent);
        if (_) {
          const U = _ / (_ + O);
          return T.set(u, U), w.canvas.width = w.canvas.height = 0, w.font = S, U;
        }
        w.strokeStyle = "red", w.clearRect(0, 0, G, G), w.strokeText("g", 0, 0);
        let B = w.getImageData(0, 0, G, G).data;
        O = 0;
        for (let U = B.length - 1 - 3; U >= 0; U -= 4)
          if (B[U] > 0) {
            O = Math.ceil(U / 4 / G);
            break;
          }
        w.clearRect(0, 0, G, G), w.strokeText("A", 0, G), B = w.getImageData(0, 0, G, G).data, _ = 0;
        for (let U = 0, K = B.length; U < K; U += 4)
          if (B[U] > 0) {
            _ = G - Math.floor(U / 4 / G);
            break;
          }
        if (w.canvas.width = w.canvas.height = 0, w.font = S, _) {
          const U = _ / (_ + O);
          return T.set(u, U), U;
        }
        return T.set(u, P), P;
      }
      function l(u, p, w) {
        const S = document.createElement("span"), M = {
          angle: 0,
          canvasWidth: 0,
          hasText: p.str !== "",
          hasEOL: p.hasEOL,
          fontSize: 0
        };
        u._textDivs.push(S);
        const _ = v.Util.transform(u._transform, p.transform);
        let O = Math.atan2(_[1], _[0]);
        const B = w[p.fontName];
        B.vertical && (O += Math.PI / 2);
        const U = u._fontInspectorEnabled && B.fontSubstitution || B.fontFamily, K = Math.hypot(_[2], _[3]), rt = K * c(U);
        let W, z;
        O === 0 ? (W = _[4], z = _[5] - rt) : (W = _[4] + rt * Math.sin(O), z = _[5] - rt * Math.cos(O));
        const V = "calc(var(--scale-factor)*", q = S.style;
        u._container === u._rootContainer ? (q.left = `${(100 * W / u._pageWidth).toFixed(2)}%`, q.top = `${(100 * z / u._pageHeight).toFixed(2)}%`) : (q.left = `${V}${W.toFixed(2)}px)`, q.top = `${V}${z.toFixed(2)}px)`), q.fontSize = `${V}${K.toFixed(2)}px)`, q.fontFamily = U, M.fontSize = K, S.setAttribute("role", "presentation"), S.textContent = p.str, S.dir = p.dir, u._fontInspectorEnabled && (S.dataset.fontName = B.fontSubstitutionLoadedName || p.fontName), O !== 0 && (M.angle = O * (180 / Math.PI));
        let st = !1;
        if (p.str.length > 1)
          st = !0;
        else if (p.str !== " " && p.transform[0] !== p.transform[3]) {
          const et = Math.abs(p.transform[0]), ot = Math.abs(p.transform[3]);
          et !== ot && Math.max(et, ot) / Math.min(et, ot) > 1.5 && (st = !0);
        }
        st && (M.canvasWidth = B.vertical ? p.height : p.width), u._textDivProperties.set(S, M), u._isReadableStream && u._layoutText(S);
      }
      function b(u) {
        const {
          div: p,
          scale: w,
          properties: S,
          ctx: M,
          prevFontSize: _,
          prevFontFamily: O
        } = u, {
          style: B
        } = p;
        let U = "";
        if (S.canvasWidth !== 0 && S.hasText) {
          const {
            fontFamily: K
          } = B, {
            canvasWidth: rt,
            fontSize: W
          } = S;
          (_ !== W || O !== K) && (M.font = `${W * w}px ${K}`, u.prevFontSize = W, u.prevFontFamily = K);
          const {
            width: z
          } = M.measureText(p.textContent);
          z > 0 && (U = `scaleX(${rt * w / z})`);
        }
        S.angle !== 0 && (U = `rotate(${S.angle}deg) ${U}`), U.length > 0 && (B.transform = U);
      }
      function s(u) {
        if (u._canceled)
          return;
        const p = u._textDivs, w = u._capability;
        if (p.length > L) {
          w.resolve();
          return;
        }
        if (!u._isReadableStream)
          for (const M of p)
            u._layoutText(M);
        w.resolve();
      }
      class g {
        constructor({
          textContentSource: p,
          container: w,
          viewport: S,
          textDivs: M,
          textDivProperties: _,
          textContentItemsStr: O
        }) {
          this._textContentSource = p, this._isReadableStream = p instanceof ReadableStream, this._container = this._rootContainer = w, this._textDivs = M || [], this._textContentItemsStr = O || [], this._fontInspectorEnabled = !!globalThis.FontInspector?.enabled, this._reader = null, this._textDivProperties = _ || /* @__PURE__ */ new WeakMap(), this._canceled = !1, this._capability = Promise.withResolvers(), this._layoutTextParams = {
            prevFontSize: null,
            prevFontFamily: null,
            div: null,
            scale: S.scale * (globalThis.devicePixelRatio || 1),
            properties: null,
            ctx: y()
          };
          const {
            pageWidth: B,
            pageHeight: U,
            pageX: K,
            pageY: rt
          } = S.rawDims;
          this._transform = [1, 0, 0, -1, -K, rt + U], this._pageWidth = B, this._pageHeight = U, (0, H.setLayerDimensions)(w, S), this._capability.promise.finally(() => {
            this._layoutTextParams = null;
          }).catch(() => {
          });
        }
        get promise() {
          return this._capability.promise;
        }
        cancel() {
          this._canceled = !0, this._reader && (this._reader.cancel(new v.AbortException("TextLayer task cancelled.")).catch(() => {
          }), this._reader = null), this._capability.reject(new v.AbortException("TextLayer task cancelled."));
        }
        _processItems(p, w) {
          for (const S of p) {
            if (S.str === void 0) {
              if (S.type === "beginMarkedContentProps" || S.type === "beginMarkedContent") {
                const M = this._container;
                this._container = document.createElement("span"), this._container.classList.add("markedContent"), S.id !== null && this._container.setAttribute("id", `${S.id}`), M.append(this._container);
              } else S.type === "endMarkedContent" && (this._container = this._container.parentNode);
              continue;
            }
            this._textContentItemsStr.push(S.str), l(this, S, w);
          }
        }
        _layoutText(p) {
          const w = this._layoutTextParams.properties = this._textDivProperties.get(p);
          if (this._layoutTextParams.div = p, b(this._layoutTextParams), w.hasText && this._container.append(p), w.hasEOL) {
            const S = document.createElement("br");
            S.setAttribute("role", "presentation"), this._container.append(S);
          }
        }
        _render() {
          const {
            promise: p,
            resolve: w,
            reject: S
          } = Promise.withResolvers();
          let M = /* @__PURE__ */ Object.create(null);
          if (this._isReadableStream) {
            const _ = () => {
              this._reader.read().then(({
                value: O,
                done: B
              }) => {
                if (B) {
                  w();
                  return;
                }
                Object.assign(M, O.styles), this._processItems(O.items, M), _();
              }, S);
            };
            this._reader = this._textContentSource.getReader(), _();
          } else if (this._textContentSource) {
            const {
              items: _,
              styles: O
            } = this._textContentSource;
            this._processItems(_, O), w();
          } else
            throw new Error('No "textContentSource" parameter specified.');
          p.then(() => {
            M = null, s(this);
          }, this._capability.reject);
        }
      }
      function t(u) {
        const p = new g(u);
        return p._render(), p;
      }
      function i({
        container: u,
        viewport: p,
        textDivs: w,
        textDivProperties: S,
        mustRotate: M = !0,
        mustRescale: _ = !0
      }) {
        if (M && (0, H.setLayerDimensions)(u, {
          rotation: p.rotation
        }), _) {
          const O = y(), U = {
            prevFontSize: null,
            prevFontFamily: null,
            div: null,
            scale: p.scale * (globalThis.devicePixelRatio || 1),
            properties: null,
            ctx: O
          };
          for (const K of w)
            U.properties = S.get(K), U.div = K, b(U);
        }
      }
    }
  ),
  /***/
  585: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        PDFDataTransportStream: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var v = I(292), H = I(419);
      class L {
        constructor(E, {
          disableRange: y = !1,
          disableStream: r = !1
        }) {
          (0, v.assert)(E, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
          const {
            length: c,
            initialData: l,
            progressiveDone: b,
            contentDispositionFilename: s
          } = E;
          if (this._queuedChunks = [], this._progressiveDone = b, this._contentDispositionFilename = s, l?.length > 0) {
            const g = l instanceof Uint8Array && l.byteLength === l.buffer.byteLength ? l.buffer : new Uint8Array(l).buffer;
            this._queuedChunks.push(g);
          }
          this._pdfDataRangeTransport = E, this._isStreamingSupported = !r, this._isRangeSupported = !y, this._contentLength = c, this._fullRequestReader = null, this._rangeReaders = [], E.addRangeListener((g, t) => {
            this._onReceiveData({
              begin: g,
              chunk: t
            });
          }), E.addProgressListener((g, t) => {
            this._onProgress({
              loaded: g,
              total: t
            });
          }), E.addProgressiveReadListener((g) => {
            this._onReceiveData({
              chunk: g
            });
          }), E.addProgressiveDoneListener(() => {
            this._onProgressiveDone();
          }), E.transportReady();
        }
        _onReceiveData({
          begin: E,
          chunk: y
        }) {
          const r = y instanceof Uint8Array && y.byteLength === y.buffer.byteLength ? y.buffer : new Uint8Array(y).buffer;
          if (E === void 0)
            this._fullRequestReader ? this._fullRequestReader._enqueue(r) : this._queuedChunks.push(r);
          else {
            const c = this._rangeReaders.some(function(l) {
              return l._begin !== E ? !1 : (l._enqueue(r), !0);
            });
            (0, v.assert)(c, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
          }
        }
        get _progressiveDataLength() {
          return this._fullRequestReader?._loaded ?? 0;
        }
        _onProgress(E) {
          E.total === void 0 ? this._rangeReaders[0]?.onProgress?.({
            loaded: E.loaded
          }) : this._fullRequestReader?.onProgress?.({
            loaded: E.loaded,
            total: E.total
          });
        }
        _onProgressiveDone() {
          this._fullRequestReader?.progressiveDone(), this._progressiveDone = !0;
        }
        _removeRangeReader(E) {
          const y = this._rangeReaders.indexOf(E);
          y >= 0 && this._rangeReaders.splice(y, 1);
        }
        getFullReader() {
          (0, v.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
          const E = this._queuedChunks;
          return this._queuedChunks = null, new G(this, E, this._progressiveDone, this._contentDispositionFilename);
        }
        getRangeReader(E, y) {
          if (y <= this._progressiveDataLength)
            return null;
          const r = new P(this, E, y);
          return this._pdfDataRangeTransport.requestDataRange(E, y), this._rangeReaders.push(r), r;
        }
        cancelAllRequests(E) {
          this._fullRequestReader?.cancel(E);
          for (const y of this._rangeReaders.slice(0))
            y.cancel(E);
          this._pdfDataRangeTransport.abort();
        }
      }
      class G {
        constructor(E, y, r = !1, c = null) {
          this._stream = E, this._done = r || !1, this._filename = (0, H.isPdfFile)(c) ? c : null, this._queuedChunks = y || [], this._loaded = 0;
          for (const l of this._queuedChunks)
            this._loaded += l.byteLength;
          this._requests = [], this._headersReady = Promise.resolve(), E._fullRequestReader = this, this.onProgress = null;
        }
        _enqueue(E) {
          this._done || (this._requests.length > 0 ? this._requests.shift().resolve({
            value: E,
            done: !1
          }) : this._queuedChunks.push(E), this._loaded += E.byteLength);
        }
        get headersReady() {
          return this._headersReady;
        }
        get filename() {
          return this._filename;
        }
        get isRangeSupported() {
          return this._stream._isRangeSupported;
        }
        get isStreamingSupported() {
          return this._stream._isStreamingSupported;
        }
        get contentLength() {
          return this._stream._contentLength;
        }
        async read() {
          if (this._queuedChunks.length > 0)
            return {
              value: this._queuedChunks.shift(),
              done: !1
            };
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const E = Promise.withResolvers();
          return this._requests.push(E), E.promise;
        }
        cancel(E) {
          this._done = !0;
          for (const y of this._requests)
            y.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0;
        }
        progressiveDone() {
          this._done || (this._done = !0);
        }
      }
      class P {
        constructor(E, y, r) {
          this._stream = E, this._begin = y, this._end = r, this._queuedChunk = null, this._requests = [], this._done = !1, this.onProgress = null;
        }
        _enqueue(E) {
          if (!this._done) {
            if (this._requests.length === 0)
              this._queuedChunk = E;
            else {
              this._requests.shift().resolve({
                value: E,
                done: !1
              });
              for (const r of this._requests)
                r.resolve({
                  value: void 0,
                  done: !0
                });
              this._requests.length = 0;
            }
            this._done = !0, this._stream._removeRangeReader(this);
          }
        }
        get isStreamingSupported() {
          return !1;
        }
        async read() {
          if (this._queuedChunk) {
            const y = this._queuedChunk;
            return this._queuedChunk = null, {
              value: y,
              done: !1
            };
          }
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const E = Promise.withResolvers();
          return this._requests.push(E), E.promise;
        }
        cancel(E) {
          this._done = !0;
          for (const y of this._requests)
            y.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._stream._removeRangeReader(this);
        }
      }
    }
  ),
  /***/
  164: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        GlobalWorkerOptions: () => (
          /* binding */
          v
        )
        /* harmony export */
      });
      class v {
        static #t = null;
        static #e = "";
        static get workerPort() {
          return this.#t;
        }
        static set workerPort(L) {
          if (!(typeof Worker < "u" && L instanceof Worker) && L !== null)
            throw new Error("Invalid `workerPort` type.");
          this.#t = L;
        }
        static get workerSrc() {
          return this.#e;
        }
        static set workerSrc(L) {
          if (typeof L != "string")
            throw new Error("Invalid `workerSrc` type.");
          this.#e = L;
        }
      }
    }
  ),
  /***/
  284: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        XfaLayer: () => (
          /* binding */
          H
        )
        /* harmony export */
      });
      var v = I(50);
      class H {
        static setupStorage(G, P, T, E, y) {
          const r = E.getValue(P, {
            value: null
          });
          switch (T.name) {
            case "textarea":
              if (r.value !== null && (G.textContent = r.value), y === "print")
                break;
              G.addEventListener("input", (c) => {
                E.setValue(P, {
                  value: c.target.value
                });
              });
              break;
            case "input":
              if (T.attributes.type === "radio" || T.attributes.type === "checkbox") {
                if (r.value === T.attributes.xfaOn ? G.setAttribute("checked", !0) : r.value === T.attributes.xfaOff && G.removeAttribute("checked"), y === "print")
                  break;
                G.addEventListener("change", (c) => {
                  E.setValue(P, {
                    value: c.target.checked ? c.target.getAttribute("xfaOn") : c.target.getAttribute("xfaOff")
                  });
                });
              } else {
                if (r.value !== null && G.setAttribute("value", r.value), y === "print")
                  break;
                G.addEventListener("input", (c) => {
                  E.setValue(P, {
                    value: c.target.value
                  });
                });
              }
              break;
            case "select":
              if (r.value !== null) {
                G.setAttribute("value", r.value);
                for (const c of T.children)
                  c.attributes.value === r.value ? c.attributes.selected = !0 : c.attributes.hasOwnProperty("selected") && delete c.attributes.selected;
              }
              G.addEventListener("input", (c) => {
                const l = c.target.options, b = l.selectedIndex === -1 ? "" : l[l.selectedIndex].value;
                E.setValue(P, {
                  value: b
                });
              });
              break;
          }
        }
        static setAttributes({
          html: G,
          element: P,
          storage: T = null,
          intent: E,
          linkService: y
        }) {
          const {
            attributes: r
          } = P, c = G instanceof HTMLAnchorElement;
          r.type === "radio" && (r.name = `${r.name}-${E}`);
          for (const [l, b] of Object.entries(r))
            if (b != null)
              switch (l) {
                case "class":
                  b.length && G.setAttribute(l, b.join(" "));
                  break;
                case "dataId":
                  break;
                case "id":
                  G.setAttribute("data-element-id", b);
                  break;
                case "style":
                  Object.assign(G.style, b);
                  break;
                case "textContent":
                  G.textContent = b;
                  break;
                default:
                  (!c || l !== "href" && l !== "newWindow") && G.setAttribute(l, b);
              }
          c && y.addLinkAttributes(G, r.href, r.newWindow), T && r.dataId && this.setupStorage(G, r.dataId, P, T);
        }
        static render(G) {
          const P = G.annotationStorage, T = G.linkService, E = G.xfaHtml, y = G.intent || "display", r = document.createElement(E.name);
          E.attributes && this.setAttributes({
            html: r,
            element: E,
            intent: y,
            linkService: T
          });
          const c = y !== "richText", l = G.div;
          if (l.append(r), G.viewport) {
            const g = `matrix(${G.viewport.transform.join(",")})`;
            l.style.transform = g;
          }
          c && l.setAttribute("class", "xfaLayer xfaFont");
          const b = [];
          if (E.children.length === 0) {
            if (E.value) {
              const g = document.createTextNode(E.value);
              r.append(g), c && v.XfaText.shouldBuildText(E.name) && b.push(g);
            }
            return {
              textDivs: b
            };
          }
          const s = [[E, -1, r]];
          for (; s.length > 0; ) {
            const [g, t, i] = s.at(-1);
            if (t + 1 === g.children.length) {
              s.pop();
              continue;
            }
            const u = g.children[++s.at(-1)[1]];
            if (u === null)
              continue;
            const {
              name: p
            } = u;
            if (p === "#text") {
              const S = document.createTextNode(u.value);
              b.push(S), i.append(S);
              continue;
            }
            const w = u?.attributes?.xmlns ? document.createElementNS(u.attributes.xmlns, p) : document.createElement(p);
            if (i.append(w), u.attributes && this.setAttributes({
              html: w,
              element: u,
              storage: P,
              intent: y,
              linkService: T
            }), u.children?.length > 0)
              s.push([u, -1, w]);
            else if (u.value) {
              const S = document.createTextNode(u.value);
              c && v.XfaText.shouldBuildText(p) && b.push(S), w.append(S);
            }
          }
          for (const g of l.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))
            g.setAttribute("readOnly", !0);
          return {
            textDivs: b
          };
        }
        static update(G) {
          const P = `matrix(${G.viewport.transform.join(",")})`;
          G.div.style.transform = P, G.div.hidden = !1;
        }
      }
    }
  ),
  /***/
  50: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        XfaText: () => (
          /* binding */
          v
        )
        /* harmony export */
      });
      class v {
        static textContent(L) {
          const G = [], P = {
            items: G,
            styles: /* @__PURE__ */ Object.create(null)
          };
          function T(E) {
            if (!E)
              return;
            let y = null;
            const r = E.name;
            if (r === "#text")
              y = E.value;
            else if (v.shouldBuildText(r))
              E?.attributes?.textContent ? y = E.attributes.textContent : E.value && (y = E.value);
            else return;
            if (y !== null && G.push({
              str: y
            }), !!E.children)
              for (const c of E.children)
                T(c);
          }
          return T(L), P;
        }
        static shouldBuildText(L) {
          return !(L === "textarea" || L === "input" || L === "option" || L === "select");
        }
      }
    }
  ),
  /***/
  228: (
    /***/
    (Y, $, I) => {
      I.a(Y, async (v, H) => {
        try {
          I.d($, {
            /* harmony export */
            AbortException: () => (
              /* reexport safe */
              L.AbortException
            ),
            /* harmony export */
            AnnotationEditorLayer: () => (
              /* reexport safe */
              E.AnnotationEditorLayer
            ),
            /* harmony export */
            AnnotationEditorParamsType: () => (
              /* reexport safe */
              L.AnnotationEditorParamsType
            ),
            /* harmony export */
            AnnotationEditorType: () => (
              /* reexport safe */
              L.AnnotationEditorType
            ),
            /* harmony export */
            AnnotationEditorUIManager: () => (
              /* reexport safe */
              y.AnnotationEditorUIManager
            ),
            /* harmony export */
            AnnotationLayer: () => (
              /* reexport safe */
              r.AnnotationLayer
            ),
            /* harmony export */
            AnnotationMode: () => (
              /* reexport safe */
              L.AnnotationMode
            ),
            /* harmony export */
            CMapCompressionType: () => (
              /* reexport safe */
              L.CMapCompressionType
            ),
            /* harmony export */
            ColorPicker: () => (
              /* reexport safe */
              c.ColorPicker
            ),
            /* harmony export */
            DOMSVGFactory: () => (
              /* reexport safe */
              P.DOMSVGFactory
            ),
            /* harmony export */
            DrawLayer: () => (
              /* reexport safe */
              l.DrawLayer
            ),
            /* harmony export */
            FeatureTest: () => (
              /* reexport safe */
              L.FeatureTest
            ),
            /* harmony export */
            GlobalWorkerOptions: () => (
              /* reexport safe */
              b.GlobalWorkerOptions
            ),
            /* harmony export */
            ImageKind: () => (
              /* reexport safe */
              L.ImageKind
            ),
            /* harmony export */
            InvalidPDFException: () => (
              /* reexport safe */
              L.InvalidPDFException
            ),
            /* harmony export */
            MissingPDFException: () => (
              /* reexport safe */
              L.MissingPDFException
            ),
            /* harmony export */
            OPS: () => (
              /* reexport safe */
              L.OPS
            ),
            /* harmony export */
            Outliner: () => (
              /* reexport safe */
              s.Outliner
            ),
            /* harmony export */
            PDFDataRangeTransport: () => (
              /* reexport safe */
              G.PDFDataRangeTransport
            ),
            /* harmony export */
            PDFDateString: () => (
              /* reexport safe */
              P.PDFDateString
            ),
            /* harmony export */
            PDFWorker: () => (
              /* reexport safe */
              G.PDFWorker
            ),
            /* harmony export */
            PasswordResponses: () => (
              /* reexport safe */
              L.PasswordResponses
            ),
            /* harmony export */
            PermissionFlag: () => (
              /* reexport safe */
              L.PermissionFlag
            ),
            /* harmony export */
            PixelsPerInch: () => (
              /* reexport safe */
              P.PixelsPerInch
            ),
            /* harmony export */
            RenderingCancelledException: () => (
              /* reexport safe */
              P.RenderingCancelledException
            ),
            /* harmony export */
            UnexpectedResponseException: () => (
              /* reexport safe */
              L.UnexpectedResponseException
            ),
            /* harmony export */
            Util: () => (
              /* reexport safe */
              L.Util
            ),
            /* harmony export */
            VerbosityLevel: () => (
              /* reexport safe */
              L.VerbosityLevel
            ),
            /* harmony export */
            XfaLayer: () => (
              /* reexport safe */
              g.XfaLayer
            ),
            /* harmony export */
            build: () => (
              /* reexport safe */
              G.build
            ),
            /* harmony export */
            createValidAbsoluteUrl: () => (
              /* reexport safe */
              L.createValidAbsoluteUrl
            ),
            /* harmony export */
            fetchData: () => (
              /* reexport safe */
              P.fetchData
            ),
            /* harmony export */
            getDocument: () => (
              /* reexport safe */
              G.getDocument
            ),
            /* harmony export */
            getFilenameFromUrl: () => (
              /* reexport safe */
              P.getFilenameFromUrl
            ),
            /* harmony export */
            getPdfFilenameFromUrl: () => (
              /* reexport safe */
              P.getPdfFilenameFromUrl
            ),
            /* harmony export */
            getXfaPageViewport: () => (
              /* reexport safe */
              P.getXfaPageViewport
            ),
            /* harmony export */
            isDataScheme: () => (
              /* reexport safe */
              P.isDataScheme
            ),
            /* harmony export */
            isPdfFile: () => (
              /* reexport safe */
              P.isPdfFile
            ),
            /* harmony export */
            noContextMenu: () => (
              /* reexport safe */
              P.noContextMenu
            ),
            /* harmony export */
            normalizeUnicode: () => (
              /* reexport safe */
              L.normalizeUnicode
            ),
            /* harmony export */
            renderTextLayer: () => (
              /* reexport safe */
              T.renderTextLayer
            ),
            /* harmony export */
            setLayerDimensions: () => (
              /* reexport safe */
              P.setLayerDimensions
            ),
            /* harmony export */
            shadow: () => (
              /* reexport safe */
              L.shadow
            ),
            /* harmony export */
            updateTextLayer: () => (
              /* reexport safe */
              T.updateTextLayer
            ),
            /* harmony export */
            version: () => (
              /* reexport safe */
              G.version
            )
            /* harmony export */
          });
          var L = I(292), G = I(831), P = I(419), T = I(814), E = I(731), y = I(830), r = I(976), c = I(259), l = I(47), b = I(164), s = I(61), g = I(284), t = v([G]);
          G = (t.then ? (await t)() : t)[0];
          const i = "4.2.67", u = "49b388101";
          H();
        } catch (i) {
          H(i);
        }
      });
    }
  ),
  /***/
  178: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        MessageHandler: () => (
          /* binding */
          P
        )
        /* harmony export */
      });
      var v = I(292);
      const H = {
        DATA: 1,
        ERROR: 2
      }, L = {
        CANCEL: 1,
        CANCEL_COMPLETE: 2,
        CLOSE: 3,
        ENQUEUE: 4,
        ERROR: 5,
        PULL: 6,
        PULL_COMPLETE: 7,
        START_COMPLETE: 8
      };
      function G(T) {
        switch (T instanceof Error || typeof T == "object" && T !== null || (0, v.unreachable)('wrapReason: Expected "reason" to be a (possibly cloned) Error.'), T.name) {
          case "AbortException":
            return new v.AbortException(T.message);
          case "MissingPDFException":
            return new v.MissingPDFException(T.message);
          case "PasswordException":
            return new v.PasswordException(T.message, T.code);
          case "UnexpectedResponseException":
            return new v.UnexpectedResponseException(T.message, T.status);
          case "UnknownErrorException":
            return new v.UnknownErrorException(T.message, T.details);
          default:
            return new v.UnknownErrorException(T.message, T.toString());
        }
      }
      class P {
        constructor(E, y, r) {
          this.sourceName = E, this.targetName = y, this.comObj = r, this.callbackId = 1, this.streamId = 1, this.streamSinks = /* @__PURE__ */ Object.create(null), this.streamControllers = /* @__PURE__ */ Object.create(null), this.callbackCapabilities = /* @__PURE__ */ Object.create(null), this.actionHandler = /* @__PURE__ */ Object.create(null), this._onComObjOnMessage = (c) => {
            const l = c.data;
            if (l.targetName !== this.sourceName)
              return;
            if (l.stream) {
              this.#e(l);
              return;
            }
            if (l.callback) {
              const s = l.callbackId, g = this.callbackCapabilities[s];
              if (!g)
                throw new Error(`Cannot resolve callback ${s}`);
              if (delete this.callbackCapabilities[s], l.callback === H.DATA)
                g.resolve(l.data);
              else if (l.callback === H.ERROR)
                g.reject(G(l.reason));
              else
                throw new Error("Unexpected callback case");
              return;
            }
            const b = this.actionHandler[l.action];
            if (!b)
              throw new Error(`Unknown action from worker: ${l.action}`);
            if (l.callbackId) {
              const s = this.sourceName, g = l.sourceName;
              new Promise(function(t) {
                t(b(l.data));
              }).then(function(t) {
                r.postMessage({
                  sourceName: s,
                  targetName: g,
                  callback: H.DATA,
                  callbackId: l.callbackId,
                  data: t
                });
              }, function(t) {
                r.postMessage({
                  sourceName: s,
                  targetName: g,
                  callback: H.ERROR,
                  callbackId: l.callbackId,
                  reason: G(t)
                });
              });
              return;
            }
            if (l.streamId) {
              this.#t(l);
              return;
            }
            b(l.data);
          }, r.addEventListener("message", this._onComObjOnMessage);
        }
        on(E, y) {
          const r = this.actionHandler;
          if (r[E])
            throw new Error(`There is already an actionName called "${E}"`);
          r[E] = y;
        }
        send(E, y, r) {
          this.comObj.postMessage({
            sourceName: this.sourceName,
            targetName: this.targetName,
            action: E,
            data: y
          }, r);
        }
        sendWithPromise(E, y, r) {
          const c = this.callbackId++, l = Promise.withResolvers();
          this.callbackCapabilities[c] = l;
          try {
            this.comObj.postMessage({
              sourceName: this.sourceName,
              targetName: this.targetName,
              action: E,
              callbackId: c,
              data: y
            }, r);
          } catch (b) {
            l.reject(b);
          }
          return l.promise;
        }
        sendWithStream(E, y, r, c) {
          const l = this.streamId++, b = this.sourceName, s = this.targetName, g = this.comObj;
          return new ReadableStream({
            start: (t) => {
              const i = Promise.withResolvers();
              return this.streamControllers[l] = {
                controller: t,
                startCall: i,
                pullCall: null,
                cancelCall: null,
                isClosed: !1
              }, g.postMessage({
                sourceName: b,
                targetName: s,
                action: E,
                streamId: l,
                data: y,
                desiredSize: t.desiredSize
              }, c), i.promise;
            },
            pull: (t) => {
              const i = Promise.withResolvers();
              return this.streamControllers[l].pullCall = i, g.postMessage({
                sourceName: b,
                targetName: s,
                stream: L.PULL,
                streamId: l,
                desiredSize: t.desiredSize
              }), i.promise;
            },
            cancel: (t) => {
              (0, v.assert)(t instanceof Error, "cancel must have a valid reason");
              const i = Promise.withResolvers();
              return this.streamControllers[l].cancelCall = i, this.streamControllers[l].isClosed = !0, g.postMessage({
                sourceName: b,
                targetName: s,
                stream: L.CANCEL,
                streamId: l,
                reason: G(t)
              }), i.promise;
            }
          }, r);
        }
        #t(E) {
          const y = E.streamId, r = this.sourceName, c = E.sourceName, l = this.comObj, b = this, s = this.actionHandler[E.action], g = {
            enqueue(t, i = 1, u) {
              if (this.isCancelled)
                return;
              const p = this.desiredSize;
              this.desiredSize -= i, p > 0 && this.desiredSize <= 0 && (this.sinkCapability = Promise.withResolvers(), this.ready = this.sinkCapability.promise), l.postMessage({
                sourceName: r,
                targetName: c,
                stream: L.ENQUEUE,
                streamId: y,
                chunk: t
              }, u);
            },
            close() {
              this.isCancelled || (this.isCancelled = !0, l.postMessage({
                sourceName: r,
                targetName: c,
                stream: L.CLOSE,
                streamId: y
              }), delete b.streamSinks[y]);
            },
            error(t) {
              (0, v.assert)(t instanceof Error, "error must have a valid reason"), !this.isCancelled && (this.isCancelled = !0, l.postMessage({
                sourceName: r,
                targetName: c,
                stream: L.ERROR,
                streamId: y,
                reason: G(t)
              }));
            },
            sinkCapability: Promise.withResolvers(),
            onPull: null,
            onCancel: null,
            isCancelled: !1,
            desiredSize: E.desiredSize,
            ready: null
          };
          g.sinkCapability.resolve(), g.ready = g.sinkCapability.promise, this.streamSinks[y] = g, new Promise(function(t) {
            t(s(E.data, g));
          }).then(function() {
            l.postMessage({
              sourceName: r,
              targetName: c,
              stream: L.START_COMPLETE,
              streamId: y,
              success: !0
            });
          }, function(t) {
            l.postMessage({
              sourceName: r,
              targetName: c,
              stream: L.START_COMPLETE,
              streamId: y,
              reason: G(t)
            });
          });
        }
        #e(E) {
          const y = E.streamId, r = this.sourceName, c = E.sourceName, l = this.comObj, b = this.streamControllers[y], s = this.streamSinks[y];
          switch (E.stream) {
            case L.START_COMPLETE:
              E.success ? b.startCall.resolve() : b.startCall.reject(G(E.reason));
              break;
            case L.PULL_COMPLETE:
              E.success ? b.pullCall.resolve() : b.pullCall.reject(G(E.reason));
              break;
            case L.PULL:
              if (!s) {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: L.PULL_COMPLETE,
                  streamId: y,
                  success: !0
                });
                break;
              }
              s.desiredSize <= 0 && E.desiredSize > 0 && s.sinkCapability.resolve(), s.desiredSize = E.desiredSize, new Promise(function(g) {
                g(s.onPull?.());
              }).then(function() {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: L.PULL_COMPLETE,
                  streamId: y,
                  success: !0
                });
              }, function(g) {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: L.PULL_COMPLETE,
                  streamId: y,
                  reason: G(g)
                });
              });
              break;
            case L.ENQUEUE:
              if ((0, v.assert)(b, "enqueue should have stream controller"), b.isClosed)
                break;
              b.controller.enqueue(E.chunk);
              break;
            case L.CLOSE:
              if ((0, v.assert)(b, "close should have stream controller"), b.isClosed)
                break;
              b.isClosed = !0, b.controller.close(), this.#s(b, y);
              break;
            case L.ERROR:
              (0, v.assert)(b, "error should have stream controller"), b.controller.error(G(E.reason)), this.#s(b, y);
              break;
            case L.CANCEL_COMPLETE:
              E.success ? b.cancelCall.resolve() : b.cancelCall.reject(G(E.reason)), this.#s(b, y);
              break;
            case L.CANCEL:
              if (!s)
                break;
              new Promise(function(g) {
                g(s.onCancel?.(G(E.reason)));
              }).then(function() {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: L.CANCEL_COMPLETE,
                  streamId: y,
                  success: !0
                });
              }, function(g) {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: L.CANCEL_COMPLETE,
                  streamId: y,
                  reason: G(g)
                });
              }), s.sinkCapability.reject(G(E.reason)), s.isCancelled = !0, delete this.streamSinks[y];
              break;
            default:
              throw new Error("Unexpected stream case");
          }
        }
        async #s(E, y) {
          await Promise.allSettled([E.startCall?.promise, E.pullCall?.promise, E.cancelCall?.promise]), delete this.streamControllers[y];
        }
        destroy() {
          this.comObj.removeEventListener("message", this._onComObjOnMessage);
        }
      }
    }
  ),
  /***/
  651: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        MurmurHash3_64: () => (
          /* binding */
          G
        )
        /* harmony export */
      });
      const v = 3285377520, H = 4294901760, L = 65535;
      class G {
        constructor(T) {
          this.h1 = T ? T & 4294967295 : v, this.h2 = T ? T & 4294967295 : v;
        }
        update(T) {
          let E, y;
          if (typeof T == "string") {
            E = new Uint8Array(T.length * 2), y = 0;
            for (let S = 0, M = T.length; S < M; S++) {
              const _ = T.charCodeAt(S);
              _ <= 255 ? E[y++] = _ : (E[y++] = _ >>> 8, E[y++] = _ & 255);
            }
          } else if (ArrayBuffer.isView(T))
            E = T.slice(), y = E.byteLength;
          else
            throw new Error("Invalid data format, must be a string or TypedArray.");
          const r = y >> 2, c = y - r * 4, l = new Uint32Array(E.buffer, 0, r);
          let b = 0, s = 0, g = this.h1, t = this.h2;
          const i = 3432918353, u = 461845907, p = i & L, w = u & L;
          for (let S = 0; S < r; S++)
            S & 1 ? (b = l[S], b = b * i & H | b * p & L, b = b << 15 | b >>> 17, b = b * u & H | b * w & L, g ^= b, g = g << 13 | g >>> 19, g = g * 5 + 3864292196) : (s = l[S], s = s * i & H | s * p & L, s = s << 15 | s >>> 17, s = s * u & H | s * w & L, t ^= s, t = t << 13 | t >>> 19, t = t * 5 + 3864292196);
          switch (b = 0, c) {
            case 3:
              b ^= E[r * 4 + 2] << 16;
            case 2:
              b ^= E[r * 4 + 1] << 8;
            case 1:
              b ^= E[r * 4], b = b * i & H | b * p & L, b = b << 15 | b >>> 17, b = b * u & H | b * w & L, r & 1 ? g ^= b : t ^= b;
          }
          this.h1 = g, this.h2 = t;
        }
        hexdigest() {
          let T = this.h1, E = this.h2;
          return T ^= E >>> 1, T = T * 3981806797 & H | T * 36045 & L, E = E * 4283543511 & H | ((E << 16 | T >>> 16) * 2950163797 & H) >>> 16, T ^= E >>> 1, T = T * 444984403 & H | T * 60499 & L, E = E * 3301882366 & H | ((E << 16 | T >>> 16) * 3120437893 & H) >>> 16, T ^= E >>> 1, (T >>> 0).toString(16).padStart(8, "0") + (E >>> 0).toString(16).padStart(8, "0");
        }
      }
    }
  ),
  /***/
  292: (
    /***/
    (Y, $, I) => {
      I.d($, {
        /* harmony export */
        AbortException: () => (
          /* binding */
          ut
        ),
        /* harmony export */
        AnnotationBorderStyleType: () => (
          /* binding */
          t
        ),
        /* harmony export */
        AnnotationEditorParamsType: () => (
          /* binding */
          c
        ),
        /* harmony export */
        AnnotationEditorPrefix: () => (
          /* binding */
          y
        ),
        /* harmony export */
        AnnotationEditorType: () => (
          /* binding */
          r
        ),
        /* harmony export */
        AnnotationMode: () => (
          /* binding */
          E
        ),
        /* harmony export */
        AnnotationPrefix: () => (
          /* binding */
          k
        ),
        /* harmony export */
        AnnotationType: () => (
          /* binding */
          g
        ),
        /* harmony export */
        BaseException: () => (
          /* binding */
          V
        ),
        /* harmony export */
        CMapCompressionType: () => (
          /* binding */
          u
        ),
        /* harmony export */
        FONT_IDENTITY_MATRIX: () => (
          /* binding */
          L
        ),
        /* harmony export */
        FeatureTest: () => (
          /* binding */
          n
        ),
        /* harmony export */
        FontRenderOps: () => (
          /* binding */
          D
        ),
        /* harmony export */
        FormatError: () => (
          /* binding */
          mt
        ),
        /* harmony export */
        IDENTITY_MATRIX: () => (
          /* binding */
          H
        ),
        /* harmony export */
        ImageKind: () => (
          /* binding */
          s
        ),
        /* harmony export */
        InvalidPDFException: () => (
          /* binding */
          et
        ),
        /* harmony export */
        LINE_FACTOR: () => (
          /* binding */
          P
        ),
        /* harmony export */
        MAX_IMAGE_SIZE_TO_CACHE: () => (
          /* binding */
          G
        ),
        /* harmony export */
        MissingPDFException: () => (
          /* binding */
          ot
        ),
        /* harmony export */
        OPS: () => (
          /* binding */
          p
        ),
        /* harmony export */
        PasswordException: () => (
          /* binding */
          q
        ),
        /* harmony export */
        PasswordResponses: () => (
          /* binding */
          w
        ),
        /* harmony export */
        PermissionFlag: () => (
          /* binding */
          l
        ),
        /* harmony export */
        RenderingIntentFlag: () => (
          /* binding */
          T
        ),
        /* harmony export */
        TextRenderingMode: () => (
          /* binding */
          b
        ),
        /* harmony export */
        UnexpectedResponseException: () => (
          /* binding */
          dt
        ),
        /* harmony export */
        UnknownErrorException: () => (
          /* binding */
          st
        ),
        /* harmony export */
        Util: () => (
          /* binding */
          o
        ),
        /* harmony export */
        VerbosityLevel: () => (
          /* binding */
          i
        ),
        /* harmony export */
        assert: () => (
          /* binding */
          K
        ),
        /* harmony export */
        bytesToString: () => (
          /* binding */
          ht
        ),
        /* harmony export */
        createValidAbsoluteUrl: () => (
          /* binding */
          W
        ),
        /* harmony export */
        getUuid: () => (
          /* binding */
          R
        ),
        /* harmony export */
        getVerbosityLevel: () => (
          /* binding */
          _
        ),
        /* harmony export */
        info: () => (
          /* binding */
          O
        ),
        /* harmony export */
        isNodeJS: () => (
          /* binding */
          v
        ),
        /* harmony export */
        normalizeUnicode: () => (
          /* binding */
          x
        ),
        /* harmony export */
        objectFromMap: () => (
          /* binding */
          m
        ),
        /* harmony export */
        setVerbosityLevel: () => (
          /* binding */
          M
        ),
        /* harmony export */
        shadow: () => (
          /* binding */
          z
        ),
        /* harmony export */
        string32: () => (
          /* binding */
          it
        ),
        /* harmony export */
        stringToBytes: () => (
          /* binding */
          ft
        ),
        /* harmony export */
        unreachable: () => (
          /* binding */
          U
        ),
        /* harmony export */
        warn: () => (
          /* binding */
          B
        )
        /* harmony export */
      });
      const v = typeof process == "object" && process + "" == "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser"), H = [1, 0, 0, 1, 0, 0], L = [1e-3, 0, 0, 1e-3, 0, 0], G = 1e7, P = 1.35, T = {
        ANY: 1,
        DISPLAY: 2,
        PRINT: 4,
        SAVE: 8,
        ANNOTATIONS_FORMS: 16,
        ANNOTATIONS_STORAGE: 32,
        ANNOTATIONS_DISABLE: 64,
        OPLIST: 256
      }, E = {
        DISABLE: 0,
        ENABLE: 1,
        ENABLE_FORMS: 2,
        ENABLE_STORAGE: 3
      }, y = "pdfjs_internal_editor_", r = {
        DISABLE: -1,
        NONE: 0,
        FREETEXT: 3,
        HIGHLIGHT: 9,
        STAMP: 13,
        INK: 15
      }, c = {
        RESIZE: 1,
        CREATE: 2,
        FREETEXT_SIZE: 11,
        FREETEXT_COLOR: 12,
        FREETEXT_OPACITY: 13,
        INK_COLOR: 21,
        INK_THICKNESS: 22,
        INK_OPACITY: 23,
        HIGHLIGHT_COLOR: 31,
        HIGHLIGHT_DEFAULT_COLOR: 32,
        HIGHLIGHT_THICKNESS: 33,
        HIGHLIGHT_FREE: 34,
        HIGHLIGHT_SHOW_ALL: 35
      }, l = {
        PRINT: 4,
        MODIFY_CONTENTS: 8,
        COPY: 16,
        MODIFY_ANNOTATIONS: 32,
        FILL_INTERACTIVE_FORMS: 256,
        COPY_FOR_ACCESSIBILITY: 512,
        ASSEMBLE: 1024,
        PRINT_HIGH_QUALITY: 2048
      }, b = {
        FILL: 0,
        STROKE: 1,
        FILL_STROKE: 2,
        INVISIBLE: 3,
        FILL_ADD_TO_PATH: 4,
        STROKE_ADD_TO_PATH: 5,
        FILL_STROKE_ADD_TO_PATH: 6,
        ADD_TO_PATH: 7,
        FILL_STROKE_MASK: 3,
        ADD_TO_PATH_FLAG: 4
      }, s = {
        GRAYSCALE_1BPP: 1,
        RGB_24BPP: 2,
        RGBA_32BPP: 3
      }, g = {
        TEXT: 1,
        LINK: 2,
        FREETEXT: 3,
        LINE: 4,
        SQUARE: 5,
        CIRCLE: 6,
        POLYGON: 7,
        POLYLINE: 8,
        HIGHLIGHT: 9,
        UNDERLINE: 10,
        SQUIGGLY: 11,
        STRIKEOUT: 12,
        STAMP: 13,
        CARET: 14,
        INK: 15,
        POPUP: 16,
        FILEATTACHMENT: 17,
        SOUND: 18,
        MOVIE: 19,
        WIDGET: 20,
        SCREEN: 21,
        PRINTERMARK: 22,
        TRAPNET: 23,
        WATERMARK: 24,
        THREED: 25,
        REDACT: 26
      }, t = {
        SOLID: 1,
        DASHED: 2,
        BEVELED: 3,
        INSET: 4,
        UNDERLINE: 5
      }, i = {
        ERRORS: 0,
        WARNINGS: 1,
        INFOS: 5
      }, u = {
        NONE: 0,
        BINARY: 1
      }, p = {
        dependency: 1,
        setLineWidth: 2,
        setLineCap: 3,
        setLineJoin: 4,
        setMiterLimit: 5,
        setDash: 6,
        setRenderingIntent: 7,
        setFlatness: 8,
        setGState: 9,
        save: 10,
        restore: 11,
        transform: 12,
        moveTo: 13,
        lineTo: 14,
        curveTo: 15,
        curveTo2: 16,
        curveTo3: 17,
        closePath: 18,
        rectangle: 19,
        stroke: 20,
        closeStroke: 21,
        fill: 22,
        eoFill: 23,
        fillStroke: 24,
        eoFillStroke: 25,
        closeFillStroke: 26,
        closeEOFillStroke: 27,
        endPath: 28,
        clip: 29,
        eoClip: 30,
        beginText: 31,
        endText: 32,
        setCharSpacing: 33,
        setWordSpacing: 34,
        setHScale: 35,
        setLeading: 36,
        setFont: 37,
        setTextRenderingMode: 38,
        setTextRise: 39,
        moveText: 40,
        setLeadingMoveText: 41,
        setTextMatrix: 42,
        nextLine: 43,
        showText: 44,
        showSpacedText: 45,
        nextLineShowText: 46,
        nextLineSetSpacingShowText: 47,
        setCharWidth: 48,
        setCharWidthAndBounds: 49,
        setStrokeColorSpace: 50,
        setFillColorSpace: 51,
        setStrokeColor: 52,
        setStrokeColorN: 53,
        setFillColor: 54,
        setFillColorN: 55,
        setStrokeGray: 56,
        setFillGray: 57,
        setStrokeRGBColor: 58,
        setFillRGBColor: 59,
        setStrokeCMYKColor: 60,
        setFillCMYKColor: 61,
        shadingFill: 62,
        beginInlineImage: 63,
        beginImageData: 64,
        endInlineImage: 65,
        paintXObject: 66,
        markPoint: 67,
        markPointProps: 68,
        beginMarkedContent: 69,
        beginMarkedContentProps: 70,
        endMarkedContent: 71,
        beginCompat: 72,
        endCompat: 73,
        paintFormXObjectBegin: 74,
        paintFormXObjectEnd: 75,
        beginGroup: 76,
        endGroup: 77,
        beginAnnotation: 80,
        endAnnotation: 81,
        paintImageMaskXObject: 83,
        paintImageMaskXObjectGroup: 84,
        paintImageXObject: 85,
        paintInlineImageXObject: 86,
        paintInlineImageXObjectGroup: 87,
        paintImageXObjectRepeat: 88,
        paintImageMaskXObjectRepeat: 89,
        paintSolidColorImageMask: 90,
        constructPath: 91
      }, w = {
        NEED_PASSWORD: 1,
        INCORRECT_PASSWORD: 2
      };
      let S = i.WARNINGS;
      function M(N) {
        Number.isInteger(N) && (S = N);
      }
      function _() {
        return S;
      }
      function O(N) {
        S >= i.INFOS && console.log(`Info: ${N}`);
      }
      function B(N) {
        S >= i.WARNINGS && console.log(`Warning: ${N}`);
      }
      function U(N) {
        throw new Error(N);
      }
      function K(N, F) {
        N || U(F);
      }
      function rt(N) {
        switch (N?.protocol) {
          case "http:":
          case "https:":
          case "ftp:":
          case "mailto:":
          case "tel:":
            return !0;
          default:
            return !1;
        }
      }
      function W(N, F = null, C = null) {
        if (!N)
          return null;
        try {
          if (C && typeof N == "string" && (C.addDefaultProtocol && N.startsWith("www.") && N.match(/\./g)?.length >= 2 && (N = `http://${N}`), C.tryConvertEncoding))
            try {
              N = a(N);
            } catch {
            }
          const X = F ? new URL(N, F) : new URL(N);
          if (rt(X))
            return X;
        } catch {
        }
        return null;
      }
      function z(N, F, C, X = !1) {
        return Object.defineProperty(N, F, {
          value: C,
          enumerable: !X,
          configurable: !0,
          writable: !1
        }), C;
      }
      const V = function() {
        function F(C, X) {
          this.constructor === F && U("Cannot initialize BaseException."), this.message = C, this.name = X;
        }
        return F.prototype = new Error(), F.constructor = F, F;
      }();
      class q extends V {
        constructor(F, C) {
          super(F, "PasswordException"), this.code = C;
        }
      }
      class st extends V {
        constructor(F, C) {
          super(F, "UnknownErrorException"), this.details = C;
        }
      }
      class et extends V {
        constructor(F) {
          super(F, "InvalidPDFException");
        }
      }
      class ot extends V {
        constructor(F) {
          super(F, "MissingPDFException");
        }
      }
      class dt extends V {
        constructor(F, C) {
          super(F, "UnexpectedResponseException"), this.status = C;
        }
      }
      class mt extends V {
        constructor(F) {
          super(F, "FormatError");
        }
      }
      class ut extends V {
        constructor(F) {
          super(F, "AbortException");
        }
      }
      function ht(N) {
        (typeof N != "object" || N?.length === void 0) && U("Invalid argument for bytesToString");
        const F = N.length, C = 8192;
        if (F < C)
          return String.fromCharCode.apply(null, N);
        const X = [];
        for (let Q = 0; Q < F; Q += C) {
          const j = Math.min(Q + C, F), Z = N.subarray(Q, j);
          X.push(String.fromCharCode.apply(null, Z));
        }
        return X.join("");
      }
      function ft(N) {
        typeof N != "string" && U("Invalid argument for stringToBytes");
        const F = N.length, C = new Uint8Array(F);
        for (let X = 0; X < F; ++X)
          C[X] = N.charCodeAt(X) & 255;
        return C;
      }
      function it(N) {
        return String.fromCharCode(N >> 24 & 255, N >> 16 & 255, N >> 8 & 255, N & 255);
      }
      function m(N) {
        const F = /* @__PURE__ */ Object.create(null);
        for (const [C, X] of N)
          F[C] = X;
        return F;
      }
      function h() {
        const N = new Uint8Array(4);
        return N[0] = 1, new Uint32Array(N.buffer, 0, 1)[0] === 1;
      }
      function e() {
        try {
          return new Function(""), !0;
        } catch {
          return !1;
        }
      }
      class n {
        static get isLittleEndian() {
          return z(this, "isLittleEndian", h());
        }
        static get isEvalSupported() {
          return z(this, "isEvalSupported", e());
        }
        static get isOffscreenCanvasSupported() {
          return z(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas < "u");
        }
        static get platform() {
          return typeof navigator < "u" && typeof navigator?.platform == "string" ? z(this, "platform", {
            isMac: navigator.platform.includes("Mac")
          }) : z(this, "platform", {
            isMac: !1
          });
        }
        static get isCSSRoundSupported() {
          return z(this, "isCSSRoundSupported", globalThis.CSS?.supports?.("width: round(1.5px, 1px)"));
        }
      }
      const f = Array.from(Array(256).keys(), (N) => N.toString(16).padStart(2, "0"));
      class o {
        static makeHexColor(F, C, X) {
          return `#${f[F]}${f[C]}${f[X]}`;
        }
        static scaleMinMax(F, C) {
          let X;
          F[0] ? (F[0] < 0 && (X = C[0], C[0] = C[2], C[2] = X), C[0] *= F[0], C[2] *= F[0], F[3] < 0 && (X = C[1], C[1] = C[3], C[3] = X), C[1] *= F[3], C[3] *= F[3]) : (X = C[0], C[0] = C[1], C[1] = X, X = C[2], C[2] = C[3], C[3] = X, F[1] < 0 && (X = C[1], C[1] = C[3], C[3] = X), C[1] *= F[1], C[3] *= F[1], F[2] < 0 && (X = C[0], C[0] = C[2], C[2] = X), C[0] *= F[2], C[2] *= F[2]), C[0] += F[4], C[1] += F[5], C[2] += F[4], C[3] += F[5];
        }
        static transform(F, C) {
          return [F[0] * C[0] + F[2] * C[1], F[1] * C[0] + F[3] * C[1], F[0] * C[2] + F[2] * C[3], F[1] * C[2] + F[3] * C[3], F[0] * C[4] + F[2] * C[5] + F[4], F[1] * C[4] + F[3] * C[5] + F[5]];
        }
        static applyTransform(F, C) {
          const X = F[0] * C[0] + F[1] * C[2] + C[4], Q = F[0] * C[1] + F[1] * C[3] + C[5];
          return [X, Q];
        }
        static applyInverseTransform(F, C) {
          const X = C[0] * C[3] - C[1] * C[2], Q = (F[0] * C[3] - F[1] * C[2] + C[2] * C[5] - C[4] * C[3]) / X, j = (-F[0] * C[1] + F[1] * C[0] + C[4] * C[1] - C[5] * C[0]) / X;
          return [Q, j];
        }
        static getAxialAlignedBoundingBox(F, C) {
          const X = this.applyTransform(F, C), Q = this.applyTransform(F.slice(2, 4), C), j = this.applyTransform([F[0], F[3]], C), Z = this.applyTransform([F[2], F[1]], C);
          return [Math.min(X[0], Q[0], j[0], Z[0]), Math.min(X[1], Q[1], j[1], Z[1]), Math.max(X[0], Q[0], j[0], Z[0]), Math.max(X[1], Q[1], j[1], Z[1])];
        }
        static inverseTransform(F) {
          const C = F[0] * F[3] - F[1] * F[2];
          return [F[3] / C, -F[1] / C, -F[2] / C, F[0] / C, (F[2] * F[5] - F[4] * F[3]) / C, (F[4] * F[1] - F[5] * F[0]) / C];
        }
        static singularValueDecompose2dScale(F) {
          const C = [F[0], F[2], F[1], F[3]], X = F[0] * C[0] + F[1] * C[2], Q = F[0] * C[1] + F[1] * C[3], j = F[2] * C[0] + F[3] * C[2], Z = F[2] * C[1] + F[3] * C[3], at = (X + Z) / 2, tt = Math.sqrt((X + Z) ** 2 - 4 * (X * Z - j * Q)) / 2, J = at + tt || 1, nt = at - tt || 1;
          return [Math.sqrt(J), Math.sqrt(nt)];
        }
        static normalizeRect(F) {
          const C = F.slice(0);
          return F[0] > F[2] && (C[0] = F[2], C[2] = F[0]), F[1] > F[3] && (C[1] = F[3], C[3] = F[1]), C;
        }
        static intersect(F, C) {
          const X = Math.max(Math.min(F[0], F[2]), Math.min(C[0], C[2])), Q = Math.min(Math.max(F[0], F[2]), Math.max(C[0], C[2]));
          if (X > Q)
            return null;
          const j = Math.max(Math.min(F[1], F[3]), Math.min(C[1], C[3])), Z = Math.min(Math.max(F[1], F[3]), Math.max(C[1], C[3]));
          return j > Z ? null : [X, j, Q, Z];
        }
        static #t(F, C, X, Q, j, Z, at, tt, J, nt) {
          if (J <= 0 || J >= 1)
            return;
          const lt = 1 - J, bt = J * J, At = bt * J, yt = lt * (lt * (lt * F + 3 * J * C) + 3 * bt * X) + At * Q, vt = lt * (lt * (lt * j + 3 * J * Z) + 3 * bt * at) + At * tt;
          nt[0] = Math.min(nt[0], yt), nt[1] = Math.min(nt[1], vt), nt[2] = Math.max(nt[2], yt), nt[3] = Math.max(nt[3], vt);
        }
        static #e(F, C, X, Q, j, Z, at, tt, J, nt, lt, bt) {
          if (Math.abs(J) < 1e-12) {
            Math.abs(nt) >= 1e-12 && this.#t(F, C, X, Q, j, Z, at, tt, -lt / nt, bt);
            return;
          }
          const At = nt ** 2 - 4 * lt * J;
          if (At < 0)
            return;
          const yt = Math.sqrt(At), vt = 2 * J;
          this.#t(F, C, X, Q, j, Z, at, tt, (-nt + yt) / vt, bt), this.#t(F, C, X, Q, j, Z, at, tt, (-nt - yt) / vt, bt);
        }
        static bezierBoundingBox(F, C, X, Q, j, Z, at, tt, J) {
          return J ? (J[0] = Math.min(J[0], F, at), J[1] = Math.min(J[1], C, tt), J[2] = Math.max(J[2], F, at), J[3] = Math.max(J[3], C, tt)) : J = [Math.min(F, at), Math.min(C, tt), Math.max(F, at), Math.max(C, tt)], this.#e(F, X, j, at, C, Q, Z, tt, 3 * (-F + 3 * (X - j) + at), 6 * (F - 2 * X + j), 3 * (X - F), J), this.#e(F, X, j, at, C, Q, Z, tt, 3 * (-C + 3 * (Q - Z) + tt), 6 * (C - 2 * Q + Z), 3 * (Q - C), J), J;
        }
      }
      function a(N) {
        return decodeURIComponent(escape(N));
      }
      let d = null, A = null;
      function x(N) {
        return d || (d = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu, A = /* @__PURE__ */ new Map([["ﬅ", "ſt"]])), N.replaceAll(d, (F, C, X) => C ? C.normalize("NFKC") : A.get(X));
      }
      function R() {
        if (typeof crypto < "u" && typeof crypto?.randomUUID == "function")
          return crypto.randomUUID();
        const N = new Uint8Array(32);
        if (typeof crypto < "u" && typeof crypto?.getRandomValues == "function")
          crypto.getRandomValues(N);
        else
          for (let F = 0; F < 32; F++)
            N[F] = Math.floor(Math.random() * 255);
        return ht(N);
      }
      const k = "pdfjs_internal_id_", D = {
        BEZIER_CURVE_TO: 0,
        MOVE_TO: 1,
        LINE_TO: 2,
        QUADRATIC_CURVE_TO: 3,
        RESTORE: 4,
        SAVE: 5,
        SCALE: 6,
        TRANSFORM: 7,
        TRANSLATE: 8
      };
    }
  )
  /******/
}, he = {};
function Dt(Y) {
  var $ = he[Y];
  if ($ !== void 0)
    return $.exports;
  var I = he[Y] = {
    /******/
    // no module.id needed
    /******/
    // no module.loaded needed
    /******/
    exports: {}
    /******/
  };
  return ke[Y](I, I.exports, Dt), I.exports;
}
(() => {
  var Y = typeof Symbol == "function" ? Symbol("webpack queues") : "__webpack_queues__", $ = typeof Symbol == "function" ? Symbol("webpack exports") : "__webpack_exports__", I = typeof Symbol == "function" ? Symbol("webpack error") : "__webpack_error__", v = (L) => {
    L && L.d < 1 && (L.d = 1, L.forEach((G) => G.r--), L.forEach((G) => G.r-- ? G.r++ : G()));
  }, H = (L) => L.map((G) => {
    if (G !== null && typeof G == "object") {
      if (G[Y]) return G;
      if (G.then) {
        var P = [];
        P.d = 0, G.then((y) => {
          T[$] = y, v(P);
        }, (y) => {
          T[I] = y, v(P);
        });
        var T = {};
        return T[Y] = (y) => y(P), T;
      }
    }
    var E = {};
    return E[Y] = (y) => {
    }, E[$] = G, E;
  });
  Dt.a = (L, G, P) => {
    var T;
    P && ((T = []).d = -1);
    var E = /* @__PURE__ */ new Set(), y = L.exports, r, c, l, b = new Promise((s, g) => {
      l = g, c = s;
    });
    b[$] = y, b[Y] = (s) => (T && s(T), E.forEach(s), b.catch((g) => {
    })), L.exports = b, G((s) => {
      r = H(s);
      var g, t = () => r.map((u) => {
        if (u[I]) throw u[I];
        return u[$];
      }), i = new Promise((u) => {
        g = () => u(t), g.r = 0;
        var p = (w) => w !== T && !E.has(w) && (E.add(w), w && !w.d && (g.r++, w.push(g)));
        r.map((w) => w[Y](p));
      });
      return g.r ? i : t();
    }, (s) => (s ? l(b[I] = s) : c(y), v(T))), T && T.d < 0 && (T.d = 0);
  };
})();
Dt.d = (Y, $) => {
  for (var I in $)
    Dt.o($, I) && !Dt.o(Y, I) && Object.defineProperty(Y, I, { enumerable: !0, get: $[I] });
};
Dt.o = (Y, $) => Object.prototype.hasOwnProperty.call(Y, $);
var gt = Dt(228);
gt = globalThis.pdfjsLib = await (globalThis.pdfjsLibPromise = gt);
gt.AbortException;
gt.AnnotationEditorLayer;
gt.AnnotationEditorParamsType;
gt.AnnotationEditorType;
gt.AnnotationEditorUIManager;
gt.AnnotationLayer;
gt.AnnotationMode;
gt.CMapCompressionType;
gt.ColorPicker;
gt.DOMSVGFactory;
gt.DrawLayer;
gt.FeatureTest;
var Fe = gt.GlobalWorkerOptions;
gt.ImageKind;
gt.InvalidPDFException;
gt.MissingPDFException;
gt.OPS;
gt.Outliner;
gt.PDFDataRangeTransport;
gt.PDFDateString;
gt.PDFWorker;
gt.PasswordResponses;
gt.PermissionFlag;
gt.PixelsPerInch;
gt.RenderingCancelledException;
gt.UnexpectedResponseException;
gt.Util;
gt.VerbosityLevel;
gt.XfaLayer;
gt.build;
gt.createValidAbsoluteUrl;
gt.fetchData;
var Pe = gt.getDocument;
gt.getFilenameFromUrl;
gt.getPdfFilenameFromUrl;
gt.getXfaPageViewport;
gt.isDataScheme;
gt.isPdfFile;
gt.noContextMenu;
gt.normalizeUnicode;
gt.renderTextLayer;
gt.setLayerDimensions;
gt.shadow;
gt.updateTextLayer;
gt.version;
var Le = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, le = (Y) => {
  throw TypeError(Y);
}, Pt = (Y, $, I, v) => {
  for (var H = v > 1 ? void 0 : v ? Me($, I) : $, L = Y.length - 1, G; L >= 0; L--)
    (G = Y[L]) && (H = (v ? G($, I, H) : G(H)) || H);
  return v && H && Le($, I, H), H;
}, ce = (Y, $, I) => $.has(Y) || le("Cannot " + I), Yt = (Y, $, I) => (ce(Y, $, "read from private field"), I ? I.call(Y) : $.get(Y)), Ie = (Y, $, I) => $.has(Y) ? le("Cannot add the same private member more than once") : $ instanceof WeakSet ? $.add(Y) : $.set(Y, I), pt = (Y, $, I) => (ce(Y, $, "access private method"), I), ct, de, ue, jt, Ot, ee, Ft, Qt, re, ae, fe, pe, ge, Kt, me, be, se, ve, Ae, ye, ie, Zt, ne;
Fe.workerSrc = "/App_Plugins/UpDoc/dist/pdf.worker.min.mjs";
const Ht = [
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
let Tt = class extends Ce {
  constructor() {
    super(...arguments), Ie(this, ct), this._pdfDoc = null, this._currentPage = 1, this._totalPages = 0, this._scale = 1, this._loading = !0, this._error = "", this._zones = [], this._selectedZoneId = null, this._mode = "draw", this._pageWidth = 0, this._pageHeight = 0, this._isDrawing = !1, this._drawStart = { x: 0, y: 0 }, this._drawCurrent = { x: 0, y: 0 }, this._isDragging = !1, this._isResizing = !1, this._resizeHandle = "", this._dragStart = { x: 0, y: 0 }, this._dragZoneStart = { x: 0, y: 0, w: 0, h: 0 }, this._canvas = null, this._overlay = null, this._nextId = 1;
  }
  async firstUpdated() {
    await pt(this, ct, ue).call(this);
  }
  render() {
    return this._loading ? _t`
				<umb-body-layout headline="Define Areas">
					<div class="loading">
						<uui-loader></uui-loader>
						<span>Loading PDF...</span>
					</div>
				</umb-body-layout>
			` : this._error ? _t`
				<umb-body-layout headline="Define Areas">
					<div class="error">${this._error}</div>
					<uui-button slot="actions" label="Close" @click=${pt(this, ct, ie)}></uui-button>
				</umb-body-layout>
			` : _t`
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
									@click=${() => pt(this, ct, Kt).call(this, this._currentPage - 1)}>
									&laquo;
								</uui-button>
								<span class="page-info">Page ${this._currentPage} / ${this._totalPages}</span>
								<uui-button compact label="Next page" ?disabled=${this._currentPage >= this._totalPages}
									@click=${() => pt(this, ct, Kt).call(this, this._currentPage + 1)}>
									&raquo;
								</uui-button>
							</div>

							<div class="toolbar-group">
								<uui-button compact label="Zoom out" @click=${pt(this, ct, be)}>&minus;</uui-button>
								<span class="zoom-info">${Math.round(this._scale * 100)}%</span>
								<uui-button compact label="Zoom in" @click=${pt(this, ct, me)}>+</uui-button>
							</div>
						</div>

						<div class="canvas-container">
							<canvas id="pdf-canvas"></canvas>
							<canvas id="overlay-canvas"
								@mousedown=${pt(this, ct, fe)}
								@mousemove=${pt(this, ct, pe)}
								@mouseup=${pt(this, ct, ge)}
								style="cursor: ${this._mode === "draw" ? "crosshair" : "default"}">
							</canvas>
						</div>
					</div>

					<!-- Right: Zone list + edit -->
					<div class="zone-panel">
						<uui-box headline="Zones on this page">
							${Yt(this, ct, ne).length === 0 ? _t`<p class="empty-hint">Draw a zone on the PDF to get started.</p>` : Yt(this, ct, ne).map((Y) => _t`
									<div class="zone-item ${Y.id === this._selectedZoneId ? "selected" : ""}"
										@click=${() => pt(this, ct, se).call(this, Y.id)}>
										<span class="zone-color" style="background: ${Y.color}"></span>
										<span class="zone-name">${Y.name || "Unnamed"}</span>
										<uui-button compact look="secondary" label="Delete"
											@click=${($) => {
      $.stopPropagation(), pt(this, ct, ve).call(this, Y.id);
    }}>
											<uui-icon name="icon-trash"></uui-icon>
										</uui-button>
									</div>
								`)}
						</uui-box>

						${Yt(this, ct, Zt) ? _t`
							<uui-box headline="Edit Zone" style="margin-top: var(--uui-size-space-4)">
								<div class="edit-form">
									<label>Name</label>
									<uui-input
										.value=${Yt(this, ct, Zt).name}
										@change=${(Y) => {
      pt(this, ct, Ae).call(this, this._selectedZoneId, Y.target.value);
    }}>
									</uui-input>

									<label>Color</label>
									<div class="color-swatches">
										${Ht.map((Y) => _t`
											<button
												class="color-swatch ${Y === Yt(this, ct, Zt).color ? "active" : ""}"
												style="background: ${Y}"
												@click=${() => {
      const $ = this._zones.find((I) => I.id === this._selectedZoneId);
      $ && ($.color = Y, this._zones = [...this._zones], pt(this, ct, Ft).call(this));
    }}>
											</button>
										`)}
									</div>
								</div>
							</uui-box>
						` : oe}

						${this._zones.length > 0 && this._zones.some((Y) => Y.page !== this._currentPage) ? _t`
							<uui-box headline="All zones" style="margin-top: var(--uui-size-space-4)">
								${this._zones.map((Y) => _t`
									<div class="zone-item ${Y.id === this._selectedZoneId ? "selected" : ""}"
										@click=${() => pt(this, ct, se).call(this, Y.id)}>
										<span class="zone-color" style="background: ${Y.color}"></span>
										<span class="zone-name">${Y.name || "Unnamed"}</span>
										<span class="zone-page">p${Y.page}</span>
									</div>
								`)}
							</uui-box>
						` : oe}
					</div>
				</div>

				<uui-button
					slot="actions"
					look="primary"
					color="positive"
					label="Save"
					?disabled=${this._zones.length === 0}
					@click=${pt(this, ct, ye)}>
					Save
				</uui-button>
				<uui-button
					slot="actions"
					label="Cancel"
					@click=${pt(this, ct, ie)}>
					Cancel
				</uui-button>
			</umb-body-layout>
		`;
  }
};
ct = /* @__PURE__ */ new WeakSet();
de = async function() {
  return (await this.getContext(Re)).getLatestToken();
};
ue = async function() {
  const Y = this.data?.workflowName;
  if (!Y) {
    this._error = "No workflow name provided.", this._loading = !1;
    return;
  }
  try {
    const $ = await pt(this, ct, de).call(this), I = await Se(Y, $);
    if (!I) {
      this._error = "Could not load PDF file.", this._loading = !1;
      return;
    }
    const v = await I.arrayBuffer(), H = Pe({ data: v });
    this._pdfDoc = await H.promise, this._totalPages = this._pdfDoc.numPages, this.data?.existingTemplate?.zones?.length && (this._zones = this.data.existingTemplate.zones.map((L, G) => ({
      id: `zone-${G + 1}`,
      name: L.name,
      property: L.property,
      page: L.page,
      type: L.type,
      x: L.bounds.x,
      y: L.bounds.y,
      w: L.bounds.width,
      h: L.bounds.height,
      color: L.color || Ht[G % Ht.length],
      headingFont: L.headingFont,
      expectedSections: L.expectedSections,
      notes: L.notes
    })), this._nextId = this._zones.length + 1), this._loading = !1, await this.updateComplete, await pt(this, ct, jt).call(this);
  } catch ($) {
    this._error = `Failed to load PDF: ${$}`, this._loading = !1;
  }
};
jt = async function() {
  if (!this._pdfDoc) return;
  const Y = await this._pdfDoc.getPage(this._currentPage), $ = Y.getViewport({ scale: this._scale });
  if (this._pageWidth = $.width, this._pageHeight = $.height, this._canvas = this.renderRoot.querySelector("#pdf-canvas"), this._overlay = this.renderRoot.querySelector("#overlay-canvas"), !this._canvas || !this._overlay) return;
  this._canvas.width = $.width, this._canvas.height = $.height, this._overlay.width = $.width, this._overlay.height = $.height;
  const I = this._canvas.getContext("2d");
  await Y.render({ canvasContext: I, viewport: $ }).promise, pt(this, ct, Ft).call(this);
};
Ot = function(Y, $) {
  const I = Y * this._scale, v = (this._pageHeight / this._scale - $) * this._scale;
  return { cx: I, cy: v };
};
ee = function(Y, $) {
  const I = Y / this._scale, v = this._pageHeight / this._scale - $ / this._scale;
  return { px: I, py: v };
};
Ft = function() {
  if (!this._overlay) return;
  const Y = this._overlay.getContext("2d");
  Y.clearRect(0, 0, this._overlay.width, this._overlay.height);
  for (const $ of this._zones) {
    if ($.page !== this._currentPage) continue;
    const I = pt(this, ct, Ot).call(this, $.x, $.y + $.h), v = pt(this, ct, Ot).call(this, $.x + $.w, $.y), H = v.cx - I.cx, L = v.cy - I.cy;
    if (Y.fillStyle = $.color + "30", Y.fillRect(I.cx, I.cy, H, L), Y.strokeStyle = $.color, Y.lineWidth = $.id === this._selectedZoneId ? 3 : 2, Y.strokeRect(I.cx, I.cy, H, L), Y.fillStyle = $.color, Y.font = "bold 12px sans-serif", Y.fillText($.name || "Unnamed", I.cx + 4, I.cy + 14), $.id === this._selectedZoneId) {
      const P = [
        { x: I.cx, y: I.cy },
        // top-left
        { x: I.cx + H, y: I.cy },
        // top-right
        { x: I.cx, y: I.cy + L },
        // bottom-left
        { x: I.cx + H, y: I.cy + L }
        // bottom-right
      ];
      Y.fillStyle = $.color;
      for (const T of P)
        Y.fillRect(T.x - 8 / 2, T.y - 8 / 2, 8, 8);
    }
  }
  if (this._isDrawing) {
    const $ = Math.min(this._drawStart.x, this._drawCurrent.x), I = Math.min(this._drawStart.y, this._drawCurrent.y), v = Math.abs(this._drawCurrent.x - this._drawStart.x), H = Math.abs(this._drawCurrent.y - this._drawStart.y);
    Y.strokeStyle = Ht[this._zones.length % Ht.length], Y.lineWidth = 2, Y.setLineDash([5, 5]), Y.strokeRect($, I, v, H), Y.setLineDash([]);
  }
};
Qt = function(Y) {
  if (!this._overlay) return { x: 0, y: 0 };
  const $ = this._overlay.getBoundingClientRect();
  return { x: Y.clientX - $.left, y: Y.clientY - $.top };
};
re = function(Y, $) {
  for (const I of this._zones) {
    if (I.page !== this._currentPage) continue;
    const v = pt(this, ct, Ot).call(this, I.x, I.y + I.h), H = pt(this, ct, Ot).call(this, I.x + I.w, I.y);
    if (Y >= v.cx && Y <= H.cx && $ >= v.cy && $ <= H.cy)
      return I;
  }
  return null;
};
ae = function(Y, $, I) {
  const v = pt(this, ct, Ot).call(this, Y.x, Y.y + Y.h), H = pt(this, ct, Ot).call(this, Y.x + Y.w, Y.y), L = 10, G = Math.abs($ - v.cx) < L, P = Math.abs($ - H.cx) < L, T = Math.abs(I - v.cy) < L, E = Math.abs(I - H.cy) < L;
  return T && G ? "tl" : T && P ? "tr" : E && G ? "bl" : E && P ? "br" : "";
};
fe = function(Y) {
  const $ = pt(this, ct, Qt).call(this, Y);
  if (this._mode === "draw") {
    this._isDrawing = !0, this._drawStart = $, this._drawCurrent = $;
    return;
  }
  const I = pt(this, ct, re).call(this, $.x, $.y);
  if (I) {
    this._selectedZoneId = I.id, pt(this, ct, Ft).call(this);
    const v = pt(this, ct, ae).call(this, I, $.x, $.y);
    v ? (this._isResizing = !0, this._resizeHandle = v, this._dragStart = $, this._dragZoneStart = { x: I.x, y: I.y, w: I.w, h: I.h }) : (this._isDragging = !0, this._dragStart = $, this._dragZoneStart = { x: I.x, y: I.y, w: I.w, h: I.h });
  } else
    this._selectedZoneId = null, pt(this, ct, Ft).call(this);
};
pe = function(Y) {
  const $ = pt(this, ct, Qt).call(this, Y);
  if (this._isDrawing) {
    this._drawCurrent = $, pt(this, ct, Ft).call(this);
    return;
  }
  if (this._isDragging && this._selectedZoneId) {
    const I = this._zones.find((L) => L.id === this._selectedZoneId);
    if (!I) return;
    const v = ($.x - this._dragStart.x) / this._scale, H = -($.y - this._dragStart.y) / this._scale;
    I.x = this._dragZoneStart.x + v, I.y = this._dragZoneStart.y + H, this._zones = [...this._zones], pt(this, ct, Ft).call(this);
    return;
  }
  if (this._isResizing && this._selectedZoneId) {
    const I = this._zones.find((E) => E.id === this._selectedZoneId);
    if (!I) return;
    const v = ($.x - this._dragStart.x) / this._scale, H = -($.y - this._dragStart.y) / this._scale, { x: L, y: G, w: P, h: T } = this._dragZoneStart;
    switch (this._resizeHandle) {
      case "br":
        I.w = Math.max(20, P + v), I.y = G + H, I.h = Math.max(20, T - H);
        break;
      case "bl":
        I.x = L + v, I.w = Math.max(20, P - v), I.y = G + H, I.h = Math.max(20, T - H);
        break;
      case "tr":
        I.w = Math.max(20, P + v), I.h = Math.max(20, T + H);
        break;
      case "tl":
        I.x = L + v, I.w = Math.max(20, P - v), I.h = Math.max(20, T + H);
        break;
    }
    this._zones = [...this._zones], pt(this, ct, Ft).call(this);
    return;
  }
  if (this._mode === "select" && this._overlay) {
    const I = pt(this, ct, re).call(this, $.x, $.y);
    if (I && this._selectedZoneId === I.id) {
      const v = pt(this, ct, ae).call(this, I, $.x, $.y);
      v === "tl" || v === "br" ? this._overlay.style.cursor = "nwse-resize" : v === "tr" || v === "bl" ? this._overlay.style.cursor = "nesw-resize" : this._overlay.style.cursor = "move";
    } else I ? this._overlay.style.cursor = "pointer" : this._overlay.style.cursor = "default";
  }
};
ge = function(Y) {
  if (this._isDrawing) {
    this._isDrawing = !1;
    const $ = pt(this, ct, Qt).call(this, Y), I = Math.abs($.x - this._drawStart.x), v = Math.abs($.y - this._drawStart.y);
    if (I > 10 && v > 10) {
      const H = pt(this, ct, ee).call(this, Math.min(this._drawStart.x, $.x), Math.min(this._drawStart.y, $.y)), L = pt(this, ct, ee).call(this, Math.max(this._drawStart.x, $.x), Math.max(this._drawStart.y, $.y)), G = {
        id: `zone-${this._nextId++}`,
        name: `Zone ${this._zones.filter((P) => P.page === this._currentPage).length + 1}`,
        property: "",
        page: this._currentPage,
        type: "",
        x: H.px,
        y: L.py,
        w: L.px - H.px,
        h: H.py - L.py,
        color: Ht[this._zones.length % Ht.length],
        headingFont: "",
        expectedSections: [],
        notes: ""
      };
      this._zones = [...this._zones, G], this._selectedZoneId = G.id, this._mode = "select";
    }
    pt(this, ct, Ft).call(this);
    return;
  }
  this._isDragging = !1, this._isResizing = !1;
};
Kt = async function(Y) {
  Y < 1 || Y > this._totalPages || (this._currentPage = Y, this._selectedZoneId = null, await this.updateComplete, await pt(this, ct, jt).call(this));
};
me = function() {
  this._scale = Math.min(3, this._scale + 0.25), pt(this, ct, jt).call(this);
};
be = function() {
  this._scale = Math.max(0.5, this._scale - 0.25), pt(this, ct, jt).call(this);
};
se = function(Y) {
  this._selectedZoneId = Y, this._mode = "select";
  const $ = this._zones.find((I) => I.id === Y);
  $ && $.page !== this._currentPage ? pt(this, ct, Kt).call(this, $.page) : pt(this, ct, Ft).call(this);
};
ve = function(Y) {
  this._zones = this._zones.filter(($) => $.id !== Y), this._selectedZoneId === Y && (this._selectedZoneId = null), pt(this, ct, Ft).call(this);
};
Ae = function(Y, $) {
  const I = this._zones.find((v) => v.id === Y);
  I && (I.name = $, this._zones = [...this._zones], pt(this, ct, Ft).call(this));
};
ye = function() {
  const Y = {
    templateName: this.data?.existingTemplate?.templateName || this.data?.workflowName || "Zone Template",
    sourceFile: this.data?.existingTemplate?.sourceFile || "",
    pageSize: {
      width: this._pageWidth / this._scale,
      height: this._pageHeight / this._scale
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    zones: this._zones.map(($) => ({
      name: $.name,
      property: $.property,
      page: $.page,
      type: $.type,
      bounds: {
        x: Math.round($.x * 10) / 10,
        y: Math.round($.y * 10) / 10,
        width: Math.round($.w * 10) / 10,
        height: Math.round($.h * 10) / 10
      },
      color: $.color,
      headingFont: $.headingFont,
      expectedSections: $.expectedSections,
      notes: $.notes
    }))
  };
  this.value = { template: Y }, this._submitModal();
};
ie = function() {
  this._rejectModal();
};
Zt = function() {
  return this._zones.find((Y) => Y.id === this._selectedZoneId) ?? null;
};
ne = function() {
  return this._zones.filter((Y) => Y.page === this._currentPage);
};
Tt.styles = [
  Te,
  xe`
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
Pt([
  Lt()
], Tt.prototype, "_pdfDoc", 2);
Pt([
  Lt()
], Tt.prototype, "_currentPage", 2);
Pt([
  Lt()
], Tt.prototype, "_totalPages", 2);
Pt([
  Lt()
], Tt.prototype, "_scale", 2);
Pt([
  Lt()
], Tt.prototype, "_loading", 2);
Pt([
  Lt()
], Tt.prototype, "_error", 2);
Pt([
  Lt()
], Tt.prototype, "_zones", 2);
Pt([
  Lt()
], Tt.prototype, "_selectedZoneId", 2);
Pt([
  Lt()
], Tt.prototype, "_mode", 2);
Pt([
  Lt()
], Tt.prototype, "_pageWidth", 2);
Pt([
  Lt()
], Tt.prototype, "_pageHeight", 2);
Tt = Pt([
  Ee("pdf-zone-editor-modal")
], Tt);
const Be = Tt;
export {
  Tt as PdfZoneEditorModalElement,
  Be as default
};
//# sourceMappingURL=pdf-zone-editor-modal.element-B92kq8rK.js.map
