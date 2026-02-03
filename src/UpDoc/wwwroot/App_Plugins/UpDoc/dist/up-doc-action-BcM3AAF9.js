var Me = Object.defineProperty;
var xe = (n) => {
  throw TypeError(n);
};
var Ze = (n, e, t) => e in n ? Me(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var w = (n, e, t) => Ze(n, typeof e != "symbol" ? e + "" : e, t), me = (n, e, t) => e.has(n) || xe("Cannot " + t);
var Q = (n, e, t) => (me(n, e, "read from private field"), t ? t.call(n) : e.get(n)), N = (n, e, t) => e.has(n) ? xe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t);
var se = (n, e, t) => (me(n, e, "access private method"), t);
import { UmbModalToken as Ae, umbOpenModal as we } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as je } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as Qe } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as Ge } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as He } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as Fe } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as Ve } from "@umbraco-cms/backoffice/document";
const Je = new Ae(
  "UpDoc.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
), Xe = new Ae(
  "UpDoc.BlueprintPickerModal",
  {
    modal: {
      type: "dialog",
      size: "small"
    }
  }
);
function oe() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var B = oe();
function ve(n) {
  B = n;
}
var Z = { exec: () => null };
function x(n, e = "") {
  let t = typeof n == "string" ? n : n.source, s = { replace: (r, i) => {
    let a = typeof i == "string" ? i : i.source;
    return a = a.replace(R.caret, "$1"), t = t.replace(r, a), s;
  }, getRegex: () => new RegExp(t, e) };
  return s;
}
var We = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), R = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (n) => new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}#`), htmlBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}<(?:[a-z].*>|!--)`, "i") }, Ke = /^(?:[ \t]*(?:\n|$))+/, Ye = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, et = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, j = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, tt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ce = /(?:[*+-]|\d{1,9}[.)])/, _e = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ce = x(_e).replace(/bull/g, ce).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), nt = x(_e).replace(/bull/g, ce).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), pe = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, rt = /^[^\n]+/, ue = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, st = x(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ue).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), lt = x(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ce).getRegex(), Y = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", he = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, it = x("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", he).replace("tag", Y).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Ie = x(pe).replace("hr", j).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Y).getRegex(), at = x(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ie).getRegex(), ge = { blockquote: at, code: Ye, def: st, fences: et, heading: tt, hr: j, html: it, lheading: Ce, list: lt, newline: Ke, paragraph: Ie, table: Z, text: rt }, ye = x("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", j).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Y).getRegex(), ot = { ...ge, lheading: nt, table: ye, paragraph: x(pe).replace("hr", j).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ye).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Y).getRegex() }, ct = { ...ge, html: x(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", he).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Z, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: x(pe).replace("hr", j).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ce).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, pt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ut = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Pe = /^( {2,}|\\)\n(?!\s*$)/, ht = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ee = /[\p{P}\p{S}]/u, fe = /[\s\p{P}\p{S}]/u, qe = /[^\s\p{P}\p{S}]/u, gt = x(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, fe).getRegex(), Be = /(?!~)[\p{P}\p{S}]/u, ft = /(?!~)[\s\p{P}\p{S}]/u, kt = /(?:[^\s\p{P}\p{S}]|~)/u, dt = x(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", We ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Le = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, bt = x(Le, "u").replace(/punct/g, ee).getRegex(), xt = x(Le, "u").replace(/punct/g, Be).getRegex(), Ee = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", mt = x(Ee, "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, fe).replace(/punct/g, ee).getRegex(), wt = x(Ee, "gu").replace(/notPunctSpace/g, kt).replace(/punctSpace/g, ft).replace(/punct/g, Be).getRegex(), yt = x("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, fe).replace(/punct/g, ee).getRegex(), $t = x(/\\(punct)/, "gu").replace(/punct/g, ee).getRegex(), Rt = x(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Tt = x(he).replace("(?:-->|$)", "-->").getRegex(), St = x("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Tt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), F = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, zt = x(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", F).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), De = x(/^!?\[(label)\]\[(ref)\]/).replace("label", F).replace("ref", ue).getRegex(), Ne = x(/^!?\[(ref)\](?:\[\])?/).replace("ref", ue).getRegex(), At = x("reflink|nolink(?!\\()", "g").replace("reflink", De).replace("nolink", Ne).getRegex(), $e = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, ke = { _backpedal: Z, anyPunctuation: $t, autolink: Rt, blockSkip: dt, br: Pe, code: ut, del: Z, emStrongLDelim: bt, emStrongRDelimAst: mt, emStrongRDelimUnd: yt, escape: pt, link: zt, nolink: Ne, punctuation: gt, reflink: De, reflinkSearch: At, tag: St, text: ht, url: Z }, vt = { ...ke, link: x(/^!?\[(label)\]\((.*?)\)/).replace("label", F).getRegex(), reflink: x(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", F).getRegex() }, le = { ...ke, emStrongRDelimAst: wt, emStrongLDelim: xt, url: x(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", $e).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: x(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", $e).getRegex() }, _t = { ...le, br: x(Pe).replace("{2,}", "*").getRegex(), text: x(le.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, G = { normal: ge, gfm: ot, pedantic: ct }, O = { normal: ke, gfm: le, breaks: _t, pedantic: vt }, Ct = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Re = (n) => Ct[n];
function C(n, e) {
  if (e) {
    if (R.escapeTest.test(n)) return n.replace(R.escapeReplace, Re);
  } else if (R.escapeTestNoEncode.test(n)) return n.replace(R.escapeReplaceNoEncode, Re);
  return n;
}
function Te(n) {
  try {
    n = encodeURI(n).replace(R.percentDecode, "%");
  } catch {
    return null;
  }
  return n;
}
function Se(n, e) {
  var i;
  let t = n.replace(R.findPipe, (a, l, p) => {
    let o = !1, u = l;
    for (; --u >= 0 && p[u] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), s = t.split(R.splitPipe), r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), e) if (s.length > e) s.splice(e);
  else for (; s.length < e; ) s.push("");
  for (; r < s.length; r++) s[r] = s[r].trim().replace(R.slashPipe, "|");
  return s;
}
function U(n, e, t) {
  let s = n.length;
  if (s === 0) return "";
  let r = 0;
  for (; r < s && n.charAt(s - r - 1) === e; )
    r++;
  return n.slice(0, s - r);
}
function It(n, e) {
  if (n.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let s = 0; s < n.length; s++) if (n[s] === "\\") s++;
  else if (n[s] === e[0]) t++;
  else if (n[s] === e[1] && (t--, t < 0)) return s;
  return t > 0 ? -2 : -1;
}
function ze(n, e, t, s, r) {
  let i = e.href, a = e.title || null, l = n[1].replace(r.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  let p = { type: n[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: a, text: l, tokens: s.inlineTokens(l) };
  return s.state.inLink = !1, p;
}
function Pt(n, e, t) {
  let s = n.match(t.other.indentCodeCompensation);
  if (s === null) return e;
  let r = s[1];
  return e.split(`
`).map((i) => {
    let a = i.match(t.other.beginningSpace);
    if (a === null) return i;
    let [l] = a;
    return l.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var V = class {
  constructor(n) {
    w(this, "options");
    w(this, "rules");
    w(this, "lexer");
    this.options = n || B;
  }
  space(n) {
    let e = this.rules.block.newline.exec(n);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(n) {
    let e = this.rules.block.code.exec(n);
    if (e) {
      let t = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : U(t, `
`) };
    }
  }
  fences(n) {
    let e = this.rules.block.fences.exec(n);
    if (e) {
      let t = e[0], s = Pt(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: s };
    }
  }
  heading(n) {
    let e = this.rules.block.heading.exec(n);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        let s = U(t, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (t = s.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(n) {
    let e = this.rules.block.hr.exec(n);
    if (e) return { type: "hr", raw: U(e[0], `
`) };
  }
  blockquote(n) {
    let e = this.rules.block.blockquote.exec(n);
    if (e) {
      let t = U(e[0], `
`).split(`
`), s = "", r = "", i = [];
      for (; t.length > 0; ) {
        let a = !1, l = [], p;
        for (p = 0; p < t.length; p++) if (this.rules.other.blockquoteStart.test(t[p])) l.push(t[p]), a = !0;
        else if (!a) l.push(t[p]);
        else break;
        t = t.slice(p);
        let o = l.join(`
`), u = o.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${o}` : o, r = r ? `${r}
${u}` : u;
        let g = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(u, i, !0), this.lexer.state.top = g, t.length === 0) break;
        let h = i.at(-1);
        if ((h == null ? void 0 : h.type) === "code") break;
        if ((h == null ? void 0 : h.type) === "blockquote") {
          let c = h, d = c.raw + `
` + t.join(`
`), f = this.blockquote(d);
          i[i.length - 1] = f, s = s.substring(0, s.length - c.raw.length) + f.raw, r = r.substring(0, r.length - c.text.length) + f.text;
          break;
        } else if ((h == null ? void 0 : h.type) === "list") {
          let c = h, d = c.raw + `
` + t.join(`
`), f = this.list(d);
          i[i.length - 1] = f, s = s.substring(0, s.length - h.raw.length) + f.raw, r = r.substring(0, r.length - c.raw.length) + f.raw, t = d.substring(i.at(-1).raw.length).split(`
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
      let r = e[1].trim(), i = r.length > 1, a = { type: "list", raw: "", ordered: i, start: i ? +r.slice(0, -1) : "", loose: !1, items: [] };
      r = i ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = i ? r : "[*+-]");
      let l = this.rules.other.listItemRegex(r), p = !1;
      for (; n; ) {
        let u = !1, g = "", h = "";
        if (!(e = l.exec(n)) || this.rules.block.hr.test(n)) break;
        g = e[0], n = n.substring(g.length);
        let c = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (y) => " ".repeat(3 * y.length)), d = n.split(`
`, 1)[0], f = !c.trim(), b = 0;
        if (this.options.pedantic ? (b = 2, h = c.trimStart()) : f ? b = e[1].length + 1 : (b = e[2].search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, h = c.slice(b), b += e[1].length), f && this.rules.other.blankLine.test(d) && (g += d + `
`, n = n.substring(d.length + 1), u = !0), !u) {
          let y = this.rules.other.nextBulletRegex(b), T = this.rules.other.hrRegex(b), _ = this.rules.other.fencesBeginRegex(b), L = this.rules.other.headingBeginRegex(b), S = this.rules.other.htmlBeginRegex(b);
          for (; n; ) {
            let I = n.split(`
`, 1)[0], z;
            if (d = I, this.options.pedantic ? (d = d.replace(this.rules.other.listReplaceNesting, "  "), z = d) : z = d.replace(this.rules.other.tabCharGlobal, "    "), _.test(d) || L.test(d) || S.test(d) || y.test(d) || T.test(d)) break;
            if (z.search(this.rules.other.nonSpaceChar) >= b || !d.trim()) h += `
` + z.slice(b);
            else {
              if (f || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || _.test(c) || L.test(c) || T.test(c)) break;
              h += `
` + d;
            }
            !f && !d.trim() && (f = !0), g += I + `
`, n = n.substring(I.length + 1), c = z.slice(b);
          }
        }
        a.loose || (p ? a.loose = !0 : this.rules.other.doubleBlankLine.test(g) && (p = !0)), a.items.push({ type: "list_item", raw: g, task: !!this.options.gfm && this.rules.other.listIsTask.test(h), loose: !1, text: h, tokens: [] }), a.raw += g;
      }
      let o = a.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      a.raw = a.raw.trimEnd();
      for (let u of a.items) {
        if (this.lexer.state.top = !1, u.tokens = this.lexer.blockTokens(u.text, []), u.task) {
          if (u.text = u.text.replace(this.rules.other.listReplaceTask, ""), ((t = u.tokens[0]) == null ? void 0 : t.type) === "text" || ((s = u.tokens[0]) == null ? void 0 : s.type) === "paragraph") {
            u.tokens[0].raw = u.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), u.tokens[0].text = u.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let h = this.lexer.inlineQueue.length - 1; h >= 0; h--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)) {
              this.lexer.inlineQueue[h].src = this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let g = this.rules.other.listTaskCheckbox.exec(u.raw);
          if (g) {
            let h = { type: "checkbox", raw: g[0] + " ", checked: g[0] !== "[ ]" };
            u.checked = h.checked, a.loose ? u.tokens[0] && ["paragraph", "text"].includes(u.tokens[0].type) && "tokens" in u.tokens[0] && u.tokens[0].tokens ? (u.tokens[0].raw = h.raw + u.tokens[0].raw, u.tokens[0].text = h.raw + u.tokens[0].text, u.tokens[0].tokens.unshift(h)) : u.tokens.unshift({ type: "paragraph", raw: h.raw, text: h.raw, tokens: [h] }) : u.tokens.unshift(h);
          }
        }
        if (!a.loose) {
          let g = u.tokens.filter((c) => c.type === "space"), h = g.length > 0 && g.some((c) => this.rules.other.anyLine.test(c.raw));
          a.loose = h;
        }
      }
      if (a.loose) for (let u of a.items) {
        u.loose = !0;
        for (let g of u.tokens) g.type === "text" && (g.type = "paragraph");
      }
      return a;
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
    var a;
    let e = this.rules.block.table.exec(n);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = Se(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (a = e[3]) != null && a.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (t.length === s.length) {
      for (let l of s) this.rules.other.tableAlignRight.test(l) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? i.align.push("left") : i.align.push(null);
      for (let l = 0; l < t.length; l++) i.header.push({ text: t[l], tokens: this.lexer.inline(t[l]), header: !0, align: i.align[l] });
      for (let l of r) i.rows.push(Se(l, i.header.length).map((p, o) => ({ text: p, tokens: this.lexer.inline(p), header: !1, align: i.align[o] })));
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
        let i = U(t.slice(0, -1), "\\");
        if ((t.length - i.length) % 2 === 0) return;
      } else {
        let i = It(e[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let a = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, a).trim(), e[3] = "";
        }
      }
      let s = e[2], r = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(s);
        i && (s = i[1], r = i[3]);
      } else r = e[3] ? e[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? s = s.slice(1) : s = s.slice(1, -1)), ze(e, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: r && r.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
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
      return ze(t, r, t[0], this.lexer, this.rules);
    }
  }
  emStrong(n, e, t = "") {
    let s = this.rules.inline.emStrongLDelim.exec(n);
    if (!(!s || s[3] && t.match(this.rules.other.unicodeAlphaNumeric)) && (!(s[1] || s[2]) || !t || this.rules.inline.punctuation.exec(t))) {
      let r = [...s[0]].length - 1, i, a, l = r, p = 0, o = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (o.lastIndex = 0, e = e.slice(-1 * n.length + r); (s = o.exec(e)) != null; ) {
        if (i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !i) continue;
        if (a = [...i].length, s[3] || s[4]) {
          l += a;
          continue;
        } else if ((s[5] || s[6]) && r % 3 && !((r + a) % 3)) {
          p += a;
          continue;
        }
        if (l -= a, l > 0) continue;
        a = Math.min(a, a + l + p);
        let u = [...s[0]][0].length, g = n.slice(0, r + s.index + u + a);
        if (Math.min(r, a) % 2) {
          let c = g.slice(1, -1);
          return { type: "em", raw: g, text: c, tokens: this.lexer.inlineTokens(c) };
        }
        let h = g.slice(2, -2);
        return { type: "strong", raw: g, text: h, tokens: this.lexer.inlineTokens(h) };
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
}, A = class ie {
  constructor(e) {
    w(this, "tokens");
    w(this, "options");
    w(this, "state");
    w(this, "inlineQueue");
    w(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || B, this.options.tokenizer = this.options.tokenizer || new V(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let t = { other: R, block: G.normal, inline: O.normal };
    this.options.pedantic ? (t.block = G.pedantic, t.inline = O.pedantic) : this.options.gfm && (t.block = G.gfm, this.options.breaks ? t.inline = O.breaks : t.inline = O.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: G, inline: O };
  }
  static lex(e, t) {
    return new ie(t).lex(e);
  }
  static lexInline(e, t) {
    return new ie(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(R.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let s = this.inlineQueue[t];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], s = !1) {
    var r, i, a;
    for (this.options.pedantic && (e = e.replace(R.tabCharGlobal, "    ").replace(R.spaceLine, "")); e; ) {
      let l;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((o) => (l = o.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1)) continue;
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
        let o = 1 / 0, u = e.slice(1), g;
        this.options.extensions.startBlock.forEach((h) => {
          g = h.call({ lexer: this }, u), typeof g == "number" && g >= 0 && (o = Math.min(o, g));
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
    var p, o, u, g, h;
    let s = e, r = null;
    if (this.tokens.links) {
      let c = Object.keys(this.tokens.links);
      if (c.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; ) c.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; ) s = s.slice(0, r.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; ) i = r[2] ? r[2].length : 0, s = s.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    s = ((o = (p = this.options.hooks) == null ? void 0 : p.emStrongMask) == null ? void 0 : o.call({ lexer: this }, s)) ?? s;
    let a = !1, l = "";
    for (; e; ) {
      a || (l = ""), a = !1;
      let c;
      if ((g = (u = this.options.extensions) == null ? void 0 : u.inline) != null && g.some((f) => (c = f.call({ lexer: this }, e, t)) ? (e = e.substring(c.raw.length), t.push(c), !0) : !1)) continue;
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
        let f = t.at(-1);
        c.type === "text" && (f == null ? void 0 : f.type) === "text" ? (f.raw += c.raw, f.text += c.text) : t.push(c);
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
      if ((h = this.options.extensions) != null && h.startInline) {
        let f = 1 / 0, b = e.slice(1), y;
        this.options.extensions.startInline.forEach((T) => {
          y = T.call({ lexer: this }, b), typeof y == "number" && y >= 0 && (f = Math.min(f, y));
        }), f < 1 / 0 && f >= 0 && (d = e.substring(0, f + 1));
      }
      if (c = this.tokenizer.inlineText(d)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (l = c.raw.slice(-1)), a = !0;
        let f = t.at(-1);
        (f == null ? void 0 : f.type) === "text" ? (f.raw += c.raw, f.text += c.text) : t.push(c);
        continue;
      }
      if (e) {
        let f = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(f);
          break;
        } else throw new Error(f);
      }
    }
    return t;
  }
}, J = class {
  constructor(n) {
    w(this, "options");
    w(this, "parser");
    this.options = n || B;
  }
  space(n) {
    return "";
  }
  code({ text: n, lang: e, escaped: t }) {
    var i;
    let s = (i = (e || "").match(R.notSpaceStart)) == null ? void 0 : i[0], r = n.replace(R.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + C(s) + '">' + (t ? r : C(r, !0)) + `</code></pre>
` : "<pre><code>" + (t ? r : C(r, !0)) + `</code></pre>
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
    for (let a = 0; a < n.items.length; a++) {
      let l = n.items[a];
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
      for (let a = 0; a < i.length; a++) t += this.tablecell(i[a]);
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
    return `<code>${C(n, !0)}</code>`;
  }
  br(n) {
    return "<br>";
  }
  del({ tokens: n }) {
    return `<del>${this.parser.parseInline(n)}</del>`;
  }
  link({ href: n, title: e, tokens: t }) {
    let s = this.parser.parseInline(t), r = Te(n);
    if (r === null) return s;
    n = r;
    let i = '<a href="' + n + '"';
    return e && (i += ' title="' + C(e) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: n, title: e, text: t, tokens: s }) {
    s && (t = this.parser.parseInline(s, this.parser.textRenderer));
    let r = Te(n);
    if (r === null) return C(t);
    n = r;
    let i = `<img src="${n}" alt="${t}"`;
    return e && (i += ` title="${C(e)}"`), i += ">", i;
  }
  text(n) {
    return "tokens" in n && n.tokens ? this.parser.parseInline(n.tokens) : "escaped" in n && n.escaped ? n.text : C(n.text);
  }
}, de = class {
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
}, v = class ae {
  constructor(e) {
    w(this, "options");
    w(this, "renderer");
    w(this, "textRenderer");
    this.options = e || B, this.options.renderer = this.options.renderer || new J(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new de();
  }
  static parse(e, t) {
    return new ae(t).parse(e);
  }
  static parseInline(e, t) {
    return new ae(t).parseInline(e);
  }
  parse(e) {
    var s, r;
    let t = "";
    for (let i = 0; i < e.length; i++) {
      let a = e[i];
      if ((r = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && r[a.type]) {
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
    var r, i;
    let s = "";
    for (let a = 0; a < e.length; a++) {
      let l = e[a];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[l.type]) {
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
}, H, M = (H = class {
  constructor(n) {
    w(this, "options");
    w(this, "block");
    this.options = n || B;
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
    return this.block ? A.lex : A.lexInline;
  }
  provideParser() {
    return this.block ? v.parse : v.parseInline;
  }
}, w(H, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), w(H, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), H), qt = class {
  constructor(...n) {
    w(this, "defaults", oe());
    w(this, "options", this.setOptions);
    w(this, "parse", this.parseMarkdown(!0));
    w(this, "parseInline", this.parseMarkdown(!1));
    w(this, "Parser", v);
    w(this, "Renderer", J);
    w(this, "TextRenderer", de);
    w(this, "Lexer", A);
    w(this, "Tokenizer", V);
    w(this, "Hooks", M);
    this.use(...n);
  }
  walkTokens(n, e) {
    var s, r;
    let t = [];
    for (let i of n) switch (t = t.concat(e.call(this, i)), i.type) {
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
        (r = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && r[a.type] ? this.defaults.extensions.childTokens[a.type].forEach((l) => {
          let p = a[l].flat(1 / 0);
          t = t.concat(this.walkTokens(p, e));
        }) : a.tokens && (t = t.concat(this.walkTokens(a.tokens, e)));
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
          i ? e.renderers[r.name] = function(...a) {
            let l = r.renderer.apply(this, a);
            return l === !1 && (l = i.apply(this, a)), l;
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
          let a = i, l = t.renderer[a], p = r[a];
          r[a] = (...o) => {
            let u = l.apply(r, o);
            return u === !1 && (u = p.apply(r, o)), u || "";
          };
        }
        s.renderer = r;
      }
      if (t.tokenizer) {
        let r = this.defaults.tokenizer || new V(this.defaults);
        for (let i in t.tokenizer) {
          if (!(i in r)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          let a = i, l = t.tokenizer[a], p = r[a];
          r[a] = (...o) => {
            let u = l.apply(r, o);
            return u === !1 && (u = p.apply(r, o)), u;
          };
        }
        s.tokenizer = r;
      }
      if (t.hooks) {
        let r = this.defaults.hooks || new M();
        for (let i in t.hooks) {
          if (!(i in r)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          let a = i, l = t.hooks[a], p = r[a];
          M.passThroughHooks.has(i) ? r[a] = (o) => {
            if (this.defaults.async && M.passThroughHooksRespectAsync.has(i)) return (async () => {
              let g = await l.call(r, o);
              return p.call(r, g);
            })();
            let u = l.call(r, o);
            return p.call(r, u);
          } : r[a] = (...o) => {
            if (this.defaults.async) return (async () => {
              let g = await l.apply(r, o);
              return g === !1 && (g = await p.apply(r, o)), g;
            })();
            let u = l.apply(r, o);
            return u === !1 && (u = p.apply(r, o)), u;
          };
        }
        s.hooks = r;
      }
      if (t.walkTokens) {
        let r = this.defaults.walkTokens, i = t.walkTokens;
        s.walkTokens = function(a) {
          let l = [];
          return l.push(i.call(this, a)), r && (l = l.concat(r.call(this, a))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(n) {
    return this.defaults = { ...this.defaults, ...n }, this;
  }
  lexer(n, e) {
    return A.lex(n, e ?? this.defaults);
  }
  parser(n, e) {
    return v.parse(n, e ?? this.defaults);
  }
  parseMarkdown(n) {
    return (e, t) => {
      let s = { ...t }, r = { ...this.defaults, ...s }, i = this.onError(!!r.silent, !!r.async);
      if (this.defaults.async === !0 && s.async === !1) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (r.hooks && (r.hooks.options = r, r.hooks.block = n), r.async) return (async () => {
        let a = r.hooks ? await r.hooks.preprocess(e) : e, l = await (r.hooks ? await r.hooks.provideLexer() : n ? A.lex : A.lexInline)(a, r), p = r.hooks ? await r.hooks.processAllTokens(l) : l;
        r.walkTokens && await Promise.all(this.walkTokens(p, r.walkTokens));
        let o = await (r.hooks ? await r.hooks.provideParser() : n ? v.parse : v.parseInline)(p, r);
        return r.hooks ? await r.hooks.postprocess(o) : o;
      })().catch(i);
      try {
        r.hooks && (e = r.hooks.preprocess(e));
        let a = (r.hooks ? r.hooks.provideLexer() : n ? A.lex : A.lexInline)(e, r);
        r.hooks && (a = r.hooks.processAllTokens(a)), r.walkTokens && this.walkTokens(a, r.walkTokens);
        let l = (r.hooks ? r.hooks.provideParser() : n ? v.parse : v.parseInline)(a, r);
        return r.hooks && (l = r.hooks.postprocess(l)), l;
      } catch (a) {
        return i(a);
      }
    };
  }
  onError(n, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, n) {
        let s = "<p>An error occurred:</p><pre>" + C(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, q = new qt();
function m(n, e) {
  return q.parse(n, e);
}
m.options = m.setOptions = function(n) {
  return q.setOptions(n), m.defaults = q.defaults, ve(m.defaults), m;
};
m.getDefaults = oe;
m.defaults = B;
m.use = function(...n) {
  return q.use(...n), m.defaults = q.defaults, ve(m.defaults), m;
};
m.walkTokens = function(n, e) {
  return q.walkTokens(n, e);
};
m.parseInline = q.parseInline;
m.Parser = v;
m.parser = v.parse;
m.Renderer = J;
m.TextRenderer = de;
m.Lexer = A;
m.lexer = A.lex;
m.Tokenizer = V;
m.Hooks = M;
m.parse = m;
m.options;
m.setOptions;
m.use;
m.walkTokens;
m.parseInline;
v.parse;
A.lex;
function Bt(n) {
  if (!n) return "";
  try {
    const e = m.parse(n, {
      gfm: !0,
      breaks: !1
    });
    return typeof e == "string" ? e : (console.warn("marked returned Promise, using fallback"), `<p>${n}</p>`);
  } catch (e) {
    return console.error("Markdown conversion failed:", e), `<p>${n.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  }
}
function Lt(n) {
  return {
    blocks: {
      contentData: [],
      settingsData: [],
      expose: [],
      Layout: {}
    },
    markup: n
  };
}
var X, W, K, D, Oe, Ue;
class Qt extends je {
  constructor(t, s) {
    super(t, s);
    N(this, D);
    N(this, X, new He(this));
    N(this, W, new Fe(this));
    N(this, K, new Ve(this));
  }
  async execute() {
    var r, i;
    const t = await this.getContext(Qe), s = this.args.unique ?? null;
    try {
      let a = null;
      if (s) {
        const { data: k } = await Q(this, K).requestItems([s]);
        k != null && k.length && (a = k[0].documentType.unique);
      }
      const p = (await Q(this, X).requestAllowedChildrenOf(
        a,
        s
      )).data;
      if (!((r = p == null ? void 0 : p.items) != null && r.length)) {
        t.peek("danger", {
          data: { message: "No document types are allowed as children of this page." }
        });
        return;
      }
      const o = [];
      for (const k of p.items) {
        const { data: $ } = await Q(this, W).requestItemsByDocumentType(k.unique);
        $ != null && $.length && o.push({
          documentTypeUnique: k.unique,
          documentTypeName: k.name,
          documentTypeIcon: k.icon ?? null,
          blueprints: $.map((P) => ({
            blueprintUnique: P.unique,
            blueprintName: P.name
          }))
        });
      }
      let u;
      try {
        u = await we(this, Xe, {
          data: { documentTypes: o }
        });
      } catch {
        return;
      }
      const { blueprintUnique: g, documentTypeUnique: h } = u, c = o.find((k) => k.documentTypeUnique === h), d = c == null ? void 0 : c.blueprints.find((k) => k.blueprintUnique === g);
      console.log("Selected blueprint:", g, "Document type:", h);
      let f;
      try {
        f = await we(this, Je, {
          data: {
            unique: s,
            blueprintName: (d == null ? void 0 : d.blueprintName) ?? "",
            blueprintId: g
          }
        });
      } catch {
        return;
      }
      const { name: b, mediaUnique: y, extractedSections: T, config: _ } = f;
      if (!y || !b || !_)
        return;
      console.log("Creating document with:", { name: b, sections: Object.keys(T) });
      const S = await (await this.getContext(Ge)).getLatestToken(), I = await fetch(
        `/umbraco/management/api/v1/document-blueprint/${g}/scaffold`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${S}`
          }
        }
      );
      if (!I.ok) {
        const k = await I.json();
        console.error("Scaffold failed:", k), t.peek("danger", {
          data: { message: `Failed to scaffold from blueprint: ${k.title || "Unknown error"}` }
        });
        return;
      }
      const z = await I.json();
      console.log("Scaffold response:", z), console.log("Scaffold values aliases:", (i = z.values) == null ? void 0 : i.map((k) => k.alias));
      const te = z.values ? JSON.parse(JSON.stringify(z.values)) : [];
      console.log("Extracted sections available:", Object.keys(T)), console.log("Mappings to apply:", _.map.mappings.map((k) => `${k.source} -> ${k.destinations.map(($) => $.target).join(", ")}`));
      for (const k of _.map.mappings) {
        if (k.enabled === !1) {
          console.log(`Skipping disabled mapping for source: ${k.source}`);
          continue;
        }
        const $ = T[k.source];
        if (!$) {
          console.log(`No extracted value for source: "${k.source}"`);
          continue;
        }
        console.log(`Applying mapping for "${k.source}" (${$.length} chars)`);
        for (const P of k.destinations)
          se(this, D, Oe).call(this, te, P, $, _);
      }
      console.log("Values after all mappings applied:");
      for (const k of te) {
        const $ = typeof k.value == "string" ? k.value.substring(0, 60) : typeof k.value == "object" ? "[object]" : k.value;
        console.log(`  ${k.alias}: ${$}`);
      }
      const be = {
        parent: s ? { id: s } : null,
        documentType: { id: h },
        template: z.template ? { id: z.template.id } : null,
        values: te,
        variants: [
          {
            name: b,
            culture: null,
            segment: null
          }
        ]
      };
      console.log("Create request:", JSON.stringify(be, null, 2));
      const ne = await fetch("/umbraco/management/api/v1/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${S}`
        },
        body: JSON.stringify(be)
      });
      if (!ne.ok) {
        const k = await ne.json();
        console.error("Document creation failed:", k), t.peek("danger", {
          data: { message: `Failed to create document: ${k.title || k.detail || "Unknown error"}` }
        });
        return;
      }
      const re = ne.headers.get("Location"), E = re == null ? void 0 : re.split("/").pop();
      if (console.log("Document created successfully! ID:", E), E) {
        const k = await fetch(`/umbraco/management/api/v1/document/${E}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${S}`
          }
        });
        if (k.ok) {
          const $ = await k.json();
          console.log("Fetched document for save:", $);
          const P = await fetch(`/umbraco/management/api/v1/document/${E}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${S}`
            },
            body: JSON.stringify($)
          });
          P.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await P.text());
        } else
          console.warn("Could not fetch document for save:", await k.text());
      }
      if (t.peek("positive", {
        data: { message: `Document "${b}" created successfully!` }
      }), E) {
        const k = `/umbraco/section/content/workspace/document/edit/${E}`;
        setTimeout(() => {
          window.location.href = k;
        }, 150);
      }
    } catch (a) {
      console.error("Error creating document:", a), t.peek("danger", {
        data: { message: "An unexpected error occurred while creating the document." }
      });
    }
  }
}
X = new WeakMap(), W = new WeakMap(), K = new WeakMap(), D = new WeakSet(), /**
 * Applies a single destination mapping from the config.
 * Handles both simple field mappings and block grid mappings.
 */
Oe = function(t, s, r, i) {
  var o, u, g, h;
  let a = r;
  const l = (o = s.transforms) == null ? void 0 : o.some((c) => c.type === "convertMarkdownToHtml"), p = s.target.split(".");
  if (p.length === 1) {
    const c = p[0], d = t.find((f) => f.alias === c);
    d ? d.value = a : t.push({ alias: c, value: a }), console.log(`Set ${c} = "${a.substring(0, 50)}..."`);
  } else if (p.length === 3) {
    const [c, d, f] = p, b = (u = i.destination.blockGrids) == null ? void 0 : u.find((S) => S.key === c), y = b == null ? void 0 : b.blocks.find((S) => S.key === d);
    if (!b || !y) {
      console.log(`Block path ${s.target} not found in destination config`);
      return;
    }
    const T = b.alias, _ = ((h = (g = y.properties) == null ? void 0 : g.find((S) => S.key === f)) == null ? void 0 : h.alias) ?? f, L = y.identifyBy;
    if (!L) {
      console.log(`No identifyBy for block ${d}`);
      return;
    }
    se(this, D, Ue).call(this, t, T, L, _, a, l);
  }
}, /**
 * Applies a value to a property within a block grid.
 * Finds the block by searching for a property value match.
 */
Ue = function(t, s, r, i, a, l) {
  var o, u;
  const p = t.find((g) => g.alias === s);
  if (!p || !p.value) {
    console.log(`No ${s} found in scaffold values`);
    return;
  }
  try {
    const g = typeof p.value == "string", h = g ? JSON.parse(p.value) : p.value, c = h.contentData;
    if (!c) {
      console.log(`No contentData in ${s}`);
      return;
    }
    let d = !1;
    for (const f of c) {
      const b = (o = f.values) == null ? void 0 : o.find((y) => y.alias === r.property);
      if (b && typeof b.value == "string" && b.value.toLowerCase().includes(r.value.toLowerCase())) {
        console.log(`Found matching block for "${r.value}":`, f.key), d = !0;
        const y = (u = f.values) == null ? void 0 : u.find((T) => T.alias === i);
        if (y) {
          if (l) {
            const T = Bt(a);
            y.value = Lt(T);
          } else
            y.value = a;
          console.log(`Updated ${i} in block`);
        }
        break;
      }
    }
    d || console.log(`WARNING: Did not find a block matching ${r.property} = "${r.value}"`), p.value = g ? JSON.stringify(h) : h;
  } catch (g) {
    console.error(`Failed to apply block mapping to ${s}:`, g);
  }
};
export {
  Qt as UpDocEntityAction,
  Qt as default
};
//# sourceMappingURL=up-doc-action-BcM3AAF9.js.map
