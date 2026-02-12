# Plan: Fix Block Grid Ordering in Destination Tab

## Problem

The Destination tab's Page Content view shows blocks in `contentData` array order — the order blocks were *added* to the grid, not their visual position on the page. This means the mapping workflow doesn't reflect the actual page layout.

**Current order in `destination.json`:**
1. Feature - Navigation - Descendants
2. Suggested Itinerary
3. Features
4. Accommodation
5. Feature - Page - Title and Description

**Actual visual order (from Sort Mode):**
1. Feature - Page - Title and Description *(Layout-12, full width row)*
2. Feature - Navigation - Descendants *(Layout 3|6|3, left column)*
3. Suggested Itinerary *(Layout 3|6|3, centre column)*
4. Features *(Layout 3|6|3, centre column)*
5. Accommodation *(Layout 3|6|3, centre column)*

"Feature - Page - Title and Description" should be first but appears last. When doing top-to-bottom mapping, this is confusing.

---

## Root Cause

`DestinationStructureService.BuildBlockGridFromBlueprint()` (lines 263-270) iterates `contentData` directly:

```csharp
foreach (var blockData in contentDataArray.EnumerateArray())
{
    var block = BuildBlockFromInstance(blockData);
    if (block != null)
    {
        blockGrid.Blocks.Add(block);
    }
}
```

The block grid JSON has **two separate structures**:
- `contentData` — flat array of all block content (unordered)
- `layout["Umbraco.BlockGrid"]` — tree structure defining visual layout and order

The service reads `contentData` but ignores `layout` entirely.

### Block Grid Layout Structure

```json
{
  "contentData": [ /* flat array, arbitrary order */ ],
  "settingsData": [ /* flat array */ ],
  "layout": {
    "Umbraco.BlockGrid": [
      {
        "contentKey": "layout-12-guid",
        "columnSpan": 12,
        "rowSpan": 1,
        "areas": [
          {
            "key": "area-guid",
            "items": [
              { "contentKey": "title-desc-block-guid", "areas": [] }
            ]
          }
        ]
      },
      {
        "contentKey": "layout-3-6-3-guid",
        "columnSpan": 12,
        "rowSpan": 1,
        "areas": [
          {
            "key": "left-area-guid",
            "items": [
              { "contentKey": "nav-block-guid", "areas": [] }
            ]
          },
          {
            "key": "center-area-guid",
            "items": [
              { "contentKey": "itinerary-block-guid", "areas": [] },
              { "contentKey": "features-block-guid", "areas": [] },
              { "contentKey": "accommodation-block-guid", "areas": [] }
            ]
          }
        ]
      }
    ]
  }
}
```

A depth-first traversal of this tree produces the correct visual order.

---

## Solution

### Approach: Post-processing reorder

Keep the existing `contentData` iteration (which builds block objects with all their properties). After building the list, reorder it based on the layout tree.

### Changes Required

**File:** `src/UpDoc/Services/DestinationStructureService.cs`

**Step 1:** After building blocks from `contentData` (line 270), extract the layout structure:

```csharp
// Existing: build blocks from contentData (unordered)
var blocksByKey = new Dictionary<string, DestinationBlock>();
foreach (var blockData in contentDataArray.EnumerateArray())
{
    var block = BuildBlockFromInstance(blockData);
    if (block != null)
    {
        blocksByKey[block.Key] = block;
    }
}

// New: reorder using layout structure
if (TryGetLayoutArray(root, out var layoutArray))
{
    var orderedBlocks = GetBlocksInLayoutOrder(layoutArray, blocksByKey);
    blockGrid.Blocks = orderedBlocks;
}
else
{
    // Fallback: contentData order (current behaviour)
    blockGrid.Blocks = blocksByKey.Values.ToList();
}
```

**Step 2:** Add a new method to extract the layout array:

