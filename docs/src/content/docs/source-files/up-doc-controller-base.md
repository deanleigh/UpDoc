---
title: "UpDocControllerBase.cs"
---


Shared error responses for UpDoc's controllers.

```csharp
protected IActionResult NotFoundProblem(string title, string? detail = null);
protected IActionResult BadRequestProblem(string title, string? detail = null);
protected IActionResult ConflictProblem(string title, string? detail = null);
protected IActionResult ServerErrorProblem(string title, string? detail = null);
```

## Why

UpDoc used to return errors as an anonymous `{ error = "..." }`. Umbraco's Management API returns [`ProblemDetails`](https://datatracker.ietf.org/doc/html/rfc7807) and declares it on every action, which is what a consumer reading the spec expects and what generated clients understand.

All 89 error returns now go through these helpers, built with Umbraco's own `ProblemDetailsBuilder` from `Umbraco.Cms.Api.Common`. Producing the shape in one place is the point — written inline 89 times, it drifts.

## No stack traces

`ServerErrorProblem` deliberately carries no exception detail. The caller gets a title; the exception goes to the log.

A stack trace in a documented response is a contract nobody meant to publish, and it hands internals to anyone who can reach the endpoint.

## Not every Error field

This is only about HTTP error responses. Some success payloads carry their own `Error` field — `RichExtractionResult.Error` reports that extraction failed while the request itself succeeded. Those are unaffected.

## Related

- [The UpDoc API](../api/) — how errors appear to a consumer
