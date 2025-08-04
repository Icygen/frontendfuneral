// DOM Elements
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const loginForm = document.querySelector('form');
const userTypeButtons = document.querySelectorAll('.user-type-btn');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email-address');
const contactForm = document.querySelector('.contact-form form');
const navLinks = document.querySelectorAll('nav a');
const scrollToTopButton = document.createElement('button');
const mapContainer = document.querySelector('.map-container');
// const heroContent = document.getElementById('heroContent'); // Not needed for parallax anymore, but keep the ID in HTML for potential future use or identification

// Initialize scroll to top button
scrollToTopButton.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
`;
scrollToTopButton.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50'; // Added z-index
document.body.appendChild(scrollToTopButton);

// Mobile Menu Toggle with Animation and Backdrop
if (mobileMenuButton && mobileMenu) {
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
        // Add/remove a class for CSS transitions/animations if needed
        // mobileMenu.classList.toggle('mobile-menu-active');
        
        // Toggle backdrop
        const existingBackdrop = document.getElementById('mobile-menu-backdrop');
        if (!mobileMenu.classList.contains('hidden')) {
            if (!existingBackdrop) {
                const backdrop = document.createElement('div');
                backdrop.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';
                backdrop.id = 'mobile-menu-backdrop';
                document.body.appendChild(backdrop);
                
                backdrop.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    // mobileMenu.classList.remove('mobile-menu-active');
                    backdrop.remove();
                });
            }
        } else {
            if (existingBackdrop) existingBackdrop.remove();
        }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                // mobileMenu.classList.remove('mobile-menu-active');
                const backdrop = document.getElementById('mobile-menu-backdrop');
                if (backdrop) backdrop.remove();
            }
        });
    });
}

// Add smooth reveal animation for sections using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Adjust threshold as needed
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in'); // Apply fade-in animation class
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Target elements/sections for fade-in animation on scroll
document.querySelectorAll('section, .animate-on-scroll').forEach(element => {
    element.classList.add('opacity-0'); // Start hidden (add this class in CSS too)
    observer.observe(element);
});

// Form Validation and Enhancement (Login Form)
if (loginForm) {
    const formGroups = loginForm.querySelectorAll('.form-group');
    let selectedUserType = null; // Keep track of selected user type

    // Find and set initially selected user type if any (e.g., from a previous state)
    userTypeButtons.forEach(button => {
        if (button.classList.contains('active')) {
            selectedUserType = button.dataset.type;
        }
    });

    function validateLoginForm() {
        let isValid = true;
        formGroups.forEach(group => {
            const input = group.querySelector('input');
            const errorMessage = group.querySelector('.error-message');
            
            if (input.required && !input.value.trim()) {
                showError(input, errorMessage, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, errorMessage, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    hideError(input, errorMessage);
                }
            } else {
                hideError(input, errorMessage);
            }
        });

        if (!selectedUserType) {
            // Assuming userTypeButtons exist and are required for login
            if (userTypeButtons && userTypeButtons.length > 0) {
                 alert('Please select a user type'); // Consider a less intrusive message
                 isValid = false;
            }
        }

        return isValid;
    }

    function showError(input, errorElement, message) {
        input.classList.add('border-red-500', 'input-error'); // Add input-error class
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideError(input, errorElement) {
        input.classList.remove('border-red-500', 'input-error'); // Remove input-error class
        input.classList.add('border-gray-300'); // Reset to default border
        errorElement.classList.add('hidden');
        errorElement.textContent = ''; // Clear error message
    }

    // Real-time validation for login form inputs
    formGroups.forEach(group => {
        const input = group.querySelector('input');
        const errorMessage = group.querySelector('.error-message');
        
        if (input) { // Ensure input element exists
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            showError(input, errorMessage, 'Please enter a valid email address');
                        } else {
                            hideError(input, errorMessage);
                        }
                    } else {
                         // Basic validation for other required fields on input
                        if (input.required && !input.value.trim()) {
                             showError(input, errorMessage, 'This field is required');
                        } else {
                             hideError(input, errorMessage);
                        }
                    }
                } else if (input.required) {
                    showError(input, errorMessage, 'This field is required');
                } else {
                    hideError(input, errorMessage);
                }
            });
        }
    });


    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateLoginForm()) {
            return;
        }

        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
        `;
        submitButton.disabled = true;
        submitButton.classList.add('loading'); // Add loading class for styling

        try {
            // Simulate login (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Redirect based on user type
            if (selectedUserType === 'admin') {
                console.log('Redirecting to admin dashboard...');
                window.location.href = '/admin/dashboard'; // Example redirect
            } else {
                 console.log('Redirecting to customer dashboard...');
                window.location.href = '/dashboard'; // Example redirect
            }
        } catch (error) {
            // Show error message
            console.error('Login error:', error);
            // Find or create a div to display form-wide errors
            let formErrorDiv = loginForm.querySelector('.form-error-message');
            if (!formErrorDiv) {
                formErrorDiv = document.createElement('div');
                formErrorDiv.className = 'form-error-message mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded';
                loginForm.insertBefore(formErrorDiv, loginForm.firstChild);
            }
            formErrorDiv.textContent = 'Invalid email or password. Please try again.';
            formErrorDiv.classList.remove('hidden');
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                formErrorDiv.classList.add('hidden');
                 formErrorDiv.textContent = ''; // Clear message
            }, 5000);
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
             submitButton.classList.remove('loading');
        }
    });
}

