import http from "http";
import https from "https";

export async function nodeAdapter(url, config) {
  const lib = url.startsWith("https") ? https : http;

  if (config.params && typeof config.params === "object") {
    const urlObj = new URL(url);
    Object.keys(config.params).forEach((key) =>
      urlObj.searchParams.append(key, config.params[key])
    );
    url = urlObj.toString();
  }

  return new Promise((resolve, reject) => {
    const req = lib.request(url, config, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve({
          data,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config,
          request: req,
        });
      });
    });

    req.on("error", (err) => reject(err));

    if (config.data) {
      if (typeof config.data === "object" && !Buffer.isBuffer(config.data)) {
        req.write(JSON.stringify(config.data));
      } else {
        req.write(config.data);
      }
    }

    req.end();
  });
}
