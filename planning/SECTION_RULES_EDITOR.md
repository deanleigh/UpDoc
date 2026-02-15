# Plan: Section Rules Editor ("Edit Sections")

## Status: PLANNING — Implementation plan ready, not started

---

## Concept

The **Edit Sections** button sits in the Sections stat box on the Source tab (alongside Source, Pages, Areas). It opens a focused editor for defining the internal structure of individual sections using rules.

### The Problem It Solves

The transform layer groups raw extracted elements into sections (e.g., "Organiser Info" with 6 text elements). But the destination might need those elements as separate, individually-mappable pieces:

- A block with `title`, `description`, `richText` properties
- Document-type fields like `contactName`, `contactTel`, `contactEmail`
- A block list with repeating structured items

Without section rules, the entire section is one blob of content — mappable only to a single rich text field. With section rules, each element within a section gets a **role** that corresponds to a destination property.

### Where It Fits in the Pipeline

```
Extract (raw elements with metadata)
    ↓
Shape — Areas (spatial zones on PDF)     ← Edit Areas
    ↓
Shape — Sections (semantic grouping)     ← Edit Sections ★ THIS
    ↓
Map (wire named pieces → destination)    ← Map tab
```

Each layer does one thing:
- **Edit Areas** = "Where on the page is this content?" (spatial)
- **Edit Sections** = "What IS this content?" (semantic, rules-based)
- **Map tab** = "Where does it GO?" (pure wiring, no rules)

---

## Design Principles

### 1. Small scope, per-section

Rules are defined per section, not per document. A section like "Organiser Info" has maybe 3-6 elements. The entire rule set for that section might be 3-4 rules. This keeps the editor focused and manageable.

Many sections won't need rules at all — "Features" as a bullet list maps directly to a single rich text field. Edit Sections is only needed when you want to break a section into individually-addressable pieces.

### 2. Section structure mirrors destination structure

The roles you define in Edit Sections correspond to properties in the destination:

| Section Role | Destination Example |
|-------------|-------------------|
| `title` | Block → featureTitle property |
| `description` | Block → featureDescription property |
| `content` | Block → richTextContent property |
| `name` | Document → contactName field |
| `telephone` | Document → contactTel field |
| `email` | Document → contactEmail field |

The role names are user-defined (free text), not a fixed vocabulary. The Map tab then wires `section.role → destination.property`.

### 3. Rules define how to identify roles

Rules use conditions based on element metadata to assign roles automatically across all PDFs in the workflow (not just the sample):

| Condition Type | Code Name | Example | Source Types |
|---------------|-----------|---------|-------------|
| Text begins with | `textBeginsWith` | "Tel:", "Email:", "Day " | All |
| Text ends with | `textEndsWith` | ".com", ".co.uk" | All |
| Text contains | `textContains` | "phone", "@" | All |
| Text matches pattern | `textMatchesPattern` | `\d{3,4}\s\d{3,4}\s\d{4}` (phone) | All |
| Font size equals | `fontSizeEquals` | 20pt (heading) | PDF |
| Font size above | `fontSizeAbove` | ≥ 20pt | PDF |
| Font size below | `fontSizeBelow` | ≤ 10pt (fine print) | PDF |
| Font name contains | `fontNameContains` | "Helvetica-Bold", "Clarendon" | PDF |
| Color equals | `colorEquals` | #FFD200 (gold heading) | PDF |
| Position first | `positionFirst` | First element in section | All |
| Position last | `positionLast` | Last element in section | All |
| Heading level | *(future)* | h1, h2, h3 | Markdown, Word |
| CSS selector | *(future)* | `.contact-name` | Web |

### 4. Outlook rules pattern for the UI

Inspired by Outlook's email rules (screenshot reference provided by user):

