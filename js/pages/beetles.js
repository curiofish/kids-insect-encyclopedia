import { beetles } from '../data/beetles.js';

const BeetlesPage = {
    init() {
        this.loadBeetles();
        this.setupSearch();
    },

    loadBeetles() {
        const container = utils.$('#beetles-container');
        if (!container) return;

        container.innerHTML = beetles.map(beetle => InsectCard.create(beetle)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterBeetles(query);
        });
    },

    filterBeetles(query) {
        const container = utils.$('#beetles-container');
        if (!container) return;

        const filteredBeetles = beetles.filter(beetle => 
            beetle.title.toLowerCase().includes(query) ||
            beetle.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredBeetles.map(beetle => InsectCard.create(beetle)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    BeetlesPage.init();
}); 