export function serializeParams(params, serializer) {
  return serializer
    ? serializer(params)
    : new URLSearchParams(params).toString();
}
