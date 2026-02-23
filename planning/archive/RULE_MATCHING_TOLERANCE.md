# Rule Matching Tolerance — Font Size & Position Fixes

## Status: DIAGNOSED — Ready for Implementation

---

## Problem

Rules built from one PDF (Andalucía, updoc-test-03.pdf) fail to match elements in other PDFs from the same Tailored Travel template. The visual layout is identical, but PdfPig reports different font metrics.

**Debug output confirmed** (Feb 2026) that `fontSizeEquals` is the primary blocker and `positionFirst`/`positionLast` are a secondary issue.

---

## Root Cause: Font Size Variation Across PDFs

PDFs produced by the same designer/template embed fonts with different scaling. PdfPig extracts the raw metrics, which vary:

| Element | Andalucía PDF | Dresden PDF | Diff |
|---------|--------------|-------------|------|
| Organisation | 11.4 | 10.8 | 0.6 |
| Tour Title | 28 | 31 | **3.0** |
| Tour Description | 14.4 | 14.4 | 0 (but in wrong area) |
| Organiser Name | 23 | 24 | 1.0 |
| Day Number | 10 | 11 | 1.0 |
| Day Details | 10 | 11 | 1.0 |
| Disclaimer | 8 | 8 | 0 |

The current `fontSizeEquals` tolerance is `< 0.5` (hardcoded in `MatchesCondition`). All failing elements exceed this.

### Why Tour Details works

Tour Details uses fontSize 12 and 8.5, which happen to be identical across both PDFs. The one miss is the disclaimer at fontSize=8.0 (rule expects 8.5, diff=0.5, fails because tolerance is `<` not `<=`).

---

## Root Cause: Position Conditions Unreliable

`positionFirst` and `positionLast` rely on element index within an area. This breaks when:

1. **Page Header**: Only 2 elements in Dresden (Organisation + Tour Title). Tour Description ("6 days from £994...") ended up in the Itinerary area. `positionLast` (index=1, total=2) doesn't match the Tour Description rule.

2. **Organiser Information**: Dresden PDF has an extra element at position 0 ("For more information on this tour contact your Group Organiser..."). This pushes Organiser Name to index 1, so `positionFirst` fails.

Position conditions are fragile because:
- Area boundaries may capture different elements across PDFs
- Some PDFs have extra preamble text that shifts indices
- Element count varies even within the "same" area

---

## Fix Plan

### Fix 1: Replace `fontSizeEquals` with `fontSizeRange` for cross-PDF rules

Add a new condition type `fontSizeRange` that accepts min/max:

```json
{ "type": "fontSizeRange", "value": { "min": 25, "max": 35 } }
```

**C# implementation** in `PdfPagePropertiesService.MatchesCondition()`:

```csharp
"fontSizeRange" => {
    var range = JsonSerializer.Deserialize<FontSizeRange>(valueStr);
    return range != null && element.FontSize >= range.Min && element.FontSize <= range.Max;
}
```

This is the correct abstraction — rules that need to work across PDFs should express "large title font" (25-35pt) rather than "exactly 28pt". Rules built from a single PDF can still use `fontSizeEquals` for precision.

**Also fix `fontSizeEquals` tolerance**: Change `< 0.5` to `<= 0.5` so the disclaimer (diff=0.5 exactly) passes. This is a one-character fix.

### Fix 2: Remove position conditions from cross-PDF rules

Remove `positionFirst` and `positionLast` from the failing rules in source.json. For these specific rules, font + color conditions are sufficient:

| Rule | Current conditions | After fix |
|------|-------------------|-----------|
| Organisation | fontSize + fontName + color + **positionFirst** | fontSizeRange(9-13) + fontName + color |
| Tour Title | fontSize + fontName + color | fontSizeRange(25-35) + fontName + color |
| Tour Description | fontSize + fontName + color + **positionLast** | fontSizeRange(13-16) + fontName + color |
| Organiser Name | fontSize + fontName + color + **positionFirst** | fontSizeRange(20-27) + fontName + color |

Position conditions remain valid for rules that don't cross PDFs, or where the element count is truly stable.

### Fix 3: Update existing rules in source.json

