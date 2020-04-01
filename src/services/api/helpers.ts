import auth from '../auth';

export async function handleResponse(response: Response): Promise<any> {
  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error('Server response is not in JSON format');
    }
  } else {
    // eslint-disable-next-line no-throw-literal
    throw {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      // @ts-ignore
      message: response?.message || `${response.status} ${response.statusText}`,
    };
  }
}

export function scrubEmptyStrings(obj: {}) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return value === '' || value === null ? undefined : value;
    })
  );
}

export async function get(path: RequestInfo, query = {}, sendToken = true) {
  query = scrubEmptyStrings(query);

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
  };
  const accessToken = await auth.getAccessToken();
  // @ts-ignore
  if (sendToken) headers['authorization'] = `Bearer ${accessToken}`;

  if (Object.keys(query).length > 0) {
    const params = new URLSearchParams();
    for (let key in query) {
      // @ts-ignore
      params.set(key, query[key]);
    }
    path += '?' + params.toString();
  }

  const response = await fetch(path, { headers, method: 'get', credentials: 'include' });

  return await handleResponse(response);
}

export async function post(path: RequestInfo, body = {}, sendToken = true) {
  body = scrubEmptyStrings(body);

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
  };
  const accessToken = await auth.getAccessToken();
  // @ts-ignore
  if (sendToken) headers['authorization'] = `Bearer ${accessToken}`;

  body = JSON.stringify(body);

  // @ts-ignore
  const response = await fetch(path, { headers, method: 'post', body, credentials: 'include' });

  return await handleResponse(response);
}

export async function postBlob(path: RequestInfo, body: any, sendToken = true) {
  const headers = {
    accept: 'application/json',
  };
  const accessToken = await auth.getAccessToken();
  // @ts-ignore
  if (sendToken) headers['authorization'] = `Bearer ${accessToken}`;

  const response = await fetch(path, { headers, method: 'post', body, credentials: 'include' });

  return await handleResponse(response);
}

export async function put(path: RequestInfo, body = {}, sendToken = true) {
  body = scrubEmptyStrings(body);

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
  };
  const accessToken = await auth.getAccessToken();
  // @ts-ignore
  if (sendToken) headers['authorization'] = `Bearer ${accessToken}`;

  body = JSON.stringify(body);

  // @ts-ignore
  const response = await fetch(path, { headers, method: 'put', body, credentials: 'include' });

  return await handleResponse(response);
}

export async function del(path: RequestInfo, sendToken = true) {
  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
  };
  const accessToken = await auth.getAccessToken();
  // @ts-ignore
  if (sendToken) headers['authorization'] = `Bearer ${accessToken}`;

  const response = await fetch(path, { headers, method: 'delete', credentials: 'include' });

  return await handleResponse(response);
}
