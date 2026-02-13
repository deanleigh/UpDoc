var it = Object.defineProperty;
var at = (t, e, s) => e in t ? it(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var x = (t, e, s) => at(t, typeof e != "symbol" ? e + "" : e, s);
import { c as lt, d as Te, b as ot, g as ct, h as ut, i as pt, s as ht, u as dt } from "./workflow.service-CD2_oFgA.js";
import { UmbModalToken as gt, UMB_MODAL_MANAGER_CONTEXT as Ce } from "@umbraco-cms/backoffice/modal";
import { html as w, nothing as y, css as ft, state as C, customElement as kt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as bt } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as mt } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as Ae } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as xt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as wt } from "@umbraco-cms/backoffice/media";
function le() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var L = le();
function Pe(t) {
  L = t;
}
var O = { exec: () => null };
function b(t, e = "") {
  let s = typeof t == "string" ? t : t.source, n = { replace: (r, a) => {
    let l = typeof a == "string" ? a : a.source;
    return l = l.replace(_.caret, "$1"), s = s.replace(r, l), n;
  }, getRegex: () => new RegExp(s, e) };
  return n;
}
var vt = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), _ = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, $t = /^(?:[ \t]*(?:\n|$))+/, yt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, _t = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, U = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, zt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, oe = /(?:[*+-]|\d{1,9}[.)])/, Ee = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Me = b(Ee).replace(/bull/g, oe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), St = b(Ee).replace(/bull/g, oe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ce = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Rt = /^[^\n]+/, ue = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Tt = b(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ue).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ct = b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, oe).getRegex(), V = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", pe = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, At = b("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", pe).replace("tag", V).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Le = b(ce).replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", V).getRegex(), Pt = b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Le).getRegex(), he = { blockquote: Pt, code: yt, def: Tt, fences: _t, heading: zt, hr: U, html: At, lheading: Me, list: Ct, newline: $t, paragraph: Le, table: O, text: Rt }, ve = b("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", V).getRegex(), Et = { ...he, lheading: St, table: ve, paragraph: b(ce).replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ve).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", V).getRegex() }, Mt = { ...he, html: b(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", pe).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: O, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: b(ce).replace("hr", U).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Me).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Lt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, It = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Ie = /^( {2,}|\\)\n(?!\s*$)/, Dt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, J = /[\p{P}\p{S}]/u, de = /[\s\p{P}\p{S}]/u, De = /[^\s\p{P}\p{S}]/u, Bt = b(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, de).getRegex(), Be = /(?!~)[\p{P}\p{S}]/u, qt = /(?!~)[\s\p{P}\p{S}]/u, Nt = /(?:[^\s\p{P}\p{S}]|~)/u, Zt = b(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", vt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), qe = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Ot = b(qe, "u").replace(/punct/g, J).getRegex(), Ut = b(qe, "u").replace(/punct/g, Be).getRegex(), Ne = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Ht = b(Ne, "gu").replace(/notPunctSpace/g, De).replace(/punctSpace/g, de).replace(/punct/g, J).getRegex(), Qt = b(Ne, "gu").replace(/notPunctSpace/g, Nt).replace(/punctSpace/g, qt).replace(/punct/g, Be).getRegex(), Gt = b("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, De).replace(/punctSpace/g, de).replace(/punct/g, J).getRegex(), Wt = b(/\\(punct)/, "gu").replace(/punct/g, J).getRegex(), Ft = b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), jt = b(pe).replace("(?:-->|$)", "-->").getRegex(), Kt = b("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", jt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), F = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, Xt = b(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", F).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ze = b(/^!?\[(label)\]\[(ref)\]/).replace("label", F).replace("ref", ue).getRegex(), Oe = b(/^!?\[(ref)\](?:\[\])?/).replace("ref", ue).getRegex(), Vt = b("reflink|nolink(?!\\()", "g").replace("reflink", Ze).replace("nolink", Oe).getRegex(), $e = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, ge = { _backpedal: O, anyPunctuation: Wt, autolink: Ft, blockSkip: Zt, br: Ie, code: It, del: O, emStrongLDelim: Ot, emStrongRDelimAst: Ht, emStrongRDelimUnd: Gt, escape: Lt, link: Xt, nolink: Oe, punctuation: Bt, reflink: Ze, reflinkSearch: Vt, tag: Kt, text: Dt, url: O }, Jt = { ...ge, link: b(/^!?\[(label)\]\((.*?)\)/).replace("label", F).getRegex(), reflink: b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", F).getRegex() }, ee = { ...ge, emStrongRDelimAst: Qt, emStrongLDelim: Ut, url: b(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", $e).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: b(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", $e).getRegex() }, Yt = { ...ee, br: b(Ie).replace("{2,}", "*").getRegex(), text: b(ee.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, G = { normal: he, gfm: Et, pedantic: Mt }, q = { normal: ge, gfm: ee, breaks: Yt, pedantic: Jt }, es = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, ye = (t) => es[t];
function A(t, e) {
  if (e) {
    if (_.escapeTest.test(t)) return t.replace(_.escapeReplace, ye);
  } else if (_.escapeTestNoEncode.test(t)) return t.replace(_.escapeReplaceNoEncode, ye);
  return t;
}
function _e(t) {
  try {
    t = encodeURI(t).replace(_.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function ze(t, e) {
  var a;
  let s = t.replace(_.findPipe, (l, i, c) => {
    let o = !1, p = i;
    for (; --p >= 0 && c[p] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), n = s.split(_.splitPipe), r = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((a = n.at(-1)) != null && a.trim()) && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; r < n.length; r++) n[r] = n[r].trim().replace(_.slashPipe, "|");
  return n;
}
function N(t, e, s) {
  let n = t.length;
  if (n === 0) return "";
  let r = 0;
  for (; r < n && t.charAt(n - r - 1) === e; )
    r++;
  return t.slice(0, n - r);
}
function ts(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let s = 0;
  for (let n = 0; n < t.length; n++) if (t[n] === "\\") n++;
  else if (t[n] === e[0]) s++;
  else if (t[n] === e[1] && (s--, s < 0)) return n;
  return s > 0 ? -2 : -1;
}
function Se(t, e, s, n, r) {
  let a = e.href, l = e.title || null, i = t[1].replace(r.other.outputLinkReplace, "$1");
  n.state.inLink = !0;
  let c = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: s, href: a, title: l, text: i, tokens: n.inlineTokens(i) };
  return n.state.inLink = !1, c;
}
function ss(t, e, s) {
  let n = t.match(s.other.indentCodeCompensation);
  if (n === null) return e;
  let r = n[1];
  return e.split(`
`).map((a) => {
    let l = a.match(s.other.beginningSpace);
    if (l === null) return a;
    let [i] = l;
    return i.length >= r.length ? a.slice(r.length) : a;
  }).join(`
`);
}
var j = class {
  constructor(t) {
    x(this, "options");
    x(this, "rules");
    x(this, "lexer");
    this.options = t || L;
  }
  space(t) {
    let e = this.rules.block.newline.exec(t);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(t) {
    let e = this.rules.block.code.exec(t);
    if (e) {
      let s = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? s : N(s, `
`) };
    }
  }
  fences(t) {
    let e = this.rules.block.fences.exec(t);
    if (e) {
      let s = e[0], n = ss(s, e[3] || "", this.rules);
      return { type: "code", raw: s, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: n };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let s = e[2].trim();
      if (this.rules.other.endingHash.test(s)) {
        let n = N(s, "#");
        (this.options.pedantic || !n || this.rules.other.endingSpaceChar.test(n)) && (s = n.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: s, tokens: this.lexer.inline(s) };
    }
  }
  hr(t) {
    let e = this.rules.block.hr.exec(t);
    if (e) return { type: "hr", raw: N(e[0], `
`) };
  }
  blockquote(t) {
    let e = this.rules.block.blockquote.exec(t);
    if (e) {
      let s = N(e[0], `
`).split(`
`), n = "", r = "", a = [];
      for (; s.length > 0; ) {
        let l = !1, i = [], c;
        for (c = 0; c < s.length; c++) if (this.rules.other.blockquoteStart.test(s[c])) i.push(s[c]), l = !0;
        else if (!l) i.push(s[c]);
        else break;
        s = s.slice(c);
        let o = i.join(`
`), p = o.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${o}` : o, r = r ? `${r}
${p}` : p;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, a, !0), this.lexer.state.top = d, s.length === 0) break;
        let h = a.at(-1);
        if ((h == null ? void 0 : h.type) === "code") break;
        if ((h == null ? void 0 : h.type) === "blockquote") {
          let u = h, v = u.raw + `
` + s.join(`
`), k = this.blockquote(v);
          a[a.length - 1] = k, n = n.substring(0, n.length - u.raw.length) + k.raw, r = r.substring(0, r.length - u.text.length) + k.text;
          break;
        } else if ((h == null ? void 0 : h.type) === "list") {
          let u = h, v = u.raw + `
` + s.join(`
`), k = this.list(v);
          a[a.length - 1] = k, n = n.substring(0, n.length - h.raw.length) + k.raw, r = r.substring(0, r.length - u.raw.length) + k.raw, s = v.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: n, tokens: a, text: r };
    }
  }
  list(t) {
    var s, n;
    let e = this.rules.block.list.exec(t);
    if (e) {
      let r = e[1].trim(), a = r.length > 1, l = { type: "list", raw: "", ordered: a, start: a ? +r.slice(0, -1) : "", loose: !1, items: [] };
      r = a ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = a ? r : "[*+-]");
      let i = this.rules.other.listItemRegex(r), c = !1;
      for (; t; ) {
        let p = !1, d = "", h = "";
        if (!(e = i.exec(t)) || this.rules.block.hr.test(t)) break;
        d = e[0], t = t.substring(d.length);
        let u = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (E) => " ".repeat(3 * E.length)), v = t.split(`
`, 1)[0], k = !u.trim(), $ = 0;
        if (this.options.pedantic ? ($ = 2, h = u.trimStart()) : k ? $ = e[1].length + 1 : ($ = e[2].search(this.rules.other.nonSpaceChar), $ = $ > 4 ? 1 : $, h = u.slice($), $ += e[1].length), k && this.rules.other.blankLine.test(v) && (d += v + `
`, t = t.substring(v.length + 1), p = !0), !p) {
          let E = this.rules.other.nextBulletRegex($), Q = this.rules.other.hrRegex($), xe = this.rules.other.fencesBeginRegex($), we = this.rules.other.headingBeginRegex($), nt = this.rules.other.htmlBeginRegex($);
          for (; t; ) {
            let Y = t.split(`
`, 1)[0], B;
            if (v = Y, this.options.pedantic ? (v = v.replace(this.rules.other.listReplaceNesting, "  "), B = v) : B = v.replace(this.rules.other.tabCharGlobal, "    "), xe.test(v) || we.test(v) || nt.test(v) || E.test(v) || Q.test(v)) break;
            if (B.search(this.rules.other.nonSpaceChar) >= $ || !v.trim()) h += `
` + B.slice($);
            else {
              if (k || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || xe.test(u) || we.test(u) || Q.test(u)) break;
              h += `
` + v;
            }
            !k && !v.trim() && (k = !0), d += Y + `
`, t = t.substring(Y.length + 1), u = B.slice($);
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
          if (p.text = p.text.replace(this.rules.other.listReplaceTask, ""), ((s = p.tokens[0]) == null ? void 0 : s.type) === "text" || ((n = p.tokens[0]) == null ? void 0 : n.type) === "paragraph") {
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
      let s = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: s, raw: e[0], href: n, title: r };
    }
  }
  table(t) {
    var l;
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let s = ze(e[1]), n = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (l = e[3]) != null && l.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (s.length === n.length) {
      for (let i of n) this.rules.other.tableAlignRight.test(i) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(i) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(i) ? a.align.push("left") : a.align.push(null);
      for (let i = 0; i < s.length; i++) a.header.push({ text: s[i], tokens: this.lexer.inline(s[i]), header: !0, align: a.align[i] });
      for (let i of r) a.rows.push(ze(i, a.header.length).map((c, o) => ({ text: c, tokens: this.lexer.inline(c), header: !1, align: a.align[o] })));
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
        let a = N(s.slice(0, -1), "\\");
        if ((s.length - a.length) % 2 === 0) return;
      } else {
        let a = ts(e[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let n = e[2], r = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(n);
        a && (n = a[1], r = a[3]);
      } else r = e[3] ? e[3].slice(1, -1) : "";
      return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? n = n.slice(1) : n = n.slice(1, -1)), Se(e, { href: n && n.replace(this.rules.inline.anyPunctuation, "$1"), title: r && r.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let s;
    if ((s = this.rules.inline.reflink.exec(t)) || (s = this.rules.inline.nolink.exec(t))) {
      let n = (s[2] || s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = e[n.toLowerCase()];
      if (!r) {
        let a = s[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return Se(s, r, s[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, s = "") {
    let n = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!n || n[3] && s.match(this.rules.other.unicodeAlphaNumeric)) && (!(n[1] || n[2]) || !s || this.rules.inline.punctuation.exec(s))) {
      let r = [...n[0]].length - 1, a, l, i = r, c = 0, o = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (o.lastIndex = 0, e = e.slice(-1 * t.length + r); (n = o.exec(e)) != null; ) {
        if (a = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !a) continue;
        if (l = [...a].length, n[3] || n[4]) {
          i += l;
          continue;
        } else if ((n[5] || n[6]) && r % 3 && !((r + l) % 3)) {
          c += l;
          continue;
        }
        if (i -= l, i > 0) continue;
        l = Math.min(l, l + i + c);
        let p = [...n[0]][0].length, d = t.slice(0, r + n.index + p + l);
        if (Math.min(r, l) % 2) {
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
      let s = e[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(s), r = this.rules.other.startingSpaceChar.test(s) && this.rules.other.endingSpaceChar.test(s);
      return n && r && (s = s.substring(1, s.length - 1)), { type: "codespan", raw: e[0], text: s };
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
      let n, r;
      if (e[2] === "@") n = e[0], r = "mailto:" + n;
      else {
        let a;
        do
          a = e[0], e[0] = ((s = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : s[0]) ?? "";
        while (a !== e[0]);
        n = e[0], e[1] === "www." ? r = "http://" + e[0] : r = e[0];
      }
      return { type: "link", raw: e[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(t) {
    let e = this.rules.inline.text.exec(t);
    if (e) {
      let s = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: s };
    }
  }
}, R = class te {
  constructor(e) {
    x(this, "tokens");
    x(this, "options");
    x(this, "state");
    x(this, "inlineQueue");
    x(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || L, this.options.tokenizer = this.options.tokenizer || new j(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let s = { other: _, block: G.normal, inline: q.normal };
    this.options.pedantic ? (s.block = G.pedantic, s.inline = q.pedantic) : this.options.gfm && (s.block = G.gfm, this.options.breaks ? s.inline = q.breaks : s.inline = q.gfm), this.tokenizer.rules = s;
  }
  static get rules() {
    return { block: G, inline: q };
  }
  static lex(e, s) {
    return new te(s).lex(e);
  }
  static lexInline(e, s) {
    return new te(s).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(_.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let s = 0; s < this.inlineQueue.length; s++) {
      let n = this.inlineQueue[s];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, s = [], n = !1) {
    var r, a, l;
    for (this.options.pedantic && (e = e.replace(_.tabCharGlobal, "    ").replace(_.spaceLine, "")); e; ) {
      let i;
      if ((a = (r = this.options.extensions) == null ? void 0 : r.block) != null && a.some((o) => (i = o.call({ lexer: this }, e, s)) ? (e = e.substring(i.raw.length), s.push(i), !0) : !1)) continue;
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
        n && (o == null ? void 0 : o.type) === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + i.raw, o.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(i), n = c.length !== e.length, e = e.substring(i.raw.length);
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
    let n = e, r = null;
    if (this.tokens.links) {
      let u = Object.keys(this.tokens.links);
      if (u.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) u.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let a;
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) a = r[2] ? r[2].length : 0, n = n.slice(0, r.index + a) + "[" + "a".repeat(r[0].length - a - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n = ((o = (c = this.options.hooks) == null ? void 0 : c.emStrongMask) == null ? void 0 : o.call({ lexer: this }, n)) ?? n;
    let l = !1, i = "";
    for (; e; ) {
      l || (i = ""), l = !1;
      let u;
      if ((d = (p = this.options.extensions) == null ? void 0 : p.inline) != null && d.some((k) => (u = k.call({ lexer: this }, e, s)) ? (e = e.substring(u.raw.length), s.push(u), !0) : !1)) continue;
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
      if (u = this.tokenizer.emStrong(e, n, i)) {
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
        let k = 1 / 0, $ = e.slice(1), E;
        this.options.extensions.startInline.forEach((Q) => {
          E = Q.call({ lexer: this }, $), typeof E == "number" && E >= 0 && (k = Math.min(k, E));
        }), k < 1 / 0 && k >= 0 && (v = e.substring(0, k + 1));
      }
      if (u = this.tokenizer.inlineText(v)) {
        e = e.substring(u.raw.length), u.raw.slice(-1) !== "_" && (i = u.raw.slice(-1)), l = !0;
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
}, K = class {
  constructor(t) {
    x(this, "options");
    x(this, "parser");
    this.options = t || L;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: s }) {
    var a;
    let n = (a = (e || "").match(_.notSpaceStart)) == null ? void 0 : a[0], r = t.replace(_.endingNewline, "") + `
`;
    return n ? '<pre><code class="language-' + A(n) + '">' + (s ? r : A(r, !0)) + `</code></pre>
` : "<pre><code>" + (s ? r : A(r, !0)) + `</code></pre>
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
      let i = t.items[l];
      n += this.listitem(i);
    }
    let r = e ? "ol" : "ul", a = e && s !== 1 ? ' start="' + s + '"' : "";
    return "<" + r + a + `>
` + n + "</" + r + `>
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
    for (let r = 0; r < t.header.length; r++) s += this.tablecell(t.header[r]);
    e += this.tablerow({ text: s });
    let n = "";
    for (let r = 0; r < t.rows.length; r++) {
      let a = t.rows[r];
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
    let n = this.parser.parseInline(s), r = _e(t);
    if (r === null) return n;
    t = r;
    let a = '<a href="' + t + '"';
    return e && (a += ' title="' + A(e) + '"'), a += ">" + n + "</a>", a;
  }
  image({ href: t, title: e, text: s, tokens: n }) {
    n && (s = this.parser.parseInline(n, this.parser.textRenderer));
    let r = _e(t);
    if (r === null) return A(s);
    t = r;
    let a = `<img src="${t}" alt="${s}"`;
    return e && (a += ` title="${A(e)}"`), a += ">", a;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : A(t.text);
  }
}, fe = class {
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
}, T = class se {
  constructor(e) {
    x(this, "options");
    x(this, "renderer");
    x(this, "textRenderer");
    this.options = e || L, this.options.renderer = this.options.renderer || new K(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new fe();
  }
  static parse(e, s) {
    return new se(s).parse(e);
  }
  static parseInline(e, s) {
    return new se(s).parseInline(e);
  }
  parse(e) {
    var n, r;
    let s = "";
    for (let a = 0; a < e.length; a++) {
      let l = e[a];
      if ((r = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && r[l.type]) {
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
    var r, a;
    let n = "";
    for (let l = 0; l < e.length; l++) {
      let i = e[l];
      if ((a = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && a[i.type]) {
        let o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          n += o || "";
          continue;
        }
      }
      let c = i;
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
}, W, Z = (W = class {
  constructor(t) {
    x(this, "options");
    x(this, "block");
    this.options = t || L;
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
}, x(W, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), x(W, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), W), rs = class {
  constructor(...t) {
    x(this, "defaults", le());
    x(this, "options", this.setOptions);
    x(this, "parse", this.parseMarkdown(!0));
    x(this, "parseInline", this.parseMarkdown(!1));
    x(this, "Parser", T);
    x(this, "Renderer", K);
    x(this, "TextRenderer", fe);
    x(this, "Lexer", R);
    x(this, "Tokenizer", j);
    x(this, "Hooks", Z);
    this.use(...t);
  }
  walkTokens(t, e) {
    var n, r;
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
        (r = (n = this.defaults.extensions) == null ? void 0 : n.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((i) => {
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
      let n = { ...s };
      if (n.async = this.defaults.async || n.async || !1, s.extensions && (s.extensions.forEach((r) => {
        if (!r.name) throw new Error("extension name required");
        if ("renderer" in r) {
          let a = e.renderers[r.name];
          a ? e.renderers[r.name] = function(...l) {
            let i = r.renderer.apply(this, l);
            return i === !1 && (i = a.apply(this, l)), i;
          } : e.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = e[r.level];
          a ? a.unshift(r.tokenizer) : e[r.level] = [r.tokenizer], r.start && (r.level === "block" ? e.startBlock ? e.startBlock.push(r.start) : e.startBlock = [r.start] : r.level === "inline" && (e.startInline ? e.startInline.push(r.start) : e.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (e.childTokens[r.name] = r.childTokens);
      }), n.extensions = e), s.renderer) {
        let r = this.defaults.renderer || new K(this.defaults);
        for (let a in s.renderer) {
          if (!(a in r)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let l = a, i = s.renderer[l], c = r[l];
          r[l] = (...o) => {
            let p = i.apply(r, o);
            return p === !1 && (p = c.apply(r, o)), p || "";
          };
        }
        n.renderer = r;
      }
      if (s.tokenizer) {
        let r = this.defaults.tokenizer || new j(this.defaults);
        for (let a in s.tokenizer) {
          if (!(a in r)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let l = a, i = s.tokenizer[l], c = r[l];
          r[l] = (...o) => {
            let p = i.apply(r, o);
            return p === !1 && (p = c.apply(r, o)), p;
          };
        }
        n.tokenizer = r;
      }
      if (s.hooks) {
        let r = this.defaults.hooks || new Z();
        for (let a in s.hooks) {
          if (!(a in r)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let l = a, i = s.hooks[l], c = r[l];
          Z.passThroughHooks.has(a) ? r[l] = (o) => {
            if (this.defaults.async && Z.passThroughHooksRespectAsync.has(a)) return (async () => {
              let d = await i.call(r, o);
              return c.call(r, d);
            })();
            let p = i.call(r, o);
            return c.call(r, p);
          } : r[l] = (...o) => {
            if (this.defaults.async) return (async () => {
              let d = await i.apply(r, o);
              return d === !1 && (d = await c.apply(r, o)), d;
            })();
            let p = i.apply(r, o);
            return p === !1 && (p = c.apply(r, o)), p;
          };
        }
        n.hooks = r;
      }
      if (s.walkTokens) {
        let r = this.defaults.walkTokens, a = s.walkTokens;
        n.walkTokens = function(l) {
          let i = [];
          return i.push(a.call(this, l)), r && (i = i.concat(r.call(this, l))), i;
        };
      }
      this.defaults = { ...this.defaults, ...n };
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
      let n = { ...s }, r = { ...this.defaults, ...n }, a = this.onError(!!r.silent, !!r.async);
      if (this.defaults.async === !0 && n.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (r.hooks && (r.hooks.options = r, r.hooks.block = t), r.async) return (async () => {
        let l = r.hooks ? await r.hooks.preprocess(e) : e, i = await (r.hooks ? await r.hooks.provideLexer() : t ? R.lex : R.lexInline)(l, r), c = r.hooks ? await r.hooks.processAllTokens(i) : i;
        r.walkTokens && await Promise.all(this.walkTokens(c, r.walkTokens));
        let o = await (r.hooks ? await r.hooks.provideParser() : t ? T.parse : T.parseInline)(c, r);
        return r.hooks ? await r.hooks.postprocess(o) : o;
      })().catch(a);
      try {
        r.hooks && (e = r.hooks.preprocess(e));
        let l = (r.hooks ? r.hooks.provideLexer() : t ? R.lex : R.lexInline)(e, r);
        r.hooks && (l = r.hooks.processAllTokens(l)), r.walkTokens && this.walkTokens(l, r.walkTokens);
        let i = (r.hooks ? r.hooks.provideParser() : t ? T.parse : T.parseInline)(l, r);
        return r.hooks && (i = r.hooks.postprocess(i)), i;
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
}, M = new rs();
function m(t, e) {
  return M.parse(t, e);
}
m.options = m.setOptions = function(t) {
  return M.setOptions(t), m.defaults = M.defaults, Pe(m.defaults), m;
};
m.getDefaults = le;
m.defaults = L;
m.use = function(...t) {
  return M.use(...t), m.defaults = M.defaults, Pe(m.defaults), m;
};
m.walkTokens = function(t, e) {
  return M.walkTokens(t, e);
};
m.parseInline = M.parseInline;
m.Parser = T;
m.parser = T.parse;
m.Renderer = K;
m.TextRenderer = fe;
m.Lexer = R;
m.lexer = R.lex;
m.Tokenizer = j;
m.Hooks = Z;
m.parse = m;
m.options;
m.setOptions;
m.use;
m.walkTokens;
m.parseInline;
T.parse;
R.lex;
function ns(t) {
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
function is(t) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const as = new gt("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
});
var ls = Object.defineProperty, os = Object.getOwnPropertyDescriptor, Ue = (t) => {
  throw TypeError(t);
}, S = (t, e, s, n) => {
  for (var r = n > 1 ? void 0 : n ? os(e, s) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (r = (n ? l(e, s, r) : l(r)) || r);
  return n && r && ls(e, s, r), r;
}, ke = (t, e, s) => e.has(t) || Ue("Cannot " + s), I = (t, e, s) => (ke(t, e, "read from private field"), s ? s.call(t) : e.get(t)), Re = (t, e, s) => e.has(t) ? Ue("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), cs = (t, e, s, n) => (ke(t, e, "write to private field"), e.set(t, s), s), f = (t, e, s) => (ke(t, e, "access private method"), s), P, g, He, be, H, D, Qe, re, ne, X, Ge, We, ie, me, Fe, je, Ke, Xe, Ve, Je, Ye, et, ae, tt, st, rt;
let z = class extends bt {
  constructor() {
    super(...arguments), Re(this, g), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", Re(this, P, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(xt, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), f(this, g, He).call(this));
      });
    });
  }
  render() {
    if (this._loading)
      return w`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return w`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
    const t = this._zoneDetection !== null || this._extraction !== null;
    return w`
			<umb-body-layout header-fit-height>
				${t ? f(this, g, Je).call(this) : y}
				${t ? f(this, g, Ye).call(this) : y}
				${this._successMessage ? w`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : y}
				${t ? f(this, g, et).call(this) : f(this, g, rt).call(this)}
			</umb-body-layout>
		`;
  }
};
P = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakSet();
He = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const t = await this.getContext(Ae);
      cs(this, P, await t.getLatestToken());
      const [e, s, n, r] = await Promise.all([
        lt(this._workflowName, I(this, P)),
        Te(this._workflowName, I(this, P)),
        ot(this._workflowName, I(this, P)),
        ct(this._workflowName, I(this, P))
      ]);
      this._extraction = e, this._zoneDetection = s, this._config = n, this._transformResult = r;
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to load data", console.error("Failed to load source data:", t);
    } finally {
      this._loading = !1;
    }
  }
};
be = async function() {
  var r;
  if (!this._workflowName) return;
  const s = await (await this.getContext(Ce)).open(this, wt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((r = s == null ? void 0 : s.selection) != null && r.length)) return;
  const n = s.selection[0];
  if (n) {
    this._extracting = !0, this._error = null;
    try {
      const l = await (await this.getContext(Ae)).getLatestToken(), [i, c] = await Promise.all([
        ut(this._workflowName, n, l),
        pt(this._workflowName, n, l)
      ]);
      if (i && (this._extraction = i), c) {
        this._transformResult = c;
        const o = await Te(this._workflowName, l);
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
H = function(t) {
  return this._collapsed.has(t);
};
D = function(t) {
  const e = new Set(this._collapsed);
  e.has(t) ? e.delete(t) : e.add(t), this._collapsed = e;
};
Qe = function(t) {
  if (!this._transformResult) return !0;
  const e = this._transformResult.sections.find((s) => s.id === t);
  return (e == null ? void 0 : e.included) ?? !0;
};
re = async function(t, e) {
  if (!this._workflowName) return;
  const s = await dt(this._workflowName, t, e, I(this, P));
  s && (this._transformResult = s);
};
ne = async function(t) {
  var o, p, d, h;
  if (!((o = this._config) != null && o.destination) || !this._workflowName) return;
  const n = await (await this.getContext(Ce)).open(this, as, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!((p = n == null ? void 0 : n.selectedTargets) != null && p.length)) return;
  const r = [...((d = this._config.map) == null ? void 0 : d.mappings) ?? []], a = r.findIndex((u) => u.source === t), l = {
    source: t,
    destinations: n.selectedTargets.map((u) => ({ target: u.target, blockKey: u.blockKey })),
    enabled: !0
  };
  a >= 0 ? r[a] = l : r.push(l);
  const i = { ...this._config.map, version: ((h = this._config.map) == null ? void 0 : h.version) ?? "1.0", mappings: r };
  await ht(this._workflowName, i, I(this, P)) && (this._config = { ...this._config, map: i });
};
X = function(t) {
  var s, n;
  if (!((n = (s = this._config) == null ? void 0 : s.map) != null && n.mappings)) return [];
  const e = [];
  for (const r of this._config.map.mappings)
    if (r.source === t && r.enabled)
      for (const a of r.destinations)
        e.push(a);
  return e;
};
Ge = function(t) {
  var s, n, r;
  if (!((s = this._config) != null && s.destination)) return t.target;
  if (t.blockKey && this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids) {
      const l = a.blocks.find((i) => i.key === t.blockKey);
      if (l) {
        const i = (n = l.properties) == null ? void 0 : n.find((c) => c.alias === t.target);
        return `${l.label} > ${(i == null ? void 0 : i.label) || t.target}`;
      }
    }
  const e = this._config.destination.fields.find((a) => a.alias === t.target);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const a of this._config.destination.blockGrids)
      for (const l of a.blocks) {
        const i = (r = l.properties) == null ? void 0 : r.find((c) => c.alias === t.target);
        if (i) return `${l.label} > ${i.label || i.alias}`;
      }
  return t.target;
};
We = function(t) {
  const e = t.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(e) || /^\d+[\.\)]\s/.test(e) ? "list" : "paragraph";
};
ie = function(t) {
  const e = f(this, g, We).call(this, t.text);
  return w`
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
me = function(t, e, s, n) {
  const r = f(this, g, H).call(this, e), a = t.heading ? is(t.heading.text) : n >= 0 ? `preamble-p${s}-z${n}` : `preamble-p${s}-unzoned`, l = f(this, g, Qe).call(this, a);
  if (!t.heading)
    return w`
				<div class="zone-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => f(this, g, D).call(this, e)}>
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@click=${(c) => c.stopPropagation()}
							@change=${(c) => f(this, g, re).call(this, a, c.target.checked)}>
						</uui-toggle>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
						<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
					${l && !r ? w`
						${t.children.map((c) => f(this, g, ie).call(this, c))}
					` : y}
				</div>
			`;
  const i = t.heading;
  return w`
			<div class="zone-section ${l ? "" : "excluded"}">
				<div class="section-heading" @click=${() => f(this, g, D).call(this, e)}>
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@click=${(c) => c.stopPropagation()}
						@change=${(c) => f(this, g, re).call(this, a, c.target.checked)}>
					</uui-toggle>
					<div class="heading-content">
						<div class="heading-text">${i.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${i.fontSize}pt</span>
							<span class="meta-badge font-name">${i.fontName}</span>
						</div>
					</div>
					<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
					<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${!r && l ? w`
					<div class="section-children">
						${t.children.map((c) => f(this, g, ie).call(this, c))}
					</div>
				` : y}
			</div>
		`;
};
Fe = function(t, e, s) {
  const n = `area-p${e}-a${s}`, r = f(this, g, H).call(this, n), a = t.sections.length;
  return w`
			<div class="zone-area" style="border-left-color: ${t.color};">
				<div class="area-header" @click=${() => f(this, g, D).call(this, n)}>
					<span class="area-color-swatch" style="background: ${t.color};"></span>
					<span class="area-name">Area ${s + 1}</span>
					<span class="group-count">${a} section${a !== 1 ? "s" : ""}</span>
					<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${r ? y : w`
					${t.sections.map(
    (l, i) => f(this, g, me).call(this, l, `p${e}-a${s}-s${i}`, e, s)
  )}
				`}
			</div>
		`;
};
je = function(t, e) {
  if (t.totalElements === 0) return y;
  const s = `area-p${e}-undefined`, n = f(this, g, H).call(this, s), r = t.sections.length;
  return w`
			<div class="zone-area undefined" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => f(this, g, D).call(this, s)}>
					<span class="area-color-swatch undefined-swatch"></span>
					<span class="area-name undefined-name">Undefined</span>
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}</span>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${n ? y : w`
					${t.sections.map(
    (a, l) => f(this, g, me).call(this, a, `p${e}-undefined-s${l}`, e, -1)
  )}
				`}
			</div>
		`;
};
Ke = function(t, e, s) {
  const n = `page-${t}`, r = f(this, g, H).call(this, n), a = s && s.totalElements > 0, l = e.length + (a ? 1 : 0);
  return w`
			<uui-box headline="Page ${t}" class="page-box">
				<div slot="header-actions" class="collapse-trigger" @click=${() => f(this, g, D).call(this, n)}>
					<span class="group-count">${l} area${l !== 1 ? "s" : ""}</span>
					<uui-icon class="collapse-chevron" name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${r ? y : w`
					${e.map((i, c) => f(this, g, Fe).call(this, i, t, c))}
					${a ? f(this, g, je).call(this, s, t) : y}
				`}
			</uui-box>
		`;
};
Xe = function() {
  return this._zoneDetection ? w`
			${this._zoneDetection.pages.map(
    (t) => f(this, g, Ke).call(this, t.page, t.zones, t.unzonedContent)
  )}
		` : y;
};
Ve = function() {
  return this._zoneDetection ? this._zoneDetection.pages.reduce((t, e) => {
    var s;
    return t + e.zones.reduce((n, r) => n + r.sections.length, 0) + (((s = e.unzonedContent) == null ? void 0 : s.sections.length) ?? 0);
  }, 0) : 0;
};
Je = function() {
  return w`
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
					<uui-button look="outline" label="Re-extract" @click=${f(this, g, be)} ?disabled=${this._extracting}>
						<uui-icon name="icon-refresh"></uui-icon>
						Re-extract
					</uui-button>
				</div>
			</div>
		`;
};
Ye = function() {
  const t = this._zoneDetection !== null, e = this._extraction !== null;
  if (!t && !e) return y;
  const s = e ? this._extraction.source.totalPages : 0, n = t ? this._zoneDetection.diagnostics.zonesDetected : 0, r = t ? f(this, g, Ve).call(this) : 0, a = e ? this._extraction.source.fileName : "", l = e ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return w`
			<div class="stat-boxes">
				<div class="stat-box">
					<span class="stat-number">${s}</span>
					<span class="stat-label">Pages</span>
				</div>
				<div class="stat-box">
					<span class="stat-number">${n}</span>
					<span class="stat-label">Zones</span>
				</div>
				<div class="stat-box">
					<span class="stat-number">${r}</span>
					<span class="stat-label">Sections</span>
				</div>
				<div class="stat-box stat-box-source">
					<span class="stat-source-name">${a}</span>
					<span class="stat-label">${l}</span>
				</div>
			</div>
		`;
};
et = function() {
  const t = this._zoneDetection !== null;
  return this._viewMode === "elements" ? t ? f(this, g, Xe).call(this) : y : f(this, g, st).call(this);
};
ae = function(t) {
  const e = f(this, g, X).call(this, t);
  return e.length === 0 ? w`<uui-button look="secondary" compact label="Map" @click=${() => f(this, g, ne).call(this, t)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : w`${e.map(
    (s) => w`<span class="meta-badge mapped-target" @click=${() => f(this, g, ne).call(this, t)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${f(this, g, Ge).call(this, s)}
			</span>`
  )}`;
};
tt = function(t) {
  const e = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, s = `${t.id}.heading`, n = `${t.id}.content`, r = f(this, g, X).call(this, s).length > 0, a = f(this, g, X).call(this, n).length > 0, l = r || a, i = t.heading ?? "Preamble";
  return w`
			<uui-box headline=${i} class="transformed-section ${l ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${t.pattern}">${e[t.pattern] ?? t.pattern}</span>
					<span class="meta-badge">p${t.page}</span>
					${t.zoneColor ? w`<span class="area-color-swatch" style="background: ${t.zoneColor};"></span>` : y}
					<span class="meta-badge">${t.childCount} item${t.childCount !== 1 ? "s" : ""}</span>
					${t.heading ? f(this, g, ae).call(this, s) : y}
				</div>
				<div class="transformed-content" .innerHTML=${ns(t.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${f(this, g, ae).call(this, n)}
				</div>
			</uui-box>
		`;
};
st = function() {
  if (!this._transformResult)
    return w`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Re-extract content to generate the transformed view.</p>
				</div>
			`;
  const t = this._transformResult.sections.filter((s) => s.included), e = this._transformResult.sections.length;
  return w`
			${t.map((s) => f(this, g, tt).call(this, s))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${e} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? w`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : y}
			</div>
		`;
};
rt = function() {
  return w`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${f(this, g, be)} ?disabled=${this._extracting}>
					${this._extracting ? w`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
z.styles = [
  mt,
  ft`
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
				gap: var(--uui-size-space-2);
				padding-right: var(--uui-size-space-2);
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
S([
  C()
], z.prototype, "_extraction", 2);
S([
  C()
], z.prototype, "_zoneDetection", 2);
S([
  C()
], z.prototype, "_config", 2);
S([
  C()
], z.prototype, "_workflowName", 2);
S([
  C()
], z.prototype, "_loading", 2);
S([
  C()
], z.prototype, "_extracting", 2);
S([
  C()
], z.prototype, "_error", 2);
S([
  C()
], z.prototype, "_successMessage", 2);
S([
  C()
], z.prototype, "_collapsed", 2);
S([
  C()
], z.prototype, "_transformResult", 2);
S([
  C()
], z.prototype, "_viewMode", 2);
z = S([
  kt("up-doc-workflow-source-view")
], z);
const xs = z;
export {
  z as UpDocWorkflowSourceViewElement,
  xs as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-CBcaI3Ad.js.map
