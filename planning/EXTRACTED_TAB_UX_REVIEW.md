# Extracted Tab UX Review

Identified during testing session (Feb 2026). Not blocking — address in a future polish pass.

## Problem Statement

The Extracted tab currently has two visually inconsistent states depending on whether an area has rules configured or not. When both states are visible on screen simultaneously the UI is confusing.

## Specific Issues

### 1. Two counts mean different things
- "4 rules" badge = number of area rules *configured*
- "4 sections" text = number of sections *output* from extraction
- These happen to match in simple cases, leading users to wonder if they're the same thing. They should be clearly differentiated or one removed.

### 2. Inconsistent action labels for the same concept
- `⚙ Edit Rules` — shown when area has rules defined
- `↻ Define Structure` — shown when area has no rules
- These are the same action type (open area rules editor) but have completely different labels. Should be consistent, e.g. "Configure Area" / "Edit Configuration", or simply "Edit Rules" for both with a visual indicator of whether rules exist.

### 3. Toggle overload
- Area-level include/exclude toggle — only shown for **unconfigured** areas (Tour Details), not for configured areas (Organiser Information). Inconsistent.
- Section-level include/exclude toggle — shows within each section
- Both visible simultaneously with no clear hierarchy

### 4. "Elements" leaking into the wrong level
- "10 elements" shown on a section row — this is a raw PDF extraction detail
- At the area/section level the user shouldn't need to count elements; that's the deep-dive detail for debugging extraction, not for configuring rules or mapping

### 5. "SECTION – FEATURES" heading style
- The "SECTION – FEATURES" label with uppercase treatment looks like a system label, not a user-defined role name
- Inconsistent with how configured area sections are displayed (plain text role name like "Name", "Telephone")

## Proposed Approach (deferred)

1. **Unify area state display**: Same header structure for both configured and unconfigured areas. Use a status badge ("Configured" / "Not configured") rather than different button labels.
2. **Consistent action button**: Always "Edit Rules" — the button opens the editor regardless of whether rules exist yet.
3. **Move include/exclude**: Put toggles into a secondary "..." actions menu, not inline in the main header row. Primary action is always the rules editor.
4. **Hide element counts**: Remove from the area/section header row. Accessible via collapse/expand of sections only.
5. **Section header style**: Use consistent role-name formatting whether the area has rules or not.
