import type { DestinationConfig, MappingDestination } from './workflow.types.js';

export interface DestinationTab {
	id: string;
	label: string;
}

/**
 * Extracts the tab structure from a destination config.
 * Returns tabs in document order, with "Page Content" appended if blockGrids exist.
 */
export function getDestinationTabs(destination: DestinationConfig): DestinationTab[] {
	const tabs: DestinationTab[] = [];
	const tabNames = new Set(destination.fields.map((f) => f.tab).filter(Boolean));

	for (const tabName of tabNames) {
		tabs.push({
			id: tabName!.toLowerCase().replace(/\s+/g, '-'),
			label: tabName!,
		});
	}

	if (destination.blockGrids?.length) {
		if (!tabNames.has('Page Content')) {
			tabs.push({ id: 'page-content', label: 'Page Content' });
		}
	}

	return tabs;
}

/**
 * Resolves which destination tab a mapping destination belongs to.
 * Block properties always resolve to 'page-content'.
 * Top-level fields resolve to their field's tab (kebab-case ID).
 * Returns null if the destination can't be matched.
 */
export function resolveDestinationTab(
	dest: MappingDestination,
	destination: DestinationConfig,
): string | null {
	if (dest.blockKey) {
		return 'page-content';
	}

	const field = destination.fields.find((f) => f.alias === dest.target);
	if (field?.tab) {
		return field.tab.toLowerCase().replace(/\s+/g, '-');
	}

	return null;
}

/**
 * Finds the block's display label given its key.
 * Used for sub-grouping block properties within the Page Content tab.
 */
export function resolveBlockLabel(
	blockKey: string,
	destination: DestinationConfig,
): string | null {
	for (const grid of destination.blockGrids ?? []) {
		const block = grid.blocks.find((b) => b.key === blockKey);
		if (block) return block.label;
	}
	return null;
}
