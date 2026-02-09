const s = /* @__PURE__ */ new Map();
let n = null, a = null;
async function u(e) {
  return n || (a || (a = (async () => {
    try {
      const o = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      });
      o.ok ? n = await o.json() : n = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      n = { documentTypeAliases: [], blueprintIds: [] };
    }
    return a = null, n;
  })()), a);
}
async function l(e, o) {
  const c = s.get(e);
  if (c) return c;
  const r = await fetch(
    `/umbraco/management/api/v1/updoc/config/${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    }
  );
  if (!r.ok)
    return console.warn(`No config found for blueprint ${e}`), null;
  const t = await r.json();
  return s.set(e, t), t;
}
async function f(e, o, c, r = "pdf") {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${e}&blueprintId=${o}&sourceType=${r}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${c}`
      }
    }
  );
  if (!t.ok) {
    const i = await t.json();
    return console.error("Extract sections failed:", i), null;
  }
  return t.json();
}
function p() {
  s.clear(), n = null, a = null;
}
export {
  l as a,
  p as c,
  f as e,
  u as f
};
//# sourceMappingURL=workflow.service-BHEUOVK1.js.map
