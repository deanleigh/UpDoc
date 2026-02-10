# up-doc-modal.element.ts

The Lit component that renders the "Create from Source" sidebar modal.

## What it does

Provides the UI for users to:

1. Choose a source type (PDF Document, Markdown, Web Page, or Word Document)
2. Configure the source (pick a media item, paste a URL, etc.)
3. Enter a document name (or leave blank to auto-populate from source)
4. For PDF and Markdown sources: automatically extracts sections using the config's extraction rules when a media item is selected
5. Pre-fills the document name with the extracted title (if not already entered)
6. Review extracted content in the **Content tab** before creating the document
7. Edit or copy individual sections via hover-reveal action buttons
8. Check the destination document type and blueprint in the **Destination tab**
9. Submit or cancel the operation

PDF and Markdown source types are fully functional. Web Page and Word Document source types show their respective UI (URL input and media picker) but display "not yet available" messages and the Create button remains disabled.

The source type dropdown is **dynamically populated** from the workflow config. When the modal opens, it fetches the config for the selected blueprint and only shows source types that have config files (e.g., if only `source-pdf.json` exists, only "PDF Document" appears). If only one source type is available, it is auto-selected.

## Tabbed Interface

The modal uses a tabbed interface with navigation tabs in the header:

- **Source tab** (default, active on open): Choose a source type, provide the source file/URL, enter document name
- **Content tab**: Review and manage extracted content before creating the document (disabled until extraction completes)
- **Destination tab**: Read-only reference showing the selected document type and blueprint

The tab order follows the user's workflow: Source (what to import) -> Content (review extraction) -> Destination (where it's going, already decided). The Source tab is active on arrival because that's the user's immediate next action. The Destination tab is last because the user already chose the document type and blueprint in the preceding dialog steps — it's a reference, not a next step.

The tabs follow Umbraco's sidebar modal header pattern using `slot="navigation"` on the `uui-tab-group`.

## Class structure

```typescript
type TabType = 'source' | 'content' | 'destination';

@customElement('up-doc-modal')
export class UpDocModalElement extends UmbModalBaseElement<
    UmbUpDocModalData,
    UmbUpDocModalValue
> {
    @state() private _activeTab: TabType = 'source';
    @state() private _documentName = '';
    @state() private _sourceType: SourceType | '' = '';
    @state() private _sourceUrl = '';
    @state() private _selectedMediaUnique: string | null = null;
    @state() private _extractedSections: Record<string, string> = {};
    @state() private _config: DocumentTypeConfig | null = null;
    @state() private _isExtracting = false;
    @state() private _extractionError: string | null = null;
    @state() private _availableSourceTypes: string[] = [];
    @state() private _loadingSourceTypes = true;

    // ... methods and render
}
```

The modal stores:
- `_activeTab` -- tracks which tab is currently active ('source', 'content', or 'destination')
- `_extractedSections` -- a `Record<string, string>` holding all extracted values keyed by section key (e.g., "title", "description", "itinerary")
- `_config` -- the full `DocumentTypeConfig` containing source, destination, and map configs

## Key concepts

### Extending UmbModalBaseElement

All Umbraco modals extend `UmbModalBaseElement<TData, TValue>`:
- `TData` -- The data passed TO the modal when opening
- `TValue` -- The data returned FROM the modal when submitted

### Unified extraction via #extractFromSource

The `#extractFromSource` method calls the `extractSections` function from `workflow.service.ts`:

```typescript
async #extractFromSource(mediaUnique: string) {
    this._isExtracting = true;
    this._extractionError = null;

    try {
        const blueprintId = this.data?.blueprintId;
        if (!blueprintId) {
            this._extractionError = 'No blueprint ID available';
            return;
        }

        const authContext = await this.getContext(UMB_AUTH_CONTEXT);
        const token = await authContext.getLatestToken();

        const result = await extractSections(mediaUnique, blueprintId, token);

        if (!result) {
            this._extractionError = 'Failed to extract content from source';
            return;
        }

        this._extractedSections = result.sections;
        this._config = result.config;

        // Pre-fill document name with extracted title
        if (result.sections['title'] && !this._documentName) {
            this._documentName = result.sections['title'];
        }
    } catch (error) {
        this._extractionError = 'Failed to connect to extraction service';
    } finally {
        this._isExtracting = false;
    }
}
```

