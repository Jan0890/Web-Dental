document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Add click event to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotate testimonials
    let carouselInterval = setInterval(nextTestimonial, 5000);
    
    // Pause on hover
    const carouselContainer = document.querySelector('.testimonials-carousel');
    
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextTestimonial, 5000);
    });
    
    // Scroll Reveal Animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about-content, .about-image, .contact-content, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const submitBtn = document.querySelector('.submit-btn');
            
            // Simple validation
            let isValid = true;
            
            if (name.value.trim() === '') {
                isValid = false;
                setErrorFor(name, 'El nombre es requerido');
            } else {
                setSuccessFor(name);
            }
            
            if (email.value.trim() === '') {
                isValid = false;
                setErrorFor(email, 'El correo electrónico es requerido');
            } else if (!isValidEmail(email.value.trim())) {
                isValid = false;
                setErrorFor(email, 'Ingrese un correo electrónico válido');
            } else {
                setSuccessFor(email);
            }
            
            if (phone.value.trim() === '') {
                isValid = false;
                setErrorFor(phone, 'El teléfono es requerido');
            } else if (!isValidPhone(phone.value.trim())) {
                isValid = false;
                setErrorFor(phone, 'Ingrese un número de teléfono válido');
            } else {
                setSuccessFor(phone);
            }
            
            if (message.value.trim() === '') {
                isValid = false;
                setErrorFor(message, 'El mensaje es requerido');
            } else {
                setSuccessFor(message);
            }
            
            if (isValid) {
                // Simulate form submission
                submitBtn.innerHTML = 'Enviando <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Mensaje Enviado <i class="fas fa-check"></i>';
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = 'Enviar Mensaje <i class="fas fa-paper-plane"></i>';
                        submitBtn.disabled = false;
                        
                        // Show success message
                        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    function setErrorFor(input, message) {
        const formGroup = input.parentElement;
        const errorText = formGroup.querySelector('.error-text') || document.createElement('small');
        
        errorText.className = 'error-text';
        errorText.textContent = message;
        
        if (!formGroup.querySelector('.error-text')) {
            formGroup.appendChild(errorText);
        }
        
        formGroup.classList.add('error');
    }
    
    function setSuccessFor(input) {
        const formGroup = input.parentElement;
        const errorText = formGroup.querySelector('.error-text');
        
        if (errorText) {
            errorText.remove();
        }
        
        formGroup.classList.remove('error');
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[0-9\-\+]{9,15}$/.test(phone);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});