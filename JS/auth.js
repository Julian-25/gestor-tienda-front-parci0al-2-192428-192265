import { initNavigation } from './navigation.js';

export function initAuth() {
    const loginSection = document.getElementById('loginSection');
    const mainContent = document.getElementById('mainContent');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
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
                initNavigation();
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            mainContent.style.display = 'none';
            loginSection.style.display = 'block';
            if (loginForm) loginForm.reset();
        });
    }
}