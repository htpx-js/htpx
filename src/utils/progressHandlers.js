export function setupProgressHandlers(config) {
  if (config.onUploadProgress || config.onDownloadProgress) {
    if (typeof XMLHttpRequest !== "undefined") {
      // Only XHR supports progress events
      config.adapter = "xhr";
    } else {
      throw new Error(
        "Progress events are only supported in XMLHttpRequest environments."
      );
    }
  }
}
