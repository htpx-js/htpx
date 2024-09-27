import { getAdapter } from "./adapters/index.js";
import { defaultConfig } from "./config.js";
import {
  addRequestInterceptor,
  addResponseInterceptor,
  applyRequestInterceptors,
  applyResponseInterceptors,
} from "./interceptors.js";
import { CancelToken } from "./utils/cancelToken.js";
import { handleProxy } from "./utils/handleProxy.js";
import { setupProgressHandlers } from "./utils/progressHandlers.js";
import { transformRequest } from "./utils/transformRequest.js";
import { transformResponse } from "./utils/transformResponse.js";
import { handleXsrfProtection } from "./utils/xsrfProtection.js";

export async function request(url, data = null, userConfig = {}) {
  const config = applyRequestInterceptors({
    ...defaultConfig,
    ...userConfig,
  });

  if (data) {
    config.data = data;
  }

  transformRequest(config);
  handleXsrfProtection(config);
  handleProxy(config);

  const adapter = await (config.adapter || getAdapter());
  setupProgressHandlers(config);

  const response = await adapter(url, config);
  const finalResponse = applyResponseInterceptors(response);

  return transformResponse(finalResponse, config);
}

export function get(url, config = {}) {
  return request(url, null, { ...config, method: "GET" });
}

export function post(url, data, config = {}) {
  return request(url, data, { ...config, method: "POST" });
}

export function put(url, data, config = {}) {
  return request(url, data, { ...config, method: "PUT" });
}

export function patch(url, data, config = {}) {
  return request(url, data, { ...config, method: "PATCH" });
}

export function del(url, config = {}) {
  return request(url, null, { ...config, method: "DELETE" });
}

export default {
  request,
  get,
  post,
  put,
  patch,
  delete: del,
  CancelToken,
  addRequestInterceptor,
  addResponseInterceptor,
};
