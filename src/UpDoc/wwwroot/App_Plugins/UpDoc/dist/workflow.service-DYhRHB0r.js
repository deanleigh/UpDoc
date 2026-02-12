const c = /* @__PURE__ */ new Map();
let r = null, s = null;
async function u(o) {
  return r || (s || (s = (async () => {
    try {
      const e = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${o}`
        }
      });
      e.ok ? r = await e.json() : r = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      r = { documentTypeAliases: [], blueprintIds: [] };
    }
    return s = null, r;
  })()), s);
}
async function p(o, e) {
  const n = c.get(o);
  if (n) return n;
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/config/${o}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  if (!t.ok)
    return console.warn(`No config found for blueprint ${o}`), null;
  const a = await t.json();
  return c.set(o, a), a;
}
async function f(o, e) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return n.ok ? n.json() : (console.warn(`No workflow found with name "${o}"`), null);
}
async function l(o, e) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/sample-extraction`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return n.ok ? n.json() : null;
}
async function m(o, e, n) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/sample-extraction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
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
async function h(o, e) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/extract-rich?mediaKey=${o}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return n.ok ? n.json() : null;
}
async function d(o, e) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/zone-detection`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return n.ok ? n.json() : null;
}
async function w(o, e) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/transform`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    }
  );
  return n.ok ? n.json() : null;
}
async function y(o, e, n) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/transform`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
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
async function g(o, e, n) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/map`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
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
  d,
  h as e,
  u as f,
  w as g,
  y as h,
  i,
  g as s,
  m as t
};
//# sourceMappingURL=workflow.service-DYhRHB0r.js.map
