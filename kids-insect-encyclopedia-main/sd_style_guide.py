"""
Stable Diffusion Style Consistency Guide
작성자: Claude
날짜: 2025-03-09
목적: 일러스트레이터 한 명이 작업한 것 같은 일관된 스타일의 이미지 생성
"""

# 1. 기본 프롬프트 템플릿
STYLE_PROMPT_TEMPLATE = {
    'positive': """
    masterpiece, best quality, highly detailed,
    illustration in the style of <your-style>,
    children's book art, consistent style,
    {subject_description}
    """,
    
    'negative': """
    lowres, bad anatomy, bad hands, text, error,
    missing fingers, extra digit, fewer digits, cropped,
    worst quality, low quality, normal quality,
    jpeg artifacts, signature, watermark, username,
    blurry, artist name
    """
}

# 2. 최적화된 하이퍼파라미터
OPTIMAL_PARAMS = {
    'steps': 35,  # 30-40 사이가 최적
    'cfg_scale': 7.5,  # 7-8 사이가 최적
    'sampler': 'DPM++ 2M Karras',  # 안정적인 결과를 위한 샘플러
    'width': 512,
    'height': 512,
    'batch_size': 1,
    'vae': 'stabilityai/sd-vae-ft-mse'  # 고품질 VAE
}

# 3. img2img 설정
IMG2IMG_PARAMS = {
    'denoising_strength': 0.45,  # 원본 이미지 특성 유지
    'steps': 25,
    'cfg_scale': 7.5
}

# 4. LoRA 학습 가이드
LORA_TRAINING_GUIDE = """
LoRA 학습 단계:
1. 학습 데이터 준비
   - 스타일 이미지 15-20장 준비
   - 이미지 크기: 512x512 권장
   - 일관된 스타일의 이미지 선택

2. 학습 명령어
   python networks/train_lora.py \\
   --train_data_dir="your_style_images" \\
   --output_dir="lora_output" \\
   --model_name="v1-5-pruned-emaonly.safetensors" \\
   --learning_rate=1e-4 \\
   --batch_size=1 \\
   --max_train_steps=800

3. LoRA 적용
   - 프롬프트에 추가: <lora:your_style:0.8>
   - 가중치(0.8)는 0.5-1.0 사이에서 조정
"""

# 5. XY Plot 테스트 가이드
XY_PLOT_GUIDE = """
최적 파라미터 찾기:
1. Steps vs CFG Scale
   X Type: Steps
   X Values: 20, 30, 40, 50
   Y Type: CFG Scale
   Y Values: 6, 7, 8, 9

2. Sampler vs Denoising
   X Type: Sampler
   X Values: "DPM++ 2M Karras", "Euler a", "DDIM"
   Y Type: Denoising strength
   Y Values: 0.3, 0.45, 0.6, 0.75
"""

def print_style_guide():
    """스타일 가이드 출력"""
    print("\n=== Stable Diffusion 스타일 일관성 가이드 ===")
    print("\n1. 기본 프롬프트 템플릿:")
    print("Positive:", STYLE_PROMPT_TEMPLATE['positive'])
    print("Negative:", STYLE_PROMPT_TEMPLATE['negative'])
    
    print("\n2. 최적화된 파라미터:")
    for key, value in OPTIMAL_PARAMS.items():
        print(f"{key}: {value}")
    
    print("\n3. img2img 설정:")
    for key, value in IMG2IMG_PARAMS.items():
        print(f"{key}: {value}")
    
    print("\n4. LoRA 학습 가이드:")
    print(LORA_TRAINING_GUIDE)
    
    print("\n5. XY Plot 테스트 가이드:")
    print(XY_PLOT_GUIDE)

import requests
import json
import os
from datetime import datetime

class StableDiffusionAPI:
    def __init__(self):
        self.api_key = "HpOt867uaTjIyz7SPdCQe2jOIf7BccTJY5qqo9T1vlWkG9Ald9HLXht3FW4k"
        self.api_url = "https://stablediffusionapi.com/api/v3/text2img"

    def generate_image(self, insect_name, scientific_name, main_color, viewpoint, pose, features):
        prompt = f"""Create exactly one single {insect_name} ({scientific_name}) in vintage scientific illustration style. 
        Strict requirement: only one insect in the entire image. 
        Use precise fine black ink lines to define form and structure, then apply subtle {main_color} watercolor washes. 
        The insect must be positioned in {viewpoint} view with {pose}, showing detailed anatomical features: {features}. 
        Match the traditional natural history illustration style with meticulous line work and controlled watercolor technique. 
        Pure white background with absolutely no decorative elements. 
        Reference style: 19th century entomological illustration techniques."""

        negative_prompt = """multiple insects, groups, pairs, pattern, collection, collage, specimen plate, 
        decorative border, text, labels, numbers, botanical elements, leaves, flowers, creative interpretation, 
        modern style, digital effects, filters, heavy shading, dark colors, artistic freedom, symmetrical arrangement, 
        repeating elements, mirror images, kaleidoscope effect"""

        payload = {
            "key": self.api_key,
            "prompt": prompt,
            "negative_prompt": negative_prompt,
            "width": "512",
            "height": "512",
            "samples": "1",
            "num_inference_steps": "30",
            "guidance_scale": 7.5,
            "safety_checker": "yes",
            "webhook": None,
            "track_id": None
        }

        try:
            response = requests.post(self.api_url, json=payload)
            response.raise_for_status()
            result = response.json()
            
            if result.get('status') == 'success':
                # Save the image URL and other details
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                output_dir = "images"
                os.makedirs(output_dir, exist_ok=True)
                
                with open(f"{output_dir}/generation_{timestamp}.json", "w") as f:
                    json.dump({
                        "insect_name": insect_name,
                        "scientific_name": scientific_name,
                        "prompt": prompt,
                        "result": result
                    }, f, indent=2)
                
                return result
            else:
                print(f"Error: {result.get('message', 'Unknown error')}")
                return None
                
        except Exception as e:
            print(f"Error generating image: {str(e)}")
            return None

# Example usage
if __name__ == "__main__":
    print_style_guide()
    api = StableDiffusionAPI()
    result = api.generate_image(
        insect_name="Monarch Butterfly",
        scientific_name="Danaus plexippus",
        main_color="orange and black",
        viewpoint="dorsal",
        pose="wings spread wide",
        features="detailed wing patterns, black wing veins, white spots on wing margins, slender body"
    )
    
    if result:
        print("Image generation successful!")
        print("Result:", json.dumps(result, indent=2))
    else:
        print("Image generation failed.") 