# Next Session Prompt

## Current State (19 Feb 2026)

Branch: `feature/rules-actions-v2` — rules editor UI redesign complete, rendered Markdown view implemented (uncommitted), destination picker badge fixes done.

### Recent Uncommitted Work (This Session)

- **`sectionProperty` renamed to `singleProperty`** across all files (TS types, rules editor, C# model, C# transform). Legacy backward compat preserved.
- **Destination picker badge fixes** — white-on-green contrast, shows source section name instead of "mapped", `.content`/`.heading` suffixes stripped from display labels.
- **Rendered Markdown view** — Obsidian-style reading view with `marked` library, Map buttons per section, mapping status badges. Already in the source view file (uncommitted).
- **Text Transforms planning** — added to RULES_AND_ACTIONS_V2.md (strip prefix, trim dots, etc.)

## Next Task: Section Parts — Separately Mappable

### The Problem

The rendered Markdown view has **one Map button per section** that always creates a `${section.id}.content` source key. Sections with multiple parts (title, content, description, summary) cannot have those parts mapped to different destination fields.

### The Correct Model

There are two fundamentally different things in the transform output:

**1. Single Property** (`singleProperty` action) — one atomic mappable unit. Role name = label, element text = value. Gets one Map button. Source key: `${section.id}.content`. Example: "Organisation", "Tour Title", "Tour Description" in the Page Header area.

**2. Section** (built from `sectionTitle` + `sectionContent` + `sectionDescription` + `sectionSummary` actions) — a container with multiple separately-mappable parts. Each part that has content gets its own Map button. You **cannot** map the whole section as one unit — that's what differentiates it from a single property.

### Section Parts

A section can have up to four parts, each from a different action type:

| Action | Source Key Suffix | What It Contains |
|---|---|---|
| `sectionTitle` | `.title` | The section heading text |
| `sectionContent` | `.content` | All content elements concatenated as one markdown block |
| `sectionDescription` | `.description` | All description elements concatenated as one markdown block |
| `sectionSummary` | `.summary` | All summary elements concatenated as one markdown block |

**Important:** `sectionContent` is one mappable block regardless of what's inside it. If it contains 6 bullets, 3 paragraphs, and a heading — that's all one block of markdown with one Map button. Individual paragraphs/bullets within content are NOT separately mappable.

### Example: Tour Details Area

Rules define two roles: "Section Title" (`sectionTitle`) and "Section Body" (`sectionContent`).

The area "Features" section would produce:
- **Title**: "Features" → Map button → source key `features.title`
- **Content**: "• 4* hotels throughout\n• 2 dinners included\n..." → Map button → source key `features.content`

Each maps to a different destination field (e.g., Title → block title field, Content → block rich text field).

### Example: Page Header Area (Single Properties)

Rules define standalone properties: "Organisation" (`singleProperty`), "Tour Title" (`singleProperty`), "Tour Description" (`singleProperty`).

Each produces one section with one Map button. No sub-parts.

### What Needs to Change

#### C# Changes

**`TransformedSection` model** (`src/UpDoc/Models/TransformResult.cs`):
Currently has `Heading` (string) and `Content` (string). Needs separate fields for each part:
- `Title` (string?) — from `sectionTitle` elements
- `Content` (string?) — from `sectionContent` elements (currently this is `Content`)
- `Description` (string?) — from `sectionDescription` elements
- `Summary` (string?) — from `sectionSummary` elements

Or alternatively, a dictionary: `Parts: Dictionary<string, string>` keyed by part name.

**`ContentTransformService.cs`** (`src/UpDoc/Services/ContentTransformService.cs`):
Currently `GetNormalizedAction()` maps `sectionDescription` → `sectionContent` and `sectionSummary` → `sectionContent`, so they all merge into one `currentContentLines` list. Need to:
- Stop normalising description/summary to content — keep them as distinct action types
- Accumulate into separate lists: `currentContentLines`, `currentDescriptionLines`, `currentSummaryLines`
- Populate the corresponding fields on `TransformedSection`

**`SectionRules.cs`** (`src/UpDoc/Models/SectionRules.cs`):
`GetNormalizedAction()` currently returns `("sectionContent", ...)` for both `sectionDescription` and `sectionSummary`. Change to return the actual action name so the transform can distinguish them.

#### TypeScript Changes

**`workflow.types.ts`**:
Update `TransformedSection` interface to add `title?`, `description?`, `summary?` fields (or a `parts` dictionary).

**`up-doc-workflow-source-view.element.ts`**:
- `#renderMarkdownSection`: For sections with multiple parts, render each part with its own Map button and mapping badges
- `#onMapSection`: Accept a part suffix parameter to create the correct source key (`.title`, `.content`, `.description`, `.summary`)
- Single properties: continue showing one Map button (no change)

**`up-doc-collection-action.element.ts`** and **`up-doc-action.ts`** (the bridge code):
- Must handle the new source key suffixes (`.title`, `.description`, `.summary`) in addition to existing `.content` and `.heading`
- **CRITICAL: Both bridge files must be kept in sync** — the collection action is the primary code path

#### Source Key Migration

Old source keys used `.heading` and `.content`. New keys:
- `.heading` → `.title` (rename for consistency with `sectionTitle` action)
- `.content` → `.content` (no change)
- `.description` (new)
- `.summary` (new)

**Backward compat:** Old `.heading` keys in existing map.json files should still work. The bridge code should check both `.heading` and `.title`.

### What Must NOT Change

- **singleProperty behaviour** — standalone sections with one Map button, unchanged
- **Existing mappings in map.json** — old `.content` keys still work
- **Rules editor UI** — no changes needed, it already has the action dropdown with all five types
- **The rendered Markdown view layout** — keep the Obsidian reading style, just add more Map buttons per section
- **The destination picker modal** — no changes, it already returns selected targets correctly

### Verification

1. Open tailored-tour-pdf workflow → Transformed tab
2. Page Header sections (singleProperty): one Map button each, unchanged
3. Tour Details sections: separate Map buttons for Title and Content
4. Click each Map button → destination picker → mapping saved with correct source key suffix
5. Map tab shows all mappings with correct source keys
6. Create from Source still works end-to-end (bridge code handles new keys)

## Key Files

| File | What |
|---|---|
| `src/UpDoc/Models/TransformResult.cs` | `TransformedSection` C# model — add part fields |
| `src/UpDoc/Models/SectionRules.cs` | `GetNormalizedAction()` — stop merging description/summary |
| `src/UpDoc/Services/ContentTransformService.cs` | Transform pipeline — accumulate parts separately |
| `src/UpDoc/wwwroot/.../workflow.types.ts` | TS `TransformedSection` — add part fields |
| `src/UpDoc/wwwroot/.../up-doc-workflow-source-view.element.ts` | Rendered Markdown view — Map buttons per part |
| `src/UpDoc/wwwroot/.../up-doc-collection-action.element.ts` | Bridge (primary) — handle new source key suffixes |
| `src/UpDoc/wwwroot/.../up-doc-action.ts` | Bridge (secondary) — keep in sync |
| `planning/RULES_AND_ACTIONS_V2.md` | Design doc — reference for action types and naming |

## Also Pending

- **Bullet rendering fix** — Tour Details body text has rules set to "Paragraph" format but content is bullets. Need to change rule format to "Bullet List Item" (configuration fix, not code fix). Address after section parts mapping is working.
- **Text Transforms** — strip prefixes (Tel:, Email:), trim dot leaders. Planned in RULES_AND_ACTIONS_V2.md. Not started.
- Merge `feature/rules-actions-v2` to `main` when ready

## Backlog (Not Now)

- Unify "Define Structure" / "Edit Rules" buttons
- Page picker for PDF page selection
- Strategy badge contrast fix
- CS8602 warning at PdfPagePropertiesService.cs:1166
