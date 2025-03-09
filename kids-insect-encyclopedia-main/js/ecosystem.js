document.addEventListener('DOMContentLoaded', () => {
    // 퀴즈 데이터
    const quizzes = [
        {
            question: "꿀벌이 꽃에서 하는 일은 무엇일까요?",
            options: [
                "꿀을 모으고 꽃가루를 옮겨요",
                "꽃잎을 먹어요",
                "꽃에서 잠을 자요",
                "꽃과 이야기를 해요"
            ],
            correct: 0
        },
        {
            question: "개미가 흙을 위해 하는 일은 무엇일까요?",
            options: [
                "흙을 먹어요",
                "흙 속에서 잠만 자요",
                "흙을 부드럽게 만들고 영양분을 섞어줘요",
                "흙으로 집을 지어요"
            ],
            correct: 2
        },
        {
            question: "쇠똥구리는 왜 중요한 곤충일까요?",
            options: [
                "예쁜 날개를 가지고 있어서요",
                "동물의 똥을 치워서 자연을 깨끗하게 해줘요",
                "매우 빨리 날 수 있어서요",
                "노래를 잘 불러서요"
            ],
            correct: 1
        }
    ];

    // 퀴즈 컨테이너
    const quizContainer = document.querySelector('.quiz-container');

    // 퀴즈 생성
    function createQuiz() {
        quizzes.forEach((quiz, index) => {
            const quizElement = document.createElement('div');
            quizElement.className = 'quiz-item';
            quizElement.innerHTML = `
                <p class="quiz-question">${index + 1}. ${quiz.question}</p>
                <div class="quiz-options">
                    ${quiz.options.map((option, optionIndex) => `
                        <button class="quiz-option" data-quiz="${index}" data-option="${optionIndex}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <p class="quiz-feedback hidden"></p>
            `;
            quizContainer.appendChild(quizElement);
        });
    }

    // 퀴즈 답변 체크
    function checkAnswer(button) {
        const quizIndex = parseInt(button.dataset.quiz);
        const selectedOption = parseInt(button.dataset.option);
        const quiz = quizzes[quizIndex];
        const quizItem = button.closest('.quiz-item');
        const feedback = quizItem.querySelector('.quiz-feedback');
        const options = quizItem.querySelectorAll('.quiz-option');

        // 모든 버튼 비활성화
        options.forEach(option => {
            option.disabled = true;
        });

        // 정답 체크
        if (selectedOption === quiz.correct) {
            button.classList.add('correct');
            feedback.textContent = '정답이에요! 👏';
            feedback.classList.add('correct');
        } else {
            button.classList.add('wrong');
            options[quiz.correct].classList.add('correct');
            feedback.textContent = '아쉽네요. 다시 한번 생각해보아요! 🤔';
            feedback.classList.add('wrong');
        }

        feedback.classList.remove('hidden');
    }

    // 퀴즈 이벤트 리스너
    quizContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-option')) {
            checkAnswer(e.target);
        }
    });

    // 스크롤 이벤트 처리
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });

    // 스크롤 탑 버튼
    const scrollTopButton = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 초기화
    createQuiz();
}); 