// Password Visibility Toggle (Moved from login.html script block)
// Ensure the button with onclick="togglePasswordVisibility()" exists in HTML
window.togglePasswordVisibility = function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        // Optional: Toggle an icon here if you have an eye icon SVG inside the button
        // const icon = document.querySelector('#password + button svg');
        // if (icon) { /* toggle icon classes */ }
    }
};


// User Type Selection (Moved and adapted from login.html script block)
// Assumes userTypeButtons are elements that should have an 'active' state
userTypeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default button click behavior
        const type = button.dataset.type; // Get the user type from data attribute
        
        // Update the selectedUserType variable
        selectedUserType = type;

        // Remove active class and associated styles from all buttons
        userTypeButtons.forEach(btn => {
            btn.classList.remove('bg-blue-50', 'border-blue-500', 'text-blue-700', 'hover:bg-blue-100');
            btn.classList.add('bg-white', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50');
        });
        
        // Add active class and associated styles to the clicked button
        button.classList.add('bg-blue-50', 'border-blue-500', 'text-blue-700', 'hover:bg-blue-100');
        button.classList.remove('bg-white', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50');

        console.log(`Selected user type: ${selectedUserType}`);

        // Trigger re-validation of the form if user type is a required field
        if (loginForm) { // Check if loginForm exists before calling validateLoginForm
             validateLoginForm();
        }
    });
});

// Social Login Handler (Moved from login.html script block)
// Ensure buttons with onclick="handleSocialLogin('provider')" exist in HTML
window.handleSocialLogin = function(provider) {
    // Implement social login logic here
    console.log(`Logging in with ${provider}...`);
    // Replace with actual social login initiation (e.g., redirect to OAuth provider)
    // For demonstration, you might show a message or modal
    alert(`Redirecting to ${provider} login... (Simulated)`);
};


// Service Filtering (Moved and adapted from services.html script block)
const serviceSearch = document.getElementById('serviceSearch');
const serviceCategory = document.getElementById('serviceCategory');
const priceRange = document.getElementById('priceRange');
const serviceCards = document.querySelectorAll('.service-card'); // Target service-card for filtering

