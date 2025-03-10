import { bees } from '../data/bees.js';

const BeesPage = {
    init() {
        this.loadBees();
        this.setupSearch();
    },

    loadBees() {
        const container = utils.$('#bees-container');
        if (!container) return;

        container.innerHTML = bees.map(bee => InsectCard.create(bee)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterBees(query);
        });
    },

    filterBees(query) {
        const container = utils.$('#bees-container');
        if (!container) return;

        const filteredBees = bees.filter(bee => 
            bee.title.toLowerCase().includes(query) ||
            bee.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredBees.map(bee => InsectCard.create(bee)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    BeesPage.init();
}); 