        const loginSection = document.getElementById('loginSection');
        const mainContent = document.getElementById('mainContent');
        const loginForm = document.getElementById('loginForm');
        const logoutBtn = document.getElementById('logoutBtn');
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('[data-section]');

        const API_URL = 'https://api.escuelajs.co/api/v1';
        const PRODUCTS_URL = `${API_URL}/products`;
        const CATEGORIES_URL = `${API_URL}/categories`;
        const USERS_URL = `${API_URL}/users`;
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            let isValid = true;
            if (!email.value.includes('@') || !email.value.includes('.')) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            if (password.value.trim() === '') {
                password.classList.add('is-invalid');
                isValid = false;
            } else {
                password.classList.remove('is-invalid');
            }
            if (isValid) {
                loginSection.style.display = 'none';
                mainContent.style.display = 'block';
                loadDashboardData();
                loadProducts();
                loadCategories();
                loadUsers();
            }
        });
        
    
        logoutBtn.addEventListener('click', function() {
            mainContent.style.display = 'none';
            loginSection.style.display = 'block';
            loginForm.reset();
        });
        
    
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('data-section');

                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
                
      
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(sectionId).classList.add('active');
            });
        });
    
        async function loadDashboardData() {
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

        async function loadProducts() {
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
                                <button class="btn btn-primary" onclick="showProductDetail(${product.id})">View Details</button>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        async function loadCategories() {
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
                                <button class="btn btn-primary" onclick="showCategoryDetail(${category.id})">View Details</button>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        }
        async function loadUsers() {
            try {
                const users = await fetchData(USERS_URL);
                const tbody = document.getElementById('usersTableBody');
                tbody.innerHTML = '';
                
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td><img src="${user.avatar}" alt="Avatar" class="avatar-img rounded-circle"></td>
                        <td>${user.role}</td>
                    `;
                    tbody.appendChild(row);
                });
            } catch (error) {
                console.error('Error loading users:', error);
            }
        }
        async function showProductDetail(productId) {
            try {
                const product = await fetchData(`${PRODUCTS_URL}/${productId}`);
                const modalTitle = document.getElementById('productModalTitle');
                const modalBody = document.getElementById('productModalBody');
                
                modalTitle.textContent = product.title;
                modalBody.innerHTML = `
                    <div class="text-center mb-3">
                        <img src="${product.images[0] || 'https://via.placeholder.com/300'}" class="img-fluid rounded" alt="${product.title}">
                    </div>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Category:</strong> ${product.category?.name || 'N/A'}</p>
                    <p><strong>Creation Date:</strong> ${new Date(product.creationAt).toLocaleDateString()}</p>
                `;  
                const modal = new bootstrap.Modal(document.getElementById('productModal'));
                modal.show();
            } catch (error) {
                console.error('Error loading product details:', error);
            }
        }
        async function showCategoryDetail(categoryId) {
            try {
                const category = await fetchData(`${CATEGORIES_URL}/${categoryId}`);
                const modalTitle = document.getElementById('categoryModalTitle');
                const modalBody = document.getElementById('categoryModalBody');
                
                modalTitle.textContent = category.name;
                modalBody.innerHTML = `
                    <div class="text-center mb-3">
                        <img src="${category.image || 'https://via.placeholder.com/300'}" class="img-fluid rounded" alt="${category.name}">
                    </div>
                    <p><strong>Creation Date:</strong> ${new Date(category.creationAt).toLocaleDateString()}</p>
                `;  
                const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
                modal.show();
            } catch (error) {
                console.error('Error loading category details:', error);
            }
        }
        async function fetchData(url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }