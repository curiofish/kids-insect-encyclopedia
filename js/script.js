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
                // 서브메뉴가 있는 경우에만 기본 동작을 막음
                if (subNav) {
                    e.preventDefault();
                    subNav.classList.toggle('active');
                    const isExpanded = link.getAttribute('aria-expanded') === 'true';
                    link.setAttribute('aria-expanded', !isExpanded);
                }
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

// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.menu');
    const mainMenuItems = document.querySelectorAll('.main-menu > li');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }

    // 모바일에서 서브메뉴 토글
    mainMenuItems.forEach(item => {
        if (item.querySelector('.sub-menu')) {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
        }
    });

    // 화면 크기가 변경될 때 모바일 메뉴 상태 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuButton?.classList.remove('active');
            menu?.classList.remove('active');
            mainMenuItems.forEach(item => item.classList.remove('active'));
        }
    });

    // 스크롤 시 헤더 숨기기/보이기
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            // 아래로 스크롤
            header.style.transform = 'translateY(-100%)';
        } else {
            // 위로 스크롤
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // 스크롤 탑 버튼
    const scrollTopButton = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton?.classList.add('show');
        } else {
            scrollTopButton?.classList.remove('show');
        }
    });

    scrollTopButton?.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// 현재 페이지의 깊이에 따른 상대 경로 계산
function getBasePath() {
    const path = window.location.pathname;
    const depth = path.split('/').length - 2; // 첫 번째 빈 문자열과 파일명 제외
    return depth > 0 ? '../'.repeat(depth) : './';
}

// 링크 경로 수정
function updateLinks() {
    const basePath = getBasePath();
    const links = {
        'logo': 'index.html',
        'home': 'index.html',
        'about': 'about.html',
        'contact': 'contact.html',
        'beetle': 'categories/beetle.html',
        'butterfly': 'categories/butterfly.html',
        'dragonfly': 'categories/dragonfly.html',
        'cricket': 'categories/cricket.html',
        'mantis': 'categories/mantis.html'
    };

    // 로고 링크 수정
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.href = basePath + links.logo;
        const logoImg = logoLink.querySelector('img');
        if (logoImg) {
            logoImg.src = basePath + 'images/logo.jpg';
        }
    }

    // 메인 메뉴 링크 수정
    document.querySelectorAll('.main-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#') return; // 드롭다운 메뉴 토글은 건너뜀

        // 현재 링크의 마지막 부분을 가져옴
        const linkKey = href.split('/').pop().replace('.html', '');
        
        // 해당하는 경로가 있으면 업데이트
        for (const [key, path] of Object.entries(links)) {
            if (linkKey === key) {
                link.href = basePath + path;
                break;
            }
        }
    });

    // 푸터 링크 수정
    document.querySelectorAll('.footer-links a').forEach(link => {
        const href = link.getAttribute('href');
        const linkKey = href.split('/').pop().replace('.html', '');
        
        for (const [key, path] of Object.entries(links)) {
            if (linkKey === key) {
                link.href = basePath + path;
                break;
            }
        }
    });
}

// 이미지 경로 수정
function updateImages() {
    const basePath = getBasePath();
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('images/')) {
            img.src = basePath + src;
        }
    });
}

// 모바일 메뉴 관련 기능
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.menu');
    const mainMenuItems = document.querySelectorAll('.main-menu > li');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }

    // 모바일에서 서브메뉴 토글
    mainMenuItems.forEach(item => {
        if (item.querySelector('.sub-menu')) {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
        }
    });

    // 화면 크기가 변경될 때 모바일 메뉴 상태 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuButton?.classList.remove('active');
            menu?.classList.remove('active');
            mainMenuItems.forEach(item => item.classList.remove('active'));
        }
    });
}

// 스크롤 관련 기능
function initScrollFeatures() {
    const header = document.querySelector('.header');
    const scrollTopButton = document.querySelector('.scroll-top');
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    // 스크롤 시 헤더 숨기기/보이기
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            // 아래로 스크롤
            header.style.transform = 'translateY(-100%)';
        } else {
            // 위로 스크롤
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        // 스크롤 탑 버튼 표시/숨김
        if (currentScroll > 300) {
            scrollTopButton?.classList.add('show');
        } else {
            scrollTopButton?.classList.remove('show');
        }
    });

    // 스크롤 탑 버튼 클릭 이벤트
    scrollTopButton?.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 이미지 로딩 에러 처리
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const basePath = getBasePath();
            this.src = basePath + 'images/placeholder.png';
            this.alt = '이미지를 불러올 수 없습니다';
        });
    });
}

// 초기화 함수
function init() {
    updateLinks();
    updateImages();
    initMobileMenu();
    initScrollFeatures();
    handleImageErrors();
}

// DOM 로드 시 실행
document.addEventListener('DOMContentLoaded', init); 