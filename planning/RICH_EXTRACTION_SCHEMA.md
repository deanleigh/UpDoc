# Plan: Rich Extraction Schema & Destination-Driven Mapping Flow

## Context

Phase 3 of the Destination-Driven Mapping plan. The extraction schema is the foundational data contract for UpDoc — it defines the shape of data that flows between C# extraction services, sample storage (JSON files), API transport, the content picker UI, and the condition auto-population system. Every downstream feature depends on getting this right.

This plan captures design decisions from a brainstorming session where we analyzed real PDF content (Tailored Travels tour brochures) and the Outlook rules pattern to arrive at a unified extraction + mapping flow.

## Key Insight: Condition Expressiveness Is Inverted

The complexity ranking for extraction is NOT the same as for condition building:

- **Markdown**: Structurally simple to extract, but has a **disambiguation problem** — repeated headings (e.g., 12 products each with "Description", "Price") can only be distinguished by nesting context. Thin condition vocabulary.
- **PDF**: Complex to extract, but produces **incredibly rich metadata** — font size, position, color, page, font name. Many axes for precise conditions. Thick condition vocabulary.

**Decision: PDF first.** Design the schema for the richest metadata (PDF), and simpler source types (Markdown, Web, Word) become natural subsets. PdfPig already captures all this metadata — we just currently discard it.

## Core Flow: Extract → Pick → Auto-Map

Three previously separate steps collapse into one:

### Previous design (three steps):
1. Triage: browse extraction dump, add/dismiss elements
2. Mapping: wire triaged elements to destination fields
3. Rule creation: manually author conditions for each mapping

### New design (one step):
1. **Upload sample PDF** with optional page selection
2. **Extract everything** from selected pages — every text element with full metadata — stored as `sample-extraction.json`
3. **Destination-driven pick**: click a destination field → content picker shows extracted elements → pick the content → **conditions auto-generate from the picked element's metadata**

The single pick action simultaneously:
- **Maps** the content: source element → destination field (saved to map.json)
- **Generates conditions** from metadata: fontSize, position, page, color, text pattern (saved to source.json)
- **Triages** implicitly: mapped = kept, unmapped = ignored (no separate add/dismiss step)

### Outlook Rules Analogy (confirmed)
- Outlook: select an email → conditions pre-fill ("From = PayPal")
- UpDoc: select a content element → conditions pre-fill ("fontSize >= 14 AND text = 'ACCOMMODATION' AND page = 1")
- In both: user confirms auto-populated conditions, refines only if needed

## Sample Extraction: Full Dump with Page Selection

### What gets extracted
For PDF: every text element PdfPig can identify, with ALL available metadata:
- Text content
- Font size, font name, font weight/style
- Position (x, y coordinates on page)
- Page number
- Color (text color)
- Bounding box dimensions
- Any other properties PdfPig exposes

**This is the condition vocabulary** — the dropdown options in the rule builder come directly from what PdfPig provides, not from assumptions.

### Page selection
- Offered at upload time: "Which pages contain the content you care about?"
- Default: all pages
- Essential for avoiding noise (booking forms, T&Cs, legal text)
- For the Tailored Travels PDFs: pages 1-2 are content, pages 3-4 are noise
- Stored in source.json as a workflow setting (e.g., `"pages": [1, 2]`)
- Applied both to sample extraction AND to real extraction at content-creation time

### Volume analysis (from real PDF)
- Pages 1-2 of a Tailored Travels tour brochure = ~70-100 text elements
- Completely manageable for browsing in a content picker
- Even without page filtering, 2 content pages is reasonable
- A 30-page document would need page selection to be practical

### Storage
- Saved as `sample-extraction.json` in the workflow folder
- Persists between sessions — no re-uploading needed
- Raw data is never deleted — conditions/mapping state is layered on top
- The file is the reference for the content picker UI in the mapping step

## Schema Shape (To Be Validated Against PdfPig)

Preliminary structure based on what we know PdfPig provides. **Must be validated by examining actual PdfPig output before finalizing.**

