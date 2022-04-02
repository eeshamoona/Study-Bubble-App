const apiUrl = "http://192.168.1.131:8000/api";

function buildUrl(endpoint, id = null, queryString = null) {
  const queryAddition = queryString ? `?${queryString}` : "";
  const idAddition = id ? `/${id}` : "";
  return `${apiUrl}/${endpoint}${idAddition}/${queryAddition}`;
}

function apiGet(endpoint, id = null, queryString = null, headers = {}) {
  return fetch(buildUrl(endpoint, id, queryString), {
    method: "GET",
    headers,
  }).then((response) => response.json());
}

function apiPost(endpoint, id = null, payload, headers = {}) {
  return fetch(buildUrl(endpoint, id), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(payload),
  }).then((response) => ({ status: response.status, body: response.json() }));
}

function apiDelete(endpoint, id) {
  return fetch(buildUrl(endpoint, id), {
    method: "DELETE",
  }).then((response) => response.json());
}

export { buildUrl, apiGet, apiPost, apiDelete };
