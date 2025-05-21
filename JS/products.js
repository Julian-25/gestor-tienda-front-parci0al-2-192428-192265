import { fetchData, PRODUCTS_URL } from './api.js';
import { showModal } from './modal.js';

export async function loadProducts() {
    try {
        const products = await fetchData(PRODUCTS_URL);
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${product.images[0] || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description.substring(0, 50)}...</p>
                        <p class="card-text"><strong>Price: $${product.price}</strong></p>
                        <button class="btn btn-primary view-product-detail" data-id="${product.id}">View Details</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        document.querySelectorAll('.view-product-detail').forEach(button => {
            button.addEventListener('click', () => showProductDetail(button.dataset.id));
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

export async function showProductDetail(productId) {
    try {
        const product = await fetchData(`${PRODUCTS_URL}/${productId}`);
        showModal(
            product.title,
            `
            <div class="text-center mb-3">
                <img src="${product.images[0] || 'https://via.placeholder.com/300'}" class="img-fluid rounded" alt="${product.title}">
            </div>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category?.name || 'N/A'}</p>
            <p><strong>Creation Date:</strong> ${new Date(product.creationAt).toLocaleDateString()}</p>
            `
        );
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}