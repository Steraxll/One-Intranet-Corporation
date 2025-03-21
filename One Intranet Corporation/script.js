// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('navMenu');
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');

// Toggle Menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'translateY(11px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-11px) rotate(-45deg)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cookie Consent
acceptCookiesBtn.addEventListener('click', () => {
    // Hide cookie consent
    cookieConsent.style.display = 'none';
    
    // Set cookie to remember user's choice
    document.cookie = "cookiesAccepted=true; max-age=" + 60*60*24*365; // 1 year
});

// Check if user already accepted cookies
function checkCookieConsent() {
    const cookiesAccepted = document.cookie.split(';').some((item) => item.trim().startsWith('cookiesAccepted='));
    
    if (cookiesAccepted) {
        cookieConsent.style.display = 'none';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize functions on page load
window.addEventListener('load', () => {
    checkCookieConsent();
    
    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.background-image').style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// Basic animations for elements appearing on scroll
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '100';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add class when element is in view
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    });
};

observeElements();

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hero-title').classList.add('text-focus-in');
    document.querySelector('.hero-tagline').classList.add('text-focus-in');
});
