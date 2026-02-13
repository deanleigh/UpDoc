import { d as mt, g as Ie, b as xt, h as bt, i as wt, j as _t, s as vt, k as $t, l as yt, m as zt, n as St, u as Rt } from "./workflow.service-T0TEyrPt.js";
import { UmbModalToken as Ee, UMB_MODAL_MANAGER_CONTEXT as oe } from "@umbraco-cms/backoffice/modal";
import { html as d, nothing as w, css as Tt, state as $, customElement as Ct } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as At } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Pt } from "@umbraco-cms/backoffice/style";
import { UMB_AUTH_CONTEXT as De } from "@umbraco-cms/backoffice/auth";
import { UMB_WORKSPACE_CONTEXT as Mt } from "@umbraco-cms/backoffice/workspace";
import { UMB_MEDIA_PICKER_MODAL as It } from "@umbraco-cms/backoffice/media";
function ce() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var M = ce();
function Le(t) {
  M = t;
}
var q = { exec: () => null };
function g(t, e = "") {
  let s = typeof t == "string" ? t : t.source, n = { replace: (i, a) => {
    let r = typeof a == "string" ? a : a.source;
    return r = r.replace(y.caret, "$1"), s = s.replace(i, r), n;
  }, getRegex: () => new RegExp(s, e) };
  return n;
}
var Et = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), y = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, Dt = /^(?:[ \t]*(?:\n|$))+/, Lt = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Bt = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, O = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Nt = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ue = /(?:[*+-]|\d{1,9}[.)])/, Be = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ne = g(Be).replace(/bull/g, ue).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Zt = g(Be).replace(/bull/g, ue).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), pe = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, qt = /^[^\n]+/, he = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Ot = g(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", he).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ht = g(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ue).getRegex(), W = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", de = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Ut = g("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", de).replace("tag", W).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Ze = g(pe).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", W).getRegex(), Vt = g(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ze).getRegex(), ge = { blockquote: Vt, code: Lt, def: Ot, fences: Bt, heading: Nt, hr: O, html: Ut, lheading: Ne, list: Ht, newline: Dt, paragraph: Ze, table: q, text: qt }, Se = g("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", W).getRegex(), Qt = { ...ge, lheading: Zt, table: Se, paragraph: g(pe).replace("hr", O).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Se).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", W).getRegex() }, Gt = { ...ge, html: g(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", de).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: q, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: g(pe).replace("hr", O).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ne).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Ft = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, jt = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, qe = /^( {2,}|\\)\n(?!\s*$)/, Wt = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, K = /[\p{P}\p{S}]/u, fe = /[\s\p{P}\p{S}]/u, Oe = /[^\s\p{P}\p{S}]/u, Kt = g(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, fe).getRegex(), He = /(?!~)[\p{P}\p{S}]/u, Xt = /(?!~)[\s\p{P}\p{S}]/u, Jt = /(?:[^\s\p{P}\p{S}]|~)/u, Yt = g(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Et ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Ue = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, es = g(Ue, "u").replace(/punct/g, K).getRegex(), ts = g(Ue, "u").replace(/punct/g, He).getRegex(), Ve = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", ss = g(Ve, "gu").replace(/notPunctSpace/g, Oe).replace(/punctSpace/g, fe).replace(/punct/g, K).getRegex(), is = g(Ve, "gu").replace(/notPunctSpace/g, Jt).replace(/punctSpace/g, Xt).replace(/punct/g, He).getRegex(), ns = g("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Oe).replace(/punctSpace/g, fe).replace(/punct/g, K).getRegex(), as = g(/\\(punct)/, "gu").replace(/punct/g, K).getRegex(), rs = g(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), ls = g(de).replace("(?:-->|$)", "-->").getRegex(), os = g("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", ls).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, cs = g(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Qe = g(/^!?\[(label)\]\[(ref)\]/).replace("label", Q).replace("ref", he).getRegex(), Ge = g(/^!?\[(ref)\](?:\[\])?/).replace("ref", he).getRegex(), us = g("reflink|nolink(?!\\()", "g").replace("reflink", Qe).replace("nolink", Ge).getRegex(), Re = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, ke = { _backpedal: q, anyPunctuation: as, autolink: rs, blockSkip: Yt, br: qe, code: jt, del: q, emStrongLDelim: es, emStrongRDelimAst: ss, emStrongRDelimUnd: ns, escape: Ft, link: cs, nolink: Ge, punctuation: Kt, reflink: Qe, reflinkSearch: us, tag: os, text: Wt, url: q }, ps = { ...ke, link: g(/^!?\[(label)\]\((.*?)\)/).replace("label", Q).getRegex(), reflink: g(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Q).getRegex() }, ee = { ...ke, emStrongRDelimAst: is, emStrongLDelim: ts, url: g(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Re).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: g(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Re).getRegex() }, hs = { ...ee, br: g(qe).replace("{2,}", "*").getRegex(), text: g(ee.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, U = { normal: ge, gfm: Qt, pedantic: Gt }, B = { normal: ke, gfm: ee, breaks: hs, pedantic: ps }, ds = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Te = (t) => ds[t];
function A(t, e) {
  if (e) {
    if (y.escapeTest.test(t)) return t.replace(y.escapeReplace, Te);
  } else if (y.escapeTestNoEncode.test(t)) return t.replace(y.escapeReplaceNoEncode, Te);
  return t;
}
function Ce(t) {
  try {
    t = encodeURI(t).replace(y.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Ae(t, e) {
  let s = t.replace(y.findPipe, (a, r, o) => {
    let l = !1, h = r;
    for (; --h >= 0 && o[h] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), n = s.split(y.splitPipe), i = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; i < n.length; i++) n[i] = n[i].trim().replace(y.slashPipe, "|");
  return n;
}
function N(t, e, s) {
  let n = t.length;
  if (n === 0) return "";
  let i = 0;
  for (; i < n && t.charAt(n - i - 1) === e; )
    i++;
  return t.slice(0, n - i);
}
function gs(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let s = 0;
  for (let n = 0; n < t.length; n++) if (t[n] === "\\") n++;
  else if (t[n] === e[0]) s++;
  else if (t[n] === e[1] && (s--, s < 0)) return n;
  return s > 0 ? -2 : -1;
}
function Pe(t, e, s, n, i) {
  let a = e.href, r = e.title || null, o = t[1].replace(i.other.outputLinkReplace, "$1");
  n.state.inLink = !0;
  let l = { type: t[0].charAt(0) === "!" ? "image" : "link", raw: s, href: a, title: r, text: o, tokens: n.inlineTokens(o) };
  return n.state.inLink = !1, l;
}
function fs(t, e, s) {
  let n = t.match(s.other.indentCodeCompensation);
  if (n === null) return e;
  let i = n[1];
  return e.split(`
`).map((a) => {
    let r = a.match(s.other.beginningSpace);
    if (r === null) return a;
    let [o] = r;
    return o.length >= i.length ? a.slice(i.length) : a;
  }).join(`
`);
}
var G = class {
  options;
  rules;
  lexer;
  constructor(t) {
    this.options = t || M;
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
      let s = e[0], n = fs(s, e[3] || "", this.rules);
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
`), n = "", i = "", a = [];
      for (; s.length > 0; ) {
        let r = !1, o = [], l;
        for (l = 0; l < s.length; l++) if (this.rules.other.blockquoteStart.test(s[l])) o.push(s[l]), r = !0;
        else if (!r) o.push(s[l]);
        else break;
        s = s.slice(l);
        let h = o.join(`
`), p = h.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        n = n ? `${n}
${h}` : h, i = i ? `${i}
${p}` : p;
        let m = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(p, a, !0), this.lexer.state.top = m, s.length === 0) break;
        let f = a.at(-1);
        if (f?.type === "code") break;
        if (f?.type === "blockquote") {
          let v = f, x = v.raw + `
` + s.join(`
`), S = this.blockquote(x);
          a[a.length - 1] = S, n = n.substring(0, n.length - v.raw.length) + S.raw, i = i.substring(0, i.length - v.text.length) + S.text;
          break;
        } else if (f?.type === "list") {
          let v = f, x = v.raw + `
` + s.join(`
`), S = this.list(x);
          a[a.length - 1] = S, n = n.substring(0, n.length - f.raw.length) + S.raw, i = i.substring(0, i.length - v.raw.length) + S.raw, s = x.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: n, tokens: a, text: i };
    }
  }
  list(t) {
    let e = this.rules.block.list.exec(t);
    if (e) {
      let s = e[1].trim(), n = s.length > 1, i = { type: "list", raw: "", ordered: n, start: n ? +s.slice(0, -1) : "", loose: !1, items: [] };
      s = n ? `\\d{1,9}\\${s.slice(-1)}` : `\\${s}`, this.options.pedantic && (s = n ? s : "[*+-]");
      let a = this.rules.other.listItemRegex(s), r = !1;
      for (; t; ) {
        let l = !1, h = "", p = "";
        if (!(e = a.exec(t)) || this.rules.block.hr.test(t)) break;
        h = e[0], t = t.substring(h.length);
        let m = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (S) => " ".repeat(3 * S.length)), f = t.split(`
`, 1)[0], v = !m.trim(), x = 0;
        if (this.options.pedantic ? (x = 2, p = m.trimStart()) : v ? x = e[1].length + 1 : (x = e[2].search(this.rules.other.nonSpaceChar), x = x > 4 ? 1 : x, p = m.slice(x), x += e[1].length), v && this.rules.other.blankLine.test(f) && (h += f + `
`, t = t.substring(f.length + 1), l = !0), !l) {
          let S = this.rules.other.nextBulletRegex(x), $e = this.rules.other.hrRegex(x), ye = this.rules.other.fencesBeginRegex(x), ze = this.rules.other.headingBeginRegex(x), kt = this.rules.other.htmlBeginRegex(x);
          for (; t; ) {
            let Y = t.split(`
`, 1)[0], L;
            if (f = Y, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), L = f) : L = f.replace(this.rules.other.tabCharGlobal, "    "), ye.test(f) || ze.test(f) || kt.test(f) || S.test(f) || $e.test(f)) break;
            if (L.search(this.rules.other.nonSpaceChar) >= x || !f.trim()) p += `
` + L.slice(x);
            else {
              if (v || m.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ye.test(m) || ze.test(m) || $e.test(m)) break;
              p += `
` + f;
            }
            !v && !f.trim() && (v = !0), h += Y + `
`, t = t.substring(Y.length + 1), m = L.slice(x);
          }
        }
        i.loose || (r ? i.loose = !0 : this.rules.other.doubleBlankLine.test(h) && (r = !0)), i.items.push({ type: "list_item", raw: h, task: !!this.options.gfm && this.rules.other.listIsTask.test(p), loose: !1, text: p, tokens: [] }), i.raw += h;
      }
      let o = i.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      i.raw = i.raw.trimEnd();
      for (let l of i.items) {
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
            l.checked = p.checked, i.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = p.raw + l.tokens[0].raw, l.tokens[0].text = p.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(p)) : l.tokens.unshift({ type: "paragraph", raw: p.raw, text: p.raw, tokens: [p] }) : l.tokens.unshift(p);
          }
        }
        if (!i.loose) {
          let h = l.tokens.filter((m) => m.type === "space"), p = h.length > 0 && h.some((m) => this.rules.other.anyLine.test(m.raw));
          i.loose = p;
        }
      }
      if (i.loose) for (let l of i.items) {
        l.loose = !0;
        for (let h of l.tokens) h.type === "text" && (h.type = "paragraph");
      }
      return i;
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
    let e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let s = Ae(e[1]), n = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = e[3]?.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (s.length === n.length) {
      for (let r of n) this.rules.other.tableAlignRight.test(r) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(r) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(r) ? a.align.push("left") : a.align.push(null);
      for (let r = 0; r < s.length; r++) a.header.push({ text: s[r], tokens: this.lexer.inline(s[r]), header: !0, align: a.align[r] });
      for (let r of i) a.rows.push(Ae(r, a.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: !1, align: a.align[l] })));
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
        let a = gs(e[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let r = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, r).trim(), e[3] = "";
        }
      }
      let n = e[2], i = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(n);
        a && (n = a[1], i = a[3]);
      } else i = e[3] ? e[3].slice(1, -1) : "";
      return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? n = n.slice(1) : n = n.slice(1, -1)), Pe(e, { href: n && n.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
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
      return Pe(s, i, s[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, s = "") {
    let n = this.rules.inline.emStrongLDelim.exec(t);
    if (!(!n || n[3] && s.match(this.rules.other.unicodeAlphaNumeric)) && (!(n[1] || n[2]) || !s || this.rules.inline.punctuation.exec(s))) {
      let i = [...n[0]].length - 1, a, r, o = i, l = 0, h = n[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (h.lastIndex = 0, e = e.slice(-1 * t.length + i); (n = h.exec(e)) != null; ) {
        if (a = n[1] || n[2] || n[3] || n[4] || n[5] || n[6], !a) continue;
        if (r = [...a].length, n[3] || n[4]) {
          o += r;
          continue;
        } else if ((n[5] || n[6]) && i % 3 && !((i + r) % 3)) {
          l += r;
          continue;
        }
        if (o -= r, o > 0) continue;
        r = Math.min(r, r + o + l);
        let p = [...n[0]][0].length, m = t.slice(0, i + n.index + p + r);
        if (Math.min(i, r) % 2) {
          let v = m.slice(1, -1);
          return { type: "em", raw: m, text: v, tokens: this.lexer.inlineTokens(v) };
        }
        let f = m.slice(2, -2);
        return { type: "strong", raw: m, text: f, tokens: this.lexer.inlineTokens(f) };
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
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let s, n;
      if (e[2] === "@") s = e[0], n = "mailto:" + s;
      else {
        let i;
        do
          i = e[0], e[0] = this.rules.inline._backpedal.exec(e[0])?.[0] ?? "";
        while (i !== e[0]);
        s = e[0], e[1] === "www." ? n = "http://" + e[0] : n = e[0];
      }
      return { type: "link", raw: e[0], text: s, href: n, tokens: [{ type: "text", raw: s, text: s }] };
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
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || M, this.options.tokenizer = this.options.tokenizer || new G(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let s = { other: y, block: U.normal, inline: B.normal };
    this.options.pedantic ? (s.block = U.pedantic, s.inline = B.pedantic) : this.options.gfm && (s.block = U.gfm, this.options.breaks ? s.inline = B.breaks : s.inline = B.gfm), this.tokenizer.rules = s;
  }
  static get rules() {
    return { block: U, inline: B };
  }
  static lex(e, s) {
    return new te(s).lex(e);
  }
  static lexInline(e, s) {
    return new te(s).inlineTokens(e);
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
    for (this.options.pedantic && (e = e.replace(y.tabCharGlobal, "    ").replace(y.spaceLine, "")); e; ) {
      let i;
      if (this.options.extensions?.block?.some((r) => (i = r.call({ lexer: this }, e, s)) ? (e = e.substring(i.raw.length), s.push(i), !0) : !1)) continue;
      if (i = this.tokenizer.space(e)) {
        e = e.substring(i.raw.length);
        let r = s.at(-1);
        i.raw.length === 1 && r !== void 0 ? r.raw += `
` : s.push(i);
        continue;
      }
      if (i = this.tokenizer.code(e)) {
        e = e.substring(i.raw.length);
        let r = s.at(-1);
        r?.type === "paragraph" || r?.type === "text" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + i.raw, r.text += `
` + i.text, this.inlineQueue.at(-1).src = r.text) : s.push(i);
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
        let r = s.at(-1);
        r?.type === "paragraph" || r?.type === "text" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + i.raw, r.text += `
` + i.raw, this.inlineQueue.at(-1).src = r.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = { href: i.href, title: i.title }, s.push(i));
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
      let a = e;
      if (this.options.extensions?.startBlock) {
        let r = 1 / 0, o = e.slice(1), l;
        this.options.extensions.startBlock.forEach((h) => {
          l = h.call({ lexer: this }, o), typeof l == "number" && l >= 0 && (r = Math.min(r, l));
        }), r < 1 / 0 && r >= 0 && (a = e.substring(0, r + 1));
      }
      if (this.state.top && (i = this.tokenizer.paragraph(a))) {
        let r = s.at(-1);
        n && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + i.raw, r.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : s.push(i), n = a.length !== e.length, e = e.substring(i.raw.length);
        continue;
      }
      if (i = this.tokenizer.text(e)) {
        e = e.substring(i.raw.length);
        let r = s.at(-1);
        r?.type === "text" ? (r.raw += (r.raw.endsWith(`
`) ? "" : `
`) + i.raw, r.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : s.push(i);
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
    let n = e, i = null;
    if (this.tokens.links) {
      let l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) l.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, i.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let a;
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) a = i[2] ? i[2].length : 0, n = n.slice(0, i.index + a) + "[" + "a".repeat(i[0].length - a - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
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
      if (l = this.tokenizer.emStrong(e, n, o)) {
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
        let p = 1 / 0, m = e.slice(1), f;
        this.options.extensions.startInline.forEach((v) => {
          f = v.call({ lexer: this }, m), typeof f == "number" && f >= 0 && (p = Math.min(p, f));
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
}, F = class {
  options;
  parser;
  constructor(t) {
    this.options = t || M;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: s }) {
    let n = (e || "").match(y.notSpaceStart)?.[0], i = t.replace(y.endingNewline, "") + `
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
    for (let r = 0; r < t.items.length; r++) {
      let o = t.items[r];
      n += this.listitem(o);
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
      for (let r = 0; r < a.length; r++) s += this.tablecell(a[r]);
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
    let n = this.parser.parseInline(s), i = Ce(t);
    if (i === null) return n;
    t = i;
    let a = '<a href="' + t + '"';
    return e && (a += ' title="' + A(e) + '"'), a += ">" + n + "</a>", a;
  }
  image({ href: t, title: e, text: s, tokens: n }) {
    n && (s = this.parser.parseInline(n, this.parser.textRenderer));
    let i = Ce(t);
    if (i === null) return A(s);
    t = i;
    let a = `<img src="${t}" alt="${s}"`;
    return e && (a += ` title="${A(e)}"`), a += ">", a;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : A(t.text);
  }
}, me = class {
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
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || M, this.options.renderer = this.options.renderer || new F(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new me();
  }
  static parse(e, s) {
    return new se(s).parse(e);
  }
  static parseInline(e, s) {
    return new se(s).parseInline(e);
  }
  parse(e) {
    let s = "";
    for (let n = 0; n < e.length; n++) {
      let i = e[n];
      if (this.options.extensions?.renderers?.[i.type]) {
        let r = i, o = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (o !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(r.type)) {
          s += o || "";
          continue;
        }
      }
      let a = i;
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
    let n = "";
    for (let i = 0; i < e.length; i++) {
      let a = e[i];
      if (this.options.extensions?.renderers?.[a.type]) {
        let o = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          n += o || "";
          continue;
        }
      }
      let r = a;
      switch (r.type) {
        case "escape": {
          n += s.text(r);
          break;
        }
        case "html": {
          n += s.html(r);
          break;
        }
        case "link": {
          n += s.link(r);
          break;
        }
        case "image": {
          n += s.image(r);
          break;
        }
        case "checkbox": {
          n += s.checkbox(r);
          break;
        }
        case "strong": {
          n += s.strong(r);
          break;
        }
        case "em": {
          n += s.em(r);
          break;
        }
        case "codespan": {
          n += s.codespan(r);
          break;
        }
        case "br": {
          n += s.br(r);
          break;
        }
        case "del": {
          n += s.del(r);
          break;
        }
        case "text": {
          n += s.text(r);
          break;
        }
        default: {
          let o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return n;
  }
}, Z = class {
  options;
  block;
  constructor(t) {
    this.options = t || M;
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
    return this.block ? R.lex : R.lexInline;
  }
  provideParser() {
    return this.block ? T.parse : T.parseInline;
  }
}, ks = class {
  defaults = ce();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = T;
  Renderer = F;
  TextRenderer = me;
  Lexer = R;
  Tokenizer = G;
  Hooks = Z;
  constructor(...t) {
    this.use(...t);
  }
  walkTokens(t, e) {
    let s = [];
    for (let n of t) switch (s = s.concat(e.call(this, n)), n.type) {
      case "table": {
        let i = n;
        for (let a of i.header) s = s.concat(this.walkTokens(a.tokens, e));
        for (let a of i.rows) for (let r of a) s = s.concat(this.walkTokens(r.tokens, e));
        break;
      }
      case "list": {
        let i = n;
        s = s.concat(this.walkTokens(i.items, e));
        break;
      }
      default: {
        let i = n;
        this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((a) => {
          let r = i[a].flat(1 / 0);
          s = s.concat(this.walkTokens(r, e));
        }) : i.tokens && (s = s.concat(this.walkTokens(i.tokens, e)));
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
          a ? e.renderers[i.name] = function(...r) {
            let o = i.renderer.apply(this, r);
            return o === !1 && (o = a.apply(this, r)), o;
          } : e.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = e[i.level];
          a ? a.unshift(i.tokenizer) : e[i.level] = [i.tokenizer], i.start && (i.level === "block" ? e.startBlock ? e.startBlock.push(i.start) : e.startBlock = [i.start] : i.level === "inline" && (e.startInline ? e.startInline.push(i.start) : e.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (e.childTokens[i.name] = i.childTokens);
      }), n.extensions = e), s.renderer) {
        let i = this.defaults.renderer || new F(this.defaults);
        for (let a in s.renderer) {
          if (!(a in i)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let r = a, o = s.renderer[r], l = i[r];
          i[r] = (...h) => {
            let p = o.apply(i, h);
            return p === !1 && (p = l.apply(i, h)), p || "";
          };
        }
        n.renderer = i;
      }
      if (s.tokenizer) {
        let i = this.defaults.tokenizer || new G(this.defaults);
        for (let a in s.tokenizer) {
          if (!(a in i)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let r = a, o = s.tokenizer[r], l = i[r];
          i[r] = (...h) => {
            let p = o.apply(i, h);
            return p === !1 && (p = l.apply(i, h)), p;
          };
        }
        n.tokenizer = i;
      }
      if (s.hooks) {
        let i = this.defaults.hooks || new Z();
        for (let a in s.hooks) {
          if (!(a in i)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let r = a, o = s.hooks[r], l = i[r];
          Z.passThroughHooks.has(a) ? i[r] = (h) => {
            if (this.defaults.async && Z.passThroughHooksRespectAsync.has(a)) return (async () => {
              let m = await o.call(i, h);
              return l.call(i, m);
            })();
            let p = o.call(i, h);
            return l.call(i, p);
          } : i[r] = (...h) => {
            if (this.defaults.async) return (async () => {
              let m = await o.apply(i, h);
              return m === !1 && (m = await l.apply(i, h)), m;
            })();
            let p = o.apply(i, h);
            return p === !1 && (p = l.apply(i, h)), p;
          };
        }
        n.hooks = i;
      }
      if (s.walkTokens) {
        let i = this.defaults.walkTokens, a = s.walkTokens;
        n.walkTokens = function(r) {
          let o = [];
          return o.push(a.call(this, r)), i && (o = o.concat(i.call(this, r))), o;
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
      let n = { ...s }, i = { ...this.defaults, ...n }, a = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && n.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (i.hooks && (i.hooks.options = i, i.hooks.block = t), i.async) return (async () => {
        let r = i.hooks ? await i.hooks.preprocess(e) : e, o = await (i.hooks ? await i.hooks.provideLexer() : t ? R.lex : R.lexInline)(r, i), l = i.hooks ? await i.hooks.processAllTokens(o) : o;
        i.walkTokens && await Promise.all(this.walkTokens(l, i.walkTokens));
        let h = await (i.hooks ? await i.hooks.provideParser() : t ? T.parse : T.parseInline)(l, i);
        return i.hooks ? await i.hooks.postprocess(h) : h;
      })().catch(a);
      try {
        i.hooks && (e = i.hooks.preprocess(e));
        let r = (i.hooks ? i.hooks.provideLexer() : t ? R.lex : R.lexInline)(e, i);
        i.hooks && (r = i.hooks.processAllTokens(r)), i.walkTokens && this.walkTokens(r, i.walkTokens);
        let o = (i.hooks ? i.hooks.provideParser() : t ? T.parse : T.parseInline)(r, i);
        return i.hooks && (o = i.hooks.postprocess(o)), o;
      } catch (r) {
        return a(r);
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
}, P = new ks();
function k(t, e) {
  return P.parse(t, e);
}
k.options = k.setOptions = function(t) {
  return P.setOptions(t), k.defaults = P.defaults, Le(k.defaults), k;
};
k.getDefaults = ce;
k.defaults = M;
k.use = function(...t) {
  return P.use(...t), k.defaults = P.defaults, Le(k.defaults), k;
};
k.walkTokens = function(t, e) {
  return P.walkTokens(t, e);
};
k.parseInline = P.parseInline;
k.Parser = T;
k.parser = T.parse;
k.Renderer = F;
k.TextRenderer = me;
k.Lexer = R;
k.lexer = R.lex;
k.Tokenizer = G;
k.Hooks = Z;
k.parse = k;
k.options;
k.setOptions;
k.use;
k.walkTokens;
k.parseInline;
T.parse;
R.lex;
function ms(t) {
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
function xs(t) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const bs = new Ee("UpDoc.DestinationPickerModal", {
  modal: {
    type: "sidebar",
    size: "small"
  }
}), ws = new Ee(
  "UpDoc.ZoneEditorModal",
  {
    modal: {
      type: "sidebar",
      size: "full"
    }
  }
);
var _s = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, Fe = (t) => {
  throw TypeError(t);
}, _ = (t, e, s, n) => {
  for (var i = n > 1 ? void 0 : n ? vs(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (i = (n ? r(e, s, i) : r(i)) || i);
  return n && i && _s(e, s, i), i;
}, xe = (t, e, s) => e.has(t) || Fe("Cannot " + s), C = (t, e, s) => (xe(t, e, "read from private field"), s ? s.call(t) : e.get(t)), Me = (t, e, s) => e.has(t) ? Fe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), $s = (t, e, s, n) => (xe(t, e, "write to private field"), e.set(t, s), s), u = (t, e, s) => (xe(t, e, "access private method"), s), z, c, je, E, I, We, Ke, Xe, V, Je, Ye, X, et, J, ie, be, we, H, D, tt, ne, ae, j, st, it, re, _e, ve, nt, at, rt, lt, ot, ct, ut, pt, ht, le, dt, gt, ft;
let b = class extends At {
  constructor() {
    super(...arguments), Me(this, c), this._extraction = null, this._zoneDetection = null, this._config = null, this._workflowName = null, this._loading = !0, this._extracting = !1, this._error = null, this._successMessage = null, this._collapsed = /* @__PURE__ */ new Set(), this._transformResult = null, this._viewMode = "elements", this._sourceConfig = null, this._pageMode = "all", this._pageInputValue = "", this._allCollapsed = !1, this._excludedAreas = /* @__PURE__ */ new Set(), this._zoneTemplate = null, Me(this, z, "");
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(Mt, (t) => {
      t && this.observe(t.unique, (e) => {
        e && (this._workflowName = decodeURIComponent(e), u(this, c, je).call(this));
      });
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
				${t ? u(this, c, ut).call(this) : w}
				${t && this._viewMode === "elements" ? u(this, c, pt).call(this) : w}
				${this._successMessage ? d`<div class="success-banner"><uui-icon name="icon-check"></uui-icon> ${this._successMessage}</div>` : w}
				${t ? u(this, c, ht).call(this) : u(this, c, ft).call(this)}
			</umb-body-layout>
		`;
  }
};
z = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
je = async function() {
  if (this._workflowName) {
    this._loading = !0, this._error = null;
    try {
      const t = await this.getContext(De);
      $s(this, z, await t.getLatestToken());
      const [e, s, n, i, a, r] = await Promise.all([
        mt(this._workflowName, C(this, z)),
        Ie(this._workflowName, C(this, z)),
        xt(this._workflowName, C(this, z)),
        bt(this._workflowName, C(this, z)),
        wt(this._workflowName, C(this, z)),
        _t(this._workflowName, C(this, z))
      ]);
      this._extraction = e, this._zoneDetection = s, this._config = n, this._transformResult = i, this._sourceConfig = a, this._zoneTemplate = r, a?.pages && Array.isArray(a.pages) && a.pages.length > 0 ? (this._pageMode = "custom", this._pageInputValue = u(this, c, I).call(this, a.pages)) : (this._pageMode = "all", this._pageInputValue = "");
    } catch (t) {
      this._error = t instanceof Error ? t.message : "Failed to load data", console.error("Failed to load source data:", t);
    } finally {
      this._loading = !1;
    }
  }
};
E = function(t) {
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
I = function(t) {
  if (!t.length) return "";
  const e = [...t].sort((a, r) => a - r), s = [];
  let n = e[0], i = e[0];
  for (let a = 1; a < e.length; a++)
    e[a] === i + 1 || (s.push(n === i ? `${n}` : `${n}-${i}`), n = e[a]), i = e[a];
  return s.push(n === i ? `${n}` : `${n}-${i}`), s.join(", ");
};
We = function() {
  if (this._pageMode === "all") return null;
  const t = u(this, c, E).call(this, this._pageInputValue);
  return t.length > 0 ? t : null;
};
Ke = function(t) {
  if (this._pageMode === "all") return !0;
  const e = u(this, c, E).call(this, this._pageInputValue);
  return e.length === 0 || e.includes(t);
};
Xe = function(t) {
  const e = this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0;
  if (e !== 0) {
    if (this._pageMode === "all") {
      const n = Array.from({ length: e }, (i, a) => a + 1).filter((i) => i !== t);
      this._pageMode = "custom", this._pageInputValue = u(this, c, I).call(this, n);
    } else {
      const s = u(this, c, E).call(this, this._pageInputValue);
      if (s.includes(t)) {
        const n = s.filter((i) => i !== t);
        this._pageInputValue = u(this, c, I).call(this, n), n.length === 0 && (this._pageMode = "all", this._pageInputValue = "");
      } else {
        const n = [...s, t].sort((i, a) => i - a);
        this._pageInputValue = u(this, c, I).call(this, n);
      }
      u(this, c, E).call(this, this._pageInputValue).length === e && (this._pageMode = "all", this._pageInputValue = "");
    }
    u(this, c, X).call(this);
  }
};
V = async function(t) {
  this._pageMode = t, t === "all" && (this._pageInputValue = ""), await u(this, c, X).call(this);
};
Je = async function(t) {
  const e = t.target;
  this._pageInputValue = e.value;
};
Ye = async function() {
  const t = u(this, c, E).call(this, this._pageInputValue);
  t.length > 0 ? (this._pageInputValue = u(this, c, I).call(this, t), this._pageMode = "custom") : (this._pageMode = "all", this._pageInputValue = ""), await u(this, c, X).call(this);
};
X = async function() {
  if (!this._workflowName) return;
  const t = u(this, c, We).call(this);
  await zt(this._workflowName, t, C(this, z));
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
J = async function() {
  if (!this._workflowName) return;
  const s = await (await this.getContext(oe)).open(this, It, {
    data: {
      multiple: !1
    }
  }).onSubmit().catch(() => null);
  if (!s?.selection?.length) return;
  const n = s.selection[0];
  n && await u(this, c, we).call(this, n);
};
ie = async function() {
  if (!this._workflowName) return;
  const e = (await this.getContext(oe)).open(this, ws, {
    data: {
      workflowName: this._workflowName,
      existingTemplate: this._zoneTemplate,
      selectedPages: this._sourceConfig?.pages && Array.isArray(this._sourceConfig.pages) ? this._sourceConfig.pages : null
    }
  });
  try {
    const s = await e.onSubmit();
    if (s?.template) {
      const n = await vt(this._workflowName, s.template, C(this, z));
      n && (this._zoneTemplate = n, await u(this, c, be).call(this));
    }
  } catch {
  }
};
be = async function() {
  const t = this._extraction?.source.mediaKey;
  if (!t)
    return u(this, c, J).call(this);
  await u(this, c, we).call(this, t);
};
we = async function(t) {
  if (this._workflowName) {
    this._extracting = !0, this._error = null;
    try {
      const s = await (await this.getContext(De)).getLatestToken(), [n, i] = await Promise.all([
        $t(this._workflowName, t, s),
        yt(this._workflowName, t, s)
      ]);
      if (n && (this._extraction = n), i) {
        this._transformResult = i;
        const a = await Ie(this._workflowName, s);
        this._zoneDetection = a;
        const r = i.diagnostics;
        this._successMessage = `Content extracted — ${r.totalSections} sections (${r.bulletListSections} bullet, ${r.paragraphSections} paragraph, ${r.subHeadedSections} sub-headed)`, setTimeout(() => {
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
H = function(t) {
  return this._collapsed.has(t);
};
D = function(t) {
  const e = new Set(this._collapsed);
  e.has(t) ? e.delete(t) : e.add(t), this._collapsed = e;
};
tt = function(t) {
  return this._transformResult ? this._transformResult.sections.find((s) => s.id === t)?.included ?? !0 : !0;
};
ne = async function(t, e) {
  if (!this._workflowName) return;
  const s = await Rt(this._workflowName, t, e, C(this, z));
  s && (this._transformResult = s);
};
ae = async function(t) {
  if (!this._config?.destination || !this._workflowName) return;
  const n = await (await this.getContext(oe)).open(this, bs, {
    data: { destination: this._config.destination }
  }).onSubmit().catch(() => null);
  if (!n?.selectedTargets?.length) return;
  const i = [...this._config.map?.mappings ?? []], a = i.findIndex((h) => h.source === t), r = {
    source: t,
    destinations: n.selectedTargets.map((h) => ({ target: h.target, blockKey: h.blockKey })),
    enabled: !0
  };
  a >= 0 ? i[a] = r : i.push(r);
  const o = { ...this._config.map, version: this._config.map?.version ?? "1.0", mappings: i };
  await St(this._workflowName, o, C(this, z)) && (this._config = { ...this._config, map: o });
};
j = function(t) {
  if (!this._config?.map?.mappings) return [];
  const e = [];
  for (const s of this._config.map.mappings)
    if (s.source === t && s.enabled)
      for (const n of s.destinations)
        e.push(n);
  return e;
};
st = function(t) {
  if (!this._config?.destination) return t.target;
  if (t.blockKey && this._config.destination.blockGrids)
    for (const s of this._config.destination.blockGrids) {
      const n = s.blocks.find((i) => i.key === t.blockKey);
      if (n) {
        const i = n.properties?.find((a) => a.alias === t.target);
        return `${n.label} > ${i?.label || t.target}`;
      }
    }
  const e = this._config.destination.fields.find((s) => s.alias === t.target);
  if (e) return e.label;
  if (this._config.destination.blockGrids)
    for (const s of this._config.destination.blockGrids)
      for (const n of s.blocks) {
        const i = n.properties?.find((a) => a.alias === t.target);
        if (i) return `${n.label} > ${i.label || i.alias}`;
      }
  return t.target;
};
it = function(t) {
  const e = t.trimStart();
  return /^[•\-\*▪▸▶►●○◦‣⁃]/.test(e) || /^\d+[\.\)]\s/.test(e) ? "list" : "paragraph";
};
re = function(t) {
  const e = u(this, c, it).call(this, t.text);
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
_e = function(t, e, s, n) {
  const i = u(this, c, H).call(this, e), a = t.heading ? xs(t.heading.text) : n >= 0 ? `preamble-p${s}-z${n}` : `preamble-p${s}-unzoned`, r = u(this, c, tt).call(this, a);
  if (!t.heading)
    return d`
				<div class="zone-section ${r ? "" : "excluded"}">
					<div class="section-heading preamble" @click=${() => u(this, c, D).call(this, e)}>
						<span class="heading-text preamble-label">Preamble</span>
						<span class="header-spacer"></span>
						<span class="group-count">${t.children.length} text${t.children.length !== 1 ? "s" : ""}</span>
						<uui-toggle
							label="${r ? "Included" : "Excluded"}"
							?checked=${r}
							@click=${(l) => l.stopPropagation()}
							@change=${(l) => u(this, c, ne).call(this, a, l.target.checked)}>
						</uui-toggle>
						<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
					${r && !i ? d`
						${t.children.map((l) => u(this, c, re).call(this, l))}
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
						@change=${(l) => u(this, c, ne).call(this, a, l.target.checked)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${!i && r ? d`
					<div class="section-children">
						${t.children.map((l) => u(this, c, re).call(this, l))}
					</div>
				` : w}
			</div>
		`;
};
ve = function(t) {
  const e = new Set(this._excludedAreas);
  e.has(t) ? e.delete(t) : e.add(t), this._excludedAreas = e;
};
nt = function(t, e, s) {
  const n = `area-p${e}-a${s}`, i = u(this, c, H).call(this, n), a = !this._excludedAreas.has(n), r = t.sections.length;
  return d`
			<div class="zone-area ${a ? "" : "area-excluded"}" style="border-left-color: ${t.color};">
				<div class="area-header" @click=${() => u(this, c, D).call(this, n)}>
					<span class="area-name">${t.name || `Area ${s + 1}`}</span>
					<span class="header-spacer"></span>
					<span class="group-count">${r} section${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${a ? "Included" : "Excluded"}"
						?checked=${a}
						@click=${(o) => o.stopPropagation()}
						@change=${() => u(this, c, ve).call(this, n)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${i ? w : d`
					${t.sections.map(
    (o, l) => u(this, c, _e).call(this, o, `p${e}-a${s}-s${l}`, e, s)
  )}
				`}
			</div>
		`;
};
at = function(t, e) {
  if (t.totalElements === 0) return w;
  const s = `area-p${e}-undefined`, n = u(this, c, H).call(this, s), i = !this._excludedAreas.has(s), a = t.sections.length;
  return d`
			<div class="zone-area undefined ${i ? "" : "area-excluded"}" style="border-left-color: var(--uui-color-border-standalone);">
				<div class="area-header" @click=${() => u(this, c, D).call(this, s)}>
					<span class="area-name undefined-name">Undefined</span>
					<span class="header-spacer"></span>
					<span class="group-count">${a} section${a !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${i ? "Included" : "Excluded"}"
						?checked=${i}
						@click=${(r) => r.stopPropagation()}
						@change=${() => u(this, c, ve).call(this, s)}>
					</uui-toggle>
					<uui-icon class="collapse-chevron" name="${n ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
				</div>
				${n ? w : d`
					${t.sections.map(
    (r, o) => u(this, c, _e).call(this, r, `p${e}-undefined-s${o}`, e, -1)
  )}
				`}
			</div>
		`;
};
rt = function(t, e, s) {
  const n = `page-${t}`, i = u(this, c, H).call(this, n), a = s && s.totalElements > 0, r = e.length + (a ? 1 : 0), o = e.reduce((h, p) => h + p.sections.length, 0) + (s?.sections.length ?? 0), l = u(this, c, Ke).call(this, t);
  return d`
			<uui-box headline="Page ${t}" class="page-box ${l ? "" : "page-excluded"}">
				<div slot="header-actions" class="page-header-actions">
					<span class="group-count">${o} section${o !== 1 ? "s" : ""}, ${r} area${r !== 1 ? "s" : ""}</span>
					<uui-toggle
						label="${l ? "Included in extraction" : "Excluded from extraction"}"
						?checked=${l}
						@click=${(h) => h.stopPropagation()}
						@change=${() => u(this, c, Xe).call(this, t)}>
					</uui-toggle>
					<div class="collapse-trigger" @click=${() => u(this, c, D).call(this, n)}>
						<uui-icon class="collapse-chevron" name="${i ? "icon-navigation-right" : "icon-navigation-down"}"></uui-icon>
					</div>
				</div>
				${i ? w : d`
					${e.map((h, p) => u(this, c, nt).call(this, h, t, p))}
					${a ? u(this, c, at).call(this, s, t) : w}
				`}
			</uui-box>
		`;
};
lt = function() {
  return this._zoneDetection ? d`
			${this._zoneDetection.pages.map(
    (t) => u(this, c, rt).call(this, t.page, t.zones, t.unzonedContent)
  )}
		` : w;
};
ot = function() {
  return this._zoneDetection ? this._zoneDetection.pages.reduce((t, e) => t + e.zones.reduce((s, n) => s + n.sections.length, 0) + (e.unzonedContent?.sections.length ?? 0), 0) : 0;
};
ct = function() {
  return (this._zoneDetection?.totalPages ?? this._extraction?.source.totalPages ?? 0) === 0 ? w : d`
			<label class="page-radio">
				<input type="radio" name="page-mode" value="all"
					.checked=${this._pageMode === "all"}
					@change=${() => u(this, c, V).call(this, "all")} />
				All
			</label>
			<label class="page-radio">
				<input type="radio" name="page-mode" value="custom"
					.checked=${this._pageMode === "custom"}
					@change=${() => u(this, c, V).call(this, "custom")} />
				Choose
			</label>
			<input type="text" class="page-input"
				placeholder="e.g. 1-2, 5"
				.value=${this._pageInputValue}
				@input=${u(this, c, Je)}
				@blur=${u(this, c, Ye)}
				@focus=${() => {
    this._pageMode === "all" && u(this, c, V).call(this, "custom");
  }}
				?disabled=${this._pageMode === "all"} />
		`;
};
ut = function() {
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
pt = function() {
  const t = this._zoneDetection !== null, e = this._extraction !== null;
  if (!t && !e) return w;
  const s = this._zoneDetection?.totalPages ?? (e ? this._extraction.source.totalPages : 0), n = t ? this._zoneDetection.pages.length : s, a = n < s ? `${n} of ${s}` : `${s}`, r = t ? this._zoneDetection.diagnostics.zonesDetected : 0, o = t ? u(this, c, ot).call(this) : 0, l = e ? this._extraction.source.fileName : "", h = e ? new Date(this._extraction.source.extractedDate).toLocaleString() : "";
  return d`
			<div class="info-boxes">
				<uui-box headline="Source" class="info-box-item">
					<div class="box-content">
						<h2 class="box-title">${l}</h2>
						<uui-icon name="icon-document" class="box-icon"></uui-icon>
						<span class="box-subtitle">${h}</span>
						<div class="box-buttons">
							<uui-button look="primary" color="positive" label="Re-extract" @click=${u(this, c, be)} ?disabled=${this._extracting}>
								<uui-icon name="icon-refresh"></uui-icon>
								Re-extract
							</uui-button>
							<uui-button look="primary" color="default" label="Change PDF" @click=${u(this, c, J)} ?disabled=${this._extracting}>
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
							${u(this, c, ct).call(this)}
						</div>
					</div>
				</uui-box>

				<uui-box headline="Areas" class="info-box-item">
					<div class="box-content">
						<span class="box-stat">${this._zoneTemplate ? this._zoneTemplate.zones.length : r}</span>
						<div class="box-buttons">
							${this._zoneTemplate ? d`<uui-button look="outline" compact label="Edit Areas" @click=${u(this, c, ie)}>
									<uui-icon name="icon-edit"></uui-icon>
									Edit Areas
								</uui-button>` : d`<uui-button look="primary" color="positive" compact label="Define Areas" @click=${u(this, c, ie)}>
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
					<uui-button look="outline" compact label="${this._allCollapsed ? "Expand All" : "Collapse All"}" @click=${u(this, c, et)}>
						<uui-icon name="${this._allCollapsed ? "icon-navigation-down" : "icon-navigation-right"}"></uui-icon>
						${this._allCollapsed ? "Expand All" : "Collapse All"}
					</uui-button>
				</div>
			` : w}
		`;
};
ht = function() {
  const t = this._zoneDetection !== null;
  return this._viewMode === "elements" ? t ? u(this, c, lt).call(this) : w : u(this, c, gt).call(this);
};
le = function(t) {
  const e = u(this, c, j).call(this, t);
  return e.length === 0 ? d`<uui-button look="secondary" compact label="Map" @click=${() => u(this, c, ae).call(this, t)}>
				<uui-icon name="icon-link"></uui-icon> Map
			</uui-button>` : d`${e.map(
    (s) => d`<span class="meta-badge mapped-target" @click=${() => u(this, c, ae).call(this, t)} style="cursor:pointer;" title="Click to re-map">
				<uui-icon name="icon-check" style="font-size:10px;"></uui-icon> ${u(this, c, st).call(this, s)}
			</span>`
  )}`;
};
dt = function(t) {
  const e = {
    bulletList: "Bullet List",
    paragraph: "Paragraph",
    subHeaded: "Sub-Headed",
    preamble: "Preamble",
    mixed: "Mixed"
  }, s = `${t.id}.heading`, n = `${t.id}.content`, i = u(this, c, j).call(this, s).length > 0, a = u(this, c, j).call(this, n).length > 0, r = i || a, o = t.heading ?? "Preamble";
  return d`
			<uui-box headline=${o} class="transformed-section ${r ? "section-mapped" : ""}">
				<div slot="header-actions" class="transformed-header-badges">
					<span class="pattern-badge ${t.pattern}">${e[t.pattern] ?? t.pattern}</span>
					<span class="meta-badge">p${t.page}</span>
					${t.zoneColor ? d`<span class="area-color-swatch" style="background: ${t.zoneColor};"></span>` : w}
					<span class="meta-badge">${t.childCount} item${t.childCount !== 1 ? "s" : ""}</span>
					${t.heading ? u(this, c, le).call(this, s) : w}
				</div>
				<div class="transformed-content" .innerHTML=${ms(t.content)}></div>
				<div class="section-mapping-actions">
					<span class="mapping-label">Content:</span>
					${u(this, c, le).call(this, n)}
				</div>
			</uui-box>
		`;
};
gt = function() {
  if (!this._transformResult)
    return d`
				<div class="empty-state">
					<uui-icon name="icon-lab" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
					<h3>No transform result</h3>
					<p>Re-extract content to generate the transformed view.</p>
				</div>
			`;
  const t = this._transformResult.sections.filter((s) => s.included), e = this._transformResult.sections.length;
  return d`
			${t.map((s) => u(this, c, dt).call(this, s))}
			<div class="diagnostics">
				<span class="meta-badge">${t.length}/${e} sections included</span>
				<span class="meta-badge">${this._transformResult.diagnostics.bulletListSections} bullet</span>
				<span class="meta-badge">${this._transformResult.diagnostics.paragraphSections} paragraph</span>
				<span class="meta-badge">${this._transformResult.diagnostics.subHeadedSections} sub-headed</span>
				${this._transformResult.diagnostics.preambleSections > 0 ? d`<span class="meta-badge">${this._transformResult.diagnostics.preambleSections} preamble</span>` : w}
			</div>
		`;
};
ft = function() {
  return d`
			<div class="empty-state">
				<uui-icon name="icon-document" style="font-size: 48px; color: var(--uui-color-text-alt);"></uui-icon>
				<h3>No sample extraction</h3>
				<p>Choose a PDF from the media library to extract text elements with their metadata.</p>
				<uui-button look="primary" label="Choose PDF" @click=${u(this, c, J)} ?disabled=${this._extracting}>
					${this._extracting ? d`<uui-loader-bar></uui-loader-bar>` : "Choose PDF..."}
				</uui-button>
			</div>
		`;
};
b.styles = [
  Pt,
  Tt`
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
_([
  $()
], b.prototype, "_extraction", 2);
_([
  $()
], b.prototype, "_zoneDetection", 2);
_([
  $()
], b.prototype, "_config", 2);
_([
  $()
], b.prototype, "_workflowName", 2);
_([
  $()
], b.prototype, "_loading", 2);
_([
  $()
], b.prototype, "_extracting", 2);
_([
  $()
], b.prototype, "_error", 2);
_([
  $()
], b.prototype, "_successMessage", 2);
_([
  $()
], b.prototype, "_collapsed", 2);
_([
  $()
], b.prototype, "_transformResult", 2);
_([
  $()
], b.prototype, "_viewMode", 2);
_([
  $()
], b.prototype, "_sourceConfig", 2);
_([
  $()
], b.prototype, "_pageMode", 2);
_([
  $()
], b.prototype, "_pageInputValue", 2);
_([
  $()
], b.prototype, "_allCollapsed", 2);
_([
  $()
], b.prototype, "_excludedAreas", 2);
_([
  $()
], b.prototype, "_zoneTemplate", 2);
b = _([
  Ct("up-doc-workflow-source-view")
], b);
const Ms = b;
export {
  b as UpDocWorkflowSourceViewElement,
  Ms as default
};
//# sourceMappingURL=up-doc-workflow-source-view.element-hOD42mEB.js.map
