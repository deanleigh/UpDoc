# Feature Plan: Create Document from Source — Single Entry Point

## Overview

Replace the current "Create Document from PDF" entity action with **"Create Document from Source"** — a single entry point that presents a source type picker before continuing to the source-specific workflow.

This is Phase 0 from the refactoring plan. It establishes the multi-source architecture without changing any extraction logic.

---

## What Changes

| Current | After |
|---------|-------|
| Context menu shows "Create Document from PDF" | Context menu shows "Create Document from Source" |
| Clicking opens the PDF modal immediately | Clicking opens a source type picker first |
| Only PDF is supported | PDF works, Web/Word shown as disabled placeholders |
| One entity action, one modal | One entity action, source picker step → then existing modal |

## What Does NOT Change

- PDF extraction logic (backend stays the same)
- PDF modal UI (media picker, preview, create button)
- Document creation pipeline (scaffold, create, save)
- API endpoints
- Config files (not introduced yet — that's Phase 1)

---

## User Flow

```
User right-clicks document in tree
        ↓
Context menu: "Create Document from Source"
        ↓
Source Type Picker (new step)
┌────────────────────────────────────┐
│  Choose a content source:          │
│                                    │
│  [📄 PDF Document    ]  ← enabled  │
│  [🌐 Web Page        ]  ← disabled │
│  [📝 Word Document   ]  ← disabled │
│                                    │
│  [Cancel]                          │
└────────────────────────────────────┘
        ↓ (user clicks PDF)
Existing PDF modal opens
        ↓
(rest of workflow unchanged)
```

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

Update the icon if needed (current: `icon-document`).

### Step 2: Create source type picker

This could be implemented as either:

**Option A: A new modal** — a separate `source-picker-modal.element.ts` that returns the selected source type, then the action opens the appropriate workflow modal.

**Option B: A step within the existing modal** — the existing modal gains an initial step where the user picks the source type, then the modal transitions to the source-specific UI.

**Recommendation: Option A** — keeps each modal focused on one job. The action orchestrates the flow:

```
action.execute()
  → open source picker modal → returns sourceType
  → if sourceType === 'pdf' → open PDF modal (existing)
  → if sourceType === 'web' → open Web modal (future)
  → if sourceType === 'word' → open Word modal (future)
```

### Step 3: Create source-picker-modal.element.ts (NEW)

A simple modal with buttons/cards for each source type:

```typescript
// Source types — later these come from config, for now hardcoded
const sourceTypes = [
  { type: 'pdf', label: 'PDF Document', icon: 'icon-document', enabled: true },
  { type: 'web', label: 'Web Page', icon: 'icon-globe', enabled: false },
  { type: 'word', label: 'Word Document', icon: 'icon-edit', enabled: false },
];
```

- Enabled sources are clickable and submit the modal with the selected type
- Disabled sources are visually greyed out with a "Coming soon" label
- Cancel button closes the modal

### Step 4: Create source-picker-modal.token.ts (NEW)

Modal data/value types:

```typescript
interface SourcePickerModalData {
  parentUnique: string;  // passed through to the next modal
}

interface SourcePickerModalValue {
  sourceType: string;  // 'pdf', 'web', 'word'
}
```

### Step 5: Update create-from-pdf-action.ts

Modify `execute()` to:

1. Open source picker modal first
2. Read selected source type
3. Based on type, open the appropriate workflow modal
4. For now, only 'pdf' has a workflow — others would show a "not yet available" notification

### Step 6: Register new modal in manifest.ts

Add the source picker modal registration alongside the existing PDF modal.

---

## New Files

| File | Purpose |
|------|---------|
| `App_Plugins/CreateFromPdf/src/source-picker-modal.element.ts` | Source type picker UI |
| `App_Plugins/CreateFromPdf/src/source-picker-modal.token.ts` | Modal data/value types |

## Modified Files

| File | Change |
|------|--------|
| `App_Plugins/CreateFromPdf/src/manifest.ts` | Rename action, register new modal |
| `App_Plugins/CreateFromPdf/src/create-from-pdf-action.ts` | Open source picker first, then PDF modal |

## No Changes

| File | Why |
|------|-----|
| `create-from-pdf-modal.element.ts` | PDF modal stays exactly as-is |
| `create-from-pdf-modal.token.ts` | PDF modal contract unchanged |
| `PdfPagePropertiesService.cs` | Backend extraction unchanged |
| `PdfExtractionController.cs` | API endpoints unchanged |

---

## Testing Checklist

- [ ] Context menu shows "Create Document from Source" (not "Create Document from PDF")
- [ ] Clicking opens the source type picker modal
- [ ] PDF option is enabled and clickable
- [ ] Web and Word options are visible but disabled/greyed
- [ ] Clicking PDF opens the existing PDF modal
- [ ] Full PDF workflow still works end-to-end (select PDF → extract → create document)
- [ ] Clicking Cancel on source picker closes without error
- [ ] Clicking Cancel on PDF modal returns to source picker (or closes entirely — design decision)

---

## Design Decision: Cancel Behaviour

When the user cancels the PDF modal, should they:

**A) Return to the source picker** — allows them to pick a different source type
**B) Close everything** — simpler, and they can re-open from the context menu

This needs deciding during implementation. Option B is simpler for now.

---

## Feature Branch

```bash
git checkout main
git pull
git checkout -b feature/create-from-source-entry-point
```
