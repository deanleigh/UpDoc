# Figma

Figma is used in UpDoc development for UI design iteration — capturing the current Umbraco backoffice state, making visual changes in Figma, and having Claude implement those changes in code.

This workflow is necessary because Umbraco's backoffice uses **Shadow DOM extensively**, which makes traditional screenshot-based design tools unreliable. A specialised capture plugin (html.to.design) is required.

## Tools

| Tool | Purpose |
|------|---------|
| [Figma MCP Plugin](figma-mcp.md) | Official Claude Code integration — reads designs, generates code, manages component mappings |
| [html.to.design](html-to-design.md) | Figma plugin that captures web pages including Shadow DOM content |
| [Design Workflow](workflow.md) | The end-to-end capture → edit → implement workflow and token management strategies |

## Figma File

The UpDoc design work uses a single Figma file:

- **File:** "Back-office-work"
- **File key:** `ZE8800trGvmQldnKeDq1Hy`
- **Key node:** `12:2` (main captured frame "1920w default")

## References

- [Figma MCP Plugin listing](https://claude.com/plugins/figma) — official Claude Code plugin page
- [Introducing Claude Code to Figma](https://www.figma.com/blog/introducing-claude-code-to-figma/) — Figma blog announcement
- [html.to.design on Figma Community](https://www.figma.com/community/plugin/1159123024924461424) — the Shadow DOM capture plugin
