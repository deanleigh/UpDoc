import type { ExtractionElement, VisualGroup } from './workflow.types.js';

/**
 * Compute the mode (most frequent value) of font sizes across elements.
 * Rounds to 1 decimal to avoid floating-point grouping issues.
 */
function modeFontSize(elements: ExtractionElement[]): number {
	const counts = new Map<number, number>();
	for (const el of elements) {
		const size = Math.round(el.metadata.fontSize * 10) / 10;
		counts.set(size, (counts.get(size) ?? 0) + 1);
	}

	let maxCount = 0;
	let mode = 0;
	for (const [size, count] of counts) {
		if (count > maxCount) {
			maxCount = count;
			mode = size;
		}
	}
	return mode;
}

/**
 * Group elements by heading hierarchy based on font size.
 *
 * Algorithm:
 * 1. Compute mode font size (= body text size)
 * 2. Any element with fontSize > mode is a heading
 * 3. Walk top-to-bottom: headings start new groups, body elements are children
 * 4. Elements before the first heading form an ungrouped section
 * 5. All same font size → one ungrouped group (no visual change)
 */
export function groupElementsByHeading(elements: ExtractionElement[]): VisualGroup[] {
	if (elements.length === 0) return [];

	const bodySize = modeFontSize(elements);
	const allSameSize = elements.every((el) => Math.round(el.metadata.fontSize * 10) / 10 === bodySize);

	if (allSameSize) {
		return [{ heading: null, children: [...elements] }];
	}

	const groups: VisualGroup[] = [];
	let current: VisualGroup = { heading: null, children: [] };

	for (const el of elements) {
		const size = Math.round(el.metadata.fontSize * 10) / 10;
		if (size > bodySize) {
			// This element is a heading — push current group and start new one
			if (current.heading || current.children.length > 0) {
				groups.push(current);
			}
			current = { heading: el, children: [] };
		} else {
			current.children.push(el);
		}
	}

	// Push final group
	if (current.heading || current.children.length > 0) {
		groups.push(current);
	}

	return groups;
}
