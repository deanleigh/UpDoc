# Content Preview Tab Design

## Overview

The "Create from Source" modal needs a way to display and edit extracted content before creating the document. Currently, extracted content is shown as truncated previews (200 characters) in small scrollable boxes, which makes it difficult to review or edit the full content.

This document outlines the design for adding a tabbed interface to the modal, with a dedicated "Content" tab for reviewing and editing extracted content.

---

## Problem Statement

1. **Truncated previews are misleading** — Users see 200 characters of content but the full extraction may be much longer
2. **No way to edit before creating** — If extraction captures odd characters or unwanted content, users must fix it after document creation
3. **Inconsistent scrolling behavior** — Multi-line content (bullets, headings) shows scrollbars; single paragraphs don't, even when content is long
4. **Limited visibility** — The small preview boxes don't give a clear picture of what will be imported

---

## Design Decision

### Tabs in Modal Header

Use **sidebar modal header tabs** (like the "Create Empty" / "Clipboard" tabs in Umbraco's "Add content" panel), NOT property group tabs (like "Page Properties" / "Page Content" / "Page Settings").

**Rationale:**
- Header tabs can control the modal size — the Content tab can open in a **wider modal** for better content visibility
- Property group tabs would remain within the current narrow modal width
- Header tabs match the pattern used elsewhere in Umbraco for sidebar modal navigation

### Tab Structure

```
┌────────────────────────────────────────┐
│  Create from Source                    │
│                                        │
│  [📄 Source]  [✏️ Content]             │  ← header tabs
├────────────────────────────────────────┤
│                                        │
│  (active tab content)                  │
│                                        │
└────────────────────────────────────────┘
│                        [Close] [Create]│
```

---

## Tab Specifications

### Tab 1: Source (Default)

**Purpose:** Configure the import source and see extraction status

**Contents:**
- Blueprint display (icon + name)
- Document name input
- Source type selector (PDF, Web, Word)
- Source picker (Media picker for PDF, URL input for Web)
- Extraction status indicator (loading, success, error)
- Truncated content preview (existing "Extracted Content" box)

**Modal size:** `small` (~400px)

### Tab 2: Content (Edit)

**Purpose:** Review and edit full extracted content before creating

**Icon:** Pencil (✏️) to indicate editable content

**Contents:**
- Full extracted content for each section
- Editable textarea for each section (raw markdown)
- No truncation — show complete content
- Scrollable container for long content

**Modal size:** `medium` or `large` (~600-800px) — wider to accommodate content editing

**Initial state:** Disabled/greyed out until extraction completes

---

## Interaction Flow

1. User opens "Create from Source" modal
2. **Source tab** is active, **Content tab** is disabled (greyed out)
3. User selects PDF and extraction runs
4. Extraction completes → **Content tab becomes enabled** (visual state change)
5. User can click Content tab to review/edit full content
6. Modal expands to wider size when Content tab is active
7. User edits content if needed (changes persist in component state)
8. User switches back to Source tab (modal returns to narrow width)
9. User clicks Create — edited content is used for document creation

---

## Visual States

### Content Tab - Disabled
- Greyed out appearance
- Not clickable
- Pencil icon visible but dimmed
- Label: "Content"

### Content Tab - Enabled
- Full color/active appearance
- Clickable
- Pencil icon prominent
- Label: "Content"
- The state transition (disabled → enabled) serves as notification that content is ready

---

## Technical Implementation

### Components

```typescript
// Tab state
@state() private _activeTab: 'source' | 'content' = 'source';

// Check if content tab should be enabled
private get _hasExtractedContent(): boolean {
    return Object.values(this._extractedSections).some(v => v.length > 0);
}
```

### Tab Group (in render method)

```typescript
<uui-tab-group>
    <uui-tab
        label="Source"
        .active=${this._activeTab === 'source'}
        @click=${() => this._activeTab = 'source'}>
        <umb-icon slot="icon" name="icon-document"></umb-icon>
    </uui-tab>
    <uui-tab
        label="Content"
        .active=${this._activeTab === 'content'}
        ?disabled=${!this._hasExtractedContent}
        @click=${() => this._hasExtractedContent && (this._activeTab = 'content')}>
        <umb-icon slot="icon" name="icon-edit"></umb-icon>
    </uui-tab>
</uui-tab-group>
```

### Dynamic Modal Size

The modal size could be controlled dynamically based on active tab:
- Source tab → `small`
- Content tab → `medium` or `large`

This may require updating the modal token or using CSS to control width based on tab state.

### Content Tab View

```typescript
#renderContentTab() {
    return html`
        <div class="content-editor">
            ${Object.entries(this._extractedSections).map(([key, value]) => html`
                <div class="section-editor">
                    <label>${key}</label>
                    <uui-textarea
                        .value=${value}
                        @input=${(e: Event) => this.#updateSection(key, (e.target as HTMLTextAreaElement).value)}
                        rows="8">
                    </uui-textarea>
                </div>
            `)}
        </div>
    `;
}
```

---

## CSS Considerations

```css
/* Content tab styling when disabled */
uui-tab[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Section editor in Content tab */
.content-editor {
    display: flex;
    flex-direction: column;
    gap: var(--uui-size-space-4);
}

.section-editor label {
    font-weight: bold;
    margin-bottom: var(--uui-size-space-2);
}

.section-editor uui-textarea {
    width: 100%;
    font-family: monospace;
}
```

---

## Open Questions

1. **Modal size switching** — Can the modal size change dynamically when switching tabs, or does it need to be set at modal open time? If static, should we default to `medium` to accommodate both tabs?

2. **Preserve edits on tab switch** — Edits made in the Content tab should persist when switching back to Source tab. This is handled by component state, but needs testing.

3. **Textarea vs code editor** — Should we use simple `<uui-textarea>` or a code editor component for markdown editing? Textarea is simpler; code editor provides syntax highlighting.

4. **Section labels** — Should we show the section `key` or the `label` from the source config? Label is more user-friendly.

---

## Future Enhancements

1. **Markdown preview** — Add a preview pane showing rendered markdown alongside the editor
2. **Diff view** — Show what changed if user edits the extracted content
3. **Re-extract button** — Allow re-running extraction without closing the modal
4. **Section-level actions** — Clear, reset to original, copy to clipboard

---

## Related Documents

- [REFACTOR_TO_CONFIGURABLE.md](./REFACTOR_TO_CONFIGURABLE.md) — Overall config architecture
- [CREATE_FROM_SOURCE_UI.md](./CREATE_FROM_SOURCE_UI.md) — (future) unified sidebar modal design
- [PDF_FORMATTING_RULES_EXPLORATION.md](./PDF_FORMATTING_RULES_EXPLORATION.md) — PDF extraction formatting

---

## Implementation Checklist

- [ ] Add `_activeTab` state to modal element
- [ ] Add `uui-tab-group` with Source and Content tabs to render method
- [ ] Implement `#renderSourceTab()` method (refactor existing content)
- [ ] Implement `#renderContentTab()` method with editable textareas
- [ ] Add disabled state logic for Content tab
- [ ] Add CSS for tab styling and content editor
- [ ] Test tab switching preserves edited content
- [ ] Determine modal size strategy (static medium vs dynamic)
- [ ] Update documentation

---

**Created:** 2026-02-03
**Status:** Planning
