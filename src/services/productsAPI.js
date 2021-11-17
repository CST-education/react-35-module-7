const BASE_URL = 'http://localhost:4004';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchProducts() {
  return fetchWithErrorHandling(`${BASE_URL}/products`);
}

export function fetchCategories() {
  return fetchWithErrorHandling(`${BASE_URL}/categories`);
}
