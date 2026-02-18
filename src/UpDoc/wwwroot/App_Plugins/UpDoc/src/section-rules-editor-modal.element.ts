import type { SectionRulesEditorModalData, SectionRulesEditorModalValue } from './section-rules-editor-modal.token.js';
import type { SectionRule, RuleCondition, RuleConditionType, RuleAction, AreaElement } from './workflow.types.js';
import { html, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';

/** Friendly labels for condition types */
const CONDITION_LABELS: Record<RuleConditionType, string> = {
	textBeginsWith: 'Text begins with',
	textEndsWith: 'Text ends with',
	textContains: 'Text contains',
	textEquals: 'Text equals',
	textMatchesPattern: 'Text matches pattern',
	fontSizeEquals: 'Font size equals',
	fontSizeAbove: 'Font size above',
	fontSizeBelow: 'Font size below',
	fontNameContains: 'Font name contains',
	fontNameEquals: 'Font name equals',
	colorEquals: 'Color equals',
	positionFirst: 'Position: first',
	positionLast: 'Position: last',
};

/** Condition types that don't need a value input */
const VALUELESS_CONDITIONS: RuleConditionType[] = ['positionFirst', 'positionLast'];

/** All available condition types */
const ALL_CONDITION_TYPES: RuleConditionType[] = [
	'textBeginsWith', 'textEndsWith', 'textContains', 'textEquals', 'textMatchesPattern',
	'fontSizeEquals', 'fontSizeAbove', 'fontSizeBelow',
	'fontNameContains', 'fontNameEquals', 'colorEquals',
	'positionFirst', 'positionLast',
];

/** Friendly labels for rule actions */
const ACTION_LABELS: Record<RuleAction, string> = {
	createSection: 'Create section',
	setAsHeading: 'Set as heading',
	addAsContent: 'Add as content',
	addAsList: 'Add as list item',
	exclude: 'Exclude',
};

/** All available rule actions */
const ALL_ACTIONS: RuleAction[] = ['createSection', 'setAsHeading', 'addAsContent', 'addAsList', 'exclude'];

@customElement('up-doc-section-rules-editor-modal')
export class UpDocSectionRulesEditorModalElement extends UmbModalBaseElement<SectionRulesEditorModalData, SectionRulesEditorModalValue> {
	@state() private _rules: SectionRule[] = [];

	override firstUpdated() {
		// Deep clone existing rules so edits don't mutate the original
		if (this.data?.existingRules?.rules?.length) {
			this._rules = JSON.parse(JSON.stringify(this.data.existingRules.rules));
		}
	}

	get #elements(): AreaElement[] {
		return this.data?.elements ?? [];
	}

	get #sectionHeading(): string {
		return this.data?.sectionHeading ?? 'Section';
	}

	// ===== Rule evaluation (first-match-wins) =====

	/** Evaluate all rules against elements. Returns a map of elementId -> ruleIndex */
	#evaluateRules(): Map<string, number> {
		const claimed = new Map<string, number>();
		const elements = this.#elements;

		for (let ruleIdx = 0; ruleIdx < this._rules.length; ruleIdx++) {
			const rule = this._rules[ruleIdx];
			if (rule.conditions.length === 0) continue;

			for (let elIdx = 0; elIdx < elements.length; elIdx++) {
				const el = elements[elIdx];
				if (claimed.has(el.id)) continue; // already claimed by an earlier rule

				if (this.#elementMatchesAllConditions(el, rule.conditions, elIdx, elements.length)) {
					claimed.set(el.id, ruleIdx);
					// No break — a rule can match multiple elements (e.g. repeating section headings)
				}
			}
		}
		return claimed;
	}

	#elementMatchesAllConditions(el: AreaElement, conditions: RuleCondition[], index: number, total: number): boolean {
		return conditions.every((c) => this.#elementMatchesCondition(el, c, index, total));
	}

	#elementMatchesCondition(el: AreaElement, condition: RuleCondition, index: number, total: number): boolean {
		const val = String(condition.value ?? '');
		const numVal = Number(condition.value);

		switch (condition.type) {
			case 'textBeginsWith':
				return el.text.toLowerCase().startsWith(val.toLowerCase());
			case 'textEndsWith':
				return el.text.toLowerCase().endsWith(val.toLowerCase());
			case 'textContains':
				return el.text.toLowerCase().includes(val.toLowerCase());
			case 'textMatchesPattern':
				try { return new RegExp(val, 'i').test(el.text); } catch { return false; }
			case 'fontSizeEquals':
				return !isNaN(numVal) && Math.abs(el.fontSize - numVal) < 0.5;
			case 'fontSizeAbove':
				return !isNaN(numVal) && el.fontSize > numVal;
			case 'fontSizeBelow':
				return !isNaN(numVal) && el.fontSize < numVal;
			case 'fontNameContains':
				return el.fontName.toLowerCase().includes(val.toLowerCase());
			case 'colorEquals':
				return el.color.toLowerCase() === val.toLowerCase();
			case 'positionFirst':
				return index === 0;
			case 'positionLast':
				return index === total - 1;
			default:
				return false;
		}
	}

	// ===== Auto-populate conditions from an element =====

	#autoPopulateConditions(el: AreaElement, elIndex: number, total: number): RuleCondition[] {
		const conditions: RuleCondition[] = [];

		// Font size
		conditions.push({ type: 'fontSizeEquals', value: el.fontSize });

		// Font name
		if (el.fontName) {
			conditions.push({ type: 'fontNameContains', value: el.fontName });
		}

		// Color (skip black/very dark as it's the default)
		if (el.color && el.color.toLowerCase() !== '#000000' && el.color.toLowerCase() !== '#000') {
			conditions.push({ type: 'colorEquals', value: el.color });
		}

		// Text prefix — if text contains a colon, use "begins with" up to the colon
		const colonIdx = el.text.indexOf(':');
		if (colonIdx > 0 && colonIdx < 30) {
			conditions.push({ type: 'textBeginsWith', value: el.text.substring(0, colonIdx + 1) });
		}

		// Position
		if (elIndex === 0) {
			conditions.push({ type: 'positionFirst' });
		} else if (elIndex === total - 1) {
			conditions.push({ type: 'positionLast' });
		}

		return conditions;
	}

	// ===== Rule CRUD =====

	#addRule() {
		this._rules = [...this._rules, { role: '', action: 'createSection' as RuleAction, conditions: [] }];
	}

	#removeRule(ruleIdx: number) {
		this._rules = this._rules.filter((_, i) => i !== ruleIdx);
	}

	#createRuleFromElement(el: AreaElement, elIndex: number) {
		const conditions = this.#autoPopulateConditions(el, elIndex, this.#elements.length);
		// Derive a role name suggestion from text (kebab-case first few words)
		const roleSuggestion = el.text
			.split(/[\s:,]+/)
			.slice(0, 3)
			.join('-')
			.toLowerCase()
			.replace(/[^a-z0-9-]/g, '');
		this._rules = [...this._rules, { role: roleSuggestion, action: 'createSection' as RuleAction, conditions }];
	}

	#updateRoleName(ruleIdx: number, value: string) {
		const updated = [...this._rules];
		updated[ruleIdx] = { ...updated[ruleIdx], role: value };
		this._rules = updated;
	}

	#updateAction(ruleIdx: number, value: RuleAction) {
		const updated = [...this._rules];
		updated[ruleIdx] = { ...updated[ruleIdx], action: value };
		this._rules = updated;
	}

	#addCondition(ruleIdx: number) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.conditions = [...rule.conditions, { type: 'textBeginsWith', value: '' }];
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#removeCondition(ruleIdx: number, condIdx: number) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.conditions = rule.conditions.filter((_, i) => i !== condIdx);
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#updateConditionType(ruleIdx: number, condIdx: number, type: RuleConditionType) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.conditions = [...rule.conditions];
		rule.conditions[condIdx] = {
			type,
			value: VALUELESS_CONDITIONS.includes(type) ? undefined : rule.conditions[condIdx].value,
		};
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#updateConditionValue(ruleIdx: number, condIdx: number, value: string) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.conditions = [...rule.conditions];
		const cond = rule.conditions[condIdx];
		// Store as number for font size conditions
		const isNumeric = cond.type === 'fontSizeEquals' || cond.type === 'fontSizeAbove' || cond.type === 'fontSizeBelow';
		rule.conditions[condIdx] = { ...cond, value: isNumeric && !isNaN(Number(value)) ? Number(value) : value };
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	// ===== Submit =====

	#onSubmit() {
		this.value = { rules: { rules: this._rules } };
		this.modalContext?.submit();
	}

	#onClose() {
		this.modalContext?.reject();
	}

	// ===== Rendering =====

	#renderConditionRow(ruleIdx: number, condIdx: number, condition: RuleCondition) {
		const isValueless = VALUELESS_CONDITIONS.includes(condition.type);
		return html`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${condition.type}
					@change=${(e: Event) => this.#updateConditionType(ruleIdx, condIdx, (e.target as HTMLSelectElement).value as RuleConditionType)}>
					${ALL_CONDITION_TYPES.map((t) => html`
						<option value=${t} ?selected=${t === condition.type}>${CONDITION_LABELS[t]}</option>
					`)}
				</select>
				${isValueless ? nothing : html`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(condition.value ?? '')}
						@input=${(e: Event) => this.#updateConditionValue(ruleIdx, condIdx, (e.target as HTMLInputElement).value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove condition"
					@click=${() => this.#removeCondition(ruleIdx, condIdx)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
	}

	#renderRuleCard(rule: SectionRule, ruleIdx: number, matchedElements: AreaElement[]) {
		return html`
			<div class="rule-card">
				<div class="rule-header">
					<span class="rule-number">${ruleIdx + 1}</span>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${rule.role}
						@input=${(e: Event) => this.#updateRoleName(ruleIdx, (e.target as HTMLInputElement).value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => this.#removeRule(ruleIdx)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					${rule.conditions.map((cond, cIdx) => this.#renderConditionRow(ruleIdx, cIdx, cond))}
					<uui-button
						compact
						look="placeholder"
						label="Add condition"
						@click=${() => this.#addCondition(ruleIdx)}>
						+ Add condition
					</uui-button>
				</div>

				<div class="action-area">
					<label class="action-label">Action:</label>
					<select
						class="action-select"
						.value=${rule.action ?? 'createSection'}
						@change=${(e: Event) => this.#updateAction(ruleIdx, (e.target as HTMLSelectElement).value as RuleAction)}>
						${ALL_ACTIONS.map((a) => html`
							<option value=${a} ?selected=${a === (rule.action ?? 'createSection')}>${ACTION_LABELS[a]}</option>
						`)}
					</select>
				</div>

				<div class="match-preview ${matchedElements.length > 0 ? 'matched' : 'no-match'}">
					${matchedElements.length > 0
						? html`<uui-icon name="icon-check"></uui-icon> Matched <strong>${matchedElements.length}&times;</strong>${matchedElements.length <= 5 ? html`: ${matchedElements.map((el, i) => html`${i > 0 ? html`, ` : nothing}<strong>${this.#truncate(el.text, 40)}</strong>`)}` : nothing}`
						: html`<uui-icon name="icon-alert"></uui-icon> ${rule.conditions.length === 0 ? 'Add conditions to match elements' : 'No match'}`}
				</div>
			</div>
		`;
	}

	#truncate(text: string, max: number): string {
		return text.length > max ? text.substring(0, max) + '...' : text;
	}

	#renderUnmatchedElements(claimed: Map<string, number>) {
		const elements = this.#elements;
		const unmatched = elements.filter((el) => !claimed.has(el.id));
		if (unmatched.length === 0) return nothing;

		return html`
			<div class="unmatched-section">
				<h4>Unmatched elements (${unmatched.length})</h4>
				${unmatched.map((el) => {
					const elIndex = elements.indexOf(el);
					return html`
						<div class="unmatched-element">
							<div class="unmatched-text">${this.#truncate(el.text, 80)}</div>
							<div class="unmatched-meta">
								<span class="meta-badge">${el.fontSize}pt</span>
								<span class="meta-badge">${el.fontName}</span>
								${el.color !== '#000000' ? html`<span class="meta-badge" style="border-left: 3px solid ${el.color};">${el.color}</span>` : nothing}
							</div>
							<uui-button
								compact
								look="outline"
								label="Create rule from this"
								@click=${() => this.#createRuleFromElement(el, elIndex)}>
								Create rule
							</uui-button>
						</div>
					`;
				})}
			</div>
		`;
	}

	override render() {
		const claimed = this.#evaluateRules();

		// Build ruleIdx -> all matched elements lookup
		const ruleMatches = new Map<number, AreaElement[]>();
		for (const [elId, ruleIdx] of claimed) {
			const el = this.#elements.find((e) => e.id === elId);
			if (el) {
				const existing = ruleMatches.get(ruleIdx) ?? [];
				existing.push(el);
				ruleMatches.set(ruleIdx, existing);
			}
		}

		return html`
			<umb-body-layout headline="Edit Sections: ${this.#sectionHeading}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${this.#elements.length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${claimed.size} matched</span>
						<span class="meta-badge">${this.#elements.length - claimed.size} unmatched</span>
					</div>

					${this._rules.map((rule, idx) => this.#renderRuleCard(rule, idx, ruleMatches.get(idx) ?? []))}

					<uui-button
						look="placeholder"
						label="Add rule"
						@click=${this.#addRule}>
						+ Add another rule
					</uui-button>

					${this.#renderUnmatchedElements(claimed)}
				</div>

				<div slot="actions">
					<uui-button label="Close" @click=${this.#onClose}>Close</uui-button>
					<uui-button
						label="Save"
						look="primary"
						color="positive"
						@click=${this.#onSubmit}>
						Save
					</uui-button>
				</div>
			</umb-body-layout>
		`;
	}

	static override styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				height: 100%;
			}

			#main {
				padding: var(--uui-size-space-4);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-4);
			}

			.section-info {
				display: flex;
				gap: var(--uui-size-space-2);
				flex-wrap: wrap;
			}

			.meta-badge {
				font-size: 11px;
				font-family: monospace;
				padding: 1px 6px;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}

			/* Rule cards */
			.rule-card {
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				overflow: hidden;
			}

			.rule-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.rule-number {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 24px;
				height: 24px;
				border-radius: 50%;
				background: var(--uui-color-default-emphasis);
				color: var(--uui-color-default-contrast);
				font-size: 12px;
				font-weight: 700;
				flex-shrink: 0;
			}

			.role-name-input {
				flex: 1;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-default-size);
				font-family: monospace;
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.role-name-input:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			/* Conditions */
			.conditions-area {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.condition-row {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.condition-type-select {
				min-width: 180px;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.condition-type-select:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			.condition-value-input {
				flex: 1;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				font-family: monospace;
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.condition-value-input:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			/* Action area */
			.action-area {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
			}

			.action-label {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
			}

			.action-select {
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.action-select:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			/* Match preview */
			.match-preview {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				border-top: 1px solid var(--uui-color-border);
			}

			.match-preview.matched {
				background: color-mix(in srgb, var(--uui-color-positive) 10%, transparent);
				color: var(--uui-color-positive-standalone);
			}

			.match-preview.no-match {
				background: color-mix(in srgb, var(--uui-color-warning) 10%, transparent);
				color: var(--uui-color-warning-standalone);
			}

			.match-preview strong {
				font-weight: 600;
			}

			/* Unmatched elements */
			.unmatched-section {
				border: 1px dashed var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
			}

			.unmatched-section h4 {
				margin: 0 0 var(--uui-size-space-3);
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
				text-transform: uppercase;
				letter-spacing: 0.5px;
			}

			.unmatched-element {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-2) 0;
				border-bottom: 1px solid var(--uui-color-border);
			}

			.unmatched-element:last-child {
				border-bottom: none;
			}

			.unmatched-text {
				flex: 1;
				font-size: var(--uui-type-small-size);
				min-width: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.unmatched-meta {
				display: flex;
				gap: var(--uui-size-space-1);
				flex-shrink: 0;
			}
		`,
	];
}

export default UpDocSectionRulesEditorModalElement;

declare global {
	interface HTMLElementTagNameMap {
		'up-doc-section-rules-editor-modal': UpDocSectionRulesEditorModalElement;
	}
}
