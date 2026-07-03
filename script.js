document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const shapes = document.querySelectorAll('.shape');

    // ===== Page Navigation =====
    function switchPage(pageName) {
        pages.forEach(p => {
            p.classList.remove('active');
            // Reset animations for project cards
            p.querySelectorAll('.project-card').forEach(c => c.classList.remove('visible'));
            p.querySelectorAll('.timeline-item').forEach(c => c.classList.remove('visible'));
        });

        const target = document.getElementById('page-' + pageName);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Animate elements in after page switch
            requestAnimationFrame(() => {
                animateOnScroll();
                // Stagger project cards
                target.querySelectorAll('.project-card').forEach((card, i) => {
                    setTimeout(() => card.classList.add('visible'), 100 + i * 80);
                });
            });
        }

        // Update nav active states
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageName));
        mobileLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageName));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            switchPage(link.dataset.page);
        });
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            switchPage(link.dataset.page);
            closeMobileMenu();
        });
    });

    // ===== Hamburger Menu =====
    function closeMobileMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // ===== Scroll Reveal for Timeline =====
    function animateOnScroll() {
        const items = document.querySelectorAll('.page.active .timeline-item');
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                setTimeout(() => item.classList.add('visible'), index * 120);
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll, { passive: true });
    animateOnScroll(); // initial

    // ===== Background Parallax =====
    document.addEventListener('mousemove', e => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 12;
            shape.style.transform = `translate(${(x - 0.5) * speed}px, ${(y - 0.5) * speed}px)`;
        });
    });
});
