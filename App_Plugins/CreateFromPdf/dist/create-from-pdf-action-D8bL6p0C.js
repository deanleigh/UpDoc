var Oe = Object.defineProperty;
var fe = (r) => {
  throw TypeError(r);
};
var Ne = (r, e, t) => e in r ? Oe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var b = (r, e, t) => Ne(r, typeof e != "symbol" ? e + "" : e, t), xe = (r, e, t) => e.has(r) || fe("Cannot " + t);
var U = (r, e, t) => (xe(r, e, "read from private field"), t ? t.call(r) : e.get(r)), O = (r, e, t) => e.has(r) ? fe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t);
var ne = (r, e, t) => (xe(r, e, "access private method"), t);
import { UmbModalToken as Me, umbOpenModal as Ge } from "@umbraco-cms/backoffice/modal";
import { UmbEntityActionBase as Ze } from "@umbraco-cms/backoffice/entity-action";
import { UMB_NOTIFICATION_CONTEXT as je } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as Ue } from "@umbraco-cms/backoffice/auth";
import { UmbDocumentTypeStructureRepository as Fe } from "@umbraco-cms/backoffice/document-type";
import { UmbDocumentBlueprintItemRepository as Qe } from "@umbraco-cms/backoffice/document-blueprint";
import { UmbDocumentItemRepository as He } from "@umbraco-cms/backoffice/document";
const Xe = new Me(
  "CreateFromPdf.Modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
function ae() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var I = ae();
function Re(r) {
  I = r;
}
var Z = { exec: () => null };
function f(r, e = "") {
  let t = typeof r == "string" ? r : r.source, s = { replace: (n, i) => {
    let o = typeof i == "string" ? i : i.source;
    return o = o.replace(y.caret, "$1"), t = t.replace(n, o), s;
  }, getRegex: () => new RegExp(t, e) };
  return s;
}
var We = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), y = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}#`), htmlBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}<(?:[a-z].*>|!--)`, "i") }, Je = /^(?:[ \t]*(?:\n|$))+/, Ke = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ve = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, j = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ye = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, oe = /(?:[*+-]|\d{1,9}[.)])/, Se = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ae = f(Se).replace(/bull/g, oe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), et = f(Se).replace(/bull/g, oe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ce = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, tt = /^[^\n]+/, he = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, rt = f(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", he).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), nt = f(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, oe).getRegex(), Y = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", pe = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, st = f("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", pe).replace("tag", Y).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ze = f(ce).replace("hr", j).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Y).getRegex(), lt = f(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ze).getRegex(), ue = { blockquote: lt, code: Ke, def: rt, fences: Ve, heading: Ye, hr: j, html: st, lheading: Ae, list: nt, newline: Je, paragraph: ze, table: Z, text: tt }, be = f("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", j).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Y).getRegex(), it = { ...ue, lheading: et, table: be, paragraph: f(ce).replace("hr", j).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", be).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Y).getRegex() }, at = { ...ue, html: f(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", pe).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Z, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: f(ce).replace("hr", j).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ae).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, ot = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ct = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ve = /^( {2,}|\\)\n(?!\s*$)/, ht = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ee = /[\p{P}\p{S}]/u, ge = /[\s\p{P}\p{S}]/u, Ce = /[^\s\p{P}\p{S}]/u, pt = f(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ge).getRegex(), _e = /(?!~)[\p{P}\p{S}]/u, ut = /(?!~)[\s\p{P}\p{S}]/u, gt = /(?:[^\s\p{P}\p{S}]|~)/u, dt = f(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", We ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Pe = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, kt = f(Pe, "u").replace(/punct/g, ee).getRegex(), ft = f(Pe, "u").replace(/punct/g, _e).getRegex(), Ie = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", xt = f(Ie, "gu").replace(/notPunctSpace/g, Ce).replace(/punctSpace/g, ge).replace(/punct/g, ee).getRegex(), bt = f(Ie, "gu").replace(/notPunctSpace/g, gt).replace(/punctSpace/g, ut).replace(/punct/g, _e).getRegex(), mt = f("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Ce).replace(/punctSpace/g, ge).replace(/punct/g, ee).getRegex(), wt = f(/\\(punct)/, "gu").replace(/punct/g, ee).getRegex(), yt = f(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Tt = f(pe).replace("(?:-->|$)", "-->").getRegex(), $t = f("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Tt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), H = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, Rt = f(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", H).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), qe = f(/^!?\[(label)\]\[(ref)\]/).replace("label", H).replace("ref", he).getRegex(), Be = f(/^!?\[(ref)\](?:\[\])?/).replace("ref", he).getRegex(), St = f("reflink|nolink(?!\\()", "g").replace("reflink", qe).replace("nolink", Be).getRegex(), me = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, de = { _backpedal: Z, anyPunctuation: wt, autolink: yt, blockSkip: dt, br: ve, code: ct, del: Z, emStrongLDelim: kt, emStrongRDelimAst: xt, emStrongRDelimUnd: mt, escape: ot, link: Rt, nolink: Be, punctuation: pt, reflink: qe, reflinkSearch: St, tag: $t, text: ht, url: Z }, At = { ...de, link: f(/^!?\[(label)\]\((.*?)\)/).replace("label", H).getRegex(), reflink: f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", H).getRegex() }, se = { ...de, emStrongRDelimAst: bt, emStrongLDelim: ft, url: f(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", me).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: f(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", me).getRegex() }, zt = { ...se, br: f(ve).replace("{2,}", "*").getRegex(), text: f(se.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, F = { normal: ue, gfm: it, pedantic: at }, N = { normal: de, gfm: se, breaks: zt, pedantic: At }, vt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, we = (r) => vt[r];
function z(r, e) {
  if (e) {
    if (y.escapeTest.test(r)) return r.replace(y.escapeReplace, we);
  } else if (y.escapeTestNoEncode.test(r)) return r.replace(y.escapeReplaceNoEncode, we);
  return r;
}
function ye(r) {
  try {
    r = encodeURI(r).replace(y.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function Te(r, e) {
  var i;
  let t = r.replace(y.findPipe, (o, l, p) => {
    let a = !1, h = l;
    for (; --h >= 0 && p[h] === "\\"; ) a = !a;
    return a ? "|" : " |";
  }), s = t.split(y.splitPipe), n = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), e) if (s.length > e) s.splice(e);
  else for (; s.length < e; ) s.push("");
  for (; n < s.length; n++) s[n] = s[n].trim().replace(y.slashPipe, "|");
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
function $e(r, e, t, s, n) {
  let i = e.href, o = e.title || null, l = r[1].replace(n.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  let p = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: o, text: l, tokens: s.inlineTokens(l) };
  return s.state.inLink = !1, p;
}
function _t(r, e, t) {
  let s = r.match(t.other.indentCodeCompensation);
  if (s === null) return e;
  let n = s[1];
  return e.split(`
`).map((i) => {
    let o = i.match(t.other.beginningSpace);
    if (o === null) return i;
    let [l] = o;
    return l.length >= n.length ? i.slice(n.length) : i;
  }).join(`
`);
}
var X = class {
  constructor(r) {
    b(this, "options");
    b(this, "rules");
    b(this, "lexer");
    this.options = r || I;
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
      let t = e[0], s = _t(t, e[3] || "", this.rules);
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
        let o = !1, l = [], p;
        for (p = 0; p < t.length; p++) if (this.rules.other.blockquoteStart.test(t[p])) l.push(t[p]), o = !0;
        else if (!o) l.push(t[p]);
        else break;
        t = t.slice(p);
        let a = l.join(`
`), h = a.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${a}` : a, n = n ? `${n}
${h}` : h;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(h, i, !0), this.lexer.state.top = d, t.length === 0) break;
        let u = i.at(-1);
        if ((u == null ? void 0 : u.type) === "code") break;
        if ((u == null ? void 0 : u.type) === "blockquote") {
          let c = u, k = c.raw + `
` + t.join(`
`), g = this.blockquote(k);
          i[i.length - 1] = g, s = s.substring(0, s.length - c.raw.length) + g.raw, n = n.substring(0, n.length - c.text.length) + g.text;
          break;
        } else if ((u == null ? void 0 : u.type) === "list") {
          let c = u, k = c.raw + `
` + t.join(`
`), g = this.list(k);
          i[i.length - 1] = g, s = s.substring(0, s.length - u.raw.length) + g.raw, n = n.substring(0, n.length - c.raw.length) + g.raw, t = k.substring(i.at(-1).raw.length).split(`
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
      let n = e[1].trim(), i = n.length > 1, o = { type: "list", raw: "", ordered: i, start: i ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
      let l = this.rules.other.listItemRegex(n), p = !1;
      for (; r; ) {
        let h = !1, d = "", u = "";
        if (!(e = l.exec(r)) || this.rules.block.hr.test(r)) break;
        d = e[0], r = r.substring(d.length);
        let c = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (S) => " ".repeat(3 * S.length)), k = r.split(`
`, 1)[0], g = !c.trim(), m = 0;
        if (this.options.pedantic ? (m = 2, u = c.trimStart()) : g ? m = e[1].length + 1 : (m = e[2].search(this.rules.other.nonSpaceChar), m = m > 4 ? 1 : m, u = c.slice(m), m += e[1].length), g && this.rules.other.blankLine.test(k) && (d += k + `
`, r = r.substring(k.length + 1), h = !0), !h) {
          let S = this.rules.other.nextBulletRegex(m), A = this.rules.other.hrRegex(m), q = this.rules.other.fencesBeginRegex(m), v = this.rules.other.headingBeginRegex(m), B = this.rules.other.htmlBeginRegex(m);
          for (; r; ) {
            let _ = r.split(`
`, 1)[0], C;
            if (k = _, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), C = k) : C = k.replace(this.rules.other.tabCharGlobal, "    "), q.test(k) || v.test(k) || B.test(k) || S.test(k) || A.test(k)) break;
            if (C.search(this.rules.other.nonSpaceChar) >= m || !k.trim()) u += `
` + C.slice(m);
            else {
              if (g || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || q.test(c) || v.test(c) || A.test(c)) break;
              u += `
` + k;
            }
            !g && !k.trim() && (g = !0), d += _ + `
`, r = r.substring(_.length + 1), c = C.slice(m);
          }
        }
        o.loose || (p ? o.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (p = !0)), o.items.push({ type: "list_item", raw: d, task: !!this.options.gfm && this.rules.other.listIsTask.test(u), loose: !1, text: u, tokens: [] }), o.raw += d;
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
          let d = this.rules.other.listTaskCheckbox.exec(h.raw);
          if (d) {
            let u = { type: "checkbox", raw: d[0] + " ", checked: d[0] !== "[ ]" };
            h.checked = u.checked, o.loose ? h.tokens[0] && ["paragraph", "text"].includes(h.tokens[0].type) && "tokens" in h.tokens[0] && h.tokens[0].tokens ? (h.tokens[0].raw = u.raw + h.tokens[0].raw, h.tokens[0].text = u.raw + h.tokens[0].text, h.tokens[0].tokens.unshift(u)) : h.tokens.unshift({ type: "paragraph", raw: u.raw, text: u.raw, tokens: [u] }) : h.tokens.unshift(u);
          }
        }
        if (!o.loose) {
          let d = h.tokens.filter((c) => c.type === "space"), u = d.length > 0 && d.some((c) => this.rules.other.anyLine.test(c.raw));
          o.loose = u;
        }
      }
      if (o.loose) for (let h of o.items) {
        h.loose = !0;
        for (let d of h.tokens) d.type === "text" && (d.type = "paragraph");
      }
      return o;
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
    var o;
    let e = this.rules.block.table.exec(r);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = Te(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = (o = e[3]) != null && o.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (t.length === s.length) {
      for (let l of s) this.rules.other.tableAlignRight.test(l) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? i.align.push("left") : i.align.push(null);
      for (let l = 0; l < t.length; l++) i.header.push({ text: t[l], tokens: this.lexer.inline(t[l]), header: !0, align: i.align[l] });
      for (let l of n) i.rows.push(Te(l, i.header.length).map((p, a) => ({ text: p, tokens: this.lexer.inline(p), header: !1, align: i.align[a] })));
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
          let o = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, o).trim(), e[3] = "";
        }
      }
      let s = e[2], n = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(s);
        i && (s = i[1], n = i[3]);
      } else n = e[3] ? e[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? s = s.slice(1) : s = s.slice(1, -1)), $e(e, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: n && n.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
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
      return $e(t, n, t[0], this.lexer, this.rules);
    }
  }
  emStrong(r, e, t = "") {
    let s = this.rules.inline.emStrongLDelim.exec(r);
    if (!(!s || s[3] && t.match(this.rules.other.unicodeAlphaNumeric)) && (!(s[1] || s[2]) || !t || this.rules.inline.punctuation.exec(t))) {
      let n = [...s[0]].length - 1, i, o, l = n, p = 0, a = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (a.lastIndex = 0, e = e.slice(-1 * r.length + n); (s = a.exec(e)) != null; ) {
        if (i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !i) continue;
        if (o = [...i].length, s[3] || s[4]) {
          l += o;
          continue;
        } else if ((s[5] || s[6]) && n % 3 && !((n + o) % 3)) {
          p += o;
          continue;
        }
        if (l -= o, l > 0) continue;
        o = Math.min(o, o + l + p);
        let h = [...s[0]][0].length, d = r.slice(0, n + s.index + h + o);
        if (Math.min(n, o) % 2) {
          let c = d.slice(1, -1);
          return { type: "em", raw: d, text: c, tokens: this.lexer.inlineTokens(c) };
        }
        let u = d.slice(2, -2);
        return { type: "strong", raw: d, text: u, tokens: this.lexer.inlineTokens(u) };
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
}, T = class le {
  constructor(e) {
    b(this, "tokens");
    b(this, "options");
    b(this, "state");
    b(this, "inlineQueue");
    b(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || I, this.options.tokenizer = this.options.tokenizer || new X(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let t = { other: y, block: F.normal, inline: N.normal };
    this.options.pedantic ? (t.block = F.pedantic, t.inline = N.pedantic) : this.options.gfm && (t.block = F.gfm, this.options.breaks ? t.inline = N.breaks : t.inline = N.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: F, inline: N };
  }
  static lex(e, t) {
    return new le(t).lex(e);
  }
  static lexInline(e, t) {
    return new le(t).inlineTokens(e);
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
    var n, i, o;
    for (this.options.pedantic && (e = e.replace(y.tabCharGlobal, "    ").replace(y.spaceLine, "")); e; ) {
      let l;
      if ((i = (n = this.options.extensions) == null ? void 0 : n.block) != null && i.some((a) => (l = a.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1)) continue;
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
        let a = 1 / 0, h = e.slice(1), d;
        this.options.extensions.startBlock.forEach((u) => {
          d = u.call({ lexer: this }, h), typeof d == "number" && d >= 0 && (a = Math.min(a, d));
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
    var p, a, h, d, u;
    let s = e, n = null;
    if (this.tokens.links) {
      let c = Object.keys(this.tokens.links);
      if (c.length > 0) for (; (n = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; ) c.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (n = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; ) s = s.slice(0, n.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (n = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; ) i = n[2] ? n[2].length : 0, s = s.slice(0, n.index + i) + "[" + "a".repeat(n[0].length - i - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    s = ((a = (p = this.options.hooks) == null ? void 0 : p.emStrongMask) == null ? void 0 : a.call({ lexer: this }, s)) ?? s;
    let o = !1, l = "";
    for (; e; ) {
      o || (l = ""), o = !1;
      let c;
      if ((d = (h = this.options.extensions) == null ? void 0 : h.inline) != null && d.some((g) => (c = g.call({ lexer: this }, e, t)) ? (e = e.substring(c.raw.length), t.push(c), !0) : !1)) continue;
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
      let k = e;
      if ((u = this.options.extensions) != null && u.startInline) {
        let g = 1 / 0, m = e.slice(1), S;
        this.options.extensions.startInline.forEach((A) => {
          S = A.call({ lexer: this }, m), typeof S == "number" && S >= 0 && (g = Math.min(g, S));
        }), g < 1 / 0 && g >= 0 && (k = e.substring(0, g + 1));
      }
      if (c = this.tokenizer.inlineText(k)) {
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
}, W = class {
  constructor(r) {
    b(this, "options");
    b(this, "parser");
    this.options = r || I;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: e, escaped: t }) {
    var i;
    let s = (i = (e || "").match(y.notSpaceStart)) == null ? void 0 : i[0], n = r.replace(y.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + z(s) + '">' + (t ? n : z(n, !0)) + `</code></pre>
` : "<pre><code>" + (t ? n : z(n, !0)) + `</code></pre>
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
    for (let o = 0; o < r.items.length; o++) {
      let l = r.items[o];
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
      for (let o = 0; o < i.length; o++) t += this.tablecell(i[o]);
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
    return `<code>${z(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: e, tokens: t }) {
    let s = this.parser.parseInline(t), n = ye(r);
    if (n === null) return s;
    r = n;
    let i = '<a href="' + r + '"';
    return e && (i += ' title="' + z(e) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: r, title: e, text: t, tokens: s }) {
    s && (t = this.parser.parseInline(s, this.parser.textRenderer));
    let n = ye(r);
    if (n === null) return z(t);
    r = n;
    let i = `<img src="${r}" alt="${t}"`;
    return e && (i += ` title="${z(e)}"`), i += ">", i;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : z(r.text);
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
}, $ = class ie {
  constructor(e) {
    b(this, "options");
    b(this, "renderer");
    b(this, "textRenderer");
    this.options = e || I, this.options.renderer = this.options.renderer || new W(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ke();
  }
  static parse(e, t) {
    return new ie(t).parse(e);
  }
  static parseInline(e, t) {
    return new ie(t).parseInline(e);
  }
  parse(e) {
    var s, n;
    let t = "";
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if ((n = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && n[o.type]) {
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
    var n, i;
    let s = "";
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if ((i = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && i[l.type]) {
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
}, Q, G = (Q = class {
  constructor(r) {
    b(this, "options");
    b(this, "block");
    this.options = r || I;
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
    return this.block ? T.lex : T.lexInline;
  }
  provideParser() {
    return this.block ? $.parse : $.parseInline;
  }
}, b(Q, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), b(Q, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Q), Pt = class {
  constructor(...r) {
    b(this, "defaults", ae());
    b(this, "options", this.setOptions);
    b(this, "parse", this.parseMarkdown(!0));
    b(this, "parseInline", this.parseMarkdown(!1));
    b(this, "Parser", $);
    b(this, "Renderer", W);
    b(this, "TextRenderer", ke);
    b(this, "Lexer", T);
    b(this, "Tokenizer", X);
    b(this, "Hooks", G);
    this.use(...r);
  }
  walkTokens(r, e) {
    var s, n;
    let t = [];
    for (let i of r) switch (t = t.concat(e.call(this, i)), i.type) {
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
        (n = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && n[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((l) => {
          let p = o[l].flat(1 / 0);
          t = t.concat(this.walkTokens(p, e));
        }) : o.tokens && (t = t.concat(this.walkTokens(o.tokens, e)));
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
          i ? e.renderers[n.name] = function(...o) {
            let l = n.renderer.apply(this, o);
            return l === !1 && (l = i.apply(this, o)), l;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let i = e[n.level];
          i ? i.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), s.extensions = e), t.renderer) {
        let n = this.defaults.renderer || new W(this.defaults);
        for (let i in t.renderer) {
          if (!(i in n)) throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i)) continue;
          let o = i, l = t.renderer[o], p = n[o];
          n[o] = (...a) => {
            let h = l.apply(n, a);
            return h === !1 && (h = p.apply(n, a)), h || "";
          };
        }
        s.renderer = n;
      }
      if (t.tokenizer) {
        let n = this.defaults.tokenizer || new X(this.defaults);
        for (let i in t.tokenizer) {
          if (!(i in n)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          let o = i, l = t.tokenizer[o], p = n[o];
          n[o] = (...a) => {
            let h = l.apply(n, a);
            return h === !1 && (h = p.apply(n, a)), h;
          };
        }
        s.tokenizer = n;
      }
      if (t.hooks) {
        let n = this.defaults.hooks || new G();
        for (let i in t.hooks) {
          if (!(i in n)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          let o = i, l = t.hooks[o], p = n[o];
          G.passThroughHooks.has(i) ? n[o] = (a) => {
            if (this.defaults.async && G.passThroughHooksRespectAsync.has(i)) return (async () => {
              let d = await l.call(n, a);
              return p.call(n, d);
            })();
            let h = l.call(n, a);
            return p.call(n, h);
          } : n[o] = (...a) => {
            if (this.defaults.async) return (async () => {
              let d = await l.apply(n, a);
              return d === !1 && (d = await p.apply(n, a)), d;
            })();
            let h = l.apply(n, a);
            return h === !1 && (h = p.apply(n, a)), h;
          };
        }
        s.hooks = n;
      }
      if (t.walkTokens) {
        let n = this.defaults.walkTokens, i = t.walkTokens;
        s.walkTokens = function(o) {
          let l = [];
          return l.push(i.call(this, o)), n && (l = l.concat(n.call(this, o))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, e) {
    return T.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return $.parse(r, e ?? this.defaults);
  }
  parseMarkdown(r) {
    return (e, t) => {
      let s = { ...t }, n = { ...this.defaults, ...s }, i = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && s.async === !1) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (n.hooks && (n.hooks.options = n, n.hooks.block = r), n.async) return (async () => {
        let o = n.hooks ? await n.hooks.preprocess(e) : e, l = await (n.hooks ? await n.hooks.provideLexer() : r ? T.lex : T.lexInline)(o, n), p = n.hooks ? await n.hooks.processAllTokens(l) : l;
        n.walkTokens && await Promise.all(this.walkTokens(p, n.walkTokens));
        let a = await (n.hooks ? await n.hooks.provideParser() : r ? $.parse : $.parseInline)(p, n);
        return n.hooks ? await n.hooks.postprocess(a) : a;
      })().catch(i);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let o = (n.hooks ? n.hooks.provideLexer() : r ? T.lex : T.lexInline)(e, n);
        n.hooks && (o = n.hooks.processAllTokens(o)), n.walkTokens && this.walkTokens(o, n.walkTokens);
        let l = (n.hooks ? n.hooks.provideParser() : r ? $.parse : $.parseInline)(o, n);
        return n.hooks && (l = n.hooks.postprocess(l)), l;
      } catch (o) {
        return i(o);
      }
    };
  }
  onError(r, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let s = "<p>An error occurred:</p><pre>" + z(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, P = new Pt();
function x(r, e) {
  return P.parse(r, e);
}
x.options = x.setOptions = function(r) {
  return P.setOptions(r), x.defaults = P.defaults, Re(x.defaults), x;
};
x.getDefaults = ae;
x.defaults = I;
x.use = function(...r) {
  return P.use(...r), x.defaults = P.defaults, Re(x.defaults), x;
};
x.walkTokens = function(r, e) {
  return P.walkTokens(r, e);
};
x.parseInline = P.parseInline;
x.Parser = $;
x.parser = $.parse;
x.Renderer = W;
x.TextRenderer = ke;
x.Lexer = T;
x.lexer = T.lex;
x.Tokenizer = X;
x.Hooks = G;
x.parse = x;
x.options;
x.setOptions;
x.use;
x.walkTokens;
x.parseInline;
$.parse;
T.lex;
var J, K, V, L, Ee, Le;
class Mt extends Ze {
  constructor(t, s) {
    super(t, s);
    O(this, L);
    O(this, J, new Fe(this));
    O(this, K, new Qe(this));
    O(this, V, new He(this));
  }
  async execute() {
    var d;
    const t = await this.getContext(je), s = this.args.unique ?? null;
    let n;
    try {
      n = await Ge(this, Xe, {
        data: { unique: s }
      });
    } catch {
      return;
    }
    const { name: i, mediaUnique: o, pageTitle: l, pageTitleShort: p, pageDescription: a, itineraryContent: h } = n;
    if (!(!o || !i)) {
      console.log("Creating document with:", { name: i, pageTitle: l, pageTitleShort: p, pageDescription: a, itineraryContent: h == null ? void 0 : h.substring(0, 100) });
      try {
        let u = null;
        if (s) {
          console.log("Getting parent document info for:", s);
          const { data: w } = await U(this, V).requestItems([s]);
          console.log("Parent items:", w), w != null && w.length && (u = w[0].documentType.unique, console.log("Parent document type unique:", u));
        }
        console.log("Getting allowed children for docType:", u, "parent:", s);
        const c = await U(this, J).requestAllowedChildrenOf(
          u,
          s
        );
        console.log("Full result from requestAllowedChildrenOf:", c);
        const k = c.data;
        if (console.log("Allowed types data:", k), !((d = k == null ? void 0 : k.items) != null && d.length)) {
          console.log("No allowed types found, items:", k == null ? void 0 : k.items), t.peek("danger", {
            data: { message: "No document types are allowed as children of this page." }
          });
          return;
        }
        console.log("Allowed document types:", k.items);
        let g = null, m = null;
        for (const w of k.items) {
          const { data: R } = await U(this, K).requestItemsByDocumentType(w.unique);
          if (R != null && R.length) {
            g = R[0], m = w.unique;
            break;
          }
        }
        if (!g) {
          t.peek("danger", {
            data: { message: "No blueprint found for allowed document types. Please create a blueprint first." }
          });
          return;
        }
        console.log("Using blueprint:", g.name, g.unique), console.log("Document type:", m);
        const A = await (await this.getContext(Ue)).getLatestToken(), q = await fetch(
          `/umbraco/management/api/v1/document-blueprint/${g.unique}/scaffold`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${A}`
            }
          }
        );
        if (!q.ok) {
          const w = await q.json();
          console.error("Scaffold failed:", w), t.peek("danger", {
            data: { message: `Failed to scaffold from blueprint: ${w.title || "Unknown error"}` }
          });
          return;
        }
        const v = await q.json();
        console.log("Scaffold response:", v);
        const B = v.values ? [...v.values] : [], _ = (w, R) => {
          const D = B.find((De) => De.alias === w);
          D ? D.value = R : B.push({ alias: w, value: R });
        };
        _("pageTitle", l), _("pageTitleShort", p), _("pageDescription", a), h && ne(this, L, Ee).call(this, B, h);
        const C = {
          parent: s ? { id: s } : null,
          documentType: { id: m },
          template: v.template ? { id: v.template.id } : null,
          values: B,
          variants: [
            {
              name: i,
              culture: null,
              segment: null
            }
          ]
        };
        console.log("Create request:", JSON.stringify(C, null, 2));
        const te = await fetch("/umbraco/management/api/v1/document", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${A}`
          },
          body: JSON.stringify(C)
        });
        if (!te.ok) {
          const w = await te.json();
          console.error("Document creation failed:", w), t.peek("danger", {
            data: { message: `Failed to create document: ${w.title || w.detail || "Unknown error"}` }
          });
          return;
        }
        const re = te.headers.get("Location"), E = re == null ? void 0 : re.split("/").pop();
        if (console.log("Document created successfully! ID:", E), E) {
          const w = await fetch(`/umbraco/management/api/v1/document/${E}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${A}`
            }
          });
          if (w.ok) {
            const R = await w.json();
            console.log("Fetched document for save:", R);
            const D = await fetch(`/umbraco/management/api/v1/document/${E}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${A}`
              },
              body: JSON.stringify(R)
            });
            D.ok ? console.log("Document saved successfully") : console.warn("Document save failed, but document was created:", await D.text());
          } else
            console.warn("Could not fetch document for save:", await w.text());
        }
        if (t.peek("positive", {
          data: { message: `Document "${i}" created successfully!` }
        }), E) {
          const w = `/umbraco/section/content/workspace/document/edit/${E}`;
          setTimeout(() => {
            window.location.href = w;
          }, 150);
        }
      } catch (u) {
        console.error("Error creating document:", u), t.peek("danger", {
          data: { message: "An unexpected error occurred while creating the document." }
        });
      }
    }
  }
}
J = new WeakMap(), K = new WeakMap(), V = new WeakMap(), L = new WeakSet(), /**
 * Updates the contentGrid value to replace the "Suggested Itinerary" RTE content
 */
Ee = function(t, s) {
  var i, o, l, p;
  const n = t.find((a) => a.alias === "contentGrid");
  if (!n || !n.value) {
    console.log("No contentGrid found in scaffold values");
    return;
  }
  try {
    const a = typeof n.value == "string";
    console.log("contentGrid original type:", a ? "string" : "object");
    const h = a ? JSON.parse(n.value) : n.value;
    console.log("Parsed contentGrid:", h), console.log("contentData length:", (i = h.contentData) == null ? void 0 : i.length);
    const d = h.contentData;
    if (!d) {
      console.log("No contentData in contentGrid");
      return;
    }
    let u = !1;
    for (const c of d) {
      console.log("Checking block:", c.key, "contentTypeKey:", c.contentTypeKey), console.log("Block values:", (o = c.values) == null ? void 0 : o.map((g) => ({ alias: g.alias, value: typeof g.value == "object" ? "[object]" : g.value })));
      const k = (l = c.values) == null ? void 0 : l.find((g) => g.alias === "featurePropertyFeatureTitle");
      if (console.log("Title value for block:", k == null ? void 0 : k.value), k && typeof k.value == "string" && k.value.toLowerCase().includes("suggested itinerary")) {
        console.log("Found Suggested Itinerary block:", c.key), u = !0;
        const g = (p = c.values) == null ? void 0 : p.find((m) => m.alias === "richTextContent");
        if (g) {
          const m = ne(this, L, Le).call(this, s);
          g.value = {
            blocks: {
              contentData: [],
              settingsData: [],
              expose: [],
              Layout: {}
            },
            markup: m
          }, console.log("Updated richTextContent with itinerary");
        }
        break;
      }
    }
    u || console.log('WARNING: Did not find a block with featurePropertyFeatureTitle containing "suggested itinerary"'), n.value = a ? JSON.stringify(h) : h, console.log("ContentGrid updated successfully (stringified:", a, ")");
  } catch (a) {
    console.error("Failed to update contentGrid:", a);
  }
}, /**
 * Converts Markdown to HTML using marked library
 */
Le = function(t) {
  if (!t) return "";
  try {
    const s = x.parse(t, {
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
  Mt as CreateFromPdfEntityAction,
  Mt as default
};
//# sourceMappingURL=create-from-pdf-action-D8bL6p0C.js.map
