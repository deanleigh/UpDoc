import type { SectionRulesEditorModalData, SectionRulesEditorModalValue } from './section-rules-editor-modal.token.js';
import type { SectionRule, RuleCondition, RuleConditionType, RulePart, BlockFormat, FormatEntry, FormatEntryType, AreaElement, AreaRules, RuleGroup } from './workflow.types.js';
import { getEffectivePart, getEffectiveFormat } from './workflow.types.js';
import { html, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';

/**
 * Editable rule: SectionRule + transient tracking fields for the modal.
 * _id is used for drag-and-drop tracking. _groupName tracks which group the rule belongs to.
 */
interface EditableRule extends SectionRule {
	_id: string;
	_groupName: string | null;
}

let _nextRuleId = 0;
function generateRuleId(): string {
	return `r-${++_nextRuleId}`;
}

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

/** Friendly labels for rule parts */
const PART_LABELS: Record<RulePart, string> = {
	title: 'Title',
	content: 'Content',
	description: 'Description',
	summary: 'Summary',
};

/** All available rule parts */
const ALL_PARTS: RulePart[] = ['title', 'content', 'description', 'summary'];

/** Format entry type labels */
const FORMAT_ENTRY_TYPE_LABELS: Record<FormatEntryType, string> = {
	block: 'Block',
	style: 'Style',
};

const ALL_FORMAT_ENTRY_TYPES: FormatEntryType[] = ['block', 'style'];

/** Block format value labels (block-level Markdown elements) */
const BLOCK_FORMAT_LABELS: Record<string, string> = {
	auto: 'Auto',
	paragraph: 'Paragraph',
	heading1: 'Heading 1',
	heading2: 'Heading 2',
	heading3: 'Heading 3',
	heading4: 'Heading 4',
	heading5: 'Heading 5',
	heading6: 'Heading 6',
	bulletListItem: 'Bullet List',
	numberedListItem: 'Numbered List',
	quote: 'Quote',
};

const ALL_BLOCK_FORMATS: string[] = [
	'auto', 'paragraph', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6',
	'bulletListItem', 'numberedListItem', 'quote',
];

/** Style format value labels (inline Markdown decorations) */
const STYLE_FORMAT_LABELS: Record<string, string> = {
	bold: 'Bold',
	italic: 'Italic',
	strikethrough: 'Strikethrough',
	code: 'Code',
	highlight: 'Highlight',
};

const ALL_STYLE_FORMATS: string[] = ['bold', 'italic', 'strikethrough', 'code', 'highlight'];

@customElement('up-doc-section-rules-editor-modal')
export class UpDocSectionRulesEditorModalElement extends UmbModalBaseElement<SectionRulesEditorModalData, SectionRulesEditorModalValue> {
	/** Flat array of all rules (grouped + ungrouped). Each carries _groupName for grouping. */
	@state() private _rules: EditableRule[] = [];
	/** Ordered list of group names. */
	@state() private _groupOrder: string[] = [];
	/** Track collapsed state per rule section: "conditions-0", "exceptions-1", etc. */
	@state() private _collapsed: Set<string> = new Set();
	/** Group currently being renamed (null = none). */
	@state() private _renamingGroup: string | null = null;
	@state() private _renameValue = '';

	#isCollapsed(section: string, ruleIdx: number): boolean {
		return this._collapsed.has(`${section}-${ruleIdx}`);
	}

	#toggleCollapsed(section: string, ruleIdx: number) {
		const key = `${section}-${ruleIdx}`;
		const next = new Set(this._collapsed);
		if (next.has(key)) {
			next.delete(key);
		} else {
			next.add(key);
		}
		this._collapsed = next;
	}

	override firstUpdated() {
		const areaRules = this.data?.existingRules;
		if (!areaRules) return;

		const editableRules: EditableRule[] = [];
		const groupOrder: string[] = [];

		// Grouped rules first
		for (const group of (areaRules.groups ?? [])) {
			groupOrder.push(group.name);
			for (const rule of group.rules) {
				editableRules.push(this.#normalizeRule(rule, group.name));
			}
		}

		// Ungrouped rules
		for (const rule of (areaRules.rules ?? [])) {
			editableRules.push(this.#normalizeRule(rule, null));
		}

		this._rules = editableRules;
		this._groupOrder = groupOrder;
	}

	/** Normalize a rule on load: derive part from legacy action, migrate formats. */
	#normalizeRule(rule: SectionRule, groupName: string | null): EditableRule {
		let part = rule.part as RulePart | undefined;
		let exclude = rule.exclude ?? false;

		// Normalize from legacy action field
		if (!part && !exclude) {
			const derived = getEffectivePart(rule);
			if (derived === 'exclude') {
				exclude = true;
			} else {
				part = derived as RulePart;
			}
		}

		// Migrate old single format to formats array
		let formats = rule.formats;
		if (!formats || formats.length === 0) {
			const blockValue = rule.format ?? getEffectiveFormat(rule);
			formats = [{ type: 'block' as FormatEntryType, value: blockValue }];
		}

		return {
			...rule,
			part,
			exclude,
			formats,
			_id: generateRuleId(),
			_groupName: groupName,
		};
	}

	get #elements(): AreaElement[] {
		return this.data?.elements ?? [];
	}

	get #sectionHeading(): string {
		return this.data?.sectionHeading ?? 'Section';
	}

	/**
	 * Returns a grouped view for rendering: groups in order, then ungrouped.
	 * Each entry has the group name (null = ungrouped) and rules with their flat indices.
	 */
	get #groupedView(): Array<{ group: string | null; rules: Array<{ rule: EditableRule; flatIndex: number }> }> {
		const result: Array<{ group: string | null; rules: Array<{ rule: EditableRule; flatIndex: number }> }> = [];

		// Groups in order
		for (const name of this._groupOrder) {
			const groupRules: Array<{ rule: EditableRule; flatIndex: number }> = [];
			this._rules.forEach((r, i) => {
				if (r._groupName === name) groupRules.push({ rule: r, flatIndex: i });
			});
			result.push({ group: name, rules: groupRules });
		}

		// Ungrouped
		const ungrouped: Array<{ rule: EditableRule; flatIndex: number }> = [];
		this._rules.forEach((r, i) => {
			if (r._groupName === null) ungrouped.push({ rule: r, flatIndex: i });
		});
		result.push({ group: null, rules: ungrouped });

		return result;
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
					// Check exceptions — if any exception matches, skip this element for this rule
					if (rule.exceptions?.length) {
						const anyExceptionMatches = rule.exceptions.some((exc) =>
							this.#elementMatchesCondition(el, exc, elIdx, elements.length),
						);
						if (anyExceptionMatches) continue;
					}
					claimed.set(el.id, ruleIdx);
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

	#addRule(groupName: string | null = null) {
		this._rules = [...this._rules, {
			role: '',
			part: 'content' as RulePart,
			conditions: [],
			formats: [{ type: 'block' as FormatEntryType, value: 'auto' }],
			_id: generateRuleId(),
			_groupName: groupName,
		}];
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
		this._rules = [...this._rules, {
			role: roleSuggestion,
			part: 'content' as RulePart,
			conditions,
			formats: [{ type: 'block' as FormatEntryType, value: 'auto' }],
			_id: generateRuleId(),
			_groupName: null,
		}];
	}

	#updateRoleName(ruleIdx: number, value: string) {
		const updated = [...this._rules];
		updated[ruleIdx] = { ...updated[ruleIdx], role: value };
		this._rules = updated;
	}

	#updatePart(ruleIdx: number, value: RulePart) {
		const updated = [...this._rules];
		updated[ruleIdx] = { ...updated[ruleIdx], part: value };
		this._rules = updated;
	}

	#updateExclude(ruleIdx: number, value: boolean) {
		const updated = [...this._rules];
		updated[ruleIdx] = { ...updated[ruleIdx], exclude: value };
		this._rules = updated;
	}

	// ===== Group CRUD =====

	#addGroup() {
		let name = 'New Group';
		let counter = 1;
		while (this._groupOrder.includes(name)) {
			name = `New Group ${++counter}`;
		}
		this._groupOrder = [...this._groupOrder, name];
		// Immediately enter rename mode
		this._renamingGroup = name;
		this._renameValue = name;
	}

	#startRenameGroup(name: string) {
		this._renamingGroup = name;
		this._renameValue = name;
	}

	#confirmRenameGroup() {
		if (!this._renamingGroup || !this._renameValue.trim()) return;
		const oldName = this._renamingGroup;
		const newName = this._renameValue.trim();

		if (oldName !== newName) {
			// Update group order
			this._groupOrder = this._groupOrder.map((n) => n === oldName ? newName : n);
			// Update all rules in this group
			this._rules = this._rules.map((r) =>
				r._groupName === oldName ? { ...r, _groupName: newName } : r,
			);
		}
		this._renamingGroup = null;
		this._renameValue = '';
	}

	#cancelRenameGroup() {
		this._renamingGroup = null;
		this._renameValue = '';
	}

	#deleteGroup(name: string) {
		// Move all rules from this group to ungrouped
		this._rules = this._rules.map((r) =>
			r._groupName === name ? { ...r, _groupName: null } : r,
		);
		this._groupOrder = this._groupOrder.filter((n) => n !== name);
	}

	#moveRuleToGroup(ruleIdx: number, groupName: string | null) {
		const updated = [...this._rules];
		updated[ruleIdx] = { ...updated[ruleIdx], _groupName: groupName };
		this._rules = updated;
	}

	// ===== Format entry CRUD =====

	#addFormatEntry(ruleIdx: number) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.formats = [...(rule.formats ?? []), { type: 'block' as FormatEntryType, value: 'auto' }];
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#removeFormatEntry(ruleIdx: number, fmtIdx: number) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.formats = (rule.formats ?? []).filter((_, i) => i !== fmtIdx);
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#updateFormatEntryType(ruleIdx: number, fmtIdx: number, type: FormatEntryType) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.formats = [...(rule.formats ?? [])];
		// Reset value to first option when switching type
		const defaultValue = type === 'block' ? 'auto' : 'bold';
		rule.formats[fmtIdx] = { type, value: defaultValue };
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#updateFormatEntryValue(ruleIdx: number, fmtIdx: number, value: string) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.formats = [...(rule.formats ?? [])];
		rule.formats[fmtIdx] = { ...rule.formats[fmtIdx], value: value as FormatEntry['value'] };
		updated[ruleIdx] = rule;
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

	// ===== Exception CRUD =====

	#addException(ruleIdx: number) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.exceptions = [...(rule.exceptions ?? []), { type: 'textContains' as RuleConditionType, value: '' }];
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#removeException(ruleIdx: number, excIdx: number) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.exceptions = (rule.exceptions ?? []).filter((_, i) => i !== excIdx);
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#updateExceptionType(ruleIdx: number, excIdx: number, type: RuleConditionType) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.exceptions = [...(rule.exceptions ?? [])];
		rule.exceptions[excIdx] = {
			type,
			value: VALUELESS_CONDITIONS.includes(type) ? undefined : rule.exceptions[excIdx].value,
		};
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	#updateExceptionValue(ruleIdx: number, excIdx: number, value: string) {
		const updated = [...this._rules];
		const rule = { ...updated[ruleIdx] };
		rule.exceptions = [...(rule.exceptions ?? [])];
		const exc = rule.exceptions[excIdx];
		const isNumeric = exc.type === 'fontSizeEquals' || exc.type === 'fontSizeAbove' || exc.type === 'fontSizeBelow';
		rule.exceptions[excIdx] = { ...exc, value: isNumeric && !isNaN(Number(value)) ? Number(value) : value };
		updated[ruleIdx] = rule;
		this._rules = updated;
	}

	// ===== Submit =====

	/** Strip transient fields and sync format for C# compatibility. */
	#cleanRule(rule: EditableRule): SectionRule {
		const blockEntry = (rule.formats ?? []).find((f) => f.type === 'block');
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { _id, _groupName, action, ...clean } = rule;
		return {
			...clean,
			format: (blockEntry?.value ?? 'auto') as BlockFormat,
		};
	}

	#onSubmit() {
		const groups: RuleGroup[] = [];
		for (const name of this._groupOrder) {
			const groupRules = this._rules
				.filter((r) => r._groupName === name)
				.map((r) => this.#cleanRule(r));
			groups.push({ name, rules: groupRules });
		}
		const ungroupedRules = this._rules
			.filter((r) => r._groupName === null)
			.map((r) => this.#cleanRule(r));

		this.value = { rules: { groups, rules: ungroupedRules } };
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

	#renderExceptionRow(ruleIdx: number, excIdx: number, exception: RuleCondition) {
		const isValueless = VALUELESS_CONDITIONS.includes(exception.type);
		return html`
			<div class="condition-row">
				<select
					class="condition-type-select"
					.value=${exception.type}
					@change=${(e: Event) => this.#updateExceptionType(ruleIdx, excIdx, (e.target as HTMLSelectElement).value as RuleConditionType)}>
					${ALL_CONDITION_TYPES.map((t) => html`
						<option value=${t} ?selected=${t === exception.type}>${CONDITION_LABELS[t]}</option>
					`)}
				</select>
				${isValueless ? nothing : html`
					<input
						type="text"
						class="condition-value-input"
						placeholder="Value..."
						.value=${String(exception.value ?? '')}
						@input=${(e: Event) => this.#updateExceptionValue(ruleIdx, excIdx, (e.target as HTMLInputElement).value)} />
				`}
				<uui-button
					compact
					look="secondary"
					label="Remove exception"
					@click=${() => this.#removeException(ruleIdx, excIdx)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
	}

	#renderFormatRow(ruleIdx: number, fmtIdx: number, entry: FormatEntry) {
		const valueOptions = entry.type === 'block' ? ALL_BLOCK_FORMATS : ALL_STYLE_FORMATS;
		const valueLabels = entry.type === 'block' ? BLOCK_FORMAT_LABELS : STYLE_FORMAT_LABELS;

		return html`
			<div class="condition-row">
				<select
					class="format-type-select"
					.value=${entry.type}
					@change=${(e: Event) => this.#updateFormatEntryType(ruleIdx, fmtIdx, (e.target as HTMLSelectElement).value as FormatEntryType)}>
					${ALL_FORMAT_ENTRY_TYPES.map((t) => html`
						<option value=${t} ?selected=${t === entry.type}>${FORMAT_ENTRY_TYPE_LABELS[t]}</option>
					`)}
				</select>
				<select
					class="format-value-select"
					.value=${entry.value}
					@change=${(e: Event) => this.#updateFormatEntryValue(ruleIdx, fmtIdx, (e.target as HTMLSelectElement).value)}>
					${valueOptions.map((v) => html`
						<option value=${v} ?selected=${v === entry.value}>${valueLabels[v]}</option>
					`)}
				</select>
				<uui-button
					compact
					look="secondary"
					label="Remove format"
					@click=${() => this.#removeFormatEntry(ruleIdx, fmtIdx)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
	}

	#renderRuleCard(rule: EditableRule, flatIdx: number, matchedElements: AreaElement[]) {
		const isExcluded = rule.exclude;
		const currentPart = rule.part ?? 'content';

		// Build group move options
		const moveOptions: Array<{ label: string; value: string | null }> = [
			{ label: 'Ungrouped', value: null },
			...this._groupOrder.map((name) => ({ label: name, value: name })),
		];

		return html`
			<div class="rule-card">
				<div class="rule-header">
					<span class="rule-grip" title="Drag to reorder">⠿</span>
					<input
						type="text"
						class="role-name-input"
						placeholder="Section name (e.g. tour-title)"
						.value=${rule.role}
						@input=${(e: Event) => this.#updateRoleName(flatIdx, (e.target as HTMLInputElement).value)} />
					<uui-button
						compact
						look="secondary"
						color="danger"
						label="Remove rule"
						@click=${() => this.#removeRule(flatIdx)}>
						<uui-icon name="icon-trash"></uui-icon>
					</uui-button>
				</div>

				<div class="conditions-area">
					<div class="section-header collapsible" @click=${() => this.#toggleCollapsed('conditions', flatIdx)}>
						<uui-icon name=${this.#isCollapsed('conditions', flatIdx) ? 'icon-navigation-right' : 'icon-navigation-down'}></uui-icon>
						Conditions${rule.conditions.length > 0 ? ` (${rule.conditions.length})` : ''}
					</div>
					${this.#isCollapsed('conditions', flatIdx) ? nothing : html`
						${rule.conditions.map((cond, cIdx) => this.#renderConditionRow(flatIdx, cIdx, cond))}
						<uui-button
							compact
							look="placeholder"
							label="Add condition"
							@click=${() => this.#addCondition(flatIdx)}>
							+ Add condition
						</uui-button>
					`}
				</div>

				<div class="exceptions-area">
					<div class="section-header collapsible" @click=${() => this.#toggleCollapsed('exceptions', flatIdx)}>
						<uui-icon name=${this.#isCollapsed('exceptions', flatIdx) ? 'icon-navigation-right' : 'icon-navigation-down'}></uui-icon>
						Exceptions${(rule.exceptions ?? []).length > 0 ? ` (${(rule.exceptions ?? []).length})` : ''}
					</div>
					${this.#isCollapsed('exceptions', flatIdx) ? nothing : html`
						${(rule.exceptions ?? []).map((exc, eIdx) => this.#renderExceptionRow(flatIdx, eIdx, exc))}
						<uui-button
							compact
							look="placeholder"
							label="Add exception"
							@click=${() => this.#addException(flatIdx)}>
							+ Add exception
						</uui-button>
					`}
				</div>

				<div class="part-area">
					<div class="section-header collapsible" @click=${() => this.#toggleCollapsed('part', flatIdx)}>
						<uui-icon name=${this.#isCollapsed('part', flatIdx) ? 'icon-navigation-right' : 'icon-navigation-down'}></uui-icon>
						Part
					</div>
					${this.#isCollapsed('part', flatIdx) ? nothing : html`
						<div class="part-controls">
							<select
								class="part-select"
								.value=${currentPart}
								?disabled=${isExcluded}
								@change=${(e: Event) => this.#updatePart(flatIdx, (e.target as HTMLSelectElement).value as RulePart)}>
								${ALL_PARTS.map((p) => html`
									<option value=${p} ?selected=${p === currentPart}>${PART_LABELS[p]}</option>
								`)}
							</select>
							<label class="exclude-label">
								<input
									type="checkbox"
									.checked=${isExcluded}
									@change=${(e: Event) => this.#updateExclude(flatIdx, (e.target as HTMLInputElement).checked)} />
								Exclude
							</label>
						</div>
						${moveOptions.length > 1 ? html`
							<div class="move-to-group">
								<span class="move-label">Group:</span>
								<select
									class="group-select"
									.value=${rule._groupName ?? ''}
									@change=${(e: Event) => {
										const val = (e.target as HTMLSelectElement).value;
										this.#moveRuleToGroup(flatIdx, val || null);
									}}>
									${moveOptions.map((opt) => html`
										<option value=${opt.value ?? ''} ?selected=${(opt.value ?? '') === (rule._groupName ?? '')}>${opt.label}</option>
									`)}
								</select>
							</div>
						` : nothing}
					`}
				</div>

				${!isExcluded ? html`
				<div class="format-area">
					<div class="section-header collapsible" @click=${() => this.#toggleCollapsed('format', flatIdx)}>
						<uui-icon name=${this.#isCollapsed('format', flatIdx) ? 'icon-navigation-right' : 'icon-navigation-down'}></uui-icon>
						Format${(rule.formats ?? []).length > 0 ? ` (${(rule.formats ?? []).length})` : ''}
					</div>
					${this.#isCollapsed('format', flatIdx) ? nothing : html`
						${(rule.formats ?? []).map((fmt, fIdx) => this.#renderFormatRow(flatIdx, fIdx, fmt))}
						<uui-button
							compact
							look="placeholder"
							label="Add format"
							@click=${() => this.#addFormatEntry(flatIdx)}>
							+ Add format
						</uui-button>
					`}
				</div>
				` : nothing}

				<div class="match-preview ${matchedElements.length > 0 ? (isExcluded ? 'excluded' : 'matched') : 'no-match'}">
					${matchedElements.length > 0
						? html`<uui-icon name=${isExcluded ? 'icon-block' : 'icon-check'}></uui-icon> ${isExcluded ? 'Excluded' : 'Matched'} <strong>${matchedElements.length}&times;</strong>${matchedElements.length <= 5 ? html`: ${matchedElements.map((el, i) => html`${i > 0 ? html`, ` : nothing}<strong>${this.#truncate(el.text, 40)}</strong>`)}` : nothing}`
						: html`<uui-icon name="icon-alert"></uui-icon> ${rule.conditions.length === 0 ? 'Add conditions to match elements' : 'No match'}`}
				</div>
			</div>
		`;
	}

	#truncate(text: string, max: number): string {
		return text.length > max ? text.substring(0, max) + '...' : text;
	}

	#renderGroupHeader(name: string) {
		if (this._renamingGroup === name) {
			return html`
				<div class="group-header">
					<input
						type="text"
						class="group-rename-input"
						.value=${this._renameValue}
						@input=${(e: Event) => { this._renameValue = (e.target as HTMLInputElement).value; }}
						@keydown=${(e: KeyboardEvent) => {
							if (e.key === 'Enter') this.#confirmRenameGroup();
							if (e.key === 'Escape') this.#cancelRenameGroup();
						}} />
					<uui-button compact look="primary" label="Confirm" @click=${() => this.#confirmRenameGroup()}>
						<uui-icon name="icon-check"></uui-icon>
					</uui-button>
					<uui-button compact look="secondary" label="Cancel" @click=${() => this.#cancelRenameGroup()}>
						<uui-icon name="icon-wrong"></uui-icon>
					</uui-button>
				</div>
			`;
		}

		return html`
			<div class="group-header">
				<strong class="group-name">${name}</strong>
				<span class="header-spacer"></span>
				<uui-button compact look="outline" label="Rename" @click=${() => this.#startRenameGroup(name)}>
					<uui-icon name="icon-edit"></uui-icon>
				</uui-button>
				<uui-button compact look="outline" color="danger" label="Delete group"
					title="Delete group (rules move to ungrouped)"
					@click=${() => this.#deleteGroup(name)}>
					<uui-icon name="icon-trash"></uui-icon>
				</uui-button>
			</div>
		`;
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
								label="Define rule from this"
								@click=${() => this.#createRuleFromElement(el, elIndex)}>
								Define rule
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

		const groupedView = this.#groupedView;

		return html`
			<umb-body-layout headline="Edit Sections: ${this.#sectionHeading}">
				<div id="main">
					<div class="section-info">
						<span class="meta-badge">${this.#elements.length} elements</span>
						<span class="meta-badge">${this._rules.length} rules</span>
						<span class="meta-badge">${claimed.size} matched</span>
						<span class="meta-badge">${this.#elements.length - claimed.size} unmatched</span>
						${this._groupOrder.length > 0
							? html`<span class="meta-badge">${this._groupOrder.length} group${this._groupOrder.length !== 1 ? 's' : ''}</span>`
							: nothing}
					</div>

					${groupedView.map((entry) => {
						if (entry.group !== null) {
							// Render a named group
							return html`
								<div class="group-container">
									${this.#renderGroupHeader(entry.group)}
									<div class="group-rules">
										${entry.rules.map(({ rule, flatIndex }) =>
											this.#renderRuleCard(rule, flatIndex, ruleMatches.get(flatIndex) ?? []),
										)}
										<uui-button
											look="placeholder"
											label="Add rule to ${entry.group}"
											@click=${() => this.#addRule(entry.group)}>
											+ Add rule
										</uui-button>
									</div>
								</div>
							`;
						}

						// Render ungrouped rules
						return html`
							${this._groupOrder.length > 0 ? html`
								<div class="ungrouped-label">Ungrouped</div>
							` : nothing}
							${entry.rules.map(({ rule, flatIndex }) =>
								this.#renderRuleCard(rule, flatIndex, ruleMatches.get(flatIndex) ?? []),
							)}
							<uui-button
								look="placeholder"
								label="Add rule"
								@click=${() => this.#addRule(null)}>
								+ Add rule
							</uui-button>
						`;
					})}

					<uui-button
						look="outline"
						label="Add group"
						@click=${() => this.#addGroup()}>
						<uui-icon name="icon-add"></uui-icon>
						Add group
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

			/* Group containers */
			.group-container {
				border: 2px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				overflow: hidden;
			}

			.group-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.group-name {
				font-size: var(--uui-type-default-size);
				color: var(--uui-color-text);
			}

			.group-rename-input {
				flex: 1;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-focus);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-default-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.group-rename-input:focus {
				outline: none;
			}

			.header-spacer {
				flex: 1;
			}

			.group-rules {
				padding: var(--uui-size-space-3);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-3);
			}

			.ungrouped-label {
				font-size: 11px;
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: var(--uui-color-text-alt);
				padding-top: var(--uui-size-space-2);
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

			.rule-grip {
				cursor: grab;
				color: var(--uui-color-text-alt);
				font-size: 14px;
				user-select: none;
				flex-shrink: 0;
			}

			.rule-grip:active {
				cursor: grabbing;
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

			/* Section headers within rule cards */
			.section-header {
				font-size: 11px;
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: var(--uui-color-text-alt);
				margin-bottom: var(--uui-size-space-1);
			}

			.section-header.collapsible {
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
				user-select: none;
			}

			.section-header.collapsible:hover {
				color: var(--uui-color-text);
			}

			.section-header.collapsible uui-icon {
				font-size: 10px;
			}

			/* Conditions */
			.conditions-area {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			/* Exceptions */
			.exceptions-area {
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
				border-top: 1px solid var(--uui-color-border);
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

			/* Format row selects */
			.format-type-select {
				min-width: 100px;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.format-type-select:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			.format-value-select {
				flex: 1;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.format-value-select:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			/* Part area (replaces old action area) */
			.part-area {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
			}

			.part-controls {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.part-select {
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.part-select:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			.part-select:disabled {
				opacity: 0.5;
			}

			.exclude-label {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				cursor: pointer;
				user-select: none;
			}

			.move-to-group {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				margin-top: var(--uui-size-space-1);
			}

			.move-label {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.group-select {
				flex: 1;
				padding: var(--uui-size-space-1) var(--uui-size-space-2);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.group-select:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			/* Format area */
			.format-area {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
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

			.match-preview.excluded {
				background: color-mix(in srgb, var(--uui-color-danger) 10%, transparent);
				color: var(--uui-color-danger-standalone);
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
