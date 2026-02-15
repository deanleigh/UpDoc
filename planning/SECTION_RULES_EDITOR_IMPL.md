# Section Rules Editor — Implementation Plan

## Context

The pipeline today: Extract → Zone Detection → Transform → Map → Create Document.

The Transform layer groups raw elements into sections and assembles them into Markdown. But some sections contain multiple pieces that need to map to **different** destination fields — e.g., "Organiser Info" has a name, telephone, and email that should map to separate block properties, not one paragraph blob.

The Section Rules Editor adds metadata-based rules (Outlook email rules pattern) that break sections into individually-addressable sub-parts (roles). This is the last major architectural piece for the shaping pipeline.

---

## Phase A: Rules Editor (UI + Storage)

### A1. C# Models — `src/UpDoc/Models/SectionRules.cs` (NEW)

```
SectionRuleSet         → { rules: SectionRule[] }
SectionRule            → { role: string, conditions: RuleCondition[] }
RuleCondition          → { type: string, value: string|number }
```

Condition types: `textBeginsWith`, `textEndsWith`, `textContains`, `textMatchesPattern`, `fontSizeEquals`, `fontSizeAbove`, `fontSizeBelow`, `fontNameContains`, `colorEquals`, `positionFirst`, `positionLast`

### A2. SourceConfig change — `src/UpDoc/Models/SourceConfig.cs` (MODIFY)

Add property:
```csharp
[JsonPropertyName("sectionRules")]
public Dictionary<string, SectionRuleSet>? SectionRules { get; set; }
```

Keyed by transform section ID (e.g., `"preamble-p1-z1"`, `"features"`). Lives in source.json alongside existing config. The old `sections` array is unrelated (vestigial extraction strategies).

### A3. API Endpoint — `src/UpDoc/Controllers/WorkflowController.cs` (MODIFY)

One new endpoint:

- **PUT `{name}/section-rules`** — Accepts `Dictionary<string, SectionRuleSet>`, patches source.json's `sectionRules` key, saves.

No evaluate endpoint needed — rule evaluation is client-side in Phase A (condition matching against elements already loaded in the modal).

### A4. TypeScript Types — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` (MODIFY)

Add section rules types and update `SourceConfig` interface with optional `sectionRules` property.

### A5. Workflow Service — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.service.ts` (MODIFY)

Add `saveSectionRules(workflowName, sectionRules, token)` function.

### A6. Modal Token — `section-rules-editor-modal.token.ts` (NEW)

```typescript
Data: { workflowName, sectionId, sectionHeading, elements: ZoneElement[], existingRules }
Value: { rules: SectionRuleSet }
```

Type: sidebar, size: medium. Elements passed in from the Source tab (already loaded in `_zoneDetection` state).

### A7. Modal Element — `section-rules-editor-modal.element.ts` (NEW)

The rules editor UI using the Outlook rules pattern:

- **Rule cards**: Role name input + condition rows (type dropdown + value input + remove) + live matched element preview
- **Auto-populate**: Click an unmatched element → new rule card with conditions pre-filled from its metadata (font size if unusual, color if unusual, text prefix if contains ":")
- **Client-side evaluation**: As conditions change, re-evaluate all rules against the elements in memory. Show matched element per rule (green) or "No match" (amber). Unmatched elements listed at bottom.
- **"Add another rule"** button and **"Create rule from this"** on unmatched elements
- **Rule ordering**: First-match-wins. An element claimed by one rule cannot match subsequent rules. Rules evaluated top-to-bottom.

### A8. Manifest — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/manifest.ts` (MODIFY)

Register the new modal.

### A9. Source Tab — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` (MODIFY)

Two integration points:

1. **Sections stat box** (line 756): Add "Edit Sections" button (mirrors "Edit Areas" pattern). Opens a section picker popover → then the rules editor modal for the selected section.

2. **Transformed view section cards** (line 842): Add a small settings icon button per section. Sections with rules show a "N rules" badge. Click opens the rules editor directly for that section.

**Section → Elements lookup**: The source view already has `_zoneDetection` loaded. To find elements for a transform section:
- Sections with headings: search zone detection for a section whose heading text normalizes to the same kebab-case ID (`NormalizeToKebabCase` logic replicated in TS)
- Preamble sections: parse `preamble-p{page}-z{zoneIndex}` from the ID

---

## Phase B: Pipeline Integration (deferred to next branch)

### B1. TransformedSection model — add `parentSectionId?: string` and `roleLabel?: string`

