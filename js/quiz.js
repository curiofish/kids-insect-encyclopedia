// 퀴즈 문제 데이터
const quizData = [
    {
        question: "곤충의 다리는 몇 개일까요?",
        options: [
            "4개",
            "6개",
            "8개",
            "10개"
        ],
        correct: 1,
        explanation: "곤충은 모두 6개의 다리를 가지고 있어요!"
    },
    {
        question: "곤충의 몸은 몇 부분으로 나누어져 있나요?",
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
        options: [
            "단안",
            "복안",
            "망막",
            "렌즈"
        ],
        correct: 1,
        explanation: "곤충의 눈은 복안으로 되어 있어요."
    },
    {
        question: "반딧불이가 빛을 내는 이유는 무엇일까요?",
        options: [
            "길을 밝히기 위해",
            "짝을 찾기 위해",
            "먹이를 유인하기 위해",
            "적을 위협하기 위해"
        ],
        correct: 1,
        explanation: "반딧불이는 짝을 찾기 위해 빛을 내요!"
    },
    {
        question: "메뚜기가 소리를 내는 방법은?",
        options: [
            "입으로 소리를 낸다",
            "날개를 빠르게 움직인다",
            "다리를 서로 비빈다",
            "배를 두드린다"
        ],
        correct: 2,
        explanation: "메뚜기는 뒷다리와 날개를 비벼서 소리를 내요!"
    },
    {
        question: "사마귀의 특징이 아닌 것은?",
        options: [
            "앞다리로 먹이를 잡는다",
            "머리를 180도 돌릴 수 있다",
            "땅속에 알을 낳는다",
            "곤충을 잡아먹는다"
        ],
        correct: 2,
        explanation: "사마귀는 땅속이 아니라 나뭇가지나 식물 줄기에 알주머니를 붙여요!"
    },
    {
        question: "나비와 나방의 차이점이 아닌 것은?",
        options: [
            "나비는 낮에, 나방은 밤에 활동한다",
            "나비는 앉을 때 날개를 접고, 나방은 펼친다",
            "나비의 더듬이는 끝이 뭉툭하고, 나방은 끝이 뾰족하다",
            "나비는 알록달록하고, 나방은 단색이다"
        ],
        correct: 1,
        explanation: "나비는 앉을 때 날개를 세우고, 나방은 날개를 펼쳐요!"
    },
    {
        question: "개미집에서 알을 낳는 개미는?",
        options: [
            "일개미",
            "병정개미",
            "수개미",
            "여왕개미"
        ],
        correct: 3,
        explanation: "여왕개미만 알을 낳을 수 있어요!"
    },
    {
        question: "다음 중 가장 빠르게 날 수 있는 곤충은?",
        options: [
            "나비",
            "말벌",
            "잠자리",
            "메뚜기"
        ],
        correct: 2,
        explanation: "잠자리는 시속 30km 이상으로 날 수 있는 빠른 곤충이에요!"
    },
    {
        question: "다음 중 가장 오래 사는 곤충은?",
        options: [
            "개미 여왕",
            "매미",
            "나비",
            "무당벌레"
        ],
        correct: 0,
        explanation: "개미 여왕은 최대 30년까지 살 수 있어요!"
    },
    {
        question: "곤충의 심장은 어디에 있을까요?",
        options: [
            "머리",
            "가슴",
            "배",
            "다리"
        ],
        correct: 2,
        explanation: "곤충의 심장은 배에 있어요!"
    },
    {
        question: "곤충의 혈액 색깔은 무슨 색일까요?",
        options: [
            "빨간색",
            "파란색",
            "초록색",
            "무색 또는 연한 노란색"
        ],
        correct: 3,
        explanation: "곤충의 혈액은 무색이나 연한 노란색이에요!"
    },
    {
        question: "다음 중 가장 작은 곤충은?",
        options: [
            "개미",
            "진딧물",
            "좀벌",
            "벼룩"
        ],
        correct: 2,
        explanation: "좀벌은 0.2mm 정도로 매우 작은 곤충이에요!"
    },
    {
        question: "다음 중 가장 큰 곤충은?",
        options: [
            "장수풍뎅이",
            "왕사슴벌레",
            "여왕개미",
            "헤라클레스장수풍뎅이"
        ],
        correct: 3,
        explanation: "헤라클레스장수풍뎅이는 몸길이가 17cm까지 자라는 큰 곤충이에요!"
    },
    {
        question: "다음 중 가장 많은 알을 낳는 곤충은?",
        options: [
            "개미 여왕",
            "흰개미 여왕",
            "꿀벌 여왕",
            "나비"
        ],
        correct: 1,
        explanation: "흰개미 여왕은 하루에 수천 개의 알을 낳을 수 있어요!"
    },
    {
        question: "다음 중 가장 오래 살 수 있는 곤충은?",
        options: [
            "매미",
            "흰개미 여왕",
            "나비",
            "무당벌레"
        ],
        correct: 1,
        explanation: "흰개미 여왕은 최대 50년까지 살 수 있어요!"
    },
    {
        question: "다음 중 가장 빠르게 날갯짓을 하는 곤충은?",
        options: [
            "나비",
            "모기",
            "꿀벌",
            "날도래"
        ],
        correct: 1,
        explanation: "모기는 1초에 약 600번 날갯짓을 할 수 있어요!"
    },
    {
        question: "다음 중 가장 멀리 이동하는 곤충은?",
        options: [
            "제왕나비",
            "메뚜기",
            "잠자리",
            "꿀벌"
        ],
        correct: 0,
        explanation: "제왕나비는 멕시코에서 캐나다까지 4,000km 이상 이동해요!"
    },
    {
        question: "다음 중 가장 강한 곤충은?",
        options: [
            "사슴벌레",
            "장수풍뎅이",
            "쇠똥구리",
            "개미"
        ],
        correct: 2,
        explanation: "쇠똥구리는 자기 몸무게의 1,141배나 되는 무게를 들 수 있어요!"
    },
    {
        question: "다음 중 가장 독이 강한 곤충은?",
        options: [
            "말벌",
            "불개미",
            "전갈(곤충은 아니지만)",
            "모기"
        ],
        correct: 0,
        explanation: "말벌 중에서도 특히 장수말벌은 매우 강한 독을 가지고 있어요!"
    },
    {
        question: "다음 중 가장 오래된 곤충 화석은 언제 전의 것일까요?",
        options: [
            "1백만 년 전",
            "1천만 년 전",
            "1억 년 전",
            "4억 년 전"
        ],
        correct: 3,
        explanation: "가장 오래된 곤충 화석은 약 4억 년 전의 것이에요!"
    },
    {
        question: "지구상에 존재하는 곤충의 종류는 약 몇 종류일까요?",
        options: [
            "10만 종",
            "100만 종",
            "500만 종",
            "1000만 종"
        ],
        correct: 2,
        explanation: "지구상에는 약 500만 종의 곤충이 있다고 추정되지만, 아직 발견되지 않은 종도 많아요!"
    },
    {
        question: "다음 중 가장 긴 곤충은?",
        options: [
            "장수풍뎅이",
            "대왕사슴벌레",
            "대나무메뚜기",
            "지네(곤충은 아니지만)"
        ],
        correct: 2,
        explanation: "대나무메뚜기는 몸길이가 최대 55cm까지 자라는 긴 곤충이에요!"
    },
    {
        question: "다음 중 가장 무거운 곤충은?",
        options: [
            "장수풍뎅이",
            "고골리앗하늘소",
            "대왕사슴벌레",
            "여왕흰개미"
        ],
        correct: 1,
        explanation: "고골리앗하늘소는 무게가 최대 100g까지 나가는 무거운 곤충이에요!"
    },
    {
        question: "다음 중 가장 시끄러운 소리를 내는 곤충은?",
        options: [
            "매미",
            "귀뚜라미",
            "메뚜기",
            "사마귀"
        ],
        correct: 0,
        explanation: "매미는 최대 120데시벨의 소리를 낼 수 있어요! 이는 록 콘서트만큼 시끄러운 소리에요!"
    },
    {
        question: "다음 중 가장 많은 종류가 있는 곤충은?",
        options: [
            "나비",
            "딱정벌레",
            "개미",
            "파리"
        ],
        correct: 1,
        explanation: "딱정벌레는 약 40만 종이 있어 가장 많은 종류를 가진 곤충이에요!"
    },
    {
        question: "다음 중 가장 빠르게 달리는 곤충은?",
        options: [
            "바퀴벌레",
            "개미",
            "사마귀",
            "땅벌레"
        ],
        correct: 0,
        explanation: "바퀴벌레는 초속 1.5m로 달릴 수 있어요! 이는 자기 몸길이의 50배 속도에요!"
    },
    {
        question: "다음 중 가장 높이 뛸 수 있는 곤충은?",
        options: [
            "메뚜기",
            "벼룩",
            "방아깨비",
            "개미"
        ],
        correct: 1,
        explanation: "벼룩은 자기 몸길이의 200배 높이까지 뛸 수 있어요!"
    },
    {
        question: "다음 중 가장 오래 물속에서 살 수 있는 곤충은?",
        options: [
            "물방개",
            "장구벌레",
            "물땡땡이",
            "물벌레"
        ],
        correct: 0,
        explanation: "물방개는 몸에 공기를 저장해서 오랫동안 물속에서 살 수 있어요!"
    },
    {
        question: "다음 중 가장 추운 곳에서 살 수 있는 곤충은?",
        options: [
            "남극날개없는파리",
            "북극나방",
            "설표범나비",
            "빙하개미"
        ],
        correct: 0,
        explanation: "남극날개없는파리는 영하 15도에서도 살 수 있어요!"
    },
    {
        question: "다음 중 가장 더운 곳에서 살 수 있는 곤충은?",
        options: [
            "사막개미",
            "사막딱정벌레",
            "사막메뚜기",
            "사막나방"
        ],
        correct: 1,
        explanation: "사막딱정벌레는 지표면 온도가 70도가 넘는 사막에서도 살 수 있어요!"
    },
    {
        question: "다음 중 가장 높은 곳에서 발견된 곤충은?",
        options: [
            "고산나비",
            "고산파리",
            "고산벌",
            "고산개미"
        ],
        correct: 1,
        explanation: "고산파리는 히말라야 산맥의 해발 6,700m 높이에서도 발견되었어요!"
    },
    {
        question: "다음 중 가장 깊은 땅속에서 사는 곤충은?",
        options: [
            "흰개미",
            "땅강아지",
            "굼벵이",
            "개미"
        ],
        correct: 0,
        explanation: "흰개미는 지하 70m 깊이까지 터널을 파고 살 수 있어요!"
    },
    {
        question: "다음 중 가장 오래 숨을 참을 수 있는 곤충은?",
        options: [
            "물방개",
            "바퀴벌레",
            "개미",
            "딱정벌레"
        ],
        correct: 1,
        explanation: "바퀴벌레는 40분 동안 숨을 쉬지 않고도 살 수 있어요!"
    },
    {
        question: "다음 중 가장 많은 다리를 가진 곤충은?",
        options: [
            "개미",
            "메뚜기",
            "지네(곤충은 아니지만)",
            "모든 곤충은 6개의 다리를 가진다"
        ],
        correct: 3,
        explanation: "모든 곤충은 6개의 다리를 가지고 있어요! 지네는 곤충이 아니라 다지류에요."
    },
    {
        question: "다음 중 가장 많은 눈을 가진 곤충은?",
        options: [
            "잠자리",
            "파리",
            "벌",
            "개미"
        ],
        correct: 0,
        explanation: "잠자리는 약 30,000개의 작은 눈으로 이루어진 복안을 가지고 있어요!"
    }
];

