import { mantises } from '../data/mantis.js';

const MantisPage = {
    init() {
        this.loadMantises();
        this.setupSearch();
    },

    loadMantises() {
        const container = utils.$('#mantises-container');
        if (!container) return;

        container.innerHTML = mantises.map(mantis => InsectCard.create(mantis)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterMantises(query);
        });
    },

    filterMantises(query) {
        const container = utils.$('#mantises-container');
        if (!container) return;

        const filteredMantises = mantises.filter(mantis => 
            mantis.title.toLowerCase().includes(query) ||
            mantis.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredMantises.map(mantis => InsectCard.create(mantis)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    MantisPage.init();
}); 