# BlockKey Reconciliation — Sprint Breakdown

Each sprint is the smallest testable unit of work. Every sprint has a Playwright E2E test that proves it works before moving on. No sprint depends on assumptions — only on code verified by the previous sprint's test.

---

## Sprint 1: Add `contentTypeKey` to `MappingDestination` model (C# only)

**What changes:**
- Add `[JsonPropertyName("contentTypeKey")] public string? ContentTypeKey { get; set; }` to `MappingDestination` in `MapConfig.cs`

**What does NOT change:**
- No TypeScript changes
- No bridge code changes
- No endpoint changes
- Existing map.json files without `contentTypeKey` still deserialize fine (nullable property)

**Test: Unit-level verification via API**
- Playwright test: `PUT /workflows/{alias}/map` with a map.json body that includes `contentTypeKey` on a destination
- `GET /workflows/{alias}` and verify the returned map config includes the `contentTypeKey` value
- Also verify a map.json WITHOUT `contentTypeKey` still loads correctly (backwards compatibility)

**Why this is safe:** Adding an optional nullable property to a model is zero-risk. Existing JSON round-trips unchanged.

**Files modified:** `MapConfig.cs` (1 line added)

---

## Sprint 2: Write `contentTypeKey` when saving mappings from the Source tab

**What changes:**
- In the destination picker modal (`destination-picker-modal.element.ts`), when the user picks a block property, include `contentTypeKey` from the destination block alongside `blockKey`
- The `PUT /workflows/{alias}/map` call already saves whatever's in the mapping — Sprint 1 ensures the model accepts it

**What does NOT change:**
- Bridge code still uses blockKey lookup (not yet reading contentTypeKey from map.json)
- No C# changes

**Test: Playwright E2E**
- Navigate to workflow editor → Source tab
- Select a source element → click "Map to..." → pick a block property
- Read the saved map.json via API (`GET /workflows/{alias}`)
- Assert the new mapping has BOTH `blockKey` AND `contentTypeKey`
- Assert `contentTypeKey` matches the block's element type GUID from destination.json

**Files modified:** `destination-picker-modal.element.ts` (pass contentTypeKey through when creating mapping)

---

## Sprint 3: Bridge uses `contentTypeKey` from map.json (with blockKey fallback)

**What changes:**
- In both bridge files (`up-doc-action.ts` and `up-doc-collection-action.element.ts`):
  - If `dest.contentTypeKey` exists in the mapping, call `#applyBlockValueByContentType()` directly — skip the blockKey→destination.json lookup entirely
  - If `dest.contentTypeKey` is absent, fall back to existing blockKey lookup (backwards compatibility)

**What does NOT change:**
- No C# changes
- No model changes

**Test: Playwright E2E (document-verification pattern)**
- Create a document from source using a workflow that has `contentTypeKey` in its mappings (from Sprint 2)
- Verify via API that block properties are correctly populated
- This is the existing `document-verification.spec.ts` pattern — extend it or run it against the updated code

**Verification of resilience:**
- Manually corrupt a `blockKey` in map.json (set it to a random GUID) but leave `contentTypeKey` correct
- Create a document from source
- Assert blocks are STILL correctly populated (because bridge now uses contentTypeKey directly)

**Files modified:** `up-doc-action.ts`, `up-doc-collection-action.element.ts` (both bridge files, identical change)

---

## Sprint 4: Auto-reconcile blockKeys when destination is regenerated

**What changes:**
- In `WorkflowController.cs` `RegenerateDestination` endpoint:
  1. Load old destination.json BEFORE regenerating
  2. Generate new destination.json
  3. Build old→new blockKey map using contentTypeKey as the join key
  4. Load map.json, replace every `blockKey` using the map, also backfill `contentTypeKey` if absent
  5. Save both files
  6. Return a response that includes reconciliation summary: `{ destination: {...}, reconciliation: { updated: N, orphaned: M, details: [...] } }`

**What does NOT change:**
- No TypeScript changes
- Bridge code unchanged (already handles both contentTypeKey and blockKey from Sprint 3)

**Test: Playwright E2E**
- Navigate to workflow in Settings
- Call regenerate-destination via API (or click the button in the UI if it exists)
- Read map.json via API
- Assert ALL blockKeys in map.json exist in the new destination.json
- Assert contentTypeKey is present on all block mappings (backfilled during reconciliation)
- Verify the API response includes reconciliation counts

**Files modified:** `WorkflowController.cs` (or extract to `WorkflowService.cs` — wherever the logic fits cleanly)

---

## Sprint 5: Validate blockKeys on workflow config load (defensive)

**What changes:**
- In `WorkflowService.cs`, add a validation check when loading a workflow config:
  - For each mapping destination with a `blockKey`, verify that key exists in destination.json
  - If not found, log a warning with the mapping details
  - Add a `validationWarnings` list to the API response for `GET /workflows/{alias}`
- This is defensive — catches any edge case that reconciliation (Sprint 4) misses