if (serviceSearch && serviceCategory && priceRange && serviceCards.length > 0) {

    function filterServices() {
        const searchTerm = serviceSearch.value.toLowerCase();
        const category = serviceCategory.value;
        const price = priceRange.value;

        serviceCards.forEach(card => {
            // Ensure data attributes exist on service cards
            const titleElement = card.querySelector('h3');
            const cardCategory = card.dataset.category;
            const cardPrice = parseInt(card.dataset.price);

            const title = titleElement ? titleElement.textContent.toLowerCase() : '';

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = !category || cardCategory === category;
            const matchesPrice = !price || isInPriceRange(cardPrice, price);

            card.style.display = matchesSearch && matchesCategory && matchesPrice ? 'block' : 'none';
        });
    }

    function isInPriceRange(price, range) {
        switch (range) {
            case '0-1000':
                return price <= 1000;
            case '1000-5000':
                return price > 1000 && price <= 5000;
            case '5000-10000':
                return price > 5000 && price <= 10000;
            case '10000+':
                return price > 10000;
            default:
                return true;
        }
    }

    serviceSearch.addEventListener('input', filterServices);
    serviceCategory.addEventListener('change', filterServices);
    priceRange.addEventListener('change', filterServices);

    // Initial filter on page load
    filterServices();
}


// Service Details Modal (Moved and adapted from services.html script block)
const serviceModal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementById('closeModal');

// Ensure modal elements exist
if (serviceModal && modalTitle && modalDescription && closeModal) {

    const serviceDetails = {
        'pre-planning': {
            title: 'Pre-Planning Service',
            description: 'Our pre-planning service allows you to make arrangements in advance, ensuring your wishes are carried out exactly as you want them. This includes selecting your preferred services, casket, and other details. Benefits include peace of mind, reduced stress for loved ones, and the ability to lock in current prices.'
        },
        'memorial': {
            title: 'Memorial Service',
            description: 'A memorial service is a ceremony that honors and celebrates the life of your loved one. We offer personalized services that can include music, readings, photo displays, and other meaningful elements. Our experienced staff will help you create a service that truly reflects the life and personality of your loved one.'
        },
        'grief-support': {
            title: 'Grief Support',
            description: 'Our grief support services provide professional counseling and support groups to help you through the grieving process. We offer both individual and group sessions, led by experienced counselors who specialize in grief and loss. These services are available to family members and friends of the deceased.'
        }
        // Add details for service packages here if needed for the modal
         ,
        'basic': {
             title: 'Basic Package',
             description: 'Details for the Basic Package...'
        },
        'standard': {
             title: 'Standard Package',
             description: 'Details for the Standard Package...'
        },
        'premium': {
             title: 'Premium Package',
             description: 'Details for the Premium Package...'
        }
    };

    // Expose function to global scope if called via onclick in HTML
    window.showServiceDetails = function(serviceId) {
        const service = serviceDetails[serviceId];
        if (service) {
            modalTitle.textContent = service.title;
            modalDescription.textContent = service.description;
            serviceModal.classList.remove('hidden');
        }
    };

    closeModal.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
    });

    // Close modal when clicking outside the modal content
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.classList.add('hidden');
        }
    });

     // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !serviceModal.classList.contains('hidden')) {
            serviceModal.classList.add('hidden');
        }
    });
}


// Package Selection (Moved from services.html script block)
// Ensure buttons with onclick="selectPackage('packageType')" exist in HTML
window.selectPackage = function(packageType) {
    // Implement package selection logic here
    console.log(`Selected package: ${packageType}`);
    // You can redirect to a booking page or show a booking modal
    alert(`You selected the ${packageType} package! (Simulated)`);
};

// Scroll-based animations (Moved and adapted from services.html script block)
const animateObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Adjust threshold as needed

// Observe elements with data-animate="fade-up"
document.querySelectorAll('[data-animate="fade-up"]').forEach(element => {
     element.classList.add('opacity-0', 'translate-y-10'); // Ensure initial state
    animateObserver.observe(element);
});


// --- End of Consolidated JavaScript ---