This method delegates all extraction logic to the backend, passing `this._sourceType` so the backend routes to the correct extraction service (PDF or Markdown). The config's source.json sections determine how to parse the source document.

### Human-readable section labels

The modal converts internal section keys to user-friendly labels:

```typescript
const SECTION_LABELS: Record<string, string> = {
    title: 'Page Title',
    description: 'Description',
    itinerary: 'Itinerary',
    features: 'Features',
    accommodation: 'Accommodation',
};

#getSectionLabel(key: string): string {
    return SECTION_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
}
```

### Content tab with hover action buttons

The Content tab displays extracted sections as cards with hover-reveal action buttons:

```typescript
#renderContentTab() {
    const sections = this._extractedSections;

    return html`
        <div class="content-editor">
            <p class="content-editor-intro">
                Review the extracted content before creating the document.
            </p>
            ${Object.entries(sections).map(([key, value]) => {
                if (!value) return nothing;
                return html`
                    <div class="section-card">
                        <div class="section-card-header">
                            <span class="section-card-label">${this.#getSectionLabel(key)}</span>
                        </div>
                        <div class="section-card-body">
                            <uui-action-bar class="section-card-actions">
                                <uui-button compact title="Edit" ...>
                                    <uui-icon name="icon-edit"></uui-icon>
                                </uui-button>
                                <uui-button compact title="Copy" ...>
                                    <uui-icon name="icon-documents"></uui-icon>
                                </uui-button>
                            </uui-action-bar>
                            <div class="section-card-content">${value}</div>
                        </div>
                    </div>
                `;
            })}
        </div>
    `;
}
```

The action buttons use `uui-action-bar` and appear on hover, following the block editor UX pattern. CSS controls the hover-reveal behavior:

```css
.section-card-actions {
    position: absolute;
    top: var(--uui-size-space-2);
    right: var(--uui-size-space-2);
    opacity: 0;
    transition: opacity 120ms ease;
}

.section-card:hover .section-card-actions {
    opacity: 1;
}
```

### Destination tab

The Destination tab shows read-only reference information about where the extracted content will be created:

```typescript
#renderDestinationTab() {
    return html`
        <uui-box headline="Document Type">
            <div class="destination-value">
                <umb-icon name="icon-document-dashed-line"></umb-icon>
                <span>${this.data?.documentTypeName}</span>
            </div>
        </uui-box>
        <uui-box headline="Blueprint">
            <div class="destination-value">
                <umb-icon name="icon-blueprint"></umb-icon>
                <span>${this.data?.blueprintName}</span>
            </div>
        </uui-box>
    `;
}
```

Both `documentTypeName` and `blueprintName` are passed via the modal data from the preceding picker dialogs.

### Tab navigation

The tabs are rendered in the modal header using `slot="navigation"`:

