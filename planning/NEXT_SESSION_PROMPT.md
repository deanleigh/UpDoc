# Next Session Prompt

Copy and paste everything below the line into a new Claude Code chat.

---

## Continue UpDoc Development — Mapping Transforms & Refactor Bridge Duplication

### Where we left off

Main branch is up to date (commit `f0cdf3a`). Block property disambiguation is complete and verified — the full end-to-end flow works: source tab mapping → destination picker with blockKey → map.json → Create from Source → correct block properties populated with concatenated content.

### What's next

Two related tracks:

#### Track 1: Mapping Transforms (the main feature work)

Currently extracted text is written to destination fields as raw strings. The user needs transforms to control formatting:

- **Title case** — PDF headings come through as ALL CAPS (e.g., "FEATURES"). Needs `titleCase` transform.
- **Bullet conversion** — PDF bullets extract as `•` characters (e.g., `• 4* central Bruges hotel`). These need converting to markdown list syntax (`- item`) before being processed.
- **Markdown to HTML** — Rich text fields in Umbraco expect HTML (via TipTap RTE). The `convertMarkdownToHtml` transform type already exists in `workflow.types.ts`, and `markdownToHtml` + `buildRteValue` helper functions exist in `transforms.ts`. They just need to be wired up via the mapping rules.

The transform pipeline is: raw extracted text → apply transforms in order → write to destination.

The user described these as "incoming conditions and outgoing conditions" — transforms on the source side (clean up text) and transforms on the destination side (convert to target format). The existing `MappingTransform` type in `workflow.types.ts` already defines the structure:

```typescript
export interface MappingTransform {
    type: TransformType;
    params?: TransformParams;
}
```

**Transform types already defined:** `truncate`, `template`, `regex`, `trim`, `uppercase`, `lowercase`, `stripHtml`. Need to add: `titleCase`, `convertBullets` (or similar).

**Where transforms are applied:** In both `up-doc-action.ts` and `up-doc-collection-action.element.ts` — the `#applyDestinationMapping` method references `dest.transforms` but currently only checks for `convertMarkdownToHtml`. Needs to be expanded to a proper transform pipeline.

**UI for configuring transforms:** Not yet built. Currently transforms in map.json are always `null`. Need a way for workflow authors to add transforms to mappings — possibly in the Map tab or via an edit action on individual mappings.

#### Track 2: Refactor Bridge Code Duplication (tech debt)

**CRITICAL:** There are TWO copies of the document creation / mapping logic:
- `up-doc-action.ts` — entity action (accessed via tree context menu)
- `up-doc-collection-action.element.ts` — collection action (the "Create from Source" button users actually click)

Both contain `#applyDestinationMapping`, `#applyBlockGridValue`, scaffolding, document creation, and save logic. We hit a major bug this session where blockKey handling was added to the entity action but NOT the collection action — which is the code path users actually use.

**Recommendation:** Extract the shared mapping/bridge logic into a service module (e.g., `document-creation.service.ts`) that both files import. This prevents future sync issues.

### Key files

- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-action.ts` — entity action bridge code
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-collection-action.element.ts` — collection action bridge code (PRIMARY path)
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/transforms.ts` — existing `markdownToHtml` and `buildRteValue` helpers
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/workflow.types.ts` — `MappingTransform`, `TransformType`, `TransformParams` types
- `src/UpDoc/wwwroot/App_Plugins/UpDoc/src/up-doc-workflow-map-view.element.ts` — Map tab (potential location for transform config UI)

### First action

Create branch `feature/mapping-transforms` from `main`. Consider doing the bridge refactor first (extracting shared logic into a service) to avoid the duplication problem, then build the transform pipeline on top of the clean foundation.