### B2. ContentTransformService — accept section rules, produce sub-part entries

After assembling a standard section, if rules exist for that section ID:
- Run evaluation against the DetectedSection's children
- For each matched rule, emit an additional TransformedSection with:
  - `Id` = `{parentId}.{role}` (e.g., `preamble-p1-z1.organiser-name`)
  - `Content` = matched element text
  - `Pattern` = `"ruleMatch"`
  - `ParentSectionId` = parent's ID

### B3. C# Rule Evaluator — `SectionRuleEvaluator.cs` (NEW)

Same condition matching logic as the client-side TS version, for use by the transform service.

### B4. Transform endpoints — pass section rules through

### B5. Source tab Transformed view — render sub-parts nested under parent sections

### B6. Bridge — no changes needed (sub-parts are regular TransformedSections, appear naturally in sectionLookup)

---

## Open Questions — Resolved

| Question | Decision |
|----------|----------|
| Multiple matches per rule | Take first match, show warning if ambiguous |
| Rule ordering | First-match-wins across rules (element claimed = excluded from later rules) |
| Transform interaction | Layer on top — parent section keeps full content, sub-parts are additional entries |
| Unmatched elements | Remain in parent section's Content, visible in rules editor |
| Testing across PDFs | Defer to Phase C |

---

## Critical Files

| File | Action | Phase |
|------|--------|-------|
| `src/UpDoc/Models/SectionRules.cs` | NEW | A |
| `src/UpDoc/Models/SourceConfig.cs` | MODIFY (add SectionRules property) | A |
| `src/UpDoc/Controllers/WorkflowController.cs` | MODIFY (PUT section-rules endpoint) | A |
| `src/UpDoc/wwwroot/.../workflow.types.ts` | MODIFY (add TS types) | A |
| `src/UpDoc/wwwroot/.../workflow.service.ts` | MODIFY (add save function) | A |
| `src/UpDoc/wwwroot/.../section-rules-editor-modal.token.ts` | NEW | A |
| `src/UpDoc/wwwroot/.../section-rules-editor-modal.element.ts` | NEW | A |
| `src/UpDoc/wwwroot/.../manifest.ts` | MODIFY (register modal) | A |
| `src/UpDoc/wwwroot/.../up-doc-workflow-source-view.element.ts` | MODIFY (Edit Sections button + per-section edit) | A |
| `docs/source-files/section-rules-editor-modal-element.md` | NEW | A |
| `docs/source-files/section-rules-editor-modal-token.md` | NEW | A |
| `src/UpDoc/Models/TransformResult.cs` | MODIFY | B |
| `src/UpDoc/Services/ContentTransformService.cs` | MODIFY | B |
| `src/UpDoc/Services/SectionRuleEvaluator.cs` | NEW | B |

---

## Verification (Phase A)

1. Open a workflow → Source tab → Transformed view
2. Click the settings icon on a section card (e.g., the Organiser Info preamble)
3. Rules editor modal opens with the section's elements listed
4. Click an element → new rule auto-populates with conditions from its metadata
5. Name the role (e.g., "organiser-name") → live preview shows the matched element
6. Add more rules for other elements in the section
7. Save → rules persisted in source.json under `sectionRules`
8. Close and re-open → rules load correctly
9. Verify unmatched elements remain visible at the bottom of the editor

---

## Pre-implementation Notes

1. **Section → Elements lookup** — RESOLVED: Refactor zone detection to consume ExtractionElement instead of re-extracting. One element type through the whole pipeline. Zone detection adds structure (zones, sections) without reshaping element data. This eliminates the need for reverse-lookup by kebab-case normalization.
2. **Auto-populate heuristics** — "unusual" needs defining. Compare against other elements in the same section (e.g., if clicked element's font size differs from the majority in that section, add a fontSizeEquals condition).
3. **Re-extraction stability** — Rules are keyed by section ID. If sections shift after re-extraction (different PDF, changed zone settings), rules could become orphaned. Need orphan detection/warning.
4. **Edit Sections button** — Stat box entry point (A9 point 1) may be unnecessary complexity. The per-section settings icon (A9 point 2) is the natural entry point. Consider cutting the stat box path for Phase A.
5. **Condition type naming** — Clarify whether `textMatchesPattern` is regex or something friendlier. Document the distinction.
6. **Two entry points** — Related to #4. Two paths into the same modal adds UX complexity. Consider starting with per-section icon only, add stat box path later if needed.
