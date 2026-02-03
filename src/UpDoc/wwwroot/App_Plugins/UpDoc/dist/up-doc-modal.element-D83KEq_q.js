import { html as u, nothing as m, css as S, state as p, customElement as z } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as M } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as N } from "@umbraco-cms/backoffice/modal";
import { UMB_AUTH_CONTEXT as D } from "@umbraco-cms/backoffice/auth";
async function O(e, i, t) {
  const r = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${e}&blueprintId=${i}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      }
    }
  );
  if (!r.ok) {
    const a = await r.json();
    return console.error("Extract sections failed:", a), null;
  }
  return r.json();
}
var k = Object.defineProperty, q = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, l = (e, i, t, r) => {
  for (var a = r > 1 ? void 0 : r ? q(i, t) : i, o = e.length - 1, d; o >= 0; o--)
    (d = e[o]) && (a = (r ? d(i, t, a) : d(a)) || a);
  return r && a && k(i, t, a), a;
}, P = (e, i, t) => i.has(e) || g("Cannot " + t), j = (e, i, t) => i.has(e) ? g("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), s = (e, i, t) => (P(e, i, "access private method"), t), n, _, f, v, b, x, y, E, T, $, C, U, w;
let c = class extends N {
  constructor() {
    super(...arguments), j(this, n), this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null, this._isExtracting = !1, this._extractionError = null;
  }
  firstUpdated() {
    this._documentName = "", this._sourceType = "", this._sourceUrl = "", this._selectedMediaUnique = null, this._extractedSections = {}, this._config = null;
  }
  render() {
    var i;
    const e = s(this, n, w).call(this);
    return u`
			<umb-body-layout headline="Create from Source">
				<uui-box headline="Blueprint">
					<div class="blueprint-display">
						<umb-icon name="icon-blueprint"></umb-icon>
						<span>${(i = this.data) == null ? void 0 : i.blueprintName}</span>
					</div>
				</uui-box>

				<uui-box headline="Document Name">
					<p>Enter a document name or let it be populated from the source. You can edit this later.</p>
					<uui-input
						id="name"
						label="name"
						placeholder="Enter document name"
						.value=${this._documentName}
						@input=${(t) => this._documentName = t.target.value}>
					</uui-input>
				</uui-box>

				<uui-box headline="Source">
					<umb-property-layout label="Source Type" orientation="vertical">
						<div slot="editor">
							<uui-select
								label="Select source type"
								.options=${[
      { name: "Choose a source...", value: "", selected: this._sourceType === "" },
      { name: "PDF Document", value: "pdf", selected: this._sourceType === "pdf" },
      { name: "Web Page", value: "web", selected: this._sourceType === "web" },
      { name: "Word Document", value: "doc", selected: this._sourceType === "doc" }
    ]}
								@change=${s(this, n, _)}>
							</uui-select>
						</div>
					</umb-property-layout>

					${s(this, n, y).call(this)}
				</uui-box>

				${s(this, n, U).call(this)}

				<uui-button
					slot="actions"
					id="close"
					label=${this.localize.term("general_close")}
					@click="${s(this, n, x)}"></uui-button>
				<uui-button
					slot="actions"
					id="save"
					look="primary"
					color="positive"
					label=${this.localize.term("general_create")}
					?disabled=${!e}
					@click="${s(this, n, b)}"></uui-button>
			</umb-body-layout>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
_ = function(e) {
  const t = e.target.value;
  t !== this._sourceType && (this._selectedMediaUnique = null, this._sourceUrl = "", this._extractedSections = {}, this._config = null, this._extractionError = null), this._sourceType = t;
};
f = async function(e) {
  const t = e.target.selection;
  this._selectedMediaUnique = t.length > 0 ? t[0] : null, this._selectedMediaUnique ? await s(this, n, v).call(this, this._selectedMediaUnique) : (this._extractedSections = {}, this._config = null, this._documentName = "", this._extractionError = null);
};
v = async function(e) {
  var i;
  this._isExtracting = !0, this._extractionError = null;
  try {
    const t = (i = this.data) == null ? void 0 : i.blueprintId;
    if (!t) {
      this._extractionError = "No blueprint ID available";
      return;
    }
    const a = await (await this.getContext(D)).getLatestToken(), o = await O(e, t, a);
    if (!o) {
      this._extractionError = "Failed to extract content from source";
      return;
    }
    this._extractedSections = o.sections, this._config = o.config, console.log("=== EXTRACTION COMPLETE ==="), console.log("Extracted sections:");
    for (const [d, h] of Object.entries(o.sections))
      console.log(`  ${d}: ${h ? `${h.length} chars - "${h.substring(0, 80)}..."` : "(empty)"}`);
    console.log("Config loaded:", o.config ? "yes" : "no"), o.config && (console.log("  Document type:", o.config.destination.documentTypeAlias), console.log("  Blueprint:", o.config.destination.blueprintName), console.log("  Mappings:", o.config.map.mappings.map((d) => `${d.source} -> ${d.destinations.map((h) => h.target).join(", ")}`))), console.log("=== END EXTRACTION ==="), o.sections.title && !this._documentName && (this._documentName = o.sections.title);
  } catch (t) {
    this._extractionError = "Failed to connect to extraction service", console.error("Extraction error:", t);
  } finally {
    this._isExtracting = !1;
  }
};
b = function() {
  console.log("=== CREATE BUTTON CLICKED ==="), console.log("Document name:", this._documentName), console.log("Extracted sections being passed:");
  for (const [e, i] of Object.entries(this._extractedSections))
    console.log(`  ${e}: ${i ? `${i.length} chars` : "(empty)"}`);
  console.log("Config being passed:", this._config ? "yes" : "no"), console.log("=== END CREATE DEBUG ==="), this.value = {
    name: this._documentName,
    sourceType: this._sourceType,
    mediaUnique: this._selectedMediaUnique,
    sourceUrl: this._sourceUrl || null,
    extractedSections: this._extractedSections,
    config: this._config
  }, this._submitModal();
};
x = function() {
  this._rejectModal();
};
y = function() {
  switch (this._sourceType) {
    case "pdf":
      return s(this, n, E).call(this);
    case "web":
      return s(this, n, T).call(this);
    case "doc":
      return s(this, n, $).call(this);
    default:
      return m;
  }
};
E = function() {
  return u`
			<umb-property-layout label="PDF File" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${s(this, n, f)}>
					</umb-input-media>
					${s(this, n, C).call(this)}
				</div>
			</umb-property-layout>
		`;
};
T = function() {
  return u`
			<umb-property-layout label="Web Page URL" orientation="vertical">
				<div slot="editor">
					<uui-input
						label="URL"
						placeholder="https://example.com/page"
						.value=${this._sourceUrl}
						@input=${(e) => this._sourceUrl = e.target.value}>
					</uui-input>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Web page extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
};
$ = function() {
  return u`
			<umb-property-layout label="Word Document" orientation="vertical">
				<div slot="editor">
					<umb-input-media
						max="1"
						@change=${(e) => {
    const t = e.target.selection;
    this._selectedMediaUnique = t.length > 0 ? t[0] : null;
  }}>
					</umb-input-media>
					<div class="source-coming-soon">
						<uui-icon name="icon-info"></uui-icon>
						<span>Word document extraction is not yet available.</span>
					</div>
				</div>
			</umb-property-layout>
		`;
};
C = function() {
  return this._isExtracting ? u`<div class="extraction-status extracting">
				<uui-loader-bar></uui-loader-bar>
				<span>Extracting content from source...</span>
			</div>` : this._extractionError ? u`<div class="extraction-status error">
				<uui-icon name="icon-alert"></uui-icon>
				<span>${this._extractionError}</span>
			</div>` : Object.values(this._extractedSections).some((i) => i.length > 0) ? u`<div class="extraction-status success">
				<uui-icon name="icon-check"></uui-icon>
				<span>Content extracted successfully</span>
			</div>` : m;
};
U = function() {
  const e = this._extractedSections;
  return Object.values(e).some((t) => t.length > 0) ? u`
			<uui-box headline="Extracted Content" class="preview-box">
				${Object.entries(e).map(([t, r]) => {
    if (!r) return m;
    const a = r.length > 200 ? `${r.substring(0, 200)}...` : r;
    return u`
						<div class="preview-item">
							<strong>${t}:</strong>
							<div class="preview-value">${a}</div>
						</div>
					`;
  })}
			</uui-box>
		` : m;
};
w = function() {
  if (!this._documentName || this._isExtracting) return !1;
  switch (this._sourceType) {
    case "pdf":
      return !!this._selectedMediaUnique;
    case "web":
    case "doc":
      return !1;
    default:
      return !1;
  }
};
c.styles = [
  M,
  S`
			.blueprint-display {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			uui-input {
				width: 100%;
			}

			uui-box {
				margin-bottom: var(--uui-size-space-4);
			}

			p {
				margin-bottom: var(--uui-size-space-4);
			}

			.extraction-status {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
			}

			.extraction-status.extracting {
				background-color: var(--uui-color-surface-alt);
			}

			.extraction-status.error {
				background-color: var(--uui-color-danger-emphasis);
				color: var(--uui-color-danger-contrast);
			}

			.extraction-status.success {
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
			}

			.preview-box {
				margin-top: var(--uui-size-space-4);
			}

			.preview-item {
				margin-bottom: var(--uui-size-space-2);
			}

			.preview-item:last-child {
				margin-bottom: 0;
			}

			.preview-value {
				margin-top: var(--uui-size-space-1);
				padding: var(--uui-size-space-2);
				background-color: var(--uui-color-surface-alt);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				white-space: pre-wrap;
				max-height: 100px;
				overflow-y: auto;
			}

			uui-select {
				width: 100%;
			}

			.source-coming-soon {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-3);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background-color: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}
		`
];
l([
  p()
], c.prototype, "_documentName", 2);
l([
  p()
], c.prototype, "_sourceType", 2);
l([
  p()
], c.prototype, "_sourceUrl", 2);
l([
  p()
], c.prototype, "_selectedMediaUnique", 2);
l([
  p()
], c.prototype, "_extractedSections", 2);
l([
  p()
], c.prototype, "_config", 2);
l([
  p()
], c.prototype, "_isExtracting", 2);
l([
  p()
], c.prototype, "_extractionError", 2);
c = l([
  z("up-doc-modal")
], c);
const F = c;
export {
  c as UpDocModalElement,
  F as default
};
//# sourceMappingURL=up-doc-modal.element-D83KEq_q.js.map
