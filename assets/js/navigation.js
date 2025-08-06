document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
});

function initializeNavigation() {
    // Handle scroll events for header
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-right a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize mobile menu
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });

    // Add year to copyright
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
