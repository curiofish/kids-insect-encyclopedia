document.addEventListener('DOMContentLoaded', () => {
    // 성능 최적화를 위한 요소 캐싱
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    const scrollTopButton = document.querySelector('.scroll-top');
    
    // 네비게이션 토글
    const toggleNav = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    };

    navToggle.addEventListener('click', toggleNav);
    navToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleNav();
    });

    // 서브메뉴 토글
    const toggleSubmenu = (toggle) => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        const submenu = toggle.nextElementSibling;
        submenu.classList.toggle('active');
    };
    
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', () => toggleSubmenu(toggle));
        toggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleSubmenu(toggle);
        });
    });

    // 스크롤 탑 버튼 - 스로틀링 적용
    let isScrolling = false;
    
    const toggleScrollTopButton = () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                if (window.pageYOffset > 200) {
                    scrollTopButton.classList.add('visible');
                } else {
                    scrollTopButton.classList.remove('visible');
                }
                isScrolling = false;
            });
        }
    };

    window.addEventListener('scroll', toggleScrollTopButton, { passive: true });
    
    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    scrollTopButton.addEventListener('click', scrollToTop);
    scrollTopButton.addEventListener('touchend', scrollToTop);

    // 외부 클릭 시 메뉴 닫기
    const closeMenuOnOutsideClick = (event) => {
        if (!event.target.closest('.main-nav') && !event.target.closest('.nav-toggle')) {
            mainNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            // 모든 서브메뉴도 닫기
            submenuToggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.nextElementSibling.classList.remove('active');
            });
        }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
    document.addEventListener('touchend', closeMenuOnOutsideClick);

    // 키보드 접근성
    document.addEventListener('keydown', (event) => {
        // ESC 키로 메뉴 닫기
        if (event.key === 'Escape') {
            mainNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            // 모든 서브메뉴도 닫기
            submenuToggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.nextElementSibling.classList.remove('active');
            });
        }
    });

    // 이미지 지연 로딩
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            // 이미지 로드 에러 처리
            img.onerror = () => {
                img.style.opacity = '0.5';
                img.style.filter = 'grayscale(100%)';
            };
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // 터치 디바이스 감지
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }

    // 성능 최적화를 위한 Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.feature-card, .quick-link').forEach(el => {
            observer.observe(el);
        });
    }
}); 