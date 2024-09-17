export function transformResponse(response, config) {
  let responseData = response.data;

  if (config.responseType === "json" && typeof responseData === "string") {
    try {
      responseData = JSON.parse(responseData);
    } catch (error) {
      console.error("Failed to parse JSON response", error);
    }
  }

  if (response.status === 204 || !responseData) {
    responseData = "";
  }

  if (config.transformResponse) {
    return config.transformResponse.reduce(
      (data, fn) => fn(data),
      responseData
    );
  }

  return { ...response, data: responseData };
}
