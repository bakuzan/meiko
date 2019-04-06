function setOptions(method, body) {
  return {
    method,
    body: !!body ? JSON.stringify(body) : null,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
}

/**
 * Async Fetch
 * @param {string} url
 * @param {string} method
 * @param {object} body
 */
export default async function fetchFromServer(
  url,
  method = 'GET',
  body = null
) {
  const options = setOptions(method, body);
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { success: false, error };
  }
}
