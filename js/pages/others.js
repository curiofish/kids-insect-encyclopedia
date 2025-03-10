import { others } from '../data/others.js';

const OthersPage = {
    init() {
        this.loadOthers();
        this.setupSearch();
    },

    loadOthers() {
        const container = utils.$('#others-container');
        if (!container) return;

        container.innerHTML = others.map(other => InsectCard.create(other)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterOthers(query);
        });
    },

    filterOthers(query) {
        const container = utils.$('#others-container');
        if (!container) return;

        const filteredOthers = others.filter(other => 
            other.title.toLowerCase().includes(query) ||
            other.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredOthers.map(other => InsectCard.create(other)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    OthersPage.init();
}); 