```csharp
private static bool TryGetLayoutArray(JsonElement root, out JsonElement layoutArray)
{
    layoutArray = default;

    if (!TryGetJsonProperty(root, "layout", out var layoutObj))
        return false;

    // Try "Umbraco.BlockGrid" key
    if (layoutObj.TryGetProperty("Umbraco.BlockGrid", out layoutArray) &&
        layoutArray.ValueKind == JsonValueKind.Array)
        return true;

    return false;
}
```

**Step 3:** Add a recursive depth-first traversal method:

```csharp
/// <summary>
/// Walks the block grid layout tree depth-first to produce blocks
/// in visual order (top-to-bottom, left-to-right within each layout row).
/// Layout blocks themselves are skipped (they have no text-mappable properties)
/// but their nested content blocks are included in order.
/// </summary>
private static List<DestinationBlock> GetBlocksInLayoutOrder(
    JsonElement layoutArray,
    Dictionary<string, DestinationBlock> blocksByKey)
{
    var ordered = new List<DestinationBlock>();
    WalkLayoutItems(layoutArray, blocksByKey, ordered);
    return ordered;
}

private static void WalkLayoutItems(
    JsonElement items,
    Dictionary<string, DestinationBlock> blocksByKey,
    List<DestinationBlock> ordered)
{
    foreach (var item in items.EnumerateArray())
    {
        // Get contentKey for this layout item
        if (TryGetJsonProperty(item, "contentKey", out var keyEl))
        {
            var key = keyEl.GetString();
            if (key != null && blocksByKey.TryGetValue(key, out var block))
            {
                ordered.Add(block);
                blocksByKey.Remove(key); // Prevent duplicates
            }
        }

        // Recurse into areas → items
        if (TryGetJsonProperty(item, "areas", out var areas) &&
            areas.ValueKind == JsonValueKind.Array)
        {
            foreach (var area in areas.EnumerateArray())
            {
                if (TryGetJsonProperty(area, "items", out var areaItems) &&
                    areaItems.ValueKind == JsonValueKind.Array)
                {
                    WalkLayoutItems(areaItems, blocksByKey, ordered);
                }
            }
        }
    }
}
```

### Key Design Points

- **Layout blocks (e.g., Layout-12) are invisible.** They have no text-mappable properties, so `BuildBlockFromInstance` already returns null for them. They won't appear in `blocksByKey`. The traversal visits them but only picks up their nested content blocks.
- **Depth-first traversal** naturally produces top-to-bottom, left-to-right order.
- **Fallback:** If the layout structure is missing or unparseable, fall back to current `contentData` order.
- **No frontend changes needed.** The frontend renders blocks in the order `destination.json` provides.
- **No `destination.json` schema changes.** Same structure, just reordered.

### What About Layout Names as Group Headers?

**Decision: Skip for now.** Layout names like "Layout - 12" and "Layout - 3 | 6 | 3" are technical labels that mean nothing to a workflow author. The correct visual order alone gives the user the top-to-bottom mapping experience they need. If grouping becomes useful later (e.g., "Header area", "Main content area"), it can be added as a separate enhancement — the layout traversal code makes this easy to add.

---

## Testing

1. **Regenerate destination.json** for the `group-tour-pdf` workflow (via the API or by deleting and letting it auto-regenerate)
2. **Verify block order** in the regenerated file matches the visual order from Sort Mode:
   - Feature - Page - Title and Description (first)
   - Feature - Navigation - Descendants
   - Suggested Itinerary
   - Features
   - Accommodation (last)
3. **Open the Destination tab** in the workflow workspace — blocks should now appear top-to-bottom matching the actual page layout
4. **Test with a workflow that has no layout structure** (if one exists) — should fall back gracefully

---

## Branch

```bash
git checkout main
git pull
git checkout -b feature/block-grid-ordering
```

Note: `feature/section-mapping` has 2 unmerged commits. Decide whether to merge that to main first or branch from current main.

---

## Scope

- **In scope:** Reorder blocks in `destination.json` to match visual layout order
- **Out of scope:** Layout name headers, visual layout recreation, nested layout visualisation
- **Estimated effort:** Small — one file changed (`DestinationStructureService.cs`), ~50 lines of new code
