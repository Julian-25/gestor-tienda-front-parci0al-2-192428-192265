import { fetchData, CATEGORIES_URL } from './api.js';
import { showModal } from './modal.js';
export async function loadCategories() {
    try {
        const categories = await fetchData(CATEGORIES_URL);
        const container = document.getElementById('categoriesContainer');
        container.innerHTML = '';
        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${category.image || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${category.name}">
                    <div class="card-body">
                        <h5 class="card-title">${category.name}</h5>
                        <button class="btn btn-primary view-category-detail" data-id="${category.id}">View Details</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        document.querySelectorAll('.view-category-detail').forEach(button => {
            button.addEventListener('click', () => showCategoryDetail(button.dataset.id));
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

export async function showCategoryDetail(categoryId) {
    try {
        const category = await fetchData(`${CATEGORIES_URL}/${categoryId}`);
        showModal(
            category.name,
            `
            <div class="text-center mb-3">
                <img src="${category.image || 'https://via.placeholder.com/300'}" class="img-fluid rounded" alt="${category.name}">
            </div>
            <p><strong>Creation Date:</strong> ${new Date(category.creationAt).toLocaleDateString()}</p>
            `
        );
    } catch (error) {
        console.error('Error loading category details:', error);
    }
}