# Figma MCP Plugin

The [Figma MCP Plugin](https://claude.com/plugins/figma) is the official integration between Claude Code and Figma. It provides Claude with direct access to read and write Figma designs via MCP (Model Context Protocol) tools.

## Installation

The plugin is installed via Claude Code's plugin system. Once connected, Claude has access to Figma MCP tools automatically.

## Key Tools

### Reading Designs

| Tool | What it returns | Token cost |
|------|----------------|------------|
| `get_screenshot` | Visual image of a node | Low — uses vision tokens |
| `get_metadata` | XML tree of all nodes (IDs, types, names, positions, sizes) | **High** — can be enormous for complex frames |
| `get_design_context` | Generated code + screenshot + contextual hints | **High** — includes code and metadata |
| `get_variable_defs` | Design token values (colours, spacing, etc.) | Low |

### Component Mapping

| Tool | Purpose |
|------|---------|
| `get_code_connect_map` | Get existing mappings between Figma components and codebase |
| `add_code_connect_map` | Create a new mapping |
| `get_code_connect_suggestions` | Get suggested mappings for a node |

### Writing to Figma

| Tool | Purpose |
|------|---------|
| `generate_figma_design` | Push a web page or design into Figma |
| `generate_diagram` | Create flowcharts, sequence diagrams, etc. in FigJam |

## Token Management

All Figma MCP tool responses flow into **Claude's context window** — there are no separate "Figma tokens". This means large payloads directly reduce your available conversation context.

### Strategies

1. **Use `get_screenshot` first** — it gives Claude enough visual context to understand layout changes without the XML overhead
2. **Target specific nodes** — instead of reading an entire frame, select just the component or section you've edited and use that node's ID
3. **Avoid `get_metadata` on large frames** — a full Umbraco backoffice capture can have hundreds of nested elements. Only request metadata for focused areas
4. **`get_design_context` is for implementation** — use it when you're ready to write code, not for exploration

### What Happened on Our Second Attempt

The first design iteration worked perfectly — a simple flat list of section boxes with badges. The second attempt captured a much more complex view (config toolbar, hierarchical tree, multiple button types, nested sections) and the metadata payload consumed too much of the context window.

**Lesson:** Always scope your Figma reads to the specific area you're working on, not the entire captured frame.

## Limitations

- **`generate_figma_design` does NOT work for Umbraco** — the built-in web capture cannot see Shadow DOM content, resulting in blank pages. Use [html.to.design](html-to-design.md) instead.
- **Code output is React + Tailwind by default** — the generated code is a reference, not final code. Always adapt to the target project's stack (Lit + UUI in UpDoc's case).

## References

- [Figma MCP Plugin](https://claude.com/plugins/figma) — official plugin listing
- [Introducing Claude Code to Figma](https://www.figma.com/blog/introducing-claude-code-to-figma/) — Figma blog announcement
- [Setting up navigation - Material for MkDocs](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/) — MCP tool documentation
