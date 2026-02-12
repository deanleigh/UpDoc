var nt = Object.defineProperty;
var rt = (t, e, s) => e in t ? nt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var w = (t, e, s) => rt(t, typeof e != "symbol" ? e + "" : e, s);
import { c as it, d as Ce, b as at, g as lt, h as ot, i as ct, s as ut, u as pt } from "./workflow.service-CD2_oFgA.js";
import { UmbModalToken as ht, UMB_MODAL_MANAGER_CONTEXT as Ee } from "@umbraco-cms/backoffice/modal";
import { html as x, nothing as z, css as dt, state as A, customElement as gt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as ft } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as kt } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as Pe } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as bt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as mt } from "@umbraco-cms/backoffice/media";
function ae() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var D = ae();
function Me(t) {
  D = t;
}
var Z = { exec: () => null };
function b(t, e = "") {
  let s = typeof t == "string" ? t : t.source, r = { replace: (n, a) => {
    let l = typeof a == "string" ? a : a.source;
    return l = l.replace(y.caret, "$1"), s = s.replace(n, l), r;
  }, getRegex: () => new RegExp(s, e) };
  return r;
}
var xt = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), y = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, wt = /^(?:[ \t]*(?:\n|$))+/, vt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, $t = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, O = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, yt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, le = /(?:[*+-]|\d{1,9}[.)])/, De = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ie = b(De).replace(/bull/g, le).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), _t = b(De).replace(/bull/g, le).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), oe = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, zt = /^[^\n]+/, ce = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, St = b(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ce).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Rt = b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, le).getRegex(), X = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ue = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Tt = b("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ue).replace("tag", X).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Le = b(oe).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", X).getRegex(), At = b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Le).getRegex(), pe = { blockquote: At, code: vt, def: St, fences: $t, heading: yt, hr: O, html: Tt, lheading: Ie, list: Rt, newline: wt, paragraph: Le, table: Z, text: zt }, ye = b("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", X).getRegex(), Ct = { ...pe, lheading: _t, table: ye, paragraph: b(oe).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ye).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", X).getRegex() }, Et = { ...pe, html: b(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ue).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: Z, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: b(oe).replace("hr", O).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Pt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Mt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Be = /^( {2,}|\\)\n(?!\s*$)/, Dt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, K = /[\p{P}\p{S}]/u, he = /[\s\p{P}\p{S}]/u, qe = /[^\s\p{P}\p{S}]/u, It = b(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, he).getRegex(), Ne = /(?!~)[\p{P}\p{S}]/u, Lt = /(?!~)[\s\p{P}\p{S}]/u, Bt = /(?:[^\s\p{P}\p{S}]|~)/u, qt = b(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", xt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Ze = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Nt = b(Ze, "u").replace(/punct/g, K).getRegex(), Zt = b(Ze, "u").replace(/punct/g, Ne).getRegex(), Oe = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Ot = b(Oe, "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, he).replace(/punct/g, K).getRegex(), Ut = b(Oe, "gu").replace(/notPunctSpace/g, Bt).replace(/punctSpace/g, Lt).replace(/punct/g, Ne).getRegex(), Ht = b("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, he).replace(/punct/g, K).getRegex(), Qt = b(/\\(punct)/, "gu").replace(/punct/g, K).getRegex(), Gt = b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Wt = b(ue).replace("(?:-->|$)", "-->").getRegex(), Ft = b("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Wt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), G = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, jt = b(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", G).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ue = b(/^!?\[(label)\]\[(ref)\]/).replace("label", G).replace("ref", ce).getRegex(), He = b(/^!?\[(ref)\](?:\[\])?/).replace("ref", ce).getRegex(), Xt = b("reflink|nolink(?!\\()", "g").replace("reflink", Ue).replace("nolink", He).getRegex(), _e = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, de = { _backpedal: Z, anyPunctuation: Qt, autolink: Gt, blockSkip: qt, br: Be, code: Mt, del: Z, emStrongLDelim: Nt, emStrongRDelimAst: Ot, emStrongRDelimUnd: Ht, escape: Pt, link: jt, nolink: He, punctuation: It, reflink: Ue, reflinkSearch: Xt, tag: Ft, text: Dt, url: Z }, Kt = { ...de, link: b(/^!?\[(label)\]\((.*?)\)/).replace("label", G).getRegex(), reflink: b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", G).getRegex() }, J = { ...de, emStrongRDelimAst: Ut, emStrongLDelim: Zt, url: b(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", _e).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: b(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", _e).getRegex() }, Vt = { ...J, br: b(Be).replace("{2,}", "*").getRegex(), text: b(J.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, H = { normal: pe, gfm: Ct, pedantic: Et }, B = { normal: de, gfm: J, breaks: Vt, pedantic: Kt }, Jt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, ze = (t) => Jt[t];
function C(t, e) {
  if (e) {
    if (y.escapeTest.test(t)) return t.replace(y.escapeReplace, ze);
  } else if (y.escapeTestNoEncode.test(t)) return t.replace(y.escapeReplaceNoEncode, ze);
  return t;
}
function Se(t) {
  try {
    t = encodeURI(t).replace(y.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Re(t, e) {
  var a;
  let s = t.replace(y.findPipe, (l, i, c) => {
    let o = !1, p = i;
    for (; --p >= 0 && c[p] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), r = s.split(y.splitPipe), n = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !((a = r.at(-1)) != null && a.trim()) && r.pop(), e) if (r.length > e) r.splice(e);
  else for (; r.length < e; ) r.push("");
  for (; n < r.length; n++) r[n] = r[n].trim().replace(y.slashPipe, "|");
  return r;
}
function q(t, e, s) {
  let r = t.length;
  if (r === 0) return "";
  let n = 0;
  for (; n < r && t.charAt(r - n - 1) === e; )
    n++;
  return t.slice(0, r - n);
}
function Yt(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let s = 0;
  for (let r = 0; r < t.length; r++) if (t[r] === "\\") r++;
  else if (t[r] === e[0]) s++;
  else if (t[r] === e[1] && (s--, s < 0)) return r;
  return s > 0 ? -2 : -1;
}
function Te(t, e, s, r, n) {
  let a = e.href, l = e.title || null, i = t[1].replace(n.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let c = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: s, href: a, title: l, text: i, tokens: r.inlineTokens(i) };
  return r.state.inLink = !1, c;
}
function es(t, e, s) {
  let r = t.match(s.other.indentCodeCompensation);
  if (r === null) return e;
  let n = r[1];
  return e.split(`
`).map((a) => {
    let l = a.match(s.other.beginningSpace);
    if (l === null) return a;
    let [i] = l;
    return i.length >= n.length ? a.slice(n.length) : a;
  }).join(`
`);
}
var W = class {
  constructor(t) {
    w(this, "options");
    w(this, "rules");
    w(this, "lexer");
    this.options = t || D;
  }
  space(t) {
    let e = this.rules.block.newline.exec(t);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(t) {
    let e = this.rules.block.code.exec(t);
    if (e) {
      let s = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? s : q(s, `
`) };
    }
  }
  fences(t) {
    let e = this.rules.block.fences.exec(t);
    if (e) {
      let s = e[0], r = es(s, e[3] || "", this.rules);
      return { type: "code", raw: s, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: r };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let s = e[2].trim();
      if (this.rules.other.endingHash.test(s)) {
        let r = q(s, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (s = r.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: s, tokens: this.lexer.inline(s) };
    }
  }
  hr(t) {
    let e = this.rules.block.hr.exec(t);
    if (e) return { type: "hr", raw: q(e[0], `
`) };
  }
  blockquote(t) {
    let e = this.rules.block.blockquote.exec(t);
    if (e) {
      let s = q(e[0], `
`).split(`
`), r = "", n = "", a = [];
      for (; s.length > 0; ) {
        let l = !1, i = [], c;
        for (c = 0; c < s.length; c++) if (this.rules.other.blockquoteStart.test(s[c])) i.push(s[c]), l = !0;
        else if (!l) i.push(s[c]);
        else break;
        s = s.slice(c);
        let o = i.join(`
`), p = o.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${o}` : o, n = n ? `${n}
${p}` : p;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, a, !0), this.lexer.state.top = d, s.length === 0) break;
        let h = a.at(-1);
        if ((h == null ? void 0 : h.type) === "code") break;
        if ((h == null ? void 0 : h.type) === "blockquote") {
          let u = h, v = u.raw + `
` + s.join(`
`), g = this.blockquote(v);
          a[a.length - 1] = g, r = r.substring(0, r.length - u.raw.length) + g.raw, n = n.substring(0, n.length - u.text.length) + g.text;
          break;
        } else if ((h == null ? void 0 : h.type) === "list") {
          let u = h, v = u.raw + `
` + s.join(`
`), g = this.list(v);
          a[a.length - 1] = g, r = r.substring(0, r.length - h.raw.length) + g.raw, n = n.substring(0, n.length - u.raw.length) + g.raw, s = v.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r, tokens: a, text: n };
    }
  }
  list(t) {
    var s, r;
    let e = this.rules.block.list.exec(t);
    if (e) {
      let n = e[1].trim(), a = n.length > 1, l = { type: "list", raw: "", ordered: a, start: a ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = a ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = a ? n : "[*+-]");
      let i = this.rules.other.listItemRegex(n), c = !1;
      for (; t; ) {
        let p = !1, d = "", h = "";
        if (!(e = i.exec(t)) || this.rules.block.hr.test(t)) break;
        d = e[0], t = t.substring(d.length);
        let u = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (P) => " ".repeat(3 * P.length)), v = t.split(`
`, 1)[0], g = !u.trim(), $ = 0;
        if (this.options.pedantic ? ($ = 2, h = u.trimStart()) : g ? $ = e[1].length + 1 : ($ = e[2].search(this.rules.other.nonSpaceChar), $ = $ > 4 ? 1 : $, h = u.slice($), $ += e[1].length), g && this.rules.other.blankLine.test(v) && (d += v + `
`, t = t.substring(v.length + 1), p = !0), !p) {
          let P = this.rules.other.nextBulletRegex($), U = this.rules.other.hrRegex($), ve = this.rules.other.fencesBeginRegex($), $e = this.rules.other.headingBeginRegex($), st = this.rules.other.htmlBeginRegex($);
          for (; t; ) {
            let V = t.split(`
`, 1)[0], L;
            if (v = V, this.options.pedantic ? (v = v.replace(this.rules.other.listReplaceNesting, "  "), L = v) : L = v.replace(this.rules.other.tabCharGlobal, "    "), ve.test(v) || $e.test(v) || st.test(v) || P.test(v) || U.test(v)) break;
            if (L.search(this.rules.other.nonSpaceChar) >= $ || !v.trim()) h += `
` + L.slice($);
            else {
              if (g || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ve.test(u) || $e.test(u) || U.test(u)) break;
              h += `
` + v;
            }
            !g && !v.trim() && (g = !0), d += V + `
`, t = t.substring(V.length + 1), u = L.slice($);
          }
        }
        l.loose || (c ? l.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (c = !0)), l.items.push({ type: "list_item", raw: d, task: !!this.options.gfm && this.rules.other.listIsTask.test(h), loose: !1, text: h, tokens: [] }), l.raw += d;
      }
      let o = l.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      l.raw = l.raw.trimEnd();
      for (let p of l.items) {
        if (this.lexer.state.top = !1, p.tokens = this.lexer.blockTokens(p.text, []), p.task) {
          if (p.text = p.text.replace(this.rules.other.listReplaceTask, ""), ((s = p.tokens[0]) == null ? void 0 : s.type) === "text" || ((r = p.tokens[0]) == null ? void 0 : r.type) === "paragraph") {
            p.tokens[0].raw = p.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), p.tokens[0].text = p.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let h = this.lexer.inlineQueue.length - 1; h >= 0; h--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)) {
              this.lexer.inlineQueue[h].src = this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let d = this.rules.other.listTaskCheckbox.exec(p.raw);
          if (d) {
            let h = { type: "checkbox", raw: d[0] + " ", checked: d[0] !== "[ ]" };
            p.checked = h.checked, l.loose ? p.tokens[0] && ["paragraph", "text"].includes(p.tokens[0].type) && "tokens" in p.tokens[0] && p.tokens[0].tokens ? (p.tokens[0].raw = h.raw + p.tokens[0].raw, p.tokens[0].text = h.raw + p.tokens[0].text, p.tokens[0].tokens.unshift(h)) : p.tokens.unshift({ type: "paragraph", raw: h.raw, text: h.raw, tokens: [h] }) : p.tokens.unshift(h);
          }
        }
        if (!l.loose) {
          let d = p.tokens.filter((u) => u.type === "space"), h = d.length > 0 && d.some((u) => this.rules.other.anyLine.test(u.raw));
          l.loose = h;
        }
      }
      if (l.loose) for (let p of l.items) {
        p.loose = !0;
        for (let d of p.tokens) d.type === "text" && (d.type = "paragraph");
      }
      return l;
    }
  }
  html(t) {
    let e = this.rules.block.html.exec(t);
    if (e) return { type: "html", block: !0, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(t) {
    let e = this.rules.block.def.exec(t);
    if (e) {
      let s = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: s, raw: e[0], href: r, title: n };
    }
  }
  table(t) {
    var l;
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let s = Re(e[1]), r = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = (l = e[3]) != null && l.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (s.length === r.length) {
      for (let i of r) this.rules.other.tableAlignRight.test(i) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(i) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(i) ? a.align.push("left") : a.align.push(null);
      for (let i = 0; i < s.length; i++) a.header.push({ text: s[i], tokens: this.lexer.inline(s[i]), header: !0, align: a.align[i] });
      for (let i of n) a.rows.push(Re(i, a.header.length).map((c, o) => ({ text: c, tokens: this.lexer.inline(c), header: !1, align: a.align[o] })));
      return a;
    }
  }
  lheading(t) {
    let e = this.rules.block.lheading.exec(t);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(t) {
    let e = this.rules.block.paragraph.exec(t);
    if (e) {
      let s = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: s, tokens: this.lexer.inline(s) };
    }
  }
  text(t) {
    let e = this.rules.block.text.exec(t);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(t) {
    let e = this.rules.inline.escape.exec(t);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(t) {
    let e = this.rules.inline.tag.exec(t);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(t) {
    let e = this.rules.inline.link.exec(t);
    if (e) {
      let s = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(s)) {
        if (!this.rules.other.endAngleBracket.test(s)) return;
        let a = q(s.slice(0, -1), "\\");
        if ((s.length - a.length) % 2 === 0) return;
      } else {
        let a = Yt(e[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let r = e[2], n = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(r);
        a && (r = a[1], n = a[3]);
      } else n = e[3] ? e[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? r = r.slice(1) : r = r.slice(1, -1)), Te(e, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: n && n.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let s;
    if ((s = this.rules.inline.reflink.exec(t)) || (s = this.rules.inline.nolink.exec(t))) {
      let r = (s[2] || s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = e[r.toLowerCase()];
      if (!n) {
        let a = s[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return Te(s, n, s[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, s = "") {
    let r = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!r || r[3] && s.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[2]) || !s || this.rules.inline.punctuation.exec(s))) {
      let n = [...r[0]].length - 1, a, l, i = n, c = 0, o = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (o.lastIndex = 0, e = e.slice(-1 * t.length + n); (r = o.exec(e)) != null; ) {
        if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
        if (l = [...a].length, r[3] || r[4]) {
          i += l;
          continue;
        } else if ((r[5] || r[6]) && n % 3 && !((n + l) % 3)) {
          c += l;
          continue;
        }
        if (i -= l, i > 0) continue;
        l = Math.min(l, l + i + c);
        let p = [...r[0]][0].length, d = t.slice(0, n + r.index + p + l);
        if (Math.min(n, l) % 2) {
          let u = d.slice(1, -1);
          return { type: "em", raw: d, text: u, tokens: this.lexer.inlineTokens(u) };
        }
        let h = d.slice(2, -2);
        return { type: "strong", raw: d, text: h, tokens: this.lexer.inlineTokens(h) };
      }
    }
  }
  codespan(t) {
    let e = this.rules.inline.code.exec(t);
    if (e) {
      let s = e[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(s), n = this.rules.other.startingSpaceChar.test(s) && this.rules.other.endingSpaceChar.test(s);
      return r && n && (s = s.substring(1, s.length - 1)), { type: "codespan", raw: e[0], text: s };
    }
  }
  br(t) {
    let e = this.rules.inline.br.exec(t);
    if (e) return { type: "br", raw: e[0] };
  }
  del(t) {
    let e = this.rules.inline.del.exec(t);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(t) {
    let e = this.rules.inline.autolink.exec(t);
    if (e) {
      let s, r;
      return e[2] === "@" ? (s = e[1], r = "mailto:" + s) : (s = e[1], r = s), { type: "link", raw: e[0], text: s, href: r, tokens: [{ type: "text", raw: s, text: s }] };
    }
  }
  url(t) {
    var s;
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let r, n;
      if (e[2] === "@") r = e[0], n = "mailto:" + r;
      else {
        let a;
        do
          a = e[0], e[0] = ((s = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : s[0]) ?? "";
        while (a !== e[0]);
        r = e[0], e[1] === "www." ? n = "http://" + e[0] : n = e[0];
      }
      return { type: "link", raw: e[0], text: r, href: n, tokens: [{ type: "text", raw: r, text: r }] };
    }
  }
  inlineText(t) {
    let e = this.rules.inline.text.exec(t);
    if (e) {
      let s = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: s };
    }
  }
}, R = class Y {
  constructor(e) {
    w(this, "tokens");
    w(this, "options");
    w(this, "state");
    w(this, "inlineQueue");
    w(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || D, this.options.tokenizer = this.options.tokenizer || new W(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let s = { other: y, block: H.normal, inline: B.normal };
    this.options.pedantic ? (s.block = H.pedantic, s.inline = B.pedantic) : this.options.gfm && (s.block = H.gfm, this.options.breaks ? s.inline = B.breaks : s.inline = B.gfm), this.tokenizer.rules = s;
  }
  static get rules() {
    return { block: H, inline: B };
  }
  static lex(e, s) {
    return new Y(s).lex(e);
  }
  static lexInline(e, s) {
    return new Y(s).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(y.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let s = 0; s < this.inlineQueue.length; s++) {
      let r = this.inlineQueue[s];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, s = [], r = !1) {
    var n, a, l;
    for (this.options.pedantic && (e = e.replace(y.tabCharGlobal, "    ").replace(y.spaceLine, "")); e; ) {
      let i;
      if ((a = (n = this.options.extensions) == null ? void 0 : n.block) != null && a.some((o) => (i = o.call({ lexer: this }, e, s)) ? (e = e.substring(i.raw.length), s.push(i), !0) : !1)) continue;
      if (i = this.tokenizer.space(e)) {
        e = e.substring(i.raw.length);
        let o = s.at(-1);
        i.raw.length === 1 && o !== void 0 ? o.raw += `
` : s.push(i);
        continue;
      }
      if (i = this.tokenizer.code(e)) {
        e = e.substring(i.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + i.raw, o.text += `
` + i.text, this.inlineQueue.at(-1).src = o.text) : s.push(i);
        continue;
      }
      if (i = this.tokenizer.fences(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.heading(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.hr(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.blockquote(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.list(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.html(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.def(e)) {
        e = e.substring(i.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + i.raw, o.text += `
` + i.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = { href: i.href, title: i.title }, s.push(i));
        continue;
      }
      if (i = this.tokenizer.table(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.lheading(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      let c = e;
      if ((l = this.options.extensions) != null && l.startBlock) {
        let o = 1 / 0, p = e.slice(1), d;
        this.options.extensions.startBlock.forEach((h) => {
          d = h.call({ lexer: this }, p), typeof d == "number" && d >= 0 && (o = Math.min(o, d));
        }), o < 1 / 0 && o >= 0 && (c = e.substring(0, o + 1));
      }
      if (this.state.top && (i = this.tokenizer.paragraph(c))) {
        let o = s.at(-1);
        r && (o == null ? void 0 : o.type) === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + i.raw, o.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(i), r = c.length !== e.length, e = e.substring(i.raw.length);
        continue;
      }
      if (i = this.tokenizer.text(e)) {
        e = e.substring(i.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + i.raw, o.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(i);
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
    return this.state.top = !0, s;
  }
  inline(e, s = []) {
    return this.inlineQueue.push({ src: e, tokens: s }), s;
  }
  inlineTokens(e, s = []) {
    var c, o, p, d, h;
    let r = e, n = null;
    if (this.tokens.links) {
      let u = Object.keys(this.tokens.links);
      if (u.length > 0) for (; (n = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; ) u.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (n = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; ) r = r.slice(0, n.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let a;
    for (; (n = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; ) a = n[2] ? n[2].length : 0, r = r.slice(0, n.index + a) + "[" + "a".repeat(n[0].length - a - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    r = ((o = (c = this.options.hooks) == null ? void 0 : c.emStrongMask) == null ? void 0 : o.call({ lexer: this }, r)) ?? r;
    let l = !1, i = "";
    for (; e; ) {
      l || (i = ""), l = !1;
      let u;
      if ((d = (p = this.options.extensions) == null ? void 0 : p.inline) != null && d.some((g) => (u = g.call({ lexer: this }, e, s)) ? (e = e.substring(u.raw.length), s.push(u), !0) : !1)) continue;
      if (u = this.tokenizer.escape(e)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (u = this.tokenizer.tag(e)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (u = this.tokenizer.link(e)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (u = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(u.raw.length);
        let g = s.at(-1);
        u.type === "text" && (g == null ? void 0 : g.type) === "text" ? (g.raw += u.raw, g.text += u.text) : s.push(u);
        continue;
      }
      if (u = this.tokenizer.emStrong(e, r, i)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (u = this.tokenizer.codespan(e)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (u = this.tokenizer.br(e)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (u = this.tokenizer.del(e)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (u = this.tokenizer.autolink(e)) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      if (!this.state.inLink && (u = this.tokenizer.url(e))) {
        e = e.substring(u.raw.length), s.push(u);
        continue;
      }
      let v = e;
      if ((h = this.options.extensions) != null && h.startInline) {
        let g = 1 / 0, $ = e.slice(1), P;
        this.options.extensions.startInline.forEach((U) => {
          P = U.call({ lexer: this }, $), typeof P == "number" && P >= 0 && (g = Math.min(g, P));
        }), g < 1 / 0 && g >= 0 && (v = e.substring(0, g + 1));
      }
      if (u = this.tokenizer.inlineText(v)) {
        e = e.substring(u.raw.length), u.raw.slice(-1) !== "_" && (i = u.raw.slice(-1)), l = !0;
        let g = s.at(-1);
        (g == null ? void 0 : g.type) === "text" ? (g.raw += u.raw, g.text += u.text) : s.push(u);
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
    return s;
  }
}, F = class {
  constructor(t) {
    w(this, "options");
    w(this, "parser");
    this.options = t || D;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: s }) {
    var a;
    let r = (a = (e || "").match(y.notSpaceStart)) == null ? void 0 : a[0], n = t.replace(y.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + C(r) + '">' + (s ? n : C(n, !0)) + `</code></pre>
` : "<pre><code>" + (s ? n : C(n, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  def(t) {
    return "";
  }
  heading({ tokens: t, depth: e }) {
    return `<h${e}>${this.parser.parseInline(t)}</h${e}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    let e = t.ordered, s = t.start, r = "";
    for (let l = 0; l < t.items.length; l++) {
      let i = t.items[l];
      r += this.listitem(i);
    }
    let n = e ? "ol" : "ul", a = e && s !== 1 ? ' start="' + s + '"' : "";
    return "<" + n + a + `>
` + r + "</" + n + `>
`;
  }
  listitem(t) {
    return `<li>${this.parser.parse(t.tokens)}</li>
`;
  }
  checkbox({ checked: t }) {
    return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let e = "", s = "";
    for (let n = 0; n < t.header.length; n++) s += this.tablecell(t.header[n]);
    e += this.tablerow({ text: s });
    let r = "";
    for (let n = 0; n < t.rows.length; n++) {
      let a = t.rows[n];
      s = "";
      for (let l = 0; l < a.length; l++) s += this.tablecell(a[l]);
      r += this.tablerow({ text: s });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    let e = this.parser.parseInline(t.tokens), s = t.header ? "th" : "td";
    return (t.align ? `<${s} align="${t.align}">` : `<${s}>`) + e + `</${s}>
`;
  }
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${C(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, tokens: s }) {
    let r = this.parser.parseInline(s), n = Se(t);
    if (n === null) return r;
    t = n;
    let a = '<a href="' + t + '"';
    return e && (a += ' title="' + C(e) + '"'), a += ">" + r + "</a>", a;
  }
  image({ href: t, title: e, text: s, tokens: r }) {
    r && (s = this.parser.parseInline(r, this.parser.textRenderer));
    let n = Se(t);
    if (n === null) return C(s);
    t = n;
    let a = `<img src="${t}" alt="${s}"`;
    return e && (a += ` title="${C(e)}"`), a += ">", a;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : C(t.text);
  }
}, ge = class {
  strong({ text: t }) {
    return t;
  }
  em({ text: t }) {
    return t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t }) {
    return t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t }) {
    return "" + t;
  }
  image({ text: t }) {
    return "" + t;
  }
  br() {
    return "";
  }
  checkbox({ raw: t }) {
    return t;
  }
}, T = class ee {
  constructor(e) {
    w(this, "options");
    w(this, "renderer");
    w(this, "textRenderer");
    this.options = e || D, this.options.renderer = this.options.renderer || new F(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ge();
  }
  static parse(e, s) {
    return new ee(s).parse(e);
  }
  static parseInline(e, s) {
    return new ee(s).parseInline(e);
  }
  parse(e) {
    var r, n;
    let s = "";
    for (let a = 0; a < e.length; a++) {
      let l = e[a];
      if ((n = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && n[l.type]) {
        let c = l, o = this.options.extensions.renderers[c.type].call({ parser: this }, c);
        if (o !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(c.type)) {
          s += o || "";
          continue;
        }
      }
      let i = l;
      switch (i.type) {
        case "space": {
          s += this.renderer.space(i);
          break;
        }
        case "hr": {
          s += this.renderer.hr(i);
          break;
        }
        case "heading": {
          s += this.renderer.heading(i);
          break;
        }
        case "code": {
          s += this.renderer.code(i);
          break;
        }
        case "table": {
          s += this.renderer.table(i);
          break;
        }
        case "blockquote": {
          s += this.renderer.blockquote(i);
          break;
        }
        case "list": {
          s += this.renderer.list(i);
          break;
        }
        case "checkbox": {
          s += this.renderer.checkbox(i);
          break;
        }
        case "html": {
          s += this.renderer.html(i);
          break;
        }
        case "def": {
          s += this.renderer.def(i);
          break;
        }
        case "paragraph": {
          s += this.renderer.paragraph(i);
          break;
        }
        case "text": {
          s += this.renderer.text(i);
          break;
        }
        default: {
          let c = 'Token with "' + i.type + '" type was not found.';
          if (this.options.silent) return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return s;
  }
  parseInline(e, s = this.renderer) {
    var n, a;
    let r = "";
    for (let l = 0; l < e.length; l++) {
      let i = e[l];
      if ((a = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && a[i.type]) {
        let o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          r += o || "";
          continue;
        }
      }
      let c = i;
      switch (c.type) {
        case "escape": {
          r += s.text(c);
          break;
        }
        case "html": {
          r += s.html(c);
          break;
        }
        case "link": {
          r += s.link(c);
          break;
        }
        case "image": {
          r += s.image(c);
          break;
        }
        case "checkbox": {
          r += s.checkbox(c);
          break;
        }
        case "strong": {
          r += s.strong(c);
          break;
        }
        case "em": {
          r += s.em(c);
          break;
        }
        case "codespan": {
          r += s.codespan(c);
          break;
        }
        case "br": {
          r += s.br(c);
          break;
        }
        case "del": {
          r += s.del(c);
          break;
        }
        case "text": {
          r += s.text(c);
          break;
        }
        default: {
          let o = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return r;
  }
}, Q, N = (Q = class {
  constructor(t) {
    w(this, "options");
    w(this, "block");
    this.options = t || D;
  }
  preprocess(t) {
    return t;
  }
  postprocess(t) {
    return t;
  }
  processAllTokens(t) {
    return t;
  }
  emStrongMask(t) {
    return t;
  }
  provideLexer() {
    return this.block ? R.lex : R.lexInline;
  }
  provideParser() {
    return this.block ? T.parse : T.parseInline;
  }
}, w(Q, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), w(Q, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Q), ts = class {
  constructor(...t) {
    w(this, "defaults", ae());
    w(this, "options", this.setOptions);
    w(this, "parse", this.parseMarkdown(!0));
    w(this, "parseInline", this.parseMarkdown(!1));
    w(this, "Parser", T);
    w(this, "Renderer", F);
    w(this, "TextRenderer", ge);
    w(this, "Lexer", R);
    w(this, "Tokenizer", W);
    w(this, "Hooks", N);
    this.use(...t);
  }
  walkTokens(t, e) {
    var r, n;
    let s = [];
    for (let a of t) switch (s = s.concat(e.call(this, a)), a.type) {
      case "table": {
        let l = a;
        for (let i of l.header) s = s.concat(this.walkTokens(i.tokens, e));
        for (let i of l.rows) for (let c of i) s = s.concat(this.walkTokens(c.tokens, e));
        break;
      }
      case "list": {
        let l = a;
        s = s.concat(this.walkTokens(l.items, e));
        break;
      }
      default: {
        let l = a;
        (n = (r = this.defaults.extensions) == null ? void 0 : r.childTokens) != null && n[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((i) => {
          let c = l[i].flat(1 / 0);
          s = s.concat(this.walkTokens(c, e));
        }) : l.tokens && (s = s.concat(this.walkTokens(l.tokens, e)));
      }
    }
    return s;
  }
  use(...t) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return t.forEach((s) => {
      let r = { ...s };
      if (r.async = this.defaults.async || r.async || !1, s.extensions && (s.extensions.forEach((n) => {
        if (!n.name) throw new Error("extension name required");
        if ("renderer" in n) {
          let a = e.renderers[n.name];
          a ? e.renderers[n.name] = function(...l) {
            let i = n.renderer.apply(this, l);
            return i === !1 && (i = a.apply(this, l)), i;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = e[n.level];
          a ? a.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), r.extensions = e), s.renderer) {
        let n = this.defaults.renderer || new F(this.defaults);
        for (let a in s.renderer) {
          if (!(a in n)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let l = a, i = s.renderer[l], c = n[l];
          n[l] = (...o) => {
            let p = i.apply(n, o);
            return p === !1 && (p = c.apply(n, o)), p || "";
          };
        }
        r.renderer = n;
      }
      if (s.tokenizer) {
        let n = this.defaults.tokenizer || new W(this.defaults);
        for (let a in s.tokenizer) {
          if (!(a in n)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let l = a, i = s.tokenizer[l], c = n[l];
          n[l] = (...o) => {
            let p = i.apply(n, o);
            return p === !1 && (p = c.apply(n, o)), p;
          };
        }
        r.tokenizer = n;
      }
      if (s.hooks) {
        let n = this.defaults.hooks || new N();
        for (let a in s.hooks) {
          if (!(a in n)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let l = a, i = s.hooks[l], c = n[l];
          N.passThroughHooks.has(a) ? n[l] = (o) => {
            if (this.defaults.async && N.passThroughHooksRespectAsync.has(a)) return (async () => {
              let d = await i.call(n, o);
              return c.call(n, d);
            })();
            let p = i.call(n, o);
            return c.call(n, p);
          } : n[l] = (...o) => {
            if (this.defaults.async) return (async () => {
              let d = await i.apply(n, o);
              return d === !1 && (d = await c.apply(n, o)), d;
            })();
            let p = i.apply(n, o);
            return p === !1 && (p = c.apply(n, o)), p;
          };
        }
        r.hooks = n;
      }
      if (s.walkTokens) {
        let n = this.defaults.walkTokens, a = s.walkTokens;
        r.walkTokens = function(l) {
          let i = [];
          return i.push(a.call(this, l)), n && (i = i.concat(n.call(this, l))), i;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, e) {
    return R.lex(t, e ?? this.defaults);
  }
  parser(t, e) {
    return T.parse(t, e ?? this.defaults);
  }
  parseMarkdown(t) {
    return (e, s) => {
      let r = { ...s }, n = { ...this.defaults, ...r }, a = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && r.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (n.hooks && (n.hooks.options = n, n.hooks.block = t), n.async) return (async () => {
        let l = n.hooks ? await n.hooks.preprocess(e) : e, i = await (n.hooks ? await n.hooks.provideLexer() : t ? R.lex : R.lexInline)(l, n), c = n.hooks ? await n.hooks.processAllTokens(i) : i;
        n.walkTokens && await Promise.all(this.walkTokens(c, n.walkTokens));
        let o = await (n.hooks ? await n.hooks.provideParser() : t ? T.parse : T.parseInline)(c, n);
        return n.hooks ? await n.hooks.postprocess(o) : o;
      })().catch(a);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let l = (n.hooks ? n.hooks.provideLexer() : t ? R.lex : R.lexInline)(e, n);
        n.hooks && (l = n.hooks.processAllTokens(l)), n.walkTokens && this.walkTokens(l, n.walkTokens);
        let i = (n.hooks ? n.hooks.provideParser() : t ? T.parse : T.parseInline)(l, n);
        return n.hooks && (i = n.hooks.postprocess(i)), i;
      } catch (l) {
        return a(l);
      }
    };
  }
  onError(t, e) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let r = "<p>An error occurred:</p><pre>" + C(s.message + "", !0) + "</pre>";
        return e ? Promise.resolve(r) : r;
      }
      if (e) return Promise.reject(s);
      throw s;
    };
  }
}, M = new ts();
function m(t, e) {
  return M.parse(t, e);
}
m.options = m.setOptions = function(t) {
  return M.setOptions(t), m.defaults = M.defaults, Me(m.defaults), m;
};
m.getDefaults = ae;
m.defaults = D;
m.use = function(...t) {
  return M.use(...t), m.defaults = M.defaults, Me(m.defaults), m;
};
m.walkTokens = function(t, e) {
  return M.walkTokens(t, e);
};
m.parseInline = M.parseInline;
m.Parser = T;
m.parser = T.parse;
m.Renderer = F;
m.TextRenderer = ge;
m.Lexer = R;
m.lexer = R.lex;
m.Tokenizer = W;
m.Hooks = N;
m.parse = m;
m.options;
m.setOptions;
m.use;
m.walkTokens;
m.parseInline;
T.parse;
R.lex;
function ss(t) {
  if (!t) return "";
  try {
    const e = m.parse(t, {
      gfm: !0,
      breaks: !1
    });
    return typeof e == "string" ? e : (console.warn("marked returned Promise, using fallback"), `<p>${t}</p>`);
  } catch (e) {
    return console.error("Markdown conversion failed:", e), `<p>${t.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  }
}
function ns(t) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const rs = new ht("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var is = Object.defineProperty, as = Object.getOwnPropertyDescriptor, Qe = (t) => {
  throw TypeError(t);
}, S = (t, e, s, r) => {
  for (var n = r > 1 ? void 0 : r ? as(e, s) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (n = (r ? l(e, s, n) : l(n)) || n);
  return r && n && is(e, s, n), n;
}, fe = (t, e, s) => e.has(t) || Qe("Cannot " + s), I = (t, e, s) => (fe(t, e, "read from private field"), s ? s.call(t) : e.get(t)), Ae = (t, e, s) => e.has(t) ? Qe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), ls = (t, e, s, r) => (fe(t, e, "write to private field"), e.set(t, s), s), k = (t, e, s) => (fe(t, e, "access private method"), s), E, f, Ge, ke, te, be, me, xe, We, se, ne, j, Fe, re, we, je, Xe, Ke, Ve, Je, ie, Ye, et, tt;
let _ = class extends ft {
  constructor() {
    super(...arguments), Ae(this, f), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsedSections = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", Ae(this, E, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(bt, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), k(this, f, Ge).call(this));
      });
    });
  }
  render() {
    if (this._loading)
      return x`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return x`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
    const t = this._zoneDetection !== null || this._extraction !== null;
    return x`
			<umb-body-layout header-fit-height>
				${this._successMessage ? x`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : z}
				${t ? k(this, f, Je).call(this) : k(this, f, tt).call(this)}
			</umb-body-layout>
		`;
  }
};
E = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakSet();
Ge = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const t = await this.getContext(Pe);
      ls(this, E, await t.getLatestToken());
      const [e, s, r, n] = await Promise.all([
        it(this._workflowName, I(this, E)),
        Ce(this._workflowName, I(this, E)),
        at(this._workflowName, I(this, E)),
        lt(this._workflowName, I(this, E))
      ]);
      this._extraction = e, this._zoneDetection = s, this._config = r, this._transformResult = n;
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to load data", console.error("Failed to load source data:", t);
    } finally {
      this._loading = !1;
    }
  }
};
ke = async function() {
  var n;
  if (!this._workflowName) return;
  const s = await (await this.getContext(Ee)).open(this, mt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((n = s == null ? void 0 : s.selection) != null && n.length)) return;
  const r = s.selection[0];
  if (r) {
    this._extracting = !0, this._error = null;
    try {
      const l = await (await this.getContext(Pe)).getLatestToken(), [i, c] = await Promise.all([
        ot(this._workflowName, r, l),
        ct(this._workflowName, r, l)
      ]);
      if (i && (this._extraction = i), c) {
        this._transformResult = c;
        const o = await Ce(this._workflowName, l);
        this._zoneDetection = o;
        const p = c.diagnostics;
        this._successMessage = `Content extracted — ${p.totalSections} sections (${p.bulletListSections} bullet, ${p.paragraphSections} paragraph, ${p.subHeadedSections} sub-headed)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else i ? (this._successMessage = `Content extracted — ${i.elements.length} elements (transform unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (a) {
      this._error = a instanceof Error ? a.message : "Extraction failed", console.error("Extraction failed:", a);
    } finally {
      this._extracting = !1;
    }
  }
};
te = function(t) {
  const e = new Set(this._collapsedSections);
  e.has(t) ? e.delete(t) : e.add(t), this._collapsedSections = e;
};
be = function(t, e, s) {
  const r = [];
  for (let n = 0; n < s; n++)
    r.push(`p${t}-${e}-s${n}`);
  return r;
};
me = function(t) {
  return t.length > 0 && t.every((e) => this._collapsedSections.has(e));
};
xe = function(t) {
  const e = new Set(this._collapsedSections);
  if (t.every((r) => e.has(r)))
    for (const r of t) e.delete(r);
  else
    for (const r of t) e.add(r);
  this._collapsedSections = e;
};
We = function(t) {
  if (!this._transformResult) return !0;
  const e = this._transformResult.sections.find((s) => s.id === t);
  return (e == null ? void 0 : e.included) ?? !0;
};
se = async function(t, e) {
  if (!this._workflowName) return;
  const s = await pt(this._workflowName, t, e, I(this, E));
  s && (this._transformResult = s);
};
ne = async function(t) {
  var o, p, d, h;
  if (!((o = this._config) != null && o.destination) || !this._workflowName) return;
  const r = await (await this.getContext(Ee)).open(this, rs, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!((p = r == null ? void 0 : r.selectedTargets) != null && p.length)) return;
  const n = [...((d = this._config.map) == null ? void 0 : d.mappings) ?? []], a = n.findIndex((u) => u.source === t), l = {
    source: t,
    destinations: r.selectedTargets.map((u) => ({ target: u.target, blockKey: u.blockKey })),
    enabled: !0
  };
  a >= 0 ? n[a] = l : n.push(l);
  const i = { ...this._config.map, version: ((h = this._config.map) == null ? void 0 : h.version) ?? "1.0", mappings: n };
  await ut(this._workflowName, i, I(this, E)) && (this._config = { ...this._config, map: i });
};
j = function(t) {
  var s, r;
  if (!((r = (s = this._config) == null ? void 0 : s.map) != null && r.mappings)) return [];
  const e = [];
  for (const n of this._config.map.mappings)
    if (n.source === t && n.enabled)
      for (const a of n.destinations)
        e.push(a);
  return e;
};
Fe = function(t) {
  var s, r, n;
  if (!((s = this._config) != null && s.destination)) return t.target;
  if (t.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const l = a.blocks.find((i) => i.key === t.blockKey);
      if (l) {
        const i = (r = l.properties) == null ? void 0 : r.find((c) => c.alias === t.target);
        return `${l.label} > ${(i == null ? void 0 : i.label) || t.target}`;
      }
    }
  const e = this._config.destination.fields.find((a) => a.alias === t.target);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const l of a.blocks) {
        const i = (n = l.properties) == null ? void 0 : n.find((c) => c.alias === t.target);
        if (i) return `${l.label} > ${i.label || i.alias}`;
      }
  return t.target;
};
re = function(t) {
  return x`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${t.text}</div>
					<div class="element-meta">
						<span class="meta-badge font-size">${t.fontSize}pt</span>
						<span class="meta-badge font-name">${t.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${t.color};">${t.color}</span>
					</div>
				</div>
			</div>
		`;
};
we = function(t, e, s, r) {
  const n = this._collapsedSections.has(e), a = t.heading ? ns(t.heading.text) : r >= 0 ? `preamble-p${s}-z${r}` : `preamble-p${s}-unzoned`, l = k(this, f, We).call(this, a);
  if (!t.heading)
    return x`
				<div class="zone-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble">
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@change=${(c) => k(this, f, se).call(this, a, c.target.checked)}>
						</uui-toggle>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="group-count">${t.children.length} item${t.children.length !== 1 ? "s" : ""}</span>
					</div>
					${l ? x`
						${t.children.map((c) => k(this, f, re).call(this, c))}
					` : z}
				</div>
			`;
  const i = t.heading;
  return x`
			<div class="zone-section ${l ? "" : "excluded"}">
				<div class="section-heading">
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@change=${(c) => k(this, f, se).call(this, a, c.target.checked)}>
					</uui-toggle>
					<div class="heading-content" @click=${() => k(this, f, te).call(this, e)}>
						<div class="heading-text">${i.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${i.fontSize}pt</span>
							<span class="meta-badge font-name">${i.fontName}</span>
						</div>
					</div>
					<button class="collapse-toggle" @click=${() => k(this, f, te).call(this, e)} title="${n ? "Expand" : "Collapse"}">
						<uui-icon name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</button>
					<span class="group-count">${t.children.length} item${t.children.length !== 1 ? "s" : ""}</span>
				</div>
				${!n && l ? x`
					<div class="section-children">
						${t.children.map((c) => k(this, f, re).call(this, c))}
					</div>
				` : z}
			</div>
		`;
};
je = function(t, e, s) {
  const r = t.totalElements, n = k(this, f, be).call(this, e, `a${s}`, t.sections.length), a = k(this, f, me).call(this, n);
  return x`
			<div class="zone-area" style="border-left-color: ${t.color};">
				<div class="area-header">
					<span class="area-color-swatch" style="background: ${t.color};"></span>
					<span class="area-element-count">${r} element${r !== 1 ? "s" : ""}</span>
					${t.sections.length > 1 ? x`
						<button class="area-collapse-toggle" @click=${() => k(this, f, xe).call(this, n)}
							title="${a ? "Expand all sections" : "Collapse all sections"}">
							<uui-icon name="${a ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
							${a ? "Expand" : "Collapse"}
						</button>
					` : z}
				</div>
				${t.sections.map(
    (l, i) => k(this, f, we).call(this, l, `p${e}-a${s}-s${i}`, e, s)
  )}
			</div>
		`;
};
Xe = function(t, e) {
  if (t.totalElements === 0) return z;
  const s = k(this, f, be).call(this, e, "unzoned", t.sections.length), r = k(this, f, me).call(this, s);
  return x`
			<div class="zone-area unzoned" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header">
					<span class="area-color-swatch unzoned-swatch"></span>
					<span class="area-element-count">Unzoned — ${t.totalElements} element${t.totalElements !== 1 ? "s" : ""}</span>
					${t.sections.length > 1 ? x`
						<button class="area-collapse-toggle" @click=${() => k(this, f, xe).call(this, s)}
							title="${r ? "Expand all sections" : "Collapse all sections"}">
							<uui-icon name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
							${r ? "Expand" : "Collapse"}
						</button>
					` : z}
				</div>
				${t.sections.map(
    (n, a) => k(this, f, we).call(this, n, `p${e}-unzoned-s${a}`, e, -1)
  )}
			</div>
		`;
};
Ke = function(t, e, s) {
  return x`
			<uui-box headline="Page ${t}" class="page-box">
				${e.map((r, n) => k(this, f, je).call(this, r, t, n))}
				${s ? k(this, f, Xe).call(this, s, t) : z}
			</uui-box>
		`;
};
Ve = function() {
  return this._zoneDetection ? x`
			${this._zoneDetection.pages.map(
    (t) => k(this, f, Ke).call(this, t.page, t.zones, t.unzonedContent)
  )}
			<div class="diagnostics">
				<span class="meta-badge">${this._zoneDetection.diagnostics.zonesDetected} areas</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsZoned} zoned</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsUnzoned} unzoned</span>
			</div>
		` : z;
};
Je = function() {
  const t = this._zoneDetection !== null, e = this._extraction !== null;
  if (!t && !e) return z;
  const s = t ? this._zoneDetection.diagnostics.elementsZoned + this._zoneDetection.diagnostics.elementsUnzoned : this._extraction.elements.length;
  return x`
			<div class="extraction-header">
				${e ? x`
					<div class="extraction-info">
						<span class="info-label">Source:</span>
						<span>${this._extraction.source.fileName}</span>
					</div>
					<div class="extraction-info">
						<span class="info-label">Pages:</span>
						<span>${this._extraction.source.totalPages}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Elements:</span>
						<span>${s}</span>
						${t ? x`
							<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
							<span>${this._zoneDetection.diagnostics.zonesDetected}</span>
						` : z}
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Extracted:</span>
						<span>${new Date(this._extraction.source.extractedDate).toLocaleString()}</span>
					</div>
				` : x`
					<div class="extraction-info">
						<span class="info-label">Elements:</span>
						<span>${s}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
						<span>${this._zoneDetection.diagnostics.zonesDetected}</span>
					</div>
				`}
				<uui-button look="secondary" label="Re-extract" @click=${k(this, f, ke)} ?disabled=${this._extracting}>
					<uui-icon name="icon-refresh"></uui-icon>
					Re-extract
				</uui-button>
			</div>

			<div class="view-tabs">
				<uui-tab-group>
					<uui-tab label="Extracted" ?active=${this._viewMode === "elements"} @click=${() => {
    this._viewMode = "elements";
  }}>Extracted</uui-tab>
					<uui-tab label="Transformed" ?active=${this._viewMode === "transformed"} @click=${() => {
    this._viewMode = "transformed";
  }} ?disabled=${!this._transformResult}>Transformed</uui-tab>
				</uui-tab-group>
			</div>

			${this._viewMode === "elements" ? t ? k(this, f, Ve).call(this) : z : k(this, f, et).call(this)}
		`;
};
ie = function(t) {
  const e = k(this, f, j).call(this, t);
  return e.length === 0 ? x`<uui-button look="secondary" compact label="Map" @click=${() => k(this, f, ne).call(this, t)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : x`${e.map(
    (s) => x`<span class="meta-badge mapped-target" @click=${() => k(this, f, ne).call(this, t)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${k(this, f, Fe).call(this, s)}
			</span>`
  )}`;
};
Ye = function(t) {
  const e = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, s = `${t.id}.heading`, r = `${t.id}.content`, n = k(this, f, j).call(this, s).length > 0, a = k(this, f, j).call(this, r).length > 0, l = n || a, i = t.heading ?? "Preamble";
  return x`
			<uui-box headline=${i} class="transformed-section ${l ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${t.pattern}">${e[t.pattern] ?? t.pattern}</span>
					<span class="meta-badge">p${t.page}</span>
					${t.zoneColor ? x`<span class="area-color-swatch" style="background: ${t.zoneColor};"></span>` : z}
					<span class="meta-badge">${t.childCount} item${t.childCount !== 1 ? "s" : ""}</span>
					${t.heading ? k(this, f, ie).call(this, s) : z}
				</div>
				<div class="transformed-content" .innerHTML=${ss(t.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${k(this, f, ie).call(this, r)}
				</div>
			</uui-box>
		`;
};
et = function() {
  if (!this._transformResult)
    return x`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Re-extract content to generate the transformed view.</p>
				</div>
			`;
  const t = this._transformResult.sections.filter((s) => s.included), e = this._transformResult.sections.length;
  return x`
			${t.map((s) => k(this, f, Ye).call(this, s))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${e} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? x`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : z}
			</div>
		`;
};
tt = function() {
  return x`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${k(this, f, ke)} ?disabled=${this._extracting}>
					${this._extracting ? x`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
_.styles = [
  kt,
  dt`
			:host {
				display: block;
				height: 100%;
			}

			.loading {
				padding: var(--uui-size-layout-1);
			}

			.success-banner {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2);
				border-radius: var(--uui-border-radius);
				background-color: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				font-size: var(--uui-type-small-size);
			}

			/* Empty state */
			.empty-state {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: var(--uui-size-layout-2);
				gap: var(--uui-size-space-3);
				text-align: center;
				min-height: 300px;
			}

			.empty-state h3 {
				margin: 0;
				color: var(--uui-color-text);
			}

			.empty-state p {
				margin: 0;
				color: var(--uui-color-text-alt);
			}

			/* Extraction header */
			.extraction-header {
				padding: var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-2);
			}

			.extraction-info {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				font-size: var(--uui-type-small-size);
			}

			.info-label {
				font-weight: 600;
				color: var(--uui-color-text-alt);
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			/* Zone areas */
			.zone-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-3) 0;
				margin-left: var(--uui-size-space-2);
			}

			.zone-area.unzoned {
				opacity: 0.75;
			}

			.area-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.area-color-swatch {
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 2px;
				border: 1px solid var(--uui-color-border);
			}

			.area-color-swatch.unzoned-swatch {
				background: var(--uui-color-border-standalone);
			}

			.area-element-count {
				font-weight: 500;
			}

			.area-collapse-toggle {
				margin-left: auto;
				background: none;
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				cursor: pointer;
				padding: 2px 8px;
				color: var(--uui-color-text-alt);
				font-size: var(--uui-type-small-size);
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
			}

			.area-collapse-toggle:hover {
				color: var(--uui-color-text);
				background: var(--uui-color-surface-emphasis);
			}

			/* Sections within areas */
			.zone-section + .zone-section {
				border-top: 1px solid var(--uui-color-border);
			}

			.section-heading {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				background: var(--uui-color-surface-alt);
				border-bottom: 1px solid var(--uui-color-border);
				cursor: pointer;
			}

			.section-heading:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.heading-content {
				flex: 1;
				min-width: 0;
			}

			.heading-text {
				font-weight: 700;
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-1);
			}

			.collapse-toggle {
				background: none;
				border: none;
				cursor: pointer;
				padding: var(--uui-size-space-1);
				color: var(--uui-color-text-alt);
				display: flex;
				align-items: center;
			}

			.collapse-toggle:hover {
				color: var(--uui-color-text);
			}

			.group-count {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				white-space: nowrap;
			}

			.section-children {
				padding-left: var(--uui-size-space-5);
				border-left: 2px solid var(--uui-color-border);
				margin-left: var(--uui-size-space-4);
			}

			/* Excluded sections */
			.zone-section.excluded {
				opacity: 0.4;
			}

			.preamble-label {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Element items */
			.element-item {
				display: flex;
				align-items: flex-start;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			.element-item:last-child {
				border-bottom: none;
			}

			.element-content {
				flex: 1;
				min-width: 0;
			}

			.element-text {
				font-size: var(--uui-type-default-size);
				margin-bottom: var(--uui-size-space-2);
				word-break: break-word;
				white-space: pre-wrap;
			}

			.element-meta {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-2);
			}

			.meta-badge {
				font-size: 11px;
				font-family: monospace;
				padding: 1px 6px;
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
			}

			.meta-badge.font-size {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.meta-badge.mapped-target {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
				display: inline-flex;
				align-items: center;
				gap: 3px;
			}

			.diagnostics {
				display: flex;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				justify-content: flex-end;
			}

			/* View mode tabs */
			.view-tabs {
				padding: 0 var(--uui-size-space-4);
				border-bottom: 1px solid var(--uui-color-border);
			}

			/* Transformed sections */
			.transformed-section {
				margin: var(--uui-size-space-4);
			}

			.transformed-section.section-mapped {
				border-left: 3px solid var(--uui-color-positive);
			}

			.section-mapping-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-4);
				border-top: 1px solid var(--uui-color-border);
			}

			.mapping-label {
				font-size: var(--uui-type-small-size);
				font-weight: 600;
				color: var(--uui-color-text-alt);
			}

			.transformed-header-badges {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
			}

			.pattern-badge {
				font-size: 11px;
				padding: 1px 8px;
				border-radius: 10px;
				font-weight: 500;
			}

			.pattern-badge.bulletList {
				background: var(--uui-color-positive-emphasis);
				color: var(--uui-color-positive-contrast);
			}

			.pattern-badge.paragraph {
				background: var(--uui-color-warning-emphasis);
				color: var(--uui-color-warning-contrast);
			}

			.pattern-badge.subHeaded {
				background: var(--uui-color-default-emphasis);
				color: var(--uui-color-default-contrast);
			}

			.pattern-badge.preamble {
				background: var(--uui-color-surface-alt);
				color: var(--uui-color-text-alt);
				border: 1px solid var(--uui-color-border);
			}

			.transformed-content {
				padding: var(--uui-size-space-4);
				font-size: var(--uui-type-small-size);
				line-height: 1.6;
			}

			.transformed-content ul,
			.transformed-content ol {
				padding-left: var(--uui-size-space-5);
				margin: var(--uui-size-space-2) 0;
			}

			.transformed-content p {
				margin: var(--uui-size-space-2) 0;
			}

			.transformed-content h2 {
				font-size: var(--uui-type-default-size);
				margin: var(--uui-size-space-3) 0 var(--uui-size-space-2);
			}
		`
];
S([
  A()
], _.prototype, "_extraction", 2);
S([
  A()
], _.prototype, "_zoneDetection", 2);
S([
  A()
], _.prototype, "_config", 2);
S([
  A()
], _.prototype, "_workflowName", 2);
S([
  A()
], _.prototype, "_loading", 2);
S([
  A()
], _.prototype, "_extracting", 2);
S([
  A()
], _.prototype, "_error", 2);
S([
  A()
], _.prototype, "_successMessage", 2);
S([
  A()
], _.prototype, "_collapsedSections", 2);
S([
  A()
], _.prototype, "_transformResult", 2);
S([
  A()
], _.prototype, "_viewMode", 2);
_ = S([
  gt("up-doc-workflow-source-view")
], _);
const bs = _;
export {
  _ as UpDocWorkflowSourceViewElement,
  bs as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-COkFu83a.js.map
