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

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Close the mobile menu if it is open after clicking a link
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
});