```json
{
  "version": "1.0",
  "sourceType": "pdf",
  "source": {
    "fileName": "TTM5063 Wensum Flemish Bruges Antwerp Ghent lo.pdf",
    "mediaKey": "guid-here",
    "extractedDate": "2026-02-11T12:00:00Z",
    "pagesExtracted": [1, 2],
    "totalPages": 4
  },
  "elements": [
    {
      "id": "e1",
      "page": 1,
      "text": "Flemish Masters –\nBruges, Antwerp & Ghent",
      "metadata": {
        "fontSize": 36.0,
        "fontName": "Helvetica-Bold",
        "position": { "x": 50, "y": 80 },
        "boundingBox": { "x": 50, "y": 60, "width": 400, "height": 80 },
        "color": "#1A3C6E"
      }
    },
    {
      "id": "e2",
      "page": 1,
      "text": "5 days from £1,199 Departing 30th September 2026",
      "metadata": {
        "fontSize": 14.0,
        "fontName": "Helvetica",
        "position": { "x": 50, "y": 170 },
        "color": "#E8A317"
      }
    },
    {
      "id": "e3",
      "page": 1,
      "text": "ACCOMMODATION",
      "metadata": {
        "fontSize": 14.0,
        "fontName": "Helvetica-Bold",
        "position": { "x": 350, "y": 490 },
        "color": "#E8A317"
      }
    },
    {
      "id": "e4",
      "page": 1,
      "text": "We stay four nights at the centrally located 4* Dukes' Academie Hotel...",
      "metadata": {
        "fontSize": 9.0,
        "fontName": "Helvetica",
        "position": { "x": 350, "y": 510 },
        "color": "#333333"
      }
    }
  ]
}
```

**Element IDs** are stable identifiers so that mapping references survive re-ordering. Generated deterministically from page + position, or as simple sequential IDs.

**Metadata fields** will be finalized after examining what PdfPig's `Word` and `Letter` classes actually expose. The schema must reflect reality, not assumptions.

## How Conditions Auto-Generate

When the workflow author picks element `e3` ("ACCOMMODATION") for a destination field:

```json
{
  "conditions": [
    { "field": "text", "operator": "equals", "value": "ACCOMMODATION" },
    { "field": "fontSize", "operator": ">=", "value": 14.0 },
    { "field": "page", "operator": "=", "value": 1 }
  ]
}
```

These are auto-populated from the element's metadata. The workflow author sees them pre-filled and can:
- Accept as-is (most common)
- Remove conditions that are too specific (e.g., remove page constraint if the heading could be on any page)
- Add conditions for disambiguation (e.g., add color or position if two elements share the same text)
- Change operators (e.g., "contains" instead of "equals")

## What Stays Where

| File | Purpose | Populated by |
|------|---------|-------------|
| `sample-extraction.json` | Full dump of sample PDF with all metadata | Extraction service (auto) |
| `source.json` | Conditions per mapped element (how to find content in any PDF) | Auto-generated from picks, refined by author |
| `destination.json` | Document type structure (fields + blocks) | Auto-generated from blueprint |
| `map.json` | Wiring: source conditions → destination fields + transforms | Created during pick step |

## Destination Auto-Population (Prerequisite)

`destination.json` should be auto-generated from the blueprint's document type when a workflow is created. Currently creates empty stubs. This is needed so the Destination tab shows the actual field structure for the workflow author to click on.

**Implementation:** When `CreateWorkflow` runs, query the document type for its properties and block grid structure, serialize to `destination.json`. Same format as the hand-crafted old `group-tour` example.

## Implementation Sequence

### Branch 1: `feature/rich-extraction-dump`
- Examine PdfPig API to catalog ALL available metadata per text element
- Create C# model for rich extraction output
- Add new API endpoint: extract full dump from PDF (with page filter)
- Store result as `sample-extraction.json` in workflow folder
- Display raw dump in Source tab (read-only, grouped by page)

### Branch 2: `feature/destination-auto-populate`
- Auto-generate `destination.json` from blueprint's document type at workflow creation time
- Display destination structure in Destination tab (fields + blocks with properties)
- Add "map" action icon to each destination field (UI only, no functionality yet)

### Branch 3: `feature/content-picker-mapping`
- Build content picker panel (shows sample extraction elements)
- Wire up "map" icon: click destination field → open picker → select source element
- Auto-generate conditions from picked element's metadata
- Save mapping to map.json, conditions to source.json
- Visual indicators for mapped vs unmapped fields

### Branch 4: `feature/condition-refinement`
- Condition editor UI (view/edit auto-populated conditions)
- Add/remove condition rows
- Operator selection (equals, contains, >=, regex, etc.)
- Test: re-run extraction against sample, verify condition matches

## Verification

- Upload Tailored Travels PDF, select pages 1-2
- Verify `sample-extraction.json` created with full metadata per element
- Verify Source tab displays all elements grouped by page
- Click "Page Title" in Destination tab → pick title element from extraction
- Verify conditions auto-populate (fontSize >= 36, page = 1)
- Verify map.json updated with the mapping
- Verify source.json updated with the conditions
