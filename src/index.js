import { fetchAdapter, nodeAdapter, xhrAdapter } from "./adapters/index.js";
import { defaultConfig } from "./config.js";
import {
  applyRequestInterceptors,
  applyResponseInterceptors,
} from "./interceptors.js";
import { CancelToken } from "./utils/cancelToken.js";
import { handleProxy } from "./utils/handleProxy.js";
import { setupProgressHandlers } from "./utils/progressHandlers.js";
import { transformRequest } from "./utils/transformRequest.js";
import { transformResponse } from "./utils/transformResponse.js";
import { handleXsrfProtection } from "./utils/xsrfProtection.js";

export async function request(url, userConfig = {}) {
  const config = applyRequestInterceptors({
    ...defaultConfig,
    ...userConfig,
  });
  config.data = transformRequest(config);
  handleXsrfProtection(config);
  handleProxy(config);

  const adapter = config.adapter || getAdapter();
  setupProgressHandlers(config);

  const response = await adapter(url, config);
  const finalResponse = applyResponseInterceptors(response);

  return transformResponse(finalResponse, config);
}

function getAdapter() {
  if (typeof XMLHttpRequest !== "undefined") return xhrAdapter;
  if (typeof fetch !== "undefined") return fetchAdapter;
  return nodeAdapter;
}

// Helper methods (get, post, put, etc.)
export function get(url, config = {}) {
  return request(url, { ...config, method: "GET" });
}

export function post(url, data, config = {}) {
  return request(url, { ...config, method: "POST", data });
}

export function put(url, data, config = {}) {
  return request(url, { ...config, method: "PUT", data });
}

export function patch(url, data, config = {}) {
  return request(url, { ...config, method: "PATCH", data });
}

export function del(url, config = {}) {
  return request(url, { ...config, method: "DELETE" });
}

export default {
  request,
  get,
  post,
  put,
  patch,
  delete: del,
  CancelToken,
};
