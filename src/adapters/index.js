let xhrAdapterPromise, fetchAdapterPromise, nodeAdapter;

if (typeof window !== "undefined" && typeof XMLHttpRequest !== "undefined") {
  xhrAdapterPromise = import("./xhrAdapter.js").then(
    (module) => module.xhrAdapter
  );
  fetchAdapterPromise = import("./fetchAdapter.js").then(
    (module) => module.fetchAdapter
  );
} else {
  nodeAdapter = require("./nodeAdapter.js").nodeAdapter;
}

export async function getAdapter() {
  if (typeof window !== "undefined" && typeof XMLHttpRequest !== "undefined") {
    if (xhrAdapterPromise) {
      return await xhrAdapterPromise;
    }
    return await fetchAdapterPromise;
  }
  return nodeAdapter;
}
