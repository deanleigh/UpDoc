> **Note:** This document uses the old "CreateFromPdf" naming. The project has been renamed to **UpDoc**. File paths, namespaces, API routes, and Umbraco aliases have all been updated. See `CLAUDE.md` for current naming conventions.

# Feature Plan: Create Document from Source — Single Entry Point

## Overview

Replace the current "Create Document from PDF" entity action with **"Create Document from Source"** — a single entry point that presents a source type picker before continuing to the source-specific workflow.

This is Phase 0 from the refactoring plan. It establishes the multi-source architecture without changing any extraction logic.

---

## Design Decisions

### Why context menu, not the Create dialog?

Umbraco's native "Create..." action opens a dialog listing allowed child document types (e.g. "Web Page", "Blog Post"). We considered adding source options there but decided against it:

1. **We don't control that dialog.** It's Umbraco core UI that lists document types. Hooking into it couples us to their implementation — if they change it, we break.
2. **Source type is not a document type.** Whether you create from PDF or Word, the resulting document type is the same (e.g. Web Page). Adding "Web Page from PDF", "Web Page from Word" would create duplicate-looking entries that all produce the same document type.
3. **Mixing workflows is confusing.** The Create dialog lists document types (structural). Our options are processes (extraction workflows). Mixing them blurs the distinction, even if end users might not care initially.

The context menu gives us our own space. One entry point, we control it fully, it scales without cluttering Umbraco's native UI.

### Modal approach: Separate picker modal (Option A)

Two options were considered:

- **Option A: Separate picker modal** — a centred dialog for source selection, then the sidebar slide-out for the source workflow. Each modal has one job.
- **Option B: Step within existing modal** — the sidebar gains an initial source selection step before showing the PDF form.

