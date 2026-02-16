# Plan: Configurable Extraction Pipeline

## Status: PLANNING — Design complete, implementation not started

---

## The Problem

The extraction pipeline has **17+ hard-coded rules** baked into C#. These fall into two categories:

### Workflow-specific rules (must be removed from code)

| Rule | Location | Hard-coded value | Impact |
|------|----------|-----------------|--------|
| **Heading threshold** | `PdfPagePropertiesService:542` | `bodySize * 1.15` | Controls which elements become section headings. Fails for flat areas (Page Header) and same-size-different-font headings (Itinerary Day 1-5) |
| **Title threshold** | `PdfPagePropertiesService:1420` | `maxFontSize * 0.85` | Legacy method. Tour-specific assumption |
| **Description pattern** | `PdfPagePropertiesService:1425` | `\d+\s*days?\s+from\s+£\d+` | Tailored Travels pricing format |
| **Day pattern** | `PdfPagePropertiesService:1424` | `^Day\s+\d+` | Tailored Travels itinerary structure |
| **Stop patterns** | `PdfPagePropertiesService:1426` | 12 footer keywords | Tailored Travels disclaimer keywords |
| **Sidebar assumption** | `PdfPagePropertiesService:1781` | `pageWidth * 0.35` | Assumes sidebar is < 35% of page |

### Generic PDF rules (keep as defaults, make overridable)

| Rule | Location | Hard-coded value | Type |
|------|----------|-----------------|------|
| Y-tolerance (same line) | `PdfPagePropertiesService:668` | `5.0` pts | Line grouping |
| Font size tolerance | `PdfPagePropertiesService:781` | `0.5` pts | Continuation merging |
| X-alignment tolerance | `PdfPagePropertiesService:782` | `10.0` pts | Continuation merging |
| Column gap fallback | `PdfPagePropertiesService:696` | `40.0` pts | Column detection |
| Column min gap | `PdfPagePropertiesService:885` | `8.0` pts | Column detection |
| Margin exclusion | `PdfPagePropertiesService:881` | `5%` of page width | Column detection |
| Max column boundaries | `PdfPagePropertiesService:923` | `3` | Column detection |
| Area min area | `PdfPagePropertiesService:489-492` | `2%` of page | Area filtering |
| Area min dimensions | `PdfPagePropertiesService:495-496` | `80×40` pts | Area filtering |
| Area max area | `PdfPagePropertiesService:499-500` | `90%` of page | Background filter |
| Bullet character set | `ContentTransformService:19-22` | 12 Unicode chars | Bullet detection |
| Bullet list threshold | `ContentTransformService:128` | `> 50%` bullets | Pattern classification |
| Sub-heading detection | `ContentTransformService:155-162` | `≥ 2`, not majority | Pattern classification |
| Title-casing | `ContentTransformService:270-292` | ALL CAPS → Title Case | Heading transform |

### Legacy methods (still in codebase, from old extraction path)

These exist in `PdfPagePropertiesService.cs` from the pre-area-detection era:

- `ExtractAsMarkdown()` (line ~1390) — old pipeline with hardcoded day/description/stop patterns
- `ExtractSectionFromDocument()` (line ~1520) — old strategy-based extraction
- `ExtractTitleAndDescription()` (line ~1794) — hardcoded title/description patterns
- `DetectMainColumnStart()` (line ~1740) — hardcoded sidebar width assumption

The current pipeline uses `DetectAreas()` → `GroupIntoSections()` → `ContentTransformService.Transform()`. The legacy methods may still have callers (bridge code) but should be migrated to the new pipeline.

---

## The Solution

### Two separate mechanisms, two separate levels

| Level | What it controls | How the user defines it | Storage |
|-------|-----------------|------------------------|---------|
| **Structure** (grouping) | Which elements belong to which section | Drag-and-drop per area | `AreaDefinition.headingRule` in area template |
| **Semantics** (roles) | What role each element plays within a section | Edit Sections modal | `source.json` sectionRules |

These are independent. Structure answers "how are elements grouped?" Semantics answers "within a group, what does each element mean?"

### How it works

