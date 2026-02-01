var je = Object.defineProperty;
var we = (n) => {
  throw TypeError(n);
};
var Qe = (n, e, t) => e in n ? je(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var m = (n, e, t) => Qe(n, typeof e != "symbol" ? e + "" : e, t), ye = (n, e, t) => e.has(n) || we("Cannot " + t);
var Q = (n, e, t) => (ye(n, e, "read from private field"), t ? t.call(n) : e.get(n)), U = (n, e, t) => e.has(n) ? we("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t);
var le = (n, e, t) => (ye(n, e, "access private method"), t);
import { UmbModalToken as Ce, umbOpenModal as Te } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as He } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as Fe } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as Xe } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as We } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as Je } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as Ke } from "@umbraco-cms/backoffice/document";
const Ve = new Ce(
  "UpDoc.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
), Ye = new Ce(
  "UpDoc.BlueprintPickerModal",
  {
    modal: {
      type: "dialog",
      size: "small"
    }
  }
);
function ce() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var q = ce();
function _e(n) {
  q = n;
}
var Z = { exec: () => null };
function f(n, e = "") {
  let t = typeof n == "string" ? n : n.source, s = { replace: (r, i) => {
    let o = typeof i == "string" ? i : i.source;
    return o = o.replace(y.caret, "$1"), t = t.replace(r, o), s;
  }, getRegex: () => new RegExp(t, e) };
  return s;
}
var et = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), y = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (n) => new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}#`), htmlBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}<(?:[a-z].*>|!--)`, "i") }, tt = /^(?:[ \t]*(?:\n|$))+/, nt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, rt = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, G = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, st = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, pe = /(?:[*+-]|\d{1,9}[.)])/, Ie = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Pe = f(Ie).replace(/bull/g, pe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), lt = f(Ie).replace(/bull/g, pe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), he = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, it = /^[^\n]+/, ue = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, at = f(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ue).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ot = f(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, pe).getRegex(), ee = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ge = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ct = f("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ge).replace("tag", ee).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), qe = f(he).replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex(), pt = f(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", qe).getRegex(), ke = { blockquote: pt, code: nt, def: at, fences: rt, heading: st, hr: G, html: ct, lheading: Pe, list: ot, newline: tt, paragraph: qe, table: Z, text: it }, $e = f("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex(), ht = { ...ke, lheading: lt, table: $e, paragraph: f(he).replace("hr", G).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", $e).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex() }, ut = { ...ke, html: f(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ge).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Z, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: f(he).replace("hr", G).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Pe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, gt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, kt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Be = /^( {2,}|\\)\n(?!\s*$)/, dt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, te = /[\p{P}\p{S}]/u, de = /[\s\p{P}\p{S}]/u, Le = /[^\s\p{P}\p{S}]/u, ft = f(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, de).getRegex(), De = /(?!~)[\p{P}\p{S}]/u, xt = /(?!~)[\s\p{P}\p{S}]/u, bt = /(?:[^\s\p{P}\p{S}]|~)/u, mt = f(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", et ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Ee = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, wt = f(Ee, "u").replace(/punct/g, te).getRegex(), yt = f(Ee, "u").replace(/punct/g, De).getRegex(), Ue = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Tt = f(Ue, "gu").replace(/notPunctSpace/g, Le).replace(/punctSpace/g, de).replace(/punct/g, te).getRegex(), $t = f(Ue, "gu").replace(/notPunctSpace/g, bt).replace(/punctSpace/g, xt).replace(/punct/g, De).getRegex(), Rt = f("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Le).replace(/punctSpace/g, de).replace(/punct/g, te).getRegex(), St = f(/\\(punct)/, "gu").replace(/punct/g, te).getRegex(), zt = f(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), At = f(ge).replace("(?:-->|$)", "-->").getRegex(), vt = f("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", At).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), X = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, Ct = f(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", X).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ne = f(/^!?\[(label)\]\[(ref)\]/).replace("label", X).replace("ref", ue).getRegex(), Oe = f(/^!?\[(ref)\](?:\[\])?/).replace("ref", ue).getRegex(), _t = f("reflink|nolink(?!\\()", "g").replace("reflink", Ne).replace("nolink", Oe).getRegex(), Re = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, fe = { _backpedal: Z, anyPunctuation: St, autolink: zt, blockSkip: mt, br: Be, code: kt, del: Z, emStrongLDelim: wt, emStrongRDelimAst: Tt, emStrongRDelimUnd: Rt, escape: gt, link: Ct, nolink: Oe, punctuation: ft, reflink: Ne, reflinkSearch: _t, tag: vt, text: dt, url: Z }, It = { ...fe, link: f(/^!?\[(label)\]\((.*?)\)/).replace("label", X).getRegex(), reflink: f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", X).getRegex() }, ie = { ...fe, emStrongRDelimAst: $t, emStrongLDelim: yt, url: f(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Re).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: f(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Re).getRegex() }, Pt = { ...ie, br: f(Be).replace("{2,}", "*").getRegex(), text: f(ie.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, H = { normal: ke, gfm: ht, pedantic: ut }, N = { normal: fe, gfm: ie, breaks: Pt, pedantic: It }, qt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Se = (n) => qt[n];
function A(n, e) {
  if (e) {
    if (y.escapeTest.test(n)) return n.replace(y.escapeReplace, Se);
  } else if (y.escapeTestNoEncode.test(n)) return n.replace(y.escapeReplaceNoEncode, Se);
  return n;
}
function ze(n) {
  try {
    n = encodeURI(n).replace(y.percentDecode, "%");
  } catch {
    return null;
  }
  return n;
}
function Ae(n, e) {
  var i;
  let t = n.replace(y.findPipe, (o, l, p) => {
    let a = !1, h = l;
    for (; --h >= 0 && p[h] === "\\"; ) a = !a;
    return a ? "|" : " |";
  }), s = t.split(y.splitPipe), r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), e) if (s.length > e) s.splice(e);
  else for (; s.length < e; ) s.push("");
  for (; r < s.length; r++) s[r] = s[r].trim().replace(y.slashPipe, "|");
  return s;
}
function O(n, e, t) {
  let s = n.length;
  if (s === 0) return "";
  let r = 0;
  for (; r < s && n.charAt(s - r - 1) === e; )
    r++;
  return n.slice(0, s - r);
}
function Bt(n, e) {
  if (n.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let s = 0; s < n.length; s++) if (n[s] === "\\") s++;
  else if (n[s] === e[0]) t++;
  else if (n[s] === e[1] && (t--, t < 0)) return s;
  return t > 0 ? -2 : -1;
}
function ve(n, e, t, s, r) {
  let i = e.href, o = e.title || null, l = n[1].replace(r.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  let p = { type: n[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: o, text: l, tokens: s.inlineTokens(l) };
  return s.state.inLink = !1, p;
}
function Lt(n, e, t) {
  let s = n.match(t.other.indentCodeCompensation);
  if (s === null) return e;
  let r = s[1];
  return e.split(`
`).map((i) => {
    let o = i.match(t.other.beginningSpace);
    if (o === null) return i;
    let [l] = o;
    return l.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var W = class {
  constructor(n) {
    m(this, "options");
    m(this, "rules");
    m(this, "lexer");
    this.options = n || q;
  }
  space(n) {
    let e = this.rules.block.newline.exec(n);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(n) {
    let e = this.rules.block.code.exec(n);
    if (e) {
      let t = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : O(t, `
`) };
    }
  }
  fences(n) {
    let e = this.rules.block.fences.exec(n);
    if (e) {
      let t = e[0], s = Lt(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: s };
    }
  }
  heading(n) {
    let e = this.rules.block.heading.exec(n);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        let s = O(t, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (t = s.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(n) {
    let e = this.rules.block.hr.exec(n);
    if (e) return { type: "hr", raw: O(e[0], `
`) };
  }
  blockquote(n) {
    let e = this.rules.block.blockquote.exec(n);
    if (e) {
      let t = O(e[0], `
`).split(`
`), s = "", r = "", i = [];
      for (; t.length > 0; ) {
        let o = !1, l = [], p;
        for (p = 0; p < t.length; p++) if (this.rules.other.blockquoteStart.test(t[p])) l.push(t[p]), o = !0;
        else if (!o) l.push(t[p]);
        else break;
        t = t.slice(p);
        let a = l.join(`
`), h = a.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${a}` : a, r = r ? `${r}
${h}` : h;
        let k = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(h, i, !0), this.lexer.state.top = k, t.length === 0) break;
        let u = i.at(-1);
        if ((u == null ? void 0 : u.type) === "code") break;
        if ((u == null ? void 0 : u.type) === "blockquote") {
          let c = u, d = c.raw + `
` + t.join(`
`), g = this.blockquote(d);
          i[i.length - 1] = g, s = s.substring(0, s.length - c.raw.length) + g.raw, r = r.substring(0, r.length - c.text.length) + g.text;
          break;
        } else if ((u == null ? void 0 : u.type) === "list") {
          let c = u, d = c.raw + `
` + t.join(`
`), g = this.list(d);
          i[i.length - 1] = g, s = s.substring(0, s.length - u.raw.length) + g.raw, r = r.substring(0, r.length - c.raw.length) + g.raw, t = d.substring(i.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: s, tokens: i, text: r };
    }
  }
  list(n) {
    var t, s;
    let e = this.rules.block.list.exec(n);
    if (e) {
      let r = e[1].trim(), i = r.length > 1, o = { type: "list", raw: "", ordered: i, start: i ? +r.slice(0, -1) : "", loose: !1, items: [] };
      r = i ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = i ? r : "[*+-]");
      let l = this.rules.other.listItemRegex(r), p = !1;
      for (; n; ) {
        let h = !1, k = "", u = "";
        if (!(e = l.exec(n)) || this.rules.block.hr.test(n)) break;
        k = e[0], n = n.substring(k.length);
        let c = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (T) => " ".repeat(3 * T.length)), d = n.split(`
`, 1)[0], g = !c.trim(), w = 0;
        if (this.options.pedantic ? (w = 2, u = c.trimStart()) : g ? w = e[1].length + 1 : (w = e[2].search(this.rules.other.nonSpaceChar), w = w > 4 ? 1 : w, u = c.slice(w), w += e[1].length), g && this.rules.other.blankLine.test(d) && (k += d + `
`, n = n.substring(d.length + 1), h = !0), !h) {
          let T = this.rules.other.nextBulletRegex(w), I = this.rules.other.hrRegex(w), D = this.rules.other.fencesBeginRegex(w), v = this.rules.other.headingBeginRegex(w), be = this.rules.other.htmlBeginRegex(w);
          for (; n; ) {
            let C = n.split(`
`, 1)[0], z;
            if (d = C, this.options.pedantic ? (d = d.replace(this.rules.other.listReplaceNesting, "  "), z = d) : z = d.replace(this.rules.other.tabCharGlobal, "    "), D.test(d) || v.test(d) || be.test(d) || T.test(d) || I.test(d)) break;
            if (z.search(this.rules.other.nonSpaceChar) >= w || !d.trim()) u += `
` + z.slice(w);
            else {
              if (g || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || D.test(c) || v.test(c) || I.test(c)) break;
              u += `
` + d;
            }
            !g && !d.trim() && (g = !0), k += C + `
`, n = n.substring(C.length + 1), c = z.slice(w);
          }
        }
        o.loose || (p ? o.loose = !0 : this.rules.other.doubleBlankLine.test(k) && (p = !0)), o.items.push({ type: "list_item", raw: k, task: !!this.options.gfm && this.rules.other.listIsTask.test(u), loose: !1, text: u, tokens: [] }), o.raw += k;
      }
      let a = o.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      o.raw = o.raw.trimEnd();
      for (let h of o.items) {
        if (this.lexer.state.top = !1, h.tokens = this.lexer.blockTokens(h.text, []), h.task) {
          if (h.text = h.text.replace(this.rules.other.listReplaceTask, ""), ((t = h.tokens[0]) == null ? void 0 : t.type) === "text" || ((s = h.tokens[0]) == null ? void 0 : s.type) === "paragraph") {
            h.tokens[0].raw = h.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), h.tokens[0].text = h.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let u = this.lexer.inlineQueue.length - 1; u >= 0; u--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)) {
              this.lexer.inlineQueue[u].src = this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let k = this.rules.other.listTaskCheckbox.exec(h.raw);
          if (k) {
            let u = { type: "checkbox", raw: k[0] + " ", checked: k[0] !== "[ ]" };
            h.checked = u.checked, o.loose ? h.tokens[0] && ["paragraph", "text"].includes(h.tokens[0].type) && "tokens" in h.tokens[0] && h.tokens[0].tokens ? (h.tokens[0].raw = u.raw + h.tokens[0].raw, h.tokens[0].text = u.raw + h.tokens[0].text, h.tokens[0].tokens.unshift(u)) : h.tokens.unshift({ type: "paragraph", raw: u.raw, text: u.raw, tokens: [u] }) : h.tokens.unshift(u);
          }
        }
        if (!o.loose) {
          let k = h.tokens.filter((c) => c.type === "space"), u = k.length > 0 && k.some((c) => this.rules.other.anyLine.test(c.raw));
          o.loose = u;
        }
      }
      if (o.loose) for (let h of o.items) {
        h.loose = !0;
        for (let k of h.tokens) k.type === "text" && (k.type = "paragraph");
      }
      return o;
    }
  }
  html(n) {
    let e = this.rules.block.html.exec(n);
    if (e) return { type: "html", block: !0, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(n) {
    let e = this.rules.block.def.exec(n);
    if (e) {
      let t = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: t, raw: e[0], href: s, title: r };
    }
  }
  table(n) {
    var o;
    let e = this.rules.block.table.exec(n);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = Ae(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = e[3]) != null && o.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (t.length === s.length) {
      for (let l of s) this.rules.other.tableAlignRight.test(l) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? i.align.push("left") : i.align.push(null);
      for (let l = 0; l < t.length; l++) i.header.push({ text: t[l], tokens: this.lexer.inline(t[l]), header: !0, align: i.align[l] });
      for (let l of r) i.rows.push(Ae(l, i.header.length).map((p, a) => ({ text: p, tokens: this.lexer.inline(p), header: !1, align: i.align[a] })));
      return i;
    }
  }
  lheading(n) {
    let e = this.rules.block.lheading.exec(n);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(n) {
    let e = this.rules.block.paragraph.exec(n);
    if (e) {
      let t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: t, tokens: this.lexer.inline(t) };
    }
  }
  text(n) {
    let e = this.rules.block.text.exec(n);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(n) {
    let e = this.rules.inline.escape.exec(n);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(n) {
    let e = this.rules.inline.tag.exec(n);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(n) {
    let e = this.rules.inline.link.exec(n);
    if (e) {
      let t = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(t)) {
        if (!this.rules.other.endAngleBracket.test(t)) return;
        let i = O(t.slice(0, -1), "\\");
        if ((t.length - i.length) % 2 === 0) return;
      } else {
        let i = Bt(e[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let o = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, o).trim(), e[3] = "";
        }
      }
      let s = e[2], r = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(s);
        i && (s = i[1], r = i[3]);
      } else r = e[3] ? e[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? s = s.slice(1) : s = s.slice(1, -1)), ve(e, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: r && r.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(n, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(n)) || (t = this.rules.inline.nolink.exec(n))) {
      let s = (t[2] || t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = e[s.toLowerCase()];
      if (!r) {
        let i = t[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return ve(t, r, t[0], this.lexer, this.rules);
    }
  }
  emStrong(n, e, t = "") {
    let s = this.rules.inline.emStrongLDelim.exec(n);
    if (!(!s || s[3] && t.match(this.rules.other.unicodeAlphaNumeric)) && (!(s[1] || s[2]) || !t || this.rules.inline.punctuation.exec(t))) {
      let r = [...s[0]].length - 1, i, o, l = r, p = 0, a = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (a.lastIndex = 0, e = e.slice(-1 * n.length + r); (s = a.exec(e)) != null; ) {
        if (i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !i) continue;
        if (o = [...i].length, s[3] || s[4]) {
          l += o;
          continue;
        } else if ((s[5] || s[6]) && r % 3 && !((r + o) % 3)) {
          p += o;
          continue;
        }
        if (l -= o, l > 0) continue;
        o = Math.min(o, o + l + p);
        let h = [...s[0]][0].length, k = n.slice(0, r + s.index + h + o);
        if (Math.min(r, o) % 2) {
          let c = k.slice(1, -1);
          return { type: "em", raw: k, text: c, tokens: this.lexer.inlineTokens(c) };
        }
        let u = k.slice(2, -2);
        return { type: "strong", raw: k, text: u, tokens: this.lexer.inlineTokens(u) };
      }
    }
  }
  codespan(n) {
    let e = this.rules.inline.code.exec(n);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(t), r = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return s && r && (t = t.substring(1, t.length - 1)), { type: "codespan", raw: e[0], text: t };
    }
  }
  br(n) {
    let e = this.rules.inline.br.exec(n);
    if (e) return { type: "br", raw: e[0] };
  }
  del(n) {
    let e = this.rules.inline.del.exec(n);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(n) {
    let e = this.rules.inline.autolink.exec(n);
    if (e) {
      let t, s;
      return e[2] === "@" ? (t = e[1], s = "mailto:" + t) : (t = e[1], s = t), { type: "link", raw: e[0], text: t, href: s, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  url(n) {
    var t;
    let e;
    if (e = this.rules.inline.url.exec(n)) {
      let s, r;
      if (e[2] === "@") s = e[0], r = "mailto:" + s;
      else {
        let i;
        do
          i = e[0], e[0] = ((t = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : t[0]) ?? "";
        while (i !== e[0]);
        s = e[0], e[1] === "www." ? r = "http://" + e[0] : r = e[0];
      }
      return { type: "link", raw: e[0], text: s, href: r, tokens: [{ type: "text", raw: s, text: s }] };
    }
  }
  inlineText(n) {
    let e = this.rules.inline.text.exec(n);
    if (e) {
      let t = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: t };
    }
  }
}, $ = class ae {
  constructor(e) {
    m(this, "tokens");
    m(this, "options");
    m(this, "state");
    m(this, "inlineQueue");
    m(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || q, this.options.tokenizer = this.options.tokenizer || new W(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let t = { other: y, block: H.normal, inline: N.normal };
    this.options.pedantic ? (t.block = H.pedantic, t.inline = N.pedantic) : this.options.gfm && (t.block = H.gfm, this.options.breaks ? t.inline = N.breaks : t.inline = N.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: H, inline: N };
  }
  static lex(e, t) {
    return new ae(t).lex(e);
  }
  static lexInline(e, t) {
    return new ae(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(y.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let s = this.inlineQueue[t];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (e = e.replace(y.tabCharGlobal, "    ").replace(y.spaceLine, "")); e; ) {
      let l;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((a) => (l = a.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        let a = t.at(-1);
        l.raw.length === 1 && a !== void 0 ? a.raw += `
` : t.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        let a = t.at(-1);
        (a == null ? void 0 : a.type) === "paragraph" || (a == null ? void 0 : a.type) === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + l.raw, a.text += `
` + l.text, this.inlineQueue.at(-1).src = a.text) : t.push(l);
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
        let a = t.at(-1);
        (a == null ? void 0 : a.type) === "paragraph" || (a == null ? void 0 : a.type) === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + l.raw, a.text += `
` + l.raw, this.inlineQueue.at(-1).src = a.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = { href: l.href, title: l.title }, t.push(l));
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
      if ((o = this.options.extensions) != null && o.startBlock) {
        let a = 1 / 0, h = e.slice(1), k;
        this.options.extensions.startBlock.forEach((u) => {
          k = u.call({ lexer: this }, h), typeof k == "number" && k >= 0 && (a = Math.min(a, k));
        }), a < 1 / 0 && a >= 0 && (p = e.substring(0, a + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(p))) {
        let a = t.at(-1);
        s && (a == null ? void 0 : a.type) === "paragraph" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + l.raw, a.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(l), s = p.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        let a = t.at(-1);
        (a == null ? void 0 : a.type) === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + l.raw, a.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(l);
        continue;
      }
      if (e) {
        let a = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(a);
          break;
        } else throw new Error(a);
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    var p, a, h, k, u;
    let s = e, r = null;
    if (this.tokens.links) {
      let c = Object.keys(this.tokens.links);
      if (c.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; ) c.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; ) s = s.slice(0, r.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; ) i = r[2] ? r[2].length : 0, s = s.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    s = ((a = (p = this.options.hooks) == null ? void 0 : p.emStrongMask) == null ? void 0 : a.call({ lexer: this }, s)) ?? s;
    let o = !1, l = "";
    for (; e; ) {
      o || (l = ""), o = !1;
      let c;
      if ((k = (h = this.options.extensions) == null ? void 0 : h.inline) != null && k.some((g) => (c = g.call({ lexer: this }, e, t)) ? (e = e.substring(c.raw.length), t.push(c), !0) : !1)) continue;
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
        let g = t.at(-1);
        c.type === "text" && (g == null ? void 0 : g.type) === "text" ? (g.raw += c.raw, g.text += c.text) : t.push(c);
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
      let d = e;
      if ((u = this.options.extensions) != null && u.startInline) {
        let g = 1 / 0, w = e.slice(1), T;
        this.options.extensions.startInline.forEach((I) => {
          T = I.call({ lexer: this }, w), typeof T == "number" && T >= 0 && (g = Math.min(g, T));
        }), g < 1 / 0 && g >= 0 && (d = e.substring(0, g + 1));
      }
      if (c = this.tokenizer.inlineText(d)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (l = c.raw.slice(-1)), o = !0;
        let g = t.at(-1);
        (g == null ? void 0 : g.type) === "text" ? (g.raw += c.raw, g.text += c.text) : t.push(c);
        continue;
      }
      if (e) {
        let g = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(g);
          break;
        } else throw new Error(g);
      }
    }
    return t;
  }
}, J = class {
  constructor(n) {
    m(this, "options");
    m(this, "parser");
    this.options = n || q;
  }
  space(n) {
    return "";
  }
  code({ text: n, lang: e, escaped: t }) {
    var i;
    let s = (i = (e || "").match(y.notSpaceStart)) == null ? void 0 : i[0], r = n.replace(y.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + A(s) + '">' + (t ? r : A(r, !0)) + `</code></pre>
` : "<pre><code>" + (t ? r : A(r, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: n }) {
    return `<blockquote>
${this.parser.parse(n)}</blockquote>
`;
  }
  html({ text: n }) {
    return n;
  }
  def(n) {
    return "";
  }
  heading({ tokens: n, depth: e }) {
    return `<h${e}>${this.parser.parseInline(n)}</h${e}>
`;
  }
  hr(n) {
    return `<hr>
`;
  }
  list(n) {
    let e = n.ordered, t = n.start, s = "";
    for (let o = 0; o < n.items.length; o++) {
      let l = n.items[o];
      s += this.listitem(l);
    }
    let r = e ? "ol" : "ul", i = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + r + i + `>
` + s + "</" + r + `>
`;
  }
  listitem(n) {
    return `<li>${this.parser.parse(n.tokens)}</li>
`;
  }
  checkbox({ checked: n }) {
    return "<input " + (n ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: n }) {
    return `<p>${this.parser.parseInline(n)}</p>
`;
  }
  table(n) {
    let e = "", t = "";
    for (let r = 0; r < n.header.length; r++) t += this.tablecell(n.header[r]);
    e += this.tablerow({ text: t });
    let s = "";
    for (let r = 0; r < n.rows.length; r++) {
      let i = n.rows[r];
      t = "";
      for (let o = 0; o < i.length; o++) t += this.tablecell(i[o]);
      s += this.tablerow({ text: t });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: n }) {
    return `<tr>
${n}</tr>
`;
  }
  tablecell(n) {
    let e = this.parser.parseInline(n.tokens), t = n.header ? "th" : "td";
    return (n.align ? `<${t} align="${n.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  strong({ tokens: n }) {
    return `<strong>${this.parser.parseInline(n)}</strong>`;
  }
  em({ tokens: n }) {
    return `<em>${this.parser.parseInline(n)}</em>`;
  }
  codespan({ text: n }) {
    return `<code>${A(n, !0)}</code>`;
  }
  br(n) {
    return "<br>";
  }
  del({ tokens: n }) {
    return `<del>${this.parser.parseInline(n)}</del>`;
  }
  link({ href: n, title: e, tokens: t }) {
    let s = this.parser.parseInline(t), r = ze(n);
    if (r === null) return s;
    n = r;
    let i = '<a href="' + n + '"';
    return e && (i += ' title="' + A(e) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: n, title: e, text: t, tokens: s }) {
    s && (t = this.parser.parseInline(s, this.parser.textRenderer));
    let r = ze(n);
    if (r === null) return A(t);
    n = r;
    let i = `<img src="${n}" alt="${t}"`;
    return e && (i += ` title="${A(e)}"`), i += ">", i;
  }
  text(n) {
    return "tokens" in n && n.tokens ? this.parser.parseInline(n.tokens) : "escaped" in n && n.escaped ? n.text : A(n.text);
  }
}, xe = class {
  strong({ text: n }) {
    return n;
  }
  em({ text: n }) {
    return n;
  }
  codespan({ text: n }) {
    return n;
  }
  del({ text: n }) {
    return n;
  }
  html({ text: n }) {
    return n;
  }
  text({ text: n }) {
    return n;
  }
  link({ text: n }) {
    return "" + n;
  }
  image({ text: n }) {
    return "" + n;
  }
  br() {
    return "";
  }
  checkbox({ raw: n }) {
    return n;
  }
}, R = class oe {
  constructor(e) {
    m(this, "options");
    m(this, "renderer");
    m(this, "textRenderer");
    this.options = e || q, this.options.renderer = this.options.renderer || new J(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new xe();
  }
  static parse(e, t) {
    return new oe(t).parse(e);
  }
  static parseInline(e, t) {
    return new oe(t).parseInline(e);
  }
  parse(e) {
    var s, r;
    let t = "";
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if ((r = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && r[o.type]) {
        let p = o, a = this.options.extensions.renderers[p.type].call({ parser: this }, p);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(p.type)) {
          t += a || "";
          continue;
        }
      }
      let l = o;
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
    var r, i;
    let s = "";
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[l.type]) {
        let a = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (a !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(l.type)) {
          s += a || "";
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
          let a = 'Token with "' + p.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return s;
  }
}, F, M = (F = class {
  constructor(n) {
    m(this, "options");
    m(this, "block");
    this.options = n || q;
  }
  preprocess(n) {
    return n;
  }
  postprocess(n) {
    return n;
  }
  processAllTokens(n) {
    return n;
  }
  emStrongMask(n) {
    return n;
  }
  provideLexer() {
    return this.block ? $.lex : $.lexInline;
  }
  provideParser() {
    return this.block ? R.parse : R.parseInline;
  }
}, m(F, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), m(F, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), F), Dt = class {
  constructor(...n) {
    m(this, "defaults", ce());
    m(this, "options", this.setOptions);
    m(this, "parse", this.parseMarkdown(!0));
    m(this, "parseInline", this.parseMarkdown(!1));
    m(this, "Parser", R);
    m(this, "Renderer", J);
    m(this, "TextRenderer", xe);
    m(this, "Lexer", $);
    m(this, "Tokenizer", W);
    m(this, "Hooks", M);
    this.use(...n);
  }
  walkTokens(n, e) {
    var s, r;
    let t = [];
    for (let i of n) switch (t = t.concat(e.call(this, i)), i.type) {
      case "table": {
        let o = i;
        for (let l of o.header) t = t.concat(this.walkTokens(l.tokens, e));
        for (let l of o.rows) for (let p of l) t = t.concat(this.walkTokens(p.tokens, e));
        break;
      }
      case "list": {
        let o = i;
        t = t.concat(this.walkTokens(o.items, e));
        break;
      }
      default: {
        let o = i;
        (r = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && r[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((l) => {
          let p = o[l].flat(1 / 0);
          t = t.concat(this.walkTokens(p, e));
        }) : o.tokens && (t = t.concat(this.walkTokens(o.tokens, e)));
      }
    }
    return t;
  }
  use(...n) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return n.forEach((t) => {
      let s = { ...t };
      if (s.async = this.defaults.async || s.async || !1, t.extensions && (t.extensions.forEach((r) => {
        if (!r.name) throw new Error("extension name required");
        if ("renderer" in r) {
          let i = e.renderers[r.name];
          i ? e.renderers[r.name] = function(...o) {
            let l = r.renderer.apply(this, o);
            return l === !1 && (l = i.apply(this, o)), l;
          } : e.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let i = e[r.level];
          i ? i.unshift(r.tokenizer) : e[r.level] = [r.tokenizer], r.start && (r.level === "block" ? e.startBlock ? e.startBlock.push(r.start) : e.startBlock = [r.start] : r.level === "inline" && (e.startInline ? e.startInline.push(r.start) : e.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (e.childTokens[r.name] = r.childTokens);
      }), s.extensions = e), t.renderer) {
        let r = this.defaults.renderer || new J(this.defaults);
        for (let i in t.renderer) {
          if (!(i in r)) throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i)) continue;
          let o = i, l = t.renderer[o], p = r[o];
          r[o] = (...a) => {
            let h = l.apply(r, a);
            return h === !1 && (h = p.apply(r, a)), h || "";
          };
        }
        s.renderer = r;
      }
      if (t.tokenizer) {
        let r = this.defaults.tokenizer || new W(this.defaults);
        for (let i in t.tokenizer) {
          if (!(i in r)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          let o = i, l = t.tokenizer[o], p = r[o];
          r[o] = (...a) => {
            let h = l.apply(r, a);
            return h === !1 && (h = p.apply(r, a)), h;
          };
        }
        s.tokenizer = r;
      }
      if (t.hooks) {
        let r = this.defaults.hooks || new M();
        for (let i in t.hooks) {
          if (!(i in r)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          let o = i, l = t.hooks[o], p = r[o];
          M.passThroughHooks.has(i) ? r[o] = (a) => {
            if (this.defaults.async && M.passThroughHooksRespectAsync.has(i)) return (async () => {
              let k = await l.call(r, a);
              return p.call(r, k);
            })();
            let h = l.call(r, a);
            return p.call(r, h);
          } : r[o] = (...a) => {
            if (this.defaults.async) return (async () => {
              let k = await l.apply(r, a);
              return k === !1 && (k = await p.apply(r, a)), k;
            })();
            let h = l.apply(r, a);
            return h === !1 && (h = p.apply(r, a)), h;
          };
        }
        s.hooks = r;
      }
      if (t.walkTokens) {
        let r = this.defaults.walkTokens, i = t.walkTokens;
        s.walkTokens = function(o) {
          let l = [];
          return l.push(i.call(this, o)), r && (l = l.concat(r.call(this, o))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(n) {
    return this.defaults = { ...this.defaults, ...n }, this;
  }
  lexer(n, e) {
    return $.lex(n, e ?? this.defaults);
  }
  parser(n, e) {
    return R.parse(n, e ?? this.defaults);
  }
  parseMarkdown(n) {
    return (e, t) => {
      let s = { ...t }, r = { ...this.defaults, ...s }, i = this.onError(!!r.silent, !!r.async);
      if (this.defaults.async === !0 && s.async === !1) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (r.hooks && (r.hooks.options = r, r.hooks.block = n), r.async) return (async () => {
        let o = r.hooks ? await r.hooks.preprocess(e) : e, l = await (r.hooks ? await r.hooks.provideLexer() : n ? $.lex : $.lexInline)(o, r), p = r.hooks ? await r.hooks.processAllTokens(l) : l;
        r.walkTokens && await Promise.all(this.walkTokens(p, r.walkTokens));
        let a = await (r.hooks ? await r.hooks.provideParser() : n ? R.parse : R.parseInline)(p, r);
        return r.hooks ? await r.hooks.postprocess(a) : a;
      })().catch(i);
      try {
        r.hooks && (e = r.hooks.preprocess(e));
        let o = (r.hooks ? r.hooks.provideLexer() : n ? $.lex : $.lexInline)(e, r);
        r.hooks && (o = r.hooks.processAllTokens(o)), r.walkTokens && this.walkTokens(o, r.walkTokens);
        let l = (r.hooks ? r.hooks.provideParser() : n ? R.parse : R.parseInline)(o, r);
        return r.hooks && (l = r.hooks.postprocess(l)), l;
      } catch (o) {
        return i(o);
      }
    };
  }
  onError(n, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, n) {
        let s = "<p>An error occurred:</p><pre>" + A(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, P = new Dt();
function b(n, e) {
  return P.parse(n, e);
}
b.options = b.setOptions = function(n) {
  return P.setOptions(n), b.defaults = P.defaults, _e(b.defaults), b;
};
b.getDefaults = ce;
b.defaults = q;
b.use = function(...n) {
  return P.use(...n), b.defaults = P.defaults, _e(b.defaults), b;
};
b.walkTokens = function(n, e) {
  return P.walkTokens(n, e);
};
b.parseInline = P.parseInline;
b.Parser = R;
b.parser = R.parse;
b.Renderer = J;
b.TextRenderer = xe;
b.Lexer = $;
b.lexer = $.lex;
b.Tokenizer = W;
b.Hooks = M;
b.parse = b;
b.options;
b.setOptions;
b.use;
b.walkTokens;
b.parseInline;
R.parse;
$.lex;
var K, V, Y, L, Me, Ze;
class Qt extends He {
  constructor(t, s) {
    super(t, s);
    U(this, L);
    U(this, K, new We(this));
    U(this, V, new Je(this));
    U(this, Y, new Ke(this));
  }
  async execute() {
    var r;
    const t = await this.getContext(Fe), s = this.args.unique ?? null;
    try {
      let i = null;
      if (s) {
        const { data: x } = await Q(this, Y).requestItems([s]);
        x != null && x.length && (i = x[0].documentType.unique);
      }
      const l = (await Q(this, K).requestAllowedChildrenOf(
        i,
        s
      )).data;
      if (!((r = l == null ? void 0 : l.items) != null && r.length)) {
        t.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const p = [];
      for (const x of l.items) {
        const { data: S } = await Q(this, V).requestItemsByDocumentType(x.unique);
        S != null && S.length && p.push({
          documentTypeUnique: x.unique,
          documentTypeName: x.name,
          documentTypeIcon: x.icon ?? null,
          blueprints: S.map((_) => ({
            blueprintUnique: _.unique,
            blueprintName: _.name
          }))
        });
      }
      let a;
      try {
        a = await Te(this, Ye, {
          data: { documentTypes: p }
        });
      } catch {
        return;
      }
      const { blueprintUnique: h, documentTypeUnique: k } = a, u = p.find((x) => x.documentTypeUnique === k), c = u == null ? void 0 : u.blueprints.find((x) => x.blueprintUnique === h);
      console.log("Selected blueprint:", h, "Document type:", k);
      let d;
      try {
        d = await Te(this, Ve, {
          data: { unique: s, blueprintName: (c == null ? void 0 : c.blueprintName) ?? "" }
        });
      } catch {
        return;
      }
      const { name: g, mediaUnique: w, pageTitle: T, pageTitleShort: I, pageDescription: D, itineraryContent: v } = d;
      if (!w || !g)
        return;
      console.log("Creating document with:", { name: g, pageTitle: T, pageTitleShort: I, pageDescription: D, itineraryContent: v == null ? void 0 : v.substring(0, 100) });
      const C = await (await this.getContext(Xe)).getLatestToken(), z = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${h}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${C}`
          }
        }
      );
      if (!z.ok) {
        const x = await z.json();
        console.error("Scaffold failed:", x), t.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${x.title || "Unknown error"}` }
        });
        return;
      }
      const E = await z.json();
      console.log("Scaffold response:", E);
      const j = E.values ? [...E.values] : [], ne = (x, S) => {
        const _ = j.find((Ge) => Ge.alias === x);
        _ ? _.value = S : j.push({ alias: x, value: S });
      };
      ne("pageTitle", T), ne("pageTitleShort", I), ne("pageDescription", D), v && le(this, L, Me).call(this, j, v);
      const me = {
        parent: s ? { id: s } : null,
        documentType: { id: k },
        template: E.template ? { id: E.template.id } : null,
        values: j,
        variants: [
          {
            name: g,
            culture: null,
            segment: null
          }
        ]
      };
      console.log("Create request:", JSON.stringify(me, null, 2));
      const re = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${C}`
        },
        body: JSON.stringify(me)
      });
      if (!re.ok) {
        const x = await re.json();
        console.error("Document creation failed:", x), t.peek("danger", {
          data: { message: `Failed to create document: ${x.title || x.detail || "Unknown error"}` }
        });
        return;
      }
      const se = re.headers.get("Location"), B = se == null ? void 0 : se.split("/").pop();
      if (console.log("Document created successfully! ID:", B), B) {
        const x = await fetch(`/umbraco/management/api/v1/document/${B}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${C}`
          }
        });
        if (x.ok) {
          const S = await x.json();
          console.log("Fetched document for save:", S);
          const _ = await fetch(`/umbraco/management/api/v1/document/${B}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${C}`
            },
            body: JSON.stringify(S)
          });
          _.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await _.text());
        } else
          console.warn("Could not fetch document for save:", await x.text());
      }
      if (t.peek("positive", {
        data: { message: `Document "${g}" created successfully!` }
      }), B) {
        const x = `/umbraco/section/content/workspace/document/edit/${B}`;
        setTimeout(() => {
          window.location.href = x;
        }, 150);
      }
    } catch (i) {
      console.error("Error creating document:", i), t.peek("danger", {
        data: { message: "An unexpected error occurred while creating the document." }
      });
    }
  }
}
K = new WeakMap(), V = new WeakMap(), Y = new WeakMap(), L = new WeakSet(), /**
 * Updates the contentGrid value to replace the "Suggested Itinerary" RTE content
 */
Me = function(t, s) {
  var i, o, l, p;
  const r = t.find((a) => a.alias === "contentGrid");
  if (!r || !r.value) {
    console.log("No contentGrid found in scaffold values");
    return;
  }
  try {
    const a = typeof r.value == "string";
    console.log("contentGrid original type:", a ? "string" : "object");
    const h = a ? JSON.parse(r.value) : r.value;
    console.log("Parsed contentGrid:", h), console.log("contentData length:", (i = h.contentData) == null ? void 0 : i.length);
    const k = h.contentData;
    if (!k) {
      console.log("No contentData in contentGrid");
      return;
    }
    let u = !1;
    for (const c of k) {
      console.log("Checking block:", c.key, "contentTypeKey:", c.contentTypeKey), console.log("Block values:", (o = c.values) == null ? void 0 : o.map((g) => ({ alias: g.alias, value: typeof g.value == "object" ? "[object]" : g.value })));
      const d = (l = c.values) == null ? void 0 : l.find((g) => g.alias === "featurePropertyFeatureTitle");
      if (console.log("Title value for block:", d == null ? void 0 : d.value), d && typeof d.value == "string" && d.value.toLowerCase().includes("suggested itinerary")) {
        console.log("Found Suggested Itinerary block:", c.key), u = !0;
        const g = (p = c.values) == null ? void 0 : p.find((w) => w.alias === "richTextContent");
        if (g) {
          const w = le(this, L, Ze).call(this, s);
          g.value = {
            blocks: {
              contentData: [],
              settingsData: [],
              expose: [],
              Layout: {}
            },
            markup: w
          }, console.log("Updated richTextContent with itinerary");
        }
        break;
      }
    }
    u || console.log('WARNING: Did not find a block with featurePropertyFeatureTitle containing "suggested itinerary"'), r.value = a ? JSON.stringify(h) : h, console.log("ContentGrid updated successfully (stringified:", a, ")");
  } catch (a) {
    console.error("Failed to update contentGrid:", a);
  }
}, /**
 * Converts Markdown to HTML using marked library
 */
Ze = function(t) {
  if (!t) return "";
  try {
    const s = b.parse(t, {
      gfm: !0,
      // GitHub Flavored Markdown
      breaks: !1
      // Don't convert \n to <br>
    });
    return typeof s == "string" ? (console.log("Converted Markdown to HTML:", s.substring(0, 200)), s) : (console.warn("marked returned Promise, using fallback"), `<p>${t}</p>`);
  } catch (s) {
    return console.error("Markdown conversion failed:", s), `<p>${t.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  }
};
export {
  Qt as UpDocEntityAction,
  Qt as default
};
//# sourceMappingURL=up-doc-action-G9iraj7E.js.map
