// ========================================
// Brandbook Origen Sierra Nevada
// Interactive JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // 1. STICKY HEADER & SCROLL EFFECTS
    // ========================================
    const header = document.getElementById('header') || document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // 2. MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');

            // Toggle icon
            const icon = this.querySelector('.material-symbols-outlined');
            if (mobileMenu.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
                icon.textContent = 'menu';
            });
        });
    }

    // ========================================
    // 3. SMOOTH SCROLL & ACTIVE NAVIGATION
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll (fallback for browsers that don't support CSS scroll-behavior)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // ========================================
    // 4. COLOR COPY TO CLIPBOARD
    // ========================================
    const colorCards = document.querySelectorAll('.color-card');

    colorCards.forEach(card => {
        card.addEventListener('click', function () {
            const colorCode = this.getAttribute('data-color');

            if (colorCode) {
                // Copy to clipboard
                navigator.clipboard.writeText(colorCode).then(() => {
                    // Add "copied" class for visual feedback
                    this.classList.add('copied');

                    // Remove "copied" class after 2 seconds
                    setTimeout(() => {
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Error copying to clipboard:', err);
                });
            }
        });
    });

    // ========================================
    // 5. SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // 6. PARALLAX EFFECT (OPTIONAL - Subtle)
    // ========================================
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;

        parallaxElements.forEach(element => {
            const speed = 0.5; // Adjust for subtlety
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ========================================
    // 7. REVEAL ANIMATIONS FOR SECTIONS
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); // Stagger animation
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ========================================
    // 8. LOGO/ICON ROTATION ON SCROLL
    // ========================================
    const logo = document.querySelector('.material-symbols-outlined');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            if (logo) logo.style.transform = 'rotate(180deg)';
        } else {
            // Scrolling up
            if (logo) logo.style.transform = 'rotate(0deg)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // ========================================
    // 9. PRELOAD ANIMATIONS ON PAGE LOAD
    // ========================================
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-animate');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 300);
    });

    // ========================================
    // 10. CONSOLE BRANDING (Easter egg)
    // ========================================
    console.log('%c✨ Brandbook Origen Sierra Nevada', 'color: #c8aa6e; font-size: 20px; font-weight: bold;');
    console.log('%c🏔️ Diseñado con pasión por el café de altura', 'color: #fff; font-size: 12px;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #c8aa6e;');

});
