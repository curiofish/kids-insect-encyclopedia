document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            privacyAgree: document.getElementById('privacy-agree').checked
        };
        
        // 유효성 검사
        if (!validateForm(formData)) {
            return;
        }
        
        // 폼 제출 처리 (실제로는 서버로 전송)
        showSubmitMessage('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
        contactForm.reset();
    });
    
    // 유효성 검사 함수
    function validateForm(data) {
        if (!data.name.trim()) {
            showError('이름을 입력해주세요.');
            return false;
        }
        
        if (!data.email.trim()) {
            showError('이메일을 입력해주세요.');
            return false;
        }
        
        if (!isValidEmail(data.email)) {
            showError('올바른 이메일 주소를 입력해주세요.');
            return false;
        }
        
        if (!data.subject) {
            showError('문의 유형을 선택해주세요.');
            return false;
        }
        
        if (!data.message.trim()) {
            showError('문의 내용을 입력해주세요.');
            return false;
        }
        
        if (!data.privacyAgree) {
            showError('개인정보 수집 및 이용에 동의해주세요.');
            return false;
        }
        
        return true;
    }
    
    // 이메일 유효성 검사
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 에러 메시지 표시
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.textContent = message;
        
        // 기존 에러 메시지 제거
        const existingError = contactForm.querySelector('.alert');
        if (existingError) {
            existingError.remove();
        }
        
        // 새 에러 메시지 추가
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        // 3초 후 에러 메시지 자동 제거
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // 제출 완료 메시지 표시
    function showSubmitMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'alert alert-success';
        messageDiv.textContent = message;
        
        // 기존 메시지 제거
        const existingMessage = contactForm.querySelector('.alert');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 새 메시지 추가
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // 3초 후 메시지 자동 제거
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}); 