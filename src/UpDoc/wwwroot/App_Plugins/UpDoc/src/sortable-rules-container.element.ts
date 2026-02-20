import { UmbSorterController } from '@umbraco-cms/backoffice/sorter';
import { html, css, nothing, repeat } from '@umbraco-cms/backoffice/external/lit';
import { customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { ruleCardStyles } from './rule-card-styles.js';

/**
 * Minimal interface for sortable rules — must have _id for unique identification.
 */
export interface SortableRule {
	_id: string;
	[key: string]: unknown;
}

/**
 * Event detail emitted on sort-change.
 */
export interface SortChangeDetail {
	rules: SortableRule[];
}

/**
 * Lightweight container for sortable rules. One instance per group (+ one for ungrouped).
 * All instances share the same `identifier` so rules can be dragged between groups.
 *
 * Uses shadow DOM (required by UmbSorterController) with shared ruleCardStyles
 * so rendered rule cards are styled correctly.
 *
 * Uses `handleSelector` to restrict drag initiation to the grip element.
 * Uses `disabledItemSelector` to prevent expanded rules from being dragged.
 */
@customElement('updoc-sortable-rules')
export class UpdocSortableRulesElement extends UmbLitElement {
	#sorter = new UmbSorterController<SortableRule, HTMLElement>(this, {
		getUniqueOfElement: (el) => el.dataset.sortId ?? '',
		getUniqueOfModel: (rule) => rule._id,
		identifier: 'updoc-rules-sorter',
		itemSelector: '.sortable-rule',
		containerSelector: '.rules-container',
		handleSelector: '.rule-grip',
		disabledItemSelector: '[data-expanded]',
		placeholderAttr: 'drag-placeholder',
		onChange: ({ model }) => {
			this._rules = model;
			this.dispatchEvent(new CustomEvent<SortChangeDetail>('sort-change', {
				detail: { rules: model },
				bubbles: true,
				composed: true,
			}));
		},
	});

	@property({ attribute: false })
	set rules(val: SortableRule[]) {
		this._rules = val;
		this.#sorter.setModel(val);
	}
	get rules(): SortableRule[] { return this._rules; }
	@state() private _rules: SortableRule[] = [];

	/** Set of rule _ids that are currently expanded (and thus not draggable). */
	@property({ attribute: false })
	expandedIds: Set<string> = new Set();

	/** Render callback provided by the parent modal. */
	@property({ attribute: false })
	renderItem?: (rule: SortableRule) => unknown;

	override render() {
		if (this._rules.length === 0 && !this.renderItem) {
			return nothing;
		}

		return html`
			<div class="rules-container">
				${repeat(
					this._rules,
					(rule) => rule._id,
					(rule) => html`
						<div class="sortable-rule"
							data-sort-id=${rule._id}
							?data-expanded=${this.expandedIds.has(rule._id)}>
							${this.renderItem?.(rule) ?? html`<span>${rule._id}</span>`}
						</div>
					`,
				)}
			</div>
		`;
	}

	static override styles = [
		ruleCardStyles,
		css`
			:host {
				display: block;
			}

			.rules-container {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3, 12px);
				min-height: 8px;
			}

			.sortable-rule[drag-placeholder] {
				opacity: 0.2;
			}
		`,
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'updoc-sortable-rules': UpdocSortableRulesElement;
	}
}
