document.addEventListener('DOMContentLoaded', () => {
    // 성능 모니터링
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.info(`Page load time: ${pageLoadTime}ms`);

    // 요소 캐싱 및 성능 최적화
    const elements = {
        navToggle: document.querySelector('.nav-toggle'),
        mainNav: document.querySelector('.main-nav'),
        submenuToggles: document.querySelectorAll('.submenu-toggle'),
        scrollTopButton: document.querySelector('.scroll-top'),
        header: document.querySelector('.main-header'),
        scrollProgress: document.querySelector('.progress-bar')
    };

    // 디바운스 함수
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // 스로틀 함수
    const throttle = (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // 네비게이션 토글
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    // 네비게이션 메뉴 토글
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        
        // 메뉴가 닫힐 때 모든 서브메뉴도 닫기
        if (!isExpanded) {
            submenuToggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.nextElementSibling.style.maxHeight = null;
            });
        }
    });

    // 서브메뉴 토글
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // 다른 열린 서브메뉴 닫기
            submenuToggles.forEach(otherToggle => {
                if (otherToggle !== toggle && otherToggle.getAttribute('aria-expanded') === 'true') {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // 현재 서브메뉴 토글
            toggle.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                submenu.style.maxHeight = submenu.scrollHeight + "px";
            } else {
                submenu.style.maxHeight = null;
            }
        });
    });

    // 스크롤 진행바 업데이트
    function updateScrollProgress() {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        elements.scrollProgress.style.width = `${scrolled}%`;
    }

    // 스크롤 탑 버튼 - 스로틀링 적용
    const toggleScrollTopButton = throttle(() => {
        requestAnimationFrame(() => {
            if (window.scrollY > 300) {
                elements.scrollTopButton.classList.add('show');
            } else {
                elements.scrollTopButton.classList.remove('show');
            }
        });
    }, 100);

    window.addEventListener('scroll', toggleScrollTopButton, { passive: true });

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    };

    elements.scrollTopButton.addEventListener('click', scrollToTop);
    elements.scrollTopButton.addEventListener('touchend', scrollToTop);

    // 외부 클릭 시 메뉴 닫기 - 이벤트 위임 사용
    const closeMenuOnOutsideClick = (e) => {
        if (!e.target.closest('.main-nav') && !e.target.closest('.nav-toggle')) {
            requestAnimationFrame(() => {
                elements.mainNav.classList.remove('active');
                elements.navToggle.setAttribute('aria-expanded', 'false');
                elements.submenuToggles.forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.nextElementSibling.classList.remove('active');
                });
            });
        }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
    document.addEventListener('touchend', closeMenuOnOutsideClick);

    // 키보드 접근성 - 디바운스 적용
    document.addEventListener('keydown', debounce((event) => {
        if (event.key === 'Escape') {
            requestAnimationFrame(() => {
                elements.mainNav.classList.remove('active');
                elements.navToggle.setAttribute('aria-expanded', 'false');
                elements.submenuToggles.forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.nextElementSibling.classList.remove('active');
                });
            });
        }
    }, 150));

    // 이미지 지연 로딩 최적화
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onerror = () => {
                        img.style.opacity = '0.5';
                        img.style.filter = 'grayscale(100%)';
                    };
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // 터치 디바이스 감지 최적화
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.documentElement.classList.add('touch-device');
    }

    // Intersection Observer 최적화
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                    });
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        document.querySelectorAll('.feature-card, .quick-link').forEach(el => observer.observe(el));
    }

    // 성능 메트릭 기록
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = window.performance.timing;
            const interactive = timing.domInteractive - timing.navigationStart;
            const dcl = timing.domContentLoadedEventEnd - timing.navigationStart;
            const complete = timing.domComplete - timing.navigationStart;
            
            console.info('Interactive time:', interactive + 'ms');
            console.info('DOMContentLoaded time:', dcl + 'ms');
            console.info('Complete time:', complete + 'ms');
        }, 0);
    });

    // 페이지 로드 완료 시 애니메이션 시작
    updateScrollProgress();
    toggleScrollTopButton();
    
    // 페이지 로드 애니메이션
    document.body.classList.add('loaded');

    // 곤충 데이터 (자동 완성용)
    const insects = [
        {
            id: 'honeybee',
            title: '꿀벌',
            image: 'images/insects/honeybee.jpg',
            description: '꽃가루를 옮기고 꿀을 만드는 부지런한 곤충이에요.',
            category: '벌'
        },
        {
            id: 'mantis',
            title: '사마귀',
            image: 'images/insects/mantis.jpg',
            description: '앞다리로 먹이를 잡는 멋진 사냥꾼이에요.',
            category: '사마귀'
        },
        {
            id: 'ladybug',
            title: '무당벌레',
            image: 'images/insects/ladybug.jpg',
            description: '빨간색 겉날개에 검은 점이 있는 귀여운 곤충이에요.',
            category: '딱정벌레'
        },
        {
            id: 'swallowtail',
            title: '호랑나비',
            image: 'images/insects/swallowtail-butterfly.jpg',
            description: '노란색 날개에 검은 무늬가 있는 아름다운 나비예요.',
            category: '나비'
        },
        {
            id: 'dragonfly',
            title: '잠자리',
            image: 'images/insects/dragonfly.jpg',
            description: '빠르게 날아다니며 공중에서 먹이를 잡는 곤충이에요.',
            category: '잠자리'
        },
        {
            id: 'cricket',
            title: '귀뚜라미',
            image: 'images/insects/cricket.jpg',
            description: '밤에 울음소리를 내는 특별한 곤충이에요.',
            category: '메뚜기'
        }
    ];

    // 자동완성 UI 생성
    const createAutocompleteUI = () => {
        const existingList = document.querySelector('.autocomplete-list');
        if (existingList) {
            existingList.remove();
        }
        
        const list = document.createElement('ul');
        list.className = 'autocomplete-list';
        return list;
    };

    // 검색어 필터링
    const filterInsects = (searchTerm) => {
        if (!searchTerm) return [];
        const term = searchTerm.toLowerCase();
        return insects.filter(insect => 
            insect.title.toLowerCase().includes(term)
        ).slice(0, 5); // 최대 5개까지만 표시
    };

    // 자동완성 처리
    const handleAutocomplete = debounce((e) => {
        const searchTerm = e.target.value.trim();
        const searchWrapper = e.target.closest('.search-wrapper');
        const existingList = document.querySelector('.autocomplete-list');
        
        if (existingList) {
            existingList.remove();
        }
        
        if (searchTerm.length < 1) return;
        
        const filtered = filterInsects(searchTerm);
        if (filtered.length === 0) return;
        
        const list = createAutocompleteUI();
        filtered.forEach(insect => {
            const li = document.createElement('li');
            li.textContent = insect.title;
            li.addEventListener('click', () => {
                searchInput.value = insect.title;
                list.remove();
                searchForm.submit();
            });
            list.appendChild(li);
        });
        
        searchWrapper.appendChild(list);
    }, 300);

    // 이벤트 리스너 등록
    searchInput.addEventListener('input', handleAutocomplete);

    // 검색창 외부 클릭시 자동완성 닫기
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            const list = document.querySelector('.autocomplete-list');
            if (list) list.remove();
        }
    });

    // 곤충 이름 맞추기 게임 기능
    const gameContainer = document.querySelector('.game-section');
    if (gameContainer) {
        const insectImage = document.getElementById('random-insect');
        const guessInput = document.getElementById('guess-input');
        const submitGuess = document.getElementById('submit-guess');
        const nextInsect = document.getElementById('next-insect');
        const gameHint = document.getElementById('game-hint');
        const gameResult = document.getElementById('game-result');

        // 모든 곤충 목록을 하나의 배열로 만들기
        const allInsects = insects;

        let currentInsect = null;

        // 랜덤 곤충 선택
        function selectRandomInsect() {
            currentInsect = allInsects[Math.floor(Math.random() * allInsects.length)];
            insectImage.src = currentInsect.image;
            insectImage.alt = '맞춰볼 곤충';
            gameHint.textContent = `힌트: ${currentInsect.description}`;
            gameResult.textContent = '';
            guessInput.value = '';
            guessInput.focus();
        }

        // 정답 체크
        submitGuess?.addEventListener('click', () => {
            const guess = guessInput.value.trim();
            if (guess === currentInsect.title) {
                gameResult.textContent = '정답입니다! 🎉';
                gameResult.className = 'result correct';
            } else {
                gameResult.textContent = '다시 한번 생각해보세요! 💭';
                gameResult.className = 'result wrong';
            }
        });

        // 다음 곤충
        nextInsect?.addEventListener('click', selectRandomInsect);

        // 게임 초기화
        selectRandomInsect();
    }

    // 성능 최적화: 스크롤 이벤트 쓰로틀링
    window.addEventListener('scroll', throttle(() => {
        updateScrollProgress();
        toggleScrollTopButton();
    }, 100));

    // 이미지 레이지 로딩 처리
    const images = document.querySelectorAll('.main-insect-image[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // 이미지 오류 처리
    document.addEventListener('error', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.target.src = 'images/placeholder.webp'; // 대체 이미지 경로
        }
    }, true);

    // 이미지 클릭 시 전체화면 보기 (옵션)
    document.querySelectorAll('.main-insect-image').forEach(image => {
        image.addEventListener('click', function() {
            if (!this.classList.contains('fullscreen')) {
                this.classList.add('fullscreen');
                this.style.cursor = 'zoom-out';
            } else {
                this.classList.remove('fullscreen');
                this.style.cursor = 'zoom-in';
            }
        });
    });

    // 모바일에서 스크롤시 헤더 숨기기/보이기
    let lastScroll = 0;
    const mainHeader = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            mainHeader.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !mainHeader.classList.contains('scroll-down')) {
            // 아래로 스크롤
            mainHeader.classList.remove('scroll-up');
            mainHeader.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && mainHeader.classList.contains('scroll-down')) {
            // 위로 스크롤
            mainHeader.classList.remove('scroll-down');
            mainHeader.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // 곤충 퀴즈 데이터
    const quizQuestions = [
        { question: "무당벌레는 몇 개의 점을 가지고 있을까요?", options: ["5개", "7개", "9개"], answer: "7개" },
        { question: "호랑나비의 날개는 어떤 색인가요?", options: ["노란색과 검은색", "파란색과 흰색", "빨간색과 검은색"], answer: "노란색과 검은색" },
        // ... 48개의 추가 질문 ...
        { question: "장수풍뎅이는 어떤 곤충인가요?", options: ["딱정벌레", "나비", "잠자리"], answer: "딱정벌레" }
    ];

    // 랜덤 퀴즈 질문 선택
    function getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * quizQuestions.length);
        return quizQuestions[randomIndex];
    }

    // 퀴즈 초기화
    function initializeQuiz() {
        const quizContainer = document.querySelector('.insect-quiz-section');
        const questionData = getRandomQuestion();
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        questionElement.innerHTML = `<h3>${questionData.question}</h3>`;

        const optionsList = document.createElement('ul');
        optionsList.classList.add('quiz-options');
        questionData.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option;
            optionItem.addEventListener('click', () => {
                if (option === questionData.answer) {
                    alert('정답입니다!');
                } else {
                    alert('틀렸습니다. 다시 시도해보세요.');
                }
            });
            optionsList.appendChild(optionItem);
        });

        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsList);
    }

    // DOMContentLoaded 이벤트 리스너
    initializeQuiz();

    // 랜덤으로 n개의 곤충 선택
    function getRandomInsects(n) {
        const shuffled = [...insects].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    // 선택된 곤충 표시
    function displayRandomInsects(selectedInsects) {
        selectedInsects.forEach((insect, index) => {
            const cardEl = document.getElementById(`random-insect-link-${index + 1}`);
            const imageEl = document.getElementById(`random-insect-${index + 1}`);
            
            if (cardEl && imageEl) {
                imageEl.src = insect.image;
                imageEl.alt = insect.title;
                
                // 각 곤충의 카테고리별 상세 페이지로 연결
                const categoryPath = {
                    '벌': 'bees',
                    '사마귀': 'mantises',
                    '딱정벌레': 'beetles',
                    '나비': 'butterflies',
                    '잠자리': 'dragonflies',
                    '메뚜기': 'grasshoppers'
                };
                
                const category = categoryPath[insect.category] || 'others';
                const targetUrl = `categories/${category}/index.html#${insect.id}`;
                
                // href 설정 및 클릭 이벤트 처리
                cardEl.href = targetUrl;
                cardEl.querySelector('.insect-description').textContent = `${insect.title}에 대해 더 알아보세요!`;
                
                // 기존 이벤트 리스너 제거 후 새로운 이벤트 리스너 추가
                cardEl.removeEventListener('click', cardEl.clickHandler);
                cardEl.clickHandler = (e) => {
                    e.preventDefault();
                    window.location.href = targetUrl;
                };
                cardEl.addEventListener('click', cardEl.clickHandler);
            }
        });
    }

    // 페이지 로드 시 랜덤 곤충 표시
    const randomInsects = getRandomInsects(6);  // 6개의 곤충 선택
    displayRandomInsects(randomInsects);
    
    // 2분마다 새로운 랜덤 곤충 표시
    setInterval(() => {
        const newRandomInsects = getRandomInsects(6);  // 6개의 곤충 선택
        displayRandomInsects(newRandomInsects);
    }, 120000);  // 120000ms = 2분

    // Search Popup Functionality
    const searchTrigger = document.getElementById('search-trigger');
    const searchPopup = document.getElementById('search-popup');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.querySelector('.search-input');

    // Open search popup
    searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        searchPopup.classList.add('active');
        searchInput.focus();
    });

    // Close search popup
    searchClose.addEventListener('click', () => {
        searchPopup.classList.remove('active');
    });

    // Close popup when clicking outside
    searchPopup.addEventListener('click', (e) => {
        if (e.target === searchPopup) {
            searchPopup.classList.remove('active');
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchPopup.classList.contains('active')) {
            searchPopup.classList.remove('active');
        }
    });

    // 모바일 메뉴 토글 기능
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileSearchTrigger = document.getElementById('mobile-search-trigger');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });

    // 모바일 메뉴에서 검색 트리거
    if (mobileSearchTrigger) {
        mobileSearchTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('active');
            mobileMenuButton.textContent = '☰';
            const searchPopup = document.getElementById('search-popup');
            if (searchPopup) {
                searchPopup.classList.add('active');
                const searchInput = searchPopup.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        });
    }

    // 화면 크기가 변경될 때 모바일 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.textContent = '☰';
        }
    });
});

// 스크롤 시 헤더 숨기기/보이기
let lastScrollTop = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // 아래로 스크롤
        header.style.transform = 'translateY(-100%)';
    } else {
        // 위로 스크롤
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}); 