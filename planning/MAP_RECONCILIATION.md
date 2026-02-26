# Plan: Map-Destination Reconciliation

## Status: PLANNING

---

## Problem

When destination.json is regenerated from the current blueprint (which happens automatically every time a workflow loads), block instance GUIDs change. The map.json still references the old GUIDs. This causes:

1. **Content tab preview labels** — blocks with stale blockKeys show raw aliases (`featurePropertyFeatureTitle`, `richTextContent`) instead of friendly names ("Title", "Rich Text") because the key lookup fails
2. **Block group headers** — blocks with stale keys show under "Other" instead of their proper label ("Features", "Accommodation", etc.)
3. **Silent data integrity issue** — mappings reference blocks that technically don't exist in the current destination

**Content creation is NOT affected** — the creation pipeline already matches by `contentTypeKey`, which is stable. This is a workflow editor / preview UX issue.

---

## Why Frontend-Only Fix Failed

First attempt: add a `findBlockFuzzy` function that falls back to matching by property alias when the blockKey lookup fails.

**Problem:** All feature block types share the same property aliases through compositions (`featurePropertyFeatureTitle`, `richTextContent`, `featurePropertyFeatureSummary`, etc.). The fallback matched the first block with that alias, lumping all content into "Suggested Itinerary" instead of distributing across Features, Accommodation, and Itinerary.

**Lesson:** Property alias is not a reliable discriminator when multiple blocks share compositions. `contentTypeKey` (element type GUID) is the only stable, unique identifier per block type.

---

## Solution: Backend Reconciliation on Workflow Load

### When It Runs

During the existing destination regeneration pass in `WorkflowController.GetByAlias()` (line ~110). After destination.json is regenerated, compare map.json blockKeys against the new destination and reconcile.

### Reconciliation Logic

For each mapping in map.json that has a `blockKey`:

1. **Exact match** — blockKey exists in new destination.json → no action needed
2. **Unambiguous match by contentTypeKey** — blockKey not found, but map.json stores (or can infer) the `contentTypeKey`, and exactly one block in the new destination has that `contentTypeKey` → **auto-repair** the blockKey silently
3. **Ambiguous match** — multiple blocks in destination share the same `contentTypeKey` → **flag as ambiguous**, keep old blockKey, add a warning
4. **No match** — `contentTypeKey` not found in new destination at all (block type removed from blueprint) → **flag as broken**

### Data Change: Store contentTypeKey in map.json

Currently map.json mappings store:
```json
{
  "target": "richTextContent",
  "blockKey": "8417fee1-ced6-4929-ac1b-03457fe086dd",
  "transforms": null
}
```

Add `contentTypeKey` alongside `blockKey`:
```json
{
  "target": "richTextContent",
  "blockKey": "8417fee1-ced6-4929-ac1b-03457fe086dd",
  "contentTypeKey": "34e5aa3b-db10-40a1-893d-79e98cd3f2f4",
  "transforms": null
}
```

This is written when a mapping is created (the destination picker already knows the contentTypeKey). Existing map.json files without `contentTypeKey` can be backfilled from the destination.json that was current at the time (or on first reconciliation pass).

### Reconciliation Steps

```
For each mapping destination with a blockKey:
  1. Look up blockKey in current destination.json
  2. If found → done (keys in sync)
  3. If not found:
     a. Read contentTypeKey from the mapping
     b. Find all blocks in destination.json with that contentTypeKey
     c. If exactly 1 match → update blockKey, save map.json
     d. If multiple matches → mark mapping with warning flag
     e. If no matches → mark mapping as broken
```

### Warning/Broken Flags

Add optional status fields to mapping destinations:

```json
{
  "target": "richTextContent",
  "blockKey": "8417fee1-ced6-4929-ac1b-03457fe086dd",
  "contentTypeKey": "34e5aa3b-db10-40a1-893d-79e98cd3f2f4",
  "status": "ambiguous",
  "statusMessage": "Multiple Itinerary blocks exist — please re-select the target block"
}
```

Status values: `null` (healthy), `"ambiguous"`, `"broken"`.

The frontend Map tab and Content tab can read these flags and show visual indicators.

---

## Implementation Phases

### Step 1: Store contentTypeKey in new mappings

When the Source tab destination picker creates a mapping, include `contentTypeKey` from the selected block. No reconciliation yet — just starts storing the data.

**Files:** `destination-picker-modal.element.ts`, `workflow.types.ts` (add `contentTypeKey` to `MappingDestination`)

### Step 2: Backend reconciliation pass

Add a `ReconcileMapWithDestination()` method to `WorkflowService` or a new `MapReconciliationService`. Called after destination regeneration in `GetByAlias()`.

**Logic:**
- Load map.json
- For each destination with a blockKey, check if it exists in the regenerated destination.json
- Auto-repair unambiguous matches (single contentTypeKey match)
- Flag ambiguous/broken mappings
- Save updated map.json if any changes were made

**Files:** `WorkflowService.cs` or new `MapReconciliationService.cs`, `WorkflowController.cs`

### Step 3: Backfill contentTypeKey for existing mappings

For map.json files that don't have `contentTypeKey` on their destinations, infer it from the current destination.json during the reconciliation pass. If blockKey matches a current block, copy the `contentTypeKey` from that block. If blockKey is already stale, attempt to match by position or other heuristics.

### Step 4: Frontend visual indicators

Show warning/broken status on:
- **Map tab** — row highlighting or icon for ambiguous/broken mappings
- **Content tab preview** — skip or visually flag broken mappings
- **Source tab** — mapping badges reflect status

---

## Affected Files

| File | Change |
|------|--------|
| `workflow.types.ts` | Add `contentTypeKey` and `status`/`statusMessage` to `MappingDestination` |
| `destination-picker-modal.element.ts` | Include `contentTypeKey` when creating mappings |
| `WorkflowService.cs` (or new service) | Reconciliation logic |
| `WorkflowController.cs` | Call reconciliation after destination regeneration |
| `MapConfig.cs` / mapping models | Add `ContentTypeKey`, `Status`, `StatusMessage` properties |
| `up-doc-modal.element.ts` | Content tab respects status flags |
| `up-doc-workflow-map-view.element.ts` | Map tab shows status indicators |

---

## Edge Cases

1. **Blueprint adds a second block of the same type** — e.g., two `featureRichTextEditorItinery` blocks. Existing mapping becomes ambiguous. Reconciliation flags it; editor must re-select.

2. **Blueprint removes a block type entirely** — mapping becomes broken. Editor must delete the mapping or remap to a different block.

3. **Blueprint swapped to a different one** — all blockKeys stale, but contentTypeKeys may still match if the new blueprint uses the same element types. Reconciliation handles this naturally.

4. **Shared compositions** — multiple block types share property aliases (the exact issue that broke the frontend-only fix). contentTypeKey is unique per element type, so reconciliation isn't affected.

---

## Relationship to Other Work

- **Content creation pipeline** — already uses `contentTypeKey` matching, unaffected by this work
- **Destination regeneration** — already happens on every workflow load, this adds a reconciliation step after it
- **Source tab mapping** — currently creates mappings without `contentTypeKey`, Step 1 fixes this going forward
- **Stale label display** — the cosmetic issue that surfaced this problem, fully resolved by Step 2
