// 게임 상태 관리
const gameState = {
    currentInsect: null,
    correctCount: 0,
    totalCount: 0,
    hintsShown: 0,
    insects: [
        {
            name: '무당벌레',
            hints: [
                '빨간색 겉날개에 검은 점이 있어요',
                '농부의 친구예요',
                '진딧물을 잡아먹어요'
            ],
            image: 'images/insects/ladybug.jpg'
        },
        {
            name: '나비',
            hints: [
                '알록달록한 날개를 가졌어요',
                '꽃에서 꽃으로 날아다녀요',
                '애벌레가 자라서 되는 곤충이에요'
            ],
            image: 'images/insects/swallowtail-butterfly.jpg'
        },
        {
            name: '매미',
            hints: [
                '여름에 시끄럽게 우는 곤충이에요',
                '나무에 앉아있는 걸 좋아해요',
                '맑은 날 더 크게 울어요'
            ],
            image: 'images/insects/cicada.jpg'
        },
        {
            name: '사마귀',
            hints: [
                '초록색 몸을 가졌어요',
                '앞다리가 매우 강해요',
                '다른 곤충을 잡아먹어요'
            ],
            image: 'images/insects/mantis.jpg'
        },
        {
            name: '장수풍뎅이',
            hints: [
                '수컷은 긴 뿔이 있어요',
                '갈색 또는 검은색이에요',
                '나무 수액을 좋아해요'
            ],
            image: 'images/insects/rhinoceros-beetle.jpg'
        },
        {
            name: '사슴벌레',
            hints: [
                '수컷은 사슴 뿔처럼 큰 턱이 있어요',
                '밤에 활동하는 경우가 많아요',
                '나무에 살아요'
            ],
            image: 'images/insects/stag-beetle.jpg'
        },
        {
            name: '반딧불이',
            hints: [
                '밤에 반짝반짝 빛을 내요',
                '짝을 찾기 위해 빛을 사용해요',
                '깨끗한 환경에서만 살 수 있어요'
            ],
            image: 'images/insects/firefly.jpg'
        },
        {
            name: '하늘소',
            hints: [
                '가늘고 긴 더듬이가 있어요',
                '나무를 갉아먹고 살아요',
                '색깔이 다양하고 아름다워요'
            ],
            image: 'images/insects/longhorn-beetle.jpg'
        },
        {
            name: '개미',
            hints: [
                '작지만 매우 강하고 협동해서 일해요',
                '자기 몸무게의 50배나 되는 물건을 들 수 있어요',
                '여왕개미와 일개미, 수개미로 나뉘어 살아요'
            ],
            image: 'images/insects/velvet-ant.jpg'
        },
        {
            name: '불개미',
            hints: [
                '붉은 갈색을 띠는 작은 개미예요',
                '쏘면 따끔따끔 아프고 붓기도 해요',
                '서로 협동해서 큰 개미집을 만들어요'
            ],
            image: 'images/insects/fire-ant.jpg'
        },
        {
            name: '황소개미',
            hints: [
                '작고 검은색을 띠는 개미예요',
                '정원이나 집 주변에서 흔히 볼 수 있어요',
                '땅 속에 개미집을 만들고 작은 언덕처럼 보여요'
            ],
            image: 'images/insects/black-garden-ant.jpg'
        },
        {
            name: '꿀벌',
            hints: [
                '노란색과 검은색 무늬가 있어요',
                '꽃가루를 모으고 꿀을 만들어요',
                '벌집에서 여왕벌, 일벌, 수벌로 나뉘어 살아요'
            ],
            image: 'images/insects/honeybee.jpg'
        },
        {
            name: '호랑나비',
            hints: [
                '노란색 바탕에 검은색 줄무늬가 있어요',
                '날개가 크고 화려해요',
                '식물의 꽃에서 꿀을 빨아 먹어요'
            ],
            image: 'images/insects/swallowtail-butterfly.jpg'
        },
        {
            name: '모나크나비',
            hints: [
                '오렌지색 날개에 검은 테두리가 있어요',
                '매년 멀리 이동해요',
                '독성이 있는 식물을 먹고 자라요'
            ],
            image: 'images/insects/monarch-butterfly.jpg'
        },
        {
            name: '잠자리',
            hints: [
                '빠르게 날 수 있어요',
                '두 쌍의 큰 날개가 있어요',
                '물가에서 자라요'
            ],
            image: 'images/insects/dragonfly.jpg'
        },
        {
            name: '청동잠자리',
            hints: [
                '몸이 가늘고 길쭉해요',
                '날개를 접고 앉아요',
                '물가에서 살아요'
            ],
            image: 'images/insects/damselfly.jpg'
        },
        {
            name: '귀뚜라미',
            hints: [
                '밤에 울어요',
                '뒷다리가 튼튼해서 높이 뛸 수 있어요',
                '더듬이가 길어요'
            ],
            image: 'images/insects/cricket.jpg'
        },
        {
            name: '메뚜기',
            hints: [
                '풀밭에서 살아요',
                '뒷다리가 강해서 멀리 뛸 수 있어요',
                '식물의 잎을 먹어요'
            ],
            image: 'images/insects/grasshopper.jpg'
        },
        {
            name: '우리하늘소',
            hints: [
                '날개가 아름다운 색깔을 가졌어요',
                '더듬이가 몸보다 길어요',
                '딱딱한 껍질이 있어요'
            ],
            image: 'images/insects/jewel-beetle.jpg'
        },
        {
            name: '풍뎅이',
            hints: [
                '둥글고 단단한 몸을 가졌어요',
                '땅 속에서 애벌레로 자라요',
                '식물의 잎을 먹어요'
            ],
            image: 'images/insects/dung-beetle.jpg'
        },
        {
            name: '딱정벌레',
            hints: [
                '단단한 앞날개가 있어요',
                '땅 위를 빠르게 움직여요',
                '다른 작은 곤충을 잡아먹어요'
            ],
            image: 'images/insects/ground-beetle.jpg'
        },
        {
            name: '바퀴벌레',
            hints: [
                '납작한 갈색 몸을 가졌어요',
                '빛을 피해 어두운 곳에 숨어요',
                '아주 빠르게 달릴 수 있어요'
            ],
            image: 'images/insects/cockroach.jpg'
        },
        {
            name: '나방',
            hints: [
                '밤에 활동해요',
                '털이 많은 몸을 가졌어요',
                '불빛에 모여들어요'
            ],
            image: 'images/insects/atlas-moth.jpg'
        },
        {
            name: '호박벌',
            hints: [
                '노란색과 검은색 털이 많은 몸을 가졌어요',
                '크고 둥글둥글해요',
                '꽃가루를 옮기는 데 중요한 역할을 해요'
            ],
            image: 'images/insects/bumblebee.jpg'
        },
        {
            name: '말벌',
            hints: [
                '노란색과 검은색 무늬가 있어요',
                '통증이 심한 독침이 있어요',
                '종이 같은 벌집을 만들어요'
            ],
            image: 'images/insects/hornet.jpg'
        },
        {
            name: '파리',
            hints: [
                '한 쌍의 날개만 있어요',
                '빠르게 날아다녀요',
                '음식물에 모여들어요'
            ],
            image: 'images/insects/housefly.jpg'
        },
        {
            name: '모기',
            hints: [
                '가늘고 긴 몸을 가졌어요',
                '피를 빨아 먹어요',
                '물에서 애벌레로 자라요'
            ],
            image: 'images/insects/mosquito.jpg'
        },
        {
            name: '진딧물',
            hints: [
                '작고 연한 녹색이에요',
                '식물의 즙을 빨아 먹어요',
                '무당벌레의 먹이가 돼요'
            ],
            image: 'images/insects/aphid.jpg'
        },
        {
            name: '귀뚜라미',
            hints: [
                '밤에 울어요',
                '뒷다리가 튼튼해서 높이 뛸 수 있어요',
                '더듬이가 길어요'
            ],
            image: 'images/insects/cricket.jpg'
        },
        {
            name: '쇠똥구리',
            hints: [
                '동그란 분변 덩어리를 굴려요',
                '검은색 단단한 몸을 가졌어요',
                '환경 정화에 도움을 줘요'
            ],
            image: 'images/insects/dung-beetle.jpg'
        }
    ]
};

