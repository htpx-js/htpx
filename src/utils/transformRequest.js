export function transformRequest(config) {
  if (config.transformRequest) {
    return config.transformRequest.reduce(
      (data, fn) => fn(data, config.headers),
      config.data
    );
  }
  return config.data;
}
