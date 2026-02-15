import { html, customElement, css, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import * as pdfjsLib from 'pdfjs-dist';
import type { RenderTask } from 'pdfjs-dist';

// Configure PDF.js worker (same path as zone editor)
pdfjsLib.GlobalWorkerOptions.workerSrc = '/App_Plugins/UpDoc/dist/pdf.worker.min.mjs';

// Simple in-memory cache: mediaKey → PDFDocumentProxy
const pdfCache = new Map<string, pdfjsLib.PDFDocumentProxy>();

/**
 * Renders a single PDF page as an image thumbnail using PDF.js.
 * Renders to an offscreen canvas, then converts to a data URL so the
 * result is a standard <img> that works anywhere (uui-card-media, etc.).
 *
 * Usage:
 *   <up-doc-pdf-thumbnail mediaKey="guid" page="1" width="300" token="bearer-token"></up-doc-pdf-thumbnail>
 */
@customElement('up-doc-pdf-thumbnail')
export class UpDocPdfThumbnailElement extends UmbLitElement {
	/** Umbraco media item GUID */
	@property({ type: String }) mediaKey = '';

	/** Page number to render (1-based) */
	@property({ type: Number }) page = 1;

	/** Thumbnail width in pixels */
	@property({ type: Number }) width = 300;

	/** Auth token for fetching the PDF */
	@property({ type: String }) token = '';

	@state() private _loading = true;
	@state() private _error = '';
	@state() private _imageUrl = '';

	private _currentRenderTask: RenderTask | null = null;
	private _rendering = false;

	override updated(changedProperties: Map<string, unknown>) {
		super.updated(changedProperties);

		// Only re-render when key inputs change, not on internal state changes
		if (
			changedProperties.has('mediaKey') ||
			changedProperties.has('page') ||
			changedProperties.has('token')
		) {
			this.#renderPage();
		}
	}

	async #renderPage() {
		if (!this.mediaKey || !this.token) return;

		// Cancel any in-progress render
		if (this._currentRenderTask) {
			this._currentRenderTask.cancel();
			this._currentRenderTask = null;
		}

		// Guard against concurrent calls
		if (this._rendering) return;
		this._rendering = true;

		this._loading = true;
		this._error = '';

		try {
			const pdfDoc = await this.#loadPdf();
			if (!pdfDoc) {
				this._rendering = false;
				return;
			}

			if (this.page < 1 || this.page > pdfDoc.numPages) {
				this._error = `Page ${this.page} out of range (1-${pdfDoc.numPages})`;
				this._loading = false;
				this._rendering = false;
				return;
			}

			const pdfPage = await pdfDoc.getPage(this.page);
			const unscaledViewport = pdfPage.getViewport({ scale: 1 });
			const scale = this.width / unscaledViewport.width;
			const viewport = pdfPage.getViewport({ scale });

			// Render to an offscreen canvas
			const offscreen = document.createElement('canvas');
			offscreen.width = viewport.width;
			offscreen.height = viewport.height;

			const ctx = offscreen.getContext('2d');
			if (!ctx) {
				this._rendering = false;
				return;
			}

			this._currentRenderTask = pdfPage.render({ canvasContext: ctx, viewport });
			await this._currentRenderTask.promise;
			this._currentRenderTask = null;

			// Convert to data URL — now it's just a regular image
			this._imageUrl = offscreen.toDataURL('image/png');
		} catch (err: unknown) {
			// Ignore cancellation errors
			if (err instanceof Error && err.message?.includes('cancelled')) {
				// Render was cancelled — a new render will follow
			} else {
				this._error = 'Failed to render PDF page';
				console.error('PDF thumbnail render error:', err);
			}
		} finally {
			this._loading = false;
			this._rendering = false;
		}
	}

	async #loadPdf(): Promise<pdfjsLib.PDFDocumentProxy | null> {
		// Check cache first
		const cached = pdfCache.get(this.mediaKey);
		if (cached) return cached;

		try {
			const response = await fetch(
				`/umbraco/management/api/v1/updoc/workflows/media-pdf?mediaKey=${this.mediaKey}`,
				{
					headers: { Authorization: `Bearer ${this.token}` },
				}
			);

			if (!response.ok) {
				this._error = 'Could not load PDF';
				return null;
			}

			const arrayBuffer = await response.arrayBuffer();
			const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
			const pdfDoc = await loadingTask.promise;

			pdfCache.set(this.mediaKey, pdfDoc);
			return pdfDoc;
		} catch {
			this._error = 'Could not load PDF';
			return null;
		}
	}

	override render() {
		if (this._error) {
			return html`<div class="error"><umb-icon name="icon-alert"></umb-icon> ${this._error}</div>`;
		}

		if (this._loading) {
			return html`<uui-loader-bar></uui-loader-bar>`;
		}

		return html`<img src=${this._imageUrl} alt="PDF page ${this.page}" />`;
	}

	static override styles = [
		css`
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
		`,
	];
}

export default UpDocPdfThumbnailElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-pdf-thumbnail': UpDocPdfThumbnailElement;
	}
}
