const i = /* @__PURE__ */ new Map();
let a = null, c = null;
async function u(e) {
  return a || (c || (c = (async () => {
    try {
      const n = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      });
      n.ok ? a = await n.json() : a = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      a = { documentTypeAliases: [], blueprintIds: [] };
    }
    return c = null, a;
  })()), c);
}
async function p(e, n) {
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
  const r = await t.json();
  return i.set(e, r), r;
}
async function l(e, n) {
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
async function f(e, n) {
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
async function m(e, n, o) {
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
    const r = await t.json();
    return console.error("Sample extraction failed:", r), null;
  }
  return t.json();
}
async function h(e, n) {
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
async function d(e, n, o) {
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
    const r = await t.json();
    return console.error("Save map config failed:", r), null;
  }
  return s(), t.json();
}
function s() {
  i.clear(), a = null, c = null;
}
export {
  p as a,
  l as b,
  f as c,
  s as d,
  h as e,
  u as f,
  d as s,
  m as t
};
//# sourceMappingURL=workflow.service-Cy8WOA0g.js.map