// 전역 변수
let currentQuestion = 0;
let score = 0;
let questions = [];

// DOM 요소들
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const retryButton = document.getElementById('retry-button');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const progressText = document.getElementById('progress-text');
const progressFill = document.querySelector('.quiz-progress-fill');
const resultText = document.getElementById('result-text');
const scoreText = document.getElementById('score-text');

// 퀴즈 시작
function startQuiz() {
    // 문제 섞기
    questions = [...quizData].sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestion = 0;
    score = 0;
    
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    resultScreen.style.display = 'none';
    
    showQuestion();
    updateProgress();
}

// 문제 표시
function showQuestion() {
    const question = questions[currentQuestion];
    
    // 문제 텍스트 설정
    questionText.textContent = question.question;
    
    // 옵션 버튼 생성
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // 피드백 초기화
    feedback.style.display = 'none';
    nextButton.style.display = 'none';
}

// 답변 선택
function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const options = optionsContainer.children;
    const isCorrect = selectedIndex === question.correct;
    
    // 모든 버튼 비활성화
    Array.from(options).forEach(button => button.disabled = true);
    
    // 정답 표시
    if (isCorrect) {
        score += 10;
        options[selectedIndex].classList.add('correct');
        feedback.innerHTML = `<p>정답입니다! ${question.explanation}</p>`;
        feedback.className = 'quiz-feedback correct';
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
        feedback.innerHTML = `<p>틀렸습니다. ${question.explanation}</p>`;
        feedback.className = 'quiz-feedback wrong';
    }
    
    feedback.style.display = 'block';
    nextButton.style.display = 'block';
    updateProgress();
}

// 다음 문제로
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
        updateProgress();
    } else {
        showResult();
    }
}

// 진행 상황 업데이트
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `진행: ${currentQuestion + 1}/${questions.length}`;
}

// 결과 표시
function showResult() {
    console.log('Showing result screen');
    console.log('Current score:', score);
    
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    scoreText.textContent = `점수: ${score}점`;
    
    if (score === 100) {
        resultText.textContent = '축하합니다! 당신은 진정한 곤충 박사예요! 🎉';
    } else if (score >= 80) {
        resultText.textContent = '대단해요! 곤충에 대해 정말 잘 알고 있네요! 👏';
    } else if (score >= 60) {
        resultText.textContent = '잘했어요! 조금만 더 공부하면 곤충 박사가 될 수 있어요! 💪';
    } else {
        resultText.textContent = '괜찮아요! 다시 한 번 도전해보세요! 📚';
    }
    
    // 결과 화면이 확실히 보이도록 설정
    document.querySelector('.quiz-result').style.display = 'block';
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', nextQuestion);
    retryButton.addEventListener('click', startQuiz);
}); 