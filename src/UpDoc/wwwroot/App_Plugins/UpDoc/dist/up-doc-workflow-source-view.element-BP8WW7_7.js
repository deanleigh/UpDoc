var mt = Object.defineProperty;
var wt = (t, e, s) => e in t ? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var w = (t, e, s) => wt(t, typeof e != "symbol" ? e + "" : e, s);
import { c as vt, d as Ee, b as _t, g as $t, h as yt, i as zt, j as St, s as Rt, k as Tt, u as Ct } from "./workflow.service-C2GzEBYw.js";
import { UmbModalToken as Pt, UMB_MODAL_MANAGER_CONTEXT as De } from "@umbraco-cms/backoffice/modal";
import { html as b, nothing as y, css as At, state as S, customElement as It } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Mt } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Et } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as Le } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Dt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as Lt } from "@umbraco-cms/backoffice/media";
function he() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var D = he();
function Be(t) {
  D = t;
}
var V = { exec: () => null };
function x(t, e = "") {
  let s = typeof t == "string" ? t : t.source, n = { replace: (i, a) => {
    let l = typeof a == "string" ? a : a.source;
    return l = l.replace(R.caret, "$1"), s = s.replace(i, l), n;
  }, getRegex: () => new RegExp(s, e) };
  return n;
}
var Bt = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), R = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, Nt = /^(?:[ \t]*(?:\n|$))+/, qt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Zt = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, U = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ot = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, de = /(?:[*+-]|\d{1,9}[.)])/, Ne = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, qe = x(Ne).replace(/bull/g, de).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ht = x(Ne).replace(/bull/g, de).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ge = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Vt = /^[^\n]+/, fe = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Ut = x(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", fe).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Qt = x(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, de).getRegex(), ee = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ke = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Gt = x("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ke).replace("tag", ee).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Ze = x(ge).replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex(), Ft = x(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ze).getRegex(), xe = { blockquote: Ft, code: qt, def: Ut, fences: Zt, heading: Ot, hr: U, html: Gt, lheading: qe, list: Qt, newline: Nt, paragraph: Ze, table: V, text: Vt }, Re = x("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex(), jt = { ...xe, lheading: Ht, table: Re, paragraph: x(ge).replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ee).getRegex() }, Wt = { ...xe, html: x(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ke).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: V, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: x(ge).replace("hr", U).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", qe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Kt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Xt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Oe = /^( {2,}|\\)\n(?!\s*$)/, Jt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, te = /[\p{P}\p{S}]/u, be = /[\s\p{P}\p{S}]/u, He = /[^\s\p{P}\p{S}]/u, Yt = x(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, be).getRegex(), Ve = /(?!~)[\p{P}\p{S}]/u, es = /(?!~)[\s\p{P}\p{S}]/u, ts = /(?:[^\s\p{P}\p{S}]|~)/u, ss = x(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Bt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Ue = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, is = x(Ue, "u").replace(/punct/g, te).getRegex(), ns = x(Ue, "u").replace(/punct/g, Ve).getRegex(), Qe = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", as = x(Qe, "gu").replace(/notPunctSpace/g, He).replace(/punctSpace/g, be).replace(/punct/g, te).getRegex(), rs = x(Qe, "gu").replace(/notPunctSpace/g, ts).replace(/punctSpace/g, es).replace(/punct/g, Ve).getRegex(), ls = x("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, He).replace(/punctSpace/g, be).replace(/punct/g, te).getRegex(), os = x(/\\(punct)/, "gu").replace(/punct/g, te).getRegex(), cs = x(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), us = x(ke).replace("(?:-->|$)", "-->").getRegex(), ps = x("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", us).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), K = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, hs = x(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", K).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ge = x(/^!?\[(label)\]\[(ref)\]/).replace("label", K).replace("ref", fe).getRegex(), Fe = x(/^!?\[(ref)\](?:\[\])?/).replace("ref", fe).getRegex(), ds = x("reflink|nolink(?!\\()", "g").replace("reflink", Ge).replace("nolink", Fe).getRegex(), Te = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, me = { _backpedal: V, anyPunctuation: os, autolink: cs, blockSkip: ss, br: Oe, code: Xt, del: V, emStrongLDelim: is, emStrongRDelimAst: as, emStrongRDelimUnd: ls, escape: Kt, link: hs, nolink: Fe, punctuation: Yt, reflink: Ge, reflinkSearch: ds, tag: ps, text: Jt, url: V }, gs = { ...me, link: x(/^!?\[(label)\]\((.*?)\)/).replace("label", K).getRegex(), reflink: x(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", K).getRegex() }, ae = { ...me, emStrongRDelimAst: rs, emStrongLDelim: ns, url: x(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Te).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: x(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Te).getRegex() }, fs = { ...ae, br: x(Oe).replace("{2,}", "*").getRegex(), text: x(ae.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, F = { normal: xe, gfm: jt, pedantic: Wt }, Z = { normal: me, gfm: ae, breaks: fs, pedantic: gs }, ks = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Ce = (t) => ks[t];
function A(t, e) {
  if (e) {
    if (R.escapeTest.test(t)) return t.replace(R.escapeReplace, Ce);
  } else if (R.escapeTestNoEncode.test(t)) return t.replace(R.escapeReplaceNoEncode, Ce);
  return t;
}
function Pe(t) {
  try {
    t = encodeURI(t).replace(R.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Ae(t, e) {
  var a;
  let s = t.replace(R.findPipe, (l, r, c) => {
    let o = !1, h = r;
    for (; --h >= 0 && c[h] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), n = s.split(R.splitPipe), i = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((a = n.at(-1)) != null && a.trim()) && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; i < n.length; i++) n[i] = n[i].trim().replace(R.slashPipe, "|");
  return n;
}
function O(t, e, s) {
  let n = t.length;
  if (n === 0) return "";
  let i = 0;
  for (; i < n && t.charAt(n - i - 1) === e; )
    i++;
  return t.slice(0, n - i);
}
function xs(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let s = 0;
  for (let n = 0; n < t.length; n++) if (t[n] === "\\") n++;
  else if (t[n] === e[0]) s++;
  else if (t[n] === e[1] && (s--, s < 0)) return n;
  return s > 0 ? -2 : -1;
}
function Ie(t, e, s, n, i) {
  let a = e.href, l = e.title || null, r = t[1].replace(i.other.outputLinkReplace, "$1");
  n.state.inLink = !0;
  let c = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: s, href: a, title: l, text: r, tokens: n.inlineTokens(r) };
  return n.state.inLink = !1, c;
}
function bs(t, e, s) {
  let n = t.match(s.other.indentCodeCompensation);
  if (n === null) return e;
  let i = n[1];
  return e.split(`
`).map((a) => {
    let l = a.match(s.other.beginningSpace);
    if (l === null) return a;
    let [r] = l;
    return r.length >= i.length ? a.slice(i.length) : a;
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
      let s = e[0], n = bs(s, e[3] || "", this.rules);
      return { type: "code", raw: s, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: n };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let s = e[2].trim();
      if (this.rules.other.endingHash.test(s)) {
        let n = O(s, "#");
        (this.options.pedantic || !n || this.rules.other.endingSpaceChar.test(n)) && (s = n.trim());
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
`), n = "", i = "", a = [];
      for (; s.length > 0; ) {
        let l = !1, r = [], c;
        for (c = 0; c < s.length; c++) if (this.rules.other.blockquoteStart.test(s[c])) r.push(s[c]), l = !0;
        else if (!l) r.push(s[c]);
        else break;
        s = s.slice(c);
        let o = r.join(`
`), h = o.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${o}` : o, i = i ? `${i}
${h}` : h;
        let f = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(h, a, !0), this.lexer.state.top = f, s.length === 0) break;
        let g = a.at(-1);
        if ((g == null ? void 0 : g.type) === "code") break;
        if ((g == null ? void 0 : g.type) === "blockquote") {
          let u = g, v = u.raw + `
` + s.join(`
`), k = this.blockquote(v);
          a[a.length - 1] = k, n = n.substring(0, n.length - u.raw.length) + k.raw, i = i.substring(0, i.length - u.text.length) + k.text;
          break;
        } else if ((g == null ? void 0 : g.type) === "list") {
          let u = g, v = u.raw + `
` + s.join(`
`), k = this.list(v);
          a[a.length - 1] = k, n = n.substring(0, n.length - g.raw.length) + k.raw, i = i.substring(0, i.length - u.raw.length) + k.raw, s = v.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: n, tokens: a, text: i };
    }
  }
  list(t) {
    var s, n;
    let e = this.rules.block.list.exec(t);
    if (e) {
      let i = e[1].trim(), a = i.length > 1, l = { type: "list", raw: "", ordered: a, start: a ? +i.slice(0, -1) : "", loose: !1, items: [] };
      i = a ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = a ? i : "[*+-]");
      let r = this.rules.other.listItemRegex(i), c = !1;
      for (; t; ) {
        let h = !1, f = "", g = "";
        if (!(e = r.exec(t)) || this.rules.block.hr.test(t)) break;
        f = e[0], t = t.substring(f.length);
        let u = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (I) => " ".repeat(3 * I.length)), v = t.split(`
`, 1)[0], k = !u.trim(), $ = 0;
        if (this.options.pedantic ? ($ = 2, g = u.trimStart()) : k ? $ = e[1].length + 1 : ($ = e[2].search(this.rules.other.nonSpaceChar), $ = $ > 4 ? 1 : $, g = u.slice($), $ += e[1].length), k && this.rules.other.blankLine.test(v) && (f += v + `
`, t = t.substring(v.length + 1), h = !0), !h) {
          let I = this.rules.other.nextBulletRegex($), G = this.rules.other.hrRegex($), ze = this.rules.other.fencesBeginRegex($), Se = this.rules.other.headingBeginRegex($), bt = this.rules.other.htmlBeginRegex($);
          for (; t; ) {
            let ne = t.split(`
`, 1)[0], q;
            if (v = ne, this.options.pedantic ? (v = v.replace(this.rules.other.listReplaceNesting, "  "), q = v) : q = v.replace(this.rules.other.tabCharGlobal, "    "), ze.test(v) || Se.test(v) || bt.test(v) || I.test(v) || G.test(v)) break;
            if (q.search(this.rules.other.nonSpaceChar) >= $ || !v.trim()) g += `
` + q.slice($);
            else {
              if (k || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ze.test(u) || Se.test(u) || G.test(u)) break;
              g += `
` + v;
            }
            !k && !v.trim() && (k = !0), f += ne + `
`, t = t.substring(ne.length + 1), u = q.slice($);
          }
        }
        l.loose || (c ? l.loose = !0 : this.rules.other.doubleBlankLine.test(f) && (c = !0)), l.items.push({ type: "list_item", raw: f, task: !!this.options.gfm && this.rules.other.listIsTask.test(g), loose: !1, text: g, tokens: [] }), l.raw += f;
      }
      let o = l.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      l.raw = l.raw.trimEnd();
      for (let h of l.items) {
        if (this.lexer.state.top = !1, h.tokens = this.lexer.blockTokens(h.text, []), h.task) {
          if (h.text = h.text.replace(this.rules.other.listReplaceTask, ""), ((s = h.tokens[0]) == null ? void 0 : s.type) === "text" || ((n = h.tokens[0]) == null ? void 0 : n.type) === "paragraph") {
            h.tokens[0].raw = h.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), h.tokens[0].text = h.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let g = this.lexer.inlineQueue.length - 1; g >= 0; g--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)) {
              this.lexer.inlineQueue[g].src = this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let f = this.rules.other.listTaskCheckbox.exec(h.raw);
          if (f) {
            let g = { type: "checkbox", raw: f[0] + " ", checked: f[0] !== "[ ]" };
            h.checked = g.checked, l.loose ? h.tokens[0] && ["paragraph", "text"].includes(h.tokens[0].type) && "tokens" in h.tokens[0] && h.tokens[0].tokens ? (h.tokens[0].raw = g.raw + h.tokens[0].raw, h.tokens[0].text = g.raw + h.tokens[0].text, h.tokens[0].tokens.unshift(g)) : h.tokens.unshift({ type: "paragraph", raw: g.raw, text: g.raw, tokens: [g] }) : h.tokens.unshift(g);
          }
        }
        if (!l.loose) {
          let f = h.tokens.filter((u) => u.type === "space"), g = f.length > 0 && f.some((u) => this.rules.other.anyLine.test(u.raw));
          l.loose = g;
        }
      }
      if (l.loose) for (let h of l.items) {
        h.loose = !0;
        for (let f of h.tokens) f.type === "text" && (f.type = "paragraph");
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
      let s = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: s, raw: e[0], href: n, title: i };
    }
  }
  table(t) {
    var l;
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let s = Ae(e[1]), n = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = (l = e[3]) != null && l.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (s.length === n.length) {
      for (let r of n) this.rules.other.tableAlignRight.test(r) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(r) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(r) ? a.align.push("left") : a.align.push(null);
      for (let r = 0; r < s.length; r++) a.header.push({ text: s[r], tokens: this.lexer.inline(s[r]), header: !0, align: a.align[r] });
      for (let r of i) a.rows.push(Ae(r, a.header.length).map((c, o) => ({ text: c, tokens: this.lexer.inline(c), header: !1, align: a.align[o] })));
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
        let a = xs(e[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let n = e[2], i = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(n);
        a && (n = a[1], i = a[3]);
      } else i = e[3] ? e[3].slice(1, -1) : "";
      return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? n = n.slice(1) : n = n.slice(1, -1)), Ie(e, { href: n && n.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let s;
    if ((s = this.rules.inline.reflink.exec(t)) || (s = this.rules.inline.nolink.exec(t))) {
      let n = (s[2] || s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = e[n.toLowerCase()];
      if (!i) {
        let a = s[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return Ie(s, i, s[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, s = "") {
    let n = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!n || n[3] && s.match(this.rules.other.unicodeAlphaNumeric)) && (!(n[1] || n[2]) || !s || this.rules.inline.punctuation.exec(s))) {
      let i = [...n[0]].length - 1, a, l, r = i, c = 0, o = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (o.lastIndex = 0, e = e.slice(-1 * t.length + i); (n = o.exec(e)) != null; ) {
        if (a = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !a) continue;
        if (l = [...a].length, n[3] || n[4]) {
          r += l;
          continue;
        } else if ((n[5] || n[6]) && i % 3 && !((i + l) % 3)) {
          c += l;
          continue;
        }
        if (r -= l, r > 0) continue;
        l = Math.min(l, l + r + c);
        let h = [...n[0]][0].length, f = t.slice(0, i + n.index + h + l);
        if (Math.min(i, l) % 2) {
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
      let s = e[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(s), i = this.rules.other.startingSpaceChar.test(s) && this.rules.other.endingSpaceChar.test(s);
      return n && i && (s = s.substring(1, s.length - 1)), { type: "codespan", raw: e[0], text: s };
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
      let s, n;
      return e[2] === "@" ? (s = e[1], n = "mailto:" + s) : (s = e[1], n = s), { type: "link", raw: e[0], text: s, href: n, tokens: [{ type: "text", raw: s, text: s }] };
    }
  }
  url(t) {
    var s;
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let n, i;
      if (e[2] === "@") n = e[0], i = "mailto:" + n;
      else {
        let a;
        do
          a = e[0], e[0] = ((s = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : s[0]) ?? "";
        while (a !== e[0]);
        n = e[0], e[1] === "www." ? i = "http://" + e[0] : i = e[0];
      }
      return { type: "link", raw: e[0], text: n, href: i, tokens: [{ type: "text", raw: n, text: n }] };
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
    let s = { other: R, block: F.normal, inline: Z.normal };
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
    e = e.replace(R.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let s = 0; s < this.inlineQueue.length; s++) {
      let n = this.inlineQueue[s];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, s = [], n = !1) {
    var i, a, l;
    for (this.options.pedantic && (e = e.replace(R.tabCharGlobal, "    ").replace(R.spaceLine, "")); e; ) {
      let r;
      if ((a = (i = this.options.extensions) == null ? void 0 : i.block) != null && a.some((o) => (r = o.call({ lexer: this }, e, s)) ? (e = e.substring(r.raw.length), s.push(r), !0) : !1)) continue;
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
        let o = 1 / 0, h = e.slice(1), f;
        this.options.extensions.startBlock.forEach((g) => {
          f = g.call({ lexer: this }, h), typeof f == "number" && f >= 0 && (o = Math.min(o, f));
        }), o < 1 / 0 && o >= 0 && (c = e.substring(0, o + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(c))) {
        let o = s.at(-1);
        n && (o == null ? void 0 : o.type) === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + r.raw, o.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(r), n = c.length !== e.length, e = e.substring(r.raw.length);
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
    var c, o, h, f, g;
    let n = e, i = null;
    if (this.tokens.links) {
      let u = Object.keys(this.tokens.links);
      if (u.length > 0) for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) u.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, i.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let a;
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) a = i[2] ? i[2].length : 0, n = n.slice(0, i.index + a) + "[" + "a".repeat(i[0].length - a - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n = ((o = (c = this.options.hooks) == null ? void 0 : c.emStrongMask) == null ? void 0 : o.call({ lexer: this }, n)) ?? n;
    let l = !1, r = "";
    for (; e; ) {
      l || (r = ""), l = !1;
      let u;
      if ((f = (h = this.options.extensions) == null ? void 0 : h.inline) != null && f.some((k) => (u = k.call({ lexer: this }, e, s)) ? (e = e.substring(u.raw.length), s.push(u), !0) : !1)) continue;
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
      if (u = this.tokenizer.emStrong(e, n, r)) {
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
        let k = 1 / 0, $ = e.slice(1), I;
        this.options.extensions.startInline.forEach((G) => {
          I = G.call({ lexer: this }, $), typeof I == "number" && I >= 0 && (k = Math.min(k, I));
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
    let n = (a = (e || "").match(R.notSpaceStart)) == null ? void 0 : a[0], i = t.replace(R.endingNewline, "") + `
`;
    return n ? '<pre><code class="language-' + A(n) + '">' + (s ? i : A(i, !0)) + `</code></pre>
` : "<pre><code>" + (s ? i : A(i, !0)) + `</code></pre>
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
    let e = t.ordered, s = t.start, n = "";
    for (let l = 0; l < t.items.length; l++) {
      let r = t.items[l];
      n += this.listitem(r);
    }
    let i = e ? "ol" : "ul", a = e && s !== 1 ? ' start="' + s + '"' : "";
    return "<" + i + a + `>
` + n + "</" + i + `>
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
    for (let i = 0; i < t.header.length; i++) s += this.tablecell(t.header[i]);
    e += this.tablerow({ text: s });
    let n = "";
    for (let i = 0; i < t.rows.length; i++) {
      let a = t.rows[i];
      s = "";
      for (let l = 0; l < a.length; l++) s += this.tablecell(a[l]);
      n += this.tablerow({ text: s });
    }
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + n + `</table>
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
    let n = this.parser.parseInline(s), i = Pe(t);
    if (i === null) return n;
    t = i;
    let a = '<a href="' + t + '"';
    return e && (a += ' title="' + A(e) + '"'), a += ">" + n + "</a>", a;
  }
  image({ href: t, title: e, text: s, tokens: n }) {
    n && (s = this.parser.parseInline(n, this.parser.textRenderer));
    let i = Pe(t);
    if (i === null) return A(s);
    t = i;
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
}, C = class le {
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
    var n, i;
    let s = "";
    for (let a = 0; a < e.length; a++) {
      let l = e[a];
      if ((i = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && i[l.type]) {
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
    var i, a;
    let n = "";
    for (let l = 0; l < e.length; l++) {
      let r = e[l];
      if ((a = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && a[r.type]) {
        let o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          n += o || "";
          continue;
        }
      }
      let c = r;
      switch (c.type) {
        case "escape": {
          n += s.text(c);
          break;
        }
        case "html": {
          n += s.html(c);
          break;
        }
        case "link": {
          n += s.link(c);
          break;
        }
        case "image": {
          n += s.image(c);
          break;
        }
        case "checkbox": {
          n += s.checkbox(c);
          break;
        }
        case "strong": {
          n += s.strong(c);
          break;
        }
        case "em": {
          n += s.em(c);
          break;
        }
        case "codespan": {
          n += s.codespan(c);
          break;
        }
        case "br": {
          n += s.br(c);
          break;
        }
        case "del": {
          n += s.del(c);
          break;
        }
        case "text": {
          n += s.text(c);
          break;
        }
        default: {
          let o = 'Token with "' + c.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
}, j, H = (j = class {
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
    return this.block ? C.parse : C.parseInline;
  }
}, w(j, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), w(j, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), j), ms = class {
  constructor(...t) {
    w(this, "defaults", he());
    w(this, "options", this.setOptions);
    w(this, "parse", this.parseMarkdown(!0));
    w(this, "parseInline", this.parseMarkdown(!1));
    w(this, "Parser", C);
    w(this, "Renderer", J);
    w(this, "TextRenderer", we);
    w(this, "Lexer", T);
    w(this, "Tokenizer", X);
    w(this, "Hooks", H);
    this.use(...t);
  }
  walkTokens(t, e) {
    var n, i;
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
        (i = (n = this.defaults.extensions) == null ? void 0 : n.childTokens) != null && i[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((r) => {
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
      let n = { ...s };
      if (n.async = this.defaults.async || n.async || !1, s.extensions && (s.extensions.forEach((i) => {
        if (!i.name) throw new Error("extension name required");
        if ("renderer" in i) {
          let a = e.renderers[i.name];
          a ? e.renderers[i.name] = function(...l) {
            let r = i.renderer.apply(this, l);
            return r === !1 && (r = a.apply(this, l)), r;
          } : e.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = e[i.level];
          a ? a.unshift(i.tokenizer) : e[i.level] = [i.tokenizer], i.start && (i.level === "block" ? e.startBlock ? e.startBlock.push(i.start) : e.startBlock = [i.start] : i.level === "inline" && (e.startInline ? e.startInline.push(i.start) : e.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (e.childTokens[i.name] = i.childTokens);
      }), n.extensions = e), s.renderer) {
        let i = this.defaults.renderer || new J(this.defaults);
        for (let a in s.renderer) {
          if (!(a in i)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let l = a, r = s.renderer[l], c = i[l];
          i[l] = (...o) => {
            let h = r.apply(i, o);
            return h === !1 && (h = c.apply(i, o)), h || "";
          };
        }
        n.renderer = i;
      }
      if (s.tokenizer) {
        let i = this.defaults.tokenizer || new X(this.defaults);
        for (let a in s.tokenizer) {
          if (!(a in i)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let l = a, r = s.tokenizer[l], c = i[l];
          i[l] = (...o) => {
            let h = r.apply(i, o);
            return h === !1 && (h = c.apply(i, o)), h;
          };
        }
        n.tokenizer = i;
      }
      if (s.hooks) {
        let i = this.defaults.hooks || new H();
        for (let a in s.hooks) {
          if (!(a in i)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let l = a, r = s.hooks[l], c = i[l];
          H.passThroughHooks.has(a) ? i[l] = (o) => {
            if (this.defaults.async && H.passThroughHooksRespectAsync.has(a)) return (async () => {
              let f = await r.call(i, o);
              return c.call(i, f);
            })();
            let h = r.call(i, o);
            return c.call(i, h);
          } : i[l] = (...o) => {
            if (this.defaults.async) return (async () => {
              let f = await r.apply(i, o);
              return f === !1 && (f = await c.apply(i, o)), f;
            })();
            let h = r.apply(i, o);
            return h === !1 && (h = c.apply(i, o)), h;
          };
        }
        n.hooks = i;
      }
      if (s.walkTokens) {
        let i = this.defaults.walkTokens, a = s.walkTokens;
        n.walkTokens = function(l) {
          let r = [];
          return r.push(a.call(this, l)), i && (r = r.concat(i.call(this, l))), r;
        };
      }
      this.defaults = { ...this.defaults, ...n };
    }), this;
  }
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, e) {
    return T.lex(t, e ?? this.defaults);
  }
  parser(t, e) {
    return C.parse(t, e ?? this.defaults);
  }
  parseMarkdown(t) {
    return (e, s) => {
      let n = { ...s }, i = { ...this.defaults, ...n }, a = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && n.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (i.hooks && (i.hooks.options = i, i.hooks.block = t), i.async) return (async () => {
        let l = i.hooks ? await i.hooks.preprocess(e) : e, r = await (i.hooks ? await i.hooks.provideLexer() : t ? T.lex : T.lexInline)(l, i), c = i.hooks ? await i.hooks.processAllTokens(r) : r;
        i.walkTokens && await Promise.all(this.walkTokens(c, i.walkTokens));
        let o = await (i.hooks ? await i.hooks.provideParser() : t ? C.parse : C.parseInline)(c, i);
        return i.hooks ? await i.hooks.postprocess(o) : o;
      })().catch(a);
      try {
        i.hooks && (e = i.hooks.preprocess(e));
        let l = (i.hooks ? i.hooks.provideLexer() : t ? T.lex : T.lexInline)(e, i);
        i.hooks && (l = i.hooks.processAllTokens(l)), i.walkTokens && this.walkTokens(l, i.walkTokens);
        let r = (i.hooks ? i.hooks.provideParser() : t ? C.parse : C.parseInline)(l, i);
        return i.hooks && (r = i.hooks.postprocess(r)), r;
      } catch (l) {
        return a(l);
      }
    };
  }
  onError(t, e) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let n = "<p>An error occurred:</p><pre>" + A(s.message + "", !0) + "</pre>";
        return e ? Promise.resolve(n) : n;
      }
      if (e) return Promise.reject(s);
      throw s;
    };
  }
}, E = new ms();
function m(t, e) {
  return E.parse(t, e);
}
m.options = m.setOptions = function(t) {
  return E.setOptions(t), m.defaults = E.defaults, Be(m.defaults), m;
};
m.getDefaults = he;
m.defaults = D;
m.use = function(...t) {
  return E.use(...t), m.defaults = E.defaults, Be(m.defaults), m;
};
m.walkTokens = function(t, e) {
  return E.walkTokens(t, e);
};
m.parseInline = E.parseInline;
m.Parser = C;
m.parser = C.parse;
m.Renderer = J;
m.TextRenderer = we;
m.Lexer = T;
m.lexer = T.lex;
m.Tokenizer = X;
m.Hooks = H;
m.parse = m;
m.options;
m.setOptions;
m.use;
m.walkTokens;
m.parseInline;
C.parse;
T.lex;
function ws(t) {
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
function vs(t) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const _s = new Pt("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var $s = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, je = (t) => {
  throw TypeError(t);
}, z = (t, e, s, n) => {
  for (var i = n > 1 ? void 0 : n ? ys(e, s) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (i = (n ? l(e, s, i) : l(i)) || i);
  return n && i && $s(e, s, i), i;
}, ve = (t, e, s) => e.has(t) || je("Cannot " + s), M = (t, e, s) => (ve(t, e, "read from private field"), s ? s.call(t) : e.get(t)), Me = (t, e, s) => e.has(t) ? je("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), zs = (t, e, s, n) => (ve(t, e, "write to private field"), e.set(t, s), s), d = (t, e, s) => (ve(t, e, "access private method"), s), P, p, We, B, L, Ke, Xe, Je, W, Ye, et, se, tt, ie, st, _e, Q, N, it, oe, ce, Y, nt, at, ue, $e, ye, rt, lt, ot, ct, ut, pt, ht, dt, gt, pe, ft, kt, xt;
let _ = class extends Mt {
  constructor() {
    super(...arguments), Me(this, p), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._allCollapsed = !1, this._excludedAreas = /* @__PURE__ */ new Set(), Me(this, P, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Dt, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), d(this, p, We).call(this));
      });
    });
  }
  render() {
    if (this._loading)
      return b`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return b`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
    const t = this._zoneDetection !== null || this._extraction !== null;
    return b`
			<umb-body-layout header-fit-height>
				${t ? d(this, p, ht).call(this) : y}
				${t && this._viewMode === "elements" ? d(this, p, dt).call(this) : y}
				${this._successMessage ? b`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : y}
				${t ? d(this, p, gt).call(this) : d(this, p, xt).call(this)}
			</umb-body-layout>
		`;
  }
};
P = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakSet();
We = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const t = await this.getContext(Le);
      zs(this, P, await t.getLatestToken());
      const [e, s, n, i, a] = await Promise.all([
        vt(this._workflowName, M(this, P)),
        Ee(this._workflowName, M(this, P)),
        _t(this._workflowName, M(this, P)),
        $t(this._workflowName, M(this, P)),
        yt(this._workflowName, M(this, P))
      ]);
      this._extraction = e, this._zoneDetection = s, this._config = n, this._transformResult = i, this._sourceConfig = a, a != null && a.pages && Array.isArray(a.pages) && a.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = d(this, p, L).call(this, a.pages)) : (this._pageMode = "all", this._pageInputValue = "");
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
    const n = s.trim();
    if (!n) continue;
    const i = n.split("-").map((a) => parseInt(a.trim(), 10));
    if (i.length === 1 && !isNaN(i[0]))
      e.add(i[0]);
    else if (i.length === 2 && !isNaN(i[0]) && !isNaN(i[1]))
      for (let a = i[0]; a <= i[1]; a++)
        e.add(a);
  }
  return [...e].sort((s, n) => s - n);
};
L = function(t) {
  if (!t.length) return "";
  const e = [...t].sort((a, l) => a - l), s = [];
  let n = e[0], i = e[0];
  for (let a = 1; a < e.length; a++)
    e[a] === i + 1 || (s.push(n === i ? `${n}` : `${n}-${i}`), n = e[a]), i = e[a];
  return s.push(n === i ? `${n}` : `${n}-${i}`), s.join(", ");
};
Ke = function() {
  if (this._pageMode === "all") return null;
  const t = d(this, p, B).call(this, this._pageInputValue);
  return t.length > 0 ? t : null;
};
Xe = function(t) {
  if (this._pageMode === "all") return !0;
  const e = d(this, p, B).call(this, this._pageInputValue);
  return e.length === 0 || e.includes(t);
};
Je = function(t) {
  var s, n;
  const e = ((s = this._zoneDetection) == null ? void 0 : s.totalPages) ?? ((n = this._extraction) == null ? void 0 : n.source.totalPages) ?? 0;
  if (e !== 0) {
    if (this._pageMode === "all") {
      const a = Array.from({ length: e }, (l, r) => r + 1).filter((l) => l !== t);
      this._pageMode = "custom", this._pageInputValue = d(this, p, L).call(this, a);
    } else {
      const i = d(this, p, B).call(this, this._pageInputValue);
      if (i.includes(t)) {
        const a = i.filter((l) => l !== t);
        this._pageInputValue = d(this, p, L).call(this, a), a.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const a = [...i, t].sort((l, r) => l - r);
        this._pageInputValue = d(this, p, L).call(this, a);
      }
      d(this, p, B).call(this, this._pageInputValue).length === e && (this._pageMode = "all", this._pageInputValue = "");
    }
    d(this, p, se).call(this);
  }
};
W = async function(t) {
  this._pageMode = t, t === "all" && (this._pageInputValue = ""), await d(this, p, se).call(this);
};
Ye = async function(t) {
  const e = t.target;
  this._pageInputValue = e.value;
};
et = async function() {
  const t = d(this, p, B).call(this, this._pageInputValue);
  t.length > 0 ? (this._pageInputValue = d(this, p, L).call(this, t), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await d(this, p, se).call(this);
};
se = async function() {
  if (!this._workflowName) return;
  const t = d(this, p, Ke).call(this);
  await Rt(this._workflowName, t, M(this, P));
};
tt = function() {
  if (!this._zoneDetection) return;
  this._allCollapsed = !this._allCollapsed;
  const t = /* @__PURE__ */ new Set();
  if (this._allCollapsed)
    for (const e of this._zoneDetection.pages)
      t.add(`page-${e.page}`);
  this._collapsed = t;
};
ie = async function() {
  var i;
  if (!this._workflowName) return;
  const s = await (await this.getContext(De)).open(this, Lt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((i = s == null ? void 0 : s.selection) != null && i.length)) return;
  const n = s.selection[0];
  n && await d(this, p, _e).call(this, n);
};
st = async function() {
  var e;
  const t = (e = this._extraction) == null ? void 0 : e.source.mediaKey;
  if (!t)
    return d(this, p, ie).call(this);
  await d(this, p, _e).call(this, t);
};
_e = async function(t) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const s = await (await this.getContext(Le)).getLatestToken(), [n, i] = await Promise.all([
        zt(this._workflowName, t, s),
        St(this._workflowName, t, s)
      ]);
      if (n && (this._extraction = n), i) {
        this._transformResult = i;
        const a = await Ee(this._workflowName, s);
        this._zoneDetection = a;
        const l = i.diagnostics;
        this._successMessage = `Content extracted — ${l.totalSections} sections (${l.bulletListSections} bullet, ${l.paragraphSections} paragraph, ${l.subHeadedSections} sub-headed)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else n ? (this._successMessage = `Content extracted — ${n.elements.length} elements (transform unavailable)`, setTimeout(() => {
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
it = function(t) {
  if (!this._transformResult) return !0;
  const e = this._transformResult.sections.find((s) => s.id === t);
  return (e == null ? void 0 : e.included) ?? !0;
};
oe = async function(t, e) {
  if (!this._workflowName) return;
  const s = await Ct(this._workflowName, t, e, M(this, P));
  s && (this._transformResult = s);
};
ce = async function(t) {
  var o, h, f, g;
  if (!((o = this._config) != null && o.destination) || !this._workflowName) return;
  const n = await (await this.getContext(De)).open(this, _s, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!((h = n == null ? void 0 : n.selectedTargets) != null && h.length)) return;
  const i = [...((f = this._config.map) == null ? void 0 : f.mappings) ?? []], a = i.findIndex((u) => u.source === t), l = {
    source: t,
    destinations: n.selectedTargets.map((u) => ({ target: u.target, blockKey: u.blockKey })),
    enabled: !0
  };
  a >= 0 ? i[a] = l : i.push(l);
  const r = { ...this._config.map, version: ((g = this._config.map) == null ? void 0 : g.version) ?? "1.0", mappings: i };
  await Tt(this._workflowName, r, M(this, P)) && (this._config = { ...this._config, map: r });
};
Y = function(t) {
  var s, n;
  if (!((n = (s = this._config) == null ? void 0 : s.map) != null && n.mappings)) return [];
  const e = [];
  for (const i of this._config.map.mappings)
    if (i.source === t && i.enabled)
      for (const a of i.destinations)
        e.push(a);
  return e;
};
nt = function(t) {
  var s, n, i;
  if (!((s = this._config) != null && s.destination)) return t.target;
  if (t.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const l = a.blocks.find((r) => r.key === t.blockKey);
      if (l) {
        const r = (n = l.properties) == null ? void 0 : n.find((c) => c.alias === t.target);
        return `${l.label} > ${(r == null ? void 0 : r.label) || t.target}`;
      }
    }
  const e = this._config.destination.fields.find((a) => a.alias === t.target);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const l of a.blocks) {
        const r = (i = l.properties) == null ? void 0 : i.find((c) => c.alias === t.target);
        if (r) return `${l.label} > ${r.label || r.alias}`;
      }
  return t.target;
};
at = function(t) {
  const e = t.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(e) || /^\d+[\.\)]\s/.test(e) ? "list" : "paragraph";
};
ue = function(t) {
  const e = d(this, p, at).call(this, t.text);
  return b`
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
$e = function(t, e, s, n) {
  const i = d(this, p, Q).call(this, e), a = t.heading ? vs(t.heading.text) : n >= 0 ? `preamble-p${s}-z${n}` : `preamble-p${s}-unzoned`, l = d(this, p, it).call(this, a);
  if (!t.heading)
    return b`
				<div class="zone-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => d(this, p, N).call(this, e)}>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="header-spacer"></span>
						<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@click=${(c) => c.stopPropagation()}
							@change=${(c) => d(this, p, oe).call(this, a, c.target.checked)}>
						</uui-toggle>
						<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
					${l && !i ? b`
						${t.children.map((c) => d(this, p, ue).call(this, c))}
					` : y}
				</div>
			`;
  const r = t.heading;
  return b`
			<div class="zone-section ${l ? "" : "excluded"}">
				<div class="section-heading" @click=${() => d(this, p, N).call(this, e)}>
					<div class="heading-content">
						<div class="heading-text">${r.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${r.fontSize}pt</span>
							<span class="meta-badge font-name">${r.fontName}</span>
						</div>
					</div>
					<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(c) => c.stopPropagation()}
						@change=${(c) => d(this, p, oe).call(this, a, c.target.checked)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${!i && l ? b`
					<div class="section-children">
						${t.children.map((c) => d(this, p, ue).call(this, c))}
					</div>
				` : y}
			</div>
		`;
};
ye = function(t) {
  const e = new Set(this._excludedAreas);
  e.has(t) ? e.delete(t) : e.add(t), this._excludedAreas = e;
};
rt = function(t, e, s) {
  const n = `area-p${e}-a${s}`, i = d(this, p, Q).call(this, n), a = !this._excludedAreas.has(n), l = t.sections.length;
  return b`
			<div class="zone-area ${a ? "" : "area-excluded"}" style="border-left-color: ${t.color};">
				<div class="area-header" @click=${() => d(this, p, N).call(this, n)}>
					<span class="area-name">Area ${s + 1}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${l} section${l !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${a ? "Included" : "Excluded"}"
						?checked=${a}
						@click=${(r) => r.stopPropagation()}
						@change=${() => d(this, p, ye).call(this, n)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${i ? y : b`
					${t.sections.map(
    (r, c) => d(this, p, $e).call(this, r, `p${e}-a${s}-s${c}`, e, s)
  )}
				`}
			</div>
		`;
};
lt = function(t, e) {
  if (t.totalElements === 0) return y;
  const s = `area-p${e}-undefined`, n = d(this, p, Q).call(this, s), i = !this._excludedAreas.has(s), a = t.sections.length;
  return b`
			<div class="zone-area undefined ${i ? "" : "area-excluded"}" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => d(this, p, N).call(this, s)}>
					<span class="area-name undefined-name">Undefined</span>
					<span class="header-spacer"></span>
					<span class="group-count">${a} section${a !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${i ? "Included" : "Excluded"}"
						?checked=${i}
						@click=${(l) => l.stopPropagation()}
						@change=${() => d(this, p, ye).call(this, s)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${n ? y : b`
					${t.sections.map(
    (l, r) => d(this, p, $e).call(this, l, `p${e}-undefined-s${r}`, e, -1)
  )}
				`}
			</div>
		`;
};
ot = function(t, e, s) {
  const n = `page-${t}`, i = d(this, p, Q).call(this, n), a = s && s.totalElements > 0, l = e.length + (a ? 1 : 0), r = e.reduce((o, h) => o + h.sections.length, 0) + ((s == null ? void 0 : s.sections.length) ?? 0), c = d(this, p, Xe).call(this, t);
  return b`
			<uui-box headline="Page ${t}" class="page-box ${c ? "" : "page-excluded"}">
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}, ${l} area${l !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${c ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${c}
						@click=${(o) => o.stopPropagation()}
						@change=${() => d(this, p, Je).call(this, t)}>
					</uui-toggle>
					<div class="collapse-trigger" @click=${() => d(this, p, N).call(this, n)}>
						<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
				</div>
				${i ? y : b`
					${e.map((o, h) => d(this, p, rt).call(this, o, t, h))}
					${a ? d(this, p, lt).call(this, s, t) : y}
				`}
			</uui-box>
		`;
};
ct = function() {
  return this._zoneDetection ? b`
			${this._zoneDetection.pages.map(
    (t) => d(this, p, ot).call(this, t.page, t.zones, t.unzonedContent)
  )}
		` : y;
};
ut = function() {
  return this._zoneDetection ? this._zoneDetection.pages.reduce((t, e) => {
    var s;
    return t + e.zones.reduce((n, i) => n + i.sections.length, 0) + (((s = e.unzonedContent) == null ? void 0 : s.sections.length) ?? 0);
  }, 0) : 0;
};
pt = function() {
  var e, s;
  return (((e = this._zoneDetection) == null ? void 0 : e.totalPages) ?? ((s = this._extraction) == null ? void 0 : s.source.totalPages) ?? 0) === 0 ? y : b`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === "all"}
					@change=${() => d(this, p, W).call(this, "all")} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === "custom"}
					@change=${() => d(this, p, W).call(this, "custom")} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${d(this, p, Ye)}
				@blur=${d(this, p, et)}
				@focus=${() => {
    this._pageMode === "all" && d(this, p, W).call(this, "custom");
  }}
				?disabled=${this._pageMode === "all"} />
		`;
};
ht = function() {
  return b`
			<div slot="header" class="source-header">
				<uui-tab-group dropdown-content-direction="vertical">
					<uui-tab label="Extracted" ?active=${this._viewMode === "elements"} @click=${() => {
    this._viewMode = "elements";
  }}>Extracted</uui-tab>
					<uui-tab label="Transformed" ?active=${this._viewMode === "transformed"} @click=${() => {
    this._viewMode = "transformed";
  }} ?disabled=${!this._transformResult}>Transformed</uui-tab>
				</uui-tab-group>
			</div>
		`;
};
dt = function() {
  var h;
  const t = this._zoneDetection !== null, e = this._extraction !== null;
  if (!t && !e) return y;
  const s = ((h = this._zoneDetection) == null ? void 0 : h.totalPages) ?? (e ? this._extraction.source.totalPages : 0), n = t ? this._zoneDetection.pages.length : s, a = n < s ? `${n} of ${s}` : `${s}`, l = t ? this._zoneDetection.diagnostics.zonesDetected : 0, r = t ? d(this, p, ut).call(this) : 0, c = e ? this._extraction.source.fileName : "", o = e ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return b`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${c}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${o}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="positive" label="Re-extract" @click=${d(this, p, st)} ?disabled=${this._extracting}>
								<uui-icon name="icon-refresh"></uui-icon>
								Re-extract
							</uui-button>
							<uui-button look="primary" color="default" label="Change PDF" @click=${d(this, p, ie)} ?disabled=${this._extracting}>
								<uui-icon name="icon-page-add"></uui-icon>
								Change PDF
							</uui-button>
						</div>
					</div>
				</uui-box>

				<uui-box headline="Pages" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${a}</span>
						<div class="page-selection">
							${d(this, p, pt).call(this)}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${l}</span>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${r}</span>
					</div>
				</uui-box>
			</div>

			${t ? b`
				<div class="collapse-row">
					<uui-button look="outline" compact label="${this._allCollapsed ? "Expand All" : "Collapse All"}" @click=${d(this, p, tt)}>
						<uui-icon name="${this._allCollapsed ? "icon-navigation-down" : "icon-navigation-right"}"></uui-icon>
						${this._allCollapsed ? "Expand All" : "Collapse All"}
					</uui-button>
				</div>
			` : y}
		`;
};
gt = function() {
  const t = this._zoneDetection !== null;
  return this._viewMode === "elements" ? t ? d(this, p, ct).call(this) : y : d(this, p, kt).call(this);
};
pe = function(t) {
  const e = d(this, p, Y).call(this, t);
  return e.length === 0 ? b`<uui-button look="secondary" compact label="Map" @click=${() => d(this, p, ce).call(this, t)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : b`${e.map(
    (s) => b`<span class="meta-badge mapped-target" @click=${() => d(this, p, ce).call(this, t)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${d(this, p, nt).call(this, s)}
			</span>`
  )}`;
};
ft = function(t) {
  const e = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, s = `${t.id}.heading`, n = `${t.id}.content`, i = d(this, p, Y).call(this, s).length > 0, a = d(this, p, Y).call(this, n).length > 0, l = i || a, r = t.heading ?? "Preamble";
  return b`
			<uui-box headline=${r} class="transformed-section ${l ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${t.pattern}">${e[t.pattern] ?? t.pattern}</span>
					<span class="meta-badge">p${t.page}</span>
					${t.zoneColor ? b`<span class="area-color-swatch" style="background: ${t.zoneColor};"></span>` : y}
					<span class="meta-badge">${t.childCount} item${t.childCount !== 1 ? "s" : ""}</span>
					${t.heading ? d(this, p, pe).call(this, s) : y}
				</div>
				<div class="transformed-content" .innerHTML=${ws(t.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${d(this, p, pe).call(this, n)}
				</div>
			</uui-box>
		`;
};
kt = function() {
  if (!this._transformResult)
    return b`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Re-extract content to generate the transformed view.</p>
				</div>
			`;
  const t = this._transformResult.sections.filter((s) => s.included), e = this._transformResult.sections.length;
  return b`
			${t.map((s) => d(this, p, ft).call(this, s))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${e} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? b`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : y}
			</div>
		`;
};
xt = function() {
  return b`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${d(this, p, ie)} ?disabled=${this._extracting}>
					${this._extracting ? b`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
_.styles = [
  Et,
  At`
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

			/* Header: tabs only */
			.source-header {
				display: flex;
				align-items: center;
				width: 100%;
			}

			.source-header uui-tab-group {
				flex: 1;
			}

			/* Info boxes row (uSync-inspired) */
			.info-boxes {
				display: flex;
				gap: var(--uui-size-space-4);
				flex-wrap: wrap;
				padding: var(--uui-size-space-4);
			}

			.info-box-item {
				flex-grow: 1;
			}

			.box-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				gap: var(--uui-size-space-2);
			}

			.box-icon {
				font-size: 32px;
				color: var(--uui-color-text-alt);
			}

			.box-title {
				font-size: var(--uui-type-default-size);
				font-weight: 600;
				margin: 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 100%;
			}

			.box-subtitle {
				font-size: var(--uui-type-small-size);
				color: var(--uui-color-text-alt);
			}

			.box-buttons {
				display: flex;
				gap: var(--uui-size-space-2);
				margin-top: auto;
				padding-top: var(--uui-size-space-2);
			}

			.box-stat {
				font-size: var(--uui-type-h3-size);
				font-weight: 700;
				color: var(--uui-color-text);
			}


			/* Collapse row below boxes */
			.collapse-row {
				display: flex;
				justify-content: flex-end;
				padding: 0 var(--uui-size-space-4) var(--uui-size-space-2);
			}

			/* Page selection (stacked inside box) */
			.page-selection {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
				font-size: var(--uui-type-small-size);
				margin-top: var(--uui-size-space-1);
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
				width: 100%;
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

			.header-spacer {
				flex: 1;
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

			.zone-area.area-excluded {
				opacity: 0.4;
			}

			.area-header {
				display: flex;
				align-items: center;
				gap: var(--uui-size-space-2);
				padding: var(--uui-size-space-2) var(--uui-size-space-3);
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
				font-weight: 600;
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
  S()
], _.prototype, "_extraction", 2);
z([
  S()
], _.prototype, "_zoneDetection", 2);
z([
  S()
], _.prototype, "_config", 2);
z([
  S()
], _.prototype, "_workflowName", 2);
z([
  S()
], _.prototype, "_loading", 2);
z([
  S()
], _.prototype, "_extracting", 2);
z([
  S()
], _.prototype, "_error", 2);
z([
  S()
], _.prototype, "_successMessage", 2);
z([
  S()
], _.prototype, "_collapsed", 2);
z([
  S()
], _.prototype, "_transformResult", 2);
z([
  S()
], _.prototype, "_viewMode", 2);
z([
  S()
], _.prototype, "_sourceConfig", 2);
z([
  S()
], _.prototype, "_pageMode", 2);
z([
  S()
], _.prototype, "_pageInputValue", 2);
z([
  S()
], _.prototype, "_allCollapsed", 2);
z([
  S()
], _.prototype, "_excludedAreas", 2);
_ = z([
  It("up-doc-workflow-source-view")
], _);
const Ds = _;
export {
  _ as UpDocWorkflowSourceViewElement,
  Ds as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-BP8WW7_7.js.map