**What does NOT change:**
- No TypeScript changes
- No bridge code changes
- Invalid mappings are NOT deleted — just flagged

**Test: Playwright E2E**
- Manually write a map.json with a bogus blockKey via API
- `GET /workflows/{alias}`
- Assert the response includes a validation warning about the orphaned blockKey
- Clean up: restore the correct blockKey

**Files modified:** `WorkflowService.cs` (validation logic), `WorkflowController.cs` (return warnings in response)

---

## Sprint 6: Backfill `contentTypeKey` for existing map.json files (migration)

**What changes:**
- Add a migration pass (similar to existing Passes 1-3 in `WorkflowService.cs`) that runs at startup:
  - For each workflow, load map.json and destination.json
  - For each mapping destination with a `blockKey` but no `contentTypeKey`:
    - Look up the block in destination.json by `blockKey`
    - If found, copy `contentTypeKey` from the destination block into the mapping
    - Save map.json
  - Log migration results

**What does NOT change:**
- No TypeScript changes
- No endpoint changes

**Test: Playwright E2E**
- Before test: write a map.json via API with blockKey but NO contentTypeKey
- Restart the site (or trigger migration endpoint if we add one)
- Read map.json via API
- Assert contentTypeKey is now present on the mapping
- Assert it matches the correct block's element type GUID

**Alternative test (if restart is impractical):** Add the backfill as an API endpoint (`POST /workflows/{alias}/backfill-content-type-keys`) that can be called from the test, then migrate it to startup later.

**Files modified:** `WorkflowService.cs` (migration pass)

---

## Sprint 7: Surface orphaned mappings in the Map tab (UI)

**Problem:** When a blueprint is edited and a block is removed, Sprint 4 flags the affected mappings as orphaned (contentTypeKey no longer exists in destination.json). But the workflow author has no way to see this — the mappings silently fail during document creation.

**What changes:**
- Map tab renders orphaned mappings with a warning indicator (e.g., orange/red badge, strikethrough, or "Orphaned — block removed from blueprint" label)
- Orphaned mappings are visually distinct from healthy mappings
- The bridge code already handles this gracefully (skips missing blocks) — this sprint is purely UI

**What does NOT change:**
- No C# changes (Sprint 5 already provides validation warnings in the API response)
- No bridge code changes
- Orphaned mappings are NOT auto-deleted — the user decides

**Test: Playwright E2E**
- Write a map.json with a mapping pointing to a non-existent contentTypeKey via API
- Open the workflow editor → Map tab
- Assert the orphaned mapping shows a warning indicator
- Clean up: restore correct map.json

**Files modified:** `up-doc-workflow-map-view.element.ts` (or equivalent Map tab component)

---

## Sprint 8: Delete or re-map orphaned mappings from the Map tab (UI)

**What changes:**
- Each orphaned mapping gets action buttons:
  - **Delete** — removes the mapping from map.json
  - **Re-map** — opens the destination picker to choose a new block/field (creates a new mapping, deletes the orphaned one)
- Healthy mappings already have Delete — this sprint adds Re-map for orphaned ones specifically

**What does NOT change:**
- No C# changes
- No bridge code changes

**Test: Playwright E2E**
- Write a map.json with an orphaned mapping via API
- Open Map tab → click Delete on the orphaned mapping
- Read map.json via API → assert the mapping is removed
- (Separate test) Click Re-map → pick a new destination → assert new mapping created with correct contentTypeKey

**Files modified:** `up-doc-workflow-map-view.element.ts`, possibly `destination-picker-modal.element.ts` (if re-map reuses it)

---

## Sprint order and dependencies

```
Sprint 1 ──→ Sprint 2 ──→ Sprint 3          (COMPLETE)
                              │
Sprint 4 (independent of 2/3, but benefits from Sprint 1)
                              │
Sprint 5 (independent, can run after Sprint 1)
                              │
Sprint 6 (needs Sprint 1, benefits from Sprint 4)
                              │
Sprint 7 ──→ Sprint 8 (need Sprint 5 for orphan detection in API)
```

**Minimum viable fix:** Sprints 1 + 3 + 4 = the bug can't recur and existing mappings work.
**Full resilience:** All 8 sprints.
**Orphan handling:** Sprints 7 + 8 require Sprint 5 (validation warnings in API response).

**Recommended order:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 (linear, each building on the last, each independently testable).

---

## Test file plan

All new tests go in a single new spec file: `blockkey-reconciliation.spec.ts`

Tests are grouped by sprint using `describe` blocks. Each sprint's tests can be run independently by filtering with `--grep`.

**API helper pattern** (reuse from `document-verification.spec.ts`):
- `apiGet(page, path)` — GET with auth token
- `apiPut(page, path, body)` — PUT with auth token
- `apiPost(page, path, body)` — POST with auth token

**Workflow used for testing:** `tailoredTourPdf` (has block mappings, real data).

**No UI navigation needed for most tests** — these are API-level tests that verify data integrity. Only Sprint 2 needs UI interaction (destination picker modal). Sprint 3 needs the full create-from-source flow (existing pattern).