**Chosen: Option A.** The source picker is a small centred modal (matching Umbraco's native "Create an item under..." pattern). Selecting a source type then opens the sidebar slide-out for that source's workflow. This keeps modals focused and follows Umbraco's established UX pattern.

### Cancel behaviour: Close everything (Option B)

When the user cancels the sidebar slide-out (e.g. the PDF modal), everything closes. They do not return to the source picker. This matches Umbraco's native Create flow — cancelling does not return you to the document type picker. The user can re-open from the context menu if they want a different source.

### Disabled source types are purely visual

Web Page and Word Document options appear in the source picker but are greyed out with a "Coming soon" label. They don't need to link to anything — they are HTML elements rendered in our custom Lit template, not Umbraco extension registrations. No Umbraco registration is needed for disabled options.

```
Registered with Umbraco (extension system):
  ├── Entity action: "Create Document from Source"  ← appears in context menu
  ├── Modal: source-picker-modal                    ← our custom centred dialog
  └── Modal: create-from-pdf-modal                  ← existing sidebar slide-out

Inside source-picker-modal (our HTML, not Umbraco registrations):
  ├── PDF Document        → enabled, opens pdf modal sidebar
  ├── Web Page            → disabled, greyed out, "Coming soon"
  └── Word Document       → disabled, greyed out, "Coming soon"
```

---

## User Flow

```
User right-clicks document in content tree
        ↓
Context menu: "Create Document from Source"
        ↓
Small centred modal (matches Umbraco's "Create an item under..." pattern):
┌────────────────────────────────────┐
│  Choose a content source           │
│                                    │
│  📄 PDF Document                   │  ← clickable
│  🌐 Web Page          Coming soon  │  ← greyed out
│  📝 Word Document     Coming soon  │  ← greyed out
│                                    │
│  Cancel                            │
└────────────────────────────────────┘
        ↓ (user clicks PDF Document)
Sidebar slide-out opens from right (existing UI):
┌──────────────────────────────┐
│  Create from PDF             │
│                              │
│  Document Name               │
│  [Enter document name     ]  │
│                              │
│  Select PDF                  │
│  [+ Choose               ]  │
│                              │
│  ...                         │
│                              │
│  [Close]          [Create]   │
└──────────────────────────────┘
        ↓ (user completes form and clicks Create)
Document created, user redirected to editor
```

---

## What Changes

| Current | After |
|---------|-------|
| Context menu shows "Create Document from PDF" | Context menu shows "Create Document from Source" |
| Clicking opens the PDF sidebar immediately | Clicking opens centred source picker first |
| Only PDF is supported | PDF works, Web/Word shown as disabled placeholders |
| One entity action, one modal | One entity action, source picker modal → then source-specific sidebar |

## What Does NOT Change

- PDF extraction logic (backend stays the same)
- PDF sidebar modal UI (media picker, preview, create button)
- Document creation pipeline (scaffold, create, save)
- API endpoints
- Config files (not introduced yet — that's Phase 1)

---

## Implementation Steps

### Step 1: Update manifest.ts

Change the entity action registration:

**Before:**
```typescript
alias: 'CreateFromPdf.EntityAction',
name: 'Create Document from PDF',
```

**After:**
```typescript
alias: 'CreateFromSource.EntityAction',
name: 'Create Document from Source',
```

Add registration for the new source picker modal alongside the existing PDF modal.

### Step 2: Create source-picker-modal.token.ts (NEW)

Modal data/value types:

```typescript
interface SourcePickerModalData {
  parentUnique: string;  // passed through to the next modal
}

interface SourcePickerModalValue {
  sourceType: string;  // 'pdf', 'web', 'word'
}
```

### Step 3: Create source-picker-modal.element.ts (NEW)

A small centred modal matching Umbraco's "Create an item under..." pattern. Contains:

```typescript
// Source types — later these come from config, for now hardcoded
const sourceTypes = [
  { type: 'pdf', label: 'PDF Document', icon: 'icon-document', enabled: true },
  { type: 'web', label: 'Web Page', icon: 'icon-globe', enabled: false },
  { type: 'word', label: 'Word Document', icon: 'icon-edit', enabled: false },
];
```

- Enabled sources are clickable — submits the modal with the selected source type
- Disabled sources are greyed out with "Coming soon" text
- Cancel button closes the modal
- Styled to match the native Umbraco centred dialog pattern (see "Create an item under About" screenshot)

### Step 4: Update create-from-pdf-action.ts

Modify `execute()` to:

1. Open source picker modal first (centred dialog)
2. Read selected source type from modal return value
3. Based on source type, open the appropriate sidebar workflow modal:
   - `'pdf'` → open existing PDF modal (sidebar slide-out)
   - `'web'` / `'word'` → show "not yet available" notification (should not happen since they're disabled, but as a safety net)
4. If source picker is cancelled, exit cleanly

### Step 5: Build and test

```bash
cd App_Plugins/CreateFromPdf && npm run build
```

Verify the full flow works end-to-end with the new intermediate step.

---

## New Files

| File | Purpose |
|------|---------|
| `App_Plugins/CreateFromPdf/src/source-picker-modal.element.ts` | Source type picker UI (centred dialog) |
| `App_Plugins/CreateFromPdf/src/source-picker-modal.token.ts` | Modal data/value types |

## Modified Files

| File | Change |
|------|--------|
| `App_Plugins/CreateFromPdf/src/manifest.ts` | Rename action, register source picker modal |
| `App_Plugins/CreateFromPdf/src/create-from-pdf-action.ts` | Open source picker first, then PDF sidebar |

## No Changes

| File | Why |
|------|-----|
| `create-from-pdf-modal.element.ts` | PDF sidebar modal stays exactly as-is |
| `create-from-pdf-modal.token.ts` | PDF modal contract unchanged |
| `PdfPagePropertiesService.cs` | Backend extraction unchanged |
| `PdfExtractionController.cs` | API endpoints unchanged |

---

## Testing Checklist

- [ ] Context menu shows "Create Document from Source" (not "Create Document from PDF")
- [ ] Clicking opens the source type picker as a centred dialog
- [ ] Source picker visually matches Umbraco's "Create an item under..." pattern
- [ ] PDF option is enabled and clickable
- [ ] Web and Word options are visible but greyed out with "Coming soon"
- [ ] Clicking PDF opens the existing sidebar slide-out
- [ ] Full PDF workflow still works end-to-end (select PDF → extract → create document)
- [ ] Clicking Cancel on source picker closes without error
- [ ] Clicking Close on PDF sidebar closes everything (does not return to source picker)
- [ ] Clicking a disabled source type does nothing (no error, no navigation)

---

## Documentation Updates Required

Per CLAUDE.md, when modifying source files update the corresponding docs:

| Source File | Documentation File | Action |
|-------------|-------------------|--------|
| `manifest.ts` | `docs/source-files/manifest.md` | Update (renamed action, new modal) |
| `create-from-pdf-action.ts` | `docs/source-files/create-from-pdf-action.md` | Update (new source picker step) |
| `source-picker-modal.element.ts` | `docs/source-files/source-picker-modal-element.md` | Create new |
| `source-picker-modal.token.ts` | `docs/source-files/source-picker-modal-token.md` | Create new |

Also add new entries to `docs/SUMMARY.md`.

---

## Feature Branch

```bash
git checkout main
git pull
git checkout -b feature/create-from-source-entry-point
```

Branch already created: `feature/create-from-source-entry-point`
