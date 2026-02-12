const i = /* @__PURE__ */ new Map();
let r = null, c = null;
async function u(e) {
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
  const a = await t.json();
  return i.set(e, a), a;
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
    const a = await t.json();
    return console.error("Sample extraction failed:", a), null;
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
async function d(e, n) {
  const o = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}/zone-detection`,
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
async function w(e, n, o) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}/zone-detection`,
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
    return console.error("Zone detection failed:", a), null;
  }
  return t.json();
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
  return s(), t.json();
}
function s() {
  i.clear(), r = null, c = null;
}
export {
  p as a,
  l as b,
  f as c,
  d,
  h as e,
  u as f,
  w as g,
  s as h,
  y as s,
  m as t
};
//# sourceMappingURL=workflow.service-DJ0lDdZu.js.map
