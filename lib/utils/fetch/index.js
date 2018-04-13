import toaster from 'utils/toaster';
import { isObject } from 'utils/common';

const handleErrorResponse = (error, url) => {
  const message = error.message
    ? error.message
    : error.error ? error.error : error ? error : 'Something went wrong!';
  toaster.error('Fetch error!', message);
  console.error(error);
};

const setOptions = (method, body) => ({
  method: method,
  body: !!body ? JSON.stringify(body) : null,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const fetchFromServer = (url, method = 'GET', body = null) => {
  const options = setOptions(method, body);
  return fetch(url, options)
    .then(response => response.json())
    .then(jsonResult => {
      const badResponse = isObject(jsonResult) && !!jsonResult.errors;
      if (badResponse) throw new Error("Graphql Error", jsonResult.errors[0] && jsonResult.errors[0].message)
      return jsonResult;
    })
    .catch(error => handleErrorResponse(error, url));
};

export default fetchFromServer;
