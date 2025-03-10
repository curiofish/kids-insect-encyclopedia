// 카테고리 페이지 관련 기능
const CategoryPage = {
    init() {
        this.loadInsects();
        this.setupFilters();
    },

    loadInsects() {
        // 해당 카테고리의 곤충 데이터 로드
        const categoryId = this.getCurrentCategory();
        const insects = this.getInsectsByCategory(categoryId);
        
        const container = utils.$('.insect-types');
        if (container && insects.length) {
            container.innerHTML = insects.map(insect => InsectCard.create(insect)).join('');
        }
    },

    setupFilters() {
        const filterButtons = utils.$$('.filter-button');
        filterButtons.forEach(button => {
            utils.on(button, 'click', (e) => this.handleFilter(e.target.dataset.filter));
        });
    },

    getCurrentCategory() {
        // URL에서 현재 카테고리 ID 추출
        const path = window.location.pathname;
        return path.split('/').pop().replace('.html', '');
    },

    getInsectsByCategory(categoryId) {
        // 카테고리별 곤충 데이터 반환
        // 실제 구현에서는 데이터를 외부 파일이나 API에서 가져올 수 있음
        return [];
    },

    handleFilter(filter) {
        const items = utils.$$('.insect-card');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.type === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    CategoryPage.init();
}); 