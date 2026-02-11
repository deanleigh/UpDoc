const i = /* @__PURE__ */ new Map();
let r = null, c = null;
async function p(e) {
  return r || (c || (c = (async () => {
    try {
      const n = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      });
      n.ok ? r = await n.json() : r = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      r = { documentTypeAliases: [], blueprintIds: [] };
    }
    return c = null, r;
  })()), c);
}
async function l(e, n) {
  const o = i.get(e);
  if (o) return o;
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/config/${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  if (!t.ok)
    return console.warn(`No config found for blueprint ${e}`), null;
  const a = await t.json();
  return i.set(e, a), a;
}
async function f(e, n, o, t = "pdf") {
  const a = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${e}&blueprintId=${n}&sourceType=${t}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    }
  );
  if (!a.ok) {
    const s = await a.json();
    return console.error("Extract sections failed:", s), null;
  }
  return a.json();
}
async function m(e, n) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return o.ok ? o.json() : (console.warn(`No workflow found with name "${e}"`), null);
}
async function h(e, n) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}/sample-extraction`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return o.ok ? o.json() : null;
}
async function d(e, n, o) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}/sample-extraction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify({ mediaKey: n })
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Sample extraction failed:", a), null;
  }
  return t.json();
}
async function w(e, n) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/extract-rich?mediaKey=${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return o.ok ? o.json() : null;
}
async function y(e, n, o) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}/map`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify(n)
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Save map config failed:", a), null;
  }
  return u(), t.json();
}
function u() {
  i.clear(), r = null, c = null;
}
export {
  l as a,
  w as b,
  m as c,
  h as d,
  f as e,
  p as f,
  u as g,
  y as s,
  d as t
};
//# sourceMappingURL=workflow.service-BLucYv1b.js.map
