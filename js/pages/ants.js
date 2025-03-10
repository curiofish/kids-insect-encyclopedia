import { ants } from '../data/ants.js';

const AntsPage = {
    init() {
        this.loadAnts();
        this.setupSearch();
    },

    loadAnts() {
        const container = utils.$('#ants-container');
        if (!container) return;

        container.innerHTML = ants.map(ant => InsectCard.create(ant)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterAnts(query);
        });
    },

    filterAnts(query) {
        const container = utils.$('#ants-container');
        if (!container) return;

        const filteredAnts = ants.filter(ant => 
            ant.title.toLowerCase().includes(query) ||
            ant.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredAnts.map(ant => InsectCard.create(ant)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    AntsPage.init();
}); 