```typescript
#renderTabs() {
    const hasContent = this.#hasExtractedContent();
    return html`
        <uui-tab-group slot="navigation">
            <uui-tab
                label="Source"
                ?active=${this._activeTab === 'source'}
                orientation="horizontal"
                @click=${() => this.#handleTabClick('source')}>
                <uui-icon slot="icon" name="icon-page-add"></uui-icon>
                Source
            </uui-tab>
            <uui-tab
                label="Content"
                ?active=${this._activeTab === 'content'}
                orientation="horizontal"
                ?disabled=${!hasContent}
                @click=${() => this.#handleTabClick('content')}>
                <uui-icon slot="icon" name="icon-edit"></uui-icon>
                Content
            </uui-tab>
            <uui-tab
                label="Destination"
                ?active=${this._activeTab === 'destination'}
                orientation="horizontal"
                @click=${() => this.#handleTabClick('destination')}>
                <uui-icon slot="icon" name="icon-document"></uui-icon>
                Destination
            </uui-tab>
        </uui-tab-group>
    `;
}

#hasExtractedContent(): boolean {
    return Object.values(this._extractedSections).some((v) => v.length > 0);
}
```

Tab content routing uses a switch statement:

```typescript
#renderTabContent() {
    switch (this._activeTab) {
        case 'source':
            return this.#renderSourceTab();
        case 'content':
            return this.#renderContentTab();
        case 'destination':
            return this.#renderDestinationTab();
    }
}
```

### Dynamic source type loading

When the modal opens, it immediately fetches the workflow config via `fetchConfig()` to discover which source types have config files:

```typescript
async #loadAvailableSourceTypes() {
    this._loadingSourceTypes = true;
    try {
        const config = await fetchConfig(blueprintId, token);
        if (config?.sources) {
            this._availableSourceTypes = Object.keys(config.sources);
            // Auto-select if only one source type
            if (this._availableSourceTypes.length === 1) {
                this._sourceType = this._availableSourceTypes[0] as SourceType;
            }
        }
    } finally {
        this._loadingSourceTypes = false;
    }
}
```

The dropdown only shows source types that exist in the config's `sources` dictionary. This means if a workflow only has `source-pdf.json`, the user won't see Markdown, Web Page, or Word Document as options. Human-readable labels are mapped via `SOURCE_TYPE_LABELS`.

### Source type selection

The `uui-select` dropdown shows "Choose a source..." when no source type is selected (only when multiple source types are available). When the user changes the source type, all source-specific state is reset (selected media, URL, extracted sections, config). This ensures a clean slate when switching between source types.

### Conditional source UI rendering

Each source type renders its own UI via `#renderSourceUI()`:
- **PDF** (`#renderPdfSource()`) -- Media picker + extraction status (fully functional)
- **Markdown** (`#renderMarkdownSource()`) -- Media picker + extraction status (fully functional, same pattern as PDF)
- **Web** (`#renderWebSource()`) -- URL input + "not yet available" message
- **Doc** (`#renderDocSource()`) -- Media picker + "not yet available" message

### Create button enablement

The `#getCanCreate()` method controls when the Create button is enabled:
- Requires a document name and no active extraction
- For PDF and Markdown: also requires a selected media item
- For Web and Doc: always returns false (not yet functional)

### Modal context methods

```typescript
#handleSave() {
    this.value = {
        name: this._documentName,
        sourceType: this._sourceType as SourceType,
        mediaUnique: this._selectedMediaUnique,
        sourceUrl: this._sourceUrl || null,
        extractedSections: this._extractedSections,
        config: this._config,
    };
    this._submitModal();
}

#handleClose() {
    this._rejectModal();
}
```

The `#handleSave` method returns `extractedSections` and `config` so the action has everything needed to apply mappings.

## Template structure

The modal uses a tabbed interface with three tabs:

### Source Tab (default)

1. **Document Name box** -- Text input with explanatory text
2. **Source box** -- Contains a source type dropdown and conditional source-specific UI

### Content Tab
- **Section cards** -- Each extracted section displayed as a card with:
  - Header showing the human-readable section label
  - Body with full content (scrollable for long content)
  - Hover-reveal action bar with Edit and Copy buttons

### Destination Tab
- **Destination box** -- Read-only display of:
  - Document Type name with icon
  - Blueprint name with icon

Uses Umbraco's UI components:
- `umb-body-layout` -- Standard modal layout with headline "Create from Source"
- `uui-tab-group` -- Navigation tabs in the header (via `slot="navigation"`)
- `uui-tab` -- Individual tabs for Source, Content, and Destination
- `uui-box` -- Content containers with headlines
- `uui-select` -- Dropdown for choosing source type
- `umb-property-layout` -- Form field wrapper with label
- `umb-input-media` -- Media picker for selecting PDF/Doc
- `umb-icon` -- Umbraco icons for document type and blueprint display
- `uui-input` -- Text input for document name and URL
- `uui-loader-bar` -- Loading indicator during extraction
- `uui-icon` -- Status icons for success/error/info states
- `uui-action-bar` -- Container for hover-reveal action buttons
- `uui-button` -- Action buttons (Create, Close, Edit, Copy)

## Extraction status display

The modal shows visual feedback during and after extraction:
- **Extracting**: Loading bar with "Extracting content from source..." message
- **Error**: Red box with error message
- **Success**: Green box with "Content extracted successfully"

## Imports

```typescript
import type { UmbUpDocModalData, UmbUpDocModalValue, SourceType } from './up-doc-modal.token.js';
import type { DocumentTypeConfig } from './workflow.types.js';
import { extractSections, fetchConfig } from './workflow.service.js';
import { html, customElement, css, state, nothing } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
```

## Global declaration

```typescript
declare global {
    interface HTMLElementTagNameMap {
        'up-doc-modal': UpDocModalElement;
    }
}
```

This provides TypeScript support when using `document.createElement('up-doc-modal')`.
