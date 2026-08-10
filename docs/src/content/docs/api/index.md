---
title: "The UpDoc API"
---

UpDoc exposes its own Management API alongside Umbraco's, at:

```
/umbraco/management/api/v1/updoc/
```

Every endpoint requires backoffice authentication, the same as Umbraco's own Management API.

## The Swagger document

UpDoc registers its own Swagger document, separate from Umbraco's:

```
/umbraco/swagger/updoc/swagger.json
```

Open `/umbraco/swagger` in a browser and choose **UpDoc API** from the dropdown.

Every endpoint describes what it returns, so the document is enough to generate a working client. That was not always true — the endpoints existed long before the document described their payloads, and a generated client came back with every operation returning `void`.

## Errors

Errors are returned as [`ProblemDetails`](https://datatracker.ietf.org/doc/html/rfc7807), matching the rest of Umbraco's Management API:

```json
{
  "type": "Error",
  "title": "Workflow 'group-tour-pdf' not found.",
  "status": 404,
  "detail": "It selects both the scaffold and the workflow."
}
```

The message is in `title`, with more in `detail` when there is more to say.

## Creating a document from a source

The endpoint that turns a source file into a document:

```
POST /umbraco/management/api/v1/updoc/create-from-source
```

```json
{
  "parentId": "dd9b7287-a3ff-418e-893d-b84df7de7500",
  "documentTypeId": "993a81c0-d793-41bb-9305-8137e7445b56",
  "blueprintId": "2e79e2f0-211e-4096-aa18-857d23f4afc0",
  "sourceType": "pdf",
  "mediaId": "d155485a-76a9-4d33-935c-146469ed9087",
  "documentName": "My Page"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `parentId` | No | Document to create under. Omit to create at the content root. |
| `documentTypeId` | Yes | The document type to create. |
| `blueprintId` | Yes | The blueprint to scaffold from. **This also selects the workflow.** |
| `sourceType` | No | Defaults to the workflow's own source type. |
| `mediaId` | Yes for PDF | The source file, which must already be in the media library. |
| `documentName` | Yes | Name for the new document. |

Returning `201 Created`:

```json
{
  "success": true,
  "documentId": "3e6b79de-6eac-42fe-987a-083aeba3947c",
  "workflowAlias": "tailoredTourPdf",
  "mappedValueCount": 19,
  "error": null,
  "published": false
}
```

### The blueprint selects the workflow

A workflow folder exists per blueprint, per source type. So passing the blueprint id is what tells UpDoc how to read the source and where its content belongs. There is no workflow parameter, and there does not need to be.

### The document is created as a draft

`published` is always `false`. Review the content, then publish separately. An import that publishes itself gives you no chance to check it first.

### mappedValueCount is worth reading

It counts the values the workflow's mappings actually wrote. Compare it against the workflow's `mappingCount` from the workflows endpoint: 19 of 19 means every mapping resolved, and anything lower means a section did not match and a field is sitting empty.

That comparison is the cheapest signal that an import needs looking at, and it costs nothing to check.

### The source file must already exist

This creates documents. It does not upload files. Put the PDF in the media library first — through the backoffice, the Management API, or Umbraco's own MCP server.

### Source types

PDF only, currently. Markdown and web sources return a message pointing at the backoffice, where they work normally.

## Listing workflows

```
GET /umbraco/management/api/v1/updoc/workflows
```

Returns every configured workflow with its document type, blueprint, source types, mapping count, and any validation warnings. This is where the blueprint id for `create-from-source` comes from.

```
GET /umbraco/management/api/v1/updoc/workflows/active
```

Returns just the document type aliases and blueprint ids that have complete workflows. The backoffice uses this to decide whether to show "Create from Source" on a given node.

## Everything else

The rest of the API is workflow authoring — reading and writing source, destination and map configs, running extraction and transforms, managing area templates and rules. Those endpoints exist to serve the backoffice's workflow editor rather than to be called directly, and the Swagger document is the reference for them.

## Calling it from an AI assistant

UpDoc ships an [MCP server](../mcp/) that wraps these endpoints as tools. If that is why you are here, start there rather than calling the API by hand.
