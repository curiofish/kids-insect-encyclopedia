// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const subNavs = document.querySelectorAll('.sub-nav-list');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            navToggle.innerHTML = isExpanded ? 
                '<i class="fas fa-bars" aria-hidden="true"></i>' : 
                '<i class="fas fa-times" aria-hidden="true"></i>';
        });
    }

    // 서브 네비게이션 토글
    document.querySelectorAll('.nav-item').forEach(item => {
        const subNav = item.querySelector('.sub-nav-list');
        if (subNav) {
            const link = item.querySelector('.nav-link');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                subNav.classList.toggle('active');
                const isExpanded = link.getAttribute('aria-expanded') === 'true';
                link.setAttribute('aria-expanded', !isExpanded);
            });
        }
    });

    // 현재 페이지 표시
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // 외부 클릭 시 네비게이션 닫기
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
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
    const mainNav = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.nav-toggle');
    
    // Toggle menu with Escape key
    if (e.key === 'Escape') {
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    }
}); 