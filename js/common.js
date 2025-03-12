// 유틸리티 함수
const utils = {
    // DOM 요소 선택
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    // 이벤트 리스너 추가
    on(element, event, handler) {
        element.addEventListener(event, handler);
    },

    // 랜덤 정수 생성
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // 배열 셔플
    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
};

// 스크롤 관련 기능
const scroll = {
    init() {
        const scrollTopButton = utils.$('.scroll-top');
        if (scrollTopButton) {
            utils.on(window, 'scroll', () => this.toggleScrollButton(scrollTopButton));
            utils.on(scrollTopButton, 'click', () => this.scrollToTop());
        }
    },

    toggleScrollButton(button) {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// 검색 기능
const search = {
    init() {
        const searchInput = utils.$('.search-input');
        if (searchInput) {
            utils.on(searchInput, 'input', (e) => this.handleSearch(e.target.value));
        }
    },

    handleSearch(query) {
        // 검색 로직 구현
        console.log('Searching for:', query);
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    scroll.init();
    search.init();
});

// 공통 컴포넌트 로드
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지의 경로를 기준으로 상대 경로 계산
    function getBasePath() {
        const repoName = 'kids-insect-encyclopedia';
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (isGitHubPages) {
            return `/${repoName}/`;
        }
        
        const path = window.location.pathname;
        const depth = path.split('/').length - 2;
        return depth > 0 ? '../'.repeat(depth) : './';
    }

    // 헤더와 푸터 로드
    function loadComponent(name, placeholder) {
        const basePath = getBasePath();
        fetch(`${basePath}components/${name}.html`)
            .then(response => {
                if (!response.ok) {
                    console.error(`Failed to load ${name} component: ${response.status} ${response.statusText}`);
                    return Promise.reject(`Failed to load ${name} component`);
                }
                return response.text();
            })
            .then(html => {
                // GitHub Pages의 baseURL에 맞게 경로 조정
                html = html.replace(/src="\//g, `src="${basePath}`);
                html = html.replace(/href="\//g, `href="${basePath}`);
                
                const placeholder_element = document.querySelector(placeholder);
                if (placeholder_element) {
                    placeholder_element.innerHTML = html;
                    
                    if (name === 'header') {
                        highlightCurrentPage();
                        // 헤더 로드 후 검색 기능 초기화
                        if (typeof setupSearch === 'function') {
                            setupSearch();
                        }
                    }
                }
            })
            .catch(error => {
                console.error(`Error loading ${name} component:`, error);
            });
    }

    // 헤더와 푸터 로드
    loadComponent('header', '#header-placeholder');
    loadComponent('footer', '#footer-placeholder');
});

// 현재 페이지 메뉴 하이라이트
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.main-menu a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href').includes(currentPath)) {
            item.classList.add('active');
            // 서브메뉴인 경우 부모 메뉴도 활성화
            const parentLi = item.closest('.sub-menu')?.parentElement;
            if (parentLi) {
                parentLi.querySelector('a').classList.add('active');
            }
        }
    });
}

// 모바일 메뉴 토글
document.addEventListener('click', function(e) {
    if (e.target.closest('.mobile-menu-button')) {
        document.querySelector('.menu').classList.toggle('active');
    }
}); 