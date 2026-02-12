const c = /* @__PURE__ */ new Map();
let r = null, s = null;
async function u(n) {
  return r || (s || (s = (async () => {
    try {
      const e = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${n}`
        }
      });
      e.ok ? r = await e.json() : r = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      r = { documentTypeAliases: [], blueprintIds: [] };
    }
    return s = null, r;
  })()), s);
}
async function p(n, e) {
  const o = c.get(n);
  if (o) return o;
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/config/${n}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  if (!t.ok)
    return console.warn(`No config found for blueprint ${n}`), null;
  const a = await t.json();
  return c.set(n, a), a;
}
async function f(n, e) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return o.ok ? o.json() : (console.warn(`No workflow found with name "${n}"`), null);
}
async function l(n, e) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}/sample-extraction`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return o.ok ? o.json() : null;
}
async function m(n, e, o) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}/sample-extraction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify({ mediaKey: e })
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Sample extraction failed:", a), null;
  }
  return t.json();
}
async function d(n, e) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/extract-rich?mediaKey=${n}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return o.ok ? o.json() : null;
}
async function h(n, e) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}/zone-detection`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return o.ok ? o.json() : null;
}
async function w(n, e) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}/transform`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return o.ok ? o.json() : null;
}
async function y(n, e, o) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}/transform`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify({ mediaKey: e })
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Transform failed:", a), null;
  }
  return t.json();
}
async function g(n, e, o, t) {
  const a = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}/transform/sections/${encodeURIComponent(e)}/included`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify({ included: o })
    }
  );
  return a.ok ? a.json() : null;
}
async function C(n, e, o) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(n)}/map`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify(e)
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Save map config failed:", a), null;
  }
  return i(), t.json();
}
function i() {
  c.clear(), r = null, s = null;
}
export {
  p as a,
  f as b,
  l as c,
  h as d,
  d as e,
  u as f,
  w as g,
  y as h,
  i,
  C as s,
  m as t,
  g as u
};
//# sourceMappingURL=workflow.service-C9FepPiJ.js.map
