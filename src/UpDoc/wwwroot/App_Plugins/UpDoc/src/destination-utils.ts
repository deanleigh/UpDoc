import type { DestinationBlockGrid, DestinationConfig, MappingDestination } from './workflow.types.js';

export interface DestinationTab {
	id: string;
	label: string;
}

/**
 * Returns all block containers (grids + lists) from a destination config.
 * Use this instead of iterating blockGrids and blockLists separately.
 */
export function getAllBlockContainers(destination: DestinationConfig): DestinationBlockGrid[] {
	return [...(destination.blockGrids ?? []), ...(destination.blockLists ?? [])];
}

/**
 * Extracts the tab structure from a destination config.
 * Returns tabs in document order, with additional tabs for block containers.
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

	// Add tabs from block containers (grids default to "Page Content", lists use their tab)
	for (const container of getAllBlockContainers(destination)) {
		const containerTab = container.tab ?? 'Page Content';
		if (!tabNames.has(containerTab)) {
			tabNames.add(containerTab);
			tabs.push({
				id: containerTab.toLowerCase().replace(/\s+/g, '-'),
				label: containerTab,
			});
		}
	}

	return tabs;
}

/**
 * Resolves which destination tab a mapping destination belongs to.
 * Block properties resolve to their container's tab (or "page-content" for grids).
 * Top-level fields resolve to their field's tab (kebab-case ID).
 * Returns null if the destination can't be matched.
 */
export function resolveDestinationTab(
	dest: MappingDestination,
	destination: DestinationConfig,
): string | null {
	if (dest.blockKey) {
		for (const container of getAllBlockContainers(destination)) {
			if (container.blocks.find((b) => b.key === dest.blockKey)) {
				const tab = container.tab ?? 'Page Content';
				return tab.toLowerCase().replace(/\s+/g, '-');
			}
		}
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
 * Searches both block grids and block lists.
 */
export function resolveBlockLabel(
	blockKey: string,
	destination: DestinationConfig,
): string | null {
	for (const container of getAllBlockContainers(destination)) {
		const block = container.blocks.find((b) => b.key === blockKey);
		if (block) return block.label;
	}
	return null;
}
