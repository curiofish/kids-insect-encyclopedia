const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imageDirectories = [
    'images/insects',
    'images/quiz',
    'images/not-insects',
    'images/coloring',
    'images/beetles',
    'images/grasshoppers',
    'images/bees_moths',
    'images/dragonflies',
    'images/butterflies'
];

function optimizeImage(inputPath) {
    const dir = path.dirname(inputPath);
    const filename = path.basename(inputPath, path.extname(inputPath));
    
    // WebP 변환
    const webpPath = path.join(dir, `${filename}.webp`);
    execSync(`imagemin "${inputPath}" --plugin=webp --out-dir="${dir}"`);
    
    // 썸네일 디렉토리 생성
    const thumbDir = path.join(dir, 'thumbnails');
    if (!fs.existsSync(thumbDir)) {
        fs.mkdirSync(thumbDir);
    }
    
    console.log(`Optimized: ${inputPath}`);
}

// 각 디렉토리 처리
imageDirectories.forEach(dir => {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            if (file.match(/\.(png|jpg|jpeg)$/i)) {
                const inputPath = path.join(dir, file);
                optimizeImage(inputPath);
            }
        });
    }
}); 