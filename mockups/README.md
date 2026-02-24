# HTML Mockups to Figma — Bidirectional Design Workflow

## What This Is

A workflow for designing UI components using Claude Code, static HTML mockups, and Figma — with changes flowing in both directions. No Umbraco site required.

## Tools Used

- **Claude Code** (Opus) — reads real component code, generates HTML mockups, reads Figma changes back
- **Figma** — design editing, visual review
- **Figma MCP Plugin** — bridges Claude Code and Figma (capture HTML to Figma, read Figma designs back)
- **Playwright MCP** — browser preview
- **http-server** — serves mockups locally (`npx http-server mockups/ -p 3334`)

## Workflow Proved (24 Feb 2026)

### Step 1: Code to HTML Mockup
- **Claude** read the real Lit/UUI component code (`up-doc-workflow-source-view.element.ts`)
- **Claude** created a self-contained HTML file (`mockups/source-info-box.html`) with inline CSS approximating UUI design tokens
- **Claude** started a local server and previewed the mockup via Playwright

### Step 2: HTML to Figma
- **Claude** requested a Figma capture ID via the MCP plugin, targeting the existing "Back-office-work" Figma file
- **Claude** opened the mockup in the browser with the Figma capture hash URL
- **User** clicked "Send to Figma" in the capture toolbar
- The component appeared in Figma as editable layers

### Step 3: Edit in Figma (Figma to Code)
- **User** changed the button color from dark blue to pink (`#ffcfd0`) directly in Figma
- **Claude** read the change back via `get_design_context` on the button node — detected `bg-[#ffcfd0]` without needing a screenshot

### Step 4: Update HTML from Figma
- **Claude** updated the HTML mockup CSS to match the pink button
- **Claude** previewed the updated mockup — pink button confirmed

### Step 5: Re-capture to Figma (Round-Trip Complete)
- **Claude** requested a new capture ID and opened the updated mockup
- **User** clicked "Send to Figma"
- Figma now shows both versions side by side: original (dark blue) and updated (pink)

## The Loop

```
Code ──→ HTML Mockup ──→ Figma
                ↑            │
                └────────────┘
          (read changes back)
```

Both directions work. Changes in Figma are readable by Claude. Changes in HTML re-capture to Figma. The full cycle completes in under a minute.
