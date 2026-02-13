var mt = Object.defineProperty;
var xt = (t, e, s) => e in t ? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var w = (t, e, s) => xt(t, typeof e != "symbol" ? e + "" : e, s);
import { c as wt, d as Ie, b as vt, g as _t, h as $t, i as yt, j as zt, s as St, k as Rt, u as Tt } from "./workflow.service-C2GzEBYw.js";
import { UmbModalToken as Pt, UMB_MODAL_MANAGER_CONTEXT as Ee } from "@umbraco-cms/backoffice/modal";
import { html as m, nothing as y, css as Ct, state as R, customElement as At } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Mt } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as It } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as De } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Et } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as Dt } from "@umbraco-cms/backoffice/media";
function he() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var D = he();
function Le(t) {
  D = t;
}
var H = { exec: () => null };
function b(t, e = "") {
  let s = typeof t == "string" ? t : t.source, i = { replace: (n, a) => {
    let l = typeof a == "string" ? a : a.source;
    return l = l.replace(S.caret, "$1"), s = s.replace(n, l), i;
  }, getRegex: () => new RegExp(s, e) };
  return i;
}
var Lt = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), S = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, Bt = /^(?:[ \t]*(?:\n|$))+/, Nt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, qt = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, V = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Zt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, de = /(?:[*+-]|\d{1,9}[.)])/, Be = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ne = b(Be).replace(/bull/g, de).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ot = b(Be).replace(/bull/g, de).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ge = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Ut = /^[^\n]+/, fe = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Ht = b(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", fe).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Vt = b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, de).getRegex(), ee = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ke = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Qt = b("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ke).replace("tag", ee).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), qe = b(ge).replace("hr", V).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex(), Gt = b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", qe).getRegex(), be = { blockquote: Gt, code: Nt, def: Ht, fences: qt, heading: Zt, hr: V, html: Qt, lheading: Ne, list: Vt, newline: Bt, paragraph: qe, table: H, text: Ut }, Se = b("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", V).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex(), Ft = { ...be, lheading: Ot, table: Se, paragraph: b(ge).replace("hr", V).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Se).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex() }, Wt = { ...be, html: b(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ke).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: H, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: b(ge).replace("hr", V).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ne).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, jt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Kt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Ze = /^( {2,}|\\)\n(?!\s*$)/, Xt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, te = /[\p{P}\p{S}]/u, me = /[\s\p{P}\p{S}]/u, Oe = /[^\s\p{P}\p{S}]/u, Jt = b(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, me).getRegex(), Ue = /(?!~)[\p{P}\p{S}]/u, Yt = /(?!~)[\s\p{P}\p{S}]/u, es = /(?:[^\s\p{P}\p{S}]|~)/u, ts = b(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Lt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), He = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, ss = b(He, "u").replace(/punct/g, te).getRegex(), ns = b(He, "u").replace(/punct/g, Ue).getRegex(), Ve = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", is = b(Ve, "gu").replace(/notPunctSpace/g, Oe).replace(/punctSpace/g, me).replace(/punct/g, te).getRegex(), as = b(Ve, "gu").replace(/notPunctSpace/g, es).replace(/punctSpace/g, Yt).replace(/punct/g, Ue).getRegex(), rs = b("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Oe).replace(/punctSpace/g, me).replace(/punct/g, te).getRegex(), ls = b(/\\(punct)/, "gu").replace(/punct/g, te).getRegex(), os = b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), cs = b(ke).replace("(?:-->|$)", "-->").getRegex(), us = b("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", cs).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), K = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, ps = b(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", K).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Qe = b(/^!?\[(label)\]\[(ref)\]/).replace("label", K).replace("ref", fe).getRegex(), Ge = b(/^!?\[(ref)\](?:\[\])?/).replace("ref", fe).getRegex(), hs = b("reflink|nolink(?!\\()", "g").replace("reflink", Qe).replace("nolink", Ge).getRegex(), Re = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, xe = { _backpedal: H, anyPunctuation: ls, autolink: os, blockSkip: ts, br: Ze, code: Kt, del: H, emStrongLDelim: ss, emStrongRDelimAst: is, emStrongRDelimUnd: rs, escape: jt, link: ps, nolink: Ge, punctuation: Jt, reflink: Qe, reflinkSearch: hs, tag: us, text: Xt, url: H }, ds = { ...xe, link: b(/^!?\[(label)\]\((.*?)\)/).replace("label", K).getRegex(), reflink: b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", K).getRegex() }, ae = { ...xe, emStrongRDelimAst: as, emStrongLDelim: ns, url: b(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Re).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: b(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Re).getRegex() }, gs = { ...ae, br: b(Ze).replace("{2,}", "*").getRegex(), text: b(ae.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, F = { normal: be, gfm: Ft, pedantic: Wt }, Z = { normal: xe, gfm: ae, breaks: gs, pedantic: ds }, fs = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Te = (t) => fs[t];
function A(t, e) {
  if (e) {
    if (S.escapeTest.test(t)) return t.replace(S.escapeReplace, Te);
  } else if (S.escapeTestNoEncode.test(t)) return t.replace(S.escapeReplaceNoEncode, Te);
  return t;
}
function Pe(t) {
  try {
    t = encodeURI(t).replace(S.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Ce(t, e) {
  var a;
  let s = t.replace(S.findPipe, (l, r, c) => {
    let o = !1, p = r;
    for (; --p >= 0 && c[p] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), i = s.split(S.splitPipe), n = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !((a = i.at(-1)) != null && a.trim()) && i.pop(), e) if (i.length > e) i.splice(e);
  else for (; i.length < e; ) i.push("");
  for (; n < i.length; n++) i[n] = i[n].trim().replace(S.slashPipe, "|");
  return i;
}
function O(t, e, s) {
  let i = t.length;
  if (i === 0) return "";
  let n = 0;
  for (; n < i && t.charAt(i - n - 1) === e; )
    n++;
  return t.slice(0, i - n);
}
function ks(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let s = 0;
  for (let i = 0; i < t.length; i++) if (t[i] === "\\") i++;
  else if (t[i] === e[0]) s++;
  else if (t[i] === e[1] && (s--, s < 0)) return i;
  return s > 0 ? -2 : -1;
}
function Ae(t, e, s, i, n) {
  let a = e.href, l = e.title || null, r = t[1].replace(n.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  let c = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: s, href: a, title: l, text: r, tokens: i.inlineTokens(r) };
  return i.state.inLink = !1, c;
}
function bs(t, e, s) {
  let i = t.match(s.other.indentCodeCompensation);
  if (i === null) return e;
  let n = i[1];
  return e.split(`
`).map((a) => {
    let l = a.match(s.other.beginningSpace);
    if (l === null) return a;
    let [r] = l;
    return r.length >= n.length ? a.slice(n.length) : a;
  }).join(`
`);
}
var X = class {
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
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? s : O(s, `
`) };
    }
  }
  fences(t) {
    let e = this.rules.block.fences.exec(t);
    if (e) {
      let s = e[0], i = bs(s, e[3] || "", this.rules);
      return { type: "code", raw: s, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: i };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let s = e[2].trim();
      if (this.rules.other.endingHash.test(s)) {
        let i = O(s, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceChar.test(i)) && (s = i.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: s, tokens: this.lexer.inline(s) };
    }
  }
  hr(t) {
    let e = this.rules.block.hr.exec(t);
    if (e) return { type: "hr", raw: O(e[0], `
`) };
  }
  blockquote(t) {
    let e = this.rules.block.blockquote.exec(t);
    if (e) {
      let s = O(e[0], `
`).split(`
`), i = "", n = "", a = [];
      for (; s.length > 0; ) {
        let l = !1, r = [], c;
        for (c = 0; c < s.length; c++) if (this.rules.other.blockquoteStart.test(s[c])) r.push(s[c]), l = !0;
        else if (!l) r.push(s[c]);
        else break;
        s = s.slice(c);
        let o = r.join(`
`), p = o.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${o}` : o, n = n ? `${n}
${p}` : p;
        let f = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, a, !0), this.lexer.state.top = f, s.length === 0) break;
        let g = a.at(-1);
        if ((g == null ? void 0 : g.type) === "code") break;
        if ((g == null ? void 0 : g.type) === "blockquote") {
          let u = g, v = u.raw + `
` + s.join(`
`), k = this.blockquote(v);
          a[a.length - 1] = k, i = i.substring(0, i.length - u.raw.length) + k.raw, n = n.substring(0, n.length - u.text.length) + k.text;
          break;
        } else if ((g == null ? void 0 : g.type) === "list") {
          let u = g, v = u.raw + `
` + s.join(`
`), k = this.list(v);
          a[a.length - 1] = k, i = i.substring(0, i.length - g.raw.length) + k.raw, n = n.substring(0, n.length - u.raw.length) + k.raw, s = v.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: i, tokens: a, text: n };
    }
  }
  list(t) {
    var s, i;
    let e = this.rules.block.list.exec(t);
    if (e) {
      let n = e[1].trim(), a = n.length > 1, l = { type: "list", raw: "", ordered: a, start: a ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = a ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = a ? n : "[*+-]");
      let r = this.rules.other.listItemRegex(n), c = !1;
      for (; t; ) {
        let p = !1, f = "", g = "";
        if (!(e = r.exec(t)) || this.rules.block.hr.test(t)) break;
        f = e[0], t = t.substring(f.length);
        let u = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (M) => " ".repeat(3 * M.length)), v = t.split(`
`, 1)[0], k = !u.trim(), $ = 0;
        if (this.options.pedantic ? ($ = 2, g = u.trimStart()) : k ? $ = e[1].length + 1 : ($ = e[2].search(this.rules.other.nonSpaceChar), $ = $ > 4 ? 1 : $, g = u.slice($), $ += e[1].length), k && this.rules.other.blankLine.test(v) && (f += v + `
`, t = t.substring(v.length + 1), p = !0), !p) {
          let M = this.rules.other.nextBulletRegex($), G = this.rules.other.hrRegex($), ye = this.rules.other.fencesBeginRegex($), ze = this.rules.other.headingBeginRegex($), bt = this.rules.other.htmlBeginRegex($);
          for (; t; ) {
            let ie = t.split(`
`, 1)[0], q;
            if (v = ie, this.options.pedantic ? (v = v.replace(this.rules.other.listReplaceNesting, "  "), q = v) : q = v.replace(this.rules.other.tabCharGlobal, "    "), ye.test(v) || ze.test(v) || bt.test(v) || M.test(v) || G.test(v)) break;
            if (q.search(this.rules.other.nonSpaceChar) >= $ || !v.trim()) g += `
` + q.slice($);
            else {
              if (k || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ye.test(u) || ze.test(u) || G.test(u)) break;
              g += `
` + v;
            }
            !k && !v.trim() && (k = !0), f += ie + `
`, t = t.substring(ie.length + 1), u = q.slice($);
          }
        }
        l.loose || (c ? l.loose = !0 : this.rules.other.doubleBlankLine.test(f) && (c = !0)), l.items.push({ type: "list_item", raw: f, task: !!this.options.gfm && this.rules.other.listIsTask.test(g), loose: !1, text: g, tokens: [] }), l.raw += f;
      }
      let o = l.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      l.raw = l.raw.trimEnd();
      for (let p of l.items) {
        if (this.lexer.state.top = !1, p.tokens = this.lexer.blockTokens(p.text, []), p.task) {
          if (p.text = p.text.replace(this.rules.other.listReplaceTask, ""), ((s = p.tokens[0]) == null ? void 0 : s.type) === "text" || ((i = p.tokens[0]) == null ? void 0 : i.type) === "paragraph") {
            p.tokens[0].raw = p.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), p.tokens[0].text = p.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let g = this.lexer.inlineQueue.length - 1; g >= 0; g--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)) {
              this.lexer.inlineQueue[g].src = this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let f = this.rules.other.listTaskCheckbox.exec(p.raw);
          if (f) {
            let g = { type: "checkbox", raw: f[0] + " ", checked: f[0] !== "[ ]" };
            p.checked = g.checked, l.loose ? p.tokens[0] && ["paragraph", "text"].includes(p.tokens[0].type) && "tokens" in p.tokens[0] && p.tokens[0].tokens ? (p.tokens[0].raw = g.raw + p.tokens[0].raw, p.tokens[0].text = g.raw + p.tokens[0].text, p.tokens[0].tokens.unshift(g)) : p.tokens.unshift({ type: "paragraph", raw: g.raw, text: g.raw, tokens: [g] }) : p.tokens.unshift(g);
          }
        }
        if (!l.loose) {
          let f = p.tokens.filter((u) => u.type === "space"), g = f.length > 0 && f.some((u) => this.rules.other.anyLine.test(u.raw));
          l.loose = g;
        }
      }
      if (l.loose) for (let p of l.items) {
        p.loose = !0;
        for (let f of p.tokens) f.type === "text" && (f.type = "paragraph");
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
      let s = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), i = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: s, raw: e[0], href: i, title: n };
    }
  }
  table(t) {
    var l;
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let s = Ce(e[1]), i = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = (l = e[3]) != null && l.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (s.length === i.length) {
      for (let r of i) this.rules.other.tableAlignRight.test(r) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(r) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(r) ? a.align.push("left") : a.align.push(null);
      for (let r = 0; r < s.length; r++) a.header.push({ text: s[r], tokens: this.lexer.inline(s[r]), header: !0, align: a.align[r] });
      for (let r of n) a.rows.push(Ce(r, a.header.length).map((c, o) => ({ text: c, tokens: this.lexer.inline(c), header: !1, align: a.align[o] })));
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
        let a = O(s.slice(0, -1), "\\");
        if ((s.length - a.length) % 2 === 0) return;
      } else {
        let a = ks(e[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let i = e[2], n = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(i);
        a && (i = a[1], n = a[3]);
      } else n = e[3] ? e[3].slice(1, -1) : "";
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? i = i.slice(1) : i = i.slice(1, -1)), Ae(e, { href: i && i.replace(this.rules.inline.anyPunctuation, "$1"), title: n && n.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let s;
    if ((s = this.rules.inline.reflink.exec(t)) || (s = this.rules.inline.nolink.exec(t))) {
      let i = (s[2] || s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), n = e[i.toLowerCase()];
      if (!n) {
        let a = s[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return Ae(s, n, s[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, s = "") {
    let i = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!i || i[3] && s.match(this.rules.other.unicodeAlphaNumeric)) && (!(i[1] || i[2]) || !s || this.rules.inline.punctuation.exec(s))) {
      let n = [...i[0]].length - 1, a, l, r = n, c = 0, o = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (o.lastIndex = 0, e = e.slice(-1 * t.length + n); (i = o.exec(e)) != null; ) {
        if (a = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !a) continue;
        if (l = [...a].length, i[3] || i[4]) {
          r += l;
          continue;
        } else if ((i[5] || i[6]) && n % 3 && !((n + l) % 3)) {
          c += l;
          continue;
        }
        if (r -= l, r > 0) continue;
        l = Math.min(l, l + r + c);
        let p = [...i[0]][0].length, f = t.slice(0, n + i.index + p + l);
        if (Math.min(n, l) % 2) {
          let u = f.slice(1, -1);
          return { type: "em", raw: f, text: u, tokens: this.lexer.inlineTokens(u) };
        }
        let g = f.slice(2, -2);
        return { type: "strong", raw: f, text: g, tokens: this.lexer.inlineTokens(g) };
      }
    }
  }
  codespan(t) {
    let e = this.rules.inline.code.exec(t);
    if (e) {
      let s = e[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(s), n = this.rules.other.startingSpaceChar.test(s) && this.rules.other.endingSpaceChar.test(s);
      return i && n && (s = s.substring(1, s.length - 1)), { type: "codespan", raw: e[0], text: s };
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
      let s, i;
      return e[2] === "@" ? (s = e[1], i = "mailto:" + s) : (s = e[1], i = s), { type: "link", raw: e[0], text: s, href: i, tokens: [{ type: "text", raw: s, text: s }] };
    }
  }
  url(t) {
    var s;
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let i, n;
      if (e[2] === "@") i = e[0], n = "mailto:" + i;
      else {
        let a;
        do
          a = e[0], e[0] = ((s = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : s[0]) ?? "";
        while (a !== e[0]);
        i = e[0], e[1] === "www." ? n = "http://" + e[0] : n = e[0];
      }
      return { type: "link", raw: e[0], text: i, href: n, tokens: [{ type: "text", raw: i, text: i }] };
    }
  }
  inlineText(t) {
    let e = this.rules.inline.text.exec(t);
    if (e) {
      let s = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: s };
    }
  }
}, T = class re {
  constructor(e) {
    w(this, "tokens");
    w(this, "options");
    w(this, "state");
    w(this, "inlineQueue");
    w(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || D, this.options.tokenizer = this.options.tokenizer || new X(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let s = { other: S, block: F.normal, inline: Z.normal };
    this.options.pedantic ? (s.block = F.pedantic, s.inline = Z.pedantic) : this.options.gfm && (s.block = F.gfm, this.options.breaks ? s.inline = Z.breaks : s.inline = Z.gfm), this.tokenizer.rules = s;
  }
  static get rules() {
    return { block: F, inline: Z };
  }
  static lex(e, s) {
    return new re(s).lex(e);
  }
  static lexInline(e, s) {
    return new re(s).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(S.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let s = 0; s < this.inlineQueue.length; s++) {
      let i = this.inlineQueue[s];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, s = [], i = !1) {
    var n, a, l;
    for (this.options.pedantic && (e = e.replace(S.tabCharGlobal, "    ").replace(S.spaceLine, "")); e; ) {
      let r;
      if ((a = (n = this.options.extensions) == null ? void 0 : n.block) != null && a.some((o) => (r = o.call({ lexer: this }, e, s)) ? (e = e.substring(r.raw.length), s.push(r), !0) : !1)) continue;
      if (r = this.tokenizer.space(e)) {
        e = e.substring(r.raw.length);
        let o = s.at(-1);
        r.raw.length === 1 && o !== void 0 ? o.raw += `
` : s.push(r);
        continue;
      }
      if (r = this.tokenizer.code(e)) {
        e = e.substring(r.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.at(-1).src = o.text) : s.push(r);
        continue;
      }
      if (r = this.tokenizer.fences(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      if (r = this.tokenizer.heading(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      if (r = this.tokenizer.hr(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      if (r = this.tokenizer.blockquote(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      if (r = this.tokenizer.list(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      if (r = this.tokenizer.html(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      if (r = this.tokenizer.def(e)) {
        e = e.substring(r.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, s.push(r));
        continue;
      }
      if (r = this.tokenizer.table(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      if (r = this.tokenizer.lheading(e)) {
        e = e.substring(r.raw.length), s.push(r);
        continue;
      }
      let c = e;
      if ((l = this.options.extensions) != null && l.startBlock) {
        let o = 1 / 0, p = e.slice(1), f;
        this.options.extensions.startBlock.forEach((g) => {
          f = g.call({ lexer: this }, p), typeof f == "number" && f >= 0 && (o = Math.min(o, f));
        }), o < 1 / 0 && o >= 0 && (c = e.substring(0, o + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(c))) {
        let o = s.at(-1);
        i && (o == null ? void 0 : o.type) === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(r), i = c.length !== e.length, e = e.substring(r.raw.length);
        continue;
      }
      if (r = this.tokenizer.text(e)) {
        e = e.substring(r.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(r);
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
    var c, o, p, f, g;
    let i = e, n = null;
    if (this.tokens.links) {
      let u = Object.keys(this.tokens.links);
      if (u.length > 0) for (; (n = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; ) u.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (n = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; ) i = i.slice(0, n.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let a;
    for (; (n = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; ) a = n[2] ? n[2].length : 0, i = i.slice(0, n.index + a) + "[" + "a".repeat(n[0].length - a - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    i = ((o = (c = this.options.hooks) == null ? void 0 : c.emStrongMask) == null ? void 0 : o.call({ lexer: this }, i)) ?? i;
    let l = !1, r = "";
    for (; e; ) {
      l || (r = ""), l = !1;
      let u;
      if ((f = (p = this.options.extensions) == null ? void 0 : p.inline) != null && f.some((k) => (u = k.call({ lexer: this }, e, s)) ? (e = e.substring(u.raw.length), s.push(u), !0) : !1)) continue;
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
        let k = s.at(-1);
        u.type === "text" && (k == null ? void 0 : k.type) === "text" ? (k.raw += u.raw, k.text += u.text) : s.push(u);
        continue;
      }
      if (u = this.tokenizer.emStrong(e, i, r)) {
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
      if ((g = this.options.extensions) != null && g.startInline) {
        let k = 1 / 0, $ = e.slice(1), M;
        this.options.extensions.startInline.forEach((G) => {
          M = G.call({ lexer: this }, $), typeof M == "number" && M >= 0 && (k = Math.min(k, M));
        }), k < 1 / 0 && k >= 0 && (v = e.substring(0, k + 1));
      }
      if (u = this.tokenizer.inlineText(v)) {
        e = e.substring(u.raw.length), u.raw.slice(-1) !== "_" && (r = u.raw.slice(-1)), l = !0;
        let k = s.at(-1);
        (k == null ? void 0 : k.type) === "text" ? (k.raw += u.raw, k.text += u.text) : s.push(u);
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
    return s;
  }
}, J = class {
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
    let i = (a = (e || "").match(S.notSpaceStart)) == null ? void 0 : a[0], n = t.replace(S.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + A(i) + '">' + (s ? n : A(n, !0)) + `</code></pre>
` : "<pre><code>" + (s ? n : A(n, !0)) + `</code></pre>
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
    let e = t.ordered, s = t.start, i = "";
    for (let l = 0; l < t.items.length; l++) {
      let r = t.items[l];
      i += this.listitem(r);
    }
    let n = e ? "ol" : "ul", a = e && s !== 1 ? ' start="' + s + '"' : "";
    return "<" + n + a + `>
` + i + "</" + n + `>
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
    let i = "";
    for (let n = 0; n < t.rows.length; n++) {
      let a = t.rows[n];
      s = "";
      for (let l = 0; l < a.length; l++) s += this.tablecell(a[l]);
      i += this.tablerow({ text: s });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + i + `</table>
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
    return `<code>${A(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, tokens: s }) {
    let i = this.parser.parseInline(s), n = Pe(t);
    if (n === null) return i;
    t = n;
    let a = '<a href="' + t + '"';
    return e && (a += ' title="' + A(e) + '"'), a += ">" + i + "</a>", a;
  }
  image({ href: t, title: e, text: s, tokens: i }) {
    i && (s = this.parser.parseInline(i, this.parser.textRenderer));
    let n = Pe(t);
    if (n === null) return A(s);
    t = n;
    let a = `<img src="${t}" alt="${s}"`;
    return e && (a += ` title="${A(e)}"`), a += ">", a;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : A(t.text);
  }
}, we = class {
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
}, P = class le {
  constructor(e) {
    w(this, "options");
    w(this, "renderer");
    w(this, "textRenderer");
    this.options = e || D, this.options.renderer = this.options.renderer || new J(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new we();
  }
  static parse(e, s) {
    return new le(s).parse(e);
  }
  static parseInline(e, s) {
    return new le(s).parseInline(e);
  }
  parse(e) {
    var i, n;
    let s = "";
    for (let a = 0; a < e.length; a++) {
      let l = e[a];
      if ((n = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && n[l.type]) {
        let c = l, o = this.options.extensions.renderers[c.type].call({ parser: this }, c);
        if (o !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(c.type)) {
          s += o || "";
          continue;
        }
      }
      let r = l;
      switch (r.type) {
        case "space": {
          s += this.renderer.space(r);
          break;
        }
        case "hr": {
          s += this.renderer.hr(r);
          break;
        }
        case "heading": {
          s += this.renderer.heading(r);
          break;
        }
        case "code": {
          s += this.renderer.code(r);
          break;
        }
        case "table": {
          s += this.renderer.table(r);
          break;
        }
        case "blockquote": {
          s += this.renderer.blockquote(r);
          break;
        }
        case "list": {
          s += this.renderer.list(r);
          break;
        }
        case "checkbox": {
          s += this.renderer.checkbox(r);
          break;
        }
        case "html": {
          s += this.renderer.html(r);
          break;
        }
        case "def": {
          s += this.renderer.def(r);
          break;
        }
        case "paragraph": {
          s += this.renderer.paragraph(r);
          break;
        }
        case "text": {
          s += this.renderer.text(r);
          break;
        }
        default: {
          let c = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent) return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return s;
  }
  parseInline(e, s = this.renderer) {
    var n, a;
    let i = "";
    for (let l = 0; l < e.length; l++) {
      let r = e[l];
      if ((a = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && a[r.type]) {
        let o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          i += o || "";
          continue;
        }
      }
      let c = r;
      switch (c.type) {
        case "escape": {
          i += s.text(c);
          break;
        }
        case "html": {
          i += s.html(c);
          break;
        }
        case "link": {
          i += s.link(c);
          break;
        }
        case "image": {
          i += s.image(c);
          break;
        }
        case "checkbox": {
          i += s.checkbox(c);
          break;
        }
        case "strong": {
          i += s.strong(c);
          break;
        }
        case "em": {
          i += s.em(c);
          break;
        }
        case "codespan": {
          i += s.codespan(c);
          break;
        }
        case "br": {
          i += s.br(c);
          break;
        }
        case "del": {
          i += s.del(c);
          break;
        }
        case "text": {
          i += s.text(c);
          break;
        }
        default: {
          let o = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return i;
  }
}, W, U = (W = class {
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
    return this.block ? T.lex : T.lexInline;
  }
  provideParser() {
    return this.block ? P.parse : P.parseInline;
  }
}, w(W, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), w(W, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), W), ms = class {
  constructor(...t) {
    w(this, "defaults", he());
    w(this, "options", this.setOptions);
    w(this, "parse", this.parseMarkdown(!0));
    w(this, "parseInline", this.parseMarkdown(!1));
    w(this, "Parser", P);
    w(this, "Renderer", J);
    w(this, "TextRenderer", we);
    w(this, "Lexer", T);
    w(this, "Tokenizer", X);
    w(this, "Hooks", U);
    this.use(...t);
  }
  walkTokens(t, e) {
    var i, n;
    let s = [];
    for (let a of t) switch (s = s.concat(e.call(this, a)), a.type) {
      case "table": {
        let l = a;
        for (let r of l.header) s = s.concat(this.walkTokens(r.tokens, e));
        for (let r of l.rows) for (let c of r) s = s.concat(this.walkTokens(c.tokens, e));
        break;
      }
      case "list": {
        let l = a;
        s = s.concat(this.walkTokens(l.items, e));
        break;
      }
      default: {
        let l = a;
        (n = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && n[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((r) => {
          let c = l[r].flat(1 / 0);
          s = s.concat(this.walkTokens(c, e));
        }) : l.tokens && (s = s.concat(this.walkTokens(l.tokens, e)));
      }
    }
    return s;
  }
  use(...t) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return t.forEach((s) => {
      let i = { ...s };
      if (i.async = this.defaults.async || i.async || !1, s.extensions && (s.extensions.forEach((n) => {
        if (!n.name) throw new Error("extension name required");
        if ("renderer" in n) {
          let a = e.renderers[n.name];
          a ? e.renderers[n.name] = function(...l) {
            let r = n.renderer.apply(this, l);
            return r === !1 && (r = a.apply(this, l)), r;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = e[n.level];
          a ? a.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), i.extensions = e), s.renderer) {
        let n = this.defaults.renderer || new J(this.defaults);
        for (let a in s.renderer) {
          if (!(a in n)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let l = a, r = s.renderer[l], c = n[l];
          n[l] = (...o) => {
            let p = r.apply(n, o);
            return p === !1 && (p = c.apply(n, o)), p || "";
          };
        }
        i.renderer = n;
      }
      if (s.tokenizer) {
        let n = this.defaults.tokenizer || new X(this.defaults);
        for (let a in s.tokenizer) {
          if (!(a in n)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let l = a, r = s.tokenizer[l], c = n[l];
          n[l] = (...o) => {
            let p = r.apply(n, o);
            return p === !1 && (p = c.apply(n, o)), p;
          };
        }
        i.tokenizer = n;
      }
      if (s.hooks) {
        let n = this.defaults.hooks || new U();
        for (let a in s.hooks) {
          if (!(a in n)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let l = a, r = s.hooks[l], c = n[l];
          U.passThroughHooks.has(a) ? n[l] = (o) => {
            if (this.defaults.async && U.passThroughHooksRespectAsync.has(a)) return (async () => {
              let f = await r.call(n, o);
              return c.call(n, f);
            })();
            let p = r.call(n, o);
            return c.call(n, p);
          } : n[l] = (...o) => {
            if (this.defaults.async) return (async () => {
              let f = await r.apply(n, o);
              return f === !1 && (f = await c.apply(n, o)), f;
            })();
            let p = r.apply(n, o);
            return p === !1 && (p = c.apply(n, o)), p;
          };
        }
        i.hooks = n;
      }
      if (s.walkTokens) {
        let n = this.defaults.walkTokens, a = s.walkTokens;
        i.walkTokens = function(l) {
          let r = [];
          return r.push(a.call(this, l)), n && (r = r.concat(n.call(this, l))), r;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, e) {
    return T.lex(t, e ?? this.defaults);
  }
  parser(t, e) {
    return P.parse(t, e ?? this.defaults);
  }
  parseMarkdown(t) {
    return (e, s) => {
      let i = { ...s }, n = { ...this.defaults, ...i }, a = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && i.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (n.hooks && (n.hooks.options = n, n.hooks.block = t), n.async) return (async () => {
        let l = n.hooks ? await n.hooks.preprocess(e) : e, r = await (n.hooks ? await n.hooks.provideLexer() : t ? T.lex : T.lexInline)(l, n), c = n.hooks ? await n.hooks.processAllTokens(r) : r;
        n.walkTokens && await Promise.all(this.walkTokens(c, n.walkTokens));
        let o = await (n.hooks ? await n.hooks.provideParser() : t ? P.parse : P.parseInline)(c, n);
        return n.hooks ? await n.hooks.postprocess(o) : o;
      })().catch(a);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let l = (n.hooks ? n.hooks.provideLexer() : t ? T.lex : T.lexInline)(e, n);
        n.hooks && (l = n.hooks.processAllTokens(l)), n.walkTokens && this.walkTokens(l, n.walkTokens);
        let r = (n.hooks ? n.hooks.provideParser() : t ? P.parse : P.parseInline)(l, n);
        return n.hooks && (r = n.hooks.postprocess(r)), r;
      } catch (l) {
        return a(l);
      }
    };
  }
  onError(t, e) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let i = "<p>An error occurred:</p><pre>" + A(s.message + "", !0) + "</pre>";
        return e ? Promise.resolve(i) : i;
      }
      if (e) return Promise.reject(s);
      throw s;
    };
  }
}, E = new ms();
function x(t, e) {
  return E.parse(t, e);
}
x.options = x.setOptions = function(t) {
  return E.setOptions(t), x.defaults = E.defaults, Le(x.defaults), x;
};
x.getDefaults = he;
x.defaults = D;
x.use = function(...t) {
  return E.use(...t), x.defaults = E.defaults, Le(x.defaults), x;
};
x.walkTokens = function(t, e) {
  return E.walkTokens(t, e);
};
x.parseInline = E.parseInline;
x.Parser = P;
x.parser = P.parse;
x.Renderer = J;
x.TextRenderer = we;
x.Lexer = T;
x.lexer = T.lex;
x.Tokenizer = X;
x.Hooks = U;
x.parse = x;
x.options;
x.setOptions;
x.use;
x.walkTokens;
x.parseInline;
P.parse;
T.lex;
function xs(t) {
  if (!t) return "";
  try {
    const e = x.parse(t, {
      gfm: !0,
      breaks: !1
    });
    return typeof e == "string" ? e : (console.warn("marked returned Promise, using fallback"), `<p>${t}</p>`);
  } catch (e) {
    return console.error("Markdown conversion failed:", e), `<p>${t.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  }
}
function ws(t) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const vs = new Pt("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var _s = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, Fe = (t) => {
  throw TypeError(t);
}, z = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? $s(e, s) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (n = (i ? l(e, s, n) : l(n)) || n);
  return i && n && _s(e, s, n), n;
}, ve = (t, e, s) => e.has(t) || Fe("Cannot " + s), I = (t, e, s) => (ve(t, e, "read from private field"), s ? s.call(t) : e.get(t)), Me = (t, e, s) => e.has(t) ? Fe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), ys = (t, e, s, i) => (ve(t, e, "write to private field"), e.set(t, s), s), d = (t, e, s) => (ve(t, e, "access private method"), s), C, h, We, B, L, je, Ke, Xe, j, Je, Ye, se, et, ne, tt, _e, Q, N, st, oe, ce, Y, nt, it, ue, $e, at, rt, lt, ot, ct, ut, pt, ht, dt, pe, gt, ft, kt;
let _ = class extends Mt {
  constructor() {
    super(...arguments), Me(this, h), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._allCollapsed = !1, Me(this, C, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Et, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), d(this, h, We).call(this));
      });
    });
  }
  render() {
    if (this._loading)
      return m`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return m`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
    const t = this._zoneDetection !== null || this._extraction !== null;
    return m`
			<umb-body-layout header-fit-height>
				${t ? d(this, h, pt).call(this) : y}
				${t ? d(this, h, ht).call(this) : y}
				${this._successMessage ? m`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : y}
				${t ? d(this, h, dt).call(this) : d(this, h, kt).call(this)}
			</umb-body-layout>
		`;
  }
};
C = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
We = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const t = await this.getContext(De);
      ys(this, C, await t.getLatestToken());
      const [e, s, i, n, a] = await Promise.all([
        wt(this._workflowName, I(this, C)),
        Ie(this._workflowName, I(this, C)),
        vt(this._workflowName, I(this, C)),
        _t(this._workflowName, I(this, C)),
        $t(this._workflowName, I(this, C))
      ]);
      this._extraction = e, this._zoneDetection = s, this._config = i, this._transformResult = n, this._sourceConfig = a, a != null && a.pages && Array.isArray(a.pages) && a.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = d(this, h, L).call(this, a.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to load data", console.error("Failed to load source data:", t);
    } finally {
      this._loading = !1;
    }
  }
};
B = function(t) {
  const e = /* @__PURE__ */ new Set();
  for (const s of t.split(",")) {
    const i = s.trim();
    if (!i) continue;
    const n = i.split("-").map((a) => parseInt(a.trim(), 10));
    if (n.length === 1 && !isNaN(n[0]))
      e.add(n[0]);
    else if (n.length === 2 && !isNaN(n[0]) && !isNaN(n[1]))
      for (let a = n[0]; a <= n[1]; a++)
        e.add(a);
  }
  return [...e].sort((s, i) => s - i);
};
L = function(t) {
  if (!t.length) return "";
  const e = [...t].sort((a, l) => a - l), s = [];
  let i = e[0], n = e[0];
  for (let a = 1; a < e.length; a++)
    e[a] === n + 1 || (s.push(i === n ? `${i}` : `${i}-${n}`), i = e[a]), n = e[a];
  return s.push(i === n ? `${i}` : `${i}-${n}`), s.join(", ");
};
je = function() {
  if (this._pageMode === "all") return null;
  const t = d(this, h, B).call(this, this._pageInputValue);
  return t.length > 0 ? t : null;
};
Ke = function(t) {
  if (this._pageMode === "all") return !0;
  const e = d(this, h, B).call(this, this._pageInputValue);
  return e.length === 0 || e.includes(t);
};
Xe = function(t) {
  var s, i;
  const e = ((s = this._zoneDetection) == null ? void 0 : s.totalPages) ?? ((i = this._extraction) == null ? void 0 : i.source.totalPages) ?? 0;
  if (e !== 0) {
    if (this._pageMode === "all") {
      const a = Array.from({ length: e }, (l, r) => r + 1).filter((l) => l !== t);
      this._pageMode = "custom", this._pageInputValue = d(this, h, L).call(this, a);
    } else {
      const n = d(this, h, B).call(this, this._pageInputValue);
      if (n.includes(t)) {
        const a = n.filter((l) => l !== t);
        this._pageInputValue = d(this, h, L).call(this, a), a.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const a = [...n, t].sort((l, r) => l - r);
        this._pageInputValue = d(this, h, L).call(this, a);
      }
      d(this, h, B).call(this, this._pageInputValue).length === e && (this._pageMode = "all", this._pageInputValue = "");
    }
    d(this, h, se).call(this);
  }
};
j = async function(t) {
  this._pageMode = t, t === "all" && (this._pageInputValue = ""), await d(this, h, se).call(this);
};
Je = async function(t) {
  const e = t.target;
  this._pageInputValue = e.value;
};
Ye = async function() {
  const t = d(this, h, B).call(this, this._pageInputValue);
  t.length > 0 ? (this._pageInputValue = d(this, h, L).call(this, t), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await d(this, h, se).call(this);
};
se = async function() {
  if (!this._workflowName) return;
  const t = d(this, h, je).call(this);
  await St(this._workflowName, t, I(this, C));
};
et = function() {
  if (!this._zoneDetection) return;
  this._allCollapsed = !this._allCollapsed;
  const t = /* @__PURE__ */ new Set();
  if (this._allCollapsed)
    for (const e of this._zoneDetection.pages)
      t.add(`page-${e.page}`);
  this._collapsed = t;
};
ne = async function() {
  var n;
  if (!this._workflowName) return;
  const s = await (await this.getContext(Ee)).open(this, Dt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((n = s == null ? void 0 : s.selection) != null && n.length)) return;
  const i = s.selection[0];
  i && await d(this, h, _e).call(this, i);
};
tt = async function() {
  var e;
  const t = (e = this._extraction) == null ? void 0 : e.source.mediaKey;
  if (!t)
    return d(this, h, ne).call(this);
  await d(this, h, _e).call(this, t);
};
_e = async function(t) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const s = await (await this.getContext(De)).getLatestToken(), [i, n] = await Promise.all([
        yt(this._workflowName, t, s),
        zt(this._workflowName, t, s)
      ]);
      if (i && (this._extraction = i), n) {
        this._transformResult = n;
        const a = await Ie(this._workflowName, s);
        this._zoneDetection = a;
        const l = n.diagnostics;
        this._successMessage = `Content extracted — ${l.totalSections} sections (${l.bulletListSections} bullet, ${l.paragraphSections} paragraph, ${l.subHeadedSections} sub-headed)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else i ? (this._successMessage = `Content extracted — ${i.elements.length} elements (transform unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (e) {
      this._error = e instanceof Error ? e.message : "Extraction failed", console.error("Extraction failed:", e);
    } finally {
      this._extracting = !1;
    }
  }
};
Q = function(t) {
  return this._collapsed.has(t);
};
N = function(t) {
  const e = new Set(this._collapsed);
  e.has(t) ? e.delete(t) : e.add(t), this._collapsed = e;
};
st = function(t) {
  if (!this._transformResult) return !0;
  const e = this._transformResult.sections.find((s) => s.id === t);
  return (e == null ? void 0 : e.included) ?? !0;
};
oe = async function(t, e) {
  if (!this._workflowName) return;
  const s = await Tt(this._workflowName, t, e, I(this, C));
  s && (this._transformResult = s);
};
ce = async function(t) {
  var o, p, f, g;
  if (!((o = this._config) != null && o.destination) || !this._workflowName) return;
  const i = await (await this.getContext(Ee)).open(this, vs, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!((p = i == null ? void 0 : i.selectedTargets) != null && p.length)) return;
  const n = [...((f = this._config.map) == null ? void 0 : f.mappings) ?? []], a = n.findIndex((u) => u.source === t), l = {
    source: t,
    destinations: i.selectedTargets.map((u) => ({ target: u.target, blockKey: u.blockKey })),
    enabled: !0
  };
  a >= 0 ? n[a] = l : n.push(l);
  const r = { ...this._config.map, version: ((g = this._config.map) == null ? void 0 : g.version) ?? "1.0", mappings: n };
  await Rt(this._workflowName, r, I(this, C)) && (this._config = { ...this._config, map: r });
};
Y = function(t) {
  var s, i;
  if (!((i = (s = this._config) == null ? void 0 : s.map) != null && i.mappings)) return [];
  const e = [];
  for (const n of this._config.map.mappings)
    if (n.source === t && n.enabled)
      for (const a of n.destinations)
        e.push(a);
  return e;
};
nt = function(t) {
  var s, i, n;
  if (!((s = this._config) != null && s.destination)) return t.target;
  if (t.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const l = a.blocks.find((r) => r.key === t.blockKey);
      if (l) {
        const r = (i = l.properties) == null ? void 0 : i.find((c) => c.alias === t.target);
        return `${l.label} > ${(r == null ? void 0 : r.label) || t.target}`;
      }
    }
  const e = this._config.destination.fields.find((a) => a.alias === t.target);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const l of a.blocks) {
        const r = (n = l.properties) == null ? void 0 : n.find((c) => c.alias === t.target);
        if (r) return `${l.label} > ${r.label || r.alias}`;
      }
  return t.target;
};
it = function(t) {
  const e = t.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(e) || /^\d+[\.\)]\s/.test(e) ? "list" : "paragraph";
};
ue = function(t) {
  const e = d(this, h, it).call(this, t.text);
  return m`
			<div class="element-item">
				<div class="element-content">
					<div class="element-text">${t.text}</div>
					<div class="element-meta">
						<span class="meta-badge text-type ${e}">${e === "list" ? "List" : "Paragraph"}</span>
						<span class="meta-badge font-size">${t.fontSize}pt</span>
						<span class="meta-badge font-name">${t.fontName}</span>
						<span class="meta-badge color" style="border-left: 3px solid ${t.color};">${t.color}</span>
					</div>
				</div>
			</div>
		`;
};
$e = function(t, e, s, i) {
  const n = d(this, h, Q).call(this, e), a = t.heading ? ws(t.heading.text) : i >= 0 ? `preamble-p${s}-z${i}` : `preamble-p${s}-unzoned`, l = d(this, h, st).call(this, a);
  if (!t.heading)
    return m`
				<div class="zone-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => d(this, h, N).call(this, e)}>
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@click=${(c) => c.stopPropagation()}
							@change=${(c) => d(this, h, oe).call(this, a, c.target.checked)}>
						</uui-toggle>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
					${l && !n ? m`
						${t.children.map((c) => d(this, h, ue).call(this, c))}
					` : y}
				</div>
			`;
  const r = t.heading;
  return m`
			<div class="zone-section ${l ? "" : "excluded"}">
				<div class="section-heading" @click=${() => d(this, h, N).call(this, e)}>
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(c) => c.stopPropagation()}
						@change=${(c) => d(this, h, oe).call(this, a, c.target.checked)}>
					</uui-toggle>
					<div class="heading-content">
						<div class="heading-text">${r.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${r.fontSize}pt</span>
							<span class="meta-badge font-name">${r.fontName}</span>
						</div>
					</div>
					<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${!n && l ? m`
					<div class="section-children">
						${t.children.map((c) => d(this, h, ue).call(this, c))}
					</div>
				` : y}
			</div>
		`;
};
at = function(t, e, s) {
  const i = `area-p${e}-a${s}`, n = d(this, h, Q).call(this, i), a = t.sections.length;
  return m`
			<div class="zone-area" style="border-left-color: ${t.color};">
				<div class="area-header" @click=${() => d(this, h, N).call(this, i)}>
					<span class="area-color-swatch" style="background: ${t.color};"></span>
					<span class="area-name">Area ${s + 1}</span>
					<span class="group-count">${a} section${a !== 1 ? "s" : ""}</span>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${n ? y : m`
					${t.sections.map(
    (l, r) => d(this, h, $e).call(this, l, `p${e}-a${s}-s${r}`, e, s)
  )}
				`}
			</div>
		`;
};
rt = function(t, e) {
  if (t.totalElements === 0) return y;
  const s = `area-p${e}-undefined`, i = d(this, h, Q).call(this, s), n = t.sections.length;
  return m`
			<div class="zone-area undefined" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => d(this, h, N).call(this, s)}>
					<span class="area-color-swatch undefined-swatch"></span>
					<span class="area-name undefined-name">Undefined</span>
					<span class="group-count">${n} section${n !== 1 ? "s" : ""}</span>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${i ? y : m`
					${t.sections.map(
    (a, l) => d(this, h, $e).call(this, a, `p${e}-undefined-s${l}`, e, -1)
  )}
				`}
			</div>
		`;
};
lt = function(t, e, s) {
  const i = `page-${t}`, n = d(this, h, Q).call(this, i), a = s && s.totalElements > 0, l = e.length + (a ? 1 : 0), r = e.reduce((o, p) => o + p.sections.length, 0) + ((s == null ? void 0 : s.sections.length) ?? 0), c = d(this, h, Ke).call(this, t);
  return m`
			<uui-box headline="Page ${t}" class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${l} area${l !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${c ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${c}
						@click=${(o) => o.stopPropagation()}
						@change=${() => d(this, h, Xe).call(this, t)}>
					</uui-toggle>
					<div class="collapse-trigger" @click=${() => d(this, h, N).call(this, i)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
				</div>
				${n ? y : m`
					${e.map((o, p) => d(this, h, at).call(this, o, t, p))}
					${a ? d(this, h, rt).call(this, s, t) : y}
				`}
			</uui-box>
		`;
};
ot = function() {
  return this._zoneDetection ? m`
			${this._zoneDetection.pages.map(
    (t) => d(this, h, lt).call(this, t.page, t.zones, t.unzonedContent)
  )}
		` : y;
};
ct = function() {
  return this._zoneDetection ? this._zoneDetection.pages.reduce((t, e) => {
    var s;
    return t + e.zones.reduce((i, n) => i + n.sections.length, 0) + (((s = e.unzonedContent) == null ? void 0 : s.sections.length) ?? 0);
  }, 0) : 0;
};
ut = function() {
  var e, s;
  return (((e = this._zoneDetection) == null ? void 0 : e.totalPages) ?? ((s = this._extraction) == null ? void 0 : s.source.totalPages) ?? 0) === 0 ? y : m`
			<div class="page-selection">
				<span class="page-selection-label">Pages</span>
				<label class="page-radio">
					<input type="radio" name="page-mode" value="all"
						.checked=${this._pageMode === "all"}
						@change=${() => d(this, h, j).call(this, "all")} />
					All
				</label>
				<label class="page-radio">
					<input type="radio" name="page-mode" value="custom"
						.checked=${this._pageMode === "custom"}
						@change=${() => d(this, h, j).call(this, "custom")} />
					Choose
				</label>
				<input type="text" class="page-input"
					placeholder="e.g. 1-2, 5, 7-9"
					.value=${this._pageInputValue}
					@input=${d(this, h, Je)}
					@blur=${d(this, h, Ye)}
					@focus=${() => {
    this._pageMode === "all" && d(this, h, j).call(this, "custom");
  }}
					?disabled=${this._pageMode === "all"} />
			</div>
		`;
};
pt = function() {
  return m`
			<div slot="header" class="source-header">
				<uui-tab-group dropdown-content-direction="vertical">
					<uui-tab label="Extracted" ?active=${this._viewMode === "elements"} @click=${() => {
    this._viewMode = "elements";
  }}>Extracted</uui-tab>
					<uui-tab label="Transformed" ?active=${this._viewMode === "transformed"} @click=${() => {
    this._viewMode = "transformed";
  }} ?disabled=${!this._transformResult}>Transformed</uui-tab>
				</uui-tab-group>
				<div class="header-actions">
					${d(this, h, ut).call(this)}
					<uui-button look="outline" label="Re-extract" @click=${d(this, h, tt)} ?disabled=${this._extracting}>
						<uui-icon name="icon-refresh"></uui-icon>
						Re-extract
					</uui-button>
					<uui-button look="default" compact label="Change PDF" @click=${d(this, h, ne)} ?disabled=${this._extracting}>
						<uui-icon name="icon-document"></uui-icon>
					</uui-button>
				</div>
			</div>
		`;
};
ht = function() {
  var p;
  const t = this._zoneDetection !== null, e = this._extraction !== null;
  if (!t && !e) return y;
  const s = ((p = this._zoneDetection) == null ? void 0 : p.totalPages) ?? (e ? this._extraction.source.totalPages : 0), i = t ? this._zoneDetection.pages.length : s, n = i < s, a = n ? `${i} of ${s}` : `${s}`, l = t ? this._zoneDetection.diagnostics.zonesDetected : 0, r = t ? d(this, h, ct).call(this) : 0, c = e ? this._extraction.source.fileName : "", o = e ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return m`
			<div class="stat-boxes">
				<div class="stat-box ${n ? "stat-box-filtered" : ""}">
					<span class="stat-number">${a}</span>
					<span class="stat-label">Pages</span>
				</div>
				<div class="stat-box">
					<span class="stat-number">${l}</span>
					<span class="stat-label">Zones</span>
				</div>
				<div class="stat-box">
					<span class="stat-number">${r}</span>
					<span class="stat-label">Sections</span>
				</div>
				<div class="stat-box stat-box-source">
					<span class="stat-source-name">${c}</span>
					<span class="stat-label">${o}</span>
				</div>
				${t && this._viewMode === "elements" ? m`
					<uui-button look="outline" compact label="${this._allCollapsed ? "Expand All" : "Collapse All"}" @click=${d(this, h, et)}>
						<uui-icon name="${this._allCollapsed ? "icon-navigation-down" : "icon-navigation-right"}"></uui-icon>
						${this._allCollapsed ? "Expand All" : "Collapse All"}
					</uui-button>
				` : y}
			</div>
		`;
};
dt = function() {
  const t = this._zoneDetection !== null;
  return this._viewMode === "elements" ? t ? d(this, h, ot).call(this) : y : d(this, h, ft).call(this);
};
pe = function(t) {
  const e = d(this, h, Y).call(this, t);
  return e.length === 0 ? m`<uui-button look="secondary" compact label="Map" @click=${() => d(this, h, ce).call(this, t)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : m`${e.map(
    (s) => m`<span class="meta-badge mapped-target" @click=${() => d(this, h, ce).call(this, t)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${d(this, h, nt).call(this, s)}
			</span>`
  )}`;
};
gt = function(t) {
  const e = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, s = `${t.id}.heading`, i = `${t.id}.content`, n = d(this, h, Y).call(this, s).length > 0, a = d(this, h, Y).call(this, i).length > 0, l = n || a, r = t.heading ?? "Preamble";
  return m`
			<uui-box headline=${r} class="transformed-section ${l ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${t.pattern}">${e[t.pattern] ?? t.pattern}</span>
					<span class="meta-badge">p${t.page}</span>
					${t.zoneColor ? m`<span class="area-color-swatch" style="background: ${t.zoneColor};"></span>` : y}
					<span class="meta-badge">${t.childCount} item${t.childCount !== 1 ? "s" : ""}</span>
					${t.heading ? d(this, h, pe).call(this, s) : y}
				</div>
				<div class="transformed-content" .innerHTML=${xs(t.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${d(this, h, pe).call(this, i)}
				</div>
			</uui-box>
		`;
};
ft = function() {
  if (!this._transformResult)
    return m`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Re-extract content to generate the transformed view.</p>
				</div>
			`;
  const t = this._transformResult.sections.filter((s) => s.included), e = this._transformResult.sections.length;
  return m`
			${t.map((s) => d(this, h, gt).call(this, s))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${e} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? m`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : y}
			</div>
		`;
};
kt = function() {
  return m`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${d(this, h, ne)} ?disabled=${this._extracting}>
					${this._extracting ? m`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
_.styles = [
  It,
  Ct`
			:host {
				display: block;
				height: 100%;
				--uui-tab-background: var(--uui-color-surface);
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

			/* Header: tabs left, actions right (Document Type editor pattern) */
			.source-header {
				display: flex;
				align-items: center;
				width: 100%;
			}

			.source-header uui-tab-group {
				flex: 1;
			}

			.header-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				padding-right: var(--uui-size-space-2);
			}

			/* Page selection (browser print dialog pattern) */
			.page-selection {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
				font-size: var(--uui-type-small-size);
			}

			.page-selection-label {
				font-weight: 600;
				color: var(--uui-color-text);
				white-space: nowrap;
			}

			.page-radio {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-1);
				cursor: pointer;
				white-space: nowrap;
				color: var(--uui-color-text);
			}

			.page-radio input[type="radio"] {
				margin: 0;
				cursor: pointer;
			}

			.page-input {
				width: 140px;
				padding: 2px 8px;
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				font-size: var(--uui-type-small-size);
				font-family: inherit;
				background: var(--uui-color-surface);
				color: var(--uui-color-text);
			}

			.page-input:focus {
				outline: none;
				border-color: var(--uui-color-focus);
			}

			.page-input:disabled {
				opacity: 0.4;
				cursor: not-allowed;
			}

			/* Page box include toggle */
			.page-header-actions {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-3);
			}

			.page-box.page-excluded {
				opacity: 0.4;
			}

			.stat-box-filtered .stat-number {
				color: var(--uui-color-warning);
			}

			/* Stat boxes in content area */
			.stat-boxes {
				display: flex;
				gap: var(--uui-size-space-3);
				padding: var(--uui-size-space-4) var(--uui-size-space-4) 0;
			}

			.stat-box {
				display: flex;
				flex-direction: column;
				padding: var(--uui-size-space-3) var(--uui-size-space-4);
				border: 1px solid var(--uui-color-border);
				border-radius: var(--uui-border-radius);
				background: var(--uui-color-surface);
				min-width: 80px;
			}

			.stat-number {
				font-size: var(--uui-type-h5-size);
				font-weight: 700;
				color: var(--uui-color-text);
			}

			.stat-label {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.stat-box-source {
				flex: 1;
			}

			.stat-source-name {
				font-size: var(--uui-type-default-size);
				font-weight: 600;
				color: var(--uui-color-text);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			/* Page groups */
			.page-box {
				margin: var(--uui-size-space-4);
			}

			/* Consistent collapse chevron across all levels */
			.collapse-chevron {
				color: var(--uui-color-text-alt);
				flex-shrink: 0;
				font-size: 12px;
			}

			.collapse-trigger {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				cursor: pointer;
			}

			.collapse-trigger:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			/* Zone areas (Level 2) */
			.zone-area {
				border-left: 4px solid var(--uui-color-border);
				margin: var(--uui-size-space-4) 0;
				margin-left: var(--uui-size-space-3);
			}

			.zone-area.undefined {
				opacity: 0.75;
			}

			.area-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
				cursor: pointer;
			}

			.area-header:hover {
				background: var(--uui-color-surface-emphasis);
			}

			.area-header:hover .collapse-chevron {
				color: var(--uui-color-text);
			}

			.area-color-swatch {
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 2px;
				border: 1px solid var(--uui-color-border);
			}

			.area-color-swatch.undefined-swatch {
				background: var(--uui-color-border-standalone);
			}

			.area-name {
				font-weight: 600;
				color: var(--uui-color-text);
			}

			.undefined-name {
				color: var(--uui-color-text-alt);
				font-style: italic;
			}

			/* Sections within areas (Level 3) */
			.zone-section {
				margin-left: var(--uui-size-space-3);
			}

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

			.section-heading:hover .collapse-chevron {
				color: var(--uui-color-text);
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

			.meta-badge.text-type {
				font-weight: 500;
				text-transform: uppercase;
				font-size: 10px;
				letter-spacing: 0.5px;
			}

			.meta-badge.text-type.list {
				color: var(--uui-color-positive);
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
z([
  R()
], _.prototype, "_extraction", 2);
z([
  R()
], _.prototype, "_zoneDetection", 2);
z([
  R()
], _.prototype, "_config", 2);
z([
  R()
], _.prototype, "_workflowName", 2);
z([
  R()
], _.prototype, "_loading", 2);
z([
  R()
], _.prototype, "_extracting", 2);
z([
  R()
], _.prototype, "_error", 2);
z([
  R()
], _.prototype, "_successMessage", 2);
z([
  R()
], _.prototype, "_collapsed", 2);
z([
  R()
], _.prototype, "_transformResult", 2);
z([
  R()
], _.prototype, "_viewMode", 2);
z([
  R()
], _.prototype, "_sourceConfig", 2);
z([
  R()
], _.prototype, "_pageMode", 2);
z([
  R()
], _.prototype, "_pageInputValue", 2);
z([
  R()
], _.prototype, "_allCollapsed", 2);
_ = z([
  At("up-doc-workflow-source-view")
], _);
const Es = _;
export {
  _ as UpDocWorkflowSourceViewElement,
  Es as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-DY_qYVLH.js.map
