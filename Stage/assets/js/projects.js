document.addEventListener('DOMContentLoaded', () => {
    initializeProjectFilters();
    initializeProjectCards();
});

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    const modal = document.querySelector('.project-modal');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            showProjectDetails(projectId);
        });
    });
}

function showProjectDetails(projectId) {
    // Fetch project details and show in modal
    const modal = document.querySelector('.project-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // You would typically fetch this data from a server
    // For now, we'll use sample data
    modalContent.innerHTML = `
        <h2>Project Details</h2>
        <p>Loading project ${projectId}...</p>
    `;
    
    modal.style.display = 'flex';
}
