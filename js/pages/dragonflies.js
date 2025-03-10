import { dragonflies } from '../data/dragonflies.js';

const DragonfliesPage = {
    init() {
        this.loadDragonflies();
        this.setupSearch();
    },

    loadDragonflies() {
        const container = utils.$('#dragonflies-container');
        if (!container) return;

        container.innerHTML = dragonflies.map(dragonfly => InsectCard.create(dragonfly)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterDragonflies(query);
        });
    },

    filterDragonflies(query) {
        const container = utils.$('#dragonflies-container');
        if (!container) return;

        const filteredDragonflies = dragonflies.filter(dragonfly => 
            dragonfly.title.toLowerCase().includes(query) ||
            dragonfly.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredDragonflies.map(dragonfly => InsectCard.create(dragonfly)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    DragonfliesPage.init();
}); 