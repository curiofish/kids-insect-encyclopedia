document.addEventListener('DOMContentLoaded', () => {
    // 요소 선택
    const searchTerm = document.getElementById('search-term');
    const resultsContainer = document.querySelector('.results-container');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const noResults = document.querySelector('.no-results');
    const suggestionList = document.querySelector('.suggestion-list');

    // URL에서 검색어 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    // 검색어 표시
    if (query) {
        searchTerm.textContent = query;
        performSearch(query);
    }

    // 곤충 데이터 (실제로는 데이터베이스나 API에서 가져와야 함)
    const insects = [
        {
            id: 1,
            name: '무당벌레',
            scientificName: 'Coccinella septempunctata',
            description: '빨간색 겉날개에 검은 점이 있는 귀여운 곤충이에요. 진딧물을 잡아먹어서 농작물에 도움을 줘요.',
            image: 'images/insects/ladybug.webp',
            tags: ['딱정벌레목', '익충', '빨간색']
        },
        {
            id: 2,
            name: '호랑나비',
            scientificName: 'Papilio xuthus',
            description: '노란색 바탕에 검은 줄무늬가 있어 호랑이를 닮았어요. 봄부터 가을까지 볼 수 있어요.',
            image: 'images/insects/swallowtail.webp',
            tags: ['나비목', '화려한 날개', '노란색']
        },
        // 더 많은 곤충 데이터 추가
    ];

    // 검색 수행
    async function performSearch(query) {
        try {
            // 로딩 상태 표시
            loadingSpinner.classList.remove('hidden');
            resultsContainer.innerHTML = '';

            // 실제 검색 로직 (여기서는 단순 필터링)
            const results = insects.filter(insect => 
                insect.name.includes(query) || 
                insect.description.includes(query) ||
                insect.tags.some(tag => tag.includes(query))
            );

            // 검색 결과 표시 (비동기 처리 시뮬레이션)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (results.length > 0) {
                displayResults(results);
            } else {
                showNoResults();
                suggestRandomInsects();
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
            showError();
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    }

    // 검색 결과 표시
    function displayResults(results) {
        noResults.classList.add('hidden');
        resultsContainer.innerHTML = results.map(insect => `
            <article class="result-card">
                <img src="${insect.image}" 
                     alt="${insect.name}" 
                     class="result-image"
                     loading="lazy">
                <div class="result-content">
                    <h3 class="result-title">${insect.name}</h3>
                    <p class="result-scientific-name">${insect.scientificName}</p>
                    <p class="result-description">${insect.description}</p>
                    <div class="result-tags">
                        ${insect.tags.map(tag => `
                            <span class="result-tag">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            </article>
        `).join('');
    }

    // 결과 없음 표시
    function showNoResults() {
        noResults.classList.remove('hidden');
        resultsContainer.innerHTML = '';
    }

    // 랜덤 곤충 추천
    function suggestRandomInsects() {
        const randomInsects = [...insects]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);

        suggestionList.innerHTML = randomInsects.map(insect => `
            <li class="suggestion-item">
                <a href="insect.html?id=${insect.id}">
                    ${insect.name}
                </a>
            </li>
        `).join('');
    }

    // 오류 표시
    function showError() {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <h3>앗! 문제가 발생했어요 😢</h3>
                <p>잠시 후 다시 시도해주세요.</p>
            </div>
        `;
    }

    // 검색어 입력 처리
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = searchForm.querySelector('input');
        const newQuery = input.value.trim();
        
        if (newQuery) {
            // URL 업데이트
            const newUrl = `${window.location.pathname}?q=${encodeURIComponent(newQuery)}`;
            window.history.pushState({ query: newQuery }, '', newUrl);
            
            // 검색 수행
            searchTerm.textContent = newQuery;
            performSearch(newQuery);
        }
    });

    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', (e) => {
        const newQuery = new URLSearchParams(window.location.search).get('q');
        if (newQuery) {
            searchTerm.textContent = newQuery;
            performSearch(newQuery);
        }
    });
}); 