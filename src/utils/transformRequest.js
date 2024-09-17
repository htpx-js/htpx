export function transformRequest(config) {
  const isNode = typeof Buffer !== "undefined";

  if (
    ["POST", "PUT", "PATCH"].includes(config.method.toUpperCase()) &&
    config.data &&
    typeof config.data === "object" &&
    (!isNode || !Buffer.isBuffer(config.data))
  ) {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return JSON.stringify(config.data);
  }

  return config.data;
}
