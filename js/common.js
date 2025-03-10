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