# Plan: Section Rules Editor ("Edit Sections")

## Status: PLANNING

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

| Condition Type | Example | Source Types |
|---------------|---------|-------------|
| Text begins with | "Tel:", "Email:", "Day " | All |
| Text ends with | ".com", ".co.uk" | All |
| Text contains | "phone", "@" | All |
| Text matches pattern | `\d{3,4}\s\d{3,4}\s\d{4}` (phone) | All |
| Font size equals/above/below | ≥ 20pt (heading), ≤ 10pt (fine print) | PDF |
| Font name/style | "Helvetica-Bold", "Clarendon" | PDF |
| Color | #FFD200 (gold heading) | PDF |
| Position | First element, Last element | All |
| Heading level | h1, h2, h3 | Markdown, Word |
| CSS selector | `.contact-name` | Web |

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
- **Auto-populate** — clicking an element in the section pre-fills conditions from its metadata (like Outlook pre-fills "From = sender" when you create a rule from an email)
- **Add another condition** — multiple conditions AND together (element must match all)

### 5. Auto-population from sample extraction

When the user clicks an element to create a rule, conditions auto-populate from its metadata:

**Clicking "Robin Linnecar" (20pt, Clarendon, #FFD200) auto-fills:**
- Font size equals: 20pt
- Font name: GHEALP+Clarendon
- Color: #FFD200

The user reviews these, keeps what's useful, removes what's too specific (maybe font name varies but color is consistent), and names the role.

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

Section rules are stored in the source config file (e.g., `source.json`) as part of each section's definition:

```json
{
  "sections": [
    {
      "key": "organiser-info",
      "heading": "Organiser Info",
      "rules": [
        {
          "role": "organiser-name",
          "conditions": [
            { "type": "fontSize", "operator": "equals", "value": 20 },
            { "type": "color", "operator": "equals", "value": "#FFD200" }
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
  ]
}
```

Rules live in the source config because they are source-type-specific (PDF conditions differ from Web conditions). The map.json references roles by name, agnostic of how they were identified.

---

## Implementation Sequence

### Prerequisites
- Zone detection and transform layer working (COMPLETE)
- Sample extraction stored in workflow folder (COMPLETE)
- Edit Areas UI working (COMPLETE)

### Steps
1. **Sections stat box + Edit Sections button** — Add to Source tab stat boxes
2. **Section rules editor UI** — Outlook-rules-pattern modal/panel
3. **Auto-populate from element click** — Pre-fill conditions from metadata
4. **Live matching** — Show matched elements as conditions are defined
5. **Source config schema update** — Add `rules` array to section definitions
6. **Rule evaluation engine** — Apply rules to extraction output, produce named sub-parts
7. **Map tab integration** — Show section sub-parts as mappable sources
8. **Bridge integration** — Apply rules during Create from Source to split content

---

## Open Questions

1. **Multiple matches** — What if a rule matches more than one element? (e.g., two lines start with "Tel:"). Take first? Concatenate? Show warning?
2. **Rule ordering** — Do rules evaluate in order (first match wins)? Or can an element match multiple rules?
3. **Transform interaction** — Rules run AFTER the current transform (zone detection → section assembly). Should they replace parts of the transform, or layer on top?
4. **Unmatched element default** — Elements not matching any rule: silently dropped, grouped as "other", or flagged for attention?
5. **Rule testing across PDFs** — Ability to test rules against multiple sample PDFs to verify they work consistently?
