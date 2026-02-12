import { marked } from 'marked';

/**
 * Converts Markdown to HTML using the marked library.
 */
export function markdownToHtml(markdown: string): string {
	if (!markdown) return '';

	try {
		const html = marked.parse(markdown, {
			gfm: true,
			breaks: false,
		});

		if (typeof html === 'string') {
			return html;
		}

		// Fallback for async (shouldn't happen with sync config)
		console.warn('marked returned Promise, using fallback');
		return `<p>${markdown}</p>`;
	} catch (error) {
		console.error('Markdown conversion failed:', error);
		return `<p>${markdown.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
	}
}

/**
 * Normalizes text to kebab-case for use as a section ID.
 * Mirrors the C# NormalizeToKebabCase in ContentTransformService.
 * "FEATURES" → "features", "WHAT WE WILL SEE" → "what-we-will-see"
 */
export function normalizeToKebabCase(text: string): string {
	return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Builds an Umbraco RTE (Rich Text Editor) value object from HTML markup.
 */
export function buildRteValue(htmlContent: string) {
	return {
		blocks: {
			contentData: [],
			settingsData: [],
			expose: [],
			Layout: {},
		},
		markup: htmlContent,
	};
}