Replace `fontSizeEquals` with `fontSizeRange` for all rules in `tailored-tour-pdf/source.json` where cross-PDF compatibility matters. Choose ranges that comfortably cover observed variation:

**page-header rules:**
- Organisation: fontSizeRange(9, 13) + fontNameContains "HelveticaNeue-Medium" + colorEquals "#FFD200"
- Tour Title: fontSizeRange(25, 35) + fontNameContains "Clarendon" + colorEquals "#FFFFFF"
- Tour Description: fontSizeRange(13, 16) + fontNameContains "HelveticaNeue-Medium" + colorEquals "#FFD200"

**organiser-information rules:**
- Organiser Name: fontSizeRange(20, 27) + fontNameContains "Clarendon" + colorEquals "#FFD200"
- Organiser Telephone: keep fontSizeEquals(18) + textBeginsWith "Tel:" (text match is strong enough)
- Organiser Email: keep fontSizeEquals(14) + textBeginsWith "Email:" (text match is strong enough)
- Organiser Address: fontSizeRange(10, 14) + fontNameContains "Clarendon" + colorEquals "#FFFFFF" (remove positionLast)

**itinerary rules:**
- Day Number: fontSizeRange(9, 12) + fontNameContains "HelveticaNeue-Medium" + colorEquals "#16549D"
- Day Details: fontSizeRange(9, 12) + fontNameContains "HelveticaNeue" + colorEquals "#221F1F"
- Disclaimer: fontSizeRange(7, 9) + fontNameContains "HelveticaNeue-Medium" + colorEquals "#16549D"

### Fix 4: Update rules editor UI

Add `fontSizeRange` to the condition dropdown in the rules editor modal. The UI shows two inputs (min/max) instead of one value input when this condition type is selected.

---

## Implementation Steps

1. **C# — Add `fontSizeRange` condition** to `MatchesCondition()` in `PdfPagePropertiesService.cs`
2. **C# — Fix `fontSizeEquals` tolerance** from `< 0.5` to `<= 0.5`
3. **JSON — Update source.json** rules to use `fontSizeRange` and remove position conditions
4. **TypeScript — Update rules editor** condition dropdown to support `fontSizeRange` with min/max inputs
5. **Test** with Dresden PDF (updoc-test-01.pdf) and Andalucía PDF (updoc-test-03.pdf)
6. **Cleanup** — Remove debug logging from ContentTransformService.cs and up-doc-modal.element.ts

---

## Files to Change

| File | Change |
|------|--------|
| `src/UpDoc/Services/PdfPagePropertiesService.cs` | Add `fontSizeRange` to `MatchesCondition()`, fix `fontSizeEquals` tolerance |
| `src/UpDoc.TestSite/updoc/workflows/tailored-tour-pdf/source.json` | Update rules to use `fontSizeRange`, remove position conditions |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/section-rules-editor-modal.element.ts` | Add `fontSizeRange` to condition dropdown with min/max UI |
| `src/UpDoc/Services/ContentTransformService.cs` | Remove debug Console.WriteLine (after fix verified) |
| `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-modal.element.ts` | Remove debug console.log (after fix verified) |

---

## Also update RULES_EDITOR.md

Add `fontSizeRange` to the conditions table:

| JSON Value | UI Label | Category |
|-----------|----------|----------|
| `fontSizeRange` | Font size between | Font |

With value format: `{ "min": number, "max": number }`

---

## Stale map.json Keys (Separate Cleanup)

`tailored-tour-pdf/map.json` has BOTH old content-derived keys (e.g., `the-moorish-treasures-of-andaluc-a.heading`) AND new rule-driven keys (e.g., `tour-title.content`). The old keys will never match any PDF other than Andalucía. Clean up after the rule matching fix is verified:
- Remove all old content-derived mappings (lines 8-94 approx)
- Keep only rule-driven mappings

---

## Related Documents

- **`RULES_EDITOR.md`** — Condition types and data model (update with `fontSizeRange`)
- **`TRANSFORMED_VIEW.md`** — Configurable extraction defaults (mentions `fontSizeTolerance: 0.5`)
