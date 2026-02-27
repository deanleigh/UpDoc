# Sprint 5 Continuation Prompt

Paste this to resume work:

---

## Context

I'm on branch `feature/blockkey-reconciliation-sprint4`. Sprint 4 is complete and committed (`1c3ad18`).

There are also uncommitted uSync cleanup changes — 20 stale `.config` files were deleted from `src/UpDoc.TestSite/uSync/v17/Content/` (duplicate Flemish Masters, Northern Ireland, etc. from old test runs that were breaking uSync import). These should be committed first.

## Task: BlockKey Reconciliation Sprint 5

**Sprint 5: Validate blockKeys on workflow config load (defensive)**

From `planning/BLOCKKEY_RECONCILIATION_SPRINTS.md`:

- In `WorkflowService.cs`, add validation when loading a workflow config
- For each mapping destination with a `blockKey`, verify that key exists in destination.json
- If not found, flag it (don't delete)
- Add a `validationWarnings` list to the API response for `GET /workflows/{alias}`
- Add the warnings as a property on `DocumentTypeConfig` (in `MapConfig.cs`)

**Files to modify:**
- `src/UpDoc/Services/WorkflowService.cs` — validation logic
- `src/UpDoc/Controllers/WorkflowController.cs` — call validation after loading config
- `src/UpDoc/Models/MapConfig.cs` — add `ValidationWarnings` property to `DocumentTypeConfig`
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/tests/e2e/blockkey-reconciliation.spec.ts` — Sprint 5 tests

**Test approach (API-level, no UI):**
1. Write a map.json with a bogus blockKey via API
2. GET /workflows/{alias}
3. Assert the response includes a validation warning about the orphaned blockKey
4. Clean up: restore the correct blockKey

**Important design note from discussion:**
- We decided AGAINST toast notifications for reconciliation feedback
- Instead, warnings will surface inline on the Map tab (Sprint 7) as visual indicators on mapping badges (green → red/orange for orphaned)
- Sprint 5 provides the data layer; Sprint 7 will consume it in the UI
- uSync's report pattern (category icons with badges + expandable detail) is the UI inspiration

## Steps
1. Commit the uSync cleanup first (separate commit)
2. Implement Sprint 5
3. Run tests
4. Commit
