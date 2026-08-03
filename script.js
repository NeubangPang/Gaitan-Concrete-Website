document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Mobile Menu Toggle Logic
    const hamburger = document.getElementById('hamburger');
    const navLinksMenu = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggles the 'active' class on both elements
            hamburger.classList.toggle('active');
            navLinksMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }

            if (navLinksMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksMenu.classList.remove('active');
            }
        });
    });

    const slider = document.getElementById('testimonial-slider');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if(slider && leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
            slider.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
        });
        
        rightBtn.addEventListener('click', () => {
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
            slider.scrollBy({ left: (cardWidth + 32), behavior: 'smooth' });
        });
    }

});