document.addEventListener('DOMContentLoaded', () => {
    // 요소 선택
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonSections = document.querySelectorAll('.season-section');

    // 계절 탭 클릭 이벤트 처리
    seasonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const season = tab.dataset.season;
            
            // 활성 탭 변경
            seasonTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 활성 섹션 변경
            seasonSections.forEach(section => {
                if (section.id === season) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // URL 해시 업데이트
            history.pushState(null, '', `#${season}`);
        });
    });

    // URL 해시로 초기 탭 설정
    const hash = window.location.hash.slice(1);
    if (hash) {
        const activeTab = document.querySelector(`.season-tab[data-season="${hash}"]`);
        if (activeTab) {
            activeTab.click();
        }
    }

    // 곤충 카드 클릭 이벤트
    const insectCards = document.querySelectorAll('.insect-card');
    insectCards.forEach(card => {
        card.addEventListener('click', () => {
            const insectName = card.querySelector('h4').textContent;
            window.location.href = `/insect.html?name=${encodeURIComponent(insectName)}`;
        });
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
}); 