```
Section: Organiser Info                    [6 elements]

┌─────────────────────────────────────────────────────┐
│ Rule 1: "Organiser Name"                            │
│                                                     │
│  ✅ Add a condition                                 │
│  ┌──────────────────┐ ┌──────────────────────────┐  │
│  │ Font size equals ▼│ │ 20pt              ×     │  │
│  └──────────────────┘ └──────────────────────────┘  │
│  ┌──────────────────┐ ┌──────────────────────────┐  │
│  │ Color equals     ▼│ │ #FFD200           ×     │  │
│  └──────────────────┘ └──────────────────────────┘  │
│  + Add another condition                            │
│                                                     │
│  ✅ Matched element: "Robin Linnecar"      ← live  │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Rule 2: "Telephone"                                 │
│                                                     │
│  ✅ Add a condition                                 │
│  ┌──────────────────┐ ┌──────────────────────────┐  │
│  │ Text begins with ▼│ │ Tel:              ×     │  │
│  └──────────────────┘ └──────────────────────────┘  │
│  + Add another condition                            │
│                                                     │
│  ✅ Matched element: "Tel: 020 8942 1558"  ← live  │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Rule 3: "Email"                                     │
│                                                     │
│  ✅ Add a condition                                 │
│  ┌──────────────────┐ ┌──────────────────────────┐  │
│  │ Text begins with ▼│ │ Email:            ×     │  │
│  └──────────────────┘ └──────────────────────────┘  │
│  + Add another condition                            │
│                                                     │
│  ✅ Matched element: "Email: linnecar@..."  ← live │
│                                                     │
├─────────────────────────────────────────────────────┤
│  + Add another rule                                 │
│                                                     │
│  Unmatched elements: 3                              │
│  • "For more information on this tour..."           │
│  • ".............................."                  │
│  • "81 Alric Avenue, New Malden KT3 4JP"           │
└─────────────────────────────────────────────────────┘
```

Key UI features:
- **Live matching** — as you define conditions, the matched element from the sample extraction is shown immediately
- **Unmatched elements** — elements not claimed by any rule are listed at the bottom (can be ignored or assigned)
- **Auto-populate** — clicking an unmatched element pre-fills conditions from its metadata (like Outlook pre-fills "From = sender" when you create a rule from an email). Heuristic: include font size if unusual vs section peers, color if unusual, text prefix if contains ":"
- **Add another condition** — multiple conditions AND together (element must match all)
- **"Create rule from this"** — shortcut on unmatched elements to start a new rule with auto-populated conditions
- **First-match-wins ordering** — rules evaluated top-to-bottom; an element claimed by one rule is excluded from later rules

### 5. Auto-population from sample extraction

When the user clicks an element to create a rule, conditions auto-populate from its metadata:

