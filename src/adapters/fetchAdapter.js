export async function fetchAdapter(url, config) {
  const response = await fetch(url, config);

  let data;
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    data = "";
  } else {
    try {
      data = await response.json();
    } catch (error) {
      data = await response.text();
    }
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config,
    request: response,
  };
}
