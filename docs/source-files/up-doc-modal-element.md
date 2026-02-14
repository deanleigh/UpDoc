# up-doc-modal.element.ts

The Lit component that renders the "Create from Source" sidebar modal.

## What it does

Provides the UI for users to:

1. Choose a source type (PDF Document, Markdown, Web Page, or Word Document)
2. Configure the source (pick a media item, paste a URL, etc.)
3. Enter a document name (or leave blank to auto-populate from mapped title elements)
4. For PDF and Markdown sources: automatically runs rich extraction when a media item is selected
5. Pre-fills the document name by finding elements mapped to the first destination field and concatenating them
6. Review mapped content in the **Content tab** — shows destination field labels with assembled values from the extraction
7. Copy individual mapped values via hover-reveal action buttons
8. Check the destination document type and blueprint in the **Destination tab**
9. Submit or cancel the operation

PDF and Markdown source types are fully functional. Web Page and Word Document source types show their respective UI (URL input and media picker) but display "not yet available" messages and the Create button remains disabled.

The source type dropdown is **dynamically populated** from the workflow config. When the modal opens, it fetches the config for the selected blueprint and only shows source types that have config files (e.g., if only `source-pdf.json` exists, only "PDF Document" appears). If only one source type is available, it is auto-selected.

## Tabbed Interface

The modal uses a tabbed interface with navigation tabs in the header:

- **Source tab** (default, active on open): Choose a source type, provide the source file/URL, enter document name
- **Content tab**: Review mapped content before creating the document (disabled until extraction completes)
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
- `_extractedSections` -- a `Record<string, string>` holding all extracted values keyed by **element ID** (e.g., `p1-e2`, `p1-e3`). These IDs match the source keys in `map.json`.
- `_config` -- the full `DocumentTypeConfig` loaded once at startup via `fetchConfig()`, containing source, destination, and map configs

## Key concepts

### Extending UmbModalBaseElement

All Umbraco modals extend `UmbModalBaseElement<TData, TValue>`:
- `TData` -- The data passed TO the modal when opening
- `TValue` -- The data returned FROM the modal when submitted

### Rich extraction via #extractFromSource

The `#extractFromSource` method calls the `extractRich` function from `workflow.service.ts` to get elements with IDs that match the element IDs stored in `map.json`:

```typescript
async #extractFromSource(mediaUnique: string) {
    this._isExtracting = true;
    this._extractionError = null;

    try {
        const authContext = await this.getContext(UMB_AUTH_CONTEXT);
        const token = await authContext.getLatestToken();

        // Use rich extraction — returns elements with IDs matching map.json
        const extraction = await extractRich(mediaUnique, token);

        if (!extraction?.elements?.length) {
            this._extractionError = 'Failed to extract content from source';
            return;
        }

        // Build element ID → text lookup (same key format as map.json sources)
        const elementLookup: Record<string, string> = {};
        for (const element of extraction.elements) {
            elementLookup[element.id] = element.text;
        }

        this._extractedSections = elementLookup;

        // Pre-fill document name from mapped title elements
        if (!this._documentName && this._config) {
            this.#prefillDocumentName(elementLookup);
        }
    } catch (error) {
        this._extractionError = 'Failed to connect to extraction service';
    } finally {
        this._isExtracting = false;
    }
}
```

This method uses the same rich extraction endpoint as the workflow authoring Source tab, ensuring element IDs are consistent. The config is loaded once at modal startup (not per-extraction), so `_config` is already available when extraction completes.

### Document name pre-fill

The `#prefillDocumentName` method finds the first destination target in `map.json`, collects text from all elements mapped to that target, and joins them with spaces:

```typescript
#prefillDocumentName(elementLookup: Record<string, string>) {
    if (!this._config?.map?.mappings?.length) return;

    const firstTarget = this._config.map.mappings[0]?.destinations?.[0]?.target;
    if (!firstTarget) return;

    const parts: string[] = [];
    for (const mapping of this._config.map.mappings) {
        if (mapping.enabled === false) continue;
        const mapsToTarget = mapping.destinations.some((d) => d.target === firstTarget);
        if (mapsToTarget && elementLookup[mapping.source]) {
            parts.push(elementLookup[mapping.source]);
        }
    }

    if (parts.length > 0) {
        this._documentName = parts.join(' ');
    }
}
```

