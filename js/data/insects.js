// 곤충 데이터
const insects = {
    bees: [
        {
            id: 'honeybee',
            title: '꿀벌',
            image: '/images/insects/꿀벌/main.webp',
            description: '꿀을 모으고 식물의 수분을 돕는 곤충이에요.',
            facts: [
                '꿀을 만들어 저장해요',
                '여왕벌, 일벌, 수벌로 나뉘어 살아요',
                '식물의 수분을 도와줘요'
            ],
            link: '/categories/bees/honeybee.html'
        }
        // 더 많은 벌 데이터...
    ],
    
    mantis: [
        {
            id: 'prayingmantis',
            title: '사마귀',
            image: '/images/insects/사마귀/main.webp',
            description: '앞다리로 먹이를 잡는 멋진 사냥꾼이에요.',
            facts: [
                '강한 앞다리로 먹이를 잡아요',
                '초록색이나 갈색으로 위장해요',
                '머리를 180도 돌릴 수 있어요'
            ],
            link: '/categories/mantis/prayingmantis.html'
        }
        // 더 많은 사마귀 데이터...
    ],

    // 다른 카테고리의 곤충 데이터...
};

// 모든 곤충 데이터를 하나의 배열로 변환
const allInsects = Object.values(insects).flat();

// 카테고리별 곤충 데이터 가져오기
function getInsectsByCategory(category) {
    return insects[category] || [];
}

// 랜덤 곤충 가져오기
function getRandomInsects(count = 2) {
    return utils.shuffle([...allInsects]).slice(0, count);
}

// 곤충 검색
function searchInsects(query) {
    const normalizedQuery = query.toLowerCase();
    return allInsects.filter(insect => 
        insect.title.toLowerCase().includes(normalizedQuery) ||
        insect.description.toLowerCase().includes(normalizedQuery)
    );
}

// 내보내기
export { insects, allInsects, getInsectsByCategory, getRandomInsects, searchInsects }; 