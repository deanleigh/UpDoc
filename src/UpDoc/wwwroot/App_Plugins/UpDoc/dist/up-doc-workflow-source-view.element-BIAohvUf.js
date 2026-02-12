var Je = Object.defineProperty;
var Ye = (t, e, s) => e in t ? Je(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var b = (t, e, s) => Ye(t, typeof e != "symbol" ? e + "" : e, s);
import { c as et, d as Re, b as tt, g as st, t as rt, h as nt, u as at } from "./workflow.service-C9FepPiJ.js";
import { html as w, nothing as z, css as it, state as A, customElement as lt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as ot } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as ct } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as Te } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as ut } from "@umbraco-cms/backoffice/workspace";
import { UMB_MODAL_MANAGER_CONTEXT as pt } from "@umbraco-cms/backoffice/modal";
import { UMB_MEDIA_PICKER_MODAL as ht } from "@umbraco-cms/backoffice/media";
function re() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var I = re();
function Ae(t) {
  I = t;
}
var N = { exec: () => null };
function f(t, e = "") {
  let s = typeof t == "string" ? t : t.source, n = { replace: (r, i) => {
    let l = typeof i == "string" ? i : i.source;
    return l = l.replace(y.caret, "$1"), s = s.replace(r, l), n;
  }, getRegex: () => new RegExp(s, e) };
  return n;
}
var dt = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), y = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, gt = /^(?:[ \t]*(?:\n|$))+/, ft = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, kt = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, O = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, bt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ne = /(?:[*+-]|\d{1,9}[.)])/, Ce = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ee = f(Ce).replace(/bull/g, ne).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), xt = f(Ce).replace(/bull/g, ne).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ae = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, mt = /^[^\n]+/, ie = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, wt = f(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ie).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), vt = f(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ne).getRegex(), j = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", le = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, $t = f("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", le).replace("tag", j).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Pe = f(ae).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", j).getRegex(), yt = f(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Pe).getRegex(), oe = { blockquote: yt, code: ft, def: wt, fences: kt, heading: bt, hr: O, html: $t, lheading: Ee, list: vt, newline: gt, paragraph: Pe, table: N, text: mt }, we = f("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", j).getRegex(), _t = { ...oe, lheading: xt, table: we, paragraph: f(ae).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", we).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", j).getRegex() }, zt = { ...oe, html: f(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", le).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: N, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: f(ae).replace("hr", O).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ee).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, St = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Rt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, De = /^( {2,}|\\)\n(?!\s*$)/, Tt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, X = /[\p{P}\p{S}]/u, ce = /[\s\p{P}\p{S}]/u, Ie = /[^\s\p{P}\p{S}]/u, At = f(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ce).getRegex(), Le = /(?!~)[\p{P}\p{S}]/u, Ct = /(?!~)[\s\p{P}\p{S}]/u, Et = /(?:[^\s\p{P}\p{S}]|~)/u, Pt = f(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", dt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Me = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Dt = f(Me, "u").replace(/punct/g, X).getRegex(), It = f(Me, "u").replace(/punct/g, Le).getRegex(), Be = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Lt = f(Be, "gu").replace(/notPunctSpace/g, Ie).replace(/punctSpace/g, ce).replace(/punct/g, X).getRegex(), Mt = f(Be, "gu").replace(/notPunctSpace/g, Et).replace(/punctSpace/g, Ct).replace(/punct/g, Le).getRegex(), Bt = f("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Ie).replace(/punctSpace/g, ce).replace(/punct/g, X).getRegex(), qt = f(/\\(punct)/, "gu").replace(/punct/g, X).getRegex(), Zt = f(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Nt = f(le).replace("(?:-->|$)", "-->").getRegex(), Ot = f("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Nt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), W = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, Ut = f(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", W).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), qe = f(/^!?\[(label)\]\[(ref)\]/).replace("label", W).replace("ref", ie).getRegex(), Ze = f(/^!?\[(ref)\](?:\[\])?/).replace("ref", ie).getRegex(), Ht = f("reflink|nolink(?!\\()", "g").replace("reflink", qe).replace("nolink", Ze).getRegex(), ve = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, ue = { _backpedal: N, anyPunctuation: qt, autolink: Zt, blockSkip: Pt, br: De, code: Rt, del: N, emStrongLDelim: Dt, emStrongRDelimAst: Lt, emStrongRDelimUnd: Bt, escape: St, link: Ut, nolink: Ze, punctuation: At, reflink: qe, reflinkSearch: Ht, tag: Ot, text: Tt, url: N }, Qt = { ...ue, link: f(/^!?\[(label)\]\((.*?)\)/).replace("label", W).getRegex(), reflink: f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", W).getRegex() }, V = { ...ue, emStrongRDelimAst: Mt, emStrongLDelim: It, url: f(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ve).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: f(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ve).getRegex() }, Wt = { ...V, br: f(De).replace("{2,}", "*").getRegex(), text: f(V.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, H = { normal: oe, gfm: _t, pedantic: zt }, M = { normal: ue, gfm: V, breaks: Wt, pedantic: Qt }, Gt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, $e = (t) => Gt[t];
function C(t, e) {
  if (e) {
    if (y.escapeTest.test(t)) return t.replace(y.escapeReplace, $e);
  } else if (y.escapeTestNoEncode.test(t)) return t.replace(y.escapeReplaceNoEncode, $e);
  return t;
}
function ye(t) {
  try {
    t = encodeURI(t).replace(y.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function _e(t, e) {
  var i;
  let s = t.replace(y.findPipe, (l, a, c) => {
    let o = !1, p = a;
    for (; --p >= 0 && c[p] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), n = s.split(y.splitPipe), r = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !((i = n.at(-1)) != null && i.trim()) && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; r < n.length; r++) n[r] = n[r].trim().replace(y.slashPipe, "|");
  return n;
}
function B(t, e, s) {
  let n = t.length;
  if (n === 0) return "";
  let r = 0;
  for (; r < n && t.charAt(n - r - 1) === e; )
    r++;
  return t.slice(0, n - r);
}
function Ft(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let s = 0;
  for (let n = 0; n < t.length; n++) if (t[n] === "\\") n++;
  else if (t[n] === e[0]) s++;
  else if (t[n] === e[1] && (s--, s < 0)) return n;
  return s > 0 ? -2 : -1;
}
function ze(t, e, s, n, r) {
  let i = e.href, l = e.title || null, a = t[1].replace(r.other.outputLinkReplace, "$1");
  n.state.inLink = !0;
  let c = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: s, href: i, title: l, text: a, tokens: n.inlineTokens(a) };
  return n.state.inLink = !1, c;
}
function jt(t, e, s) {
  let n = t.match(s.other.indentCodeCompensation);
  if (n === null) return e;
  let r = n[1];
  return e.split(`
`).map((i) => {
    let l = i.match(s.other.beginningSpace);
    if (l === null) return i;
    let [a] = l;
    return a.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var G = class {
  constructor(t) {
    b(this, "options");
    b(this, "rules");
    b(this, "lexer");
    this.options = t || I;
  }
  space(t) {
    let e = this.rules.block.newline.exec(t);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(t) {
    let e = this.rules.block.code.exec(t);
    if (e) {
      let s = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? s : B(s, `
`) };
    }
  }
  fences(t) {
    let e = this.rules.block.fences.exec(t);
    if (e) {
      let s = e[0], n = jt(s, e[3] || "", this.rules);
      return { type: "code", raw: s, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: n };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let s = e[2].trim();
      if (this.rules.other.endingHash.test(s)) {
        let n = B(s, "#");
        (this.options.pedantic || !n || this.rules.other.endingSpaceChar.test(n)) && (s = n.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: s, tokens: this.lexer.inline(s) };
    }
  }
  hr(t) {
    let e = this.rules.block.hr.exec(t);
    if (e) return { type: "hr", raw: B(e[0], `
`) };
  }
  blockquote(t) {
    let e = this.rules.block.blockquote.exec(t);
    if (e) {
      let s = B(e[0], `
`).split(`
`), n = "", r = "", i = [];
      for (; s.length > 0; ) {
        let l = !1, a = [], c;
        for (c = 0; c < s.length; c++) if (this.rules.other.blockquoteStart.test(s[c])) a.push(s[c]), l = !0;
        else if (!l) a.push(s[c]);
        else break;
        s = s.slice(c);
        let o = a.join(`
`), p = o.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${o}` : o, r = r ? `${r}
${p}` : p;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, i, !0), this.lexer.state.top = d, s.length === 0) break;
        let h = i.at(-1);
        if ((h == null ? void 0 : h.type) === "code") break;
        if ((h == null ? void 0 : h.type) === "blockquote") {
          let u = h, v = u.raw + `
` + s.join(`
`), g = this.blockquote(v);
          i[i.length - 1] = g, n = n.substring(0, n.length - u.raw.length) + g.raw, r = r.substring(0, r.length - u.text.length) + g.text;
          break;
        } else if ((h == null ? void 0 : h.type) === "list") {
          let u = h, v = u.raw + `
` + s.join(`
`), g = this.list(v);
          i[i.length - 1] = g, n = n.substring(0, n.length - h.raw.length) + g.raw, r = r.substring(0, r.length - u.raw.length) + g.raw, s = v.substring(i.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: n, tokens: i, text: r };
    }
  }
  list(t) {
    var s, n;
    let e = this.rules.block.list.exec(t);
    if (e) {
      let r = e[1].trim(), i = r.length > 1, l = { type: "list", raw: "", ordered: i, start: i ? +r.slice(0, -1) : "", loose: !1, items: [] };
      r = i ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = i ? r : "[*+-]");
      let a = this.rules.other.listItemRegex(r), c = !1;
      for (; t; ) {
        let p = !1, d = "", h = "";
        if (!(e = a.exec(t)) || this.rules.block.hr.test(t)) break;
        d = e[0], t = t.substring(d.length);
        let u = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (E) => " ".repeat(3 * E.length)), v = t.split(`
`, 1)[0], g = !u.trim(), $ = 0;
        if (this.options.pedantic ? ($ = 2, h = u.trimStart()) : g ? $ = e[1].length + 1 : ($ = e[2].search(this.rules.other.nonSpaceChar), $ = $ > 4 ? 1 : $, h = u.slice($), $ += e[1].length), g && this.rules.other.blankLine.test(v) && (d += v + `
`, t = t.substring(v.length + 1), p = !0), !p) {
          let E = this.rules.other.nextBulletRegex($), U = this.rules.other.hrRegex($), xe = this.rules.other.fencesBeginRegex($), me = this.rules.other.headingBeginRegex($), Ve = this.rules.other.htmlBeginRegex($);
          for (; t; ) {
            let K = t.split(`
`, 1)[0], L;
            if (v = K, this.options.pedantic ? (v = v.replace(this.rules.other.listReplaceNesting, "  "), L = v) : L = v.replace(this.rules.other.tabCharGlobal, "    "), xe.test(v) || me.test(v) || Ve.test(v) || E.test(v) || U.test(v)) break;
            if (L.search(this.rules.other.nonSpaceChar) >= $ || !v.trim()) h += `
` + L.slice($);
            else {
              if (g || u.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || xe.test(u) || me.test(u) || U.test(u)) break;
              h += `
` + v;
            }
            !g && !v.trim() && (g = !0), d += K + `
`, t = t.substring(K.length + 1), u = L.slice($);
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
    let s = _e(e[1]), n = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (l = e[3]) != null && l.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (s.length === n.length) {
      for (let a of n) this.rules.other.tableAlignRight.test(a) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? i.align.push("left") : i.align.push(null);
      for (let a = 0; a < s.length; a++) i.header.push({ text: s[a], tokens: this.lexer.inline(s[a]), header: !0, align: i.align[a] });
      for (let a of r) i.rows.push(_e(a, i.header.length).map((c, o) => ({ text: c, tokens: this.lexer.inline(c), header: !1, align: i.align[o] })));
      return i;
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
        let i = B(s.slice(0, -1), "\\");
        if ((s.length - i.length) % 2 === 0) return;
      } else {
        let i = Ft(e[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let n = e[2], r = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(n);
        i && (n = i[1], r = i[3]);
      } else r = e[3] ? e[3].slice(1, -1) : "";
      return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? n = n.slice(1) : n = n.slice(1, -1)), ze(e, { href: n && n.replace(this.rules.inline.anyPunctuation, "$1"), title: r && r.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let s;
    if ((s = this.rules.inline.reflink.exec(t)) || (s = this.rules.inline.nolink.exec(t))) {
      let n = (s[2] || s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = e[n.toLowerCase()];
      if (!r) {
        let i = s[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return ze(s, r, s[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, s = "") {
    let n = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!n || n[3] && s.match(this.rules.other.unicodeAlphaNumeric)) && (!(n[1] || n[2]) || !s || this.rules.inline.punctuation.exec(s))) {
      let r = [...n[0]].length - 1, i, l, a = r, c = 0, o = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (o.lastIndex = 0, e = e.slice(-1 * t.length + r); (n = o.exec(e)) != null; ) {
        if (i = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !i) continue;
        if (l = [...i].length, n[3] || n[4]) {
          a += l;
          continue;
        } else if ((n[5] || n[6]) && r % 3 && !((r + l) % 3)) {
          c += l;
          continue;
        }
        if (a -= l, a > 0) continue;
        l = Math.min(l, l + a + c);
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
        let i;
        do
          i = e[0], e[0] = ((s = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : s[0]) ?? "";
        while (i !== e[0]);
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
}, R = class J {
  constructor(e) {
    b(this, "tokens");
    b(this, "options");
    b(this, "state");
    b(this, "inlineQueue");
    b(this, "tokenizer");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || I, this.options.tokenizer = this.options.tokenizer || new G(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let s = { other: y, block: H.normal, inline: M.normal };
    this.options.pedantic ? (s.block = H.pedantic, s.inline = M.pedantic) : this.options.gfm && (s.block = H.gfm, this.options.breaks ? s.inline = M.breaks : s.inline = M.gfm), this.tokenizer.rules = s;
  }
  static get rules() {
    return { block: H, inline: M };
  }
  static lex(e, s) {
    return new J(s).lex(e);
  }
  static lexInline(e, s) {
    return new J(s).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(y.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let s = 0; s < this.inlineQueue.length; s++) {
      let n = this.inlineQueue[s];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, s = [], n = !1) {
    var r, i, l;
    for (this.options.pedantic && (e = e.replace(y.tabCharGlobal, "    ").replace(y.spaceLine, "")); e; ) {
      let a;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((o) => (a = o.call({ lexer: this }, e, s)) ? (e = e.substring(a.raw.length), s.push(a), !0) : !1)) continue;
      if (a = this.tokenizer.space(e)) {
        e = e.substring(a.raw.length);
        let o = s.at(-1);
        a.raw.length === 1 && o !== void 0 ? o.raw += `
` : s.push(a);
        continue;
      }
      if (a = this.tokenizer.code(e)) {
        e = e.substring(a.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + a.raw, o.text += `
` + a.text, this.inlineQueue.at(-1).src = o.text) : s.push(a);
        continue;
      }
      if (a = this.tokenizer.fences(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      if (a = this.tokenizer.heading(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      if (a = this.tokenizer.hr(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      if (a = this.tokenizer.blockquote(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      if (a = this.tokenizer.list(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      if (a = this.tokenizer.html(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      if (a = this.tokenizer.def(e)) {
        e = e.substring(a.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "paragraph" || (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + a.raw, o.text += `
` + a.raw, this.inlineQueue.at(-1).src = o.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = { href: a.href, title: a.title }, s.push(a));
        continue;
      }
      if (a = this.tokenizer.table(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      if (a = this.tokenizer.lheading(e)) {
        e = e.substring(a.raw.length), s.push(a);
        continue;
      }
      let c = e;
      if ((l = this.options.extensions) != null && l.startBlock) {
        let o = 1 / 0, p = e.slice(1), d;
        this.options.extensions.startBlock.forEach((h) => {
          d = h.call({ lexer: this }, p), typeof d == "number" && d >= 0 && (o = Math.min(o, d));
        }), o < 1 / 0 && o >= 0 && (c = e.substring(0, o + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(c))) {
        let o = s.at(-1);
        n && (o == null ? void 0 : o.type) === "paragraph" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + a.raw, o.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(a), n = c.length !== e.length, e = e.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(e)) {
        e = e.substring(a.raw.length);
        let o = s.at(-1);
        (o == null ? void 0 : o.type) === "text" ? (o.raw += (o.raw.endsWith(`
`) ? "" : `
`) + a.raw, o.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = o.text) : s.push(a);
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
    let i;
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) i = r[2] ? r[2].length : 0, n = n.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n = ((o = (c = this.options.hooks) == null ? void 0 : c.emStrongMask) == null ? void 0 : o.call({ lexer: this }, n)) ?? n;
    let l = !1, a = "";
    for (; e; ) {
      l || (a = ""), l = !1;
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
      if (u = this.tokenizer.emStrong(e, n, a)) {
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
        let g = 1 / 0, $ = e.slice(1), E;
        this.options.extensions.startInline.forEach((U) => {
          E = U.call({ lexer: this }, $), typeof E == "number" && E >= 0 && (g = Math.min(g, E));
        }), g < 1 / 0 && g >= 0 && (v = e.substring(0, g + 1));
      }
      if (u = this.tokenizer.inlineText(v)) {
        e = e.substring(u.raw.length), u.raw.slice(-1) !== "_" && (a = u.raw.slice(-1)), l = !0;
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
    b(this, "options");
    b(this, "parser");
    this.options = t || I;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: s }) {
    var i;
    let n = (i = (e || "").match(y.notSpaceStart)) == null ? void 0 : i[0], r = t.replace(y.endingNewline, "") + `
`;
    return n ? '<pre><code class="language-' + C(n) + '">' + (s ? r : C(r, !0)) + `</code></pre>
` : "<pre><code>" + (s ? r : C(r, !0)) + `</code></pre>
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
      let a = t.items[l];
      n += this.listitem(a);
    }
    let r = e ? "ol" : "ul", i = e && s !== 1 ? ' start="' + s + '"' : "";
    return "<" + r + i + `>
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
      let i = t.rows[r];
      s = "";
      for (let l = 0; l < i.length; l++) s += this.tablecell(i[l]);
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
    return `<code>${C(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, tokens: s }) {
    let n = this.parser.parseInline(s), r = ye(t);
    if (r === null) return n;
    t = r;
    let i = '<a href="' + t + '"';
    return e && (i += ' title="' + C(e) + '"'), i += ">" + n + "</a>", i;
  }
  image({ href: t, title: e, text: s, tokens: n }) {
    n && (s = this.parser.parseInline(n, this.parser.textRenderer));
    let r = ye(t);
    if (r === null) return C(s);
    t = r;
    let i = `<img src="${t}" alt="${s}"`;
    return e && (i += ` title="${C(e)}"`), i += ">", i;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : C(t.text);
  }
}, pe = class {
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
}, T = class Y {
  constructor(e) {
    b(this, "options");
    b(this, "renderer");
    b(this, "textRenderer");
    this.options = e || I, this.options.renderer = this.options.renderer || new F(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new pe();
  }
  static parse(e, s) {
    return new Y(s).parse(e);
  }
  static parseInline(e, s) {
    return new Y(s).parseInline(e);
  }
  parse(e) {
    var n, r;
    let s = "";
    for (let i = 0; i < e.length; i++) {
      let l = e[i];
      if ((r = (n = this.options.extensions) == null ? void 0 : n.renderers) != null && r[l.type]) {
        let c = l, o = this.options.extensions.renderers[c.type].call({ parser: this }, c);
        if (o !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(c.type)) {
          s += o || "";
          continue;
        }
      }
      let a = l;
      switch (a.type) {
        case "space": {
          s += this.renderer.space(a);
          break;
        }
        case "hr": {
          s += this.renderer.hr(a);
          break;
        }
        case "heading": {
          s += this.renderer.heading(a);
          break;
        }
        case "code": {
          s += this.renderer.code(a);
          break;
        }
        case "table": {
          s += this.renderer.table(a);
          break;
        }
        case "blockquote": {
          s += this.renderer.blockquote(a);
          break;
        }
        case "list": {
          s += this.renderer.list(a);
          break;
        }
        case "checkbox": {
          s += this.renderer.checkbox(a);
          break;
        }
        case "html": {
          s += this.renderer.html(a);
          break;
        }
        case "def": {
          s += this.renderer.def(a);
          break;
        }
        case "paragraph": {
          s += this.renderer.paragraph(a);
          break;
        }
        case "text": {
          s += this.renderer.text(a);
          break;
        }
        default: {
          let c = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(c), "";
          throw new Error(c);
        }
      }
    }
    return s;
  }
  parseInline(e, s = this.renderer) {
    var r, i;
    let n = "";
    for (let l = 0; l < e.length; l++) {
      let a = e[l];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[a.type]) {
        let o = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          n += o || "";
          continue;
        }
      }
      let c = a;
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
}, Q, q = (Q = class {
  constructor(t) {
    b(this, "options");
    b(this, "block");
    this.options = t || I;
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
}, b(Q, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), b(Q, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Q), Xt = class {
  constructor(...t) {
    b(this, "defaults", re());
    b(this, "options", this.setOptions);
    b(this, "parse", this.parseMarkdown(!0));
    b(this, "parseInline", this.parseMarkdown(!1));
    b(this, "Parser", T);
    b(this, "Renderer", F);
    b(this, "TextRenderer", pe);
    b(this, "Lexer", R);
    b(this, "Tokenizer", G);
    b(this, "Hooks", q);
    this.use(...t);
  }
  walkTokens(t, e) {
    var n, r;
    let s = [];
    for (let i of t) switch (s = s.concat(e.call(this, i)), i.type) {
      case "table": {
        let l = i;
        for (let a of l.header) s = s.concat(this.walkTokens(a.tokens, e));
        for (let a of l.rows) for (let c of a) s = s.concat(this.walkTokens(c.tokens, e));
        break;
      }
      case "list": {
        let l = i;
        s = s.concat(this.walkTokens(l.items, e));
        break;
      }
      default: {
        let l = i;
        (r = (n = this.defaults.extensions) == null ? void 0 : n.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((a) => {
          let c = l[a].flat(1 / 0);
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
          let i = e.renderers[r.name];
          i ? e.renderers[r.name] = function(...l) {
            let a = r.renderer.apply(this, l);
            return a === !1 && (a = i.apply(this, l)), a;
          } : e.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let i = e[r.level];
          i ? i.unshift(r.tokenizer) : e[r.level] = [r.tokenizer], r.start && (r.level === "block" ? e.startBlock ? e.startBlock.push(r.start) : e.startBlock = [r.start] : r.level === "inline" && (e.startInline ? e.startInline.push(r.start) : e.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (e.childTokens[r.name] = r.childTokens);
      }), n.extensions = e), s.renderer) {
        let r = this.defaults.renderer || new F(this.defaults);
        for (let i in s.renderer) {
          if (!(i in r)) throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i)) continue;
          let l = i, a = s.renderer[l], c = r[l];
          r[l] = (...o) => {
            let p = a.apply(r, o);
            return p === !1 && (p = c.apply(r, o)), p || "";
          };
        }
        n.renderer = r;
      }
      if (s.tokenizer) {
        let r = this.defaults.tokenizer || new G(this.defaults);
        for (let i in s.tokenizer) {
          if (!(i in r)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          let l = i, a = s.tokenizer[l], c = r[l];
          r[l] = (...o) => {
            let p = a.apply(r, o);
            return p === !1 && (p = c.apply(r, o)), p;
          };
        }
        n.tokenizer = r;
      }
      if (s.hooks) {
        let r = this.defaults.hooks || new q();
        for (let i in s.hooks) {
          if (!(i in r)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          let l = i, a = s.hooks[l], c = r[l];
          q.passThroughHooks.has(i) ? r[l] = (o) => {
            if (this.defaults.async && q.passThroughHooksRespectAsync.has(i)) return (async () => {
              let d = await a.call(r, o);
              return c.call(r, d);
            })();
            let p = a.call(r, o);
            return c.call(r, p);
          } : r[l] = (...o) => {
            if (this.defaults.async) return (async () => {
              let d = await a.apply(r, o);
              return d === !1 && (d = await c.apply(r, o)), d;
            })();
            let p = a.apply(r, o);
            return p === !1 && (p = c.apply(r, o)), p;
          };
        }
        n.hooks = r;
      }
      if (s.walkTokens) {
        let r = this.defaults.walkTokens, i = s.walkTokens;
        n.walkTokens = function(l) {
          let a = [];
          return a.push(i.call(this, l)), r && (a = a.concat(r.call(this, l))), a;
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
      let n = { ...s }, r = { ...this.defaults, ...n }, i = this.onError(!!r.silent, !!r.async);
      if (this.defaults.async === !0 && n.async === !1) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (r.hooks && (r.hooks.options = r, r.hooks.block = t), r.async) return (async () => {
        let l = r.hooks ? await r.hooks.preprocess(e) : e, a = await (r.hooks ? await r.hooks.provideLexer() : t ? R.lex : R.lexInline)(l, r), c = r.hooks ? await r.hooks.processAllTokens(a) : a;
        r.walkTokens && await Promise.all(this.walkTokens(c, r.walkTokens));
        let o = await (r.hooks ? await r.hooks.provideParser() : t ? T.parse : T.parseInline)(c, r);
        return r.hooks ? await r.hooks.postprocess(o) : o;
      })().catch(i);
      try {
        r.hooks && (e = r.hooks.preprocess(e));
        let l = (r.hooks ? r.hooks.provideLexer() : t ? R.lex : R.lexInline)(e, r);
        r.hooks && (l = r.hooks.processAllTokens(l)), r.walkTokens && this.walkTokens(l, r.walkTokens);
        let a = (r.hooks ? r.hooks.provideParser() : t ? T.parse : T.parseInline)(l, r);
        return r.hooks && (a = r.hooks.postprocess(a)), a;
      } catch (l) {
        return i(l);
      }
    };
  }
  onError(t, e) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let n = "<p>An error occurred:</p><pre>" + C(s.message + "", !0) + "</pre>";
        return e ? Promise.resolve(n) : n;
      }
      if (e) return Promise.reject(s);
      throw s;
    };
  }
}, D = new Xt();
function k(t, e) {
  return D.parse(t, e);
}
k.options = k.setOptions = function(t) {
  return D.setOptions(t), k.defaults = D.defaults, Ae(k.defaults), k;
};
k.getDefaults = re;
k.defaults = I;
k.use = function(...t) {
  return D.use(...t), k.defaults = D.defaults, Ae(k.defaults), k;
};
k.walkTokens = function(t, e) {
  return D.walkTokens(t, e);
};
k.parseInline = D.parseInline;
k.Parser = T;
k.parser = T.parse;
k.Renderer = F;
k.TextRenderer = pe;
k.Lexer = R;
k.lexer = R.lex;
k.Tokenizer = G;
k.Hooks = q;
k.parse = k;
k.options;
k.setOptions;
k.use;
k.walkTokens;
k.parseInline;
T.parse;
R.lex;
function Kt(t) {
  if (!t) return "";
  try {
    const e = k.parse(t, {
      gfm: !0,
      breaks: !1
    });
    return typeof e == "string" ? e : (console.warn("marked returned Promise, using fallback"), `<p>${t}</p>`);
  } catch (e) {
    return console.error("Markdown conversion failed:", e), `<p>${t.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  }
}
function Vt(t) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
var Jt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, Ne = (t) => {
  throw TypeError(t);
}, S = (t, e, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Yt(e, s) : e, i = t.length - 1, l; i >= 0; i--)
    (l = t[i]) && (r = (n ? l(e, s, r) : l(r)) || r);
  return n && r && Jt(e, s, r), r;
}, he = (t, e, s) => e.has(t) || Ne("Cannot " + s), Z = (t, e, s) => (he(t, e, "read from private field"), s ? s.call(t) : e.get(t)), Se = (t, e, s) => e.has(t) ? Ne("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), es = (t, e, s, n) => (he(t, e, "write to private field"), e.set(t, s), s), m = (t, e, s) => (he(t, e, "access private method"), s), P, x, Oe, de, ee, ge, fe, ke, Ue, te, se, be, He, Qe, We, Ge, Fe, je, Xe, Ke;
let _ = class extends ot {
  constructor() {
    super(...arguments), Se(this, x), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsedSections = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", Se(this, P, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(ut, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), m(this, x, Oe).call(this));
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
				${this._successMessage ? w`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : z}
				${t ? m(this, x, Fe).call(this) : m(this, x, Ke).call(this)}
			</umb-body-layout>
		`;
  }
};
P = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakSet();
Oe = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const t = await this.getContext(Te);
      es(this, P, await t.getLatestToken());
      const [e, s, n, r] = await Promise.all([
        et(this._workflowName, Z(this, P)),
        Re(this._workflowName, Z(this, P)),
        tt(this._workflowName, Z(this, P)),
        st(this._workflowName, Z(this, P))
      ]);
      this._extraction = e, this._zoneDetection = s, this._config = n, this._transformResult = r;
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to load data", console.error("Failed to load source data:", t);
    } finally {
      this._loading = !1;
    }
  }
};
de = async function() {
  var r;
  if (!this._workflowName) return;
  const s = await (await this.getContext(pt)).open(this, ht, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!((r = s == null ? void 0 : s.selection) != null && r.length)) return;
  const n = s.selection[0];
  if (n) {
    this._extracting = !0, this._error = null;
    try {
      const l = await (await this.getContext(Te)).getLatestToken(), [a, c] = await Promise.all([
        rt(this._workflowName, n, l),
        nt(this._workflowName, n, l)
      ]);
      if (a && (this._extraction = a), c) {
        this._transformResult = c;
        const o = await Re(this._workflowName, l);
        this._zoneDetection = o;
        const p = c.diagnostics;
        this._successMessage = `Content extracted — ${p.totalSections} sections (${p.bulletListSections} bullet, ${p.paragraphSections} paragraph, ${p.subHeadedSections} sub-headed)`, setTimeout(() => {
          this._successMessage = null;
        }, 5e3);
      } else a ? (this._successMessage = `Content extracted — ${a.elements.length} elements (transform unavailable)`, setTimeout(() => {
        this._successMessage = null;
      }, 5e3)) : this._error = "Extraction failed. Check that the selected media item is a PDF.";
    } catch (i) {
      this._error = i instanceof Error ? i.message : "Extraction failed", console.error("Extraction failed:", i);
    } finally {
      this._extracting = !1;
    }
  }
};
ee = function(t) {
  const e = new Set(this._collapsedSections);
  e.has(t) ? e.delete(t) : e.add(t), this._collapsedSections = e;
};
ge = function(t, e, s) {
  const n = [];
  for (let r = 0; r < s; r++)
    n.push(`p${t}-${e}-s${r}`);
  return n;
};
fe = function(t) {
  return t.length > 0 && t.every((e) => this._collapsedSections.has(e));
};
ke = function(t) {
  const e = new Set(this._collapsedSections);
  if (t.every((n) => e.has(n)))
    for (const n of t) e.delete(n);
  else
    for (const n of t) e.add(n);
  this._collapsedSections = e;
};
Ue = function(t) {
  if (!this._transformResult) return !0;
  const e = this._transformResult.sections.find((s) => s.id === t);
  return (e == null ? void 0 : e.included) ?? !0;
};
te = async function(t, e) {
  if (!this._workflowName) return;
  const s = await at(this._workflowName, t, e, Z(this, P));
  s && (this._transformResult = s);
};
se = function(t) {
  return w`
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
be = function(t, e, s, n) {
  const r = this._collapsedSections.has(e), i = t.heading ? Vt(t.heading.text) : n >= 0 ? `preamble-p${s}-z${n}` : `preamble-p${s}-unzoned`, l = m(this, x, Ue).call(this, i);
  if (!t.heading)
    return w`
				<div class="zone-section ${l ? "" : "excluded"}">
					<div class="section-heading preamble">
						<uui-toggle
							label="${l ? "Included" : "Excluded"}"
							?checked=${l}
							@change=${(c) => m(this, x, te).call(this, i, c.target.checked)}>
						</uui-toggle>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="group-count">${t.children.length} item${t.children.length !== 1 ? "s" : ""}</span>
					</div>
					${l ? w`
						${t.children.map((c) => m(this, x, se).call(this, c))}
					` : z}
				</div>
			`;
  const a = t.heading;
  return w`
			<div class="zone-section ${l ? "" : "excluded"}">
				<div class="section-heading">
					<uui-toggle
						label="${l ? "Included" : "Excluded"}"
						?checked=${l}
						@change=${(c) => m(this, x, te).call(this, i, c.target.checked)}>
					</uui-toggle>
					<div class="heading-content" @click=${() => m(this, x, ee).call(this, e)}>
						<div class="heading-text">${a.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${a.fontSize}pt</span>
							<span class="meta-badge font-name">${a.fontName}</span>
						</div>
					</div>
					<button class="collapse-toggle" @click=${() => m(this, x, ee).call(this, e)} title="${r ? "Expand" : "Collapse"}">
						<uui-icon name="${r ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</button>
					<span class="group-count">${t.children.length} item${t.children.length !== 1 ? "s" : ""}</span>
				</div>
				${!r && l ? w`
					<div class="section-children">
						${t.children.map((c) => m(this, x, se).call(this, c))}
					</div>
				` : z}
			</div>
		`;
};
He = function(t, e, s) {
  const n = t.totalElements, r = m(this, x, ge).call(this, e, `a${s}`, t.sections.length), i = m(this, x, fe).call(this, r);
  return w`
			<div class="zone-area" style="border-left-color: ${t.color};">
				<div class="area-header">
					<span class="area-color-swatch" style="background: ${t.color};"></span>
					<span class="area-element-count">${n} element${n !== 1 ? "s" : ""}</span>
					${t.sections.length > 1 ? w`
						<button class="area-collapse-toggle" @click=${() => m(this, x, ke).call(this, r)}
							title="${i ? "Expand all sections" : "Collapse all sections"}">
							<uui-icon name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
							${i ? "Expand" : "Collapse"}
						</button>
					` : z}
				</div>
				${t.sections.map(
    (l, a) => m(this, x, be).call(this, l, `p${e}-a${s}-s${a}`, e, s)
  )}
			</div>
		`;
};
Qe = function(t, e) {
  if (t.totalElements === 0) return z;
  const s = m(this, x, ge).call(this, e, "unzoned", t.sections.length), n = m(this, x, fe).call(this, s);
  return w`
			<div class="zone-area unzoned" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header">
					<span class="area-color-swatch unzoned-swatch"></span>
					<span class="area-element-count">Unzoned — ${t.totalElements} element${t.totalElements !== 1 ? "s" : ""}</span>
					${t.sections.length > 1 ? w`
						<button class="area-collapse-toggle" @click=${() => m(this, x, ke).call(this, s)}
							title="${n ? "Expand all sections" : "Collapse all sections"}">
							<uui-icon name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
							${n ? "Expand" : "Collapse"}
						</button>
					` : z}
				</div>
				${t.sections.map(
    (r, i) => m(this, x, be).call(this, r, `p${e}-unzoned-s${i}`, e, -1)
  )}
			</div>
		`;
};
We = function(t, e, s) {
  return w`
			<uui-box headline="Page ${t}" class="page-box">
				${e.map((n, r) => m(this, x, He).call(this, n, t, r))}
				${s ? m(this, x, Qe).call(this, s, t) : z}
			</uui-box>
		`;
};
Ge = function() {
  return this._zoneDetection ? w`
			${this._zoneDetection.pages.map(
    (t) => m(this, x, We).call(this, t.page, t.zones, t.unzonedContent)
  )}
			<div class="diagnostics">
				<span class="meta-badge">${this._zoneDetection.diagnostics.zonesDetected} areas</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsZoned} zoned</span>
				<span class="meta-badge">${this._zoneDetection.diagnostics.elementsUnzoned} unzoned</span>
			</div>
		` : z;
};
Fe = function() {
  const t = this._zoneDetection !== null, e = this._extraction !== null;
  if (!t && !e) return z;
  const s = t ? this._zoneDetection.diagnostics.elementsZoned + this._zoneDetection.diagnostics.elementsUnzoned : this._extraction.elements.length;
  return w`
			<div class="extraction-header">
				${e ? w`
					<div class="extraction-info">
						<span class="info-label">Source:</span>
						<span>${this._extraction.source.fileName}</span>
					</div>
					<div class="extraction-info">
						<span class="info-label">Pages:</span>
						<span>${this._extraction.source.totalPages}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Elements:</span>
						<span>${s}</span>
						${t ? w`
							<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
							<span>${this._zoneDetection.diagnostics.zonesDetected}</span>
						` : z}
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Extracted:</span>
						<span>${new Date(this._extraction.source.extractedDate).toLocaleString()}</span>
					</div>
				` : w`
					<div class="extraction-info">
						<span class="info-label">Elements:</span>
						<span>${s}</span>
						<span class="info-label" style="margin-left: var(--uui-size-space-4);">Areas:</span>
						<span>${this._zoneDetection.diagnostics.zonesDetected}</span>
					</div>
				`}
				<uui-button look="secondary" label="Re-extract" @click=${m(this, x, de)} ?disabled=${this._extracting}>
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

			${this._viewMode === "elements" ? t ? m(this, x, Ge).call(this) : z : m(this, x, Xe).call(this)}
		`;
};
je = function(t) {
  const e = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, s = t.heading ?? "Preamble";
  return w`
			<uui-box headline=${s} class="transformed-section">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${t.pattern}">${e[t.pattern] ?? t.pattern}</span>
					<span class="meta-badge">p${t.page}</span>
					${t.zoneColor ? w`<span class="area-color-swatch" style="background: ${t.zoneColor};"></span>` : z}
					<span class="meta-badge">${t.childCount} item${t.childCount !== 1 ? "s" : ""}</span>
				</div>
				<div class="transformed-content" .innerHTML=${Kt(t.content)}></div>
			</uui-box>
		`;
};
Xe = function() {
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
			${t.map((s) => m(this, x, je).call(this, s))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${e} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? w`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : z}
			</div>
		`;
};
Ke = function() {
  return w`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Upload a PDF to extract all text elements with their metadata.</p>
				<uui-button look="primary" label="Upload PDF" @click=${m(this, x, de)} ?disabled=${this._extracting}>
					${this._extracting ? w`<uui-loader-bar></uui-loader-bar>` : "Upload PDF"}
				</uui-button>
			</div>
		`;
};
_.styles = [
  ct,
  it`
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
  lt("up-doc-workflow-source-view")
], _);
const us = _;
export {
  _ as UpDocWorkflowSourceViewElement,
  us as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-BIAohvUf.js.map
