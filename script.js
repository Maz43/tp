// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active Link Switching
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations (Intersection Observer)
const animateElements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => observer.observe(el));

// Animated Counters
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

const counterObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) counterObserver.observe(statsSection);

// BMI Calculator
const bmiForm = document.getElementById('bmi-form');
if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let heightInput = parseFloat(document.getElementById('bmi-height').value);
        let height = 0;
        if (heightInput < 3) {
            height = heightInput; // meters
        } else if (heightInput < 10) {
            height = heightInput * 0.3048; // feet
        } else {
            height = heightInput / 100; // cm
        }
        const weight = parseFloat(document.getElementById('bmi-weight').value);
        
        if (height > 0 && weight > 0) {
            const bmi = (weight / (height * height)).toFixed(1);
            let status = '';
            
            if (bmi < 18.5) status = 'Underweight';
            else if (bmi >= 18.5 && bmi <= 24.9) status = 'Healthy Weight';
            else if (bmi >= 25 && bmi <= 29.9) status = 'Overweight';
            else status = 'Obese';
            
            document.getElementById('bmi-value').innerText = bmi;
            document.getElementById('bmi-status').innerText = status;
            
            const resultDiv = document.getElementById('bmi-result');
            resultDiv.classList.remove('hidden');
        }
    });
}

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    const slider = document.getElementById('testimonial-slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

setInterval(() => {
    if(slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}, 5000);

// Contact Form Submit
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('form-success').style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
            document.getElementById('form-success').style.display = 'none';
        }, 3000);
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
