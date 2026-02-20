import { UmbModalToken } from '@umbraco-cms/backoffice/modal';
import type { AreaElement, AreaRules } from './workflow.types.js';

export interface SectionRulesEditorModalData {
	workflowName: string;
	sectionId: string;
	sectionHeading: string;
	/** The elements belonging to this section (from area detection). */
	elements: AreaElement[];
	/** Existing rules for this section, if any. */
	existingRules?: AreaRules | null;
	/** Callback for "Save" (persist without closing). Called with the current rules value. */
	onSave?: (rules: AreaRules) => Promise<void>;
}

export interface SectionRulesEditorModalValue {
	rules: AreaRules;
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
