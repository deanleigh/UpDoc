# UpDoc — TODO / Issues

Tracked items for future work. Move to GitHub Issues when `gh` CLI is set up.

---

## Backlog

### Dynamic Synchronisation sidebar group detection
**Priority:** Low | **Type:** Enhancement

Currently hardcodes `usync.menu` alias to join uSync's "Synchronisation" sidebar group. Should instead dynamically discover any existing "Synchronisation" group by label, making it package-agnostic.

**Detail:** [planning/DYNAMIC_SIDEBAR_GROUP.md](DYNAMIC_SIDEBAR_GROUP.md)

---

### Install GitHub CLI for issue management
**Priority:** Low | **Type:** Tooling

Install `gh` CLI (`winget install GitHub.cli`) and authenticate (`gh auth login`) to enable creating/managing GitHub Issues directly from Claude Code.

---

### Node name uses page description instead of page title
**Priority:** Medium | **Type:** Bug

When creating a document via "Create from Source", the node name is set from the page description field rather than the page title. Observed during area editor testing with Liverpool PDF.

---

### Bullet list Markdown-to-HTML formatting
**Priority:** Medium | **Type:** Bug

Bullet list conversion from extracted content to Markdown to HTML appears incorrect in created documents. Observed during area editor testing.

---

### Playwright test cleanup
**Priority:** Low | **Type:** Tech Debt

Add `afterEach` cleanup to Playwright E2E tests to delete documents created during test runs. Currently each full-flow run leaves behind a document.

---

### CS8602 nullable warning in PdfPagePropertiesService
**Priority:** Low | **Type:** Tech Debt

`PdfPagePropertiesService.cs:1166` — `section.StrategyParams.Pattern` nullable dereference. Compiler doesn't carry null-check from line 1163 through to 1166. Add `!` or explicit null check.
