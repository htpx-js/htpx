export function handleXsrfProtection(config) {
  if (typeof document !== "undefined") {
    const xsrfToken = getCookie(config.xsrfCookieName || "XSRF-TOKEN");
    if (xsrfToken) {
      config.headers[config.xsrfHeaderName || "X-XSRF-TOKEN"] = xsrfToken;
    }
  }
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}
