// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // 요소 캐싱
    const elements = {
        header: document.querySelector('.header'),
        mobileMenuButton: document.querySelector('.mobile-menu-button'),
        menu: document.querySelector('.menu'),
        mainMenu: document.querySelector('.main-menu'),
        submenuToggles: document.querySelectorAll('.main-menu > li'),
        searchInput: document.getElementById('searchInput'),
        searchButton: document.getElementById('searchButton'),
        searchResults: document.getElementById('searchResults'),
        scrollTopButton: document.querySelector('.scroll-top')
    };

    // 모바일 메뉴 토글
    function toggleMobileMenu() {
        const isExpanded = elements.mobileMenuButton.getAttribute('aria-expanded') === 'true';
        elements.mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        elements.menu.classList.toggle('active');
        
        if (!isExpanded) {
            // 메뉴가 열릴 때 스크롤 방지
            document.body.style.overflow = 'hidden';
        } else {
            // 메뉴가 닫힐 때 스크롤 허용
            document.body.style.overflow = '';
        }
    }

    // 서브메뉴 토글
    function setupSubmenuToggles() {
        elements.submenuToggles.forEach(item => {
            const submenu = item.querySelector('.sub-menu');
            if (!submenu) return;

            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        });
    }

    // 외부 클릭 시 메뉴 닫기
    function handleOutsideClick(e) {
        if (!e.target.closest('.menu') && !e.target.closest('.mobile-menu-button')) {
            elements.menu.classList.remove('active');
            elements.mobileMenuButton.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    // 스크롤 이벤트 처리
    function handleScroll() {
        // 스크롤 위치에 따른 헤더 스타일 변경
        if (window.scrollY > 100) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }

        // 스크롤 탑 버튼 표시/숨김
        if (window.scrollY > 300) {
            elements.scrollTopButton.classList.add('visible');
        } else {
            elements.scrollTopButton.classList.remove('visible');
        }
    }

    // 검색 기능
    function setupSearch() {
        const searchButton = document.getElementById('searchButton');
        const searchInput = document.getElementById('searchInput');
        
        if (!searchButton || !searchInput) {
            console.warn('Search elements not found');
            return;
        }

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = elements.searchInput.value.trim().toLowerCase();
        if (!query) return;

        // 검색 결과 표시 로직
        elements.searchResults.style.display = 'block';
        // ... 검색 로직 구현
    }

    // 이미지 로딩 최적화
    function setupImageLoading() {
        const images = document.querySelectorAll('img');
        if (!images.length) {
            console.warn('No images found for optimization');
            return;
        }
        
        images.forEach(img => {
            // 이미지 로딩 에러 처리
            img.onerror = () => handleImageError(img);
            
            // 이미지 로딩 완료 시 페이드인 효과
            img.onload = () => {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease';
                }, 100);
            };
            
            // Lazy loading 속성 추가
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // 이미지 로딩 에러 처리
    function handleImageError(img) {
        const basePath = getBasePath();
        const fallbackImage = basePath + 'images/placeholder.png';
        
        if (img.src !== fallbackImage) {
            console.warn(`Failed to load image: ${img.src}`);
            img.src = fallbackImage;
            img.alt = '이미지를 불러올 수 없습니다';
        }
    }

    // 이벤트 리스너 등록
    function setupEventListeners() {
        // 모바일 메뉴 토글
        elements.mobileMenuButton.addEventListener('click', toggleMobileMenu);

        // 외부 클릭 이벤트
        document.addEventListener('click', handleOutsideClick);

        // 스크롤 이벤트
        window.addEventListener('scroll', throttle(handleScroll, 100));

        // 스크롤 탑 버튼
        elements.scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                elements.menu.classList.remove('active');
                elements.mobileMenuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // 성능 최적화를 위한 디바운스/스로틀 함수
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 초기화
    function init() {
        setupSubmenuToggles();
        setupImageLoading();
        setupSearch();
        setupEventListeners();
        handleScroll(); // 초기 스크롤 상태 체크
    }

    // 실행
    init();
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
        'privacy': 'privacy.html',
        'quiz': 'quiz.html',
        'game': 'game.html',
        'all': 'categories/all.html',
        'beetles': 'categories/beetles/index.html',
        'butterflies': 'categories/butterflies/index.html',
        'dragonflies': 'categories/dragonflies/index.html',
        'grasshoppers': 'categories/grasshoppers/index.html',
        'mantis': 'categories/mantis/index.html',
        'bees': 'categories/bees/index.html'
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
        const linkKey = href.split('/')[0].replace('.html', '');
        
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
        const linkKey = href.split('/')[0].replace('.html', '');
        
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
    setupImageLoading();
    updateLinks();
    updateImages();
    initMobileMenu();
    initScrollFeatures();
    handleImageErrors();
}

// DOM 로드 시 실행
document.addEventListener('DOMContentLoaded', init); 