# Plan: Playwright E2E Testing for UpDoc

## Status: NOT STARTED

## Purpose

Automate the repetitive manual testing of UpDoc's Create from Source workflow. Currently the developer must manually upload PDFs, click through the Create from Source flow, and inspect the resulting document properties every time a change is made. This is slow, error-prone, and doesn't scale as the system grows more complex.

Playwright browser automation will script these journeys so they can be re-run in seconds.

## Why now

The section-based mapping refactor (see `planning/SECTION_BASED_MAPPING.md`) is a large architectural change touching extraction, mapping, bridge code, and UI. Having automated tests **before** starting that refactor means:

- Tests verify the current system works with the sample PDF (baseline)
- Tests prove the current system fails with a different PDF (documenting the problem)
- Tests verify the refactored system works with both PDFs (proving the fix)
- Every incremental change can be tested without manual clicking

The investment is small (half a day) relative to the refactoring work (1-2 days), and pays for itself immediately.

## Umbraco skill references

- `umbraco-e2e-testing` — E2E testing patterns for Umbraco backoffice extensions using Playwright
- `umbraco-playwright-testhelpers` — `@umbraco/playwright-testhelpers` package: fixtures, API helpers, UI helpers
- `umbraco-testing` — router skill for choosing the right testing approach

## Scope — Phase 1 (before section-based mapping refactor)

### Test 1: Create from Source with sample PDF (should pass)
1. Navigate to Content > Group Tours
2. Click "Create from Source" collection action button
3. Blueprint picker: select Group Tour blueprint
4. Source modal: select PDF source type
5. Source modal: pick a known test PDF from media library (the Flemish Masters PDF used as the sample)
6. Wait for extraction to complete
7. Click Create
8. Verify the created document has correct:
   - Page Title (populated, not empty)
   - Page Description (populated, not empty)
   - Features block Title = "FEATURES"
   - Features block Rich Text contains feature bullets but does NOT contain "WHAT WE WILL SEE"

### Test 2: Create from Source with different PDF (documents the current bug)
1. Same flow but with the Andalucía PDF
2. Verify: Features block Rich Text DOES contain "WHAT WE WILL SEE" (proving the cross-section contamination bug)
3. This test is expected to **demonstrate the failure** — it documents the problem we're fixing

### Test 3: Workflow authoring (source tab mapping)
1. Navigate to Settings > UpDoc > Workflows
2. Open the group-tour-pdf workflow
3. Click Source tab
4. Verify elements render with metadata badges
5. Select elements, click "Map to...", pick a destination
6. Verify mapping appears on Map tab

## Scope — Phase 2 (after section-based mapping refactor)

- Test 2 should now PASS (different PDF produces correct section boundaries)
- Add new tests for section-level mapping operations
- Add tests for edge cases (PDFs with varying numbers of sections/bullets)

## Test data

Test PDFs need to be available in the Umbraco media library:
- `TTM5063 Wensum Flemish Bruges Antwerp Ghent lo.pdf` — the current sample (Flemish Masters)
- A second PDF with different structure (e.g., Magical Andalucía) — to prove cross-PDF reliability

## Technical setup

- Playwright installed as dev dependency in the UpDoc project (or test project)
- `@umbraco/playwright-testhelpers` for Umbraco backoffice navigation
- Test configuration for the UpDoc.TestSite (localhost URL, credentials)
- Invoke the Umbraco testing skills before implementation for patterns and setup guidance

## Notes & learnings

_(This section will be updated as we implement and discover patterns/gotchas)_

## Branch

```bash
git checkout main && git pull && git checkout -b feature/playwright-testing
```