**Clicking "Robin Linnecar" (20pt, Clarendon, #FFD200) auto-fills:**
- Font size equals: 20pt
- Font name: GHEALP+Clarendon
- Color: #FFD200

The user reviews these, keeps what's useful, removes what's too specific (maybe font name varies but color is consistent), and names the role.

**"Unusual" heuristic:** Compare the clicked element's metadata against other elements in the same section. If font size differs from the majority, add `fontSizeEquals`. If color differs, add `colorEquals`. If text contains ":", add `textBeginsWith` with the prefix.

### 6. Rules are portable across PDFs

Because rules use metadata conditions (not positional element IDs), they work across different PDFs in the same workflow. Every Group Tour PDF has an organiser section with a name in bold gold, a line starting "Tel:", and a line starting "Email:". The rules match regardless of which specific person's details are listed.

---

## Sections That Don't Need Rules

Most sections work fine without any rules:

| Section | Why No Rules Needed |
|---------|-------------------|
| Features | Bullet list → maps as one rich text block |
| What We Will See | Bullet list → maps as one rich text block |
| Itinerary days | Already separate sections per day |
| Page Header | Title + subtitle already distinct by font size |

Edit Sections is only needed when:
1. A section contains multiple pieces that need to map to **different destination properties**
2. The pieces aren't already split into separate sections by the transform layer

---

## How It Connects to Mapping

After Edit Sections, the section has named sub-parts:

```
Section: Organiser Info
├── organiser-name: "Robin Linnecar"
├── organiser-tel: "Tel: 020 8942 1558"
├── organiser-email: "Email: linnecar@btinternet.com"
└── (unmatched): "For more information...", "81 Alric Avenue..."
```

The Map tab then shows these as mappable sources:

| Source | → | Destination |
|--------|---|-------------|
| Organiser Info > Organiser Name | → | Contact Block > Name |
| Organiser Info > Telephone | → | Contact Block > Telephone |
| Organiser Info > Email | → | Contact Block > Email |

Unmatched elements can be:
- Mapped as a group to a single "other info" field
- Excluded entirely (not mapped)
- Given their own rules later

---

## Destination Type Flexibility

Section rules work regardless of destination type:

### Block Grid / Block List destination
Section roles map to block properties:
- `title` → Block → Title property
- `content` → Block → Rich Text property

### Document-type field destination
Section roles map to document fields:
- `organiser-name` → Document → contactName
- `organiser-tel` → Document → contactTelephone

### Single rich text destination
No rules needed — the whole section maps as one piece of content.

The section rules don't know or care about the destination. They just create named, addressable pieces. The Map tab handles the wiring.

---

## Storage

Section rules are stored in `source.json` as a top-level `sectionRules` dictionary, keyed by transform section ID:

```json
{
  "sourceType": "pdf",
  "sectionRules": {
    "preamble-p1-z1": {
      "rules": [
        {
          "role": "organiser-name",
          "conditions": [
            { "type": "fontSizeEquals", "value": 20 },
            { "type": "colorEquals", "value": "#FFD200" }
          ]
        },
        {
          "role": "organiser-tel",
          "conditions": [
            { "type": "textBeginsWith", "value": "Tel:" }
          ]
        },
        {
          "role": "organiser-email",
          "conditions": [
            { "type": "textBeginsWith", "value": "Email:" }
          ]
        }
      ]
    }
  }
}
```

**Why a dictionary (not nested in sections array):** The old `sections` array in source.json is vestigial extraction strategies from an earlier architecture. Section rules are keyed by transform section ID (e.g., `"preamble-p1-z1"`, `"features"`) and live alongside existing source config without modifying the old structure.

Rules live in the source config because they are source-type-specific (PDF conditions differ from Web conditions). The map.json references roles by name, agnostic of how they were identified.

---

## Resolved Design Questions

| Question | Decision |
|----------|----------|
| Multiple matches per rule | Take first match, show warning if ambiguous |
| Rule ordering | First-match-wins across rules (element claimed = excluded from later rules) |
| Transform interaction | Layer on top — parent section keeps full content, sub-parts are additional entries |
| Unmatched elements | Remain in parent section's Content, visible in rules editor |
| Testing across PDFs | Defer to Phase C (future) |

---

## Implementation Plan

### Prerequisites
- Zone detection and transform layer working (COMPLETE)
- Sample extraction stored in workflow folder (COMPLETE)
- Edit Areas UI working (COMPLETE)

### Phase A: Rules Editor (UI + Storage)

#### A1. C# Models — `src/UpDoc/Models/SectionRules.cs` (NEW)

```
SectionRuleSet         → { rules: SectionRule[] }
SectionRule            → { role: string, conditions: RuleCondition[] }
RuleCondition          → { type: string, value: string|number }
```

Condition types: `textBeginsWith`, `textEndsWith`, `textContains`, `textMatchesPattern`, `fontSizeEquals`, `fontSizeAbove`, `fontSizeBelow`, `fontNameContains`, `colorEquals`, `positionFirst`, `positionLast`

#### A2. SourceConfig change — `src/UpDoc/Models/SourceConfig.cs` (MODIFY)

Add property:
```csharp
[JsonPropertyName("sectionRules")]
public Dictionary<string, SectionRuleSet>? SectionRules { get; set; }
```

Keyed by transform section ID (e.g., `"preamble-p1-z1"`, `"features"`). Lives in source.json alongside existing config.

#### A3. API Endpoint — `src/UpDoc/Controllers/WorkflowController.cs` (MODIFY)

One new endpoint:

- **PUT `{name}/section-rules`** — Accepts `Dictionary<string, SectionRuleSet>`, patches source.json's `sectionRules` key, saves.

No evaluate endpoint needed — rule evaluation is client-side in Phase A (condition matching against elements already loaded in the modal).

#### A4. TypeScript Types — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` (MODIFY)

Add section rules types and update `SourceConfig` interface with optional `sectionRules` property.

#### A5. Workflow Service — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.service.ts` (MODIFY)

Add `saveSectionRules(workflowName, sectionRules, token)` function.

#### A6. Modal Token — `section-rules-editor-modal.token.ts` (NEW)

```typescript
Data: { workflowName, sectionId, sectionHeading, elements: ZoneElement[], existingRules }
Value: { rules: SectionRuleSet }
```

Type: sidebar, size: medium. Elements passed in from the Source tab (already loaded in `_zoneDetection` state).

#### A7. Modal Element — `section-rules-editor-modal.element.ts` (NEW)

The rules editor UI using the Outlook rules pattern:

- **Rule cards**: Role name input + condition rows (type dropdown + value input + remove) + live matched element preview
- **Auto-populate**: Click an unmatched element → new rule card with conditions pre-filled from its metadata (font size if unusual, color if unusual, text prefix if contains ":")
- **Client-side evaluation**: As conditions change, re-evaluate all rules against the elements in memory. Show matched element per rule (green) or "No match" (amber). Unmatched elements listed at bottom.
- **"Add another rule"** button and **"Create rule from this"** on unmatched elements
- **Rule ordering**: First-match-wins. An element claimed by one rule cannot match subsequent rules. Rules evaluated top-to-bottom.

#### A8. Manifest — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/manifest.ts` (MODIFY)

Register the new modal.

#### A9. Source Tab — `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` (MODIFY)

Entry point: **per-section settings icon** on Transformed view section cards. Sections with rules show a "N rules" badge. Click opens the rules editor directly for that section.

**Section → Elements lookup**: The source view already has `_zoneDetection` loaded. To find elements for a transform section:
- Sections with headings: search zone detection for a section whose heading text normalizes to the same kebab-case ID (`NormalizeToKebabCase` logic replicated in TS)
- Preamble sections: parse `preamble-p{page}-z{zoneIndex}` from the ID

**Note:** The Sections stat box "Edit Sections" button (a second entry point via section picker popover) is deferred. The per-section icon is the natural entry point — adding the stat box path later if needed avoids unnecessary UX complexity.

### Phase B: Pipeline Integration (deferred to next branch)

#### B1. TransformedSection model — add `parentSectionId?: string` and `roleLabel?: string`

#### B2. ContentTransformService — accept section rules, produce sub-part entries

After assembling a standard section, if rules exist for that section ID:
- Run evaluation against the DetectedSection's children
- For each matched rule, emit an additional TransformedSection with:
  - `Id` = `{parentId}.{role}` (e.g., `preamble-p1-z1.organiser-name`)
  - `Content` = matched element text
  - `Pattern` = `"ruleMatch"`
  - `ParentSectionId` = parent's ID

#### B3. C# Rule Evaluator — `SectionRuleEvaluator.cs` (NEW)

Same condition matching logic as the client-side TS version, for use by the transform service.

#### B4. Transform endpoints — pass section rules through

#### B5. Source tab Transformed view — render sub-parts nested under parent sections

#### B6. Bridge — no changes needed (sub-parts are regular TransformedSections, appear naturally in sectionLookup)

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
| `src/UpDoc/wwwroot/.../up-doc-workflow-source-view.element.ts` | MODIFY (per-section edit icon) | A |
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
4. **Entry points** — Start with per-section icon only (A9). The stat box "Edit Sections" button is deferred to avoid two paths into the same modal adding unnecessary complexity.
5. **Condition type naming** — `textMatchesPattern` is regex. Document that clearly in UI (e.g., "Text matches regex pattern"). Consider a friendlier label but keep regex power.
