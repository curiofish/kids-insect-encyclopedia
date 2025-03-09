document.addEventListener('DOMContentLoaded', () => {
    // 네비게이션 토글
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // 서브메뉴 토글
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            const submenu = toggle.nextElementSibling;
            submenu.classList.toggle('active');
        });
    });

    // 스크롤 탑 버튼
    const scrollTopButton = document.querySelector('.scroll-top');
    
    const toggleScrollTopButton = () => {
        if (window.pageYOffset > 200) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleScrollTopButton);
    
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.main-nav') && !event.target.closest('.nav-toggle')) {
            mainNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // 키보드 접근성
    document.addEventListener('keydown', (event) => {
        // ESC 키로 메뉴 닫기
        if (event.key === 'Escape') {
            mainNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // 이미지 지연 로딩
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}); 