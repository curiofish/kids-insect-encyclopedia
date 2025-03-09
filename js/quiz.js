// 퀴즈 문제 데이터
const quizData = [
    {
        question: "곤충의 다리는 몇 개일까요?",
        image: "images/quiz/다리.png",
        options: [
            "4개",
            "6개",
            "8개",
            "10개"
        ],
        correct: 1, // 0-based index
        explanation: "곤충은 모두 6개의 다리를 가지고 있어요!"
    },
    {
        question: "곤충의 몸은 몇 부분으로 나누어져 있나요?",
        image: "images/quiz/몸체.png",
        options: [
            "2부분 (머리, 몸통)",
            "3부분 (머리, 가슴, 배)",
            "4부분 (머리, 가슴, 배, 꼬리)",
            "5부분 (머리, 앞가슴, 중간가슴, 뒷가슴, 배)"
        ],
        correct: 1,
        explanation: "곤충의 몸은 머리, 가슴, 배 3부분으로 나누어져 있어요!"
    },
    {
        question: "다음 중 곤충이 아닌 것은 무엇일까요?",
        image: "images/quiz/곤충아님.png",
        options: [
            "나비",
            "메뚜기",
            "거미",
            "무당벌레"
        ],
        correct: 2,
        explanation: "거미는 다리가 8개이고 더듬이가 없어서 곤충이 아니에요!"
    },
    {
        question: "나비가 되기 전에 거치는 단계가 아닌 것은?",
        image: "images/quiz/나비변태.png",
        options: [
            "알",
            "애벌레",
            "새끼나비",
            "번데기"
        ],
        correct: 2,
        explanation: "나비는 알 → 애벌레 → 번데기 → 성충(나비)의 과정을 거쳐요!"
    },
    {
        question: "꿀벌이 하는 일이 아닌 것은?",
        image: "images/quiz/꿀벌.png",
        options: [
            "꿀 모으기",
            "꽃가루 옮기기",
            "벌집 짓기",
            "물고기 잡기"
        ],
        correct: 3,
        explanation: "꿀벌은 꿀을 모으고, 꽃가루를 옮기고, 벌집을 지어요. 물고기는 잡지 않아요!"
    },
    {
        question: "매미가 우는 시기는 언제일까요?",
        image: "images/quiz/매미.png",
        options: [
            "봄",
            "여름",
            "가을",
            "겨울"
        ],
        correct: 1,
        explanation: "매미는 여름에 울어요! 특히 더운 낮에 많이 울어요."
    },
    {
        question: "장수풍뎅이의 특징이 아닌 것은?",
        image: "images/quiz/장수풍뎅이.png",
        options: [
            "수컷의 뿔이 길다",
            "밤에 활동한다",
            "꽃의 꿀을 먹는다",
            "나무의 수액을 먹는다"
        ],
        correct: 2,
        explanation: "장수풍뎅이는 나무의 수액을 먹어요. 꽃의 꿀은 먹지 않아요!"
    },
    {
        question: "개미가 의사소통하는 방법은?",
        image: "images/quiz/개미.png",
        options: [
            "소리로",
            "춤으로",
            "냄새로",
            "색깔로"
        ],
        correct: 2,
        explanation: "개미는 페로몬이라는 특별한 냄새로 의사소통을 해요!"
    },
    {
        question: "무당벌레의 특징이 아닌 것은?",
        image: "images/quiz/무당벌레.png",
        options: [
            "빨간색 날개에 검은 점이 있다",
            "진딧물을 잡아먹는다",
            "꽃가루를 옮긴다",
            "위험할 때 노란 액체를 분비한다"
        ],
        correct: 2,
        explanation: "무당벌레는 진딧물을 잡아먹는 곤충이에요. 꽃가루를 옮기지는 않아요!"
    },
    {
        question: "잠자리의 특징으로 맞는 것은?",
        image: "images/quiz/잠자리.png",
        options: [
            "밤에 활동한다",
            "뒤로 날 수 있다",
            "꽃의 꿀을 먹는다",
            "겨울잠을 잔다"
        ],
        correct: 1,
        explanation: "잠자리는 앞으로도, 뒤로도 날 수 있어요! 대단하죠?"
    },
    {
        question: "곤충의 날개는 몇 쌍일까요?",
        image: "images/quiz/날개.png",
        options: [
            "1쌍",
            "2쌍",
            "3쌍",
            "4쌍"
        ],
        correct: 1,
        explanation: "대부분의 곤충은 두 쌍의 날개를 가지고 있어요!"
    },
    {
        question: "곤충의 수명은 보통 얼마나 될까요?",
        image: "images/quiz/수명.png",
        options: [
            "몇 주",
            "몇 달",
            "몇 년",
            "몇 십 년"
        ],
        correct: 0,
        explanation: "곤충의 수명은 보통 몇 주에서 몇 달 정도입니다."
    },
    {
        question: "곤충의 눈은 어떤 구조로 되어 있나요?",
        image: "images/quiz/눈.png",
        options: [
            "단안",
            "복안",
            "망막",
            "렌즈"
        ],
        correct: 1,
        explanation: "곤충의 눈은 복안으로 되어 있어요."
    },
    // Add more questions here to reach a total of 50
    // Example:
    // {
    //     question: "새로운 질문",
    //     image: "images/quiz/new-question.png",
    //     options: [
    //         "옵션 1",
    //         "옵션 2",
    //         "옵션 3",
    //         "옵션 4"
    //     ],
    //     correct: 0,
    //     explanation: "정답에 대한 설명"
    // },
    // Repeat until 50 questions are added
];

