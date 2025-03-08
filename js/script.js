// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navMenu.classList.contains('active'));
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Scroll to Top Button
    const scrollTopButton = document.querySelector('.scroll-top');
    
    if (scrollTopButton) {
        // Initially hide the button
        scrollTopButton.style.display = 'none';
        
        // Show/hide button based on scroll position
        function toggleScrollTopButton() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollPosition > 300) {
                scrollTopButton.classList.add('visible');
                scrollTopButton.style.display = 'flex';
            } else {
                scrollTopButton.classList.remove('visible');
                setTimeout(() => {
                    if (!scrollTopButton.classList.contains('visible')) {
                        scrollTopButton.style.display = 'none';
                    }
                }, 300);
            }
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event listeners for scroll to top button
        window.addEventListener('scroll', toggleScrollTopButton);
        scrollTopButton.addEventListener('click', scrollToTop);
        scrollTopButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
    }
});

// Image Loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.insect-image');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'images/placeholder.png';
            this.alt = '이미지를 불러올 수 없습니다';
        });
    });
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    // Toggle menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Add active state to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}); 