document.addEventListener('DOMContentLoaded', () => {
    initializePartnerCards();
    initializePartnerSearch();
    initializeFormHandling();
});

function initializePartnerCards() {
    const partnerCards = document.querySelectorAll('.partner-card');
    
    partnerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const logo = card.querySelector('.partner-logo');
            if (logo) {
                logo.style.filter = 'grayscale(0%)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const logo = card.querySelector('.partner-logo');
            if (logo) {
                logo.style.filter = 'grayscale(100%)';
            }
        });
    });
}

function initializePartnerSearch() {
    const searchInput = document.querySelector('.partner-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        const partners = document.querySelectorAll('.partner-card');
        
        partners.forEach(partner => {
            const name = partner.getAttribute('data-name').toLowerCase();
            const category = partner.getAttribute('data-category').toLowerCase();
            
            if (name.includes(searchTerm) || category.includes(searchTerm)) {
                partner.style.display = 'flex';
                setTimeout(() => {
                    partner.style.opacity = '1';
                    partner.style.transform = 'translateY(0)';
                }, 10);
            } else {
                partner.style.opacity = '0';
                partner.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    partner.style.display = 'none';
                }, 300);
            }
        });
    }, 300));
}

// Form handling
function initializeFormHandling() {
    const partnershipForm = document.getElementById('partnershipForm');
    
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(partnershipForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const required = ['companyName', 'contactPerson', 'email', 'phone', 'partnershipType', 'message'];
            
            required.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById('email');
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            }
            
            // Phone validation
            const phoneRegex = /^[+]?[\d\s-]{8,}$/;
            const phoneInput = document.getElementById('phone');
            if (!phoneRegex.test(phoneInput.value)) {
                isValid = false;
                phoneInput.classList.add('error');
            }
            
            if (isValid) {
                // Show success message
                const submitBtn = partnershipForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Application Submitted';
                submitBtn.style.backgroundColor = '#28a745';
                submitBtn.disabled = true;
                
                // Reset form after delay
                setTimeout(() => {
                    partnershipForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
        
        // Real-time validation
        const inputs = partnershipForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.remove('error');
                }
            });
        });
    }
}

// Helper function for efficient search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
