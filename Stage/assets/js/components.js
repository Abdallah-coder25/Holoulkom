// Simple function to load HTML components
async function loadComponent(elementId, componentPath) {
    console.log(`Loading component: ${elementId} from ${componentPath}`);
    try {
        // Check if element exists first
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element with id "${elementId}" not found`);
        }

        // Get the correct path
        const resolvedPath = getComponentPath(componentPath);
        console.log(`Resolved path: ${resolvedPath}`);

        // Show loading state
        element.innerHTML = '<div class="component-loading">Loading...</div>';

        // Fetch the component
        const response = await fetch(resolvedPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.status} ${response.statusText}`);
        }

        // Get the HTML content
        const html = await response.text();
        if (!html.trim()) {
            throw new Error('Component content is empty');
        }
        
        console.log(`Successfully loaded component: ${elementId}`);

        // Insert the HTML
        element.innerHTML = html;
        
        // Initialize component-specific functionality
        if (elementId === 'header-component') {
            console.log('Initializing navigation...');
            initializeNavigation();
        }
        if (elementId === 'footer-component') {
            console.log('Updating copyright year...');
            updateCopyrightYear();
        }

        return true;
    } catch (error) {
        console.error(`Error loading component: ${componentPath}`, error);
        // Show error in the component container
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="component-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Failed to load component. Please try:</p>
                    <button onclick="loadComponents()">Reload Components</button>
                </div>
            `;
        }
        return false;
    }
}

// Function to load all components
function loadComponents() {
    console.log('Loading components...');
    
    const headerComponent = document.getElementById('header-component');
    const footerComponent = document.getElementById('footer-component');
    
    if (headerComponent) {
        fetch('assets/components/header.html')
            .then(response => response.text())
            .then(html => {
                headerComponent.innerHTML = html;
                // Initialize navigation after header is loaded
                initializeNavigation();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                headerComponent.innerHTML = '<div class="component-error">Unable to load header. <button onclick="loadComponents()">Try Again</button></div>';
            });
    }
    
    if (footerComponent) {
        fetch('assets/components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerComponent.innerHTML = html;
                // Update copyright year after footer is loaded
                updateCopyrightYear();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerComponent.innerHTML = '<div class="component-error">Unable to load footer. <button onclick="loadComponents()">Try Again</button></div>';
            });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);

// Initialize navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.nav-container');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.getElementById('navLinks');
    
    // Handle scroll events for header
    window.addEventListener('scroll', () => {
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

    // Mobile menu functionality
    if (menuBtn) {
        // Toggle menu when button is clicked
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
            
            // Toggle menu icon
            const icon = menuBtn.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Update copyright year
function updateCopyrightYear() {
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Function to toggle mobile menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Function to fix image paths in loaded components
function fixImagePaths() {
    const images = document.querySelectorAll('img[src^="assets/"]');
    images.forEach(img => {
        const currentSrc = img.getAttribute('src');
        if (currentSrc.startsWith('assets/')) {
            img.src = currentSrc; // This will resolve relative to the page location
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-component', 'assets/components/header.html');
    loadComponent('footer-component', 'assets/components/footer.html');
});
