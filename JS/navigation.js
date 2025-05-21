import { loadDashboardData } from './dashboard.js';
import { loadProducts } from './products.js';
import { loadCategories } from './categories.js';
import { loadUsers } from './users.js';

export function initNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('[data-section]');

    loadDashboardData();
    loadProducts();
    loadCategories();
    loadUsers();

 
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
}