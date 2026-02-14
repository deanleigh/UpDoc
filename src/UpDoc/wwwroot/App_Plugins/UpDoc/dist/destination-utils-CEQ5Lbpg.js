function l(t) {
  const n = [], a = new Set(t.fields.map((e) => e.tab).filter(Boolean));
  for (const e of a)
    n.push({
      id: e.toLowerCase().replace(/\s+/g, "-"),
      label: e
    });
  return t.blockGrids?.length && (a.has("Page Content") || n.push({ id: "page-content", label: "Page Content" })), n;
}
function r(t, n) {
  if (t.blockKey)
    return "page-content";
  const a = n.fields.find((e) => e.alias === t.target);
  return a?.tab ? a.tab.toLowerCase().replace(/\s+/g, "-") : null;
}
function s(t, n) {
  for (const a of n.blockGrids ?? []) {
    const e = a.blocks.find((o) => o.key === t);
    if (e) return e.label;
  }
  return null;
}
export {
  s as a,
  l as g,
  r
};
//# sourceMappingURL=destination-utils-CEQ5Lbpg.js.map