// Contact Form Handling with Validation
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    inputs.forEach(input => {
        // Add an error message element placeholder if it doesn't exist
        if (!input.parentElement.querySelector('.error-message')) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-600 text-sm mt-1';
            input.parentElement.appendChild(errorElement);
        }

        // Real-time validation on input
        input.addEventListener('input', () => {
            validateInput(input);
        });

        // Focus and blur effects + validation on blur
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateInput(input); // Validate on blur as well
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all inputs on submit
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div>'; // Use CSS spinner
        submitBtn.disabled = true;
        submitBtn.classList.add('loading'); // Add loading class for styling

        try {
            // Simulate form submission (replace with actual fetch/ajax call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // On success:
            showFormMessage('Thank you for your message. We will get back to you soon.', 'success');
            contactForm.reset(); // Clear form fields
            inputs.forEach(input => { // Reset validation styles
                input.classList.remove('input-error', 'input-success');
                const errorElement = input.parentElement.querySelector('.error-message');
                if (errorElement) errorElement.textContent = ''; // Clear error messages
            });
            
        } catch (error) {
            // On error:
            console.error('Contact form submission error:', error);
            showFormMessage('An error occurred. Please try again later.', 'error');
        } finally {
            // Reset button state regardless of success or error
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
}

// User Type Selection (for login/signup form - if applicable)
// Assumes userTypeButtons are radio buttons or similar elements
userTypeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default button click behavior if not radio/checkbox
        // Remove active class and associated styles from all buttons
        userTypeButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-50', 'border-blue-500', 'text-blue-700'));
        // Add active class and associated styles to the clicked button
        button.classList.add('active', 'bg-blue-50', 'border-blue-500', 'text-blue-700');
        // You might want to update a hidden input field with the selected type
        // const userTypeInput = document.getElementById('userType');
        // if (userTypeInput) userTypeInput.value = button.dataset.type;
    });
});

// Input Field Animations (using CSS classes for focus/blur effects managed by JS)
// The logic for adding/removing 'focused' class is already handled in form validation sections.
// Ensure your CSS has styles for .focused class within .input-group

// Map container interaction (simple scale effect on hover)
if (mapContainer) {
    mapContainer.addEventListener('mouseenter', () => {
        mapContainer.style.transform = 'scale(1.02)';
        mapContainer.style.transition = 'transform 0.3s ease'; // Ensure smooth transition
    });

    mapContainer.addEventListener('mouseleave', () => {
        mapContainer.style.transform = 'scale(1)';
    });
}

// Initialize tooltips (simple implementation using data-tooltip attribute)
document.querySelectorAll('[data-tooltip]').forEach(element => {
    let tooltipElement;
    element.addEventListener('mouseenter', () => {
        const tooltipText = element.getAttribute('data-tooltip');
        if (tooltipText) {
            tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip'; // Use a CSS class for styling
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement); // Append to body to avoid z-index issues

            // Position the tooltip near the element
            const elementRect = element.getBoundingClientRect();
            const tooltipRect = tooltipElement.getBoundingClientRect();

            tooltipElement.style.position = 'absolute';
            tooltipElement.style.top = `${elementRect.top - tooltipRect.height - 5 + window.scrollY}px`;
            tooltipElement.style.left = `${elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2) + window.scrollX}px`;
            tooltipElement.style.zIndex = 100; // Ensure tooltip is on top
            tooltipElement.style.opacity = 1; // Make visible
        }
    });

    element.addEventListener('mouseleave', () => {
        if (tooltipElement) {
            tooltipElement.remove();
        }
    });

    // Optional: Remove tooltip on scroll to prevent misplaced tooltips
    // window.addEventListener('scroll', () => {
    //     if (tooltipElement) {
    //          tooltipElement.remove();
    //     }
    // });

});

// Helper Functions for Validation and Messages
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
     // Basic phone validation (adjust regex as needed - allows numbers, spaces, hyphens, and optional leading +)
    const re = /^\+?[0-9\s-]{7,20}$/;
    return re.test(String(phone));
}

