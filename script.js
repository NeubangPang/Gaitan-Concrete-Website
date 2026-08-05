let lockedScrollY = 0;

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
    const galleryItems = document.querySelectorAll('.gallery-item img, .testimonial-card img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    let arrowTimer;
    const imageArray = [];

    if (lightbox) {
        galleryItems.forEach((img, index) => {
            imageArray.push(img.src);
            
            img.parentElement.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
                lightbox.classList.add('active');

                lockedScrollY = window.scrollY;
                document.body.style.position = 'fixed';
                document.body.style.top = `-${lockedScrollY}px`;
                document.body.style.width = '100%';
                resetArrowTimer();
            });
        });

        function resetArrowTimer() {

    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    
    clearTimeout(arrowTimer);
    
    if (lightbox.classList.contains('active')) {
        arrowTimer = setTimeout(() => {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }, 2500); 
    }
}

        function showImage(index) {
            lightboxImg.src = imageArray[index];
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % imageArray.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
            showImage(currentIndex);
        }

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, lockedScrollY);
            clearTimeout(arrowTimer);
        });
        
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
                lightbox.classList.remove('active');
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, lockedScrollY);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, lockedScrollY);
            }
        });

        let touchstartX = 0;
        let touchendX = 0;
        
        lightbox.addEventListener('touchstart', (e) => {
            touchstartX = e.changedTouches[0].screenX;
        }, {passive: true});

        lightbox.addEventListener('touchend', (e) => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        lightbox.addEventListener('touchstart', resetArrowTimer, {passive: true});
        lightbox.addEventListener('mousemove', resetArrowTimer);
        lightbox.addEventListener('click', resetArrowTimer);

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchendX < touchstartX - swipeThreshold) nextImage();
            if (touchendX > touchstartX + swipeThreshold) prevImage();
        }
    }
    
    // ==========================================
// GOOGLE REVIEW MODAL LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
  const reviewModal = document.getElementById('review-modal');
  const openReviewBtn = document.getElementById('open-review-modal');
  const closeReviewBtn = document.getElementById('close-review-modal');
  const redirectBtns = document.querySelectorAll('.review-redirect-btn');

  // Insert your specific Google Place ID here
  const GOOGLE_PLACE_ID = "ChIJyeEMHCOpK4cRKhngaczhw3c"; 
  const googleReviewLink = `https://search.google.com/local/writereview?placeid=${ChIJyeEMHCOpK4cRKhngaczhw3c}`;

  if(openReviewBtn && reviewModal) {
    openReviewBtn.addEventListener('click', () => {
      reviewModal.classList.add('active');
    });

    closeReviewBtn.addEventListener('click', () => {
      reviewModal.classList.remove('active');
    });

    // Close modal if user clicks outside the box
    window.addEventListener('click', (e) => {
      if (e.target === reviewModal) {
        reviewModal.classList.remove('active');
      }
    });

    // Redirect to Google when they click the button in the modal
    redirectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        window.open(googleReviewLink, '_blank');
        reviewModal.classList.remove('active');
      });
    });
  }
});