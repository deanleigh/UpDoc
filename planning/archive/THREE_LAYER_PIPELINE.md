# Three-Layer Pipeline: Extract → Shape → Map

> Decided 12 Feb 2026. Supersedes element-level mapping from Phase 4b.

## The Problem

The current mapping system wires individual extraction elements (`p1-e17`) directly to destination fields. This has two fundamental problems:

1. **Element IDs are positional and fragile** — different PDFs produce different IDs, so mappings break per-document
2. **544 raw elements is unworkable** — scrolling through hundreds of text lines to find the itinerary content is miserable, whether from the Source tab or the Destination tab's picker

## The Solution: Three Layers

```
Extract (raw dough)  →  Shape (proof)  →  Map (bake)
```

### Layer 1: Extract (Raw Output)

**What:** Server-side extraction produces raw elements with full metadata (font size, position, color, page). Area detection groups elements into spatial areas. The transform assembles children under headings into Markdown sections.

**Where it lives:** `sample-extraction.json`, `area-detection.json`, `transform.json` — all auto-generated per PDF.

**UI:** Source tab → **Elements** inner tab. Read-only view of raw extraction with area grouping. The author uses this for debugging and understanding what the extraction produced.

**What the author does here:** Include/exclude sections. The auto-transform proposes N sections. The author toggles which ones pass through to the shaped layer. Unwanted content (footer boilerplate, "OPTIONAL" supplements, preamble noise) gets excluded here so it never reaches the destination.

**Not mapping.** No "Map to..." buttons on elements. The raw layer is a gating/filtering step only.

### Layer 2: Shape (Curated Sections)

**What:** The included sections from Layer 1, assembled into clean Markdown with stable heading-based IDs (`features`, `itinerary`, `what-we-will-see`). Each section has two mappable parts:

- **Heading** — the section title (e.g., "Features", "What We Will See")
- **Content** — the assembled body (bullet list, paragraphs, sub-headed content)

**Where it lives:** `transform.json` is the auto-generated base. Include/exclude state is persisted (TBD — could be in `transform.json` or a separate `shape.json`).

**UI:** Source tab → **Transformed** inner tab. Shows only included sections with their assembled Markdown rendered as HTML preview. Pattern badges (Bullet List, Paragraph, Sub-Headed) and metadata.

**Content cleanup belongs here, not in mapping.** Any prefix stripping (e.g., "Email:" → just the email address, "Tel:" → just the phone number) must happen during transformation. The Transformed tab should show clean, map-ready content. The mapping stage only wires values to fields — it does not modify content. This means section rules need a way to configure content transforms (prefix stripping, regex replacement) that run during the Shape step.

**What the author does here:** Maps sections to destination fields (source-driven direction). Click a section heading → pick destination field. Click section content → pick destination field.

### Layer 3: Map (Wiring to Destination)

**What:** The wiring between shaped sections and destination fields/blocks. Many-to-one supported: multiple sections can feed one block property (e.g., Day 1 + Day 2 + Day 3 + Day 4 + Day 5 → itinerary block body).

**Where it lives:** `map.json` — same file as today, but sources reference section IDs instead of element IDs.

**UI — two entry points:**

1. **Destination tab** (destination-driven): Shows blueprint fields and blocks. Click a field → picker shows available shaped sections. Select one or more. "When destination field is [itinerary body], populate from [Day 1 content, Day 2 content, ...]"

2. **Transformed view on Source tab** (source-driven): Click a section → pick which destination field receives it.

3. **Map tab**: Summary of all wires. View, edit, delete, reorder. Single source of truth.

All three write to the same `map.json`.

## Section Mapping Schema

Each section has two addressable parts. Map.json references them as:

```json
{
  "mappings": [
    {
      "source": "features.heading",
      "destinations": [{ "target": "sectionTitle", "blockKey": "abc-123" }]
    },
    {
      "source": "features.content",
      "destinations": [{ "target": "content", "blockKey": "abc-123" }]
    },
    {
      "source": "day-1.content",
      "destinations": [{ "target": "content", "blockKey": "def-456" }]
    },
    {
      "source": "day-2.content",
      "destinations": [{ "target": "content", "blockKey": "def-456" }]
    }
  ]
}
```

**Key properties:**
- `source` = `{sectionId}.{part}` where part is `heading` or `content`
- Multiple mappings with different sources but same destination target+blockKey = concatenation (ordered by mapping position)
- Section IDs are heading-derived kebab-case (`features`, `what-we-will-see`, `day-1`) — stable across PDFs with the same structure

## What This Changes

| Aspect | Before (Element-level) | After (Section-level) |
|--------|----------------------|----------------------|
| Mapping source | `p1-e17` (positional) | `features.content` (semantic) |
| Stability across PDFs | Breaks per document | Stable for same structure |
| Mapping surface | 544 raw elements | ~15 curated sections |
| Author workflow | Scroll through elements | Include/exclude, then map |
| Content editing | Not in UpDoc | Not in UpDoc (unchanged) |
| Destination picker shows | 544 elements | ~15 sections |

## What Doesn't Change

- **Bridge code** still creates documents from mapped content — just reads section-level sources instead of element IDs
- **map.json** remains the single wiring file, read/written by all three tabs
- **Destination auto-populate** from blueprint content (same `destination.json`)
- **Content editing happens in the Umbraco page** — UpDoc shapes and maps, the author edits after creation
- **Two bridge files** must stay in sync (`up-doc-action.ts` + `up-doc-collection-action.element.ts`)

## Implementation Phases

### Phase A: Section Include/Exclude (Elements tab)
- Add toggles to transformed sections (default: all included)
- Persist include/exclude state
- Excluded sections don't appear in Transformed view or destination picker

### Phase B: Destination-Driven Mapping (Destination tab)
- Each destination field gets a "pick source" button
- Picker shows transformed sections (heading + content parts)
- Multi-select for many-to-one (e.g., Day 1-5 → itinerary body)
- Saves to map.json with section-based source IDs

### Phase C: Source-Driven Mapping (Transformed view)
- Section cards get "Map to..." interaction
- Heading and content map independently
- Saves to map.json

### Phase D: Bridge Update
- Update bridge code to resolve section-based sources from transform.json
- `features.content` → look up section by ID → get assembled Markdown → convert to HTML if needed
- Concatenation for many-to-one mappings

### Phase E: Map Tab Update
- Show section-based mappings
- Edit/delete/reorder
- Show preview of assembled content per destination field

## Not in Scope

- AI-assisted mapping (future — Umbraco.AI integration)
- Content editing within UpDoc
- Image or table extraction
- Condition/rule builder (future phase)
