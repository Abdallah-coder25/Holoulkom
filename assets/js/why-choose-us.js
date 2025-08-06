document.addEventListener('DOMContentLoaded', () => {
    // Initialize statistics counters
    initializeCounters();
    
    // Initialize reason card animations
    initializeReasonCards();
});

function initializeCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-value'));
                animateCounter(target, endValue);
                observer.unobserve(target);
            }
        });
    }, options);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, endValue) {
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = endValue / (duration / 16); // 60fps

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
            currentValue = endValue;
            clearInterval(counter);
        }
        element.textContent = Math.round(currentValue).toLocaleString();
    }, 16);
}

function initializeReasonCards() {
    const cards = document.querySelectorAll('.reason-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}
