var Vt = {
  /***/
  976: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        AnnotationLayer: () => (
          /* binding */
          ut
        ),
        FreeTextAnnotationElement: () => (
          /* binding */
          B
        ),
        InkAnnotationElement: () => (
          /* binding */
          tt
        ),
        StampAnnotationElement: () => (
          /* binding */
          dt
        )
      });
      var w = U(292), z = U(419), N = U(792);
      function $(et) {
        return Math.floor(Math.max(0, Math.min(1, et)) * 255).toString(16).padStart(2, "0");
      }
      function L(et) {
        return Math.max(0, Math.min(255, 255 * et));
      }
      class C {
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
          return m = L(m), [m, m, m];
        }
        static G_HTML([m]) {
          const h = $(m);
          return `#${h}${h}${h}`;
        }
        static RGB_G([m, h, e]) {
          return ["G", 0.3 * m + 0.59 * h + 0.11 * e];
        }
        static RGB_rgb(m) {
          return m.map(L);
        }
        static RGB_HTML(m) {
          return `#${m.map($).join("")}`;
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
          return [L(1 - Math.min(1, m + n)), L(1 - Math.min(1, e + n)), L(1 - Math.min(1, h + n))];
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
      var x = U(284);
      const v = 1e3, r = 9, c = /* @__PURE__ */ new WeakSet();
      function l(et) {
        return {
          width: et[2] - et[0],
          height: et[3] - et[1]
        };
      }
      class b {
        static create(m) {
          switch (m.data.annotationType) {
            case w.AnnotationType.LINK:
              return new g(m);
            case w.AnnotationType.TEXT:
              return new t(m);
            case w.AnnotationType.WIDGET:
              switch (m.data.fieldType) {
                case "Tx":
                  return new u(m);
                case "Btn":
                  return m.data.radioButton ? new S(m) : m.data.checkBox ? new y(m) : new P(m);
                case "Ch":
                  return new M(m);
                case "Sig":
                  return new p(m);
              }
              return new i(m);
            case w.AnnotationType.POPUP:
              return new O(m);
            case w.AnnotationType.FREETEXT:
              return new B(m);
            case w.AnnotationType.LINE:
              return new q(m);
            case w.AnnotationType.SQUARE:
              return new nt(m);
            case w.AnnotationType.CIRCLE:
              return new j(m);
            case w.AnnotationType.POLYLINE:
              return new _(m);
            case w.AnnotationType.CARET:
              return new Y(m);
            case w.AnnotationType.INK:
              return new tt(m);
            case w.AnnotationType.POLYGON:
              return new G(m);
            case w.AnnotationType.HIGHLIGHT:
              return new Z(m);
            case w.AnnotationType.UNDERLINE:
              return new at(m);
            case w.AnnotationType.SQUIGGLY:
              return new lt(m);
            case w.AnnotationType.STRIKEOUT:
              return new pt(m);
            case w.AnnotationType.STAMP:
              return new dt(m);
            case w.AnnotationType.FILEATTACHMENT:
              return new ot(m);
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
            height: E
          } = l(m);
          h.left = `${100 * (m[0] - a) / f}%`, h.top = `${100 * (o - m[3] + d) / o}%`, n === 0 ? (h.width = `${100 * A / f}%`, h.height = `${100 * E / o}%`) : this.setRotation(n);
        }
        _createContainer(m) {
          const {
            data: h,
            parent: {
              page: e,
              viewport: n
            }
          } = this, f = document.createElement("section");
          f.setAttribute("data-annotation-id", h.id), this instanceof i || (f.tabIndex = v);
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
            const F = h.borderStyle.horizontalCornerRadius, T = h.borderStyle.verticalCornerRadius;
            if (F > 0 || T > 0) {
              const K = `calc(${F}px * var(--scale-factor)) / calc(${T}px * var(--scale-factor))`;
              o.borderRadius = K;
            } else if (this instanceof S) {
              const K = `calc(${a}px * var(--scale-factor)) / calc(${d}px * var(--scale-factor))`;
              o.borderRadius = K;
            }
            switch (h.borderStyle.style) {
              case w.AnnotationBorderStyleType.SOLID:
                o.borderStyle = "solid";
                break;
              case w.AnnotationBorderStyleType.DASHED:
                o.borderStyle = "dashed";
                break;
              case w.AnnotationBorderStyleType.BEVELED:
                (0, w.warn)("Unimplemented border style: beveled");
                break;
              case w.AnnotationBorderStyleType.INSET:
                (0, w.warn)("Unimplemented border style: inset");
                break;
              case w.AnnotationBorderStyleType.UNDERLINE:
                o.borderBottomStyle = "solid";
                break;
            }
            const V = h.borderColor || null;
            V ? (this.#e = !0, o.borderColor = w.Util.makeHexColor(V[0] | 0, V[1] | 0, V[2] | 0)) : o.borderWidth = 0;
          }
          const A = w.Util.normalizeRect([h.rect[0], e.view[3] - h.rect[1] + e.view[1], h.rect[2], e.view[3] - h.rect[3] + e.view[1]]), {
            pageWidth: E,
            pageHeight: R,
            pageX: k,
            pageY: D
          } = n.rawDims;
          o.left = `${100 * (A[0] - k) / E}%`, o.top = `${100 * (A[1] - D) / R}%`;
          const {
            rotation: I
          } = h;
          return h.hasOwnCanvas || I === 0 ? (o.width = `${100 * a / E}%`, o.height = `${100 * d / R}%`) : this.setRotation(I, f), f;
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
            n.target.style[e] = C[`${o}_HTML`](a), this.annotationStorage.setValue(this.data.id, {
              [e]: C[`${o}_rgb`](a)
            });
          };
          return (0, w.shadow)(this, "_commonActions", {
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
              y: T
            }, {
              x: V,
              y: K
            }] = m[0];
            if (n === F && f === T && h === V && e === K)
              return;
          }
          const {
            style: o
          } = this.container;
          let a;
          if (this.#e) {
            const {
              borderColor: F,
              borderWidth: T
            } = o;
            o.borderWidth = 0, a = ["url('data:image/svg+xml;utf8,", '<svg xmlns="http://www.w3.org/2000/svg"', ' preserveAspectRatio="none" viewBox="0 0 1 1">', `<g fill="transparent" stroke="${F}" stroke-width="${T}">`], this.container.classList.add("hasBorder");
          }
          const d = n - h, A = f - e, {
            svgFactory: E
          } = this, R = E.createElement("svg");
          R.classList.add("quadrilateralsContainer"), R.setAttribute("width", 0), R.setAttribute("height", 0);
          const k = E.createElement("defs");
          R.append(k);
          const D = E.createElement("clipPath"), I = `clippath_${this.data.id}`;
          D.setAttribute("id", I), D.setAttribute("clipPathUnits", "objectBoundingBox"), k.append(D);
          for (const [, {
            x: F,
            y: T
          }, {
            x: V,
            y: K
          }] of m) {
            const X = E.createElement("rect"), W = (V - h) / d, rt = (f - T) / A, J = (F - V) / d, Q = (T - K) / A;
            X.setAttribute("x", W), X.setAttribute("y", rt), X.setAttribute("width", J), X.setAttribute("height", Q), D.append(X), a?.push(`<rect vector-effect="non-scaling-stroke" x="${W}" y="${rt}" width="${J}" height="${Q}"/>`);
          }
          this.#e && (a.push("</g></svg>')"), o.backgroundImage = a.join("")), this.container.append(R), this.container.style.clipPath = `url(#${I})`;
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
          (0, w.unreachable)("Abstract method `AnnotationElement.render` called");
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
                  (0, w.warn)(`_getElementsByName - element not allowed: ${o}`);
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
            (0, w.warn)('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), e || (m.onclick = () => !1);
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
              const E = new Set(f);
              for (const R of n) {
                const k = this._fieldObjects[R] || [];
                for (const {
                  id: D
                } of k)
                  E.add(D);
              }
              for (const R of Object.values(this._fieldObjects))
                for (const k of R)
                  E.has(k.id) === o && a.push(k);
            } else
              for (const E of Object.values(this._fieldObjects))
                a.push(...E);
            const d = this.annotationStorage, A = [];
            for (const E of a) {
              const {
                id: R
              } = E;
              switch (A.push(R), E.type) {
                case "text": {
                  const D = E.defaultValue || "";
                  d.setValue(R, {
                    value: D
                  });
                  break;
                }
                case "checkbox":
                case "radiobutton": {
                  const D = E.defaultValue === E.exportValues;
                  d.setValue(R, {
                    value: D
                  });
                  break;
                }
                case "combobox":
                case "listbox": {
                  const D = E.defaultValue || "";
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
                  (0, w.warn)(`_bindResetFormAction - element not allowed: ${R}`);
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
          return w.FeatureTest.platform.isMac ? m.metaKey : m.ctrlKey;
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
          m.style.backgroundColor = h === null ? "transparent" : w.Util.makeHexColor(h[0], h[1], h[2]);
        }
        _setTextStyle(m) {
          const h = ["left", "center", "right"], {
            fontColor: e
          } = this.data.defaultAppearanceData, n = this.data.defaultAppearanceData.fontSize || r, f = m.style;
          let o;
          const a = 2, d = (A) => Math.round(10 * A) / 10;
          if (this.data.multiLine) {
            const A = Math.abs(this.data.rect[3] - this.data.rect[1] - a), E = Math.round(A / (w.LINE_FACTOR * n)) || 1, R = A / E;
            o = Math.min(n, d(R / w.LINE_FACTOR));
          } else {
            const A = Math.abs(this.data.rect[3] - this.data.rect[1] - a);
            o = Math.min(n, d(A / w.LINE_FACTOR));
          }
          f.fontSize = `calc(${o}px * var(--scale-factor))`, f.color = w.Util.makeHexColor(e[0], e[1], e[2]), this.data.textAlignment !== null && (f.textAlign = h[this.data.textAlignment]);
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
            this.data.multiLine ? (e = document.createElement("textarea"), e.textContent = a ?? f, this.data.doNotScroll && (e.style.overflowY = "hidden")) : (e = document.createElement("input"), e.type = "text", e.setAttribute("value", a ?? f), this.data.doNotScroll && (e.style.overflowX = "hidden")), this.data.hasOwnCanvas && (e.hidden = !0), c.add(e), e.setAttribute("data-element-id", h), e.disabled = this.data.readOnly, e.name = this.data.fieldName, e.tabIndex = v, this._setRequired(e, this.data.required), o && (e.maxLength = o), e.addEventListener("input", (E) => {
              m.setValue(h, {
                value: E.target.value
              }), this.setPropertyOnSiblings(e, "value", E.target.value, "value"), d.formattedValue = null;
            }), e.addEventListener("resetform", (E) => {
              const R = this.data.defaultFieldValue ?? "";
              e.value = d.userValue = R, d.formattedValue = null;
            });
            let A = (E) => {
              const {
                formattedValue: R
              } = d;
              R != null && (E.target.value = R), E.target.scrollLeft = 0;
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
                      formattedValue: I
                    } = D.detail;
                    d.formattedValue = I, I != null && D.target !== document.activeElement && (D.target.value = I), m.setValue(h, {
                      formattedValue: I
                    });
                  },
                  selRange(D) {
                    D.target.setSelectionRange(...D.detail.selRange);
                  },
                  charLimit: (D) => {
                    const {
                      charLimit: I
                    } = D.detail, {
                      target: F
                    } = D;
                    if (I === 0) {
                      F.removeAttribute("maxLength");
                      return;
                    }
                    F.setAttribute("maxLength", I);
                    let T = d.userValue;
                    !T || T.length <= I || (T = T.slice(0, I), F.value = d.userValue = T, m.setValue(h, {
                      value: T
                    }), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id: h,
                        name: "Keystroke",
                        value: T,
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
              const E = A;
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
                }), E(R);
              }), this.data.actions?.Keystroke && e.addEventListener("beforeinput", (R) => {
                d.lastCommittedValue = null;
                const {
                  data: k,
                  target: D
                } = R, {
                  value: I,
                  selectionStart: F,
                  selectionEnd: T
                } = D;
                let V = F, K = T;
                switch (R.inputType) {
                  case "deleteWordBackward": {
                    const X = I.substring(0, F).match(/\w*[^\w]*$/);
                    X && (V -= X[0].length);
                    break;
                  }
                  case "deleteWordForward": {
                    const X = I.substring(F).match(/^[^\w]*\w*/);
                    X && (K += X[0].length);
                    break;
                  }
                  case "deleteContentBackward":
                    F === T && (V -= 1);
                    break;
                  case "deleteContentForward":
                    F === T && (K += 1);
                    break;
                }
                R.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: h,
                    name: "Keystroke",
                    value: I,
                    change: k || "",
                    willCommit: !1,
                    selStart: V,
                    selEnd: K
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
      class y extends i {
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
          return c.add(f), f.setAttribute("data-element-id", e), f.disabled = h.readOnly, this._setRequired(f, this.data.required), f.type = "checkbox", f.name = h.fieldName, n && f.setAttribute("checked", !0), f.setAttribute("exportValue", h.exportValue), f.tabIndex = v, f.addEventListener("change", (o) => {
            const {
              name: a,
              checked: d
            } = o.target;
            for (const A of this._getElementsByName(a, e)) {
              const E = d && A.exportValue === h.exportValue;
              A.domElement && (A.domElement.checked = E), m.setValue(A.id, {
                value: E
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
          if (c.add(f), f.setAttribute("data-element-id", e), f.disabled = h.readOnly, this._setRequired(f, this.data.required), f.type = "radio", f.name = h.fieldName, n && f.setAttribute("checked", !0), f.tabIndex = v, f.addEventListener("change", (o) => {
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
                  const E = o === A.detail.value;
                  for (const R of this._getElementsByName(A.target.name)) {
                    const k = E && R.id === e;
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
      class P extends g {
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
      class M extends i {
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
          c.add(n), n.setAttribute("data-element-id", h), n.disabled = this.data.readOnly, this._setRequired(n, this.data.required), n.name = this.data.fieldName, n.tabIndex = v;
          let f = this.data.combo && this.data.options.length > 0;
          this.data.combo || (n.size = this.data.options.length, this.data.multiSelect && (n.multiple = !0)), n.addEventListener("resetform", (E) => {
            const R = this.data.defaultFieldValue;
            for (const k of n.options)
              k.selected = k.value === R;
          });
          for (const E of this.data.options) {
            const R = document.createElement("option");
            R.textContent = E.displayValue, R.value = E.exportValue, e.value.includes(E.exportValue) && (R.setAttribute("selected", !0), f = !1), n.append(R);
          }
          let o = null;
          if (f) {
            const E = document.createElement("option");
            E.value = " ", E.setAttribute("hidden", !0), E.setAttribute("selected", !0), n.prepend(E), o = () => {
              E.remove(), n.removeEventListener("input", o), o = null;
            }, n.addEventListener("input", o);
          }
          const a = (E) => {
            const R = E ? "value" : "textContent", {
              options: k,
              multiple: D
            } = n;
            return D ? Array.prototype.filter.call(k, (I) => I.selected).map((I) => I[R]) : k.selectedIndex === -1 ? null : k[k.selectedIndex][R];
          };
          let d = a(!1);
          const A = (E) => {
            const R = E.target.options;
            return Array.prototype.map.call(R, (k) => ({
              displayValue: k.textContent,
              exportValue: k.value
            }));
          };
          return this.enableScripting && this.hasJSActions ? (n.addEventListener("updatefromsandbox", (E) => {
            const R = {
              value(k) {
                o?.();
                const D = k.detail.value, I = new Set(Array.isArray(D) ? D : [D]);
                for (const F of n.options)
                  F.selected = I.has(F.value);
                m.setValue(h, {
                  value: a(!0)
                }), d = a(!1);
              },
              multipleSelection(k) {
                n.multiple = !0;
              },
              remove(k) {
                const D = n.options, I = k.detail.remove;
                D[I].selected = !1, n.remove(I), D.length > 0 && Array.prototype.findIndex.call(D, (T) => T.selected) === -1 && (D[0].selected = !0), m.setValue(h, {
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
                  displayValue: I,
                  exportValue: F
                } = k.detail.insert, T = n.children[D], V = document.createElement("option");
                V.textContent = I, V.value = F, T ? T.before(V) : n.append(V), m.setValue(h, {
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
                for (const I of D) {
                  const {
                    displayValue: F,
                    exportValue: T
                  } = I, V = document.createElement("option");
                  V.textContent = F, V.value = T, n.append(V);
                }
                n.options.length > 0 && (n.options[0].selected = !0), m.setValue(h, {
                  value: a(!0),
                  items: A(k)
                }), d = a(!1);
              },
              indices(k) {
                const D = new Set(k.detail.indices);
                for (const I of k.target.options)
                  I.selected = D.has(I.index);
                m.setValue(h, {
                  value: a(!0)
                }), d = a(!1);
              },
              editable(k) {
                k.target.disabled = !k.detail.editable;
              }
            };
            this._dispatchEventFromSandbox(R, E);
          }), n.addEventListener("input", (E) => {
            const R = a(!0), k = a(!1);
            m.setValue(h, {
              value: R
            }), E.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
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
          }), this._setEventListeners(n, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], (E) => E.target.value)) : n.addEventListener("input", function(E) {
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
          const m = new H({
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
          return this.container.setAttribute("aria-controls", h.map((e) => `${w.AnnotationPrefix}${e}`).join(",")), this.container;
        }
      }
      class H {
        #t = this.#m.bind(this);
        #e = this.#C.bind(this);
        #s = this.#w.bind(this);
        #n = this.#v.bind(this);
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
        #A = !1;
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
          parentRect: E,
          open: R
        }) {
          this.#i = m, this.#f = n, this.#a = o, this.#g = a, this.#d = d, this.#r = h, this.#p = A, this.#u = E, this.#h = e, this.#l = z.PDFDateString.toDateObject(f), this.trigger = e.flatMap((k) => k.getElementsToTriggerPopup());
          for (const k of this.trigger)
            k.addEventListener("click", this.#n), k.addEventListener("mouseenter", this.#s), k.addEventListener("mouseleave", this.#e), k.classList.add("popupTriggerArea");
          for (const k of e)
            k.container?.addEventListener("keydown", this.#t);
          this.#i.hidden = !0, R && this.#v();
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
            const X = o.style.outlineColor = w.Util.makeHexColor(...this.#r);
            CSS.supports("background-color", "color-mix(in srgb, red 30%, white)") ? o.style.backgroundColor = `color-mix(in srgb, ${X} 30%, white)` : o.style.backgroundColor = w.Util.makeHexColor(...this.#r.map((rt) => Math.floor(0.7 * (255 - rt) + rt)));
          }
          const a = document.createElement("span");
          a.className = "header";
          const d = document.createElement("h1");
          if (a.append(d), {
            dir: d.dir,
            str: d.textContent
          } = this.#f, o.append(a), this.#l) {
            const X = document.createElement("span");
            X.classList.add("popupDate"), X.setAttribute("data-l10n-id", "pdfjs-annotation-date-string"), X.setAttribute("data-l10n-args", JSON.stringify({
              date: this.#l.toLocaleDateString(),
              time: this.#l.toLocaleTimeString()
            })), a.append(X);
          }
          const A = this.#a, E = this.#g;
          if (E?.str && (!A?.str || A.str === E.str))
            x.XfaLayer.render({
              xfaHtml: E.html,
              intent: "richText",
              div: o
            }), o.lastChild.classList.add("richText", "popupContent");
          else {
            const X = this._formatContents(A);
            o.append(X);
          }
          let R = !!this.#u, k = R ? this.#u : this.#p;
          for (const X of this.#h)
            if (!k || w.Util.intersect(X.data.rect, k) !== null) {
              k = X.data.rect, R = !0;
              break;
            }
          const D = w.Util.normalizeRect([k[0], m[3] - k[1] + m[1], k[2], m[3] - k[3] + m[1]]), F = R ? k[2] - k[0] + 5 : 0, T = D[0] + F, V = D[1], {
            style: K
          } = this.#i;
          K.left = `${100 * (T - n) / h}%`, K.top = `${100 * (V - f) / e}%`, this.#i.append(o);
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
          m.altKey || m.shiftKey || m.ctrlKey || m.metaKey || (m.key === "Enter" || m.key === "Escape" && this.#c) && this.#v();
        }
        #v() {
          this.#c = !this.#c, this.#c ? (this.#w(), this.#i.addEventListener("click", this.#n), this.#i.addEventListener("keydown", this.#t)) : (this.#C(), this.#i.removeEventListener("click", this.#n), this.#i.removeEventListener("keydown", this.#t));
        }
        #w() {
          this.#o || this.render(), this.isVisible ? this.#c && this.#i.classList.add("focused") : (this.#i.hidden = !1, this.#i.style.zIndex = parseInt(this.#i.style.zIndex) + 1e3);
        }
        #C() {
          this.#i.classList.remove("focused"), !(this.#c || !this.isVisible) && (this.#i.hidden = !0, this.#i.style.zIndex = parseInt(this.#i.style.zIndex) - 1e3);
        }
        forceHide() {
          this.#A = this.isVisible, this.#A && (this.#i.hidden = !0);
        }
        maybeShow() {
          this.#A && (this.#A = !1, this.#i.hidden = !1);
        }
        get isVisible() {
          return this.#i.hidden === !1;
        }
      }
      class B extends s {
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.textContent = m.data.textContent, this.textPosition = m.data.textPosition, this.annotationEditorType = w.AnnotationEditorType.FREETEXT;
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
      class q extends s {
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
      class nt extends s {
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
      class j extends s {
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
      class _ extends s {
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
      class G extends _ {
        constructor(m) {
          super(m), this.containerClassName = "polygonAnnotation", this.svgElementName = "svg:polygon";
        }
      }
      class Y extends s {
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
      class tt extends s {
        #t = [];
        constructor(m) {
          super(m, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.containerClassName = "inkAnnotation", this.svgElementName = "svg:polyline", this.annotationEditorType = w.AnnotationEditorType.INK;
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
              const A = d.x - m.rect[0], E = m.rect[3] - d.y;
              o.push(`${A},${E}`);
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
      class Z extends s {
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
      class at extends s {
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
      class lt extends s {
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
      class pt extends s {
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
      class dt extends s {
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
      class ot extends s {
        #t = null;
        constructor(m) {
          super(m, {
            isRenderable: !0
          });
          const {
            filename: h,
            content: e
          } = this.data.file;
          this.filename = (0, z.getFilenameFromUrl)(h, !0), this.content = e, this.linkService.eventBus?.dispatch("fileattachmentannotation", {
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
          } = w.FeatureTest.platform;
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
      class ut {
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
          e.id = `${w.AnnotationPrefix}${h}`, this.div.append(m), this.#t?.moveElementInDOM(this.div, m, e, !1);
        }
        async render(m) {
          const {
            annotations: h
          } = m, e = this.div;
          (0, z.setLayerDimensions)(e, this.viewport);
          const n = /* @__PURE__ */ new Map(), f = {
            data: null,
            layer: e,
            linkService: m.linkService,
            downloadManager: m.downloadManager,
            imageResourcesPath: m.imageResourcesPath || "",
            renderForms: m.renderForms !== !1,
            svgFactory: new z.DOMSVGFactory(),
            annotationStorage: m.annotationStorage || new N.AnnotationStorage(),
            enableScripting: m.enableScripting === !0,
            hasJSActions: m.hasJSActions,
            fieldObjects: m.fieldObjects,
            parent: this,
            elements: null
          };
          for (const o of h) {
            if (o.noHTML)
              continue;
            const a = o.annotationType === w.AnnotationType.POPUP;
            if (a) {
              const E = n.get(o.id);
              if (!E)
                continue;
              f.elements = E;
            } else {
              const {
                width: E,
                height: R
              } = l(o.rect);
              if (E <= 0 || R <= 0)
                continue;
            }
            f.data = o;
            const d = b.create(f);
            if (!d.isRenderable)
              continue;
            if (!a && o.popupRef) {
              const E = n.get(o.popupRef);
              E ? E.push(d) : n.set(o.popupRef, [d]);
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
          this.viewport = m, (0, z.setLayerDimensions)(h, {
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
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        AnnotationStorage: () => (
          /* binding */
          L
        ),
        /* harmony export */
        PrintAnnotationStorage: () => (
          /* binding */
          C
        ),
        /* harmony export */
        SerializableEmpty: () => (
          /* binding */
          $
        )
        /* harmony export */
      });
      var w = U(292), z = U(310), N = U(651);
      const $ = Object.freeze({
        map: null,
        hash: "",
        transfer: void 0
      });
      class L {
        #t = !1;
        #e = /* @__PURE__ */ new Map();
        constructor() {
          this.onSetModified = null, this.onResetModified = null, this.onAnnotationEditor = null;
        }
        getValue(v, r) {
          const c = this.#e.get(v);
          return c === void 0 ? r : Object.assign(r, c);
        }
        getRawValue(v) {
          return this.#e.get(v);
        }
        remove(v) {
          if (this.#e.delete(v), this.#e.size === 0 && this.resetModified(), typeof this.onAnnotationEditor == "function") {
            for (const r of this.#e.values())
              if (r instanceof z.AnnotationEditor)
                return;
            this.onAnnotationEditor(null);
          }
        }
        setValue(v, r) {
          const c = this.#e.get(v);
          let l = !1;
          if (c !== void 0)
            for (const [b, s] of Object.entries(r))
              c[b] !== s && (l = !0, c[b] = s);
          else
            l = !0, this.#e.set(v, r);
          l && this.#s(), r instanceof z.AnnotationEditor && typeof this.onAnnotationEditor == "function" && this.onAnnotationEditor(r.constructor._type);
        }
        has(v) {
          return this.#e.has(v);
        }
        getAll() {
          return this.#e.size > 0 ? (0, w.objectFromMap)(this.#e) : null;
        }
        setAll(v) {
          for (const [r, c] of Object.entries(v))
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
          return new C(this);
        }
        get serializable() {
          if (this.#e.size === 0)
            return $;
          const v = /* @__PURE__ */ new Map(), r = new N.MurmurHash3_64(), c = [], l = /* @__PURE__ */ Object.create(null);
          let b = !1;
          for (const [s, g] of this.#e) {
            const t = g instanceof z.AnnotationEditor ? g.serialize(!1, l) : g;
            t && (v.set(s, t), r.update(`${s}:${JSON.stringify(t)}`), b ||= !!t.bitmap);
          }
          if (b)
            for (const s of v.values())
              s.bitmap && c.push(s.bitmap);
          return v.size > 0 ? {
            map: v,
            hash: r.hexdigest(),
            transfer: c
          } : $;
        }
        get editorStats() {
          let v = null;
          const r = /* @__PURE__ */ new Map();
          for (const c of this.#e.values()) {
            if (!(c instanceof z.AnnotationEditor))
              continue;
            const l = c.telemetryFinalData;
            if (!l)
              continue;
            const {
              type: b
            } = l;
            r.has(b) || r.set(b, Object.getPrototypeOf(c).constructor), v ||= /* @__PURE__ */ Object.create(null);
            const s = v[b] ||= /* @__PURE__ */ new Map();
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
            v[c] = l.computeTelemetryFinalData(v[c]);
          return v;
        }
      }
      class C extends L {
        #t;
        constructor(v) {
          super();
          const {
            map: r,
            hash: c,
            transfer: l
          } = v.serializable, b = structuredClone(r, l ? {
            transfer: l
          } : null);
          this.#t = {
            map: b,
            hash: c,
            transfer: l
          };
        }
        get print() {
          (0, w.unreachable)("Should not call PrintAnnotationStorage.print");
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
    (ct, st, U) => {
      U.a(ct, async (w, z) => {
        try {
          let nt = function(o) {
            if (typeof o == "string" || o instanceof URL ? o = {
              url: o
            } : (o instanceof ArrayBuffer || ArrayBuffer.isView(o)) && (o = {
              data: o
            }), typeof o != "object")
              throw new Error("Invalid parameter in getDocument, need parameter object.");
            if (!o.url && !o.data && !o.range)
              throw new Error("Invalid parameter object: need either .data, .range or .url");
            const a = new tt(), {
              docId: d
            } = a, A = o.url ? _(o.url) : null, E = o.data ? G(o.data) : null, R = o.httpHeaders || null, k = o.withCredentials === !0, D = o.password ?? null, I = o.range instanceof Z ? o.range : null, F = Number.isInteger(o.rangeChunkSize) && o.rangeChunkSize > 0 ? o.rangeChunkSize : S;
            let T = o.worker instanceof ot ? o.worker : null;
            const V = o.verbosity, K = typeof o.docBaseUrl == "string" && !(0, L.isDataScheme)(o.docBaseUrl) ? o.docBaseUrl : null, X = typeof o.cMapUrl == "string" ? o.cMapUrl : null, W = o.cMapPacked !== !1, rt = o.CMapReaderFactory || H, J = typeof o.standardFontDataUrl == "string" ? o.standardFontDataUrl : null, Q = o.StandardFontDataFactory || q, it = o.stopAtErrors !== !0, ht = Number.isInteger(o.maxImageSize) && o.maxImageSize > -1 ? o.maxImageSize : -1, gt = o.isEvalSupported !== !1, bt = typeof o.isOffscreenCanvasSupported == "boolean" ? o.isOffscreenCanvasSupported : !N.isNodeJS, At = Number.isInteger(o.canvasMaxAreaInBytes) ? o.canvasMaxAreaInBytes : -1, mt = typeof o.disableFontFace == "boolean" ? o.disableFontFace : N.isNodeJS, Ct = o.fontExtraProperties === !0, St = o.enableXfa === !0, Tt = o.ownerDocument || globalThis.document, vt = o.disableRange === !0, Et = o.disableStream === !0, Rt = o.disableAutoFetch === !0, Lt = o.pdfBug === !0, It = I ? I.length : o.length ?? NaN, _t = typeof o.useSystemFonts == "boolean" ? o.useSystemFonts : !N.isNodeJS && !mt, Pt = typeof o.useWorkerFetch == "boolean" ? o.useWorkerFetch : rt === L.DOMCMapReaderFactory && Q === L.DOMStandardFontDataFactory && X && J && (0, L.isValidFetchUrl)(X, document.baseURI) && (0, L.isValidFetchUrl)(J, document.baseURI), xt = o.canvasFactory || new O({
              ownerDocument: Tt
            }), wt = o.filterFactory || new B({
              docId: d,
              ownerDocument: Tt
            }), Ht = null;
            (0, N.setVerbosityLevel)(V);
            const Nt = {
              canvasFactory: xt,
              filterFactory: wt
            };
            if (Pt || (Nt.cMapReaderFactory = new rt({
              baseUrl: X,
              isCompressed: W
            }), Nt.standardFontDataFactory = new Q({
              baseUrl: J
            })), !T) {
              const Dt = {
                verbosity: V,
                port: c.GlobalWorkerOptions.workerPort
              };
              T = Dt.port ? ot.fromPort(Dt) : new ot(Dt), a._worker = T;
            }
            const Mt = {
              docId: d,
              apiVersion: "4.2.67",
              data: E,
              password: D,
              disableAutoFetch: Rt,
              rangeChunkSize: F,
              length: It,
              docBaseUrl: K,
              enableXfa: St,
              evaluatorOptions: {
                maxImageSize: ht,
                disableFontFace: mt,
                ignoreErrors: it,
                isEvalSupported: gt,
                isOffscreenCanvasSupported: bt,
                canvasMaxAreaInBytes: At,
                fontExtraProperties: Ct,
                useSystemFonts: _t,
                cMapUrl: Pt ? X : null,
                standardFontDataUrl: Pt ? J : null
              }
            }, yt = {
              ignoreErrors: it,
              disableFontFace: mt,
              fontExtraProperties: Ct,
              enableXfa: St,
              ownerDocument: Tt,
              disableAutoFetch: Rt,
              pdfBug: Lt,
              styleElement: Ht
            };
            return T.promise.then(function() {
              if (a.destroyed)
                throw new Error("Loading aborted");
              const Dt = j(T, Mt), $t = new Promise(function(Bt) {
                let Ot;
                I ? Ot = new g.PDFDataTransportStream(I, {
                  disableRange: vt,
                  disableStream: Et
                }) : E || (Ot = ((kt) => N.isNodeJS ? function() {
                  return typeof fetch < "u" && typeof Response < "u" && "body" in Response.prototype;
                }() && (0, L.isValidFetchUrl)(kt.url) ? new t.PDFFetchStream(kt) : new u.PDFNodeStream(kt) : (0, L.isValidFetchUrl)(kt.url) ? new t.PDFFetchStream(kt) : new i.PDFNetworkStream(kt))({
                  url: A,
                  length: It,
                  httpHeaders: R,
                  withCredentials: k,
                  rangeChunkSize: F,
                  disableRange: vt,
                  disableStream: Et
                })), Bt(Ot);
              });
              return Promise.all([Dt, $t]).then(function([Bt, Ot]) {
                if (a.destroyed)
                  throw new Error("Loading aborted");
                const zt = new l.MessageHandler(d, Bt, T.port), kt = new ut(zt, a, Ot, yt, Nt);
                a._transport = kt, zt.send("Ready", null);
              });
            }).catch(a._capability.reject), a;
          }, _ = function(o) {
            if (o instanceof URL)
              return o.href;
            try {
              return new URL(o, window.location).href;
            } catch {
              if (N.isNodeJS && typeof o == "string")
                return o;
            }
            throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
          }, G = function(o) {
            if (N.isNodeJS && typeof Buffer < "u" && o instanceof Buffer)
              throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
            if (o instanceof Uint8Array && o.byteLength === o.buffer.byteLength)
              return o;
            if (typeof o == "string")
              return (0, N.stringToBytes)(o);
            if (o instanceof ArrayBuffer || ArrayBuffer.isView(o) || typeof o == "object" && !isNaN(o?.length))
              return new Uint8Array(o);
            throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
          }, Y = function(o) {
            return typeof o == "object" && Number.isInteger(o?.num) && o.num >= 0 && Number.isInteger(o?.gen) && o.gen >= 0;
          };
          U.d(st, {
            /* harmony export */
            PDFDataRangeTransport: () => (
              /* binding */
              Z
            ),
            /* harmony export */
            PDFWorker: () => (
              /* binding */
              ot
            ),
            /* harmony export */
            build: () => (
              /* binding */
              f
            ),
            /* harmony export */
            getDocument: () => (
              /* binding */
              nt
            ),
            /* harmony export */
            version: () => (
              /* binding */
              n
            )
            /* harmony export */
          });
          var N = U(292), $ = U(792), L = U(419), C = U(10), x = U(573), v = U(923), r = U(814), c = U(164), l = U(178), b = U(62), s = U(626), g = U(585), t = U(94), i = U(457), u = U(786), p = U(50), y = w([x, u]);
          [x, u] = y.then ? (await y)() : y;
          const S = 65536, P = 100, M = 5e3, O = N.isNodeJS ? x.NodeCanvasFactory : L.DOMCanvasFactory, H = N.isNodeJS ? x.NodeCMapReaderFactory : L.DOMCMapReaderFactory, B = N.isNodeJS ? x.NodeFilterFactory : L.DOMFilterFactory, q = N.isNodeJS ? x.NodeStandardFontDataFactory : L.DOMStandardFontDataFactory;
          async function j(o, a) {
            if (o.destroyed)
              throw new Error("Worker was destroyed");
            const d = await o.messageHandler.sendWithPromise("GetDocRequest", a, a.data ? [a.data.buffer] : null);
            if (o.destroyed)
              throw new Error("Worker was destroyed");
            return d;
          }
          class tt {
            static #t = 0;
            constructor() {
              this._capability = Promise.withResolvers(), this._transport = null, this._worker = null, this.docId = `d${tt.#t++}`, this.destroyed = !1, this.onPassword = null, this.onProgress = null;
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
          class Z {
            constructor(a, d, A = !1, E = null) {
              this.length = a, this.initialData = d, this.progressiveDone = A, this.contentDispositionFilename = E, this._rangeListeners = [], this._progressListeners = [], this._progressiveReadListeners = [], this._progressiveDoneListeners = [], this._readyCapability = Promise.withResolvers();
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
              (0, N.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
            }
            abort() {
            }
          }
          class at {
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
              return (0, N.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
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
          class lt {
            #t = null;
            #e = !1;
            constructor(a, d, A, E = !1) {
              this._pageIndex = a, this._pageInfo = d, this._transport = A, this._stats = E ? new L.StatTimer() : null, this._pdfBug = E, this.commonObjs = A.commonObjs, this.objs = new m(), this._maybeCleanupAfterRender = !1, this._intentStates = /* @__PURE__ */ new Map(), this.destroyed = !1;
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
              offsetY: E = 0,
              dontFlip: R = !1
            } = {}) {
              return new L.PageViewport({
                viewBox: this.view,
                scale: a,
                rotation: d,
                offsetX: A,
                offsetY: E,
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
              return (0, N.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
            }
            async getXfa() {
              return this._transport._htmlForXfa?.children[this._pageIndex] || null;
            }
            render({
              canvasContext: a,
              viewport: d,
              intent: A = "display",
              annotationMode: E = N.AnnotationMode.ENABLE,
              transform: R = null,
              background: k = null,
              optionalContentConfigPromise: D = null,
              annotationCanvasMap: I = null,
              pageColors: F = null,
              printAnnotationStorage: T = null
            }) {
              this._stats?.time("Overall");
              const V = this._transport.getRenderingIntent(A, E, T), {
                renderingIntent: K,
                cacheKey: X
              } = V;
              this.#e = !1, this.#n(), D ||= this._transport.getOptionalContentConfig(K);
              let W = this._intentStates.get(X);
              W || (W = /* @__PURE__ */ Object.create(null), this._intentStates.set(X, W)), W.streamReaderCancelTimeout && (clearTimeout(W.streamReaderCancelTimeout), W.streamReaderCancelTimeout = null);
              const rt = !!(K & N.RenderingIntentFlag.PRINT);
              W.displayReadyCapability || (W.displayReadyCapability = Promise.withResolvers(), W.operatorList = {
                fnArray: [],
                argsArray: [],
                lastChunk: !1,
                separateAnnots: null
              }, this._stats?.time("Page Request"), this._pumpOperatorList(V));
              const J = (ht) => {
                W.renderTasks.delete(Q), (this._maybeCleanupAfterRender || rt) && (this.#e = !0), this.#s(!rt), ht ? (Q.capability.reject(ht), this._abortOperatorList({
                  intentState: W,
                  reason: ht instanceof Error ? ht : new Error(ht)
                })) : Q.capability.resolve(), this._stats?.timeEnd("Rendering"), this._stats?.timeEnd("Overall");
              }, Q = new e({
                callback: J,
                params: {
                  canvasContext: a,
                  viewport: d,
                  transform: R,
                  background: k
                },
                objs: this.objs,
                commonObjs: this.commonObjs,
                annotationCanvasMap: I,
                operatorList: W.operatorList,
                pageIndex: this._pageIndex,
                canvasFactory: this._transport.canvasFactory,
                filterFactory: this._transport.filterFactory,
                useRequestAnimationFrame: !rt,
                pdfBug: this._pdfBug,
                pageColors: F
              });
              (W.renderTasks ||= /* @__PURE__ */ new Set()).add(Q);
              const it = Q.task;
              return Promise.all([W.displayReadyCapability.promise, D]).then(([ht, gt]) => {
                if (this.destroyed) {
                  J();
                  return;
                }
                if (this._stats?.time("Rendering"), !(gt.renderingIntent & K))
                  throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.");
                Q.initializeGraphics({
                  transparency: ht,
                  optionalContentConfig: gt
                }), Q.operatorListChanged();
              }).catch(J), it;
            }
            getOperatorList({
              intent: a = "display",
              annotationMode: d = N.AnnotationMode.ENABLE,
              printAnnotationStorage: A = null
            } = {}) {
              function E() {
                k.operatorList.lastChunk && (k.opListReadCapability.resolve(k.operatorList), k.renderTasks.delete(D));
              }
              const R = this._transport.getRenderingIntent(a, d, A, !0);
              let k = this._intentStates.get(R.cacheKey);
              k || (k = /* @__PURE__ */ Object.create(null), this._intentStates.set(R.cacheKey, k));
              let D;
              return k.opListReadCapability || (D = /* @__PURE__ */ Object.create(null), D.operatorListChanged = E, k.opListReadCapability = Promise.withResolvers(), (k.renderTasks ||= /* @__PURE__ */ new Set()).add(D), k.operatorList = {
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
                size(E) {
                  return E.items.length;
                }
              });
            }
            getTextContent(a = {}) {
              if (this._transport._htmlForXfa)
                return this.getXfa().then((A) => p.XfaText.textContent(A));
              const d = this.streamTextContent(a);
              return new Promise(function(A, E) {
                function R() {
                  k.read().then(function({
                    value: I,
                    done: F
                  }) {
                    if (F) {
                      A(D);
                      return;
                    }
                    Object.assign(D.styles, I.styles), D.items.push(...I.items), R();
                  }, E);
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
              return a && d && (this._stats &&= new L.StatTimer()), d;
            }
            #s(a = !1) {
              if (this.#n(), !this.#e || this.destroyed)
                return !1;
              if (a)
                return this.#t = setTimeout(() => {
                  this.#t = null, this.#s(!1);
                }, M), !1;
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
              for (let A = 0, E = a.length; A < E; A++)
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
                map: E,
                transfer: R
              } = A, D = this._transport.messageHandler.sendWithStream("GetOperatorList", {
                pageIndex: this._pageIndex,
                intent: a,
                cacheKey: d,
                annotationStorage: E
              }, R).getReader(), I = this._intentStates.get(d);
              I.streamReader = D;
              const F = () => {
                D.read().then(({
                  value: T,
                  done: V
                }) => {
                  if (V) {
                    I.streamReader = null;
                    return;
                  }
                  this._transport.destroyed || (this._renderPageChunk(T, I), F());
                }, (T) => {
                  if (I.streamReader = null, !this._transport.destroyed) {
                    if (I.operatorList) {
                      I.operatorList.lastChunk = !0;
                      for (const V of I.renderTasks)
                        V.operatorListChanged();
                      this.#s(!0);
                    }
                    if (I.displayReadyCapability)
                      I.displayReadyCapability.reject(T);
                    else if (I.opListReadCapability)
                      I.opListReadCapability.reject(T);
                    else
                      throw T;
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
                  if (d instanceof L.RenderingCancelledException) {
                    let E = P;
                    d.extraDelay > 0 && d.extraDelay < 1e3 && (E += d.extraDelay), a.streamReaderCancelTimeout = setTimeout(() => {
                      a.streamReaderCancelTimeout = null, this._abortOperatorList({
                        intentState: a,
                        reason: d,
                        force: !0
                      });
                    }, E);
                    return;
                  }
                }
                if (a.streamReader.cancel(new N.AbortException(d.message)).catch(() => {
                }), a.streamReader = null, !this._transport.destroyed) {
                  for (const [E, R] of this._intentStates)
                    if (R === a) {
                      this._intentStates.delete(E);
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
          class pt {
            #t = /* @__PURE__ */ new Set();
            #e = Promise.resolve();
            postMessage(a, d) {
              const A = {
                data: structuredClone(a, d ? {
                  transfer: d
                } : null)
              };
              this.#e.then(() => {
                for (const E of this.#t)
                  E.call(this, A);
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
          const dt = {
            isWorkerDisabled: !1,
            fakeWorkerId: 0
          };
          N.isNodeJS && (dt.isWorkerDisabled = !0, c.GlobalWorkerOptions.workerSrc ||= "./pdf.worker.mjs"), dt.isSameOrigin = function(o, a) {
            let d;
            try {
              if (d = new URL(o), !d.origin || d.origin === "null")
                return !1;
            } catch {
              return !1;
            }
            const A = new URL(a, d);
            return d.origin === A.origin;
          }, dt.createCDNWrapper = function(o) {
            const a = `await import("${o}");`;
            return URL.createObjectURL(new Blob([a], {
              type: "text/javascript"
            }));
          };
          class ot {
            static #t;
            constructor({
              name: a = null,
              port: d = null,
              verbosity: A = (0, N.getVerbosityLevel)()
            } = {}) {
              if (this.name = a, this.destroyed = !1, this.verbosity = A, this._readyCapability = Promise.withResolvers(), this._port = null, this._webWorker = null, this._messageHandler = null, d) {
                if (ot.#t?.has(d))
                  throw new Error("Cannot use more than one PDFWorker per port.");
                (ot.#t ||= /* @__PURE__ */ new WeakMap()).set(d, this), this._initializeFromPort(d);
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
              if (!dt.isWorkerDisabled && !ot.#e) {
                let {
                  workerSrc: a
                } = ot;
                try {
                  dt.isSameOrigin(window.location.href, a) || (a = dt.createCDNWrapper(new URL(a, window.location).href));
                  const d = new Worker(a, {
                    type: "module"
                  }), A = new l.MessageHandler("main", "worker", d), E = () => {
                    d.removeEventListener("error", R), A.destroy(), d.terminate(), this.destroyed ? this._readyCapability.reject(new Error("Worker was destroyed")) : this._setupFakeWorker();
                  }, R = () => {
                    this._webWorker || E();
                  };
                  d.addEventListener("error", R), A.on("test", (D) => {
                    if (d.removeEventListener("error", R), this.destroyed) {
                      E();
                      return;
                    }
                    D ? (this._messageHandler = A, this._port = d, this._webWorker = d, this._readyCapability.resolve(), A.send("configure", {
                      verbosity: this.verbosity
                    })) : (this._setupFakeWorker(), A.destroy(), d.terminate());
                  }), A.on("ready", (D) => {
                    if (d.removeEventListener("error", R), this.destroyed) {
                      E();
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
                  (0, N.info)("The worker has been disabled.");
                }
              }
              this._setupFakeWorker();
            }
            _setupFakeWorker() {
              dt.isWorkerDisabled || ((0, N.warn)("Setting up fake worker."), dt.isWorkerDisabled = !0), ot._setupFakeWorkerGlobal.then((a) => {
                if (this.destroyed) {
                  this._readyCapability.reject(new Error("Worker was destroyed"));
                  return;
                }
                const d = new pt();
                this._port = d;
                const A = `fake${dt.fakeWorkerId++}`, E = new l.MessageHandler(A + "_worker", A, d);
                a.setup(E, d);
                const R = new l.MessageHandler(A, A + "_worker", d);
                this._messageHandler = R, this._readyCapability.resolve(), R.send("configure", {
                  verbosity: this.verbosity
                });
              }).catch((a) => {
                this._readyCapability.reject(new Error(`Setting up fake worker failed: "${a.message}".`));
              });
            }
            destroy() {
              this.destroyed = !0, this._webWorker && (this._webWorker.terminate(), this._webWorker = null), ot.#t?.delete(this._port), this._port = null, this._messageHandler && (this._messageHandler.destroy(), this._messageHandler = null);
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
              return new ot(a);
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
              return (0, N.shadow)(this, "_setupFakeWorkerGlobal", a());
            }
          }
          class ut {
            #t = /* @__PURE__ */ new Map();
            #e = /* @__PURE__ */ new Map();
            #s = /* @__PURE__ */ new Map();
            #n = /* @__PURE__ */ new Map();
            #r = null;
            constructor(a, d, A, E, R) {
              this.messageHandler = a, this.loadingTask = d, this.commonObjs = new m(), this.fontLoader = new C.FontLoader({
                ownerDocument: E.ownerDocument,
                styleElement: E.styleElement
              }), this._params = E, this.canvasFactory = R.canvasFactory, this.filterFactory = R.filterFactory, this.cMapReaderFactory = R.cMapReaderFactory, this.standardFontDataFactory = R.standardFontDataFactory, this.destroyed = !1, this.destroyCapability = null, this._networkStream = A, this._fullReader = null, this._lastProgress = null, this.downloadInfoCapability = Promise.withResolvers(), this.setupMessageHandler();
            }
            #i(a, d = null) {
              const A = this.#t.get(a);
              if (A)
                return A;
              const E = this.messageHandler.sendWithPromise(a, d);
              return this.#t.set(a, E), E;
            }
            get annotationStorage() {
              return (0, N.shadow)(this, "annotationStorage", new $.AnnotationStorage());
            }
            getRenderingIntent(a, d = N.AnnotationMode.ENABLE, A = null, E = !1) {
              let R = N.RenderingIntentFlag.DISPLAY, k = $.SerializableEmpty;
              switch (a) {
                case "any":
                  R = N.RenderingIntentFlag.ANY;
                  break;
                case "display":
                  break;
                case "print":
                  R = N.RenderingIntentFlag.PRINT;
                  break;
                default:
                  (0, N.warn)(`getRenderingIntent - invalid intent: ${a}`);
              }
              switch (d) {
                case N.AnnotationMode.DISABLE:
                  R += N.RenderingIntentFlag.ANNOTATIONS_DISABLE;
                  break;
                case N.AnnotationMode.ENABLE:
                  break;
                case N.AnnotationMode.ENABLE_FORMS:
                  R += N.RenderingIntentFlag.ANNOTATIONS_FORMS;
                  break;
                case N.AnnotationMode.ENABLE_STORAGE:
                  R += N.RenderingIntentFlag.ANNOTATIONS_STORAGE, k = (R & N.RenderingIntentFlag.PRINT && A instanceof $.PrintAnnotationStorage ? A : this.annotationStorage).serializable;
                  break;
                default:
                  (0, N.warn)(`getRenderingIntent - invalid annotationMode: ${d}`);
              }
              return E && (R += N.RenderingIntentFlag.OPLIST), {
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
                this.commonObjs.clear(), this.fontLoader.clear(), this.#t.clear(), this.filterFactory.destroy(), (0, r.cleanupTextLayer)(), this._networkStream?.cancelAllRequests(new N.AbortException("Worker was terminated.")), this.messageHandler && (this.messageHandler.destroy(), this.messageHandler = null), this.destroyCapability.resolve();
              }, this.destroyCapability.reject), this.destroyCapability.promise;
            }
            setupMessageHandler() {
              const {
                messageHandler: a,
                loadingTask: d
              } = this;
              a.on("GetReader", (A, E) => {
                (0, N.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available."), this._fullReader = this._networkStream.getFullReader(), this._fullReader.onProgress = (R) => {
                  this._lastProgress = {
                    loaded: R.loaded,
                    total: R.total
                  };
                }, E.onPull = () => {
                  this._fullReader.read().then(function({
                    value: R,
                    done: k
                  }) {
                    if (k) {
                      E.close();
                      return;
                    }
                    (0, N.assert)(R instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."), E.enqueue(new Uint8Array(R), 1, [R]);
                  }).catch((R) => {
                    E.error(R);
                  });
                }, E.onCancel = (R) => {
                  this._fullReader.cancel(R), E.ready.catch((k) => {
                    if (!this.destroyed)
                      throw k;
                  });
                };
              }), a.on("ReaderHeadersReady", (A) => {
                const E = Promise.withResolvers(), R = this._fullReader;
                return R.headersReady.then(() => {
                  (!R.isStreamingSupported || !R.isRangeSupported) && (this._lastProgress && d.onProgress?.(this._lastProgress), R.onProgress = (k) => {
                    d.onProgress?.({
                      loaded: k.loaded,
                      total: k.total
                    });
                  }), E.resolve({
                    isStreamingSupported: R.isStreamingSupported,
                    isRangeSupported: R.isRangeSupported,
                    contentLength: R.contentLength
                  });
                }, E.reject), E.promise;
              }), a.on("GetRangeReader", (A, E) => {
                (0, N.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
                const R = this._networkStream.getRangeReader(A.begin, A.end);
                if (!R) {
                  E.close();
                  return;
                }
                E.onPull = () => {
                  R.read().then(function({
                    value: k,
                    done: D
                  }) {
                    if (D) {
                      E.close();
                      return;
                    }
                    (0, N.assert)(k instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."), E.enqueue(new Uint8Array(k), 1, [k]);
                  }).catch((k) => {
                    E.error(k);
                  });
                }, E.onCancel = (k) => {
                  R.cancel(k), E.ready.catch((D) => {
                    if (!this.destroyed)
                      throw D;
                  });
                };
              }), a.on("GetDoc", ({
                pdfInfo: A
              }) => {
                this._numPages = A.numPages, this._htmlForXfa = A.htmlForXfa, delete A.htmlForXfa, d._capability.resolve(new at(A, this));
              }), a.on("DocException", function(A) {
                let E;
                switch (A.name) {
                  case "PasswordException":
                    E = new N.PasswordException(A.message, A.code);
                    break;
                  case "InvalidPDFException":
                    E = new N.InvalidPDFException(A.message);
                    break;
                  case "MissingPDFException":
                    E = new N.MissingPDFException(A.message);
                    break;
                  case "UnexpectedResponseException":
                    E = new N.UnexpectedResponseException(A.message, A.status);
                    break;
                  case "UnknownErrorException":
                    E = new N.UnknownErrorException(A.message, A.details);
                    break;
                  default:
                    (0, N.unreachable)("DocException - expected a valid Error.");
                }
                d._capability.reject(E);
              }), a.on("PasswordRequest", (A) => {
                if (this.#r = Promise.withResolvers(), d.onPassword) {
                  const E = (R) => {
                    R instanceof Error ? this.#r.reject(R) : this.#r.resolve({
                      password: R
                    });
                  };
                  try {
                    d.onPassword(E, A.code);
                  } catch (R) {
                    this.#r.reject(R);
                  }
                } else
                  this.#r.reject(new N.PasswordException(A.message, A.code));
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
              }), a.on("commonobj", ([A, E, R]) => {
                if (this.destroyed || this.commonObjs.has(A))
                  return null;
                switch (E) {
                  case "Font":
                    const k = this._params;
                    if ("error" in R) {
                      const T = R.error;
                      (0, N.warn)(`Error during font loading: ${T}`), this.commonObjs.resolve(A, T);
                      break;
                    }
                    const D = k.pdfBug && globalThis.FontInspector?.enabled ? (T, V) => globalThis.FontInspector.fontAdded(T, V) : null, I = new C.FontFaceObject(R, {
                      disableFontFace: k.disableFontFace,
                      ignoreErrors: k.ignoreErrors,
                      inspectFont: D
                    });
                    this.fontLoader.bind(I).catch(() => a.sendWithPromise("FontFallback", {
                      id: A
                    })).finally(() => {
                      !k.fontExtraProperties && I.data && (I.data = null), this.commonObjs.resolve(A, I);
                    });
                    break;
                  case "CopyLocalImage":
                    const {
                      imageRef: F
                    } = R;
                    (0, N.assert)(F, "The imageRef must be defined.");
                    for (const T of this.#e.values())
                      for (const [, V] of T.objs)
                        if (V.ref === F)
                          return V.dataLen ? (this.commonObjs.resolve(A, structuredClone(V)), V.dataLen) : null;
                    break;
                  case "FontPath":
                  case "Image":
                  case "Pattern":
                    this.commonObjs.resolve(A, R);
                    break;
                  default:
                    throw new Error(`Got unknown common object type ${E}`);
                }
                return null;
              }), a.on("obj", ([A, E, R, k]) => {
                if (this.destroyed)
                  return;
                const D = this.#e.get(E);
                if (!D.objs.has(A)) {
                  if (D._intentStates.size === 0) {
                    k?.bitmap?.close();
                    return;
                  }
                  switch (R) {
                    case "Image":
                      D.objs.resolve(A, k), k?.dataLen > N.MAX_IMAGE_SIZE_TO_CACHE && (D._maybeCleanupAfterRender = !0);
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
              this.annotationStorage.size <= 0 && (0, N.warn)("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
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
              const E = this.messageHandler.sendWithPromise("GetPage", {
                pageIndex: d
              }).then((R) => {
                if (this.destroyed)
                  throw new Error("Transport destroyed");
                R.refStr && this.#n.set(R.refStr, a);
                const k = new lt(d, R, this, this._params.pdfBug);
                return this.#e.set(d, k), k;
              });
              return this.#s.set(d, E), E;
            }
            getPageIndex(a) {
              return Y(a) ? this.messageHandler.sendWithPromise("GetPageIndex", {
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
              const A = this.messageHandler.sendWithPromise(a, null).then((E) => ({
                info: E[0],
                metadata: E[1] ? new b.Metadata(E[1]) : null,
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
              if (!Y(a))
                return null;
              const d = a.gen === 0 ? `${a.num}R` : `${a.num}R${a.gen}`;
              return this.#n.get(d) ?? null;
            }
            get loadingParams() {
              const {
                disableAutoFetch: a,
                enableXfa: d
              } = this._params;
              return (0, N.shadow)(this, "loadingParams", {
                disableAutoFetch: a,
                enableXfa: d
              });
            }
          }
          const et = Symbol("INITIAL_DATA");
          class m {
            #t = /* @__PURE__ */ Object.create(null);
            #e(a) {
              return this.#t[a] ||= {
                ...Promise.withResolvers(),
                data: et
              };
            }
            get(a, d = null) {
              if (d) {
                const E = this.#e(a);
                return E.promise.then(() => d(E.data)), null;
              }
              const A = this.#t[a];
              if (!A || A.data === et)
                throw new Error(`Requesting object that isn't resolved yet ${a}.`);
              return A.data;
            }
            has(a) {
              const d = this.#t[a];
              return !!d && d.data !== et;
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
                d !== et && (yield [a, d]);
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
              commonObjs: E,
              annotationCanvasMap: R,
              operatorList: k,
              pageIndex: D,
              canvasFactory: I,
              filterFactory: F,
              useRequestAnimationFrame: T = !1,
              pdfBug: V = !1,
              pageColors: K = null
            }) {
              this.callback = a, this.params = d, this.objs = A, this.commonObjs = E, this.annotationCanvasMap = R, this.operatorListIdx = null, this.operatorList = k, this._pageIndex = D, this.canvasFactory = I, this.filterFactory = F, this._pdfBug = V, this.pageColors = K, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = T === !0 && typeof window < "u", this.cancelled = !1, this.capability = Promise.withResolvers(), this.task = new h(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = d.canvasContext.canvas;
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
                viewport: E,
                transform: R,
                background: k
              } = this.params;
              this.gfx = new v.CanvasGraphics(A, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
                optionalContentConfig: d
              }, this.annotationCanvasMap, this.pageColors), this.gfx.beginDrawing({
                transform: R,
                viewport: E,
                transparency: a,
                background: k
              }), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback?.();
            }
            cancel(a = null, d = 0) {
              this.running = !1, this.cancelled = !0, this.gfx?.endDrawing(), e.#t.delete(this._canvas), this.callback(a || new L.RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, d));
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
          z();
        } catch (S) {
          z(S);
        }
      });
    }
  ),
  /***/
  583: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        BaseCMapReaderFactory: () => (
          /* binding */
          $
        ),
        /* harmony export */
        BaseCanvasFactory: () => (
          /* binding */
          N
        ),
        /* harmony export */
        BaseFilterFactory: () => (
          /* binding */
          z
        ),
        /* harmony export */
        BaseSVGFactory: () => (
          /* binding */
          C
        ),
        /* harmony export */
        BaseStandardFontDataFactory: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var w = U(292);
      class z {
        constructor() {
          this.constructor === z && (0, w.unreachable)("Cannot initialize BaseFilterFactory.");
        }
        addFilter(v) {
          return "none";
        }
        addHCMFilter(v, r) {
          return "none";
        }
        addHighlightHCMFilter(v, r, c, l, b) {
          return "none";
        }
        destroy(v = !1) {
        }
      }
      class N {
        constructor() {
          this.constructor === N && (0, w.unreachable)("Cannot initialize BaseCanvasFactory.");
        }
        create(v, r) {
          if (v <= 0 || r <= 0)
            throw new Error("Invalid canvas size");
          const c = this._createCanvas(v, r);
          return {
            canvas: c,
            context: c.getContext("2d")
          };
        }
        reset(v, r, c) {
          if (!v.canvas)
            throw new Error("Canvas is not specified");
          if (r <= 0 || c <= 0)
            throw new Error("Invalid canvas size");
          v.canvas.width = r, v.canvas.height = c;
        }
        destroy(v) {
          if (!v.canvas)
            throw new Error("Canvas is not specified");
          v.canvas.width = 0, v.canvas.height = 0, v.canvas = null, v.context = null;
        }
        _createCanvas(v, r) {
          (0, w.unreachable)("Abstract method `_createCanvas` called.");
        }
      }
      class $ {
        constructor({
          baseUrl: v = null,
          isCompressed: r = !0
        }) {
          this.constructor === $ && (0, w.unreachable)("Cannot initialize BaseCMapReaderFactory."), this.baseUrl = v, this.isCompressed = r;
        }
        async fetch({
          name: v
        }) {
          if (!this.baseUrl)
            throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
          if (!v)
            throw new Error("CMap name must be specified.");
          const r = this.baseUrl + v + (this.isCompressed ? ".bcmap" : ""), c = this.isCompressed ? w.CMapCompressionType.BINARY : w.CMapCompressionType.NONE;
          return this._fetchData(r, c).catch((l) => {
            throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${r}`);
          });
        }
        _fetchData(v, r) {
          (0, w.unreachable)("Abstract method `_fetchData` called.");
        }
      }
      class L {
        constructor({
          baseUrl: v = null
        }) {
          this.constructor === L && (0, w.unreachable)("Cannot initialize BaseStandardFontDataFactory."), this.baseUrl = v;
        }
        async fetch({
          filename: v
        }) {
          if (!this.baseUrl)
            throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
          if (!v)
            throw new Error("Font filename must be specified.");
          const r = `${this.baseUrl}${v}`;
          return this._fetchData(r).catch((c) => {
            throw new Error(`Unable to load font data at: ${r}`);
          });
        }
        _fetchData(v) {
          (0, w.unreachable)("Abstract method `_fetchData` called.");
        }
      }
      class C {
        constructor() {
          this.constructor === C && (0, w.unreachable)("Cannot initialize BaseSVGFactory.");
        }
        create(v, r, c = !1) {
          if (v <= 0 || r <= 0)
            throw new Error("Invalid SVG dimensions");
          const l = this._createSVG("svg:svg");
          return l.setAttribute("version", "1.1"), c || (l.setAttribute("width", `${v}px`), l.setAttribute("height", `${r}px`)), l.setAttribute("preserveAspectRatio", "none"), l.setAttribute("viewBox", `0 0 ${v} ${r}`), l;
        }
        createElement(v) {
          if (typeof v != "string")
            throw new Error("Invalid SVG element type");
          return this._createSVG(v);
        }
        _createSVG(v) {
          (0, w.unreachable)("Abstract method `_createSVG` called.");
        }
      }
    }
  ),
  /***/
  923: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        CanvasGraphics: () => (
          /* binding */
          m
        )
      });
      var w = U(292), z = U(419);
      const N = {
        FILL: "Fill",
        STROKE: "Stroke",
        SHADING: "Shading"
      };
      function $(h, e) {
        if (!e)
          return;
        const n = e[2] - e[0], f = e[3] - e[1], o = new Path2D();
        o.rect(e[0], e[1], n, f), h.clip(o);
      }
      class L {
        constructor() {
          this.constructor === L && (0, w.unreachable)("Cannot initialize BaseShadingPattern.");
        }
        getPattern() {
          (0, w.unreachable)("Abstract method `getPattern` called.");
        }
      }
      class C extends L {
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
          if (o === N.STROKE || o === N.FILL) {
            const d = n.current.getClippedPathBoundingBox(o, (0, z.getCurrentTransform)(e)) || [0, 0, 0, 0], A = Math.ceil(d[2] - d[0]) || 1, E = Math.ceil(d[3] - d[1]) || 1, R = n.cachedCanvases.getCanvas("pattern", A, E, !0), k = R.context;
            k.clearRect(0, 0, k.canvas.width, k.canvas.height), k.beginPath(), k.rect(0, 0, k.canvas.width, k.canvas.height), k.translate(-d[0], -d[1]), f = w.Util.transform(f, [1, 0, 0, 1, d[0], d[1]]), k.transform(...n.baseTransform), this.matrix && k.transform(...this.matrix), $(k, this._bbox), k.fillStyle = this._createGradient(k), k.fill(), a = e.createPattern(R.canvas, "no-repeat");
            const D = new DOMMatrix(f);
            a.setTransform(D);
          } else
            $(e, this._bbox), a = this._createGradient(e);
          return a;
        }
      }
      function x(h, e, n, f, o, a, d, A) {
        const E = e.coords, R = e.colors, k = h.data, D = h.width * 4;
        let I;
        E[n + 1] > E[f + 1] && (I = n, n = f, f = I, I = a, a = d, d = I), E[f + 1] > E[o + 1] && (I = f, f = o, o = I, I = d, d = A, A = I), E[n + 1] > E[f + 1] && (I = n, n = f, f = I, I = a, a = d, d = I);
        const F = (E[n] + e.offsetX) * e.scaleX, T = (E[n + 1] + e.offsetY) * e.scaleY, V = (E[f] + e.offsetX) * e.scaleX, K = (E[f + 1] + e.offsetY) * e.scaleY, X = (E[o] + e.offsetX) * e.scaleX, W = (E[o + 1] + e.offsetY) * e.scaleY;
        if (T >= W)
          return;
        const rt = R[a], J = R[a + 1], Q = R[a + 2], it = R[d], ht = R[d + 1], gt = R[d + 2], bt = R[A], At = R[A + 1], mt = R[A + 2], Ct = Math.round(T), St = Math.round(W);
        let Tt, vt, Et, Rt, Lt, It, _t, Pt;
        for (let xt = Ct; xt <= St; xt++) {
          if (xt < K) {
            const yt = xt < T ? 0 : (T - xt) / (T - K);
            Tt = F - (F - V) * yt, vt = rt - (rt - it) * yt, Et = J - (J - ht) * yt, Rt = Q - (Q - gt) * yt;
          } else {
            let yt;
            xt > W ? yt = 1 : K === W ? yt = 0 : yt = (K - xt) / (K - W), Tt = V - (V - X) * yt, vt = it - (it - bt) * yt, Et = ht - (ht - At) * yt, Rt = gt - (gt - mt) * yt;
          }
          let wt;
          xt < T ? wt = 0 : xt > W ? wt = 1 : wt = (T - xt) / (T - W), Lt = F - (F - X) * wt, It = rt - (rt - bt) * wt, _t = J - (J - At) * wt, Pt = Q - (Q - mt) * wt;
          const Ht = Math.round(Math.min(Tt, Lt)), Nt = Math.round(Math.max(Tt, Lt));
          let Mt = D * xt + Ht * 4;
          for (let yt = Ht; yt <= Nt; yt++)
            wt = (Tt - yt) / (Tt - Lt), wt < 0 ? wt = 0 : wt > 1 && (wt = 1), k[Mt++] = vt - (vt - It) * wt | 0, k[Mt++] = Et - (Et - _t) * wt | 0, k[Mt++] = Rt - (Rt - Pt) * wt | 0, k[Mt++] = 255;
        }
      }
      function v(h, e, n) {
        const f = e.coords, o = e.colors;
        let a, d;
        switch (e.type) {
          case "lattice":
            const A = e.verticesPerRow, E = Math.floor(f.length / A) - 1, R = A - 1;
            for (a = 0; a < E; a++) {
              let k = a * A;
              for (let D = 0; D < R; D++, k++)
                x(h, n, f[k], f[k + 1], f[k + A], o[k], o[k + 1], o[k + A]), x(h, n, f[k + A + 1], f[k + 1], f[k + A], o[k + A + 1], o[k + 1], o[k + A]);
            }
            break;
          case "triangles":
            for (a = 0, d = f.length; a < d; a += 3)
              x(h, n, f[a], f[a + 1], f[a + 2], o[a], o[a + 1], o[a + 2]);
            break;
          default:
            throw new Error("illegal figure");
        }
      }
      class r extends L {
        constructor(e) {
          super(), this._coords = e[2], this._colors = e[3], this._figures = e[4], this._bounds = e[5], this._bbox = e[7], this._background = e[8], this.matrix = null;
        }
        _createMeshCanvas(e, n, f) {
          const A = Math.floor(this._bounds[0]), E = Math.floor(this._bounds[1]), R = Math.ceil(this._bounds[2]) - A, k = Math.ceil(this._bounds[3]) - E, D = Math.min(Math.ceil(Math.abs(R * e[0] * 1.1)), 3e3), I = Math.min(Math.ceil(Math.abs(k * e[1] * 1.1)), 3e3), F = R / D, T = k / I, V = {
            coords: this._coords,
            colors: this._colors,
            offsetX: -A,
            offsetY: -E,
            scaleX: 1 / F,
            scaleY: 1 / T
          }, K = D + 2 * 2, X = I + 2 * 2, W = f.getCanvas("mesh", K, X, !1), rt = W.context, J = rt.createImageData(D, I);
          if (n) {
            const it = J.data;
            for (let ht = 0, gt = it.length; ht < gt; ht += 4)
              it[ht] = n[0], it[ht + 1] = n[1], it[ht + 2] = n[2], it[ht + 3] = 255;
          }
          for (const it of this._figures)
            v(J, it, V);
          return rt.putImageData(J, 2, 2), {
            canvas: W.canvas,
            offsetX: A - 2 * F,
            offsetY: E - 2 * T,
            scaleX: F,
            scaleY: T
          };
        }
        getPattern(e, n, f, o) {
          $(e, this._bbox);
          let a;
          if (o === N.SHADING)
            a = w.Util.singularValueDecompose2dScale((0, z.getCurrentTransform)(e));
          else if (a = w.Util.singularValueDecompose2dScale(n.baseTransform), this.matrix) {
            const A = w.Util.singularValueDecompose2dScale(this.matrix);
            a = [a[0] * A[0], a[1] * A[1]];
          }
          const d = this._createMeshCanvas(a, o === N.SHADING ? null : this._background, n.cachedCanvases);
          return o !== N.SHADING && (e.setTransform(...n.baseTransform), this.matrix && e.transform(...this.matrix)), e.translate(d.offsetX, d.offsetY), e.scale(d.scaleX, d.scaleY), e.createPattern(d.canvas, "no-repeat");
        }
      }
      class c extends L {
        getPattern() {
          return "hotpink";
        }
      }
      function l(h) {
        switch (h[0]) {
          case "RadialAxial":
            return new C(h);
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
          const n = this.operatorList, f = this.bbox, o = this.xstep, a = this.ystep, d = this.paintType, A = this.tilingType, E = this.color, R = this.canvasGraphicsFactory;
          (0, w.info)("TilingType: " + A);
          const k = f[0], D = f[1], I = f[2], F = f[3], T = w.Util.singularValueDecompose2dScale(this.matrix), V = w.Util.singularValueDecompose2dScale(this.baseTransform), K = [T[0] * V[0], T[1] * V[1]], X = this.getSizeAndScale(o, this.ctx.canvas.width, K[0]), W = this.getSizeAndScale(a, this.ctx.canvas.height, K[1]), rt = e.cachedCanvases.getCanvas("pattern", X.size, W.size, !0), J = rt.context, Q = R.createCanvasGraphics(J);
          Q.groupLevel = e.groupLevel, this.setFillAndStrokeStyleToContext(Q, d, E);
          let it = k, ht = D, gt = I, bt = F;
          return k < 0 && (it = 0, gt += Math.abs(k)), D < 0 && (ht = 0, bt += Math.abs(D)), J.translate(-(X.scale * it), -(W.scale * ht)), Q.transform(X.scale, 0, 0, W.scale, 0, 0), J.save(), this.clipBbox(Q, it, ht, gt, bt), Q.baseTransform = (0, z.getCurrentTransform)(Q.ctx), Q.executeOperatorList(n), Q.endDrawing(), {
            canvas: rt.canvas,
            scaleX: X.scale,
            scaleY: W.scale,
            offsetX: it,
            offsetY: ht
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
          e.ctx.rect(n, f, d, A), e.current.updateRectMinMax((0, z.getCurrentTransform)(e.ctx), [n, f, o, a]), e.clip(), e.endPath();
        }
        setFillAndStrokeStyleToContext(e, n, f) {
          const o = e.ctx, a = e.current;
          switch (n) {
            case b.COLORED:
              const d = this.ctx;
              o.fillStyle = d.fillStyle, o.strokeStyle = d.strokeStyle, a.fillColor = d.fillStyle, a.strokeColor = d.strokeStyle;
              break;
            case b.UNCOLORED:
              const A = w.Util.makeHexColor(f[0], f[1], f[2]);
              o.fillStyle = A, o.strokeStyle = A, a.fillColor = A, a.strokeColor = A;
              break;
            default:
              throw new w.FormatError(`Unsupported paint type: ${n}`);
          }
        }
        getPattern(e, n, f, o) {
          let a = f;
          o !== N.SHADING && (a = w.Util.transform(a, n.baseTransform), this.matrix && (a = w.Util.transform(a, this.matrix)));
          const d = this.createPatternCanvas(n);
          let A = new DOMMatrix(a);
          A = A.translate(d.offsetX, d.offsetY), A = A.scale(1 / d.scaleX, 1 / d.scaleY);
          const E = e.createPattern(d.canvas, "repeat");
          return E.setTransform(A), E;
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
        const A = w.FeatureTest.isLittleEndian ? 4278190080 : 255, [E, R] = d ? [a, A] : [A, a], k = f >> 3, D = f & 7, I = h.length;
        n = new Uint32Array(n.buffer);
        let F = 0;
        for (let T = 0; T < o; T++) {
          for (const K = e + k; e < K; e++) {
            const X = e < I ? h[e] : 255;
            n[F++] = X & 128 ? R : E, n[F++] = X & 64 ? R : E, n[F++] = X & 32 ? R : E, n[F++] = X & 16 ? R : E, n[F++] = X & 8 ? R : E, n[F++] = X & 4 ? R : E, n[F++] = X & 2 ? R : E, n[F++] = X & 1 ? R : E;
          }
          if (D === 0)
            continue;
          const V = e < I ? h[e++] : 255;
          for (let K = 0; K < D; K++)
            n[F++] = V & 1 << 7 - K ? R : E;
        }
        return {
          srcPos: e,
          destPos: F
        };
      }
      const t = 16, i = 100, u = 4096, p = 15, y = 10, S = 1e3, P = 16;
      function M(h, e) {
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
        }, h.transform = function(f, o, a, d, A, E) {
          e.transform(f, o, a, d, A, E), this.__originalTransform(f, o, a, d, A, E);
        }, h.setTransform = function(f, o, a, d, A, E) {
          e.setTransform(f, o, a, d, A, E), this.__originalSetTransform(f, o, a, d, A, E);
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
      function H(h, e, n, f, o, a, d, A, E, R) {
        const [k, D, I, F, T, V] = (0, z.getCurrentTransform)(h);
        if (D === 0 && I === 0) {
          const W = d * k + T, rt = Math.round(W), J = A * F + V, Q = Math.round(J), it = (d + E) * k + T, ht = Math.abs(Math.round(it) - rt) || 1, gt = (A + R) * F + V, bt = Math.abs(Math.round(gt) - Q) || 1;
          return h.setTransform(Math.sign(k), 0, 0, Math.sign(F), rt, Q), h.drawImage(e, n, f, o, a, 0, 0, ht, bt), h.setTransform(k, D, I, F, T, V), [ht, bt];
        }
        if (k === 0 && F === 0) {
          const W = A * I + T, rt = Math.round(W), J = d * D + V, Q = Math.round(J), it = (A + R) * I + T, ht = Math.abs(Math.round(it) - rt) || 1, gt = (d + E) * D + V, bt = Math.abs(Math.round(gt) - Q) || 1;
          return h.setTransform(0, Math.sign(D), Math.sign(I), 0, rt, Q), h.drawImage(e, n, f, o, a, 0, 0, bt, ht), h.setTransform(k, D, I, F, T, V), [bt, ht];
        }
        h.drawImage(e, n, f, o, a, d, A, E, R);
        const K = Math.hypot(k, D), X = Math.hypot(I, F);
        return [K * E, X * R];
      }
      function B(h) {
        const {
          width: e,
          height: n
        } = h;
        if (e > S || n > S)
          return null;
        const f = 1e3, o = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]), a = e + 1;
        let d = new Uint8Array(a * (n + 1)), A, E, R;
        const k = e + 7 & -8;
        let D = new Uint8Array(k * n), I = 0;
        for (const X of h.data) {
          let W = 128;
          for (; W > 0; )
            D[I++] = X & W ? 0 : 255, W >>= 1;
        }
        let F = 0;
        for (I = 0, D[I] !== 0 && (d[0] = 1, ++F), E = 1; E < e; E++)
          D[I] !== D[I + 1] && (d[E] = D[I] ? 2 : 1, ++F), I++;
        for (D[I] !== 0 && (d[E] = 2, ++F), A = 1; A < n; A++) {
          I = A * k, R = A * a, D[I - k] !== D[I] && (d[R] = D[I] ? 1 : 8, ++F);
          let X = (D[I] ? 4 : 0) + (D[I - k] ? 8 : 0);
          for (E = 1; E < e; E++)
            X = (X >> 2) + (D[I + 1] ? 4 : 0) + (D[I - k + 1] ? 8 : 0), o[X] && (d[R + E] = o[X], ++F), I++;
          if (D[I - k] !== D[I] && (d[R + E] = D[I] ? 2 : 4, ++F), F > f)
            return null;
        }
        for (I = k * (n - 1), R = A * a, D[I] !== 0 && (d[R] = 8, ++F), E = 1; E < e; E++)
          D[I] !== D[I + 1] && (d[R + E] = D[I] ? 4 : 8, ++F), I++;
        if (D[I] !== 0 && (d[R + E] = 4, ++F), F > f)
          return null;
        const T = new Int32Array([0, a, -1, 0, -a, 0, 0, 0, 1]), V = new Path2D();
        for (A = 0; F && A <= n; A++) {
          let X = A * a;
          const W = X + e;
          for (; X < W && !d[X]; )
            X++;
          if (X === W)
            continue;
          V.moveTo(X % a, A);
          const rt = X;
          let J = d[X];
          do {
            const Q = T[J];
            do
              X += Q;
            while (!d[X]);
            const it = d[X];
            it !== 5 && it !== 10 ? (J = it, d[X] = 0) : (J = it & 51 * J >> 4, d[X] &= J >> 2 | J << 2), V.lineTo(X % a, X / a | 0), d[X] || --F;
          } while (rt !== X);
          --A;
        }
        return D = null, d = null, function(X) {
          X.save(), X.scale(1 / e, -1 / n), X.translate(0, -n), X.fill(V), X.beginPath(), X.restore();
        };
      }
      class q {
        constructor(e, n) {
          this.alphaIsShape = !1, this.fontSize = 0, this.fontSizeScale = 1, this.textMatrix = w.IDENTITY_MATRIX, this.textMatrixScale = 1, this.fontMatrix = w.FONT_IDENTITY_MATRIX, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRenderingMode = w.TextRenderingMode.FILL, this.textRise = 0, this.fillColor = "#000000", this.strokeColor = "#000000", this.patternFill = !1, this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.activeSMask = null, this.transferMaps = "none", this.startNewPathAndClipBox([0, 0, e, n]);
        }
        clone() {
          const e = Object.create(this);
          return e.clipBox = this.clipBox.slice(), e;
        }
        setCurrentPoint(e, n) {
          this.x = e, this.y = n;
        }
        updatePathMinMax(e, n, f) {
          [n, f] = w.Util.applyTransform([n, f], e), this.minX = Math.min(this.minX, n), this.minY = Math.min(this.minY, f), this.maxX = Math.max(this.maxX, n), this.maxY = Math.max(this.maxY, f);
        }
        updateRectMinMax(e, n) {
          const f = w.Util.applyTransform(n, e), o = w.Util.applyTransform(n.slice(2), e), a = w.Util.applyTransform([n[0], n[3]], e), d = w.Util.applyTransform([n[2], n[1]], e);
          this.minX = Math.min(this.minX, f[0], o[0], a[0], d[0]), this.minY = Math.min(this.minY, f[1], o[1], a[1], d[1]), this.maxX = Math.max(this.maxX, f[0], o[0], a[0], d[0]), this.maxY = Math.max(this.maxY, f[1], o[1], a[1], d[1]);
        }
        updateScalingPathMinMax(e, n) {
          w.Util.scaleMinMax(e, n), this.minX = Math.min(this.minX, n[0]), this.minY = Math.min(this.minY, n[1]), this.maxX = Math.max(this.maxX, n[2]), this.maxY = Math.max(this.maxY, n[3]);
        }
        updateCurvePathMinMax(e, n, f, o, a, d, A, E, R, k) {
          const D = w.Util.bezierBoundingBox(n, f, o, a, d, A, E, R, k);
          k || this.updateRectMinMax(e, D);
        }
        getPathBoundingBox(e = N.FILL, n = null) {
          const f = [this.minX, this.minY, this.maxX, this.maxY];
          if (e === N.STROKE) {
            n || (0, w.unreachable)("Stroke bounding box must include transform.");
            const o = w.Util.singularValueDecompose2dScale(n), a = o[0] * this.lineWidth / 2, d = o[1] * this.lineWidth / 2;
            f[0] -= a, f[1] -= d, f[2] += a, f[3] += d;
          }
          return f;
        }
        updateClipFromPath() {
          const e = w.Util.intersect(this.clipBox, this.getPathBoundingBox());
          this.startNewPathAndClipBox(e || [0, 0, 0, 0]);
        }
        isEmptyClip() {
          return this.minX === 1 / 0;
        }
        startNewPathAndClipBox(e) {
          this.clipBox = e, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = 0, this.maxY = 0;
        }
        getClippedPathBoundingBox(e = N.FILL, n = null) {
          return w.Util.intersect(this.clipBox, this.getPathBoundingBox(e, n));
        }
      }
      function nt(h, e) {
        if (typeof ImageData < "u" && e instanceof ImageData) {
          h.putImageData(e, 0, 0);
          return;
        }
        const n = e.height, f = e.width, o = n % P, a = (n - o) / P, d = o === 0 ? a : a + 1, A = h.createImageData(f, P);
        let E = 0, R;
        const k = e.data, D = A.data;
        let I, F, T, V;
        if (e.kind === w.ImageKind.GRAYSCALE_1BPP) {
          const K = k.byteLength, X = new Uint32Array(D.buffer, 0, D.byteLength >> 2), W = X.length, rt = f + 7 >> 3, J = 4294967295, Q = w.FeatureTest.isLittleEndian ? 4278190080 : 255;
          for (I = 0; I < d; I++) {
            for (T = I < a ? P : o, R = 0, F = 0; F < T; F++) {
              const it = K - E;
              let ht = 0;
              const gt = it > rt ? f : it * 8 - 7, bt = gt & -8;
              let At = 0, mt = 0;
              for (; ht < bt; ht += 8)
                mt = k[E++], X[R++] = mt & 128 ? J : Q, X[R++] = mt & 64 ? J : Q, X[R++] = mt & 32 ? J : Q, X[R++] = mt & 16 ? J : Q, X[R++] = mt & 8 ? J : Q, X[R++] = mt & 4 ? J : Q, X[R++] = mt & 2 ? J : Q, X[R++] = mt & 1 ? J : Q;
              for (; ht < gt; ht++)
                At === 0 && (mt = k[E++], At = 128), X[R++] = mt & At ? J : Q, At >>= 1;
            }
            for (; R < W; )
              X[R++] = 0;
            h.putImageData(A, 0, I * P);
          }
        } else if (e.kind === w.ImageKind.RGBA_32BPP) {
          for (F = 0, V = f * P * 4, I = 0; I < a; I++)
            D.set(k.subarray(E, E + V)), E += V, h.putImageData(A, 0, F), F += P;
          I < d && (V = f * o * 4, D.set(k.subarray(E, E + V)), h.putImageData(A, 0, F));
        } else if (e.kind === w.ImageKind.RGB_24BPP)
          for (T = P, V = f * T, I = 0; I < d; I++) {
            for (I >= a && (T = o, V = f * T), R = 0, F = V; F--; )
              D[R++] = k[E++], D[R++] = k[E++], D[R++] = k[E++], D[R++] = 255;
            h.putImageData(A, 0, I * P);
          }
        else
          throw new Error(`bad image kind: ${e.kind}`);
      }
      function j(h, e) {
        if (e.bitmap) {
          h.drawImage(e.bitmap, 0, 0);
          return;
        }
        const n = e.height, f = e.width, o = n % P, a = (n - o) / P, d = o === 0 ? a : a + 1, A = h.createImageData(f, P);
        let E = 0;
        const R = e.data, k = A.data;
        for (let D = 0; D < d; D++) {
          const I = D < a ? P : o;
          ({
            srcPos: E
          } = g({
            src: R,
            srcPos: E,
            dest: k,
            width: f,
            height: I,
            nonBlackColor: 0
          })), h.putImageData(A, 0, D * P);
        }
      }
      function _(h, e) {
        const n = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
        for (const f of n)
          h[f] !== void 0 && (e[f] = h[f]);
        h.setLineDash !== void 0 && (e.setLineDash(h.getLineDash()), e.lineDashOffset = h.lineDashOffset);
      }
      function G(h) {
        if (h.strokeStyle = h.fillStyle = "#000000", h.fillRule = "nonzero", h.globalAlpha = 1, h.lineWidth = 1, h.lineCap = "butt", h.lineJoin = "miter", h.miterLimit = 10, h.globalCompositeOperation = "source-over", h.font = "10px sans-serif", h.setLineDash !== void 0 && (h.setLineDash([]), h.lineDashOffset = 0), !w.isNodeJS) {
          const {
            filter: e
          } = h;
          e !== "none" && e !== "" && (h.filter = "none");
        }
      }
      function Y(h, e, n, f) {
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
      function tt(h, e, n) {
        const f = h.length, o = 1 / 255;
        for (let a = 3; a < f; a += 4) {
          const d = n ? n[h[a]] : h[a];
          e[a] = e[a] * d * o | 0;
        }
      }
      function Z(h, e, n) {
        const f = h.length;
        for (let o = 3; o < f; o += 4) {
          const a = h[o - 3] * 77 + h[o - 2] * 152 + h[o - 1] * 28;
          e[o] = n ? e[o] * n[a >> 8] >> 8 : e[o] * a >> 16;
        }
      }
      function at(h, e, n, f, o, a, d, A, E, R, k) {
        const D = !!a, I = D ? a[0] : 0, F = D ? a[1] : 0, T = D ? a[2] : 0, V = o === "Luminosity" ? Z : tt, X = Math.min(f, Math.ceil(1048576 / n));
        for (let W = 0; W < f; W += X) {
          const rt = Math.min(X, f - W), J = h.getImageData(A - R, W + (E - k), n, rt), Q = e.getImageData(A, W + E, n, rt);
          D && Y(J.data, I, F, T), V(J.data, Q.data, d), e.putImageData(Q, A, W + E);
        }
      }
      function lt(h, e, n, f) {
        const o = f[0], a = f[1], d = f[2] - o, A = f[3] - a;
        d === 0 || A === 0 || (at(e.context, n, d, A, e.subtype, e.backdrop, e.transferMap, o, a, e.offsetX, e.offsetY), h.save(), h.globalAlpha = 1, h.globalCompositeOperation = "source-over", h.setTransform(1, 0, 0, 1, 0, 0), h.drawImage(n.canvas, 0, 0), h.restore());
      }
      function pt(h, e) {
        if (e)
          return !0;
        const n = w.Util.singularValueDecompose2dScale(h);
        n[0] = Math.fround(n[0]), n[1] = Math.fround(n[1]);
        const f = Math.fround((globalThis.devicePixelRatio || 1) * z.PixelsPerInch.PDF_TO_CSS_UNITS);
        return n[0] <= f && n[1] <= f;
      }
      const dt = ["butt", "round", "square"], ot = ["miter", "round", "bevel"], ut = {}, et = {};
      class m {
        constructor(e, n, f, o, a, {
          optionalContentConfig: d,
          markedContentStack: A = null
        }, E, R) {
          this.ctx = e, this.current = new q(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.res = null, this.xobjs = null, this.commonObjs = n, this.objs = f, this.canvasFactory = o, this.filterFactory = a, this.groupStack = [], this.processingType3 = null, this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = A || [], this.optionalContentConfig = d, this.cachedCanvases = new O(this.canvasFactory), this.cachedPatterns = /* @__PURE__ */ new Map(), this.annotationCanvasMap = E, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, this.pageColors = R, this._cachedScaleForStroking = [-1, 0], this._cachedGetSinglePixelWidth = null, this._cachedBitmapsMap = /* @__PURE__ */ new Map();
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
            const E = this.cachedCanvases.getCanvas("transparent", a, d);
            this.compositeCtx = this.ctx, this.transparentCanvas = E.canvas, this.ctx = E.context, this.ctx.save(), this.ctx.transform(...(0, z.getCurrentTransform)(this.compositeCtx));
          }
          this.ctx.save(), G(this.ctx), e && (this.ctx.transform(...e), this.outputScaleX = e[0], this.outputScaleY = e[0]), this.ctx.transform(...n.transform), this.viewportScale = n.scale, this.baseTransform = (0, z.getCurrentTransform)(this.ctx);
        }
        executeOperatorList(e, n, f, o) {
          const a = e.argsArray, d = e.fnArray;
          let A = n || 0;
          const E = a.length;
          if (E === A)
            return A;
          const R = E - A > y && typeof f == "function", k = R ? Date.now() + p : 0;
          let D = 0;
          const I = this.commonObjs, F = this.objs;
          let T;
          for (; ; ) {
            if (o !== void 0 && A === o.nextBreakPoint)
              return o.breakIt(A, f), A;
            if (T = d[A], T !== w.OPS.dependency)
              this[T].apply(this, a[A]);
            else
              for (const V of a[A]) {
                const K = V.startsWith("g_") ? I : F;
                if (!K.has(V))
                  return K.get(V, f), A;
              }
            if (A++, A === E)
              return A;
            if (R && ++D > y) {
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
          let a = Math.max(Math.hypot(n[0], n[1]), 1), d = Math.max(Math.hypot(n[2], n[3]), 1), A = f, E = o, R = "prescale1", k, D;
          for (; a > 2 && A > 1 || d > 2 && E > 1; ) {
            let I = A, F = E;
            a > 2 && A > 1 && (I = A >= 16384 ? Math.floor(A / 2) - 1 || 1 : Math.ceil(A / 2), a /= A / I), d > 2 && E > 1 && (F = E >= 16384 ? Math.floor(E / 2) - 1 || 1 : Math.ceil(E) / 2, d /= E / F), k = this.cachedCanvases.getCanvas(R, I, F), D = k.context, D.clearRect(0, 0, I, F), D.drawImage(e, 0, 0, A, E, 0, 0, I, F), e = k.canvas, A = I, E = F, R = R === "prescale1" ? "prescale2" : "prescale1";
          }
          return {
            img: e,
            paintWidth: A,
            paintHeight: E
          };
        }
        _createMaskCanvas(e) {
          const n = this.ctx, {
            width: f,
            height: o
          } = e, a = this.current.fillColor, d = this.current.patternFill, A = (0, z.getCurrentTransform)(n);
          let E, R, k, D;
          if ((e.bitmap || e.data) && e.count > 1) {
            const gt = e.bitmap || e.data.buffer;
            R = JSON.stringify(d ? A : [A.slice(0, 4), a]), E = this._cachedBitmapsMap.get(gt), E || (E = /* @__PURE__ */ new Map(), this._cachedBitmapsMap.set(gt, E));
            const bt = E.get(R);
            if (bt && !d) {
              const At = Math.round(Math.min(A[0], A[2]) + A[4]), mt = Math.round(Math.min(A[1], A[3]) + A[5]);
              return {
                canvas: bt,
                offsetX: At,
                offsetY: mt
              };
            }
            k = bt;
          }
          k || (D = this.cachedCanvases.getCanvas("maskCanvas", f, o), j(D.context, e));
          let I = w.Util.transform(A, [1 / f, 0, 0, -1 / o, 0, 0]);
          I = w.Util.transform(I, [1, 0, 0, 1, 0, -o]);
          const [F, T, V, K] = w.Util.getAxialAlignedBoundingBox([0, 0, f, o], I), X = Math.round(V - F) || 1, W = Math.round(K - T) || 1, rt = this.cachedCanvases.getCanvas("fillCanvas", X, W), J = rt.context, Q = F, it = T;
          J.translate(-Q, -it), J.transform(...I), k || (k = this._scaleImage(D.canvas, (0, z.getCurrentTransformInverse)(J)), k = k.img, E && d && E.set(R, k)), J.imageSmoothingEnabled = pt((0, z.getCurrentTransform)(J), e.interpolate), H(J, k, 0, 0, k.width, k.height, 0, 0, f, o), J.globalCompositeOperation = "source-in";
          const ht = w.Util.transform((0, z.getCurrentTransformInverse)(J), [1, 0, 0, 1, -Q, -it]);
          return J.fillStyle = d ? a.getPattern(n, this, ht, N.FILL) : a, J.fillRect(0, 0, f, o), E && !d && (this.cachedCanvases.delete("fillCanvas"), E.set(R, rt.canvas)), {
            canvas: rt.canvas,
            offsetX: Math.round(Q),
            offsetY: Math.round(it)
          };
        }
        setLineWidth(e) {
          e !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1), this.current.lineWidth = e, this.ctx.lineWidth = e;
        }
        setLineCap(e) {
          this.ctx.lineCap = dt[e];
        }
        setLineJoin(e) {
          this.ctx.lineJoin = ot[e];
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
          a.setTransform(...(0, z.getCurrentTransform)(this.suspendedCtx)), _(this.suspendedCtx, a), M(a, this.suspendedCtx), this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
        }
        endSMaskMode() {
          if (!this.inSMaskMode)
            throw new Error("endSMaskMode called while not in smask mode");
          this.ctx._removeMirroring(), _(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.suspendedCtx = null;
        }
        compose(e) {
          if (!this.current.activeSMask)
            return;
          e ? (e[0] = Math.floor(e[0]), e[1] = Math.floor(e[1]), e[2] = Math.ceil(e[2]), e[3] = Math.ceil(e[3])) : e = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
          const n = this.current.activeSMask, f = this.suspendedCtx;
          lt(f, n, this.ctx, e), this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore();
        }
        save() {
          this.inSMaskMode ? (_(this.ctx, this.suspendedCtx), this.suspendedCtx.save()) : this.ctx.save();
          const e = this.current;
          this.stateStack.push(e), this.current = e.clone();
        }
        restore() {
          this.stateStack.length === 0 && this.inSMaskMode && this.endSMaskMode(), this.stateStack.length !== 0 && (this.current = this.stateStack.pop(), this.inSMaskMode ? (this.suspendedCtx.restore(), _(this.suspendedCtx, this.ctx)) : this.ctx.restore(), this.checkSMaskState(), this.pendingClip = null, this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null);
        }
        transform(e, n, f, o, a, d) {
          this.ctx.transform(e, n, f, o, a, d), this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
        }
        constructPath(e, n, f) {
          const o = this.ctx, a = this.current;
          let d = a.x, A = a.y, E, R;
          const k = (0, z.getCurrentTransform)(o), D = k[0] === 0 && k[3] === 0 || k[1] === 0 && k[2] === 0, I = D ? f.slice(0) : null;
          for (let F = 0, T = 0, V = e.length; F < V; F++)
            switch (e[F] | 0) {
              case w.OPS.rectangle:
                d = n[T++], A = n[T++];
                const K = n[T++], X = n[T++], W = d + K, rt = A + X;
                o.moveTo(d, A), K === 0 || X === 0 ? o.lineTo(W, rt) : (o.lineTo(W, A), o.lineTo(W, rt), o.lineTo(d, rt)), D || a.updateRectMinMax(k, [d, A, W, rt]), o.closePath();
                break;
              case w.OPS.moveTo:
                d = n[T++], A = n[T++], o.moveTo(d, A), D || a.updatePathMinMax(k, d, A);
                break;
              case w.OPS.lineTo:
                d = n[T++], A = n[T++], o.lineTo(d, A), D || a.updatePathMinMax(k, d, A);
                break;
              case w.OPS.curveTo:
                E = d, R = A, d = n[T + 4], A = n[T + 5], o.bezierCurveTo(n[T], n[T + 1], n[T + 2], n[T + 3], d, A), a.updateCurvePathMinMax(k, E, R, n[T], n[T + 1], n[T + 2], n[T + 3], d, A, I), T += 6;
                break;
              case w.OPS.curveTo2:
                E = d, R = A, o.bezierCurveTo(d, A, n[T], n[T + 1], n[T + 2], n[T + 3]), a.updateCurvePathMinMax(k, E, R, d, A, n[T], n[T + 1], n[T + 2], n[T + 3], I), d = n[T + 2], A = n[T + 3], T += 4;
                break;
              case w.OPS.curveTo3:
                E = d, R = A, d = n[T + 2], A = n[T + 3], o.bezierCurveTo(n[T], n[T + 1], d, A, d, A), a.updateCurvePathMinMax(k, E, R, n[T], n[T + 1], d, A, d, A, I), T += 4;
                break;
              case w.OPS.closePath:
                o.closePath();
                break;
            }
          D && a.updateScalingPathMinMax(k, I), a.setCurrentPoint(d, A);
        }
        closePath() {
          this.ctx.closePath();
        }
        stroke(e = !0) {
          const n = this.ctx, f = this.current.strokeColor;
          n.globalAlpha = this.current.strokeAlpha, this.contentVisible && (typeof f == "object" && f?.getPattern ? (n.save(), n.strokeStyle = f.getPattern(n, this, (0, z.getCurrentTransformInverse)(n), N.STROKE), this.rescaleAndStroke(!1), n.restore()) : this.rescaleAndStroke(!0)), e && this.consumePath(this.current.getClippedPathBoundingBox()), n.globalAlpha = this.current.fillAlpha;
        }
        closeStroke() {
          this.closePath(), this.stroke();
        }
        fill(e = !0) {
          const n = this.ctx, f = this.current.fillColor, o = this.current.patternFill;
          let a = !1;
          o && (n.save(), n.fillStyle = f.getPattern(n, this, (0, z.getCurrentTransformInverse)(n), N.FILL), a = !0);
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
          this.pendingClip = ut;
        }
        eoClip() {
          this.pendingClip = et;
        }
        beginText() {
          this.current.textMatrix = w.IDENTITY_MATRIX, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
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
          if (o.fontMatrix = f.fontMatrix || w.FONT_IDENTITY_MATRIX, (o.fontMatrix[0] === 0 || o.fontMatrix[3] === 0) && (0, w.warn)("Invalid font matrix for font " + e), n < 0 ? (n = -n, o.fontDirection = -1) : o.fontDirection = 1, this.current.font = f, this.current.fontSize = n, f.isType3Font)
            return;
          const a = f.loadedName || "sans-serif", d = f.systemFontInfo?.css || `"${a}", ${f.fallbackName}`;
          let A = "normal";
          f.black ? A = "900" : f.bold && (A = "bold");
          const E = f.italic ? "italic" : "normal";
          let R = n;
          n < t ? R = t : n > i && (R = i), this.current.fontSizeScale = n / R, this.ctx.font = `${E} ${A} ${R}px ${d}`;
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
          const a = this.ctx, d = this.current, A = d.font, E = d.textRenderingMode, R = d.fontSize / d.fontSizeScale, k = E & w.TextRenderingMode.FILL_STROKE_MASK, D = !!(E & w.TextRenderingMode.ADD_TO_PATH_FLAG), I = d.patternFill && !A.missingFile;
          let F;
          (A.disableFontFace || D || I) && (F = A.getPathGenerator(this.commonObjs, e)), A.disableFontFace || I ? (a.save(), a.translate(n, f), a.beginPath(), F(a, R), o && a.setTransform(...o), (k === w.TextRenderingMode.FILL || k === w.TextRenderingMode.FILL_STROKE) && a.fill(), (k === w.TextRenderingMode.STROKE || k === w.TextRenderingMode.FILL_STROKE) && a.stroke(), a.restore()) : ((k === w.TextRenderingMode.FILL || k === w.TextRenderingMode.FILL_STROKE) && a.fillText(e, n, f), (k === w.TextRenderingMode.STROKE || k === w.TextRenderingMode.FILL_STROKE) && a.strokeText(e, n, f)), D && (this.pendingTextPaths ||= []).push({
            transform: (0, z.getCurrentTransform)(a),
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
          return (0, w.shadow)(this, "isFontSubpixelAAEnabled", f);
        }
        showText(e) {
          const n = this.current, f = n.font;
          if (f.isType3Font)
            return this.showType3Text(e);
          const o = n.fontSize;
          if (o === 0)
            return;
          const a = this.ctx, d = n.fontSizeScale, A = n.charSpacing, E = n.wordSpacing, R = n.fontDirection, k = n.textHScale * R, D = e.length, I = f.vertical, F = I ? 1 : -1, T = f.defaultVMetrics, V = o * n.fontMatrix[0], K = n.textRenderingMode === w.TextRenderingMode.FILL && !f.disableFontFace && !n.patternFill;
          a.save(), a.transform(...n.textMatrix), a.translate(n.x, n.y + n.textRise), R > 0 ? a.scale(k, -1) : a.scale(k, 1);
          let X;
          if (n.patternFill) {
            a.save();
            const it = n.fillColor.getPattern(a, this, (0, z.getCurrentTransformInverse)(a), N.FILL);
            X = (0, z.getCurrentTransform)(a), a.restore(), a.fillStyle = it;
          }
          let W = n.lineWidth;
          const rt = n.textMatrixScale;
          if (rt === 0 || W === 0) {
            const it = n.textRenderingMode & w.TextRenderingMode.FILL_STROKE_MASK;
            (it === w.TextRenderingMode.STROKE || it === w.TextRenderingMode.FILL_STROKE) && (W = this.getSinglePixelWidth());
          } else
            W /= rt;
          if (d !== 1 && (a.scale(d, d), W /= d), a.lineWidth = W, f.isInvalidPDFjsFont) {
            const it = [];
            let ht = 0;
            for (const gt of e)
              it.push(gt.unicode), ht += gt.width;
            a.fillText(it.join(""), 0, 0), n.x += ht * V * k, a.restore(), this.compose();
            return;
          }
          let J = 0, Q;
          for (Q = 0; Q < D; ++Q) {
            const it = e[Q];
            if (typeof it == "number") {
              J += F * it * o / 1e3;
              continue;
            }
            let ht = !1;
            const gt = (it.isSpace ? E : 0) + A, bt = it.fontChar, At = it.accent;
            let mt, Ct, St = it.width;
            if (I) {
              const vt = it.vmetric || T, Et = -(it.vmetric ? vt[1] : St * 0.5) * V, Rt = vt[2] * V;
              St = vt ? -vt[0] : St, mt = Et / d, Ct = (J + Rt) / d;
            } else
              mt = J / d, Ct = 0;
            if (f.remeasure && St > 0) {
              const vt = a.measureText(bt).width * 1e3 / o * d;
              if (St < vt && this.isFontSubpixelAAEnabled) {
                const Et = St / vt;
                ht = !0, a.save(), a.scale(Et, 1), mt /= Et;
              } else St !== vt && (mt += (St - vt) / 2e3 * o / d);
            }
            if (this.contentVisible && (it.isInFont || f.missingFile)) {
              if (K && !At)
                a.fillText(bt, mt, Ct);
              else if (this.paintChar(bt, mt, Ct, X), At) {
                const vt = mt + o * At.offset.x / d, Et = Ct - o * At.offset.y / d;
                this.paintChar(At.fontChar, vt, Et, X);
              }
            }
            const Tt = I ? St * V - gt * R : St * V + gt * R;
            J += Tt, ht && a.restore();
          }
          I ? n.y -= J : n.x += J * k, a.restore(), this.compose();
        }
        showType3Text(e) {
          const n = this.ctx, f = this.current, o = f.font, a = f.fontSize, d = f.fontDirection, A = o.vertical ? 1 : -1, E = f.charSpacing, R = f.wordSpacing, k = f.textHScale * d, D = f.fontMatrix || w.FONT_IDENTITY_MATRIX, I = e.length, F = f.textRenderingMode === w.TextRenderingMode.INVISIBLE;
          let T, V, K, X;
          if (!(F || a === 0)) {
            for (this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null, n.save(), n.transform(...f.textMatrix), n.translate(f.x, f.y), n.scale(k, d), T = 0; T < I; ++T) {
              if (V = e[T], typeof V == "number") {
                X = A * V * a / 1e3, this.ctx.translate(X, 0), f.x += X * k;
                continue;
              }
              const W = (V.isSpace ? R : 0) + E, rt = o.charProcOperatorList[V.operatorListId];
              if (!rt) {
                (0, w.warn)(`Type3 character "${V.operatorListId}" is not available.`);
                continue;
              }
              this.contentVisible && (this.processingType3 = V, this.save(), n.scale(a, a), n.transform(...D), this.executeOperatorList(rt), this.restore()), K = w.Util.applyTransform([V.width, 0], D)[0] * a + W, n.translate(K, 0), f.x += K * k;
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
            const f = e[1], o = this.baseTransform || (0, z.getCurrentTransform)(this.ctx), a = {
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
          const o = w.Util.makeHexColor(e, n, f);
          this.ctx.strokeStyle = o, this.current.strokeColor = o;
        }
        setFillRGBColor(e, n, f) {
          const o = w.Util.makeHexColor(e, n, f);
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
          n.fillStyle = f.getPattern(n, this, (0, z.getCurrentTransformInverse)(n), N.SHADING);
          const o = (0, z.getCurrentTransformInverse)(n);
          if (o) {
            const {
              width: a,
              height: d
            } = n.canvas, [A, E, R, k] = w.Util.getAxialAlignedBoundingBox([0, 0, a, d], o);
            this.ctx.fillRect(A, E, R - A, k - E);
          } else
            this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
          this.compose(this.current.getClippedPathBoundingBox()), this.restore();
        }
        beginInlineImage() {
          (0, w.unreachable)("Should not call beginInlineImage");
        }
        beginImageData() {
          (0, w.unreachable)("Should not call beginImageData");
        }
        paintFormXObjectBegin(e, n) {
          if (this.contentVisible && (this.save(), this.baseTransformStack.push(this.baseTransform), Array.isArray(e) && e.length === 6 && this.transform(...e), this.baseTransform = (0, z.getCurrentTransform)(this.ctx), n)) {
            const f = n[2] - n[0], o = n[3] - n[1];
            this.ctx.rect(n[0], n[1], f, o), this.current.updateRectMinMax((0, z.getCurrentTransform)(this.ctx), n), this.clip(), this.endPath();
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
          e.isolated || (0, w.info)("TODO: Support non-isolated groups."), e.knockout && (0, w.warn)("Knockout groups not supported.");
          const f = (0, z.getCurrentTransform)(n);
          if (e.matrix && n.transform(...e.matrix), !e.bbox)
            throw new Error("Bounding box is required.");
          let o = w.Util.getAxialAlignedBoundingBox(e.bbox, (0, z.getCurrentTransform)(n));
          const a = [0, 0, n.canvas.width, n.canvas.height];
          o = w.Util.intersect(o, a) || [0, 0, 0, 0];
          const d = Math.floor(o[0]), A = Math.floor(o[1]);
          let E = Math.max(Math.ceil(o[2]) - d, 1), R = Math.max(Math.ceil(o[3]) - A, 1), k = 1, D = 1;
          E > u && (k = E / u, E = u), R > u && (D = R / u, R = u), this.current.startNewPathAndClipBox([0, 0, E, R]);
          let I = "groupAt" + this.groupLevel;
          e.smask && (I += "_smask_" + this.smaskCounter++ % 2);
          const F = this.cachedCanvases.getCanvas(I, E, R), T = F.context;
          T.scale(1 / k, 1 / D), T.translate(-d, -A), T.transform(...f), e.smask ? this.smaskStack.push({
            canvas: F.canvas,
            context: T,
            offsetX: d,
            offsetY: A,
            scaleX: k,
            scaleY: D,
            subtype: e.smask.subtype,
            backdrop: e.smask.backdrop,
            transferMap: e.smask.transferMap || null,
            startTransformInverse: null
          }) : (n.setTransform(1, 0, 0, 1, 0, 0), n.translate(d, A), n.scale(k, D), n.save()), _(n, T), this.ctx = T, this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]), this.groupStack.push(n), this.groupLevel++;
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
            const o = (0, z.getCurrentTransform)(this.ctx);
            this.restore(), this.ctx.save(), this.ctx.setTransform(...o);
            const a = w.Util.getAxialAlignedBoundingBox([0, 0, n.canvas.width, n.canvas.height], o);
            this.ctx.drawImage(n.canvas, 0, 0), this.ctx.restore(), this.compose(a);
          }
        }
        beginAnnotation(e, n, f, o, a) {
          if (this.#t(), G(this.ctx), this.ctx.save(), this.save(), this.baseTransform && this.ctx.setTransform(...this.baseTransform), Array.isArray(n) && n.length === 4) {
            const d = n[2] - n[0], A = n[3] - n[1];
            if (a && this.annotationCanvasMap) {
              f = f.slice(), f[4] -= n[0], f[5] -= n[1], n = n.slice(), n[0] = n[1] = 0, n[2] = d, n[3] = A;
              const [E, R] = w.Util.singularValueDecompose2dScale((0, z.getCurrentTransform)(this.ctx)), {
                viewportScale: k
              } = this, D = Math.ceil(d * this.outputScaleX * k), I = Math.ceil(A * this.outputScaleY * k);
              this.annotationCanvas = this.canvasFactory.create(D, I);
              const {
                canvas: F,
                context: T
              } = this.annotationCanvas;
              this.annotationCanvasMap.set(e, F), this.annotationCanvas.savedCtx = this.ctx, this.ctx = T, this.ctx.save(), this.ctx.setTransform(E, 0, 0, -R, 0, A * R), G(this.ctx);
            } else
              G(this.ctx), this.ctx.rect(n[0], n[1], d, A), this.ctx.clip(), this.endPath();
          }
          this.current = new q(this.ctx.canvas.width, this.ctx.canvas.height), this.transform(...f), this.transform(...o);
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
          if (o && (o.compiled === void 0 && (o.compiled = B(e)), o.compiled)) {
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
          const E = (0, z.getCurrentTransform)(A);
          A.transform(n, f, o, a, 0, 0);
          const R = this._createMaskCanvas(e);
          A.setTransform(1, 0, 0, 1, R.offsetX - E[4], R.offsetY - E[5]);
          for (let k = 0, D = d.length; k < D; k += 2) {
            const I = w.Util.transform(E, [n, f, o, a, d[k], d[k + 1]]), [F, T] = w.Util.applyTransform([0, 0], I);
            A.drawImage(R.canvas, F, T);
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
              height: E,
              transform: R
            } = a, k = this.cachedCanvases.getCanvas("maskCanvas", A, E), D = k.context;
            D.save();
            const I = this.getObject(d, a);
            j(D, I), D.globalCompositeOperation = "source-in", D.fillStyle = o ? f.getPattern(D, this, (0, z.getCurrentTransformInverse)(n), N.FILL) : f, D.fillRect(0, 0, A, E), D.restore(), n.save(), n.transform(...R), n.scale(1, -1), H(n, k.canvas, 0, 0, A, E, 0, -1, 1, 1), n.restore();
          }
          this.compose();
        }
        paintImageXObject(e) {
          if (!this.contentVisible)
            return;
          const n = this.getObject(e);
          if (!n) {
            (0, w.warn)("Dependent image isn't ready yet");
            return;
          }
          this.paintInlineImageXObject(n);
        }
        paintImageXObjectRepeat(e, n, f, o) {
          if (!this.contentVisible)
            return;
          const a = this.getObject(e);
          if (!a) {
            (0, w.warn)("Dependent image isn't ready yet");
            return;
          }
          const d = a.width, A = a.height, E = [];
          for (let R = 0, k = o.length; R < k; R += 2)
            E.push({
              transform: [n, 0, 0, f, o[R], o[R + 1]],
              x: 0,
              y: 0,
              w: d,
              h: A
            });
          this.paintInlineImageXObjectGroup(a, E);
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
          if (this.save(), !w.isNodeJS) {
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
            const E = this.cachedCanvases.getCanvas("inlineImage", n, f).context;
            nt(E, e), a = this.applyTransferMapsToCanvas(E);
          }
          const d = this._scaleImage(a, (0, z.getCurrentTransformInverse)(o));
          o.imageSmoothingEnabled = pt((0, z.getCurrentTransform)(o), e.interpolate), H(o, d.img, 0, 0, d.paintWidth, d.paintHeight, 0, -f, n, f), this.compose(), this.restore();
        }
        paintInlineImageXObjectGroup(e, n) {
          if (!this.contentVisible)
            return;
          const f = this.ctx;
          let o;
          if (e.bitmap)
            o = e.bitmap;
          else {
            const a = e.width, d = e.height, E = this.cachedCanvases.getCanvas("inlineImage", a, d).context;
            nt(E, e), o = this.applyTransferMapsToCanvas(E);
          }
          for (const a of n)
            f.save(), f.transform(...a.transform), f.scale(1, -1), H(f, o, a.x, a.y, a.w, a.h, 0, -1, 1, 1), f.restore();
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
          this.pendingClip && (n || (this.pendingClip === et ? f.clip("evenodd") : f.clip()), this.pendingClip = null), this.current.startNewPathAndClipBox(this.current.clipBox), f.beginPath();
        }
        getSinglePixelWidth() {
          if (!this._cachedGetSinglePixelWidth) {
            const e = (0, z.getCurrentTransform)(this.ctx);
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
              const E = Math.abs(n), R = Math.abs(a);
              if (E === R)
                if (e === 0)
                  d = A = 1 / E;
                else {
                  const k = E * e;
                  d = A = k < 1 ? 1 / k : 1;
                }
              else if (e === 0)
                d = 1 / E, A = 1 / R;
              else {
                const k = E * e, D = R * e;
                d = k < 1 ? 1 / k : 1, A = D < 1 ? 1 / D : 1;
              }
            } else {
              const E = Math.abs(n * a - f * o), R = Math.hypot(n, f), k = Math.hypot(o, a);
              if (e === 0)
                d = k / E, A = R / E;
              else {
                const D = e * E;
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
            n.setLineDash(d.map((E) => E / A)), n.lineDashOffset /= A;
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
      for (const h in w.OPS)
        m.prototype[h] !== void 0 && (m.prototype[w.OPS[h]] = m.prototype[h]);
    }
  ),
  /***/
  419: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        DOMCMapReaderFactory: () => (
          /* binding */
          v
        ),
        /* harmony export */
        DOMCanvasFactory: () => (
          /* binding */
          C
        ),
        /* harmony export */
        DOMFilterFactory: () => (
          /* binding */
          L
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
          P
        ),
        /* harmony export */
        PageViewport: () => (
          /* binding */
          l
        ),
        /* harmony export */
        PixelsPerInch: () => (
          /* binding */
          $
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
          x
        ),
        /* harmony export */
        getColorValues: () => (
          /* binding */
          H
        ),
        /* harmony export */
        getCurrentTransform: () => (
          /* binding */
          B
        ),
        /* harmony export */
        getCurrentTransformInverse: () => (
          /* binding */
          q
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
          M
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
          y
        ),
        /* harmony export */
        setLayerDimensions: () => (
          /* binding */
          nt
        )
        /* harmony export */
      });
      var w = U(583), z = U(292);
      const N = "http://www.w3.org/2000/svg";
      class $ {
        static CSS = 96;
        static PDF = 72;
        static PDF_TO_CSS_UNITS = this.CSS / this.PDF;
      }
      class L extends w.BaseFilterFactory {
        #t;
        #e;
        #s;
        #n;
        #r;
        #i = 0;
        constructor({
          docId: _,
          ownerDocument: G = globalThis.document
        } = {}) {
          super(), this.#s = _, this.#n = G;
        }
        get #a() {
          return this.#t ||= /* @__PURE__ */ new Map();
        }
        get #l() {
          return this.#r ||= /* @__PURE__ */ new Map();
        }
        get #h() {
          if (!this.#e) {
            const _ = this.#n.createElement("div"), {
              style: G
            } = _;
            G.visibility = "hidden", G.contain = "strict", G.width = G.height = 0, G.position = "absolute", G.top = G.left = 0, G.zIndex = -1;
            const Y = this.#n.createElementNS(N, "svg");
            Y.setAttribute("width", 0), Y.setAttribute("height", 0), this.#e = this.#n.createElementNS(N, "defs"), _.append(Y), Y.append(this.#e), this.#n.body.append(_);
          }
          return this.#e;
        }
        addFilter(_) {
          if (!_)
            return "none";
          let G = this.#a.get(_);
          if (G)
            return G;
          let Y, tt, Z, at;
          if (_.length === 1) {
            const ot = _[0], ut = new Array(256);
            for (let et = 0; et < 256; et++)
              ut[et] = ot[et] / 255;
            at = Y = tt = Z = ut.join(",");
          } else {
            const [ot, ut, et] = _, m = new Array(256), h = new Array(256), e = new Array(256);
            for (let n = 0; n < 256; n++)
              m[n] = ot[n] / 255, h[n] = ut[n] / 255, e[n] = et[n] / 255;
            Y = m.join(","), tt = h.join(","), Z = e.join(","), at = `${Y}${tt}${Z}`;
          }
          if (G = this.#a.get(at), G)
            return this.#a.set(_, G), G;
          const lt = `g_${this.#s}_transfer_map_${this.#i++}`, pt = `url(#${lt})`;
          this.#a.set(_, pt), this.#a.set(at, pt);
          const dt = this.#u(lt);
          return this.#o(Y, tt, Z, dt), pt;
        }
        addHCMFilter(_, G) {
          const Y = `${_}-${G}`, tt = "base";
          let Z = this.#l.get(tt);
          if (Z?.key === Y || (Z ? (Z.filter?.remove(), Z.key = Y, Z.url = "none", Z.filter = null) : (Z = {
            key: Y,
            url: "none",
            filter: null
          }, this.#l.set(tt, Z)), !_ || !G))
            return Z.url;
          const at = this.#p(_);
          _ = z.Util.makeHexColor(...at);
          const lt = this.#p(G);
          if (G = z.Util.makeHexColor(...lt), this.#h.style.color = "", _ === "#000000" && G === "#ffffff" || _ === G)
            return Z.url;
          const pt = new Array(256);
          for (let m = 0; m <= 255; m++) {
            const h = m / 255;
            pt[m] = h <= 0.03928 ? h / 12.92 : ((h + 0.055) / 1.055) ** 2.4;
          }
          const dt = pt.join(","), ot = `g_${this.#s}_hcm_filter`, ut = Z.filter = this.#u(ot);
          this.#o(dt, dt, dt, ut), this.#d(ut);
          const et = (m, h) => {
            const e = at[m] / 255, n = lt[m] / 255, f = new Array(h + 1);
            for (let o = 0; o <= h; o++)
              f[o] = e + o / h * (n - e);
            return f.join(",");
          };
          return this.#o(et(0, 5), et(1, 5), et(2, 5), ut), Z.url = `url(#${ot})`, Z.url;
        }
        addHighlightHCMFilter(_, G, Y, tt, Z) {
          const at = `${G}-${Y}-${tt}-${Z}`;
          let lt = this.#l.get(_);
          if (lt?.key === at || (lt ? (lt.filter?.remove(), lt.key = at, lt.url = "none", lt.filter = null) : (lt = {
            key: at,
            url: "none",
            filter: null
          }, this.#l.set(_, lt)), !G || !Y))
            return lt.url;
          const [pt, dt] = [G, Y].map(this.#p.bind(this));
          let ot = Math.round(0.2126 * pt[0] + 0.7152 * pt[1] + 0.0722 * pt[2]), ut = Math.round(0.2126 * dt[0] + 0.7152 * dt[1] + 0.0722 * dt[2]), [et, m] = [tt, Z].map(this.#p.bind(this));
          ut < ot && ([ot, ut, et, m] = [ut, ot, m, et]), this.#h.style.color = "";
          const h = (f, o, a) => {
            const d = new Array(256), A = (ut - ot) / a, E = f / 255, R = (o - f) / (255 * a);
            let k = 0;
            for (let D = 0; D <= a; D++) {
              const I = Math.round(ot + D * A), F = E + D * R;
              for (let T = k; T <= I; T++)
                d[T] = F;
              k = I + 1;
            }
            for (let D = k; D < 256; D++)
              d[D] = d[k - 1];
            return d.join(",");
          }, e = `g_${this.#s}_hcm_${_}_filter`, n = lt.filter = this.#u(e);
          return this.#d(n), this.#o(h(et[0], m[0], 5), h(et[1], m[1], 5), h(et[2], m[2], 5), n), lt.url = `url(#${e})`, lt.url;
        }
        destroy(_ = !1) {
          _ && this.#l.size !== 0 || (this.#e && (this.#e.parentNode.parentNode.remove(), this.#e = null), this.#t && (this.#t.clear(), this.#t = null), this.#i = 0);
        }
        #d(_) {
          const G = this.#n.createElementNS(N, "feColorMatrix");
          G.setAttribute("type", "matrix"), G.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"), _.append(G);
        }
        #u(_) {
          const G = this.#n.createElementNS(N, "filter");
          return G.setAttribute("color-interpolation-filters", "sRGB"), G.setAttribute("id", _), this.#h.append(G), G;
        }
        #c(_, G, Y) {
          const tt = this.#n.createElementNS(N, G);
          tt.setAttribute("type", "discrete"), tt.setAttribute("tableValues", Y), _.append(tt);
        }
        #o(_, G, Y, tt) {
          const Z = this.#n.createElementNS(N, "feComponentTransfer");
          tt.append(Z), this.#c(Z, "feFuncR", _), this.#c(Z, "feFuncG", G), this.#c(Z, "feFuncB", Y);
        }
        #p(_) {
          return this.#h.style.color = _, O(getComputedStyle(this.#h).getPropertyValue("color"));
        }
      }
      class C extends w.BaseCanvasFactory {
        constructor({
          ownerDocument: _ = globalThis.document
        } = {}) {
          super(), this._document = _;
        }
        _createCanvas(_, G) {
          const Y = this._document.createElement("canvas");
          return Y.width = _, Y.height = G, Y;
        }
      }
      async function x(j, _ = "text") {
        if (p(j, document.baseURI)) {
          const G = await fetch(j);
          if (!G.ok)
            throw new Error(G.statusText);
          switch (_) {
            case "arraybuffer":
              return G.arrayBuffer();
            case "blob":
              return G.blob();
            case "json":
              return G.json();
          }
          return G.text();
        }
        return new Promise((G, Y) => {
          const tt = new XMLHttpRequest();
          tt.open("GET", j, !0), tt.responseType = _, tt.onreadystatechange = () => {
            if (tt.readyState === XMLHttpRequest.DONE) {
              if (tt.status === 200 || tt.status === 0) {
                switch (_) {
                  case "arraybuffer":
                  case "blob":
                  case "json":
                    G(tt.response);
                    return;
                }
                G(tt.responseText);
                return;
              }
              Y(new Error(tt.statusText));
            }
          }, tt.send(null);
        });
      }
      class v extends w.BaseCMapReaderFactory {
        _fetchData(_, G) {
          return x(_, this.isCompressed ? "arraybuffer" : "text").then((Y) => ({
            cMapData: Y instanceof ArrayBuffer ? new Uint8Array(Y) : (0, z.stringToBytes)(Y),
            compressionType: G
          }));
        }
      }
      class r extends w.BaseStandardFontDataFactory {
        _fetchData(_) {
          return x(_, "arraybuffer").then((G) => new Uint8Array(G));
        }
      }
      class c extends w.BaseSVGFactory {
        _createSVG(_) {
          return document.createElementNS(N, _);
        }
      }
      class l {
        constructor({
          viewBox: _,
          scale: G,
          rotation: Y,
          offsetX: tt = 0,
          offsetY: Z = 0,
          dontFlip: at = !1
        }) {
          this.viewBox = _, this.scale = G, this.rotation = Y, this.offsetX = tt, this.offsetY = Z;
          const lt = (_[2] + _[0]) / 2, pt = (_[3] + _[1]) / 2;
          let dt, ot, ut, et;
          switch (Y %= 360, Y < 0 && (Y += 360), Y) {
            case 180:
              dt = -1, ot = 0, ut = 0, et = 1;
              break;
            case 90:
              dt = 0, ot = 1, ut = 1, et = 0;
              break;
            case 270:
              dt = 0, ot = -1, ut = -1, et = 0;
              break;
            case 0:
              dt = 1, ot = 0, ut = 0, et = -1;
              break;
            default:
              throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
          }
          at && (ut = -ut, et = -et);
          let m, h, e, n;
          dt === 0 ? (m = Math.abs(pt - _[1]) * G + tt, h = Math.abs(lt - _[0]) * G + Z, e = (_[3] - _[1]) * G, n = (_[2] - _[0]) * G) : (m = Math.abs(lt - _[0]) * G + tt, h = Math.abs(pt - _[1]) * G + Z, e = (_[2] - _[0]) * G, n = (_[3] - _[1]) * G), this.transform = [dt * G, ot * G, ut * G, et * G, m - dt * G * lt - ut * G * pt, h - ot * G * lt - et * G * pt], this.width = e, this.height = n;
        }
        get rawDims() {
          const {
            viewBox: _
          } = this;
          return (0, z.shadow)(this, "rawDims", {
            pageWidth: _[2] - _[0],
            pageHeight: _[3] - _[1],
            pageX: _[0],
            pageY: _[1]
          });
        }
        clone({
          scale: _ = this.scale,
          rotation: G = this.rotation,
          offsetX: Y = this.offsetX,
          offsetY: tt = this.offsetY,
          dontFlip: Z = !1
        } = {}) {
          return new l({
            viewBox: this.viewBox.slice(),
            scale: _,
            rotation: G,
            offsetX: Y,
            offsetY: tt,
            dontFlip: Z
          });
        }
        convertToViewportPoint(_, G) {
          return z.Util.applyTransform([_, G], this.transform);
        }
        convertToViewportRectangle(_) {
          const G = z.Util.applyTransform([_[0], _[1]], this.transform), Y = z.Util.applyTransform([_[2], _[3]], this.transform);
          return [G[0], G[1], Y[0], Y[1]];
        }
        convertToPdfPoint(_, G) {
          return z.Util.applyInverseTransform([_, G], this.transform);
        }
      }
      class b extends z.BaseException {
        constructor(_, G = 0) {
          super(_, "RenderingCancelledException"), this.extraDelay = G;
        }
      }
      function s(j) {
        const _ = j.length;
        let G = 0;
        for (; G < _ && j[G].trim() === ""; )
          G++;
        return j.substring(G, G + 5).toLowerCase() === "data:";
      }
      function g(j) {
        return typeof j == "string" && /\.pdf$/i.test(j);
      }
      function t(j, _ = !1) {
        return _ || ([j] = j.split(/[#?]/, 1)), j.substring(j.lastIndexOf("/") + 1);
      }
      function i(j, _ = "document.pdf") {
        if (typeof j != "string")
          return _;
        if (s(j))
          return (0, z.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), _;
        const G = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/, Y = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i, tt = G.exec(j);
        let Z = Y.exec(tt[1]) || Y.exec(tt[2]) || Y.exec(tt[3]);
        if (Z && (Z = Z[0], Z.includes("%")))
          try {
            Z = Y.exec(decodeURIComponent(Z))[0];
          } catch {
          }
        return Z || _;
      }
      class u {
        started = /* @__PURE__ */ Object.create(null);
        times = [];
        time(_) {
          _ in this.started && (0, z.warn)(`Timer is already running for ${_}`), this.started[_] = Date.now();
        }
        timeEnd(_) {
          _ in this.started || (0, z.warn)(`Timer has not been started for ${_}`), this.times.push({
            name: _,
            start: this.started[_],
            end: Date.now()
          }), delete this.started[_];
        }
        toString() {
          const _ = [];
          let G = 0;
          for (const {
            name: Y
          } of this.times)
            G = Math.max(Y.length, G);
          for (const {
            name: Y,
            start: tt,
            end: Z
          } of this.times)
            _.push(`${Y.padEnd(G)} ${Z - tt}ms
`);
          return _.join("");
        }
      }
      function p(j, _) {
        try {
          const {
            protocol: G
          } = _ ? new URL(j, _) : new URL(j);
          return G === "http:" || G === "https:";
        } catch {
          return !1;
        }
      }
      function y(j) {
        j.preventDefault();
      }
      let S;
      class P {
        static toDateObject(_) {
          if (!_ || typeof _ != "string")
            return null;
          S ||= new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?");
          const G = S.exec(_);
          if (!G)
            return null;
          const Y = parseInt(G[1], 10);
          let tt = parseInt(G[2], 10);
          tt = tt >= 1 && tt <= 12 ? tt - 1 : 0;
          let Z = parseInt(G[3], 10);
          Z = Z >= 1 && Z <= 31 ? Z : 1;
          let at = parseInt(G[4], 10);
          at = at >= 0 && at <= 23 ? at : 0;
          let lt = parseInt(G[5], 10);
          lt = lt >= 0 && lt <= 59 ? lt : 0;
          let pt = parseInt(G[6], 10);
          pt = pt >= 0 && pt <= 59 ? pt : 0;
          const dt = G[7] || "Z";
          let ot = parseInt(G[8], 10);
          ot = ot >= 0 && ot <= 23 ? ot : 0;
          let ut = parseInt(G[9], 10) || 0;
          return ut = ut >= 0 && ut <= 59 ? ut : 0, dt === "-" ? (at += ot, lt += ut) : dt === "+" && (at -= ot, lt -= ut), new Date(Date.UTC(Y, tt, Z, at, lt, pt));
        }
      }
      function M(j, {
        scale: _ = 1,
        rotation: G = 0
      }) {
        const {
          width: Y,
          height: tt
        } = j.attributes.style, Z = [0, 0, parseInt(Y), parseInt(tt)];
        return new l({
          viewBox: Z,
          scale: _,
          rotation: G
        });
      }
      function O(j) {
        if (j.startsWith("#")) {
          const _ = parseInt(j.slice(1), 16);
          return [(_ & 16711680) >> 16, (_ & 65280) >> 8, _ & 255];
        }
        return j.startsWith("rgb(") ? j.slice(4, -1).split(",").map((_) => parseInt(_)) : j.startsWith("rgba(") ? j.slice(5, -1).split(",").map((_) => parseInt(_)).slice(0, 3) : ((0, z.warn)(`Not a valid color format: "${j}"`), [0, 0, 0]);
      }
      function H(j) {
        const _ = document.createElement("span");
        _.style.visibility = "hidden", document.body.append(_);
        for (const G of j.keys()) {
          _.style.color = G;
          const Y = window.getComputedStyle(_).color;
          j.set(G, O(Y));
        }
        _.remove();
      }
      function B(j) {
        const {
          a: _,
          b: G,
          c: Y,
          d: tt,
          e: Z,
          f: at
        } = j.getTransform();
        return [_, G, Y, tt, Z, at];
      }
      function q(j) {
        const {
          a: _,
          b: G,
          c: Y,
          d: tt,
          e: Z,
          f: at
        } = j.getTransform().invertSelf();
        return [_, G, Y, tt, Z, at];
      }
      function nt(j, _, G = !1, Y = !0) {
        if (_ instanceof l) {
          const {
            pageWidth: tt,
            pageHeight: Z
          } = _.rawDims, {
            style: at
          } = j, lt = z.FeatureTest.isCSSRoundSupported, pt = `var(--scale-factor) * ${tt}px`, dt = `var(--scale-factor) * ${Z}px`, ot = lt ? `round(${pt}, 1px)` : `calc(${pt})`, ut = lt ? `round(${dt}, 1px)` : `calc(${dt})`;
          !G || _.rotation % 180 === 0 ? (at.width = ot, at.height = ut) : (at.width = ut, at.height = ot);
        }
        Y && j.setAttribute("data-main-rotation", _.rotation);
      }
    }
  ),
  /***/
  47: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        DrawLayer: () => (
          /* binding */
          N
        )
        /* harmony export */
      });
      var w = U(419), z = U(292);
      class N {
        #t = null;
        #e = 0;
        #s = /* @__PURE__ */ new Map();
        #n = /* @__PURE__ */ new Map();
        constructor({
          pageIndex: L
        }) {
          this.pageIndex = L;
        }
        setParent(L) {
          if (!this.#t) {
            this.#t = L;
            return;
          }
          if (this.#t !== L) {
            if (this.#s.size > 0)
              for (const C of this.#s.values())
                C.remove(), L.append(C);
            this.#t = L;
          }
        }
        static get _svgFactory() {
          return (0, z.shadow)(this, "_svgFactory", new w.DOMSVGFactory());
        }
        static #r(L, {
          x: C = 0,
          y: x = 0,
          width: v = 1,
          height: r = 1
        } = {}) {
          const {
            style: c
          } = L;
          c.top = `${100 * x}%`, c.left = `${100 * C}%`, c.width = `${100 * v}%`, c.height = `${100 * r}%`;
        }
        #i(L) {
          const C = N._svgFactory.create(1, 1, !0);
          return this.#t.append(C), C.setAttribute("aria-hidden", !0), N.#r(C, L), C;
        }
        #a(L, C) {
          const x = N._svgFactory.createElement("clipPath");
          L.append(x);
          const v = `clip_${C}`;
          x.setAttribute("id", v), x.setAttribute("clipPathUnits", "objectBoundingBox");
          const r = N._svgFactory.createElement("use");
          return x.append(r), r.setAttribute("href", `#${C}`), r.classList.add("clip"), v;
        }
        highlight(L, C, x, v = !1) {
          const r = this.#e++, c = this.#i(L.box);
          c.classList.add("highlight"), L.free && c.classList.add("free");
          const l = N._svgFactory.createElement("defs");
          c.append(l);
          const b = N._svgFactory.createElement("path");
          l.append(b);
          const s = `path_p${this.pageIndex}_${r}`;
          b.setAttribute("id", s), b.setAttribute("d", L.toSVGPath()), v && this.#n.set(r, b);
          const g = this.#a(l, s), t = N._svgFactory.createElement("use");
          return c.append(t), c.setAttribute("fill", C), c.setAttribute("fill-opacity", x), t.setAttribute("href", `#${s}`), this.#s.set(r, c), {
            id: r,
            clipPathId: `url(#${g})`
          };
        }
        highlightOutline(L) {
          const C = this.#e++, x = this.#i(L.box);
          x.classList.add("highlightOutline");
          const v = N._svgFactory.createElement("defs");
          x.append(v);
          const r = N._svgFactory.createElement("path");
          v.append(r);
          const c = `path_p${this.pageIndex}_${C}`;
          r.setAttribute("id", c), r.setAttribute("d", L.toSVGPath()), r.setAttribute("vector-effect", "non-scaling-stroke");
          let l;
          if (L.free) {
            x.classList.add("free");
            const g = N._svgFactory.createElement("mask");
            v.append(g), l = `mask_p${this.pageIndex}_${C}`, g.setAttribute("id", l), g.setAttribute("maskUnits", "objectBoundingBox");
            const t = N._svgFactory.createElement("rect");
            g.append(t), t.setAttribute("width", "1"), t.setAttribute("height", "1"), t.setAttribute("fill", "white");
            const i = N._svgFactory.createElement("use");
            g.append(i), i.setAttribute("href", `#${c}`), i.setAttribute("stroke", "none"), i.setAttribute("fill", "black"), i.setAttribute("fill-rule", "nonzero"), i.classList.add("mask");
          }
          const b = N._svgFactory.createElement("use");
          x.append(b), b.setAttribute("href", `#${c}`), l && b.setAttribute("mask", `url(#${l})`);
          const s = b.cloneNode();
          return x.append(s), b.classList.add("mainOutline"), s.classList.add("secondaryOutline"), this.#s.set(C, x), C;
        }
        finalizeLine(L, C) {
          const x = this.#n.get(L);
          this.#n.delete(L), this.updateBox(L, C.box), x.setAttribute("d", C.toSVGPath());
        }
        updateLine(L, C) {
          this.#s.get(L).firstChild.firstChild.setAttribute("d", C.toSVGPath());
        }
        removeFreeHighlight(L) {
          this.remove(L), this.#n.delete(L);
        }
        updatePath(L, C) {
          this.#n.get(L).setAttribute("d", C.toSVGPath());
        }
        updateBox(L, C) {
          N.#r(this.#s.get(L), C);
        }
        show(L, C) {
          this.#s.get(L).classList.toggle("hidden", !C);
        }
        rotate(L, C) {
          this.#s.get(L).setAttribute("data-main-rotation", C);
        }
        changeColor(L, C) {
          this.#s.get(L).setAttribute("fill", C);
        }
        changeOpacity(L, C) {
          this.#s.get(L).setAttribute("fill-opacity", C);
        }
        addClass(L, C) {
          this.#s.get(L).classList.add(C);
        }
        removeClass(L, C) {
          this.#s.get(L).classList.remove(C);
        }
        remove(L) {
          this.#t !== null && (this.#s.get(L).remove(), this.#s.delete(L));
        }
        destroy() {
          this.#t = null;
          for (const L of this.#s.values())
            L.remove();
          this.#s.clear();
        }
      }
    }
  ),
  /***/
  731: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        AnnotationEditorLayer: () => (
          /* binding */
          s
        )
      });
      var w = U(292), z = U(310), N = U(830), $ = U(976);
      const L = /\r\n?|\n/g;
      class C extends z.AnnotationEditor {
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
          const t = C.prototype, i = (y) => y.isEmpty(), u = N.AnnotationEditorUIManager.TRANSLATE_SMALL, p = N.AnnotationEditorUIManager.TRANSLATE_BIG;
          return (0, w.shadow)(this, "_keyboardManager", new N.KeyboardManager([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], t.commitOrRemove, {
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
        static _editorType = w.AnnotationEditorType.FREETEXT;
        constructor(t) {
          super({
            ...t,
            name: "freeTextEditor"
          }), this.#i = t.color || C._defaultColor || z.AnnotationEditor._defaultLineColor, this.#h = t.fontSize || C._defaultFontSize;
        }
        static initialize(t, i) {
          z.AnnotationEditor.initialize(t, i, {
            strings: ["pdfjs-free-text-default-content"]
          });
          const u = getComputedStyle(document.documentElement);
          this._internalPadding = parseFloat(u.getPropertyValue("--freetext-padding"));
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case w.AnnotationEditorParamsType.FREETEXT_SIZE:
              C._defaultFontSize = i;
              break;
            case w.AnnotationEditorParamsType.FREETEXT_COLOR:
              C._defaultColor = i;
              break;
          }
        }
        updateParams(t, i) {
          switch (t) {
            case w.AnnotationEditorParamsType.FREETEXT_SIZE:
              this.#u(i);
              break;
            case w.AnnotationEditorParamsType.FREETEXT_COLOR:
              this.#c(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[w.AnnotationEditorParamsType.FREETEXT_SIZE, C._defaultFontSize], [w.AnnotationEditorParamsType.FREETEXT_COLOR, C._defaultColor || z.AnnotationEditor._defaultLineColor]];
        }
        get propertiesToUpdate() {
          return [[w.AnnotationEditorParamsType.FREETEXT_SIZE, this.#h], [w.AnnotationEditorParamsType.FREETEXT_COLOR, this.#i]];
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
            type: w.AnnotationEditorParamsType.FREETEXT_SIZE,
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
            type: w.AnnotationEditorParamsType.FREETEXT_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        _translateEmpty(t, i) {
          this._uiManager.translateSelectedEditors(t, i, !0);
        }
        getInitialTranslation() {
          const t = this.parentScale;
          return [-C._internalPadding * t, -(C._internalPadding + this.#h) * t];
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this)));
        }
        enableEditMode() {
          this.isInEditMode() || (this.parent.setEditingState(!1), this.parent.updateToolbar(w.AnnotationEditorType.FREETEXT), super.enableEditMode(), this.overlayDiv.classList.remove("enabled"), this.editorDiv.contentEditable = !0, this._isDraggable = !1, this.div.removeAttribute("aria-activedescendant"), this.editorDiv.addEventListener("keydown", this.#n), this.editorDiv.addEventListener("focus", this.#e), this.editorDiv.addEventListener("blur", this.#t), this.editorDiv.addEventListener("input", this.#s), this.editorDiv.addEventListener("paste", this.#r));
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
            t.push(C.#g(i));
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
              div: y
            } = this, S = y.style.display, P = y.classList.contains("hidden");
            y.classList.remove("hidden"), y.style.display = "hidden", p.div.append(this.div), u = y.getBoundingClientRect(), y.remove(), y.style.display = S, y.classList.toggle("hidden", P);
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
          C._keyboardManager.exec(this, t);
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
          this.width && (t = this.x, i = this.y), super.render(), this.editorDiv = document.createElement("div"), this.editorDiv.className = "internal", this.editorDiv.setAttribute("id", this.#l), this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text"), this.enableEditing(), z.AnnotationEditor._l10nPromise.get("pdfjs-free-text-default-content").then((p) => this.editorDiv?.setAttribute("default-content", p)), this.editorDiv.contentEditable = !0;
          const {
            style: u
          } = this.editorDiv;
          if (u.fontSize = `calc(${this.#h}px * var(--scale-factor))`, u.color = this.#i, this.div.append(this.editorDiv), this.overlayDiv = document.createElement("div"), this.overlayDiv.classList.add("overlay", "enabled"), this.div.append(this.overlayDiv), (0, N.bindEvents)(this, this.div, ["dblclick", "keydown"]), this.width) {
            const [p, y] = this.parentDimensions;
            if (this.annotationElementId) {
              const {
                position: S
              } = this.#d;
              let [P, M] = this.getInitialTranslation();
              [P, M] = this.pageTranslationToScreen(P, M);
              const [O, H] = this.pageDimensions, [B, q] = this.pageTranslation;
              let nt, j;
              switch (this.rotation) {
                case 0:
                  nt = t + (S[0] - B) / O, j = i + this.height - (S[1] - q) / H;
                  break;
                case 90:
                  nt = t + (S[0] - B) / O, j = i - (S[1] - q) / H, [P, M] = [M, -P];
                  break;
                case 180:
                  nt = t - this.width + (S[0] - B) / O, j = i - (S[1] - q) / H, [P, M] = [-P, -M];
                  break;
                case 270:
                  nt = t + (S[0] - B - this.height * H) / O, j = i + (S[1] - q - this.width * O) / H, [P, M] = [-M, P];
                  break;
              }
              this.setAt(nt * p, j * y, P, M);
            } else
              this.setAt(t * p, i * y, this.width * p, this.height * y);
            this.#f(), this._isDraggable = !0, this.editorDiv.contentEditable = !1;
          } else
            this._isDraggable = !1, this.editorDiv.contentEditable = !0;
          return this.div;
        }
        static #g(t) {
          return (t.nodeType === Node.TEXT_NODE ? t.nodeValue : t.innerText).replaceAll(L, "");
        }
        editorDivPaste(t) {
          const i = t.clipboardData || window.clipboardData, {
            types: u
          } = i;
          if (u.length === 1 && u[0] === "text/plain")
            return;
          t.preventDefault();
          const p = C.#m(i.getData("text") || "").replaceAll(L, `
`);
          if (!p)
            return;
          const y = window.getSelection();
          if (!y.rangeCount)
            return;
          this.editorDiv.normalize(), y.deleteFromDocument();
          const S = y.getRangeAt(0);
          if (!p.includes(`
`)) {
            S.insertNode(document.createTextNode(p)), this.editorDiv.normalize(), y.collapseToStart();
            return;
          }
          const {
            startContainer: P,
            startOffset: M
          } = S, O = [], H = [];
          if (P.nodeType === Node.TEXT_NODE) {
            const nt = P.parentElement;
            if (H.push(P.nodeValue.slice(M).replaceAll(L, "")), nt !== this.editorDiv) {
              let j = O;
              for (const _ of this.editorDiv.childNodes) {
                if (_ === nt) {
                  j = H;
                  continue;
                }
                j.push(C.#g(_));
              }
            }
            O.push(P.nodeValue.slice(0, M).replaceAll(L, ""));
          } else if (P === this.editorDiv) {
            let nt = O, j = 0;
            for (const _ of this.editorDiv.childNodes)
              j++ === M && (nt = H), nt.push(C.#g(_));
          }
          this.#a = `${O.join(`
`)}${p}${H.join(`
`)}`, this.#f();
          const B = new Range();
          let q = O.reduce((nt, j) => nt + j.length, 0);
          for (const {
            firstChild: nt
          } of this.editorDiv.childNodes)
            if (nt.nodeType === Node.TEXT_NODE) {
              const j = nt.nodeValue.length;
              if (q <= j) {
                B.setStart(nt, q), B.setEnd(nt, q);
                break;
              }
              q -= j;
            }
          y.removeAllRanges(), y.addRange(B);
        }
        #f() {
          if (this.editorDiv.replaceChildren(), !!this.#a)
            for (const t of this.#a.split(`
`)) {
              const i = document.createElement("div");
              i.append(t ? document.createTextNode(t) : document.createElement("br")), this.editorDiv.append(i);
            }
        }
        #A() {
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
          if (t instanceof $.FreeTextAnnotationElement) {
            const {
              data: {
                defaultAppearanceData: {
                  fontSize: S,
                  fontColor: P
                },
                rect: M,
                rotation: O,
                id: H
              },
              textContent: B,
              textPosition: q,
              parent: {
                page: {
                  pageNumber: nt
                }
              }
            } = t;
            if (!B || B.length === 0)
              return null;
            p = t = {
              annotationType: w.AnnotationEditorType.FREETEXT,
              color: Array.from(P),
              fontSize: S,
              value: B.join(`
`),
              position: q,
              pageIndex: nt - 1,
              rect: M.slice(0),
              rotation: O,
              id: H,
              deleted: !1
            };
          }
          const y = super.deserialize(t, i, u);
          return y.#h = t.fontSize, y.#i = w.Util.makeHexColor(...t.color), y.#a = C.#m(t.value), y.annotationElementId = t.id || null, y.#d = p, y;
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
          const i = C._internalPadding * this.parentScale, u = this.getRect(i, i), p = z.AnnotationEditor._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.#i), y = {
            annotationType: w.AnnotationEditorType.FREETEXT,
            color: p,
            fontSize: this.#h,
            value: this.#A(),
            pageIndex: this.pageIndex,
            rect: u,
            rotation: this.rotation,
            structTreeParentId: this._structTreeParentId
          };
          return t ? y : this.annotationElementId && !this.#v(y) ? null : (y.id = this.annotationElementId, y);
        }
        #v(t) {
          const {
            value: i,
            fontSize: u,
            color: p,
            pageIndex: y
          } = this.#d;
          return this._hasBeenMoved || t.value !== i || t.fontSize !== u || t.color.some((S, P) => S !== p[P]) || t.pageIndex !== y;
        }
        renderAnnotationElement(t) {
          const i = super.renderAnnotationElement(t);
          if (this.deleted)
            return i;
          const {
            style: u
          } = i;
          u.fontSize = `calc(${this.#h}px * var(--scale-factor))`, u.color = this.#i, i.replaceChildren();
          for (const y of this.#a.split(`
`)) {
            const S = document.createElement("div");
            S.append(y ? document.createTextNode(y) : document.createElement("br")), i.append(S);
          }
          const p = C._internalPadding * this.parentScale;
          return t.updateEdited({
            rect: this.getRect(p, p)
          }), i;
        }
        resetAnnotationElement(t) {
          super.resetAnnotationElement(t), t.resetEdited();
        }
      }
      var x = U(61), v = U(259), r = U(419);
      class c extends z.AnnotationEditor {
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
        #o = this.#E.bind(this);
        #p = null;
        #g;
        #f = null;
        #A = "";
        #m;
        #v = "";
        static _defaultColor = null;
        static _defaultOpacity = 1;
        static _defaultThickness = 12;
        static _l10nPromise;
        static _type = "highlight";
        static _editorType = w.AnnotationEditorType.HIGHLIGHT;
        static _freeHighlightId = -1;
        static _freeHighlight = null;
        static _freeHighlightClipId = "";
        static get _keyboardManager() {
          const t = c.prototype;
          return (0, w.shadow)(this, "_keyboardManager", new N.KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], t._moveCaret, {
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
          }), this.color = t.color || c._defaultColor, this.#m = t.thickness || c._defaultThickness, this.#g = t.opacity || c._defaultOpacity, this.#s = t.boxes || null, this.#v = t.methodOfCreation || "", this.#A = t.text || "", this._isDraggable = !1, t.highlightId > -1 ? (this.#c = !0, this.#C(t), this.#b()) : (this.#t = t.anchorNode, this.#e = t.anchorOffset, this.#a = t.focusNode, this.#l = t.focusOffset, this.#w(), this.#b(), this.rotate(this.rotation));
        }
        get telemetryInitialData() {
          return {
            action: "added",
            type: this.#c ? "free_highlight" : "highlight",
            color: this._uiManager.highlightColorNames.get(this.color),
            thickness: this.#m,
            methodOfCreation: this.#v
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
          const t = new x.Outliner(this.#s, 1e-3);
          this.#d = t.getOutlines(), {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
          } = this.#d.box;
          const i = new x.Outliner(this.#s, 25e-4, 1e-3, this._uiManager.direction === "ltr");
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
            const H = this.parent.viewport.rotation;
            this.parent.drawLayer.updateLine(this.#u, t), this.parent.drawLayer.updateBox(this.#u, c.#S(this.#d.box, (H - this.rotation + 360) % 360)), this.parent.drawLayer.updateLine(this.#f, this.#i), this.parent.drawLayer.updateBox(this.#f, c.#S(this.#i.box, H));
          }
          const {
            x: y,
            y: S,
            width: P,
            height: M
          } = t.box;
          switch (this.rotation) {
            case 0:
              this.x = y, this.y = S, this.width = P, this.height = M;
              break;
            case 90: {
              const [H, B] = this.parentDimensions;
              this.x = S, this.y = 1 - y, this.width = P * B / H, this.height = M * H / B;
              break;
            }
            case 180:
              this.x = 1 - y, this.y = 1 - S, this.width = P, this.height = M;
              break;
            case 270: {
              const [H, B] = this.parentDimensions;
              this.x = 1 - S, this.y = y, this.width = P * B / H, this.height = M * H / B;
              break;
            }
          }
          const {
            lastPoint: O
          } = this.#i.box;
          this.#p = [(O[0] - y) / P, (O[1] - S) / M];
        }
        static initialize(t, i) {
          z.AnnotationEditor.initialize(t, i), c._defaultColor ||= i.highlightColors?.values().next().value || "#fff066";
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case w.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
              c._defaultColor = i;
              break;
            case w.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
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
            case w.AnnotationEditorParamsType.HIGHLIGHT_COLOR:
              this.#R(i);
              break;
            case w.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
              this.#I(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[w.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR, c._defaultColor], [w.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, c._defaultThickness]];
        }
        get propertiesToUpdate() {
          return [[w.AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.color || c._defaultColor], [w.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, this.#m || c._defaultThickness], [w.AnnotationEditorParamsType.HIGHLIGHT_FREE, this.#c]];
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
            type: w.AnnotationEditorParamsType.HIGHLIGHT_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          }), this._reportTelemetry({
            action: "color_changed",
            color: this._uiManager.highlightColorNames.get(t)
          }, !0);
        }
        #I(t) {
          const i = this.#m, u = (p) => {
            this.#m = p, this.#P(p);
          };
          this.addCommands({
            cmd: u.bind(this, t),
            undo: u.bind(this, i),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: w.AnnotationEditorParamsType.INK_THICKNESS,
            overwriteIfSameType: !0,
            keepUndo: !0
          }), this._reportTelemetry({
            action: "thickness_changed",
            thickness: t
          }, !0);
        }
        async addEditToolbar() {
          const t = await super.addEditToolbar();
          return t ? (this._uiManager.highlightColors && (this.#r = new v.ColorPicker({
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
        #P(t) {
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
        }, y) {
          switch (y) {
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
          this.#A && (t.setAttribute("aria-label", this.#A), t.setAttribute("role", "mark")), this.#c ? t.classList.add("free") : this.div.addEventListener("keydown", this.#o);
          const i = this.#h = document.createElement("div");
          t.append(i), i.setAttribute("aria-hidden", "true"), i.className = "internal", i.style.clipPath = this.#n;
          const [u, p] = this.parentDimensions;
          return this.setDims(this.width * u, this.height * p), (0, N.bindEvents)(this, this.#h, ["pointerover", "pointerleave"]), this.enableEditing(), t;
        }
        pointerover() {
          this.parent.drawLayer.addClass(this.#f, "hovered");
        }
        pointerleave() {
          this.parent.drawLayer.removeClass(this.#f, "hovered");
        }
        #E(t) {
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
          let y = 0;
          for (const {
            x: S,
            y: P,
            width: M,
            height: O
          } of u) {
            const H = S * t, B = (1 - P - O) * i;
            p[y] = p[y + 4] = H, p[y + 1] = p[y + 3] = B, p[y + 2] = p[y + 6] = H + M * t, p[y + 5] = p[y + 7] = B + O * i, y += 8;
          }
          return p;
        }
        #F(t) {
          return this.#d.serialize(t, this.#T());
        }
        static startHighlighting(t, i, {
          target: u,
          x: p,
          y
        }) {
          const {
            x: S,
            y: P,
            width: M,
            height: O
          } = u.getBoundingClientRect(), H = (j) => {
            this.#N(t, j);
          }, B = {
            capture: !0,
            passive: !1
          }, q = (j) => {
            j.preventDefault(), j.stopPropagation();
          }, nt = (j) => {
            u.removeEventListener("pointermove", H), window.removeEventListener("blur", nt), window.removeEventListener("pointerup", nt), window.removeEventListener("pointerdown", q, B), window.removeEventListener("contextmenu", r.noContextMenu), this.#L(t, j);
          };
          window.addEventListener("blur", nt), window.addEventListener("pointerup", nt), window.addEventListener("pointerdown", q, B), window.addEventListener("contextmenu", r.noContextMenu), u.addEventListener("pointermove", H), this._freeHighlight = new x.FreeOutliner({
            x: p,
            y
          }, [S, P, M, O], t.scale, this._defaultThickness / 2, i, 1e-3), {
            id: this._freeHighlightId,
            clipPathId: this._freeHighlightClipId
          } = t.drawLayer.highlight(this._freeHighlight, this._defaultColor, this._defaultOpacity, !0);
        }
        static #N(t, i) {
          this._freeHighlight.add(i) && t.drawLayer.updatePath(this._freeHighlightId, this._freeHighlight);
        }
        static #L(t, i) {
          this._freeHighlight.isEmpty() ? t.drawLayer.removeFreeHighlight(this._freeHighlightId) : t.createAndAddNewEditor(i, !1, {
            highlightId: this._freeHighlightId,
            highlightOutlines: this._freeHighlight.getOutlines(),
            clipPathId: this._freeHighlightClipId,
            methodOfCreation: "main_toolbar"
          }), this._freeHighlightId = -1, this._freeHighlight = null, this._freeHighlightClipId = "";
        }
        static deserialize(t, i, u) {
          const p = super.deserialize(t, i, u), {
            rect: [y, S, P, M],
            color: O,
            quadPoints: H
          } = t;
          p.color = w.Util.makeHexColor(...O), p.#g = t.opacity;
          const [B, q] = p.pageDimensions;
          p.width = (P - y) / B, p.height = (M - S) / q;
          const nt = p.#s = [];
          for (let j = 0; j < H.length; j += 8)
            nt.push({
              x: (H[4] - P) / B,
              y: (M - (1 - H[j + 5])) / q,
              width: (H[j + 2] - H[j]) / B,
              height: (H[j + 5] - H[j + 1]) / q
            });
          return p.#w(), p;
        }
        serialize(t = !1) {
          if (this.isEmpty() || t)
            return null;
          const i = this.getRect(0, 0), u = z.AnnotationEditor._colorManager.convert(this.color);
          return {
            annotationType: w.AnnotationEditorType.HIGHLIGHT,
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
      class l extends z.AnnotationEditor {
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
        static _editorType = w.AnnotationEditorType.INK;
        constructor(t) {
          super({
            ...t,
            name: "inkEditor"
          }), this.color = t.color || null, this.thickness = t.thickness || null, this.opacity = t.opacity || null, this.paths = [], this.bezierPath2D = [], this.allRawPaths = [], this.currentPath = [], this.scaleFactor = 1, this.translationX = this.translationY = 0, this.x = 0, this.y = 0, this._willKeepAspectRatio = !0;
        }
        static initialize(t, i) {
          z.AnnotationEditor.initialize(t, i);
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case w.AnnotationEditorParamsType.INK_THICKNESS:
              l._defaultThickness = i;
              break;
            case w.AnnotationEditorParamsType.INK_COLOR:
              l._defaultColor = i;
              break;
            case w.AnnotationEditorParamsType.INK_OPACITY:
              l._defaultOpacity = i / 100;
              break;
          }
        }
        updateParams(t, i) {
          switch (t) {
            case w.AnnotationEditorParamsType.INK_THICKNESS:
              this.#f(i);
              break;
            case w.AnnotationEditorParamsType.INK_COLOR:
              this.#A(i);
              break;
            case w.AnnotationEditorParamsType.INK_OPACITY:
              this.#m(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[w.AnnotationEditorParamsType.INK_THICKNESS, l._defaultThickness], [w.AnnotationEditorParamsType.INK_COLOR, l._defaultColor || z.AnnotationEditor._defaultLineColor], [w.AnnotationEditorParamsType.INK_OPACITY, Math.round(l._defaultOpacity * 100)]];
        }
        get propertiesToUpdate() {
          return [[w.AnnotationEditorParamsType.INK_THICKNESS, this.thickness || l._defaultThickness], [w.AnnotationEditorParamsType.INK_COLOR, this.color || l._defaultColor || z.AnnotationEditor._defaultLineColor], [w.AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * (this.opacity ?? l._defaultOpacity))]];
        }
        #f(t) {
          const i = (p) => {
            this.thickness = p, this.#O();
          }, u = this.thickness;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: w.AnnotationEditorParamsType.INK_THICKNESS,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #A(t) {
          const i = (p) => {
            this.color = p, this.#E();
          }, u = this.color;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: w.AnnotationEditorParamsType.INK_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #m(t) {
          const i = (p) => {
            this.opacity = p, this.#E();
          };
          t /= 100;
          const u = this.opacity;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, u),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: w.AnnotationEditorParamsType.INK_OPACITY,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.canvas || (this.#T(), this.#M()), this.isAttachedToDOM || (this.parent.add(this), this.#F()), this.#O()));
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
        #v() {
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
            parentScale: y,
            scaleFactor: S
          } = this;
          t.lineWidth = p * y / S, t.lineCap = "round", t.lineJoin = "round", t.miterLimit = 10, t.strokeStyle = `${i}${(0, N.opacityToHex)(u)}`;
        }
        #C(t, i) {
          this.canvas.addEventListener("contextmenu", r.noContextMenu), this.canvas.addEventListener("pointerleave", this.#n), this.canvas.addEventListener("pointermove", this.#s), this.canvas.addEventListener("pointerup", this.#r), this.canvas.removeEventListener("pointerdown", this.#i), this.isEditing = !0, this.#u || (this.#u = !0, this.#F(), this.thickness ||= l._defaultThickness, this.color ||= l._defaultColor || z.AnnotationEditor._defaultLineColor, this.opacity ??= l._defaultOpacity), this.currentPath.push([t, i]), this.#d = !1, this.#w(), this.#g = () => {
            this.#y(), this.#g && window.requestAnimationFrame(this.#g);
          }, window.requestAnimationFrame(this.#g);
        }
        #R(t, i) {
          const [u, p] = this.currentPath.at(-1);
          if (this.currentPath.length > 1 && t === u && i === p)
            return;
          const y = this.currentPath;
          let S = this.#l;
          if (y.push([t, i]), this.#d = !0, y.length <= 2) {
            S.moveTo(...y[0]), S.lineTo(t, i);
            return;
          }
          y.length === 3 && (this.#l = S = new Path2D(), S.moveTo(...y[0])), this.#b(S, ...y.at(-3), ...y.at(-2), t, i);
        }
        #I() {
          if (this.currentPath.length === 0)
            return;
          const t = this.currentPath.at(-1);
          this.#l.lineTo(...t);
        }
        #P(t, i) {
          this.#g = null, t = Math.min(Math.max(t, 0), this.canvas.width), i = Math.min(Math.max(i, 0), this.canvas.height), this.#R(t, i), this.#I();
          let u;
          if (this.currentPath.length !== 1)
            u = this.#S();
          else {
            const M = [t, i];
            u = [[M, M.slice(), M.slice(), M]];
          }
          const p = this.#l, y = this.currentPath;
          this.currentPath = [], this.#l = new Path2D();
          const S = () => {
            this.allRawPaths.push(y), this.paths.push(u), this.bezierPath2D.push(p), this._uiManager.rebuild(this);
          }, P = () => {
            this.allRawPaths.pop(), this.paths.pop(), this.bezierPath2D.pop(), this.paths.length === 0 ? this.remove() : (this.canvas || (this.#T(), this.#M()), this.#O());
          };
          this.addCommands({
            cmd: S,
            undo: P,
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
            ctx: y
          } = this;
          y.save(), y.clearRect(0, 0, this.canvas.width, this.canvas.height);
          for (const S of this.bezierPath2D)
            y.stroke(S);
          y.stroke(this.#l), y.restore();
        }
        #b(t, i, u, p, y, S, P) {
          const M = (i + p) / 2, O = (u + y) / 2, H = (p + S) / 2, B = (y + P) / 2;
          t.bezierCurveTo(M + 2 * (p - M) / 3, O + 2 * (y - O) / 3, H + 2 * (p - H) / 3, B + 2 * (y - B) / 3, H, B);
        }
        #S() {
          const t = this.currentPath;
          if (t.length <= 2)
            return [[t[0], t[0], t.at(-1), t.at(-1)]];
          const i = [];
          let u, [p, y] = t[0];
          for (u = 1; u < t.length - 2; u++) {
            const [q, nt] = t[u], [j, _] = t[u + 1], G = (q + j) / 2, Y = (nt + _) / 2, tt = [p + 2 * (q - p) / 3, y + 2 * (nt - y) / 3], Z = [G + 2 * (q - G) / 3, Y + 2 * (nt - Y) / 3];
            i.push([[p, y], tt, Z, [G, Y]]), [p, y] = [G, Y];
          }
          const [S, P] = t[u], [M, O] = t[u + 1], H = [p + 2 * (S - p) / 3, y + 2 * (P - y) / 3], B = [M + 2 * (S - M) / 3, O + 2 * (P - O) / 3];
          return i.push([[p, y], H, B, [M, O]]), i;
        }
        #E() {
          if (this.isEmpty()) {
            this.#L();
            return;
          }
          this.#w();
          const {
            canvas: t,
            ctx: i
          } = this;
          i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, t.width, t.height), this.#L();
          for (const u of this.bezierPath2D)
            i.stroke(u);
        }
        commit() {
          this.#h || (super.commit(), this.isEditing = !1, this.disableEditMode(), this.setInForeground(), this.#h = !0, this.div.classList.add("disabled"), this.#O(!0), this.select(), this.parent.addInkEditorIfNeeded(!0), this.moveInDOM(), this.div.focus({
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
          }, 10), this.#P(t.offsetX, t.offsetY), this.addToAnnotationStorage(), this.setInBackground();
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
          const [u, p, y, S] = this.#v();
          if (this.setAt(u, p, 0, 0), this.setDims(y, S), this.#T(), this.width) {
            const [P, M] = this.parentDimensions;
            this.setAspectRatio(this.width * P, this.height * M), this.setAt(t * P, i * M, this.width * P, this.height * M), this.#u = !0, this.#F(), this.setDims(this.width * P, this.height * M), this.#E(), this.div.classList.add("disabled");
          } else
            this.div.classList.add("editing"), this.enableEditMode();
          return this.#M(), this.div;
        }
        #F() {
          if (!this.#u)
            return;
          const [t, i] = this.parentDimensions;
          this.canvas.width = Math.ceil(this.width * t), this.canvas.height = Math.ceil(this.height * i), this.#L();
        }
        setDimensions(t, i) {
          const u = Math.round(t), p = Math.round(i);
          if (this.#o === u && this.#p === p)
            return;
          this.#o = u, this.#p = p, this.canvas.style.visibility = "hidden";
          const [y, S] = this.parentDimensions;
          this.width = t / y, this.height = i / S, this.fixAndSetPosition(), this.#h && this.#N(t, i), this.#F(), this.#E(), this.canvas.style.visibility = "visible", this.fixDims();
        }
        #N(t, i) {
          const u = this.#B(), p = (t - u) / this.#e, y = (i - u) / this.#t;
          this.scaleFactor = Math.min(p, y);
        }
        #L() {
          const t = this.#B() / 2;
          this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.translationX * this.scaleFactor + t, this.translationY * this.scaleFactor + t);
        }
        static #D(t) {
          const i = new Path2D();
          for (let u = 0, p = t.length; u < p; u++) {
            const [y, S, P, M] = t[u];
            u === 0 && i.moveTo(...y), i.bezierCurveTo(S[0], S[1], P[0], P[1], M[0], M[1]);
          }
          return i;
        }
        static #G(t, i, u) {
          const [p, y, S, P] = i;
          switch (u) {
            case 0:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] += p, t[M + 1] = P - t[M + 1];
              break;
            case 90:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const H = t[M];
                t[M] = t[M + 1] + p, t[M + 1] = H + y;
              }
              break;
            case 180:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] = S - t[M], t[M + 1] += y;
              break;
            case 270:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const H = t[M];
                t[M] = S - t[M + 1], t[M + 1] = P - H;
              }
              break;
            default:
              throw new Error("Invalid rotation");
          }
          return t;
        }
        static #U(t, i, u) {
          const [p, y, S, P] = i;
          switch (u) {
            case 0:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] -= p, t[M + 1] = P - t[M + 1];
              break;
            case 90:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const H = t[M];
                t[M] = t[M + 1] - y, t[M + 1] = H - p;
              }
              break;
            case 180:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] = S - t[M], t[M + 1] -= y;
              break;
            case 270:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const H = t[M];
                t[M] = P - t[M + 1], t[M + 1] = S - H;
              }
              break;
            default:
              throw new Error("Invalid rotation");
          }
          return t;
        }
        #X(t, i, u, p) {
          const y = [], S = this.thickness / 2, P = t * i + S, M = t * u + S;
          for (const O of this.paths) {
            const H = [], B = [];
            for (let q = 0, nt = O.length; q < nt; q++) {
              const [j, _, G, Y] = O[q];
              if (j[0] === Y[0] && j[1] === Y[1] && nt === 1) {
                const et = t * j[0] + P, m = t * j[1] + M;
                H.push(et, m), B.push(et, m);
                break;
              }
              const tt = t * j[0] + P, Z = t * j[1] + M, at = t * _[0] + P, lt = t * _[1] + M, pt = t * G[0] + P, dt = t * G[1] + M, ot = t * Y[0] + P, ut = t * Y[1] + M;
              q === 0 && (H.push(tt, Z), B.push(tt, Z)), H.push(at, lt, pt, dt, ot, ut), B.push(at, lt), q === nt - 1 && B.push(ot, ut);
            }
            y.push({
              bezier: l.#G(H, p, this.rotation),
              points: l.#G(B, p, this.rotation)
            });
          }
          return y;
        }
        #$() {
          let t = 1 / 0, i = -1 / 0, u = 1 / 0, p = -1 / 0;
          for (const y of this.paths)
            for (const [S, P, M, O] of y) {
              const H = w.Util.bezierBoundingBox(...S, ...P, ...M, ...O);
              t = Math.min(t, H[0]), u = Math.min(u, H[1]), i = Math.max(i, H[2]), p = Math.max(p, H[3]);
            }
          return [t, u, i, p];
        }
        #B() {
          return this.#h ? Math.ceil(this.thickness * this.parentScale) : 0;
        }
        #O(t = !1) {
          if (this.isEmpty())
            return;
          if (!this.#h) {
            this.#E();
            return;
          }
          const i = this.#$(), u = this.#B();
          this.#e = Math.max(z.AnnotationEditor.MIN_SIZE, i[2] - i[0]), this.#t = Math.max(z.AnnotationEditor.MIN_SIZE, i[3] - i[1]);
          const p = Math.ceil(u + this.#e * this.scaleFactor), y = Math.ceil(u + this.#t * this.scaleFactor), [S, P] = this.parentDimensions;
          this.width = p / S, this.height = y / P, this.setAspectRatio(p, y);
          const M = this.translationX, O = this.translationY;
          this.translationX = -i[0], this.translationY = -i[1], this.#F(), this.#E(), this.#o = p, this.#p = y, this.setDims(p, y);
          const H = t ? u / this.scaleFactor / 2 : 0;
          this.translate(M - this.translationX - H, O - this.translationY - H);
        }
        static deserialize(t, i, u) {
          if (t instanceof $.InkAnnotationElement)
            return null;
          const p = super.deserialize(t, i, u);
          p.thickness = t.thickness, p.color = w.Util.makeHexColor(...t.color), p.opacity = t.opacity;
          const [y, S] = p.pageDimensions, P = p.width * y, M = p.height * S, O = p.parentScale, H = t.thickness / 2;
          p.#h = !0, p.#o = Math.round(P), p.#p = Math.round(M);
          const {
            paths: B,
            rect: q,
            rotation: nt
          } = t;
          for (let {
            bezier: _
          } of B) {
            _ = l.#U(_, q, nt);
            const G = [];
            p.paths.push(G);
            let Y = O * (_[0] - H), tt = O * (_[1] - H);
            for (let at = 2, lt = _.length; at < lt; at += 6) {
              const pt = O * (_[at] - H), dt = O * (_[at + 1] - H), ot = O * (_[at + 2] - H), ut = O * (_[at + 3] - H), et = O * (_[at + 4] - H), m = O * (_[at + 5] - H);
              G.push([[Y, tt], [pt, dt], [ot, ut], [et, m]]), Y = et, tt = m;
            }
            const Z = this.#D(G);
            p.bezierPath2D.push(Z);
          }
          const j = p.#$();
          return p.#e = Math.max(z.AnnotationEditor.MIN_SIZE, j[2] - j[0]), p.#t = Math.max(z.AnnotationEditor.MIN_SIZE, j[3] - j[1]), p.#N(P, M), p;
        }
        serialize() {
          if (this.isEmpty())
            return null;
          const t = this.getRect(0, 0), i = z.AnnotationEditor._colorManager.convert(this.ctx.strokeStyle);
          return {
            annotationType: w.AnnotationEditorType.INK,
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
      class b extends z.AnnotationEditor {
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
        static _editorType = w.AnnotationEditorType.STAMP;
        constructor(t) {
          super({
            ...t,
            name: "stampEditor"
          }), this.#n = t.bitmapUrl, this.#r = t.bitmapFile;
        }
        static initialize(t, i) {
          z.AnnotationEditor.initialize(t, i);
        }
        static get supportedTypes() {
          const t = ["apng", "avif", "bmp", "gif", "jpeg", "png", "svg+xml", "webp", "x-icon"];
          return (0, w.shadow)(this, "supportedTypes", t.map((i) => `image/${i}`));
        }
        static get supportedTypesStr() {
          return (0, w.shadow)(this, "supportedTypesStr", this.supportedTypes.join(","));
        }
        static isHandlingMimeForPasting(t) {
          return this.supportedTypes.includes(t);
        }
        static paste(t, i) {
          i.pasteEditor(w.AnnotationEditorType.STAMP, {
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
          const [p, y] = this.pageDimensions, S = 0.75;
          if (this.width)
            i = this.width * p, u = this.height * y;
          else if (i > S * p || u > S * y) {
            const H = Math.min(S * p / i, S * y / u);
            i *= H, u *= H;
          }
          const [P, M] = this.parentDimensions;
          this.setDims(i * P / p, u * M / y), this._uiManager.enableWaiting(!1);
          const O = this.#a = document.createElement("canvas");
          t.append(O), t.hidden = !1, this.#m(i, u), this.#w(), this.#u || (this.parent.addUndoableEditor(this), this.#u = !0), this._reportTelemetry({
            action: "inserted_image"
          }), this.#i && O.setAttribute("aria-label", this.#i);
        }
        #f(t, i) {
          const [u, p] = this.parentDimensions;
          this.width = t / u, this.height = i / p, this.setDims(t, i), this._initialOptions?.isCentered ? this.center() : this.fixAndSetPosition(), this._initialOptions = null, this.#h !== null && clearTimeout(this.#h);
          const y = 200;
          this.#h = setTimeout(() => {
            this.#h = null, this.#m(t, i);
          }, y);
        }
        #A(t, i) {
          const {
            width: u,
            height: p
          } = this.#t;
          let y = u, S = p, P = this.#t;
          for (; y > 2 * t || S > 2 * i; ) {
            const M = y, O = S;
            y > 2 * t && (y = y >= 16384 ? Math.floor(y / 2) - 1 : Math.ceil(y / 2)), S > 2 * i && (S = S >= 16384 ? Math.floor(S / 2) - 1 : Math.ceil(S / 2));
            const H = new OffscreenCanvas(y, S);
            H.getContext("2d").drawImage(P, 0, 0, M, O, 0, 0, y, S), P = H.transferToImageBitmap();
          }
          return P;
        }
        #m(t, i) {
          t = Math.ceil(t), i = Math.ceil(i);
          const u = this.#a;
          if (!u || u.width === t && u.height === i)
            return;
          u.width = t, u.height = i;
          const p = this.#d ? this.#t : this.#A(t, i);
          if (this._uiManager.hasMLManager && !this.hasAltText()) {
            const S = new OffscreenCanvas(t, i);
            S.getContext("2d").drawImage(p, 0, 0, p.width, p.height, 0, 0, t, i), S.convertToBlob().then((M) => {
              const O = new FileReader();
              O.onload = () => {
                const H = O.result;
                this._uiManager.mlGuess({
                  service: "image-to-text",
                  request: {
                    imageData: H
                  }
                }).then((B) => {
                  const q = B?.output || "";
                  this.parent && q && !this.hasAltText() && (this.altTextData = {
                    altText: q,
                    decorative: !1
                  });
                });
              }, O.readAsDataURL(M);
            });
          }
          const y = u.getContext("2d");
          y.filter = this._uiManager.hcmFilter, y.drawImage(p, 0, 0, p.width, p.height, 0, 0, t, i);
        }
        getImageForAltText() {
          return this.#a;
        }
        #v(t) {
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
            const [i, u] = this.pageDimensions, p = Math.round(this.width * i * r.PixelsPerInch.PDF_TO_CSS_UNITS), y = Math.round(this.height * u * r.PixelsPerInch.PDF_TO_CSS_UNITS), S = new OffscreenCanvas(p, y);
            return S.getContext("2d").drawImage(this.#t, 0, 0, this.#t.width, this.#t.height, 0, 0, p, y), S.transferToImageBitmap();
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
          if (t instanceof $.StampAnnotationElement)
            return null;
          const p = super.deserialize(t, i, u), {
            rect: y,
            bitmapUrl: S,
            bitmapId: P,
            isSvg: M,
            accessibilityData: O
          } = t;
          P && u.imageManager.isValidId(P) ? p.#e = P : p.#n = S, p.#d = M;
          const [H, B] = p.pageDimensions;
          return p.width = (y[2] - y[0]) / H, p.height = (y[3] - y[1]) / B, O && (p.altTextData = O), p;
        }
        serialize(t = !1, i = null) {
          if (this.isEmpty())
            return null;
          const u = {
            annotationType: w.AnnotationEditorType.STAMP,
            bitmapId: this.#e,
            pageIndex: this.pageIndex,
            rect: this.getRect(0, 0),
            rotation: this.rotation,
            isSvg: this.#d,
            structTreeParentId: this._structTreeParentId
          };
          if (t)
            return u.bitmapUrl = this.#v(!0), u.accessibilityData = this.altTextData, u;
          const {
            decorative: p,
            altText: y
          } = this.altTextData;
          if (!p && y && (u.accessibilityData = {
            type: "Figure",
            alt: y
          }), i === null)
            return u;
          i.stamps ||= /* @__PURE__ */ new Map();
          const S = this.#d ? (u.rect[2] - u.rect[0]) * (u.rect[3] - u.rect[1]) : null;
          if (!i.stamps.has(this.#e))
            i.stamps.set(this.#e, {
              area: S,
              serialized: u
            }), u.bitmap = this.#v(!1);
          else if (this.#d) {
            const P = i.stamps.get(this.#e);
            S > P.area && (P.area = S, P.serialized.bitmap.close(), P.serialized.bitmap = this.#v(!1));
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
        static #p = new Map([C, l, b, c].map((t) => [t._editorType, t]));
        constructor({
          uiManager: t,
          pageIndex: i,
          div: u,
          accessibilityManager: p,
          annotationLayer: y,
          drawLayer: S,
          textLayer: P,
          viewport: M,
          l10n: O
        }) {
          const H = [...s.#p.values()];
          if (!s._initialized) {
            s._initialized = !0;
            for (const B of H)
              B.initialize(O, t);
          }
          t.registerEditorTypes(H), this.#o = t, this.pageIndex = i, this.div = u, this.#t = p, this.#s = y, this.viewport = M, this.#c = P, this.drawLayer = S, this.#o.addLayer(this);
        }
        get isEmpty() {
          return this.#l.size === 0;
        }
        get isInvisible() {
          return this.isEmpty && this.#o.getMode() === w.AnnotationEditorType.NONE;
        }
        updateToolbar(t) {
          this.#o.updateToolbar(t);
        }
        updateMode(t = this.#o.getMode()) {
          switch (this.#v(), t) {
            case w.AnnotationEditorType.NONE:
              this.disableTextSelection(), this.togglePointerEvents(!1), this.toggleAnnotationLayerPointerEvents(!0), this.disableClick();
              return;
            case w.AnnotationEditorType.INK:
              this.addInkEditorIfNeeded(!1), this.disableTextSelection(), this.togglePointerEvents(!0), this.disableClick();
              break;
            case w.AnnotationEditorType.HIGHLIGHT:
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
          if (this.#o.getMode() !== w.AnnotationEditorType.INK)
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
            for (const y of p) {
              const {
                id: S
              } = y.data;
              if (this.#o.isDeletedAnnotationElement(S))
                continue;
              let P = i.get(S);
              if (P) {
                P.resetAnnotationElement(y), P.show(!1), y.show();
                continue;
              }
              P = t.get(S), P && (this.#o.addChangedExistingAnnotation(P), P.renderAnnotationElement(y), P.show(!1)), y.show();
            }
          }
          this.#v(), this.isEmpty && (this.div.hidden = !0);
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
            } = w.FeatureTest.platform;
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
          t.parent !== this && (t.parent && t.annotationElementId && (this.#o.addDeletedAnnotationElement(t.annotationElementId), z.AnnotationEditor.deleteAnnotationElement(t), t.annotationElementId = null), this.attach(t), t.parent?.detach(t), t.setParent(this), t.div && t.isAttachedToDOM && (t.div.remove(), this.div.append(t.div)));
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
        #A(t) {
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
          } = this.#m(), y = this.getNextId(), S = this.#A({
            parent: this,
            id: y,
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
          const p = this.getNextId(), y = this.#A({
            parent: this,
            id: p,
            x: t.offsetX,
            y: t.offsetY,
            uiManager: this.#o,
            isCentered: i,
            ...u
          });
          return y && this.add(y), y;
        }
        #m() {
          const {
            x: t,
            y: i,
            width: u,
            height: p
          } = this.div.getBoundingClientRect(), y = Math.max(0, t), S = Math.max(0, i), P = Math.min(window.innerWidth, t + u), M = Math.min(window.innerHeight, i + p), O = (y + P) / 2 - t, H = (S + M) / 2 - i, [B, q] = this.viewport.rotation % 180 === 0 ? [O, H] : [H, O];
          return {
            offsetX: B,
            offsetY: q
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
          } = w.FeatureTest.platform;
          if (!(t.button !== 0 || t.ctrlKey && i) && t.target === this.div && this.#h) {
            if (this.#h = !1, !this.#e) {
              this.#e = !0;
              return;
            }
            if (this.#o.getMode() === w.AnnotationEditorType.STAMP) {
              this.#o.unselectAll();
              return;
            }
            this.createAndAddNewEditor(t, !1);
          }
        }
        pointerdown(t) {
          if (this.#o.getMode() === w.AnnotationEditorType.HIGHLIGHT && this.enableTextSelection(), this.#h) {
            this.#h = !1;
            return;
          }
          const {
            isMac: i
          } = w.FeatureTest.platform;
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
        #v() {
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
          this.#o.commitOrRemove(), this.#v();
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
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        ColorPicker: () => (
          /* binding */
          $
        )
        /* harmony export */
      });
      var w = U(292), z = U(830), N = U(419);
      class $ {
        #t = this.#g.bind(this);
        #e = this.#A.bind(this);
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
          return (0, w.shadow)(this, "_keyboardManager", new z.KeyboardManager([[["Escape", "mac+Escape"], $.prototype._hideDropdownFromKeyboard], [[" ", "mac+ "], $.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight", "mac+ArrowDown", "mac+ArrowRight"], $.prototype._moveToNext], [["ArrowUp", "ArrowLeft", "mac+ArrowUp", "mac+ArrowLeft"], $.prototype._moveToPrevious], [["Home", "mac+Home"], $.prototype._moveToBeginning], [["End", "mac+End"], $.prototype._moveToEnd]]));
        }
        constructor({
          editor: C = null,
          uiManager: x = null
        }) {
          C ? (this.#l = !1, this.#c = w.AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.#h = C) : (this.#l = !0, this.#c = w.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR), this.#u = C?._uiManager || x, this.#d = this.#u._eventBus, this.#r = C?.color || this.#u?.highlightColors.values().next().value || "#FFFF98";
        }
        renderButton() {
          const C = this.#s = document.createElement("button");
          C.className = "colorPicker", C.tabIndex = "0", C.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"), C.setAttribute("aria-haspopup", !0), C.addEventListener("click", this.#f.bind(this)), C.addEventListener("keydown", this.#t);
          const x = this.#n = document.createElement("span");
          return x.className = "swatch", x.setAttribute("aria-hidden", !0), x.style.backgroundColor = this.#r, C.append(x), C;
        }
        renderMainDropdown() {
          const C = this.#i = this.#o();
          return C.setAttribute("aria-orientation", "horizontal"), C.setAttribute("aria-labelledby", "highlightColorPickerLabel"), C;
        }
        #o() {
          const C = document.createElement("div");
          C.addEventListener("contextmenu", N.noContextMenu), C.className = "dropdown", C.role = "listbox", C.setAttribute("aria-multiselectable", !1), C.setAttribute("aria-orientation", "vertical"), C.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown");
          for (const [x, v] of this.#u.highlightColors) {
            const r = document.createElement("button");
            r.tabIndex = "0", r.role = "option", r.setAttribute("data-color", v), r.title = x, r.setAttribute("data-l10n-id", `pdfjs-editor-colorpicker-${x}`);
            const c = document.createElement("span");
            r.append(c), c.className = "swatch", c.style.backgroundColor = v, r.setAttribute("aria-selected", v === this.#r), r.addEventListener("click", this.#p.bind(this, v)), C.append(r);
          }
          return C.addEventListener("keydown", this.#t), C;
        }
        #p(C, x) {
          x.stopPropagation(), this.#d.dispatch("switchannotationeditorparams", {
            source: this,
            type: this.#c,
            value: C
          });
        }
        _colorSelectFromKeyboard(C) {
          if (C.target === this.#s) {
            this.#f(C);
            return;
          }
          const x = C.target.getAttribute("data-color");
          x && this.#p(x, C);
        }
        _moveToNext(C) {
          if (!this.#m) {
            this.#f(C);
            return;
          }
          if (C.target === this.#s) {
            this.#i.firstChild?.focus();
            return;
          }
          C.target.nextSibling?.focus();
        }
        _moveToPrevious(C) {
          if (C.target === this.#i?.firstChild || C.target === this.#s) {
            this.#m && this._hideDropdownFromKeyboard();
            return;
          }
          this.#m || this.#f(C), C.target.previousSibling?.focus();
        }
        _moveToBeginning(C) {
          if (!this.#m) {
            this.#f(C);
            return;
          }
          this.#i.firstChild?.focus();
        }
        _moveToEnd(C) {
          if (!this.#m) {
            this.#f(C);
            return;
          }
          this.#i.lastChild?.focus();
        }
        #g(C) {
          $._keyboardManager.exec(this, C);
        }
        #f(C) {
          if (this.#m) {
            this.hideDropdown();
            return;
          }
          if (this.#a = C.detail === 0, window.addEventListener("pointerdown", this.#e), this.#i) {
            this.#i.classList.remove("hidden");
            return;
          }
          const x = this.#i = this.#o();
          this.#s.append(x);
        }
        #A(C) {
          this.#i?.contains(C.target) || this.hideDropdown();
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
        updateColor(C) {
          if (this.#n && (this.#n.style.backgroundColor = C), !this.#i)
            return;
          const x = this.#u.highlightColors.values();
          for (const v of this.#i.children)
            v.setAttribute("aria-selected", x.next().value === C);
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
    (ct, st, U) => {
      U.d(st, {
        AnnotationEditor: () => (
          /* binding */
          C
        )
      });
      var w = U(830), z = U(292), N = U(419);
      class $ {
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
          $._l10nPromise ||= r;
        }
        async render() {
          const r = this.#s = document.createElement("button");
          r.className = "altText";
          const c = await $._l10nPromise.get("pdfjs-editor-alt-text-button-label");
          r.textContent = c, r.setAttribute("aria-label", c), r.tabIndex = "0", r.addEventListener("contextmenu", N.noContextMenu), r.addEventListener("pointerdown", (b) => b.stopPropagation());
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
          r.classList.add("done"), $._l10nPromise.get("pdfjs-editor-alt-text-edit-button-label").then((b) => {
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
          c.innerText = this.#e ? await $._l10nPromise.get("pdfjs-editor-alt-text-decorative-tooltip") : this.#t, c.parentNode || r.append(c), this.#a.getImageForAltText()?.setAttribute("aria-describedby", c.id);
        }
      }
      var L = U(362);
      class C {
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
        #A = 0;
        #m = 0;
        #v = null;
        _initialOptions = /* @__PURE__ */ Object.create(null);
        _isVisible = !0;
        _uiManager = null;
        _focusEventsAllowed = !0;
        _l10nPromise = null;
        #w = !1;
        #C = C._zIndex++;
        static _borderLineWidth = -1;
        static _colorManager = new w.ColorManager();
        static _zIndex = 1;
        static _telemetryTimeout = 1e3;
        static get _resizerKeyboardManager() {
          const r = C.prototype._resizeWithKeyboard, c = w.AnnotationEditorUIManager.TRANSLATE_SMALL, l = w.AnnotationEditorUIManager.TRANSLATE_BIG;
          return (0, z.shadow)(this, "_resizerKeyboardManager", new w.KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], r, {
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
          }], [["Escape", "mac+Escape"], C.prototype._stopResizingWithKeyboard]]));
        }
        constructor(r) {
          this.constructor === C && (0, z.unreachable)("Cannot initialize AnnotationEditor."), this.parent = r.parent, this.id = r.id, this.width = this.height = null, this.pageIndex = r.parent.pageIndex, this.name = r.name, this.div = null, this._uiManager = r.uiManager, this.annotationElementId = null, this._willKeepAspectRatio = !1, this._initialOptions.isCentered = r.isCentered, this._structTreeParentId = null;
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
          return (0, z.shadow)(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
        }
        static deleteAnnotationElement(r) {
          const c = new x({
            id: r.parent.getNextId(),
            parent: r.parent,
            uiManager: r._uiManager
          });
          c.annotationElementId = r.annotationElementId, c.deleted = !0, c._uiManager.addToAnnotationStorage(c);
        }
        static initialize(r, c, l) {
          if (C._l10nPromise ||= new Map(["pdfjs-editor-alt-text-button-label", "pdfjs-editor-alt-text-edit-button-label", "pdfjs-editor-alt-text-decorative-tooltip", "pdfjs-editor-resizer-label-topLeft", "pdfjs-editor-resizer-label-topMiddle", "pdfjs-editor-resizer-label-topRight", "pdfjs-editor-resizer-label-middleRight", "pdfjs-editor-resizer-label-bottomRight", "pdfjs-editor-resizer-label-bottomMiddle", "pdfjs-editor-resizer-label-bottomLeft", "pdfjs-editor-resizer-label-middleLeft"].map((s) => [s, r.get(s.replaceAll(/([A-Z])/g, (g) => `-${g.toLowerCase()}`))])), l?.strings)
            for (const s of l.strings)
              C._l10nPromise.set(s, r.get(s));
          if (C._borderLineWidth !== -1)
            return;
          const b = getComputedStyle(document.documentElement);
          C._borderLineWidth = parseFloat(b.getPropertyValue("--outline-width")) || 0;
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
          (0, z.unreachable)("Not implemented");
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
          r !== null ? (this.pageIndex = r.pageIndex, this.pageDimensions = r.pageDimensions) : this.#D(), this.parent = r;
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
          } = C, b = l / r, s = l / c;
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
          return C.#I(r, c, this.parentRotation);
        }
        pageTranslationToScreen(r, c) {
          return C.#I(r, c, 360 - this.parentRotation);
        }
        #P(r) {
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
          return z.FeatureTest.isCSSRoundSupported ? [Math.round(b), Math.round(s)] : [b, s];
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
            this.#r.append(l), l.classList.add("resizer", c), l.setAttribute("data-resizer-name", c), l.addEventListener("pointerdown", this.#b.bind(this, c)), l.addEventListener("contextmenu", N.noContextMenu), l.tabIndex = -1;
          }
          this.div.prepend(this.#r);
        }
        #b(r, c) {
          c.preventDefault();
          const {
            isMac: l
          } = z.FeatureTest.platform;
          if (c.button !== 0 || c.ctrlKey && l)
            return;
          this.#e?.toggle(!1);
          const b = this.#E.bind(this, r), s = this._isDraggable;
          this._isDraggable = !1;
          const g = {
            passive: !0,
            capture: !0
          };
          this.parent.togglePointerEvents(!1), window.addEventListener("pointermove", b, g), window.addEventListener("contextmenu", N.noContextMenu);
          const t = this.x, i = this.y, u = this.width, p = this.height, y = this.parent.div.style.cursor, S = this.div.style.cursor;
          this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(c.target).cursor;
          const P = () => {
            this.parent.togglePointerEvents(!0), this.#e?.toggle(!0), this._isDraggable = s, window.removeEventListener("pointerup", P), window.removeEventListener("blur", P), window.removeEventListener("pointermove", b, g), window.removeEventListener("contextmenu", N.noContextMenu), this.parent.div.style.cursor = y, this.div.style.cursor = S, this.#S(t, i, u, p);
          };
          window.addEventListener("pointerup", P), window.addEventListener("blur", P);
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
        #E(r, c) {
          const [l, b] = this.parentDimensions, s = this.x, g = this.y, t = this.width, i = this.height, u = C.MIN_SIZE / l, p = C.MIN_SIZE / b, y = (m) => Math.round(m * 1e4) / 1e4, S = this.#P(this.rotation), P = (m, h) => [S[0] * m + S[2] * h, S[1] * m + S[3] * h], M = this.#P(360 - this.rotation), O = (m, h) => [M[0] * m + M[2] * h, M[1] * m + M[3] * h];
          let H, B, q = !1, nt = !1;
          switch (r) {
            case "topLeft":
              q = !0, H = (m, h) => [0, 0], B = (m, h) => [m, h];
              break;
            case "topMiddle":
              H = (m, h) => [m / 2, 0], B = (m, h) => [m / 2, h];
              break;
            case "topRight":
              q = !0, H = (m, h) => [m, 0], B = (m, h) => [0, h];
              break;
            case "middleRight":
              nt = !0, H = (m, h) => [m, h / 2], B = (m, h) => [0, h / 2];
              break;
            case "bottomRight":
              q = !0, H = (m, h) => [m, h], B = (m, h) => [0, 0];
              break;
            case "bottomMiddle":
              H = (m, h) => [m / 2, h], B = (m, h) => [m / 2, 0];
              break;
            case "bottomLeft":
              q = !0, H = (m, h) => [0, h], B = (m, h) => [m, 0];
              break;
            case "middleLeft":
              nt = !0, H = (m, h) => [0, h / 2], B = (m, h) => [m, h / 2];
              break;
          }
          const j = H(t, i), _ = B(t, i);
          let G = P(..._);
          const Y = y(s + G[0]), tt = y(g + G[1]);
          let Z = 1, at = 1, [lt, pt] = this.screenToPageTranslation(c.movementX, c.movementY);
          if ([lt, pt] = O(lt / l, pt / b), q) {
            const m = Math.hypot(t, i);
            Z = at = Math.max(Math.min(Math.hypot(_[0] - j[0] - lt, _[1] - j[1] - pt) / m, 1 / t, 1 / i), u / t, p / i);
          } else nt ? Z = Math.max(u, Math.min(1, Math.abs(_[0] - j[0] - lt))) / t : at = Math.max(p, Math.min(1, Math.abs(_[1] - j[1] - pt))) / i;
          const dt = y(t * Z), ot = y(i * at);
          G = P(...B(dt, ot));
          const ut = Y - G[0], et = tt - G[1];
          this.width = dt, this.height = ot, this.x = ut, this.y = et, this.setDims(l * dt, b * ot), this.fixAndSetPosition();
        }
        altTextFinish() {
          this.#e?.finish();
        }
        async addEditToolbar() {
          return this.#h || this.#p ? this.#h : (this.#h = new L.EditorToolbar(this), this.div.append(this.#h.render()), this.#e && this.#h.addAltTextButton(await this.#e.render()), this.#h);
        }
        removeEditToolbar() {
          this.#h && (this.#h.remove(), this.#h = null, this.#e?.destroy());
        }
        getClientDimensions() {
          return this.div.getBoundingClientRect();
        }
        async addAltTextButton() {
          this.#e || ($.initialize(C._l10nPromise), this.#e = new $(this), await this.addEditToolbar());
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
          return this.translate(l, b), (0, w.bindEvents)(this, this.div, ["pointerdown"]), this.div;
        }
        pointerdown(r) {
          const {
            isMac: c
          } = z.FeatureTest.platform;
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
          } = z.FeatureTest.platform;
          r.ctrlKey && !c || r.shiftKey || r.metaKey && c ? this.parent.toggleSelected(this) : this.parent.setSelected(this);
        }
        #T(r) {
          const c = this._uiManager.isSelected(this);
          this._uiManager.setUpDragSession();
          let l, b;
          c && (this.div.classList.add("moving"), l = {
            passive: !0,
            capture: !0
          }, this.#A = r.clientX, this.#m = r.clientY, b = (g) => {
            const {
              clientX: t,
              clientY: i
            } = g, [u, p] = this.screenToPageTranslation(t - this.#A, i - this.#m);
            this.#A = t, this.#m = i, this._uiManager.dragSelectedEditors(u, p);
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
          const b = this.parentScale, [s, g] = this.pageDimensions, [t, i] = this.pageTranslation, u = r / b, p = c / b, y = this.x * s, S = this.y * g, P = this.width * s, M = this.height * g;
          switch (l) {
            case 0:
              return [y + u + t, g - S - p - M + i, y + u + P + t, g - S - p + i];
            case 90:
              return [y + p + t, g - S + u + i, y + p + M + t, g - S + u + P + i];
            case 180:
              return [y - u - P + t, g - S + p + i, y - u + t, g - S + p + M + i];
            case 270:
              return [y - p - M + t, g - S - u - P + i, y - p + t, g - S - u + i];
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
          (0, z.unreachable)("An editor must be serializable");
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
          if (this.div.removeEventListener("focusin", this.#a), this.div.removeEventListener("focusout", this.#l), this.isEmpty() || this.commit(), this.parent ? this.parent.remove(this) : this._uiManager.removeEditor(this), this.#f && (clearTimeout(this.#f), this.#f = null), this.#D(), this.removeEditToolbar(), this.#v) {
            for (const r of this.#v.values())
              clearTimeout(r);
            this.#v = null;
          }
          this.parent = null;
        }
        get isResizable() {
          return !1;
        }
        makeResizable() {
          this.isResizable && (this.#y(), this.#r.classList.remove("hidden"), (0, w.bindEvents)(this, this.div, ["keydown"]));
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
              i.setAttribute("role", "spinbutton"), i.addEventListener("keydown", g), i.addEventListener("blur", t), i.addEventListener("focus", this.#N.bind(this, u)), C._l10nPromise.get(`pdfjs-editor-resizer-label-${u}`).then((p) => i.setAttribute("aria-label", p));
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
              C._l10nPromise.get(`pdfjs-editor-resizer-label-${u}`).then((p) => t.setAttribute("aria-label", p));
            }
          }
          this.#L(0), this.#g = !0, this.#r.firstChild.focus({
            focusVisible: !0
          }), r.preventDefault(), r.stopImmediatePropagation();
        }
        #M(r) {
          C._resizerKeyboardManager.exec(this, r);
        }
        #F(r) {
          this.#g && r.relatedTarget?.parentNode !== this.#r && this.#D();
        }
        #N(r) {
          this.#d = this.#g ? r : "";
        }
        #L(r) {
          if (this.#t)
            for (const c of this.#t)
              c.tabIndex = r;
        }
        _resizeWithKeyboard(r, c) {
          this.#g && this.#E(this.#d, {
            movementX: r,
            movementY: c
          });
        }
        #D() {
          if (this.#g = !1, this.#L(-1), this.#i) {
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
          this.#D(), this.div.focus();
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
            this.#v ||= /* @__PURE__ */ new Map();
            const {
              action: l
            } = r;
            let b = this.#v.get(l);
            b && clearTimeout(b), b = setTimeout(() => {
              this._reportTelemetry(r), this.#v.delete(l), this.#v.size === 0 && (this.#v = null);
            }, C._telemetryTimeout), this.#v.set(l, b);
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
      class x extends C {
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
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        FreeOutliner: () => (
          /* binding */
          L
        ),
        /* harmony export */
        Outliner: () => (
          /* binding */
          z
        )
        /* harmony export */
      });
      var w = U(292);
      class z {
        #t;
        #e = [];
        #s = [];
        constructor(v, r = 0, c = 0, l = !0) {
          let b = 1 / 0, s = -1 / 0, g = 1 / 0, t = -1 / 0;
          const i = 10 ** -4;
          for (const {
            x: O,
            y: H,
            width: B,
            height: q
          } of v) {
            const nt = Math.floor((O - r) / i) * i, j = Math.ceil((O + B + r) / i) * i, _ = Math.floor((H - r) / i) * i, G = Math.ceil((H + q + r) / i) * i, Y = [nt, _, G, !0], tt = [j, _, G, !1];
            this.#e.push(Y, tt), b = Math.min(b, nt), s = Math.max(s, j), g = Math.min(g, _), t = Math.max(t, G);
          }
          const u = s - b + 2 * c, p = t - g + 2 * c, y = b - c, S = g - c, P = this.#e.at(l ? -1 : -2), M = [P[0], P[2]];
          for (const O of this.#e) {
            const [H, B, q] = O;
            O[0] = (H - y) / u, O[1] = (B - S) / p, O[2] = (q - S) / p;
          }
          this.#t = {
            x: y,
            y: S,
            width: u,
            height: p,
            lastPoint: M
          };
        }
        getOutlines() {
          this.#e.sort((r, c) => r[0] - c[0] || r[1] - c[1] || r[2] - c[2]);
          const v = [];
          for (const r of this.#e)
            r[3] ? (v.push(...this.#l(r)), this.#i(r)) : (this.#a(r), v.push(...this.#l(r)));
          return this.#n(v);
        }
        #n(v) {
          const r = [], c = /* @__PURE__ */ new Set();
          for (const s of v) {
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
            let y = g, S = t;
            for (b = [g, i], l.push(b); ; ) {
              let P;
              if (c.has(u))
                P = u;
              else if (c.has(p))
                P = p;
              else
                break;
              c.delete(P), [g, t, i, u, p] = P, y !== g && (b.push(y, S, g, S === t ? t : i), y = g), S = S === t ? i : t;
            }
            b.push(y, S);
          }
          return new $(l, this.#t);
        }
        #r(v) {
          const r = this.#s;
          let c = 0, l = r.length - 1;
          for (; c <= l; ) {
            const b = c + l >> 1, s = r[b][0];
            if (s === v)
              return b;
            s < v ? c = b + 1 : l = b - 1;
          }
          return l + 1;
        }
        #i([, v, r]) {
          const c = this.#r(v);
          this.#s.splice(c, 0, [v, r]);
        }
        #a([, v, r]) {
          const c = this.#r(v);
          for (let l = c; l < this.#s.length; l++) {
            const [b, s] = this.#s[l];
            if (b !== v)
              break;
            if (b === v && s === r) {
              this.#s.splice(l, 1);
              return;
            }
          }
          for (let l = c - 1; l >= 0; l--) {
            const [b, s] = this.#s[l];
            if (b !== v)
              break;
            if (b === v && s === r) {
              this.#s.splice(l, 1);
              return;
            }
          }
        }
        #l(v) {
          const [r, c, l] = v, b = [[r, c, l]], s = this.#r(l);
          for (let g = 0; g < s; g++) {
            const [t, i] = this.#s[g];
            for (let u = 0, p = b.length; u < p; u++) {
              const [, y, S] = b[u];
              if (!(i <= y || S <= t)) {
                if (y >= t) {
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
      class N {
        toSVGPath() {
          throw new Error("Abstract method `toSVGPath` must be implemented.");
        }
        get box() {
          throw new Error("Abstract getter `box` must be implemented.");
        }
        serialize(v, r) {
          throw new Error("Abstract method `serialize` must be implemented.");
        }
        get free() {
          return this instanceof C;
        }
      }
      class $ extends N {
        #t;
        #e;
        constructor(v, r) {
          super(), this.#e = v, this.#t = r;
        }
        toSVGPath() {
          const v = [];
          for (const r of this.#e) {
            let [c, l] = r;
            v.push(`M${c} ${l}`);
            for (let b = 2; b < r.length; b += 2) {
              const s = r[b], g = r[b + 1];
              s === c ? (v.push(`V${g}`), l = g) : g === l && (v.push(`H${s}`), c = s);
            }
            v.push("Z");
          }
          return v.join(" ");
        }
        serialize([v, r, c, l], b) {
          const s = [], g = c - v, t = l - r;
          for (const i of this.#e) {
            const u = new Array(i.length);
            for (let p = 0; p < i.length; p += 2)
              u[p] = v + i[p] * g, u[p + 1] = l - i[p + 1] * t;
            s.push(u);
          }
          return s;
        }
        get box() {
          return this.#t;
        }
      }
      class L {
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
        static #f = L.#p + L.#g;
        constructor({
          x: v,
          y: r
        }, c, l, b, s, g = 0) {
          this.#t = c, this.#c = b * l, this.#n = s, this.#i.set([NaN, NaN, NaN, NaN, v, r], 6), this.#s = g, this.#d = L.#p * l, this.#h = L.#f * l, this.#u = l, this.#o.push(v, r);
        }
        get free() {
          return !0;
        }
        isEmpty() {
          return isNaN(this.#i[8]);
        }
        #A() {
          const v = this.#i.subarray(4, 6), r = this.#i.subarray(16, 18), [c, l, b, s] = this.#t;
          return [(this.#a + (v[0] - r[0]) / 2 - c) / b, (this.#l + (v[1] - r[1]) / 2 - l) / s, (this.#a + (r[0] - v[0]) / 2 - c) / b, (this.#l + (r[1] - v[1]) / 2 - l) / s];
        }
        add({
          x: v,
          y: r
        }) {
          this.#a = v, this.#l = r;
          const [c, l, b, s] = this.#t;
          let [g, t, i, u] = this.#i.subarray(8, 12);
          const p = v - i, y = r - u, S = Math.hypot(p, y);
          if (S < this.#h)
            return !1;
          const P = S - this.#d, M = P / S, O = M * p, H = M * y;
          let B = g, q = t;
          g = i, t = u, i += O, u += H, this.#o?.push(v, r);
          const nt = -H / P, j = O / P, _ = nt * this.#c, G = j * this.#c;
          return this.#i.set(this.#i.subarray(2, 8), 0), this.#i.set([i + _, u + G], 4), this.#i.set(this.#i.subarray(14, 18), 12), this.#i.set([i - _, u - G], 16), isNaN(this.#i[6]) ? (this.#r.length === 0 && (this.#i.set([g + _, t + G], 2), this.#r.push(NaN, NaN, NaN, NaN, (g + _ - c) / b, (t + G - l) / s), this.#i.set([g - _, t - G], 14), this.#e.push(NaN, NaN, NaN, NaN, (g - _ - c) / b, (t - G - l) / s)), this.#i.set([B, q, g, t, i, u], 6), !this.isEmpty()) : (this.#i.set([B, q, g, t, i, u], 6), Math.abs(Math.atan2(q - t, B - g) - Math.atan2(H, O)) < Math.PI / 2 ? ([g, t, i, u] = this.#i.subarray(2, 6), this.#r.push(NaN, NaN, NaN, NaN, ((g + i) / 2 - c) / b, ((t + u) / 2 - l) / s), [g, t, B, q] = this.#i.subarray(14, 18), this.#e.push(NaN, NaN, NaN, NaN, ((B + g) / 2 - c) / b, ((q + t) / 2 - l) / s), !0) : ([B, q, g, t, i, u] = this.#i.subarray(0, 6), this.#r.push(((B + 5 * g) / 6 - c) / b, ((q + 5 * t) / 6 - l) / s, ((5 * g + i) / 6 - c) / b, ((5 * t + u) / 6 - l) / s, ((g + i) / 2 - c) / b, ((t + u) / 2 - l) / s), [i, u, g, t, B, q] = this.#i.subarray(12, 18), this.#e.push(((B + 5 * g) / 6 - c) / b, ((q + 5 * t) / 6 - l) / s, ((5 * g + i) / 6 - c) / b, ((5 * t + u) / 6 - l) / s, ((g + i) / 2 - c) / b, ((t + u) / 2 - l) / s), !0));
        }
        toSVGPath() {
          if (this.isEmpty())
            return "";
          const v = this.#r, r = this.#e, c = this.#i.subarray(4, 6), l = this.#i.subarray(16, 18), [b, s, g, t] = this.#t, [i, u, p, y] = this.#A();
          if (isNaN(this.#i[6]) && !this.isEmpty())
            return `M${(this.#i[2] - b) / g} ${(this.#i[3] - s) / t} L${(this.#i[4] - b) / g} ${(this.#i[5] - s) / t} L${i} ${u} L${p} ${y} L${(this.#i[16] - b) / g} ${(this.#i[17] - s) / t} L${(this.#i[14] - b) / g} ${(this.#i[15] - s) / t} Z`;
          const S = [];
          S.push(`M${v[4]} ${v[5]}`);
          for (let P = 6; P < v.length; P += 6)
            isNaN(v[P]) ? S.push(`L${v[P + 4]} ${v[P + 5]}`) : S.push(`C${v[P]} ${v[P + 1]} ${v[P + 2]} ${v[P + 3]} ${v[P + 4]} ${v[P + 5]}`);
          S.push(`L${(c[0] - b) / g} ${(c[1] - s) / t} L${i} ${u} L${p} ${y} L${(l[0] - b) / g} ${(l[1] - s) / t}`);
          for (let P = r.length - 6; P >= 6; P -= 6)
            isNaN(r[P]) ? S.push(`L${r[P + 4]} ${r[P + 5]}`) : S.push(`C${r[P]} ${r[P + 1]} ${r[P + 2]} ${r[P + 3]} ${r[P + 4]} ${r[P + 5]}`);
          return S.push(`L${r[4]} ${r[5]} Z`), S.join(" ");
        }
        getOutlines() {
          const v = this.#r, r = this.#e, c = this.#i, l = c.subarray(4, 6), b = c.subarray(16, 18), [s, g, t, i] = this.#t, u = new Float64Array((this.#o?.length ?? 0) + 2);
          for (let H = 0, B = u.length - 2; H < B; H += 2)
            u[H] = (this.#o[H] - s) / t, u[H + 1] = (this.#o[H + 1] - g) / i;
          u[u.length - 2] = (this.#a - s) / t, u[u.length - 1] = (this.#l - g) / i;
          const [p, y, S, P] = this.#A();
          if (isNaN(c[6]) && !this.isEmpty()) {
            const H = new Float64Array(36);
            return H.set([NaN, NaN, NaN, NaN, (c[2] - s) / t, (c[3] - g) / i, NaN, NaN, NaN, NaN, (c[4] - s) / t, (c[5] - g) / i, NaN, NaN, NaN, NaN, p, y, NaN, NaN, NaN, NaN, S, P, NaN, NaN, NaN, NaN, (c[16] - s) / t, (c[17] - g) / i, NaN, NaN, NaN, NaN, (c[14] - s) / t, (c[15] - g) / i], 0), new C(H, u, this.#t, this.#u, this.#s, this.#n);
          }
          const M = new Float64Array(this.#r.length + 24 + this.#e.length);
          let O = v.length;
          for (let H = 0; H < O; H += 2) {
            if (isNaN(v[H])) {
              M[H] = M[H + 1] = NaN;
              continue;
            }
            M[H] = v[H], M[H + 1] = v[H + 1];
          }
          M.set([NaN, NaN, NaN, NaN, (l[0] - s) / t, (l[1] - g) / i, NaN, NaN, NaN, NaN, p, y, NaN, NaN, NaN, NaN, S, P, NaN, NaN, NaN, NaN, (b[0] - s) / t, (b[1] - g) / i], O), O += 24;
          for (let H = r.length - 6; H >= 6; H -= 6)
            for (let B = 0; B < 6; B += 2) {
              if (isNaN(r[H + B])) {
                M[O] = M[O + 1] = NaN, O += 2;
                continue;
              }
              M[O] = r[H + B], M[O + 1] = r[H + B + 1], O += 2;
            }
          return M.set([NaN, NaN, NaN, NaN, r[4], r[5]], O), new C(M, u, this.#t, this.#u, this.#s, this.#n);
        }
      }
      class C extends N {
        #t;
        #e = null;
        #s;
        #n;
        #r;
        #i;
        #a;
        constructor(v, r, c, l, b, s) {
          super(), this.#a = v, this.#r = r, this.#t = c, this.#i = l, this.#s = b, this.#n = s, this.#d(s);
          const {
            x: g,
            y: t,
            width: i,
            height: u
          } = this.#e;
          for (let p = 0, y = v.length; p < y; p += 2)
            v[p] = (v[p] - g) / i, v[p + 1] = (v[p + 1] - t) / u;
          for (let p = 0, y = r.length; p < y; p += 2)
            r[p] = (r[p] - g) / i, r[p + 1] = (r[p + 1] - t) / u;
        }
        toSVGPath() {
          const v = [`M${this.#a[4]} ${this.#a[5]}`];
          for (let r = 6, c = this.#a.length; r < c; r += 6) {
            if (isNaN(this.#a[r])) {
              v.push(`L${this.#a[r + 4]} ${this.#a[r + 5]}`);
              continue;
            }
            v.push(`C${this.#a[r]} ${this.#a[r + 1]} ${this.#a[r + 2]} ${this.#a[r + 3]} ${this.#a[r + 4]} ${this.#a[r + 5]}`);
          }
          return v.push("Z"), v.join(" ");
        }
        serialize([v, r, c, l], b) {
          const s = c - v, g = l - r;
          let t, i;
          switch (b) {
            case 0:
              t = this.#l(this.#a, v, l, s, -g), i = this.#l(this.#r, v, l, s, -g);
              break;
            case 90:
              t = this.#h(this.#a, v, r, s, g), i = this.#h(this.#r, v, r, s, g);
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
        #l(v, r, c, l, b) {
          const s = new Float64Array(v.length);
          for (let g = 0, t = v.length; g < t; g += 2)
            s[g] = r + v[g] * l, s[g + 1] = c + v[g + 1] * b;
          return s;
        }
        #h(v, r, c, l, b) {
          const s = new Float64Array(v.length);
          for (let g = 0, t = v.length; g < t; g += 2)
            s[g] = r + v[g + 1] * l, s[g + 1] = c + v[g] * b;
          return s;
        }
        #d(v) {
          const r = this.#a;
          let c = r[4], l = r[5], b = c, s = l, g = c, t = l, i = c, u = l;
          const p = v ? Math.max : Math.min;
          for (let O = 6, H = r.length; O < H; O += 6) {
            if (isNaN(r[O]))
              b = Math.min(b, r[O + 4]), s = Math.min(s, r[O + 5]), g = Math.max(g, r[O + 4]), t = Math.max(t, r[O + 5]), u < r[O + 5] ? (i = r[O + 4], u = r[O + 5]) : u === r[O + 5] && (i = p(i, r[O + 4]));
            else {
              const B = w.Util.bezierBoundingBox(c, l, ...r.slice(O, O + 6));
              b = Math.min(b, B[0]), s = Math.min(s, B[1]), g = Math.max(g, B[2]), t = Math.max(t, B[3]), u < B[3] ? (i = B[2], u = B[3]) : u === B[3] && (i = p(i, B[2]));
            }
            c = r[O + 4], l = r[O + 5];
          }
          const y = b - this.#s, S = s - this.#s, P = g - b + 2 * this.#s, M = t - s + 2 * this.#s;
          this.#e = {
            x: y,
            y: S,
            width: P,
            height: M,
            lastPoint: [i, u]
          };
        }
        get box() {
          return this.#e;
        }
        getNewOutline(v, r) {
          const {
            x: c,
            y: l,
            width: b,
            height: s
          } = this.#e, [g, t, i, u] = this.#t, p = b * i, y = s * u, S = c * i + g, P = l * u + t, M = new L({
            x: this.#r[0] * p + S,
            y: this.#r[1] * y + P
          }, this.#t, this.#i, v, this.#n, r ?? this.#s);
          for (let O = 2; O < this.#r.length; O += 2)
            M.add({
              x: this.#r[O] * p + S,
              y: this.#r[O + 1] * y + P
            });
          return M.getOutlines();
        }
      }
    }
  ),
  /***/
  362: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        EditorToolbar: () => (
          /* binding */
          z
        ),
        /* harmony export */
        HighlightToolbar: () => (
          /* binding */
          N
        )
        /* harmony export */
      });
      var w = U(419);
      class z {
        #t = null;
        #e = null;
        #s;
        #n = null;
        constructor(L) {
          this.#s = L;
        }
        render() {
          const L = this.#t = document.createElement("div");
          L.className = "editToolbar", L.setAttribute("role", "toolbar"), L.addEventListener("contextmenu", w.noContextMenu), L.addEventListener("pointerdown", z.#r);
          const C = this.#n = document.createElement("div");
          C.className = "buttons", L.append(C);
          const x = this.#s.toolbarPosition;
          if (x) {
            const {
              style: v
            } = L, r = this.#s._uiManager.direction === "ltr" ? 1 - x[0] : x[0];
            v.insetInlineEnd = `${100 * r}%`, v.top = `calc(${100 * x[1]}% + var(--editor-toolbar-vert-offset))`;
          }
          return this.#h(), L;
        }
        static #r(L) {
          L.stopPropagation();
        }
        #i(L) {
          this.#s._focusEventsAllowed = !1, L.preventDefault(), L.stopPropagation();
        }
        #a(L) {
          this.#s._focusEventsAllowed = !0, L.preventDefault(), L.stopPropagation();
        }
        #l(L) {
          L.addEventListener("focusin", this.#i.bind(this), {
            capture: !0
          }), L.addEventListener("focusout", this.#a.bind(this), {
            capture: !0
          }), L.addEventListener("contextmenu", w.noContextMenu);
        }
        hide() {
          this.#t.classList.add("hidden"), this.#e?.hideDropdown();
        }
        show() {
          this.#t.classList.remove("hidden");
        }
        #h() {
          const L = document.createElement("button");
          L.className = "delete", L.tabIndex = 0, L.setAttribute("data-l10n-id", `pdfjs-editor-remove-${this.#s.editorType}-button`), this.#l(L), L.addEventListener("click", (C) => {
            this.#s._uiManager.delete();
          }), this.#n.append(L);
        }
        get #d() {
          const L = document.createElement("div");
          return L.className = "divider", L;
        }
        addAltTextButton(L) {
          this.#l(L), this.#n.prepend(L, this.#d);
        }
        addColorPicker(L) {
          this.#e = L;
          const C = L.renderButton();
          this.#l(C), this.#n.prepend(C, this.#d);
        }
        remove() {
          this.#t.remove(), this.#e?.destroy(), this.#e = null;
        }
      }
      class N {
        #t = null;
        #e = null;
        #s;
        constructor(L) {
          this.#s = L;
        }
        #n() {
          const L = this.#e = document.createElement("div");
          L.className = "editToolbar", L.setAttribute("role", "toolbar"), L.addEventListener("contextmenu", w.noContextMenu);
          const C = this.#t = document.createElement("div");
          return C.className = "buttons", L.append(C), this.#i(), L;
        }
        #r(L, C) {
          let x = 0, v = 0;
          for (const r of L) {
            const c = r.y + r.height;
            if (c < x)
              continue;
            const l = r.x + (C ? r.width : 0);
            if (c > x) {
              v = l, x = c;
              continue;
            }
            C ? l > v && (v = l) : l < v && (v = l);
          }
          return [C ? 1 - v : v, x];
        }
        show(L, C, x) {
          const [v, r] = this.#r(C, x), {
            style: c
          } = this.#e ||= this.#n();
          L.append(this.#e), c.insetInlineEnd = `${100 * v}%`, c.top = `calc(${100 * r}% + var(--editor-toolbar-vert-offset))`;
        }
        hide() {
          this.#e.remove();
        }
        #i() {
          const L = document.createElement("button");
          L.className = "highlightButton", L.tabIndex = 0, L.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button1");
          const C = document.createElement("span");
          L.append(C), C.className = "visuallyHidden", C.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button-label"), L.addEventListener("contextmenu", w.noContextMenu), L.addEventListener("click", () => {
            this.#s.highlightSelection("floating_button");
          }), this.#t.append(L);
        }
      }
    }
  ),
  /***/
  830: (
    /***/
    (ct, st, U) => {
      U.d(st, {
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
          $
        ),
        /* harmony export */
        opacityToHex: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var w = U(292), z = U(419), N = U(362);
      function $(b, s, g) {
        for (const t of g)
          s.addEventListener(t, b[t].bind(b));
      }
      function L(b) {
        return Math.round(Math.min(255, Math.max(1, 255 * b))).toString(16).padStart(2, "0");
      }
      class C {
        #t = 0;
        constructor() {
        }
        get id() {
          return `${w.AnnotationEditorPrefix}${this.#t++}`;
        }
      }
      class x {
        #t = (0, w.getUuid)();
        #e = 0;
        #s = null;
        static get _isSVGFittingCanvas() {
          const s = 'data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" style="fill:red;"/></svg>', t = new OffscreenCanvas(1, 3).getContext("2d"), i = new Image();
          i.src = s;
          const u = i.decode().then(() => (t.drawImage(i, 0, 0, 1, 1, 0, 0, 1, 3), new Uint32Array(t.getImageData(0, 0, 1, 1).data.buffer)[0] === 0));
          return (0, w.shadow)(this, "_isSVGFittingCanvas", u);
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
            if (typeof g == "string" ? (t.url = g, i = await (0, z.fetchData)(g, "blob")) : i = t.file = g, i.type === "image/svg+xml") {
              const u = x._isSVGFittingCanvas, p = new FileReader(), y = new Image(), S = new Promise((P, M) => {
                y.onload = () => {
                  t.bitmap = y, t.isSvg = !0, P();
                }, p.onload = async () => {
                  const O = t.svgUrl = p.result;
                  y.src = await u ? `${O}#svgView(preserveAspectRatio(none))` : O;
                }, y.onerror = p.onerror = M;
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
      class v {
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
          keepUndo: y = !1
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
            y && (S.undo = this.#t[this.#n].undo), this.#t[this.#n] = S;
            return;
          }
          const P = this.#n + 1;
          P === this.#s ? this.#t.splice(0, 1) : (this.#n = P, P < this.#t.length && this.#t.splice(P)), this.#t.push(S);
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
          } = w.FeatureTest.platform;
          for (const [t, i, u = {}] of s)
            for (const p of t) {
              const y = p.startsWith("mac+");
              g && y ? (this.callbacks.set(p.slice(4), {
                callback: i,
                options: u
              }), this.allKeys.add(p.split("+").at(-1))) : !g && !y && (this.callbacks.set(p, {
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
              checker: y = null
            }
          } = t;
          y && !y(s, g) || (i.bind(s, ...p, g)(), u || (g.stopPropagation(), g.preventDefault()));
        }
      }
      class c {
        static _colorsMapping = /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]);
        get _colors() {
          const s = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
          return (0, z.getColorValues)(s), (0, w.shadow)(this, "_colors", s);
        }
        convert(s) {
          const g = (0, z.getRGB)(s);
          if (!window.matchMedia("(forced-colors: active)").matches)
            return g;
          for (const [t, i] of this._colors)
            if (i.every((u, p) => u === g[p]))
              return c._colorsMapping.get(t);
          return g;
        }
        getHexCode(s) {
          const g = this._colors.get(s);
          return g ? w.Util.makeHexColor(...g) : s;
        }
      }
      class l {
        #t = null;
        #e = /* @__PURE__ */ new Map();
        #s = /* @__PURE__ */ new Map();
        #n = null;
        #r = null;
        #i = null;
        #a = new v();
        #l = 0;
        #h = /* @__PURE__ */ new Set();
        #d = null;
        #u = null;
        #c = /* @__PURE__ */ new Set();
        #o = !1;
        #p = null;
        #g = null;
        #f = null;
        #A = !1;
        #m = null;
        #v = new C();
        #w = !1;
        #C = !1;
        #R = null;
        #I = null;
        #P = null;
        #y = w.AnnotationEditorType.NONE;
        #b = /* @__PURE__ */ new Set();
        #S = null;
        #E = null;
        #k = null;
        #T = this.blur.bind(this);
        #M = this.focus.bind(this);
        #F = this.copy.bind(this);
        #N = this.cut.bind(this);
        #L = this.paste.bind(this);
        #D = this.keydown.bind(this);
        #G = this.keyup.bind(this);
        #U = this.onEditingAction.bind(this);
        #X = this.onPageChanging.bind(this);
        #$ = this.onScaleChanging.bind(this);
        #B = this.#rt.bind(this);
        #O = this.onRotationChanging.bind(this);
        #q = {
          isEditing: !1,
          isEmpty: !0,
          hasSomethingToUndo: !1,
          hasSomethingToRedo: !1,
          hasSelectedEditor: !1,
          hasSelectedText: !1
        };
        #V = [0, 0];
        #_ = null;
        #z = null;
        #K = null;
        static TRANSLATE_SMALL = 1;
        static TRANSLATE_BIG = 10;
        static get _keyboardManager() {
          const s = l.prototype, g = (p) => p.#z.contains(document.activeElement) && document.activeElement.tagName !== "BUTTON" && p.hasSomethingToControl(), t = (p, {
            target: y
          }) => {
            if (y instanceof HTMLInputElement) {
              const {
                type: S
              } = y;
              return S !== "text" && S !== "number";
            }
            return !0;
          }, i = this.TRANSLATE_SMALL, u = this.TRANSLATE_BIG;
          return (0, w.shadow)(this, "_keyboardManager", new r([[["ctrl+a", "mac+meta+a"], s.selectAll, {
            checker: t
          }], [["ctrl+z", "mac+meta+z"], s.undo, {
            checker: t
          }], [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], s.redo, {
            checker: t
          }], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"], s.delete, {
            checker: t
          }], [["Enter", "mac+Enter"], s.addNewEditorFromKeyboard, {
            checker: (p, {
              target: y
            }) => !(y instanceof HTMLButtonElement) && p.#z.contains(y) && !p.isEnterHandled
          }], [[" ", "mac+ "], s.addNewEditorFromKeyboard, {
            checker: (p, {
              target: y
            }) => !(y instanceof HTMLButtonElement) && p.#z.contains(document.activeElement)
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
        constructor(s, g, t, i, u, p, y, S, P) {
          this.#z = s, this.#K = g, this.#n = t, this._eventBus = i, this._eventBus._on("editingaction", this.#U), this._eventBus._on("pagechanging", this.#X), this._eventBus._on("scalechanging", this.#$), this._eventBus._on("rotationchanging", this.#O), this.#at(), this.#J(), this.#r = u.annotationStorage, this.#p = u.filterFactory, this.#E = p, this.#f = y || null, this.#o = S, this.#P = P || null, this.viewParameters = {
            realScale: z.PixelsPerInch.PDF_TO_CSS_UNITS,
            rotation: 0
          }, this.isShiftKeyDown = !1;
        }
        destroy() {
          this.#Z(), this.#Q(), this._eventBus._off("editingaction", this.#U), this._eventBus._off("pagechanging", this.#X), this._eventBus._off("scalechanging", this.#$), this._eventBus._off("rotationchanging", this.#O);
          for (const s of this.#s.values())
            s.destroy();
          this.#s.clear(), this.#e.clear(), this.#c.clear(), this.#t = null, this.#b.clear(), this.#a.destroy(), this.#n?.destroy(), this.#m?.hide(), this.#m = null, this.#g && (clearTimeout(this.#g), this.#g = null), this.#_ && (clearTimeout(this.#_), this.#_ = null), this.#ot();
        }
        async mlGuess(s) {
          return this.#P?.guess(s) || null;
        }
        get hasMLManager() {
          return !!this.#P;
        }
        get hcmFilter() {
          return (0, w.shadow)(this, "hcmFilter", this.#E ? this.#p.addHCMFilter(this.#E.foreground, this.#E.background) : "none");
        }
        get direction() {
          return (0, w.shadow)(this, "direction", getComputedStyle(this.#z).direction);
        }
        get highlightColors() {
          return (0, w.shadow)(this, "highlightColors", this.#f ? new Map(this.#f.split(",").map((s) => s.split("=").map((g) => g.trim()))) : null);
        }
        get highlightColorNames() {
          return (0, w.shadow)(this, "highlightColorNames", this.highlightColors ? new Map(Array.from(this.highlightColors, (s) => s.reverse())) : null);
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
          this.#z.focus();
        }
        findParent(s, g) {
          for (const t of this.#s.values()) {
            const {
              x: i,
              y: u,
              width: p,
              height: y
            } = t.div.getBoundingClientRect();
            if (s >= i && s <= i + p && g >= u && g <= u + y)
              return t;
          }
          return null;
        }
        disableUserSelect(s = !1) {
          this.#K.classList.toggle("noUserSelect", s);
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
          this.commitOrRemove(), this.viewParameters.realScale = s * z.PixelsPerInch.PDF_TO_CSS_UNITS;
          for (const g of this.#c)
            g.onScaleChanging();
        }
        onRotationChanging({
          pagesRotation: s
        }) {
          this.commitOrRemove(), this.viewParameters.rotation = s;
        }
        #Y({
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
          } = g, y = g.toString(), P = this.#Y(g).closest(".textLayer"), M = this.getSelectionBoxes(P);
          if (M) {
            g.empty(), this.#y === w.AnnotationEditorType.NONE && (this._eventBus.dispatch("showannotationeditorui", {
              source: this,
              mode: w.AnnotationEditorType.HIGHLIGHT
            }), this.showAllEditors("highlight", !0, !0));
            for (const O of this.#s.values())
              if (O.hasTextLayer(P)) {
                O.createAndAddNewEditor({
                  x: 0,
                  y: 0
                }, !1, {
                  methodOfCreation: s,
                  boxes: M,
                  anchorNode: t,
                  anchorOffset: i,
                  focusNode: u,
                  focusOffset: p,
                  text: y
                });
                break;
              }
          }
        }
        #nt() {
          const s = document.getSelection();
          if (!s || s.isCollapsed)
            return;
          const t = this.#Y(s).closest(".textLayer"), i = this.getSelectionBoxes(t);
          i && (this.#m ||= new N.HighlightToolbar(this), this.#m.show(t, i, this.direction === "ltr"));
        }
        addToAnnotationStorage(s) {
          !s.isEmpty() && this.#r && !this.#r.has(s.id) && this.#r.setValue(s.id, s);
        }
        #rt() {
          const s = document.getSelection();
          if (!s || s.isCollapsed) {
            this.#S && (this.#m?.hide(), this.#S = null, this.#x({
              hasSelectedText: !1
            }));
            return;
          }
          const {
            anchorNode: g
          } = s;
          if (g === this.#S)
            return;
          if (!this.#Y(s).closest(".textLayer")) {
            this.#S && (this.#m?.hide(), this.#S = null, this.#x({
              hasSelectedText: !1
            }));
            return;
          }
          if (this.#m?.hide(), this.#S = g, this.#x({
            hasSelectedText: !0
          }), !(this.#y !== w.AnnotationEditorType.HIGHLIGHT && this.#y !== w.AnnotationEditorType.NONE) && (this.#y === w.AnnotationEditorType.HIGHLIGHT && this.showAllEditors("highlight", !0, !0), this.#A = this.isShiftKeyDown, !this.isShiftKeyDown)) {
            const u = (p) => {
              p.type === "pointerup" && p.button !== 0 || (window.removeEventListener("pointerup", u), window.removeEventListener("blur", u), p.type === "pointerup" && this.#W("main_toolbar"));
            };
            window.addEventListener("pointerup", u), window.addEventListener("blur", u);
          }
        }
        #W(s = "") {
          this.#y === w.AnnotationEditorType.HIGHLIGHT ? this.highlightSelection(s) : this.#o && this.#nt();
        }
        #at() {
          document.addEventListener("selectionchange", this.#B);
        }
        #ot() {
          document.removeEventListener("selectionchange", this.#B);
        }
        #ht() {
          window.addEventListener("focus", this.#M), window.addEventListener("blur", this.#T);
        }
        #Q() {
          window.removeEventListener("focus", this.#M), window.removeEventListener("blur", this.#T);
        }
        blur() {
          if (this.isShiftKeyDown = !1, this.#A && (this.#A = !1, this.#W("main_toolbar")), !this.hasSelection)
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
        #J() {
          window.addEventListener("keydown", this.#D), window.addEventListener("keyup", this.#G);
        }
        #Z() {
          window.removeEventListener("keydown", this.#D), window.removeEventListener("keyup", this.#G);
        }
        #tt() {
          document.addEventListener("copy", this.#F), document.addEventListener("cut", this.#N), document.addEventListener("paste", this.#L);
        }
        #et() {
          document.removeEventListener("copy", this.#F), document.removeEventListener("cut", this.#N), document.removeEventListener("paste", this.#L);
        }
        addEditListeners() {
          this.#J(), this.#tt();
        }
        removeEditListeners() {
          this.#Z(), this.#et();
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
            (0, w.warn)(`paste: "${u.message}".`);
            return;
          }
          if (!Array.isArray(t))
            return;
          this.unselectAll();
          const i = this.currentLayer;
          try {
            const u = [];
            for (const S of t) {
              const P = i.deserialize(S);
              if (!P)
                return;
              u.push(P);
            }
            const p = () => {
              for (const S of u)
                this.#st(S);
              this.#it(u);
            }, y = () => {
              for (const S of u)
                S.remove();
            };
            this.addCommands({
              cmd: p,
              undo: y,
              mustExec: !0
            });
          } catch (u) {
            (0, w.warn)(`paste: "${u.message}".`);
          }
        }
        keydown(s) {
          !this.isShiftKeyDown && s.key === "Shift" && (this.isShiftKeyDown = !0), this.#y !== w.AnnotationEditorType.NONE && !this.isEditorHandlingKeyboard && l._keyboardManager.exec(this, s);
        }
        keyup(s) {
          this.isShiftKeyDown && s.key === "Shift" && (this.isShiftKeyDown = !1, this.#A && (this.#A = !1, this.#W("main_toolbar")));
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
        #x(s) {
          Object.entries(s).some(([t, i]) => this.#q[t] !== i) && (this._eventBus.dispatch("annotationeditorstateschanged", {
            source: this,
            details: Object.assign(this.#q, s)
          }), this.#y === w.AnnotationEditorType.HIGHLIGHT && s.hasSelectedEditor === !1 && this.#H([[w.AnnotationEditorParamsType.HIGHLIGHT_FREE, !0]]));
        }
        #H(s) {
          this._eventBus.dispatch("annotationeditorparamschanged", {
            source: this,
            details: s
          });
        }
        setEditingState(s) {
          s ? (this.#ht(), this.#tt(), this.#x({
            isEditing: this.#y !== w.AnnotationEditorType.NONE,
            isEmpty: this.#j(),
            hasSomethingToUndo: this.#a.hasSomethingToUndo(),
            hasSomethingToRedo: this.#a.hasSomethingToRedo(),
            hasSelectedEditor: !1
          })) : (this.#Q(), this.#et(), this.#x({
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
          return this.#v.id;
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
            if (this.#y = s, s === w.AnnotationEditorType.NONE) {
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
              case w.AnnotationEditorParamsType.CREATE:
                this.currentLayer.addNewEditor();
                return;
              case w.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
                this.#I?.updateColor(g);
                break;
              case w.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL:
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
          (this.#k?.get(w.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL) ?? !0) !== g && this.#H([[w.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL, g]]);
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
            this.#b.delete(s), s.unselect(), this.#x({
              hasSelectedEditor: this.hasSelection
            });
            return;
          }
          this.#b.add(s), s.select(), this.#H(s.propertiesToUpdate), this.#x({
            hasSelectedEditor: !0
          });
        }
        setSelected(s) {
          for (const g of this.#b)
            g !== s && g.unselect();
          this.#b.clear(), this.#b.add(s), s.select(), this.#H(s.propertiesToUpdate), this.#x({
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
          s.unselect(), this.#b.delete(s), this.#x({
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
          this.#a.undo(), this.#x({
            hasSomethingToUndo: this.#a.hasSomethingToUndo(),
            hasSomethingToRedo: !0,
            isEmpty: this.#j()
          });
        }
        redo() {
          this.#a.redo(), this.#x({
            hasSomethingToUndo: !0,
            hasSomethingToRedo: this.#a.hasSomethingToRedo(),
            isEmpty: this.#j()
          });
        }
        addCommands(s) {
          this.#a.add(s), this.#x({
            hasSomethingToUndo: !0,
            hasSomethingToRedo: !1,
            isEmpty: this.#j()
          });
        }
        #j() {
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
          this.#x({
            hasSelectedEditor: this.hasSelection
          });
        }
        selectAll() {
          for (const s of this.#b)
            s.commit();
          this.#it(this.#e.values());
        }
        unselectAll() {
          if (!(this.#t && (this.#t.commitOrRemove(), this.#y !== w.AnnotationEditorType.NONE)) && this.hasSelection) {
            for (const s of this.#b)
              s.unselect();
            this.#b.clear(), this.#x({
              hasSelectedEditor: !1
            });
          }
        }
        translateSelectedEditors(s, g, t = !1) {
          if (t || this.commitOrRemove(), !this.hasSelection)
            return;
          this.#V[0] += s, this.#V[1] += g;
          const [i, u] = this.#V, p = [...this.#b], y = 1e3;
          this.#_ && clearTimeout(this.#_), this.#_ = setTimeout(() => {
            this.#_ = null, this.#V[0] = this.#V[1] = 0, this.addCommands({
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
          }, y);
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
          }, y] of s)
            y.newX = i, y.newY = u, y.newPageIndex = p, g ||= i !== y.savedX || u !== y.savedY || p !== y.savedPageIndex;
          if (!g)
            return !1;
          const t = (i, u, p, y) => {
            if (this.#e.has(i.id)) {
              const S = this.#s.get(y);
              S ? i._setParentAndPosition(S, u, p) : (i.pageIndex = y, i.x = u, i.y = p);
            }
          };
          return this.addCommands({
            cmd: () => {
              for (const [i, {
                newX: u,
                newY: p,
                newPageIndex: y
              }] of s)
                t(i, u, p, y);
            },
            undo: () => {
              for (const [i, {
                savedX: u,
                savedY: p,
                savedPageIndex: y
              }] of s)
                t(i, u, p, y);
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
          return (0, w.shadow)(this, "imageManager", new x());
        }
        getSelectionBoxes(s) {
          if (!s)
            return null;
          const g = document.getSelection();
          for (let P = 0, M = g.rangeCount; P < M; P++)
            if (!s.contains(g.getRangeAt(P).commonAncestorContainer))
              return null;
          const {
            x: t,
            y: i,
            width: u,
            height: p
          } = s.getBoundingClientRect();
          let y;
          switch (s.getAttribute("data-main-rotation")) {
            case "90":
              y = (P, M, O, H) => ({
                x: (M - i) / p,
                y: 1 - (P + O - t) / u,
                width: H / p,
                height: O / u
              });
              break;
            case "180":
              y = (P, M, O, H) => ({
                x: 1 - (P + O - t) / u,
                y: 1 - (M + H - i) / p,
                width: O / u,
                height: H / p
              });
              break;
            case "270":
              y = (P, M, O, H) => ({
                x: 1 - (M + H - i) / p,
                y: (P - t) / u,
                width: H / p,
                height: O / u
              });
              break;
            default:
              y = (P, M, O, H) => ({
                x: (P - t) / u,
                y: (M - i) / p,
                width: O / u,
                height: H / p
              });
              break;
          }
          const S = [];
          for (let P = 0, M = g.rangeCount; P < M; P++) {
            const O = g.getRangeAt(P);
            if (!O.collapsed)
              for (const {
                x: H,
                y: B,
                width: q,
                height: nt
              } of O.getClientRects())
                q === 0 || nt === 0 || S.push(y(H, B, q, nt));
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
          t && (this.#y === w.AnnotationEditorType.NONE && !t.hasBeenModified || t.renderAnnotationElement(s));
        }
      }
    }
  ),
  /***/
  94: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        PDFFetchStream: () => (
          /* binding */
          C
        )
        /* harmony export */
      });
      var w = U(292), z = U(490);
      function N(r, c, l) {
        return {
          method: "GET",
          headers: r,
          signal: l.signal,
          mode: "cors",
          credentials: c ? "include" : "same-origin",
          redirect: "follow"
        };
      }
      function $(r) {
        const c = new Headers();
        for (const l in r) {
          const b = r[l];
          b !== void 0 && c.append(l, b);
        }
        return c;
      }
      function L(r) {
        return r instanceof Uint8Array ? r.buffer : r instanceof ArrayBuffer ? r : ((0, w.warn)(`getArrayBuffer - unexpected data format: ${r}`), new Uint8Array(r).buffer);
      }
      class C {
        constructor(c) {
          this.source = c, this.isHttp = /^https?:/i.test(c.url), this.httpHeaders = this.isHttp && c.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
        }
        get _progressiveDataLength() {
          return this._fullRequestReader?._loaded ?? 0;
        }
        getFullReader() {
          return (0, w.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once."), this._fullRequestReader = new x(this), this._fullRequestReader;
        }
        getRangeReader(c, l) {
          if (l <= this._progressiveDataLength)
            return null;
          const b = new v(this, c, l);
          return this._rangeRequestReaders.push(b), b;
        }
        cancelAllRequests(c) {
          this._fullRequestReader?.cancel(c);
          for (const l of this._rangeRequestReaders.slice(0))
            l.cancel(c);
        }
      }
      class x {
        constructor(c) {
          this._stream = c, this._reader = null, this._loaded = 0, this._filename = null;
          const l = c.source;
          this._withCredentials = l.withCredentials || !1, this._contentLength = l.length, this._headersCapability = Promise.withResolvers(), this._disableRange = l.disableRange || !1, this._rangeChunkSize = l.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._abortController = new AbortController(), this._isStreamingSupported = !l.disableStream, this._isRangeSupported = !l.disableRange, this._headers = $(this._stream.httpHeaders);
          const b = l.url;
          fetch(b, N(this._headers, this._withCredentials, this._abortController)).then((s) => {
            if (!(0, z.validateResponseStatus)(s.status))
              throw (0, z.createResponseStatusError)(s.status, b);
            this._reader = s.body.getReader(), this._headersCapability.resolve();
            const g = (u) => s.headers.get(u), {
              allowRangeRequests: t,
              suggestedLength: i
            } = (0, z.validateRangeRequestCapabilities)({
              getResponseHeader: g,
              isHttp: this._stream.isHttp,
              rangeChunkSize: this._rangeChunkSize,
              disableRange: this._disableRange
            });
            this._isRangeSupported = t, this._contentLength = i || this._contentLength, this._filename = (0, z.extractFilenameFromHeader)(g), !this._isStreamingSupported && this._isRangeSupported && this.cancel(new w.AbortException("Streaming is disabled."));
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
            value: L(c),
            done: !1
          });
        }
        cancel(c) {
          this._reader?.cancel(c), this._abortController.abort();
        }
      }
      class v {
        constructor(c, l, b) {
          this._stream = c, this._reader = null, this._loaded = 0;
          const s = c.source;
          this._withCredentials = s.withCredentials || !1, this._readCapability = Promise.withResolvers(), this._isStreamingSupported = !s.disableStream, this._abortController = new AbortController(), this._headers = $(this._stream.httpHeaders), this._headers.append("Range", `bytes=${l}-${b - 1}`);
          const g = s.url;
          fetch(g, N(this._headers, this._withCredentials, this._abortController)).then((t) => {
            if (!(0, z.validateResponseStatus)(t.status))
              throw (0, z.createResponseStatusError)(t.status, g);
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
            value: L(c),
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
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        FontFaceObject: () => (
          /* binding */
          N
        ),
        /* harmony export */
        FontLoader: () => (
          /* binding */
          z
        )
        /* harmony export */
      });
      var w = U(292);
      class z {
        #t = /* @__PURE__ */ new Set();
        constructor({
          ownerDocument: L = globalThis.document,
          styleElement: C = null
        }) {
          this._document = L, this.nativeFontFaces = /* @__PURE__ */ new Set(), this.styleElement = null, this.loadingRequests = [], this.loadTestFontId = 0;
        }
        addNativeFontFace(L) {
          this.nativeFontFaces.add(L), this._document.fonts.add(L);
        }
        removeNativeFontFace(L) {
          this.nativeFontFaces.delete(L), this._document.fonts.delete(L);
        }
        insertRule(L) {
          this.styleElement || (this.styleElement = this._document.createElement("style"), this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement));
          const C = this.styleElement.sheet;
          C.insertRule(L, C.cssRules.length);
        }
        clear() {
          for (const L of this.nativeFontFaces)
            this._document.fonts.delete(L);
          this.nativeFontFaces.clear(), this.#t.clear(), this.styleElement && (this.styleElement.remove(), this.styleElement = null);
        }
        async loadSystemFont({
          systemFontInfo: L,
          _inspectFont: C
        }) {
          if (!(!L || this.#t.has(L.loadedName))) {
            if ((0, w.assert)(!this.disableFontFace, "loadSystemFont shouldn't be called when `disableFontFace` is set."), this.isFontLoadingAPISupported) {
              const {
                loadedName: x,
                src: v,
                style: r
              } = L, c = new FontFace(x, v, r);
              this.addNativeFontFace(c);
              try {
                await c.load(), this.#t.add(x), C?.(L);
              } catch {
                (0, w.warn)(`Cannot load system font: ${L.baseFontName}, installing it could help to improve PDF rendering.`), this.removeNativeFontFace(c);
              }
              return;
            }
            (0, w.unreachable)("Not implemented: loadSystemFont without the Font Loading API.");
          }
        }
        async bind(L) {
          if (L.attached || L.missingFile && !L.systemFontInfo)
            return;
          if (L.attached = !0, L.systemFontInfo) {
            await this.loadSystemFont(L);
            return;
          }
          if (this.isFontLoadingAPISupported) {
            const x = L.createNativeFontFace();
            if (x) {
              this.addNativeFontFace(x);
              try {
                await x.loaded;
              } catch (v) {
                throw (0, w.warn)(`Failed to load font '${x.family}': '${v}'.`), L.disableFontFace = !0, v;
              }
            }
            return;
          }
          const C = L.createFontFaceRule();
          if (C) {
            if (this.insertRule(C), this.isSyncFontLoadingSupported)
              return;
            await new Promise((x) => {
              const v = this._queueLoadingCallback(x);
              this._prepareFontLoadEvent(L, v);
            });
          }
        }
        get isFontLoadingAPISupported() {
          const L = !!this._document?.fonts;
          return (0, w.shadow)(this, "isFontLoadingAPISupported", L);
        }
        get isSyncFontLoadingSupported() {
          let L = !1;
          return (w.isNodeJS || typeof navigator < "u" && typeof navigator?.userAgent == "string" && /Mozilla\/5.0.*?rv:\d+.*? Gecko/.test(navigator.userAgent)) && (L = !0), (0, w.shadow)(this, "isSyncFontLoadingSupported", L);
        }
        _queueLoadingCallback(L) {
          function C() {
            for ((0, w.assert)(!v.done, "completeRequest() cannot be called twice."), v.done = !0; x.length > 0 && x[0].done; ) {
              const r = x.shift();
              setTimeout(r.callback, 0);
            }
          }
          const {
            loadingRequests: x
          } = this, v = {
            done: !1,
            complete: C,
            callback: L
          };
          return x.push(v), v;
        }
        get _loadTestFont() {
          const L = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
          return (0, w.shadow)(this, "_loadTestFont", L);
        }
        _prepareFontLoadEvent(L, C) {
          function x(H, B) {
            return H.charCodeAt(B) << 24 | H.charCodeAt(B + 1) << 16 | H.charCodeAt(B + 2) << 8 | H.charCodeAt(B + 3) & 255;
          }
          function v(H, B, q, nt) {
            const j = H.substring(0, B), _ = H.substring(B + q);
            return j + nt + _;
          }
          let r, c;
          const l = this._document.createElement("canvas");
          l.width = 1, l.height = 1;
          const b = l.getContext("2d");
          let s = 0;
          function g(H, B) {
            if (++s > 30) {
              (0, w.warn)("Load test font never loaded."), B();
              return;
            }
            if (b.font = "30px " + H, b.fillText(".", 0, 20), b.getImageData(0, 0, 1, 1).data[3] > 0) {
              B();
              return;
            }
            setTimeout(g.bind(null, H, B));
          }
          const t = `lt${Date.now()}${this.loadTestFontId++}`;
          let i = this._loadTestFont;
          i = v(i, 976, t.length, t);
          const p = 16, y = 1482184792;
          let S = x(i, p);
          for (r = 0, c = t.length - 3; r < c; r += 4)
            S = S - y + x(t, r) | 0;
          r < t.length && (S = S - y + x(t + "XXX", r) | 0), i = v(i, p, 4, (0, w.string32)(S));
          const P = `url(data:font/opentype;base64,${btoa(i)});`, M = `@font-face {font-family:"${t}";src:${P}}`;
          this.insertRule(M);
          const O = this._document.createElement("div");
          O.style.visibility = "hidden", O.style.width = O.style.height = "10px", O.style.position = "absolute", O.style.top = O.style.left = "0px";
          for (const H of [L.loadedName, t]) {
            const B = this._document.createElement("span");
            B.textContent = "Hi", B.style.fontFamily = H, O.append(B);
          }
          this._document.body.append(O), g(t, () => {
            O.remove(), C.complete();
          });
        }
      }
      class N {
        constructor(L, {
          disableFontFace: C = !1,
          ignoreErrors: x = !1,
          inspectFont: v = null
        }) {
          this.compiledGlyphs = /* @__PURE__ */ Object.create(null);
          for (const r in L)
            this[r] = L[r];
          this.disableFontFace = C === !0, this.ignoreErrors = x === !0, this._inspectFont = v;
        }
        createNativeFontFace() {
          if (!this.data || this.disableFontFace)
            return null;
          let L;
          if (!this.cssFontInfo)
            L = new FontFace(this.loadedName, this.data, {});
          else {
            const C = {
              weight: this.cssFontInfo.fontWeight
            };
            this.cssFontInfo.italicAngle && (C.style = `oblique ${this.cssFontInfo.italicAngle}deg`), L = new FontFace(this.cssFontInfo.fontFamily, this.data, C);
          }
          return this._inspectFont?.(this), L;
        }
        createFontFaceRule() {
          if (!this.data || this.disableFontFace)
            return null;
          const L = (0, w.bytesToString)(this.data), C = `url(data:${this.mimetype};base64,${btoa(L)});`;
          let x;
          if (!this.cssFontInfo)
            x = `@font-face {font-family:"${this.loadedName}";src:${C}}`;
          else {
            let v = `font-weight: ${this.cssFontInfo.fontWeight};`;
            this.cssFontInfo.italicAngle && (v += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`), x = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${v}src:${C}}`;
          }
          return this._inspectFont?.(this, C), x;
        }
        getPathGenerator(L, C) {
          if (this.compiledGlyphs[C] !== void 0)
            return this.compiledGlyphs[C];
          let x;
          try {
            x = L.get(this.loadedName + "_path_" + C);
          } catch (r) {
            if (!this.ignoreErrors)
              throw r;
            (0, w.warn)(`getPathGenerator - ignoring character: "${r}".`);
          }
          if (!Array.isArray(x) || x.length === 0)
            return this.compiledGlyphs[C] = function(r, c) {
            };
          const v = [];
          for (let r = 0, c = x.length; r < c; )
            switch (x[r++]) {
              case w.FontRenderOps.BEZIER_CURVE_TO:
                {
                  const [l, b, s, g, t, i] = x.slice(r, r + 6);
                  v.push((u) => u.bezierCurveTo(l, b, s, g, t, i)), r += 6;
                }
                break;
              case w.FontRenderOps.MOVE_TO:
                {
                  const [l, b] = x.slice(r, r + 2);
                  v.push((s) => s.moveTo(l, b)), r += 2;
                }
                break;
              case w.FontRenderOps.LINE_TO:
                {
                  const [l, b] = x.slice(r, r + 2);
                  v.push((s) => s.lineTo(l, b)), r += 2;
                }
                break;
              case w.FontRenderOps.QUADRATIC_CURVE_TO:
                {
                  const [l, b, s, g] = x.slice(r, r + 4);
                  v.push((t) => t.quadraticCurveTo(l, b, s, g)), r += 4;
                }
                break;
              case w.FontRenderOps.RESTORE:
                v.push((l) => l.restore());
                break;
              case w.FontRenderOps.SAVE:
                v.push((l) => l.save());
                break;
              case w.FontRenderOps.SCALE:
                (0, w.assert)(v.length === 2, "Scale command is only valid at the third position.");
                break;
              case w.FontRenderOps.TRANSFORM:
                {
                  const [l, b, s, g, t, i] = x.slice(r, r + 6);
                  v.push((u) => u.transform(l, b, s, g, t, i)), r += 6;
                }
                break;
              case w.FontRenderOps.TRANSLATE:
                {
                  const [l, b] = x.slice(r, r + 2);
                  v.push((s) => s.translate(l, b)), r += 2;
                }
                break;
            }
          return this.compiledGlyphs[C] = function(c, l) {
            v[0](c), v[1](c), c.scale(l, -l);
            for (let b = 2, s = v.length; b < s; b++)
              v[b](c);
          };
        }
      }
    }
  ),
  /***/
  62: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        Metadata: () => (
          /* binding */
          z
        )
        /* harmony export */
      });
      var w = U(292);
      class z {
        #t;
        #e;
        constructor({
          parsedData: $,
          rawData: L
        }) {
          this.#t = $, this.#e = L;
        }
        getRaw() {
          return this.#e;
        }
        get($) {
          return this.#t.get($) ?? null;
        }
        getAll() {
          return (0, w.objectFromMap)(this.#t);
        }
        has($) {
          return this.#t.has($);
        }
      }
    }
  ),
  /***/
  457: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        PDFNetworkStream: () => (
          /* binding */
          x
        )
        /* harmony export */
      });
      var w = U(292), z = U(490);
      const N = 200, $ = 206;
      function L(c) {
        const l = c.response;
        return typeof l != "string" ? l : (0, w.stringToBytes)(l).buffer;
      }
      class C {
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
          return this.isHttp && "begin" in l && "end" in l ? (b.setRequestHeader("Range", `bytes=${l.begin}-${l.end - 1}`), g.expectedStatus = $) : g.expectedStatus = N, b.responseType = "arraybuffer", l.onError && (b.onerror = function(t) {
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
          const t = g.status || N;
          if (!(t === N && s.expectedStatus === $) && t !== s.expectedStatus) {
            s.onError?.(g.status);
            return;
          }
          const u = L(g);
          if (t === $) {
            const p = g.getResponseHeader("Content-Range"), y = /bytes (\d+)-(\d+)\/(\d+)/.exec(p);
            s.onDone({
              begin: parseInt(y[1], 10),
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
      class x {
        constructor(l) {
          this._source = l, this._manager = new C(l.url, {
            httpHeaders: l.httpHeaders,
            withCredentials: l.withCredentials
          }), this._rangeChunkSize = l.rangeChunkSize, this._fullRequestReader = null, this._rangeRequestReaders = [];
        }
        _onRangeRequestReaderClosed(l) {
          const b = this._rangeRequestReaders.indexOf(l);
          b >= 0 && this._rangeRequestReaders.splice(b, 1);
        }
        getFullReader() {
          return (0, w.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once."), this._fullRequestReader = new v(this._manager, this._source), this._fullRequestReader;
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
      class v {
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
          } = (0, z.validateRangeRequestCapabilities)({
            getResponseHeader: s,
            isHttp: this._manager.isHttp,
            rangeChunkSize: this._rangeChunkSize,
            disableRange: this._disableRange
          });
          g && (this._isRangeSupported = !0), this._contentLength = t || this._contentLength, this._filename = (0, z.extractFilenameFromHeader)(s), this._isRangeSupported && this._manager.abortRequest(l), this._headersReceivedCapability.resolve();
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
          this._storedError = (0, z.createResponseStatusError)(l, this._url), this._headersReceivedCapability.reject(this._storedError);
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
          this._storedError = (0, z.createResponseStatusError)(l, this._url);
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
    (ct, st, U) => {
      U.d(st, {
        createResponseStatusError: () => (
          /* binding */
          C
        ),
        extractFilenameFromHeader: () => (
          /* binding */
          L
        ),
        validateRangeRequestCapabilities: () => (
          /* binding */
          $
        ),
        validateResponseStatus: () => (
          /* binding */
          x
        )
      });
      var w = U(292);
      function z(v) {
        let r = !0, c = l("filename\\*", "i").exec(v);
        if (c) {
          c = c[1];
          let p = t(c);
          return p = unescape(p), p = i(p), p = u(p), s(p);
        }
        if (c = g(v), c) {
          const p = u(c);
          return s(p);
        }
        if (c = l("filename", "i").exec(v), c) {
          c = c[1];
          let p = t(c);
          return p = u(p), s(p);
        }
        function l(p, y) {
          return new RegExp("(?:^|;)\\s*" + p + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', y);
        }
        function b(p, y) {
          if (p) {
            if (!/^[\x00-\xFF]+$/.test(y))
              return y;
            try {
              const S = new TextDecoder(p, {
                fatal: !0
              }), P = (0, w.stringToBytes)(y);
              y = S.decode(P), r = !1;
            } catch {
            }
          }
          return y;
        }
        function s(p) {
          return r && /[\x80-\xff]/.test(p) && (p = b("utf-8", p), r && (p = b("iso-8859-1", p))), p;
        }
        function g(p) {
          const y = [];
          let S;
          const P = l("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
          for (; (S = P.exec(p)) !== null; ) {
            let [, O, H, B] = S;
            if (O = parseInt(O, 10), O in y) {
              if (O === 0)
                break;
              continue;
            }
            y[O] = [H, B];
          }
          const M = [];
          for (let O = 0; O < y.length && O in y; ++O) {
            let [H, B] = y[O];
            B = t(B), H && (B = unescape(B), O === 0 && (B = i(B))), M.push(B);
          }
          return M.join("");
        }
        function t(p) {
          if (p.startsWith('"')) {
            const y = p.slice(1).split('\\"');
            for (let S = 0; S < y.length; ++S) {
              const P = y[S].indexOf('"');
              P !== -1 && (y[S] = y[S].slice(0, P), y.length = S + 1), y[S] = y[S].replaceAll(/\\(.)/g, "$1");
            }
            p = y.join('"');
          }
          return p;
        }
        function i(p) {
          const y = p.indexOf("'");
          if (y === -1)
            return p;
          const S = p.slice(0, y), M = p.slice(y + 1).replace(/^[^']*'/, "");
          return b(S, M);
        }
        function u(p) {
          return !p.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(p) ? p : p.replaceAll(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(y, S, P, M) {
            if (P === "q" || P === "Q")
              return M = M.replaceAll("_", " "), M = M.replaceAll(/=([0-9a-fA-F]{2})/g, function(O, H) {
                return String.fromCharCode(parseInt(H, 16));
              }), b(S, M);
            try {
              M = atob(M);
            } catch {
            }
            return b(S, M);
          });
        }
        return "";
      }
      var N = U(419);
      function $({
        getResponseHeader: v,
        isHttp: r,
        rangeChunkSize: c,
        disableRange: l
      }) {
        const b = {
          allowRangeRequests: !1,
          suggestedLength: void 0
        }, s = parseInt(v("Content-Length"), 10);
        return !Number.isInteger(s) || (b.suggestedLength = s, s <= 2 * c) || l || !r || v("Accept-Ranges") !== "bytes" || (v("Content-Encoding") || "identity") !== "identity" || (b.allowRangeRequests = !0), b;
      }
      function L(v) {
        const r = v("Content-Disposition");
        if (r) {
          let c = z(r);
          if (c.includes("%"))
            try {
              c = decodeURIComponent(c);
            } catch {
            }
          if ((0, N.isPdfFile)(c))
            return c;
        }
        return null;
      }
      function C(v, r) {
        return v === 404 || v === 0 && r.startsWith("file:") ? new w.MissingPDFException('Missing PDF "' + r + '".') : new w.UnexpectedResponseException(`Unexpected server response (${v}) while retrieving PDF "${r}".`, v);
      }
      function x(v) {
        return v === 200 || v === 206;
      }
    }
  ),
  /***/
  786: (
    /***/
    (ct, st, U) => {
      U.a(ct, async (w, z) => {
        try {
          let c = function(y) {
            const S = v.parse(y);
            return S.protocol === "file:" || S.host ? S : /^[a-z]:[/\\]/i.test(y) ? v.parse(`file:///${y}`) : (S.host || (S.protocol = "file:"), S);
          }, g = function(y, S) {
            return {
              protocol: y.protocol,
              auth: y.auth,
              host: y.hostname,
              port: y.port,
              path: y.path,
              method: "GET",
              headers: S
            };
          };
          U.d(st, {
            /* harmony export */
            PDFNodeStream: () => (
              /* binding */
              l
            )
            /* harmony export */
          });
          var N = U(292), $ = U(490);
          let L, C, x, v;
          N.isNodeJS && (L = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), C = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), x = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), v = await import(
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
              return (0, N.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once."), this._fullRequestReader = this.isFsUrl ? new u(this) : new t(this), this._fullRequestReader;
            }
            getRangeReader(S, P) {
              if (P <= this._progressiveDataLength)
                return null;
              const M = this.isFsUrl ? new p(this, S, P) : new i(this, S, P);
              return this._rangeRequestReaders.push(M), M;
            }
            cancelAllRequests(S) {
              this._fullRequestReader?.cancel(S);
              for (const P of this._rangeRequestReaders.slice(0))
                P.cancel(S);
            }
          }
          class b {
            constructor(S) {
              this._url = S.url, this._done = !1, this._storedError = null, this.onProgress = null;
              const P = S.source;
              this._contentLength = P.length, this._loaded = 0, this._filename = null, this._disableRange = P.disableRange || !1, this._rangeChunkSize = P.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !P.disableStream, this._isRangeSupported = !P.disableRange, this._readableStream = null, this._readCapability = Promise.withResolvers(), this._headersCapability = Promise.withResolvers();
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
              }), S.on("error", (P) => {
                this._error(P);
              }), !this._isStreamingSupported && this._isRangeSupported && this._error(new N.AbortException("streaming is disabled")), this._storedError && this._readableStream.destroy(this._storedError);
            }
          }
          class s {
            constructor(S) {
              this._url = S.url, this._done = !1, this._storedError = null, this.onProgress = null, this._loaded = 0, this._readableStream = null, this._readCapability = Promise.withResolvers();
              const P = S.source;
              this._isStreamingSupported = !P.disableStream;
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
              }), S.on("error", (P) => {
                this._error(P);
              }), this._storedError && this._readableStream.destroy(this._storedError);
            }
          }
          class t extends b {
            constructor(S) {
              super(S);
              const P = (M) => {
                if (M.statusCode === 404) {
                  const q = new N.MissingPDFException(`Missing PDF "${this._url}".`);
                  this._storedError = q, this._headersCapability.reject(q);
                  return;
                }
                this._headersCapability.resolve(), this._setReadableStream(M);
                const O = (q) => this._readableStream.headers[q.toLowerCase()], {
                  allowRangeRequests: H,
                  suggestedLength: B
                } = (0, $.validateRangeRequestCapabilities)({
                  getResponseHeader: O,
                  isHttp: S.isHttp,
                  rangeChunkSize: this._rangeChunkSize,
                  disableRange: this._disableRange
                });
                this._isRangeSupported = H, this._contentLength = B || this._contentLength, this._filename = (0, $.extractFilenameFromHeader)(O);
              };
              this._request = null, this._url.protocol === "http:" ? this._request = C.request(g(this._url, S.httpHeaders), P) : this._request = x.request(g(this._url, S.httpHeaders), P), this._request.on("error", (M) => {
                this._storedError = M, this._headersCapability.reject(M);
              }), this._request.end();
            }
          }
          class i extends s {
            constructor(S, P, M) {
              super(S), this._httpHeaders = {};
              for (const H in S.httpHeaders) {
                const B = S.httpHeaders[H];
                B !== void 0 && (this._httpHeaders[H] = B);
              }
              this._httpHeaders.Range = `bytes=${P}-${M - 1}`;
              const O = (H) => {
                if (H.statusCode === 404) {
                  const B = new N.MissingPDFException(`Missing PDF "${this._url}".`);
                  this._storedError = B;
                  return;
                }
                this._setReadableStream(H);
              };
              this._request = null, this._url.protocol === "http:" ? this._request = C.request(g(this._url, this._httpHeaders), O) : this._request = x.request(g(this._url, this._httpHeaders), O), this._request.on("error", (H) => {
                this._storedError = H;
              }), this._request.end();
            }
          }
          class u extends b {
            constructor(S) {
              super(S);
              let P = decodeURIComponent(this._url.path);
              r.test(this._url.href) && (P = P.replace(/^\//, "")), L.promises.lstat(P).then((M) => {
                this._contentLength = M.size, this._setReadableStream(L.createReadStream(P)), this._headersCapability.resolve();
              }, (M) => {
                M.code === "ENOENT" && (M = new N.MissingPDFException(`Missing PDF "${P}".`)), this._storedError = M, this._headersCapability.reject(M);
              });
            }
          }
          class p extends s {
            constructor(S, P, M) {
              super(S);
              let O = decodeURIComponent(this._url.path);
              r.test(this._url.href) && (O = O.replace(/^\//, "")), this._setReadableStream(L.createReadStream(O, {
                start: P,
                end: M - 1
              }));
            }
          }
          z();
        } catch (L) {
          z(L);
        }
      }, 1);
    }
  ),
  /***/
  573: (
    /***/
    (ct, st, U) => {
      U.a(ct, async (w, z) => {
        try {
          U.d(st, {
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
          var N = U(583), $ = U(292);
          let L, C, x;
          if ($.isNodeJS) {
            L = await import(
              /*webpackIgnore: true*/
              "./__vite-browser-external-DYxpcVy9.js"
            );
            try {
              C = await import(
                /*webpackIgnore: true*/
                "./__vite-browser-external-DYxpcVy9.js"
              );
            } catch {
            }
            try {
              x = await import(
                /*webpackIgnore: true*/
                "./index-Dwr47WtL.js"
              );
            } catch {
            }
          }
          const v = function(s) {
            return L.promises.readFile(s).then((g) => new Uint8Array(g));
          };
          class r extends N.BaseFilterFactory {
          }
          class c extends N.BaseCanvasFactory {
            _createCanvas(g, t) {
              return C.createCanvas(g, t);
            }
          }
          class l extends N.BaseCMapReaderFactory {
            _fetchData(g, t) {
              return v(g).then((i) => ({
                cMapData: i,
                compressionType: t
              }));
            }
          }
          class b extends N.BaseStandardFontDataFactory {
            _fetchData(g) {
              return v(g);
            }
          }
          z();
        } catch (L) {
          z(L);
        }
      }, 1);
    }
  ),
  /***/
  626: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        OptionalContentConfig: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var w = U(292), z = U(651);
      const N = Symbol("INTERNAL");
      class $ {
        #t = !1;
        #e = !1;
        #s = !1;
        #n = !0;
        constructor(x, {
          name: v,
          intent: r,
          usage: c
        }) {
          this.#t = !!(x & w.RenderingIntentFlag.DISPLAY), this.#e = !!(x & w.RenderingIntentFlag.PRINT), this.name = v, this.intent = r, this.usage = c;
        }
        get visible() {
          if (this.#s)
            return this.#n;
          if (!this.#n)
            return !1;
          const {
            print: x,
            view: v
          } = this.usage;
          return this.#t ? v?.viewState !== "OFF" : this.#e ? x?.printState !== "OFF" : !0;
        }
        _setVisible(x, v, r = !1) {
          x !== N && (0, w.unreachable)("Internal method `_setVisible` called."), this.#s = r, this.#n = v;
        }
      }
      class L {
        #t = null;
        #e = /* @__PURE__ */ new Map();
        #s = null;
        #n = null;
        constructor(x, v = w.RenderingIntentFlag.DISPLAY) {
          if (this.renderingIntent = v, this.name = null, this.creator = null, x !== null) {
            this.name = x.name, this.creator = x.creator, this.#n = x.order;
            for (const r of x.groups)
              this.#e.set(r.id, new $(v, r));
            if (x.baseState === "OFF")
              for (const r of this.#e.values())
                r._setVisible(N, !1);
            for (const r of x.on)
              this.#e.get(r)._setVisible(N, !0);
            for (const r of x.off)
              this.#e.get(r)._setVisible(N, !1);
            this.#s = this.getHash();
          }
        }
        #r(x) {
          const v = x.length;
          if (v < 2)
            return !0;
          const r = x[0];
          for (let c = 1; c < v; c++) {
            const l = x[c];
            let b;
            if (Array.isArray(l))
              b = this.#r(l);
            else if (this.#e.has(l))
              b = this.#e.get(l).visible;
            else
              return (0, w.warn)(`Optional content group not found: ${l}`), !0;
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
        isVisible(x) {
          if (this.#e.size === 0)
            return !0;
          if (!x)
            return (0, w.info)("Optional content group not defined."), !0;
          if (x.type === "OCG")
            return this.#e.has(x.id) ? this.#e.get(x.id).visible : ((0, w.warn)(`Optional content group not found: ${x.id}`), !0);
          if (x.type === "OCMD") {
            if (x.expression)
              return this.#r(x.expression);
            if (!x.policy || x.policy === "AnyOn") {
              for (const v of x.ids) {
                if (!this.#e.has(v))
                  return (0, w.warn)(`Optional content group not found: ${v}`), !0;
                if (this.#e.get(v).visible)
                  return !0;
              }
              return !1;
            } else if (x.policy === "AllOn") {
              for (const v of x.ids) {
                if (!this.#e.has(v))
                  return (0, w.warn)(`Optional content group not found: ${v}`), !0;
                if (!this.#e.get(v).visible)
                  return !1;
              }
              return !0;
            } else if (x.policy === "AnyOff") {
              for (const v of x.ids) {
                if (!this.#e.has(v))
                  return (0, w.warn)(`Optional content group not found: ${v}`), !0;
                if (!this.#e.get(v).visible)
                  return !0;
              }
              return !1;
            } else if (x.policy === "AllOff") {
              for (const v of x.ids) {
                if (!this.#e.has(v))
                  return (0, w.warn)(`Optional content group not found: ${v}`), !0;
                if (this.#e.get(v).visible)
                  return !1;
              }
              return !0;
            }
            return (0, w.warn)(`Unknown optional content policy ${x.policy}.`), !0;
          }
          return (0, w.warn)(`Unknown group type ${x.type}.`), !0;
        }
        setVisibility(x, v = !0) {
          const r = this.#e.get(x);
          if (!r) {
            (0, w.warn)(`Optional content group not found: ${x}`);
            return;
          }
          r._setVisible(N, !!v, !0), this.#t = null;
        }
        setOCGState({
          state: x,
          preserveRB: v
        }) {
          let r;
          for (const c of x) {
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
                  l._setVisible(N, !0);
                  break;
                case "OFF":
                  l._setVisible(N, !1);
                  break;
                case "Toggle":
                  l._setVisible(N, !l.visible);
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
          return this.#e.size > 0 ? (0, w.objectFromMap)(this.#e) : null;
        }
        getGroup(x) {
          return this.#e.get(x) || null;
        }
        getHash() {
          if (this.#t !== null)
            return this.#t;
          const x = new z.MurmurHash3_64();
          for (const [v, r] of this.#e)
            x.update(`${v}:${r.visible}`);
          return this.#t = x.hexdigest();
        }
      }
    }
  ),
  /***/
  814: (
    /***/
    (ct, st, U) => {
      U.d(st, {
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
      var w = U(292), z = U(419);
      const N = 1e5, $ = 30, L = 0.8, C = /* @__PURE__ */ new Map();
      let x = null;
      function v() {
        if (!x) {
          const u = document.createElement("canvas");
          u.className = "hiddenCanvasElement", document.body.append(u), x = u.getContext("2d", {
            alpha: !1
          });
        }
        return x;
      }
      function r() {
        x?.canvas.remove(), x = null;
      }
      function c(u) {
        const p = C.get(u);
        if (p)
          return p;
        const y = v(), S = y.font;
        y.canvas.width = y.canvas.height = $, y.font = `${$}px ${u}`;
        const P = y.measureText("");
        let M = P.fontBoundingBoxAscent, O = Math.abs(P.fontBoundingBoxDescent);
        if (M) {
          const B = M / (M + O);
          return C.set(u, B), y.canvas.width = y.canvas.height = 0, y.font = S, B;
        }
        y.strokeStyle = "red", y.clearRect(0, 0, $, $), y.strokeText("g", 0, 0);
        let H = y.getImageData(0, 0, $, $).data;
        O = 0;
        for (let B = H.length - 1 - 3; B >= 0; B -= 4)
          if (H[B] > 0) {
            O = Math.ceil(B / 4 / $);
            break;
          }
        y.clearRect(0, 0, $, $), y.strokeText("A", 0, $), H = y.getImageData(0, 0, $, $).data, M = 0;
        for (let B = 0, q = H.length; B < q; B += 4)
          if (H[B] > 0) {
            M = $ - Math.floor(B / 4 / $);
            break;
          }
        if (y.canvas.width = y.canvas.height = 0, y.font = S, M) {
          const B = M / (M + O);
          return C.set(u, B), B;
        }
        return C.set(u, L), L;
      }
      function l(u, p, y) {
        const S = document.createElement("span"), P = {
          angle: 0,
          canvasWidth: 0,
          hasText: p.str !== "",
          hasEOL: p.hasEOL,
          fontSize: 0
        };
        u._textDivs.push(S);
        const M = w.Util.transform(u._transform, p.transform);
        let O = Math.atan2(M[1], M[0]);
        const H = y[p.fontName];
        H.vertical && (O += Math.PI / 2);
        const B = u._fontInspectorEnabled && H.fontSubstitution || H.fontFamily, q = Math.hypot(M[2], M[3]), nt = q * c(B);
        let j, _;
        O === 0 ? (j = M[4], _ = M[5] - nt) : (j = M[4] + nt * Math.sin(O), _ = M[5] - nt * Math.cos(O));
        const G = "calc(var(--scale-factor)*", Y = S.style;
        u._container === u._rootContainer ? (Y.left = `${(100 * j / u._pageWidth).toFixed(2)}%`, Y.top = `${(100 * _ / u._pageHeight).toFixed(2)}%`) : (Y.left = `${G}${j.toFixed(2)}px)`, Y.top = `${G}${_.toFixed(2)}px)`), Y.fontSize = `${G}${q.toFixed(2)}px)`, Y.fontFamily = B, P.fontSize = q, S.setAttribute("role", "presentation"), S.textContent = p.str, S.dir = p.dir, u._fontInspectorEnabled && (S.dataset.fontName = H.fontSubstitutionLoadedName || p.fontName), O !== 0 && (P.angle = O * (180 / Math.PI));
        let tt = !1;
        if (p.str.length > 1)
          tt = !0;
        else if (p.str !== " " && p.transform[0] !== p.transform[3]) {
          const Z = Math.abs(p.transform[0]), at = Math.abs(p.transform[3]);
          Z !== at && Math.max(Z, at) / Math.min(Z, at) > 1.5 && (tt = !0);
        }
        tt && (P.canvasWidth = H.vertical ? p.height : p.width), u._textDivProperties.set(S, P), u._isReadableStream && u._layoutText(S);
      }
      function b(u) {
        const {
          div: p,
          scale: y,
          properties: S,
          ctx: P,
          prevFontSize: M,
          prevFontFamily: O
        } = u, {
          style: H
        } = p;
        let B = "";
        if (S.canvasWidth !== 0 && S.hasText) {
          const {
            fontFamily: q
          } = H, {
            canvasWidth: nt,
            fontSize: j
          } = S;
          (M !== j || O !== q) && (P.font = `${j * y}px ${q}`, u.prevFontSize = j, u.prevFontFamily = q);
          const {
            width: _
          } = P.measureText(p.textContent);
          _ > 0 && (B = `scaleX(${nt * y / _})`);
        }
        S.angle !== 0 && (B = `rotate(${S.angle}deg) ${B}`), B.length > 0 && (H.transform = B);
      }
      function s(u) {
        if (u._canceled)
          return;
        const p = u._textDivs, y = u._capability;
        if (p.length > N) {
          y.resolve();
          return;
        }
        if (!u._isReadableStream)
          for (const P of p)
            u._layoutText(P);
        y.resolve();
      }
      class g {
        constructor({
          textContentSource: p,
          container: y,
          viewport: S,
          textDivs: P,
          textDivProperties: M,
          textContentItemsStr: O
        }) {
          this._textContentSource = p, this._isReadableStream = p instanceof ReadableStream, this._container = this._rootContainer = y, this._textDivs = P || [], this._textContentItemsStr = O || [], this._fontInspectorEnabled = !!globalThis.FontInspector?.enabled, this._reader = null, this._textDivProperties = M || /* @__PURE__ */ new WeakMap(), this._canceled = !1, this._capability = Promise.withResolvers(), this._layoutTextParams = {
            prevFontSize: null,
            prevFontFamily: null,
            div: null,
            scale: S.scale * (globalThis.devicePixelRatio || 1),
            properties: null,
            ctx: v()
          };
          const {
            pageWidth: H,
            pageHeight: B,
            pageX: q,
            pageY: nt
          } = S.rawDims;
          this._transform = [1, 0, 0, -1, -q, nt + B], this._pageWidth = H, this._pageHeight = B, (0, z.setLayerDimensions)(y, S), this._capability.promise.finally(() => {
            this._layoutTextParams = null;
          }).catch(() => {
          });
        }
        get promise() {
          return this._capability.promise;
        }
        cancel() {
          this._canceled = !0, this._reader && (this._reader.cancel(new w.AbortException("TextLayer task cancelled.")).catch(() => {
          }), this._reader = null), this._capability.reject(new w.AbortException("TextLayer task cancelled."));
        }
        _processItems(p, y) {
          for (const S of p) {
            if (S.str === void 0) {
              if (S.type === "beginMarkedContentProps" || S.type === "beginMarkedContent") {
                const P = this._container;
                this._container = document.createElement("span"), this._container.classList.add("markedContent"), S.id !== null && this._container.setAttribute("id", `${S.id}`), P.append(this._container);
              } else S.type === "endMarkedContent" && (this._container = this._container.parentNode);
              continue;
            }
            this._textContentItemsStr.push(S.str), l(this, S, y);
          }
        }
        _layoutText(p) {
          const y = this._layoutTextParams.properties = this._textDivProperties.get(p);
          if (this._layoutTextParams.div = p, b(this._layoutTextParams), y.hasText && this._container.append(p), y.hasEOL) {
            const S = document.createElement("br");
            S.setAttribute("role", "presentation"), this._container.append(S);
          }
        }
        _render() {
          const {
            promise: p,
            resolve: y,
            reject: S
          } = Promise.withResolvers();
          let P = /* @__PURE__ */ Object.create(null);
          if (this._isReadableStream) {
            const M = () => {
              this._reader.read().then(({
                value: O,
                done: H
              }) => {
                if (H) {
                  y();
                  return;
                }
                Object.assign(P, O.styles), this._processItems(O.items, P), M();
              }, S);
            };
            this._reader = this._textContentSource.getReader(), M();
          } else if (this._textContentSource) {
            const {
              items: M,
              styles: O
            } = this._textContentSource;
            this._processItems(M, O), y();
          } else
            throw new Error('No "textContentSource" parameter specified.');
          p.then(() => {
            P = null, s(this);
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
        textDivs: y,
        textDivProperties: S,
        mustRotate: P = !0,
        mustRescale: M = !0
      }) {
        if (P && (0, z.setLayerDimensions)(u, {
          rotation: p.rotation
        }), M) {
          const O = v(), B = {
            prevFontSize: null,
            prevFontFamily: null,
            div: null,
            scale: p.scale * (globalThis.devicePixelRatio || 1),
            properties: null,
            ctx: O
          };
          for (const q of y)
            B.properties = S.get(q), B.div = q, b(B);
        }
      }
    }
  ),
  /***/
  585: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        PDFDataTransportStream: () => (
          /* binding */
          N
        )
        /* harmony export */
      });
      var w = U(292), z = U(419);
      class N {
        constructor(x, {
          disableRange: v = !1,
          disableStream: r = !1
        }) {
          (0, w.assert)(x, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
          const {
            length: c,
            initialData: l,
            progressiveDone: b,
            contentDispositionFilename: s
          } = x;
          if (this._queuedChunks = [], this._progressiveDone = b, this._contentDispositionFilename = s, l?.length > 0) {
            const g = l instanceof Uint8Array && l.byteLength === l.buffer.byteLength ? l.buffer : new Uint8Array(l).buffer;
            this._queuedChunks.push(g);
          }
          this._pdfDataRangeTransport = x, this._isStreamingSupported = !r, this._isRangeSupported = !v, this._contentLength = c, this._fullRequestReader = null, this._rangeReaders = [], x.addRangeListener((g, t) => {
            this._onReceiveData({
              begin: g,
              chunk: t
            });
          }), x.addProgressListener((g, t) => {
            this._onProgress({
              loaded: g,
              total: t
            });
          }), x.addProgressiveReadListener((g) => {
            this._onReceiveData({
              chunk: g
            });
          }), x.addProgressiveDoneListener(() => {
            this._onProgressiveDone();
          }), x.transportReady();
        }
        _onReceiveData({
          begin: x,
          chunk: v
        }) {
          const r = v instanceof Uint8Array && v.byteLength === v.buffer.byteLength ? v.buffer : new Uint8Array(v).buffer;
          if (x === void 0)
            this._fullRequestReader ? this._fullRequestReader._enqueue(r) : this._queuedChunks.push(r);
          else {
            const c = this._rangeReaders.some(function(l) {
              return l._begin !== x ? !1 : (l._enqueue(r), !0);
            });
            (0, w.assert)(c, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
          }
        }
        get _progressiveDataLength() {
          return this._fullRequestReader?._loaded ?? 0;
        }
        _onProgress(x) {
          x.total === void 0 ? this._rangeReaders[0]?.onProgress?.({
            loaded: x.loaded
          }) : this._fullRequestReader?.onProgress?.({
            loaded: x.loaded,
            total: x.total
          });
        }
        _onProgressiveDone() {
          this._fullRequestReader?.progressiveDone(), this._progressiveDone = !0;
        }
        _removeRangeReader(x) {
          const v = this._rangeReaders.indexOf(x);
          v >= 0 && this._rangeReaders.splice(v, 1);
        }
        getFullReader() {
          (0, w.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
          const x = this._queuedChunks;
          return this._queuedChunks = null, new $(this, x, this._progressiveDone, this._contentDispositionFilename);
        }
        getRangeReader(x, v) {
          if (v <= this._progressiveDataLength)
            return null;
          const r = new L(this, x, v);
          return this._pdfDataRangeTransport.requestDataRange(x, v), this._rangeReaders.push(r), r;
        }
        cancelAllRequests(x) {
          this._fullRequestReader?.cancel(x);
          for (const v of this._rangeReaders.slice(0))
            v.cancel(x);
          this._pdfDataRangeTransport.abort();
        }
      }
      class $ {
        constructor(x, v, r = !1, c = null) {
          this._stream = x, this._done = r || !1, this._filename = (0, z.isPdfFile)(c) ? c : null, this._queuedChunks = v || [], this._loaded = 0;
          for (const l of this._queuedChunks)
            this._loaded += l.byteLength;
          this._requests = [], this._headersReady = Promise.resolve(), x._fullRequestReader = this, this.onProgress = null;
        }
        _enqueue(x) {
          this._done || (this._requests.length > 0 ? this._requests.shift().resolve({
            value: x,
            done: !1
          }) : this._queuedChunks.push(x), this._loaded += x.byteLength);
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
          const x = Promise.withResolvers();
          return this._requests.push(x), x.promise;
        }
        cancel(x) {
          this._done = !0;
          for (const v of this._requests)
            v.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0;
        }
        progressiveDone() {
          this._done || (this._done = !0);
        }
      }
      class L {
        constructor(x, v, r) {
          this._stream = x, this._begin = v, this._end = r, this._queuedChunk = null, this._requests = [], this._done = !1, this.onProgress = null;
        }
        _enqueue(x) {
          if (!this._done) {
            if (this._requests.length === 0)
              this._queuedChunk = x;
            else {
              this._requests.shift().resolve({
                value: x,
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
            const v = this._queuedChunk;
            return this._queuedChunk = null, {
              value: v,
              done: !1
            };
          }
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const x = Promise.withResolvers();
          return this._requests.push(x), x.promise;
        }
        cancel(x) {
          this._done = !0;
          for (const v of this._requests)
            v.resolve({
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
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        GlobalWorkerOptions: () => (
          /* binding */
          w
        )
        /* harmony export */
      });
      class w {
        static #t = null;
        static #e = "";
        static get workerPort() {
          return this.#t;
        }
        static set workerPort(N) {
          if (!(typeof Worker < "u" && N instanceof Worker) && N !== null)
            throw new Error("Invalid `workerPort` type.");
          this.#t = N;
        }
        static get workerSrc() {
          return this.#e;
        }
        static set workerSrc(N) {
          if (typeof N != "string")
            throw new Error("Invalid `workerSrc` type.");
          this.#e = N;
        }
      }
    }
  ),
  /***/
  284: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        XfaLayer: () => (
          /* binding */
          z
        )
        /* harmony export */
      });
      var w = U(50);
      class z {
        static setupStorage($, L, C, x, v) {
          const r = x.getValue(L, {
            value: null
          });
          switch (C.name) {
            case "textarea":
              if (r.value !== null && ($.textContent = r.value), v === "print")
                break;
              $.addEventListener("input", (c) => {
                x.setValue(L, {
                  value: c.target.value
                });
              });
              break;
            case "input":
              if (C.attributes.type === "radio" || C.attributes.type === "checkbox") {
                if (r.value === C.attributes.xfaOn ? $.setAttribute("checked", !0) : r.value === C.attributes.xfaOff && $.removeAttribute("checked"), v === "print")
                  break;
                $.addEventListener("change", (c) => {
                  x.setValue(L, {
                    value: c.target.checked ? c.target.getAttribute("xfaOn") : c.target.getAttribute("xfaOff")
                  });
                });
              } else {
                if (r.value !== null && $.setAttribute("value", r.value), v === "print")
                  break;
                $.addEventListener("input", (c) => {
                  x.setValue(L, {
                    value: c.target.value
                  });
                });
              }
              break;
            case "select":
              if (r.value !== null) {
                $.setAttribute("value", r.value);
                for (const c of C.children)
                  c.attributes.value === r.value ? c.attributes.selected = !0 : c.attributes.hasOwnProperty("selected") && delete c.attributes.selected;
              }
              $.addEventListener("input", (c) => {
                const l = c.target.options, b = l.selectedIndex === -1 ? "" : l[l.selectedIndex].value;
                x.setValue(L, {
                  value: b
                });
              });
              break;
          }
        }
        static setAttributes({
          html: $,
          element: L,
          storage: C = null,
          intent: x,
          linkService: v
        }) {
          const {
            attributes: r
          } = L, c = $ instanceof HTMLAnchorElement;
          r.type === "radio" && (r.name = `${r.name}-${x}`);
          for (const [l, b] of Object.entries(r))
            if (b != null)
              switch (l) {
                case "class":
                  b.length && $.setAttribute(l, b.join(" "));
                  break;
                case "dataId":
                  break;
                case "id":
                  $.setAttribute("data-element-id", b);
                  break;
                case "style":
                  Object.assign($.style, b);
                  break;
                case "textContent":
                  $.textContent = b;
                  break;
                default:
                  (!c || l !== "href" && l !== "newWindow") && $.setAttribute(l, b);
              }
          c && v.addLinkAttributes($, r.href, r.newWindow), C && r.dataId && this.setupStorage($, r.dataId, L, C);
        }
        static render($) {
          const L = $.annotationStorage, C = $.linkService, x = $.xfaHtml, v = $.intent || "display", r = document.createElement(x.name);
          x.attributes && this.setAttributes({
            html: r,
            element: x,
            intent: v,
            linkService: C
          });
          const c = v !== "richText", l = $.div;
          if (l.append(r), $.viewport) {
            const g = `matrix(${$.viewport.transform.join(",")})`;
            l.style.transform = g;
          }
          c && l.setAttribute("class", "xfaLayer xfaFont");
          const b = [];
          if (x.children.length === 0) {
            if (x.value) {
              const g = document.createTextNode(x.value);
              r.append(g), c && w.XfaText.shouldBuildText(x.name) && b.push(g);
            }
            return {
              textDivs: b
            };
          }
          const s = [[x, -1, r]];
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
            const y = u?.attributes?.xmlns ? document.createElementNS(u.attributes.xmlns, p) : document.createElement(p);
            if (i.append(y), u.attributes && this.setAttributes({
              html: y,
              element: u,
              storage: L,
              intent: v,
              linkService: C
            }), u.children?.length > 0)
              s.push([u, -1, y]);
            else if (u.value) {
              const S = document.createTextNode(u.value);
              c && w.XfaText.shouldBuildText(p) && b.push(S), y.append(S);
            }
          }
          for (const g of l.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))
            g.setAttribute("readOnly", !0);
          return {
            textDivs: b
          };
        }
        static update($) {
          const L = `matrix(${$.viewport.transform.join(",")})`;
          $.div.style.transform = L, $.div.hidden = !1;
        }
      }
    }
  ),
  /***/
  50: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        XfaText: () => (
          /* binding */
          w
        )
        /* harmony export */
      });
      class w {
        static textContent(N) {
          const $ = [], L = {
            items: $,
            styles: /* @__PURE__ */ Object.create(null)
          };
          function C(x) {
            if (!x)
              return;
            let v = null;
            const r = x.name;
            if (r === "#text")
              v = x.value;
            else if (w.shouldBuildText(r))
              x?.attributes?.textContent ? v = x.attributes.textContent : x.value && (v = x.value);
            else return;
            if (v !== null && $.push({
              str: v
            }), !!x.children)
              for (const c of x.children)
                C(c);
          }
          return C(N), L;
        }
        static shouldBuildText(N) {
          return !(N === "textarea" || N === "input" || N === "option" || N === "select");
        }
      }
    }
  ),
  /***/
  228: (
    /***/
    (ct, st, U) => {
      U.a(ct, async (w, z) => {
        try {
          U.d(st, {
            /* harmony export */
            AbortException: () => (
              /* reexport safe */
              N.AbortException
            ),
            /* harmony export */
            AnnotationEditorLayer: () => (
              /* reexport safe */
              x.AnnotationEditorLayer
            ),
            /* harmony export */
            AnnotationEditorParamsType: () => (
              /* reexport safe */
              N.AnnotationEditorParamsType
            ),
            /* harmony export */
            AnnotationEditorType: () => (
              /* reexport safe */
              N.AnnotationEditorType
            ),
            /* harmony export */
            AnnotationEditorUIManager: () => (
              /* reexport safe */
              v.AnnotationEditorUIManager
            ),
            /* harmony export */
            AnnotationLayer: () => (
              /* reexport safe */
              r.AnnotationLayer
            ),
            /* harmony export */
            AnnotationMode: () => (
              /* reexport safe */
              N.AnnotationMode
            ),
            /* harmony export */
            CMapCompressionType: () => (
              /* reexport safe */
              N.CMapCompressionType
            ),
            /* harmony export */
            ColorPicker: () => (
              /* reexport safe */
              c.ColorPicker
            ),
            /* harmony export */
            DOMSVGFactory: () => (
              /* reexport safe */
              L.DOMSVGFactory
            ),
            /* harmony export */
            DrawLayer: () => (
              /* reexport safe */
              l.DrawLayer
            ),
            /* harmony export */
            FeatureTest: () => (
              /* reexport safe */
              N.FeatureTest
            ),
            /* harmony export */
            GlobalWorkerOptions: () => (
              /* reexport safe */
              b.GlobalWorkerOptions
            ),
            /* harmony export */
            ImageKind: () => (
              /* reexport safe */
              N.ImageKind
            ),
            /* harmony export */
            InvalidPDFException: () => (
              /* reexport safe */
              N.InvalidPDFException
            ),
            /* harmony export */
            MissingPDFException: () => (
              /* reexport safe */
              N.MissingPDFException
            ),
            /* harmony export */
            OPS: () => (
              /* reexport safe */
              N.OPS
            ),
            /* harmony export */
            Outliner: () => (
              /* reexport safe */
              s.Outliner
            ),
            /* harmony export */
            PDFDataRangeTransport: () => (
              /* reexport safe */
              $.PDFDataRangeTransport
            ),
            /* harmony export */
            PDFDateString: () => (
              /* reexport safe */
              L.PDFDateString
            ),
            /* harmony export */
            PDFWorker: () => (
              /* reexport safe */
              $.PDFWorker
            ),
            /* harmony export */
            PasswordResponses: () => (
              /* reexport safe */
              N.PasswordResponses
            ),
            /* harmony export */
            PermissionFlag: () => (
              /* reexport safe */
              N.PermissionFlag
            ),
            /* harmony export */
            PixelsPerInch: () => (
              /* reexport safe */
              L.PixelsPerInch
            ),
            /* harmony export */
            RenderingCancelledException: () => (
              /* reexport safe */
              L.RenderingCancelledException
            ),
            /* harmony export */
            UnexpectedResponseException: () => (
              /* reexport safe */
              N.UnexpectedResponseException
            ),
            /* harmony export */
            Util: () => (
              /* reexport safe */
              N.Util
            ),
            /* harmony export */
            VerbosityLevel: () => (
              /* reexport safe */
              N.VerbosityLevel
            ),
            /* harmony export */
            XfaLayer: () => (
              /* reexport safe */
              g.XfaLayer
            ),
            /* harmony export */
            build: () => (
              /* reexport safe */
              $.build
            ),
            /* harmony export */
            createValidAbsoluteUrl: () => (
              /* reexport safe */
              N.createValidAbsoluteUrl
            ),
            /* harmony export */
            fetchData: () => (
              /* reexport safe */
              L.fetchData
            ),
            /* harmony export */
            getDocument: () => (
              /* reexport safe */
              $.getDocument
            ),
            /* harmony export */
            getFilenameFromUrl: () => (
              /* reexport safe */
              L.getFilenameFromUrl
            ),
            /* harmony export */
            getPdfFilenameFromUrl: () => (
              /* reexport safe */
              L.getPdfFilenameFromUrl
            ),
            /* harmony export */
            getXfaPageViewport: () => (
              /* reexport safe */
              L.getXfaPageViewport
            ),
            /* harmony export */
            isDataScheme: () => (
              /* reexport safe */
              L.isDataScheme
            ),
            /* harmony export */
            isPdfFile: () => (
              /* reexport safe */
              L.isPdfFile
            ),
            /* harmony export */
            noContextMenu: () => (
              /* reexport safe */
              L.noContextMenu
            ),
            /* harmony export */
            normalizeUnicode: () => (
              /* reexport safe */
              N.normalizeUnicode
            ),
            /* harmony export */
            renderTextLayer: () => (
              /* reexport safe */
              C.renderTextLayer
            ),
            /* harmony export */
            setLayerDimensions: () => (
              /* reexport safe */
              L.setLayerDimensions
            ),
            /* harmony export */
            shadow: () => (
              /* reexport safe */
              N.shadow
            ),
            /* harmony export */
            updateTextLayer: () => (
              /* reexport safe */
              C.updateTextLayer
            ),
            /* harmony export */
            version: () => (
              /* reexport safe */
              $.version
            )
            /* harmony export */
          });
          var N = U(292), $ = U(831), L = U(419), C = U(814), x = U(731), v = U(830), r = U(976), c = U(259), l = U(47), b = U(164), s = U(61), g = U(284), t = w([$]);
          $ = (t.then ? (await t)() : t)[0];
          const i = "4.2.67", u = "49b388101";
          z();
        } catch (i) {
          z(i);
        }
      });
    }
  ),
  /***/
  178: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        MessageHandler: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var w = U(292);
      const z = {
        DATA: 1,
        ERROR: 2
      }, N = {
        CANCEL: 1,
        CANCEL_COMPLETE: 2,
        CLOSE: 3,
        ENQUEUE: 4,
        ERROR: 5,
        PULL: 6,
        PULL_COMPLETE: 7,
        START_COMPLETE: 8
      };
      function $(C) {
        switch (C instanceof Error || typeof C == "object" && C !== null || (0, w.unreachable)('wrapReason: Expected "reason" to be a (possibly cloned) Error.'), C.name) {
          case "AbortException":
            return new w.AbortException(C.message);
          case "MissingPDFException":
            return new w.MissingPDFException(C.message);
          case "PasswordException":
            return new w.PasswordException(C.message, C.code);
          case "UnexpectedResponseException":
            return new w.UnexpectedResponseException(C.message, C.status);
          case "UnknownErrorException":
            return new w.UnknownErrorException(C.message, C.details);
          default:
            return new w.UnknownErrorException(C.message, C.toString());
        }
      }
      class L {
        constructor(x, v, r) {
          this.sourceName = x, this.targetName = v, this.comObj = r, this.callbackId = 1, this.streamId = 1, this.streamSinks = /* @__PURE__ */ Object.create(null), this.streamControllers = /* @__PURE__ */ Object.create(null), this.callbackCapabilities = /* @__PURE__ */ Object.create(null), this.actionHandler = /* @__PURE__ */ Object.create(null), this._onComObjOnMessage = (c) => {
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
              if (delete this.callbackCapabilities[s], l.callback === z.DATA)
                g.resolve(l.data);
              else if (l.callback === z.ERROR)
                g.reject($(l.reason));
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
                  callback: z.DATA,
                  callbackId: l.callbackId,
                  data: t
                });
              }, function(t) {
                r.postMessage({
                  sourceName: s,
                  targetName: g,
                  callback: z.ERROR,
                  callbackId: l.callbackId,
                  reason: $(t)
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
        on(x, v) {
          const r = this.actionHandler;
          if (r[x])
            throw new Error(`There is already an actionName called "${x}"`);
          r[x] = v;
        }
        send(x, v, r) {
          this.comObj.postMessage({
            sourceName: this.sourceName,
            targetName: this.targetName,
            action: x,
            data: v
          }, r);
        }
        sendWithPromise(x, v, r) {
          const c = this.callbackId++, l = Promise.withResolvers();
          this.callbackCapabilities[c] = l;
          try {
            this.comObj.postMessage({
              sourceName: this.sourceName,
              targetName: this.targetName,
              action: x,
              callbackId: c,
              data: v
            }, r);
          } catch (b) {
            l.reject(b);
          }
          return l.promise;
        }
        sendWithStream(x, v, r, c) {
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
                action: x,
                streamId: l,
                data: v,
                desiredSize: t.desiredSize
              }, c), i.promise;
            },
            pull: (t) => {
              const i = Promise.withResolvers();
              return this.streamControllers[l].pullCall = i, g.postMessage({
                sourceName: b,
                targetName: s,
                stream: N.PULL,
                streamId: l,
                desiredSize: t.desiredSize
              }), i.promise;
            },
            cancel: (t) => {
              (0, w.assert)(t instanceof Error, "cancel must have a valid reason");
              const i = Promise.withResolvers();
              return this.streamControllers[l].cancelCall = i, this.streamControllers[l].isClosed = !0, g.postMessage({
                sourceName: b,
                targetName: s,
                stream: N.CANCEL,
                streamId: l,
                reason: $(t)
              }), i.promise;
            }
          }, r);
        }
        #t(x) {
          const v = x.streamId, r = this.sourceName, c = x.sourceName, l = this.comObj, b = this, s = this.actionHandler[x.action], g = {
            enqueue(t, i = 1, u) {
              if (this.isCancelled)
                return;
              const p = this.desiredSize;
              this.desiredSize -= i, p > 0 && this.desiredSize <= 0 && (this.sinkCapability = Promise.withResolvers(), this.ready = this.sinkCapability.promise), l.postMessage({
                sourceName: r,
                targetName: c,
                stream: N.ENQUEUE,
                streamId: v,
                chunk: t
              }, u);
            },
            close() {
              this.isCancelled || (this.isCancelled = !0, l.postMessage({
                sourceName: r,
                targetName: c,
                stream: N.CLOSE,
                streamId: v
              }), delete b.streamSinks[v]);
            },
            error(t) {
              (0, w.assert)(t instanceof Error, "error must have a valid reason"), !this.isCancelled && (this.isCancelled = !0, l.postMessage({
                sourceName: r,
                targetName: c,
                stream: N.ERROR,
                streamId: v,
                reason: $(t)
              }));
            },
            sinkCapability: Promise.withResolvers(),
            onPull: null,
            onCancel: null,
            isCancelled: !1,
            desiredSize: x.desiredSize,
            ready: null
          };
          g.sinkCapability.resolve(), g.ready = g.sinkCapability.promise, this.streamSinks[v] = g, new Promise(function(t) {
            t(s(x.data, g));
          }).then(function() {
            l.postMessage({
              sourceName: r,
              targetName: c,
              stream: N.START_COMPLETE,
              streamId: v,
              success: !0
            });
          }, function(t) {
            l.postMessage({
              sourceName: r,
              targetName: c,
              stream: N.START_COMPLETE,
              streamId: v,
              reason: $(t)
            });
          });
        }
        #e(x) {
          const v = x.streamId, r = this.sourceName, c = x.sourceName, l = this.comObj, b = this.streamControllers[v], s = this.streamSinks[v];
          switch (x.stream) {
            case N.START_COMPLETE:
              x.success ? b.startCall.resolve() : b.startCall.reject($(x.reason));
              break;
            case N.PULL_COMPLETE:
              x.success ? b.pullCall.resolve() : b.pullCall.reject($(x.reason));
              break;
            case N.PULL:
              if (!s) {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: N.PULL_COMPLETE,
                  streamId: v,
                  success: !0
                });
                break;
              }
              s.desiredSize <= 0 && x.desiredSize > 0 && s.sinkCapability.resolve(), s.desiredSize = x.desiredSize, new Promise(function(g) {
                g(s.onPull?.());
              }).then(function() {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: N.PULL_COMPLETE,
                  streamId: v,
                  success: !0
                });
              }, function(g) {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: N.PULL_COMPLETE,
                  streamId: v,
                  reason: $(g)
                });
              });
              break;
            case N.ENQUEUE:
              if ((0, w.assert)(b, "enqueue should have stream controller"), b.isClosed)
                break;
              b.controller.enqueue(x.chunk);
              break;
            case N.CLOSE:
              if ((0, w.assert)(b, "close should have stream controller"), b.isClosed)
                break;
              b.isClosed = !0, b.controller.close(), this.#s(b, v);
              break;
            case N.ERROR:
              (0, w.assert)(b, "error should have stream controller"), b.controller.error($(x.reason)), this.#s(b, v);
              break;
            case N.CANCEL_COMPLETE:
              x.success ? b.cancelCall.resolve() : b.cancelCall.reject($(x.reason)), this.#s(b, v);
              break;
            case N.CANCEL:
              if (!s)
                break;
              new Promise(function(g) {
                g(s.onCancel?.($(x.reason)));
              }).then(function() {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: N.CANCEL_COMPLETE,
                  streamId: v,
                  success: !0
                });
              }, function(g) {
                l.postMessage({
                  sourceName: r,
                  targetName: c,
                  stream: N.CANCEL_COMPLETE,
                  streamId: v,
                  reason: $(g)
                });
              }), s.sinkCapability.reject($(x.reason)), s.isCancelled = !0, delete this.streamSinks[v];
              break;
            default:
              throw new Error("Unexpected stream case");
          }
        }
        async #s(x, v) {
          await Promise.allSettled([x.startCall?.promise, x.pullCall?.promise, x.cancelCall?.promise]), delete this.streamControllers[v];
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
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        MurmurHash3_64: () => (
          /* binding */
          $
        )
        /* harmony export */
      });
      const w = 3285377520, z = 4294901760, N = 65535;
      class $ {
        constructor(C) {
          this.h1 = C ? C & 4294967295 : w, this.h2 = C ? C & 4294967295 : w;
        }
        update(C) {
          let x, v;
          if (typeof C == "string") {
            x = new Uint8Array(C.length * 2), v = 0;
            for (let S = 0, P = C.length; S < P; S++) {
              const M = C.charCodeAt(S);
              M <= 255 ? x[v++] = M : (x[v++] = M >>> 8, x[v++] = M & 255);
            }
          } else if (ArrayBuffer.isView(C))
            x = C.slice(), v = x.byteLength;
          else
            throw new Error("Invalid data format, must be a string or TypedArray.");
          const r = v >> 2, c = v - r * 4, l = new Uint32Array(x.buffer, 0, r);
          let b = 0, s = 0, g = this.h1, t = this.h2;
          const i = 3432918353, u = 461845907, p = i & N, y = u & N;
          for (let S = 0; S < r; S++)
            S & 1 ? (b = l[S], b = b * i & z | b * p & N, b = b << 15 | b >>> 17, b = b * u & z | b * y & N, g ^= b, g = g << 13 | g >>> 19, g = g * 5 + 3864292196) : (s = l[S], s = s * i & z | s * p & N, s = s << 15 | s >>> 17, s = s * u & z | s * y & N, t ^= s, t = t << 13 | t >>> 19, t = t * 5 + 3864292196);
          switch (b = 0, c) {
            case 3:
              b ^= x[r * 4 + 2] << 16;
            case 2:
              b ^= x[r * 4 + 1] << 8;
            case 1:
              b ^= x[r * 4], b = b * i & z | b * p & N, b = b << 15 | b >>> 17, b = b * u & z | b * y & N, r & 1 ? g ^= b : t ^= b;
          }
          this.h1 = g, this.h2 = t;
        }
        hexdigest() {
          let C = this.h1, x = this.h2;
          return C ^= x >>> 1, C = C * 3981806797 & z | C * 36045 & N, x = x * 4283543511 & z | ((x << 16 | C >>> 16) * 2950163797 & z) >>> 16, C ^= x >>> 1, C = C * 444984403 & z | C * 60499 & N, x = x * 3301882366 & z | ((x << 16 | C >>> 16) * 3120437893 & z) >>> 16, C ^= x >>> 1, (C >>> 0).toString(16).padStart(8, "0") + (x >>> 0).toString(16).padStart(8, "0");
        }
      }
    }
  ),
  /***/
  292: (
    /***/
    (ct, st, U) => {
      U.d(st, {
        /* harmony export */
        AbortException: () => (
          /* binding */
          dt
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
          v
        ),
        /* harmony export */
        AnnotationEditorType: () => (
          /* binding */
          r
        ),
        /* harmony export */
        AnnotationMode: () => (
          /* binding */
          x
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
          G
        ),
        /* harmony export */
        CMapCompressionType: () => (
          /* binding */
          u
        ),
        /* harmony export */
        FONT_IDENTITY_MATRIX: () => (
          /* binding */
          N
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
          pt
        ),
        /* harmony export */
        IDENTITY_MATRIX: () => (
          /* binding */
          z
        ),
        /* harmony export */
        ImageKind: () => (
          /* binding */
          s
        ),
        /* harmony export */
        InvalidPDFException: () => (
          /* binding */
          Z
        ),
        /* harmony export */
        LINE_FACTOR: () => (
          /* binding */
          L
        ),
        /* harmony export */
        MAX_IMAGE_SIZE_TO_CACHE: () => (
          /* binding */
          $
        ),
        /* harmony export */
        MissingPDFException: () => (
          /* binding */
          at
        ),
        /* harmony export */
        OPS: () => (
          /* binding */
          p
        ),
        /* harmony export */
        PasswordException: () => (
          /* binding */
          Y
        ),
        /* harmony export */
        PasswordResponses: () => (
          /* binding */
          y
        ),
        /* harmony export */
        PermissionFlag: () => (
          /* binding */
          l
        ),
        /* harmony export */
        RenderingIntentFlag: () => (
          /* binding */
          C
        ),
        /* harmony export */
        TextRenderingMode: () => (
          /* binding */
          b
        ),
        /* harmony export */
        UnexpectedResponseException: () => (
          /* binding */
          lt
        ),
        /* harmony export */
        UnknownErrorException: () => (
          /* binding */
          tt
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
          q
        ),
        /* harmony export */
        bytesToString: () => (
          /* binding */
          ot
        ),
        /* harmony export */
        createValidAbsoluteUrl: () => (
          /* binding */
          j
        ),
        /* harmony export */
        getUuid: () => (
          /* binding */
          R
        ),
        /* harmony export */
        getVerbosityLevel: () => (
          /* binding */
          M
        ),
        /* harmony export */
        info: () => (
          /* binding */
          O
        ),
        /* harmony export */
        isNodeJS: () => (
          /* binding */
          w
        ),
        /* harmony export */
        normalizeUnicode: () => (
          /* binding */
          E
        ),
        /* harmony export */
        objectFromMap: () => (
          /* binding */
          m
        ),
        /* harmony export */
        setVerbosityLevel: () => (
          /* binding */
          P
        ),
        /* harmony export */
        shadow: () => (
          /* binding */
          _
        ),
        /* harmony export */
        string32: () => (
          /* binding */
          et
        ),
        /* harmony export */
        stringToBytes: () => (
          /* binding */
          ut
        ),
        /* harmony export */
        unreachable: () => (
          /* binding */
          B
        ),
        /* harmony export */
        warn: () => (
          /* binding */
          H
        )
        /* harmony export */
      });
      const w = typeof process == "object" && process + "" == "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser"), z = [1, 0, 0, 1, 0, 0], N = [1e-3, 0, 0, 1e-3, 0, 0], $ = 1e7, L = 1.35, C = {
        ANY: 1,
        DISPLAY: 2,
        PRINT: 4,
        SAVE: 8,
        ANNOTATIONS_FORMS: 16,
        ANNOTATIONS_STORAGE: 32,
        ANNOTATIONS_DISABLE: 64,
        OPLIST: 256
      }, x = {
        DISABLE: 0,
        ENABLE: 1,
        ENABLE_FORMS: 2,
        ENABLE_STORAGE: 3
      }, v = "pdfjs_internal_editor_", r = {
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
      }, y = {
        NEED_PASSWORD: 1,
        INCORRECT_PASSWORD: 2
      };
      let S = i.WARNINGS;
      function P(I) {
        Number.isInteger(I) && (S = I);
      }
      function M() {
        return S;
      }
      function O(I) {
        S >= i.INFOS && console.log(`Info: ${I}`);
      }
      function H(I) {
        S >= i.WARNINGS && console.log(`Warning: ${I}`);
      }
      function B(I) {
        throw new Error(I);
      }
      function q(I, F) {
        I || B(F);
      }
      function nt(I) {
        switch (I?.protocol) {
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
      function j(I, F = null, T = null) {
        if (!I)
          return null;
        try {
          if (T && typeof I == "string" && (T.addDefaultProtocol && I.startsWith("www.") && I.match(/\./g)?.length >= 2 && (I = `http://${I}`), T.tryConvertEncoding))
            try {
              I = a(I);
            } catch {
            }
          const V = F ? new URL(I, F) : new URL(I);
          if (nt(V))
            return V;
        } catch {
        }
        return null;
      }
      function _(I, F, T, V = !1) {
        return Object.defineProperty(I, F, {
          value: T,
          enumerable: !V,
          configurable: !0,
          writable: !1
        }), T;
      }
      const G = function() {
        function F(T, V) {
          this.constructor === F && B("Cannot initialize BaseException."), this.message = T, this.name = V;
        }
        return F.prototype = new Error(), F.constructor = F, F;
      }();
      class Y extends G {
        constructor(F, T) {
          super(F, "PasswordException"), this.code = T;
        }
      }
      class tt extends G {
        constructor(F, T) {
          super(F, "UnknownErrorException"), this.details = T;
        }
      }
      class Z extends G {
        constructor(F) {
          super(F, "InvalidPDFException");
        }
      }
      class at extends G {
        constructor(F) {
          super(F, "MissingPDFException");
        }
      }
      class lt extends G {
        constructor(F, T) {
          super(F, "UnexpectedResponseException"), this.status = T;
        }
      }
      class pt extends G {
        constructor(F) {
          super(F, "FormatError");
        }
      }
      class dt extends G {
        constructor(F) {
          super(F, "AbortException");
        }
      }
      function ot(I) {
        (typeof I != "object" || I?.length === void 0) && B("Invalid argument for bytesToString");
        const F = I.length, T = 8192;
        if (F < T)
          return String.fromCharCode.apply(null, I);
        const V = [];
        for (let K = 0; K < F; K += T) {
          const X = Math.min(K + T, F), W = I.subarray(K, X);
          V.push(String.fromCharCode.apply(null, W));
        }
        return V.join("");
      }
      function ut(I) {
        typeof I != "string" && B("Invalid argument for stringToBytes");
        const F = I.length, T = new Uint8Array(F);
        for (let V = 0; V < F; ++V)
          T[V] = I.charCodeAt(V) & 255;
        return T;
      }
      function et(I) {
        return String.fromCharCode(I >> 24 & 255, I >> 16 & 255, I >> 8 & 255, I & 255);
      }
      function m(I) {
        const F = /* @__PURE__ */ Object.create(null);
        for (const [T, V] of I)
          F[T] = V;
        return F;
      }
      function h() {
        const I = new Uint8Array(4);
        return I[0] = 1, new Uint32Array(I.buffer, 0, 1)[0] === 1;
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
          return _(this, "isLittleEndian", h());
        }
        static get isEvalSupported() {
          return _(this, "isEvalSupported", e());
        }
        static get isOffscreenCanvasSupported() {
          return _(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas < "u");
        }
        static get platform() {
          return typeof navigator < "u" && typeof navigator?.platform == "string" ? _(this, "platform", {
            isMac: navigator.platform.includes("Mac")
          }) : _(this, "platform", {
            isMac: !1
          });
        }
        static get isCSSRoundSupported() {
          return _(this, "isCSSRoundSupported", globalThis.CSS?.supports?.("width: round(1.5px, 1px)"));
        }
      }
      const f = Array.from(Array(256).keys(), (I) => I.toString(16).padStart(2, "0"));
      class o {
        static makeHexColor(F, T, V) {
          return `#${f[F]}${f[T]}${f[V]}`;
        }
        static scaleMinMax(F, T) {
          let V;
          F[0] ? (F[0] < 0 && (V = T[0], T[0] = T[2], T[2] = V), T[0] *= F[0], T[2] *= F[0], F[3] < 0 && (V = T[1], T[1] = T[3], T[3] = V), T[1] *= F[3], T[3] *= F[3]) : (V = T[0], T[0] = T[1], T[1] = V, V = T[2], T[2] = T[3], T[3] = V, F[1] < 0 && (V = T[1], T[1] = T[3], T[3] = V), T[1] *= F[1], T[3] *= F[1], F[2] < 0 && (V = T[0], T[0] = T[2], T[2] = V), T[0] *= F[2], T[2] *= F[2]), T[0] += F[4], T[1] += F[5], T[2] += F[4], T[3] += F[5];
        }
        static transform(F, T) {
          return [F[0] * T[0] + F[2] * T[1], F[1] * T[0] + F[3] * T[1], F[0] * T[2] + F[2] * T[3], F[1] * T[2] + F[3] * T[3], F[0] * T[4] + F[2] * T[5] + F[4], F[1] * T[4] + F[3] * T[5] + F[5]];
        }
        static applyTransform(F, T) {
          const V = F[0] * T[0] + F[1] * T[2] + T[4], K = F[0] * T[1] + F[1] * T[3] + T[5];
          return [V, K];
        }
        static applyInverseTransform(F, T) {
          const V = T[0] * T[3] - T[1] * T[2], K = (F[0] * T[3] - F[1] * T[2] + T[2] * T[5] - T[4] * T[3]) / V, X = (-F[0] * T[1] + F[1] * T[0] + T[4] * T[1] - T[5] * T[0]) / V;
          return [K, X];
        }
        static getAxialAlignedBoundingBox(F, T) {
          const V = this.applyTransform(F, T), K = this.applyTransform(F.slice(2, 4), T), X = this.applyTransform([F[0], F[3]], T), W = this.applyTransform([F[2], F[1]], T);
          return [Math.min(V[0], K[0], X[0], W[0]), Math.min(V[1], K[1], X[1], W[1]), Math.max(V[0], K[0], X[0], W[0]), Math.max(V[1], K[1], X[1], W[1])];
        }
        static inverseTransform(F) {
          const T = F[0] * F[3] - F[1] * F[2];
          return [F[3] / T, -F[1] / T, -F[2] / T, F[0] / T, (F[2] * F[5] - F[4] * F[3]) / T, (F[4] * F[1] - F[5] * F[0]) / T];
        }
        static singularValueDecompose2dScale(F) {
          const T = [F[0], F[2], F[1], F[3]], V = F[0] * T[0] + F[1] * T[2], K = F[0] * T[1] + F[1] * T[3], X = F[2] * T[0] + F[3] * T[2], W = F[2] * T[1] + F[3] * T[3], rt = (V + W) / 2, J = Math.sqrt((V + W) ** 2 - 4 * (V * W - X * K)) / 2, Q = rt + J || 1, it = rt - J || 1;
          return [Math.sqrt(Q), Math.sqrt(it)];
        }
        static normalizeRect(F) {
          const T = F.slice(0);
          return F[0] > F[2] && (T[0] = F[2], T[2] = F[0]), F[1] > F[3] && (T[1] = F[3], T[3] = F[1]), T;
        }
        static intersect(F, T) {
          const V = Math.max(Math.min(F[0], F[2]), Math.min(T[0], T[2])), K = Math.min(Math.max(F[0], F[2]), Math.max(T[0], T[2]));
          if (V > K)
            return null;
          const X = Math.max(Math.min(F[1], F[3]), Math.min(T[1], T[3])), W = Math.min(Math.max(F[1], F[3]), Math.max(T[1], T[3]));
          return X > W ? null : [V, X, K, W];
        }
        static #t(F, T, V, K, X, W, rt, J, Q, it) {
          if (Q <= 0 || Q >= 1)
            return;
          const ht = 1 - Q, gt = Q * Q, bt = gt * Q, At = ht * (ht * (ht * F + 3 * Q * T) + 3 * gt * V) + bt * K, mt = ht * (ht * (ht * X + 3 * Q * W) + 3 * gt * rt) + bt * J;
          it[0] = Math.min(it[0], At), it[1] = Math.min(it[1], mt), it[2] = Math.max(it[2], At), it[3] = Math.max(it[3], mt);
        }
        static #e(F, T, V, K, X, W, rt, J, Q, it, ht, gt) {
          if (Math.abs(Q) < 1e-12) {
            Math.abs(it) >= 1e-12 && this.#t(F, T, V, K, X, W, rt, J, -ht / it, gt);
            return;
          }
          const bt = it ** 2 - 4 * ht * Q;
          if (bt < 0)
            return;
          const At = Math.sqrt(bt), mt = 2 * Q;
          this.#t(F, T, V, K, X, W, rt, J, (-it + At) / mt, gt), this.#t(F, T, V, K, X, W, rt, J, (-it - At) / mt, gt);
        }
        static bezierBoundingBox(F, T, V, K, X, W, rt, J, Q) {
          return Q ? (Q[0] = Math.min(Q[0], F, rt), Q[1] = Math.min(Q[1], T, J), Q[2] = Math.max(Q[2], F, rt), Q[3] = Math.max(Q[3], T, J)) : Q = [Math.min(F, rt), Math.min(T, J), Math.max(F, rt), Math.max(T, J)], this.#e(F, V, X, rt, T, K, W, J, 3 * (-F + 3 * (V - X) + rt), 6 * (F - 2 * V + X), 3 * (V - F), Q), this.#e(F, V, X, rt, T, K, W, J, 3 * (-T + 3 * (K - W) + J), 6 * (T - 2 * K + W), 3 * (K - T), Q), Q;
        }
      }
      function a(I) {
        return decodeURIComponent(escape(I));
      }
      let d = null, A = null;
      function E(I) {
        return d || (d = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu, A = /* @__PURE__ */ new Map([["ﬅ", "ſt"]])), I.replaceAll(d, (F, T, V) => T ? T.normalize("NFKC") : A.get(V));
      }
      function R() {
        if (typeof crypto < "u" && typeof crypto?.randomUUID == "function")
          return crypto.randomUUID();
        const I = new Uint8Array(32);
        if (typeof crypto < "u" && typeof crypto?.getRandomValues == "function")
          crypto.getRandomValues(I);
        else
          for (let F = 0; F < 32; F++)
            I[F] = Math.floor(Math.random() * 255);
        return ot(I);
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
}, Gt = {};
function Ft(ct) {
  var st = Gt[ct];
  if (st !== void 0)
    return st.exports;
  var U = Gt[ct] = {
    /******/
    // no module.id needed
    /******/
    // no module.loaded needed
    /******/
    exports: {}
    /******/
  };
  return Vt[ct](U, U.exports, Ft), U.exports;
}
(() => {
  var ct = typeof Symbol == "function" ? Symbol("webpack queues") : "__webpack_queues__", st = typeof Symbol == "function" ? Symbol("webpack exports") : "__webpack_exports__", U = typeof Symbol == "function" ? Symbol("webpack error") : "__webpack_error__", w = (N) => {
    N && N.d < 1 && (N.d = 1, N.forEach(($) => $.r--), N.forEach(($) => $.r-- ? $.r++ : $()));
  }, z = (N) => N.map(($) => {
    if ($ !== null && typeof $ == "object") {
      if ($[ct]) return $;
      if ($.then) {
        var L = [];
        L.d = 0, $.then((v) => {
          C[st] = v, w(L);
        }, (v) => {
          C[U] = v, w(L);
        });
        var C = {};
        return C[ct] = (v) => v(L), C;
      }
    }
    var x = {};
    return x[ct] = (v) => {
    }, x[st] = $, x;
  });
  Ft.a = (N, $, L) => {
    var C;
    L && ((C = []).d = -1);
    var x = /* @__PURE__ */ new Set(), v = N.exports, r, c, l, b = new Promise((s, g) => {
      l = g, c = s;
    });
    b[st] = v, b[ct] = (s) => (C && s(C), x.forEach(s), b.catch((g) => {
    })), N.exports = b, $((s) => {
      r = z(s);
      var g, t = () => r.map((u) => {
        if (u[U]) throw u[U];
        return u[st];
      }), i = new Promise((u) => {
        g = () => u(t), g.r = 0;
        var p = (y) => y !== C && !x.has(y) && (x.add(y), y && !y.d && (g.r++, y.push(g)));
        r.map((y) => y[ct](p));
      });
      return g.r ? i : t();
    }, (s) => (s ? l(b[U] = s) : c(v), w(C))), C && C.d < 0 && (C.d = 0);
  };
})();
Ft.d = (ct, st) => {
  for (var U in st)
    Ft.o(st, U) && !Ft.o(ct, U) && Object.defineProperty(ct, U, { enumerable: !0, get: st[U] });
};
Ft.o = (ct, st) => Object.prototype.hasOwnProperty.call(ct, st);
var ft = Ft(228);
ft = globalThis.pdfjsLib = await (globalThis.pdfjsLibPromise = ft);
ft.AbortException;
ft.AnnotationEditorLayer;
ft.AnnotationEditorParamsType;
ft.AnnotationEditorType;
ft.AnnotationEditorUIManager;
ft.AnnotationLayer;
ft.AnnotationMode;
ft.CMapCompressionType;
ft.ColorPicker;
ft.DOMSVGFactory;
ft.DrawLayer;
ft.FeatureTest;
var Xt = ft.GlobalWorkerOptions;
ft.ImageKind;
ft.InvalidPDFException;
ft.MissingPDFException;
ft.OPS;
ft.Outliner;
ft.PDFDataRangeTransport;
ft.PDFDateString;
ft.PDFWorker;
ft.PasswordResponses;
ft.PermissionFlag;
ft.PixelsPerInch;
ft.RenderingCancelledException;
ft.UnexpectedResponseException;
ft.Util;
ft.VerbosityLevel;
ft.XfaLayer;
ft.build;
ft.createValidAbsoluteUrl;
ft.fetchData;
var jt = ft.getDocument;
ft.getFilenameFromUrl;
ft.getPdfFilenameFromUrl;
ft.getXfaPageViewport;
ft.isDataScheme;
ft.isPdfFile;
ft.noContextMenu;
ft.normalizeUnicode;
ft.renderTextLayer;
ft.setLayerDimensions;
ft.shadow;
ft.updateTextLayer;
ft.version;
export {
  Xt as _,
  jt as a
};
//# sourceMappingURL=pdf-CwFtZUSJ.js.map