// DOM 요소
const elements = {
    insectImage: document.getElementById('insect-image'),
    guessInput: document.getElementById('guess-input'),
    submitGuess: document.getElementById('submit-guess'),
    showHint: document.getElementById('show-hint'),
    nextInsect: document.getElementById('next-insect'),
    gameHint: document.getElementById('game-hint'),
    gameResult: document.getElementById('game-result'),
    correctCount: document.getElementById('correct-count'),
    totalCount: document.getElementById('total-count')
};

// 게임 초기화
function initGame() {
    // 로컬 스토리지에서 게임 점수 불러오기
    loadGameState();
    
    updateScoreDisplay();
    selectRandomInsect();
    
    // 이벤트 리스너 등록
    elements.submitGuess.addEventListener('click', handleGuess);
    elements.showHint.addEventListener('click', showNextHint);
    elements.nextInsect.addEventListener('click', selectRandomInsect);
    elements.guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });

    // 이미지 로드 에러 처리
    elements.insectImage.addEventListener('error', handleImageError);
    
    // 입력 필드에 자동 포커스
    setTimeout(() => elements.guessInput.focus(), 500);
}

// 로컬 스토리지에서 게임 점수 불러오기
function loadGameState() {
    const savedCorrectCount = localStorage.getItem('insectGameCorrectCount');
    const savedTotalCount = localStorage.getItem('insectGameTotalCount');
    
    if (savedCorrectCount !== null && savedTotalCount !== null) {
        gameState.correctCount = parseInt(savedCorrectCount, 10);
        gameState.totalCount = parseInt(savedTotalCount, 10);
    }
}

