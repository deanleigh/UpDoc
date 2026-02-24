function r(o) {
  return [...o.blockGrids ?? [], ...o.blockLists ?? []];
}
function s(o) {
  const n = [], a = new Set(o.fields.map((e) => e.tab).filter(Boolean));
  for (const e of a)
    n.push({
      id: e.toLowerCase().replace(/\s+/g, "-"),
      label: e
    });
  for (const e of r(o)) {
    const t = e.tab ?? "Page Content";
    a.has(t) || (a.add(t), n.push({
      id: t.toLowerCase().replace(/\s+/g, "-"),
      label: t
    }));
  }
  return n;
}
function l(o, n) {
  if (o.blockKey) {
    for (const e of r(n))
      if (e.blocks.find((t) => t.key === o.blockKey))
        return (e.tab ?? "Page Content").toLowerCase().replace(/\s+/g, "-");
    return "page-content";
  }
  const a = n.fields.find((e) => e.alias === o.target);
  return a?.tab ? a.tab.toLowerCase().replace(/\s+/g, "-") : null;
}
function c(o, n) {
  for (const a of r(n)) {
    const e = a.blocks.find((t) => t.key === o);
    if (e) return e.label;
  }
  return null;
}
export {
  c as a,
  s as b,
  r as g,
  l as r
};
//# sourceMappingURL=destination-utils-DUfOJy5W.js.map
