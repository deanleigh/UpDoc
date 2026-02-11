const i = /* @__PURE__ */ new Map();
let r = null, c = null;
async function u(e) {
  return r || (c || (c = (async () => {
    try {
      const o = await fetch("/umbraco/management/api/v1/updoc/workflows/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      });
      o.ok ? r = await o.json() : r = { documentTypeAliases: [], blueprintIds: [] };
    } catch {
      r = { documentTypeAliases: [], blueprintIds: [] };
    }
    return c = null, r;
  })()), c);
}
async function l(e, o) {
  const n = i.get(e);
  if (n) return n;
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/config/${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    }
  );
  if (!t.ok)
    return console.warn(`No config found for blueprint ${e}`), null;
  const a = await t.json();
  return i.set(e, a), a;
}
async function p(e, o, n, t = "pdf") {
  const a = await fetch(
    `/umbraco/management/api/v1/updoc/extract-sections?mediaKey=${e}&blueprintId=${o}&sourceType=${t}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      }
    }
  );
  if (!a.ok) {
    const s = await a.json();
    return console.error("Extract sections failed:", s), null;
  }
  return a.json();
}
async function f(e, o) {
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
async function m(e, o) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}/sample-extraction`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    }
  );
  return n.ok ? n.json() : null;
}
async function h(e, o, n) {
  const t = await fetch(
    `/umbraco/management/api/v1/updoc/workflows/${encodeURIComponent(e)}/sample-extraction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify({ mediaKey: o })
    }
  );
  if (!t.ok) {
    const a = await t.json();
    return console.error("Sample extraction failed:", a), null;
  }
  return t.json();
}
async function d(e, o) {
  const n = await fetch(
    `/umbraco/management/api/v1/updoc/extract-rich?mediaKey=${e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      }
    }
  );
  return n.ok ? n.json() : null;
}
function w() {
  i.clear(), r = null, c = null;
}
export {
  l as a,
  d as b,
  f as c,
  m as d,
  p as e,
  u as f,
  w as g,
  h as t
};
//# sourceMappingURL=workflow.service-BWNI6sBi.js.map
