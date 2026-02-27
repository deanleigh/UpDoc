# Plan: Change Destination (Document Type & Blueprint)

## Context

The Destination tab's "Change" buttons on Document Type and Blueprint info boxes are currently disabled ("Coming soon"). Before building destination-driven mapping, we need the ability to swap the doc type / blueprint on an existing workflow. This regenerates `destination.json` and reconciles `map.json` — existing orphan handling on the Map tab and Source tab provides the validation feedback.

## Sprint 1: Backend — New Endpoint + WorkflowService Extension

### 1A. Request model: `ChangeDestinationRequest`
- Add to `WorkflowController.cs` alongside existing request classes
- Fields: `DocumentTypeAlias`, `DocumentTypeName?`, `BlueprintId`, `BlueprintName?`

### 1B. New method: `IWorkflowService.UpdateWorkflowDestination()`
- Interface + implementation in `WorkflowService.cs`
- Reads existing `workflow.json`, updates doc type + blueprint fields, writes back
- Does NOT regenerate destination or reconcile mappings (controller orchestrates that)
- Pattern follows existing `UpdateWorkflowIdentity()`

### 1C. New endpoint: `PUT /workflows/{alias}/destination`
- In `WorkflowController.cs`
- Orchestrates: update workflow.json → load old destination → regenerate from new blueprint → reconcile blockKeys → save new destination
- Reuses existing `ReconcileBlockKeys()` private method and `BuildDestinationConfigAsync()`
- Returns `RegenerateDestinationResponse` (same shape as regenerate-destination endpoint)

**Files:**
- `src/UpDoc/Controllers/WorkflowController.cs`
- `src/UpDoc/Services/WorkflowService.cs` (interface + implementation)

## Sprint 2: Frontend — Enable Buttons + Wire Up Modals

### 2A. New API function: `changeWorkflowDestination()`
- In `workflow.service.ts`
- PUT to `/workflows/{alias}/destination`
- Calls `clearConfigCache()` on success

### 2B. Destination tab changes
- In `up-doc-workflow-destination-view.element.ts`
- Enable both "Change" buttons (remove `disabled`, remove `title="Coming soon"`)
- Add `_workflowAlias` state property (stored from workspace context)

### 2C. "Change Document Type" handler
- Fetches all doc types + their blueprints (same API calls as Create Workflow flow)
- Opens `UMB_BLUEPRINT_PICKER_MODAL` with full `DocumentTypeOption[]` — two-step: pick doc type, then blueprint
- On confirm: calls `changeWorkflowDestination()` API, then reloads config
- Helper method returns both `DocumentTypeOption[]` and an alias lookup map (picker returns GUIDs, API needs aliases)

### 2D. "Change Blueprint" handler
- Fetches blueprints for current doc type only
- Builds single-entry `DocumentTypeOption[]` (one extra click accepted — no modal changes)
- Opens `UMB_BLUEPRINT_PICKER_MODAL`
- On confirm: calls `changeWorkflowDestination()` API, then reloads config

**Files:**
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.service.ts`
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-destination-view.element.ts`

## What Stays Unchanged
- `blueprint-picker-modal.element.ts` — reused as-is
- `blueprint-picker-modal.token.ts` — reused as-is
- `manifest.ts` — no new registrations needed
- Source tab, Map tab — already handle orphaned mappings
- "Regenerate" buttons on Fields/Blocks — remain disabled (separate future feature)
- Source config, sample extraction — unaffected by destination changes

## Verification
1. **Change Document Type**: opens picker with all doc types → pick new type → pick blueprint → info boxes update, fields/blocks reflect new structure
2. **Change Blueprint**: opens picker showing current doc type → pick different blueprint → info boxes update, destination regenerates
3. **Orphaned mappings**: after changing to a doc type with different fields, existing mappings show orphaned tags on Map tab and warning badges on Source tab
4. **Cancel**: no changes, view unchanged
5. **Same selection**: no errors, harmless refresh
6. Build TypeScript, build .NET, run site, manual test both buttons
