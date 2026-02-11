# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — Block Property Disambiguation in Destination Picker

### Where we left off

Main branch is up to date (commit `a9ab882`). Visual grouping of source elements by heading hierarchy was just completed. The end-to-end mapping and content creation flow works.

### The bug

When mapping source elements to destination fields, the **destination picker** doesn't disambiguate properties that exist in multiple block instances. For example, the Group Tour blueprint has three blocks in its content grid — "Suggested Itinerary", "Features", and "Accommodation" — all composed from the same element types. They all share a `richTextContent` property.

When you select "Rich Text" under "Suggested Itinerary" in the destination picker, it **also selects** "Rich Text" under "Features" and "Accommodation" because the picker uses `field.alias` as its selection key — and all three share the alias `richTextContent`.

Worse, `map.json` only stores `"target": "richTextContent"` with no block context. So at content creation time, there's no way to know which block's `richTextContent` was intended.

### Root cause

In `destination-picker-modal.element.ts`:
- `_selectedTargets` is a `Set<string>` of property aliases
- `#toggleTarget(field.alias)` toggles by alias alone
- Block properties from different block instances with the same alias are indistinguishable

In `map.json` (the `MappingDestination` type in `workflow.types.ts`):
- `target: string` stores only the alias (e.g., `"richTextContent"`)
- No `blockKey`, `blockContentTypeAlias`, or `identifyBy` stored

### The fix needed

1. **Destination picker** — use a compound key for block properties (e.g., `blockKey:alias`) so selecting a property in one block doesn't affect the same property in other blocks
2. **map.json format** — store block context alongside the target alias so the bridge code can find the right block instance
3. **Bridge code** (`up-doc-action.ts`) — use the block context from the mapping to target the correct block instance when applying values during content creation

### Data already available

`destination.json` already has everything needed for disambiguation:
- Each block has a `key` (GUID for the block instance)
- Each block has `identifyBy: { property, value }` (e.g., `{ property: "featurePropertyFeatureTitle", value: "Suggested Itinerary" }`)
- Each block has `contentTypeAlias` and `contentTypeKey`

The destination picker already renders blocks with their labels as visual groups. It just doesn't pass the block context through to selection/storage.

### Key files

- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/destination-picker-modal.element.ts` — selection logic needs compound keys
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/destination-picker-modal.token.ts` — modal value type may need updating
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` — `MappingDestination` needs block context field
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-source-view.element.ts` — creates mappings from source tab
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-action.ts` — bridge code applies mappings during content creation
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-map-view.element.ts` — displays mappings (needs to show block context)

### Approach suggestion

Extend `MappingDestination` to optionally include block context:
```typescript
export interface MappingDestination {
    target: string;           // property alias (unchanged for top-level fields)
    blockKey?: string;        // block instance key from destination.json (for block properties)
    transforms?: MappingTransform[];
}
```

Top-level fields (e.g., `pageTitle`) keep just `target`. Block properties add `blockKey` to disambiguate. The bridge code in `up-doc-action.ts` already has `#applyBlockGridValue()` which searches by `identifyBy` — it just needs to use the `blockKey` to look up the correct `identifyBy` from `destination.json`.

### First action

Create branch `feature/block-property-disambiguation` from `main`.
