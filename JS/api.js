const API_URL = 'https://api.escuelajs.co/api/v1';

export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export const PRODUCTS_URL = `${API_URL}/products`;
export const CATEGORIES_URL = `${API_URL}/categories`;
export const USERS_URL = `${API_URL}/users`;