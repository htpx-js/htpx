export function handleError(error) {
  if (error.response) {
    return Promise.reject(error.response);
  } else if (error.request) {
    return Promise.reject(new Error("No response received from the server"));
  } else {
    return Promise.reject(new Error(error.message));
  }
}
