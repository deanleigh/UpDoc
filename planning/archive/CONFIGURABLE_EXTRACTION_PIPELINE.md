# Plan: Configurable Extraction Pipeline

## Status: DESIGN REVISED — Teach-by-example approach agreed, planning doc updated

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

### Legacy methods (CONFIRMED DEAD — zero callers, safe to delete)

These exist in `PdfPagePropertiesService.cs` from the pre-area-detection era. **Audit confirmed (Feb 2026):** none have frontend callers. The bridge code was switched to `extractRich()` in Phase 4c. These are dead code.

- `ExtractAsMarkdown()` (line ~1390) — old pipeline with hardcoded day/description/stop patterns. Controller endpoint `GET extract-markdown` exists but nothing calls it.
- `ExtractMarkdownFromDocument()` — called only by `ExtractAsMarkdown`
- `ExtractSectionFromDocument()` (line ~1520) — called only by `ExtractAsMarkdown`
- `ExtractTitleAndDescription()` (line ~1794) — called only within the `ExtractAsMarkdown` chain
- `DetectMainColumnStart()` (line ~1740) — called only within the `ExtractAsMarkdown` chain
- `ExtractSections(string, PdfExtractionRules)` — marked `[Obsolete]`, zero callers
- `PdfExtractionRules` model in `MapFileModels.cs` — only referenced by the obsolete method

The current active pipeline is `DetectAreas()` → `GroupIntoSections()` → `ContentTransformService.Transform()`. These legacy methods are scheduled for deletion in Branch 4.

---

## Design Principles

### No hard-coded content rules

Every PDF is designed differently. Headings in one PDF might be large bold text; in another they might be small coloured text in a box. There are NO universal visual heuristics that work across all PDFs. The system must make **zero assumptions** about how any specific PDF is structured.

What stays: PdfPig's low-level extraction (words → lines → elements with metadata). This is generic PDF processing — it reads what's there without interpreting it.

What goes: everything that interprets meaning — heading detection thresholds, content patterns, stop patterns, sidebar assumptions. All of these are replaced by user-defined configuration via teach-by-example.

### Areas contain similar content

The user's job when drawing areas is to group **visually similar content** together. An area should contain content that follows the same structural pattern — same heading style, same body style, same layout.

This is the key insight: **the area IS the scope for rules.** Within an area, content is visually consistent. So area-level rules make sense — define the pattern once per area, and it applies to all elements in that area.

### Teach by example

The user never writes rules directly. Instead they point at examples:
- "This element is a section heading" → system captures its metadata
- "These elements are list items" → system captures their metadata
- System generalises from the examples and applies the pattern across the area

This is the Outlook rules analogy: select an email, create a rule, Outlook pre-fills the conditions from the selected email's metadata.

### Two separate concerns at two separate levels

| Concern | Level | What it does | How the user defines it |
|---------|-------|-------------|------------------------|
| **Section grouping** | Per area | Groups elements into sections | User clicks an element to identify it as a section heading. System finds all matching elements and groups: heading + following body = one section. |
| **Heading formatting** | Per section | Identifies which elements within a section render as headings (H2, H3, etc) in markdown output | Per-section heading rules, or handled by Edit Sections / transform layer |

These are independent:
- **Section grouping** answers: "How is content divided into sections within this area?"
- **Heading formatting** answers: "Within a section, which elements should render as headings in the markdown?"

**Critical distinction:** Section headings CREATE section boundaries. Sub-headings within a section are formatting only — they do NOT split the section. Example: Day 1-5 in the Itinerary are sub-headings (H3 formatting) within one section, not 5 separate sections.

---

## The Solution: Teach-by-Example Section Grouping

### How it works

1. **Area detection runs** → produces raw elements per area using generic PDF rules
2. **Elements shown to user** on Extracted tab — flat list per area, no auto-grouping
3. **User teaches structure per area** by clicking example elements:
   - "This is a section heading" → system captures metadata, finds matches, proposes grouping
   - Or: "No section headings in this area" → all elements stay as one flat section
4. **System groups elements into sections** based on the pattern: each section heading + following non-heading elements = one section
5. **Section pattern saved** to area template → applied to future extractions of same-layout PDFs
6. **Transform runs** → produces Markdown from the grouped sections

### User flow on Extracted tab

**For an area with repeating sections (Tour Details, 33 elements):**

