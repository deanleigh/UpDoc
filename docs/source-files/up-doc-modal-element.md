# up-doc-modal.element.ts

The Lit component that renders the "Create from Source" sidebar modal.

## What it does

Provides the UI for users to:

1. See which blueprint was selected (displayed at the top)
2. Enter a document name (or leave blank to auto-populate from source)
3. Choose a source type (PDF Document, Web Page, or Word Document)
4. Configure the source (pick a media item, paste a URL, etc.)
5. For PDF sources: automatically extracts sections using the config's extraction rules when a media item is selected
6. Pre-fills the document name with the extracted title (if not already entered)
7. Review extracted content in the **Content tab** before creating the document
8. Edit or copy individual sections via hover-reveal action buttons
9. Submit or cancel the operation

Currently only the PDF source type is fully functional. Web Page and Word Document source types show their respective UI (URL input and media picker) but display "not yet available" messages and the Create button remains disabled.

## Tabbed Interface

The modal uses a tabbed interface with navigation tabs in the header:

- **Source tab** (default): Configure the import source (blueprint, document name, source type, source picker)
- **Content tab**: Review and manage extracted content before creating the document

The tabs follow Umbraco's sidebar modal header pattern using `slot="navigation"` on the `uui-tab-group`. The Content tab is disabled until extraction completes, providing visual feedback that content is ready for review.

## Class structure

```typescript
type TabType = 'source' | 'content';

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

    // ... methods and render
}
```

The modal stores:
- `_activeTab` -- tracks which tab is currently active ('source' or 'content')
- `_extractedSections` -- a `Record<string, string>` holding all extracted values keyed by section key (e.g., "title", "description", "itinerary")
- `_config` -- the full `DocumentTypeConfig` containing source, destination, and map configs

## Key concepts

### Extending UmbModalBaseElement

All Umbraco modals extend `UmbModalBaseElement<TData, TValue>`:
- `TData` -- The data passed TO the modal when opening
- `TValue` -- The data returned FROM the modal when submitted

### Unified extraction via #extractFromSource

The `#extractFromSource` method calls the `extractSections` function from `map-file.service.ts`:

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

This method delegates all extraction logic to the backend, which uses the config's source.json sections to determine how to parse the PDF.

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
                <uui-icon slot="icon" name="icon-document"></uui-icon>
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
        </uui-tab-group>
    `;
}

#hasExtractedContent(): boolean {
    return Object.values(this._extractedSections).some((v) => v.length > 0);
}
```

### Source type selection

The `uui-select` dropdown uses the `placeholder` attribute to show "Choose a source..." when no source type is selected. When the user changes the source type, all source-specific state is reset (selected media, URL, extracted sections, config). This ensures a clean slate when switching between source types.

### Conditional source UI rendering

Each source type renders its own UI via `#renderSourceUI()`:
- **PDF** (`#renderPdfSource()`) -- Media picker + extraction status (fully functional)
- **Web** (`#renderWebSource()`) -- URL input + "not yet available" message
- **Doc** (`#renderDocSource()`) -- Media picker + "not yet available" message

### Create button enablement

The `#getCanCreate()` method controls when the Create button is enabled:
- Requires a document name and no active extraction
- For PDF: also requires a selected media item
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

The modal uses a tabbed interface with two tabs:

### Source Tab

1. **Blueprint box** -- Shows the selected blueprint name with an icon
2. **Document Name box** -- Text input with explanatory text
3. **Source box** -- Contains a source type dropdown and conditional source-specific UI

### Content Tab
- **Section cards** -- Each extracted section displayed as a card with:
  - Header showing the human-readable section label
  - Body with full content (scrollable for long content)
  - Hover-reveal action bar with Edit and Copy buttons

Uses Umbraco's UI components:
- `umb-body-layout` -- Standard modal layout with headline "Create from Source"
- `uui-tab-group` -- Navigation tabs in the header (via `slot="navigation"`)
- `uui-tab` -- Individual tabs for Source and Content
- `uui-box` -- Content containers with headlines
- `uui-select` -- Dropdown for choosing source type
- `umb-property-layout` -- Form field wrapper with label
- `umb-input-media` -- Media picker for selecting PDF/Doc
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
import type { DocumentTypeConfig } from './map-file.types.js';
import { extractSections } from './map-file.service.js';
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
