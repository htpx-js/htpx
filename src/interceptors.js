let requestInterceptors = [];
let responseInterceptors = [];

export function addRequestInterceptor(interceptor) {
  requestInterceptors.push(interceptor);
}

export function addResponseInterceptor(interceptor) {
  responseInterceptors.push(interceptor);
}

export function applyRequestInterceptors(config) {
  requestInterceptors.forEach((interceptor) => {
    config = interceptor(config);
  });
  return config;
}

export function applyResponseInterceptors(response) {
  responseInterceptors.forEach((interceptor) => {
    response = interceptor(response);
  });
  return response;
}
