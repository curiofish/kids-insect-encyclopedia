const fs = require('fs').promises;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function setApiKey() {
    try {
        // API 키 입력 받기
        const apiKey = await new Promise(resolve => {
            readline.question('OpenAI API 키를 입력해주세요: ', key => {
                readline.close();
                resolve(key);
            });
        });

        // .env 파일 읽기
        const envContent = await fs.readFile('.env', 'utf8');
        
        // API 키 교체
        const updatedContent = envContent.replace('your_api_key_here', apiKey);
        
        // 파일 저장
        await fs.writeFile('.env', updatedContent);
        
        console.log('API 키가 성공적으로 설정되었습니다.');
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

setApiKey(); 