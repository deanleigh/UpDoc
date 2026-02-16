import { UmbModalToken } from '@umbraco-cms/backoffice/modal';
import type { AreaElement, SectionRuleSet } from './workflow.types.js';

export interface SectionRulesEditorModalData {
	workflowName: string;
	sectionId: string;
	sectionHeading: string;
	/** The elements belonging to this section (from area detection). */
	elements: AreaElement[];
	/** Existing rules for this section, if any. */
	existingRules?: SectionRuleSet | null;
}

export interface SectionRulesEditorModalValue {
	rules: SectionRuleSet;
}

export const UMB_SECTION_RULES_EDITOR_MODAL = new UmbModalToken<SectionRulesEditorModalData, SectionRulesEditorModalValue>(
	'UpDoc.SectionRulesEditorModal',
	{
		modal: {
			type: 'sidebar',
			size: 'medium',
		},
	},
);
