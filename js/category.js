// 카테고리 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 탑 버튼
    const scrollTopButton = document.querySelector('.scroll-top');
    
    if (scrollTopButton) {
        // 스크롤 이벤트 리스너
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });
        
        // 버튼 클릭 이벤트
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 곤충 카드 애니메이션
    const insectCards = document.querySelectorAll('.insect-card');
    
    insectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
    
    // 검색 기능
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // 검색 실행 함수
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            alert('검색어는 2글자 이상 입력해주세요!');
            return;
        }
        
        // 현재 페이지의 모든 곤충 카드에서 검색
        const insectCards = document.querySelectorAll('.insect-card');
        let found = false;
        
        insectCards.forEach(card => {
            const insectName = card.querySelector('h3').textContent.toLowerCase();
            const insectInfo = card.querySelector('.insect-details').textContent.toLowerCase();
            
            if (insectName.includes(searchTerm) || insectInfo.includes(searchTerm)) {
                // 검색어가 포함된 카드 강조 표시
                card.classList.add('search-highlight');
                
                // 해당 카드로 스크롤
                if (!found) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            } else {
                card.classList.remove('search-highlight');
            }
        });
        
        if (!found) {
            // 검색 결과가 없을 경우 전체 페이지 검색으로 리디렉션
            window.location.href = `../search.html?q=${encodeURIComponent(searchTerm)}`;
        }
    }
    
    // 이미지 확대 기능
    const insectImages = document.querySelectorAll('.insect-image img');
    
    insectImages.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });
    
    // 이미지 모달 생성
    function openImageModal(src, alt) {
        // 모달 요소 생성
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        
        // 모달 내용 생성
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${src}" alt="${alt}">
                <p>${alt}</p>
            </div>
        `;
        
        // 모달을 body에 추가
        document.body.appendChild(modal);
        
        // 모달 닫기 버튼 이벤트
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // 모달 외부 클릭 시 닫기
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // 재미있는 사실 카드 랜덤 색상
    const factCards = document.querySelectorAll('.fact-card');
    const colors = ['#FFF9C4', '#E1F5FE', '#F1F8E9', '#FFF3E0', '#F3E5F5', '#E0F7FA'];
    
    factCards.forEach(card => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        card.style.backgroundColor = randomColor;
    });
    
    // 모바일 메뉴 토글
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // 접근성 개선: 키보드 탐색
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            this.parentElement.classList.add('focus');
        });
        
        link.addEventListener('blur', function() {
            this.parentElement.classList.remove('focus');
        });
    });
}); 