# Plan: BlockKey Reconciliation & Resilient Bidirectional Mapping

## Problem Statement

map.json stores `blockKey` values (block instance GUIDs from the blueprint) to identify which block a mapping targets. These keys can become stale if:
- The destination is regenerated (regenerate-destination endpoint)
- The blueprint is edited in a way that Umbraco assigns new block instance keys
- A different blueprint is selected for the workflow

When blockKeys in map.json don't match destination.json, the bridge code can't find the block in the destination config, so it can't resolve the `contentTypeKey` needed to write to the correct block in the new document. The mapping silently fails — the block keeps its blueprint defaults.

This was discovered Feb 2026 when Features, Accommodation, and Itinerary mappings all had stale blockKeys that never matched destination.json. Sights and Organiser worked because their keys happened to be correct.

## Root Cause

The destination picker UI writes `block.key` from destination.json into map.json. If destination.json is later regenerated (and the blueprint block instance keys change for any reason), map.json is left pointing at old keys. There is no reconciliation step.

## Design Goals

1. **map.json blockKeys must always match destination.json** — automatically reconciled
2. **Changing the blueprint** should update destination.json AND reconcile map.json
3. **Mapping from either direction** (source→destination or destination→source) must produce correct blockKeys
4. **Match blocks by contentTypeKey** — the stable identifier. blockKey is just a lookup indirection to find the contentTypeKey in destination.json

## Approach: Reconcile on Regeneration

### When destination.json is regenerated:

1. Load the OLD destination.json (before overwrite)
2. Generate the NEW destination.json from the current blueprint
3. Build a mapping: `old blockKey → contentTypeKey → new blockKey`
   - For each block in old destination.json, find the block with the same `contentTypeKey` in new destination.json
   - If found, record the old→new key mapping
   - If not found (block removed from blueprint), flag the mapping as orphaned
4. Update map.json: replace every `blockKey` using the old→new mapping
5. Save both destination.json and map.json
6. Return a summary to the UI: N keys updated, M orphaned mappings

### Edge cases:

- **Multiple blocks with same contentTypeKey**: This project uses unique element types per block (featureRichTextEditorFeatures, featureRichTextEditorAccommodation, etc.), so contentTypeKey is unique per block instance. If this changes in future, we'd need a secondary disambiguator (identifyBy value, position order).
- **Block removed from blueprint**: The mapping becomes orphaned. Don't delete it — flag it so the user can see it in the Map tab and decide.
- **Block added to blueprint**: No action needed — new blocks have no mappings yet.
- **Blueprint changed entirely**: All blockKeys change. Reconciliation by contentTypeKey still works if the new blueprint has the same element types. If not, all block mappings become orphaned.

## Implementation

### Phase 1: Auto-reconcile blockKeys on regenerate-destination

**Where:** `DestinationStructureService.cs` or `WorkflowService.cs` — whichever handles the regenerate-destination endpoint.

**Steps:**
1. Before overwriting destination.json, read the current version
2. After generating the new destination.json, build the old→new blockKey map using contentTypeKey
3. Load map.json, replace all blockKey values, save map.json
4. Save new destination.json
5. Return reconciliation summary in the API response

**Files to modify:**
- `WorkflowService.cs` — regenerate-destination endpoint handler
- `WorkflowController.cs` — return reconciliation info in response (optional)

### Phase 2: Validate blockKeys on config load (defensive)

Add a validation step when loading a workflow config that checks all map.json blockKeys exist in destination.json. If any are orphaned, log a warning. This catches any edge cases the reconciliation misses.

**Where:** `WorkflowService.cs` `ValidateConfig()` method — add blockKey existence check.

### Phase 3: Store contentTypeKey in map.json alongside blockKey (future-proofing)

Currently map.json only stores `blockKey`. If we also store `contentTypeKey`, the bridge code can match directly without the destination.json lookup step. This makes the bridge resilient even if destination.json is out of date.

**map.json change:**
```json
{
  "target": "richTextContent",
  "blockKey": "06cbdd26-e9f9-41d7-8cfb-9eaa6cf45db9",
  "contentTypeKey": "34e5aa3b-db10-40a1-893d-79e98cd3f2f4",
  "transforms": null
}
```

**Bridge code change:** If `contentTypeKey` is present in the mapping, use it directly for `#applyBlockValueByContentType()` without needing to look up the block in destination.json first. Fall back to the current blockKey→destination lookup if `contentTypeKey` is absent (backwards compatibility).

**This also enables:**
- Mapping from the destination tab writes contentTypeKey directly (it's available on every block in destination.json)
- Mapping from the source tab writes contentTypeKey via the destination picker (same data source)
- The bridge becomes independent of blockKey accuracy — contentTypeKey is the real identifier

### Phase 4: Destination tab — blueprint change support

Add a "Choose Blueprint" action on the destination tab that:
1. Opens the blueprint picker
2. Regenerates destination.json from the new blueprint
3. Runs the blockKey reconciliation (Phase 1)
4. Updates the workflow.json with the new blueprint ID/name
5. Shows the reconciliation summary (N mappings updated, M orphaned)

This ties into the existing info box mockup which already has a "Choose Blueprint" button.

## Migration

Existing map.json files without `contentTypeKey` continue to work — the bridge falls back to the current blockKey→destination lookup. Phase 3 adds contentTypeKey to new mappings only. A migration could backfill contentTypeKey for existing mappings by looking up the blockKey in destination.json.

## Relationship to Bidirectional Mapping

This plan is a prerequisite for reliable bidirectional mapping:
- **Destination→source mapping** creates mappings with correct blockKeys (from current destination.json) + contentTypeKey
- **Source→destination mapping** creates mappings via the destination picker (same data)
- **Map tab** shows all mappings with correct block references
- **Changing the blueprint** reconciles everything automatically
- **contentTypeKey in map.json** (Phase 3) makes the whole system resilient to blockKey drift

## Priority

- **Phase 1** (auto-reconcile): HIGH — prevents the bug from recurring
- **Phase 2** (validation): MEDIUM — defensive, catches edge cases
- **Phase 3** (contentTypeKey in map.json): HIGH — makes the bridge resilient and enables destination tab mapping
- **Phase 4** (blueprint change): MEDIUM — nice to have, builds on Phases 1-3
