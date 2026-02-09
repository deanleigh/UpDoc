# UpDoc User Journeys

---

## User Stories

### Content Editor

> As a content editor, I want to create a new content node under a section of my website by importing content from an external source (such as a PDF, web page, or markdown file) into an existing blueprint, so that the source content is automatically placed into the correct fields and blocks of the new document — without me having to manually copy, paste, or reformat anything.

### Admin / Developer

> As an admin or developer, I want to configure which document types support "Create from Source", define how content is extracted from each source type, and map extracted content to document properties, so that content editors have a seamless experience without needing technical knowledge.

---

## Roles and Responsibilities

| Role | What they do with UpDoc | What they never see |
|------|------------------------|-------------------|
| **Editor** | Uses "Create from Source" to create content. Picks blueprint, provides source, reviews, creates. | Workflow configuration, extraction rules, field mappings, the UpDoc Settings dashboard |
| **Administrator** | Configures UpDoc. Creates workflows, sets up extraction rules, maps source sections to destination fields. Decides which document types/blueprints support "Create from Source". | N/A — sees everything |

**Key principle:** The editor's experience is a *consequence* of the admin's configuration. If the admin hasn't set up a workflow for a section, the editor doesn't see "Create from Source" there — because the admin has decided that section doesn't use UpDoc.

**Umbraco user groups (default):**

| Umbraco Group | Sections | UpDoc Role | Why |
|---------------|----------|------------|-----|
| **Administrators** | Content, Media, Settings, Packages, Users, Members, Translation | Administrator | Has Settings — can access UpDoc dashboard |
| **Editors** | Content, Media | Editor | No Settings — can use "Create from Source" but can't configure workflows |
| **Writers** | Content | Editor | No Settings — can use "Create from Source" but can't configure workflows |
| **Translators** | Translation | N/A | No Content section — never sees content nodes |

**No custom permission system needed.** Umbraco's section-based access control already provides the separation. The UpDoc dashboard is in Settings (admin-only). The entity action is on content nodes (available to anyone with Content access). The architecture we need is already built into Umbraco.

---

## Journey 1: Content Editor — "Create from Source"

### Step 1: Choose Where

The user navigates to a section of their website in the content tree (e.g., "Group Tours") or to an existing child node. They want to create a new child content node here.

### Step 2: Choose How

The user right-clicks (or opens the actions menu) and sees **"Create Document from Source"**. They click it.

**Decision: The action is only visible when a complete workflow exists** for at least one allowed child document type at this location. If no workflow is configured, the action does not appear. This is not a limitation — it's by design. The administrator decides which sections support "Create from Source" by creating (or not creating) workflows. No workflow = no menu item = the admin has decided this section is manual-only.

### Step 3: Choose the Destination (Blueprint)

The user sees the **blueprint picker dialog** — listing only blueprints that have a complete workflow configured. The user selects one.

### Step 4: Choose the Source

The sidebar opens. The user selects a **source type** (PDF, web page, markdown, etc.) from a dropdown — populated only with source types that are configured for this workflow. They then provide the source (pick a PDF from media, enter a URL, etc.).

### Step 5: Extraction + Mapping

UpDoc extracts structured content from the source and maps it into the blueprint's fields and blocks. The user sees a preview of what was extracted.

### Step 6: Review + Create

The user reviews the extracted content, optionally edits it, and clicks **Create**. A new content node is created under the chosen section, with all the source content in the correct places.

**End result:** A fully populated content node, created in seconds from an external source, with content in all the right fields — as if the user had spent time manually entering it.

---

## The Prerequisite Chain

For the content editor to use "Create from Source", the admin must have completed all setup first:

