import { fetchAdapter, nodeAdapter, xhrAdapter } from "./adapters";
import { defaultConfig } from "./config";
import {
  applyRequestInterceptors,
  applyResponseInterceptors,
} from "./interceptors";
import { CancelToken } from "./utils/cancelToken";
import { handleProxy } from "./utils/handleProxy";
import { setupProgressHandlers } from "./utils/progressHandlers";
import { transformRequest } from "./utils/transformRequest";
import { transformResponse } from "./utils/transformResponse";
import { handleXsrfProtection } from "./utils/xsrfProtection";

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
