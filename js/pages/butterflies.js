import { butterflies } from '../data/butterflies.js';

const ButterfliesPage = {
    init() {
        this.loadButterflies();
        this.setupSearch();
    },

    loadButterflies() {
        const container = utils.$('#butterflies-container');
        if (!container) return;

        container.innerHTML = butterflies.map(butterfly => InsectCard.create(butterfly)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterButterflies(query);
        });
    },

    filterButterflies(query) {
        const container = utils.$('#butterflies-container');
        if (!container) return;

        const filteredButterflies = butterflies.filter(butterfly => 
            butterfly.title.toLowerCase().includes(query) ||
            butterfly.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredButterflies.map(butterfly => InsectCard.create(butterfly)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    ButterfliesPage.init();
}); 