# PDF-to-CMS Mapping Walkthrough: Tour Brochure Structure

> Walkthrough conducted Feb 2026 using "Flemish Masters – Bruges, Antwerp & Ghent" PDF brochure. Establishes the mapping between PDF source structure and Umbraco CMS destination structure, plus key architectural decisions.

## Terminology (aligned with Block Grid)

| Term | Meaning | Maps to in CMS |
|------|---------|----------------|
| **Layout** | Grid arrangement of a page | Block Grid Layout block (e.g., Layout - 9\|3) |
| **Area** | A column within a layout | Block Grid Area |
| **Item** | A content block within an area | Block Grid Item / "Feature" |
| **Section** | A heading + its children within an item | Sub-structure within a single rich text field |

These replace the previous POC terminology (Zone → Area, Section → Item/Section).

---

## Page 1: Layout 9|3

### Area 1 (9 cols, left side)

**Item 1: Title + Description** (dark blue filled rect zone)
| PDF Source | Destination | Tab |
|---|---|---|
| "The Arts Society Wensum presents" | Organiser (new field needed) | Page Properties |
| "Flemish Masters – Bruges, Antwerp & Ghent" | Page Title | Page Properties |
| "5 days from £1,199 Departing 30th September 2026" | Page Description | Page Properties |

- These are **document-level properties**, not block content
- PdfPig metadata (font size) naturally distinguishes title vs description vs organiser — no explicit grouping needed
- The Page Header feature block in Page Content reads from these properties automatically (no block-level config needed)

**Item 2: Hero Image** — not extracted (images out of scope)

**Item 3: Organiser Contact Information** (bottom contact strip)
| PDF Source | Destination | Tab |
|---|---|---|
| "Susanna Smart" | Organiser Name | Tour Organiser (new tab) |
| "07710 749263" | Phone | Tour Organiser |
| "susannamart@outlook.com" | Email | Tour Organiser |
| "80 Thorpe Road, Norwich NR1 1BA" | Address | Tour Organiser |

- Maps to a **new Tour Organiser tab** on the document type (separate from Page Properties)
- Tour Organiser feature block in Page Content reads from these tab properties (no block config needed — same pattern as Page Header)
- Text patterns (phone numbers, email addresses) aid identification

### Area 2 (3 cols, right side — light blue sidebar zone)

Each section in the blue sidebar becomes **one Block Grid feature** with a title and content field:

**Item 1: FEATURES**
- Title: "FEATURES" → transformed to title case → "Features"
- Content: all bullet children merged into one Markdown bulleted list:
  ```markdown
  - 4* central Bruges hotel
  - Welcome dinner included
  - All excursions, entrance fees & guided tours included
  - Canal cruise on Day 2 included
  - ...
  ```
- Pattern: **section-to-block** (not element-to-field)

**Item 2: WHAT WE WILL SEE** — same pattern as FEATURES

**Item 3: ACCOMMODATION** — same pattern, but content is paragraph text not bullets

**Item 4: EXTRAS TO YOUR TOUR** — same pattern as FEATURES (title + bulleted list)

**Items not extracted:** Logo (top), image (bottom)

---

## Page 2: Layout 3|9

### Area 1 (3 cols, left sidebar)
- Logo — not extracted
- WHAT WE WILL SEE list — **duplicate of page 1**, not mapped
- Images — not extracted

### Area 2 (9 cols, main content)
- Header text (title, description, organiser) — **duplicate of page 1**, not mapped
- **Itinerary (Day 1–5)** — the only new content on page 2

**Itinerary → single "Suggested Itinerary" Block Grid feature:**
- Title: "Suggested Itinerary" (not in PDF — supplied by the feature block, or from mapping config)
- Content: all day sections merged into one Markdown body:
  ```markdown
  ## Day 1
  We depart by executive coach from our designated pick up point...

  ## Day 2
  This morning, we enjoy an included guided walking tour of Bruges...

  ## Day 3
  Our morning guided tour of Antwerp takes in sights...

  ## Day 4
  We visit Ghent this morning for a guided walking tour...

  ## Day 5
  After checking out of our hotel we enjoy a guided tour...
  ```
- Day headings become `##` sub-headings within one rich text body — they are NOT separate blocks
- NB notes at bottom → possibly a summary field on the feature, or appended

**Deduplication:** Handled by mapping, not extraction. The extraction is destination-agnostic — it extracts everything. Content with no mapping destination is silently ignored.

---

## Pages 3–4

Terms & conditions and booking form. Not extracted — no relevant content.

---

## Architecture Decisions

### 1. Section-to-Block Mapping (not Element-to-Field)

A detected section (heading + children) maps to a single Block Grid feature. The children are assembled into one rich text value, not individually addressable fields.

**Before:** element `p1-e17` → field `features.content` (breaks when element IDs shift)
**After:** section "FEATURES" (heading + children) → Features block (title + merged content)

### 2. Server-Side Transforms

Transforms (title case, bullet merging, Markdown assembly) happen in **C# on the server**, not in the TypeScript bridge code.

**Rationale:**
- Bridge code (`up-doc-action.ts` + `up-doc-collection-action.element.ts`) is the most bug-prone part of UpDoc — two files that must stay in sync
- Section-to-block mapping is more complex than current element-to-field — adding this to TypeScript would multiply bridge bugs
- C# transforms are unit-testable without a browser
- Both entry points (entity action + collection action) call the same server endpoint — no sync problem

**Pipeline:**
1. **Extract** — PdfPig produces raw elements with metadata
2. **Detect** — area/section detection produces hierarchical structure
3. **Transform** — server-side rules produce Markdown per section (title case, bullet assembly, etc.)
4. **Preview** — client displays transformed Markdown for review
5. **Create** — server converts Markdown → HTML and writes to Umbraco content API

### 3. Markdown as Intermediate Format

- Extracted content is transformed to **Markdown** (not HTML)
- Markdown is clean, human-readable, debuggable
- HTML conversion happens only at the final creation step (Markdig in C#)
- Preview in the backoffice shows Markdown directly
- Stored representations (sample extraction, mapping preview) use Markdown

### 4. Deduplication via Mapping

- Extraction is destination-agnostic — extracts everything from every page
- Duplicate content (e.g., WHAT WE WILL SEE on both pages) has no mapping → silently ignored
- No need for page filtering or duplicate detection in the extraction layer

### 5. Two Types of Destination Properties

| Type | Example | How populated |
|------|---------|---------------|
| **Tab properties** | Page Title, Organiser Name | Direct document property mapping |
| **Block Grid features** | Features, Itinerary | Section-to-block mapping with transforms |

Some tab properties feed into Block Grid features that read from them (e.g., Page Header reads Page Title). The feature block needs no configuration — it reads from the document properties.

---

## Detection Considerations

- **Page 1 has two detected areas** (filled rectangles): dark blue title area + light blue sidebar
- **Page 2 may have fewer filled rectangles** — itinerary area might be white/unzoned, but heading detection (Day 1, Day 2...) still provides section structure
- **Element metadata** (font size, font name, color, position) within an area naturally distinguishes roles — no explicit UI grouping needed
- **PdfPig `ExperimentalAccess.Paths`** detects filled rectangles → areas. Center-point containment assigns elements to areas.
