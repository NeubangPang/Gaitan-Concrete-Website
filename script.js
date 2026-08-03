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

    // 2. Smooth Scrolling & Navigation Fixes
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only hijack the click for smooth scrolling if it is an anchor link (#)
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

            // Close the mobile menu automatically if it is open after clicking any link
            if (navLinksMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksMenu.classList.remove('active');
            }
        });
    });

    // 3. Form Submission Handler 
    const leadForm = document.getElementById('lead-form');
    
    if(leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert("Thank you! Your estimate request has been received. Our team will contact you shortly.");
            
            leadForm.reset();
        });
    }

    const slider = document.getElementById('testimonial-slider');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if(slider && leftBtn && rightBtn) {
        // Calculate the width of one card + the gap to know how far to slide
        leftBtn.addEventListener('click', () => {
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
            slider.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' }); // 32px is the 2rem gap
        });
        
        rightBtn.addEventListener('click', () => {
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
            slider.scrollBy({ left: (cardWidth + 32), behavior: 'smooth' });
        });
    }

});