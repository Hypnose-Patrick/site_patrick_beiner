/**
 * PATRICK BEINER - SITE WEB
 * Fichier JavaScript principal
 */

// ============================================
// NAVIGATION MOBILE
// ============================================
function toggleMobileNav() {
    const mobileNav = document.querySelector('.nav-mobile');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

// Fermer le menu mobile lors du clic sur un lien
document.addEventListener('DOMContentLoaded', function() {
    const mobileLinks = document.querySelectorAll('.nav-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileNav = document.querySelector('.nav-mobile');
            if (mobileNav) {
                mobileNav.classList.remove('active');
            }
        });
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignorer les liens avec # uniquement
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// MARQUER LA PAGE ACTIVE DANS LA NAVIGATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// ============================================
// VALIDATION FORMULAIRE DE CONTACT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[action*="contact"]');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');

            // Validation basique
            if (emailInput && !emailInput.value.includes('@')) {
                e.preventDefault();
                alert('Veuillez entrer une adresse email valide.');
                emailInput.focus();
                return false;
            }

            if (messageInput && messageInput.value.trim().length < 10) {
                e.preventDefault();
                alert('Votre message doit contenir au moins 10 caractères.');
                messageInput.focus();
                return false;
            }
        });
    }
});

// ============================================
// LAZY LOADING DES IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// ANIMATION AU SCROLL (FADE IN)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});

// ============================================
// FERMER LE MENU MOBILE AU CLIC EXTERIEUR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        const mobileNav = document.querySelector('.nav-mobile');
        const navToggle = document.querySelector('.nav-toggle');

        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
            }
        }
    });
});

// ============================================
// CONSOLE INFO
// ============================================
console.log('🌟 Site web Patrick Beiner - Hypnose et Coaching');
console.log('📧 Contact: patrick@pnl-formation.org');
