export default function resolveErrorMessage(error, name) {
  const isMap = error instanceof Map;
  const isObject = typeof error === 'object';
  const isString = typeof error === 'string';

  if (isString) {
    return error;
  } else if (isMap) {
    return error.get(name);
  } else if (isObject) {
    return error[name];
  }

  return undefined;
}
