import toaster from './toaster';
import { isObject } from './index';

export const handleErrorResponse = (error: any) => {
  const message = error.message
    ? error.message
    : error.error
    ? error.error
    : error
    ? error
    : 'Something went wrong!';
  toaster.error('Fetch error!', message);
  console.error(error);
};

const setOptions = (method: string, body: object) => ({
  method,
  body: !!body ? JSON.stringify(body) : null,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const fetchFromServer = (url: string, method = 'GET', body = null) => {
  const options = setOptions(method, body);
  return fetch(url, options)
    .then((response) => response.json())
    .then((jsonResult) => {
      const badResponse = isObject(jsonResult) && !!jsonResult.errors;

      if (badResponse) {
        throw new Error(
          (jsonResult.errors[0] && jsonResult.errors[0].message) ||
            'Graphql Error'
        );
      }

      return jsonResult;
    });
};

export default fetchFromServer;
