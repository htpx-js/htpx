export function handleProxy(config) {
  if (config.proxy) {
    const { protocol, host, port, auth } = config.proxy;
    const proxyUrl = `${protocol}://${auth?.username}:${auth?.password}@${host}:${port}`;
    config.headers["Proxy-Authorization"] = proxyUrl;
  }
}