// 전역 변수
let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// DOM 요소
const quizBox = document.getElementById('quiz-box');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const options = document.querySelectorAll('.quiz-option');
const feedback = document.getElementById('feedback');
const startButton = document.getElementById('start-quiz');
const nextButton = document.getElementById('next-question');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');
const quizResult = document.querySelector('.quiz-result');
const finalScore = document.getElementById('final-score');
const resultText = document.getElementById('result-text');
const retryButton = document.getElementById('retry-quiz');

// 퀴즈 시작
function startQuiz() {
    quizStarted = true;
    currentQuestion = Math.floor(Math.random() * quizData.length); // 랜덤한 첫 질문 선택
    score = 0;
    showQuestion();
    startButton.style.display = 'none';
    options.forEach(option => option.style.display = 'block');
    updateScore();
    updateProgress();
}

// 문제 표시
function showQuestion() {
    const question = quizData[currentQuestion];
    questionNumber.textContent = currentQuestion + 1;
    questionText.textContent = question.question;
    
    // 이미지 업데이트
    if (question.image.endsWith('.webp')) {
        const picture = questionImage.parentElement;
        picture.querySelector('source').srcset = question.image;
        questionImage.src = question.image.replace('.webp', '.png');
    } else {
        questionImage.src = question.image;
    }
    
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.className = 'quiz-option';
        option.disabled = false;
    });
    
    feedback.className = 'quiz-feedback';
    feedback.querySelector('p').textContent = '정답을 선택해주세요!';
    nextButton.style.display = 'none';
}

// 답변 확인
function checkAnswer(selectedOption) {
    const question = quizData[currentQuestion];
    const correct = selectedOption === question.correct;
    
    options.forEach(option => option.disabled = true);
    
    if (correct) {
        score += 10;
        selectedOption.classList.add('correct');
        feedback.classList.add('correct');
        feedback.querySelector('p').textContent = '정답입니다! ' + question.explanation;
    } else {
        selectedOption.classList.add('wrong');
        options[question.correct].classList.add('correct');
        feedback.classList.add('wrong');
        feedback.querySelector('p').textContent = '틀렸습니다. ' + question.explanation;
    }
    
    updateScore();
    nextButton.style.display = 'block';
}

// 다음 문제로
function nextQuestion() {
    currentQuestion++;
    updateProgress();
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 점수 업데이트
function updateScore() {
    scoreElement.textContent = score;
}

// 진행 상황 업데이트
function updateProgress() {
    progressElement.textContent = `${currentQuestion}/${quizData.length}`;
}

// 결과 표시
function showResult() {
    quizBox.style.display = 'none';
    quizResult.style.display = 'block';
    finalScore.textContent = score;
    
    if (score === 100) {
        resultText.textContent = '축하합니다! 당신은 진정한 곤충 박사예요! 🎉';
    } else if (score >= 80) {
        resultText.textContent = '대단해요! 곤충에 대해 정말 잘 알고 있네요! 👏';
    } else if (score >= 60) {
        resultText.textContent = '잘했어요! 조금만 더 공부하면 곤충 박사가 될 수 있어요! 💪';
    } else {
        resultText.textContent = '괜찮아요! 다시 한 번 도전해보세요! 📚';
    }
}

// 퀴즈 다시 시작
function retryQuiz() {
    quizBox.style.display = 'block';
    quizResult.style.display = 'none';
    startQuiz();
}

// 이벤트 리스너
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
retryButton.addEventListener('click', retryQuiz);

options.forEach((option, index) => {
    option.addEventListener('click', () => checkAnswer(index));
}); 