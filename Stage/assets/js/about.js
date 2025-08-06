// Navigation menu toggle
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations and event listeners
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-section');
    const aboutText = document.querySelector('.about-text');
    
    observer.observe(aboutSection);
    observer.observe(aboutText);

    // Add initial visibility after a short delay for page load animation
    setTimeout(() => {
        aboutSection.classList.add('visible');
        aboutText.classList.add('visible');
    }, 300);

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