1. User expands Tour Details area, sees 33 elements with metadata badges
2. Clicks **"Define Structure"** button on the area header
3. Area enters teach mode — elements become clickable
4. User clicks FEATURES → system highlights it as a section heading
5. System immediately scans all elements: "Found 3 more elements matching this pattern: WHAT WE WILL SEE, ACCOMMODATION, EXTRAS TO YOUR TOUR"
6. All 4 highlighted. User confirms.
7. System groups: each heading + following elements until the next heading = one section
8. Result: 4 sections, each with a heading and body elements. Section pattern saved.

**For a flat area (Page Header, 3 elements):**

1. User expands Page Header area, sees 3 elements
2. Clicks "Define Structure"
3. Clicks "No section headings" (or just confirms without selecting any heading)
4. Result: 1 flat section containing all 3 elements

**For an area with sub-headings (Itinerary, 10 elements):**

1. User expands Itinerary area, sees 10 elements
2. Clicks "Define Structure"
3. Decides this is one section of content — clicks "No section headings"
4. Result: 1 section containing all 10 elements
5. Day 1-5 are handled downstream — Edit Sections can mark them as sub-headings for H3 formatting, or the transform layer detects them via pattern detection

### Rule inference from user selection

When the user clicks an element as a section heading, the system examines its metadata and the metadata of all other elements in the area to find distinguishing conditions.

**Example: Tour Details area**

User clicks FEATURES. System reads its metadata:
- fontSize: 12, fontName: "Clarendon", color: "#16549D", text: "FEATURES"

System compares with non-heading elements:
- fontSize: 10, fontName: "Helvetica", color: "#221F1F"

System finds minimum distinguishing conditions:
```json
{
  "sectionPattern": {
    "conditions": [
      { "type": "fontNameContains", "value": "Clarendon" }
    ]
  }
}
```

One condition is enough to uniquely identify the section headings. System applies it, finds 4 matches (FEATURES, WHAT WE WILL SEE, ACCOMMODATION, EXTRAS), proposes 4 sections.

**Example: A PDF where headings are smaller than body text**

Some PDFs have small coloured headings above large body text. The system doesn't care — the user clicks one, the system reads `fontSize: 8, color: "#FF0000"`, finds the distinguishing condition is `colorEquals: "#FF0000"`, and groups accordingly.

No assumptions about what headings "should" look like. The user defines what they look like by pointing at one.

---

## Storage

### Area template gets section patterns

`AreaDefinition` currently has an unused `headingFont` field. Replace it with `sectionPattern`:

```csharp
// AreaTemplate.cs — AreaDefinition
[JsonPropertyName("sectionPattern")]
public SectionPattern? SectionPattern { get; set; }

// Remove the old unused field
// [JsonPropertyName("headingFont")]
// public string HeadingFont { get; set; }
```

```csharp
// New model
public class SectionPattern
{
    /// <summary>
    /// Conditions that identify section heading elements.
    /// Elements matching ALL conditions become section boundaries.
    /// Each heading + following non-heading elements = one section.
    /// Null or empty = one flat section (no grouping).
    /// </summary>
    [JsonPropertyName("conditions")]
    public List<RuleCondition>? Conditions { get; set; }
}
```

The `RuleCondition` class already exists in `SectionRules.cs` and is reused.

**No "mode" field needed.** The presence/absence of conditions is sufficient:
- `sectionPattern: null` or not present → area not yet configured (use auto-detect for backwards compatibility during transition)
- `sectionPattern: { conditions: [] }` → explicitly no section headings (flat)
- `sectionPattern: { conditions: [...] }` → use conditions to identify section headings

### Per-section heading formatting

Heading formatting rules within sections are a separate concern. They control which elements render as H2/H3/etc in the markdown output. This is already partially handled by:
- **Edit Sections** (existing) — assigns semantic roles to elements within sections
- **Transform service** (existing) — pattern detection identifies sub-headings

No new storage needed for this. The existing infrastructure handles it.

### source.json gets generic PDF overrides (future, independent)

