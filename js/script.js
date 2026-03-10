document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       Header Scroll Effect
       ========================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const hamburger = document.querySelector('.hamburger');
    const globalNav = document.querySelector('.global-nav');
    const navLinks = document.querySelectorAll('.global-nav a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            globalNav.classList.toggle('is-open');
            
            // Toggle hamburger icon appearance
            const spans = hamburger.querySelectorAll('span');
            if (globalNav.classList.contains('is-open')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'translateY(0) rotate(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'translateY(0) rotate(0)';
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (globalNav.classList.contains('is-open')) {
                globalNav.classList.remove('is-open');
                
                // Reset hamburger icon
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'translateY(0) rotate(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'translateY(0) rotate(0)';
            }
        });
    });

    /* ==========================================
       Intersection Observer for scroll animations
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // elements trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('is-visible');
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to be animated
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Trigger scroll event once on load to catch elements already in viewport
    window.dispatchEvent(new Event('scroll'));
});
