import { fetchData, USERS_URL } from './api.js';

export async function loadUsers() {
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