// Validate individual input and provide feedback
function validateInput(input) {
    const value = input.value.trim();
    const parentGroup = input.parentElement;
    const errorElement = parentGroup.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    // Clear previous messages/styles
    input.classList.remove('input-error', 'input-success');
    if (errorElement) errorElement.textContent = '';
    parentGroup.classList.remove('input-error-group', 'input-success-group'); // Use group classes for parent styling

    if (input.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (input.type === 'tel' && value && !validatePhone(value)) { // Optional phone validation, only if value is entered
         isValid = false;
         errorMessage = 'Please enter a valid phone number';
    } else if (input.type === 'password' && input.id === 'password' && value.length < 6) { // Specific validation for password input
         isValid = false;
         errorMessage = 'Password must be at least 6 characters';
    }
    // Add more validation rules for other input types or specific fields here

    // Apply validation styles and message
    if (!isValid) {
        input.classList.add('input-error');
        if (errorElement) errorElement.textContent = errorMessage;
        parentGroup.classList.add('input-error-group');
    } else if (value) { // Apply success style only if the field has a value and is valid
        input.classList.add('input-success');
        parentGroup.classList.add('input-success-group');
    }

    return isValid;
}

// Function to show form messages (error or success) at the top of the form
function showFormMessage(message, type) {
    const form = contactForm || loginForm; // Target the appropriate form
    if (!form) return; // Exit if no form is found

    // Remove any existing form messages within the form container
     const formContainer = form.parentElement; // Assuming form is wrapped in a container
     const existingMessage = formContainer.querySelector('.form-message');
     if (existingMessage) {
         existingMessage.remove();
     }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message px-4 py-3 rounded relative mb-4 ${type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the form container
    formContainer.insertBefore(messageDiv, form);
    
    // Automatically remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Smooth Scroll for Navigation Links (using data-scroll for sections)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Check if the href is just '#' and prevent default behavior
        if (targetId === '#') {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Scroll to the top of the section
            });
            // Close mobile menu after clicking a link (if open)
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const backdrop = document.getElementById('mobile-menu-backdrop');
                if (backdrop) backdrop.remove();
            }
        }
    });
});

// Active navigation link highlighting (considering scroll position for sections)
// This is a more advanced feature and requires more complex logic with IntersectionObserver or scroll listeners
// For now, the simple active class based on URL is kept.
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Normalize paths for comparison (e.g., remove leading/trailing slashes, add index.html if root)
        const normalizedCurrentPath = currentPath === '/' ? '/index.html' : currentPath.replace(/\/$/, '');
        const normalizedLinkPath = linkPath === '/' ? '/index.html' : linkPath.replace(/\/$/, '');

        if (normalizedLinkPath === normalizedCurrentPath) {
            link.classList.add('text-blue-600'); // Use primary color for active link
            link.classList.add('font-semibold'); // Optional: make active link bold
        } else {
            link.classList.remove('text-blue-600');
            link.classList.remove('font-semibold');
        }
    });
}

// Call setActiveNavLink initially and on page load/hash change
setActiveNavLink();
window.addEventListener('load', setActiveNavLink);
window.addEventListener('hashchange', setActiveNavLink);

// Add floating animation to important elements (applied via CSS classes)
// Add pulse animation to CTAs (applied via CSS classes)

// Scroll to top button functionality
window.addEventListener('scroll', () => {
    // Show button when user scrolls down 300px from the top
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.remove('opacity-0');
        scrollToTopButton.classList.add('opacity-100');
    } else {
        scrollToTopButton.classList.remove('opacity-100');
        scrollToTopButton.classList.add('opacity-0');
    }
});

// Smooth scroll to top when button is clicked
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Optional: Add more general enhancements here, like button ripple effects, image lazy loading, etc.

// Example of a simple ripple effect for buttons (requires additional CSS)
// document.querySelectorAll('.ripple-effect').forEach(button => {
//     button.addEventListener('click', function(e) {
//         const x = e.clientX - e.target.getBoundingClientRect().left;
//         const y = e.clientY - e.target.getBoundingClientRect().top;
//         const ripple = document.createElement('span');
//         ripple.style.left = x + 'px';
//         ripple.style.top = y + 'px';
//         this.appendChild(ripple);
//         ripple.addEventListener('animationend', () => {
//             ripple.remove();
//         });
//     });
// });
