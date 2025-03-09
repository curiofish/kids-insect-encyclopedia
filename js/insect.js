document.addEventListener('DOMContentLoaded', () => {
    // 요소 선택
    const loadingSpinner = document.querySelector('.loading-spinner');
    const insectContainer = document.querySelector('.insect-container');
    const mainImage = document.querySelector('.insect-image');
    const thumbnails = document.querySelector('.image-thumbnails');
    const title = document.querySelector('.insect-title');
    const scientificName = document.querySelector('.insect-scientific-name');
    const description = document.querySelector('.insect-description');
    const featureList = document.querySelector('.feature-list');
    const lifestyleInfo = document.querySelector('.lifestyle-info');
    const funFacts = document.querySelector('.fun-facts');
    const quizContainer = document.querySelector('.quiz-container');
    const relatedGrid = document.querySelector('.related-grid');

    // URL에서 곤충 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const insectId = urlParams.get('id');

    // 곤충 데이터 (실제로는 데이터베이스나 API에서 가져와야 함)
    const insects = {
        1: {
            name: '무당벌레',
            scientificName: 'Coccinella septempunctata',
            description: '빨간색 겉날개에 검은 점이 있는 귀여운 곤충이에요. 진딧물을 잡아먹어서 농작물에 도움을 줘요.',
            images: [
                'images/insects/ladybug/main.webp',
                'images/insects/ladybug/eating.webp',
                'images/insects/ladybug/flying.webp',
                'images/insects/ladybug/group.webp'
            ],
            features: [
                '몸길이는 5~8mm예요',
                '빨간색 겉날개에 검은 점이 7개 있어요',
                '날개를 펼치면 날 수 있어요',
                '진딧물을 잡아먹는 익충이에요'
            ],
            lifestyle: {
                habitat: '정원, 농장, 숲 등에서 살아요',
                food: '진딧물을 주로 먹어요',
                activity: '낮에 활동하는 주행성 곤충이에요',
                season: '봄부터 가을까지 볼 수 있어요'
            },
            funFacts: [
                '하루에 진딧물을 100마리나 잡아먹을 수 있어요',
                '위험할 때는 다리에서 노란색 액체를 내보내요',
                '겨울에는 여러 마리가 모여서 겨울잠을 자요',
                '날개 색깔이 빨간 이유는 자신을 보호하기 위해서예요'
            ],
            quiz: {
                question: '무당벌레는 무엇을 주로 먹나요?',
                options: ['진딧물', '꽃가루', '나뭇잎', '꿀'],
                correct: 0
            },
            related: [2, 3, 4] // 관련된 곤충들의 ID
        },
        // 더 많은 곤충 데이터 추가
    };

    // 곤충 정보 로드
    async function loadInsectData(id) {
        try {
            // 로딩 상태 표시
            loadingSpinner.classList.remove('hidden');
            insectContainer.classList.add('hidden');

            // 실제 API 호출을 시뮬레이션 (1초 딜레이)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const insect = insects[id];
            if (!insect) throw new Error('곤충을 찾을 수 없습니다.');

            // 페이지 타이틀 업데이트
            document.title = `${insect.name} - 신나는 곤충 백과사전`;

            // 메타 태그 업데이트
            updateMetaTags(insect);

            // 기본 정보 표시
            displayBasicInfo(insect);

            // 이미지 갤러리 표시
            displayGallery(insect.images);

            // 특징 목록 표시
            displayFeatures(insect.features);

            // 생활 방식 정보 표시
            displayLifestyle(insect.lifestyle);

            // 재미있는 사실 표시
            displayFunFacts(insect.funFacts);

            // 퀴즈 표시
            displayQuiz(insect.quiz);

            // 관련 곤충 표시
            await displayRelatedInsects(insect.related);

            // 컨텐츠 표시
            loadingSpinner.classList.add('hidden');
            insectContainer.classList.remove('hidden');

        } catch (error) {
            console.error('곤충 정보 로드 중 오류:', error);
            showError();
        }
    }

    // 메타 태그 업데이트
    function updateMetaTags(insect) {
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaOgTitle = document.querySelector('meta[property="og:title"]');
        const metaOgDescription = document.querySelector('meta[property="og:description"]');

        if (metaDescription) metaDescription.content = insect.description;
        if (metaOgTitle) metaOgTitle.content = `${insect.name} - 신나는 곤충 백과사전`;
        if (metaOgDescription) metaOgDescription.content = insect.description;
    }

    // 기본 정보 표시
    function displayBasicInfo(insect) {
        title.textContent = insect.name;
        scientificName.textContent = insect.scientificName;
        description.textContent = insect.description;
    }

    // 이미지 갤러리 표시
    function displayGallery(images) {
        mainImage.src = images[0];
        mainImage.alt = '메인 이미지';

        thumbnails.innerHTML = images.map((src, index) => `
            <img src="${src}" 
                 alt="썸네일 이미지 ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}"
                 loading="lazy"
                 onclick="changeMainImage(this, '${src}')">
        `).join('');
    }

    // 특징 목록 표시
    function displayFeatures(features) {
        featureList.innerHTML = features.map(feature => `
            <li>${feature}</li>
        `).join('');
    }

    // 생활 방식 정보 표시
    function displayLifestyle(lifestyle) {
        lifestyleInfo.innerHTML = Object.entries(lifestyle).map(([key, value]) => `
            <div class="lifestyle-card">
                <h4>${getLifestyleTitle(key)}</h4>
                <p>${value}</p>
            </div>
        `).join('');
    }

    // 생활 방식 제목 변환
    function getLifestyleTitle(key) {
        const titles = {
            habitat: '서식지',
            food: '먹이',
            activity: '활동',
            season: '계절'
        };
        return titles[key] || key;
    }

    // 재미있는 사실 표시
    function displayFunFacts(facts) {
        funFacts.innerHTML = facts.map(fact => `
            <li>${fact}</li>
        `).join('');
    }

    // 퀴즈 표시
    function displayQuiz(quiz) {
        quizContainer.innerHTML = `
            <p class="quiz-question">${quiz.question}</p>
            <div class="quiz-options">
                ${quiz.options.map((option, index) => `
                    <button class="quiz-option" 
                            onclick="checkAnswer(this, ${index}, ${quiz.correct})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    }

    // 관련 곤충 표시
    async function displayRelatedInsects(relatedIds) {
        const relatedInsects = relatedIds.map(id => insects[id]).filter(Boolean);
        
        relatedGrid.innerHTML = relatedInsects.map(insect => `
            <a href="insect.html?id=${insect.id}" class="related-card">
                <img src="${insect.images[0]}" 
                     alt="${insect.name}" 
                     class="related-image"
                     loading="lazy">
                <div class="related-info">
                    <h4 class="related-name">${insect.name}</h4>
                </div>
            </a>
        `).join('');
    }

    // 오류 표시
    function showError() {
        insectContainer.innerHTML = `
            <div class="error-message">
                <h3>앗! 문제가 발생했어요 😢</h3>
                <p>곤충 정보를 불러오는 데 실패했어요.</p>
                <a href="/" class="home-link">홈으로 돌아가기</a>
            </div>
        `;
        loadingSpinner.classList.add('hidden');
        insectContainer.classList.remove('hidden');
    }

    // 메인 이미지 변경
    window.changeMainImage = function(thumbnail, src) {
        mainImage.src = src;
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnail.classList.add('active');
    };

    // 퀴즈 답변 체크
    window.checkAnswer = function(button, selected, correct) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.disabled = true;
        });

        if (selected === correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
            options[correct].classList.add('correct');
        }
    };

    // 곤충 ID가 있으면 데이터 로드
    if (insectId) {
        loadInsectData(insectId);
    } else {
        showError();
    }
}); 