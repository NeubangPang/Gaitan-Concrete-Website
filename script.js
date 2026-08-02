// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjusts for the sticky header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Form Submission Handler 
    const leadForm = document.getElementById('lead-form');
    
    if(leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents the page from refreshing immediately
            
            // In a real build, you would add code here to send the data to your email or CRM
            alert("Thank you! Your estimate request has been received. Our team will contact you shortly.");
            
            // Clear the form fields after submission
            leadForm.reset();
        });
    }
});