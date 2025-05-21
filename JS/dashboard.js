import { fetchData, PRODUCTS_URL, CATEGORIES_URL, USERS_URL } from './api.js';

export async function loadDashboardData() {
    try {
        const [products, categories, users] = await Promise.all([
            fetchData(PRODUCTS_URL),
            fetchData(CATEGORIES_URL),
            fetchData(USERS_URL)
        ]);
        
        document.getElementById('totalProducts').textContent = products.length;
        document.getElementById('totalCategories').textContent = categories.length;
        document.getElementById('totalUsers').textContent = users.length;
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}