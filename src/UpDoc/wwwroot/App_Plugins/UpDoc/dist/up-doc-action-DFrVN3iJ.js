var Oe = Object.defineProperty;
var be = (r) => {
  throw TypeError(r);
};
var Ze = (r, e, t) => e in r ? Oe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var m = (r, e, t) => Ze(r, typeof e != "symbol" ? e + "" : e, t), xe = (r, e, t) => e.has(r) || be("Cannot " + t);
var Z = (r, e, t) => (xe(r, e, "read from private field"), t ? t.call(r) : e.get(r)), E = (r, e, t) => e.has(r) ? be("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t);
var me = (r, e, t) => (xe(r, e, "access private method"), t);
import { UmbModalToken as ze, umbOpenModal as we } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as je } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as Ge } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as Qe } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as He } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as Fe } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as Xe } from "@umbraco-cms/backoffice/document";
const Je = new ze(
  "UpDoc.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
), Ve = new ze(
  "UpDoc.BlueprintPickerModal",
  {
    modal: {
      type: "dialog",
      size: "small"
    }
  }
);
function ie() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var q = ie();
function ve(r) {
  q = r;
}
var N = { exec: () => null };
function d(r, e = "") {
  let t = typeof r == "string" ? r : r.source, s = { replace: (n, i) => {
    let a = typeof i == "string" ? i : i.source;
    return a = a.replace(T.caret, "$1"), t = t.replace(n, a), s;
  }, getRegex: () => new RegExp(t, e) };
  return s;
}
var We = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), T = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}#`), htmlBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}<(?:[a-z].*>|!--)`, "i") }, Ke = /^(?:[ \t]*(?:\n|$))+/, Ye = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, et = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, O = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, tt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ae = /(?:[*+-]|\d{1,9}[.)])/, _e = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ie = d(_e).replace(/bull/g, ae).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), rt = d(_e).replace(/bull/g, ae).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), oe = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, nt = /^[^\n]+/, ce = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, st = d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ce).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), lt = d(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ae).getRegex(), K = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", pe = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, it = d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", pe).replace("tag", K).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Ce = d(oe).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", K).getRegex(), at = d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ce).getRegex(), he = { blockquote: at, code: Ye, def: st, fences: et, heading: tt, hr: O, html: it, lheading: Ie, list: lt, newline: Ke, paragraph: Ce, table: N, text: nt }, ye = d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", K).getRegex(), ot = { ...he, lheading: rt, table: ye, paragraph: d(oe).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ye).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", K).getRegex() }, ct = { ...he, html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", pe).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: N, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: d(oe).replace("hr", O).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, pt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ht = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Pe = /^( {2,}|\\)\n(?!\s*$)/, ut = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Y = /[\p{P}\p{S}]/u, ue = /[\s\p{P}\p{S}]/u, qe = /[^\s\p{P}\p{S}]/u, gt = d(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ue).getRegex(), Be = /(?!~)[\p{P}\p{S}]/u, kt = /(?!~)[\s\p{P}\p{S}]/u, ft = /(?:[^\s\p{P}\p{S}]|~)/u, dt = d(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", We ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Le = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, bt = d(Le, "u").replace(/punct/g, Y).getRegex(), xt = d(Le, "u").replace(/punct/g, Be).getRegex(), Ee = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", mt = d(Ee, "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, ue).replace(/punct/g, Y).getRegex(), wt = d(Ee, "gu").replace(/notPunctSpace/g, ft).replace(/punctSpace/g, kt).replace(/punct/g, Be).getRegex(), yt = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, ue).replace(/punct/g, Y).getRegex(), $t = d(/\\(punct)/, "gu").replace(/punct/g, Y).getRegex(), Tt = d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Rt = d(pe).replace("(?:-->|$)", "-->").getRegex(), St = d("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Rt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, At = d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), De = d(/^!?\[(label)\]\[(ref)\]/).replace("label", Q).replace("ref", ce).getRegex(), Me = d(/^!?\[(ref)\](?:\[\])?/).replace("ref", ce).getRegex(), zt = d("reflink|nolink(?!\\()", "g").replace("reflink", De).replace("nolink", Me).getRegex(), $e = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, ge = { _backpedal: N, anyPunctuation: $t, autolink: Tt, blockSkip: dt, br: Pe, code: ht, del: N, emStrongLDelim: bt, emStrongRDelimAst: mt, emStrongRDelimUnd: yt, escape: pt, link: At, nolink: Me, punctuation: gt, reflink: De, reflinkSearch: zt, tag: St, text: ut, url: N }, vt = { ...ge, link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", Q).getRegex(), reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Q).getRegex() }, ne = { ...ge, emStrongRDelimAst: wt, emStrongLDelim: xt, url: d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", $e).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: d(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", $e).getRegex() }, _t = { ...ne, br: d(Pe).replace("{2,}", "*").getRegex(), text: d(ne.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, j = { normal: he, gfm: ot, pedantic: ct }, D = { normal: ge, gfm: ne, breaks: _t, pedantic: vt }, It = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Te = (r) => It[r];
function I(r, e) {
  if (e) {
    if (T.escapeTest.test(r)) return r.replace(T.escapeReplace, Te);
  } else if (T.escapeTestNoEncode.test(r)) return r.replace(T.escapeReplaceNoEncode, Te);
  return r;
}
function Re(r) {
  try {
    r = encodeURI(r).replace(T.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function Se(r, e) {
  var i;
  let t = r.replace(T.findPipe, (a, l, p) => {
    let o = !1, h = l;
    for (; --h >= 0 && p[h] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), s = t.split(T.splitPipe), n = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), e) if (s.length > e) s.splice(e);
  else for (; s.length < e; ) s.push("");
  for (; n < s.length; n++) s[n] = s[n].trim().replace(T.slashPipe, "|");
  return s;
}
function M(r, e, t) {
  let s = r.length;
  if (s === 0) return "";
  let n = 0;
  for (; n < s && r.charAt(s - n - 1) === e; )
    n++;
  return r.slice(0, s - n);
}
function Ct(r, e) {
  if (r.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let s = 0; s < r.length; s++) if (r[s] === "\\") s++;
  else if (r[s] === e[0]) t++;
  else if (r[s] === e[1] && (t--, t < 0)) return s;
  return t > 0 ? -2 : -1;
}
function Ae(r, e, t, s, n) {
  let i = e.href, a = e.title || null, l = r[1].replace(n.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  let p = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: a, text: l, tokens: s.inlineTokens(l) };
  return s.state.inLink = !1, p;
}
function Pt(r, e, t) {
  let s = r.match(t.other.indentCodeCompensation);
  if (s === null) return e;
  let n = s[1];
  return e.split(`
`).map((i) => {
    let a = i.match(t.other.beginningSpace);
    if (a === null) return i;
    let [l] = a;
    return l.length >= n.length ? i.slice(n.length) : i;
  }).join(`
`);
}
var H = class {
  constructor(r) {
    m(this, "options");
    m(this, "rules");
    m(this, "lexer");
    this.options = r || q;
  }
  space(r) {
    let e = this.rules.block.newline.exec(r);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(r) {
    let e = this.rules.block.code.exec(r);
    if (e) {
      let t = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : M(t, `
`) };
    }
  }
  fences(r) {
    let e = this.rules.block.fences.exec(r);
    if (e) {
      let t = e[0], s = Pt(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: s };
    }
  }
  heading(r) {
    let e = this.rules.block.heading.exec(r);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        let s = M(t, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (t = s.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(r) {
    let e = this.rules.block.hr.exec(r);
    if (e) return { type: "hr", raw: M(e[0], `
`) };
  }
  blockquote(r) {
    let e = this.rules.block.blockquote.exec(r);
    if (e) {
      let t = M(e[0], `
`).split(`
`), s = "", n = "", i = [];
      for (; t.length > 0; ) {
        let a = !1, l = [], p;
        for (p = 0; p < t.length; p++) if (this.rules.other.blockquoteStart.test(t[p])) l.push(t[p]), a = !0;
        else if (!a) l.push(t[p]);
        else break;
        t = t.slice(p);
        let o = l.join(`
`), h = o.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${o}` : o, n = n ? `${n}
${h}` : h;
        let g = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(h, i, !0), this.lexer.state.top = g, t.length === 0) break;
        let u = i.at(-1);
        if ((u == null ? void 0 : u.type) === "code") break;
        if ((u == null ? void 0 : u.type) === "blockquote") {
          let c = u, b = c.raw + `
` + t.join(`
`), k = this.blockquote(b);
          i[i.length - 1] = k, s = s.substring(0, s.length - c.raw.length) + k.raw, n = n.substring(0, n.length - c.text.length) + k.text;
          break;
        } else if ((u == null ? void 0 : u.type) === "list") {
          let c = u, b = c.raw + `
` + t.join(`
`), k = this.list(b);
          i[i.length - 1] = k, s = s.substring(0, s.length - u.raw.length) + k.raw, n = n.substring(0, n.length - c.raw.length) + k.raw, t = b.substring(i.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: s, tokens: i, text: n };
    }
  }
  list(r) {
    var t, s;
    let e = this.rules.block.list.exec(r);
    if (e) {
      let n = e[1].trim(), i = n.length > 1, a = { type: "list", raw: "", ordered: i, start: i ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
      let l = this.rules.other.listItemRegex(n), p = !1;
      for (; r; ) {
        let h = !1, g = "", u = "";
        if (!(e = l.exec(r)) || this.rules.block.hr.test(r)) break;
        g = e[0], r = r.substring(g.length);
        let c = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (y) => " ".repeat(3 * y.length)), b = r.split(`
`, 1)[0], k = !c.trim(), w = 0;
        if (this.options.pedantic ? (w = 2, u = c.trimStart()) : k ? w = e[1].length + 1 : (w = e[2].search(this.rules.other.nonSpaceChar), w = w > 4 ? 1 : w, u = c.slice(w), w += e[1].length), k && this.rules.other.blankLine.test(b) && (g += b + `
`, r = r.substring(b.length + 1), h = !0), !h) {
          let y = this.rules.other.nextBulletRegex(w), A = this.rules.other.hrRegex(w), ee = this.rules.other.fencesBeginRegex(w), C = this.rules.other.headingBeginRegex(w), L = this.rules.other.htmlBeginRegex(w);
          for (; r; ) {
            let _ = r.split(`
`, 1)[0], z;
            if (b = _, this.options.pedantic ? (b = b.replace(this.rules.other.listReplaceNesting, "  "), z = b) : z = b.replace(this.rules.other.tabCharGlobal, "    "), ee.test(b) || C.test(b) || L.test(b) || y.test(b) || A.test(b)) break;
            if (z.search(this.rules.other.nonSpaceChar) >= w || !b.trim()) u += `
` + z.slice(w);
            else {
              if (k || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ee.test(c) || C.test(c) || A.test(c)) break;
              u += `
` + b;
            }
            !k && !b.trim() && (k = !0), g += _ + `
`, r = r.substring(_.length + 1), c = z.slice(w);
          }
        }
        a.loose || (p ? a.loose = !0 : this.rules.other.doubleBlankLine.test(g) && (p = !0)), a.items.push({ type: "list_item", raw: g, task: !!this.options.gfm && this.rules.other.listIsTask.test(u), loose: !1, text: u, tokens: [] }), a.raw += g;
      }
      let o = a.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      a.raw = a.raw.trimEnd();
      for (let h of a.items) {
        if (this.lexer.state.top = !1, h.tokens = this.lexer.blockTokens(h.text, []), h.task) {
          if (h.text = h.text.replace(this.rules.other.listReplaceTask, ""), ((t = h.tokens[0]) == null ? void 0 : t.type) === "text" || ((s = h.tokens[0]) == null ? void 0 : s.type) === "paragraph") {
            h.tokens[0].raw = h.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), h.tokens[0].text = h.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let u = this.lexer.inlineQueue.length - 1; u >= 0; u--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)) {
              this.lexer.inlineQueue[u].src = this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let g = this.rules.other.listTaskCheckbox.exec(h.raw);
          if (g) {
            let u = { type: "checkbox", raw: g[0] + " ", checked: g[0] !== "[ ]" };
            h.checked = u.checked, a.loose ? h.tokens[0] && ["paragraph", "text"].includes(h.tokens[0].type) && "tokens" in h.tokens[0] && h.tokens[0].tokens ? (h.tokens[0].raw = u.raw + h.tokens[0].raw, h.tokens[0].text = u.raw + h.tokens[0].text, h.tokens[0].tokens.unshift(u)) : h.tokens.unshift({ type: "paragraph", raw: u.raw, text: u.raw, tokens: [u] }) : h.tokens.unshift(u);
          }
        }
        if (!a.loose) {
          let g = h.tokens.filter((c) => c.type === "space"), u = g.length > 0 && g.some((c) => this.rules.other.anyLine.test(c.raw));
          a.loose = u;
        }
      }
      if (a.loose) for (let h of a.items) {
        h.loose = !0;
        for (let g of h.tokens) g.type === "text" && (g.type = "paragraph");
      }
      return a;
    }
  }
  html(r) {
    let e = this.rules.block.html.exec(r);
    if (e) return { type: "html", block: !0, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(r) {
    let e = this.rules.block.def.exec(r);
    if (e) {
      let t = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: t, raw: e[0], href: s, title: n };
    }
  }
  table(r) {
    var a;
    let e = this.rules.block.table.exec(r);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = Se(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = (a = e[3]) != null && a.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (t.length === s.length) {
      for (let l of s) this.rules.other.tableAlignRight.test(l) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? i.align.push("left") : i.align.push(null);
      for (let l = 0; l < t.length; l++) i.header.push({ text: t[l], tokens: this.lexer.inline(t[l]), header: !0, align: i.align[l] });
      for (let l of n) i.rows.push(Se(l, i.header.length).map((p, o) => ({ text: p, tokens: this.lexer.inline(p), header: !1, align: i.align[o] })));
      return i;
    }
  }
  lheading(r) {
    let e = this.rules.block.lheading.exec(r);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(r) {
    let e = this.rules.block.paragraph.exec(r);
    if (e) {
      let t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: t, tokens: this.lexer.inline(t) };
    }
  }
  text(r) {
    let e = this.rules.block.text.exec(r);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(r) {
    let e = this.rules.inline.escape.exec(r);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(r) {
    let e = this.rules.inline.tag.exec(r);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(r) {
    let e = this.rules.inline.link.exec(r);
    if (e) {
      let t = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(t)) {
        if (!this.rules.other.endAngleBracket.test(t)) return;
        let i = M(t.slice(0, -1), "\\");
        if ((t.length - i.length) % 2 === 0) return;
      } else {
        let i = Ct(e[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let a = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, a).trim(), e[3] = "";
        }
      }
      let s = e[2], n = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(s);
        i && (s = i[1], n = i[3]);
      } else n = e[3] ? e[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? s = s.slice(1) : s = s.slice(1, -1)), Ae(e, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: n && n.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(r, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(r)) || (t = this.rules.inline.nolink.exec(r))) {
      let s = (t[2] || t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = e[s.toLowerCase()];
      if (!n) {
        let i = t[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return Ae(t, n, t[0], this.lexer, this.rules);
    }
  }
  emStrong(r, e, t = "") {
    let s = this.rules.inline.emStrongLDelim.exec(r);
    if (!(!s || s[3] && t.match(this.rules.other.unicodeAlphaNumeric)) && (!(s[1] || s[2]) || !t || this.rules.inline.punctuation.exec(t))) {
      let n = [...s[0]].length - 1, i, a, l = n, p = 0, o = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (o.lastIndex = 0, e = e.slice(-1 * r.length + n); (s = o.exec(e)) != null; ) {
        if (i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !i) continue;
        if (a = [...i].length, s[3] || s[4]) {
          l += a;
          continue;
        } else if ((s[5] || s[6]) && n % 3 && !((n + a) % 3)) {
          p += a;
          continue;
        }
        if (l -= a, l > 0) continue;
        a = Math.min(a, a + l + p);
        let h = [...s[0]][0].length, g = r.slice(0, n + s.index + h + a);
        if (Math.min(n, a) % 2) {
          let c = g.slice(1, -1);
          return { type: "em", raw: g, text: c, tokens: this.lexer.inlineTokens(c) };
        }
        let u = g.slice(2, -2);
        return { type: "strong", raw: g, text: u, tokens: this.lexer.inlineTokens(u) };
      }
    }
  }
  codespan(r) {
    let e = this.rules.inline.code.exec(r);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(t), n = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return s && n && (t = t.substring(1, t.length - 1)), { type: "codespan", raw: e[0], text: t };
    }
  }
  br(r) {
    let e = this.rules.inline.br.exec(r);
    if (e) return { type: "br", raw: e[0] };
  }
  del(r) {
    let e = this.rules.inline.del.exec(r);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(r) {
    let e = this.rules.inline.autolink.exec(r);
    if (e) {
      let t, s;
      return e[2] === "@" ? (t = e[1], s = "mailto:" + t) : (t = e[1], s = t), { type: "link", raw: e[0], text: t, href: s, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  url(r) {
    var t;
    let e;
    if (e = this.rules.inline.url.exec(r)) {
      let s, n;
      if (e[2] === "@") s = e[0], n = "mailto:" + s;
      else {
        let i;
        do
          i = e[0], e[0] = ((t = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : t[0]) ?? "";
        while (i !== e[0]);
        s = e[0], e[1] === "www." ? n = "http://" + e[0] : n = e[0];
      }
      return { type: "link", raw: e[0], text: s, href: n, tokens: [{ type: "text", raw: s, text: s }] };
    }
  }
  inlineText(r) {
    let e = this.rules.inline.text.exec(r);
    if (e) {
      let t = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: t };
    }
  }
}, R = class se {
  constructor(e) {
    m(this, "tokens");
    m(this, "options");
    m(this, "state");
    m(this, "inlineQueue");
    m(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || q, this.options.tokenizer = this.options.tokenizer || new H(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let t = { other: T, block: j.normal, inline: D.normal };
    this.options.pedantic ? (t.block = j.pedantic, t.inline = D.pedantic) : this.options.gfm && (t.block = j.gfm, this.options.breaks ? t.inline = D.breaks : t.inline = D.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: j, inline: D };
  }
  static lex(e, t) {
    return new se(t).lex(e);
  }
  static lexInline(e, t) {
    return new se(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(T.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let s = this.inlineQueue[t];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], s = !1) {
    var n, i, a;
    for (this.options.pedantic && (e = e.replace(T.tabCharGlobal, "    ").replace(T.spaceLine, "")); e; ) {
      let l;
      if ((i = (n = this.options.extensions) == null ? void 0 : n.block) != null && i.some((o) => (l = o.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        let o = t.at(-1);
        l.raw.length === 1 && o !== void 0 ? o.raw += `
` : t.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        let o = t.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + l.raw, o.text += `
` + l.text, this.inlineQueue.at(-1).src = o.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.list(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.html(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.def(e)) {
        e = e.substring(l.raw.length);
        let o = t.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + l.raw, o.text += `
` + l.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = { href: l.href, title: l.title }, t.push(l));
        continue;
      }
      if (l = this.tokenizer.table(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let p = e;
      if ((a = this.options.extensions) != null && a.startBlock) {
        let o = 1 / 0, h = e.slice(1), g;
        this.options.extensions.startBlock.forEach((u) => {
          g = u.call({ lexer: this }, h), typeof g == "number" && g >= 0 && (o = Math.min(o, g));
        }), o < 1 / 0 && o >= 0 && (p = e.substring(0, o + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(p))) {
        let o = t.at(-1);
        s && (o == null ? void 0 : o.type) === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + l.raw, o.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(l), s = p.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        let o = t.at(-1);
        (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + l.raw, o.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : t.push(l);
        continue;
      }
      if (e) {
        let o = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(o);
          break;
        } else throw new Error(o);
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    var p, o, h, g, u;
    let s = e, n = null;
    if (this.tokens.links) {
      let c = Object.keys(this.tokens.links);
      if (c.length > 0) for (; (n = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; ) c.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (n = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; ) s = s.slice(0, n.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (n = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; ) i = n[2] ? n[2].length : 0, s = s.slice(0, n.index + i) + "[" + "a".repeat(n[0].length - i - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    s = ((o = (p = this.options.hooks) == null ? void 0 : p.emStrongMask) == null ? void 0 : o.call({ lexer: this }, s)) ?? s;
    let a = !1, l = "";
    for (; e; ) {
      a || (l = ""), a = !1;
      let c;
      if ((g = (h = this.options.extensions) == null ? void 0 : h.inline) != null && g.some((k) => (c = k.call({ lexer: this }, e, t)) ? (e = e.substring(c.raw.length), t.push(c), !0) : !1)) continue;
      if (c = this.tokenizer.escape(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.tag(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.link(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(c.raw.length);
        let k = t.at(-1);
        c.type === "text" && (k == null ? void 0 : k.type) === "text" ? (k.raw += c.raw, k.text += c.text) : t.push(c);
        continue;
      }
      if (c = this.tokenizer.emStrong(e, s, l)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.codespan(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.br(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.del(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.autolink(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (!this.state.inLink && (c = this.tokenizer.url(e))) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      let b = e;
      if ((u = this.options.extensions) != null && u.startInline) {
        let k = 1 / 0, w = e.slice(1), y;
        this.options.extensions.startInline.forEach((A) => {
          y = A.call({ lexer: this }, w), typeof y == "number" && y >= 0 && (k = Math.min(k, y));
        }), k < 1 / 0 && k >= 0 && (b = e.substring(0, k + 1));
      }
      if (c = this.tokenizer.inlineText(b)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (l = c.raw.slice(-1)), a = !0;
        let k = t.at(-1);
        (k == null ? void 0 : k.type) === "text" ? (k.raw += c.raw, k.text += c.text) : t.push(c);
        continue;
      }
      if (e) {
        let k = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(k);
          break;
        } else throw new Error(k);
      }
    }
    return t;
  }
}, F = class {
  constructor(r) {
    m(this, "options");
    m(this, "parser");
    this.options = r || q;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: e, escaped: t }) {
    var i;
    let s = (i = (e || "").match(T.notSpaceStart)) == null ? void 0 : i[0], n = r.replace(T.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + I(s) + '">' + (t ? n : I(n, !0)) + `</code></pre>
` : "<pre><code>" + (t ? n : I(n, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: r }) {
    return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
  }
  html({ text: r }) {
    return r;
  }
  def(r) {
    return "";
  }
  heading({ tokens: r, depth: e }) {
    return `<h${e}>${this.parser.parseInline(r)}</h${e}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    let e = r.ordered, t = r.start, s = "";
    for (let a = 0; a < r.items.length; a++) {
      let l = r.items[a];
      s += this.listitem(l);
    }
    let n = e ? "ol" : "ul", i = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + n + i + `>
` + s + "</" + n + `>
`;
  }
  listitem(r) {
    return `<li>${this.parser.parse(r.tokens)}</li>
`;
  }
  checkbox({ checked: r }) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: r }) {
    return `<p>${this.parser.parseInline(r)}</p>
`;
  }
  table(r) {
    let e = "", t = "";
    for (let n = 0; n < r.header.length; n++) t += this.tablecell(r.header[n]);
    e += this.tablerow({ text: t });
    let s = "";
    for (let n = 0; n < r.rows.length; n++) {
      let i = r.rows[n];
      t = "";
      for (let a = 0; a < i.length; a++) t += this.tablecell(i[a]);
      s += this.tablerow({ text: t });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    let e = this.parser.parseInline(r.tokens), t = r.header ? "th" : "td";
    return (r.align ? `<${t} align="${r.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${I(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: e, tokens: t }) {
    let s = this.parser.parseInline(t), n = Re(r);
    if (n === null) return s;
    r = n;
    let i = '<a href="' + r + '"';
    return e && (i += ' title="' + I(e) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: r, title: e, text: t, tokens: s }) {
    s && (t = this.parser.parseInline(s, this.parser.textRenderer));
    let n = Re(r);
    if (n === null) return I(t);
    r = n;
    let i = `<img src="${r}" alt="${t}"`;
    return e && (i += ` title="${I(e)}"`), i += ">", i;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : I(r.text);
  }
}, ke = class {
  strong({ text: r }) {
    return r;
  }
  em({ text: r }) {
    return r;
  }
  codespan({ text: r }) {
    return r;
  }
  del({ text: r }) {
    return r;
  }
  html({ text: r }) {
    return r;
  }
  text({ text: r }) {
    return r;
  }
  link({ text: r }) {
    return "" + r;
  }
  image({ text: r }) {
    return "" + r;
  }
  br() {
    return "";
  }
  checkbox({ raw: r }) {
    return r;
  }
}, S = class le {
  constructor(e) {
    m(this, "options");
    m(this, "renderer");
    m(this, "textRenderer");
    this.options = e || q, this.options.renderer = this.options.renderer || new F(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ke();
  }
  static parse(e, t) {
    return new le(t).parse(e);
  }
  static parseInline(e, t) {
    return new le(t).parseInline(e);
  }
  parse(e) {
    var s, n;
    let t = "";
    for (let i = 0; i < e.length; i++) {
      let a = e[i];
      if ((n = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && n[a.type]) {
        let p = a, o = this.options.extensions.renderers[p.type].call({ parser: this }, p);
        if (o !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(p.type)) {
          t += o || "";
          continue;
        }
      }
      let l = a;
      switch (l.type) {
        case "space": {
          t += this.renderer.space(l);
          break;
        }
        case "hr": {
          t += this.renderer.hr(l);
          break;
        }
        case "heading": {
          t += this.renderer.heading(l);
          break;
        }
        case "code": {
          t += this.renderer.code(l);
          break;
        }
        case "table": {
          t += this.renderer.table(l);
          break;
        }
        case "blockquote": {
          t += this.renderer.blockquote(l);
          break;
        }
        case "list": {
          t += this.renderer.list(l);
          break;
        }
        case "checkbox": {
          t += this.renderer.checkbox(l);
          break;
        }
        case "html": {
          t += this.renderer.html(l);
          break;
        }
        case "def": {
          t += this.renderer.def(l);
          break;
        }
        case "paragraph": {
          t += this.renderer.paragraph(l);
          break;
        }
        case "text": {
          t += this.renderer.text(l);
          break;
        }
        default: {
          let p = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return t;
  }
  parseInline(e, t = this.renderer) {
    var n, i;
    let s = "";
    for (let a = 0; a < e.length; a++) {
      let l = e[a];
      if ((i = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && i[l.type]) {
        let o = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(l.type)) {
          s += o || "";
          continue;
        }
      }
      let p = l;
      switch (p.type) {
        case "escape": {
          s += t.text(p);
          break;
        }
        case "html": {
          s += t.html(p);
          break;
        }
        case "link": {
          s += t.link(p);
          break;
        }
        case "image": {
          s += t.image(p);
          break;
        }
        case "checkbox": {
          s += t.checkbox(p);
          break;
        }
        case "strong": {
          s += t.strong(p);
          break;
        }
        case "em": {
          s += t.em(p);
          break;
        }
        case "codespan": {
          s += t.codespan(p);
          break;
        }
        case "br": {
          s += t.br(p);
          break;
        }
        case "del": {
          s += t.del(p);
          break;
        }
        case "text": {
          s += t.text(p);
          break;
        }
        default: {
          let o = 'Token with "' + p.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return s;
  }
}, G, U = (G = class {
  constructor(r) {
    m(this, "options");
    m(this, "block");
    this.options = r || q;
  }
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
  emStrongMask(r) {
    return r;
  }
  provideLexer() {
    return this.block ? R.lex : R.lexInline;
  }
  provideParser() {
    return this.block ? S.parse : S.parseInline;
  }
}, m(G, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), m(G, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), G), qt = class {
  constructor(...r) {
    m(this, "defaults", ie());
    m(this, "options", this.setOptions);
    m(this, "parse", this.parseMarkdown(!0));
    m(this, "parseInline", this.parseMarkdown(!1));
    m(this, "Parser", S);
    m(this, "Renderer", F);
    m(this, "TextRenderer", ke);
    m(this, "Lexer", R);
    m(this, "Tokenizer", H);
    m(this, "Hooks", U);
    this.use(...r);
  }
  walkTokens(r, e) {
    var s, n;
    let t = [];
    for (let i of r) switch (t = t.concat(e.call(this, i)), i.type) {
      case "table": {
        let a = i;
        for (let l of a.header) t = t.concat(this.walkTokens(l.tokens, e));
        for (let l of a.rows) for (let p of l) t = t.concat(this.walkTokens(p.tokens, e));
        break;
      }
      case "list": {
        let a = i;
        t = t.concat(this.walkTokens(a.items, e));
        break;
      }
      default: {
        let a = i;
        (n = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && n[a.type] ? this.defaults.extensions.childTokens[a.type].forEach((l) => {
          let p = a[l].flat(1 / 0);
          t = t.concat(this.walkTokens(p, e));
        }) : a.tokens && (t = t.concat(this.walkTokens(a.tokens, e)));
      }
    }
    return t;
  }
  use(...r) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((t) => {
      let s = { ...t };
      if (s.async = this.defaults.async || s.async || !1, t.extensions && (t.extensions.forEach((n) => {
        if (!n.name) throw new Error("extension name required");
        if ("renderer" in n) {
          let i = e.renderers[n.name];
          i ? e.renderers[n.name] = function(...a) {
            let l = n.renderer.apply(this, a);
            return l === !1 && (l = i.apply(this, a)), l;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let i = e[n.level];
          i ? i.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), s.extensions = e), t.renderer) {
        let n = this.defaults.renderer || new F(this.defaults);
        for (let i in t.renderer) {
          if (!(i in n)) throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i)) continue;
          let a = i, l = t.renderer[a], p = n[a];
          n[a] = (...o) => {
            let h = l.apply(n, o);
            return h === !1 && (h = p.apply(n, o)), h || "";
          };
        }
        s.renderer = n;
      }
      if (t.tokenizer) {
        let n = this.defaults.tokenizer || new H(this.defaults);
        for (let i in t.tokenizer) {
          if (!(i in n)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          let a = i, l = t.tokenizer[a], p = n[a];
          n[a] = (...o) => {
            let h = l.apply(n, o);
            return h === !1 && (h = p.apply(n, o)), h;
          };
        }
        s.tokenizer = n;
      }
      if (t.hooks) {
        let n = this.defaults.hooks || new U();
        for (let i in t.hooks) {
          if (!(i in n)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          let a = i, l = t.hooks[a], p = n[a];
          U.passThroughHooks.has(i) ? n[a] = (o) => {
            if (this.defaults.async && U.passThroughHooksRespectAsync.has(i)) return (async () => {
              let g = await l.call(n, o);
              return p.call(n, g);
            })();
            let h = l.call(n, o);
            return p.call(n, h);
          } : n[a] = (...o) => {
            if (this.defaults.async) return (async () => {
              let g = await l.apply(n, o);
              return g === !1 && (g = await p.apply(n, o)), g;
            })();
            let h = l.apply(n, o);
            return h === !1 && (h = p.apply(n, o)), h;
          };
        }
        s.hooks = n;
      }
      if (t.walkTokens) {
        let n = this.defaults.walkTokens, i = t.walkTokens;
        s.walkTokens = function(a) {
          let l = [];
          return l.push(i.call(this, a)), n && (l = l.concat(n.call(this, a))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, e) {
    return R.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return S.parse(r, e ?? this.defaults);
  }
  parseMarkdown(r) {
    return (e, t) => {
      let s = { ...t }, n = { ...this.defaults, ...s }, i = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && s.async === !1) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (n.hooks && (n.hooks.options = n, n.hooks.block = r), n.async) return (async () => {
        let a = n.hooks ? await n.hooks.preprocess(e) : e, l = await (n.hooks ? await n.hooks.provideLexer() : r ? R.lex : R.lexInline)(a, n), p = n.hooks ? await n.hooks.processAllTokens(l) : l;
        n.walkTokens && await Promise.all(this.walkTokens(p, n.walkTokens));
        let o = await (n.hooks ? await n.hooks.provideParser() : r ? S.parse : S.parseInline)(p, n);
        return n.hooks ? await n.hooks.postprocess(o) : o;
      })().catch(i);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let a = (n.hooks ? n.hooks.provideLexer() : r ? R.lex : R.lexInline)(e, n);
        n.hooks && (a = n.hooks.processAllTokens(a)), n.walkTokens && this.walkTokens(a, n.walkTokens);
        let l = (n.hooks ? n.hooks.provideParser() : r ? S.parse : S.parseInline)(a, n);
        return n.hooks && (l = n.hooks.postprocess(l)), l;
      } catch (a) {
        return i(a);
      }
    };
  }
  onError(r, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let s = "<p>An error occurred:</p><pre>" + I(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, P = new qt();
function x(r, e) {
  return P.parse(r, e);
}
x.options = x.setOptions = function(r) {
  return P.setOptions(r), x.defaults = P.defaults, ve(x.defaults), x;
};
x.getDefaults = ie;
x.defaults = q;
x.use = function(...r) {
  return P.use(...r), x.defaults = P.defaults, ve(x.defaults), x;
};
x.walkTokens = function(r, e) {
  return P.walkTokens(r, e);
};
x.parseInline = P.parseInline;
x.Parser = S;
x.parser = S.parse;
x.Renderer = F;
x.TextRenderer = ke;
x.Lexer = R;
x.lexer = R.lex;
x.Tokenizer = H;
x.Hooks = U;
x.parse = x;
x.options;
x.setOptions;
x.use;
x.walkTokens;
x.parseInline;
S.parse;
R.lex;
function Bt(r) {
  if (!r) return "";
  try {
    const e = x.parse(r, {
      gfm: !0,
      breaks: !1
    });
    return typeof e == "string" ? e : (console.warn("marked returned Promise, using fallback"), `<p>${r}</p>`);
  } catch (e) {
    return console.error("Markdown conversion failed:", e), `<p>${r.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  }
}
function Lt(r) {
  return {
    blocks: {
      contentData: [],
      settingsData: [],
      expose: [],
      Layout: {}
    },
    markup: r
  };
}
var X, J, V, W, Ue;
class Gt extends je {
  constructor(t, s) {
    super(t, s);
    E(this, W);
    E(this, X, new He(this));
    E(this, J, new Fe(this));
    E(this, V, new Xe(this));
  }
  async execute() {
    var n;
    const t = await this.getContext(Ge), s = this.args.unique ?? null;
    try {
      let i = null;
      if (s) {
        const { data: f } = await Z(this, V).requestItems([s]);
        f != null && f.length && (i = f[0].documentType.unique);
      }
      const l = (await Z(this, X).requestAllowedChildrenOf(
        i,
        s
      )).data;
      if (!((n = l == null ? void 0 : l.items) != null && n.length)) {
        t.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const p = [];
      for (const f of l.items) {
        const { data: $ } = await Z(this, J).requestItemsByDocumentType(f.unique);
        $ != null && $.length && p.push({
          documentTypeUnique: f.unique,
          documentTypeName: f.name,
          documentTypeIcon: f.icon ?? null,
          blueprints: $.map((v) => ({
            blueprintUnique: v.unique,
            blueprintName: v.name
          }))
        });
      }
      let o;
      try {
        o = await we(this, Ve, {
          data: { documentTypes: p }
        });
      } catch {
        return;
      }
      const { blueprintUnique: h, documentTypeUnique: g } = o, u = p.find((f) => f.documentTypeUnique === g), c = u == null ? void 0 : u.blueprints.find((f) => f.blueprintUnique === h);
      console.log("Selected blueprint:", h, "Document type:", g);
      let b;
      try {
        b = await we(this, Je, {
          data: {
            unique: s,
            blueprintName: (c == null ? void 0 : c.blueprintName) ?? "",
            blueprintId: h
          }
        });
      } catch {
        return;
      }
      const { name: k, mediaUnique: w, extractedSections: y, propertyMappings: A } = b;
      if (!w || !k)
        return;
      console.log("Creating document with:", { name: k, sections: Object.keys(y) });
      const C = await (await this.getContext(Qe)).getLatestToken(), L = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${h}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${C}`
          }
        }
      );
      if (!L.ok) {
        const f = await L.json();
        console.error("Scaffold failed:", f), t.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${f.title || "Unknown error"}` }
        });
        return;
      }
      const _ = await L.json();
      console.log("Scaffold response:", _);
      const z = _.values ? [..._.values] : [], fe = (f, $) => {
        const v = z.find((Ne) => Ne.alias === f);
        v ? v.value = $ : z.push({ alias: f, value: $ });
      };
      for (const f of A) {
        const $ = y[f.from.sectionType];
        if ($) {
          if (f.to.blockGrid)
            me(this, W, Ue).call(this, z, f, $);
          else if (f.to.property && (fe(f.to.property, $), f.to.alsoMapTo))
            for (const v of f.to.alsoMapTo)
              fe(v, $);
        }
      }
      const de = {
        parent: s ? { id: s } : null,
        documentType: { id: g },
        template: _.template ? { id: _.template.id } : null,
        values: z,
        variants: [
          {
            name: k,
            culture: null,
            segment: null
          }
        ]
      };
      console.log("Create request:", JSON.stringify(de, null, 2));
      const te = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${C}`
        },
        body: JSON.stringify(de)
      });
      if (!te.ok) {
        const f = await te.json();
        console.error("Document creation failed:", f), t.peek("danger", {
          data: { message: `Failed to create document: ${f.title || f.detail || "Unknown error"}` }
        });
        return;
      }
      const re = te.headers.get("Location"), B = re == null ? void 0 : re.split("/").pop();
      if (console.log("Document created successfully! ID:", B), B) {
        const f = await fetch(`/umbraco/management/api/v1/document/${B}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${C}`
          }
        });
        if (f.ok) {
          const $ = await f.json();
          console.log("Fetched document for save:", $);
          const v = await fetch(`/umbraco/management/api/v1/document/${B}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${C}`
            },
            body: JSON.stringify($)
          });
          v.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await v.text());
        } else
          console.warn("Could not fetch document for save:", await f.text());
      }
      if (t.peek("positive", {
        data: { message: `Document "${k}" created successfully!` }
      }), B) {
        const f = `/umbraco/section/content/workspace/document/edit/${B}`;
        setTimeout(() => {
          window.location.href = f;
        }, 150);
      }
    } catch (i) {
      console.error("Error creating document:", i), t.peek("danger", {
        data: { message: "An unexpected error occurred while creating the document." }
      });
    }
  }
}
X = new WeakMap(), J = new WeakMap(), V = new WeakMap(), W = new WeakSet(), /**
 * Applies a block grid mapping from a map file property mapping definition.
 * Finds a block within the grid by searching for a property value match,
 * then writes the extracted content to the target property within that block.
 */
Ue = function(t, s, n) {
  var o, h;
  const i = s.to.blockGrid, a = s.to.blockSearch, l = s.to.targetProperty;
  if (!i || !a || !l) return;
  const p = t.find((g) => g.alias === i);
  if (!p || !p.value) {
    console.log(`No ${i} found in scaffold values`);
    return;
  }
  try {
    const g = typeof p.value == "string", u = g ? JSON.parse(p.value) : p.value, c = u.contentData;
    if (!c) {
      console.log(`No contentData in ${i}`);
      return;
    }
    let b = !1;
    for (const k of c) {
      const w = (o = k.values) == null ? void 0 : o.find((y) => y.alias === a.property);
      if (w && typeof w.value == "string" && w.value.toLowerCase().includes(a.value.toLowerCase())) {
        console.log(`Found matching block for "${a.value}":`, k.key), b = !0;
        const y = (h = k.values) == null ? void 0 : h.find((A) => A.alias === l);
        if (y) {
          if (s.to.convertMarkdown) {
            const A = Bt(n);
            y.value = Lt(A);
          } else
            y.value = n;
          console.log(`Updated ${l} in block`);
        }
        break;
      }
    }
    b || console.log(`WARNING: Did not find a block matching ${a.property} = "${a.value}"`), p.value = g ? JSON.stringify(u) : u;
  } catch (g) {
    console.error(`Failed to apply block mapping to ${i}:`, g);
  }
};
export {
  Gt as UpDocEntityAction,
  Gt as default
};
//# sourceMappingURL=up-doc-action-DFrVN3iJ.js.map
