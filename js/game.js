// 게임에 사용될 곤충 데이터
const insects = [
    { name: '사슴벌레', image: 'images/insects/stag-beetle.jpg' },
    { name: '공작나비', image: 'images/insects/swallowtail-butterfly.jpg' },
    { name: '고추잠자리', image: 'images/insects/red-dragonfly.jpg' },
    { name: '메뚜기', image: 'images/insects/grasshopper.jpg' },
    { name: '사마귀', image: 'images/insects/mantis.jpg' },
    { name: '꿀벌', image: 'images/insects/honeybee.jpg' }
];

// 게임 상태 변수
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let pairs = 0;
let timer;
let seconds = 0;

// 게임 보드 생성
function createBoard() {
    const gameBoard = document.querySelector('.memory-game');
    const cards = [...insects, ...insects];
    cards.sort(() => Math.random() - 0.5);

    cards.forEach((insect, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.insect = insect.name;

        card.innerHTML = `
            <div class="front-face">
                <img src="${insect.image}" alt="${insect.name}" onerror="this.src='images/placeholder.png'">
            </div>
            <div class="back-face">
                🦋
            </div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// 카드 뒤집기
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    document.getElementById('moves').textContent = moves;
    checkForMatch();
}

// 카드 매칭 확인
function checkForMatch() {
    const isMatch = firstCard.dataset.insect === secondCard.dataset.insect;
    isMatch ? disableCards() : unflipCards();
}

// 매칭된 카드 처리
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    pairs++;
    document.getElementById('pairs').textContent = pairs;

    if (pairs === 6) {
        setTimeout(showComplete, 500);
    }

    resetBoard();
}

// 매칭되지 않은 카드 처리
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// 보드 초기화
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// 타이머 시작
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// 게임 완료 화면 표시
function showComplete() {
    clearInterval(timer);
    const gameComplete = document.getElementById('gameComplete');
    const message = document.querySelector('.complete-message');
    const timeSpent = document.getElementById('timer').textContent;
    
    message.textContent = `축하합니다! 🎉\n${moves}번 시도해서 ${timeSpent}만에 모든 짝을 찾았어요!`;
    gameComplete.classList.add('show');
}

// 게임 재시작
function restartGame() {
    const gameBoard = document.querySelector('.memory-game');
    const gameComplete = document.getElementById('gameComplete');
    
    gameBoard.innerHTML = '';
    gameComplete.classList.remove('show');
    moves = 0;
    pairs = 0;
    seconds = 0;
    document.getElementById('moves').textContent = '0';
    document.getElementById('pairs').textContent = '0';
    document.getElementById('timer').textContent = '00:00';
    
    clearInterval(timer);
    createBoard();
    startTimer();
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.game-button.restart').forEach(button => {
        button.addEventListener('click', restartGame);
    });

    createBoard();
    startTimer();
});