This handles cases like a title split across two PDF lines (e.g., "Flemish Masters –" + "Bruges, Antwerp & Ghent" → "Flemish Masters – Bruges, Antwerp & Ghent").

### Content tab with grouped preview

The Content tab shows destination field labels with assembled values from the extraction, grouped by the destination document's tab structure. This gives the user a preview that matches the layout they'll see when editing the document in Umbraco.

The `#buildGroupedPreview()` method groups mapped content by destination tab using shared utilities from `destination-utils.ts`:

```typescript
interface ContentTabGroup {
    tabId: string;
    tabLabel: string;
    items: Array<{ label: string; value: string; blockLabel?: string }>;
}
```

- Uses `resolveDestinationTab()` to classify each mapping into a destination tab
- Uses `resolveBlockLabel()` to resolve block labels for Page Content items
- Compound keys (`blockKey:alias`) ensure block property values are correctly grouped
- Items within Page Content are sub-grouped by block, with block headers as visual dividers
- Only tabs with mapped content are shown

When multiple tabs have content, inner `uui-tab-group` tabs appear (matching the Destination view's tab pattern). When only one tab has content, the tab bar is omitted to avoid a single useless tab.

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
    return Object.keys(this._extractedSections).length > 0;
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

When the modal opens, it immediately fetches the workflow config via `fetchConfig()` to discover which source types have config files. The config is stored in `_config` for use by extraction and preview:

```typescript
async #loadAvailableSourceTypes() {
    this._loadingSourceTypes = true;
    try {
        const config = await fetchConfig(blueprintId, token);
        if (config) {
            this._config = config;
            if (config.sources) {
                this._availableSourceTypes = Object.keys(config.sources);
                if (this._availableSourceTypes.length === 1) {
                    this._sourceType = this._availableSourceTypes[0] as SourceType;
                }
            }
        }
    } finally {
        this._loadingSourceTypes = false;
    }
}
```

The dropdown only shows source types that exist in the config's `sources` dictionary. This means if a workflow only has `source-pdf.json`, the user won't see Markdown, Web Page, or Word Document as options. Human-readable labels are mapped via `SOURCE_TYPE_LABELS`.

### Source type selection

The `uui-select` dropdown shows "Choose a source..." when no source type is selected (only when multiple source types are available). When the user changes the source type, source-specific state is reset (selected media, URL, extracted sections, extraction error). The `_config` is preserved across source type changes since it was loaded once at startup.

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

The `#handleSave` method returns `extractedSections` (element ID → text lookup) and `config` so the action has everything needed to apply mappings.

## Template structure

The modal uses a tabbed interface with three tabs:

### Source Tab (default)

1. **Document Name box** -- Text input with explanatory text
2. **Source box** -- Contains a source type dropdown and conditional source-specific UI

### Content Tab
- **Inner tabs** matching the destination document's tab structure (Page Properties, Page Content, custom tabs)
- When only one tab has content, the tab bar is hidden
- **Page Content** items are sub-grouped by block with block name headers
- **Mapped field cards** -- Each destination field displayed as a card with:
  - Header showing the human-readable destination field label (resolved from destination config)
  - Body with assembled content from all mapped source elements (concatenated with spaces)
  - Hover-reveal action bar with Copy button
  - Empty state message when no mappings exist

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
- `uui-button` -- Action buttons (Create, Close, Copy)

## Extraction status display

The modal shows visual feedback during and after extraction:
- **Extracting**: Loading bar with "Extracting content from source..." message
- **Error**: Red box with error message
- **Success**: Green box with "Content extracted successfully"

## Imports

```typescript
import type { UmbUpDocModalData, UmbUpDocModalValue, SourceType } from './up-doc-modal.token.js';
import type { DocumentTypeConfig } from './workflow.types.js';
import { extractRich, fetchConfig } from './workflow.service.js';
import { getDestinationTabs, resolveDestinationTab, resolveBlockLabel } from './destination-utils.js';
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
