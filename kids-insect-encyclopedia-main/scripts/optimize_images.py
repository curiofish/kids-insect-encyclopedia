import os
import sys
from PIL import Image
import glob

def optimize_image(input_path, output_path, format='webp', quality=85):
    """이미지를 최적화하고 WebP 형식으로 변환합니다."""
    try:
        with Image.open(input_path) as img:
            # RGBA 이미지를 RGB로 변환 (필요한 경우)
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'RGBA':
                    background.paste(img, mask=img.split()[3])
                else:
                    background.paste(img, mask=img.split()[1])
                img = background

            # 이미지 크기 최적화 (너무 큰 경우)
            max_size = 1200
            if max(img.size) > max_size:
                ratio = max_size / max(img.size)
                new_size = tuple(int(dim * ratio) for dim in img.size)
                img = img.resize(new_size, Image.Resampling.LANCZOS)

            # WebP로 저장
            img.save(output_path, format, quality=quality, optimize=True)
            print(f"Optimized: {input_path} -> {output_path}")
            return True
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        return False

def process_directory(input_dir):
    """디렉토리 내의 모든 이미지를 처리합니다."""
    image_extensions = ('*.png', '*.jpg', '*.jpeg')
    
    for ext in image_extensions:
        for input_path in glob.glob(os.path.join(input_dir, '**', ext), recursive=True):
            # 출력 경로 생성
            rel_path = os.path.relpath(input_path, input_dir)
            output_path = os.path.join(input_dir, os.path.splitext(rel_path)[0] + '.webp')
            
            # 출력 디렉토리가 없으면 생성
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # 이미지 최적화
            optimize_image(input_path, output_path)

def main():
    """메인 함수"""
    image_dirs = [
        'images/intro',
        'images/butterflies',
        'images/beetles',
        'images/grasshoppers',
        'images/dragonflies',
        'images/bees_moths',
        'images/hemiptera',
        'images/not-insects',
        'images/quiz'
    ]
    
    for dir_path in image_dirs:
        if os.path.exists(dir_path):
            print(f"\nProcessing directory: {dir_path}")
            process_directory(dir_path)
        else:
            print(f"\nSkipping non-existent directory: {dir_path}")

if __name__ == '__main__':
    main() 