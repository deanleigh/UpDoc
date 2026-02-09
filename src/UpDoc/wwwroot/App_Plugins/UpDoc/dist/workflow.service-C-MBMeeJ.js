const s = /* @__PURE__ */ new Map();
let t = null, r = null;
async function u(e) {
  return t || (r || (r = (async () => {
    try {
      const o = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      });
      o.ok ? t = await o.json() : t = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      t = { documentTypeAliases: [], blueprintIds: [] };
    }
    return r = null, t;
  })()), r);
}
async function l(e, o) {
  const n = s.get(e);
  if (n) return n;
  const c = await fetch(
    `/umbraco/management/api/v1/updoc/config/${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    }
  );
  if (!c.ok)
    return console.warn(`No config found for blueprint ${e}`), null;
  const a = await c.json();
  return s.set(e, a), a;
}
async function f(e, o, n, c = "pdf") {
  const a = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${e}&blueprintId=${o}&sourceType=${c}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  if (!a.ok) {
    const i = await a.json();
    return console.error("Extract sections failed:", i), null;
  }
  return a.json();
}
async function p(e, o) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    }
  );
  return n.ok ? n.json() : (console.warn(`No workflow found with name "${e}"`), null);
}
function h() {
  s.clear(), t = null, r = null;
}
export {
  l as a,
  p as b,
  h as c,
  f as e,
  u as f
};
//# sourceMappingURL=workflow.service-C-MBMeeJ.js.map
