import { grasshoppers } from '../data/grasshoppers.js';

const GrasshoppersPage = {
    init() {
        this.loadGrasshoppers();
        this.setupSearch();
    },

    loadGrasshoppers() {
        const container = utils.$('#grasshoppers-container');
        if (!container) return;

        container.innerHTML = grasshoppers.map(grasshopper => InsectCard.create(grasshopper)).join('');
    },

    setupSearch() {
        const searchInput = utils.$('.search-input');
        if (!searchInput) return;

        utils.on(searchInput, 'input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterGrasshoppers(query);
        });
    },

    filterGrasshoppers(query) {
        const container = utils.$('#grasshoppers-container');
        if (!container) return;

        const filteredGrasshoppers = grasshoppers.filter(grasshopper => 
            grasshopper.title.toLowerCase().includes(query) ||
            grasshopper.description.toLowerCase().includes(query)
        );

        container.innerHTML = filteredGrasshoppers.map(grasshopper => InsectCard.create(grasshopper)).join('');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    GrasshoppersPage.init();
}); 