```json
{
  "globals": {
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
      "areaMaxAreaPercent": 0.9
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

Note: `autoHeadingThreshold` is NOT included — there is no auto-heading threshold in the new design. Section grouping is always user-defined.

---

## Concrete Example: Group Tour PDF

### Before (current, hard-coded)

| Area | Detection | Result | Problem |
|------|----------|--------|---------|
| Page Header | `1.15` threshold auto-splits | 3 elements → 2 false sections + 1 preamble | "The Art & History" and "5 days from..." are NOT section boundaries |
| Organiser Info | `1.15` threshold | 6 elements → 1 flat section | Correct by accident |
| Tour Details | `1.15` threshold | 33 elements → 4 sections | Correct by accident (headings happen to be 41% larger) |
| Itinerary | `1.15` threshold | 10 elements → 1 flat section | Correct structure (1 section), but Day 1-5 sub-headings not formatted |

### After (teach-by-example)

| Area | User action | Section pattern | Result |
|------|-----------|----------------|--------|
| Page Header | "No section headings" | `conditions: []` | 1 flat section, 3 elements |
| Organiser Info | "No section headings" | `conditions: []` | 1 flat section, 6 elements |
| Tour Details | Clicks FEATURES as section heading | `fontNameContains: "Clarendon"` | 4 sections (Features, What We Will See, Accommodation, Extras) |
| Itinerary | "No section headings" | `conditions: []` | 1 section, 10 elements. Day 1-5 formatted as H3 by transform/Edit Sections |

---

## Relationship to Existing Features

### Edit Sections (section rules)

**Not replaced.** Edit Sections operates WITHIN a section to assign semantic roles. Section patterns operate ABOVE sections to control how elements are grouped in the first place.

```
Define Areas      → "Where on the page is content?" (spatial)
Define Structure  → "How is content divided into sections?" (structural)
Edit Sections     → "What role does each element play?" (semantic)
```

All three use the same `RuleCondition` vocabulary. All are defined via interactive selection (teach by example, not manual rule authoring). They operate at different levels of the hierarchy.

### Transformed tab

The Transformed tab shows the OUTPUT after all rules are applied. It benefits from better grouping but doesn't need changes — it already consumes the area detection result.

### Bridge code (Create from Source)

Reads transform output for document creation. Unaffected by how sections are defined — it just consumes the result.

---

## Implementation Strategy

### Safety Principle

**Nothing changes for existing workflows until the user explicitly defines structure.** Each branch adds new capability alongside the existing code. Until the user clicks "Define Structure" and saves, the current auto-detect behaviour (`bodySize * 1.15`) is preserved for backwards compatibility.

This is critical because the project has weeks of investment. We cannot risk a flag day where everything switches over.

### Dead Code Analysis (Feb 2026)

Before planning the branches, we audited all legacy extraction methods:

**Completely dead — zero frontend callers:**
- `ExtractAsMarkdown()` — controller endpoint `GET extract-markdown` exists but no frontend code calls it
- `ExtractSectionFromDocument()` — only called within `ExtractAsMarkdown`
- `ExtractTitleAndDescription()` — only called within `ExtractAsMarkdown`
- `DetectMainColumnStart()` — only called within `ExtractAsMarkdown`
- `ExtractSections(string, PdfExtractionRules)` — marked `[Obsolete]`, zero callers
- `PdfExtractionRules` model in `MapFileModels.cs` — only referenced by the obsolete method

**Active pipeline (what's actually used):**
- `ExtractSectionsFromConfig()` — called from `GET extract-sections` endpoint
- `ExtractRich()` / `DetectAreas()` / `GroupIntoSections()` — the area detection pipeline

**Decision:** Dead code is removed last (Branch 4), after all new functionality is proven.

### headingFont → sectionPattern Transition

The existing `AreaDefinition.HeadingFont` property (C# `string`, TS `string`) exists in:
- `AreaTemplate.cs:52` — C# model
- `workflow.types.ts:394` — TypeScript type
- `pdf-area-editor-modal.element.ts` — Define Areas modal (passes through)
- `area-template.json` (test site) — all 4 areas have `"headingFont": ""`

**All saved values are empty strings.** No data to preserve. The field was added as a placeholder but never populated by users or code. The transition is:
1. C#: Replace `HeadingFont` (string) with `SectionPattern` (SectionPattern?) on `AreaDefinition`
2. TS: Replace `headingFont: string` with `sectionPattern?: SectionPattern` on `AreaDefinition`
3. JSON: Old files with `"headingFont": ""` will be ignored by `System.Text.Json` (unknown property) — no migration needed, no errors
4. New files will have `"sectionPattern": null` (not yet configured) or a populated pattern

### Branch Strategy (4 branches, sequential)

Each branch is a complete, testable increment that leaves the project in a working state.

---

#### Branch 1: `feature/section-pattern-backend`
**Scope:** C# model + `GroupIntoSections` accepts section pattern + wire into `DetectAreas`

**Changes:**
1. Add `SectionPattern` model class (reuses existing `RuleCondition` from `SectionRules.cs`)
2. Replace `AreaDefinition.HeadingFont` (string) with `AreaDefinition.SectionPattern` (SectionPattern?)
3. Change `GroupIntoSections()` to accept optional `SectionPattern?` parameter:
   - `null` → backwards-compatible auto-detect (`bodySize * 1.15`), used until user configures
   - Empty conditions `[]` → one flat section (no grouping)
   - Populated conditions → evaluate against each element, matching ones become section boundaries
4. In `DetectAreas()`, read area definition's section pattern, pass to `GroupIntoSections()`
5. Add rule inference endpoint: `POST /updoc/workflows/{name}/infer-section-pattern`
   - Takes: area index + element ID that user clicked as section heading
   - Reads metadata of that element + all other elements in the area
   - Returns: proposed `SectionPattern` (minimum distinguishing conditions) + list of all matching element IDs
6. Since no saved area templates have section patterns yet, **output is identical to current**

**Files modified:**
- `src/UpDoc/Models/AreaTemplate.cs` — replace HeadingFont with SectionPattern
- `src/UpDoc/Models/SectionPattern.cs` (new) — SectionPattern class
- `src/UpDoc/Services/PdfPagePropertiesService.cs` — GroupIntoSections + DetectAreas
- `src/UpDoc/Controllers/WorkflowController.cs` — infer-section-pattern endpoint

**Verification:**
- Run area detection on Group Tour PDF — output identical to current (no section patterns configured)
- Call infer-section-pattern with a Tour Details heading element ID → verify it returns `fontNameContains: Clarendon` and finds 4 matches
- Manually set section pattern on Tour Details area in area-template.json → verify 4 sections created
- Manually set empty conditions on Page Header area → verify 1 flat section

**Risk:** LOW — additive change with default that preserves current behaviour

---

#### Branch 2: `feature/define-structure-ui`
**Scope:** Frontend types + "Define Structure" inline teach-by-example UI on Extracted tab

**Changes:**
1. Replace `headingFont: string` with `sectionPattern?: SectionPattern` in `workflow.types.ts`
2. Update `pdf-area-editor-modal.element.ts` — remove headingFont references
3. Add "Define Structure" button on each area header in Extracted tab
4. Implement teach-by-example flow:
   - Enter teach mode → elements become clickable
   - User clicks element → call infer-section-pattern endpoint
   - Show matches highlighted, ask user to confirm
   - On confirm → save section pattern to area template, re-run detection + transform
   - "No section headings" option → save empty conditions
5. Build frontend

**Files modified:**
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` — type change
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/pdf-area-editor-modal.element.ts` — remove headingFont
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — Define Structure button + teach mode

**Verification:**
- Tour Details area: click FEATURES → system highlights 4 matches → confirm → 4 sections created
- Page Header area: click "No section headings" → 1 flat section
- Itinerary area: click "No section headings" → 1 section with 10 elements
- Round-trip: section pattern saved, area detection re-runs, Extracted + Transformed tabs update

**Risk:** MEDIUM — new UI interaction pattern, but no drag-and-drop complexity. Much simpler than the original modal plan.

---

#### Branch 3: `feature/source-json-globals`
**Scope:** Move generic PDF defaults to source.json globals (independent)

**Changes:**
1. Add `PdfDefaults` model to `SourceConfig.cs` (or new file)
2. Read globals from source.json in `DetectAreas()` and pass values to helper methods
3. All current magic numbers become `config?.Pdf?.YTolerance ?? 5.0` patterns
4. Create sample globals section in test site's source.json

**Files modified:**
- `src/UpDoc/Models/SourceConfig.cs` (or similar)
- `src/UpDoc/Services/PdfPagePropertiesService.cs` — pass globals through
- `src/UpDoc.TestSite/updoc/workflows/group-tour-pdf/source.json`

**Verification:**
- With no globals in source.json, behaviour is identical (defaults match current values)
- Override a value → verify it takes effect

**Risk:** LOW — default values match current behaviour, purely structural change

---

#### Branch 4: `feature/remove-legacy-extraction`
**Scope:** Delete dead legacy code + obsolete endpoint

**Changes:**
1. Delete from `PdfPagePropertiesService.cs`:
   - `ExtractAsMarkdown()` and `ExtractMarkdownFromDocument()`
   - `ExtractSectionFromDocument()`
   - `ExtractTitleAndDescription()`
   - `DetectMainColumnStart()`
   - `ExtractSections(string, PdfExtractionRules)` (the obsolete interface method)
2. Delete from `PdfExtractionController.cs`:
   - `GET extract-markdown` endpoint
3. Delete from interface `IPdfPagePropertiesService`:
   - `ExtractAsMarkdown` method
   - `ExtractSections` method
4. Delete `PdfExtractionRules` model from `MapFileModels.cs`
5. Delete `PdfMarkdownResult`, `PdfSectionResult` models if unused

**Verification:**
- `dotnet build UpDoc.sln` succeeds with no errors
- All existing functionality works (area detection, transform, Create from Source)
- No frontend regressions

**Risk:** LOW — confirmed dead code with zero callers. Done last as a safety measure.

---

### Branch Ordering

```
Branch 1 (backend model + inference endpoint)
    ↓
