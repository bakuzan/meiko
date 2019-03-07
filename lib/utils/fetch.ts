function setOptions(method: string, body: object) {
  return {
    method,
    body: !!body ? JSON.stringify(body) : null,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
}

export default async function fetchFromServer(
  url: string,
  method = 'GET',
  body = null
) {
  const options = setOptions(method, body);
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
}
