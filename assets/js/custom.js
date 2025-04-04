// Custom JavaScript for NikhilNeha's Spoken Hindi Classes Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFaqAccordion();
    initBackToTop();
    initSmoothScroll();
    initFormValidation();
    highlightCurrentNavItem();
    initScrollReveal();
    initParallaxEffect();
    initNavbarEffects();
    initHoverEffects();

    // Add scroll effect to navbar
    const navbar = document.querySelector('.compact-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Add active class to current section
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});

// FAQ Accordion functionality with smooth animations
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    let activeQuestion = null;
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isExpanding = !this.classList.contains('active');
            
            // Close currently open question if exists
            if (activeQuestion && activeQuestion !== this) {
                activeQuestion.classList.remove('active');
                const activeAnswer = activeQuestion.nextElementSibling;
                activeAnswer.style.maxHeight = null;
                activeAnswer.classList.remove('show');
            }
            
            // Toggle current question
            this.classList.toggle('active');
            
            if (isExpanding) {
                answer.classList.add('show');
                answer.style.maxHeight = answer.scrollHeight + "px";
                activeQuestion = this;
            } else {
                answer.style.maxHeight = null;
                answer.classList.remove('show');
                activeQuestion = null;
            }
        });
    });
}

// Enhanced back to top button with smooth fade and scroll progress
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    const progressPath = document.querySelector('.scroll-progress path');
    const pathLength = progressPath?.getTotalLength() || 0;
    
    if (progressPath) {
        progressPath.style.transition = 'none';
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = 'stroke-dashoffset 50ms ease-in-out';
    }
    
    if (backToTopButton) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            
            // Update scroll progress
            if (progressPath) {
                const drawLength = pathLength * scrollPercent;
                progressPath.style.strokeDashoffset = pathLength - drawLength;
            }
            
            // Show/hide button with direction-aware animation
            if (scrollTop > 300) {
                backToTopButton.classList.add('visible');
                if (scrollTop > lastScrollTop) {
                    backToTopButton.classList.add('scroll-down');
                } else {
                    backToTopButton.classList.remove('scroll-down');
                }
            } else {
                backToTopButton.classList.remove('visible');
            }
            
            lastScrollTop = scrollTop;
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Enhanced smooth scrolling with dynamic offset calculation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar?.offsetHeight || 0;
                const offset = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const headerOffset = navbar?.classList.contains('navbar-short') ? navbarHeight : navbarHeight + 20;
                
                window.scrollTo({
                    top: offset - headerOffset,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Parallax effect for hero section and other elements
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    let ticking = false;
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.2;
            const rect = element.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            if (rect.top < viewHeight && rect.bottom > 0) {
                const scrolled = window.pageYOffset;
                const parallaxDist = scrolled * speed;
                // Remove the skew effect as it can cause visual distortion
                element.style.transform = `translate3d(0, ${parallaxDist}px, 0)`;
            }
        });
        
        ticking = false;
    }
    
    let prevScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
        prevScrollY = window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Enhanced navbar effects
function initNavbarEffects() {
    const navbar = document.querySelector('.slim-navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Add/remove navbar-scrolled class
                if (currentScroll > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
                
                // Hide/show navbar on scroll direction
                if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Initialize hover effects
function initHoverEffects() {
    // Card hover effects
    document.querySelectorAll('.item-wrapper').forEach(card => {
        card.addEventListener('mousemove', handleCardHover);
        card.addEventListener('mouseleave', resetCardTilt);
    });
    
    // Button hover effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', handleButtonHover);
        button.addEventListener('mouseleave', resetButtonEffect);
    });
}

function handleCardHover(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetCardTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

function handleButtonHover(e) {
    const button = this;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
}

function resetButtonEffect() {
    this.style.setProperty('--x', '50%');
    this.style.setProperty('--y', '50%');
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous invalid states
            contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    // Optionally add error messages next to fields
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }

            if (isValid) {
                // Simulate form submission (replace with actual submission logic)
                console.log('Form data:', new FormData(contactForm));
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid')); // Clear errors on success
            } else {
                // Focus the first invalid field for better UX
                const firstInvalid = contactForm.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
                // Consider showing a more integrated error message instead of alert
                // alert('Please fill in all required fields correctly.');
            }
        });

        // Remove invalid state on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    input.classList.remove('is-invalid');
                }
            });
        });
    }
}

// Highlight current navigation item
function highlightCurrentNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link[href^="#"]'); // Select only links starting with #
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80; // Get navbar height dynamically

    function updateActiveLink() {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + navbarHeight + 50; // Adjust offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink); // Run on load as well
}

// Scroll Reveal Animation functionality
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (!revealElements.length) return; // Exit if no elements found

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after revealing to improve performance
                // observer.unobserve(entry.target);
            }
            // Optional: Add logic to hide again when scrolling up
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust margin to trigger slightly earlier/later
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Add the reveal class to sections that need it (can be done in HTML too)
    // Example: Add to services, FAQ, mentor, contact form sections
    document.querySelectorAll('#features4-2, #content14-3, #testimonials3-4, #contact-form').forEach(section => {
        // Add class to direct children or specific elements within the section
        section.querySelectorAll('.item-wrapper, .faq-item, .user, .contact-form > div').forEach(el => {
             // Check if element doesn't already have the class
             if (!el.classList.contains('reveal-on-scroll')) {
                 el.classList.add('reveal-on-scroll');
                 revealObserver.observe(el); // Observe newly added elements
             }
        });
         // Add to section titles too
         const title = section.querySelector('.mbr-section-title');
         if (title && !title.classList.contains('reveal-on-scroll')) {
             title.classList.add('reveal-on-scroll');
             revealObserver.observe(title);
         }
    });
}

// Note: The JS hover effect for service cards was removed as it's now handled by CSS.
// Note: The copyright year update was removed as it's handled by PHP/server-side or simple HTML script tag in index.html.