```
Admin setup (must happen first):
  1. Create Document Type (Umbraco core — already exists)
  2. Create Blueprint for that Document Type (Umbraco feature)
  3. Create Workflow in UpDoc dashboard (links to blueprint)
  4. Configure source type(s) for the workflow
  5. Configure field mappings (source sections → destination fields)

Content editor usage (depends on all of the above):
  1. Navigate to content section
  2. "Create Document from Source" (only visible if workflow exists)
  3. Pick blueprint (only those with complete workflows shown)
  4. Pick source type + provide source
  5. Extract → Map → Review → Create
```

**Each step in the admin setup unlocks the next step in the content editor experience.** If any admin step is incomplete, the feature simply doesn't appear for the editor — no error messages, no confusion.

### Failure States (Admin Side)

These are handled in the UpDoc dashboard (Settings > UpDoc), not in the content editor's experience:

| What's missing | Where it surfaces | What happens |
|----------------|-------------------|--------------|
| **No blueprint exists** | Admin tries to create a workflow in UpDoc dashboard | "No blueprints found for this document type. Create a Document Blueprint first." |
| **Workflow incomplete** (no source files) | UpDoc dashboard, Workflows tab | Shown as "Incomplete" status — not visible to content editors |
| **Workflow incomplete** (no mappings) | UpDoc dashboard, Workflows tab | Shown as "Incomplete" status — not visible to content editors |

---

## Entity Action Visibility — "When Does It Appear?"

### The Problem

Currently, the "Create Document from Source" entity action appears on **every non-trashed content node**. The only condition is `Umb.Condition.EntityIsNotTrashed`. This means:

- A content editor sees "Create Document from Source" on sections where no workflows exist
- Clicking it opens the blueprint picker, which shows all blueprints — even those with no workflow
- If the user selects a blueprint with no workflow, the sidebar opens and fails when trying to load config (404)

This is the gap between the admin's intent and the editor's experience.

### The Criteria

"Create Document from Source" should appear on a content node **only when all of the following are true**:

1. **The node is not trashed** (already implemented via `Umb.Condition.EntityIsNotTrashed`)
2. **The node allows child document types** (it's a parent node, not a leaf-only node)
3. **At least one allowed child document type has a blueprint**
4. **At least one of those blueprints has a complete workflow** (destination + map + at least one source file)

If any of these fail, the action is hidden. No message, no greyed-out option — just not there.

### The Check, Step by Step

```
User right-clicks a content node (e.g., "Group Tours")
        ↓
Umbraco tells us: this node's document type allows these child types:
  → "Group Tour" (alias: groupTour)
  → "Blog Post" (alias: blogPost)
        ↓
For each allowed child type, do any blueprints exist?
  → groupTour: 3 blueprints (Group Tour Default, Group Tour Luxury, Group Tour Budget)
  → blogPost: 0 blueprints
        ↓
For each blueprint, does a COMPLETE workflow exist?
  → Group Tour Default: YES (has destination-blueprint.json + map.json + source-pdf.json)
  → Group Tour Luxury: NO (workflow folder exists but missing map.json)
  → Group Tour Budget: NO (no workflow folder at all)
        ↓
Result: At least one complete workflow found → SHOW the action
```

If none of the blueprints had a complete workflow, the action would be HIDDEN.

### Implementation

See `feature/entity-action-visibility` branch for the implementation. The approach uses:

1. A lightweight API endpoint (`GET /updoc/workflows/active`) that returns all document type aliases and blueprint IDs with complete workflows
2. A custom Umbraco condition (`UpDoc.Condition.HasAvailableWorkflows`) that resolves allowed child types client-side and checks the intersection
3. Blueprint picker filtering using the same cached data

---

## Open Questions (Resolved)

| Question | Resolution |
|----------|-----------|
| How do Umbraco's default user groups map to our roles? | Administrators = admin, Editors/Writers = editor. No custom mapping needed. |
| Should the UpDoc Settings dashboard be restricted to Administrators? | Yes, but it's automatic — only Administrators have access to the Settings section where the dashboard lives. |
| Should we use Umbraco's granular permission system? | No — section-level access control is sufficient. |
