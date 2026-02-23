# Playwright

Playwright is used for end-to-end testing of UpDoc's Umbraco backoffice extensions. It automates browser interactions that would otherwise require manual clicking through the Create from Source workflow.

## Setup

Playwright tests live in the UpDoc project alongside the extension code. The test configuration targets the local UpDoc.TestSite.

### Environment

| Variable | Purpose |
|----------|---------|
| `URL` | The Umbraco site URL (e.g., `https://localhost:44391`) |

**Note:** The environment variable is `URL`, not `UMBRACO_URL`.

### Test PDFs

Test PDFs are stored in the Umbraco media library:

| PDF | Purpose |
|-----|---------|
| `updoc-test-01` | Primary test document |
| `updoc-test-02` | Secondary test document |
| `updoc-test-03` | Third test document |

## Shadow DOM Considerations

Umbraco's backoffice uses Shadow DOM extensively. This affects how Playwright selects elements:

- **Use page-level queries** — `page.locator()` rather than scoped queries that can't cross shadow boundaries
- **Avoid strict shadow DOM selectors** — Playwright's `>>` shadow piercing syntax can be fragile with Umbraco's nested shadow roots
- **Test UUI components** — `uui-button`, `uui-input`, etc. are custom elements inside shadow roots

## Test Coverage

Four tests cover the Create from Source workflow:

1. **Visibility** — the "Create from Source" button appears in the collection toolbar
2. **Blueprint picker** — clicking the button opens the blueprint picker modal
3. **Full flow** — complete flow from button click through blueprint selection, PDF upload, extraction, and document creation
4. **Preview** — extraction preview renders correctly before document creation

## Known Issues

- **Cleanup:** tests currently do not delete created test documents. A cleanup step is needed to prevent test data accumulation.
- **Site must be running:** Playwright tests require the UpDoc.TestSite to be running before execution.

## Running Tests

```bash
npx playwright test
```

## Umbraco Testing Skills

Before writing new Playwright tests, invoke the relevant Claude Code skills:

- `umbraco-e2e-testing` — E2E patterns for Umbraco backoffice
- `umbraco-playwright-testhelpers` — `@umbraco/playwright-testhelpers` fixtures and helpers
- `umbraco-testing` — router skill for choosing the right testing approach

## References

- [Playwright documentation](https://playwright.dev/)
- [`@umbraco/playwright-testhelpers`](https://www.npmjs.com/package/@umbraco/playwright-testhelpers) — Umbraco's official test helpers
- [planning/PLAYWRIGHT_TESTING.md](https://github.com/deanleigh/UpDoc/blob/main/planning/PLAYWRIGHT_TESTING.md) — original test planning document
