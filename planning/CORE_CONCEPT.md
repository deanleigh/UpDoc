# UpDoc: Core Concept

## What UpDoc Does

UpDoc uploads documents to a content management system by converting them to Markdown.

A user has content in some source format — a PDF brochure, a Word document, a web page, or a Markdown file. UpDoc converts that source to Markdown, lets the user pick pieces of the resulting text, and maps those pieces to fields in the CMS.

**Any Source → Markdown → Pick Pieces → Map to CMS Fields**

That's it. Everything else is implementation detail.

---

## The Source Difficulty Spectrum

All sources end up as Markdown, but they differ in how much work it takes to get there:

| Source | Difficulty | Why |
|--------|-----------|-----|
| **Markdown** | None | Already Markdown. Nothing to convert. |
| **Word** | Low | Styles carry structure. Heading 1 = `#`, Heading 2 = `##`, Normal = paragraph. The document already knows what's a heading and what's body text. |
| **Web page** | Medium | HTML is semi-structured. `<h2>` = `##`, `<p>` = paragraph, `<ul><li>` = `- `. Structure exists but may need cleaning (navigation, ads, footers to strip). |
| **PDF** | Hard | No structure at all. A PDF is positioned text — characters at coordinates with font metadata. It doesn't know what a "heading" is. It only knows "this text is 28pt Clarendon at position (50, 120)". |

---

## Why Rules Exist

The entire rules and actions system exists because of PDF.

Markdown, Word, and Web sources already have structure baked in — heading levels, paragraph breaks, lists. The conversion to Markdown is mechanical: read the structure, write the corresponding Markdown syntax.

PDF has none of that. It's raw positioned text with font metadata. So the rules system is how the user teaches UpDoc to reconstruct the structure that PDFs don't have:

> "Text at 28pt in Clarendon font? That's a section title."
> "Text at 10pt in blue HelveticaNeue-Medium? That's a heading 2."
> "Text at 8.5pt in HelveticaNeue? That's a paragraph."

Each rule is a Markdown conversion instruction: **given these visual properties, produce this Markdown syntax.** The rules reconstruct what a Word document or Markdown file would already know.

For simpler sources, fewer rules are needed — possibly none at all.

---

## The Pipeline

```
Source Document
     │
     ▼
  Extract        (get the raw content out of the source format)
     │
     ▼
  Shape          (apply rules to reconstruct structure → produce Markdown)
     │
     ▼
  Markdown       ← the universal intermediate format
     │
     ▼
  Pick & Map     (user selects Markdown sections → maps to CMS fields)
     │
     ▼
  CMS Document   (Umbraco page created with mapped content)
```

Markdown is the pivot point. Everything above it is about getting content INTO Markdown. Everything below it is about getting content OUT of Markdown and into the CMS. The rules system lives entirely in the "Shape" step — it's the bridge between raw extraction and structured Markdown.

### Why Markdown Is Always the Intermediate Format

Every piece of extracted content becomes Markdown, even if the destination field is plain text. This is deliberate:

1. **One source, many destinations.** The same piece of Markdown content can be mapped to multiple CMS fields simultaneously — a Rich Text field on one block AND a plain text Summary on another. The destination field type determines the final format:
   - **Plain text field** → strip Markdown formatting, use the raw text
   - **Rich Text field** → convert Markdown to HTML
   - **Store as file** → keep as Markdown

2. **No information loss.** If you convert to plain text too early, you lose the formatting. If you keep it as Markdown, you always have the option to use it as rich content or plain text. The decision is deferred to the point of mapping, not the point of extraction.

3. **Human-readable preview.** The Markdown formatting makes extracted content readable during the review and mapping phase. Without it, the user sees a wall of undifferentiated text. With it, they can see "this is a heading, this is body text, this is a bulleted list" — which is essential for knowing which piece maps where. The markup serves the user even when every destination field is plain text.

4. **Future storage options.** The Markdown content could end up stored as `.md` files, JSON with Markdown values, Markdown with YAML front matter, or formats not yet decided. Markdown is portable and format-agnostic.

```
  Markdown section: "## What We Will See\n- Granada tour\n- Alhambra visit"
       │
       ├──→ Block Rich Text field  → converts to HTML: <h2>What We Will See</h2><ul>...
       ├──→ Block Title field      → strips to plain text: "What We Will See"
       └──→ Archive .md file       → stored as-is
```

---

## Naming Implications

Because the core operation is "convert to Markdown", the vocabulary should reflect Markdown conversion:

- **Section Title** → produces a Markdown heading (`## Section Name`) and starts a new section
- **Section Content** → produces Markdown body text within the current section
- **Format** → which Markdown syntax to use for content (paragraph, `## heading`, `- bullet`, `1. numbered`)
- **Exclude** → skip entirely, don't include in the Markdown output

The format values map directly to Markdown syntax:

| Format | Markdown Output |
|--------|----------------|
| Paragraph | plain text |
| Heading 1 | `# text` |
| Heading 2 | `## text` |
| Heading 3 | `### text` |
| Bullet List Item | `- text` |
| Numbered List Item | `1. text` |
