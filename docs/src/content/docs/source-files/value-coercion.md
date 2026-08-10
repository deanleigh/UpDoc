---
title: "ValueCoercion.cs"
---


Coerces captured text into the shapes Umbraco's property editors expect.

Extraction produces strings — `"£1,199"`, `"26th September 2026"` — and a number or date property will not accept them.

## What it does

```csharp
int?      ToInteger(string? value);
DateOnly? ToDateOnly(string? value);
object    BuildDateValue(DateOnly date);
```

| Input | Output |
|-------|--------|
| `"5 days"` | `5` |
| `"£1,199"` | `1199` |
| `"26th September 2026"` | `2026-09-26` |
| `"Sept 26 2026"` | `2026-09-26` |
| `"2026-09-26"` | `2026-09-26` |

Each returns null rather than guessing, so a field that cannot be parsed keeps its blueprint default instead of storing something wrong.

## It refuses all-numeric dates

`"06/07/2027"` returns null. Deliberately.

That is 6 July to a British reader and 7 June to an American one, and nothing in a source document says which. Guessing would write a wrong date that looks entirely valid, with no error to notice and nothing to distinguish it from a right one.

Refusing leaves the field empty, which is visible. A per-workflow date-format setting could enable these formats explicitly in future, which is a better position than correcting data already stored.

## Dates are not stored as strings

`BuildDateValue` returns:

```json
{ "date": "2026-09-26", "timeZone": null }
```

Not a bare ISO string. All four of Umbraco v17's date editors derive from `DateTimePropertyEditorBase`, which declares `ValueType = ValueTypes.Json` — so a plain string is deserialised as JSON and rejected.

ISO output matters too: Umbraco parses it with `DateTimeOffset.TryParse`, which is culture-dependent. ISO is unambiguous in every culture.

## Impossible dates are rejected

`"31 February 2026"` returns null rather than rolling forward into March. A lenient parse would accept it and store the wrong date.

## A port

Ported from `transforms.ts`. The backoffice coerces in the browser, this coerces on the server, and both write to the same properties — so the two must agree.

## Related

- [MappingApplicationService.cs](./mapping-application-service.md) — calls this during type conversion
- [transforms.ts](./transforms.md) — the browser's copy
