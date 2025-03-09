// 모든 곤충 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 필터 버튼 기능
    const filterButtons = document.querySelectorAll('.filter-btn');
    const insectItems = document.querySelectorAll('.insect-item');
    
    // 초기 상태: 모든 아이템 표시 (처음 12개만)
    let visibleCount = 12;
    updateVisibleItems();
    
    // 필터 버튼 클릭 이벤트
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 활성 버튼 스타일 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 선택된 카테고리
            const selectedCategory = this.getAttribute('data-filter');
            
            // 아이템 필터링
            insectItems.forEach(item => {
                item.classList.add('hidden');
                
                if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                    item.classList.remove('hidden');
                }
            });
            
            // 필터링 후 보이는 아이템 수 초기화
            visibleCount = 12;
            updateVisibleItems();
            
            // 더 보기 버튼 상태 업데이트
            updateLoadMoreButton();
        });
    });
    
    // 더 많은 곤충 보기 버튼
    const loadMoreButton = document.getElementById('load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // 보이는 아이템 수 증가
            visibleCount += 12;
            updateVisibleItems();
            
            // 더 보기 버튼 상태 업데이트
            updateLoadMoreButton();
        });
    }
    
    // 보이는 아이템 업데이트 함수
    function updateVisibleItems() {
        let count = 0;
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        insectItems.forEach(item => {
            // 필터에 맞는 아이템인지 확인
            const matchesFilter = activeCategory === 'all' || item.getAttribute('data-category') === activeCategory;
            
            if (matchesFilter) {
                count++;
                
                // 보이는 아이템 수에 따라 표시/숨김
                if (count <= visibleCount) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            } else {
                item.classList.add('hidden');
            }
        });
    }
    
    // 더 보기 버튼 상태 업데이트 함수
    function updateLoadMoreButton() {
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        let totalMatchingItems = 0;
        
        insectItems.forEach(item => {
            if (activeCategory === 'all' || item.getAttribute('data-category') === activeCategory) {
                totalMatchingItems++;
            }
        });
        
        // 모든 아이템이 표시되면 버튼 숨김
        if (visibleCount >= totalMatchingItems) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'inline-block';
        }
    }
    
    // 초기 더 보기 버튼 상태 설정
    updateLoadMoreButton();
    
    // 이미지 로딩 최적화
    const lazyImages = document.querySelectorAll('.insect-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // 이미지 로드 트리거
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 애니메이션 효과
    insectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // URL 파라미터로 초기 필터 설정
    function setInitialFilterFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            const matchingButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (matchingButton) {
                matchingButton.click();
            }
        }
    }
    
    setInitialFilterFromURL();
}); 