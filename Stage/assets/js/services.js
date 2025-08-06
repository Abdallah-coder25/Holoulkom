document.addEventListener('DOMContentLoaded', () => {
    initializeServiceCards();
    initializeValueCards();
});

function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.service-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.service-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = '#0066cc';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.color = '#003366';
            }
        });
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
