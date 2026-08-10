---
title: "CreateFromSourceController.cs"
---


The endpoint that creates a document from a source file.

```
POST /umbraco/management/api/v1/updoc/create-from-source
```

## Why it is separate

This is "Create from Source" as an API call rather than a click. The backoffice remains how an editor does it; this is how anything else does it — [the MCP server](../mcp/), a scheduled job, a deployment step, another site's code.

It sits in its own controller rather than joining `WorkflowController` because the rest of that controller is workflow authoring. This is the one endpoint an outside consumer is likely to call.

## What it does

Validates the request, resolves the current backoffice user, and hands off to [`DocumentCreationService`](./document-creation-service.md).

Returns `201 Created` with the new document's id, or `400` with a `ProblemDetails` explaining what was wrong.

## Notes

**`documentName` is required.** Naming on creation avoids a rename afterwards, which on some sites is a separate and unwelcome operation.

**The user matters.** `IContentEditingService.CreateAsync` takes a user key, so the document is created as the authenticated API user rather than anonymously. That shows in the audit log.

## Related

- [The UpDoc API](../api/) — request and response in full
- [DocumentCreationService.cs](./document-creation-service.md) — the work
- [UpDocControllerBase.cs](./up-doc-controller-base.md) — error responses
