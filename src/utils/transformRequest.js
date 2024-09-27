export function transformRequest(config) {
  const isNode = typeof Buffer !== "undefined";

  if (
    config.encryptParams &&
    config.params &&
    typeof config.params === "object"
  ) {
    const encrypt =
      config.makeParamsEncryption ||
      ((data) => {
        if (isNode) {
          return Buffer.from(JSON.stringify(data)).toString("base64");
        } else {
          return btoa(JSON.stringify(data));
        }
      });

    const encryptedParams = encrypt(config.params);
    config.params = { q: encryptedParams };
  }

  if (
    ["POST", "PUT", "PATCH"].includes(config.method.toUpperCase()) &&
    config.data &&
    typeof config.data === "object"
  ) {
    if (config.encryptData) {
      const encrypt =
        config.makeDataEncryption ||
        ((data) => {
          if (isNode) {
            return Buffer.from(JSON.stringify(data)).toString("base64");
          } else {
            return btoa(JSON.stringify(data));
          }
        });

      config.data = `{ data: ${encrypt(config.data)} }`;
    } else {
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
      config.data = JSON.stringify(config.data);
    }
  }
}
