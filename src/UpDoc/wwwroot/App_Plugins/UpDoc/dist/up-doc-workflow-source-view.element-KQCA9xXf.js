import { d as vt, g as Le, b as _t, h as $t, i as yt, j as zt, k as St, l as Tt, s as Rt, m as Ct, n as Pt, u as At } from "./workflow.service-T0TEyrPt.js";
import { UmbModalToken as Be, UMB_MODAL_MANAGER_CONTEXT as ue } from "@umbraco-cms/backoffice/modal";
import { html as d, nothing as w, css as Et, state as $, customElement as Mt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as It } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Dt } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as Ne } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Lt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as Bt } from "@umbraco-cms/backoffice/media";
function pe() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var E = pe();
function Ze(t) {
  E = t;
}
var q = { exec: () => null };
function g(t, e = "") {
  let s = typeof t == "string" ? t : t.source, i = { replace: (n, a) => {
    let r = typeof a == "string" ? a : a.source;
    return r = r.replace(y.caret, "$1"), s = s.replace(n, r), i;
  }, getRegex: () => new RegExp(s, e) };
  return i;
}
var Nt = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), y = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, Zt = /^(?:[ \t]*(?:\n|$))+/, qt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ot = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, H = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ht = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, he = /(?:[*+-]|\d{1,9}[.)])/, qe = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Oe = g(qe).replace(/bull/g, he).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ut = g(qe).replace(/bull/g, he).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), de = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Vt = /^[^\n]+/, ge = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Qt = g(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ge).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ft = g(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, he).getRegex(), X = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", fe = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Gt = g("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", fe).replace("tag", X).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), He = g(de).replace("hr", H).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", X).getRegex(), jt = g(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", He).getRegex(), me = { blockquote: jt, code: qt, def: Qt, fences: Ot, heading: Ht, hr: H, html: Gt, lheading: Oe, list: Ft, newline: Zt, paragraph: He, table: q, text: Vt }, Ce = g("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", H).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", X).getRegex(), Wt = { ...me, lheading: Ut, table: Ce, paragraph: g(de).replace("hr", H).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ce).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", X).getRegex() }, Kt = { ...me, html: g(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", fe).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: q, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: g(de).replace("hr", H).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Oe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Xt = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Jt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Ue = /^( {2,}|\\)\n(?!\s*$)/, Yt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, J = /[\p{P}\p{S}]/u, ke = /[\s\p{P}\p{S}]/u, Ve = /[^\s\p{P}\p{S}]/u, es = g(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ke).getRegex(), Qe = /(?!~)[\p{P}\p{S}]/u, ts = /(?!~)[\s\p{P}\p{S}]/u, ss = /(?:[^\s\p{P}\p{S}]|~)/u, ns = g(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Nt ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Fe = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, is = g(Fe, "u").replace(/punct/g, J).getRegex(), as = g(Fe, "u").replace(/punct/g, Qe).getRegex(), Ge = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", rs = g(Ge, "gu").replace(/notPunctSpace/g, Ve).replace(/punctSpace/g, ke).replace(/punct/g, J).getRegex(), ls = g(Ge, "gu").replace(/notPunctSpace/g, ss).replace(/punctSpace/g, ts).replace(/punct/g, Qe).getRegex(), os = g("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Ve).replace(/punctSpace/g, ke).replace(/punct/g, J).getRegex(), cs = g(/\\(punct)/, "gu").replace(/punct/g, J).getRegex(), us = g(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ps = g(fe).replace("(?:-->|$)", "-->").getRegex(), hs = g("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ps).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), G = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, ds = g(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", G).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), je = g(/^!?\[(label)\]\[(ref)\]/).replace("label", G).replace("ref", ge).getRegex(), We = g(/^!?\[(ref)\](?:\[\])?/).replace("ref", ge).getRegex(), gs = g("reflink|nolink(?!\\()", "g").replace("reflink", je).replace("nolink", We).getRegex(), Pe = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, xe = { _backpedal: q, anyPunctuation: cs, autolink: us, blockSkip: ns, br: Ue, code: Jt, del: q, emStrongLDelim: is, emStrongRDelimAst: rs, emStrongRDelimUnd: os, escape: Xt, link: ds, nolink: We, punctuation: es, reflink: je, reflinkSearch: gs, tag: hs, text: Yt, url: q }, fs = { ...xe, link: g(/^!?\[(label)\]\((.*?)\)/).replace("label", G).getRegex(), reflink: g(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", G).getRegex() }, se = { ...xe, emStrongRDelimAst: ls, emStrongLDelim: as, url: g(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Pe).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: g(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Pe).getRegex() }, ms = { ...se, br: g(Ue).replace("{2,}", "*").getRegex(), text: g(se.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, V = { normal: me, gfm: Wt, pedantic: Kt }, B = { normal: xe, gfm: se, breaks: ms, pedantic: fs }, ks = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Ae = (t) => ks[t];
function P(t, e) {
  if (e) {
    if (y.escapeTest.test(t)) return t.replace(y.escapeReplace, Ae);
  } else if (y.escapeTestNoEncode.test(t)) return t.replace(y.escapeReplaceNoEncode, Ae);
  return t;
}
function Ee(t) {
  try {
    t = encodeURI(t).replace(y.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Me(t, e) {
  let s = t.replace(y.findPipe, (a, r, o) => {
    let l = !1, h = r;
    for (; --h >= 0 && o[h] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), i = s.split(y.splitPipe), n = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !i.at(-1)?.trim() && i.pop(), e) if (i.length > e) i.splice(e);
  else for (; i.length < e; ) i.push("");
  for (; n < i.length; n++) i[n] = i[n].trim().replace(y.slashPipe, "|");
  return i;
}
function N(t, e, s) {
  let i = t.length;
  if (i === 0) return "";
  let n = 0;
  for (; n < i && t.charAt(i - n - 1) === e; )
    n++;
  return t.slice(0, i - n);
}
function xs(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let s = 0;
  for (let i = 0; i < t.length; i++) if (t[i] === "\\") i++;
  else if (t[i] === e[0]) s++;
  else if (t[i] === e[1] && (s--, s < 0)) return i;
  return s > 0 ? -2 : -1;
}
function Ie(t, e, s, i, n) {
  let a = e.href, r = e.title || null, o = t[1].replace(n.other.outputLinkReplace, "$1");
  i.state.inLink = !0;
  let l = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: s, href: a, title: r, text: o, tokens: i.inlineTokens(o) };
  return i.state.inLink = !1, l;
}
function bs(t, e, s) {
  let i = t.match(s.other.indentCodeCompensation);
  if (i === null) return e;
  let n = i[1];
  return e.split(`
`).map((a) => {
    let r = a.match(s.other.beginningSpace);
    if (r === null) return a;
    let [o] = r;
    return o.length >= n.length ? a.slice(n.length) : a;
  }).join(`
`);
}
var j = class {
  options;
  rules;
  lexer;
  constructor(t) {
    this.options = t || E;
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
      let s = e[0], i = bs(s, e[3] || "", this.rules);
      return { type: "code", raw: s, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: i };
    }
  }
  heading(t) {
    let e = this.rules.block.heading.exec(t);
    if (e) {
      let s = e[2].trim();
      if (this.rules.other.endingHash.test(s)) {
        let i = N(s, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceChar.test(i)) && (s = i.trim());
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
`), i = "", n = "", a = [];
      for (; s.length > 0; ) {
        let r = !1, o = [], l;
        for (l = 0; l < s.length; l++) if (this.rules.other.blockquoteStart.test(s[l])) o.push(s[l]), r = !0;
        else if (!r) o.push(s[l]);
        else break;
        s = s.slice(l);
        let h = o.join(`
`), p = h.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${h}` : h, n = n ? `${n}
${p}` : p;
        let k = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, a, !0), this.lexer.state.top = k, s.length === 0) break;
        let f = a.at(-1);
        if (f?.type === "code") break;
        if (f?.type === "blockquote") {
          let _ = f, x = _.raw + `
` + s.join(`
`), S = this.blockquote(x);
          a[a.length - 1] = S, i = i.substring(0, i.length - _.raw.length) + S.raw, n = n.substring(0, n.length - _.text.length) + S.text;
          break;
        } else if (f?.type === "list") {
          let _ = f, x = _.raw + `
` + s.join(`
`), S = this.list(x);
          a[a.length - 1] = S, i = i.substring(0, i.length - f.raw.length) + S.raw, n = n.substring(0, n.length - _.raw.length) + S.raw, s = x.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: i, tokens: a, text: n };
    }
  }
  list(t) {
    let e = this.rules.block.list.exec(t);
    if (e) {
      let s = e[1].trim(), i = s.length > 1, n = { type: "list", raw: "", ordered: i, start: i ? +s.slice(0, -1) : "", loose: !1, items: [] };
      s = i ? `\\d{1,9}\\${s.slice(-1)}` : `\\${s}`, this.options.pedantic && (s = i ? s : "[*+-]");
      let a = this.rules.other.listItemRegex(s), r = !1;
      for (; t; ) {
        let l = !1, h = "", p = "";
        if (!(e = a.exec(t)) || this.rules.block.hr.test(t)) break;
        h = e[0], t = t.substring(h.length);
        let k = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (S) => " ".repeat(3 * S.length)), f = t.split(`
`, 1)[0], _ = !k.trim(), x = 0;
        if (this.options.pedantic ? (x = 2, p = k.trimStart()) : _ ? x = e[1].length + 1 : (x = e[2].search(this.rules.other.nonSpaceChar), x = x > 4 ? 1 : x, p = k.slice(x), x += e[1].length), _ && this.rules.other.blankLine.test(f) && (h += f + `
`, t = t.substring(f.length + 1), l = !0), !l) {
          let S = this.rules.other.nextBulletRegex(x), Se = this.rules.other.hrRegex(x), Te = this.rules.other.fencesBeginRegex(x), Re = this.rules.other.headingBeginRegex(x), wt = this.rules.other.htmlBeginRegex(x);
          for (; t; ) {
            let te = t.split(`
`, 1)[0], L;
            if (f = te, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), L = f) : L = f.replace(this.rules.other.tabCharGlobal, "    "), Te.test(f) || Re.test(f) || wt.test(f) || S.test(f) || Se.test(f)) break;
            if (L.search(this.rules.other.nonSpaceChar) >= x || !f.trim()) p += `
` + L.slice(x);
            else {
              if (_ || k.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || Te.test(k) || Re.test(k) || Se.test(k)) break;
              p += `
` + f;
            }
            !_ && !f.trim() && (_ = !0), h += te + `
`, t = t.substring(te.length + 1), k = L.slice(x);
          }
        }
        n.loose || (r ? n.loose = !0 : this.rules.other.doubleBlankLine.test(h) && (r = !0)), n.items.push({ type: "list_item", raw: h, task: !!this.options.gfm && this.rules.other.listIsTask.test(p), loose: !1, text: p, tokens: [] }), n.raw += h;
      }
      let o = n.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      n.raw = n.raw.trimEnd();
      for (let l of n.items) {
        if (this.lexer.state.top = !1, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
          if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
            l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let p = this.lexer.inlineQueue.length - 1; p >= 0; p--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)) {
              this.lexer.inlineQueue[p].src = this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let h = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (h) {
            let p = { type: "checkbox", raw: h[0] + " ", checked: h[0] !== "[ ]" };
            l.checked = p.checked, n.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = p.raw + l.tokens[0].raw, l.tokens[0].text = p.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(p)) : l.tokens.unshift({ type: "paragraph", raw: p.raw, text: p.raw, tokens: [p] }) : l.tokens.unshift(p);
          }
        }
        if (!n.loose) {
          let h = l.tokens.filter((k) => k.type === "space"), p = h.length > 0 && h.some((k) => this.rules.other.anyLine.test(k.raw));
          n.loose = p;
        }
      }
      if (n.loose) for (let l of n.items) {
        l.loose = !0;
        for (let h of l.tokens) h.type === "text" && (h.type = "paragraph");
      }
      return n;
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
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let s = Me(e[1]), i = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = e[3]?.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (s.length === i.length) {
      for (let r of i) this.rules.other.tableAlignRight.test(r) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(r) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(r) ? a.align.push("left") : a.align.push(null);
      for (let r = 0; r < s.length; r++) a.header.push({ text: s[r], tokens: this.lexer.inline(s[r]), header: !0, align: a.align[r] });
      for (let r of n) a.rows.push(Me(r, a.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: !1, align: a.align[l] })));
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
        let a = xs(e[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let r = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, r).trim(), e[3] = "";
        }
      }
      let i = e[2], n = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(i);
        a && (i = a[1], n = a[3]);
      } else n = e[3] ? e[3].slice(1, -1) : "";
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? i = i.slice(1) : i = i.slice(1, -1)), Ie(e, { href: i && i.replace(this.rules.inline.anyPunctuation, "$1"), title: n && n.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
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
      return Ie(s, n, s[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, s = "") {
    let i = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!i || i[3] && s.match(this.rules.other.unicodeAlphaNumeric)) && (!(i[1] || i[2]) || !s || this.rules.inline.punctuation.exec(s))) {
      let n = [...i[0]].length - 1, a, r, o = n, l = 0, h = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (h.lastIndex = 0, e = e.slice(-1 * t.length + n); (i = h.exec(e)) != null; ) {
        if (a = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !a) continue;
        if (r = [...a].length, i[3] || i[4]) {
          o += r;
          continue;
        } else if ((i[5] || i[6]) && n % 3 && !((n + r) % 3)) {
          l += r;
          continue;
        }
        if (o -= r, o > 0) continue;
        r = Math.min(r, r + o + l);
        let p = [...i[0]][0].length, k = t.slice(0, n + i.index + p + r);
        if (Math.min(n, r) % 2) {
          let _ = k.slice(1, -1);
          return { type: "em", raw: k, text: _, tokens: this.lexer.inlineTokens(_) };
        }
        let f = k.slice(2, -2);
        return { type: "strong", raw: k, text: f, tokens: this.lexer.inlineTokens(f) };
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
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let s, i;
      if (e[2] === "@") s = e[0], i = "mailto:" + s;
      else {
        let n;
        do
          n = e[0], e[0] = this.rules.inline._backpedal.exec(e[0])?.[0] ?? "";
        while (n !== e[0]);
        s = e[0], e[1] === "www." ? i = "http://" + e[0] : i = e[0];
      }
      return { type: "link", raw: e[0], text: s, href: i, tokens: [{ type: "text", raw: s, text: s }] };
    }
  }
  inlineText(t) {
    let e = this.rules.inline.text.exec(t);
    if (e) {
      let s = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: s };
    }
  }
}, T = class ne {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || E, this.options.tokenizer = this.options.tokenizer || new j(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let s = { other: y, block: V.normal, inline: B.normal };
    this.options.pedantic ? (s.block = V.pedantic, s.inline = B.pedantic) : this.options.gfm && (s.block = V.gfm, this.options.breaks ? s.inline = B.breaks : s.inline = B.gfm), this.tokenizer.rules = s;
  }
  static get rules() {
    return { block: V, inline: B };
  }
  static lex(e, s) {
    return new ne(s).lex(e);
  }
  static lexInline(e, s) {
    return new ne(s).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(y.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let s = 0; s < this.inlineQueue.length; s++) {
      let i = this.inlineQueue[s];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, s = [], i = !1) {
    for (this.options.pedantic && (e = e.replace(y.tabCharGlobal, "    ").replace(y.spaceLine, "")); e; ) {
      let n;
      if (this.options.extensions?.block?.some((r) => (n = r.call({ lexer: this }, e, s)) ? (e = e.substring(n.raw.length), s.push(n), !0) : !1)) continue;
      if (n = this.tokenizer.space(e)) {
        e = e.substring(n.raw.length);
        let r = s.at(-1);
        n.raw.length === 1 && r !== void 0 ? r.raw += `
` : s.push(n);
        continue;
      }
      if (n = this.tokenizer.code(e)) {
        e = e.substring(n.raw.length);
        let r = s.at(-1);
        r?.type === "paragraph" || r?.type === "text" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + n.raw, r.text += `
` + n.text, this.inlineQueue.at(-1).src = r.text) : s.push(n);
        continue;
      }
      if (n = this.tokenizer.fences(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      if (n = this.tokenizer.heading(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      if (n = this.tokenizer.hr(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      if (n = this.tokenizer.blockquote(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      if (n = this.tokenizer.list(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      if (n = this.tokenizer.html(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      if (n = this.tokenizer.def(e)) {
        e = e.substring(n.raw.length);
        let r = s.at(-1);
        r?.type === "paragraph" || r?.type === "text" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + n.raw, r.text += `
` + n.raw, this.inlineQueue.at(-1).src = r.text) : this.tokens.links[n.tag] || (this.tokens.links[n.tag] = { href: n.href, title: n.title }, s.push(n));
        continue;
      }
      if (n = this.tokenizer.table(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      if (n = this.tokenizer.lheading(e)) {
        e = e.substring(n.raw.length), s.push(n);
        continue;
      }
      let a = e;
      if (this.options.extensions?.startBlock) {
        let r = 1 / 0, o = e.slice(1), l;
        this.options.extensions.startBlock.forEach((h) => {
          l = h.call({ lexer: this }, o), typeof l == "number" && l >= 0 && (r = Math.min(r, l));
        }), r < 1 / 0 && r >= 0 && (a = e.substring(0, r + 1));
      }
      if (this.state.top && (n = this.tokenizer.paragraph(a))) {
        let r = s.at(-1);
        i && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + n.raw, r.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : s.push(n), i = a.length !== e.length, e = e.substring(n.raw.length);
        continue;
      }
      if (n = this.tokenizer.text(e)) {
        e = e.substring(n.raw.length);
        let r = s.at(-1);
        r?.type === "text" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + n.raw, r.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : s.push(n);
        continue;
      }
      if (e) {
        let r = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(r);
          break;
        } else throw new Error(r);
      }
    }
    return this.state.top = !0, s;
  }
  inline(e, s = []) {
    return this.inlineQueue.push({ src: e, tokens: s }), s;
  }
  inlineTokens(e, s = []) {
    let i = e, n = null;
    if (this.tokens.links) {
      let l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (n = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; ) l.includes(n[0].slice(n[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, n.index) + "[" + "a".repeat(n[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (n = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; ) i = i.slice(0, n.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let a;
    for (; (n = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; ) a = n[2] ? n[2].length : 0, i = i.slice(0, n.index + a) + "[" + "a".repeat(n[0].length - a - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    i = this.options.hooks?.emStrongMask?.call({ lexer: this }, i) ?? i;
    let r = !1, o = "";
    for (; e; ) {
      r || (o = ""), r = !1;
      let l;
      if (this.options.extensions?.inline?.some((p) => (l = p.call({ lexer: this }, e, s)) ? (e = e.substring(l.raw.length), s.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.escape(e)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (l = this.tokenizer.tag(e)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (l = this.tokenizer.link(e)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (l = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(l.raw.length);
        let p = s.at(-1);
        l.type === "text" && p?.type === "text" ? (p.raw += l.raw, p.text += l.text) : s.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(e, i, o)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (l = this.tokenizer.codespan(e)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (l = this.tokenizer.br(e)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (l = this.tokenizer.del(e)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (l = this.tokenizer.autolink(e)) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      if (!this.state.inLink && (l = this.tokenizer.url(e))) {
        e = e.substring(l.raw.length), s.push(l);
        continue;
      }
      let h = e;
      if (this.options.extensions?.startInline) {
        let p = 1 / 0, k = e.slice(1), f;
        this.options.extensions.startInline.forEach((_) => {
          f = _.call({ lexer: this }, k), typeof f == "number" && f >= 0 && (p = Math.min(p, f));
        }), p < 1 / 0 && p >= 0 && (h = e.substring(0, p + 1));
      }
      if (l = this.tokenizer.inlineText(h)) {
        e = e.substring(l.raw.length), l.raw.slice(-1) !== "_" && (o = l.raw.slice(-1)), r = !0;
        let p = s.at(-1);
        p?.type === "text" ? (p.raw += l.raw, p.text += l.text) : s.push(l);
        continue;
      }
      if (e) {
        let p = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(p);
          break;
        } else throw new Error(p);
      }
    }
    return s;
  }
}, W = class {
  options;
  parser;
  constructor(t) {
    this.options = t || E;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: s }) {
    let i = (e || "").match(y.notSpaceStart)?.[0], n = t.replace(y.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + P(i) + '">' + (s ? n : P(n, !0)) + `</code></pre>
` : "<pre><code>" + (s ? n : P(n, !0)) + `</code></pre>
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
    for (let r = 0; r < t.items.length; r++) {
      let o = t.items[r];
      i += this.listitem(o);
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
      for (let r = 0; r < a.length; r++) s += this.tablecell(a[r]);
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
    return `<code>${P(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, tokens: s }) {
    let i = this.parser.parseInline(s), n = Ee(t);
    if (n === null) return i;
    t = n;
    let a = '<a href="' + t + '"';
    return e && (a += ' title="' + P(e) + '"'), a += ">" + i + "</a>", a;
  }
  image({ href: t, title: e, text: s, tokens: i }) {
    i && (s = this.parser.parseInline(i, this.parser.textRenderer));
    let n = Ee(t);
    if (n === null) return P(s);
    t = n;
    let a = `<img src="${t}" alt="${s}"`;
    return e && (a += ` title="${P(e)}"`), a += ">", a;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : P(t.text);
  }
}, be = class {
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
}, R = class ie {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || E, this.options.renderer = this.options.renderer || new W(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new be();
  }
  static parse(e, s) {
    return new ie(s).parse(e);
  }
  static parseInline(e, s) {
    return new ie(s).parseInline(e);
  }
  parse(e) {
    let s = "";
    for (let i = 0; i < e.length; i++) {
      let n = e[i];
      if (this.options.extensions?.renderers?.[n.type]) {
        let r = n, o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (o !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(r.type)) {
          s += o || "";
          continue;
        }
      }
      let a = n;
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
          let r = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(r), "";
          throw new Error(r);
        }
      }
    }
    return s;
  }
  parseInline(e, s = this.renderer) {
    let i = "";
    for (let n = 0; n < e.length; n++) {
      let a = e[n];
      if (this.options.extensions?.renderers?.[a.type]) {
        let o = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          i += o || "";
          continue;
        }
      }
      let r = a;
      switch (r.type) {
        case "escape": {
          i += s.text(r);
          break;
        }
        case "html": {
          i += s.html(r);
          break;
        }
        case "link": {
          i += s.link(r);
          break;
        }
        case "image": {
          i += s.image(r);
          break;
        }
        case "checkbox": {
          i += s.checkbox(r);
          break;
        }
        case "strong": {
          i += s.strong(r);
          break;
        }
        case "em": {
          i += s.em(r);
          break;
        }
        case "codespan": {
          i += s.codespan(r);
          break;
        }
        case "br": {
          i += s.br(r);
          break;
        }
        case "del": {
          i += s.del(r);
          break;
        }
        case "text": {
          i += s.text(r);
          break;
        }
        default: {
          let o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return i;
  }
}, Z = class {
  options;
  block;
  constructor(t) {
    this.options = t || E;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
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
    return this.block ? R.parse : R.parseInline;
  }
}, ws = class {
  defaults = pe();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = R;
  Renderer = W;
  TextRenderer = be;
  Lexer = T;
  Tokenizer = j;
  Hooks = Z;
  constructor(...t) {
    this.use(...t);
  }
  walkTokens(t, e) {
    let s = [];
    for (let i of t) switch (s = s.concat(e.call(this, i)), i.type) {
      case "table": {
        let n = i;
        for (let a of n.header) s = s.concat(this.walkTokens(a.tokens, e));
        for (let a of n.rows) for (let r of a) s = s.concat(this.walkTokens(r.tokens, e));
        break;
      }
      case "list": {
        let n = i;
        s = s.concat(this.walkTokens(n.items, e));
        break;
      }
      default: {
        let n = i;
        this.defaults.extensions?.childTokens?.[n.type] ? this.defaults.extensions.childTokens[n.type].forEach((a) => {
          let r = n[a].flat(1 / 0);
          s = s.concat(this.walkTokens(r, e));
        }) : n.tokens && (s = s.concat(this.walkTokens(n.tokens, e)));
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
          a ? e.renderers[n.name] = function(...r) {
            let o = n.renderer.apply(this, r);
            return o === !1 && (o = a.apply(this, r)), o;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = e[n.level];
          a ? a.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), i.extensions = e), s.renderer) {
        let n = this.defaults.renderer || new W(this.defaults);
        for (let a in s.renderer) {
          if (!(a in n)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let r = a, o = s.renderer[r], l = n[r];
          n[r] = (...h) => {
            let p = o.apply(n, h);
            return p === !1 && (p = l.apply(n, h)), p || "";
          };
        }
        i.renderer = n;
      }
      if (s.tokenizer) {
        let n = this.defaults.tokenizer || new j(this.defaults);
        for (let a in s.tokenizer) {
          if (!(a in n)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let r = a, o = s.tokenizer[r], l = n[r];
          n[r] = (...h) => {
            let p = o.apply(n, h);
            return p === !1 && (p = l.apply(n, h)), p;
          };
        }
        i.tokenizer = n;
      }
      if (s.hooks) {
        let n = this.defaults.hooks || new Z();
        for (let a in s.hooks) {
          if (!(a in n)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let r = a, o = s.hooks[r], l = n[r];
          Z.passThroughHooks.has(a) ? n[r] = (h) => {
            if (this.defaults.async && Z.passThroughHooksRespectAsync.has(a)) return (async () => {
              let k = await o.call(n, h);
              return l.call(n, k);
            })();
            let p = o.call(n, h);
            return l.call(n, p);
          } : n[r] = (...h) => {
            if (this.defaults.async) return (async () => {
              let k = await o.apply(n, h);
              return k === !1 && (k = await l.apply(n, h)), k;
            })();
            let p = o.apply(n, h);
            return p === !1 && (p = l.apply(n, h)), p;
          };
        }
        i.hooks = n;
      }
      if (s.walkTokens) {
        let n = this.defaults.walkTokens, a = s.walkTokens;
        i.walkTokens = function(r) {
          let o = [];
          return o.push(a.call(this, r)), n && (o = o.concat(n.call(this, r))), o;
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
    return R.parse(t, e ?? this.defaults);
  }
  parseMarkdown(t) {
    return (e, s) => {
      let i = { ...s }, n = { ...this.defaults, ...i }, a = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && i.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (n.hooks && (n.hooks.options = n, n.hooks.block = t), n.async) return (async () => {
        let r = n.hooks ? await n.hooks.preprocess(e) : e, o = await (n.hooks ? await n.hooks.provideLexer() : t ? T.lex : T.lexInline)(r, n), l = n.hooks ? await n.hooks.processAllTokens(o) : o;
        n.walkTokens && await Promise.all(this.walkTokens(l, n.walkTokens));
        let h = await (n.hooks ? await n.hooks.provideParser() : t ? R.parse : R.parseInline)(l, n);
        return n.hooks ? await n.hooks.postprocess(h) : h;
      })().catch(a);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let r = (n.hooks ? n.hooks.provideLexer() : t ? T.lex : T.lexInline)(e, n);
        n.hooks && (r = n.hooks.processAllTokens(r)), n.walkTokens && this.walkTokens(r, n.walkTokens);
        let o = (n.hooks ? n.hooks.provideParser() : t ? R.parse : R.parseInline)(r, n);
        return n.hooks && (o = n.hooks.postprocess(o)), o;
      } catch (r) {
        return a(r);
      }
    };
  }
  onError(t, e) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        let i = "<p>An error occurred:</p><pre>" + P(s.message + "", !0) + "</pre>";
        return e ? Promise.resolve(i) : i;
      }
      if (e) return Promise.reject(s);
      throw s;
    };
  }
}, A = new ws();
function m(t, e) {
  return A.parse(t, e);
}
m.options = m.setOptions = function(t) {
  return A.setOptions(t), m.defaults = A.defaults, Ze(m.defaults), m;
};
m.getDefaults = pe;
m.defaults = E;
m.use = function(...t) {
  return A.use(...t), m.defaults = A.defaults, Ze(m.defaults), m;
};
m.walkTokens = function(t, e) {
  return A.walkTokens(t, e);
};
m.parseInline = A.parseInline;
m.Parser = R;
m.parser = R.parse;
m.Renderer = W;
m.TextRenderer = be;
m.Lexer = T;
m.lexer = T.lex;
m.Tokenizer = j;
m.Hooks = Z;
m.parse = m;
m.options;
m.setOptions;
m.use;
m.walkTokens;
m.parseInline;
R.parse;
T.lex;
function vs(t) {
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
function _s(t) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const $s = new Be("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
}), ys = new Be(
  "UpDoc.ZoneEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "full"
    }
  }
);
var zs = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, Ke = (t) => {
  throw TypeError(t);
}, v = (t, e, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Ss(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (n = (i ? r(e, s, n) : r(n)) || n);
  return i && n && zs(e, s, n), n;
}, we = (t, e, s) => e.has(t) || Ke("Cannot " + s), C = (t, e, s) => (we(t, e, "read from private field"), s ? s.call(t) : e.get(t)), De = (t, e, s) => e.has(t) ? Ke("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), Ts = (t, e, s, i) => (we(t, e, "write to private field"), e.set(t, s), s), u = (t, e, s) => (we(t, e, "access private method"), s), z, c, Xe, I, M, Je, Ye, et, Q, tt, st, Y, ve, O, F, nt, it, ee, ae, _e, $e, U, D, at, re, le, K, rt, lt, oe, ye, ze, ot, ct, ut, pt, ht, dt, gt, ft, mt, ce, kt, xt, bt;
let b = class extends It {
  constructor() {
    super(...arguments), De(this, c), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._collapsePopoverOpen = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._zoneTemplate = null, De(this, z, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Lt, (t) => {
      t && (t.setSaveHandler(() => u(this, c, _e).call(this)), this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), u(this, c, Xe).call(this));
      }));
    });
  }
  render() {
    if (this._loading)
      return d`<div class="loading"><uui-loader-bar></uui-loader-bar></div>`;
    if (this._error)
      return d`
				<umb-body-layout header-fit-height>
					<p style="color: var(--uui-color-danger); padding: var(--uui-size-layout-1);">${this._error}</p>
				</umb-body-layout>`;
    const t = this._zoneDetection !== null || this._extraction !== null;
    return d`
			<umb-body-layout header-fit-height>
				${t ? u(this, c, gt).call(this) : w}
				${t && this._viewMode === "elements" ? u(this, c, ft).call(this) : w}
				${this._successMessage ? d`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : w}
				${t ? u(this, c, mt).call(this) : u(this, c, bt).call(this)}
			</umb-body-layout>
		`;
  }
};
z = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
Xe = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const t = await this.getContext(Ne);
      Ts(this, z, await t.getLatestToken());
      const [e, s, i, n, a, r] = await Promise.all([
        vt(this._workflowName, C(this, z)),
        Le(this._workflowName, C(this, z)),
        _t(this._workflowName, C(this, z)),
        $t(this._workflowName, C(this, z)),
        yt(this._workflowName, C(this, z)),
        zt(this._workflowName, C(this, z))
      ]);
      this._extraction = e, this._zoneDetection = s, this._config = i, this._transformResult = n, this._sourceConfig = a, this._zoneTemplate = r, a?.pages && Array.isArray(a.pages) && a.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = u(this, c, M).call(this, a.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to load data", console.error("Failed to load source data:", t);
    } finally {
      this._loading = !1;
    }
  }
};
I = function(t) {
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
M = function(t) {
  if (!t.length) return "";
  const e = [...t].sort((a, r) => a - r), s = [];
  let i = e[0], n = e[0];
  for (let a = 1; a < e.length; a++)
    e[a] === n + 1 || (s.push(i === n ? `${i}` : `${i}-${n}`), i = e[a]), n = e[a];
  return s.push(i === n ? `${i}` : `${i}-${n}`), s.join(", ");
};
Je = function() {
  if (this._pageMode === "all") return null;
  const t = u(this, c, I).call(this, this._pageInputValue);
  return t.length > 0 ? t : null;
};
Ye = function(t) {
  if (this._pageMode === "all") return !0;
  const e = u(this, c, I).call(this, this._pageInputValue);
  return e.length === 0 || e.includes(t);
};
et = function(t) {
  const e = this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (e !== 0) {
    if (this._pageMode === "all") {
      const i = Array.from({ length: e }, (n, a) => a + 1).filter((n) => n !== t);
      this._pageMode = "custom", this._pageInputValue = u(this, c, M).call(this, i);
    } else {
      const s = u(this, c, I).call(this, this._pageInputValue);
      if (s.includes(t)) {
        const i = s.filter((n) => n !== t);
        this._pageInputValue = u(this, c, M).call(this, i), i.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const i = [...s, t].sort((n, a) => n - a);
        this._pageInputValue = u(this, c, M).call(this, i);
      }
      u(this, c, I).call(this, this._pageInputValue).length === e && (this._pageMode = "all", this._pageInputValue = "");
    }
    u(this, c, Y).call(this);
  }
};
Q = async function(t) {
  this._pageMode = t, t === "all" && (this._pageInputValue = ""), await u(this, c, Y).call(this);
};
tt = async function(t) {
  const e = t.target;
  this._pageInputValue = e.value;
};
st = async function() {
  const t = u(this, c, I).call(this, this._pageInputValue);
  t.length > 0 ? (this._pageInputValue = u(this, c, M).call(this, t), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await u(this, c, Y).call(this);
};
Y = async function() {
  if (!this._workflowName) return;
  const t = u(this, c, Je).call(this);
  await Ct(this._workflowName, t, C(this, z));
};
ve = function(t) {
  if (!this._zoneDetection) return [];
  const e = [];
  for (const s of this._zoneDetection.pages) {
    const i = s.page;
    t === "pages" && e.push(`page-${i}`), t === "areas" && (s.zones.forEach((n, a) => e.push(`area-p${i}-a${a}`)), s.unzonedContent && e.push(`area-p${i}-undefined`)), t === "sections" && (s.zones.forEach((n, a) => {
      n.sections.forEach((r, o) => e.push(`p${i}-a${a}-s${o}`));
    }), s.unzonedContent && s.unzonedContent.sections.forEach((n, a) => e.push(`p${i}-undefined-s${a}`)));
  }
  return e;
};
O = function(t) {
  const e = u(this, c, ve).call(this, t);
  return e.length > 0 && e.every((s) => this._collapsed.has(s));
};
F = function(t) {
  const e = u(this, c, ve).call(this, t), s = u(this, c, O).call(this, t), i = new Set(this._collapsed);
  for (const n of e)
    s ? i.delete(n) : i.add(n);
  this._collapsed = i;
};
nt = function() {
  this._collapsed = /* @__PURE__ */ new Set();
};
it = function(t) {
  this._collapsePopoverOpen = t.newState === "open";
};
ee = async function() {
  if (!this._workflowName) return;
  const s = await (await this.getContext(ue)).open(this, Bt, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!s?.selection?.length) return;
  const i = s.selection[0];
  i && await u(this, c, $e).call(this, i);
};
ae = async function() {
  if (!this._workflowName) return;
  const e = (await this.getContext(ue)).open(this, ys, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._zoneTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const s = await e.onSubmit();
    if (s?.template) {
      const i = await Rt(this._workflowName, s.template, C(this, z));
      i && (this._zoneTemplate = i, await u(this, c, _e).call(this));
    }
  } catch {
  }
};
_e = async function() {
  const t = this._extraction?.source.mediaKey;
  if (!t)
    return u(this, c, ee).call(this);
  await u(this, c, $e).call(this, t);
};
$e = async function(t) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const s = await (await this.getContext(Ne)).getLatestToken(), [i, n] = await Promise.all([
        St(this._workflowName, t, s),
        Tt(this._workflowName, t, s)
      ]);
      if (i && (this._extraction = i), n) {
        this._transformResult = n;
        const a = await Le(this._workflowName, s);
        this._zoneDetection = a;
        const r = n.diagnostics;
        this._successMessage = `Content extracted — ${r.totalSections} sections (${r.bulletListSections} bullet, ${r.paragraphSections} paragraph, ${r.subHeadedSections} sub-headed)`, setTimeout(() => {
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
U = function(t) {
  return this._collapsed.has(t);
};
D = function(t) {
  const e = new Set(this._collapsed);
  e.has(t) ? e.delete(t) : e.add(t), this._collapsed = e;
};
at = function(t) {
  return this._transformResult ? this._transformResult.sections.find((s) => s.id === t)?.included ?? !0 : !0;
};
re = async function(t, e) {
  if (!this._workflowName) return;
  const s = await At(this._workflowName, t, e, C(this, z));
  s && (this._transformResult = s);
};
le = async function(t) {
  if (!this._config?.destination || !this._workflowName) return;
  const i = await (await this.getContext(ue)).open(this, $s, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!i?.selectedTargets?.length) return;
  const n = [...this._config.map?.mappings ?? []], a = n.findIndex((h) => h.source === t), r = {
    source: t,
    destinations: i.selectedTargets.map((h) => ({ target: h.target, blockKey: h.blockKey })),
    enabled: !0
  };
  a >= 0 ? n[a] = r : n.push(r);
  const o = { ...this._config.map, version: this._config.map?.version ?? "1.0", mappings: n };
  await Pt(this._workflowName, o, C(this, z)) && (this._config = { ...this._config, map: o });
};
K = function(t) {
  if (!this._config?.map?.mappings) return [];
  const e = [];
  for (const s of this._config.map.mappings)
    if (s.source === t && s.enabled)
      for (const i of s.destinations)
        e.push(i);
  return e;
};
rt = function(t) {
  if (!this._config?.destination) return t.target;
  if (t.blockKey && this._config.destination.blockGrids)
    for (const s of this._config.destination.blockGrids) {
      const i = s.blocks.find((n) => n.key === t.blockKey);
      if (i) {
        const n = i.properties?.find((a) => a.alias === t.target);
        return `${i.label} > ${n?.label || t.target}`;
      }
    }
  const e = this._config.destination.fields.find((s) => s.alias === t.target);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const s of this._config.destination.blockGrids)
      for (const i of s.blocks) {
        const n = i.properties?.find((a) => a.alias === t.target);
        if (n) return `${i.label} > ${n.label || n.alias}`;
      }
  return t.target;
};
lt = function(t) {
  const e = t.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(e) || /^\d+[\.\)]\s/.test(e) ? "list" : "paragraph";
};
oe = function(t) {
  const e = u(this, c, lt).call(this, t.text);
  return d`
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
ye = function(t, e, s, i) {
  const n = u(this, c, U).call(this, e), a = t.heading ? _s(t.heading.text) : i >= 0 ? `preamble-p${s}-z${i}` : `preamble-p${s}-unzoned`, r = u(this, c, at).call(this, a);
  if (!t.heading)
    return d`
				<div class="zone-section ${r ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => u(this, c, D).call(this, e)}>
						<span class="heading-text preamble-label">Content</span>
						<span class="header-spacer"></span>
						<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${r ? "Included" : "Excluded"}"
							?checked=${r}
							@click=${(l) => l.stopPropagation()}
							@change=${(l) => u(this, c, re).call(this, a, l.target.checked)}>
						</uui-toggle>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
					${r && !n ? d`
						${t.children.map((l) => u(this, c, oe).call(this, l))}
					` : w}
				</div>
			`;
  const o = t.heading;
  return d`
			<div class="zone-section ${r ? "" : "excluded"}">
				<div class="section-heading" @click=${() => u(this, c, D).call(this, e)}>
					<div class="heading-content">
						<div class="heading-text">${o.text}</div>
						<div class="element-meta">
							<span class="meta-badge font-size">${o.fontSize}pt</span>
							<span class="meta-badge font-name">${o.fontName}</span>
						</div>
					</div>
					<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${r ? "Included" : "Excluded"}"
						?checked=${r}
						@click=${(l) => l.stopPropagation()}
						@change=${(l) => u(this, c, re).call(this, a, l.target.checked)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${!n && r ? d`
					<div class="section-children">
						${t.children.map((l) => u(this, c, oe).call(this, l))}
					</div>
				` : w}
			</div>
		`;
};
ze = function(t) {
  const e = new Set(this._excludedAreas);
  e.has(t) ? e.delete(t) : e.add(t), this._excludedAreas = e;
};
ot = function(t, e, s) {
  const i = `area-p${e}-a${s}`, n = u(this, c, U).call(this, i), a = !this._excludedAreas.has(i), r = t.sections.length;
  return d`
			<div class="zone-area ${a ? "" : "area-excluded"}" style="border-left-color: ${t.color};">
				<div class="area-header" @click=${() => u(this, c, D).call(this, i)}>
					<span class="area-name">${t.name || `Area ${s + 1}`}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${a ? "Included" : "Excluded"}"
						?checked=${a}
						@click=${(o) => o.stopPropagation()}
						@change=${() => u(this, c, ze).call(this, i)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${n ? w : d`
					${t.sections.map(
    (o, l) => u(this, c, ye).call(this, o, `p${e}-a${s}-s${l}`, e, s)
  )}
				`}
			</div>
		`;
};
ct = function(t, e) {
  if (t.totalElements === 0) return w;
  const s = `area-p${e}-undefined`, i = u(this, c, U).call(this, s), n = !this._excludedAreas.has(s), a = t.sections.length;
  return d`
			<div class="zone-area undefined ${n ? "" : "area-excluded"}" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => u(this, c, D).call(this, s)}>
					<span class="area-name undefined-name">Undefined</span>
					<span class="header-spacer"></span>
					<span class="group-count">${a} section${a !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${n ? "Included" : "Excluded"}"
						?checked=${n}
						@click=${(r) => r.stopPropagation()}
						@change=${() => u(this, c, ze).call(this, s)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${i ? w : d`
					${t.sections.map(
    (r, o) => u(this, c, ye).call(this, r, `p${e}-undefined-s${o}`, e, -1)
  )}
				`}
			</div>
		`;
};
ut = function(t, e, s) {
  const i = `page-${t}`, n = u(this, c, U).call(this, i), a = s && s.totalElements > 0, r = e.length + (a ? 1 : 0), o = e.reduce((h, p) => h + p.sections.length, 0) + (s?.sections.length ?? 0), l = u(this, c, Ye).call(this, t);
  return d`
			<uui-box headline="Page ${t}" class="page-box ${l ? "" : "page-excluded"}">
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${o} section${o !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${l}
						@click=${(h) => h.stopPropagation()}
						@change=${() => u(this, c, et).call(this, t)}>
					</uui-toggle>
					<div class="collapse-trigger" @click=${() => u(this, c, D).call(this, i)}>
						<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
				</div>
				${n ? w : d`
					${e.map((h, p) => u(this, c, ot).call(this, h, t, p))}
					${a ? u(this, c, ct).call(this, s, t) : w}
				`}
			</uui-box>
		`;
};
pt = function() {
  return this._zoneDetection ? d`
			${this._zoneDetection.pages.map(
    (t) => u(this, c, ut).call(this, t.page, t.zones, t.unzonedContent)
  )}
		` : w;
};
ht = function() {
  return this._zoneDetection ? this._zoneDetection.pages.reduce((t, e) => t + e.zones.reduce((s, i) => s + i.sections.length, 0) + (e.unzonedContent?.sections.length ?? 0), 0) : 0;
};
dt = function() {
  return (this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0) === 0 ? w : d`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === "all"}
					@change=${() => u(this, c, Q).call(this, "all")} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === "custom"}
					@change=${() => u(this, c, Q).call(this, "custom")} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${u(this, c, tt)}
				@blur=${u(this, c, st)}
				@focus=${() => {
    this._pageMode === "all" && u(this, c, Q).call(this, "custom");
  }}
				?disabled=${this._pageMode === "all"} />
		`;
};
gt = function() {
  return d`
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
ft = function() {
  const t = this._zoneDetection !== null, e = this._extraction !== null;
  if (!t && !e) return w;
  const s = this._zoneDetection?.totalPages ?? (e ? this._extraction.source.totalPages : 0), i = t ? this._zoneDetection.pages.length : s, a = i < s ? `${i} of ${s}` : `${s}`, r = t ? this._zoneDetection.diagnostics.zonesDetected : 0, o = t ? u(this, c, ht).call(this) : 0, l = e ? this._extraction.source.fileName : "", h = e ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return d`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${l}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${h}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="default" label="Change PDF" @click=${u(this, c, ee)} ?disabled=${this._extracting}>
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
							${u(this, c, dt).call(this)}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${this._zoneTemplate ? this._zoneTemplate.zones.length : r}</span>
						<div class="box-buttons">
							${this._zoneTemplate ? d`<uui-button look="primary" color="positive" label="Edit Areas" @click=${u(this, c, ae)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : d`<uui-button look="primary" color="positive" label="Define Areas" @click=${u(this, c, ae)}>
									<uui-icon name="icon-grid"></uui-icon>
									Define Areas
								</uui-button>`}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Sections" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${o}</span>
					</div>
				</uui-box>
			</div>

			${t ? d`
				<div class="collapse-row">
					<uui-button
						look="outline"
						compact
						label="Collapse"
						popovertarget="collapse-level-popover">
						Collapse
						<uui-symbol-expand .open=${this._collapsePopoverOpen}></uui-symbol-expand>
					</uui-button>
					<uui-popover-container
						id="collapse-level-popover"
						placement="bottom-start"
						@toggle=${u(this, c, it)}>
						<umb-popover-layout>
							<uui-menu-item
								label="Expand All"
								@click=${() => u(this, c, nt).call(this)}>
								<uui-icon slot="icon" name="icon-navigation-down"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${u(this, c, O).call(this, "pages") ? "Expand" : "Collapse"} Pages"
								@click=${() => u(this, c, F).call(this, "pages")}>
								<uui-icon slot="icon" name="icon-document"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${u(this, c, O).call(this, "areas") ? "Expand" : "Collapse"} Areas"
								@click=${() => u(this, c, F).call(this, "areas")}>
								<uui-icon slot="icon" name="icon-grid"></uui-icon>
							</uui-menu-item>
							<uui-menu-item
								label="${u(this, c, O).call(this, "sections") ? "Expand" : "Collapse"} Sections"
								@click=${() => u(this, c, F).call(this, "sections")}>
								<uui-icon slot="icon" name="icon-thumbnail-list"></uui-icon>
							</uui-menu-item>
						</umb-popover-layout>
					</uui-popover-container>
				</div>
			` : w}
		`;
};
mt = function() {
  const t = this._zoneDetection !== null;
  return this._viewMode === "elements" ? t ? u(this, c, pt).call(this) : w : u(this, c, xt).call(this);
};
ce = function(t) {
  const e = u(this, c, K).call(this, t);
  return e.length === 0 ? d`<uui-button look="secondary" compact label="Map" @click=${() => u(this, c, le).call(this, t)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : d`${e.map(
    (s) => d`<span class="meta-badge mapped-target" @click=${() => u(this, c, le).call(this, t)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${u(this, c, rt).call(this, s)}
			</span>`
  )}`;
};
kt = function(t) {
  const e = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, s = `${t.id}.heading`, i = `${t.id}.content`, n = u(this, c, K).call(this, s).length > 0, a = u(this, c, K).call(this, i).length > 0, r = n || a, o = t.heading ?? "Content";
  return d`
			<uui-box headline=${o} class="transformed-section ${r ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${t.pattern}">${e[t.pattern] ?? t.pattern}</span>
					<span class="meta-badge">p${t.page}</span>
					${t.zoneColor ? d`<span class="area-color-swatch" style="background: ${t.zoneColor};"></span>` : w}
					<span class="meta-badge">${t.childCount} item${t.childCount !== 1 ? "s" : ""}</span>
					${t.heading ? u(this, c, ce).call(this, s) : w}
				</div>
				<div class="transformed-content" .innerHTML=${vs(t.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${u(this, c, ce).call(this, i)}
				</div>
			</uui-box>
		`;
};
xt = function() {
  if (!this._transformResult)
    return d`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Save to extract content and generate the transformed view.</p>
				</div>
			`;
  const t = this._transformResult.sections.filter((s) => s.included), e = this._transformResult.sections.length;
  return d`
			${t.map((s) => u(this, c, kt).call(this, s))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${e} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? d`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : w}
			</div>
		`;
};
bt = function() {
  return d`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${u(this, c, ee)} ?disabled=${this._extracting}>
					${this._extracting ? d`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
b.styles = [
  Dt,
  Et`
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
v([
  $()
], b.prototype, "_extraction", 2);
v([
  $()
], b.prototype, "_zoneDetection", 2);
v([
  $()
], b.prototype, "_config", 2);
v([
  $()
], b.prototype, "_workflowName", 2);
v([
  $()
], b.prototype, "_loading", 2);
v([
  $()
], b.prototype, "_extracting", 2);
v([
  $()
], b.prototype, "_error", 2);
v([
  $()
], b.prototype, "_successMessage", 2);
v([
  $()
], b.prototype, "_collapsed", 2);
v([
  $()
], b.prototype, "_transformResult", 2);
v([
  $()
], b.prototype, "_viewMode", 2);
v([
  $()
], b.prototype, "_sourceConfig", 2);
v([
  $()
], b.prototype, "_pageMode", 2);
v([
  $()
], b.prototype, "_pageInputValue", 2);
v([
  $()
], b.prototype, "_collapsePopoverOpen", 2);
v([
  $()
], b.prototype, "_excludedAreas", 2);
v([
  $()
], b.prototype, "_zoneTemplate", 2);
b = v([
  Mt("up-doc-workflow-source-view")
], b);
const Ls = b;
export {
  b as UpDocWorkflowSourceViewElement,
  Ls as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-KQCA9xXf.js.map