Branch 2 (frontend teach-by-example UI)
    ↓
Branch 4 (dead code cleanup)

Branch 3 (source.json globals) — independent, can be done at any point
```

Branches 1 → 2 are sequential. Branch 3 is independent. Branch 4 comes last.

---

## Open Questions

1. ~~**UmbSorterController for cross-container drag?**~~ **NO LONGER NEEDED.** The teach-by-example approach doesn't use drag-and-drop. User clicks elements, system infers patterns.

2. **Rule inference algorithm — how smart?** Should the system find the minimum distinguishing conditions (complex but elegant) or just capture all metadata from the clicked element (simple but over-specified)? Starting with minimum distinguishing conditions — compare the clicked element's metadata against all non-heading elements and find what's unique. **To be finalised during Branch 1 implementation.**

3. **What happens when a new PDF has a slightly different heading font?** The rule `fontNameContains: "Clarendon"` would still match "GHEALP+Clarendon" and "ABCDE+Clarendon" (PDF font subsetting changes the prefix). The `Contains` operator handles this naturally. **No action needed.**

4. **Backwards compatibility during transition.** When `sectionPattern` is null (not yet configured), the system falls back to the current `bodySize * 1.15` auto-detect. This ensures existing workflows keep working until the user explicitly defines structure. Once all areas are configured, the auto-detect code path becomes dead and can be removed. **Handled by Branch 1 design.**

5. **Sub-heading formatting within sections.** Day 1-5 in the Itinerary need H3 formatting but don't create section boundaries. This is handled by the existing Edit Sections feature or the transform layer's pattern detection. **No new work needed — existing infrastructure handles it.**

6. ~~**Are legacy methods still called?**~~ **RESOLVED (Feb 2026):** All legacy extraction methods are dead code with zero frontend callers. See "Dead Code Analysis" in Implementation Strategy section.

---

## What Does NOT Change

- **Areas are still spatial** — drawn on the PDF page in Define Areas
- **Edit Sections still works** — for within-section semantic roles and sub-heading formatting
- **Map tab wiring** — sections are wired to destination fields, same as today
- **Transform service** — consumes area detection output, benefits from better grouping
- **Bridge code** — reads transform output for document creation, unaffected
- **Area detection output format** — same JSON structure (pages → areas → sections → elements)

---

## Verification

1. **Branch 1:** Run area detection on Group Tour PDF. With no section patterns configured, behaviour matches current (auto-detect with 1.15 threshold). Manually set a section pattern for Tour Details in area-template.json → verify 4 correct sections.

2. **Branch 2:** Click "Define Structure" on Tour Details area. Click FEATURES. Verify system highlights 4 matching elements. Confirm. Verify 4 sections created and saved.

3. **Branch 2:** Click "Define Structure" on Page Header area. Click "No section headings." Verify 1 flat section (no false headings from title/price text).

4. **Branch 2:** Click "Define Structure" on Itinerary area. Click "No section headings." Verify 1 section with 10 elements. Day 1-5 formatting handled by Edit Sections or transform.

5. **End-to-end:** Create from Source with the configured workflow. Verify document creation uses correctly grouped sections for content mapping.

---

## Design Evolution (for context)

This plan went through several iterations before reaching the current teach-by-example design:

1. **Original plan:** Per-area "heading rules" that replace the 1.15 threshold — user defines conditions that identify heading elements, system uses them to split areas into sections.

2. **Problem identified:** Headings don't necessarily create section boundaries. Day 1-5 in the Itinerary are headings (H3 formatting) within one section, not 5 separate sections. The original plan conflated section grouping with heading identification.

3. **Key insight:** Section grouping and heading formatting are separate concerns at different levels. Section grouping is per-area (what creates boundaries). Heading formatting is per-section (what renders as H2/H3).

4. **Second insight:** Areas should contain similar content. The area IS the natural scope for structural rules. Users should draw areas around visually consistent content, then teach the system the pattern for that area.

5. **Final design:** Teach-by-example. No drag-and-drop, no modal, no rules UI. User clicks one element as an example section heading, system generalises from metadata, proposes grouping, user confirms. Simpler UX, same power.