// 로컬 스토리지에 게임 점수 저장하기
function saveGameState() {
    localStorage.setItem('insectGameCorrectCount', gameState.correctCount);
    localStorage.setItem('insectGameTotalCount', gameState.totalCount);
}

// 랜덤 곤충 선택
function selectRandomInsect() {
    const previousInsect = gameState.currentInsect;
    let newInsect;
    
    // 이전과 다른 곤충 선택
    do {
        newInsect = gameState.insects[Math.floor(Math.random() * gameState.insects.length)];
    } while (previousInsect && previousInsect.name === newInsect.name && gameState.insects.length > 1);
    
    gameState.currentInsect = newInsect;
    gameState.hintsShown = 0;
    
    // UI 초기화
    elements.insectImage.src = newInsect.image;
    elements.insectImage.alt = '맞춰볼 곤충';
    elements.gameHint.textContent = '힌트를 보려면 힌트 보기 버튼을 눌러주세요!';
    elements.gameResult.textContent = '';
    elements.gameResult.className = 'result';
    elements.guessInput.value = '';
    elements.guessInput.focus();
    
    // 접근성을 위한 스크린 리더 알림
    announceForScreenReaders('새로운 곤충이 등장했습니다. 힌트를 보고 맞춰보세요!');
}

// 정답 확인
function handleGuess() {
    const guess = elements.guessInput.value.trim();
    
    if (!guess) {
        showMessage('곤충 이름을 입력해주세요!', 'wrong');
        return;
    }

    gameState.totalCount++;
    saveGameState();
    updateScoreDisplay();

    // 입력값과 정답을 정규화하여 비교 (공백 제거, 대소문자 구분 없이)
    const normalizedGuess = guess.replace(/\s+/g, '').toLowerCase();
    const normalizedAnswer = gameState.currentInsect.name.replace(/\s+/g, '').toLowerCase();

    if (normalizedGuess === normalizedAnswer) {
        handleCorrectGuess();
    } else {
        handleWrongGuess(guess);
    }
}

