export function xhrAdapter(url, config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (config.params && typeof config.params === "object") {
      const queryString = new URLSearchParams(config.params).toString();
      url += (url.includes("?") ? "&" : "?") + queryString;
    }

    xhr.open(config.method || "GET", url, true);

    if (config.headers) {
      Object.keys(config.headers).forEach((key) => {
        xhr.setRequestHeader(key, config.headers[key]);
      });
    }

    xhr.timeout = config.timeout || 0;

    xhr.onload = () => {
      let data = xhr.responseText;

      if (xhr.status === 204 || data.length === 0) {
        data = "";
      }

      try {
        data = JSON.parse(data);
      } catch (error) {}

      resolve({
        data,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        config,
        request: xhr,
      });
    };

    xhr.onerror = () => reject(new Error("Network Error"));
    xhr.ontimeout = () => reject(new Error("Timeout Error"));

    xhr.send(config.data);
  });
}
