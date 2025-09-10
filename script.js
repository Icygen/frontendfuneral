// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            history.pushState(null, null, targetId);
        }
    });
});

// Sticky Header
const header = document.querySelector('.main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 10) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Hide/show header on scroll
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Here you would typically send the email to your server
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .package-card, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate-fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger animations for elements in viewport on load
    animateOnScroll();
    
    // Add animation class to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// 3D Viewer Simulation (Placeholder functionality)
const setup3DViewer = () => {
    const modelSelect = document.querySelector('.viewer-controls select:first-of-type');
    const materialSelect = document.querySelector('.viewer-controls select:nth-of-type(2)');
    const finishSelect = document.querySelector('.viewer-controls select:last-of-type');
    const viewerPlaceholder = document.querySelector('.viewer-placeholder');
    
    if (modelSelect && materialSelect && finishSelect && viewerPlaceholder) {
        const updateViewer = () => {
            const model = modelSelect.value;
            const material = materialSelect.value;
            const finish = finishSelect.value;
            
            // In a real implementation, this would update the 3D model
            console.log(`Updating 3D model: ${model} - ${material} - ${finish}`);
            
            // Update placeholder text
            viewerPlaceholder.innerHTML = `
                <i class="fas fa-cube"></i>
                <p>3D Coffin Viewer</p>
                <small>${model} - ${material} - ${finish}</small>
            `;
        };
        
        // Add event listeners
        modelSelect.addEventListener('change', updateViewer);
        materialSelect.addEventListener('change', updateViewer);
        finishSelect.addEventListener('change', updateViewer);
        
        // Initialize
        updateViewer();
    }
};

// Initialize 3D viewer when the page loads
document.addEventListener('DOMContentLoaded', setup3DViewer);

// Package Comparison
const setupPackageComparison = () => {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            packageCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', setupPackageComparison);

// Lazy Loading Images (for future implementation)
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

const makeActive = () => {
    const scrollPosition = window.scrollY + 200; // Adjust based on your header height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.main-nav a[href*=${sectionId}]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.main-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', makeActive);

// Initialize AOS (Animate On Scroll) for elements that should only animate once
const initAOS = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.aos').forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', initAOS);
