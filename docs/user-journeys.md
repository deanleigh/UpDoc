# User Journeys

Step-by-step paths through the UpDoc interface for creating documents from external sources.

---

## Journey 1: Create from Source via the Content Tree

The primary entry point — available from the "..." actions menu on any content node that has child types with configured workflows.

1. Navigate to the **Content** section in Umbraco backoffice
2. In the content tree (left panel), find the parent node where you want to create a child document (e.g., "Group Tours")
3. Click the **"..."** actions button on that node
4. Click **"Create Document from Source"**
5. The **blueprint picker dialog** appears:
    - If multiple document types are allowed, select the document type first
    - Then select a blueprint (only blueprints with configured workflows are shown)
6. The **source sidebar** slides open from the right:
    - Choose a **source type** from the dropdown (e.g., PDF, Markdown)
    - Select a source file using the media picker
    - The extracted content appears in the preview area
    - Edit the **document name** if needed
    - Review the extracted sections
7. Click **"Create"**
8. The document is created and you are navigated to the new document editor

**When is this available?** The "Create Document from Source" action only appears on nodes where at least one allowed child document type has a blueprint with a complete workflow (destination + map + at least one source type configured).

---

## Journey 2: Create from Source via the Collection View

A secondary entry point — available as a toolbar button when viewing a document collection (list view).

1. Navigate to a content node that uses a **list view** (e.g., click "Group Tours" to see the collection of tours)
2. In the collection toolbar, next to the existing "Create Group Tour" button, click **"Create from Source"**
3. The **blueprint picker dialog** appears (same as Journey 1, step 5)
4. The **source sidebar** slides open (same as Journey 1, step 6)
5. Click **"Create"**
6. The document is created and you are navigated to the new document editor

**When is this available?** The "Create from Source" button only appears on document collections where at least one allowed child document type has a blueprint with a complete workflow. If no workflows are configured, the button is hidden.

---

## Entry Point Comparison

| Feature | Content Tree (Journey 1) | Collection View (Journey 2) |
|---------|--------------------------|----------------------------|
| Location | "..." actions menu on tree nodes | Toolbar button in collection view |
| Visibility | Controlled by `HasAvailableWorkflows` condition | Self-hiding element checks workflows internally |
| Context | `UMB_ENTITY_CONTEXT` provides parent node | `UMB_DOCUMENT_WORKSPACE_CONTEXT` provides parent node |
| Flow after click | Identical | Identical |
| Result | New document created under parent | New document created under parent |

Both journeys lead to the same blueprint picker → source sidebar → document creation flow. The only difference is where the user starts.
