// 곤충 카드 컴포넌트
const InsectCard = {
    create(insect) {
        return `
            <div class="insect-card">
                <div class="image-container">
                    <img src="${insect.image}" alt="${insect.title}" loading="lazy">
                </div>
                <h3>${insect.title}</h3>
                <p>${insect.description}</p>
                <ul class="insect-facts">
                    ${insect.facts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
                ${insect.link ? `<a href="${insect.link}" class="button more-button">더 알아보기</a>` : ''}
            </div>
        `;
    }
};

// 랜덤 곤충 표시 컴포넌트
const RandomInsects = {
    insects: [], // 곤충 데이터 배열

    init(insects) {
        this.insects = insects;
        this.displayRandomInsects();
    },

    displayRandomInsects() {
        const container = utils.$('#random-insect-container');
        if (!container || !this.insects.length) return;

        const randomInsects = utils.shuffle(this.insects).slice(0, 2);
        container.innerHTML = randomInsects.map(insect => InsectCard.create(insect)).join('');
    }
};

// 카테고리 네비게이션 컴포넌트
const CategoryNav = {
    init() {
        const nav = utils.$('.category-nav');
        if (!nav) return;

        const links = utils.$$('.category-link');
        links.forEach(link => {
            utils.on(link, 'click', (e) => this.handleCategoryClick(e));
        });
    },

    handleCategoryClick(e) {
        const links = utils.$$('.category-link');
        links.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    CategoryNav.init();
}); 