// 정답일 때 처리
function handleCorrectGuess() {
    gameState.correctCount++;
    saveGameState();
    updateScoreDisplay();
    
    // 성공 애니메이션과 메시지
    elements.gameResult.textContent = '정답입니다! 🎉';
    elements.gameResult.className = 'result correct';
    elements.insectImage.classList.add('correct-animation');
    
    // 효과음 재생 (선택적)
    playSound('correct');
    
    // 축하 파티클 생성
    createConfetti();
    
    // 애니메이션 종료 후 제거
    setTimeout(() => {
        elements.insectImage.classList.remove('correct-animation');
    }, 800);

    // 잠시 후 다음 문제로
    setTimeout(selectRandomInsect, 2000);
}

// 오답일 때 처리
function handleWrongGuess(guess) {
    elements.gameResult.textContent = '다시 한번 생각해보세요! 💭';
    elements.gameResult.className = 'result wrong';
    elements.guessInput.value = '';
    
    // 효과음 재생 (선택적)
    playSound('wrong');
    
    // 힌트 표시
    if (gameState.hintsShown === 0) {
        showNextHint();
    }
}

// 다음 힌트 표시
function showNextHint() {
    if (gameState.hintsShown < gameState.currentInsect.hints.length) {
        elements.gameHint.textContent = gameState.currentInsect.hints[gameState.hintsShown];
        gameState.hintsShown++;
    } else {
        elements.gameHint.textContent = '더 이상의 힌트가 없어요!';
    }
    
    // 힌트 표시 효과
    elements.hint.classList.add('hint-highlight');
    setTimeout(() => {
        elements.hint.classList.remove('hint-highlight');
    }, 300);
}

// 점수 표시 업데이트
function updateScoreDisplay() {
    elements.correctCount.textContent = gameState.correctCount;
    elements.totalCount.textContent = gameState.totalCount;
}

// 메시지 표시
function showMessage(message, type) {
    elements.gameResult.textContent = message;
    elements.gameResult.className = `result ${type}`;
    
    // 스크린 리더를 위한 알림
    announceForScreenReaders(message);
}

// 스크린 리더 알림
function announceForScreenReaders(message) {
    // 실제 서비스에서는 aria-live 지역을 사용하거나 다른 접근성 방법을 사용할 수 있습니다
    console.log(`Screen reader announcement: ${message}`);
}

// 효과음 재생 (선택적)
function playSound(type) {
    // 실제 서비스에서는 사운드 라이브러리를 사용하거나 오디오 요소를 추가할 수 있습니다
    // 선택적 기능이므로 단순화하여 구현했습니다
    console.log(`Playing sound: ${type}`);
}

// 이미지 로드 에러 처리
function handleImageError() {
    elements.insectImage.src = 'images/placeholder.jpg';
    console.error('이미지를 불러올 수 없습니다.');
    showMessage('이미지를 불러올 수 없습니다.', 'wrong');
}

// 게임 재설정 (선택적)
function resetGame() {
    gameState.correctCount = 0;
    gameState.totalCount = 0;
    saveGameState();
    updateScoreDisplay();
    selectRandomInsect();
    showMessage('게임이 재설정되었습니다!', 'info');
}

// 축하 파티클 생성 효과
function createConfetti() {
    const colors = ['#FF6B6B', '#4CC9F0', '#FFD166', '#06D6A0'];
    const container = document.querySelector('.game-card');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        
        container.appendChild(confetti);
        
        // 애니메이션
        const animation = confetti.animate([
            { 
                transform: 'translateY(0) rotate(' + Math.random() * 360 + 'deg)', 
                opacity: 1 
            },
            { 
                transform: 'translateY(' + (Math.random() * 200 + 150) + 'px) rotate(' + Math.random() * 360 + 'deg)', 
                opacity: 0 
            }
        ], {
            duration: Math.random() * 1000 + 1000,
            easing: 'cubic-bezier(.2,.8,.2,1)',
            delay: Math.random() * 500
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', initGame);
