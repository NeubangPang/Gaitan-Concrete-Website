document.addEventListener("DOMContentLoaded", function() {
    
    const hamburger = document.getElementById('hamburger');
    const navLinksMenu = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
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

// =========================================
    // 5. GALLERY LIGHTBOX & SWIPE LOGIC
    // =========================================
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    const imageArray = [];

    if (lightbox) {
        galleryItems.forEach((img, index) => {
            imageArray.push(img.src);
            
            // Open lightbox on click
            img.parentElement.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
                lightbox.classList.add('active');
            });
        });

        function showImage(index) {
            lightboxImg.src = imageArray[index];
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % imageArray.length; // Loops back to start
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length; // Loops to end
            showImage(currentIndex);
        }

        // Click Events
        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
                lightbox.classList.remove('active');
            }
        });

        // Keyboard Controls
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') lightbox.classList.remove('active');
        });

        // Mobile Swipe Controls
        let touchstartX = 0;
        let touchendX = 0;
        
        lightbox.addEventListener('touchstart', (e) => {
            touchstartX = e.changedTouches[0].screenX;
        }, {passive: true});

        lightbox.addEventListener('touchend', (e) => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchendX < touchstartX - swipeThreshold) nextImage();
            if (touchendX > touchstartX + swipeThreshold) prevImage();
        }
    }
    