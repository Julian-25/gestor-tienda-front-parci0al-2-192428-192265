export function showModal(title, content) {
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}