1. **Area detection runs** → produces raw elements per area using generic PDF rules
2. **Heading rules applied** → per-area heading rules group elements into sections
3. **Transform runs** → applies pattern detection + assembly to produce Markdown
4. **User sees result** in Extracted tab, corrects via drag-and-drop if needed
5. **Corrections infer rules** → saved to area template → re-detection reflects corrections

### Heading rules replace the hard-coded 1.15 threshold

Currently `GroupIntoSections()` applies one global rule: `fontSize > bodySize * 1.15`. This becomes **per-area, user-defined**. Each area can have:

- **No heading rule** → all elements are peers (flat list). Used for: Page Header, Organiser Info
- **A heading rule** → matching elements start new sections. Used for: Tour Details (headings are 12pt Clarendon at #16549D)
- **The auto-detect default** → `fontSize > bodySize * 1.15` applied only when no explicit rule exists AND the user hasn't explicitly chosen "no headings"

The heading rule is a set of conditions using the same vocabulary as section rules:

```json
{
  "headingRule": {
    "mode": "conditions",
    "conditions": [
      { "type": "fontSizeAbove", "value": 10 },
      { "type": "fontNameContains", "value": "Clarendon" }
    ]
  }
}
```

Or `"mode": "none"` for explicitly flat areas (no headings).

---

## UI: Drag-and-Drop Section Grouping

### Pattern: Block Grid Sort Mode

Following Umbraco's Block Grid Editor sort mode pattern:
- **Section containers** = Layout blocks (named groups)
- **Elements** = Feature blocks (individual content items)
- Drag elements between sections, create new sections, reorder

### Flow

1. Extracted tab shows auto-grouped result (system's best guess using heading rules or auto-detect)
2. User sees a problem — Page Header has false sections, or Itinerary isn't grouped correctly
3. User clicks **"Group Elements"** button on that area's header
4. **Grouping modal opens** (per-area, not whole document):
   - Shows all elements in that area as draggable items
   - Current sections shown as containers
   - Each element shows its text + metadata badges (font size, font name, color)
   - **"Add Section"** button creates a new empty container
   - User drags elements between containers
   - First element in a section can be marked as "heading" (toggle or first-position convention)
5. User clicks **Save**:
   - System examines what the user chose as headings
   - Reads their metadata (font size, font name, color, uppercase)
   - Infers a heading rule from the common pattern
   - Saves heading rule to `AreaDefinition.headingRule` in area template
   - Re-runs area detection with the new rule
   - Extracted tab updates to show corrected grouping
   - Transformed tab reflects the changes

### Grouping modal — per-area scope

The modal shows only elements from one area. This keeps it focused:
- Tour Details: ~33 elements → 4 sections
- Page Header: 3 elements → flat (no sections)
- Organiser Info: 6 elements → flat
- Itinerary: 10 elements → 5 sections (Day 1-5)

Different areas get different rules. That's the whole point of area-level configuration.

### Rule inference from drag-and-drop

When the user marks elements as headings, the system examines their metadata:

**Example: Tour Details area**
User drags FEATURES, WHAT WE WILL SEE, ACCOMMODATION, EXTRAS TO YOUR TOUR into heading positions.

System observes:
- All are 12pt → `fontSizeAbove: 10` (or `fontSizeEquals: 12`)
- All are Clarendon → `fontNameContains: "Clarendon"`
- All are #16549D → `colorEquals: "#16549D"`
- All are UPPERCASE → `textIsUppercase: true`

System generates rule:
```json
{
  "headingRule": {
    "mode": "conditions",
    "conditions": [
      { "type": "fontSizeAbove", "value": 10 },
      { "type": "fontNameContains", "value": "Clarendon" }
    ]
  }
}
```

The system picks the **minimum conditions that uniquely identify headings** vs body elements. It doesn't include all 4 conditions unless needed for disambiguation.

**Example: Itinerary area**
User marks Day 1, Day 2, Day 3, Day 4, Day 5 as headings.

System observes:
- Same font size as body (10.5pt) — can't use font size
- Different font: HelveticaNeue-Medium vs HelveticaNeue → `fontNameContains: "Medium"`
- Different color: #16549D vs #221F1F → `colorEquals: "#16549D"`

System generates:
```json
{
  "headingRule": {
    "mode": "conditions",
    "conditions": [
      { "type": "fontNameContains", "value": "Medium" },
      { "type": "colorEquals", "value": "#16549D" }
    ]
  }
}
```

This correctly identifies the Day headings that the hard-coded 1.15 threshold misses.

---

## Storage

### Area template gets heading rules

`AreaDefinition` already has an unused `headingFont` field. Replace it with a richer `headingRule` property:

```csharp
// AreaTemplate.cs — AreaDefinition
[JsonPropertyName("headingRule")]
public HeadingRule? HeadingRule { get; set; }

// Remove the old unused field
// [JsonPropertyName("headingFont")]
// public string HeadingFont { get; set; }
```

```csharp
// New model
public class HeadingRule
{
    [JsonPropertyName("mode")]
    public string Mode { get; set; } = "auto"; // "auto", "conditions", "none"

    [JsonPropertyName("conditions")]
    public List<RuleCondition>? Conditions { get; set; }
}
```

**Modes:**
- `"auto"` → use the default auto-detect algorithm (fontSize > bodySize * threshold). This is the default when no explicit rule is set.
- `"conditions"` → use the specified conditions to identify headings
- `"none"` → explicitly flat, no headings. All elements are peers.

The `RuleCondition` class already exists in `SectionRules.cs` and can be reused.

### source.json gets generic PDF overrides

```json
{
  "globals": {
    "columnDetection": {
      "enabled": true,
      "thresholdPercent": 0.35
    },
    "pdf": {
      "yTolerance": 5.0,
      "fontSizeTolerance": 0.5,
      "xAlignmentTolerance": 10.0,
      "columnGapFallback": 40.0,
      "columnMinGap": 8.0,
      "marginExclusionPercent": 0.05,
      "maxColumnBoundaries": 3,
      "areaMinAreaPercent": 0.02,
      "areaMinWidth": 80,
      "areaMinHeight": 40,
      "areaMaxAreaPercent": 0.9,
      "autoHeadingThreshold": 1.15
    },
    "transform": {
      "bulletListThreshold": 0.5,
      "minSubHeadings": 2,
      "titleCaseAllCaps": true
    }
  }
}
```

All values have sensible defaults (matching current hard-coded values). Users override only what they need. Most workflows will never touch these.

---

## Backend Changes

### Phase 1: Make GroupIntoSections accept heading rules

**File:** `PdfPagePropertiesService.cs`

Current signature:
```csharp
private static List<DetectedSection> GroupIntoSections(List<AreaElement> elements)
```

New signature:
```csharp
private static List<DetectedSection> GroupIntoSections(
    List<AreaElement> elements,
    HeadingRule? headingRule = null)
```

Logic:
1. If `headingRule?.Mode == "none"` → return all elements as one flat section (no heading)
2. If `headingRule?.Mode == "conditions"` → evaluate conditions against each element, matching ones become headings
3. If `headingRule?.Mode == "auto"` or `headingRule == null` → use the current auto-detect algorithm (bodySize * threshold)

The auto-detect threshold (`1.15`) moves to source.json globals (`autoHeadingThreshold`), passed as a parameter.

### Phase 2: Wire area template heading rules into detection

In `DetectAreas()`, after extracting elements per area, pass the area's heading rule to `GroupIntoSections`:

```csharp
// Find matching area definition from template (if any)
var areaDef = areaTemplate?.Areas.FirstOrDefault(a => /* match by bounds or name */);
var headingRule = areaDef?.HeadingRule;

// Group with heading rule
area.Sections = GroupIntoSections(areaElements[i], headingRule);
```

### Phase 3: Remove legacy hardcoded methods

Once the new pipeline handles all cases:
- Delete `ExtractAsMarkdown()`
- Delete `ExtractSectionFromDocument()`
- Delete `ExtractTitleAndDescription()`
- Delete `DetectMainColumnStart()`
- Update any callers (bridge code) to use the area detection pipeline

### Phase 4: Move generic defaults to source.json

- Read `SourceGlobals.Pdf` config in `DetectAreas()` and pass values to helper methods
- Add `PdfDefaults` model to `SourceConfig.cs`
- All current magic numbers become `config?.Pdf?.YTolerance ?? 5.0` patterns
- Existing behaviour preserved — only the source of values changes

---

## Frontend Changes

### Phase 5: Heading rule on area template (Define Areas)

Extend `AreaDefinition` TypeScript type:

```typescript
interface AreaDefinition {
  name: string;
  bounds: AreaBounds;
  color: string;
  headingRule?: HeadingRule;  // replaces headingFont
  expectedSections: string[];
  notes: string;
}

interface HeadingRule {
  mode: 'auto' | 'conditions' | 'none';
  conditions?: RuleCondition[];
}
```

Remove `headingFont` from all TypeScript types and the area editor modal.

### Phase 6: Grouping modal

**New files:**
- `section-grouping-modal.element.ts` — the drag-and-drop grouping UI
- `section-grouping-modal.token.ts` — modal token

**Modal data:**
```typescript
interface SectionGroupingModalData {
  workflowName: string;
  areaName: string;
  areaIndex: number;
  elements: AreaElement[];           // all elements in this area
  currentSections: DetectedSection[];  // current grouping
  currentHeadingRule?: HeadingRule;    // current rule (if any)
}
```

**Modal value (returned on save):**
```typescript
interface SectionGroupingModalValue {
  headingRule: HeadingRule;
  sections: DetectedSection[];  // the user's explicit grouping (for preview)
}
```

**Modal layout:**
- Sidebar modal (type: 'sidebar', size: 'large')
- Header: "Group Elements — {areaName}"
- Body: sections as containers, elements as draggable items
- Each element shows: text preview + HEADING/LIST ITEM/PARAGRAPH badge + font size + font name + color
- "Add Section" button at the bottom
- Heading toggle per section (first element or explicit toggle)
- Footer: Cancel / Save

**Drag-and-drop:** Use Umbraco's `UmbSorterController` if it supports cross-container sorting. Otherwise use native HTML5 drag-and-drop or a lightweight library. Research needed.

### Phase 7: Entry point on Extracted tab

Add a **"Group Elements"** button on each area header in the Extracted tab. Only shown when the area has elements (not empty areas).

```
v  Tour details                                    33 elements   [Group Elements]
  Section – Features                               8 elements
    FEATURES          HEADING  12pt  Clarendon  ...
```

Clicking opens the grouping modal for that specific area.

After the modal saves:
1. Heading rule saved to area template via PUT `/updoc/workflows/{name}/area-template`
2. Area detection re-runs via POST `/updoc/workflows/{name}/area-detection`
3. Transform re-runs via POST `/updoc/workflows/{name}/transform`
4. Source tab refreshes with updated data

---

## Relationship to Existing Features

### Edit Sections (section rules)

**Not replaced.** Edit Sections operates WITHIN a section to assign semantic roles. Group Elements operates ABOVE sections to control how elements are grouped in the first place.

```
Group Elements  →  "These elements form a section, with this heading"
Edit Sections   →  "Within this section, 'Robin Linnecar' is the name, 'Tel: ...' is the phone"
```

Both use the same `RuleCondition` vocabulary. Both are defined via interactive selection (not manual rule authoring). They just operate at different levels of the hierarchy.

### Define Areas

Define Areas stays focused on spatial boundaries. Heading rules are set via Group Elements, not in the Define Areas modal. This separation keeps each modal focused:

- **Define Areas** → "Where on the page is content?" (spatial)
- **Group Elements** → "How is content structured within an area?" (logical)
- **Edit Sections** → "What role does each element play?" (semantic)

### Transformed tab

The Transformed tab shows the OUTPUT after all rules are applied. It benefits from better grouping but doesn't need changes — it already consumes the area detection result.

---

## Concrete Example: Group Tour PDF

### Before (current, hard-coded)

| Area | Heading detection | Result | Problem |
|------|------------------|--------|---------|
| Page Header | `1.15` threshold | 3 elements → 2 false sections + 1 preamble | "The Art & History" and "5 days from..." are NOT headings |
| Organiser Info | `1.15` threshold | 6 elements → 1 flat section | Correct (by accident — all have varied sizes) |
| Tour Details | `1.15` threshold | 33 elements → 4 sections | Correct (headings are 41% larger) |
| Itinerary | `1.15` threshold | 10 elements → 1 flat section | **Wrong** — Day 1-5 should be headings but are same font size |

### After (configurable)

| Area | Heading rule | Result | How defined |
|------|-------------|--------|-------------|
| Page Header | `mode: "none"` | 3 peer elements | User drags all into one flat group |
| Organiser Info | `mode: "none"` | 6 peer elements | User confirms flat structure |
| Tour Details | `fontSizeAbove: 10, fontNameContains: "Clarendon"` | 4 sections (Features, What We Will See, Accommodation, Extras) | System inferred from user marking headings |
| Itinerary | `fontNameContains: "Medium", colorEquals: "#16549D"` | 5 sections (Day 1-5) | System inferred — font name + color distinguish days from body |

---

## Implementation Sequence

| Phase | What | Scope | Dependencies |
|-------|------|-------|-------------|
| **1** | Backend: `GroupIntoSections` accepts `HeadingRule` | C# only | None |
| **2** | Backend: Wire area template rules into detection | C# only | Phase 1 |
| **3** | Frontend: Replace `headingFont` with `headingRule` type | TS types | Phase 2 |
| **4** | Frontend: "Group Elements" button on Extracted tab | Source view | Phase 3 |
| **5** | Frontend: Grouping modal (drag-and-drop) | New modal | Phase 4 |
| **6** | Backend: Rule inference from user grouping | C# endpoint | Phase 5 |
| **7** | Backend: Move generic defaults to source.json globals | C# + JSON | Independent |
| **8** | Cleanup: Remove legacy hardcoded methods | C# | Phase 2 verified |

**Phases 1-3** can be done quickly — they're model/logic changes with no new UI.
**Phases 4-6** are the main UI work — the grouping modal.
**Phases 7-8** are independent cleanup tasks.

---

## Open Questions

1. **UmbSorterController for cross-container drag?** Need to research whether Umbraco's built-in sorter supports dragging items between containers (like Block Grid sort mode does). If not, we'll need HTML5 drag-and-drop or a library.

2. **Rule inference algorithm — how smart?** Should the system find the minimum distinguishing conditions (complex but elegant) or just capture all metadata from the heading elements (simple but over-specified)? Starting with "capture all, let user edit" is safer.

3. **What happens when a new PDF has a slightly different heading font?** The rule `fontNameContains: "Clarendon"` would still match "GHEALP+Clarendon" and "ABCDE+Clarendon" (PDF font subsetting changes the prefix). The `Contains` operator handles this naturally.

4. **Should the auto-detect mode try multiple thresholds?** Instead of a fixed 1.15, could it try progressively lower thresholds and pick the one that produces the most "reasonable" grouping? This is future optimisation — start with the simple configurable approach.

5. **Grouping modal vs inline editing?** Block Grid uses inline sort mode (no modal). Should we consider an inline mode on the Extracted tab instead of a modal? Decision: start with modal (clearer UX boundary, simpler to implement), consider inline as future polish.

---

## What Does NOT Change

- **Areas are still spatial** — drawn on the PDF page in Define Areas
- **Section rules still work** — Edit Sections for within-section semantic roles
- **Map tab wiring** — sections are wired to destination fields, same as today
- **Transform service** — consumes area detection output, benefits from better grouping
- **Bridge code** — reads transform output for document creation, unaffected
- **Area detection output format** — same JSON structure (pages → areas → sections → elements)

---

## Verification

1. **Phase 1-2:** Run area detection on Group Tour PDF. With no explicit heading rules, behaviour matches current (auto-detect with 1.15 threshold). With `mode: "none"` on Page Header area, all 3 elements become one flat section (no false headings).

2. **Phase 5-6:** Open Group Elements modal for Tour Details area. Drag FEATURES, WHAT WE WILL SEE, ACCOMMODATION, EXTRAS into heading positions. Save. Verify heading rule is inferred and saved. Verify area detection re-runs and produces 4 correct sections.

3. **Phase 5-6:** Open Group Elements modal for Itinerary area. Mark Day 1-5 as headings. Save. Verify the system infers `fontNameContains: "Medium"` (not font size, since all are 10.5pt). Verify 5 sections produced.

4. **Phase 7:** Override `autoHeadingThreshold` in source.json globals. Verify the threshold changes affect auto-detect behaviour.

5. **End-to-end:** Create from Source with the configured workflow. Verify document creation uses correctly grouped sections for content mapping.
