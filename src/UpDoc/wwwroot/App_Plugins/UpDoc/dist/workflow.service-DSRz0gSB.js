const c = /* @__PURE__ */ new Map();
let s = null, i = null;
async function f(o) {
  return s || (i || (i = (async () => {
    try {
      const n = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${o}`
        }
      });
      n.ok ? s = await n.json() : s = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      s = { documentTypeAliases: [], blueprintIds: [] };
    }
    return i = null, s;
  })()), i);
}
async function l(o, n) {
  const e = c.get(o);
  if (e) return e;
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/config/${o}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  if (!t.ok)
    return console.warn(`No config found for blueprint ${o}`), null;
  const a = await t.json();
  return c.set(o, a), a;
}
async function m(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.json() : (console.warn(`No workflow found with name "${o}"`), null);
}
async function d(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/sample-extraction`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.json() : null;
}
async function h(o, n, e, t) {
  const a = {};
  n && (a.mediaKey = n), t && (a.url = t);
  const r = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/sample-extraction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      },
      body: JSON.stringify(a)
    }
  );
  if (!r.ok) {
    const p = await r.json();
    return console.error("Sample extraction failed:", p), null;
  }
  return r.json();
}
async function w(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/extract-rich?mediaKey=${o}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.json() : null;
}
async function y(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/area-detection`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.json() : null;
}
async function g(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/transform`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.json() : null;
}
async function k(o, n, e) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/transform`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      },
      body: JSON.stringify({ mediaKey: n })
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Transform failed:", a), null;
  }
  return t.json();
}
async function j(o, n, e, t) {
  const a = {};
  n && (a.mediaKey = n), t && (a.url = t);
  const r = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/transform-adhoc`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      },
      body: JSON.stringify(a)
    }
  );
  return r.ok ? r.json() : null;
}
async function C(o, n, e, t) {
  const a = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/transform/sections/${encodeURIComponent(n)}/included`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify({ included: e })
    }
  );
  return a.ok ? a.json() : null;
}
async function $(o, n, e) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/map`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
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
async function T(o, n, e) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/pages`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      },
      body: JSON.stringify({ pages: n })
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Save page selection failed:", a), !1;
  }
  return u(), !0;
}
async function b(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/source`,
    {
      headers: {
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.json() : null;
}
async function v(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/area-template`,
    {
      headers: {
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.json() : null;
}
async function A(o, n, e) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/area-template`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      },
      body: JSON.stringify(n)
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Save area template failed:", a), null;
  }
  return t.json();
}
async function S(o, n) {
  const e = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/pdf`,
    {
      headers: {
        Authorization: `Bearer ${n}`
      }
    }
  );
  return e.ok ? e.blob() : null;
}
async function B(o, n, e) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/area-rules`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      },
      body: JSON.stringify(n)
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Save area rules failed:", a), null;
  }
  return u(), t.json();
}
async function U(o, n, e, t) {
  const a = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(o)}/infer-section-pattern`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify({ areaIndex: n, elementId: e })
    }
  );
  if (!a.ok) {
    const r = await a.json();
    return console.error("Infer section pattern failed:", r), null;
  }
  return a.json();
}
function u() {
  c.clear(), s = null, i = null;
}
export {
  l as a,
  m as b,
  S as c,
  d,
  w as e,
  f,
  b as g,
  y as h,
  g as i,
  v as j,
  k,
  h as l,
  T as m,
  B as n,
  $ as o,
  U as p,
  u as q,
  A as s,
  j as t,
  C as u
};
//# sourceMappingURL=workflow.service-DSRz0gSB.js.map
