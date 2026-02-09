# WorkflowController.cs

ASP.NET Core API controller for UpDoc workflow CRUD operations.

## Route

`/umbraco/management/api/v1/updoc/workflows`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Returns all workflow summaries |
| GET | `/active` | Returns document type aliases and blueprint IDs with complete workflows |
| GET | `/{name}` | Returns full configuration for a specific workflow |
| POST | `/` | Creates a new workflow folder with stub files |
| DELETE | `/{name}` | Deletes a workflow folder |

## Dependencies

- `IWorkflowService` — handles workflow file operations, config loading, and validation

## DocumentTypeController.cs

A companion controller at `/umbraco/management/api/v1/updoc/document-types` provides endpoints for the Create Workflow modal pickers:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Returns all non-element document types (alias, name, icon, id) |
| GET | `/{alias}/blueprints` | Returns blueprints for a given document type |

### Dependencies

- `IContentTypeService` — Umbraco core service for document type lookups
- `IContentService` — Umbraco core service for blueprint lookups

## Authentication

All endpoints require `BackOfficeAccess` authorization policy. Frontend calls must include a bearer token from `UMB_AUTH_CONTEXT`.

## Used by

- `up-doc-workflows-view.element.ts` — CRUD operations on workflows
- `create-workflow-modal.element.ts` — document type and blueprint picker data
- `workflow.service.ts` — fetches active workflows and full configs
